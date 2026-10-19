/* ===================== DONNÉES DU JEU ===================== */
// Accès sûr aux textes (si un fichier de texte manque, le jeu reste jouable)
function TX(get, fb) { try { const v = get(); return v == null ? fb : v; } catch (e) { return fb; } }
function NQ(get, fbName) { const o = TX(get, null); return { n: (o && o.n) || fbName, q: (o && o.q) || '' }; }

// Typographie française homogène : espaces fines insécables avant ; ! ? » % et après «, insécable avant :, apostrophes courbes
const NNB = '\u202f', NB = '\u00a0';
function TYPO(s, apos = true) {
  if (typeof s !== 'string') return s;
  if (apos) s = s.replace(/([A-Za-z\u00c0-\u00ff\u0152\u0153])'(?=[A-Za-z\u00c0-\u00ff\u0152\u0153])/g, '$1\u2019');
  return s.replace(/«[ \u00a0\u202f]*/g, '«' + NNB).replace(/[ \u00a0\u202f]*([;!?»%])/g, (m, c) => (c === '!' || c === '?' ? (/\S/.test(m[0]) && m.length === 1 ? m : NNB + c) : NNB + c)).replace(/ :/g, NB + ':');
}
function typoAll(o) { for (const k in o) { const v = o[k]; if (typeof v === 'string') o[k] = TYPO(v); else if (v && typeof v === 'object') typoAll(v); } }
['TXT_BUILDINGS', 'TXT_SYNERGIES', 'TXT_ACH', 'TXT_PROVISIONS', 'TXT_CLICKPCT', 'TXT_GOLDUP', 'TXT_REPUP', 'TXT_PRESTIGE', 'TXT_CHALLENGES', 'TXT_PETRI', 'TXT_GOLDEN', 'TXT_ERAS', 'TXT_VESSELS', 'TXT_RANKS', 'TXT_LABNAMES', 'TXT_PAPERS', 'TXT_OFFLINE', 'TXT_EUREKA', 'TXT_TIPS', 'TXT_NEWS', 'TXT_INCIDENTS'].forEach(k => TX(() => typoAll(eval(k)), null));
const B_IDS = ['pipette', 'stagiaire', 'bunsen', 'microscope', 'centrifugeuse', 'robot', 'clonage', 'fusion', 'accelerateur', 'quantique',
  'orbitale', 'nanobots', 'portail', 'chrono', 'forge', 'trounoir', 'simulateur', 'cerveau', 'bigbang', 'infini'];
const B_FALLBACK = ['Pipette automatique', 'Stagiaire', 'Bec Bunsen', 'Microscope', 'Centrifugeuse', 'Bras robotique', 'Cuve de clonage',
  'Réacteur à fusion', 'Accélérateur de particules', 'Ordinateur quantique', 'Station orbitale', 'Essaim de nanobots', 'Portail dimensionnel',
  'Chronolabo', 'Forge stellaire', 'Trou noir domestiqué', "Simulateur d'univers", 'Cerveau galactique', 'Fabrique de Big Bang', 'Le Labo Infini'];
// Courbe « progression constante » (rééquilibrée après « stuck au réacteur à fusion depuis plus d'une heure ») :
// le temps de rentabilité (coût ÷ production) grandit d'environ ×1,45 par bâtiment jusqu'au Portail, au lieu de ×2,5,
// pour qu'un nouveau bâtiment ou une nouvelle ère arrive toutes les ~5-25 min ; ensuite la pente redevient raide
// et c'est la publication (prix Nobel) qui fait avancer. Vérifié avec labo/tools/sim_rythme.js et sim_parties.js.
const B_COST = [15, 100, 1100, 12000, 130000, 1.4e6, 2e7, 2.8e8, 3.9e9, 5.5e10, 7.5e11, 1e13, 1.4e14, 4e15, 7e16, 1.2e18, 7e19, 1.2e22, 2e24, 5e26];
const B_CPS = [0.1, 1, 8, 47, 360, 2700, 27000, 250000, 2.4e6, 2.3e7, 2.2e8, 2e9, 1.1e10, 8e10, 4.4e11, 2.4e12, 1.75e13, 1.2e14, 6.7e14, 5e15];
// [couleur du mur, couleur du sol, accent] pour les rangées de la vue du labo
const B_THEME = [
  ['#2a2f4a', '#3a4466', '#8b9bb4'], ['#3b3346', '#5a4a52', '#ead4aa'], ['#3a2626', '#5a3a2a', '#f77622'], ['#232c45', '#36405e', '#8b9bb4'],
  ['#1d3540', '#2a4a55', '#2ce8f5'], ['#3a3020', '#544428', '#feae34'], ['#183327', '#24503a', '#63c74d'], ['#3a1424', '#56203a', '#ff0044'],
  ['#132a45', '#1d3d63', '#0099db'], ['#2f2b1a', '#4a4326', '#fee761'], ['#1b1e33', '#2e3352', '#c0cbdc'], ['#262a30', '#3b414a', '#c0cbdc'],
  ['#2a1742', '#3f2463', '#9b5de5'], ['#33231a', '#4e3526', '#d77643'], ['#331a10', '#52281a', '#feae34'], ['#120c1c', '#21162f', '#b55088'],
  ['#0f2430', '#183848', '#2ce8f5'], ['#381c2c', '#562a42', '#f6757a'], ['#2e0f16', '#4a1822', '#e43b44'], ['#22163a', '#352458', '#d4b8ff'],
];

const B_FEM = { pipette: 1, centrifugeuse: 1, clonage: 1, orbitale: 1, forge: 1, bigbang: 1 };
const BUILDINGS = B_IDS.map((id, i) => {
  const t = TX(() => TXT_BUILDINGS[id], {});
  const name = t.name || B_FALLBACK[i], plural = t.plural || (B_FALLBACK[i] + 's');
  return {
    id, i, name, plural, desc: t.desc || '', q: t.q || '', fem: !!B_FEM[id],
    lcName: id === 'infini' ? 'Labo Infini' : U.lc(name), lcPlural: id === 'infini' ? 'Labos Infinis' : U.lc(plural),
    cost: B_COST[i], cps: B_CPS[i], theme: B_THEME[i], sprite: 'b_' + id,
  };
});
const BMAP = {}; BUILDINGS.forEach(b => BMAP[b.id] = b);

/* ---------- Ères et récipients ---------- */
const NOBEL_BASE = 5e11; // molécules cumulées pour le 1er prix Nobel
const ERA_REQ = [0, 3, 5, 7, 10, 12, 14, 16, 19]; // index du bâtiment à posséder
const ERA_FALLBACK = ['Le Garage', "L'Université", 'La MégaCorp', "L'Ère atomique", "L'Ère orbitale", "L'Ère dimensionnelle", "L'Ère stellaire", "L'Ère cosmique", "L'Infini"];
const VESSEL_OF_ERA = [0, 1, 1, 2, 2, 3, 4, 4, 5];
// liquide, liquide clair, accent, glow
const ERA_STYLE = [
  { liq: '#63c74d', liq2: '#b6f27a', acc: '#feae34', glow: '#63c74d' },
  { liq: '#0099db', liq2: '#7fd6ff', acc: '#2ce8f5', glow: '#0099db' },
  { liq: '#2ce8f5', liq2: '#c9fbff', acc: '#feae34', glow: '#2ce8f5' },
  { liq: '#9be83a', liq2: '#f2ff8a', acc: '#ff0044', glow: '#b6ff3a' },
  { liq: '#8a6cf0', liq2: '#d4b8ff', acc: '#2ce8f5', glow: '#8a6cf0' },
  { liq: '#b13cd8', liq2: '#f0a8ff', acc: '#2ce8f5', glow: '#9b5de5' },
  { liq: '#f77622', liq2: '#fee761', acc: '#fee761', glow: '#feae34' },
  { liq: '#b55088', liq2: '#ffc0ea', acc: '#2ce8f5', glow: '#b55088' },
  { liq: '#ffffff', liq2: '#ffffff', acc: '#ffffff', glow: '#d4b8ff', rainbow: true },
];

/* ---------- Améliorations ---------- */
const TIER_REQ = [1, 5, 25, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600];
const TIER_MULT = [10, 50, 500, 5e4, 5e6, 5e8, 5e11, 5e14, 5e17, 5e20, 5e23, 5e26, 5e29, 5e32, 5e35];
const PIP_REQ = [1, 1, 10, 25, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550];
const PIP_COST = [100, 500, 1e4, 1e5, 1e7, 1e8, 1e9, 1e10, 1e13, 1e16, 1e19, 1e22, 1e25, 1e28, 1e31];
const CAFE_MULT = [0, 0, 0, 0.1, 5, 10, 20, 20, 20, 20, 20, 20, 20, 20, 20]; // tier 3 : +0,1 ; ensuite multiplicateurs
const SYN_PAIRS = [['bunsen', 'forge'], ['microscope', 'nanobots'], ['centrifugeuse', 'accelerateur'], ['robot', 'cerveau'], ['clonage', 'simulateur'],
  ['fusion', 'orbitale'], ['accelerateur', 'trounoir'], ['quantique', 'cerveau'], ['orbitale', 'portail'], ['nanobots', 'bigbang'],
  ['portail', 'chrono'], ['chrono', 'infini'], ['forge', 'bigbang'], ['trounoir', 'simulateur'], ['stagiaire', 'infini']];
const CLICK_REQ = [25, 150, 500, 1000, 2000, 3500, 5000, 7500, 10000, 15000, 20000, 30000, 40000, 50000]; // clics cumulés
const GOLD_UP = [{ req: 7, cost: 7.77e8 }, { req: 27, cost: 7.77e10 }, { req: 77, cost: 7.77e12 }, { req: 150, cost: 7.77e16 }, { req: 250, cost: 7.77e18 }, { req: 400, cost: 7.77e20 }];
const GOLD_UP_DESC = ['Les fioles dorées apparaissent 2× plus souvent et restent 2× plus longtemps.', 'Les fioles dorées apparaissent 2× plus souvent et restent 2× plus longtemps.',
  'Les effets des fioles dorées durent 2× plus longtemps.', 'La pluie de fioles dure 2× plus longtemps et chaque fiole rapporte 2× plus.',
  'Les fioles dorées restent 50 % plus longtemps à l’écran.', 'Les réactions en chaîne rapportent 2× plus.'];
const REP_REQ = [10, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275];
const REP_F = [0.1, 0.125, 0.15, 0.175, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2];
const REP_FALLBACK = ['Assistant de recherche', 'Doctorant', 'Post-doctorant', 'Maître de conférences', 'Directeur de labo', 'Doyen', 'Recteur', 'Ministre de la Recherche', 'Comité Nobel', 'Conseil galactique', 'Assemblée multiverselle', "L'Omniscient"];

const UPGRADES = [], UPMAP = {};
function addUp(u) { u.order = UPGRADES.length; UPGRADES.push(u); UPMAP[u.id] = u; return u; }

(function buildUpgrades() {
  // Paliers de bâtiments
  BUILDINGS.forEach((b, bi) => {
    const tiers = TX(() => TXT_BUILDINGS[b.id].tiers, []) || [];
    for (let k = 0; k < 15; k++) {
      const t = tiers[k] || {};
      const u = { id: 't_' + b.id + '_' + k, type: 'tier', b: b.id, k, name: t.n || (b.name + ' ' + 'I II III IV V VI VII VIII IX X XI XII XIII XIV XV'.split(' ')[k]), q: t.q || '', icon: b.sprite, tier: k };
      if (b.id === 'pipette') {
        u.cost = PIP_COST[k]; u.reqN = PIP_REQ[k];
        if (k < 3) u.desc = 'Les pipettes automatiques et les clics sont <b>deux fois</b> plus efficaces.';
        else if (k === 3) { u.cafe = 'add'; u.desc = 'Les pipettes et les clics gagnent <b>+0,1</b> molécule pour chaque bâtiment qui n’est pas une pipette.'; u.icon = 'i_cafe'; }
        else { u.cafe = CAFE_MULT[k]; u.desc = 'Bonus du café multiplié par <b>' + CAFE_MULT[k] + '</b>.'; u.icon = 'i_cafe'; }
      } else {
        u.cost = b.cost * TIER_MULT[k]; u.reqN = TIER_REQ[k];
        u.desc = 'Production des ' + b.lcPlural + ' <b>×2</b>.';
      }
      addUp(u);
    }
  });
  // Stagiaires spécialisés
  BUILDINGS.forEach((b, bi) => {
    if (bi < 2) return;
    const t = NQ(() => TXT_BUILDINGS[b.id].spec, 'Stagiaires spécialisés (' + b.name + ')');
    const per = bi - 1;
    addUp({ id: 's_' + b.id, type: 'spec', b: b.id, per, name: t.n, q: t.q, icon: 'b_stagiaire', icon2: b.sprite, tier: null, cost: b.cost * 50,
      desc: 'Stagiaires <b>×2</b>. Les ' + b.lcPlural + ' gagnent <b>+1 %</b> de production par ' + (per > 1 ? per + ' stagiaires' : 'stagiaire') + '.' });
  });
  // Synergies
  SYN_PAIRS.forEach(([a, c]) => {
    const t = NQ(() => TXT_SYNERGIES[a + '+' + c], 'Synergie ' + BMAP[a].name + ' / ' + BMAP[c].name);
    addUp({ id: 'y_' + a + '_' + c, type: 'syn', a, c, name: t.n, q: t.q, icon: BMAP[a].sprite, icon2: BMAP[c].sprite, tier: 6, cost: BMAP[c].cost * 30,
      desc: BMAP[a].plural + ' : <b>+5 %</b> par ' + BMAP[c].lcName + '. ' + BMAP[c].plural + ' : <b>+0,1 %</b> par ' + BMAP[a].lcName + '.' });
  });
  // Provisions (multiplicateurs globaux)
  const prov = TX(() => TXT_PROVISIONS, []) || [];
  for (let k = 0; k < 60; k++) {
    const t = prov[k] || {};
    const pct = 0.05 + 0.01 * Math.floor(k / 10);
    addUp({ id: 'p_' + k, type: 'prov', k, pct, name: t.n || ('Provision n°' + (k + 1)), q: t.q || '', icon: t.i || ('f_' + String(k % 20 + 1).padStart(2, '0')), tier: Math.floor(k / 4) % 15,
      cost: 2e4 * Math.pow(10, k * 0.8), desc: 'Production <b>+' + Math.round(pct * 100) + ' %</b>.' });
  }
  // Clic : % de la production
  const cp = TX(() => TXT_CLICKPCT, []) || [];
  CLICK_REQ.forEach((r, k) => {
    const t = cp[k] || {};
    addUp({ id: 'c_' + k, type: 'clickpct', k, req: r, name: t.n || ('Gant n°' + (k + 1)), q: t.q || '', icon: 'i_glove', tier: k, cost: 1e4 * Math.pow(25, k),
      desc: 'Chaque clic gagne <b>+2 %</b> de votre production par seconde.' });
  });
  // Fioles dorées
  const gu = TX(() => TXT_GOLDUP, []) || [];
  GOLD_UP.forEach((g, k) => {
    const t = gu[k] || {};
    addUp({ id: 'g_' + k, type: 'goldup', k, req: g.req, name: t.n || ('Fiole porte-bonheur ' + (k + 1)), q: t.q || '', icon: 'g_golden', tier: 2, cost: g.cost, desc: GOLD_UP_DESC[k] });
  });
  // Hiérarchie académique (réputation)
  const rp = TX(() => TXT_REPUP, []) || [];
  REP_REQ.forEach((r, k) => {
    const t = rp[k] || {};
    addUp({ id: 'r_' + k, type: 'rep', k, req: r, f: REP_F[k], name: t.n || REP_FALLBACK[k], q: t.q || '', icon: 'i_rep', tier: k, cost: 9e5 * Math.pow(500, k),
      desc: 'Production multipliée par <b>(1 + ' + dec(REP_F[k] * 100, 1) + ' % de la Réputation)</b>.' });
  });
})();

/* ---------- Succès ---------- */
const ACH = [], ACHMAP = {};
function addAch(a) { a.order = ACH.length; ACH.push(a); ACHMAP[a.id] = a; }
const A_EARNED = [1, 1e3, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13, 1e14, 1e15, 1e16, 1e18, 1e21, 1e24, 1e27, 1e30, 1e33, 1e36, 1e39, 1e42, 1e45, 1e48, 1e51, 1e54, 1e57, 1e60];
const A_CPS = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e12, 1e14, 1e16, 1e18, 1e20, 1e22, 1e24, 1e27, 1e30, 1e33, 1e36];
const A_CLICKS = [1, 100, 1000, 5000, 10000, 25000, 50000, 100000];
const A_HAND = [1e3, 1e5, 1e7, 1e9, 1e11, 1e13, 1e15, 1e17, 1e19, 1e21, 1e24, 1e27, 1e30];
const A_TOTB = [100, 500, 1000, 2000, 4000, 8000];
const A_UPS = [20, 50, 100, 200, 300, 400];
const A_GOLD = [1, 7, 27, 77, 777, 7777];
const A_NOBEL = [1, 10, 100, 1000, 1e4, 1e5, 1e6];
const A_EUREKA = [1, 100, 1000];
const A_BUILD = [1, 50, 100, 150, 200, 300, 400, 500];
const SECRET_KEYS = ['sell1', 'sell100', 'burger', 'logo', 'rename', 'speed', 'idle', 'insomnia', 'holiday', 'bulk', 'export', 'reflex', 'miss', 'collector', 'fullpetri', 'emptypub', 'alltree', 'anomaly', 'tooslow', 'broke'];
const SECRET_ICON = { sell1: 'i_sell', sell100: 'i_sell', burger: 'i_dev', logo: 'i_star', rename: 'i_book', speed: 'i_click', idle: 'i_clock', insomnia: 'i_clock', holiday: 'i_clock', bulk: 'i_shop', export: 'i_save', reflex: 'g_golden', miss: 'g_golden', collector: 'i_lab', fullpetri: 'i_petri', emptypub: 'i_book', alltree: 'i_nobel', anomaly: 'g_anomaly', tooslow: 'i_challenge', broke: 'i_sell' };

(function buildAch() {
  const T = TX(() => TXT_ACH, {}) || {};
  const nq = (cat, k, fb) => { const a = (T[cat] || [])[k] || {}; return { n: a.n || fb, q: a.q || '' }; };
  A_EARNED.forEach((v, k) => { const t = nq('earned', k, 'Production ' + (k + 1)); addAch({ id: 'ae' + k, cat: 'Production', name: t.n, q: t.q, icon: 'p_mol', tier: k % 15, desc: () => 'Produire ' + fmtMol(v) + ' dans une même partie.', check: () => S.runEarned >= v }); });
  A_CPS.forEach((v, k) => { const t = nq('cps', k, 'Cadence ' + (k + 1)); addAch({ id: 'ac' + k, cat: 'Production', name: t.n, q: t.q, icon: 'i_atom', tier: k % 15, desc: () => 'Atteindre ' + fmtMol(v) + ' par seconde.', check: () => G.cps >= v }); });
  A_CLICKS.forEach((v, k) => { const t = nq('clicks', k, 'Clics ' + (k + 1)); addAch({ id: 'ak' + k, cat: 'Clics', name: t.n, q: t.q, icon: 'i_click', tier: k, desc: () => 'Cliquer ' + fmt(v) + ' fois sur le récipient.', check: () => S.clicksAll >= v }); });
  A_HAND.forEach((v, k) => { const t = nq('handmade', k, 'Fait main ' + (k + 1)); addAch({ id: 'ah' + k, cat: 'Clics', name: t.n, q: t.q, icon: 'i_glove', tier: k % 15, desc: () => 'Produire ' + fmtMol(v) + ' en cliquant.', check: () => S.handmadeAll >= v }); });
  A_TOTB.forEach((v, k) => { const t = nq('totalBuildings', k, 'Bâtisseur ' + (k + 1)); addAch({ id: 'ab' + k, cat: 'Bâtiments', name: t.n, q: t.q, icon: 'i_lab', tier: k, desc: () => 'Posséder ' + fmt(v) + ' bâtiments au total.', check: () => G.totalB >= v }); });
  A_UPS.forEach((v, k) => { const t = nq('upgrades', k, 'Amélioré ' + (k + 1)); addAch({ id: 'au' + k, cat: 'Améliorations', name: t.n, q: t.q, icon: 'i_up', tier: k, desc: () => 'Acheter ' + v + ' améliorations dans une même partie.', check: () => G.upCount >= v }); });
  A_GOLD.forEach((v, k) => { const t = nq('golden', k, 'Fioles dorées ' + (k + 1)); addAch({ id: 'ag' + k, cat: 'Fioles dorées', name: t.n, q: t.q, icon: 'g_golden', tier: 2, desc: () => 'Cliquer sur ' + fmt(v) + ' fiole' + (v >= 2 ? 's dorées' : ' dorée') + '.', check: () => S.goldClicks >= v }); });
  { const t = nq('prestige', 0, 'Première publication'); addAch({ id: 'ap0', cat: 'Prestige', name: t.n, q: t.q, icon: 'i_book', tier: 2, desc: () => 'Publier vos travaux pour la première fois.', check: () => S.publishes >= 1 }); }
  A_NOBEL.forEach((v, k) => { const t = nq('prestige', k + 1, 'Nobel ' + (k + 1)); addAch({ id: 'ap' + (k + 1), cat: 'Prestige', name: t.n, q: t.q, icon: 'i_nobel', tier: k + 2, desc: () => 'Cumuler ' + fmtNom(v, 'prix Nobel', 'prix Nobel') + '.', check: () => S.nobels >= v }); });
  A_EUREKA.forEach((v, k) => { const t = nq('eureka', k, 'Eurêka ' + (k + 1)); addAch({ id: 'ar' + k, cat: 'Clics', name: t.n, q: t.q, icon: 'i_eureka', tier: k * 3, desc: () => 'Déclencher ' + fmt(v) + ' Eurêka.', check: () => S.eurekas >= v }); });
  const PT = ['Planter votre première culture.', 'Récolter 10 cultures.', 'Récolter 100 cultures.', 'Découvrir 6 souches.', 'Découvrir les 12 souches.', 'Récolter la Souche Oméga.'];
  PT.forEach((d, k) => { const t = nq('petri', k, 'Petri ' + (k + 1)); addAch({ id: 'at' + k, cat: 'Boîte de Petri', name: t.n, q: t.q, icon: 'i_petri', tier: k * 2, desc: () => d, check: () => petriAch(k) }); });
  for (let k = 0; k < 11; k++) { const t = nq('challenges', k, 'Protocole ' + (k + 1)); addAch({ id: 'ax' + k, cat: 'Protocoles', name: t.n, q: t.q, icon: 'i_challenge', tier: k, desc: () => k < 10 ? 'Réussir le protocole « ' + CHALLENGES[k].name + ' ».' : 'Réussir tous les protocoles expérimentaux.', check: () => k < 10 ? !!S.chalDone[CHALLENGES[k].id] : CHALLENGES.every(c => S.chalDone[c.id]) }); }
  for (let k = 0; k < 9; k++) { const t = nq('eras', k, 'Ère ' + (k + 1)); addAch({ id: 'aa' + k, cat: 'Ères', name: t.n, q: t.q, icon: 'v' + (VESSEL_OF_ERA[k] + 1), tier: k, desc: () => k === 0 ? 'Ouvrir votre laboratoire.' : 'Atteindre ' + U.art(ERAS[k].name) + '.', check: () => S.eraMax >= k }); }
  BUILDINGS.forEach(b => {
    const arr = (T.building || {})[b.id] || [];
    A_BUILD.forEach((v, k) => { const a = arr[k] || {}; addAch({ id: 'ab_' + b.id + '_' + k, cat: 'Bâtiments', name: a.n || (b.name + ' ×' + v), q: a.q || '', icon: b.sprite, tier: k * 2, desc: () => v === 1 ? 'Acquérir votre premier bâtiment « ' + b.name + ' ».' : 'Posséder ' + v + ' ' + b.lcPlural + '.', check: () => (S.b[b.id] || 0) >= v }); });
  });
  SECRET_KEYS.forEach(key => {
    const a = (T.secret || {})[key] || {};
    addAch({ id: 'as_' + key, cat: 'Secrets', name: a.n || ('Secret : ' + key), q: a.q || '', icon: SECRET_ICON[key], tier: 13, secret: true, desc: () => a.d || '???', check: () => !!S.flags['s_' + key] });
  });
})();

/* ---------- Fondation Nobel (arbre de prestige) ---------- */
const PRESTIGE = [
  // id, coût, prérequis, rangée, icône, effet
  ['fond', 1, null, 0, 'i_nobel', 'Production <b>+10 %</b>.'],
  ['boost2', 25, 'fond', 1, 'i_star', 'Production <b>+15 %</b>.'],
  ['click1', 3, 'fond', 1, 'i_click', 'Clics <b>×2</b>.'],
  ['gold1', 3, 'fond', 1, 'g_golden', 'Fioles dorées <b>5 %</b> plus fréquentes.'],
  ['auto1', 1, 'fond', 1, 'i_clock', 'Production hors-ligne : <b>30 %</b> pendant <b>8 h</b> max.'],
  ['kit1', 5, 'fond', 1, 'i_shop', 'Chaque partie commence avec <b>10 pipettes</b> et <b>5 stagiaires</b>.'],
  ['chal', 5, 'fond', 1, 'i_challenge', 'Débloque les <b>protocoles expérimentaux</b> (défis).'],
  ['cheap1', 10, 'fond', 1, 'i_sell', 'Bâtiments <b>2 %</b> moins chers.'],
  ['upcheap1', 10, 'fond', 1, 'i_up', 'Améliorations <b>5 %</b> moins chères.'],
  ['petri1', 25, 'fond', 1, 'i_petri', 'Cycles de la boîte de Petri <b>2× plus rapides</b>.'],
  ['boost3', 777, 'boost2', 2, 'i_star', 'Production <b>+20 %</b>.'],
  ['nobel1', 100, 'boost2', 2, 'i_nobel', 'Effet des prix Nobel <b>×1,25</b>.'],
  ['rep1', 100, 'boost2', 2, 'i_rep', 'Réputation <b>+10 %</b>.'],
  ['eureka1', 10, 'click1', 2, 'i_eureka', 'La jauge Eurêka se remplit <b>50 %</b> plus vite et l’Eurêka dure <b>50 %</b> plus longtemps.'],
  ['ghost1', 25, 'click1', 2, 'i_cursor_gold', 'Une pipette fantôme clique <b>1 fois par seconde</b> pour vous.'],
  ['gold2', 10, 'gold1', 2, 'g_golden', 'Effets des fioles dorées <b>10 %</b> plus longs.'],
  ['auto2', 25, 'auto1', 2, 'i_clock', 'Production hors-ligne : <b>60 %</b> pendant <b>16 h</b> max.'],
  ['kit2', 100, 'kit1', 2, 'i_shop', 'Chaque partie commence avec <b>50 pipettes</b>, <b>25 stagiaires</b> et <b>10 becs Bunsen</b>.'],
  ['cheap2', 100, 'cheap1', 2, 'i_sell', 'Bâtiments encore <b>3 %</b> moins chers.'],
  ['upcheap2', 777, 'upcheap1', 2, 'i_up', 'Améliorations encore <b>10 %</b> moins chères.'],
  ['petri2', 777, 'petri1', 2, 'i_petri', 'Mutations <b>50 %</b> plus fréquentes dans la boîte de Petri.'],
  ['boost4', 7777, 'boost3', 3, 'i_star', 'Production <b>+25 %</b>.'],
  ['syn', 7777, 'boost3', 3, 'i_atom', 'Effets des <b>synergies ×2</b>.'],
  ['spec', 7777, 'boost3', 3, 'b_stagiaire', 'Bonus des <b>stagiaires spécialisés ×2</b>.'],
  ['nobel2', 7777, 'nobel1', 3, 'i_nobel', 'Effet des prix Nobel <b>×1,5</b>.'],
  ['rep2', 7777, 'rep1', 3, 'i_rep', 'Réputation <b>+20 %</b>.'],
  ['click2', 77, 'eureka1', 3, 'i_click', 'Clics <b>×3</b>.'],
  ['ghost2', 777, 'ghost1', 3, 'i_cursor_gold', 'La pipette fantôme clique <b>5 fois par seconde</b>.'],
  ['gold3', 25, 'gold2', 3, 'g_golden', 'Les fioles dorées restent <b>2× plus longtemps</b> à l’écran.'],
  ['lucky', 777, 'gold2', 3, 'i_dice', 'Les réactions en chaîne rapportent <b>2× plus</b>.'],
  ['storm', 777, 'gold2', 3, 'g_mini', 'Pluies de fioles <b>plus longues</b> et <b>plus denses</b>.'],
  ['auto3', 777, 'auto2', 3, 'i_clock', 'Production hors-ligne : <b>100 %</b> pendant <b>48 h</b> max.'],
  ['kit3', 7777, 'kit2', 3, 'i_shop', 'Chaque partie commence avec <b>100</b> exemplaires de chacun des <b>6 premiers bâtiments</b>.'],
  ['cheap3', 1000, 'cheap2', 3, 'i_sell', 'Bâtiments encore <b>5 %</b> moins chers.'],
  ['petri3', 7777, 'petri2', 3, 'i_petri', 'Boîte de Petri <b>agrandie</b> d’une rangée et d’une colonne.'],
  ['boost5', 77777, 'boost4', 4, 'i_star', 'Production <b>+50 %</b>.'],
  ['nobel3', 7.77e6, 'nobel2', 4, 'i_nobel', 'Effet des prix Nobel <b>×2</b>.'],
  ['twin', 777, 'gold3', 4, 'g_golden', '<b>3 %</b> de chance qu’une fiole dorée arrive avec une jumelle.'],
  ['auto4', 77777, 'auto3', 4, 'i_clock', 'Production hors-ligne : <b>100 %</b> pendant <b>7 jours</b> max.'],
  ['boost6', 7.77e6, 'boost5', 5, 'i_star', 'Production <b>×2</b>.'],
  ['anomaly', 1777, 'twin', 5, 'g_anomaly', 'Débloque les <b>anomalies quantiques</b>, plus rares et bien plus puissantes.'],
  ['boost7', 7.77e8, 'boost6', 6, 'i_star', 'Production <b>×3</b>.'],
  ['boost8', 7.77e10, 'boost7', 7, 'i_star', 'Production <b>×5</b>.'],
  ['fin', 7.77e12, 'boost8', 8, 'b_infini', 'Production <b>×10</b>. Et après ?'],
].map(([id, cost, req, row, icon, eff]) => { const t = NQ(() => TXT_PRESTIGE[id], id); return { id, cost, req, row, icon, eff, name: t.n, q: t.q }; });
const PMAP = {}; PRESTIGE.forEach(p => PMAP[p.id] = p);

/* ---------- Protocoles expérimentaux (défis) ---------- */
const CHALLENGES = [
  ['noclick', 1e12, 'Cliquer sur le récipient ne produit rien (pipettes fantômes comprises).', 'Production <b>+10 %</b> pour toujours.', 'i_click', 'Mains liées'],
  ['budget', 1e12, 'Tous les bâtiments coûtent <b>10×</b> plus cher.', 'Bâtiments <b>3 %</b> moins chers pour toujours.', 'i_sell', 'Budget serré'],
  ['noupgrade', 1e11, 'Impossible d’acheter des améliorations.', 'Améliorations <b>10 %</b> moins chères pour toujours.', 'i_up', 'Sans améliorations'],
  ['minimal', 1e11, 'Vous ne pouvez posséder que <b>3 types</b> de bâtiments.', 'Production <b>+1 %</b> par type de bâtiment possédé, pour toujours.', 'i_lab', 'Labo minimaliste'],
  ['inflation', 1e12, 'Le prix des bâtiments augmente de <b>25 %</b> à chaque achat au lieu de 15 %.', 'Le prix des bâtiments augmente de <b>14,5 %</b> au lieu de 15 %, pour toujours.', 'i_stats', 'Inflation galopante'],
  ['nogold', 1e15, 'Aucune fiole dorée n’apparaît.', 'Fioles dorées <b>15 %</b> plus fréquentes pour toujours.', 'g_golden', 'Ciel couvert'],
  ['speedrun', 1e9, 'Atteindre l’objectif en moins de <b>20 minutes</b>.', 'Production <b>×3</b> pendant les 10 premières minutes de chaque partie.', 'i_clock', 'Course contre la montre'],
  ['cap10', 1e10, 'Au maximum <b>10 exemplaires</b> de chaque bâtiment.', 'Production <b>+25 %</b> pour toujours.', 'i_shop', 'Dix de chaque'],
  ['entropy', 1e12, 'Toute la production est divisée par <b>10</b>.', 'Effets des fioles dorées <b>20 %</b> plus longs pour toujours.', 'i_atom', 'Entropie'],
  ['grand', 1e10, 'Mains liées + Budget serré + Sans améliorations, en même temps.', 'Production <b>×2</b> pour toujours.', 'i_trophy', 'Le Grand Protocole'],
].map(([id, goal, rule, reward, icon, fb]) => { const t = NQ(() => TXT_CHALLENGES[id], fb); return { id, goal, rule, reward, icon, name: t.n, q: t.q }; });
const CMAP = {}; CHALLENGES.forEach(c => CMAP[c.id] = c);

/* ---------- Boîte de Petri : souches ---------- */
// grow = cycles pour mûrir, life = durée de vie (0 = immortelle), cost = secondes de production, eff = effet quand mûre
const STRAINS = [
  ['levure', null, 0, 3, 20, 60, { cps: 0.01 }, 60, 'Production <b>+1 %</b>.', 'Levure de boulanger'],
  ['moisi', null, 0, 4, 25, 60, { gold: 0.01 }, 30, 'Fioles dorées <b>1 %</b> plus fréquentes.', 'Moisissure verte'],
  ['lumi', ['levure', 'levure'], 0.08, 5, 25, 120, { click: 0.03 }, 120, 'Clics <b>+3 %</b>.', 'Bactérie luminescente'],
  ['penic', ['levure', 'moisi'], 0.06, 6, 30, 180, { bcost: 0.005 }, 180, 'Bâtiments <b>0,5 %</b> moins chers.', 'Pénicilline'],
  ['blob', ['moisi', 'moisi'], 0.06, 10, 18, 120, { cps: 0.005 }, 132, 'Production <b>+0,5 %</b>. Récolte généreuse.', 'Blob gélatineux'],
  ['champi', ['penic', 'blob'], 0.04, 7, 30, 300, { gdur: 0.02 }, 300, 'Effets des fioles dorées <b>2 %</b> plus longs.', 'Champignon psychédélique'],
  ['cristal', ['lumi', 'lumi'], 0.04, 8, 40, 300, { ucost: 0.01 }, 300, 'Améliorations <b>1 %</b> moins chères.', 'Cristaux vivants'],
  ['mito', ['levure', 'penic'], 0.04, 6, 30, 400, { cps: 0.03 }, 400, 'Production <b>+3 %</b>.', 'Mitochondrie géante'],
  ['tardi', ['blob', 'blob'], 0.03, 10, 0, 600, { cps: 0.01 }, 600, 'Production <b>+1 %</b>. Immortel.', 'Tardigrade'],
  ['nano', ['cristal', 'mito'], 0.025, 10, 50, 900, { eureka: 0.05 }, 900, 'Jauge Eurêka <b>5 %</b> plus rapide.', 'Nanoflore'],
  ['schro', ['champi', 'nano'], 0.02, 9, 40, 1200, { schro: 0.06 }, 1200, 'À chaque cycle : production <b>+6 %</b>… ou rien. Les deux à la fois.', 'Souche de Schrödinger'],
  ['omega', ['schro', 'tardi'], 0.01, 15, 60, 3600, { cps: 0.1 }, 3600, 'Production <b>+10 %</b>. Récolte : <b>1 heure</b> de production.', 'Souche Oméga'],
].map(([id, rec, ch, grow, life, cost, eff, harvest, effTxt, fb]) => { const t = NQ(() => TXT_PETRI[id], fb); return { id, rec, ch, grow, life, cost, eff, harvest, effTxt, name: t.n, q: t.q, sprite: 'ps_' + id }; });
const SMAP = {}; STRAINS.forEach(s => SMAP[s.id] = s);

/* ---------- Effets dorés ---------- */
const GOLDEN_FALLBACK = { chain: 'Réaction en chaîne !', frenzy: 'Frénésie !', clickfrenzy: 'Main de Newton !', surge: 'Surcharge !', storm: 'Pluie de fioles !', singul: 'Singularité !', faille: 'Faille temporelle !', reson: 'Résonance !' };
const GOLDEN_TXT = {}; for (const k in GOLDEN_FALLBACK) GOLDEN_TXT[k] = NQ(() => TXT_GOLDEN[k], GOLDEN_FALLBACK[k]);

const ERAS = ERA_FALLBACK.map((fb, i) => { const t = NQ(() => TXT_ERAS[i], fb); return { name: t.n, q: t.q }; });
const VESSELS = ['Éprouvette', 'Erlenmeyer', 'Ballon à réaction', 'Cuve à plasma', 'Étoile en bouteille', 'Univers en bouteille'].map((fb, i) => { const t = NQ(() => TXT_VESSELS[i], fb); return { name: t.n, q: t.q, sprite: 'v' + (i + 1) }; });
const RANK_REQ = [0, 1, 3, 10, 25, 50, 100, 250, 500, 1000, 5000, 25000, 1e5, 1e6, 1e7];
const RANKS = TX(() => TXT_RANKS, null) || ['Stagiaire non rémunéré', 'Doctorant', 'Chercheur', 'Chercheur confirmé', 'Directeur de recherche', 'Professeur', 'Sommité', 'Lauréat', 'Légende', 'Mythe vivant', 'Demi-dieu', 'Divinité', 'Entité', 'Concept', "L'Infini"];

UPGRADES.forEach(u => u.desc = TYPO(u.desc, false));
PRESTIGE.forEach(p => p.eff = TYPO(p.eff, false));
CHALLENGES.forEach(c => { c.rule = TYPO(c.rule, false); c.reward = TYPO(c.reward, false); });
STRAINS.forEach(st => st.effTxt = TYPO(st.effTxt, false));
