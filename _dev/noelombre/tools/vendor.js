#!/usr/bin/env node
// Régénère src/js/01_three.js (Three.js r170 + post-traitement) en script classique, lignes courtes (≤ 300 car.).
// Prérequis (une fois) : npm install three@0.170.0 esbuild@0.24.0 dans un dossier, puis
//   NODE_PATH=<ce dossier>/node_modules node _dev/noelombre/tools/vendor.js
'use strict';
const path = require('path'), fs = require('fs');
const esbuild = require('esbuild');
const root = path.join(__dirname, '..');
const r = esbuild.buildSync({ entryPoints: [path.join(root, 'vendor/entree.js')], bundle: true, format: 'iife', minify: true,
  lineLimit: 300, write: false, legalComments: 'none', target: 'safari14', nodePaths: (process.env.NODE_PATH || '').split(':') });
let code = r.outputFiles[0].text;
const head = '/* Three.js r170 (licence MIT, © 2010-2024 three.js authors) + EffectComposer, UnrealBloomPass, OutputPass, mergeGeometries.\n   Fichier GÉNÉRÉ par tools/vendor.js : ne pas modifier à la main. */\n';
fs.writeFileSync(path.join(root, 'src/js/01_three.js'), head + code);
console.log('01_three.js :', Math.round(code.length / 1024), 'Ko,', code.split('\n').length, 'lignes, plus longue', Math.max(...code.split('\n').map(l => l.length)));
