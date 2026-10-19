/* ===================== CHAOS DE LA SCÈNE : les bâtiments envahissent le labo ===================== */
const CHAOS = {
  dt: 0.016, bangs: [], bangT: 2, glitchT: 5, glitch: 0, swarm: [], kevinT: 20, kevin: null,
  qty(id, max) { const k = n(id); return k <= 0 ? 0 : Math.min(max, 1 + Math.floor(Math.log2(k))); },
  // Couche arrière : derrière le récipient
  back(c, sc, t, cx, cy) {
    const W = sc.W, H = sc.H, top = sc.benchTop;
    // Le Labo Infini : la scène se contient elle-même (effet Droste)
    if (n('infini') > 0 && W > 60) {
      const fw = Math.round(W * 0.28), fh = Math.round(H * 0.28), fx = 3, fy = Math.max(Math.ceil(70 / sc.P), 4);
      c.fillStyle = '#181425'; c.fillRect(fx - 2, fy - 2, fw + 4, fh + 4);
      c.fillStyle = GFX.rbw(t * 80); c.fillRect(fx - 1, fy - 1, fw + 2, fh + 2);
      if (sc.prev) c.drawImage(sc.prev, fx, fy, fw, fh);
    }
    // Cerveau galactique : un cerveau géant plane au-dessus du labo
    if (n('cerveau') > 0 && GFX.has('b_cerveau')) {
      const s = 3 + Math.min(2, Math.floor(Math.log10(n('cerveau') + 1))), img = GFX.canvas('b_cerveau', Math.floor(t * 1.5) % GFX.frames('b_cerveau'));
      c.globalAlpha = 0.22 + Math.sin(t * 1.3) * 0.06;
      c.drawImage(img, Math.round(cx - 8 * s), Math.round(cy - 8 * s - 6 + Math.sin(t * 0.7) * 3), 16 * s, 16 * s);
      c.globalAlpha = 1;
    }
    // Trou noir domestiqué : disque d'accrétion derrière la fiole
    if (n('trounoir') > 0) {
      const R = 14 + Math.min(18, Math.log2(n('trounoir') + 1) * 3);
      const HC = ['#fee761', '#f77622', '#b55088', '#ffffff'];
      for (let col = 0; col < 4; col++) {
        c.fillStyle = HC[col];
        for (let i = col; i < 70; i += 4) {
          const a = i / 70 * Math.PI * 2 + t * (0.9 + (i % 3) * 0.3), rr = R * (0.55 + ((i * 37) % 10) / 22);
          c.fillRect(Math.round(cx + Math.cos(a) * rr), Math.round(cy + 4 + Math.sin(a) * rr * 0.35), 1, 1);
        }
      }
      c.fillStyle = '#000'; c.beginPath(); c.ellipse(cx, cy + 4, R * 0.42, R * 0.2, 0, 0, Math.PI * 2); c.fill();
    }
    // Portails dimensionnels sur les murs
    const np = this.qty('portail', 3);
    for (let k = 0; k < np; k++) {
      const px = k % 2 ? W - 14 - (k >> 1) * 18 : 14 + (k >> 1) * 18, py = top - 26 - (k % 2) * 8, rw = 7, rh = 11;
      for (let pass = 0; pass < 2; pass++) {
        c.fillStyle = pass ? '#9b5de5' : '#2ce8f5';
        for (let i = 0; i < 40; i++) {
          if ((i % 3 !== 0) !== !!pass) continue;
          const a = i / 40 * Math.PI * 2 + t * 3 * (k % 2 ? -1 : 1), r2 = 0.4 + (i % 5) / 8;
          c.fillRect(Math.round(px + Math.cos(a) * rw * r2), Math.round(py + Math.sin(a) * rh * r2), 1, 1);
        }
      }
      c.fillStyle = 'rgba(212,184,255,0.25)'; c.beginPath(); c.ellipse(px, py, rw, rh, 0, 0, Math.PI * 2); c.fill();
    }
    // Fabrique de Big Bang : explosions cosmiques au loin
    if (n('bigbang') > 0) {
      this.bangT -= this.dt;
      if (this.bangT <= 0) { this.bangT = U.rand(1.5, 4) / Math.min(3, 1 + Math.log10(n('bigbang') + 1)); const hue = U.rand(0, 360); SFX.play('boom'); this.bangs.push({ x: U.rand(6, W - 6), y: U.rand(6, top - 20), r: 0, cols: Array.from({ length: 18 }, (_, i) => GFX.rbw(hue + i * 12)) }); }
      this.bangs = this.bangs.filter(b => {
        b.r += this.dt * 36;
        const k = 18;
        c.globalAlpha = Math.max(0, 1 - b.r / 22);
        for (let i = 0; i < k; i++) { const a = i / k * Math.PI * 2; c.fillStyle = b.cols[i]; c.fillRect(Math.round(b.x + Math.cos(a) * b.r), Math.round(b.y + Math.sin(a) * b.r), 1, 1); }
        if (b.r < 4) { c.fillStyle = '#fff'; c.fillRect(Math.round(b.x) - 1, Math.round(b.y) - 1, 3, 3); }
        c.globalAlpha = 1;
        return b.r < 22;
      });
    }
    // Simulateurs : écrans d'univers accrochés au mur
    const ns = this.qty('simulateur', 3);
    for (let k = 0; k < ns && GFX.has('b_simulateur'); k++) c.drawImage(GFX.canvas('b_simulateur', Math.floor(t * 2 + k) % GFX.frames('b_simulateur')), k % 2 ? W - 20 - (k >> 1) * 18 : 4 + (k >> 1) * 18, top - 46);
    // Accélérateur de particules : anneau derrière (moitié arrière)
    this.ring(c, sc, t, cx, cy, true);
    this.orbit(c, sc, t, cx, cy, true);
  },
  // Couche avant : devant le récipient
  front(c, sc, t, cx, cy, vTop) {
    const W = sc.W, top = sc.benchTop;
    this.ring(c, sc, t, cx, cy, false);
    this.orbit(c, sc, t, cx, cy, false);
    // Matériel posé sur la paillasse (de part et d'autre de la fiole)
    const bench = ['bunsen', 'microscope', 'centrifugeuse', 'clonage', 'fusion', 'robot'];
    const items = [];
    bench.forEach(id => { for (let k = 0; k < this.qty(id, 3); k++) items.push(id); });
    if (items.length && sc.info) {
      const bx = sc.info.box, vl = sc.vx + bx[0] - 2, vr = sc.vx + bx[2] + 2;
      const left = items.filter((_, i) => i % 2 === 0), right = items.filter((_, i) => i % 2 === 1);
      const place = (arr, x0, x1, dir) => {
        if (!arr.length || x1 - x0 < 10) return;
        const step = Math.min(14, (x1 - x0 - 16) / Math.max(1, arr.length - 1));
        arr.forEach((id, i) => {
          const s = 'b_' + id; if (!GFX.has(s)) return;
          const x = dir > 0 ? x0 + i * step : x1 - 16 - i * step;
          c.drawImage(GFX.canvas(s, Math.floor(t * 2.2 + i) % GFX.frames(s), dir > 0 ? { flip: true } : undefined), Math.round(x), top - 15);
        });
      };
      place(left, 1, vl, 1); place(right, vr, W - 1, -1);
    }
    // Pipettes automatiques au-dessus de la fiole : elles « cliquent » en rythme
    const np = this.qty('pipette', 5);
    if (np && GFX.has('b_pipette')) {
      for (let k = 0; k < np; k++) {
        const off = (k - (np - 1) / 2) * 11, ph = t * (3 + G.ghost) + k * 1.3, dip = Math.max(0, Math.sin(ph)) * 3;
        c.drawImage(GFX.canvas('b_pipette', Math.sin(ph) > 0.9 ? 1 : 0), Math.round(cx + off - 8), Math.round(vTop - 18 + dip - Math.abs(off) * 0.25));
      }
    }
    // Stagiaires : chacun a sa place sur la paillasse et se balade un peu autour (jamais les uns sur les autres)
    const want = this.qty('stagiaire', 6), sfr = GFX.frames('b_stagiaire');
    if (want && GFX.has('b_stagiaire') && sc.info) {
      const bx = sc.info.box, vl = sc.vx + bx[0] - 1, vr = sc.vx + bx[2] + 1;
      const homes = [];
      const fill = (x0, x1) => { for (let x = x0; x + 16 <= x1; x += 22) homes.push(x); };
      fill(2, vl); fill(vr + 1, W - 2);
      homes.sort((a, b) => Math.abs(a + 8 - W / 2) - Math.abs(b + 8 - W / 2));
      const ns = Math.min(want, homes.length);
      for (let k = 0; k < ns; k++) {
        const ph = t * (0.35 + (k % 3) * 0.08) + k * 1.7, s = Math.sin(ph);
        const x = homes[k] + Math.round(s * 3);
        const step = Math.abs(Math.cos(ph)) > 0.3 && Math.floor(t * 3 + k * 0.5) % 2 ? 1 : 0;
        c.drawImage(GFX.canvas('b_stagiaire', Math.floor(t * 0.8 + k) % sfr), x, top - 16 - step);
      }
    }
    // Kévin traverse parfois l'écran en courant avec un truc absurde
    this.kevinT -= this.dt;
    if (this.kevinT <= 0 && !this.kevin && n('stagiaire') > 0) { this.kevinT = U.rand(25, 60); SFX.play('kevin'); this.kevin = { x: -16, item: U.pick(['p_mol', 'g_mini', 'p_star', 'b_bunsen', 'b_trounoir', 'f_15', 'f_04', 'b_portail', 'i_dev']) }; }
    if (this.kevin && GFX.has('b_stagiaire')) {
      const kv = this.kevin; kv.x += this.dt * 80;
      const y = top - 17 + (Math.floor(t * 5) % 2);
      c.drawImage(GFX.canvas('b_stagiaire', 0), Math.round(kv.x), y);
      if (GFX.has(kv.item)) { const it = GFX.canvas(kv.item, 0); c.drawImage(it, Math.round(kv.x + 8 - it.width / 2), y - it.height + 2); }
      if (kv.x > W + 16) this.kevin = null;
    }
    // Essaim de nanobots
    const nn = n('nanobots');
    if (nn > 0) {
      const k = Math.min(60, 6 + Math.floor(Math.log2(nn + 1) * 6));
      for (let pass = 0; pass < 2; pass++) {
        c.fillStyle = pass ? '#2ce8f5' : '#c0cbdc';
        for (let i = 0; i < k; i++) {
          if ((i % 6 === 0) !== !!pass) continue;
          const a = t * (1.2 + (i % 5) * 0.15) + i * 0.7, r = 14 + (i % 7) * 3 + Math.sin(t * 2 + i) * 3;
          c.fillRect(Math.round(cx + Math.cos(a) * r * 1.3), Math.round(cy + Math.sin(a * 1.7) * r * 0.6), 1, 1);
        }
      }
    }
    // Glitch de réalité (ère infinie)
    if (S.era >= 8) {
      this.glitchT -= this.dt;
      if (this.glitchT <= 0) { this.glitchT = U.rand(3, 9); this.glitch = 0.18; SFX.play('glitch'); }
      if (this.glitch > 0) {
        this.glitch -= this.dt;
        const y = Math.floor(U.rand(0, sc.H - 8)), h = Math.floor(U.rand(2, 8)), off = Math.floor(U.rand(-6, 6));
        c.drawImage(sc.cv, 0, y, W, h, off, y, W, h);
        c.fillStyle = 'rgba(44,232,245,0.15)'; c.fillRect(0, y, W, 1);
      }
    }
  },
  // Anneau d'accélérateur autour de la fiole
  ring(c, sc, t, cx, cy, backHalf) {
    const k = this.qty('accelerateur', 2); if (!k) return;
    for (let r = 0; r < k; r++) {
      const rx = Math.min(sc.W / 2 - 3, 30 + r * 7), ry = 7 + r * 2, yy = cy + 8 - r * 6;
      const N = 90;
      c.fillStyle = backHalf ? '#3a4466' : '#8b9bb4';
      for (let i = 0; i < N; i++) {
        const a = i / N * Math.PI * 2, s = Math.sin(a);
        if ((s < 0) !== backHalf) continue;
        c.fillRect(Math.round(cx + Math.cos(a) * rx), Math.round(yy + s * ry), 1, 1);
      }
      for (let p = 0; p < 3; p++) {
        const a = t * (5 + r * 2) + p * 2.1, s = Math.sin(a);
        if ((s < 0) !== backHalf) continue;
        const x = Math.round(cx + Math.cos(a) * rx), y = Math.round(yy + s * ry);
        c.fillStyle = '#2ce8f5'; c.fillRect(x - 1, y, 3, 1); c.fillRect(x, y - 1, 1, 3); c.fillStyle = '#fff'; c.fillRect(x, y, 1, 1);
      }
    }
  },
  // Objets cosmiques en orbite autour de la fiole
  orbiters() {
    const out = [];
    [['quantique', 2], ['orbitale', 2], ['chrono', 2], ['forge', 3], ['portail', 0], ['simulateur', 0], ['trounoir', 1], ['bigbang', 2], ['infini', 2]].forEach(([id, max]) => {
      for (let k = 0; k < this.qty(id, max); k++) out.push(id);
    });
    return out;
  },
  orbit(c, sc, t, cx, cy, backHalf) {
    const list = this.orbiters(); if (!list.length) return;
    const rx = Math.min(sc.W / 2 - 9, 44), ry = Math.min(30, (sc.benchTop - 10) / 2);
    list.forEach((id, i) => {
      const s = 'b_' + id; if (!GFX.has(s)) return;
      const sp = 0.35 + (i % 3) * 0.1, a = t * sp + i * (Math.PI * 2 / list.length), z = Math.sin(a);
      if ((z < 0) !== backHalf) return;
      const x = cx + Math.cos(a) * rx * (0.75 + (i % 2) * 0.25), y = cy - 4 + z * ry * 0.5 - Math.cos(a * 2) * 3;
      if (backHalf) c.globalAlpha = 0.7;
      c.drawImage(GFX.canvas(s, Math.floor(t * 2 + i) % GFX.frames(s)), Math.round(x - 8), Math.round(y - 8));
      c.globalAlpha = 1;
    });
  },
};
