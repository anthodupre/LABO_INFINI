#!/usr/bin/env node
// Intègre les textures photographiques (photos/*.jpg, Poly Haven, CC0) dans src/js/04_photos.js (base64, lignes courtes).
// Usage : node _dev/noelombre/tools/photos.js
'use strict';
const fs = require('fs'), path = require('path');
const dir = path.join(__dirname, '../photos'), noms = ['neige', 'pave', 'platre', 'brique', 'tuiles', 'planche', 'ecorce', 'moellon'];
let js = '/* Textures photographiques (Poly Haven, licence CC0) — fichier GÉNÉRÉ par tools/photos.js : ne pas modifier à la main.\n' +
  '   Elles remplacent les textures peintes dès qu\'elles sont décodées (MAT.photo) ; le jeu démarre sans les attendre. */\nconst PHOTOS = {\n  d: {\n';
let total = 0;
for (const k of noms) for (const s of ['d', 'n']) {
  const f = path.join(dir, k + '_' + s + '.jpg'); if (!fs.existsSync(f)) continue;
  const b = fs.readFileSync(f).toString('base64'); total += b.length;
  js += '    ' + k + '_' + s + ': [\n' + b.match(/.{1,180}/g).map(l => "      '" + l + "',").join('\n') + '\n    ].join(\'\'),\n';
}
{ const f = path.join(dir, 'lune.jpg'); if (fs.existsSync(f)) { const b = fs.readFileSync(f).toString('base64'); total += b.length; js += '    lune: [\n' + b.match(/.{1,180}/g).map(l => "      '" + l + "',").join('\n') + '\n    ].join(\'\'),\n'; } }
js += `  },
  charger() {
    if (PHOTOS.d.lune) { const im = new Image(); im.onload = () => { const t = new THREE.Texture(im); t.colorSpace = THREE.SRGBColorSpace; t.needsUpdate = true; try { CIEL.lune(t); } catch (e) { } delete PHOTOS.d.lune; }; im.src = 'data:image/jpeg;base64,' + PHOTOS.d.lune; }
    for (const k of ${JSON.stringify(noms)}) {
      const o = {}; let reste = 2;
      const fini = () => { if (--reste === 0) { try { MAT.photo(k, o.d, o.n); } catch (e) { } } };
      for (const s of ['d', 'n']) {
        const b = PHOTOS.d[k + '_' + s]; if (!b) { fini(); continue; }
        const img = new Image();
        img.onload = () => {
          const t = new THREE.Texture(img); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 4;
          t.colorSpace = s === 'd' ? THREE.SRGBColorSpace : THREE.NoColorSpace; t.needsUpdate = true; o[s] = t;
          delete PHOTOS.d[k + '_' + s]; fini();
        };
        img.onerror = fini; img.src = 'data:image/jpeg;base64,' + b;
      }
    }
  },
};
`;
fs.writeFileSync(path.join(__dirname, '../src/js/04_photos.js'), js);
console.log('04_photos.js :', Math.round(total / 1024), 'Ko de base64,', js.split('\n').length, 'lignes');
