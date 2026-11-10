"""« Manège » — boucle de 16 s : valse de carrousel (orgue de foire + boîte à musique), pour le décor.

Ré mineur, 3/4, noire = 180 (une mesure = 1 s), 16 mesures qui finissent sur la dominante : la reprise tombe
naturellement sur la tonique. Timing mécanique, deux rangs de tuyaux légèrement désaccordés, vitesse qui flotte.
"""
from partition import Partition, voicing

GRILLE = """
Dm | Dm | A7 | A7 | Dm | Gm | A7 | A7 |
Dm | Dm | Gm | Gm | Bb | Gm6 | A7 | A7
"""

SALLE = dict(rt=1.9, predelai=0.015, graine=71)
MASTER = dict(cible=-20.0, queue=3.0, bandes=[('haut', 6000, -2.0)])

THEME = ("f5:h a5:q | d6:h a5:q | c#6:h e6:q | a5:h. | f5:h a5:q | d6:h bb5:q | a5:q g5:q e5:q | a5:h c#6:q | "
         "d6:q. e6:e f6:q | a6:h f6:q | g6:h d6:q | bb5:q d6:q g6:q | f6:h d6:q | e6:q d6:q bb5:q | e6:q c#6:q a5:q | g5:h e5:q")


def composer():
    P = Partition('manege', 3, 180, GRILLE, titre='Manège', ton='ré mineur', graine=17, boucle=48)
    m = P.m
    org = P.partie('orgue', 20, tess=(57, 96), role='melodie', legato=0.93, hum_t=0.002, hum_v=1, niv=-21.0, rev=0.3, double=8.0, wow=6.0,
                   temps_fort=0, lp=6500)
    boite = P.partie('boite', 10, tess=(60, 96), tenue=0.6, hum_t=0.004, hum_v=2, niv=-25.0, rev=0.32, wow=4.0)
    acc_ = P.partie('accords', 20, tess=(52, 79), legato=0.6, hum_t=0.003, hum_v=1.5, niv=-27.0, rev=0.26, temps_fort=0, lp=4500)
    bas = P.partie('basse', 58, tess=(33, 57), legato=0.7, hum_t=0.003, hum_v=2, niv=-23.5, rev=0.2, lp=2200)
    perc = P.partie('percussions', 0, canal=9, verif=False, hum_t=0.003, hum_v=3, niv=-32.0, rev=0.3, temps_fort=0, lp=8000)
    P.ordre = [org, bas]
    org.joue(THEME, 0, v=80)
    boite.joue(THEME, 0, v=72)
    # petites guirlandes de la boîte à musique dans les notes longues
    boite.joue("r:q e6:e c#6:e a5:q", m(4), v=60)
    basses = "d2 a2 a2 e2 d2 g2 a2 a2 d2 f2 g2 d2 bb2 g2 a2 a2".split()
    from partition import hauteur
    prec = None
    for k in range(1, 17):
        ac = P.accord_a(m(k))
        bas.note(m(k), 1, hauteur(basses[k - 1]), 76)
        prec = voicing(ac, 57, 72, 3, prec)
        for t in (1, 2):
            for h in prec:
                acc_.note(m(k, t), 1, h, 62)
        perc.note(m(k), 0.25, 36, 44)
        perc.note(m(k, 1), 0.25, 81 if k % 2 else 54, 34)
        perc.note(m(k, 2), 0.25, 54, 36)
    return P
