/* ===================== FIOLES DORÉES & ANOMALIES ===================== */
const GOLD = {
  list: [], stormAcc: 0,
  interval() { return U.rand(240, 720) / G.goldFreq; },
  update(dt) {
    if (!G.ready) return;
    if (!inChal('nogold')) {
      S.goldT -= dt;
      if (S.goldT <= 0) {
        S.goldT = this.interval();
        this.spawn('gold');
        if (pn('twin') && Math.random() < 0.03) this.spawn('gold');
      }
    }
    if (pn('anomaly')) {
      S.anoT -= dt;
      if (S.anoT <= 0) { S.anoT = U.rand(1200, 2400) / (1 + G.petri.gold); this.spawn('ano'); }
    }
    for (const g of this.list.slice()) {
      g.life -= dt;
      if (g.type !== 'mini') {
        const fade = g.life < 2 ? (Math.floor(g.life * 6) % 2 ? 0.35 : 1) : Math.min(1, (g.max - g.life) * 2);
        g.el.style.opacity = fade;
      }
      if (g.life <= 0) {
        if (g.type === 'gold') { S.flags.missed = (S.flags.missed || 0) + 1; if (S.flags.missed >= 10) secret('miss'); }
        this.remove(g);
      }
    }
    if (S.storm > 0) {
      S.storm -= dt;
      this.stormAcc += dt * (pn('storm') ? 7 : 4);
      while (this.stormAcc >= 1) { this.stormAcc -= 1; this.spawn('mini'); }
    }
  },
  offline(sec) { this.list.slice().forEach(g => { g.life -= sec; if (g.life <= 0) this.remove(g); }); S.storm = Math.max(0, S.storm - sec); },
  remove(g) { const i = this.list.indexOf(g); if (i >= 0) this.list.splice(i, 1); if (g.el && g.el.parentNode) g.el.parentNode.removeChild(g.el); },
  spawn(type) {
    const fx = U.$('#fx'); if (!fx) return;
    const W = fx.clientWidth, H = fx.clientHeight;
    const el = U.el('div', 'shimmer ' + type);
    const sz = type === 'mini' ? 40 : 64;
    const img = U.el('img'); img.draggable = false;
    img.src = GFX.url(type === 'ano' ? 'g_anomaly' : type === 'mini' ? 'g_mini' : 'g_golden', 0, type === 'mini' ? 5 : 4);
    img.style.width = img.style.height = sz + 'px';
    el.appendChild(img);
    const x = U.rand(W * 0.06, Math.max(W * 0.06, W * 0.94 - sz)), y = type === 'mini' ? -sz : U.rand(H * 0.12, Math.max(H * 0.12, H * 0.86 - sz));
    el.style.left = x + 'px'; el.style.top = y + 'px';
    const g = { type, el, img, life: type === 'mini' ? 3.2 : G.goldStay * (type === 'ano' ? 0.8 : 1), born: performance.now(), x, y, sz, f: 0 };
    g.max = g.life;
    if (type === 'mini') { el.style.setProperty('--fall', (H + sz * 2) + 'px'); el.style.animationDuration = '3.2s'; }
    const swallow = ev => { ev.preventDefault(); ev.stopPropagation(); };
    el.addEventListener('pointerdown', ev => { swallow(ev); this.click(g, ev); });
    ['pointerup', 'click', 'touchstart', 'touchend', 'mousedown', 'mouseup'].forEach(t => el.addEventListener(t, swallow));
    fx.appendChild(el);
    this.list.push(g);
    // Animation de la frame du sprite
    if (type !== 'mini') {
      g.anim = setInterval(() => { if (!g.el.parentNode) { clearInterval(g.anim); return; } g.f ^= 1; g.img.src = GFX.url(type === 'ano' ? 'g_anomaly' : 'g_golden', g.f, 4); }, 450);
      SFX.play(type === 'ano' ? 'anomaly' : 'goldspawn');
    }
  },
  click(g, ev) {
    if (!this.list.includes(g)) return;
    const r = g.el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    blockTaps(450);
    const i = this.list.indexOf(g); if (i >= 0) this.list.splice(i, 1);
    const el = g.el; el.classList.add('caught'); el.style.animation = 'none'; el.style.transform = getComputedStyle(el).transform;
    clearInterval(g.anim);
    setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 450);
    if (g.type === 'mini') {
      const gain = G.cps * U.rand(1, 7) * G.stormMult + 1;
      earn(gain, false);
      popText(cx, cy, '+' + fmtS(gain), 'gold');
      SFX.play('click');
      sparkleAt(cx, cy, 4);
      return;
    }
    if (g.type === 'gold') {
      S.goldClicks++;
      if (performance.now() - g.born < 1000) secret('reflex');
      this.goldEffect(cx, cy);
    } else {
      S.anoClicks = (S.anoClicks || 0) + 1;
      secret('anomaly');
      this.anoEffect(cx, cy);
    }
    sparkleAt(cx, cy, 14);
    checkAch();
  },
  goldEffect(cx, cy) {
    const dm = G.goldDur;
    const opts = [['chain', 42], ['frenzy', 40], ['clickfrenzy', S.buffs.some(b => b.key === 'clickfrenzy') ? 1 : 6], ['storm', 3]];
    const big = B_IDS.filter(id => n(id) >= 10);
    if (big.length) opts.push(['surge', 9]);
    let tot = opts.reduce((a, o) => a + o[1], 0), r = Math.random() * tot, eff = 'chain';
    for (const o of opts) { if ((r -= o[1]) <= 0) { eff = o[0]; break; } }
    const T = GOLDEN_TXT[eff];
    let sub = '';
    switch (eff) {
      case 'chain': {
        const gain = (Math.min(S.bank * 0.15, G.cps * 900) + 13) * G.chainMult;
        earn(gain, false); sub = '+' + fmtMol(gain);
        break;
      }
      case 'frenzy': addBuff({ key: 'frenzy', name: T.n, cps: 7, t: 77 * dm, icon: 'g_golden' }); sub = 'Production ×7 pendant ' + fmtTime(77 * dm); break;
      case 'clickfrenzy': addBuff({ key: 'clickfrenzy', name: T.n, click: 777, t: 13 * dm, icon: 'i_cursor_gold' }); sub = 'Clics ×777 pendant ' + fmtTime(13 * dm); break;
      case 'surge': {
        const id = U.pick(big), b = BMAP[id], m = 1 + 0.1 * n(id);
        addBuff({ key: 'surge', name: T.n + ' (' + b.plural + ')', cps: m, t: 30 * dm, icon: b.sprite });
        sub = 'Production ×' + dec(m, 1) + ' grâce à vos ' + fmt(n(id)) + ' ' + b.lcPlural + ' pendant ' + fmtTime(30 * dm);
        break;
      }
      case 'storm': S.storm = 7 * dm * G.stormMult * (pn('storm') ? 1.5 : 1); sub = 'Attrapez les fioles qui tombent !'; break;
    }
    bigText(T.n, '#fee761', sub);
    journal('gold', '<b>' + U.esc(T.n) + '</b> — ' + U.esc(sub));
    SFX.play('gold'); if (eff === 'frenzy' || eff === 'clickfrenzy' || eff === 'storm') SFX.play(eff);
    if (S.set.flash) flashScreen('#fee761');
  },
  anoEffect(cx, cy) {
    const dm = G.goldDur;
    const r = Math.random();
    const eff = r < 0.4 ? 'singul' : r < 0.7 ? 'faille' : 'reson';
    const T = GOLDEN_TXT[eff];
    let sub = '';
    if (eff === 'singul') { addBuff({ key: 'singul', name: T.n, click: 7777, t: 7 * dm, icon: 'g_anomaly' }); sub = 'Clics ×7 777 pendant ' + fmtTime(7 * dm); }
    else if (eff === 'faille') { const gain = G.cpsNoBuff * 3600; earn(gain, false); sub = '+' + fmtMol(gain) + ' (1 heure de production)'; }
    else { addBuff({ key: 'reson', name: T.n, cps: 77, t: 17 * dm, icon: 'g_anomaly' }); sub = 'Production ×77 pendant ' + fmtTime(17 * dm); }
    bigText(T.n, '#d4b8ff', sub);
    journal('gold', '<b>' + U.esc(T.n) + '</b> — ' + U.esc(sub));
    SFX.play('anomaly');
    if (S.set.flash) flashScreen('#9b5de5');
  },
  clearAll() { this.list.slice().forEach(g => this.remove(g)); },
};
