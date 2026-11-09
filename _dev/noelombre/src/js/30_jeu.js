/* ===================== LE JEU : Noëlombre =====================
   Boucle : parcelles chargées autour du joueur (la ville est infinie), lumières les plus proches attribuées à un
   petit nombre de vraies lampes, froid / chaleur, spectres, bonbons, cadeaux à livrer, lanternes-relais (points de
   sauvegarde cachés), repères, curiosités et Étoiles d'ombre, quêtes, succès, événements (tempête, aurore, minuit).
   Branché sur la coquille (08_coquille.js) via l'objet JEU. */
const SUCCES = [
  { id: 'premierPas', nom: 'Premier pas dans la neige', desc: 'Marcher 100 m.', test: j => j.stats.distance >= 100 },
  { id: 'marcheur', nom: 'Grand marcheur', desc: 'Marcher 5 km.', test: j => j.stats.distance >= 5000 },
  { id: 'globe', nom: 'Tour du globe', desc: 'Marcher 20 km.', test: j => j.stats.distance >= 20000 },
  { id: 'gourmand', nom: 'Dent sucrée', desc: 'Ramasser 500 bonbons.', test: j => j.stats.ramasses >= 500 },
  { id: 'ogre', nom: 'Ogre de sucre', desc: 'Ramasser 5 000 bonbons.', test: j => j.stats.ramasses >= 5000 },
  { id: 'facteur', nom: 'Facteur de minuit', desc: 'Livrer 10 cadeaux.', test: j => j.stats.livraisons >= 10 },
  { id: 'pere', nom: 'Barbe de givre', desc: 'Livrer 100 cadeaux.', test: j => j.stats.livraisons >= 100 },
  { id: 'allumeur', nom: 'Allumeur de réverbères', desc: 'Allumer 10 lanternes-relais.', test: j => Object.keys(j.relais).length >= 10 },
  { id: 'phare', nom: 'Phare dans la nuit', desc: 'Allumer 40 lanternes-relais.', test: j => Object.keys(j.relais).length >= 40 },
  { id: 'chasseur', nom: 'Chasseur de spectres', desc: 'Dissiper 25 spectres.', test: j => j.stats.spectres >= 25 },
  { id: 'exorciste', nom: 'Lumière vivante', desc: 'Dissiper 150 spectres.', test: j => j.stats.spectres >= 150 },
  { id: 'curieux', nom: 'Curieux de nature', desc: 'Trouver 10 curiosités.', test: j => Object.keys(j.curiosites).length >= 10 },
  { id: 'collection', nom: 'Cabinet de curiosités', desc: 'Trouver les 48 curiosités.', test: j => Object.keys(j.curiosites).length >= 48 },
  { id: 'etoile1', nom: 'Une étoile dans la poche', desc: 'Obtenir une Étoile d’ombre.', test: j => Object.keys(j.etoiles).length >= 1 },
  { id: 'etoile6', nom: 'Demi-constellation', desc: 'Obtenir 6 Étoiles d’ombre.', test: j => Object.keys(j.etoiles).length >= 6 },
  { id: 'touriste', nom: 'Touriste du givre', desc: 'Visiter les 6 quartiers.', test: j => Object.keys(j.quartiersVus).length >= 6 },
  { id: 'gelé', nom: 'Glaçon humain', desc: 'S’évanouir de froid une fois (ça arrive).', test: j => j.stats.evanouis >= 1 },
  { id: 'souhait', nom: 'Faiseur de vœux', desc: 'Faire 10 vœux au puits.', test: j => j.stats.voeux >= 10 },
  { id: 'traineau', nom: 'Je l’ai vu !', desc: 'Voir passer le traîneau de minuit.', test: j => j.stats.traineaux >= 1 },
  { id: 'aurore', nom: 'Ciel qui danse', desc: 'Voir une aurore.', test: j => j.stats.aurores >= 1 },
  { id: 'sommet', nom: 'Tête dans la lune', desc: 'Atteindre le sommet d’une colline en spirale.', test: j => j.stats.sommets >= 1 },
  { id: 'equipe', nom: 'Bien équipé', desc: 'Monter toutes les améliorations au niveau 3.', test: j => Object.keys(AMEL).every(k => j.niv[k] >= Math.min(3, AMEL[k].max)) },
  { id: 'quetes', nom: 'Exauceur', desc: 'Accomplir 25 vœux de la ville.', test: j => j.quetesFaites >= 25 },
  { id: 'fin', nom: 'L’Aurore éternelle', desc: 'Réunir les 12 Étoiles d’ombre.', test: j => Object.keys(j.etoiles).length >= 12 },
];
const RANGS_SEUILS = [0, 3, 8, 15, 25, 40, 60, 90, 130, 200];
function JEU_capacite() { return 2 + S.jeu.niv.sac; }
function JEU_rang() { const n = S.jeu.stats.livraisons; let r = 0; RANGS_SEUILS.forEach((s, i) => { if (n >= s) r = i; }); return TXT.rangs[r]; }
function JEU_prixVoyage() { return 15; }
function JEU_livree(P, m) { const l = S.jeu.livrees[MONDE.cle(P.cx, P.cz)]; return !!(l && l.indexOf(m.id) >= 0); }
function JEU_texteQuete(q) { const g = TXT.quetes.find(x => x.type === q.type) || { texte: q.type }; const t = q.var && g.variantes ? g.variantes[0] : g.texte; return t.replace('{n}', fmt(q.n)).replace('{lieu}', q.lieu ? TXT.quartiers[q.lieu].nom : ''); }
let JEU_apresAchat = () => { }, JEU_voyager = () => { };

const JEU = (() => {
  let renderer = null, scene = null, cam = null, composer = null, bloom = null, Q = 1, R = 2, prete = false, t = 0;
  const parcelles = new Map(); // clé -> { P, obj, d }
  const LPOS = { x: 0.3, y: -0.34 }; // place de la lanterne dans la main (selon la largeur de l'écran)
  let lumPool = [], lanterne = null, lanterneL = null, lumProches = [], tLum = 0, tSpawn = 0, eclatT = 99, eclatFlash = 0;
  const bonbonsPris = new Map(); // clé parcelle:id -> instant (repoussent après 8 min)
  const libres = []; // bonbons lâchés (spectres, pluie dorée)
  let actionCourante = null, dernierQ = null, dernierCh = null, dernMsgSac = 0, combo = 0, comboT = 0;
  const ev = { tempete: false, aurore: false, tempeteFin: 0, auroreFin: 0, prochTempete: 420, prochFilante: 30, prochMinuit: 600, traineau: null, heure: -1 };
  let cielFait = false, voyageEnCours = 0, evanoui = 0, lunetteT = -999;
  const j = () => S.jeu;

  // ---------- qualité ----------
  function qualiteAuto() {
    if (IS_IOS) return 1;
    const mem = navigator.deviceMemory || 4, coeurs = navigator.hardwareConcurrency || 4;
    return mem >= 8 && coeurs >= 8 ? 2 : 1;
  }
  let QP_FORCE = null;
  function Qeff() { const r = j().reg.qualite; return r === 'auto' || r == null ? (QP_FORCE != null ? QP_FORCE : qualiteAuto()) : clamp(+r, 0, 3); }
  const QP = [ // pixelRatio max, rayon (parcelles), lampes, ombres, bloom
    { pr: 1.0, R: 1, nl: 2 }, { pr: 1.35, R: 2, nl: 4 }, { pr: 1.75, R: 2, nl: 6 }, { pr: 2.5, R: 3, nl: 8 }];

  // ---------- état sauvegardé ----------
  function etatInitial() {
    return {
      graine: (Math.random() * 1e9) | 0, x: 3.5, y: 0, z: 2.2, yaw: -Math.PI / 2 - 0.08, pitch: 0.06,
      bonbons: 0, chaleur: 100, sac: 0,
      niv: { lanterne: 0, bottes: 0, echarpe: 0, sac: 0, aimant: 0, ressorts: 0, boussole: 0, eclat: 0 },
      relais: { '0,0': 1 }, dernierRelais: '0,0', cadeauxPris: {}, livrees: {}, reperes: {}, spotsPris: {}, curiosites: {}, etoiles: {}, explores: {}, quartiersVus: {},
      stats: { distance: 0, livraisons: 0, spectres: 0, evanouis: 0, ramasses: 0, voeux: 0, temps: 0, traineaux: 0, aurores: 0, sommets: 0 },
      quetes: [], quetesFaites: 0, succes: {}, intro: false, fini: false,
      reg: { musique: true, mvol: 0.6, sons: true, svol: 0.85, qualite: 'auto', sens: 1, inverser: false },
    };
  }
  function valider(s) {
    const d = etatInitial();
    for (const k of ['x', 'y', 'z', 'yaw', 'pitch', 'bonbons', 'chaleur', 'sac', 'quetesFaites', 'graine']) if (!Number.isFinite(s[k])) s[k] = d[k];
    for (const k of ['niv', 'stats', 'reg']) s[k] = Object.assign({}, d[k], s[k] && typeof s[k] === 'object' ? s[k] : {});
    for (const k of ['relais', 'cadeauxPris', 'livrees', 'reperes', 'spotsPris', 'curiosites', 'etoiles', 'explores', 'quartiersVus', 'succes']) if (!s[k] || typeof s[k] !== 'object' || Array.isArray(s[k])) s[k] = d[k];
    for (const k in s.niv) s.niv[k] = clamp(Math.floor(+s.niv[k] || 0), 0, AMEL[k] ? AMEL[k].max : 0);
    for (const k in s.stats) if (!Number.isFinite(s.stats[k])) s.stats[k] = 0;
    if (!Array.isArray(s.quetes)) s.quetes = [];
    s.quetes = s.quetes.filter(q => q && TXT.quetes.some(g => g.type === q.type) && Number.isFinite(q.n) && Number.isFinite(q.prog));
    s.bonbons = Math.max(0, Math.min(1e12, s.bonbons)); s.chaleur = clamp(s.chaleur, 1, 100); s.sac = clamp(Math.floor(s.sac), 0, 2 + s.niv.sac);
    if (!s.relais['0,0']) s.relais['0,0'] = 1;
    if (typeof s.dernierRelais !== 'string' || !s.relais[s.dernierRelais]) s.dernierRelais = '0,0';
  }

  // ---------- rendu ----------
  function creerRendu(zone) {
    const cv = document.createElement('canvas'); cv.id = 'cv3d'; zone.insertBefore(cv, zone.firstChild);
    try { renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: false, powerPreference: 'high-performance', stencil: false }); }
    catch (e) { zone.insertAdjacentHTML('beforeend', '<div class="pasgl">Ton appareil ne peut pas afficher la 3D (WebGL). Essaie avec Safari à jour.</div>'); return false; }
    renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 0.95;
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap; renderer.info.autoReset = false;
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(CIEL.horizon.clone(), 0.026);
    cam = new THREE.PerspectiveCamera(72, 1, 0.08, 600); scene.add(cam);
    return true;
  }
  function appliquerQualite(init) {
    Q = Qeff(); const p = QP[Q]; R = p.R;
    renderer.setPixelRatio(Math.min(p.pr, devicePixelRatio || 1));
    CIEL.luneL.castShadow = Q >= 2; renderer.shadowMap.enabled = Q >= 2;
    if (CIEL.luneL.shadow.map) { CIEL.luneL.shadow.map.dispose(); CIEL.luneL.shadow.map = null; }
    CIEL.luneL.shadow.mapSize.set(Q >= 3 ? 2048 : 1024, Q >= 3 ? 2048 : 1024);
    // nombre de vraies lampes (changer ce nombre recompile les shaders : seulement ici)
    for (const l of lumPool) scene.remove(l);
    lumPool = []; for (let i = 0; i < p.nl; i++) { const l = new THREE.PointLight(0xffaa66, 0, 14, 2); scene.add(l); lumPool.push(l); }
    if (!init) { for (const [k, o] of parcelles) { if (o.obj) { scene.remove(o.obj.groupe); o.obj.liberer(); } } parcelles.clear(); scene.traverse(o => { if (o.material) o.material.needsUpdate = true; }); }
    redimensionner();
  }
  function creerComposer() {
    if (composer) { try { composer.renderTarget1.dispose(); composer.renderTarget2.dispose(); bloom.dispose(); } catch (e) { } }
    const size = renderer.getDrawingBufferSize(new THREE.Vector2());
    const ext = renderer.extensions, hf = ext.has('EXT_color_buffer_half_float') || ext.has('EXT_color_buffer_float');
    const rt = new THREE.WebGLRenderTarget(size.x, size.y, { type: hf ? THREE.HalfFloatType : THREE.UnsignedByteType, samples: Q >= 2 && hf ? 4 : 0 });
    composer = new THREE.EffectComposer(renderer, rt);
    composer.addPass(new THREE.RenderPass(scene, cam));
    bloom = new THREE.UnrealBloomPass(new THREE.Vector2(size.x / 2, size.y / 2), 0.75, 0.42, 0.86);
    composer.addPass(bloom);
    composer.addPass(new THREE.OutputPass());
  }
  function redimensionner() {
    if (!renderer) return;
    const cv = renderer.domElement, r = cv.parentNode.getBoundingClientRect(), w = Math.max(1, r.width), h = Math.max(1, r.height);
    renderer.setSize(w, h, false); cam.aspect = w / h; cam.fov = w > h ? 64 : 74; cam.updateProjectionMatrix();
    { const tv = Math.tan(cam.fov * Math.PI / 360), th = tv * cam.aspect; LPOS.x = Math.min(0.3, 0.6 * th * 0.62); LPOS.y = -0.6 * tv * 0.5; }
    if (composer) { composer.setPixelRatio(renderer.getPixelRatio()); composer.setSize(w, h); }
    const hb = h * renderer.getPixelRatio(), ech = hb / (2 * Math.tan(cam.fov * Math.PI / 360));
    if (CIEL.matNeige) CIEL.matNeige.uniforms.uEchelle.value = ech;
    PARCELLE.echelleParticules(ech); ENT.echelle(ech);
    HUD.taille();
  }
  // ---------- lanterne tenue à la main ----------
  function creerLanterne() {
    const g = new THREE.Group(), L = GEO.Lots();
    L.get('metal').add(GEO.base('cube'), { m: GEO.mat(0, 0.12, 0, 0.13, 0.02, 0.13), c: [0.2, 0.18, 0.16] });
    L.get('metal').add(GEO.base('cube'), { m: GEO.mat(0, -0.1, 0, 0.14, 0.03, 0.14), c: [0.2, 0.18, 0.16] });
    for (const [x, z] of [[-0.06, -0.06], [0.06, -0.06], [-0.06, 0.06], [0.06, 0.06]]) L.get('metal').add(GEO.base('cube'), { m: GEO.mat(x, 0.01, z, 0.012, 0.22, 0.012), c: [0.2, 0.18, 0.16] });
    L.get('metal').add(GEO.base('cone4'), { m: GEO.mat(0, 0.17, 0, 0.09, 0.08, 0.09), c: [0.2, 0.18, 0.16] });
    L.get('metal').add(GEO.base('toreFin'), { m: GEO.mat(0, 0.25, 0, 0.05, 0.06, 0.05, 0, Math.PI / 2, 0), c: [0.2, 0.18, 0.16] });
    for (const k in L.tous) { const m = new THREE.Mesh(L.tous[k].geometrie(), new THREE.MeshStandardMaterial({ vertexColors: true, metalness: 0.7, roughness: 0.4 })); g.add(m); }
    const fl = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 8), new THREE.MeshBasicMaterial({ color: new THREE.Color(5, 3, 1.2), toneMapped: false }));
    fl.scale.set(1, 1.6, 1); g.add(fl); g.userData.flamme = fl;
    const verre = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.2, 0.11), new THREE.MeshBasicMaterial({ color: new THREE.Color(1.2, 0.75, 0.35), transparent: true, opacity: 0.25, depthWrite: false, toneMapped: false }));
    g.add(verre);
    g.position.set(0.3, -0.34, -0.62); g.scale.setScalar(0.8); cam.add(g);
    lanterne = g;
    lanterneL = new THREE.PointLight(0xffb070, 2, 12, 1.6); lanterneL.position.set(0.3, -0.1, -0.9); cam.add(lanterneL);
  }

  // ---------- parcelles ----------
  function majParcelles(budget) {
    const C = MONDE.C, pcx = Math.floor(JOUEUR.x / C), pcz = Math.floor(JOUEUR.z / C);
    for (const [k, o] of parcelles) {
      const d = Math.max(Math.abs(o.P.cx - pcx), Math.abs(o.P.cz - pcz));
      if (d > R + 1) { if (o.obj) { scene.remove(o.obj.groupe); o.obj.liberer(); } parcelles.delete(k); }
    }
    const manque = [];
    for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
      const cx = pcx + dx, cz = pcz + dz, k = MONDE.cle(cx, cz);
      const ccx = cx * C + C / 2, ccz = cz * C + C / 2, dd = Math.hypot(ccx - JOUEUR.x, ccz - JOUEUR.z);
      if (dd > (R + 0.75) * C) continue;
      if (!parcelles.has(k)) manque.push({ cx, cz, k, dd });
    }
    manque.sort((a, b) => a.dd - b.dd);
    const t0 = performance.now();
    for (const m of manque) {
      if (performance.now() - t0 > budget) break;
      const P = MONDE.plan(m.cx, m.cz), obj = PARCELLE.construire(P, Q);
      scene.add(obj.groupe); parcelles.set(m.k, { P, obj });
      if (budget < 20) break;
    }
    return manque.length;
  }
  // ---------- lumières : les plus proches deviennent de vraies lampes ----------
  function majLumieres() {
    const C = MONDE.C, pcx = Math.floor(JOUEUR.x / C), pcz = Math.floor(JOUEUR.z / C), L = [];
    for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) {
      const P = MONDE.plan(pcx + dx, pcz + dz);
      for (const l of P.lumieres) L.push({ x: P.X0 + l.x, y: l.y, z: P.Z0 + l.z, c: l.c, i: l.i, r: l.r, chaleur: l.chaleur, feu: l.feu, follet: l.follet });
      if (P.relais && j().relais[P.relais.id]) L.push({ x: P.X0, y: P.sol(0, 0) + 5.0, z: P.Z0, c: [1, 0.72, 0.4], i: 2.4, r: 13, chaleur: 3, relais: true });
    }
    for (const l of L) l.d = Math.hypot(l.x - JOUEUR.x, l.z - JOUEUR.z);
    L.sort((a, b) => a.d - b.d);
    lumProches = L;
  }
  function appliquerLumieres() {
    const k = MAT.U.uCourbe.value;
    for (let i = 0; i < lumPool.length; i++) {
      const pl = lumPool[i], l = lumProches[i];
      if (!l || l.d > 40) { pl.intensity = 0; continue; }
      const dd = l.d * l.d * k;
      pl.position.set(l.x, l.y - dd, l.z);
      pl.color.setRGB(l.c[0], l.c[1], l.c[2]);
      let it = l.i * 14 * (l.follet ? 0.8 + 0.4 * Math.sin(t * 3 + l.x) : 1);
      if (l.feu) it *= 0.8 + 0.25 * Math.sin(t * 13 + l.x) + 0.15 * Math.sin(t * 29);
      pl.intensity = it * sstep(40, 26, l.d); pl.distance = l.r * 1.6; pl.decay = 1.7;
    }
  }
  function lumiereEn(x, z) { let v = 0; for (const l of lumProches) { if (l.chaleur <= 0 && !l.relais) continue; const d = Math.hypot(l.x - x, l.z - z); if (d > 18) continue; v = Math.max(v, 1 - d / (l.r * 0.65)); } return v; }

  // ---------- objets du jeu (bonbons, cadeaux, portes, relais, curiosités) ----------
  function listeObjets() {
    const C = MONDE.C, pcx = Math.floor(JOUEUR.x / C), pcz = Math.floor(JOUEUR.z / C), now = t;
    const o = { bonbons: [], cadeaux: [], spots: [], lueurs: [], portes: [], relais: [], carteCadeaux: [], cartePortes: [] };
    const rr = Math.min(R, 2);
    for (let dz = -rr; dz <= rr; dz++) for (let dx = -rr; dx <= rr; dx++) {
      const cx = pcx + dx, cz = pcz + dz, k = MONDE.cle(cx, cz); if (!parcelles.has(k)) continue;
      const P = MONDE.plan(cx, cz), sol = P.sol;
      for (const b of P.bonbons) { const kb = k + ':' + b.id, pr = bonbonsPris.get(kb); if (pr !== undefined && now - pr < 480) continue; o.bonbons.push({ x: P.X0 + b.x, y: sol(b.x, b.z) + 0.7, z: P.Z0 + b.z, or: b.or, ph: b.id * 1.7, cle: kb }); }
      const pris = j().cadeauxPris[k];
      for (const c of P.cadeaux) { if (pris && pris.indexOf(c.id) >= 0) continue; const w = { x: P.X0 + c.x, y: sol(c.x, c.z), z: P.Z0 + c.z, coul: c.coul, ph: c.id * 2.1, P, id: c.id }; o.cadeaux.push(w); o.lueurs.push({ x: w.x, y: w.y + 0.5, z: w.z, c: [1.1, 0.55, 0.85], s: 2.2 }); if (Math.abs(dx) <= 1 && Math.abs(dz) <= 1) o.carteCadeaux.push(w); }
      for (const m of P.maisons) if (m.attente && !JEU_livree(P, m)) {
        const w = { x: P.X0 + m.porte.x, z: P.Z0 + m.porte.z, P, m }; o.portes.push(w);
        const c = Math.cos(m.ang), s = Math.sin(m.ang), lx = m.porteX, lz = m.d / 2 + 0.25;
        o.lueurs.push({ x: P.X0 + m.x + c * lx + s * lz, y: m.y + 1.65, z: P.Z0 + m.z - s * lx + c * lz, c: [0.25, 1.4 + 0.5 * Math.sin(t * 3 + m.id), 0.45], s: 1.6 });
        if (j().niv.boussole >= 3 || (Math.abs(dx) <= 1 && Math.abs(dz) <= 1 && Math.hypot(w.x - JOUEUR.x, w.z - JOUEUR.z) < 45)) o.cartePortes.push(w);
      }
      if (P.relais) { const lit = j().relais[P.relais.id], w = { x: P.X0, z: P.Z0, y: sol(0, 0), k: P.relais.id, lit }; o.relais.push(w); o.lueurs.push({ x: w.x, y: w.y + 5.0, z: w.z, c: lit ? [3, 1.9, 0.9] : [0.25, 0.35, 0.6], s: lit ? 2.6 : 1.1 }); if (lit) o.lueurs.push({ x: w.x, y: w.y + 5.0, z: w.z, c: [1.2, 0.6, 0.25], s: 7 }); }
      if (P.spot && !j().spotsPris[k]) { const w = { x: P.X0 + P.spot.x, y: sol(P.spot.x, P.spot.z) + P.spot.dy, z: P.Z0 + P.spot.z, P, k }; o.spots.push(w); o.lueurs.push({ x: w.x, y: w.y, z: w.z, c: [0.9, 0.6, 1.5], s: 1.5 + Math.sin(t * 3) * 0.25 }); }
    }
    for (let i = libres.length - 1; i >= 0; i--) if (Math.hypot(libres[i].x - JOUEUR.x, libres[i].z - JOUEUR.z) > 90) libres.splice(i, 1);
    for (const b of libres) o.bonbons.push(b);
    for (const sp of ENT.spectres) if (sp.actif) o.lueurs.push({ x: sp.x, y: sp.y + 1.2, z: sp.z, c: [0.25 * sp.alpha, 0.35 * sp.alpha, 0.45 * sp.alpha], s: 4 });
    if (eclatFlash > 0) o.lueurs.push({ x: JOUEUR.x, y: JOUEUR.y + 1.3, z: JOUEUR.z, c: [3 * eclatFlash, 3 * eclatFlash, 3.5 * eclatFlash], s: 9 * (1.4 - eclatFlash) + 2 });
    return o;
  }
  function gagner(n) { const s = j(); s.bonbons = Math.min(1e12, s.bonbons + n); }
  function ramasser(o) {
    const J = JOUEUR, s = j(), mag = 1.4 + s.niv.aimant * 0.9;
    for (const b of o.bonbons) {
      const d = Math.hypot(b.x - J.x, b.z - J.z, (b.y - J.y - 0.9) * 0.6);
      if (d < 0.95) {
        if (b.libre) libres.splice(libres.indexOf(b), 1); else bonbonsPris.set(b.cle, t);
        const v = b.or ? 12 : 1; gagner(v); s.stats.ramasses += 1;
        combo = t - comboT < 1.2 ? combo + 1 : 0; comboT = t; snd('bonbon', { combo: Math.min(10, combo) });
        progresQuete('bonbons', 1); if (b.or) toast('Bonbon doré : +12 !', 'save');
      } else if (d < mag && !b.libre) { // aimant : le bonbon vient à toi (on le marque comme libre pour l'animer)
        bonbonsPris.set(b.cle, t); libres.push({ x: b.x, y: b.y, z: b.z, or: b.or, ph: b.ph, libre: true, vole: true });
      }
    }
    for (const b of libres) { if (!b.vole) continue; const dx = J.x - b.x, dy = J.y + 0.9 - b.y, dz = J.z - b.z, d = Math.hypot(dx, dy, dz); const v = Math.min(d, 0.3 + 8 * (1 / 60)); b.x += dx / d * v; b.y += dy / d * v; b.z += dz / d * v; }
    for (const c of o.cadeaux) {
      if (Math.hypot(c.x - J.x, c.z - J.z) < 1.3 && Math.abs(c.y - J.y) < 2) {
        if (s.sac >= JEU_capacite()) { if (t - dernMsgSac > 6) { dernMsgSac = t; toast('Ton sac est plein (' + s.sac + '/' + JEU_capacite() + ') : livre d’abord un cadeau, ou agrandis ton Sac à l’Atelier.', 'warn'); } continue; }
        const k = MONDE.cle(c.P.cx, c.P.cz); (s.cadeauxPris[k] = s.cadeauxPris[k] || []).push(c.id); s.sac++;
        snd('cadeau'); toast('Cadeau trouvé ! (' + s.sac + '/' + JEU_capacite() + ') Cherche une porte à couronne verte.', 'save');
      }
    }
    for (const sp of o.spots) if (Math.hypot(sp.x - J.x, sp.z - J.z) < 1.7 && Math.abs(sp.y - J.y - 1) < 2.2) prendreSpot(sp);
  }
  function prendreSpot(sp) {
    const s = j(), type = sp.P.rep; s.spotsPris[sp.k] = 1;
    const c = TXT.curiosites.find(c => c.repere === type && !s.curiosites[c.id]);
    if (c) {
      s.curiosites[c.id] = 1; gagner(50); snd('curiosite'); progresQuete('curiosite', 1);
      modal('Curiosité trouvée !', '<div class="grand">' + esc(c.nom) + '</div><div>' + esc(c.desc) + '</div><div class="log">+50 bonbons · ' + TXT.curiosites.filter(x => x.repere === type && s.curiosites[x.id]).length + '/4 pour ce repère</div>', [['Garder précieusement']], true);
      const n = TXT.curiosites.filter(x => x.repere === type && s.curiosites[x.id]).length;
      if (n >= 4 && !s.etoiles[type]) {
        s.etoiles[type] = 1; gagner(150);
        const i = MONDE.REP_TYPES.indexOf(type), nb = Object.keys(s.etoiles).length;
        setTimeout(() => snd('etoile'), 900);
        modal('★ ' + TXT.etoiles[i] + ' ★', '<div>Les 4 curiosités de « ' + esc(TXT.reperes[type].nom) + ' » ont réveillé une Étoile d’ombre.</div><div class="grand">' + nb + ' / 12</div><div class="log">+150 bonbons</div>' + (nb >= 12 ? '<div class="grand">Les 12 Étoiles brillent ensemble !</div>' : ''), [['Merveilleux']], true);
        if (nb >= 12 && !s.fini) { s.fini = true; ev.aurore = true; ev.auroreFin = t + 600; setTimeout(() => modal('L’Aurore éternelle', '<div>Les douze Étoiles d’ombre montent au ciel et l’aurore se lève sur Noëlombre, sans jamais finir la nuit. Les spectres fredonnent. Tu es chez toi.</div><div class="log">Tu as fini le grand but du jeu ! La ville reste infinie : continue d’explorer, de livrer et de collectionner.</div>', [['Continuer la nuit']], true), 1500); }
      }
    } else { gagner(30); snd('quete'); toast('Un trésor de bonbons dormait ici : +30.', 'save'); }
    save(false);
  }
  // ---------- actions (bouton contextuel) ----------
  function chercherAction(o) {
    const J = JOUEUR, s = j();
    for (const r of o.relais) if (!r.lit && Math.hypot(r.x - J.x, r.z - J.z) < 2.6) return { txt: 'Allumer la lanterne', f: () => allumer(r) };
    if (s.sac > 0) for (const p of o.portes) if (Math.hypot(p.x - J.x, p.z - J.z) < 2.3) return { txt: 'Livrer le cadeau', f: () => livrer(p) };
    const C = MONDE.C, P = MONDE.plan(Math.floor(J.x / C), Math.floor(J.z / C));
    if (P.rep === 'puits' && Math.hypot(P.X0 + C / 2 - J.x, P.Z0 + C / 2 - J.z) < 3.2) return { txt: 'Faire un vœu (10 🍬)', f: voeu };
    if (P.rep === 'observatoire' && Math.hypot(P.X0 + C / 2 - J.x, P.Z0 + C / 2 + 4.6 - J.z) < 3) return { txt: 'Regarder la lune', f: lunette };
    return null;
  }
  function allumer(r) {
    const s = j(); s.relais[r.k] = 1; s.dernierRelais = r.k; s.chaleur = 100; snd('lanterne'); progresQuete('lanternes', 1);
    HUD.flash('rgba(255,190,110,.35)', 900); toast('Lanterne allumée : partie sauvegardée ici.', 'save'); tLum = 0; save(false);
  }
  function livrer(p) {
    const s = j(), k = MONDE.cle(p.P.cx, p.P.cz); (s.livrees[k] = s.livrees[k] || []).push(p.m.id); s.sac--; s.stats.livraisons++;
    const rang = RANGS_SEUILS.filter(x => s.stats.livraisons >= x).length - 1, gain = 20 + rang * 5; gagner(gain);
    const nom = TXT.habitants.prenoms[(p.m.id * 7 + Math.abs(p.P.cx * 13 + p.P.cz * 5)) % TXT.habitants.prenoms.length], mot = TXT.habitants.lettres[(p.m.id + Math.abs(p.P.cx + p.P.cz)) % TXT.habitants.lettres.length];
    snd('livraison'); progresQuete('livrer', 1); HUD.flash('rgba(120,255,160,.25)', 800);
    toast(nom + ' : « ' + mot + ' » (+' + gain + ' 🍬)', 'save');
    const avant = TXT.rangs[RANGS_SEUILS.filter(x => s.stats.livraisons - 1 >= x).length - 1];
    if (JEU_rang() !== avant) setTimeout(() => HUD.banniere('Nouveau rang', JEU_rang(), 5000), 600);
    save(false);
  }
  function voeu() {
    const s = j();
    if (!god() && s.bonbons < 10) { snd('refus'); toast('Il faut 10 bonbons pour un vœu.', 'warn'); return; }
    if (!god()) s.bonbons -= 10; s.stats.voeux++; snd('boite_a_musique');
    const r = Math.random();
    if (r < 0.42) { gagner(28); toast('Le puits rend ton vœu… avec intérêts : +28 bonbons.', 'save'); }
    else if (r < 0.6 && s.sac < JEU_capacite()) { s.sac++; snd('cadeau'); toast('Un cadeau remonte du puits, tout sec ! Trouve-lui une porte.', 'save'); }
    else if (r < 0.74) { lancerAurore(120); toast('Le puits soupire… et le ciel se met à danser.', 'save'); }
    else if (r < 0.86) { pluieDoree(6); toast('Une pluie de bonbons dorés !', 'save'); }
    else if (r < 0.93) { s.chaleur = 100; toast('Une chaleur de soupe aux pois te remplit. Froid oublié.', 'save'); }
    else toast('« Merci, ton vœu est bien noté », répond l’écho, très poli.', '');
  }
  function lunette() {
    if (t - lunetteT < 150) { toast('La lune fait la sieste derrière un nuage. Reviens tantôt.', ''); return; }
    lunetteT = t; snd('decouverte'); lancerAurore(150); toast('Dans le télescope, la lune te fait un clin d’œil. Une aurore se lève !', 'save');
  }
  function pluieDoree(n) { for (let i = 0; i < n; i++) { const a = Math.random() * 6.28, r = 2 + Math.random() * 4, x = JOUEUR.x + Math.cos(a) * r, z = JOUEUR.z + Math.sin(a) * r; libres.push({ x, y: MONDE.sol(x, z) + 0.7, z, or: true, ph: i, libre: true }); } }
  function lancerAurore(sec) { if (!ev.aurore) j().stats.aurores++; ev.aurore = true; ev.auroreFin = Math.max(ev.auroreFin, t + sec); }

  // ---------- quêtes ----------
  const TYPESQ = ['bonbons', 'livrer', 'lanternes', 'spectres', 'distance', 'repere', 'quartier', 'curiosite'];
  function nouvelleQuete() {
    const s = j(), k = Math.min(12, Math.floor(s.quetesFaites / 3)), pris = s.quetes.map(q => q.type);
    const dispo = TYPESQ.filter(x => pris.indexOf(x) < 0); const type = dispo[Math.floor(Math.random() * dispo.length)];
    const q = { type, prog: 0, var: Math.random() < 0.5 };
    if (type === 'bonbons') q.n = 25 + 10 * k; else if (type === 'livrer') q.n = Math.min(5, 1 + Math.floor(k / 2)); else if (type === 'lanternes') q.n = Math.min(4, 1 + Math.floor(k / 3));
    else if (type === 'spectres') q.n = Math.min(8, 2 + Math.floor(k / 2)); else if (type === 'distance') q.n = Math.min(1500, 300 + 100 * k); else q.n = 1;
    if (type === 'quartier') { const ici = MONDE.quartier(Math.floor(JOUEUR.x / MONDE.C), Math.floor(JOUEUR.z / MONDE.C)); const ch = MONDE.QUARTIERS.filter(x => x !== ici); q.lieu = ch[Math.floor(Math.random() * ch.length)]; }
    q.rec = Math.round((40 + 12 * k) * ({ bonbons: 0.8, livrer: 1.4, lanternes: 1.1, spectres: 1.2, distance: 1, repere: 1.5, quartier: 1.3, curiosite: 1.6 }[type]));
    s.quetes.push(q);
  }
  function progresQuete(type, n, lieu) {
    const s = j();
    for (const q of s.quetes) {
      if (q.type !== type || q.prog >= q.n) continue;
      if (type === 'quartier' && lieu !== q.lieu) continue;
      q.prog += n;
      if (q.prog >= q.n) {
        gagner(q.rec); s.quetesFaites++; snd('quete');
        HUD.banniere('Vœu exaucé !', JEU_texteQuete(q) + ' · +' + q.rec + ' 🍬', 4500);
        setTimeout(() => { const i = s.quetes.indexOf(q); if (i >= 0) { s.quetes.splice(i, 1); nouvelleQuete(); } }, 1500);
      }
    }
  }
  function verifierSucces() {
    const s = j();
    for (const x of SUCCES) if (!s.succes[x.id] && (!god() || x.id === 'premierPas') && x.test(s)) { s.succes[x.id] = 1; gagner(25); snd('quete'); toast('Succès : ' + x.nom + ' (+25 🍬)', 'save'); }
  }

  // ---------- spectres ----------
  function majSpectres(dt) {
    const J = JOUEUR, s = j(), C = MONDE.C, q = MONDE.quartier(Math.floor(J.x / C), Math.floor(J.z / C));
    let maxS = { cimetiere: 5, sapins: 3, lac: 3, citrouilles: 2, foire: 2, bourg: 2 }[q] + (ev.tempete ? 1 : 0) + Math.min(2, Math.floor(s.stats.temps / 1800));
    if (ev.aurore) maxS = 0;
    tSpawn -= dt;
    const actifs = ENT.spectres.filter(x => x.actif).length;
    if (tSpawn <= 0 && actifs < maxS && prete) {
      tSpawn = 2.5 + Math.random() * 3;
      for (let essai = 0; essai < 6; essai++) {
        const a = Math.random() * 6.28, r = 22 + Math.random() * 18, x = J.x + Math.cos(a) * r, z = J.z + Math.sin(a) * r;
        if (lumiereEn(x, z) > 0.05 || MONDE.surRoute(x, z) && q === 'bourg' && Math.random() < 0.5) continue;
        const sp = ENT.spectres.find(x2 => !x2.actif); if (!sp) break;
        Object.assign(sp, { actif: true, x, z, y: MONDE.sol(x, z), vx: 0, vz: 0, t: 0, fuite: 0, alpha: 0, ax: x, az: z, vie: 0 });
        sp.g.visible = true; break;
      }
    }
    let proche = 99, carte = [];
    for (const sp of ENT.spectres) {
      if (!sp.actif) continue;
      sp.t += dt; const dx = J.x - sp.x, dz = J.z - sp.z, d = Math.hypot(dx, dz);
      const lum = lumiereEn(sp.x, sp.z), lumJ = lumiereEn(J.x, J.z);
      let tx = 0, tz = 0, v = 0;
      if (sp.fuite > 0) { sp.fuite -= dt; tx = -dx / d; tz = -dz / d; v = 6; sp.alpha -= dt * (sp.dissipe ? 1.4 : 0.4); if (sp.alpha <= 0 || sp.fuite <= 0 && sp.dissipe) { sp.actif = false; sp.g.visible = false; sp.dissipe = false; continue; } }
      else {
        sp.alpha = Math.min(1, sp.alpha + dt * 0.6);
        if (lum > 0.25) { // la lumière les repousse
          let bx = 0, bz = 0; for (const l of lumProches) { if (l.chaleur <= 0 && !l.relais) continue; const ld = Math.hypot(sp.x - l.x, sp.z - l.z); if (ld < l.r) { bx += (sp.x - l.x) / ld; bz += (sp.z - l.z) / ld; } }
          const bl = Math.hypot(bx, bz) || 1; tx = bx / bl; tz = bz / bl; v = 2.4;
        } else if (d < 17 && lumJ < 0.35) { tx = dx / d; tz = dz / d; v = 2.2 + Math.min(1.2, s.stats.temps / 3600 * 0.6); }
        else { const a = Math.sin(sp.t * 0.3 + sp.ax) * 3; tx = Math.cos(a); tz = Math.sin(a); v = 0.6; }
        if (d > 70) { sp.actif = false; sp.g.visible = false; continue; }
        if (d < 1.15 && J.y - sp.y < 2.2) {
          if (!god()) s.chaleur -= 22;
          snd('toucher_spectre'); HUD.flash('rgba(160,210,255,.45)', 900);
          JOUEUR.vx += dx / d * 7; JOUEUR.vz += dz / d * 7; sp.fuite = 1.6;
          if (!god()) toast('Brrr ! Un spectre t’a frôlé (−22 chaleur). Utilise l’Éclat ✦ !', 'warn');
        }
      }
      sp.vx += (tx * v - sp.vx) * Math.min(1, dt * 2); sp.vz += (tz * v - sp.vz) * Math.min(1, dt * 2);
      sp.x += sp.vx * dt; sp.z += sp.vz * dt; sp.y = MONDE.sol(sp.x, sp.z) + 0.25 + Math.sin(sp.t * 1.7) * 0.18;
      sp.g.position.set(sp.x, sp.y, sp.z); sp.g.rotation.y = Math.atan2(dx, dz);
      sp.m.material.uniforms.uAlpha.value = Math.max(0, sp.alpha);
      sp.g.children.forEach((c, i) => { if (i > 0) c.visible = sp.alpha > 0.3; });
      if (sp.actif) { proche = Math.min(proche, d); if (d < 60) carte.push({ x: sp.x, z: sp.z }); }
    }
    return { proche, carte };
  }
  function eclat() {
    const s = j(), cd = 14 - s.niv.eclat * 1.4;
    if (eclatT < cd && !god()) { snd('refus'); return; }
    eclatT = 0; eclatFlash = 1; snd('eclat'); HUD.flash('rgba(255,255,240,.55)', 700);
    const R2 = 7 + s.niv.eclat * 1.2; let n = 0;
    for (const sp of ENT.spectres) if (sp.actif && !sp.dissipe && Math.hypot(sp.x - JOUEUR.x, sp.z - JOUEUR.z) < R2) {
      sp.fuite = 2; sp.dissipe = true; n++; s.stats.spectres++;
      for (let i = 0; i < 3; i++) libres.push({ x: sp.x + (Math.random() - 0.5) * 1.5, y: MONDE.sol(sp.x, sp.z) + 0.7, z: sp.z + (Math.random() - 0.5) * 1.5, or: false, ph: i, libre: true });
    }
    if (n) { snd('spectre_fuit'); progresQuete('spectres', n); }
  }

  // ---------- découverte : quartiers, repères, exploration ----------
  function majDecouvertes() {
    const s = j(), C = MONDE.C, cx = Math.floor(JOUEUR.x / C), cz = Math.floor(JOUEUR.z / C), k = MONDE.cle(cx, cz);
    if (k !== dernierCh) {
      dernierCh = k;
      for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) s.explores[MONDE.cle(cx + dx, cz + dz)] = 1;
      const q = MONDE.quartier(cx, cz);
      if (q !== dernierQ) {
        const nouveau = !s.quartiersVus[q]; s.quartiersVus[q] = 1;
        if (dernierQ) HUD.banniere(TXT.quartiers[q].nom, TXT.quartiers[q].sous, nouveau ? 6000 : 3500);
        dernierQ = q; progresQuete('quartier', 1, q);
        try { AUDIO.musique(q); } catch (e) { }
      }
    }
    const P = MONDE.plan(cx, cz);
    if (P.rep && !s.reperes[k] && Math.hypot(P.X0 + C / 2 - JOUEUR.x, P.Z0 + C / 2 - JOUEUR.z) < 17) {
      s.reperes[k] = P.rep; gagner(30); snd('decouverte'); progresQuete('repere', 1);
      const nT = Object.values(s.reperes).filter(x => x === P.rep).length;
      HUD.banniere(TXT.reperes[P.rep].nom, TXT.reperes[P.rep].desc, 8000);
      toast('Nouveau repère (+30 🍬). Cherche la curiosité qui brille près d’ici !', 'save');
      save(false);
      if (nT === 1 && Object.keys(s.reperes).length === 1) setTimeout(() => toast('Astuce : chaque repère cache une curiosité (cristal violet). 4 curiosités d’un même type = une Étoile d’ombre.', ''), 4000);
    }
    if (P.rep === 'colline' && JOUEUR.y - MONDE.sol(P.X0 + 1, P.Z0 + 1) > 11 && !P._sommet) { P._sommet = true; s.stats.sommets++; }
    // passer près d'une lanterne allumée = nouveau point de retour
    if (P.relais && s.relais[P.relais.id] && Math.hypot(P.X0 - JOUEUR.x, P.Z0 - JOUEUR.z) < 4 && s.dernierRelais !== P.relais.id) s.dernierRelais = P.relais.id;
  }
  function boussole() {
    const s = j(); if (s.niv.boussole < 1) return null;
    const C = MONDE.C, cx = Math.floor(JOUEUR.x / C), cz = Math.floor(JOUEUR.z / C), rr = s.niv.boussole >= 2 ? 12 : 7;
    let best = null, bd = 1e9;
    for (let dz = -rr; dz <= rr; dz++) for (let dx = -rr; dx <= rr; dx++) {
      const x = cx + dx, z = cz + dz, rep = MONDE.repere(x, z); if (!rep || s.reperes[MONDE.cle(x, z)]) continue;
      const d = dx * dx + dz * dz; if (d < bd) { bd = d; best = { x: x * C + C / 2, z: z * C + C / 2 }; }
    }
    if (!best) return null;
    const a = Math.atan2(best.x - JOUEUR.x, -(best.z - JOUEUR.z)); // angle depuis le nord
    return a + JOUEUR.yaw; // relatif au regard (0 = devant)
  }
  // ---------- froid ----------
  function majFroid(dt) {
    const s = j(); let gain = 0, feu = 0;
    for (const l of lumProches) { if (l.chaleur <= 0) continue; const R0 = l.r * 0.55; const d = Math.hypot(l.x - JOUEUR.x, l.z - JOUEUR.z); if (d < R0) gain = Math.max(gain, l.chaleur * (1 - d / R0) * 12); if (l.feu || l.relais) feu = Math.max(feu, 1 - d / (l.r * 0.6)); }
    const perte = (0.95 * (1 - s.niv.echarpe * 0.11) * (1 - s.niv.lanterne * 0.04)) * (ev.tempete ? 1.8 : 1) * (JOUEUR.vitesse > 6 ? 0.85 : 1);
    if (!god()) s.chaleur = clamp(s.chaleur - perte * dt + gain * dt, 0, 100); else s.chaleur = 100;
    if (s.chaleur <= 0 && !evanoui) evanouir();
    return feu;
  }
  function evanouir() {
    const s = j(); evanoui = t; s.stats.evanouis++; snd('evanouir');
    const f = document.getElementById('flash'); f.style.transition = 'opacity 1.4s'; f.style.background = 'rgba(200,225,255,1)'; f.style.opacity = '1';
    setTimeout(() => {
      const perte = Math.floor(s.bonbons * 0.2); s.bonbons -= perte;
      teleporter(s.dernierRelais); s.chaleur = 75; snd('reveil');
      f.style.transition = 'opacity 2.2s'; f.style.opacity = '0'; evanoui = 0;
      toast('Tu t’es évanoui de froid… Tu te réveilles près de ta dernière lanterne' + (perte ? ' (−' + perte + ' bonbons tombés dans la neige).' : '.'), 'warn');
      save(false);
    }, 1500);
  }
  function teleporter(k) {
    const [ix, iz] = String(k || '0,0').split(',').map(Number), C = MONDE.C;
    const x = ix * C + 2.4, z = iz * C + 2.4; JOUEUR.x = x; JOUEUR.z = z; JOUEUR.y = MONDE.sol(x, z) + 0.1; JOUEUR.vx = JOUEUR.vy = JOUEUR.vz = 0;
    dernierCh = null; tLum = 0; libres.length = 0; for (const sp of ENT.spectres) { sp.actif = false; sp.g.visible = false; }
  }
  JEU_voyager = function (k) {
    const s = j(), prix = JEU_prixVoyage();
    if (!god() && s.bonbons < prix) { snd('refus'); toast('Il faut ' + prix + ' bonbons pour voyager.', 'warn'); return; }
    if (!god()) s.bonbons -= prix;
    snd('voyage'); HUD.flash('rgba(255,200,140,.8)', 1200); teleporter(k); s.dernierRelais = k; majParcelles(200); save(false);
  };
  JEU_apresAchat = function (k) { if (k === 'lanterne') majLanterne(); };
  function majLanterne() { if (!lanterneL) return; const n = j().niv.lanterne; lanterneL.distance = 10 + n * 2.2; lanterneL.intensity = 1.6 + n * 0.4; }

  // ---------- événements ----------
  function majEvenements(dt) {
    const s = j();
    ev.prochTempete -= dt; ev.prochFilante -= dt; ev.prochMinuit -= dt;
    if (!ev.tempete && ev.prochTempete <= 0) { ev.tempete = true; ev.tempeteFin = t + 60 + Math.random() * 40; toast('Une tempête de neige se lève ! Reste près des lumières.', 'warn'); }
    if (ev.tempete && t > ev.tempeteFin) { ev.tempete = false; ev.prochTempete = 480 + Math.random() * 420; toast('La tempête se calme.', ''); }
    if (ev.aurore && t > ev.auroreFin && !s.fini) ev.aurore = false;
    if (ev.prochFilante <= 0) { ev.prochFilante = 35 + Math.random() * 70; CIEL.filante(t); }
    // l'heure ronde (vraie heure) : la tour de l'horloge sonne
    const d = new Date(), h = d.getHours();
    if (ev.heure !== h && d.getMinutes() === 0) { if (ev.heure >= 0) snd('carillon', { coups: h % 12 || 12 }); ev.heure = h; } else if (ev.heure < 0) ev.heure = d.getMinutes() === 0 ? h : -2;
    // traîneau de minuit (toutes les ~10 à 15 min de jeu)
    if (ev.prochMinuit <= 0 && !ev.traineau) {
      ev.prochMinuit = 600 + Math.random() * 300; snd('carillon', { coups: 12 });
      setTimeout(() => lancerTraineau(), 5000);
    }
    if (ev.traineau) {
      const tr = ev.traineau; tr.k += dt / 14;
      const a = tr.a0 + tr.k * 1.6, r = 75;
      tr.g.position.set(JOUEUR.x + Math.cos(a) * r, JOUEUR.y + 30 + Math.sin(tr.k * 3.14) * 8, JOUEUR.z + Math.sin(a) * r);
      tr.g.rotation.y = -a; tr.g.children.forEach((c, i) => { if (i > 1) c.position.y = Math.sin(t * 8 + i) * 0.25; });
      if (tr.k > 0.4 && !tr.pluie) { tr.pluie = true; pluieDoree(8); s.stats.traineaux++; toast('Le traîneau de minuit est passé ! Des bonbons dorés tombent du ciel.', 'save'); }
      if (tr.k >= 1) { scene.remove(tr.g); ev.traineau = null; }
    }
  }
  function lancerTraineau() {
    if (!scene) return;
    const g = new THREE.Group(), mat = new THREE.MeshBasicMaterial({ color: 0x06070c, fog: false });
    const b = new THREE.Mesh(new THREE.BoxGeometry(3, 1, 1.4), mat); g.add(b);
    const pat = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.08, 4, 16, Math.PI), mat); pat.rotation.z = Math.PI; pat.position.y = -0.4; g.add(pat);
    for (let i = 0; i < 4; i++) { const r = new THREE.Group(); const c2 = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.6, 0.5), mat); r.add(c2);
      const tete = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.8, 0.3), mat); tete.position.set(0.9, 0.5, 0); r.add(tete); for (const s2 of [-0.12, 0.12]) {
       const bois = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.7, 4), mat); bois.position.set(0.95, 1.1, s2); bois.rotation.z = -0.4; r.add(bois); } r.position.set(3 + i * 2.1, 0.3, (i % 2) * 0.8 - 0.4); g.add(r); }
    const nez = new THREE.Mesh(new THREE.SphereGeometry(0.12, 6, 4), new THREE.MeshBasicMaterial({ color: new THREE.Color(6, 0.6, 0.4), toneMapped: false, fog: false })); nez.position.set(3 + 3 * 2.1 + 1.1, 0.75, 0.4); g.add(nez);
    g.scale.setScalar(1.6); scene.add(g);
    ev.traineau = { g, k: 0, a0: Math.atan2(CIEL.dirLune.z, CIEL.dirLune.x) - 0.8 };
    snd('traineau');
  }

  // ---------- options (réglages) ----------
  function htmlOptions() {
    const r = j().reg, q = r.qualite === 'auto' ? 'auto' : String(r.qualite);
    const b = (k, v, lib, act) => '<button class="reg' + (act ? ' on' : '') + '" onclick="ui_reglage(\'' + k + '\',\'' + v + '\')">' + lib + '</button>';
    return '<div class="sect">Graphismes</div><div class="regs">' + b('qualite', 'auto', 'Auto', q === 'auto') + b('qualite', '0', 'Bas', q === '0') + b('qualite', '1', 'Moyen', q === '1') + b('qualite', '2', 'Haut', q === '2') + b('qualite', '3', 'Ultra', q === '3') + '</div>' +
      '<div class="log">Auto = ' + ['Bas', 'Moyen', 'Haut', 'Ultra'][qualiteAuto()] + ' sur cet appareil. Si le jeu saccade, choisis Bas.</div>' +
      '<div class="sect">Son</div><div class="regs">' + b('musique', r.musique ? '0' : '1', 'Musique : ' + (r.musique ? 'oui' : 'non'), r.musique) + b('mvol', '-', 'Musique −', false) + b('mvol', '+', 'Musique +', false) + '</div>' +
      '<div class="regs">' + b('sons', r.sons ? '0' : '1', 'Bruitages : ' + (r.sons ? 'oui' : 'non'), r.sons) + b('svol', '-', 'Bruitages −', false) + b('svol', '+', 'Bruitages +', false) + '</div>' +
      '<div class="log">Volume musique ' + Math.round(r.mvol * 100) + ' % · bruitages ' + Math.round(r.svol * 100) + ' %</div>' +
      '<div class="sect">Regard</div><div class="regs">' + b('sens', '-', 'Sensibilité −', false) + b('sens', '+', 'Sensibilité +', false) + b('inverser', r.inverser ? '0' : '1', 'Inverser haut/bas : ' + (r.inverser ? 'oui' : 'non'), r.inverser) + '</div>' +
      '<div class="log">Sensibilité ' + r.sens.toFixed(1).replace('.', ',') + '</div>' +
      '<div class="sect">Aide</div><div class="log">Pouce gauche : marcher (pousse au bout pour courir). Glisse à droite : regarder. ⤒ sauter, ✦ éclat qui chasse les spectres. Les lanternes-relais allumées sauvegardent ta partie.</div>';
  }
  window.ui_reglage = function (k, v) {
    const r = j().reg;
    if (k === 'qualite') { r.qualite = v === 'auto' ? 'auto' : +v; appliquerQualite(false); creerComposer(); redimensionner(); }
    else if (k === 'musique' || k === 'sons' || k === 'inverser') r[k] = v === '1';
    else if (k === 'mvol' || k === 'svol') r[k] = clamp(Math.round((r[k] + (v === '+' ? 0.1 : -0.1)) * 10) / 10, 0, 1);
    else if (k === 'sens') r.sens = clamp(Math.round((r.sens + (v === '+' ? 0.2 : -0.2)) * 10) / 10, 0.4, 3);
    try { AUDIO.appliquerReglages(); } catch (e) { }
    snd('menu'); save(false); closeModal(); openOptions();
  };

  function intro() {
    const I = TXT.intro;
    modal(I.titre, '<div class="grand">' + esc(I.sous) + '</div><div>' + esc(I.histoire) + '</div><div class="sect">Comment jouer</div>' +
      '<div class="log">• Pouce gauche : marcher (au bout = courir). Glisse ailleurs pour regarder.<br>• ⤒ sauter · ✦ Éclat : chasse les spectres.<br>• Le 🔥 baisse dans le noir : reste près des lumières.' +
      '<br>• Ramasse les 🎁 et livre-les aux portes à couronne verte.<br>• Allume les lanternes-relais : elles sauvegardent ta partie.<br>• 🛠️ Atelier · 📜 Quêtes · 📖 Album · touche la mini-carte pour la carte.</div>',[['Entrer dans la nuit', () => { j().intro = true; save(false); try { AUDIO.musique('bourg'); } catch (e) { } }]]);
  }

  // ======================= objet JEU (contrat de la coquille) =======================
  let tObj = null, tQ = 0, modalVu = false;
  // si l'appareil peine (moins de 24 images/s en moyenne), on baisse la qualité automatiquement (mode Auto seulement)
  const perf = { n: 0, t0: 0, fait: false };
  function surveillerFluidite() {
    if (perf.fait || !prete || MODAL_OPEN || document.hidden) { perf.t0 = 0; perf.n = 0; return; }
    const now = performance.now(); if (!perf.t0) { perf.t0 = now; perf.n = 0; return; }
    perf.n++;
    if (now - perf.t0 > 6000) {
      const fps = perf.n * 1000 / (now - perf.t0); perf.t0 = 0; perf.n = 0;
      if (j().reg.qualite === 'auto' && fps < 24 && Q > 0) { perf.bas = Q - 1; j().reg.qualite = 'auto'; QP_FORCE = Q - 1; appliquerQualite(false); creerComposer(); redimensionner(); toast('Graphismes réduits pour que ce soit plus fluide (Options › Graphismes).', ''); }
      else if (fps >= 24) perf.fait = true;
    }
  }
  return {
    titre: 'Noëlombre', id: 'noelombre', prefixe: 'NOEL1',
    modeDieu: 'jamais froid, aucun spectre ne te touche, bonbons infinis, voyages gratuits',
    etatInitial, valider,
    options: () => htmlOptions(),
    dev: () => [
      ['+1 000 bonbons', () => gagner(1000)],
      ['Vitesse ×3 : ' + (G_DEV.vite ? 'oui' : 'non'), () => { G_DEV.vite = !G_DEV.vite; }],
      ['Aller au repère inconnu le plus proche', () => { const C = MONDE.C, cx = Math.floor(JOUEUR.x / C), cz = Math.floor(JOUEUR.z / C); for (let r = 1; r < 30; r++)
         for (let dz = -r; dz <= r; dz++) for (let dx = -r; dx <= r; dx++) { if (Math.max(Math.abs(dx), Math.abs(dz)) !== r) continue; const x = cx + dx, z = cz + dz; if (MONDE.repere(x, z)
         && !j().reperes[MONDE.cle(x, z)]) { JOUEUR.x = x * C + C / 2; JOUEUR.z = z * C + 4; JOUEUR.y = MONDE.sol(JOUEUR.x, JOUEUR.z) + 1; dernierCh = null; closeModal(); return; } } }],
      ['Toutes les améliorations au max', () => { for (const k in AMEL) j().niv[k] = AMEL[k].max; majLanterne(); }],
      ['Donner une curiosité', () => { const c = TXT.curiosites.find(c => !j().curiosites[c.id]); if (c) { const P = { rep: c.repere }; prendreSpot({ P, k: 'dev' + Math.random() }); } }],
      ['Tempête de neige', () => { ev.prochTempete = 0; }], ['Aurore', () => lancerAurore(120)], ['Traîneau de minuit', () => { ev.prochMinuit = 0; }],
      ['Faire apparaître un spectre', () => { tSpawn = 0; }], ['S’évanouir (test)', () => { if (!god()) j().chaleur = 0; else toast('Désactive le mode Dieu pour tester.', 'warn'); }],
      ['Remplir le sac de cadeaux', () => { j().sac = JEU_capacite(); }],
    ],
    demarrer(zone) {
      HUD.creer(zone);
      if (!creerRendu(zone)) return;
      MONDE.graine = j().graine;
      Q = Qeff();
      TEX.creer(Q); MAT.creer();
      CIEL.creer(scene, renderer, Q);
      ENT.creer(scene);
      creerLanterne(); majLanterne();
      appliquerQualite(true); creerComposer(); redimensionner();
      CTRL.installer(document.getElementById('ctrl'), document.getElementById('stickBase'), document.getElementById('stickBtn'));
      const s = j(); JOUEUR.x = s.x; JOUEUR.z = s.z; JOUEUR.y = Math.max(s.y, MONDE.sol(s.x, s.z)); JOUEUR.yaw = s.yaw; JOUEUR.pitch = s.pitch;
      while (s.quetes.length < 3) nouvelleQuete();
      document.addEventListener('visibilitychange', () => { try { AUDIO.suspendre(document.hidden); } catch (e) { } if (document.hidden) CTRL.relacher(); });
      addEventListener('blur', () => CTRL.relacher());
      setTimeout(() => { prete = true; HUD.fin(); if (!s.intro) intro(); else { try { AUDIO.musique(MONDE.quartier(Math.floor(JOUEUR.x / MONDE.C), Math.floor(JOUEUR.z / MONDE.C))); } catch (e) { } HUD.banniere('Noëlombre', TXT.intro.sous, 4000); } }, 400);
      majParcelles(400);
    },
    recharger() {
      const s = j(); MONDE.graine = s.graine; MONDE.viderCaches();
      for (const [, o] of parcelles) { scene.remove(o.obj.groupe); o.obj.liberer(); } parcelles.clear();
      JOUEUR.x = s.x; JOUEUR.z = s.z; JOUEUR.y = MONDE.sol(s.x, s.z); JOUEUR.yaw = s.yaw; JOUEUR.pitch = s.pitch;
      dernierCh = null; dernierQ = null; bonbonsPris.clear(); libres.length = 0; while (s.quetes.length < 3) nouvelleQuete(); majLanterne(); majParcelles(300);
      if (!s.intro) intro();
    },
    redimensionner() { redimensionner(); },
    tick(dt) {
      if (!renderer) return;
      dt = Math.min(dt, 0.1); t += dt;
      const s = j(); s.stats.temps += dt;
      const inp = CTRL.lire(); inp.saut = CTRL.sautDemande; CTRL.sautDemande = false;
      if (evanoui) { inp.mx = inp.mz = 0; inp.saut = false; }
      const d = JOUEUR.majPhysique(dt, inp, s.niv, god());
      s.stats.distance += d; if (d > 0) progresQuete('distance', d);
      s.x = JOUEUR.x; s.y = JOUEUR.y; s.z = JOUEUR.z; s.yaw = JOUEUR.yaw; s.pitch = JOUEUR.pitch;
      majParcelles(prete ? 9 : 60);
      tLum -= dt; if (tLum <= 0) { tLum = 0.3; majLumieres(); }
      majDecouvertes();
      const feu = majFroid(dt);
      const spx = majSpectres(dt);
      eclatT += dt; eclatFlash = Math.max(0, eclatFlash - dt * 1.6);
      if (CTRL.eclatDemande) { CTRL.eclatDemande = false; eclat(); }
      tObj = listeObjets(); ramasser(tObj);
      actionCourante = chercherAction(tObj);
      if (CTRL.actionDemande) { CTRL.actionDemande = false; if (actionCourante) actionCourante.f(); }
      majEvenements(dt);
      tQ -= dt; if (tQ <= 0) { tQ = 1; verifierSucces(); }
      try { AUDIO.maj(dt, { marche: clamp(JOUEUR.vitesse / 5, 0, 1) * (JOUEUR.sol ? 1 : 0), surface: JOUEUR.surface, courir: JOUEUR.vitesse > 6, froid: god() ? 0 : 1 - s.chaleur / 100, spectre: clamp(1 - spx.proche / 14, 0, 1), feu, vent: ev.tempete ? 1 : 0.15, hauteur: Math.max(0, JOUEUR.y - MONDE.sol(JOUEUR.x + 30, JOUEUR.z)), enPause: MODAL_OPEN }); } catch (e) { }
      this._spx = spx; this._feu = feu;
    },
    rendu() {
      if (!renderer || !composer) return;
      const s = j();
      if (MODAL_OPEN) { if (!modalVu) { modalVu = true; CTRL.relacher(); } try { AUDIO.maj(0.016, { marche: 0, enPause: true }); } catch (e) { } } else modalVu = false;
      surveillerFluidite();
      JOUEUR.cameraVers(cam);
      MAT.U.uCentre.value.set(JOUEUR.x, JOUEUR.z); MAT.U.uTemps.value = t;
      // la bulle : brouillard qui s'éclaircit avec la Lanterne et en hauteur, s'épaissit pendant la tempête
      const haut = Math.max(0, JOUEUR.y - MONDE.sol(JOUEUR.x, JOUEUR.z) * 0 - 0) - 0;
      const hRel = clamp((JOUEUR.y - (MONDE.sol(JOUEUR.x + 40, JOUEUR.z) + MONDE.sol(JOUEUR.x - 40, JOUEUR.z)) / 2) / 14, 0, 1);
      const dens = 0.0215 * (1 - s.niv.lanterne * 0.045) * (1 - hRel * 0.4) * (1 + CIEL.U.uTempete.value * 0.9) * (Q === 0 ? 1.25 : 1);
      scene.fog.density += (dens - scene.fog.density) * 0.05;
      MAT.U.uCourbe.value = 0.0022;
      CIEL.maj(t, cam.position, JOUEUR, ev);
      appliquerLumieres();
      // lanterne à la main : balancement + flamme vivante + éclat
      if (lanterne) {
        const v = Math.min(1, JOUEUR.vitesse / 5);
        lanterne.position.set(LPOS.x + Math.sin(JOUEUR.bob * 0.5) * 0.015 * v, LPOS.y + Math.abs(Math.cos(JOUEUR.bob * 0.5)) * 0.02 * v, -0.62);
        lanterne.rotation.z = Math.sin(t * 1.3) * 0.04 + Math.sin(JOUEUR.bob * 0.5) * 0.08 * v;
        const fl = 0.85 + Math.sin(t * 17) * 0.06 + Math.sin(t * 7.3) * 0.08; lanterne.userData.flamme.scale.set(fl, 1.6 * fl, fl);
        lanterneL.intensity = (1.6 + s.niv.lanterne * 0.4) * fl * (1 + eclatFlash * 6);
      }
      // anime les repères proches
      for (const [, o] of parcelles) if (o.obj.anims.length && Math.hypot(o.P.X0 + 22 - JOUEUR.x, o.P.Z0 + 22 - JOUEUR.z) < 110) for (const a of o.obj.anims) a(t, 0.016);
      ENT.dessiner(t, tObj || { bonbons: [], cadeaux: [], spots: [], lueurs: [] });
      renderer.info.reset(); composer.render();
      // interface
      const q0 = s.quetes[0];
      HUD.maj({ action: actionCourante && !MODAL_OPEN ? actionCourante.txt : null, eclatPret: clamp(eclatT / (14 - s.niv.eclat * 1.4), 0, 1), quete: q0 ? '📜 ' + JEU_texteQuete(q0) + ' (' + fmt(Math.min(q0.prog, q0.n)) + '/' + fmt(q0.n) + ')' : '',
        fleche: boussole(), carteCadeaux: tObj && (s.niv.boussole >= 3 ? tObj.cadeaux : tObj.carteCadeaux), cartePortes: tObj && tObj.cartePortes, carteSpectres: this._spx ? this._spx.carte : [] });
      const C = MONDE.C, q = MONDE.quartier(Math.floor(JOUEUR.x / C), Math.floor(JOUEUR.z / C));
      const st = TXT.quartiers[q].nom + ' · ' + JEU_rang(); const el = $('#statut'); if (el.textContent !== st) el.textContent = st;
    },
    absence: () => '',
    _etat: () => ({ action: actionCourante && actionCourante.txt, relais: tObj && tObj.relais.map(r => r.k + (r.lit ? '*' : '') + '@' + Math.hypot(r.x - JOUEUR.x, r.z - JOUEUR.z).toFixed(1)) }),
    _tris: () => { const o = {}; scene.traverse(m => { if (m.isMesh && m.geometry.index) o[m.name || '?'] = (o[m.name || '?'] || 0) + m.geometry.index.count / 3; }); return o; },
    _info: () => ({ calls: renderer.info.render.calls, tris: renderer.info.render.triangles, parcelles: parcelles.size, geo: renderer.info.memory.geometries, prog: renderer.info.programs.length, Q }),
  };
})();
