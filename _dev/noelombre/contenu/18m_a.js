/* ===================== LIEUX — LOT A =====================
   Merveilles : cathedrale, baleine, theatre_ombres, moulin, pont_gele, arbre_lanternes.
   Blocs : marche, parc, ruines, lanternes_sol.
   Même contrat que 18_reperes.js / 18a_blocs.js (voir briefs/contenu.txt). */
(() => {
  const C = MONDE.C, M = C / 2, G = GEO;
  const maill = REPERES_OUTILS.maill;
  const PI = Math.PI, NOIR = [0.012, 0.013, 0.02], GLACE = [0.6, 0.76, 0.92];

  // ---------- outils communs ----------
  const cache = {};
  // géométrie Three.js calculée UNE fois (index et uv garantis)
  const geo = (k, f) => {
    let g = cache[k];
    if (!g) {
      g = f();
      if (!g.index) { const n = g.attributes.position.count, ix = new Uint32Array(n); for (let i = 0; i < n; i++) ix[i] = i; g.setIndex(new THREE.BufferAttribute(ix, 1)); }
      if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
      cache[k] = g;
    }
    return g;
  };
  const brut = (P, N, U, I) => ({ attributes: { position: { array: P }, normal: { array: N }, uv: { array: U } }, index: { array: I } });
  // quadrilatère a, b, c, d (sens inverse des aiguilles d'une montre vu du côté visible)
  function quad(a, b, c, d) {
    const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = d[0] - a[0], vy = d[1] - a[1], vz = d[2] - a[2];
    let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx; const l = Math.hypot(nx, ny, nz) || 1; nx /= l; ny /= l; nz /= l;
    return brut([a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2], d[0], d[1], d[2]], [nx, ny, nz, nx, ny, nz, nx, ny, nz, nx, ny, nz], [0, 0, 1, 0, 1, 1, 0, 1], [0, 1, 2, 0, 2, 3]);
  }
  // tuyau qui suit une ligne de points [x, y, z] ; rf(t 0..1, i) = rayon ; nc côtés ; sans bouchons
  function tuyau(pts, rf, nc) {
    const n = pts.length, P = [], N = [], U = [], I = [];
    let nx = 0, ny = 0, nz = 0, init = false;
    for (let i = 0; i < n; i++) {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)], p = pts[i];
      let tx = b[0] - a[0], ty = b[1] - a[1], tz = b[2] - a[2]; const tl = Math.hypot(tx, ty, tz) || 1; tx /= tl; ty /= tl; tz /= tl;
      if (!init) { init = true; if (Math.abs(ty) < 0.9) { nx = 0; ny = 1; nz = 0; } else { nx = 1; ny = 0; nz = 0; } }
      const d = nx * tx + ny * ty + nz * tz; nx -= tx * d; ny -= ty * d; nz -= tz * d; const nl = Math.hypot(nx, ny, nz) || 1; nx /= nl; ny /= nl; nz /= nl;
      const bx = ty * nz - tz * ny, by = tz * nx - tx * nz, bz = tx * ny - ty * nx, r = rf(i / (n - 1), i);
      for (let j = 0; j <= nc; j++) { const an = j / nc * PI * 2, c = Math.cos(an), s = Math.sin(an), ux = c * nx + s * bx, uy = c * ny + s * by, uz = c * nz + s * bz; P.push(p[0] + ux * r, p[1] + uy * r, p[2] + uz * r); N.push(ux, uy, uz); U.push(j / nc, i / (n - 1)); }
    }
    const w = nc + 1;
    for (let i = 0; i < n - 1; i++) for (let j = 0; j < nc; j++) { const a = i * w + j, b = a + 1, c = a + w, d = c + 1; I.push(a, b, c, b, d, c); }
    return brut(P, N, U, I);
  }
  // courbe lissée (Catmull-Rom) passant par des points [x, y, z] -> n + 1 points
  function lisse(pts, n) {
    const cv = new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(p[0], p[1], p[2]))), out = [], v = new THREE.Vector3();
    for (let i = 0; i <= n; i++) { cv.getPoint(i / n, v); out.push([v.x, v.y, v.z]); }
    return out;
  }
  // fenêtre en ogive (trou dans une forme)
  const ogive = (x, y, w, h, hp) => { const p = new THREE.Path(); p.moveTo(x - w / 2, y); p.lineTo(x + w / 2, y); p.lineTo(x + w / 2, y + h); p.quadraticCurveTo(x + w / 2, y + h + hp * 0.72, x, y + h + hp); p.quadraticCurveTo(x - w / 2, y + h + hp * 0.72, x - w / 2, y + h); p.lineTo(x - w / 2, y); return p; };
  const extr = (s, ep, seg) => new THREE.ExtrudeGeometry(s, { depth: ep, bevelEnabled: false, curveSegments: seg || 5 });
  // glaçon pendu (pointe en bas) depuis (x, y, z) ; faces tournées vers l'extérieur
  const glacon = (L, x, y, z, r, l, o) => L.get('verni').add(G.base('glacon'), { m: G.mat(x, y - l / 2, z, r, -l, -r), c: GLACE, def: o && o.def, w: o && o.w });
  // pic de glace dressé (pointe en haut)
  const pic = (L, x, y, z, r, h, o) => L.get('verni').add(G.base('glacon'), { m: G.mat(x, y + h / 2, z, r, h, r, o && o.rx || 0, 0, o && o.rz || 0), c: o && o.c || GLACE, def: o && o.def, w: o && o.w });
  // change la couleur d'une plage de sommets d'un maillage (lumières qui s'allument) : aucun objet créé
  const teinte = (att, i0, n, r, g, b) => { const a = att.array; for (let i = i0 * 3, e = (i0 + n) * 3; i < e; i += 3) { a[i] = r; a[i + 1] = g; a[i + 2] = b; } att.needsUpdate = true; };
  const enfant = (gr, nom) => { for (const m of gr.children) if (m.name === nom) return m; return null; };

  // ======================================================================================================
  // 1. LA CATHÉDRALE DE GLAÇONS — repère local : origine au pied du portail (22, sol, 14), +z vers le sud
  // ======================================================================================================
  const CATH_PICS = [[3.7, 1.3, 3.0], [-3.9, 1.6, 2.2], [9.8, 0.6, 4.6], [-9.6, 1.2, 3.4], [10.3, -5.5, 2.4], [-10.2, -6.4, 3.8], [9.6, -13.5, 3.2], [-9.4, -17.6, 4.4], [4.5, -19, 2.6], [-2.5, -19.4, 3.6]];
  const CATH_BUT = [-8.15, -11.65, -15.3];
  const cathedrale = {
    nom: 'La Cathédrale de Glaçons',
    desc: 'Personne ne l’a bâtie : elle a gelé là, d’un seul coup, une nuit de grand froid. L’orgue y joue tout seul pour les stalactites.',
    maisons: [0, 0.5, 0.3, 0.3], boucle: 'orgue', humeur: 'ombres',
    relief(lx, lz, t, tc) { const r = Math.hypot(lx - M, lz - M); return r >= 18.5 ? t : lerp(tc, t, sstep(12.5, 18.5, r)); },
    plan(P) {
      const y = P.sol(M, M), X = lx => M - lx, Z = lz => 14 - lz;
      P.boite(X(3), 14.45, 1.5, 0.45); P.boite(X(-3), 14.45, 1.5, 0.45);                 // façade, de part et d'autre du portail
      P.boite(X(6.3), Z(-1.7), 2.25, 2.25); P.boite(X(-6.3), Z(-1.7), 2.25, 2.25);       // tours
      P.boite(X(4.15), Z(-8), 0.38, 8); P.boite(X(-4.15), Z(-8), 0.38, 8);               // murs de la nef
      P.boite(M, Z(-16.45), 4.5, 0.48);                                                   // chevet
      P.boite(M, Z(-15), 2.5, 0.75);                                                      // orgue
      for (const sx of [-1, 1]) for (const z of [-4.3, -8.3, -12.3]) P.cyl(X(sx * 2.5), Z(z), 0.42);
      for (const sx of [-1, 1]) for (const z of CATH_BUT) P.boite(X(sx * 7.3), Z(z), 0.5, 0.65);
      for (const [x, z, h] of CATH_PICS) if (h > 2.5) P.cyl(X(x), Z(z), 0.4);
      P.lum(M, y + 4.6, 24, [1, 0.72, 0.42], 1.8, 15);       // la nef, chaude
      P.lum(M, y + 2.4, 12.4, [1, 0.74, 0.44], 1.3, 9);      // le portail
      P.lum(M, y + 9.5, 10.8, [0.62, 0.5, 1], 1.1, 15);      // la rosace éclaire la façade
      P.flaque(M, 11.6, 4.6, [0.5, 0.33, 0.14]); P.flaque(M, 8.5, 6, [0.1, 0.08, 0.2]);
      for (const sx of [-1, 1]) for (const z of [-6.4, -9.9, -13.4]) P.flaque(X(sx * 6.4), Z(z), 2.6, [0.07, 0.12, 0.24]);
    },
    construire(L, P, rng, groupe) {
      const y0 = P.sol(M, M), w = G.monde(M, y0, 14, PI);
      const glace = L.get('glace'), verni = L.get('verni'), emis = L.get('emis');
      // toute l'église penche et se vrille un peu avec la hauteur
      const tord = v => { const k = v.y / 28, a = k * k * 0.42, x = v.x, z = v.z + 8, c = Math.cos(a), s = Math.sin(a); v.x = x * c - z * s + k * k * 1.3; v.z = x * s + z * c - 8; };
      const o = { def: tord, w };
      // --- murs percés (formes extrudées) ---
      const gFac = geo('cath_fac', () => {
        const s = new THREE.Shape(); s.moveTo(-4.5, -1.5); s.lineTo(-1.5, -1.5); s.lineTo(-1.5, 3.2); s.quadraticCurveTo(-1.5, 4.9, 0, 5.6); s.quadraticCurveTo(1.5, 4.9, 1.5, 3.2); s.lineTo(1.5, -1.5); s.lineTo(4.5, -1.5); s.lineTo(4.5, 10); s.lineTo(0, 16.6); s.lineTo(-4.5, 10); s.lineTo(-4.5, -1.5);
        const h = new THREE.Path(); h.absarc(0, 10, 2.2, 0, PI * 2, false); s.holes.push(h); return extr(s, 0.9, 7);
      });
      glace.add(gFac, { m: G.mat(0, 0, -0.9, 1, 1, 1), uvm: 'monde', s: 0.2, def: tord, w });
      const gMur = geo('cath_mur', () => { const s = new THREE.Shape(); s.moveTo(0, -1.5); s.lineTo(16, -1.5); s.lineTo(16, 9.5); s.lineTo(0, 9.5); s.lineTo(0, -1.5); for (const x of [6.4, 9.9, 13.4]) s.holes.push(ogive(x, 2.6, 1.6, 3.6, 1.6)); return extr(s, 0.7, 4); });
      for (const x of [-4.5, 3.8]) glace.add(gMur, { m: G.mat(x, 0, 0, 1, 1, 1, 0, PI / 2, 0), uvm: 'monde', s: 0.2, def: tord, w });
      const gChe = geo('cath_che', () => { const s = new THREE.Shape(); s.moveTo(-4.5, -1.5); s.lineTo(4.5, -1.5); s.lineTo(4.5, 9.5); s.lineTo(0, 15.6); s.lineTo(-4.5, 9.5); s.lineTo(-4.5, -1.5); s.holes.push(ogive(0, 3.4, 2, 5.4, 2.2)); return extr(s, 0.9, 5); });
      glace.add(gChe, { m: G.mat(0, 0, -16.9, 1, 1, 1), uvm: 'monde', s: 0.2, def: tord, w });
      // --- toit enneigé, voûte intérieure, dallage de glace ---
      L.get('tuiles').add(G.base('pignon'), { m: G.mat(0, 9.5, -8.8, 9.9, 6.2, 16.7), c: [0.5, 0.6, 0.75], uvm: 'monde', s: 0.5, def: tord, w });
      const cV = [0.12, 0.17, 0.32];
      L.get('unie').add(quad([-4.1, 9.5, -0.9], [-4.1, 9.5, -16], [0, 14.7, -16], [0, 14.7, -0.9]), { c: cV, def: tord, w });
      L.get('unie').add(quad([4.1, 9.5, -16], [4.1, 9.5, -0.9], [0, 14.7, -0.9], [0, 14.7, -16]), { c: cV, def: tord, w });
      glace.add(G.base('cube'), { m: G.mat(0, 0.02, -8.45, 7.7, 0.1, 15.2), uvm: 'monde', s: 0.12, w });
      L.get('pierre').add(G.base('cube'), { m: G.mat(0, -0.02, 0.9, 5, 0.12, 2.4), c: [0.42, 0.46, 0.56], uvm: 'monde', s: 0.5, w });
      for (let i = 0; i < 12; i++) G.ampoule(L, rng.r(-3, 3), rng.r(10.4, 13.2), rng.r(-15, -2), [1.6, 2.3, 3], { rng, w });
      // --- vitraux des bas-côtés (visibles des deux côtés) et du chevet ---
      const VIT = [[0.25, 0.7, 2.0], [0.95, 0.42, 2.0], [0.3, 1.5, 1.8], [1.9, 0.5, 1.1], [2.3, 1.4, 0.45]];
      for (const sx of [-1, 1]) for (const z of [-6.4, -9.9, -13.4]) {
        const x = sx * 4.15, ys = [2.6, 4.4, 6.1, 7.85];
        for (let k = 0; k < 3; k++) {
          const c = k === 2 && rng() < 0.5 ? VIT[4] : VIT[rng.i(0, 3)], yc = (ys[k] + ys[k + 1]) / 2, h = ys[k + 1] - ys[k];
          emis.add(G.base('plan'), { m: G.mat(x + sx * 0.02, yc, z, 1.62, h, 1, 0, sx * PI / 2, 0), c, def: tord, w });
          emis.add(G.base('plan'), { m: G.mat(x - sx * 0.02, yc, z, 1.62, h, 1, 0, -sx * PI / 2, 0), c: [c[0] * 0.8, c[1] * 0.8, c[2] * 0.8], def: tord, w });
          if (k) emis.add(G.base('cube'), { m: G.mat(x, ys[k], z, 0.5, 0.07, 1.62), c: NOIR, def: tord, w });
        }
        emis.add(G.base('cube'), { m: G.mat(x, 5.2, z, 0.5, 5.3, 0.07), c: NOIR, def: tord, w });
        G.halo(L, x + sx * 0.6, 5.2, z, [0.07, 0.13, 0.3], 5, o);
      }
      for (let k = 0; k < 3; k++) {
        const ys = [3.4, 5.6, 8.2, 11.1], c = [[2.6, 1.5, 0.5], [2.9, 1.9, 0.7], [2.4, 0.9, 0.35]][k], yc = (ys[k] + ys[k + 1]) / 2, h = ys[k + 1] - ys[k];
        emis.add(G.base('plan'), { m: G.mat(0, yc, -16.4, 2.02, h, 1), c, def: tord, w });
        emis.add(G.base('plan'), { m: G.mat(0, yc, -16.5, 2.02, h, 1, 0, PI, 0), c, def: tord, w });
        if (k) emis.add(G.base('cube'), { m: G.mat(0, ys[k], -16.45, 2.02, 0.08, 0.6), c: NOIR, def: tord, w });
      }
      emis.add(G.base('cube'), { m: G.mat(0, 7.2, -16.45, 0.08, 7.8, 0.6), c: NOIR, def: tord, w });
      G.halo(L, 0, 7, -17.6, [0.3, 0.18, 0.06], 7, o);
      // --- intérieur : colonnes en sablier, orgue, cierges ---
      const gCol = geo('cath_col', () => new THREE.CylinderGeometry(1, 1, 1, 8, 8, true));
      for (const sx of [-1, 1]) for (const z of [-4.3, -8.3, -12.3]) {
        const x = sx * 2.5;
        verni.add(gCol, { m: G.mat(x, 4.75, z, 0.5, 9.6, 0.5), c: GLACE, def: v => { const k = Math.abs(v.y / 9.5 * 2 - 1), f = 0.42 + 0.58 * k * k; v.x = x + (v.x - x) * f; v.z = z + (v.z - z) * f; tord(v); }, w });
        pic(L, sx * 3.45, 0, z + 2, 0.16, 1.3, o);
        L.get('unie').add(G.base('cyl6'), { m: G.mat(sx * 3.45, 1.42, z + 2, 0.035, 0.3, 0.035), c: [0.9, 0.88, 0.8], w });
        emis.add(G.base('ico'), { m: G.mat(sx * 3.45, 1.66, z + 2, 0.04, 0.1, 0.04), c: [4, 2.6, 0.9], w });
        G.halo(L, sx * 3.45, 1.66, z + 2, [0.3, 0.19, 0.07], 1.7, { w });
      }
      L.get('bois').add(G.base('cube'), { m: G.mat(0, 0.75, -15, 4.8, 1.6, 1.3), c: [0.22, 0.2, 0.26], uvm: 'monde', w });
      L.get('verni').add(G.base('cube'), { m: G.mat(0, 1.25, -14.2, 1.7, 0.12, 0.5, 0.25, 0, 0), c: [0.85, 0.85, 0.8], w });
      for (let i = 0; i < 13; i++) { const h = 2.4 + 3.6 * Math.pow(Math.abs(i - 6) / 6, 1.3) + (i % 2) * 0.35; verni.add(G.base('cyl6'), { m: G.mat((i - 6) * 0.37, 1.5 + h / 2, -15.2 + (i % 2) * 0.22, 0.15, h, 0.15), c: [0.7, 0.78, 0.92], def: tord, w }); }
      // --- tours : fût effilé, baies froides, corniche, pinacles, grande flèche torse ---
      const gFl = geo('cath_fleche', () => { const g = new THREE.CylinderGeometry(0, 1, 1, 10, 11), p = g.attributes.position; for (let i = 0; i < p.count; i++) { const x = p.getX(i), z = p.getZ(i), a = Math.atan2(z, x), f = 0.8 + 0.2 * Math.cos(a * 5); p.setX(i, x * f); p.setZ(i, z * f); } g.computeVertexNormals(); return g; });
      const fleche = (x, z, yb, h, r, A, ph, tw) => verni.add(gFl, { m: G.mat(x, yb + h / 2, z, r, h, r), c: GLACE, def: v => { const k = clamp((v.y - yb) / h, 0, 1), a = k * tw, dx = v.x - x, dz = v.z - z, c = Math.cos(a), s = Math.sin(a); v.x = x + dx * c - dz * s + A * k * k * Math.cos(ph + k * 2.4); v.z = z + dx * s + dz * c + A * k * k * Math.sin(ph + k * 2.4); tord(v); }, w });
      for (const sx of [-1, 1]) {
        const tx = sx * 6.3, tz = -1.7, H = sx > 0 ? 14.6 : 12.4;
        const defT = v => { const k = clamp(v.y / H, 0, 1), f = 1 - 0.17 * k; v.x = tx + (v.x - tx) * f; v.z = tz + (v.z - tz) * f; tord(v); }, oT = { def: defT, w };
        glace.add(G.base('boite'), { m: G.mat(tx, (H - 1.5) / 2, tz, 4.4, H + 1.5, 4.4), uvm: 'monde', s: 0.2, def: defT, w });
        L.get('pierre').add(G.base('cube'), { m: G.mat(tx, H + 0.05, tz, 4.9, 0.45, 4.9), c: [0.5, 0.58, 0.72], uvm: 'monde', def: defT, w });
        L.get('pierre').add(G.base('cube'), { m: G.mat(tx, H * 0.52, tz, 4.75, 0.3, 4.75), c: [0.5, 0.58, 0.72], uvm: 'monde', def: defT, w });
        for (let f = 0; f < 4; f++) { // quatre faces : deux baies étroites éclairées de bleu, glaçons sous les corniches
          const a = f * PI / 2, ca = Math.cos(a), sa = Math.sin(a);
          for (const d of [-0.75, 0.75]) {
            emis.add(G.base('plan'), { m: G.mat(tx + sa * 2.23 + ca * d, H - 2.6, tz + ca * 2.23 - sa * d, 0.62, 3.3, 1, 0, a, 0), c: [0.42, 1.15, 2.1], def: defT, w });
            emis.add(G.base('plan'), { m: G.mat(tx + sa * 2.23 + ca * d, H * 0.52 - 2.3, tz + ca * 2.23 - sa * d, 0.5, 2.2, 1, 0, a, 0), c: [0.1, 0.3, 0.62], def: defT, w });
          }
          for (let i = 0; i < 5; i++) { const d = rng.r(-2.1, 2.1); glacon(L, tx + sa * 2.5 + ca * d, H - 0.15, tz + ca * 2.5 - sa * d, rng.r(0.1, 0.2), rng.r(0.6, 2.4), oT); if (i < 3) glacon(L, tx + sa * 2.42 + ca * d, H * 0.52 - 0.12, tz + ca * 2.42 - sa * d, 0.11, rng.r(0.4, 1.3), oT); }
          pic(L, tx + (ca - sa) * 2.05, H + 0.2, tz + (-sa - ca) * 2.05, 0.42, rng.r(2.6, 4.6), oT);
        }
        G.halo(L, tx, H - 2.6, tz + 2.6, [0.05, 0.13, 0.26], 6, oT);
        fleche(tx, tz, H + 0.2, sx > 0 ? 13.2 : 10.2, 1.85, sx > 0 ? 2.1 : 1.5, sx > 0 ? 2.6 : 0.4, sx * 2.3);
      }
      fleche(0, -8.8, 15.3, 7.6, 0.75, 0.9, 1.2, 2.6);
      // --- portail : gâble, colonnettes, glaçons de l'arc ---
      for (const sx of [-1, 1]) {
        verni.add(G.base('cube'), { m: G.mat(sx * 1.2, 5.05, 0.28, 4.3, 0.34, 0.5, 0, 0, -sx * 0.99), c: GLACE, w });
        for (const [dx, dz] of [[1.78, 0.16], [2.15, 0.34]]) verni.add(G.base('cyl8'), { m: G.mat(sx * dx, 1.6, dz, 0.15, 3.3, 0.15), c: GLACE, w });
        pic(L, sx * 2.5, 3.1, 0.3, 0.3, 1.5, { w });
      }
      pic(L, 0, 6.7, 0.3, 0.26, 1.2, { w });
      for (const x of [-1, -0.45, 0.2, 0.8]) glacon(L, x, 5.5 - 1.6 * Math.pow(Math.abs(x) / 1.5, 1.7), -0.3, 0.09, rng.r(0.35, 0.8), { w });
      for (let i = 0; i < 9; i++) glacon(L, -2 + i * 0.5 + rng.r(-0.1, 0.1), 7.55, 0.12, rng.r(0.08, 0.14), rng.r(0.4, 1.3), o);
      L.get('pierre').add(G.base('cube'), { m: G.mat(0, 7.6, 0.1, 5.6, 0.22, 0.5), c: [0.5, 0.58, 0.72], def: tord, w });
      for (const sx of [-1, 1]) for (let i = 1; i < 8; i++) { const k = i / 8; glacon(L, sx * 4.6 * (1 - k), 10 + 6.5 * k, 0.1, rng.r(0.09, 0.16), rng.r(0.5, 1.9), o); }
      // --- arcs-boutants, pinacles, glaçons géants des gouttières ---
      for (const sx of [-1, 1]) {
        for (const z of CATH_BUT) {
          glace.add(G.base('boite'), { m: G.mat(sx * 7.3, 2.6, z, 0.95, 8.2, 1.25), uvm: 'monde', s: 0.2, def: tord, w });
          pic(L, sx * 7.3, 6.6, z, 0.55, 3.4, o);
          verni.add(G.base('cube'), { m: G.mat(sx * 5.7, 7.5, z, 3.6, 0.45, 0.6, 0, 0, -sx * 0.8), c: GLACE, def: tord, w });
          for (const k of [0.25, 0.5, 0.75]) glacon(L, sx * lerp(6.9, 4.6, k), lerp(6.2, 8.6, k), z, 0.13, rng.r(0.7, 2), o);
        }
        for (let z = -4.6; z > -16.6; z -= rng.r(0.55, 1.1)) glacon(L, sx * 4.95, 9.55, z, rng.r(0.1, 0.24), rng() < 0.2 ? rng.r(2.4, 4) : rng.r(0.5, 1.9), o);
      }
      // --- pics de glace et congères au pied ---
      for (const [x, z, h] of CATH_PICS) { pic(L, x, -0.4, z, h * 0.16, h + 0.4, { w, rx: rng.r(-0.12, 0.12), rz: rng.r(-0.12, 0.12) }); pic(L, x + rng.r(-0.7, 0.7), -0.3, z + rng.r(-0.7, 0.7), h * 0.09, h * 0.5, { w, rx: rng.r(-0.3, 0.3), rz: rng.r(-0.3, 0.3) }); }
      for (const [x, z, sx, sz] of [[8.6, 1, 2.4, 1.3], [-8.4, 1.2, 2, 1.2], [5.2, -6, 1.4, 2.2], [-5.3, -10, 1.3, 2.6], [5.4, -13.5, 1.5, 2], [0, -17.6, 3.4, 1.3], [-8.8, -3.8, 1.6, 1.4], [8.9, -4, 1.5, 1.6]]) L.get('neige').add(G.base('bosse'), { m: G.mat(x, -0.05, z, sx, 0.55, sz), c: [1, 1, 1], uvm: 'monde', w });
      // --- la grande rosace : remplage fixe, verres qui tournent lentement et flamboient à l'éclat ---
      for (const [r, ep] of [[2.2, 2.6], [1.08, 2]]) emis.add(G.base('toreFin'), { m: G.mat(0, 10, -0.28, r, r, ep), c: NOIR, def: tord, w });
      for (let i = 0; i < 12; i++) { const a = i / 12 * PI * 2; emis.add(G.base('cube'), { m: G.mat(Math.cos(a) * 1.32, 10 + Math.sin(a) * 1.32, -0.28, 0.07, 1.78, 0.1, 0, 0, a - PI / 2), c: NOIR, def: tord, w }); }
      G.halo(L, 0, 10, 0.4, [0.2, 0.15, 0.4], 9, o);
      const L2 = G.Lots(), e2 = L2.get('emis'), ROSE = [[1.25, 0.45, 2.3], [0.35, 1.4, 2.5], [2.2, 0.5, 1.3], [0.5, 0.6, 2.6]];
      const secteur = (a0, da, r0, r1, c, z, dos) => e2.add(G.base('plan'), { c, def: v => { const a = dos ? a0 + (v.x + 0.5) * da : a0 + da - (v.x + 0.5) * da, r = r0 + (v.y + 0.5) * (r1 - r0); v.set(Math.cos(a) * r, Math.sin(a) * r, z); } });
      for (let i = 0; i < 12; i++) {
        const a = i / 12 * PI * 2, c = ROSE[i % 4], c2 = i % 2 ? [3, 1.8, 0.6] : [2.6, 0.9, 0.5];
        for (const dos of [0, 1]) { secteur(a, PI / 6, 1.08, 2.2, c, dos ? -0.02 : 0.02, dos); secteur(a, PI / 6, 0.42, 1.08, c2, dos ? -0.02 : 0.02, dos); }
      }
      e2.add(G.base('cyl8'), { m: G.mat(0, 0, 0, 0.45, 0.06, 0.45, PI / 2, 0, 0), c: [3.2, 2.7, 1.5] });
      G.halo(L2, 0, 0, 0.5, [0.16, 0.11, 0.3], 11);
      const rose = maill(L2), pr = new THREE.Vector3(0, 10, -0.45); tord(pr); pr.applyMatrix4(w); rose.position.copy(pr); rose.rotation.y = PI;
      const verre = enfant(rose, 'emis'), lueur = enfant(rose, 'halos').geometry.attributes.color;
      const matR = MAT.patch(new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false }), { cle: 'a_rosace' }); verre.material = matR; verre.userData.matPropre = true;
      let ang = 0, tp = -1, kp = -1, tSon = -99;
      return [(t, dt, ctx) => {
        const e = ctx.eclat, pas = tp < 0 ? 0 : Math.min(0.1, t - tp); tp = t;
        ang += pas * (0.05 + e * 1.6); rose.rotation.z = ang;
        const k = 1 + 0.1 * Math.sin(t * 0.9) + 2.8 * e * e;
        if (Math.abs(k - kp) > 0.01) { kp = k; matR.color.setScalar(k); const h = (k - 0.9) * 0.6; lueur.setXYZ(0, 0.16 * h * 3, 0.11 * h * 3, 0.3 * h * 3); lueur.needsUpdate = true; }
        if (e > 0.9 && t - tSon > 25) { tSon = t; ctx.son('cloche'); }
      }];
    },
  };

  Object.assign(REPERES, { cathedrale });
})();
