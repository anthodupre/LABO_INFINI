/* ===================== RENDU DES SPRITES ===================== */
const GFX = {
  _cv: {}, _url: {}, _rgba: null, _info: {},
  TIER_COLORS: [
    ['#b86f50', '#e4a672'], ['#8b9bb4', '#ffffff'], ['#feae34', '#fee761'], ['#3e8948', '#63c74d'], ['#a22633', '#e43b44'],
    ['#124e89', '#0099db'], ['#68386c', '#b55088'], ['#262b44', '#2ce8f5'], ['#0099db', '#2ce8f5'], ['#3e2731', '#9b5de5'],
    ['#f77622', '#fee761'], ['#b55088', '#d4b8ff'], ['#193c3e', '#63c74d'], ['#ff0044', '#feae34'], ['#d4b8ff', '#ffffff'],
  ],
  rgbaOf(ch) {
    if (!this._rgba) {
      this._rgba = {};
      for (const k in PAL) {
        const c = PAL[k];
        if (c[0] === '#') this._rgba[k] = [...U.hex2rgb(c), 255];
        else { const m = c.match(/rgba\((\d+),(\d+),(\d+),([\d.]+)\)/); this._rgba[k] = [+m[1], +m[2], +m[3], Math.round(+m[4] * 255)]; }
      }
    }
    return this._rgba[ch];
  },
  has(name) { return !!SPRITES[name]; },
  optKey(o) { return o ? (o.tint || '') + ',' + (o.liquid || '') + ',' + (o.sil || '') + ',' + (o.flip ? 1 : 0) + ',' + (o.noAcc ? 1 : 0) + ',' + (o.dim || '') : ''; },
  // table arc-en-ciel précalculée (aucune allocation par pixel)
  RBW: null,
  rbw(h, light) {
    if (!this.RBW) { this.RBW = { rgb: [[], []], hex: [] }; for (let k = 0; k < 360; k++) { this.RBW.rgb[0][k] = U.hex2rgb(U.hsl(k, 0.85, 0.6)); this.RBW.rgb[1][k] = U.hex2rgb(U.hsl(k, 0.85, 0.8)); this.RBW.hex[k] = U.hsl(k, 0.9, 0.65); } }
    const i = ((Math.floor(h) % 360) + 360) % 360;
    return light == null ? this.RBW.hex[i] : this.RBW.rgb[light ? 1 : 0][i];
  },
  get(name) {
    let s = SPRITES[name];
    if (!s) { // sprite manquant : remplaçant visible plutôt qu'un plantage
      const r = ['0000000000000000'];
      for (let i = 0; i < 14; i++) r.push('0' + (i > 3 && i < 10 ? 'MMMMM66666MMMMM' : 'MMMMMMMMMMMMMMM').slice(0, 14) + '0');
      r.push('0000000000000000');
      s = SPRITES[name] = { w: 16, h: 16, frames: [r], missing: true };
    }
    return s;
  },
  frames(name) { return this.get(name).frames.length; },
  // opt: { tint: '#hex' couleur des '+', liquid: '#hex' couleur des '~', sil: '#hex' silhouette, flip: bool }
  canvas(name, frame = 0, opt) {
    const key = name + '|' + frame + '|' + this.optKey(opt);
    const hit = this._cv[key]; if (hit) return hit;
    const s = this.get(name), fr = s.frames[frame % s.frames.length];
    const cv = document.createElement('canvas'); cv.width = s.w; cv.height = s.h;
    const cx = cv.getContext('2d'), img = cx.createImageData(s.w, s.h), d = img.data;
    const tint = opt && opt.tint ? [...U.hex2rgb(opt.tint), 255] : null;
    const liq = opt && opt.liquid ? [...U.hex2rgb(opt.liquid), 255] : null;
    const sil = opt && opt.sil ? [...U.hex2rgb(opt.sil), 255] : null;
    for (let y = 0; y < s.h; y++) {
      const row = fr[y] || '';
      for (let x = 0; x < s.w; x++) {
        const ch = row[x];
        let c = null;
        if (!ch || ch === '.') continue;
        if (ch === '~') c = liq; else if (ch === '+') c = tint || (opt && opt.noAcc ? null : [255, 255, 255, 255]); else c = this.rgbaOf(ch);
        if (!c) continue;
        if (sil) c = [sil[0], sil[1], sil[2], c[3] < 255 ? 0 : 255];
        if (opt && opt.dim) c = [c[0] * opt.dim, c[1] * opt.dim, c[2] * opt.dim, c[3]];
        const xx = opt && opt.flip ? s.w - 1 - x : x;
        const i = (y * s.w + xx) * 4; d[i] = c[0]; d[i + 1] = c[1]; d[i + 2] = c[2]; d[i + 3] = c[3];
      }
    }
    cx.putImageData(img, 0, 0);
    this._cv[key] = cv;
    return cv;
  },
  // URL d'image agrandie (pour le DOM) ; scale entier
  url(name, frame = 0, scale = 1, opt) {
    const key = name + '|' + frame + '|' + scale + '|' + this.optKey(opt);
    if (this._url[key]) return this._url[key];
    const src = this.canvas(name, frame, opt);
    let u;
    try {
      const cv = document.createElement('canvas'); cv.width = src.width * scale; cv.height = src.height * scale;
      const cx = cv.getContext('2d'); cx.imageSmoothingEnabled = false; cx.drawImage(src, 0, 0, cv.width, cv.height);
      u = cv.toDataURL();
    } catch (e) { u = ''; }
    return (this._url[key] = u);
  },
  // Icône encadrée selon le palier (20×20 logique) – améliorations / succès
  framed(name, tier, opt) {
    const key = 'F|' + name + '|' + tier + '|' + this.optKey(opt);
    if (this._url[key]) return this._url[key];
    const src = this.canvas(name, 0, opt);
    const S = 22, sc = 3;
    const cv = document.createElement('canvas'); cv.width = S * sc; cv.height = S * sc;
    const cx = cv.getContext('2d'); cx.imageSmoothingEnabled = false; cx.scale(sc, sc);
    const tc = tier == null ? ['#2a2f4a', '#5a6988'] : this.TIER_COLORS[tier % this.TIER_COLORS.length];
    cx.fillStyle = '#181425'; cx.fillRect(0, 0, S, S);
    cx.fillStyle = tc[0]; cx.fillRect(1, 1, S - 2, S - 2);
    cx.fillStyle = tc[1]; cx.fillRect(1, 1, S - 2, 1); cx.fillRect(1, 1, 1, S - 2);
    cx.fillStyle = '#1f1a33'; cx.fillRect(2, 2, S - 4, S - 4);
    cx.fillStyle = 'rgba(255,255,255,0.06)'; cx.fillRect(2, 2, S - 4, Math.floor((S - 4) / 2));
    const k = Math.min(16 / src.width, 16 / src.height), f = k >= 2 ? Math.floor(k) : Math.min(1, k);
    const w = src.width * f, h = src.height * f;
    cx.drawImage(src, (S - w) / 2, (S - h) / 2, w, h);
    let u = ''; try { u = cv.toDataURL(); } catch (e) { }
    return (this._url[key] = u);
  },
  // Analyse d'un récipient : cellules liquides et accents
  vessel(name) {
    if (this._info[name]) return this._info[name];
    const s = this.get(name), fr = s.frames[0];
    const liq = [], acc = [], colTop = {}, colBot = {};
    let top = s.h, bot = 0, l = s.w, r = 0, oTop = s.h, oBot = 0, oL = s.w, oR = 0;
    for (let y = 0; y < s.h; y++) for (let x = 0; x < s.w; x++) {
      const ch = (fr[y] || '')[x];
      if (!ch || ch === '.') continue;
      oTop = Math.min(oTop, y); oBot = Math.max(oBot, y); oL = Math.min(oL, x); oR = Math.max(oR, x);
      if (ch === '~') {
        liq.push([x, y]); top = Math.min(top, y); bot = Math.max(bot, y); l = Math.min(l, x); r = Math.max(r, x);
        colTop[x] = Math.min(colTop[x] == null ? 99 : colTop[x], y); colBot[x] = Math.max(colBot[x] || 0, y);
      } else if (ch === '+') acc.push([x, y]);
    }
    if (!liq.length) { top = 0; bot = s.h - 1; l = 0; r = s.w - 1; }
    return (this._info[name] = { w: s.w, h: s.h, liq, acc, top, bot, l, r, colTop, colBot, box: [oL, oTop, oR, oBot] });
  },
};
