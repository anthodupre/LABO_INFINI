/* ===================== SCÈNE PRINCIPALE (canvas pixel art) ===================== */
const SCENE = {
  cv: null, cx: null, W: 100, H: 100, P: 3, bg: null, dirtyBg: true, t: 0, parts: [], bubbles: [], motes: [], twinkles: [],
  level: 0.35, squash: 0, vx: 0, vy: 0, benchTop: 90, vname: 'v1', vcv: null, vcx: null, lcv: null, lcx: null, limg: null, mask: null, maskName: '',
  lastGhostPop: 0,
  init() {
    this.cv = U.$('#scene'); this.cx = this.cv.getContext('2d');
    this.vcv = document.createElement('canvas'); this.vcv.width = this.vcv.height = 48; this.vcx = this.vcv.getContext('2d');
    this.lcv = document.createElement('canvas'); this.lcv.width = this.lcv.height = 48; this.lcx = this.lcv.getContext('2d');
    this.limg = this.lcx.createImageData(48, 48);
    this.cv.addEventListener('pointerdown', e => this.pointer(e));
    this.cv.addEventListener('contextmenu', e => e.preventDefault());
  },
  resize() {
    const pane = U.$('#paneFlask'); if (!pane || !this.cv) return;
    const w = pane.clientWidth, h = pane.clientHeight; if (!w || !h) return;
    const P = U.clamp(Math.min(Math.floor(h / 105), Math.floor(w / 92)), 2, 5);
    this.P = P; this.W = Math.ceil(w / P); this.H = Math.ceil(h / P);
    this.cv.width = this.W; this.cv.height = this.H;
    this.cv.style.width = this.W * P + 'px'; this.cv.style.height = this.H * P + 'px';
    this.cx.imageSmoothingEnabled = false;
    this.dirtyBg = true;
  },
  vesselName() { return 'v' + (VESSEL_OF_ERA[S.era] + 1); },
  floating() { return S.era >= 3; },
  layout() {
    const name = this.vesselName(), info = GFX.vessel(name);
    this.vname = name; this.info = info;
    this.benchTop = this.H - (this.H > this.W * 1.25 ? Math.round(this.H * 0.27) : Math.max(9, Math.min(14, Math.round(this.H * 0.11))));
    const bx = info.box; // [x0,y0,x1,y1]
    this.vx = Math.round(this.W / 2 - (bx[0] + bx[2] + 1) / 2);
    const lift = this.floating() ? 5 : 0;
    this.vy = this.benchTop - bx[3] - 1 - lift;
    const hudB = Math.ceil(70 / this.P);
    if (this.vy + bx[1] < hudB) this.vy = Math.min(this.vy, Math.max(hudB - bx[1], this.vy));
    if (this.maskName !== name) {
      this.mask = new Uint8Array(48 * 48);
      info.liq.forEach(([x, y]) => this.mask[y * 48 + x] = 1);
      this.maskName = name; this.bubbles = [];
    }
  },
  /* ---------- Arrière-plan par ère ---------- */
  drawBg() {
    this.layout();
    const W = this.W, H = this.H, e = S.era;
    if (!this.bg) this.bg = document.createElement('canvas');
    this.bg.width = W; this.bg.height = H;
    const c = this.bg.getContext('2d'); c.imageSmoothingEnabled = false;
    const R = (x, y, w, h, col) => { c.fillStyle = col; c.fillRect(Math.floor(x), Math.floor(y), Math.ceil(w), Math.ceil(h)); };
    const rnd = U.seeded(1234 + e * 77 + W * 3 + H);
    const spr = (name, x, y, f = 0) => { if (GFX.has(name)) c.drawImage(GFX.canvas(name, f), Math.floor(x), Math.floor(y)); };
    const top = this.benchTop;
    this.twinkles = [];
    const stars = (x0, y0, w, h, k, cols) => { for (let i = 0; i < k; i++) { const x = x0 + Math.floor(rnd() * w), y = y0 + Math.floor(rnd() * h); R(x, y, 1, 1, U.pick(cols)); if (rnd() < 0.3) this.twinkles.push([x, y]); } };
    const sky = (x, y, w, h) => this.drawSky(c, R, rnd, stars, x, y, w, h, e);
    // ----- murs -----
    if (e === 0) { // Garage : briques
      R(0, 0, W, H, '#3b2723');
      for (let y = 0; y < top; y += 5) { const off = (y / 5) % 2 ? 4 : 0; for (let x = -off; x < W; x += 9) { const v = rnd(); R(x + 1, y + 1, 8, 4, v < 0.33 ? '#5a3328' : v < 0.66 ? '#63392c' : '#6e4232'); R(x + 1, y + 1, 8, 1, '#7a4c3a'); } }
      R(0, 0, W, 3, '#2a1c19');
    } else if (e === 1) { // Université : peinture + lambris
      R(0, 0, W, H, '#2c3a58');
      for (let x = 0; x < W; x += 6) R(x, 0, 1, top, '#30406a');
      const wy = Math.floor(top * 0.62);
      R(0, wy, W, top - wy, '#5a3a2a'); R(0, wy, W, 2, '#8a5a3c'); R(0, wy + 2, W, 1, '#3e2731');
      for (let x = 3; x < W; x += 14) { R(x, wy + 5, 10, top - wy - 8, '#4e3224'); R(x, wy + 5, 10, 1, '#6e4630'); }
    } else if (e === 2) { // MégaCorp : panneaux sombres
      R(0, 0, W, H, '#151a2c');
      for (let x = 0; x < W; x += 16) { R(x, 0, 15, top, '#1c2340'); R(x, 0, 1, top, '#262f52'); R(x + 14, 0, 1, top, '#10142a'); }
      for (let x = 7; x < W; x += 32) { R(x, 0, 1, top, '#2ce8f5'); R(x - 1, 0, 3, top, 'rgba(44,232,245,0.12)'); }
      R(0, Math.floor(top * 0.55), W, 1, '#2a3460');
    } else if (e === 3) { // Atomique : béton + bande de danger
      R(0, 0, W, H, '#3a3d40');
      for (let i = 0; i < W * top / 18; i++) R(rnd() * W, rnd() * top, 1, 1, rnd() < 0.5 ? '#44484c' : '#303336');
      for (let y = 0; y < top; y += 12) R(0, y, W, 1, '#2e3134');
      const by = Math.floor(top * 0.7);
      for (let x = -6; x < W; x += 6) for (let k = 0; k < 4; k++) R(x + k, by + k, 3, 1, '#feae34');
      c.fillStyle = '#181425';
      for (let x = -6; x < W; x += 6) for (let k = 0; k < 4; k++) c.fillRect(x + k + 3, by + k, 3, 1);
    } else if (e === 4) { // Orbitale : coque + hublot
      R(0, 0, W, H, '#262b44');
      for (let y = 0; y < top; y += 14) for (let x = 0; x < W; x += 20) { R(x, y, 19, 13, '#2e3452'); R(x, y, 19, 1, '#3a4466'); R(x + 1, y + 1, 1, 1, '#5a6988'); R(x + 17, y + 1, 1, 1, '#5a6988'); R(x + 1, y + 11, 1, 1, '#5a6988'); R(x + 17, y + 11, 1, 1, '#5a6988'); }
    } else if (e === 5) { // Dimensionnelle : cristaux et fissures
      R(0, 0, W, H, '#1e1030');
      for (let i = 0; i < 14; i++) { let x = rnd() * W, y = rnd() * top; for (let k = 0; k < 12; k++) { R(x, y, 1, 1, rnd() < 0.5 ? '#9b5de5' : '#d4b8ff'); x += rnd() < 0.5 ? 1 : -1; y += 1; } }
      for (let i = 0; i < W * top / 40; i++) R(rnd() * W, rnd() * top, 1, 1, '#2c1748');
    } else { // Stellaire / cosmique / infini : espace
      const g = c.createLinearGradient(0, 0, 0, H);
      const pal = e === 6 ? ['#120a10', '#2a1010', '#4a1c10'] : e === 7 ? ['#0a0818', '#1c0f2e', '#2a0f2a'] : ['#08081a', '#16123a', '#2a1650'];
      g.addColorStop(0, pal[0]); g.addColorStop(0.6, pal[1]); g.addColorStop(1, pal[2]);
      c.fillStyle = g; c.fillRect(0, 0, W, H);
      if (e === 7) for (let i = 0; i < 5; i++) { const x = rnd() * W, y = rnd() * top, r = 8 + rnd() * 18, col = U.pick(['#b55088', '#2ce8f5', '#9b5de5', '#f6757a']); for (let k = 0; k < r * r * 1.2; k++) { const a = rnd() * 6.28, d = Math.pow(rnd(), 1.6) * r; if (rnd() < 0.5) R(x + Math.cos(a) * d, y + Math.sin(a) * d * 0.6, 1, 1, col); } }
      if (e === 6) { const sx = W * 0.82, sy = top * 0.3; for (let r = 22; r > 0; r -= 2) { c.fillStyle = r > 16 ? 'rgba(247,118,34,0.18)' : r > 9 ? '#f77622' : r > 4 ? '#feae34' : '#fee761'; c.beginPath(); c.arc(sx, sy, r, 0, 6.28); c.fill(); } }
      if (e === 8) { for (let k = 0; k < 7; k++) { const m = 3 + k * 6; c.strokeStyle = U.hsl(k * 50, 0.7, 0.45); c.lineWidth = 1; c.strokeRect(m + 0.5, m + 0.5, W - 2 * m - 1, top - 2 * m - 1); } }
      stars(0, 0, W, top, Math.floor(W * top / 30), ['#ffffff', '#c0cbdc', '#fee761', '#2ce8f5']);
    }
    // ----- fenêtre / hublot -----
    const winX = W - 30, winY = Math.max(Math.ceil(72 / this.P) - 4, 6);
    const roomR = W >= 96;
    if (e <= 5 && roomR && winY + 22 < top - 4) {
      if (e === 4) { // hublot rond
        const cxp = winX + 12, cyp = winY + 11, r = 10;
        c.save(); c.beginPath(); c.arc(cxp, cyp, r, 0, 6.28); c.clip(); sky(cxp - r, cyp - r, 2 * r, 2 * r); c.restore();
        c.strokeStyle = '#8b9bb4'; c.lineWidth = 2; c.beginPath(); c.arc(cxp, cyp, r + 1, 0, 6.28); c.stroke();
        c.strokeStyle = '#181425'; c.lineWidth = 1; c.beginPath(); c.arc(cxp, cyp, r + 2.5, 0, 6.28); c.stroke();
        for (let a = 0; a < 8; a++) R(cxp + Math.cos(a * 0.785) * (r + 1) - 0.5, cyp + Math.sin(a * 0.785) * (r + 1) - 0.5, 1, 1, '#c0cbdc');
      } else if (GFX.has('pr_window')) {
        sky(winX + 1, winY + 1, 22, 18);
        spr('pr_window', winX, winY);
      } else {
        sky(winX + 2, winY + 2, 20, 16);
        c.strokeStyle = '#181425'; c.strokeRect(winX + 1.5, winY + 1.5, 21, 17);
      }
    }
    // ----- décors muraux -----
    const leftY = Math.max(Math.ceil(72 / this.P) - 2, 6);
    if (e <= 5 && W >= 80) {
      if (e === 0) { spr('pr_shelf', 2, leftY); spr('pr_clock', 6, leftY + 22); }
      else if (e === 1) { spr('pr_board', 2, leftY); spr('pr_poster', W - 44, leftY + 2); }
      else if (e === 2) { spr('pr_poster', 4, leftY + 2); spr('pr_clock', 20, leftY + 4); }
      else if (e === 3) { spr('pr_shelf', 2, leftY); }
      else if (e === 4) { spr('pr_terminal', 4, leftY + 4); }
      else if (e === 5) { spr('pr_shelf', 2, leftY); }
    }
    // décors supplémentaires quand le mur est très haut
    if (e <= 5 && W >= 80 && top - leftY > 95) {
      const y2 = leftY + Math.round((top - leftY) * 0.42);
      if (e === 0) { spr('pr_poster', W - 18, y2); spr('pr_shelf', 3, y2 + 6); }
      else if (e === 1) { spr('pr_shelf', W - 35, y2); spr('pr_clock', 6, y2 + 4); }
      else if (e === 2) { spr('pr_shelf', 3, y2); spr('pr_terminal', W - 20, y2 + 4); }
      else if (e === 3) { spr('pr_poster', W - 18, y2); spr('pr_clock', 6, y2 + 6); }
      else if (e === 4) { spr('pr_shelf', W - 35, y2); }
      else if (e === 5) { spr('pr_poster', W - 18, y2); spr('pr_clock', 6, y2 + 2); }
    }
    // ----- paillasse / plateforme -----
    this.drawBench(c, R, rnd, spr, e);
    // ----- objets posés -----
    if (e <= 5 && W >= 80) {
      const onB = (name, x) => { const s = SPRITES[name]; if (s) spr(name, x, top - s.h + 1); };
      if (e === 0) { onB('pr_crate', 3); onB('pr_flask_a', W - 12); onB('pr_flask_c', W - 20); }
      else if (e === 1) { onB('pr_flask_b', 4); onB('pr_flask_a', 13); onB('pr_plant', W - 15); }
      else if (e === 2) { onB('pr_terminal', 3); onB('pr_flask_c', W - 10); }
      else if (e === 3) { onB('pr_barrel', 3); onB('pr_barrel', W - 15); }
      else if (e === 4) { onB('pr_flask_b', W - 12); onB('pr_crate', 3); }
      else if (e === 5) { onB('pr_flask_a', 4); onB('pr_flask_b', W - 12); onB('pr_flask_c', W - 20); }
    }
    this.dirtyBg = false;
  },
  drawSky(c, R, rnd, stars, x, y, w, h, e) {
    const grad = (cols) => { const g = c.createLinearGradient(0, y, 0, y + h); cols.forEach((col, i) => g.addColorStop(i / (cols.length - 1), col)); c.fillStyle = g; c.fillRect(x, y, w, h); };
    if (e === 0) { grad(['#4aa3df', '#9fd8f5']); R(x + 3, y + 4, 6, 2, '#fff'); R(x + 4, y + 3, 4, 1, '#fff'); R(x + 13, y + 8, 5, 2, '#eef'); R(x, y + h - 4, w, 4, '#3e8948'); R(x + 14, y + h - 9, 3, 6, '#733e39'); R(x + 12, y + h - 12, 7, 5, '#63c74d'); }
    else if (e === 1) { grad(['#f6757a', '#feae34', '#fee761']); R(x + 4, y + h - 8, 5, 8, '#3e2731'); R(x + 11, y + h - 11, 6, 11, '#3e2731'); R(x + 13, y + h - 13, 2, 2, '#3e2731'); R(x + 18, y + h - 6, 4, 6, '#3e2731'); }
    else if (e === 2) { grad(['#0b0f24', '#1d2450']); stars(x, y, w, h / 2, 6, ['#fff']); for (let k = 0; k < 5; k++) { const bw = 3 + Math.floor(rnd() * 3), bh = 6 + Math.floor(rnd() * (h - 6)), bx = x + k * 4 + Math.floor(rnd() * 2); R(bx, y + h - bh, bw, bh, '#11142a'); for (let j = 0; j < bh / 2; j++) if (rnd() < 0.4) R(bx + 1 + Math.floor(rnd() * (bw - 1)), y + h - bh + 1 + Math.floor(rnd() * (bh - 1)), 1, 1, '#fee761'); } }
    else if (e === 3) { grad(['#1a2a10', '#4a6a10', '#b6ff3a']); R(x + 9, y + h - 9, 4, 9, '#2a2a2a'); R(x + 6, y + h - 13, 10, 5, '#5a5a4a'); }
    else if (e === 4) { R(x, y, w, h, '#05060f'); stars(x, y, w, h, 10, ['#fff', '#c0cbdc']); c.fillStyle = '#0099db'; c.beginPath(); c.arc(x + w * 0.65, y + h * 0.95, w * 0.55, 0, 6.28); c.fill(); c.fillStyle = '#63c74d'; c.fillRect(x + w * 0.5, y + h * 0.62, 4, 3); c.fillRect(x + w * 0.75, y + h * 0.7, 3, 2); c.fillStyle = 'rgba(255,255,255,0.7)'; c.fillRect(x + w * 0.6, y + h * 0.55, 5, 1); }
    else if (e === 5) { grad(['#f6757a', '#b55088', '#68386c']); c.fillStyle = '#fee761'; c.beginPath(); c.arc(x + 6, y + 5, 3, 0, 6.28); c.fill(); c.fillStyle = '#2ce8f5'; c.beginPath(); c.arc(x + 15, y + 8, 2, 0, 6.28); c.fill(); R(x + 3, y + h - 6, 8, 2, '#3e2731'); R(x + 5, y + h - 4, 4, 2, '#3e2731'); R(x + 13, y + h - 9, 7, 2, '#3e2731'); }
  },
  drawBench(c, R, rnd, spr, e) {
    const W = this.W, H = this.H, top = this.benchTop;
    if (e >= 6) { // plateforme flottante
      const cxp = W / 2, pw = Math.min(W - 10, 70);
      R(cxp - pw / 2, top, pw, 3, '#5a6988'); R(cxp - pw / 2, top, pw, 1, '#c0cbdc'); R(cxp - pw / 2 + 3, top + 3, pw - 6, 2, '#3a4466'); R(cxp - pw / 2 + 8, top + 5, pw - 16, 1, '#262b44');
      for (let x = cxp - pw / 2 + 4; x < cxp + pw / 2 - 4; x += 6) R(x, top + 1, 2, 1, e === 8 ? U.hsl(x * 9, 0.8, 0.6) : ERA_STYLE[e].acc);
      return;
    }
    const pal = [['#733e39', '#b86f50', '#4a2a26', '#5e3430'], ['#181425', '#3a4466', '#262b44', '#2e3452'], ['#c0cbdc', '#ffffff', '#8b9bb4', '#a8b4c8'],
      ['#3a3d40', '#5a6988', '#26292c', '#303336'], ['#3a4466', '#8b9bb4', '#262b44', '#2e3452'], ['#2a1742', '#9b5de5', '#1e1030', '#2c1a48']][e];
    R(0, top, W, H - top, pal[2]);
    R(0, top, W, 2, pal[1]); R(0, top + 2, W, 1, pal[0]); R(0, top + 3, W, 1, '#181425');
    for (let x = 3; x < W - 3; x += 24) {
      R(x, top + 5, 20, H - top - 6, pal[3]); R(x, top + 5, 20, 1, pal[1]); R(x, top + 5, 1, H - top - 6, pal[1]);
      R(x + 8, top + 8, 4, 1, e === 2 ? '#3a4466' : '#c0cbdc');
    }
  },
  /* ---------- Entrées ---------- */
  pointer(e) {
    e.preventDefault();
    SFX.unlock();
    const r = this.cv.getBoundingClientRect();
    const lx = (e.clientX - r.left) / this.P, ly = (e.clientY - r.top) / this.P;
    const b = this.info ? this.info.box : [0, 0, 47, 47], m = 6;
    if (lx >= this.vx + b[0] - m && lx <= this.vx + b[2] + m && ly >= this.vy + b[1] - m && ly <= this.vy + b[3] + m) {
      const g = clickVessel(true);
      this.squash = 1;
      SFX.play('click');
      if (inChal('noclick')) { popText(e.clientX, e.clientY - 20, 'Mains liées !', 'small'); return; }
      popText(e.clientX, e.clientY - 20, '+' + fmtS(g, 1));
      this.burst(lx, ly, 3);
    }
  },
  ghostClick(g) {
    if (!this.info) return;
    const b = this.info.box;
    const x = this.vx + U.rand(b[0], b[2]), y = this.vy + U.rand(b[1], b[3]);
    this.addPart(x, y, 'p_spark', U.rand(-10, 10), U.rand(-30, -10), 0.5);
    const now = performance.now();
    if (now - this.lastGhostPop > 900) {
      this.lastGhostPop = now;
      const r = this.cv.getBoundingClientRect();
      popText(r.left + x * this.P, r.top + y * this.P, '+' + fmtS(g, 1), 'small');
    }
  },
  addPart(x, y, spr, vx, vy, life, g = 140) {
    if (!S.set.particles || this.parts.length > 160) return;
    this.parts.push({ x, y, vx, vy, life, max: life, spr, g, f: Math.random() < 0.5 ? 0 : 1 });
  },
  burst(lx, ly, k) {
    const info = this.info; if (!info) return;
    const ox = this.vx + (info.l + info.r) / 2, oy = this.vy + info.top, e = S.era;
    const pool = e < 2 ? ['p_mol', 'p_mol', 'p_spark', 'p_bubble'] : e < 4 ? ['p_mol', 'p_mol', 'p_spark', 'p_star'] : e < 6 ? ['p_mol', 'p_star', 'p_star', 'p_spark', 'p_mol'] : ['p_star', 'p_star', 'p_spark', 'p_mol', 'p_star'];
    const big = e < 4 ? null : e < 6 ? ['g_mini'] : e < 8 ? ['g_mini', 'b_forge', 'b_orbitale'] : ['b_bigbang', 'b_trounoir', 'b_portail', 'b_forge', 'b_simulateur'];
    if (big && Math.random() < 0.18 + e * 0.02) { const s = U.pick(big); if (GFX.has(s)) this.addPart(ox, oy, s, U.rand(-50, 50), U.rand(-110, -60), 1.1); }
    k += Math.floor(e / 2);
    for (let i = 0; i < k; i++) this.addPart(ox + U.rand(-3, 3), oy + U.rand(-2, 2), U.pick(pool), U.rand(-45 - e * 6, 45 + e * 6), U.rand(-95 - e * 5, -45), U.rand(0.7, 1.1));
    if (e >= 5 && S.set.flash) { const p = U.$('#paneFlask'); p.classList.remove('shake'); void p.offsetWidth; p.classList.add('shake'); }
  },
  /* ---------- Rendu ---------- */
  frame(dt) {
    if (!this.cv || !this.W) return;
    this.t += dt;
    if (this.dirtyBg || this.vname !== this.vesselName()) this.drawBg();
    const c = this.cx, t = this.t, e = S.era, st = ERA_STYLE[e];
    c.drawImage(this.bg, 0, 0);
    // scintillement
    for (let i = 0; i < this.twinkles.length; i++) { const [x, y] = this.twinkles[i]; if (Math.sin(t * 2 + i * 1.7) > 0.7) { c.fillStyle = '#fff'; c.fillRect(x, y, 1, 1); if (this.twinkles.length < 80) { c.fillStyle = 'rgba(255,255,255,0.4)'; c.fillRect(x - 1, y, 3, 1); c.fillRect(x, y - 1, 1, 3); } } }
    const info = this.info, bx = info.box;
    const bob = this.floating() ? Math.round(Math.sin(t * 1.6) * 2) : 0;
    const cxv = this.vx + (bx[0] + bx[2] + 1) / 2, cyv = this.vy + (bx[1] + bx[3]) / 2 + bob;
    // halo + rayons
    const frenzy = G.cps > G.cpsNoBuff * 1.01;
    const glowCol = frenzy ? '#fee761' : (st.rainbow ? GFX.rbw(t * 60) : st.glow);
    const rad = 34 + Math.sin(t * 2) * 2 + (frenzy ? 6 : 0);
    const gr = c.createRadialGradient(cxv, cyv, 2, cxv, cyv, rad);
    gr.addColorStop(0, this.rgba(glowCol, 0.45)); gr.addColorStop(1, this.rgba(glowCol, 0));
    c.save(); c.beginPath(); c.rect(0, 0, this.W, this.benchTop); c.clip();
    c.fillStyle = gr; c.fillRect(cxv - rad, cyv - rad, rad * 2, rad * 2);
    c.translate(cxv, cyv); c.rotate(t * 0.25);
    c.fillStyle = this.rgba(glowCol, frenzy ? 0.16 : 0.08);
    const nr = 10;
    for (let i = 0; i < nr; i++) { c.rotate(Math.PI * 2 / nr); c.beginPath(); c.moveTo(0, 0); c.lineTo(rad * 1.6, -5); c.lineTo(rad * 1.6, 5); c.closePath(); c.fill(); }
    c.restore();
    CHAOS.dt = Math.min(dt, 0.1);
    CHAOS.back(c, this, t, cxv, cyv);
    // poussières
    if (S.set.particles) {
      if (this.motes.length < 14 && Math.random() < dt * 4) this.motes.push({ x: Math.random() * this.W, y: this.benchTop - Math.random() * 10, v: U.rand(2, 6), l: U.rand(4, 9) });
      c.fillStyle = this.rgba(glowCol, 0.5);
      this.motes = this.motes.filter(m => { m.y -= m.v * dt; m.x += Math.sin(t + m.l) * dt * 2; m.l -= dt; if (m.l > 0) c.fillRect(Math.round(m.x), Math.round(m.y), 1, 1); return m.l > 0 && m.y > 0; });
    }
    // ombre
    const shW = Math.round((bx[2] - bx[0]) * (this.floating() ? 0.55 - bob * 0.04 : 0.8));
    c.fillStyle = 'rgba(0,0,0,0.35)';
    c.fillRect(Math.round(cxv - shW / 2), this.benchTop - (this.floating() ? 0 : 1), shW, 2);
    c.fillRect(Math.round(cxv - shW / 2) + 2, this.benchTop - (this.floating() ? 1 : 2), shW - 4, 1);
    // récipient
    this.drawVessel(dt);
    this.squash = Math.max(0, this.squash - dt * 7);
    const sq = this.squash * 0.07;
    const vw = 48 * (1 + sq), vh = 48 * (1 - sq);
    const footY = this.vy + bx[3] + 1 + bob;
    c.drawImage(this.vcv, Math.round(cxv - (bx[0] + bx[2] + 1) / 2 * (1 + sq)), Math.round(footY - (bx[3] + 1) * (1 - sq)), Math.round(vw), Math.round(vh));
    CHAOS.front(c, this, t, cxv, cyv, this.vy + bx[1] + bob);
    // particules
    for (const p of this.parts) {
      p.life -= dt; p.vy += p.g * dt; p.x += p.vx * dt; p.y += p.vy * dt;
      if (p.life <= 0) continue;
      const sc = GFX.canvas(p.spr, p.f);
      c.globalAlpha = Math.min(1, p.life / p.max * 2);
      c.drawImage(sc, Math.round(p.x - sc.width / 2), Math.round(p.y - sc.height / 2));
    }
    c.globalAlpha = 1;
    this.parts = this.parts.filter(p => p.life > 0 && p.y < this.H + 10);
    if (frenzy && S.set.particles && Math.random() < dt * 10) this.addPart(cxv + U.rand(-30, 30), cyv + U.rand(-25, 25), 'p_star', 0, U.rand(-15, -5), 0.8, 0);
    if (n('infini') > 0) { if (!this.prev) this.prev = document.createElement('canvas'); if (this.prev.width !== this.W || this.prev.height !== this.H) { this.prev.width = this.W; this.prev.height = this.H; } const pc = this.prev.getContext('2d'); pc.clearRect(0, 0, this.W, this.H); pc.drawImage(this.cv, 0, 0); }
  },
  rgba(hex, a) { const [r, g, b] = U.hex2rgb(hex); return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'; },
  drawVessel(dt) {
    const info = this.info, t = this.t, e = S.era, st = ERA_STYLE[e];
    const eb = S.buffs.find(b => b.key === 'eureka');
    const target = eb ? 0.98 : 0.3 + 0.62 * (S.eureka / 100);
    this.level += (target - this.level) * Math.min(1, dt * 4);
    const d = this.limg.data; d.fill(0);
    const hgt = info.bot - info.top + 1, surf = info.bot + 1 - this.level * hgt;
    if (this.lstE !== e) { this.lstE = e; this.L1 = U.hex2rgb(st.liq); this.L2 = U.hex2rgb(st.liq2); }
    const L1 = this.L1, L2 = this.L2, dark = [24, 20, 37];
    const boil = eb ? 2.2 : 1;
    for (const [x, y] of info.liq) {
      const wave = Math.sin(t * 3 * boil + x * 0.7) * 0.7 * boil + Math.sin(t * 1.7 - x * 0.35) * 0.5 + this.squash * Math.sin(x) * 1.5;
      const s = surf + wave, i = (y * 48 + x) * 4;
      if (y < s - 0.5) { d[i] = 255; d[i + 1] = 255; d[i + 2] = 255; d[i + 3] = 14; continue; }
      let col;
      if (st.rainbow) col = GFX.rbw(x * 7 + y * 4 + t * 90, y < s + 1);
      else col = y < s + 1 ? L2 : L1;
      const depth = U.clamp((y - s) / hgt, 0, 1) * 0.5;
      let r = col[0] + (dark[0] - col[0]) * depth, g = col[1] + (dark[1] - col[1]) * depth, b = col[2] + (dark[2] - col[2]) * depth;
      const n = ((x * 13 + y * 7 + Math.floor(t * 3)) % 11);
      if (n === 0 && y > s + 1) { r += 30; g += 30; b += 30; }
      if (e >= 6 && ((x * 31 + y * 17 + Math.floor(t * 5)) % 97) === 0) { r = g = b = 255; }
      d[i] = r; d[i + 1] = g; d[i + 2] = b; d[i + 3] = 235;
    }
    // bulles
    const rate = (eb ? 26 : 3 + S.eureka / 12) * (info.liq.length / 400);
    if (Math.random() < dt * rate && info.liq.length) {
      const [x, y] = info.liq[Math.floor(Math.random() * info.liq.length)];
      if (y > surf + 2) this.bubbles.push({ x, y, sp: U.rand(6, 14) * boil, w: Math.random() * 6 });
    }
    this.bubbles = this.bubbles.filter(bb => {
      bb.y -= bb.sp * dt;
      const bx = Math.round(bb.x + Math.sin(t * 4 + bb.w) * 0.6), by = Math.round(bb.y);
      if (by < surf + 0.5 || by < 0 || !this.mask[by * 48 + bx]) {
        if (S.set.particles && Math.random() < 0.25) this.addPart(this.vx + bx, this.vy + by - 1, 'p_bubble', U.rand(-6, 6), U.rand(-20, -8), 0.5, 0);
        return false;
      }
      const i = (by * 48 + bx) * 4; d[i] = L2[0]; d[i + 1] = L2[1]; d[i + 2] = L2[2]; d[i + 3] = 255;
      if (this.mask[(by - 1) * 48 + bx]) { const j = ((by - 1) * 48 + bx) * 4; d[j] = 255; d[j + 1] = 255; d[j + 2] = 255; d[j + 3] = 200; }
      return true;
    });
    const vc = this.vcx;
    vc.clearRect(0, 0, 48, 48);
    this.lcx.putImageData(this.limg, 0, 0);
    vc.drawImage(this.lcv, 0, 0);
    vc.drawImage(GFX.canvas(this.vname, 0, { noAcc: 1 }), 0, 0);
    // accents lumineux
    if (info.acc.length) {
      for (let k = 0; k < info.acc.length; k++) {
        const [x, y] = info.acc[k];
        const on = Math.sin(t * 3 + k * 0.9) > -0.2;
        vc.fillStyle = st.rainbow ? GFX.rbw(t * 120 + k * 30) : on ? st.acc : (this.accDim || (this.accDim = {}))[st.acc] || (this.accDim[st.acc] = U.mix(st.acc, '#181425', 0.55));
        vc.fillRect(x, y, 1, 1);
      }
    }
    // débordement en Eurêka
    if (eb && S.set.particles && Math.random() < dt * 14) {
      const ox = this.vx + (info.l + info.r) / 2, oy = this.vy + info.top;
      this.addPart(ox + U.rand(-4, 4), oy, 'p_bubble', U.rand(-25, 25), U.rand(-60, -30), 0.9);
    }
  },
};
