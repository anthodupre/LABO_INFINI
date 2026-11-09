# Dépôt LABO_INFINI — le jeu Noëlombre (GitHub Pages)

Lire et suivre le skill `.claude/skills/jeux-web-github/` (préférences de l'utilisateur, publication, tous les bugs
déjà réglés sur iPhone) avant toute modification.

- `index.html` = jeu publié sur https://anthodupre.github.io/LABO_INFINI/ (un push sur `main` publie).
  Depuis novembre 2026, c'est **Noëlombre** (ville de Noël nocturne en 3D, infinie) : à sa demande, il a REMPLACÉ
  Labo Infini. Les sources de Labo Infini restent dans `_dev/labo/` (archives, plus publiées).
- `_dev/noelombre/` = sources et outils de Noëlombre (non publiés sur le site, mais visibles : le dépôt est public).
  Fiche : `.claude/skills/jeux-web-github/references/noelombre.md`.
- Reconstruire : `node _dev/noelombre/tools/build.js` (écrit `index.html`) ;
  tests : `NODE_PATH=$(npm root -g) node _dev/noelombre/tools/e2e.js`.
- Répondre en français simple, sans jargon ni noms de branches.
