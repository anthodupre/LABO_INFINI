/* ===================== LE MONDE : plan procédural infini (données pures, sans maillage) =====================
   La ville est une grille de PARCELLES de C × C mètres. Chaque parcelle = un pâté de maisons entouré de demi-rues ;
   les carrefours sont aux coins. Les QUARTIERS forment de grandes taches (cellules de Voronoï sur une grille de 5×5
   parcelles). Certaines parcelles portent un REPÈRE (tour de l'horloge, colline en spirale…). Aux carrefours, des
   LANTERNES-RELAIS (points de sauvegarde). MONDE.plan(cx, cz) renvoie tout ce qu'il faut pour construire la parcelle,
   faire la carte et le jeu (bonbons, cadeaux, portes qui attendent, lumières, obstacles), toujours identique pour une
   même graine. */
const MONDE = (() => {
  const C = 44, RUE = 3.6;
  const W = { C, RUE, graine: 1 };
  const QUARTIERS = ['bourg', 'citrouilles', 'sapins', 'cimetiere', 'lac', 'foire'];
  const POIDS_Q = [3, 1.4, 1.5, 1.2, 1.0, 1.0];
  const REP_TYPES = ['horloge', 'colline', 'mausolee', 'carrousel', 'kiosque', 'sapin', 'fontaine', 'atelier', 'puits', 'roue', 'gare', 'observatoire'];
  // affinité des repères selon le quartier (poids)
  const AFF = {
    bourg: { horloge: 3, fontaine: 3, puits: 2, atelier: 3, observatoire: 2, gare: 2, colline: 1, sapin: 1, carrousel: 1 },
    citrouilles: { colline: 3, puits: 3, atelier: 2, roue: 1, horloge: 1, gare: 1, sapin: 1 },
    sapins: { sapin: 4, colline: 2, observatoire: 2, gare: 2, puits: 1, atelier: 1 },
    cimetiere: { mausolee: 5, colline: 1, horloge: 1, puits: 1, observatoire: 1 },
    lac: { kiosque: 5, fontaine: 1, observatoire: 1 },
    foire: { carrousel: 4, roue: 4, gare: 1, fontaine: 1 },
  };
  W.QUARTIERS = QUARTIERS; W.REP_TYPES = REP_TYPES;
  const g = k => (W.graine * 7919 + k) | 0;
  function pondere(r, table) { let t = 0; for (const k in table) t += table[k]; let x = r * t; for (const k in table) { x -= table[k]; if (x <= 0) return k; } return Object.keys(table)[0]; }

  // ---- quartier d'une parcelle (Voronoï grossier) ----
  const cacheQ = new Map();
  W.quartier = function (cx, cz) {
    const k = cx + ',' + cz; let q = cacheQ.get(k); if (q) return q;
    if (Math.abs(cx) <= 2 && Math.abs(cz) <= 2) return 'bourg'; // le départ est toujours dans le vieux bourg
    const sx = Math.floor(cx / 5), sz = Math.floor(cz / 5); let best = 1e9, bq = 'bourg';
    for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) {
      const X = sx + i, Z = sz + j, px = (X + 0.15 + 0.7 * NZ.h2(X, Z, g(1))) * 5, pz = (Z + 0.15 + 0.7 * NZ.h2(X, Z, g(2))) * 5;
      const d = (cx + 0.5 - px) ** 2 + (cz + 0.5 - pz) ** 2;
      if (d < best) { best = d; bq = (X === 0 && Z === 0) ? 'bourg' : QUARTIERS[pondereIdx(NZ.h2(X, Z, g(3)))]; }
    }
    if (cacheQ.size > 6000) cacheQ.clear();
    cacheQ.set(k, bq); return bq;
  };
  function pondereIdx(r) { let t = 0; for (const p of POIDS_Q) t += p; let x = r * t; for (let i = 0; i < POIDS_Q.length; i++) { x -= POIDS_Q[i]; if (x <= 0) return i; } return 0; }
  // ---- repère éventuel d'une parcelle ----
  W.repere = function (cx, cz) {
    if (cx === 1 && cz === 0) return 'horloge';            // le premier, visible dès le départ
    if (Math.abs(cx) <= 1 && Math.abs(cz) <= 1) return null;
    if (cx === -2 && cz === 1) return 'puits';
    const h = NZ.h2(cx, cz, g(5));
    if (h > 0.085) return null;
    // pas deux repères côte à côte : le plus petit hasard l'emporte
    for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) if ((i || j) && NZ.h2(cx + i, cz + j, g(5)) < h && !(Math.abs(cx + i) <= 1 && Math.abs(cz + j) <= 1)) return null;
    return pondere(NZ.h2(cx, cz, g(6)), AFF[W.quartier(cx, cz)]);
  };
  W.relais = (ix, iz) => (ix === 0 && iz === 0) || NZ.h2(ix, iz, g(9)) < 0.22;
  W.cle = (cx, cz) => cx + ',' + cz;

  // ---- relief ----
  function terrainBrut(x, z) { return (NZ.fbm(x / 95, z / 95, g(11), 3) - 0.5) * 7 + (NZ.fbm(x / 23, z / 23, g(12), 2) - 0.5) * 1.1; }
  // modification locale d'une parcelle (lac gelé, colline) : nulle près des bords, donc sans couture
  function modParcelle(cx, cz, x, z, t) {
    const q = W.quartier(cx, cz), rep = W.repere(cx, cz);
    const ox = cx * C + C / 2, oz = cz * C + C / 2, r = Math.hypot(x - ox, z - oz);
    if (rep === 'colline') { const R = 19; if (r < R) { const k = 1 - r / R; return t + 13.5 * k * k * (3 - 2 * k); } return t; }
    if ((q === 'lac' && !rep) || rep === 'kiosque') {
      const R = rep === 'kiosque' ? 15.5 : 14, niv = terrainBrut(ox, oz) - 0.5;
      if (r < R) return niv; if (r < R + 4) return lerp(niv, t, sstep(R, R + 4, r));
    }
    return t;
  }
  W.sol = function (x, z) { const t = terrainBrut(x, z); return modParcelle(Math.floor(x / C), Math.floor(z / C), x, z, t); };
  // sur la glace ? (pour la glisse et le son des pas)
  W.surGlace = function (x, z) {
    const cx = Math.floor(x / C), cz = Math.floor(z / C), q = W.quartier(cx, cz), rep = W.repere(cx, cz);
    if (!((q === 'lac' && !rep) || rep === 'kiosque')) return false;
    return Math.hypot(x - cx * C - C / 2, z - cz * C - C / 2) < (rep === 'kiosque' ? 15.5 : 14);
  };
  W.surRoute = function (x, z) { const lx = ((x % C) + C) % C, lz = ((z % C) + C) % C; return Math.min(lx, C - lx, lz, C - lz) < RUE; };

  // ---- palettes des quartiers ----
  const PAL = {
    bourg: { murs: [[0.55, 0.45, 0.62], [0.42, 0.56, 0.56], [0.66, 0.58, 0.46], [0.38, 0.42, 0.55], [0.62, 0.38, 0.38], [0.46, 0.52, 0.38], [0.5, 0.5, 0.52]], toits: [[0.36, 0.3, 0.42], [0.26, 0.31, 0.36], [0.42, 0.26, 0.26], [0.22, 0.24, 0.24]], guir: [[3, 0.45, 0.35], [0.45, 2.6, 0.55], [3, 2.1, 0.5], [0.55, 0.9, 3], [2.4, 0.55, 2.6]], fen: [2.4, 1.55, 0.75], bizarre: [[0.7, 2.2, 0.9], [1.6, 0.8, 2.4]], lampe: [3.2, 2.1, 1.0] },
    citrouilles: { murs: [[0.6, 0.48, 0.36], [0.5, 0.4, 0.34], [0.66, 0.6, 0.48], [0.44, 0.38, 0.44]], toits: [[0.35, 0.22, 0.16], [0.3, 0.26, 0.22]], guir: [[3.2, 1.3, 0.2], [2.2, 0.5, 2.6], [3, 2.2, 0.4]], fen: [2.6, 1.3, 0.45], bizarre: [[2.4, 0.6, 2.2]], lampe: [3.4, 1.7, 0.6] },
    sapins: { murs: [[0.5, 0.42, 0.34], [0.42, 0.36, 0.3]], toits: [[0.25, 0.3, 0.26], [0.3, 0.25, 0.22]], guir: [[3, 2.4, 1.3], [3, 1.9, 0.8], [2.6, 2.6, 2.2]], fen: [2.5, 1.6, 0.8], bizarre: [[1.2, 2.4, 1.4]], lampe: [3.2, 2.2, 1.2] },
    cimetiere: { murs: [[0.45, 0.47, 0.5], [0.38, 0.4, 0.44]], toits: [[0.22, 0.24, 0.28]], guir: [[0.5, 1.6, 3], [0.4, 2.8, 2.6], [1.6, 0.6, 3]], fen: [0.8, 2.4, 1.7], bizarre: [[0.8, 2.4, 1.7]], lampe: [1.2, 2.6, 2.6] },
    lac: { murs: [[0.5, 0.56, 0.62], [0.6, 0.62, 0.66]], toits: [[0.3, 0.35, 0.42]], guir: [[2.4, 2.8, 3.2], [0.6, 1.4, 3.2], [1.4, 2.6, 3.2]], fen: [2.2, 1.7, 1.0], bizarre: [[1.0, 1.8, 3]], lampe: [2.6, 2.6, 3.0] },
    foire: { murs: [[0.62, 0.36, 0.36], [0.4, 0.5, 0.36], [0.62, 0.56, 0.4]], toits: [[0.4, 0.2, 0.2], [0.2, 0.3, 0.2]], guir: [[3.2, 0.4, 0.3], [0.4, 2.8, 0.5], [3.2, 2.4, 0.4], [3, 3, 3]], fen: [2.5, 1.6, 0.7], bizarre: [[2.4, 0.6, 2.2]], lampe: [3.2, 2.0, 0.9] },
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
    if (P) { cacheP.delete(k); cacheP.set(k, P); return P; } // récent = gardé
    P = construirePlan(cx, cz);
    cacheP.set(k, P); if (cacheP.size > 260) cacheP.delete(cacheP.keys().next().value);
    return P;
  };
  W.viderCaches = () => { cacheP.clear(); cacheQ.clear(); };

  function construirePlan(cx, cz) {
    const rng = NZ.rng(Math.floor(NZ.h2(cx, cz, g(20)) * 4294967296));
    const q = W.quartier(cx, cz), rep = W.repere(cx, cz), pal = W.palette(q);
    const X0 = cx * C, Z0 = cz * C;
    const P = { cx, cz, X0, Z0, q, rep, pal, maisons: [], lampes: [], sapins: [], morts: [], citrouilles: [], tombes: [], feux: [], bancs: [], bonshommes: [],
      epouvantails: [], tentes: [], poteaux: [], cadeauxDeco: [], clotures: [], bonbons: [], cadeaux: [], lumieres: [], flaques: [], obst: [], relais: null, spot: null, lac: null, routeK: 1 };
    const sol = (x, z) => W.sol(X0 + x, Z0 + z);
    P.sol = sol;
    const libre = (x, z, r) => { for (const o of P.obst) { if (o.t === 'c') { if (Math.hypot(x - o.x, z - o.z) < o.r + r) return false; } else { const dx = x - o.x, dz = z - o.z, lx = dx * o.c - dz * o.s, lz = dx * o.s + dz * o.c; if (Math.abs(lx) < o.hx + r && Math.abs(lz) < o.hz + r) return false; } } return true; };
    const cyl = (x, z, r, h) => P.obst.push({ t: 'c', x, z, r, h: h || 99 });
    const boite = (x, z, hx, hz, ang, h) => P.obst.push({ t: 'b', x, z, hx, hz, c: Math.cos(ang), s: Math.sin(ang), h: h || 99 });
    P.libre = libre; P.cyl = cyl; P.boite = boite;
    if (q === 'sapins') P.routeK = 0.35; else if (q === 'cimetiere') P.routeK = 0.7; else if (q === 'lac') P.routeK = 0.8;

    // lanterne-relais au carrefour (coin 0,0 de la parcelle)
    if (W.relais(cx, cz)) { P.relais = { x: 0, z: 0, id: W.cle(cx, cz) }; cyl(0, 0, 0.7); }

    // repère : la parcelle devient une place
    const plein = !rep && !(q === 'lac');
    if (rep) {
      P.place = true;
      const R = REPERES[rep]; P.spot = { x: C / 2, z: C / 2 + 6, type: rep };
      R.plan(P, rng);
    }
    if (q === 'lac' && !rep) { P.lac = { x: C / 2, z: C / 2, r: 14 }; }

    // --- maisons le long des 4 côtés ---
    const pMaison = { bourg: 0.92, citrouilles: 0.5, sapins: 0.16, cimetiere: 0.14, lac: 0, foire: 0.22 }[q];
    const cotes = [ // [axe, rue (0 ou C), angle de façade, début, fin]
      ['x', 0, Math.PI, 4, C - 4], ['x', C, 0, 4, C - 4], ['z', C, Math.PI / 2, 13.6, C - 13.6], ['z', 0, -Math.PI / 2, 13.6, C - 13.6]];
    if (plein || (rep && REPERES[rep].maisons)) {
      for (const [axe, rue, ang, a0, a1] of cotes) {
        let t = a0 + rng() * 1.5;
        while (t < a1 - 4) {
          const w = 4.4 + rng() * 2.8, d = 5.4 + rng() * 3; if (t + w > a1) break;
          if (rng() < pMaison && !(rep && axe === 'x' && rue === 0 && Math.abs(t + w / 2 - C / 2) < 9)) {
            const front = RUE + 1.4, prof = front + d / 2, mid = t + w / 2;
            const x = axe === 'x' ? mid : (rue === 0 ? prof : C - prof), z = axe === 'x' ? (rue === 0 ? prof : C - prof) : mid;
            const basse = q === 'citrouilles' || q === 'sapins';
            const etages = basse ? 1 + Math.floor(rng() * 2) : 2 + Math.floor(rng() * rng() * 3.2);
            const toitR = rng(), mi = Math.floor(rng() * pal.murs.length);
            const H = {
              id: P.maisons.length, x, z, w, d, ang, etages, hE: 2.8 + rng() * 0.5, hToit: w * (0.7 + rng() * 0.8),
              toit: toitR < 0.5 ? 'pignon' : toitR < 0.82 ? 'pointe' : 'tour',
              mur: rng() < 0.55 ? 'platre' : rng() < 0.6 ? 'planche' : 'brique',
              cMur: pal.murs[mi], cBois: rng() < 0.5 ? [0.3, 0.22, 0.18] : [0.62, 0.6, 0.58], cToit: pal.toits[Math.floor(rng() * pal.toits.length)],
              porteX: (rng() - 0.5) * (w - 2.2), fenType: Math.floor(rng() * 4), pAllume: 0.45 + rng() * 0.45,
              pGuirlande: q === 'cimetiere' ? 0.4 : 0.85, torsion: (rng() - 0.5) * 0.22, courbe: [(rng() - 0.5) * 1.6, (rng() - 0.5) * 1.0],
              attente: NZ.h2(cx * 31 + P.maisons.length, cz, g(30)) < (q === 'bourg' ? 0.16 : 0.12),
            };
            if (H.mur === 'brique') H.cMur = [0.9, 0.85, 0.82];
            H.y = Math.min(sol(x - w / 2, z - d / 2), sol(x + w / 2, z - d / 2), sol(x - w / 2, z + d / 2), sol(x + w / 2, z + d / 2), sol(x, z)) + 0.05;
            // porte en coordonnées de la parcelle (devant la façade)
            const c = Math.cos(H.ang), s = Math.sin(H.ang), lx = H.porteX, lz = d / 2 + 1.2;
            H.porte = { x: x + c * lx + s * lz, z: z - s * lx + c * lz };
            boite(x, z, w / 2 + 0.25, d / 2 + 0.25, H.ang);
            P.maisons.push(H);
          }
          t += w + 0.8 + rng() * 2.4;
        }
      }
    }
    // --- lampadaires sur les trottoirs ---
    const nLampes = { bourg: 3, citrouilles: 2, sapins: 1, cimetiere: 1, lac: 2, foire: 3 }[q];
    const pLampe = { bourg: 0.9, citrouilles: 0.7, sapins: 0.45, cimetiere: 0.5, lac: 0.8, foire: 0.95 }[q];
    for (const [axe, rue] of cotes) for (let i = 0; i < nLampes; i++) {
      if (rng() > pLampe) continue;
      const t = (i + 0.5) / nLampes * (C - 10) + 5 + (rng() - 0.5) * 3, off = RUE + 0.35;
      const x = axe === 'x' ? t : (rue === 0 ? off : C - off), z = axe === 'x' ? (rue === 0 ? off : C - off) : t;
      const ang = axe === 'x' ? (rue === 0 ? Math.PI / 2 : -Math.PI / 2) : (rue === 0 ? Math.PI : 0);
      if (!libre(x, z, 0.4)) continue;
      ajLampe(P, x, z, ang, pal.lampe);
    }
    // --- intérieur du pâté selon le quartier ---
    if (!rep) interieur(P, rng, q);
    // --- bonbons le long des rues + quelques-uns dans les cours ---
    const nB = q === 'cimetiere' || q === 'sapins' ? 4 : 3;
    for (const [axe, rue] of cotes) for (let i = 0; i < nB; i++) {
      const t = 3 + rng() * (C - 6), o = 0.6 + rng() * (RUE - 1);
      const x = axe === 'x' ? t : (rue === 0 ? o : C - o), z = axe === 'x' ? (rue === 0 ? o : C - o) : t;
      if (libre(x, z, 0.4)) P.bonbons.push({ x, z, id: P.bonbons.length, or: rng() < 0.035 });
    }
    for (let i = 0; i < 4; i++) { const x = 8 + rng() * (C - 16), z = 8 + rng() * (C - 16); if (libre(x, z, 0.5)) P.bonbons.push({ x, z, id: P.bonbons.length, or: rng() < 0.06 }); }
    // --- cadeaux perdus (dans les ruelles et les cours) ---
    const nC = rng() < (q === 'bourg' ? 0.6 : 0.5) ? 1 + (rng() < 0.25 ? 1 : 0) : 0;
    for (let i = 0, essais = 0; i < nC && essais < 30; essais++) {
      const x = 5 + rng() * (C - 10), z = 5 + rng() * (C - 10);
      if (!libre(x, z, 0.8) || (P.lac && Math.hypot(x - P.lac.x, z - P.lac.z) < P.lac.r)) continue;
      P.cadeaux.push({ x, z, id: P.cadeaux.length, coul: Math.floor(rng() * 5) }); i++;
    }
    return P;
  }
  function ajLampe(P, x, z, ang, col, haut) {
    const H = haut || 3.6, c = Math.cos(ang), s = Math.sin(ang);
    P.lampes.push({ x, z, ang, col, haut: H });
    const hx = x + c * 0.42, hz = z - s * 0.42;
    P.lumieres.push({ x: hx, y: P.sol(x, z) + H, z: hz, c: [col[0] / 3, col[1] / 3, col[2] / 3], i: 1.4, r: 11, chaleur: 1 });
    P.flaques.push({ x: hx, z: hz, r: 4.2, c: [col[0] * 0.16, col[1] * 0.15, col[2] * 0.14] });
    P.cyl(x, z, 0.22);
  }
  W.ajLampe = ajLampe;

  function interieur(P, rng, q) {
    const a = 14.5, b = C - 14.5, rx = () => a + rng() * (b - a);
    const place = (r, f, n) => { for (let i = 0, e = 0; i < n && e < n * 8; e++) { const x = rx(), z = rx(); if (P.libre(x, z, r)) { f(x, z); i++; } } };
    if (q === 'bourg') {
      place(1.6, (x, z) => { const hh = 4 + rng() * 5; P.sapins.push({ x, z, h: hh, illum: rng() < 0.75 }); P.cyl(x, z, 0.5); }, 1 + Math.floor(rng() * 3));
      if (rng() < 0.35) place(1, (x, z) => { P.bonshommes.push({ x, z, a: rng() * 6 }); P.cyl(x, z, 0.55); }, 1);
      if (rng() < 0.3) place(1, (x, z) => ajFeu(P, x, z), 1);
      if (rng() < 0.4) place(1.2, (x, z) => { P.bancs.push({ x, z, a: rng() * 6 }); P.cyl(x, z, 0.8, 0.9); }, 1);
      place(0.5, (x, z) => P.cadeauxDeco.push({ x, z, s: 0.4 + rng() * 0.3 }), Math.floor(rng() * 3));
      if (rng() < 0.25) place(0.6, (x, z) => { P.citrouilles.push({ x, z, s: 0.4 + rng() * 0.3, lant: true, a: rng() * 6 }); }, 2);
      if (rng() < 0.15) place(1.5, (x, z) => { P.morts.push({ x, z, h: 5 + rng() * 4 }); P.cyl(x, z, 0.4); }, 1);
    } else if (q === 'citrouilles') {
      const rows = 4 + Math.floor(rng() * 3), x0 = a + 1, x1 = b - 1;
      for (let r = 0; r < rows; r++) for (let x = x0; x < x1; x += 1.6 + rng() * 0.8) {
        const z = a + 1 + r * ((b - a - 2) / rows) + (rng() - 0.5) * 0.6;
        if (rng() < 0.75 && P.libre(x, z, 0.6)) { const s = 0.3 + rng() * 0.45; P.citrouilles.push({ x, z, s, lant: rng() < 0.35, a: (rng() - 0.5) * 1.2 + Math.PI }); if (s > 0.5) P.cyl(x, z, s * 0.9, s * 1.4); }
      }
      place(1, (x, z) => { P.epouvantails.push({ x, z, a: rng() * 6 }); P.cyl(x, z, 0.4); }, 1 + Math.floor(rng() * 2));
      if (rng() < 0.35) place(1, (x, z) => ajFeu(P, x, z), 1);
      for (let i = 0; i < 10; i++) { const t = rng(); const s = 0.35 + rng() * 0.3; const side = Math.floor(rng() * 4), o = RUE + 0.9; const x = side < 2 ? 4 + t * (C - 8) : side === 2 ? o : C - o, z = side >= 2 ? 4 + t * (C - 8) : side === 0 ? o : C - o; if (P.libre(x, z, 0.5)) P.citrouilles.push({ x, z, s, lant: rng() < 0.6, a: 0 }); }
    } else if (q === 'sapins') {
      place(1.8, (x, z) => { const hh = 6 + rng() * 9; P.sapins.push({ x, z, h: hh, illum: rng() < 0.4 }); P.cyl(x, z, 0.5 + hh * 0.03); }, 14 + Math.floor(rng() * 8));
      for (let i = 0; i < 14; i++) { const x = 5 + rng() * (C - 10), z = 5 + rng() * (C - 10); if (P.libre(x, z, 1.5) && Math.min(x, z, C - x, C - z) > RUE + 1) { const hh = 5 + rng() * 8; P.sapins.push({ x, z, h: hh, illum: rng() < 0.3 }); P.cyl(x, z, 0.5); } }
      place(1.4, (x, z) => { P.morts.push({ x, z, h: 5 + rng() * 5 }); P.cyl(x, z, 0.4); }, 2);
      if (rng() < 0.35) place(1.2, (x, z) => ajFeu(P, x, z), 1);
    } else if (q === 'cimetiere') {
      for (let z = a; z < b; z += 2.4) for (let x = a; x < b; x += 1.9) {
        if (rng() < 0.7) { const tx = x + (rng() - 0.5) * 0.5, tz = z + (rng() - 0.5) * 0.4; P.tombes.push({ x: tx, z: tz, a: Math.PI + (rng() - 0.5) * 0.4, pen: (rng() - 0.5) * 0.25 }); P.boite(tx, tz, 0.4, 0.2, 0, 1.3); }
      }
      place(1.5, (x, z) => { P.morts.push({ x, z, h: 6 + rng() * 5 }); P.cyl(x, z, 0.4); }, 2 + Math.floor(rng() * 3));
      const m = 12.5; for (const [p0, p1] of [[[m, m], [C - m, m]], [[C - m, m], [C - m, C - m]], [[C - m, C - m], [m, C - m]], [[m, C - m], [m, m]]]) {
        const mid = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2]; const gap = 1.6, dx = p1[0] - p0[0], dz = p1[1] - p0[1], L = Math.hypot(dx, dz), ux = dx / L, uz = dz / L;
        const seg = (u, v) => { P.clotures.push({ a: u, b: v }); P.boite((u[0] + v[0]) / 2, (u[1] + v[1]) / 2, Math.hypot(v[0] - u[0], v[1] - u[1]) / 2, 0.1, -Math.atan2(v[1] - u[1], v[0] - u[0]), 1.3); };
        seg(p0, [mid[0] - ux * gap, mid[1] - uz * gap]); seg([mid[0] + ux * gap, mid[1] + uz * gap], p1);
      }
      // feux follets (petites lueurs froides qui flottent)
      for (let i = 0; i < 3; i++) { const x = rx(), z = rx(); P.lumieres.push({ x, y: P.sol(x, z) + 1.2, z, c: [0.3, 0.9, 1], i: 0.8, r: 7, chaleur: 0, follet: true }); }
    } else if (q === 'lac') {
      const L = P.lac;
      for (let i = 0; i < 6; i++) { const a2 = i / 6 * Math.PI * 2 + rng() * 0.3, r = L.r + 2.2; const x = L.x + Math.cos(a2) * r, z = L.z + Math.sin(a2) * r; if (i % 2 === 0) { if (P.libre(x, z, 0.4)) ajLampe(P, x, z, -a2 + Math.PI, W.palette('lac').lampe); } else if (P.libre(x, z, 1)) { P.bancs.push({ x, z, a: -a2 - Math.PI / 2 }); P.cyl(x, z, 0.8, 0.9); } }
      for (let i = 0; i < 5; i++) { const a2 = rng() * Math.PI * 2, r = L.r + 4 + rng() * 2.5; const x = L.x + Math.cos(a2) * r, z = L.z + Math.sin(a2) * r; if (P.libre(x, z, 1.5)) { if (rng() < 0.5) { P.morts.push({ x, z, h: 4 + rng() * 4 }); P.cyl(x, z, 0.4); } else { const hh = 5 + rng() * 5; P.sapins.push({ x, z, h: hh, illum: rng() < 0.5 }); P.cyl(x, z, 0.5); } } }
    } else if (q === 'foire') {
      place(3.4, (x, z) => { const r = 2.2 + rng() * 1.4; P.tentes.push({ x, z, r, h: 2.2 + rng(), hc: 2 + rng() * 1.5, coul: Math.floor(rng() * 4), a: rng() * 6 }); P.cyl(x, z, r + 0.1); }, 2 + Math.floor(rng() * 3));
      // poteaux sucre d'orge reliés par des guirlandes
      const pts = []; place(0.6, (x, z) => { pts.push({ x, z }); P.poteaux.push({ x, z, a: rng() * 6 }); P.cyl(x, z, 0.15); }, 6);
      P.liens = []; for (let i = 0; i < pts.length; i++) { const p = pts[i], q2 = pts[(i + 1) % pts.length]; if (Math.hypot(p.x - q2.x, p.z - q2.z) < 16) P.liens.push([p, q2]); }
      if (rng() < 0.6) place(1, (x, z) => ajFeu(P, x, z), 1);
      place(0.6, (x, z) => P.cadeauxDeco.push({ x, z, s: 0.5 + rng() * 0.3 }), 2);
    }
  }
  function ajFeu(P, x, z) {
    P.feux.push({ x, z }); P.cyl(x, z, 0.5, 1);
    P.lumieres.push({ x, y: P.sol(x, z) + 1.4, z, c: [1, 0.5, 0.18], i: 2.2, r: 10, chaleur: 2.2, feu: true });
    P.flaques.push({ x, z, r: 5, c: [0.55, 0.26, 0.08] });
  }
  W.ajFeu = ajFeu;
  return W;
})();
