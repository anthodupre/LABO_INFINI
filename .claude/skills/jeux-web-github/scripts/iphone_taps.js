#!/usr/bin/env node
// Vraies tapes « iPhone » sur des boutons, en mode Safari ET en mode écran d'accueil, portrait ET paysage.
// Usage : NODE_PATH=$(npm root -g) node iphone_taps.js jeu.html "#btnSave" "#btnOpts" ".tab" [--swipe=.page]
//           [--prep="js"] [--apres="closeModal()"] [--out=dossier]
// Pour chaque sélecteur : vraie tape (page.touchscreen.tap) au centre, puis vérifie que le geste est bien arrivé
// SUR cet élément (pointerdown ou click ; pas sur un toast, une bannière ou un élément par-dessus). Captures + erreurs JS.
// --prep  : JS exécuté une fois après le chargement (ex. fermer une modale d'accueil)
// --apres : JS exécuté après CHAQUE tape (ex. "closeModal()" pour refermer les Options avant la tape suivante)
// --swipe=.page : vrai glissement de doigt (CDP Input.dispatchTouchEvent) sur cette liste ; vérifie qu'elle défile
// et que la PAGE elle-même ne défile pas (sinon iOS décale tout et les boutons du haut ne répondent plus).
// Limite : env(safe-area-inset-*) vaut 0 dans Chromium (pas d'encoche simulée).
'use strict';
const { chromium } = require('playwright'), path = require('path'), fs = require('fs');
const args = process.argv.slice(2), file = path.resolve(args.find(a => /\.html?$/.test(a)));
const sels = args.filter(a => !/\.html?$/.test(a) && !a.startsWith('--'));
const swipe = (args.find(a => a.startsWith('--swipe=')) || '').slice(8);
const prep = (args.find(a => a.startsWith('--prep=')) || '').slice(7); // ex. --prep="closeModal()" (modale d'accueil)
const apres = (args.find(a => a.startsWith('--apres=')) || '').slice(8);
// captures hors du dépôt par défaut (sinon elles traînent comme fichiers non suivis)
const out = (args.find(a => a.startsWith('--out=')) || '--out=' + path.join(require('os').tmpdir(), 'iphone_taps')).slice(6);
fs.mkdirSync(out, { recursive: true });
const CASES = [
  ['safari-portrait', { width: 393, height: 659 }, false],
  ['accueil-portrait', { width: 393, height: 852 }, true],
  ['accueil-paysage', { width: 852, height: 393 }, true],
];
(async () => {
  const b = await chromium.launch(); let bad = 0;
  for (const [name, vp, standalone] of CASES) {
    const ctx = await b.newContext({ viewport: vp, screen: vp.width > vp.height ? { width: 852, height: 393 } : { width: 393, height: 852 }, hasTouch: true, isMobile: true });
    if (standalone) await ctx.addInitScript(() => Object.defineProperty(navigator, 'standalone', { get: () => true }));
    const p = await ctx.newPage(), errs = [];
    p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await p.goto('file://' + file); await p.waitForTimeout(1800);
    if (prep) { await p.evaluate(prep); await p.waitForTimeout(400); }
    await p.evaluate(() => { window.__hits = []; ['pointerdown', 'click'].forEach(t => document.addEventListener(t, e => window.__hits.push({ t, el: e.target }), true)); });
    const res = [];
    if (swipe) {
      let el = null, r = null; // premier élément VISIBLE correspondant
      for (const c of await p.$$(swipe)) { const bb = await c.boundingBox(); if (bb && bb.height > 20) { el = c; r = bb; break; } }
      if (!r) { res.push('glissement ' + swipe + ' : ABSENT'); bad++; }
      else {
        const x = r.x + r.width / 2, y0 = r.y + r.height * 0.8, cdp = await ctx.newCDPSession(p);
        const before = await el.evaluate(n => n.scrollTop);
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y: y0 }] });
        for (let i = 1; i <= 10; i++) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: y0 - i * r.height * 0.06 }] });
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await p.waitForTimeout(500);
        const after = await el.evaluate(n => ({ list: n.scrollTop, page: scrollY, max: n.scrollHeight - n.clientHeight }));
        const ok = after.page === 0 && (after.max <= 0 || after.list > before);
        if (!ok) bad++;
        res.push('glissement ' + swipe + ' : ' + (ok ? 'ok' : 'PROBLÈME') + ' (liste ' + before + ' -> ' + after.list + ' / ' + after.max + ', page ' + after.page + ')');
      }
    }
    for (const sel of sels) {
      const el = await p.$(sel); if (!el) { res.push(sel + ' : ABSENT'); bad++; continue; }
      const r = await el.boundingBox(); if (!r) { res.push(sel + ' : INVISIBLE'); bad++; continue; }
      await p.evaluate(() => { window.__hits = []; });
      await p.touchscreen.tap(r.x + r.width / 2, r.y + r.height / 2); await p.waitForTimeout(300);
      // le click doit arriver sur l'élément ; s'il n'y a pas de click (action au pointerdown + preventDefault), le pointerdown
      const ok = await p.evaluate(s => { const c = window.__hits.filter(h => h.t === 'click'), l = c.length ? c : window.__hits; return l.some(h => h.el.closest && h.el.closest(s)); }, sel);
      if (!ok) bad++;
      res.push(sel + ' : ' + (ok ? 'ok' : 'TAPE PERDUE (' + (await p.evaluate(() => { const h = window.__hits.filter(h => h.t === 'click').pop() || window.__hits[0], t = h && h.el; return t ? t.tagName + (t.id ? '#' + t.id : '') + (t.className ? '.' + String(t.className).split(' ')[0] : '') : 'aucun click'; })) + ')'));
      if (apres) { await p.evaluate(apres).catch(() => { }); await p.waitForTimeout(250); }
    }
    const h = await p.evaluate(() => ({ jeu: Math.round((document.querySelector('#app') || document.body).getBoundingClientRect().height), fenetre: innerHeight, defilement: scrollY }));
    await p.screenshot({ path: path.join(out, name + '.png') });
    console.log(name, JSON.stringify(h), '\n  ' + res.join('\n  '), errs.length ? '\n  ERREURS JS : ' + errs.join(' | ') : '');
    bad += errs.length; await ctx.close();
  }
  await b.close(); console.log(bad ? bad + ' PROBLÈME(S)' : 'OK : toutes les tapes arrivent, 0 erreur JS'); process.exit(bad ? 1 : 0);
})();
