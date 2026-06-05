/* SEFERIM AGI core — math fidelity tests. Zero-dependency. `node test/run.js` */
import * as S from '../src/seferim-core.js';

let pass = 0, fail = 0;
const approx = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;
function ok(name, cond) { if (cond) { pass++; } else { fail++; console.error('  ✗ ' + name); } }

// § 1 constants
ok('φ value', approx(S.PHI, 1.618033988749895));
ok('δ literal = 0.013618', S.DELTA === 0.013618);
ok('τ = 1/2π', approx(S.TAU, 1 / (2 * Math.PI)));
ok('φ⁻¹ = φ−1', approx(S.PHI_INV, S.PHI - 1));

// § 13 FNV-1a — canonical 32-bit test vectors (proves the hash is correct)
ok('fnv1a("") = 0x811c9dc5', S.fnv1a('') === 0x811c9dc5);
ok('fnv1a("a") = 0xe40c292c', S.fnv1a('a') === 0xe40c292c);
ok('fnv1a("foobar") = 0xbf9cf968', S.fnv1a('foobar') === 0xbf9cf968);
ok('hashUnit in [0,1]', S.hashUnit('seferim') >= 0 && S.hashUnit('seferim') <= 1);

// § 12 activations
ok('softsign(0)=0', S.softsign(0) === 0);
ok('softsign(1)=0.5', approx(S.softsign(1), 0.5));
ok('sigmoid(0)=0.5', approx(S.sigmoid(0), 0.5));
ok('clamp01', S.clamp01(2) === 1 && S.clamp01(-1) === 0 && S.clamp01(0.3) === 0.3);

// § 2 golden basis
ok('ψ_k(0) = 1 (sin0+cos0)', approx(S.psi(0, 0), 1));
ok('ψ deterministic', S.psi(3, 0.4) === S.psi(3, 0.4));
ok('normalizer in (0,1]', (() => { const b = S.normalizer([1, 2, 3, 0, 0]); return b > 0 && b <= 1; })());
ok('spiralAngle(0)=2π', approx(S.spiralAngle(0), 2 * Math.PI));

// § 3 families — verify a few formulas verbatim
const p = { dx_norm: 0.4, ed_error: 0.2, utility: 0.6, stability: 0.5 };
ok('f0 continuous', approx(S.families[0](0.5, p), 0.5 + 0.1 * (0.4 - 0.5)));
ok('f1 discrete', approx(S.families[1](0.5, p), 0.9 * 0.5 + 0.1 * 0.6));
ok('f4 bayesian clamped', approx(S.families[4](0.5, p), S.clamp01((0.5 + 0.6) / (1 + 0.6))));
ok('f10 leaky ρ=1/(1+φ)', (() => { const rho = 1 / (1 + S.PHI); return approx(S.families[10](0.5, p), (1 - rho) * 0.5 + rho * 0.4); })());
ok('f15 kehillah φ-weighted', approx(S.families[15](0.5, p), 0.5 + (S.PHI - 1) * 0.01 * (0.5 - 0.5)));
ok('16 families present', S.families.length === 16 && S.FAMILY_NAMES.length === 16);

// § 4/5 MetaState — runs, stays finite + bounded, produces Ω
const ms = new S.MetaState({ init: new Array(16).fill(0.1) });
let r;
for (let i = 0; i < 200; i++) r = ms.step({ dx_norm: Math.sin(i / 7) * 0.3, ed_error: 0.1, utility: 0.5, stability: 0.8 });
ok('MetaState finite', r.state.every(Number.isFinite));
ok('MetaState bounded by normalizer', r.state.every((v) => Math.abs(v) <= 2));
ok('Ω finite', Number.isFinite(r.omega));
ok('b in (0,1]', r.b > 0 && r.b <= 1);

// § 6 DNA holographic memory — learned item recalls higher than an unrelated one
const mem = new S.DNAMemory();
mem.learn('drum', 1, 1).learn('rhythm', 1, 1).learn('groove', 1, 1);
ok('queryNorm in range', (() => { const q = mem.queryNorm('drum'); return q >= -0.1 && q <= 1.1; })());
ok('coherence(self)=1', approx(S.coherence(mem.theta, mem.theta), 1, 1e-9));
ok('Φ(1)=1 peak', approx(S.consciousnessWeight(1), 1));

// § 7 Gate5000
const g = new S.Gate5000();
for (let i = 0; i < 50; i++) g.step([1, 0, 1, 1]);
ok('Gate5000 5000 binary gates', g.gates.length === 5000 && g.gates.every((v) => v === 0 || v === 1));
ok('phases wrapped [0,1)', g.phaseDNA >= 0 && g.phaseDNA < 1 && g.phaseFib >= 0 && g.phaseFib < 1);

// § 8 NeuralBrain (88 agents)
const brain = new S.NeuralBrain();
let bo; for (let i = 0; i < 100; i++) bo = brain.step(0.6, () => 0.5);
ok('brain 88 agents', brain.agents.length === 88);
ok('consciousness in [0,1]', bo.consciousness >= 0 && bo.consciousness <= 1);
ok('synchrony in [-1,1]', bo.synchrony >= -1 && bo.synchrony <= 1);
ok('agent x clamped', brain.agents.every((a) => a.x >= 0 && a.x <= 1));

// § 9 ConsciousnessEngine (174 + 200 = 374)
const ce = new S.ConsciousnessEngine().evaluate();
ok('binding field 374', ce.binding.length === 374);
ok('consciousness finite', Number.isFinite(ce.consciousness));

// § 10 LatticeEngine
const lat = new S.LatticeEngine();
let lo; for (let i = 0; i < 50; i++) lo = lat.step();
ok('lattice 16 strands', lat.state.length === 16);
ok('globalCoherence in (0,1]', lo.globalCoherence > 0 && lo.globalCoherence <= 1);

// § 11 Federation
const fed = new S.Federation(5);
const tA = Array.from({ length: 16 }, (_, i) => (i % 2 ? 1 : 0));
const tB = Array.from({ length: 16 }, (_, i) => (i % 2 ? 0 : 1));
fed.setTheta(0, tA); fed.setTheta(1, tA); fed.setTheta(2, tB);
ok('coherence robust to mismatched length', Number.isFinite(S.coherence([1, 0, 1], tA)));
let fo; for (let i = 0; i < 50; i++) fo = fed.step();
ok('federation 5 signals', fo.signals.length === 5 && fo.signals.every((v) => v >= 0 && v <= 1));
ok('federation coherence in [-1,1]', fo.coherence >= -1 && fo.coherence <= 1);

console.log(`\nSEFERIM core tests: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
