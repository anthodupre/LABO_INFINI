// Construit CHAQUE lieu (merveilles et blocs) sans capture : erreurs, triangles, temps. Lit index.html.
//   NODE_PATH=$(npm root -g) node _dev/noelombre/tools/lieux.js
const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const p = await b.newPage({ viewport: { width: 390, height: 700 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text().slice(0, 300)); });
  await p.goto('file://' + path.resolve('index.html'));
  for (let i = 0; i < 200; i++) { await p.waitForTimeout(500); if (await p.evaluate(() => typeof JEU !== 'undefined' && S && JEU._etat().prete).catch(() => false)) break; }
  const r = await p.evaluate(() => {
    while (MODAL_OPEN) closeModal();
    const out = [], C = MONDE.C, types = MONDE.merveilles().concat(MONDE.blocs());
    for (const type of types) {
      const o = { type, genre: REPERES[type].genre || 'merveille' };
      try {
        MONDE.essai = { cx: 7, cz: 7, type }; MONDE.viderCaches();
        const t0 = performance.now(), P = MONDE.plan(7, 7); o.plan = Math.round(performance.now() - t0);
        const t1 = performance.now(), obj = PARCELLE.construire(P, 1); o.ms = Math.round(performance.now() - t1);
        let tris = 0, pts = 0; obj.groupe.traverse(m => { if (m.isMesh && m.geometry.index) tris += m.geometry.index.count / 3; else if (m.isPoints) pts += m.geometry.attributes.position.count; });
        o.tris = Math.round(tris); o.pts = pts; o.maisons = P.maisons.length; o.lum = P.lumieres.length; o.anims = obj.anims.length;
        const ctx = { d: 10, jx: 22, jz: 10, eclat: 1, vu: false, son() { } }; for (let k = 0; k < 30; k++) for (const a of obj.anims) a(k * 0.3, 0.016, ctx);
        let bord = 0; for (const [x, z] of [[0, 10], [44, 30], [12, 0], [33, 44], [2, 2]]) bord = Math.max(bord, Math.abs(MONDE.sol(7 * C + x, 7 * C + z) - MONDE.terrainBrut(7 * C + x, 7 * C + z)));
        o.bord = +bord.toFixed(2); o.entree = [4, 8].every(z => P.libre(22, z, 0.6));
        if (o.genre !== 'bloc' && (!REPERES[type].nom || !REPERES[type].desc)) o.err = 'nom/desc manquant';
        obj.liberer();
      } catch (e) { o.err = String(e && e.stack || e).slice(0, 300); }
      out.push(o);
    }
    MONDE.essai = null; MONDE.viderCaches();
    return out;
  });
  let ko = 0;
  for (const o of r) { const pb = o.err || (o.bord > 0.4 ? 'bord ' + o.bord : '') || (o.genre !== 'bloc' && !o.entree ? 'entrée bouchée' : ''); if (pb) ko++; console.log((pb ? '✘ ' : '✔ ') + o.type.padEnd(16) + o.genre.padEnd(10) + String(o.tris).padStart(6) + ' tri ' + String(o.pts).padStart(5) + ' pts ' + String(o.ms).padStart(4) + ' ms  maisons ' + o.maisons + '  ' + (pb || '')); }
  console.log(r.length + ' lieux (' + r.filter(o => o.genre !== 'bloc').length + ' merveilles, ' + r.filter(o => o.genre === 'bloc').length + ' blocs), ' + ko + ' problème(s)');
  console.log(errs.length ? 'ERREURS JS : ' + [...new Set(errs)].slice(0, 5).join(' | ') : 'aucune erreur JS');
  await b.close(); process.exit(ko || errs.length ? 1 : 0);
})();
