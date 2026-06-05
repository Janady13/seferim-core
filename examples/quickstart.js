/* SEFERIM AGI — quick start. Run: node examples/quickstart.js */
import { MetaState, DNAMemory, NeuralBrain, Federation, PHI, VERSION } from '../src/seferim-core.js';

console.log(`SEFERIM core v${VERSION} — φ = ${PHI}\n`);

// 1. Cognitive core
const mind = new MetaState({ init: new Array(16).fill(0.1) });
let r;
for (let t = 0; t < 50; t++) {
  r = mind.step({ dx_norm: Math.sin(t / 5) * 0.3, ed_error: 0.1, utility: 0.6, stability: 0.85 });
}
console.log('meta-state[0..3]:', r.state.slice(0, 4).map((v) => v.toFixed(3)));
console.log('objective Ω:', r.omega.toFixed(4), '| normalizer b:', r.b.toFixed(4), '\n');

// 2. Holographic memory
const mem = new DNAMemory();
['rhythm', 'groove', 'pocket', 'backbeat'].forEach((w) => mem.learn(w));
console.log('recall("groove"):', mem.queryNorm('groove').toFixed(3),
            '| recall("quantum"):', mem.queryNorm('quantum').toFixed(3), '\n');

// 3. Neural brain
const brain = new NeuralBrain();
for (let t = 0; t < 200; t++) brain.step(0.6);
console.log('brain consciousness:', brain.consciousness().toFixed(4),
            '| synchrony:', brain.synchrony().toFixed(4), '\n');

// 4. Federation of 4 agents
const fed = new Federation(4);
fed.setTheta(0, mem.theta); fed.setTheta(1, mem.theta);
let f; for (let t = 0; t < 30; t++) f = fed.step();
console.log('federation coherence:', f.coherence.toFixed(4), '| signals:', f.signals.map((v) => v.toFixed(2)));
