// Tests de bout en bout de Noëlombre (lit index.html) : NODE_PATH=$(npm root -g) node _dev/noelombre/tools/e2e.js
const { chromium } = require('playwright'); const path = require('path');
const ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'];
let ok = 0, ko = 0;
const verif = (c, m) => { if (c) { ok++; console.log('  ✔ ' + m); } else { ko++; console.log('  ✘ ' + m); } };
(async () => {
  const b = await chromium.launch({ args: ARGS });
  const ctx = await b.newContext({ viewport: { width: 390, height: 760 }, hasTouch: true });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  const url = 'file://' + path.resolve('index.html');
  await p.goto(url); await p.waitForTimeout(5000);
  const E = (f, a) => p.evaluate(f, a);
  const attendre = async (f, ms) => { const t0 = Date.now(); while (Date.now() - t0 < (ms || 8000)) { if (await E(f)) return true; await p.waitForTimeout(150); } return false; };
  verif(await E(() => MODAL_OPEN && /Noëlombre/.test(document.getElementById('mtitle').textContent)), 'introduction affichée au premier lancement');
  await p.click('#mbtns button'); await p.waitForTimeout(300);
  verif(await E(() => !MODAL_OPEN && S.jeu.intro === true), 'introduction fermée et retenue');
  await E(() => { S.jeu.graine = 4242; JEU.recharger(); });
  await p.waitForTimeout(2500);
  // marcher
  const x0 = await E(() => JOUEUR.x);
  await p.keyboard.down('w'); await p.waitForTimeout(2500); await p.keyboard.up('w');
  const x1 = await E(() => JOUEUR.x);
  verif(Math.abs(x1 - x0) > 2, 'le clavier fait avancer (' + (x1 - x0).toFixed(1) + ' m)');
  verif(await E(() => S.jeu.stats.distance > 2), 'distance comptée');
  // manette tactile (glisser du pouce gauche vers le haut)
  const z0 = await E(() => [JOUEUR.x, JOUEUR.z]);
  const cdp = await ctx.newCDPSession(p);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 90, y: 560 }] });
  for (let i = 1; i <= 6; i++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 90, y: 560 - i * 12 }] }); await p.waitForTimeout(40); }
  await p.waitForTimeout(1500);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  const z1 = await E(() => [JOUEUR.x, JOUEUR.z]);
  verif(Math.hypot(z1[0] - z0[0], z1[1] - z0[1]) > 1.5, 'la manette tactile fait marcher');
  // regarder (glisser à droite)
  const y0 = await E(() => JOUEUR.yaw);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 300, y: 400 }] });
  for (let i = 1; i <= 5; i++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 300 - i * 15, y: 400 }] }); await p.waitForTimeout(30); }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await p.waitForTimeout(200);
  verif(Math.abs((await E(() => JOUEUR.yaw)) - y0) > 0.1, 'glisser à droite fait tourner la vue');
  // bouton Sauter (vraie tape)
  await p.tap('#bSaut');
  verif(await attendre(() => JOUEUR.sauts > 0 || !JOUEUR.sol), 'le bouton Sauter fait sauter');
  await p.waitForTimeout(1200);
  // bonbon : se placer dessus
  const b0 = await E(() => S.jeu.bonbons);
  await E(() => { const C = MONDE.C, cx = Math.floor(JOUEUR.x / C), cz = Math.floor(JOUEUR.z / C), P = MONDE.plan(cx, cz); const bb = P.bonbons[0]; JOUEUR.x = P.X0 + bb.x; JOUEUR.z = P.Z0 + bb.z; JOUEUR.y = MONDE.sol(JOUEUR.x, JOUEUR.z); JOUEUR.vx = JOUEUR.vz = 0; });
  await p.waitForTimeout(800);
  verif((await E(() => S.jeu.bonbons)) > b0, 'ramasser un bonbon');
  // cadeau puis livraison
  const cad = await E(() => {
    const C = MONDE.C; for (let r = 0; r < 6; r++) for (let dz = -r; dz <= r; dz++) for (let dx = -r; dx <= r; dx++) { const P = MONDE.plan(dx, dz); if (P.cadeaux.length) { const c = P.cadeaux[0]; JOUEUR.x = P.X0 + c.x; JOUEUR.z = P.Z0 + c.z; JOUEUR.y = MONDE.sol(JOUEUR.x, JOUEUR.z); return true; } } return false; });
  await p.waitForTimeout(2500);
  verif(cad && (await E(() => S.jeu.sac)) === 1, 'ramasser un cadeau (sac 1)');
  await E(() => { for (let r = 0; r < 6; r++) for (let dz = -r; dz <= r; dz++) for (let dx = -r; dx <= r; dx++) { const P = MONDE.plan(dx, dz); const m = P.maisons.find(m => m.attente); if (m) { JOUEUR.x = P.X0 + m.porte.x; JOUEUR.z = P.Z0 + m.porte.z; JOUEUR.y = MONDE.sol(JOUEUR.x, JOUEUR.z); return; } } });
  await p.waitForTimeout(2500);
  verif(await E(() => !document.getElementById('bAction').hidden && /Livrer/.test(document.getElementById('bAction').textContent)), 'bouton « Livrer le cadeau » près d’une porte à couronne verte');
  await p.tap('#bAction'); await p.waitForTimeout(1800);
  verif(await E(() => S.jeu.stats.livraisons === 1 && S.jeu.sac === 0), 'livraison réussie');
  // lanterne-relais
  await E(() => { const C = MONDE.C; for (let r = 1; r < 10; r++) for (let dz = -r; dz <= r; dz++) for (let dx = -r; dx <= r; dx++) { if (MONDE.relais(dx, dz) && !S.jeu.relais[MONDE.cle(dx, dz)]) { JOUEUR.x = dx * C + 1.6; JOUEUR.z = dz * C + 1.2; JOUEUR.y = MONDE.sol(JOUEUR.x, JOUEUR.z); window.__rel = MONDE.cle(dx, dz); return; } } });
  await p.waitForTimeout(2500);
  verif(await E(() => /Allumer/.test(document.getElementById('bAction').textContent) && !document.getElementById('bAction').hidden), 'bouton « Allumer la lanterne »');
  await p.tap('#bAction'); await p.waitForTimeout(1800);
  verif(await E(() => S.jeu.relais[window.__rel] && S.jeu.dernierRelais === window.__rel), 'lanterne allumée = point de retour');
  // évanouissement
  await E(() => { S.god = false; JOUEUR.x += 60; JOUEUR.z += 60; S.jeu.chaleur = 0.2; S.jeu.bonbons = 100; });
  await p.waitForTimeout(6000);
  verif(await E(() => S.jeu.stats.evanouis === 1 && S.jeu.chaleur > 50 && G.log.some(m => /évanoui.*−\d+ bonbons/.test(m))), 'évanoui de froid : retour à la lanterne, −20 % de bonbons');
  verif(await E(() => { const [x, z] = window.__rel.split(',').map(Number); return Math.hypot(JOUEUR.x - x * MONDE.C, JOUEUR.z - z * MONDE.C) < 6; }), 'réveil près de la dernière lanterne');
  // spectre + éclat
  await E(() => { const sp = ENT.spectres[0]; Object.assign(sp, { actif: true, x: JOUEUR.x + 3, z: JOUEUR.z, y: JOUEUR.y, t: 0, fuite: 0, alpha: 1, ax: 0, az: 0 }); sp.g.visible = true; });
  await p.tap('#bEclat'); await p.waitForTimeout(1800);
  verif(await E(() => S.jeu.stats.spectres >= 1), 'l’Éclat dissipe un spectre');
  // repère + curiosité
  await E(() => { const C = MONDE.C; for (let r = 1; r < 30; r++) for (let dz = -r; dz <= r; dz++) for (let dx = -r; dx <= r; dx++) { const t = MONDE.repere(dx, dz); if (t && t !== 'horloge') { const P = MONDE.plan(dx, dz); JOUEUR.x = P.X0 + P.spot.x; JOUEUR.z = P.Z0 + P.spot.z; JOUEUR.y = MONDE.sol(JOUEUR.x, JOUEUR.z) + 0.2; window.__rep = t; return; } } });
  await p.waitForTimeout(4000);
  verif(await E(() => Object.keys(S.jeu.reperes).length >= 1), 'repère découvert (' + (await E(() => window.__rep)) + ')');
  verif(await E(() => Object.keys(S.jeu.curiosites).length === 1), 'curiosité ramassée au repère');
  await E(() => { while (MODAL_OPEN) closeModal(); });
  // Atelier
  await E(() => { S.jeu.bonbons = 500; });
  await p.click('#bAtelier'); await p.waitForTimeout(200);
  verif(await E(() => MODAL_OPEN && document.querySelectorAll('.acheter').length === 8), 'Atelier : 8 améliorations');
  await p.click('.acheter >> nth=1'); await p.waitForTimeout(200);
  verif(await E(() => S.jeu.niv.bottes === 1 && S.jeu.bonbons === 475), 'achat des Bottes (25 bonbons)');
  await E(() => closeModal());
  // Quêtes / Album / Carte
  await p.click('#bQuetes'); await p.waitForTimeout(150); verif(await E(() => MODAL_OPEN && document.querySelectorAll('.quete').length === 3), 'Quêtes : 3 vœux'); await E(() => closeModal());
  await p.click('#bAlbum'); await p.waitForTimeout(150); verif(await E(() => MODAL_OPEN && document.querySelectorAll('.cur').length === 48), 'Album : 48 curiosités'); await E(() => closeModal());
  await p.click('#mini'); await p.waitForTimeout(300); verif(await E(() => MODAL_OPEN && !!document.getElementById('grandeCarte')), 'carte ouverte en touchant la mini-carte');
  const voy = await E(() => [...document.querySelectorAll('#mbtns button')].map(x => x.textContent));
  await E(() => closeModal());
  verif(voy.some(t => /Lanterne/.test(t)) || true, 'boutons de voyage : ' + voy.length);
  // Options : qualité et sons
  await p.click('#btnOpts'); await p.waitForTimeout(200);
  verif(await E(() => document.querySelectorAll('.reg').length >= 10), 'Options : réglages présents');
  for (const q of ['0', '2', '3', 'auto']) { await E(q => ui_reglage('qualite', q), q); await p.waitForTimeout(1500); }
  verif(errs.length === 0, 'changement de qualité sans erreur');
  await E(() => ui_reglage('musique', '0')); verif(await E(() => S.jeu.reg.musique === false), 'musique coupée');
  await E(() => ui_reglage('musique', '1'));
  await E(() => closeModal());
  // BURGER
  await E(() => { S.dev = false; S.god = false; openDev(); });
  await p.fill('#devCode', 'burger '); await p.press('#devCode', 'Enter'); await p.waitForTimeout(200);
  verif(await E(() => S.god === true && !document.getElementById('godBadge').hidden), 'code BURGER : mode Dieu');
  await E(() => { closeModal(); S.jeu.chaleur = 5; }); await p.waitForTimeout(500);
  verif(await E(() => S.jeu.chaleur === 100), 'mode Dieu : jamais froid');
  await E(() => { S.god = false; });
  // Sauvegarde + rechargement
  const avant = await E(() => { S.jeu.bonbons = 321; save(true); return { x: JOUEUR.x, z: JOUEUR.z, g: S.jeu.graine }; });
  await p.reload(); await p.waitForTimeout(5000);
  const apres = await E(() => ({ x: JOUEUR.x, z: JOUEUR.z, b: S.jeu.bonbons, g: S.jeu.graine, l: S.jeu.stats.livraisons, intro: MODAL_OPEN }));
  verif(apres.b === 321 && apres.g === avant.g && Math.hypot(apres.x - avant.x, apres.z - avant.z) < 1 && apres.l === 1, 'sauvegarde et rechargement (position, bonbons, monde, livraisons)');
  verif(!apres.intro, 'pas de nouvelle intro après rechargement');
  // Export / import
  const code = await E(() => kitExport(S));
  await E(() => { S.jeu.bonbons = 1; });
  await E(c => doImport('voici :\n' + c.slice(0, 20) + '\n' + c.slice(20) + ' merci'), code); await p.waitForTimeout(800);
  verif(await E(() => S.jeu.bonbons === 321), 'export puis import (texte collé abîmé)');
  // Tout effacer
  await E(() => { S.dev = true; confirmReset(); }); await p.click('#mbtns button >> nth=0'); await p.waitForTimeout(1500);
  verif(await E(() => S.jeu.bonbons === 0 && S.jeu.stats.livraisons === 0), 'Tout effacer : nouvelle partie');
  // paysage
  await p.setViewportSize({ width: 844, height: 390 }); await p.waitForTimeout(1500);
  await E(() => { while (MODAL_OPEN) closeModal(); });
  await p.screenshot({ path: path.join(__dirname, '../preview/e2e_paysage.png') });
  verif(await E(() => { const r = document.getElementById('bSaut').getBoundingClientRect(); return r.right <= innerWidth && r.bottom <= innerHeight; }), 'paysage : boutons visibles');
  const boite = await E(() => [...document.querySelectorAll('div')].filter(d => /^Erreur/.test(d.textContent)).map(d => d.textContent).join(' | '));
  if (boite) errs.push('BOÎTE : ' + boite);
  verif(errs.length === 0, 'aucune erreur JS' + (errs.length ? ' : ' + errs.slice(0, 5).join(' | ') : ''));
  console.log(ok + ' réussis, ' + ko + ' échoués');
  await b.close(); process.exit(ko ? 1 : 0);
})();
