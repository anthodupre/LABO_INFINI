/* ===================== NOËLOMBRE : une promenade, pas un jeu =====================
   Pas de score, pas de jauge, pas de quête : on marche dans une ville de Noël nocturne sans fin, lanterne à la main.
   - Les parcelles se construisent autour du promeneur ; les lumières les plus proches deviennent de vraies lampes.
   - Une petite LUEUR-GUIDE mène toujours vers une merveille pas encore vue (pioche sans répétition : 16_monde.js).
   - Une tape sur l'écran = éclat de la lanterne : les fantômes cachés se révèlent, les lieux réagissent.
   - Le ciel change tout seul (neige, brume, tempête, aurore, nuit claire) ; minuit fait passer un traîneau ; parfois des
     centaines de lanternes s'envolent. Les lanternes des carrefours se rallument sur ton passage (et sauvegardent).
   Branché sur la coquille (08_coquille.js) via l'objet JEU. Mode Dieu (BURGER) = « mode esprit » : voler, traverser. */
const JEU = (() => {
  let renderer = null, scene = null, cam = null, composer = null, bloom = null, passeFin = null, passeFxaa = null, Q = 1, R = 2, prete = false, t = 0;
  const parcelles = new Map();   // clé -> { P, obj }
  const LPOS = { x: 0.3, y: -0.34 };
  let lumPool = [], lanterne = null, lanterneL = null, lumProches = [], tLum = 0;
  let eclatT = 99, eclatK = 0, dernierCh = null;
  const ombre = { x: 1e9, z: 1e9, sale: true };
  const guide = { x: 0, y: 0, z: 0, cx: null, cz: null, t: 0, ok: false, init: false, fete: 0, chemin: null, traine: [] };
  const meteo = { mode: 'calme', fin: 90, tempete: 0, brume: 1 };
  const ev = { prochFilante: 20, prochMinuit: 420, traineau: null, heure: -1, prochEnvol: 300, envol: null };
  const pr = { v: 1.2, n: 0, t0: 0, lent: 0, vite: 0 };
  const _w = { x: 0, z: 0 };
  const j = () => S.jeu, esprit = () => god();

  // ---------- qualité ----------
  function qualiteAuto() { if (IS_IOS) return 1; const mem = navigator.deviceMemory || 4, coeurs = navigator.hardwareConcurrency || 4; return mem >= 8 && coeurs >= 8 ? 2 : 1; }
  function Qeff() { const r = j().reg.qualite; return r === 'auto' || r == null ? qualiteAuto() : clamp(+r, 0, 2); }
  const QP = [ // rapport de pixels min/max (résolution adaptative), rayon en parcelles, vraies lampes
    { p0: 0.7, p1: 1.0, R: 1, nl: 3 }, { p0: 0.85, p1: 1.6, R: 2, nl: 5 }, { p0: 1.1, p1: 2.2, R: 2, nl: 7 }];

  // ---------- état sauvegardé ----------
  function etatInitial() {
    return {
      graine: (Math.random() * 1e9) | 0, x: 3.5, y: 0, z: 2.2, yaw: regardRue(3.5, 2.2), pitch: 0.1,
      sites: {}, pioche: [], tours: 0, dernier: null, sitesVus: {}, journal: [], lanternes: { '0,0': 1 },
      stats: { distance: 0, temps: 0 }, intro: false,
      reg: { musique: true, mvol: 0.7, sons: true, svol: 0.85, qualite: 'auto', sens: 1, inverser: false, guide: true },
    };
  }
  // cap qui regarde le long de la rue est-ouest (la grille est tordue : l'axe x de la grille n'est pas l'axe x du monde vu)
  function regardRue(x, z) { const jc = MONDE.jacob(x, z); return Math.atan2(-jc[0], -jc[2]); }
  function valider(s) {
    const d = etatInitial();
    for (const k of ['x', 'y', 'z', 'yaw', 'pitch', 'graine']) if (!Number.isFinite(s[k])) s[k] = d[k];
    for (const k of ['stats', 'reg']) s[k] = Object.assign({}, d[k], s[k] && typeof s[k] === 'object' ? s[k] : {});
    for (const k of ['sites', 'sitesVus', 'lanternes']) if (!s[k] || typeof s[k] !== 'object' || Array.isArray(s[k])) s[k] = d[k];
    for (const k of ['pioche', 'journal']) s[k] = Array.isArray(s[k]) ? s[k].filter(x => typeof x === 'string') : [];
    for (const k in s.sites) if (typeof s.sites[k] !== 'string') delete s.sites[k];
    for (const k in s.stats) if (!Number.isFinite(s.stats[k])) s.stats[k] = 0;
    if (!Number.isFinite(s.tours)) s.tours = 0;
    if (!s.lanternes['0,0']) s.lanternes['0,0'] = 1;
    if (s.reg.qualite !== 'auto') s.reg.qualite = clamp(Math.round(+s.reg.qualite) || 0, 0, 2);
    for (const k of ['mvol', 'svol', 'sens']) if (!Number.isFinite(s.reg[k])) s.reg[k] = d.reg[k];
  }

  // ---------- rendu ----------
  const FIN_GLSL = `uniform sampler2D tDiffuse; uniform float uTemps; uniform float uExpo; varying vec2 vUv;
    vec3 fitA(vec3 v){ vec3 a = v * (v + 0.0245786) - 0.000090537; vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081; return a / b; }
    vec3 aces(vec3 c){ const mat3 mIn = mat3(vec3(0.59719, 0.07600, 0.02840), vec3(0.35458, 0.90834, 0.13383), vec3(0.04823, 0.01566, 0.83777));
      const mat3 mOut = mat3(vec3(1.60475, -0.10208, -0.00327), vec3(-0.53108, 1.10813, -0.07276), vec3(-0.07367, -0.00605, 1.07602));
      c *= uExpo / 0.6; c = mIn * c; c = fitA(c); c = mOut * c; return clamp(c, 0.0, 1.0); }
    void main(){ vec3 c = aces(texture2D(tDiffuse, vUv).rgb);
      float l = dot(c, vec3(0.299, 0.587, 0.114));
      c = mix(c, c * vec3(0.84, 0.98, 1.16), (1.0 - l) * 0.6);
      c = mix(c, c * vec3(1.09, 1.0, 0.88), smoothstep(0.25, 0.9, l) * 0.6);
      c = mix(vec3(l), c, 1.1); c = mix(c, c * c * (3.0 - 2.0 * c), 0.35);
      vec2 q = vUv - 0.5; c *= 1.0 - dot(q, q) * 0.85;
      float g = fract(sin(dot(vUv * vec2(917.0, 613.0) + fract(uTemps) * 61.0, vec2(12.9898, 78.233))) * 43758.5453);
      c += (g - 0.5) * 0.016 * (1.2 - l);
      gl_FragColor = vec4(pow(max(c, 0.0), vec3(1.0 / 2.2)), 1.0); }`;
  function creerRendu(zone) {
    const cv = document.createElement('canvas'); cv.id = 'cv3d'; zone.insertBefore(cv, zone.firstChild);
    try { renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: false, powerPreference: 'high-performance', stencil: false }); }
    catch (e) { zone.insertAdjacentHTML('beforeend', '<div class="pasgl">Ton appareil ne peut pas afficher la 3D (WebGL 2). Essaie avec Safari à jour.</div>'); return false; }
    // iPhone : le contexte 3D peut être perdu (app longtemps en arrière-plan, mémoire) : on sauvegarde et on recharge
    cv.addEventListener('webglcontextlost', e => { e.preventDefault(); try { save(false); } catch (er) { } }, false);
    cv.addEventListener('webglcontextrestored', () => { try { save(false); } catch (er) { } location.reload(); }, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.NoToneMapping;
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFShadowMap; renderer.info.autoReset = false;
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(CIEL.horizon.clone(), 0.02);
    cam = new THREE.PerspectiveCamera(72, 1, 0.08, 700); scene.add(cam);
    return true;
  }
  function appliquerQualite(init) {
    Q = Qeff(); const p = QP[Q]; R = p.R; pr.v = init ? (p.p0 + p.p1) / 2 : clamp(pr.v, p.p0, p.p1);
    renderer.setPixelRatio(Math.min(pr.v, devicePixelRatio || 1));
    CIEL.luneL.castShadow = Q >= 1; renderer.shadowMap.enabled = Q >= 1;
    if (CIEL.luneL.shadow.map) { CIEL.luneL.shadow.map.dispose(); CIEL.luneL.shadow.map = null; }
    CIEL.luneL.shadow.mapSize.set(Q >= 2 ? 2048 : 1024, Q >= 2 ? 2048 : 1024); ombre.sale = true;
    for (const l of lumPool) scene.remove(l);
    lumPool = []; for (let i = 0; i < p.nl; i++) { const l = new THREE.PointLight(0xffaa66, 0, 14, 2); scene.add(l); lumPool.push(l); }
    if (!init) { viderParcelles(); scene.traverse(o => { if (o.material) o.material.needsUpdate = true; }); }
    creerComposer(); redimensionner();
  }
  function creerComposer() {
    if (composer) { try { composer.renderTarget1.dispose(); composer.renderTarget2.dispose(); bloom.dispose(); } catch (e) { } }
    const size = renderer.getDrawingBufferSize(new THREE.Vector2());
    const ext = renderer.extensions, hf = ext.has('EXT_color_buffer_half_float') || ext.has('EXT_color_buffer_float');
    const rt = new THREE.WebGLRenderTarget(size.x, size.y, { type: hf ? THREE.HalfFloatType : THREE.UnsignedByteType, samples: Q >= 2 && hf && !IS_IOS ? 4 : 0 });
    composer = new THREE.EffectComposer(renderer, rt);
    composer.addPass(new THREE.RenderPass(scene, cam));
    bloom = new THREE.UnrealBloomPass(new THREE.Vector2(size.x / 2, size.y / 2), 0.7, 0.5, 0.9);
    composer.addPass(bloom);
    passeFin = new THREE.ShaderPass({ uniforms: { tDiffuse: { value: null }, uTemps: { value: 0 }, uExpo: { value: 1.0 } },
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }', fragmentShader: FIN_GLSL });
    composer.addPass(passeFin);
    passeFxaa = new THREE.ShaderPass(THREE.FXAAShader); composer.addPass(passeFxaa);
  }
  function redimensionner() {
    if (!renderer) return;
    const cv = renderer.domElement, r = cv.parentNode.getBoundingClientRect(), w = Math.max(1, r.width), h = Math.max(1, r.height);
    renderer.setSize(w, h, false); cam.aspect = w / h; cam.fov = w > h ? 62 : 74; cam.updateProjectionMatrix();
    { const tv = Math.tan(cam.fov * Math.PI / 360), th = tv * cam.aspect; LPOS.x = Math.min(0.3, 0.6 * th * 0.62); LPOS.y = -0.6 * tv * 0.52; }
    const prx = renderer.getPixelRatio();
    if (composer) { composer.setPixelRatio(prx); composer.setSize(w, h); passeFxaa.material.uniforms.resolution.value.set(1 / (w * prx), 1 / (h * prx)); }
    const ech = h * prx / (2 * Math.tan(cam.fov * Math.PI / 360));
    if (CIEL.matNeige) CIEL.matNeige.uniforms.uEchelle.value = ech;
    MAT.U.uEchelle.value = ech; if (MAT.ampoules) MAT.ampoules.uniforms.uMin.value = 2.0 * prx;
  }
  // résolution adaptative : on vise la fluidité ; l'image s'affine ou s'adoucit toute seule
  function adapter() {
    if (!prete || MODAL_OPEN || document.hidden || pr.fixe) { pr.t0 = 0; return; }
    const now = performance.now(); if (!pr.t0) { pr.t0 = now; pr.n = 0; return; }
    pr.n++; if (now - pr.t0 < 2500) return;
    const fps = pr.n * 1000 / (now - pr.t0), p = QP[Q]; pr.t0 = 0; let v = pr.v;
    if (fps < 43) { pr.lent++; pr.vite = 0; v = Math.max(p.p0, v - (fps < 30 ? 0.22 : 0.12)); }
    else if (fps > 56) { pr.vite++; pr.lent = 0; if (pr.vite >= 2) v = Math.min(p.p1, Math.min(devicePixelRatio || 1, v + 0.1)); }
    else { pr.lent = 0; pr.vite = 0; }
    if (fps < 26 && pr.lent >= 3 && v <= p.p0 + 0.01 && Q > 0 && j().reg.qualite === 'auto') { // vraiment trop lourd : on voit moins loin
      pr.lent = 0; Q = Q - 1; R = QP[Q].R; v = QP[Q].p1;
    }
    if (Math.abs(v - pr.v) > 0.04) { pr.v = v; renderer.setPixelRatio(Math.min(v, devicePixelRatio || 1)); redimensionner(); }
  }
  // ---------- lanterne tenue à la main ----------
  function creerLanterne() {
    const g = new THREE.Group(), L = GEO.Lots(), fer = [0.2, 0.18, 0.16];
    L.get('metal').add(GEO.base('cube'), { m: GEO.mat(0, 0.12, 0, 0.13, 0.02, 0.13), c: fer });
    L.get('metal').add(GEO.base('cube'), { m: GEO.mat(0, -0.1, 0, 0.14, 0.03, 0.14), c: fer });
    for (const [x, z] of [[-0.06, -0.06], [0.06, -0.06], [-0.06, 0.06], [0.06, 0.06]]) L.get('metal').add(GEO.base('cube'), { m: GEO.mat(x, 0.01, z, 0.012, 0.22, 0.012), c: fer });
    L.get('metal').add(GEO.base('cone4'), { m: GEO.mat(0, 0.17, 0, 0.09, 0.08, 0.09), c: fer });
    L.get('metal').add(GEO.base('toreFin'), { m: GEO.mat(0, 0.25, 0, 0.05, 0.06, 0.05, 0, Math.PI / 2, 0), c: fer });
    for (const k in L.tous) g.add(new THREE.Mesh(L.tous[k].geometrie(), new THREE.MeshStandardMaterial({ vertexColors: true, metalness: 0.7, roughness: 0.4 })));
    const fl = new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 8), new THREE.MeshBasicMaterial({ color: new THREE.Color(5, 3, 1.2), toneMapped: false }));
    fl.scale.set(1, 1.7, 1); g.add(fl); g.userData.flamme = fl;
    g.add(new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.2, 0.11), new THREE.MeshBasicMaterial({ color: new THREE.Color(1.1, 0.7, 0.32), transparent: true, opacity: 0.16, depthWrite: false, toneMapped: false })));
    g.scale.setScalar(0.62); cam.add(g); lanterne = g;
    lanterneL = new THREE.PointLight(0xffb070, 1.0, 10, 1.7); lanterneL.position.set(0.3, -0.1, -0.9); cam.add(lanterneL);
  }

  // ---------- parcelles ----------
  function viderParcelles() { for (const [, o] of parcelles) { scene.remove(o.obj.groupe); o.obj.liberer(); } parcelles.clear(); ombre.sale = true; }
  function majParcelles(budget) {
    const C = MONDE.C, pcx = Math.floor(JOUEUR.x / C), pcz = Math.floor(JOUEUR.z / C);
    for (const [k, o] of parcelles) if (Math.max(Math.abs(o.P.cx - pcx), Math.abs(o.P.cz - pcz)) > R + 1) { scene.remove(o.obj.groupe); o.obj.liberer(); parcelles.delete(k); }
    const manque = [];
    for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
      const cx = pcx + dx, cz = pcz + dz, k = MONDE.cle(cx, cz), dd = Math.hypot(cx * C + C / 2 - JOUEUR.x, cz * C + C / 2 - JOUEUR.z);
      if (dd <= (R + 0.75) * C && !parcelles.has(k)) manque.push({ cx, cz, k, dd });
    }
    manque.sort((a, b) => a.dd - b.dd);
    const t0 = performance.now();
    for (const m of manque) {
      if (performance.now() - t0 > budget) break;
      const P = MONDE.plan(m.cx, m.cz), obj = PARCELLE.construire(P, Q);
      scene.add(obj.groupe); parcelles.set(m.k, { P, obj }); ombre.sale = true;
      if (budget < 20) break;
    }
    return manque.length;
  }
  // ---------- lumières : les plus proches deviennent de vraies lampes (positions tordues comme le reste) ----------
  function majLumieres() {
    const C = MONDE.C, pcx = Math.floor(JOUEUR.x / C), pcz = Math.floor(JOUEUR.z / C), L = [];
    for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) {
      const P = MONDE.plan(pcx + dx, pcz + dz);
      for (const l of P.lumieres) L.push({ x: P.X0 + l.x, y: l.y, z: P.Z0 + l.z, c: l.c, i: l.i, r: l.r, feu: l.feu, follet: l.follet, d: 0 });
      if (P.relais && j().lanternes[P.relais.id]) L.push({ x: P.X0, y: P.sol(0, 0) + 5.0, z: P.Z0, c: [1, 0.72, 0.4], i: 2.2, r: 13, relais: true, d: 0 });
    }
    for (const l of L) l.d = Math.hypot(l.x - JOUEUR.x, l.z - JOUEUR.z);
    L.sort((a, b) => a.d - b.d);
    lumProches = L;
  }
  function appliquerLumieres() {
    const k = MAT.U.uCourbe.value;
    for (let i = 0; i < lumPool.length; i++) {
      const pl = lumPool[i], l = lumProches[i];
      if (!l || l.d > 42) { pl.intensity = 0; continue; }
      MONDE.tordre(l.x, l.z, _w); const ddx = _w.x - JOUEUR.wx, ddz = _w.z - JOUEUR.wz;
      pl.position.set(_w.x, l.y - (ddx * ddx + ddz * ddz) * k, _w.z);
      pl.color.setRGB(l.c[0], l.c[1], l.c[2]);
      let it = l.i * 15 * (l.follet ? 0.8 + 0.4 * Math.sin(t * 3 + l.x) : 1);
      if (l.feu) it *= 0.8 + 0.25 * Math.sin(t * 13 + l.x) + 0.15 * Math.sin(t * 29);
      pl.intensity = it * sstep(42, 28, l.d); pl.distance = l.r * 1.7; pl.decay = 1.7;
    }
  }
  function lumiereEn(x, z) { let v = 0; for (const l of lumProches) { const d = Math.hypot(l.x - x, l.z - z); if (d < 18) v = Math.max(v, 1 - d / (l.r * 0.7)); } return v; }

  // ---------- découvertes : merveilles, lanternes des carrefours ----------
  function majDecouvertes() {
    const s = j(), C = MONDE.C, cx = Math.floor(JOUEUR.x / C), cz = Math.floor(JOUEUR.z / C), k = MONDE.cle(cx, cz);
    if (k !== dernierCh) {
      dernierCh = k; const ty = MONDE.typeDe(cx, cz), hu = REPERES[ty].humeur;
      try { AUDIO.humeur(hu || (ty === 'cimetiere' || ty === 'mausolee' ? 'ombres' : ty === 'tentes' || ty === 'carrousel' || ty === 'roue' ? 'fete' : ty === 'etang' || ty === 'sapiniere' ? 'neige' : null)); } catch (e) { }
    }
    for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) {
      const P = MONDE.plan(cx + dx, cz + dz), kk = MONDE.cle(P.cx, P.cz);
      if (P.rep && !s.sitesVus[kk] && Math.hypot(P.X0 + C / 2 - JOUEUR.x, P.Z0 + C / 2 - JOUEUR.z) < 21) {
        s.sitesVus[kk] = 1; const Rr = REPERES[P.rep], neuf = s.journal.indexOf(P.rep) < 0; if (neuf) s.journal.push(P.rep);
        HUD.banniere(Rr.nom || '', Rr.desc || '', 8000); snd('carte'); if (neuf) snd('decouverte');
        guide.fete = 4; guide.ok = false; save(false);
      }
      if (P.relais && !s.lanternes[P.relais.id] && Math.hypot(P.X0 - JOUEUR.x, P.Z0 - JOUEUR.z) < 5.5) {
        s.lanternes[P.relais.id] = 1; snd('lanterne'); HUD.flash('rgba(255,190,110,.22)', 1200); tLum = 0; save(false);
      }
    }
  }
  // ---------- la lueur-guide : elle suit les rues vers la merveille inconnue la plus proche ----------
  function chercherSite() {
    const s = j(), C = MONDE.C, cx = Math.floor(JOUEUR.x / C), cz = Math.floor(JOUEUR.z / C); let best = null, bd = 1e9;
    for (let r = 1; r <= 16 && !best; r++) for (let dz = -r; dz <= r; dz++) for (let dx = -r; dx <= r; dx++) {
      if (Math.max(Math.abs(dx), Math.abs(dz)) !== r) continue;
      const x = cx + dx, z = cz + dz; if (!MONDE.site(x, z) || s.sitesVus[MONDE.cle(x, z)]) continue;
      const d = Math.hypot(x * C + C / 2 - JOUEUR.x, z * C + C / 2 - JOUEUR.z); if (d < bd) { bd = d; best = { cx: x, cz: z }; }
    }
    return best;
  }
  function tracerChemin() { // lignes brisées le long des rues, du promeneur jusqu'à l'entrée (côté sud) du site
    const C = MONDE.C, px = JOUEUR.x, pz = JOUEUR.z, ex = guide.cx * C + C / 2, ez = guide.cz * C, pts = [{ x: px, z: pz }];
    const lx = ((px % C) + C) % C, lz = ((pz % C) + C) % C, dxl = Math.min(lx, C - lx), dzl = Math.min(lz, C - lz);
    if (dzl <= dxl) { // sur (ou près d')une rue est-ouest
      const sz = Math.round(pz / C) * C; pts.push({ x: px, z: sz });
      if (Math.abs(sz - ez) > 1) { const col = px <= ex ? guide.cx * C : guide.cx * C + C; pts.push({ x: col, z: sz }); pts.push({ x: col, z: ez }); }
    } else { const sx = Math.round(px / C) * C; pts.push({ x: sx, z: pz }); pts.push({ x: sx, z: ez }); }
    pts.push({ x: ex, z: ez }); pts.push({ x: ex, z: ez + C / 2 });
    return pts;
  }
  function majGuide(dt) {
    if (!j().reg.guide) { guide.ok = false; return; }
    guide.t -= dt; guide.fete = Math.max(0, guide.fete - dt);
    if (guide.t <= 0) {
      guide.t = 0.6;
      if (!guide.ok || j().sitesVus[MONDE.cle(guide.cx, guide.cz)]) { const b = chercherSite(); guide.ok = !!b; if (b) { guide.cx = b.cx; guide.cz = b.cz; } }
      if (guide.ok) guide.chemin = tracerChemin();
    }
    if (!guide.ok || !guide.chemin) return;
    let reste = 9, a = guide.chemin[0], cible = a; // point à ~9 m devant, le long du chemin
    for (let i = 1; i < guide.chemin.length; i++) { const b = guide.chemin[i], l = Math.hypot(b.x - a.x, b.z - a.z); if (l >= reste) { cible = { x: a.x + (b.x - a.x) * reste / l, z: a.z + (b.z - a.z) * reste / l }; break; } reste -= l; a = b; cible = b; }
    const d = Math.hypot(guide.x - JOUEUR.x, guide.z - JOUEUR.z);
    if (d > 45 || !guide.init) { guide.x = cible.x; guide.z = cible.z; guide.init = true; guide.traine.length = 0; }
    const k = Math.min(1, dt * (d < 4 ? 2.6 : 1.3));
    guide.x += (cible.x - guide.x) * k; guide.z += (cible.z - guide.z) * k;
    guide.y = MONDE.sol(guide.x, guide.z) + 1.9 + Math.sin(t * 1.7) * 0.25 + guide.fete * 0.5;
    if (!guide.traine.length || Math.hypot(guide.traine[0].x - guide.x, guide.traine[0].z - guide.z) > 0.35) { guide.traine.unshift({ x: guide.x, y: guide.y, z: guide.z }); if (guide.traine.length > 7) guide.traine.pop(); }
  }
  // ---------- fantômes : doux promeneurs, révélés par l'éclat ----------
  let tSpawn = 3;
  function apparaitre(x, z, revele) {
    const sp = ENT.spectres.find(q => !q.actif); if (!sp) return;
    Object.assign(sp, { actif: true, x, z, y: MONDE.sol(x, z), vx: 0, vz: 0, t: Math.random() * 9, alpha: 0, cible: revele ? 1 : 0.55, part: false, ax: Math.random() * 9, vie: revele ? 9 : 40 + Math.random() * 40 });
    sp.g.visible = true;
  }
  function majSpectres(dt) {
    const J = JOUEUR, C = MONDE.C, ty = MONDE.typeDe(Math.floor(J.x / C), Math.floor(J.z / C));
    const maxS = ty === 'cimetiere' || ty === 'mausolee' || REPERES[ty].fantomes ? 5 : 2;
    tSpawn -= dt;
    if (tSpawn <= 0 && prete) {
      tSpawn = 4 + Math.random() * 6;
      if (ENT.spectres.filter(q => q.actif).length < maxS) for (let e = 0; e < 6; e++) {
        const a = Math.random() * 6.28, r = 16 + Math.random() * 16, x = J.x + Math.cos(a) * r, z = J.z + Math.sin(a) * r;
        if (lumiereEn(x, z) > 0.1) continue; apparaitre(x, z, false); break;
      }
    }
    for (const sp of ENT.spectres) {
      if (!sp.actif) continue;
      sp.t += dt; sp.vie -= dt; const dx = J.x - sp.x, dz = J.z - sp.z, d = Math.hypot(dx, dz) || 1;
      if (!sp.part && (d < 5 || sp.vie <= 0 || d > 60)) { sp.part = true; if (d < 5) snd('apparition'); }
      sp.alpha += ((sp.part ? 0 : sp.cible + eclatK * 0.5) - sp.alpha) * Math.min(1, dt * (sp.part ? 1.6 : 0.8));
      if (sp.part && sp.alpha < 0.02) { sp.actif = false; sp.g.visible = false; continue; }
      const a = Math.sin(sp.t * 0.23 + sp.ax) * 3 + sp.ax, v = sp.part ? 1.6 : 0.55;
      const tx = sp.part ? -dx / d : Math.cos(a), tz = sp.part ? -dz / d : Math.sin(a);
      sp.vx += (tx * v - sp.vx) * Math.min(1, dt * 1.5); sp.vz += (tz * v - sp.vz) * Math.min(1, dt * 1.5);
      sp.x += sp.vx * dt; sp.z += sp.vz * dt; sp.y = MONDE.sol(sp.x, sp.z) + 0.25 + Math.sin(sp.t * 1.6) * 0.16;
      sp.g.position.set(sp.x, sp.y, sp.z); sp.g.rotation.y = eclatK > 0.2 ? Math.atan2(dx, dz) : Math.atan2(sp.vx, sp.vz);
      sp.m.material.uniforms.uAlpha.value = Math.max(0, sp.alpha);
      for (let i = 1; i < sp.g.children.length; i++) sp.g.children[i].visible = sp.alpha > 0.3;
    }
  }
  // ---------- éclat de la lanterne (tape) ----------
  function eclat() {
    if (eclatT < 1.4) return;
    eclatT = 0; eclatK = 1; snd('eclat'); HUD.flash('rgba(255,244,220,.25)', 900);
    const n = 1 + Math.floor(Math.random() * 3); // des fantômes cachés tout près se révèlent un instant
    for (let i = 0; i < n; i++) { const a = Math.random() * 6.28, r = 6 + Math.random() * 7; apparaitre(JOUEUR.x + Math.cos(a) * r, JOUEUR.z + Math.sin(a) * r, true); }
    for (const sp of ENT.spectres) if (sp.actif && !sp.part && Math.hypot(sp.x - JOUEUR.x, sp.z - JOUEUR.z) < 22) { sp.cible = 1; sp.vie = Math.min(sp.vie, 8); }
  }
  // ---------- ciel changeant et événements ----------
  const METEOS = {
    calme: { aurore: 0, tempete: 0, neige: 0.45, nuages: 0.5, brume: 1 }, neige: { aurore: 0, tempete: 0, neige: 1, nuages: 0.85, brume: 1.25 },
    tempete: { aurore: 0, tempete: 1, neige: 1, nuages: 1, brume: 1.7 }, brume: { aurore: 0, tempete: 0, neige: 0.2, nuages: 0.7, brume: 1.9 },
    aurore: { aurore: 1, tempete: 0, neige: 0.12, nuages: 0.12, brume: 0.72 }, clair: { aurore: 0, tempete: 0, neige: 0.05, nuages: 0.1, brume: 0.7 },
  };
  function changerMeteo(mode) {
    const noms = Object.keys(METEOS).filter(k => k !== meteo.mode);
    meteo.mode = mode || noms[Math.floor(Math.random() * noms.length)]; meteo.fin = t + 150 + Math.random() * 170;
    if (meteo.mode === 'tempete') { meteo.fin = t + 70 + Math.random() * 40; snd('souffle'); }
  }
  function majEvenements(dt) {
    if (t > meteo.fin) changerMeteo();
    const m = METEOS[meteo.mode]; meteo.brume += (m.brume - meteo.brume) * Math.min(1, dt * 0.12); meteo.tempete += (m.tempete - meteo.tempete) * Math.min(1, dt * 0.2);
    ev.prochFilante -= dt; ev.prochMinuit -= dt; ev.prochEnvol -= dt;
    if (ev.prochFilante <= 0) { ev.prochFilante = 30 + Math.random() * 60; CIEL.filante(t); }
    const d = new Date(), h = d.getHours(); // l'heure ronde (vraie heure) sonne au loin
    if (ev.heure !== h && d.getMinutes() === 0) { if (ev.heure !== -1) snd('carillon', { coups: h % 12 || 12 }); ev.heure = h; } else if (ev.heure === -1) ev.heure = d.getMinutes() === 0 ? h : -2;
    if (ev.prochMinuit <= 0 && !ev.traineau) { ev.prochMinuit = 540 + Math.random() * 300; snd('carillon', { coups: 12 }); setTimeout(lancerTraineau, 6000); }
    if (ev.traineau) { // il traverse le ciel en passant devant la lune
      const tr = ev.traineau; tr.k += dt / 16;
      const a = tr.a0 + (tr.k - 0.5) * 1.5, r = 150, hLune = CIEL.dirLune.y * 150;
      tr.g.position.set(cam.position.x + Math.cos(a) * r, cam.position.y + hLune + Math.sin(tr.k * 3.14) * 6 - 4, cam.position.z + Math.sin(a) * r);
      tr.g.rotation.y = -a - Math.PI / 2; tr.g.children.forEach((c, i) => { if (i > 1) c.position.y = 0.3 + Math.sin(t * 8 + i) * 0.25; });
      if (tr.k >= 1) { scene.remove(tr.g); ev.traineau = null; }
    }
    if (ev.prochEnvol <= 0 && !ev.envol) { ev.prochEnvol = 500 + Math.random() * 400; lancerEnvol(); }
    if (ev.envol) { const e = ev.envol; e.t += dt; for (const l of e.l) { l.y += l.v * dt; l.x += Math.sin(t * 0.3 + l.p) * 0.25 * dt + 0.35 * dt; l.z += Math.cos(t * 0.24 + l.p) * 0.25 * dt; } if (e.t > 85) ev.envol = null; }
  }
  function lancerTraineau() {
    if (!scene || ev.traineau) return;
    const g = new THREE.Group(), mat = new THREE.MeshBasicMaterial({ color: 0x030408, fog: false });
    g.add(new THREE.Mesh(new THREE.BoxGeometry(3, 1, 1.4), mat));
    const pat = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.08, 4, 16, Math.PI), mat); pat.rotation.z = Math.PI; pat.position.y = -0.4; g.add(pat);
    for (let i = 0; i < 4; i++) {
      const r = new THREE.Group(); r.add(new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.6, 0.5), mat));
      const tete = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.8, 0.3), mat); tete.position.set(0.9, 0.5, 0); r.add(tete);
      for (const s2 of [-0.12, 0.12]) { const bois = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.7, 4), mat); bois.position.set(0.95, 1.1, s2); bois.rotation.z = -0.4; r.add(bois); }
      for (const lx of [-0.5, 0.5]) { const pat2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.8, 0.1), mat); pat2.position.set(lx, -0.6, 0); pat2.rotation.z = lx; r.add(pat2); }
      r.position.set(3 + i * 2.1, 0.3, 0); g.add(r);
    }
    g.scale.setScalar(2.6); scene.add(g);
    ev.traineau = { g, k: 0, a0: Math.atan2(CIEL.dirLune.z, CIEL.dirLune.x) };
    snd('traineau');
  }
  function lancerEnvol() { // des dizaines de lanternes de papier montent de la ville
    const l = [];
    for (let i = 0; i < 90; i++) { const a = Math.random() * 6.28, r = 8 + Math.random() * 70, x = JOUEUR.x + Math.cos(a) * r, z = JOUEUR.z + Math.sin(a) * r; l.push({ x, z, y: MONDE.terrainBrut(x, z) + 1 - Math.random() * 30, v: 0.7 + Math.random() * 0.6, p: Math.random() * 9 }); }
    ev.envol = { t: 0, l }; snd('boite_a_musique');
  }
  // ---------- lueurs mobiles de l'image ----------
  function listeLueurs() {
    const o = [], C = MONDE.C, pcx = Math.floor(JOUEUR.x / C), pcz = Math.floor(JOUEUR.z / C);
    for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) { // lanternes des carrefours
      const cx = pcx + dx, cz = pcz + dz; if (!MONDE.relais(cx, cz) || !parcelles.has(MONDE.cle(cx, cz))) continue;
      const P = MONDE.plan(cx, cz); if (!P.relais) continue; if (P.relais.y0 === undefined) P.relais.y0 = P.sol(0, 0);
      const lit = j().lanternes[P.relais.id], y = P.relais.y0 + 5.0, fl = 0.9 + 0.1 * Math.sin(t * 9 + cx);
      if (lit) { o.push({ x: P.X0, y, z: P.Z0, c: [1.3 * fl, 0.8 * fl, 0.36 * fl], s: 1.5 }); o.push({ x: P.X0, y, z: P.Z0, c: [0.3, 0.17, 0.07], s: 9 }); }
      else o.push({ x: P.X0, y, z: P.Z0, c: [0.08, 0.11, 0.2], s: 1.6 });
    }
    if (guide.ok && j().reg.guide && guide.init) {
      const p = 0.75 + 0.25 * Math.sin(t * 5); o.push({ x: guide.x, y: guide.y, z: guide.z, c: [1.6 * p, 1.5 * p, 1.0 * p], s: 0.45 }); o.push({ x: guide.x, y: guide.y, z: guide.z, c: [0.22, 0.26, 0.2], s: 3.2 });
      guide.traine.forEach((q, i) => { const k = 1 - (i + 1) / 8; o.push({ x: q.x, y: q.y + Math.sin(t * 3 + i) * 0.05, z: q.z, c: [0.5 * k, 0.5 * k, 0.32 * k], s: 0.3 * k + 0.1 }); });
    }
    for (const sp of ENT.spectres) if (sp.actif) o.push({ x: sp.x, y: sp.y + 1.2, z: sp.z, c: [0.14 * sp.alpha, 0.2 * sp.alpha, 0.26 * sp.alpha], s: 4.5 });
    if (eclatK > 0.01) o.push({ x: JOUEUR.x, y: JOUEUR.y + 1.3, z: JOUEUR.z, c: [1.2 * eclatK, 1.1 * eclatK, 0.9 * eclatK], s: 26 * (1.3 - eclatK) + 3 });
    if (ev.envol) { const k = sstep(0, 4, ev.envol.t) * sstep(85, 70, ev.envol.t); for (const l of ev.envol.l) if (l.y > MONDE.terrainBrut(l.x, l.z) + 1) o.push({ x: l.x, y: l.y, z: l.z, c: [1.5 * k, 0.75 * k, 0.25 * k], s: 0.75 }); }
    return o;
  }

  // ---------- options (réglages) ----------
  function htmlOptions() {
    const r = j().reg, q = r.qualite === 'auto' ? 'auto' : String(r.qualite);
    const b = (k, v, lib, act) => '<button class="reg' + (act ? ' on' : '') + '" onclick="ui_reglage(\'' + k + '\',\'' + v + '\')">' + lib + '</button>';
    return '<div class="regs"><button class="reg on" onclick="ui_carnet()">📖 Carnet des merveilles</button></div>' +
      '<div class="sect">Promenade</div><div class="regs">' + b('guide', r.guide ? '0' : '1', 'Lueur-guide : ' + (r.guide ? 'oui' : 'non'), r.guide) + b('inverser', r.inverser ? '0' : '1', 'Inverser haut/bas : ' + (r.inverser ? 'oui' : 'non'), r.inverser) + '</div>' +
      '<div class="regs">' + b('sens', '-', 'Regard plus lent', false) + b('sens', '+', 'Regard plus vif', false) + '</div><div class="log">Sensibilité du regard : ' + r.sens.toFixed(1).replace('.', ',') + '</div>' +
      '<div class="sect">Son</div><div class="regs">' + b('musique', r.musique ? '0' : '1', 'Musique : ' + (r.musique ? 'oui' : 'non'), r.musique) + b('mvol', '-', 'Musique −', false) + b('mvol', '+', 'Musique +', false) + '</div>' +
      '<div class="regs">' + b('sons', r.sons ? '0' : '1', 'Ambiance : ' + (r.sons ? 'oui' : 'non'), r.sons) + b('svol', '-', 'Ambiance −', false) + b('svol', '+', 'Ambiance +', false) + '</div>' +
      '<div class="log">Musique ' + Math.round(r.mvol * 100) + ' % · ambiance ' + Math.round(r.svol * 100) + ' %. Avec des écouteurs, c’est encore mieux.</div>' +
      '<div class="sect">Image</div><div class="regs">' + b('qualite', 'auto', 'Auto', q === 'auto') + b('qualite', '0', 'Légère', q === '0') + b('qualite', '1', 'Belle', q === '1') + b('qualite', '2', 'Maximale', q === '2') + '</div>' +
      '<div class="log">La netteté s’ajuste toute seule pour rester fluide.</div>' +
      '<div class="sect">Gestes</div><div class="log">Pouce gauche : marcher (au bout = courir). Glisse à droite : regarder. Tape brève : un éclat de lanterne révèle ce qui se cache.</div>';
  }
  window.ui_reglage = function (k, v) {
    const r = j().reg;
    if (k === 'qualite') { r.qualite = v === 'auto' ? 'auto' : +v; appliquerQualite(false); }
    else if (k === 'musique' || k === 'sons' || k === 'inverser' || k === 'guide') r[k] = v === '1';
    else if (k === 'mvol' || k === 'svol') r[k] = clamp(Math.round((r[k] + (v === '+' ? 0.1 : -0.1)) * 10) / 10, 0, 1);
    else if (k === 'sens') r.sens = clamp(Math.round((r.sens + (v === '+' ? 0.2 : -0.2)) * 10) / 10, 0.4, 3);
    try { AUDIO.appliquerReglages(); } catch (e) { }
    snd('menu'); save(false); closeModal(); openOptions();
  };
  function intro() {
    const I = TXT.intro;
    modal(I.titre, '<div class="grand">' + esc(I.sous) + '</div><div>' + esc(I.histoire) + '</div>' +
      '<div class="log" style="margin-top:10px">Pouce gauche : marcher. Glisse à droite : regarder. Une tape : ta lanterne lance un éclat.<br>Suis la petite lueur… ou perds-toi.</div>',
      [['Entrer dans la nuit', () => { j().intro = true; save(false); }]]);
  }
  function placer() { const s = j(); JOUEUR.x = s.x; JOUEUR.z = s.z; JOUEUR.y = Math.max(s.y, MONDE.sol(s.x, s.z)); JOUEUR.yaw = s.yaw; JOUEUR.pitch = s.pitch; JOUEUR.vx = JOUEUR.vy = JOUEUR.vz = 0; dernierCh = null; guide.ok = false; guide.init = false; }
  function allerVers(cx, cz) { const C = MONDE.C; JOUEUR.x = cx * C + C / 2; JOUEUR.z = cz * C + 2; JOUEUR.y = MONDE.sol(JOUEUR.x, JOUEUR.z) + 0.5; { const jc = MONDE.jacob(JOUEUR.x, JOUEUR.z); JOUEUR.yaw = Math.atan2(-jc[1], -jc[3]); } JOUEUR.vx = JOUEUR.vz = 0; dernierCh = null; guide.init = false; }

  // ======================= objet JEU (contrat de la coquille) =======================
  let modalVu = 0, tBoucles = 0;
  return {
    titre: 'Noëlombre', id: 'noelombre', prefixe: 'NOEL1',
    modeDieu: 'mode esprit : tu voles, tu traverses les murs, tu vas vite',
    etatInitial, valider,
    options: () => htmlOptions(),
    dev: () => [
      ['Aller à la prochaine merveille', () => { const b = chercherSite(); if (b) allerVers(b.cx, b.cz); }],
      ['Météo suivante (' + meteo.mode + ')', () => { changerMeteo(); }], ['Aurore', () => changerMeteo('aurore')], ['Tempête', () => changerMeteo('tempete')],
      ['Traîneau de minuit', () => { ev.prochMinuit = 0; }], ['Envol de lanternes', () => { ev.prochEnvol = 0; }],
      ['Retour au départ', () => { JOUEUR.x = 3.5; JOUEUR.z = 2.2; JOUEUR.y = MONDE.sol(3.5, 2.2); JOUEUR.yaw = regardRue(3.5, 2.2); dernierCh = null; guide.init = false; }],
    ],
    demarrer(zone) {
      HUD.creer(zone);
      if (!creerRendu(zone)) return;
      MONDE.graine = j().graine; MONDE.etat = j();
      Q = Qeff();
      TEX.creer(Q); MAT.creer();
      CIEL.creer(scene, renderer, Q);
      ENT.creer(scene);
      creerLanterne();
      appliquerQualite(true);
      CTRL.installer(document.getElementById('ctrl'), document.getElementById('stickBase'), document.getElementById('stickBtn'));
      placer();
      if (typeof PHOTOS !== 'undefined') PHOTOS.charger();
      document.addEventListener('visibilitychange', () => {
        try { AUDIO.suspendre(document.hidden); } catch (e) { }
        if (document.hidden) CTRL.relacher(); else setTimeout(() => { try { if (renderer.getContext().isContextLost()) { save(false); location.reload(); } } catch (e) { } }, 1500);
      });
      addEventListener('blur', () => CTRL.relacher());
      majParcelles(500);
      setTimeout(() => {
        try { const sp = ENT.spectres[0]; sp.g.visible = true; sp.g.position.set(JOUEUR.x, -50, JOUEUR.z); renderer.compile(scene, cam); sp.g.visible = false; } catch (e) { }
        prete = true; HUD.fin(); if (!j().intro) intro(); else HUD.banniere('Noëlombre', TXT.intro.sous, 5000);
      }, 500);
    },
    recharger() {
      const s = j(); MONDE.graine = s.graine; MONDE.etat = s; MONDE.viderCaches(); viderParcelles();
      placer(); for (const sp of ENT.spectres) { sp.actif = false; sp.g.visible = false; } majParcelles(300);
      if (!s.intro) intro();
    },
    redimensionner() { redimensionner(); },
    tick(dt) {
      if (!renderer) return;
      dt = Math.min(dt, 0.1); t += dt;
      const s = j(); s.stats.temps += dt; if (MONDE.etat !== s) MONDE.etat = s;
      const d = JOUEUR.majPhysique(dt, CTRL.lire(), esprit());
      s.stats.distance += d;
      s.x = JOUEUR.x; s.y = JOUEUR.y; s.z = JOUEUR.z; s.yaw = JOUEUR.yaw; s.pitch = JOUEUR.pitch;
      majParcelles(prete ? 8 : 60);
      tLum -= dt; if (tLum <= 0) { tLum = 0.3; majLumieres(); }
      majDecouvertes(); majGuide(dt); majSpectres(dt);
      eclatT += dt; eclatK = Math.max(0, eclatK - dt * 0.7);
      if (CTRL.tape) { CTRL.tape = false; eclat(); }
      majEvenements(dt);
      // sons : ambiance + musiques « dans le décor » des merveilles proches (carrousel, orgue, chœur)
      let feu = 0; for (const l of lumProches) if (l.feu || l.relais) feu = Math.max(feu, 1 - l.d / (l.r * 0.6));
      try {
        AUDIO.maj(dt, { marche: clamp(JOUEUR.vitesse / 3.4, 0, 1) * (JOUEUR.sol ? 1 : 0), surface: JOUEUR.surface, courir: JOUEUR.vitesse > 4.6, feu: Math.max(0, feu), vent: 0.15 + meteo.tempete * 0.85,
          hauteur: Math.max(0, JOUEUR.y - MONDE.terrainBrut(JOUEUR.x + 30, JOUEUR.z)), enPause: false, calme: meteo.mode === 'clair' || meteo.mode === 'aurore' ? 1 : 0 });
        tBoucles -= dt;
        if (tBoucles <= 0 && AUDIO.boucle) {
          tBoucles = 0.25; const vol = { manege: 0, orgue: 0, choeur: 0 }, C = MONDE.C;
          for (const [, o] of parcelles) { const b = REPERES[o.P.type].boucle; if (b && b in vol) vol[b] = Math.max(vol[b], Math.pow(clamp(1 - Math.hypot(o.P.X0 + C / 2 - JOUEUR.x, o.P.Z0 + C / 2 - JOUEUR.z) / 55, 0, 1), 1.5)); }
          for (const k in vol) AUDIO.boucle(k, vol[k]);
        }
      } catch (e) { }
    },
    rendu() {
      if (!renderer || !composer) return;
      const s = j();
      if (MODAL_OPEN) { try { AUDIO.maj(0.016, { marche: 0, enPause: true }); } catch (e) { } if (modalVu > 2) return; modalVu++; if (modalVu === 1) CTRL.relacher(); } else modalVu = 0;
      adapter();
      JOUEUR.cameraVers(cam);
      MAT.U.uCentre.value.set(JOUEUR.wx, JOUEUR.wz); MAT.U.uTemps.value = t;
      // la bulle : le brouillard suit la météo et s'ouvre quand on prend de la hauteur
      const hRel = clamp((JOUEUR.y - (MONDE.terrainBrut(JOUEUR.x + 40, JOUEUR.z) + MONDE.terrainBrut(JOUEUR.x - 40, JOUEUR.z)) / 2) / 16, 0, 1);
      const dens = 0.0195 * meteo.brume * (1 - hRel * 0.4) * (Q === 0 ? 1.3 : 1);
      scene.fog.density += (dens - scene.fog.density) * 0.04;
      CIEL.maj(t, cam.position, METEOS[meteo.mode]);
      appliquerLumieres();
      // ombre de la lune : recalculée seulement quand on s'est déplacé ou que la ville a changé autour
      if (Q >= 1 && (ombre.sale || Math.hypot(JOUEUR.x - ombre.x, JOUEUR.z - ombre.z) > 9)) { ombre.x = JOUEUR.x; ombre.z = JOUEUR.z; ombre.sale = false; CIEL.ombreVers(JOUEUR.x, JOUEUR.y, JOUEUR.z); }
      if (lanterne) { // lanterne à la main : balancement, flamme vivante, éclat
        const v = Math.min(1, JOUEUR.vitesse / 3.4);
        lanterne.position.set(LPOS.x + Math.sin(JOUEUR.bob * 0.5) * 0.014 * v, LPOS.y + Math.abs(Math.cos(JOUEUR.bob * 0.5)) * 0.018 * v, -0.62);
        lanterne.rotation.z = Math.sin(t * 1.3) * 0.04 + Math.sin(JOUEUR.bob * 0.5) * 0.08 * v;
        const fl = 0.85 + Math.sin(t * 17) * 0.06 + Math.sin(t * 7.3) * 0.08; lanterne.userData.flamme.scale.set(fl, 1.7 * fl, fl);
        lanterneL.intensity = 0.95 * fl * (1 + eclatK * 12); lanterneL.distance = 10 + eclatK * 24;
      }
      // anime ce qui bouge dans les parcelles proches
      const C = MONDE.C;
      for (const [, o] of parcelles) {
        if (!o.obj.anims.length) continue;
        const dx = JOUEUR.x - o.P.X0, dz = JOUEUR.z - o.P.Z0, dd = Math.hypot(dx - C / 2, dz - C / 2); if (dd > 115) continue;
        const ctx = o.ctx || (o.ctx = { son: snd }); ctx.d = dd; ctx.jx = dx; ctx.jz = dz; ctx.eclat = dd < 32 ? eclatK : 0; ctx.vu = !!s.sitesVus[MONDE.cle(o.P.cx, o.P.cz)];
        for (const a of o.obj.anims) a(t, 0.016, ctx);
      }
      ENT.dessiner(listeLueurs());
      passeFin.uniforms.uTemps.value = t;
      renderer.info.reset(); composer.render();
      HUD.maj({ esprit: esprit() });
    },
    absence: () => '',
    _tris: () => { const o = {}; scene.traverse(m => { if ((m.isMesh || m.isPoints) && m.geometry.index) o[m.name || '?'] = (o[m.name || '?'] || 0) + m.geometry.index.count / (m.isPoints ? 1 : 3); }); return o; },
    _info: () => ({ calls: renderer.info.render.calls, tris: renderer.info.render.triangles, parcelles: parcelles.size, geo: renderer.info.memory.geometries, prog: renderer.info.programs.length, Q, pr: pr.v }),
    _pr: v => { pr.fixe = true; pr.v = v; renderer.setPixelRatio(v); redimensionner(); },
    _etat: () => ({ eclat: eclatK, guide: guide.ok ? { cx: guide.cx, cz: guide.cz, x: guide.x, z: guide.z } : null, meteo: meteo.mode, fantomes: ENT.spectres.filter(q => q.actif).length, parcelles: parcelles.size, prete }),
    _site: chercherSite,
    _meteo: changerMeteo, _eclat: eclat, _aller: allerVers,
  };
})();
