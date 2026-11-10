/* ===================== CONSTRUCTION 3D D'UNE PARCELLE =====================
   Transforme le plan (MONDE.plan) en maillages : sol (neige + pavés), maisons, lampadaires, sapins, citrouilles…,
   flaques de lumière, glace, flammes et fumées animées, et le repère éventuel. Un lot par matière = un maillage. */
const PARCELLE = (() => {
  const X = {};
  const C = MONDE.C, RUE = MONDE.RUE;
  // ---- particules (flammes, fumées des cheminées) : animées entièrement dans le shader ----
  let matFeu = null, matFumee = null;
  function matsParticules() {
    if (matFeu) return;
    const vs = (montee, taille, vie) => MAT.MONDE_GLSL + `uniform float uEchelle; attribute float graine; varying float vT;
      #include <fog_pars_vertex>
      void main(){ float t = fract(uTemps * ${vie} + graine); vT = t; vec3 transformed = position;
        transformed.x += sin(graine * 41.0 + uTemps * 1.3) * 0.18 * t + (t * t) * ${montee === 'fumee' ? '1.4' : '0.0'};
        transformed.z += cos(graine * 29.0 + uTemps) * 0.18 * t;
        transformed.y += t * ${montee === 'fumee' ? '5.5' : '1.5'};
        ${COURBE_PART}
        gl_PointSize = ${taille} * uEchelle / max(1.0, -mvPosition.z);
        #include <fog_vertex>
      }`;
    const COURBE_PART = MAT.PROJ_GLSL;
    const U = MAT.U;
    const mk = (v, f, tex, add) => {
      const m = new THREE.ShaderMaterial({ uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, { tex: { value: tex }, uEchelle: { value: 300 } }]), vertexShader: v, fragmentShader: f, transparent: true, depthWrite: false, blending: add ? THREE.AdditiveBlending : THREE.NormalBlending, fog: true, toneMapped: false });
      m.uniforms.uCourbe = U.uCourbe; m.uniforms.uCentre = U.uCentre; m.uniforms.uTemps = U.uTemps; m.uniforms.uEchelle = U.uEchelle; m.uniforms.tex.value = tex; return m;
    };
    matFeu = mk(vs('feu', '0.5', '1.15'), `uniform sampler2D tex; varying float vT;
      #include <fog_pars_fragment>
      void main(){ vec4 c = texture2D(tex, gl_PointCoord); vec3 col = mix(vec3(3.0, 2.2, 1.0), vec3(1.8, 0.35, 0.05), vT);
        gl_FragColor = vec4(col * c.a * (1.0 - vT) * 1.4, 1.0);
        #include <fog_fragment>
      }`, TEX.flamme, true);
    matFumee = mk(vs('fumee', '2.4', '0.11'), `uniform sampler2D tex; varying float vT;
      #include <fog_pars_fragment>
      void main(){ vec4 c = texture2D(tex, gl_PointCoord); gl_FragColor = vec4(vec3(0.32, 0.33, 0.38), c.a * 0.22 * sin(vT * 3.14159));
        #include <fog_fragment>
      }`, TEX.lueur, false);
    X.matFeu = matFeu; X.matFumee = matFumee;
  }
  X.echelleParticules = v => { MAT.U.uEchelle.value = v; };
  function points(src, n, mat) {
    const pos = [], gr = [];
    for (const p of src) for (let i = 0; i < n; i++) { pos.push(p.x + (Math.random() - 0.5) * 0.3, p.y, p.z + (Math.random() - 0.5) * 0.3); gr.push(i / n + Math.random() * 0.05); }
    if (!pos.length) return null;
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('graine', new THREE.Float32BufferAttribute(gr, 1));
    g.computeBoundingSphere(); g.boundingSphere.radius += 26;
    const o = new THREE.Points(g, mat); o.renderOrder = 5; return o;
  }

  // ---- petits modèles propres aux quartiers ----
  function bonhomme(L, w, rng) {
    const blanc = [0.95, 0.95, 1];
    L.get('unie').add(GEO.base('sphere'), { m: GEO.mat(0, 0.45, 0, 0.55, 0.5, 0.55), c: blanc, w });
    L.get('unie').add(GEO.base('sphere'), { m: GEO.mat(0.04, 1.12, 0, 0.4, 0.38, 0.4), c: blanc, w });
    L.get('unie').add(GEO.base('sphere'), { m: GEO.mat(0.1, 1.62, 0.02, 0.27, 0.28, 0.27, 0, 0, 0.2), c: blanc, w });
    L.get('unie').add(GEO.base('cone8'), { m: GEO.mat(0.12, 1.62, 0.42, 0.05, 0.4, 0.05, Math.PI / 2, 0, 0), c: [1, 0.4, 0.05], w });
    L.get('emis').add(GEO.base('sphereB'), { m: GEO.mat(0.02, 1.7, 0.24, 0.04, 0.04, 0.03), c: [2.5, 0.4, 0.2], w });
    L.get('emis').add(GEO.base('sphereB'), { m: GEO.mat(0.2, 1.72, 0.22, 0.04, 0.04, 0.03), c: [2.5, 0.4, 0.2], w });
    for (let i = 0; i < 5; i++) L.get('unie').add(GEO.base('sphereB'), { m: GEO.mat(-0.06 + i * 0.07, 1.52 + Math.sin(i * 0.8) * 0.03, 0.24, 0.025, 0.025, 0.025), c: [0.05, 0.05, 0.05], w });
    for (const sx of [-1, 1]) L.get('ecorce').add(GEO.base('cyl6'), { m: GEO.mat(sx * 0.6, 1.25, 0, 0.025, 0.8, 0.025, 0, 0, sx * 1.0), c: [0.5, 0.4, 0.35], w });
    L.get('unie').add(GEO.base('cyl12'), { m: GEO.mat(0.1, 1.9, 0, 0.2, 0.3, 0.2, 0, 0, 0.25), c: [0.08, 0.08, 0.1], w });
    L.get('unie').add(GEO.base('tore'), { m: GEO.mat(0.04, 1.36, 0, 0.3, 0.3, 0.3, Math.PI / 2, 0, 0), c: [0.6, 0.08, 0.1], w });
  }
  function epouvantail(L, w) {
    L.get('bois').add(GEO.base('cube'), { m: GEO.mat(0, 1.1, 0, 0.1, 2.4, 0.1), c: [0.5, 0.38, 0.28], w });
    L.get('bois').add(GEO.base('cube'), { m: GEO.mat(0, 1.6, 0, 1.6, 0.09, 0.09), c: [0.5, 0.38, 0.28], w });
    L.get('tissu').add(GEO.base('cyl8'), { m: GEO.mat(0, 1.3, 0, 0.32, 0.8, 0.22), c: [0.45, 0.3, 0.5], w });
    L.get('unie').add(GEO.base('sphere'), { m: GEO.mat(0, 2.2, 0, 0.26, 0.3, 0.26), c: [0.75, 0.62, 0.42], w });
    L.get('unie').add(GEO.base('cone8'), { m: GEO.mat(0.05, 2.62, 0, 0.36, 0.55, 0.36, 0, 0, -0.25), c: [0.15, 0.12, 0.12], w });
    L.get('unie').add(GEO.base('cyl16'), { m: GEO.mat(0, 2.38, 0, 0.48, 0.03, 0.48), c: [0.15, 0.12, 0.12], w });
    L.get('emis').add(GEO.base('sphereB'), { m: GEO.mat(-0.09, 2.24, 0.22, 0.045, 0.06, 0.03), c: [3, 1.6, 0.2], w });
    L.get('emis').add(GEO.base('sphereB'), { m: GEO.mat(0.09, 2.24, 0.22, 0.045, 0.06, 0.03), c: [3, 1.6, 0.2], w });
  }
  const TENTES = [[0.85, 0.2, 0.2], [0.2, 0.45, 0.3], [0.5, 0.25, 0.6], [0.85, 0.65, 0.2]];
  function tente(L, w, t, pal, rng) {
    const c = TENTES[t.coul];
    L.get('tissu').add(GEO.base('cyl16'), { m: GEO.mat(0, t.h / 2, 0, t.r, t.h, t.r), c, w });
    L.get('tissu').add(GEO.base('cone12'), { m: GEO.mat(0, t.h + t.hc / 2, 0, t.r * 1.15, t.hc, t.r * 1.15), c, def: v => { const k = clamp((v.y - t.h) / t.hc, 0, 1); v.x += Math.pow(k, 3) * 0.6; }, w });
    L.get('emis').add(GEO.base('plan'), { m: GEO.mat(0, 1.0, t.r + 0.02, 1.2, 1.8, 1), c: [2.2, 1.4, 0.6], w });
    const n = 14; for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2, b = (i + 1) / n * Math.PI * 2, R = t.r * 1.15; GEO.guirlande(L, [Math.cos(a) * R, t.h + 0.02, Math.sin(a) * R], [Math.cos(b) * R, t.h + 0.02, Math.sin(b) * R], { couleurs: pal.guirlande, w, rng, creux: 0.12 }); }
  }
  function poteau(L, w) {
    L.get('sucre').add(GEO.base('crochet'), { m: GEO.mat(0, 0, 0, 3.4, 3.4, 3.4), c: [1, 1, 1], w });
  }
  // ---- lanterne-relais (point de sauvegarde) : socle de pierre, colonne torsadée, cage ----
  function relais(L, w) {
    L.get('pierre').add(GEO.base('cyl8'), { m: GEO.mat(0, 0.25, 0, 0.75, 0.7, 0.75), c: [0.55, 0.55, 0.58], w });
    L.get('pierre').add(GEO.base('cyl8'), { m: GEO.mat(0, 0.75, 0, 0.5, 0.4, 0.5), c: [0.5, 0.5, 0.53], w });
    L.get('metal').add(GEO.base('cyl8'), { m: GEO.mat(0, 2.7, 0, 0.1, 3.6, 0.1), c: [0.15, 0.15, 0.17], def: v => { const a = v.y * 2.2; const x = v.x, z = v.z; v.x = x * Math.cos(a) - z * Math.sin(a) + Math.sin(v.y * 3) * 0.03; v.z = x * Math.sin(a) + z * Math.cos(a); }, w });
    for (let i = 0; i < 4; i++) L.get('metal').add(GEO.base('boucle'), { m: GEO.mat(0, 3.6, 0, 0.9, 0.9, 0.9, 0, i * Math.PI / 2, 0), c: [0.15, 0.15, 0.17], w });
    for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; L.get('metal').add(GEO.base('cube'), { m: GEO.mat(Math.cos(a) * 0.32, 5.0, Math.sin(a) * 0.32, 0.04, 0.95, 0.04), c: [0.15, 0.15, 0.17], w }); }
    L.get('metal').add(GEO.base('cyl8'), { m: GEO.mat(0, 4.5, 0, 0.42, 0.08, 0.42), c: [0.15, 0.15, 0.17], w });
    L.get('metal').add(GEO.base('cone8'), { m: GEO.mat(0, 5.75, 0, 0.5, 0.6, 0.5), c: [0.15, 0.15, 0.17], def: v => { const k = clamp((v.y - 5.45) / 0.6, 0, 1); v.x += k * k * k * 0.35; }, w });
  }

  X.construire = function (P, Q) {
    matsParticules();
    const L = GEO.Lots(), rng = NZ.rng((P.cx * 73856093) ^ (P.cz * 19349663) ^ MONDE.graine);
    const groupe = new THREE.Group(); groupe.position.set(P.X0, 0, P.Z0);
    const anims = [], sol = P.sol;
    // ---- sol ----
    const seg = Q >= 1 ? 44 : 30, g = new THREE.PlaneGeometry(C, C, seg, seg); g.rotateX(-Math.PI / 2); g.translate(C / 2, 0, C / 2);
    const pos = g.attributes.position, nrm = g.attributes.normal, uv = g.attributes.uv, n = pos.count;
    const route = new Float32Array(n), col = new Float32Array(n * 3);
    const tq = { bourg: [1, 1, 1], citrouilles: [0.98, 0.95, 0.92], sapins: [0.93, 0.97, 0.95], cimetiere: [0.86, 0.92, 1], lac: [0.92, 0.96, 1], foire: [1, 0.97, 0.97] }[P.q];
    const plaza = P.place;
    const boites = P.maisons.map(H => ({ x: H.x, z: H.z, c: Math.cos(H.ang), s: Math.sin(H.ang), hx: H.w / 2, hz: H.d / 2 }));
    for (let i = 0; i < n; i++) {
      const x = pos.getX(i), z = pos.getZ(i), y = sol(x, z); pos.setY(i, y);
      const e = 0.4, dx = sol(x + e, z) - sol(x - e, z), dz = sol(x, z + e) - sol(x, z - e), l = Math.hypot(dx, 2 * e, dz);
      nrm.setXYZ(i, -dx / l, 2 * e / l, -dz / l);
      uv.setXY(i, (P.X0 + x) * 0.25, (P.Z0 + z) * 0.25);
      const dE = Math.min(x, C - x, z, C - z);
      let r = (1 - sstep(RUE - 0.5, RUE + 0.6, dE + (NZ.vn((P.X0 + x) * 0.7, (P.Z0 + z) * 0.7, 3) - 0.5) * 0.8)) * P.routeK;
      if (plaza) r = Math.max(r, (1 - sstep(10.5, 13.5, Math.hypot(x - C / 2, z - C / 2))) * 0.85);
      route[i] = r;
      const v = 0.94 + NZ.vn((P.X0 + x) * 0.08, (P.Z0 + z) * 0.08, 4) * 0.08;
      let ao = 1; // ombre de contact au pied des maisons
      for (const b of boites) { const dx = x - b.x, dz = z - b.z; if (Math.abs(dx) > 9 || Math.abs(dz) > 9) continue; const lx = Math.abs(dx * b.c - dz * b.s) - b.hx, lz = Math.abs(dx * b.s + dz * b.c) - b.hz; const d = lx < 0 && lz < 0 ? 0 : Math.hypot(Math.max(lx, 0), Math.max(lz, 0)); ao = Math.min(ao, 0.5 + 0.5 * sstep(0, 1.7, d)); }
      col[i * 3] = tq[0] * v * ao; col[i * 3 + 1] = tq[1] * v * ao; col[i * 3 + 2] = tq[2] * v * ao;
    }
    g.setAttribute('route', new THREE.BufferAttribute(route, 1)); g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    g.computeBoundingSphere(); g.boundingSphere.radius += 26;
    const msol = new THREE.Mesh(g, MAT.sol); msol.receiveShadow = true; groupe.add(msol);

    // ---- maisons ----
    const fumees = [], flaquesM = [];
    for (const H of P.maisons) {
      const w = GEO.monde(H.x, H.y, H.z, H.ang);
      const r2 = NZ.rng((P.cx * 92821 + H.id * 31) ^ (P.cz * 68917) ^ MONDE.graine);
      const o = GEO.maison(L, H, w, r2, P.pal);
      const c = Math.cos(H.ang), s = Math.sin(H.ang);
      for (const f of o.flaques) flaquesM.push({ x: H.x + c * f.x + s * f.z, z: H.z - s * f.x + c * f.z, r: f.r, c: f.c });
      if (!H.lumOk) { H.lumOk = true; for (const l of o.lumieres) P.lumieres.push({ x: H.x + c * l.x + s * l.z, y: H.y + l.y, z: H.z - s * l.x + c * l.z, c: l.c, i: l.i, r: l.r }); }
      if (o.cheminee && r2() < 0.6) { const ch = o.cheminee; const v = new THREE.Vector3(ch.x, ch.y, ch.z); v.applyMatrix4(w); fumees.push({ x: v.x, y: v.y, z: v.z }); }
    }
    // ---- lampadaires ----
    for (const l of P.lampes) GEO.lampadaire(L, GEO.monde(l.x, sol(l.x, l.z), l.z, l.ang), l.col, l.haut);
    if (P.relais) relais(L, GEO.monde(0, sol(0, 0), 0, 0));
    // ---- végétation et décors ----
    for (const t of P.sapins) GEO.sapin(L, GEO.monde(t.x, sol(t.x, t.z) - 0.1, t.z, rng() * 6), rng, t.h, P.pal, t.illum);
    for (const t of P.morts) GEO.arbreMort(L, GEO.monde(t.x, sol(t.x, t.z), t.z, rng() * 6), rng, t.h);
    for (const t of P.citrouilles) GEO.citrouille(L, GEO.monde(t.x, sol(t.x, t.z) - 0.05, t.z, t.a), rng, t.s, t.lant);
    for (const t of P.tombes) GEO.tombe(L, GEO.mat(t.x, sol(t.x, t.z), t.z, 1, 1, 1, 0, t.a, t.pen), rng);
    for (const t of P.feux) GEO.brasero(L, GEO.monde(t.x, sol(t.x, t.z), t.z, 0));
    for (const t of P.bancs) GEO.banc(L, GEO.monde(t.x, sol(t.x, t.z), t.z, t.a));
    for (const t of P.bonshommes) bonhomme(L, GEO.monde(t.x, sol(t.x, t.z), t.z, t.a), rng);
    for (const t of P.epouvantails) epouvantail(L, GEO.monde(t.x, sol(t.x, t.z), t.z, t.a));
    for (const t of P.tentes) tente(L, GEO.monde(t.x, sol(t.x, t.z), t.z, t.a), t, P.pal, rng);
    for (const t of P.poteaux) poteau(L, GEO.monde(t.x, sol(t.x, t.z), t.z, t.a));
    if (P.liens) for (const [a, b] of P.liens) GEO.guirlande(L, [a.x, sol(a.x, a.z) + 3.3, a.z], [b.x, sol(b.x, b.z) + 3.3, b.z], { couleurs: P.pal.guirlande, rng, creux: 0.9, pas: 0.5 });
    for (const t of P.cadeauxDeco) GEO.cadeauDeco(L, GEO.monde(t.x, sol(t.x, t.z), t.z, 0), rng, t.s);
    for (const c of P.clotures) GEO.cloture(L, c.a, c.b, GEO.monde(0, sol((c.a[0] + c.b[0]) / 2, (c.a[1] + c.b[1]) / 2) - 0.1, 0, 0));
    // ---- glace (lac) ----
    if (P.lac) {
      const gi = new THREE.CircleGeometry(P.lac.r + 0.6, 48); gi.rotateX(-Math.PI / 2);
      L.get('glace').add(GEOprep(gi), { m: GEO.mat(P.lac.x, sol(P.lac.x, P.lac.z) + 0.03, P.lac.z, 1, 1, 1), c: [1, 1, 1], uvm: 'monde', s: 0.12 });
    }
    // ---- repère ----
    { const r = REPERES[P.type].construire(L, P, rng, groupe, Q); if (r) anims.push(...r); }
    // ---- flaques de lumière (posées sur le relief) ----
    const pl = GEO.base('plan9');
    for (const f of P.flaques.concat(flaquesM)) {
      L.get('flaque').add(pl, { m: GEO.mat(f.x, 0, f.z, f.r * 2, f.r * 2, 1, -Math.PI / 2, 0, 0), c: f.c, def: v => { v.y = sol(v.x, v.z) + 0.05; } });
    }
    // ---- maillages ----
    for (const k in L.tous) { const m = GEO.maillage(k, L.tous[k], Q >= 1); if (m) groupe.add(m); }
    // ---- flammes et fumées ----
    const pf = points(P.feux.map(f => ({ x: f.x, y: sol(f.x, f.z) + 0.85, z: f.z })), Q >= 1 ? 18 : 10, matFeu); if (pf) groupe.add(pf);
    const pfu = points(fumees, 9, matFumee); if (pfu) groupe.add(pfu);
    return {
      groupe, anims,
      liberer() { groupe.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.userData.matPropre) o.material.dispose(); }); },
    };
  };
  function GEOprep(gm) { if (!gm.index) { const nn = gm.attributes.position.count, ix = new Uint32Array(nn); for (let i = 0; i < nn; i++) ix[i] = i; gm.setIndex(new THREE.BufferAttribute(ix, 1)); } return gm; }
  return X;
})();
