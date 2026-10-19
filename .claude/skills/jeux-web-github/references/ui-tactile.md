# Interface tactile : leçons valables pour tout jeu

Apprises sur Labo Infini (les exemples en viennent : fioles, boutique), mais elles valent pour n'importe quel
genre : dès qu'on touche un écran d'iPhone, ces problèmes reviennent.

## Messages à l'écran
- L'utilisateur clique sans arrêt : tout ce qui se ferme « au toucher » disparaît avant d'être lu.
  → TOUT élément posé sur la zone de jeu sans action propre (HUD, compteur, pastilles de bonus, jauges, toasts,
  bannières, textes d'effet) est en `pointer-events:none` et laisse passer les tapes (les pastilles de bonus
  avalaient les tapes sur la fiole pendant le ×777). Si on veut pouvoir le fermer : un petit bouton × de 40 px en
  `pointer-events:auto` dans un coin, jamais « toucher la bannière pour la fermer ».
- Durées : succès ~6,5 s, autres toasts ~5 s, gros texte d'effet ~4,5 s, bannière d'incident 12 s + 0,08 s par
  caractère au-delà de 80. Maximum 3 toasts empilés, en bas de l'écran.
- **Journal** (40 derniers messages, sauvegardé) consultable dans un onglet (Stats) : incidents, effets dorés,
  succès, ères, découvertes, défis réussis. Préserver sa position de défilement lors des rafraîchissements.
- Ne pas tronquer les textes drôles (pas de `line-clamp` sur les incidents).

## Éléments flottants cliquables (fioles dorées, pluie d'objets)
Au toucher, l'élément ne doit pas disparaître du DOM tout de suite, sinon le `click`/`pointerup` tombe sur le bouton
en dessous (achat fantôme) :
```js
el.addEventListener('pointerdown', ev => { ev.preventDefault(); ev.stopPropagation(); collect(); });
['pointerup','click','touchstart','touchend','mousedown','mouseup'].forEach(t => el.addEventListener(t, ev => { ev.preventDefault(); ev.stopPropagation(); }));
// collect(): blockTaps(450); el.classList.add('caught') (img opacity 0); setTimeout(() => el.remove(), 450);
// + écouteur 'click' en capture sur document qui annule les clics pendant le blocage, et pressable() qui ignore les tapes bloquées
```

## Boutons et listes
- `pressable(el, onTap, onLong, onHover)` (kit ; dans Labo Infini : `pressable(el, onTap, tipFn)`) :
  pointerdown/up, annulé si le doigt bouge > 12 px (défilement) ; appui long 430 ms → onLong (y afficher
  l'infobulle et la masquer après ~6 s : `setTimeout(hideTip, 6000)`) ; survol souris → onHover.
- Un bouton qui **ouvre une modale ou un panneau** (Options, Sauvegarder, Exporter…) : `onclick`, pas `pressable`.
  `pressable` agit au pointerup ; le `click` qui suit tomberait sur la modale qui vient de s'ouvrir (vérifié avec
  `scripts/iphone_taps.js`). `pressable` convient aux actions répétées sur un élément qui reste en place (acheter).
- Fermer l'infobulle sur un pointerdown ailleurs **sauf** sur la zone de clic principale.
- **Ne pas recréer** les boutons d'une grille quand la liste change (sinon une tape commencée sur l'ancien bouton
  est perdue) : garder une table id → bouton et `replaceChildren` dans le nouvel ordre.
- Réserver la hauteur des zones qui apparaissent (grille d'améliorations `min-height`, bouton « Tout acheter » en
  `visibility:hidden` plutôt que `display:none`) pour que la liste ne saute pas sous le doigt.
- Améliorations sur tactile : 1re tape = sélection (panneau de détail avec bouton Acheter), 2e tape = achat ;
  à la souris, un clic achète directement.
- Les prix et leur couleur (abordable/non) doivent être recalculés en continu (toutes les ~0,2 s) — un rendu figé
  laissait un prix rouge alors que le joueur avait assez. Invalider les caches quand on change de mode (vendre ↔ acheter).
- Panneaux de détail (nœuds de prestige, succès) en `position:sticky` une fois une sélection faite, sinon ils
  s'ouvrent hors écran.
- Cibles tactiles ≥ 44 px visées (recommandation Apple), jamais < 38 px. Dans Labo Infini : icônes du haut 44×40,
  quantités 38, « Tout acheter » 34 (encore trop petit).
- Confirmation pour les ventes en lot (×100 / Max).

## Modales
- Une seule modale à la fois. Toute modale déclenchée par le jeu (nouvelle ère, défi réussi ou échoué, bon retour)
  passe par une file : `modal(titre, html, boutons, true)` → `MODALQ`, rouverte par `closeModal()` (squelette :
  `assets/starter/src/js/10_jeu.js`). Le bilan hors ligne devient un toast si une modale est ouverte.
- Une modale ouverte par le joueur (Importer, Exporter, Publier, Réinitialiser) n'est JAMAIS remplacée : sur iPhone,
  il va copier son texte dans Notes, revient, et l'app déclenche « Bon retour » par-dessus (texte collé perdu).
- Fermeture par un bouton × de 44 px et par les boutons du bas ; jamais en touchant le fond (tapes répétées).

## Lisibilité
- Nombres : police à chiffres bien distincts et de largeur fixe (`font-variant-numeric:tabular-nums`, sinon le
  compteur « danse »). Avec une police pixel : Pixelify Sans confond 5/S et 8/B → nombres en VT323.
- Toujours une pile de secours derrière une police intégrée (`"MaPolice",ui-monospace,Menlo,monospace`) : les
  sous-ensembles « latin » n'ont souvent pas U+202F, ∞, ⚠, ★, ✦, ✿ ni ✔ (voir `textes-fr.md`).
- Compteur principal : passer au format court si le nombre long ne tient pas (noms longs type « quattuordécillion »).
- Petits écrans (≤ 420 px) et paysage peu haut (≤ 500 px) : règles dédiées (illustrations de modale réduites, bonus
  affichés en pastilles compactes sur une ligne).

## Jeux d'action, de plateforme, d'adresse (transposer les mêmes leçons)
Pas encore rencontrés en vrai : ce sont les leçons ci-dessus appliquées à ces genres, à vérifier en test.
- Zone de jeu (canvas) en `touch-action:none` et réaction au `pointerdown` ; les boutons de l'interface restent en
  `touch-action:manipulation`. Jamais de `preventDefault` sur `touchmove` au niveau du document.
- Commandes à l'écran (flèches, saut, tir) : plusieurs doigts en même temps → suivre chaque `pointerId`
  (`pointerdown`/`pointerup`/`pointercancel`, `setPointerCapture`), cibles ≥ 56 px, placées hors des bords où iOS
  capte les gestes (barre d'accueil en bas, bord gauche) et décalées des zones sûres (`--sb`, `--sl`, `--sr`).
- Pause automatique quand une modale s'ouvre (Options, DEV) et quand l'app passe en arrière-plan ; la coquille ne
  fait plus avancer `JEU.tick` pendant une modale.
- Canvas net : taille CSS × `devicePixelRatio` (exemple dans `assets/starter/src/js/10_jeu.js`) ; recalcul sur
  redimensionnement et rotation (`JEU.redimensionner`).
