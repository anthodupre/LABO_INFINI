# Planches-contact des captures de tools/visite.js : python3 _dev/noelombre/tools/planche.py [suffixe]
import glob, os, sys
from PIL import Image, ImageDraw
d = os.path.join(os.path.dirname(__file__), '../preview/visite'); suf = sys.argv[1] if len(sys.argv) > 1 else ''
fs = sorted(f for f in glob.glob(os.path.join(d, '*.png')) if not os.path.basename(f).startswith('planche') and (f.endswith('_' + suf + '.png') if suf else '_' not in os.path.basename(f)[-6:]))
cols, w, h = 6, 210, 320
for n in range(0, len(fs), 12):
    lot = fs[n:n + 12]; W = Image.new('RGB', (cols * w, ((len(lot) + cols - 1) // cols) * (h + 16)), 'black'); dr = ImageDraw.Draw(W)
    for i, f in enumerate(lot):
        im = Image.open(f).convert('RGB').resize((w, h)); x, y = (i % cols) * w, (i // cols) * (h + 16); W.paste(im, (x, y)); dr.text((x + 3, y + h + 2), os.path.basename(f)[:-4], fill='white')
    o = os.path.join(d, 'planche%s_%d.png' % (suf, n // 12)); W.save(o); print(o)
