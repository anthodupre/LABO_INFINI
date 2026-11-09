#!/usr/bin/env node
// Construit Noëlombre et le publie à la racine du dépôt (index.html). Usage : node _dev/noelombre/tools/build.js
'use strict';
const { execFileSync } = require('child_process'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, '../../..'), proj = path.join(__dirname, '..');
execFileSync('node', [path.join(root, '.claude/skills/jeux-web-github/scripts/build.js'), proj, '--title', 'Noëlombre', '--theme', '#05060d'], { stdio: 'inherit' });
fs.copyFileSync(path.join(proj, 'dist/noelombre.html'), path.join(root, 'index.html'));
console.log('-> index.html mis à jour');
