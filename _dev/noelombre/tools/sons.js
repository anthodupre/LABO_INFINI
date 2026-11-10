#!/usr/bin/env node
// Intègre la musique enregistrée (audio/*.mp3, rendue par audio/src/tout.py) dans src/js/05_sons.js (base64, lignes courtes).
// Usage : node _dev/noelombre/tools/sons.js
'use strict';
const fs = require('fs'), path = require('path');
const dir = path.join(__dirname, '../audio'), noms = ['reveil', 'valse', 'neige', 'ombres', 'fete', 'manege', 'orgue', 'choeur'];
let js = '/* Musique enregistrée (pièces originales, instruments échantillonnés FluidR3_GM rendus par FluidSynth) — fichier GÉNÉRÉ\n   par tools/sons.js : ne pas modifier à la main. Décodée à la demande par 19b_musique.js. */\nconst SONS = {\n', total = 0;
for (const k of noms) {
  const f = path.join(dir, k + '.mp3'); if (!fs.existsSync(f)) { console.warn('manque', f); continue; }
  const b = fs.readFileSync(f).toString('base64'); total += b.length;
  js += '  ' + k + ': [\n' + b.match(/.{1,180}/g).map(l => "    '" + l + "',").join('\n') + '\n  ].join(\'\'),\n';
}
js += '};\n';
fs.writeFileSync(path.join(__dirname, '../src/js/05_sons.js'), js);
console.log('05_sons.js :', Math.round(total / 1024), 'Ko de base64,', js.split('\n').length, 'lignes');
