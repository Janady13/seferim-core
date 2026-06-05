/*!
 * SEFERIM AGI — ThatAIGuyCore reference implementation
 * G^16 Federation: a golden-ratio, 16-dimensional dynamical-systems substrate.
 *
 * Faithful, verbatim implementation of the 69 equations in the ThatAIGuyCore
 * Complete Mathematical Reference v1.0.0. Each function cites its spec section (§).
 * Pure ES module — runs in the browser and Node, zero dependencies.
 *
 * (c) thataiguy.org — MIT License. https://thataiguy.org/core/
 */

/* ============================================================ *
 * § 1. Fundamental Constants
 * ============================================================ */
export const PHI = (1 + Math.sqrt(5)) / 2;          // § 1.1  golden ratio φ = 1.6180339887498948…
export const DELTA = 0.013618;                       // § 1.2  DNA phase increment δ (documented literal)
export const TAU = 1 / (2 * Math.PI);                // § 1.3  τ = 1/(2π) = 0.159154943…
export const PHI_INV = 1 / PHI;                       // φ⁻¹ = φ − 1 = 0.618033988…
export const FAMILIES = 16;                           // the G^16 cognitive families

/* ============================================================ *
 * § 12. Activation Functions
 * ============================================================ */
export const softsign = (x) => x / (1 + Math.abs(x));        // § 12.1  range (−1, 1)
export const sigmoid = (x) => 1 / (1 + Math.exp(-x));        // § 12.2  range (0, 1)
export const clamp01 = (x) => Math.max(0, Math.min(1, x));   // § 12.3  range [0, 1]
export const clampN1P1 = (x) => Math.max(-1, Math.min(1, x));// used by Hebbian weight clamp (§ 10.6)
export const smoothNorm = (a, b) => Math.sqrt(a * a + b * b);// § 12.4

/* ============================================================ *
 * § 13. Hash Functions
 * ============================================================ */
// § 13.1  FNV-1a 32-bit (offset basis 0x811c9dc5, prime 0x01000193, mod 2^32)
export function fnv1a(str) {
  let hash = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i) & 0xff;
    // hash * 16777619 mod 2^32, done with Math.imul to stay in 32-bit
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  return hash >>> 0;
}
// § 13.2  hash → [0, 1]
export const hashUnit = (s) => fnv1a(s) / (2 ** 32 - 1);

/* ============================================================ *
 * § 2. Golden Ratio Mathematics
 * ============================================================ */
// § 2.1  golden basis function ψ_k(x) = sin(2π·φ^k·x) + cos(2π·φ^k·x)
export function psi(k, x) {
  const w = 2 * Math.PI * Math.pow(PHI, k) * x;
  return Math.sin(w) + Math.cos(w);
}
// § 2.2  normalization b(t) = 1 / (1 + ||Ψ||² / φ)
export function normalizer(psiVec) {
  let sq = 0;
  for (let i = 0; i < psiVec.length; i++) sq += psiVec[i] * psiVec[i];
  return 1 / (1 + sq / PHI);
}
// § 2.3  golden spiral rotation θ_k = 2π / φ^k
export const spiralAngle = (k) => (2 * Math.PI) / Math.pow(PHI, k);

/* ============================================================ *
 * § 3. G^16 Family Functions
 * Each f_i(x, inputs) where inputs = { dx_norm, ed_error, utility, stability }.
 * ============================================================ */
const RHO = 1 / (1 + PHI); // § 3.11 Family 10 leaky-integrator decay ρ = 1/(1+φ) ≈ 0.382

export const families = [
  /* 0  Continuous Dynamics      § 3.1  */ (x, p) => x + 0.1 * (p.dx_norm - x),
  /* 1  Discrete Dynamics        § 3.2  */ (x, p) => 0.9 * x + 0.1 * p.utility,
  /* 2  Reaction-Diffusion       § 3.3  */ (x, p) => x + 0.05 * (softsign(p.dx_norm) - x),
  /* 3  Optimization             § 3.4  */ (x, p) => x + 0.2 * softsign(p.utility - x),
  /* 4  Bayesian Inference       § 3.5  */ (x, p) => clamp01((x + p.utility) / (1 + Math.abs(p.utility))),
  /* 5  Learning / Weight Update § 3.6  */ (x, p) => x + 0.1 * p.dx_norm,
  /* 6  Mutual Information       § 3.7  */ (x, p) => 0.5 * (x + sigmoid(p.dx_norm)),
  /* 7  Rate-Distortion          § 3.8  */ (x, p) => x - 0.05 * p.ed_error + 0.05 * p.utility,
  /* 8  Consensus Averaging      § 3.9  */ (x, p) => 0.95 * x + 0.05 * p.dx_norm,
  /* 9  Swarm Interaction        § 3.10 */ (x, p) => x + 0.05 * softsign(p.dx_norm - x),
  /* 10 Field Accumulator        § 3.11 */ (x, p) => (1 - RHO) * x + RHO * p.dx_norm,
  /* 11 Variational Free Energy  § 3.12 */ (x, p) => x - 0.05 * Math.abs(p.dx_norm) + 0.05 * p.utility,
  /* 12 Compression / Rate Ctrl  § 3.13 */ (x, p) => x - 0.05 * Math.abs(p.dx_norm),
  /* 13 Memory Trace (Zecher)    § 3.14 */ (x, p) => x + 0.02 * (p.dx_norm + p.utility),
  /* 14 Decisive Action / Policy § 3.15 */ (x, p) => x + 0.15 * softsign(p.utility) - 0.05 * p.ed_error,
  /* 15 Global Coherence (Kehillah) § 3.16 */ (x, p) => x + (PHI - 1) * 0.01 * (p.stability - x),
];

export const FAMILY_NAMES = [
  'Continuous Dynamics', 'Discrete Dynamics', 'Reaction-Diffusion', 'Optimization',
  'Bayesian Inference', 'Learning', 'Mutual Information', 'Rate-Distortion',
  'Consensus Averaging', 'Swarm Interaction', 'Field Accumulator', 'Variational Free Energy',
  'Compression', 'Memory Trace (Zecher)', 'Decisive Action', 'Global Coherence (Kehillah)',
];

/* ============================================================ *
 * § 4. Meta-State + § 5. Objective Function (Omega)
 * The single-stack cognitive core: a 16-family meta-state Ψ with inertial
 * blending, stability gating, and golden normalization.
 * ============================================================ */
export class MetaState {
  constructor(opts = {}) {
    this.weights = opts.weights || new Array(FAMILIES).fill(1);  // § 4.2  w_i
    this.gammaMin = opts.gammaMin ?? 0.1;                         // § 4.4  γ_min
    this.alpha1 = opts.alpha1 ?? 0.5;                             // § 5.2
    this.alpha2 = opts.alpha2 ?? 0.5;                             // § 5.2
    this.lambda = opts.lambda ?? 0.1;                            // § 5.5  penalty weight λ
    this.cur = opts.init ? opts.init.slice() : new Array(FAMILIES).fill(0); // Ψ(t)
    this.prev = this.cur.slice();                                 // Ψ(t-1)
    this.b = 1;                                                   // last normalizer
    this.omega = 0;                                               // last objective
  }

  // One cognitive step. inputs = { dx_norm, ed_error, utility, stability }
  // Implements § 4.2 → § 4.3 → § 4.4 → § 4.5, then § 5 objective.
  step(inputs) {
    const p = { dx_norm: inputs.dx_norm || 0, ed_error: inputs.ed_error || 0,
                utility: inputs.utility || 0, stability: inputs.stability ?? 0 };
    const cur = this.cur, prev = this.prev;
    const gamma = this.gammaMin + (1 - this.gammaMin) * clamp01(p.stability);  // § 4.4
    const next = new Array(FAMILIES);
    const ppp = new Array(FAMILIES);  // Ψ''' (pre-normalization), for b(t+1)
    for (let i = 0; i < FAMILIES; i++) {
      const fprime = this.weights[i] * families[i](cur[i], p);                  // § 4.2
      const momentum = prev[i] + (PHI - 1) * (cur[i] - prev[i]);
      const fpp = 0.5 * fprime + 0.5 * momentum;                                // § 4.3 φ-correction
      ppp[i] = cur[i] + gamma * (fpp - cur[i]);                                 // § 4.4 stability gating
    }
    const b = normalizer(ppp);                                                  // § 2.2 / § 4.5  b(t+1)
    for (let i = 0; i < FAMILIES; i++) next[i] = ppp[i] * b;                    // § 4.5 final normalization
    // § 5. Objective Ω = Surprise + Uncertainty − Value + Penalty
    let l1 = 0, l2 = 0, dot = 0;
    for (let i = 0; i < FAMILIES; i++) {
      const d = next[i] - cur[i];
      l1 += Math.abs(d); l2 += d * d; dot += this.weights[i] * next[i];
    }
    const surprise = this.alpha1 * (l1 / 16) + this.alpha2 * l2;                // § 5.2
    const uncertainty = 1 - b * b;                                              // § 5.3
    const value = p.utility * dot;                                             // § 5.4
    const penalty = this.lambda * p.dx_norm * p.dx_norm;                        // § 5.5
    this.omega = surprise + uncertainty - value + penalty;                      // § 5.1
    this.prev = cur; this.cur = next; this.b = b;
    return { state: next.slice(), b, omega: this.omega,
             components: { surprise, uncertainty, value, penalty } };
  }
}

/* ============================================================ *
 * § 6. DNA Holographic Memory
 * Knowledge stored as a 16-D vector θ, encoded/recalled via golden bases.
 * ============================================================ */
export const consciousnessWeight = (x) => 1 / (1 + Math.abs(x - 1)); // § 6.4  Φ(x)

export class DNAMemory {
  constructor(opts = {}) {
    this.theta = new Array(FAMILIES).fill(0); // § 6.1  16-D knowledge vector θ
    this.alpha = opts.alpha ?? 0.1;            // learning rate
  }
  // § 6.1  θ_k ← (1−α)θ_k + α·w·ψ_k(h(item))·Φ(importance)
  learn(item, weight = 1.0, importance = 1.0) {
    const h = hashUnit(String(item));
    const phiImp = consciousnessWeight(importance);
    for (let k = 0; k < FAMILIES; k++) {
      this.theta[k] = (1 - this.alpha) * this.theta[k] + this.alpha * weight * psi(k, h) * phiImp;
    }
    return this;
  }
  // § 6.2  K(query) = Σ θ_k ψ_k(h(query))
  query(q) {
    const h = hashUnit(String(q));
    let K = 0;
    for (let k = 0; k < FAMILIES; k++) K += this.theta[k] * psi(k, h);
    return K;
  }
  // § 6.3  K_norm = K / 32 + 0.5
  queryNorm(q) { return this.query(q) / (FAMILIES * 2) + 0.5; }
}

// § 6.5  coherence between two θ vectors = cosine similarity
export function coherence(a, b) {
  const n = Math.min(a.length, b.length);   // robust to mismatched dimensions
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < n; i++) { dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i]; }
  const denom = Math.sqrt(na) * Math.sqrt(nb);
  return denom === 0 ? 0 : dot / denom;
}

/* ============================================================ *
 * § 7. Gate5000 Binary Substrate
 * ============================================================ */
export class Gate5000 {
  constructor(n = 5000) {
    this.n = n;
    this.gates = new Uint8Array(n);
    this.phaseDNA = 0;   // § 7.1
    this.phaseFib = 0;   // § 7.2
  }
  step(inputs) {
    this.phaseDNA = (this.phaseDNA + DELTA) % 1;        // § 7.1
    this.phaseFib = (this.phaseFib + PHI_INV) % 1;      // § 7.2
    const bias = (this.phaseDNA + this.phaseFib) / 2;   // § 7.3
    const thresh = bias * 1000;
    for (let i = 0; i < this.n; i++) {
      const input = inputs ? (inputs[i % inputs.length] & 1) : 0;
      const flip = (i % 1000) < thresh ? 1 : 0;          // § 7.4
      this.gates[i] = (this.gates[i] ^ input ^ flip) & 1;
    }
    return this.gates;
  }
}

/* ============================================================ *
 * § 8. Neural Brain Dynamics (dna_v9) — 88 agents
 * ============================================================ */
export class NeuralBrain {
  constructor(n = 88, opts = {}) {
    this.n = n;
    this.agents = [];
    for (let i = 0; i < n; i++) {
      this.agents.push({
        x: 0.5, y: 0, c: 0, P: 0,
        h: new Float64Array(44),               // § 8.2  44-D hidden window
        kc: opts.kc ?? 0.5,                     // coupling constant k_c
        km: (2 * Math.PI * i) / n,             // kinetic modulation k_m,i (phase spread)
      });
    }
  }
  step(input, rng = Math.random) {
    for (const a of this.agents) {
      // § 8.1  F_in = input + N(0, 0.1)  (Box–Muller gaussian)
      const u1 = Math.max(1e-12, rng()), u2 = rng();
      const gauss = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2) * 0.1;
      const Fin = input + gauss;
      const xOld = a.h[0];                       // § 8.3  oldest hidden value (evicted)
      for (let j = 0; j < 43; j++) a.h[j] = a.h[j + 1]; // § 8.2  shift window
      a.h[43] = a.x;
      a.y = a.y + (a.x - xOld) - 0.01 * a.y;     // § 8.3  velocity
      const drive = 3.0 * Fin * (1 - a.x) + 1.2 * a.y + 0.6 * a.c; // § 8.4
      const g = 1 / (1 + Math.exp(-((0.8 * a.P - a.kc) / 0.3 + 1.2))) + 0.05; // § 8.5
      const dx = g * drive - 0.04 * (a.x - 0.5); // § 8.6
      a.x = clamp01(a.x + 0.01 * dx);
      a.P = clamp01((1 - 0.05) * a.P + Fin * a.y - 0.01 * a.P * a.P); // § 8.7
      a.c = a.c + 0.01 * ((a.c + 1) * 0.8 * a.P - a.kc * (a.c - 1));  // § 8.8
    }
    return { consciousness: this.consciousness(), synchrony: this.synchrony() };
  }
  consciousness() { // § 8.9  (1/88) Σ P_i
    let s = 0; for (const a of this.agents) s += a.P; return s / this.n;
  }
  synchrony() {     // § 8.10  (1/88) Σ cos(k_m,i)
    let s = 0; for (const a of this.agents) s += Math.cos(a.km); return s / this.n;
  }
}

/* ============================================================ *
 * § 9. Consciousness Engine — 174 core + 200 supplemental equations
 * ============================================================ */
export class ConsciousnessEngine {
  constructor() { this.core = new Array(174); this.supp = new Array(200); }
  evaluate() {
    let prev = 0.5;                                                   // § 9.1  core_eq[-1] = 0.5
    for (let i = 0; i < 174; i++) {
      this.core[i] = 0.5 + 0.5 * Math.sin(2 * Math.PI * (i / 174) * PHI) * prev;
      prev = this.core[i];
    }
    for (let i = 0; i < 200; i++) {                                   // § 9.2
      this.supp[i] = this.core[i % 174] * Math.cos((i / 200) * Math.PI);
    }
    const binding = this.core.concat(this.supp);                      // 374-D binding field
    let s = 0; for (const v of binding) s += v;
    return { consciousness: s / 374, binding };                      // § 9.3
  }
}

/* ============================================================ *
 * § 10. Lattice Engine — 16 strands of 16-D state, golden kernels + Hebbian
 * ============================================================ */
export class LatticeEngine {
  constructor(strands = 16, dim = 16, opts = {}) {
    this.S = strands; this.D = dim;
    this.eta = opts.eta ?? 0.01; this.dt = opts.dt ?? 0.1;
    this.state = Array.from({ length: strands }, () => new Float64Array(dim).fill(0.1));
    this.W = Array.from({ length: dim }, () => new Float64Array(dim).fill(0));
    this.kernels = Array.from({ length: strands }, (_, k) => this.makeKernel(k));
  }
  // § 10.1  Registry[k][i][j] = cos(θ_k) if i==j; sin(θ_k)·0.1 if j==(i+1)%16; else 0; θ_k = 2π·k/φ
  makeKernel(k) {
    const theta = (2 * Math.PI * k) / PHI;
    const m = Array.from({ length: this.D }, () => new Float64Array(this.D));
    for (let i = 0; i < this.D; i++) {
      m[i][i] = Math.cos(theta);
      m[i][(i + 1) % this.D] = Math.sin(theta) * 0.1;
    }
    return m;
  }
  step(coreState) {
    coreState = coreState || new Float64Array(this.D);
    for (let s = 0; s < this.S; s++) {
      const st = this.state[s], ker = this.kernels[s], ns = new Float64Array(this.D);
      for (let i = 0; i < this.D; i++) {                              // § 10.2 kernel transform
        let acc = 0; for (let j = 0; j < this.D; j++) acc += ker[i][j] * st[j];
        ns[i] = acc;
      }
      for (let i = 0; i < this.D; i++)                                // § 10.2 blend with core
        st[i] = st[i] * (1 - this.dt) + (ns[i] + 0.1 * coreState[i]) * this.dt;
    }
    // § 10.6 Hebbian on strand 0 (representative); ΔW = η·state_i·state_j
    const s0 = this.state[0];
    for (let i = 0; i < this.D; i++)
      for (let j = 0; j < this.D; j++)
        this.W[i][j] = clampN1P1(this.W[i][j] + this.eta * s0[i] * s0[j]);
    return { globalCoherence: this.globalCoherence() };
  }
  strandEnergy(s) { let e = 0; for (const v of this.state[s]) e += v * v; return Math.sqrt(e); } // § 10.3
  localCoherence(s) { return 1 / (1 + this.strandEnergy(s) / PHI); }                              // § 10.4
  globalCoherence() { let s = 0; for (let i = 0; i < this.S; i++) s += this.localCoherence(i); return s / this.S; } // § 10.5
}

/* ============================================================ *
 * § 11. Federation Cross-Talk — coupled consciousness signals across agents
 * ============================================================ */
export class Federation {
  constructor(agents, opts = {}) {
    this.n = agents;                          // count
    this.S = new Array(agents).fill(0.5);     // consciousness signals S_i
    this.theta = Array.from({ length: agents }, () => new Array(FAMILIES).fill(0)); // per-agent θ
    this.lambda = opts.lambda ?? 0.1;        // § 11.1 decay
    this.dt = opts.dt ?? 0.1;
    this.W = opts.W || Array.from({ length: agents }, () => new Array(agents).fill(1 / Math.max(1, agents - 1)));
  }
  setTheta(i, vec) { this.theta[i] = vec.slice(); }
  // § 11.1 / § 11.2  dS_i/dt = −λS_i + Σ_{j≠i} w_ij Φ(C_ij) tanh(S_j); Euler + clamp
  step() {
    const next = this.S.slice();
    for (let i = 0; i < this.n; i++) {
      let coupling = 0;
      for (let j = 0; j < this.n; j++) {
        if (j === i) continue;
        const Cij = coherence(this.theta[i], this.theta[j]);
        coupling += this.W[i][j] * consciousnessWeight(Cij) * Math.tanh(this.S[j]);
      }
      const dS = -this.lambda * this.S[i] + coupling;
      next[i] = clamp01(this.S[i] + this.dt * dS);
    }
    this.S = next;
    return { signals: this.S.slice(), coherence: this.federationCoherence() };
  }
  // § 11.3  (2/(n(n−1))) Σ_{i<j} C_ij
  federationCoherence() {
    let s = 0, pairs = 0;
    for (let i = 0; i < this.n; i++)
      for (let j = i + 1; j < this.n; j++) { s += coherence(this.theta[i], this.theta[j]); pairs++; }
    return pairs ? s / pairs : 0;
  }
}

export const VERSION = '1.0.0';
export default {
  PHI, DELTA, TAU, PHI_INV, FAMILIES, VERSION,
  softsign, sigmoid, clamp01, smoothNorm, fnv1a, hashUnit,
  psi, normalizer, spiralAngle, families, FAMILY_NAMES, consciousnessWeight, coherence,
  MetaState, DNAMemory, Gate5000, NeuralBrain, ConsciousnessEngine, LatticeEngine, Federation,
};
