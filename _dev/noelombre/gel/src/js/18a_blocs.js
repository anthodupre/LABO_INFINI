/* ===================== BLOCS : pâtés de maisons ordinaires (genre 'bloc') =====================
   Même forme que les merveilles : { genre: 'bloc', maisons: densité (nombre ou [sud, nord, est, ouest]), route, lampes,
   plan(P, rng), construire(L, P, rng, groupe, Q) -> animations, relief(lx, lz, t, tCentre), glace(lx, lz) }.
   Le cœur du pâté (≈ 14,5 à 29,5 m) est libre ; les maisons occupent le pourtour. Un motif latin (16_monde.js)
   empêche deux parcelles voisines d'avoir le même bloc. */
(() => {
  const C = MONDE.C, M = C / 2, RUE = MONDE.RUE;
  const a = 14.5, b = C - 14.5;
  // place n objets de rayon r dans le cœur du pâté, sans chevauchement
  const semer = (P, rng, r, n, f, x0, x1) => { x0 = x0 == null ? a : x0; x1 = x1 == null ? b : x1; for (let i = 0, e = 0; i < n && e < n * 8; e++) { const x = x0 + rng() * (x1 - x0), z = x0 + rng() * (x1 - x0); if (P.libre(x, z, r)) { f(x, z); i++; } } };
  Object.assign(REPERES, {
    // cour de maisons : sapins illuminés, bonhomme de neige, brasero, banc
    cour: {
      genre: 'bloc', maisons: 0.92,
      plan(P, rng) {
        semer(P, rng, 1.6, 1 + Math.floor(rng() * 3), (x, z) => { P.sapins.push({ x, z, h: 4 + rng() * 5, illum: rng() < 0.75 }); P.cyl(x, z, 0.5); });
        if (rng() < 0.4) semer(P, rng, 1, 1, (x, z) => { P.bonshommes.push({ x, z, a: rng() * 6 }); P.cyl(x, z, 0.55); });
        if (rng() < 0.35) semer(P, rng, 1, 1, (x, z) => P.feu(x, z));
        if (rng() < 0.4) semer(P, rng, 1.2, 1, (x, z) => { P.bancs.push({ x, z, a: rng() * 6 }); P.cyl(x, z, 0.8, 0.9); });
        semer(P, rng, 0.5, Math.floor(rng() * 3), (x, z) => P.cadeauxDeco.push({ x, z, s: 0.4 + rng() * 0.3 }));
      },
      construire() { return []; },
    },
    // potager de citrouilles lumineuses, épouvantails
    potager: {
      genre: 'bloc', maisons: [0.35, 0.6, 0.2, 0.5],
      plan(P, rng) {
        const rows = 5 + Math.floor(rng() * 3), x0 = 7, x1 = C - 7;
        for (let r = 0; r < rows; r++) for (let x = x0; x < x1; x += 1.6 + rng() * 0.8) {
          const z = 8 + r * ((C - 16) / rows) + (rng() - 0.5) * 0.6;
          if (rng() < 0.75 && P.libre(x, z, 0.6)) { const s = 0.3 + rng() * 0.5; P.citrouilles.push({ x, z, s, lant: rng() < 0.4, a: (rng() - 0.5) * 1.2 + Math.PI }); if (s > 0.5) P.cyl(x, z, s * 0.9, s * 1.4); }
        }
        semer(P, rng, 1, 1 + Math.floor(rng() * 2), (x, z) => { P.epouvantails.push({ x, z, a: rng() * 6 }); P.cyl(x, z, 0.4); }, 9, C - 9);
        if (rng() < 0.5) semer(P, rng, 1, 1, (x, z) => P.feu(x, z));
      },
      construire() { return []; },
    },
    // bois de sapins tordus, quelques-uns illuminés
    sapiniere: {
      genre: 'bloc', maisons: 0.1, route: 0.45, lampes: 0.6,
      plan(P, rng) {
        for (let i = 0; i < 30; i++) { const x = 5.5 + rng() * (C - 11), z = 5.5 + rng() * (C - 11); if (P.libre(x, z, 1.7)) { const hh = 5 + rng() * 10; P.sapins.push({ x, z, h: hh, illum: rng() < 0.35 }); P.cyl(x, z, 0.5 + hh * 0.02); } }
        semer(P, rng, 1.4, 2, (x, z) => { P.morts.push({ x, z, h: 5 + rng() * 5 }); P.cyl(x, z, 0.4); });
        if (rng() < 0.5) semer(P, rng, 1.2, 1, (x, z) => P.feu(x, z));
      },
      construire() { return []; },
    },
    // cimetière givré : rangées de tombes, grille, arbres morts, feux follets
    cimetiere: {
      genre: 'bloc', maisons: [0, 0.25, 0, 0.2], route: 0.75, lampes: 0.6,
      plan(P, rng) {
        const m = 7.5;
        for (let z = m + 2; z < C - m - 1; z += 2.4) for (let x = m + 2; x < C - m - 1; x += 1.9) {
          if (rng() < 0.62 && Math.abs(x - M) > 1.6) { const tx = x + (rng() - 0.5) * 0.5, tz = z + (rng() - 0.5) * 0.4; if (!P.libre(tx, tz, 0.5)) continue; P.tombes.push({ x: tx, z: tz, a: Math.PI + (rng() - 0.5) * 0.4, pen: (rng() - 0.5) * 0.25 }); P.boite(tx, tz, 0.4, 0.2, 0, 1.3); }
        }
        semer(P, rng, 1.5, 3 + Math.floor(rng() * 3), (x, z) => { P.morts.push({ x, z, h: 6 + rng() * 5 }); P.cyl(x, z, 0.4); }, m + 1, C - m - 1);
        for (const [p0, p1] of [[[m, m], [C - m, m]], [[C - m, m], [C - m, C - m]], [[C - m, C - m], [m, C - m]], [[m, C - m], [m, m]]]) {
          const mid = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2], gap = 1.6, dx = p1[0] - p0[0], dz = p1[1] - p0[1], Ln = Math.hypot(dx, dz), ux = dx / Ln, uz = dz / Ln;
          const seg = (u, v) => { if (!P.libre((u[0] + v[0]) / 2, (u[1] + v[1]) / 2, 1)) return; P.clotures.push({ a: u, b: v }); P.boite((u[0] + v[0]) / 2, (u[1] + v[1]) / 2, Math.hypot(v[0] - u[0], v[1] - u[1]) / 2, 0.1, -Math.atan2(v[1] - u[1], v[0] - u[0]), 1.3); };
          seg(p0, [mid[0] - ux * gap, mid[1] - uz * gap]); seg([mid[0] + ux * gap, mid[1] + uz * gap], p1);
        }
        for (let i = 0; i < 3; i++) { const x = a + rng() * (b - a), z = a + rng() * (b - a); P.lumieres.push({ x, y: P.sol(x, z) + 1.2, z, c: [0.3, 0.9, 1], i: 0.8, r: 7, follet: true }); }
      },
      construire() { return []; },
    },
    // étang gelé : on y glisse ; bancs, lampadaires, arbres au bord
    etang: {
      genre: 'bloc', maisons: 0, route: 0.85,
      relief(lx, lz, t, tc) { const r = Math.hypot(lx - M, lz - M), Rr = 14, niv = tc - 0.5; if (r < Rr) return niv; if (r < Rr + 4) return lerp(niv, t, sstep(Rr, Rr + 4, r)); return t; },
      glace(lx, lz) { return Math.hypot(lx - M, lz - M) < 14; },
      plan(P, rng) {
        P.lac = { x: M, z: M, r: 14 }; const Lc = P.lac;
        for (let i = 0; i < 6; i++) { const a2 = i / 6 * Math.PI * 2 + rng() * 0.3, r = Lc.r + 2.2, x = Lc.x + Math.cos(a2) * r, z = Lc.z + Math.sin(a2) * r; if (i % 2 === 0) { if (P.libre(x, z, 0.4)) P.lampe(x, z, -a2 + Math.PI, MONDE.palette('lac').lampe); } else if (P.libre(x, z, 1)) { P.bancs.push({ x, z, a: -a2 - Math.PI / 2 }); P.cyl(x, z, 0.8, 0.9); } }
        for (let i = 0; i < 6; i++) { const a2 = rng() * Math.PI * 2, r = Lc.r + 4 + rng() * 2.5, x = Lc.x + Math.cos(a2) * r, z = Lc.z + Math.sin(a2) * r; if (P.libre(x, z, 1.5)) { if (rng() < 0.5) { P.morts.push({ x, z, h: 4 + rng() * 4 }); P.cyl(x, z, 0.4); } else { P.sapins.push({ x, z, h: 5 + rng() * 5, illum: rng() < 0.5 }); P.cyl(x, z, 0.5); } } }
      },
      construire() { return []; },
    },
    // foire endormie : tentes rayées, poteaux sucre d'orge reliés par des guirlandes
    tentes: {
      genre: 'bloc', maisons: [0.2, 0.3, 0, 0.2],
      plan(P, rng) {
        semer(P, rng, 3.4, 3 + Math.floor(rng() * 2), (x, z) => { const r = 2.2 + rng() * 1.4; P.tentes.push({ x, z, r, h: 2.2 + rng(), hc: 2 + rng() * 1.5, coul: Math.floor(rng() * 4), a: rng() * 6 }); P.cyl(x, z, r + 0.1); }, 9, C - 9);
        const pts = []; semer(P, rng, 0.6, 7, (x, z) => { pts.push({ x, z }); P.poteaux.push({ x, z, a: rng() * 6 }); P.cyl(x, z, 0.15); }, 8, C - 8);
        P.liens = []; for (let i = 0; i < pts.length; i++) { const p = pts[i], q2 = pts[(i + 1) % pts.length]; if (Math.hypot(p.x - q2.x, p.z - q2.z) < 18) P.liens.push([p, q2]); }
        if (rng() < 0.7) semer(P, rng, 1, 1, (x, z) => P.feu(x, z));
        semer(P, rng, 0.6, 2, (x, z) => P.cadeauxDeco.push({ x, z, s: 0.5 + rng() * 0.3 }));
      },
      construire() { return []; },
    },
  });
})();
