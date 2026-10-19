#!/usr/bin/env node
// Plusieurs parties d'affilée avec un joueur « occasionnel » qui PUBLIE quand il stagne : mesure la plus longue
// attente sans nouveauté (nouveau bâtiment dans la partie, nouvelle ère, publication).
// Usage : NODE_PATH=$(npm root -g) node _dev/labo/tools/sim_parties.js [heures=12] [fichier]
//         RYTHME='{"cpsF":1.4,"from":4,"to":11,"nobelBase":5e9,"nobelSqrt":true,"stall":25}'
'use strict';
const { chromium } = require('playwright');
const path = require('path');
const HOURS = +(process.argv[2] || 12);
const FILE = path.resolve(process.argv[3] || path.join(__dirname, '../../../labo/index.html'));
const OVR = process.env.RYTHME ? JSON.parse(process.env.RYTHME) : {};
const PROF = process.env.PROFIL ? JSON.parse(process.env.PROFIL) : { c1: 2, c2: 0.3, gold: 0.4 };
(async () => {
  const browser = await chromium.launch(), page = await browser.newPage();
  page.on('pageerror', e => console.log('pageerror', e.message));
  await page.goto('file://' + FILE); await page.waitForTimeout(1500);
  const res = await page.evaluate(([HOURS, OVR, PROF]) => {
    closeModal(); G.ready = false; S.set.sound = false;
    if (OVR.cpsF) BUILDINGS.forEach((b, i) => { if (i >= OVR.from) b.cps *= Math.pow(OVR.cpsF, Math.min(i, OVR.to || 99) - OVR.from + 1); });
    if (OVR.cps) BUILDINGS.forEach((b, i) => { if (OVR.cps[i]) b.cps = OVR.cps[i]; });
    if (OVR.cost) { BUILDINGS.forEach((b, i) => { if (OVR.cost[i]) b.cost = OVR.cost[i]; });
      UPGRADES.forEach(u => { if (u.type === 'tier' && u.b !== 'pipette') u.cost = BMAP[u.b].cost * TIER_MULT[u.k]; if (u.type === 'spec') u.cost = BMAP[u.b].cost * 50; if (u.type === 'syn') u.cost = BMAP[u.c].cost * 30; }); }
    if (OVR.nobelBase) nobelsFor = all => Math.floor(Math.cbrt(all / OVR.nobelBase) + 1e-9);
    if (OVR.nobelSqrt) nobelBonusN = () => (Math.sqrt(1 + S.nobels) - 1) * 100;
    if (OVR.softcap) nobelBonusN = () => S.nobels <= OVR.softcap ? S.nobels : OVR.softcap * Math.sqrt(S.nobels / OVR.softcap);
    if (OVR.nobelPiece) { const orig = nobelBonusN; nobelBonusN = () => { const N = S.nobels; return OVR.nobelPiece * Math.min(N, 10) + (N > 10 ? orig() - 10 : 0); }; }
    if (OVR.offline) offlineParams = () => [OVR.offline[0], OVR.offline[1] * 3600];
    recalc();
    function deltaCps(apply, undo) { const before = G.cps; apply(); recalc(); const d = G.cps - before; undo(); recalc(); return d; }
    function ai(clickRate) {
      let best = null;
      const consider = (kind, id, cost, delta) => { if (!(delta > 0) || !isFinite(cost)) return; const score = Math.max(0, cost - S.bank) / Math.max(G.cps, 0.1) + cost / delta; if (!best || score < best.score) best = { kind, id, cost, score }; };
      B_IDS.forEach(id => { if (bLimit(id) <= 0) return; consider('b', id, bCost(id), deltaCps(() => S.b[id] = n(id) + 1, () => S.b[id] = n(id) - 1)); });
      G.unlockedUps.forEach(u => { const c = upCost(u); let d = deltaCps(() => S.up[u.id] = 1, () => delete S.up[u.id]);
        if (u.type === 'clickpct' || (u.type === 'tier' && u.b === 'pipette')) { const cb = G.click; S.up[u.id] = 1; recalc(); d += (G.click - cb) * clickRate; delete S.up[u.id]; recalc(); }
        if (u.type === 'goldup') d = G.cps * 0.05; consider('u', u.id, c, d); });
      if (best && S.bank >= best.cost) { if (best.kind === 'b') buyBuilding(best.id); else buyUp(UPMAP[best.id]); return true; }
      return false;
    }
    const STALL = (OVR.stall || 20) * 60, T = HOURS * 3600, m = s => Math.round(s / 60);
    let t = 0, runStart = 0, nextGold = 300, lastNew = 0, worst = 0, gaps = [], runs = [], bestB = -1, bestEra = 0, seen = {};
    const ev = () => { gaps.push(m(t - lastNew)); worst = Math.max(worst, t - lastNew); lastNew = t; };
    while (t < T) {
      const rt = t - runStart, cr = rt < 1800 ? PROF.c1 : PROF.c2;
      G.clickAcc = (G.clickAcc || 0) + cr; while (G.clickAcc >= 1) { G.clickAcc -= 1; clickVessel(true); }
      tick(1); t++;
      if (t >= nextGold) { S.goldClicks++; GOLD.goldEffect(0, 0); nextGold = t + U.rand(240, 720) / G.goldFreq / PROF.gold; }
      for (let g = 0; g < 4; g++) if (!ai(cr)) break;
      B_IDS.forEach((id, i) => { if (n(id) && !seen[id]) { seen[id] = 1; ev(); if (i > bestB) bestB = i; } });
      // comme le conseil du jeu : stagnation + publication qui multiplie la production d'au moins ×1,5
      if (t - lastNew > STALL && (typeof publishGainRatio === 'function' && !OVR.cost ? publishGainRatio() >= 1.5 : pendingNobels() >= Math.max(1, Math.ceil(S.nobels * 0.5)))) {
        runs.push('partie ' + (runs.length + 1) + ' : ' + m(t - runStart) + ' min, jusqu’à ' + B_IDS[Object.keys(seen).length - 1] + ', +' + pendingNobels() + ' Nobel (total ' + (S.nobels + pendingNobels()) + ')');
        publish(); seen = {}; runStart = t; ev();
        let bought = true; while (bought) { bought = false; const av = PRESTIGE.filter(q => !S.prestige[q.id] && (!q.req || S.prestige[q.req]) && S.nobelPts >= q.cost).sort((a, b) => a.cost - b.cost); if (av.length) { buyNode(av[0].id); bought = true; } }
      }
    }
    runs.push('partie ' + (runs.length + 1) + ' (en cours) : ' + m(t - runStart) + ' min, jusqu’à ' + (B_IDS[Object.keys(seen).length - 1] || '-') + ', Nobels ' + S.nobels + ' (+' + pendingNobels() + ' dispo)');
    return runs.join('\n') + '\nAttentes (min) : ' + gaps.join(' ') + '\nPlus longue attente : ' + m(worst) + ' min ; actuelle : ' + m(t - lastNew) + ' min ; meilleur bâtiment : ' + B_IDS[bestB] + ' ; nœuds : ' + Object.keys(S.prestige).length;
  }, [HOURS, OVR, PROF]);
  console.log(res); await browser.close();
})();
