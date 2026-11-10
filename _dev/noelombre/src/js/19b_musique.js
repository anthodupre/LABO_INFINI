/* ===================== MUSIQUE ENREGISTRÉE (greffée sur AUDIO) =====================
   Les pièces (05_sons.js : MP3 en base64, composées pour Noëlombre et jouées par de vrais instruments échantillonnés)
   remplacent la musique synthétisée. Un « chef d'orchestre » joue une pièce, laisse 35 à 80 s de silence (vent seul),
   puis une autre, jamais deux fois la même de suite. Trois boucles « dans le décor » (manège, orgue, chœur) se
   font entendre près de certaines merveilles et font baisser la musique. Une seule pièce est décodée à la fois
   (≈ 20 Mo en mémoire) ; tout passe par le volume Musique et la coupure en arrière-plan du module AUDIO. */
(() => {
  if (typeof AUDIO === 'undefined' || typeof SONS === 'undefined') return;
  const A = AUDIO, PIECES = ['reveil', 'valse', 'neige', 'ombres', 'fete'].filter(k => SONS[k]);
  const PERIODE = { manege: 16, orgue: 20, choeur: 20 }, AV = 0.1, REC = 1.5; // forme des boucles (voir audio/src/tout.py)
  const M = { out: null, bus: null, busB: null, cur: null, t: 3, charge: false, premier: true, dernier: null, humeur: null, B: {} };
  function octets(nom) { const bin = atob(SONS[nom]), u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u.buffer; }
  function decoder(c, nom, cb) {
    let fait = false; const fin = b => { if (!fait) { fait = true; cb(b || null); } };
    try { const p = c.decodeAudioData(octets(nom), b => fin(b), () => fin(null)); if (p && p.then) p.then(b => fin(b), () => fin(null)); } catch (e) { fin(null); }
  }
  function pret(c) { // (re)branche nos deux bus sur la sortie Musique d'AUDIO (elle est recréée si le contexte audio change)
    if (M.out === A.musOut && M.bus) return;
    M.out = A.musOut; M.bus = c.createGain(); M.bus.gain.value = 2.3; M.bus.connect(A.musOut);
    M.busB = c.createGain(); M.busB.gain.value = 2.6; M.busB.connect(A.musOut);
    M.cur = null; for (const k in M.B) { M.B[k].g = null; M.B[k].suiv = 0; }
  }
  function arreter(c, tps) { const q = M.cur; if (!q) return; M.cur = null; try { q.g.gain.cancelScheduledValues(c.currentTime); q.g.gain.setTargetAtTime(0, c.currentTime, tps / 3); q.s.stop(c.currentTime + tps + 0.2); } catch (e) { } }
  function jouer(c, nom, buf) {
    const s = c.createBufferSource(), g = c.createGain(); s.buffer = buf; g.gain.value = 0; g.gain.setTargetAtTime(1, c.currentTime, 0.6);
    s.connect(g); g.connect(M.bus); s.start();
    s.onended = () => { try { s.disconnect(); g.disconnect(); } catch (e) { } };
    M.cur = { s, g, nom, fin: c.currentTime + buf.duration + 0.3 }; M.dernier = nom;
  }
  function lancer(c, nom) { if (M.charge) return; M.charge = true; decoder(c, nom, buf => { M.charge = false; if (!buf || A.c !== c) { M.t = 25; return; } jouer(c, nom, buf); }); }
  function choisir() {
    if (M.premier) { M.premier = false; if (SONS.reveil) return 'reveil'; }
    if (M.humeur && M.humeur !== M.dernier && PIECES.indexOf(M.humeur) >= 0 && Math.random() < 0.7) return M.humeur;
    const cand = PIECES.filter(p => p !== M.dernier); return cand[Math.floor(Math.random() * cand.length)];
  }
  function boucles(c, dt) { // fondu enchaîné de deux sources à chaque période : aucune couture
    let fort = 0;
    for (const nom in M.B) {
      const b = M.B[nom], now = c.currentTime;
      if (b.vol > 0.02) {
        b.muet = 0; fort = Math.max(fort, b.vol);
        if (!b.buf) { if (!b.charge) { b.charge = true; decoder(c, nom, buf => { b.charge = false; b.buf = buf; b.suiv = 0; }); } continue; }
        if (!b.g) { b.g = c.createGain(); b.g.gain.value = 0; b.g.connect(M.busB); b.suiv = 0; }
        b.g.gain.setTargetAtTime(b.vol, now, 0.35);
        if (now > b.suiv - 0.4) {
          const t0 = Math.max(now + 0.02, b.suiv || 0), per = PERIODE[nom], s = c.createBufferSource(), g = c.createGain(); s.buffer = b.buf;
          g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(1, t0 + REC); g.gain.setValueAtTime(1, t0 + per); g.gain.linearRampToValueAtTime(0, t0 + per + REC);
          s.connect(g); g.connect(b.g); s.start(t0, AV); s.stop(t0 + per + REC + 0.1);
          s.onended = () => { try { s.disconnect(); g.disconnect(); } catch (e) { } };
          b.suiv = t0 + per;
        }
      } else if (b.g) {
        b.g.gain.setTargetAtTime(0, now, 0.4); b.muet = (b.muet || 0) + dt;
        if (b.muet > 4) { try { b.g.disconnect(); } catch (e) { } b.g = null; b.buf = null; b.suiv = 0; } // on libère la mémoire
      }
    }
    return fort;
  }
  function chef(dt, e) {
    const c = A.ready(); if (!c || !A.musOut) return;
    pret(c);
    const fort = boucles(c, dt);
    if (M.cur) {
      M.cur.g.gain.setTargetAtTime(fort > 0.25 ? 0.15 : 1, c.currentTime, 0.8); // une boucle du décor s'entend : la musique s'efface
      if (c.currentTime > M.cur.fin) { M.cur = null; M.t = 35 + Math.random() * 45; }
      return;
    }
    if (e.enPause || M.charge || !(A.musLvl > 0) || fort > 0.25 || !PIECES.length) return;
    M.t -= dt; if (M.t <= 0) lancer(c, choisir());
  }
  const majOrig = A.maj.bind(A), sfxOrig = A.sfx.bind(A);
  A.maj = function (dt, e) { majOrig(dt, e); try { chef(dt, e || {}); } catch (er) { } };
  A.musique = function (nom) { try { const c = A.ready(); if (!c) return; pret(c); arreter(c, 2); if (nom && SONS[nom]) lancer(c, nom); else M.t = 40; } catch (e) { } };
  A.humeur = function (nom) { M.humeur = nom || null; };
  A.boucle = function (nom, vol) { if (!PERIODE[nom] || !SONS[nom]) return; (M.B[nom] || (M.B[nom] = { vol: 0, buf: null, g: null, suiv: 0 })).vol = vol > 0 ? Math.min(1, vol) : 0; };
  A._musique = () => ({ piece: M.cur ? M.cur.nom : null, attente: M.t, charge: M.charge, boucles: Object.keys(M.B).filter(k => M.B[k].g).join(',') });
  // quelques bruitages propres à la promenade (les autres viennent d'AUDIO)
  const ALIAS = { carte: ['boite_a_musique'], cloche: ['carillon', { coups: 1 }], apparition: ['spectre_fuit'] };
  A.sfx = function (nom, opt) {
    try {
      if (ALIAS[nom]) return sfxOrig(ALIAS[nom][0], ALIAS[nom][1] || opt);
      if (nom === 'souffle') { const c = A.ready(); if (!c || !(A.sfxLvl > 0) || A.muted) return; const t = c.currentTime + 0.02; A.nz(t, 2.4, 0.09, 'bandpass', 420, { q: 0.8, a: 0.9 }); A.nz(t + 0.3, 1.8, 0.05, 'bandpass', 900, { q: 1.2, a: 0.7 }); return; }
      return sfxOrig(nom, opt);
    } catch (e) { }
  };
})();
