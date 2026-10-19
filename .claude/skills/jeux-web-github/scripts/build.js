#!/usr/bin/env node
// Assemble un projet de jeu en UN fichier HTML autonome + une copie .txt identique (c'est le .txt qu'on envoie).
// Usage : node build.js <dossier-projet> --title "Nom du jeu" [--name nom-du-fichier] [--out dossier] [--theme #141020]
//         (les options acceptent aussi la forme --title="Nom du jeu")
//
// Structure attendue du projet (voir assets/starter/ pour un squelette qui s'assemble tel quel) :
//   src/style.css, src/body.html, src/js/*.js (concaténés par ordre alphabétique dans UN SEUL <script>)
//   fonts/*.woff2 (optionnel ; noms façon Fontsource : <famille>-latin-<graisse>-normal.woff2 ; sans dossier fonts/,
//                  le jeu utilise la police du système de l'iPhone — aucune police n'est imposée)
//   icons/apple-touch-icon.png (optionnel, 180×180, opaque)
//
// Ce que le script garantit (chaque point vient d'un vrai bug sur iPhone) :
//   - polices et icône intégrées en base64 DÉCOUPÉ en lignes courtes (une ligne géante = fichier affiché en « 12 lignes »)
//   - barre d'état OPAQUE (black) : black-translucent provoque une bande vide en bas en mode écran d'accueil
//   - le JS ASSEMBLÉ est compilé : une constante déclarée dans deux fichiers = jeu entièrement mort (page figée)
//   - estampille de version : const BUILD_ID (à afficher dans Options et la boîte d'erreur) + <meta name="version">
//   - avertissements « PIÈGE » pour les erreurs déjà commises (inset, body fixe, boucle de scroll, touchmove bloqué…)
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');

const argv = process.argv.slice(2);
const VALUED = ['out', 'name', 'title', 'theme'];
const opt = (k, d) => {
  const i = argv.indexOf('--' + k); if (i >= 0) return argv[i + 1];
  const e = argv.find(a => a.startsWith('--' + k + '=')); return e ? e.slice(k.length + 3) : d;
};
const positional = argv.filter((a, i) => !a.startsWith('--') && !(i > 0 && VALUED.includes(argv[i - 1].slice(2)) && argv[i - 1].startsWith('--') && !argv[i - 1].includes('=')));
const proj = path.resolve(positional[0] || '.');
if (!fs.existsSync(path.join(proj, 'src'))) { console.error('ERREUR : pas de dossier src/ dans ' + proj + '\nUsage : node build.js <dossier-projet> --title "Nom du jeu" [--name fichier] [--out dossier]'); process.exit(1); }

const slug = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
let title = opt('title', null);
if (!title) { title = path.basename(proj); console.warn('ATTENTION : --title absent ; le nom sous l\'icône de l\'écran d\'accueil sera « ' + title + ' » (figé à l\'installation).'); }
const name = opt('name', slug(title) || path.basename(proj));
const theme = opt('theme', '#141020');
const outDir = path.resolve(opt('out', path.join(proj, 'dist')));
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const BUILD = new Date().toLocaleString('fr-CA', { timeZone: 'America/Toronto', dateStyle: 'long', timeStyle: 'short' })
  .replace(/(\d) h (\d)/, '$1\u00a0h\u00a0$2'); // « 18 octobre 2026 à 19 h 03 » (insécables : ne se coupe pas)

// ---- polices (base64 découpé : barre oblique inverse + saut de ligne = continuation de chaîne CSS) ----
const wrap = b64 => b64.match(/.{1,96}/g).join('\\\n');
const FAMILLES = { 'vt323': 'VT323', 'pixelify-sans': 'Pixelify Sans' }; // noms exacts connus ; sinon « mot-mot » -> « Mot Mot »
const fontDir = path.join(proj, 'fonts');
const fontFiles = fs.existsSync(fontDir) ? fs.readdirSync(fontDir).filter(f => f.endsWith('.woff2')).sort() : [];
const fonts = fontFiles.map(f => {
  const m = /^(.+?)-(?:latin|latin-ext|cyrillic|greek|vietnamese)-(\d{3})-(normal|italic)\.woff2$/.exec(f);
  const slugF = m ? m[1] : f.replace(/\.woff2$/, '');
  const fam = FAMILLES[slugF] || slugF.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
  return `@font-face{font-family:"${fam}";font-style:${m ? m[3] : 'normal'};font-weight:${m ? m[2] : 400};font-display:swap;src:url("data:font/woff2;base64,\\\n${wrap(fs.readFileSync(path.join(fontDir, f)).toString('base64'))}") format("woff2");}`;
});
if (fonts.length) fonts.unshift('/* Polices intégrées (' + fontFiles.join(', ') + ') — vérifier leur licence (OFL…) */');
const fontsCss = fonts.join('\n');

// ---- sources ----
const read = p => fs.readFileSync(path.join(proj, p), 'utf8');
const css = read('src/style.css'), body = read('src/body.html');
const jsDir = path.join(proj, 'src/js');
const files = fs.readdirSync(jsDir).filter(f => f.endsWith('.js')).sort();
const js = files.map(f => `/* ==== ${f} ==== */\n` + fs.readFileSync(path.join(jsDir, f), 'utf8')).join('\n');
if (/<\/script/i.test(js)) { console.error('ERREUR : « </script » interdit dans le JS (écrire "<\\/script")'); process.exit(1); }
const head = '"use strict";\nconst BUILD_ID = ' + JSON.stringify(BUILD) + ';\n';
try { new vm.Script(head + js, { filename: name + '.js' }); }
catch (e) {
  const m = /(\d+)/.exec((e.stack || '').split('\n')[0].split(':').pop() || '');
  console.error('ERREUR : le JS assemblé ne compile pas, le jeu ne démarrerait pas sur l\'iPhone :\n  ' + e.message +
    '\n  (cause fréquente : une même constante/fonction globale déclarée dans deux fichiers de src/js/)');
  console.error((e.stack || '').split('\n').slice(0, 3).join('\n'));
  process.exit(1);
}

// ---- pièges déjà rencontrés (avertissements ; commentaires ignorés) ----
const nocom = s => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[\s;{}])\/\/[^\n]*/g, '$1');
const cssC = nocom(css), jsC = nocom(js);
const PIEGES = [
  [cssC + jsC, /(^|[^-\w])inset\s*:/m, 'propriété CSS « inset » : ignorée avant iOS 14.5 (écrire top/right/bottom/left)'],
  [cssC + jsC + body, /black-translucent/, 'barre d\'état « black-translucent » : bande vide en bas en mode écran d\'accueil'],
  [cssC + jsC + body, /fonts\.(googleapis|gstatic)\.com/, 'police chargée par Internet : intégrer la police (dossier fonts/)'],
  [cssC, /(^|[\s,}])body\s*(,[^{]*)?\{[^}]*position\s*:\s*fixed/m, 'body en position fixe : coupe le jeu en bas sur iPhone'],
  [jsC, /setInterval\([^;]{0,80}scroll(To|Top|By)?/i, 'remise en place du défilement EN BOUCLE : rend tous les boutons morts sur iPhone'],
  [jsC, /addEventListener\(\s*['"]touchmove['"][\s\S]{0,300}?preventDefault/, 'touchmove bloqué (preventDefault) : avale les tapes sur iPhone, même avec des exceptions'],
  [jsC, /addEventListener\(\s*['"]scroll['"][\s\S]{0,200}?scrollTo/, 'scrollTo dans un écouteur scroll : même effet qu\'une boucle (boutons morts)'],
];
let warned = 0;
for (const [src, re, msg] of PIEGES) if (re.test(src)) { console.warn('PIÈGE : ' + msg); warned++; }

const iconPath = path.join(proj, 'icons/apple-touch-icon.png');
const icon = fs.existsSync(iconPath) ? 'data:image/png;base64,\n' + fs.readFileSync(iconPath).toString('base64').match(/.{1,96}/g).join('\n') : '';
if (!icon) console.warn('ATTENTION : pas d\'icône (icons/apple-touch-icon.png, 180×180 opaque) : iOS prendra une capture de la page.');

const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="${esc(title)}">
${icon ? `<link rel="apple-touch-icon" href="${icon}">\n<link rel="icon" type="image/png" href="${icon}">\n` : ''}<meta name="theme-color" content="${esc(theme)}">
<meta name="version" content="${esc(BUILD)}">
<title>${esc(title)}</title>
<style>
${fontsCss ? fontsCss + '\n' : ''}${css}
</style>
</head>
<body>
${body}
<script>
${head}${js}
</script>
</body>
</html>
`;
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, name + '.html'), html);
fs.writeFileSync(path.join(outDir, name + '.txt'), html);
const lines = html.split('\n'), longest = Math.max(...lines.map(l => l.length));
console.log(`OK « ${title} », version du ${BUILD} : ${files.length} fichiers JS, ${Math.round(html.length / 1024)} Ko, ${lines.length} lignes (la plus longue : ${longest} car.)\n   -> ${path.join(outDir, name)}.html + .txt (envoyer le .txt)`);
if (longest > 500) console.warn('ATTENTION : une ligne dépasse 500 caractères ; les visionneuses iPhone risquent de mal afficher le fichier (découper les longues chaînes).');
if (warned) { console.warn(warned + ' piège(s) iPhone détecté(s) : corriger avant d\'envoyer (voir references/ios-webapp.md).'); process.exitCode = 2; }
