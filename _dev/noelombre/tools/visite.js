// Une capture de chaque lieu (merveilles et blocs) sur le VRAI jeu (index.html) :
//   NODE_PATH=$(npm root -g) node _dev/noelombre/tools/visite.js [types séparés par des virgules | merveilles | blocs] [vue a|b|c|d]
// Captures dans _dev/noelombre/preview/visite/<type>.png ; planches : python3 _dev/noelombre/tools/planche.py
const { chromium } = require('playwright'); const path = require('path'), fs = require('fs');
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const p = await b.newPage({ viewport: { width: 420, height: 640 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text().slice(0, 200)); });
  await p.goto('file://' + path.resolve('index.html'));
  const E = (f, a) => p.evaluate(f, a);
  const attendre = async (f, ms, a) => { const t0 = Date.now(); while (Date.now() - t0 < ms) { try { if (await E(f, a)) return true; } catch (e) { } await p.waitForTimeout(300); } return false; };
  await attendre(() => typeof JEU !== 'undefined' && S && JEU._etat().prete, 90000);
  await E(() => { while (MODAL_OPEN) closeModal(); document.getElementById('top').style.display = 'none'; S.jeu.intro = true; S.jeu.reg.guide = false; S.jeu.reg.qualite = 1; });
  const arg = process.argv[2] || 'merveilles', vue = process.argv[3] || 'a';
  const types = arg === 'merveilles' ? await E(() => MONDE.merveilles()) : arg === 'blocs' ? await E(() => MONDE.blocs().sort()) : arg.split(',');
  const out = path.join(__dirname, '../preview/visite'); fs.mkdirSync(out, { recursive: true });
  const vues = { a: [22, -5, 0.14, 0], b: [22, 10, 0.12, 0], c: [2, 2, 0.3, 0], d: [22, 4, -0.7, 26] };
  for (const type of types) {
    const [x, z, pitch, haut] = vues[vue];
    await E(([type, x, z, pitch, haut]) => {
      MONDE.essai = { cx: 4, cz: 4, type }; S.jeu.graine = 777; S.god = haut > 0; JEU.recharger(); JEU._pr(1.25); JEU._meteo(haut > 0 ? 'clair' : 'calme');
      const X = 176 + x, Z = 176 + z; JOUEUR.x = X; JOUEUR.z = Z; JOUEUR.y = MONDE.sol(X, Z) + 0.05 + haut; JOUEUR.pitch = pitch;
      const A = MONDE.tordre(X, Z, {}), B = MONDE.tordre(198, 198, {}); JOUEUR.yaw = Math.atan2(-(B.x - A.x), -(B.z - A.z));
    }, [type, x, z, pitch, haut]);
    await attendre(() => JEU._etat().parcelles >= 12, 60000); await p.waitForTimeout(3500);
    await E(() => { while (MODAL_OPEN) closeModal(); });
    await p.screenshot({ path: path.join(out, type + (vue === 'a' ? '' : '_' + vue) + '.png'), timeout: 180000 });
    const boite = await E(() => [...document.querySelectorAll('div')].filter(d => /^Erreur/.test(d.textContent)).map(d => d.textContent).join(' | '));
    console.log(type, boite ? 'ERREUR ' + boite : 'ok');
  }
  console.log(errs.length ? 'ERREURS : ' + [...new Set(errs)].slice(0, 6).join(' | ') : 'aucune erreur JS');
  await b.close();
})();
