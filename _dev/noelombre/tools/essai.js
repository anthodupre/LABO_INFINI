#!/usr/bin/env node
// Banc d'essai d'un fichier de contenu (merveilles / blocs) sur le cœur GELÉ du jeu (_dev/noelombre/gel/src).
// Le dossier gel/ n'est pas dans le dépôt : le créer par copie (cp -r src gel/src && cp -r fonts gel/fonts) avant de lancer des sous-agents.
// Usage (depuis /home/user/LABO_INFINI) :
//   NODE_PATH=$(npm root -g) node _dev/noelombre/tools/essai.js _dev/noelombre/contenu/18m_a.js <type> [--js "code"] [--vues a,b,c,d,e]
// Construit une page d'essai privée (sans toucher à index.html), place le type demandé sur une parcelle d'essai, vérifie
// la fiche, mesure le coût (temps de construction, triangles) et prend des captures dans _dev/noelombre/preview/essais/ :
//   a = depuis la rue au sud (26 m), b = de près (11 m), c = de biais en levant les yeux, d = vue d'en haut (ciel clair),
//   e = au centre juste après un éclat de lanterne (réaction du lieu).
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { execFileSync } = require('child_process');
const { chromium } = require('playwright');
const argv = process.argv.slice(2), fichier = argv[0], type = argv[1];
const opt = k => { const i = argv.indexOf('--' + k); return i >= 0 ? argv[i + 1] : null; };
if (!fichier || !type) { console.error('Usage : essai.js <fichier.js> <type> [--js "code"] [--vues a,b,c,d,e]'); process.exit(1); }
const racine = path.join(__dirname, '../../..'), gel = path.join(__dirname, '../gel');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'essai-'));
fs.cpSync(path.join(gel, 'src'), path.join(tmp, 'src'), { recursive: true });
if (fs.existsSync(path.join(gel, 'fonts'))) fs.cpSync(path.join(gel, 'fonts'), path.join(tmp, 'fonts'), { recursive: true });
fs.copyFileSync(fichier, path.join(tmp, 'src/js', '18m_essai.js'));
try { execFileSync('node', ['--check', fichier], { stdio: 'pipe' }); } catch (e) { console.error('ERREUR de syntaxe :\n' + String(e.stderr)); process.exit(1); }
try { execFileSync('node', [path.join(racine, '.claude/skills/jeux-web-github/scripts/build.js'), tmp, '--title', 'Essai', '--name', 'essai'], { stdio: 'pipe' }); }
catch (e) { console.error('ERREUR de construction :\n' + String(e.stdout || '') + String(e.stderr || '')); process.exit(1); }
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const p = await b.newPage({ viewport: { width: 480, height: 800 } });
  const errs = []; p.on('pageerror', e => errs.push('pageerror: ' + e.message)); p.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text().slice(0, 400)); });
  await p.goto('file://' + path.join(tmp, 'dist/essai.html')); await p.waitForTimeout(4000);
  const E = (f, a) => p.evaluate(f, a);
  const fiche = await E(type => {
    const R = REPERES[type]; if (!R) return { erreur: 'type « ' + type + ' » absent de REPERES (clés : ' + Object.keys(REPERES).join(', ') + ')' };
    const pb = [];
    if (typeof R.plan !== 'function') pb.push('plan() manquant'); if (typeof R.construire !== 'function') pb.push('construire() manquant');
    if (R.genre !== 'bloc') { if (!R.nom || R.nom.length > 34) pb.push('nom manquant ou > 34 caractères'); if (!R.desc || R.desc.length > 150) pb.push('desc manquante ou > 150 caractères'); }
    return { genre: R.genre || 'merveille', nom: R.nom, desc: R.desc, pb };
  }, type);
  if (fiche.erreur) { console.error('ERREUR : ' + fiche.erreur); await b.close(); process.exit(1); }
  console.log('fiche :', JSON.stringify(fiche));
  await E(type => {
    while (MODAL_OPEN) closeModal();
    document.getElementById('top').style.display = 'none';
    S.jeu.intro = true; S.jeu.graine = 777; S.jeu.reg.qualite = 1; S.jeu.reg.guide = false; MONDE.essai = { cx: 4, cz: 4, type }; JEU.recharger(); JEU._pr(1.25); JEU._meteo('calme');
  }, type);
  const mesure = await E(() => {
    const C = MONDE.C, P = MONDE.plan(4, 4); const t0 = performance.now(); let obj, err = null;
    try { obj = PARCELLE.construire(P, 1); } catch (e) { err = String(e && e.stack || e).slice(0, 600); }
    const ms = performance.now() - t0; let tris = 0, pts = 0, appels = 0;
    if (obj) { obj.groupe.traverse(m => { if (m.isMesh && m.geometry.index) { tris += m.geometry.index.count / 3; appels++; } else if (m.isPoints) { pts += m.geometry.attributes.position.count; appels++; } }); obj.liberer(); }
    let bord = 0; for (const [x, z] of [[0, 10], [44, 30], [12, 0], [33, 44]]) bord = Math.max(bord, Math.abs(MONDE.sol(4 * C + x, 4 * C + z) - (MONDE.terrainBrut(4 * C + x, 4 * C + z))));
    return { ms: Math.round(ms), tris: Math.round(tris), points: pts, appels, obstacles: P.obst.length, lumieres: P.lumieres.length, maisons: P.maisons.length, anims: obj ? obj.anims.length : 0, err, ecartBord: +bord.toFixed(2), entreeLibre: [4, 8, 12].every(z => P.libre(22, z, 0.6)) };
  });
  console.log('mesure :', JSON.stringify(mesure));
  if (mesure.err) errs.push('construire : ' + mesure.err);
  const out = path.join(__dirname, '../preview/essais'); fs.mkdirSync(out, { recursive: true });
  const C = 44, X0 = 4 * C, Z0 = 4 * C;
  const vues = { a: [22, -4, Math.PI, 0.16, 0], b: [22, 11, Math.PI, 0.12, 0], c: [3, 3, Math.PI * 1.25, 0.34, 0], d: [22, 6, Math.PI, -0.75, 26], e: [22, 14, Math.PI, 0.1, 0] };
  for (const v of (opt('vues') || 'a,b,c,d,e').split(',')) {
    const [x, z, yaw, pitch, haut] = vues[v] || vues.a;
    await E(([x, z, yaw, pitch, haut, v]) => {
      S.god = haut > 0 || v === 'e' && false; JEU._meteo(v === 'd' ? 'clair' : 'calme');
      JOUEUR.x = x; JOUEUR.z = z; JOUEUR.y = MONDE.sol(x, z) + 0.05 + haut; JOUEUR.vy = 0; JOUEUR.yaw = yaw; JOUEUR.pitch = pitch; JOUEUR.vx = JOUEUR.vz = 0;
      { const A = MONDE.tordre(x, z, {}), B = MONDE.tordre(4 * MONDE.C + 22, 4 * MONDE.C + 22, {}); if (Math.hypot(B.x - A.x, B.z - A.z) > 3) JOUEUR.yaw = Math.atan2(-(B.x - A.x), -(B.z - A.z)); } // vise le centre (le monde est tordu)
    }, [X0 + x, Z0 + z, yaw, pitch, haut, v]);
    await p.waitForTimeout(v === 'a' ? 7000 : 4500);
    if (v === 'e') { await E(() => JEU._eclat()); await p.waitForTimeout(2200); }
    if (opt('js')) { await E(opt('js')); await p.waitForTimeout(2500); }
    await E(() => { while (MODAL_OPEN) closeModal(); });
    const f = path.join(out, type + '_' + v + '.png'); await p.screenshot({ path: f, timeout: 180000 }); console.log('capture :', f);
  }
  const boite = await E(() => [...document.querySelectorAll('div')].filter(d => /^Erreur/.test(d.textContent)).map(d => d.textContent).join(' | '));
  if (boite) errs.push('boîte d’erreur du jeu : ' + boite);
  console.log(errs.length ? 'ERREURS :\n  ' + errs.slice(0, 8).join('\n  ') : 'aucune erreur JS');
  await b.close(); fs.rmSync(tmp, { recursive: true, force: true });
  process.exit(errs.length ? 2 : 0);
})();
