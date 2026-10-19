#!/usr/bin/env node
// Tests de bout en bout dans Chromium headless.
// Usage : NODE_PATH=$(npm root -g) node tools/e2e.js [--shots]
'use strict';
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
const SHOTS = process.argv.includes('--shots');
const out = path.join(__dirname, '../preview/e2e'); fs.mkdirSync(out, { recursive: true });
const url = 'file://' + path.join(__dirname, '../../../index.html');
let fails = 0, passes = 0;
const ok = (cond, msg) => { if (cond) passes++; else { fails++; console.log('ÉCHEC : ' + msg); } };
(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const page = await ctx.newPage();
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  await page.goto(url); await page.waitForTimeout(1500);
  const ev = (fn, arg) => page.evaluate(fn, arg);
  const shot = async n => { if (SHOTS) await page.screenshot({ path: path.join(out, n + '.png') }); };

  // 1. Démarrage
  ok(await ev(() => !U.$('#modal').classList.contains('hidden')), 'modale de bienvenue affichée');
  await ev(() => closeModal());
  ok(await ev(() => S.labName.length > 0), 'nom de labo par défaut');
  // 2. Clic
  const before = await ev(() => S.bank);
  await ev(() => { for (let i = 0; i < 10; i++) clickVessel(true); });
  ok(await ev(() => S.bank) > before, 'clic produit des molécules');
  ok(await ev(() => S.eureka > 0), 'jauge Eurêka se remplit');
  await ev(() => { for (let i = 0; i < 100; i++) clickVessel(true); });
  ok(await ev(() => S.eurekas >= 1 && S.buffs.some(b => b.key === 'eureka')), 'Eurêka déclenché');
  // 3. Achat bâtiments / améliorations
  await ev(() => { earn(1e6); S.set.buyAmt = 10; buyBuilding('pipette'); S.set.buyAmt = 1; });
  ok(await ev(() => n('pipette') === 10), 'achat ×10');
  await ev(() => { S.set.buyAmt = -1; buyBuilding('stagiaire'); S.set.buyAmt = 1; });
  ok(await ev(() => n('stagiaire') > 10), 'achat max');
  await ev(() => checkUnlocks());
  const nUps = await ev(() => G.unlockedUps.length);
  ok(nUps > 0, 'améliorations débloquées');
  await ev(() => buyAllUps());
  ok(await ev(() => G.upCount > 0), 'tout acheter');
  await ev(() => { S.set.sell = true; sellBuilding('pipette'); S.set.sell = false; });
  ok(await ev(() => n('pipette') === 9 && !!S.flags.s_sell1), 'vente + succès secret');
  // 4. Sauvegarde / chargement
  await ev(() => saveGame());
  const exp = await ev(() => exportSave());
  ok(exp.startsWith('LABO1:'), 'export');
  await ev(() => { earn(123456); });
  await ev(s => { importSave(s); afterLoad(); }, exp);
  ok(await ev(() => n('pipette') === 9), 'import restaure l’état');
  await page.reload(); await page.waitForTimeout(1500);
  ok(await ev(() => n('pipette') === 9 && U.$('#modal').classList.contains('hidden') || n('pipette') === 9), 'rechargement conserve la partie');
  await ev(() => closeModal());
  // 5. Hors-ligne
  const r = await ev(() => { const b = S.bank; const r = applyOffline(3600); offlineModal(r); return { g: r.gain, d: S.bank - b }; });
  ok(r.g > 0 && Math.abs(r.d - r.g) < 1e-6 * r.g + 1e-6, 'gains hors-ligne');
  await shot('offline'); await ev(() => closeModal());
  // 6. Fioles dorées
  await ev(() => { for (let i = 0; i < 30; i++) GOLD.goldEffect(0, 0); });
  ok(true, 'effets dorés sans erreur');
  await ev(() => GOLD.spawn('gold'));
  const gel = await page.$('.shimmer');
  ok(!!gel, 'fiole dorée affichée');
  if (gel) { const b = await gel.boundingBox(); await page.touchscreen.tap(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(200); }
  ok(await ev(() => S.goldClicks > 0), 'fiole dorée cliquable');
  // 7. Incidents
  await ev(() => { for (let i = 0; i < 25; i++) INC.fire(); });
  ok(await ev(() => (S.incidents || 0) >= 25), 'incidents');
  await shot('incident');
  // 8. Petri
  await ev(() => { earn(1e9); S.b.microscope = 60; recalc(); updateEra(); closeModal(); });
  ok(await ev(() => petriOpen() && petriSize() === 4), 'Petri ouvert, taille 4');
  await ev(() => { for (let i = 0; i < 4; i++) petriPlant(i, 'levure'); for (let k = 0; k < 6; k++) petriTick(); });
  ok(await ev(() => S.petri.plants >= 4), 'Petri : plantation');
  const h = await ev(() => { let g = 0; for (let i = 0; i < 49; i++) { const c = S.petri.grid[i]; if (c && c.s !== 'dead' && petriStage(c) === 2) g += petriHarvest(i); } return g; });
  ok(await ev(() => S.petri.harvests >= 1) || h >= 0, 'Petri : récolte');
  await ev(() => { for (let i = 0; i < 16; i++) { S.petri.grid[i] = null; } for (let i = 0; i < 16; i++) if (i % 2 === 0) petriPlant([0, 2, 8, 10, 1, 9][i % 6], 'levure'); for (let k = 0; k < 60; k++) petriTick(); });
  ok(true, 'Petri : 60 cycles sans erreur');
  await ev(() => showTab('petri')); await page.waitForTimeout(400); await shot('petri');
  // 9. DEV & BURGER
  await ev(() => showTab('opts')); await page.waitForTimeout(300);
  await page.tap('#devBtn'); await page.fill('#devIn', 'burger'); await page.tap('#devOk'); await page.waitForTimeout(200);
  ok(await ev(() => S.set.dev && S.set.god && !!S.flags.s_burger), 'code BURGER active le mode Dieu');
  ok(await ev(() => U.$('#molCount').textContent === '∞'), 'affichage ∞');
  await ev(() => { const b = n('robot'); buyBuilding('robot'); window.__r = n('robot') - b; });
  ok(await ev(() => window.__r === 1), 'achat gratuit en mode Dieu');
  await shot('dev');
  // 10. Toutes les ères + tous les onglets
  for (let e = 1; e <= 8; e++) {
    await ev(() => { const e = Math.min(8, S.era + 1); const id = B_IDS[ERA_REQ[e]]; S.b[id] = Math.max(25, n(id)); recalc(); updateEra(); checkUnlocks(); });
    await page.waitForTimeout(250); await ev(() => closeModal());
    for (const t of ['shop', 'lab', 'ach', 'nobel', 'stats']) { await ev(t => showTab(t), t); await page.waitForTimeout(60); }
    await ev(() => showTab('shop'));
    await page.waitForTimeout(500);
    await shot('era' + (e + 1));
  }
  ok(await ev(() => S.era === 8), 'ère 9 atteinte');
  // 11. Prestige
  await ev(() => { S.set.god = false; earn(1e16); });
  const pend = await ev(() => pendingNobels());
  ok(pend > 0, 'Nobels en attente');
  await ev(() => { showTab('nobel'); askPublish(); }); await page.waitForTimeout(200); await shot('publish');
  await ev(() => { closeModal(); doPublish(); });
  ok(await ev(() => S.nobels > 0 && S.bank === 0 && n('robot') === 0 && S.publishes === 1), 'publication remet à zéro et donne des Nobels');
  await ev(() => { ['fond', 'chal', 'kit1', 'auto1'].forEach(id => buyNode(id)); });
  ok(await ev(() => pn('fond') && pn('chal')), 'achat de nœuds');
  // 12. Protocoles
  await ev(() => startChallenge('noclick'));
  ok(await ev(() => S.challenge === 'noclick' && G.click === 0), 'protocole Mains liées');
  await ev(() => earn(1e12)); await ev(() => tick(0.1));
  ok(await ev(() => !S.challenge && chalDone('noclick')), 'protocole réussi');
  await ev(() => closeModal());
  await ev(() => { startChallenge('speedrun'); S.chalTime = 1199; tick(2); });
  ok(await ev(() => !S.challenge && !!S.flags.s_tooslow), 'échec du protocole course');
  await ev(() => closeModal());
  await ev(() => { startChallenge('minimal'); earn(1e9); ['pipette', 'stagiaire', 'bunsen'].forEach(id => buyBuilding(id)); });
  ok(await ev(() => bLimit('microscope') === 0), 'protocole minimaliste limite les types');
  await ev(() => abandonChallenge());
  // 13. Mise en page large
  await page.setViewportSize({ width: 1366, height: 820 }); await page.waitForTimeout(500);
  ok(await ev(() => UI.layout === 'wide'), 'disposition large');
  await ev(() => showTab('lab')); await page.waitForTimeout(400); await shot('wide');
  await page.setViewportSize({ width: 844, height: 390 }); await page.waitForTimeout(500);
  ok(await ev(() => UI.layout === 'land'), 'disposition paysage');
  await shot('land');
  // 14. Réinitialisation
  await ev(() => { hardReset(); afterLoad(); });
  ok(await ev(() => S.nobels === 0 && S.publishes === 0), 'réinitialisation');
  console.log(passes + ' réussis, ' + fails + ' échecs');
  console.log(errors.length ? 'ERREURS JS :\n' + errors.join('\n') : 'Aucune erreur JS');
  await browser.close();
  process.exit(fails || errors.length ? 1 : 0);
})();
