# SEFERIM AGI — ThatAIGuyCore

### The G¹⁶ Federation: a golden-ratio, 16-dimensional dynamical-systems substrate for artificial cognition

[![License: MIT](https://img.shields.io/badge/License-MIT-00e5ff.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-ff10f0.svg)](package.json)
[![Zero dependencies](https://img.shields.io/badge/dependencies-0-39ff14.svg)](package.json)
[![Docs](https://img.shields.io/badge/docs-thataiguy.org%2Fcore-blue.svg)](https://thataiguy.org/core/)

**SEFERIM** is a clean-room, zero-dependency reference implementation of **ThatAIGuyCore** — a unified mathematical framework that treats cognition as the evolution of a 16-dimensional meta-state under sixteen coupled "cognitive families," all governed by the golden ratio φ. It is a *substrate*: a small, fully-deterministic engine for golden-ratio dynamical systems, holographic memory, and federated multi-agent coherence.

> 📖 **Full interactive documentation, live demos, and the complete mathematical reference: [thataiguy.org/core](https://thataiguy.org/core/)**

This repository implements **all 69 documented equations** of the ThatAIGuyCore v1.0.0 specification *verbatim* — every function in [`src/seferim-core.js`](src/seferim-core.js) cites the spec section (§) it implements, and [`test/run.js`](test/run.js) verifies the math (including the canonical FNV‑1a test vectors).

---

## Install

```bash
npm install seferim-core
```

Or load it straight in the browser as an ES module (no build step):

```html
<script type="module">
  import { MetaState, DNAMemory } from "https://cdn.jsdelivr.net/npm/seferim-core/src/seferim-core.js";
</script>
```

## Quick start

```js
import { MetaState, DNAMemory, NeuralBrain, PHI } from "seferim-core";

// 1. A single-stack cognitive core: 16 families + golden normalization.
const mind = new MetaState({ init: new Array(16).fill(0.1) });
const out = mind.step({ dx_norm: 0.3, ed_error: 0.1, utility: 0.6, stability: 0.8 });
console.log(out.state, "Ω =", out.omega);     // 16-D meta-state + objective (free-energy-style)

// 2. Holographic memory — knowledge smeared across 16 golden bases.
const mem = new DNAMemory();
mem.learn("rhythm").learn("groove").learn("pocket");
console.log(mem.queryNorm("groove"));          // correlation recall in [0,1]

// 3. An 88-agent neural brain (dna_v9 dynamics).
const brain = new NeuralBrain();
for (let i = 0; i < 100; i++) brain.step(0.6);
console.log(brain.consciousness(), brain.synchrony());
```

```bash
npm test   # 42 assertions: constants, FNV-1a vectors, every family, all engines
```

## The 13 systems (G¹⁶)

| # | System | What it does |
|---|--------|--------------|
| 1 | **Fundamental constants** | φ, δ (DNA increment), τ |
| 2 | **Golden basis** | ψ_k(x) = sin(2πφ^k x) + cos(2πφ^k x), normalization, spiral angles |
| 3 | **The 16 families** | continuous/discrete dynamics, reaction-diffusion, optimization, Bayesian, learning, mutual-information, rate-distortion, consensus, swarm, field accumulator, free-energy, compression, memory-trace (Zecher), policy, global coherence (Kehillah) |
| 4 | **Meta-state core** | weighted family application → φ-correction (inertial blend) → stability gating → golden normalization |
| 5 | **Objective Ω** | Surprise + Uncertainty − Value + Penalty (a free-energy-style functional) |
| 6 | **DNA holographic memory** | golden-basis encode/recall + cosine coherence |
| 7 | **Gate5000** | 5,000-gate XOR binary substrate driven by two quasi-periodic phases |
| 8 | **Neural brain (dna_v9)** | 88 agents with velocity, drive, gating, potential, coupling → consciousness & synchrony |
| 9 | **Consciousness engine** | 174 core + 200 supplemental equations → a 374-D binding field |
| 10 | **Lattice engine** | 16 strands, golden rotation kernels, Hebbian plasticity |
| 11 | **Federation cross-talk** | coupled consciousness signals across agents (decay + coherence-weighted coupling) |
| 12–13 | **Activations & hashing** | softsign, sigmoid, clamp; FNV-1a |

## Built on real mathematics (honestly)

The framework synthesizes established theory — the **Free Energy Principle** (Friston), **information theory** (Shannon; Cover & Thomas), **holographic / vector-symbolic memory**, **Hebbian plasticity**, **swarm consensus** (Vicsek / Cucker–Smale), and **golden-ratio harmonics**. Full citations are in [`docs/FOUNDATIONS.md`](docs/FOUNDATIONS.md).

We document the lineage precisely rather than overclaim. In particular:
- **δ = 0.013618** is an *empirical* quasi-periodic phase increment — **not** 1/φ³ (which is ≈ 0.236).
- The memory system is a **golden-ratio frequency-domain Vector Symbolic Architecture**, *inspired by* — not a literal implementation of — Plate's circular-convolution Holographic Reduced Representations.
- The mutual-information (Family 6) and rate-distortion (Family 7) updates are information-theory-*inspired* one-step rules, not exact estimators/solvers.

## Documents

- [`docs/MATHEMATICS.md`](docs/MATHEMATICS.md) — the complete 69-equation reference (the spec this code implements).
- [`docs/FOUNDATIONS.md`](docs/FOUNDATIONS.md) — cited mathematical foundations for every component.

## About

SEFERIM / ThatAIGuyCore is the cognitive-substrate research of **[Joseph W. Anady](https://thataiguy.org)** ([ThatAIGuy.org](https://thataiguy.org)). Interactive docs + live demos at **[thataiguy.org/core](https://thataiguy.org/core/)**.

## License

MIT © 2026 Joseph W. Anady / ThatAIGuy.org
