"""« Neige » — très lent, harpe, cordes et chœur : apaisé, large.

Fa majeur (avec emprunts au mineur), 4/4, noire = 66. Forme : harpe seule puis cordes (2 mes.) ; A (4 mes. : mélodie
des violons en quintes empilées fa-do-sol, réponse si bémol-fa-do) ; A' (4 mes. : le chœur entre, la ligne monte,
ré bémol puis mi bémol majeurs empruntés) ; sommet (3 mes. : fa majeur large, sous-dominante mineure, cadence
plagale) ; coda (2 mes. : le célesta cite le motif de Noëlombre en majeur, dernier accord roulé).
"""
from partition import Partition

GRILLE = """
Fadd9 | Fadd9 |
Fadd9 | Dm7 | BbM7(9) | C7sus4 C7 |
F/A | Bbadd9 | Db | Eb |
F | Bbm6 | F |
Fadd9 | Fadd9
"""

SALLE = dict(rt=3.3, predelai=0.032, graine=41)
MASTER = dict(cible=-16.0, queue=4.6)


def composer():
    P = Partition('neige', 4, [(0, 64), (4, 66), (36, 66), (40, 62), (48, 60), (52, 56), (56, 50), (60, 44)],
                  GRILLE, titre='Neige', ton='fa majeur', graine=7)
    m = P.m
    vl = P.partie('violons', 48, tess=(55, 93), role='melodie', legato=1.03, hum_t=0.014, niv=-21.5, rev=0.55, pan=-0.2, lp=7500)
    harpe = P.partie('harpe', 46, tess=(36, 84), tenue=2.2, hum_t=0.012, hum_v=4, roule=0.034, niv=-22.5, rev=0.4, pan=0.22,
                     eq=[('haut', 2400, 3.5)])
    pad = P.partie('cordes', 48, tess=(48, 79), legato=1.0, hum_t=0.016, niv=-25.0, rev=0.55, pan=0.15, lp=5500)
    bas = P.partie('basses', 48, tess=(36, 60), legato=1.0, hum_t=0.016, niv=-26.0, rev=0.42, pan=0.05, lp=2800)
    choeur = P.partie('choeur', 53, tess=(58, 79), legato=1.0, hum_t=0.02, niv=-25.0, rev=0.75, pan=-0.05, lp=3200)
    choeur2 = P.partie('choeur_aah', 52, tess=(58, 79), legato=1.0, hum_t=0.02, niv=-29.0, rev=0.75, pan=0.1, lp=4000)
    cor = P.partie('cor', 60, tess=(48, 72), legato=1.0, hum_t=0.014, niv=-28.5, rev=0.75, pan=0.3, lp=3500)
    flocon = P.partie('flocons', 9, tess=(79, 96), tenue=1.2, hum_t=0.015, hum_v=5, niv=-32.0, rev=0.6, pan=0.4)
    cel = P.partie('celesta', 8, tess=(65, 96), role='melodie', tenue=1.4, hum_t=0.010, niv=-25.0, rev=0.45, pan=-0.3)
    P.ordre = [vl, bas]

    # ---- harpe : vagues d'arpèges (montée, descente), puis grands accords roulés au sommet
    harpe.joue("f2:e c3 f3 g3 a3 c4 g4 a4 | c5 a4 g4 c4 a3 g3 f3 c3 | "
               "f2 c3 g3 a3 c4 g4 a4 c5 | d2 a2 d3 f3 a3 c4 f4 a4 | bb2 f3 bb3 c4 d4 f4 a4 d5 | c3 g3 bb3 f4 e4 g4 bb4 e5 | "
               "a2 f3 a3 c4 f4 a4 c5 f5 | bb2 f3 bb3 c4 d4 f4 c5 d5 | db3 ab3 db4 f4 ab4 db5 f5 ab5 | eb3 bb3 eb4 g4 bb4 eb5 g5 bb5",
               m(1), v=[(0, 56), (4, 64), (8, 60), (16, 66), (24, 64), (32, 72), (40, 80)])
    harpe.joue("[f2 c3 f3 a3 c4 f4]:h~ [a3 c4 f4 a4 c5 f5]:h | [bb2 f3 bb3 db4 g4 bb4]:h~ [db4 g4 bb4 db5]:h | [f2 c3 f3 a3 c4 f4]:h~ a4:q c5:q | "
               "f2:e c3 g3 a3 c4 g4 a4 c5 | [f2 c3 f3 a3 c4 g4]:w~",
               m(11), v=[(0, 84), (4, 76), (8, 70), (12, 56), (16, 50)])

    # ---- violons : la mélodie (quintes empilées, puis la ligne s'élève)
    vl.joue("f4:q c5:q g5:h | a5:h. f5:q | bb4:q f5:q c6:h | bb5:h a5:q g5:q | a5:h c6:h | d6:h. c6:q | ab5:h f6:h | eb6:h. d6:q | "
            "c6:w | db6:h bb5:h | a5:w _:h",
            m(3), v=[(0, 58), (8, 64), (16, 66), (24, 76), (32, 86), (36, 80), (40, 70)])
    vl.expr([(m(3) - 0.5, 60), (m(3, 2), 82), (m(4), 88), (m(5), 76), (m(5, 2), 92), (m(6), 86), (m(7), 80), (m(8), 98), (m(9), 104),
             (m(9, 2), 118), (m(10), 112), (m(11), 124), (m(12), 108), (m(13), 92), (m(14), 56), (m(14, 2), 0)])

    # ---- cordes : nappe à quatre voix (notes communes tenues), basses
    pad.joue("a4:w _:w _:w _:w | bb4:w | c5:w _:w | ab4:w | bb4:w | c5:w | db5:w | c5:w | a4:w _:w", m(2), v=56)
    pad.joue("g4:w _:w | f4:w _:w | _:h e4:h | f4:w _:w _:w | g4:w | a4:w | g4:w | a4:w | g4:w _:w", m(2), v=54)
    pad.joue("c4:w _:w _:w | d4:w | c4:w _:w | d4:w | db4:w | eb4:w | f4:w _:w _:w | c4:w _:w", m(2), v=54)
    pad.joue("f3:w _:w _:w _:w | g3:w | f3:w _:w | ab3:w | g3:w | a3:w | bb3:w | a3:w | f3:w _:w", m(2), v=52)
    bas.joue("f2:w _:w | d3:w | bb2:w | c3:w | a2:w | bb2:w | db3:w | eb3:w | [f2 f3]:w | bb2:w | f2:w _:w _:w", m(2), v=56)
    courbe = [(m(2), 0), (m(2, 3), 44), (m(4), 60), (m(5), 54), (m(6), 66), (m(7), 62), (m(8), 78), (m(9), 84), (m(10), 100), (m(11), 120),
              (m(12), 100), (m(13), 86), (m(14), 56), (m(15), 44), (m(15, 3.5), 0)]
    pad.expr(courbe)
    bas.expr(courbe)

    # ---- chœur sans paroles : entre à la reprise, chante la mélodie au sommet (une octave sous les violons)
    for ch in (choeur, choeur2):
        ch.joue("c5:w | d5:w | db5:w | eb5:w | c5:w | db5:h bb4:h | a4:w _:h", m(7), v=62)
        ch.joue("a4:w | bb4:w | ab4:w | bb4:w | a4:w | g4:w | f4:w _:h", m(7), v=58)
        ch.joue("f4:w _:w _:w | g4:w | f4:w _:w | c4:w _:h", m(7), v=58)
        ch.expr([(m(7), 0), (m(7, 2), 50), (m(8), 66), (m(9), 78), (m(10), 98), (m(11), 124), (m(12), 104), (m(13), 84), (m(14), 40), (m(14, 2), 0)])
    cor.joue("f4:w | g4:w | a4:w | bb4:h g4:h | f4:w", m(9), v=58)
    cor.expr([(m(9), 30), (m(10), 76), (m(11), 110), (m(12), 90), (m(13), 70), (m(14), 0)])

    # ---- flocons : quelques notes de glockenspiel très douces, jamais au même endroit de la mesure
    for mes, t, h in [(3, 2.5, 'c6'), (4, 1.5, 'a6'), (5, 2.5, 'f6'), (6, 0.5, 'g6'), (7, 2.5, 'f6'), (8, 1.5, 'f6'), (9, 2.5, 'ab6'),
                      (10, 1.5, 'g6'), (11, 1.5, 'a6'), (11, 3.0, 'f6'), (12, 1.5, 'g6'), (13, 2.0, 'c6'), (14, 3.5, 'a6'), (15, 1.0, 'f6')]:
        flocon.joue(h + ':q', m(mes, t), v=50)

    # ---- coda : le célesta cite le motif de Noëlombre (5-3 | 1-2-3), en majeur
    cel.joue("c6:q. a5:e f5:q g5:q | a5:w", m(14), v=[(0, 62), (4, 56)])
    return P
