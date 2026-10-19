#!/usr/bin/env node
// Galerie : capture la scène principale pour chaque ère (état propre). Usage : NODE_PATH=$(npm root -g) node tools/gallery.js [w] [h]
'use strict';
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
const W = +(process.argv[2] || 390), H = +(process.argv[3] || 844);
const out = path.join(__dirname, '../preview/gallery'); fs.mkdirSync(out, { recursive: true });
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  const errs = []; page.on('pageerror', e => errs.push(e.message));
  await page.goto('file://' + path.join(__dirname, '../../../labo/index.html')); await page.waitForTimeout(1500);
  for (let e = 0; e < 9; e++) {
    await page.evaluate(e => {
      closeModal(); INC.timer = 1e9; S.goldT = 1e9; S.storm = 0; GOLD.clearAll(); S.buffs = [];
      const upto = ERA_REQ[e];
      B_IDS.forEach((id, i) => { S.b[id] = i <= upto ? Math.max(1, 40 - i * 2) : 0; });
      S.era = 0; recalc(); updateEra(); closeModal(); S.eureka = 55; SCENE.dirtyBg = true;
      document.querySelectorAll('.toast').forEach(t => t.remove()); U.$('#incident').classList.remove('on');
    }, e);
    await page.waitForTimeout(1800);
    const pane = await page.$('#paneFlask');
    await pane.screenshot({ path: path.join(out, 'scene_' + W + '_era' + (e + 1) + '.png') });
  }
  console.log(errs.length ? errs.join('\n') : 'ok');
  await browser.close();
})();
