/* ===================== MUSIQUE (une par ère, synthétisée en direct, aucun fichier) =====================
   Séquenceur WebAudio avec planification en avance (les notes sont programmées ~0,3 s à l'avance sur l'horloge
   audio : pas de décalage même si l'image ralentit). Chaque ère a son morceau, de plus en plus fou ; l'Infini
   superpose une gamme de Shepard (qui monte sans fin) et des citations de toutes les autres ères.
   Volume et marche/arrêt séparés des bruitages (Options). Coupée quand l'app passe en arrière-plan. */
const MUSIC = {
  bus: null, out: null, dly: null, cur: -1, step: 0, bar: 0, nextT: 0, preview: null, noise: null, timer: null, beatN: 0,
  init() {
    if (this.bus) return true;
    SFX.init(); const c = SFX.ctx; if (!c) return false;
    this.out = c.createGain(); this.out.gain.value = 0;
    const comp = c.createDynamicsCompressor(); comp.threshold.value = -18; comp.ratio.value = 4;
    this.out.connect(comp); comp.connect(c.destination);
    this.bus = c.createGain(); this.bus.connect(this.out);
    // écho (envoi) : délai pointé avec un filtre dans la boucle
    this.dly = c.createDelay(1.5); const fb = c.createGain(), lp = c.createBiquadFilter();
    fb.gain.value = 0.33; lp.type = 'lowpass'; lp.frequency.value = 2400;
    this.dly.connect(lp); lp.connect(fb); fb.connect(this.dly); lp.connect(this.out);
    const len = c.sampleRate; this.noise = c.createBuffer(1, len, c.sampleRate);
    const d = this.noise.getChannelData(0); for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return true;
  },
  start() { if (!this.timer) this.timer = setInterval(() => { try { this.pump(); } catch (e) { } }, 50); },
  target() { return this.preview != null ? this.preview : S.era; },
  level() { return S.set.music ? 0.45 * S.set.mvol : 0; },
  pump() {
    const c = SFX.ctx;
    if (!c || c.state !== 'running' || !this.init()) return;
    const now = c.currentTime, on = S.set.music && S.set.mvol > 0 && !document.hidden && G.ready !== false;
    if (!on) { if (this.cur !== -1) { this.out.gain.cancelScheduledValues(now); this.out.gain.setTargetAtTime(0, now, 0.15); this.cur = -1; this.lastLvl = null; } return; }
    const tr = MTRACKS[this.target()] || MTRACKS[0];
    if (this.cur !== this.target()) { // fondu enchaîné vers le morceau de la nouvelle ère
      const first = this.cur === -1;
      this.out.gain.cancelScheduledValues(now); this.out.gain.setTargetAtTime(0, now, 0.12);
      this.cur = this.target(); this.step = 0; this.bar = 0; this.nextT = now + (first ? 0.15 : 0.7);
      this.out.gain.setTargetAtTime(this.level(), this.nextT, 0.5);
      this.dly.delayTime.setValueAtTime(Math.min(1.4, 60 / tr.bpm * 0.75), now);
    } else if (this.lastLvl !== this.level()) this.out.gain.setTargetAtTime(this.level(), now, 0.2);
    this.lastLvl = this.level();
    if (this.nextT < now - 0.5) this.nextT = now + 0.05; // retour d'arrière-plan : on repart proprement
    const sd = 60 / tr.bpm / 4, steps = tr.steps || 16;
    while (this.nextT < now + 0.3) {
      const swing = this.step % 2 ? (tr.swing || 0) * sd : 0;
      const s = { t: this.nextT + swing, i: this.step, bar: this.bar, sd, tr, ch: this.chord(tr, this.bar) };
      try { tr.play(s, this); } catch (e) { }
      this.nextT += sd; this.step++;
      if (this.step >= steps) { this.step = 0; this.bar++; }
    }
  },
  // ---- outils musicaux ----
  hz(m) { return 440 * Math.pow(2, (m - 69) / 12); },
  r(a, b = 0, k = 0) { const x = Math.sin(a * 12.9898 + b * 78.233 + k * 37.719) * 43758.5453; return x - Math.floor(x); }, // hasard reproductible
  chord(tr, bar) { // notes MIDI de l'accord de la mesure (triade ou septième construite sur la gamme)
    const p = tr.prog[bar % tr.prog.length], sc = tr.scale, root = tr.root + (tr.mod ? tr.mod(bar) : 0);
    if (Array.isArray(p)) return p.map(x => root + x);
    const deg = k => { const o = Math.floor((p + k) / sc.length); return root + sc[(p + k) % sc.length] + 12 * o; };
    return [deg(0), deg(2), deg(4), deg(6)];
  },
  scaleNote(tr, bar, k) { const sc = tr.scale, root = tr.root + (tr.mod ? tr.mod(bar) : 0), o = Math.floor(k / sc.length); return root + sc[((k % sc.length) + sc.length) % sc.length] + 12 * o; },
  // mélodie : motifs de 2 mesures répétés en A A B A sur 8 mesures, notes de l'accord + notes de passage
  melody(s, dens = 0.45, oct = 24) {
    const tr = s.tr, ph = s.bar % 8, motif = ph === 4 || ph === 5 ? 1 : 0, half = ph % 2, seed = tr.seed + motif * 7 + half * 3;
    if (this.r(seed, s.i) > dens) return null;
    const k = Math.floor(this.r(seed, s.i, 1) * 5) - 1, ct = s.ch[(Math.abs(k) + (s.i >> 2)) % 3];
    return ct + oct + (this.r(seed, s.i, 2) < 0.25 ? (k > 0 ? 2 : -1) : 0);
  },
  // ---- instruments ----
  note(m, t, len, o = {}) {
    const c = SFX.ctx, f = o.hz ? m : this.hz(m); // m = note MIDI, ou fréquence en Hz si o.hz
    const g = c.createGain(), v = (o.v || 0.05), a = o.a || 0.006, rel = o.r || 0.08;
    const oscs = (o.det ? [-o.det, o.det] : [0]).map(dt => { const x = c.createOscillator(); x.type = o.w || 'square'; x.frequency.setValueAtTime(f, t); x.detune.value = dt; if (o.slide) x.frequency.exponentialRampToValueAtTime(Math.max(20, f * o.slide), t + len); return x; });
    if (o.vib) { const l = c.createOscillator(), lg = c.createGain(); l.frequency.value = o.vibF || 5.5; lg.gain.value = f * o.vib; l.connect(lg); oscs.forEach(x => lg.connect(x.frequency)); l.start(t); l.stop(t + len + rel + 0.05); }
    let node = g;
    if (o.cut) { const fl = c.createBiquadFilter(); fl.type = o.ft || 'lowpass'; fl.frequency.setValueAtTime(o.cut, t); if (o.env) fl.frequency.exponentialRampToValueAtTime(Math.max(60, o.cut * o.env), t + len); fl.Q.value = o.q || 1; oscs.forEach(x => x.connect(fl)); fl.connect(g); }
    else oscs.forEach(x => x.connect(g));
    const peak = v / oscs.length;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + a);
    if (o.sus) g.gain.setValueAtTime(peak, t + Math.max(a, len - rel)); else g.gain.exponentialRampToValueAtTime(peak * 0.35, t + Math.max(a + 0.01, len * 0.6));
    g.gain.exponentialRampToValueAtTime(0.0001, t + len + rel);
    g.connect(this.bus); if (o.send) { const sg = c.createGain(); sg.gain.value = o.send; g.connect(sg); sg.connect(this.dly); }
    oscs.forEach(x => { x.start(t); x.stop(t + len + rel + 0.05); });
    return node;
  },
  nz(t, len, v, type, f, q = 1, send = 0) {
    const c = SFX.ctx, s = c.createBufferSource(), fl = c.createBiquadFilter(), g = c.createGain();
    s.buffer = this.noise; s.playbackRate.value = 1; fl.type = type; fl.frequency.value = f; fl.Q.value = q;
    g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.0001, t + len);
    s.connect(fl); fl.connect(g); g.connect(this.bus); if (send) { const sg = c.createGain(); sg.gain.value = send; g.connect(sg); sg.connect(this.dly); }
    s.start(t, Math.random() * 0.5); s.stop(t + len + 0.02);
  },
  kick(t, v = 0.5, f = 140) { this.note(f, t, 0.16, { hz: 1, w: 'sine', v, a: 0.002, r: 0.06, slide: 0.3 }); },
  snare(t, v = 0.18, len = 0.14) { this.nz(t, len, v, 'bandpass', 1800, 0.7); this.note(190, t, 0.06, { hz: 1, w: 'triangle', v: v * 0.5, a: 0.002, r: 0.03 }); },
  hat(t, v = 0.05, open = false) { this.nz(t, open ? 0.18 : 0.04, v, 'highpass', 7000, 0.8); },
  tick(t, v = 0.05, f = 1800) { this.note(f, t, 0.02, { hz: 1, w: 'square', v, a: 0.001, r: 0.02 }); },
  tom(t, v = 0.25, f = 120) { this.note(f, t, 0.22, { hz: 1, w: 'sine', v, a: 0.002, r: 0.08, slide: 0.55 }); },
  // gamme de Shepard : chaque note est une pile d'octaves pondérée en cloche -> elle semble monter sans fin
  shepard(t, k, len, v = 0.05) {
    for (let o = 0; o < 8; o++) {
      const f = 32.7 * Math.pow(2, o + (k % 12) / 12), x = Math.log2(f / 440), w = Math.exp(-x * x / 1.6);
      if (w > 0.03) this.note(f, t, len, { hz: 1, w: 'sine', v: v * w, a: 0.03, r: 0.12, sus: true });
    }
  },
};

// Gammes (demi-tons depuis la tonique)
const SC_MAJ = [0, 2, 4, 5, 7, 9, 11], SC_MIN = [0, 2, 3, 5, 7, 8, 10], SC_HMIN = [0, 2, 3, 5, 7, 8, 11], SC_PHR = [0, 1, 3, 5, 7, 8, 10],
  SC_DOR = [0, 2, 3, 5, 7, 9, 10], SC_WT = [0, 2, 4, 6, 8, 10], SC_LYD = [0, 2, 4, 6, 7, 9, 11];
const MTRACKS = [
  { // 0 — Le Garage : lo-fi bricolé, doux et chaloupé
    name: 'Bricolage lo-fi', bpm: 82, swing: 0.16, root: 60, scale: SC_MAJ, prog: [0, 5, 3, 4], seed: 11,
    play(s, M) {
      const t = s.t, i = s.i;
      if (i === 0 || i === 10) M.kick(t, 0.32, 110);
      if (i === 4 || i === 12) M.nz(t, 0.08, 0.06, 'bandpass', 2600, 1.5);
      if (i % 2 === 0) M.hat(t, 0.018);
      if (i === 0 || i === 7 || i === 8) M.note(s.ch[0] - 24 + (i === 7 ? 7 : 0), t, s.sd * 3, { w: 'triangle', v: 0.16, r: 0.12 });
      if (i === 0) s.ch.slice(0, 4).forEach(n => M.note(n, t, s.sd * 14, { w: 'sine', v: 0.03, a: 0.08, r: 0.4, sus: true }));
      const m = M.melody(s, 0.3, 12); if (m != null && i % 2 === 0) M.note(m, t, s.sd * 1.6, { w: 'triangle', v: 0.05, r: 0.15, send: 0.25 });
    },
  },
  { // 1 — L'Université : baroque de cours magistral (clavecin en arpèges)
    name: 'Fugue pour amphithéâtre', bpm: 100, root: 62, scale: SC_HMIN, prog: [0, 3, 4, 0, 5, 1, 4, 4], seed: 23,
    play(s, M) {
      const t = s.t, i = s.i, ch = s.ch, arp = [0, 1, 2, 1, 3, 1, 2, 1];
      M.note(ch[arp[i % 8] % 3] + (arp[i % 8] === 3 ? 12 : 0) + 12, t, s.sd * 0.9, { w: 'square', v: 0.08, a: 0.002, r: 0.05, cut: 3200 });
      if (i % 4 === 0) M.note(ch[0] - 12 - (i === 8 ? 5 : 0), t, s.sd * 1.8, { w: 'square', v: 0.11, a: 0.002, r: 0.05, cut: 900 });
      if (i % 4 === 0) M.tick(t, 0.02, 2200);
      const m = M.melody(s, 0.35, 24); if (m != null && i % 2 === 0 && s.bar % 4 > 1) M.note(m, t, s.sd * 1.8, { w: 'triangle', v: 0.08, r: 0.1, vib: 0.006 });
    },
  },
  { // 2 — La MégaCorp : funk d'ascenseur corporatif
    name: 'Synergie d’ascenseur', bpm: 108, swing: 0.1, root: 65, scale: SC_MAJ, prog: [[0, 4, 7, 11], [-3, 0, 4, 7], [2, 5, 9, 12], [-5, -1, 2, 5]], seed: 37,
    play(s, M) {
      const t = s.t, i = s.i, ch = s.ch, bass = [0, null, 12, null, null, 0, null, 7, 0, null, 12, 10, null, 7, null, 5];
      if (i === 0 || i === 6 || i === 8) M.kick(t, 0.38);
      if (i === 4 || i === 12) M.snare(t, 0.12);
      if (i % 2 === 0) M.hat(t, 0.025, i === 14);
      if (bass[i] != null) M.note(ch[0] - 24 + bass[i], t, s.sd * 0.9, { w: 'sawtooth', v: 0.09, a: 0.003, r: 0.05, cut: 1400, env: 0.25, q: 6 });
      if (i === 2 || i === 7 || i === 10) ch.forEach(n => M.note(n, t, s.sd * 1.2, { w: 'sine', v: 0.025, a: 0.004, r: 0.15 }));
      const m = M.melody(s, 0.3, 12); if (m != null && i % 2 === 0) M.note(m, t, s.sd * 1.5, { w: 'triangle', v: 0.045, r: 0.12, send: 0.2 });
    },
  },
  { // 3 — L'Ère atomique : tension, compteur Geiger
    name: 'Demi-vie', bpm: 124, root: 52, scale: SC_PHR, prog: [0, 1, 0, 6], seed: 41,
    play(s, M) {
      const t = s.t, i = s.i, ch = s.ch;
      if (i % 4 === 0) M.kick(t, 0.42);
      if (i === 4 || i === 12) M.snare(t, 0.14);
      if (M.r(s.bar, i, 9) < 0.35) M.nz(t, 0.012, 0.05, 'highpass', 5000); // grésillements Geiger
      if (i % 2 === 0) M.note(ch[0] - 12, t, s.sd * 0.8, { w: 'sawtooth', v: 0.06, a: 0.003, r: 0.04, cut: 700, env: 0.5 });
      M.note(ch[i % 3] + 12 + (i % 8 === 7 ? 12 : 0), t, s.sd * 0.5, { w: 'square', v: 0.022, a: 0.002, r: 0.03 });
      if (s.bar % 4 === 3 && (i === 0 || i === 8)) M.note(ch[0] + 24, t, s.sd * 6, { w: 'square', v: 0.03, vib: 0.02, vibF: 7, r: 0.1 }); // sirène
    },
  },
  { // 4 — L'Ère orbitale : dérive spatiale, nappes et cloches
    name: 'Apesanteur', bpm: 92, root: 57, scale: SC_DOR, prog: [0, 3, 5, 4], seed: 53,
    play(s, M) {
      const t = s.t, i = s.i, ch = s.ch;
      if (i === 0) { ch.forEach(n => M.note(n, t, s.sd * 15, { w: 'sawtooth', det: 9, v: 0.035, a: 0.6, r: 0.8, cut: 1100, sus: true })); M.note(ch[0] - 24, t, s.sd * 15, { w: 'sine', v: 0.12, a: 0.1, r: 0.5, sus: true }); M.kick(t, 0.3, 90); }
      if (i === 8) M.kick(t, 0.2, 90);
      if (i % 3 === 0) M.note(ch[(i / 3) % 4 | 0] + 24, t, s.sd * 2, { w: 'sine', v: 0.03, a: 0.003, r: 0.4, send: 0.45 });
      if (M.r(s.bar, i, 4) < 0.08) M.note(M.scaleNote(s.tr, s.bar, 21 + (i % 5)), t, 0.05, { w: 'sine', v: 0.03, r: 0.6, send: 0.6 }); // étincelles
    },
  },
  { // 5 — L'Ère dimensionnelle : 7/8 tordu, gamme par tons, pépins
    name: 'Géométrie non euclidienne', bpm: 132, steps: 14, root: 60, scale: SC_WT, prog: [0, 1, 2, 4, 3, 1], mod: b => (b % 12 < 6 ? 0 : 2), seed: 67,
    play(s, M) {
      const t = s.t, i = s.i, ch = s.ch;
      if (i === 0 || i === 6 || i === 10) M.kick(t, 0.42);
      if (i === 4 || i === 12) M.snare(t, 0.13);
      if (i % 2 === 1) M.hat(t, 0.025);
      if (i % 2 === 0) M.note(ch[(i >> 1) % 3] - 12, t, s.sd * 0.9, { w: 'square', v: 0.04, a: 0.002, r: 0.04, cut: 1600 });
      const m = M.melody(s, 0.4, 12); if (m != null) M.note(m, t, s.sd * 1.2, { w: 'triangle', v: 0.045, vib: 0.03, vibF: 9, r: 0.1, send: 0.3, slide: M.r(s.bar, i, 3) < 0.2 ? 1.5 : 0 });
      if (M.r(s.bar, i, 8) < 0.06) M.nz(t, 0.15, 0.05, 'bandpass', 600 + 3000 * M.r(s.bar, i), 8); // pépin dimensionnel
    },
  },
  { // 6 — L'Ère stellaire : synthwave épique
    name: 'Forge des étoiles', bpm: 118, root: 59, scale: SC_MIN, prog: [0, 5, 2, 6], seed: 79,
    play(s, M) {
      const t = s.t, i = s.i, ch = s.ch;
      if (i % 4 === 0) M.kick(t, 0.5);
      if (i === 4 || i === 12) M.snare(t, 0.2, 0.3);
      M.hat(t, i % 2 ? 0.02 : 0.035);
      if (i % 2 === 0) M.note(ch[0] - 24 + (i % 4 === 2 ? 12 : 0), t, s.sd * 0.9, { w: 'sawtooth', v: 0.07, a: 0.003, r: 0.04, cut: 900, env: 0.6 });
      if (i === 0 || i === 6 || i === 12) ch.slice(0, 3).forEach(n => M.note(n, t, s.sd * 2.5, { w: 'sawtooth', det: 12, v: 0.04, a: 0.005, r: 0.2, cut: 2600 }));
      const m = M.melody(s, 0.32, 24); if (m != null && i % 2 === 0) M.note(m, t, s.sd * 2, { w: 'sawtooth', det: 6, v: 0.035, r: 0.15, cut: 3500, send: 0.3 });
      if (s.bar % 8 === 7 && i >= 12) M.tom(t, 0.3, 200 - (i - 12) * 30);
    },
  },
  { // 7 — L'Ère cosmique : hyperespace, arpèges fous, monte d'un demi-ton toutes les 8 mesures
    name: 'Hyperespace', bpm: 150, root: 54, scale: SC_MIN, prog: [0, 6, 5, 4], mod: b => (b >> 3) % 6, seed: 97,
    play(s, M) {
      const t = s.t, i = s.i, ch = s.ch, br = [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0];
      if (br[i]) M.kick(t, 0.45);
      if (i === 4 || i === 12 || (i === 14 && s.bar % 2)) M.snare(t, 0.15);
      M.hat(t, 0.02);
      M.note(ch[i % 4] + 12 * ((i >> 2) % 3), t, s.sd * 0.6, { w: 'square', v: 0.022, a: 0.002, r: 0.03, send: 0.2 });
      if (i % 2 === 0) M.note(ch[0] - 24, t, s.sd * 0.9, { w: 'sawtooth', v: 0.06, cut: 1200, env: 0.4, r: 0.04 });
      if (i === 0) ch.slice(0, 3).forEach(n => M.note(n + 12, t, s.sd * 15, { w: 'sine', det: 6, v: 0.03, a: 0.3, r: 0.5, sus: true, vib: 0.004 })); // chœur
    },
  },
  { // 8 — L'Infini : tout en même temps. Gamme de Shepard sans fin + citations des huit autres ères
    name: 'Tout, partout, en même temps', bpm: 160, root: 60, scale: SC_LYD, prog: [0, 1, 4, 5], seed: 101,
    play(s, M) {
      const t = s.t, i = s.i;
      if (i % 4 === 0) { M.shepard(t, M.beatN++, s.sd * 4, 0.06); M.kick(t, 0.4); }
      if (i === 4 || i === 12) M.snare(t, 0.14, 0.2);
      // chaque 4 mesures, une autre ère est citée (rythmique et basses) par-dessus
      const q = MTRACKS[(s.bar >> 2) % 8];
      const qs = { t, i: i % (q.steps || 16), bar: s.bar, sd: s.sd, tr: q, ch: M.chord(q, s.bar).map(n => n + ((s.bar >> 2) % 3) * 2) };
      try { q.play(qs, M); } catch (e) { }
      if (M.r(s.bar, i, 13) < 0.05) M.note(M.scaleNote(s.tr, s.bar, 14 + (i % 7)), t, 0.1, { w: 'sine', v: 0.04, r: 0.8, send: 0.7, slide: 2 });
    },
  },
];
