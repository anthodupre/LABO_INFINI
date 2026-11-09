// Visite chaque type de repère (capture) : NODE_PATH=$(npm root -g) node _dev/noelombre/tools/tour.js [types...]
const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const p = await b.newPage({ viewport: { width: 390, height: 700 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('file://' + path.resolve('index.html')); await p.waitForTimeout(5000);
  await p.evaluate(() => { closeModal(); S.jeu.graine = 777; S.jeu.intro = true; JEU.recharger(); S.god = true; });
  const types = process.argv.slice(2).length ? process.argv.slice(2) : ['horloge', 'colline', 'mausolee', 'carrousel', 'kiosque', 'sapin', 'fontaine', 'atelier', 'puits', 'roue', 'gare', 'observatoire'];
  for (const ty of types) {
    const ok = await p.evaluate(ty => {
      for (let r = 0; r < 60; r++) for (let dz = -r; dz <= r; dz++) for (let dx = -r; dx <= r; dx++) {
        if (Math.max(Math.abs(dx), Math.abs(dz)) !== r) continue;
        if (MONDE.repere(dx, dz) === ty) { const C = MONDE.C; JOUEUR.x = dx * C + C / 2 + 1; JOUEUR.z = dz * C + C / 2 + (ty === 'colline' || ty === 'roue' ? 21 : 12); JOUEUR.y = MONDE.sol(JOUEUR.x, JOUEUR.z) + 0.5; JOUEUR.yaw = 0; JOUEUR.pitch = ty === 'colline' || ty === 'sapin' || ty === 'roue' || ty === 'horloge' ? 0.32 : 0.12; return true; }
      }
      return false;
    }, ty);
    if (!ok) { console.log('introuvable', ty); continue; }
    await p.waitForTimeout(7000);
    await p.evaluate(() => { if (MODAL_OPEN) closeModal(); });
    await p.waitForTimeout(1500);
    await p.screenshot({ path: path.join(__dirname, '../preview/rep_' + ty + '.png') });
    console.log('ok', ty);
  }
  console.log(errs.slice(0, 10).join('\n')); await b.close();
})();
