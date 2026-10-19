/* ===================== ÉTAT & SAUVEGARDE ===================== */
const SAVE_KEY = 'laboInfini.save.v1', BACKUP_KEY = 'laboInfini.backup.v1', SAVE_VERSION = 1;
const MEMSTORE = {};
const store = {
  probe() { try { localStorage.setItem('__lab', '1'); const ok = localStorage.getItem('__lab') === '1'; localStorage.removeItem('__lab'); return ok; } catch (e) { return false; } },
  // la mémoire d'abord : si une écriture a échoué (stockage plein), c'est elle qui a la valeur la plus récente
  get(k) { if (k in MEMSTORE) return MEMSTORE[k]; try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { MEMSTORE[k] = v; try { localStorage.setItem(k, v); return true; } catch (e) { return false; } },
  del(k) { delete MEMSTORE[k]; try { localStorage.removeItem(k); } catch (e) { } },
};

function defaultRun() {
  return {
    bank: 0, runEarned: 0, handmade: 0, clicks: 0, b: {}, up: {}, buffs: [], eureka: 0, runTime: 0, era: 0, lastNewT: 0, nudgeAt: null, nudgeN: 0,
    goldT: U.rand(150, 300), anoT: U.rand(1200, 2400), storm: 0,
  };
}
function defaultState() {
  const t = U.now();
  return Object.assign(defaultRun(), {
    v: SAVE_VERSION, labName: '', created: t, lastSave: t, lastTick: t,
    allEarned: 0, handmadeAll: 0, clicksAll: 0, goldClicks: 0, anoClicks: 0, eurekas: 0, playTime: 0, sold: 0, publishes: 0,
    nobels: 0, nobelPts: 0, prestige: {}, chalDone: {}, challenge: null, chalStart: 0, chalTime: 0,
    eraMax: 0, ach: {}, flags: {}, journal: [], bestCps: 0, bestRun: 0, offlineTotal: 0,
    petri: { grid: Array(49).fill(null), disc: { levure: true, moisi: true }, harvests: 0, plants: 0, omega: 0, timer: 60, sel: 'levure', schro: false },
    set: { format: 'long', sound: true, vol: 0.6, music: true, mvol: 0.5, particles: true, news: true, flash: true, buyAmt: 1, sell: false, dev: false, god: false, speed: 1, tab: 'shop' },
  });
}
let S = defaultState();

// Fusion récursive avec les valeurs par défaut (compatibilité des sauvegardes)
function mergeDefaults(def, obj) {
  if (obj == null || typeof obj !== 'object' || Array.isArray(def)) return obj == null ? def : obj;
  const out = {};
  for (const k in def) {
    const dv = def[k], ov = obj[k];
    if (ov === undefined) out[k] = dv;
    else if (dv && typeof dv === 'object' && !Array.isArray(dv) && Object.keys(dv).length) out[k] = mergeDefaults(dv, ov);
    else out[k] = ov;
  }
  for (const k in obj) if (!(k in out)) out[k] = obj[k];
  return out;
}
function sanitize(st) {
  const D = defaultState();
  ['b', 'up', 'prestige', 'chalDone', 'ach', 'flags'].forEach(k => { if (!st[k] || typeof st[k] !== 'object' || Array.isArray(st[k])) st[k] = {}; });
  if (!st.petri || typeof st.petri !== 'object') st.petri = D.petri;
  if (!st.set || typeof st.set !== 'object') st.set = D.set;
  if (!st.petri.disc || typeof st.petri.disc !== 'object') st.petri.disc = { levure: true, moisi: true };
  const int = (v, a, b, d) => Number.isFinite(v) ? Math.min(b, Math.max(a, Math.floor(v))) : d;
  st.era = int(st.era, 0, 8, 0); st.eraMax = Math.max(st.era, int(st.eraMax, 0, 8, 0));
  ['anoClicks', 'offlineTotal', 'bestRun', 'chalTime', 'incidents', 'lastTick', 'lastSave', 'created'].forEach(k => { if (!Number.isFinite(st[k]) || st[k] < 0) st[k] = k === 'lastTick' || k === 'lastSave' || k === 'created' ? U.now() : 0; });
  ['harvests', 'plants', 'omega'].forEach(k => { st.petri[k] = int(st.petri[k], 0, 1e15, 0); });
  if (!Number.isFinite(st.petri.timer) || st.petri.timer <= 0 || st.petri.timer > 120) st.petri.timer = 60;
  if (!SMAP[st.petri.sel]) st.petri.sel = 'levure';
  st.set.speed = [1, 10, 100].includes(st.set.speed) ? st.set.speed : 1;
  st.set.vol = Number.isFinite(st.set.vol) ? U.clamp(st.set.vol, 0, 1) : 0.6;
  if (!['long', 'short', 'sci'].includes(st.set.format)) st.set.format = 'long';
  if (typeof st.labName !== 'string') st.labName = '';
  st.labName = st.labName.slice(0, 40);
  const num = ['bank', 'runEarned', 'handmade', 'clicks', 'eureka', 'runTime', 'allEarned', 'handmadeAll', 'clicksAll', 'goldClicks', 'eurekas', 'playTime', 'sold', 'publishes', 'nobels', 'nobelPts', 'bestCps', 'goldT', 'anoT', 'storm'];
  num.forEach(k => { if (typeof st[k] !== 'number' || !isFinite(st[k]) || st[k] < 0) st[k] = 0; });
  for (const id in st.b) if (!BMAP[id] || !isFinite(st.b[id]) || st.b[id] < 0) delete st.b[id]; else st.b[id] = Math.floor(st.b[id]);
  for (const id in st.up) if (!UPMAP[id]) delete st.up[id];
  for (const id in st.prestige) if (!PMAP[id]) delete st.prestige[id];
  if (st.challenge && !CMAP[st.challenge]) st.challenge = null;
  if (!Array.isArray(st.buffs)) st.buffs = [];
  if (!Array.isArray(st.journal)) st.journal = [];
  st.journal = st.journal.filter(j => j && typeof j.h === 'string').slice(0, 40);
  st.buffs = st.buffs.filter(b => b && isFinite(b.t) && b.t > 0);
  if (!Array.isArray(st.petri.grid) || st.petri.grid.length !== 49) st.petri.grid = Array(49).fill(null);
  st.petri.grid = st.petri.grid.map(c => c && (SMAP[c.s] || c.s === 'dead') ? { s: c.s, a: int(c.a, 0, 1e6, 0) } : null);
  if (st.goldT <= 0) st.goldT = 60;
  if (st.anoT <= 0) st.anoT = 600;
  if (![1, 10, 100, -1].includes(st.set.buyAmt)) st.set.buyAmt = 1;
  if (!(st.set.speed > 0)) st.set.speed = 1;
  return st;
}

function serialize() { S.lastSave = U.now(); return JSON.stringify(S, (k, v) => typeof v === 'number' && !isFinite(v) ? (v > 0 ? Number.MAX_VALUE : 0) : v); }
let LAST_BACKUP = 0;
function readable(json) { try { JSON.parse(json); return true; } catch (e) { return false; } }
function saveGame(manual) {
  try {
    const data = serialize();
    const prev = store.get(SAVE_KEY);
    // copie de secours tournante (toutes les 10 min, et à chaque sauvegarde manuelle)
    // (jamais une sauvegarde illisible : après une récupération, elle écraserait la seule bonne copie)
    if (prev && readable(prev) && (manual || Date.now() - LAST_BACKUP > 600000)) { store.set(BACKUP_KEY, prev); LAST_BACKUP = Date.now(); }
    const ok = store.set(SAVE_KEY, data);
    if (!ok && !manual && !G.storeWarned) { G.storeWarned = true; toast('Sauvegarde impossible sur cet appareil : exportez votre partie (Options › Exporter) avant de quitter.', 'warn'); }
    if (manual) toast(ok ? 'Partie sauvegardée !' : 'Sauvegarde en mémoire seulement (stockage indisponible) — pensez à exporter.', ok ? 'save' : 'warn');
    return ok;
  } catch (e) { if (manual) toast('Échec de la sauvegarde : ' + e.message, 'warn'); return false; }
}
function loadFrom(json) {
  const obj = typeof json === 'string' ? JSON.parse(json) : json;
  if (!obj || typeof obj !== 'object' || obj.v == null) throw new Error('Sauvegarde invalide');
  return sanitize(mergeDefaults(defaultState(), obj));
}
function loadGame() {
  const raw = store.get(SAVE_KEY);
  if (!raw) return false;
  try { S = loadFrom(raw); return true; }
  catch (e) {
    store.set('laboInfini.corrupt.v1', raw); // ne jamais perdre l'original
    G.loadError = e.message || 'erreur inconnue';
    const bk = store.get(BACKUP_KEY);
    if (bk) { try { S = loadFrom(bk); return true; } catch (e2) { } }
    return false;
  }
}
// Export / import : chaîne texte portable
function b64enc(str) { const bytes = new TextEncoder().encode(str); let bin = ''; for (let i = 0; i < bytes.length; i += 8192) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 8192)); return btoa(bin); }
function b64dec(b64) { const bin = atob(b64); const bytes = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i); return new TextDecoder().decode(bytes); }
function exportSave() { return 'LABO1:' + b64enc(serialize()); }
// Import tolérant : ignore espaces, retours à la ligne, caractères invisibles ajoutés par iOS, texte autour…
function importSave(str) {
  str = String(str || '');
  if (!str.trim()) throw new Error('rien à importer.');
  const INCOMPLET = 'le texte semble incomplet ou abîmé. Copiez bien TOUT le texte, du début « LABO1: » jusqu\u2019à la toute fin (ou utilisez « Télécharger » / « Charger un fichier »).';
  const m = str.match(/LABO1\s*[:：]/i);
  let json;
  const raw = (m ? str.slice(m.index + m[0].length) : str).trim();
  if (!m && raw[0] === '{') json = raw;
  else {
    const run = raw.match(/^[A-Za-z0-9+/=_\-\s\u200b-\u200d\u2060\ufeff]+/);
    // le texte collé peut être suivi d'autres mots : on essaie en retirant les mots de fin un par un
    const tokens = (run ? run[0] : raw).split(/[\s\u200b-\u200d\u2060\ufeff]+/).filter(Boolean);
    for (let k = tokens.length; k >= 1 && json == null; k--) {
      let body = tokens.slice(0, k).join('').replace(/-/g, '+').replace(/_/g, '/').replace(/[^A-Za-z0-9+/=]/g, '');
      body = body.replace(/=+$/, '').replace(/=/g, '');
      if (!body.length || body.length % 4 === 1) continue;
      while (body.length % 4) body += '=';
      try { const j = b64dec(body); JSON.parse(j); json = j; } catch (e) { }
    }
    if (json == null) throw new Error(INCOMPLET);
  }
  let st;
  try { st = loadFrom(json); } catch (e) { throw new Error(INCOMPLET); }
  const prev = store.get(SAVE_KEY); if (prev && readable(prev)) store.set(BACKUP_KEY, prev);
  S = st;
  return true;
}
function hardReset() {
  const keepSet = Object.assign({}, S.set, { dev: false, god: false, speed: 1 });
  store.del(SAVE_KEY);
  S = defaultState();
  S.set = Object.assign(S.set, keepSet);
}
