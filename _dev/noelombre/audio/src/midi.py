"""Écriture minimale de fichiers MIDI (format 1), sans dépendance.

Tout est daté en SECONDES : le rubato, le balancement de valse et les ralentis sont calculés par
partition.py, puis convertis ici en tics à tempo fixe (120 à la noire, 960 tics par noire = 0,52 ms).
"""
import struct

TPQ = 960
BPM = 120.0
TICS_PAR_S = TPQ * BPM / 60.0


def _vlq(n):
    n = int(n)
    out = [n & 0x7F]
    n >>= 7
    while n:
        out.append((n & 0x7F) | 0x80)
        n >>= 7
    return bytes(reversed(out))


def _piste(evts):
    """evts : liste (tic, ordre, octets). Renvoie le bloc MTrk."""
    evts = sorted(evts, key=lambda e: (e[0], e[1]))
    data = bytearray()
    t0 = 0
    for tic, _o, b in evts:
        data += _vlq(max(0, tic - t0)) + b
        t0 = max(t0, tic)
    data += b'\x00\xff\x2f\x00'
    return b'MTrk' + struct.pack('>I', len(data)) + bytes(data)


def ecrire(chemin, canal, programme, notes, cc=(), banque=0, fin=None, bend=()):
    """Écrit une piste jouée par UN instrument.

    notes : liste (t_debut_s, t_fin_s, hauteur_midi, velocite)
    cc    : liste (t_s, numero, valeur)
    bend  : liste (t_s, valeur -8192..8191)
    fin   : instant (s) d'un dernier événement muet, pour que le rendu garde la queue des notes.
    """
    tk = lambda s: int(round(max(0.0, s) * TICS_PAR_S))
    tempo = int(round(60e6 / BPM))
    t0 = [(0, 0, b'\xff\x51\x03' + struct.pack('>I', tempo)[1:])]
    ev = []
    c = canal & 15
    if canal != 9:
        ev.append((0, 0, bytes([0xB0 | c, 0, banque & 127])))
        ev.append((0, 1, bytes([0xB0 | c, 32, 0])))
    else:
        ev.append((0, 0, bytes([0xB0 | c, 0, 0])))
    ev.append((0, 2, bytes([0xC0 | c, programme & 127])))
    for t, num, val in cc:
        ev.append((tk(t), 3, bytes([0xB0 | c, num & 127, max(0, min(127, int(round(val))))])))
    for t, val in bend:
        v = max(0, min(16383, int(round(val)) + 8192))
        ev.append((tk(t), 3, bytes([0xE0 | c, v & 127, v >> 7])))
    for a, b, p, v in notes:
        ta, tb = tk(a), tk(b)
        if tb <= ta:
            tb = ta + 1
        ev.append((ta, 5, bytes([0x90 | c, int(p) & 127, max(1, min(127, int(round(v))))])))
        ev.append((tb, 4, bytes([0x80 | c, int(p) & 127, 0])))
    if fin is not None:
        ev.append((tk(fin), 9, bytes([0xB0 | c, 110, 0])))
    with open(chemin, 'wb') as f:
        f.write(b'MThd' + struct.pack('>IHHH', 6, 1, 2, TPQ))
        f.write(_piste(t0))
        f.write(_piste(ev))
