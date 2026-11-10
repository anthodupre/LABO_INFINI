"""« Écoute par la mesure » : contrôle des fichiers rendus (niveaux, crêtes, bandes, silences, justesse harmonique)."""
import numpy as np

import rendu
from rendu import SR, db

BANDES = [('sous-grave', 20, 60), ('grave', 60, 250), ('bas-médium', 250, 500), ('médium', 500, 2000),
          ('haut-médium', 2000, 6000), ('aigu', 6000, 12000), ('air', 12000, 22050)]


def parts_bandes(x, sr=SR):
    m = x.mean(axis=1) if x.ndim == 2 else x
    n = len(m)
    X = np.abs(np.fft.rfft(m * np.hanning(n))) ** 2
    f = np.fft.rfftfreq(n, 1.0 / sr)
    tot = X[(f >= 20)].sum() + 1e-20
    return [(nom, 10 * np.log10(X[(f >= a) & (f < b)].sum() / tot + 1e-12)) for nom, a, b in BANDES]


def centroide(x, sr=SR):
    m = x.mean(axis=1) if x.ndim == 2 else x
    X = np.abs(np.fft.rfft(m))
    f = np.fft.rfftfreq(len(m), 1.0 / sr)
    return float((X * f).sum() / (X.sum() + 1e-12))


def court_terme(x, sr=SR, fen=3.0, saut=1.0):
    y = rendu.kfiltre(x, sr)
    e = (y ** 2).sum(axis=1) if y.ndim == 2 else y ** 2
    cs = np.concatenate([[0.0], np.cumsum(e)])
    w, h = int(fen * sr), int(saut * sr)
    idx = np.arange(0, max(1, len(e) - w + 1), h)
    return -0.691 + 10 * np.log10(np.maximum((cs[np.minimum(idx + w, len(e))] - cs[idx]) / w, 1e-12))


def silences(x, sr=SR, seuil_db=-55.0, mini=0.6, marge=(0.3, 2.5)):
    """Trous anormaux à l'intérieur du morceau (hors début et queue)."""
    m = np.abs(x).max(axis=1) if x.ndim == 2 else np.abs(x)
    w = int(0.05 * sr)
    nb = len(m) // w
    e = m[:nb * w].reshape(nb, w).max(axis=1)
    calme = e < 10 ** (seuil_db / 20.0)
    out, i = [], 0
    while i < nb:
        if calme[i]:
            j = i
            while j < nb and calme[j]:
                j += 1
            t0, t1 = i * w / sr, j * w / sr
            if t1 - t0 >= mini and t0 > marge[0] and t1 < len(m) / sr - marge[1]:
                out.append((round(t0, 2), round(t1, 2)))
            i = j
        else:
            i += 1
    return out


def chroma(seg, sr=SR, fmin=110.0, fmax=1050.0):
    n = len(seg)
    if n < 2048:
        return np.zeros(12)
    X = np.abs(np.fft.rfft(seg * np.hanning(n))) ** 2
    f = np.fft.rfftfreq(n, 1.0 / sr)
    ok = (f >= fmin) & (f <= fmax)
    midi_ = 69 + 12 * np.log2(f[ok] / 440.0)
    pc = np.round(midi_).astype(int) % 12
    ecart = np.abs(midi_ - np.round(midi_))
    poids = X[ok] * (ecart < 0.35)
    return np.bincount(pc, weights=poids, minlength=12)


def justesse(x, P, t0=0.0, sr=SR):
    """Pour chaque mesure : part de l'énergie tonale qui tombe sur les notes écrites à cet endroit (et leurs voisines de
    résonance de la mesure d'avant). Repère une note fausse ou un instrument qui sonne à la mauvaise hauteur."""
    m = x.mean(axis=1) if x.ndim == 2 else x
    res = []
    fin = P.boucle if P.boucle else P.fin()
    nmes = int(np.ceil(fin / P.mesure - 1e-6))
    for k in range(nmes):
        b0, b1 = k * P.mesure, (k + 1) * P.mesure
        a, b = int((t0 + P.secondes(b0)) * sr), int((t0 + P.secondes(b1)) * sr)
        ch = chroma(m[a:b], sr)
        if ch.sum() <= 0:
            res.append((k + 1, None))
            continue
        pcs = set()
        for p in P.parties:
            if p.canal == 9 or not p.verif:
                continue
            for n in p.notes:
                if n.b < b1 - 1e-6 and n.b + max(n.d, P.mesure * 0.99) > b0 + 1e-6:
                    pcs.add(n.p % 12)
        res.append((k + 1, float(sum(ch[i] for i in pcs) / ch.sum())))
    return res


def rapport(x, nom, P=None, t0=0.0, cible=None, sr=SR, bavard=True):
    """Imprime le bilan d'un fichier et renvoie la liste des problèmes."""
    pb = []
    duree = len(x) / sr
    L = rendu.lufs(x, sr)
    tp = db(rendu.vraie_crete(x))
    pk = db(np.abs(x).max())
    nclip = int((np.abs(x) >= 0.999).sum())
    ct = court_terme(x, sr)
    rms = db(np.sqrt((x ** 2).mean()))
    if x.ndim == 2 and x.shape[1] == 2:
        corr = float(np.corrcoef(x[:, 0], x[:, 1])[0, 1])
        cote = db(np.sqrt((((x[:, 0] - x[:, 1]) / 2) ** 2).mean())) - db(np.sqrt((((x[:, 0] + x[:, 1]) / 2) ** 2).mean()))
        bal = db(np.sqrt((x[:, 0] ** 2).mean())) - db(np.sqrt((x[:, 1] ** 2).mean()))
    else:
        corr, cote, bal = 1.0, -99.0, 0.0
    bd = parts_bandes(x, sr)
    sil = silences(x, sr)
    if bavard:
        print('  %s : %.1f s | %.1f LUFS | crête vraie %.1f dBTP (échantillon %.1f) | facteur de crête %.1f dB | écrêtés %d' % (
            nom, duree, L, tp, pk, pk - rms, nclip))
        print('    sonie court terme (3 s) : min %.1f, max %.1f LUFS | stéréo : corrélation %.2f, côté/milieu %.1f dB, balance G-D %+.1f dB' % (
            ct[:-2].min() if len(ct) > 3 else ct.min(), ct.max(), corr, cote, bal))
        print('    profil (LUFS par tranche de 3 s) : ' + ' '.join('%.0f' % v for v in ct[::3]))
        print('    bandes : ' + ', '.join('%s %.1f' % (n, v) for n, v in bd) + ' dB | centroïde %d Hz' % centroide(x, sr))
    if nclip:
        pb.append('%s : %d échantillons écrêtés' % (nom, nclip))
    if tp > -0.8:
        pb.append('%s : crête vraie %.2f dBTP > -0.8' % (nom, tp))
    if cible is not None and abs(L - cible) > 0.7:
        pb.append('%s : sonie %.1f LUFS (cible %.1f)' % (nom, L, cible))
    if sil:
        pb.append('%s : silence(s) anormal(aux) %s' % (nom, sil))
    v = dict(bd)
    if v['sous-grave'] > -12:
        pb.append('%s : trop de sous-grave (%.1f dB)' % (nom, v['sous-grave']))
    if v['aigu'] > -14:
        pb.append('%s : aigu agressif (%.1f dB entre 6 et 12 kHz)' % (nom, v['aigu']))
    if v['bas-médium'] > -2.5 and v['grave'] > -6:
        pb.append('%s : bas du spectre trop chargé' % nom)
    if corr < 0.25:
        pb.append('%s : stéréo trop large (corrélation %.2f)' % (nom, corr))
    if P is not None:
        j = justesse(x, P, t0, sr)
        vals = [q for _k, q in j if q is not None]
        bas = [(k, q) for k, q in j if q is not None and q < 0.8]
        if bavard:
            print('    justesse harmonique par mesure : moyenne %.0f %%, minimum %.0f %%%s' % (
                100 * np.mean(vals), 100 * min(vals), (' | mesures sous 80 %% : ' + ', '.join('%d (%.0f %%)' % (k, 100 * q) for k, q in bas)) if bas else ''))
        if np.mean(vals) < 0.88:
            pb.append('%s : justesse harmonique moyenne %.0f %%' % (nom, 100 * np.mean(vals)))
    return pb
