// Capture rapide : NODE_PATH=$(npm root -g) node _dev/noelombre/tools/shot.js [fichier.html] [nom] [w] [h] [script-js-avant]
const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const f = path.resolve(process.argv[2] || 'index.html'), nom = process.argv[3] || 'shot', W = +(process.argv[4] || 390), H = +(process.argv[5] || 844), pre = process.argv[6] || '';
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'] });
  const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  const errs = []; p.on('pageerror', e => errs.push('PAGEERROR ' + e.message)); p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.type() + ' ' + m.text()); });
  await p.goto('file://' + f);
  await p.waitForTimeout(6000);
  if (pre) { await p.evaluate(pre); await p.waitForTimeout(4000); }
  await p.evaluate(() => { if (typeof MODAL_OPEN !== 'undefined' && MODAL_OPEN) closeModal(); });
  await p.waitForTimeout(3000);
  const out = path.join(__dirname, '../preview', nom + '.png'); await p.screenshot({ path: out });
  const info = await p.evaluate(() => ({ fps: 0, info: (()=>{try{return JEU._info()}catch(e){return null}})(), err: [...document.querySelectorAll('div')].filter(d => /^Erreur/.test(d.textContent)).map(d => d.textContent).join(' | '), calls: typeof JEU !== 'undefined' ? 1 : 0 }));
  console.log(out, JSON.stringify(info)); console.log(errs.slice(0, 15).join('\n'));
  await b.close();
})();
