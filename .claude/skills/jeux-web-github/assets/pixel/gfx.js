/* ===================== RENDU DES SPRITES (version allégée de celle de Labo Infini) ===================== */
// Sprites texte : SPRITES.nom = { w, h, frames: [[lignes…], …] }, un caractère = une couleur de PAL, '.' = vide.
// '+' = couleur d'accent (paramètre tint), '~' = liquide (paramètre liquid). Tout est mis en cache.
const GFX = {
  _cv: {}, _url: {}, _rgba: {},
  rgba(ch) {
    if (this._rgba[ch]) return this._rgba[ch];
    const c = PAL[ch]; if (!c) return null;
    let v;
    if (c[0] === '#') v = [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16), 255];
    else { const m = c.match(/rgba\((\d+),(\d+),(\d+),([\d.]+)\)/); v = [+m[1], +m[2], +m[3], Math.round(+m[4] * 255)]; }
    return (this._rgba[ch] = v);
  },
  hex(h) { return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16), 255]; },
  get(name) { // sprite manquant : remplaçant magenta visible plutôt qu'un plantage
    if (!SPRITES[name]) {
      const r = []; for (let i = 0; i < 8; i++) r.push(i === 0 || i === 7 ? '00000000' : '0MMMMMM0');
      SPRITES[name] = { w: 8, h: 8, frames: [r], missing: true }; console.warn('sprite manquant : ' + name);
    }
    return SPRITES[name];
  },
  canvas(name, frame = 0, opt) {
    const key = name + '|' + frame + '|' + (opt ? (opt.tint || '') + (opt.liquid || '') + (opt.flip ? 'f' : '') + (opt.dim || '') : '');
    if (this._cv[key]) return this._cv[key];
    const s = this.get(name), fr = s.frames[frame % s.frames.length];
    const cv = document.createElement('canvas'); cv.width = s.w; cv.height = s.h;
    const cx = cv.getContext('2d'), img = cx.createImageData(s.w, s.h), d = img.data;
    const tint = opt && opt.tint ? this.hex(opt.tint) : [255, 255, 255, 255], liq = opt && opt.liquid ? this.hex(opt.liquid) : null;
    for (let y = 0; y < s.h; y++) {
      const row = fr[y] || '';
      for (let x = 0; x < s.w; x++) {
        const ch = row[x]; if (!ch || ch === '.') continue;
        let c = ch === '+' ? tint : ch === '~' ? liq : this.rgba(ch); if (!c) continue;
        if (opt && opt.dim) c = [c[0] * opt.dim, c[1] * opt.dim, c[2] * opt.dim, c[3]]; // rangée du fond : assombrie, OPAQUE
        const i = (y * s.w + (opt && opt.flip ? s.w - 1 - x : x)) * 4;
        d[i] = c[0]; d[i + 1] = c[1]; d[i + 2] = c[2]; d[i + 3] = c[3];
      }
    }
    cx.putImageData(img, 0, 0);
    return (this._cv[key] = cv);
  },
  // URL d'image agrandie d'un facteur ENTIER (pour <img> dans le DOM)
  url(name, frame = 0, scale = 4, opt) {
    const key = name + '|' + frame + '|' + scale + '|' + JSON.stringify(opt || 0);
    if (this._url[key]) return this._url[key];
    const src = this.canvas(name, frame, opt), cv = document.createElement('canvas');
    cv.width = src.width * scale; cv.height = src.height * scale;
    const cx = cv.getContext('2d'); cx.imageSmoothingEnabled = false; cx.drawImage(src, 0, 0, cv.width, cv.height);
    let u = ''; try { u = cv.toDataURL(); } catch (e) { }
    return (this._url[key] = u);
  },
};
