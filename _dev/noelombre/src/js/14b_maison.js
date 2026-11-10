/* ===================== MAISON TORDUE (version 2 : styles, colombages, vitrines, toits enneigés) =====================
   h (fiche faite par MONDE.maison) : { w, d, etages, hE, hToit, style: 'colombage'|'pierre'|'brique'|'boutique'|
   'chalet'|'tour', toit: 'pignon'|'pointe'|'croupe'|'tour', mur, cMur, cBois, cToit, porteX, fenType, pAllume,
   pGuirlande, torsion, courbe }. Repère local : façade vers +z, sol de la rue à y = 0, plancher à y = 0,45.
   Renvoie { lumieres, flaques, cheminee, hauteur } en coordonnées locales de la maison. */
GEO.maison = function (L, h, w, rng, pal) {
  const G = GEO, gr = h.graine || 0, W = h.w, D = h.d, nE = h.etages, hE = h.hE, st = h.style || 'colombage', Y0 = 0.45;
  const Htot = Y0 + nE * hE + h.hToit, tw = h.torsion, bx = h.courbe[0], bz = h.courbe[1];
  const def = v => { const t = Math.max(0, v.y) / Htot, a = tw * t, c = Math.cos(a), s = Math.sin(a), x = v.x, z = v.z; v.x = x * c - z * s + bx * t * t * Htot * 0.08; v.z = x * s + z * c + bz * t * t * Htot * 0.08; };
  const out = { lumieres: [], flaques: [] };
  const cMur = h.cMur, cB = h.cBois, cT = h.cToit, noir = [0.18, 0.18, 0.2];
  const add = (k, g, m, c, o) => L.get(k).add(G.base(g), Object.assign({ m, c, def, w }, o));
  const halo = (x, y, z, c, t) => L.get('halos', true).add(G.base('pt'), { m: G.mat(x, y, z, 1, 1, 1), c, x: t, def, w });
  const amp = (x, y, z, c) => L.get('ampoules', true).add(G.base('pt'), { m: G.mat(x, y, z, 1, 1, 1), c, x: rng(), def, w });
  const boutique = st === 'boutique', cote = h.porteX >= 0 ? 1 : -1;
  const pX = boutique ? cote * (W / 2 - 0.95) : h.porteX;
  // soubassement de pierre (descend sous le sol pour les pentes)
  add('moellon', 'cubeS', G.mat(0, -1.25, 0, W + 0.12, 3.4, D + 0.12), [0.62, 0.6, 0.6], { uvm: 'monde', s: 0.4 });
  let y = Y0, ew = W, ed = D;
  const jet = st === 'colombage' ? 0.2 : boutique ? 0.12 : 0;
  const atlas = [[0, 0.5, 0.5, 1], [0.5, 0.5, 1, 1], [0, 0, 0.5, 0.5], [0.5, 0, 1, 0.5]];
  const volets = (st === 'pierre' || st === 'chalet' || st === 'brique') && rng() < 0.6, cVolet = rng.p([[0.25, 0.4, 0.3], [0.45, 0.2, 0.2], [0.25, 0.3, 0.5], [0.5, 0.42, 0.3]]);
  for (let e = 0; e < nE; e++) {
    if (e > 0) { ew += jet; ed += jet * 0.6; }
    const socle = e === 0 && (st === 'colombage' || boutique) && gr % 2 === 0, matE = socle ? 'moellon' : (h.mur === 'pierre' ? 'moellon' : h.mur), cE = socle ? [0.72, 0.7, 0.7] : cMur, y0 = y;
    const ao = e === 0 ? (v => 0.5 + 0.5 * sstep(y0 - 0.2, y0 + 1.5, v.y)) : (v => 1 - 0.28 * sstep(y0 + hE - 0.7, y0 + hE, v.y) - 0.15 * (1 - sstep(y0, y0 + 0.4, v.y)));
    add(matE, 'boite', G.mat(0, y + hE / 2, 0, ew, hE, ed), cE, { uvm: 'monde', s: 0.4, ao });
    // ceintures de bois (une boîte fait le tour) + poteaux d'angle
    add('bois', 'cubeS', G.mat(0, y + hE - 0.08, 0, ew + 0.14, 0.17, ed + 0.14), cB, { uvm: 'monde', s: 0.6 });
    if (st === 'colombage' && !socle) {
      add('bois', 'cubeS', G.mat(0, y + 0.08, 0, ew + 0.1, 0.16, ed + 0.1), cB, { uvm: 'monde', s: 0.6 });
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) add('bois', 'cube', G.mat(sx * (ew / 2 - 0.04), y + hE / 2, sz * (ed / 2 - 0.04), 0.17, hE, 0.17), cB, { uvm: 'monde', s: 0.6 });
    }
    const faces = [[0, ew, ed / 2], [Math.PI, ew, ed / 2], [Math.PI / 2, ed, ew / 2], [-Math.PI / 2, ed, ew / 2]];
    for (let f = 0; f < 4; f++) {
      const [ry, larg, prof] = faces[f], cs = Math.cos(ry), sn = Math.sin(ry);
      if (f === 1 && rng() < 0.6) continue;
      const pos = (lx, off) => [cs * lx + sn * (prof + off), -sn * lx + cs * (prof + off)];
      // vitrine de boutique au rez-de-chaussée
      if (boutique && e === 0 && f === 0) {
        const vw = W - 2.9, vx = -cote * 0.85, col = pal.fenetre(rng).map(v => v * 1.25), [px, pz] = pos(vx, 0.06);
        add('bois', 'cube', G.mat(px, y + 1.25, pz - 0.03, vw + 0.3, 2.0, 0.12), cB.map(v => v * 0.7), {});
        add('fenetre', 'plan', G.mat(px, y + 1.25, pz + 0.05, vw, 1.75, 1), col, { uvr: atlas[3] });
        add('tissu', 'cube', G.mat(px, y + 2.55, pz + 0.62, vw + 0.5, 0.06, 1.35, 0.42, 0, 0), rng.p([[0.8, 0.2, 0.2], [0.2, 0.45, 0.3], [0.75, 0.6, 0.2]]), {});
        add('bois', 'cube', G.mat(pX * 0.2, y + hE + 0.25, pz + 0.12, Math.min(2.6, W - 1.5), 0.55, 0.08), cB, {});
        out.flaques.push({ x: px, z: pz + 2, r: 3.4, c: [col[0] * 0.2, col[1] * 0.17, col[2] * 0.12] });
        out.lumieres.push({ x: px, y: y + 1.4, z: pz + 1.2, c: col.map(v => Math.min(1, v / 2.6)), i: 1.3, r: 9 });
        continue;
      }
      const nf = Math.max(1, Math.floor((larg - 0.5) / 1.8)), fw = 0.78 + rng() * 0.22, fh = 1.15 + rng() * 0.3, genre = (h.fenType + (e > 0 && gr % 3 === 0 ? 1 : 0)) % 4;
      for (let k = 0; k < nf; k++) {
        const lx = ((k + 0.5) / nf - 0.5) * (larg - 0.5), fy = y + hE * 0.54;
        if (e === 0 && f === 0 && Math.abs(lx - pX) < 1.15) continue; // place de la porte
        if (f > 1 && rng() < 0.35) continue;
        const allume = rng() < h.pAllume, col = allume ? pal.fenetre(rng) : [0.03, 0.035, 0.05], [px, pz] = pos(lx, 0.035);
        add('fenetre', 'plan', G.mat(px, fy, pz, fw, fh, 1, 0, ry), col, { uvr: atlas[genre] });
        add(st === 'pierre' || st === 'brique' ? 'pierre' : 'bois', 'cube', G.mat(px + sn * 0.09, fy - fh / 2 - 0.05, pz + cs * 0.09, fw + 0.3, 0.09, 0.3, 0, ry), st === 'pierre' || st === 'brique' ? [0.62, 0.6, 0.6] : cB, {});
        if (volets && f !== 1) for (const sd of [-1, 1]) { const o2 = sd * (fw * 0.78); add('bois', 'cube', G.mat(px + cs * o2 + sn * 0.02, fy, pz - sn * o2 + cs * 0.02, fw * 0.5, fh, 0.05, 0, ry), cVolet, { uvm: 'monde', s: 0.8 }); }
        if (st === 'colombage' && !socle && f === 0 && k < nf - 1) { const lp = lx + (larg - 0.5) / nf / 2, [qx, qz] = pos(lp, 0.02); add('bois', 'cube', G.mat(qx, y + hE / 2, qz, 0.14, hE, 0.08, 0, ry), cB, {}); }
        if (allume && e === 0 && rng() < 0.6) { const [qx, qz] = pos(lx, 1.7); out.flaques.push({ x: qx, z: qz, r: 2.3, c: [col[0] * 0.2, col[1] * 0.17, col[2] * 0.11] }); }
        if (allume && rng() < 0.13) { const [qx, qz] = pos(lx, 1.0); out.lumieres.push({ x: qx, y: fy, z: qz, c: col.map(v => Math.min(1, v / 2.4)), i: 0.6, r: 6 }); }
      }
      // croix de Saint-André sur les panneaux de façade (colombage)
      if (st === 'colombage' && !socle && f === 0) for (const sd of [-1, 1]) if (rng() < 0.55) { const [qx, qz] = pos(sd * (larg / 2 - 0.5), 0.02), an = Math.atan2(hE - 0.4, 0.7) * sd; add('bois', 'cube', G.mat(qx, y + hE / 2, qz, hE * 1.02, 0.12, 0.07, 0, 0, an), cB, {}); }
    }
    y += hE;
  }
  // porte : cadre, marches enneigées, lanterne (halo + flaque + vraie lumière), couronne
  const pZ = D / 2;
  add('bois', 'cube', G.mat(pX, Y0 + 1.12, pZ + 0.03, 1.32, 2.3, 0.14), cB.map(v => v * 0.6), {});
  add('porte', 'plan', G.mat(pX, Y0 + 1.03, pZ + 0.11, 1.02, 2.06, 1), [1, 1, 1], {});
  add('pierre', 'cube', G.mat(pX, Y0 - 0.14, pZ + 0.36, 1.7, 0.28, 0.56), [0.55, 0.55, 0.57], { uvm: 'monde' });
  add('pierre', 'cube', G.mat(pX, Y0 - 0.36, pZ + 0.84, 2.0, 0.28, 0.56), [0.5, 0.5, 0.52], { uvm: 'monde' });
  if (rng() < 0.45) add('tuiles', 'pignon', G.mat(pX, Y0 + 2.42, pZ + 0.45, 1.9, 0.55, 1.0), cT, { uvm: 'monde', s: 0.6 });
  add('aiguilles', 'couronne', G.mat(pX, Y0 + 1.5, pZ + 0.15, 0.25, 0.25, 0.5), [0.5, 0.75, 0.55], {});
  add('unie', 'sphereB', G.mat(pX, Y0 + 1.27, pZ + 0.22, 0.08, 0.06, 0.05), [0.6, 0.04, 0.05], {});
  for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2; amp(pX + Math.cos(a) * 0.25, Y0 + 1.5 + Math.sin(a) * 0.25, pZ + 0.26, pal.guirlande[k % pal.guirlande.length]); }
  const lx0 = pX + 0.86, ly0 = Y0 + 2.0, cl = pal.lampe;
  add('metal', 'cube', G.mat(lx0, ly0 + 0.22, pZ + 0.14, 0.05, 0.05, 0.3), noir, {});
  add('emis', 'cube', G.mat(lx0, ly0, pZ + 0.26, 0.15, 0.24, 0.15), [cl[0] * 1.1, cl[1] * 1.0, cl[2] * 0.9], {});
  add('metal', 'cone4', G.mat(lx0, ly0 + 0.2, pZ + 0.26, 0.17, 0.14, 0.17), noir, {});
  halo(lx0, ly0, pZ + 0.3, [cl[0] * 0.14, cl[1] * 0.12, cl[2] * 0.1], 2.4);
  out.flaques.push({ x: pX + 0.4, z: pZ + 1.9, r: 2.7, c: [cl[0] * 0.15, cl[1] * 0.13, cl[2] * 0.11] });
  out.lumieres.push({ x: lx0, y: ly0, z: pZ + 0.7, c: [cl[0] / 3.2, cl[1] / 3.2, cl[2] / 3.2], i: 1, r: 7 });
  // congères au pied des murs
  for (let k = 0; k < 5; k++) { const sx = (rng() - 0.5) * (W + 0.6); if (Math.abs(sx - pX) < 1.3) continue; L.get('neige').add(G.base('bosse'), { m: G.mat(sx, 0.02, pZ + 0.35 + rng() * 0.3, 0.7 + rng() * 0.7, 0.2 + rng() * 0.25, 0.5 + rng() * 0.3), c: [1, 1, 1], uvm: 'monde', w }); }
  // ---- toit ----
  const yT = y, rw = ew + 0.9, rd = ed + 0.8, hT = h.hToit, guir = rng() < h.pGuirlande;
  const og = { couleurs: pal.guirlande, def, w, rng };
  if (h.toit === 'pignon') {
    const Ls = Math.hypot(rw / 2, hT), an = Math.atan2(hT, rw / 2);
    add(h.mur === 'pierre' ? 'moellon' : h.mur, 'pignon', G.mat(0, yT - 0.02, 0, ew, hT * (ew / rw), ed), cMur, { uvm: 'monde', s: 0.4, ao: v => 1 - 0.3 * sstep(yT, yT + hT * 0.9, v.y) });
    for (const sd of [-1, 1]) {
      const cx = sd * rw / 4, cy = yT + hT / 2;
      add('tuiles', 'cubeS', G.mat(cx, cy, 0, Ls + 0.25, 0.12, rd, 0, 0, -sd * an), cT, { uve: [Ls * 0.55, rd * 0.55] });
      const nx = sd * Math.sin(an), ny = Math.cos(an);
      L.get('neige').add(G.base('dalle'), { m: G.mat(cx + nx * 0.17, cy + ny * 0.17, 0, Ls + 0.4, 0.26, rd + 0.3, 0, 0, -sd * an), c: [1, 1, 1], uvm: 'monde', w,
        def: v => { const n = NZ.vn(v.x * 1.3 + gr % 97, v.z * 1.3, 5); v.y += (n - 0.5) * 0.14 - sstep(yT + 0.5, yT - 0.1, v.y) * 0.1; def(v); } });
      add('bois', 'cube', G.mat(cx, cy - 0.04, rd / 2 + 0.02, Ls + 0.3, 0.2, 0.07, 0, 0, -sd * an), cB, {});
      if (guir) G.guirlande(L, [sd * rw / 2, yT - 0.08, rd / 2 + 0.07], [0, yT + hT - 0.12, rd / 2 + 0.07], Object.assign({ creux: 0.03 }, og));
      // stalactites sous les deux avant-toits
      const nG = Math.floor(rd / 0.4); for (let k = 0; k < nG; k++) { if (rng() < 0.5) continue; const l = 0.15 + rng() * 0.6; add('verni', 'glacon', G.mat(sd * (rw / 2 + 0.05), yT - 0.12 - l / 2, -rd / 2 + (k + 0.5) / nG * rd, 0.045, -l, 0.045), [0.62, 0.74, 0.86], {}); }
    }
    add('metal', 'cone8', G.mat(0, yT + hT + 0.45, rd / 2 - 0.15, 0.05, 1.1, 0.05), noir, {});
  } else {
    const pointu = h.toit !== 'croupe', hP = pointu ? hT * 1.3 : hT * 0.75, cr = rng() < 0.5 ? 1 : -1, k4 = h.toit === 'tour' ? 0.64 : 0.76;
    const defP = pointu ? (v => { const t = clamp((v.y - yT) / hP, 0, 1); v.x += cr * Math.pow(t, 3) * hP * 0.32; v.y -= Math.pow(t, 4) * hP * 0.12; def(v); }) : def;
    add('tuiles', h.toit === 'tour' ? 'cone12' : 'cone4', G.mat(0, yT + hP / 2, 0, rw * k4, hP, rd * k4), cT, { uvm: 'monde', s: 0.55, def: defP });
    add('bois', 'cubeS', G.mat(0, yT + 0.02, 0, ew + 0.5, 0.14, ed + 0.5), cB, {});
    if (pointu) add('emis', 'sphereB', G.mat(cr * hP * 0.32, yT + hP * 0.88, 0, 0.12, 0.12, 0.12), pal.boule, {});
    else add('metal', 'cone8', G.mat(0, yT + hP + 0.4, 0, 0.05, 1.0, 0.05), noir, {});
    if (guir) G.guirlande(L, [-rw / 2 + 0.2, yT - 0.05, rd / 2 - 0.1], [rw / 2 - 0.2, yT - 0.05, rd / 2 - 0.1], og);
    const nG = Math.floor(rw / 0.4); for (let k = 0; k < nG; k++) { if (rng() < 0.5) continue; const l = 0.15 + rng() * 0.55; add('verni', 'glacon', G.mat(-rw / 2 + 0.3 + (k / nG) * (rw - 0.6), yT - 0.08 - l / 2, ed / 2 + 0.28, 0.045, -l, 0.045), [0.62, 0.74, 0.86], {}); }
  }
  // guirlande sous l'encorbellement du premier étage
  if (guir && nE > 1 && rng() < 0.6) G.guirlande(L, [-W / 2, Y0 + hE - 0.25, D / 2 + 0.16], [W / 2, Y0 + hE - 0.25, D / 2 + 0.16], og);
  // cheminée coiffée de neige
  if (rng() < 0.75) {
    const cx2 = (rng() - 0.5) * (ew - 1.8), cz2 = -ed * 0.22, hC = hT * (h.toit === 'pignon' ? 1 - Math.abs(cx2) / (rw / 2) : 0.5) + 1.1;
    add('brique', 'boite', G.mat(cx2, yT + hC / 2 - 0.2, cz2, 0.7, hC + 0.4, 0.7), [0.85, 0.8, 0.78], { uvm: 'monde', s: 0.6 });
    add('pierre', 'cube', G.mat(cx2, yT + hC + 0.05, cz2, 0.9, 0.16, 0.9), [0.5, 0.5, 0.5], {});
    L.get('neige').add(G.base('bosse'), { m: G.mat(cx2, yT + hC + 0.12, cz2, 0.5, 0.2, 0.5), c: [1, 1, 1], def, w });
    out.cheminee = { x: cx2, y: yT + hC + 0.3, z: cz2 };
  }
  out.hauteur = Htot;
  return out;
};
