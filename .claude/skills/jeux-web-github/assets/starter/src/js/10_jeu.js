/* ===================== LE JEU (exemple neutre à remplacer entièrement) =====================
   Exemple minimal : toucher les cibles avant qu'elles disparaissent. Il montre seulement comment brancher N'IMPORTE
   QUEL jeu sur la coquille (08_coquille.js) : état sauvegardé (S.jeu), mode Dieu, actions DEV, canvas net sur
   iPhone, tapes au contact. Le genre, le style et le thème viennent de la demande de l'utilisateur.

   Contrat de l'objet JEU (seuls titre, id, prefixe, etatInitial, demarrer, tick et rendu sont obligatoires) :
     titre, id (UNIQUE : clés de sauvegarde), prefixe (texte d'export), modeDieu (ce que fait BURGER, en clair)
     etatInitial() -> état propre au jeu, sauvegardé dans S.jeu       valider(j) : corriger une sauvegarde
     demarrer(zone) : construire l'interface dans #game (une fois)     recharger() : après import / effacement
     tick(dt) : logique (dt en s, × vitesse DEV ; pas appelé pendant une modale sauf continuerPendantModale)
     rendu() : affichage (chaque image)                                redimensionner() : taille / orientation
     absence(sec) -> message (progression hors-ligne éventuelle)       dev -> [[libellé, fonction], …] (panneau DEV)
     options() -> HTML ajouté aux Options                              continuerPendantModale : true pour un idle */
const JEU = (() => {
  let cv = null, cx = null, W = 0, H = 0, cible = null, effets = [];
  const j = () => S.jeu;
  const rayon = () => Math.max(26, Math.min(W, H) * 0.08); // zone touchable ≥ 52 px de diamètre
  function nouvelleCible() {
    const r = rayon();
    cible = { x: r + Math.random() * Math.max(1, W - 2 * r), y: r + Math.random() * Math.max(1, H - 2 * r), r, t: 0, vie: Math.max(0.8, 2.4 - 0.15 * j().niveau) };
  }
  function blip(f) {
    const c = SFXK.ctx; if (!c || c.state !== 'running') return;
    const o = c.createOscillator(), g = c.createGain(); o.type = 'triangle'; o.frequency.value = f;
    g.gain.setValueAtTime(0.05, c.currentTime); g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.1);
    o.connect(g); g.connect(SFXK.master); o.start(); o.stop(c.currentTime + 0.11);
  }
  function points(n) {
    const s = j(); s.score += n; if (s.score > s.record) s.record = s.score;
    if (Math.floor((s.score - n) / 50) < Math.floor(s.score / 50)) { s.niveau++; toast('Niveau ' + s.niveau + ' !'); }
  }
  function perdreVie() {
    const s = j();
    if (god() || s.vies <= 0) return;        // mode Dieu : aucune vie perdue
    s.vies--; blip(160);
    if (s.vies > 0) return;
    s.parties++;
    modal('Partie terminée', 'Score : ' + fmt(s.score) + ' — record : ' + fmt(s.record), [['Rejouer', () => { Object.assign(s, { score: 0, vies: 3, niveau: 1 }); nouvelleCible(); save(false); }]], true);
  }
  function toucher(e) {
    e.preventDefault();                      // au contact (pointerdown) : réactif, et aucun « click » ne suit sur un autre élément
    if (MODAL_OPEN || !cible) return;
    const b = cv.getBoundingClientRect(), x = e.clientX - b.left, y = e.clientY - b.top;
    if (Math.hypot(x - cible.x, y - cible.y) <= cible.r * 1.25) {
      effets.push({ x: cible.x, y: cible.y, r: cible.r, t: 0 }); points(j().niveau); blip(660 + 40 * j().niveau); nouvelleCible();
    }
  }
  return {
    titre: 'Mon Jeu', id: 'monJeu', prefixe: 'JEU1', modeDieu: 'aucune vie perdue',
    etatInitial: () => ({ niveau: 1, score: 0, record: 0, vies: 3, parties: 0 }),
    valider(s) { const d = this.etatInitial(); for (const k in d) if (!Number.isFinite(s[k]) || s[k] < 0) s[k] = d[k]; s.niveau = Math.max(1, Math.floor(s.niveau)); if (s.vies < 1) s.vies = 3; },
    dev: () => [['Niveau suivant', () => { j().niveau++; toast('Niveau ' + j().niveau); }], ['+100 points', () => points(100)], ['Perdre une vie', perdreVie]],
    demarrer(zone) {
      cv = document.createElement('canvas'); zone.appendChild(cv); cx = cv.getContext('2d');
      cv.addEventListener('pointerdown', toucher);
      this.redimensionner(); nouvelleCible();
    },
    redimensionner() { // canvas net : taille CSS × devicePixelRatio, dessin en points CSS
      if (!cv) return;
      const r = cv.getBoundingClientRect(), dpr = Math.min(3, window.devicePixelRatio || 1);
      W = Math.max(1, r.width); H = Math.max(1, r.height);
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (cible && (cible.x > W || cible.y > H)) nouvelleCible();
    },
    recharger() { nouvelleCible(); },
    tick(dt) {
      if (!cible) return;
      cible.t += dt; if (cible.t >= cible.vie) { perdreVie(); nouvelleCible(); }
      effets.forEach(f => { f.t += dt; }); effets = effets.filter(f => f.t < 0.35);
    },
    rendu() {
      const s = j(), st = 'Niveau ' + s.niveau + ' · ' + fmt(s.score) + ' pts · ' + (god() ? '∞' : '♥'.repeat(Math.max(0, s.vies)));
      const el = $('#statut'); if (el.textContent !== st) el.textContent = st;
      if (!cx) return;
      cx.clearRect(0, 0, W, H);
      if (cible) {
        const k = 1 - cible.t / cible.vie;
        cx.fillStyle = '#ffd75e'; cx.beginPath(); cx.arc(cible.x, cible.y, cible.r * (0.55 + 0.45 * k), 0, Math.PI * 2); cx.fill();
        cx.strokeStyle = '#ffffff55'; cx.lineWidth = 3; cx.beginPath(); cx.arc(cible.x, cible.y, cible.r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * k); cx.stroke();
      }
      for (const f of effets) { cx.strokeStyle = 'rgba(95,209,122,' + (1 - f.t / 0.35) + ')'; cx.lineWidth = 4; cx.beginPath(); cx.arc(f.x, f.y, f.r * (1 + f.t * 3), 0, Math.PI * 2); cx.stroke(); }
    },
    absence: () => '',                        // pas de progression hors-ligne dans cet exemple
  };
})();
