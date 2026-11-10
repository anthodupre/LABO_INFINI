/* ===================== INTERFACE (presque rien : c'est une promenade, pas un jeu) =====================
   À l'écran : la manette qui apparaît sous le pouce, les titres des lieux qui s'affichent comme au cinéma, et un petit
   bouton de menu (coquille : Options, Sauvegarder, Carnet, DEV). En mode esprit (DEV) : deux boutons pour monter/descendre.
   Tout ce qui est posé sur la scène sans action propre est en pointer-events:none. */
const HUD = (() => {
  const H = {};
  let bannT = 0;
  const $$ = id => document.getElementById(id);
  H.creer = function (zone) {
    zone.insertAdjacentHTML('beforeend', `
      <div id="voile"></div><div id="flash"></div>
      <div id="ctrl"><div id="stickBase" hidden><div id="stickBtn"></div></div></div>
      <div id="banniere"><div id="bTitre"></div><div id="bTrait"></div><div id="bSous"></div></div>
      <div id="vol" hidden><button id="bMonte" class="rond" aria-label="Monter">▲</button><button id="bDesc" class="rond" aria-label="Descendre">▼</button></div>
      <div id="chargement"><div id="chTitre">Noëlombre</div><div id="chSous">La ville se réveille…</div></div>`);
    const tenir = (el, v) => { el.addEventListener('pointerdown', e => { e.preventDefault(); e.stopPropagation(); CTRL.monte = v; }); for (const t of ['pointerup', 'pointercancel', 'pointerleave']) el.addEventListener(t, () => { CTRL.monte = 0; }); };
    tenir($$('bMonte'), 1); tenir($$('bDesc'), -1);
  };
  H.fin = () => { const c = $$('chargement'); if (c) { c.style.opacity = '0'; setTimeout(() => c.remove(), 1600); } };
  H.chargement = t => { const c = $$('chSous'); if (c) c.textContent = t; };
  // titre d'un lieu, façon carton de cinéma
  H.banniere = function (t, s, duree) {
    $$('bTitre').textContent = t; $$('bSous').textContent = s || '';
    const b = $$('banniere'); b.classList.remove('vu'); void b.offsetWidth; b.classList.add('vu'); bannT = performance.now() + (duree || 6500);
  };
  H.flash = function (coul, ms) { const f = $$('flash'); f.style.transition = 'none'; f.style.background = coul; f.style.opacity = '1'; requestAnimationFrame(() => { f.style.transition = 'opacity ' + (ms || 600) + 'ms'; f.style.opacity = '0'; }); };
  H.maj = function (d) {
    if (bannT && performance.now() > bannT) { $$('banniere').classList.remove('vu'); bannT = 0; }
    const v = $$('vol'); if (v.hidden === !!d.esprit) v.hidden = !d.esprit;
  };
  // ---- Carnet : les merveilles déjà vues, dans l'ordre de la promenade ----
  H.ouvrirCarnet = function () {
    const j = S.jeu, st = j.stats, total = MONDE.merveilles().length;
    const vus = j.journal.filter(k => REPERES[k]);
    let h = '<div class="grand">' + vus.length + ' merveille' + (vus.length > 1 ? 's' : '') + ' sur ' + total + '</div>';
    if (!vus.length) h += '<div>Suis la petite lueur : elle connaît le chemin vers ce que tu n’as pas encore vu.</div>';
    vus.slice().reverse().forEach(k => { const R = REPERES[k]; h += '<div class="cur"><b>' + esc(R.nom || k) + '</b><div class="log">' + esc(R.desc || '') + '</div></div>'; });
    if (vus.length < total) h += '<div class="cur inconnu">… et ' + (total - vus.length) + ' autre' + (total - vus.length > 1 ? 's' : '') + ' quelque part dans la nuit.</div>';
    h += '<div class="sect">Ta promenade</div><div class="log">' + fmt(Math.round(st.distance)) + ' m parcourus · ' + Object.keys(j.lanternes).length + ' lanterne' + (Object.keys(j.lanternes).length > 1 ? 's' : '') + ' rallumée' + (Object.keys(j.lanternes).length > 1 ? 's' : '') +
      ' · ' + Math.floor(st.temps / 3600) + ' h ' + String(Math.floor(st.temps / 60) % 60).padStart(2, '0') + ' dans la nuit</div>';
    modal('Carnet', h, [['Retour', openOptions], ['Fermer']]);
  };
  return H;
})();
function ui_carnet() { HUD.ouvrirCarnet(); }
