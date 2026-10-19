/* ===================== UTILITAIRES ===================== */
const U = {
  clamp: (v, a, b) => v < a ? a : v > b ? b : v,
  rand: (a, b) => a + Math.random() * (b - a),
  randi: (a, b) => Math.floor(a + Math.random() * (b - a + 1)),
  pick: arr => arr[Math.floor(Math.random() * arr.length)],
  now: () => Date.now(),
  lerp: (a, b, t) => a + (b - a) * t,
  esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); },
  el(tag, cls, html) { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; },
  $(sel) { return document.querySelector(sel); },
  // Générateur pseudo-aléatoire déterministe (mulberry32)
  seeded(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; },
  hash(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; },
  // Couleurs
  hex2rgb(h) { return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]; },
  rgb2hex(r, g, b) { return '#' + [r, g, b].map(v => U.clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0')).join(''); },
  mix(h1, h2, t) { const a = U.hex2rgb(h1), b = U.hex2rgb(h2); return U.rgb2hex(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t); },
  hsl(h, s, l) { // h 0..360, s,l 0..1 -> hex
    h = ((h % 360) + 360) % 360; const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = l - c / 2;
    const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
    return U.rgb2hex((r + m) * 255, (g + m) * 255, (b + m) * 255);
  },
  plural(n, sing, plur) { return (Math.abs(n) >= 2 ? plur : sing); },
  // met en minuscule le premier mot seulement (« Becs Bunsen » -> « becs Bunsen »), retire l'article « Le/La »
  art(s) { return String(s).replace(/^L(?=['\u2019])/, 'l').replace(/^l'/, 'l\u2019').replace(/^(Le|La|Les) /, m => m.toLowerCase()); },
  lc(s) { s = String(s).replace(/^(?:(?:Les|Le|La)\s+|L[\u2019'])/, ''); return s.charAt(0).toLowerCase() + s.slice(1); },
};

/* ---------- Formatage des nombres (français) ---------- */
const NUM_LONG = ['', 'mille', 'million', 'milliard', 'billion', 'billiard', 'trillion', 'trilliard', 'quadrillion', 'quadrilliard',
  'quintillion', 'quintilliard', 'sextillion', 'sextilliard', 'septillion', 'septilliard', 'octillion', 'octilliard', 'nonillion', 'nonilliard',
  'décillion', 'décilliard', 'undécillion', 'undécilliard', 'duodécillion', 'duodécilliard', 'trédécillion', 'trédécilliard',
  'quattuordécillion', 'quattuordécilliard', 'quindécillion', 'quindécilliard', 'sexdécillion', 'sexdécilliard'];
const NUM_SHORT = ['', 'k', 'M', 'Md', 'Bn', 'Bd', 'Tn', 'Td', 'Qan', 'Qad', 'Qin', 'Qid', 'Sxn', 'Sxd', 'Spn', 'Spd', 'Ocn', 'Ocd',
  'Nn', 'Nd', 'Dn', 'Dd', 'UDn', 'UDd', 'DDn', 'DDd', 'TDn', 'TDd', 'QaDn', 'QaDd', 'QiDn', 'QiDd', 'SxDn', 'SxDd'];
let NUM_FORMAT = 'long'; // 'long' | 'short' | 'sci'

function grp(n) { // 12345 -> "12 345" (espace insécable fine)
  return String(Math.floor(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
function dec(n, d) { // nombre décimal à la française, zéros inutiles retirés
  let s = n.toFixed(d);
  if (s.indexOf('.') >= 0) s = s.replace(/0+$/, '').replace(/\.$/, '');
  return s.replace('.', ',');
}
// fmt(n, d) : d = décimales pour les petits nombres ; mode court forcé si short=true ; fixed=true garde les zéros
// de fin (« 1,500 milliard ») pour que la largeur ne saute pas à chaque image (compteur principal)
function fmt(n, d = 0, short = false, fixed = false) {
  if (n !== n) return '?';
  if (!isFinite(n)) return '∞';
  if (n < 0) return '-' + fmt(-n, d, short, fixed);
  const dx = fixed ? (v, k) => v.toFixed(k).replace('.', ',') : dec;
  if (n < 1000) {
    if (d > 0 && n < 100 && n !== Math.floor(n)) return dec(n, n < 10 ? d : Math.min(d, 1));
    return String(Math.floor(n + 1e-9));
  }
  const mode = short && NUM_FORMAT === 'long' ? 'short' : NUM_FORMAT;
  if (n < 1e6 && mode !== 'sci') return grp(n);
  if (n < 1e6) return grp(n);
  let e = Math.floor(Math.log10(n) + 1e-12);
  if (mode === 'sci' || e >= 102) {
    let m = n / Math.pow(10, e);
    if (+m.toFixed(3) >= 10) { m /= 10; e++; }
    return dx(m, 3) + 'e' + e;
  }
  let i = Math.floor(e / 3);
  let m = n / Math.pow(10, i * 3);
  const digits = mode === 'short' ? (m < 10 ? 2 : m < 100 ? 1 : 0) : 3;
  if (+m.toFixed(digits) >= 1000) { i++; m /= 1000; }
  if (i >= NUM_LONG.length) return fmt(1e102, d, short, fixed);
  if (mode === 'short') return dx(m, m < 10 ? 2 : m < 100 ? 1 : 0) + ' ' + NUM_SHORT[i];
  const word = NUM_LONG[i];
  return dx(m, 3) + ' ' + (+m.toFixed(3) >= 2 ? word + 's' : word); // 1,9999 s'affiche « 2 » : donc « 2 millions »
}
const fmtS = (n, d = 0) => fmt(n, d, true);
function fmtPct(x) { // 0.15 -> "15 %"
  const v = x * 100;
  return (Math.abs(v) < 10 && v !== Math.floor(v) ? dec(v, 1) : v >= 1e6 ? fmt(v) : grp(Math.round(v))) + ' %';
}
// « 1 million de molécules », « 12 345 molécules », « 3 milliards d’atomes »
function deMot(s, nom) { return /[A-Za-zéû]$/.test(s) ? (/^[aeiouyàâäéèêëîïôöùûüœæh]/i.test(nom) ? ' d\u2019' : ' de ') : ' '; }
function fmtNom(v, sing, plur, d = 0, short = false) { const s = fmt(v, d, short); return s + deMot(s, plur) + (v >= 2 ? plur : sing); }
const fmtMol = (v, d = 0) => fmtNom(v, 'molécule', 'molécules', d);
function fmtTime(sec) {
  sec = Math.max(0, Math.floor(sec));
  const j = Math.floor(sec / 86400), h = Math.floor(sec % 86400 / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60;
  if (j > 0) return j + ' j' + (h ? ' ' + h + ' h' : '');
  if (h > 0) return h + ' h' + (m ? ' ' + String(m).padStart(2, '0') + ' min' : '');
  if (m > 0) return m + ' min' + (s ? ' ' + String(s).padStart(2, '0') + ' s' : '');
  return s + ' s';
}
function fmtDuree(sec) { // version longue pour les phrases
  sec = Math.max(0, Math.floor(sec));
  const j = Math.floor(sec / 86400), h = Math.floor(sec % 86400 / 3600), m = Math.floor(sec % 3600 / 60);
  const p = [];
  if (j) p.push(j + ' jour' + (j > 1 ? 's' : ''));
  if (h) p.push(h + ' heure' + (h > 1 ? 's' : ''));
  if (m && !j) p.push(m + ' minute' + (m > 1 ? 's' : ''));
  if (!p.length) p.push(sec + ' seconde' + (sec > 1 ? 's' : ''));
  return p.join(' et ');
}
