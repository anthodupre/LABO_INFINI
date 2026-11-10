"""« Valse » — valse mineure espiègle : pizzicati, célesta, basson.

Sol mineur, 3/4, noire = 160. Forme : introduction (4 mes.) ; A1 (8, thème au célesta : broderie chromatique puis
arpège qui dégringole, demi-cadence phrygienne) ; A2 (8, saut au sol aigu, sixte napolitaine, cadence) ; B1 (8, le
basson chante en si bémol majeur) ; B2 (8, basse chromatique descendante sol-fa#-fa-mi-mib, arabesques du célesta
en marche 5-6) ; A3 (8, reprise : célesta + pizzicati à l'octave + glockenspiel) ; coda (8 : citation du motif de
Noëlombre, napolitaine, pirouette finale).
"""
from partition import Partition, placer, voicing

GRILLE = """
Gm | Gm | Gm | D7 |
Gm | Gm | D7 | D7 | Gm | Cm | Cm6/Eb | D |
Gm | Gm | D7 | D7 | Gm/Bb | Ab/C | D7 | Gm |
Bb | Bb | F7/C | F7 | Bb | Bb/D | Eb | F7 |
Gm | D/F# | F | C/E | Eb | Cm6/Eb | D7 | D7 |
Gm | Gm | D7 | D7 | Gm/Bb | Ab/C | D7 | Gm |
Gm | Gm | Eb | D | Ab/C | D7 | Gm | Gm
"""

SALLE = dict(rt=2.3, predelai=0.020, graine=31)
MASTER = dict(cible=-16.0, queue=3.2)

THEME_A2 = ("d6:q. c#6:e d6:q | bb5:q' g5:q' r:q | a5:q. g#5:e a5:q | f#5:q' a5:q' c6:q' | "
            "d6:q' g6:h | eb6:q' c6:q' ab5:q' | f#5:h a5:q | g5:q' r:h")


def balance(t):
    """Valse : le deuxième temps un rien en avance, le troisième un rien en retard."""
    if 0.9 < t < 1.1:
        return -0.028
    if 1.9 < t < 2.1:
        return 0.012
    return 0.0


def composer():
    P = Partition('valse', 3, [(0, 160), (102, 160), (107.5, 148), (108, 162), (144, 160), (147, 144), (150, 112), (153, 128), (156, 120)],
                  GRILLE, titre='Valse des lanternes', ton='sol mineur', graine=5, balance=balance)
    m = P.m
    cel = P.partie('celesta', 8, tess=(67, 96), role='melodie', tenue=0.7, hum_t=0.007, niv=-21.0, rev=0.36, pan=0.14)
    pzm = P.partie('pizz_melodie', 45, tess=(55, 84), tenue=0.3, hum_t=0.009, niv=-25.0, rev=0.3, pan=-0.3, eq=[('haut', 2200, 4.0)])
    pz = P.partie('pizz', 45, tess=(50, 79), tenue=0.3, hum_t=0.010, hum_v=4.5, niv=-24.5, rev=0.3, pan=-0.2, temps_fort=0, eq=[('haut', 2200, 4.0)])
    pzb = P.partie('pizz_basse', 45, tess=(36, 55), tenue=0.5, hum_t=0.008, niv=-22.5, rev=0.24, pan=0.1, lp=3500)
    bn = P.partie('basson', 70, tess=(34, 72), role='melodie', legato=0.96, hum_t=0.010, niv=-22.5, rev=0.3, pan=0.3)
    glock = P.partie('glock', 9, tess=(72, 96), tenue=1.0, niv=-30.0, rev=0.45, pan=0.36)
    P.ordre = [cel, pzb]

    # ---- accompagnement « poum-tcha-tcha » dérivé de la grille, varié selon les sections
    def accomp(m0, m1, forme, vb, vc, haut=False):
        prec, dern = None, None
        for k in range(m0, m1 + 1):
            acc = P.accord_a(m(k))
            b = placer(acc.basse, 43, 37, 51)
            if dern == acc.nom and acc.basse == acc.racine and acc.quinte() is not None:
                b = placer(acc.quinte(), 45, 38, 52)          # même accord deux mesures de suite : la basse alterne avec la quinte
                dern = None
            else:
                dern = acc.nom
            pzb.note(m(k), 1, b, vb)
            prec = voicing(acc, 57, 72, 3, prec)
            f = forme[(k - m0) % len(forme)]
            for t in (1, 2):
                if f[t - 1] == 'x':
                    for h in prec:
                        pz.note(m(k, t), 1, h, vc - (3 if t == 2 else 0))
                    if haut and t == 1:
                        pz.note(m(k, t), 1, prec[0] + 12, vc - 8)

    accomp(1, 4, ['xx'], 66, 54)
    accomp(5, 12, ['xx', 'xx', 'xx', 'x-'], 68, 56)
    accomp(13, 20, ['xx', 'x-', 'xx', 'xx'], 72, 60)
    accomp(21, 28, ['xx', 'x-'], 66, 54)
    accomp(29, 34, ['x-'], 62, 50)
    accomp(35, 36, ['xx'], 70, 60)
    accomp(37, 43, ['xx'], 78, 66, haut=True)
    accomp(45, 48, ['xx', 'x-'], 64, 52)
    accomp(49, 50, ['xx'], 70, 60)
    pzb.note(m(44), 1, 43, 80)
    pz.joue("r:q [g4 bb4 d5]:q' r:q", m(44), v=70)
    pzb.note(m(51), 1, 43, 78)
    pz.joue("r:q [bb4 d5 g5]:q' r:q", m(51), v=64)
    pzb.note(m(52, 1), 1, 31 + 12, 70)
    pz.joue("r:q [g3 d4 bb4]:q", m(52), v=66)

    # ---- introduction : le basson pose le décor
    bn.joue("g2:q' r:h | g2:q' r:q d3:q' | g2:q' r:h | d3:q' e3:q' f#3:q'", m(1), v=[(0, 66), (9, 68), (12, 76)])

    # ---- A1 : thème (antécédent), demi-cadence phrygienne
    cel.joue("d6:q. c#6:e d6:q | bb5:q' g5:q' r:q | a5:q. g#5:e a5:q | f#5:q' d5:q' r:q | "
             "g5:e a5:e bb5:q' d6:q' | eb6:h d6:q | c6:e bb5:e a5:q' c6:q' | d6:h r:q",
             m(5), v=[(0, 72), (6, 68), (12, 72), (15, 80), (18, 76), (21, 74)])
    bn.joue("g2:q' r:h | r:h. | d3:q' r:h | r:h d3:q' | g2:q' r:h | c3:q' r:h | eb3:q' r:h | d3:h r:q", m(5), v=[(0, 62), (15, 68), (21, 66)])

    # ---- A2 : thème (conséquent), saut au sol aigu, sixte napolitaine, cadence parfaite
    cel.joue(THEME_A2, m(13), v=[(0, 74), (9, 76), (12, 84), (13, 90), (15, 82), (18, 78), (21, 74)])
    bn.joue("g2:q' r:h | r:h bb2:q' | d3:q' r:h | r:h d3:q' | bb2:h. | c3:q' r:h | d3:h d2:q' | g2:q' r:h", m(13), v=[(0, 64), (12, 72), (21, 70)])

    # ---- B1 : le basson chante en si bémol majeur ; le célesta répond dans les tenues
    bn.joue("f3:h bb3:q | d4:q. c4:e bb3:q | c4:h a3:q | f3:h. | f3:h bb3:q | d4:q. eb4:e f4:q | g4:h eb4:q | f4:h.",
            m(21), v=[(0, 74), (4, 80), (9, 72), (12, 76), (18, 86), (21, 78)], legato=1.0)
    bn.expr([(m(21), 100), (m(22), 112), (m(24), 96), (m(25), 104), (m(27), 124), (m(28), 110), (m(29), 100)])
    cel.joue("r:q a5:e c6:e eb6:e c6:e", m(24), v=(58, 64))
    cel.joue("r:q c6:e eb6:e f6:q'", m(28), v=(62, 70))

    # ---- B2 : basse chromatique descendante, arabesques du célesta (marche 5-6)
    cel.joue("d5:e bb5:e d6:q' r:q | d5:e a5:e d6:e e6:e d6:q' | c5:e a5:e c6:q' r:q | c5:e g5:e c6:e d6:e c6:q' | "
             "bb4:e g5:e bb5:q' r:q | c5:e g5:e a5:q c6:q | d6:e eb6:e d6:h",
             m(29), v=[(0, 62), (6, 66), (12, 70), (15, 74), (18, 84)])
    bn.joue("g3:h. | f#3:h. | f3:h. | e3:h. | eb3:h. | eb3:h c3:q | d3:q' f#3:q' a3:q' | c4:q' d4:q' f#4:q'",
            m(29), v=[(0, 64), (15, 70), (18, 76), (23, 88)], legato=1.0)
    bn.expr([(m(29), 96), (m(33), 104), (m(35), 118), (m(37), 127)])

    # ---- A3 : reprise forte ; pizzicati à l'octave grave, éclats de glockenspiel, basson en contretemps
    cel.joue(THEME_A2, m(37), v=[(0, 84), (9, 84), (12, 92), (13, 98), (15, 90), (18, 86), (21, 82)])
    pzm.joue(THEME_A2, m(37), v=[(0, 74), (12, 82), (21, 74)], tr=-12)
    glock.joue("d6:h. | r:h. | a5:h. | r:h. | r:q g6:h | eb6:h. | r:h. | g5:h.", m(37), v=[(0, 58), (12, 70), (21, 58)])
    bn.joue("g2:q' r:q d3:q' | g2:q' r:q bb2:q' | a2:q' r:q d3:q' | d3:q' c3:q' a2:q' | bb2:q' r:h | c3:q' r:q eb3:q' | d3:h. | g2:q' r:h",
            m(37), v=[(0, 76), (12, 82), (18, 86), (21, 80)])

    # ---- coda : le motif de Noëlombre (quinte, tierce, puis 1-2-3), napolitaine et pirouette
    cel.joue("d6:h bb5:q | g5:q a5 bb5 | c6:h bb5:q | a5:h. | eb6:q' c6:q' ab5:q' | f#5:h a5:q | g5:q' r:h | r:q [g5 d6 g6]:h",
             m(45), v=[(0, 70), (9, 62), (12, 76), (15, 70), (18, 66), (21, 58), (22, 62)])
    bn.joue("g2:q' r:h | g2:q' r:q d3:q' | eb3:h. | d3:h. | c3:q' r:h | d3:h d2:q' | g2:q' r:h | r:q g2:q' r:q",
            m(45), v=[(0, 60), (12, 72), (15, 68), (18, 72), (22, 66)])
    glock.joue("g6:h", m(52, 1), v=56)
    # le célesta de la banque est très rond : une boîte à musique discrète le double pour lui donner son « ting »
    P.double(cel, 'celesta_eclat', 10, dv=-6, tess=(60, 96), tenue=0.5, hum_t=0.007, niv=-27.5, rev=0.36, pan=0.2, verif=False)
    return P
