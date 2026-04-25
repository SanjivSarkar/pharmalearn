/* Domain 5: Data Science & Pharma Use Cases */
PL.addChapters({

"5-0": {
  id:"5-0", title:"Machine Learning Fundamentals", domain:"Data Science & Pharma Use Cases", domain_id:5,
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
  id:"5-1", title:"Feature Engineering & Selection", domain:"Data Science & Pharma Use Cases", domain_id:5,
  level:"Intermediate", mins:38, available:true,
  tags:["Feature Engineering","Feature Selection","Data Preparation","Missing Data","Encoding","Feature Stores"],
  objectives:["Understand why feature engineering determines model performance more than algorithm choice","Apply the main transformations for numeric, categorical, and date features","Select the right feature selection strategy for your problem size","Handle missing values and outliers in a principled way","Understand what a feature store is and why it matters in production"],
  toc:[
    {id:"s1",title:"Why Feature Engineering Matters",level:"h2"},
    {id:"s2",title:"Numeric & Date Feature Transformations",level:"h2"},
    {id:"s3",title:"Categorical Encoding",level:"h2"},
    {id:"s4",title:"Handling Missing Data & Outliers",level:"h2"},
    {id:"s5",title:"Feature Selection Methods",level:"h2"},
    {id:"s6",title:"Feature Stores",level:"h2"},
    {id:"s7",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Why Feature Engineering Matters</h2>
<p>Feature engineering is the process of transforming raw data into inputs that a machine learning model can learn from effectively. It is consistently the single biggest lever on model performance — far more impactful than algorithm selection. A great feature set with a simple model almost always beats a poor feature set with a sophisticated model.</p>
<div class="callout info"><div class="callout-title">The Rule of Thumb</div><p>In industry ML competitions and production deployments, experienced practitioners spend 80% of their time on feature engineering and 20% on model selection and tuning. The opposite allocation — jumping to complex models with poorly engineered features — is the most common mistake made by data scientists early in their careers.</p></div>
<h3>What Makes a Good Feature?</h3>
<table><thead><tr><th>Property</th><th>What It Means</th><th>Example</th></tr></thead><tbody>
<tr><td><strong>Predictive</strong></td><td>Carries signal about the target variable</td><td>Days since last refill predicts adherence risk</td></tr>
<tr><td><strong>Available at prediction time</strong></td><td>The feature value exists when the model needs to score</td><td>Cannot use "next 30 days' sales" as a feature — it doesn't exist yet at prediction time</td></tr>
<tr><td><strong>Not leaking the target</strong></td><td>Does not encode the answer before the model has to predict it</td><td>Using "discontinued = 1" as a feature in a discontinuation model is pure data leakage</td></tr>
<tr><td><strong>Stable over time</strong></td><td>The feature's distribution and meaning don't shift unpredictably</td><td>A feature based on a data feed that changes format monthly will degrade model performance silently</td></tr>
</tbody></table>
<h3>The Feature Engineering Pipeline</h3>
<div class="flow-box">Raw Data → Data Cleaning → Feature Extraction → Feature Transformation → Feature Selection → Feature Store / Model Input</div>`},
    {id:"s2",content:`<h2 id="s2">Numeric & Date Feature Transformations</h2>
<h3>Numeric Transformations</h3>
<table><thead><tr><th>Transformation</th><th>How It Works</th><th>When to Use</th></tr></thead><tbody>
<tr><td><strong>Standardisation (Z-score)</strong></td><td>Subtract mean, divide by standard deviation. Result: mean=0, std=1</td><td>Linear models, SVMs, neural networks — anything sensitive to feature scale</td></tr>
<tr><td><strong>Min-Max Scaling</strong></td><td>Rescale to [0, 1]: (x − min) / (max − min)</td><td>Neural networks; when you need bounded inputs</td></tr>
<tr><td><strong>Log Transform</strong></td><td>Apply log(x+1) to compress right-skewed distributions</td><td>Highly skewed features: income, claim counts, prescription volume</td></tr>
<tr><td><strong>Binning / Discretisation</strong></td><td>Convert continuous values into ordered categorical buckets (e.g., age: 0–18, 19–34, 35–54, 55+)</td><td>When the relationship with the target is non-linear within a range; when interpretability matters</td></tr>
<tr><td><strong>Interaction Terms</strong></td><td>Multiply two features together to capture their joint effect</td><td>When domain knowledge says two features interact (e.g., call frequency × market access score)</td></tr>
<tr><td><strong>Polynomial Features</strong></td><td>Raise a feature to a power (x², x³) to capture curves</td><td>When the feature-target relationship is non-linear and you're using a linear model</td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">Tree Models Don't Need Scaling</div><p>Gradient boosted trees (XGBoost, LightGBM, Random Forest) are scale-invariant — they split on rank, not magnitude. Standardisation and min-max scaling have no effect on tree model performance. Only apply scaling for linear models, SVMs, k-NN, and neural networks.</p></div>
<h3>Date & Time Features</h3>
<p>Dates are often stored as a single timestamp but contain many extractable signals:</p>
<ul>
<li><strong>Time deltas:</strong> Days between events (days from diagnosis to treatment start, days since last refill, days since last HCP call)</li>
<li><strong>Cyclical encoding:</strong> Month-of-year and day-of-week are cyclical — December and January are adjacent, not far apart. Encode as sin/cos pairs: sin(2π × month / 12) and cos(2π × month / 12)</li>
<li><strong>Event flags:</strong> Binary indicator for whether an event occurred in the past N days (e.g., "had a hospitalisation in prior 90 days")</li>
<li><strong>Rolling statistics:</strong> Mean, max, count of a value over a trailing window (3-month rolling TRx, 6-month rolling PDC)</li>
</ul>`},
    {id:"s3",content:`<h2 id="s3">Categorical Encoding</h2>
<p>Most ML algorithms require numeric inputs. Categorical variables (HCP specialty, payer type, drug name, geographic region) must be encoded into numbers without imposing false ordinal relationships.</p>
<table><thead><tr><th>Encoding Method</th><th>How It Works</th><th>When to Use</th><th>Drawback</th></tr></thead><tbody>
<tr><td><strong>One-Hot Encoding</strong></td><td>Create one binary column per category value. "Cardiology" becomes [1,0,0], "Neurology" [0,1,0]</td><td>Low-cardinality categories (&lt;20 unique values) with linear/logistic regression</td><td>Creates huge sparse matrices for high-cardinality features</td></tr>
<tr><td><strong>Ordinal Encoding</strong></td><td>Map ordered categories to integers (Beginner=1, Intermediate=2, Advanced=3)</td><td>Genuinely ordered categories where the order is meaningful</td><td>Imposes a magnitude relationship — use only when order truly matters</td></tr>
<tr><td><strong>Target Encoding</strong></td><td>Replace each category value with the mean target value for that category (e.g., "Oncology" → mean dropout rate for oncologists)</td><td>High-cardinality categoricals with tree models</td><td>Prone to overfitting — always apply within cross-validation folds, never on full training set</td></tr>
<tr><td><strong>Frequency / Count Encoding</strong></td><td>Replace each category with its frequency in the training data</td><td>High-cardinality categoricals when target mean is unavailable or unstable</td><td>Conflates rare categories that happen to have similar frequencies</td></tr>
<tr><td><strong>Embedding</strong></td><td>Learn a dense vector representation through a neural network layer</td><td>Very high-cardinality (thousands of unique values: drug codes, zip codes) with neural networks</td><td>Requires significant training data and a neural network framework</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">Target Encoding Leakage Risk</div><p>Target encoding must be computed within each fold of cross-validation, using only the training portion of that fold. Computing target encoding on the full dataset before splitting will leak target information into the features, inflating validation scores and producing a model that performs worse in production than estimated.</p></div>`},
    {id:"s4",content:`<h2 id="s4">Handling Missing Data & Outliers</h2>
<h3>Why Data Goes Missing</h3>
<p>Understanding <em>why</em> data is missing determines the correct treatment strategy:</p>
<table><thead><tr><th>Missing Mechanism</th><th>Definition</th><th>Example</th><th>Treatment</th></tr></thead><tbody>
<tr><td><strong>MCAR</strong> (Missing Completely at Random)</td><td>Missingness is unrelated to any variable</td><td>Random system glitch drops 2% of records</td><td>Any imputation or complete-case analysis is valid</td></tr>
<tr><td><strong>MAR</strong> (Missing at Random)</td><td>Missingness depends on other observed variables but not on the missing value itself</td><td>Lab values missing more often for patients with fewer clinic visits</td><td>Multiple imputation or model-based imputation using observed predictors</td></tr>
<tr><td><strong>MNAR</strong> (Missing Not at Random)</td><td>Missingness depends on the missing value itself</td><td>High lab values are more likely to be missing because extreme results trigger repeat testing and reporting delays</td><td>Requires domain knowledge; missingness itself is informative — add a binary "was missing" indicator as a feature</td></tr>
</tbody></table>
<h3>Imputation Strategies</h3>
<table><thead><tr><th>Method</th><th>Approach</th><th>Best For</th></tr></thead><tbody>
<tr><td>Mean / Median imputation</td><td>Replace missing with the column average or median</td><td>Quick baseline; numeric features with MCAR/MAR and &lt;5% missingness</td></tr>
<tr><td>Mode imputation</td><td>Replace missing with the most frequent category</td><td>Categorical features with low missingness</td></tr>
<tr><td>Model-based (KNN, regression)</td><td>Predict the missing value using other features</td><td>Higher missingness rates; MCAR and MAR mechanisms</td></tr>
<tr><td>Indicator flag + fill</td><td>Add binary "was_missing" feature AND fill with median</td><td>MNAR — missingness itself is predictive</td></tr>
</tbody></table>
<h3>Outlier Treatment</h3>
<p>Outliers can be errors (data quality problem) or genuine extreme values (high prescribers, very long-stay patients). Never remove outliers without investigating first:</p>
<ul>
<li><strong>IQR method:</strong> Flag values below Q1 − 1.5×IQR or above Q3 + 1.5×IQR</li>
<li><strong>Winsorisation:</strong> Cap extreme values at the 1st and 99th percentile rather than removing them — preserves the row while reducing leverage</li>
<li><strong>Log transform:</strong> Compresses the right tail, naturally reducing outlier influence in many distributions</li>
</ul>`},
    {id:"s5",content:`<h2 id="s5">Feature Selection Methods</h2>
<p>More features is not always better. Irrelevant or redundant features add noise, slow training, increase overfitting risk, and make models harder to explain. Feature selection is the systematic process of identifying which features to keep.</p>
<h3>Three Families of Feature Selection</h3>
<table><thead><tr><th>Family</th><th>How It Works</th><th>Advantage</th><th>Drawback</th></tr></thead><tbody>
<tr><td><strong>Filter Methods</strong></td><td>Score each feature independently of the model using a statistical test (correlation, mutual information, chi-squared). Remove features below a threshold.</td><td>Fast; no model needed; good for initial pruning of very large feature sets</td><td>Ignores feature interactions — a feature weak alone may be powerful in combination</td></tr>
<tr><td><strong>Wrapper Methods</strong></td><td>Use model performance to evaluate feature subsets. Recursive Feature Elimination (RFE) trains the model, removes the least important feature, retrains, repeats.</td><td>Finds the best subset for a specific model</td><td>Computationally expensive; can overfit to the validation set</td></tr>
<tr><td><strong>Embedded Methods</strong></td><td>Feature selection happens during model training. LASSO regression drives irrelevant feature coefficients to exactly zero. Tree models produce feature importances that identify low-value features.</td><td>Fast; naturally accounts for feature interactions; no separate selection step</td><td>Model-specific; LASSO assumes linear relationships</td></tr>
</tbody></table>
<h3>Permutation Feature Importance</h3>
<p>After training, randomly shuffle one feature's values and measure the drop in model performance. A large drop means the feature was important; a small drop (or improvement) means the feature was irrelevant or harmful. This method works for any model and respects feature interactions — it is more reliable than tree-based feature importance scores which can be biased toward high-cardinality features.</p>
<div class="flow-box">For each feature: Shuffle values → Measure performance drop → Importance = baseline performance − shuffled performance</div>`},
    {id:"s6",content:`<h2 id="s6">Feature Stores</h2>
<p>A feature store is a centralised platform that computes, stores, versions, and serves features for ML training and real-time prediction. It solves the most common production ML problem: <strong>training-serving skew</strong> — the model was trained on features computed one way, but the production system computes them differently, leading to silent performance degradation.</p>
<h3>Feature Store Architecture</h3>
<div class="flow-box">Offline Store (training): Data warehouse → Transform → Feature values → Feature Store ← Online Store (serving): Real-time event stream → Transform → Feature values</div>
<table><thead><tr><th>Component</th><th>Purpose</th></tr></thead><tbody>
<tr><td><strong>Offline store</strong></td><td>Historical feature values used to create training datasets. Backed by a data warehouse or data lake. Supports point-in-time correct feature retrieval — crucial to prevent data leakage during training.</td></tr>
<tr><td><strong>Online store</strong></td><td>Low-latency storage for the most recent feature values used during real-time model serving. Backed by Redis, DynamoDB, or similar key-value stores. Returns features in &lt;10ms for real-time scoring.</td></tr>
<tr><td><strong>Feature registry</strong></td><td>Catalogue of all available features with documentation, ownership, and lineage. Enables feature reuse across teams — a feature built for one model (days_since_last_refill) can be reused in five others without recomputing.</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">Point-in-Time Correctness</div><p>When creating a training dataset, you must use only feature values that were available <em>at the time each training label was created</em> — not future feature values. A feature store with point-in-time lookups ensures this automatically. Without it, your training data accidentally includes "future" feature values that leak information about the target, inflating training metrics and producing models that fail in production.</p></div>`},
    {id:"s7",content:`<h2 id="s7">Key Takeaways</h2>
<ul>
<li><strong>Feature engineering outweighs algorithm choice</strong> — invest 80% of effort here before tuning models.</li>
<li><strong>Tree models are scale-invariant</strong> — standardisation and min-max scaling are unnecessary; apply only for linear models, SVMs, and neural networks.</li>
<li><strong>Target encoding must happen within cross-validation folds</strong> — computing it on the full dataset before splitting leaks the target and produces optimistic but false validation scores.</li>
<li><strong>Understand why data is missing</strong> before choosing an imputation strategy — MNAR missingness is informative and should be encoded as a binary indicator feature.</li>
<li><strong>Permutation feature importance</strong> is more reliable than tree-based importance for feature selection — it respects feature interactions and is not biased toward high-cardinality variables.</li>
<li><strong>Feature stores solve training-serving skew</strong> — the single most common cause of production ML models performing worse than their validation metrics suggested.</li>
</ul>`}
  ],
  quiz:[
    {q:"A data scientist standardises (Z-scores) all features before training an XGBoost model. What is the effect on model performance?",options:["Performance improves because features are on the same scale","No effect — tree-based models like XGBoost split on rank, not magnitude, making them invariant to feature scaling","Performance decreases","The model will fail to train"],answer:1},
    {q:"You want to encode 'HCP specialty' (50 unique values) as a feature in a logistic regression. What is the biggest risk of one-hot encoding at this cardinality?",options:["One-hot encoding does not work with logistic regression","Creating 50 binary columns increases dimensionality and risks overfitting when training data per category is sparse","One-hot encoding always produces data leakage","Logistic regression cannot handle binary features"],answer:1},
    {q:"A feature's values are missing because very high values trigger delayed laboratory processing (the high values themselves cause the missingness). This is an example of:",options:["MCAR — add the feature without modification","MNAR — missingness is informative; add a binary 'was_missing' indicator alongside any imputed value","MAR — impute with the column mean","Data corruption — remove the feature entirely"],answer:1},
    {q:"Permutation feature importance is preferred over tree-based feature importance because:",options:["It is faster to compute","It is model-agnostic and not biased toward high-cardinality features, unlike impurity-based tree importance which favours features with many split points","It requires no validation data","It always selects fewer features"],answer:1},
    {q:"What problem does a feature store's 'point-in-time correct' retrieval mechanism prevent?",options:["Feature scaling inconsistencies","Data leakage — it ensures training features only include values available at the time each training label was created, not future values","Storage costs","Slow model serving"],answer:1}
  ]
},

"5-2": {
  id:"5-2", title:"Model Interpretability & Explainability", domain:"Data Science & Pharma Use Cases", domain_id:5,
  level:"Intermediate", mins:35, available:true,
  tags:["SHAP","LIME","Explainability","Interpretability","Partial Dependence","Feature Importance","Responsible AI"],
  objectives:["Distinguish intrinsic interpretability from post-hoc explainability","Apply SHAP to explain both global model behaviour and individual predictions","Use PDPs and ICE plots to visualise feature-target relationships","Select the right explainability tool for a given model and audience","Understand responsible AI obligations in regulated pharma contexts"],
  toc:[
    {id:"s1",title:"Why Interpretability Matters",level:"h2"},
    {id:"s2",title:"Intrinsic vs Post-Hoc Methods",level:"h2"},
    {id:"s3",title:"SHAP — SHapley Additive Explanations",level:"h2"},
    {id:"s4",title:"Partial Dependence & ICE Plots",level:"h2"},
    {id:"s5",title:"LIME & Counterfactual Explanations",level:"h2"},
    {id:"s6",title:"Responsible AI in Regulated Contexts",level:"h2"},
    {id:"s7",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Why Interpretability Matters</h2>
<p>A model that predicts accurately but cannot be explained is often unusable in practice. Interpretability is not a luxury — it is a business and regulatory requirement in pharma.</p>
<table><thead><tr><th>Stakeholder</th><th>Why They Need Explanations</th><th>What They Want</th></tr></thead><tbody>
<tr><td>Field Sales Rep</td><td>Must understand why an HCP is flagged as high-priority to have a credible conversation</td><td>"Why is Dr Smith in my top 10?" — a specific, actionable reason</td></tr>
<tr><td>Brand Team</td><td>Needs to trust the model before acting on its recommendations</td><td>Confirmation that the model captures known business drivers</td></tr>
<tr><td>Regulatory / Compliance</td><td>AI decisions affecting patients or prescribers may require audit trails</td><td>Evidence that protected attributes (race, gender) are not driving outputs</td></tr>
<tr><td>Data Scientist</td><td>Model debugging — understanding where the model fails and why</td><td>Feature-level diagnosis of errors and drift</td></tr>
<tr><td>Legal / Ethics</td><td>Liability for automated decisions requires explainable processes</td><td>Documentation of the decision logic at a population and individual level</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">Accuracy vs Interpretability Is a False Trade-Off</div><p>Modern explainability tools (especially SHAP) can explain complex models like XGBoost and neural networks with sufficient precision for most business and regulatory needs. The choice is rarely "interpretable model or accurate model" — it is "accurate model with post-hoc explanation" vs "interpretable model with lower accuracy." Start with the best-performing model, then explain it.</p></div>`},
    {id:"s2",content:`<h2 id="s2">Intrinsic vs Post-Hoc Methods</h2>
<table><thead><tr><th>Category</th><th>What It Is</th><th>Examples</th><th>Best For</th></tr></thead><tbody>
<tr><td><strong>Intrinsic (white-box)</strong></td><td>The model's structure is itself interpretable — no additional explanation tool needed</td><td>Linear regression (coefficients), Logistic regression, Decision tree (visual flowchart), Rule-based systems</td><td>Regulatory submissions, field-facing tools where simplicity is paramount</td></tr>
<tr><td><strong>Post-hoc, model-specific</strong></td><td>Explanation method designed for one model type</td><td>Tree feature importance (Gini impurity), attention weights (Transformers)</td><td>Quick sanity checks during development; not reliable for final explanations</td></tr>
<tr><td><strong>Post-hoc, model-agnostic</strong></td><td>Explanation method that works for any model — treats it as a black box</td><td>SHAP, LIME, PDP, ICE plots, permutation importance</td><td>Production explainability for complex models (XGBoost, neural networks)</td></tr>
</tbody></table>
<h3>Scope: Global vs Local Explanations</h3>
<table><thead><tr><th>Scope</th><th>Question Answered</th><th>Use Case</th></tr></thead><tbody>
<tr><td><strong>Global</strong></td><td>"What does this model do in general? Which features matter most overall?"</td><td>Model validation, brand team briefings, regulatory documentation</td></tr>
<tr><td><strong>Local</strong></td><td>"Why did this model make this specific prediction for this specific HCP/patient?"</td><td>Field rep conversations ("Here's why Dr Smith is your priority"), individual appeal processes</td></tr>
</tbody></table>`},
    {id:"s3",content:`<h2 id="s3">SHAP — SHapley Additive Explanations</h2>
<p>SHAP is the gold standard for ML explainability. It is grounded in cooperative game theory: each feature is treated as a "player" in a game, and SHAP values measure each player's fair contribution to the final prediction. The key property is <strong>additivity</strong> — SHAP values for all features sum exactly to the difference between the model's prediction for this instance and the model's average prediction across all instances.</p>
<div class="flow-box">Model prediction = Base value (average prediction) + SHAP(feature_1) + SHAP(feature_2) + ... + SHAP(feature_n)</div>
<h3>How SHAP Values Are Computed</h3>
<p>For each feature and each data point, SHAP computes the average marginal contribution of that feature across all possible subsets of features. In practice:</p>
<ul>
<li><strong>TreeSHAP</strong> (for XGBoost, LightGBM, Random Forest): Exact computation in polynomial time — fast and exact. The standard for most pharma ML work.</li>
<li><strong>KernelSHAP</strong> (model-agnostic): Approximates SHAP values using a weighted linear model around each prediction. Slower but works for any model including neural networks.</li>
<li><strong>LinearSHAP</strong> (for linear models): Exact and instant — SHAP values are simply the feature coefficient × (feature value − mean).</li>
</ul>
<h3>Reading SHAP Outputs</h3>
<table><thead><tr><th>Plot Type</th><th>Shows</th><th>Use It When</th></tr></thead><tbody>
<tr><td><strong>Bar chart (global)</strong></td><td>Mean absolute SHAP value per feature — overall feature importance ranking</td><td>Model validation, confirming known drivers are captured</td></tr>
<tr><td><strong>Beeswarm plot</strong></td><td>Each dot = one data point; position = SHAP value; colour = feature value. Shows distribution of impacts across the population</td><td>Understanding non-linear relationships; identifying segments where a feature helps vs hurts</td></tr>
<tr><td><strong>Waterfall plot (local)</strong></td><td>For one specific prediction: shows each feature's push up or down from the base value to the final score</td><td>Explaining a single HCP's or patient's score to a field rep or case reviewer</td></tr>
<tr><td><strong>SHAP dependence plot</strong></td><td>SHAP value vs raw feature value for one feature — reveals non-linear relationships and interactions</td><td>Understanding exactly how a feature affects predictions across its range</td></tr>
</tbody></table>`},
    {id:"s4",content:`<h2 id="s4">Partial Dependence & ICE Plots</h2>
<h3>Partial Dependence Plots (PDP)</h3>
<p>A PDP shows the marginal effect of one (or two) features on the model's predicted outcome, averaged across the entire dataset. It answers: "Holding all other features at their actual values, how does varying <em>this feature</em> change the average prediction?"</p>
<div class="flow-box">For each value v of feature X: fix X = v for all observations → get model predictions → average predictions → plot average vs v</div>
<p><strong>Reading a PDP:</strong> The y-axis shows the predicted outcome (or log-odds). A rising PDP line means higher feature values increase the prediction; a flat line means the feature has no marginal effect; a non-monotonic line indicates a complex relationship.</p>
<h3>ICE Plots (Individual Conditional Expectation)</h3>
<p>ICE plots are PDPs disaggregated to the individual level — instead of averaging, each observation gets its own line. ICE plots reveal <strong>heterogeneity</strong>: if the ICE lines all move in the same direction as the PDP, the effect is homogeneous. If some lines go up while others go down, the feature's effect is moderated by other features (an interaction).</p>
<div class="callout"><div class="callout-title">PDP Assumption — Independence</div><p>PDPs assume features are independent when marginalising. This assumption fails for correlated features. If "field call frequency" and "market access score" are correlated, a PDP that varies call frequency while holding market access fixed is unrealistic — it creates artificial data points that never exist in nature. SHAP dependence plots handle this more gracefully because they condition on the actual observed distribution.</p></div>
<h3>2D PDP — Interaction Effects</h3>
<p>A two-way PDP plots the joint effect of two features on the prediction — the resulting surface shows interactions. A flat surface = no interaction; a tilted/curved surface = the two features interact in predicting the outcome.</p>`},
    {id:"s5",content:`<h2 id="s5">LIME & Counterfactual Explanations</h2>
<h3>LIME (Local Interpretable Model-Agnostic Explanations)</h3>
<p>LIME explains an individual prediction by fitting a simple interpretable model (typically a linear model) locally around that prediction. It generates perturbed versions of the input, gets model predictions for each, and fits a linear model to those predictions — the linear model's coefficients are the explanation.</p>
<div class="flow-box">Original input → Perturb inputs (random noise) → Get model predictions for perturbed inputs → Fit weighted linear model on perturbed inputs → Linear coefficients = local explanation</div>
<p><strong>LIME vs SHAP in practice:</strong></p>
<table><thead><tr><th>Dimension</th><th>LIME</th><th>SHAP</th></tr></thead><tbody>
<tr><td>Consistency</td><td>Stochastic — repeated calls can give different explanations for the same point</td><td>Deterministic (for tree models)</td></tr>
<tr><td>Additivity</td><td>Does not guarantee coefficients sum to the prediction</td><td>Guaranteed to sum to prediction − base value</td></tr>
<tr><td>Speed</td><td>Slow — requires many model calls</td><td>Fast with TreeSHAP</td></tr>
<tr><td>Text/image data</td><td>Works well — perturbs word tokens or superpixels</td><td>Less natural for unstructured data</td></tr>
</tbody></table>
<h3>Counterfactual Explanations</h3>
<p>A counterfactual answers: "What is the minimum change to the input that would change the model's prediction?" This is the most actionable form of explanation for end users.</p>
<p><strong>Example:</strong> "HCP Dr Jones scored 0.28 (below threshold). If his prior 90-day TRx in class increased from 3 to 8, his score would be 0.72 (above threshold)." This tells a manager what the HCP needs to do (or the rep needs to drive) to move to the high-priority tier.</p>`},
    {id:"s6",content:`<h2 id="s6">Responsible AI in Regulated Contexts</h2>
<p>In pharma, ML models may influence which HCPs receive field attention, which patients get intervention calls, or which clinical decisions are supported. This carries regulatory and ethical obligations.</p>
<h3>Bias & Fairness Checks</h3>
<p>Before deploying any model that affects people:</p>
<ul>
<li><strong>Disparate impact analysis:</strong> Does the model systematically score differently across demographic groups (gender, race/ethnicity, geography)?</li>
<li><strong>Protected attribute leakage:</strong> Do proxy features (zip code, payer type) encode protected attributes and drive predictions?</li>
<li><strong>Calibration by subgroup:</strong> Is the model equally well-calibrated across segments, or does it systematically over-predict for some groups and under-predict for others?</li>
</ul>
<h3>FDA Guidance on AI/ML in Drug Development</h3>
<p>The FDA's 2021 Action Plan for AI/ML in drug development requires:</p>
<ul>
<li>Good Machine Learning Practice (GMLP) principles analogous to GCP/GMP</li>
<li>Documented data management, model development, and validation processes</li>
<li>Transparency about model limitations and intended use population</li>
<li>Monitoring plans for model drift post-deployment</li>
</ul>
<div class="callout info"><div class="callout-title">EU AI Act Impact on Pharma</div><p>The EU AI Act (2024) classifies AI systems used in healthcare as "high-risk" — subject to conformity assessments, technical documentation requirements, human oversight obligations, and post-market monitoring. Pharma companies using ML in clinical decision support, patient risk stratification, or pharmacovigilance will need to comply as they deploy AI tools across EU markets.</p></div>`},
    {id:"s7",content:`<h2 id="s7">Key Takeaways</h2>
<ul>
<li><strong>SHAP is the gold standard</strong> for ML explainability — it is additive (values sum to the prediction), consistent, and works for any model via KernelSHAP or efficiently via TreeSHAP.</li>
<li><strong>Global explanations</strong> (bar chart, beeswarm) validate model behaviour at a population level; <strong>local explanations</strong> (waterfall) justify individual predictions to end users.</li>
<li><strong>PDPs show average marginal effects</strong> but assume feature independence — use ICE plots to detect heterogeneity and interactions that PDPs mask.</li>
<li><strong>LIME is stochastic and non-additive</strong> — prefer SHAP for tabular data; LIME adds value for text and image explanations.</li>
<li><strong>Counterfactual explanations</strong> are the most actionable form — they answer "what would need to change to flip this prediction?"</li>
<li><strong>Bias and fairness audits are non-optional</strong> in regulated pharma contexts — check for disparate impact, proxy variable leakage, and subgroup calibration before deployment.</li>
</ul>`}
  ],
  quiz:[
    {q:"A SHAP waterfall plot for HCP Dr Chen shows: base value = 0.35, days_since_last_rx SHAP = +0.18, call_frequency SHAP = +0.09, payer_mix SHAP = −0.05. What is Dr Chen's predicted score?",options:["0.35","0.57","0.62","0.47"],answer:1},
    {q:"You plot a PDP for 'call_frequency' and it shows a strong positive slope — more calls = higher prescribing probability. A colleague notes that ICE lines show some going up while others go down. What does this mean?",options:["The PDP is wrong — ICE is always correct","The feature's effect is heterogeneous — call frequency helps with some HCP segments but may actually reduce prescribing for others. Interactions with other features should be investigated.","ICE lines always go in different directions — this is normal noise","The model should be retrained"],answer:1},
    {q:"Why is LIME considered less reliable than SHAP for tabular data explanations?",options:["LIME is slower than SHAP","LIME is stochastic (repeated calls can give different explanations) and does not guarantee that explanation values sum to the model prediction, unlike SHAP's additive guarantee","LIME requires more training data","LIME only works for decision trees"],answer:1},
    {q:"A model scoring patients for adherence risk has a mean absolute SHAP value of 0.15 for 'zip_code'. This is concerning because:",options:["Zip code is not a valid feature for any model","Zip code is a proxy for race, income, and access — a high SHAP value indicates the model may be encoding protected demographic attributes, requiring a bias and fairness audit","SHAP values above 0.1 indicate model errors","Zip code should always have zero SHAP value"],answer:1},
    {q:"A counterfactual explanation says: 'Patient A would move from low-risk to high-risk if their days_since_last_refill increased from 5 to 48'. Who finds this most actionable?",options:["The data scientist tuning the model","A patient support programme nurse — this tells them that the patient's refill delay is the key intervention target","The regulatory team filing the PSUR","The IT team deploying the model"],answer:1}
  ]
},

"5-3": {
  id:"5-3", title:"Time Series Analysis", domain:"Data Science & Pharma Use Cases", domain_id:5,
  level:"Intermediate", mins:38, available:true,
  tags:["Time Series","Decomposition","Stationarity","ARIMA","ACF","Seasonality","Walk-Forward Validation"],
  objectives:["Explain what makes time series data different from cross-sectional data","Decompose a series into trend, seasonality, and residuals","Test for stationarity and apply differencing to achieve it","Interpret ACF and PACF plots to select ARIMA parameters","Evaluate time series forecasts correctly using walk-forward validation"],
  sections:[
    {id:"s1",content:`<h2 id="s1">What Makes Time Series Data Special</h2>
<p>Time series data is a sequence of observations ordered in time. This ordering creates dependencies that violate the core assumption of most standard ML models — that observations are independent and identically distributed (i.i.d.). Ignoring the temporal structure leads to flawed analyses and misleading forecasts.</p>
<table><thead><tr><th>Property</th><th>Cross-Sectional Data</th><th>Time Series Data</th></tr></thead><tbody>
<tr><td>Order matters?</td><td>No — rows are interchangeable</td><td>Yes — the sequence is the data</td></tr>
<tr><td>Observations independent?</td><td>Assumed yes</td><td>No — today depends on yesterday (autocorrelation)</td></tr>
<tr><td>Train/test split method</td><td>Random split is valid</td><td>Must use temporal split — future data cannot train the model</td></tr>
<tr><td>Primary challenge</td><td>Feature selection, class imbalance</td><td>Stationarity, seasonality, forecasting horizon</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">Why Random Train/Test Split Fails for Time Series</div><p>If you randomly assign 20% of weekly Rx records to the test set, the model trains on data from both before and after test observations. This means the model has "seen the future" relative to some test points — its performance looks excellent but is meaningless. Always split time series data temporally: train on all observations up to date T, test on all observations after T.</p></div>
<h3>Core Time Series Concepts</h3>
<table><thead><tr><th>Concept</th><th>Definition</th></tr></thead><tbody>
<tr><td><strong>Autocorrelation</strong></td><td>Correlation between a time series and a lagged copy of itself. Rx this week is correlated with Rx last week.</td></tr>
<tr><td><strong>Stationarity</strong></td><td>Statistical properties (mean, variance, autocorrelation) do not change over time. Most models require stationary data.</td></tr>
<tr><td><strong>Seasonality</strong></td><td>Regular, predictable cycles: January formulary resets, Q4 prescription spikes before plan year ends, summer visit slowdowns.</td></tr>
<tr><td><strong>Trend</strong></td><td>Long-term directional movement: brand uptake curve, market share trajectory.</td></tr>
</tbody></table>`},
    {id:"s2",content:`<h2 id="s2">Time Series Decomposition</h2>
<p>Decomposition separates a time series into its constituent structural components, making it easier to model each component separately and understand what is driving observed patterns.</p>
<div class="flow-box">Observed Series = Trend + Seasonality + Residual (Additive model)<br>Observed Series = Trend × Seasonality × Residual (Multiplicative model)</div>
<p>Use the <strong>additive</strong> model when seasonal variation is roughly constant in magnitude regardless of the trend level. Use the <strong>multiplicative</strong> model when seasonal swings grow proportionally with the trend (common in growing brands — a 10% holiday spike on $100M is bigger than on $10M).</p>
<h3>The Three Components</h3>
<table><thead><tr><th>Component</th><th>Definition</th><th>Pharma Example</th></tr></thead><tbody>
<tr><td><strong>Trend (T)</strong></td><td>Smooth long-term direction — can be linear, polynomial, or piecewise</td><td>Brand's TRx growing 3% per quarter post-launch; then plateauing after loss of exclusivity</td></tr>
<tr><td><strong>Seasonality (S)</strong></td><td>Regular, repeating cycles at a fixed frequency (weekly, monthly, annual)</td><td>Annual: Q4 spike before plan-year end; Monthly: prescriptions drop in August (vacation); Weekly: Mondays highest for office visits</td></tr>
<tr><td><strong>Residual / Noise (R)</strong></td><td>What remains after removing trend and seasonality — random fluctuation or unexplained signal</td><td>A drug shortage in March, a competitor recall in June, a formulary change in January</td></tr>
</tbody></table>
<h3>STL Decomposition</h3>
<p>STL (Seasonal-Trend decomposition using LOESS) is the most flexible decomposition method. Unlike classical decomposition, STL handles any seasonality period, is robust to outliers, and allows the seasonal component to change gradually over time — important for long-running brands where seasonal patterns shift.</p>`},
    {id:"s3",content:`<h2 id="s3">Stationarity, ACF & PACF</h2>
<h3>Stationarity</h3>
<p>A time series is <strong>stationary</strong> if its statistical properties do not change over time: constant mean, constant variance, and autocorrelation that depends only on lag length, not on time. Most forecasting models (ARIMA, exponential smoothing) require stationary data.</p>
<p>Common sources of non-stationarity in pharma data:</p>
<ul>
<li><strong>Trend:</strong> A brand growing 5% per quarter has an increasing mean</li>
<li><strong>Variance growth:</strong> A maturing brand with volatile market share has increasing variance</li>
<li><strong>Structural break:</strong> A formulary change or patent expiry permanently shifts the series level</li>
</ul>
<h3>Making a Series Stationary</h3>
<table><thead><tr><th>Non-Stationarity Type</th><th>Fix</th></tr></thead><tbody>
<tr><td>Trend</td><td><strong>First differencing:</strong> Subtract each observation from the previous one. New series = ΔY_t = Y_t − Y_{t−1}. Repeat (second differencing) if a single diff is insufficient.</td></tr>
<tr><td>Growing variance</td><td><strong>Log transform</strong> before differencing — stabilises variance across the series range</td></tr>
<tr><td>Structural break</td><td>Add a dummy variable marking the break, or model pre/post break as separate series</td></tr>
</tbody></table>
<p>The <strong>Augmented Dickey-Fuller (ADF) test</strong> formally tests for a unit root (a key sign of non-stationarity). A p-value &lt; 0.05 rejects the null hypothesis of a unit root — the series is stationary.</p>
<h3>ACF and PACF</h3>
<p>Before fitting ARIMA, examine the autocorrelation structure of the differenced series:</p>
<table><thead><tr><th>Plot</th><th>What It Shows</th><th>How to Read It</th></tr></thead><tbody>
<tr><td><strong>ACF (Autocorrelation Function)</strong></td><td>Correlation between the series and each of its lags, including indirect effects through intermediate lags</td><td>Decays slowly → non-stationary (difference more). Sharp cutoff at lag q → MA(q) term. Gradual decay → AR component.</td></tr>
<tr><td><strong>PACF (Partial Autocorrelation Function)</strong></td><td>Direct correlation between the series and each lag, controlling for all shorter lags</td><td>Sharp cutoff at lag p → AR(p) term. Gradual decay → MA component.</td></tr>
</tbody></table>`},
    {id:"s4",content:`<h2 id="s4">ARIMA Models</h2>
<p>ARIMA (AutoRegressive Integrated Moving Average) is the classical statistical model for univariate time series forecasting. It combines three mechanisms:</p>
<table><thead><tr><th>Component</th><th>Parameter</th><th>Mechanism</th><th>Captures</th></tr></thead><tbody>
<tr><td><strong>AutoRegressive (AR)</strong></td><td>p</td><td>Regresses the series on its own past p values</td><td>Momentum — "recent values predict today's value"</td></tr>
<tr><td><strong>Integrated (I)</strong></td><td>d</td><td>Number of times the series is differenced to achieve stationarity</td><td>Trend removal</td></tr>
<tr><td><strong>Moving Average (MA)</strong></td><td>q</td><td>Regresses on past q forecast errors (shocks)</td><td>Error correction — smooths out past surprises</td></tr>
</tbody></table>
<p>Written as ARIMA(p, d, q). For seasonal data, SARIMA adds seasonal components: SARIMA(p,d,q)(P,D,Q)[m] where m is the seasonal period (12 for monthly, 52 for weekly).</p>
<h3>How to Select p, d, q</h3>
<div class="flow-box">Step 1: Plot series → check for trend/seasonality<br>Step 2: Difference until stationary (d = number of differences; verify with ADF test)<br>Step 3: Plot ACF of differenced series → cutoff at lag q gives MA(q)<br>Step 4: Plot PACF of differenced series → cutoff at lag p gives AR(p)<br>Step 5: Fit model → check residuals are white noise (no autocorrelation remaining)</div>
<h3>Exponential Smoothing (ETS)</h3>
<p>ETS models forecast by weighting recent observations more heavily than older ones, with the weight decaying exponentially into the past. Three variants handle different combinations of trend and seasonality:</p>
<table><thead><tr><th>Model</th><th>Trend</th><th>Seasonality</th><th>Best For</th></tr></thead><tbody>
<tr><td>Simple ES</td><td>None</td><td>None</td><td>Flat series with random noise</td></tr>
<tr><td>Holt's</td><td>Linear</td><td>None</td><td>Trending series without seasonality</td></tr>
<tr><td>Holt-Winters</td><td>Linear</td><td>Additive or Multiplicative</td><td>Trending series with regular seasonality — most common in pharma</td></tr>
</tbody></table>`},
    {id:"s5",content:`<h2 id="s5">Walk-Forward Validation</h2>
<p>Walk-forward validation (also called rolling origin or time series cross-validation) is the correct way to evaluate a time series model. It simulates how the model will actually be used: train on past data, forecast a future window, advance the origin, repeat.</p>
<div class="flow-box">Round 1: Train on [t0 → t10] → Forecast [t11, t12, t13]<br>Round 2: Train on [t0 → t13] → Forecast [t14, t15, t16]<br>Round 3: Train on [t0 → t16] → Forecast [t17, t18, t19]<br>Average forecast errors across all rounds = honest performance estimate</div>
<h3>Why Walk-Forward Is Essential</h3>
<p>A single train/test split tests the model only once. Walk-forward averages performance across multiple test windows, giving a more reliable and stable estimate of true out-of-sample accuracy. It also reveals whether model performance degrades over longer forecast horizons.</p>
<h3>Forecast Evaluation Metrics</h3>
<table><thead><tr><th>Metric</th><th>Formula</th><th>Interpretation</th><th>Note</th></tr></thead><tbody>
<tr><td><strong>MAPE</strong></td><td>Mean |Actual − Forecast| / Actual × 100</td><td>Average % error; intuitive for business</td><td>Undefined when actual = 0; asymmetric (over-forecasts penalised less)</td></tr>
<tr><td><strong>RMSE</strong></td><td>√ Mean(Actual − Forecast)²</td><td>Penalises large errors more heavily</td><td>In the units of the series; not directly comparable across series of different scale</td></tr>
<tr><td><strong>Bias</strong></td><td>Mean(Actual − Forecast) / Mean(Actual) × 100</td><td>Systematic over/under-forecasting; positive = under-forecast</td><td>Most important for supply chain — consistent bias leads to stock-outs or overstock</td></tr>
<tr><td><strong>Naïve baseline</strong></td><td>Forecast = last observed value (or last year's same period)</td><td>The "do-nothing" benchmark your model must beat</td><td>If your model doesn't beat the naïve forecast, use the naïve forecast</td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">Always Beat the Naïve Baseline First</div><p>Before investing in complex ARIMA or ML models, check whether a naïve model (last value, or seasonal naïve = same period last year) already achieves acceptable accuracy. For mature, stable brands with regular seasonality, the seasonal naïve baseline is surprisingly hard to beat. Model complexity should only be added when it demonstrably improves on this baseline.</p></div>`},
    {id:"s6",content:`<h2 id="s6">Key Takeaways</h2>
<ul>
<li><strong>Never use random train/test splits for time series</strong> — always use a temporal split or walk-forward validation to avoid leaking future information into the training set.</li>
<li><strong>Decompose before modelling</strong> — understanding the trend, seasonality, and residual structure guides model selection and makes the analysis interpretable to business stakeholders.</li>
<li><strong>Test for stationarity with the ADF test</strong> before fitting ARIMA; apply first-differencing to remove trend, log-transform to stabilise variance.</li>
<li><strong>ACF identifies the MA order (q); PACF identifies the AR order (p)</strong> — look for sharp cutoffs in the respective plots of the differenced, stationary series.</li>
<li><strong>Walk-forward validation</strong> gives an honest, averaged performance estimate across multiple forecast origins — a single test window is insufficient.</li>
<li><strong>Bias matters more than MAPE</strong> for supply chain applications — systematic under-forecasting causes stockouts; systematic over-forecasting causes excess inventory and write-offs.</li>
</ul>`}
  ],
  quiz:[
    {q:"A brand's weekly TRx series has been growing 5% per quarter for two years. Before fitting ARIMA, you apply first differencing. What does differencing remove?",options:["Seasonality","The trend (non-constant mean over time) — first differencing transforms the level series into a series of changes, which is typically stationary","Random noise","Autocorrelation at all lags"],answer:1},
    {q:"An ACF plot of a differenced Rx series shows a sharp cutoff at lag 2 (significant at lags 1 and 2, near zero after). The PACF decays gradually. What ARIMA model does this suggest?",options:["ARIMA(2,1,0) — AR(2) model","ARIMA(0,1,2) — MA(2) model: sharp ACF cutoff at q=2 and gradual PACF decay are the signature of an MA process","ARIMA(1,1,1)","ARIMA(2,1,2)"],answer:1},
    {q:"Walk-forward validation is preferred over a single temporal train/test split because:",options:["It is faster to compute","It evaluates the model across multiple forecast origins, producing a more reliable and stable estimate of out-of-sample accuracy than a single test window","It uses more training data","It always produces lower error metrics"],answer:1},
    {q:"A supply chain team uses a forecasting model with MAPE = 8% but Bias = +18% (consistent under-forecast). What is the most dangerous operational consequence?",options:["The model is too accurate","Consistent under-forecasting means less product is manufactured than needed — leading to stockouts, patient access failures, and lost sales","The model should be retired","MAPE of 8% is too high to act on"],answer:1},
    {q:"For a monthly brand Rx series with strong annual seasonality (Q4 spike every year), which is the most appropriate baseline model?",options:["Naïve: forecast = last month's value","Seasonal naïve: forecast = same month last year's value — this directly captures the annual seasonal pattern","A neural network","A simple moving average of the last 12 months"],answer:1}
  ]
},

"5-4": {
  id:"5-4", title:"Machine Learning in Pharma", domain:"Data Science & Pharma Use Cases", domain_id:5,
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
  id:"5-5", title:"Causal Inference & Advanced Analytics", domain:"Data Science & Pharma Use Cases", domain_id:5,
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
  id:"5-6", title:"Survival Analysis & Event Modeling", domain:"Data Science & Pharma Use Cases", domain_id:5,
  level:"Intermediate", mins:38, available:true,
  tags:["Survival Analysis","Kaplan-Meier","Cox Regression","Censoring","Hazard Ratio","Competing Risks","Time-to-Event"],
  objectives:["Explain censoring and why standard regression is inappropriate for time-to-event data","Compute and interpret Kaplan-Meier survival curves","Apply the log-rank test to compare survival between groups","Interpret Cox Proportional Hazards model output including hazard ratios","Handle competing risks in clinical and adherence outcomes"],
  toc:[
    {id:"s1",title:"Time-to-Event Problems & Censoring",level:"h2"},
    {id:"s2",title:"The Survival & Hazard Functions",level:"h2"},
    {id:"s3",title:"Kaplan-Meier Estimator",level:"h2"},
    {id:"s4",title:"Cox Proportional Hazards Model",level:"h2"},
    {id:"s5",title:"Competing Risks",level:"h2"},
    {id:"s6",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Time-to-Event Problems & Censoring</h2>
<p>Survival analysis handles a specific question: <strong>how long until an event occurs?</strong> The event could be death, disease progression, treatment discontinuation, or a patient filling a second prescription. Standard regression fails here because of <strong>censoring</strong> — we often lose track of subjects before the event occurs.</p>
<h3>Types of Censoring</h3>
<table><thead><tr><th>Type</th><th>Definition</th><th>Pharma Example</th></tr></thead><tbody>
<tr><td><strong>Right censoring</strong></td><td>Subject leaves study before event; event may happen later</td><td>Patient still on therapy at end of observation window — we know they haven't discontinued yet</td></tr>
<tr><td><strong>Left censoring</strong></td><td>Event occurred before observation began; exact time unknown</td><td>Patient was already on therapy when dataset starts — therapy start date unobserved</td></tr>
<tr><td><strong>Interval censoring</strong></td><td>Event occurred in a known interval but exact time unknown</td><td>Patient relapsed between two clinic visits; exact relapse date not recorded</td></tr>
</tbody></table>
<div class="callout warning"><div class="callout-title">Why Standard Regression Fails</div><p>If you exclude censored patients, you introduce <strong>selection bias</strong> — you only analyse patients who experienced the event, systematically underestimating survival times. If you treat censoring time as the actual event time, you introduce <strong>information bias</strong>. Survival analysis uses the censoring mechanism correctly by incorporating partial information: a patient censored at 18 months tells us they survived at least 18 months.</p></div>
<h3>Survival Analysis Setup</h3>
<div class="flow-box">
  <div class="flow-step">Define the event clearly (e.g., "first gap in therapy ≥ 30 days" = discontinuation)</div>
  <div class="flow-arrow">↓</div>
  <div class="flow-step">Set the origin time (index date): diagnosis, treatment start, or study enrollment</div>
  <div class="flow-arrow">↓</div>
  <div class="flow-step">Record duration T and event indicator E (1 = event occurred, 0 = censored) for each subject</div>
  <div class="flow-arrow">↓</div>
  <div class="flow-step">Verify censoring is non-informative: dropout unrelated to outcome (e.g., patients don't stop therapy because they're about to discontinue for other reasons)</div>
</div>`},
    {id:"s2",content:`<h2 id="s2">The Survival & Hazard Functions</h2>
<p>Two complementary functions describe the same underlying process from different angles:</p>
<h3>Survival Function S(t)</h3>
<div class="formula-box">
  <div class="formula-label">Definition</div>
  <div class="formula-main">S(t) = P(T &gt; t) — probability of surviving beyond time t</div>
</div>
<p>Properties: S(0) = 1 (everyone alive at start), S(∞) = 0 (everyone eventually experiences event), S(t) is monotonically non-increasing.</p>
<h3>Hazard Function h(t)</h3>
<div class="formula-box">
  <div class="formula-label">Definition</div>
  <div class="formula-main">h(t) = instantaneous rate of event at time t, given survival to t<br>h(t) = lim[Δt→0] P(t ≤ T &lt; t+Δt | T ≥ t) / Δt</div>
</div>
<p>The hazard is not a probability — it's a rate (can exceed 1). Think of it as: given a patient has survived to month 12, what is their instantaneous risk of discontinuing right now?</p>
<h3>Relationship Between S(t) and h(t)</h3>
<table><thead><tr><th>Concept</th><th>Formula</th><th>Interpretation</th></tr></thead><tbody>
<tr><td>Survival from hazard</td><td>S(t) = exp(−∫₀ᵗ h(u)du)</td><td>Survival is the exponentiated cumulative hazard</td></tr>
<tr><td>Cumulative hazard H(t)</td><td>H(t) = −ln S(t)</td><td>Total accumulated risk up to time t</td></tr>
<tr><td>Median survival</td><td>t where S(t) = 0.5</td><td>Time at which 50% of subjects have experienced the event</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">Hazard Shapes Tell a Story</div><p>A <strong>decreasing hazard</strong> (bathtub curve left side) suggests early fragility — patients who discontinue quickly are high-risk; survivors become a healthier cohort. A <strong>constant hazard</strong> (exponential distribution) means memoryless risk — time since start doesn't change future risk. An <strong>increasing hazard</strong> means risk accumulates over time, common in disease progression models.</p></div>`},
    {id:"s3",content:`<h2 id="s3">Kaplan-Meier Estimator</h2>
<p>The Kaplan-Meier (KM) estimator is a <strong>non-parametric</strong> method for estimating the survival function directly from data — no distributional assumptions required.</p>
<h3>How KM Works</h3>
<div class="flow-box">
  <div class="flow-step">Sort all observed times (events + censorings) in ascending order</div>
  <div class="flow-arrow">↓</div>
  <div class="flow-step">At each event time tᵢ: count nᵢ (at risk just before tᵢ) and dᵢ (events at tᵢ)</div>
  <div class="flow-arrow">↓</div>
  <div class="flow-step">Compute conditional survival probability: (nᵢ − dᵢ) / nᵢ</div>
  <div class="flow-arrow">↓</div>
  <div class="flow-step">Multiply across all event times up to t: Ŝ(t) = ∏ᵢ:tᵢ≤t [(nᵢ − dᵢ) / nᵢ]</div>
</div>
<h3>Reading a KM Curve</h3>
<table><thead><tr><th>Feature</th><th>Meaning</th></tr></thead><tbody>
<tr><td>Step drops</td><td>Each drop occurs at an event time; size of drop proportional to number of events relative to at-risk pool</td></tr>
<tr><td>Tick marks on curve</td><td>Censored observations — subject left study without experiencing event</td></tr>
<tr><td>Median survival</td><td>Time where curve crosses 0.5 on the y-axis</td></tr>
<tr><td>Wide confidence bands at tail</td><td>Few remaining at-risk subjects; estimates become unreliable</td></tr>
<tr><td>Curves that never reach 0</td><td>A proportion of subjects may never experience the event ("cure fraction")</td></tr>
</tbody></table>
<h3>Log-Rank Test</h3>
<p>To compare survival curves between two groups (e.g., treated vs. control; compliant vs. non-compliant), the <strong>log-rank test</strong> is the standard non-parametric test. It computes a weighted sum of observed-minus-expected events at each event time. Null hypothesis: the two survival functions are identical.</p>
<div class="callout info"><div class="callout-title">KM Limitation</div><p>KM is purely descriptive — it cannot adjust for confounders. If the treated group is younger on average, the KM curve comparison conflates treatment effect with age effect. For adjusted comparisons, use the Cox model.</p></div>`},
    {id:"s4",content:`<h2 id="s4">Cox Proportional Hazards Model</h2>
<p>The Cox model is the workhorse of survival analysis — a <strong>semi-parametric regression model</strong> that estimates how covariates modify the hazard rate without assuming any particular baseline hazard shape.</p>
<h3>Model Structure</h3>
<div class="formula-box">
  <div class="formula-label">Cox Model</div>
  <div class="formula-main">h(t | X) = h₀(t) × exp(β₁X₁ + β₂X₂ + … + βₚXₚ)<br><br>h₀(t) = unspecified baseline hazard (non-parametric part)<br>exp(βᵢXᵢ) = multiplicative covariate effect (parametric part)</div>
</div>
<h3>Interpreting Hazard Ratios</h3>
<table><thead><tr><th>HR Value</th><th>Interpretation</th><th>Example</th></tr></thead><tbody>
<tr><td>HR = 1.0</td><td>No difference in hazard compared to reference</td><td>Treatment has no effect on discontinuation rate</td></tr>
<tr><td>HR = 2.0</td><td>2× higher instantaneous hazard vs. reference</td><td>Non-adherent patients discontinue at twice the rate of adherent patients</td></tr>
<tr><td>HR = 0.6</td><td>40% reduction in hazard vs. reference</td><td>Drug reduces mortality hazard by 40% vs. placebo</td></tr>
<tr><td>95% CI excludes 1.0</td><td>Statistically significant at α = 0.05</td><td>HR = 0.72 [0.58–0.89] is significant</td></tr>
</tbody></table>
<h3>Proportional Hazards Assumption</h3>
<p>The model assumes hazard ratios are <strong>constant over time</strong> — the ratio of hazards between two subjects doesn't change as time passes. Violations occur when treatment effect wanes over time or when early vs. late responders differ. Diagnostic: plot log(−log S(t)) vs. log(t) for each group — lines should be parallel.</p>
<h3>Extensions</h3>
<table><thead><tr><th>Extension</th><th>When Needed</th></tr></thead><tbody>
<tr><td>Stratified Cox</td><td>PH assumption violated for a covariate — stratify by it instead of modelling it</td></tr>
<tr><td>Time-varying covariates</td><td>Exposure status changes over time (e.g., patient switches therapy)</td></tr>
<tr><td>Frailty models</td><td>Clustered data — patients within same hospital share unmeasured risk factors</td></tr>
</tbody></table>`},
    {id:"s5",content:`<h2 id="s5">Competing Risks</h2>
<p>Competing risks arise when multiple event types can preclude each other. A patient can't discontinue therapy after dying — death <em>competes</em> with discontinuation. Standard KM and Cox analyses that ignore competing events produce <strong>biased (over-estimated) cumulative incidence</strong>.</p>
<h3>Two Frameworks</h3>
<table><thead><tr><th>Approach</th><th>Quantity Estimated</th><th>Use When</th></tr></thead><tbody>
<tr><td><strong>Cause-specific hazard (CSH)</strong></td><td>Hazard of event type k, treating other events as censored</td><td>Aetiology — understanding biological or behavioral causes</td></tr>
<tr><td><strong>Subdistribution hazard (Fine-Gray)</strong></td><td>Hazard associated with the cumulative incidence function (CIF) for event k</td><td>Prognosis — predicting patient probability of experiencing event k</td></tr>
</tbody></table>
<div class="formula-box">
  <div class="formula-label">Cumulative Incidence Function</div>
  <div class="formula-main">CIF_k(t) = P(T ≤ t, cause = k) — probability of event k by time t<br>Note: ΣCIFₖ(t) + S(t) = 1 always<br>1 − KM estimator ≠ CIF when competing risks exist</div>
</div>
<h3>Pharma Applications</h3>
<table><thead><tr><th>Outcome of Interest</th><th>Competing Event</th><th>Clinical Significance</th></tr></thead><tbody>
<tr><td>Time to treatment discontinuation</td><td>Death, switch to different therapy</td><td>Adherence programs should account for patients who died vs. chose to stop</td></tr>
<tr><td>Time to disease progression</td><td>Death before progression</td><td>PFS in oncology trials; progression can't be observed post-death</td></tr>
<tr><td>Time to hospitalization</td><td>Death at home</td><td>HCRU studies — patients who die at home never get hospitalized</td></tr>
<tr><td>Time to second-line therapy</td><td>Death, lost to follow-up</td><td>LOT distribution analysis; LOT2 can't happen post-death</td></tr>
</tbody></table>
<div class="callout warning"><div class="callout-title">Common Mistake</div><p>Using 1 − KM to estimate cumulative incidence of discontinuation when death is a competing risk <strong>overestimates</strong> the discontinuation probability. KM assumes censored patients (including those who died) would eventually discontinue — they wouldn't. Always use the CIF (subdistribution approach) when reporting patient-facing probabilities in the presence of competing risks.</p></div>`},
    {id:"s6",content:`<h2 id="s6">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>Censoring is not missing data — it's partial information. Survival analysis uses censored observations correctly; naively dropping them or treating censoring time as event time both introduce bias.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>The Kaplan-Meier estimator is non-parametric and makes no distributional assumptions, but it cannot adjust for confounders. Use it for descriptive group comparisons; use Cox regression for adjusted analyses.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Hazard Ratios from Cox models are multiplicative and constant over time (proportional hazards assumption). HR = 0.70 means a 30% reduction in instantaneous risk — not a 30% improvement in probability of survival at any fixed time point.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>The proportional hazards assumption must be checked, not assumed. When it fails (e.g., immunotherapy trials where late responders have dramatically different trajectories), stratified Cox or parametric models are required.</div></div>
<div class="takeaway"><div class="takeaway-num">5</div><div>Competing risks are pervasive in pharma outcomes research. Use the cumulative incidence function (Fine-Gray) rather than 1 − KM whenever another event type can preclude the event of interest — in adherence, HCRU, and LOT studies this is almost always the case.</div></div>`}],
  questions:[
    {id:"q1",text:"A patient enrolled in an adherence study discontinues therapy 14 months after the index date. She is still alive. How should this observation be coded?",
     options:["T = 14, event = 0 (censored)","T = 14, event = 1 (discontinuation event observed)","Excluded from analysis because she didn't die","T = 0, event = 1 (therapy already started at index)"],
     correct:1,explanation:"The discontinuation event was observed at 14 months, so T = 14 and the event indicator = 1. Censoring (event = 0) applies when the patient left the study or the observation window ended without the event occurring. This patient experienced the defined event — discontinuation — so she is not censored."},
    {id:"q2",text:"A Kaplan-Meier curve comparing adherent vs. non-adherent patients shows the two curves crossing at month 18. What does this imply for analysis?",
     options:["The log-rank test result is more significant because the curves cross","The proportional hazards assumption is likely violated — the hazard ratio is not constant over time","The KM estimator has failed and the data should be re-collected","Crossing curves mean both groups have identical survival"],
     correct:1,explanation:"Crossing KM curves are a strong signal that the proportional hazards (PH) assumption is violated — hazard ratios are not constant over the follow-up period. A naive Cox model would produce a single averaged HR that misrepresents the true relationship (one group may be worse early, the other worse late). In this case, use stratified Cox, a time-varying hazard model, or a flexible parametric model. The log-rank test also loses power when curves cross."},
    {id:"q3",text:"A Cox model for time-to-hospitalization yields HR = 1.85 (95% CI: 1.42–2.41) for patients with ≥2 comorbidities vs. 0–1 comorbidities. How do you interpret this?",
     options:["Patients with ≥2 comorbidities have an 85% higher probability of being hospitalized","Patients with ≥2 comorbidities experience hospitalization 85% faster on average","At any given time point, patients with ≥2 comorbidities have 1.85× the instantaneous hazard of hospitalization compared to those with 0–1 comorbidities, and this difference is statistically significant","High comorbidity patients survive 85% less time"],
     correct:2,explanation:"A hazard ratio is a ratio of instantaneous rates at any given time t, not a difference in probabilities or times. HR = 1.85 means the instantaneous risk of hospitalization is 85% higher for the high-comorbidity group at any moment in time (given they haven't been hospitalized yet). The 95% CI [1.42, 2.41] excludes 1.0, so this is statistically significant. HR does not directly translate to percentage difference in probability of eventual hospitalization or to average time difference."},
    {id:"q4",text:"An oncology study tracks time to disease progression. 22% of patients die before showing progression. A colleague uses 1 − KM to report the 12-month cumulative incidence of progression as 48%. Why is this problematic?",
     options:["KM requires at least 200 patients; this sample is too small","1 − KM overestimates cumulative incidence when competing risks exist — patients who died cannot progress, but KM assumes they eventually would. The correct estimate uses the cumulative incidence function (CIF)","1 − KM is only valid for overall survival, not progression","The 12-month timepoint is too early for meaningful analysis"],
     correct:1,explanation:"When death is a competing risk for progression, 1 − KM overestimates the probability of progression. KM treats deaths as censored observations, implicitly assuming that censored patients would eventually progress if followed long enough — but dead patients cannot progress. The cumulative incidence function (CIF, also called the subdistribution approach or Fine-Gray method) correctly accounts for competing risks by including competing events in the risk set. Using 1 − KM in this setting inflates the reported progression rate and leads to overly optimistic assessments of disease control."},
    {id:"q5",text:"In a patient adherence model, you want to estimate the probability that a patient will voluntarily discontinue therapy (vs. die on therapy) by month 24. Which method is most appropriate?",
     options:["Kaplan-Meier, treating deaths as right-censored at the time of death","Standard logistic regression on the binary outcome at month 24","Cumulative incidence function (Fine-Gray subdistribution hazard) with death as a competing risk","Cox proportional hazards model with cause-specific hazard for discontinuation"],
     correct:2,explanation:"When the clinical question is 'what is the probability a patient voluntarily discontinues by month 24?' — a prognostic, patient-facing question — the cumulative incidence function (CIF) using Fine-Gray subdistribution hazard is the correct approach. Treating deaths as censored (KM approach) overestimates voluntary discontinuation probability by assuming all who died would eventually discontinue. The cause-specific Cox model is better for understanding aetiology (why patients discontinue) but does not directly estimate the patient-facing probability in the presence of competing risks."}
  ]
},

"5-7": {
  id:"5-7", title:"Statistics Fundamentals for Data Scientists", domain:"Data Science & Pharma Use Cases", domain_id:5,
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
  id:"5-8", title:"Advanced Machine Learning & Deep Learning", domain:"Data Science & Pharma Use Cases", domain_id:5,
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
  id:"5-9", title:"NLP & Large Language Models", domain:"Data Science & Pharma Use Cases", domain_id:5,
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
  id:"5-10", title:"MLOps & Model Deployment", domain:"Data Science & Pharma Use Cases", domain_id:5,
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
},


"5-12": {
  id:"5-12", title:"HCP Targeting & Next Best Action", domain:"Data Science & Pharma Use Cases", domain_id:5,
  level:"Intermediate", mins:35, available:true,
  tags:["HCP Targeting","Propensity Scoring","Next Best Action","Segmentation","Channel Optimization"],
  objectives:["Build a propensity-to-prescribe model from claims data","Understand Next Best Action (NBA) frameworks for field force and digital engagement","Apply contextual bandit models to channel and message selection","Measure model lift to prove commercial value of ML targeting"],
  toc:[
    {id:"s1",title:"HCP Segmentation & Targeting",level:"h2"},
    {id:"s2",title:"Propensity-to-Prescribe Modeling",level:"h2"},
    {id:"s3",title:"Next Best Action (NBA) Frameworks",level:"h2"},
    {id:"s4",title:"Channel & Message Optimization",level:"h2"},
    {id:"s5",title:"Measuring Model Lift",level:"h2"},
    {id:"s6",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">HCP Segmentation & Targeting</h2>
<p>HCP targeting is the process of identifying which healthcare providers are most likely to adopt a brand and directing sales force and digital resources toward them. Without data-driven targeting, field teams spread effort uniformly — visiting both high-potential and no-potential HCPs at the same frequency.</p>
<h3>Traditional Segmentation</h3>
<p>Classic segmentation uses a small number of rules to bucket HCPs into tiers:</p>
<table><thead><tr><th>Tier</th><th>Criteria</th><th>Field Effort</th></tr></thead><tbody>
<tr><td>Tier 1 (Target)</td><td>High volume in class, some brand prescribing or competitive use</td><td>Monthly calls, lunch programs</td></tr>
<tr><td>Tier 2 (Secondary)</td><td>Moderate volume, limited brand history</td><td>Quarterly calls, digital follow-up</td></tr>
<tr><td>Tier 3 (Low Priority)</td><td>Low volume or retired/non-prescribers</td><td>Digital only or no coverage</td></tr>
</tbody></table>
<p>Traditional tiering misses nuance: an HCP may write no prescriptions today but be highly persuadable. ML propensity scoring captures this latent potential.</p>
<h3>Feature Engineering for HCP Models</h3>
<p>The predictive features for HCP models come from multiple data sources:</p>
<table><thead><tr><th>Feature Category</th><th>Examples</th><th>Data Source</th></tr></thead><tbody>
<tr><td>Prescribing history</td><td>TRx (brand, class, competitor), trend, NRx rate</td><td>IQVIA, Symphony</td></tr>
<tr><td>Patient population</td><td>Diagnosis mix, disease severity, payer mix in their patients</td><td>Claims, EMR</td></tr>
<tr><td>HCP profile</td><td>Specialty, practice setting (solo/group/hospital), years in practice</td><td>NPPES, IQVIA universe</td></tr>
<tr><td>Engagement history</td><td>Prior sales calls, sample requests, speaker bureau participation, digital interactions</td><td>CRM (Veeva), digital platform</td></tr>
<tr><td>Network influence</td><td>KOL status, publication history, referral patterns</td><td>Definitive Healthcare, Clarivate</td></tr>
</tbody></table>`},
    {id:"s2",content:`<h2 id="s2">Propensity-to-Prescribe Modeling</h2>
<p>A propensity-to-prescribe (P2P) model predicts the probability that an HCP will write a prescription for a brand within a defined time horizon (e.g., next 90 days). It is a binary classification problem: prescriber (1) vs. non-prescriber (0) within the window.</p>
<h3>Model Development Steps</h3>
<table><thead><tr><th>Step</th><th>What Happens</th></tr></thead><tbody>
<tr><td>1. Define the outcome</td><td>Label HCPs as 1 (wrote ≥1 Rx in next 90 days) or 0 (wrote 0 Rx)</td></tr>
<tr><td>2. Build feature matrix</td><td>Assemble prescribing, patient, HCP, and engagement features at the observation date</td></tr>
<tr><td>3. Train-test split</td><td>Use temporal split — train on HCPs observed before date X, test on HCPs observed after X (prevents data leakage)</td></tr>
<tr><td>4. Train model</td><td>XGBoost or Logistic Regression; tune via cross-validation</td></tr>
<tr><td>5. Score all HCPs</td><td>Produce a score 0–1 for every HCP in the universe</td></tr>
<tr><td>6. Rank and target</td><td>Field team is assigned the top N HCPs per territory by score</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">Temporal Split Is Critical</div><p>In HCP targeting models, you must never use a random train-test split. A random split would allow the model to learn from HCPs who have "future" data in the training set, inflating performance. Always split by time: train on period T, test on period T+1. This mirrors real deployment where the model scores today's universe to predict tomorrow's prescribing.</p></div>
<h3>Key Model Outputs</h3>
<ul>
<li><strong>Probability score (0–1):</strong> The raw model output; used to rank and prioritise HCPs.</li>
<li><strong>Decile/segment:</strong> HCPs ranked into 10 equal groups; top 2 deciles typically receive heaviest coverage.</li>
<li><strong>SHAP feature importance:</strong> For each HCP, which features drove the score up or down — enables field reps to have informed conversations ("your patients have high PA denial rates, here's our support programme").</li>
</ul>`},
    {id:"s3",content:`<h2 id="s3">Next Best Action (NBA) Frameworks</h2>
<p>Next Best Action moves beyond static targeting to dynamic, real-time decisioning: given everything known about this HCP right now, what is the single most valuable action to take next — a detailing visit, a sample drop, a digital message, a congress invitation, nothing?</p>
<h3>NBA vs Traditional Targeting</h3>
<table><thead><tr><th>Dimension</th><th>Traditional Targeting</th><th>Next Best Action</th></tr></thead><tbody>
<tr><td>Frequency</td><td>Updated quarterly or semi-annually</td><td>Updated daily or real-time</td></tr>
<tr><td>Output</td><td>A tier or segment</td><td>A specific action with a channel and message</td></tr>
<tr><td>Input signals</td><td>Prescribing data only</td><td>Prescribing + CRM + digital + sample + payer + recent triggers</td></tr>
<tr><td>Optimises for</td><td>Volume potential</td><td>Incremental lift given this HCP's current state</td></tr>
</tbody></table>
<h3>Contextual Bandit Models</h3>
<p>The core ML engine in NBA is often a <strong>contextual bandit</strong> — a reinforcement learning framework that learns which action (arm) produces the best reward (HCP engagement, prescription) given the HCP's context (features at this moment).</p>
<div class="flow-box">Context (HCP features) → Model selects Action → Observe Reward → Update Model</div>
<p>Unlike a full RL model, bandits operate action-by-action without planning multi-step sequences. This makes them practical to deploy in commercial pharma environments where feedback loops (a new prescription) arrive weekly or monthly.</p>
<h3>Common NBA Actions in Pharma</h3>
<ul>
<li><strong>Field visit:</strong> In-person detailing by rep</li>
<li><strong>Digital email/push:</strong> Brand content, clinical data, access information</li>
<li><strong>Sample:</strong> Starter samples to reduce first-prescription barrier</li>
<li><strong>Speaker programme invitation:</strong> Peer-to-peer education for high-influence HCPs</li>
<li><strong>Patient support referral:</strong> Alert HCP that their patient qualified for co-pay assistance</li>
<li><strong>No action:</strong> Model correctly identifies HCPs where outreach has negative or zero expected value</li>
</ul>`},
    {id:"s4",content:`<h2 id="s4">Channel & Message Optimization</h2>
<p>Even if you know which HCPs to target, you need to know <em>how</em> to reach them and <em>what</em> to say. Channel and message optimization applies ML to maximise engagement rates and ultimately prescription lift.</p>
<h3>Channel Preference Modeling</h3>
<p>A channel preference model predicts — for each HCP — which channel (field, email, webinar, social, remote call) produces the highest open/engagement rate. It is a multi-class classification or separate binary models per channel.</p>
<table><thead><tr><th>Channel</th><th>Best for</th><th>KPI</th></tr></thead><tbody>
<tr><td>Field detailing</td><td>High-value target prescribers; complex data conversations</td><td>Call quality score, sample requests, prescription change in 4 weeks post-call</td></tr>
<tr><td>Email/digital</td><td>Tier 2–3, reactive HCPs, digital-first practices</td><td>Open rate, click-through rate, content engagement time</td></tr>
<tr><td>Remote/virtual call</td><td>Rural HCPs, time-constrained specialists</td><td>Session completion rate, follow-up request</td></tr>
<tr><td>Speaker programme</td><td>KOLs and mid-tier opinion leaders</td><td>Programme attendance, peer advocacy actions</td></tr>
</tbody></table>
<h3>Message Testing (A/B at Scale)</h3>
<p>With NBA platforms, every HCP interaction is an experiment. The model explores different messages and learns which resonate with which HCP profiles. Key message dimensions tested:</p>
<ul>
<li><strong>Clinical data emphasis:</strong> Efficacy (OS/PFS data) vs. safety (tolerability) vs. patient quality of life</li>
<li><strong>Access/reimbursement:</strong> Formulary coverage details, patient assistance programme information</li>
<li><strong>Patient type relevance:</strong> Messages tailored to the HCP's actual patient population (e.g., "for your EGFR-mutant NSCLC patients specifically...")</li>
</ul>`},
    {id:"s5",content:`<h2 id="s5">Measuring Model Lift</h2>
<p>The business value of ML targeting is proved through lift — the incremental prescribing generated by model-directed targeting compared to a control (random or no targeting). Without measuring lift, you cannot prove the model adds value over intuition or legacy rules.</p>
<h3>Lift Curve</h3>
<p>A lift curve shows how much better than random the model performs at each decile. If targeting the top 20% of model-scored HCPs generates 50% of total prescriptions, the lift is 2.5× (50% ÷ 20%).</p>
<div class="flow-box">Lift at Decile K = (% of prescriptions in top K deciles) ÷ (K ÷ 10)</div>
<h3>A/B Test Design for Targeting Models</h3>
<p>To prove incremental lift from a new NBA model:</p>
<ol>
<li><strong>Randomise at territory level</strong> (not HCP level) — HCPs within a territory share the same rep, so randomising within territory would contaminate the experiment</li>
<li><strong>Treatment arm:</strong> Reps follow NBA model recommendations</li>
<li><strong>Control arm:</strong> Reps follow legacy targeting rules</li>
<li><strong>Primary KPI:</strong> NBRx or TRx growth per territory in the 90–180 day test window</li>
<li><strong>Analyse with DiD:</strong> Compare pre-post prescription change between treatment and control territories</li>
</ol>
<h3>Key Lift Metrics</h3>
<table><thead><tr><th>Metric</th><th>Definition</th></tr></thead><tbody>
<tr><td>Raw lift</td><td>Avg prescriptions per targeted HCP ÷ Avg prescriptions per untargeted HCP</td></tr>
<tr><td>Incremental Rx</td><td>Prescriptions attributable to targeting beyond baseline trend</td></tr>
<tr><td>Return on targeting investment (ROTI)</td><td>Incremental revenue from lift ÷ Cost of field calls or digital campaigns</td></tr>
</tbody></table>`},
    {id:"s6",content:`<h2 id="s6">Key Takeaways</h2>
<ul>
<li><strong>Propensity-to-prescribe</strong> is a binary classification problem trained on historical prescribing behaviour with temporal (not random) train-test split.</li>
<li><strong>NBA goes beyond targeting</strong> — it recommends a specific action and channel, updated dynamically as new data arrives.</li>
<li><strong>Contextual bandits</strong> are the ML engine behind NBA: they learn which action produces the best reward given each HCP's current context.</li>
<li><strong>Feature engineering</strong> matters more than algorithm choice — prescribing trends, patient mix, engagement history, and network influence are all predictive signals.</li>
<li><strong>SHAP values</strong> make model outputs actionable: field reps understand <em>why</em> an HCP is scored high and can tailor their conversation accordingly.</li>
<li><strong>Prove value through lift curves and controlled A/B tests</strong> — randomise at territory level to avoid contamination between treatment and control HCPs.</li>
</ul>`}
  ],
  quiz:[
    {q:"Why must HCP propensity models use a temporal train-test split rather than a random split?",options:["Random splits use too much data","A temporal split prevents the model learning from future data it would not have in real deployment","Temporal splits produce higher AUC scores","HCP data is too small for random splits"],answer:1},
    {q:"A propensity model scores all HCPs 0–1. The top 20% of HCPs account for 60% of total prescriptions. What is the lift at the top 2 deciles?",options:["3×","2×","1.2×","0.6×"],answer:0},
    {q:"What differentiates Next Best Action from traditional HCP tiering?",options:["NBA uses more data fields","NBA recommends a specific action and channel in real-time, updated dynamically","NBA only applies to field force","NBA ignores prescribing history"],answer:1},
    {q:"Why is territory-level randomisation preferred over HCP-level randomisation in NBA A/B tests?",options:["It is cheaper","HCPs within a territory share the same rep, so HCP-level randomisation would contaminate the experiment","Territories are always equal in size","HCP-level data is not available"],answer:1},
    {q:"SHAP values in an HCP targeting model are most useful for:",options:["Improving model AUC","Helping field reps understand why a specific HCP is high-priority and tailor their conversation","Reducing model training time","Removing outlier HCPs from the scoring universe"],answer:1}
  ]
},

"5-13": {
  id:"5-13", title:"Patient Adherence & Journey Analytics", domain:"Data Science & Pharma Use Cases", domain_id:5,
  level:"Intermediate", mins:35, available:true,
  tags:["Patient Journey","Adherence","Survival Analysis","Risk Stratification","Claims Analytics"],
  objectives:["Map a patient journey from diagnosis to discontinuation using claims data","Apply survival analysis to model time-to-discontinuation","Build a patient adherence risk model for early intervention","Understand patient support programme (PSP) analytics"],
  toc:[
    {id:"s1",title:"Patient Journey from Claims Data",level:"h2"},
    {id:"s2",title:"Survival Analysis for Adherence",level:"h2"},
    {id:"s3",title:"Adherence Prediction Models",level:"h2"},
    {id:"s4",title:"Risk Stratification & Early Intervention",level:"h2"},
    {id:"s5",title:"Patient Support Programme Analytics",level:"h2"},
    {id:"s6",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Patient Journey from Claims Data</h2>
<p>A patient journey is the sequence of clinical events — diagnosis, treatment initiation, adherence, dose changes, treatment switches, and discontinuation — reconstructed from claims data. Claims data does not tell us why patients do things; it tells us <em>what</em> happened and <em>when</em>.</p>
<h3>Reconstructing the Journey</h3>
<table><thead><tr><th>Event</th><th>How to Identify in Claims</th></tr></thead><tbody>
<tr><td>Diagnosis</td><td>ICD-10 diagnosis code on a medical claim</td></tr>
<tr><td>Treatment initiation</td><td>First pharmacy claim for the drug after diagnosis (no prior fill in 12-month look-back)</td></tr>
<tr><td>Dose escalation</td><td>Increase in days supply or NDC code change to higher strength</td></tr>
<tr><td>Treatment switch</td><td>New drug claim in same class within 30 days of last fill of previous drug</td></tr>
<tr><td>Discontinuation</td><td>Gap in pharmacy claims exceeding a threshold (typically 45–60 days beyond days supply)</td></tr>
<tr><td>Restart</td><td>New fill after a discontinuation gap — patient re-initiates therapy</td></tr>
<tr><td>Hospitalisation</td><td>Inpatient facility claim — a complication or disease progression event</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">Defining the Discontinuation Threshold</div><p>The gap threshold (e.g., 45 days after days supply expires) is a study design choice that affects how many patients are classified as discontinued. A narrow gap (30 days) flags many short refill delays as discontinuations. A wide gap (90 days) undercounts discontinuations. Most adherence studies use 45–60 days and conduct sensitivity analyses at other thresholds.</p></div>
<h3>Sankey Diagrams for Journey Visualisation</h3>
<p>A Sankey diagram maps patient flows across treatment states over time. Each column represents a time point (Month 3, Month 6, Month 12) and each band represents patients moving between states (On Brand A → Switched to Brand B → Discontinued → Restarted Brand A). Sankeys are the standard output for treatment pattern analytics in oncology and specialty disease.</p>`},
    {id:"s2",content:`<h2 id="s2">Survival Analysis for Adherence</h2>
<p>Survival analysis models the time until an event — in adherence analytics, the event is discontinuation. It handles <strong>censoring</strong>: patients who have not yet discontinued at the end of the observation window are not excluded; they contribute data up to their last known date.</p>
<h3>Kaplan-Meier (KM) Estimator</h3>
<p>KM produces a survival curve: the probability that a patient remains on therapy at each time point.</p>
<div class="flow-box">S(t) = Π [1 − (events at t) / (patients at risk at t)]</div>
<p><strong>Reading a KM curve:</strong></p>
<ul>
<li>Y-axis: probability of still being on therapy (1.0 at start, declining over time)</li>
<li>X-axis: time from initiation (days or months)</li>
<li>Median persistence: where the curve crosses 0.50 — the point at which 50% of patients have discontinued</li>
<li>Tick marks: censored patients (still on therapy at end of follow-up)</li>
</ul>
<h3>Log-Rank Test</h3>
<p>Compares survival curves between two groups (e.g., patients with co-pay assistance vs. without). A significant log-rank p-value means the groups have different discontinuation patterns — not just at one time point but across the entire follow-up period.</p>
<h3>Cox Proportional Hazards Model</h3>
<p>Cox regression extends survival analysis to multiple predictors simultaneously — modelling which patient characteristics are associated with faster or slower discontinuation.</p>
<div class="flow-box">h(t|X) = h₀(t) × exp(β₁X₁ + β₂X₂ + ... + βₙXₙ)</div>
<p>Output: <strong>Hazard Ratios (HR)</strong>. HR = 1.40 for "no co-pay assistance" means patients without co-pay support are 40% more likely to discontinue at any given time point than patients with support — a direct measure of the programme's value.</p>`},
    {id:"s3",content:`<h2 id="s3">Adherence Prediction Models</h2>
<p>Rather than measuring adherence after the fact, a predictive model identifies patients at high risk of discontinuation <em>early</em> — while there is still time to intervene through a patient support programme, nurse educator call, or co-pay assistance outreach.</p>
<h3>Problem Framing</h3>
<p>This is a binary classification problem: will this patient discontinue within the next 60 days? The model is retrained and scored periodically (weekly or monthly) so risk scores stay current.</p>
<h3>Predictive Features</h3>
<table><thead><tr><th>Feature Category</th><th>Examples</th></tr></thead><tbody>
<tr><td>Refill behaviour</td><td>Days to first refill, PDC at Month 1, refill gap trend</td></tr>
<tr><td>Cost / access</td><td>Patient OOP at last fill, PA status, formulary tier, co-pay card usage</td></tr>
<tr><td>Disease severity</td><td>Comorbidity index, number of concomitant medications, hospitalisation history</td></tr>
<tr><td>Demographics</td><td>Age, geographic region, payer type (commercial vs Medicare vs Medicaid)</td></tr>
<tr><td>HCP engagement</td><td>Months since last HCP visit, specialist vs PCP prescriber</td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">Early Refill Signal</div><p>One of the strongest adherence predictors is the time between prescription fill and refill relative to the days supply. A patient who refills on Day 35 of a 30-day supply is showing engagement. A patient who refills on Day 45 is already showing a gap. A patient who hasn't refilled on Day 50 is very likely to discontinue. This simple time-delta feature often ranks in the top 3 SHAP features.</p></div>
<h3>Model Evaluation Metrics</h3>
<p>Standard binary classification metrics apply, but the business priority shapes which to optimise:</p>
<table><thead><tr><th>Metric</th><th>When to optimise</th></tr></thead><tbody>
<tr><td>Precision (PPV)</td><td>Intervention is expensive (nurse call) — minimise wasted outreach on low-risk patients</td></tr>
<tr><td>Recall (Sensitivity)</td><td>Missing a high-risk patient is costly — catch as many at-risk patients as possible</td></tr>
<tr><td>AUC-ROC</td><td>Overall model discrimination — threshold-independent summary statistic</td></tr>
</tbody></table>`},
    {id:"s4",content:`<h2 id="s4">Risk Stratification & Early Intervention</h2>
<p>A risk score is only valuable if it triggers an action. Risk stratification maps model output scores into actionable tiers with corresponding interventions.</p>
<table><thead><tr><th>Risk Tier</th><th>Score Range</th><th>% of Patients</th><th>Intervention</th></tr></thead><tbody>
<tr><td><strong>High Risk</strong></td><td>0.70–1.00</td><td>~10–15%</td><td>Proactive nurse educator call within 7 days; co-pay assistance outreach; HCP alert</td></tr>
<tr><td><strong>Medium Risk</strong></td><td>0.40–0.69</td><td>~25–30%</td><td>Automated refill reminder (SMS/email); digital engagement; co-pay card reminder</td></tr>
<tr><td><strong>Low Risk</strong></td><td>0–0.39</td><td>~55–65%</td><td>Standard programme touchpoints; no special intervention</td></tr>
</tbody></table>
<h3>Measuring Intervention Effectiveness</h3>
<p>To prove the intervention — not just the risk model — adds value, use a randomised holdout within the high-risk cohort:</p>
<ul>
<li><strong>Treatment group:</strong> High-risk patients who receive the intervention</li>
<li><strong>Control group:</strong> High-risk patients randomly withheld from intervention</li>
<li><strong>Primary endpoint:</strong> Persistence rate at 90 days — is the treatment group's curve significantly higher?</li>
</ul>
<div class="callout info"><div class="callout-title">The Ethical Consideration</div><p>Withholding a potentially beneficial intervention from control patients raises ethics questions. Best practice: use a minimum detectable effect calculation to size the test as small as possible, run the test for the minimum required duration, then roll out intervention to all high-risk patients once effectiveness is proved.</p></div>`},
    {id:"s5",content:`<h2 id="s5">Patient Support Programme Analytics</h2>
<p>Patient Support Programmes (PSPs) — also called hubs or patient services — provide co-pay assistance, adherence calls, specialty pharmacy coordination, and prior auth support for specialty drugs. Analytics teams measure PSP performance and optimise programme design.</p>
<h3>Key PSP KPIs</h3>
<table><thead><tr><th>KPI</th><th>Formula</th><th>What It Signals</th></tr></thead><tbody>
<tr><td>Enrolment rate</td><td>Patients enrolled ÷ Patients initiated × 100</td><td>How many patients are connected to support</td></tr>
<tr><td>Activation rate</td><td>Enrolled patients who receive first dispense ÷ Enrolled × 100</td><td>Conversion from enrolment to actual therapy start</td></tr>
<tr><td>Abandonment rate</td><td>Prescriptions abandoned ÷ Prescriptions submitted × 100</td><td>Patient access friction — cost, PA denials</td></tr>
<tr><td>90-day persistence</td><td>% of enrolled patients still on therapy at Day 90</td><td>Programme's short-term adherence impact</td></tr>
<tr><td>PA approval rate</td><td>PA approvals ÷ PA submissions × 100</td><td>Payer access environment quality</td></tr>
<tr><td>Co-pay assistance utilisation</td><td>Patients using co-pay card ÷ Eligible patients × 100</td><td>Access programme penetration</td></tr>
</tbody></table>
<h3>PSP vs. Non-PSP Patient Comparison</h3>
<p>A key analytics deliverable is comparing outcomes between patients enrolled in the PSP and those not enrolled. Because enrolment is not random (sicker, higher-cost patients self-select into PSPs), naive comparison overstates PSP impact. Propensity score matching (PSM) controls for selection bias by creating a matched control group of non-enrolled patients with similar baseline characteristics.</p>
<div class="flow-box">PSM Steps: Estimate propensity to enrol (logistic regression) → Match enrolled + non-enrolled patients on propensity score → Compare outcomes in matched cohort</div>`},
    {id:"s6",content:`<h2 id="s6">Key Takeaways</h2>
<ul>
<li><strong>Claims data reconstructs the patient journey</strong> through a sequence of pharmacy and medical claim events; discontinuation is defined as a gap beyond a threshold (typically 45–60 days after days supply expires).</li>
<li><strong>Kaplan-Meier curves</strong> visualise persistence; the median persistence is where the curve crosses 0.50.</li>
<li><strong>Cox Hazard Ratios</strong> quantify the impact of patient characteristics on discontinuation risk; HR &gt; 1 = increased hazard (faster discontinuation).</li>
<li><strong>Adherence prediction models</strong> are binary classifiers; the single strongest feature is often the early refill behaviour — the time between days supply expiry and actual refill date.</li>
<li><strong>Risk stratification maps model scores to actions</strong> — high risk triggers a nurse call, medium risk triggers a digital reminder, low risk gets standard touchpoints.</li>
<li><strong>PSP analytics requires propensity score matching</strong> to control for selection bias when comparing enrolled vs. non-enrolled patient outcomes.</li>
</ul>`}
  ],
  quiz:[
    {q:"In claims data, how is treatment discontinuation typically identified?",options:["Patient calls the pharmacy to cancel","A gap in pharmacy claims exceeding a defined threshold (e.g., 45–60 days) beyond the last days supply","The ICD-10 code for treatment cessation","The HCP submits a cancellation form"],answer:1},
    {q:"A KM curve for Brand A crosses 0.50 at Month 8. What does this mean?",options:["50% of patients have experienced an adverse event by Month 8","The median persistence on Brand A is 8 months","80% of patients are still on therapy at Month 8","The drug was approved at Month 8"],answer:1},
    {q:"A Cox proportional hazards model gives HR = 1.35 for 'no co-pay assistance'. What does this mean?",options:["Patients with co-pay assistance are 35% more likely to discontinue","Patients without co-pay assistance are 35% more likely to discontinue at any given time","Co-pay assistance has no statistical effect","The result is not interpretable without the full model"],answer:1},
    {q:"Why is propensity score matching used when comparing PSP-enrolled vs. non-enrolled patients?",options:["PSP data is smaller than non-PSP data","PSP enrolment is not random — sicker patients self-select in, creating selection bias","Randomised trials are not allowed in pharma","Propensity scores improve model AUC"],answer:1},
    {q:"Which feature is typically one of the strongest predictors in a patient adherence risk model?",options:["Patient age","Time between days supply expiry and actual refill date (early vs. late refill behaviour)","Number of prior hospitalizations","Patient zip code"],answer:1}
  ]
},

"5-14": {
  id:"5-14", title:"Commercial Forecasting with ML", domain:"Data Science & Pharma Use Cases", domain_id:5,
  level:"Intermediate", mins:35, available:true,
  tags:["Forecasting","Demand Planning","Time Series","Launch Forecast","ARIMA","Prophet","ML Forecasting"],
  objectives:["Distinguish the types of commercial forecast used in pharma and their purposes","Apply time-series methods (ARIMA, Prophet) to Rx forecasting","Build an ML-based demand forecast with external predictors","Design a launch forecast using analogues and epidemiology","Measure forecast accuracy with MAPE, WAPE, and bias"],
  toc:[
    {id:"s1",title:"Types of Commercial Forecast in Pharma",level:"h2"},
    {id:"s2",title:"Time-Series Methods",level:"h2"},
    {id:"s3",title:"ML-Based Forecasting",level:"h2"},
    {id:"s4",title:"Launch Forecasting",level:"h2"},
    {id:"s5",title:"Forecast Accuracy Metrics",level:"h2"},
    {id:"s6",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Types of Commercial Forecast in Pharma</h2>
<p>Pharma forecasting spans multiple time horizons, purposes, and teams. The same brand may have five different forecasts produced simultaneously for different business decisions.</p>
<table><thead><tr><th>Forecast Type</th><th>Horizon</th><th>Purpose</th><th>Primary Input</th></tr></thead><tbody>
<tr><td><strong>Short-term demand forecast</strong></td><td>4–13 weeks</td><td>Supply chain — how much to manufacture and ship</td><td>Point-of-sale data, wholesaler inventory, seasonality</td></tr>
<tr><td><strong>Brand performance forecast</strong></td><td>Rolling 12–18 months</td><td>Brand P&amp;L, budget vs. actual tracking</td><td>IQVIA/Symphony prescribing data, field activity</td></tr>
<tr><td><strong>Strategic / LRP forecast</strong></td><td>5–10 years</td><td>Long-Range Plan — investor guidance, pipeline valuation</td><td>Epidemiology, market growth assumptions, competitive scenario</td></tr>
<tr><td><strong>Launch forecast</strong></td><td>Years 1–5 post-launch</td><td>Set expectations, resource allocation, supply planning</td><td>Analogues, epidemiology, market research</td></tr>
<tr><td><strong>GTN / net revenue forecast</strong></td><td>Annual + quarterly</td><td>Finance P&amp;L — net revenue after rebates and chargebacks</td><td>Brand forecast × net price assumptions</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">Forecast ≠ Target</div><p>A commercial forecast is a probability-weighted estimate of what will happen given current assumptions. A target is a performance goal the organisation commits to achieving. These are often confused — a brand team that engineers the forecast to match the target destroys the forecast's value as an unbiased planning tool.</p></div>`},
    {id:"s2",content:`<h2 id="s2">Time-Series Methods</h2>
<p>Time-series methods model the Rx data itself — its trend, seasonality, and autocorrelation — to extrapolate forward. They are effective for mature brands with stable, predictable patterns.</p>
<h3>ARIMA (AutoRegressive Integrated Moving Average)</h3>
<p>ARIMA decomposes the series into three components:</p>
<table><thead><tr><th>Component</th><th>Parameter</th><th>What It Captures</th></tr></thead><tbody>
<tr><td>AutoRegressive (AR)</td><td>p</td><td>Correlation with past values — "last week's Rx predicts this week's"</td></tr>
<tr><td>Integrated (I)</td><td>d</td><td>Differencing to remove trend — how many times to difference for stationarity</td></tr>
<tr><td>Moving Average (MA)</td><td>q</td><td>Correlation with past forecast errors — smooths out noise spikes</td></tr>
</tbody></table>
<p>ARIMA(p,d,q) is written with these parameters. Auto-ARIMA algorithms select the best (p,d,q) combination via AIC/BIC minimisation.</p>
<h3>Prophet (Meta)</h3>
<p>Prophet is a time-series library designed for business forecasting. Its key advantages for pharma:</p>
<ul>
<li><strong>Handles missing data</strong> and irregular time points (common with IQVIA monthly drops)</li>
<li><strong>Automatic seasonality detection</strong> — weekly, monthly, and annual patterns</li>
<li><strong>Holiday and event effects</strong> — models discrete events like formulary changes, competitor launches, or COVID impact</li>
<li><strong>Trend changepoints</strong> — automatically detects when the brand's growth trajectory shifted</li>
<li><strong>Uncertainty intervals</strong> — returns high/low confidence bands around the forecast</li>
</ul>
<h3>Seasonal Decomposition</h3>
<p>Before modelling, decompose the series to understand its components:</p>
<div class="flow-box">Series = Trend + Seasonality + Residual</div>
<p>Pharma-specific seasonality patterns: Q4 prescription spikes before plan year resets; summer lulls in HCP office visits; January formulary coverage changes (Medicare PDPs reset).</p>`},
    {id:"s3",content:`<h2 id="s3">ML-Based Forecasting</h2>
<p>ML forecasting treats the prediction problem as a standard supervised regression: engineer lag features and external predictors, train a model on historical data, predict the future period.</p>
<h3>Feature Engineering for Rx Forecasting</h3>
<table><thead><tr><th>Feature Type</th><th>Examples</th></tr></thead><tbody>
<tr><td>Lag features</td><td>TRx at t−1, t−2, t−4 (last week, two weeks ago, one month ago)</td></tr>
<tr><td>Rolling statistics</td><td>4-week rolling mean, 8-week rolling standard deviation, momentum (t vs. t−4)</td></tr>
<tr><td>Seasonality</td><td>Month of year, week of year, quarter — encoded as cyclical features (sin/cos) or one-hot</td></tr>
<tr><td>Competitive signals</td><td>Class TRx, competitor NBRx share, new competitor launch date flags</td></tr>
<tr><td>Market access events</td><td>Formulary tier change date, PA policy change, step-edit addition</td></tr>
<tr><td>Field activity</td><td>Number of HCP calls in prior week, sample drops, speaker programme events</td></tr>
<tr><td>Macro signals</td><td>New diagnosis rates, population growth, Medicare enrolment</td></tr>
</tbody></table>
<h3>Gradient Boosting for Forecasting</h3>
<p>LightGBM and XGBoost with lag features frequently outperform ARIMA on pharma Rx series with many external drivers. They handle non-linear interactions (e.g., field effort effect is higher when formulary coverage is strong) that ARIMA cannot capture.</p>
<h3>Ensemble Forecasting</h3>
<p>Best-in-class commercial forecasts combine multiple methods: ARIMA captures autocorrelation; Prophet captures seasonality; LightGBM captures external drivers. A simple average or stacked meta-model of these three often beats any single method by 5–15% MAPE improvement.</p>`},
    {id:"s4",content:`<h2 id="s4">Launch Forecasting</h2>
<p>Pre-launch, there is no historical Rx data for the brand. Launch forecasting relies on analogue analysis, epidemiology, and market research.</p>
<h3>Analogue-Based Forecasting</h3>
<p>Select 3–5 brands that launched in a similar indication, with similar mechanism of action and competitive context. Map their launch trajectories (months 1–24 post-launch normalised to launch TRx = 100) and create a range: base case, upside, downside.</p>
<table><thead><tr><th>Analogue Selection Criteria</th><th>Why It Matters</th></tr></thead><tbody>
<tr><td>Same or similar indication</td><td>Patient population and diagnosis rate should be comparable</td></tr>
<tr><td>Similar mechanism (1st in class vs. me-too)</td><td>First-in-class drugs ramp faster; me-too drugs with differentiated profiles can too</td></tr>
<tr><td>Similar launch era (within 5 years)</td><td>Market access environment, payer landscape, and digital engagement norms change over time</td></tr>
<tr><td>Similar formulary access at launch</td><td>A drug with preferred formulary at launch 3 months post-approval ramps very differently than one without</td></tr>
</tbody></table>
<h3>Epidemiology-Based Patient Flow</h3>
<div class="flow-box">Addressable patients = Diagnosed prevalent patients × Treated rate × Brand share assumption</div>
<p>Each assumption carries a range; scenario analysis explores the impact of each assumption on Year-1 and Year-3 forecasts. Epidemiology inputs come from published literature, IMS Health data, or primary market research.</p>`},
    {id:"s5",content:`<h2 id="s5">Forecast Accuracy Metrics</h2>
<p>Forecast accuracy metrics quantify how far off the forecast was from actuals. Tracking these over time drives model improvement and builds credibility with finance and brand teams.</p>
<table><thead><tr><th>Metric</th><th>Formula</th><th>Interpretation</th></tr></thead><tbody>
<tr><td><strong>MAPE</strong></td><td>Mean |Actual − Forecast| ÷ Actual × 100</td><td>Average percentage error; penalises large misses equally above and below</td></tr>
<tr><td><strong>WAPE</strong></td><td>Σ|Actual − Forecast| ÷ Σ Actual × 100</td><td>Weighted by volume — large territory errors count more than small territory errors</td></tr>
<tr><td><strong>Bias</strong></td><td>Mean (Actual − Forecast) ÷ Actual × 100</td><td>Systematic over- or under-forecast; positive = under-forecasting (actuals exceed forecast)</td></tr>
<tr><td><strong>RMSE</strong></td><td>√ Mean(Actual − Forecast)²</td><td>Penalises large errors more than MAPE; good when large misses are particularly costly</td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">Bias Is More Important Than MAPE</div><p>A model with 12% MAPE but zero bias is more trustworthy than one with 8% MAPE and +15% bias (consistently under-forecasting). Systematic bias means the model has a structural flaw — an unmodelled trend, a competitive assumption that is always wrong, or a seasonality factor that is inverted. Track bias by period and by segment (by territory, by payer) to find where the structural error lives.</p></div>
<h3>Forecast Value Added (FVA)</h3>
<p>FVA compares model forecast accuracy to a naïve baseline (e.g., the last observed value, or last year's same period). If the model's MAPE is not better than the naïve baseline, the model adds no value — ship the simpler approach.</p>
<div class="flow-box">FVA = Naïve Baseline MAPE − Model MAPE (positive FVA = model is better)</div>`},
    {id:"s6",content:`<h2 id="s6">Key Takeaways</h2>
<ul>
<li><strong>Different forecast types serve different decisions</strong> — supply chain needs weekly precision; LRP needs scenario ranges; launch forecasts need analogue benchmarks.</li>
<li><strong>ARIMA and Prophet</strong> are the workhorses for mature brand time-series forecasting; ARIMA models autocorrelation, Prophet handles trend changepoints and irregular events.</li>
<li><strong>ML forecasting</strong> (LightGBM, XGBoost with lag features) adds value when external drivers (competitive events, formulary changes, field activity) explain more variance than the series itself.</li>
<li><strong>Ensemble forecasting</strong> — averaging ARIMA, Prophet, and ML outputs — consistently outperforms any single model by 5–15%.</li>
<li><strong>Bias matters more than MAPE</strong>: systematic over- or under-forecasting signals a structural model flaw, not just random noise.</li>
<li><strong>Launch forecasting without Rx history</strong> relies on analogues and epidemiology patient flow models — formulary access at launch is the single biggest driver of uptake speed.</li>
</ul>`}
  ],
  quiz:[
    {q:"A pharma company needs a weekly forecast to decide how much product to ship to wholesalers this month. Which forecast type is most relevant?",options:["5-year LRP forecast","Short-term demand forecast (4–13 weeks)","Launch analogue forecast","GTN net revenue forecast"],answer:1},
    {q:"Prophet's main advantage over ARIMA for pharma Rx forecasting is:",options:["It always produces more accurate forecasts","It handles trend changepoints, holidays/events, and missing data with minimal manual tuning","It requires no historical data","It models competitive dynamics automatically"],answer:1},
    {q:"A forecast consistently under-predicts actuals by +12% across all months. This is a sign of:",options:["High MAPE","Systematic positive bias — the model has a structural flaw that should be investigated","Random noise","Good model performance — 12% is acceptable"],answer:1},
    {q:"Forecast Value Added (FVA) is negative. What does this mean?",options:["The model is very accurate","The model is less accurate than a naïve baseline — the simpler approach should be used","The brand is under-performing","The forecast was not run correctly"],answer:1},
    {q:"In analogue-based launch forecasting, why must analogues be selected from a similar launch era?",options:["Because older data is unavailable","Market access environment, payer landscape, and competitive norms change over time — a 10-year-old launch may not reflect today's conditions","Regulatory requirements changed","Older analogues have different ICD-10 codes"],answer:1}
  ]
},

"5-15": {
  id:"5-15", title:"Drug Discovery & Clinical Trial AI", domain:"Data Science & Pharma Use Cases", domain_id:5,
  level:"Advanced", mins:35, available:true,
  tags:["Drug Discovery","Target Identification","QSAR","Clinical Trial AI","Biomarker Discovery","Adaptive Trials","Patient Recruitment"],
  objectives:["Understand AI applications across the drug discovery pipeline","Explain QSAR models and structure-based drug design","Apply ML to clinical trial patient recruitment and dropout prediction","Understand adaptive trial design and its data requirements","Describe biomarker discovery workflows using genomics and imaging data"],
  toc:[
    {id:"s1",title:"AI in Target Identification & Validation",level:"h2"},
    {id:"s2",title:"ML in Compound Screening (QSAR)",level:"h2"},
    {id:"s3",title:"Clinical Trial AI: Recruitment & Retention",level:"h2"},
    {id:"s4",title:"Adaptive Trial Design",level:"h2"},
    {id:"s5",title:"Biomarker Discovery",level:"h2"},
    {id:"s6",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">AI in Target Identification & Validation</h2>
<p>Drug discovery starts with identifying a biological target — a protein, gene, or pathway whose modulation could treat a disease. AI accelerates this by mining vast biomedical data that would take decades to analyse manually.</p>
<h3>Key Data Types for Target ID</h3>
<table><thead><tr><th>Data Type</th><th>What It Reveals</th><th>AI Application</th></tr></thead><tbody>
<tr><td>Genomics / GWAS</td><td>Genetic variants associated with disease risk (SNPs)</td><td>ML to prioritise targets where human genetics supports causality (reduces development risk)</td></tr>
<tr><td>Transcriptomics (RNA-Seq)</td><td>Gene expression differences between diseased and healthy tissue</td><td>Differential expression + network analysis to find hub genes driving disease state</td></tr>
<tr><td>Proteomics</td><td>Protein abundance and modification patterns</td><td>Clustering and graph networks to identify druggable protein interactions</td></tr>
<tr><td>Literature mining (NLP)</td><td>Published findings on gene-disease associations across millions of papers</td><td>Knowledge graph construction; entity extraction linking genes, diseases, and drugs</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">Human Genetics as Drug Discovery Signal</div><p>Targets with human genetic evidence (a GWAS variant associated with the disease colocalising with a cis-eQTL for the target gene) have roughly 2× higher clinical success rates than targets without genetic support. AI tools like Open Targets and GeneBayes score every potential target on genetic evidence, saving years of wet-lab validation work.</p></div>
<h3>Knowledge Graph Approaches</h3>
<p>A knowledge graph connects entities (genes, proteins, diseases, drugs, pathways) with typed relationships (gene ENCODES protein, protein INTERACTS_WITH protein, drug INHIBITS target, target ASSOCIATED_WITH disease). Graph neural networks (GNNs) traverse these relationships to predict novel gene-disease associations or drug repurposing opportunities.</p>`},
    {id:"s2",content:`<h2 id="s2">ML in Compound Screening (QSAR)</h2>
<p>After identifying a target, the next step is finding a molecule that modulates it — ideally with high potency, good selectivity, and drug-like properties. ML dramatically reduces the experimental burden of hit-to-lead optimisation.</p>
<h3>QSAR Models (Quantitative Structure-Activity Relationship)</h3>
<p>QSAR models predict a molecule's biological activity from its chemical structure. The model learns: given this molecular fingerprint (a vector representation of the molecule's structure), predict the IC50 against the target of interest.</p>
<div class="flow-box">Molecular Structure → Featurisation (fingerprints, descriptors, graphs) → ML Model → Predicted Activity / Property</div>
<h3>Molecular Representation Methods</h3>
<table><thead><tr><th>Representation</th><th>Description</th><th>Used By</th></tr></thead><tbody>
<tr><td>Morgan Fingerprints (ECFP)</td><td>Circular bit vectors encoding local chemical environment around each atom</td><td>Classical ML (Random Forest, XGBoost)</td></tr>
<tr><td>SMILES strings</td><td>Text-based encoding of molecular structure</td><td>Transformer and RNN models (treat molecule like a sentence)</td></tr>
<tr><td>Molecular graphs</td><td>Atoms = nodes, bonds = edges</td><td>Graph Neural Networks (GNNs) — most expressive representation</td></tr>
</tbody></table>
<h3>Generative AI for De Novo Drug Design</h3>
<p>Instead of screening existing molecules, generative models (variational autoencoders, diffusion models like DiffSBDD) <em>design new molecules</em> optimised for multiple objectives simultaneously: high target binding, low toxicity, good solubility, and synthesisability. AlphaFold 3 (2024) extended this to predicting how generated molecules interact with proteins at atomic resolution.</p>`},
    {id:"s3",content:`<h2 id="s3">Clinical Trial AI: Recruitment & Retention</h2>
<p>Clinical trials fail most often not because of scientific reasons but because of operational ones: slow recruitment, protocol violations, high dropout, and site underperformance. ML addresses each of these.</p>
<h3>Patient Recruitment Prediction</h3>
<p>Predicting which sites will enrol patients quickly — and which will underperform — allows sponsors to allocate resources before problems emerge.</p>
<table><thead><tr><th>Feature</th><th>Source</th></tr></thead><tbody>
<tr><td>Site's prior trial enrolment rate</td><td>Internal trial database</td></tr>
<tr><td>Local disease prevalence</td><td>Epidemiology, ICD-10 claims in the site's catchment area</td></tr>
<tr><td>PI's publication record in indication</td><td>PubMed / NLM</td></tr>
<tr><td>Electronic health record eligibility screen rate</td><td>EHR / CTMS</td></tr>
<tr><td>Protocol complexity score</td><td>Number of eligibility criteria, visit frequency, biomarker requirements</td></tr>
</tbody></table>
<h3>Electronic Health Record (EHR) Screening</h3>
<p>Natural language processing on clinical notes and structured EHR data identifies patients who meet trial eligibility criteria before the site team manually reviews charts. This reduces screen failure rates and accelerates enrolment.</p>
<div class="flow-box">NLP on clinical notes → Extract diagnosis, labs, medications → Match against inclusion/exclusion criteria → Flag potential eligible patients for site team review</div>
<h3>Dropout Prediction</h3>
<p>A binary classification model trained on prior trial data predicts which enrolled patients are at high risk of dropping out. Features: visit compliance, adverse event burden, protocol deviation history, travel distance to site, caregiver support. High-risk patients receive proactive retention calls or protocol amendments.</p>`},
    {id:"s4",content:`<h2 id="s4">Adaptive Trial Design</h2>
<p>Adaptive trials use pre-specified interim analyses to modify the trial based on accumulating data — without compromising statistical integrity. AI and advanced statistics enable more efficient, faster, and more ethical trials.</p>
<h3>Types of Adaptations</h3>
<table><thead><tr><th>Adaptation</th><th>What Changes</th><th>When Used</th></tr></thead><tbody>
<tr><td>Sample size re-estimation</td><td>Adjust enrolment target based on observed effect size at interim</td><td>When true effect size was uncertain at design</td></tr>
<tr><td>Arm dropping</td><td>Drop placebo or inferior dose arms based on interim efficacy</td><td>Multi-arm dose-finding studies</td></tr>
<tr><td>Adaptive enrichment</td><td>Narrow eligibility to a biomarker-positive subgroup if interim shows differential response</td><td>Precision medicine trials with a biomarker hypothesis</td></tr>
<tr><td>Response-adaptive randomisation</td><td>Increase randomisation probability to the better-performing arm as data accumulates</td><td>Ethical improvement when one arm is clearly better</td></tr>
</tbody></table>
<h3>Bayesian Adaptive Trials</h3>
<p>Bayesian trials update the probability that a treatment is effective at every interim look, using prior evidence (preclinical data, earlier trials) combined with the accumulating trial data. This is more efficient than frequentist fixed-sample designs — trials can stop early for success or futility with stronger statistical confidence.</p>
<div class="callout"><div class="callout-title">Regulatory Acceptance</div><p>The FDA's 2019 guidance on adaptive designs and Bayesian clinical trials explicitly supports their use for well-controlled trials with pre-specified adaptation rules. The key requirement: all adaptation rules must be defined in the statistical analysis plan (SAP) before the trial begins — no ad-hoc changes after unblinding.</p></div>`},
    {id:"s5",content:`<h2 id="s5">Biomarker Discovery</h2>
<p>Biomarkers are biological measurements — genetic variants, protein levels, imaging features, gene expression signatures — that predict response to treatment, prognosis, or disease presence. Biomarker-selected trials (where only biomarker-positive patients receive the drug) dramatically improve success rates.</p>
<h3>Biomarker Types</h3>
<table><thead><tr><th>Type</th><th>Definition</th><th>Example</th></tr></thead><tbody>
<tr><td><strong>Predictive biomarker</strong></td><td>Predicts differential treatment effect (responders vs. non-responders)</td><td>EGFR mutation → predicts response to erlotinib in NSCLC</td></tr>
<tr><td><strong>Prognostic biomarker</strong></td><td>Predicts disease outcome regardless of treatment</td><td>High Ki-67 → poor prognosis in breast cancer regardless of therapy</td></tr>
<tr><td><strong>Pharmacodynamic biomarker</strong></td><td>Confirms target engagement — the drug is hitting its target</td><td>Reduction in ctDNA after treatment initiation</td></tr>
<tr><td><strong>Safety biomarker</strong></td><td>Predicts adverse events before they are clinically apparent</td><td>Elevated troponin → cardiotoxicity risk from chemotherapy</td></tr>
</tbody></table>
<h3>ML for Genomic Biomarker Discovery</h3>
<p>With tens of thousands of genomic features and hundreds of patients, biomarker discovery is a high-dimensional variable selection problem:</p>
<ul>
<li><strong>LASSO regression:</strong> Penalises model complexity to select a small number of predictive genomic features from thousands of candidates</li>
<li><strong>Random Forest feature importance:</strong> Non-parametric ranking of genomic features associated with response</li>
<li><strong>Survival models:</strong> Identify genomic signatures associated with time-to-progression or OS</li>
</ul>
<div class="callout info"><div class="callout-title">Overfitting Risk in Biomarker Discovery</div><p>With 20,000 genetic features and 150 patients, random chance will produce thousands of "statistically significant" associations. Biomarker discovery requires: held-out validation cohort, cross-validation, and ideally prospective validation in a separate trial. A biomarker found only in the discovery set is hypothesis-generating, not clinically actionable.</p></div>`},
    {id:"s6",content:`<h2 id="s6">Key Takeaways</h2>
<ul>
<li><strong>Human genetic evidence</strong> (GWAS + eQTL colocalisation) roughly doubles clinical success rates — AI tools score every target on genetic support automatically.</li>
<li><strong>QSAR models</strong> predict molecular activity from structure using fingerprints (for tree models) or molecular graphs (for GNNs); generative models now design new molecules from scratch.</li>
<li><strong>AlphaFold</strong> solved the protein folding problem — structure prediction that took years now takes minutes, dramatically accelerating structure-based drug design.</li>
<li><strong>Clinical trial AI</strong> reduces recruitment timelines and dropout by predicting site performance and patient eligibility from EHR data before manual chart review.</li>
<li><strong>Adaptive trial designs</strong> with pre-specified rules stop trials early for success or futility, saving cost and reducing patient exposure to ineffective therapies.</li>
<li><strong>Biomarker discovery requires external validation</strong> — a biomarker found in the discovery dataset is only hypothesis-generating until confirmed in an independent cohort.</li>
</ul>`}
  ],
  quiz:[
    {q:"Why do drug targets with human genetic support (GWAS evidence) have higher clinical success rates?",options:["They are cheaper to test","Human genetics provides causal evidence that the target is involved in the disease — reducing biology risk","They have more published literature","They are easier to formulate into drugs"],answer:1},
    {q:"A QSAR model receives a molecular fingerprint as input and outputs a predicted IC50. This is an example of:",options:["Unsupervised clustering","Supervised regression — predicting a continuous biological activity value from molecular structure","Anomaly detection","Reinforcement learning"],answer:1},
    {q:"In an adaptive enrichment trial design, what triggers the narrowing of the eligible patient population?",options:["Budget constraints","Interim data showing that a biomarker-positive subgroup responds significantly better than the overall population","Regulatory request","Site performance issues"],answer:1},
    {q:"A biomarker is described as 'predictive'. What does this mean?",options:["It predicts disease prognosis regardless of treatment","It predicts differential treatment effect — identifies patients more likely to respond to a specific treatment","It predicts adverse events","It measures whether the drug is hitting its target"],answer:1},
    {q:"Why is a random train-test split inappropriate for biomarker discovery with 20,000 features and 150 patients?",options:["It uses too much data","Random splits do not prevent overfitting in high-dimensional settings — external validation in a separate cohort is required","Genomic data cannot be randomly split","Random splits produce lower AUC"],answer:1}
  ]
},

"5-16": {
  id:"5-16", title:"Pharmacovigilance & Safety Signal Detection", domain:"Data Science & Pharma Use Cases", domain_id:5,
  level:"Advanced", mins:35, available:true,
  tags:["Pharmacovigilance","Safety Signal","FAERS","Disproportionality Analysis","NLP","Adverse Events"],
  objectives:["Understand the adverse event reporting ecosystem (FAERS, EudraVigilance, VigiBase)","Apply disproportionality analysis methods (PRR, ROR, EBGM) to detect safety signals","Use NLP to extract structured safety information from unstructured narratives","Describe the signal management workflow from detection to regulatory action"],
  toc:[
    {id:"s1",title:"Adverse Event Reporting & Data Sources",level:"h2"},
    {id:"s2",title:"Disproportionality Analysis",level:"h2"},
    {id:"s3",title:"NLP on Safety Narratives",level:"h2"},
    {id:"s4",title:"Signal Management Workflow",level:"h2"},
    {id:"s5",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Adverse Event Reporting & Data Sources</h2>
<p>Pharmacovigilance (PV) is the science of monitoring drug safety after approval. Pre-approval trials identify common adverse events, but rare events (1 in 10,000 or rarer) and long-term effects only emerge once millions of patients take the drug in real-world conditions.</p>
<h3>Adverse Event Reporting Systems</h3>
<table><thead><tr><th>Database</th><th>Region</th><th>Reporter</th><th>Data Volume</th></tr></thead><tbody>
<tr><td><strong>FAERS</strong> (FDA Adverse Event Reporting System)</td><td>US</td><td>Patients, HCPs, manufacturers (mandatory for serious events)</td><td>~20M+ reports (public quarterly extracts)</td></tr>
<tr><td><strong>EudraVigilance</strong></td><td>EU/EEA</td><td>Marketing authorisation holders, national competent authorities</td><td>~30M+ individual case safety reports (ICSRs)</td></tr>
<tr><td><strong>VigiBase</strong> (WHO)</td><td>Global</td><td>National PV centres from 130+ countries</td><td>~30M+ reports — largest global safety database</td></tr>
<tr><td><strong>Sentinel</strong></td><td>US</td><td>Claims + EHR data from ~600M patient records</td><td>Active surveillance — queries run against distributed data</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">FAERS Limitations</div><p>FAERS is a spontaneous reporting database. Reports are voluntary (except for serious events from manufacturers), duplicates exist, severity is over-reported (journalists and plaintiff lawyers drive reporting spikes after negative press), and the denominator (how many patients took the drug) is unknown. Signal detection methods account for these biases statistically, but FAERS alone cannot prove causality — it identifies signals that require further investigation.</p></div>
<h3>Case Types</h3>
<table><thead><tr><th>Case Type</th><th>Definition</th><th>Mandatory Reporting Timeframe</th></tr></thead><tbody>
<tr><td><strong>Serious unexpected (SAE)</strong></td><td>Death, life-threatening, hospitalisation, disability, congenital anomaly</td><td>15 days (expedited report)</td></tr>
<tr><td><strong>Serious expected</strong></td><td>Listed in the current label but still serious</td><td>15 days expedited (first occurrence) or periodic</td></tr>
<tr><td><strong>Non-serious</strong></td><td>All other adverse events</td><td>Included in Periodic Safety Update Reports (PSURs)</td></tr>
</tbody></table>`},
    {id:"s2",content:`<h2 id="s2">Disproportionality Analysis</h2>
<p>Disproportionality analysis asks: is the combination of Drug A and Adverse Event B reported more often than we would expect by chance, given how frequently Drug A and Event B each appear in the database independently? If yes, a signal may exist.</p>
<h3>The 2×2 Contingency Table</h3>
<p>The foundation of all disproportionality methods is a 2×2 table:</p>
<table><thead><tr><th></th><th>Drug A</th><th>All Other Drugs</th></tr></thead><tbody>
<tr><td><strong>AE of interest</strong></td><td>a</td><td>b</td></tr>
<tr><td><strong>All other AEs</strong></td><td>c</td><td>d</td></tr>
</tbody></table>
<h3>Proportional Reporting Ratio (PRR)</h3>
<div class="flow-box">PRR = [a / (a+c)] ÷ [b / (b+d)]</div>
<p>PRR &gt; 1 means the AE is proportionally more reported with Drug A than with all other drugs. UK MHRA signal criteria: PRR ≥ 2, χ² ≥ 4, and a ≥ 3 cases.</p>
<h3>Reporting Odds Ratio (ROR)</h3>
<div class="flow-box">ROR = (a × d) ÷ (b × c)</div>
<p>Analogous to the odds ratio from epidemiology. Preferred by EudraVigilance. ROR &gt; 1 with lower 95% CI &gt; 1 is a signal threshold.</p>
<h3>EBGM (Empirical Bayes Geometric Mean)</h3>
<p>Used by FDA's MGPS algorithm and VigiBase's VigiRank. EBGM is a Bayesian shrinkage estimate that stabilises PRR for drug-event combinations with few reports, reducing false positives from small cell sizes. EBGM05 (5th percentile of the posterior) ≥ 2 is the typical signal threshold.</p>
<table><thead><tr><th>Method</th><th>Used By</th><th>Advantage</th><th>Threshold</th></tr></thead><tbody>
<tr><td>PRR</td><td>MHRA, EMA</td><td>Simple, interpretable</td><td>PRR ≥ 2, χ² ≥ 4, n ≥ 3</td></tr>
<tr><td>ROR</td><td>EudraVigilance</td><td>Standard epidemiology analogue</td><td>Lower 95% CI &gt; 1</td></tr>
<tr><td>EBGM</td><td>FDA, VigiBase</td><td>Bayesian shrinkage — fewer false positives with rare events</td><td>EBGM05 ≥ 2</td></tr>
</tbody></table>`},
    {id:"s3",content:`<h2 id="s3">NLP on Safety Narratives</h2>
<p>Adverse event case narratives are free text — a patient or HCP describes what happened in their own words. Structuring this text is essential for signal detection, case coding, and regulatory submission. NLP automates what was previously done entirely by hand by trained pharmacovigilance specialists.</p>
<h3>Key NLP Tasks in PV</h3>
<table><thead><tr><th>Task</th><th>What It Does</th><th>Output</th></tr></thead><tbody>
<tr><td><strong>Named entity recognition (NER)</strong></td><td>Extracts drug names, dose, adverse event terms, dates, outcomes from unstructured text</td><td>Structured data fields for the safety database</td></tr>
<tr><td><strong>MedDRA coding</strong></td><td>Maps extracted adverse event terms to the standardised MedDRA hierarchy (PT/HLT/SOC)</td><td>Coded AE term for signal detection</td></tr>
<tr><td><strong>Causality assessment</strong></td><td>Predicts the reporter's implied drug-event relationship (probable, possible, unlikely)</td><td>Assists case processor — reduces manual review burden</td></tr>
<tr><td><strong>Duplicate detection</strong></td><td>Identifies the same case reported by multiple sources (patient + HCP + manufacturer)</td><td>De-duplicated case count — prevents inflated signal statistics</td></tr>
<tr><td><strong>Social media monitoring</strong></td><td>Scans Twitter/X, patient forums, Reddit for unsolicited adverse event mentions</td><td>Signal detection from non-traditional sources; regulatory obligation in some jurisdictions</td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">MedDRA Hierarchy</div><p>MedDRA (Medical Dictionary for Regulatory Activities) is the international standard for coding adverse events. It has 5 levels: System Organ Class (SOC) → High Level Group Term (HLGT) → High Level Term (HLT) → Preferred Term (PT) → Lowest Level Term (LLT). Signal detection is typically done at the PT level; SMQ (Standardised MedDRA Queries) are pre-defined groupings of PTs for specific conditions (e.g., hepatotoxicity SMQ).</p></div>`},
    {id:"s4",content:`<h2 id="s4">Signal Management Workflow</h2>
<p>Detecting a statistical signal is the first step. Signal management is the structured process of evaluating whether the signal represents a genuine new safety concern and deciding what action to take.</p>
<h3>Signal Lifecycle</h3>
<div class="flow-box">Signal Detection → Signal Validation → Signal Evaluation → Signal Prioritisation → Risk Assessment → Regulatory Action</div>
<table><thead><tr><th>Stage</th><th>What Happens</th><th>Key Output</th></tr></thead><tbody>
<tr><td><strong>Detection</strong></td><td>Disproportionality algorithm flags a drug-event combination above threshold</td><td>Signal candidate list</td></tr>
<tr><td><strong>Validation</strong></td><td>Medical reviewer confirms the signal is not an artefact (reporting bias, duplicate cases, concomitant drug confounding)</td><td>Valid signal or dismissed signal</td></tr>
<tr><td><strong>Evaluation</strong></td><td>Full clinical assessment: review all cases, search literature, analyse RWE, assess biological plausibility</td><td>Signal assessment report</td></tr>
<tr><td><strong>Prioritisation</strong></td><td>Score signals by seriousness, frequency, reversibility, and availability of alternative treatments</td><td>Priority rank for action</td></tr>
<tr><td><strong>Risk assessment</strong></td><td>Benefit-risk evaluation — does the new safety finding change the benefit-risk balance?</td><td>Risk minimisation measures (label update, REMS, Dear HCP letter, drug withdrawal)</td></tr>
</tbody></table>
<h3>Regulatory Reporting Obligations</h3>
<p>Sponsors must report new safety signals to health authorities promptly. Key mechanisms:</p>
<ul>
<li><strong>SUSAR</strong> (Suspected Unexpected Serious Adverse Reaction) — in clinical trials, unexpected SAEs must be reported within 7–15 days</li>
<li><strong>PSUR / PBRER</strong> (Periodic Safety Update Report / Benefit-Risk Evaluation Report) — comprehensive periodic safety reviews submitted to EMA, FDA, and other regulators</li>
<li><strong>PADER</strong> (Periodic Adverse Drug Experience Report) — US equivalent of PSUR for post-market</li>
<li><strong>Signal assessment report</strong> — submitted when a validated signal requires regulatory discussion</li>
</ul>`},
    {id:"s5",content:`<h2 id="s5">Key Takeaways</h2>
<ul>
<li><strong>FAERS, EudraVigilance, and VigiBase</strong> are the primary spontaneous reporting databases — they detect signals but cannot prove causality; the denominator (patients exposed) is unknown.</li>
<li><strong>Disproportionality analysis (PRR, ROR, EBGM)</strong> measures whether a drug-event combination is over-represented relative to the database background; it is the standard statistical method for signal detection.</li>
<li><strong>EBGM/MGPS is preferred for rare events</strong> because Bayesian shrinkage reduces false positives from small case counts that inflate PRR/ROR.</li>
<li><strong>NLP automates case processing</strong> — NER, MedDRA coding, duplicate detection, and social media monitoring — reducing the manual burden on PV specialists and enabling real-time signal surveillance.</li>
<li><strong>A statistical signal is not a safety finding</strong> — it must pass through validation, clinical evaluation, and benefit-risk assessment before regulatory action is warranted.</li>
<li><strong>Sentinel active surveillance</strong> (claims + EHR) complements spontaneous reporting by providing a known denominator and enabling formal epidemiological study designs for hypothesis testing.</li>
</ul>`}
  ],
  quiz:[
    {q:"What is the primary limitation of FAERS for safety signal detection?",options:["It only covers European drugs","Reporting is voluntary (except serious events from manufacturers), duplicates exist, and the denominator (patients exposed) is unknown — preventing direct incidence rate calculation","It only contains post-2010 reports","It uses a different coding system from MedDRA"],answer:1},
    {q:"A drug-AE combination has PRR = 3.2, χ² = 8.5, and 7 cases. Using MHRA signal criteria (PRR ≥ 2, χ² ≥ 4, n ≥ 3), is this a signal?",options:["No — PRR must be > 5","Yes — all three MHRA criteria are met","No — the number of cases is insufficient","Cannot determine without EBGM"],answer:1},
    {q:"Why is EBGM preferred over PRR for rare drug-event combinations with very few reports?",options:["EBGM is easier to calculate","Bayesian shrinkage in EBGM stabilises the estimate for small cell sizes, reducing false positives that PRR produces when a = 1 or 2","EBGM does not require a 2×2 table","Regulators mandate EBGM for all signal detection"],answer:1},
    {q:"In the signal management workflow, what happens during the 'Validation' stage?",options:["The statistical algorithm runs disproportionality analysis","A medical reviewer confirms the signal is not an artefact (reporting bias, duplicates, or confounding) before full evaluation","The label is updated","The PSUR is submitted to the regulator"],answer:1},
    {q:"Which NLP task in pharmacovigilance directly addresses the problem of the same adverse event being reported by the patient, their doctor, and the manufacturer?",options:["Named entity recognition","MedDRA coding","Duplicate detection","Causality assessment"],answer:2}
  ]
}

}); // end PL.addChapters Domain 5
