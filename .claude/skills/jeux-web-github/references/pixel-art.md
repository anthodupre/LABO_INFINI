# Pixel art (seulement si le jeu demandé est en pixel art)

Labo Infini était en pixel art parce qu'il l'avait demandé pour ce jeu. Ce n'est pas une préférence générale.
Si un nouveau jeu est en pixel art : `scripts/nouveau_jeu.js … --pixel` ajoute la palette (`assets/pixel/palette.js`),
le rendu de sprites texte (`assets/pixel/gfx.js`), des sprites d'exemple et les polices Pixelify Sans + VT323 (OFL).

## Sprites en texte
- Un caractère = un pixel, palette commune (Endesga 32 étendue) ; `'.'` = transparent, `'~'` = liquide animé par le
  moteur, `'+'` = couleur d'accent teintée par le moteur, `a`/`A` = verre translucide.
- `SPRITES.nom = { w, h, frames: [[lignes…], …] }` dans des fichiers `Object.assign(SPRITES, {...})`.
- Valider ET REGARDER : `node <skill>/scripts/sprite_preview.js planche.png sprites.js --palette=…` puis ouvrir le
  PNG (outil Read) et retoucher 2-3 fois. Les premières captures de Labo Infini, avec des sprites provisoires,
  lui ont donné une mauvaise impression du jeu : ne jamais livrer de sprites provisoires.
- Tailles qui ont marché : objets 16×16 (2 images), grands objets 48×48, particules 4-8 px, icône d'app 180×180
  dessinée à partir des sprites (agrandissement entier, fond opaque).

## Scène
- Canvas en résolution logique, agrandi par un **facteur entier** unique (pas de « mixels ») ; recalcul au
  redimensionnement ; arrière-plan statique mis en cache, partie animée redessinée.
- Personnages : chacun sa place (aucun chevauchement), petite balade de ±3 px, pas de retournement d'un sprite vu de
  face, animation lente (~1 image/s pour les détails, pas de saut aléatoire d'1 px).
- Rangées avec profondeur : rangée du fond **assombrie et opaque** (variante `dim` du sprite), jamais
  semi-transparente (effet « double image » signalé par l'utilisateur).
- Performance (fin de partie) : pas d'allocations par pixel et par image (table arc-en-ciel précalculée, couleurs
  précalculées par explosion, `fillStyle` sorti des boucles, clés de cache sans `JSON.stringify`).
- Bugs qu'il a signalés : « les scientifiques buggent et flicker », « semblent dédoubler » → places fixes, animation
  lente, rangée du fond opaque (voir ci-dessus).
