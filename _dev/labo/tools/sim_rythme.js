#!/usr/bin/env node
// Rythme de progression pour plusieurs profils de joueurs : quand chaque bâtiment est acheté pour la 1re fois,
// quand arrive chaque ère, et la PLUS LONGUE attente sans nouveauté (nouveau bâtiment ou nouvelle ère).
// Usage : NODE_PATH=$(npm root -g) node _dev/labo/tools/sim_rythme.js [heures=4] [fichier=labo/index.html]
'use strict';
const { chromium } = require('playwright');
const path = require('path');
const HOURS = +(process.argv[2] || 4);
const FILE = path.resolve(process.argv[3] || path.join(__dirname, '../../../labo/index.html'));
// essais d'équilibrage sans reconstruire : RYTHME='{"cpsF":1.3,"from":4,"offline":[0.25,4]}' (facultatif)
const OVR = process.env.RYTHME ? JSON.parse(process.env.RYTHME) : null;
const ONLY = process.env.PROFILS ? process.env.PROFILS.split(',') : null;
const PROFILS = [
  // nom, clics/s pendant les 30 premières min, clics/s ensuite, part des fioles attrapées, achète les améliorations ?,
  // [minutes jouées, minutes d'absence] (null = toujours dans le jeu)
  ['optimal', 4, 1, 0.75, true, null],
  ['occasionnel', 2, 0.3, 0.4, true, null],
  ['sans-amelios', 2, 0.3, 0.4, false, null],
  ['par-sessions', 2, 0.5, 0.5, true, [15, 45]],
];
(async () => {
  const browser = await chromium.launch();
  for (const [nom, c1, c2, gold, ups, sess] of PROFILS.filter(p => !ONLY || ONLY.includes(p[0]))) {
    const page = await browser.newPage();
    page.on('pageerror', e => console.log('pageerror', e.message));
    await page.goto('file://' + FILE); await page.waitForTimeout(1500);
    const res = await page.evaluate(([HOURS, c1, c2, gold, ups, sess, OVR]) => {
      closeModal(); G.ready = false; S.set.sound = false;
      if (OVR && OVR.cpsF) BUILDINGS.forEach((b, i) => { if (i >= OVR.from) b.cps *= Math.pow(OVR.cpsF, Math.min(i, OVR.to || 99) - OVR.from + 1); });
      if (OVR && OVR.cps) BUILDINGS.forEach((b, i) => { if (OVR.cps[i]) b.cps = OVR.cps[i]; });
      if (OVR && OVR.cost) { // coûts des bâtiments + améliorations qui en dépendent
        BUILDINGS.forEach((b, i) => { if (OVR.cost[i]) b.cost = OVR.cost[i]; });
        UPGRADES.forEach(u => { if (u.type === 'tier' && u.b !== 'pipette') u.cost = BMAP[u.b].cost * TIER_MULT[u.k]; if (u.type === 'spec') u.cost = BMAP[u.b].cost * 50; if (u.type === 'syn') u.cost = BMAP[u.c].cost * 30; });
      }
      if (OVR && OVR.offline) offlineParams = () => [OVR.offline[0], OVR.offline[1] * 3600];
      recalc();
      const marks = [];
      function deltaCps(apply, undo) { const before = G.cps; apply(); recalc(); const d = G.cps - before; undo(); recalc(); return d; }
      function ai(clickRate) {
        let best = null;
        const consider = (kind, id, cost, delta) => {
          if (!(delta > 0) || !isFinite(cost)) return;
          const score = Math.max(0, cost - S.bank) / Math.max(G.cps, 0.1) + cost / delta;
          if (!best || score < best.score) best = { kind, id, cost, score };
        };
        B_IDS.forEach(id => { if (bLimit(id) <= 0) return; const c = bCost(id); consider('b', id, c, deltaCps(() => S.b[id] = n(id) + 1, () => S.b[id] = n(id) - 1)); });
        if (ups) G.unlockedUps.forEach(u => {
          const c = upCost(u);
          let d = deltaCps(() => S.up[u.id] = 1, () => delete S.up[u.id]);
          if (u.type === 'clickpct' || (u.type === 'tier' && u.b === 'pipette')) { const cb = G.click; S.up[u.id] = 1; recalc(); d += (G.click - cb) * clickRate; delete S.up[u.id]; recalc(); }
          if (u.type === 'goldup') d = G.cps * 0.05;
          consider('u', u.id, c, d);
        });
        if (best && S.bank >= best.cost) { if (best.kind === 'b') buyBuilding(best.id); else buyUp(UPMAP[best.id]); return true; }
        return false;
      }
      const first = {}, eraT = {}, T = HOURS * 3600; let t = 0, nextGold = 300, lastNew = 0, worst = 0, worstWhat = '';
      const gaps = [];
      const nouveau = (quoi) => { const w = t - lastNew; gaps.push(Math.round(w / 60)); if (w > worst) { worst = w; worstWhat = quoi; } lastNew = t; };
      while (t < T) {
        if (sess) {
          const cyc = (sess[0] + sess[1]) * 60, inCyc = t % cyc;
          if (inCyc === sess[0] * 60) { applyOffline(sess[1] * 60); t += sess[1] * 60; for (let g = 0; g < 20; g++) if (!ai(0)) break; continue; }
        }
        const cr = t < 1800 ? c1 : c2;
        G.clickAcc = (G.clickAcc || 0) + cr; while (G.clickAcc >= 1) { G.clickAcc -= 1; clickVessel(true); }
        tick(1); t++;
        if (t >= nextGold) { S.goldClicks++; GOLD.goldEffect(0, 0); nextGold = t + U.rand(240, 720) / G.goldFreq / gold; }
        for (let g = 0; g < 4; g++) if (!ai(cr)) break;
        B_IDS.forEach(id => { if (n(id) && first[id] == null) { first[id] = t; nouveau(id); } });
        if (eraT[S.era] == null) { eraT[S.era] = t; if (S.era) nouveau('ère ' + (S.era + 1)); }
        if (t % 3600 === 0) marks.push(t / 3600 + 'h:' + fmt(S.runEarned) + ' (Nobels ' + pendingNobels() + ')');
      }
      const m = s => Math.round(s / 60) + ' min';
      return 'Bâtiments (1er achat) : ' + B_IDS.filter(id => first[id] != null).map(id => id + '@' + m(first[id])).join(' ') +
        '\nÈres : ' + Object.keys(eraT).map(e => 'É' + (+e + 1) + '@' + m(eraT[e])).join(' ') +
        '\nPlus longue attente sans nouveau bâtiment ni ère : ' + m(worst) + ' (avant ' + worstWhat + ') ; attente actuelle : ' + m(t - lastNew) +
        '\nAttentes (min) : ' + gaps.join(' ') +
        '\nCumul : ' + marks.join(' · ') +
        '\nProd. finale : ' + fmt(G.cps) + '/s, ' + G.totalB + ' bâtiments, ' + G.upCount + ' améliorations';
    }, [HOURS, c1, c2, gold, ups, sess, OVR]);
    console.log('=== ' + nom + ' ===\n' + res);
    await page.close();
  }
  await browser.close();
})();
