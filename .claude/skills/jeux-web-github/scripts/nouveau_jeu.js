#!/usr/bin/env node
// Crée un nouveau projet de jeu (n'importe quel genre) à partir de la coquille éprouvée sur iPhone : sauvegarde,
// Options, export/import, DEV + BURGER, messages, modales, hauteur d'écran, tapes. Il s'assemble et tourne tel quel.
// Usage : node nouveau_jeu.js <dossier-projet> --title "Nom du jeu" [--id nomDuJeu] [--prefix NOM1] [--pixel]
//   --id     : identifiant UNIQUE (clés de sauvegarde ; tous ses jeux partagent le stockage du même site)
//   --prefix : préfixe du texte d'export (ex. LABO1)
//   --pixel  : SEULEMENT si le jeu demandé est en pixel art : ajoute palette, rendu de sprites texte, sprites
//              d'exemple et polices pixel (Pixelify Sans + VT323)
// Copie : assets/starter/src/ -> <projet>/src/ ; assets/starter/ios-kit.js -> src/js/02_kit.js.
'use strict';
const fs = require('fs'), path = require('path');
const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf('--' + k); if (i >= 0) return argv[i + 1]; const e = argv.find(a => a.startsWith('--' + k + '=')); return e ? e.slice(k.length + 3) : d; };
const dir = argv.find((a, i) => !a.startsWith('--') && !(i > 0 && /^--(title|id|prefix)$/.test(argv[i - 1])));
const title = opt('title', null), pixel = argv.includes('--pixel');
if (!dir || !title) { console.error('Usage : node nouveau_jeu.js <dossier-projet> --title "Nom du jeu" [--id nomDuJeu] [--prefix NOM1] [--pixel]'); process.exit(1); }
const words = title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Za-z0-9]+/g, ' ').trim().split(' ').filter(Boolean);
const id = opt('id', words.map((w, i) => i ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w.toLowerCase()).join('') || 'jeu');
const prefix = opt('prefix', (words.join('').toUpperCase().slice(0, 5) || 'JEU') + '1');
if (!/^[A-Za-z][A-Za-z0-9]*$/.test(id) || id === 'monJeu' || id === 'laboInfini') { console.error('ERREUR : --id doit être un mot propre à ce jeu (lettres/chiffres), pas « ' + id + ' ».'); process.exit(1); }
if (!/^[A-Z][A-Z0-9]*$/.test(prefix)) { console.error('ERREUR : --prefix en MAJUSCULES/chiffres (ex. NOM1).'); process.exit(1); }
const proj = path.resolve(dir), src = path.join(proj, 'src');
if (fs.existsSync(src)) { console.error('ERREUR : ' + src + ' existe déjà (rien n\'a été écrasé).'); process.exit(1); }
const assets = path.join(__dirname, '..', 'assets');
fs.cpSync(path.join(assets, 'starter', 'src'), src, { recursive: true });
fs.copyFileSync(path.join(assets, 'starter', 'ios-kit.js'), path.join(src, 'js', '02_kit.js'));
const jeu = path.join(src, 'js', '10_jeu.js');
fs.writeFileSync(jeu, fs.readFileSync(jeu, 'utf8')
  .replace("titre: 'Mon Jeu', id: 'monJeu', prefixe: 'JEU1',", 'titre: ' + JSON.stringify(title) + ', id: ' + JSON.stringify(id) + ', prefixe: ' + JSON.stringify(prefix) + ','));
fs.mkdirSync(path.join(proj, 'icons'), { recursive: true });
if (pixel) {
  const px = path.join(assets, 'pixel');
  fs.copyFileSync(path.join(px, 'palette.js'), path.join(src, 'js', '01_palette.js'));
  fs.copyFileSync(path.join(px, 'gfx.js'), path.join(src, 'js', '03_gfx.js'));
  fs.copyFileSync(path.join(px, 'sprites-exemple.js'), path.join(src, 'js', '05_sprites.js'));
  fs.cpSync(path.join(px, 'fonts'), path.join(proj, 'fonts'), { recursive: true });
  fs.appendFileSync(path.join(src, 'style.css'), '\n/* ---- pixel art (option --pixel) ---- */\n:root{--police:"Pixelify Sans",ui-monospace,Menlo,monospace;--police-nombres:"VT323",ui-monospace,Menlo,monospace}\n' +
    'img,canvas{image-rendering:pixelated;image-rendering:crisp-edges}\n/* dans Pixelify Sans le 5 ressemble à un S : nombres en VT323 (classe .num) ; les polices n\'ont ni U+202F, ni ∞ ⚠ ★ ✦ ✿ ✔ */\n');
}
let skill = path.relative(process.cwd(), path.join(__dirname, '..')) || '.'; if (skill.startsWith('..')) skill = path.join(__dirname, '..');
console.log(`Projet « ${title} » créé dans ${proj} (sauvegarde : ${id}.*, export : ${prefix}:)${pixel ? ' + outils pixel art' : ''}
Suite :
  node ${skill}/scripts/build.js ${dir} --title ${JSON.stringify(title)}
  NODE_PATH=$(npm root -g) node ${skill}/scripts/iphone_taps.js ${dir}/dist/<nom>.html "#btnSave" "#btnOpts" "#game"
Écrire le jeu dans src/js/10_jeu.js (objet JEU, contrat en tête du fichier) ; garder 02_kit.js, 08_coquille.js et
99_main.js tels quels ; icône : icons/apple-touch-icon.png (180×180, opaque).`);
