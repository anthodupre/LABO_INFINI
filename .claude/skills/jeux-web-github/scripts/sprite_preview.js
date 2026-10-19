#!/usr/bin/env node
// Validation + aperçu PNG des sprites.
// Usage : node sprite_preview.js out.png sprites.js [autres fichiers...] [--scale=4] [--only=prefix] [--cols=N] [--palette=palette.js]
// - Charge la palette (par défaut assets/pixel/palette.js du skill) puis les fichiers donnés dans un contexte isolé.
// - Ensuite : OUVRIR le PNG (outil Read) et regarder vraiment chaque sprite ; retoucher 2-3 fois.
// - Vérifie chaque sprite (largeur/hauteur, caractères de palette).
// - Écrit une planche PNG (fond damier) et liste l'ordre des sprites sur stdout.
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), zlib = require('zlib');

const args = process.argv.slice(2);
const out = args.find(a => a.endsWith('.png'));
let scale = 4, only = null, cols = 0, palette = path.join(__dirname, '..', 'assets', 'pixel', 'palette.js');
const files = [];
for (const a of args) {
  if (a.startsWith('--scale=')) scale = +a.slice(8);
  else if (a.startsWith('--only=')) only = a.slice(7);
  else if (a.startsWith('--cols=')) cols = +a.slice(7);
  else if (a.startsWith('--palette=')) palette = path.resolve(a.slice(10));
  else if (!a.endsWith('.png')) files.push(a);
}
if (!out || !files.length) { console.error('usage : node sprite_preview.js sortie.png sprites.js [autres.js…] [--scale=4] [--only=prefixe] [--cols=N] [--palette=palette.js]'); process.exit(1); }

const ctx = {};
vm.createContext(ctx);
const load = f => vm.runInContext(fs.readFileSync(f, 'utf8') + '\n;this.PAL=PAL;this.SPRITES=SPRITES;', ctx, { filename: f });
load(palette);
for (const f of files) load(f);
const PAL = ctx.PAL, SPRITES = ctx.SPRITES;

function hexToRgba(c) {
  if (c.startsWith('#')) return [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16), 255];
  const m = c.match(/rgba\((\d+),(\d+),(\d+),([\d.]+)\)/);
  return [+m[1], +m[2], +m[3], Math.round(+m[4] * 255)];
}
const COL = {};
for (const k in PAL) COL[k] = hexToRgba(PAL[k]);
COL['~'] = [80, 170, 255, 200]; // liquide (aperçu)
COL['+'] = [255, 0, 255, 255];  // accent (aperçu)

// Validation
let errors = 0;
const names = Object.keys(SPRITES).filter(n => !only || n.startsWith(only));
for (const n of names) {
  const s = SPRITES[n];
  if (!s || typeof s.w !== 'number' || typeof s.h !== 'number' || !Array.isArray(s.frames) || !s.frames.length) { console.log('ERREUR ' + n + ': structure invalide'); errors++; continue; }
  s.frames.forEach((fr, fi) => {
    if (!Array.isArray(fr)) { console.log(`ERREUR ${n}[${fi}]: une frame doit être un tableau de lignes (["..", ".."]), pas ${typeof fr}`); errors++; return; }
    if (fr.length !== s.h) { console.log(`ERREUR ${n}[${fi}]: ${fr.length} lignes au lieu de ${s.h}`); errors++; }
    fr.forEach((row, ri) => {
      if (row.length !== s.w) { console.log(`ERREUR ${n}[${fi}] ligne ${ri}: longueur ${row.length} au lieu de ${s.w}`); errors++; }
      for (const ch of row) if (ch !== '.' && !COL[ch]) { console.log(`ERREUR ${n}[${fi}] ligne ${ri}: caractère inconnu '${ch}'`); errors++; break; }
    });
  });
}

// Planche : chaque frame de chaque sprite dans une cellule
const cells = [];
for (const n of names) { const s = SPRITES[n]; if (!s || !s.frames) continue; s.frames.forEach((fr, fi) => { if (Array.isArray(fr)) cells.push({ n, fi, s, fr }); }); }
if (!cells.length) { console.log('Aucun sprite à dessiner' + (only ? ' (filtre --only=' + only + ')' : '')); process.exit(errors ? 2 : 1); }
const cw = Math.max(...cells.map(c => c.s.w)) + 4, ch = Math.max(...cells.map(c => c.s.h)) + 4;
const ncols = cols || Math.max(1, Math.min(cells.length, Math.floor(1600 / (cw * scale))));
const nrows = Math.ceil(cells.length / ncols);
const W = ncols * cw * scale, H = nrows * ch * scale;
const buf = Buffer.alloc(W * H * 4);
// damier
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const i = (y * W + x) * 4, d = ((Math.floor(x / (scale * 2)) + Math.floor(y / (scale * 2))) & 1) ? 58 : 44;
  buf[i] = d; buf[i + 1] = d; buf[i + 2] = d + 8; buf[i + 3] = 255;
}
cells.forEach((c, idx) => {
  const ox = (idx % ncols) * cw * scale + 2 * scale, oy = Math.floor(idx / ncols) * ch * scale + 2 * scale;
  for (let y = 0; y < c.s.h; y++) for (let x = 0; x < c.s.w; x++) {
    const chr = (c.fr[y] || '')[x];
    if (!chr || chr === '.' || !COL[chr]) continue;
    const [r, g, b, a] = COL[chr];
    for (let dy = 0; dy < scale; dy++) for (let dx = 0; dx < scale; dx++) {
      const i = ((oy + y * scale + dy) * W + ox + x * scale + dx) * 4, al = a / 255;
      buf[i] = Math.round(r * al + buf[i] * (1 - al)); buf[i + 1] = Math.round(g * al + buf[i + 1] * (1 - al)); buf[i + 2] = Math.round(b * al + buf[i + 2] * (1 - al));
    }
  }
});
// Encodage PNG
function crc32(b) { let c, crc = 0xffffffff; for (let n = 0; n < b.length; n++) { c = (crc ^ b[n]) & 0xff; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; crc = (crc >>> 8) ^ c; } return (crc ^ 0xffffffff) >>> 0; }
function chunk(type, data) { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(type), data]); const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td)); return Buffer.concat([len, td, crc]); }
const raw = Buffer.alloc((W * 4 + 1) * H);
for (let y = 0; y < H; y++) { raw[y * (W * 4 + 1)] = 0; buf.copy(raw, y * (W * 4 + 1) + 1, y * W * 4, (y + 1) * W * 4); }
const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4); ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
fs.writeFileSync(out, Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]));
console.log(`${names.length} sprites, ${cells.length} frames -> ${out} (${W}x${H}), ${ncols} colonnes`);
console.log('Ordre : ' + cells.map((c, i) => `${i}:${c.n}${c.s.frames.length > 1 ? '#' + c.fi : ''}`).join('  '));
console.log(errors ? `${errors} ERREUR(S)` : 'OK : aucune erreur');
process.exit(errors ? 2 : 0);
