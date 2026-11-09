/* ===================== INTERFACE : HUD, mini-carte, carte, Atelier, Quêtes, Album =====================
   Tout ce qui est posé sur la scène sans action propre est en pointer-events:none (les tapes traversent vers la
   manette). Les boutons qui OUVRENT une fenêtre utilisent onclick (jamais pointerup : le « click » suivant tomberait
   sur la fenêtre). Les boutons de jeu (Sauter, Éclat, Action) agissent au contact (pointerdown). */
const HUD = (() => {
  const H = {};
  let mini, mcx, dernMini = 0, bannT = 0;
  const $$ = id => document.getElementById(id);
  H.creer = function (zone) {
    zone.insertAdjacentHTML('beforeend', `
      <div id="voile"></div><div id="givre"></div><div id="flash"></div>
      <div id="ctrl"><div id="stickBase" hidden><div id="stickBtn"></div></div></div>
      <div id="hud">
        <div class="jauge"><span class="ico">🔥</span><div class="barre"><i id="hChaleur"></i></div></div>
        <div class="ligne"><span class="ico">🍬</span><b id="hBonbons" class="num">0</b><span class="ico sep">🎁</span><b id="hSac" class="num">0/2</b><span class="ico sep">★</span><b id="hEtoiles" class="num">0/12</b></div>
        <div id="hQuete"></div>
      </div>
      <canvas id="mini" aria-label="Carte"></canvas>
      <div id="fleche" hidden>➤</div>
      <div id="banniere"><div id="bTitre"></div><div id="bSous"></div></div>
      <div id="colonne">
        <button id="bAtelier" class="rond" aria-label="Atelier">🛠️</button>
        <button id="bQuetes" class="rond" aria-label="Quêtes">📜</button>
        <button id="bAlbum" class="rond" aria-label="Album">📖</button>
      </div>
      <div id="jeuBtns">
        <button id="bAction" hidden></button>
        <button id="bEclat" class="rond gros" aria-label="Éclat">✦<svg viewBox="0 0 36 36"><circle id="eclatRond" cx="18" cy="18" r="16" pathLength="100"/></svg></button>
        <button id="bSaut" class="rond gros" aria-label="Sauter">⤒</button>
      </div>
      <div id="chargement"><div id="chTitre">Noëlombre</div><div id="chSous">La ville se réveille…</div></div>`);
    mini = $$('mini'); mcx = mini.getContext('2d');
    const presse = (el, f) => el.addEventListener('pointerdown', e => { e.preventDefault(); e.stopPropagation(); if (!MODAL_OPEN) f(); });
    presse($$('bSaut'), () => { CTRL.sautDemande = true; });
    presse($$('bEclat'), () => { CTRL.eclatDemande = true; });
    presse($$('bAction'), () => { CTRL.actionDemande = true; });
    $$('bAtelier').onclick = () => { snd('menu'); H.ouvrirAtelier(); };
    $$('bQuetes').onclick = () => { snd('menu'); H.ouvrirQuetes(); };
    $$('bAlbum').onclick = () => { snd('menu'); H.ouvrirAlbum(); };
    mini.onclick = () => { snd('menu'); H.ouvrirCarte(); };
    H.taille();
  };
  H.taille = function () {
    if (!mini) return; const dpr = Math.min(2, devicePixelRatio || 1), r = mini.getBoundingClientRect();
    mini.width = Math.max(1, Math.round(r.width * dpr)); mini.height = Math.max(1, Math.round(r.height * dpr));
  };
  H.fin = () => { const c = $$('chargement'); if (c) { c.style.opacity = '0'; setTimeout(() => c.remove(), 900); } };
  H.banniere = function (t, s, duree) {
    $$('bTitre').textContent = t; $$('bSous').textContent = s || '';
    const b = $$('banniere'); b.classList.add('vu'); bannT = performance.now() + (duree || 5000);
  };
  H.flash = function (coul, ms) { const f = $$('flash'); f.style.transition = 'none'; f.style.background = coul; f.style.opacity = '1'; requestAnimationFrame(() => { f.style.transition = 'opacity ' + (ms || 600) + 'ms'; f.style.opacity = '0'; }); };
  let cache = {};
  const fixe = (id, v) => { if (cache[id] !== v) { cache[id] = v; $$(id).textContent = v; } };
  H.maj = function (d) {
    const j = S.jeu;
    $$('hChaleur').style.width = (god() ? 100 : clamp(j.chaleur, 0, 100)) + '%';
    $$('hChaleur').className = j.chaleur < 30 && !god() ? 'froid' : '';
    fixe('hBonbons', god() ? '∞' : fmt(j.bonbons));
    fixe('hSac', j.sac + '/' + JEU_capacite());
    fixe('hEtoiles', Object.keys(j.etoiles).length + '/12');
    fixe('hQuete', d.quete || '');
    $$('givre').style.opacity = god() ? 0 : clamp((40 - j.chaleur) / 40, 0, 1).toFixed(2);
    const ba = $$('bAction');
    if (d.action) { if (ba.hidden) ba.hidden = false; fixe('bAction', d.action); } else if (!ba.hidden) ba.hidden = true;
    const cd = d.eclatPret; $$('eclatRond').style.strokeDashoffset = String(100 - cd * 100); $$('bEclat').classList.toggle('pret', cd >= 1);
    if (bannT && performance.now() > bannT) { $$('banniere').classList.remove('vu'); bannT = 0; }
    const fl = $$('fleche');
    if (d.fleche != null) { fl.hidden = false; fl.style.transform = 'rotate(' + (d.fleche - Math.PI / 2) + 'rad)'; } else fl.hidden = true;
    if (performance.now() - dernMini > 200) { dernMini = performance.now(); dessinerMini(d); }
  };
  // ---- mini-carte (orientée selon le regard, comme une boule à neige) ----
  function dessinerMini(d) {
    const W = mini.width, Hh = mini.height, c = mcx, R = W / 2, ech = R / 70, J = JOUEUR;
    c.clearRect(0, 0, W, Hh); c.save(); c.translate(R, R);
    c.beginPath(); c.arc(0, 0, R - 1, 0, Math.PI * 2); c.fillStyle = 'rgba(8,10,22,.78)'; c.fill(); c.clip();
    c.rotate(J.yaw);
    const Cs = MONDE.C, cx0 = Math.floor(J.x / Cs), cz0 = Math.floor(J.z / Cs);
    const X = wx => (wx - J.x) * ech, Z = wz => (wz - J.z) * ech;
    for (let j = -2; j <= 2; j++) for (let i = -2; i <= 2; i++) {
      const P = MONDE.plan(cx0 + i, cz0 + j);
      c.fillStyle = 'rgba(150,160,185,.35)';
      c.fillRect(X(P.X0), Z(P.Z0), Cs * ech, MONDE.RUE * ech); c.fillRect(X(P.X0), Z(P.Z0), MONDE.RUE * ech, Cs * ech);
      c.fillRect(X(P.X0), Z(P.Z0 + Cs - MONDE.RUE), Cs * ech, MONDE.RUE * ech); c.fillRect(X(P.X0 + Cs - MONDE.RUE), Z(P.Z0), MONDE.RUE * ech, Cs * ech);
      if (P.lac) { c.fillStyle = 'rgba(120,170,230,.45)'; c.beginPath(); c.arc(X(P.X0 + P.lac.x), Z(P.Z0 + P.lac.z), P.lac.r * ech, 0, 7); c.fill(); }
      c.fillStyle = 'rgba(90,70,80,.85)';
      for (const m of P.maisons) { c.save(); c.translate(X(P.X0 + m.x), Z(P.Z0 + m.z)); c.rotate(-m.ang); c.fillRect(-m.w / 2 * ech, -m.d / 2 * ech, m.w * ech, m.d * ech); c.restore(); }
      if (P.relais) { const lit = S.jeu.relais[P.relais.id]; c.fillStyle = lit ? '#ffb347' : '#6a7090'; c.beginPath(); c.arc(X(P.X0), Z(P.Z0), (lit ? 4 : 3) * (W / 130), 0, 7); c.fill(); }
      if (P.rep && (S.jeu.reperes[MONDE.cle(P.cx, P.cz)] || S.jeu.niv.boussole >= 2)) { c.save(); c.translate(X(P.X0 + Cs / 2), Z(P.Z0 + Cs / 2)); c.rotate(-J.yaw); c.fillStyle = S.jeu.reperes[MONDE.cle(P.cx, P.cz)] ? '#ffd75e' : '#b48cff'; c.font = 'bold ' + Math.round(W / 9) + 'px serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('★', 0, 0); c.restore(); }
    }
    for (const p of d.carteCadeaux || []) { c.fillStyle = '#ff7ac8'; c.fillRect(X(p.x) - 2, Z(p.z) - 2, 4 * (W / 130), 4 * (W / 130)); }
    for (const p of d.cartePortes || []) { c.fillStyle = '#5fe08a'; c.beginPath(); c.arc(X(p.x), Z(p.z), 3 * (W / 130), 0, 7); c.fill(); }
    for (const s of d.carteSpectres || []) { c.fillStyle = 'rgba(200,230,255,.8)'; c.beginPath(); c.arc(X(s.x), Z(s.z), 2.5 * (W / 130), 0, 7); c.fill(); }
    c.restore();
    c.save(); c.translate(R, R); c.fillStyle = '#fff'; c.beginPath(); c.moveTo(0, -7 * W / 130); c.lineTo(5 * W / 130, 6 * W / 130); c.lineTo(0, 3 * W / 130); c.lineTo(-5 * W / 130, 6 * W / 130); c.closePath(); c.fill();
    // nord
    const a = -J.yaw - Math.PI / 2 * 0; c.rotate(J.yaw); c.fillStyle = '#ffd75e'; c.font = 'bold ' + Math.round(W / 11) + 'px serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('N', 0, -R + W / 14); c.restore();
    c.beginPath(); c.arc(R, R, R - 2, 0, Math.PI * 2); c.lineWidth = 3; c.strokeStyle = 'rgba(200,220,255,.5)'; c.stroke();
  }

  // ---- grande carte + voyage entre lanternes ----
  H.ouvrirCarte = function () {
    if (MODAL_OPEN) return;
    const j = S.jeu, Cs = MONDE.C, J = JOUEUR;
    const lits = Object.keys(j.relais).map(k => { const [x, z] = k.split(',').map(Number); return { k, x: x * Cs, z: z * Cs, d: Math.hypot(x * Cs - J.x, z * Cs - J.z) }; }).filter(r => r.d > 30).sort((a, b) => a.d - b.d).filter((r, i) => i < 5 || r.k === '0,0' || r.k === j.dernierRelais).slice(0, 8);
    const dir = (r) => { const a = Math.atan2(r.x - J.x, -(r.z - J.z)); return ['N', 'N-E', 'E', 'S-E', 'S', 'S-O', 'O', 'N-O'][Math.round(((a + Math.PI * 2) % (Math.PI * 2)) / (Math.PI / 4)) % 8]; };
    const prix = JEU_prixVoyage();
    modal('Carte', '<canvas id="grandeCarte"></canvas><div class="log">★ repère · ● lanterne allumée · ● porte qui attend un cadeau. Tu ne vois que ce que tu as exploré.</div>' +
      (lits.length ? '<div class="sect">Voyager vers une lanterne allumée (' + (god() ? 'gratuit' : prix + ' 🍬') + ')</div>' : '<div class="sect">Allume des lanternes-relais pour pouvoir y voyager.</div>'),
      [...lits.map(r => [(r.k === '0,0' ? 'Départ' : 'Lanterne') + ' à ' + fmt(Math.round(r.d)) + ' m (' + dir(r) + ')', () => JEU_voyager(r.k)]), ['Fermer']]);
    const cv = $$('grandeCarte'), dpr = Math.min(2, devicePixelRatio || 1), Wc = cv.getBoundingClientRect().width;
    cv.width = Wc * dpr; cv.height = Wc * dpr; const c = cv.getContext('2d'), W = cv.width, R = W / 2, ech = R / 330;
    c.fillStyle = '#0b0e1c'; c.fillRect(0, 0, W, W);
    const cx0 = Math.floor(J.x / Cs), cz0 = Math.floor(J.z / Cs), X = wx => R + (wx - J.x) * ech, Z = wz => R + (wz - J.z) * ech;
    const COUL = { bourg: '#4a3c55', citrouilles: '#5a3a1e', sapins: '#1f3a2a', cimetiere: '#2c3440', lac: '#24405a', foire: '#4a2026' };
    for (let jj = -8; jj <= 8; jj++) for (let i = -8; i <= 8; i++) {
      const cx = cx0 + i, cz = cz0 + jj, k = MONDE.cle(cx, cz); if (!j.explores[k]) continue;
      const q = MONDE.quartier(cx, cz); c.fillStyle = COUL[q]; c.fillRect(X(cx * Cs), Z(cz * Cs), Cs * ech + 0.5, Cs * ech + 0.5);
      c.fillStyle = 'rgba(160,170,200,.5)'; c.fillRect(X(cx * Cs), Z(cz * Cs), Cs * ech, 1.6 * dpr); c.fillRect(X(cx * Cs), Z(cz * Cs), 1.6 * dpr, Cs * ech);
    }
    for (let jj = -8; jj <= 8; jj++) for (let i = -8; i <= 8; i++) {
      const cx = cx0 + i, cz = cz0 + jj, k = MONDE.cle(cx, cz); if (!j.explores[k]) continue;
      const P = MONDE.plan(cx, cz);
      if (P.relais) { c.fillStyle = j.relais[P.relais.id] ? '#ffb347' : '#59607a'; c.beginPath(); c.arc(X(cx * Cs), Z(cz * Cs), 3 * dpr, 0, 7); c.fill(); }
      if (P.rep && j.reperes[k]) { c.fillStyle = '#ffd75e'; c.font = 'bold ' + (12 * dpr) + 'px serif'; c.textAlign = 'center'; c.fillText('★', X(cx * Cs + Cs / 2), Z(cz * Cs + Cs / 2) + 4 * dpr); }
      for (const m of P.maisons) if (m.attente && !JEU_livree(P, m)) { c.fillStyle = '#5fe08a'; c.beginPath(); c.arc(X(P.X0 + m.porte.x), Z(P.Z0 + m.porte.z), 1.8 * dpr, 0, 7); c.fill(); }
    }
    c.save(); c.translate(R, R); c.rotate(-J.yaw); c.fillStyle = '#fff'; c.beginPath(); c.moveTo(0, -8 * dpr); c.lineTo(6 * dpr, 7 * dpr); c.lineTo(0, 3 * dpr); c.lineTo(-6 * dpr, 7 * dpr); c.closePath(); c.fill(); c.restore();
    c.fillStyle = '#ffd75e'; c.font = 'bold ' + (13 * dpr) + 'px serif'; c.textAlign = 'center'; c.fillText('N', R, 14 * dpr);
  };

  // ---- Atelier (améliorations) ----
  H.ouvrirAtelier = function () {
    const j = S.jeu;
    let h = '<div>Tes bonbons : <b class="num">' + (god() ? '∞' : fmt(j.bonbons)) + '</b> 🍬</div>';
    for (const k of Object.keys(AMEL)) {
      const a = AMEL[k], n = j.niv[k], t = TXT.ameliorations[k], max = n >= a.max, prix = amelPrix(k);
      const ok = !max && (god() || j.bonbons >= prix);
      h += '<div class="amel"><div class="amelT"><b>' + esc(t.nom) + '</b> <span class="niv">' + '●'.repeat(n) + '<i>' + '○'.repeat(a.max - n) + '</i></span><div class="log">' + esc(t.desc) + ' ' + esc(a.effet(n)) + '</div></div>' +
        '<button class="acheter' + (ok ? ' ok' : '') + '" onclick="ui_acheter(\'' + k + '\')"' + (max ? ' disabled' : '') + '>' + (max ? 'Max' : fmt(prix) + ' 🍬') + '</button></div>';
    }
    modal('Atelier', h, [['Fermer']]);
  };
  // ---- Quêtes ----
  H.ouvrirQuetes = function () {
    const j = S.jeu;
    let h = '<div>Rang : <b>' + esc(JEU_rang()) + '</b> · ' + j.stats.livraisons + ' cadeaux livrés</div><div class="sect">Vœux de la ville</div>';
    for (const q of j.quetes) h += '<div class="quete"><div>' + esc(JEU_texteQuete(q)) + '</div><div class="barreQ"><i style="width:' + Math.round(100 * Math.min(1, q.prog / q.n)) + '%"></i></div><div class="log">' + fmt(Math.min(q.prog, q.n)) + ' / ' + fmt(q.n) + ' · récompense ' + q.rec + ' 🍬</div></div>';
    h += '<div class="sect">Succès (' + Object.keys(j.succes).length + '/' + SUCCES.length + ')</div>';
    for (const s of SUCCES) h += '<div class="log">' + (j.succes[s.id] ? '✔ <b>' + esc(s.nom) + '</b>' : '○ ' + esc(s.nom)) + ' — ' + esc(s.desc) + '</div>';
    modal('Quêtes', h, [['Fermer']]);
  };
  // ---- Album (étoiles, curiosités, carnet) ----
  H.ouvrirAlbum = function () {
    const j = S.jeu, st = j.stats;
    let h = '<div class="sect">Étoiles d’ombre (' + Object.keys(j.etoiles).length + '/12)</div><div class="etoiles">';
    MONDE.REP_TYPES.forEach((t, i) => { h += '<span class="et' + (j.etoiles[t] ? ' oui' : '') + '" title="' + esc(TXT.etoiles[i]) + '">★</span>'; });
    h += '</div><div class="log">Chaque étoile s’obtient en réunissant les 4 curiosités d’un même type de repère.</div>';
    MONDE.REP_TYPES.forEach(t => {
      const cs = TXT.curiosites.filter(c => c.repere === t), n = cs.filter(c => j.curiosites[c.id]).length;
      h += '<div class="sect">' + esc(TXT.reperes[t].nom) + ' (' + n + '/4)' + (j.etoiles[t] ? ' ★' : '') + '</div>';
      for (const c of cs) h += j.curiosites[c.id] ? '<div class="cur"><b>' + esc(c.nom) + '</b><div class="log">' + esc(c.desc) + '</div></div>' : '<div class="cur inconnu">? ? ?</div>';
    });
    h += '<div class="sect">Carnet de route</div><div class="log">Distance : ' + fmt(Math.round(st.distance)) + ' m · Repères découverts : ' + Object.keys(j.reperes).length + ' · Lanternes allumées : ' + Object.keys(j.relais).length +
      ' · Spectres dissipés : ' + st.spectres + ' · Évanouissements : ' + st.evanouis + ' · Vœux : ' + st.voeux + ' · Bonbons ramassés : ' + fmt(st.ramasses) + ' · Temps de jeu : ' + Math.floor(st.temps / 3600) + ' h ' + String(Math.floor(st.temps / 60) % 60).padStart(2, '0') + '</div>';
    modal('Album', h, [['Fermer']]);
  };
  return H;
})();
function ui_acheter(k) {
  const j = S.jeu, a = AMEL[k]; if (!a || j.niv[k] >= a.max) return;
  const prix = amelPrix(k);
  if (!god() && j.bonbons < prix) { snd('refus'); toast('Il te manque ' + fmt(prix - j.bonbons) + ' bonbons.', 'warn'); return; }
  if (!god()) j.bonbons -= prix;
  j.niv[k]++; snd('achat'); toast(TXT.ameliorations[k].nom + ' : niveau ' + j.niv[k] + ' !', 'save');
  JEU_apresAchat(k); save(false);
  closeModal(); HUD.ouvrirAtelier();
}
// ---- améliorations : effets chiffrés (écrits par le code, jamais dans les textes) ----
const AMEL = {
  lanterne: { max: 10, base: 30, k: 1.8, effet: n => 'Bulle : ' + Math.round(100 + n * 9) + ' %.' },
  bottes: { max: 8, base: 25, k: 1.75, effet: n => 'Vitesse : ' + (4.3 + n * 0.5).toFixed(1).replace('.', ',') + ' m/s.' },
  echarpe: { max: 8, base: 35, k: 1.75, effet: n => 'Froid : −' + (n * 9) + ' %.' },
  sac: { max: 6, base: 40, k: 1.85, effet: n => 'Capacité : ' + (2 + n) + ' cadeaux.' },
  aimant: { max: 8, base: 20, k: 1.75, effet: n => 'Portée : ' + (1.4 + n * 0.9).toFixed(1).replace('.', ',') + ' m.' },
  ressorts: { max: 5, base: 45, k: 1.9, effet: n => n >= 3 ? 'Double saut débloqué !' : 'Double saut au niveau 3.' },
  boussole: { max: 3, base: 60, k: 2.5, effet: n => ['Pas encore de boussole.', 'Flèche vers le repère inconnu le plus proche.', 'Repères inconnus aussi sur la mini-carte.', 'Montre aussi les cadeaux et les portes qui attendent.'][n] },
  eclat: { max: 8, base: 50, k: 1.75, effet: n => 'Portée ' + (7 + n * 1.2).toFixed(1).replace('.', ',') + ' m, recharge ' + (14 - n * 1.3).toFixed(1).replace('.', ',') + ' s.' },
};
function amelPrix(k) { const a = AMEL[k]; return Math.round(a.base * Math.pow(a.k, S.jeu.niv[k])); }
