/* ===================== TEXTURES PROCÉDURALES (aucune image : tout est peint au démarrage) =====================
   Chaque matière a une texture de couleur (« map », en tons neutres teintés ensuite par les couleurs des sommets) et
   une texture de relief (« normalMap », calculée depuis une carte de hauteur). Les textures se répètent sans couture
   (bruit périodique). TEX.creer() est appelé une fois, au démarrage. */
const TEX = (() => {
  const T = {};
  // bruit périodique (période p en cases) pour des textures sans couture
  function pn(x, y, p, s) {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    const m = k => ((k % p) + p) % p;
    const a = NZ.h2(m(xi), m(yi), s), b = NZ.h2(m(xi + 1), m(yi), s), c = NZ.h2(m(xi), m(yi + 1), s), d = NZ.h2(m(xi + 1), m(yi + 1), s);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }
  function pfbm(x, y, p, s, oct) { let t = 0, a = 0.5, n = 0, f = 1; for (let i = 0; i < oct; i++) { t += a * pn(x * f, y * f, p * f, s + i * 31); n += a; a *= 0.5; f *= 2; } return t / n; }
  // cellules de Voronoï périodiques (pavés) : renvoie [distance au bord, id de cellule]
  function vor(x, y, p, s) {
    const xi = Math.floor(x), yi = Math.floor(y); let d1 = 9, d2 = 9, id = 0;
    for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) {
      const cx = xi + i, cy = yi + j, wx = ((cx % p) + p) % p, wy = ((cy % p) + p) % p;
      const px = cx + 0.15 + 0.7 * NZ.h2(wx, wy, s), py = cy + 0.15 + 0.7 * NZ.h2(wx, wy, s + 1);
      const d = Math.hypot(x - px, y - py);
      if (d < d1) { d2 = d1; d1 = d; id = NZ.h2(wx, wy, s + 2); } else if (d < d2) d2 = d;
    }
    return [d2 - d1, id];
  }
  // peint une texture N×N : f(u, v) -> [r, g, b, hauteur] (u, v dans 0..1) ; renvoie { map, nrm }
  function peindre(N, f, force, opts) {
    opts = opts || {};
    const cv = document.createElement('canvas'); cv.width = cv.height = N;
    const cx = cv.getContext('2d'), img = cx.createImageData(N, N), H = new Float32Array(N * N);
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const c = f(x / N, y / N), k = (y * N + x) * 4;
      img.data[k] = clamp(c[0], 0, 1) * 255; img.data[k + 1] = clamp(c[1], 0, 1) * 255; img.data[k + 2] = clamp(c[2], 0, 1) * 255;
      img.data[k + 3] = c.length > 4 ? clamp(c[4], 0, 1) * 255 : 255; H[y * N + x] = c[3] || 0;
    }
    cx.putImageData(img, 0, 0);
    const map = new THREE.CanvasTexture(cv);
    map.colorSpace = opts.lineaire ? THREE.NoColorSpace : THREE.SRGBColorSpace;
    map.wrapS = map.wrapT = THREE.RepeatWrapping; map.anisotropy = 4;
    let nrm = null;
    if (force) {
      const cn = document.createElement('canvas'); cn.width = cn.height = N;
      const nx = cn.getContext('2d'), ni = nx.createImageData(N, N);
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        const l = H[y * N + (x - 1 + N) % N], r = H[y * N + (x + 1) % N], u = H[((y - 1 + N) % N) * N + x], d = H[((y + 1) % N) * N + x];
        let ax = (l - r) * force, ay = (u - d) * force, az = 1; const n = Math.hypot(ax, ay, az); ax /= n; ay /= n; az /= n;
        const k = (y * N + x) * 4; ni.data[k] = (ax * 0.5 + 0.5) * 255; ni.data[k + 1] = (ay * 0.5 + 0.5) * 255; ni.data[k + 2] = (az * 0.5 + 0.5) * 255; ni.data[k + 3] = 255;
      }
      nx.putImageData(ni, 0, 0);
      nrm = new THREE.CanvasTexture(cn); nrm.colorSpace = THREE.NoColorSpace;
      nrm.wrapS = nrm.wrapT = THREE.RepeatWrapping; nrm.anisotropy = 4;
    }
    return { map, nrm };
  }
  function canvasTex(N, M, dessin, srgb) {
    const cv = document.createElement('canvas'); cv.width = N; cv.height = M || N;
    dessin(cv.getContext('2d'), N, M || N);
    const t = new THREE.CanvasTexture(cv); t.colorSpace = srgb === false ? THREE.NoColorSpace : THREE.SRGBColorSpace; return t;
  }

  T.creer = function (Q) {
    const N = Q >= 2 ? 512 : 256, n = N >= 512 ? 256 : 128;
    // --- neige : grain fin, congères douces, quelques cristaux qui brillent
    T.neige = peindre(N, (u, v) => {
      const big = pfbm(u * 4, v * 4, 4, 11, 4), fin = pfbm(u * 32, v * 32, 32, 12, 2);
      const g = 0.86 + big * 0.08 + fin * 0.05, spark = NZ.h2(Math.floor(u * N), Math.floor(v * N), 99) > 0.996 ? 0.08 : 0;
      return [g * 0.93 + spark, g * 0.96 + spark, g + spark, big * 1.4 + fin * 0.6];
    }, 2.2);
    // --- pavés : pierres arrondies, joints remplis de neige
    T.pave = peindre(N, (u, v) => {
      const [e, id] = vor(u * 8, v * 8, 8, 21), bump = pfbm(u * 24, v * 24, 24, 22, 3);
      const joint = sstep(0.02, 0.14, e), neige = 1 - sstep(0.0, 0.1, e - bump * 0.05);
      const base = 0.17 + id * 0.16 + bump * 0.08;
      const r = lerp(base * 0.92, 0.8, neige * 0.8), g = lerp(base, 0.84, neige * 0.8), b = lerp(base * 1.12, 0.92, neige * 0.8);
      return [r, g, b, joint * 1.2 + bump * 0.3];
    }, 3.5);
    // --- plâtre : taches, coulures, fissures
    T.platre = peindre(n, (u, v) => {
      const a = pfbm(u * 6, v * 6, 6, 31, 5), coul = pfbm(u * 20, v * 2, 20, 32, 3), fis = Math.abs(pfbm(u * 5, v * 5, 5, 33, 4) - 0.5) < 0.012 ? -0.25 : 0;
      const g = 0.62 + a * 0.25 - coul * 0.12 * v + fis;
      return [g, g * 0.97, g * 0.93, a + fis * 2];
    }, 2.5);
    // --- planches verticales
    T.planche = peindre(n, (u, v) => {
      const k = Math.floor(u * 6), x = u * 6 - k, gap = x < 0.05 || x > 0.97 ? 1 : 0;
      const grain = pfbm(u * 6 + k * 0.37, v * 40, 40, 41 + k, 3), noeud = pfbm(u * 12, v * 12, 12, 47, 2);
      const g = (0.5 + grain * 0.25 + NZ.h2(k, 0, 42) * 0.12) * (gap ? 0.25 : 1) - (noeud > 0.78 ? 0.15 : 0);
      return [g, g * 0.82, g * 0.66, gap ? 0 : 0.6 + grain * 0.3];
    }, 3);
    // --- briques
    T.brique = peindre(n, (u, v) => {
      const row = Math.floor(v * 16), off = row % 2 ? 0.5 : 0, bx = u * 6 + off, col = Math.floor(bx);
      const fx = bx - col, fy = v * 16 - row, mortier = fx < 0.06 || fy < 0.12;
      const id = NZ.h2(((col % 6) + 6) % 6, row, 51), gr = pfbm(u * 30, v * 30, 30, 52, 2);
      if (mortier) return [0.55, 0.55, 0.56, 0.1];
      return [0.42 + id * 0.18 + gr * 0.1, 0.2 + id * 0.08 + gr * 0.06, 0.18 + gr * 0.05, 0.8 + gr * 0.3];
    }, 3);
    // --- tuiles en écailles (toits gothiques)
    T.tuiles = peindre(n, (u, v) => {
      const rows = 10, cols = 8, row = Math.floor(v * rows), off = row % 2 ? 0.5 : 0;
      const x = u * cols + off, col = Math.floor(x), fx = x - col - 0.5, fy = v * rows - row;
      const r = Math.hypot(fx, (1 - fy) * 0.9), bord = sstep(0.42, 0.5, r), id = NZ.h2(((col % cols) + cols) % cols, row, 61);
      const gr = pfbm(u * 24, v * 24, 24, 62, 2), g = (0.42 + id * 0.16 + gr * 0.12) * (1 - bord * 0.6) * (0.75 + 0.25 * fy);
      return [g, g * 0.95, g * 1.02, (1 - bord) * fy + gr * 0.2];
    }, 4);
    // --- écorce
    T.ecorce = peindre(n, (u, v) => {
      const s = pfbm(u * 10, v * 2, 10, 71, 4), fis = sstep(0.35, 0.5, Math.abs(pn(u * 14, v * 3, 14, 72) - 0.5) * 2);
      const g = 0.25 + s * 0.25 - fis * 0.12;
      return [g, g * 0.85, g * 0.75, s - fis];
    }, 3);
    // --- aiguilles de sapin
    T.aiguilles = peindre(n, (u, v) => {
      const a = pfbm(u * 32, v * 8, 32, 81, 3), b = pfbm(u * 8, v * 8, 8, 82, 3);
      const g = 0.35 + a * 0.4;
      return [g * 0.35, g * 0.6 + b * 0.1, g * 0.45, a * 1.2];
    }, 3);
    // --- pierre (tombes, fontaine, puits)
    T.pierre = peindre(n, (u, v) => {
      const a = pfbm(u * 5, v * 5, 5, 91, 5), b = pfbm(u * 30, v * 30, 30, 92, 2), lichen = sstep(0.62, 0.7, pfbm(u * 7, v * 7, 7, 93, 3));
      const g = 0.45 + a * 0.2 + b * 0.08;
      return [g - lichen * 0.08, g + lichen * 0.02, g - lichen * 0.1, a + b * 0.5];
    }, 2.5);
    // --- fer forgé (rugosité dans la couleur : on reste simple)
    T.metal = peindre(128, (u, v) => { const a = pfbm(u * 8, v * 8, 8, 101, 4); const g = 0.2 + a * 0.15; return [g, g, g * 1.05, a]; }, 1.5);
    // --- côtes de citrouille
    T.citrouille = peindre(128, (u, v) => {
      const c = Math.abs(Math.sin(u * Math.PI * 10)), a = pfbm(u * 10, v * 6, 10, 111, 3);
      const g = 0.75 + c * 0.2 + a * 0.1;
      return [g, g * 0.92, g * 0.85, c * 0.8 + a * 0.2];
    }, 4);
    // --- tissu rayé (tentes de la foire) : blanc / gris, teinté ensuite
    T.raye = peindre(128, (u, v) => { const r = Math.floor(u * 8) % 2, a = pfbm(u * 16, v * 16, 16, 121, 2); const g = (r ? 0.95 : 0.42) - a * 0.08; return [g, g, g, a * 0.3]; }, 1);
    // --- glace : reflets clairs, fissures
    T.glace = peindre(N >= 512 ? 512 : 256, (u, v) => {
      const a = pfbm(u * 3, v * 3, 3, 131, 5), f = Math.abs(pfbm(u * 6, v * 6, 6, 132, 4) - 0.5) < 0.008 ? 1 : 0;
      const g = 0.45 + a * 0.25 + f * 0.35;
      return [g * 0.8, g * 0.92, g, a * 0.4 - f * 0.5];
    }, 1.6);
    // --- fenêtres : atlas 2×2 (croisillons, ogive, ronde, rideaux) ; vue de l'intérieur éclairé
    T.fenetres = canvasTex(256, 256, (c, W) => {
      const h = W / 2;
      const fond = (x, y, w, hh) => { const g = c.createRadialGradient(x + w / 2, y + hh * 0.65, 4, x + w / 2, y + hh / 2, hh * 0.8); g.addColorStop(0, '#fff3c4'); g.addColorStop(0.45, '#ffb84a'); g.addColorStop(1, '#a8461a'); c.fillStyle = g; c.fillRect(x, y, w, hh); };
      c.fillStyle = '#120c08'; c.fillRect(0, 0, W, W);
      // 0 : croisillons
      fond(8, 8, h - 16, h - 16); c.fillStyle = '#1a120c';
      c.fillRect(h / 2 - 4, 8, 8, h - 16); c.fillRect(8, h / 2 - 4, h - 16, 8); c.fillRect(8, 8, h - 16, 6);
      // 1 : ogive gothique
      c.save(); c.beginPath(); c.moveTo(h + 12, h - 8); c.lineTo(h + 12, h * 0.45); c.quadraticCurveTo(h + 12, 10, h + h / 2, 6); c.quadraticCurveTo(W - 12, 10, W - 12, h * 0.45); c.lineTo(W - 12, h - 8); c.closePath(); c.clip();
      fond(h, 0, h, h); c.fillStyle = '#1a120c'; c.fillRect(h + h / 2 - 3, 0, 6, h); for (let i = 1; i < 4; i++) c.fillRect(h, i * h / 4, h, 4); c.restore();
      // 2 : ronde
      c.save(); c.beginPath(); c.arc(h / 2, h + h / 2, h / 2 - 10, 0, Math.PI * 2); c.clip(); fond(0, h, h, h);
      c.strokeStyle = '#1a120c'; c.lineWidth = 6; for (let i = 0; i < 4; i++) { c.beginPath(); c.moveTo(h / 2, h + h / 2); c.lineTo(h / 2 + Math.cos(i * Math.PI / 4) * h, h + h / 2 + Math.sin(i * Math.PI / 4) * h); c.moveTo(h / 2, h + h / 2); c.lineTo(h / 2 - Math.cos(i * Math.PI / 4) * h, h + h / 2 - Math.sin(i * Math.PI / 4) * h); c.stroke(); }
      c.restore();
      // 3 : rideaux + silhouette d'une plante (ou de quelqu'un ?)
      fond(h + 8, h + 8, h - 16, h - 16);
      c.fillStyle = '#5a1420'; c.beginPath(); c.moveTo(h + 8, h + 8); c.quadraticCurveTo(h + 40, h + 70, h + 22, W - 8); c.lineTo(h + 8, W - 8); c.fill();
      c.beginPath(); c.moveTo(W - 8, h + 8); c.quadraticCurveTo(W - 40, h + 70, W - 22, W - 8); c.lineTo(W - 8, W - 8); c.fill();
      c.fillStyle = 'rgba(30,14,8,.85)'; c.beginPath(); c.ellipse(h + h / 2, W - 40, 14, 22, 0, 0, Math.PI * 2); c.fill(); c.beginPath(); c.arc(h + h / 2, W - 72, 10, 0, Math.PI * 2); c.fill();
    });
    T.fenetres.anisotropy = 4;
    // --- porte en bois cloutée
    T.porte = canvasTex(128, 256, (c, W, H) => {
      c.fillStyle = '#3a2416'; c.fillRect(0, 0, W, H);
      for (let i = 0; i < 5; i++) { c.fillStyle = i % 2 ? '#43291a' : '#352014'; c.fillRect(i * W / 5 + 1, 0, W / 5 - 2, H); }
      c.fillStyle = '#1c120b'; c.fillRect(0, H * 0.2, W, 10); c.fillRect(0, H * 0.75, W, 10);
      c.fillStyle = '#9a8a6a'; c.beginPath(); c.arc(W * 0.78, H * 0.52, 6, 0, Math.PI * 2); c.fill();
      c.fillStyle = '#000'; c.globalAlpha = 0.5; c.beginPath(); c.ellipse(W / 2, 0, W / 2, 40, 0, 0, Math.PI); c.fill();
    });
    // --- halo radial (flaques de lumière au sol, auréoles, particules)
    T.lueur = canvasTex(128, 128, (c, W) => { const g = c.createRadialGradient(W / 2, W / 2, 0, W / 2, W / 2, W / 2); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.25, 'rgba(255,255,255,.55)'); g.addColorStop(0.6, 'rgba(255,255,255,.14)'); g.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = g; c.fillRect(0, 0, W, W); });
    // --- bonbon (sucre d'orge en spirale)
    T.bonbon = canvasTex(128, 64, (c, W, H) => { c.fillStyle = '#f4f0ea'; c.fillRect(0, 0, W, H); c.fillStyle = '#c4141e'; for (let i = -4; i < 12; i++) { c.beginPath(); c.moveTo(i * 16, 0); c.lineTo(i * 16 + 8, 0); c.lineTo(i * 16 + 8 + H, H); c.lineTo(i * 16 + H, H); c.fill(); } });
    // --- papier cadeau (motif clair, teinté) avec ruban doré au centre
    T.cadeau = canvasTex(128, 128, (c, W) => {
      c.fillStyle = '#e8e8e8'; c.fillRect(0, 0, W, W); c.fillStyle = '#b8b8b8';
      for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) if ((x + y) % 2 === 0) { c.beginPath(); c.arc(x * 16 + 8, y * 16 + 8, 3, 0, Math.PI * 2); c.fill(); }
      c.fillStyle = '#f2c14e'; c.fillRect(W / 2 - 9, 0, 18, W); c.fillRect(0, W / 2 - 9, W, 18);
      c.fillStyle = 'rgba(255,255,255,.5)'; c.fillRect(W / 2 - 9, 0, 4, W); c.fillRect(0, W / 2 - 9, W, 4);
    });
    T.flocon = canvasTex(64, 64, (c, W) => { const g = c.createRadialGradient(W / 2, W / 2, 0, W / 2, W / 2, W / 2); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.4, 'rgba(255,255,255,.7)'); g.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = g; c.fillRect(0, 0, W, W); });
    // --- flamme (particules de feu)
    T.flamme = canvasTex(64, 64, (c, W) => { const g = c.createRadialGradient(W / 2, W * 0.6, 0, W / 2, W * 0.55, W / 2); g.addColorStop(0, 'rgba(255,240,200,1)'); g.addColorStop(0.3, 'rgba(255,170,60,.85)'); g.addColorStop(0.7, 'rgba(200,60,10,.25)'); g.addColorStop(1, 'rgba(120,20,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, W); });
    // --- cadran d'horloge (émissif, chiffres « tordus »)
    T.cadran = canvasTex(256, 256, (c, W) => {
      const g = c.createRadialGradient(W / 2, W / 2, 10, W / 2, W / 2, W / 2); g.addColorStop(0, '#fff6d8'); g.addColorStop(0.8, '#f0c870'); g.addColorStop(1, '#5a3a10');
      c.fillStyle = g; c.beginPath(); c.arc(W / 2, W / 2, W / 2 - 2, 0, Math.PI * 2); c.fill();
      c.fillStyle = '#2a1608'; c.font = 'bold 30px Georgia,serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
      const R = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
      for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6 - Math.PI / 2; c.save(); c.translate(W / 2 + Math.cos(a) * 96, W / 2 + Math.sin(a) * 96); c.rotate(a + Math.PI / 2 + (NZ.h2(i, 0, 7) - 0.5) * 0.5); c.fillText(R[i], 0, 0); c.restore(); }
      c.strokeStyle = '#2a1608'; c.lineWidth = 4; c.beginPath(); c.arc(W / 2, W / 2, W / 2 - 6, 0, Math.PI * 2); c.stroke();
    });
  };
  return T;
})();
