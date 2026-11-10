/* ===================== LIEUX — lot C =====================
   Merveilles : castelet, bibliotheque, orgues, dragon, statues, montgolfiere. Blocs : bonshommes, lavoir, luges. */
(() => {
  const C = MONDE.C, M = C / 2, G = GEO;
  const maill = REPERES_OUTILS.maill;
  const TAU = Math.PI * 2, NOIR = [0.15, 0.15, 0.17], OR = [0.85, 0.62, 0.22];
  const _h = new THREE.Vector3(0, 1, 0), _d = new THREE.Vector3(), _q = new THREE.Quaternion(), _p = new THREE.Vector3(), _s = new THREE.Vector3();
  // ---- formes maison (calculées une seule fois) ----
  const formes = {};
  const forme = (k, f) => { let g = formes[k]; if (!g) { g = formes[k] = f(); if (!g.index) g.setIndex([...Array(g.attributes.position.count).keys()]); } return g; };
  const gFil = () => forme('fil', () => new THREE.CylinderGeometry(1, 1, 1, 3, 1, true));           // corde (prisme à 3 pans)
  const gFanion = () => forme('fanion', () => { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute([-0.5, 0, 0, 0.5, 0, 0, 0, -1, 0], 3)); g.setAttribute('normal', new THREE.Float32BufferAttribute([0, 0, 1, 0, 0, 1, 0, 0, 1], 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute([0, 1, 1, 1, 0.5, 0], 2)); g.setIndex([0, 2, 1]); return g; });
  // barre (cylindre) du point a au point b : cordes, perches, montants. o.g = autre forme (axe y, hauteur 1)
  const barre = (L, mat, a, b, r, c, o) => {
    _d.set(b[0] - a[0], b[1] - a[1], b[2] - a[2]); const l = _d.length() || 1e-4; _d.multiplyScalar(1 / l); _q.setFromUnitVectors(_h, _d);
    const m = new THREE.Matrix4().compose(_p.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2), _q, _s.set(r, l, r));
    L.get(mat).add((o && o.g) || G.base('cyl6'), Object.assign({ m, c }, o));
  };
  // corde en chaînette de a à b, garnie de fanions triangulaires
  const fanions = (L, a, b, o) => {
    const n = Math.max(3, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]) / (o.pas || 0.8))), ry = -Math.atan2(b[2] - a[2], b[0] - a[0]), k = o.taille || 0.5;
    let p0 = a;
    for (let i = 1; i <= n; i++) {
      const t = i / n, p1 = [lerp(a[0], b[0], t), lerp(a[1], b[1], t) - Math.sin(t * Math.PI) * (o.creux || 0.6), lerp(a[2], b[2], t)];
      barre(L, 'unie', p0, p1, 0.02, [0.12, 0.1, 0.1], { w: o.w, g: gFil() });
      L.get('tissu').add(gFanion(), { m: G.mat((p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2 - 0.02, (p0[2] + p1[2]) / 2, k, k * 1.4, 1, o.rng.r(-0.25, 0.25), ry, o.rng.r(-0.12, 0.12)), c: o.couleurs[i % o.couleurs.length], w: o.w });
      p0 = p1;
    }
  };
  // matière lumineuse sur mesure (couleur des sommets × mat.color, qu'on anime)
  const matLueur = (cle, o) => MAT.patch(new THREE.MeshBasicMaterial(Object.assign({ vertexColors: true, toneMapped: false }, o)), { cle });
  // maillage d'un lot avec une matière sur mesure
  const maillage = (lot, mat) => { const g = lot.geometrie(); g.boundingSphere.radius += 26; const m = new THREE.Mesh(g, mat); m.userData.matPropre = true; return m; };

  Object.assign(REPERES, {
    /* ---------- 1. LE CASTELET DES PANTINS : théâtre de marionnettes géant, pantins qui dansent au bout de leurs fils ---------- */
    castelet: {
      nom: 'Le Castelet des Pantins', desc: 'Personne ne tire les fils, et pourtant ils dansent. Lève ta lanterne : ils adorent avoir un public.',
      maisons: [0, 0.5, 0.35, 0.35], humeur: 'ombres',
      plan(P, rng) {
        const zc = M + 4, y = P.sol(M, zc);
        P.boite(M, zc, 7, 3.4, 0);
        for (const sx of [-1, 1]) P.cyl(M + sx * 8.3, zc - 3.6, 0.25);
        P.lum(M, y + 3.4, zc - 4.8, [1, 0.72, 0.4], 2, 14);        // rampe
        P.lum(M, y + 8.6, zc - 0.3, [0.75, 0.5, 1], 1.3, 12);       // contre-jour violet dans la cage de scène
        P.flaque(M, zc - 5.6, 6.5, [0.5, 0.33, 0.14]);
        for (const [dx, dz] of [[-4.6, -10], [4.6, -10], [-5.2, -13.4], [5.2, -13.4]]) { P.bancs.push({ x: M + dx, z: zc + dz, a: (dx > 0 ? -0.12 : 0.12) }); P.cyl(M + dx, zc + dz, 0.8, 0.9); }
      },
      construire(L, P, rng, groupe) {
        const zc = M + 4, y0 = P.sol(M, zc), w = G.monde(M, y0, zc, 0);
        const VIOLET = [0.42, 0.21, 0.4], ROUGE = [0.62, 0.07, 0.1];
        const tord = v => { const k = clamp(v.y / 14, 0, 1); v.x += k * k * 1.0 + Math.sin(v.y * 0.5) * 0.1; v.z -= k * k * 0.45; };
        // --- estrade ---
        L.get('planche').add(G.base('cube'), { m: G.mat(0, 0, 0, 13.6, 3, 6.6), c: [0.4, 0.28, 0.25], uvm: 'monde', s: 0.5, w, ao: v => 0.5 + 0.5 * sstep(0, 1.4, v.y) });
        L.get('verni').add(G.base('cube'), { m: G.mat(0, 1.47, -3.32, 13.8, 0.16, 0.16), c: OR, w });
        for (let i = 0; i < 7; i++) L.get('verni').add(G.base('ico'), { m: G.mat(-5.4 + i * 1.8, 0.82, -3.31, 0.34, 0.46, 0.05), c: i % 2 ? OR : [0.6, 0.1, 0.12], w });
        // --- piliers penchés, chapiteaux dorés, flèches tordues ---
        for (const sx of [-1, 1]) {
          const dp = v => { const k = clamp((v.y - 1.5) / 9, 0, 1); v.x += sx * k * k * 0.45; tord(v); };
          L.get('planche').add(G.base('boite'), { m: G.mat(sx * 5.95, 6, -2.5, 1.3, 9, 1.3), c: VIOLET, uvm: 'monde', s: 0.6, def: dp, w });
          L.get('verni').add(G.base('cube'), { m: G.mat(sx * 5.95, 1.75, -2.5, 1.6, 0.5, 1.6), c: OR, def: dp, w });
          L.get('verni').add(G.base('cube'), { m: G.mat(sx * 5.95, 10.65, -2.5, 1.7, 0.36, 1.7), c: OR, def: dp, w });
          L.get('verni').add(G.base('sphere'), { m: G.mat(sx * 5.95, 11.25, -2.5, 0.5, 0.5, 0.5), c: [0.6, 0.1, 0.12], def: dp, w });
          L.get('verni').add(G.base('cone8'), { m: G.mat(sx * 5.95, 12.6, -2.5, 0.3, 2.2, 0.3), c: OR, def: v => { const k = clamp((v.y - 11.5) / 2.2, 0, 1); v.x += sx * k * k * k * 0.9; dp(v); }, w });
          G.guirlande(L, [sx * 5.22, 1.9, -3.22], [sx * 5.22, 10.3, -3.22], { couleurs: [[3, 2.2, 1], [3, 1.3, 0.5]], rng, creux: 0.001, pas: 0.6, def: dp, w });
        }
        // --- linteau, fronton de travers, emblème ---
        const dg = v => { const k = clamp((v.y - 11.65) / 3.4, 0, 1); v.x -= k * k * 1.7; tord(v); };
        L.get('planche').add(G.base('cube'), { m: G.mat(0, 11, -2.5, 13.4, 1.3, 1.5), c: [0.36, 0.18, 0.34], uvm: 'monde', s: 0.6, def: tord, w });
        L.get('planche').add(G.base('pignon'), { m: G.mat(0, 11.65, -2.5, 12.8, 3.4, 1.3), c: VIOLET, uvm: 'monde', s: 0.6, def: dg, w });
        for (const sx of [-1, 1]) barre(L, 'verni', [sx * 6.45, 11.68, -3.2], [0, 15.1, -3.2], 0.1, OR, { def: dg, w });
        L.get('verni').add(forme('croissant', () => new THREE.TorusGeometry(1, 0.2, 5, 14, Math.PI * 1.2)), { m: G.mat(-0.3, 12.75, -3.2, 0.62, 0.62, 0.5, 0, 0, 1.2), c: OR, def: dg, w });
        { const e = new THREE.Vector3(-0.2, 12.8, -3.24); dg(e); L.get('emis').add(G.base('ico'), { m: G.mat(e.x, e.y, e.z, 0.2, 0.2, 0.06), c: [3, 2.4, 1.1], w }); G.halo(L, e.x, e.y, e.z - 0.1, [0.3, 0.22, 0.1], 2.6, { w }); }
        const pointe = new THREE.Vector3(0, 15.05, -2.5); dg(pointe);
        L.get('verni').add(G.base('sphere'), { m: G.mat(pointe.x, pointe.y + 0.2, pointe.z, 0.32, 0.32, 0.32), c: OR, w });
        G.guirlande(L, [-5.3, 10.32, -3.3], [5.3, 10.32, -3.3], { couleurs: [[3, 2.2, 1], [3, 1.3, 0.5]], rng, creux: 0.001, pas: 0.5, def: tord, w });
        // --- cage de scène : fond peint (lune, étoiles, collines), côtés, toit ---
        L.get('planche').add(G.base('cube'), { m: G.mat(0, 6.3, 2.95, 12.8, 9.7, 0.3), c: [0.17, 0.15, 0.28], uvm: 'monde', s: 0.5, def: tord, w });
        for (const sx of [-1, 1]) L.get('planche').add(G.base('cube'), { m: G.mat(sx * 6.3, 6.3, 0.3, 0.3, 9.7, 5.6), c: [0.3, 0.16, 0.3], uvm: 'monde', s: 0.5, def: tord, w });
        L.get('planche').add(G.base('cube'), { m: G.mat(0, 11.3, 0.3, 13.2, 0.35, 6.2), c: [0.3, 0.16, 0.3], uvm: 'monde', s: 0.5, def: tord, w });
        L.get('emis').add(G.base('cyl16'), { m: G.mat(2.7, 8.3, 2.76, 1.15, 0.03, 1.15, Math.PI / 2, 0, 0), c: [0.8, 0.72, 0.45], def: tord, w });
        L.get('unie').add(G.base('cyl16'), { m: G.mat(3.2, 8.55, 2.72, 1.0, 0.03, 1.0, Math.PI / 2, 0, 0), c: [0.1, 0.09, 0.17], def: tord, w });
        for (let i = 0; i < 16; i++) { const k = 0.05 + rng() * 0.07; L.get('emis').add(G.base('ico'), { m: G.mat(rng.r(-5.6, 5.6), rng.r(4.6, 10), 2.74, k, k, 0.02, 0, 0, rng() * 3), c: [1.3, 1.2, 0.8], def: tord, w }); }
        for (const [hx, hr, hh] of [[-3.6, 3.4, 2.6], [1.2, 4.2, 1.9], [4.6, 2.6, 3.1]]) L.get('unie').add(G.base('cone8'), { m: G.mat(hx, 1.5 + hh / 2, 2.7, hr, hh, 0.12), c: [0.09, 0.08, 0.15], w });
        // --- rideaux à plis et lambrequin festonné ---
        const gRid = forme('rideau', () => new THREE.PlaneGeometry(1, 1, 14, 8));
        for (const sx of [-1, 1]) L.get('tissu').add(gRid, { c: ROUGE, def: (v, n) => {
          const u = v.x + 0.5, t = v.y + 0.5, larg = t > 0.36 ? lerp(1.0, 3.4, sstep(0.36, 1, t)) : lerp(1.0, 1.9, sstep(0.36, 0, t)), amp = 0.17 * (0.4 + larg / 3.4);
          n.set(-sx * Math.cos(u * 17) * 17 * amp / larg, 0, -1).normalize();
          v.set(sx * (5.3 - u * larg), 1.5 + t * 8.9, -2.3 + Math.sin(u * 17) * amp + u * 0.15); tord(v);
        }, w });
        for (const sx of [-1, 1]) L.get('verni').add(G.base('tore'), { m: G.mat(sx * 4.75, 4.72, -2.3, 0.45, 0.2, 0.36, Math.PI / 2, 0, 0), c: OR, def: tord, w });
        L.get('tissu').add(forme('lambrequin', () => new THREE.PlaneGeometry(1, 1, 30, 3)), { c: [0.5, 0.05, 0.09], def: (v, n) => {
          const u = v.x + 0.5, t = v.y + 0.5; n.set(0, 0, -1);
          v.set(lerp(-5.35, 5.35, u), 10.42 - (1 - t) * (0.95 + 0.75 * Math.abs(Math.sin(u * Math.PI * 5))), -2.62 + Math.sin(u * 44) * 0.06); tord(v);
        }, w });
        for (let i = 0; i < 5; i++) { const e = new THREE.Vector3(lerp(-5.35, 5.35, (i + 0.5) / 5), 8.6, -2.64); tord(e); L.get('verni').add(G.base('ico'), { m: G.mat(e.x, e.y, e.z, 0.12, 0.2, 0.12), c: OR, w }); }
        // --- rampe : feux de la scène ---
        for (let i = 0; i < 7; i++) {
          const x = -4.8 + i * 1.6;
          L.get('metal').add(G.base('bosse'), { m: G.mat(x, 1.66, -3.05, 0.3, 0.3, 0.3, -2.2, 0, 0), c: [0.45, 0.33, 0.16], w });
          L.get('emis').add(G.base('sphereB'), { m: G.mat(x, 1.7, -2.96, 0.09, 0.09, 0.09), c: [3.2, 2.3, 1], w });
          G.halo(L, x, 1.75, -3.0, [0.3, 0.2, 0.08], 1.6, { w });
        }
        // --- mâts et guirlandes de fanions ---
        const cf = [[0.62, 0.14, 0.14], [0.75, 0.58, 0.2], [0.2, 0.42, 0.46], [0.5, 0.24, 0.55], [0.8, 0.78, 0.7]];
        for (const sx of [-1, 1]) {
          const px = M + sx * 8.3, pz = zc - 3.6, yp = P.sol(px, pz), haut = [px + sx * 0.7, yp + 7.6, pz];
          barre(L, 'bois', [px, yp - 1, pz], haut, 0.09, [0.4, 0.3, 0.24], {});
          L.get('verni').add(G.base('sphereB'), { m: G.mat(haut[0], haut[1] + 0.1, haut[2], 0.2, 0.2, 0.2), c: OR });
          fanions(L, haut, [M + pointe.x, y0 + pointe.y + 0.3, zc + pointe.z - 0.2], { couleurs: cf, rng, creux: 1.1 });
          fanions(L, haut, [px + sx * 3, P.sol(px + sx * 3, pz - 7) + 3.4, pz - 7], { couleurs: cf, rng, creux: 0.7 });
          barre(L, 'bois', [px + sx * 3, P.sol(px + sx * 3, pz - 7) - 0.6, pz - 7], [px + sx * 3, P.sol(px + sx * 3, pz - 7) + 3.5, pz - 7], 0.07, [0.4, 0.3, 0.24], {});
        }
        // --- les pantins ---
        const matYeux = matLueur('pantinYeux'), matFil = MAT.patch(new THREE.LineBasicMaterial({ color: 0x9a917c }), { cle: 'pantinFil' });
        const PEAU = [0.8, 0.66, 0.5], SOMBRE = [0.07, 0.06, 0.08];
        const pantin = (s, style, c1, c2, yc) => {
          const g = new THREE.Group(), B = G.Lots(), V = B.get('verni'), Y = new G.Lot();
          V.add(G.base('tronc'), { m: G.mat(0, 0, 0, 0.52 * s, 1.25 * s, 0.34 * s, Math.PI, 0, 0), c: c1 });
          V.add(G.base('sphereB'), { m: G.mat(0, -0.72 * s, 0, 0.34 * s, 0.27 * s, 0.28 * s), c: c2 });
          for (let i = 0; i < 3; i++) V.add(G.base('ico'), { m: G.mat(0, (0.3 - i * 0.3) * s, (0.33 - i * 0.03) * s, 0.06 * s, 0.06 * s, 0.04 * s), c: OR });
          V.add(G.base('cone12'), { m: G.mat(0, 0.68 * s, 0, 0.5 * s, 0.16 * s, 0.5 * s), c: [0.85, 0.82, 0.75] });
          V.add(G.base('cyl6'), { m: G.mat(0, 0.8 * s, 0, 0.09 * s, 0.3 * s, 0.09 * s), c: PEAU });
          V.add(G.base('sphere'), { m: G.mat(0, 1.28 * s, 0, 0.4 * s, 0.46 * s, 0.4 * s), c: PEAU });
          V.add(G.base('cone8'), { m: G.mat(0, 1.26 * s, 0.6 * s, 0.07 * s, 0.5 * s, 0.07 * s, Math.PI / 2, 0, 0), c: [0.78, 0.42, 0.32] });
          V.add(G.base('cube'), { m: G.mat(0, 1.1 * s, 0.375 * s, 0.26 * s, 0.035 * s, 0.03 * s), c: SOMBRE });
          for (const sx of [-1, 1]) {
            V.add(G.base('cube'), { m: G.mat(sx * 0.13 * s, 0.99 * s, 0.31 * s, 0.02 * s, 0.24 * s, 0.03 * s), c: SOMBRE });
            V.add(G.base('cyl6'), { m: G.mat(sx * 0.23 * s, 1.2 * s, 0.32 * s, 0.085 * s, 0.02 * s, 0.085 * s, Math.PI / 2 - 0.2, sx * 0.5, 0), c: [0.72, 0.18, 0.18] });
            V.add(G.base('cube'), { m: G.mat(sx * 0.15 * s, 1.47 * s, 0.355 * s, 0.17 * s, 0.035 * s, 0.03 * s, 0, 0, sx * (style === 1 ? 0.4 : -0.35)), c: SOMBRE });
            Y.add(G.base('sphereB'), { m: G.mat(sx * 0.15 * s, 1.37 * s, 0.355 * s, 0.062 * s, 0.062 * s, 0.04 * s), c: [1, 0.85, 0.5] });
            V.add(G.base('sphereB'), { m: G.mat(sx * 0.56 * s, 0.5 * s, 0, 0.17 * s, 0.17 * s, 0.17 * s), c: c2 });
          }
          if (style === 0) { // bouffon : bonnet à deux cornes et grelots
            for (const sx of [-1, 1]) { V.add(G.base('cone8'), { m: G.mat(sx * 0.36 * s, 1.84 * s, 0, 0.2 * s, 0.8 * s, 0.2 * s, 0, 0, -sx * 0.8), c: sx > 0 ? c1 : c2 }); V.add(G.base('ico'), { m: G.mat(sx * 0.66 * s, 2.13 * s, 0, 0.08 * s, 0.08 * s, 0.08 * s), c: OR }); }
          } else if (style === 1) { // monsieur maigre : haut-de-forme de travers
            V.add(G.base('cyl12'), { m: G.mat(0, 1.68 * s, 0, 0.52 * s, 0.05 * s, 0.52 * s, 0, 0, 0.12), c: SOMBRE });
            V.add(G.base('cyl8'), { m: G.mat(0.06 * s, 2.15 * s, 0, 0.3 * s, 0.95 * s, 0.3 * s, 0, 0, 0.12), c: SOMBRE, def: v => { v.x += Math.pow(clamp((v.y - 1.7 * s) / s, 0, 1), 2) * 0.25 * s; } });
            V.add(G.base('cyl8'), { m: G.mat(0.03 * s, 1.78 * s, 0, 0.315 * s, 0.14 * s, 0.315 * s, 0, 0, 0.12), c: c2 });
          } else { // poupée : chapeau pointu à pompon, jupe en cloche
            V.add(G.base('cone8'), { m: G.mat(0, 2.2 * s, 0, 0.34 * s, 1.1 * s, 0.34 * s), c: c2, def: v => { const k = clamp((v.y - 1.65 * s) / (1.1 * s), 0, 1); v.x -= k * k * 0.5 * s; } });
            V.add(G.base('sphereB'), { m: G.mat(-0.5 * s, 2.72 * s, 0, 0.1 * s, 0.1 * s, 0.1 * s), c: OR });
            V.add(G.base('cone12'), { m: G.mat(0, -0.62 * s, 0, 0.95 * s, 1.0 * s, 0.95 * s), c: c2 });
          }
          // croix d'attelle et sa corde
          const BR = [0.3, 0.2, 0.14];
          V.add(G.base('cube'), { m: G.mat(0, yc, 0, 2.9 * s, 0.09, 0.14), c: BR }); V.add(G.base('cube'), { m: G.mat(0, yc, 0.42 * s, 0.14, 0.09, 1.3 * s), c: BR });
          V.add(gFil(), { m: G.mat(0, yc + 1.2, 0, 0.025, 2.4, 0.025), c: BR });
          const corps = maill(B); g.add(corps);
          const yeux = maillage(Y, matYeux); g.add(yeux);
          const membre = (haut, x, y) => {
            const U = G.Lots(), F = G.Lots(), l1 = (haut ? 0.76 : 0.84) * s, r = (haut ? 0.1 : 0.13) * s;
            U.get('verni').add(G.base('cyl6'), { m: G.mat(0, -l1 / 2, 0, r, l1, r), c: haut ? c1 : c2 });
            U.get('verni').add(G.base('sphereB'), { m: G.mat(0, -l1, 0, r * 1.15, r * 1.15, r * 1.15), c: haut ? c2 : c1 });
            F.get('verni').add(G.base('cyl6'), { m: G.mat(0, -l1 / 2, 0, r * 0.85, l1, r * 0.85), c: haut ? c1 : c2 });
            if (haut) { F.get('verni').add(G.base('cone8'), { m: G.mat(0, -l1 * 0.86, 0, r * 1.7, 0.2 * s, r * 1.7), c: [0.85, 0.82, 0.75] }); F.get('verni').add(G.base('sphereB'), { m: G.mat(0, -l1 - 0.06 * s, 0, 0.13 * s, 0.17 * s, 0.1 * s), c: PEAU }); }
            else F.get('verni').add(G.base('cone8'), { m: G.mat(0, -l1 - 0.04 * s, 0.2 * s, 0.13 * s, 0.62 * s, 0.11 * s, Math.PI / 2, 0, 0), c: c1 });
            const a = maill(U), b = maill(F); a.position.set(x * s, y * s, 0); b.position.set(0, -l1, 0); a.add(b); g.add(a);
            return [a, b];
          };
          const bras = [membre(true, -0.56, 0.5), membre(true, 0.56, 0.5)], jambes = [membre(false, -0.22, -0.8), membre(false, 0.22, -0.8)];
          // fils : tête, mains, genoux
          const pos = new Float32Array(30), gl = new THREE.BufferGeometry();
          pos.set([0, yc, 0, 0, 1.74 * s, 0, -1.4 * s, yc, 0, 0, 0, 0, 1.4 * s, yc, 0, 0, 0, 0, -0.07, yc, 1.0 * s, 0, 0, 0, 0.07, yc, 1.0 * s, 0, 0, 0]);
          gl.setAttribute('position', new THREE.BufferAttribute(pos, 3)); gl.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 2, 0), 40);
          const fils = new THREE.LineSegments(gl, matFil); fils.userData.matPropre = true; g.add(fils);
          return { g, bras, jambes, pos, attr: gl.attributes.position, s };
        };
        const troupe = [];
        const distrib = [[-3.2, -0.5, 0.86, 1, [0.16, 0.2, 0.32], [0.55, 0.5, 0.42]], [0, -1.3, 1.06, 0, [0.6, 0.1, 0.12], [0.75, 0.58, 0.18]], [3.3, -0.3, 0.92, 2, [0.2, 0.42, 0.4], [0.5, 0.2, 0.5]]];
        distrib.forEach(([x, z, s, style, c1, c2], i) => {
          const yb = 1.5 + 0.3 + 2.6 * s, o = pantin(s, style, c1, c2, 9.95 - yb);
          o.x = M + x; o.z = zc + z; o.y = y0 + yb; o.ph = i * 2.1; o.yaw = Math.PI;
          o.g.position.set(o.x, o.y, o.z); o.g.rotation.y = Math.PI; groupe.add(o.g); troupe.push(o);
        });
        let k = 0, tenue = 0, tMus = 0;
        return [(t, dt, ctx) => {
          if (ctx.d > 75) return;
          if (ctx.eclat > 0.5) tenue = 4.2; else tenue -= dt;
          const cible = tenue > 0 ? 1 : 0; k += (cible - k) * Math.min(1, dt * (cible ? 8 : 1.1));
          tMus -= dt; if (ctx.d < 15 && tMus <= 0) { tMus = 50; ctx.son('boite_a_musique'); }
          const e = 0.45 + 2.6 * k; matYeux.color.setRGB(e, e, e);
          for (let i = 0; i < troupe.length; i++) {
            const o = troupe[i], s = o.s, ph = t * 1.5 + o.ph, d = 1 - k, sn = Math.sin(ph);
            const yawD = Math.PI + 0.5 * Math.sin(t * 0.45 + o.ph * 1.7), yawT = Math.atan2(ctx.jx - o.x, ctx.jz - o.z);
            o.g.rotation.y = yawD + angDiff(yawD, yawT) * k;
            o.g.rotation.z = 0.09 * Math.sin(ph * 0.5) * d + (i % 2 ? -0.13 : 0.13) * k;
            o.g.position.y = o.y + 0.16 * s * Math.abs(sn) * d;
            for (let j = 0; j < 2; j++) {
              const sx = j ? 1 : -1, sj = Math.sin(ph + j * 2.2);
              const a1 = lerp(0.1, 1.0 + 0.75 * sj, d), a2 = lerp(0.08, 0.55 + 0.6 * Math.sin(ph * 2 + j * 1.3), d);
              o.bras[j][0].rotation.z = sx * a1; o.bras[j][1].rotation.z = sx * a2;
              const l1 = 0.76 * s, l2 = 0.82 * s, q = 6 + j * 6;
              o.pos[q + 3] = sx * (0.56 * s + l1 * Math.sin(a1) + l2 * Math.sin(a1 + a2)); o.pos[q + 4] = 0.5 * s - l1 * Math.cos(a1) - l2 * Math.cos(a1 + a2);
              const leve = Math.max(0, j ? sn : -sn), b1 = lerp(0.04, 0.12 + 0.55 * leve, d), b2 = lerp(-0.02, -0.15 - 0.8 * leve, d), l3 = 0.84 * s, q2 = 18 + j * 6;
              o.jambes[j][0].rotation.z = sx * b1; o.jambes[j][1].rotation.z = sx * b2;
              o.pos[q2 + 3] = sx * (0.22 * s + l3 * Math.sin(b1)); o.pos[q2 + 4] = -0.8 * s - l3 * Math.cos(b1); o.pos[q2 + 5] = 0.1 * s;
            }
            o.attr.needsUpdate = true;
          }
        }];
      },
    },
  });
})();
