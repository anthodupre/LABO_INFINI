/* ==========================================================================
   KIT iPHONE / GITHUB PAGES — code éprouvé sur Labo Infini. Chaque bloc correspond à un bug réellement rencontré.
   Copié TEL QUEL en src/js/02_kit.js par scripts/nouveau_jeu.js (avant la coquille 08_coquille.js et le jeu).
   Il déclare déjà ces globales : KIT, kitConfig, MEMSTORE, store, safeStringify, kitReadable, kitSave, kitLoad,
   kitInstallAutosave, b64enc, b64dec, kitExport, kitParseExport, copyText, downloadText, readTextFile,
   kitInstallErrorHandler, isStandalone, safeTop, fixStandaloneHeight, kitInstallLayoutFixes, TAP_BLOCK, blockTaps,
   tapsBlocked, makeCatchable, pressable, SFXK, NUM_LONG, grp, dec, fmt, H_ASPIRE, deMot, fmtNom, TYPO
   (+ BUILD_ID, ajouté par scripts/build.js).
   Ne les redéclarer dans AUCUN autre fichier : tout est dans un seul <script>, une constante en double = jeu mort
   (scripts/build.js le détecte).
   ========================================================================== */
// À PERSONNALISER pour CHAQUE jeu (kitConfig, au tout début du jeu) : tous ses jeux sont servis par
// anthodupre.github.io et partagent le MÊME localStorage. Deux jeux avec la même clé s'écraseraient leurs parties.
// Labo Infini utilise 'laboInfini.*' et le préfixe d'export 'LABO1'.
const KIT = { cfg: { saveKey: 'monJeu.save.v1', backupKey: 'monJeu.backup.v1', corruptKey: 'monJeu.corrupt.v1', prefix: 'JEU1' } };
function kitConfig(id, prefix) { // kitConfig('hadal', 'HADAL1') -> clés 'hadal.save.v1', 'hadal.backup.v1'…
  Object.assign(KIT.cfg, { saveKey: id + '.save.v1', backupKey: id + '.backup.v1', corruptKey: id + '.corrupt.v1', prefix });
}

/* ---------- 1. Stockage : localStorage + mémoire de secours + test ---------- */
const MEMSTORE = {};
const store = {
  probe() { try { localStorage.setItem('__t', '1'); const ok = localStorage.getItem('__t') === '1'; localStorage.removeItem('__t'); return ok; } catch (e) { return false; } },
  // la mémoire d'abord : si une écriture a échoué (stockage plein), c'est elle qui a la valeur la plus récente
  get(k) { if (k in MEMSTORE) return MEMSTORE[k]; try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { MEMSTORE[k] = v; try { localStorage.setItem(k, v); return true; } catch (e) { return false; } },
  del(k) { delete MEMSTORE[k]; try { localStorage.removeItem(k); } catch (e) { } },
};
// Sérialisation sans Infinity/NaN (JSON les transforme en null => progression perdue)
function safeStringify(obj) { return JSON.stringify(obj, (k, v) => typeof v === 'number' && !isFinite(v) ? (v > 0 ? Number.MAX_VALUE : 0) : v); }
// Sauvegarde avec copie de secours tournante (toutes les 10 min + à chaque sauvegarde manuelle)
let KIT_LAST_BACKUP = 0, KIT_WARNED = false;
function kitReadable(json) { try { JSON.parse(json); return true; } catch (e) { return false; } }
function kitSave(state, manual, warn) {
  const data = safeStringify(state), prev = store.get(KIT.cfg.saveKey);
  // jamais copier une sauvegarde illisible dans la copie de secours (après une récupération, ce serait la seule bonne)
  if (prev && kitReadable(prev) && (manual || Date.now() - KIT_LAST_BACKUP > 600000)) { store.set(KIT.cfg.backupKey, prev); KIT_LAST_BACKUP = Date.now(); }
  const ok = store.set(KIT.cfg.saveKey, data);
  if (!ok && !manual && !KIT_WARNED && warn) { KIT_WARNED = true; warn('Sauvegarde impossible sur cet appareil : exportez votre partie (Options › Exporter) avant de quitter.'); }
  return ok;
}
// Chargement : une sauvegarde illisible est d'abord copiée telle quelle (clé « corrupt »), puis on essaie la copie de
// secours. L'original n'est jamais perdu, même si la nouvelle partie remplace ensuite la sauvegarde principale.
function kitLoad(parse) { // parse(json) -> état validé (lève une erreur si invalide)
  if (/^monJeu\./.test(KIT.cfg.saveKey)) console.error('KIT.cfg non personnalisé : appeler kitConfig() (clé partagée avec les autres jeux du site)');
  const raw = store.get(KIT.cfg.saveKey);
  if (!raw) return { state: null };
  try { return { state: parse(raw) }; }
  catch (e) {
    store.set(KIT.cfg.corruptKey, raw);
    const bk = store.get(KIT.cfg.backupKey);
    if (bk) { try { return { state: parse(bk), recovered: true }; } catch (e2) { } }
    return { state: null, error: e.message || 'illisible', raw }; // afficher raw dans une zone de texte (Importer pourra le relire)
  }
}
// Sauvegarde automatique : toutes les 30 s + quand l'app passe en arrière-plan ou se ferme.
// save(manuel) -> bool ; le bouton « Sauvegarder » appelle save(true) (et affiche « Partie sauvegardée ! »).
function kitInstallAutosave(save) {
  setInterval(() => save(false), 30000);
  document.addEventListener('visibilitychange', () => { if (document.hidden) save(false); });
  addEventListener('pagehide', () => save(false));
  addEventListener('beforeunload', () => save(false));
}

/* ---------- 2. Export / import tolérant ---------- */
function b64enc(str) { const bytes = new TextEncoder().encode(str); let bin = ''; for (let i = 0; i < bytes.length; i += 8192) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 8192)); return btoa(bin); }
function b64dec(b64) { const bin = atob(b64); const bytes = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i); return new TextDecoder().decode(bytes); }
function kitExport(state) { return KIT.cfg.prefix + ':' + b64enc(safeStringify(state)); }
// Retrouve le JSON dans un texte collé depuis iPhone (espaces, sauts de ligne, caractères invisibles, texte autour…)
function kitParseExport(str) {
  str = String(str || '');
  if (!str.trim()) throw new Error('rien à importer.');
  const INCOMPLET = 'le texte semble incomplet ou abîmé. Copiez bien TOUT le texte, du début « ' + KIT.cfg.prefix + ': » jusqu’à la fin (ou utilisez « Télécharger » / « Charger un fichier »).';
  const m = str.match(new RegExp(KIT.cfg.prefix + '\\s*[:：]', 'i'));
  const raw = (m ? str.slice(m.index + m[0].length) : str).trim();
  if (!m && raw[0] === '{') return raw;
  const run = raw.match(/^[A-Za-z0-9+/=_\-\s\u200b-\u200d\u2060\ufeff]+/);
  // le texte collé peut être suivi d'autres mots : on essaie en retirant les mots de fin un par un
  const tokens = (run ? run[0] : raw).split(/[\s\u200b-\u200d\u2060\ufeff]+/).filter(Boolean);
  for (let k = tokens.length; k >= 1; k--) {
    let body = tokens.slice(0, k).join('').replace(/-/g, '+').replace(/_/g, '/').replace(/[^A-Za-z0-9+/=]/g, '');
    body = body.replace(/=+$/, '').replace(/=/g, '');
    if (!body.length || body.length % 4 === 1) continue;
    while (body.length % 4) body += '=';
    try { const json = b64dec(body); JSON.parse(json); return json; } catch (e) { }
  }
  throw new Error(INCOMPLET);
}
// Copie fiable sur iPhone
function copyText(ta, s, done) {
  let ok = false;
  try { ta.readOnly = false; ta.focus(); ta.select(); ta.setSelectionRange(0, s.length + 10); ok = document.execCommand('copy'); } catch (e) { }
  try { ta.readOnly = true; ta.blur(); } catch (e) { }
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(s).then(() => done(true)).catch(() => done(ok)); else done(ok);
}
// Fichier de sauvegarde (app Fichiers sur iPhone)
function downloadText(filename, s) {
  const url = URL.createObjectURL(new Blob([s], { type: 'text/plain' }));
  const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 2000);
}
// <input type="file" accept=".txt,text/plain"> -> texte
function readTextFile(input, cb) { const f = input.files && input.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => cb(String(r.result || ''), f.name); r.readAsText(f); }

/* ---------- 3. Erreurs : afficher les nôtres, ignorer celles des extensions ---------- */
function kitInstallErrorHandler(show) {
  addEventListener('error', e => {
    const msg = e.message || '';
    if (!e.lineno || /^script error\.?$/i.test(msg.trim())) return; // script externe (extension Safari…)
    // erreur d'un autre fichier (extension, webkit-masked-url://…) ; comparer SANS le « #… » de l'adresse
    if (e.filename && e.filename.split('#')[0] !== location.href.split('#')[0]) return;
    show(msg + ' (ligne ' + e.lineno + ')' + (typeof BUILD_ID !== 'undefined' ? '\nVersion du ' + BUILD_ID : ''));
  });
}

/* ---------- 4. Hauteur plein écran (app de l'écran d'accueil) ---------- */
// Avec la barre d'état OPAQUE (meta black) rien n'est nécessaire. Ce filet ne s'active que si une barre
// transparente recouvre la page ET qu'il manque exactement sa hauteur en bas.
function isStandalone() { return navigator.standalone === true || !!(window.matchMedia && matchMedia('(display-mode: standalone)').matches); }
function safeTop() {
  const d = document.createElement('div');
  d.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:env(safe-area-inset-top,0px);visibility:hidden;pointer-events:none';
  document.body.appendChild(d); const h = d.getBoundingClientRect().height; d.remove(); return h;
}
function fixStandaloneHeight(app) {
  app.style.bottom = ''; app.style.height = '';
  if (!isStandalone() || !window.screen) return;
  const st = safeTop(); if (st < 1) return;
  const real = Math.min(app.getBoundingClientRect().height, document.documentElement.clientHeight, innerHeight);
  const portrait = innerHeight >= innerWidth;
  const full = portrait ? Math.max(screen.height, screen.width) : Math.min(screen.height, screen.width);
  const missing = full - real;
  if (missing > 4 && missing <= st + 8) { app.style.bottom = 'auto'; app.style.height = full + 'px'; }
}
function kitInstallLayoutFixes(app, onLayout) {
  const run = () => { fixStandaloneHeight(app); if (onLayout) onLayout(); };
  run(); [300, 1200, 3000].forEach(ms => setTimeout(run, ms));
  addEventListener('resize', () => { clearTimeout(run.t); run.t = setTimeout(run, 120); });
  addEventListener('orientationchange', () => setTimeout(run, 300));
  // Après fermeture du clavier, la page peut rester décalée : UNE remise en place. (Jamais de boucle, jamais de
  // touchmove bloqué globalement, jamais body{position:fixed} : tous ont cassé les tapes ou la hauteur.)
  document.addEventListener('focusout', () => setTimeout(() => { if (scrollY || scrollX) scrollTo(0, 0); }, 120));
  document.addEventListener('gesturestart', e => e.preventDefault());
}

/* ---------- 5. Tapes : appui court/long et anti-clic fantôme ---------- */
let TAP_BLOCK = 0;
function blockTaps(ms) { TAP_BLOCK = Math.max(TAP_BLOCK, performance.now() + ms); }
function tapsBlocked() { return performance.now() < TAP_BLOCK; }
document.addEventListener('click', e => { if (tapsBlocked() && !(e.target.closest && e.target.closest('[data-catch]'))) { e.preventDefault(); e.stopPropagation(); } }, true);
// Élément flottant à attraper (objet doré…) : il absorbe tout le geste et ne disparaît qu'après 450 ms
function makeCatchable(el, onCatch) {
  el.dataset.catch = '1'; el.classList.add('shimmer'); el.style.touchAction = 'none';
  const swallow = ev => { ev.preventDefault(); ev.stopPropagation(); };
  el.addEventListener('pointerdown', ev => { swallow(ev); if (el.dataset.caught) return; el.dataset.caught = '1'; blockTaps(450); el.style.opacity = '0'; setTimeout(() => el.remove(), 450); onCatch(ev); });
  ['pointerup', 'click', 'touchstart', 'touchend', 'mousedown', 'mouseup'].forEach(t => el.addEventListener(t, swallow));
}
// Bouton : tape = action ; appui long (tactile) ou survol (souris) = infobulle ; annulé si on fait défiler
function pressable(el, onTap, onLong, onHover) {
  let timer = null, long = false, sx = 0, sy = 0, down = false;
  el.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    down = true; long = false; sx = e.clientX; sy = e.clientY;
    if (onLong && e.pointerType !== 'mouse') timer = setTimeout(() => { long = true; onLong(el); }, 430);
  });
  el.addEventListener('pointermove', e => { if (down && (Math.abs(e.clientX - sx) > 12 || Math.abs(e.clientY - sy) > 12)) { clearTimeout(timer); timer = null; down = false; } });
  el.addEventListener('pointerup', e => { clearTimeout(timer); timer = null; if (!down) return; down = false; if (long || tapsBlocked()) return; onTap(e); });
  el.addEventListener('pointercancel', () => { clearTimeout(timer); timer = null; down = false; });
  el.addEventListener('contextmenu', e => e.preventDefault());
  if (onHover) { el.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') onHover(el, true); }); el.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') onHover(el, false); }); }
}

/* ---------- 6. Son : se réveiller après appel / Siri (état « interrupted ») ---------- */
const SFXK = {
  ctx: null, master: null,
  init() { if (this.ctx) return; try { const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return; this.ctx = new AC(); this.master = this.ctx.createGain(); this.master.connect(this.ctx.destination); } catch (e) { this.ctx = null; } },
  unlock() {
    this.init(); const c = this.ctx; if (!c) return;
    if (c.state === 'closed') { this.ctx = null; this.init(); return; }
    if (c.state !== 'running') { try { const p = c.resume(); if (p && p.catch) p.catch(() => { }); } catch (e) { } }
  },
  installUnlock() {
    ['pointerdown', 'touchend', 'click', 'keydown'].forEach(t => document.addEventListener(t, () => this.unlock(), { capture: true, passive: true }));
    document.addEventListener('visibilitychange', () => { if (!document.hidden) this.unlock(); });
  },
};

/* ---------- 7. Nombres et textes français ---------- */
const NUM_LONG = ['', 'mille', 'million', 'milliard', 'billion', 'billiard', 'trillion', 'trilliard', 'quadrillion', 'quadrilliard',
  'quintillion', 'quintilliard', 'sextillion', 'sextilliard', 'septillion', 'septilliard', 'octillion', 'octilliard', 'nonillion', 'nonilliard',
  'décillion', 'décilliard', 'undécillion', 'undécilliard', 'duodécillion', 'duodécilliard', 'trédécillion', 'trédécilliard',
  'quattuordécillion', 'quattuordécilliard', 'quindécillion', 'quindécilliard', 'sexdécillion', 'sexdécilliard'];
function grp(n) { return String(Math.floor(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '\u202f'); } // fine insécable (absente des polices : rendue par la police de secours)
function dec(n, d) { let s = n.toFixed(d); if (s.indexOf('.') >= 0) s = s.replace(/0+$/, '').replace(/\.$/, ''); return s.replace('.', ','); }
function fmt(n, d = 0) {
  if (n !== n) return '?'; if (!isFinite(n)) return '∞'; if (n < 0) return '-' + fmt(-n, d);
  if (n < 1000) { if (d > 0 && n < 100 && n !== Math.floor(n)) return dec(n, n < 10 ? d : Math.min(d, 1)); return String(Math.floor(n + 1e-9)); }
  if (n < 1e6) return grp(n);
  let e = Math.floor(Math.log10(n) + 1e-12), i = Math.floor(e / 3), m = n / Math.pow(10, i * 3);
  if (+m.toFixed(3) >= 1000) { i++; m /= 1000; }
  if (i >= NUM_LONG.length) { let m2 = n / Math.pow(10, e); if (+m2.toFixed(3) >= 10) { m2 /= 10; e++; } return dec(m2, 3) + 'e' + e; } // jamais « undefined » ni « 10e65 »
  return dec(m, 3) + '\u00a0' + (+m.toFixed(3) >= 2 ? NUM_LONG[i] + 's' : NUM_LONG[i]); // pluriel sur le nombre AFFICHÉ (1,9999 -> « 2 millions »)
}
// « 1 million de molécules », « 3 milliards d’atomes », « 1 million d’œufs », « 12 345 molécules »
// h aspiré (héros, hamsters, haricots…) : « de » — compléter la liste selon le jeu
const H_ASPIRE = /^(h[ée]ros|hamster|haricot|hibou|homard|hache|hangar|hurlement)/i;
function deMot(s, nom) { return /[A-Za-zéû]$/.test(s) ? (/^[aeiouyàâäéèêëîïôöùûüœæh]/i.test(nom) && !H_ASPIRE.test(nom) ? ' d’' : ' de ') : ' '; }
function fmtNom(v, sing, plur, d = 0) { const s = fmt(v, d); return s + deMot(s, plur) + (v >= 2 ? plur : sing); }
// Typographie : fine insécable TOUJOURS avant » et % et après « ; avant ; ! ? seulement s'il y avait une espace
// (« Quoi?! » et « &amp; » restent intacts) ; insécable avant : ; apostrophes courbes.
// À appliquer aux TEXTES seulement, jamais à du HTML (style="width:50%" deviendrait invalide).
function TYPO(s, apos = true) {
  if (typeof s !== 'string') return s;
  if (apos) s = s.replace(/([A-Za-zÀ-ÿŒœ])'(?=[A-Za-zÀ-ÿŒœ])/g, '$1’');
  return s.replace(/«[ \u00a0\u202f]*/g, '«\u202f')
    .replace(/[ \u00a0\u202f]*([»%])/g, '\u202f$1')
    .replace(/[ \u00a0\u202f]+([;!?])/g, '\u202f$1')
    .replace(/ :/g, '\u00a0:');
}

/* ---------- 8. CSS à reprendre (dans style.css) ----------
:root{--st:env(safe-area-inset-top,0px);--sb:env(safe-area-inset-bottom,0px);--sl:env(safe-area-inset-left,0px);--sr:env(safe-area-inset-right,0px)}
html,body{margin:0;height:100%;overflow:hidden;overscroll-behavior:none}          (PAS de body{position:fixed})
body{touch-action:manipulation;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}
input,textarea{-webkit-user-select:text;user-select:text;-webkit-touch-callout:default}
#app{position:fixed;top:0;right:0;bottom:0;left:0;display:flex;flex-direction:column;padding-left:var(--sl);padding-right:var(--sr)}   (pas de "inset:")
#top{padding:calc(4px + var(--st)) 8px 4px}          .page{padding-bottom:calc(24px + var(--sb))}
.toast,#banner,#bigText,#hud,#buffs,.gauge{pointer-events:none}   (tout ce qui est posé sur la zone de jeu sans action propre)
.shimmer{touch-action:none}          img,canvas{image-rendering:pixelated}
input,textarea{font-size:16px}       (sinon iOS zoome en entrant dans le champ)
font-family:"VT323",ui-monospace,Menlo,monospace   (pile de secours : les polices n'ont ni U+202F, ni ∞ ⚠ ★ ✦ ✿ ✔)
-------------------------------------------------------------------------- */
