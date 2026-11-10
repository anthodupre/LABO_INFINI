#!/usr/bin/env python3
"""Régénère toute la bande-son de Noëlombre : partitions -> MIDI -> FluidSynth -> mixage/mastering -> MP3.

    python3 audio/src/tout.py            # tout (5 pièces + 3 boucles), écrit audio/*.mp3
    python3 audio/src/tout.py valse      # une seule pièce
    python3 audio/src/tout.py --partitions   # relecture des partitions seulement (aucun rendu)

Besoin de : python3 + numpy, fluidsynth + /usr/share/sounds/sf2/FluidR3_GM.sf2 (ou NOEL_SF2=…), ffmpeg (libmp3lame).
Fichiers de travail (MIDI, WAV) dans $NOEL_TMP ou un dossier temporaire. Ensuite : node tools/sons.js
"""
import importlib
import sys
sys.dont_write_bytecode = True
import os
import tempfile
import time

import numpy as np

ICI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, ICI)
import analyse  # noqa: E402
import rendu  # noqa: E402
from rendu import SR, db  # noqa: E402

SORTIE = os.path.dirname(ICI)
PIECES = ['reveil', 'valse', 'neige', 'ombres', 'fete']
BOUCLES = ['manege', 'orgue', 'choeur']
RECOUVREMENT = 1.5          # fondu enchaîné du lecteur (s) ; le fichier = AVANT + période + RECOUVREMENT + APRES
AVANT, APRES = 0.10, 0.15
ENC_PIECE = dict(debit='56k', sr=32000, mono=False, abr=True)
ENC_BOUCLE = dict(debit='48k', sr=32000, mono=True, abr=False)
BUDGET = 2600000


def masteriser(x, cible, bandes=(), seuil=-21.0, ratio=1.7, plafond=-1.5):
    """Égalisation douce, compresseur de bus léger, normalisation de sonie, limiteur."""
    x = rendu.eq(x, [('hp', 34, 2), ('bas', 160, 0.8), ('lp', 15500, 3)] + list(bandes))
    x = x * 10 ** ((cible - rendu.lufs(x)) / 20.0)
    x, red = rendu.compresseur(x, seuil=seuil, ratio=ratio)
    lim = (0.0, 0.0, 0.0)
    for _ in range(3):
        x = x * 10 ** ((cible - rendu.lufs(x)) / 20.0)
        x, l1 = rendu.limiteur(x, plafond)
        lim = max(lim, l1)
    return x, red, lim


def produire(nom, tmp, lat, mp3=True):
    t0 = time.time()
    mod = importlib.import_module('pieces.' + nom)
    P = mod.composer()
    err, avert = P.verifier()
    if err:
        raise SystemExit('partition %s : %d erreur(s)' % (nom, len(err)))
    M = dict(cible=-16.0, queue=5.0, bandes=(), seuil=-21.0, ratio=1.7)
    M.update(getattr(mod, 'MASTER', {}))
    boucle = bool(P.boucle)
    mix, env, infos = rendu.rendre(P, tmp, lat, queue=M['queue'] + 1.0, periodes=3 if boucle else 1)
    for n_, l0, g, l1, pk, rv in infos:
        print('    piste %-12s brut %6.1f LUFS  gain %+5.1f dB -> %6.1f LUFS  crête %5.1f dB  réverb %.2f' % (n_, l0, g, l1, db(pk), rv))
    ir = rendu.salle(**getattr(mod, 'SALLE', {}))
    x = mix + rendu.convoluer(env, ir)[:len(mix)]
    if boucle:
        x = np.repeat(x.mean(axis=1)[:, None], 2, axis=1)       # les boucles sont mono
    x, red, lim = masteriser(x, M['cible'], M['bandes'], M['seuil'], M['ratio'])
    pb = []
    if boucle:
        L = P.secondes(P.boucle)
        a = int(round((L - AVANT) * SR))
        nL = int(round(L * SR))
        y = x[a:a + int(round((AVANT + L + RECOUVREMENT + APRES) * SR))].copy()
        # contrôle de la couture : le signal doit être périodique (comparaison à une période d'écart)
        k0, k1 = int(AVANT * SR), int((AVANT + RECOUVREMENT) * SR)
        d = y[k0 + nL:k1 + nL, 0] - y[k0:k1, 0]
        ecart = db(np.sqrt((d ** 2).mean()) / (np.sqrt((y[k0:k1, 0] ** 2).mean()) + 1e-12))
        print('    boucle : période %.4f s, écart entre la fin et le début %.1f dB (parfait < -40)' % (L, ecart))
        if ecart > -35:
            pb.append('%s : couture de boucle imparfaite (%.1f dB)' % (nom, ecart))
        y = rendu.fondus(y, 0.02, 0.05)
        final, t_debut = y[:, :1], -(L - AVANT)
    else:
        fin = P.secondes(P.fin()) + M['queue']
        y = x[:int(fin * SR)]
        y = rendu.fondus(y, 0.004, min(2.5, M['queue'] * 0.5))
        final, t_debut = y, 0.0
    print('    mastering : compresseur %.1f dB max, limiteur %.1f dB max (> 1 dB pendant %.2f %% du temps, > 3 dB %.2f %%) (%.1f s)' % (
        red, lim[0], 100 * lim[1], 100 * lim[2], time.time() - t0))
    wav = os.path.join(tmp, nom + '.wav')
    rendu.ecrire_wav(wav, final)
    pb += analyse.rapport(final if not boucle else np.repeat(final, 2, axis=1), nom + ' (master)', P, t_debut, M['cible'])
    taille = 0
    if mp3:
        out = os.path.join(SORTIE, nom + '.mp3')
        enc = dict(ENC_BOUCLE if boucle else ENC_PIECE)
        enc.update(getattr(mod, 'ENCODAGE', {}))
        taille = rendu.encoder_mp3(wav, out, **enc)
        z = rendu.decoder(out, tmp)
        pb += analyse.rapport(z, nom + '.mp3', None, 0.0, M['cible'])
        print('    %s : %d octets (%.1f kbit/s)' % (out, taille, taille * 8 / 1000.0 / (len(final) / SR)))
    return dict(nom=nom, P=P, duree=len(final) / SR, taille=taille, pb=pb, avert=avert, periode=P.secondes(P.boucle) if boucle else None)


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    noms = args or PIECES + BOUCLES
    if '--partitions' in sys.argv:
        for nom in noms:
            importlib.import_module('pieces.' + nom).composer().verifier()
        return
    tmp = os.environ.get('NOEL_TMP') or tempfile.mkdtemp(prefix='noelombre_audio_')
    os.makedirs(tmp, exist_ok=True)
    lat = rendu.Latences(tmp)
    res = []
    for nom in noms:
        print('=' * 100)
        res.append(produire(nom, tmp, lat, mp3='--sans-mp3' not in sys.argv))
    print('=' * 100)
    total = 0
    for r in res:
        total += r['taille']
        print('%-8s %6.2f s  %7d octets%s' % (r['nom'], r['duree'], r['taille'], ('  période %.4f s' % r['periode']) if r['periode'] else ''))
    print('TOTAL %d octets (%.3f Mo) — budget %d' % (total, total / 1e6, BUDGET))
    pbs = [p for r in res for p in r['pb']]
    for p in pbs:
        print('PROBLÈME : ' + p)
    if len(noms) == len(PIECES + BOUCLES) and total > BUDGET:
        print('PROBLÈME : budget dépassé')
        pbs.append('budget')
    print('fichiers de travail : ' + tmp)
    sys.exit(1 if pbs else 0)


if __name__ == '__main__':
    main()
