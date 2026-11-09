# Fiche du projet Noëlombre (jeu 3D, novembre 2026)

Sa demande, mot pour mot : « Create a photorealistic game where you move through a procedurally generated christmas
town at night that feels like the one in a nightmare before christmas, like you're inside a "small bubble" in a way
even though the world is infinite. With cool stuff, making it worth to explore for hours. Replace the game that's
already on the website, make a completely different and amazing game ».
→ Il a REMPLACÉ Labo Infini dans le même dépôt (`index.html` de `LABO_INFINI`). Tout doit rester ORIGINAL (ambiance
« conte gothique de Noël », jamais de personnage, nom ou musique du film).

## Où sont les fichiers
- Publié : `index.html` (racine). Sauvegarde : `noelombre.save.v1` (+ backup/corrupt), export `NOEL1:`.
- Sources : `_dev/noelombre/src/js/` (ordre alphabétique, un seul `<script>`) :
  `01_three.js` (Three.js r170 + post-traitement, GÉNÉRÉ par `tools/vendor.js` avec esbuild ; ne pas modifier),
  `02_kit.js`/`08_coquille.js`/`99_main.js` (coquille du skill), `11_outils` (hasard déterministe, bruit),
  `12_textures` (textures peintes au démarrage + reliefs), `13_materiaux` (PBR + courbure « petite planète » + neige
  posée sur tout ce qui regarde le ciel), `14_geo` (lots fusionnés par matière, maisons tordues, sapins, lampadaires),
  `15_textes` (TXT, écrit par un sous-agent), `16_monde` (plan infini : parcelles de 44 m, quartiers en Voronoï,
  repères, relais), `17_parcelle` (maillages d'une parcelle), `18_reperes` (12 repères), `19_audio` (AUDIO, écrit par un
  sous-agent : musique par quartier + ambiance + bruitages), `20_ciel` (dôme, lune, aurore, neige), `21_joueur`
  (commandes + physique), `22_entites` (instances : bonbons, cadeaux, lueurs, spectres), `23_hud` (HUD, cartes,
  Atelier, Quêtes, Album, AMEL), `30_jeu` (JEU : boucle, progression, quêtes, succès, événements, réglages).
- Outils (depuis la racine) : `node _dev/noelombre/tools/build.js` (→ index.html), `tools/e2e.js` (35 vérifications),
  `tools/shot.js` (capture), `tools/tour.js` (une capture par repère), `tools/quartiers.js`, `tools/icone.js`,
  `tools/vendor.js` (régénérer Three.js : `npm install three@0.170.0 esbuild@0.24.0` dans un dossier temporaire).

## Leçons 3D sur iPhone (à réutiliser pour tout jeu 3D)
- Three.js intégré dans le fichier (pas de CDN : l'app de l'écran d'accueil doit marcher hors ligne). r163+ = WebGL2
  seulement (iOS 15+). esbuild `--line-limit=300` garde les lignes courtes (règle des 500 caractères).
- Peu d'appels de dessin : une parcelle = un maillage par matière (lots fusionnés à la main). Lumières : une poignée de
  vraies PointLight attribuées aux sources les plus proches + « flaques » additives au sol (fausse lumière gratuite).
  Changer le NOMBRE de lumières recompile tous les shaders : seulement au changement de qualité.
- Qualité Auto (iPhone = Moyen) + baisse automatique si < 24 images/s ; Options › Graphismes (Bas/Moyen/Haut/Ultra).
- Cible de rendu HalfFloat seulement si l'extension existe ; perte de contexte WebGL → sauvegarde + rechargement.
- Courbure du monde dans le shader de sommets : agrandir les sphères englobantes (sinon objets coupés à tort).
- Tests : Chromium headless + `--use-angle=swiftshader` ; c'est TRÈS lent (1-3 images/s) : attendre des conditions
  (boucle d'attente) plutôt que des délais fixes ; la boîte « Erreur » de la coquille avale les exceptions de la boucle
  (les chercher dans la page, `pageerror` ne les voit pas). La qualité auto peut descendre pendant les tests.
- Commandes : moitié gauche = manette qui apparaît sous le pouce ; droite = regard ; boutons de jeu au pointerdown,
  boutons qui ouvrent une fenêtre en onclick ; `touch-action:none` sur la couche de commandes seulement.
