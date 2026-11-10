/* ===================== LIEUX SUPPLÉMENTAIRES : 12 blocs et 8 merveilles =====================
   Pour que la ville ne se répète pas : chaque bloc a son idée forte visible depuis la rue, chaque merveille sa
   silhouette. Même format que 18_reperes.js / 18a_blocs.js. Les fichiers 18m_*.js (autres lieux) passent après. */
(() => {
  const C = MONDE.C, M = C / 2, G = GEO, maill = REPERES_OUTILS.maill, PI = Math.PI;
  const noir = [0.16, 0.16, 0.18], ambre = [3.2, 2.0, 0.8];
  const semer = (P, rng, r, n, f, x0, x1) => { x0 = x0 == null ? 8 : x0; x1 = x1 == null ? C - 8 : x1; for (let i = 0, e = 0; i < n && e < n * 10; e++) { const x = x0 + rng() * (x1 - x0), z = x0 + rng() * (x1 - x0); if (P.libre(x, z, r)) { f(x, z); i++; } } };
  // petit lampion lumineux avec son halo
  const lampion = (L, x, y, z, c, t) => { L.get('emis').add(G.base('sphereB'), { m: G.mat(x, y, z, t, t * 1.25, t), c }); G.halo(L, x, y, z, [c[0] * 0.11, c[1] * 0.11, c[2] * 0.11], t * 14); };
  const B = {}, W = {};

  // ---------- BLOCS ----------
  B.marche = { // marché de Noël : étals à auvents rayés, lampions, caisses, guirlandes
    genre: 'bloc', maisons: [0.25, 0.9, 0.6, 0.9], humeur: 'fete',
    plan(P, rng) {
      P.etals = [];
      for (let r = 0; r < 3; r++) for (let i = 0; i < 4; i++) { const x = 9 + i * 8.6 + rng() * 1.2, z = 8 + r * 7.5 + rng(); if (P.libre(x, z, 2)) { P.etals.push({ x, z, a: (rng() - 0.5) * 0.3 + (r % 2 ? PI : 0), c: Math.floor(rng() * 4) }); P.boite(x, z, 1.5, 0.9, 0); } }
      P.feu(M + 1, 4.8 + 7.5 * 0.5); P.flaque(M, 14, 12, [0.3, 0.2, 0.09]);
    },
    construire(L, P, rng) {
      const cols = [[0.8, 0.2, 0.2], [0.2, 0.45, 0.3], [0.75, 0.6, 0.2], [0.5, 0.25, 0.6]];
      for (const e of P.etals) {
        const w = G.monde(e.x, P.sol(e.x, e.z), e.z, e.a);
        L.get('bois').add(G.base('cube'), { m: G.mat(0, 0.9, 0, 2.8, 0.1, 1.3), c: [0.5, 0.38, 0.28], uvm: 'monde', w });
        L.get('bois').add(G.base('cube'), { m: G.mat(0, 0.45, -0.5, 2.7, 0.9, 0.08), c: [0.42, 0.3, 0.22], uvm: 'monde', w });
        for (const sx of [-1.35, 1.35]) L.get('bois').add(G.base('cube'), { m: G.mat(sx, 1.25, -0.6, 0.09, 2.5, 0.09), c: [0.35, 0.26, 0.2], w });
        L.get('tissu').add(G.base('cube'), { m: G.mat(0, 2.45, 0.1, 3.2, 0.06, 1.9, 0.32, 0, 0), c: cols[e.c], w });
        for (let k = 0; k < 4; k++) L.get('verni').add(G.base(k % 2 ? 'sphereB' : 'cube'), { m: G.mat(-1 + k * 0.65, 1.08, 0.1 + (k % 2) * 0.2, 0.16, 0.16, 0.16), c: cols[(e.c + k) % 4], w });
        const v = new THREE.Vector3(0.9, 2.05, 0.75).applyMatrix4(w); lampion(L, v.x, v.y, v.z, ambre, 0.1);
        if (rng() < 0.6) L.get('bois').add(G.base('cube'), { m: G.mat(1.9, 0.3, 0.3, 0.6, 0.6, 0.6, 0, rng(), 0), c: [0.45, 0.34, 0.25], uvm: 'monde', w });
      }
      for (let i = 0; i + 1 < P.etals.length; i += 2) { const a = P.etals[i], b = P.etals[i + 1]; G.guirlande(L, [a.x, P.sol(a.x, a.z) + 2.6, a.z], [b.x, P.sol(b.x, b.z) + 2.6, b.z], { couleurs: P.pal.guirlande, rng, creux: 0.5 }); }
      return [];
    },
  };
  B.parc = { // petit parc : grille, statue enneigée, bancs, haies
    genre: 'bloc', maisons: [0, 0.8, 0.5, 0.5],
    plan(P, rng) {
      const m = 6;
      for (const [p0, p1] of [[[m, m], [M - 2, m]], [[M + 2, m], [C - m, m]], [[C - m, m], [C - m, C - 13]], [[m, C - 13], [m, m]]]) { P.clotures.push({ a: p0, b: p1 }); P.boite((p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2, Math.abs(p1[0] - p0[0]) / 2 + 0.1, Math.abs(p1[1] - p0[1]) / 2 + 0.1, 0, 1.3); }
      P.cyl(M, M - 3, 1.4);
      for (const a of [0.8, 2.35, 3.9, 5.5]) { const x = M + Math.cos(a) * 5.5, z = M - 3 + Math.sin(a) * 5.5; P.bancs.push({ x, z, a: -a - PI / 2 }); P.cyl(x, z, 0.8, 0.9); }
      for (const [x, z] of [[10, 10], [C - 10, 10], [10, 26], [C - 10, 26]]) P.lampe(x, z, 0);
      P.haies = []; for (const a of [0, PI / 2, PI, PI * 1.5]) { const x = M + Math.cos(a + 0.78) * 9, z = M - 3 + Math.sin(a + 0.78) * 9; P.haies.push({ x, z, a }); P.boite(x, z, 2.2, 0.7, a + 0.78 + PI / 2, 1.3); }
      semer(P, rng, 1.5, 4, (x, z) => { P.sapins.push({ x, z, h: 3 + rng() * 3, illum: rng() < 0.5 }); P.cyl(x, z, 0.5); }, 8, C - 14);
    },
    construire(L, P, rng) {
      const y = P.sol(M, M - 3), pi = [0.55, 0.57, 0.62];
      L.get('pierre').add(G.base('cyl8'), { m: G.mat(M, y + 0.5, M - 3, 1.3, 1.6, 1.3), c: pi, uvm: 'monde' });
      L.get('pierre').add(G.base('cone8'), { m: G.mat(M, y + 2.9, M - 3, 0.75, 3.4, 0.75), c: pi, def: v => { v.x += Math.sin((v.y - y) * 0.9) * 0.18; } });
      L.get('pierre').add(G.base('sphere'), { m: G.mat(M + 0.15, y + 4.75, M - 3, 0.42, 0.5, 0.42), c: pi });
      L.get('pierre').add(G.base('cube'), { m: G.mat(M + 0.5, y + 3.7, M - 3, 1.5, 0.16, 0.16, 0, 0, 0.5), c: pi });
      lampion(L, M + 1.15, y + 4.25, M - 3, [2.4, 2.6, 3.2], 0.11);
      for (const h of P.haies) L.get('aiguilles').add(G.base('boite'), { m: G.mat(h.x, P.sol(h.x, h.z) + 0.6, h.z, 4.2, 1.3, 1.2, 0, -(h.a + 0.78 + PI / 2), 0), c: [0.5, 0.7, 0.55], uvm: 'monde', s: 0.9, def: v => { v.y += Math.sin(v.x * 2.3 + v.z) * 0.06; } });
      return [];
    },
  };
  B.lumignons = { // champ de lumignons posés au sol en spirale
    genre: 'bloc', maisons: [0, 0.7, 0.4, 0.4], humeur: 'neige',
    plan(P, rng) {
      P.pts = []; for (let i = 0; i < 70; i++) { const t = i / 70, a = t * PI * 7, r = 1.8 + t * 15.5, x = M + Math.cos(a) * r, z = M + Math.sin(a) * r; if (z > 4.5 && P.libre(x, z, 0.3)) P.pts.push({ x, z, k: rng() }); }
      P.bancs.push({ x: M, z: M, a: 0 }); P.cyl(M, M, 0.8, 0.9); P.flaque(M, M, 17, [0.22, 0.14, 0.06]);
      P.lum(M, P.sol(M, M) + 1, M + 3, [1, 0.7, 0.35], 1.3, 14); P.lum(M + 9, P.sol(M + 9, M) + 1, M - 6, [1, 0.7, 0.35], 1, 12);
    },
    construire(L, P) {
      for (const p of P.pts) { const y = P.sol(p.x, p.z); L.get('emis').add(G.base('cube'), { m: G.mat(p.x, y + 0.17, p.z, 0.2, 0.3, 0.2, 0, p.k * 3, 0), c: [2.6 + p.k, 1.6 + p.k * 0.5, 0.6] }); G.halo(L, p.x, y + 0.22, p.z, [0.3, 0.19, 0.07], 1.5 + p.k * 0.6); }
      return [];
    },
  };
  B.verger = { // verger d'arbres morts décorés de boules et de petites lumières
    genre: 'bloc', maisons: [0.15, 0.8, 0.5, 0.5],
    plan(P, rng) {
      P.arbres = []; for (let r = 0; r < 3; r++) for (let i = 0; i < 4; i++) { const x = 9.5 + i * 8.3 + rng() * 1.5, z = 8.5 + r * 8 + rng() * 1.5; if (P.libre(x, z, 1.2)) { const h = 5 + rng() * 3; P.morts.push({ x, z, h }); P.arbres.push({ x, z, h }); P.cyl(x, z, 0.4); } }
      P.lampe(M, 6); P.feu(M - 6, M + 3);
    },
    construire(L, P, rng) {
      const cols = [[0.75, 0.1, 0.14], [0.85, 0.65, 0.2], [0.2, 0.3, 0.75], [0.8, 0.8, 0.85]];
      for (const a of P.arbres) { const y = P.sol(a.x, a.z); for (let k = 0; k < 9; k++) { const an = rng() * 6.28, r = 0.8 + rng() * a.h * 0.32, yy = y + a.h * (0.38 + rng() * 0.3), x = a.x + Math.cos(an) * r, z = a.z + Math.sin(an) * r;
        if (k % 3) { L.get('verni').add(G.base('sphereB'), { m: G.mat(x, yy, z, 0.13, 0.13, 0.13), c: cols[k % 4] }); L.get('unie').add(G.base('cyl6'), { m: G.mat(x, yy + 0.3, z, 0.008, 0.5, 0.008), c: [0.5, 0.5, 0.5] }); } else G.ampoule(L, x, yy, z, P.pal.guirlande[k % P.pal.guirlande.length], { rng }); } }
      const y0 = P.sol(M + 6, M - 2); // une échelle oubliée contre un arbre
      for (const sx of [-0.25, 0.25]) L.get('bois').add(G.base('cube'), { m: G.mat(M + 6 + sx, y0 + 1.6, M - 2, 0.06, 3.4, 0.06, 0.25, 0, 0), c: [0.5, 0.4, 0.3] });
      for (let k = 0; k < 7; k++) L.get('bois').add(G.base('cube'), { m: G.mat(M + 6, y0 + 0.4 + k * 0.42, M - 2 + 0.1 * (k * 0.42 + 0.4) * 2.5 - 0.42, 0.5, 0.04, 0.05), c: [0.5, 0.4, 0.3] });
      return [];
    },
  };
  B.bonshommes = { // une armée de bonshommes de neige, tous tournés vers la rue du sud
    genre: 'bloc', maisons: [0, 0.8, 0.35, 0.35], fantomes: true,
    plan(P, rng) {
      for (let r = 0; r < 4; r++) for (let i = 0; i < 7; i++) { const x = 7 + i * 5 + (r % 2) * 2.2 + rng() * 0.8, z = 7 + r * 5.2 + rng() * 0.8; if (rng() < 0.82 && P.libre(x, z, 0.9)) { P.bonshommes.push({ x, z, a: PI + (rng() - 0.5) * 0.5 }); P.cyl(x, z, 0.55); } }
      P.lampe(5.5, 5.5, PI / 2); P.lampe(C - 5.5, 5.5, PI / 2, [1.2, 2.6, 2.8]);
    },
    construire() { return []; },
  };
  B.manoir = { // un seul grand manoir biscornu derrière sa grille
    genre: 'bloc', maisons: 0, lampes: 0.6, humeur: 'ombres',
    plan(P, rng) {
      const aj = (x, z, w, d, st, et) => { P.maisons.push(MONDE.maison(P, rng, x, z, w, d, PI, { style: st, etages: et })); P.boite(x, z, w / 2 + 0.25, d / 2 + 0.25, PI); };
      aj(M, M + 3, 10, 8.5, 'pierre', 3); aj(M - 8, M + 4, 5.2, 5.2, 'tour', 5); aj(M + 8.2, M + 3.5, 6, 7, 'brique', 2); aj(M + 4, M + 9.5, 4.6, 4.6, 'tour', 6);
      const m = 6; for (const [p0, p1] of [[[m, m], [M - 2, m]], [[M + 2, m], [C - m, m]], [[C - m, m], [C - m, C - m]], [[m, C - m], [m, m]], [[m, C - m], [C - m, C - m]]]) { P.clotures.push({ a: p0, b: p1 }); P.boite((p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2, Math.abs(p1[0] - p0[0]) / 2 + 0.1, Math.abs(p1[1] - p0[1]) / 2 + 0.1, 0, 1.3); }
      for (let z = 8; z < M - 4; z += 3.4) for (const sx of [-2.2, 2.2]) P.pts = (P.pts || []).concat([{ x: M + sx, z }]);
      semer(P, rng, 1.5, 3, (x, z) => { P.morts.push({ x, z, h: 6 + rng() * 4 }); P.cyl(x, z, 0.4); }, 8, C - 8);
    },
    construire(L, P) { for (const p of P.pts || []) { const y = P.sol(p.x, p.z); L.get('metal').add(G.base('cyl6'), { m: G.mat(p.x, y + 0.5, p.z, 0.03, 1, 0.03), c: noir }); lampion(L, p.x, y + 1.1, p.z, [1.2, 2.8, 2.4], 0.09); } return []; },
  };
  B.tourelles = { // îlot de tours d'habitation très hautes, reliées par des passerelles
    genre: 'bloc', maisons: 0.9,
    plan(P, rng) {
      P.tours = []; for (const [x, z] of [[M - 4.5, M - 3], [M + 4.5, M - 2], [M, M + 4.5]]) { const H = MONDE.maison(P, rng, x, z, 4.4, 4.4, PI + (rng() - 0.5) * 0.4, { style: 'tour', etages: 5 + Math.floor(rng() * 3) }); P.maisons.push(H); P.tours.push(H); P.boite(x, z, 2.5, 2.5, 0); }
    },
    construire(L, P, rng) {
      for (let i = 0; i < 3; i++) { const a = P.tours[i], b = P.tours[(i + 1) % 3], ya = a.y + 6.5 + i * 2.6, dx = b.x - a.x, dz = b.z - a.z, l = Math.hypot(dx, dz);
        L.get('bois').add(G.base('cube'), { m: G.mat((a.x + b.x) / 2, ya, (a.z + b.z) / 2, l, 0.12, 0.9, 0, -Math.atan2(dz, dx), 0), c: [0.4, 0.3, 0.24], uvm: 'monde' });
        G.guirlande(L, [a.x, ya + 1.1, a.z], [b.x, ya + 1.1, b.z], { couleurs: P.pal.guirlande, rng, creux: 0.25 }); }
      return [];
    },
  };
  B.entrepot = { // montagnes de cadeaux géants et traîneau garé
    genre: 'bloc', maisons: [0.2, 0.8, 0.6, 0.6], humeur: 'fete',
    plan(P, rng) { P.tas = []; semer(P, rng, 3, 5, (x, z) => { P.tas.push({ x, z }); P.cyl(x, z, 2.3); }, 9, C - 12); P.boite(M, 7.5, 2.4, 1, 0); P.lampe(M - 7, 6, PI / 2); P.lampe(M + 7, 6, PI / 2); },
    construire(L, P, rng) {
      const cols = [[0.7, 0.1, 0.12], [0.12, 0.45, 0.2], [0.25, 0.25, 0.7], [0.55, 0.2, 0.6], [0.85, 0.85, 0.85], [0.8, 0.6, 0.15]];
      for (const t of P.tas) { let y = P.sol(t.x, t.z), s = 2.2 + rng() * 1.2; for (let k = 0; k < 5 && s > 0.5; k++) { const h = s * (0.6 + rng() * 0.4); L.get('cadeau').add(G.base('cube'), { m: G.mat(t.x + (rng() - 0.5) * s * 0.4, y + h / 2, t.z + (rng() - 0.5) * s * 0.4, s, h, s, (rng() - 0.5) * 0.1, rng() * 3, (rng() - 0.5) * 0.1), c: cols[Math.floor(rng() * 6)] });
        y += h * 0.96; s *= 0.62 + rng() * 0.15; } for (let k = 0; k < 3; k++) { const s2 = 0.5 + rng() * 0.6, a = rng() * 6.28; L.get('cadeau').add(G.base('cube'), { m: G.mat(t.x + Math.cos(a) * 2.6, P.sol(t.x, t.z) + s2 / 2, t.z + Math.sin(a) * 2.6, s2, s2, s2, 0, rng() * 3, 0), c: cols[Math.floor(rng() * 6)] }); } }
      const w = G.monde(M, P.sol(M, 7.5), 7.5, 0.1); // le traîneau
      L.get('verni').add(G.base('cube'), { m: G.mat(0, 0.75, 0, 3.6, 0.9, 1.5), c: [0.5, 0.08, 0.1], def: v => { v.y += Math.max(0, v.x) * 0.25; }, w });
      for (const sz of [-0.7, 0.7]) { L.get('metal').add(G.base('cube'), { m: G.mat(0, 0.12, sz, 4.6, 0.07, 0.07), c: [0.7, 0.6, 0.3], def: v => { v.y += Math.pow(Math.max(0, v.x - 1.2), 2) * 0.5; }, w }); for (const sx of [-1.2, 1.2]) L.get('metal').add(G.base('cube'), { m: G.mat(sx, 0.25, sz, 0.06, 0.35, 0.06), c: [0.7, 0.6, 0.3], w }); }
      const v = new THREE.Vector3(1.9, 1.75, 0).applyMatrix4(w); lampion(L, v.x, v.y, v.z, ambre, 0.12);
      return [];
    },
  };
  B.ruines = { // maison en ruine : pans de murs troués, arche, corbeaux, une fenêtre encore allumée
    genre: 'bloc', maisons: [0.2, 0.6, 0, 0.6], humeur: 'ombres', fantomes: true,
    plan(P, rng) {
      P.murs = [[M - 6, M - 3, 0.5, 6, 7], [M + 6, M - 1, 0.5, 5, 5], [M, M + 5, 6.5, 0.5, 8], [M - 3, M - 9, 3, 0.5, 4.5]];
      for (const m of P.murs) P.boite(m[0], m[1], m[2] + 0.1, m[3] + 0.1, 0);
      semer(P, rng, 1.4, 4, (x, z) => { P.morts.push({ x, z, h: 5 + rng() * 5 }); P.cyl(x, z, 0.4); }, 7, C - 7);
      P.lum(M, P.sol(M, M + 5) + 4, M + 3.8, [1, 0.75, 0.4], 1.1, 9); P.flaque(M + 1.6, M + 3.2, 3, [0.4, 0.27, 0.12]);
    },
    construire(L, P, rng) {
      for (const m of P.murs) { const y = P.sol(m[0], m[1]), k = rng() * 9;
        L.get('pierre').add(G.base('dalle'), { m: G.mat(m[0], y + m[4] / 2 - 0.8, m[1], m[2] * 2, m[4] + 1.6, m[3] * 2), c: [0.5, 0.5, 0.54], uvm: 'monde', s: 0.5, def: v => { if (v.y > y + m[4] * 0.55) v.y -= NZ.vn((v.x + v.z) * 0.9 + k, k, 7) * m[4] * 0.55; }, ao: v => 0.55 + 0.45 * sstep(y, y + 1.6, v.y) }); }
      const y = P.sol(M, M + 5); L.get('fenetre').add(G.base('plan'), { m: G.mat(M + 1.6, y + 3.6, M + 4.47, 0.9, 1.3, 1, 0, PI, 0), c: P.pal.fenetre(rng), uvr: [0.5, 0.5, 1, 1] });
      for (let k = 0; k < 6; k++) { const m = P.murs[k % 4], x = m[0] + (rng() - 0.5) * m[2] * 1.6, z = m[1] + (rng() - 0.5) * m[3] * 1.6, yy = P.sol(m[0], m[1]) + m[4] * 0.62; L.get('unie').add(G.base('sphereB'), { m: G.mat(x, yy + 0.16, z, 0.13, 0.16, 0.24, 0, rng() * 6, 0), c: [0.03, 0.03, 0.04] }); L.get('unie').add(G.base('cone4'), { m: G.mat(x, yy + 0.25, z + 0.22, 0.04, 0.12, 0.04, PI / 2, 0, 0), c: [0.05, 0.05, 0.05] }); }
      return [(t, dt, ctx) => { if (ctx.eclat > 0.9 && !ctx._c) { ctx._c = 1; ctx.son('corbeau'); } else if (ctx.eclat < 0.1) ctx._c = 0; }];
    },
  };
  B.butte = { // butte de luge : petite colline, torches, luges plantées dans la neige
    genre: 'bloc', maisons: [0, 0.5, 0.3, 0.3], route: 0.8,
    relief(lx, lz, t) { const r = Math.hypot(lx - M, lz - M - 2); if (r < 15) { const k = 1 - r / 15; return t + 5.5 * k * k * (3 - 2 * k); } return t; },
    plan(P, rng) { for (const a of [0.6, 1.9, 3.3, 4.6, 5.7]) P.feu(M + Math.cos(a) * 12.5, M + 2 + Math.sin(a) * 12.5); semer(P, rng, 1.5, 5, (x, z) => { if (Math.hypot(x - M, z - M - 2) > 13) { P.sapins.push({ x, z, h: 4 + rng() * 4, illum: rng() < 0.6 });
      P.cyl(x, z, 0.5); } }, 6, C - 6); P.luges = []; for (let i = 0; i < 5; i++) { const a = rng() * 6.28, r = 3 + rng() * 9; P.luges.push({ x: M + Math.cos(a) * r, z: M + 2 + Math.sin(a) * r, a: rng() * 6, p: rng() < 0.4 }); } },
    construire(L, P) {
      for (const l of P.luges) { const w = G.mat(l.x, P.sol(l.x, l.z) + (l.p ? 0.55 : 0.12), l.z, 1, 1, 1, l.p ? 1.2 : 0, l.a, 0);
        for (const sz of [-0.22, 0.22]) L.get('bois').add(G.base('cube'), { m: G.mat(0, 0, sz, 1.3, 0.05, 0.05), c: [0.55, 0.3, 0.2], def: v => { v.y += Math.pow(Math.max(0, v.x - 0.3), 2) * 0.9; }, w });
        for (let k = 0; k < 4; k++) L.get('bois').add(G.base('cube'), { m: G.mat(-0.45 + k * 0.28, 0.14, 0, 0.2, 0.03, 0.56), c: [0.6, 0.45, 0.32], w }); }
      const y = P.sol(M, M + 2); L.get('bois').add(G.base('cube'), { m: G.mat(M, y + 1, M + 2, 0.1, 2.2, 0.1), c: [0.45, 0.33, 0.25] }); lampion(L, M, y + 2.3, M + 2, ambre, 0.16);
      return [];
    },
  };
  B.placette = { // placette aux lampadaires en bouquet, kiosque à boissons chaudes, bancs
    genre: 'bloc', maisons: 0.9,
    plan(P, rng) { for (let i = 0; i < 3; i++) { const a = i / 3 * 6.28; P.lampe(M + Math.cos(a) * 0.7, M + Math.sin(a) * 0.7, -a, null, 3.2 + i * 0.7); } P.boite(M + 4.5, M - 3, 1.6, 1.2, 0.4); for (const a of [2.2, 3.6, 5]) { const x = M + Math.cos(a) * 4.5, z = M + Math.sin(a) * 4.5; P.bancs.push({ x, z, a: -a - PI / 2 }); P.cyl(x, z, 0.8, 0.9); } P.place = true; },
    construire(L, P, rng) {
      const w = G.monde(M + 4.5, P.sol(M + 4.5, M - 3), M - 3, 0.4);
      L.get('planche').add(G.base('cube'), { m: G.mat(0, 1.1, 0, 3, 2.2, 2.2), c: [0.55, 0.3, 0.26], uvm: 'monde', w });
      L.get('tuiles').add(G.base('pignon'), { m: G.mat(0, 2.2, 0, 3.6, 1.1, 2.8), c: [0.32, 0.26, 0.32], uvm: 'monde', w });
      L.get('fenetre').add(G.base('plan'), { m: G.mat(0, 1.35, 1.12, 2.2, 1.0, 1), c: [2.6, 1.7, 0.8], uvr: [0.5, 0, 1, 0.5], w });
      L.get('bois').add(G.base('cube'), { m: G.mat(0, 0.82, 1.3, 2.6, 0.08, 0.5), c: [0.4, 0.3, 0.22], w });
      G.guirlande(L, [M + 3, P.sol(M + 3, M - 2) + 2.3, M - 1.6], [M + 6, P.sol(M + 6, M - 3) + 2.3, M - 2.6], { couleurs: P.pal.guirlande, rng, creux: 0.2 });
      return [];
    },
  };
  B.chapelle = { // petite chapelle au clocher pointu, vitraux lumineux, quelques tombes
    genre: 'bloc', maisons: [0, 0.6, 0.5, 0.5], humeur: 'ombres',
    plan(P, rng) { P.boite(M, M + 2, 3.6, 5.2, 0); P.boite(M, M - 4.2, 1.7, 1.7, 0); semer(P, rng, 0.9, 9, (x, z) => { P.tombes.push({ x, z, a: PI + (rng() - 0.5) * 0.4, pen: (rng() - 0.5) * 0.25 }); P.boite(x, z, 0.4, 0.2, 0, 1.3); }, 7, C - 12);
      P.sapins.push({ x: M + 9, z: M + 4, h: 9, illum: false }); P.cyl(M + 9, M + 4, 0.6); P.lum(M, P.sol(M, M) + 2.5, M - 6.5, [1, 0.8, 0.5], 1.1, 9); P.flaque(M, M - 7, 3.5, [0.4, 0.3, 0.14]); P.flaque(M - 5.5, M + 2, 4, [0.2, 0.1, 0.3]); P.flaque(M + 5.5, M + 2, 4, [0.1, 0.25, 0.3]); },
    construire(L, P, rng) {
      const y = P.sol(M, M), mur = [0.62, 0.62, 0.66], def = v => { v.x += Math.pow(Math.max(0, v.y - y) / 17, 2) * 2.2; };
      L.get('pierre').add(G.base('boite'), { m: G.mat(M, y + 2, M + 2, 6.6, 6, 10), c: mur, uvm: 'monde', s: 0.45, ao: v => 0.55 + 0.45 * sstep(y, y + 1.6, v.y) });
      L.get('tuiles').add(G.base('pignon'), { m: G.mat(M, y + 5, M + 2, 7.4, 3.8, 10.6), c: [0.26, 0.26, 0.32], uvm: 'monde', s: 0.55 });
      L.get('pierre').add(G.base('boite'), { m: G.mat(M, y + 5.5, M - 4.2, 3, 13, 3), c: mur, uvm: 'monde', s: 0.45, def });
      L.get('tuiles').add(G.base('cone4'), { m: G.mat(M, y + 15.5, M - 4.2, 2.6, 7, 2.6), c: [0.26, 0.26, 0.32], uvm: 'monde', def: v => { const k = clamp((v.y - y - 12) / 7, 0, 1); v.x -= k * k * k * 2; def(v); } });
      L.get('emis').add(G.base('cube'), { m: G.mat(M, y + 10, M - 5.72, 0.9, 1.6, 0.05), c: [2.6, 1.9, 0.8], def }); G.halo(L, M + 0.8, y + 10, M - 5.9, [0.3, 0.2, 0.08], 5);
      L.get('porte').add(G.base('plan'), { m: G.mat(M, y + 1.2, M - 5.73, 1.3, 2.4, 1, 0, PI, 0), c: [1, 1, 1] });
      const vit = [[2.4, 0.5, 2.6], [0.4, 2.2, 2.6], [2.8, 1.6, 0.4], [0.5, 2.4, 0.9]];
      for (let k = 0; k < 4; k++) for (const sx of [-1, 1]) { const z = M - 1.5 + k * 2.3, c = vit[(k + (sx > 0 ? 1 : 0)) % 4]; L.get('emis').add(G.base('plan'), { m: G.mat(M + sx * 3.33, y + 2.6, z, 0.8, 2.2, 1, 0, sx * PI / 2, 0), c }); G.halo(L, M + sx * 3.6, y + 2.6, z, [c[0] * 0.07, c[1] * 0.07, c[2] * 0.07], 3.5); }
      return [(t, dt, ctx) => { if (ctx.d < 16 && !ctx._s) { ctx._s = 1; ctx.son('cloche'); } else if (ctx.d > 40) ctx._s = 0; }];
    },
  };

  // ---------- MERVEILLES ----------
  W.arbre_lanternes = {
    nom: 'L’Arbre aux Mille Lanternes', desc: 'Chaque lanterne est un vœu que quelqu’un a oublié de reprendre. L’arbre, lui, se souvient de tout.',
    sansPlace: true, maisons: false, humeur: 'neige',
    plan(P, rng) { P.cyl(M, M, 1.6); P.lum(M, P.sol(M, M) + 6, M - 2, [1, 0.7, 0.35], 2, 18); P.lum(M + 4, P.sol(M, M) + 11, M + 3, [1, 0.6, 0.3], 1.6, 16); P.flaque(M, M, 14, [0.4, 0.26, 0.1]); P.cercle = []; for (let i = 0; i < 16; i++) { const a = i / 16 * 6.28; P.cercle.push({ x: M + Math.cos(a) * 8.5, z: M + Math.sin(a) * 8.5 }); } },
    construire(L, P, rng, groupe) {
      const y = P.sol(M, M); G.arbreMort(L, G.monde(M, y, M, 0.7), NZ.rng(11), 24); G.arbreMort(L, G.monde(M, y + 1, M, 2.9), NZ.rng(23), 19);
      for (let k = 0; k < 170; k++) { const a = rng() * 6.28, r = 1.5 + rng() * 8.5, yy = y + 6 + rng() * 11 - r * 0.25; G.ampoule(L, M + Math.cos(a) * r, yy, M + Math.sin(a) * r, [3, 1.6 + rng() * 0.9, 0.5 + rng() * 0.4], { rng }); }
      const L2 = G.Lots(); // gros lampions qui se balancent
      for (let k = 0; k < 14; k++) { const a = k / 14 * 6.28 + rng(), r = 2.5 + rng() * 6, yy = 5.5 + rng() * 7; L2.get('metal').add(G.base('cyl6'), { m: G.mat(Math.cos(a) * r, yy + 1, Math.sin(a) * r, 0.012, 2, 0.012), c: noir });
        L2.get('emis').add(G.base('cyl8'), { m: G.mat(Math.cos(a) * r, yy - 0.15, Math.sin(a) * r, 0.2, 0.42, 0.2), c: [3.2, 1.7 + rng() * 0.6, 0.5] }); G.halo(L2, Math.cos(a) * r, yy - 0.15, Math.sin(a) * r, [0.4, 0.24, 0.08], 4.5); }
      const lamp = maill(L2); lamp.position.set(M, y, M); groupe.add(lamp);
      for (const p of P.cercle) { const yy = P.sol(p.x, p.z); L.get('emis').add(G.base('cube'), { m: G.mat(p.x, yy + 0.18, p.z, 0.22, 0.32, 0.22), c: [3, 1.9, 0.7] }); G.halo(L, p.x, yy + 0.2, p.z, [0.3, 0.19, 0.07], 2); }
      return [(t) => { lamp.rotation.z = Math.sin(t * 0.5) * 0.012; lamp.rotation.x = Math.cos(t * 0.37) * 0.012; }];
    },
  };
  W.boule_neige = {
    nom: 'La Grande Boule à Neige', desc: 'Dedans, une petite ville sous la neige. Regarde bien : quelqu’un y tient une lanterne et lève les yeux vers toi.',
    maisons: true, boucle: 'manege',
    plan(P) { P.cyl(M, M, 5.2); const y = P.sol(M, M); P.lum(M, y + 4.5, M - 5.5, [0.8, 0.9, 1], 1.6, 14); P.lum(M, y + 3.5, M, [1, 0.75, 0.4], 1.2, 9); P.flaque(M, M, 9, [0.22, 0.26, 0.36]); },
    construire(L, P, rng, groupe) {
      const y = P.sol(M, M), R = 4.6, yc = y + 2.3 + R;
      L.get('bois').add(G.base('cyl16'), { m: G.mat(M, y + 0.7, M, 5, 1.8, 5), c: [0.35, 0.2, 0.16], uvm: 'monde' });
      L.get('verni').add(G.base('cyl16'), { m: G.mat(M, y + 1.9, M, 4.3, 0.7, 4.3), c: [0.75, 0.6, 0.25] });
      L.get('verni').add(G.base('tore'), { m: G.mat(M + 5.3, y + 1.1, M, 0.55, 0.55, 0.35, 0, PI / 2, 0), c: [0.8, 0.65, 0.3] });
      L.get('neige').add(G.base('bosse'), { m: G.mat(M, y + 2.2, M, 3.9, 1.1, 3.9), c: [1, 1, 1] });
      // la petite scène : maison, sapin, promeneur à la lanterne
      L.get('platre').add(G.base('cube'), { m: G.mat(M - 0.9, y + 3.9, M, 1.7, 1.5, 1.5), c: [0.6, 0.5, 0.56] });
      L.get('tuiles').add(G.base('pignon'), { m: G.mat(M - 0.9, y + 4.65, M, 2.1, 1.3, 1.9), c: [0.3, 0.25, 0.34] });
      L.get('emis').add(G.base('plan'), { m: G.mat(M - 0.9, y + 3.9, M + 0.77, 0.5, 0.6, 1), c: [3, 2, 0.8] }); L.get('emis').add(G.base('plan'), { m: G.mat(M - 0.9, y + 3.9, M - 0.77, 0.5, 0.6, 1, 0, PI, 0), c: [3, 2, 0.8] });
      G.sapin(L, G.monde(M + 1.5, y + 3.1, M + 0.3, 0), NZ.rng(4), 2.6, P.pal, true);
      L.get('unie').add(G.base('cone8'), { m: G.mat(M + 0.4, y + 3.55, M - 1.3, 0.14, 0.7, 0.14), c: [0.1, 0.1, 0.14] }); L.get('unie').add(G.base('sphereB'), { m: G.mat(M + 0.4, y + 3.98, M - 1.3, 0.1, 0.1, 0.1), c: [0.1, 0.1, 0.14] }); lampion(L, M + 0.62, y + 3.6, M - 1.3, ambre, 0.045);
      // le globe de verre et la neige qui tourbillonne dedans
      const verre = MAT.patch(new THREE.MeshStandardMaterial({ color: 0xbfd6ee, transparent: true, opacity: 0.16, roughness: 0.04, metalness: 0.1, envMapIntensity: 2.4, depthWrite: false }), { cle: 'globe' });
      const sph = new THREE.Mesh(new THREE.SphereGeometry(R, 32, 20), verre); sph.position.set(M, yc, M); sph.renderOrder = 6; sph.userData.matPropre = true; groupe.add(sph);
      const L2 = G.Lots(); for (let k = 0; k < 260; k++) { const a = rng() * 6.28, b = Math.acos(rng() * 2 - 1), r = R * 0.93 * Math.cbrt(rng()); G.ampoule(L2, Math.sin(b) * Math.cos(a) * r, Math.cos(b) * r, Math.sin(b) * Math.sin(a) * r, [0.7, 0.75, 0.85], { rng }); }
      const fl = maill(L2); fl.position.set(M, yc, M); groupe.add(fl);
      return [(t, dt, ctx) => { fl.rotation.y = t * (0.25 + ctx.eclat * 2.5); fl.rotation.z = Math.sin(t * 0.3) * 0.25; }];
    },
  };
  W.grande_porte = {
    nom: 'La Grande Porte Sans Mur', desc: 'Une porte, et rien autour. Ceux qui la franchissent jurent qu’ils arrivent exactement au même endroit, mais un peu changés.',
    maisons: false,
    plan(P) { for (const sx of [-4.2, 4.2]) P.boite(M + sx, M, 1.3, 1.3, 0); const y = P.sol(M, M); P.lum(M, y + 3, M - 3, [1, 0.9, 0.7], 2.4, 18); P.lum(M, y + 3, M + 3, [1, 0.9, 0.7], 2, 16); P.flaque(M, M - 5, 9, [0.6, 0.5, 0.32]); P.flaque(M, M + 5, 8, [0.5, 0.42, 0.28]); for (const sx of [-8, 8]) for (const sz of [-7, 7]) P.lampe(M + sx, M + sz, 0, [2.2, 2.6, 3.2]); },
    construire(L, P, rng, groupe) {
      const y = P.sol(M, M), pi = [0.5, 0.5, 0.56], def = v => { const k = Math.max(0, v.y - y) / 14; v.z += Math.sin(k * 3) * 0.5; v.x += k * k * 0.9; };
      for (const sx of [-4.2, 4.2]) { L.get('pierre').add(G.base('boite'), { m: G.mat(M + sx, y + 5.5, M, 2.4, 13, 2.4), c: pi, uvm: 'monde', s: 0.45, def, ao: v => 0.5 + 0.5 * sstep(y, y + 2, v.y) }); L.get('pierre').add(G.base('cone4'), { m: G.mat(M + sx, y + 14.2, M, 1.9, 4.5, 1.9), c: pi, def }); lampion(L, M + sx + 0.9 + 1.1, y + 16.6, M + 0.4, [2.4, 2.8, 3.4], 0.2); }
      L.get('pierre').add(G.base('pignon'), { m: G.mat(M, y + 11, M, 10.5, 3.6, 2.2), c: pi, uvm: 'monde', def }); L.get('pierre').add(G.base('cube'), { m: G.mat(M, y + 10.6, M, 10.2, 1.1, 2), c: pi, uvm: 'monde', def });
      for (const sx of [-1, 1]) L.get('bois').add(G.base('cube'), { m: G.mat(M + sx * 2.35, y + 5, M - 0.9, 0.18, 10, 2.9, 0, sx * 0.55, 0), c: [0.32, 0.22, 0.18], uvm: 'monde', def });
      const mat = MAT.patch(new THREE.MeshBasicMaterial({ color: new THREE.Color(3.2, 2.7, 1.9), toneMapped: false, side: THREE.DoubleSide }), { cle: 'porteL' });
      const lueur = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 9.6), mat); lueur.position.set(M + 0.35, y + 5, M); lueur.userData.matPropre = true; groupe.add(lueur);
      G.halo(L, M + 0.35, y + 5, M - 0.6, [0.5, 0.42, 0.28], 14); G.halo(L, M + 0.35, y + 5, M + 0.6, [0.5, 0.42, 0.28], 12);
      let cote = 0;
      return [(t, dt, ctx) => { const k = 1 + Math.sin(t * 1.3) * 0.12 + ctx.eclat * 1.5; mat.color.setRGB(3.2 * k, 2.7 * k, 1.9 * k); const c2 = ctx.jz > M ? 1 : -1; if (cote && c2 !== cote && Math.abs(ctx.jx - M) < 2.8) ctx.son('cloche'); cote = c2; }];
    },
  };
  W.geant = {
    nom: 'Le Géant Endormi', desc: 'Il s’est couché là pour une petite sieste, il y a cent hivers. Marche doucement : il ronfle en flocons.',
    sansPlace: true, maisons: false, humeur: 'neige',
    plan(P) { P.boite(M + 1, M + 2, 9.5, 4, 0); P.lampe(M - 9, M - 5, 0); P.lampe(M + 11, M - 4, PI); P.flaque(M - 8, M + 1, 5, [0.3, 0.2, 0.1]); P.lum(M - 8.5, P.sol(M, M) + 3, M - 2, [1, 0.75, 0.45], 1.4, 12); },
    construire(L, P, rng, groupe) {
      const y = P.sol(M, M + 2), bl = [0.95, 0.96, 1];
      const L2 = G.Lots(); L2.get('neige').add(G.base('sphere'), { m: G.mat(0, 0, 0, 5.4, 4, 4.2), c: bl, uvm: 'monde' }); L2.get('neige').add(G.base('sphere'), { m: G.mat(5.6, -0.5, 0.2, 3.6, 3, 3.3), c: bl, uvm: 'monde' });
      for (let k = 0; k < 3; k++) L2.get('unie').add(G.base('sphereB'), { m: G.mat(-1.5 + k * 1.6, 2.4 + (k === 1 ? 0.5 : 0.25), -3.1 - (k === 1 ? 0.3 : 0), 0.28, 0.28, 0.2), c: [0.04, 0.04, 0.05] });
      const corps = maill(L2); corps.position.set(M + 1, y + 2.6, M + 2); groupe.add(corps);
      L.get('neige').add(G.base('sphere'), { m: G.mat(M - 6.4, y + 2.6, M + 1.6, 2.7, 2.6, 2.6), c: bl, uvm: 'monde' });
      L.get('unie').add(G.base('cone8'), { m: G.mat(M - 7.2, y + 3, M - 1.6, 0.3, 2.2, 0.3, -PI / 2 + 0.2, 0, 0.3), c: [1, 0.42, 0.06] });
      L.get('tissu').add(G.base('tore'), { m: G.mat(M - 3.9, y + 2.5, M + 1.7, 2.3, 2.3, 1.6, 0, PI / 2, 0), c: [0.75, 0.15, 0.18] });
      L.get('unie').add(G.base('cone12'), { m: G.mat(M - 8.6, y + 4.2, M + 1.8, 1.9, 3.4, 1.9, 0, 0, 1.15), c: [0.2, 0.3, 0.55], def: v => { v.y -= Math.pow(Math.max(0, M - 8.6 - v.x), 2) * 0.12; } });
      L.get('neige').add(G.base('sphereB'), { m: G.mat(M - 11.3, y + 3.9, M + 1.8, 0.6, 0.6, 0.6), c: bl });
      for (const sz of [-0.75, 0.75]) L.get('unie').add(G.base('cube'), { m: G.mat(M - 7.1 - Math.abs(sz) * 0.1, y + 3.55, M - 0.75 + sz * 0.9, 0.9, 0.09, 0.09, 0, 0.5, 0.15 * Math.sign(sz)), c: [0.04, 0.04, 0.05] });
      const oeil = MAT.patch(new THREE.MeshBasicMaterial({ color: new THREE.Color(0, 0, 0), toneMapped: false }), { cle: 'oeilG' });
      const o = new THREE.Mesh(new THREE.SphereGeometry(0.3, 10, 8), oeil); o.position.set(M - 7.5, y + 3.5, M - 0.72); o.scale.set(1, 0.05, 1); o.userData.matPropre = true; groupe.add(o);
      return [(t, dt, ctx) => { const s = 1 + Math.sin(t * 0.7) * 0.035; corps.scale.set(1, s, s); const k = ctx.eclat; o.scale.y = 0.05 + k * 0.95; oeil.color.setRGB(3.2 * k, 2.2 * k, 0.6 * k); }];
    },
  };
  W.phare = {
    nom: 'Le Phare des Égarés', desc: 'Il n’y a pas de mer ici. Le phare tourne quand même, pour ceux qui se sont perdus en chemin… comme toi, peut-être.',
    maisons: true,
    plan(P) { P.cyl(M, M, 3.4); const y = P.sol(M, M); P.lum(M, y + 3, M - 4.5, [1, 0.8, 0.5], 1.4, 11); P.flaque(M, M - 4.6, 4, [0.4, 0.3, 0.14]); },
    construire(L, P, rng, groupe) {
      const y = P.sol(M, M), H = 19, def = v => { const k = Math.max(0, v.y - y) / H; v.x += Math.sin(k * 2.6) * 1.1; v.z += k * k * 0.8; };
      L.get('pierre').add(G.base('cyl16'), { m: G.mat(M, y + 0.6, M, 3.6, 2.6, 3.6), c: [0.55, 0.55, 0.6], uvm: 'monde' });
      for (let k = 0; k < 6; k++) { const r0 = 2.9 - k * 0.3; L.get(k % 2 ? 'verni' : 'unie').add(G.base('cyl12'), { m: G.mat(M, y + 1.9 + k * 2.75 + 1.37, M, r0, 2.75, r0), c: k % 2 ? [0.6, 0.1, 0.12] : [0.85, 0.85, 0.88], def }); }
      L.get('metal').add(G.base('cyl16'), { m: G.mat(M, y + H - 0.4, M, 2.3, 0.2, 2.3), c: noir, def }); L.get('metal').add(G.base('toreFin'), { m: G.mat(M, y + H + 0.6, M, 2.2, 2.2, 2.2, PI / 2, 0, 0), c: noir, def });
      L.get('metal').add(G.base('cone12'), { m: G.mat(M, y + H + 3.3, M, 1.5, 2.2, 1.5), c: [0.25, 0.1, 0.1], def: v => { const k = clamp((v.y - y - H - 2.2) / 2.2, 0, 1); v.x += k * k * 0.9; def(v); } });
      L.get('porte').add(G.base('plan'), { m: G.mat(M, y + 2.6, M - 2.95, 1.2, 2.3, 1, 0, PI, 0), c: [1, 1, 1] });
      const top = new THREE.Vector3(M, y + H + 1.1, M); def(top);
      L.get('emis').add(G.base('cyl12'), { m: G.mat(top.x, top.y, top.z, 0.95, 1.7, 0.95), c: [3.4, 3, 2] }); G.halo(L, top.x, top.y, top.z, [0.5, 0.45, 0.3], 11);
      const fm = MAT.patch(new THREE.MeshBasicMaterial({ color: new THREE.Color(0.5, 0.46, 0.34), transparent: true, opacity: 0.2, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false }), { cle: 'faisceau' });
      const cone = new THREE.CylinderGeometry(0.5, 5, 36, 14, 1, true); cone.rotateZ(PI / 2); cone.translate(18, 0, 0);
      const fa = new THREE.Group(); for (const s of [0, PI]) { const m = new THREE.Mesh(cone, fm); m.rotation.y = s; m.renderOrder = 5; fa.add(m); } fa.children[0].userData.matPropre = true; fa.position.copy(top); groupe.add(fa);
      return [(t) => { fa.rotation.y = t * 0.35; }];
    },
  };
  W.montgolfiere = {
    nom: 'La Montgolfière Captive', desc: 'Elle tire sur ses cordes depuis des années. Un jour elle partira, et la ville entière lèvera le nez.',
    maisons: false,
    plan(P) { P.piq = []; for (let i = 0; i < 4; i++) { const a = i / 4 * 6.28 + 0.6, x = M + Math.cos(a) * 9, z = M + Math.sin(a) * 9; P.piq.push({ x, z }); P.cyl(x, z, 0.3); } const y = P.sol(M, M); P.lum(M, y + 6, M, [1, 0.6, 0.25], 2.4, 20); P.flaque(M, M, 11, [0.5, 0.3, 0.1]); },
    construire(L, P, rng, groupe) {
      const y = P.sol(M, M), L2 = G.Lots();
      L2.get('tissu').add(G.base('sphere'), { m: G.mat(0, 9.5, 0, 5.4, 6.2, 5.4), c: [0.8, 0.25, 0.22], def: v => { if (v.y < 7.5) { const k = (7.5 - v.y) / 4.5; v.x *= 1 - k * 0.55; v.z *= 1 - k * 0.55; } } });
      L2.get('bois').add(G.base('cube'), { m: G.mat(0, 0, 0, 1.7, 1.2, 1.7), c: [0.55, 0.4, 0.26], uvm: 'monde' });
      for (const [sx, sz] of [[-0.8, -0.8], [0.8, -0.8], [-0.8, 0.8], [0.8, 0.8]]) L2.get('unie').add(G.base('cyl6'), { m: G.mat(sx * 1.25, 2.2, sz * 1.25, 0.02, 3.6, 0.02, sz * 0.24, 0, -sx * 0.24), c: [0.5, 0.45, 0.35] });
      for (let k = 0; k < 10; k++) { const a = k / 10 * 6.28; G.ampoule(L2, Math.cos(a) * 5.45, 9.5, Math.sin(a) * 5.45, P.pal.guirlande[k % P.pal.guirlande.length], { rng }); }
      const bal = maill(L2); bal.position.set(M, y + 6, M); groupe.add(bal);
      const fm = MAT.patch(new THREE.MeshBasicMaterial({ color: new THREE.Color(3, 1.6, 0.4), toneMapped: false }), { cle: 'bruleur' });
      const fl = new THREE.Mesh(new THREE.ConeGeometry(0.35, 1.6, 8), fm); fl.position.set(0, 1.9, 0); fl.userData.matPropre = true; bal.add(fl);
      for (const p of P.piq) { const yy = P.sol(p.x, p.z); L.get('bois').add(G.base('cyl6'), { m: G.mat(p.x, yy + 0.4, p.z, 0.12, 1, 0.12), c: [0.4, 0.3, 0.22] });
        const dx = M - p.x, dz = M - p.z, dh = y + 5.5 - yy - 0.8, l = Math.hypot(dx, dz, dh), q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx / l, dh / l, dz / l));
        L.get('unie').add(G.base('cyl6'), { m: new THREE.Matrix4().compose(new THREE.Vector3((p.x + M) / 2, (yy + 0.8 + y + 5.5) / 2, (p.z + M) / 2), q, new THREE.Vector3(0.02, l, 0.02)), c: [0.5, 0.45, 0.35] }); }
      return [(t, dt, ctx) => { bal.position.y = y + 6 + Math.sin(t * 0.6) * 0.35; bal.rotation.z = Math.sin(t * 0.43) * 0.03; const k = Math.max(0, Math.sin(t * 0.9) * 2 - 1) + ctx.eclat; fl.scale.set(1, 0.3 + k * 1.6, 1); fm.color.setRGB(1 + k * 4, 0.5 + k * 2.2, 0.15 + k * 0.6); }];
    },
  };
  W.dragon = {
    nom: 'Le Dragon de Lampions', desc: 'Du papier, des bougies et beaucoup d’orgueil. Il ondule au-dessus de la place en attendant qu’on l’applaudisse.',
    maisons: false, humeur: 'fete',
    plan(P) { P.per = []; for (let i = 0; i < 7; i++) { const x = 6.5 + i * 5.2, z = M + Math.sin(i * 1.1) * 6; P.per.push({ x, z }); P.cyl(x, z, 0.18); } const y = P.sol(M, M); P.lum(M - 8, y + 4, M, [1, 0.45, 0.2], 2, 16); P.lum(M + 8, y + 4, M, [1, 0.6, 0.2], 2, 16); P.flaque(M, M, 15, [0.45, 0.2, 0.07]); },
    construire(L, P, rng, groupe) {
      const segs = [], yb = P.sol(M, M) + 4.6, n = 22;
      for (let i = 0; i < n; i++) { const L2 = G.Lots(), k = i / (n - 1), r = i === 0 ? 1.15 : 0.85 * (1 - k * 0.55), c = i % 2 ? [3, 0.5, 0.25] : [3, 1.9, 0.5];
        L2.get('emis').add(G.base(i === 0 ? 'sphere' : 'sphereB'), { m: G.mat(0, 0, 0, r * (i === 0 ? 1.3 : 1), r, r), c }); G.halo(L2, 0, 0, 0, [c[0] * 0.09, c[1] * 0.09, c[2] * 0.09], r * 7);
        if (i === 0) { for (const sz of [-0.5, 0.5]) { L2.get('emis').add(G.base('sphereB'), { m: G.mat(1.05, 0.45, sz, 0.2, 0.2, 0.2), c: [3.4, 3.4, 2.6] }); L2.get('unie').add(G.base('cone8'), { m: G.mat(0.2, 1.1, sz, 0.14, 1.1, 0.14, 0, 0, -0.5), c: [0.7, 0.55, 0.2] }); } L2.get('unie').add(G.base('cone4'), { m: G.mat(1.5, -0.25, 0, 0.5, 0.9, 0.7, 0, 0, -PI / 2), c: [0.6, 0.1, 0.1] }); }
        else if (i % 3 === 0) L2.get('unie').add(G.base('cone4'), { m: G.mat(0, r + 0.3, 0, 0.25, 0.7, 0.1), c: [0.75, 0.6, 0.2] });
        const m = maill(L2); groupe.add(m); segs.push(m); }
      for (const p of P.per) { const yy = P.sol(p.x, p.z); L.get('bois').add(G.base('cyl6'), { m: G.mat(p.x, yy + 2, p.z, 0.05, 4.2, 0.05), c: [0.45, 0.33, 0.25] }); }
      for (let i = 0; i + 1 < P.per.length; i += 2) { const a = P.per[i], b = P.per[i + 1]; G.guirlande(L, [a.x, P.sol(a.x, a.z) + 2.4, a.z], [b.x, P.sol(b.x, b.z) + 2.4, b.z], { couleurs: [[3, 0.5, 0.3], [3, 2, 0.5]], rng, creux: 0.5 }); }
      return [(t) => { for (let i = 0; i < n; i++) { const u = t * 0.55 - i * 0.26, x = M + Math.cos(u * 0.6) * (15 - i * 0.0), z = M + Math.sin(u * 1.2) * 6.5; segs[i].position.set(M + Math.sin(u * 0.6) * 15.5, yb + Math.sin(u * 2.1) * 1.1 + (i === 0 ? 0.3 : 0), z); if (i === 0) segs[i].rotation.y = -Math.atan2(Math.cos(u * 1.2) * 6.5 * 1.2, Math.cos(u * 0.6) * 15.5 * 0.6); } }];
    },
  };
  W.etoile_tombee = {
    nom: 'L’Étoile Tombée', desc: 'Elle a raté le sommet d’un sapin de quelques rues. Elle boude au fond de son trou, et elle brille quand même.',
    sansPlace: true, maisons: false, humeur: 'neige',
    relief(lx, lz, t) { const r = Math.hypot(lx - M, lz - M); if (r >= 15) return t; const k = 1 - r / 15; return t - 4.2 * k * k * (3 - 2 * k) + 1.1 * Math.exp(-Math.pow((r - 11.5) / 2, 2)); },
    plan(P) { P.cyl(M, M, 1.7); const y = P.sol(M, M); P.lum(M, y + 2.5, M, [0.6, 0.85, 1], 3, 22); P.lum(M + 3, y + 5, M - 3, [0.7, 0.8, 1], 1.5, 16); P.flaque(M, M, 12, [0.2, 0.34, 0.5]); },
    construire(L, P, rng, groupe) {
      const y = P.sol(M, M);
      for (let k = 0; k < 9; k++) { const a = rng() * 6.28, r = 2.2 + rng() * 4; L.get('pierre').add(G.base('ico'), { m: G.mat(M + Math.cos(a) * r, P.sol(M + Math.cos(a) * r, M + Math.sin(a) * r) + 0.2, M + Math.sin(a) * r, 0.5 + rng() * 0.6, 0.4 + rng() * 0.5, 0.5 + rng() * 0.6, rng() * 3, rng() * 3, 0), c: [0.14, 0.14, 0.17] }); }
      const em = MAT.patch(new THREE.MeshBasicMaterial({ color: new THREE.Color(1.6, 2.6, 3.4), toneMapped: false }), { cle: 'etoileT' });
      const geo = new THREE.OctahedronGeometry(1, 0), et = new THREE.Group();
      for (const [sx, sy, sz, rz] of [[0.75, 2.6, 0.75, 0], [0.6, 2.1, 0.6, PI / 2], [0.6, 2.1, 0.6, PI / 4], [0.6, 2.1, 0.6, -PI / 4]]) { const m = new THREE.Mesh(geo, em); m.scale.set(sx, sy, sz); m.rotation.z = rz; et.add(m); }
      et.children[0].userData.matPropre = true; et.position.set(M, y + 1.9, M); et.rotation.set(0.35, 0, 0.3); groupe.add(et);
      G.halo(L, M, y + 2, M, [0.3, 0.5, 0.7], 16); G.halo(L, M, y + 2, M, [0.5, 0.8, 1.0], 5);
      const ecl = new THREE.Group(); for (let k = 0; k < 9; k++) { const m = new THREE.Mesh(geo, em); const a = k / 9 * 6.28; m.position.set(Math.cos(a) * (3.2 + (k % 3) * 0.9), 1.5 + (k % 4) * 0.9, Math.sin(a) * (3.2 + (k % 3) * 0.9)); m.scale.set(0.1, 0.34, 0.1); m.rotation.set(k, k * 2, k * 3); ecl.add(m); } ecl.position.set(M, y + 1, M); groupe.add(ecl);
      return [(t, dt, ctx) => { const k = 0.75 + Math.sin(t * 1.1) * 0.25 + ctx.eclat * 1.6; em.color.setRGB(1.6 * k, 2.6 * k, 3.4 * k); ecl.rotation.y = t * 0.22; et.rotation.y = Math.sin(t * 0.3) * 0.2; }];
    },
  };
  Object.assign(REPERES, B, W);
})();
