/* ===================== COMMANDES ET DÉPLACEMENT DU JOUEUR =====================
   iPhone : la moitié gauche de l'écran = manette virtuelle (là où le pouce se pose), la droite = regarder autour
   (glisser). Boutons : Sauter, Éclat ✦, Action (selon l'endroit). Ordinateur : ZQSD/WASD/flèches, Maj = courir,
   Espace = sauter, E = action, F = éclat, M = carte, souris (glisser) = regarder.
   Les tapes passent par pointerdown sur la couche #ctrl (touch-action:none), jamais par un touchmove bloqué. */
const CTRL = (() => {
  const K = { mx: 0, mz: 0, courir: false, sautDemande: false, actionDemande: false, eclatDemande: false, dx: 0, dy: 0, actif: false };
  let stick = null, look = null, el = null, base = null, bouton = null;
  const touches = {};
  K.installer = function (couche, bStick, bNoeud) {
    el = couche; base = bStick; bouton = bNoeud;
    couche.addEventListener('pointerdown', e => {
      if (MODAL_OPEN) return;
      e.preventDefault();
      const r = couche.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      if (e.pointerType !== 'mouse' && x < r.width * 0.45 && !stick) {
        stick = { id: e.pointerId, ox: x, oy: y, x, y };
        base.style.left = (x - 60) + 'px'; base.style.top = (y - 60) + 'px'; base.hidden = false; bouton.style.transform = 'translate(0px,0px)';
      } else if (!look) look = { id: e.pointerId, x: e.clientX, y: e.clientY };
      try { couche.setPointerCapture(e.pointerId); } catch (er) { }
    });
    couche.addEventListener('pointermove', e => {
      if (stick && e.pointerId === stick.id) {
        const r = couche.getBoundingClientRect(); let dx = e.clientX - r.left - stick.ox, dy = e.clientY - r.top - stick.oy;
        const l = Math.hypot(dx, dy), R = 56; if (l > R) { dx *= R / l; dy *= R / l; }
        K.mx = dx / R; K.mz = dy / R; K.courir = l > R * 0.95;
        bouton.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      } else if (look && e.pointerId === look.id) {
        K.dx += e.clientX - look.x; K.dy += e.clientY - look.y; look.x = e.clientX; look.y = e.clientY;
      }
    });
    const fin = e => {
      if (stick && e.pointerId === stick.id) { stick = null; K.mx = K.mz = 0; K.courir = false; base.hidden = true; }
      if (look && e.pointerId === look.id) look = null;
    };
    couche.addEventListener('pointerup', fin); couche.addEventListener('pointercancel', fin); couche.addEventListener('lostpointercapture', fin);
    addEventListener('keydown', e => {
      if (MODAL_OPEN || (e.target && /INPUT|TEXTAREA/.test(e.target.tagName))) return;
      const k = e.key.toLowerCase(); touches[k] = true;
      if (k === ' ') { K.sautDemande = true; e.preventDefault(); }
      if (k === 'e') K.actionDemande = true;
      if (k === 'f') K.eclatDemande = true;
      if (k === 'm' && typeof HUD !== 'undefined') HUD.ouvrirCarte();
    });
    addEventListener('keyup', e => { touches[e.key.toLowerCase()] = false; });
    addEventListener('blur', () => { for (const k in touches) touches[k] = false; });
  };
  K.relacher = function () { stick = null; look = null; K.mx = K.mz = 0; K.courir = false; if (base) base.hidden = true; for (const k in touches) touches[k] = false; };
  K.lire = function () { // fusionne clavier + manette virtuelle
    let mx = K.mx, mz = K.mz, courir = K.courir;
    const t = touches;
    if (t['w'] || t['z'] || t['arrowup']) mz = -1; if (t['s'] || t['arrowdown']) mz = 1;
    if (t['a'] || t['q'] || t['arrowleft']) mx = -1; if (t['d'] || t['arrowright']) mx = 1;
    if (t['shift']) courir = true;
    const l = Math.hypot(mx, mz); if (l > 1) { mx /= l; mz /= l; }
    const o = { mx, mz, courir, dx: K.dx, dy: K.dy }; K.dx = 0; K.dy = 0; return o;
  };
  return K;
})();

const JOUEUR = (() => {
  const J = { x: 3, y: 0, z: 2, vx: 0, vy: 0, vz: 0, yaw: -Math.PI / 2, pitch: 0, sol: true, sauts: 0, bob: 0, vitesse: 0, surface: 'neige', hSupport: 0, chute: 0 };
  const RAY = 0.36, OEIL = 1.62;
  J.OEIL = OEIL;
  // obstacles des parcelles autour (coordonnées monde)
  function obstaclesProches(x, z) {
    const C = MONDE.C, cx = Math.floor(x / C), cz = Math.floor(z / C), lx = x - cx * C, lz = z - cz * C, out = [];
    const ix0 = lx < 6 ? -1 : 0, ix1 = lx > C - 6 ? 1 : 0, iz0 = lz < 6 ? -1 : 0, iz1 = lz > C - 6 ? 1 : 0;
    for (let j = iz0; j <= iz1; j++) for (let i = ix0; i <= ix1; i++) { const P = MONDE.plan(cx + i, cz + j); out.push(P); }
    return out;
  }
  // hauteur du « plancher » : sol, ou dessus d'un obstacle bas (banc, margelle, quai…) si on est au-dessus
  function collisions(px, pz, py) {
    let x = px, z = pz, plancher = MONDE.sol(px, pz);
    for (const P of obstaclesProches(px, pz)) {
      for (const o of P.obst) {
        const ox = P.X0 + o.x, oz = P.Z0 + o.z;
        if (Math.abs(ox - x) > 14 || Math.abs(oz - z) > 14) continue;
        if (o.y === undefined) o.y = P.sol(o.x, o.z);
        const haut = o.y + o.h;
        if (o.t === 'c') {
          const dx = x - ox, dz = z - oz, d = Math.hypot(dx, dz), m = o.r + RAY;
          if (d < m) {
            if (o.h < 2 && py >= haut - 0.25) { if (d < o.r + 0.1) plancher = Math.max(plancher, haut); continue; }
            const k = d > 1e-4 ? (m - d) / d : 1; x += dx * k; z += dz * k + (d > 1e-4 ? 0 : m);
          }
        } else {
          const dx = x - ox, dz = z - oz, lx = dx * o.c - dz * o.s, lz = dx * o.s + dz * o.c;
          const qx = clamp(lx, -o.hx, o.hx), qz = clamp(lz, -o.hz, o.hz), ex = lx - qx, ez = lz - qz, d = Math.hypot(ex, ez);
          if (d < RAY) {
            if (o.h < 2 && py >= haut - 0.25) { if (Math.abs(lx) < o.hx + 0.05 && Math.abs(lz) < o.hz + 0.05) plancher = Math.max(plancher, haut); continue; }
            let nx, nz, pen;
            if (d > 1e-4) { nx = ex / d; nz = ez / d; pen = RAY - d; }
            else { const px2 = o.hx - Math.abs(lx), pz2 = o.hz - Math.abs(lz); if (px2 < pz2) { nx = Math.sign(lx) || 1; nz = 0; pen = px2 + RAY; } else { nx = 0; nz = Math.sign(lz) || 1; pen = pz2 + RAY; } }
            const wx = nx * o.c + nz * o.s, wz = -nx * o.s + nz * o.c; x += wx * pen; z += wz * pen;
          }
        }
      }
    }
    return { x, z, plancher };
  }
  J.majPhysique = function (dt, inp, niv, god) {
    const sens = (S.jeu.reg.sens || 1) * 0.0042;
    J.yaw -= inp.dx * sens; J.pitch -= inp.dy * sens * (S.jeu.reg.inverser ? -1 : 1);
    J.pitch = clamp(J.pitch, -1.35, 1.25);
    const glace = MONDE.surGlace(J.x, J.z) && J.hSupport < 0.05;
    J.surface = glace ? 'glace' : MONDE.surRoute(J.x, J.z) ? 'pave' : 'neige';
    const vMax = (4.3 + niv.bottes * 0.5) * (inp.courir ? 1.65 : 1) * (god && G_DEV.vite ? 3 : 1);
    const s = Math.sin(J.yaw), c = Math.cos(J.yaw);
    const fx = -s, fz = -c, rx = c, rz = -s; // avant, droite
    const tx = (rx * inp.mx - fx * inp.mz) * vMax, tz = (rz * inp.mx - fz * inp.mz) * vMax;
    const acc = glace ? 1.6 : J.sol ? 11 : 3;
    J.vx += (tx - J.vx) * Math.min(1, acc * dt); J.vz += (tz - J.vz) * Math.min(1, acc * dt);
    if (inp.saut) {
      const maxSauts = niv.ressorts >= 3 ? 2 : 1;
      if (J.sol || J.sauts < maxSauts) { J.vy = 6.4 + niv.ressorts * 0.55; J.sol = false; J.sauts++; snd('saut'); }
    }
    J.vy -= 22 * dt;
    let nx = J.x + J.vx * dt, nz = J.z + J.vz * dt, ny = J.y + J.vy * dt;
    const r = collisions(nx, nz, ny);
    nx = r.x; nz = r.z;
    if (Math.hypot(nx - J.x, nz - J.z) < Math.hypot(J.vx, J.vz) * dt * 0.3 && Math.hypot(J.vx, J.vz) > 1) { J.vx *= 0.5; J.vz *= 0.5; }
    const plancher = r.plancher;
    if (ny <= plancher) { if (!J.sol && J.vy < -6) snd('atterrir'); ny = plancher; if (J.vy < 0) J.vy = 0; J.sol = true; J.sauts = 0; }
    else if (ny - plancher > 0.08) J.sol = false;
    if (J.sol && ny - plancher < 0.6 && J.vy <= 0) ny = plancher; // descend les petites marches sans « décoller »
    J.hSupport = plancher - MONDE.sol(nx, nz);
    const d = Math.hypot(nx - J.x, nz - J.z); J.vitesse = d / Math.max(1e-4, dt);
    J.x = nx; J.z = nz; J.y = ny;
    if (J.sol) J.bob += d * 1.9;
    return d;
  };
  J.cameraVers = function (cam) {
    const b = Math.sin(J.bob) * 0.045 * Math.min(1, J.vitesse / 4), b2 = Math.cos(J.bob * 0.5) * 0.03 * Math.min(1, J.vitesse / 4);
    cam.position.set(J.x + b2 * Math.cos(J.yaw), J.y + OEIL + b, J.z - b2 * Math.sin(J.yaw));
    cam.rotation.set(J.pitch, J.yaw, 0, 'YXZ');
  };
  return J;
})();
const G_DEV = { vite: false };
