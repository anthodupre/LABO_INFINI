# Bouton DEV et code BURGER (dans TOUS ses jeux)

Sa demande, mot pour mot : « Always add a DEV button in the settings, and when you enter BURGER as a code you can go
god mode for testing (no dying, infinite money, depends on the game) ». C'est un outil de TEST pour lui : il doit
pouvoir voir tout le jeu vite, sans tricher par accident dans une vraie partie.

## Recette éprouvée (déjà dans la coquille `assets/starter/src/js/08_coquille.js`)
- Bouton **DEV** dans les Options → champ du code avec `autocomplete="off" autocorrect="off"
  autocapitalize="characters" spellcheck="false"`, police ≥ 16 px (sinon iOS zoome), `-webkit-user-select:text`
  (sinon le champ peut refuser la saisie quand le reste de la page est en `user-select:none`), bouton OK + Entrée.
- Test : `valeur.trim().toUpperCase() === 'BURGER'` (le clavier iPhone met une majuscule et parfois une espace).
- Bon code : toast « BURGER ACCEPTÉ — MODE DIEU ACTIVÉ », badge **MODE DIEU** visible en permanence, panneau DEV.
  Mauvais code : « ACCÈS REFUSÉ » et le champ se vide. Le déverrouillage et l'état du mode Dieu sont sauvegardés.
- Panneau DEV : Mode Dieu ON/OFF, vitesse ×1/×10/×100, puis les actions propres au jeu (`JEU.dev`), « Tout effacer ».

## Que fait le mode Dieu ? (selon le jeu — l'écrire dans `JEU.modeDieu`)
- Jeu d'argent / de gestion / clicker : argent infini, tout achetable.
- Action, plateforme, tir, survie : aucun dégât, pas de mort (chute = retour au dernier sol), munitions infinies.
- Puzzle, réflexion : passer le niveau, montrer la solution, tous les niveaux débloqués.
- Aventure, histoire : tous les chapitres débloqués, choix sans conséquence mortelle, objets clés donnés.
- Course, sport : pas de chrono perdant, adversaires ralentis.
Actions DEV utiles à ajouter : niveau/chapitre/étape suivant, +1 h / +1 jour de progression (jeux avec temps),
déclencher chaque événement rare, débloquer tout, revenir au début d'une étape.

## Pièges (vécus sur Labo Infini)
- Faire passer TOUT ce qui coûte ou blesse par une seule fonction : `canAfford(c) { return god() || argent >= c; }`,
  `spend(c) { if (!god()) argent -= c; }`, `degats(n) { if (god()) return; … }` — utilisées partout (boutique, arbre,
  mini-jeux, pièges). L'affichage « abordable » suit, sinon des objets gratuits restent grisés.
- Afficher « ∞ », mais ne jamais mettre `Infinity` dans l'état : une vente remboursait un coût infini → NaN →
  `null` dans la sauvegarde → toute la progression perdue. Plafonner les gains à `Number.MAX_VALUE`.
- Exclure le mode Dieu des succès difficiles (`&& !god()`).
