/* ===================== BOÎTE DE PETRI (mini-jeu) ===================== */
function petriOpen() { return n('microscope') > 0; }
function petriSize() {
  const m = n('microscope');
  let s = m >= 300 ? 6 : m >= 150 ? 5 : m >= 50 ? 4 : 3;
  if (pn('petri3')) s++;
  return Math.min(7, s);
}
function petriInterval() { return pn('petri1') ? 30 : 60; }
function strainCost(st) { return Math.max(st.cost * G.cpsNoBuff, 50 * (STRAINS.indexOf(st) + 1)); }
function petriStage(c) { // 0,1,2 = stades ; -1 morte
  if (!c || c.s === 'dead') return -1;
  const st = SMAP[c.s]; if (c.a >= st.grow) return 2; if (c.a >= st.grow / 2) return 1; return 0;
}
function petriUpdate(dt) {
  if (!petriOpen()) return;
  S.petri.timer -= dt;
  let guard = 0;
  while (S.petri.timer <= 0 && guard++ < 50) { S.petri.timer += petriInterval(); petriTick(); }
}
function petriNeighbors(i, sz) {
  const x = i % 7, y = Math.floor(i / 7), out = [];
  for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
    if (!dx && !dy) continue;
    const nx = x + dx, ny = y + dy;
    if (nx >= 0 && ny >= 0 && nx < sz && ny < sz) out.push(ny * 7 + nx);
  }
  return out;
}
function petriTick(silent) {
  const P = S.petri, sz = petriSize(), grid = P.grid;
  // Vieillissement
  for (let y = 0; y < sz; y++) for (let x = 0; x < sz; x++) {
    const i = y * 7 + x, c = grid[i];
    if (!c) continue;
    if (c.s === 'dead') { grid[i] = null; continue; }
    c.a++;
    const st = SMAP[c.s];
    if (st.life && c.a >= st.grow + st.life) grid[i] = { s: 'dead', a: 0 };
  }
  // Mutations
  const mc = pn('petri2') ? 1.5 : 1;
  const births = [];
  for (let y = 0; y < sz; y++) for (let x = 0; x < sz; x++) {
    const i = y * 7 + x;
    if (grid[i]) continue;
    const cnt = {};
    petriNeighbors(i, sz).forEach(j => { const c = grid[j]; if (petriStage(c) === 2) cnt[c.s] = (cnt[c.s] || 0) + 1; });
    const ok = [];
    for (const st of STRAINS) {
      if (!st.rec) continue;
      const [a, b] = st.rec;
      const present = a === b ? (cnt[a] || 0) >= 2 : (cnt[a] || 0) >= 1 && (cnt[b] || 0) >= 1;
      if (present && Math.random() < st.ch * mc) ok.push(st);
    }
    if (ok.length) births.push([i, U.pick(ok)]);
  }
  births.forEach(([i, st]) => {
    grid[i] = { s: st.id, a: 0 };
    if (!P.disc[st.id]) {
      P.disc[st.id] = true;
      if (G.ready) journal('petri', 'Nouvelle souche découverte : <b>' + U.esc(st.name) + '</b>');
      if (!silent && G.ready) { toast('Nouvelle souche découverte : <b>' + U.esc(st.name) + '</b> !', 'petri', st.sprite); SFX.play('mutation'); }
    }
  });
  P.schro = Math.random() < 0.5;
  // Boîte pleine ?
  let full = true;
  for (let y = 0; y < sz && full; y++) for (let x = 0; x < sz; x++) { const c = grid[y * 7 + x]; if (!c || c.s === 'dead') { full = false; break; } }
  if (full) secret('fullpetri');
  recalc();
  UI.dirtyPetri = true;
}
function petriOffline(sec) {
  if (!petriOpen()) return;
  const iv = petriInterval();
  let ticks = Math.floor((sec + (iv - S.petri.timer)) / iv);
  S.petri.timer = iv - ((sec + (iv - S.petri.timer)) % iv);
  ticks = Math.min(ticks, 200);
  for (let k = 0; k < ticks; k++) petriTick(true);
}
function petriPlant(i, id) {
  const st = SMAP[id], P = S.petri;
  if (!st || !P.disc[id] || P.grid[i]) return false;
  const c = strainCost(st);
  if (!canAfford(c)) { SFX.play('error'); toast('Pas assez de molécules pour cette culture.', 'warn'); return false; }
  spend(c);
  P.grid[i] = { s: id, a: 0 }; P.plants++;
  SFX.play('plant'); checkAch(); UI.dirtyPetri = true;
  return true;
}
function petriHarvest(i) {
  const P = S.petri, c = P.grid[i];
  if (!c) return 0;
  if (c.s === 'dead') { P.grid[i] = null; UI.dirtyPetri = true; return 0; }
  const st = SMAP[c.s];
  let gain = 0;
  if (c.a >= st.grow) {
    gain = st.harvest * G.cpsNoBuff + 10;
    earn(gain, false);
    P.harvests++;
    if (c.s === 'omega') P.omega++;
    SFX.play('harvest');
  } else SFX.play('sell');
  P.grid[i] = null;
  recalc(); checkAch(); UI.dirtyPetri = true;
  return gain;
}
function petriAch(k) {
  const P = S.petri, d = Object.keys(P.disc).filter(id => SMAP[id] && P.disc[id]).length;
  return [P.plants >= 1, P.harvests >= 10, P.harvests >= 100, d >= 6, d >= STRAINS.length, P.omega >= 1][k];
}
