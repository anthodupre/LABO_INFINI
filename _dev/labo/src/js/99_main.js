/* ===================== DÉMARRAGE & BOUCLE PRINCIPALE ===================== */
let ERR_SHOWN = false;
function showError(msg) {
  if (ERR_SHOWN) return; ERR_SHOWN = true;
  const d = document.createElement('div');
  d.style.cssText = 'position:fixed;left:8px;right:8px;bottom:8px;z-index:999;background:#3a1418;border:2px solid #e43b44;color:#ffd0d0;padding:8px;font:16px monospace;white-space:pre-wrap;max-height:40%;overflow:auto';
  d.textContent = 'Erreur : ' + msg + '\n(touchez pour fermer — votre partie est sauvegardée automatiquement)' + (typeof BUILD_ID !== 'undefined' ? '\nVersion du ' + BUILD_ID : '');
  d.onclick = () => d.remove();
  document.body.appendChild(d);
}
window.addEventListener('error', e => {
  // Erreurs venant d'extensions / scripts externes (Safari les masque en « Script error. ») : pas les nôtres, on les ignore
  const msg = e.message || '';
  if (!e.lineno || /^script error\.?$/i.test(msg.trim())) return;
  if (e.filename && e.filename.split('#')[0] !== location.href.split('#')[0] && !/labo-infini|index\.html/i.test(e.filename)) return;
  showError(msg + ' (ligne ' + e.lineno + ')');
});

function afterLoad() {
  NUM_FORMAT = S.set.format;
  S.set.sell = false;
  G.upsKey = ''; UI.selUp = null; UI.selCell = -1;
  recalc();
  S.era = Math.max(S.era, eraFromBuildings());
  if (S.era > S.eraMax) S.eraMax = S.era;
  checkUnlocks();
  GOLD.clearAll();
  SCENE.dirtyBg = true; NEWS.w = 0;
  if (LABV.cv) LABV.resize();
  UI.dirtyAll = true;
}
function welcome() {
  modal('Bienvenue au labo « ' + U.esc(S.labName) + ' » !', '<div class="era-art"><img src="' + GFX.url('v1', 0, 3, { liquid: ERA_STYLE[0].liq, tint: ERA_STYLE[0].acc }) + '" alt=""></div>' +
    '<p>Votre carrière scientifique commence dans un garage, avec une simple éprouvette.</p>' +
    '<p>• <b>Touchez le récipient</b> pour fabriquer des molécules (et remplir la jauge <b>Eurêka</b>).</p>' +
    '<p>• Achetez des <b>bâtiments</b> dans la boutique : ils produisent tout seuls, même quand vous êtes absent.</p>' +
    '<p>• Attrapez les <b>fioles dorées</b> qui apparaissent de temps en temps !</p>' +
    '<p>• Votre partie se sauvegarde toute seule. Le bouton disquette en haut force une sauvegarde.</p>' +
    '<p class="sub">Appui long (ou survol) sur un élément pour voir ses détails.</p>', [{ t: 'Au labo !', cls: 'gold' }]);
}
let lastWall = Date.now(), lastPerf = 0;
function loop(now) {
  try {
    const wall = Date.now();
    let wdt = (wall - lastWall) / 1000; lastWall = wall;
    let dt = lastPerf ? (now - lastPerf) / 1000 : 0.016; lastPerf = now;
    if (wdt > 5) { // retour après une suspension (application en arrière-plan…)
      const r = applyOffline(wdt);
      if (r && wdt > 60) offlineModal(r);
      dt = 0.016;
    }
    dt = U.clamp(dt, 0, 5);
    let rem = dt * (S.set.dev ? S.set.speed : 1);
    while (rem > 0) { const step = Math.min(rem, 0.5); tick(step); rem -= step; }
    S.lastTick = wall;
    SCENE.frame(Math.min(dt, 0.1));
    LABV.frame(dt);
    uiUpdate(dt);
  } catch (e) { showError(e.message + '\n' + (e.stack || '').split('\n').slice(0, 3).join('\n')); }
  requestAnimationFrame(loop);
}
function boot() {
  const loaded = loadGame();
  if (!S.labName) S.labName = U.pick(TX(() => TXT_LABNAMES, null) || ['Labo Infini']);
  NUM_FORMAT = S.set.format;
  U.$('#btnSave img').src = GFX.url('i_save', 0, 2);
  U.$('#btnOpts img').src = GFX.url('i_gear', 0, 2);
  U.$('#btnSave').onclick = () => { SFX.unlock(); if (saveGame(true)) SFX.play('save'); };
  U.$('#btnOpts').onclick = () => { SFX.unlock(); showTab('opts'); };
  U.$('#labName').onclick = () => { SFX.unlock(); askRename(); };
  U.$('#buyAll').onclick = () => { const k = buyAllUps(); if (k) toast(k + ' amélioration' + (k > 1 ? 's achetées' : ' achetée'), 'save'); };
  SCENE.init(); LABV.init();
  U.$('#page-lab').addEventListener('scroll', () => { LABV.acc = 1; }, { passive: true });
  UI.tab = S.set.tab || 'shop';
  if (UI.tab !== 'shop') UI.midTab = UI.tab;
  computeLayout();
  renderBuildings();
  afterLoad();
  checkAch(); // silencieux au démarrage
  G.ready = true;
  const away = loaded ? (Date.now() - S.lastTick) / 1000 : 0;
  if (loaded && away > 5) { const r = applyOffline(away); if (r && away > 60) offlineModal(r); }
  if (!loaded) {
    S.ach.aa0 = U.now();
    if (G.loadError) {
      modal('Sauvegarde illisible', '<p>Votre sauvegarde n\u2019a pas pu être lue. Une copie de secours a été conservée : copiez ce texte (Options › Importer pourra le relire plus tard).</p><textarea class="save" readonly id="corruptTxt"></textarea>', [{ t: 'Nouvelle partie', cls: 'gold' }]);
      const ta = U.$('#corruptTxt'); if (ta) ta.value = store.get('laboInfini.corrupt.v1') || '';
    } else welcome();
    saveGame();
  }
  if (!store.probe()) setTimeout(() => modal('Stockage indisponible', '<p>Ce navigateur ne permet pas d\u2019enregistrer la partie automatiquement. Pensez à <b>exporter</b> régulièrement votre partie (Options › Exporter › Télécharger).</p>', null, true), 800);
  lastWall = Date.now();
  window.addEventListener('resize', () => { clearTimeout(boot.rt); boot.rt = setTimeout(computeLayout, 120); });
  window.addEventListener('orientationchange', () => setTimeout(computeLayout, 300));
  document.addEventListener('visibilitychange', () => { if (document.hidden) saveGame(); else lastWall = Math.min(lastWall, Date.now()); });
  window.addEventListener('pagehide', () => saveGame());
  window.addEventListener('beforeunload', () => saveGame());
  document.addEventListener('pointerdown', e => { SFX.unlock(); if (UI.tipEl && !UI.tipEl.contains(e.target) && e.target.id !== 'scene') hideTip(); }, true);
  document.addEventListener('gesturestart', e => e.preventDefault());
  // iOS : après la fermeture du clavier, la page peut rester décalée -> on la remet en place UNE fois
  // (ne JAMAIS mettre body en position fixe, boucler sur scrollTo ni bloquer touchmove : bande vide en bas ou
  // boutons morts sur iPhone — voir le skill jeux-web-github, references/ios-webapp.md)
  document.addEventListener('focusout', () => setTimeout(() => { if (window.scrollY || window.scrollX) window.scrollTo(0, 0); }, 120));
  ['touchend', 'click', 'keydown'].forEach(t => document.addEventListener(t, () => SFX.unlock(), { capture: true, passive: true }));
  MUSIC.start();
  document.addEventListener('visibilitychange', () => { if (!document.hidden) SFX.unlock(); });
  setInterval(() => saveGame(false), 30000);
  [300, 1200, 3000].forEach(ms => setTimeout(() => { fixStandaloneHeight(); SCENE.resize(); LABV.resize(); }, ms));
  requestAnimationFrame(loop);
  const b = U.$('#boot'); b.classList.add('out'); setTimeout(() => b.remove(), 500);
}
function startWhenReady() {
  const go = () => { try { boot(); } catch (e) { showError(e.message + '\n' + (e.stack || '').split('\n').slice(0, 4).join('\n')); } };
  if (document.fonts && document.fonts.ready) { let done = false; const f = () => { if (!done) { done = true; go(); } }; document.fonts.ready.then(f); setTimeout(f, 1500); }
  else go();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startWhenReady); else startWhenReady();
