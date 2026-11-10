"""Petit langage de partition pour la bande-son de Noëlombre.

Une pièce = une `Partition` : mesure, carte de tempo (rubato, ralentis), grille d'accords, et des `Partie`
(un instrument chacune) écrites note par note :

    mel.joue("e5:q a5 c6 | b5:h a5:q | g#5:q. a5:e b5:q | e5:h.", depart=12, v=(62, 78))

Hauteurs : lettre (a-g), altérations (# ou b), octave (c4 = do du milieu = 60). Durées en noires après « : »
(w=4, h=2, q=1, e=0,5, s=0,25, t=1/3 ; « . » pointe ; ou un nombre : 1.5, 2/3). La durée se garde d'une note à l'autre.
« r » = silence, « _ » prolonge la note précédente, « [c4 e4 g4]:h » = accord, « | » = barre de mesure (vérifiée).
Suffixes : ' staccato, ! accent, ? note effacée, ~ laisser vibrer, * note étrangère voulue (non signalée).

`Partition.verifier()` relit la partition d'un œil critique : notes hors de l'accord et non résolues, frottements
de seconde mineure entre parties, grave trop chargé, tessitures, croisements, mélodie trop aiguë, densité.
"""
import math
import random
import re

_PC = {'c': 0, 'd': 2, 'e': 4, 'f': 5, 'g': 7, 'a': 9, 'b': 11}
_NOMS = ['do', 'do#', 'ré', 'mib', 'mi', 'fa', 'fa#', 'sol', 'lab', 'la', 'sib', 'si']
_DUR = {'w': 4.0, 'h': 2.0, 'q': 1.0, 'e': 0.5, 's': 0.25, 't': 1.0 / 3.0, 'z': 0.125}


def hauteur(s):
    m = re.fullmatch(r'([a-g])([#b]*)(-?\d)', s)
    if not m:
        raise ValueError('hauteur illisible : %r' % s)
    return _PC[m.group(1)] + m.group(2).count('#') - m.group(2).count('b') + 12 * (int(m.group(3)) + 1)


def nom(p):
    return '%s%d' % (_NOMS[p % 12], p // 12 - 1)


def duree(s):
    pts = 0
    while s.endswith('.') and len(s) > 1 and not s[-2].isdigit():
        s = s[:-1]
        pts += 1
    if s in _DUR:
        d = _DUR[s]
    elif '/' in s:
        a, b = s.split('/')
        d = float(a) / float(b)
    else:
        d = float(s)
    return d * (2.0 - 0.5 ** pts)


def lire(texte, mesure=None, d0=1.0):
    """Texte -> ([debut, duree, [hauteurs], drapeaux], …), longueur totale en noires."""
    pos, d, out = 0.0, d0, []
    for tok in re.findall(r'\[[^\]]*\]\S*|\S+', texte):
        if tok == '|':
            if mesure and abs(pos / mesure - round(pos / mesure)) > 1e-6:
                raise ValueError('barre de mesure mal placée (temps %.3f) dans : %s' % (pos, texte.strip()[:70]))
            continue
        fl = ''
        while tok and tok[-1] in "'!?*~^":
            fl += tok[-1]
            tok = tok[:-1]
        if ':' in tok:
            tete, ds = tok.rsplit(':', 1)
            d = duree(ds)
        else:
            tete = tok
        if tete in ('r', '-'):
            pos += d
        elif tete == '_':
            if not out:
                raise ValueError('« _ » sans note avant')
            out[-1][1] += d
            pos += d
        else:
            hs = [hauteur(x) for x in tete[1:-1].replace(',', ' ').split()] if tete.startswith('[') else [hauteur(tete)]
            out.append([pos, d, hs, fl])
            pos += d
    return out, pos


# ----------------------------------------------------------------------------- accords
_QUAL = {
    '': (0, 4, 7), 'm': (0, 3, 7), 'dim': (0, 3, 6), 'aug': (0, 4, 8), '5': (0, 7),
    '7': (0, 4, 7, 10), 'M7': (0, 4, 7, 11), 'm7': (0, 3, 7, 10), 'mM7': (0, 3, 7, 11), 'm7b5': (0, 3, 6, 10),
    'dim7': (0, 3, 6, 9), '6': (0, 4, 7, 9), 'm6': (0, 3, 7, 9), 'sus4': (0, 5, 7), 'sus2': (0, 2, 7),
    '7sus4': (0, 5, 7, 10), 'add9': (0, 4, 7, 2), 'madd9': (0, 3, 7, 2), '9': (0, 4, 7, 10, 2), 'm9': (0, 3, 7, 10, 2),
    'M9': (0, 4, 7, 11, 2), '7b9': (0, 4, 7, 10, 1), '7#5': (0, 4, 8, 10), 'aug7': (0, 4, 8, 10), '69': (0, 4, 7, 9, 2),
}
_TENS = {'9': 2, 'b9': 1, '#9': 3, '11': 5, '#11': 6, '13': 9, 'b13': 8, '6': 9, 'b6': 8, '7': 10, 'M7': 11, '4': 5, '2': 2}


class Accord:
    def __init__(self, sym):
        self.nom = sym
        m = re.fullmatch(r'([A-G][#b]?)([^/(]*)(?:\(([^)]*)\))?(?:/([A-G][#b]?))?', sym)
        if not m or m.group(2) not in _QUAL:
            raise ValueError('accord illisible : %r' % sym)
        pc = lambda s: (_PC[s[0].lower()] + s.count('#') - s[1:].count('b')) % 12
        self.racine = pc(m.group(1))
        self.inter = _QUAL[m.group(2)]
        self.pcs = [(self.racine + i) % 12 for i in self.inter]          # dans l'ordre fondamentale, tierce, quinte…
        self.tens = set((self.racine + _TENS[t]) % 12 for t in m.group(3).split(',')) if m.group(3) else set()
        self.basse = pc(m.group(4)) if m.group(4) else self.racine
        self.ok = set(self.pcs) | self.tens | {self.basse}

    def tierce(self):
        for i in self.inter:
            if i in (3, 4):
                return (self.racine + i) % 12
        for i in self.inter:
            if i in (5, 2):
                return (self.racine + i) % 12
        return None

    def septieme(self):
        for i in self.inter:
            if i in (9, 10, 11) and len(self.inter) >= 4:
                return (self.racine + i) % 12
        return None

    def quinte(self):
        for i in self.inter:
            if i in (6, 7, 8):
                return (self.racine + i) % 12
        return None


def lire_grille(texte, mesure):
    """« Am | Dm/F | E7:2 E7b9:1 | % » -> [(debut, duree, Accord)], une mesure entre deux barres."""
    out, pos, prec = [], 0.0, None
    for bar in [b.strip() for b in texte.replace('\n', ' ').split('|')]:
        if not bar:
            continue
        toks = bar.split()
        libres = [t for t in toks if ':' not in t]
        pris = sum(duree(t.rsplit(':', 1)[1]) for t in toks if ':' in t)
        dlib = (mesure - pris) / len(libres) if libres else 0
        tot = 0.0
        for t in toks:
            sym, d = (t.rsplit(':', 1)[0], duree(t.rsplit(':', 1)[1])) if ':' in t else (t, dlib)
            acc = prec if sym == '%' else Accord(sym)
            out.append((pos + tot, d, acc))
            prec = acc
            tot += d
        if abs(tot - mesure) > 1e-6:
            raise ValueError('mesure de grille de durée %.3f au lieu de %g : %s' % (tot, mesure, bar))
        pos += mesure
    return out


def placer(pc, pres, bas=0, haut=127):
    """La hauteur de classe `pc` la plus proche de `pres`, dans [bas, haut]."""
    best = None
    for o in range(-1, 10):
        p = pc % 12 + 12 * o
        if bas <= p <= haut and (best is None or abs(p - pres) < abs(best - pres)):
            best = p
    return best


def voicing(acc, bas, haut, n=3, prec=None, sans_basse=True, centre=None):
    """n notes de l'accord dans [bas, haut], position serrée, au plus près de `prec` (conduite des voix)."""
    import itertools
    pcs = list(dict.fromkeys(acc.pcs))
    oblig = [x for x in (acc.tierce(), acc.septieme()) if x is not None]
    if centre is None:
        centre = (bas + haut) / 2.0
    cand = []
    for combo in itertools.combinations(pcs, min(n, len(pcs))):
        if any(o not in combo for o in oblig[:n]):
            continue
        for base in range(bas, haut + 1):
            if base % 12 not in combo:
                continue
            notes = [base]
            reste = [c for c in combo if c != base % 12]
            ok = True
            while reste:
                nxt = min(reste, key=lambda c: (c - notes[-1]) % 12)
                p = notes[-1] + ((nxt - notes[-1]) % 12)
                if p > haut:
                    ok = False
                    break
                notes.append(p)
                reste.remove(nxt)
            if not ok:
                continue
            if n > len(pcs):                      # doublure à l'octave de la première note si l'accord est trop petit
                if notes[0] + 12 <= haut:
                    notes.append(notes[0] + 12)
                else:
                    continue
            cout = 0.0
            if prec:
                pp = sorted(prec)
                for i, x in enumerate(sorted(notes)):
                    cout += abs(x - pp[min(i, len(pp) - 1)])
            cout += 0.15 * abs(sum(notes) / len(notes) - centre)
            if sans_basse and notes[0] % 12 == acc.basse and len(pcs) > 3:
                cout += 0.5
            cand.append((cout, notes))
    if not cand:
        raise ValueError('pas de position pour %s dans [%d, %d]' % (acc.nom, bas, haut))
    return sorted(min(cand, key=lambda c: c[0])[1])


# ----------------------------------------------------------------------------- parties
class Note:
    __slots__ = ('b', 'd', 'p', 'v', 'f', 'voix')

    def __init__(self, b, d, p, v, f='', voix=0):
        self.b, self.d, self.p, self.v, self.f, self.voix = b, d, p, v, f, voix


class Partie:
    _voix = 0

    def __init__(self, P, nom, prog, banque=0, canal=0, tess=(0, 127), legato=0.94, tenue=0.0, hum_t=0.008, hum_v=3.5,
                 avance=0.0, roule=0.0, verif=True, role='accomp', temps_fort=3.0, latence=1.0, **mix):
        self.P, self.nom, self.prog, self.banque, self.canal = P, nom, prog, banque, canal
        self.tess, self.legato, self.tenue, self.hum_t, self.hum_v = tess, legato, tenue, hum_t, hum_v
        self.avance, self.roule, self.verif, self.role, self.temps_fort, self.latence = avance, roule, verif, role, temps_fort, latence
        self.mix = dict(gain=0.0, pan=0.0, rev=0.25, lp=None, hp=None, wow=0.0, double=0.0, large=1.0)
        self.mix.update(mix)
        self.notes, self.ccs = [], []

    def joue(self, texte, depart=0.0, v=70, tr=0, voix=None, legato=None):
        """Ajoute une phrase. v : nombre, (v0, v1) en fondu sur la phrase, ou [(temps_relatif, v), …]."""
        ev, long_ = lire(texte, self.P.mesure)
        if voix is None:
            Partie._voix += 1
            voix = Partie._voix
        for b, d, hs, fl in ev:
            vel = self._vel(v, b, long_)
            if '!' in fl:
                vel += 11
            if '^' in fl:
                vel += 5
            if '?' in fl:
                vel -= 11
            for h in hs:
                n = Note(depart + b, d, h + tr, vel, fl, voix)
                if legato is not None:
                    n.f += 'L%g;' % legato
                self.notes.append(n)
        return depart + long_

    @staticmethod
    def _vel(v, b, long_):
        if isinstance(v, (int, float)):
            return float(v)
        if isinstance(v, tuple):
            return v[0] + (v[1] - v[0]) * (b / long_ if long_ else 0)
        pts = sorted(v)
        if b <= pts[0][0]:
            return float(pts[0][1])
        for (b0, v0), (b1, v1) in zip(pts, pts[1:]):
            if b <= b1:
                return v0 + (v1 - v0) * (b - b0) / (b1 - b0 if b1 > b0 else 1)
        return float(pts[-1][1])

    def note(self, b, d, p, v=70, f='', voix=None):
        if voix is None:
            Partie._voix += 1
            voix = Partie._voix
        self.notes.append(Note(b, d, p, v, f, voix))

    def expr(self, points, cc=11, pas=0.125):
        """Courbe de contrôleur (11 = expression) : points (temps, valeur) reliés en ligne droite."""
        pts = sorted(points)
        for (b0, v0), (b1, v1) in zip(pts, pts[1:]):
            n = max(1, int(round((b1 - b0) / pas)))
            for i in range(n):
                self.ccs.append((b0 + (b1 - b0) * i / n, cc, v0 + (v1 - v0) * i / n))
        self.ccs.append((pts[-1][0], cc, pts[-1][1]))

    def cc(self, b, num, val):
        self.ccs.append((b, num, val))


class Partition:
    def __init__(self, nom, mesure, tempo, grille, titre='', ton='', graine=1, balance=None, boucle=None):
        """tempo : nombre ou [(temps, noires/min), …] (interpolé) ; balance(t) : décalage en noires (valse) ;
        boucle : longueur en noires si la pièce se replie sur elle-même."""
        self.nom, self.mesure, self.titre, self.ton, self.graine = nom, float(mesure), titre, ton, graine
        self.tempo = [(0.0, float(tempo))] if isinstance(tempo, (int, float)) else [(float(a), float(b)) for a, b in tempo]
        self.grille = lire_grille(grille, self.mesure) if grille else []
        self.parties, self.balance, self.boucle = [], balance, boucle
        self.ordre = []          # parties du haut vers le bas, pour le contrôle des croisements
        self.sections = []       # (nom, temps de début)
        self._table = None

    def partie(self, nom, prog, **kw):
        p = Partie(self, nom, prog, **kw)
        self.parties.append(p)
        return p

    def m(self, mes, temps=0.0):
        """Temps (en noires) du début de la mesure `mes` (numérotée à partir de 1)."""
        return (mes - 1) * self.mesure + temps

    def fin(self):
        return max((n.b + n.d for p in self.parties for n in p.notes), default=0.0)

    # ---- temps réel
    def _bpm(self, b):
        t = self.tempo
        if b <= t[0][0]:
            return t[0][1]
        for (b0, v0), (b1, v1) in zip(t, t[1:]):
            if b <= b1:
                return v0 + (v1 - v0) * (b - b0) / (b1 - b0) if b1 > b0 else v1
        return t[-1][1]

    def secondes(self, b):
        if self._table is None:
            pas, n = 1.0 / 32.0, int((max(self.fin(), self.tempo[-1][0]) + 400) * 32)
            acc, tab = 0.0, [0.0]
            for i in range(n):
                acc += pas * 60.0 / self._bpm((i + 0.5) * pas)
                tab.append(acc)
            self._table = tab
        if b <= 0:
            return b * 60.0 / self.tempo[0][1]
        x = b * 32.0
        i = min(int(x), len(self._table) - 2)
        return self._table[i] + (self._table[i + 1] - self._table[i]) * (x - i)

    def accord_a(self, b):
        if self.boucle:
            b = b % self.boucle
        for d0, dd, acc in self.grille:
            if d0 - 1e-6 <= b < d0 + dd - 1e-6:
                return acc
        return None

    # ---- export : notes datées en secondes, humanisées
    def evenements(self, partie, latence=None):
        """-> (notes [(t0, t1, hauteur, vélocité)], cc [(t, num, val)]) pour une partie."""
        rnd = random.Random('%s/%s/%d' % (self.nom, partie.nom, self.graine))
        par_debut = {}
        for n in partie.notes:
            par_debut.setdefault((round(n.b, 4), n.voix), []).append(n)
        out = []
        for (b, _v), grp in sorted(par_debut.items(), key=lambda kv: kv[0]):
            grp.sort(key=lambda n: n.p)
            dec = self.balance(b % self.mesure) if self.balance else 0.0
            jit = rnd.gauss(0, partie.hum_t) if partie.hum_t else 0.0
            jit = max(-2.5 * partie.hum_t, min(2.5 * partie.hum_t, jit))
            for i, n in enumerate(grp):
                t0 = self.secondes(n.b + dec) + partie.avance + jit + i * partie.roule
                if partie.hum_t:
                    t0 += rnd.uniform(-0.002, 0.002)
                lg = partie.legato
                m = re.search(r'L([\d.]+);', n.f)
                if m:
                    lg = float(m.group(1))
                if "'" in n.f:
                    lg = min(lg, 0.45)
                t1 = self.secondes(n.b + dec + n.d * lg) + partie.avance
                tenue = partie.tenue * (2.0 if '~' in n.f else 1.0)
                if "'" not in n.f:
                    t1 = max(t1, t0 + tenue)
                t1 = max(t1, t0 + 0.04)
                vel = n.v + (partie.temps_fort if abs(n.b % self.mesure) < 1e-6 else 0.0) + rnd.gauss(0, partie.hum_v)
                vel = max(8, min(124, vel))
                lat = latence(partie, n.p) * partie.latence if latence else 0.0
                out.append([t0 - lat, t1 - lat, n.p, vel])
        # une même hauteur rejouée coupe la précédente (sinon son « note off » couperait la nouvelle)
        out.sort(key=lambda e: e[0])
        dern = {}
        for e in out:
            k = e[2]
            if k in dern and dern[k][1] > e[0] - 0.004:
                dern[k][1] = max(dern[k][0] + 0.02, e[0] - 0.004)
            dern[k] = e
        cc = [(self.secondes(b) + partie.avance, num, val) for b, num, val in sorted(partie.ccs)]
        return [tuple(e) for e in out], cc

    # ---- relecture critique
    def verifier(self, bavard=True):
        err, avert, lignes = [], [], []
        mes = lambda b: '%d.%s' % (int(b // self.mesure) + 1, ('%.2f' % (b % self.mesure + 1)).rstrip('0').rstrip('.'))
        harm = [p for p in self.parties if p.verif and p.canal != 9]
        statut = {}
        # 1) chaque note contre la grille
        for p in harm:
            voix = {}
            for n in p.notes:
                voix.setdefault(n.voix, []).append(n)
            for ns in voix.values():
                ns.sort(key=lambda n: (n.b, n.p))
                debuts = sorted(set(round(n.b, 4) for n in ns))
                mono = {b: [n for n in ns if round(n.b, 4) == b] for b in debuts}
                for i, b in enumerate(debuts):
                    for n in mono[b]:
                        acc = self.accord_a(n.b)
                        if acc is None:
                            continue
                        dans = n.p % 12 in acc.ok
                        if dans:
                            statut[id(n)] = 'accord'
                            # tenue par-dessus un changement d'accord
                            fin = n.b + n.d
                            for d0, dd, a2 in self.grille:
                                if n.b + 1e-6 < d0 < fin - 0.26 and n.p % 12 not in a2.ok and '*' not in n.f:
                                    avert.append('%s %s : %s tenu sur %s (mes. %s)' % (mes(n.b), p.nom, nom(n.p), a2.nom, mes(d0)))
                            continue
                        if '*' in n.f:
                            statut[id(n)] = 'voulue'
                            continue
                        seul = len(mono[b]) == 1
                        prec = mono[debuts[i - 1]] if i > 0 else None
                        suiv = mono[debuts[i + 1]] if i + 1 < len(debuts) else None
                        pp = prec[-1].p if prec and len(prec) == 1 else None
                        sp = suiv[-1].p if suiv and len(suiv) == 1 else None
                        sacc = self.accord_a(suiv[-1].b) if suiv else None
                        s_ok = sp is not None and sacc is not None and sp % 12 in sacc.ok
                        typ = None
                        if seul and sp is not None and abs(sp - n.p) <= 2 and sp != n.p:
                            if pp is not None and abs(pp - n.p) <= 2 and (sp - n.p) * (n.p - pp) > 0 and n.d <= 1.01:
                                typ = 'passage'
                            elif pp is not None and pp == sp and n.d <= 1.01:
                                typ = 'broderie'
                            elif s_ok and n.d <= 2.01:
                                typ = 'appoggiature'
                            elif pp is not None and abs(pp - n.p) <= 2 and n.d <= 0.51:
                                typ = 'passage'
                        if typ is None and seul and sp is not None and sp == n.p and s_ok and n.d <= 0.51:
                            typ = 'anticipation'
                        if typ is None and seul and pp is not None and abs(pp - n.p) <= 2 and n.d <= 0.51 and sp is not None and s_ok:
                            typ = 'échappée'
                        if typ:
                            statut[id(n)] = typ
                        else:
                            statut[id(n)] = 'erreur'
                            err.append('%s %s : %s étrangère à %s et non résolue' % (mes(n.b), p.nom, nom(n.p), acc.nom))
        # 2) frottements entre notes simultanées (seconde mineure / neuvième mineure / octave diminuée)
        tous = sorted(((n, p) for p in harm for n in p.notes), key=lambda x: x[0].b)
        vus = set()
        for i, (a, pa) in enumerate(tous):
            for b2, pb in tous[i + 1:]:
                if b2.b >= a.b + a.d - 1e-6:
                    break
                rec = min(a.b + a.d, b2.b + b2.d) - max(a.b, b2.b)
                ecart = abs(a.p - b2.p)
                if rec < 0.3 or ecart == 0:
                    continue
                sa, sb = statut.get(id(a), 'accord'), statut.get(id(b2), 'accord')
                etr = sa not in ('accord',) or sb not in ('accord',)
                dur = 0.3 if ecart == 1 else 0.45
                if (ecart in (1, 13) and (etr or pa is not pb) and rec >= dur) or (ecart == 11 and etr and rec >= 0.95):
                    if '*' in a.f or '*' in b2.f:
                        continue
                    cle = (round(max(a.b, b2.b), 2), min(a.p, b2.p), max(a.p, b2.p))
                    if cle in vus:
                        continue
                    vus.add(cle)
                    avert.append('%s frottement %s (%s, %s) / %s (%s, %s) pendant %.2f t' % (
                        mes(max(a.b, b2.b)), nom(a.p), pa.nom, sa, nom(b2.p), pb.nom, sb, rec))
        # 3) grave chargé : deux notes sous do3 à moins d'une quinte
        graves = sorted((n for p in harm for n in p.notes if n.p < 48), key=lambda n: n.b)
        vus = set()
        for i, a in enumerate(graves):
            for b2 in graves[i + 1:]:
                if b2.b >= a.b + a.d - 1e-6:
                    break
                e = abs(a.p - b2.p)
                rec = min(a.b + a.d, b2.b + b2.d) - max(a.b, b2.b)
                if 0 < e < 7 and rec >= 0.5 and (round(b2.b, 2)) not in vus:
                    vus.add(round(b2.b, 2))
                    avert.append('%s grave chargé : %s + %s' % (mes(b2.b), nom(a.p), nom(b2.p)))
        # 4) tessitures, mélodie trop haute
        for p in self.parties:
            if p.canal == 9:
                continue
            hors = [n for n in p.notes if not (p.tess[0] <= n.p <= p.tess[1])]
            if hors:
                err.append('%s : %d note(s) hors tessiture [%s–%s], ex. %s mes. %s' % (
                    p.nom, len(hors), nom(p.tess[0]), nom(p.tess[1]), nom(hors[0].p), mes(hors[0].b)))
            haut = [n for n in p.notes if n.p > 96]
            if haut:
                err.append('%s : %d note(s) au-dessus de do7' % (p.nom, len(haut)))
        # 5) croisements (parties déclarées du haut vers le bas dans self.ordre)
        for hi, lo in zip(self.ordre, self.ordre[1:]):
            n_x = 0
            ex = None
            for a in hi.notes:
                for b2 in lo.notes:
                    if b2.b < a.b + a.d - 1e-6 and a.b < b2.b + b2.d - 1e-6 and b2.p > a.p:
                        rec = min(a.b + a.d, b2.b + b2.d) - max(a.b, b2.b)
                        if rec >= 0.5:
                            n_x += 1
                            ex = ex or (a, b2)
            if n_x:
                avert.append('croisement %s sous %s : %d fois, ex. mes. %s (%s sous %s)' % (
                    hi.nom, lo.nom, n_x, mes(ex[0].b), nom(ex[0].p), nom(ex[1].p)))
        # 6) quintes et octaves parallèles entre la voix du haut et la basse (premier temps de chaque mesure)
        if len(self.ordre) >= 2:
            hi, lo = self.ordre[0], self.ordre[-1]

            def au_temps(part, b):
                c = [n for n in part.notes if abs(n.b - b) < 1e-6]
                return (max if part is hi else min)(c, key=lambda n: n.p).p if c else None
            prec = None
            for k in range(int(self.fin() // self.mesure) + 1):
                b = k * self.mesure
                x, y = au_temps(hi, b), au_temps(lo, b)
                if x is None or y is None:
                    prec = None
                    continue
                if prec and (x - y) % 12 in (0, 7) and (prec[0] - prec[1]) % 12 == (x - y) % 12 and x != prec[0] and (x - prec[0]) * (y - prec[1]) > 0:
                    avert.append('%s %s parallèles %s/%s (mesures %d-%d)' % (
                        mes(b), 'octaves' if (x - y) % 12 == 0 else 'quintes', hi.nom, lo.nom, k, k + 1))
                prec = (x, y)
        # 7) statistiques
        duree_s = self.secondes(self.boucle if self.boucle else self.fin())
        total = 0
        for p in self.parties:
            if not p.notes:
                continue
            total += len(p.notes)
            if p.canal == 9:
                lignes.append('  %-14s %4d frappes' % (p.nom, len(p.notes)))
                continue
            ps = [n.p for n in p.notes]
            st = [statut.get(id(n), 'accord') for n in p.notes]
            netr = sum(1 for s in st if s != 'accord')
            extra = ''
            if p.role == 'melodie':
                voix = {}
                for n in p.notes:
                    voix.setdefault(n.voix, []).append(n)
                iv = []
                for ns in voix.values():
                    ns = sorted(ns, key=lambda n: n.b)
                    hautes = {}
                    for n in ns:
                        hautes[round(n.b, 4)] = max(hautes.get(round(n.b, 4), 0), n.p)
                    seq = [hautes[k] for k in sorted(hautes)]
                    iv += [abs(b - a) for a, b in zip(seq, seq[1:])]
                if iv:
                    extra = ' | conjoint %d %%, sauts > sixte %d %%, plus grand saut %d demi-tons' % (
                        100 * sum(1 for x in iv if x <= 2) / len(iv), 100 * sum(1 for x in iv if x > 9) / len(iv), max(iv))
            lignes.append('  %-14s %4d notes  %s–%s  vél. %d–%d  étrangères %d %%%s' % (
                p.nom, len(p.notes), nom(min(ps)), nom(max(ps)), min(n.v for n in p.notes), max(n.v for n in p.notes),
                100 * netr / len(p.notes), extra))
        entete = '%s — %s, %s, %.1f s, %d notes (%.1f notes/s), %d mesures' % (
            self.nom, self.titre, self.ton, duree_s, total, total / max(duree_s, 1e-9),
            int(round((self.boucle if self.boucle else self.fin()) / self.mesure)))
        if bavard:
            print(entete)
            print('\n'.join(lignes))
            for e in err:
                print('  ERREUR  ' + e)
            for a in avert:
                print('  avert.  ' + a)
            if not err and not avert:
                print('  relecture : rien à signaler')
        return err, avert
