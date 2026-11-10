"""« Réveil » — la boîte à musique s'ouvre, puis l'orchestre : émerveillement.

La mineur, 3/4, noire = 108. Forme : ouverture (2 mes., le mécanisme prend sa vitesse) ; A (8 mes., boîte seule :
thème et réponse avec sixte napolitaine) ; A' (8 mes., cordes, harpe, célesta en tierces : la sixte napolitaine
devient le IVe degré de fa majeur) ; B (8 mes., le thème transformé en fa majeur aux violons, cor en contre-chant,
puis fa – ré m7 – sol – LA majeur) ; coda (6 mes., boîte seule en la majeur, cadence plagale mineure, le ressort
s'épuise). Motif de tête (quinte, tierce, puis 1-2-3) = signature de Noëlombre, citée dans les autres pièces.
"""
from partition import Partition

GRILLE = """
Am | E7 |
Am | Am | F | E7 | Am | Bb/D | E7 | Am |
Am | Am/G | F | E7 | Am | Bb/D | C7 | F |
F | F/A | Bb | C7 | F | Dm7 | G | A |
A | A | Dm/A | A | A | A
"""

SALLE = dict(rt=2.9, predelai=0.028, graine=21)
MASTER = dict(cible=-16.0, queue=3.6)


def composer():
    P = Partition('reveil', 3, [(0, 66), (3, 92), (6, 108), (54, 108), (57, 102), (69, 100), (72, 94), (75, 90), (78, 100), (84, 92),
                               (87, 80), (90, 64), (93, 50)],
                  GRILLE, titre='Réveil', ton='la mineur → la majeur', graine=3)
    m = P.m

    boite = P.partie('boite', 10, tess=(62, 94), role='melodie', tenue=1.5, hum_t=0.006, hum_v=3.0, niv=-21.5, rev=0.34, pan=-0.08, wow=2.0)
    bacc = P.partie('boite_acc', 10, tess=(60, 88), tenue=1.2, hum_t=0.006, hum_v=2.5, niv=-27.0, rev=0.34, pan=0.1, wow=2.0)
    cel = P.partie('celesta', 8, tess=(60, 96), tenue=0.9, hum_t=0.009, niv=-28.5, rev=0.42, pan=0.3)
    harpe = P.partie('harpe', 46, tess=(33, 88), tenue=1.6, hum_t=0.010, roule=0.028, niv=-25.0, rev=0.36, pan=-0.32)
    vl = P.partie('violons', 48, tess=(55, 93), role='melodie', legato=1.02, hum_t=0.012, niv=-21.5, rev=0.5, pan=-0.22, lp=7500)
    pad = P.partie('cordes', 48, tess=(48, 79), legato=1.0, hum_t=0.015, niv=-26.5, rev=0.5, pan=0.18, lp=6000)
    bas = P.partie('basses', 48, tess=(36, 60), legato=1.0, hum_t=0.015, niv=-27.0, rev=0.4, pan=0.12, lp=3000)
    cor = P.partie('cor', 60, tess=(48, 77), legato=0.98, hum_t=0.012, niv=-25.5, rev=0.75, pan=0.26, lp=4500)
    choeur = P.partie('choeur', 52, tess=(57, 81), legato=1.0, hum_t=0.015, niv=-28.0, rev=0.7, pan=0.0, lp=5000)
    glock = P.partie('glock', 9, tess=(72, 96), tenue=1.5, niv=-31.0, rev=0.5, pan=0.38)
    timb = P.partie('timbale', 47, tess=(36, 55), verif=False, hum_t=0.004, hum_v=4, niv=-29.0, rev=0.55, pan=-0.1, lp=2500)
    P.ordre = [boite, bacc]

    # ---- ouverture : le mécanisme démarre
    boite.joue("a4:q e5 a5 | b5 c6 d6", m(1), v=(50, 64))

    # ---- A : boîte à musique seule (thème, puis réponse avec sixte napolitaine)
    boite.joue("e6:h c6:q | a5:q b5 c6 | d6:h c6:q | b5:h. | e6:h c6:q | bb5:q d6 f6 | e6:q. d6:e c6:e b5:e | a5:h.",
               m(3), v=[(0, 70), (9, 74), (11, 66), (15, 72), (17, 80), (21, 70), (24, 64)])
    bacc.joue("a4:q c5 e5 | a4 e5 c5 | f4 a4 c5 | e4 g#4 d5 | a4 c5 e5 | d4 f4 bb4 | e4 g#4 d5 | a4 e5 c5",
              m(3), v=[(0, 52), (12, 50), (17, 58), (24, 50)])

    # ---- A' : les cordes entrent, la boîte orne son thème, le célesta le suit en tierces et sixtes
    boite.joue("e6:q. d6:e c6:q | a5:q b5 c6 | d6:h c6:q | b5:h g#5:q | e6:q. d6:e c6:q | bb5:q d6 f6 | e6:q. d6:e c6:e bb5:e | a5:h.",
               m(11), v=[(0, 72), (9, 76), (11, 68), (15, 74), (17, 82), (21, 76), (24, 70)])
    cel.joue("c6:q. b5:e a5:q | c5:q d5 e5 | f5:h a5:q | g#5:h e5:q | c6:q. b5:e a5:q | d5:q f5 bb5 | c6:q. bb5:e g5:q | f5:h.",
             m(11), v=[(0, 56), (12, 54), (17, 62), (24, 56)])
    harpe.joue("a2:q e3 c4 | g2 e3 c4 | f2 c3 a3 | e2 b2 g#3 | a2 e3 c4 | d3 f3 bb3 | c3 g3 bb3 | f2 c3 a3",
               m(11), v=[(0, 52), (12, 56), (21, 64), (24, 60)])
    pad.joue("c5:h. _:h. _:h. | b4:h. | c5:h. | d5:h. | c5:h. _:h.", m(11), v=58)
    pad.joue("a4:h. _:h. _:h. | g#4:h. | a4:h. | bb4:h. _:h. | a4:h.", m(11), v=56)
    pad.joue("e4:h. _:h. | f4:h. | e4:h. _:h. | f4:h. | e4:h. | f4:h.", m(11), v=54)
    bas.joue("a3:h. | g3:h. | f3:h. | e3:h. | a3:h. | d3:h. | c3:h. | f3:h.", m(11), v=54)
    pad.expr([(m(11), 30), (m(13), 58), (m(14), 50), (m(15), 62), (m(17), 86), (m(18), 78), (m(19), 84)])
    bas.expr([(m(11), 34), (m(13), 60), (m(14), 52), (m(15), 64), (m(17), 88), (m(18), 80), (m(19), 92)])

    # ---- B : le thème en fa majeur aux violons (émerveillement), cor en mouvement contraire
    vl.joue("c6:h a5:q | f5:q g5 a5 | bb5:h a5:q | g5:h. | [c5 c6]:h [a4 a5]:q | [f4 f5]:q [a4 a5] [c5 c6] | [d5 d6]:h [b4 b5]:q | [e5 e6]:h. _:h.",
            m(19), v=[(0, 62), (9, 70), (12, 74), (18, 84), (21, 92), (24, 80)])
    vl.expr([(m(19) - 0.4, 70), (m(19), 84), (m(20), 78), (m(21), 96), (m(22), 84), (m(23), 100), (m(25), 112), (m(26), 127), (m(27), 104),
             (m(27, 2), 52), (m(28), 0)])
    cor.joue("a4:h. | c5:h. | d5:h. | e5:h. | c5:h. | d5:h c5:q | b4:h. | a4:q e5:h _:h.",
             m(19), v=[(0, 58), (9, 66), (12, 70), (21, 82), (24, 72)])
    cor.expr([(m(19), 70), (m(21), 90), (m(22), 80), (m(23), 92), (m(25), 108), (m(26), 124), (m(27), 96), (m(27, 2), 40), (m(28), 0)])
    pad.joue("f4:h. | a4:h. | bb4:h. _:h. | a4:h. _:h. | b4:h. | c#5:h. _:h. _:h. | d5:h. | c#5:h. _:h. _:h.", m(19), v=62)
    pad.joue("c4:h. | f4:h. _:h. | g4:h. | f4:h. _:h. | g4:h. | a4:h. _:h. _:h. _:h. _:h. _:h. _:h.", m(19), v=60)
    pad.joue("a3:h. | c4:h. | d4:h. | e4:h. | c4:h. _:h. | d4:h. | e4:h. _:h. _:h. | f4:h. | e4:h. _:h. _:h.", m(19), v=58)
    bas.joue("f2:h. | a2:h. | bb2:h. | c3:h. | f2:h. | d3:h. | g2:h. | [a2 e3]:h. _:h. | a2:h. | a2:h. | a2:h. _:h. _:h.", m(19), v=60)
    pad.expr([(m(19), 84), (m(21), 96), (m(22), 86), (m(23), 100), (m(25), 110), (m(26), 124), (m(27), 78), (m(28), 56), (m(29), 60),
              (m(30), 50), (m(31), 40), (m(32), 34), (m(32) + 2.9, 0)])
    bas.expr([(m(19), 92), (m(22), 90), (m(23), 102), (m(25), 112), (m(26), 124), (m(27), 80), (m(28), 58), (m(30), 50), (m(32), 36),
              (m(32) + 2.9, 0)])
    choeur.joue("[c5 f5]:h. _:h. | [d5 g5]:h. | [c#5 e5 a5]:h. _:h.", m(23), v=[(0, 56), (9, 70)])
    choeur.expr([(m(23), 40), (m(25), 86), (m(26), 118), (m(27), 80), (m(27, 2), 30), (m(28), 0)])
    harpe.joue("f2:e c3 f3 a3 c4 f4 | a2 f3 c4 f4 a4 c5 | bb2 f3 bb3 d4 f4 bb4 | c3 g3 bb3 e4 g4 bb4 | f2 c3 a3 c4 f4 a4 | d3 a3 c4 f4 a4 c5 | "
               "g2 d3 g3 b3:q",
               m(19), v=[(0, 58), (9, 66), (12, 62), (18, 74), (20, 80)])
    # glissando de harpe vers le sommet (gamme de la majeur, de mi4 à do#6)
    gl = [64, 66, 68, 69, 71, 73, 74, 76, 78, 80, 81, 83, 85]
    for i, h in enumerate(gl):
        harpe.note(m(25, 2) + i / len(gl), 0.3, h, 50 + 2.6 * i, f='*')
    harpe.joue("[a2 e3 a3 c#4 e4 a4 c#5 e5]:h.~", m(26), v=84)
    boite.joue("r:q a6:e f6 c6:q | r:q f6:e c6 a6:q | r:q bb6:e f6 d6:q | r:q g6:e e6 bb5:q | f6:e a6 c6:q r | r:q a6:e f6 c6:q | "
               "r:q g6:e d6 b5:q | a6:e e6 c#6:q r", m(19), v=[(0, 50), (12, 54), (21, 64), (24, 58)])
    glock.joue("c6:h.", m(23), v=54)
    glock.joue("[e6 a6]:h.", m(26), v=70)
    for i in range(34):                                   # roulement de timbale sur sol, puis la
        timb.note(m(25) + i * 3.0 / 34, 0.2, 43, 30 + 30 * (i / 33.0) ** 1.5)
    timb.note(m(26), 2.0, 45, 82)

    # ---- coda : la boîte seule, en majeur ; cadence plagale mineure ; le ressort s'épuise
    boite.joue("e6:h c#6:q | a5:q b5 c#6 | d6:h f6:q | e6:h. | e5:q a5 c#6 | a6:h.~", m(27),
               v=[(0, 70), (6, 66), (8, 70), (9, 62), (12, 56), (14, 50), (15, 54)])
    bacc.joue("a4:q e5 c#5 | a4 c#5 e5 | a4 d5 f5 | a4 c#5 e5", m(27), v=[(0, 50), (9, 44)])
    glock.joue("a6:h.", m(32), v=46)
    harpe.joue("a3:h.~", m(32), v=52)
    return P
