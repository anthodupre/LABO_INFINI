# LABO INFINI — Spécification (document de référence pour tous les contributeurs)

Jeu incrémental type *Cookie Clicker*, thème **laboratoire scientifique qui vire complètement over-the-top**
(d'une éprouvette dans un garage jusqu'à un labo qui contient l'univers et lui-même).
**Tout en français.** Pixel art soigné. Un seul fichier HTML final (publié sur GitHub Pages et joué sur iPhone comme
app de l'écran d'accueil, hors-ligne, écran tactile). Voir le skill `.claude/skills/jeux-web-github/`. Monnaie : **molécules**. Prestige : **Prix Nobel**.

Le code est découpé en fichiers JS dans `src/js/` concaténés dans l'ordre alphabétique dans un unique `<script>`.
=> **Chaque fichier ne déclare que les constantes globales qui lui sont attribuées** (pas d'autre `const`/`let`/`function`
au niveau global, sinon collision). Pas de `import`/`export`, pas de modules, pas de dépendances, pas de réseau.

Ton général : humour absurde, scientifique, escalade progressive (réaliste → ridicule → cosmique → métaphysique).
Références geek/science bienvenues, jeux de mots français appréciés, rester tout public. Pas de marques déposées réelles.
Ortographe et accents français impeccables (é, è, ê, à, ç, œ, « guillemets », etc.). Phrases courtes et percutantes.

---------------------------------------------------------------------------------------------------

## 1. Les 20 bâtiments (ids fixes, dans cet ordre)

| # | id | Nom | Idée / lore |
|---|----|-----|-------------|
| 1 | `pipette` | Pipette automatique | Une pipette motorisée qui « clique » la fiole pour vous. (équivalent du curseur) |
| 2 | `stagiaire` | Stagiaire | Un stagiaire sous-payé qui fabrique des molécules à la main. (équivalent de la mamie) |
| 3 | `bunsen` | Bec Bunsen | Chauffe les réactifs, accélère les réactions. |
| 4 | `microscope` | Microscope | Découvre des molécules qui étaient déjà là, cachées. |
| 5 | `centrifugeuse` | Centrifugeuse | Sépare les molécules du néant à très haute vitesse. |
| 6 | `robot` | Bras robotique | Paillasses entièrement automatisées. |
| 7 | `clonage` | Cuve de clonage | Clone des molécules (et parfois des chercheurs). |
| 8 | `fusion` | Réacteur à fusion | Fusionne des atomes en molécules toutes fraîches. |
| 9 | `accelerateur` | Accélérateur de particules | Fracasse des particules, on récupère les molécules dans les débris. |
| 10 | `quantique` | Ordinateur quantique | Calcule des molécules dans tous les états à la fois. |
| 11 | `orbitale` | Station orbitale | Labo en apesanteur, synthèse sans gravité. |
| 12 | `nanobots` | Essaim de nanobots | Des milliards de robots qui assemblent atome par atome (et se répliquent). |
| 13 | `portail` | Portail dimensionnel | Importe des molécules de labos parallèles. |
| 14 | `chrono` | Chronolabo | Récupère les molécules du futur avant qu'elles soient fabriquées. |
| 15 | `forge` | Forge stellaire | Forge des éléments lourds dans des étoiles captives. |
| 16 | `trounoir` | Trou noir domestiqué | Un trou noir de compagnie ; on récolte son rayonnement de Hawking. |
| 17 | `simulateur` | Simulateur d'univers | Simule des univers où les molécules sont bon marché et les importe. |
| 18 | `cerveau` | Cerveau galactique | Un cerveau de la taille d'une galaxie qui pense les molécules. |
| 19 | `bigbang` | Fabrique de Big Bang | Produit des univers à la chaîne pour leurs molécules. |
| 20 | `infini` | Le Labo Infini | Le labo qui contient le labo qui contient le labo… La récursion ultime. |

Ères (débloquées en possédant le bâtiment indiqué) :
1 Garage (départ) · 2 Université (microscope) · 3 MégaCorp (robot) · 4 Atomique (fusion) · 5 Orbitale (orbitale) ·
6 Dimensionnelle (portail) · 7 Stellaire (forge) · 8 Cosmique (simulateur) · 9 Infinie (infini).

Récipients cliquables (évoluent avec l'ère) : `v1` Éprouvette (ère 1) · `v2` Erlenmeyer (ères 2-3) · `v3` Ballon à réaction
(ères 4-5) · `v4` Cuve à plasma (ère 6) · `v5` Étoile en bouteille (ères 7-8) · `v6` Univers en bouteille (ère 9).

---------------------------------------------------------------------------------------------------

## 2. PIXEL ART

### 2.1 Format
Fichier JS : `Object.assign(SPRITES, { nom: { w: 16, h: 16, frames: [ [ ...h chaînes de w caractères... ], ... ] }, ... });`
Chaque caractère = un pixel, couleur prise dans `PAL` (voir `src/js/01_palette.js`). `.` = transparent.
Caractères spéciaux : `~` = intérieur liquide (uniquement pour les récipients v1..v6 ; le moteur y dessine un liquide animé),
`+` = couleur d'accent teintée par le moteur (lumières/runes qui changent de couleur). `a` / `A` = verre translucide.

Validation et aperçu (OBLIGATOIRE, itérer jusqu'à ce que ce soit beau) :
```
node tools/preview.js preview/NOM.png src/js/TONFICHIER.js --scale=6
```
puis ouvrir le PNG avec l'outil Read pour le regarder. Le script signale toute ligne de mauvaise longueur.

### 2.2 Guide de style (important)
- Contour sombre 1 px (`0`, ou `1`/`n` pour un contour plus doux) autour de chaque objet ; éclairage venant d'en haut à gauche
  (reflets clairs en haut-gauche, ombres en bas-droite). 2-4 nuances par matériau (ex. métal : `2 3 4 5`, verre : `a A 5 6`).
- Silhouettes lisibles à petite taille, objets centrés, remplir l'espace (marges de 0 à 1 px).
- Pas de pixels orphelins / de bruit. Symétrie quand l'objet est symétrique. Anti-aliasing manuel léger autorisé.
- Couleurs saturées mais harmonieuses ; chaque bâtiment a une couleur dominante distincte.
- Les animations (frame 2) sont subtiles : bulle qui monte, voyant qui clignote, flamme qui ondule, pas de marche.

---------------------------------------------------------------------------------------------------

## 3. TEXTES (contenu)

Toutes les entrées « nom + citation » utilisent `{ n: 'Nom', q: 'Citation / texte d'ambiance' }`.
- `n` : 1 à 5 mots, drôle, évocateur. Pas de point final.
- `q` : une phrase courte (max ~110 caractères), ton humoristique, peut être une fausse citation entre « » avec auteur fictif.
Les **effets mécaniques** (×2, +1 %…) sont générés par le moteur : NE PAS les écrire dans `q`.
Utiliser des apostrophes typographiques ou échapper correctement les apostrophes dans les chaînes JS
(préférer les chaînes entre guillemets doubles "…" ou les backticks quand le texte contient des apostrophes).
Valider avec : `node -e "require('vm').runInNewContext(require('fs').readFileSync('src/js/FICHIER.js','utf8')+';',{})"`
