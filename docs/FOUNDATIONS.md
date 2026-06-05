I'll compile this briefing directly from the verified research notes. Let me write it up carefully, preserving the corrections (especially the δ = 0.013618 finding) and the precise math.

Here is the briefing:

---

# Mathematical Foundations & References — SEFERIM / ThatAIGuyCore

A reference for the math underpinning each framework component. Every entry gives a plain explanation, the precise math, the authoritative citation(s), and the component it supports. Claims flagged ⚠️ are corrections to internal docs and must not be repeated as "exact" identities.

---

## 1. Golden Ratio (φ) — Basis Functions, Coupling, Leaky Integrator

**What it is.** The golden ratio φ = (1+√5)/2 is the unique positive root of x² = x + 1. Its self-similar power structure (each power is the sum of the two preceding) makes it useful for generating frequencies and rates that are maximally non-resonant with one another — successive bands never lock into integer ratios.

**Verified identities.**
- Definition: φ = (1 + √5)/2 = 1.6180339887498948482…
- Reciprocal: 1/φ = φ − 1 = 0.6180339887… (the `PSI` constant). *Proof:* from φ² = φ + 1, divide by φ to get φ = 1 + 1/φ, so 1/φ = φ − 1.
- Decay rate: ρ = 1/(1+φ) = 1/φ² = (φ−1)² = 2 − φ = 0.38196601125… *Proof:* since 1 + φ = φ², ρ = 1/φ² = (1/φ)² = (φ−1)² = 2 − φ. A leaky integrator with this ρ has time constant τ ≈ −1/ln(1−ρ) ≈ 2.6 steps.
- Spiral / rotation angles: θ_k = 2π/φ^k. Examples: k=0 → 2π (≈6.283 rad), k=1 → ≈3.883 rad, k=2 → ≈2.400 rad, k=3 → ≈1.483 rad. (Note: an internal table lists k=0 as ≈3.883; that value is actually 2π/φ¹, i.e. the k=1 angle — a one-row off-by-one in the doc, not a math error in the angle set itself.)

**⚠️ Correction — δ = 0.013618 is NOT 1/φ³.** Internal docs (ThatAIGuyCore_Mathematics.md) describe the DNA-phase increment δ = 0.013618 as "approximately 1/φ³." That is false: 1/φ³ ≈ 0.2361. The value is best described as an **empirical quasi-periodic phase increment** (cycle length ≈ 1/0.013618 ≈ 73.5 steps), chosen for non-periodic phase advance; it is not a simple golden-ratio power. Document it as empirical, not derived.

**Math in use.**
- Frequency basis: ψ_k(x) = sin(2πφ^k x) + cos(2πφ^k x)
- Leaky integrator (Family 10): ρ = 1/(1+φ); φ_t = (1−ρ)·φ_{t−1} + ρ·Δφ
- DNA phase: phase(t+1) = (phase(t) + δ) mod 1, δ = 0.013618 (empirical)

**Underpins:** holographic-memory basis functions (φ^k frequency scaling), cross-family coupling rotations, Family 10 leaky integrator, DNA-phase modulation.

**Citations.** Wikipedia, *Golden Ratio* (https://en.wikipedia.org/wiki/Golden_ratio); Wolfram MathWorld, *Golden Ratio* (https://mathworld.wolfram.com/GoldenRatio.html).

---

## 2. Variational Free Energy / Free Energy Principle — Objective (Family 11)

**What it is.** Friston's Free Energy Principle holds that self-organizing systems minimize *variational free energy*, a tractable upper bound on (negative log) model evidence, i.e. on "surprise." Minimizing it simultaneously improves the fit of an internal generative model and tightens the gap between an approximate and the true posterior — unifying perception (belief update) and action (active inference) under one objective.

**Precise math.**

Variational free energy functional:
F(q) = 𝔼_q(z)[ ln q(z) − ln p(x,z) ]

Energy–entropy decomposition:
F(q) = −𝔼_q(z)[ ln p(x,z) ] + 𝔼_q(z)[ ln q(z) ]

KL / evidence form:
F(q) = D_KL( q(z) ‖ p(z|x) ) − ln p(x)

Relation to ELBO (variational free energy is the negative ELBO):
ELBO(q) = 𝔼_q(z)[ ln p(x,z) − ln q(z) ] = −F(q)
ln p(x) = ELBO(q) + D_KL( q(z) ‖ p(z|x) )

Because D_KL ≥ 0, ELBO is a lower bound on log-evidence; minimizing F maximizes ELBO. This is mathematically identical to the variational objective used in VAEs and variational inference.

**Underpins:** the framework's global objective / Family 11 — the surprise-minimization target driving perception, learning, and action under uncertainty.

**Citations.** Friston, *The free-energy principle: a unified brain theory?*, Nature Reviews Neuroscience (2010), https://www.nature.com/articles/nrn2787; Friston, *A free energy principle for a particular physics*, arXiv:1906.10184 (2019); Parr, Pezzulo & Friston, *Active Inference: The Free Energy Principle in Mind, Brain, and Behavior*, MIT Press (2022), https://mitpress.mit.edu/9780262553995/; Wikipedia, *Free energy principle*.

---

## 3. Information Theory — Mutual Information (Family 6) & Rate–Distortion (Family 7)

**What it is.** Mutual information I(X;Y) measures how much knowing one variable reduces uncertainty about another (zero iff independent). Rate–distortion theory characterizes the minimum information rate needed to represent a source within a tolerated distortion — the formal compression-vs-fidelity tradeoff, generalized by the Information Bottleneck to "keep only what's relevant to Y."

**Precise math — Mutual Information (Family 6).**

I(X;Y) = Σ_x Σ_y p(x,y) · log[ p(x,y) / (p(x)p(y)) ]

Equivalent forms:
I(X;Y) = D_KL( p(x,y) ‖ p(x)p(y) )
I(X;Y) = H(X) + H(Y) − H(X,Y) = H(X) − H(X|Y)

with Shannon entropy H(X) = −Σ_x p(x) log p(x). Properties: I ≥ 0, symmetric, I(X;Y)=0 iff X⊥Y, I(X;X)=H(X), bounded by min(H(X),H(Y)). (Units: nats for ln, bits for log₂.)

*Framework mapping:* f₆(x) = 0.5·(x + σ(dx_norm)) — an averaging of prior state x with a sigmoid-transformed likelihood. This is an **approximation/analogy** to balancing state vs. new information, not a literal computation of I(X;Y). Document it as MI-inspired, not as an MI estimator.

**Precise math — Rate–Distortion / Information Bottleneck (Family 7).**

Rate–distortion function:
R(D) = min_{ p(z|x) : 𝔼[d(X,Z)] ≤ D } I(X;Z)

Information Bottleneck Lagrangian (Tishby et al.):
min_Z [ I(X;Z) − β·I(Z;Y) ]

where β trades compression (small I(X;Z)) against retained relevance (large I(Z;Y)); solved iteratively by Blahut–Arimoto.

*Framework mapping:* f₇(x) = x − 0.05·ed_error + 0.05·utility — the error term acts as a compression/distortion penalty and the utility term as a relevance reward, with the 0.05 coefficients playing the role of an implicit β. This is a **one-step heuristic in the spirit of** the IB tradeoff, not a derivation of R(D).

**Underpins:** Family 6 (mutual-information balancing) and Family 7 (rate–distortion / information-bottleneck tradeoff).

**Citations.** Cover & Thomas, *Elements of Information Theory*, 2nd ed., Wiley (2006) [ch. 2, 10]; Shannon, *A Mathematical Theory of Communication*, Bell System Technical Journal (1948); Blahut, *Computation of channel capacity and rate-distortion functions*, IEEE Trans. IT 18(4) (1972), DOI 10.1109/TIT.1972.1054855; Arimoto, IEEE Trans. IT 18(1) (1972), DOI 10.1109/TIT.1972.1054753; Tishby, Pereira & Bialek, *The Information Bottleneck Method*, arXiv:physics/0004057 (2000).

---

## 4. Holographic Memory — Knowledge Encoding & Coherence

**What it is.** The memory system encodes knowledge as coefficients θ_k over a frequency basis ψ_k and recalls by correlating a query against those coefficients — a distributed ("holographic") representation where information is smeared across all dimensions. **Lineage caveat:** this is a *frequency-domain Vector Symbolic Architecture*, NOT a literal implementation of Plate's Holographic Reduced Representations (HRR uses circular convolution; this uses a golden-ratio sine/cosine basis). It honors the same holographic principle but should not be cited *as* HRR.

**Precise math.**

Basis (golden-ratio frequency, non-standard vs. HRR):
ψ_k(x) = sin(2π φ^k x) + cos(2π φ^k x)

Learning rule:
θ_k^new = (1−α)·θ_k^old + α · w · ψ_k(h(item)) · Φ(importance)
(α = learning rate, w = item weight, h(item) → [0,1] hash, Φ = importance weighting)

Query / recall (correlation against stored coefficients, k = 0..15):
K(query) = Σ_k θ_k · ψ_k(h(query))

Coherence between agents (**canonical, verified** — cosine similarity):
C_ij = (θ_i · θ_j) / (‖θ_i‖ · ‖θ_j‖) = Σ_k θ_{i,k}θ_{j,k} / [ √(Σ_k θ_{i,k}²)·√(Σ_k θ_{j,k}²) ]
Range [−1,+1]: +1 identical, 0 orthogonal/independent, −1 opposite.

**Why golden frequencies.** φ^k scaling avoids integer-multiple resonance, keeping basis functions at different scales maximally independent — the same "never synchronize" property observed for golden-mean frequency spacing in resting EEG.

**Underpins:** holographic knowledge store (encode/recall), inter-agent coherence metric.

**Citations.** Plate, *Holographic Reduced Representations*, IEEE Trans. Neural Networks (1995) — for the HRR lineage being *distinguished*; Kleyko et al., *Vector Symbolic Architectures as a Computing Framework for Emerging Hardware*, Proc. IEEE / arXiv:2106.05268 (2021); Cosine similarity — Wikipedia (https://en.wikipedia.org/wiki/Cosine_similarity) and Luo et al., *Cosine Normalization*, arXiv:1702.05870 (2017); golden-mean frequency desynchronization — *When frequencies never synchronize: the golden mean and the resting EEG*, Brain Research (2010).

---

## 5. FNV–Swarm–Hebbian Substrate — Hashing, Learning, Consensus, Activations

### 5a. FNV-1a 32-bit hash (input → basis index / h(item))

**What it is.** A fast non-cryptographic hash with empirically chosen constants giving good avalanche/low collisions; used to map items to the [0,1] inputs of the basis functions.

Constants: offset basis = 2166136261 (0x811c9dc5); prime = 16777619 (0x01000193).
Algorithm (1a order — XOR then multiply):
```
hash ← offset_basis
for byte in input:
    hash ← (hash XOR byte)
    hash ← (hash × prime) mod 2³²
```

**Citation.** Fowler–Noll–Vo hash, official spec (http://www.isthe.com/chongo/tech/comp/fnv/); Wikipedia, *Fowler–Noll–Vo hash function*.

### 5b. Hebbian learning (weight adaptation)

**What it is.** Unsupervised correlational plasticity — co-active units strengthen their connection ("fire together, wire together"); requires no error signal.
ΔW_ij = η · x_i · x_j (η learning rate; x_i, x_j post/pre-synaptic activations)

**Citation.** Hebb, *The Organization of Behavior* (1949); Wikipedia, *Hebbian theory*.

### 5c. Swarm consensus / flocking (multi-agent alignment)

**What it is.** Agents reach collective alignment by averaging neighbors' states within radius R — emergent order, no central controller.
Vicsek heading update: θ_i(t+1) = arg( ⟨ e^{iθ_j(t)} : j ∈ N_i ⟩ ) + η (η noise in [−π,π])
Cucker–Smale (continuous, distance-weighted): dv_i/dt ∝ Σ_j (v_j − v_i)/(1 + |x_j − x_i|)

**Citations.** Vicsek et al. (Vicsek model); Cucker & Smale flocking model; Chazelle, *The Convergence of Bird Flocking*, arXiv:0905.4241 (2009).

### 5d. Activation functions

Softsign: σ_s(x) = x/(1+|x|), range (−1,1), polynomial (slow) tails — saturates more gently than tanh.
Sigmoid: σ(x) = 1/(1+e^{−x}), range (0,1), σ(0)=0.5, derivative σ′ = σ(1−σ), exponential tails.

**Citation.** Softsign — ONNX operator docs (https://onnx.ai/onnx/operators/onnx__Softsign.html); Sigmoid — Google ML Crash Course / standard deep-learning references.

**Underpins (whole §5):** the substrate layer — item hashing (h), Hebbian weight updates, swarm/agent consensus dynamics, and the nonlinearities used across family equations (σ in f₆, softsign elsewhere).

---

## 6. SEO / Schema.org — Framework Documentation Surface (not a math foundation)

**What it is.** Guidance for making the framework docs/repo discoverable and AI-citable. Key point: `SoftwareSourceCode` and `TechArticle` are **semantic-only** — they are indexed and aid LLM/AI-Overview comprehension and attribution, but do **not** produce visible Google rich results. JSON-LD is the required serialization (Microdata/RDFa effectively deprecated for Google; Bing still accepts all three).

**Recommended markup.**
- Repo/home: `SoftwareSourceCode` — codeRepository, programmingLanguage, license (SPDX), author (with canonical @id).
- Docs pages: `TechArticle` — headline, articleBody, datePublished, dateModified, author @id; optional dependencies, proficiencyLevel.
- Deprecation note: FAQPage rich results removed (May 2026); HowTo step carousels discontinued (Sep 2023) — markup stays valid but renders no special SERP UI.

**Citations.** Google Search Central — Structured Data Overview & Article schema (https://developers.google.com/search/docs/appearance/structured-data); Schema.org — *TechArticle* (https://schema.org/TechArticle), *SoftwareSourceCode* (https://schema.org/SoftwareSourceCode); JSON-LD spec (https://json-ld.org/); Bing Webmaster — structured data docs.

---

## Quick Map: Foundation → Component

| Foundation | Precise core | Component it underpins | Status |
|---|---|---|---|
| Golden ratio φ | φ=(1+√5)/2; ρ=1/(1+φ)=2−φ | Holographic basis φ^k, coupling angles, Family 10 leaky integrator | Verified |
| DNA increment δ | δ=0.013618 | DNA phase modulation | ⚠️ Empirical — NOT 1/φ³ |
| Variational free energy | F=𝔼_q[ln q − ln p(x,z)] = −ELBO | Global objective / Family 11 | Verified |
| Mutual information | I=H(X)+H(Y)−H(X,Y) | Family 6 (MI-inspired averaging) | Verified math; f₆ is an analogy |
| Rate–distortion / IB | min I(X;Z) − β·I(Z;Y) | Family 7 (compression vs. utility) | Verified math; f₇ is a heuristic |
| Holographic memory | K=Σ θ_k ψ_k(h(q)); cosine coherence | Knowledge store + agent coherence | Frequency-domain VSA, NOT Plate HRR |
| FNV-1a | offset 0x811c9dc5, prime 0x01000193 | Item hashing h(item) | Verified |
| Hebbian | ΔW=η·x_i·x_j | Substrate weight updates | Verified |
| Vicsek / Cucker–Smale | θ_i←arg⟨e^{iθ_j}⟩+η | Swarm consensus | Verified |
| Softsign / Sigmoid | x/(1+\|x\|); 1/(1+e^{−x}) | Activations across families | Verified |
| Schema.org JSON-LD | SoftwareSourceCode / TechArticle | Docs discoverability (semantic-only) | Verified; no rich results |

**Three claims to never overstate:** (1) δ = 0.013618 is empirical, not 1/φ³; (2) the memory system is a golden-ratio frequency-domain VSA, not Plate's circular-convolution HRR; (3) f₆/f₇ are information-theory-*inspired* update rules, not exact MI / rate-distortion solvers.