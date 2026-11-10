/* ===================== LOT D : 6 merveilles (fabrique, grande_porte, etoile_tombee, chapiteau, village_mini,
   boule_neige) et 3 blocs (entrepot, jardin_clos, tourelles) =====================
   Même forme que 18_reperes.js / 18a_blocs.js. Tout est local à cette fonction (aucune déclaration globale). */
(() => {
  const C = MONDE.C, M = C / 2, G = GEO;
  const maill = REPERES_OUTILS.maill;
  const TAU = Math.PI * 2, NOIR = [0.14, 0.14, 0.16];
  const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
  const DBG = true; // mise au point : compte les triangles ajoutés par construire()
  const nTri = L => { let n = 0; for (const k in L.tous) n += L.tous[k].i.length; return Math.round(n / 3); };
  const bilan = (id, L, n0, extra) => { if (DBG) console.error('[dbg] ' + id + ' : ' + (nTri(L) - n0 + (extra || 0)) + ' triangles propres'); };
  // géométries sur mesure, fabriquées une seule fois
  const geos = {};
  const idx = g => { if (!g.index) { const n = g.attributes.position.count, ix = new Uint32Array(n); for (let i = 0; i < n; i++) ix[i] = i; g.setIndex(new THREE.BufferAttribute(ix, 1)); } return g; };
  const geo = (k, f) => geos[k] || (geos[k] = idx(f()));
  // relief : aplatit le terrain au niveau du centre jusqu'à r0, puis rejoint le relief naturel à r1 (r1 <= 19)
  const plat = (lx, lz, t, tc, r0, r1) => { const r = Math.hypot(lx - M, lz - M); return r >= r1 ? t : lerp(tc, t, sstep(r0, r1, r)); };
  // pièce (axe y) tendue entre deux points
  const _a = new THREE.Vector3(), _q = new THREE.Quaternion(), _up = new THREE.Vector3(0, 1, 0);
  function barre(ax, ay, az, bx, by, bz, sx, sz) {
    _a.set(bx - ax, by - ay, bz - az); const l = _a.length(); _q.setFromUnitVectors(_up, _a.normalize());
    return new THREE.Matrix4().compose(V3((ax + bx) / 2, (ay + by) / 2, (az + bz) / 2), _q, V3(sx, l, sz == null ? sx : sz));
  }
  // tuyau le long d'une courbe lisse. rep = nombre de répétitions de la texture sur la longueur (les anneaux sont
  // dédoublés pour que u reste dans 0..1 : les textures « bonbon » ne se répètent pas). ray : nombre ou fonction(t).
  function tuyau(pts, seg, ray, nr, rep, ferme) {
    const cv = new THREE.CatmullRomCurve3(pts, !!ferme), fr = cv.computeFrenetFrames(seg, !!ferme), cs = [];
    for (let i = 0; i <= seg; i++) cs.push(cv.getPointAt(i / seg));
    const pos = [], nor = [], uv = [], ix = [], par = Math.max(1, Math.round(seg / (rep || 1)));
    const anneau = (i, u) => {
      const c = cs[i], N = fr.normals[i], B = fr.binormals[i], r = typeof ray === 'function' ? ray(i / seg) : ray;
      for (let j = 0; j <= nr; j++) { const a = j / nr * TAU, ca = Math.cos(a), sa = Math.sin(a), nx = ca * N.x + sa * B.x, ny = ca * N.y + sa * B.y, nz = ca * N.z + sa * B.z; pos.push(c.x + nx * r, c.y + ny * r, c.z + nz * r); nor.push(nx, ny, nz); uv.push(u, j / nr); }
    };
    for (let i = 0; i < seg; i++) {
      const u0 = (i % par) / par, b = i * 2 * (nr + 1);
      anneau(i, u0); anneau(i + 1, u0 + 1 / par);
      for (let j = 0; j < nr; j++) { const p = b + j, q = b + nr + 1 + j; ix.push(p, p + 1, q, p + 1, q + 1, q); }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.setIndex(ix);
    g.userData.cs = cs; g.userData.tg = fr.tangents;
    return g;
  }
  // collier (bague) autour d'un tuyau fabriqué par tuyau(), à l'anneau i
  function collier(L, cle, g, i, r, ep, c, def) {
    _q.setFromUnitVectors(_up, g.userData.tg[i]);
    L.get(cle).add(G.base('cyl8'), { m: new THREE.Matrix4().compose(g.userData.cs[i].clone(), _q, V3(r, ep, r)), c, def });
  }
  // petite lanterne suspendue (chapeau de fer, verre lumineux, halo)
  function lanterne(L, x, y, z, col, s, o) {
    s = s || 1; o = o || {};
    L.get('metal').add(G.base('cone4'), { m: G.mat(x, y + 0.2 * s, z, 0.2 * s, 0.16 * s, 0.2 * s), c: NOIR, def: o.def, w: o.w });
    L.get('metal').add(G.base('cube'), { m: G.mat(x, y - 0.2 * s, z, 0.22 * s, 0.04 * s, 0.22 * s), c: NOIR, def: o.def, w: o.w });
    L.get('emis').add(G.base('cube'), { m: G.mat(x, y, z, 0.17 * s, 0.34 * s, 0.17 * s), c: col, def: o.def, w: o.w });
    G.halo(L, x, y, z, [col[0] * 0.11, col[1] * 0.1, col[2] * 0.09], (o.halo || 2.6) * s, { def: o.def, w: o.w });
  }
  // fumée des cheminées (matière de particules du jeu, si elle est disponible)
  function fumee(groupe, pts, n) {
    if (typeof PARCELLE === 'undefined' || !PARCELLE.matFumee || !pts.length) return;
    const pos = [], gr = [];
    for (let k = 0; k < pts.length; k++) for (let i = 0; i < n; i++) { pos.push(pts[k].x + Math.sin(i * 7.1 + k) * 0.15, pts[k].y, pts[k].z + Math.cos(i * 5.3 + k) * 0.15); gr.push(i / n + ((i * 37 + k * 11) % 10) * 0.004); }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('graine', new THREE.Float32BufferAttribute(gr, 1));
    g.computeBoundingSphere(); g.boundingSphere.radius += 26;
    const o = new THREE.Points(g, PARCELLE.matFumee); o.renderOrder = 5; groupe.add(o);
  }

  // wagonnet de mine chargé de bonbons (autour de l'origine, roues sur y = 0)
  function wagonnet(L, w, rng) {
    const dT = v => { const k = clamp((v.y - 0.4) / 0.75, 0, 1); v.x *= 1 + k * 0.38; v.z *= 1 + k * 0.1; };
    L.get('metal').add(G.base('cube'), { m: G.mat(0, 0.78, 0, 0.95, 0.75, 1.5), c: [0.42, 0.3, 0.26], def: dT, w });
    L.get('metal').add(G.base('cube'), { m: G.mat(0, 0.36, 0, 0.7, 0.1, 1.75), c: NOIR, w });
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) L.get('metal').add(G.base('cyl8'), { m: G.mat(sx * 0.42, 0.26, sz * 0.5, 0.26, 0.09, 0.26, 0, 0, Math.PI / 2), c: [0.4, 0.38, 0.38], w });
    const cols = [[0.8, 0.12, 0.16], [0.9, 0.7, 0.15], [0.2, 0.55, 0.3], [0.85, 0.4, 0.6], [0.25, 0.4, 0.8], [0.9, 0.9, 0.86]];
    for (let i = 0; i < 9; i++) { const s = rng.r(0.17, 0.3); L.get('verni').add(G.base(i < 3 ? 'sphereB' : 'ico'), { m: G.mat(rng.r(-0.42, 0.42), 1.16 + rng() * 0.2, rng.r(-0.6, 0.6), s, s * 0.85, s, rng() * 3, rng() * 3, 0), c: rng.p(cols), w }); }
    L.get('sucre').add(G.base('cyl8'), { m: G.mat(0.1, 1.38, 0.2, 0.07, 1.1, 0.07, 0.5, 0.3, 0.4), c: [1, 1, 1], w });
    L.get('emis').add(G.base('ico'), { m: G.mat(-0.15, 1.38, -0.25, 0.14, 0.14, 0.14, 0.4, 0.5, 0), c: [0.9, 2.6, 1.6], w });
    G.halo(L, -0.15, 1.42, -0.25, [0.07, 0.22, 0.14], 1.7, { w });
  }

  Object.assign(REPERES, {
    // ================= 1. LA FABRIQUE DE SUCRE D'ORGE =================
    fabrique: {
      nom: 'La Fabrique de Sucre d’Orge',
      desc: 'On y cuit le sucre des cannes depuis toujours. Nul n’a jamais vu les ouvriers : seulement leurs ombres, derrière les vitres.',
      maisons: [0, 0.5, 0.35, 0.35], humeur: 'fete',
      relief(lx, lz, t, tc) { return plat(lx, lz, t, tc, 12.5, 18.5); },
      plan(P, rng) {
        const y = P.sol(M, 24);
        P.boite(M, 26, 6.9, 4.3, 0);                                   // la halle
        P.boite(20.49, 21.28, 0.65, 0.12, 1.9); P.boite(23.51, 21.28, 0.65, 0.12, Math.PI - 1.9); // vantaux du portail
        P.cyl(31, 16.8, 2.25);                                         // la cuve
        P.cyl(18.4, 13.2, 0.45); P.cyl(25.6, 14.4, 0.45); P.cyl(12, 17.2, 0.8); // appuis du grand tuyau
        P.fabWag = [{ x: 26.35, z: 19.5, a: 0, pen: 0 }, { x: 26.35, z: 15.9, a: 0.04, pen: 0 }, { x: 28.0, z: 12.2, a: 0.7, pen: 1.3 }];
        for (const w of P.fabWag) P.boite(w.x, w.z, 0.8, 1.0, w.a, 1.6);
        P.boite(26.35, 11.0, 0.8, 0.2, 0, 1.2);                        // butoir
        P.lum(M, y + 2.6, 19.6, [1, 0.58, 0.25], 2, 14);
        P.lum(17.6, y + 4, 20.2, [1, 0.75, 0.4], 1.2, 12);
        P.lum(31, y + 3.6, 16.8, [1, 0.35, 0.5], 1.5, 11);
        P.flaque(M, 19.4, 5.2, [0.55, 0.27, 0.08]); P.flaque(17.6, 19.6, 4.4, [0.4, 0.27, 0.1]); P.flaque(26.35, 19.8, 3.6, [0.42, 0.22, 0.07]); P.flaque(31, 16.8, 5, [0.4, 0.1, 0.18]);
        for (const [x, z, h] of [[8.5, 9.5, 8], [36, 9, 6.5]]) if (P.libre(x, z, 1.5)) { P.sapins.push({ x, z, h, illum: true }); P.cyl(x, z, 0.5); }
      },
      construire(L, P, rng, groupe) {
        const y0 = P.sol(M, 24), n0 = nTri(L), anims = [];
        const br = [0.74, 0.6, 0.57], pi = [0.5, 0.48, 0.5];
        const def = v => { const h = Math.max(0, v.y - y0); v.x += h * h * 0.016 + Math.sin(h * 0.6) * 0.08; };
        const ao = v => 0.45 + 0.55 * sstep(y0 - 0.1, y0 + 1.8, v.y);
        const A = (k, g, m, c, o) => L.get(k).add(typeof g === 'string' ? G.base(g) : g, Object.assign({ m, c, def }, o));
        // ---- la halle de brique ----
        A('pierre', 'cube', G.mat(M, y0 - 0.45, 26, 13.7, 1.9, 8.7), pi, { uvm: 'monde', s: 0.5 });
        A('brique', 'boite', G.mat(M, y0 + 4.1, 26, 13, 7.4, 8), br, { uvm: 'monde', s: 0.4, ao });
        A('pierre', 'cube', G.mat(M, y0 + 7.85, 26, 13.5, 0.34, 8.5), pi, { uvm: 'monde', s: 0.5 });
        for (const x of [15.6, 19.75, 24.25, 28.4]) {
          A('brique', 'boite', G.mat(x, y0 + 3.7, 21.75, 0.75, 6.6, 0.6), [0.64, 0.52, 0.5], { uvm: 'monde', s: 0.4, ao });
          A('pierre', 'cube', G.mat(x, y0 + 7.08, 21.74, 0.9, 0.2, 0.8, -0.5, 0, 0), pi, {});
        }
        for (let i = 0; i < 26; i++) { if (rng() < 0.35) continue; const l = 0.2 + rng() * 0.7; A('verni', 'glacon', G.mat(15.7 + i * 0.5, y0 + 7.66 - l / 2, 21.72, 0.05, -l, 0.05), [0.62, 0.74, 0.86], {}); }
        // ---- toit en dents de scie : verrières tournées vers l'ouest ----
        const yT = y0 + 8.0, lw = 13 / 3;
        for (let i = 0; i < 3; i++) {
          const x0 = 15.5 + i * lw, hT = 2.5 + i * 0.35, Ls = Math.hypot(lw, hT), an = Math.atan2(hT, lw);
          A('brique', 'pignon', G.mat(x0 + lw / 2, yT, 26, lw, hT, 8), br, { uvm: 'monde', s: 0.4, def: v => { v.x -= (v.y - yT) / hT * lw / 2; def(v); } });
          A('tuiles', 'cube', G.mat(x0 + lw / 2 + 0.05, yT + hT / 2 + 0.09, 26, Ls + 0.3, 0.14, 8.5, 0, 0, -an), [0.27, 0.23, 0.3], { uve: [Ls * 0.55, 8.5 * 0.55] });
          L.get('emis').add(G.base('plan'), { m: G.mat(x0 - 0.03, yT + hT / 2, 26, 7.4, hT - 0.5, 1, 0, -Math.PI / 2, 0), c: [1.7, 1.05, 0.4], def });
          for (let k = 0; k <= 6; k++) A('metal', 'cube', G.mat(x0 - 0.06, yT + hT / 2, 22.3 + k * 7.4 / 6, 0.07, hT - 0.4, 0.07), NOIR, {});
          A('metal', 'cube', G.mat(x0 - 0.06, yT + hT * 0.52, 26, 0.07, 0.07, 7.4), NOIR, {});
          G.halo(L, x0 - 0.6, yT + hT / 2, 26, [0.2, 0.13, 0.05], 6, { def });
        }
        // ---- verrières de la façade (sud) ----
        const pl4 = geo('plan4', () => new THREE.PlaneGeometry(1, 1, 1, 4));
        const verriere = (x, yb, w, h, col, arche) => {
          const yc = yb + h / 2, nV = Math.round(w / 0.7), nH = Math.round(h / 0.9);
          L.get('emis').add(pl4, { m: G.mat(x, yc, 21.96, w, h, 1, 0, Math.PI, 0), c: col, def, ao: v => 0.5 + 0.7 * (1 - sstep(yb, yb + h, v.y)) });
          for (let i = 0; i <= nV; i++) A('metal', 'cube', G.mat(x - w / 2 + i * w / nV, yc, 21.9, 0.07, h, 0.07), NOIR, {});
          for (let j = 0; j <= nH; j++) A('metal', 'cube', G.mat(x, yb + j * h / nH, 21.9, w, 0.07, 0.07), NOIR, {});
          for (const sx of [-1, 1]) A('pierre', 'cube', G.mat(x + sx * (w / 2 + 0.16), yc, 21.84, 0.32, h + 0.1, 0.4), pi, { uvm: 'monde', s: 0.6 });
          A('pierre', 'cube', G.mat(x, yb - 0.13, 21.8, w + 0.9, 0.26, 0.55), pi, {});
          if (arche) {
            const r = w / 2;
            L.get('emis').add(G.base('cyl16'), { m: G.mat(x, yb + h, 21.975, r, 0.02, r, Math.PI / 2, 0, 0), c: [col[0] * 0.5, col[1] * 0.5, col[2] * 0.5], def });
            for (const a of [0.79, 1.57, 2.36]) A('metal', 'cube', G.mat(x + Math.cos(a) * r / 2, yb + h + Math.sin(a) * r / 2, 21.9, r, 0.07, 0.07, 0, 0, a), NOIR, {});
            for (let k = 0; k < 5; k++) { const a = 0.26 + k * 0.655, rr = r + 0.17; A('pierre', 'cube', G.mat(x + Math.cos(a) * rr, yb + h + Math.sin(a) * rr, 21.84, 0.34, rr * 0.7, 0.4, 0, 0, a), pi, {}); }
          } else A('pierre', 'cube', G.mat(x, yb + h + 0.13, 21.82, w + 0.7, 0.26, 0.45), pi, {});
          G.halo(L, x, yc, 21.4, [col[0] * 0.1, col[1] * 0.1, col[2] * 0.1], 6.5, { def });
        };
        verriere(17.65, y0 + 1.3, 2.8, 4.2, [2.3, 1.45, 0.55], true);
        verriere(26.35, y0 + 4.5, 2.8, 2.5, [2.3, 1.45, 0.55], false);
        verriere(M, y0 + 0.5, 2.6, 3.0, [3.0, 1.2, 0.3], true);          // le portail : gueule de four
        verriere(26.35, y0 + 0.45, 2.0, 1.9, [1.6, 0.6, 0.16], true);    // bouche du tunnel des wagonnets
        A('metal', 'cube', G.mat(20.49, y0 + 2.0, 21.28, 1.3, 3.0, 0.09, 0, 1.9, 0), [0.3, 0.3, 0.33], {});
        A('metal', 'cube', G.mat(23.51, y0 + 2.0, 21.28, 1.3, 3.0, 0.09, 0, Math.PI - 1.9, 0), [0.3, 0.3, 0.33], {});
        lanterne(L, 19.75, y0 + 3.3, 21.25, [3, 1.9, 0.8], 1.2, { def }); lanterne(L, 24.25, y0 + 3.3, 21.25, [3, 1.9, 0.8], 1.2, { def });
        // ---- ombres des ouvriers derrière les vitres (elles vont et viennent) ----
        const ombre = (x, y, amp, vit, ph) => {
          const L2 = G.Lots(), n = [0.015, 0.015, 0.02];
          L2.get('verni').add(G.base('sphereB'), { m: G.mat(0, 1.58, 0, 0.2, 0.24, 0.02), c: n });
          L2.get('verni').add(G.base('cyl8'), { m: G.mat(0, 0.7, 0, 0.3, 1.4, 0.02), c: n, def: v => { v.x *= 0.55 + 0.45 * clamp(v.y / 1.4, 0, 1); } });
          L2.get('verni').add(G.base('cube'), { m: G.mat(0.34, 1.2, 0, 0.6, 0.1, 0.02, 0, 0, 0.5), c: n });
          L2.get('verni').add(G.base('cone8'), { m: G.mat(0, 1.92, 0, 0.2, 0.34, 0.02), c: n });
          const o = maill(L2); o.position.set(x, y, 21.93); groupe.add(o);
          anims.push(t => { const s = Math.sin(t * vit + ph); o.position.x = x + s * amp; o.rotation.z = Math.cos(t * vit + ph) * 0.06; o.scale.x = Math.cos(t * vit + ph) > 0 ? 1 : -1; });
        };
        ombre(17.75, y0 + 1.35, 0.85, 0.21, 0); ombre(26.5, y0 + 4.4, 0.8, 0.17, 2);
        // ---- engrenages (ils tournent) ----
        const roue = (R, nd, col) => {
          const L2 = G.Lots();
          L2.get('verni').add(G.base('tore'), { m: G.mat(0, 0, 0, R * 0.8, R * 0.8, 0.55), c: col });
          for (let i = 0; i < nd; i++) { const a = i / nd * TAU; L2.get('verni').add(G.base('cube'), { m: G.mat(Math.cos(a) * R * 1.13, Math.sin(a) * R * 1.13, 0, R * 0.32, 0.3 * 1.7 * R / (nd / 6) * 0.59, 0.3, 0, 0, a), c: col }); }
          for (let i = 0; i < 5; i++) { const a = i / 5 * TAU + 0.3; L2.get('metal').add(G.base('cube'), { m: G.mat(Math.cos(a) * R * 0.34, Math.sin(a) * R * 0.34, 0, R * 0.6, 0.15, 0.13, 0, 0, a), c: [0.45, 0.4, 0.35] }); }
          L2.get('verni').add(G.base('cyl12'), { m: G.mat(0, 0, 0, R * 0.2, 0.5, R * 0.2, Math.PI / 2, 0, 0), c: [0.3, 0.2, 0.12] });
          return maill(L2);
        };
        const p1 = V3(M, y0 + 6.9, 21.5), p2 = V3(M - 2.36, y0 + 8.55, 21.45); def(p1); def(p2);
        const r1 = roue(1.7, 12, [0.72, 0.5, 0.2]), r2 = roue(0.85, 6, [0.6, 0.36, 0.2]);
        r1.position.copy(p1); r2.position.copy(p2); groupe.add(r1, r2);
        A('metal', 'cyl8', G.mat(M, y0 + 6.9, 21.8, 0.22, 0.6, 0.22, Math.PI / 2, 0, 0), NOIR, {});
        A('metal', 'cyl8', G.mat(M - 2.36, y0 + 8.55, 21.8, 0.16, 0.7, 0.16, Math.PI / 2, 0, 0), NOIR, {});
        anims.push(t => { r1.rotation.z = t * 0.3; r2.rotation.z = -t * 0.6 + 0.26; });
        // ---- hautes cheminées tordues, coiffées de sucre d'orge ----
        const gA = geo('chemA', () => new THREE.CylinderGeometry(0.8, 1, 1, 10, 8, true)), gB = geo('chemB', () => new THREE.CylinderGeometry(0.78, 1, 1, 10, 5, true));
        const tops = [], dcs = [], yb = y0 + 6.2;
        for (const [cx, cz, H, r, ph, amp, lx, lz] of [[17.6, 28.4, 15.5, 1.15, 0.5, 0.7, -1.6, 0.5], [26.4, 28.0, 19.5, 1.35, 2.4, 0.9, 2.2, -0.6], [28.7, 24.2, 11.5, 0.95, 4.0, 0.5, 1.0, 0.8]]) {
          const hh = H - 6.2, h1 = hh * 0.66, h2 = hh - h1;
          const dc = v => { const k = clamp((v.y - yb) / hh, 0, 1.15), kk = k * k; v.x += Math.sin(k * 3.6 + ph) * amp * k + kk * lx; v.z += Math.cos(k * 2.9 + ph * 1.3) * amp * 0.7 * k + kk * lz; };
          L.get('brique').add(gA, { m: G.mat(cx, yb + h1 / 2, cz, r, h1, r), c: [0.62, 0.5, 0.5], uvm: 'monde', s: 0.45, def: dc });
          L.get('sucre').add(gB, { m: G.mat(cx, yb + h1 + h2 / 2, cz, r * 0.8, h2, r * 0.8), c: [1, 1, 1], def: dc });
          L.get('metal').add(G.base('cyl8'), { m: G.mat(cx, yb + h1, cz, r * 0.87, 0.3, r * 0.87), c: NOIR, def: dc });
          L.get('pierre').add(G.base('cyl8'), { m: G.mat(cx, yb + hh, cz, r * 0.72, 0.45, r * 0.72), c: [0.3, 0.3, 0.32], def: dc });
          const p = V3(cx, yb + hh + 0.3, cz); dc(p); tops.push(p); dcs.push({ dc, cx, cz, hh, r });
        }
        fumee(groupe, tops, 9);
        // ---- énormes tuyaux rayés ----
        const sucre = (pts, seg, r, nr, rep, d, cols) => {
          const g = tuyau(pts.map(p => V3(p[0], y0 + p[1], p[2])), seg, r, nr, rep); L.get('sucre').add(g, { c: [1, 1, 1], def: d });
          for (const i of cols) collier(L, 'metal', g, i, r + 0.1, 0.28, NOIR, d); return g;
        };
        sucre([[16.4, 5.2, 25.5], [13.2, 5.7, 24.4], [11.3, 3.9, 21], [11.9, 1.25, 17.2], [14.4, 2.2, 14.3], [18.4, 5.1, 13.2], [22, 6.2, 13.5], [25.6, 5.4, 14.4], [28.8, 4.4, 15.6], [30.5, 3.5, 16.4]], 60, 0.5, 7, 6, null, [6, 15, 24, 33, 42, 51, 58]);
        for (const [x, z, h] of [[18.4, 13.2, 5.1], [25.6, 14.4, 5.4]]) {
          for (const sx of [-1, 1]) L.get('metal').add(G.base('cyl6'), { m: barre(x + sx * 0.9, y0 - 0.2, z + sx * 0.25, x, y0 + h - 0.4, z, 0.09), c: NOIR });
          L.get('metal').add(G.base('cube'), { m: G.mat(x, y0 + h * 0.45, z + 0.06, 1.0, 0.08, 0.08, 0, -0.27, 0), c: NOIR });
        }
        L.get('pierre').add(G.base('cube'), { m: G.mat(12, y0 + 0.25, 17.2, 1.5, 1.1, 1.3, 0, 0.3, 0), c: pi, uvm: 'monde' });
        { // tuyau en hélice autour de la grande cheminée
          const c2 = dcs[1], pts = [[c2.cx + 1.7, 5.4, c2.cz]];
          for (let j = 0; j <= 30; j++) { const k = 0.1 + j / 30 * 0.5, a = j / 30 * 2.4 * TAU, rh = c2.r * (1 - 0.2 * k) + 0.4; pts.push([c2.cx + Math.cos(a) * rh, 6.2 + k * c2.hh, c2.cz + Math.sin(a) * rh]); }
          const k = 0.66, a = 2.4 * TAU + 0.5; pts.push([c2.cx + Math.cos(a) * 2.3, 6.2 + k * c2.hh, c2.cz + Math.sin(a) * 2.3]);
          const g = sucre(pts, 56, 0.3, 6, 7, c2.dc, [55]);
          const e = g.userData.cs[56].clone(); c2.dc(e); L.get('emis').add(G.base('sphereB'), { m: G.mat(e.x, e.y, e.z, 0.22, 0.22, 0.22), c: [3, 0.8, 1.2] }); G.halo(L, e.x, e.y, e.z, [0.3, 0.08, 0.12], 3);
        }
        sucre([[28.7, 5.8, 24.5], [30.6, 6.4, 23.2], [31.9, 5.2, 20.8], [31.7, 3.9, 18.6], [31.3, 3.0, 17.5]], 24, 0.38, 6, 3, null, [5, 13, 22]);
        // ---- la cuve de sirop ----
        const vx = 31, vz = 16.8, cu = [0.55, 0.3, 0.17];
        for (let i = 0; i < 3; i++) { const a = i / 3 * TAU + 0.5; L.get('metal').add(G.base('cyl6'), { m: G.mat(vx + Math.cos(a) * 1.5, y0 + 0.4, vz + Math.sin(a) * 1.5, 0.15, 1.6, 0.15), c: NOIR }); }
        L.get('verni').add(geo('cuve', () => new THREE.SphereGeometry(1, 14, 6, 0, TAU, Math.PI * 0.32, Math.PI * 0.68)), { m: G.mat(vx, y0 + 1.95, vz, 2.05, 1.5, 2.05), c: cu });
        L.get('verni').add(G.base('tore'), { m: G.mat(vx, y0 + 2.76, vz, 1.72, 1.72, 0.5, Math.PI / 2, 0, 0), c: [0.62, 0.36, 0.2] });
        L.get('metal').add(G.base('toreFin'), { m: G.mat(vx, y0 + 1.95, vz, 2.07, 2.07, 2.5, Math.PI / 2, 0, 0), c: NOIR });
        L.get('emis').add(G.base('cyl16'), { m: G.mat(vx, y0 + 2.74, vz, 1.66, 0.06, 1.66), c: [2.8, 0.7, 1.05] });
        G.halo(L, vx, y0 + 3.3, vz, [0.36, 0.09, 0.15], 7);
        for (let i = 0; i < 3; i++) { // bulles qui gonflent et crèvent
          const L2 = G.Lots(); L2.get('emis').add(G.base('sphereB'), { m: G.mat(0, 0, 0, 0.3, 0.3, 0.3), c: [3.2, 1.1, 1.5] });
          const b = maill(L2); b.position.set(vx + Math.cos(i * 2.3) * 0.8, y0 + 2.8, vz + Math.sin(i * 2.3) * 0.8); groupe.add(b);
          anims.push(t => { const k = (t * (0.31 + i * 0.07) + i * 0.37) % 1, s = k < 0.85 ? 0.2 + k : (1 - k) * 7; b.scale.set(s, s * 0.8, s); });
        }
        // ---- rails et wagonnets de bonbons ----
        for (const sx of [-1, 1]) L.get('metal').add(G.base('cube'), { m: G.mat(26.35 + sx * 0.42, y0 + 0.1, 16.5, 0.07, 0.1, 11.2), c: [0.4, 0.4, 0.42] });
        for (let z = 11.3; z < 22; z += 0.85) L.get('bois').add(G.base('cube'), { m: G.mat(26.35, y0 + 0.04, z, 1.35, 0.08, 0.2, 0, (rng() - 0.5) * 0.1, 0), c: [0.4, 0.3, 0.24] });
        for (const sx of [-1, 1]) L.get('bois').add(G.base('cube'), { m: G.mat(26.35 + sx * 0.55, y0 + 0.5, 11.0, 0.18, 1.1, 0.18), c: [0.4, 0.3, 0.24] });
        L.get('bois').add(G.base('cube'), { m: G.mat(26.35, y0 + 0.85, 11.0, 1.5, 0.26, 0.22), c: [0.5, 0.16, 0.14] });
        lanterne(L, 26.35, y0 + 1.25, 11.0, [3, 0.5, 0.35], 0.9);
        for (const w of P.fabWag) wagonnet(L, G.mat(w.x, y0 + (w.pen ? 0.55 : 0.12), w.z, 1, 1, 1, 0, w.a, w.pen), rng);
        const cols = [[0.8, 0.12, 0.16], [0.9, 0.7, 0.15], [0.2, 0.55, 0.3], [0.85, 0.4, 0.6], [0.9, 0.9, 0.86]];
        for (let i = 0; i < 12; i++) { const s = rng.r(0.16, 0.28), x = 29 + rng() * 1.8, z = 11.2 + rng() * 2.2; L.get('verni').add(G.base(i % 3 ? 'ico' : 'sphereB'), { m: G.mat(x, y0 + s * 0.6, z, s, s * 0.85, s, rng() * 3, rng() * 3, 0), c: cols[i % 5] }); }
        // congères au pied de la façade
        for (let i = 0; i < 9; i++) { const x = 15.5 + rng() * 13; if (Math.abs(x - M) < 2 || Math.abs(x - 26.35) < 1.4) continue; L.get('neige').add(G.base('bosse'), { m: G.mat(x, y0 - 0.02, 21.5 - rng() * 0.3, 0.8 + rng() * 0.8, 0.25 + rng() * 0.3, 0.6), c: [1, 1, 1], uvm: 'monde' }); }
        bilan('fabrique', L, n0, 1500);
        return anims;
      },
    },
  });
})();
