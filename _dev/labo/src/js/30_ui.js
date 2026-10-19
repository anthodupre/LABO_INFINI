/* ===================== INTERFACE ===================== */
const UI = {
  dirtyUps: true, dirtyBuffs: true, dirtyAch: true, dirtyPetri: true, dirtyAll: true,
  layout: 'port', tab: 'shop', midTab: 'lab', selUp: null, selAch: null, selNode: null, selCell: -1,
  bEls: {}, tipFn: null, tipEl: null, logoClicks: 0, acc: 0, slowAcc: 0,
};
const TABS = [
  { id: 'shop', label: 'Boutique', icon: 'i_shop' }, { id: 'lab', label: 'Labo', icon: 'i_lab' }, { id: 'petri', label: 'Petri', icon: 'i_petri' },
  { id: 'ach', label: 'Succès', icon: 'i_trophy' }, { id: 'nobel', label: 'Nobel', icon: 'i_nobel' }, { id: 'stats', label: 'Stats', icon: 'i_stats' },
  { id: 'opts', label: 'Options', icon: 'i_gear' },
];
const molIco = () => '<img class="molIco" src="' + GFX.url('p_mol', 0, 2) + '" alt="">';

/* ---------- Journal du labo (messages relisibles) ---------- */
function journal(kind, html) {
  if (!S.journal) S.journal = [];
  S.journal.unshift({ t: U.now(), k: kind, h: html });
  if (S.journal.length > 40) S.journal.length = 40;
  UI.journalDirty = true;
}
function journalHtml() {
  const J = S.journal || [];
  if (!J.length) return '<div class="sub">Rien à signaler… pour l\u2019instant.</div>';
  const lbl = { inc: '⚠ Incident', gold: '★ Fiole', ach: '🏆 Succès', era: '✦ Ère', petri: '✿ Petri', chal: '✔ Protocole', nobel: '🏅 Conseil' };
  return J.map(e => '<div class="jr"><span class="jk jk-' + e.k + '">' + (lbl[e.k] || '•') + '</span> <span class="sub">il y a ' + fmtTime((U.now() - e.t) / 1000) + '</span><div>' + e.h + '</div></div>').join('');
}
/* ---------- Notifications ---------- */
function toast(html, kind = '', icon = null, title = null, ms = 0) {
  const box = U.$('#toasts'); if (!box) return;
  const t = U.el('div', 'toast ' + kind);
  t.innerHTML = (icon ? '<img src="' + GFX.url(icon, 0, 3) + '" alt="">' : '') + '<div>' + (title ? '<div class="tt">' + title + '</div>' : '') + '<div>' + html + '</div></div>';
  box.appendChild(t);
  while (box.children.length > 3) box.removeChild(box.firstChild);
  let done = false;
  const kill = () => { if (done) return; done = true; t.classList.add('out'); setTimeout(() => t.remove(), 300); };
  setTimeout(kill, ms || (kind === 'ach' ? 6500 : 5000));
}
function achToast(a) {
  toast('<b>' + U.esc(a.name) + '</b>', 'ach', a.icon, 'Succès débloqué');
  journal('ach', '<b>' + U.esc(a.name) + '</b> — ' + (a.secret ? (a.desc() || '') : a.desc()));
  SFX.play('ach');
  markTab('ach');
}
const MODALQ = [];
function modal(title, html, buttons, queue) {
  if (queue && modalOpen()) { MODALQ.push([title, html, buttons]); return null; }
  const m = U.$('#modal');
  m.querySelector('.mtitle').innerHTML = title;
  m.querySelector('.mbody').innerHTML = html;
  const bb = m.querySelector('.mbtns'); bb.innerHTML = '';
  (buttons || [{ t: 'OK' }]).forEach(b => {
    const e = U.el('button', 'btn ' + (b.cls || ''), b.t);
    e.onclick = () => { if (b.fn && b.fn() === false) return; if (!b.keep) closeModal(); };
    bb.appendChild(e);
  });
  m.classList.remove('hidden');
  hideTip();
  return m.querySelector('.mbody');
}
function closeModal() {
  U.$('#modal').classList.add('hidden');
  const nx = MODALQ.shift(); if (nx) setTimeout(() => modal(nx[0], nx[1], nx[2]), 80);
}
function modalOpen() { return !U.$('#modal').classList.contains('hidden'); }
let POPS = 0;
function popText(x, y, txt, cls = '') {
  if (POPS > 24) return;
  const fx = U.$('#fx'), r = fx.getBoundingClientRect();
  const p = U.el('div', 'pop ' + cls); p.textContent = txt;
  p.style.left = (x - r.left + U.rand(-10, 10)) + 'px'; p.style.top = (y - r.top) + 'px';
  fx.appendChild(p); POPS++;
  setTimeout(() => { p.remove(); POPS--; }, 1000);
}
function sparkleAt(x, y, k) {
  if (!S.set.particles) return;
  const fx = U.$('#fx'), r = fx.getBoundingClientRect();
  const cols = ['#fee761', '#ffffff', '#feae34', '#2ce8f5'];
  for (let i = 0; i < k; i++) {
    const s = U.el('div', 'spark');
    const a = Math.random() * Math.PI * 2, d = U.rand(30, 90);
    s.style.left = (x - r.left) + 'px'; s.style.top = (y - r.top) + 'px'; s.style.background = U.pick(cols);
    s.style.setProperty('--dx', Math.cos(a) * d + 'px'); s.style.setProperty('--dy', Math.sin(a) * d + 'px');
    fx.appendChild(s); setTimeout(() => s.remove(), 700);
  }
}
let bigTimer = null;
function bigText(t, color = '#fff', sub = '') {
  const b = U.$('#bigText');
  b.querySelector('.t').textContent = t; b.querySelector('.t').style.color = color;
  b.querySelector('.s').textContent = sub || '';
  b.classList.remove('on'); void b.offsetWidth; b.classList.add('on');
  clearTimeout(bigTimer); bigTimer = setTimeout(() => b.classList.remove('on'), 4600);
}
function flashScreen(color) {
  const f = U.$('#flash'); f.style.background = color;
  f.classList.remove('on'); void f.offsetWidth; f.classList.add('on');
}
function eraAnnounce(e, first) {
  SFX.play('era');
  journal('era', '<b>' + U.esc(ERAS[e].name) + '</b> — ' + U.esc(ERAS[e].q));
  if (S.set.flash) flashScreen(ERA_STYLE[e].glow);
  if (first) {
    const v = VESSELS[VESSEL_OF_ERA[e]];
    modal('Nouvelle ère !', '<div class="era-art"><img src="' + GFX.url(v.sprite, 0, 3, { liquid: ERA_STYLE[e].liq, tint: ERA_STYLE[e].acc }) + '" alt=""></div>' +
      '<p class="big">' + U.esc(ERAS[e].name) + '</p><p class="center">' + U.esc(ERAS[e].q) + '</p>' +
      (VESSEL_OF_ERA[e] !== VESSEL_OF_ERA[e - 1] ? '<p class="center sub">Votre récipient évolue : <b>' + U.esc(v.name) + '</b></p>' : ''), [{ t: 'Incroyable !', cls: 'gold' }], true);
  } else toast('Vous entrez dans <b>' + U.esc(U.art(ERAS[e].name)) + '</b>', 'era', 'i_star', 'Nouvelle ère');
}

/* ---------- Anti-clic fantôme ---------- */
let TAP_BLOCK = 0;
function blockTaps(ms) { TAP_BLOCK = Math.max(TAP_BLOCK, performance.now() + ms); }
function tapsBlocked() { return performance.now() < TAP_BLOCK; }
document.addEventListener('click', e => { if (tapsBlocked() && !(e.target.closest && e.target.closest('.shimmer'))) { e.preventDefault(); e.stopPropagation(); } }, true);
/* ---------- Infobulles ---------- */
function showTip(fn, anchor) {
  const tip = U.$('#tip'); UI.tipFn = fn; UI.tipEl = anchor;
  tip.innerHTML = fn(); tip.classList.add('on');
  placeTip();
}
function placeTip() {
  const tip = U.$('#tip'), a = UI.tipEl; if (!a) return;
  const r = a.getBoundingClientRect(), tw = tip.offsetWidth, th = tip.offsetHeight, W = window.innerWidth, H = window.innerHeight;
  let x = r.left - tw - 8, y = r.top;
  if (x < 4) x = r.right + 8;
  if (x + tw > W - 4) { x = Math.max(4, Math.min(W - tw - 4, r.left + r.width / 2 - tw / 2)); y = r.top - th - 8; if (y < 4) y = r.bottom + 8; }
  y = Math.max(4, Math.min(H - th - 4, y));
  tip.style.left = x + 'px'; tip.style.top = y + 'px';
}
function hideTip() { UI.tipFn = null; UI.tipEl = null; U.$('#tip').classList.remove('on'); }
// Appui court = action, appui long (tactile) ou survol (souris) = infobulle
function pressable(el, onTap, tipFn) {
  let timer = null, long = false, sx = 0, sy = 0, down = false;
  el.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    down = true; long = false; sx = e.clientX; sy = e.clientY;
    SFX.unlock();
    if (tipFn && e.pointerType !== 'mouse') timer = setTimeout(() => { long = true; showTip(tipFn, el); }, 430);
  });
  el.addEventListener('pointermove', e => { if (down && (Math.abs(e.clientX - sx) > 12 || Math.abs(e.clientY - sy) > 12)) { clearTimeout(timer); timer = null; down = false; } });
  el.addEventListener('pointerup', e => {
    clearTimeout(timer); timer = null;
    if (!down) return; down = false;
    if (long) { setTimeout(() => { if (UI.tipEl === el) hideTip(); }, 6000); return; }
    if (tapsBlocked()) return;
    onTap(e);
  });
  el.addEventListener('pointercancel', () => { clearTimeout(timer); timer = null; down = false; });
  el.addEventListener('contextmenu', e => e.preventDefault());
  if (tipFn) {
    el.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') showTip(tipFn, el); });
    el.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse' && UI.tipEl === el) hideTip(); });
  }
}

/* ---------- Disposition & onglets ---------- */
// iOS, app lancée depuis l'écran d'accueil : la hauteur de la page oublie la barre d'état
// (bande vide en bas). On mesure la vraie hauteur de l'écran et on étire le jeu.
function isStandalone() { return navigator.standalone === true || !!(window.matchMedia && window.matchMedia('(display-mode: standalone)').matches); }
function screenInfo() {
  const app = U.$('#app'), r = app.getBoundingClientRect();
  return { standalone: isStandalone(), inner: window.innerHeight, client: document.documentElement.clientHeight, app: Math.round(r.height), screenH: screen.height, screenW: screen.width };
}
// Hauteur de la marge de sécurité du haut (barre d'état qui recouvre la page), mesurée pour de vrai
function safeTop() {
  const d = document.createElement('div');
  d.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:env(safe-area-inset-top,0px);visibility:hidden;pointer-events:none';
  document.body.appendChild(d); const h = d.getBoundingClientRect().height; d.remove(); return h;
}
// iOS, app de l'écran d'accueil avec barre d'état transparente : la page est plus courte que l'écran
// d'exactement la hauteur de la barre d'état (bande vide en bas). On étire le jeu de cette hauteur, seulement dans ce cas.
function fixStandaloneHeight() {
  const app = U.$('#app');
  app.style.bottom = ''; app.style.height = '';
  if (!isStandalone() || !window.screen) return;
  const st = safeTop(); if (st < 1) return;           // barre d'état opaque : rien à corriger
  const real = Math.min(app.getBoundingClientRect().height, document.documentElement.clientHeight, window.innerHeight);
  const portrait = window.innerHeight >= window.innerWidth;
  const full = portrait ? Math.max(screen.height, screen.width) : Math.min(screen.height, screen.width);
  const missing = full - real;
  if (missing > 4 && missing <= st + 8) { app.style.bottom = 'auto'; app.style.height = full + 'px'; }
}
function computeLayout() {
  fixStandaloneHeight();
  const W = window.innerWidth, H = window.innerHeight;
  const L = W >= 1100 ? 'wide' : (W > H && W >= 640 ? 'land' : 'port');
  const app = U.$('#app');
  if (L !== UI.layout || !app.classList.contains('L-' + L)) {
    app.classList.remove('L-port', 'L-land', 'L-wide'); app.classList.add('L-' + L);
    UI.layout = L;
    const side = U.$('#pagesSide'), mid = U.$('#pagesMid');
    TABS.forEach(t => { const p = U.$('#page-' + t.id); if (L === 'wide' && t.id !== 'shop') mid.appendChild(p); else side.appendChild(p); });
    buildTabs();
  }
  SCENE.resize(); LABV.resize();
}
function buildTabs() {
  const side = U.$('#tabsSide'), mid = U.$('#tabsMid');
  side.innerHTML = ''; mid.innerHTML = '';
  TABS.forEach(t => {
    const b = U.el('button', 'tab', '<img src="' + GFX.url(t.icon, 0, 2) + '" alt=""><span>' + t.label + '</span><i class="dot"></i>');
    b.dataset.tab = t.id;
    b.onclick = () => { SFX.unlock(); SFX.play('tab'); showTab(t.id); };
    (UI.layout === 'wide' && t.id !== 'shop' ? mid : side).appendChild(b);
  });
  if (UI.layout === 'wide') { if (UI.tab !== 'shop') UI.midTab = UI.tab; UI.tab = 'shop'; }
  else if (UI.wasWide && UI.midTab) UI.tab = UI.midTab;
  UI.wasWide = UI.layout === 'wide';
  showTab(UI.layout === 'wide' ? UI.midTab : UI.tab, true);
  if (UI.layout === 'wide') showTab('shop', true);
}
function showTab(id, silent) {
  if (UI.layout === 'wide' && id !== 'shop') UI.midTab = id; else UI.tab = id;
  if (UI.layout === 'wide' && id === 'shop') UI.tab = 'shop';
  document.querySelectorAll('.tab').forEach(b => {
    const on = UI.layout === 'wide' ? (b.dataset.tab === 'shop' || b.dataset.tab === UI.midTab) : b.dataset.tab === UI.tab;
    b.classList.toggle('on', on);
    if (on) b.classList.remove('notif');
  });
  TABS.forEach(t => {
    const on = UI.layout === 'wide' ? (t.id === 'shop' || t.id === UI.midTab) : t.id === UI.tab;
    U.$('#page-' + t.id).classList.toggle('on', on);
  });
  if (!silent) S.set.tab = id;
  hideTip();
  renderVisible(true);
}
function tabVisible(id) { return UI.layout === 'wide' ? (id === 'shop' || id === UI.midTab) : UI.tab === id; }
function markTab(id) { if (tabVisible(id)) return; document.querySelectorAll('.tab[data-tab="' + id + '"]').forEach(b => b.classList.add('notif')); }

/* ---------- Boutique ---------- */
function buildShopBar() {
  const bar = U.$('#shopbar'); bar.innerHTML = '';
  const mk = (t, on, fn, cls = '') => { const b = U.el('button', 'btn ' + cls + (on ? ' on' : ''), t); b.onclick = () => { fn(); buildShopBar(); updateShop(true); }; bar.appendChild(b); };
  mk('Acheter', !S.set.sell, () => S.set.sell = false, 'green');
  mk('Vendre', S.set.sell, () => S.set.sell = true, 'warn');
  bar.appendChild(U.el('span', 'sep'));
  [[1, '×1'], [10, '×10'], [100, '×100'], [-1, 'Max']].forEach(([v, t]) => mk(t, S.set.buyAmt === v, () => S.set.buyAmt = v));
  U.$('#page-shop').classList.toggle('sellmode', S.set.sell);
}
function buildingTip(b) {
  return () => {
    const own = n(b.id), unit = (G.unit[b.id] || 0) * G.gmAll, tot = (G.bcps[b.id] || 0) * G.gmAll, sb = sumBase();
    const tiers = UPGRADES.filter(u => u.type === 'tier' && u.b === b.id && !S.up[u.id] && !upUnlocked(u));
    const next = tiers.length ? '<div class="sub">Prochaine amélioration à ' + tiers[0].reqN + ' exemplaire' + (tiers[0].reqN > 1 ? 's' : '') + '.</div>' : '';
    return '<div class="nm">' + U.esc(b.name) + ' <span class="sub">(en stock : ' + own + ')</span></div>' +
      '<div>' + U.esc(b.desc) + '</div><hr>' +
      '<div>' + U.esc(b.lcName) + ' produit <b>' + fmtMol(unit, 1) + '</b> par seconde.</div>' +
      (own ? '<div>Total : <b>' + fmt(tot, 1) + '</b>/s (' + fmtPct(sb > 0 ? G.bcps[b.id] / sb : 0) + ' de la production)</div>' : '') +
      next + (b.q ? '<div class="qq">' + U.esc(b.q) + '</div>' : '');
  };
}
function sumBase() { let s = 0; for (const id in G.bcps) s += G.bcps[id]; return s; }
function renderBuildings() {
  const list = U.$('#bList'); list.innerHTML = ''; UI.bEls = {};
  BUILDINGS.forEach(b => {
    const it = U.el('div', 'bItem');
    it.innerHTML = '<img class="bIcon" alt=""><div class="bInfo"><div class="bName"></div><div class="bCost"></div></div><div class="bOwned"></div>';
    pressable(it, () => {
      if (it.classList.contains('myst')) return;
      if (S.set.sell && (S.set.buyAmt === -1 || S.set.buyAmt >= 100) && n(b.id) >= 10) {
        const k = S.set.buyAmt === -1 ? n(b.id) : Math.min(S.set.buyAmt, n(b.id));
        modal('Vendre ' + k + ' ' + U.esc(U.lc(k > 1 ? b.plural : b.name)) + ' ?', '<p>Vous récupérez seulement 25 % de leur prix.</p>', [{ t: 'Annuler' }, { t: 'Vendre', cls: 'warn', fn: () => { sellBuilding(b.id); updateShop(true); } }]);
        return;
      }
      const ok = S.set.sell ? sellBuilding(b.id) : buyBuilding(b.id);
      if (ok) { const r = it.getBoundingClientRect(); sparkleAt(r.left + 28, r.top + r.height / 2, 5); updateShop(true); }
    }, () => it.classList.contains('myst') ? '<div class="nm">???</div><div class="sub">Un bâtiment encore inconnu…</div>' : buildingTip(b)());
    list.appendChild(it);
    UI.bEls[b.id] = { it, img: it.querySelector('.bIcon'), nm: it.querySelector('.bName'), cost: it.querySelector('.bCost'), own: it.querySelector('.bOwned'), state: '' };
  });
  updateShop(true);
}
function bKnown(b) { return n(b.id) > 0 || S.runEarned >= b.cost * 0.5 || b.i === 0 || godMode(); }
function updateShop(force) {
  let mystShown = false;
  BUILDINGS.forEach(b => {
    const e = UI.bEls[b.id]; if (!e) return;
    const known = bKnown(b);
    let state = known ? 'k' : (!mystShown ? 'm' : 'h');
    if (!known && !mystShown) mystShown = true;
    if (state !== e.state || force) {
      e.state = state;
      e.it.style.display = state === 'h' ? 'none' : '';
      e.it.classList.toggle('myst', state === 'm');
      e.img.src = state === 'm' ? GFX.url(b.sprite, 0, 3, { sil: '#262b44' }) : GFX.url(b.sprite, 0, 3);
      e.nm.textContent = state === 'm' ? '???' : b.name;
    }
    if (state === 'h') return;
    let amt, cost, can;
    if (S.set.sell) {
      amt = S.set.buyAmt === -1 ? n(b.id) : Math.min(S.set.buyAmt, n(b.id));
      cost = 0; for (let i = 0; i < amt; i++) cost += bCost(b.id, n(b.id) - 1 - i) * 0.25;
      can = amt > 0;
      const t = (amt > 0 ? '+' + fmtS(cost) : '—') + (amt > 1 ? ' <span class="bAmt">×' + amt + '</span>' : '');
      if (e.cost.innerHTML !== t) e.cost.innerHTML = t;
      e.lastCost = null;
    } else {
      amt = buyAmount(b.id);
      const lim = bLimit(b.id);
      cost = amt > 0 ? bCostBulk(b.id, amt) : bCost(b.id);
      can = amt > 0 && canAfford(cost);
      const t = (lim <= 0 ? '<span class="cost no">Limite du protocole</span>' : '<span class="cost ' + (can ? 'yes' : 'no') + '">' + molIco() + fmtS(cost) + '</span>' + (amt > 1 ? '<span class="bAmt">×' + amt + '</span>' : ''));
      if (e.lastCost !== t) { e.cost.innerHTML = t; e.lastCost = t; }
    }
    e.it.classList.toggle('can', can && state === 'k');
    e.it.classList.toggle('no', !can && state === 'k');
    const o = String(n(b.id) || '');
    if (e.own.textContent !== o) e.own.textContent = o;
  });
}
function upTip(u) {
  return () => {
    const c = upCost(u), can = canAfford(c);
    let extra = '';
    if (u.type === 'rep') extra = '<div class="sub">Effet actuel : ×' + dec(1 + G.rep * u.f, 2) + ' (Réputation : ' + fmtPct(G.rep) + ')</div>';
    return '<div class="nm">' + U.esc(u.name) + '</div><div>' + u.desc + '</div>' + extra + '<div class="cost ' + (can ? 'yes' : 'no') + '">' + molIco() + fmt(c) + '</div>' + (u.q ? '<div class="qq">' + U.esc(u.q) + '</div>' : '');
  };
}
function upIcon(u) { return GFX.framed(u.icon, u.tier); }
function renderUps() {
  // les boutons existants sont réutilisés : un bouton sous le doigt n'est jamais recréé pendant un appui
  const grid = U.$('#upsGrid');
  const list = G.unlockedUps;
  UI.upBtn = UI.upBtn || {};
  const keep = {};
  UI.upEls = [];
  const nodes = list.map(u => {
    let b = UI.upBtn[u.id];
    if (!b) {
      b = U.el('button', 'upt', '<img src="' + upIcon(u) + '" alt="">');
      pressable(b, e => {
        if (e.pointerType === 'mouse' || UI.selUp === u) { if (buyUp(u)) { const r = b.getBoundingClientRect(); sparkleAt(r.left + 24, r.top + 24, 8); UI.selUp = null; renderUpDet(); } else selectUp(u); }
        else selectUp(u);
      }, upTip(u));
      UI.upBtn[u.id] = b;
    }
    keep[u.id] = 1; UI.upEls.push([u, b]);
    return b;
  });
  for (const id in UI.upBtn) if (!keep[id]) delete UI.upBtn[id];
  if (!list.length) { const s = U.el('span', 'sub', 'Aucune amélioration disponible pour l\u2019instant.'); s.style.lineHeight = '48px'; nodes.push(s); }
  grid.replaceChildren(...nodes);
  if (UI.selUp && !list.includes(UI.selUp)) UI.selUp = null;
  U.$('#buyAll').style.visibility = list.length > 1 ? '' : 'hidden';
  UI.dirtyUps = false;
  renderUpDet(); updateUps();
}
function selectUp(u) { UI.selUp = u; renderUpDet(); updateUps(); }
function renderUpDet() {
  const d = U.$('#upDet'), u = UI.selUp;
  if (!u) { d.classList.remove('on'); return; }
  const c = upCost(u), can = canAfford(c) && !inChal('noupgrade');
  d.innerHTML = '<div class="h"><img src="' + upIcon(u) + '" alt=""><div style="flex:1"><div class="nm">' + U.esc(u.name) + '</div><div class="cost ' + (can ? 'yes' : 'no') + '">' + molIco() + fmt(c) + '</div></div><button class="btn ' + (can ? 'gold' : 'dis') + '" id="upBuyBtn">Acheter</button></div><div class="ds">' + u.desc + '</div>' + (u.q ? '<div class="qq">' + U.esc(u.q) + '</div>' : '');
  d.classList.add('on');
  U.$('#upBuyBtn').onclick = () => { if (buyUp(u)) { UI.selUp = null; renderUpDet(); } };
}
function updateUps() {
  if (!UI.upEls) return;
  UI.upEls.forEach(([u, b]) => { b.classList.toggle('can', canAfford(upCost(u)) && !inChal('noupgrade')); b.classList.toggle('sel', UI.selUp === u); });
}

/* ---------- Succès ---------- */
function achIcon(a, got) {
  if (!got && a.secret) return GFX.framed('i_unknown', null);
  return GFX.framed(a.icon, a.tier);
}
function renderAch() {
  const p = U.$('#page-ach');
  const total = ACH.length, got = Object.keys(S.ach).filter(id => ACHMAP[id]).length;
  let html = '<div class="ptitle"><img src="' + GFX.url('i_trophy', 0, 2) + '" alt="">Succès <span class="sub">' + got + ' / ' + total + '</span></div>' +
    '<div class="sub">Chaque succès augmente votre <b>Réputation</b> de 4 % (actuellement ' + fmtPct(G.rep) + '). La hiérarchie académique (boutique) la transforme en production.</div>' +
    '<div class="det" id="achDet"><span class="sub">Touchez un succès pour voir les détails.</span></div>';
  const cats = [];
  ACH.forEach(a => { if (!cats.includes(a.cat)) cats.push(a.cat); });
  cats.forEach(c => {
    const list = ACH.filter(a => a.cat === c), g = list.filter(a => S.ach[a.id]).length;
    html += '<div class="sect">' + c + ' <span class="sub">' + g + '/' + list.length + '</span></div><div class="igrid">';
    list.forEach(a => { const ok = !!S.ach[a.id]; html += '<button class="ic' + (ok ? '' : ' lock') + '" data-a="' + a.id + '"><img src="' + achIcon(a, ok) + '" alt=""></button>'; });
    html += '</div>';
  });
  p.innerHTML = html;
  p.querySelectorAll('.ic').forEach(b => b.onclick = () => { UI.selAch = b.dataset.a; showAchDet(); p.querySelectorAll('.ic').forEach(x => x.classList.toggle('sel', x === b)); });
  if (UI.selAch) showAchDet();
  UI.dirtyAch = false;
}
function showAchDet() {
  const a = ACHMAP[UI.selAch], d = U.$('#achDet'); if (!a || !d) return;
  const ok = !!S.ach[a.id];
  const hidden = a.secret && !ok;
  d.classList.add('pin');
  d.innerHTML = '<div class="h"><img src="' + achIcon(a, ok) + '" alt=""><div><div class="nm">' + (hidden ? 'Succès secret' : U.esc(a.name)) + '</div><div>' + (hidden ? '???' : a.desc()) + '</div>' +
    (ok ? '<div class="sub" style="color:var(--green)">Débloqué</div>' : '<div class="sub">Verrouillé</div>') + '</div></div>' + (!hidden && a.q ? '<div class="sub" style="font-style:italic;margin-top:3px">' + U.esc(a.q) + '</div>' : '');
}

/* ---------- Nobel (prestige) ---------- */
function rankName() { let r = 0; RANK_REQ.forEach((v, i) => { if (S.nobels >= v) r = i; }); return RANKS[r] || RANKS[0]; }
function renderNobel() {
  const p = U.$('#page-nobel');
  const pend = pendingNobels(), gainR = publishGainRatio();
  const cur = nobelsFor(S.allEarned), prevT = Math.pow(cur, 3) * NOBEL_BASE, nextT = nextNobelAt();
  const prog = U.clamp((S.allEarned - prevT) / Math.max(1, nextT - prevT), 0, 1);
  let html = '<div class="ptitle"><img src="' + GFX.url('i_nobel', 0, 2) + '" alt="">Prix Nobel</div>' +
    '<div class="card gold"><div class="row" style="justify-content:space-between"><div><div class="sub">Prix Nobel cumulés</div><div class="big">' + fmt(S.nobels) + '</div></div>' +
    '<div style="text-align:right"><div class="sub">Points à dépenser</div><div class="big" style="color:var(--cyan)">' + fmt(S.nobelPts) + '</div></div></div>' +
    '<div>Bonus de production : <b>+' + fmtPct(nobelBonusN() * nobelEff()) + '</b> · Titre : <b>' + U.esc(rankName()) + '</b></div></div>' +
    '<div class="card"><div class="sect" style="margin-top:0"><img src="' + GFX.url('i_book', 0, 2) + '" style="width:24px;height:24px" alt="">Publier vos travaux</div>' +
    '<div>Publier <b>remet votre partie à zéro</b> (molécules, bâtiments, améliorations, cultures) en échange de prix Nobel, calculés sur toutes les molécules produites depuis le début.</div>' +
    '<div style="margin:6px 0">Si vous publiez maintenant : <b style="font-size:24px" id="nobPend">+' + fmt(pend) + '</b> prix Nobel' +
    (gainR >= 1.01 ? ' <span class="sub">(production <b>×' + dec(gainR, gainR < 10 ? 1 : 0) + '</b> pour toujours)</span>' : '') + '</div>' +
    '<div class="sub" id="nobNext">Prochain Nobel : encore ' + fmtMol(Math.max(0, nextT - S.allEarned)) + '</div><div class="pbar"><i id="nobBar" style="width:' + (prog * 100).toFixed(1) + '%;background:var(--amber)"></i></div>' +
    '<div class="row" style="margin-top:8px"><button class="btn gold big" id="pubBtn">Publier</button>' + (S.challenge ? '<span class="sub">(un protocole est en cours)</span>' : '') + '</div></div>';
  if (S.challenge) {
    const c = CMAP[S.challenge];
    html += '<div class="card violet"><div class="cn" style="font-family:Pixelify Sans;font-size:19px;color:var(--lav)">Protocole en cours : ' + U.esc(c.name) + '</div><div>' + c.rule + '</div><div>Objectif : produire <b>' + fmtMol(c.goal) + '</b> dans cette partie.</div>' +
      '<div class="pbar"><i id="chalBar" style="width:' + Math.min(100, S.runEarned / c.goal * 100).toFixed(1) + '%"></i></div><div class="row" style="margin-top:6px"><button class="btn warn" id="abandonBtn">Abandonner</button></div></div>';
  }
  html += '<div class="sect"><img src="' + GFX.url('i_nobel', 0, 2) + '" style="width:24px;height:24px" alt="">Fondation Nobel <span class="sub">(bonus permanents)</span></div>' +
    '<div class="det" id="nodeDet"><span class="sub">Touchez un nœud pour voir ses effets.</span></div><div id="tree">';
  const rows = Math.max(...PRESTIGE.map(q => q.row));
  for (let r = 0; r <= rows; r++) {
    html += '<div class="trow">';
    PRESTIGE.filter(q => q.row === r).forEach(q => {
      const own = !!S.prestige[q.id], av = !own && (!q.req || S.prestige[q.req]);
      html += '<button class="node ' + (own ? 'own' : av ? 'avail' + (S.nobelPts >= q.cost || godMode() ? ' can' : '') : 'lock') + (UI.selNode === q.id ? ' sel' : '') + '" data-n="' + q.id + '"><img src="' + GFX.framed(q.icon, own ? 2 : av ? 1 : null) + '" alt=""></button>';
    });
    html += '</div>';
  }
  html += '</div>';
  if (pn('chal')) {
    html += '<div class="sect"><img src="' + GFX.url('i_challenge', 0, 2) + '" style="width:24px;height:24px" alt="">Protocoles expérimentaux</div>' +
      '<div class="sub">Un protocole lance une nouvelle partie (avec publication) sous contrainte. Atteignez l’objectif pour une récompense permanente.</div>';
    CHALLENGES.forEach(c => {
      const done = chalDone(c.id), cur = S.challenge === c.id;
      html += '<div class="chal' + (done ? ' done' : '') + '"><div class="cn">' + (done ? '✔ ' : '') + U.esc(c.name) + '</div>' + (c.q ? '<div class="sub" style="font-style:italic">' + U.esc(c.q) + '</div>' : '') +
        '<div>Règle : ' + c.rule + '</div><div>Objectif : <b>' + fmtMol(c.goal) + '</b>' + (c.id === 'speedrun' ? ' en 20 minutes' : '') + '</div><div>Récompense : ' + c.reward + '</div>' +
        (done ? '<div style="color:var(--green)">Réussi !</div>' : cur ? '<div style="color:var(--lav)">En cours…</div>' : '<div class="row" style="margin-top:4px"><button class="btn violet" data-c="' + c.id + '">Lancer le protocole</button></div>') + '</div>';
    });
  }
  p.innerHTML = html;
  U.$('#pubBtn').onclick = askPublish;
  const ab = U.$('#abandonBtn'); if (ab) ab.onclick = () => modal('Abandonner le protocole ?', '<p>Les restrictions seront levées et votre partie continuera normalement, sans récompense.</p>', [{ t: 'Annuler' }, { t: 'Abandonner', cls: 'warn', fn: () => { abandonChallenge(); renderNobel(); } }]);
  p.querySelectorAll('.node').forEach(b => b.onclick = () => { UI.selNode = b.dataset.n; showNodeDet(); p.querySelectorAll('.node').forEach(x => x.classList.toggle('sel', x === b)); });
  p.querySelectorAll('[data-c]').forEach(b => b.onclick = () => askChallenge(b.dataset.c));
  if (UI.selNode) showNodeDet();
  UI.nobelKey = nobelKey();
}
function updateNobelLive() {
  const p = U.$('#nobPend'); if (!p) return;
  const cur = nobelsFor(S.allEarned), prevT = Math.pow(cur, 3) * NOBEL_BASE, nextT = nextNobelAt();
  p.textContent = '+' + fmt(pendingNobels());
  U.$('#nobNext').textContent = 'Prochain Nobel : encore ' + fmtMol(Math.max(0, nextT - S.allEarned));
  const cb = U.$('#chalBar'); if (cb && S.challenge) cb.style.width = Math.min(100, S.runEarned / CMAP[S.challenge].goal * 100).toFixed(1) + '%';
  U.$('#nobBar').style.width = (U.clamp((S.allEarned - prevT) / Math.max(1, nextT - prevT), 0, 1) * 100).toFixed(1) + '%';
}
function nobelKey() { return [godMode(), S.nobels, S.nobelPts, Object.keys(S.prestige).length, S.challenge, Object.keys(S.chalDone).length, S.nobelPts >= 1].join('|'); }
function showNodeDet() {
  const q = PMAP[UI.selNode], d = U.$('#nodeDet'); if (!q || !d) return;
  const own = !!S.prestige[q.id], av = !own && (!q.req || S.prestige[q.req]);
  const can = av && (S.nobelPts >= q.cost || godMode());
  d.classList.add('pin');
  d.innerHTML = '<div class="h"><img src="' + GFX.framed(q.icon, own ? 2 : 1) + '" alt=""><div style="flex:1"><div class="nm">' + U.esc(q.name) + '</div><div>' + q.eff + '</div>' +
    '<div class="sub">' + (own ? '<span style="color:var(--green)">Acquis</span>' : 'Coût : <b>' + fmtNom(q.cost, 'point Nobel', 'points Nobel') + '</b>' + (!av ? ' · Requiert « ' + U.esc(PMAP[q.req].name) + ' »' : '')) + '</div></div>' +
    (!own ? '<button class="btn ' + (can ? 'gold' : 'dis') + '" id="nodeBuy">Acquérir</button>' : '') + '</div>' + (q.q ? '<div class="sub" style="font-style:italic;margin-top:3px">' + U.esc(q.q) + '</div>' : '');
  const nb = U.$('#nodeBuy'); if (nb) nb.onclick = () => { if (buyNode(q.id)) { toast('Fondation Nobel : <b>' + U.esc(q.name) + '</b>', 'save', q.icon); renderNobel(); } };
}
function paperTitle() {
  const t = U.pick(TX(() => TXT_PAPERS, null) || ['Sur la production de molécules à partir de presque rien']);
  return t.replace(/\{labo\}/g, S.labName);
}
function askPublish() {
  const g = pendingNobels();
  modal('Publier vos travaux ?', '<p class="center sub">Titre de la publication :</p><p class="center" style="color:var(--cyan);font-size:21px">« ' + U.esc(paperTitle()) + ' »</p>' +
    '<p class="big">+' + fmt(g) + ' prix Nobel</p>' +
    '<p><b>Remis à zéro :</b> molécules, bâtiments, améliorations, cultures de Petri, ère.</p><p><b>Conservé :</b> prix Nobel, Fondation Nobel, succès, souches découvertes, protocoles réussis, statistiques.</p>' +
    (g <= 0 ? '<p style="color:var(--red)">Attention : vous ne gagnerez aucun prix Nobel ! Il faut au moins ' + fmtMol(NOBEL_BASE) + ' produites au total pour le premier.</p>' : ''),
    [{ t: 'Annuler' }, { t: 'Publier !', cls: 'gold', fn: () => doPublish() }]);
}
function doPublish() {
  const g = publish();
  bigText('PUBLICATION ACCEPTÉE', '#fee761', '+' + fmtNom(g, 'prix Nobel', 'prix Nobel'));
  if (S.set.flash) flashScreen('#fee761');
  GOLD.clearAll();
  UI.dirtyAll = true; showTab('nobel');
}
function askChallenge(id) {
  const c = CMAP[id];
  modal('Lancer « ' + U.esc(c.name) + ' » ?', '<p>' + c.rule + '</p><p>Objectif : <b>' + fmtMol(c.goal) + '</b> dans la partie' + (id === 'speedrun' ? ', en moins de 20 minutes' : '') + '.</p><p>Récompense permanente : ' + c.reward + '</p>' +
    (S.challenge ? '<p style="color:var(--red)">Le protocole en cours (« ' + U.esc(CMAP[S.challenge].name) + ' ») sera abandonné sans récompense.</p>' : '') +
    '<p style="color:var(--amber)">Lancer un protocole <b>publie votre partie actuelle</b> (vous recevez ' + fmt(pendingNobels()) + ' prix Nobel) et en commence une nouvelle sous contrainte.</p>',
    [{ t: 'Annuler' }, { t: 'Lancer', cls: 'violet', fn: () => { startChallenge(id); GOLD.clearAll(); UI.dirtyAll = true; bigText('PROTOCOLE LANCÉ', '#d4b8ff', c.name); } }]);
}

/* ---------- Boîte de Petri ---------- */
function renderPetri() {
  const p = U.$('#page-petri');
  UI.dirtyPetri = false;
  if (!petriOpen()) {
    p.innerHTML = '<div class="ptitle"><img src="' + GFX.url('i_petri', 0, 2) + '" alt="">Boîte de Petri</div><div class="card"><p>Il vous faut au moins un <b>microscope</b> pour observer des cultures.</p><p class="sub">Les cultures mûres donnent des bonus permanents tant qu’elles vivent, se récoltent contre des molécules et mutent en nouvelles souches quand deux sont voisines.</p></div>';
    UI.petriKey = 'closed'; return;
  }
  const P = S.petri, sz = petriSize(), cell = window.innerWidth <= 420 ? 44 : 52;
  let ripe = 0;
  for (let y = 0; y < sz; y++) for (let x = 0; x < sz; x++) if (petriStage(P.grid[y * 7 + x]) === 2) ripe++;
  let html = '<div class="ptitle"><img src="' + GFX.url('i_petri', 0, 2) + '" alt="">Boîte de Petri <span class="sub">' + sz + '×' + sz + '</span></div>' +
    '<div class="sub" id="petriInfo"></div>' +
    '<div class="pgrid" style="grid-template-columns:repeat(' + sz + ',' + cell + 'px)">';
  for (let y = 0; y < sz; y++) for (let x = 0; x < sz; x++) {
    const i = y * 7 + x, c = P.grid[i], stg = petriStage(c);
    let inner = '<img class="dish" src="' + GFX.url('pt_dish', 0, 3) + '" alt="">';
    if (c) {
      if (c.s === 'dead') inner += '<img class="str" src="' + GFX.url('pt_dead', 0, 3) + '" alt="">';
      else {
        const st = SMAP[c.s];
        inner += '<img class="str" src="' + GFX.url(st.sprite, stg, 3) + '" alt="">';
        inner += '<div class="age"><i style="width:' + Math.min(100, c.a / st.grow * 100) + '%;background:' + (stg === 2 ? 'var(--green)' : 'var(--amber)') + '"></i></div>';
      }
    }
    html += '<button class="pcell' + (stg === 2 ? ' ripe' : '') + (UI.selCell === i ? ' sel' : '') + '" data-i="' + i + '">' + inner + '</button>';
  }
  html += '</div><div class="det" id="petriDet"></div><div class="sect">Souches</div><div class="sub">Choisissez une souche puis touchez une case vide pour la planter.</div><div class="seeds">';
  STRAINS.forEach(st => {
    const d = P.disc[st.id];
    if (d) html += '<button class="seed' + (P.sel === st.id ? ' on' : '') + '" data-s="' + st.id + '"><img src="' + GFX.url(st.sprite, 2, 3) + '" alt=""><span>' + U.esc(st.name) + '<br><span class="cost ' + (canAfford(strainCost(st)) ? 'yes' : 'no') + '">' + molIco() + fmtS(strainCost(st)) + '</span></span></button>';
    else {
      const hint = st.rec && P.disc[st.rec[0]] && P.disc[st.rec[1]] ? 'Croisement : ' + SMAP[st.rec[0]].name + (st.rec[0] === st.rec[1] ? ' × ' + SMAP[st.rec[0]].name : ' × ' + SMAP[st.rec[1]].name) + ' ?' : 'Souche inconnue';
      html += '<div class="seed unk"><img src="' + GFX.url(st.sprite, 2, 3, { sil: '#262b44' }) + '" alt=""><span>???<br><span class="sub">' + hint + '</span></span></div>';
    }
  });
  html += '</div><div class="sect">Effets actifs</div><div id="petriEff"></div>';
  p.innerHTML = html;
  p.querySelectorAll('.pcell').forEach(b => b.onclick = () => petriCellTap(+b.dataset.i));
  p.querySelectorAll('.seed[data-s]').forEach(b => b.onclick = () => { P.sel = b.dataset.s; UI.selCell = -1; renderPetri(); });
  renderPetriDet(); updatePetriInfo();
  UI.petriKey = petriKey();
}
function petriKey() { return S.petri.grid.map(c => c ? c.s + c.a : '').join(',') + '|' + petriSize() + '|' + Object.keys(S.petri.disc).length + '|' + S.petri.sel + '|' + UI.selCell; }
function updatePetriInfo() {
  const e = U.$('#petriInfo'); if (!e) return;
  e.textContent = 'Prochain cycle dans ' + fmtTime(S.petri.timer) + ' · Récoltes : ' + S.petri.harvests;
  const pe = G.petri, out = [];
  if (pe.cps) out.push('Production +' + fmtPct(pe.cps));
  if (pe.gold) out.push('Fioles dorées +' + fmtPct(pe.gold));
  if (pe.click) out.push('Clics +' + fmtPct(pe.click));
  if (pe.bcost) out.push('Bâtiments −' + fmtPct(pe.bcost));
  if (pe.ucost) out.push('Améliorations −' + fmtPct(pe.ucost));
  if (pe.gdur) out.push('Effets dorés +' + fmtPct(pe.gdur));
  if (pe.eureka) out.push('Eurêka +' + fmtPct(pe.eureka));
  if (pe.schro) out.push('Schrödinger : ' + (S.petri.schro ? 'vivante (+' + fmtPct(0.06 * pe.schro) + ')' : 'morte (+0 %)'));
  const pf = U.$('#petriEff'); if (pf) pf.innerHTML = out.length ? out.map(t => '<div>• ' + t + '</div>').join('') : '<span class="sub">Aucune culture mûre.</span>';
}
function updatePetriCosts() {
  const p = U.$('#page-petri'); if (!p) return;
  p.querySelectorAll('.seed[data-s]').forEach(b => {
    const st = SMAP[b.dataset.s], el = b.querySelector('.cost'); if (!st || !el) return;
    const c = strainCost(st), cls = 'cost ' + (canAfford(c) ? 'yes' : 'no'), txt = molIco() + fmtS(c);
    if (el.className !== cls) el.className = cls;
    if (el.dataset.t !== txt) { el.innerHTML = txt; el.dataset.t = txt; }
  });
}
function petriCellTap(i) {
  const P = S.petri, c = P.grid[i];
  if (!c) { if (P.sel && P.disc[P.sel]) { if (petriPlant(i, P.sel)) { UI.selCell = -1; renderPetri(); } } return; }
  if (UI.selCell === i && petriStage(c) === 2) { const g = petriHarvest(i); if (g) toast('Récolte : <b>+' + fmtMol(g) + '</b>', 'petri', SMAP[c.s].sprite); UI.selCell = -1; renderPetri(); return; }
  UI.selCell = i; renderPetri();
}
function renderPetriDet() {
  const d = U.$('#petriDet'); if (!d) return;
  const P = S.petri, i = UI.selCell, c = i >= 0 ? P.grid[i] : null;
  if (c && c.s !== 'dead') {
    const st = SMAP[c.s], stg = petriStage(c);
    const life = st.life ? (st.grow + st.life - c.a) : null;
    d.innerHTML = '<div class="h"><img src="' + GFX.url(st.sprite, stg, 3) + '" alt=""><div style="flex:1"><div class="nm">' + U.esc(st.name) + '</div><div class="sub">' +
      (stg === 2 ? '<span style="color:var(--green)">Mûre</span>' : 'Croissance : ' + c.a + ' / ' + st.grow + ' cycles') + (life != null ? ' · Reste ' + life + ' cycle' + (life > 1 ? 's' : '') + ' de vie' : ' · Immortelle') + '</div></div></div>' +
      '<div>Effet (mûre) : ' + st.effTxt + '</div><div>Récolte : ' + fmtTime(st.harvest) + ' de production</div>' + (st.q ? '<div class="sub" style="font-style:italic">' + U.esc(st.q) + '</div>' : '') +
      '<div class="row" style="margin-top:6px">' + (stg === 2 ? '<button class="btn gold" id="pHarv">Récolter</button>' : '') + '<button class="btn warn" id="pRem">Arracher</button></div>';
    const h = U.$('#pHarv'); if (h) h.onclick = () => { const g = petriHarvest(i); if (g) toast('Récolte : <b>+' + fmtMol(g) + '</b>', 'petri', st.sprite); UI.selCell = -1; renderPetri(); };
    U.$('#pRem').onclick = () => { P.grid[i] = null; UI.selCell = -1; recalc(); SFX.play('sell'); renderPetri(); };
  } else if (c && c.s === 'dead') {
    d.innerHTML = '<div class="h"><img src="' + GFX.url('pt_dead', 0, 3) + '" alt=""><div><div class="nm">Culture morte</div><div class="sub">Elle sera nettoyée au prochain cycle.</div></div></div>';
  } else {
    const st = SMAP[P.sel];
    if (st) d.innerHTML = '<div class="h"><img src="' + GFX.url(st.sprite, 2, 3) + '" alt=""><div style="flex:1"><div class="nm">' + U.esc(st.name) + ' <span class="sub">(sélectionnée)</span></div><div>Effet : ' + st.effTxt + '</div><div class="sub">Mûrit en ' + st.grow + ' cycles · ' + (st.life ? 'vit ' + st.life + ' cycles' : 'immortelle') + ' · Coût : ' + fmt(strainCost(st)) + '</div></div></div>';
    else d.innerHTML = '<span class="sub">Sélectionnez une souche.</span>';
  }
}

/* ---------- Statistiques ---------- */
function renderStats() {
  const p = U.$('#page-stats');
  const oj = p.querySelector('.journal'), js = oj ? oj.scrollTop : 0;
  const row = (a, b) => '<div class="stat"><span>' + a + '</span><span>' + b + '</span></div>';
  let h = '<div class="ptitle"><img src="' + GFX.url('i_stats', 0, 2) + '" alt="">Statistiques</div>' +
    '<div class="sect">Journal du labo <span class="sub">(derniers messages)</span></div><div class="journal">' + journalHtml() + '</div>' +
    '<div class="sect">Partie en cours</div>' +
    row('Molécules en stock', godMode() ? '∞' : fmt(S.bank)) + row('Produites cette partie', fmt(S.runEarned)) + row('Production par seconde', fmt(G.cps, 1)) +
    row('Puissance d’un clic', fmt(G.click, 1)) + row('Clics (partie)', fmt(S.clicks)) + row('Produites à la main (partie)', fmt(S.handmade)) +
    row('Bâtiments possédés', fmt(G.totalB)) + row('Améliorations', G.upCount + ' / ' + UPGRADES.length) + row('Ère', U.esc(ERAS[S.era].name)) + row('Durée de la partie', fmtTime(S.runTime)) +
    '<div class="sect">Depuis toujours</div>' + row('Molécules produites', fmt(S.allEarned)) + row('Clics', fmt(S.clicksAll)) + row('Produites à la main', fmt(S.handmadeAll)) +
    row('Fioles dorées cliquées', fmt(S.goldClicks)) + row('Anomalies cliquées', fmt(S.anoClicks || 0)) + row('Eurêka', fmt(S.eurekas)) + row('Incidents de labo', fmt(S.incidents || 0)) + row('Publications', fmt(S.publishes)) +
    row('Prix Nobel', fmt(S.nobels)) + row('Succès', G.achN + ' / ' + ACH.length) + row('Réputation', fmtPct(G.rep)) + row('Meilleure production', fmt(S.bestCps, 1) + '/s') +
    row('Temps de jeu', fmtTime(S.playTime)) + row('Temps hors-ligne cumulé', fmtTime(S.offlineTotal || 0)) + row('Bâtiments vendus', fmt(S.sold)) +
    row('Production hors-ligne', fmtPct(offlineParams()[0]) + ' pendant ' + fmtTime(offlineParams()[1]) + ' max') +
    '<div class="sect">Multiplicateurs</div>';
  G.mults.forEach(([k, v]) => { h += row(k, '×' + (v >= 1000 ? fmt(v) : dec(v, 2))); });
  if (!G.mults.length) h += '<div class="sub">Aucun pour l’instant.</div>';
  h += '<div class="sect">Production par bâtiment</div>';
  BUILDINGS.forEach(b => { if (n(b.id)) h += row(U.esc(b.plural) + ' (' + n(b.id) + ')', fmt(G.bcps[b.id] * G.gmAll, 1) + '/s'); });
  p.innerHTML = h;
  const nj = p.querySelector('.journal'); if (nj) nj.scrollTop = js;
}

/* ---------- Options ---------- */
function renderOpts() {
  const p = U.$('#page-opts'), st = S.set;
  const tog = (key, label) => '<div class="opt"><span>' + label + '</span><button class="btn ' + (st[key] ? 'on' : '') + '" data-tog="' + key + '">' + (st[key] ? 'Activé' : 'Désactivé') + '</button></div>';
  let h = '<div class="logo" id="logo"><img src="' + GFX.url('v6', 0, 2, { liquid: '#b55088', tint: '#2ce8f5' }) + '" alt=""><div class="t">LABO INFINI<small>de l’éprouvette au multivers</small></div></div>' +
    '<div class="sect"><img src="' + GFX.url('i_save', 0, 2) + '" style="width:24px;height:24px" alt="">Sauvegarde</div>' +
    '<div class="sub">Sauvegarde automatique toutes les 30 secondes et à chaque fermeture. Dernière : <span id="lastSave"></span></div>' +
    '<div class="row" style="margin:6px 0"><button class="btn green" id="oSave">Sauvegarder</button><button class="btn" id="oExport">Exporter</button><button class="btn" id="oImport">Importer</button><button class="btn warn" id="oReset">Réinitialiser</button></div>' +
    '<div class="sect">Laboratoire</div><div class="opt"><span>Nom du labo : <b>' + U.esc(S.labName) + '</b></span><button class="btn" id="oRename">Renommer</button></div>' +
    '<div class="sect">Affichage &amp; son</div>' +
    '<div class="opt"><span>Format des nombres</span><span class="row">' + [['long', '1,5 million'], ['short', '1,5 M'], ['sci', '1,5e6']].map(([k, t]) => '<button class="btn ' + (st.format === k ? 'on' : '') + '" data-fmt="' + k + '">' + t + '</button>').join('') + '</span></div>' +
    tog('music', 'Musique <span class="sub">(« ' + U.esc((MTRACKS[MUSIC.target()] || MTRACKS[0]).name) + ' »)</span>') + '<div class="opt"><span>Volume de la musique</span><input type="range" min="0" max="1" step="0.05" value="' + st.mvol + '" id="oMvol"></div>' +
    tog('sound', 'Bruitages') + '<div class="opt"><span>Volume des bruitages</span><input type="range" min="0" max="1" step="0.05" value="' + st.vol + '" id="oVol"></div>' +
    '<div class="sub">Pas de son ? Vérifie que l’iPhone n’est pas en mode silencieux.</div>' +
    tog('particles', 'Particules') + tog('flash', 'Flashs lumineux') + tog('news', 'Fil d’actualités') +
    '<div class="sect"><img src="' + GFX.url('i_dev', 0, 2) + '" style="width:24px;height:24px" alt="">Développeur</div><div id="devZone"></div>' +
    '<div class="sect">À propos</div><div class="sub">Labo Infini — un jeu incrémental de laboratoire complètement dépassé. Polices Pixelify Sans et VT323 (SIL Open Font License).' + (typeof BUILD_ID !== 'undefined' ? ' <b>Version du ' + U.esc(BUILD_ID) + '</b>.' : '') + ' Astuce : ' + U.esc(U.pick(TX(() => TXT_TIPS, null) || ['Cliquez !'])) + '</div>';
  p.innerHTML = h;
  U.$('#logo').onclick = () => { UI.logoClicks++; if (UI.logoClicks >= 10) secret('logo'); SFX.play('click'); };
  U.$('#oSave').onclick = () => { saveGame(true); SFX.play('save'); renderOpts(); };
  U.$('#oExport').onclick = showExport;
  U.$('#oImport').onclick = showImport;
  U.$('#oReset').onclick = askReset;
  U.$('#oRename').onclick = askRename;
  U.$('#oVol').oninput = e => { st.vol = +e.target.value; SFX.play('click'); };
  U.$('#oMvol').oninput = e => { st.mvol = +e.target.value; SFX.unlock(); };
  p.querySelectorAll('[data-tog]').forEach(b => b.onclick = () => { st[b.dataset.tog] = !st[b.dataset.tog]; SFX.unlock(); applySettings(); renderOpts(); });
  p.querySelectorAll('[data-fmt]').forEach(b => b.onclick = () => { st.format = b.dataset.fmt; applySettings(); renderOpts(); UI.dirtyAll = true; });
  renderDev();
  updateLastSave();
}
function updateLastSave() { const e = U.$('#lastSave'); if (e) e.textContent = 'il y a ' + fmtTime((U.now() - S.lastSave) / 1000); }
function applySettings() {
  NUM_FORMAT = S.set.format;
  U.$('#ticker').classList.toggle('off', !S.set.news);
  U.$('#app').classList.toggle('god', godMode());
  setEraClass();
  setTimeout(() => SCENE.resize(), 0);
}
function copyText(ta, s) {
  let ok = false;
  try { ta.readOnly = false; ta.focus(); ta.select(); ta.setSelectionRange(0, s.length + 10); ok = document.execCommand('copy'); } catch (e) { }
  try { ta.readOnly = true; ta.blur(); } catch (e) { }
  const done = good => toast(good ? 'Copié ! Collez-le dans vos notes pour le garder.' : 'Copie automatique impossible : appuyez longuement dans le texte, « Tout sélectionner » puis « Copier ».', good ? 'save' : 'warn');
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(s).then(() => done(true)).catch(() => done(ok));
  else done(ok);
}
function downloadSave() {
  try {
    const s = exportSave(), d = new Date();
    const name = 'labo-infini-sauvegarde-' + d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0') + '.txt';
    const url = URL.createObjectURL(new Blob([s], { type: 'text/plain' }));
    const a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 2000);
    secret('export');
    toast('Fichier de sauvegarde créé (dossier Téléchargements / Fichiers).', 'save');
  } catch (e) { toast('Téléchargement impossible ici : utilisez « Copier ».', 'warn'); }
}
function showExport() {
  const s = exportSave();
  secret('export');
  modal('Exporter la sauvegarde', '<p>Gardez ce texte précieusement (notes, message…) ou téléchargez-le en fichier. Vous pourrez le recharger avec « Importer ».</p><textarea class="save" readonly id="expTxt" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>',
    [{ t: 'Copier', cls: 'green', keep: true, fn: () => copyText(U.$('#expTxt'), s) }, { t: 'Télécharger', keep: true, fn: downloadSave }, { t: 'Fermer' }]);
  U.$('#expTxt').value = s;
}
function showImport() {
  modal('Importer une sauvegarde', '<p>Collez ici un texte de sauvegarde (commence par <b>LABO1:</b>) ou chargez un fichier de sauvegarde. Votre partie actuelle sera remplacée.</p>' +
    '<textarea class="save" id="impTxt" placeholder="LABO1:..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>' +
    '<div class="row" style="margin-top:6px"><label class="btn" style="cursor:pointer">Charger un fichier<input type="file" id="impFile" accept=".txt,text/plain" style="display:none"></label><span class="sub" id="impInfo"></span></div>',
    [{ t: 'Annuler' }, { t: 'Importer', cls: 'gold', fn: () => {
      try { importSave(U.$('#impTxt').value); afterLoad(); saveGame(); toast('Sauvegarde importée !', 'save'); }
      catch (e) { toast('Import impossible : ' + U.esc(e.message), 'warn'); return false; }
    } }]);
  U.$('#impFile').onchange = ev => {
    const f = ev.target.files && ev.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => { U.$('#impTxt').value = String(r.result || ''); U.$('#impInfo').textContent = f.name + ' chargé — touchez « Importer ».'; };
    r.readAsText(f);
  };
}
function askReset() {
  modal('Tout réinitialiser ?', '<p style="color:var(--red)">Cela efface <b>définitivement</b> toute votre progression : molécules, prix Nobel, succès, souches… Exportez d’abord votre sauvegarde si vous voulez la garder.</p>',
    [{ t: 'Annuler' }, { t: 'Effacer', cls: 'warn', fn: () => {
      modal('Vraiment ?', '<p>Dernière chance. Le labo sera rasé.</p>', [{ t: 'Non !' }, { t: 'Oui, tout effacer', cls: 'warn', fn: () => { hardReset(); S.labName = U.pick(TX(() => TXT_LABNAMES, null) || ['Labo Infini']); afterLoad(); saveGame(); toast('Nouveau départ !', 'save'); } }]);
      return false;
    } }]);
}
function askRename() {
  modal('Renommer le labo', '<input class="txt" id="rnTxt" maxlength="40">', [{ t: 'Annuler' }, { t: 'Valider', cls: 'gold', fn: () => {
    const v = U.$('#rnTxt').value.trim().slice(0, 40);
    if (v) { S.labName = v; secret('rename'); updateHeader(); renderOpts(); }
  } }]);
  const i = U.$('#rnTxt'); i.value = S.labName; setTimeout(() => { try { i.focus(); i.select(); } catch (e) { } }, 50);
}
function renderDev() {
  const z = U.$('#devZone'); if (!z) return;
  if (!S.set.dev) {
    z.innerHTML = '<div class="row"><button class="btn gold" id="devBtn">DEV</button><span class="sub">Accès réservé au personnel autorisé.</span></div><div id="devCode" style="display:none;margin-top:6px" class="row"><input class="code" id="devIn" maxlength="12" autocomplete="off" autocorrect="off" autocapitalize="characters" spellcheck="false" placeholder="CODE"><button class="btn gold" id="devOk">OK</button></div>';
    U.$('#devBtn').onclick = () => { U.$('#devCode').style.display = 'flex'; U.$('#devIn').focus(); };
    const sub = () => {
      const v = U.$('#devIn').value.trim().toUpperCase();
      if (v === 'BURGER') { S.set.dev = true; S.set.god = true; secret('burger'); applySettings(); toast('BURGER ACCEPTÉ — MODE DIEU ACTIVÉ', 'ach', 'i_dev', 'Développeur'); SFX.play('ach'); renderDev(); UI.dirtyAll = true; }
      else { toast('ACCÈS REFUSÉ', 'warn', 'i_lock'); SFX.play('error'); U.$('#devIn').value = ''; }
    };
    U.$('#devOk').onclick = sub; U.$('#devIn').onkeydown = e => { if (e.key === 'Enter') sub(); };
    return;
  }
  const B = (t, fn, cls = '') => '<button class="btn ' + cls + '" data-dev="' + t + '">' + t + '</button>';
  const acts = {
    ['Mode Dieu : ' + (S.set.god ? 'ON' : 'OFF')]: () => { S.set.god = !S.set.god; applySettings(); recalc(); },
    '+1 h de production': () => earn(Math.max(G.cpsNoBuff, 1) * 3600),
    '+1 jour de production': () => earn(Math.max(G.cpsNoBuff, 1) * 86400),
    '+1 million': () => earn(1e6), '+1 billion': () => earn(1e12), '+1e30': () => earn(1e30), 'Molécules ×1000': () => earn(Math.max(S.bank, 1) * 999),
    'Vitesse ×1': () => S.set.speed = 1, 'Vitesse ×10': () => S.set.speed = 10, 'Vitesse ×100': () => S.set.speed = 100,
    'Fiole dorée': () => GOLD.spawn('gold'), 'Anomalie': () => GOLD.spawn('ano'), 'Pluie de fioles': () => { S.storm = 7; },
    'Frénésie': () => addBuff({ key: 'frenzy', name: GOLDEN_TXT.frenzy.n, cps: 7, t: 77, icon: 'g_golden' }),
    'Eurêka': () => triggerEureka(),
    'Incident': () => INC.fire(),
    'Musique : ère suivante': () => { MUSIC.preview = MUSIC.preview == null ? (S.era + 1) % 9 : MUSIC.preview + 1; if (MUSIC.preview > 8) MUSIC.preview = null; toast('Musique : « ' + MTRACKS[MUSIC.target()].name + ' »' + (MUSIC.preview == null ? ' (ère actuelle)' : ' (aperçu, ère ' + (MUSIC.preview + 1) + ')'), 'save'); },
    '+10 Nobel': () => { S.nobels += 10; S.nobelPts += 10; recalc(); }, '+1000 Nobel': () => { S.nobels += 1000; S.nobelPts += 1000; recalc(); }, '+1e6 Nobel': () => { S.nobels += 1e6; S.nobelPts += 1e6; recalc(); },
    '+10 de chaque bâtiment': () => { B_IDS.forEach(id => S.b[id] = n(id) + 10); recalc(); updateEra(); checkUnlocks(); },
    'Ère suivante': () => { const e = Math.min(8, S.era + 1); const id = B_IDS[ERA_REQ[e]]; S.b[id] = Math.max(1, n(id)); recalc(); updateEra(); checkUnlocks(); },
    'Tous les succès': () => { ACH.forEach(a => { if (!S.ach[a.id]) S.ach[a.id] = U.now(); }); recalc(); checkUnlocks(); UI.dirtyAch = true; },
    'Toutes les souches': () => { STRAINS.forEach(s => S.petri.disc[s.id] = true); UI.dirtyPetri = true; },
    'Petri : cycle': () => petriTick(), 'Petri : tout mûrir': () => { S.petri.grid.forEach(c => { if (c && SMAP[c.s]) c.a = Math.max(c.a, SMAP[c.s].grow); }); recalc(); UI.dirtyPetri = true; },
    'Réussir le protocole': () => { if (S.challenge) earn(CMAP[S.challenge].goal); },
    'Hors-ligne 8 h (test)': () => { const r = applyOffline(8 * 3600); if (r) offlineModal(r); },
    'Infos écran': () => { const i = screenInfo(); toast('standalone ' + i.standalone + ' · barre ' + Math.round(safeTop()) + ' · inner ' + i.inner + ' · client ' + i.client + ' · jeu ' + i.app + ' · écran ' + i.screenW + '×' + i.screenH, 'save'); },
    'Verrouiller DEV': () => { S.set.dev = false; S.set.god = false; S.set.speed = 1; applySettings(); recalc(); },
  };
  z.innerHTML = '<div class="sub" style="color:var(--yellow)">Mode développeur actif. Mode Dieu = molécules infinies (achats gratuits).</div><div class="devgrid" style="margin-top:6px">' + Object.keys(acts).map(k => B(k, null, k.startsWith('Mode') ? 'gold' : k.startsWith('Verr') ? 'warn' : '')).join('') + '</div>';
  z.querySelectorAll('[data-dev]').forEach(b => b.onclick = () => { acts[b.dataset.dev](); SFX.play('click'); renderDev(); UI.dirtyAll = true; });
}

/* ---------- HUD ---------- */
function updateHeader() {
  const ln = U.$('#labName');
  ln.querySelector('.ln').textContent = S.labName;
  ln.querySelector('.rk').textContent = rankName() + (S.nobels ? ' · ' + fmt(S.nobels) + ' Nobel' : '');
}
let lastHud = '';
function updateHud() {
  // Décimales fixes + choix long/court selon l'ORDRE DE GRANDEUR (pas selon la longueur du moment) : avant, les
  // zéros de fin apparaissaient et disparaissaient et l'affichage alternait « 123,456 milliards » / « 123 Md » à
  // chaque image (clignotement signalé par le joueur).
  let mc = godMode() ? '∞' : fmt(S.bank, 0, false, true);
  if (!godMode() && S.bank >= 1e6 && U.$('#paneFlask').clientWidth < 420) {
    const base = Math.pow(10, Math.floor(Math.floor(Math.log10(S.bank) + 1e-12) / 3) * 3);
    if (fmt(base * 999.4, 0, false, true).length > 17) mc = fmt(S.bank, 0, true, true);
  }
  if (mc !== lastHud) { U.$('#molCount').textContent = mc; lastHud = mc; U.$('#molLabel').textContent = S.bank >= 2 || godMode() ? 'molécules' : 'molécule'; }
  const cl = U.$('#cpsLine');
  const t = 'par seconde : ' + fmt(G.cps, 1);
  if (cl.textContent !== t) cl.textContent = t;
  cl.classList.toggle('buffed', G.cps > G.cpsNoBuff * 1.001);
  const ew = U.$('#eurekaWrap'), eb = S.buffs.find(b => b.key === 'eureka');
  ew.classList.toggle('on', !!eb);
  U.$('#eurekaFill').style.width = (eb ? eb.t / eb.dur * 100 : S.eureka) + '%';
  ew.style.display = inChal('noclick') ? 'none' : '';
}
function renderBuffs() {
  const box = U.$('#buffs'); box.innerHTML = '';
  S.buffs.forEach(b => {
    if (b.key === 'eureka') return;
    const e = U.el('div', 'buff', '<img src="' + GFX.url(b.icon || 'g_golden', 0, 2) + '" alt=""><div class="bt"><span class="bn">' + U.esc(b.name) + '</span><span class="sub" data-k="t"></span><div class="bb"><i></i></div></div>');
    e.dataset.key = b.key; box.appendChild(e);
  });
  UI.dirtyBuffs = false; updateBuffs();
}
function updateBuffs() {
  U.$('#buffs').querySelectorAll('.buff').forEach(e => {
    const b = S.buffs.find(x => x.key === e.dataset.key); if (!b) return;
    const narrow = window.innerWidth <= 700;
    e.querySelector('[data-k="t"]').textContent = narrow ? '×' + fmtS(b.cps || b.click, 1) + ' · ' + Math.ceil(b.t) + 's' : (b.cps ? '×' + fmt(b.cps, 1) + ' prod. ' : '') + (b.click ? '×' + fmt(b.click) + ' clics ' : '') + '· ' + Math.ceil(b.t) + ' s';
    e.querySelector('.bb i').style.width = (b.t / b.dur * 100) + '%';
  });
}
function updateChalBanner() {
  const e = U.$('#chalBanner');
  if (!S.challenge) { e.classList.remove('on'); return; }
  const c = CMAP[S.challenge];
  e.classList.add('on');
  e.innerHTML = '<div class="cn">' + U.esc(c.name) + '</div><div>' + fmtS(S.runEarned) + ' / ' + fmtS(c.goal) + (c.id === 'speedrun' ? ' · ' + fmtTime(Math.max(0, 1200 - S.chalTime)) : '') + '</div><div class="pbar"><i style="width:' + Math.min(100, S.runEarned / c.goal * 100) + '%"></i></div>';
}

/* ---------- Fil d'actualités ---------- */
const NEWS = { x: 0, w: 0, el: null, recent: [] };
function nextNews() {
  const el = U.$('#tickerInner');
  const all = TX(() => TXT_NEWS, []) || [];
  const era = S.era + 1;
  let pool = all.filter(x => x && x.t && (x.e || 1) <= era && (x.x == null || era <= x.x) && (!x.b || n(x.b) > 0) && !NEWS.recent.includes(x));
  if (!pool.length) pool = all.filter(x => x && x.t && (x.e || 1) <= era);
  let txt = pool.length ? U.pick(pool) : { t: 'Le labo ouvre ses portes. Les voisins s’inquiètent déjà.' };
  NEWS.recent.push(txt); if (NEWS.recent.length > 40) NEWS.recent.shift();
  let s = U.esc(txt.t).replace(/\{labo\}/g, U.esc(S.labName)).replace(/\{mol\}/g, fmt(S.bank)).replace(/\{nb:([a-z]+)\}/g, (m, id) => fmt(n(id)));
  s = s.replace(/^([A-ZÉÈÊÀÂÎÔÛÇ' ]{4,}\s?[—:-])/, '<span class="tag">$1</span>');
  el.innerHTML = s;
  NEWS.w = el.scrollWidth; NEWS.x = 0; NEWS.cw = U.$('#ticker').clientWidth;
  el.style.paddingLeft = NEWS.cw + 'px';
  NEWS.w = el.scrollWidth;
}
function updateTicker(dt) {
  if (!S.set.news) return;
  const el = U.$('#tickerInner');
  if (!NEWS.w) nextNews();
  NEWS.x -= dt * 75;
  if (-NEWS.x > NEWS.w) nextNews();
  el.style.transform = 'translateX(' + Math.round(NEWS.x) + 'px)';
}

/* ---------- Rendu périodique ---------- */
function renderVisible(force) {
  if (tabVisible('shop')) { if (UI.dirtyUps || force) renderUps(); }
  if (tabVisible('ach') && (UI.dirtyAch || force)) renderAch();
  if (tabVisible('nobel') && (force || UI.nobelKey !== nobelKey())) renderNobel();
  if (tabVisible('petri') && (force || UI.dirtyPetri || UI.petriKey !== petriKey())) renderPetri();
  if (tabVisible('stats') && force) renderStats();
  if (tabVisible('opts') && force) renderOpts();
  if (tabVisible('lab') && force) LABV.resize();
}
function uiUpdate(dt) {
  updateHud(); updateTicker(dt);
  if (UI.tipFn && UI.tipEl) { UI.tipAcc = (UI.tipAcc || 0) + dt; if (UI.tipAcc > 0.5) { UI.tipAcc = 0; if (!document.body.contains(UI.tipEl)) hideTip(); else { U.$('#tip').innerHTML = UI.tipFn(); placeTip(); } } }
  UI.acc += dt; UI.slowAcc += dt;
  if (UI.dirtyAll) {
    UI.dirtyAll = false; UI.dirtyUps = true; UI.dirtyAch = true; UI.dirtyPetri = true; UI.dirtyBuffs = true;
    buildShopBar(); updateShop(true); updateHeader(); applySettings(); renderVisible(true);
  }
  if (UI.dirtyBuffs) renderBuffs();
  if (UI.acc > 0.2) {
    UI.acc = 0;
    if (tabVisible('shop')) { if (UI.dirtyUps) renderUps(); else updateUps(); updateShop(); if (UI.selUp) { const d = U.$('#upDet .cost'); if (d) { const c = upCost(UI.selUp), can = canAfford(c); d.className = 'cost ' + (can ? 'yes' : 'no'); const bb = U.$('#upBuyBtn'); if (bb) bb.className = 'btn ' + (can && !inChal('noupgrade') ? 'gold' : 'dis'); } } }
    updateBuffs(); updateChalBanner();
    if (tabVisible('petri')) updatePetriCosts();
    if (UI.dirtyUps && !tabVisible('shop') && G.unlockedUps.some(u => canAfford(upCost(u)))) markTab('shop');
  }
  if (UI.slowAcc > 1) {
    UI.slowAcc = 0;
    renderVisible(false);
    if (tabVisible('stats')) renderStats();
    if (tabVisible('petri')) { updatePetriInfo(); if (UI.selCell < 0) renderPetriDet(); }
    if (tabVisible('nobel')) updateNobelLive();
    if (tabVisible('opts')) updateLastSave();
    updateHeader();
    if (UI.dirtyPetri && !tabVisible('petri') && petriOpen()) { UI.dirtyPetri = false; }
    document.title = (godMode() ? '∞' : fmtS(S.bank)) + ' molécules — Labo Infini';
  }
}
function offlineModal(r) {
  SFX.play('welcome');
  const lines = TX(() => TXT_OFFLINE, null) || ['Pendant vos {duree} d’absence, le labo a continué de tourner.'];
  const t = U.pick(lines).replace(/\{duree\}/g, fmtDuree(r.sec));
  modal('Bon retour au labo !', '<p>' + U.esc(t) + '</p><p class="big">+' + fmtMol(r.gain) + '</p><p class="center sub">produites pendant votre absence (' + fmtPct(r.pct) + ' de la production' + (r.eff < r.sec ? ', limitée à ' + fmtTime(r.eff) : '') + ')</p>' +
    (r.pct < 1 ? '<p class="sub">Améliorez la production hors-ligne dans la Fondation Nobel.</p>' : ''), [{ t: 'Au travail !', cls: 'gold' }], true);
}
