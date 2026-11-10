# Fiche du projet Noëlombre (expérience 3D, novembre 2026)

Sa demande : « Create a photorealistic game where you move through a procedurally generated christmas town at night that
feels like the one in a nightmare before christmas, like you're inside a "small bubble" in a way even though the world
is infinite. With cool stuff, making it worth to explore for hours. Replace the game that's already on the website ».
→ Il a REMPLACÉ Labo Infini dans le même dépôt (`index.html` de `LABO_INFINI`). Tout reste ORIGINAL (ambiance « conte
gothique de Noël », jamais de personnage, nom ou musique du film).

**Sa réaction à la version 1** (un vrai jeu : jauge de froid, bonbons, cadeaux, quêtes, boutique, mini-carte, musique
synthétisée, textures peintes) : « I didn't want a game, I wanted an experience. Also crossed paths with the same thing
like 5 times. Also non photorealistic graphics. Music is shit, graphics ugly ». La **version 2** est donc :
- une PROMENADE sans aucune interface de jeu (un petit bouton de menu, la manette sous le pouce, des titres de lieux en
  « carton de cinéma ») ; une tape = éclat de lanterne qui révèle des fantômes ; une lueur-guide mène toujours vers une
  merveille pas encore vue ; le ciel change seul (neige, brume, tempête, aurore, nuit claire, traîneau, envol de lanternes) ;
- des MERVEILLES tirées d'une PIOCHE sans remise (mémorisée dans la sauvegarde : jamais la même avant d'avoir tout vu)
  et des BLOCS en motif latin (jamais deux voisins identiques) ; rues tordues par le shader (grille logique intacte) ;
- de vraies textures photo (Poly Haven CC0, `photos/`), vraie lune (NASA), fenêtres en « interior mapping », ombres de
  lune mises en cache, étalonnage cinéma + FXAA, résolution adaptative ;
- une musique ENREGISTRÉE (5 pièces + 3 boucles composées par programme, rendues avec FluidSynth/FluidR3_GM, MP3).

## Où sont les fichiers
- Publié : `index.html` (racine, ~5,8 Mo dont ~3,3 de musique et ~1 de textures). Sauvegarde `noelombre.save.v1`, export `NOEL1:`.
- Sources `_dev/noelombre/src/js/` (ordre alphabétique, un seul `<script>`) : `01_three` (Three.js r170 + post-traitement,
  GÉNÉRÉ par `tools/vendor.js`), `02_kit`/`08_coquille`/`99_main` (coquille), `04_photos` (GÉNÉRÉ par `tools/photos.js`),
  `05_sons` (GÉNÉRÉ par `tools/sons.js`), `11_outils` (bruit, TORS), `12_textures` (textures peintes + atlas des pièces),
  `13_materiaux` (versMonde = torsion + courbure, neige qui scintille, fenêtres habitées, points lumineux),
  `14_geo` (lots fusionnés, modèles), `14b_maison` (maison v2 : styles, colombages, vitrines, toits enneigés),
  `15_textes`, `16_monde` (plan, types, pioche, motif latin, relief, MONDE.tordre/jacob), `17_parcelle`,
  `18_reperes` (12 merveilles), `18a_blocs` (6 blocs), `18b_lieux` (12 blocs + 8 merveilles), `18m_*.js` (lieux faits par
  des sous-agents), `19_audio` (ambiance + bruitages synthétisés), `19b_musique` (lecture des MP3, chef d'orchestre,
  boucles de décor), `20_ciel`, `21_joueur`, `22_entites` (lueurs, fantômes), `23_hud`, `30_jeu`.
- Musique : `_dev/noelombre/audio/*.mp3` + partitions/rendu dans `audio/src/` (`python3 audio/src/tout.py` puis
  `node tools/sons.js` ; besoin de fluidsynth + fluid-soundfont-gm + ffmpeg). Mesurer la sonie avec `ffmpeg -af ebur128`.
- Outils (depuis la racine) : `tools/build.js` (→ index.html), `tools/e2e.js`, `tools/lieux.js` (construit CHAQUE lieu :
  erreurs, triangles, temps), `tools/visite.js` + `tools/planche.py` (une capture par lieu + planches-contact),
  `tools/essai.js` (banc d'essai d'un fichier de lieux sur le cœur gelé `gel/`), `tools/shot.js`, `tools/err.js`.

## Ajouter un lieu
Fiche dans REPERES : `{ genre: 'bloc' (sinon merveille : nom + desc), maisons, route, lampes, sansPlace, boucle, humeur,
fantomes, relief(lx, lz, t, tCentre), glace(lx, lz), plan(P, rng), construire(L, P, rng, groupe, Q) -> [anim(t, dt, ctx)] }`.
Mode d'emploi complet (API, direction artistique, budgets) : `_dev/noelombre/briefs/contenu.txt`. Vérifier avec
`tools/lieux.js` puis `tools/visite.js <id>` et REGARDER la capture.

## Leçons (à réutiliser pour tout projet 3D ou « expérience »)
- Three.js intégré au fichier (r163+ = WebGL2, iOS 15+) ; esbuild `--line-limit=300`.
- Une parcelle = un maillage par matière (lots fusionnés à la main) ; ampoules et halos en `Points` (1 sommet chacun) ;
  5 vraies lampes attribuées aux sources les plus proches + flaques additives ; changer le NOMBRE de lampes recompile tout.
- Déformer le monde dans le shader de sommets (torsion, courbure) : la logique reste dans une grille simple ; la caméra
  et les lampes appliquent la même formule en JS ; agrandir les sphères englobantes ; ombres calculées non déformées
  des deux côtés (cohérent). Toute matière sur mesure doit passer par `MAT.patch`.
- Résolution adaptative (rapport de pixels ajusté selon les images/s) plutôt que des paliers fixes ; cible de rendu
  HalfFloat seulement si l'extension existe ; perte de contexte WebGL → sauvegarde + rechargement.
- Musique : décoder UNE pièce MP3 à la fois avec `decodeAudioData` (≈ 20 Mo décodée) ; le MP3 se décode aussi dans le
  Chromium de Playwright (testable). Le volume d'un `<audio>` ne se règle pas sur iOS : passer par WebAudio.
- Tests : Chromium headless + `--use-angle=swiftshader` = 1-3 images/s : ATTENDRE des conditions, jamais des délais fixes ;
  la boîte « Erreur » de la coquille avale les exceptions de la boucle (la chercher dans la page). Plusieurs navigateurs
  de test en parallèle (sous-agents) saturent la machine : captures qui expirent.
- Sous-agents : la limite d'usage (5 h) peut les couper en plein travail → leur faire écrire leur fichier lieu par lieu
  (toujours valide), prévoir de finir soi-même, et garder un banc d'essai sur un cœur GELÉ pour qu'ils ne cassent rien.
