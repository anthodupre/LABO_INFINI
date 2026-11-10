/* ===================== OUTILS : hasard déterministe, bruit, petites maths =====================
   Tout le monde est généré à partir de la graine de la partie (S.jeu.graine) : la même graine redonne exactement la
   même ville, donc on ne sauvegarde que ce que le joueur a changé (cadeaux pris, portes livrées, lanternes…). */
const NZ = (() => {
  function h2(x, z, s) { // hasard 0..1 pour une case entière (x, z) et un « canal » s
    let h = Math.imul(x | 0, 374761393) ^ Math.imul(z | 0, 668265263) ^ Math.imul((s | 0) + 1013, 1442695041);
    h = Math.imul(h ^ (h >>> 13), 1274126177); h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  }
  function rng(seed) { // mulberry32
    let a = seed >>> 0;
    const f = () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    f.r = (a0, b0) => a0 + (b0 - a0) * f();
    f.i = (a0, b0) => Math.floor(a0 + (b0 - a0 + 1) * f());
    f.p = arr => arr[Math.floor(f() * arr.length) % arr.length];
    return f;
  }
  const fade = t => t * t * (3 - 2 * t);
  function vn(x, z, s) { // bruit de valeur lisse 0..1
    const xi = Math.floor(x), zi = Math.floor(z), xf = fade(x - xi), zf = fade(z - zi);
    const a = h2(xi, zi, s), b = h2(xi + 1, zi, s), c = h2(xi, zi + 1, s), d = h2(xi + 1, zi + 1, s);
    return a + (b - a) * xf + (c - a) * zf + (a - b - c + d) * xf * zf;
  }
  function fbm(x, z, s, oct) { let v = 0, a = 0.5, f = 1, n = 0; for (let i = 0; i < (oct || 4); i++) { v += a * vn(x * f, z * f, s + i * 17); n += a; a *= 0.5; f *= 2.03; } return v / n; }
  return { h2, rng, vn, fbm };
})();
const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
const lerp = (a, b, t) => a + (b - a) * t;
const sstep = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const angDiff = (a, b) => { let d = (b - a) % (Math.PI * 2); if (d > Math.PI) d -= Math.PI * 2; if (d < -Math.PI) d += Math.PI * 2; return d; };
const IS_IOS = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
function snd(nom, opt) { try { if (typeof AUDIO !== 'undefined' && AUDIO.sfx) AUDIO.sfx(nom, opt); } catch (e) { } }
// Torsion du monde (rendu) : amplitudes, fréquences et phases des ondes qui font serpenter les rues (voir MONDE.tordre)
const TORS = [9.5, 0.031, 1.3, 7.0, 0.019, 4.1, 8.5, 0.027, 2.2, 6.5, 0.023, 0.7];
