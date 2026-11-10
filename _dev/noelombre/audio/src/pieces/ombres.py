"""« Ombres » — mystère : célesta grave, cordes en trémolo doux, cor lointain. Inquiétant mais beau.

Do mineur, 4/4, noire = 76. Le célesta égrène une figure boiteuse (3 + 3 + 2 croches) sur une basse qui descend par
demi-tons (do, si, si bémol, la, la bémol) pendant que les cordes tiennent l'accord de do mineur ; le cor appelle de
loin. Deuxième phrase : do mineur ↔ la bémol mineur (la couleur « sortilège »), septième diminuée, sixte
napolitaine, dominante avec neuvième mineure ; le cor cite le motif de Noëlombre (sol-mi bémol, do-ré-mi bémol).
"""
from partition import Partition

GRILLE = """
Cm(9) | Cm(9) |
Cm(9) | CmM7(9)/B | Cm7(9)/Bb | Am7b5 | AbM7 | Db/F | G7sus4 | G7 |
Cm(9) | Abm/Cb | Cm(9) | F#dim7 | Db/F | G7b9 | Cm(9) | Cm(9)
"""

SALLE = dict(rt=3.4, predelai=0.036, graine=51)
MASTER = dict(cible=-16.0, queue=4.6)


def composer():
    P = Partition('ombres', 4, [(0, 74), (8, 76), (40, 76), (60, 74), (64, 68), (68, 60), (72, 50)],
                  GRILLE, titre='Ombres', ton='do mineur', graine=11)
    m = P.m
    cel = P.partie('celesta', 8, tess=(41, 84), tenue=1.3, hum_t=0.009, hum_v=4, niv=-21.5, rev=0.42, pan=-0.14, temps_fort=4)
    cor = P.partie('cor', 60, tess=(50, 70), role='melodie', legato=1.0, hum_t=0.014, niv=-22.5, rev=0.95, pan=0.2, lp=2800)
    trem = P.partie('tremolo', 44, tess=(50, 72), legato=1.0, hum_t=0.02, niv=-25.5, rev=0.55, pan=0.12, lp=5200)
    halo = P.partie('halo', 44, tess=(72, 84), legato=1.0, hum_t=0.02, niv=-30.5, rev=0.8, pan=-0.3, lp=6000)
    bas = P.partie('contrebasse', 43, tess=(36, 55), legato=1.0, hum_t=0.02, niv=-25.5, rev=0.35, pan=0.05, lp=650)
    harpe = P.partie('harpe', 46, tess=(36, 79), tenue=2.0, hum_t=0.012, niv=-27.0, rev=0.5, pan=0.34)
    cloche = P.partie('cloche', 14, tess=(48, 67), tenue=5.0, niv=-28.0, rev=0.85, pan=-0.36, lp=4500)
    P.ordre = [cor, bas]

    # ---- célesta grave : figure 3 + 3 + 2, la basse descend par demi-tons
    cel.joue("c3:e g3 eb4 d4 g3 eb4 g4:q | c3:e g3 eb4 d4 g3 eb4 c4:q | c3:e g3 eb4 d4 g3 eb4 g4:q | b2:e g3 eb4 d4 g3 eb4 g4:q | "
             "bb2:e g3 eb4 d4 g3 eb4 bb3:q | a2:e g3 eb4 c4 g3 eb4 a3:q | ab2:e g3 eb4 c4 g3 eb4 c4:q | f2:e ab3 db4 f4 ab3 db4 f3:q | "
             "g2:e d3 c4 d4 g3 c4 g3:q | g2:e d3 b3 f4 d4 b3 r:q",
             m(1), v=[(0, 54), (8, 62), (16, 60), (24, 66), (28, 70), (32, 64), (38, 58)])
    cel.joue("c4:e g4 eb5 d5 g4 eb5 g5:q | b3:e ab4 eb5 b4 ab4 eb5 ab5:q | c4:e g4 eb5 d5 g4 eb5 c5:q | f#3:e c4 eb4 a4 c4 eb4 f#4:q | "
             "f3:e ab3 db4 f4 ab3 db4 ab4:q | g2:e d3 b3 d4 f4:h | c3:e g3 eb4 d4 g3 eb4 g4:q | c3:e g3 eb4 g4:q.~ r:q",
             m(11), v=[(0, 66), (4, 70), (8, 66), (12, 68), (16, 74), (20, 70), (24, 56), (28, 48)])

    # ---- cordes en trémolo : l'accord de do mineur tenu, qui respire, puis les couleurs de la deuxième phrase
    trem.joue("eb4:w _:w | g4:w _:w | eb4:w _:w | f4:w | d4:w _:w | eb4:w _:w _:w _:w | f4:w _:w | eb4:w _:w", m(2), v=52)
    trem.joue("c4:w _:w _:w _:w _:w _:w | db4:w | c4:w | b3:w | c4:w | b3:w | c4:w _:w | db4:w | d4:w | c4:w _:w", m(2), v=50)
    trem.joue("g3:w _:w _:w _:w _:w _:w | ab3:w | g3:w _:w _:w | ab3:w | g3:w | a3:w | ab3:w | [ab3 b3]:w | g3:w _:w", m(2), v=50)
    trem.expr([(m(2), 0), (m(3), 50), (m(4), 62), (m(5), 48), (m(6), 66), (m(7), 54), (m(8), 80), (m(9), 70), (m(10), 86), (m(11), 74),
               (m(12), 96), (m(13), 80), (m(14), 100), (m(15), 106), (m(16), 118), (m(17), 70), (m(18), 44), (m(18, 3.6), 0)])
    halo.joue("g5:w | ab5:w | g5:w | f#5:w | f5:w _:w | eb5:w _:w", m(11), v=50)
    halo.expr([(m(11), 0), (m(12), 70), (m(13), 60), (m(14), 84), (m(16), 100), (m(17), 64), (m(18), 36), (m(18, 3.6), 0)])
    bas.joue("c3:w | b2:w | bb2:w | a2:w | ab2:w | f2:w | g2:w _:w | c3:w | b2:w | c3:w | f#2:w | f2:w | g2:w | [c2 c3]:w _:w", m(3), v=58)
    bas.expr([(m(3), 40), (m(4), 76), (m(7), 70), (m(8), 90), (m(10), 96), (m(11), 84), (m(14), 100), (m(16), 116), (m(17), 84), (m(18), 50),
              (m(18, 3.6), 0)])

    # ---- cor lointain
    cor.joue("g3:q c4:h. | r:q g3:q d4:h | eb4:h. d4:q | c4:w | r:q c4:q eb4:q g4:q | f4:h. eb4:q | d4:h. c4:q | b3:w",
             m(3), v=[(0, 60), (8, 66), (16, 64), (19, 76), (24, 70), (28, 62)])
    cor.joue("c4:q g4:h. | ab4:h eb4:h | g4:h eb4:h | c4:q d4:q eb4:h | ab3:h db4:q f4:q | ab4:h g4:h | c4:w _:h",
             m(11), v=[(0, 70), (4, 78), (8, 72), (12, 68), (16, 72), (20, 86), (24, 66)])
    cor.expr([(m(3), 84), (m(4), 100), (m(6), 84), (m(7), 96), (m(8), 112), (m(10), 86), (m(11), 104), (m(12), 118), (m(14), 100),
              (m(16), 127), (m(17), 100), (m(18), 50), (m(18, 2), 0)])

    # ---- ponctuations : harpe (gouttes), cloche lointaine
    harpe.joue("r:h g3:e b3 d4 f4", m(10), v=(48, 62))
    harpe.joue("r:h ab4:e f4 d4 b3", m(16), v=(64, 50))
    harpe.joue("r:h. g4:q~", m(6), v=50)
    harpe.joue("r:h eb5:h~", m(13), v=52)
    harpe.joue("[c2 g2]:w~", m(17), v=60)
    cloche.joue("c4:w", m(3), v=58)
    cloche.joue("c4:w", m(11), v=64)
    cloche.joue("c4:w", m(17), v=54)
    # un rien de « ting » sur le célesta (la banque le donne très rond) : boîte à musique très discrète à l'unisson
    P.double(cel, 'celesta_eclat', 10, dv=-8, filtre=lambda n: n.p >= 55, tess=(55, 96), tenue=0.9, hum_t=0.009, niv=-31.0, rev=0.42,
             pan=-0.1, verif=False)
    return P
