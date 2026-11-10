/* ===================== COQUILLE COMMUNE À TOUS SES JEUX (à garder telle quelle) =====================
   Ce que l'utilisateur veut dans CHAQUE jeu, déjà branché et testé sur iPhone :
   - bouton Sauvegarder (en-tête) + sauvegarde automatique (30 s, arrière-plan, fermeture) + copie de secours ;
   - Options : Sauvegarder, Exporter (copier / télécharger un fichier), Importer (coller / charger un fichier),
     derniers messages, version du jeu (À propos) ;
   - bouton DEV : code BURGER -> mode Dieu (badge permanent) + panneau DEV (mode Dieu, vitesse, actions du jeu) ;
   - messages (toasts) traversables et lisibles, journal ; une seule modale à la fois, celles du jeu en file.
   Le jeu lui-même est dans 10_jeu.js (objet JEU). Il ne touche pas à ce fichier ; il utilise : S.jeu (son état
   sauvegardé), god(), toast(), modal(), closeModal(), save(), esc(), $(). */
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
let S = null;                        // { v, jeu: <état du jeu>, dev, god, last }
const G = { speed: 1, log: [] };     // non sauvegardé
const god = () => !!(S && S.god);    // le JEU décide ce que fait le mode Dieu (pas de dégâts, argent infini…)

function freshState() { return { v: 1, jeu: JEU.etatInitial(), dev: false, god: false, last: Date.now() }; }
function parseSave(json) { // lève une erreur si invalide (kitLoad passe alors à la copie de secours)
  const o = JSON.parse(json);
  if (!o || typeof o !== 'object' || o.v !== 1) throw new Error('sauvegarde invalide');
  const st = Object.assign(freshState(), o);
  st.jeu = Object.assign(JEU.etatInitial(), o.jeu && typeof o.jeu === 'object' ? o.jeu : {});
  if (JEU.valider) JEU.valider(st.jeu); // bornes, nombres finis, compatibilité des anciennes sauvegardes
  return st;
}
function save(manual) {
  S.last = Date.now();
  const ok = kitSave(S, manual, m => toast(m, 'warn'));
  if (manual) toast(ok ? 'Partie sauvegardée !' : 'Sauvegarde en mémoire seulement : exporte ta partie (Options › Exporter).', ok ? 'save' : 'warn');
  return ok;
}

// ---- messages : traversables (pointer-events:none en CSS), assez longs pour être lus, gardés dans un journal ----
function toast(msg, kind) {
  G.log.unshift(msg); if (G.log.length > 50) G.log.length = 50;
  const box = $('#toasts'), d = document.createElement('div');
  d.className = 'toast ' + (kind || ''); d.textContent = msg; box.appendChild(d);
  setTimeout(() => { d.style.opacity = '0'; setTimeout(() => d.remove(), 450); }, Math.min(12000, 5000 + msg.length * 40));
  while (box.children.length > 3) box.firstChild.remove();
}

// ---- modales : une seule à la fois ; celles déclenchées par le jeu (queue=true) attendent leur tour ----
// Une modale ouverte par le joueur (Importer…) n'est jamais remplacée par le jeu : sur iPhone il part copier son
// texte dans Notes, revient, et l'app déclencherait « Bon retour » par-dessus.
const MODALQ = []; let MODAL_OPEN = false;
function modal(title, html, btns, queue) { // btns : [[libellé, fonction, resterOuvert], …]
  if (MODAL_OPEN && queue) { MODALQ.push([title, html, btns]); return; }
  MODAL_OPEN = true;
  $('#mtitle').textContent = title; $('#mbody').innerHTML = html;
  const bar = $('#mbtns'); bar.textContent = '';
  (btns || [['OK']]).forEach(([label, fn, keep]) => {
    const b = document.createElement('button'); b.textContent = label;
    b.onclick = () => { if (!keep) closeModal(); if (fn) fn(); };
    bar.appendChild(b);
  });
  $('#modal').hidden = false;
}
function closeModal() {
  $('#modal').hidden = true; MODAL_OPEN = false;
  const n = MODALQ.shift();
  if (n) setTimeout(() => modal(n[0], n[1], n[2], true), 200);
}

// ---- options, export / import, DEV ----
function openOptions() {
  const log = G.log.slice(0, 8).map(m => '<div class="log">' + esc(m) + '</div>').join('') || '<div class="log">Aucun message pour l’instant.</div>';
  modal('Options',
    '<div>Sauvegarde automatique toutes les 30\u00a0s et quand tu quittes l’app.</div>' +
    (JEU.options ? JEU.options() : '') +
    '<div class="sect">Derniers messages</div>' + log +
    '<div class="sect">À propos</div><div class="log">' + esc(JEU.titre) + ' — version du ' + esc(typeof BUILD_ID !== 'undefined' ? BUILD_ID : '?') + '</div>',
    [['Sauvegarder', () => save(true), true], ['Exporter', openExport], ['Importer', openImport], ['DEV', openDev], ['Fermer']]);
}
function openExport() {
  const code = kitExport(S);
  modal('Exporter', '<div>Garde ce texte (dans Notes) ou télécharge le fichier (app Fichiers). Fais-le avant de supprimer l’app de l’écran d’accueil.</div><textarea id="expTxt" readonly></textarea>', [
    ['Copier', () => copyText($('#expTxt'), code, ok => toast(ok ? 'Copié !' : 'Copie impossible : sélectionne le texte à la main.', ok ? 'save' : 'warn')), true],
    ['Télécharger', () => downloadText(JEU.id + '-sauvegarde.txt', code), true],
    ['Fermer']]);
  $('#expTxt').value = code;
}
function openImport() {
  modal('Importer', '<div>Colle ton texte de sauvegarde, ou charge le fichier téléchargé.</div><textarea id="impTxt" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea><input id="impFile" type="file" accept=".txt,text/plain" hidden>', [
    ['Importer', () => doImport($('#impTxt').value), true],
    ['Charger un fichier', () => $('#impFile').click(), true],
    ['Annuler']]);
  $('#impFile').addEventListener('change', e => readTextFile(e.target, txt => doImport(txt)));
}
function doImport(txt) {
  try { S = parseSave(kitParseExport(txt)); save(true); closeModal(); toast('Partie importée !', 'save'); if (JEU.recharger) JEU.recharger(); }
  catch (e) { toast('Import impossible : ' + e.message, 'warn'); }
}
function openDev() {
  if (!S.dev) {
    modal('Développeur', '<div>Code d’accès :</div><input id="devCode" type="text" autocomplete="off" autocorrect="off" autocapitalize="characters" spellcheck="false" enterkeyhint="done">',
      [['OK', tryCode, true], ['Retour', openOptions]]);
    $('#devCode').addEventListener('keydown', e => { if (e.key === 'Enter') tryCode(); });
    return;
  }
  const next = G.speed === 1 ? 10 : G.speed === 10 ? 100 : 1;
  const jeu = (typeof JEU.dev === 'function' ? JEU.dev() : JEU.dev || []).map(([label, fn]) => [label, () => { fn(); openDev(); }, true]);
  modal('Panneau DEV', '<div>Mode Dieu : <b>' + (god() ? 'ACTIVÉ' : 'désactivé') + '</b> (' + esc(JEU.modeDieu || 'invincible') + ') · vitesse ×' + G.speed + '</div>', [
    [god() ? 'Mode Dieu : OFF' : 'Mode Dieu : ON', () => { S.god = !S.god; save(false); openDev(); }, true],
    ['Vitesse ×' + next, () => { G.speed = next; openDev(); }, true],
    ...jeu,
    ['Tout effacer', confirmReset],
    ['Retour', openOptions]]);
}
function tryCode() {
  const inp = $('#devCode'), v = inp ? inp.value.trim().toUpperCase() : ''; // le clavier iPhone met une majuscule et parfois une espace
  if (v === 'BURGER') { S.dev = true; S.god = true; save(false); toast('BURGER ACCEPTÉ — MODE DIEU ACTIVÉ', 'save'); openDev(); }
  else { toast('ACCÈS REFUSÉ', 'warn'); if (inp) inp.value = ''; }
}
function confirmReset() {
  modal('Tout effacer ?', 'La partie repart de zéro. (Pense à exporter avant si tu veux la garder.)', [
    ['Oui, tout effacer', () => { const dev = S.dev; S = freshState(); S.dev = dev; save(true); if (JEU.recharger) JEU.recharger(); }],
    ['Annuler', openDev]]);
}

// ---- en-tête : les boutons qui OUVRENT une modale utilisent onclick (pas pressable : le « click » qui suit un
// pointerup tomberait sur la modale qui vient de s'ouvrir) ----
function initCoquille() {
  $('#titre').textContent = JEU.titre;
  document.title = JEU.titre;
  $('#btnSave').onclick = () => save(true);
  $('#btnOpts').onclick = openOptions;
  $('#mclose').onclick = closeModal;
}
function renderCoquille() { $('#godBadge').hidden = !god(); }
function offline() { // retour après une absence (app fermée ou en arrière-plan)
  const away = (Date.now() - (S.last || Date.now())) / 1000; S.last = Date.now();
  if (away < 60 || !JEU.absence) return;
  const msg = JEU.absence(away); // le jeu applique ses gains éventuels et renvoie un message (ou rien)
  if (!msg) return;
  if (MODAL_OPEN) toast(msg, 'save'); else modal('Bon retour !', esc(msg), [['Super !']], true);
}
