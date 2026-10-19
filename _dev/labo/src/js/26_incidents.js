/* ===================== INCIDENTS DE LABO (événements absurdes) ===================== */
const INC = {
  timer: 100, hideT: 0,
  FALLBACK: [
    { e: 1, k: 'gain', n: 'Kévin a encore bu un truc', t: 'Il voit maintenant les molécules à l’œil nu et les ramasse à la main.' },
    { e: 1, k: 'buff', n: 'Le chat de la voisine', t: 'Pistache s’est assis sur le clavier. Les machines tournent deux fois plus vite. Personne ne sait pourquoi.' },
    { e: 1, k: 'gold', n: 'Reflet suspect', t: 'Quelque chose de doré brille dans un coin du labo.' },
  ],
  update(dt) {
    if (!G.ready) return;
    this.timer -= dt;
    if (this.timer <= 0) { this.timer = U.rand(150, 330); this.fire(); }
    if (this.hideT > 0) { this.hideT -= dt; if (this.hideT <= 0) U.$('#incident').classList.remove('on'); }
  },
  pick() {
    const all = (TX(() => TXT_INCIDENTS, null) || this.FALLBACK).filter(x => x && x.t);
    const era = S.era + 1;
    const pool = all.filter(x => (x.e || 1) <= era && (!x.b || n(x.b) > 0));
    if (!pool.length) return this.FALLBACK[0];
    // les incidents de l'ère actuelle (et des précédentes proches) sont plus probables
    const w = pool.map(x => Math.pow(2.2, -(era - (x.e || 1))));
    let r = Math.random() * w.reduce((a, b) => a + b, 0);
    for (let i = 0; i < pool.length; i++) { if ((r -= w[i]) <= 0) { if (this.last === pool[i] && pool.length > 1) continue; return (this.last = pool[i]); } }
    return pool[pool.length - 1];
  },
  apply(k, mag) {
    const e = S.era;
    switch (k) {
      case 'gain': { const g = (G.cpsNoBuff * U.rand(60, 180) + 150 * (e + 1)) * mag; earn(g, false); return '+' + fmtMol(g); }
      case 'buff': { const m = Math.round(3 * mag); addBuff({ key: 'incident', name: this.curName || 'Incident', cps: m, t: 30, icon: 'i_eureka' }); return 'Production ×' + m + ' pendant 30 s'; }
      case 'click': { const m = Math.round(15 * mag); addBuff({ key: 'incclick', name: this.curName || 'Doigts survoltés', click: m, t: 20, icon: 'i_click' }); return 'Clics ×' + m + ' pendant 20 s'; }
      case 'free': {
        const budget = G.cpsNoBuff * 900 * mag; // au plus ~15 min de production offerts
        const owned = B_IDS.filter(id => n(id) > 0 && bLimit(id) > 0 && bCost(id) <= budget);
        if (!owned.length) return this.apply('gain', mag);
        const id = owned[Math.max(0, owned.length - 1 - Math.floor(Math.random() * Math.min(3, owned.length)))];
        let k2 = Math.min(bLimit(id), Math.max(1, Math.min(50, Math.floor(n(id) * 0.08 * mag))));
        while (k2 > 1 && bCostBulk(id, k2) > budget) k2--;
        S.b[id] = n(id) + k2; recalc(); updateEra(); checkUnlocks(); checkAch();
        return '+' + k2 + ' ' + (k2 > 1 ? BMAP[id].lcPlural : BMAP[id].lcName) + ' gratuit' + (BMAP[id].fem ? 'e' : '') + (k2 > 1 ? 's' : '');
      }
      case 'gold': if (inChal('nogold')) return this.apply('gain', mag); GOLD.spawn('gold'); return 'Une fiole dorée est apparue !';
      case 'storm': if (inChal('nogold')) return this.apply('gain', mag); S.storm = 6 * mag; return 'Pluie de fioles : attrapez-les !';
      case 'chaos': {
        const a = U.pick(['gain', 'buff', 'click', 'free']), b = U.pick(['gain', 'storm', 'free'].filter(x => x !== a));
        if (S.set.flash) { const app = U.$('#app'); app.classList.remove('bigshake'); void app.offsetWidth; app.classList.add('bigshake'); }
        return this.apply(a, 1.5) + ' · ' + this.apply(b, 1.5);
      }
    }
    return '';
  },
  fire() {
    const x = this.pick();
    this.curName = x.n;
    const eff = this.apply(x.k || 'gain', 1);
    S.incidents = (S.incidents || 0) + 1;
    journal('inc', '<b>' + U.esc(x.n || 'Incident') + '</b> — ' + U.esc(x.t).replace(/\{labo\}/g, U.esc(S.labName)) + ' <span style="color:#8dff7a">' + eff + '</span>');
    const box = U.$('#incident');
    box.innerHTML = '<div class="il">⚠ INCIDENT DE LABO</div><div class="in">' + U.esc(x.n || 'Incident') + '</div><div class="it">' + U.esc(x.t).replace(/\{labo\}/g, U.esc(S.labName)) + '</div><div class="ie">' + eff + '</div>';
    box.classList.remove('on'); void box.offsetWidth; box.classList.add('on');
    this.hideT = 12 + Math.max(0, (x.t || '').length - 80) * 0.08;
    SFX.play('incident');
    UI.dirtyBuffs = true;
  },
};
