/* ===================== MATIÈRES : rendu physique, monde tordu et courbé, neige, fenêtres habitées =====================
   Retouches de shader communes (fonction GLSL versMonde, appliquée à TOUT ce qui est dessiné dans la ville) :
   - TORSION : la grille de rues est déformée par des ondes lentes (mêmes formules que MONDE.tordre) : rues qui serpentent ;
   - COURBURE : le monde s'enfonce avec la distance au promeneur (petite planète, « bulle ») ;
   - NEIGE : toute surface tournée vers le ciel se couvre de neige, qui scintille quand on bouge (cristaux).
   Fenêtres : « interior mapping » (on voit une vraie pièce en relief derrière la vitre, avec givre et reflets).
   Ampoules et halos : points lumineux (un sommet chacun), visibles de très loin comme des étincelles.
   Les ombres (lune) sont calculées dans la grille non tordue, des deux côtés : tout concorde. */
const MAT = (() => {
  const U = { uCourbe: { value: 0.0021 }, uCentre: { value: new THREE.Vector2() }, uTemps: { value: 0 }, uNeige: { value: 1 }, uEchelle: { value: 600 }, uCiel: { value: new THREE.Color(0.05, 0.08, 0.13) } };
  const f = v => { const s = String(+v.toFixed(6)); return s.indexOf('.') < 0 ? s + '.0' : s; };
  const T = TORS.map(f);
  const MONDE_GLSL = `
    uniform float uCourbe; uniform vec2 uCentre; uniform float uTemps;
    vec3 versMonde(vec3 p){ vec2 q = p.xz;
      p.x = q.x + ${T[0]} * sin(q.y * ${T[1]} + ${T[2]}) + ${T[3]} * sin((q.x + q.y) * ${T[4]} + ${T[5]});
      p.z = q.y + ${T[6]} * sin(q.x * ${T[7]} + ${T[8]}) + ${T[9]} * sin((q.x - q.y) * ${T[10]} + ${T[11]});
      vec2 dC = p.xz - uCentre; p.y -= dot(dC, dC) * uCourbe; return p; }
  `;
  const PROJ_GLSL = `
    vec4 wPos = vec4(transformed, 1.0);
    #ifdef USE_INSTANCING
      wPos = instanceMatrix * wPos;
    #endif
    wPos = modelMatrix * wPos; wPos.xyz = versMonde(wPos.xyz);
    vec4 mvPosition = viewMatrix * wPos;
    gl_Position = projectionMatrix * mvPosition;`;
  const M = { U, MONDE_GLSL, PROJ_GLSL };
  const lier = m => { m.uniforms.uCourbe = U.uCourbe; m.uniforms.uCentre = U.uCentre; m.uniforms.uTemps = U.uTemps; if (m.uniforms.uEchelle) m.uniforms.uEchelle = U.uEchelle; return m; };
  M.lier = lier;
  // scintillement des cristaux de neige : petits éclats qui s'allument et s'éteignent selon l'angle de vue
  const SCINT_F = `
    { vec3 vdS = normalize(vViewPosition); float dS = length(vViewPosition);
      vec2 cS = floor(vWP.xz * 46.0); float hS = fract(sin(dot(cS, vec2(127.1, 311.7))) * 43758.5453);
      float pS = fract(hS * 17.3 + vdS.x * 2.3 + vdS.y * 3.1 + vWP.y * 0.7);
      float eS = step(0.978, hS) * smoothstep(0.82, 1.0, pS) * smoothstep(26.0, 3.0, dS);
      totalEmissiveRadiance += vec3(0.85, 0.92, 1.0) * eS * neigeK * 0.9; }`;
  const NEIGE_F = `
    float nzS = fract(sin(dot(floor(vWP.xz * 3.0), vec2(12.9898, 78.233))) * 43758.5453);
    float nzL = sin(vWP.x * 0.9 + sin(vWP.z * 0.7)) * 0.5 + 0.5;
    float neigeK = smoothstep(uSeuil, uSeuil + 0.22, vNW.y + (nzS - 0.5) * 0.08 + (nzL - 0.5) * 0.18) * uNeige * uNeigeMat;
    diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.84, 0.88, 0.96), neigeK);`;
  // retouche d'une matière Three.js (standard ou basique)
  function patch(m, o) {
    o = o || {};
    const neige = !!o.neige;
    m.onBeforeCompile = sh => {
      Object.assign(sh.uniforms, U);
      sh.vertexShader = MONDE_GLSL + (neige ? 'varying vec3 vNW; varying vec3 vWP;\n' : '') + sh.vertexShader
        .replace('#include <project_vertex>', PROJ_GLSL + (neige ? '\n vNW = normalize(mat3(modelMatrix) * objectNormal); vWP = (modelMatrix * vec4(transformed, 1.0)).xyz;' : ''));
      if (neige) {
        sh.uniforms.uSeuil = { value: o.seuil != null ? o.seuil : 0.55 }; sh.uniforms.uNeigeMat = { value: o.neige };
        sh.fragmentShader = 'uniform float uNeige; uniform float uSeuil; uniform float uNeigeMat; varying vec3 vNW; varying vec3 vWP;\n' + sh.fragmentShader
          .replace('#include <color_fragment>', '#include <color_fragment>' + NEIGE_F)
          .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\n roughnessFactor = mix(roughnessFactor, 0.72, neigeK);')
          .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>' + SCINT_F);
      }
    };
    m.customProgramCacheKey = () => 'nb2' + (o.cle || '') + (neige ? 'N' + o.neige + '_' + (o.seuil || 0) : '');
    return m;
  }
  M.patch = patch;
  function std(t, o) {
    o = o || {};
    const m = new THREE.MeshStandardMaterial({
      map: t ? t.map : null, normalMap: t ? t.nrm : null, roughness: o.r != null ? o.r : 0.9, metalness: o.m || 0,
      vertexColors: o.vc !== false, color: o.color || 0xffffff, envMapIntensity: o.env != null ? o.env : 0.5,
      side: o.double ? THREE.DoubleSide : THREE.FrontSide,
    });
    if (t && t.nrm) m.normalScale.set(o.ns || 1, o.ns || 1);
    return patch(m, { neige: o.neige, seuil: o.seuil, cle: o.cle });
  }
  function brille(map, o) {
    o = o || {};
    const m = new THREE.MeshBasicMaterial({ map: map || null, vertexColors: true, transparent: !!o.add, blending: o.add ? THREE.AdditiveBlending : THREE.NormalBlending, depthWrite: !o.add, side: o.double ? THREE.DoubleSide : THREE.FrontSide, fog: o.fog !== false, toneMapped: false });
    return patch(m, { cle: 'b' + (o.add ? 'a' : '') + (o.cle || '') });
  }
  // points lumineux : `halo` = taille en mètres par sommet (attribut taille) ; sinon ampoules qui scintillent (attribut phase)
  function points(halo) {
    const m = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, { uEchelle: { value: 600 }, uMin: { value: 2.2 }, tex: { value: null } }]),
      vertexColors: true, fog: true, toneMapped: false, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: MONDE_GLSL + `uniform float uEchelle; uniform float uMin; attribute float ${halo ? 'taille' : 'phase'}; varying vec3 vC; varying float vK;
        #include <fog_pars_vertex>
        void main(){ vec3 transformed = position;
          ${halo ? 'vC = color; float tw = 1.0; float sz = taille;' : `float tw = 0.6 + 0.4 * sin(uTemps * (1.3 + fract(phase * 7.3) * 2.2) + phase * 6.283);
          tw = mix(tw, 0.25 + 0.75 * step(0.5, fract(uTemps * 0.25 + phase)), step(0.86, fract(phase * 3.1)));
          vC = color * (0.3 + 1.2 * tw); float sz = 0.17;`}
          ${PROJ_GLSL}
          float px = sz * uEchelle / max(0.3, -mvPosition.z);
          vK = ${halo ? '1.0' : 'min(1.0, px / uMin)'}; gl_PointSize = max(px, ${halo ? '1.0' : 'uMin'});
          vFogDepth = -mvPosition.z * ${halo ? '0.75' : '0.55'};
        }`,
      fragmentShader: `varying vec3 vC; varying float vK; uniform sampler2D tex;
        #include <fog_pars_fragment>
        void main(){ float d = length(gl_PointCoord - 0.5) * 2.0;
          ${halo ? 'float a = texture2D(tex, gl_PointCoord).a;' : 'float a = smoothstep(1.0, 0.0, d); a = a * a * 0.4 + smoothstep(0.5, 0.2, d) * 1.5;'}
          gl_FragColor = vec4(vC * a * (0.35 + 0.65 * vK), 1.0);
          #ifdef USE_FOG
            float fogFactor = 1.0 - exp(-fogDensity * fogDensity * vFogDepth * vFogDepth); gl_FragColor.rgb *= 1.0 - fogFactor;
          #endif
        }`,
    });
    return lier(m);
  }
  M.creer = function () {
    const X = TEX;
    // --- sol : neige + pavés selon l'attribut « route » ; la neige remplit les joints (mélange par la hauteur des pavés) ---
    M.sol = std(X.neige, { r: 0.8, cle: 'sol', env: 0.45 });
    M.sol.onBeforeCompile = sh => {
      Object.assign(sh.uniforms, U);
      sh.uniforms.tPave = { value: X.pave.map }; sh.uniforms.tPaveN = { value: X.pave.nrm };
      M.sol.userData.sh = sh;
      sh.vertexShader = MONDE_GLSL + 'attribute float route; varying float vRoute; varying vec2 vUvP; varying vec3 vWP;\n' + sh.vertexShader
        .replace('#include <uv_vertex>', '#include <uv_vertex>\n vRoute = route; vUvP = uv * 1.7;')
        .replace('#include <project_vertex>', PROJ_GLSL + '\n vWP = (modelMatrix * vec4(transformed, 1.0)).xyz;');
      sh.fragmentShader = 'uniform sampler2D tPave; uniform sampler2D tPaveN; varying float vRoute; varying vec2 vUvP; varying vec3 vWP;\n' + sh.fragmentShader
        .replace('#include <map_fragment>', `
          vec4 cNeige = texture2D(map, vMapUv); vec4 cPave = texture2D(tPave, vUvP);
          float hP = dot(cPave.rgb, vec3(0.5)); float gros = texture2D(map, vMapUv * 0.13).g;
          float kP = smoothstep(0.05, 0.4, vRoute * 1.25 - 0.62 + (hP - 0.5) * 0.55 - (gros - 0.5) * 1.5);
          float neigeK = 1.0 - kP;
          diffuseColor *= mix(cNeige * vec4(0.9, 0.93, 1.0, 1.0), cPave * vec4(0.62, 0.62, 0.66, 1.0), kP);`)
        .replace('#include <normal_fragment_maps>', `
          vec3 nN = texture2D(normalMap, vNormalMapUv).xyz * 2.0 - 1.0; vec3 nP = texture2D(tPaveN, vUvP).xyz * 2.0 - 1.0;
          vec3 mapN = normalize(mix(nN, nP, kP)); mapN.xy *= normalScale;
          normal = normalize(tbn * mapN);`)
        .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\n roughnessFactor = mix(roughnessFactor, 0.42, kP);')
        .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>' + SCINT_F);
    };
    M.sol.customProgramCacheKey = () => 'nb2sol';
    M.neige = std(X.neige, { r: 0.8, cle: 'ne', neige: 1, seuil: -2, vc: true });   // neige pure (congères, chapeaux des toits)
    M.platre = std(X.platre, { neige: 1, cle: 'pl', r: 0.92 });
    M.planche = std(X.planche, { neige: 1, cle: 'pk', r: 0.85 });
    M.brique = std(X.brique, { neige: 1, cle: 'br', r: 0.9 });
    M.tuiles = std(X.tuiles, { neige: 1, seuil: 0.2, cle: 'tu', r: 0.75, ns: 1.3 });
    M.bois = std(X.planche, { neige: 1, cle: 'bo', r: 0.8 });
    M.pierre = std(X.pierre, { neige: 1, seuil: 0.5, cle: 'pi', r: 0.9 });
    M.moellon = std(X.pierre, { neige: 1, seuil: 0.5, cle: 'mo', r: 0.92, ns: 1.2 });   // mur de pierres (photo)
    M.metal = std(X.metal, { r: 0.45, m: 0.85, neige: 0.8, seuil: 0.6, cle: 'me', env: 1 });
    M.ecorce = std(X.ecorce, { neige: 1, seuil: 0.45, cle: 'ec' });
    M.aiguilles = std(X.aiguilles, { neige: 1, seuil: 0.6, cle: 'ai', r: 0.95, ns: 1.2 });
    M.citrouille = std(X.citrouille, { r: 0.55, neige: 0.6, seuil: 0.7, cle: 'ci' });
    M.tissu = std(X.raye, { r: 0.9, neige: 1, seuil: 0.45, cle: 'ti', double: true });
    M.porte = std({ map: X.porte, nrm: null }, { r: 0.8, cle: 'po' });
    M.sucre = std({ map: X.bonbon, nrm: null }, { r: 0.3, neige: 0.6, seuil: 0.6, cle: 'su', env: 1 });
    M.cadeau = std({ map: X.cadeau, nrm: null }, { r: 0.5, cle: 'ca', env: 0.8 });
    M.unie = std(null, { r: 0.7, cle: 'un', neige: 1 });
    M.verni = std(null, { r: 0.22, cle: 've', env: 1.3 });
    M.glace = std(X.glace, { r: 0.07, m: 0.1, cle: 'gl', env: 1.7, vc: false, color: 0xa8c4dc });
    M.emis = brille(null, { cle: 'em' });
    M.cadran = brille(X.cadran, { cle: 'cd' });
    M.flaque = new THREE.MeshBasicMaterial({ map: X.lueur, vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: true, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
    patch(M.flaque, { cle: 'fl' });
    M.ampoules = points(false);
    M.halos = points(true); M.halos.uniforms.tex.value = X.lueur;
    // --- fenêtres habitées (interior mapping) : couleur du sommet = lumière de la pièce (≈ 0 = éteinte) ---
    M.fenetre = lier(new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, { tPieces: { value: null }, uCiel: { value: new THREE.Color() } }]),
      vertexColors: true, fog: true, toneMapped: false,
      vertexShader: MONDE_GLSL + `varying vec2 vUv; varying vec3 vC; varying vec3 vVP; varying vec3 vW0;
        #include <fog_pars_vertex>
        void main(){ vec3 transformed = position; vUv = uv; vC = color; vW0 = (modelMatrix * vec4(position, 1.0)).xyz;
          ${PROJ_GLSL}
          vVP = mvPosition.xyz;
          #include <fog_vertex>
        }`,
      fragmentShader: `uniform sampler2D tPieces; uniform vec3 uCiel; varying vec2 vUv; varying vec3 vC; varying vec3 vVP; varying vec3 vW0;
        #include <fog_pars_fragment>
        float h1(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
        void main(){
          vec2 cel = floor(vUv * 2.0 - 0.0001); vec2 uv = clamp(vUv * 2.0 - cel, 0.0, 1.0); float genre = cel.x + cel.y * 2.0;
          vec3 dp1 = dFdx(vVP), dp2 = dFdy(vVP); vec2 du1 = dFdx(vUv), du2 = dFdy(vUv);
          vec3 N = normalize(cross(dp1, dp2));
          vec3 Tg = normalize(dp1 * du2.y - dp2 * du1.y), Bt = normalize(dp2 * du1.x - dp1 * du2.x);
          vec3 ray = normalize(vVP);
          vec3 d = vec3(dot(ray, Tg), dot(ray, Bt), max(0.02, -dot(ray, N))) + vec3(0.00013, 0.00017, 0.0);
          // une graine par fenêtre (les 4 sommets d'une vitre partagent le même coin arrondi)
          float gr = h1(floor(vW0.xz * 0.9 + 0.5) + floor(vW0.y * 0.6));
          float prof = 0.8 + gr * 0.7;
          vec3 tt = vec3((d.x > 0.0 ? 1.0 - uv.x : -uv.x) / d.x, (d.y > 0.0 ? 1.0 - uv.y : -uv.y) / d.y, prof / d.z);
          float t = min(tt.x, min(tt.y, tt.z)); vec3 h = vec3(uv, 0.0) + d * t;
          vec3 cp;
          if (t >= tt.z) { float ix = floor(gr * 3.999); cp = texture2D(tPieces, (vec2(mod(ix, 2.0), floor(ix * 0.5)) + clamp(h.xy, 0.02, 0.98)) * 0.5).rgb; }
          else if (t >= tt.y) cp = d.y < 0.0 ? vec3(0.34, 0.2, 0.11) * (0.75 + 0.25 * step(0.5, fract(h.x * 5.0))) : vec3(0.7, 0.66, 0.58);
          else cp = mix(vec3(0.5, 0.22, 0.18), vec3(0.22, 0.34, 0.3), fract(gr * 5.3)) * (0.82 + 0.18 * step(0.5, fract(h.y * 7.0)));
          // quelqu'un passe parfois dans la pièce (une ombre qui traverse le mur du fond, dans une fenêtre sur trois)
          if (t >= tt.z && fract(gr * 3.7) > 0.66) {
            float sx = fract(uTemps * 0.018 * (0.6 + gr) + gr * 9.0) * 5.0 - 2.0;
            float corps = smoothstep(0.17, 0.1, abs(h.x - sx)) * step(h.y, 0.56) + smoothstep(0.11, 0.07, length(h.xy - vec2(sx, 0.66)));
            cp *= 1.0 - 0.8 * clamp(corps, 0.0, 1.0);
          }
          cp *= mix(1.15, 0.4, clamp(h.z / prof, 0.0, 1.0));
          float lum = max(vC.r, max(vC.g, vC.b));
          vec3 col = cp * vC;
          // rideaux sur les côtés (une fenêtre sur deux)
          float rid = step(0.5, fract(gr * 9.7)) * smoothstep(0.3, 0.42, abs(uv.x - 0.5) + (1.0 - uv.y) * 0.08);
          col = mix(col, vC * vec3(0.5, 0.12, 0.1) * (0.7 + 0.3 * sin(uv.x * 60.0)), rid * 0.9);
          // reflet du ciel sur la vitre + givre dans les coins
          float fr = pow(1.0 - abs(dot(ray, N)), 3.0);
          col = mix(col, uCiel * 1.6, clamp(fr * 0.7 + 0.05, 0.0, 1.0));
          float gv = smoothstep(0.42, 0.72, length((uv - 0.5) * vec2(1.0, 1.15)) + (h1(floor(uv * 34.0)) - 0.5) * 0.22);
          col = mix(col, vec3(0.62, 0.72, 0.85) * (0.07 + 0.3 * lum), gv * 0.75);
          // croisillons et cadre
          vec2 nb = genre < 0.5 ? vec2(2.0, 2.0) : genre < 1.5 ? vec2(2.0, 4.0) : genre < 2.5 ? vec2(3.0, 3.0) : vec2(1.0, 2.0);
          vec2 g = abs(fract(uv * nb) - 0.5);
          float bar = max(smoothstep(0.5 - 0.035 * nb.x, 0.5 - 0.02 * nb.x, g.x), smoothstep(0.5 - 0.03 * nb.y, 0.5 - 0.017 * nb.y, g.y));
          col = mix(col, vec3(0.035, 0.028, 0.022), bar);
          gl_FragColor = vec4(col, 1.0);
          #include <fog_fragment>
        }`,
    }));
    M.fenetre.uniforms.tPieces.value = X.pieces; M.fenetre.uniforms.uCiel = U.uCiel;
    // --- spectres : voile translucide qui ondule, bord lumineux (effet de Fresnel) ---
    M.spectre = lier(new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, { uCouleur: { value: new THREE.Color(0.75, 0.9, 1.0) }, uAlpha: { value: 1 } }]),
      transparent: true, depthWrite: false, fog: true, side: THREE.DoubleSide, toneMapped: false,
      vertexShader: MONDE_GLSL + `varying vec3 vN; varying vec3 vV; varying float vH;
        #include <fog_pars_vertex>
        void main(){ vec3 transformed = position; float h = clamp(1.0 - position.y / 2.2, 0.0, 1.0); vH = position.y;
          float ph = modelMatrix[3].x * 0.7 + modelMatrix[3].z * 0.3;
          transformed.x += sin(uTemps * 2.1 + position.y * 2.5 + ph) * 0.12 * h * h;
          transformed.z += cos(uTemps * 1.7 + position.y * 2.0 + ph) * 0.12 * h * h;
          transformed.y += sin(atan(position.z, position.x) * 5.0 + uTemps * 3.0) * 0.08 * h;
          ${PROJ_GLSL}
          vV = normalize(-mvPosition.xyz); vN = normalize(mat3(viewMatrix) * normalize(mat3(modelMatrix) * normal));
          #include <fog_vertex>
        }`,
      fragmentShader: `uniform vec3 uCouleur; uniform float uAlpha; varying vec3 vN; varying vec3 vV; varying float vH;
        #include <fog_pars_fragment>
        void main(){ float f = 1.0 - abs(dot(normalize(vN), normalize(vV)));
          float a = (0.1 + pow(f, 2.2) * 0.75) * smoothstep(-0.1, 0.5, vH) * uAlpha;
          gl_FragColor = vec4(uCouleur * (0.6 + f * 1.4), a);
          #include <fog_fragment>
        }`,
    }));
  };
  // Remplace une texture peinte par une photo (quand elle a fini de se décoder) : mêmes réglages de répétition
  M.photo = function (cle, map, nrm) {
    const cibles = { neige: ['sol', 'neige'], platre: ['platre'], brique: ['brique'], tuiles: ['tuiles'], planche: ['planche', 'bois'], ecorce: ['ecorce'], moellon: ['moellon'] }[cle] || [];
    for (const k of cibles) { const m = M[k]; if (!m) continue; if (map) m.map = map; if (nrm) m.normalMap = nrm; m.needsUpdate = true; }
    if (cle === 'pave' && M.sol.userData.sh) { const sh = M.sol.userData.sh; if (map) sh.uniforms.tPave.value = map; if (nrm) sh.uniforms.tPaveN.value = nrm; }
    if (cle === 'pave') { if (map) TEX.pave.map = map; if (nrm) TEX.pave.nrm = nrm; }
  };
  return M;
})();
