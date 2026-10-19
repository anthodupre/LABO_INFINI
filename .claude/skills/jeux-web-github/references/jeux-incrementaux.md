# Jeux incrémentaux / clickers / idle (leçons de Labo Infini)

À lire seulement si le jeu demandé est de ce genre. Ce qui a été demandé pour Labo Infini (« ça vire fou », pixel
art) est dans `labo-infini.md` ; ce n'est pas à imposer aux autres jeux.

## Sa règle : une progression CONSTANTE
Il l'a demandé après « je suis stuck au réacteur à fusion depuis plus d'une heure » : jamais de longue attente
sans nouveauté. Ce qui s'est passé et ce qui a corrigé :
- **Cause** : courbe copiée de Cookie Clicker. Le temps de rentabilité d'un bâtiment (coût ÷ production)
  grandissait de ×2,5 par bâtiment, donc chaque nouveau bâtiment prenait ~1,8× plus de temps que le précédent :
  attentes de 55 à 137 min dès le 7e bâtiment, et le 1er prix Nobel (le prestige qui débloque la suite) arrivait
  APRÈS le mur. Résultat simulé : 2 prix Nobel en 12 h de jeu.
- **Correctif** : rentabilité ×1,45 par bâtiment jusqu'au 13e (un nouveau bâtiment ou une ère toutes les ~5-25 min),
  puis pente raide où la publication prend le relais ; les 10 premiers prix Nobel valent +10 % chacun (la 1re
  publication se sent), puis +1 %, puis racine carrée au-delà de 100 (sinon emballement : tout fini en 7 h) ;
  **conseil dans le jeu** quand le labo stagne 20 min ET qu'une publication multiplierait la production d'au moins
  ×1,5 ; hors-ligne de base 25 % pendant 4 h.
- **Mesurer avant d'envoyer**, avec plusieurs profils de joueur (optimal, occasionnel, sans améliorations, par
  sessions) : `_dev/labo/tools/sim_rythme.js` (une partie : heure de chaque nouveau bâtiment, plus longue attente) et
  `_dev/labo/tools/sim_parties.js` (plusieurs parties avec un joueur qui publie quand le jeu le conseille). Cible :
  plus longue attente sans nouveauté ≤ ~25-30 min ; pas d'emballement (tous les bâtiments en ~10 h de jeu, l'arbre
  de prestige sur plusieurs jours). Un joueur qui n'achète AUCUNE amélioration reste lent : rendre les améliorations
  visibles (bouton « Tout acheter »).

## Structure de progression qui a marché
- 20 bâtiments (coûts façon Cookie Clicker, croissance ×1,15), 15 paliers d'amélioration par bâtiment (×2),
  synergies, « spécialistes », provisions (multiplicateurs globaux), hiérarchie fondée sur les succès (réputation).
- Clic : **toujours un % de la production** (1 % de base + 2 % par amélioration de gant) ; améliorations de clic
  débloquées par le nombre de clics. Sinon le clic devient inutile (« +4 c'est rien »).
- Jauge « Eurêka » remplie par les clics (clics ×10 temporaire), objets dorés aléatoires (frénésie, gain instantané,
  clics ×777, pluie d'objets), anomalies rares (débloquées par le prestige).
- Prestige (publication → prix Nobel = ⌊∛(molécules cumulées ÷ 5e11)⌋), arbre de 44 nœuds, 10 défis
  (« protocoles ») à récompense permanente, mini-jeu jardin (boîte de Petri avec mutations), ~300 succès.
- Hors-ligne : 15 % pendant 3 h au départ, améliorable par le prestige.

## Pièges d'équilibrage rencontrés (vérifiés par simulation)
- **Multiplicateur par ère ×2** : emballement (tout fini en 5 h). ×1,5 encore trop. **×1,25** retenu.
- Bâtiments tardifs trop rentables + bonus d'ère = boucle explosive ; garder la pente de coûts finale de Cookie Clicker.
- Boucle Nobel → production qui diverge : **plafond doux** (au-delà de 1000 Nobels, bonus en racine carrée) et coûts
  des dernières rangées de l'arbre ×100 par rangée.
- **Récolte > coût** dans le mini-jeu (blob : coût 120 s, gain 600 s) = planche à billets ×36 000. Toujours vérifier
  gain/coût/temps de chaque action répétable.
- Incidents trop généreux qui grossissent avec l'ère : buffs fixes (×3 / clics ×15), gains 1-3 min de production,
  bâtiments gratuits plafonnés à 15 min de production.
- Achievement impossible en pratique (« moins d'1 molécule après un achat ») : seuils relatifs.
- Bonus « 10 premières minutes » calculé pendant une absence de 7 jours : avancer le temps avant de recalculer.
- Défi du type « ne rien faire pendant X, jeu ouvert » : compter le temps de jeu réellement ouvert (compteur en
  mémoire incrémenté dans `tick`, non sauvegardé), jamais avec l'heure d'un horodatage sauvegardé (sinon il suffit
  de fermer l'app).
- Chaque constante d'équilibrage est nommée UNE fois (`const NOBEL_BASE = 5e11`) et réutilisée par le moteur,
  l'interface et les textes : 1e11 et 1e12 recopiés à 4 endroits ont donné une barre « Prochain Nobel » fausse.
- Cibles retenues : ère 4 vers ~50 min, 1er prestige vers 2-3 h de jeu actif, espace en 2e-3e partie,
  dernières ères au fil des jours, longue traîne (semaines) via prestige, défis et succès.

## Méthode de simulation (indispensable)
- Playwright charge le jeu, `G.ready=false` (pas de DOM), puis boucle `tick(1)` avec un joueur automatique qui achète
  le meilleur rapport `(manque/production) + coût/gain` (mesuré en appliquant puis retirant l'achat et en recalculant),
  clique 4/s les 30 premières minutes puis 1/s, attrape 75 % des objets dorés.
- Mesurer : heure de chaque ère, seuils (1e6, 1e9, 1e12…), production par heure, Nobels, puis enchaîner plusieurs
  publications (dépense des points au moins cher).
- Pour la longue traîne : simulation « calendaire » (2 h actives/jour, le reste hors-ligne) sur 2-4 semaines.
- Attention : `G.ready=false` coupe aussi les incidents (`INC.update`) et l'apparition des fioles (`GOLD.update`).
  Les simuler explicitement (ex. `INC.fire()` toutes les 150-330 s ; effet doré appliqué à 75 % de la fréquence),
  sinon la vitesse réelle est sous-estimée (Labo Infini, avant rééquilibrage : 1er Nobel en 0,5-1,7 h avec
  incidents, contre 1,5-2 h sans).
