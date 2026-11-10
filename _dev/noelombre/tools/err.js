// Affiche les erreurs au démarrage : NODE_PATH=$(npm root -g) node _dev/noelombre/tools/err.js [fichier.html] [js à évaluer]
const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const p = await b.newPage({ viewport: { width: 390, height: 760 } });
  p.on('pageerror', e => console.log('PAGEERROR', e.message)); p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') console.log(m.type(), m.text().slice(0, 600)); });
  await p.goto('file://' + path.resolve(process.argv[2] || 'index.html')); await p.waitForTimeout(+(process.argv[4] || 5000));
  if (process.argv[3]) { try { console.log('->', JSON.stringify(await p.evaluate(process.argv[3]))); } catch (e) { console.log('EVAL', e.message.slice(0, 300)); } await p.waitForTimeout(2500); }
  console.log('BOITE:', await p.evaluate(() => [...document.querySelectorAll('div')].filter(d => /^Erreur/.test(d.textContent)).map(d => d.textContent).join(' | ')));
  await b.close();
})();
