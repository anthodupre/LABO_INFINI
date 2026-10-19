/* ===================== VUE DU LABO (rangées de bâtiments) ===================== */
const LABV = {
  cv: null, cx: null, P: 3, W: 0, RH: 30, rows: [], t: 0, acc: 0, key: '', bgs: {},
  init() { this.cv = U.$('#labview'); this.cx = this.cv.getContext('2d'); },
  resize() {
    const page = U.$('#page-lab'); if (!page || !this.cv) return;
    const w = page.clientWidth; if (!w) return;
    this.P = w >= 640 ? 4 : 3;
    this.W = Math.floor(w / this.P);
    this.bgs = {}; this.key = '';
    this.rebuild();
  },
  rebuild() {
    this.rows = BUILDINGS.filter(b => n(b.id) > 0);
    const h = Math.max(1, this.rows.length * this.RH);
    this.cv.width = this.W; this.cv.height = h;
    this.cv.style.width = this.W * this.P + 'px'; this.cv.style.height = h * this.P + 'px';
    this.cx.imageSmoothingEnabled = false;
    U.$('#labEmpty').style.display = this.rows.length ? 'none' : '';
    const lbl = U.$('#labLabels'); lbl.innerHTML = '';
    this.lbls = {};
    this.rows.forEach((b, r) => {
      const d = U.el('div', 'lablbl'); d.style.top = (r * this.RH * this.P + 3) + 'px';
      lbl.appendChild(d); this.lbls[b.id] = d;
    });
    this.key = this.rows.map(b => b.id + n(b.id)).join(',');
    this.updLabels();
  },
  updLabels() { this.rows.forEach(b => { const d = this.lbls[b.id]; if (d) d.textContent = b.plural + ' × ' + fmt(n(b.id)); }); },
  rowBg(b) {
    if (this.bgs[b.id]) return this.bgs[b.id];
    const W = this.W, H = this.RH, cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    const c = cv.getContext('2d'), [wall, floor, acc] = b.theme, rnd = U.seeded(U.hash(b.id));
    const R = (x, y, w, h, col) => { c.fillStyle = col; c.fillRect(x, y, w, h); };
    const light = U.mix(wall, '#ffffff', 0.07), dark = U.mix(wall, '#000000', 0.25);
    R(0, 0, W, H, wall);
    const pat = b.i % 5;
    if (pat === 0) for (let x = 0; x < W; x += 6) R(x, 0, 1, H - 8, light);
    else if (pat === 1) for (let y = 1; y < H - 8; y += 4) for (let x = (y % 8 ? 0 : 3); x < W; x += 7) R(x, y, 6, 3, light);
    else if (pat === 2) for (let y = 0; y < H - 8; y += 5) for (let x = 0; x < W; x += 5) R(x, y, 1, 1, light);
    else if (pat === 3) { for (let i = 0; i < W / 3; i++) R(Math.floor(rnd() * W), Math.floor(rnd() * (H - 8)), 1, 1, U.pick(['#ffffff', acc, light])); }
    else for (let x = 0; x < W; x += 12) { R(x, 0, 11, H - 8, light); R(x + 11, 0, 1, H - 8, dark); }
    // lueur d'accent
    const g = c.createLinearGradient(0, 0, 0, H - 8); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, SCENE.rgba(acc, 0.14));
    c.fillStyle = g; c.fillRect(0, 0, W, H - 8);
    // sol
    R(0, H - 8, W, 8, floor); R(0, H - 8, W, 1, U.mix(floor, '#ffffff', 0.18)); R(0, H - 7, W, 1, U.mix(floor, '#000000', 0.2));
    for (let x = (b.i * 3) % 10; x < W; x += 10) R(x, H - 6, 1, 5, U.mix(floor, '#000000', 0.15));
    R(0, H - 1, W, 1, '#0e0b18'); R(0, 0, W, 1, dark);
    return (this.bgs[b.id] = cv);
  },
  frame(dt) {
    if (!this.cv || !tabVisible('lab')) return;
    this.t += dt; this.acc += dt;
    if (this.acc < 1 / 15) return;
    this.acc = 0;
    const key = BUILDINGS.filter(b => n(b.id) > 0).map(b => b.id + n(b.id)).join(',');
    if (key !== this.key) {
      const sameRows = key.replace(/\d+/g, '') === this.key.replace(/\d+/g, '');
      if (sameRows) { this.key = key; this.updLabels(); } else this.rebuild();
    }
    if (!this.rows.length || !this.W) return;
    const page = U.$('#page-lab'), st = page.scrollTop / this.P, vh = page.clientHeight / this.P;
    const c = this.cx, RH = this.RH, W = this.W, t = this.t;
    this.rows.forEach((b, r) => {
      const y0 = r * RH;
      if (y0 + RH < st - 2 || y0 > st + vh + 2) return;
      c.drawImage(this.rowBg(b), 0, y0);
      const cnt = n(b.id), per = Math.max(1, Math.floor((W - 10) / 15)), cap = per * 2, k = Math.min(cnt, cap);
      const rnd = U.seeded(U.hash(b.id) + 7);
      const items = [];
      for (let j = 0; j < k; j++) {
        const line = j < per ? 1 : 0, col = j % per;
        items.push({ j, line, x: 3 + col * 15 + (line ? 0 : 7), ph: rnd() * 10 });
      }
      items.sort((a, bb) => a.line - bb.line);
      const frames = GFX.frames(b.sprite);
      for (const it of items) {
        let x = it.x, y = y0 + RH - 8 - 16 + (it.line ? 3 : -3), flip = false;
        const f = Math.floor(t * (b.id === 'stagiaire' ? 0.8 : 1.6) + it.ph) % frames;
        if (b.id === 'stagiaire') { x += Math.round(Math.sin(t * 0.5 + it.ph) * 1); y -= Math.abs(Math.cos(t * 0.5 + it.ph)) > 0.3 && Math.floor(t * 3 + it.ph) % 2 ? 1 : 0; }
        else if (b.id === 'nanobots') { x += Math.round(Math.sin(t * 9 + it.ph) * 1); y += Math.round(Math.cos(t * 7 + it.ph) * 1); }
        else if (['orbitale', 'portail', 'trounoir', 'cerveau', 'infini', 'forge'].includes(b.id)) y += Math.round(Math.sin(t * 1.8 + it.ph) * 1.4) - 2;
        const spr = GFX.canvas(b.sprite, f, it.line ? undefined : { dim: 0.62 });
        c.drawImage(spr, x, y);
      }
    });
  },
};
