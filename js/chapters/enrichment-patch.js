/* PharmaLearn — Enrichment Patch
 * Prepends foundational "first principles" sections to existing Technical Discipline chapters.
 * Applied in app.js init() via window.PL_ENRICHMENT mechanism.
 */

window.PL_ENRICHMENT = {

  /* ─────────────────────────────────────────────────────────────
   *  5-2  SQL & Data Querying  →  prepend "SQL Internals"
   * ───────────────────────────────────────────────────────────── */
  "5-2": {
    newToc: ["SQL Internals & How Databases Really Work"],
    newSections: [
      {
        id: "s0",
        title: "SQL Internals & How Databases Really Work",
        content: `
<p>Before writing production queries you need a mental model of what happens <em>inside</em> the database engine. Understanding the storage layer, the query optimizer, and index structures lets you write queries that are fast by design — not by luck.</p>

<h3>How a Relational Database Stores Data</h3>
<p>A relational database stores rows in <strong>pages</strong> (typically 8 KB in PostgreSQL/SQL Server, 16 KB in MySQL). The storage engine reads and writes pages, not individual rows — so a table scan costs <em>n_pages</em> I/O operations, not <em>n_rows</em>.</p>

<table>
  <thead><tr><th>Storage Format</th><th>Layout</th><th>Best For</th><th>Example Systems</th></tr></thead>
  <tbody>
    <tr><td>Row-oriented (heap)</td><td>All columns for one row together on a page</td><td>OLTP — full-row reads, point lookups</td><td>PostgreSQL, MySQL, SQL Server</td></tr>
    <tr><td>Column-oriented</td><td>All values for one column together on a page</td><td>OLAP — aggregate a few columns across many rows</td><td>Snowflake, Redshift, Databricks, ClickHouse</td></tr>
    <tr><td>Hybrid (PAX)</td><td>Mini-pages per column, grouped by row batch</td><td>Mixed workloads</td><td>DuckDB, some Parquet readers</td></tr>
  </tbody>
</table>

<p><strong>Pharma implication:</strong> Longitudinal claims tables (hundreds of millions of rows, 60+ columns) sit in columnar stores for a reason — a market-basket query touching 4 columns reads only 4/60 of the data vs a row store.</p>

<h3>B-Tree Indexes: The Default Index</h3>
<p>PostgreSQL, MySQL, and SQL Server all default to <strong>B-tree</strong> (balanced tree) indexes. Every leaf node holds a sorted list of (key, row_pointer) pairs. Lookups are O(log N); range scans traverse leaf nodes sequentially.</p>

<pre><code class="language-sql">-- Range scan — B-tree works well
SELECT patient_id, fill_date, days_supply
FROM   pharmacy_claims
WHERE  fill_date BETWEEN '2023-01-01' AND '2023-12-31'
  AND  ndc11 = '00069420030';  -- index on (ndc11, fill_date) ideal

-- Composite index column order matters: leading column must appear in WHERE
-- Index: (ndc11, fill_date) → above query is index-range-scan ✓
-- Index: (fill_date, ndc11) → above query is also fine (both constrained)
-- Index: (ndc11)            → fill_date filter applied post-index (index scan + filter)</code></pre>

<h3>The Query Optimizer & Execution Plans</h3>
<p>The query optimizer is a cost-based planner. It enumerates join orders, access paths (seq scan vs index scan), and join algorithms (nested loop / hash join / merge join), picks the lowest-estimated-cost plan, and compiles it to an operator tree.</p>

<pre><code class="language-sql">-- PostgreSQL: read the plan
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT  p.patient_id,
        COUNT(DISTINCT pc.claim_id) AS claim_count,
        SUM(pc.paid_amount)         AS total_paid
FROM    patients         p
JOIN    pharmacy_claims  pc ON pc.patient_id = p.patient_id
WHERE   pc.fill_date >= '2023-01-01'
  AND   p.state_cd = 'NY'
GROUP BY p.patient_id;

/*  Key plan nodes to understand:
    Seq Scan        → full table scan; fine for small tables, expensive for large
    Index Scan      → walks B-tree, then heap; good for selective predicates
    Index Only Scan → all needed columns in the index; no heap access (fastest)
    Hash Join       → build hash table on smaller input; good for large equi-joins
    Nested Loop     → for each outer row, probe inner; good when inner is small/indexed
    Merge Join      → both inputs sorted on join key; good after sort/index

    "Buffers: shared hit=…"  → pages read from cache (free)
    "Buffers: shared read=…" → pages read from disk (expensive)
*/</code></pre>

<h3>Covering Indexes & Index-Only Scans</h3>
<p>An index <em>covers</em> a query when all referenced columns are in the index — the engine never touches the heap. This is the single biggest performance lever for read-heavy analytics.</p>

<pre><code class="language-sql">-- Without covering index: index scan on ndc11, then heap fetch for paid_amount
SELECT ndc11, SUM(paid_amount)
FROM   pharmacy_claims
WHERE  fill_date >= '2023-01-01'
GROUP BY ndc11;

-- With covering index on (fill_date, ndc11) INCLUDE (paid_amount)
-- PostgreSQL syntax:
CREATE INDEX idx_claims_covering
    ON pharmacy_claims (fill_date, ndc11)
    INCLUDE (paid_amount);
-- Now the planner can do an Index Only Scan — zero heap I/O</code></pre>

<h3>Window Functions: How They Execute</h3>
<p>Window functions run <em>after</em> WHERE and GROUP BY but <em>before</em> the final SELECT projection. The engine partitions rows by PARTITION BY, sorts within each partition by ORDER BY, then slides the frame.</p>

<pre><code class="language-sql">-- Patient-level running total of paid amounts, partitioned by drug
SELECT
    patient_id,
    fill_date,
    drug_name,
    paid_amount,
    SUM(paid_amount)  OVER w AS running_paid,
    ROW_NUMBER()      OVER w AS fill_sequence,
    LAG(fill_date, 1) OVER w AS prev_fill_date,
    DATEDIFF(day, LAG(fill_date,1) OVER w, fill_date) AS days_since_last_fill
FROM   pharmacy_claims
WINDOW w AS (PARTITION BY patient_id, drug_name ORDER BY fill_date
             ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW);

-- Adherence gap flag: any gap > days_supply + 7 = lapsed patient
WITH gaps AS (
  SELECT *,
         DATEDIFF(day, LAG(fill_date,1) OVER (PARTITION BY patient_id, ndc11
                                               ORDER BY fill_date),
                  fill_date) - LAG(days_supply,1) OVER (PARTITION BY patient_id, ndc11
                                                         ORDER BY fill_date) AS gap_days
  FROM   pharmacy_claims
)
SELECT patient_id, fill_date, gap_days,
       CASE WHEN gap_days > 7 THEN 'lapsed' ELSE 'adherent' END AS adherence_flag
FROM   gaps;</code></pre>

<h3>CTEs vs Subqueries vs Temp Tables</h3>
<table>
  <thead><tr><th>Construct</th><th>Materialized?</th><th>Best Use</th><th>Gotcha</th></tr></thead>
  <tbody>
    <tr><td>Subquery (inline view)</td><td>No — folded into plan</td><td>Simple filtering, one reference</td><td>Hard to read when nested deeply</td></tr>
    <tr><td>CTE (WITH clause)</td><td>Depends on engine</td><td>Readability, multiple references</td><td>Postgres < 12 always materializes; can hurt perf</td></tr>
    <tr><td>Temp table</td><td>Yes — written to disk/mem</td><td>Multi-step ETL, large intermediate results</td><td>Requires CREATE TABLE, session-scoped</td></tr>
    <tr><td>Materialized CTE</td><td>Yes — explicit</td><td>Expensive subquery referenced many times</td><td><code>WITH … AS MATERIALIZED</code> (PG 12+)</td></tr>
  </tbody>
</table>

<h3>NULL Semantics — The Silent Bug Source</h3>
<pre><code class="language-sql">-- NULLs are NOT equal to anything, including themselves
SELECT NULL = NULL;   -- returns NULL (not TRUE)
SELECT NULL IS NULL;  -- returns TRUE

-- Aggregates silently ignore NULLs
SELECT AVG(copay_amount) FROM pharmacy_claims;
-- Excludes rows where copay_amount IS NULL → denominator is smaller than you think

-- Safe pattern: COALESCE to make the default explicit
SELECT AVG(COALESCE(copay_amount, 0)) AS avg_copay_incl_zero
FROM   pharmacy_claims;

-- COUNT(*) counts rows; COUNT(col) counts non-NULL values — very different!
SELECT COUNT(*)              AS total_rows,
       COUNT(copay_amount)   AS rows_with_copay,
       COUNT(*) - COUNT(copay_amount) AS rows_missing_copay
FROM pharmacy_claims;</code></pre>

<h3>Columnar Compression & Predicate Pushdown (Snowflake / Databricks)</h3>
<p>Columnar stores achieve 5–20× compression on homogeneous data (dictionary, RLE, delta encoding). More importantly, they store <strong>min/max metadata per micro-partition</strong>. A WHERE clause on a date column can skip entire partitions without reading them — this is <em>partition pruning</em>.</p>

<pre><code class="language-sql">-- Snowflake: always filter on the CLUSTER KEY column first
-- Bad: forces full scan — optimizer can't prune
SELECT * FROM claims WHERE patient_id = 'P123456';

-- Good: fill_date is the cluster key → micro-partition pruning kicks in
SELECT * FROM claims
WHERE  fill_date BETWEEN '2023-01-01' AND '2023-03-31'
  AND  patient_id = 'P123456';

-- Check pruning efficiency:
-- After running a query, check query profile → "Partitions scanned" vs "Partitions total"
-- Good pruning: < 10 % of partitions scanned</code></pre>

<p><strong>Key takeaway:</strong> Write SQL in alignment with the storage model. Row stores reward selective index lookups; columnar stores reward partition-aligned range filters and projecting only the columns you need.</p>
`
      }
    ]
  },

  /* ─────────────────────────────────────────────────────────────
   *  5-4  Machine Learning  →  prepend "ML Math Foundations"
   * ───────────────────────────────────────────────────────────── */
  "5-4": {
    newToc: ["ML Math Foundations: From Loss to Learning"],
    newSections: [
      {
        id: "s0",
        title: "ML Math Foundations: From Loss to Learning",
        content: `
<p>Every ML algorithm is an optimization problem at its core: define a <strong>loss function</strong> that measures how wrong the model is, then minimize it. Understanding this machinery — bias-variance tradeoff, gradient descent variants, regularization — separates engineers who tune hyperparameters blindly from those who reason about what will actually help.</p>

<h3>The Bias-Variance Tradeoff</h3>
<p>Generalization error decomposes as:</p>
<pre><code class="language-text">Expected Error = Bias² + Variance + Irreducible Noise

Bias:     how wrong is the model's average prediction?
          (underfitting — model too simple)
Variance: how much does the prediction change across training sets?
          (overfitting — model too complex)
</code></pre>

<table>
  <thead><tr><th>Symptom</th><th>Cause</th><th>Fix</th></tr></thead>
  <tbody>
    <tr><td>High train error, high val error</td><td>High bias</td><td>More capacity (deeper model, more features, fewer regularization constraints)</td></tr>
    <tr><td>Low train error, high val error</td><td>High variance</td><td>More data, dropout, L1/L2 regularization, early stopping, ensemble</td></tr>
    <tr><td>Both errors plateau</td><td>Irreducible noise or wrong feature set</td><td>Better features, data quality, label noise audit</td></tr>
  </tbody>
</table>

<p><strong>Pharma example:</strong> A drug-response model trained on 1,200 trial patients that achieves 95% train AUC but 62% val AUC is overfitting — the trial cohort doesn't represent real-world patients. Fix: more diverse training data (RWE), stronger L2 regularization, or a simpler model with fewer parameters.</p>

<h3>Loss Functions — Choosing the Right Signal</h3>
<pre><code class="language-python">import numpy as np

# --- Regression losses ---
def mse(y, y_hat):
    return np.mean((y - y_hat) ** 2)          # penalizes large errors heavily

def mae(y, y_hat):
    return np.mean(np.abs(y - y_hat))          # robust to outliers

def huber(y, y_hat, delta=1.0):               # MSE for small errors, MAE for large
    err = np.abs(y - y_hat)
    return np.where(err <= delta,
                    0.5 * err**2,
                    delta * (err - 0.5 * delta))

# --- Classification losses ---
def binary_cross_entropy(y, p):               # logistic regression, neural nets
    p = np.clip(p, 1e-9, 1 - 1e-9)
    return -np.mean(y * np.log(p) + (1 - y) * np.log(1 - p))

def focal_loss(y, p, gamma=2.0):             # down-weights easy negatives
    p = np.clip(p, 1e-9, 1 - 1e-9)           # great for class imbalance
    pt = np.where(y == 1, p, 1 - p)
    return -np.mean((1 - pt) ** gamma * np.log(pt))

# Pharma: adherence prediction is heavily imbalanced (~80% adherent)
# focal_loss or class_weight='balanced' in sklearn prevents the model
# from just predicting "adherent" for everything</code></pre>

<h3>Gradient Descent Variants</h3>
<pre><code class="language-python">import torch, torch.nn as nn

# Conceptual implementations (torch handles the real thing)
# All minimize: θ ← θ - η · ∇L(θ)

# Batch GD: gradient over entire dataset — stable but slow for large data
# SGD: gradient over one sample — noisy but fast; can escape local minima
# Mini-batch SGD: gradient over B samples — best of both worlds (standard)

# Adam: adaptive per-parameter learning rates + momentum
# Updates: m_t = β1·m_{t-1} + (1-β1)·g_t    (1st moment — direction)
#          v_t = β2·v_{t-1} + (1-β2)·g_t²   (2nd moment — scale)
#          θ   ← θ - η · m̂_t / (√v̂_t + ε)

optimizer_sgd  = torch.optim.SGD(model.parameters(), lr=0.01, momentum=0.9)
optimizer_adam = torch.optim.Adam(model.parameters(), lr=1e-3, betas=(0.9, 0.999))

# Learning rate schedules — critical for convergence
scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer_adam,
                                                        T_max=50, eta_min=1e-6)
# Cosine annealing: high LR early (explore), low LR late (converge precisely)
# Warmup + cosine: standard for transformers and large models</code></pre>

<h3>Regularization Techniques</h3>
<pre><code class="language-python">from sklearn.linear_model import Ridge, Lasso, ElasticNet
from sklearn.ensemble import GradientBoostingClassifier
import torch.nn as nn

# L2 (Ridge): adds λ·||w||² to loss — all weights shrink, none to exactly zero
# Best for: many correlated features (e.g., 200 correlated lab values)
ridge = Ridge(alpha=1.0)   # alpha = λ

# L1 (Lasso): adds λ·||w||₁ to loss — drives sparse weights; some to exactly zero
# Best for: feature selection, interpretable models with many irrelevant features
lasso = Lasso(alpha=0.01)

# ElasticNet: α·L1 + (1-α)·L2 — feature selection + handles correlated groups
elastic = ElasticNet(alpha=0.1, l1_ratio=0.5)

# Dropout (neural nets): randomly zero out p fraction of neurons each forward pass
# Forces redundant representations; acts as ensemble of 2^N sub-networks
dropout_layer = nn.Dropout(p=0.3)   # 30% dropout — common in FC layers

# Early stopping: stop when val loss stops improving
# Use: monitor val_loss, patience=10 epochs → prevents overfitting automatically

# Tree-based: max_depth, min_samples_leaf, subsample (row sampling), max_features
xgb = GradientBoostingClassifier(
    n_estimators=500,
    max_depth=4,          # shallow trees — high bias, low variance per tree
    learning_rate=0.05,   # small steps → need more trees but generalize better
    subsample=0.8,        # row subsampling (stochastic GB)
    max_features=0.8,     # column subsampling
)</code></pre>

<h3>Handling Class Imbalance</h3>
<pre><code class="language-python">from sklearn.utils.class_weight import compute_class_weight
from imblearn.over_sampling import SMOTE
import numpy as np

# Context: rare disease prediction — 2% positive rate (1:49 imbalance)

# Strategy 1: Class weights — tell the model to penalize minority errors more
y_train = np.array([...])
classes = np.unique(y_train)
weights = compute_class_weight('balanced', classes=classes, y=y_train)
class_weight_dict = dict(zip(classes, weights))
# Pass to sklearn: RandomForestClassifier(class_weight='balanced')
# Pass to XGBoost: scale_pos_weight = n_neg / n_pos

# Strategy 2: SMOTE — synthetic minority oversampling
# Creates synthetic minority samples by interpolating between real ones
smote = SMOTE(sampling_strategy=0.1, random_state=42)  # 1:10 after resampling
X_res, y_res = smote.fit_resample(X_train, y_train)

# Strategy 3: Threshold tuning — default 0.5 is rarely optimal for imbalanced
# Use precision-recall curve and pick threshold by F1 or business cost
from sklearn.metrics import precision_recall_curve, f1_score
prec, rec, thresholds = precision_recall_curve(y_val, y_proba)
f1_scores = 2 * prec * rec / (prec + rec + 1e-9)
best_threshold = thresholds[np.argmax(f1_scores)]

# Pharma: for rare disease models, use AUPRC (area under PR curve)
# rather than AUC-ROC — AUROC is optimistic when prevalence is very low</code></pre>

<h3>Cross-Validation & Leakage Prevention</h3>
<pre><code class="language-python">from sklearn.model_selection import StratifiedKFold, TimeSeriesSplit
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

# For time-series data (claims, Rx trends): NEVER shuffle — use temporal split
tscv = TimeSeriesSplit(n_splits=5)
# Ensures: train on past, validate on future — mirrors real deployment

# Pipeline prevents leakage: scaler fit only on train fold, not val fold
pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('model',  GradientBoostingClassifier())
])

scores = []
for train_idx, val_idx in tscv.split(X):
    X_tr, X_val = X[train_idx], X[val_idx]
    y_tr, y_val = y[train_idx], y[val_idx]
    pipe.fit(X_tr, y_tr)
    scores.append(pipe.score(X_val, y_val))

# Common leakage sources in pharma:
# - Using future diagnosis codes as features when predicting current treatment
# - Including claims that occur AFTER the index date
# - Normalizing with stats computed on the full dataset before splitting</code></pre>

<h3>Interpretability Fundamentals</h3>
<pre><code class="language-python">import shap

# SHAP (SHapley Additive Explanations)
# Game theory: each feature's contribution = average marginal contribution
# across all possible feature subsets

explainer = shap.TreeExplainer(xgb_model)
shap_values = explainer.shap_values(X_test)

# Global importance: mean |SHAP| per feature
shap.summary_plot(shap_values, X_test, plot_type='bar')

# Local explanation: why did patient P123 get a high-risk score?
shap.waterfall_plot(shap.Explanation(
    values=shap_values[patient_idx],
    base_values=explainer.expected_value,
    data=X_test[patient_idx],
    feature_names=feature_names
))

# LIME: local linear approximation around one prediction
# Permutation importance: permute one feature, measure accuracy drop
# Partial Dependence Plots (PDP): marginal effect of a feature on predictions

# Pharma/regulatory: FDA expects model cards + feature attribution for
# AI/ML-based SaMD (Software as Medical Device) submissions</code></pre>

<p><strong>Key takeaway:</strong> ML is applied math. Loss + optimizer + regularization form a system — change one part and the others must compensate. Master these levers and hyperparameter tuning becomes principled, not trial-and-error.</p>
`
      }
    ]
  },

  /* ─────────────────────────────────────────────────────────────
   *  5-7  Deep Learning & NLP  →  prepend "Neural Networks from First Principles"
   * ───────────────────────────────────────────────────────────── */
  "5-7": {
    newToc: ["Neural Networks from First Principles"],
    newSections: [
      {
        id: "s0",
        title: "Neural Networks from First Principles",
        content: `
<p>A neural network is a composition of differentiable functions. Understanding backpropagation, activation functions, and the transformer's attention mechanism from mathematical first principles demystifies what is otherwise a black box — and makes debugging and architecture choices tractable.</p>

<h3>The Perceptron → MLP → Deep Network</h3>
<pre><code class="language-python">import numpy as np

# --- Perceptron: one neuron ---
# output = activation(w·x + b)
# Learns a linear decision boundary; XOR is not linearly separable → fails

# --- Multi-Layer Perceptron: stack of linear layers + nonlinearities ---
# Without nonlinearity: W2·(W1·x + b1) + b2 = W'·x + b' (still linear!)
# Nonlinearity (activation function) is what gives depth its power

def relu(z):      return np.maximum(0, z)
def sigmoid(z):   return 1 / (1 + np.exp(-z))
def tanh(z):      return np.tanh(z)
def gelu(z):      # Gaussian Error Linear Unit — used in BERT, GPT
    return 0.5 * z * (1 + np.tanh(np.sqrt(2/np.pi) * (z + 0.044715 * z**3)))

# Activation comparison:
# ReLU:    fast, sparse, vanishing gradient for neg inputs ("dying ReLU")
# sigmoid: squashes to (0,1) — good for binary output; saturates → vanishing grad
# tanh:    squashes to (-1,1) — better than sigmoid for hidden layers
# GELU:    smooth approximation of ReLU; SOTA for transformers

class MLP:
    """Two-layer MLP — forward pass only (to illustrate structure)."""
    def __init__(self, d_in, d_hidden, d_out):
        # Glorot / Xavier initialization: var = 2 / (fan_in + fan_out)
        self.W1 = np.random.randn(d_in, d_hidden) * np.sqrt(2 / (d_in + d_hidden))
        self.b1 = np.zeros(d_hidden)
        self.W2 = np.random.randn(d_hidden, d_out) * np.sqrt(2 / (d_hidden + d_out))
        self.b2 = np.zeros(d_out)

    def forward(self, x):
        self.z1 = x @ self.W1 + self.b1      # pre-activation
        self.a1 = relu(self.z1)               # hidden layer
        self.z2 = self.a1 @ self.W2 + self.b2 # output logits
        return sigmoid(self.z2)               # binary output probability</code></pre>

<h3>Backpropagation: The Chain Rule in Practice</h3>
<pre><code class="language-python"># Backprop = applying the chain rule recursively through the computation graph
# dL/dW1 = dL/da2 · da2/dz2 · dz2/da1 · da1/dz1 · dz1/dW1

# For the MLP above (MSE loss, scalar output):
def backward(self, x, y, lr=0.01):
    m = x.shape[0]

    # Output layer gradient
    dL_dz2 = self.a2 - y                     # dL/dz2 for MSE+sigmoid
    dL_dW2 = self.a1.T @ dL_dz2 / m
    dL_db2 = dL_dz2.mean(axis=0)

    # Hidden layer gradient
    dL_da1 = dL_dz2 @ self.W2.T
    dL_dz1 = dL_da1 * (self.z1 > 0)          # ReLU derivative: 1 if z>0 else 0
    dL_dW1 = x.T @ dL_dz1 / m
    dL_db1 = dL_dz1.mean(axis=0)

    # Parameter update (SGD)
    self.W2 -= lr * dL_dW2
    self.b2 -= lr * dL_db2
    self.W1 -= lr * dL_dW1
    self.b1 -= lr * dL_db1

# Vanishing gradient problem: in deep networks, gradients shrink exponentially
# as they propagate backward through sigmoid/tanh layers.
# Solutions: ReLU/GELU activations, BatchNorm, residual connections (ResNet),
# careful initialization, gradient clipping</code></pre>

<h3>Batch Normalization & Layer Normalization</h3>
<pre><code class="language-python">import torch, torch.nn as nn

# BatchNorm: normalizes over the BATCH dimension per feature
# μ_B = mean over batch; σ_B = std over batch
# ẑ = (z - μ_B) / σ_B; output = γ·ẑ + β  (γ, β are learned)
# Problem: depends on batch statistics → different train/eval behavior
#          doesn't work well for small batches (e.g., NLP long sequences)
bn = nn.BatchNorm1d(num_features=256)

# LayerNorm: normalizes over the FEATURE dimension per sample
# Used in Transformers — statistics per token, not per batch
# Works correctly at inference even with batch_size=1
ln = nn.LayerNorm(normalized_shape=256)

# Residual connection (skip connection): output = F(x) + x
# Allows gradients to flow directly through addition (no multiplication → no vanishing)
# ResNet insight: easier to learn F(x) = 0 (identity) than to learn identity directly</code></pre>

<h3>Attention Mechanism: The Math</h3>
<pre><code class="language-python">import torch
import torch.nn.functional as F
import math

def scaled_dot_product_attention(Q, K, V, mask=None):
    """
    Q: (batch, heads, seq_len, d_k)
    K: (batch, heads, seq_len, d_k)
    V: (batch, heads, seq_len, d_v)

    Attention(Q, K, V) = softmax(Q·Kᵀ / √d_k) · V

    Intuition:
    - Q (query): "what am I looking for?"
    - K (key):   "what do I contain?"
    - V (value): "what do I return if selected?"
    - √d_k scaling: prevents dot products from growing so large that softmax saturates
    """
    d_k = Q.size(-1)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)  # (batch, heads, seq, seq)

    if mask is not None:
        scores = scores.masked_fill(mask == 0, float('-inf'))  # causal mask for GPT

    attn_weights = F.softmax(scores, dim=-1)   # sum to 1 across key positions
    return torch.matmul(attn_weights, V), attn_weights

# Multi-head attention: run h attention heads in parallel on projected subspaces
# Each head can attend to different relationship types simultaneously
# Output = Concat(head_1, ..., head_h) · W_O

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, n_heads):
        super().__init__()
        assert d_model % n_heads == 0
        self.d_k = d_model // n_heads
        self.n_heads = n_heads
        self.W_Q = nn.Linear(d_model, d_model)
        self.W_K = nn.Linear(d_model, d_model)
        self.W_V = nn.Linear(d_model, d_model)
        self.W_O = nn.Linear(d_model, d_model)

    def split_heads(self, x, batch_size):
        x = x.view(batch_size, -1, self.n_heads, self.d_k)
        return x.transpose(1, 2)

    def forward(self, x, mask=None):
        B, S, _ = x.shape
        Q = self.split_heads(self.W_Q(x), B)
        K = self.split_heads(self.W_K(x), B)
        V = self.split_heads(self.W_V(x), B)
        attn_out, _ = scaled_dot_product_attention(Q, K, V, mask)
        attn_out = attn_out.transpose(1, 2).contiguous().view(B, S, -1)
        return self.W_O(attn_out)</code></pre>

<h3>Transformer Architecture Summary</h3>
<table>
  <thead><tr><th>Component</th><th>What It Does</th><th>Key Insight</th></tr></thead>
  <tbody>
    <tr><td>Token Embedding</td><td>Maps token ID → dense vector</td><td>Learned; similar tokens end up nearby in vector space</td></tr>
    <tr><td>Positional Encoding</td><td>Injects sequence order (sin/cos or learned)</td><td>Attention has no notion of order without this</td></tr>
    <tr><td>Multi-Head Attention</td><td>Each token attends to all others</td><td>Global receptive field in O(n²) — unlike RNN's sequential O(n)</td></tr>
    <tr><td>Feed-Forward Network</td><td>Two linear layers + GELU per position</td><td>Independently applied; where "knowledge" is stored (neurons as memory)</td></tr>
    <tr><td>Layer Norm + Residual</td><td>Stabilize training, enable gradient flow</td><td>Pre-norm (before attn) > post-norm for large models</td></tr>
    <tr><td>Causal Mask (GPT)</td><td>Future tokens masked during attention</td><td>Forces left-to-right autoregressive generation</td></tr>
    <tr><td>Cross-Attention (enc-dec)</td><td>Decoder attends to encoder outputs</td><td>Mechanism behind translation, summarization (T5, BART)</td></tr>
  </tbody>
</table>

<h3>Transfer Learning in Life Sciences</h3>
<pre><code class="language-python">from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

# BioBERT: BERT pre-trained on PubMed + PMC full text
# Fine-tune for adverse event detection from clinical notes

tokenizer = AutoTokenizer.from_pretrained("dmis-lab/biobert-v1.1")
model = AutoModelForSequenceClassification.from_pretrained(
    "dmis-lab/biobert-v1.1",
    num_labels=2  # adverse event present / absent
)

# Fine-tuning strategy (3-phase is standard):
# 1. Freeze all layers except classification head — train 2-3 epochs
# 2. Unfreeze last 4 transformer blocks — train with lr=2e-5
# 3. Unfreeze all — train with lr=1e-5 (very small to preserve pre-trained weights)

# Why this works: BioBERT already "knows" biomedical language
# Fine-tuning adapts representations to the specific task with very little labeled data

# Other pharma NLP models:
# PubMedBERT  — trained only on PubMed (no Wikipedia) → better biomedical understanding
# BioGPT      — generative; drug-drug interaction extraction, trial eligibility matching
# Med-PaLM 2  — Google's LLM fine-tuned on medical Q&A (passes USMLE)
# GatorTron   — 82B param clinical NLP model (University of Florida / NVIDIA)</code></pre>

<h3>Convolutional Networks for Medical Imaging</h3>
<pre><code class="language-python">import torch.nn as nn

# CNN: learns spatial hierarchies — edges → textures → parts → objects
# Convolution: slide a learned filter across the image, computing dot products
# Pooling: reduces spatial resolution; builds translation invariance

class ConvBlock(nn.Module):
    def __init__(self, in_ch, out_ch):
        super().__init__()
        self.block = nn.Sequential(
            nn.Conv2d(in_ch, out_ch, kernel_size=3, padding=1),
            nn.BatchNorm2d(out_ch),
            nn.ReLU(inplace=True),
            nn.Conv2d(out_ch, out_ch, kernel_size=3, padding=1),
            nn.BatchNorm2d(out_ch),
            nn.ReLU(inplace=True)
        )
    def forward(self, x): return self.block(x)

# U-Net: encoder-decoder with skip connections
# Standard architecture for medical image segmentation (tumors, organs, lesions)
# Skip connections preserve spatial detail that pooling would destroy

# Transfer learning for medical imaging:
# ImageNet pre-trained ResNet/EfficientNet → fine-tune on radiology images
# Even though ImageNet (natural images) ≠ X-ray, low-level features transfer well
# With small labeled medical datasets (200-500 images), this beats training from scratch

# Pharma applications:
# - Histopathology: tumor grading from biopsy slides (Paige.AI, PathAI)
# - Radiology: lesion detection, progression measurement (FDA-cleared devices)
# - Dermatology: skin cancer classification (≈ dermatologist accuracy)
# - Cell painting: drug mechanism prediction from microscopy images</code></pre>

<p><strong>Key takeaway:</strong> Neural networks are differentiable computation graphs. The transformer's attention is a soft, learnable content-based addressing mechanism. Understanding the math behind each component — not just the API — enables you to debug failures, design architectures, and evaluate whether a pre-trained model actually fits your task.</p>
`
      }
    ]
  },

  /* ─────────────────────────────────────────────────────────────
   *  6-1  Modern Data Stack  →  prepend "Distributed Systems Fundamentals"
   * ───────────────────────────────────────────────────────────── */
  "6-1": {
    newToc: ["Distributed Systems Fundamentals"],
    newSections: [
      {
        id: "s0",
        title: "Distributed Systems Fundamentals",
        content: `
<p>Modern data platforms — Snowflake, Databricks, Kafka, dbt — are built on a set of distributed systems principles that predate any vendor. Understanding CAP theorem, consistency models, partitioning strategies, and the MapReduce lineage lets you reason about system behavior under failure, scale trade-offs, and why architectures look the way they do.</p>

<h3>The CAP Theorem</h3>
<p>A distributed system can guarantee at most two of three properties simultaneously when a network partition occurs:</p>

<table>
  <thead><tr><th>Property</th><th>Meaning</th><th>Example Systems That Prioritize It</th></tr></thead>
  <tbody>
    <tr><td><strong>C</strong>onsistency</td><td>Every read gets the most recent write (or an error)</td><td>HBase, Zookeeper, traditional RDBMS</td></tr>
    <tr><td><strong>A</strong>vailability</td><td>Every request gets a response (may not be most recent)</td><td>Cassandra, DynamoDB, CouchDB</td></tr>
    <tr><td><strong>P</strong>artition Tolerance</td><td>System continues operating despite network splits</td><td>All distributed systems must have this</td></tr>
  </tbody>
</table>

<p>In practice: partition tolerance is mandatory for any distributed system. The real choice is <strong>CP vs AP</strong>:</p>
<ul>
  <li><strong>CP systems</strong> (e.g., HBase): refuse requests when partition detected → strong consistency, reduced availability</li>
  <li><strong>AP systems</strong> (e.g., Cassandra): serve stale data during partitions → high availability, eventual consistency</li>
</ul>

<p><strong>Pharma data implication:</strong> A claims ingestion pipeline can tolerate AP behavior (eventual consistency is fine — we'll reconcile). A drug safety signal system needs CP behavior — serving stale adverse event counts is unacceptable.</p>

<h3>Consistency Models (the spectrum)</h3>
<table>
  <thead><tr><th>Model</th><th>Guarantee</th><th>Latency Cost</th><th>Use Case</th></tr></thead>
  <tbody>
    <tr><td>Strong / Linearizable</td><td>Reads always see latest write; total order of operations</td><td>High (coordination required)</td><td>Financial transactions, configuration stores</td></tr>
    <tr><td>Sequential</td><td>Operations appear in some order consistent across nodes</td><td>Medium</td><td>Multi-node lock services</td></tr>
    <tr><td>Causal</td><td>Causally related operations seen in order; concurrent ops may vary</td><td>Low</td><td>Collaborative apps, distributed chat</td></tr>
    <tr><td>Eventual</td><td>If no new writes, all replicas converge to the same value (eventually)</td><td>Lowest</td><td>DNS, shopping carts, claims aggregation</td></tr>
    <tr><td>Read-your-writes</td><td>You always see your own writes; others may not</td><td>Low</td><td>User profile updates, session state</td></tr>
  </tbody>
</table>

<h3>Partitioning (Sharding) Strategies</h3>
<pre><code class="language-text">Partitioning distributes data across nodes to enable parallel reads/writes.

1. RANGE PARTITIONING
   Partition by a continuous range of a key (often date).
   → Common in Snowflake (micro-partitions on date), Hive (PARTITION BY year, month)
   → Advantage: range queries touch few partitions (partition pruning)
   → Risk: hot partitions if writes concentrate on latest date

2. HASH PARTITIONING
   Hash(partition_key) mod N → assign to partition N.
   → Even data distribution; no hot spots
   → Disadvantage: range queries scan all partitions

3. LIST PARTITIONING
   Explicit value-to-partition mapping (e.g., state_cd → region partition)
   → Good for low-cardinality groupings (country, therapeutic area)

4. COMPOSITE (common in practice)
   Snowflake: cluster key = (fill_date, therapeutic_area)
   → pruning works on both date AND TA filters

Kafka partitioning:
  - Default: round-robin across partitions
  - Keyed: hash(message_key) → same key always goes to same partition
  - For claims: key = patient_id → all events for one patient are ordered
    within a partition → downstream join/sessionization is simpler</code></pre>

<h3>MapReduce → Spark: The Evolution</h3>
<pre><code class="language-python">from pyspark.sql import SparkSession
from pyspark.sql import functions as F

spark = SparkSession.builder.appName("claims-agg").getOrCreate()

# MapReduce (Hadoop): 2004 Google paper
#   Map:    input record → (key, value) pairs     [parallel, per-worker]
#   Shuffle: route all same-key pairs to same reducer [expensive disk I/O]
#   Reduce: aggregate per-key values               [parallel, per-key]
#   Problem: every step writes to disk → latency bottleneck for iterative ML

# Apache Spark: 2012 — keeps intermediate data in memory (RDDs → DataFrames)
# → 10-100× faster than MapReduce for iterative algorithms (ML training loops)
# → Same logical model: transformations are lazy; actions trigger execution

# Spark execution model:
# DAG of stages; each stage is a sequence of narrow transformations
# Shuffle (wide transformation) creates a stage boundary and writes to disk
# → Minimize shuffles for performance

claims_df = spark.read.parquet("s3://datalake/claims/")

# Lazy transformation (no data movement yet)
enriched = (claims_df
    .filter(F.col("fill_date") >= "2023-01-01")
    .withColumn("year_month", F.date_format("fill_date", "yyyy-MM"))
    .withColumn("is_specialty", F.col("days_supply") <= 30))

# Action → triggers execution of the DAG
patient_summary = (enriched
    .groupBy("patient_id", "ndc11", "year_month")   # shuffle!
    .agg(
        F.count("*").alias("fills"),
        F.sum("paid_amount").alias("total_paid"),
        F.sum("days_supply").alias("total_days_supply")
    )
    .withColumn("pdc_numerator",                     # proportion of days covered
                F.col("total_days_supply")))

# Write in columnar format with partitioning for downstream query efficiency
patient_summary.write \
    .partitionBy("year_month") \
    .mode("overwrite") \
    .parquet("s3://datalake/patient_pdc/")</code></pre>

<h3>How Snowflake Works Internally</h3>
<pre><code class="language-text">Snowflake architecture separates three layers — key to understanding its scaling model:

1. STORAGE LAYER (S3/Azure Blob/GCS)
   - Data stored as immutable, compressed columnar micro-partitions (≤16 MB compressed)
   - Each micro-partition has metadata: min/max per column, distinct counts, bloom filters
   - Shared across all compute clusters → no data movement when scaling compute

2. COMPUTE LAYER (Virtual Warehouses)
   - Each VW is a cluster of EC2 nodes with local SSD cache
   - Scales up (more nodes per VW) for complex queries on large data
   - Scales out (more VWs) for concurrency isolation (ETL vs. BI vs. DS workloads)
   - Billing: per-second, only while running a query

3. SERVICES LAYER (metadata, optimizer, auth)
   - Query optimizer uses column-level statistics to build execution plans
   - Micro-partition pruning: scans only partitions whose min/max overlap the filter
   - Result cache: identical query → instant return from cache (24-hour TTL)

Clustering keys:
  Natural order: Snowflake sorts data by insertion time (not the best for analytics)
  CLUSTER BY (fill_date, therapeutic_area): reorganizes micro-partitions for range queries
  Check: SELECT SYSTEM\$CLUSTERING_INFORMATION('claims_fact', '(fill_date)');
  Maintenance: automatic (Snowflake maintains clusters incrementally)</code></pre>

<h3>Stream Processing & Kafka Architecture</h3>
<pre><code class="language-python">from kafka import KafkaProducer, KafkaConsumer
import json

# Kafka architecture:
# Broker:     server that stores and serves messages
# Topic:      named log of messages (like a database table)
# Partition:  ordered, immutable log within a topic
# Offset:     position of a message in a partition (consumer tracks its position)
# Consumer group: partitions divided among group members → horizontal scaling
# Retention:  messages kept for N days (not deleted on consume) → replay possible

producer = KafkaProducer(
    bootstrap_servers=['kafka-broker:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8'),
    key_serializer=lambda k: k.encode('utf-8')
)

# Producing a pharmacy claim event
event = {
    "patient_id": "P123456",
    "ndc11": "00069420030",
    "fill_date": "2024-01-15",
    "days_supply": 30,
    "paid_amount": 150.00,
    "event_time": "2024-01-15T14:23:01Z"
}
producer.send("pharmacy-claims-raw", key="P123456", value=event)

# Consumer with manual offset commit (at-least-once processing)
consumer = KafkaConsumer(
    "pharmacy-claims-raw",
    bootstrap_servers=['kafka-broker:9092'],
    group_id="claims-enrichment-service",
    enable_auto_commit=False,
    value_deserializer=lambda m: json.loads(m.decode('utf-8'))
)

for msg in consumer:
    record = msg.value
    # Process: enrich with patient master data, NDC reference, etc.
    enriched = enrich_claim(record)
    write_to_delta_lake(enriched)
    consumer.commit()   # mark offset as processed only after successful write

# Exactly-once semantics: requires idempotent producer + transactional consumer
# Critical for financial/claims data — duplicate claim records → incorrect analytics</code></pre>

<h3>Data Reliability Patterns</h3>
<table>
  <thead><tr><th>Pattern</th><th>Problem Solved</th><th>Implementation</th></tr></thead>
  <tbody>
    <tr><td>Idempotent writes</td><td>Retry safety — write twice, result once</td><td>MERGE INTO (upsert) with natural key; Delta Lake ACID</td></tr>
    <tr><td>Dead letter queue</td><td>Isolate bad messages; don't block pipeline</td><td>Send unparseable records to separate Kafka topic for investigation</td></tr>
    <tr><td>Circuit breaker</td><td>Prevent cascade failures when downstream is slow</td><td>After N failures, short-circuit and return error immediately; retry after timeout</td></tr>
    <tr><td>Backpressure</td><td>Slow consumer doesn't fall behind indefinitely</td><td>Kafka: consumer controls its own pull rate; never pushed faster than it can handle</td></tr>
    <tr><td>Watermarks (streaming)</td><td>Handle late-arriving events</td><td>Spark Structured Streaming: watermark = max(event_time) - allowed_lateness</td></tr>
    <tr><td>Schema evolution</td><td>Upstream schema changes don't break downstream</td><td>Avro/Protobuf schema registry; backward-compatible field addition with defaults</td></tr>
  </tbody>
</table>

<p><strong>Key takeaway:</strong> Every Snowflake VW, every Databricks cluster, every Kafka topic embodies these distributed systems principles. CAP theorem explains why Snowflake's result cache can serve stale data. Partitioning explains why your Spark job's performance tripled after you added a date filter. You don't need to build these systems — but understanding them means you can configure, tune, and debug them rather than treating them as magic.</p>
`
      }
    ]
  }
};
