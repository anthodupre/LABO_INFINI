# iPhone + GitHub Pages : correctifs éprouvés

Tout ce qui suit a été appris sur Labo Infini, souvent après un bug signalé par l'utilisateur.
Le code correspondant est rassemblé dans `assets/starter/ios-kit.js`.

## Sommaire
1. En-tête HTML (méta, icône, polices)
2. Hauteur de l'écran / bande vide en bas
3. Défilement et tapes (ce qu'il ne faut PAS faire)
4. Sauvegarde, export, import
5. Erreurs JS et « Script error. »
6. Son (AudioContext)
7. Mise en arrière-plan / hors-ligne
8. CSS compatible iOS 14
9. Icône de l'écran d'accueil
10. Simuler l'iPhone dans Playwright

---

## 1. En-tête HTML

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">   <!-- PAS black-translucent -->
<meta name="apple-mobile-web-app-title" content="Nom du jeu">
<link rel="apple-touch-icon" href="data:image/png;base64,...">       <!-- + PNG de secours, voir §9 -->
```
- `viewport-fit=cover` + variables CSS `--st/--sb/--sl/--sr` = `env(safe-area-inset-*)`.
- La barre du haut du jeu reçoit `padding-top: calc(4px + var(--st))`, les zones qui défilent reçoivent
  `padding-bottom: calc(24px + var(--sb))`, le conteneur principal `padding-left/right: var(--sl)/var(--sr)`
  (encoche en paysage). Ne pas mettre de padding haut/bas sur le conteneur principal lui-même.
- Polices intégrées en base64 **découpé en lignes de ~96 caractères** avec la continuation de chaîne CSS
  `\` + saut de ligne, dans `url("data:font/woff2;base64,\` … `")`. Un `href` de data URI peut contenir
  des sauts de ligne (le parseur d'URL les retire).

## 2. Hauteur de l'écran : la « bande vide en bas »

Chronologie réelle (à ne pas revivre) :
1. Ajout de `black-translucent` avec l'icône → bande vide de ~59 pt en bas en mode écran d'accueil.
2. Correctif basé sur `window.innerHeight` → inefficace (iOS annonce parfois la bonne valeur alors que la page
   est courte).
3. Correctif basé sur la hauteur réellement mesurée → OK.
4. Ajout de `body{position:fixed}` pour bloquer le défilement → **la bande revient** (cause probable : WebKit
   coupe `#app`, étiré plus haut que le body fixe en overflow:hidden ; non vérifié hors iPhone).
5. Solution finale : barre d'état **opaque** (`black`) + filet ciblé.

Filet ciblé (ne s'active que si une barre transparente recouvre la page ET qu'il manque exactement sa hauteur) :
```js
function isStandalone() { return navigator.standalone === true || !!(window.matchMedia && matchMedia('(display-mode: standalone)').matches); }
function safeTop() { // vraie valeur de env(safe-area-inset-top)
  const d = document.createElement('div');
  d.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:env(safe-area-inset-top,0px);visibility:hidden;pointer-events:none';
  document.body.appendChild(d); const h = d.getBoundingClientRect().height; d.remove(); return h;
}
function fixStandaloneHeight(app) {
  app.style.bottom = ''; app.style.height = '';
  if (!isStandalone() || !window.screen) return;
  const st = safeTop(); if (st < 1) return;                 // barre opaque : rien à faire
  const real = Math.min(app.getBoundingClientRect().height, document.documentElement.clientHeight, innerHeight);
  const portrait = innerHeight >= innerWidth;
  const full = portrait ? Math.max(screen.height, screen.width) : Math.min(screen.height, screen.width);
  const missing = full - real;
  if (missing > 4 && missing <= st + 8) { app.style.bottom = 'auto'; app.style.height = full + 'px'; }
}
// appeler au démarrage, sur resize/orientationchange, puis à 300, 1200 et 3000 ms
```
Prévoir un bouton DEV « Infos écran » (standalone, barre, innerHeight, clientHeight, hauteur du jeu, écran)
pour diagnostiquer à partir d'une capture de l'utilisateur.

## 3. Défilement et tapes

**Interdit** (a rendu tous les boutons inutilisables d'un coup) :
- `setInterval(() => scrollTo(0,0))`, écouteur `scroll` qui remet en place, écouteurs `visualViewport` qui
  remettent en place ;
- tout écouteur `touchmove` sur document qui appelle `preventDefault()`, **même avec des exceptions** pour les zones
  qui défilent. La version réellement fautive était
  `if (!e.target.closest('.page, .mbody, textarea, .journal, #tip, .tabs')) e.preventDefault()` ;
- `body{position:fixed}`.

**Autorisé** :
```js
document.addEventListener('focusout', () => setTimeout(() => { if (scrollY || scrollX) scrollTo(0, 0); }, 120));
```
CSS : `html,body{height:100%;overflow:hidden;overscroll-behavior:none}`, conteneur principal
`position:fixed;top:0;right:0;bottom:0;left:0`, `touch-action:manipulation` sur body, `touch-action:none`
seulement sur le canvas de clic et les objets à attraper (`.shimmer`, posé par `makeCatchable`).
`scripts/build.js` signale ces erreurs (« PIÈGE ») avant qu'elles partent sur l'iPhone.

Le gros élément cliquable (fiole, cookie) réagit au `pointerdown` (réactif même pendant un défilement) ;
les boutons utilisent pointerup/click (voir `ui-tactile.md`). Un bouton qui OUVRE une modale ou un panneau
utilise `onclick` : avec une action au pointerup, le `click` qui suit tombe sur la modale qui vient de s'ouvrir.

## 4. Sauvegarde, export, import

- **Clé de sauvegarde et préfixe d'export propres à chaque jeu** (`kitConfig('monJeu2', 'JEU2')`) : tous ses jeux
  sont sur `anthodupre.github.io` (même domaine = même localStorage) ; deux jeux avec la même clé s'écraseraient.
- `localStorage` peut être indisponible ou plein : magasin mémoire de secours + **test au démarrage**
  (`probe()`) → message « exportez régulièrement » si indisponible ; avertir une fois si une sauvegarde auto échoue.
- Sauvegarde auto toutes les 30 s + `visibilitychange` (hidden) + `pagehide` + `beforeunload` + bouton manuel.
- **Copie de secours tournante** (toutes les 10 min et à chaque sauvegarde manuelle), en n'y copiant QUE une
  sauvegarde lisible (sinon, après une récupération, la seule bonne copie serait écrasée par la version abîmée).
- `store.get` lit d'abord la mémoire (`MEMSTORE`), puis localStorage : si une écriture a échoué (stockage plein),
  c'est la mémoire qui a la valeur la plus récente.
- Si la sauvegarde principale est illisible : la copier telle quelle dans une clé « corrompue » AVANT toute nouvelle
  sauvegarde, essayer la copie de secours, sinon afficher ce texte brut (Importer pourra le relire). L'original
  n'est jamais perdu, même si la nouvelle partie remplace ensuite la sauvegarde principale.
- `sanitize()` : valider types, bornes (ères, vitesses, volumes), objets attendus, nombres finis ; fusion récursive
  avec les valeurs par défaut pour la compatibilité des anciennes sauvegardes.
- `serialize()` : remplacer `Infinity`/`NaN` (JSON écrit `null` → perte de progression). Plafonner les gains à
  `Number.MAX_VALUE`.
- Export = `PREFIXE:` + base64 UTF-8 (TextEncoder) ; boutons **Copier** (sélection forcée via
  `setSelectionRange`, `navigator.clipboard` si contexte sécurisé) et **Télécharger** (Blob → fichier .txt).
- Import **tolérant** : trouver le préfixe n'importe où (`/PREFIXE\s*[:：]/i`), prendre la suite de caractères
  base64/espaces qui le suit, retirer espaces, insécables et caractères invisibles (U+200B à U+200D, U+2060,
  U+FEFF), accepter base64url, re-compléter les `=`, puis retirer les mots de fin un par un tant que le JSON ne se
  décode pas (texte collé après) ; message clair en français si tronqué. Bouton **Charger un fichier**
  (`<input type=file accept=".txt">` + FileReader). Champs : `autocorrect=off autocapitalize=off spellcheck=false`.
- Au chargement : remettre le mode « Vendre » à « Acheter » (sinon un tap vend tout le stock), confirmer les
  ventes en lot.
- **App écran d'accueil = stockage séparé de Safari** ; supprimer l'icône efface la sauvegarde.

## 5. Erreurs JS
Afficher les vraies erreurs (utile : l'utilisateur envoie une capture), mais filtrer celles des scripts externes :
```js
addEventListener('error', e => {
  const msg = e.message || '';
  if (!e.lineno || /^script error\.?$/i.test(msg.trim())) return;   // extension Safari, etc.
  // erreur d'un autre fichier (webkit-masked-url://…) ; comparer SANS le « #… » (absent de e.filename)
  if (e.filename && e.filename.split('#')[0] !== location.href.split('#')[0]) return;
  showError(msg + ' (ligne ' + e.lineno + ')' + '\nVersion du ' + BUILD_ID);
});
```
Entourer aussi la boucle principale d'un try/catch qui affiche l'erreur. Une seule boîte d'erreur, fermable, avec
la **version** (`BUILD_ID`, ajouté par `scripts/build.js`) : sur sa capture, on voit s'il a la dernière version.

## 6. Son
```js
unlock() { this.init(); const c = this.ctx; if (!c) return;
  if (c.state === 'closed') { this.ctx = null; this.init(); return; }
  if (c.state !== 'running') { try { const p = c.resume(); if (p && p.catch) p.catch(() => {}); } catch (e) {} } }
// méthode de l'objet son (SFXK dans assets/starter/ios-kit.js : SFXK.installUnlock()) ; appelée sur pointerdown
// (capture), touchend, click, keydown et visibilitychange (retour au premier plan)
```
Sons synthétisés en WebAudio (aucun fichier), limiter la cadence des sons répétitifs.

## 7. Arrière-plan / hors-ligne
- `requestAnimationFrame` s'arrête en arrière-plan : mesurer l'écart avec `Date.now()` ; > 5 s = absence.
- Absence < 60 s (changement d'app, centre de notifications) : compter à 100 %.
- Les bonus temporaires **s'écoulent** pendant l'absence (ne pas les effacer), idem objets à l'écran.
- Avancer le temps de partie AVANT de recalculer les bonus liés au temps (sinon exploit « ×3 pendant 7 jours »).
- Pause de 1 à 5 s : rattraper la logique par pas de 0,5 s (ne pas plafonner à 1 s).
- Modale « Bon retour » mise en **file d'attente** si une autre modale est ouverte (ne jamais écraser un import
  en cours).

## 8. CSS compatible iOS 14
- Pas de `inset:` (iOS ≥ 14.5) → `top:0;right:0;bottom:0;left:0`.
- `gap` en flex aussi ≥ 14.5 (cosmétique seulement).
- `-webkit-user-select:text` explicite sur `input, textarea` (sinon le champ du code DEV peut refuser la saisie).
- `image-rendering:pixelated` sur canvas et images pixel art.

## 9. Icône de l'écran d'accueil
- Générer un PNG 180×180 **entièrement opaque** (iOS remplit la transparence en noir) depuis le pixel art du jeu
  (canvas → `toDataURL`, agrandissement entier sans lissage, fond dégradé + halo + l'objet emblématique). Montrer
  2-3 propositions. Le déposer dans `icons/apple-touch-icon.png` du projet : `build.js` l'intègre.
- Intégrée en data URI (`apple-touch-icon` + `icon`), c'est la source principale, propre à chaque jeu. iOS ne
  cherche `/apple-touch-icon.png` qu'à la racine du DOMAINE (`anthodupre.github.io/`), et seulement si la page ne
  déclare aucune icône : ses jeux étant des sites de projet (`…/LABO_INFINI/`), ce fichier ne servirait pas.
  (Une ancienne réponse lui a conseillé de mettre le PNG « à la racine du dépôt » : c'était inutile.) Si un jour
  l'icône intégrée n'apparaît pas, solution de secours : déposer le PNG dans le dossier du jeu et pointer
  `<link rel="apple-touch-icon" href="apple-touch-icon.png">` (adresse relative).
- Après la première installation, lui demander une capture de l'écran d'accueil pour vérifier l'icône et le nom.
- L'icône et le titre sont figés à l'installation → réinstaller pour les changer (exporter la sauvegarde avant).

## 10. Simuler l'iPhone dans Playwright
```js
const ctx = await browser.newContext({ viewport: { width: 393, height: 793 }, screen: { width: 393, height: 852 }, hasTouch: true, isMobile: true });
await ctx.addInitScript(() => Object.defineProperty(navigator, 'standalone', { get: () => true }));
// remplacer safeTop() dans la page pour simuler une barre transparente : page.evaluate(() => { safeTop = () => 59; ... })
```
Tester les 4 cas : navigateur, écran d'accueil + barre opaque, barre transparente avec le bug, barre transparente
sans bug. À chaque fois : hauteur du jeu ET une vraie tape (`page.touchscreen.tap`) sur un bouton du haut.
`scripts/iphone_taps.js` fait les 3 premiers cas d'un coup (tapes + glissement + captures).

Un **glissement de doigt** se simule via CDP (`page.touchscreen` n'a que `tap`) ; vérifié : la boutique de Labo
Infini défile :
```js
const cdp = await ctx.newCDPSession(page);
await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 200, y: 600 }] });
for (let i = 1; i <= 10; i++) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 200, y: 600 - i * 30 }] });
await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
```
Limites : `env(safe-area-inset-*)` vaut 0 dans Chromium (remplacer `safeTop` dans la page pour simuler une barre) ;
pas de vrai WebKit : ce qui dépend de Safari (coupure par un body fixe, clavier) reste à confirmer sur son iPhone.
