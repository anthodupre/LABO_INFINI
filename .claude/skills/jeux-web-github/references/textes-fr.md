# Textes français générés par le code

Les textes écrits à la main étaient bons ; les fautes venaient surtout des **phrases assemblées par le code**.
Toujours générer réellement les textes (boucle Node sur toutes les descriptions) et les relire.

## Nombres en toutes lettres
« 1 million **de** molécules », « 3 milliards **d'**atomes », mais « 12 345 molécules ». Utiliser un utilitaire :
```js
function deMot(s, nom) { return /[A-Za-zéû]$/.test(s) ? (/^[aeiouyàâäéèêëîïôöùûüœæh]/i.test(nom) && !H_ASPIRE.test(nom) ? ' d’' : ' de ') : ' '; }
function fmtNom(v, sing, plur, d = 0) { const s = fmt(v, d); return s + deMot(s, plur) + (v >= 2 ? plur : sing); }
```
(dans `assets/starter/ios-kit.js`). Toutes les voyelles comptent (« 1 million d’œufs », « d’âmes ») ; h aspiré
(héros, hamsters, haricots…) : « de » (liste `H_ASPIRE` à compléter selon le jeu).
Noms français des grands nombres : million, milliard, billion, billiard, trillion, trilliard, quadrillion…
(pluriel avec « s » à partir de 2, décidé sur le nombre AFFICHÉ : 1,9999 s'affiche « 2 », donc « 2 millions »),
jusqu'à sexdécilliard (1e99), puis notation scientifique (corrigée pour ne jamais afficher « 10e65 ») au-delà de la table (garde-fou : jamais
« 1 undefined »). Virgule décimale française (`dec()`), espaces fines insécables pour les milliers.

## Accords et noms propres
- Singulier/pluriel partout (« 1 exemplaire », « 1 cycle », « 1 fiole dorée »).
- Genre : liste des noms féminins (« +3 pipettes gratuit**es** »).
- Ne pas `toLowerCase()` des noms propres : « becs Bunsen », « fabriques de Big Bang », « Labo Infini » ; prévoir
  `lcName`/`lcPlural` par objet, et retirer l'article en milieu de phrase (« Atteindre l'Ère orbitale » avec
  apostrophe courbe).
- Nom choisi par le joueur après une préposition : éviter « de {labo} » / « au {labo} » (« au Les Ateliers… »)
  → « Bienvenue au labo « {labo} » ! », « {labo}, rapport annuel : … ». Noms par défaut sans article.
- Éviter les pléonasmes « +5 % plus fréquentes » → « 5 % plus fréquentes ». « Cliquer **sur** une fiole ».

## Typographie
Normaliser tous les textes au chargement (`TYPO` du kit ; textes seulement, jamais le HTML : `style="width:50%"`
deviendrait invalide) : espace fine insécable (U+202F) toujours avant `»` et `%` et après `«` ; avant `; ! ?`
seulement s'il y avait une espace (« Quoi?! » et `&amp;` restent intacts) ; insécable (U+00A0) avant `:` ;
apostrophes courbes `’` entre deux lettres (y compris accentuées : `[A-Za-zÀ-ÿŒœ]`). Dans le code, écrire ces
espaces en échappements (`\u202f`, `\u00a0`) : invisibles, elles se perdent facilement.

**Attention** : les polices intégrées (sous-ensembles latin) N'ONT PAS de glyphe pour U+202F (fine insécable),
U+2009, ∞, ⚠, ★, ✦, ✿ ni ✔. Le navigateur les dessine avec la police de secours : toujours garder une pile de
secours (`font-family:"VT323",ui-monospace,Menlo,monospace`) et vérifier ces caractères sur une capture. Elles
contiennent bien U+00A0, ’, « », …, —, Œ/œ, • et ×.

## Contenu
- Noms uniques entre améliorations, succès et incidents (vérifier les doublons par script, sans accents ni casse).
- Personnages récurrents cohérents (« Kévin » toujours avec l'accent).
- Brèves/incidents liés à un bâtiment : champ `b` pour ne pas parler d'un bâtiment que le joueur n'a pas.
- Messages d'erreur toujours en français clair (jamais le message brut de `JSON.parse` / `atob`).
