/* ===================== LIEUX — lot B =====================
   Merveilles : horloger, labyrinthe, geant, marches_givre, serre, phare. Blocs : verger, chapelle, terrasse, manoir.
   Même contrat que 18_reperes.js / 18a_blocs.js (voir briefs/contenu.txt). */
(() => {
  const C = MONDE.C, M = C / 2, G = GEO;
  const maill = REPERES_OUTILS.maill;
  const PI = Math.PI, NOIR = [0.15, 0.15, 0.17], GIVRE = [0.62, 0.74, 0.86];
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  // ---- géométries sur mesure : index, normales et uv garantis ; mises en cache par clé ----
  const fini = g => {
    if (!g.index) { const n = g.attributes.position.count, ix = new Uint32Array(n); for (let i = 0; i < n; i++) ix[i] = i; g.setIndex(new THREE.BufferAttribute(ix, 1)); }
    if (!g.attributes.normal) g.computeVertexNormals();
    if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
    return g;
  };
  const formes = {};
  const forme = (k, f) => formes[k] || (formes[k] = fini(f()));
  const F = {
    pyr: () => forme('pyr', () => { const g = new THREE.CylinderGeometry(0, 1, 1, 4, 1); g.rotateY(PI / 4); return g; }),      // pyramide basse (12 triangles)
    disque: () => forme('disque', () => new THREE.CircleGeometry(1, 16)),                                                      // disque face à +z (cadrans)
    tamb: () => forme('tamb', () => { const g = new THREE.CylinderGeometry(1, 1, 1, 12, 1); g.rotateX(PI / 2); return g; }),   // tambour d'axe z
    tamb8: () => forme('tamb8', () => { const g = new THREE.CylinderGeometry(1, 1, 1, 8, 1); g.rotateX(PI / 2); return g; }),
    disque10: () => forme('disque10', () => new THREE.CircleGeometry(1, 10)),
    fleche: () => forme('fleche', () => { const g = new THREE.CylinderGeometry(0, 1, 1, 4, 10); g.rotateY(PI / 4); return g; }),              // flèche de toit à 4 pans (assez de niveaux pour se tordre)
    boule: () => forme('boule', () => new THREE.SphereGeometry(1, 6, 4)),
    grosse: () => forme('grosse', () => new THREE.SphereGeometry(1, 26, 16)),
    cyl5: () => forme('cyl5', () => new THREE.CylinderGeometry(0.6, 1, 1, 5, 1, true)),                                         // branche légère (10 triangles)
    cyl4: () => forme('cyl4', () => new THREE.CylinderGeometry(0.55, 1, 1, 4, 1, true)),
    cyl3: () => forme('cyl3', () => new THREE.CylinderGeometry(0.3, 1, 1, 3, 1, true)),
  };
  // ---- lampadaires de trottoir posés à la main (fiche avec `lampes: 0`) : l'entrée sud reste dégagée, budget maîtrisé ----
  function trottoir(P, rng, sud, nord, est, ouest) {
    const o = MONDE.RUE + 0.35, j = () => (rng() - 0.5) * 2, p = (x, z, a) => { if (P.libre(x, z, 0.4)) P.lampe(x, z, a); };
    for (const x of sud || []) p(x + j(), o, PI / 2);
    for (const x of nord || []) p(x + j(), C - o, -PI / 2);
    for (const z of est || []) p(C - o, z + j(), 0);
    for (const z of ouest || []) p(o, z + j(), PI);
  }
  // ---- pièce étirée d'un point A à un point B (barreaux, branches, cordes) ----
  const _h = V(0, 1, 0), _d = V(0, 0, 0), _q = new THREE.Quaternion();
  function barre(L, k, a, b, ep, c, o) {
    _d.set(b[0] - a[0], b[1] - a[1], b[2] - a[2]); const l = _d.length(); _d.multiplyScalar(1 / l); _q.setFromUnitVectors(_h, _d);
    const m = new THREE.Matrix4().compose(V((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2), _q, V(ep, l, (o && o.ep2) || ep));
    L.get(k).add((o && o.g) || G.base('cube'), Object.assign({ m, c }, o));
  }
  // ---- petite lanterne (y = dessous de la cage) : fer, verre lumineux, halo ----
  function lanterne(L, x, y, z, s, col, o) {
    o = o || {};
    L.get('emis').add(G.base('cube'), { m: G.mat(x, y + 0.2 * s, z, 0.24 * s, 0.34 * s, 0.24 * s), c: col, w: o.w, def: o.def });
    L.get('metal').add(F.pyr(), { m: G.mat(x, y + 0.48 * s, z, 0.25 * s, 0.22 * s, 0.25 * s), c: NOIR, w: o.w, def: o.def });
    L.get('metal').add(G.base('cube'), { m: G.mat(x, y + 0.01 * s, z, 0.3 * s, 0.05 * s, 0.3 * s), c: NOIR, w: o.w, def: o.def });
    G.halo(L, x, y + 0.2 * s, z, [col[0] * 0.09, col[1] * 0.09, col[2] * 0.09], o.halo || 2.2 * s, { w: o.w, def: o.def });
  }
  // ---- roue dentée dans le plan XY (axe z) : N dents, rayon extérieur r ; `ep` = épaisseur (0 = silhouette plate) ----
  function roue(N, r, ep) {
    const sh = new THREE.Shape(), da = PI * 2 / N, rr = r - Math.min(0.2, r * 0.16);
    for (let i = 0; i < N; i++) for (const [k, rad] of [[-0.3, rr], [-0.17, r], [0.17, r], [0.3, rr]]) { const a = (i + k) * da, x = Math.cos(a) * rad, y = Math.sin(a) * rad; if (!i && k === -0.3) sh.moveTo(x, y); else sh.lineTo(x, y); }
    sh.closePath();
    const tr = new THREE.Path(); tr.absarc(0, 0, rr * 0.74, 0, PI * 2, true); sh.holes.push(tr);
    if (!ep) return fini(new THREE.ShapeGeometry(sh, 5));
    const g = new THREE.ExtrudeGeometry(sh, { depth: ep, bevelEnabled: false, curveSegments: 5 }); g.translate(0, 0, -ep / 2); return fini(g);
  }
  // rayons et moyeu d'une roue (dans le même lot)
  function rayons(L, k, r, ep, c, o) {
    const rr = (r - Math.min(0.2, r * 0.16)) * 0.78;
    for (let i = 0; i < 2; i++) L.get(k).add(G.base('cube'), Object.assign({ m: G.mat(0, 0, 0, rr * 2, r * 0.13, ep * 0.7, 0, 0, i * PI / 2 + 0.4), c }, o));
    L.get(k).add(F.tamb(), Object.assign({ m: G.mat(0, 0, 0, r * 0.2, r * 0.2, ep * 1.5), c }, o));
  }

  Object.assign(REPERES, {
    // =====================================================================================================
    // 1. LA MAISON DE L'HORLOGER — haute maison tordue couverte de cadrans, rouages qui tournent, balancier, coucou
    // =====================================================================================================
    horloger: {
      nom: 'La Maison de l’Horloger',
      desc: 'Mille cadrans, aucune heure juste. L’horloger est sorti il y a cent ans ; ses rouages l’attendent en tournant.',
      maisons: [0, 0.5, 0.35, 0.35], lampes: 0, humeur: 'ombres',
      plan(P, rng) {
        const cx = M, cz = M + 1.5, y = P.sol(cx, cz);
        P.horl = { x: cx, z: cz };
        P.boite(cx, cz, 3.3, 3.0, 0);            // la maison
        P.boite(cx + 4.3, cz + 0.3, 1.6, 2.2, 0); // l'atelier en appentis
        P.cyl(cx - 4.6, cz - 1.5, 1.5, 1.9);     // grande roue abandonnée dans la neige
        trottoir(P, rng, [10.5, 33.5], [22], [22], [22]);
        P.lum(cx, y + 9, cz - 7, [1, 0.78, 0.45], 2.0, 16);
        P.lum(cx - 1, y + 18, cz - 7.5, [1, 0.85, 0.55], 1.7, 15);
        P.lum(cx + 1.7, y + 2.4, cz - 4.4, [1, 0.7, 0.4], 1.2, 8);
        P.flaque(cx, cz - 5.5, 6.5, [0.45, 0.3, 0.13]); P.flaque(cx + 4.3, cz - 3.4, 2.6, [0.4, 0.26, 0.1]);
      },
      construire(L, P, rng, groupe) {
        const cx = P.horl.x, cz = P.horl.z, y0 = P.sol(cx, cz), w = G.monde(cx, y0, cz, PI), HT = 27;
        // Repère de la maison : façade vers +z (tournée vers le sud par w), tout est tordu / penché par `def`.
        const tors = y => 0.55 * clamp(y / HT, 0, 1);
        const def = v => { const t = clamp(v.y / HT, 0, 1), a = 0.55 * t, c = Math.cos(a), s = Math.sin(a), x = v.x, z = v.z; v.x = x * c - z * s + 2.6 * t * t + Math.sin(t * 7) * 0.45; v.z = x * s + z * c + 1.4 * t * t; };
        const add = (k, g, m, c, o) => L.get(k).add(typeof g === 'string' ? G.base(g) : g, Object.assign({ m, c, def, w }, o));
        const maison = new THREE.Group(); maison.position.set(cx, y0, cz); maison.rotation.y = PI; groupe.add(maison);
        const poser = (o, x, y, z, ry) => { const p = V(x, y, z); def(p); o.position.copy(p); o.rotation.y = (ry || 0) - tors(y); maison.add(o); return o; };
        const cP = [0.6, 0.58, 0.6], cB = [0.25, 0.18, 0.15], cT = [0.3, 0.24, 0.36], cM1 = rng.p(P.pal.murs), cM2 = rng.p(P.pal.murs), LAITON = [0.52, 0.37, 0.15], CUIVRE = [0.44, 0.22, 0.12];
        // --- corps : quatre étages empilés de travers, la tête plus large que le cou ---
        add('pierre', 'boite', G.mat(0, 1.35, 0, 6.0, 5.7, 5.4), cP, { uvm: 'monde', s: 0.5, ao: v => 0.5 + 0.5 * sstep(-0.2, 1.6, v.y) });
        add('platre', 'boite', G.mat(0, 6.9, 0, 5.3, 5.4, 4.6), cM1, { uvm: 'monde', s: 0.4, ao: v => 1 - 0.3 * sstep(8.9, 9.6, v.y) });
        add('planche', 'boite', G.mat(0, 11.9, 0, 4.5, 4.6, 4.6), [0.5, 0.38, 0.32], { uvm: 'monde', s: 0.4, ao: v => 1 - 0.4 * sstep(13.2, 14.2, v.y) });
        add('platre', 'boite', G.mat(0, 16.8, 0, 5.7, 5.2, 5.3), cM2, { uvm: 'monde', s: 0.4, ao: v => 1 - 0.3 * sstep(18.6, 19.4, v.y) });
        for (const [y, sx, sz, e] of [[9.6, 5.5, 4.8, 0.2], [14.25, 5.95, 5.55, 0.26], [4.3, 5.5, 4.8, 0.16]]) add('bois', 'cube', G.mat(0, y, 0, sx, e, sz), cB, { uvm: 'monde', s: 0.6 });
        for (const sx of [-1, 1]) for (const sz of [-1, 1]) { add('bois', 'boite', G.mat(sx * 2.6, 6.9, sz * 2.25, 0.2, 5.4, 0.2), cB, {}); add('bois', 'boite', G.mat(sx * 2.8, 16.8, sz * 2.6, 0.2, 5.2, 0.2), cB, {}); }
        for (const sx of [-1, 1]) { add('bois', 'cube', G.mat(sx * 2.67, 6.9, 0, 0.08, 0.16, 6.2, 0.86, 0, 0), cB, {}); add('bois', 'cube', G.mat(sx * 2.67, 6.9, 0, 0.08, 0.16, 6.2, -0.86, 0, 0), cB, {}); }
        for (const x of [-2.3, -0.9, 0.9, 2.3]) add('bois', 'cube', G.mat(x, 13.85, 2.4, 0.22, 0.7, 0.55, 0.5, 0, 0), cB, {});
        // --- la fente : le mécanisme à nu, rougeoyant, avec ses rouages en ombres chinoises ---
        add('emis', 'plan', G.mat(0, 6.55, 2.37, 1.7, 2.7, 1), [1.0, 0.5, 0.14], {}); add('emis', 'plan', G.mat(0, 9.3, 2.37, 1.7, 2.8, 1), [0.8, 0.36, 0.1], {}); add('emis', 'plan', G.mat(0, 12.05, 2.37, 1.7, 2.7, 1), [0.55, 0.22, 0.06], {});
        for (const sx of [-1, 1]) add('bois', 'boite', G.mat(sx * 0.95, 9.3, 2.4, 0.22, 8.5, 0.2), cB, {});
        for (const y of [5.1, 13.5]) add('bois', 'cube', G.mat(0, y, 2.4, 2.2, 0.24, 0.24), cB, {});
        for (const y of [7.2, 9.3, 11.4]) add('unie', 'cube', G.mat(0, y, 2.43, 1.7, 0.07, 0.05), [0.02, 0.02, 0.02], {});
        for (const [x, y, N, r] of [[-0.25, 6.6, 9, 0.8], [0.4, 8.2, 7, 0.6], [-0.3, 10.5, 10, 0.88], [0.32, 12.2, 6, 0.52]]) { add('unie', roue(N, r, 0), G.mat(x, y, 2.42, 1, 1, 1, 0, 0, x * 3 + y), [0.02, 0.02, 0.02], {}); add('unie', 'cube', G.mat(x, y, 2.42, r * 1.3, r * 0.14, 0.02, 0, 0, y), [0.02, 0.02, 0.02], {}); }
        G.halo(L, 0, 7.4, 2.9, [0.16, 0.08, 0.025], 6, { def, w }); G.halo(L, 0, 11.2, 2.9, [0.1, 0.05, 0.015], 5, { def, w });
        // --- porte, fenêtres ---
        add('bois', 'cube', G.mat(-1.75, 1.3, 2.71, 1.4, 2.5, 0.14), cB.map(v => v * 0.7), {});
        add('porte', 'plan', G.mat(-1.75, 1.25, 2.79, 1.1, 2.2, 1), [1, 1, 1], {});
        add('pierre', 'cube', G.mat(-1.75, -0.05, 3.1, 1.9, 0.5, 0.8), [0.5, 0.5, 0.53], { uvm: 'monde' });
        lanterne(L, -0.85, 2.3, 2.95, 1, [3.2, 2.1, 0.9], { def, w });
        add('fenetre', 'plan', G.mat(1.55, 2.2, 2.78, 1.1, 1.4, 1), [2.5, 1.6, 0.7], { uvr: [0.5, 0.5, 1, 1] }); add('pierre', 'cube', G.mat(1.55, 1.42, 2.8, 1.4, 0.1, 0.34), cP, {}); add('bois', 'cube', G.mat(1.55, 2.2, 2.72, 1.3, 1.6, 0.08), cB, {});
        for (const [x, y, z, ry, st] of [[2.72, 6.4, -0.8, PI / 2, 0], [-2.72, 7.6, 0.9, -PI / 2, 2], [2.32, 11.6, 1.55, PI / 2, 1], [0.9, 7.2, -2.37, PI, 0], [-0.7, 11.8, -2.37, PI, 2]])
          add('fenetre', 'plan', G.mat(x, y, z, 0.85, 1.25, 1, 0, ry, 0), rng() < 0.7 ? P.pal.fenetre(rng) : [0.03, 0.035, 0.05], { uvr: [[0, 0.5, 0.5, 1], [0.5, 0.5, 1, 1], [0, 0, 0.5, 0.5]][st] });
        // --- à hauteur d'yeux : horloges de parquet oubliées dehors, enseigne en forme de montre ---
        for (const [x, z, ry, rz, h] of [[0.15, 3.15, 0.15, 0.05, 1], [2.75, 3.3, -0.5, -0.09, 1.12], [-3.05, 3.2, 0.3, 0.07, 0.9]]) {
          const wc = new THREE.Matrix4().multiplyMatrices(w, G.mat(x, -0.1, z, h, h, h, 0, ry, rz)), cb = [0.3, 0.2, 0.15], a = (k, g, m, c) => L.get(k).add(typeof g === 'string' ? G.base(g) : g, { m, c, w: wc });
          a('bois', 'cube', G.mat(0, 0.95, 0, 0.5, 1.9, 0.34), cb); a('bois', 'cube', G.mat(0, 2.2, 0, 0.64, 0.64, 0.4), cb); a('bois', F.pyr(), G.mat(0, 2.68, 0, 0.5, 0.34, 0.34), cb);
          a('cadran', F.disque10(), G.mat(0, 2.2, 0.21, 0.25, 0.25, 1), [1.3, 1.1, 0.8]); a('emis', 'plan', G.mat(0, 1.05, 0.175, 0.2, 1.0, 1), [0.9, 0.45, 0.14]); a('verni', F.boule(), G.mat(0.03, 0.75, 0.19, 0.09, 0.09, 0.03), LAITON);
        }
        add('metal', 'cube', G.mat(-1.75, 3.55, 3.0, 0.06, 0.06, 0.7), NOIR, {}); add('metal', 'cube', G.mat(-1.75, 3.33, 3.3, 0.03, 0.4, 0.03), NOIR, {});
        add('verni', F.tamb(), G.mat(-1.75, 2.75, 3.3, 0.46, 0.46, 0.14), LAITON, {}); add('cadran', F.disque(), G.mat(-1.75, 2.75, 3.38, 0.4, 0.4, 1), [1.4, 1.2, 0.85], {}); add('verni', 'cube', G.mat(-1.75, 3.26, 3.3, 0.14, 0.12, 0.1), LAITON, {});
        // --- cadrans : trois grands sur la tête, puis une pluie de petits partout ---
        const demi = y => y < 4.2 ? [3.0, 2.7] : y < 9.6 ? [2.65, 2.3] : y < 14.2 ? [2.25, 2.3] : [2.85, 2.65];
        const RY = [0, PI / 2, -PI / 2, PI];
        const cadran = (f, u, y, r, col, aig) => {
          const [hw, hd] = demi(y), ry = RY[f], cs = Math.cos(ry), sn = Math.sin(ry), prof = (f === 0 || f === 3) ? hd : hw;
          const px = o => cs * u + sn * (prof + o), pz = o => -sn * u + cs * (prof + o);
          add('bois', r > 0.7 ? F.tamb() : F.tamb8(), G.mat(px(0.06), y, pz(0.06), r * 1.12, r * 1.12, 0.2, 0, ry, 0), cB, {});
          add('cadran', r > 0.7 ? F.disque() : F.disque10(), G.mat(px(0.17), y, pz(0.17), r, r, 1, 0, ry, 0), col, {});
          if (aig) for (const [l, e] of [[r * 0.5, 0.11], [r * 0.78, 0.07]]) { const a = rng() * 6.283, ox = -Math.sin(a) * l / 2, oy = Math.cos(a) * l / 2; add('metal', 'cube', G.mat(px(0.2) + cs * ox, y + oy, pz(0.2) - sn * ox, r * e, l, 0.02, 0, ry, a), [0.05, 0.05, 0.06], {}); }
          if (r > 0.55 && col[0] > 0.5) { const p = V(px(0.6), y, pz(0.6)); G.halo(L, p.x, p.y, p.z, [col[0] * 0.09, col[1] * 0.08, col[2] * 0.06], r * 4.5, { def, w }); }
        };
        const YC = 16.6;
        cadran(0, 0, YC, 1.8, [1.5, 1.3, 1.0], false); cadran(1, 0, YC, 1.35, [1.2, 1.05, 0.8], true); cadran(2, 0, YC, 1.35, [1.2, 1.05, 0.8], true); cadran(3, 0, YC, 1.35, [0.8, 1.3, 1.1], true);
        const gr = [[3.1, 9.0, 2.0], [1.81, 11.76, 1.25], [-2.95, 6.4, 1.5], [-1.5, 8.2, 0.9]], poses = [[], [], [], []];
        for (let e = 0, n = 0; e < 240 && n < 24; e++) {
          const f = e % 5 === 4 ? 3 : e % 5 >= 2 ? e % 5 - 1 : 0, y = 1.2 + rng() * 17.6, r = rng() < 0.2 ? 0.75 + rng() * 0.3 : 0.28 + rng() * 0.36, [hw, hd] = demi(y), lim = ((f === 0 || f === 3) ? hw : hd) - r - 0.25;
          if (lim < 0.1) continue; const u = (rng() * 2 - 1) * lim;
          if (poses[f].some(q => Math.hypot(q[0] - u, q[1] - y) < q[2] + r + 0.14)) continue;
          if (Math.abs(y - 4.2) < r + 0.2 || Math.abs(y - 9.6) < r + 0.2 || Math.abs(y - 14.2) < r + 0.3 || y + r > 19.2) continue;   // pas à cheval sur deux étages
          if (Math.hypot(u, y - YC) < r + (f ? 1.6 : 2.1)) continue;
          if (f === 0 && ((Math.abs(u) < 1.2 + r && y > 4.6 && y < 14) || (u < -0.9 + r && y < 3.0 + r) || (u > 0.75 - r && y < 3.2 + r) || gr.some(q => Math.hypot(q[0] - u, q[1] - y) < q[2] * 0.75 + r))) continue;
          if (f === 2 && y < 5.2 + r) continue; // l'appentis cache ce bas de mur
          poses[f].push([u, y, r]); n++;
          const k = 0.5 + rng() * 0.9, h = rng();
          cadran(f, u, y, r, h < 0.12 ? [0.14, 0.13, 0.12] : h < 0.27 ? [0.55 * k, 1.35 * k, 1.05 * k] : [1.25 * k, 1.05 * k, 0.78 * k], true);
        }
        // --- toit en chapeau de sorcière, étoile de laiton, cheminée, stalactites, guirlandes ---
        const yT = 19.4, hP = 10.4;
        const defT = v => { const k = clamp((v.y - yT) / hP, 0, 1); v.x -= Math.pow(k, 2.3) * 4.8; v.z += Math.pow(k, 3) * 1.2; v.y -= Math.pow(k, 4) * 1.9; def(v); };
        add('bois', 'cube', G.mat(0, yT, 0, 6.5, 0.2, 6.1), cB, {});
        add('tuiles', F.fleche(), G.mat(0, yT + hP / 2, 0, 4.75, hP, 4.45), cT, { uvm: 'monde', s: 0.55, def: defT });
        add('metal', 'cone8', G.mat(0, yT + hP + 0.5, 0, 0.06, 1.3, 0.06), NOIR, { def: defT });
        add('emis', 'ico', G.mat(0, yT + hP + 1.3, 0, 0.3, 0.42, 0.12), [3.4, 2.6, 1.0], { def: defT }); G.halo(L, 0, yT + hP + 1.3, 0, [0.35, 0.26, 0.1], 4, { def: defT, w });
        add('brique', 'boite', G.mat(-1.7, 21.2, -1.0, 0.75, 4.2, 0.75), [0.8, 0.74, 0.72], { uvm: 'monde', s: 0.6 }); add('pierre', 'cube', G.mat(-1.7, 23.35, -1.0, 1.0, 0.18, 1.0), [0.5, 0.5, 0.5], {});
        for (let i = 0; i < 26; i++) { const l = 0.25 + rng() * 0.9, f = i % 3, u = (rng() * 2 - 1) * 2.8; add('verni', 'glacon', G.mat(f === 0 ? u : (f === 1 ? 2.95 : -2.95), 14.12 - l / 2, f === 0 ? 2.72 : u * 0.9, 0.05, -l, 0.05), GIVRE, {}); }
        for (let i = 0; i < 22; i++) { const l = 0.3 + rng() * 1.1, f = i % 3, u = (rng() * 2 - 1) * 3.1; add('verni', 'glacon', G.mat(f === 0 ? u : (f === 1 ? 3.2 : -3.2), yT - 0.1 - l / 2, f === 0 ? 3.0 : u * 0.92, 0.055, -l, 0.055), GIVRE, {}); }
        G.guirlande(L, [-2.9, 14.05, 2.8], [2.9, 14.05, 2.8], { couleurs: P.pal.guirlande, rng, creux: 0.4, pas: 0.4, def, w });
        G.guirlande(L, [-3.0, 4.15, 2.75], [3.0, 4.15, 2.75], { couleurs: P.pal.guirlande, rng, creux: 0.3, pas: 0.45, def, w });
        // --- atelier en appentis (côté x négatif), tuyau de poêle ---
        add('brique', 'boite', G.mat(-4.3, 1.0, -0.3, 2.9, 5.0, 4.1), [0.82, 0.76, 0.74], { uvm: 'monde', s: 0.5, ao: v => 0.55 + 0.45 * sstep(-0.2, 1.4, v.y) });
        add('tuiles', 'pignon', G.mat(-4.35, 3.45, -0.3, 3.5, 2.1, 4.7), cT, { uvm: 'monde', s: 0.6 });
        add('fenetre', 'plan', G.mat(-4.4, 1.9, 1.76, 1.3, 1.3, 1), [2.6, 1.7, 0.7], { uvr: [0, 0.5, 0.5, 1] }); add('pierre', 'cube', G.mat(-4.4, 1.18, 1.82, 1.6, 0.1, 0.3), cP, {});
        add('metal', 'cyl6', G.mat(-5.1, 5.6, -1.3, 0.16, 4.4, 0.16), [0.22, 0.2, 0.2], { def: v => { v.x += Math.sin(v.y * 1.3) * 0.18; def(v); } });
        add('metal', 'cone8', G.mat(-5.1, 8.0, -1.3, 0.4, 0.45, 0.4), [0.22, 0.2, 0.2], { def: v => { v.x += Math.sin(v.y * 1.3) * 0.18; def(v); } });
        for (let i = 0; i < 6; i++) L.get('neige').add(G.base('bosse'), { m: G.mat((rng() * 2 - 1) * 5.5, -0.05, 2.9 + rng() * 0.6, 0.7 + rng() * 0.8, 0.22 + rng() * 0.25, 0.5 + rng() * 0.4), c: [1, 1, 1], uvm: 'monde', w });
        // --- une grande roue abandonnée, à demi enfouie ---
        { const m = G.mat(4.6, 0.5, 1.5, 1, 1, 1, -PI / 2 + 0.34, 0, 0.3), c = [0.5, 0.33, 0.24]; L.get('metal').add(roue(20, 1.9, 0.22), { m, c, w }); for (let i = 0; i < 2; i++) L.get('metal').add(G.base('cube'), { m: G.mat(0, 0, 0, 2.7, 0.24, 0.16, 0, 0, i * PI / 2), c, w: new THREE.Matrix4().multiplyMatrices(w, m) }); }
        // --- ROUAGES qui tournent (pièces à part) ---
        const roues = [];
        const mk = (x, y, z, ry, N, r, col, phi, k) => { const L2 = G.Lots(), ep = 0.14 + r * 0.05; L2.get('verni').add(roue(N, r, ep), { c: col }); rayons(L2, 'verni', r, ep, col.map(v => v * 0.8)); const m = poser(maill(L2), x, y, z, ry); if (!ry) add('metal', 'cyl6', G.mat(x, y, z - 0.3, 0.09 + r * 0.03, 0.9, 0.09 + r * 0.03, PI / 2, 0, 0), NOIR, {}); const o = { m, x, y, N, r, phi, k }; roues.push(o); return o; };
        const engrene = (p, th, N, r, z, col) => { // roue qui s'engrène sur p dans la direction th : phase et vitesse déduites
          const dA = PI * 2 / p.N, dB = PI * 2 / N, dist = p.r + r - 0.2, fA = (((th - p.phi) / dA) % 1 + 1) % 1;
          return mk(p.x + Math.cos(th) * dist, p.y + Math.sin(th) * dist, z, 0, N, r, col, th + PI - dB * (0.5 - fA), -p.k * p.N / N);
        };
        const rA = mk(3.1, 9.0, 2.62, 0, 22, 2.0, LAITON, 2.0, 1), rB = engrene(rA, 2.0, 14, 1.25, 2.6, CUIVRE); engrene(rB, 2.75, 8, 0.75, 2.62, LAITON);
        const rD = mk(-2.95, 6.4, 2.62, 0, 16, 1.5, CUIVRE, 0.9, -1.2); engrene(rD, 0.9, 10, 0.9, 2.6, LAITON);
        mk(2.42, 12.1, -0.4, PI / 2, 12, 1.1, LAITON, 0, 1.6);
        // --- BALANCIER géant devant la fente ---
        const Lp = G.Lots();
        Lp.get('verni').add(G.base('cube'), { m: G.mat(0, -3.8, 0, 0.1, 7.6, 0.06), c: LAITON.map(v => v * 0.8) });
        Lp.get('verni').add(G.base('sphere'), { m: G.mat(0, -7.6, 0, 0.98, 0.98, 0.17), c: LAITON });
        Lp.get('cadran').add(F.disque(), { m: G.mat(0, -7.6, 0.18, 0.56, 0.56, 1), c: [1.3, 1.1, 0.8] });
        Lp.get('verni').add(F.tamb(), { m: G.mat(0, 0, 0, 0.22, 0.22, 0.5), c: CUIVRE });
        const pend = poser(maill(Lp), 0, 13.75, 3.05, 0);
        add('bois', 'cube', G.mat(0, 13.85, 2.75, 0.6, 0.4, 0.9), cB, {});
        // --- aiguilles du grand cadran ---
        const La = G.Lots(); La.get('metal').add(G.base('cube'), { m: G.mat(0, 0.45, 0, 0.17, 1.05, 0.04), c: [0.04, 0.04, 0.05] }); La.get('metal').add(F.tamb(), { m: G.mat(0, 0, 0, 0.16, 0.16, 0.08), c: [0.04, 0.04, 0.05] });
        const Lb = G.Lots(); Lb.get('metal').add(G.base('cube'), { m: G.mat(0, 0.68, 0, 0.1, 1.5, 0.04), c: [0.04, 0.04, 0.05] });
        const aigH = poser(maill(La), 0, YC, 2.86, 0), aigM = poser(maill(Lb), 0, YC, 2.9, 0);
        // --- COUCOU : une petite porte sous l'avant-toit, un oiseau au bout de sa planche ---
        add('bois', 'cube', G.mat(0, 18.55, 2.68, 1.25, 1.05, 0.12), cB, {}); add('unie', 'plan', G.mat(0, 18.5, 2.76, 0.92, 0.8, 1), [0.01, 0.01, 0.01], {});
        add('bois', 'pignon', G.mat(0, 19.0, 2.9, 1.6, 0.5, 0.6), cB, {});
        for (const sx of [-1, 1]) add('bois', 'cube', G.mat(sx * 0.62, 18.5, 2.95, 0.05, 0.8, 0.44, 0, sx * 0.5, 0), [0.4, 0.14, 0.12], {});
        const Lc = G.Lots(), cOis = [0.16, 0.22, 0.4];
        Lc.get('bois').add(G.base('cube'), { m: G.mat(0, -0.3, -1.1, 0.12, 0.08, 2.4), c: cB });
        Lc.get('verni').add(G.base('sphereB'), { m: G.mat(0, 0, 0, 0.3, 0.3, 0.44), c: cOis });
        Lc.get('verni').add(G.base('sphereB'), { m: G.mat(0, -0.06, 0.16, 0.25, 0.24, 0.3), c: [0.7, 0.2, 0.14] });
        Lc.get('verni').add(G.base('sphereB'), { m: G.mat(0, 0.3, 0.3, 0.2, 0.2, 0.2), c: cOis });
        Lc.get('emis').add(F.pyr(), { m: G.mat(0, 0.28, 0.58, 0.07, 0.26, 0.07, PI / 2, 0, 0), c: [3, 1.6, 0.3] });
        for (const sx of [-1, 1]) { Lc.get('emis').add(G.base('cube'), { m: G.mat(sx * 0.11, 0.36, 0.44, 0.05, 0.06, 0.05), c: [3, 2.6, 1.2] }); Lc.get('verni').add(G.base('cube'), { m: G.mat(sx * 0.31, 0.03, -0.02, 0.05, 0.26, 0.42, 0, 0, sx * 0.3), c: cOis }); }
        Lc.get('verni').add(G.base('cube'), { m: G.mat(0, 0.14, -0.48, 0.2, 0.04, 0.4, -0.5, 0, 0), c: cOis });
        const nid = poser(new THREE.Group(), 0, 18.5, 1.4, 0), bras = maill(Lc); bras.scale.setScalar(1.5); nid.add(bras);
        let ph = 0, boost = 0, cu = 0, cuT = 14, cuOut = 0, tSon = 30;
        return [(t, dt, ctx) => {
          boost += ((ctx.eclat > 0.25 ? 1 : 0) - boost) * Math.min(1, dt * 2.5); ph += dt * (1 + boost * 6);
          for (let i = 0; i < roues.length; i++) { const r = roues[i]; r.m.rotation.z = r.phi + r.k * ph * 0.28; }
          pend.rotation.z = Math.sin(t * 1.9) * 0.27;
          aigM.rotation.z = -ph * 0.4; aigH.rotation.z = -ph * 0.4 / 6 + 1;
          tSon += dt; cuT -= dt;
          if (cuOut <= 0 && (ctx.eclat > 0.8 || (cuT <= 0 && ctx.d < 45))) { cuOut = 4.4; cuT = 42; if (tSon > 18 && ctx.d < 45) { tSon = 0; ctx.son('carillon'); } }
          if (cuOut > 0) cuOut -= dt;
          const cible = cuOut > 0.6 ? 1 : 0; cu += (cible - cu) * Math.min(1, dt * (cible ? 10 : 3.5));
          bras.position.z = cu * 3.2; bras.rotation.x = Math.sin(t * 10) * 0.22 * cu;
        }];
      },
    },
  });
})();
