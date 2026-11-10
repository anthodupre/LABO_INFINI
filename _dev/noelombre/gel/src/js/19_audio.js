/* ===================== AUDIO — musique par quartier, ambiance, bruitages (tout synthétisé, aucun fichier) =====================
   Une seule globale : AUDIO. Tout passe par SFXK (contexte et sortie du kit) ; rien ne sonne tant que le contexte n'est
   pas 'running' (iOS : après une tape). Chaîne : [musique] [bruitages <- ambiance] -> mélange -> compresseur -> SFXK.master.
   Musique : séquenceur planifié ~0,3 s en avance sur l'horloge audio (minuterie 50 ms), fondu enchaîné de 1,5 s entre
   morceaux (l'ancien continue de jouer pendant qu'il s'éteint), mélodies variées à chaque boucle (hasard reproductible).
   Ambiance : quelques nœuds créés une seule fois (vent, chuchotement, feu) et seulement modulés.
   Polyphonie limitée (réservation par heure de fin), nœuds déconnectés quand ils se terminent. */
const AUDIO = (() => {
  const SC = {
    min: [0, 2, 3, 5, 7, 8, 10], hmin: [0, 2, 3, 5, 7, 8, 11], dor: [0, 2, 3, 5, 7, 9, 10], phr: [0, 1, 3, 5, 7, 8, 10],
  };
  const MAXV = { m: 64, s: 64 };
  const hz = m => 440 * Math.pow(2, (m - 69) / 12);
  const r = (a, b = 0, k = 0) => { const x = Math.sin(a * 12.9898 + b * 78.233 + k * 37.719) * 43758.5453; return x - Math.floor(x); };
  const cl = (x, a, b) => (x < a ? a : x > b ? b : x);
  const num = (x, d) => (typeof x === 'number' && isFinite(x) ? x : d);
  const rnd = (a, b) => a + Math.random() * (b - a);
  const reg = () => { try { if (typeof S !== 'undefined' && S && S.jeu && S.jeu.reg) return S.jeu.reg; } catch (e) { } return null; };
  const hidden = () => { try { return typeof document !== 'undefined' && !!document.hidden; } catch (e) { return false; } };
  const VOY = [[300, 870, 2240], [530, 1150, 2400], [400, 800, 2300], [650, 1080, 2650], [290, 750, 2300], [450, 1700, 2500]];
  const VOWEL = { a: [700, 1150], o: [450, 800], u: [320, 700], e: [500, 1700] };

  /* ---------------- morceaux (un par quartier) ---------------- */
  const TR = {
    // Écran titre : boîte à musique seule, lente, clochettes
    titre: {
      bpm: 58, beats: 3, sub: 2, root: 69, scale: SC.min, prog: [0, 5, 3, 4, 0, 5, 1, 4], form: [0, 1, 0, 2, 0, 1, 3, 4], seed: 5.3,
      play(s, M) {
        const t = s.t, i = s.i, ch = s.ch;
        if (i === 0) M.mbox(ch[0] - 12, t, 0.045, 2.2, -0.2);
        if (i === 2) M.mbox(ch[1] - 12, t, 0.03, 1.4, -0.1);
        if (i === 4) M.mbox(ch[2] - 12, t, 0.03, 1.4, 0);
        const m = M.mel(s, [0, 1, 2, 3, 4, 5], 0.42); if (m != null) M.mbox(m + 12, t, 0.065, 1.7, 0.15);
        if (s.bar % 4 === 3 && i === 3) for (let k = 0; k < 3; k++) M.jingle(t + k * 0.06, 0.025, 0.4);
      },
    },
    // Bourg : valse boîte à musique en ré mineur
    bourg: {
      bpm: 132, beats: 3, sub: 2, root: 62, scale: SC.hmin, prog: [0, 3, 0, 4, 5, 1, 4, 0], form: [0, 1, 0, 2, 3, 1, 0, 4], seed: 11.7,
      play(s, M) {
        const t = s.t, i = s.i, ch = s.ch;
        if (i === 0) { M.basse(ch[0] - 24, t, 0.09, 0.6); M.mbox(ch[0] - 12, t, 0.03, 1); }
        if (i === 2 || i === 4) { M.mbox(ch[1], t, 0.022, 0.6, -0.25); M.mbox(ch[2], t, 0.02, 0.6, 0.25); }
        const m = M.mel(s, [0, 1, 2, 3, 4, 5], 0.5); if (m != null) M.mbox(m + 12, t, 0.06, 1.3, 0.1);
        if (i === 0 && s.bar % 8 === 7) for (let k = 0; k < 4; k++) M.jingle(t + k * 0.05, 0.02, -0.3);
      },
    },
    // Citrouilles : pizzicati espiègles + basson
    citrouilles: {
      bpm: 112, beats: 4, sub: 4, root: 55, scale: SC.hmin, prog: [0, 3, 0, 4, 5, 3, 4, 4], form: [0, 1, 0, 2, 3, 1, 4, 5], seed: 23.1,
      play(s, M) {
        const t = s.t, i = s.i, ch = s.ch, tr = s.tr, p = tr.prog[s.bar % tr.prog.length];
        if (i % 4 === 0) {
          let n = M.deg(tr, p + [0, 4, 7, 4][i >> 2]) - 24;
          if (s.bar % 4 === 3 && i >= 8) n = ch[0] - 24 + (i === 8 ? 2 : 1);
          M.basson(n, t, s.sd * 1.5, 0.07);
        }
        if (s.bar % 4 === 3 && i === 14) M.basson(ch[0] - 24, t, s.sd * 0.8, 0.05);
        if (i === 2 || i === 10) { M.pizz(ch[1], t, 0.025, -0.3); M.pizz(ch[2], t, 0.022, 0.3); }
        const m = M.mel(s, [0, 2, 3, 6, 8, 10, 11, 14], 0.55);
        if (m != null) { M.pizz(m + 12, t, 0.07, 0.1); if (M.vr(s, 9) < 0.12) M.pizz(m + 13, t + s.sd * 0.5, 0.045, 0.2); }
        if (i === 6 || i === 14) M.bois(t, 0.02);
      },
    },
    // Sapins : célesta lente + chœur doux
    sapins: {
      bpm: 66, beats: 3, sub: 2, root: 65, scale: SC.dor, prog: [0, 3, 6, 2, 0, 3, 4, 4], form: [0, 1, 2, 1, 0, 1, 3, 4], seed: 37.9,
      play(s, M) {
        const t = s.t, i = s.i, ch = s.ch;
        if (i === 0) {
          M.choir([ch[0] - 12, ch[1] - 12, ch[2] - 12], t, s.sd * 6.6, 0.045, { vow: s.bar % 2 ? 'u' : 'o', a: 0.7, r: 1 });
          M.osc(t, hz(ch[0] - 24), s.sd * 6, { v: 0.05, a: 0.5, sus: 1, r: 0.8 });
        }
        const m = M.mel(s, [0, 2, 3, 4], 0.5); if (m != null) M.celeste(m + 12, t, 0.06, 2, 0.1);
        if (s.bar % 2 === 1 && (i === 1 || i === 3 || i === 5)) M.celeste(ch[i >> 1] + 24, t, 0.016, 1, -0.3 + (i >> 1) * 0.3);
      },
    },
    // Cimetière : orgue lointain, clochette grave, très lent
    cimetiere: {
      bpm: 44, beats: 4, sub: 2, root: 49, scale: SC.phr, prog: [0, 1, 0, 6, 5, 1, 6, 0], form: [0, 1, 0, 2, 3, 1, 2, 4], seed: 41.3,
      play(s, M) {
        const t = s.t, i = s.i, ch = s.ch;
        if (i === 0) {
          const len = s.sd * 8 * 1.02;
          M.orgue(ch[0], t, len, 0.02, 1000); M.orgue(ch[1], t, len, 0.017, 1000); M.orgue(ch[2], t, len, 0.017, 1000);
          M.orgue(ch[0] - 12, t, len, 0.028, 500);
          if (s.bar % 2 === 0) M.cloche(ch[0], t, 0.04, 5, -0.4);
        }
        const m = M.mel(s, [0, 2, 4, 6], 0.3); if (m != null) M.orgue(m + 12, t, s.sd * 2.2, 0.016, 1500);
      },
    },
    // Lac : harpe en arpèges + nappes glacées
    lac: {
      bpm: 72, beats: 2, sub: 3, root: 64, scale: SC.min, prog: [0, 5, 2, 6, 0, 5, 3, 4], form: [0, 1, 2, 1, 0, 3, 2, 4], seed: 53.6,
      play(s, M) {
        const t = s.t, i = s.i, ch = s.ch, arp = [0, 1, 2, 3, 2, 1];
        M.harpe(ch[arp[i]] + (s.bar % 2 && i === 3 ? 12 : 0), t, 0.04, 1.5, -0.3 + i * 0.12);
        if (i === 0) M.harpe(ch[0] - 24, t, 0.06, 2);
        if (i === 0 && s.bar % 2 === 0) M.pad([ch[0] - 12, ch[1], ch[2]], t, s.sd * 12, 0.012);
        const m = M.mel(s, [0, 2, 3, 5], 0.4); if (m != null) M.harpe(m + 12, t, 0.055, 2.2, 0.2);
        if (M.vr(s, 8) < 0.07) M.osc(t, hz(M.deg(s.tr, 14 + (i % 5)) + 12), 0.08, { v: 0.018, r: 0.6, send: 0.8, pan: rnd(-0.7, 0.7) });
      },
    },
    // Foire : orgue de barbarie mineur, valse rapide
    foire: {
      bpm: 168, beats: 3, sub: 2, root: 57, scale: SC.hmin, prog: [0, 0, 4, 4, 4, 4, 0, 0, 3, 3, 0, 0, 5, 4, 0, 0],
      form: [0, 1, 2, 3, 0, 1, 4, 5, 6, 7, 0, 1, 2, 3, 8, 9], seed: 67.2,
      play(s, M) {
        const t = s.t, i = s.i, ch = s.ch, tr = s.tr, p = tr.prog[s.bar % tr.prog.length];
        if (i === 0) { M.barb((s.bar % 2 ? M.deg(tr, p + 4) : ch[0]) - 24, t, s.sd * 1.5, 0.05); if (s.bar % 2 === 0) M.tambour(t, 0.08); }
        if (i === 2 || i === 4) { M.barb(ch[1] - 12, t, s.sd * 1.1, 0.014); M.barb(ch[2] - 12, t, s.sd * 1.1, 0.014); }
        const m = M.mel(s, [0, 1, 2, 3, 4, 5], 0.55);
        if (m != null) { M.barb(m + 12, t, s.sd * 0.9, 0.04); if (M.vr(s, 9) < 0.12) M.barb(m + 13, t + s.sd * 0.5, s.sd * 0.45, 0.03); }
        if (i === 3 && M.vr(s, 4) < 0.3) M.bois(t, 0.018);
      },
    },
  };

  /* ---------------- bruitages ---------------- */
  const GAP = { bonbon: 25, menu: 40, saut: 80, atterrir: 80, glace_craque: 300, carillon: 1500, traineau: 3000, etoile: 1000, decouverte: 800 };
  const FX = {
    bonbon(t, o, M) { const k = cl(Math.round(num(o.combo, 0)), 0, 10); M.glock(hz(79 + [0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24][k]), t, 0.09, 0.7, rnd(-0.2, 0.2)); },
    cadeau(t, o, M) {
      for (let k = 0; k < 6; k++) M.jingle(t + k * 0.045, 0.06, -0.2 + k * 0.08);
      [0, 4, 7, 12, 16].forEach((d, j) => M.celeste(72 + d, t + 0.12 + j * 0.07, 0.07, 1.2));
    },
    livraison(t, o, M) {
      M.choir([62, 66, 70, 74], t, 1.3, 0.07, { vow: 'a', a: 0.12, r: 0.9 });
      for (let k = 0; k < 3; k++) M.jingle(t + k * 0.05, 0.05, 0.2);
      [86, 90, 93, 98].forEach((n, j) => M.at(t + 0.15 + j * 0.13, tt => M.glock(hz(n), tt, 0.05, 1, -0.4 + j * 0.25)));
    },
    lanterne(t, o, M) {
      M.nz(t, 0.7, 0.07, 'bandpass', 300, { fs: 6, q: 1.2, a: 0.25 });
      [76, 83, 88, 95].forEach((n, j) => M.at(t + 0.3 + j * 0.14, tt => M.glock(hz(n), tt, 0.06, 1.4, -0.3 + j * 0.2)));
    },
    eclat(t, o, M) {
      const pent = [0, 2, 4, 7, 9];
      for (let j = 0; j < 10; j++) M.at(t + j * 0.035, tt => M.glock(hz(79 + pent[j % 5] + 12 * Math.floor(j / 5)), tt, 0.04 * (0.6 + j * 0.05), 0.6, -0.5 + j * 0.1));
      M.nz(t, 0.5, 0.03, 'highpass', 3000, { fs: 2.5, a: 0.3 });
    },
    spectre_fuit(t, o, M) {
      [1, 1.03].forEach(k => M.osc(t, 620 * k, 1.1, { w: 'sawtooth', v: 0.08, a: 0.04, slide: 0.35, cut: 1400, ft: 'bandpass', q: 4, env: 0.4, vib: 0.03, vibF: 7, pan: 0, pan2: 0.9, send: 0.6 }));
      M.nz(t, 0.9, 0.09, 'bandpass', 2800, { q: 2, fs: 0.3, a: 0.55, pan: 0.2, pan2: 0.9, send: 0.4 });
    },
    toucher_spectre(t, o, M) {
      [2093, 2217, 2349, 3136].forEach((f, j) => M.osc(t + j * 0.03, f, 1, { v: 0.016, a: 0.08, vib: 0.01, vibF: 9 + j, send: 0.6, pan: -0.6 + j * 0.4 }));
      M.nz(t, 0.9, 0.035, 'highpass', 5000, { a: 0.2 });
      M.osc(t, 70, 0.4, { v: 0.12, slide: 0.6 });
    },
    saut(t, o, M) { M.nz(t, 0.18, 0.04, 'bandpass', 800, { fs: 2.5 }); M.osc(t, 260, 0.14, { v: 0.04, slide: 1.6 }); },
    atterrir(t, o, M) { M.osc(t, 110, 0.14, { v: 0.14, slide: 0.45 }); M.nz(t, 0.14, 0.08, 'lowpass', 900, { fs: 0.5 }); },
    achat(t, o, M) { M.glock(hz(84), t, 0.06, 0.5); M.glock(hz(91), t + 0.07, 0.06, 0.7); M.jingle(t + 0.02, 0.04, 0.1); },
    refus(t, o, M) {
      M.osc(t, 196, 0.14, { w: 'sawtooth', v: 0.05, cut: 700, slide: 0.9 });
      M.osc(t + 0.15, 165, 0.22, { w: 'sawtooth', v: 0.05, cut: 600, slide: 0.85 });
    },
    decouverte(t, o, M) {
      M.cor(62, t, 0.24, 0.05); M.cor(69, t + 0.25, 0.24, 0.05); M.cor(74, t + 0.5, 0.42, 0.055);
      M.at(t + 0.95, tt => { [70, 74, 77, 81].forEach(n => M.cor(n - 12, tt, 0.9, 0.022)); M.choir([58, 65, 69], tt, 0.9, 0.04, { vow: 'o', a: 0.2, r: 0.6 }); });
      [86, 89, 93].forEach((n, j) => M.at(t + 1 + j * 0.15, tt => M.celeste(n, tt, 0.04, 1, -0.3 + j * 0.3)));
    },
    curiosite(t, o, M) {
      [76, 79, 83, 81, 88].forEach((n, j) => M.mbox(n, t + j * 0.14, 0.06, 1.1, -0.2 + j * 0.1));
      [96, 100, 103, 108].forEach((n, j) => M.at(t + 0.75 + j * 0.05, tt => M.glock(hz(n), tt, 0.025, 0.5, rnd(-0.6, 0.6))));
    },
    quete(t, o, M) {
      [67, 71, 74, 79, 83].forEach((n, j) => M.celeste(n, t + j * 0.08, 0.06, 1.2));
      M.at(t + 0.35, tt => { M.choir([55, 59, 62, 67], tt, 1.2, 0.06, { vow: 'a', a: 0.1, r: 0.8 }); for (let k = 0; k < 4; k++) M.jingle(tt + k * 0.05, 0.05, 0); });
    },
    etoile(t, o, M) {
      M.cloche(50, t, 0.06, 3.5);
      M.choir([57, 61, 64, 69], t + 0.1, 1.3, 0.05, { vow: 'o', a: 0.3, r: 0.4 });
      M.at(t + 1.4, tt => M.choir([62, 66, 69, 74], tt, 1.4, 0.055, { vow: 'a', a: 0.2, r: 1 }));
      for (let j = 0; j < 10; j++) M.at(t + 0.4 + j * 0.12, tt => M.glock(hz(100 - j * 2 - (j % 3)), tt, 0.035, 0.8, -0.6 + j * 0.13));
      M.at(t + 1.2, tt => M.nz(tt, 1.8, 0.02, 'highpass', 7000, { a: 0.8 }));
    },
    evanouir(t, o, M) {
      M.osc(t, 700, 1.6, { w: 'triangle', v: 0.06, slide: 0.1, cut: 2500, env: 0.1, send: 0.5 });
      M.osc(t, 705, 1.6, { v: 0.04, slide: 0.1 });
      M.nz(t, 1.6, 0.03, 'lowpass', 2000, { fs: 0.1, a: 0.1 });
    },
    reveil(t, o, M) {
      M.osc(t, 220, 0.9, { v: 0.05, slide: 2.5, a: 0.3, send: 0.4 });
      [67, 71, 74, 79].forEach((n, j) => M.celeste(n, t + 0.4 + j * 0.12, 0.05, 1));
    },
    carillon(t, o, M) {
      const n = cl(Math.round(num(o.coups, 1)), 1, 12);
      for (let k = 0; k < n; k++) M.at(t + k * 1.7, tt => M.cloche(43, tt, 0.09, 4.5, 0));
    },
    traineau(t, o, M) {
      for (let k = 0, tk = 0; tk < 6; k++, tk += 0.085) {
        const x = tk / 6, v = 0.085 * Math.pow(Math.sin(Math.PI * x), 1.2) * (k % 4 === 0 ? 1 : 0.6), pan = -1 + 2 * x, pf = 1.04 - 0.08 * x;
        M.at(t + tk + rnd(0, 0.015), tt => M.jingle(tt, v, pan, pf));
      }
    },
    menu(t, o, M) { M.osc(t, 1300, 0.035, { v: 0.035, a: 0.001 }); M.nz(t, 0.02, 0.02, 'highpass', 4000); },
    voyage(t, o, M) {
      M.nz(t, 1.3, 0.09, 'bandpass', 250, { fs: 14, q: 2, a: 0.6, pan: -0.7, pan2: 0.7, send: 0.4 });
      M.osc(t, 300, 1.1, { v: 0.03, slide: 4, a: 0.4, send: 0.5 });
      [84, 88, 91, 96].forEach((n, j) => M.at(t + 0.7 + j * 0.07, tt => M.glock(hz(n), tt, 0.03, 0.6, 0.3)));
    },
    glace_craque(t, o, M) {
      for (let j = 0; j < 6; j++) M.nz(t + j * 0.04 + rnd(0, 0.03), 0.015, 0.1, 'highpass', rnd(2500, 5500));
      M.osc(t + 0.05, 2800, 0.35, { v: 0.035, slide: 0.15, st: 0.25 });
      M.osc(t, 85, 0.5, { v: 0.08, slide: 0.7 });
    },
    corbeau(t, o, M) {
      const p = rnd(-0.6, 0.6);
      for (let j = 0; j < 2; j++) {
        const tt = t + j * 0.42;
        M.osc(tt, 360, 0.28, { w: 'sawtooth', v: 0.15, a: 0.02, slide: 0.78, cut: 1300, ft: 'bandpass', q: 2.5, vib: 0.06, vibF: 28, send: 0.25, pan: p });
        M.nz(tt, 0.25, 0.06, 'bandpass', 1500, { q: 3, pan: p });
      }
    },
    hibou(t, o, M) {
      const p = rnd(-0.6, 0.6);
      M.osc(t, 390, 0.25, { v: 0.06, a: 0.05, slide: 0.9, send: 0.5, pan: p });
      M.osc(t + 0.45, 400, 0.7, { v: 0.07, a: 0.08, slide: 0.85, vib: 0.01, vibF: 5, send: 0.5, pan: p });
    },
    boite_a_musique(t, o, M) { [76, 81, 79, 84, 83, 79].forEach((n, j) => M.mbox(n, t + j * 0.16, 0.06, 1.2, -0.2 + j * 0.08)); },
  };

  const A = {
    c: null, m0: null, gen: 0, mode: 's', P: null, eM: [], eS: [], players: [], want: null, timer: null, susp: false, muted: false,
    q: [], last: {}, musLvl: -1, sfxLvl: -1, amb: null, stepPh: 0.7, pied: 1, ambT: 0, crackT: 0, heartT: 0, creakT: 4, formT: 0, gust: 0.5,

    /* ---- contexte et graphe ---- */
    ready() {
      let c = null;
      try { if (typeof SFXK === 'undefined' || !SFXK) return null; SFXK.init(); c = SFXK.ctx; } catch (e) { return null; }
      if (!c || c.state !== 'running' || !SFXK.master) return null;
      if (this.c !== c || this.m0 !== SFXK.master || !this.mix) {
        try { this.build(c); } catch (e) { this.c = null; this.mix = null; return null; }
      }
      return c;
    },
    build(c) {
      this.c = null; this.mix = null; this.gen++; this.players = []; this.q = []; this.eM = []; this.eS = []; this.amb = null;
      this.musLvl = -1; this.sfxLvl = -1;
      const sr = c.sampleRate, G = v => { const g = c.createGain(); g.gain.value = v; return g; };
      this.muted = this.susp || hidden();
      const mix = G(this.muted ? 0 : 1), comp = c.createDynamicsCompressor(), fin = G(0.9);
      comp.threshold.value = -16; comp.knee.value = 8; comp.ratio.value = 5; comp.attack.value = 0.004; comp.release.value = 0.2;
      mix.connect(comp); comp.connect(fin); fin.connect(SFXK.master);
      this.musOut = G(0); this.sfxOut = G(0); this.ambOut = G(1);
      this.musOut.connect(mix); this.sfxOut.connect(mix); this.ambOut.connect(this.sfxOut);
      // réverbération (une seule, partagée ; ses entrées suivent les volumes musique / bruitages)
      const len = Math.floor(sr * 2.4), ir = c.createBuffer(2, len, sr);
      for (let ch = 0; ch < 2; ch++) {
        const d = ir.getChannelData(ch); let lp = 0;
        for (let i = 0; i < len; i++) { const x = i / len; lp += (Math.random() * 2 - 1 - lp) * (0.6 - 0.45 * x); d[i] = lp * Math.pow(1 - x, 2.6) * (i < 400 ? i / 400 : 1); }
      }
      const conv = c.createConvolver(); conv.normalize = true; conv.buffer = ir;
      const revOut = G(0.5); conv.connect(revOut); revOut.connect(mix);
      this.musRev = G(0); this.sfxRev = G(0); this.musRev.connect(conv); this.sfxRev.connect(conv);
      // bruit blanc (2 s) et craquements de neige (grains)
      this.nbuf = c.createBuffer(1, sr * 2, sr);
      const nd = this.nbuf.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
      this.crunch = [];
      for (let k = 0; k < 4; k++) {
        const n = Math.floor(sr * 0.16), b = c.createBuffer(1, n, sr), d = b.getChannelData(0), gl = Math.floor(sr * 0.0025);
        let amp = 0;
        for (let i = 0; i < n; i++) { if (i % gl === 0) amp = Math.random() < 0.3 ? 0.4 + Math.random() * 0.6 : Math.random() * 0.15; d[i] = (Math.random() * 2 - 1) * amp * Math.pow(1 - i / n, 1.3); }
        this.crunch.push(b);
      }
      const pw = arr => { const re = new Float32Array(arr.length + 1), im = new Float32Array(arr.length + 1); arr.forEach((a, i) => { im[i + 1] = a; }); return c.createPeriodicWave(re, im); };
      this.wOrg = pw([1, 0.55, 0.3, 0.22, 0.08, 0.1, 0.03, 0.05]);
      this.wBarb = pw([1, 0.7, 0.55, 0.45, 0.32, 0.25, 0.2, 0.12, 0.1, 0.06]);
      this.mix = mix; this.c = c; this.m0 = SFXK.master;
      this.buildAmb();
      this.applyLevels();
    },
    buildAmb() {
      const c = this.c, o = this.ambOut;
      const src = rate => { const s = c.createBufferSource(); s.buffer = this.nbuf; s.loop = true; s.playbackRate.value = rate; s.start(); return s; };
      const F = (type, f, q) => { const x = c.createBiquadFilter(); x.type = type; x.frequency.value = f; x.Q.value = q; return x; };
      const G = v => { const g = c.createGain(); g.gain.value = v; return g; };
      const a = {};
      // vent : deux bandes (souffle + sifflement), modulées lentement
      const n1 = src(0.37), n2 = src(1);
      a.bp1 = F('bandpass', 500, 0.8); a.bp2 = F('bandpass', 1100, 10); a.g2 = G(0); a.windG = G(0);
      n1.connect(a.bp1); a.bp1.connect(a.windG); n1.connect(a.bp2); a.bp2.connect(a.g2); a.g2.connect(a.windG); a.windG.connect(o);
      // chuchotement : bruit + voix grave désaccordée, à travers trois formants ; débit syllabique par LFO
      a.f = [F('bandpass', 500, 9), F('bandpass', 1100, 9), F('bandpass', 2600, 9)];
      const ws = G(1); [1, 0.7, 0.35].forEach((v, k) => { const g = G(v); n2.connect(a.f[k]); a.f[k].connect(g); g.connect(ws); });
      a.v1 = c.createOscillator(); a.v2 = c.createOscillator(); a.v1.type = a.v2.type = 'sawtooth';
      a.v1.frequency.value = 78; a.v2.frequency.value = 80.4;
      const vlp = F('lowpass', 700, 0.7), vg = G(0.35);
      a.v1.connect(vlp); a.v2.connect(vlp); vlp.connect(vg); vg.connect(a.f[0]); vg.connect(a.f[1]);
      const am = G(0.55); a.lfo = c.createOscillator(); a.lfo.frequency.value = 4.2; const lg = G(0.45);
      a.lfo.connect(lg); lg.connect(am.gain); ws.connect(am);
      a.spG = G(0);
      if (c.createStereoPanner) { a.pan = c.createStereoPanner(); am.connect(a.pan); a.pan.connect(a.spG); } else am.connect(a.spG);
      a.spG.connect(o);
      // feu : grondement sourd (les crépitements sont des événements brefs)
      const flp = F('lowpass', 320, 0.7); a.fireG = G(0); n1.connect(flp); flp.connect(a.fireG); a.fireG.connect(o);
      [a.v1, a.v2, a.lfo].forEach(x => x.start());
      this.amb = a;
    },
    applyLevels() {
      if (!this.mix) return;
      const g = reg(); let mOn = true, mv = 0.7, sOn = true, sv = 0.8;
      if (g) { mOn = g.musique !== false; mv = cl(num(g.mvol, 0.7), 0, 1); sOn = g.sons !== false; sv = cl(num(g.svol, 0.8), 0, 1); }
      const ml = mOn ? 0.3 * mv : 0, sl = sOn ? 0.85 * sv : 0, now = this.c.currentTime;
      if (ml !== this.musLvl) { this.musLvl = ml; this.musOut.gain.setTargetAtTime(ml, now, 0.15); this.musRev.gain.setTargetAtTime(ml, now, 0.15); }
      if (sl !== this.sfxLvl) { this.sfxLvl = sl; this.sfxOut.gain.setTargetAtTime(sl, now, 0.08); this.sfxRev.gain.setTargetAtTime(sl, now, 0.08); }
    },
    setMute(now) {
      const m = this.susp || hidden();
      if (m === this.muted || !this.mix) return;
      this.muted = m; const gg = this.mix.gain;
      gg.cancelScheduledValues(now); gg.setValueAtTime(gg.value, now); gg.setTargetAtTime(m ? 0 : 1, now, m ? 0.04 : 0.3);
    },
    startTimer() {
      if (this.timer || typeof setInterval !== 'function') return;
      this.timer = setInterval(() => { try { this.pump(); } catch (e) { } }, 50);
    },

    /* ---- séquenceur ---- */
    pump() {
      const c = this.ready(); if (!c) return;
      const now = c.currentTime;
      this.applyLevels(); this.setMute(now);
      if (this.muted) { this.q = this.q.filter(e => e.t > now - 1); return; }
      // file d'événements différés (longs bruitages)
      if (this.q.length) {
        const due = [], keep = [];
        this.q.forEach(e => (e.t < now + 0.25 ? due : keep).push(e)); this.q = keep;
        due.forEach(e => { if (e.t > now - 0.5) { try { e.fn(Math.max(e.t, now + 0.005)); } catch (er) { } } });
      }
      // changement de morceau : fondu enchaîné 1,5 s
      const want = this.musLvl > 0 && TR[this.want] ? this.want : null;
      const cur = this.players.length ? this.players[this.players.length - 1] : null, curN = cur && !cur.end ? cur.nom : null;
      if (curN !== want) {
        if (cur && !cur.end) this.fadeOut(cur, now);
        if (want) {
          const fi = cur ? 1.5 : 0.6, fade = c.createGain(), wet = c.createGain();
          [fade, wet].forEach(g => { g.gain.setValueAtTime(0, now); g.gain.linearRampToValueAtTime(1, now + fi); });
          fade.connect(this.musOut); wet.connect(this.musRev);
          this.players.push({ nom: want, tr: TR[want], fade, wet, step: 0, bar: 0, nextT: now + 0.08, end: 0 });
        }
        while (this.players.length > 3) this.drop(this.players[0]);
      }
      for (const p of this.players.slice()) {
        if (p.end && now > p.end + 0.6) { this.drop(p); continue; }
        if (p.nextT < now - 0.25) p.nextT = now + 0.05; // retour d'arrière-plan : on repart proprement
        const tr = p.tr, steps = tr.beats * tr.sub, sd = 60 / tr.bpm / tr.sub;
        let guard = 0;
        while (p.nextT < now + 0.3 && (!p.end || p.nextT < p.end) && guard++ < 32) {
          const s = { t: p.nextT, i: p.step, bar: p.bar, sd, tr, ch: this.chord(tr, p.bar) };
          this.mode = 'm'; this.P = p;
          try { tr.play(s, this); } catch (e) { }
          this.mode = 's'; this.P = null;
          p.nextT += sd; if (++p.step >= steps) { p.step = 0; p.bar++; }
        }
      }
    },
    fadeOut(p, now) {
      p.end = now + 1.5;
      [p.fade, p.wet].forEach(g => { g.gain.cancelScheduledValues(now); g.gain.setValueAtTime(g.gain.value, now); g.gain.linearRampToValueAtTime(0, now + 1.5); });
    },
    drop(p) {
      try { p.fade.disconnect(); p.wet.disconnect(); } catch (e) { }
      const k = this.players.indexOf(p); if (k >= 0) this.players.splice(k, 1);
    },
    deg(tr, d) { const sc = tr.scale, n = sc.length, o = Math.floor(d / n); return tr.root + sc[((d % n) + n) % n] + 12 * o; },
    chord(tr, bar) { const p = tr.prog[bar % tr.prog.length]; return [0, 2, 4, 7].map(k => this.deg(tr, p + k)); },
    // variation propre à CETTE boucle (le cycle entre dans le hasard : jamais deux boucles identiques)
    vr(s, k) { const tr = s.tr, L = tr.prog.length; return r(tr.seed * 3.7 + Math.floor(s.bar / L) * 17.13, (s.bar % L) * 32 + s.i, k); },
    // mélodie : thème fixe par motif (forme A A' B A…), notes de l'accord + notes de passage, varié à chaque boucle
    mel(s, slots, dens) {
      if (slots.indexOf(s.i) < 0) return null;
      const tr = s.tr, L = tr.prog.length, pos = s.bar % L, form = tr.form || [0, 1, 0, 2, 0, 1, 3, 4];
      const sd = tr.seed + form[pos % form.length] * 7.31, p = tr.prog[pos];
      if (pos === L - 1) return s.i === 0 ? this.deg(tr, p) : null; // cadence : note longue
      let on = s.i === 0 || r(sd, s.i, 1) < dens;
      if (s.i !== 0 && this.vr(s, 2) < 0.14) on = !on;
      if (!on) return null;
      let d = p + [0, 2, 4, 7][Math.floor(r(sd, s.i, 3) * 4)];
      if (r(sd, s.i, 4) < 0.28) d += r(sd, s.i, 5) < 0.5 ? 1 : -1;
      const v = this.vr(s, 6);
      if (v < 0.2) d += v < 0.1 ? 1 : -1; else if (v > 0.94) d += 7;
      return this.deg(tr, d);
    },

    /* ---- briques de synthèse ---- */
    res(n, end) { // réserve n voix jusqu'à `end` ; refuse au-delà de la polyphonie maximale
      const mus = this.mode === 'm', arr = mus ? this.eM : this.eS, now = this.c.currentTime; let j = 0;
      for (let i = 0; i < arr.length; i++) if (arr[i] > now) arr[j++] = arr[i];
      arr.length = j;
      if (j + n > (mus ? MAXV.m : MAXV.s)) return false;
      for (let i = 0; i < n; i++) arr.push(end);
      return true;
    },
    route(last, nodes, t, dur, o) {
      const c = this.c, mus = this.mode === 'm';
      if (o.pan != null && c.createStereoPanner) {
        const p = c.createStereoPanner(); p.pan.setValueAtTime(cl(o.pan, -1, 1), t);
        if (o.pan2 != null) p.pan.linearRampToValueAtTime(cl(o.pan2, -1, 1), t + dur);
        last.connect(p); last = p; nodes.push(p);
      }
      last.connect(o.dest || (mus ? this.P.fade : this.sfxOut));
      if (o.send) { const sg = c.createGain(); sg.gain.value = o.send; last.connect(sg); sg.connect(mus ? this.P.wet : this.sfxRev); nodes.push(sg); }
    },
    fin(src, nodes) { const gen = this.gen; src.onended = () => { if (gen !== this.gen) return; nodes.forEach(n => { try { n.disconnect(); } catch (e) { } }); }; },
    osc(t, f, dur, o = {}) {
      const c = this.c, v = Math.max(0.0002, o.v || 0.05), a = o.a || 0.004, rel = o.r || 0.06;
      const end = o.sus ? t + Math.max(a, dur) + rel : t + Math.max(a + 0.01, dur);
      if (!this.res(1, end)) return;
      const x = c.createOscillator(), g = c.createGain(), nodes = [x, g]; let last = x, lfo = null;
      if (o.wave) x.setPeriodicWave(o.wave); else x.type = o.w || 'sine';
      x.frequency.setValueAtTime(f, t);
      if (o.det) x.detune.setValueAtTime(o.det, t);
      if (o.slide) x.frequency.exponentialRampToValueAtTime(Math.max(15, f * o.slide), t + (o.st || dur));
      if (o.vib) { lfo = c.createOscillator(); const lg = c.createGain(); lfo.frequency.value = o.vibF || 5; lg.gain.value = f * o.vib; lfo.connect(lg); lg.connect(x.frequency); nodes.push(lfo, lg); }
      if (o.cut) {
        const fl = c.createBiquadFilter(); fl.type = o.ft || 'lowpass'; fl.frequency.setValueAtTime(o.cut, t); fl.Q.value = o.q || 0.8;
        if (o.env) fl.frequency.exponentialRampToValueAtTime(Math.max(40, o.cut * o.env), t + (o.et || dur));
        last.connect(fl); last = fl; nodes.push(fl);
      }
      last.connect(g);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + a);
      if (o.sus) g.gain.setValueAtTime(v, t + Math.max(a, dur));
      g.gain.exponentialRampToValueAtTime(0.0001, end);
      this.route(g, nodes, t, dur, o);
      x.start(t); x.stop(end + 0.03); if (lfo) { lfo.start(t); lfo.stop(end + 0.03); }
      this.fin(x, nodes);
    },
    nz(t, dur, v, type, f, o = {}) {
      const c = this.c, end = t + dur, a = Math.min(o.a || 0.003, dur * 0.8);
      if (!this.res(1, end)) return;
      const s = c.createBufferSource(), fl = c.createBiquadFilter(), g = c.createGain(), nodes = [s, fl, g];
      s.buffer = o.buf || this.nbuf; if (o.rate) s.playbackRate.value = o.rate;
      fl.type = type; fl.frequency.setValueAtTime(f, t); fl.Q.value = o.q || 1;
      if (o.fs) fl.frequency.exponentialRampToValueAtTime(Math.max(30, Math.min(18000, f * o.fs)), t + dur);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(Math.max(0.0002, v), t + a); g.gain.exponentialRampToValueAtTime(0.0001, end);
      s.connect(fl); fl.connect(g); this.route(g, nodes, t, dur, o);
      s.start(t, o.buf ? 0 : Math.random() * 1.5); s.stop(end + 0.02);
      this.fin(s, nodes);
    },
    choir(notes, t, len, v, o = {}) { // chœur : scies désaccordées à travers deux formants de voyelle
      const c = this.c, a = o.a || Math.min(0.8, len * 0.3), rel = o.r || 0.8, end = t + len + rel;
      if (!this.res(notes.length * 2, end)) return;
      const vw = VOWEL[o.vow] || VOWEL.a, sum = c.createGain(), g = c.createGain(), lfo = c.createOscillator(), lg = c.createGain();
      const f1 = c.createBiquadFilter(), f2 = c.createBiquadFilter(), g2 = c.createGain(), nodes = [sum, g, lfo, lg, f1, f2, g2];
      f1.type = f2.type = 'bandpass'; f1.frequency.value = vw[0]; f1.Q.value = 3; f2.frequency.value = vw[1]; f2.Q.value = 5; g2.gain.value = 0.6;
      sum.gain.value = 1 / Math.max(1, notes.length); sum.connect(f1); sum.connect(f2); f1.connect(g); f2.connect(g2); g2.connect(g);
      lfo.frequency.value = 5.2; lg.gain.value = 10; lfo.connect(lg);
      const os = [];
      notes.forEach(n => [-8, 8].forEach(dt => { const x = c.createOscillator(); x.type = 'sawtooth'; x.frequency.value = hz(n); x.detune.value = dt; lg.connect(x.detune); x.connect(sum); os.push(x); nodes.push(x); }));
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v * 3, t + a); g.gain.setValueAtTime(v * 3, t + Math.max(a, len)); g.gain.exponentialRampToValueAtTime(0.0001, end);
      this.route(g, nodes, t, len, Object.assign({ send: 0.5 }, o));
      lfo.start(t); lfo.stop(end + 0.03); os.forEach(x => { x.start(t); x.stop(end + 0.03); });
      this.fin(os[0], nodes);
    },
    mbox(n, t, v, len = 1.3, pan) { const f = hz(n); this.osc(t, f, len, { v, a: 0.002, send: 0.3, pan }); this.osc(t, f * 2, len * 0.3, { v: v * 0.15, a: 0.002, pan }); if (f * 6.27 < 15000) this.osc(t, f * 6.27, 0.07, { v: v * 0.12, a: 0.001, pan }); },
    celeste(n, t, v, len = 1.8, pan) { const f = hz(n); this.osc(t, f, len, { v, a: 0.004, send: 0.45, pan }); this.osc(t, f * 4, 0.3, { v: v * 0.15, a: 0.002, send: 0.3, pan }); },
    glock(f, t, v, len = 0.9, pan) { this.osc(t, f, len, { v, a: 0.001, send: 0.35, pan }); this.osc(t, f * 2.76, len * 0.35, { v: v * 0.3, a: 0.001, pan }); if (f * 5.4 < 16000) this.osc(t, f * 5.4, len * 0.15, { v: v * 0.12, a: 0.001, pan }); },
    cloche(n, t, v, len = 4, pan) {
      const f = hz(n);
      [[0.5, 0.6, 1], [1, 1, 0.8], [1.2, 0.5, 0.6], [1.5, 0.3, 0.5], [2, 0.4, 0.45], [2.74, 0.2, 0.3], [3.76, 0.12, 0.2]]
        .forEach(([k, a, d], j) => this.osc(t, f * k, len * d, { v: v * a, a: 0.002, det: j === 1 ? 3 : 0, send: 0.6, pan }));
    },
    jingle(t, v, pan, k = 1) {
      this.nz(t, 0.06, v * 0.6, 'highpass', 6500, { pan, q: 0.7 });
      this.osc(t, rnd(2900, 3400) * k, 0.07, { v: v * 0.25, a: 0.001, pan });
      this.osc(t, rnd(4100, 4700) * k, 0.05, { v: v * 0.18, a: 0.001, pan });
    },
    harpe(n, t, v, len = 1.6, pan) { this.osc(t, hz(n), len, { w: 'triangle', v, a: 0.003, cut: 3200, env: 0.2, et: 0.4, send: 0.4, pan }); },
    pizz(n, t, v, pan) { this.osc(t, hz(n), 0.2, { w: 'triangle', v, a: 0.002, cut: 2400, env: 0.15, et: 0.15, send: 0.15, pan }); },
    basson(n, t, len, v) { this.osc(t, hz(n), len, { w: 'sawtooth', v, a: 0.02, sus: 1, r: 0.06, cut: 750, q: 2.5, vib: 0.004, vibF: 5.5, send: 0.12 }); },
    orgue(n, t, len, v, cut = 1400) { this.osc(t, hz(n), len, { wave: this.wOrg, v, a: 0.35, sus: 1, r: 0.9, cut, send: 0.7 }); },
    barb(n, t, len, v) { this.osc(t, hz(n), len, { wave: this.wBarb, v, a: 0.012, sus: 1, r: 0.05, cut: 2600, vib: 0.006, vibF: 6.3, send: 0.18 }); },
    basse(n, t, v, len = 0.5) { this.osc(t, hz(n), len, { w: 'triangle', v, a: 0.004, cut: 600, send: 0.05 }); },
    cor(n, t, len, v) { this.osc(t, hz(n), len, { w: 'sawtooth', v, a: 0.05, sus: 1, r: 0.3, cut: 1200, vib: 0.004, send: 0.4 }); },
    pad(notes, t, len, v) { notes.forEach(n => [-9, 9].forEach(dt => this.osc(t, hz(n), len, { w: 'sawtooth', det: dt, v, a: len * 0.35, sus: 1, r: 1.2, cut: 1000, send: 0.5 }))); },
    bois(t, v) { this.nz(t, 0.04, v, 'bandpass', 1900, { q: 6 }); this.osc(t, 820, 0.04, { v: v * 0.5 }); },
    tambour(t, v) { this.osc(t, 90, 0.25, { v, slide: 0.5 }); this.nz(t, 0.12, v * 0.3, 'lowpass', 400); },
    at(t, fn) { this.q.push({ t, fn }); this.startTimer(); },

    /* ---- ambiance continue et pas ---- */
    updAmb(e, now) {
      const a = this.amb; if (!a) return;
      const T = 0.25, set = (p, v) => p.setTargetAtTime(v, now, T);
      const vent = cl(num(e.vent, 0), 0, 1), hh = cl(num(e.hauteur, 0), 0, 30) / 30, sp = cl(num(e.spectre, 0), 0, 1), feu = cl(num(e.feu, 0), 0, 1);
      this.gust = cl(this.gust + (Math.random() - 0.5) * 0.12, 0, 1);
      const gu = cl(0.5 + 0.35 * Math.sin(now * 0.23) * Math.sin(now * 0.071 + 1.3) + (this.gust - 0.5) * 0.5, 0, 1);
      set(a.windG.gain, (0.02 + 0.08 * vent + 0.035 * hh) * (0.55 + 0.7 * gu));
      set(a.bp1.frequency, 220 + 380 * gu + 600 * vent + 300 * hh);
      set(a.bp2.frequency, 650 + 700 * gu + 500 * vent);
      set(a.g2.gain, 0.06 + 0.5 * vent * gu + 0.15 * hh);
      set(a.spG.gain, 0.22 * Math.pow(sp, 1.2));
      if (sp > 0.01) {
        this.formT -= 0.1;
        if (this.formT <= 0) {
          this.formT = rnd(0.15, 0.35);
          const vw = VOY[Math.floor(Math.random() * VOY.length)], f0 = rnd(68, 84);
          a.f.forEach((fl, k) => fl.frequency.setTargetAtTime(vw[k] * 0.88, now, 0.05));
          a.v1.frequency.setTargetAtTime(f0, now, 0.1); a.v2.frequency.setTargetAtTime(f0 * 1.031, now, 0.1);
          a.lfo.frequency.setTargetAtTime(rnd(2.8, 5.5), now, 0.2);
          if (a.pan) a.pan.pan.setTargetAtTime(rnd(-0.7, 0.7), now, 0.6);
        }
      }
      set(a.fireG.gain, 0.06 * feu);
      set(this.ambOut.gain, e.enPause ? 0.12 : 1);
    },
    pas(surf, run) {
      const t = this.c.currentTime + 0.005, k = run ? 1 : 0.7, pan = (this.pied = -this.pied) * 0.12;
      if (surf === 'glace') {
        this.nz(t, 0.16, 0.05 * k, 'bandpass', 3500, { q: 2, fs: 1.6, a: 0.02, pan });
        this.osc(t, rnd(2400, 3000), 0.1, { v: 0.006 * k, slide: 1.25, pan });
      } else if (surf === 'pave') {
        this.osc(t, rnd(125, 150), 0.07, { v: 0.12 * k, slide: 0.5, pan });
        this.nz(t, 0.05, 0.06 * k, 'bandpass', rnd(900, 1200), { q: 1.5, pan });
      } else { // neige : craquement
        this.nz(t, 0.15, 0.28 * k, 'bandpass', rnd(1500, 2600), { buf: this.crunch[Math.floor(Math.random() * 4)], rate: rnd(0.8, 1.2), q: 0.6, a: 0.01, pan });
        this.nz(t, 0.08, 0.04 * k, 'lowpass', 500, { pan });
      }
    },

    /* ---------------- API publique ---------------- */
    musique(nom) {
      try { this.want = nom && TR[nom] ? nom : null; this.startTimer(); if (this.ready()) this.pump(); } catch (e) { }
    },
    maj(dt, e) {
      try {
        const c = this.ready(); if (!c) return;
        this.startTimer();
        e = e || {}; dt = cl(num(dt, 0.016), 0, 0.1);
        const now = c.currentTime, pause = !!e.enPause;
        this.setMute(now);
        if (this.muted || this.sfxLvl <= 0) return;
        this.ambT -= dt; if (this.ambT <= 0) { this.ambT = 0.1; this.updAmb(e, now); }
        const marche = cl(num(e.marche, 0), 0, 1);
        if (!pause && marche > 0.05) {
          this.stepPh += dt * (0.5 + marche) * (e.courir ? 2.1 : 1.35);
          if (this.stepPh >= 1) { this.stepPh = Math.min(this.stepPh - 1, 0.5); this.pas(e.surface || 'neige', !!e.courir); }
        } else this.stepPh = 0.7; // le premier pas vient vite quand on repart
        const feu = cl(num(e.feu, 0), 0, 1);
        if (!pause && feu > 0.02) {
          this.crackT -= dt;
          if (this.crackT <= 0) {
            this.crackT = rnd(0.04, 0.3) / (0.3 + feu); const t = now + 0.005;
            if (Math.random() < 0.8) this.nz(t, rnd(0.008, 0.025), rnd(0.04, 0.12) * Math.sqrt(feu), 'highpass', rnd(1500, 4500), { pan: rnd(-0.3, 0.3) });
            else this.nz(t, 0.05, 0.08 * feu, 'bandpass', rnd(400, 800), { q: 2, pan: rnd(-0.3, 0.3) });
          }
        }
        const froid = cl(num(e.froid, 0), 0, 1);
        if (!pause && froid > 0.7) {
          const x = (froid - 0.7) / 0.3, t = now + 0.01;
          this.heartT -= dt;
          if (this.heartT <= 0) {
            this.heartT = 1.15 - 0.35 * x; const k = 0.5 + 0.5 * x;
            this.osc(t, 58, 0.12, { v: 0.2 * k, slide: 0.6, a: 0.008 });
            this.osc(t + 0.22, 52, 0.14, { v: 0.14 * k, slide: 0.6, a: 0.008 });
          }
          this.creakT -= dt;
          if (this.creakT <= 0) { this.creakT = rnd(2.5, 6); this.osc(t, rnd(180, 260), rnd(0.5, 0.9), { w: 'sawtooth', v: 0.012 + 0.01 * x, a: 0.1, slide: 0.75, cut: 900, ft: 'bandpass', q: 6, pan: rnd(-0.5, 0.5) }); }
        } else this.heartT = 0.2;
      } catch (er) { }
    },
    sfx(nom, opt) {
      try {
        const fx = FX[nom]; if (!fx) return;
        const c = this.ready(); if (!c) return;
        this.setMute(c.currentTime);
        if (this.muted || this.sfxLvl <= 0) return;
        const pn = typeof performance !== 'undefined' ? performance.now() : Date.now(), gap = GAP[nom] || 60;
        if (pn - (this.last[nom] || -1e9) < gap) return;
        this.last[nom] = pn; this.mode = 's';
        fx(c.currentTime + 0.01, opt || {}, this);
      } catch (e) { }
    },
    appliquerReglages() { try { if (this.ready()) { this.applyLevels(); this.pump(); } } catch (e) { } },
    suspendre(b) { try { this.susp = !!b; const c = this.ready(); if (c) this.setMute(c.currentTime); } catch (e) { } },
  };
  return A;
})();
