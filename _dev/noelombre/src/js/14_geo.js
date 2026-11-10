/* ===================== GÉOMÉTRIE : lots fusionnés + modèles (maisons tordues, lampadaires, sapins…) =====================
   Un morceau de ville (« parcelle ») accumule toutes ses pièces dans des LOTS, un par matière ; chaque lot devient UN
   seul maillage (peu d'appels de dessin : indispensable sur iPhone). Les pièces sont copiées à la main dans des
   tableaux (plus rapide que de cloner des géométries Three.js). */
const GEO = (() => {
  const G = {};
  const _v = new THREE.Vector3(), _n = new THREE.Vector3(), _m3 = new THREE.Matrix3();
  // ---- formes de base (taille 1, centrées), mises en cache ----
  const base = {};
  function prep(g) { if (!g.index) { const n = g.attributes.position.count, ix = new Uint32Array(n); for (let i = 0; i < n; i++) ix[i] = i; g.setIndex(new THREE.BufferAttribute(ix, 1)); } return g; }
  G.base = function (k) {
    if (base[k]) return base[k];
    let g;
    switch (k) {
      case 'boite': g = new THREE.BoxGeometry(1, 1, 1, 1, 4, 1); break;
      case 'cube': g = new THREE.BoxGeometry(1, 1, 1); break;
      case 'cyl6': g = new THREE.CylinderGeometry(1, 1, 1, 6, 1); break;
      case 'cyl8': g = new THREE.CylinderGeometry(1, 1, 1, 8, 3); break;
      case 'cyl12': g = new THREE.CylinderGeometry(1, 1, 1, 12, 4); break;
      case 'cyl16': g = new THREE.CylinderGeometry(1, 1, 1, 16, 2); break;
      case 'cone4': g = new THREE.CylinderGeometry(0, 1, 1, 4, 6); g.rotateY(Math.PI / 4); break;
      case 'cone8': g = new THREE.CylinderGeometry(0, 1, 1, 8, 4); break;
      case 'cone12': g = new THREE.CylinderGeometry(0.0, 1, 1, 12, 5); break;
      case 'glacon': g = new THREE.CylinderGeometry(0, 1, 1, 5, 1, true); break;
      case 'sphere': g = new THREE.SphereGeometry(1, 12, 8); break;
      case 'sphereB': g = new THREE.SphereGeometry(1, 8, 6); break;
      case 'ico': g = new THREE.OctahedronGeometry(1, 0); break;
      case 'plan': g = new THREE.PlaneGeometry(1, 1); break;
      case 'pt': g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0], 3)); g.setAttribute('normal', new THREE.Float32BufferAttribute([0, 1, 0], 3)); g.setIndex([0]); break; // un seul sommet (ampoules, halos)
      case 'bosse': g = new THREE.SphereGeometry(1, 7, 4, 0, Math.PI * 2, 0, Math.PI / 2); break; // congère (demi-sphère)
      case 'dalle': g = new THREE.BoxGeometry(1, 1, 1, 6, 1, 4); break; // couche de neige d'un toit (assez de sommets pour onduler)
      case 'tronc': g = new THREE.CylinderGeometry(0.62, 1, 1, 7, 1); break; // branche qui s'affine
      case 'plan9': g = new THREE.PlaneGeometry(1, 1, 4, 4); break;
      case 'tore': g = new THREE.TorusGeometry(1, 0.32, 6, 16); break;
      case 'couronne': g = new THREE.TorusGeometry(1, 0.26, 7, 18); break;
      case 'toreFin': g = new THREE.TorusGeometry(1, 0.06, 4, 24); break;
      case 'etage': { // étage de sapin : cône aux pointes déchiquetées (branches) + dessous en pente douce
        const haut = new THREE.CylinderGeometry(0, 1, 1, 18, 3, true), bas = new THREE.CylinderGeometry(1, 0.15, 0.22, 18, 1, true);
        bas.translate(0, -0.61, 0);
        const jag = (g, yBord) => { const p = g.attributes.position; for (let i = 0; i < p.count; i++) { const x = p.getX(i), y = p.getY(i), z = p.getZ(i), a = Math.atan2(z, x); const k = clamp(1 - Math.abs(y - yBord) / 0.6, 0, 1); const dent = 0.72 + 0.38 * Math.pow(Math.abs(Math.sin(a * 7 + Math.sin(a * 3) * 1.3)), 0.6); const f = lerp(1, dent, k); p.setXYZ(i, x * f, y - k * k * (1 - dent) * 0.5, z * f); } g.computeVertexNormals(); };
        jag(haut, -0.5); jag(bas, -0.5);
        g = THREE.mergeGeometries([haut.toNonIndexed(), bas.toNonIndexed()]); g.deleteAttribute('uv'); break;
      }
      case 'pignon': { // prisme triangulaire : toit à deux pentes, faîte le long de z
        const s = new THREE.Shape(); s.moveTo(-0.5, 0); s.lineTo(0.5, 0); s.lineTo(0, 1); s.lineTo(-0.5, 0);
        g = new THREE.ExtrudeGeometry(s, { depth: 1, bevelEnabled: false, steps: 3 }); g.translate(0, 0, -0.5); break;
      }
      case 'boucle': { // volute en spirale (haut des lampadaires, grilles)
        const pts = []; for (let i = 0; i <= 40; i++) { const t = i / 40, a = t * Math.PI * 3.2, r = 0.5 * (1 - t * 0.8); pts.push(new THREE.Vector3(Math.sin(a) * r, Math.cos(a) * r * 0.9 + 0.5 - (1 - t) * 0.1, 0)); }
        g = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 22, 0.04, 4, false); break;
      }
      case 'crochet': { // sucre d'orge / poteau à crochet
        const pts = []; for (let i = 0; i <= 24; i++) { const t = i / 24; if (t < 0.6) pts.push(new THREE.Vector3(0, t / 0.6, 0)); else { const a = (t - 0.6) / 0.4 * Math.PI; pts.push(new THREE.Vector3(0.18 - Math.cos(a) * 0.18, 1 + Math.sin(a) * 0.18, 0)); } }
        g = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 30, 0.05, 6, false); break;
      }
      default: throw new Error('forme inconnue ' + k);
    }
    if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
    return (base[k] = prep(g));
  };

  // ---- Lot : accumule des pièces pour une matière ----
  function Lot(attrsExtra) { this.p = []; this.n = []; this.u = []; this.c = []; this.i = []; this.x = attrsExtra ? [] : null; this.nv = 0; }
  // o : { m: Matrix4 locale, c: [r,g,b], uvm: 'monde' (UV en mètres) | undefined, s: échelle UV (rép./m),
  //       uvr: [u0,v0,u1,v1] (case d'atlas), uve: [ku, kv] (échelle des UV d'origine), def: fonction(Vector3) déformation,
  //       w: Matrix4 monde, x: valeur d'attribut extra, ao: fonction(Vector3 local) -> facteur d'ombre (0..1) }
  Lot.prototype.add = function (geo, o) {
    const P = geo.attributes.position.array, N = geo.attributes.normal.array, UV = geo.attributes.uv.array, I = geo.index.array;
    const m = o.m, w = o.w, c = o.c || [1, 1, 1], s = o.s || 0.5, base0 = this.nv, def = o.def, uvr = o.uvr;
    const nvert = P.length / 3;
    if (m) _m3.getNormalMatrix(m);
    const wn = w ? new THREE.Matrix3().getNormalMatrix(w) : null;
    for (let k = 0; k < nvert; k++) {
      _v.set(P[k * 3], P[k * 3 + 1], P[k * 3 + 2]); _n.set(N[k * 3], N[k * 3 + 1], N[k * 3 + 2]);
      if (m) { _v.applyMatrix4(m); _n.applyMatrix3(_m3).normalize(); }
      let u = UV[k * 2], v = UV[k * 2 + 1];
      if (o.uvm === 'monde') {
        const ax = Math.abs(_n.x), ay = Math.abs(_n.y), az = Math.abs(_n.z);
        if (ay > ax && ay > az) { u = _v.x * s; v = _v.z * s; } else if (ax > az) { u = _v.z * s; v = _v.y * s; } else { u = _v.x * s; v = _v.y * s; }
      } else if (uvr) { u = uvr[0] + (uvr[2] - uvr[0]) * u; v = uvr[1] + (uvr[3] - uvr[1]) * v; }
      else if (o.uve) { u *= o.uve[0]; v *= o.uve[1]; }
      const ka = o.ao ? o.ao(_v) : 1;
      if (def) def(_v, _n);
      if (w) { _v.applyMatrix4(w); _n.applyMatrix3(wn).normalize(); }
      this.p.push(_v.x, _v.y, _v.z); this.n.push(_n.x, _n.y, _n.z); this.u.push(u, v); this.c.push(c[0] * ka, c[1] * ka, c[2] * ka);
      if (this.x) this.x.push(o.x || 0);
    }
    for (let k = 0; k < I.length; k++) this.i.push(I[k] + base0);
    this.nv += nvert;
  };
  Lot.prototype.geometrie = function (nomX) {
    if (!this.nv) return null;
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(this.u, 2));
    g.setAttribute('color', new THREE.Float32BufferAttribute(this.c, 3));
    if (this.x) g.setAttribute(nomX, new THREE.Float32BufferAttribute(this.x, 1));
    g.setIndex(this.nv > 65535 ? new THREE.Uint32BufferAttribute(this.i, 1) : new THREE.Uint16BufferAttribute(this.i, 1));
    g.computeBoundingSphere();
    return g;
  };
  G.Lot = Lot;
  // Maillage d'un lot : Points pour les ampoules (attribut phase) et les halos (attribut taille), Mesh sinon
  G.maillage = function (k, lot, ombres) {
    const pts = k === 'ampoules' || k === 'halos', geo = lot.geometrie(k === 'ampoules' ? 'phase' : k === 'halos' ? 'taille' : null); if (!geo) return null;
    geo.boundingSphere.radius += 26; // le monde est tordu et courbé par le shader : marge pour ne pas couper à tort
    const mat = MAT[k]; if (!mat) throw new Error('matière inconnue : ' + k);
    const m = pts ? new THREE.Points(geo, mat) : new THREE.Mesh(geo, mat); m.name = k;
    if (pts) m.renderOrder = k === 'halos' ? 4 : 3;
    else if (k === 'flaque') m.renderOrder = 2;
    else if (k !== 'fenetre' && k !== 'emis' && k !== 'cadran') { m.castShadow = !!ombres && k !== 'neige'; m.receiveShadow = true; }
    return m;
  };
  // Ensemble de lots d'une parcelle (un par matière)
  G.Lots = function () { const L = {}; return { get: (k, extra) => L[k] || (L[k] = new Lot(extra)), tous: L }; };

  // ---- matrices pratiques ----
  const _q = new THREE.Quaternion(), _e = new THREE.Euler(), _p = new THREE.Vector3(), _s = new THREE.Vector3();
  G.mat = function (x, y, z, sx, sy, sz, rx, ry, rz) { _e.set(rx || 0, ry || 0, rz || 0); _q.setFromEuler(_e); _p.set(x, y, z); _s.set(sx, sy, sz); return new THREE.Matrix4().compose(_p, _q, _s); };
  G.monde = function (x, y, z, ry) { return G.mat(x, y, z, 1, 1, 1, 0, ry, 0); };

  // ---- guirlande : ampoules le long d'un segment, avec un léger creux (chaînette) ----
  G.guirlande = function (L, a, b, o) {
    const n = Math.max(2, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]) / (o.pas || 0.45)));
    const pt = G.base('pt'), cols = o.couleurs;
    for (let i = 0; i <= n; i++) {
      const t = i / n, sag = Math.sin(t * Math.PI) * (o.creux || 0.18);
      const x = lerp(a[0], b[0], t), y = lerp(a[1], b[1], t) - sag, z = lerp(a[2], b[2], t);
      const c = cols[(o.idx = (o.idx || 0) + 1) % cols.length];
      L.get('ampoules', true).add(pt, { m: G.mat(x, y, z, 1, 1, 1), c, def: o.def, w: o.w, x: o.rng ? o.rng() : Math.random() });
    }
  };

  // une ampoule isolée (point lumineux qui scintille) ; o : { def, w, rng }
  G.ampoule = function (L, x, y, z, c, o) { o = o || {}; L.get('ampoules', true).add(G.base('pt'), { m: G.mat(x, y, z, 1, 1, 1), c, def: o.def, w: o.w, x: o.rng ? o.rng() : Math.random() }); };
  // un halo (lueur douce autour d'une source : lampe, bougie…) ; taille en mètres
  G.halo = function (L, x, y, z, c, taille, o) { o = o || {}; L.get('halos', true).add(G.base('pt'), { m: G.mat(x, y, z, 1, 1, 1), c, x: taille || 2, def: o.def, w: o.w }); };
  // ---- MAISON TORDUE : voir 14b_maison.js ----
  // ---- LAMPADAIRE en fer forgé, tête qui s'enroule ----
  G.lampadaire = function (L, w, col, haut) {
    const H = haut || 3.6;
    L.get('metal').add(G.base('cyl8'), { m: G.mat(0, 0.2, 0, 0.18, 0.4, 0.18), c: [0.2, 0.2, 0.22], w });
    L.get('metal').add(G.base('cyl8'), { m: G.mat(0, H / 2, 0, 0.06, H, 0.06), c: [0.18, 0.18, 0.2], def: v => { v.x += Math.sin(v.y * 1.7) * 0.05; }, w });
    L.get('metal').add(G.base('boucle'), { m: G.mat(0.0, H - 0.2, 0, 1.1, 1.1, 1.1), c: [0.18, 0.18, 0.2], w });
    L.get('metal').add(G.base('cube'), { m: G.mat(0.42, H + 0.32, 0, 0.36, 0.06, 0.36), c: [0.18, 0.18, 0.2], w });
    L.get('metal').add(G.base('cone4'), { m: G.mat(0.42, H + 0.52, 0, 0.3, 0.32, 0.3), c: [0.18, 0.18, 0.2], w });
    L.get('emis').add(G.base('cube'), { m: G.mat(0.42, H + 0.08, 0, 0.26, 0.44, 0.26), c: col, w });
    G.halo(L, 0.42, H + 0.08, 0, [col[0] * 0.12, col[1] * 0.11, col[2] * 0.1], 3.6, { w });
    return { x: 0.42, y: H, z: 0 };
  };

  // ---- SAPIN TORDU (guirlandes optionnelles) ----
  G.sapin = function (L, w, rng, hh, pal, illum) {
    const H = hh, nC = 5 + Math.floor(rng() * 3), cr = (rng() - 0.5) * 0.6, cz = (rng() - 0.5) * 0.6;
    const def = v => { const t = clamp(v.y / H, 0, 1); v.x += cr * t * t * H * 0.25; v.z += cz * t * t * H * 0.25; };
    L.get('ecorce').add(G.base('cyl8'), { m: G.mat(0, H * 0.15, 0, H * 0.035, H * 0.3, H * 0.035), c: [0.8, 0.75, 0.7], uvm: 'monde', s: 1, def, w });
    const vert = [0.55 + rng() * 0.2, 0.75 + rng() * 0.2, 0.6 + rng() * 0.2];
    for (let i = 0; i < nC; i++) {
      const t = i / nC, r = H * 0.34 * (1 - t * 0.78), y0 = H * (0.14 + t * 0.7), hc = H * 0.3 * (1 - t * 0.4);
      L.get('aiguilles').add(G.base('etage'), { m: G.mat((rng() - 0.5) * 0.15, y0 + hc / 2, (rng() - 0.5) * 0.15, r, hc, r, (rng() - 0.5) * 0.12, rng() * 6, (rng() - 0.5) * 0.12), c: vert, uvm: 'monde', s: 0.9, def, w });
    }
    if (illum) { // guirlande en spirale autour du sapin
      const n = Math.floor(H * 9), pt = G.base('pt');
      for (let k = 0; k < n; k++) {
        const t = k / n, a = t * Math.PI * 2 * (3 + H * 0.25), y0 = H * (0.2 + t * 0.72), r = H * 0.3 * (1 - t * 0.78) + 0.05;
        L.get('ampoules', true).add(pt, { m: G.mat(Math.cos(a) * r, y0, Math.sin(a) * r, 1, 1, 1), c: pal.guirlande[k % pal.guirlande.length], def, w, x: rng() });
      }
      L.get('emis').add(G.base('ico'), { m: G.mat(0, H * 0.98, 0, 0.28, 0.36, 0.1), c: [4, 3.2, 1.2], def, w });
    }
    return { r: H * 0.12 };
  };

  // ---- ARBRE MORT aux branches en spirale ----
  G.arbreMort = function (L, w, rng, H) {
    const haut = new THREE.Vector3(0, 1, 0), dir = new THREE.Vector3(), q = new THREE.Quaternion();
    const br = (x, y, z, ang, inc, len, rad, prof) => {
      const ex = x + Math.sin(inc) * Math.cos(ang) * len, ey = y + Math.cos(inc) * len, ez = z + Math.sin(inc) * Math.sin(ang) * len;
      dir.set(ex - x, ey - y, ez - z); const l = dir.length(); dir.normalize(); q.setFromUnitVectors(haut, dir);
      const m = new THREE.Matrix4().compose(new THREE.Vector3((x + ex) / 2, (y + ey) / 2, (z + ez) / 2), q, new THREE.Vector3(rad, l * 1.04, rad));
      L.get('ecorce').add(G.base('tronc'), { m, c: [0.6, 0.58, 0.58], uvm: 'monde', s: 1.2, w });
      if (prof <= 0) return;
      const n = prof > 3 ? 2 : 2 + (rng() < 0.6 ? 1 : 0);
      for (let i = 0; i < n; i++) br(ex, ey, ez, ang + (rng() - 0.5) * 2.6 + (i ? 2.1 : 0), Math.min(1.5, inc + 0.25 + rng() * 0.45), len * (0.6 + rng() * 0.18), rad * 0.62, prof - 1);
    };
    br(0, -0.3, 0, rng() * 6, 0.1, H * 0.4, H * 0.045, 5);
  };

  // ---- CITROUILLE (lanterne : visage lumineux) ----
  G.citrouille = function (L, w, rng, s, lanterne) {
    const c = [1, 0.48 + rng() * 0.12, 0.12];
    L.get('citrouille').add(G.base('sphere'), { m: G.mat(0, s * 0.62, 0, s, s * 0.72, s), c, uvm: undefined, w });
    L.get('ecorce').add(G.base('cyl6'), { m: G.mat(0, s * 1.32, 0, s * 0.09, s * 0.3, s * 0.09, 0.2, 0, 0.3), c: [0.35, 0.45, 0.2], w });
    if (lanterne) {
      const g = [3.6, 1.7, 0.3];
      L.get('emis').add(G.base('cone4'), { m: G.mat(-s * 0.33, s * 0.8, s * 0.93, s * 0.16, s * 0.2, 0.05, Math.PI / 2 - 0.3, 0, 0), c: g, w });
      L.get('emis').add(G.base('cone4'), { m: G.mat(s * 0.33, s * 0.8, s * 0.93, s * 0.16, s * 0.2, 0.05, Math.PI / 2 - 0.3, 0, 0), c: g, w });
      L.get('emis').add(G.base('cube'), { m: G.mat(0, s * 0.45, s * 0.96, s * 0.7, s * 0.14, 0.05, -0.15, 0, 0), c: g, w });
      for (let k = -2; k <= 2; k += 2) L.get('citrouille').add(G.base('cube'), { m: G.mat(k * s * 0.12, s * 0.47, s * 0.99, s * 0.09, s * 0.1, 0.03), c, w });
    }
  };

  // ---- PIERRE TOMBALE (arrondie, croix ou obélisque), un peu de travers ----
  G.tombe = function (L, w, rng) {
    const t = rng(), g = 0.4 + rng() * 0.25, c = [g, g, g * 1.04];
    if (t < 0.55) {
      const h = 0.8 + rng() * 0.6, l = 0.55 + rng() * 0.3;
      L.get('pierre').add(G.base('cube'), { m: G.mat(0, h / 2 - 0.2, 0, l, h, 0.16), c, uvm: 'monde', s: 1, w });
      L.get('pierre').add(G.base('cyl12'), { m: G.mat(0, h - 0.2, 0, l / 2, 0.16, l / 2, Math.PI / 2, 0, 0), c, w });
    } else if (t < 0.85) {
      L.get('pierre').add(G.base('cube'), { m: G.mat(0, 0.6, 0, 0.14, 1.4, 0.14), c, w });
      L.get('pierre').add(G.base('cube'), { m: G.mat(0, 0.95, 0, 0.7, 0.14, 0.14), c, w });
    } else {
      L.get('pierre').add(G.base('cube'), { m: G.mat(0, 0.15, 0, 0.6, 0.3, 0.6), c, w });
      L.get('pierre').add(G.base('cone4'), { m: G.mat(0, 1.1, 0, 0.25, 1.8, 0.25), c, w });
    }
  };

  // ---- BRASERO (baril de fer, braises, flammes animées ailleurs) ----
  G.brasero = function (L, w) {
    L.get('metal').add(G.base('cyl12'), { m: G.mat(0, 0.45, 0, 0.38, 0.9, 0.38), c: [0.3, 0.2, 0.15], w });
    L.get('emis').add(G.base('cyl12'), { m: G.mat(0, 0.88, 0, 0.33, 0.06, 0.33), c: [4, 1.3, 0.25], w });
  };

  // ---- CLÔTURE de fer (le long d'un segment) ----
  G.cloture = function (L, a, b, w) {
    const l = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(2, Math.floor(l / 0.32)), ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
    L.get('metal').add(G.base('cube'), { m: G.mat((a[0] + b[0]) / 2, 0.9, (a[1] + b[1]) / 2, l, 0.05, 0.05, 0, -ang, 0), c: [0.15, 0.15, 0.17], w });
    L.get('metal').add(G.base('cube'), { m: G.mat((a[0] + b[0]) / 2, 0.3, (a[1] + b[1]) / 2, l, 0.05, 0.05, 0, -ang, 0), c: [0.15, 0.15, 0.17], w });
    for (let i = 0; i <= n; i++) { const t = i / n, x = lerp(a[0], b[0], t), z = lerp(a[1], b[1], t); L.get('metal').add(G.base('cone4'), { m: G.mat(x, 0.6, z, 0.03, 1.25, 0.03), c: [0.15, 0.15, 0.17], w }); }
  };
  G.banc = function (L, w) {
    for (let i = 0; i < 3; i++) L.get('bois').add(G.base('cube'), { m: G.mat(0, 0.48, -0.15 + i * 0.16, 1.6, 0.05, 0.12), c: [0.55, 0.42, 0.32], uvm: 'monde', w });
    L.get('bois').add(G.base('cube'), { m: G.mat(0, 0.8, -0.26, 1.6, 0.35, 0.05), c: [0.55, 0.42, 0.32], uvm: 'monde', w });
    for (const sx of [-0.7, 0.7]) L.get('metal').add(G.base('cube'), { m: G.mat(sx, 0.4, -0.05, 0.06, 0.8, 0.5), c: [0.15, 0.15, 0.17], w });
  };
  G.cadeauDeco = function (L, w, rng, s) {
    const c = rng.p([[0.7, 0.1, 0.12], [0.12, 0.45, 0.2], [0.25, 0.25, 0.7], [0.55, 0.2, 0.6], [0.85, 0.85, 0.85]]);
    L.get('cadeau').add(G.base('cube'), { m: G.mat(0, s / 2, 0, s, s * (0.7 + rng() * 0.6), s, 0, rng() * 3, 0), c, w });
  };
  return G;
})();
