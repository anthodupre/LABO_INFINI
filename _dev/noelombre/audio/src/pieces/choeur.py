"""« Chœur » — boucle de 20 s : chœur fantôme (« ooh »), lent, à trois voix.

La mineur, 4/4, noire = 72, six mesures : la voix grave descend la-sol-fa-mi, retards 4-3 et 7-6 dans les voix
du dessus, puis ré mineur et dominante (retard 4-3) qui ramène au début. Très réverbéré, filtré : lointain.
"""
from partition import Partition

GRILLE = """
Am | Em/G | F Dm/F | Am/E | Dm | Esus4 E
"""

SALLE = dict(rt=4.6, predelai=0.045, graine=91, clarte=0.85)
MASTER = dict(cible=-20.0, queue=5.0, bandes=[('haut', 3500, -2.0), ('lp', 6500, 2)], seuil=-24.0, ratio=1.4)


def composer():
    P = Partition('choeur', 4, 72, GRILLE, titre='Chœur des ombres', ton='la mineur', graine=23, boucle=24)
    m = P.m
    ooh = P.partie('ooh', 53, tess=(60, 79), role='melodie', legato=1.0, hum_t=0.03, hum_v=3, niv=-21.0, rev=1.0, temps_fort=0, lp=2600)
    aah = P.partie('aah', 52, tess=(60, 79), legato=1.0, hum_t=0.03, hum_v=3, niv=-27.0, rev=1.0, temps_fort=0, lp=3200)
    for ch in (ooh, aah):
        ch.joue("e5:w | e5:w* _:h d5:h | c5:w | d5:h f5:h | e5:w", 0, v=62)                    # soprano (mi tenu, retard 7-6, montée)
        ch.joue("c5:w* _:h b4:h | a4:w _:w _:w _:h g#4:h", 0, v=58)                           # alto (retards 4-3)
        ch.joue("a4:w | g4:w | f4:w | e4:w | d4:w | e4:w", 0, v=58)                          # voix grave : la-sol-fa-mi, ré, mi
        ch.expr([(0, 96), (m(2), 108), (m(3), 96), (m(4), 86), (m(5), 104), (m(6), 116), (m(6, 2), 104), (24, 96)])
    P.ordre = [ooh]
    return P
