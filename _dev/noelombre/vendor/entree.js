// Entrée du paquet Three.js intégré au jeu (assemblé par tools/vendor.js en un script classique, global THREE).
import * as T from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
const X = Object.assign({}, T, { mergeGeometries, EffectComposer, RenderPass, UnrealBloomPass, OutputPass });
self.THREE = X;
