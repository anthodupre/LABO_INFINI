"""« Orgue » — boucle de 20 s : orgue d'église grave et lent, pour une chapelle ou un mausolée.

Ré mineur, seize accords d'une blanche (blanche = 48) : choral à quatre voix. Retards 4-3, dominante secondaire
(ré7 sur fa dièse), sixte napolitaine (mi bémol sur sol), et demi-cadence finale qui ramène au premier accord.
"""
from partition import Partition

GRILLE = """
Dm Dm/C | Bb Gm | A7sus4 A7 | Dm D7/F# | Gm Eb/G | A A7/G | Dm/F Gm6 | Asus4 A
"""

SALLE = dict(rt=4.2, predelai=0.04, graine=81, clarte=0.8)
MASTER = dict(cible=-20.0, queue=5.0, bandes=[('haut', 4000, -3.0), ('lp', 7000, 2)], seuil=-24.0, ratio=1.4)


def composer():
    P = Partition('orgue', 4, 96, GRILLE, titre='Orgue de la chapelle', ton='ré mineur', graine=19, boucle=32)
    org = P.partie('orgue', 19, tess=(41, 79), role='melodie', legato=1.01, hum_t=0.006, hum_v=1, niv=-21.0, rev=0.85, temps_fort=0, lp=5000)
    ped = P.partie('pedalier', 19, banque=8, tess=(36, 55), legato=1.01, hum_t=0.006, hum_v=1, niv=-23.0, rev=0.6, temps_fort=0, lp=1500)
    P.ordre = [org, ped]
    S = "d5:w _:w | d5:h c#5:h | d5:h c5:h | bb4:w | a4:w | a4:h bb4:h | d5:h c#5:h"
    A = "a4:w | bb4:w | a4:w _:w | g4:w | e4:w | f4:h g4:h | a4:w"
    T = "f4:w _:h g4:h _:w | f4:q e4:q d4:h _:h eb4:h | c#4:w | d4:h e4:h _:w"
    B = "d3:h c3:h | bb2:h g2:h | a2:w | d3:h f#2:h | g2:w | a2:h g2:h | f2:h g2:h | a2:w"
    org.joue(S, 0, v=74)
    org.joue(A, 0, v=70)
    org.joue(T, 0, v=70)
    org.joue(B, 0, v=72)
    ped.joue(B, 0, v=76)
    return P
