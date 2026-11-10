// Tests de bout en bout de Noëlombre, version « promenade » (lit index.html) :
//   NODE_PATH=$(npm root -g) node _dev/noelombre/tools/e2e.js
// Le rendu logiciel (SwiftShader) est très lent : on ATTEND des conditions au lieu de délais fixes.
const { chromium } = require('playwright'); const path = require('path');
const ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'];
let ok = 0, ko = 0;
const verif = (c, m) => { if (c) { ok++; console.log('  ✔ ' + m); } else { ko++; console.log('  ✘ ' + m); } };
(async () => {
  const b = await chromium.launch({ args: ARGS });
  const ctx = await b.newContext({ viewport: { width: 390, height: 760 }, hasTouch: true });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text().slice(0, 300)); });
  const url = 'file://' + path.resolve('index.html');
  const E = (f, a) => p.evaluate(f, a);
  const attendre = async (f, ms, a) => { const t0 = Date.now(); while (Date.now() - t0 < (ms || 20000)) { try { if (await E(f, a)) return true; } catch (e) { } await p.waitForTimeout(250); } return false; };
  // --- une ancienne sauvegarde (version « jeu ») ne doit rien casser ---
  await p.addInitScript(() => { if (!localStorage.getItem('noelombre.save.v1') && !sessionStorage.getItem('vu')) { sessionStorage.setItem('vu', '1'); localStorage.setItem('noelombre.save.v1', JSON.stringify({ v: 1, jeu: { graine: 4242, x: 10, y: 0, z: 2, yaw: 0, pitch: 0, bonbons: 55, chaleur: 40, niv: { lanterne: 2 }, quetes: [{ type: 'bonbons', n: 25, prog: 3 }], reg: { musique: true, mvol: 0.6, sons: true, svol: 0.8, qualite: 3 }, intro: true }, dev: false, god: false, last: Date.now() })); } });
  await p.goto(url);
  verif(await attendre(() => typeof JEU !== 'undefined' && S && JEU._etat().prete, 60000), 'démarrage avec une ancienne sauvegarde du jeu (sans erreur)');
  verif(await E(() => S.jeu.graine === 4242 && S.jeu.reg.qualite === 2 && Array.isArray(S.jeu.journal)), 'ancienne sauvegarde convertie (monde gardé, réglages bornés)');
  await E(() => { S.dev = true; confirmReset(); }); await p.click('#mbtns button >> nth=0');
  verif(await attendre(() => MODAL_OPEN && /Noëlombre/.test(document.getElementById('mtitle').textContent)), 'nouvelle promenade : introduction affichée');
  await p.click('#mbtns button'); await p.waitForTimeout(300);
  verif(await E(() => !MODAL_OPEN && S.jeu.intro === true), 'introduction fermée et retenue');
  verif(await E(() => !document.getElementById('hud') && !document.getElementById('mini') && !document.getElementById('bSaut') && getComputedStyle(document.getElementById('titreZone')).display === 'none'), 'aucune interface de jeu à l’écran (ni jauge, ni carte, ni boutons)');
  await E(() => { S.jeu.graine = 4242; JEU.recharger(); JEU._pr(0.7); });
  await attendre(() => JEU._etat().parcelles >= 9, 60000);
  // marcher (clavier)
  const p0 = await E(() => [JOUEUR.x, JOUEUR.z]);
  await p.keyboard.down('w'); await attendre(([x, z]) => Math.hypot(JOUEUR.x - x, JOUEUR.z - z) > 2, 20000, p0); await p.keyboard.up('w');
  verif(await E(([x, z]) => Math.hypot(JOUEUR.x - x, JOUEUR.z - z) > 2, p0), 'le clavier fait avancer');
  verif(await E(() => S.jeu.stats.distance > 1), 'distance comptée');
  // manette tactile + regard
  const cdp = await ctx.newCDPSession(p);
  const p1 = await E(() => [JOUEUR.x, JOUEUR.z]);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 90, y: 560 }] });
  for (let i = 1; i <= 6; i++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 90, y: 560 - i * 12 }] }); await p.waitForTimeout(40); }
  const marche = await attendre(([x, z]) => Math.hypot(JOUEUR.x - x, JOUEUR.z - z) > 1.5, 20000, p1);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  verif(marche, 'la manette tactile fait marcher');
  const y0 = await E(() => JOUEUR.yaw);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 300, y: 400 }] });
  for (let i = 1; i <= 5; i++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 300 - i * 15, y: 400 }] }); await p.waitForTimeout(30); }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  verif(await attendre(y => Math.abs(JOUEUR.yaw - y) > 0.1, 8000, y0), 'glisser à droite fait tourner la vue');
  // tape brève = éclat de la lanterne (et pas après un glissement)
  verif(await E(() => JEU._etat().eclat < 0.05), 'glisser pour regarder ne déclenche pas l’éclat');
  await p.touchscreen.tap(300, 420);
  verif(await attendre(() => JEU._etat().eclat > 0.2, 8000), 'une tape brève lance l’éclat de la lanterne');
  verif(await attendre(() => JEU._etat().fantomes >= 1, 8000), 'l’éclat révèle des fantômes');
  // lueur-guide puis découverte d'une merveille
  verif(await attendre(() => !!JEU._etat().guide, 10000), 'la lueur-guide a trouvé une merveille à montrer');
  const cible = await E(() => JEU._etat().guide);
  await E(c => { JEU._aller(c.cx, c.cz); JOUEUR.z += 6; }, cible);
  verif(await attendre(() => S.jeu.journal.length === 1, 30000), 'merveille découverte en arrivant (carnet : 1)');
  verif(await E(() => document.getElementById('banniere').classList.contains('vu') && document.getElementById('bTitre').textContent.length > 3), 'son titre s’affiche comme un carton de cinéma : « ' + (await E(() => document.getElementById('bTitre').textContent)) + ' »');
  // pioche : 9 merveilles d'affilée, toutes différentes
  for (let i = 0; i < 8; i++) { const n = await E(() => S.jeu.journal.length); await E(() => { const b = JEU._site(); JEU._aller(b.cx, b.cz); JOUEUR.z += 6; }); await attendre(n0 => S.jeu.journal.length > n0, 60000, n); }
  const jr = await E(() => S.jeu.journal.slice());
  const NJ = jr.length;
  verif(NJ >= 7 && new Set(jr).size === NJ, NJ + ' merveilles visitées, toutes différentes : ' + jr.join(', '));
  // musique : une pièce enregistrée joue, et le manège a sa propre musique quand on s'en approche
  verif(await attendre(() => !!AUDIO._musique().piece || AUDIO._musique().attente > 20, 90000), 'la musique enregistrée (MP3) se décode et joue');
  await E(() => { MONDE.essai = { cx: 6, cz: 6, type: 'carrousel' }; MONDE.viderCaches(); JEU._aller(6, 6); JOUEUR.z += 8; });
  verif(await attendre(() => /manege/.test(AUDIO._musique().boucles), 60000), 'près du carrousel, sa musique de manège se fait entendre');
  await E(() => { MONDE.essai = null; MONDE.viderCaches(); });
  // lanterne de carrefour qui se rallume toute seule
  await E(() => { const C = MONDE.C; for (let r = 1; r < 12; r++) for (let dz = -r; dz <= r; dz++) for (let dx = -r; dx <= r; dx++) { if (MONDE.relais(dx, dz) && !S.jeu.lanternes[MONDE.cle(dx, dz)]) { JOUEUR.x = dx * C + 2; JOUEUR.z = dz * C + 2; JOUEUR.y = MONDE.sol(JOUEUR.x, JOUEUR.z); window.__rel = MONDE.cle(dx, dz); return; } } });
  verif(await attendre(() => S.jeu.lanternes[window.__rel] === 1, 30000), 'une lanterne de carrefour se rallume à ton passage');
  // menu : Options, Carnet, réglages
  await p.tap('#btnOpts');
  verif(await attendre(() => MODAL_OPEN && document.querySelectorAll('.reg').length >= 10, 8000), 'le petit bouton de menu ouvre les Options');
  verif(await E(() => [...document.querySelectorAll('#mbtns button')].some(x => /Sauvegarder/.test(x.textContent))), 'bouton Sauvegarder présent dans le menu');
  await E(() => ui_carnet());
  verif(await E(() => MODAL_OPEN && document.querySelectorAll('.cur').length >= S.jeu.journal.length && new RegExp(S.jeu.journal.length + ' merveilles sur').test(document.getElementById('mbody').textContent)), 'Carnet : les merveilles vues y sont');
  await E(() => closeModal());
  for (const q of ['0', '2', 'auto']) { await E(q => ui_reglage('qualite', q), q); await attendre(() => JEU._etat().parcelles >= 5, 40000); }
  verif(errs.length === 0, 'changement de qualité d’image sans erreur');
  await E(() => { ui_reglage('guide', '0'); }); verif(await E(() => S.jeu.reg.guide === false), 'lueur-guide désactivable'); await E(() => { ui_reglage('guide', '1'); closeModal(); });
  // BURGER = mode esprit
  await E(() => { S.dev = false; S.god = false; openDev(); });
  await p.fill('#devCode', 'burger '); await p.press('#devCode', 'Enter');
  verif(await attendre(() => S.god === true && !document.getElementById('godBadge').hidden, 5000), 'code BURGER : mode esprit');
  await E(() => closeModal());
  verif(await attendre(() => !document.getElementById('vol').hidden, 8000), 'mode esprit : boutons monter / descendre visibles');
  const h0 = await E(() => JOUEUR.y);
  await p.keyboard.down(' '); const vole = await attendre(h => JOUEUR.y > h + 2, 20000, h0); await p.keyboard.up(' ');
  verif(vole, 'mode esprit : on vole');
  await E(() => { S.god = false; });
  // sauvegarde + rechargement
  await attendre(() => JOUEUR.sol, 20000);
  const avant = await E(() => { save(true); return { x: JOUEUR.x, z: JOUEUR.z, g: S.jeu.graine, j: S.jeu.journal.length, s: JSON.stringify(S.jeu.sites) }; });
  await p.reload();
  await attendre(() => typeof JEU !== 'undefined' && S && JEU._etat().prete, 60000);
  const apres = await E(() => ({ x: JOUEUR.x, z: JOUEUR.z, g: S.jeu.graine, j: S.jeu.journal.length, s: JSON.stringify(S.jeu.sites), intro: MODAL_OPEN }));
  verif(apres.g === avant.g && apres.j === avant.j && apres.s === avant.s && Math.hypot(apres.x - avant.x, apres.z - avant.z) < 1.5, 'sauvegarde et rechargement (position, monde, merveilles vues et à venir)');
  verif(!apres.intro, 'pas de nouvelle introduction après rechargement');
  // export / import
  const code = await E(() => kitExport(S)), NJ2 = await E(() => S.jeu.journal.length);
  await E(() => { S.jeu.journal = []; });
  await E(c => doImport('voici :\n' + c.slice(0, 20) + '\n' + c.slice(20) + ' merci'), code);
  verif(NJ2 >= NJ && await attendre(n => S.jeu.journal.length === n, 20000, NJ2), 'export puis import (texte collé abîmé)');
  // paysage
  await p.setViewportSize({ width: 844, height: 390 }); await p.waitForTimeout(3000);
  await E(() => { while (MODAL_OPEN) closeModal(); });
  await p.screenshot({ path: path.join(__dirname, '../preview/e2e_paysage.png'), timeout: 180000 });
  verif(await E(() => { const r = document.getElementById('btnOpts').getBoundingClientRect(); return r.right <= innerWidth && r.top >= 0; }), 'paysage : bouton de menu visible');
  const boite = await E(() => [...document.querySelectorAll('div')].filter(d => /^Erreur/.test(d.textContent)).map(d => d.textContent).join(' | '));
  if (boite) errs.push('BOÎTE : ' + boite);
  verif(errs.length === 0, 'aucune erreur JS' + (errs.length ? ' : ' + errs.slice(0, 5).join(' | ') : ''));
  console.log(ok + ' réussis, ' + ko + ' échoués');
  await b.close(); process.exit(ko ? 1 : 0);
})();
