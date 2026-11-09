/* ===================== LES 12 REPÈRES (lieux remarquables) =====================
   Chaque repère : plan(P, rng) ajoute obstacles, lumières et le « point de curiosité » (P.spot) ; construire(L, P,
   rng, groupe, Q) ajoute sa géométrie aux lots de la parcelle et renvoie ses animations [fonction(t, dt)].
   Les pièces qui bougent (aiguilles, carrousel, train…) sont des maillages à part dans un sous-groupe. */
const REPERES = (() => {
  const C = MONDE.C, M = C / 2;
  const R = {};
  // maillages d'un lot à part (pièces animées)
  function maill(L2) {
    const gr = new THREE.Group();
    for (const k in L2.tous) { const geo = L2.tous[k].geometrie(k === 'ampoules' ? 'phase' : null); if (!geo) continue; geo.boundingSphere.radius += 14; const m = new THREE.Mesh(geo, MAT[k]); if (k !== 'ampoules' && k !== 'emis' && k !== 'fenetre') { m.castShadow = true; m.receiveShadow = true; } gr.add(m); }
    return gr;
  }
  const lum = (P, x, y, z, c, i, r, ch) => P.lumieres.push({ x, y, z, c, i, r, chaleur: ch == null ? 1 : ch });
  const fl = (P, x, z, r, c) => P.flaques.push({ x, z, r, c });
  const G = GEO;
  const NOIR = [0.15, 0.15, 0.17];

  // 1. TOUR DE L'HORLOGE TORDUE — affiche l'heure réelle ; une face tourne à l'envers
  R.horloge = {
    maisons: true,
    plan(P) { P.boite(M, M, 2.9, 2.9, 0); P.spot = { x: M, z: M + 5, dy: 1 }; const y = P.sol(M, M); for (const [dx, dz] of [[-4, 4], [4, 4], [-4, -4], [4, -4]]) MONDE.ajLampe(P, M + dx, M + dz, Math.atan2(dz, -dx) * 0, MONDE.palette(P.q).lampe); lum(P, M, y + 14, M + 4, [1, 0.85, 0.5], 1.5, 16, 0); },
    construire(L, P, rng, groupe) {
      const y0 = P.sol(M, M), H = 17, w = G.monde(M, y0, M, 0.2);
      const def = v => { const t = clamp(v.y / 26, 0, 1); const a = t * 0.35; const x = v.x, z = v.z; v.x = x * Math.cos(a) - z * Math.sin(a) + t * t * 2.2; v.z = x * Math.sin(a) + z * Math.cos(a); };
      L.get('pierre').add(G.base('cube'), { m: G.mat(0, 1.2, 0, 5.6, 4.4, 5.6), c: [0.6, 0.58, 0.58], uvm: 'monde', s: 0.5, def, w });
      L.get('brique').add(G.base('boite'), { m: G.mat(0, 3.4 + (H - 3.4) / 2, 0, 4.2, H - 3.4, 4.2), c: [0.75, 0.68, 0.72], uvm: 'monde', s: 0.45, def, w });
      L.get('bois').add(G.base('cube'), { m: G.mat(0, H + 0.1, 0, 5, 0.4, 5), c: [0.3, 0.22, 0.2], def, w });
      for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2; L.get('pierre').add(G.base('cube'), { m: G.mat(Math.cos(a) * 1.9 + Math.sin(a) * 1.9, H + 1.8, -Math.sin(a) * 1.9 + Math.cos(a) * 1.9, 0.5, 3.2, 0.5), c: [0.55, 0.53, 0.55], def, w }); }
      L.get('metal').add(G.base('sphere'), { m: G.mat(0, H + 2.2, 0, 0.9, 1.0, 0.9), c: [0.6, 0.45, 0.2], def, w });
      L.get('tuiles').add(G.base('cone4'), { m: G.mat(0, H + 3.4 + 4, 0, 3.6, 8, 3.6), c: [0.3, 0.24, 0.36], uvm: 'monde', s: 0.6, def: v => { const k = clamp((v.y - H - 3.4) / 8, 0, 1); v.x -= Math.pow(k, 3) * 3; v.y -= Math.pow(k, 5) * 1.2; def(v); }, w });
      // fenêtres de la tour
      for (let e = 0; e < 3; e++) for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2; L.get('fenetre').add(G.base('plan'), { m: G.mat(Math.sin(a) * 2.13, 5 + e * 3, Math.cos(a) * 2.13, 0.8, 1.4, 1, 0, a), c: rng() < 0.6 ? P.pal.fenetre(rng) : [0.03, 0.03, 0.05], uvr: [0.5, 0.5, 1, 1], def, w }); }
      L.get('porte').add(G.base('plan'), { m: G.mat(0, 1.2, 2.83, 1.3, 2.4, 1), c: [1, 1, 1], def, w });
      // cadrans + aiguilles (sous-groupe animé qui suit la déformation approximativement)
      const hc = 14.2, mob = [];
      for (let i = 0; i < 4; i++) {
        const a = i * Math.PI / 2, p = new THREE.Vector3(Math.sin(a) * 2.16, hc, Math.cos(a) * 2.16); def(p);
        L.get('cadran').add(G.base('cyl16'), { m: G.mat(Math.sin(a) * 2.12, hc, Math.cos(a) * 2.12, 1.45, 0.05, 1.45, Math.PI / 2, a, 0), c: [1.6, 1.4, 1.1], uvm: undefined, def, w });
        const L2 = G.Lots();
        L2.get('metal').add(G.base('cube'), { m: G.mat(0, 0.5, 0, 0.12, 1.0, 0.04), c: NOIR });
        const L3 = G.Lots(); L3.get('metal').add(G.base('cube'), { m: G.mat(0, 0.65, 0, 0.07, 1.3, 0.04), c: NOIR });
        const piv = new THREE.Group(); piv.position.copy(p).applyMatrix4(w); piv.position.x -= P.X0 * 0; piv.rotation.y = a + 0.2;
        const ah = maill(L2), am = maill(L3); ah.position.z = 0.08; am.position.z = 0.1; piv.add(ah, am); groupe.add(piv);
        mob.push({ ah, am, sens: i === 2 ? -1 : 1 });
      }
      lum(P, M, y0 + 3, M + 4, [1, 0.8, 0.5], 0.8, 8);
      fl(P, M, M + 4, 5, [0.4, 0.3, 0.15]);
      return [() => { const d = new Date(), h = d.getHours() % 12 + d.getMinutes() / 60, mi = d.getMinutes() + d.getSeconds() / 60; for (const o of mob) { o.ah.rotation.z = -o.sens * h / 12 * Math.PI * 2; o.am.rotation.z = -o.sens * mi / 60 * Math.PI * 2; } }];
    },
  };

  // 2. COLLINE EN SPIRALE — on peut la gravir ; la pointe s'enroule au sommet
  R.colline = {
    maisons: false,
    plan(P, rng) {
      const top = P.sol(M, M); P.spot = { x: M + 1.2, z: M + 1.2, dy: 1.2 }; P.cyl(M - 1.2, M - 0.4, 1.0);
      for (let i = 0; i < 9; i++) { const t = i / 9, a = t * Math.PI * 5, r = 17 - t * 15; const x = M + Math.cos(a) * r, z = M + Math.sin(a) * r; if (i % 2 === 0) MONDE.ajLampe(P, x + Math.cos(a) * 1.5, z + Math.sin(a) * 1.5, -a + Math.PI, [2.6, 2.6, 3.2], 2.8); }
      lum(P, M, top + 2, M, [0.7, 0.8, 1], 1.2, 14, 0.5);
    },
    construire(L, P, rng) {
      const sol = P.sol;
      // sentier de dalles en spirale
      for (let i = 0; i < 120; i++) {
        const t = i / 120, a = t * Math.PI * 5, r = 18 - t * 16.2, x = M + Math.cos(a) * r, z = M + Math.sin(a) * r;
        L.get('pierre').add(G.base('cube'), { m: G.mat(x, sol(x, z) + 0.02, z, 1.1, 0.12, 0.7, 0, -a, 0), c: [0.5, 0.5, 0.54], def: v => { v.y = Math.max(v.y, sol(v.x, v.z) + 0.04); } });
      }
      // la pointe qui s'enroule
      const top = sol(M, M) - 0.3, pts = [];
      for (let i = 0; i <= 50; i++) { const t = i / 50; if (t < 0.45) pts.push(new THREE.Vector3(M - 1.2 + Math.sin(t * 3) * 0.5, top + t / 0.45 * 7, M - 0.4)); else { const k = (t - 0.45) / 0.55, a = k * Math.PI * 2.6, r = 2.6 * (1 - k * 0.85); pts.push(new THREE.Vector3(M - 1.2 + 0.5 * Math.sin(1.35) + Math.sin(a) * r - 0 + r * 0, top + 7 + (1 - Math.cos(a)) * r * 0.9 + k * 0.6, M - 0.4)); } }
      const tube = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 80, 1, 10, false);
      const pa = tube.attributes.position, ce = new THREE.Vector3();
      const cvC = new THREE.CatmullRomCurve3(pts), csC = []; for (let q = 0; q <= 80; q++) csC.push(cvC.getPointAt(q / 80));
      for (let i = 0; i < pa.count; i++) { const seg = Math.floor(i / 11), t = seg / 80; const p = new THREE.Vector3().fromBufferAttribute(pa, i); const c = csC[Math.min(80, seg)]; ce.copy(p).sub(c).multiplyScalar(1.15 * (1 - t * 0.88)); pa.setXYZ(i, c.x + ce.x, c.y + ce.y, c.z + ce.z); }
      tube.computeVertexNormals();
      L.get('pierre').add(tube, { c: [0.42, 0.42, 0.48], uvm: 'monde', s: 0.5 });
      L.get('emis').add(G.base('ico'), { m: G.mat(pts[50].x, pts[50].y + 0.4, pts[50].z, 0.35, 0.35, 0.35), c: [3, 3, 4] });
      return [];
    },
  };

  // 3. MAUSOLÉE DE GIVRE
  R.mausolee = {
    maisons: false,
    plan(P, rng) {
      P.boite(M, M - 1, 3.8, 4.6, 0); P.spot = { x: M, z: M + 5.5, dy: 0.9 };
      const y = P.sol(M, M); lum(P, M, y + 2, M + 4.5, [0.35, 1, 0.75], 1.6, 10, 0.3); fl(P, M, M + 5, 4, [0.1, 0.4, 0.3]);
      P.tombesR = [];
      for (let i = 0; i < 26; i++) { const a = rng() * Math.PI * 2, r = 8 + rng() * 9, x = M + Math.cos(a) * r, z = M + Math.sin(a) * r; if (P.libre(x, z, 0.8) && Math.abs(x - M) < 19 && Math.abs(z - M) < 19 && !(Math.abs(x - M) < 2 && z > M)) { P.tombes.push({ x, z, a: Math.atan2(x - M, z - M), pen: (rng() - 0.5) * 0.3 }); P.boite(x, z, 0.4, 0.2, 0, 1.3); } }
      for (let i = 0; i < 3; i++) { const a = rng() * 6, r = 12 + rng() * 5; const x = M + Math.cos(a) * r, z = M + Math.sin(a) * r; if (P.libre(x, z, 1.3)) { P.morts.push({ x, z, h: 6 + rng() * 4 }); P.cyl(x, z, 0.4); } }
    },
    construire(L, P, rng) {
      const y0 = P.sol(M, M), w = G.monde(M, y0, M - 1, 0), pi = [0.66, 0.7, 0.76];
      L.get('pierre').add(G.base('cube'), { m: G.mat(0, 0.2, 0, 8.4, 0.8, 10), c: pi, uvm: 'monde', w });
      L.get('pierre').add(G.base('cube'), { m: G.mat(0, 2.6, -0.6, 6.6, 4.2, 7.6), c: pi, uvm: 'monde', s: 0.5, w });
      for (const x of [-3, -1.1, 1.1, 3]) { L.get('pierre').add(G.base('cyl12'), { m: G.mat(x, 2.6, 3.7, 0.32, 4.4, 0.32), c: pi, w }); L.get('pierre').add(G.base('cube'), { m: G.mat(x, 0.65, 3.7, 0.8, 0.3, 0.8), c: pi, w }); }
      L.get('pierre').add(G.base('cube'), { m: G.mat(0, 5, 0, 7.6, 0.6, 9.2), c: pi, uvm: 'monde', w });
      L.get('pierre').add(G.base('pignon'), { m: G.mat(0, 5.3, 0, 7.8, 2.2, 9.4), c: pi, uvm: 'monde', s: 0.5, w });
      L.get('pierre').add(G.base('sphere'), { m: G.mat(0, 6.8, -1.5, 2.2, 2.4, 2.2), c: [0.6, 0.7, 0.82], w });
      L.get('metal').add(G.base('cone8'), { m: G.mat(0, 9.6, -1.5, 0.12, 1.6, 0.12), c: NOIR, w });
      L.get('emis').add(G.base('plan'), { m: G.mat(0, 1.9, 3.25, 2.0, 3.0, 1), c: [0.25, 1.9, 1.3], w });
      for (let i = -3; i <= 3; i++) L.get('metal').add(G.base('cube'), { m: G.mat(i * 0.28, 1.9, 3.32, 0.05, 3, 0.05), c: NOIR, w });
      for (const x of [-1.6, 1.6]) { L.get('pierre').add(G.base('cyl8'), { m: G.mat(x, 1.0, 4.9, 0.12, 0.5, 0.12), c: [0.9, 0.88, 0.8], w }); L.get('emis').add(G.base('sphereB'), { m: G.mat(x, 1.32, 4.9, 0.05, 0.1, 0.05), c: [4, 2.6, 0.9], w }); }
      for (let i = 0; i < 14; i++) { const a = rng() * 6, r = 6 + rng() * 6, x = M + Math.cos(a) * r, z = M + Math.sin(a) * r; if (P.libre(x, z, 0.3)) { const yy = P.sol(x, z); L.get('pierre').add(G.base('cyl8'), { m: G.mat(x, yy + 0.15, z, 0.07, 0.3, 0.07), c: [0.9, 0.88, 0.8] }); L.get('emis').add(G.base('sphereB'), { m: G.mat(x, yy + 0.36, z, 0.035, 0.07, 0.035), c: [4, 2.4, 0.8] }); } }
      return [];
    },
  };

  // 4. CARROUSEL SANS ENFANTS — tourne seul, chevaux qui montent et descendent
  R.carrousel = {
    maisons: false,
    plan(P) { P.cyl(M, M, 6.3); P.spot = { x: M, z: M + 8.4, dy: 1 }; const y = P.sol(M, M); lum(P, M, y + 4, M, [1, 0.75, 0.45], 2.2, 16); fl(P, M, M, 9, [0.5, 0.35, 0.16]); for (const a of [0.8, 2.4, 3.9, 5.5]) MONDE.ajLampe(P, M + Math.cos(a) * 10, M + Math.sin(a) * 10, -a + Math.PI, MONDE.palette(P.q).lampe); },
    construire(L, P, rng, groupe) {
      const y0 = P.sol(M, M);
      L.get('pierre').add(G.base('cyl16'), { m: G.mat(M, y0 + 0.15, M, 6.4, 0.5, 6.4), c: [0.55, 0.5, 0.5] });
      const L2 = G.Lots();
      L2.get('bois').add(G.base('cyl16'), { m: G.mat(0, 0.45, 0, 6, 0.2, 6), c: [0.55, 0.3, 0.25] });
      L2.get('verni').add(G.base('cyl12'), { m: G.mat(0, 2.6, 0, 0.7, 4.4, 0.7), c: [0.8, 0.65, 0.3] });
      L2.get('tissu').add(G.base('cone12'), { m: G.mat(0, 5.9, 0, 6.6, 2.4, 6.6), c: [0.85, 0.2, 0.25] });
      L2.get('tissu').add(G.base('cyl16'), { m: G.mat(0, 4.55, 0, 6.6, 0.5, 6.6), c: [0.9, 0.75, 0.3] });
      L2.get('verni').add(G.base('sphere'), { m: G.mat(0, 7.3, 0, 0.4, 0.4, 0.4), c: [0.9, 0.7, 0.2] });
      for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2, b = (i + 1) / 24 * Math.PI * 2; G.guirlande(L2, [Math.cos(a) * 6.6, 4.3, Math.sin(a) * 6.6], [Math.cos(b) * 6.6, 4.3, Math.sin(b) * 6.6], { couleurs: [[3, 2.4, 1.2], [3, 0.6, 0.4]], rng, creux: 0.15, pas: 0.35, r: 0.08 }); }
      const tour = maill(L2); tour.position.set(M, y0, M); groupe.add(tour);
      const chev = [];
      const cols = [[0.92, 0.9, 0.86], [0.3, 0.2, 0.18], [0.75, 0.3, 0.3], [0.35, 0.45, 0.7]];
      for (let i = 0; i < 8; i++) {
        const a = i / 8 * Math.PI * 2, L3 = G.Lots(), c = cols[i % 4];
        L3.get('verni').add(G.base('cyl8'), { m: G.mat(0, 0, 0, 0.05, 4.2, 0.05), c: [0.85, 0.7, 0.3] });
        L3.get('verni').add(G.base('sphere'), { m: G.mat(0, -0.4, 0, 0.32, 0.3, 0.75), c });
        L3.get('verni').add(G.base('cube'), { m: G.mat(0, 0.05, 0.62, 0.22, 0.6, 0.25, -0.5, 0, 0), c });
        L3.get('verni').add(G.base('cube'), { m: G.mat(0, 0.28, 0.85, 0.2, 0.22, 0.42, 0.3, 0, 0), c });
        for (const [lx, lz] of [[-0.15, 0.45], [0.15, 0.45], [-0.15, -0.45], [0.15, -0.45]]) L3.get('verni').add(G.base('cube'), { m: G.mat(lx, -0.85, lz, 0.08, 0.6, 0.08, lz > 0 ? -0.6 : 0.6, 0, 0), c });
        L3.get('unie').add(G.base('cube'), { m: G.mat(0, -0.12, -0.05, 0.36, 0.08, 0.5), c: [0.7, 0.1, 0.12] });
        const ch = maill(L3); ch.position.set(Math.cos(a) * 4.6, 2.3, Math.sin(a) * 4.6); ch.rotation.y = -a; tour.add(ch); chev.push(ch);
      }
      return [(t, dt) => { tour.rotation.y = t * 0.35; chev.forEach((c, i) => { c.position.y = 2.3 + Math.sin(t * 2 + i * 1.6) * 0.35; }); }];
    },
  };

  // 5. KIOSQUE DU LAC MUET — kiosque sur la glace, patineurs fantômes
  R.kiosque = {
    maisons: false,
    plan(P, rng) {
      P.lac = { x: M, z: M, r: 15.5 }; P.spot = { x: M, z: M, dy: 0.9 };
      for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; P.cyl(M + Math.cos(a) * 4, M + Math.sin(a) * 4, 0.22); }
      const y = P.sol(M, M); lum(P, M, y + 3.2, M, [1, 0.8, 0.55], 1.6, 12);
      for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + 0.3, r = 18; const x = M + Math.cos(a) * r, z = M + Math.sin(a) * r; if (i % 2 === 0) MONDE.ajLampe(P, x, z, -a + Math.PI, [2.6, 2.6, 3]); }
    },
    construire(L, P, rng, groupe) {
      const y0 = P.sol(M, M);
      L.get('bois').add(G.base('cyl8'), { m: G.mat(M, y0 + 0.15, M, 4.4, 0.3, 4.4), c: [0.55, 0.42, 0.35], uvm: 'monde' });
      for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2, x = M + Math.cos(a) * 4, z = M + Math.sin(a) * 4; L.get('bois').add(G.base('cyl8'), { m: G.mat(x, y0 + 1.9, z, 0.13, 3.4, 0.13), c: [0.85, 0.82, 0.78] }); L.get('bois').add(G.base('cube'), { m: G.mat((x + M + Math.cos(a + 0.39) * 4) / 2 + 0 * 0, y0 + 1.0, (z + M + Math.sin(a + 0.39) * 4) / 2, 0.06, 0.06, 3, 0, -a - 0.39 + Math.PI / 2, 0), c: [0.85, 0.82, 0.78] }); }
      L.get('tuiles').add(G.base('cone8'), { m: G.mat(M, y0 + 4.9, M, 5.2, 2.8, 5.2), c: [0.35, 0.42, 0.5], uvm: 'monde', def: v => { const k = clamp((v.y - y0 - 3.5) / 2.8, 0, 1); v.z += Math.pow(k, 3) * 1.5; } });
      for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2, b = (i + 1) / 8 * Math.PI * 2; G.guirlande(L, [M + Math.cos(a) * 5.1, y0 + 3.5, M + Math.sin(a) * 5.1], [M + Math.cos(b) * 5.1, y0 + 3.5, M + Math.sin(b) * 5.1], { couleurs: [[2.6, 2.8, 3.2], [0.8, 1.6, 3.2]], rng, creux: 0.25, pas: 0.4 }); }
      // patineurs fantômes
      const sk = [], gS = new THREE.LatheGeometry([[0.0, 2.0], [0.2, 1.95], [0.26, 1.7], [0.2, 1.45], [0.38, 1.0], [0.5, 0.3], [0.62, 0.0]].map(p => new THREE.Vector2(p[0], p[1])), 14);
      for (let i = 0; i < 4; i++) { const m = new THREE.Mesh(gS, MAT.spectre); m.renderOrder = 6; m.position.y = y0 + 0.1; groupe.add(m); sk.push(m); }
      return [(t) => { sk.forEach((m, i) => { const a = t * (0.35 + i * 0.07) * (i % 2 ? -1 : 1) + i * 1.7, r = 7.5 + Math.sin(t * 0.5 + i) * 3; m.position.x = M + Math.cos(a) * r; m.position.z = M + Math.sin(a) * r; m.rotation.y = -a + (i % 2 ? Math.PI : 0); m.rotation.z = Math.sin(t * 2 + i) * 0.1; }); }];
    },
  };

  // 6. GRAND SAPIN BOSSU
  R.sapin = {
    maisons: false,
    plan(P, rng) { P.cyl(M, M, 3.2); P.spot = { x: M + 4.5, z: M + 4.5, dy: 0.8 }; const y = P.sol(M, M); lum(P, M, y + 6, M + 5, [1, 0.8, 0.5], 1.8, 16); fl(P, M, M, 9, [0.45, 0.32, 0.12]); for (let i = 0; i < 9; i++) { const a = rng() * 6, r = 4 + rng() * 2.5; P.cadeauxDeco.push({ x: M + Math.cos(a) * r, z: M + Math.sin(a) * r, s: 0.5 + rng() * 0.5 }); } },
    construire(L, P, rng) {
      const y0 = P.sol(M, M), H = 27;
      GEO.sapin(L, G.monde(M, y0 - 0.2, M, 0), NZ.rng(5), H, P.pal, true);
      const cols = [[0.8, 0.1, 0.15], [0.9, 0.7, 0.2], [0.2, 0.3, 0.8], [0.6, 0.15, 0.6], [0.85, 0.85, 0.9]];
      for (let i = 0; i < 70; i++) { const t = rng(), a = rng() * 6.28, r = H * 0.3 * (1 - t * 0.78) * 0.95, y = H * (0.18 + t * 0.7); const rr = 0.25 + rng() * 0.25; L.get('verni').add(G.base('sphere'), { m: G.mat(M + Math.cos(a) * r + (y / H) * (y / H) * 0, y0 + y, M + Math.sin(a) * r, rr, rr, rr), c: cols[i % 5] }); }
      return [];
    },
  };

  // 7. FONTAINE FIGÉE — jets gelés en plein élan
  R.fontaine = {
    maisons: true,
    plan(P) { P.cyl(M, M, 4.7, 0.95); P.cyl(M, M, 0.9); P.spot = { x: M + 5.6, z: M + 2, dy: 0.8 }; const y = P.sol(M, M); lum(P, M, y + 3, M, [0.7, 0.85, 1], 1.4, 12, 0.3); for (const a of [0.7, 2.3, 3.9, 5.5]) MONDE.ajLampe(P, M + Math.cos(a) * 7, M + Math.sin(a) * 7, -a + Math.PI, MONDE.palette(P.q).lampe); },
    construire(L, P, rng) {
      const y0 = P.sol(M, M), pi = [0.62, 0.62, 0.66];
      L.get('pierre').add(G.base('cyl16'), { m: G.mat(M, y0 + 0.35, M, 4.6, 0.9, 4.6), c: pi, uvm: 'monde' });
      L.get('glace').add(G.base('cyl16'), { m: G.mat(M, y0 + 0.62, M, 4.3, 0.5, 4.3), c: [1, 1, 1], uvm: 'monde', s: 0.15 });
      L.get('pierre').add(G.base('cyl12'), { m: G.mat(M, y0 + 2, M, 0.5, 3, 0.5), c: pi });
      L.get('pierre').add(G.base('cyl16'), { m: G.mat(M, y0 + 2.6, M, 2, 0.3, 2), c: pi });
      L.get('pierre').add(G.base('cyl12'), { m: G.mat(M, y0 + 3.9, M, 0.3, 2.4, 0.3), c: pi });
      L.get('pierre').add(G.base('cyl16'), { m: G.mat(M, y0 + 4.2, M, 1.1, 0.25, 1.1), c: pi });
      // statue étrange au sommet
      L.get('pierre').add(G.base('cone8'), { m: G.mat(M, y0 + 5.6, M, 0.5, 2.6, 0.5), c: [0.5, 0.55, 0.6] });
      L.get('pierre').add(G.base('sphere'), { m: G.mat(M, y0 + 7.0, M, 0.45, 0.55, 0.45), c: [0.5, 0.55, 0.6] });
      L.get('pierre').add(G.base('cone8'), { m: G.mat(M, y0 + 8.1, M, 0.32, 1.8, 0.32), c: [0.5, 0.55, 0.6], def: v => { const k = clamp((v.y - y0 - 7.2) / 1.8, 0, 1); v.x += k * k * k * 0.8; } });
      // jets de glace en arcs
      for (let i = 0; i < 10; i++) {
        const a = i / 10 * Math.PI * 2, h0 = i % 2 ? 4.3 : 2.7, r0 = i % 2 ? 1 : 1.9, r1 = 3.6 + (i % 2) * 0.4, pts = [];
        for (let k = 0; k <= 10; k++) { const t = k / 10, r = lerp(r0, r1, t), y = h0 + Math.sin(t * Math.PI * 0.85) * 1.6 - t * t * (h0 - 0.5); pts.push(new THREE.Vector3(M + Math.cos(a) * r, y0 + y, M + Math.sin(a) * r)); }
        const tb = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 16, 0.13, 6, false);
        const pa = tb.attributes.position, cvF = new THREE.CatmullRomCurve3(pts), csF = []; for (let q = 0; q <= 16; q++) csF.push(cvF.getPointAt(q / 16));
        for (let j = 0; j < pa.count; j++) { const t = Math.floor(j / 7) / 16; const c = csF[Math.min(16, Math.floor(j / 7))]; const k = 0.4 + t * 0.9 + Math.sin(j * 1.7) * 0.15; pa.setXYZ(j, c.x + (pa.getX(j) - c.x) * k, c.y + (pa.getY(j) - c.y) * k, c.z + (pa.getZ(j) - c.z) * k); }
        tb.computeVertexNormals(); L.get('verni').add(tb, { c: [0.62, 0.78, 0.92] });
      }
      L.get('emis').add(G.base('sphereB'), { m: G.mat(M, y0 + 4.45, M, 0.5, 0.2, 0.5), c: [0.8, 1.6, 2.6] });
      return [];
    },
  };

  // 8. ATELIER DES JOUETS PERDUS
  R.atelier = {
    maisons: true,
    plan(P, rng) {
      P.boite(M, M - 2, 5, 4, Math.PI); P.spot = { x: M + 3.2, z: M + 4.4, dy: 0.8 }; const y = P.sol(M, M);
      lum(P, M, y + 2.5, M + 3, [1, 0.75, 0.4], 1.6, 12); for (const dx of [-2.8, 2.8]) P.cyl(M + dx, M + 3.4, 0.4);
      P.atelier = { x: M, z: M - 2, w: 9.5, d: 7.5 };
    },
    construire(L, P, rng) {
      const y0 = P.sol(M, M), H = { w: 9.5, d: 7.5, etages: 2, hE: 3.3, hToit: 4.5, toit: 'pignon', mur: 'planche', cMur: [0.62, 0.4, 0.34], cBois: [0.3, 0.22, 0.18], cToit: [0.3, 0.25, 0.3], porteX: 0, fenType: 0, pAllume: 1, pGuirlande: 1, torsion: 0.08, courbe: [0.8, 0.3] };
      const o = GEO.maison(L, H, G.monde(M, y0, M - 2, 0), NZ.rng(77), P.pal);
      // enseigne + jouets devant
      L.get('bois').add(G.base('cube'), { m: G.mat(M, y0 + 3.0, M + 1.9, 3.6, 0.7, 0.12), c: [0.6, 0.15, 0.15] });
      L.get('emis').add(G.base('cube'), { m: G.mat(M, y0 + 3.0, M + 1.97, 3.2, 0.4, 0.02), c: [3, 2.2, 0.8] });
      for (const dx of [-2.8, 2.8]) {
        const x = M + dx, z = M + 3.4, c = dx < 0 ? [0.7, 0.1, 0.12] : [0.15, 0.25, 0.65];
        L.get('verni').add(G.base('cyl12'), { m: G.mat(x, y0 + 1.1, z, 0.35, 1.4, 0.3), c });
        L.get('verni').add(G.base('cyl12'), { m: G.mat(x, y0 + 0.2, z, 0.3, 0.4, 0.3), c: [0.1, 0.1, 0.12] });
        L.get('verni').add(G.base('sphere'), { m: G.mat(x, y0 + 2.05, z, 0.3, 0.32, 0.3), c: [0.95, 0.8, 0.65] });
        L.get('verni').add(G.base('cyl12'), { m: G.mat(x, y0 + 2.65, z, 0.28, 0.85, 0.28), c: [0.08, 0.08, 0.1] });
        L.get('verni').add(G.base('cube'), { m: G.mat(x, y0 + 1.95, z + 0.25, 0.3, 0.08, 0.05), c: [0.1, 0.1, 0.1] });
      }
      for (let i = 0; i < 7; i++) { const s = 0.5 + rng() * 0.3; L.get('verni').add(G.base('cube'), { m: G.mat(M - 5 + rng() * 10, y0 + s / 2 + (i > 4 ? s : 0), M + 5 + rng() * 3, s, s, s, 0, rng() * 6, 0), c: [[0.8, 0.2, 0.2], [0.2, 0.5, 0.8], [0.9, 0.75, 0.2], [0.3, 0.7, 0.3]][i % 4] }); }
      // toupie géante
      L.get('verni').add(G.base('cone12'), { m: G.mat(M + 5.5, y0 + 0.9, M + 3, 1, -1.2, 1), c: [0.8, 0.3, 0.6] });
      L.get('verni').add(G.base('cone12'), { m: G.mat(M + 5.5, y0 + 1.75, M + 3, 1, 0.5, 1), c: [0.9, 0.8, 0.3] });
      if (o.cheminee) P.feux.length; // (fumée gérée par la parcelle pour les maisons ordinaires)
      return [];
    },
  };

  // 9. PUITS AUX SOUHAITS
  R.puits = {
    maisons: true,
    plan(P, rng) { P.cyl(M, M, 1.5, 99); P.spot = { x: M + 2.6, z: M + 0.6, dy: 0.8 }; const y = P.sol(M, M); lum(P, M, y + 1.5, M, [0.5, 0.75, 1], 1.4, 9, 0.6); fl(P, M, M, 4, [0.15, 0.25, 0.45]); for (const a of [1, 2.6, 4.2, 5.8]) { const x = M + Math.cos(a) * 7, z = M + Math.sin(a) * 7; if (rng() < 0.6) { P.sapins.push({ x, z, h: 3.5 + rng() * 2, illum: true }); P.cyl(x, z, 0.5); } else { P.bancs.push({ x, z, a: -a - Math.PI / 2 }); P.cyl(x, z, 0.8, 0.9); } } },
    construire(L, P) {
      const y0 = P.sol(M, M);
      L.get('pierre').add(G.base('cyl16'), { m: G.mat(M, y0 + 0.45, M, 1.4, 1.1, 1.4), c: [0.58, 0.56, 0.58], uvm: 'monde' });
      L.get('emis').add(G.base('cyl16'), { m: G.mat(M, y0 + 0.75, M, 1.15, 0.02, 1.15), c: [0.4, 0.9, 2.2] });
      for (const dx of [-1.25, 1.25]) L.get('bois').add(G.base('cube'), { m: G.mat(M + dx, y0 + 1.6, M, 0.16, 2.4, 0.16), c: [0.45, 0.32, 0.25] });
      L.get('tuiles').add(G.base('pignon'), { m: G.mat(M, y0 + 2.7, M, 1.2, 1.1, 3.2, 0, Math.PI / 2, 0), c: [0.35, 0.25, 0.3], uvm: 'monde' });
      L.get('bois').add(G.base('cyl8'), { m: G.mat(M, y0 + 2.3, M, 0.08, 2.6, 0.08, 0, 0, Math.PI / 2), c: [0.4, 0.3, 0.22] });
      L.get('unie').add(G.base('cyl6'), { m: G.mat(M, y0 + 1.75, M, 0.015, 1.1, 0.015), c: [0.6, 0.55, 0.45] });
      L.get('bois').add(G.base('cyl12'), { m: G.mat(M, y0 + 1.1, M, 0.22, 0.3, 0.18), c: [0.45, 0.32, 0.25] });
      return [];
    },
  };

  // 10. GRANDE ROUE FIGÉE — arrêtée, ses nacelles se balancent
  R.roue = {
    maisons: false,
    plan(P) { for (const dx of [-2.2, 2.2]) for (const dz of [-3.2, 3.2]) P.cyl(M + dz, M + dx, 0.35); P.spot = { x: M + 0.5, z: M + 6.5, dy: 0.8 }; const y = P.sol(M, M); lum(P, M, y + 2.5, M + 4, [1, 0.75, 0.45], 1.4, 12); lum(P, M, y + 14, M, [1, 0.6, 0.6], 1.2, 18, 0); for (const a of [0.4, 2.7, 3.6, 5.9]) MONDE.ajLampe(P, M + Math.cos(a) * 10, M + Math.sin(a) * 10, -a + Math.PI, MONDE.palette(P.q).lampe); },
    construire(L, P, rng, groupe) {
      const y0 = P.sol(M, M), R0 = 10, yc = y0 + 12.2;
      for (const dx of [-1.3, 1.3]) for (const dz of [-3.3, 3.3]) L.get('metal').add(G.base('cube'), { m: G.mat(M + dz / 2, (y0 + yc) / 2, M + dx * 1.5, 0.18, 12.6, 0.18, dx > 0 ? 0.1 : -0.1, 0, -Math.atan2(dz / 2, 12.2)), c: [0.6, 0.15, 0.15] });
      const L2 = G.Lots();
      for (const sx of [-0.9, 0.9]) {
        L2.get('metal').add(G.base('toreFin'), { m: G.mat(sx, 0, 0, R0, R0, R0 * 1.6, 0, Math.PI / 2, 0), c: [0.85, 0.85, 0.88] });
        L2.get('metal').add(G.base('toreFin'), { m: G.mat(sx, 0, 0, R0 * 0.55, R0 * 0.55, R0, 0, Math.PI / 2, 0), c: [0.85, 0.85, 0.88] });
        for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; L2.get('metal').add(G.base('cube'), { m: G.mat(sx, Math.sin(a) * R0 / 2, Math.cos(a) * R0 / 2, 0.08, 0.08, R0, -a, 0, 0), c: [0.85, 0.85, 0.88] }); }
      }
      L2.get('metal').add(G.base('cyl12'), { m: G.mat(0, 0, 0, 0.5, 2.6, 0.5, 0, 0, Math.PI / 2), c: [0.5, 0.5, 0.52] });
      for (let i = 0; i < 48; i++) { const a = i / 48 * Math.PI * 2, b = (i + 1) / 48 * Math.PI * 2; G.guirlande(L2, [0, Math.sin(a) * R0, Math.cos(a) * R0], [0, Math.sin(b) * R0, Math.cos(b) * R0], { couleurs: [[3, 0.6, 0.5], [3, 2.4, 0.8], [0.6, 1.4, 3]], rng, creux: 0.02, pas: 0.6, r: 0.15 }); }
      const roue = maill(L2); roue.position.set(M, yc, M); roue.rotation.y = Math.PI / 2; groupe.add(roue);
      const nac = [], cols = [[0.7, 0.15, 0.2], [0.2, 0.4, 0.7], [0.85, 0.65, 0.2], [0.3, 0.55, 0.35]];
      for (let i = 0; i < 12; i++) {
        const a = i / 12 * Math.PI * 2, L3 = G.Lots(), c = cols[i % 4];
        L3.get('verni').add(G.base('cube'), { m: G.mat(0, -1.6, 0, 1.3, 0.9, 1.0), c });
        L3.get('verni').add(G.base('cube'), { m: G.mat(0, -0.9, 0, 1.4, 0.08, 1.1), c });
        L3.get('tissu').add(G.base('cone4'), { m: G.mat(0, -0.55, 0, 0.95, 0.5, 0.8), c: [0.9, 0.85, 0.8] });
        L3.get('metal').add(G.base('cube'), { m: G.mat(0, -0.3, 0, 0.05, 0.6, 0.05), c: NOIR });
        const n = maill(L3); n.position.set(M - Math.cos(a) * R0, yc + Math.sin(a) * R0, M); groupe.add(n); nac.push(n);
      }
      return [(t) => { nac.forEach((n, i) => { n.rotation.z = Math.sin(t * 0.9 + i) * 0.12; }); }];
    },
  };

  // 11. GARE DU TRAIN JOUET — un petit train tourne autour de la place
  R.gare = {
    maisons: false,
    plan(P) { P.boite(M, M - 2.5, 5.2, 1.7, 0, 0.75); P.spot = { x: M + 3, z: M - 2.5, dy: 1.4 }; const y = P.sol(M, M); lum(P, M, y + 3, M - 2.5, [1, 0.8, 0.5], 1.6, 12); fl(P, M, M - 2.5, 6, [0.45, 0.32, 0.14]); P.plateforme = { x: M, z: M - 2.5, hx: 5.2, hz: 1.7, h: 0.7 }; },
    construire(L, P, rng, groupe) {
      const y0 = P.sol(M, M), Rr = 10.5;
      L.get('pierre').add(G.base('cube'), { m: G.mat(M, y0 + 0.1, M - 2.5, 10.6, 1.2, 3.6), c: [0.6, 0.58, 0.58], uvm: 'monde' });
      for (const dx of [-4.5, -1.5, 1.5, 4.5]) L.get('metal').add(G.base('cyl8'), { m: G.mat(M + dx, y0 + 2.1, M - 3.6, 0.08, 2.8, 0.08), c: NOIR });
      L.get('tuiles').add(G.base('cube'), { m: G.mat(M, y0 + 3.55, M - 2.6, 11, 0.15, 3.6, 0.15, 0, 0), c: [0.4, 0.25, 0.25], uvm: 'monde' });
      L.get('bois').add(G.base('cube'), { m: G.mat(M, y0 + 3.0, M - 3.7, 3, 0.5, 0.08), c: [0.15, 0.25, 0.2] });
      L.get('emis').add(G.base('cube'), { m: G.mat(M, y0 + 3.0, M - 3.64, 2.6, 0.3, 0.02), c: [2.8, 2.2, 1.0] });
      L.get('bois').add(G.base('cube'), { m: G.mat(M - 3, y0 + 1.4, M - 4.1, 2.4, 2.6, 0.8), c: [0.45, 0.3, 0.25] });
      L.get('fenetre').add(G.base('plan'), { m: G.mat(M - 3, y0 + 1.5, M - 3.68, 1.2, 1.0, 1), c: [2.4, 1.6, 0.8], uvr: [0, 0.5, 0.5, 1] });
      // rails circulaires
      for (const r of [Rr - 0.45, Rr + 0.45]) { const tg = new THREE.TorusGeometry(r, 0.05, 4, 96); tg.rotateX(Math.PI / 2); L.get('metal').add(tg, { m: G.mat(M, y0 + 0.2, M, 1, 1, 1), c: [0.6, 0.6, 0.62] }); }
      for (let i = 0; i < 70; i++) { const a = i / 70 * Math.PI * 2; L.get('bois').add(G.base('cube'), { m: G.mat(M + Math.cos(a) * Rr, y0 + 0.08, M + Math.sin(a) * Rr, 0.25, 0.1, 1.4, 0, -a, 0), c: [0.4, 0.3, 0.22] }); }
      // le train
      const wag = [];
      for (let i = 0; i < 4; i++) {
        const L3 = G.Lots(), c = i === 0 ? [0.15, 0.15, 0.18] : [[0.7, 0.15, 0.15], [0.2, 0.45, 0.25], [0.2, 0.3, 0.6]][i - 1];
        L3.get('verni').add(G.base('cube'), { m: G.mat(0, 0.75, 0, 0.9, 0.9, 1.6), c });
        for (const dz of [-0.5, 0.5]) for (const dx of [-0.48, 0.48]) L3.get('metal').add(G.base('cyl12'), { m: G.mat(dx, 0.32, dz, 0.24, 0.08, 0.24, 0, 0, Math.PI / 2), c: [0.75, 0.6, 0.25] });
        if (i === 0) { L3.get('verni').add(G.base('cyl12'), { m: G.mat(0, 1.45, -0.4, 0.15, 0.6, 0.15), c }); L3.get('verni').add(G.base('cube'), { m: G.mat(0, 1.45, 0.45, 0.9, 0.6, 0.6), c: [0.6, 0.15, 0.15] }); L3.get('emis').add(G.base('sphereB'), { m: G.mat(0, 0.95, -0.82, 0.15, 0.15, 0.08), c: [4, 3.4, 1.8] }); }
        else L3.get('fenetre').add(G.base('plan'), { m: G.mat(0.46, 0.85, 0, 1, 0.5, 1, 0, Math.PI / 2, 0), c: [2.2, 1.5, 0.8], uvr: [0.5, 0, 1, 0.5] });
        const m = maill(L3); groupe.add(m); wag.push(m);
      }
      return [(t) => { wag.forEach((m, i) => { const a = t * 0.32 - i * 0.18; m.position.set(M + Math.cos(a) * Rr, y0 + 0.15, M + Math.sin(a) * Rr); m.rotation.y = -a + Math.PI; }); }];
    },
  };

  // 12. OBSERVATOIRE LUNAIRE — un télescope pointé vers la lune énorme
  R.observatoire = {
    maisons: true,
    plan(P) { P.cyl(M, M, 4.7); P.spot = { x: M, z: M + 6, dy: 0.8 }; const y = P.sol(M, M); lum(P, M, y + 2.5, M + 5.2, [1, 0.8, 0.5], 1.3, 10); fl(P, M, M + 5.4, 4, [0.4, 0.3, 0.14]); },
    construire(L, P, rng, groupe) {
      const y0 = P.sol(M, M);
      L.get('pierre').add(G.base('cyl16'), { m: G.mat(M, y0 + 2.4, M, 4.5, 5.2, 4.5), c: [0.62, 0.6, 0.64], uvm: 'monde', s: 0.5 });
      L.get('bois').add(G.base('cyl16'), { m: G.mat(M, y0 + 5.05, M, 4.75, 0.3, 4.75), c: [0.3, 0.22, 0.2] });
      const dir = CIEL.dirLune, ang = Math.atan2(dir.x, dir.z);
      const dome = new THREE.SphereGeometry(4.4, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2);
      L.get('metal').add(GEO_prep(dome), { m: G.mat(M, y0 + 5.2, M, 1, 1, 1), c: [0.55, 0.6, 0.7] });
      L.get('emis').add(G.base('cube'), { m: G.mat(M + Math.sin(ang) * 2.4, y0 + 8.1, M + Math.cos(ang) * 2.4, 1.0, 1.6, 2.6, -0.6, ang, 0), c: [1.2, 0.9, 0.5] });
      const el = Math.asin(dir.y), q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dir.x, dir.y, dir.z).normalize());
      const mt = new THREE.Matrix4().compose(new THREE.Vector3(M + Math.sin(ang) * 2.2, y0 + 7.4 + Math.sin(el) * 1.5, M + Math.cos(ang) * 2.2), q, new THREE.Vector3(0.45, 6, 0.45));
      L.get('verni').add(G.base('cyl12'), { m: mt, c: [0.75, 0.6, 0.3] });
      L.get('porte').add(G.base('plan'), { m: G.mat(M, y0 + 1.2, M + 4.52, 1.3, 2.4, 1), c: [1, 1, 1] });
      for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + 0.5; L.get('fenetre').add(G.base('plan'), { m: G.mat(M + Math.sin(a) * 4.52, y0 + 3.2, M + Math.cos(a) * 4.52, 0.7, 1.1, 1, 0, a, 0), c: P.pal.fenetre(rng), uvr: [0, 0, 0.5, 0.5] }); }
      return [];
    },
  };
  function GEO_prep(g) { if (!g.index) { const n = g.attributes.position.count, ix = new Uint32Array(n); for (let i = 0; i < n; i++) ix[i] = i; g.setIndex(new THREE.BufferAttribute(ix, 1)); } return g; }
  return R;
})();
