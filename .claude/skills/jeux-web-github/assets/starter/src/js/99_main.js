/* ===================== DÉMARRAGE & BOUCLE PRINCIPALE (à garder) ===================== */
let ERR_SHOWN = false;
function showError(msg) { // une seule boîte, fermable, avec la version (pour savoir si l'iPhone a la dernière)
  if (ERR_SHOWN) return; ERR_SHOWN = true;
  const d = document.createElement('div');
  d.style.cssText = 'position:fixed;left:8px;right:8px;bottom:8px;z-index:999;background:#3a1418;border:2px solid #e43b44;color:#ffd0d0;padding:8px;font:16px monospace;white-space:pre-wrap;max-height:40%;overflow:auto';
  d.textContent = 'Erreur : ' + msg + '\n(touche pour fermer — ta partie est sauvegardée automatiquement)';
  d.onclick = () => d.remove();
  document.body.appendChild(d);
}
kitInstallErrorHandler(showError);
kitConfig(JEU.id, JEU.prefixe); // clés de sauvegarde propres à CE jeu (tous ses jeux partagent le même site)

function boot() {
  try {
    S = freshState();
    const r = kitLoad(parseSave);
    if (r.state) S = r.state;
    initCoquille();
    $('#boot').remove(); $('#app').hidden = false;
    JEU.demarrer($('#game'));
    if (r.recovered) toast('Sauvegarde abîmée : la copie de secours a été chargée.', 'warn');
    if (r.error) modal('Sauvegarde illisible', 'Ta sauvegarde n’a pas pu être lue. Garde ce texte (Importer pourra le relire) :<textarea readonly>' + esc(r.raw) + '</textarea>', [['Compris']], true);
    if (!store.probe()) toast('Stockage indisponible (navigation privée ?) : exporte ta partie avant de quitter.', 'warn');
    offline();
    kitInstallLayoutFixes($('#app'), () => { if (JEU.redimensionner) JEU.redimensionner(); });
    kitInstallAutosave(save);
    SFXK.installUnlock();
    document.addEventListener('visibilitychange', () => { if (!document.hidden) offline(); });
    requestAnimationFrame(loop);
  } catch (e) { showError((e && e.message) || String(e)); }
}
let LAST_T = 0;
function loop(t) {
  try {
    // rAF s'arrête en arrière-plan : au retour, dt est plafonné à 1 s et offline() compte l'absence
    const dt = Math.min(1, Math.max(0, (t - (LAST_T || t)) / 1000)); LAST_T = t;
    if (!MODAL_OPEN || JEU.continuerPendantModale) JEU.tick(dt * G.speed); // jeu en pause pendant Options, etc.
    JEU.rendu(); renderCoquille();
  } catch (e) { showError((e && e.message) || String(e)); }
  requestAnimationFrame(loop);
}
// attendre les polices intégrées s'il y en a (sinon le texte saute), mais jamais plus de 1,5 s
(function startWhenReady() {
  let done = false; const go = () => { if (!done) { done = true; boot(); } };
  try { document.fonts.ready.then(go, go); } catch (e) { }
  setTimeout(go, 1500);
})();
