#!/usr/bin/env node
// Simulation d'équilibrage : un joueur automatique achète au meilleur rendement.
// Usage : NODE_PATH=$(npm root -g) node tools/sim.js [heures=10] [runs=1]
'use strict';
const { chromium } = require('playwright');
const path = require('path');
const HOURS = +(process.argv[2] || 10), RUNS = +(process.argv[3] || 1);
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('pageerror', e => console.log('pageerror', e.message));
  await page.goto('file://' + path.join(__dirname, '../../../labo/index.html'));
  await page.waitForTimeout(1500);
  const res = await page.evaluate(([HOURS, RUNS]) => {
    closeModal(); G.ready = false; S.set.sound = false;
    const out = [];
    const fmtT = s => (s / 3600).toFixed(2) + 'h';
    function deltaCps(apply, undo) { const before = G.cps; apply(); recalc(); const d = G.cps - before; undo(); recalc(); return d; }
    function ai(clickRate) {
      let best = null;
      const consider = (kind, id, cost, delta) => {
        if (!(delta > 0) || !isFinite(cost)) return;
        const score = Math.max(0, cost - S.bank) / Math.max(G.cps, 0.1) + cost / delta;
        if (!best || score < best.score) best = { kind, id, cost, score };
      };
      B_IDS.forEach(id => { if (bLimit(id) <= 0) return; const c = bCost(id); consider('b', id, c, deltaCps(() => S.b[id] = n(id) + 1, () => S.b[id] = n(id) - 1)); });
      if (!inChal('noupgrade')) G.unlockedUps.forEach(u => {
        const c = upCost(u);
        let d = deltaCps(() => S.up[u.id] = 1, () => delete S.up[u.id]);
        if (u.type === 'clickpct' || (u.type === 'tier' && u.b === 'pipette')) { const cb = G.click; S.up[u.id] = 1; recalc(); d += (G.click - cb) * clickRate; delete S.up[u.id]; recalc(); }
        if (u.type === 'goldup') d = G.cps * 0.05;
        consider('u', u.id, c, d);
      });
      if (best && S.bank >= best.cost) { if (best.kind === 'b') buyBuilding(best.id); else buyUp(UPMAP[best.id]); return true; }
      return false;
    }
    for (let run = 0; run < RUNS; run++) {
      const marks = {}, eraT = {}, snap = [];
      let t = 0; const T = HOURS * 3600; let nextGold = 300;
      const thr = [1e6, 1e9, 1e12, 1e15, 1e18, 1e21];
      while (t < T) {
        const clickRate = t < 1800 ? 4 : 1;
        for (let k = 0; k < clickRate; k++) clickVessel(true);
        tick(1); t++;
        if (t >= nextGold) { S.goldClicks++; GOLD.goldEffect(0, 0); nextGold = t + U.rand(240, 720) / G.goldFreq / 0.75; }
        for (let g = 0; g < 4; g++) if (!ai(clickRate)) break;
        if (!eraT[S.era]) eraT[S.era] = t;
        thr.forEach(v => { if (!marks[v] && S.runEarned >= v) marks[v] = t; });
        if (t % 3600 === 0) snap.push(fmtT(t) + ' cps=' + fmt(G.cps) + ' bâtiments=' + G.totalB + ' amélios=' + G.upCount + ' succès=' + G.achN + ' ère=' + (S.era + 1) + ' nobel(dispo)=' + pendingNobels());
        if (run < RUNS - 1 && pendingNobels() >= Math.max(3, S.nobels) && t > 1800) break;
      }
      out.push('=== Partie ' + (run + 1) + ' (Nobels au départ : ' + S.nobels + ', durée simulée ' + fmtT(t) + ') ===');
      out.push('Ères : ' + Object.keys(eraT).map(e => 'É' + (+e + 1) + '@' + fmtT(eraT[e])).join(' '));
      out.push('Seuils : ' + Object.keys(marks).map(v => (+v).toExponential(0) + '@' + fmtT(marks[v])).join(' '));
      snap.forEach(s => out.push('  ' + s));
      out.push('Bâtiments : ' + B_IDS.filter(id => n(id)).map(id => id + ':' + n(id)).join(' '));
      if (run < RUNS - 1) {
        const g = publish();
        // dépense les points Nobel : nœuds les moins chers d'abord
        let bought = true; while (bought) { bought = false; const av = PRESTIGE.filter(q => !S.prestige[q.id] && (!q.req || S.prestige[q.req]) && S.nobelPts >= q.cost).sort((a, b) => a.cost - b.cost); if (av.length) { buyNode(av[0].id); bought = true; } }
        out.push('Publication : +' + g + ' Nobel. Nœuds : ' + Object.keys(S.prestige).join(','));
      }
    }
    return out;
  }, [HOURS, RUNS]);
  console.log(res.join('\n'));
  await browser.close();
})();
