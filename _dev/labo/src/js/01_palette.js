/* ===================== PALETTE & REGISTRE DE SPRITES ===================== */
// Palette commune (base Endesga 32 + extensions). Un caractère = une couleur.
// '.' = transparent. '~' = intérieur liquide (rendu par le moteur). '+' = couleur d'accent (teintée par le moteur).
const PAL = {
  '0': '#181425', // contour / quasi-noir
  '1': '#262b44', // bleu nuit
  '2': '#3a4466', // ardoise sombre
  '3': '#5a6988', // ardoise
  '4': '#8b9bb4', // gris-bleu
  '5': '#c0cbdc', // gris clair
  '6': '#ffffff', // blanc
  'r': '#a22633', // rouge sombre
  'R': '#e43b44', // rouge
  'p': '#ff0044', // rouge néon
  'k': '#f6757a', // rose saumon
  'o': '#f77622', // orange
  'y': '#feae34', // ambre / or
  'Y': '#fee761', // jaune
  'G': '#63c74d', // vert clair
  'g': '#3e8948', // vert
  'q': '#265c42', // vert sombre
  'Q': '#193c3e', // sarcelle très sombre
  'c': '#2ce8f5', // cyan
  'B': '#0099db', // bleu clair
  'b': '#124e89', // bleu
  'v': '#68386c', // violet sombre
  'M': '#b55088', // magenta
  'V': '#9b5de5', // violet vif
  'L': '#d4b8ff', // lavande
  'n': '#3e2731', // brun sombre
  'N': '#733e39', // brun
  'w': '#b86f50', // bois
  'W': '#e4a672', // beige
  's': '#ead4aa', // crème
  'S': '#e8b796', // peau claire
  'z': '#c28569', // peau moyenne
  'e': '#be4a2f', // rouille
  'E': '#d77643', // rouille claire
  'a': 'rgba(255,255,255,0.55)', // reflet de verre (translucide)
  'A': 'rgba(192,203,220,0.22)', // teinte de verre (translucide)
};
// Registre global des sprites : { nom: { w, h, frames: [ [lignes...], ... ] } }
const SPRITES = {};
