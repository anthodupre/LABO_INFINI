/* ===================== SONS (synthèse 8-bit, aucun fichier) ===================== */
const SFX = {
  ctx: null, master: null, last: {}, combo: 0, comboT: 0,
  init() {
    if (this.ctx) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
      this.ctx = new AC(); this.master = this.ctx.createGain(); this.master.gain.value = 0.5; this.master.connect(this.ctx.destination);
    } catch (e) { this.ctx = null; }
  },
  unlock() {
    this.init();
    const c = this.ctx; if (!c) return;
    if (c.state === 'closed') { this.ctx = null; this.init(); return; }
    if (c.state !== 'running') { try { const p = c.resume(); if (p && p.catch) p.catch(() => { }); } catch (e) { } }
  },
  tone(f, dur, type = 'square', vol = 0.15, when = 0, slide = 0) {
    const c = this.ctx, t = c.currentTime + when;
    const o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, f + slide), t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(this.master); o.start(t); o.stop(t + dur + 0.02);
  },
  noise(dur, vol = 0.1, when = 0, hp = 0) {
    const c = this.ctx, t = c.currentTime + when, len = Math.floor(c.sampleRate * dur);
    const buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const s = c.createBufferSource(), g = c.createGain(); s.buffer = buf; g.gain.value = vol;
    if (hp) { const f = this.ctx.createBiquadFilter(); f.type = hp > 0 ? 'highpass' : 'lowpass'; f.frequency.value = Math.abs(hp); s.connect(f); f.connect(g); } else s.connect(g);
    g.connect(this.master); s.start(t);
  },
  arp(fs, step, dur, type, vol, when = 0) { fs.forEach((f, i) => this.tone(f, dur, type, vol, when + i * step)); },
  // Clic sur le récipient : le son change avec l'ère, et monte quand on clique vite (combo)
  click() {
    const now = performance.now();
    this.combo = now - this.comboT < 260 ? Math.min(14, this.combo + 1) : 0; this.comboT = now;
    const k = Math.pow(2, this.combo / 24), e = S.era === 8 ? Math.floor(Math.random() * 8) : S.era;
    switch (e) {
      case 0: this.tone(U.rand(260, 330) * k, 0.07, 'sine', 0.12, 0, 420 * k); break; // bulle
      case 1: this.tone(1700 * k, 0.025, 'square', 0.035); this.tone(850 * k, 0.04, 'triangle', 0.06, 0.01); break; // craie
      case 2: this.tone(1319 * k, 0.05, 'sine', 0.08); this.tone(1760 * k, 0.07, 'sine', 0.05, 0.03); break; // caisse enregistreuse
      case 3: this.noise(0.02, 0.08, 0, 3000); this.tone(U.rand(2000, 2600), 0.012, 'square', 0.03); break; // Geiger
      case 4: this.tone(1500 * k, 0.09, 'square', 0.05, 0, -1150); break; // laser
      case 5: this.tone(U.rand(300, 900) * k, 0.08, 'triangle', 0.08, 0, U.pick([-250, 400])); break; // distorsion
      case 6: this.tone(U.pick([1047, 1175, 1319, 1568, 1760]) * k, 0.06, 'sine', 0.07); break; // étincelle
      default: this.tone(880 * k, 0.1, 'sine', 0.06); this.tone(1319 * k, 0.12, 'sine', 0.04, 0.02); // carillon
    }
  },
  play(name) {
    if (!S.set.sound || !this.ctx || this.ctx.state !== 'running') return;
    const now = performance.now();
    const minGap = { click: 35, buy: 40, petri: 60, plant: 60, harvest: 80, goldspawn: 500, boom: 1500, glitch: 2500, buffend: 400, kevin: 3000 }[name] || 0;
    if (minGap && now - (this.last[name] || 0) < minGap) return;
    this.last[name] = now;
    this.master.gain.value = 0.5 * S.set.vol;
    try {
      switch (name) {
        case 'click': this.click(); break;
        case 'buy': this.tone(523, 0.05, 'triangle', 0.18); this.tone(784, 0.07, 'triangle', 0.18, 0.05); break;
        case 'buybulk': this.arp([523, 659, 784, 1047, 1319], 0.035, 0.07, 'triangle', 0.14); break;
        case 'newb': // nouveau type de bâtiment : petite fanfare
          this.arp([392, 523, 659, 784], 0.07, 0.12, 'square', 0.07); this.tone(1047, 0.45, 'triangle', 0.12, 0.28); this.tone(1319, 0.4, 'sine', 0.06, 0.32); break;
        case 'sell': this.tone(523, 0.06, 'triangle', 0.15); this.tone(330, 0.09, 'triangle', 0.15, 0.06); break;
        case 'upgrade': this.arp([523, 659, 784, 1047], 0.055, 0.08, 'square', 0.07); break;
        case 'node': this.arp([262, 330, 392], 0, 0.6, 'triangle', 0.08); this.arp([523, 659, 784, 1047], 0.08, 0.2, 'sine', 0.07, 0.1); break;
        case 'error': this.tone(140, 0.12, 'sawtooth', 0.08, 0, -40); break;
        case 'goldspawn': this.tone(1568, 0.12, 'sine', 0.1); this.tone(2093, 0.18, 'sine', 0.08, 0.1); break;
        case 'gold': this.arp([880, 1109, 1319, 1760, 2217], 0.045, 0.12, 'sine', 0.12); break;
        case 'frenzy': this.tone(220, 0.6, 'sawtooth', 0.05, 0.25, 660); this.arp([1760, 2217, 2637], 0.06, 0.15, 'square', 0.04, 0.3); break;
        case 'clickfrenzy': for (let i = 0; i < 10; i++) this.tone(1200 + i * 120, 0.04, 'square', 0.035, 0.25 + i * 0.03); break;
        case 'storm': for (let i = 0; i < 8; i++) this.tone(U.rand(1500, 3000), 0.08, 'sine', 0.05, 0.25 + i * 0.07); break;
        case 'anomaly': this.tone(220, 0.5, 'sawtooth', 0.06, 0, 900); this.tone(330, 0.5, 'square', 0.05, 0.05, -200); break;
        case 'incident': // klaxon d'alarme du labo
          for (let i = 0; i < 3; i++) { this.tone(660, 0.16, 'square', 0.06, i * 0.34); this.tone(494, 0.16, 'square', 0.06, i * 0.34 + 0.17); }
          this.noise(0.25, 0.04, 0, -900); break;
        case 'ach': this.arp([523, 659, 784], 0.08, 0.1, 'square', 0.08); this.tone(1047, 0.35, 'square', 0.08, 0.24); break;
        case 'eureka': this.tone(300, 0.45, 'sine', 0.15, 0, 1300); this.arp([1319, 1568, 2093], 0.07, 0.15, 'square', 0.05, 0.3); break;
        case 'publish': [262, 330, 392, 523].forEach(f => this.tone(f, 1.2, 'triangle', 0.1)); this.noise(0.6, 0.06); this.arp([1047, 1319, 1568, 2093], 0.12, 0.3, 'sine', 0.06, 0.5); break;
        case 'era': this.arp([392, 523, 659, 784, 1047], 0.1, 0.18, 'square', 0.07); [523, 659, 784].forEach(f => this.tone(f, 0.9, 'triangle', 0.08, 0.5)); this.noise(0.8, 0.03, 0.5, 4000); break;
        case 'petri': case 'plant': this.tone(300, 0.08, 'sine', 0.15, 0, 300); this.tone(180, 0.06, 'triangle', 0.08, 0.04); break;
        case 'harvest': for (let i = 0; i < 4; i++) this.tone(U.rand(500, 900) + i * 150, 0.06, 'sine', 0.1, i * 0.05, 400); break; // bulles qui éclatent
        case 'mutation': this.tone(200, 0.7, 'sine', 0.08, 0, 600); this.arp([988, 1245, 1480, 1976], 0.09, 0.2, 'triangle', 0.06, 0.2); break;
        case 'chalstart': this.tone(98, 0.5, 'sawtooth', 0.08, 0, 30); this.arp([196, 233, 294], 0.15, 0.3, 'square', 0.06, 0.2); break;
        case 'chalwin': this.arp([523, 523, 523, 659, 784], 0.11, 0.14, 'square', 0.08); this.tone(1047, 0.7, 'triangle', 0.12, 0.6); this.noise(0.5, 0.03, 0.6, 5000); break;
        case 'chalfail': [392, 370, 349, 330].forEach((f, i) => this.tone(f, i === 3 ? 0.8 : 0.28, 'sawtooth', 0.07, i * 0.3, i === 3 ? -60 : 0)); break; // trombone triste
        case 'advice': this.tone(1568, 0.5, 'sine', 0.07); this.tone(2093, 0.6, 'sine', 0.05, 0.12); this.tone(784, 0.8, 'triangle', 0.05, 0.05); break; // clochette du comité
        case 'buffend': this.tone(880, 0.12, 'triangle', 0.06, 0, -400); break;
        case 'welcome': this.arp([392, 494, 587, 784], 0.09, 0.2, 'triangle', 0.09); break;
        case 'boom': this.tone(70, 0.9, 'sine', 0.12, 0, -40); this.noise(0.9, 0.035, 0, -500); break; // Big Bang au loin
        case 'glitch': for (let i = 0; i < 5; i++) this.tone(U.rand(200, 3000), 0.025, 'square', 0.03, i * 0.03); break;
        case 'kevin': this.tone(700, 0.08, 'triangle', 0.06, 0, -300); this.tone(500, 0.1, 'triangle', 0.05, 0.1, 200); break; // « oups ! »
        case 'save': this.tone(988, 0.06, 'square', 0.06); this.tone(1319, 0.1, 'square', 0.06, 0.06); break;
        case 'tab': this.tone(660, 0.03, 'square', 0.04); break;
      }
    } catch (e) { }
  },
};
