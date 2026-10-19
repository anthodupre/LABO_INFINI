# Fiche du projet Labo Infini

À lire pour retoucher Labo Infini, ou pour un nouveau jeu du même genre. Ce qui suit (pixel art, « ça vire fou »,
clicker) a été demandé POUR CE JEU ; ce ne sont pas des préférences générales.

Jeu incrémental (type Cookie Clicker) : un labo de garage qui finit par contenir l'univers. Monnaie : molécules ;
prestige : prix Nobel. Rang du joueur selon les Nobels (0 : stagiaire non rémunéré ; 1 : doctorant prometteur ;
3 : jeune chercheur ; 10 : chercheur confirmé ; 25 : directeur de recherche ; 50 : professeur émérite…). Le 1er Nobel
demande 5e11 molécules cumulées dans la partie, puis « Publier ».

## Où sont les fichiers (dépôt LABO_INFINI, anciennement GAMES)
- **Publié** : `index.html` (racine) → `anthodupre.github.io/LABO_INFINI/` (avant le renommage : `…/GAMES/labo/`). Sauvegarde : `laboInfini.save.v1`
  (+ `.backup.v1`, `.corrupt.v1`), export `LABO1:`.
- **Sources** : `_dev/labo/` (`SPEC.md`, `src/`, `fonts/`, `icons/`, `tools/`, `briefs/` = consignes des sous-agents),
  non publiées sur le site. Les mentions de Koder dans `_dev/labo/SPEC.md` sont périmées (il n'utilise plus Koder).

## Construire et tester (depuis la racine du dépôt)
- `node _dev/labo/tools/build.js` → `index.html` (et une copie .txt dans `_dev/labo/dist/`, non suivie) ;
  il appelle `scripts/build.js` du skill (polices et icône intégrées, JS assemblé vérifié, version du jour).
- Les tests lisent `index.html` : reconstruire AVANT de tester.
  `NODE_PATH=$(npm root -g) node _dev/labo/tools/e2e.js` (36 vérifications), `smoke.js`, `gallery.js` (une capture
  par ère), `sim_rythme.js` / `sim_parties.js` (rythme de progression), puis
  `node .claude/skills/jeux-web-github/scripts/iphone_taps.js index.html "#btnSave" "#btnOpts" --prep="closeModal()" --swipe=.page`.

## Architecture (`_dev/labo/src/js/`, concaténés par ordre alphabétique)
- `00_util` (formatage FR des nombres, couleurs, aléatoire déterministe), `01_palette` (palette + registre SPRITES)
- `02-06_sprites_*` (bâtiments, récipients, icônes, nourriture/décors, Petri), `07_gfx` (rendu des sprites, icônes
  encadrées, analyse des récipients)
- `10-14_txt_*` (bâtiments, succès, divers, actualités, incidents)
- `20_data` (bâtiments, améliorations, succès, prestige, défis, souches ; normalisation typographique)
- `21_state` (état, sauvegarde, export/import), `22_engine` (calculs, achats, prestige, hors-ligne),
  `23_golden` (fioles dorées), `24_petri`, `25_audio` (bruitages), `26_incidents`, `27_musique` (une musique par ère)
- `30_ui` (interface, onglets, boutique, succès, Nobel, Petri, stats, options + DEV), `31_scene` (canvas),
  `32_labview` (rangées de bâtiments), `33_chaos` (la scène qui vire folle), `99_main` (démarrage, boucle)
- Contenu : 20 bâtiments, 9 ères, ~307 succès, 44 nœuds de prestige, 10 défis, 113 incidents.

## Historique de ses retours
Over the top → messages illisibles → achats fantômes sous les fioles → stagiaires qui clignotent → clic inutile
(« +4 c'est rien ») → prix figé en rouge → « Script error. » → import refusé → fichier « 12 lignes » → texte rendu
collé au lieu du code → icône → bande vide en bas → boutons morts. Les leçons sont dans
SKILL.md §4-5 et les autres fiches.

## Ce qu'il voulait dire par « over the top » (pour Labo Infini)
« Ça vire fou » : l'escalade doit **se voir** et arriver tôt. Sur Labo Infini, les premières captures (sprites
provisoires, décor de garage) lui ont fait croire que le jeu ne virait pas fou. Ce qui a répondu à la demande :
- **Ères** qui changent tout le décor (garage → université → MégaCorp → atomique → orbitale → dimensionnelle →
  stellaire → cosmique → infini) et l'objet cliquable (éprouvette → … → univers en bouteille), avec une annonce
  dramatique.
- **Scène qui se remplit** de chaque bâtiment acheté : stagiaires sur la paillasse, pipettes qui « cliquent »,
  anneau d'accélérateur autour de la fiole, objets en orbite, trou noir, portails, Big Bangs, effet Droste final,
  glitchs de réalité.
- **Incidents absurdes** aléatoires (bannière « ⚠ INCIDENT DE LABO ») de plus en plus délirants avec l'ère,
  personnages récurrents (Kévin le stagiaire, la voisine…), fil d'actualités qui suit l'escalade.
- Effets de clic qui montent en puissance avec l'ère (étoiles, galaxies, secousse d'écran, compteur arc-en-ciel).
- La folie est dans le **visuel et les textes** ; les chiffres, eux, doivent rester équilibrés.
