/* ===================== OBJETS VIVANTS : bonbons, cadeaux, lueurs, curiosités, spectres =====================
   Dessinés en « instances » (un seul appel de dessin pour tous les bonbons, un pour tous les cadeaux…). */
const ENT = (() => {
  const E = { bonbons: [], cadeaux: [], spots: [], spectres: [], lueurs: [] };
  const MAXB = 420, MAXC = 48, MAXS = 12, MAXL = 160, MAXSP = 8;
  let mB, mBo, mC, mCn, mS, pts, lgeo;
  const _col = new THREE.Color(), _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _p = new THREE.Vector3(), _s = new THREE.Vector3();
  E.creer = function (scene) {
    // bonbon : sucre d'orge enveloppé (boule + deux torsades)
    const L = GEO.Lots();
    L.get('x').add(GEO.base('sphere'), { m: GEO.mat(0, 0, 0, 0.17, 0.12, 0.12), c: [1, 1, 1] });
    L.get('x').add(GEO.base('cone8'), { m: GEO.mat(0.25, 0, 0, 0.1, 0.16, 0.1, 0, 0, Math.PI / 2), c: [1, 1, 1] });
    L.get('x').add(GEO.base('cone8'), { m: GEO.mat(-0.25, 0, 0, 0.1, 0.16, 0.1, 0, 0, -Math.PI / 2), c: [1, 1, 1] });
    const gB = L.tous.x.geometrie();
    const matB = new THREE.MeshStandardMaterial({ map: TEX.bonbon, emissiveMap: TEX.bonbon, emissive: 0xffffff, emissiveIntensity: 0.45, roughness: 0.25, envMapIntensity: 1.2 });
    MATpatch(matB, 'bonbon');
    mB = new THREE.InstancedMesh(gB, matB, MAXB); mB.count = 0; mB.frustumCulled = false; scene.add(mB);
    const matO = new THREE.MeshStandardMaterial({ color: 0xffc845, emissive: 0xffa020, emissiveIntensity: 1.2, metalness: 0.9, roughness: 0.25 });
    MATpatch(matO, 'or');
    mBo = new THREE.InstancedMesh(gB, matO, 40); mBo.count = 0; mBo.frustumCulled = false; scene.add(mBo);
    // cadeau : boîte (papier teinté) + nœud doré
    const gC = new THREE.BoxGeometry(0.62, 0.5, 0.62);
    const matC = new THREE.MeshStandardMaterial({ map: TEX.cadeau, roughness: 0.45, emissive: 0x332211, emissiveIntensity: 0.4, envMapIntensity: 1 });
    MATpatch(matC, 'cad');
    mC = new THREE.InstancedMesh(gC, matC, MAXC); mC.count = 0; mC.frustumCulled = false; scene.add(mC);
    const Ln = GEO.Lots();
    Ln.get('x').add(GEO.base('tore'), { m: GEO.mat(-0.12, 0.33, 0, 0.13, 0.1, 0.13, 0, Math.PI / 2, 0.5), c: [1, 1, 1] });
    Ln.get('x').add(GEO.base('tore'), { m: GEO.mat(0.12, 0.33, 0, 0.13, 0.1, 0.13, 0, Math.PI / 2, -0.5), c: [1, 1, 1] });
    const matN = new THREE.MeshStandardMaterial({ color: 0xf2c14e, emissive: 0x805010, emissiveIntensity: 0.6, metalness: 0.6, roughness: 0.3 });
    MATpatch(matN, 'noeud');
    mCn = new THREE.InstancedMesh(Ln.tous.x.geometrie(), matN, MAXC); mCn.count = 0; mCn.frustumCulled = false; scene.add(mCn);
    // curiosité : cristal qui tourne
    const matS = new THREE.MeshBasicMaterial({ color: new THREE.Color(2.2, 1.6, 3.2), toneMapped: false });
    MATpatch(matS, 'spot');
    mS = new THREE.InstancedMesh(new THREE.OctahedronGeometry(0.28, 0), matS, MAXS); mS.count = 0; mS.frustumCulled = false; scene.add(mS);
    // lueurs (halos additifs) : cadeaux, portes qui attendent, lanternes-relais, curiosités, yeux des spectres
    lgeo = new THREE.BufferGeometry();
    lgeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(MAXL * 3), 3));
    lgeo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(MAXL * 3), 3));
    lgeo.setAttribute('taille', new THREE.BufferAttribute(new Float32Array(MAXL), 1));
    const U = MAT.U;
    const matL = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, { tex: { value: TEX.lueur }, uEchelle: { value: 300 } }]),
      vertexShader: `uniform float uCourbe; uniform vec2 uCentre; uniform float uEchelle; attribute float taille; varying vec3 vC;
        #include <fog_pars_vertex>
        void main(){ vC = color; vec4 wPos = vec4(position, 1.0); vec2 dC = wPos.xz - uCentre; wPos.y -= dot(dC, dC) * uCourbe;
          vec4 mvPosition = viewMatrix * wPos; gl_Position = projectionMatrix * mvPosition; gl_PointSize = taille * uEchelle / max(0.5, -mvPosition.z);
          #include <fog_vertex>
        }`,
      fragmentShader: `uniform sampler2D tex; varying vec3 vC;
        #include <fog_pars_fragment>
        void main(){ vec4 c = texture2D(tex, gl_PointCoord); gl_FragColor = vec4(vC * c.a, 1.0);
          #include <fog_fragment>
        }`,
      vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: true, toneMapped: false,
    });
    matL.uniforms.uCourbe = U.uCourbe; matL.uniforms.uCentre = U.uCentre; matL.uniforms.tex.value = TEX.lueur;
    E.matLueur = matL;
    pts = new THREE.Points(lgeo, matL); pts.frustumCulled = false; pts.renderOrder = 9; scene.add(pts);
    // spectres (voile + yeux)
    const gS = new THREE.LatheGeometry([[0.0, 2.15], [0.24, 2.08], [0.34, 1.82], [0.3, 1.5], [0.4, 1.1], [0.55, 0.55], [0.72, 0.1], [0.76, 0.0]].map(p => new THREE.Vector2(p[0], p[1])), 18);
    const gO = new THREE.SphereGeometry(0.07, 8, 6);
    const matO2 = new THREE.MeshBasicMaterial({ color: 0x05060a }); MATpatch(matO2, 'oeil');
    for (let i = 0; i < MAXSP; i++) {
      const g = new THREE.Group(); const m = new THREE.Mesh(gS, MAT.spectre.clone()); m.renderOrder = 7; g.add(m);
      m.material.uniforms.uCourbe = U.uCourbe; m.material.uniforms.uCentre = U.uCentre; m.material.uniforms.uTemps = U.uTemps;
      for (const sx of [-0.11, 0.11]) { const o = new THREE.Mesh(gO, matO2); o.position.set(sx, 1.8, 0.27); o.scale.set(1, 1.5, 0.6); g.add(o); }
      const bo = new THREE.Mesh(gO, matO2); bo.position.set(0, 1.6, 0.29); bo.scale.set(1.3, 0.7, 0.5); g.add(bo);
      g.visible = false; scene.add(g);
      E.spectres.push({ g, m, actif: false, x: 0, y: 0, z: 0, vx: 0, vz: 0, t: 0, fuite: 0, alpha: 0, cible: 0, vie: 0 });
    }
  };
  function MATpatch(m, cle) { m.onBeforeCompile = sh => { Object.assign(sh.uniforms, { uCourbe: MAT.U.uCourbe, uCentre: MAT.U.uCentre }); sh.vertexShader = 'uniform float uCourbe; uniform vec2 uCentre;\n' + sh.vertexShader.replace('#include <project_vertex>', `vec4 wPos = vec4(transformed, 1.0);
      #ifdef USE_INSTANCING
        wPos = instanceMatrix * wPos;
      #endif
      wPos = modelMatrix * wPos; vec2 dC = wPos.xz - uCentre; wPos.y -= dot(dC, dC) * uCourbe; vec4 mvPosition = viewMatrix * wPos; gl_Position = projectionMatrix * mvPosition;`); }; m.customProgramCacheKey = () => 'ent' + cle; }
  E.MATpatch = MATpatch;
  const COULC = [[0.75, 0.12, 0.14], [0.12, 0.5, 0.25], [0.2, 0.3, 0.8], [0.55, 0.2, 0.65], [0.9, 0.9, 0.92]];
  // ---- mise à jour des instances (appelée à chaque image) ----
  E.dessiner = function (t, liste) {
    let nb = 0, no = 0;
    for (const b of liste.bonbons) {
      _e.set(0.3, t * 2 + b.ph, 0.4 * Math.sin(t + b.ph)); _q.setFromEuler(_e); _p.set(b.x, b.y + Math.sin(t * 2.2 + b.ph) * 0.12, b.z);
      const sc = b.vole ? 0.8 : 1; _s.set(sc, sc, sc); _m.compose(_p, _q, _s);
      if (b.or) { if (no < 40) mBo.setMatrixAt(no++, _m); } else if (nb < MAXB) mB.setMatrixAt(nb++, _m);
    }
    mB.count = nb; mBo.count = no; mB.instanceMatrix.needsUpdate = true; mBo.instanceMatrix.needsUpdate = true;
    let nc = 0;
    for (const c of liste.cadeaux) {
      if (nc >= MAXC) break;
      _e.set(0, t * 0.8 + c.ph, 0); _q.setFromEuler(_e); _p.set(c.x, c.y + 0.35 + Math.sin(t * 1.6 + c.ph) * 0.1, c.z); _s.set(1, 1, 1); _m.compose(_p, _q, _s);
      mC.setMatrixAt(nc, _m); mCn.setMatrixAt(nc, _m);
      const cc = COULC[c.coul % 5]; mC.setColorAt(nc, _col.setRGB(cc[0], cc[1], cc[2])); nc++;
    }
    mC.count = nc; mCn.count = nc; mC.instanceMatrix.needsUpdate = true; mCn.instanceMatrix.needsUpdate = true; if (mC.instanceColor) mC.instanceColor.needsUpdate = true;
    let ns = 0;
    for (const s of liste.spots) { if (ns >= MAXS) break; _e.set(t * 0.7, t * 1.3, 0); _q.setFromEuler(_e); _p.set(s.x, s.y + Math.sin(t * 1.5) * 0.15, s.z); _s.set(1, 1.4, 1); _m.compose(_p, _q, _s); mS.setMatrixAt(ns++, _m); }
    mS.count = ns; mS.instanceMatrix.needsUpdate = true;
    // lueurs
    const P = lgeo.attributes.position.array, Cc = lgeo.attributes.color.array, T = lgeo.attributes.taille.array; let nl = 0;
    for (const l of liste.lueurs) { if (nl >= MAXL) break; P[nl * 3] = l.x; P[nl * 3 + 1] = l.y; P[nl * 3 + 2] = l.z; Cc[nl * 3] = l.c[0]; Cc[nl * 3 + 1] = l.c[1]; Cc[nl * 3 + 2] = l.c[2]; T[nl] = l.s; nl++; }
    lgeo.setDrawRange(0, nl); lgeo.attributes.position.needsUpdate = true; lgeo.attributes.color.needsUpdate = true; lgeo.attributes.taille.needsUpdate = true;
  };
  E.echelle = v => { if (E.matLueur) E.matLueur.uniforms.uEchelle.value = v; };
  return E;
})();
