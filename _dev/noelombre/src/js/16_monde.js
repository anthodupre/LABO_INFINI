/* ===================== LE MONDE : plan procédural infini (données pures, sans maillage) =====================
   La ville est une grille de PARCELLES de C × C mètres (un pâté entouré de demi-rues), que le rendu TORD ensuite
   (rues qui serpentent : voir MONDE.tordre et 13_materiaux.js). Chaque parcelle a un TYPE pris dans le registre REPERES :
   - les BLOCS (genre 'bloc') : pâtés ordinaires, tous différents ; un motif en « carré latin » garantit que deux
     parcelles voisines (fenêtre de plusieurs parcelles) n'ont jamais le même type ;
   - les MERVEILLES : grands lieux uniques, posés sur des SITES (≈ 1 parcelle sur 10). Leur type est TIRÉ D'UNE PIOCHE
     au moment où le promeneur s'en approche pour la première fois, puis mémorisé dans la sauvegarde : on ne recroise
     jamais la même merveille avant de les avoir toutes vues.
   MONDE.plan(cx, cz) renvoie tout ce qu'il faut pour construire la parcelle (maisons, lampes, obstacles, lumières). */
const MONDE = (() => {
  const C = 44, RUE = 3.6;
  const W = { C, RUE, graine: 1, essai: null, etat: null };
  const QUARTIERS = ['bourg', 'citrouilles', 'sapins', 'cimetiere', 'lac', 'foire'];
  const POIDS_Q = [3, 1.4, 1.5, 1.2, 1.2, 1.2];
  W.QUARTIERS = QUARTIERS;
  const g = k => (W.graine * 7919 + k) | 0;

  // ---- ambiance (palette de lumières) d'une parcelle : grandes taches de Voronoï ----
  const cacheQ = new Map();
  function pondereIdx(r) { let t = 0; for (const p of POIDS_Q) t += p; let x = r * t; for (let i = 0; i < POIDS_Q.length; i++) { x -= POIDS_Q[i]; if (x <= 0) return i; } return 0; }
  W.quartier = function (cx, cz) {
    const k = cx + ',' + cz; let q = cacheQ.get(k); if (q) return q;
    if (Math.abs(cx) <= 2 && Math.abs(cz) <= 2) return 'bourg'; // le départ est toujours dans le vieux bourg
    const sx = Math.floor(cx / 4), sz = Math.floor(cz / 4); let best = 1e9, bq = 'bourg';
    for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) {
      const X = sx + i, Z = sz + j, px = (X + 0.15 + 0.7 * NZ.h2(X, Z, g(1))) * 4, pz = (Z + 0.15 + 0.7 * NZ.h2(X, Z, g(2))) * 4;
      const d = (cx + 0.5 - px) ** 2 + (cz + 0.5 - pz) ** 2;
      if (d < best) { best = d; bq = QUARTIERS[pondereIdx(NZ.h2(X, Z, g(3)))]; }
    }
    if (cacheQ.size > 6000) cacheQ.clear();
    cacheQ.set(k, bq); return bq;
  };

  // ---- sites des merveilles ----
  W.site = function (cx, cz) {
    if (cx === 1 && cz === 0) return true;                 // la première, visible dès le départ
    if (Math.abs(cx) <= 1 && Math.abs(cz) <= 1) return false;
    const h = NZ.h2(cx, cz, g(5));
    if (h > 0.115) return false;
    for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) if ((i || j) && NZ.h2(cx + i, cz + j, g(5)) < h && !(Math.abs(cx + i) <= 1 && Math.abs(cz + j) <= 1)) return false;
    return true;
  };
  // ---- registre des types ----
  let blocs = null, mervs = null, latA = 1, latB = 2;
  function registre() {
    if (blocs) return;
    const tous = Object.keys(REPERES).sort();
    blocs = tous.filter(k => REPERES[k].genre === 'bloc'); mervs = tous.filter(k => REPERES[k].genre !== 'bloc');
    // mélange des blocs selon la graine, puis motif latin : (a·cx + b·cz) mod N sans répétition dans la plus grande fenêtre
    const r = NZ.rng(g(77)); for (let i = blocs.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); const t = blocs[i]; blocs[i] = blocs[j]; blocs[j] = t; }
    const N = blocs.length; let bestW = 0;
    for (let a = 1; a < N; a++) for (let b = 1; b < N; b++) {
      let w = 1; for (; w < 9; w++) { let ok = true; for (let dx = -w; dx <= w && ok; dx++) for (let dz = -w; dz <= w && ok; dz++) if ((dx || dz) && ((a * dx + b * dz) % N + N) % N === 0) ok = false; if (!ok) break; }
      if (w > bestW) { bestW = w; latA = a; latB = b; }
    }
  }
  W.merveilles = () => { registre(); return mervs.slice(); };
  W.blocs = () => { registre(); return blocs.slice(); };
  const cacheT = new Map();
  function tirer(cx, cz) { // tire la prochaine merveille de la pioche (jamais deux fois la même avant d'avoir tout vu)
    const e = W.etat, k = cx + ',' + cz;
    if (!e) return mervs[Math.floor(NZ.h2(cx, cz, g(6)) * mervs.length)];
    if (e.sites[k] && REPERES[e.sites[k]] && REPERES[e.sites[k]].genre !== 'bloc') return e.sites[k];
    let t;
    if (cx === 1 && cz === 0 && REPERES.horloge) t = 'horloge';
    else {
      e.pioche = (e.pioche || []).filter(x => REPERES[x] && REPERES[x].genre !== 'bloc');
      if (!e.pioche.length) {
        e.tours = (e.tours || 0) + 1; const r = NZ.rng(g(900 + e.tours)); const p = mervs.filter(x => !(e.tours === 1 && x === 'horloge'));
        for (let i = p.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); const u = p[i]; p[i] = p[j]; p[j] = u; }
        if (p.length > 1 && p[p.length - 1] === e.dernier) { const u = p[0]; p[0] = p[p.length - 1]; p[p.length - 1] = u; }
        e.pioche = p;
      }
      t = e.pioche.pop(); e.dernier = t;
    }
    e.sites[k] = t; return t;
  }
  W.typeDe = function (cx, cz) {
    const k = cx + ',' + cz; let t = cacheT.get(k); if (t) return t;
    registre();
    if (W.essai && W.essai.cx === cx && W.essai.cz === cz && REPERES[W.essai.type]) t = W.essai.type;
    else if (W.site(cx, cz) && mervs.length) t = tirer(cx, cz);
    else if (Math.abs(cx) <= 1 && Math.abs(cz) <= 1 && REPERES.cour) t = 'cour'; // autour du départ : de vraies rues de maisons
    else t = blocs[(((latA * cx + latB * cz) % blocs.length) + blocs.length) % blocs.length];
    if (cacheT.size > 4000) cacheT.clear();
    cacheT.set(k, t); return t;
  };
  W.relais = (ix, iz) => (ix === 0 && iz === 0) || NZ.h2(ix, iz, g(9)) < 0.2;
  W.cle = (cx, cz) => cx + ',' + cz;

  // ---- relief : collines douces + congères le long des rues ; chaque type peut le modifier (lac, colline…) ----
  function terrainBrut(x, z) { return (NZ.fbm(x / 150, z / 150, g(11), 3) - 0.5) * 13 + (NZ.fbm(x / 29, z / 29, g(12), 2) - 0.5) * 1.2; }
  W.terrainBrut = terrainBrut;
  function congere(x, z) {
    const lx = ((x % C) + C) % C, lz = ((z % C) + C) % C, d = Math.min(lx, C - lx, lz, C - lz) - (RUE + 0.55);
    if (d < -0.8 || d > 0.8) return 0; const k = 1 - Math.abs(d) / 0.8;
    return k * k * (3 - 2 * k) * 0.3 * NZ.vn(x * 0.35, z * 0.35, 21);
  }
  W.sol = function (x, z) {
    const cx = Math.floor(x / C), cz = Math.floor(z / C), R = REPERES[W.typeDe(cx, cz)], t = terrainBrut(x, z) + congere(x, z);
    return R && R.relief ? R.relief(x - cx * C, z - cz * C, t, terrainBrut(cx * C + C / 2, cz * C + C / 2)) : t;
  };
  W.surGlace = function (x, z) { const cx = Math.floor(x / C), cz = Math.floor(z / C), R = REPERES[W.typeDe(cx, cz)]; return !!(R && R.glace && R.glace(x - cx * C, z - cz * C)); };
  W.surRoute = function (x, z) { const lx = ((x % C) + C) % C, lz = ((z % C) + C) % C; return Math.min(lx, C - lx, lz, C - lz) < RUE; };

  // ---- torsion du monde (rendu seulement) : les rues droites de la grille deviennent des rues qui serpentent.
  //      Toute la logique (collisions, plan) reste dans la grille ; le shader et la caméra appliquent ce décalage. ----
  W.TORS = TORS;
  W.tordre = function (x, z, out) {
    const T = W.TORS;
    out.x = x + T[0] * Math.sin(z * T[1] + T[2]) + T[3] * Math.sin((x + z) * T[4] + T[5]);
    out.z = z + T[6] * Math.sin(x * T[7] + T[8]) + T[9] * Math.sin((x - z) * T[10] + T[11]);
    return out;
  };
  // jacobienne de la torsion en (x, z) : [dX/dx, dX/dz, dZ/dx, dZ/dz]
  W.jacob = function (x, z) {
    const T = W.TORS, a = T[3] * T[4] * Math.cos((x + z) * T[4] + T[5]), b = T[9] * T[10] * Math.cos((x - z) * T[10] + T[11]);
    return [1 + a, T[0] * T[1] * Math.cos(z * T[1] + T[2]) + a, T[6] * T[7] * Math.cos(x * T[7] + T[8]) + b, 1 - b];
  };

  // ---- palettes des ambiances ----
  const PAL = {
    bourg: { murs: [[0.55, 0.45, 0.62], [0.42, 0.56, 0.56], [0.66, 0.58, 0.46], [0.38, 0.42, 0.55], [0.62, 0.38, 0.38], [0.46, 0.52, 0.38], [0.5, 0.5, 0.52]], toits: [[0.36, 0.3, 0.42], [0.26, 0.31, 0.36], [0.42, 0.26, 0.26], [0.22, 0.24, 0.24]], guir: [[3, 0.45, 0.35], [0.45, 2.6, 0.55], [3, 2.1, 0.5], [0.55, 0.9, 3], [2.4, 0.55, 2.6]], fen: [2.4, 1.55, 0.75], bizarre: [[0.7, 2.2, 0.9], [1.6, 0.8, 2.4]], lampe: [3.2, 2.1, 1.0] },
    citrouilles: { murs: [[0.6, 0.48, 0.36], [0.5, 0.4, 0.34], [0.66, 0.6, 0.48], [0.44, 0.38, 0.44]], toits: [[0.35, 0.22, 0.16], [0.3, 0.26, 0.22]], guir: [[3.2, 1.3, 0.2], [2.2, 0.5, 2.6], [3, 2.2, 0.4]], fen: [2.6, 1.3, 0.45], bizarre: [[2.4, 0.6, 2.2]], lampe: [3.4, 1.7, 0.6] },
    sapins: { murs: [[0.5, 0.42, 0.34], [0.42, 0.36, 0.3], [0.56, 0.5, 0.44]], toits: [[0.25, 0.3, 0.26], [0.3, 0.25, 0.22]], guir: [[3, 2.4, 1.3], [3, 1.9, 0.8], [2.6, 2.6, 2.2]], fen: [2.5, 1.6, 0.8], bizarre: [[1.2, 2.4, 1.4]], lampe: [3.2, 2.2, 1.2] },
    cimetiere: { murs: [[0.45, 0.47, 0.5], [0.38, 0.4, 0.44], [0.5, 0.46, 0.5]], toits: [[0.22, 0.24, 0.28]], guir: [[0.5, 1.6, 3], [0.4, 2.8, 2.6], [1.6, 0.6, 3]], fen: [0.8, 2.4, 1.7], bizarre: [[2.4, 1.5, 0.7]], lampe: [1.2, 2.6, 2.6] },
    lac: { murs: [[0.5, 0.56, 0.62], [0.6, 0.62, 0.66], [0.46, 0.5, 0.6]], toits: [[0.3, 0.35, 0.42]], guir: [[2.4, 2.8, 3.2], [0.6, 1.4, 3.2], [1.4, 2.6, 3.2]], fen: [2.2, 1.7, 1.0], bizarre: [[1.0, 1.8, 3]], lampe: [2.6, 2.6, 3.0] },
    foire: { murs: [[0.62, 0.36, 0.36], [0.4, 0.5, 0.36], [0.62, 0.56, 0.4], [0.5, 0.4, 0.6]], toits: [[0.4, 0.2, 0.2], [0.2, 0.3, 0.2]], guir: [[3.2, 0.4, 0.3], [0.4, 2.8, 0.5], [3.2, 2.4, 0.4], [3, 3, 3]], fen: [2.5, 1.6, 0.7], bizarre: [[2.4, 0.6, 2.2]], lampe: [3.2, 2.0, 0.9] },
  };
  W.palette = function (q) {
    const p = PAL[q];
    return {
      murs: p.murs, toits: p.toits, guirlande: p.guir, lampe: p.lampe, boule: p.guir[0],
      fenetre: rng => { if (rng() < 0.06) return p.bizarre[Math.floor(rng() * p.bizarre.length)]; const k = 0.65 + rng() * 0.6; return [p.fen[0] * k, p.fen[1] * k, p.fen[2] * k]; },
    };
  };

  // ---- PLAN d'une parcelle ----
  const cacheP = new Map();
  W.plan = function (cx, cz) {
    const k = W.cle(cx, cz); let P = cacheP.get(k);
    if (P) { cacheP.delete(k); cacheP.set(k, P); return P; }
    P = construirePlan(cx, cz);
    cacheP.set(k, P); if (cacheP.size > 200) cacheP.delete(cacheP.keys().next().value);
    return P;
  };
  W.viderCaches = () => { cacheP.clear(); cacheQ.clear(); cacheT.clear(); blocs = null; };

  function construirePlan(cx, cz) {
    const rng = NZ.rng(Math.floor(NZ.h2(cx, cz, g(20)) * 4294967296));
    const q = W.quartier(cx, cz), type = W.typeDe(cx, cz), R = REPERES[type], pal = W.palette(q), X0 = cx * C, Z0 = cz * C;
    const P = { cx, cz, X0, Z0, q, type, rep: R.genre !== 'bloc' ? type : null, pal, maisons: [], lampes: [], sapins: [], morts: [], citrouilles: [], tombes: [], feux: [], bancs: [],
      bonshommes: [], epouvantails: [], tentes: [], poteaux: [], cadeauxDeco: [], clotures: [], lumieres: [], flaques: [], obst: [], relais: null, lac: null, routeK: 1, place: R.genre !== 'bloc' && !R.sansPlace };
    const sol = (x, z) => W.sol(X0 + x, Z0 + z);
    P.sol = sol;
    P.libre = (x, z, r) => { for (const o of P.obst) { if (o.t === 'c') { if (Math.hypot(x - o.x, z - o.z) < o.r + r) return false; } else { const dx = x - o.x, dz = z - o.z, lx = dx * o.c - dz * o.s, lz = dx * o.s + dz * o.c; if (Math.abs(lx) < o.hx + r && Math.abs(lz) < o.hz + r) return false; } } return true; };
    P.cyl = (x, z, r, h) => P.obst.push({ t: 'c', x, z, r, h: h || 99 });
    P.boite = (x, z, hx, hz, ang, h) => P.obst.push({ t: 'b', x, z, hx, hz, c: Math.cos(ang || 0), s: Math.sin(ang || 0), h: h || 99 });
    P.lum = (x, y, z, c, i, r) => P.lumieres.push({ x, y, z, c, i: i || 1, r: r || 10 });
    P.flaque = (x, z, r, c) => P.flaques.push({ x, z, r, c });
    P.lampe = (x, z, ang, col, haut) => ajLampe(P, x, z, ang || 0, col || pal.lampe, haut);
    P.feu = (x, z) => ajFeu(P, x, z);
    if (W.relais(cx, cz)) { P.relais = { x: 0, z: 0, id: W.cle(cx, cz) }; P.cyl(0, 0, 0.7); }
    if (R.route != null) P.routeK = R.route;
    R.plan(P, rng);

    // --- maisons le long des côtés (densité par côté : [sud z=0, nord z=C, est x=C, ouest x=0]) ---
    let dens = R.maisons === true ? 0.9 : (R.maisons || 0); if (typeof dens === 'number') dens = [dens, dens, dens, dens];
    const cotes = [['x', 0, Math.PI, 4, C - 4], ['x', C, 0, 4, C - 4], ['z', C, Math.PI / 2, 13.6, C - 13.6], ['z', 0, -Math.PI / 2, 13.6, C - 13.6]];
    cotes.forEach(([axe, rue, ang, a0, a1], ic) => {
      let t = a0 + rng() * 1.5;
      while (t < a1 - 4) {
        const w = 4.4 + rng() * 3.4, d = 5.4 + rng() * 3; if (t + w > a1) break;
        const front = RUE + 1.4, prof = front + d / 2, mid = t + w / 2;
        const x = axe === 'x' ? mid : (rue === 0 ? prof : C - prof), z = axe === 'x' ? (rue === 0 ? prof : C - prof) : mid;
        const entree = P.rep && ic === 0 && Math.abs(mid - C / 2) < 9; // les merveilles gardent une entrée dégagée au sud
        if (rng() < dens[ic] && !entree && P.libre(x, z, Math.max(w, d) / 2 + 0.3)) {
          const H = W.maison(P, rng, x, z, w, d, ang);
          P.boite(x, z, w / 2 + 0.25, d / 2 + 0.25, ang);
          P.maisons.push(H);
        }
        t += w + 0.6 + rng() * rng() * 4;
      }
    });
    // --- lampadaires sur les trottoirs ---
    const nLampes = { bourg: 3, citrouilles: 2, sapins: 2, cimetiere: 2, lac: 2, foire: 3 }[q];
    const pLampe = { bourg: 0.85, citrouilles: 0.7, sapins: 0.55, cimetiere: 0.5, lac: 0.75, foire: 0.9 }[q] * (R.lampes != null ? R.lampes : 1);
    for (const [axe, rue] of cotes) for (let i = 0; i < nLampes; i++) {
      if (rng() > pLampe) continue;
      const t = (i + 0.5) / nLampes * (C - 10) + 5 + (rng() - 0.5) * 3, off = RUE + 0.35;
      const x = axe === 'x' ? t : (rue === 0 ? off : C - off), z = axe === 'x' ? (rue === 0 ? off : C - off) : t;
      const ang = axe === 'x' ? (rue === 0 ? Math.PI / 2 : -Math.PI / 2) : (rue === 0 ? Math.PI : 0);
      if (!P.libre(x, z, 0.4)) continue;
      ajLampe(P, x, z, ang, pal.lampe);
    }
    // --- guirlandes tendues au-dessus des rues SUD et OUEST (chaque rue touche deux parcelles : une seule la décore) ---
    const nFils = { bourg: 2, foire: 3, citrouilles: 1, lac: 1, sapins: 1, cimetiere: 0 }[q]; P.fils = [];
    for (let i = 0; i < nFils; i++) for (const axe of ['x', 'z']) {
      if (rng() < 0.4) continue;
      const t = 6 + rng() * (C - 12), o = RUE + 0.2, dec = (rng() - 0.5) * 3;
      const a = axe === 'x' ? [t, o] : [o, t], b = axe === 'x' ? [t + dec, -o] : [-o, t + dec];
      if (!P.libre(a[0], a[1], 0.5)) continue;
      P.fils.push({ a, b, etoile: rng() < 0.5 }); P.cyl(a[0], a[1], 0.12); P.cyl(b[0], b[1], 0.12);
    }
    return P;
  }
  // Fiche d'une maison (le modèle 3D est fait par GEO.maison à partir de cette fiche)
  const STYLES = { bourg: ['colombage', 'colombage', 'brique', 'pierre', 'boutique', 'tour'], citrouilles: ['chalet', 'pierre', 'colombage', 'boutique'], sapins: ['chalet', 'chalet', 'pierre'], cimetiere: ['pierre', 'brique', 'tour'], lac: ['pierre', 'colombage', 'chalet'], foire: ['boutique', 'colombage', 'brique', 'boutique'] };
  W.maison = function (P, rng, x, z, w, d, ang, o) {
    o = o || {};
    const pal = P.pal, st = o.style || rng.p(STYLES[P.q]), basse = st === 'chalet';
    const etages = o.etages || (basse ? 1 + Math.floor(rng() * 1.6) : st === 'tour' ? 3 + Math.floor(rng() * 3) : 2 + Math.floor(rng() * rng() * 3.4));
    const toitR = rng();
    const H = {
      id: P.maisons.length, x, z, w, d, ang, etages, style: st, hE: 2.7 + rng() * 0.5, hToit: w * (basse ? 0.55 + rng() * 0.3 : 0.75 + rng() * 0.85),
      toit: st === 'tour' ? 'tour' : st === 'chalet' ? 'pignon' : toitR < 0.6 ? 'pignon' : toitR < 0.85 ? 'pointe' : 'croupe',
      mur: st === 'brique' ? 'brique' : st === 'pierre' ? 'moellon' : st === 'chalet' ? 'planche' : 'platre',
      cMur: st === 'brique' ? [0.9, 0.85, 0.82] : st === 'pierre' ? [0.78, 0.76, 0.76] : rng.p(pal.murs), cBois: rng() < 0.6 ? [0.3, 0.22, 0.18] : [0.2, 0.18, 0.17], cToit: rng.p(pal.toits),
      porteX: (rng() - 0.5) * (w - 2.4), fenType: Math.floor(rng() * 4), pAllume: 0.4 + rng() * 0.5, pGuirlande: P.q === 'cimetiere' ? 0.35 : 0.8,
      torsion: (rng() - 0.5) * 0.22, courbe: [(rng() - 0.5) * 1.6, (rng() - 0.5) * 1.0], graine: Math.floor(rng() * 1e9),
    };
    Object.assign(H, o.plus || {});
    // hauteur du sol au milieu de la façade (la porte est toujours au niveau de la rue)
    const c = Math.cos(ang), s = Math.sin(ang);
    H.y = P.sol(x + s * d / 2, z + c * d / 2) + 0.02;
    H.porte = { x: x + c * H.porteX + s * (d / 2 + 1.2), z: z - s * H.porteX + c * (d / 2 + 1.2) };
    return H;
  };
  function ajLampe(P, x, z, ang, col, haut) {
    const H = haut || 3.6, c = Math.cos(ang), s = Math.sin(ang);
    P.lampes.push({ x, z, ang, col, haut: H });
    const hx = x + c * 0.42, hz = z - s * 0.42;
    P.lumieres.push({ x: hx, y: P.sol(x, z) + H, z: hz, c: [col[0] / 3.2, col[1] / 3.2, col[2] / 3.2], i: 1.4, r: 11, halo: 1 });
    P.flaques.push({ x: hx, z: hz, r: 4.4, c: [col[0] * 0.16, col[1] * 0.15, col[2] * 0.14] });
    P.cyl(x, z, 0.22);
  }
  W.ajLampe = ajLampe;
  function ajFeu(P, x, z) {
    P.feux.push({ x, z }); P.cyl(x, z, 0.5, 1);
    P.lumieres.push({ x, y: P.sol(x, z) + 1.4, z, c: [1, 0.5, 0.18], i: 2.2, r: 10, feu: true });
    P.flaques.push({ x, z, r: 5, c: [0.55, 0.26, 0.08] });
  }
  W.ajFeu = ajFeu;
  return W;
})();
