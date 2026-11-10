"""Rendu (FluidSynth, une piste par instrument), mixage, réverbération à convolution, mastering et encodage MP3.

Dépendances : numpy, fluidsynth (+ FluidR3_GM.sf2), ffmpeg (libmp3lame). Rien d'autre.
"""
import json
import os
import struct
import subprocess

import numpy as np

import midi

SF2 = os.environ.get('NOEL_SF2', '/usr/share/sounds/sf2/FluidR3_GM.sf2')
SR = 44100
GAIN_FLUID = 0.5


# ----------------------------------------------------------------------------- fichiers
def lire_wav(chemin):
    with open(chemin, 'rb') as f:
        b = f.read()
    i = b.find(b'fmt ')
    tag, ch, sr, _, _, bits = struct.unpack('<HHIIHH', b[i + 8:i + 24])
    j = b.find(b'data', i)
    n = struct.unpack('<I', b[j + 4:j + 8])[0]
    brut = b[j + 8:j + 8 + n] if 0 < n <= len(b) - j - 8 else b[j + 8:]
    if tag == 3 and bits == 32:
        x = np.frombuffer(brut[:len(brut) // (4 * ch) * 4 * ch], dtype='<f4').astype(np.float64)
    elif bits == 16:
        x = np.frombuffer(brut[:len(brut) // (2 * ch) * 2 * ch], dtype='<i2').astype(np.float64) / 32768.0
    elif bits == 24:
        a = np.frombuffer(brut[:len(brut) // (3 * ch) * 3 * ch], dtype=np.uint8).reshape(-1, 3).astype(np.int32)
        v = a[:, 0] | (a[:, 1] << 8) | (a[:, 2] << 16)
        x = np.where(v >= 1 << 23, v - (1 << 24), v).astype(np.float64) / float(1 << 23)
    elif bits == 32:
        x = np.frombuffer(brut[:len(brut) // (4 * ch) * 4 * ch], dtype='<i4').astype(np.float64) / 2147483648.0
    else:
        raise ValueError('format WAV non géré : %s' % chemin)
    return x.reshape(-1, ch), sr


def ecrire_wav(chemin, x, sr=SR):
    x = np.asarray(x, dtype=np.float64)
    if x.ndim == 1:
        x = x[:, None]
    rng = np.random.default_rng(1234)
    d = (rng.random(x.shape) - rng.random(x.shape)) / 32768.0          # dither triangulaire
    pcm = np.clip(np.round((x + d) * 32767.0), -32768, 32767).astype('<i2')
    with open(chemin, 'wb') as f:
        n = pcm.size * 2
        f.write(b'RIFF' + struct.pack('<I', 36 + n) + b'WAVEfmt ' + struct.pack('<IHHIIHH', 16, 1, x.shape[1], sr, sr * 2 * x.shape[1], 2 * x.shape[1], 16))
        f.write(b'data' + struct.pack('<I', n) + pcm.tobytes())


def fluid(mid, wav):
    subprocess.run(['fluidsynth', '-ni', '-q', '-F', wav, '-r', str(SR), '-g', str(GAIN_FLUID), '-R', '0', '-C', '0',
                    '-o', 'synth.polyphony=512', '-O', 'float', '-T', 'wav', SF2, mid],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    x, sr = lire_wav(wav)
    assert sr == SR
    return x


def db(v):
    return 20.0 * np.log10(np.maximum(v, 1e-12))


# ----------------------------------------------------------------------------- retard d'attaque des échantillons
class Latences:
    """Mesure, pour chaque instrument et chaque hauteur utilisée, le délai entre la note MIDI et le son réel
    (certains échantillons de la banque attaquent 50-150 ms en retard) ; les notes sont avancées d'autant."""

    def __init__(self, tmp, plafond=0.2):
        self.tmp, self.plafond = tmp, plafond
        self.fichier = os.path.join(tmp, 'latences.json')
        self.tab = {}
        if os.path.exists(self.fichier):
            with open(self.fichier) as f:
                self.tab = json.load(f)

    def mesurer(self, prog, banque, canal, hauteurs):
        cle = '%d-%d-%d' % (banque, prog, canal)
        t = self.tab.setdefault(cle, {})
        manque = sorted(set(int(h) for h in hauteurs) - set(int(k) for k in t))
        if not manque:
            return
        pas = 2.0
        notes = [(0.3 + i * pas, 0.3 + i * pas + 0.7, h, 80) for i, h in enumerate(manque)]
        cc = [(0.3 + i * pas - 0.12, 120, 0) for i in range(len(manque))]
        mid, wav = os.path.join(self.tmp, '_lat.mid'), os.path.join(self.tmp, '_lat.wav')
        midi.ecrire(mid, canal, prog, notes, cc=cc, banque=banque, fin=0.3 + len(manque) * pas + 0.5)
        x = fluid(mid, wav).mean(axis=1)
        w = int(SR * 0.003)
        for i, h in enumerate(manque):
            a = int((0.3 + i * pas) * SR)
            seg = x[a - int(0.05 * SR):a + int(0.8 * SR)]
            if len(seg) < w * 4:
                t[str(h)] = 0.0
                continue
            env = np.sqrt(np.convolve(seg ** 2, np.ones(w) / w, 'same'))
            avant = env[:int(0.04 * SR)].max()
            apres = env[int(0.05 * SR):]
            ref = apres[:int(0.7 * SR)].max()
            if ref < 1e-6:
                t[str(h)] = 0.0
                continue
            seuil = max(0.3 * ref, 2.0 * avant)
            k = int(np.argmax(apres >= seuil))
            t[str(h)] = round(k / SR, 4)
        with open(self.fichier, 'w') as f:
            json.dump(self.tab, f)

    def __call__(self, partie, h):
        t = self.tab.get('%d-%d-%d' % (partie.banque, partie.prog, partie.canal), {})
        return min(self.plafond, float(t.get(str(int(h)), 0.0)))


# ----------------------------------------------------------------------------- traitements
def _spectre(x, n=None):
    return np.fft.rfft(x, n=n, axis=0)


def courbe_eq(f, bandes):
    """Gain linéaire (phase nulle) pour une liste de bandes :
    ('hp', f0, ordre) ('lp', f0, ordre) ('bas', f0, dB) ('haut', f0, dB) ('cloche', f0, dB, largeur_octaves)."""
    g = np.ones_like(f)
    ff = np.maximum(f, 1e-3)
    for b in bandes:
        if b[0] == 'hp':
            g *= 1.0 / np.sqrt(1.0 + (b[1] / ff) ** (2 * b[2]))
        elif b[0] == 'lp':
            g *= 1.0 / np.sqrt(1.0 + (ff / b[1]) ** (2 * b[2]))
        elif b[0] == 'haut':
            g *= 10 ** (b[2] / 20.0 / (1.0 + (b[1] / ff) ** 2.2))
        elif b[0] == 'bas':
            g *= 10 ** (b[2] / 20.0 / (1.0 + (ff / b[1]) ** 2.2))
        elif b[0] == 'cloche':
            g *= 10 ** (b[2] / 20.0 * np.exp(-0.5 * (np.log2(ff / b[1]) / (b[3] / 2.355)) ** 2))
    return g


def eq(x, bandes, sr=SR):
    if not bandes:
        return x
    n = len(x)
    nf = 1 << int(np.ceil(np.log2(n + sr)))
    X = _spectre(x, nf)
    g = courbe_eq(np.fft.rfftfreq(nf, 1.0 / sr), bandes)
    return np.fft.irfft(X * (g[:, None] if x.ndim == 2 else g), n=nf, axis=0)[:n]


def convoluer(x, ir):
    n = len(x) + len(ir) - 1
    nf = 1 << int(np.ceil(np.log2(n)))
    out = np.zeros((n, 2))
    for c in range(2):
        out[:, c] = np.fft.irfft(np.fft.rfft(x[:, c], nf) * np.fft.rfft(ir[:, c], nf), nf)[:n]
    return out


def salle(rt=2.6, predelai=0.024, graine=11, clarte=1.0, sr=SR, largeur=0.62):
    """Réponse impulsionnelle synthétique d'une grande salle : bruit gaussien dont chaque bande de fréquence
    s'éteint à sa vitesse (aigus plus courts), montée diffuse, premières réflexions denses, pré-délai."""
    n = int(sr * (rt * 1.35 + 0.4))
    t = np.arange(n) / sr
    f = np.fft.rfftfreq(n, 1.0 / sr)
    rng = np.random.default_rng(graine)
    bandes = [(88, 0.86), (177, 0.98), (354, 1.04), (707, 1.0), (1414, 0.92), (2828, 0.76), (5657, 0.52), (11314, 0.3)]
    brut = np.zeros((n, 2))
    lf = np.log2(np.maximum(f, 1.0))
    for c in range(2):
        X = np.fft.rfft(rng.standard_normal(n))
        for fc, k in bandes:
            m = np.clip(1.0 - np.abs(lf - np.log2(fc)), 0.0, 1.0)             # bandes triangulaires d'une octave (somme = 1)
            if fc == bandes[0][0]:
                m = np.where(f < fc, 1.0, m)
            if fc == bandes[-1][0]:
                m = np.where(f > fc, 1.0, m)
            brut[:, c] += np.fft.irfft(X * m, n) * np.exp(-6.908 * t / (rt * k * clarte if fc > 1000 else rt * k))
    ir = np.empty_like(brut)
    c2 = (1.0 - largeur) * 0.8
    ir[:, 0] = brut[:, 0] + c2 * brut[:, 1]
    ir[:, 1] = brut[:, 1] + c2 * brut[:, 0]
    env = (1.0 - np.exp(-t / 0.010)) * (1.0 + 1.6 * np.exp(-t / 0.045))
    ir *= env[:, None]
    ir = eq(ir, [('hp', 170, 2), ('lp', 7200, 1), ('lp', 13000, 2), ('cloche', 420, -1.5, 1.4)], sr)
    ir *= np.minimum(1.0, (n - np.arange(n)) / (0.05 * sr))[:, None]
    pd = int(predelai * sr)
    ir = np.vstack([np.zeros((pd, 2)), ir])
    ir /= np.sqrt((ir ** 2).sum() / 2.0)
    return ir


def wow(x, cents=5.0, hz=0.7, graine=3, sr=SR):
    """Légère fluctuation de vitesse (manivelle d'orgue de barbarie, ressort de boîte à musique)."""
    n = len(x)
    t = np.arange(n) / sr
    rng = np.random.default_rng(graine)
    eps = (2 ** (cents / 1200.0) - 1.0)
    dev = eps * (0.7 * np.sin(2 * np.pi * hz * t + rng.uniform(0, 6.28)) / (2 * np.pi * hz)
                 + 0.5 * np.sin(2 * np.pi * hz * 0.37 * t + rng.uniform(0, 6.28)) / (2 * np.pi * hz * 0.37))
    pos = np.clip(np.arange(n) + dev * sr, 0, n - 1)
    out = np.empty_like(x)
    for c in range(x.shape[1]):
        out[:, c] = np.interp(pos, np.arange(n), x[:, c])
    return out


def _kpond(sr):
    def biq(f0, q, gain_db=None):
        k = np.tan(np.pi * f0 / sr)
        if gain_db is None:
            a0 = 1 + k / q + k * k
            return (1.0, -2.0, 1.0), (1.0, 2 * (k * k - 1) / a0, (1 - k / q + k * k) / a0)
        vh = 10 ** (gain_db / 20.0)
        vb = vh ** 0.4996667741545416
        a0 = 1 + k / q + k * k
        return ((vh + vb * k / q + k * k) / a0, 2 * (k * k - vh) / a0, (vh - vb * k / q + k * k) / a0), (1.0, 2 * (k * k - 1) / a0, (1 - k / q + k * k) / a0)
    return [biq(1681.974450955533, 0.7071752369554196, 3.999843853973347), biq(38.13547087602444, 0.5003270373238773)]


def kfiltre(x, sr=SR):
    """Pondération K (BS.1770) appliquée dans le domaine fréquentiel."""
    n = len(x)
    nf = 1 << int(np.ceil(np.log2(n + sr)))
    w = 2 * np.pi * np.fft.rfftfreq(nf)
    z1, z2 = np.exp(-1j * w), np.exp(-2j * w)
    h = np.ones(len(w), dtype=complex)
    for b, a in _kpond(sr):
        h *= (b[0] + b[1] * z1 + b[2] * z2) / (a[0] + a[1] * z1 + a[2] * z2)
    X = np.fft.rfft(x, nf, axis=0)
    return np.fft.irfft(X * (h[:, None] if x.ndim == 2 else h), nf, axis=0)[:n]


def lufs(x, sr=SR, detail=False):
    """Sonie intégrée BS.1770-4 (portes -70 LUFS et -10 LU). x : (n, canaux)."""
    if x.ndim == 1:
        x = x[:, None]
    y = kfiltre(x, sr)
    bloc, saut = int(0.4 * sr), int(0.1 * sr)
    if len(y) < bloc:
        y = np.vstack([y, np.zeros((bloc - len(y), y.shape[1]))])
    cs = np.vstack([np.zeros((1, y.shape[1])), np.cumsum(y ** 2, axis=0)])
    idx = np.arange(0, len(y) - bloc + 1, saut)
    ms = ((cs[idx + bloc] - cs[idx]) / bloc).sum(axis=1)
    l = -0.691 + 10 * np.log10(np.maximum(ms, 1e-12))
    g1 = ms[l > -70.0]
    if len(g1) == 0:
        return (-99.0, l) if detail else -99.0
    rel = -0.691 + 10 * np.log10(g1.mean()) - 10.0
    g2 = ms[(l > -70.0) & (l > rel)]
    val = -0.691 + 10 * np.log10(g2.mean()) if len(g2) else -99.0
    return (val, l) if detail else val


def vraie_crete(x, sur=4):
    """Crête inter-échantillons (suréchantillonnage ×4 par FFT), en valeur linéaire."""
    if x.ndim == 1:
        x = x[:, None]
    pk = 0.0
    bloc = 1 << 18
    for c in range(x.shape[1]):
        for a in range(0, len(x), bloc):
            seg = x[max(0, a - 2048):a + bloc + 2048, c]
            if len(seg) < 16:
                continue
            X = np.fft.rfft(seg)
            y = np.fft.irfft(X, len(seg) * sur) * sur
            pk = max(pk, float(np.abs(y).max()))
    return pk


def compresseur(x, seuil=-24.0, ratio=1.8, genou=8.0, att=0.03, rel=0.35, sr=SR):
    """Compresseur de bus doux (détection RMS liée entre canaux). Renvoie (signal, réduction max en dB)."""
    saut = 64
    m = (x ** 2).mean(axis=1) if x.ndim == 2 else x ** 2
    nb = len(m) // saut
    e = m[:nb * saut].reshape(nb, saut).mean(axis=1)
    w = max(1, int(0.02 * sr / saut))
    e = np.convolve(e, np.ones(w) / w, 'same')
    niv = 10 * np.log10(np.maximum(e, 1e-12))
    over = niv - seuil
    red = np.where(over <= -genou / 2, 0.0, np.where(over >= genou / 2, over * (1 - 1 / ratio), (over + genou / 2) ** 2 / (2 * genou) * (1 - 1 / ratio)))
    ca, cr = np.exp(-saut / (att * sr)), np.exp(-saut / (rel * sr))
    g = np.empty(nb)
    cur = 0.0
    for i in range(nb):
        r = red[i]
        cur = ca * cur + (1 - ca) * r if r > cur else cr * cur + (1 - cr) * r
        g[i] = cur
    gs = np.interp(np.arange(len(m)), (np.arange(nb) + 0.5) * saut, g)
    lin = 10 ** (-gs / 20.0)
    return x * (lin[:, None] if x.ndim == 2 else lin), float(g.max())


def limiteur(x, plafond_db=-1.2, anticipation=0.005, rel=0.08, sr=SR):
    """Limiteur à anticipation : gain = minimum glissant du gain nécessaire, lissé."""
    plafond = 10 ** (plafond_db / 20.0)
    a = np.abs(x).max(axis=1) if x.ndim == 2 else np.abs(x)
    besoin = np.minimum(1.0, plafond / np.maximum(a, 1e-9))
    if besoin.min() >= 1.0:
        return x, (0.0, 0.0, 0.0)
    w = int(anticipation * sr)
    g = besoin.copy()
    for k in range(1, w + 1):                      # minimum sur [i-w, i+w]
        g[k:] = np.minimum(g[k:], besoin[:-k])
        g[:-k] = np.minimum(g[:-k], besoin[k:])
    # relâchement exponentiel (le gain remonte lentement), puis lissage court
    saut = 8
    nb = len(g) // saut
    gb = g[:nb * saut].reshape(nb, saut).min(axis=1)
    c = np.exp(-saut / (rel * sr))
    cur = 1.0
    for i in range(nb):
        cur = gb[i] if gb[i] < cur else min(1.0, c * cur + (1 - c) * 1.0)
        gb[i] = cur
    gl = np.minimum(g, np.interp(np.arange(len(g)), (np.arange(nb) + 0.5) * saut, gb))
    h = np.hanning(w | 1)
    gl2 = np.convolve(gl, h / h.sum(), 'same')
    gl = np.minimum(gl2, 1.0)                      # fenêtre de lissage <= fenêtre du minimum : jamais au-dessus du gain nécessaire
    y = x * (gl[:, None] if x.ndim == 2 else gl)
    dep = np.abs(y).max()
    if dep > plafond:
        y *= plafond / dep
    return y, (float(-db(gl.min())), float((gl < 10 ** (-1 / 20.0)).mean()), float((gl < 10 ** (-3 / 20.0)).mean()))


def fondus(x, entree=0.01, sortie=0.5, sr=SR):
    y = x.copy()
    n1, n2 = int(entree * sr), int(sortie * sr)
    if n1 > 1:
        y[:n1] *= (0.5 - 0.5 * np.cos(np.pi * np.arange(n1) / n1))[:, None]
    if n2 > 1:
        y[-n2:] *= (0.5 + 0.5 * np.cos(np.pi * np.arange(n2) / n2))[:, None]
    return y


# ----------------------------------------------------------------------------- rendu d'une partition
def rendre(P, tmp, lat, queue=5.0, periodes=1, bavard=True):
    """Rend chaque partie en piste séparée, équilibre les niveaux par la mesure (sonie cible par partie) et mixe.
    Renvoie (mix sec + réverbération, infos par piste). periodes > 1 : la partition est répétée (boucles)."""
    os.makedirs(tmp, exist_ok=True)
    L = P.secondes(P.boucle) if P.boucle else 0.0
    duree = (P.secondes(P.fin()) if not P.boucle else L * periodes) + queue
    n = int(duree * SR)
    pistes = []
    for p in P.parties:
        if not p.notes:
            continue
        lat.mesurer(p.prog, p.banque, p.canal, set(nn.p for nn in p.notes))
        notes, cc = P.evenements(p, lat)
        if P.boucle:
            base, basecc = notes, cc
            notes, cc = [], []
            for k in range(periodes):
                notes += [(a + k * L, b + k * L, h, v) for a, b, h, v in base]
                cc += [(t + k * L, num, val) for t, num, val in basecc]
        cc = [(0.0, 10, 64 + 63 * max(-1, min(1, p.mix['pan'])))] + cc
        if not any(c[1] == 11 for c in cc):
            cc = [(0.0, 11, 127)] + cc
        dec = min(0.0, min(a for a, _b, _h, _v in notes))     # notes avancées avant t=0 : on décale tout
        versions = [0.0] if not p.mix['double'] else [-p.mix['double'], p.mix['double']]
        x = np.zeros((n, 2))
        for iv, cents in enumerate(versions):
            mid = os.path.join(tmp, '%s_%s_%d.mid' % (P.nom, p.nom, iv))
            wav = mid[:-4] + '.wav'
            midi.ecrire(mid, p.canal, p.prog, [(a - dec, b - dec, h, v) for a, b, h, v in notes],
                        cc=[(max(0.0, t - dec), num, val) for t, num, val in cc], banque=p.banque, fin=duree - dec,
                        bend=[(0.0, cents / 200.0 * 8192)] if cents else ())
            y = fluid(mid, wav)
            k0 = int(round(-dec * SR))
            y = y[k0:k0 + n]
            if cents:                                       # les deux rangs un peu écartés dans l'espace
                y = y * (np.array([1.0, 0.72]) if iv == 0 else np.array([0.72, 1.0]))
            x[:len(y)] += y / len(versions) ** 0.5
            os.remove(wav)
        if p.mix['wow']:
            x = wow(x, p.mix['wow'], graine=len(pistes) + 3)
        bandes = []
        if p.mix['hp']:
            bandes.append(('hp', p.mix['hp'], 2))
        if p.mix['lp']:
            bandes.append(('lp', p.mix['lp'], 2))
        if p.mix.get('eq'):
            bandes += list(p.mix['eq'])
        if bandes:
            x = eq(x, bandes)
        if p.mix['large'] != 1.0:
            mid_, cote = x.mean(axis=1), (x[:, 0] - x[:, 1]) / 2
            x = np.stack([mid_ + cote * p.mix['large'], mid_ - cote * p.mix['large']], axis=1)
        pistes.append(dict(partie=p, x=x))
    # équilibre : chaque piste est amenée à sa sonie cible (mesurée sur ses passages joués)
    mix = np.zeros((n, 2))
    env_rev = np.zeros((n, 2))
    infos = []
    for ps in pistes:
        p, x = ps['partie'], ps['x']
        l0 = lufs(x)
        cible = p.mix.get('niv')
        g = 10 ** ((cible - l0) / 20.0) if cible is not None and l0 > -90 else 10 ** (p.mix['gain'] / 20.0)
        x = x * g
        mix += x
        env_rev += x * p.mix['rev']
        infos.append((p.nom, l0, 20 * np.log10(g), lufs(x), float(np.abs(x).max()), p.mix['rev']))
        ps['x'] = None
    return mix, env_rev, infos


def encoder_mp3(wav, mp3, debit='64k', sr=32000, mono=False, coupe=None, abr=True):
    cmd = ['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', wav, '-map_metadata', '-1', '-ar', str(sr),
           '-ac', '1' if mono else '2', '-c:a', 'libmp3lame', '-b:a', debit, '-compression_level', '0']
    if abr:
        cmd += ['-abr', '1']
    if not mono:
        cmd += ['-joint_stereo', '1']
    if coupe:
        cmd += ['-cutoff', str(int(coupe))]
    cmd += ['-id3v2_version', '0', '-write_id3v1', '0', '-write_xing', '1', '-fflags', '+bitexact', mp3]
    subprocess.run(cmd, check=True)
    return os.path.getsize(mp3)


def decoder(fichier, tmp, sr=SR):
    wav = os.path.join(tmp, '_dec.wav')
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', fichier, '-ar', str(sr), '-c:a', 'pcm_f32le', wav], check=True)
    x, _ = lire_wav(wav)
    os.remove(wav)
    return x
