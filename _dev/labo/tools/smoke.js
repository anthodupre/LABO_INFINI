#!/usr/bin/env node
// Test de fumée : charge le jeu dans Chromium headless, capture erreurs et captures d'écran.
// Usage : NODE_PATH=$(npm root -g) node tools/smoke.js [outDir]
'use strict';
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
const out = process.argv[2] || path.join(__dirname, '../preview/smoke');
fs.mkdirSync(out, { recursive: true });
const url = 'file://' + path.join(__dirname, '../../../labo/index.html');
(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const run = async (name, viewport, fn) => {
    const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1, hasTouch: viewport.width < 900, isMobile: viewport.width < 900 });
    const page = await ctx.newPage();
    page.on('pageerror', e => errors.push(name + ' pageerror: ' + e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(name + ' console: ' + m.text()); });
    await page.goto(url);
    await page.waitForTimeout(1800);
    await fn(page);
    await ctx.close();
  };
  const shot = (page, n) => page.screenshot({ path: path.join(out, n + '.png') });
  await run('mobile', { width: 390, height: 844 }, async page => {
    await shot(page, '01_welcome');
    await page.evaluate(() => closeModal());
    const box = await page.evaluate(() => { const r = SCENE.cv.getBoundingClientRect(); const b = SCENE.info.box; return { x: r.left + (SCENE.vx + (b[0] + b[2]) / 2) * SCENE.P, y: r.top + (SCENE.vy + (b[1] + b[3]) / 2) * SCENE.P }; });
    for (let i = 0; i < 40; i++) { await page.touchscreen.tap(box.x, box.y); }
    await page.waitForTimeout(300);
    await shot(page, '02_clicked');
    await page.evaluate(() => { earn(5e4); });
    await page.waitForTimeout(500);
    for (let i = 0; i < 6; i++) await page.evaluate(() => { buyBuilding('pipette'); buyBuilding('stagiaire'); buyBuilding('bunsen'); });
    await page.waitForTimeout(600);
    await shot(page, '03_shop');
    await page.evaluate(() => { earn(1e9); for (let k = 0; k < 15; k++) B_IDS.slice(0, 8).forEach(id => buyBuilding(id)); });
    await page.waitForTimeout(1500);
    await page.evaluate(() => closeModal());
    await page.waitForTimeout(400);
    await shot(page, '04_era');
    for (const t of ['lab', 'petri', 'ach', 'nobel', 'stats', 'opts']) { await page.evaluate(t => showTab(t), t); await page.waitForTimeout(700); await shot(page, '05_tab_' + t); }
    await page.evaluate(() => { showTab('shop'); GOLD.spawn('gold'); });
    await page.waitForTimeout(800);
    await shot(page, '06_golden');
    const gel = await page.$('.shimmer');
    if (gel) { const r = await gel.boundingBox(); await page.touchscreen.tap(r.x + r.width / 2, r.y + r.height / 2); }
    await page.waitForTimeout(600);
    await shot(page, '07_golden_click');
    const st = await page.evaluate(() => ({ bank: S.bank, cps: G.cps, ach: Object.keys(S.ach).length, era: S.era, saved: !!localStorage.getItem(SAVE_KEY) }));
    console.log('mobile state', JSON.stringify(st));
  });
  await run('wide', { width: 1366, height: 820 }, async page => {
    await page.evaluate(() => { closeModal(); S.set.dev = true; S.set.god = true; for (let k = 0; k < 30; k++) B_IDS.forEach(id => buyBuilding(id)); });
    await page.waitForTimeout(1500);
    await page.evaluate(() => closeModal());
    await page.waitForTimeout(300);
    await shot(page, '10_wide_god');
    await page.evaluate(() => showTab('lab'));
    await page.waitForTimeout(800);
    await shot(page, '11_wide_lab');
  });
  await browser.close();
  console.log(errors.length ? 'ERREURS:\n' + errors.join('\n') : 'Aucune erreur JS');
})();
