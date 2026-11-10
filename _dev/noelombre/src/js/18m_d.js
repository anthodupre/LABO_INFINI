/* ===================== LOT D : 6 merveilles (fabrique, grande_porte, etoile_tombee, chapiteau, village_mini,
   boule_neige) et 3 blocs (entrepot, jardin_clos, tourelles) =====================
   Même forme que 18_reperes.js / 18a_blocs.js. Tout est local à cette fonction (aucune déclaration globale). */
(() => {
  const C = MONDE.C, M = C / 2, G = GEO;
  const maill = REPERES_OUTILS.maill;
  const TAU = Math.PI * 2, NOIR = [0.14, 0.14, 0.16];
  const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
  const DBG = false; // mise au point : compte les triangles ajoutés par construire()
  const nTri = L => { let n = 0; for (const k in L.tous) n += L.tous[k].i.length; return Math.round(n / 3); };
  const bilan = (id, L, n0, extra) => { if (DBG) console.log('[dbg] ' + id + ' : ' + (nTri(L) - n0 + (extra || 0)) + ' triangles propres'); };
  // géométries sur mesure, fabriquées une seule fois
  const geos = {};
  const idx = g => { if (!g.index) { const n = g.attributes.position.count, ix = new Uint32Array(n); for (let i = 0; i < n; i++) ix[i] = i; g.setIndex(new THREE.BufferAttribute(ix, 1)); } return g; };
  const geo = (k, f) => geos[k] || (geos[k] = idx(f()));
  // Le monde est TORDU par le shader, sommet par sommet : une grande face plate à 2 triangles ne suit pas la torsion
  // (jusqu'à 20-30 cm d'écart au milieu d'une face de 13 m) et avale les détails posés dessus. Donc : grandes faces
  // subdivisées (mailles de 2-3 m au plus).
  const boiteF = (nx, ny, nz) => geo('bx' + nx + '_' + ny + '_' + nz, () => new THREE.BoxGeometry(1, 1, 1, nx, ny, nz));
  const planF = (nx, ny) => geo('pl' + nx + '_' + ny, () => new THREE.PlaneGeometry(1, 1, nx, ny));
  // lampadaires de trottoir posés à la main (les merveilles mettent lampes: 0 pour garder l'entrée sud dégagée)
  const lampesRues = (P, sud, nord, est, ouest) => {
    const o = MONDE.RUE + 0.35;
    for (const t of sud || []) if (P.libre(t, o, 0.4)) P.lampe(t, o, Math.PI / 2);
    for (const t of nord || []) if (P.libre(t, C - o, 0.4)) P.lampe(t, C - o, -Math.PI / 2);
    for (const t of est || []) if (P.libre(C - o, t, 0.4)) P.lampe(C - o, t, 0);
    for (const t of ouest || []) if (P.libre(o, t, 0.4)) P.lampe(o, t, Math.PI);
  };
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
      maisons: [0, 0.5, 0.35, 0.35], humeur: 'fete', lampes: 0,
      relief(lx, lz, t, tc) { return plat(lx, lz, t, tc, 12.5, 18.5); },
      plan(P, rng) {
        const y = P.sol(M, 24);
        P.boite(M, 26, 6.9, 4.3, 0);                                   // la halle
        P.boite(20.49, 21.28, 0.65, 0.12, 1.9); P.boite(23.51, 21.28, 0.65, 0.12, Math.PI - 1.9); // vantaux du portail
        P.cyl(31, 16.8, 2.25);                                         // la cuve
        P.cyl(17.6, 13.2, 0.5); P.cyl(26.4, 14.3, 0.5); P.cyl(12, 17.2, 0.8); // appuis du grand tuyau
        P.fabWag = [{ x: 26.35, z: 19.5, a: 0, pen: 0 }, { x: 26.35, z: 15.9, a: 0.04, pen: 0 }, { x: 28.0, z: 12.2, a: 0.7, pen: 1.3 }];
        for (const w of P.fabWag) P.boite(w.x, w.z, 0.8, 1.0, w.a, 1.6);
        P.boite(26.35, 11.0, 0.8, 0.2, 0, 1.2);                        // butoir
        P.lum(M, y + 2.6, 19.6, [1, 0.58, 0.25], 2, 14);
        P.lum(17.6, y + 4, 20.2, [1, 0.75, 0.4], 1.2, 12);
        P.lum(31, y + 3.6, 16.8, [1, 0.35, 0.5], 1.5, 11);
        P.flaque(M, 19.4, 5.2, [0.55, 0.27, 0.08]); P.flaque(17.6, 19.6, 4.4, [0.4, 0.27, 0.1]); P.flaque(26.35, 19.8, 3.6, [0.42, 0.22, 0.07]); P.flaque(31, 16.8, 5, [0.4, 0.1, 0.18]);
        lampesRues(P, [8.5, 35.5]);
      },
      construire(L, P, rng, groupe) {
        const y0 = P.sol(M, 24), n0 = nTri(L), anims = [];
        const br = [0.4, 0.35, 0.37], pi = [0.44, 0.43, 0.47];
        const def = v => { const h = Math.max(0, v.y - y0); v.x += h * h * 0.016 + Math.sin(h * 0.6) * 0.08; };
        const ao = v => 0.45 + 0.55 * sstep(y0 - 0.1, y0 + 1.8, v.y);
        const A = (k, g, m, c, o) => L.get(k).add(typeof g === 'string' ? G.base(g) : g, Object.assign({ m, c, def }, o));
        // ---- la halle de brique ----
        A('pierre', boiteF(6, 1, 4), G.mat(M, y0 - 0.45, 26, 13.7, 1.9, 8.7), pi, { uvm: 'monde', s: 0.5 });
        A('brique', boiteF(6, 4, 4), G.mat(M, y0 + 4.1, 26, 13, 7.4, 8), br, { uvm: 'monde', s: 0.4, ao });
        A('pierre', boiteF(6, 1, 4), G.mat(M, y0 + 7.85, 26, 13.5, 0.34, 8.5), pi, { uvm: 'monde', s: 0.5 });
        for (const x of [15.6, 19.75, 24.25, 28.4]) {
          A('brique', 'boite', G.mat(x, y0 + 3.7, 21.75, 0.75, 6.6, 0.6), [0.34, 0.3, 0.32], { uvm: 'monde', s: 0.4, ao });
          A('pierre', 'cube', G.mat(x, y0 + 7.08, 21.74, 0.9, 0.2, 0.8, -0.5, 0, 0), pi, {});
        }
        for (let i = 0; i < 26; i++) { if (rng() < 0.35) continue; const l = 0.2 + rng() * 0.7; A('verni', 'glacon', G.mat(15.7 + i * 0.5, y0 + 7.66 - l / 2, 21.72, 0.05, -l, 0.05), [0.62, 0.74, 0.86], {}); }
        // ---- toit en dents de scie : verrières tournées vers l'ouest ----
        const yT = y0 + 8.0, lw = 13 / 3;
        for (let i = 0; i < 3; i++) {
          const x0 = 15.5 + i * lw, hT = 2.5 + i * 0.35, Ls = Math.hypot(lw, hT), an = Math.atan2(hT, lw);
          A('brique', 'pignon', G.mat(x0 + lw / 2, yT, 26, lw, hT, 8), br, { uvm: 'monde', s: 0.4, def: v => { v.x -= (v.y - yT) / hT * lw / 2; def(v); } });
          A('tuiles', boiteF(2, 1, 3), G.mat(x0 + lw / 2 + 0.05, yT + hT / 2 + 0.09, 26, Ls + 0.3, 0.14, 8.5, 0, 0, -an), [0.27, 0.23, 0.3], { uve: [Ls * 0.55, 8.5 * 0.55] });
          L.get('emis').add(planF(3, 1), { m: G.mat(x0 - 0.07, yT + hT / 2, 26, 7.4, hT - 0.5, 1, 0, -Math.PI / 2, 0), c: [1.7, 1.05, 0.4], def });
          for (let k = 0; k <= 6; k++) A('metal', 'cube', G.mat(x0 - 0.12, yT + hT / 2, 22.3 + k * 7.4 / 6, 0.07, hT - 0.4, 0.07), NOIR, {});
          A('metal', boiteF(1, 1, 3), G.mat(x0 - 0.12, yT + hT * 0.52, 26, 0.07, 0.07, 7.4), NOIR, {});
          G.halo(L, x0 - 0.6, yT + hT / 2, 26, [0.2, 0.13, 0.05], 6, { def });
        }
        // ---- verrières de la façade (sud) ----
        const pl4 = geo('plan4', () => new THREE.PlaneGeometry(1, 1, 1, 4));
        const verriere = (x, yb, w, h, col, arche) => {
          const yc = yb + h / 2, nV = Math.round(w / 0.7), nH = Math.round(h / 0.9);
          L.get('emis').add(pl4, { m: G.mat(x, yc, 21.94, w, h, 1, 0, Math.PI, 0), c: col, def, ao: v => 0.5 + 0.7 * (1 - sstep(yb, yb + h, v.y)) });
          for (let i = 0; i <= nV; i++) A('metal', 'cube', G.mat(x - w / 2 + i * w / nV, yc, 21.87, 0.07, h, 0.07), NOIR, {});
          for (let j = 0; j <= nH; j++) A('metal', 'cube', G.mat(x, yb + j * h / nH, 21.87, w, 0.07, 0.07), NOIR, {});
          for (const sx of [-1, 1]) A('pierre', 'cube', G.mat(x + sx * (w / 2 + 0.16), yc, 21.84, 0.32, h + 0.1, 0.4), pi, { uvm: 'monde', s: 0.6 });
          A('pierre', 'cube', G.mat(x, yb - 0.13, 21.8, w + 0.9, 0.26, 0.55), pi, {});
          if (arche) {
            const r = w / 2;
            L.get('emis').add(G.base('cyl16'), { m: G.mat(x, yb + h, 21.955, r, 0.02, r, Math.PI / 2, 0, 0), c: [col[0] * 0.5, col[1] * 0.5, col[2] * 0.5], def });
            for (const a of [0.79, 1.57, 2.36]) A('metal', 'cube', G.mat(x + Math.cos(a) * r / 2, yb + h + Math.sin(a) * r / 2, 21.87, r, 0.07, 0.07, 0, 0, a), NOIR, {});
            for (let k = 0; k < 5; k++) { const a = 0.26 + k * 0.655, rr = r + 0.17; A('pierre', 'cube', G.mat(x + Math.cos(a) * rr, yb + h + Math.sin(a) * rr, 21.84, 0.34, rr * 0.7, 0.4, 0, 0, a), pi, {}); }
          } else A('pierre', 'cube', G.mat(x, yb + h + 0.13, 21.82, w + 0.7, 0.26, 0.45), pi, {});
          G.halo(L, x, yc, 21.4, [col[0] * 0.09, col[1] * 0.09, col[2] * 0.09], 6.5, { def });
        };
        verriere(17.65, y0 + 1.3, 2.8, 4.2, [1.75, 1.05, 0.36], true);
        verriere(26.35, y0 + 4.5, 2.8, 2.5, [1.75, 1.05, 0.36], false);
        verriere(M, y0 + 0.5, 2.6, 3.0, [2.1, 0.72, 0.13], true);          // le portail : gueule de four
        verriere(26.35, y0 + 0.45, 2.0, 1.9, [1.3, 0.42, 0.1], true);    // bouche du tunnel des wagonnets
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
          const o = maill(L2); o.position.set(x, y, 21.905); groupe.add(o);
          anims.push(t => { const s = Math.sin(t * vit + ph); o.position.x = x + s * amp; o.rotation.z = Math.cos(t * vit + ph) * 0.06; o.scale.x = Math.cos(t * vit + ph) > 0 ? 1 : -1; });
        };
        ombre(17.75, y0 + 1.35, 0.85, 0.21, 0); ombre(26.5, y0 + 4.4, 0.8, 0.17, 2);
        // ---- engrenages (ils tournent) ----
        const roue = (R, nd, col) => {
          const L2 = G.Lots();
          L2.get('metal').add(G.base('tore'), { m: G.mat(0, 0, 0, R * 0.84, R * 0.84, 0.42), c: col });
          for (let i = 0; i < nd; i++) { const a = i / nd * TAU; L2.get('metal').add(G.base('cube'), { m: G.mat(Math.cos(a) * R * 1.15, Math.sin(a) * R * 1.15, 0, R * 0.3, R * 3.3 / nd, 0.26, 0, 0, a), c: col }); }
          for (let i = 0; i < 5; i++) { const a = i / 5 * TAU + 0.3; L2.get('metal').add(G.base('cube'), { m: G.mat(Math.cos(a) * R * 0.34, Math.sin(a) * R * 0.34, 0, R * 0.6, 0.15, 0.13, 0, 0, a), c: [1.2, 0.9, 0.5] }); }
          L2.get('metal').add(G.base('cyl12'), { m: G.mat(0, 0, 0, R * 0.2, 0.5, R * 0.2, Math.PI / 2, 0, 0), c: [1.1, 0.8, 0.5] });
          return maill(L2);
        };
        const p1 = V3(M, y0 + 6.9, 21.5), p2 = V3(M - 2.36, y0 + 8.55, 21.45); def(p1); def(p2);
        const r1 = roue(1.7, 12, [1.7, 1.15, 0.5]), r2 = roue(0.85, 6, [1.5, 0.9, 0.5]);
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
        sucre([[16.4, 5.2, 25.5], [13.2, 5.7, 24.4], [11.3, 3.9, 21], [11.9, 1.25, 17.2], [13.8, 3.6, 14.4], [17.6, 7.8, 13.2], [22, 8.8, 13.4], [26.4, 7.9, 14.3], [29.4, 5.6, 15.6], [30.6, 3.6, 16.4]], 64, 0.5, 7, 7, null, [6, 15, 24, 33, 42, 51, 60]);
        for (const [x, z, h] of [[17.6, 13.2, 7.8], [26.4, 14.3, 7.9]]) {
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
        for (const sx of [-1, 1]) L.get('metal').add(boiteF(1, 1, 5), { m: G.mat(26.35 + sx * 0.42, y0 + 0.1, 16.5, 0.07, 0.1, 11.2), c: [0.4, 0.4, 0.42] });
        for (let z = 11.3; z < 22; z += 0.85) L.get('bois').add(G.base('cube'), { m: G.mat(26.35, y0 + 0.04, z, 1.35, 0.08, 0.2, 0, (rng() - 0.5) * 0.1, 0), c: [0.4, 0.3, 0.24] });
        for (const sx of [-1, 1]) L.get('bois').add(G.base('cube'), { m: G.mat(26.35 + sx * 0.55, y0 + 0.5, 11.0, 0.18, 1.1, 0.18), c: [0.4, 0.3, 0.24] });
        L.get('bois').add(G.base('cube'), { m: G.mat(26.35, y0 + 0.85, 11.0, 1.5, 0.26, 0.22), c: [0.5, 0.16, 0.14] });
        lanterne(L, 26.35, y0 + 1.25, 11.0, [3, 0.5, 0.35], 0.9);
        for (const w of P.fabWag) wagonnet(L, G.mat(w.x, y0 + (w.pen ? 0.55 : 0.12), w.z, 1, 1, 1, 0, w.a, w.pen), rng);
        const cols = [[0.8, 0.12, 0.16], [0.9, 0.7, 0.15], [0.2, 0.55, 0.3], [0.85, 0.4, 0.6], [0.9, 0.9, 0.86]];
        for (let i = 0; i < 12; i++) { const s = rng.r(0.16, 0.28), x = 29 + rng() * 1.8, z = 11.2 + rng() * 2.2; L.get('verni').add(G.base(i % 3 ? 'ico' : 'sphereB'), { m: G.mat(x, y0 + s * 0.6, z, s, s * 0.85, s, rng() * 3, rng() * 3, 0), c: cols[i % 5] }); }
        // congères au pied de la façade
        for (let i = 0; i < 9; i++) { const x = 15.5 + rng() * 13; if (Math.abs(x - M) < 2 || Math.abs(x - 26.35) < 1.4) continue; L.get('neige').add(G.base('bosse'), { m: G.mat(x, y0 - 0.02, 21.5 - rng() * 0.3, 0.8 + rng() * 0.8, 0.25 + rng() * 0.3, 0.6), c: [1, 1, 1], uvm: 'monde' }); }
        bilan('fabrique', L, n0);
        return anims;
      },
    },

    // ================= 2. LA GRANDE PORTE SANS MUR =================
    grande_porte: {
      nom: 'La Grande Porte Sans Mur',
      desc: 'Ni mur, ni maison : une porte, et rien autour. Passe le seuil, tu verras : la nuit change de couleur.',
      maisons: 0, lampes: 0,
      relief(lx, lz, t, tc) { return plat(lx, lz, t, tc, 10, 17); },
      plan(P, rng) {
        const Zp = 23, y = P.sol(M, Zp), th = 1.0;
        P.boite(M, Zp - 0.6, 6.2, 4.4, 0, 0.25); P.boite(M, Zp - 0.6, 5.6, 3.8, 0, 0.5); P.boite(M, Zp - 0.6, 5.0, 3.2, 0, 0.75); // perron (3 marches)
        for (const s of [-1, 1]) {
          P.boite(M + s * 3.05, Zp, 0.85, 0.95, 0);                                                                  // piédroits
          P.boite(M + s * (2.3 - 1.15 * Math.cos(th)), Zp - 0.95 - 1.15 * Math.sin(th), 1.15, 0.14, s < 0 ? th : Math.PI - th); // vantaux ouverts
        }
        P.porteLant = [];
        for (const z of [6.5, 11, 15.5, 30.5, 35]) for (const s of [-1, 1]) { const x = M + s * (3.3 + rng() * 0.5); P.porteLant.push({ x, z: z + (rng() - 0.5), h: 2.9 + rng() * 0.9, s }); P.cyl(x, z, 0.16); }
        P.cyl(26.5, 20.1, 0.3); // boîte aux lettres
        // couleurs des vraies lumières : tableaux gardés pour les faire changer de teinte au passage du seuil
        P.porteCD = [0.6, 0.9, 1]; P.porteCL = [1, 0.62, 0.27];
        P.lum(M, y + 4.4, Zp - 3.8, P.porteCD, 2.4, 17); P.lum(M, y + 4.4, Zp + 3.4, P.porteCD, 1.6, 14);
        P.lum(M, y + 3, 11, P.porteCL, 1.1, 12); P.lum(M, y + 3, 32.5, P.porteCL, 1.0, 12);
        if (P.libre(34.5, 17.5, 1.5)) { P.morts.push({ x: 34.5, z: 17.5, h: 9 }); P.cyl(34.5, 17.5, 0.45); }
        lampesRues(P, [7.5, 36.5], [22]);
      },
      construire(L, P, rng, groupe) {
        const Zp = 23, y0 = P.sol(M, Zp), yT = y0 + 0.75, a = 2.3, e = 1.667, R = a + e, hS = 6.0, n0 = nTri(L);
        const pi = [0.36, 0.37, 0.43], pj = () => { const k = 0.85 + rng() * 0.3; return [pi[0] * k, pi[1] * k, pi[2] * k]; };
        const hsol = (x, z) => { const dx = Math.abs(x - M), dz = Math.abs(z - (Zp - 0.6)); return dx < 5.0 && dz < 3.2 ? yT : dx < 5.6 && dz < 3.8 ? y0 + 0.5 : dx < 6.2 && dz < 4.4 ? y0 + 0.25 : P.sol(x, z); };
        const haut = x => hS + Math.sqrt(Math.max(0, R * R - (Math.abs(x) + e) * (Math.abs(x) + e))); // hauteur de l'ogive à x du milieu
        const defA = v => { const k = Math.max(0, v.y - yT - hS) / 6; v.x += k * k * 0.9; v.z -= k * k * 0.3; };
        // ---- perron ----
        for (let i = 0; i < 3; i++) L.get('pierre').add(boiteF(5, 1, 4), { m: G.mat(M, y0 + 0.25 * i - 0.375, Zp - 0.6, 12.4 - i * 1.2, 1.25, 8.8 - i * 1.2), c: [0.4, 0.4, 0.45], uvm: 'monde', s: 0.5 });
        // ---- piédroits de gros blocs, pinacles ----
        for (const s of [-1, 1]) {
          const px = M + s * (a + 0.75);
          L.get('pierre').add(G.base('cube'), { m: G.mat(px, yT + 0.3, Zp, 1.95, 0.6, 2.15), c: pi, uvm: 'monde', s: 0.5, ao: v => 0.5 + 0.5 * sstep(yT, yT + 0.6, v.y) });
          for (let i = 0; i < 5; i++) L.get('pierre').add(G.base('cube'), { m: G.mat(px + (rng() - 0.5) * 0.12, yT + 0.6 + 1.08 * (i + 0.5), Zp + (rng() - 0.5) * 0.12, 1.5 + (rng() - 0.5) * 0.16, 1.1, 1.7 + (rng() - 0.5) * 0.16, 0, (rng() - 0.5) * 0.08, 0), c: pj(), uvm: 'monde', s: 0.5, ao: v => 0.6 + 0.4 * sstep(yT, yT + 2.2, v.y) });
          L.get('pierre').add(G.base('cube'), { m: G.mat(px, yT + hS + 0.05, Zp, 1.85, 0.36, 2.05), c: pi, uvm: 'monde', s: 0.5 });
          const qx = M + s * (a + 1.1), dP = v => { const k = clamp((v.y - yT - hS - 1.6) / 2.8, 0, 1); v.x += s * k * k * k * 0.7; };
          L.get('pierre').add(G.base('cube'), { m: G.mat(qx, yT + hS + 0.9, Zp, 0.95, 1.4, 1.25), c: pj(), uvm: 'monde', s: 0.5 });
          L.get('pierre').add(G.base('cone4'), { m: G.mat(qx, yT + hS + 1.6 + 1.4, Zp, 0.62, 2.8, 0.62), c: pi, def: dP });
          L.get('emis').add(G.base('sphereB'), { m: G.mat(qx + s * 0.7, yT + hS + 4.36, Zp, 0.09, 0.09, 0.09), c: [2.6, 2.4, 1.8] });
          for (let k = 0; k < 3; k++) L.get('neige').add(G.base('bosse'), { m: G.mat(px + (rng() - 0.5) * 1.6, yT - 0.02, Zp + (k - 1) * 1.1 + (rng() - 0.5) * 0.3, 0.6 + rng() * 0.5, 0.2 + rng() * 0.2, 0.5 + rng() * 0.3), c: [1, 1, 1], uvm: 'monde' });
        }
        // ---- ogive : claveaux, clef à tête de pierre, clocheton ----
        const th1 = Math.acos(-e / R), rm = R + 0.55, nV = 6;
        for (const s of [-1, 1]) for (let i = 0; i < nV; i++) {
          const th = Math.PI - (i + 0.5) / nV * (Math.PI - th1), wx = s < 0 ? M + e + Math.cos(th) * rm : M - e - Math.cos(th) * rm;
          L.get('pierre').add(G.base('cube'), { m: G.mat(wx, yT + hS + Math.sin(th) * rm, Zp + (rng() - 0.5) * 0.08, 1.1 + rng() * 0.12, 0.97, 1.7 + (rng() - 0.5) * 0.16, 0, 0, s < 0 ? th : Math.PI - th), c: pj(), uvm: 'monde', s: 0.5, def: defA });
        }
        const yK = yT + hS + 3.6;
        L.get('pierre').add(G.base('cube'), { m: G.mat(M, yK + 0.6, Zp, 1.25, 1.9, 2.0), c: pi, uvm: 'monde', s: 0.5, def: defA });
        L.get('pierre').add(G.base('sphereB'), { m: G.mat(M, yK + 0.5, Zp - 1.0, 0.5, 0.62, 0.3), c: [0.4, 0.41, 0.47], def: defA });
        L.get('pierre').add(G.base('cone8'), { m: G.mat(M, yK + 0.42, Zp - 1.3, 0.1, 0.34, 0.1, -Math.PI / 2, 0, 0), c: [0.4, 0.41, 0.47], def: defA });
        for (const s of [-1, 1]) L.get('pierre').add(G.base('cube'), { m: G.mat(M + s * 0.72, yK + 2.25, Zp, 0.28, 1.5, 0.55), c: pi, def: defA });
        L.get('pierre').add(G.base('cube'), { m: G.mat(M, yK + 3.08, Zp, 2.0, 0.24, 0.85), c: pi, def: defA });
        L.get('tuiles').add(G.base('pignon'), { m: G.mat(M, yK + 3.2, Zp, 2.4, 1.0, 1.2), c: [0.24, 0.22, 0.3], uvm: 'monde', s: 0.7, def: defA });
        L.get('metal').add(G.base('cone8'), { m: G.mat(M, yK + 4.2 + 0.8, Zp, 0.07, 1.6, 0.07), c: NOIR, def: v => { const k = clamp((v.y - yK - 4.2) / 1.6, 0, 1); v.x -= k * k * 0.5; defA(v); } });
        for (let i = 0; i < 11; i++) { const x = (rng() - 0.5) * 4, l = 0.3 + rng() * 0.9; L.get('verni').add(G.base('glacon'), { m: G.mat(M + x, yT + haut(x) - l / 2 + 0.03, Zp + (rng() < 0.5 ? -0.6 : 0.6), 0.06, -l, 0.06), c: [0.62, 0.74, 0.86], def: defA }); }
        // ---- la cloche du clocheton (elle sonne quand on passe le seuil) ----
        const LB = G.Lots();
        LB.get('verni').add(geo('cloche', () => new THREE.LatheGeometry([[0.44, -0.88], [0.47, -0.84], [0.38, -0.76], [0.27, -0.5], [0.22, -0.2], [0.15, -0.05], [0.05, 0]].map(q => new THREE.Vector2(q[0], q[1])), 10)), { m: G.mat(0, 0, 0, 1, 1, 1), c: [0.5, 0.36, 0.14] });
        LB.get('metal').add(G.base('ico'), { m: G.mat(0, -0.86, 0, 0.1, 0.12, 0.1), c: NOIR });
        LB.get('metal').add(G.base('cube'), { m: G.mat(0, 0.06, 0, 1.3, 0.1, 0.1), c: NOIR });
        const cloche = maill(LB); _a.set(M, yK + 2.86, Zp); defA(_a); cloche.position.copy(_a); groupe.add(cloche);
        // ---- boîte aux lettres (on ne sait jamais) ----
        L.get('bois').add(G.base('cyl6'), { m: G.mat(26.5, yT + 0.55, 20.1, 0.05, 1.1, 0.05, 0, 0, 0.08), c: [0.3, 0.24, 0.2] });
        L.get('verni').add(G.base('cube'), { m: G.mat(26.46, yT + 1.22, 20.1, 0.34, 0.26, 0.5, 0, 0.3, 0.08), c: [0.5, 0.08, 0.1] });
        L.get('verni').add(G.base('cyl8'), { m: G.mat(26.45, yT + 1.35, 20.1, 0.17, 0.5, 0.13, Math.PI / 2, 0.3, 0), c: [0.5, 0.08, 0.1] });
        L.get('emis').add(G.base('cube'), { m: G.mat(26.42, yT + 1.26, 19.83, 0.2, 0.03, 0.02, 0, 0.3, 0), c: [2.2, 1.8, 1.0] });
        // ---- les deux vantaux (pièces mobiles : ils s'ouvrent davantage quand on approche) ----
        const vantail = sg => {
          const L2 = G.Lots();
          for (let i = 0; i < 5; i++) {
            const xm = 0.23 + i * 0.46, h = haut(a - xm), k = 0.85 + ((i * 7) % 5) * 0.06;
            L2.get('bois').add(G.base('boite'), { m: G.mat(xm, h / 2, 0, 0.45, h, 0.2 + (i % 2) * 0.04), c: [0.3 * k, 0.225 * k, 0.19 * k], uvm: 'monde', s: 0.5, def: v => { if (v.y > h - 0.01) v.y = haut(a - v.x); } });
          }
          for (const y of [0.9, 3.3, 5.7]) { L2.get('metal').add(G.base('cube'), { m: G.mat(1.12, y, sg * 0.13, 2.24, 0.24, 0.07), c: NOIR }); L2.get('metal').add(G.base('cube'), { m: G.mat(1.12, y, -sg * 0.13, 2.24, 0.16, 0.05), c: NOIR }); L2.get('metal').add(G.base('ico'), { m: G.mat(2.2, y, sg * 0.15, 0.2, 0.3, 0.06), c: NOIR }); }
          L2.get('metal').add(G.base('boite'), { m: G.mat(2.3, haut(0) / 2, 0, 0.09, haut(0), 0.3), c: NOIR });
          L2.get('metal').add(G.base('tore'), { m: G.mat(1.85, 1.75, sg * 0.2, 0.26, 0.26, 0.2), c: [0.35, 0.3, 0.22] });
          L2.get('metal').add(G.base('sphereB'), { m: G.mat(1.85, 2.02, sg * 0.17, 0.09, 0.09, 0.09), c: [0.35, 0.3, 0.22] });
          const o = maill(L2); groupe.add(o); return o;
        };
        const vG = vantail(-1), vD = vantail(1);
        vG.position.set(M - a, yT, Zp - 0.95); vD.position.set(M + a, yT, Zp - 0.95);
        // ---- le jour éblouissant dans l'ogive (matière sur mesure : sa couleur change) ----
        const nx = 6, ny = 7, pos = [], col = [], ix = [];
        for (let j = 0; j <= ny; j++) for (let i = 0; i <= nx; i++) { const u = i / nx, x = (u - 0.5) * 2 * a; _a.set(M + x, yT + j / ny * haut(x), Zp); defA(_a); pos.push(_a.x, _a.y, _a.z); const k = (1 - 0.3 * Math.abs(u - 0.5) * 2) * (1 - 0.3 * j / ny); col.push(k, k, k); }
        for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) { const p = j * (nx + 1) + i; ix.push(p, p + 1, p + nx + 1, p + 1, p + nx + 2, p + nx + 1); }
        const gJ = new THREE.BufferGeometry(); gJ.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); gJ.setAttribute('color', new THREE.Float32BufferAttribute(col, 3)); gJ.setIndex(ix); gJ.computeBoundingSphere(); gJ.boundingSphere.radius += 26;
        const matJ = MAT.patch(new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false, side: THREE.DoubleSide }), { cle: 'porteJour' });
        const jour = new THREE.Mesh(gJ, matJ); jour.userData.matPropre = true; groupe.add(jour);
        // ---- lueurs de la porte (LD) et lanternes du lieu (LL) : lots à part, reteintés au passage du seuil ----
        const LD = G.Lots(), LL = G.Lots(), pl = planF(4, 4), gris = k => [k, k, k];
        const flaque = (Lx, x, z, r, k) => Lx.get('flaque').add(pl, { m: G.mat(x, 0, z, r * 2, r * 2, 1, -Math.PI / 2, 0, 0), c: gris(k), def: v => { v.y = hsol(v.x, v.z) + 0.05; } });
        G.halo(LD, M, yT + 4.2, Zp - 1.2, gris(0.42), 13); G.halo(LD, M, yT + 8, Zp - 0.9, gris(0.26), 9); G.halo(LD, M, yT + 4.2, Zp + 1.2, gris(0.36), 12);
        flaque(LD, M, Zp - 2.7, 3.4, 0.75); flaque(LD, M, Zp - 7, 5, 0.5); flaque(LD, M, Zp - 12.5, 6, 0.28); flaque(LD, M, Zp + 3.6, 4.6, 0.5);
        LD.get('flaque').add(planF(2, 4), { m: G.mat(M, yT + 5.2, Zp - 1.25, 7.5, 15, 1, 0, Math.PI, 0), c: gris(0.5) });
        LD.get('flaque').add(planF(2, 4), { m: G.mat(M, yT + 5.2, Zp + 1.25, 7.5, 15, 1), c: gris(0.4) });
        const lant = (x, y, z, s) => {
          L.get('metal').add(G.base('cone4'), { m: G.mat(x, y + 0.24 * s, z, 0.22 * s, 0.2 * s, 0.22 * s), c: NOIR });
          L.get('metal').add(G.base('cube'), { m: G.mat(x, y - 0.22 * s, z, 0.24 * s, 0.05 * s, 0.24 * s), c: NOIR });
          LL.get('emis').add(G.base('cube'), { m: G.mat(x, y, z, 0.18 * s, 0.38 * s, 0.18 * s), c: gris(3.1) });
          G.halo(LL, x, y, z, gris(0.34), 3.1 * s); flaque(LL, x, z, 3.3 * s, 0.42);
        };
        for (const p of P.porteLant) {
          const y = P.sol(p.x, p.z), h = p.h, ph = p.x * 3 + p.z;
          L.get('metal').add(G.base('cyl8'), { m: G.mat(p.x, y + h / 2 - 0.2, p.z, 0.05, h + 0.4, 0.05), c: NOIR, def: v => { const k = (v.y - y) / h; v.x += Math.sin(k * 3 + ph) * 0.09 * k - p.s * k * k * 0.3; } });
          L.get('metal').add(G.base('cube'), { m: G.mat(p.x - p.s * 0.6, y + h - 0.03, p.z, 0.75, 0.05, 0.05, 0, 0, p.s * 0.12), c: NOIR });
          L.get('metal').add(G.base('boucle'), { m: G.mat(p.x - p.s * 0.52, y + h - 0.12, p.z, p.s * 0.5, 0.5, 0.5), c: NOIR });
          lant(p.x - p.s * 0.9, y + h - 0.42, p.z, 1);
        }
        for (const s of [-1, 1]) { // deux grosses lanternes aux piédroits + les yeux de la clef
          L.get('metal').add(G.base('cube'), { m: G.mat(M + s * (a + 0.75), yT + 4.3, Zp - 1.3, 0.07, 0.07, 1.0), c: NOIR });
          lant(M + s * (a + 0.75), yT + 3.85, Zp - 1.7, 1.5);
          _a.set(M + s * 0.19, yK + 0.62, Zp - 1.27); defA(_a); LL.get('emis').add(G.base('sphereB'), { m: G.mat(_a.x, _a.y, _a.z, 0.07, 0.05, 0.04), c: gris(2.6) });
        }
        const gLD = maill(LD), gLL = maill(LL); groupe.add(gLD, gLL);
        for (const gr of [gLD, gLL]) for (const m of gr.children) m.userData.base = Float32Array.from(m.geometry.attributes.color.array);
        const teinter = (gr, r, g, b) => { for (let k = 0; k < gr.children.length; k++) { const at = gr.children[k].geometry.attributes.color, v = at.array, o = gr.children[k].userData.base; for (let i = 0; i < v.length; i += 3) { v[i] = o[i] * r; v[i + 1] = o[i + 1] * g; v[i + 2] = o[i + 2] * b; } at.needsUpdate = true; } };
        const PAL = [[1, 0.62, 0.27], [0.25, 0.8, 1], [0.78, 0.32, 1], [0.3, 1, 0.45], [1, 0.3, 0.55]], nP = PAL.length;
        let pal = 0, kT = 0.999, cote = 0, tCl = -99, ang = 0.62, jr = 1, jg = 1, jb = 1;
        const maj = () => { // teintes courantes : lanternes = PAL[pal] ; porte = PAL[pal + 1] (la couleur de « l'autre côté »)
          const k = sstep(0, 1, kT), A0 = PAL[(pal + nP - 1) % nP], A1 = PAL[pal], B1 = PAL[(pal + 1) % nP];
          const lr = lerp(A0[0], A1[0], k), lg = lerp(A0[1], A1[1], k), lb = lerp(A0[2], A1[2], k), dr = lerp(A1[0], B1[0], k), dg = lerp(A1[1], B1[1], k), db = lerp(A1[2], B1[2], k);
          teinter(gLL, lr, lg, lb); teinter(gLD, dr, dg, db);
          P.porteCL[0] = lr; P.porteCL[1] = lg; P.porteCL[2] = lb; P.porteCD[0] = dr; P.porteCD[1] = dg; P.porteCD[2] = db;
          jr = 0.5 + dr * 0.5; jg = 0.5 + dg * 0.5; jb = 0.5 + db * 0.5;
        };
        maj(); kT = 1;
        bilan('grande_porte', L, n0);
        return [(t, dt, ctx) => {
          // les vantaux s'écartent à l'approche
          ang += (0.6 + 0.4 * sstep(27, 13, ctx.d) - ang) * Math.min(1, dt * 1.1);
          const o = ang + Math.sin(t * 0.43) * 0.012; vG.rotation.y = o; vD.rotation.y = Math.PI - o;
          // passage du seuil : la cloche sonne, tout change de couleur
          const c = ctx.jz < Zp ? -1 : 1;
          if (cote !== 0 && c !== cote && Math.abs(ctx.jx - M) < a + 0.2 && Math.abs(ctx.jz - Zp) < 2.5) { pal = (pal + 1) % nP; kT = 0; tCl = t; ctx.son('cloche'); }
          cote = c;
          if (kT < 1) { kT = Math.min(1, kT + dt / 1.8); maj(); }
          const s = t - tCl, fl = 2.3 * (1 + 0.07 * Math.sin(t * 1.9) + 0.04 * Math.sin(t * 5.3)) + (1 - kT) * 2 + ctx.eclat * 1.2;
          matJ.color.setRGB(jr * fl, jg * fl, jb * fl);
          cloche.rotation.z = s < 14 ? Math.sin(s * 5.2) * 0.75 * Math.exp(-s * 0.32) : Math.sin(t * 0.7) * 0.02;
        }];
      },
    },

    // ================= 3. L'ÉTOILE TOMBÉE =================
    etoile_tombee: {
      nom: 'L’Étoile Tombée',
      desc: 'Elle visait la cime d’un sapin et l’a manquée de trois rues. Écoute : sous le verre fêlé, elle respire encore.',
      maisons: 0, sansPlace: true, lampes: 0, route: 0.8, humeur: 'neige',
      relief(lx, lz, t) { // cratère : cuvette de 4 m, bourrelet irrégulier, brèche côté sud (l'entrée)
        const dx = lx - M, dz = lz - M, r = Math.hypot(dx, dz); if (r >= 19) return t;
        let rim = sstep(8, 13.2, r) * (1 - sstep(13.2, 19, r)) * (0.7 + 0.6 * NZ.vn(lx * 0.45, lz * 0.45, 7));
        if (dz < 0) rim *= 1 - 0.85 * Math.exp(-dx * dx / 9);
        return t - 4.1 * (1 - sstep(2.2, 12.5, r)) + 1.5 * rim;
      },
      plan(P, rng) {
        const cx = M + 0.6, cz = M + 0.4, yF = P.sol(cx, cz);
        P.cyl(cx, cz, 2.9);
        P.lum(cx, yF + 2.6, cz - 3.6, [0.55, 0.85, 1], 1.7, 18); P.lum(cx, yF + 7.5, cz, [0.5, 0.75, 1], 1.0, 24);
        P.etRoches = [];
        for (let i = 0; i < 30; i++) {
          const an = rng() * TAU, r = 11.5 + rng() * 5.5, x = M + Math.cos(an) * r, z = M + Math.sin(an) * r, sz = 0.35 + rng() * rng() * 1.4;
          if ((Math.abs(x - M) < 2.4 && z < M) || !P.libre(x, z, sz)) continue;
          P.etRoches.push({ x, z, s: sz, a: rng() * 6, an }); if (sz > 0.75) P.cyl(x, z, sz * 0.7);
        }
        for (const [x, z, h] of [[11.5, 6, 8], [38, 9, 10], [6, 34, 9], [37, 37, 7]]) if (P.libre(x, z, 1.5)) { P.sapins.push({ x, z, h, illum: false }); P.cyl(x, z, 0.5); }
        lampesRues(P, [8.5, 35.5], [22], [22], [22]);
      },
      construire(L, P, rng, groupe) {
        const cx = M + 0.6, cz = M + 0.4, yF = P.sol(cx, cz), sol = P.sol, n0 = nTri(L);
        // ---- sol brûlé (matière sur mesure, sans neige) calé sur le maillage du terrain, noir au centre, neige sale au bord ----
        const LR = new G.Lot(), ids = new Map(), pos = [], ix = [], Rs = (x, z) => 9.3 + 3.2 * NZ.vn(Math.atan2(z - M, x - M) * 2.2 + 9, 0.5, 31);
        const som = (x, z) => { const k = x * 64 + z; let i = ids.get(k); if (i === undefined) { i = pos.length / 3; ids.set(k, i); pos.push(x, sol(x, z) + 0.07, z); } return i; };
        const dedans = (x, z) => Math.hypot(x - M, z - M) < Rs(x, z);
        for (let z = 8; z < 36; z++) for (let x = 8; x < 36; x++) {
          if (dedans(x + 0.33, z + 0.33)) ix.push(som(x, z), som(x, z + 1), som(x + 1, z));
          if (dedans(x + 0.67, z + 0.67)) ix.push(som(x, z + 1), som(x + 1, z + 1), som(x + 1, z));
        }
        const gS = new THREE.BufferGeometry(); gS.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); gS.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(pos.length / 3 * 2), 2)); gS.setIndex(ix); gS.computeVertexNormals();
        LR.add(gS, { c: [0.6, 0.66, 0.78], ao: v => { const k = Math.hypot(v.x - M, v.z - M) / Rs(v.x, v.z); return 0.06 + 0.94 * sstep(0.5, 1.05, k) * sstep(0.5, 1.05, k); } });
        for (let i = 0; i < 22; i++) { // roches nues dans la cuvette
          const an = rng() * TAU, r = 3.4 + rng() * 6, x = M + Math.cos(an) * r, z = M + Math.sin(an) * r, sz = 0.25 + rng() * rng() * 0.9;
          LR.add(G.base('ico'), { m: G.mat(x, sol(x, z) + sz * 0.2, z, sz * (0.7 + rng() * 0.6), sz * (0.5 + rng() * 0.5), sz * (0.7 + rng() * 0.6), rng() * 3, rng() * 3, rng() * 3), c: [0.09, 0.09, 0.11] });
        }
        const gR = LR.geometrie(); gR.boundingSphere.radius += 26;
        const matR = MAT.patch(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.5, metalness: 0.05, envMapIntensity: 0.7 }), { cle: 'etoileRoche' });
        const roche = new THREE.Mesh(gR, matR); roche.receiveShadow = true; roche.userData.matPropre = true; groupe.add(roche);
        // flaque d'eau de fonte regelée au fond, grosses roches enneigées sur le bourrelet
        L.get('glace').add(geo('disque24', () => { const g = new THREE.CircleGeometry(1, 24); g.rotateX(-Math.PI / 2); return g; }), { m: G.mat(cx, yF + 0.22, cz, 5.2, 1, 5.2), c: [1, 1, 1], uvm: 'monde', s: 0.15 });
        for (const q of P.etRoches) {
          const y = sol(q.x, q.z), sz = q.s;
          L.get('pierre').add(G.base(sz > 0.9 ? 'cube' : 'ico'), { m: G.mat(q.x, y + sz * 0.25, q.z, sz * 1.1, sz * (sz > 0.9 ? 0.55 : 0.8), sz * 1.5, 0.5 + rng() * 0.4, -q.an + Math.PI / 2, rng() * 0.5), c: [0.2, 0.2, 0.24], uvm: 'monde', s: 0.6 });
        }
        // ---- l'étoile de verre (étoile à 14 branches, facettes peintes dans les couleurs des sommets) ----
        const sp = [], sc = [], T = new THREE.Matrix4().compose(V3(cx, yF + 1.0, cz), new THREE.Quaternion().setFromEuler(new THREE.Euler(0.38, 0.6, -0.42)), V3(1.45, 1.45, 1.45));
        const Ld = V3(0.25, 0.75, -0.6).normalize(), A = V3(), B = V3(), Cc = V3(), N = V3(), ctr = V3(cx, yF + 1.0, cz);
        const tri = (p0, p1, p2, c0, c1, c2, plat) => { // un triangle, tourné vers l'extérieur, ombré selon sa pente
          A.subVectors(p1, p0); B.subVectors(p2, p0); N.crossVectors(A, B).normalize(); Cc.copy(p0).add(p1).add(p2).multiplyScalar(1 / 3).sub(ctr);
          const k = plat ? 1 : 0.5 + 0.6 * Math.abs(N.dot(Ld)) + (N.dot(Cc) * Math.sign(N.dot(Cc)) > 0 ? 0 : 0);
          sp.push(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z, p2.x, p2.y, p2.z); sc.push(c0[0] * k, c0[1] * k, c0[2] * k, c1[0] * k, c1[1] * k, c1[2] * k, c2[0] * k, c2[1] * k, c2[2] * k);
        };
        const CR = [[1.9, 2.1, 2.3], [0.9, 1.5, 2.2], [0.36, 0.9, 1.9], [0.16, 0.48, 1.5]], FR = [0, 0.3, 0.62, 1], NOIRC = [0.01, 0.03, 0.08];
        const branche = (dx, dy, dz, n, l, w, b, coupe, M4, fissure, dim) => {
          const d = V3(dx, dy, dz).normalize(), u = V3().crossVectors(d, Math.abs(d.y) > 0.9 ? V3(1, 0, 0) : V3(0, 1, 0)).normalize(), v = V3().crossVectors(d, u), rings = [];
          const nr = coupe ? 2 : 3;
          for (let j = 0; j <= nr; j++) {
            const f = coupe ? j / 2 * coupe : FR[j], ring = [];
            for (let k = 0; k < n; k++) { const a = k / n * TAU + 0.4, rr = w * (1 - f), ax = b + (l - b) * f + (coupe && j === nr ? (k % 2 ? 0.25 : -0.1) : 0); ring.push(V3().copy(d).multiplyScalar(ax).addScaledVector(u, Math.cos(a) * rr).addScaledVector(v, Math.sin(a) * rr).applyMatrix4(M4)); }
            rings.push(ring);
          }
          const cl = j => { const c = CR[Math.min(3, coupe ? j : j)]; return dim ? [c[0] * dim, c[1] * dim, c[2] * dim] : c; };
          for (let j = 0; j < nr; j++) for (let k = 0; k < n; k++) {
            const k2 = (k + 1) % n; tri(rings[j][k], rings[j][k2], rings[j + 1][k2], cl(j), cl(j), cl(j + 1));
            if (coupe || j < nr - 1) tri(rings[j][k], rings[j + 1][k2], rings[j + 1][k], cl(j), cl(j + 1), cl(j + 1));
          }
          if (coupe) { const c = V3(); for (const q of rings[nr]) c.add(q); c.multiplyScalar(1 / n); const cc = [2.6, 2.6, 2.6]; for (let k = 0; k < n; k++) tri(rings[nr][k], rings[nr][(k + 1) % n], c, cc, cc, cc, true); }
          if (fissure) { // fêlure : ruban sombre en zigzag sur une facette, de la base vers la pointe
            const p0 = rings[0][0], p1 = rings[0][1], ap = rings[nr][0].clone().add(rings[nr][1]).multiplyScalar(0.5), mb = p0.clone().add(p1).multiplyScalar(0.5), lat = p1.clone().sub(p0).normalize();
            A.subVectors(p1, p0); B.subVectors(ap, p0); const nf = V3().crossVectors(A, B).normalize(); if (nf.dot(mb.clone().sub(V3().copy(d).multiplyScalar(b).applyMatrix4(M4))) < 0) nf.negate();
            let q0 = null, w0 = 0;
            for (let i = 0; i <= 6; i++) { const f = 0.04 + i / 6 * 0.8, q = mb.clone().lerp(ap, f).addScaledVector(lat, (i % 2 ? 0.22 : -0.18) * (1 - f) * (i === 0 ? 0 : 1)).addScaledVector(nf, 0.045), wd = 0.075 * (1 - f) + 0.02;
              if (q0) { const a0 = q0.clone().addScaledVector(lat, -w0), a1 = q0.clone().addScaledVector(lat, w0), b0 = q.clone().addScaledVector(lat, -wd), b1 = q.clone().addScaledVector(lat, wd); tri(a0, a1, b1, NOIRC, NOIRC, NOIRC, true); tri(a0, b1, b0, NOIRC, NOIRC, NOIRC, true); }
              q0 = q; w0 = wd; }
          }
        };
        const AX = [[0, 1, 0, 5.2, 0, 1], [1, 0, 0, 4.2, 0, 0], [-1, 0, 0, 3.6, 0.42, 0], [0, 0, 1, 3.8, 0, 0], [0, 0, -1, 4.4, 0, 1], [0, -1, 0, 2, 0, 0]];
        for (const q of AX) branche(q[0], q[1], q[2], 4, q[3], 0.66, 0.5, q[4], T, q[5]);
        let nd = 0; for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const sz of [-1, 1]) { const i = nd++; branche(sx, sy, sz, 3, sy > 0 ? [3.2, 2.5, 3.0, 2.6][i % 4] : 2, 0.62, 0.7, i === 5 ? 0.45 : 0, T, i === 3 || i === 7); }
        for (const [x, z, a, l] of [[cx - 5.2, cz - 2.6, 0.7, 1.7], [cx + 4.4, cz - 4.2, 2.6, 1.3], [cx + 2.2, cz + 5.2, 4.4, 1.5]]) { // pointes cassées, tombées plus loin
          const M4 = new THREE.Matrix4().compose(V3(x, sol(x, z) + 0.28, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(1.35, a, 0.2)), V3(1, 1, 1)); branche(0, 1, 0, 3, l, 0.36, -0.2, 0, M4, false, 0.55);
        }
        const gE = new THREE.BufferGeometry(); gE.setAttribute('position', new THREE.Float32BufferAttribute(sp, 3)); gE.setAttribute('color', new THREE.Float32BufferAttribute(sc, 3)); gE.computeBoundingSphere(); gE.boundingSphere.radius += 26;
        const matE = MAT.patch(new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false, side: THREE.DoubleSide }), { cle: 'etoileVerre' });
        const etoile = new THREE.Mesh(gE, matE); etoile.userData.matPropre = true; groupe.add(etoile);
        // halos de l'étoile (ils pulsent avec elle) et lueur au fond de la cuvette
        const LH = G.Lots(); G.halo(LH, cx, yF + 2.6, cz, [0.1, 0.17, 0.26], 13); G.halo(LH, cx, yF + 5, cz - 1, [0.06, 0.12, 0.2], 8); G.halo(LH, cx - 4.5, yF + 2.4, cz + 0.8, [0.05, 0.1, 0.17], 5);
        const gH = maill(LH); groupe.add(gH); const hA = gH.children[0].geometry.attributes.color, hB = Float32Array.from(hA.array);
        L.get('flaque').add(planF(12, 12), { m: G.mat(cx, 0, cz, 25, 25, 1, -Math.PI / 2, 0, 0), c: [0.1, 0.19, 0.3], def: v => { v.y = sol(v.x, v.z) + 0.13; } });
        fumee(groupe, [V3(cx - 2.6, yF + 0.4, cz - 2.2), V3(cx + 2.8, yF + 0.4, cz - 1.2), V3(cx + 0.5, yF + 0.4, cz + 3.2), V3(cx - 3.4, yF + 0.5, cz + 2)], 6);
        // ---- éclats qui flottent et tournent au-dessus ----
        const anneaux = [], seuls = [], eclatM = (L2, x, y, z, sz, c) => L2.get('emis').add(G.base('ico'), { m: G.mat(x, y, z, sz * 0.26, sz, sz * 0.2, rng() * 3, rng() * 3, rng() * 3), c });
        for (let g = 0; g < 3; g++) {
          const L2 = G.Lots(), R0 = 2.6 + g * 1.5, nb = 5 + g;
          for (let i = 0; i < nb; i++) { const a = i / nb * TAU + rng() * 0.6, r = R0 + (rng() - 0.5) * 1.2, y = (rng() - 0.5) * 1.6, sz = 0.3 + rng() * 0.45; eclatM(L2, Math.cos(a) * r, y, Math.sin(a) * r, sz, [1.0 + rng() * 0.5, 1.9 + rng() * 0.4, 3.0]); if (i % 2 === 0) G.halo(L2, Math.cos(a) * r, y, Math.sin(a) * r, [0.07, 0.13, 0.22], 2.2); }
          const o = maill(L2); o.position.set(cx, yF + 8 + g * 1.7, cz); o.userData.y = o.position.y; o.userData.w = (g % 2 ? -1 : 1) * (0.16 - g * 0.035); groupe.add(o); anneaux.push(o);
        }
        for (let i = 0; i < 4; i++) { const L2 = G.Lots(); eclatM(L2, 0, 0, 0, 0.85 + i * 0.12, [1.5, 2.3, 3.2]); G.halo(L2, 0, 0, 0, [0.1, 0.18, 0.3], 3.2); const o = maill(L2); groupe.add(o); seuls.push(o); }
        bilan('etoile_tombee', L, n0, ix.length / 3 + sp.length / 9 + 22 * 8);
        let ph = 0, tCr = -99, pres = false;
        return [(t, dt, ctx) => {
          ph += dt * (0.9 + 1.7 * sstep(24, 5, ctx.d));                    // elle « respire » plus vite quand on approche
          const v = 0.62 + 0.36 * (0.5 + 0.5 * Math.sin(ph)) * (0.75 + 0.25 * Math.sin(ph * 0.37 + 1)) + ctx.eclat * 0.9, v2 = v * v;
          matE.color.setScalar(v);
          for (let i = 0; i < hB.length; i++) hA.array[i] = hB[i] * v2; hA.needsUpdate = true;
          const ec = 1 + ctx.eclat * 0.6;
          for (let i = 0; i < 3; i++) { const o = anneaux[i]; o.rotation.y = t * o.userData.w + i * 2; o.rotation.x = Math.sin(t * 0.21 + i * 2.1) * 0.12; o.position.y = o.userData.y + Math.sin(t * 0.5 + i * 2) * 0.4 + ctx.eclat * 0.9; o.scale.set(ec, 1, ec); }
          for (let i = 0; i < 4; i++) { const o = seuls[i], a = t * (0.11 + i * 0.03) * (i % 2 ? -1 : 1) + i * 1.7, r = (3.4 + i * 1.1) * ec; o.position.set(cx + Math.cos(a) * r, yF + 6.2 + i * 1.5 + Math.sin(t * 0.6 + i) * 0.5, cz + Math.sin(a) * r); o.rotation.x = t * (0.5 + i * 0.13); o.rotation.z = t * 0.37 + i; }
          const pr = ctx.d < 7.5; if (pr && !pres && t - tCr > 40) { tCr = t; ctx.son('glace_craque'); } pres = pr;
        }];
      },
    },
  });
})();
