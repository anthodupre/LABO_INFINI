---
name: jeux-web-github
description: Préférences de l'utilisateur et correctifs déjà éprouvés pour TOUT jeu ou petite app web qu'il demande, quel que soit le genre ou le style (arcade, plateforme, puzzle, quiz, cartes, aventure, clicker…), livré en un seul fichier HTML publié sur son GitHub Pages et joué sur iPhone depuis l'écran d'accueil. Contient comment lui livrer le code (texte .txt, jamais d'artefact), ses exigences (prendre son temps et tester, bouton de sauvegarde, bouton DEV + code BURGER = mode Dieu), comment lui parler, où il publie, une coquille de départ testée, et tous les bugs déjà réglés avec leur solution (bande vide en bas, boutons qui ne répondent plus, achats fantômes, messages illisibles, sauvegarde et import, fichier illisible, Script error…). Utiliser dès qu'il demande un jeu ou une app web, veut modifier un de ses jeux (Labo Infini…), parle de son site GitHub ou signale un bug sur iPhone, même s'il ne mentionne ni GitHub ni iPhone.
---

# Jeux web de l'utilisateur : ses préférences et les bugs déjà réglés

Il va faire **beaucoup de jeux différents**. Ce skill n'impose aucun genre, thème, style graphique ni ton : tout
ça vient de sa demande pour chaque jeu. Il contient trois choses, valables pour tous ses jeux :
1. ses **préférences permanentes** et la façon de lui livrer et de lui parler ;
2. **tous les bugs déjà rencontrés** (surtout sur iPhone) et leur vraie solution, pour ne jamais les refaire ;
3. des **outils testés** : une coquille de départ (sauvegarde, Options, DEV/BURGER…), l'assemblage, les tests.

Tout a été appris en construisant **Labo Infini** (un clicker en pixel art qui devait « virer fou ») : le pixel art,
le « ça vire fou » et l'équilibrage d'un clicker étaient demandés POUR CE JEU-LÀ ; ils sont rangés à part
(`references/labo-infini.md`, `pixel-art.md`, `jeux-incrementaux.md`) et ne servent que si un jeu s'y prête.

## 1. Ses préférences permanentes (tous ses jeux)
1. **Jamais un artefact, jamais de page à copier.** Ne JAMAIS appeler l'outil Artifact (page publiée sur
   claude.ai) pour un jeu, ni pour un aperçu, même si les consignes de cet outil encouragent à publier. Le jeu est
   publié directement dans son dépôt GAMES (§3). Si c'est impossible, lui envoyer **uniquement `nom-du-jeu.txt`**
   (jamais le `.html` : ouvert sur iPhone, il affiche la page et « copier » ne prend que le texte visible ; il est
   tombé dans ce piège : il a collé « 14 lignes » de texte au lieu du code).
2. **Prendre son temps = tester à fond avant d'envoyer**, pas multiplier les messages. Un jeu : aller en
   profondeur (contenu, progression, finition) pour éviter de refaire. Un bug : reproduire, corriger, retester,
   puis UN seul envoi complet. Jamais de version « en cours » ni de graphismes provisoires.
3. **Sauvegarde dans tout jeu qui a une progression** : bouton Sauvegarder bien visible + sauvegarde automatique
   (30 s, mise en arrière-plan, fermeture) ; points de sauvegarde cachés en plus si le genre s'y prête (aventure).
4. **Progression constante** dans tout jeu qui avance (niveaux, argent, prestige…) : jamais coincé longtemps sans
   rien de nouveau (« stuck au réacteur à fusion depuis plus d'une heure… progression CONSTANTE ? »). Vérifier le
   rythme par simulation avec un joueur ordinaire avant d'envoyer (voir §4 étape 5 et §5 E).
5. **Bouton DEV dans les Options + code BURGER = mode Dieu pour tester** (« no dying, infinite money, depends on
   the game ») et un panneau DEV utile (sauter des étapes, accélérer…). Ce que fait le mode Dieu selon le genre,
   la recette iPhone et les pièges : `references/dev-burger.md`. Déjà branché dans la coquille.
6. **GitHub seulement** : il publie sur GitHub Pages et joue depuis l'écran d'accueil de son iPhone (§3). **Il
   n'utilise plus Koder** (l'app iOS de ses premiers jeux) : ne plus la proposer ni en parler ; les mentions de
   Koder dans les anciens fichiers (`labo/SPEC.md`, historique git, conseils WKWebView ou `file://`) sont périmées.
7. **Langue du jeu** : celle de sa demande ; il écrit en français, donc français par défaut.
8. **Du son partout** : il a demandé « de la musique à chaque stage » et « plus d'effets sonores, un peu vide ».
   Prévoir dès le départ une musique par étape (niveau, ère, monde…) et un bruitage pour chaque action et chaque
   événement, synthétisés en WebAudio (aucun fichier). Musique et bruitages réglables SÉPARÉMENT dans les Options.
   Modèle éprouvé : `_dev/labo/src/js/27_musique.js` (séquenceur avec planification en avance, fondu entre étapes,
   coupure en arrière-plan) et `25_audio.js` (bruitages ; clic qui change selon l'étape et monte en combo).

## 2. Lui parler
- Français **québécois** : « tantôt », « tannant », « pèse » (= appuie). Répondre simplement, chaleureusement, en
  le tutoyant, sans jargon (pas de « branche », « commit SHA », « viewport », « data URI » sans explication).
- **Ne jamais mentionner de noms de branches ni de dépôts internes** : un nom de branche hérité
  (« claude/… ») l'a beaucoup dérouté (« arrête de l'utiliser, je comprends pas c'est quoi »).
  Parler de « ton fichier », « ton site », « ton dépôt GAMES ».
- Il signale les bugs par **captures d'écran** et phrases courtes, et veut qu'un bug réglé le reste
  (« corrige ça définitivement s'il vous plaît »). Si un bug « revient », lui demander d'abord une
  capture de Options › À propos : la version affichée dit s'il a bien la dernière (cache ≈ 10 min).
- Quand il pose une question pendant un long travail (« Que fais-tu ? »), répondre en 2-3 phrases simples.
- **Nouveau jeu** : ne pas redemander ce qui est connu (livraison .txt, Sauvegarder, DEV/BURGER, iPhone + écran
  d'accueil, test à fond). Si le genre ou le thème manque, proposer 2 ou 3 idées concrètes (une phrase chacune).
  Seule question pratique : le nom du jeu (dossier, adresse et nom sous l'icône). Ne rien supposer d'autre : style
  graphique, ton, durée, difficulté viennent de sa demande ; s'ils manquent et comptent vraiment, demander une fois.

## 3. Publication (GitHub seulement) — tout se passe dans le dépôt GAMES
- **Un seul dépôt : `anthodupre/GAMES`** (public, branche `main`, GitHub Pages). Il a demandé de travailler
  directement dedans (« ajoute GAMES ici et oublie fantastic-robot ») : ne plus utiliser d'autre dépôt.
  Organisation :
  - `<jeu>/index.html` = le jeu publié → `https://anthodupre.github.io/GAMES/<jeu>/` (Labo Infini : `labo/`) ;
  - `_dev/<jeu>/` = sources, outils, tests (Labo Infini : `_dev/labo/`) ; `.claude/` = ce skill et les consignes. Les dossiers qui commencent par `_` ou `.`
    ne sont **pas publiés** sur le site (Jekyll les ignore ; pas de `.nojekyll` : ne pas en ajouter), mais ils sont
    **visibles sur GitHub** (dépôt public) : n'y mettre rien de privé ;
  - `.gitignore` exclut `_dev/**/dist/` et `_dev/**/preview/` (captures, copies .txt).
- **Publier = commit + push sur `main`.** Il l'a accepté (« oui ») : construire, tester, puis pousser ; lui dire
  ensuite d'attendre 1-2 min, de fermer complètement l'app (glisser vers le haut) et de la rouvrir ; si l'ancienne
  version s'affiche encore, attendre jusqu'à ~10 min (cache de GitHub Pages). Options › À propos doit montrer la
  nouvelle version. Vérifier la publication avec l'outil GitHub (exécutions « pages build and deployment »).
  Avant de pousser depuis un clone superficiel : `git fetch origin main` (sinon refus « 413 »).
- **Si la session n'a pas l'accès en écriture** (refus au push) : lui envoyer le `.txt` (copie identique dans
  `_dev/<jeu>/dist/`) avec la procédure : ouvrir le .txt → Tout sélectionner → Copier → sur GitHub, ouvrir
  `GAMES/<jeu>/index.html` → crayon → tout sélectionner → coller → Commit changes. Pour rétablir l'accès : outil
  `add_repo` (owner `anthodupre`, repo `GAMES`, access `push`), ou reconnecter GitHub sur claude.ai/connect-github.
- **Nouveau jeu = nouveau dossier** `<nom-du-jeu>/index.html` (+ sources dans `_dev/<nom-du-jeu>/`), jamais dans
  le dossier d'un autre jeu (son icône ouvrirait le nouveau jeu). Adresse : `https://anthodupre.github.io/GAMES/<nom-du-jeu>/`.
  Installation à lui expliquer : ouvrir l'adresse dans **Safari** → bouton Partager → « Sur l'écran d'accueil ».
- L'app de l'écran d'accueil **se met à jour seule** ; seuls l'icône et le nom sous l'icône exigent une
  réinstallation. **Supprimer l'icône efface la sauvegarde de l'app** (stockage séparé de Safari) : toujours faire
  Options › Exporter › Télécharger avant, puis Importer › Charger un fichier après.

### Modèle de message de livraison (court, tutoiement, sans jargon)
> C'est en ligne : **<Jeu>** (version du <date et heure affichées par build.js>).
> **Ce qui change :** • … • …
> **Pour l'avoir :** attends 2 minutes, ferme complètement l'app (glisse-la vers le haut) et rouvre-la. Dans
> Options › À propos, tu dois voir « version du … » (si c'est encore l'ancienne, réessaie dans quelques minutes).

Dire aussi ce qui n'a pas pu être vérifié (« je ne peux pas l'essayer sur un vrai iPhone »).

## 4. Méthode qui marche (n'importe quel jeu)
1. **Comprendre sa demande** et, pour un gros jeu, écrire une spécification courte (`SPEC.md`).
2. **Partir de la coquille** : `node <skill>/scripts/nouveau_jeu.js <projet> --title "Nom du jeu"` (ajouter
   `--pixel` seulement pour un jeu en pixel art). Elle contient sauvegarde, Options, export/import, DEV/BURGER,
   messages, modales, hauteur iPhone, tapes fiables et version affichée ; on écrit le jeu dans `src/js/10_jeu.js`
   (objet `JEU`, contrat en tête du fichier) sans toucher à `02_kit.js`, `08_coquille.js`, `99_main.js`.
3. **Assembler** : `node <skill>/scripts/build.js <projet> --title "Nom du jeu"` → `dist/nom-du-jeu.html` + `.txt`
   (un seul fichier, polices et icône intégrées, lignes courtes, JS assemblé vérifié, version du jour, pièges
   iPhone signalés).
4. **Gros contenu en parallèle** (graphismes, textes, niveaux) : sous-agents, un fichier chacun, avec des consignes
   écrites dans des fichiers. Voir `references/orchestration.md`.
5. **Tester** (Playwright + Chromium installés) : test de fumée, tests de bout en bout du jeu, `scripts/iphone_taps.js`
   (vraies tapes en Safari ET écran d'accueil, portrait et paysage), captures REGARDÉES, et **simulation du rythme**
   dès que le jeu a une progression : avec un joueur automatique « occasionnel » (pas seulement optimal), mesurer la
   plus longue attente sans nouveauté. Il veut une progression constante.
6. **Revue adversariale AVANT le tout premier envoi** : plusieurs relecteurs (bugs, iPhone/tactile, textes,
   équilibrage) puis contre-vérification. Sur Labo Infini, elle n'a été faite qu'après 7 allers-retours de bugs
   signalés par lui, et elle a trouvé 69 constats confirmés (≈ 57 problèmes distincts) des mêmes familles.
7. Commit réguliers dans GAMES (le conteneur peut redémarrer à tout moment). Un push sur `main` publie le site :
   pousser les sources en cours ne touche pas aux jeux publiés tant que `<jeu>/index.html` n'est pas reconstruit.

## 5. Bugs déjà réglés : symptôme → cause → solution (détails et code dans `references/`)

### A. App iPhone (écran d'accueil) — `references/ios-webapp.md`
| Symptôme qu'il a rapporté | Cause | Solution |
|---|---|---|
| « Le bas n'est pas utilisé en entier », bande vide en bas | Barre d'état `black-translucent` : la page est plus courte que l'écran de la hauteur de la barre | `apple-mobile-web-app-status-bar-style` = `black` (opaque) ; filet `fixStandaloneHeight` du kit |
| La bande revient après un correctif | `body{position:fixed}` (cause probable : WebKit coupe alors le jeu étiré au-delà du body) | Ne jamais mettre `body` en position fixe |
| « Aucun bouton marche, sauf la fiole » | Remise en place du défilement EN BOUCLE (`setInterval(scrollTo)`, écouteur `scroll`) + `touchmove` bloqué sur document (même avec des exceptions) : chaque tape devient « arrêt du défilement » | Un seul `scrollTo(0,0)` après `focusout` (clavier fermé). Rien d'autre |
| « Parfois impossible de cliquer Sauvegarde ou Options » | Page restée décalée après le clavier | idem (focusout) |
| « Le dessus de la page est flou » | Barre d'état translucide par-dessus le haut du jeu | Barre opaque + `padding-top: calc(4px + env(safe-area-inset-top))` |
| Mise en page cassée sur iOS 14.0-14.4 | Propriété CSS `inset` | `top/right/bottom/left` |
| Son coupé après un appel ou Siri | AudioContext `interrupted` | `resume()` dès que `state !== 'running'` (kit : `SFXK`) |
| Icône ou nom sous l'icône qui ne change pas | Figés à l'installation | Réinstaller (exporter la sauvegarde avant) |

### B. Toucher l'écran — `references/ui-tactile.md`
| Symptôme | Cause | Solution |
|---|---|---|
| « Appuyer sur une fiole dorée peut faire acheter quelque chose » | L'objet flottant disparaît au `pointerdown`, le `click` tombe sur le bouton dessous | Garder l'objet (invisible) 450 ms, avaler pointerup/click, bloquer les tapes 450 ms (kit : `makeCatchable`) |
| Un bouton qui ouvre une fenêtre touche aussi la fenêtre | Action au `pointerup` : le `click` qui suit tombe sur la modale qui vient de s'ouvrir | Boutons qui ouvrent une modale : `onclick` ; `pressable` pour les actions répétées sur place |
| « Les messages disparaissent immédiatement vu que je pèse » | Messages qui se ferment au toucher | `pointer-events:none`, 5 à ~17 s selon la longueur, **journal** relisible |
| Tape perdue sur un bouton d'une liste | Bouton recréé (innerHTML) sous le doigt | Créer une fois, puis mettre à jour |
| « L'affichage du nombre de molécules flicker / glitch » | Zéros de fin retirés (« 1,5 » ↔ « 1,512 ») : la largeur du compteur centré change à chaque image ; format long/court choisi selon la longueur du moment | Compteur principal en décimales FIXES (« 1,500 milliard »), chiffres à largeur fixe, format choisi selon l'ordre de grandeur |
| « Le prix reste rouge même quand j'ai assez » | Affichage figé / cache périmé | Recalculer prix et couleurs en continu |
| Page blanche, jeu figé | Même constante globale dans deux fichiers (un seul `<script>`) | `build.js` compile le JS assemblé et refuse de construire |

### C. Sauvegarde — `references/ios-webapp.md` §4
| Symptôme | Cause | Solution |
|---|---|---|
| Import : « The string contains invalid characters » | iOS ajoute retours ligne, caractères invisibles, texte autour au copier-coller | Import tolérant (`kitParseExport`) + export en **fichier** (Télécharger / Charger un fichier) |
| Sauvegarde perdue en réinstallant l'app | App de l'écran d'accueil = stockage séparé | Exporter avant, importer après (le lui rappeler) |
| Progression perdue (risque trouvé en revue) | `Infinity`/`NaN` → `null` dans la sauvegarde ; copie de secours écrasée par une sauvegarde abîmée | `safeStringify`, gains plafonnés, copie de secours seulement si lisible (kit) |
| Deux jeux qui s'écrasent leurs parties | Même site = même stockage | Identifiant unique par jeu (`JEU.id` → `kitConfig`) |

### D. Livraison du fichier
| Symptôme | Cause | Solution |
|---|---|---|
| « Les docs sont genre 12 lignes » | Polices en base64 sur une ligne de 24 000 caractères | `build.js` découpe en lignes courtes (avertit au-delà de 500) |
| Il a collé « 14 lignes » de texte au lieu du code | Il avait ouvert le .html (la page s'affiche) | Envoyer seulement le .txt |
| « Erreur : Script error. » | Erreur d'une extension Safari, détails masqués | Ignorer les erreurs sans `lineno`, `Script error.` et celles d'un autre fichier (kit) |
| « Le bug revient » alors qu'il est corrigé | Ancienne version en cache (≈ 10 min) | Version affichée dans Options › À propos et dans la boîte d'erreur |

### E. Selon le genre du jeu (seulement si ça s'applique)
- Clicker / idle / tout jeu à progression : « stuck au réacteur à fusion depuis plus d'une heure » → il veut une
  progression CONSTANTE (jamais de longue attente sans nouveauté) : courbe trop raide (chaque étape ~1,8× plus
  longue) → rentabilité ×1,45 par étape, prestige utile dès la 1re fois, conseil de publier, et MESURE par
  simulation avec plusieurs profils de joueur. Aussi : clic devenu inutile (« +4 c'est rien » → clic = % de la
  production), emballement → `references/jeux-incrementaux.md`.
- Pixel art : personnages qui « buggent, flicker, se dédoublent » → places fixes, animation lente, rangée du fond
  opaque → `references/pixel-art.md`.
- Textes générés en français (« 1 million de », accords, typographie) → `references/textes-fr.md`.

## 6. Avant chaque envoi (checklist)
- [ ] `node <skill>/scripts/build.js <projet> --title "<Nom du jeu>"` : 0 erreur, 0 « PIÈGE », aucune ligne > 500
      caractères (il compile le JS ASSEMBLÉ : `node --check` fichier par fichier ne voit pas les doublons).
- [ ] Tests Playwright du jeu (fumée + bout en bout) : 0 erreur JS.
- [ ] `NODE_PATH=$(npm root -g) node <skill>/scripts/iphone_taps.js <projet>/dist/<nom>.html "#btnSave" "#btnOpts"
      "<zone de jeu>" "<autres boutons>" [--swipe=<liste>] [--prep="…"] [--apres="closeModal()"]` : toutes les tapes
      arrivent en Safari portrait, écran d'accueil portrait et paysage ; regarder les captures.
- [ ] Sauvegarder, recharger, exporter, importer, BURGER : testés (la coquille le fait ; vérifier ce que le jeu ajoute).
- [ ] Aucun texte cassé ou dans la mauvaise langue ; accords (voir `references/textes-fr.md`).
- [ ] La version du jour s'affiche dans Options › À propos.
- [ ] Le .txt commence par `<!DOCTYPE html>` ; c'est LUI qu'on envoie (pas le .html, pas d'artefact).
- [ ] Message : ce qui change, en français simple, + procédure de mise à jour avec la version attendue (§3).

## 7. Ses jeux existants
- **Labo Infini** (clicker de laboratoire en pixel art) : `labo/index.html`, sources dans `_dev/labo/`
  (construire : `node _dev/labo/tools/build.js`).
  Fiche : `references/labo-infini.md` (architecture, construction, tests, ce qu'il avait demandé pour ce jeu).
- HADAL (ancien jeu d'horreur) : effacé à sa demande ; ne plus en parler.

## Fichiers du skill (`<skill>` = ce dossier)
- `references/ios-webapp.md` — correctifs iPhone / GitHub Pages / sauvegarde avec le code éprouvé.
- `references/ui-tactile.md` — toucher, messages, modales, lisibilité ; transposition aux jeux d'action.
- `references/dev-burger.md` — bouton DEV, code BURGER, que doit faire le mode Dieu selon le genre, pièges.
- `references/textes-fr.md` — textes français générés par le code (nombres, accords, typographie).
- `references/orchestration.md` — sous-agents, revues, tests Playwright, limites de l'environnement.
- `references/labo-infini.md`, `jeux-incrementaux.md`, `pixel-art.md` — seulement pour Labo Infini ou un jeu de ce
  genre / de ce style.
- `scripts/nouveau_jeu.js` — crée un projet à partir de la coquille (`--pixel` en option).
- `scripts/build.js` — assemble `src/` en un seul `.html` + `.txt` (vérifications comprises).
- `scripts/iphone_taps.js` — vraies tapes et glissements « iPhone » (Safari, écran d'accueil, paysage).
- `scripts/sprite_preview.js` — pixel art seulement : valide les sprites texte et produit une planche PNG.
- `assets/starter/` — coquille (`src/`) et `ios-kit.js` (sauvegarde, import tolérant, hauteur iPhone, tapes, son,
  nombres français) ; `assets/pixel/` — palette, rendu de sprites, exemples et polices (option `--pixel`).

Emplacement : `.claude/skills/jeux-web-github/` du dépôt GAMES (chargé automatiquement dans ce dépôt). Pour
l'avoir partout dans l'app Claude, il peut importer le fichier `jeux-web-github.skill` dans ses réglages.
