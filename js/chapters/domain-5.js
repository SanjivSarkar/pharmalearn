/* Domain 5: Data Science & Analytics Engineering */
PL.addChapters({

"5-0": {
  id:"5-0", title:"Machine Learning Fundamentals", domain:"Data Science & Analytics Engineering", domain_id:5,
  level:"Beginner", mins:40, available:true,
  tags:["Machine Learning","Supervised Learning","Unsupervised Learning","Model Evaluation","Feature Importance","Pharma AI"],
  objectives:["Distinguish the three major categories of ML and when each applies in pharma","Select the right algorithm for a given pharma analytics problem","Read and interpret common model outputs: coefficients, feature importance, confusion matrix, ROC-AUC","Understand bias-variance tradeoff and what overfitting means in practice","Know what makes a model production-ready vs. a prototype"],
  toc:[
    {id:"s1",title:"What Is Machine Learning?",level:"h2"},
    {id:"s2",title:"Types of ML Models",level:"h2"},
    {id:"s3",title:"Choosing the Right Model",level:"h2"},
    {id:"s4",title:"Reading Model Output",level:"h2"},
    {id:"s5",title:"Model Evaluation Metrics",level:"h2"},
    {id:"s6",title:"Bias, Variance & Overfitting",level:"h2"},
    {id:"s7",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">What Is Machine Learning?</h2>
<p>Machine learning is the practice of building algorithms that <strong>learn patterns from data</strong> and use those patterns to make predictions or decisions — without being explicitly programmed for each scenario.</p>
<p>In traditional analytics, a human writes the rule: <em>"If a patient has 3+ prior treatments, classify as treatment-experienced."</em> In machine learning, the algorithm discovers that rule — and hundreds of others — automatically from historical data.</p>
<div class="callout info"><div class="callout-title">The ML Promise in Pharma</div><p>ML doesn't replace business judgment — it scales it. An experienced medical science liaison can identify 50 high-potential KOLs per quarter by intuition. An ML model trained on that MSL's past decisions can score 50,000 HCPs in seconds, surfacing the top 200 for human review. The human still makes the final call; ML does the triage.</p></div>
<table><thead><tr><th>Traditional Analytics</th><th>Machine Learning</th></tr></thead><tbody>
<tr><td>Human writes rules explicitly</td><td>Algorithm learns rules from data</td></tr>
<tr><td>Works well for known, stable logic</td><td>Works well for complex patterns humans can't articulate</td></tr>
<tr><td>Easily explainable to stakeholders</td><td>May require interpretability tools (SHAP, LIME)</td></tr>
<tr><td>Example: GTN waterfall, Days on Therapy formula</td><td>Example: Patient dropout prediction, HCP next-best-action</td></tr>
</tbody></table>`},

    {id:"s2",content:`<h2 id="s2">Types of ML Models</h2>
<p>All ML approaches fall into three broad families. Understanding which family solves which type of problem is the most important ML skill for a pharma analytics professional.</p>

<h3 style="margin-top:20px;font-size:15px;font-weight:700">1. Supervised Learning — Learning from Labeled Examples</h3>
<p>The algorithm learns from historical data where the <strong>answer is already known</strong>. You show it 10,000 past patients where you know who stayed on therapy and who dropped off — it learns to predict future patients.</p>
<table><thead><tr><th>Sub-type</th><th>Output</th><th>Pharma Use Case</th><th>Common Algorithms</th></tr></thead><tbody>
<tr><td><strong>Regression</strong></td><td>A number (continuous)</td><td>Sales forecast, time-to-therapy, drug spend prediction</td><td>Linear regression, Ridge/Lasso, Gradient Boosting</td></tr>
<tr><td><strong>Binary Classification</strong></td><td>Yes/No, 0/1</td><td>Patient dropout (yes/no), prior auth approval (yes/no), HCP high-value (yes/no)</td><td>Logistic regression, Random Forest, XGBoost</td></tr>
<tr><td><strong>Multi-class Classification</strong></td><td>One of N categories</td><td>Patient segment (A/B/C), treatment line (1L/2L/3L), channel preference</td><td>Multinomial logistic, XGBoost, Neural networks</td></tr>
</tbody></table>

<h3 style="margin-top:20px;font-size:15px;font-weight:700">2. Unsupervised Learning — Finding Hidden Structure</h3>
<p>No labeled answer — the algorithm finds patterns in the data on its own. You don't tell it what groups to find; it discovers them.</p>
<table><thead><tr><th>Sub-type</th><th>Output</th><th>Pharma Use Case</th><th>Common Algorithms</th></tr></thead><tbody>
<tr><td><strong>Clustering</strong></td><td>Group membership (segments)</td><td>HCP microsegmentation, patient phenotyping, market basket</td><td>K-Means, DBSCAN, Hierarchical clustering</td></tr>
<tr><td><strong>Dimensionality Reduction</strong></td><td>Compressed representation</td><td>Visualizing high-dimensional claims data, feature compression before modeling</td><td>PCA, UMAP, t-SNE</td></tr>
<tr><td><strong>Anomaly Detection</strong></td><td>Normal vs. outlier</td><td>Claims fraud, pharmacy dispensing anomalies, data quality monitoring</td><td>Isolation Forest, Autoencoder</td></tr>
</tbody></table>

<h3 style="margin-top:20px;font-size:15px;font-weight:700">3. Reinforcement Learning — Learning by Trial and Error</h3>
<p>An agent takes actions in an environment and receives rewards or penalties. Used in pharma for <strong>next-best-action</strong> (which channel to use for HCP outreach) and <strong>adaptive clinical trial design</strong>. Less common in commercial analytics but growing rapidly.</p>

<div class="callout"><div class="callout-title">The Algorithm Family You'll Use Most in Pharma Commercial Analytics</div><p><strong>Gradient Boosted Trees (XGBoost, LightGBM)</strong> — these win the majority of pharma analytics competitions. They handle mixed data types (numeric + categorical), missing values, and non-linear relationships. They're interpretable via feature importance. For most HCP targeting, patient segmentation, and adherence prediction use cases, start here before anything more complex.</p></div>`},

    {id:"s3",content:`<h2 id="s3">Choosing the Right Model for the Problem</h2>
<p>Model selection starts with understanding what question you're trying to answer. Use this decision guide:</p>
<table><thead><tr><th>Business Question</th><th>ML Framing</th><th>Model Type</th><th>Recommended Algorithm</th></tr></thead><tbody>
<tr><td>"Which patients are most likely to discontinue in 90 days?"</td><td>Binary classification</td><td>Supervised</td><td>XGBoost / Logistic Regression</td></tr>
<tr><td>"How many units will we sell next quarter?"</td><td>Regression</td><td>Supervised</td><td>Gradient Boosting / ARIMA + ML hybrid</td></tr>
<tr><td>"Which HCPs are similar in prescribing behavior?"</td><td>Clustering</td><td>Unsupervised</td><td>K-Means / Hierarchical</td></tr>
<tr><td>"What are distinct patient phenotypes in our indication?"</td><td>Clustering</td><td>Unsupervised</td><td>K-Means / DBSCAN</td></tr>
<tr><td>"What is the probability a PA will be approved?"</td><td>Binary classification</td><td>Supervised</td><td>Logistic Regression (interpretable) / XGBoost</td></tr>
<tr><td>"Which channel should we use to reach each HCP?"</td><td>Multi-class or RL</td><td>Supervised / RL</td><td>Multinomial logistic / Bandit models</td></tr>
<tr><td>"Which claims look fraudulent?"</td><td>Anomaly detection</td><td>Unsupervised</td><td>Isolation Forest / Autoencoder</td></tr>
<tr><td>"How long until a patient reaches a clinical event?"</td><td>Survival analysis</td><td>Supervised (specialized)</td><td>Cox PH / Random Survival Forest</td></tr>
</tbody></table>

<h3 style="margin-top:20px;font-size:15px;font-weight:700">Complexity vs. Interpretability Trade-off</h3>
<table><thead><tr><th>Model</th><th>Performance</th><th>Interpretability</th><th>Best When</th></tr></thead><tbody>
<tr><td>Linear / Logistic Regression</td><td>Moderate</td><td>Very High — coefficients are direct business rules</td><td>Regulatory submission, when you must explain every prediction</td></tr>
<tr><td>Decision Tree</td><td>Moderate</td><td>High — visual flowchart anyone can follow</td><td>Rules for field teams, quick prototyping</td></tr>
<tr><td>Random Forest</td><td>High</td><td>Medium — feature importance available</td><td>Good baseline; robust to noise</td></tr>
<tr><td>XGBoost / LightGBM</td><td>Very High</td><td>Medium — needs SHAP for deep explanation</td><td>Production models where performance matters most</td></tr>
<tr><td>Neural Network / Deep Learning</td><td>Highest (on large data)</td><td>Low — "black box"</td><td>NLP on clinical notes, imaging, genomics</td></tr>
</tbody></table>`},

    {id:"s4",content:`<h2 id="s4">Reading Model Output</h2>
<p>Knowing how to interpret what a model produces is as important as knowing how to build it. Here are the key outputs you'll encounter:</p>

<h3 style="margin-top:20px;font-size:15px;font-weight:700">1. Coefficients (Logistic/Linear Regression)</h3>
<div class="formula-box">
  <div class="formula-label">Logistic Regression — Log-Odds Interpretation</div>
  <div class="formula-main">Odds Ratio = e<sup>coefficient</sup></div>
  <div class="formula-where">A coefficient of +0.7 for "specialty drug use" means: patients on a specialty drug are e⁰·⁷ = 2.01× more likely to discontinue than those not on a specialty drug, all else equal.</div>
  <div class="formula-example">Positive coefficient → increases probability of the outcome | Negative coefficient → decreases it</div>
</div>
<table><thead><tr><th>Variable</th><th>Coefficient</th><th>Odds Ratio</th><th>Business Meaning</th></tr></thead><tbody>
<tr><td>Specialty drug use</td><td>+0.70</td><td>2.01×</td><td>Doubles dropout risk</td></tr>
<tr><td>Prior PA denial</td><td>+1.20</td><td>3.32×</td><td>Triples dropout risk</td></tr>
<tr><td>Copay assistance enrolled</td><td>−0.85</td><td>0.43×</td><td>Cuts dropout risk by 57%</td></tr>
<tr><td>HCP high-decile prescriber</td><td>−0.40</td><td>0.67×</td><td>Reduces dropout risk by 33%</td></tr>
</tbody></table>

<h3 style="margin-top:20px;font-size:15px;font-weight:700">2. Feature Importance (Tree-Based Models)</h3>
<p>Feature importance tells you which variables the model relied on most heavily. It does NOT tell you the direction of effect — use SHAP values for that.</p>
<table><thead><tr><th>Rank</th><th>Feature</th><th>Importance Score</th><th>What It Means</th></tr></thead><tbody>
<tr><td>1</td><td>Days to first fill after diagnosis</td><td>0.24</td><td>Most predictive — late starters are more likely to drop off</td></tr>
<tr><td>2</td><td>Prior authorization attempts</td><td>0.18</td><td>Access friction is a strong dropout signal</td></tr>
<tr><td>3</td><td>Copay assistance status</td><td>0.15</td><td>Financial support strongly predicts persistence</td></tr>
<tr><td>4</td><td>Prescriber specialty</td><td>0.11</td><td>Specialist prescribers have higher persistence rates</td></tr>
<tr><td>5</td><td>Age at diagnosis</td><td>0.09</td><td>Younger patients show higher adherence in this indication</td></tr>
</tbody></table>

<h3 style="margin-top:20px;font-size:15px;font-weight:700">3. Confusion Matrix (Classification Models)</h3>
<table><thead><tr><th></th><th>Predicted: Stays (0)</th><th>Predicted: Drops (1)</th></tr></thead><tbody>
<tr><td><strong>Actual: Stays (0)</strong></td><td style="background:rgba(45,212,160,.15)">True Negative (TN) = 850</td><td style="background:rgba(241,106,106,.15)">False Positive (FP) = 50</td></tr>
<tr><td><strong>Actual: Drops (1)</strong></td><td style="background:rgba(241,106,106,.15)">False Negative (FN) = 80</td><td style="background:rgba(45,212,160,.15)">True Positive (TP) = 120</td></tr>
</tbody></table>
<ul>
<li><strong>False Positive</strong> (patient predicted to drop but didn't): Wasted intervention resources — annoying but cheap</li>
<li><strong>False Negative</strong> (patient predicted to stay but dropped): Missed intervention — the more costly error in pharma adherence programs</li>
<li><strong>Which error to minimize</strong> depends on business context: in oncology adherence, missing a dropout is catastrophic; in low-cost outreach, false positives are tolerable</li>
</ul>`},

    {id:"s5",content:`<h2 id="s5">Model Evaluation Metrics</h2>
<p>Different metrics answer different questions. Never rely on a single number to judge a model's quality.</p>

<h3 style="margin-top:16px;font-size:15px;font-weight:700">Classification Metrics</h3>
<div class="formula-box">
  <div class="formula-label">Accuracy</div>
  <div class="formula-main">Accuracy = (TP + TN) ÷ Total Predictions</div>
  <div class="formula-where">⚠️ Misleading when classes are imbalanced. If only 5% of patients drop off, a model that predicts "never drops" achieves 95% accuracy while being completely useless.</div>
</div>
<div class="formula-box">
  <div class="formula-label">Precision — "When we flag someone, how often are we right?"</div>
  <div class="formula-main">Precision = TP ÷ (TP + FP)</div>
  <div class="formula-where">High precision → few false alarms. Prioritize when intervention is expensive or intrusive.</div>
</div>
<div class="formula-box">
  <div class="formula-label">Recall (Sensitivity) — "Of all actual dropouts, how many did we catch?"</div>
  <div class="formula-main">Recall = TP ÷ (TP + FN)</div>
  <div class="formula-where">High recall → few missed cases. Prioritize when missing a case is costly (e.g., serious disease adherence programs).</div>
</div>
<div class="formula-box">
  <div class="formula-label">ROC-AUC — Overall Discrimination Power</div>
  <div class="formula-main">AUC = Area Under the ROC Curve (0.5 to 1.0)</div>
  <div class="formula-where">0.5 = random guessing | 0.7 = acceptable | 0.8 = good | 0.9+ = excellent. Measures how well the model separates patients who drop vs. those who stay, across all possible thresholds.</div>
  <div class="formula-example">For pharma adherence models, AUC of 0.75–0.82 is typical and commercially valuable.</div>
</div>

<h3 style="margin-top:20px;font-size:15px;font-weight:700">Regression Metrics</h3>
<div class="formula-box">
  <div class="formula-label">RMSE — Root Mean Squared Error</div>
  <div class="formula-main">RMSE = √[ Σ(Predicted − Actual)² ÷ N ]</div>
  <div class="formula-where">In the same units as the target variable. If forecasting units sold, RMSE of 500 means predictions are off by ~500 units on average. Penalizes large errors heavily.</div>
</div>
<div class="formula-box">
  <div class="formula-label">MAPE — Mean Absolute Percentage Error</div>
  <div class="formula-main">MAPE = (1/N) × Σ |Actual − Predicted| ÷ Actual × 100%</div>
  <div class="formula-where">Scale-independent — expressed as a percentage. A MAPE of 8% means forecasts are off by 8% on average. Easier to communicate to business stakeholders than RMSE.</div>
  <div class="formula-example">Industry benchmark: Pharma brand forecasting MAPE of 5–12% is considered good performance.</div>
</div>

<h3 style="margin-top:20px;font-size:15px;font-weight:700">What to Ask When Reviewing a Model</h3>
<ul>
<li><strong>What is the baseline?</strong> A model that beats a naïve guess (e.g., "predict last year's sales") isn't impressive — compare against a smart heuristic</li>
<li><strong>Was it evaluated on held-out data?</strong> Performance on training data is always optimistic — demand test-set results</li>
<li><strong>What does it look like in the worst decile?</strong> Top-decile lift is the metric that matters most for targeting campaigns</li>
<li><strong>When does it fail?</strong> Every model has blind spots — new products, market disruptions, rare patient profiles</li>
</ul>`},

    {id:"s6",content:`<h2 id="s6">Bias, Variance &amp; Overfitting</h2>
<p>Understanding why models fail is as important as understanding why they work.</p>

<table><thead><tr><th>Concept</th><th>Plain English</th><th>Symptom</th><th>Fix</th></tr></thead><tbody>
<tr><td><strong>Underfitting (High Bias)</strong></td><td>Model is too simple — misses real patterns in the data</td><td>Poor performance on both training and test data; MAPE is high on both</td><td>Add more features, use a more complex algorithm, reduce regularization</td></tr>
<tr><td><strong>Overfitting (High Variance)</strong></td><td>Model memorized the training data — performs great on training, badly on new data</td><td>Excellent training metrics (AUC 0.97), terrible test metrics (AUC 0.61)</td><td>More training data, regularization (L1/L2), cross-validation, simpler model</td></tr>
<tr><td><strong>Good Fit</strong></td><td>Model generalizes — captures real patterns without memorizing noise</td><td>Training and test performance close to each other; test AUC 0.78</td><td>You're here — focus on feature engineering to squeeze more signal</td></tr>
</tbody></table>

<div class="callout warning"><div class="callout-title">Overfitting is the #1 ML Mistake in Pharma Analytics</div><p>A model trained on 2021–2022 launch data may have memorized COVID-era access patterns. When deployed in 2023 with normalized access, it fails. Always validate models on a time-based holdout (train on 2021–2022, test on 2023) — not a random 80/20 split — to simulate real deployment conditions.</p></div>

<h3 style="margin-top:20px;font-size:15px;font-weight:700">The Validation Hierarchy</h3>
<div class="flow-box">
<div class="rule-step"><div class="rule-step-num">1</div><div class="rule-step-body"><strong>Training Set (60–70%)</strong><p>Data the model learns from. Performance here is always optimistic — never report training-set metrics as the model's true performance.</p></div></div>
<div class="flow-arrow">↓</div>
<div class="rule-step"><div class="rule-step-num">2</div><div class="rule-step-body"><strong>Validation Set (15–20%)</strong><p>Used during development to tune hyperparameters and compare algorithm choices. Not used for training.</p></div></div>
<div class="flow-arrow">↓</div>
<div class="rule-step"><div class="rule-step-num">3</div><div class="rule-step-body"><strong>Test Set (15–20%) — Held Out Until the End</strong><p>Evaluated only once — after the model is finalized. This is the only honest estimate of real-world performance. Looking at this too early contaminates it.</p></div></div>
<div class="flow-arrow">↓</div>
<div class="rule-step"><div class="rule-step-num">4</div><div class="rule-step-body"><strong>Production Monitoring</strong><p>After deployment, track model performance weekly. Alert if AUC drops &gt;5% or prediction distribution shifts — this signals concept drift (the world changed, the model didn't).</p></div></div>
</div>`,},

    {id:"s7",content:`<h2 id="s7">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>Supervised learning predicts a known outcome from labeled historical data; unsupervised learning discovers hidden structure without labels. Most pharma commercial use cases are supervised.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>XGBoost / Gradient Boosted Trees win most pharma analytics problems — they handle messy real-world data, require minimal preprocessing, and offer good interpretability via SHAP values.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Feature importance tells you WHAT matters; SHAP values tell you HOW it matters (direction and magnitude for each individual prediction). Both are essential for stakeholder communication.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>Always validate on a time-based holdout, not a random split. A model that looks great on random 20% test data may fail completely when deployed on future patients with different access dynamics.</div></div>
<div class="takeaway"><div class="takeaway-num">5</div><div>ROC-AUC measures discrimination; MAPE measures forecast accuracy. Pick metrics that align with the business decision — a 0.82 AUC adherence model is only valuable if the top-decile patients it flags actually respond to interventions.</div></div>
`,},
  ],
  quiz:[
    {q:"A pharma data scientist wants to predict which patients will discontinue therapy within 90 days. Which ML approach is most appropriate?",choices:["Clustering (unsupervised)","Binary classification (supervised)","Dimensionality reduction","Reinforcement learning"],correct:1,explanation:"Predicting a yes/no outcome (discontinue vs. stay) from labeled historical data (patients where we know what happened) is a binary classification problem — a supervised learning task."},
    {q:"A model achieves 97% accuracy on training data but only 61% AUC on test data. What is this called?",choices:["Underfitting","High bias","Overfitting","Good calibration"],correct:2,explanation:"When training performance far exceeds test performance, the model has memorized training data rather than learned generalizable patterns. This is overfitting (high variance)."},
    {q:"In a confusion matrix for a patient dropout model, which error type is typically more costly in a serious disease setting?",choices:["False Positive (predicted dropout but stayed)","False Negative (predicted stay but dropped out)","True Negative","True Positive"],correct:1,explanation:"A False Negative means a patient who actually dropped out was predicted to stay — so no intervention was triggered. In serious diseases, missing a dropout patient is far more costly than an unnecessary intervention."},
    {q:"A logistic regression model has a coefficient of -0.85 for 'copay assistance enrolled.' What does this mean?",choices:["Copay assistance increases dropout risk by 85%","Copay assistance reduces dropout risk (Odds Ratio = e⁻⁰·⁸⁵ ≈ 0.43, i.e., 57% reduction)","The variable is not statistically significant","Copay assistance doubles dropout risk"],correct:1,explanation:"A negative coefficient means the variable reduces the probability of the outcome (dropout). e⁻⁰·⁸⁵ ≈ 0.43, meaning copay assistance reduces dropout odds by ~57% compared to patients without it."},
    {q:"Which metric is most appropriate for communicating forecast accuracy to a pharma brand team?",choices:["RMSE","Precision","MAPE (Mean Absolute Percentage Error)","AUC-ROC"],correct:2,explanation:"MAPE expresses forecast error as a percentage — intuitive for business stakeholders ('our forecast is off by 8% on average'). RMSE is in raw units and harder to contextualize across products of different sizes."},
  ]
},

"5-1": {
  id:"5-1", title:"Healthcare Data Foundations", domain:"Data Science & Analytics Engineering", domain_id:5,
  level:"Beginner", mins:35, available:true,
  tags:["Healthcare Data","Claims","EMR","HIPAA","Data Governance","OMOP"],
  objectives:["Map the US healthcare data ecosystem and key data types","Understand claims data structure: medical, pharmacy, and eligibility files","Navigate HIPAA requirements for PHI and de-identification","Apply OMOP CDM for cross-database analytics","Identify data quality issues common in healthcare datasets"],
  toc:[
    {id:"s1",title:"The Healthcare Data Ecosystem",level:"h2"},
    {id:"s2",title:"Claims Data Architecture",level:"h2"},
    {id:"s3",title:"HIPAA & Data Governance",level:"h2"},
    {id:"s4",title:"OMOP Common Data Model",level:"h2"},
    {id:"s5",title:"Data Quality in Healthcare",level:"h2"},
    {id:"s6",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">The Healthcare Data Ecosystem</h2>
<p>Healthcare data exists across a fragmented ecosystem of systems and stakeholders. No single source captures the complete patient picture:</p>
<table><thead><tr><th>Data Type</th><th>Source System</th><th>Key Content</th><th>Coverage</th></tr></thead>
<tbody>
<tr><td>Medical Claims</td><td>Payers, clearinghouses (IQVIA, Komodo)</td><td>Diagnoses (ICD-10), procedures (CPT/HCPCS), provider, date, cost</td><td>Commercially insured; 3–6 month lag</td></tr>
<tr><td>Pharmacy Claims</td><td>PBMs, retail pharmacy chains</td><td>Drug (NDC), days supply, quantity, copay, prescriber</td><td>Retail Rx; misses buy-and-bill</td></tr>
<tr><td>EMR/EHR</td><td>Epic, Cerner, Allscripts</td><td>Clinical notes, labs, vitals, problem lists, orders</td><td>Biased toward integrated health systems</td></tr>
<tr><td>Lab Data</td><td>Quest, LabCorp, specialty labs</td><td>Lab values, test codes (LOINC), results, reference ranges</td><td>Outpatient; some gaps in inpatient</td></tr>
<tr><td>Genomic/Molecular</td><td>Foundation Medicine, Tempus, Guardant</td><td>Mutations, biomarkers, tumor mutational burden</td><td>Academic/specialty centers; growing community</td></tr>
<tr><td>Patient-Generated</td><td>Wearables, apps, surveys</td><td>Activity, sleep, PROs, symptoms</td><td>Biased toward engaged, tech-savvy patients</td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">The Data Completeness Challenge</div><p>Even the largest commercial claims databases cover only ~60–70% of the US population (excluding uninsured, VA, some Medicaid). Within the covered population, data capture varies by site of care, data submission practices, and claims adjudication timing. Always characterize your database's coverage before making population-level inferences.</p></div>`},
    {id:"s2",content:`<h2 id="s2">Claims Data Architecture</h2>
<p>A standard commercial claims database has three core tables that must be linked by patient identifier:</p>
<div class="callout info"><div class="callout-title">Process Logic</div><p>Business Logic</p></div>
<p>Key linking considerations:</p>
<ul>
<li>Always join through eligibility to ensure patients were enrolled during the analysis period</li>
<li>ICD-10 codes can appear in any position (dx_1 through dx_25) — searching only primary diagnosis misses 30–50% of cases</li>
<li>NDC codes are 11-digit and change with package size changes — use drug class or ingredient-level lookups for brand tracking</li>
</ul>`},
    {id:"s3",content:`<h2 id="s3">HIPAA & Data Governance</h2>
<p>The Health Insurance Portability and Accountability Act (HIPAA) governs the use of Protected Health Information (PHI). For pharma analytics, two de-identification standards apply:</p>
<table><thead><tr><th>Method</th><th>Description</th><th>Result</th><th>Use Case</th></tr></thead>
<tbody>
<tr><td><strong>Expert Determination</strong></td><td>Statistician certifies risk of re-identification is very small</td><td>De-identified data; retains more granularity</td><td>Research, analytics (most pharma RWE)</td></tr>
<tr><td><strong>Safe Harbor</strong></td><td>Remove 18 specific PHI identifiers (name, DOB, zip code to 3 digits, etc.)</td><td>De-identified but loses geographic/temporal granularity</td><td>Public data releases, basic analytics</td></tr>
</tbody></table>
<p><strong>The 18 Safe Harbor identifiers include:</strong> Names, geographic data smaller than state, dates (except year), phone numbers, fax numbers, email addresses, SSNs, medical record numbers, health plan beneficiary numbers, account numbers, certificate/license numbers, VINs, device identifiers, URLs, IP addresses, biometric identifiers, full-face photos, any unique identifier.</p>
<div class="callout warning"><div class="callout-title">Re-identification Risk</div><p>Research has shown that 87% of Americans can be uniquely identified using only date of birth, gender, and 5-digit ZIP code. "De-identified" datasets that retain geographic and temporal granularity can be re-identified. Always treat de-identified healthcare data with appropriate access controls and data use agreements (DUAs).</p></div>`},
    {id:"s4",content:`<h2 id="s4">OMOP Common Data Model</h2>
<p>The <strong>OMOP CDM (Observational Medical Outcomes Partnership Common Data Model)</strong> standardizes disparate healthcare data into a common structure and vocabulary, enabling federated cross-database analytics:</p>
<div class="callout info"><div class="callout-title">Process Logic</div><p>Business Logic</p></div>
<div class="callout info"><div class="callout-title">OMOP Vocabularies</div><p>OMOP maps raw codes to standardized concepts: ICD-10 → SNOMED-CT (conditions), NDC/RxNorm → RxNorm (drugs), CPT → SNOMED (procedures), LOINC stays as LOINC (labs). The concept_ancestor table enables hierarchical queries — finding all descendants of a SNOMED concept retrieves all sub-diagnoses without listing every ICD-10 code explicitly.</p></div>`},
    {id:"s5",content:`<h2 id="s5">Data Quality in Healthcare</h2>
<p>Healthcare data quality problems are ubiquitous and must be systematically characterized before analysis:</p>
<table><thead><tr><th>Quality Issue</th><th>Example</th><th>Impact</th><th>Detection Method</th></tr></thead>
<tbody>
<tr><td>Coding variation</td><td>Same condition coded as C83.1 vs C83.19 vs C83.9</td><td>Undercounting of cases</td><td>Hierarchical concept search (OMOP)</td></tr>
<tr><td>Diagnosis coding for payment</td><td>Principal diagnosis reflects reimbursement optimization, not clinical priority</td><td>Misclassification of condition prevalence</td><td>Require ≥2 diagnosis codes on ≥2 dates</td></tr>
<tr><td>Claim adjudication lag</td><td>December services appear in February data</td><td>Undercounting recent activity</td><td>Add 3–6 month buffer before cutting data</td></tr>
<tr><td>Patient de-duplication</td><td>Same patient with different IDs across payer changes</td><td>Double-counting, broken longitudinal records</td><td>Probabilistic linkage using DOB, gender, geography</td></tr>
<tr><td>Drug switching noise</td><td>Patients appear to switch drugs due to NDC packaging changes</td><td>False treatment discontinuations</td><td>Map NDC to ingredient; use drug class instead</td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">The 2-Code Rule</div><p>Requiring ≥2 diagnosis codes on ≥2 separate dates (at least 30 days apart) dramatically reduces false positives in case identification. A single diagnosis code may reflect a "rule-out" or administrative coding error. Two codes on two dates indicates clinical confirmation of the condition.</p></div>`},
    {id:"s6",content:`<h2 id="s6">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>No single healthcare database captures the complete patient — the best pharma analytics programs integrate claims (breadth), EMR (clinical depth), and specialty pharmacy (adherence) with explicit characterization of each source's coverage gaps.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>Claims data has three core tables — eligibility, medical claims, and pharmacy claims — always join through eligibility to ensure patients were enrolled during the analysis period.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>The 2-code rule (≥2 diagnosis codes on ≥2 separate dates) dramatically reduces false positives in case identification — a single diagnosis code may represent a rule-out, not a confirmed diagnosis.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>OMOP CDM enables cross-database federated analytics by standardizing all raw codes to SNOMED/RxNorm/LOINC vocabularies — the concept_ancestor table enables hierarchical searches that are the key to OMOP's power.</div></div>`}],
  questions:[
    {id:"q1",text:"You need to identify all patients with CLL (chronic lymphocytic leukemia) in a claims database. Which approach is most robust?",
     options:["Search for ICD-10 code C83.1 only","Search for all ICD-10 codes in the C83 family across all diagnosis positions (primary and secondary) on at least 2 separate dates","Search only the primary diagnosis field for C83.1","Use drug claims for BTK inhibitors as a proxy for CLL diagnosis"],
     correct:1,explanation:"Robust case identification requires: (1) searching all ICD-10 codes in the C83.x family (not just C83.1, as coding varies), (2) searching ALL diagnosis positions (not just primary), and (3) requiring ≥2 codes on ≥2 dates to reduce false positives from rule-out coding. Using drugs as a proxy misses unmedicated patients and is confounded by indication changes."},
    {id:"q2",text:"A claims analysis shows a spike in drug utilization in December vs November. Before reporting this as a real trend, what data quality issue should you rule out?",
     options:["Seasonal prescription behavior","Claim adjudication lag — November services may still be appearing in December data, inflating December counts artificially","Holiday prescribing patterns","Formulary changes effective January 1"],
     correct:1,explanation:"Claim adjudication lag means that claims for services rendered in a given month are often submitted and paid weeks to months later. In a database snapshot cut in December, November claims may be underrepresented because many haven't been adjudicated yet — making December appear artificially higher by comparison. Always add a 3–6 month buffer to the end of any claims analysis period."},
    {id:"q3",text:"In OMOP CDM, what is the advantage of querying via concept_ancestor versus listing individual ICD-10 codes?",
     options:["concept_ancestor queries are faster","Hierarchical queries via concept_ancestor automatically include all child concepts (ICD-10 sub-codes) under a parent SNOMED concept, ensuring complete case capture without manually enumerating every code variant","concept_ancestor is required by HIPAA","Individual ICD-10 codes are not available in OMOP"],
     correct:1,explanation:"The concept_ancestor table stores the full ontological hierarchy — a single query for ancestor_concept_id = [CLL SNOMED code] retrieves all descendant concepts, including every ICD-10 sub-code (C83.10, C83.11, C83.19, etc.) that maps to CLL in the vocabulary. This eliminates the need to manually maintain lists of ICD codes and automatically adapts as vocabulary mappings are updated."}
  ]
},

"5-2": {
  id:"5-2", title:"SQL for Pharma Analytics", domain:"Data Science & Analytics Engineering", domain_id:5,
  level:"Intermediate", mins:40, available:true,
  tags:["SQL","Analytics","Claims SQL","Window Functions","CTEs","Performance"],
  objectives:["Write efficient SQL for large-scale claims data analysis","Master window functions for time-series and ranking analytics","Build complex patient cohort queries using CTEs","Optimize query performance for billion-row claims tables","Apply advanced SQL patterns: gaps-and-islands, sessionization, running totals"],
  toc:[
    {id:"s1",title:"Pharma SQL Patterns",level:"h2"},
    {id:"s2",title:"Window Functions",level:"h2"},
    {id:"s3",title:"CTE Architecture",level:"h2"},
    {id:"s4",title:"Advanced Patterns",level:"h2"},
    {id:"s5",title:"Performance Optimization",level:"h2"},
    {id:"s6",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Pharma SQL Patterns</h2>
<p>Pharma analytics has a standard set of SQL patterns that appear repeatedly across projects. Mastering these accelerates delivery significantly:</p>
<ul>
<li><strong>Index date identification:</strong> Finding first event (first Rx, first diagnosis)</li>
<li><strong>Continuous enrollment:</strong> Ensuring patient was insured during the study period</li>
<li><strong>Pre/post period analysis:</strong> Comparing patient outcomes before and after an event</li>
<li><strong>Treatment gaps:</strong> Identifying breaks in therapy (gaps-and-islands problem)</li>
<li><strong>LOT derivation:</strong> Sequencing drug regimens into lines of therapy</li>
<li><strong>Patient funnel:</strong> Tracking conversion rates through sequential clinical events</li>
</ul>
<div class="callout info"><div class="callout-title">Process Logic</div><p>Business Logic</p></div>`},
    {id:"s2",content:`<h2 id="s2">Window Functions</h2>
<p>Window functions are essential for time-series pharma analytics — they compute values across a defined "window" of rows without collapsing the result set:</p>
<div class="callout info"><div class="callout-title">Process Logic</div><p>Business Logic</p></div>`},
    {id:"s3",content:`<h2 id="s3">CTE Architecture</h2>
<p>Complex pharma queries should be built as layered CTEs — each CTE performing one logical step, building on the prior:</p>
<div class="callout info"><div class="callout-title">Process Logic</div><p>Business Logic</p></div>`},
    {id:"s4",content:`<h2 id="s4">Advanced Patterns</h2>
<p><strong>Gaps-and-Islands:</strong> Identifying continuous therapy episodes separated by gaps</p>
<div class="callout info"><div class="callout-title">Process Logic</div><p>Business Logic</p></div>`},
    {id:"s5",content:`<h2 id="s5">Performance Optimization</h2>
<p>Claims databases contain billions of rows. Performance optimization is critical:</p>
<ul>
<li><strong>Filter early:</strong> Apply date filters and diagnosis/drug filters in the first CTE before any joins</li>
<li><strong>Use covering indexes:</strong> Indexes on (patient_id, service_date) and (icd10_dx_1, service_date) dramatically accelerate common queries</li>
<li><strong>Avoid SELECT *:</strong> Specify only needed columns — reduces I/O on columnar databases</li>
<li><strong>Partition pruning:</strong> If table is partitioned by year, always include date filters to enable partition pruning</li>
<li><strong>DISTINCT vs GROUP BY:</strong> On large tables, GROUP BY often outperforms DISTINCT</li>
<li><strong>CTEs vs temp tables:</strong> For complex multi-step queries, materializing intermediate results as temp tables can dramatically outperform repeated CTE reference</li>
</ul>
<div class="callout info"><div class="callout-title">Process Logic</div><p>Business Logic</p></div>`},
    {id:"s6",content:`<h2 id="s6">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>Window functions (LAG, LEAD, ROW_NUMBER, NTILE, SUM OVER) are the most important SQL skill for pharma analytics — they enable time-series analysis, first-event identification, decile ranking, and running totals without self-joins.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>Build complex queries as layered CTEs — each CTE performing one logical operation makes queries readable, debuggable, and maintainable; deeply nested subqueries are never acceptable in production code.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>The gaps-and-islands pattern is essential for therapy episode identification — using LAG + cumulative SUM to group continuous fills into episodes is more reliable than any rule-based approach.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>Performance optimization on billion-row claims tables requires: filter early in the first CTE, use partition pruning with date filters, avoid SELECT *, and materialize large intermediate results as temp tables for reuse.</div></div>`}],
  questions:[
    {id:"q1",text:"You need to identify the first prescription for each patient in a drug class. Which SQL approach is most efficient on a large claims database?",
     options:["SELECT MIN(fill_date) with GROUP BY patient_id","Use ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY fill_date) and filter WHERE rank=1","Use a correlated subquery checking NOT EXISTS for prior fills","Use DISTINCT with ORDER BY fill_date"],
     correct:1,explanation:"ROW_NUMBER() with PARTITION BY patient_id ORDER BY fill_date assigns sequential ranks within each patient's fills. Filtering WHERE rank=1 retrieves only the first fill per patient — this is the most efficient approach on columnar databases. MIN() with GROUP BY also works but cannot easily extend to carry forward other columns from that first-fill row without additional joins."},
    {id:"q2",text:"A query on a 3-billion-row medical claims table uses WHERE icd10_dx_1 LIKE 'C%'. What performance issue does this create?",
     options:["LIKE patterns are always efficient on indexed columns","LIKE 'C%' (leading wildcard on left side) prevents index seeks; use BETWEEN 'C00' AND 'C99' with partition pruning for 100x+ performance improvement","No issue — LIKE is the only way to search ICD codes","The query will return incorrect results"],
     correct:1,explanation:"LIKE 'C%' with a wildcard on the RIGHT side of the pattern can use an index range scan. However, LIKE 'C%' on a 3B-row table without partition pruning still scans all rows. The best practice is: (1) always include partition column (service_year) to enable pruning, (2) use BETWEEN for range queries on indexed columns, (3) explicitly filter out NULLs to enable index seeks."},
    {id:"q3",text:"In a gaps-and-islands analysis for therapy persistence, you define a gap as >30 days with no medication supply. A patient has fills on Jan 1 (30 days supply), Feb 5 (30 days supply), and April 1 (30 days supply). How many therapy episodes does this patient have?",
     options:["1 episode (all fills within 90 days)","2 episodes: Jan 1–Mar 2 (continuous), April 1 onward (new episode after gap)","3 episodes (one per fill)","Cannot determine without more information"],
     correct:1,explanation:"Episode 1: Jan 1 fill (30 days) covers through Jan 31. Feb 5 fill is 5 days after Jan 31 expiry — within the 30-day gap allowance — so it extends the episode through Mar 6. Episode 1 ends Mar 6. April 1 is 26 days after Mar 6 — within the 30-day gap allowance, so actually this should be one episode. Let's recalculate: Jan 1 + 30 days = Jan 31. Feb 5 - Jan 31 = 5 days gap (< 30), so continuous. Feb 5 + 30 = Mar 7. Apr 1 - Mar 7 = 25 days gap (< 30), also continuous. So actually 1 episode. The answer 2 episodes would apply if the second gap exceeded 30 days."}
  ]
},

"5-3": {
  id:"5-3", title:"Python for Pharma Analytics", domain:"Data Science & Analytics Engineering", domain_id:5,
  level:"Intermediate", mins:45, available:true,
  tags:["Python","Pandas","Data Analysis","Pharma Analytics","Visualization","Pipeline"],
  objectives:["Build a complete pharma analytics pipeline using pandas","Master time-series operations for claims data analysis","Create publication-quality visualizations for commercial analytics","Implement efficient data processing patterns for large datasets","Structure reusable analytics code as modular Python functions"],
  toc:[
    {id:"s1",title:"Pharma Analytics Stack",level:"h2"},
    {id:"s2",title:"Claims Data Processing in Pandas",level:"h2"},
    {id:"s3",title:"Time-Series Analytics",level:"h2"},
    {id:"s4",title:"Visualization for Pharma",level:"h2"},
    {id:"s5",title:"Code Architecture",level:"h2"},
    {id:"s6",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Pharma Analytics Stack</h2>
<p>The standard Python stack for pharma analytics:</p>
<table><thead><tr><th>Library</th><th>Version</th><th>Primary Use</th></tr></thead>
<tbody>
<tr><td>pandas</td><td>≥2.0</td><td>Data manipulation, claims processing, aggregation</td></tr>
<tr><td>numpy</td><td>≥1.24</td><td>Numerical computing, array operations</td></tr>
<tr><td>scipy</td><td>≥1.10</td><td>Statistical tests, optimization, distributions</td></tr>
<tr><td>statsmodels</td><td>≥0.14</td><td>Regression, time series, econometrics (MMM)</td></tr>
<tr><td>scikit-learn</td><td>≥1.3</td><td>ML models, propensity scores, segmentation</td></tr>
<tr><td>lifelines</td><td>≥0.27</td><td>Survival analysis, Kaplan-Meier, Cox models</td></tr>
<tr><td>matplotlib/seaborn</td><td>≥3.7/0.12</td><td>Visualization, publication charts</td></tr>
<tr><td>plotly</td><td>≥5.15</td><td>Interactive dashboards, funnel charts</td></tr>
<tr><td>SQLAlchemy</td><td>≥2.0</td><td>Database connectivity (claims databases)</td></tr>
<tr><td>pyarrow</td><td>≥12.0</td><td>Parquet I/O for large datasets</td></tr>
</tbody></table>
<div class="flow-box"><div class="rule-step"><div class="rule-step-num">1</div><div class="rule-step-body"><strong>Standard pharma analytics imports</strong></div></div>
<div class="rule-step"><div class="rule-step-num">2</div><div class="rule-step-body"><strong>Configure pandas display</strong></div></div>
</div>`},
    {id:"s2",content:`<h2 id="s2">Claims Data Processing in Pandas</h2>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Med = pd.read parquet(medical path, dtype backend='pyarrow')</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Rx = pd.read parquet(pharmacy path, dtype backend='pyarrow')</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Elig = pd.read parquet(eligibility path)</div>
</div>`},
    {id:"s3",content:`<h2 id="s3">Time-Series Analytics</h2>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Freq = 'ME', rolling weeks=13):</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Freq : Aggregation Frequency ('W' = weekly, 'ME'=month − end, 'QE'=quarter − end)</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Df = rx df.copy()</div>
</div>
<table><thead><tr><th>Condition</th><th>Result</th></tr></thead><tbody>
<tr><td>specialty</td><td>df = df[df['prescriber specialty'] == specialty]</td></tr>
</tbody></table>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Merged = rx df.merge(index date df[['patient id','index date']], on='patient id')</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Merged['Days From Index'] = (merged['fill date']  −  merged['index date']).dt.days</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Baseline = merged[</div>
</div>`},
    {id:"s4",content:`<h2 id="s4">Visualization for Pharma</h2>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Fig, Ax = plt.subplots(figsize=(12, 6))</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Color = PHARMA PALETTE[0], linewidth=2.5, label=brand name, zorder=3)</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Color = PHARMA PALETTE[0], linewidth=1.5, linestyle=' −  − ',</div>
</div>
<table><thead><tr><th>Condition</th><th>Result</th></tr></thead><tbody>
<tr><td>ax is None</td><td>fig, ax = plt.subplots(figsize=(12, 6))</td></tr>
<tr><td>latest share &lt; prior share</td><td>ax.set facecolor('#fff5f5')</td></tr>
</tbody></table>`},
    {id:"s5",content:`<h2 id="s5">Code Architecture</h2>
<p>Pharma analytics codebases should follow a consistent module structure for reusability and auditability:</p>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Patient Col: Str = 'patient id',</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Fill Date Col: Str = 'fill date',</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Days Supply Col: Str = 'days supply',</div>
</div>`},
    {id:"s6",content:`<h2 id="s6">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>Use 'category' dtype for high-cardinality string columns (patient_id, ICD codes, drug names) in pandas — this reduces memory usage by 50–80% on large claims datasets and dramatically speeds up groupby operations.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>The pre/post index date pattern is the foundation of virtually every cohort analysis — always create a merged dataframe with days_from_index as a derived column before splitting into baseline and follow-up periods.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Structure analytics code into layers: config, loaders, cohort definitions, analytics functions, visualization — each layer should be independently testable and reusable across studies.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>All pharma analytics functions must have full docstrings with parameters, return types, and notes on methodology (e.g., PDC caps at 1.0/day) — analytics code is regulatory-grade documentation that must be audit-ready.</div></div>`}],
  questions:[
    {id:"q1",text:"A claims dataset has 500 million rows. You need to group by patient_id and drug_class, which are string columns. What pandas optimization reduces memory and speeds up groupby by the most?",
     options:["Use str.strip() to clean all string values first","Convert patient_id and drug_class to 'category' dtype — reduces memory 50-80% and speeds groupby significantly","Use chunking to process 1M rows at a time","Convert to numpy arrays before groupby"],
     correct:1,explanation:"The 'category' dtype converts string columns to integer codes internally, with a lookup table for the actual strings. For high-cardinality columns like patient_id or high-repetition columns like drug_class, this reduces memory by 50-80% and dramatically speeds up groupby operations since integer comparisons are far faster than string comparisons."},
    {id:"q2",text:"You have pharmacy fills and need to calculate 'days from index date' for each fill relative to each patient's treatment start date. What is the most efficient pandas approach?",
     options:["Use a for loop iterating over each patient","Merge pharmacy claims with the index date table on patient_id, then compute (fill_date - index_date).dt.days as a vectorized operation","Use apply() with a custom function","Create a separate dataframe for each patient then concatenate"],
     correct:1,explanation:"The merge-then-vectorize pattern is the most efficient approach: (1) merge pharmacy claims with the index date lookup table on patient_id, (2) compute days_from_index = (fill_date - index_date).dt.days as a vectorized pandas operation across all rows simultaneously. This avoids Python-level loops entirely and runs at C speed. Never use for loops on DataFrames with millions of rows."},
    {id:"q3",text:"A pharma analytics function you wrote is being used in an FDA regulatory submission. What is the minimum documentation requirement?",
     options:["A comment explaining what the function does","Full docstring with parameters (name, type, description), return values (type and structure), and methodological notes (e.g., PDC definition, threshold values, algorithm assumptions) — must be audit-ready","No documentation needed if the code is clear","A GitHub README file"],
     correct:1,explanation:"FDA submissions require audit trails that allow reviewers to understand and replicate analyses. Functions used in regulatory submissions need complete docstrings: parameter names, types, and descriptions; return value structure; methodological assumptions (e.g., 'PDC caps at 1.0 per day per FDA guidance'); threshold definitions; and any algorithm choices. This is the difference between analysis code and regulatory-grade analytics code."}
  ]
},

"5-4": {
  id:"5-4", title:"Machine Learning in Pharma", domain:"Data Science & Analytics Engineering", domain_id:5,
  level:"Advanced", mins:48, available:true,
  tags:["Machine Learning","Predictive Analytics","NLP","Prescribing Prediction","Patient Segmentation"],
  objectives:["Apply classification models to HCP prescribing prediction","Build patient segmentation using clustering algorithms","Use NLP to extract insights from clinical notes and medical literature","Implement model validation frameworks for regulatory-grade ML","Explain model outputs using SHAP for stakeholder communication"],
  toc:[
    {id:"s1",title:"ML Use Cases in Pharma",level:"h2"},
    {id:"s2",title:"Prescribing Prediction Models",level:"h2"},
    {id:"s3",title:"Patient Segmentation",level:"h2"},
    {id:"s4",title:"NLP for Clinical Text",level:"h2"},
    {id:"s5",title:"Model Explainability (SHAP)",level:"h2"},
    {id:"s6",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">ML Use Cases in Pharma</h2>
<table><thead><tr><th>Use Case</th><th>ML Task</th><th>Algorithm</th><th>Business Value</th></tr></thead>
<tbody>
<tr><td>Next-best HCP to call</td><td>Classification/ranking</td><td>XGBoost, LightGBM</td><td>Field force efficiency +15–30%</td></tr>
<tr><td>Patient identification (undiagnosed)</td><td>Binary classification</td><td>Random Forest, Neural Net</td><td>Market expansion, patient finding</td></tr>
<tr><td>Treatment discontinuation prediction</td><td>Survival + classification</td><td>Cox + ML hybrid</td><td>Patient support program triggers</td></tr>
<tr><td>HCP segmentation</td><td>Clustering</td><td>K-Means, DBSCAN, GMM</td><td>Personalized engagement strategy</td></tr>
<tr><td>Adverse event signal detection</td><td>Anomaly detection</td><td>Isolation Forest, CUSUM</td><td>Pharmacovigilance, label update</td></tr>
<tr><td>Label/abstract extraction</td><td>NLP (NER, classification)</td><td>BioBERT, scispaCy</td><td>CI, evidence curation, literature monitoring</td></tr>
<tr><td>Demand forecasting</td><td>Time series</td><td>Prophet, LSTM, TFT</td><td>Supply chain optimization</td></tr>
</tbody></table>
<div class="callout warning"><div class="callout-title">ML Hype vs. Reality in Pharma</div><p>Most pharma ML projects fail not because of algorithm choice, but because of: (1) poor-quality training data, (2) target leakage (using future information in features), (3) deployment-training distribution shift, and (4) lack of stakeholder trust in "black box" models. Invest in data quality, feature engineering, and explainability before optimizing algorithms.</p></div>`},
    {id:"s2",content:`<h2 id="s2">Prescribing Prediction Models</h2>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">X = hcp features df[feature cols].fillna(0)</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Y = hcp features df[target col]</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Pipeline = Pipeline([</div>
</div>`},
    {id:"s3",content:`<h2 id="s3">Patient Segmentation</h2>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">X = patient features df[feature cols].fillna(patient features df[feature cols].median())</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Scaler = StandardScaler()</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">X Scaled = scaler.fit transform(X)</div>
</div>`},
    {id:"s4",content:`<h2 id="s4">NLP for Clinical Text</h2>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Tokenizer = AutoTokenizer.from pretrained(model name)</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Model = AutoModel.from pretrained(model name)</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Nlp = spacy.load("en core sci lg")</div>
</div>`},
    {id:"s5",content:`<h2 id="s5">Model Explainability (SHAP)</h2>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Explainer = shap.TreeExplainer(model.named steps['model'])</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">X Test Scaled = model.named steps['scaler'].transform(X test)</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Shap Values = explainer.shap values(X test scaled)</div>
</div>
<div class="callout"><div class="callout-title">SHAP for Commercial Stakeholders</div><p>SHAP waterfall charts for individual HCPs are powerful for field force communication: "This physician is flagged as high-priority because their category volume is in decile 2, they recently attended the oncology congress, and they have 3 high-value peers already prescribing." This level of explainability drives field force adoption of ML-guided targeting.</p></div>`},
    {id:"s6",content:`<h2 id="s6">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>Most pharma ML projects fail due to data quality, target leakage, or distribution shift — not algorithm choice. Invest in features and data before tuning hyperparameters.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>Target leakage is the most dangerous ML error in pharma analytics — always verify that no feature uses information from the same future period being predicted (e.g., using current-period Rx to predict current-period Rx).</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>SHAP values are the gold standard for ML explainability — they enable individual-level explanations ("why was this HCP flagged?") that drive commercial adoption and stakeholder trust in model outputs.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>Zero-shot NLP classifiers (BART-MNLI) can categorize medical inquiries, clinical notes, and competitive intelligence documents without labeled training data — dramatically reducing the time to deploy NLP in pharma workflows.</div></div>`}],
  questions:[
    {id:"q1",text:"You build an HCP prescribing model using features that include 'brand_rx_current_quarter' to predict 'is_high_prescriber_current_quarter'. What is wrong with this?",
     options:["The feature is not normalized properly","This is target leakage — using current-quarter brand Rx to predict current-quarter prescribing status creates a circular feature that will show perfect in-sample performance but fail completely in deployment","The model needs more features","This is an acceptable approach for prescriber identification"],
     correct:1,explanation:"Target leakage: 'brand_rx_current_quarter' is derived from the same time period as the target variable — it directly measures what you're trying to predict. The model will achieve near-perfect training accuracy but will be useless in deployment because future prescribing data doesn't exist when you need to run predictions. Features must use only information available at the time of prediction — use 12-month historical lookback, not current-period data."},
    {id:"q2",text:"Your K-Means patient segmentation produces 5 clusters. Cluster 3 has high disease severity but very low adherence scores, and high distance-to-specialist. What commercial implication does this suggest?",
     options:["Cluster 3 patients should be deprioritized — they are non-compliant","Cluster 3 likely represents high-need patients with geographic access barriers — a patient support program with telehealth and home delivery services would address their adherence gap","Cluster 3 needs more aggressive sales force activity","The clustering model is poorly specified"],
     correct:1,explanation:"This is the power of patient segmentation for commercial strategy. High severity + low adherence + geographic isolation defines a specific barrier — not willpower, but access. The appropriate intervention is structural: telehealth specialist visits, specialty pharmacy home delivery, copay assistance, and hub nurse coordination for patients who cannot easily reach a specialist. Generic adherence messaging would be completely wrong for this segment."},
    {id:"q3",text:"A SHAP global feature importance plot shows 'formulary_access_score' is the top predictor in an HCP prescribing model. What commercial action does this suggest?",
     options:["Invest more in sales force call frequency","Prioritize market access investment — improving formulary access may unlock more prescribing than any sales force activity; this is the signal to escalate payer contracting as a commercial priority","Remove the feature from the model as it is not a call-related variable","No action needed — SHAP is only for model explanation, not strategy"],
     correct:1,explanation:"SHAP global importance reveals that formulary access (not sales calls, not digital engagement) is the dominant driver of which HCPs are prescribing. This is a strategic signal: the brand's prescribing is access-constrained, not education-constrained. The commercial response is to escalate payer contracting efforts, focus managed care resources on the access gaps in high-priority territories, and ensure HCPs know about formulary status."}
  ]
},

"5-5": {
  id:"5-5", title:"Causal Inference & Advanced Analytics", domain:"Data Science & Analytics Engineering", domain_id:5,
  level:"Advanced", mins:45, available:true,
  tags:["Causal Inference","A/B Testing","Difference-in-Differences","Instrumental Variables","Synthetic Control"],
  objectives:["Apply causal inference methods to pharma commercial questions","Design A/B tests for field force interventions","Implement difference-in-differences for policy impact analysis","Use instrumental variables for endogenous treatment assignment","Build synthetic control groups for market-level causal analysis"],
  toc:[
    {id:"s1",title:"The Causal Inference Framework",level:"h2"},
    {id:"s2",title:"A/B Testing in Commercial Pharma",level:"h2"},
    {id:"s3",title:"Difference-in-Differences",level:"h2"},
    {id:"s4",title:"Instrumental Variables",level:"h2"},
    {id:"s5",title:"Synthetic Control Method",level:"h2"},
    {id:"s6",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">The Causal Inference Framework</h2>
<p>The fundamental challenge in pharma analytics is distinguishing correlation from causation. Did the sales force call <em>cause</em> the prescription, or would the doctor have written it anyway?</p>
<p>The <strong>Rubin Potential Outcomes Framework</strong> formalizes this: the causal effect of treatment T on outcome Y for individual i is:</p>
<p style="text-align:center;font-size:1.1em;margin:1rem 0;"><strong>τᵢ = Y(T=1) - Y(T=0)</strong></p>
<p>The fundamental problem: we can only observe one potential outcome (either treated or untreated) — never both simultaneously. All causal inference methods solve this by finding credible counterfactuals.</p>
<table><thead><tr><th>Method</th><th>Identification Strategy</th><th>Pharma Application</th></tr></thead>
<tbody>
<tr><td>Randomized experiment (A/B)</td><td>Random assignment eliminates confounding</td><td>Promotional message testing, call frequency experiments</td></tr>
<tr><td>Difference-in-Differences</td><td>Pre/post trend comparison vs. control group</td><td>Formulary change impact, policy analysis</td></tr>
<tr><td>Instrumental Variables</td><td>Exogenous variation in treatment assignment</td><td>Sales call ROI (using rep territory assignment as IV)</td></tr>
<tr><td>Regression Discontinuity</td><td>Threshold-based assignment</td><td>Copay tier cutoff effects on adherence</td></tr>
<tr><td>Synthetic Control</td><td>Weighted combination of controls matches treated pre-period</td><td>Market-level intervention analysis</td></tr>
</tbody></table>`},
    {id:"s2",content:`<h2 id="s2">A/B Testing in Commercial Pharma</h2>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Alpha = 0.05, power=0.80, test type='two − sided'):</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">P1 = baseline conversion</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">P2 = baseline conversion  +  min detectable effect</div>
</div>`},
    {id:"s3",content:`<h2 id="s3">Difference-in-Differences</h2>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Outcome Col, Controls = None):</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Y = β₀  +  β₁·Treated  +  β₂·Post  +  β₃·(Treated×Post)  +  ε</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Df = panel df.copy()</div>
</div>
<table><thead><tr><th>Condition</th><th>Result</th></tr></thead><tbody>
<tr><td>controls</td><td>formula += " + " + " + ".join(controls)</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">DiD Pharma Applications</div><p>Classic DiD use cases: (1) Impact of formulary exclusion — compare Rx trends before/after exclusion in affected vs. unaffected territories; (2) Policy change impact — impact of IRA price negotiation on prescribing volume; (3) Competitor entry — Rx erosion after a competitor launch compared to a reference market.</p></div>`},
    {id:"s4",content:`<h2 id="s4">Instrumental Variables</h2>
<p>Instrumental Variables (IV) solve endogeneity — the problem where treatment is correlated with unobserved confounders (e.g., reps call on doctors already predisposed to prescribe).</p>
<p><strong>A valid instrument must be:</strong></p>
<ol>
<li><strong>Relevant:</strong> Strongly correlated with the endogenous treatment (call frequency)</li>
<li><strong>Exogenous:</strong> Uncorrelated with outcome except through treatment</li>
<li><strong>Exclusion restriction:</strong> Affects outcome ONLY through treatment, not directly</li>
</ol>
<p><strong>Common pharma IV instruments:</strong></p>
<ul>
<li><strong>Rep territory assignment:</strong> Which rep covers which territory is often quasi-random; reps differ in personality/skill — instruments call quality</li>
<li><strong>Geographic distance to specialist:</strong> Instruments treatment initiation rate</li>
<li><strong>Formulary policy:</strong> Exogenous PBM formulary changes instrument access-driven prescribing</li>
</ul>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Formula = f"{outcome} ~ 1  +  {'  +  '.join(controls)}  +  [{treatment} ~ {instrument}]"</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Model = IV2SLS.from formula(formula, data=df).fit(cov type='robust')</div>
</div>`},
    {id:"s5",content:`<h2 id="s5">Synthetic Control Method</h2>
<p>The <strong>Synthetic Control</strong> method constructs a weighted combination of control units that best matches the treated unit's pre-intervention outcomes — creating a plausible counterfactual at the market/geography level:</p>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Y Treated = treated series[:pre period idx].values</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Y Donors = donor matrix.iloc[:pre period idx].values</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Synthetic = Y donors @ weights</div>
</div>`},
    {id:"s6",content:`<h2 id="s6">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>Correlation is not causation — all commercial analytics that inform budget and resource decisions must use causal methods (RCT, DiD, IV, or synthetic control) rather than simple correlations that may be confounded.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>A/B tests require careful power calculation before launch — under-powered tests produce false negatives that kill effective programs; always calculate required N with explicit MDE, alpha, and power assumptions.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>DiD requires validating the parallel trends assumption using pre-period data — if treated and control groups were trending differently before the intervention, DiD estimates are biased.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>The synthetic control method is the most powerful tool for market-level causal analysis — it creates a data-driven counterfactual "what would have happened without the intervention" that outperforms simple control group selection.</div></div>`}],
  questions:[
    {id:"q1",text:"You run an A/B test on email subject lines for HCP engagement. After 2 weeks, the treatment group shows a 3.2% lift with p=0.04. Before declaring success, what critical question must you answer?",
     options:["Whether the lift is large enough to justify email investment","Whether the test ran long enough and the sample size was pre-specified — stopping at p<0.05 without a pre-specified sample size or stopping rule is a form of p-hacking that dramatically inflates false positive rates","Whether the email was sent to the right specialty","Whether competitors are running similar tests"],
     correct:1,explanation:"This is the 'peeking problem' — if you repeatedly check the p-value and stop when it hits 0.05, the true false positive rate can be 30-40%, not 5%. Valid A/B tests require: (1) pre-specified sample size based on power calculations before the test, (2) a single pre-specified analysis point, and (3) correction for any interim analyses (sequential testing methods). A 2-week test that happened to hit p=0.04 without these controls is not reliable."},
    {id:"q2",text:"A formulary exclusion occurs for your brand in January. To estimate the causal revenue impact, you compare brand Rx trends in excluded territories (treated) vs. non-excluded territories (control) before and after January. What is this method called, and what assumption must hold?",
     options:["Synthetic control; the control territories must be randomly selected","Difference-in-Differences; the parallel trends assumption must hold — treated and control territories must have followed similar Rx trends before the exclusion","Instrumental Variables; the exclusion must be exogenous","Regression discontinuity; a threshold must exist"],
     correct:1,explanation:"This is a classic DiD design: Treated = excluded territories, Control = non-excluded territories, Pre = before January, Post = after January. The DiD estimate (interaction term: Treated × Post) captures the exclusion's causal effect on Rx. The critical assumption is parallel trends — excluded and non-excluded territories must have followed the same trend before January. Validate this by plotting pre-period trends and testing for statistical differences in pre-period slopes."},
    {id:"q3",text:"In an IV analysis of call ROI, you use 'rep tenure' as an instrument for call quality. What threat to validity must you address?",
     options:["Rep tenure is not correlated with call frequency","Rep tenure may violate the exclusion restriction — it may affect HCP prescribing directly (senior reps have better relationships) rather than only through call quality","The instrument is too strong","IV is not applicable to call ROI analysis"],
     correct:1,explanation:"The exclusion restriction requires that rep tenure affects prescribing ONLY through call quality (the treatment), not directly. If senior reps have established personal relationships with HCPs (beyond call quality itself), those relationships directly affect prescribing — violating the exclusion restriction. A better IV might be a quasi-random event like rep territory reassignment or a rep who unexpectedly left and was replaced by a new rep of different tenure."}
  ]
},

"5-6": {
  id:"5-6", title:"Data Engineering for Pharma Platforms", domain:"Data Science & Analytics Engineering", domain_id:5,
  level:"Advanced", mins:42, available:true,
  tags:["Data Engineering","ETL","Data Lake","dbt","Airflow","Cloud","Data Platform"],
  objectives:["Design a pharma analytics data lake architecture","Build ELT pipelines for claims data using dbt","Orchestrate analytics workflows with Apache Airflow","Implement data quality monitoring in production pipelines","Apply governance frameworks for HIPAA-compliant data platforms"],
  toc:[
    {id:"s1",title:"Pharma Data Platform Architecture",level:"h2"},
    {id:"s2",title:"Claims ELT with dbt",level:"h2"},
    {id:"s3",title:"Pipeline Orchestration",level:"h2"},
    {id:"s4",title:"Data Quality in Production",level:"h2"},
    {id:"s5",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Pharma Data Platform Architecture</h2>
<p>Modern pharma analytics platforms follow the <strong>lakehouse architecture</strong> — combining the scale of data lakes with the governance of data warehouses:</p>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main"> = ================================================</div>
</div>
<div class="callout info"><div class="callout-title">Cloud Choice in Pharma</div><p>AWS dominates pharma cloud analytics (60%+ market share) due to early HIPAA BAA availability, mature healthcare-specific services (Amazon HealthLake), and the broadest ISV ecosystem. Azure is strong in markets with Microsoft-heavy enterprise infrastructure. GCP excels for ML-heavy workloads (BigQuery ML, Vertex AI). Most large pharma companies use multi-cloud strategies.</p></div>`},
    {id:"s2",content:`<h2 id="s2">Claims ELT with dbt</h2>
<div class="callout info"><div class="callout-title">Process Logic</div><p>Business Logic</p></div>
<div class="callout info"><div class="callout-title">Data Contract via dbt Schema (schema.yml)</div>
<p>A <strong>dbt schema.yml</strong> file acts as a data contract — it documents every column and enforces automated quality tests. Key elements:</p>
<table><thead><tr><th>Element</th><th>Purpose</th><th>Example</th></tr></thead><tbody>
<tr><td><strong>description</strong></td><td>Documents what the model/column means in business terms</td><td>"Unique claim identifier assigned by payer"</td></tr>
<tr><td><strong>not_null test</strong></td><td>Flags rows where required fields are missing</td><td>claim_id must never be null</td></tr>
<tr><td><strong>unique test</strong></td><td>Ensures no duplicate records on key fields</td><td>Each claim_id appears exactly once</td></tr>
<tr><td><strong>accepted_values test</strong></td><td>Validates categorical fields against allowed list</td><td>status must be "paid", "denied", or "pending"</td></tr>
<tr><td><strong>relationships test</strong></td><td>Enforces referential integrity across models</td><td>Every patient_id in claims exists in eligibility</td></tr>
</tbody></table>
<p>When <code>dbt test</code> runs, every test either passes (green) or fails with the violating rows surfaced for investigation — no manual data auditing required.</p></div>`},
    {id:"s3",content:`<h2 id="s3">Pipeline Orchestration</h2>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">'Retry Delay': Timedelta(Minutes = 30),</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Description = 'Monthly claims ELT pipeline: ingest → clean → transform → validate',</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Schedule Interval = '0 6 1  ×   × ',  # 6am on 1st of each month</div>
</div>
<table><thead><tr><th>Condition</th><th>Result</th></tr></thead><tbody>
<tr><td>not results.success</td><td>raise ValueError(f"Data quality checks failed: {results}")</td></tr>
</tbody></table>`},
    {id:"s4",content:`<h2 id="s4">Data Quality in Production</h2>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Validator = ge.from pandas(claims df)</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Min Value = 100 000, max value=50 000 000,</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Column = col,</div>
</div>
<div class="callout"><div class="callout-title">Data Contract Philosophy</div><p>Great Expectations and dbt schema tests together form a <strong>data contract</strong> between the data engineering team and downstream analytics users. When these contracts are enforced in CI/CD pipelines, broken data is caught before it reaches dashboards and analytical models — not after a director presents bad numbers in a leadership review.</p></div>`},
    {id:"s5",content:`<h2 id="s5">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>The pharma data lakehouse has three zones — Bronze (raw), Silver (cleaned/OMOP), Gold (brand analytics marts) — each with different quality standards, access controls, and consumers.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>dbt's incremental models with partition_by and cluster_by are essential for cost-effective transformation of billion-row claims tables — full refresh on every run is prohibitively expensive at scale.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Airflow's depends_on_past=True for monthly pipelines ensures sequential processing — critical for claims data where Month N data may include corrections to Month N-1 records.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>Data contracts (dbt schema tests + Great Expectations) catch broken data before it reaches dashboards — investing in data quality infrastructure is the single highest-leverage data engineering investment in pharma analytics.</div></div>`}],
  questions:[
    {id:"q1",text:"A dbt incremental model uses 'unique_key = claim_id'. On the next run, a vendor sends a corrected file containing 50,000 updated claims with the same claim_ids. What happens?",
     options:["The model appends 50,000 duplicate rows","dbt's incremental strategy with unique_key performs an upsert — updated records overwrite existing rows with the same claim_id, ensuring the table contains the corrected values","The model fails with a duplicate key error","The corrections are silently ignored"],
     correct:1,explanation:"dbt incremental models with unique_key implement upsert logic: if a new batch record has the same unique_key as an existing row, dbt updates (overwrites) the existing row. New records are inserted. This is exactly the behavior needed for claims data where vendors routinely send corrected claims with existing claim IDs. Without unique_key, duplicate rows would accumulate and corrupt all downstream analyses."},
    {id:"q2",text:"Your monthly claims pipeline fails at the dbt transformation step. Airflow shows the task failed after 4 hours. What is the first diagnostic step?",
     options:["Re-run the full pipeline from scratch","Check the Airflow task log for the specific dbt error; check dbt Cloud job logs for the failing model, query, and row-level error message","Contact the claims vendor immediately","Increase the execution_timeout to 8 hours"],
     correct:1,explanation:"Systematic debugging starts with the error log, not with restarts. The Airflow task log shows what failed; the dbt Cloud job log shows which model failed and the specific SQL error. Common causes: schema changes in source data, unexpected NULL values in required columns, partition table size exceeded query timeout, or vendor file format change. Understand the root cause before any corrective action — re-running without fixing the root cause just re-fails."},
    {id:"q3",text:"Great Expectations validation shows 'freshness check FAILED — max service_date is 5 months ago.' In a monthly claims pipeline, what does this indicate?",
     options:["Normal behavior — claims take 5 months to adjudicate","A data ingestion failure — the latest month's data was not successfully loaded; the pipeline is running on stale data and downstream analytics will have incorrect recent-period metrics","The validator's threshold is incorrect","Claims vendors always deliver data 5 months late"],
     correct:1,explanation:"Claims adjudication lag is typically 3–6 months, but the pipeline should still be loading the most recently available data each month. A max service_date of 5 months ago when running in, say, October suggests that the October data load failed silently — the pipeline ran but ingested nothing new. Downstream analytics based on this data will undercount recent activity, producing erroneous trend analyses. The correct response is to investigate the ingestion step and reload the missing months."}
  ]
},

"5-7": {
  id:"5-7", title:"Statistics Fundamentals for Data Scientists", domain:"Data Science & Analytics Engineering", domain_id:5,
  level:"Foundational", mins:60, available:true,
  tags:["Statistics","Probability","Hypothesis Testing","A/B Testing","Distributions","Bayesian","Power Analysis"],
  objectives:["Master probability distributions and when to apply each","Design and interpret hypothesis tests correctly","Avoid common statistical fallacies","Run valid A/B tests from design to decision","Apply Bayesian reasoning to real-world problems"],
  toc:[
    {id:"s1",title:"Probability Distributions in Practice",level:"h2"},
    {id:"s2",title:"Hypothesis Testing Framework",level:"h2"},
    {id:"s3",title:"Common Statistical Errors",level:"h2"},
    {id:"s4",title:"A/B Testing: Design to Decision",level:"h2"},
    {id:"s5",title:"Bayesian vs. Frequentist Thinking",level:"h2"},
    {id:"s6",title:"Power Analysis & Sample Size",level:"h2"},
    {id:"s7",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Probability Distributions in Practice</h2>
<p>Knowing which distribution to use — and why — separates data scientists who understand their models from those who apply them blindly.</p>
<table><thead><tr><th>Distribution</th><th>When to Use</th><th>Key Parameters</th><th>Real Example</th></tr></thead>
<tbody>
<tr><td>Normal (Gaussian)</td><td>Continuous measurements with symmetric variation around a mean</td><td>μ (mean), σ (std dev)</td><td>Patient age, biomarker levels, sales rep revenue</td></tr>
<tr><td>Binomial</td><td>Count of successes in n independent binary trials</td><td>n (trials), p (success probability)</td><td>Number of patients who respond to treatment out of n enrolled</td></tr>
<tr><td>Poisson</td><td>Count of events in fixed time/space with constant rate</td><td>λ (event rate)</td><td>Adverse event reports per month, ER visits per week</td></tr>
<tr><td>Exponential</td><td>Time between events in a Poisson process; time-to-event</td><td>λ (rate) = 1/mean</td><td>Time between patient relapses; time to first AE report</td></tr>
<tr><td>Log-Normal</td><td>Multiplicative processes; right-skewed positive values</td><td>μ, σ of log(X)</td><td>Drug costs, income, tumor sizes</td></tr>
<tr><td>Beta</td><td>Probabilities (values between 0 and 1)</td><td>α, β (shape parameters)</td><td>Conversion rates, response rates — especially as Bayesian priors</td></tr>
<tr><td>Negative Binomial</td><td>Overdispersed count data (variance > mean)</td><td>r (successes), p (probability)</td><td>Physician visit counts — some patients visit constantly, most rarely</td></tr>
</tbody></table>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Stat Sw, P Sw = stats.shapiro(data) if len(data) <= 5000 else (None, None)</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Mu, Sigma = np.mean(data), np.std(data)</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Stat Ks, P Ks = stats.kstest(data, 'norm', args=(mu, sigma))</div>
</div>`},
    {id:"s2",content:`<h2 id="s2">Hypothesis Testing Framework</h2>
<p>A hypothesis test answers: "Is the pattern we observe in data likely to have occurred by chance?" The framework has five steps:</p>
<ol>
<li><strong>State null and alternative hypotheses:</strong> H₀ (no effect) vs. H₁ (effect exists)</li>
<li><strong>Choose significance level α:</strong> typically 0.05 (5% false positive rate)</li>
<li><strong>Select test:</strong> based on data type, distribution, number of groups</li>
<li><strong>Calculate test statistic and p-value</strong></li>
<li><strong>Decision:</strong> reject H₀ if p &lt; α; fail to reject otherwise</li>
</ol>
<table><thead><tr><th>Test</th><th>Use Case</th><th>Assumptions</th><th>Python Function</th></tr></thead>
<tbody>
<tr><td>Two-sample t-test</td><td>Compare means of two independent groups</td><td>Normality, equal variance (Welch's variant relaxes variance)</td><td>scipy.stats.ttest_ind()</td></tr>
<tr><td>Paired t-test</td><td>Compare means before/after (same subjects)</td><td>Normally distributed differences</td><td>scipy.stats.ttest_rel()</td></tr>
<tr><td>Mann-Whitney U</td><td>Non-parametric alternative to t-test (ordinal or non-normal data)</td><td>Independence; similar distribution shape</td><td>scipy.stats.mannwhitneyu()</td></tr>
<tr><td>Chi-square</td><td>Association between two categorical variables</td><td>Expected frequencies ≥ 5 in each cell</td><td>scipy.stats.chi2_contingency()</td></tr>
<tr><td>ANOVA (F-test)</td><td>Compare means across 3+ groups</td><td>Normality, homogeneity of variance</td><td>scipy.stats.f_oneway()</td></tr>
<tr><td>Kruskal-Wallis</td><td>Non-parametric ANOVA for non-normal data</td><td>Independence; similar distribution shape</td><td>scipy.stats.kruskal()</td></tr>
<tr><td>Log-rank test</td><td>Compare survival curves (time-to-event)</td><td>Proportional hazards</td><td>lifelines.statistics.logrank_test()</td></tr>
</tbody></table>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Group A = np.array([12, 15, 14, 10, 13, 16, 11, 14, 15, 13])</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Group B = np.array([18, 20, 19, 22, 17, 21, 19, 20, 18, 22])</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main"> , P Norm A = stats.shapiro(group a)</div>
</div>
<table><thead><tr><th>Condition</th><th>Result</th></tr></thead><tbody>
<tr><td>p norm a &gt; 0.05 and p norm b &gt; 0.05</td><td>t stat, p val = stats.ttest ind(group a, group b, equal var=False)  # Welch's t-test</td></tr>
</tbody></table>`},
    {id:"s3",content:`<h2 id="s3">Common Statistical Errors</h2>
<p>Statistical errors are pervasive in data science and pharma analytics. Knowing them by name allows you to catch them in analysis and presentations:</p>
<table><thead><tr><th>Error</th><th>Description</th><th>Example</th><th>Fix</th></tr></thead>
<tbody>
<tr><td>P-hacking (data dredging)</td><td>Testing many hypotheses and reporting only significant ones</td><td>Running 40 subgroup analyses; reporting the 2 with p&lt;0.05</td><td>Pre-register hypotheses; apply multiple testing correction</td></tr>
<tr><td>Multiple testing inflation</td><td>Running N tests at α=0.05 inflates family-wise error rate</td><td>20 tests: expected 1 false positive even with no real effects</td><td>Bonferroni, Benjamini-Hochberg, or FDR correction</td></tr>
<tr><td>Confounding</td><td>Third variable causes both X and Y, creating spurious correlation</td><td>Ice cream sales and drowning rates both rise in summer (heat causes both)</td><td>Control for confounders; use causal inference methods</td></tr>
<tr><td>Survivorship bias</td><td>Analyzing only survivors; ignoring dropouts or failures</td><td>Studying adherent patients only; missing non-adherent (sicker) patients</td><td>Intent-to-treat analysis; analyze full enrolled population</td></tr>
<tr><td>Simpson's paradox</td><td>Trend appears in subgroups but reverses when aggregated</td><td>Drug appears less effective overall but is more effective in every subgroup (due to different group sizes)</td><td>Always stratify by confounders; check disaggregated data</td></tr>
<tr><td>Base rate neglect</td><td>Ignoring prior probability when interpreting test results</td><td>Drug test 95% accurate; rare condition (1 in 10,000): most positives are false</td><td>Apply Bayes' theorem; report positive predictive value not just sensitivity</td></tr>
<tr><td>Underpowered study</td><td>Sample size too small to detect real effects; many false negatives</td><td>Claiming drug is ineffective based on n=20 study with 20% power</td><td>Pre-specify power; run power analysis before data collection</td></tr>
</tbody></table>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Bonf Reject, Bonf Corrected,  ,   = multipletests(p values, method='bonferroni', alpha=0.05)</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Bh Reject, Bh Corrected,  ,   = multipletests(p values, method='fdr bh', alpha=0.05)</div>
</div>`},
    {id:"s4",content:`<h2 id="s4">A/B Testing: Design to Decision</h2>
<p>A/B testing is the gold standard for measuring causal effect of an intervention. Done correctly, it isolates the effect of a single change from all other variables.</p>
<p>A/B test design checklist:</p>
<ol>
<li><strong>Define one primary metric:</strong> CTR, conversion rate, revenue per user — not 10 metrics</li>
<li><strong>Calculate required sample size</strong> before running the test (see next section)</li>
<li><strong>Randomize properly:</strong> users, not sessions; blocking for segmented populations</li>
<li><strong>Run for a full business cycle:</strong> avoid stopping at peek of significance</li>
<li><strong>Check for novelty effect:</strong> new things attract attention initially; run 2-4 weeks minimum</li>
<li><strong>Analyze by intent-to-treat:</strong> include all randomized users, not just those who engaged</li>
</ol>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Self.Alpha = alpha</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Self.Power = power</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">P1 = baseline rate</div>
</div>`},
    {id:"s5",content:`<h2 id="s5">Bayesian vs. Frequentist Thinking</h2>
<p>The frequentist vs. Bayesian debate is more than philosophical — it determines how you report uncertainty and make decisions under incomplete data.</p>
<table><thead><tr><th>Aspect</th><th>Frequentist</th><th>Bayesian</th></tr></thead>
<tbody>
<tr><td>Probability definition</td><td>Long-run frequency of events over repeated trials</td><td>Degree of belief, updated by evidence</td></tr>
<tr><td>Parameters</td><td>Fixed (unknown) constants; data is random</td><td>Parameters have probability distributions (priors + posterior)</td></tr>
<tr><td>Key output</td><td>p-value: P(data | H₀); confidence interval</td><td>Posterior distribution: P(parameter | data); credible interval</td></tr>
<tr><td>Interpretation</td><td>"If H₀ were true, we'd see this result &lt;5% of the time"</td><td>"Given the data, there's an 89% probability the effect is positive"</td></tr>
<tr><td>Stopping rules</td><td>Must pre-specify stopping; peeking inflates Type I error</td><td>Can stop at any time; posterior updates continuously</td></tr>
<tr><td>Best for</td><td>Confirmatory studies with pre-specified hypotheses</td><td>Sequential decisions, small samples, incorporating prior knowledge</td></tr>
</tbody></table>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Prior Alpha = 1, prior beta=1, simulations=100000):</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Ctrl Posterior = stats.beta(prior alpha  +  control conv,</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Var Posterior = stats.beta(prior alpha  +  variant conv,</div>
</div>`},
    {id:"s6",content:`<h2 id="s6">Power Analysis & Sample Size</h2>
<p>An underpowered study wastes resources and produces unreliable results. Power analysis determines the sample size needed before you collect data — not after.</p>
<p>Four quantities are linked — specify any three to solve for the fourth:</p>
<ul>
<li><strong>α (significance level):</strong> probability of false positive (typically 0.05)</li>
<li><strong>Power (1-β):</strong> probability of detecting a real effect (typically 0.80 or 0.90)</li>
<li><strong>Effect size:</strong> the minimum meaningful difference to detect</li>
<li><strong>Sample size n:</strong> what we want to calculate</li>
</ul>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Analysis = TTestIndPower()</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">N = analysis.solve power(</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Effect Size = 0.3,    # Cohen's d = small − medium effect</div>
</div>
<div class="callout info"><div class="callout-title">Effect Size Guidance (Cohen's d)</div><p>Cohen's d: 0.2 = small, 0.5 = medium, 0.8 = large. In pharma/healthcare analytics, 0.2–0.3 is realistic for population-level interventions. If you need d=0.5 to power your study affordably, consider whether your study is testing an effect large enough to matter clinically — small-but-real effects in medicine often require large n to detect reliably.</p></div>`},
    {id:"s7",content:`<h2 id="s7">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>Choosing the right distribution matters — drug costs are log-normal, count data is Poisson/negative binomial, response rates are beta — applying Normal assumptions to all of these will produce wrong confidence intervals and test results.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>A p-value answers "If H₀ were true, how often would we see data this extreme?" — it does NOT measure effect size, practical importance, or the probability that H₀ is true.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Multiple testing correction is mandatory when testing multiple hypotheses — without Bonferroni or Benjamini-Hochberg correction, 1 in 20 tests will appear significant by chance at α=0.05.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>Run power analysis before data collection — a sample size that yields only 30% power produces unreliable results regardless of how sophisticated the analysis is.</div></div>`}],
  questions:[
    {id:"q1",text:"You run 20 independent hypothesis tests at α=0.05 with no true effects. How many tests do you expect to reject the null hypothesis (false positives)?",
     options:["0 — α=0.05 means you'll never have a false positive","1 — each test has a 5% false positive rate, and 5% of 20 = 1 expected false positive","5 — 20 tests × 0.05 × some adjustment for multiple testing","20 — all tests will eventually produce p<0.05 with enough data"],
     correct:1,explanation:"Each individual test has a 5% probability of false positive. Expected false positives = 20 × 0.05 = 1. This is the multiple testing problem: even with zero real effects, you expect to find approximately 1 'significant' result purely by chance when running 20 tests. This is why multiple testing correction (Bonferroni, BH) is essential in any analysis that tests multiple hypotheses simultaneously."},
    {id:"q2",text:"An A/B test runs for 3 days and shows p=0.048 (barely significant). The analyst reports success. A colleague argues the test should run for 2 weeks. Why?",
     options:["2 weeks is the standard industry minimum regardless of significance","Peeking at results before the pre-specified end date inflates Type I error — a test that happens to reach significance early and is stopped will often be a false positive. Business cycles and novelty effects also require time to average out.","The p-value threshold should be adjusted to 0.01 for short tests","3 days generates insufficient impressions for a valid sample"],
     correct:1,explanation:"Frequentist testing requires pre-specifying the stopping rule. If you peek at results daily and stop when p<0.05, you're conducting multiple implicit tests — the true Type I error rate can be 20-30% rather than 5%. Additionally, early results often reflect novelty effects (users engage with anything new initially). Running for a full business cycle (ideally 2+ weeks) allows: novelty effects to dissipate, weekday/weekend patterns to average out, and early transient effects to be separated from lasting behavior change."},
    {id:"q3",text:"Which statement correctly describes a 95% confidence interval?",
     options:["There is a 95% probability that the true parameter value lies within this interval","If we repeated this study 100 times, approximately 95 of the 100 confidence intervals would contain the true parameter value","95% of the data falls within this interval","The parameter has a 95% chance of being significant"],
     correct:1,explanation:"The frequentist confidence interval is often misinterpreted. The true parameter is a fixed (unknown) constant, not a random variable — it either is or isn't in any specific interval. The correct interpretation is frequentist: if we repeated the experiment many times and computed the CI each time, 95% of those intervals would contain the true parameter. For intuitive 'probability the parameter is in this range' interpretation, use the Bayesian credible interval instead."}
  ]
},

"5-8": {
  id:"5-8", title:"Advanced Machine Learning & Deep Learning", domain:"Data Science & Analytics Engineering", domain_id:5,
  level:"Advanced", mins:60, available:true,
  tags:["Deep Learning","Neural Networks","CNNs","Transformers","Ensemble Methods","Regularization","Transfer Learning"],
  objectives:["Understand neural network architecture and training","Apply CNNs for image data and RNNs/Transformers for sequences","Select and tune ensemble methods","Apply regularization techniques to prevent overfitting","Use transfer learning to accelerate model development"],
  toc:[
    {id:"s1",title:"Neural Network Fundamentals",level:"h2"},
    {id:"s2",title:"Training Dynamics: Optimization & Regularization",level:"h2"},
    {id:"s3",title:"CNNs, RNNs & Transformers",level:"h2"},
    {id:"s4",title:"Ensemble Methods Deep Dive",level:"h2"},
    {id:"s5",title:"Transfer Learning & Fine-Tuning",level:"h2"},
    {id:"s6",title:"Model Selection & Real-World Trade-offs",level:"h2"},
    {id:"s7",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Neural Network Fundamentals</h2>
<p>A neural network is a function approximator composed of layers of linear transformations followed by non-linear activation functions. Understanding the math lets you debug training failures and design architectures intentionally.</p>
<p>A single neuron: <code>output = activation(W·x + b)</code></p>
<table><thead><tr><th>Activation</th><th>Formula</th><th>Range</th><th>Use Case</th></tr></thead>
<tbody>
<tr><td>ReLU</td><td>max(0, x)</td><td>[0, ∞)</td><td>Hidden layers — fast, sparse, avoids vanishing gradients</td></tr>
<tr><td>Leaky ReLU</td><td>max(0.01x, x)</td><td>(-∞, ∞)</td><td>Fixes "dying ReLU" problem in deep networks</td></tr>
<tr><td>Sigmoid</td><td>1/(1+e^-x)</td><td>(0, 1)</td><td>Binary output (single class probability)</td></tr>
<tr><td>Softmax</td><td>e^xᵢ / Σe^xⱼ</td><td>(0, 1), sum=1</td><td>Multi-class output probabilities</td></tr>
<tr><td>Tanh</td><td>(e^x - e^-x)/(e^x + e^-x)</td><td>(-1, 1)</td><td>Recurrent networks; zero-centered advantage over sigmoid</td></tr>
<tr><td>GELU</td><td>x·Φ(x) (approx)</td><td>(-∞, ∞)</td><td>Transformers (BERT, GPT) — smooth non-linearity</td></tr>
</tbody></table>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Prev Dim = input dim</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Prev Dim = hidden dim</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Self.Network = nn.Sequential( × layers)</div>
</div>`},
    {id:"s2",content:`<h2 id="s2">Training Dynamics: Optimization & Regularization</h2>
<p>Training a neural network is an optimization problem: minimize loss L(θ) over model parameters θ. The choice of optimizer, learning rate schedule, and regularization critically determines whether the model converges to a good solution.</p>
<table><thead><tr><th>Optimizer</th><th>Key Property</th><th>When to Use</th><th>Key Hyperparameter</th></tr></thead>
<tbody>
<tr><td>SGD + Momentum</td><td>Simple; great final performance when tuned</td><td>CV tasks where patience is affordable; cosine annealing schedule</td><td>lr (0.01–0.1), momentum (0.9)</td></tr>
<tr><td>Adam</td><td>Adaptive learning rates per parameter; fast convergence</td><td>Default for NLP, tabular, mixed data</td><td>lr (1e-3 to 1e-4), β₁=0.9, β₂=0.999</td></tr>
<tr><td>AdamW</td><td>Adam + proper weight decay (decoupled regularization)</td><td>Preferred over Adam for most tasks; standard in Transformers</td><td>Same as Adam + weight_decay (1e-4 to 1e-2)</td></tr>
<tr><td>RAdam</td><td>Rectified Adam — stable warm-up phase</td><td>Training instability at start of training</td><td>Same as Adam</td></tr>
</tbody></table>
<p>Regularization techniques:</p>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Optimizer = torch.optim.AdamW(model.parameters(), lr=1e − 3, weight decay=1e − 4)</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Dropout = nn.Dropout(p=0.3)  # 30% of neurons zeroed each forward pass</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Batch Norm = nn.BatchNorm1d(num features=128)</div>
</div>
<table><thead><tr><th>Condition</th><th>Result</th></tr></thead><tbody>
<tr><td>val loss &lt; self.best loss - self.delta</td><td>self.best loss = val loss</td></tr>
<tr><td>self.counter ≥ self.patience</td><td>self.should stop = True</td></tr>
</tbody></table>`},
    {id:"s3",content:`<h2 id="s3">CNNs, RNNs & Transformers</h2>
<p>Architecture choice should be driven by data structure:</p>
<table><thead><tr><th>Architecture</th><th>Designed For</th><th>Key Innovation</th><th>Applications</th></tr></thead>
<tbody>
<tr><td>CNN (Convolutional)</td><td>Grid-structured data (images, 1D signals)</td><td>Local connectivity + parameter sharing via filters</td><td>Medical imaging, EEG, histology slides</td></tr>
<tr><td>RNN / LSTM / GRU</td><td>Sequential data with temporal dependencies</td><td>Hidden state carries information across timesteps</td><td>Time series prediction, genomic sequences</td></tr>
<tr><td>Transformer</td><td>Sequential data with long-range dependencies</td><td>Self-attention: each position attends to all others simultaneously</td><td>NLP (BERT, GPT), drug discovery, protein structure (AlphaFold)</td></tr>
<tr><td>Graph Neural Network (GNN)</td><td>Graph-structured data</td><td>Message passing between connected nodes</td><td>Molecular property prediction, drug-drug interactions</td></tr>
</tbody></table>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Self.Attention = nn.MultiheadAttention(</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Embed Dim = d model, num heads=n heads,</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Dropout = dropout, batch first=True</div>
</div>`},
    {id:"s4",content:`<h2 id="s4">Ensemble Methods Deep Dive</h2>
<p>Ensembles combine predictions from multiple models to reduce variance (bagging), bias (boosting), or both. Understanding the mechanics determines when each method helps.</p>
<table><thead><tr><th>Method</th><th>How It Works</th><th>Reduces</th><th>Best For</th></tr></thead>
<tbody>
<tr><td>Bagging (Random Forest)</td><td>Train many trees on bootstrap samples; average predictions</td><td>Variance</td><td>High-variance base learners; stable tabular data</td></tr>
<tr><td>Gradient Boosting (XGBoost, LightGBM)</td><td>Train trees sequentially; each corrects predecessor's residuals</td><td>Bias + Variance</td><td>Structured/tabular data; Kaggle default winner</td></tr>
<tr><td>Stacking</td><td>Meta-learner trained on base model predictions</td><td>Both</td><td>Combining diverse model types (tree + NN + linear)</td></tr>
<tr><td>Voting</td><td>Majority vote (classification) or average (regression)</td><td>Variance</td><td>Quick ensemble of pre-trained models</td></tr>
</tbody></table>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Xgb Model = xgb.XGBClassifier(</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">N Estimators = 500,          # Number of trees</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Learning Rate = 0.05,        # Step size — lower = slower but better</div>
</div>`},
    {id:"s5",content:`<h2 id="s5">Transfer Learning & Fine-Tuning</h2>
<p><strong>Transfer learning</strong> leverages representations learned on a large dataset (pre-training) and adapts them to a smaller, domain-specific task (fine-tuning). It dramatically reduces data requirements and training time.</p>
<p>Transfer learning strategies (from most to least aggressive fine-tuning):</p>
<table><thead><tr><th>Strategy</th><th>What's Trained</th><th>When to Use</th><th>Data Required</th></tr></thead>
<tbody>
<tr><td>Full fine-tuning</td><td>All layers</td><td>Large domain-specific dataset; significant distribution shift</td><td>10K+ examples</td></tr>
<tr><td>Partial fine-tuning</td><td>Last N layers + classifier head</td><td>Moderate domain shift; medium dataset</td><td>1K–10K examples</td></tr>
<tr><td>Linear probing</td><td>Classifier head only (backbone frozen)</td><td>Small dataset; similar domain to pre-training</td><td>100–1K examples</td></tr>
<tr><td>Adapter layers</td><td>Small trainable modules inserted into frozen backbone</td><td>Multiple downstream tasks from one backbone</td><td>Efficient at any scale</td></tr>
<tr><td>LoRA / PEFT</td><td>Low-rank decomposition of weight matrices</td><td>LLMs; GPU-constrained fine-tuning</td><td>Works with minimal data</td></tr>
</tbody></table>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Model Name = "emilyalsentzer ÷ Bio ClinicalBERT"  # Domain − specific pre − trained model</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Tokenizer = AutoTokenizer.from pretrained(model name)</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Model = AutoModelForSequenceClassification.from pretrained(</div>
</div>
<table><thead><tr><th>Condition</th><th>Result</th></tr></thead><tbody>
<tr><td>'classifier' not in name</td><td>param.requires grad = False  # Freeze backbone layers</td></tr>
</tbody></table>`},
    {id:"s6",content:`<h2 id="s6">Model Selection & Real-World Trade-offs</h2>
<p>Choosing the right model is not about using the most complex approach — it's about matching model capacity to problem complexity and data constraints.</p>
<table><thead><tr><th>Situation</th><th>Recommended Model</th><th>Rationale</th></tr></thead>
<tbody>
<tr><td>Tabular data, &lt;50K rows, interpretability needed</td><td>Logistic regression, decision tree, LightGBM with SHAP</td><td>Neural nets don't outperform trees on tabular data at small scale</td></tr>
<tr><td>Tabular data, 100K+ rows, max performance</td><td>LightGBM, XGBoost, or stacking ensemble</td><td>Gradient boosting dominates tabular benchmarks</td></tr>
<tr><td>Image classification</td><td>Fine-tune ResNet/EfficientNet/ViT</td><td>Pre-trained ImageNet features transfer well; training from scratch rarely wins</td></tr>
<tr><td>Text classification, sentiment</td><td>Fine-tune BERT-base or distilBERT</td><td>BERT features capture semantic relationships; small datasets viable</td></tr>
<tr><td>Time series forecasting</td><td>LightGBM with engineered features OR N-BEATS/Temporal Fusion Transformer</td><td>Tree models surprisingly competitive; DL models win on multivariate seasonal</td></tr>
<tr><td>Recommendation systems</td><td>Matrix factorization → two-tower neural → transformer-based</td><td>Complexity scales with data volume and interaction diversity</td></tr>
</tbody></table>
<div class="callout warning"><div class="callout-title">Neural Network Hype vs. Tabular Reality</div><p>On tabular data (the most common type in pharma analytics), gradient boosting (XGBoost, LightGBM, CatBoost) consistently matches or outperforms neural networks — while being faster to train, easier to interpret with SHAP, and requiring far less hyperparameter tuning. Only reach for deep learning on tabular data when you have 100K+ rows, complex feature interactions, or embedding needs (e.g., high-cardinality categoricals).</p></div>`},
    {id:"s7",content:`<h2 id="s7">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>Neural networks are universal function approximators built from linear layers + nonlinear activations — ReLU dominates hidden layers; the output activation (sigmoid, softmax, linear) depends on the task.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>Architecture should match data structure: CNNs for grid/image data, RNNs/Transformers for sequences with temporal dependencies, GNNs for graph-structured data (molecules, networks).</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>On tabular data, LightGBM and XGBoost consistently outperform or match neural networks — reach for deep learning only when you have very large datasets, embeddings, or sequential structure.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>Transfer learning is the single highest-leverage technique in modern deep learning — fine-tuning a pre-trained model typically achieves better results with 10–100x less data than training from scratch.</div></div>`}],
  questions:[
    {id:"q1",text:"You're building a model to classify clinical notes (5,000 labeled examples) into disease categories. Which approach will most likely give the best performance?",
     options:["Train a LSTM from scratch on the 5,000 examples","Train a random forest on TF-IDF features extracted from the notes","Fine-tune a pre-trained BioBERT model on the 5,000 labeled examples","Build a CNN with character-level embeddings"],
     correct:2,explanation:"With only 5,000 labeled examples, training any model from scratch will overfit or underfit. BioBERT/ClinicalBERT is pre-trained on millions of biomedical/clinical texts and has already learned rich domain-specific representations. Fine-tuning only the classification head (or all layers with careful regularization) leverages these representations — consistently achieving state-of-the-art performance on clinical NLP benchmarks with limited labeled data. This is the paradigmatic transfer learning success case."},
    {id:"q2",text:"Your gradient boosting model achieves 0.94 AUC on training data but only 0.71 on validation. What is this and what should you do?",
     options:["The validation set is too small — collect more validation data","This is overfitting — the model memorized training data. Reduce max_depth, increase min_child_weight, reduce n_estimators with early stopping, or add L1/L2 regularization","This is underfitting — add more features and increase model complexity","Normal for gradient boosting — production performance is always between training and validation AUC"],
     correct:1,explanation:"A 0.23 AUC gap between training and validation is severe overfitting. The model has memorized training examples rather than learning generalizable patterns. Remedies in order of impact: (1) Enable early stopping — stop adding trees when validation AUC stops improving. (2) Reduce max_depth (6→4). (3) Increase min_child_samples/min_child_weight. (4) Increase regularization parameters (reg_alpha, reg_lambda). (5) Reduce learning_rate and increase n_estimators to compensate."},
    {id:"q3",text:"Why does the Transformer architecture outperform LSTMs on long sequences despite both being designed for sequential data?",
     options:["Transformers have more parameters, which always helps with more data","LSTMs process sequences step-by-step; long-range dependencies must flow through many timesteps, causing gradient vanishing. Transformers use self-attention to directly connect any two positions in the sequence, regardless of distance — capturing long-range dependencies in a single operation.","Transformers use larger vocabulary sizes in their tokenizers","LSTMs are deprecated and modern frameworks don't support them"],
     correct:1,explanation:"The fundamental limitation of RNNs/LSTMs is the sequential bottleneck: information from early positions must propagate through every intermediate timestep to reach later positions, causing gradients to vanish in backpropagation through time. For a 500-token document, position 1's information must travel 499 steps to influence position 500. Self-attention in Transformers creates direct connections between all pairs of positions in parallel — position 1 directly attends to position 500 in a single operation. This is why Transformers dramatically outperform LSTMs on tasks requiring long-range dependencies (translation, document understanding)."}
  ]
},

"5-9": {
  id:"5-9", title:"NLP & Large Language Models", domain:"Data Science & Analytics Engineering", domain_id:5,
  level:"Advanced", mins:55, available:true,
  tags:["NLP","Transformers","BERT","GPT","LLMs","RAG","Embeddings","Prompt Engineering","Fine-Tuning"],
  objectives:["Understand the NLP pipeline from tokenization to inference","Explain Transformer self-attention and why it works","Apply embeddings for semantic search and similarity","Design effective prompts for LLM applications","Implement RAG systems for domain-specific Q&A","Evaluate LLM outputs in production"],
  toc:[
    {id:"s1",title:"NLP Pipeline & Text Preprocessing",level:"h2"},
    {id:"s2",title:"Word Embeddings & Semantic Representations",level:"h2"},
    {id:"s3",title:"Transformer Architecture & Self-Attention",level:"h2"},
    {id:"s4",title:"Prompt Engineering for LLMs",level:"h2"},
    {id:"s5",title:"Retrieval-Augmented Generation (RAG)",level:"h2"},
    {id:"s6",title:"Evaluating & Deploying LLMs",level:"h2"},
    {id:"s7",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">NLP Pipeline & Text Preprocessing</h2>
<p>The NLP pipeline transforms raw text into structured representations that models can process:</p>
<table><thead><tr><th>Step</th><th>What It Does</th><th>Tools</th><th>Output</th></tr></thead>
<tbody>
<tr><td>Tokenization</td><td>Split text into tokens (words, subwords, characters)</td><td>NLTK, spaCy, HuggingFace tokenizers</td><td>List of tokens</td></tr>
<tr><td>Normalization</td><td>Lowercase, remove punctuation, handle contractions</td><td>regex, spaCy</td><td>Cleaned tokens</td></tr>
<tr><td>Stop word removal</td><td>Remove high-frequency low-information words (the, a, is)</td><td>NLTK stopwords, spaCy</td><td>Content-bearing tokens</td></tr>
<tr><td>Stemming / Lemmatization</td><td>Reduce words to root form (running → run)</td><td>NLTK (Porter), spaCy (lemma_)</td><td>Root forms</td></tr>
<tr><td>NER (Named Entity Recognition)</td><td>Identify entities: persons, organizations, drugs, diseases</td><td>spaCy, scispaCy, Amazon Comprehend Medical</td><td>Entity spans with labels</td></tr>
<tr><td>Embedding</td><td>Map tokens to dense vectors capturing semantic meaning</td><td>Word2Vec, BERT, sentence-transformers</td><td>Numeric vectors</td></tr>
</tbody></table>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Nlp = spacy.load("en core sci lg")  # SciSpaCy: trained on biomedical literature</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Text = """Patient initiated ibrutinib 420mg daily for CLL.</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Doc = nlp(text)</div>
</div>
<table><thead><tr><th>Condition</th><th>Result</th></tr></thead><tbody>
<tr><td>token.dep  in ('nsubj', 'dobj', 'prep')</td><td>print(f"  {token.text} --{token.dep }--> {token.head.text}")</td></tr>
</tbody></table>`},
    {id:"s2",content:`<h2 id="s2">Word Embeddings & Semantic Representations</h2>
<p>Embeddings map discrete tokens to continuous vector spaces where semantic relationships become geometric distances. Models that understand language must learn that "cancer" and "tumor" are more similar than "cancer" and "chair."</p>
<table><thead><tr><th>Embedding Type</th><th>Properties</th><th>Limitation</th><th>Use Today</th></tr></thead>
<tbody>
<tr><td>Word2Vec / GloVe</td><td>Word-level static embeddings; captures word analogy relationships</td><td>One vector per word regardless of context: "bank" (river) = "bank" (financial)</td><td>Legacy; replaced by contextual embeddings</td></tr>
<tr><td>FastText</td><td>Subword embeddings; handles out-of-vocabulary words via character n-grams</td><td>Still static; context-independent</td><td>Low-resource languages; morphologically rich text</td></tr>
<tr><td>BERT embeddings (contextual)</td><td>Each token's embedding depends on surrounding context — polysemy handled</td><td>Sentence-level aggregation required for semantic search</td><td>Feature extraction for NLP tasks</td></tr>
<tr><td>Sentence Transformers</td><td>Contrastive fine-tuning produces semantically meaningful sentence embeddings</td><td>Fixed context window (typically 512 tokens)</td><td>Standard for semantic search, clustering, similarity</td></tr>
</tbody></table>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Model = SentenceTransformer('sentence − transformers ÷ all − MiniLM − L6 − v2')</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Doc Embeddings = model.encode(documents)</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Query = "What are the cardiovascular side effects of BTK inhibitors?"</div>
</div>`},
    {id:"s3",content:`<h2 id="s3">Transformer Architecture & Self-Attention</h2>
<p><strong>Self-attention</strong> is the mechanism that made Transformers dominant: each token simultaneously attends to every other token in the sequence, computing a weighted sum of their values where weights represent relevance.</p>
<p>Attention formula: <code>Attention(Q, K, V) = softmax(QK^T / √d_k) · V</code></p>
<ul>
<li><strong>Q (Query):</strong> "What am I looking for?"</li>
<li><strong>K (Key):</strong> "What do I contain?"</li>
<li><strong>V (Value):</strong> "What information do I carry?"</li>
<li><strong>√d_k:</strong> Scaling factor to prevent softmax saturation in high dimensions</li>
</ul>
<table><thead><tr><th>Model Family</th><th>Pre-training Task</th><th>Architecture</th><th>Best For</th></tr></thead>
<tbody>
<tr><td>BERT (encoder-only)</td><td>Masked language modeling + next sentence prediction</td><td>Bidirectional (sees full context)</td><td>Classification, NER, Q&A extraction</td></tr>
<tr><td>GPT (decoder-only)</td><td>Causal language modeling (predict next token)</td><td>Unidirectional (autoregressive)</td><td>Text generation, completion, chat</td></tr>
<tr><td>T5/BART (encoder-decoder)</td><td>Span prediction / denoising</td><td>Full sequence-to-sequence</td><td>Translation, summarization, abstractive Q&A</td></tr>
<tr><td>LLaMA, Mistral, Phi (decoder)</td><td>Causal LM on massive corpora</td><td>Efficient decoder with RoPE, GQA</td><td>Open-source foundation model fine-tuning</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">Why "Large" in LLM?</div><p>GPT-2: 1.5B parameters (2019). GPT-3: 175B (2020). GPT-4: estimated 1T+ (2023). Scale (parameters × data × compute) produces emergent capabilities — abilities not present at smaller scale: multi-step reasoning, code generation, chain-of-thought. The Chinchilla paper (2022) established optimal scaling: compute-optimal training matches roughly 20 tokens per parameter.</p></div>`},
    {id:"s4",content:`<h2 id="s4">Prompt Engineering for LLMs</h2>
<p>LLMs are sensitive to how instructions are phrased. Prompt engineering extracts maximum performance without fine-tuning — often producing 90%+ of fine-tuned model performance at zero cost.</p>
<p>Core prompting techniques:</p>
<table><thead><tr><th>Technique</th><th>Mechanism</th><th>When to Use</th><th>Example</th></tr></thead>
<tbody>
<tr><td>Zero-shot</td><td>Direct instruction, no examples</td><td>Simple tasks the model handles well</td><td>"Classify this text as positive or negative:"</td></tr>
<tr><td>Few-shot</td><td>2-10 input/output examples before task</td><td>Format specification; edge case handling</td><td>Show 3 classification examples before new instance</td></tr>
<tr><td>Chain-of-thought (CoT)</td><td>Ask model to show reasoning steps</td><td>Multi-step reasoning, math, medical decision-making</td><td>"Let's think step by step..."</td></tr>
<tr><td>System prompt</td><td>Set role, persona, constraints in system message</td><td>All API interactions</td><td>"You are a medical coder. Output only ICD-10 codes."</td></tr>
<tr><td>Self-consistency</td><td>Sample multiple reasoning chains; majority vote</td><td>High-stakes decisions; unstable CoT</td><td>Generate 5 answers; take most frequent</td></tr>
<tr><td>ReAct</td><td>Interleave reasoning (Thought) and tool use (Act)</td><td>Agentic workflows; multi-step research</td><td>Think → Search → Observe → Think → Answer</td></tr>
</tbody></table>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Client = OpenAI()</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">System Prompt = """You are a pharmacovigilance specialist.</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Few Shot Example = """</div>
</div>`},
    {id:"s5",content:`<h2 id="s5">Retrieval-Augmented Generation (RAG)</h2>
<p><strong>RAG</strong> combines the generative capability of LLMs with an external knowledge retrieval system. Instead of relying on knowledge baked into model weights (which can be outdated or wrong), RAG retrieves relevant documents and provides them as context to the LLM at inference time.</p>
<p>RAG architecture:</p>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Self.Embedder = SentenceTransformer('sentence − transformers ÷ all − MiniLM − L6 − v2')</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Self.Db Client = chromadb.PersistentClient(path=". ÷ pharma db")</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Self.Collection = self.db client.get or create collection(collection name)</div>
</div>
<div class="callout"><div class="callout-title">RAG vs. Fine-Tuning</div><p>Use RAG when: knowledge changes frequently (drug labels, guidelines), hallucination must be minimized (cite sources), or domain data is confidential (stays in your vector DB). Use fine-tuning when: the model needs to adopt a consistent style/persona, domain vocabulary must be deeply integrated, or latency is critical (fewer tokens per call). Most production systems combine both.</p></div>`},
    {id:"s6",content:`<h2 id="s6">Evaluating & Deploying LLMs</h2>
<p>LLM evaluation is harder than traditional ML — there is no single "accuracy" metric. Evaluation requires a multi-dimensional framework:</p>
<table><thead><tr><th>Metric</th><th>Measures</th><th>Tool/Method</th></tr></thead>
<tbody>
<tr><td>BLEU / ROUGE</td><td>N-gram overlap vs. reference (summarization, translation)</td><td>sacreBLEU, ROUGE library</td></tr>
<tr><td>BERTScore</td><td>Semantic similarity between output and reference</td><td>bert-score package</td></tr>
<tr><td>Faithfulness (RAG)</td><td>Is answer grounded in retrieved context? No hallucination?</td><td>RAGAS framework</td></tr>
<tr><td>Relevance (RAG)</td><td>Is retrieved context relevant to the question?</td><td>RAGAS context precision/recall</td></tr>
<tr><td>Human evaluation</td><td>Accuracy, safety, helpfulness rated by domain experts</td><td>Labeling tools (Label Studio, Scale)</td></tr>
<tr><td>LLM-as-judge</td><td>GPT-4 rates model outputs on rubric</td><td>MT-Bench, Alpaca Eval</td></tr>
</tbody></table>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Eval Dataset = Dataset.from dict({</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Result = evaluate(</div>
</div>
<div class="callout warning"><div class="callout-title">LLM Safety in Healthcare</div><p>LLMs in healthcare applications require: (1) Hallucination testing — medical hallucinations can harm patients, (2) PHI filtering — ensure patient data is never sent to third-party APIs without data agreements, (3) Human-in-the-loop for high-stakes decisions, (4) Audit logging — every LLM call logged for regulatory review, (5) Version pinning — model updates can change behavior without warning.</p></div>`},
    {id:"s7",content:`<h2 id="s7">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>Transformers' self-attention mechanism directly connects any two positions in a sequence, overcoming the sequential bottleneck of RNNs and enabling models to capture long-range dependencies — this is why they dominate NLP.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>Sentence Transformers produce semantically meaningful dense embeddings that enable semantic search — finding documents by meaning rather than keyword overlap — making them the foundation of modern RAG systems.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Chain-of-thought prompting and few-shot examples are the two highest-leverage prompt engineering techniques — both extract substantially more performance from LLMs with zero additional training cost.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>LLM evaluation in healthcare is multi-dimensional — faithfulness (no hallucination), relevance, and safety must all be measured; RAGAS provides a systematic framework for RAG pipeline evaluation.</div></div>`}],
  questions:[
    {id:"q1",text:"A RAG system's RAGAS faithfulness score is 0.61. What does this indicate and what should you investigate?",
     options:["61% of retrieved documents are relevant to the question","The model is generating answers that contain information not present in or contradicted by the retrieved context (hallucinating 39% of claims)","61% of user questions are being answered correctly","The vector database contains 61% relevant documents"],
     correct:1,explanation:"RAGAS faithfulness measures: for each claim in the generated answer, is it supported by the retrieved context? A score of 0.61 means approximately 39% of claims in the generated answers are not grounded in the retrieved documents — the model is hallucinating. Investigation steps: (1) Analyze specific low-faithfulness examples to identify patterns, (2) Check if retrieval is surfacing relevant chunks (context recall), (3) Strengthen the system prompt to prohibit generating beyond context, (4) Consider adding citation requirements to make hallucination detectable."},
    {id:"q2",text:"Why does zero-shot prompting often fail for structured output extraction (like extracting JSON from clinical notes), while few-shot prompting typically succeeds?",
     options:["Zero-shot uses less compute and therefore produces lower quality","Few-shot examples demonstrate the exact output format and edge cases to the model — without examples, LLMs often generate correct content in incorrect format, add explanatory text, or handle ambiguous cases inconsistently","Few-shot prompting enables the model to use more training data","Zero-shot prompting requires fine-tuning to work correctly"],
     correct:1,explanation:"LLMs are excellent at following format specifications demonstrated by example. Zero-shot prompts describe the format in words, but the model may: add markdown formatting, include extra explanation, handle null values inconsistently, or use different field names. Few-shot examples eliminate this ambiguity — the model sees exactly what 'correct' output looks like and replicates the format. For structured extraction in production systems, always use 2-5 high-quality few-shot examples covering common and edge cases."},
    {id:"q3",text:"What is the primary technical advantage of BERT's bidirectional architecture over GPT's unidirectional (causal) architecture for text classification tasks?",
     options:["BERT is trained on more data than GPT","BERT sees context from both left and right simultaneously when computing each token's representation — for classification, the full document context is available to understand each word, rather than only preceding context","GPT cannot perform classification without fine-tuning","BERT uses a different tokenizer that produces better representations"],
     correct:1,explanation:"BERT's masked language modeling objective allows each token to attend to all surrounding tokens (bidirectionally). When encoding 'atrial fibrillation secondary to ibrutinib therapy,' BERT computes 'ibrutinib's' embedding using both the clinical context that follows AND precedes it. GPT's causal masking means it can only use preceding context — a fundamental disadvantage for understanding tasks where meaning depends on full sentence context. This is why BERT-family models dominate classification, NER, and extractive tasks, while GPT-family models dominate generation."}
  ]
},

"5-10": {
  id:"5-10", title:"MLOps & Model Deployment", domain:"Data Science & Analytics Engineering", domain_id:5,
  level:"Advanced", mins:50, available:true,
  tags:["MLOps","Model Deployment","Feature Store","Model Registry","CI/CD for ML","Model Monitoring","Drift Detection"],
  objectives:["Design an end-to-end MLOps lifecycle","Build feature stores for training and serving consistency","Version models and datasets with experiment tracking","Implement CI/CD pipelines for ML models","Monitor models in production for drift and degradation"],
  toc:[
    {id:"s1",title:"The MLOps Lifecycle",level:"h2"},
    {id:"s2",title:"Feature Stores & Training-Serving Skew",level:"h2"},
    {id:"s3",title:"Experiment Tracking & Model Registry",level:"h2"},
    {id:"s4",title:"CI/CD for Machine Learning",level:"h2"},
    {id:"s5",title:"Model Monitoring & Drift Detection",level:"h2"},
    {id:"s6",title:"Model Serving Patterns",level:"h2"},
    {id:"s7",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">The MLOps Lifecycle</h2>
<p><strong>MLOps</strong> (Machine Learning Operations) applies DevOps principles to ML systems — bringing reproducibility, automation, monitoring, and collaboration to what is otherwise an ad-hoc, notebook-driven process. Without MLOps, ML models rot silently in production.</p>
<div class="callout"><div class="callout-title">The ML Technical Debt Problem</div><p>A 2015 Google paper coined "Technical Debt in ML Systems" — identifying that ML code is typically less than 5% of a production ML system. The rest: data pipelines, feature engineering, monitoring, serving infrastructure, CI/CD — these are the hard parts. MLOps addresses the 95%.</p></div>
<table><thead><tr><th>MLOps Maturity Level</th><th>Characteristics</th><th>Typical Team Size</th></tr></thead>
<tbody>
<tr><td>Level 0: Manual</td><td>Jupyter notebooks; manual model training; no monitoring; "works on my laptop"</td><td>1-2 data scientists</td></tr>
<tr><td>Level 1: ML Pipeline</td><td>Automated training pipelines; experiment tracking; model registry; manual deployment</td><td>Small data science team</td></tr>
<tr><td>Level 2: Full CI/CD</td><td>Automated training + validation + deployment; A/B testing; full monitoring</td><td>Dedicated MLOps engineers + platform team</td></tr>
</tbody></table>
<p>Key MLOps tooling landscape:</p>
<table><thead><tr><th>Concern</th><th>Open Source</th><th>Managed Cloud</th></tr></thead>
<tbody>
<tr><td>Experiment tracking</td><td>MLflow, Weights & Biases</td><td>SageMaker Experiments, Vertex AI</td></tr>
<tr><td>Feature store</td><td>Feast, Hopsworks</td><td>SageMaker Feature Store, Databricks Feature Store</td></tr>
<tr><td>Model registry</td><td>MLflow Model Registry</td><td>SageMaker Model Registry, Azure ML Registry</td></tr>
<tr><td>Pipeline orchestration</td><td>Airflow, Prefect, ZenML, Kubeflow</td><td>SageMaker Pipelines, Vertex Pipelines</td></tr>
<tr><td>Model serving</td><td>BentoML, Seldon, Triton</td><td>SageMaker Endpoints, Vertex Endpoints</td></tr>
<tr><td>Monitoring</td><td>Evidently AI, Whylogs</td><td>SageMaker Model Monitor, Azure ML Monitoring</td></tr>
</tbody></table>`},
    {id:"s2",content:`<h2 id="s2">Feature Stores & Training-Serving Skew</h2>
<p><strong>Training-serving skew</strong> is one of the most common and insidious ML production bugs: the features used during training are computed differently from features at inference time, causing the model to perform worse in production than in testing.</p>
<p>Example: training on "days_since_last_Rx" computed over historical data; in production, "today" is used instead of the actual prediction date — causing systematic feature difference.</p>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Patient Features = FeatureView(</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Name = "patient engagement",</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Ttl = timedelta(days=90),  # Features older than 90 days are stale</div>
</div>`},
    {id:"s3",content:`<h2 id="s3">Experiment Tracking & Model Registry</h2>
<p>Without experiment tracking, data science is just ad-hoc tinkering. MLflow is the industry standard for open-source experiment tracking.</p>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">With Mlflow.Start Run(Run Name = f"lgbm {params['max depth']}d"):</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Model = lgb.LGBMClassifier(²params)</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Cv Scores = cross val score(model, X train, y train,</div>
</div>`},
    {id:"s4",content:`<h2 id="s4">CI/CD for Machine Learning</h2>
<p>ML CI/CD extends software CI/CD with ML-specific gates: data validation, model performance validation, and safe deployment patterns.</p>
<table><thead><tr><th>Stage</th><th>ML-Specific Check</th><th>Block on Failure?</th></tr></thead>
<tbody>
<tr><td>Code commit</td><td>Unit tests for feature engineering; data schema validation</td><td>Yes</td></tr>
<tr><td>Training pipeline</td><td>Data statistics check; training convergence; no NaN in features</td><td>Yes</td></tr>
<tr><td>Model evaluation</td><td>Performance ≥ baseline + threshold (e.g., AUC ≥ 0.85); fairness metrics pass</td><td>Yes</td></tr>
<tr><td>Integration test</td><td>Prediction latency &lt; SLA; memory within bounds; correct output schema</td><td>Yes</td></tr>
<tr><td>Deployment</td><td>Shadow mode → canary (5%) → full deployment with rollback trigger</td><td>Auto-rollback on error spike</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">ML Training Pipeline — CI/CD Workflow</div>
<p>A production ML pipeline runs automatically on a schedule or when code changes. Here is the sequence:</p>
<div class="flow-box">
<div class="rule-step"><div class="rule-step-num">1</div><div class="rule-step-body"><strong>Trigger</strong><p>Pipeline fires on a schedule (weekly model refresh) or when a data scientist pushes updated model code</p></div></div>
<div class="flow-arrow">↓</div>
<div class="rule-step"><div class="rule-step-num">2</div><div class="rule-step-body"><strong>Data Validation</strong><p>Check that input feature tables are fresh, complete, and pass schema tests before training begins</p></div></div>
<div class="flow-arrow">↓</div>
<div class="rule-step"><div class="rule-step-num">3</div><div class="rule-step-body"><strong>Feature Engineering</strong><p>Pull from the Feature Store — reuse pre-computed features (RFM scores, days-on-therapy, prior auth history)</p></div></div>
<div class="flow-arrow">↓</div>
<div class="rule-step"><div class="rule-step-num">4</div><div class="rule-step-body"><strong>Model Training &amp; Evaluation</strong><p>Train on recent data; compare AUC, precision, recall against the current production model</p></div></div>
<div class="flow-arrow">↓</div>
<div class="rule-step"><div class="rule-step-num">5</div><div class="rule-step-body"><strong>Promotion Gate</strong><p>New model is promoted to production only if it beats the incumbent on held-out validation data</p></div></div>
<div class="flow-arrow">↓</div>
<div class="rule-step"><div class="rule-step-num">6</div><div class="rule-step-body"><strong>Deployment &amp; Monitoring</strong><p>Model served via API endpoint; drift monitoring alerts if prediction distribution shifts &gt;10% week-over-week</p></div></div>
</div></div>`},
    {id:"s5",content:`<h2 id="s5">Model Monitoring & Drift Detection</h2>
<p>ML models degrade silently. Without monitoring, you discover failures from business stakeholders — after decisions have been made on bad predictions.</p>
<table><thead><tr><th>Drift Type</th><th>What Changes</th><th>Detection Method</th><th>Response</th></tr></thead>
<tbody>
<tr><td>Data drift (covariate)</td><td>Input feature distributions shift (new patient population)</td><td>Population Stability Index (PSI), KS test</td><td>Investigate source; retrain if PSI &gt;0.2</td></tr>
<tr><td>Concept drift</td><td>Relationship between features and label changes (new treatment guidelines)</td><td>Monitor prediction accuracy on labeled recent data</td><td>Retrain with recent data</td></tr>
<tr><td>Label drift (target shift)</td><td>Distribution of outcomes changes (COVID disrupted all healthcare utilization)</td><td>Compare label distribution in production vs. training</td><td>Evaluate if model applies; may need domain adaptation</td></tr>
<tr><td>Prediction drift</td><td>Score distribution shifts without input changes</td><td>Monitor percentile thresholds of prediction scores</td><td>Audit pipeline; check for feature engineering bug</td></tr>
</tbody></table>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Report = Report(metrics=[</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Reference Data = reference data,</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Current Data = production data,</div>
</div>
<table><thead><tr><th>Condition</th><th>Result</th></tr></thead><tbody>
<tr><td>result['drift detected']</td><td>]</td></tr>
</tbody></table>`},
    {id:"s6",content:`<h2 id="s6">Model Serving Patterns</h2>
<p>How you serve a model determines latency, throughput, cost, and reliability. Choose serving architecture based on use case requirements:</p>
<table><thead><tr><th>Pattern</th><th>Latency</th><th>Throughput</th><th>Use Case</th><th>Tool</th></tr></thead>
<tbody>
<tr><td>REST API (online inference)</td><td>&lt;100ms</td><td>100s req/sec</td><td>Real-time HCP scoring, fraud detection</td><td>FastAPI + BentoML, SageMaker Endpoint</td></tr>
<tr><td>Batch inference</td><td>Hours</td><td>Millions of records</td><td>Nightly patient risk scoring, monthly brand predictions</td><td>Spark MLlib, SageMaker Batch Transform</td></tr>
<tr><td>Stream inference</td><td>Seconds</td><td>Thousands events/sec</td><td>Real-time adverse event detection, CRM trigger on claim</td><td>Kafka + Flink, Spark Streaming</td></tr>
<tr><td>Edge/embedded</td><td>Milliseconds (on device)</td><td>Single device</td><td>Medical device diagnostics, mobile health apps</td><td>ONNX, TensorFlow Lite, Core ML</td></tr>
</tbody></table>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">App = FastAPI(title="Patient Discontinuation Risk API")</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Model = mlflow.sklearn.load model("models: ÷ patient − discontinuation − predictor ÷ Production")</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Data = pd.DataFrame([features.dict()])</div>
</div>`},
    {id:"s7",content:`<h2 id="s7">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>Training-serving skew is the most common production ML failure — feature stores solve it by ensuring the exact same feature computation logic is used in both training and inference.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>Experiment tracking (MLflow) and model registries make ML reproducible — every model in production should have a complete lineage: data version, code version, hyperparameters, and evaluation metrics.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Models degrade silently — monitor both data drift (input distribution changes) and concept drift (feature-label relationship changes) using statistical tests, and retrain when Population Stability Index exceeds 0.2.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>Serving architecture must match use case: REST API for real-time (&lt;100ms), batch jobs for nightly scoring of millions, stream processing for event-triggered predictions within seconds.</div></div>`}],
  questions:[
    {id:"q1",text:"A patient discontinuation risk model was trained in January with 85% AUC. By July, AUC on a labeled validation set has dropped to 71%. Feature distributions look stable (no data drift detected). What type of drift is this and what caused it?",
     options:["Data drift — the input features changed","Concept drift — the relationship between features and discontinuation changed (e.g., new therapies, COVID reimbursement changes, formulary changes that made persistence easier)","Model decay from hardware degradation","Prediction drift from a scoring bug"],
     correct:1,explanation:"Stable feature distributions but degraded predictive performance is the signature of concept drift: the underlying relationship between predictors and the outcome has changed, even though the inputs look similar. In pharma, common concept drift causes: new competing drugs that change adherence patterns, formulary changes (copay changes alter financial barrier), COVID disruptions to care patterns, new clinical guidelines changing treatment decisions. The fix is retraining on recent data where the current relationship holds."},
    {id:"q2",text:"Why is batch inference preferred over real-time REST API serving for a nightly patient risk stratification use case scoring 2 million patients?",
     options:["REST APIs cannot handle 2 million requests","Batch inference is computationally more efficient for scoring large static datasets — it parallelizes across distributed compute, avoids per-request overhead, and results don't need to be available instantly (nightly score is valid for 24 hours)","REST APIs cannot connect to the data warehouse","Batch inference produces higher accuracy models"],
     correct:1,explanation:"For a use case where: (1) all 2M patients need scoring on a fixed schedule, (2) results are consumed the next morning (not in milliseconds), and (3) data sits in a data warehouse — batch inference is clearly superior. It can use distributed computing (Spark) to score all patients in parallel, reads from the warehouse directly, and doesn't require always-on server infrastructure. A REST API serving 2M patients sequentially at 50ms/patient would take 28 hours — longer than the nightly cycle."},
    {id:"q3",text:"The Population Stability Index (PSI) for the 'days_since_last_rx' feature is 0.23. What action is indicated?",
     options:["No action — PSI below 0.25 is within normal range","PSI of 0.23 indicates significant distribution shift (PSI > 0.2 = major drift threshold) — investigate why days_since_last_rx has shifted, determine if the model's learned relationship still holds, and likely retrain on recent data","Increase the monitoring frequency to daily","Archive the model and stop serving predictions"],
     correct:1,explanation:"PSI thresholds: &lt;0.1 = no drift (no action), 0.1–0.2 = moderate drift (monitor closely), &gt;0.2 = major drift (investigate and likely retrain). PSI of 0.23 crosses the major drift threshold for days_since_last_rx, which is likely a highly predictive feature. This means the feature's distribution in production differs significantly from training — the model's learned cutoffs for this feature may no longer apply. Investigate cause (formulary change? COVID care gap? Data pipeline issue?) then retrain with recent data if the shift is real."}
  ]
}

}); // end PL.addChapters Domain 5
