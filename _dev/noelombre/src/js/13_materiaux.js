/* ===================== MATIÈRES : rendu physique + « petite planète » + neige posée =====================
   Deux retouches de shader appliquées à presque toutes les matières :
   - COURBURE : le monde s'enfonce doucement avec la distance au joueur (y -= d² × k). Avec le brouillard, on se sent
     dans une petite bulle, comme sur une planète minuscule, alors que la ville est infinie.
   - NEIGE : toute surface tournée vers le ciel se couvre de neige (selon sa pente et un bruit), d'où des toits, des
     rebords et des branches enneigés sans modéliser la neige à part.
   Les ombres (lune) sont calculées sans courbure : près du joueur la courbure est négligeable, donc tout concorde. */
const MAT = (() => {
  const U = { uCourbe: { value: 0.0022 }, uCentre: { value: new THREE.Vector2() }, uTemps: { value: 0 }, uNeige: { value: 1 } };
  const COURBE_GLSL = `
    vec4 wPos = vec4(transformed, 1.0);
    #ifdef USE_INSTANCING
      wPos = instanceMatrix * wPos;
    #endif
    wPos = modelMatrix * wPos;
    vec2 dC = wPos.xz - uCentre; wPos.y -= dot(dC, dC) * uCourbe;
    vec4 mvPosition = viewMatrix * wPos;
    gl_Position = projectionMatrix * mvPosition;`;
  const TETE_V = 'uniform float uCourbe; uniform vec2 uCentre; uniform float uTemps;\n';
  function courber(shader, neige) {
    Object.assign(shader.uniforms, U);
    let v = shader.vertexShader;
    v = TETE_V + (neige ? 'varying vec3 vNW; varying vec3 vWP;\n' : '') + v;
    v = v.replace('#include <project_vertex>', COURBE_GLSL + (neige ? `
      vNW = normalize(mat3(modelMatrix) * objectNormal); vWP = (modelMatrix * vec4(transformed, 1.0)).xyz;` : ''));
    shader.vertexShader = v;
  }
  const NEIGE_F = `
    float nzS = fract(sin(dot(floor(vWP.xz * 3.0), vec2(12.9898, 78.233))) * 43758.5453);
    float nzL = sin(vWP.x * 0.9 + sin(vWP.z * 0.7)) * 0.5 + 0.5;
    float neigeK = smoothstep(uSeuil, uSeuil + 0.22, vNW.y + (nzS - 0.5) * 0.08 + (nzL - 0.5) * 0.18) * uNeige * uNeigeMat;
    diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.86, 0.9, 0.98), neigeK);`;
  function patch(m, o) {
    o = o || {};
    const neige = !!o.neige;
    m.onBeforeCompile = sh => {
      courber(sh, neige);
      if (neige) {
        sh.uniforms.uSeuil = { value: o.seuil != null ? o.seuil : 0.55 };
        sh.uniforms.uNeigeMat = { value: o.neige };
        sh.fragmentShader = 'uniform float uNeige; uniform float uSeuil; uniform float uNeigeMat; varying vec3 vNW; varying vec3 vWP;\n' + sh.fragmentShader
          .replace('#include <color_fragment>', '#include <color_fragment>' + NEIGE_F)
          .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\n roughnessFactor = mix(roughnessFactor, 0.78, neigeK);');
      }
      if (o.frag) o.frag(sh);
    };
    m.customProgramCacheKey = () => 'nb' + (o.cle || '') + (neige ? 'N' + o.neige + '_' + (o.seuil || 0) : '');
    return m;
  }
  const M = { U };
  // Matière standard (PBR) : texture de couleur + relief + teinte par sommet
  function std(t, o) {
    o = o || {};
    const m = new THREE.MeshStandardMaterial({
      map: t ? t.map : null, normalMap: t ? t.nrm : null, roughness: o.r != null ? o.r : 0.9, metalness: o.m || 0,
      vertexColors: o.vc !== false, color: o.color || 0xffffff, envMapIntensity: o.env != null ? o.env : 0.6,
      side: o.double ? THREE.DoubleSide : THREE.FrontSide,
    });
    if (t && t.nrm) m.normalScale.set(o.ns || 1, o.ns || 1);
    if (o.emissive) { m.emissive = new THREE.Color(o.emissive); m.emissiveIntensity = o.ei || 1; }
    return patch(m, { neige: o.neige, seuil: o.seuil, cle: o.cle });
  }
  // Matière qui brille seule (fenêtres, braises, yeux) : couleur des sommets en flottants (> 1 = halo de lueur)
  function brille(map, o) {
    o = o || {};
    const m = new THREE.MeshBasicMaterial({ map: map || null, vertexColors: true, transparent: !!o.add, blending: o.add ? THREE.AdditiveBlending : THREE.NormalBlending, depthWrite: !o.add, side: o.double ? THREE.DoubleSide : THREE.FrontSide, fog: o.fog !== false, toneMapped: false });
    return patch(m, { cle: 'b' + (o.add ? 'a' : '') + (o.cle || '') });
  }
  M.creer = function () {
    const T = TEX;
    M.sol = std(T.neige, { r: 0.82, cle: 'sol', env: 0.5, frag: null });
    // le sol mélange neige et pavés selon l'attribut « route » (0..1) de chaque sommet
    M.sol.onBeforeCompile = sh => {
      courber(sh, false);
      sh.uniforms.tPave = { value: T.pave.map }; sh.uniforms.tPaveN = { value: T.pave.nrm };
      sh.vertexShader = 'attribute float route; varying float vRoute; varying vec2 vUvP;\n' + sh.vertexShader.replace('#include <uv_vertex>', '#include <uv_vertex>\n vRoute = route; vUvP = uv * 2.6;');
      sh.fragmentShader = 'uniform sampler2D tPave; uniform sampler2D tPaveN; varying float vRoute; varying vec2 vUvP;\n' + sh.fragmentShader
        .replace('#include <map_fragment>', `
          vec4 cNeige = texture2D(map, vMapUv); vec4 cPave = texture2D(tPave, vUvP);
          float k = smoothstep(0.15, 0.85, vRoute);
          diffuseColor *= mix(cNeige, cPave, k);`)
        .replace('#include <normal_fragment_maps>', `
          vec3 nN = texture2D(normalMap, vNormalMapUv).xyz * 2.0 - 1.0; vec3 nP = texture2D(tPaveN, vUvP).xyz * 2.0 - 1.0;
          vec3 mapN = normalize(mix(nN, nP, smoothstep(0.15, 0.85, vRoute))); mapN.xy *= normalScale;
          normal = normalize(tbn * mapN);`)
        .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\n roughnessFactor = mix(roughnessFactor, 0.62, smoothstep(0.15, 0.85, vRoute));');
    };
    M.sol.customProgramCacheKey = () => 'nbsol';
    M.platre = std(T.platre, { neige: 1, cle: 'pl' });
    M.planche = std(T.planche, { neige: 1, cle: 'pk', r: 0.85 });
    M.brique = std(T.brique, { neige: 1, cle: 'br' });
    M.tuiles = std(T.tuiles, { neige: 1, seuil: 0.35, cle: 'tu', r: 0.75, ns: 1.4 });
    M.bois = std(T.planche, { neige: 1, cle: 'bo', r: 0.8 });
    M.pierre = std(T.pierre, { neige: 1, seuil: 0.5, cle: 'pi' });
    M.metal = std(T.metal, { r: 0.45, m: 0.85, neige: 0.8, seuil: 0.6, cle: 'me', env: 1 });
    M.ecorce = std(T.ecorce, { neige: 1, seuil: 0.45, cle: 'ec' });
    M.aiguilles = std(T.aiguilles, { neige: 1, seuil: 0.25, cle: 'ai', r: 0.95, ns: 1.2 });
    M.citrouille = std(T.citrouille, { r: 0.55, neige: 0.6, seuil: 0.7, cle: 'ci' });
    M.tissu = std(T.raye, { r: 0.9, neige: 1, seuil: 0.45, cle: 'ti', double: true });
    M.porte = std({ map: T.porte, nrm: null }, { r: 0.8, cle: 'po' });
    M.cadeau = std({ map: T.cadeau, nrm: null }, { r: 0.5, cle: 'ca', env: 0.8 });
    M.unie = std(null, { r: 0.7, cle: 'un', neige: 1 });            // couronnes, rubans, petits objets (couleur des sommets)
    M.verni = std(null, { r: 0.25, cle: 've', env: 1.2 });          // boules de Noël, chevaux de bois
    M.glace = std(T.glace, { r: 0.08, m: 0.1, cle: 'gl', env: 1.6, vc: false, color: 0xa8c4dc });
    M.fenetre = brille(T.fenetres, { cle: 'fe' });
    M.emis = brille(null, { cle: 'em' });                             // braises, yeux de citrouille, verre des lampes
    M.cadran = brille(T.cadran, { cle: 'cd' });
    // flaques de lumière posées au sol (additives) : l'éclairage « chaud » de la ville sans des centaines de lampes
    M.flaque = new THREE.MeshBasicMaterial({ map: T.lueur, vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: true, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
    patch(M.flaque, { cle: 'fl' });
    // ampoules des guirlandes : scintillent chacune à leur rythme (attribut « phase »)
    M.ampoules = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, { uCourbe: U.uCourbe, uCentre: U.uCentre, uTemps: U.uTemps }]),
      vertexColors: true, fog: true, toneMapped: false,
      vertexShader: `uniform float uCourbe; uniform vec2 uCentre; uniform float uTemps; attribute float phase; varying vec3 vC;
        #include <fog_pars_vertex>
        void main(){ vec3 transformed = position;
          float tw = 0.55 + 0.45 * sin(uTemps * (1.3 + fract(phase * 7.3) * 2.2) + phase * 6.283);
          tw = mix(tw, step(0.5, fract(uTemps * 0.25 + phase)), step(0.85, fract(phase * 3.1)));
          vC = color * (0.35 + 1.9 * tw);
          ${COURBE_GLSL}
          #include <fog_vertex>
        }`,
      fragmentShader: `varying vec3 vC;
        #include <fog_pars_fragment>
        void main(){ gl_FragColor = vec4(vC, 1.0);
          #include <fog_fragment>
        }`,
    });
    M.ampoules.uniforms.uCourbe = U.uCourbe; M.ampoules.uniforms.uCentre = U.uCentre; M.ampoules.uniforms.uTemps = U.uTemps;
    // spectres : voile translucide qui ondule, bord lumineux (effet de Fresnel)
    M.spectre = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, { uCourbe: U.uCourbe, uCentre: U.uCentre, uTemps: U.uTemps, uCouleur: { value: new THREE.Color(0.75, 0.9, 1.0) }, uAlpha: { value: 1 } }]),
      transparent: true, depthWrite: false, fog: true, side: THREE.DoubleSide, toneMapped: false,
      vertexShader: `uniform float uCourbe; uniform vec2 uCentre; uniform float uTemps; varying vec3 vN; varying vec3 vV; varying float vH;
        #include <fog_pars_vertex>
        void main(){ vec3 transformed = position; float h = clamp(1.0 - position.y / 2.2, 0.0, 1.0); vH = position.y;
          float ph = modelMatrix[3].x * 0.7 + modelMatrix[3].z * 0.3;
          transformed.x += sin(uTemps * 2.1 + position.y * 2.5 + ph) * 0.12 * h * h;
          transformed.z += cos(uTemps * 1.7 + position.y * 2.0 + ph) * 0.12 * h * h;
          transformed.y += sin(atan(position.z, position.x) * 5.0 + uTemps * 3.0) * 0.08 * h;
          vN = normalize(mat3(modelMatrix) * normal);
          ${COURBE_GLSL}
          vV = normalize(-mvPosition.xyz); vN = normalize(mat3(viewMatrix) * vN);
          #include <fog_vertex>
        }`,
      fragmentShader: `uniform vec3 uCouleur; uniform float uAlpha; varying vec3 vN; varying vec3 vV; varying float vH;
        #include <fog_pars_fragment>
        void main(){ float f = 1.0 - abs(dot(normalize(vN), normalize(vV)));
          float a = (0.12 + pow(f, 2.2) * 0.75) * smoothstep(-0.1, 0.5, vH) * uAlpha;
          gl_FragColor = vec4(uCouleur * (0.6 + f * 1.4), a);
          #include <fog_fragment>
        }`,
    });
  };
  return M;
})();
