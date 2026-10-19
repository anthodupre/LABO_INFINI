#!/usr/bin/env node
// Assemble Labo Infini en un seul fichier HTML et le place directement dans labo/index.html (la page publiée sur
// anthodupre.github.io/GAMES/labo/). Une copie .txt identique est aussi écrite dans _dev/labo/dist/ (non publiée),
// au cas où il faudrait la lui envoyer pour un copier-coller.
// Utilise l'outil du skill jeux-web-github (polices et icône intégrées en lignes courtes, JS assemblé vérifié,
// version du jour, pièges iPhone signalés).
// Usage (depuis la racine du dépôt) : node _dev/labo/tools/build.js
'use strict';
const fs = require('fs'), path = require('path'), { spawnSync } = require('child_process');
const root = path.join(__dirname, '..'), repo = path.join(root, '..', '..'), dist = path.join(root, 'dist');
const skillBuild = path.join(repo, '.claude', 'skills', 'jeux-web-github', 'scripts', 'build.js');
const r = spawnSync(process.execPath, [skillBuild, root, '--out', dist, '--name', 'labo-infini', '--title', 'Labo Infini', '--theme', '#141020'], { stdio: 'inherit' });
if (r.status) process.exit(r.status);
fs.copyFileSync(path.join(dist, 'labo-infini.html'), path.join(repo, 'labo', 'index.html'));
console.log('   -> publié dans labo/index.html (après commit + push sur main)');
