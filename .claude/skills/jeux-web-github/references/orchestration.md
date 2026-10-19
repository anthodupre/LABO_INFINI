# Orchestration, tests et environnement

## Sous-agents de contenu
- Écrire chaque consigne dans un fichier (`briefs/S1.txt`…) puis lancer l'agent avec « Lis tes instructions dans … » :
  survit aux redémarrages du conteneur (qui tuent les tâches en arrière-plan) et se relance facilement.
- (Constaté en octobre 2026, à revérifier.) Sur ce conteneur (4 CPU), un **Workflow** n'exécute que **2 agents à la fois** ; pour 9 créateurs en parallèle,
  utiliser plutôt l'outil **Agent** en arrière-plan (un message, plusieurs appels). Garder le Workflow pour les revues
  avec contre-vérification.
- Un fichier par agent, une seule constante globale par fichier (`Object.assign(SPRITES, {...})` ou `const TXT_X`),
  comptes exacts imposés et vérifiés par script, schéma précis dans la consigne (ids fixes).
- Artistes (si le jeu est en pixel art, voir `pixel-art.md`) : génération possible par script puis retouche ; validation OBLIGATOIRE avec `scripts/sprite_preview.js`
  et lecture du PNG ; « directeur artistique » en option. Les sprites de bâtiments 16×16 (2 images), grands objets
  48×48 avec `~` (liquide animé par le moteur) et `+` (lumières teintées), particules 4-8 px.
- Auteurs : effets chiffrés écrits par le moteur, jamais dans les textes ; placeholders documentés ({labo}, {nb:id}).
- Pendant que les agents travaillent, l'agent principal écrit le moteur avec des textes de secours
  (`TX(() => TXT_X, fallback)`) pour que le jeu tourne même si un fichier manque.

## Revue finale
Workflow « pipeline » : 5 relecteurs (bugs de logique, UX mobile avec captures, français, équilibrage avec
simulations, robustesse iOS/performance) → chacun suivi d'un contre-expert sceptique. 69 constats confirmés (≈ 57 problèmes distincts : plusieurs relecteurs ont trouvé les
mêmes) sur Labo Infini ; les relecteurs écrivent des scripts de reproduction dans `preview/`. Appliquer les correctifs par
groupe, reconstruire et retester après chaque groupe.

## Tests (Playwright est installé globalement : `NODE_PATH=$(npm root -g) node …`)
- `smoke` : chargement, clics, achats, onglets, captures, 0 erreur JS.
- `e2e` (36 vérifications sur Labo Infini) : clic, Eurêka, achats ×10/Max, vente, sauvegarde/rechargement,
  export/import, hors-ligne, objets dorés (vraie tape), incidents, mini-jeu, code BURGER, toutes les ères, prestige,
  défis (réussite/échec/limites), dispositions large/paysage, réinitialisation.
- `gallery` : capture de la scène pour chaque ère (état propre, sans incidents ni toasts).
- Scénarios ciblés quand l'utilisateur signale un bug : reproduire d'abord (ex. fiole posée sur un bouton puis
  vraie tape ; prix Petri qui doit passer au vert ; import de 7 variantes de texte collé).
- `scripts/iphone_taps.js` : vraies tapes + glissement de doigt (CDP) en Safari portrait, écran d'accueil portrait et
  paysage ; dit quel élément a avalé une tape. `--prep="closeModal()"` si une modale d'accueil s'ouvre au départ.
- Limites : pas de vrai iPhone ni de WebKit ; glissement de doigt uniquement via CDP (`page.touchscreen` n'a que
  `tap`) ; `env(safe-area-inset-*)` vaut 0 dans Chromium (le remplacer dans la page pour simuler).

## Git et livraison
- Commit + push dans le dépôt du jeu après chaque étape (le conteneur peut redémarrer à tout moment) ; `main` = site publié.
- Ne jamais parler de noms de branches à l'utilisateur.
- Construire, tester, puis envoyer le `.txt` (jamais le .html, jamais l'outil Artifact) avec l'outil d'envoi de
  fichiers et un message court en français (modèle dans SKILL.md §2).
- Pousser dans le dépôt d'un jeu (ex. `anthodupre/LABO_INFINI`) : accord déjà donné pour Labo Infini (voir SKILL.md §2).
