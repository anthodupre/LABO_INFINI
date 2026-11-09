// Une capture par quartier : NODE_PATH=$(npm root -g) node _dev/noelombre/tools/quartiers.js
const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const p = await b.newPage({ viewport: { width: 390, height: 700 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve('index.html')); await p.waitForTimeout(5000);
  await p.evaluate(() => { closeModal(); S.jeu.graine = 777; S.jeu.intro = true; S.jeu.reg.qualite = 2; JEU.recharger(); S.god = true; });
  for (const q of (process.argv[2] || 'citrouilles,sapins,cimetiere,lac,foire,bourg').split(',')) {
    await p.evaluate(q => {
      for (let r = 3; r < 60; r++) for (let dz = -r; dz <= r; dz++) for (let dx = -r; dx <= r; dx++) {
        if (Math.max(Math.abs(dx), Math.abs(dz)) !== r) continue;
        let ok = true; for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) if (MONDE.quartier(dx + i, dz + j) !== q || MONDE.repere(dx + i, dz + j)) ok = false;
        if (ok) { const C = MONDE.C; JOUEUR.x = dx * C + 2; JOUEUR.z = dz * C + 2; JOUEUR.y = MONDE.sol(JOUEUR.x, JOUEUR.z) + 0.3; JOUEUR.yaw = -2.4; JOUEUR.pitch = 0.08; return; }
      }
    }, q);
    await p.waitForTimeout(8000); await p.evaluate(() => { while (MODAL_OPEN) closeModal(); });
    await p.waitForTimeout(1500);
    await p.screenshot({ path: path.join(__dirname, '../preview/q_' + q + '.png') }); console.log('ok', q);
  }
  console.log(errs.join('\n')); await b.close();
})();
