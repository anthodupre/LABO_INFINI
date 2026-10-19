/* ===================== MOTEUR ===================== */
// G = valeurs calculées (non sauvegardées)
const G = {
  cps: 0, cpsNoBuff: 0, click: 1, unit: {}, bcps: {}, totalB: 0, upCount: 0, types: 0, rep: 0, achN: 0,
  bCostMult: 1, uCostMult: 1, growth: 1.15, goldFreq: 1, goldStay: 13, goldDur: 1, eurekaSpeed: 1, eurekaDur: 10,
  petri: { cps: 0, gold: 0, click: 0, bcost: 0, gdur: 0, ucost: 0, eureka: 0, schro: 0 },
  mults: [], dirty: true, unlockedUps: [], upsKey: '', era: 0,
};
const n = id => S.b[id] || 0;
const has = id => !!S.up[id];
const pn = id => !!S.prestige[id];
const chalDone = id => !!S.chalDone[id];
function inChal(id) {
  const c = S.challenge;
  if (!c) return false;
  if (c === id) return true;
  return c === 'grand' && (id === 'noclick' || id === 'noupgrade' || id === 'budget');
}
function secret(key) { if (!S.flags['s_' + key]) { S.flags['s_' + key] = true; checkAch(); } }
function achCount() { let c = 0; for (const id in S.ach) if (ACHMAP[id] && id !== 'as_burger') c++; return c; }
function godMode() { return S.set.dev && S.set.god; }

function recalc() {
  let totalB = 0, types = 0;
  B_IDS.forEach(id => { totalB += n(id); if (n(id) > 0) types++; });
  const nonPip = totalB - n('pipette');
  const dbl = {}; B_IDS.forEach(id => dbl[id] = 0);
  let cafeAdd = 0, cafeMult = 1, pipD = 0, upCount = 0, prov = 1, clickPct = 0.01; // chaque clic rapporte d'office 1 % de la production
  const specs = [], syns = [], repFs = [], gold = [];
  for (const id in S.up) {
    const u = UPMAP[id]; if (!u) continue; upCount++;
    switch (u.type) {
      case 'tier':
        if (u.b === 'pipette') { if (u.k < 3) pipD++; else if (u.cafe === 'add') cafeAdd = 0.1; else cafeMult *= u.cafe; }
        else dbl[u.b]++;
        break;
      case 'spec': specs.push(u); break;
      case 'syn': syns.push(u); break;
      case 'prov': prov *= 1 + u.pct; break;
      case 'clickpct': clickPct += 0.02; break;
      case 'goldup': gold[u.k] = true; break;
      case 'rep': repFs.push(u.f); break;
    }
  }
  // Effets de la boîte de Petri (cultures mûres)
  const pe = G.petri = { cps: 0, gold: 0, click: 0, bcost: 0, gdur: 0, ucost: 0, eureka: 0, schro: 0 };
  if (petriOpen()) {
    const sz = petriSize();
    for (let y = 0; y < sz; y++) for (let x = 0; x < sz; x++) {
      const c = S.petri.grid[y * 7 + x];
      if (!c || c.s === 'dead') continue;
      const st = SMAP[c.s]; if (!st || c.a < st.grow) continue;
      for (const k in st.eff) {
        if (k === 'schro') { if (S.petri.schro) pe.cps += st.eff.schro; pe.schro++; }
        else pe[k] += st.eff[k];
      }
    }
  }
  const cafe = cafeAdd * cafeMult * nonPip;
  const mult = {}; B_IDS.forEach(id => mult[id] = Math.pow(2, dbl[id]));
  const specX = pn('spec') ? 2 : 1, synX = pn('syn') ? 2 : 1;
  specs.forEach(u => { mult.stagiaire *= 2; mult[u.b] *= 1 + 0.01 * specX * n('stagiaire') / u.per; });
  syns.forEach(u => { mult[u.a] *= 1 + 0.05 * synX * n(u.c); mult[u.c] *= 1 + 0.001 * synX * n(u.a); });
  let base = 0;
  BUILDINGS.forEach(b => {
    const unit = b.id === 'pipette' ? b.cps * Math.pow(2, pipD) + cafe : b.cps * mult[b.id];
    G.unit[b.id] = unit; G.bcps[b.id] = unit * n(b.id); base += G.bcps[b.id];
  });
  // Multiplicateurs globaux
  const M = [];
  let gm = prov; if (prov > 1) M.push(['Provisions', prov]);
  const achN = achCount();
  const rep = achN * 0.04 * (1 + (pn('rep1') ? 0.1 : 0) + (pn('rep2') ? 0.2 : 0));
  let rm = 1; repFs.forEach(f => rm *= 1 + rep * f); gm *= rm; if (rm > 1) M.push(['Hiérarchie académique', rm]);
  const nm = 1 + nobelBonusN() * nobelEff(); gm *= nm; if (nm > 1) M.push(['Prix Nobel', nm]);
  let fm = 1;
  [['fond', 1.1], ['boost2', 1.15], ['boost3', 1.2], ['boost4', 1.25], ['boost5', 1.5], ['boost6', 2], ['boost7', 3], ['boost8', 5], ['fin', 10]].forEach(([id, m]) => { if (pn(id)) fm *= m; });
  gm *= fm; if (fm > 1) M.push(['Fondation Nobel', fm]);
  let cm = 1;
  if (chalDone('noclick')) cm *= 1.1;
  if (chalDone('minimal')) cm *= 1 + 0.01 * types;
  if (chalDone('cap10')) cm *= 1.25;
  if (chalDone('grand')) cm *= 2;
  if (chalDone('speedrun') && S.runTime < 600) cm *= 3;
  gm *= cm; if (cm !== 1) M.push(['Protocoles réussis', cm]);
  if (pe.cps) { gm *= 1 + pe.cps; M.push(['Boîte de Petri', 1 + pe.cps]); }
  if (S.era > 0) { const em = Math.pow(1.25, S.era); gm *= em; M.push(['Changements de paradigme (ères)', em]); }
  if (inChal('entropy')) { gm *= 0.1; M.push(['Entropie', 0.1]); }
  G.cpsNoBuff = base * gm;
  let bm = 1, km = 1;
  S.buffs.forEach(bf => { if (bf.cps) bm *= bf.cps; if (bf.click) km *= bf.click; });
  if (bm !== 1) M.push(['Effets temporaires', bm]);
  G.cps = G.cpsNoBuff * bm;
  G.gmAll = gm * bm;
  G.mults = M; G.rep = rep; G.achN = achN; G.totalB = totalB; G.types = types; G.upCount = upCount; G.clickPct = clickPct;
  // Clic
  let click = Math.pow(2, pipD) + cafe;
  click *= (pn('click1') ? 2 : 1) * (pn('click2') ? 3 : 1) * (1 + pe.click);
  click += G.cps * clickPct;
  click *= km;
  if (inChal('noclick')) click = 0;
  G.click = click;
  // Coûts
  let bcm = (pn('cheap1') ? 0.98 : 1) * (pn('cheap2') ? 0.97 : 1) * (pn('cheap3') ? 0.95 : 1) * (chalDone('budget') ? 0.97 : 1) * Math.max(0.5, 1 - pe.bcost);
  if (inChal('budget')) bcm *= 10;
  G.bCostMult = bcm;
  G.uCostMult = (pn('upcheap1') ? 0.95 : 1) * (pn('upcheap2') ? 0.9 : 1) * (chalDone('noupgrade') ? 0.9 : 1) * Math.max(0.5, 1 - pe.ucost);
  G.growth = inChal('inflation') ? 1.25 : chalDone('inflation') ? 1.145 : 1.15;
  // Fioles dorées
  G.goldFreq = (gold[0] ? 2 : 1) * (gold[1] ? 2 : 1) * (1 + (pn('gold1') ? 0.05 : 0) + (chalDone('nogold') ? 0.15 : 0) + pe.gold);
  G.goldStay = 13 * (gold[0] ? 2 : 1) * (gold[1] ? 2 : 1) * (pn('gold3') ? 2 : 1) * (gold[4] ? 1.5 : 1);
  G.goldDur = (gold[2] ? 2 : 1) * (1 + (pn('gold2') ? 0.1 : 0) + (chalDone('entropy') ? 0.2 : 0) + pe.gdur);
  G.stormMult = gold[3] ? 2 : 1; G.chainMult = (gold[5] ? 2 : 1) * (pn('lucky') ? 2 : 1);
  G.eurekaSpeed = (pn('eureka1') ? 1.5 : 1) * (1 + pe.eureka);
  G.eurekaDur = 10 * (pn('eureka1') ? 1.5 : 1);
  G.ghost = inChal('noclick') ? 0 : pn('ghost2') ? 5 : pn('ghost1') ? 1 : 0;
  G.dirty = false;
}

/* ---------- Gains ---------- */
const NMAX = Number.MAX_VALUE;
function earn(amount, handmade) {
  if (!(amount > 0)) return;
  if (amount > NMAX) amount = NMAX;
  S.bank = Math.min(NMAX, S.bank + amount); S.runEarned = Math.min(NMAX, S.runEarned + amount); S.allEarned = Math.min(NMAX, S.allEarned + amount);
  if (handmade) { S.handmade = Math.min(NMAX, S.handmade + amount); S.handmadeAll = Math.min(NMAX, S.handmadeAll + amount); }
}
function canAfford(cost) { return godMode() || S.bank >= cost; }
function spend(cost) { if (!godMode()) S.bank = Math.max(0, S.bank - cost); }

/* ---------- Bâtiments ---------- */
function bCost(id, owned) { return Math.ceil(BMAP[id].cost * Math.pow(G.growth, owned == null ? n(id) : owned) * G.bCostMult); }
function bCostBulk(id, amt) {
  const g = G.growth, c0 = BMAP[id].cost * Math.pow(g, n(id)) * G.bCostMult;
  return Math.ceil(c0 * (Math.pow(g, amt) - 1) / (g - 1));
}
function bLimit(id) { // nombre max achetable selon les protocoles (Infinity sinon)
  let lim = Infinity;
  if (inChal('cap10')) lim = Math.min(lim, Math.max(0, 10 - n(id)));
  if (inChal('minimal') && n(id) === 0 && G.types >= 3) lim = 0;
  return lim;
}
function bMaxBuy(id) {
  if (godMode()) return Math.min(bLimit(id), 100);
  const g = G.growth, c0 = BMAP[id].cost * Math.pow(g, n(id)) * G.bCostMult;
  let k = Math.floor(Math.log(S.bank * (g - 1) / c0 + 1) / Math.log(g));
  if (!isFinite(k) || k < 0) k = 0;
  while (k > 0 && bCostBulk(id, k) > S.bank) k--;
  return Math.min(k, bLimit(id));
}
function buyAmount(id) {
  const a = S.set.buyAmt, lim = bLimit(id);
  if (lim <= 0) return 0;
  if (a === -1) return Math.max(1, bMaxBuy(id));
  return Math.min(a, lim);
}
function buyBuilding(id) {
  const amt = buyAmount(id);
  if (amt <= 0) { SFX.play('error'); return false; }
  const cost = bCostBulk(id, amt);
  if (!canAfford(cost)) { SFX.play('error'); return false; }
  const before = S.bank;
  spend(cost);
  const wasNew = !n(id);
  if (wasNew) S.lastNewT = S.runTime; // nouveau type de bâtiment dans cette partie : le labo avance
  S.b[id] = n(id) + amt;
  if (amt >= 100) secret('bulk');
  if (cost >= 1e6 && S.bank < cost * 0.01 && before >= cost && !godMode()) secret('broke');
  recalc(); updateEra(); checkUnlocks(); checkAch();
  SFX.play(wasNew ? 'newb' : amt >= 10 ? 'buybulk' : 'buy');
  return true;
}
function sellBuilding(id) {
  const a = S.set.buyAmt === -1 ? n(id) : Math.min(S.set.buyAmt, n(id));
  if (a <= 0) return false;
  let refund = 0;
  for (let i = 0; i < a; i++) refund += bCost(id, n(id) - 1 - i) * 0.25;
  S.b[id] = n(id) - a; S.bank = Math.min(NMAX, S.bank + (isFinite(refund) ? refund : NMAX)); S.sold += a;
  secret('sell1'); if (S.sold >= 100) secret('sell100');
  recalc(); checkUnlocks(); checkAch();
  SFX.play('sell');
  return true;
}

/* ---------- Améliorations ---------- */
function upCost(u) { return Math.ceil(u.cost * G.uCostMult); }
function upUnlocked(u) {
  switch (u.type) {
    case 'tier': return n(u.b) >= u.reqN;
    case 'spec': return n(u.b) >= 15 && n('stagiaire') >= 1;
    case 'syn': return n(u.a) >= 15 && n(u.c) >= 15;
    case 'prov': return S.runEarned >= u.cost * 0.3;
    case 'clickpct': return S.clicksAll >= u.req && S.runEarned >= u.cost * 0.05;
    case 'goldup': return S.goldClicks >= u.req;
    case 'rep': return G.achN >= u.req;
  }
  return false;
}
function checkUnlocks() {
  const list = [];
  for (const u of UPGRADES) if (!S.up[u.id] && upUnlocked(u)) list.push(u);
  list.sort((a, b) => a.cost - b.cost || a.order - b.order);
  const key = list.map(u => u.id).join(',');
  if (key !== G.upsKey) { G.upsKey = key; G.unlockedUps = list; UI.dirtyUps = true; }
}
function buyUp(u, silent) {
  if (S.up[u.id] || !upUnlocked(u)) return false;
  if (inChal('noupgrade')) { if (!silent) { toast('Protocole en cours : améliorations interdites !', 'warn'); SFX.play('error'); } return false; }
  const c = upCost(u);
  if (!canAfford(c)) { if (!silent) SFX.play('error'); return false; }
  spend(c); S.up[u.id] = 1;
  recalc(); checkUnlocks(); checkAch();
  if (!silent) SFX.play('upgrade');
  return true;
}
function buyAllUps() {
  if (inChal('noupgrade')) { toast('Protocole en cours : améliorations interdites !', 'warn'); return 0; }
  let k = 0;
  const list = G.unlockedUps.slice().sort((a, b) => upCost(a) - upCost(b));
  for (const u of list) { if (canAfford(upCost(u)) && buyUp(u, true)) k++; else if (!godMode()) break; }
  if (k) SFX.play('upgrade'); else SFX.play('error');
  return k;
}

/* ---------- Clic & Eurêka ---------- */
const CLICKLOG = [];
function clickVessel(manual = true) {
  const gain = G.click;
  earn(gain, true);
  if (manual) {
    S.clicks++; S.clicksAll++;
    const t = performance.now();
    CLICKLOG.push(t); while (CLICKLOG.length && t - CLICKLOG[0] > 1000) CLICKLOG.shift();
    if (CLICKLOG.length >= 12) secret('speed');
    S.flags.lastClick = U.now(); G.idleT = 0;
    if (!S.buffs.some(b => b.key === 'eureka') && !inChal('noclick')) {
      S.eureka += 1.25 * G.eurekaSpeed;
      G.eurekaIdle = 0;
      if (S.eureka >= 100) triggerEureka();
    }
  }
  return gain;
}
function triggerEureka() {
  S.eureka = 0; S.eurekas++;
  addBuff({ key: 'eureka', name: 'Eurêka !', click: 10, t: G.eurekaDur, icon: 'i_eureka' });
  const line = U.pick(TX(() => TXT_EUREKA, null) || ['EURÊKA !']);
  bigText(line, '#fee761');
  SFX.play('eureka');
  if (S.set.flash) flashScreen('#fee761');
  checkAch();
}
function addBuff(b) {
  b.dur = b.t;
  const i = S.buffs.findIndex(x => x.key === b.key);
  if (i >= 0) S.buffs[i] = b; else S.buffs.push(b);
  recalc(); UI.dirtyBuffs = true;
}

/* ---------- Ères ---------- */
function setEraClass() { const a = document.getElementById('app'); if (!a) return; for (let i = 0; i < 9; i++) a.classList.toggle('era-' + i, i === S.era); }
function eraFromBuildings() { let e = 0; for (let i = 0; i < ERA_REQ.length; i++) if (n(B_IDS[ERA_REQ[i]]) > 0) e = i; return e; }
function updateEra() {
  const e = eraFromBuildings();
  if (e > S.era) {
    S.era = e;
    const first = e > S.eraMax;
    if (first) S.eraMax = e;
    recalc();
    setEraClass();
    if (G.ready) eraAnnounce(e, first);
    SCENE.dirtyBg = true;
  }
}

/* ---------- Succès ---------- */
let ACH_QUEUE = [];
function checkAch() {
  let got = false;
  for (const a of ACH) {
    if (S.ach[a.id]) continue;
    let ok = false; try { ok = a.check(); } catch (e) { ok = false; }
    if (ok) { S.ach[a.id] = U.now(); got = true; if (G.ready) achToast(a); }
  }
  if (got) { recalc(); checkUnlocks(); UI.dirtyAch = true; }
}

/* ---------- Prestige : publication & Nobel ---------- */
function nobelsFor(all) { return Math.floor(Math.cbrt(all / NOBEL_BASE) + 1e-9); }
// au-delà de 1000 Nobels, le bonus de production croît en racine carrée (évite l'emballement)
// Bonus des prix Nobel (en « points de % » avant le multiplicateur nobelEff) : les 10 premiers valent +10 % chacun
// (la 1re publication doit se sentir), puis +1 % chacun jusqu'à 100, puis racine carrée (évite l'emballement).
function nobelBonusN() { const N = S.nobels; return (N <= 100 ? N : 100 * Math.sqrt(N / 100)) + 9 * Math.min(N, 10); }
function nobelEff() { return 0.01 * (pn('nobel1') ? 1.25 : 1) * (pn('nobel2') ? 1.5 : 1) * (pn('nobel3') ? 2 : 1); }
// Multiplicateur de production qu'apporterait une publication maintenant (effet des prix Nobel seulement)
function publishGainRatio() {
  const p = pendingNobels(); if (p <= 0) return 1;
  const N0 = S.nobels, cur = 1 + nobelBonusN() * nobelEff();
  S.nobels = N0 + p; const nxt = 1 + nobelBonusN() * nobelEff(); S.nobels = N0;
  return nxt / cur;
}
function pendingNobels() { return Math.max(0, nobelsFor(S.allEarned) - S.nobels); }
function nextNobelAt() { const t = nobelsFor(S.allEarned) + 1; return Math.pow(t, 3) * NOBEL_BASE; }
function resetRun() {
  const keep = { goldT: U.rand(150, 300), anoT: U.rand(1200, 2400) };
  Object.assign(S, defaultRun(), keep);
  S.petri.grid = Array(49).fill(null);
  // Kits de départ
  const kit = {};
  if (pn('kit1')) { kit.pipette = 10; kit.stagiaire = 5; }
  if (pn('kit2')) { kit.pipette = 50; kit.stagiaire = 25; kit.bunsen = 10; }
  if (pn('kit3')) B_IDS.slice(0, 6).forEach(id => kit[id] = 100);
  for (const id in kit) S.b[id] = kit[id];
  if (inChal('cap10')) for (const id in S.b) S.b[id] = Math.min(10, S.b[id]);
  if (inChal('minimal')) { const ids = Object.keys(S.b).filter(id => S.b[id] > 0); ids.slice(3).forEach(id => delete S.b[id]); }
  G.upsKey = ''; recalc(); S.era = 0; updateEra(); checkUnlocks();
  SCENE.dirtyBg = true; UI.dirtyAll = true;
}
function publish() {
  const gain = pendingNobels();
  if (gain <= 0) secret('emptypub');
  S.nobels += gain; S.nobelPts += gain; S.publishes++;
  if (S.runEarned > S.bestRun) S.bestRun = S.runEarned;
  if (S.challenge) { S.challenge = null; }
  resetRun();
  checkAch(); saveGame();
  SFX.play('publish');
  return gain;
}
function buyNode(id) {
  const p = PMAP[id];
  if (!p || S.prestige[id]) return false;
  if (p.req && !S.prestige[p.req]) return false;
  if (S.nobelPts < p.cost && !godMode()) { SFX.play('error'); return false; }
  if (!godMode()) S.nobelPts -= p.cost;
  S.prestige[id] = 1;
  if (PRESTIGE.every(q => S.prestige[q.id])) secret('alltree');
  recalc(); checkUnlocks(); checkAch(); SFX.play('node');
  return true;
}

/* ---------- Protocoles ---------- */
function startChallenge(id) {
  publish();
  S.challenge = id; S.chalStart = U.now(); S.chalTime = 0;
  resetRun(); SFX.play('chalstart');
  saveGame();
}
function abandonChallenge() { S.challenge = null; recalc(); checkUnlocks(); UI.dirtyAll = true; }
function checkChallenge(dt) {
  const c = S.challenge; if (!c) return;
  S.chalTime += dt;
  if (c === 'speedrun' && S.chalTime > 20 * 60 && !godMode()) {
    S.challenge = null; secret('tooslow'); recalc(); UI.dirtyAll = true; SFX.play('chalfail');
    modal('Protocole échoué', '<p>Le chronomètre a sonné : 20 minutes écoulées. Le comité d’éthique vous regarde avec pitié.</p><p>Les restrictions sont levées, la partie continue normalement.</p>', null, true);
    return;
  }
  if (S.runEarned >= CMAP[c].goal) {
    S.chalDone[c] = true; S.challenge = null;
    recalc(); checkUnlocks(); checkAch(); UI.dirtyAll = true;
    SFX.play('chalwin');
    journal('chal', 'Protocole réussi : <b>' + U.esc(CMAP[c].name) + '</b>');
    modal('Protocole réussi !', '<p class="big">' + U.esc(CMAP[c].name) + '</p><p>Récompense permanente : ' + CMAP[c].reward + '</p><p>Les restrictions sont levées, la partie continue normalement.</p>', null, true);
  }
}

/* ---------- Boucle logique ---------- */
let achTimer = 0, unlockTimer = 0, stallTimer = 0;
function tick(dt) {
  // dt en secondes (déjà multiplié par la vitesse DEV)
  S.runTime += dt; S.playTime += dt; G.idleT = (G.idleT || 0) + dt;
  // Production
  if (G.dirty) recalc();
  earn(G.cps * dt, false);
  // Pipette fantôme
  if (G.ghost > 0) {
    G.ghostAcc = (G.ghostAcc || 0) + dt * G.ghost;
    while (G.ghostAcc >= 1) { G.ghostAcc -= 1; const g = clickVessel(false); if (G.ready) SCENE.ghostClick(g); }
  }
  // Buffs
  let changed = false;
  for (const b of S.buffs) { b.t -= dt; if (b.t <= 0) changed = true; }
  if (changed) { S.buffs = S.buffs.filter(b => b.t > 0); recalc(); UI.dirtyBuffs = true; if (G.ready) SFX.play('buffend'); }
  // Eurêka : décroissance
  G.eurekaIdle = (G.eurekaIdle || 0) + dt;
  if (G.eurekaIdle > 1.5 && S.eureka > 0) S.eureka = Math.max(0, S.eureka - 6 * dt);
  // Bonus du protocole « course » (expire à 10 min)
  if (chalDone('speedrun') && S.runTime - dt < 600 && S.runTime >= 600) recalc();
  // Fioles dorées
  GOLD.update(dt);
  // Petri & incidents
  petriUpdate(dt);
  INC.update(dt);
  // Protocoles
  checkChallenge(dt);
  // Contrôles périodiques
  achTimer += dt; unlockTimer += dt; stallTimer += dt;
  if (stallTimer > 5) { stallTimer = 0; checkStall(); }
  if (unlockTimer > 0.5) { unlockTimer = 0; checkUnlocks(); }
  if (achTimer > 1) {
    achTimer = 0; checkAch();
    if (G.cps > S.bestCps) S.bestCps = G.cps;
    if (G.idleT > 1800) secret('idle');
    if (S.playTime > 86400) secret('insomnia');
    if (B_IDS.every(id => n(id) > 0)) secret('collector');
  }
}

/* ---------- Progression constante : conseiller de publier quand le labo stagne ---------- */
// Stagnation = aucun nouveau type de bâtiment depuis 20 min dans cette partie, et le prochain n'est pas à moins de
// 10 min. On conseille de publier seulement si ça multiplierait la production d'au moins ×1,5 (×1,3 pour la toute
// 1re publication). Rappel au plus toutes les 45 min ET si les Nobels disponibles ont doublé (gardé dans la sauvegarde :
// une relance de l'app ne répète pas le conseil).
function checkStall() {
  if (!G.ready || S.challenge || S.runTime - (S.lastNewT || 0) < 1200) return;
  const p = pendingNobels();
  if (S.nudgeAt != null && (S.runTime - S.nudgeAt < 2700 || p < 2 * (S.nudgeN || 1))) return;
  const next = B_IDS.find(id => !n(id) && bLimit(id) > 0);
  if (next && (bCost(next) - S.bank) / Math.max(G.cps, 1e-9) < 600) return;
  const r = publishGainRatio(); if (r < (S.nobels ? 1.5 : 1.3)) return;
  S.nudgeAt = S.runTime; S.nudgeN = p;
  const msg = 'Le labo plafonne. <b>Publiez vos travaux</b> (onglet Nobel) : <b>+' + fmtNom(p, 'prix Nobel', 'prix Nobel') +
    '</b>, production <b>×' + dec(r, r < 10 ? 1 : 0) + '</b> pour toujours. Vous repartirez de zéro, mais bien plus vite.';
  toast(msg, 'ach', 'i_nobel', 'Conseil du comité Nobel', 10000);
  journal('nobel', msg); markTab('nobel'); SFX.play('advice');
}

/* ---------- Hors-ligne ---------- */
function offlineParams() {
  if (pn('auto4')) return [1, 7 * 86400];
  if (pn('auto3')) return [1, 48 * 3600];
  if (pn('auto2')) return [0.6, 16 * 3600];
  if (pn('auto1')) return [0.3, 8 * 3600];
  return [0.25, 4 * 3600];
}
function applyOffline(sec) {
  if (sec < 5) return null;
  if (sec > 7 * 86400) secret('holiday');
  const [pct0, cap] = offlineParams();
  const pct = sec < 60 ? 1 : pct0; // courte suspension (changement d'app) : comptée en entier
  const eff = Math.min(sec, cap);
  S.runTime += sec; S.offlineTotal += sec;
  if (S.challenge) S.chalTime += sec;
  // les effets temporaires s'écoulent pendant l'absence (au lieu d'être effacés)
  S.buffs.forEach(b => b.t -= sec); S.buffs = S.buffs.filter(b => b.t > 0);
  recalc(); UI.dirtyBuffs = true;
  const gain = G.cpsNoBuff * eff * pct;
  earn(gain, false);
  // Petri : cycles écoulés (limités)
  petriOffline(sec);
  GOLD.offline(sec);
  recalc();
  return { sec, eff, pct, gain };
}
