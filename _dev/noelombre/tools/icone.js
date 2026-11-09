// Dessine l'icône de l'écran d'accueil (180×180, opaque) : NODE_PATH=$(npm root -g) node _dev/noelombre/tools/icone.js
const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 180, height: 180 } });
  await p.setContent('<canvas id=c width=720 height=720 style="width:180px;height:180px"></canvas><style>body{margin:0}</style>');
  await p.evaluate(() => {
    const c = document.getElementById('c').getContext('2d'), W = 720;
    let g = c.createLinearGradient(0, 0, 0, W); g.addColorStop(0, '#04050d'); g.addColorStop(0.6, '#0c1426'); g.addColorStop(1, '#14223a'); c.fillStyle = g; c.fillRect(0, 0, W, W);
    for (let i = 0; i < 70; i++) { c.fillStyle = 'rgba(255,255,255,' + (0.3 + Math.random() * 0.6) + ')'; c.fillRect(Math.random() * W, Math.random() * W * 0.6, 3, 3); }
    // lune énorme
    g = c.createRadialGradient(470, 250, 150, 470, 250, 330); g.addColorStop(0, 'rgba(255,240,200,.35)'); g.addColorStop(1, 'rgba(255,240,200,0)'); c.fillStyle = g; c.fillRect(0, 0, W, W);
    g = c.createRadialGradient(440, 220, 20, 470, 250, 170); g.addColorStop(0, '#fffaf0'); g.addColorStop(0.8, '#efe2c2'); g.addColorStop(1, '#d9c79c'); c.fillStyle = g; c.beginPath(); c.arc(470, 250, 165, 0, 7); c.fill();
    c.fillStyle = 'rgba(160,140,110,.25)'; [[420, 200, 30], [520, 300, 22], [500, 190, 14], [430, 310, 18]].forEach(([x, y, r]) => { c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); });
    // colline en spirale
    c.fillStyle = '#05060c'; c.beginPath(); c.moveTo(0, 720); c.quadraticCurveTo(300, 380, 440, 470); c.quadraticCurveTo(560, 560, 720, 560); c.lineTo(720, 720); c.fill();
    c.strokeStyle = '#05060c'; c.lineWidth = 34; c.lineCap = 'round'; c.beginPath(); c.moveTo(330, 470); c.bezierCurveTo(320, 330, 470, 300, 470, 380); c.bezierCurveTo(470, 430, 400, 430, 405, 385); c.stroke();
    // maison tordue
    c.fillStyle = '#0a0b14'; c.beginPath(); c.moveTo(60, 720); c.lineTo(70, 430); c.lineTo(50, 420); c.lineTo(140, 230); c.quadraticCurveTo(170, 150, 240, 140); c.quadraticCurveTo(190, 180, 200, 250); c.lineTo(250, 410); c.lineTo(230, 420); c.lineTo(250, 720); c.fill();
    const fen = (x, y, w, h) => { const gg = c.createRadialGradient(x + w / 2, y + h / 2, 2, x + w / 2, y + h / 2, w); gg.addColorStop(0, '#fff3c4'); gg.addColorStop(0.5, '#ffb84a'); gg.addColorStop(1, '#a8461a'); c.fillStyle = gg; c.fillRect(x, y, w, h); c.fillStyle = '#0a0b14'; c.fillRect(x + w / 2 - 3, y, 6, h); c.fillRect(x, y + h / 2 - 3, w, 6); };
    fen(110, 470, 50, 64); fen(170, 480, 44, 58); fen(130, 320, 46, 56); fen(105, 590, 52, 66);
    // guirlande
    const cols = ['#ff4a3a', '#4aff6a', '#ffd24a', '#5a8aff', '#ff5aff'];
    for (let i = 0; i < 9; i++) { const x = 58 + i * 22, y = 425 + Math.sin(i / 8 * Math.PI) * 18; c.fillStyle = cols[i % 5]; c.shadowColor = cols[i % 5]; c.shadowBlur = 18; c.beginPath(); c.arc(x, y, 7, 0, 7); c.fill(); }
    c.shadowBlur = 0;
    // neige
    for (let i = 0; i < 80; i++) { c.fillStyle = 'rgba(230,240,255,' + (0.4 + Math.random() * 0.5) + ')'; c.beginPath(); c.arc(Math.random() * W, Math.random() * W, 2 + Math.random() * 4, 0, 7); c.fill(); }
  });
  await p.screenshot({ path: path.join(__dirname, '../icons/apple-touch-icon.png'), clip: { x: 0, y: 0, width: 180, height: 180 } });
  await b.close();
})();
