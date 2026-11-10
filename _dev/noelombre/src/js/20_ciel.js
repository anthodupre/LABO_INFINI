/* ===================== CIEL, LUNE, NEIGE, LUMIÈRES GLOBALES =====================
   Un dôme qui suit la caméra, peint par un shader : dégradé nocturne, étoiles qui scintillent, LUNE ÉNORME (avec halo
   de lueur), nuages qui passent devant, aurore boréale (événement), étoiles filantes. Une carte d'environnement en est
   tirée (reflets réalistes sur la glace, le métal, les boules). La neige tombe autour du joueur (particules). */
const CIEL = (() => {
  const K = {};
  // la lune se lève au bout de la rue du départ (la grille est tordue : on suit la direction VUE de cette rue)
  { const jc = MONDE.jacob(3.5, 2.2), a = Math.atan2(jc[2], jc[0]) + 0.1, el = 0.34;
    K.dirLune = new THREE.Vector3(Math.cos(a) * Math.cos(el), Math.sin(el), Math.sin(a) * Math.cos(el)).normalize(); }
  K.horizon = new THREE.Color(0.03, 0.05, 0.075);
  const UA = { uTemps: { value: 0 }, uLune: { value: K.dirLune }, uAurore: { value: 0 }, uNuages: { value: 0.5 }, uFilante: { value: new THREE.Vector4(0, 0, 0, -10) }, uHorizon: { value: K.horizon }, uTempete: { value: 0 }, tLune: { value: null }, uLuneOk: { value: 0 } };
  K.U = UA;
  const vs = `varying vec3 vDir; void main(){ vDir = position; vec4 p = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * p; gl_Position.z = gl_Position.w * 0.9999; }`;
  const fs = `uniform float uTemps; uniform vec3 uLune; uniform float uAurore; uniform float uNuages; uniform vec4 uFilante; uniform vec3 uHorizon; uniform float uTempete; uniform sampler2D tLune; uniform float uLuneOk; varying vec3 vDir;
    float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float n2(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), f.x), f.y); }
    float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++){ v += a * n2(p); p = p * 2.03 + 1.7; a *= 0.5; } return v; }
    void main(){
      vec3 d = normalize(vDir); float y = d.y;
      vec3 zen = vec3(0.006, 0.008, 0.026), mid = vec3(0.02, 0.03, 0.07);
      vec3 col = mix(uHorizon, mid, smoothstep(0.0, 0.25, y)); col = mix(col, zen, smoothstep(0.2, 0.9, y));
      // étoiles
      vec3 sd = d * 220.0; vec2 cell = floor(sd.xy + sd.z * 0.37); float st = h(cell + floor(sd.z));
      float star = step(0.9965, st) * smoothstep(0.02, 0.25, y) * (0.6 + 0.4 * sin(uTemps * (2.0 + st * 9.0) + st * 50.0));
      col += vec3(0.9, 0.95, 1.0) * star * 1.4 * (1.0 - uTempete);
      // aurore (événement)
      if (uAurore > 0.001) {
        vec2 ap = d.xz / max(0.08, y + 0.15);
        float band = sin(ap.x * 1.3 + fbm(ap * 0.6 + uTemps * 0.05) * 5.0 + uTemps * 0.2);
        float a = smoothstep(0.5, 1.0, band) * smoothstep(0.05, 0.35, y) * (1.0 - smoothstep(0.6, 0.95, y));
        col += mix(vec3(0.1, 1.2, 0.5), vec3(0.8, 0.2, 1.1), smoothstep(0.15, 0.6, y)) * a * uAurore * (0.6 + 0.4 * fbm(ap * 2.0 + uTemps * 0.3));
      }
      // lune énorme
      float c = dot(d, uLune), ang = acos(clamp(c, -1.0, 1.0)), R = 0.115;
      vec3 up = normalize(cross(uLune, vec3(0, 1, 0))); vec3 vv = normalize(cross(up, uLune));
      vec2 lp = vec2(dot(d, up), dot(d, vv)) / R;
      float disque = 1.0 - smoothstep(0.985, 1.0, ang / R);
      float crat = fbm(lp * 2.4 + 3.0) * 0.55 + fbm(lp * 7.0) * 0.25;
      float limbe = sqrt(max(0.0, 1.0 - dot(lp, lp)));
      vec3 lune = vec3(1.0, 0.96, 0.86) * (0.45 + crat * 0.75) * (0.6 + 0.4 * limbe) * 1.05;
      if (uLuneOk > 0.5) lune = vec3(1.0, 0.95, 0.85) * (0.12 + texture2D(tLune, clamp(lp * 0.5 + 0.5, 0.0, 1.0)).rgb * 1.3) * (0.78 + 0.22 * limbe);
      col += vec3(0.4, 0.45, 0.6) * exp(-ang * 6.0) * 0.22 + vec3(0.9, 0.85, 0.7) * exp(-max(0.0, ang - R) * 30.0) * 0.18;
      col = mix(col, lune, disque);
      // nuages qui défilent (devant la lune), éclairés par elle
      vec2 cp = d.xz / max(0.05, y + 0.12) * 0.8 + vec2(uTemps * 0.012, uTemps * 0.004);
      float nu = smoothstep(0.45, 0.85, fbm(cp)) * uNuages * smoothstep(-0.02, 0.2, y);
      vec3 cn = mix(vec3(0.02, 0.025, 0.04), vec3(0.35, 0.36, 0.42), exp(-ang * 5.0));
      col = mix(col, cn, nu * 0.9);
      // étoile filante
      if (uTemps - uFilante.w < 1.2) {
        float k = (uTemps - uFilante.w) / 1.2; vec3 a0 = normalize(vec3(uFilante.x, 0.55 + uFilante.z * 0.3, uFilante.y));
        vec3 a1 = normalize(a0 + vec3(0.25, -0.12, 0.1)); vec3 p0 = normalize(mix(a0, a1, k)), p1 = normalize(mix(a0, a1, max(0.0, k - 0.18)));
        vec3 seg = p0 - p1; float t = clamp(dot(d - p1, seg) / dot(seg, seg), 0.0, 1.0); float dd = length(d - (p1 + seg * t));
        col += vec3(1.5, 1.6, 2.0) * smoothstep(0.003, 0.0, dd) * t * (1.0 - k);
      }
      col = mix(col, uHorizon * 1.3, uTempete * (1.0 - smoothstep(-0.1, 0.6, y)) * 0.85);
      if (y < 0.0) col = mix(uHorizon, uHorizon * 0.7, smoothstep(0.0, -0.3, y));
      gl_FragColor = vec4(col, 1.0);
    }`;
  K.creer = function (scene, renderer, Q) {
    const mat = new THREE.ShaderMaterial({ uniforms: UA, vertexShader: vs, fragmentShader: fs, side: THREE.BackSide, depthWrite: false, fog: false });
    K.dome = new THREE.Mesh(new THREE.SphereGeometry(500, 48, 24), mat); K.dome.frustumCulled = false; K.dome.renderOrder = -10;
    scene.add(K.dome);
    // carte d'environnement (reflets) : le ciel + quelques lueurs chaudes à l'horizon (fenêtres de la ville)
    try {
      const sc = new THREE.Scene(); const d2 = new THREE.Mesh(new THREE.SphereGeometry(50, 32, 16), mat); sc.add(d2);
      for (let i = 0; i < 26; i++) { const a = i / 26 * Math.PI * 2 + Math.random(), m = new THREE.Mesh(new THREE.SphereGeometry(1 + Math.random() * 1.5, 8, 6), new THREE.MeshBasicMaterial({ color: new THREE.Color(1.6 + Math.random(), 0.9 + Math.random() * 0.5, 0.35) })); m.position.set(Math.cos(a) * 30, -1 + Math.random() * 6, Math.sin(a) * 30); sc.add(m); }
      const pm = new THREE.PMREMGenerator(renderer); K.env = pm.fromScene(sc, 0.02).texture; pm.dispose();
      scene.environment = K.env;
    } catch (e) { }
    // lumières globales
    K.hemi = new THREE.HemisphereLight(0x3a4c7a, 0x141018, 0.42); scene.add(K.hemi);
    K.luneL = new THREE.DirectionalLight(0x9fb2ff, 0.75);
    K.luneL.castShadow = Q >= 1; K.luneL.shadow.autoUpdate = false; // la ville est immobile : l'ombre n'est recalculée que si l'on s'éloigne
    K.luneL.shadow.mapSize.set(Q >= 2 ? 2048 : 1024, Q >= 2 ? 2048 : 1024);
    const sc2 = K.luneL.shadow.camera; sc2.left = -48; sc2.right = 48; sc2.top = 48; sc2.bottom = -48; sc2.near = 1; sc2.far = 220;
    K.luneL.shadow.bias = -0.0008; K.luneL.shadow.normalBias = 0.09;
    scene.add(K.luneL); scene.add(K.luneL.target);
    // neige qui tombe
    const N = Q >= 2 ? 3200 : Q >= 1 ? 2000 : 1100, pos = new Float32Array(N * 3), gr = new Float32Array(N);
    for (let i = 0; i < N; i++) { pos[i * 3] = Math.random() * 40; pos[i * 3 + 1] = Math.random() * 22; pos[i * 3 + 2] = Math.random() * 40; gr[i] = Math.random(); }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('graine', new THREE.BufferAttribute(gr, 1));
    K.matNeige = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, { uTemps: { value: 0 }, uCam: { value: new THREE.Vector3() }, uVent: { value: new THREE.Vector2(0.6, 0.2) }, tex: { value: TEX.flocon }, uEchelle: { value: 300 }, uDens: { value: 0.6 } }]),
      vertexShader: `uniform float uTemps; uniform vec3 uCam; uniform vec2 uVent; uniform float uEchelle; uniform float uDens; attribute float graine; varying float vA;
        #include <fog_pars_vertex>
        void main(){ vec3 p = position; float t = uTemps;
          p.y -= t * (0.9 + graine * 0.7); p.x += t * uVent.x * (0.7 + graine) + sin(t * 0.8 + graine * 30.0) * 0.6; p.z += t * uVent.y + cos(t * 0.6 + graine * 20.0) * 0.6;
          vec3 b = vec3(40.0, 22.0, 40.0); vec3 o = uCam - vec3(20.0, 11.0, 20.0);
          p = mod(p - o, b) + o;
          vA = step(graine, uDens);
          vec4 mvPosition = viewMatrix * vec4(p, 1.0); gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = (0.06 + graine * 0.08) * uEchelle / max(0.5, -mvPosition.z);
          #include <fog_vertex>
        }`,
      fragmentShader: `uniform sampler2D tex; varying float vA;
        #include <fog_pars_fragment>
        void main(){ if (vA < 0.5) discard; vec4 c = texture2D(tex, gl_PointCoord); gl_FragColor = vec4(vec3(0.75, 0.8, 0.9), c.a * 0.85);
          #include <fog_fragment>
        }`,
      transparent: true, depthWrite: false, fog: true,
    });
    K.neige = new THREE.Points(g, K.matNeige); K.neige.frustumCulled = false; K.neige.renderOrder = 8; scene.add(K.neige);
  };
  // m : cibles de la météo { aurore: 0..1, tempete: 0..1, neige: 0..1 (densité des flocons), nuages: 0..1 }
  K.maj = function (t, cam, m) {
    UA.uTemps.value = t; K.matNeige.uniforms.uTemps.value = t; K.matNeige.uniforms.uCam.value.copy(cam);
    K.dome.position.copy(cam);
    UA.uAurore.value += (m.aurore - UA.uAurore.value) * 0.008;
    UA.uTempete.value += (m.tempete - UA.uTempete.value) * 0.004;
    UA.uNuages.value += (m.nuages - UA.uNuages.value) * 0.004;
    const u = K.matNeige.uniforms; u.uDens.value += (m.neige - u.uDens.value) * 0.005;
    u.uVent.value.set(0.5 + UA.uTempete.value * 5, 0.2 + UA.uTempete.value * 2);
  };
  // recentre l'ombre de la lune sur le promeneur (appelé seulement quand il s'est assez déplacé)
  K.ombreVers = function (x, y, z) {
    K.luneL.position.set(x + K.dirLune.x * 110, y + K.dirLune.y * 110, z + K.dirLune.z * 110);
    K.luneL.target.position.set(x, y, z); K.luneL.target.updateMatrixWorld(); K.luneL.shadow.needsUpdate = true;
  };
  K.lune = function (tex) { UA.tLune.value = tex; UA.uLuneOk.value = 1; };
  K.filante = function (t) { UA.uFilante.value.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random(), t); };
  return K;
})();
