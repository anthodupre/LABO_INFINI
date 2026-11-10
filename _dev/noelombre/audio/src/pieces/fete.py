"""« Fête » — plus animé : orgue de barbarie, accordéon, glockenspiel. Une joie étrange.

Ré majeur / si mineur, 2/4, noire = 120. Forme : introduction (4 mes., la manivelle prend son élan) ; A (16 mes. :
polka de l'orgue de barbarie, avec un détour imprévu par si bémol et sol mineur) ; B (16 mes. : l'accordéon chante en
si mineur puis en sol, pizzicati, triangle) ; A' (16 mes. : tutti, fifre, glockenspiel, grelots) ; coda (8 mes. :
le motif de Noëlombre en majeur, son écho en si bémol, cadence). Le fifre double l'orgue à l'unisson.
"""
from partition import Partition, placer, voicing

GRILLE = """
D | D | A7 | A7 |
D | D | A7 | A7 | D | D | E7 | A |
D | D | A7 | A7 | Bb | Gm | A7 | D |
Bm | Bm | F#7 | F#7 | Bm | Em | F#7 | Bm |
G | G | D/F# | D/F# | Em | E7/G# | A7sus4 | A7 |
D | D | A7 | A7 | D | D | E7 | A |
D | D | A7 | A7 | Bb | Gm | A7 | D |
D | D | Bb | Bb | Gm | A7 | D | D
"""

SALLE = dict(rt=2.1, predelai=0.018, graine=61)
MASTER = dict(cible=-16.0, queue=3.0, bandes=[('haut', 5500, -2.5)])

A1 = ("f#5:e a5:e d6:e a5:e | b5:e. a5:s g#5:e a5:e | g5:e e5:e c#5:e e5:e | a5:e g5:e e5:q | "
      "f#5:e a5:e d6:e a5:e | b5:e. a5:s g#5:e a5:e | b5:e g#5:e e5:e d6:e | c#6:q a5:q")
A2 = ("f#5:e a5:e d6:e a5:e | b5:e. a5:s g#5:e a5:e | g5:e e5:e c#5:e e5:e | a5:e g5:e e5:q | "
      "f5:e bb5:e d6:e bb5:e | d6:e. c6:s bb5:e g5:e | a5:e c#6:e e6:e g6:e | f#6:q d6:q")


def composer():
    P = Partition('fete', 2, [(0, 104), (3, 120), (112, 120), (114, 110), (116, 104), (116.01, 120), (120, 118)],
                  GRILLE, titre='Fête foraine', ton='ré majeur / si mineur', graine=13)
    m = P.m
    org = P.partie('orgue', 20, tess=(57, 96), role='melodie', legato=0.9, hum_t=0.003, hum_v=1.5, niv=-21.0, rev=0.26, pan=-0.12,
                   double=7.0, wow=5.0, temps_fort=0, lp=6500)
    fifre = P.partie('fifre', 72, tess=(69, 96), legato=0.86, hum_t=0.004, hum_v=2, niv=-28.0, rev=0.3, pan=0.2, wow=5.0, lp=7000)
    acm = P.partie('accordeon_chant', 21, tess=(60, 96), role='melodie', legato=0.97, hum_t=0.008, niv=-21.0, rev=0.28, pan=0.16, double=5.0, lp=6500)
    acc_ = P.partie('accordeon', 21, tess=(52, 79), legato=0.8, hum_t=0.006, hum_v=3, niv=-26.0, rev=0.24, pan=0.28, temps_fort=0, lp=4800)
    tuba = P.partie('tuba', 58, tess=(33, 57), legato=0.8, hum_t=0.006, hum_v=3, niv=-22.5, rev=0.2, pan=-0.05, lp=2400)
    pz = P.partie('pizz', 45, tess=(52, 79), tenue=0.25, hum_t=0.009, niv=-26.0, rev=0.3, pan=-0.3, temps_fort=0, eq=[('haut', 2200, 4.0)])
    glock = P.partie('glock', 9, tess=(72, 96), tenue=0.8, hum_t=0.006, niv=-27.5, rev=0.4, pan=0.34)
    perc = P.partie('percussions', 0, canal=9, verif=False, hum_t=0.005, hum_v=4, niv=-32.0, rev=0.3, pan=0.0, temps_fort=0, lp=8500)
    P.ordre = [org, tuba]
    GC, TAMB, TRI, GRELOT, CYMB = 36, 54, 81, 83, 49

    def pompe(m0, m1, vb, vc, accords=acc_, contretemps=(0.5, 1.5), basse2=True):
        """Basse sur les temps (fondamentale, quinte), accords sur les contretemps."""
        prec = None
        for k in range(m0, m1 + 1):
            ac = P.accord_a(m(k))
            tuba.note(m(k), 0.5, placer(ac.basse, 42, 36, 50), vb, f="'")
            if basse2:
                q = ac.quinte() if ac.basse == ac.racine and ac.quinte() is not None else ac.basse
                tuba.note(m(k, 1), 0.5, placer(q, 44, 36, 52), vb - 6, f="'")
            prec = voicing(ac, 57, 72, 3, prec)
            for t in contretemps:
                for h in prec:
                    accords.note(m(k, t), 0.5, h, vc, f="'")

    # ---- introduction
    pompe(1, 4, 70, 58)
    org.joue("r:h | r:h | r:h | a5:e g5:e e5:e g5:e", m(1), v=70)
    # ---- A : la polka de l'orgue de barbarie
    pompe(5, 20, 74, 60)
    org.joue(A1, m(5), v=76)
    org.joue(A2, m(13), v=[(0, 76), (8, 84), (12, 80), (16, 82)])
    for k in range(5, 21):
        perc.note(m(k), 0.25, GC, 46)
        perc.note(m(k, 1.5), 0.25, TAMB, 38)
    glock.joue("d6:q r | r:h | r:h | r:q e6:q | d6:q r | r:h | r:h | c#6:q a6:q", m(5), v=58)
    glock.joue("d6:q r | r:h | r:h | r:q e6:q | bb6:q r | r:q g6:q | r:h | f#6:q d6:q", m(13), v=60)

    # ---- B : l'accordéon chante (si mineur, puis sol majeur), pizzicati en contretemps, triangle
    pompe(21, 36, 62, 52, accords=pz, contretemps=(0.5, 1.5), basse2=False)
    acm.joue("b5:q d6:e c#6:e | b5:e f#5:e b5:q | a#5:q c#6:e b5:e | a#5:e f#5:e a#5:q | "
             "b5:q d6:e c#6:e | b5:q g5:e b5:e | a#5:e c#6:e e6:e c#6:e | d6:q b5:q | "
             "d6:q b5:e g5:e | b5:e. a5:s g5:q | d6:q a5:e f#5:e | a5:e. g5:s f#5:q | "
             "e5:e g5:e b5:e e6:e | d6:e b5:e g#5:e b5:e | d6:q. e6:e | g6:e e6:e c#6:e a5:e",
             m(21), v=[(0, 70), (8, 74), (14, 80), (16, 72), (24, 76), (28, 84), (32, 86)])
    acm.expr([(m(21), 100), (m(24), 92), (m(27), 116), (m(29), 100), (m(33), 108), (m(35), 122), (m(37), 110)])
    org.joue("[f#4 b4]:h _:h | [f#4 a#4]:h _:h | [f#4 b4]:h | [g4 b4]:h | [f#4 a#4]:h | [f#4 b4]:h | "
             "[g4 b4]:h _:h | [f#4 a4]:h _:h | [g4 b4]:h | [g#4 b4]:h | [g4 a4]:h | [g4 a4]:h", m(21), v=56, legato=1.0)
    for k in range(21, 37):
        perc.note(m(k, 1), 0.25, TRI, 40 if k < 29 else 46)
    glock.joue("r:h | r:q b6:q | r:h | r:q a#6:q | r:h | r:h | r:h | r:q b6:q | r:h | r:q g6:q | r:h | r:q f#6:q | r:h | r:h | r:q a6:q | r:h",
               m(21), v=52)

    # ---- A' : tutti (orgue + fifre à l'octave, glockenspiel, grelots, grosse caisse)
    pompe(37, 52, 82, 68)
    org.joue(A1, m(37), v=86)
    org.joue(A2, m(45), v=[(0, 86), (8, 94), (16, 90)])
    fifre.joue(A1, m(37), v=70)
    fifre.joue(A2, m(45), v=72)
    glock.joue("f#6:e r:e d6:e r:e | r:q. a6:e | g6:e r:e c#6:e r:e | a6:e r:e e6:q | f#6:e r:e d6:e r:e | r:q. a6:e | b6:e r:e e6:e r:e | c#6:q a6:q",
               m(37), v=64)
    glock.joue("f#6:e r:e d6:e r:e | r:q. a6:e | g6:e r:e c#6:e r:e | a6:e r:e e6:q | f6:e r:e d6:e r:e | d6:e r:e bb6:e r:e | a6:e r:e e6:e r:e | f#6:q d6:q",
               m(45), v=66)
    for k in range(37, 53):
        perc.note(m(k), 0.25, GC, 56)
        perc.note(m(k, 0.5), 0.25, TAMB, 40)
        perc.note(m(k, 1.5), 0.25, TAMB, 44)
        for t in (0, 0.5, 1, 1.5):
            perc.note(m(k, t), 0.25, GRELOT, 34 + (8 if t in (0, 1) else 0))
    perc.note(m(37), 1, CYMB, 52)

    # ---- coda : le motif de Noëlombre (5-3 | 1-2-3) en ré majeur, son écho en si bémol, cadence
    pompe(53, 58, 80, 66)
    org.joue("a5:q f#5:q | d5:e e5:e f#5:q | d6:q bb5:q | bb5:e c6:e d6:q | d6:e bb5:e g5:e bb5:e | a5:e c#6:e e6:e g6:e | f#6:q d6:q | [f#5 a5 d6]:q' r:q",
             m(53), v=[(0, 88), (4, 80), (8, 86), (12, 92), (14, 96)])
    fifre.joue("a5:q f#5:q | d5:e e5:e f#5:q | d6:q bb5:q | bb5:e c6:e d6:q | d6:e bb5:e g5:e bb5:e | a5:e c#6:e e6:e g6:e | f#6:q d6:q | d6:q' r:q",
               m(53), v=72)
    glock.joue("a6:q f#6:q | r:h | d6:q bb6:q | r:h | r:h | r:q e6:e g6:e | f#6:q d6:q | [d6 a6]:q r:q", m(53), v=66)
    tuba.joue("d2:q' a2:q' | d3:q' r:q", m(59), v=84)
    acc_.joue("r:e [f#4 a4 d5]:e' r:e [f#4 a4 d5]:e' | [f#4 a4 d5]:q' r:q", m(59), v=70)
    for k in range(53, 60):
        perc.note(m(k), 0.25, GC, 54)
        perc.note(m(k, 1.5), 0.25, TAMB, 42)
        for t in (0, 0.5, 1, 1.5):
            perc.note(m(k, t), 0.25, GRELOT, 34 + (8 if t in (0, 1) else 0))
    perc.note(m(60), 0.5, GC, 66)
    perc.note(m(60), 1.5, CYMB, 56)
    perc.note(m(60), 0.25, TAMB, 50)
    return P
