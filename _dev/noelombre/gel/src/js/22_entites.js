/* ===================== PRÉSENCES : lueurs mobiles (luciole-guide, flammes, lanternes volantes) et fantômes =====================
   Les lueurs sont des points lumineux redessinés à chaque image (un seul appel de dessin). Les fantômes sont de doux
   promeneurs translucides : ils ne font aucun mal, s'effacent quand on s'approche et se révèlent à l'éclat de la lanterne. */
const ENT = (() => {
  const E = { spectres: [] };
  const MAXL = 260, MAXSP = 10;
  let pts, lgeo;
  E.creer = function (scene) {
    lgeo = new THREE.BufferGeometry();
    lgeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(MAXL * 3), 3));
    lgeo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(MAXL * 3), 3));
    lgeo.setAttribute('taille', new THREE.BufferAttribute(new Float32Array(MAXL), 1));
    pts = new THREE.Points(lgeo, MAT.halos); pts.frustumCulled = false; pts.renderOrder = 9; scene.add(pts);
    const gS = new THREE.LatheGeometry([[0.0, 2.15], [0.24, 2.08], [0.34, 1.82], [0.3, 1.5], [0.4, 1.1], [0.55, 0.55], [0.72, 0.1], [0.76, 0.0]].map(p => new THREE.Vector2(p[0], p[1])), 18);
    const gO = new THREE.SphereGeometry(0.07, 8, 6);
    const matO = MAT.patch(new THREE.MeshBasicMaterial({ color: 0x05060a }), { cle: 'oeil' });
    for (let i = 0; i < MAXSP; i++) {
      const g = new THREE.Group(), m = new THREE.Mesh(gS, MAT.lier(MAT.spectre.clone())); m.renderOrder = 7; g.add(m);
      for (const sx of [-0.11, 0.11]) { const o = new THREE.Mesh(gO, matO); o.position.set(sx, 1.8, 0.27); o.scale.set(1, 1.5, 0.6); g.add(o); }
      const bo = new THREE.Mesh(gO, matO); bo.position.set(0, 1.6, 0.29); bo.scale.set(1.3, 0.7, 0.5); g.add(bo);
      g.visible = false; scene.add(g);
      E.spectres.push({ g, m, actif: false, x: 0, y: 0, z: 0, vx: 0, vz: 0, t: 0, alpha: 0, cible: 0, part: false, ax: 0 });
    }
  };
  // lueurs : [{ x, y, z (grille), c: [r, g, b], s: taille en mètres }]
  E.dessiner = function (lueurs) {
    const P = lgeo.attributes.position.array, Cc = lgeo.attributes.color.array, T = lgeo.attributes.taille.array; let n = 0;
    for (const l of lueurs) { if (n >= MAXL) break; P[n * 3] = l.x; P[n * 3 + 1] = l.y; P[n * 3 + 2] = l.z; Cc[n * 3] = l.c[0]; Cc[n * 3 + 1] = l.c[1]; Cc[n * 3 + 2] = l.c[2]; T[n] = l.s; n++; }
    lgeo.setDrawRange(0, n); lgeo.attributes.position.needsUpdate = true; lgeo.attributes.color.needsUpdate = true; lgeo.attributes.taille.needsUpdate = true;
  };
  return E;
})();
