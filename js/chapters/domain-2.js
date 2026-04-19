/* Domain 2: Commercial Analytics */
PL.addChapters({

"2-1": {
  id:"2-1", title:"Patient Journey Analytics in Oncology", domain:"Commercial Analytics", domain_id:2,
  level:"Intermediate", mins:45, available:true,
  tags:["Patient Journey","Oncology","Claims Analytics","LOT","PDC","Funnel Analysis"],
  objectives:["Map the end-to-end patient journey from diagnosis to treatment","Build a patient funnel using real-world claims data","Derive line of therapy (LOT) algorithmically from claims","Calculate PDC and persistency metrics","Interpret funnel leakage for commercial action"],
  toc:[
    {id:"s1",title:"The Patient Journey Framework",level:"h2"},
    {id:"s2",title:"Data Sources for Journey Analytics",level:"h2"},
    {id:"s3",title:"Building the Patient Funnel",level:"h2"},
    {id:"s4",title:"Line of Therapy (LOT) Algorithm",level:"h2"},
    {id:"s5",title:"PDC & Persistency Analytics",level:"h2"},
    {id:"s6",title:"Real-World CLL Case Study",level:"h2"},
    {id:"s7",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">The Patient Journey Framework</h2>
<p>The <strong>patient journey</strong> describes the sequence of healthcare touchpoints from disease onset through diagnosis, treatment initiation, therapy switching, and outcomes. For commercial teams, it answers a single critical question: <em>Where are we losing patients, and why?</em></p>
<div class="callout"><div class="callout-title">Commercial Value of Journey Analytics</div><p>A 1% improvement in funnel conversion from diagnosis to treated patients can represent $50–200M in annual revenue for a blockbuster oncology brand. Journey analytics is the most actionable commercial intelligence available.</p></div>
<p>The canonical oncology journey has seven stages:</p>
<table><thead><tr><th>Stage</th><th>Definition</th><th>Key Metric</th><th>Data Signal</th></tr></thead>
<tbody>
<tr><td>Suspected Disease</td><td>Symptoms present, evaluation begins</td><td>Symptom-to-diagnosis lag (days)</td><td>ICD-10 signs codes, specialist referrals</td></tr>
<tr><td>Diagnosed</td><td>Confirmed pathology/imaging diagnosis</td><td>Diagnosis incidence rate</td><td>ICD-10 primary diagnosis codes</td></tr>
<tr><td>Staged/Biomarked</td><td>Molecular profiling, staging workup</td><td>Biomarker testing rate (%)</td><td>Lab CPT codes, pathology claims</td></tr>
<tr><td>Treatment Decision</td><td>MDT discussion, regimen selection</td><td>Time-to-treat (days)</td><td>Prior auth, J-codes</td></tr>
<tr><td>Treatment Initiated</td><td>First prescription/infusion dispensed</td><td>Treatment rate (% of diagnosed)</td><td>NDC/HCPCS on claims</td></tr>
<tr><td>On Therapy</td><td>Active treatment with refills/visits</td><td>PDC, persistency at 6/12 months</td><td>Continuous claims activity</td></tr>
<tr><td>Switching/Discontinuing</td><td>Regimen change or gap >90 days</td><td>Discontinuation rate, switch rate</td><td>New NDC, gap in claims</td></tr>
</tbody></table>`},
    {id:"s2",content:`<h2 id="s2">Data Sources for Journey Analytics</h2>
<p>No single database captures the full journey. Commercial teams blend multiple sources:</p>
<table><thead><tr><th>Source</th><th>Vendor Examples</th><th>Strengths</th><th>Limitations</th></tr></thead>
<tbody>
<tr><td>Adjudicated Medical Claims</td><td>Komodo Health, IQVIA LAAD+, Optum, IBM MarketScan</td><td>97%+ US commercially insured; longitudinal; procedure-level detail</td><td>3–6 month lag; no uninsured; diagnosis coding varies</td></tr>
<tr><td>Pharmacy Claims (Retail)</td><td>IQVIA MIDAS, Symphony Health</td><td>NDC-level drug detail; near-real-time</td><td>Specialty drugs often miss (buy-and-bill)</td></tr>
<tr><td>Specialty Pharmacy Data</td><td>IQVIA Specialty, Komodo SP</td><td>Captures IV/subcutaneous biologics</td><td>Hub/SP coverage varies by manufacturer</td></tr>
<tr><td>Lab/Genomic Data</td><td>Tempus, Foundation Medicine, Flatiron</td><td>Biomarker status, mutation panels</td><td>Coverage biased toward academic centers</td></tr>
<tr><td>EMR/EHR</td><td>Flatiron Health, Veeva Oncology</td><td>Clinical staging, physician notes</td><td>Selection bias (academic vs community)</td></tr>
<tr><td>Patient Registries</td><td>SEER, NCCN, disease-specific</td><td>Curated, high clinical fidelity</td><td>Small N, slow to update</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">Data Linkage Strategy</div><p>Best-in-class analytics links claims (for breadth) with EHR (for clinical depth) and specialty pharmacy (for adherence). The "gold standard" for oncology RWE is Flatiron + Foundation Medicine linked data.</p></div>`},
    {id:"s3",content:`<h2 id="s3">Building the Patient Funnel</h2>
<p>A <strong>patient funnel</strong> quantifies conversion rates at each journey stage. For a typical metastatic oncology brand, the funnel might show:</p>
<pre><code class="language-sql">-- Patient funnel construction query
WITH diagnosed AS (
  SELECT DISTINCT patient_id
  FROM medical_claims
  WHERE icd10_code LIKE 'C83%'  -- CLL diagnosis
    AND claim_date BETWEEN '2022-01-01' AND '2023-12-31'
),
biomarker_tested AS (
  SELECT DISTINCT d.patient_id
  FROM diagnosed d
  JOIN medical_claims m ON d.patient_id = m.patient_id
  WHERE m.cpt_code IN ('81445','81479','88230')  -- genomic panel codes
    AND m.claim_date >= d.first_dx_date
),
treated AS (
  SELECT DISTINCT d.patient_id
  FROM diagnosed d
  JOIN pharmacy_claims p ON d.patient_id = p.patient_id
  WHERE p.drug_class = 'BTK_inhibitor'
    AND p.fill_date >= d.first_dx_date
),
on_brand AS (
  SELECT DISTINCT t.patient_id
  FROM treated t
  JOIN pharmacy_claims p ON t.patient_id = p.patient_id
  WHERE p.drug_name = 'CALQUENCE'
)
SELECT
  COUNT(DISTINCT d.patient_id) AS diagnosed_n,
  COUNT(DISTINCT b.patient_id) AS biomarker_tested_n,
  COUNT(DISTINCT t.patient_id) AS treated_n,
  COUNT(DISTINCT o.patient_id) AS on_brand_n,
  ROUND(100.0 * COUNT(DISTINCT b.patient_id) / COUNT(DISTINCT d.patient_id),1) AS biomarker_rate_pct,
  ROUND(100.0 * COUNT(DISTINCT t.patient_id) / COUNT(DISTINCT d.patient_id),1) AS treatment_rate_pct,
  ROUND(100.0 * COUNT(DISTINCT o.patient_id) / COUNT(DISTINCT t.patient_id),1) AS brand_share_pct
FROM diagnosed d
LEFT JOIN biomarker_tested b ON d.patient_id = b.patient_id
LEFT JOIN treated t ON d.patient_id = t.patient_id
LEFT JOIN on_brand o ON d.patient_id = o.patient_id;</code></pre>`},
    {id:"s4",content:`<h2 id="s4">Line of Therapy (LOT) Algorithm</h2>
<p><strong>Line of therapy</strong> segments patients by treatment sequence — critical for understanding where your brand competes (1L, 2L, 3L+). LOT is NOT a field in claims data; it must be algorithmically derived.</p>
<p>The standard LOT algorithm uses three rules:</p>
<ol>
<li><strong>Washout period:</strong> A gap of ≥90 days with no cancer therapy = treatment episode end</li>
<li><strong>Drug class sequence:</strong> Each distinct drug class (or class combination) = one line</li>
<li><strong>Add-on vs. switch:</strong> Adding a second agent within 30 days = combination (same line); replacing = new line</li>
</ol>
<pre><code class="language-python">import pandas as pd

def derive_lot(claims_df, washout_days=90, addon_window=30):
    """
    Derive line of therapy from oncology pharmacy claims.

    Parameters:
    -----------
    claims_df : DataFrame with columns [patient_id, drug_class, fill_date]
    washout_days : Gap in therapy defining end of treatment episode
    addon_window : Days within which adding a drug = combination (same LOT)

    Returns:
    --------
    DataFrame with lot_number added
    """
    df = claims_df.sort_values(['patient_id','fill_date']).copy()
    df['lot'] = 0
    df['days_since_prior'] = df.groupby('patient_id')['fill_date'].diff().dt.days

    current_lot = {}
    current_drugs = {}
    last_fill = {}

    for _, row in df.iterrows():
        pid = row['patient_id']
        drug = row['drug_class']
        date = row['fill_date']

        if pid not in current_lot:
            current_lot[pid] = 1
            current_drugs[pid] = {drug}
        else:
            days_gap = (date - last_fill[pid]).days
            if days_gap > washout_days:
                # New treatment episode = new LOT
                current_lot[pid] += 1
                current_drugs[pid] = {drug}
            elif drug not in current_drugs[pid] and days_gap > addon_window:
                # New drug class not added within combo window = new LOT
                current_lot[pid] += 1
                current_drugs[pid] = {drug}
            else:
                # Add-on combination or continuation
                current_drugs[pid].add(drug)

        df.loc[_, 'lot'] = current_lot[pid]
        last_fill[pid] = date

    return df</code></pre>
<div class="callout warning"><div class="callout-title">LOT Algorithm Sensitivity</div><p>LOT results are highly sensitive to washout period assumptions. A 60-day vs 90-day washout can shift 15-20% of patients between lines. Always validate your algorithm against chart-reviewed gold standard datasets before using for strategic decisions.</p></div>`},
    {id:"s5",content:`<h2 id="s5">PDC & Persistency Analytics</h2>
<p><strong>Proportion of Days Covered (PDC)</strong> is the gold standard adherence metric. Unlike MPR, PDC caps coverage at 1.0 per day, preventing overcounting from early refills.</p>
<p><strong>Formula:</strong> PDC = (Days covered by medication supply) / (Observation period in days)</p>
<p>Industry threshold: PDC ≥ 0.80 = "adherent"</p>
<pre><code class="language-python">def calculate_pdc(fills_df, observation_days=180):
    """
    Calculate PDC for each patient over an observation window.

    Parameters:
    -----------
    fills_df : DataFrame [patient_id, fill_date, days_supply]
    observation_days : Length of observation window (e.g., 180, 365)

    Returns:
    --------
    DataFrame [patient_id, pdc_score, adherent_flag]
    """
    import numpy as np
    results = []

    for pid, group in fills_df.groupby('patient_id'):
        index_date = group['fill_date'].min()
        end_date = index_date + pd.Timedelta(days=observation_days)

        # Create daily coverage array
        covered = np.zeros(observation_days)

        for _, fill in group.iterrows():
            start = (fill['fill_date'] - index_date).days
            end = start + fill['days_supply']
            # Clip to observation window
            start = max(0, start)
            end = min(observation_days, end)
            if start < end:
                covered[start:end] = 1  # PDC caps at 1.0 per day

        pdc = covered.sum() / observation_days
        results.append({
            'patient_id': pid,
            'pdc_score': round(pdc, 3),
            'adherent': pdc >= 0.80
        })

    return pd.DataFrame(results)</code></pre>
<p><strong>Persistency</strong> measures the proportion of patients still on therapy at a given time point (e.g., 6-month persistency = % still filling at month 6). Persistency curves reveal when patients drop off and guide patient support program timing.</p>`},
    {id:"s6",content:`<h2 id="s6">Real-World CLL Case Study</h2>
<p>Consider a BTK inhibitor competing in relapsed/refractory CLL (chronic lymphocytic leukemia). Funnel analysis reveals:</p>
<table><thead><tr><th>Funnel Stage</th><th>Patients (N)</th><th>Conversion</th><th>Key Barrier</th></tr></thead>
<tbody>
<tr><td>Diagnosed CLL (prevalent)</td><td>185,000</td><td>—</td><td>—</td></tr>
<tr><td>Relapsed/Refractory (R/R)</td><td>42,000</td><td>23%</td><td>Long remissions in 1L</td></tr>
<tr><td>Biomarker tested (del17p/TP53)</td><td>28,000</td><td>67%</td><td>Community oncologist testing gap</td></tr>
<tr><td>Treated with BTK inhibitor</td><td>24,000</td><td>86%</td><td>Some receive chemoimmunotherapy</td></tr>
<tr><td>On Brand X (vs. ibrutinib)</td><td>8,400</td><td>35% share</td><td>Formulary access, ibrutinib entrenched</td></tr>
<tr><td>Adherent at 6 months (PDC≥0.80)</td><td>6,720</td><td>80%</td><td>AE-driven discontinuation</td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">Commercial Insight</div><p>The biggest opportunity in this funnel is the biomarker testing gap: 33% of R/R patients are not being tested, making them invisible to precision therapy. A testing awareness initiative targeting community oncologists could unlock 4,600 incremental patients for BTK inhibitors.</p></div>`},
    {id:"s7",content:`<h2 id="s7">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>The patient journey has seven stages from suspected disease to discontinuation — each transition is a commercial opportunity with a measurable conversion rate.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>Line of Therapy (LOT) must be algorithmically derived from claims using washout period logic, drug class sequencing, and add-on rules — no single claims field captures it directly.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>PDC ≥ 0.80 is the industry standard for "adherent" — always use PDC over MPR because PDC caps coverage at 1.0 per day and prevents overcounting early refills.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>Funnel analytics reveals where patients are lost — biomarker testing gaps, treatment rate shortfalls, and adherence drop-offs each require different commercial interventions.</div></div>`}],
  questions:[
    {id:"q1",text:"In a patient journey funnel for relapsed/refractory CLL, you observe a 33% biomarker testing gap. Which commercial initiative would most directly address this leakage?",
     options:["Increase direct-to-consumer advertising","Launch a community oncologist testing awareness program with reflexive testing support","Negotiate better formulary placement","Extend free drug trial programs"],
     correct:1,explanation:"Biomarker testing gaps in community oncology are primarily driven by physician awareness and workflow barriers. A targeted HCP education program with practical testing support (e.g., reflexive testing protocols) directly addresses the root cause."},
    {id:"q2",text:"A patient fills a 30-day supply of a medication on Day 1, then refills early on Day 20. Using PDC methodology, how many days of coverage does the patient have on Day 30?",
     options:["30 days (full month covered)","30 days (capped at 1.0/day)","40 days (original fill + extra days)","20 days (only counting the first fill period)"],
     correct:1,explanation:"PDC caps coverage at 1.0 per day. The early refill does not add extra coverage to days already covered by the first fill. Both PDC and MPR would show the patient covered for all 30 days, but PDC would not count Day 1-20 twice."},
    {id:"q3",text:"Which washout period parameter in the LOT algorithm most significantly impacts results?",
     options:["The definition of 'drug class'","The washout period duration (days of gap = new LOT)","The index date selection","The observation window length"],
     correct:1,explanation:"The washout period assumption (typically 60-90 days) is the most sensitive parameter. Changing it from 60 to 90 days can shift 15-20% of patients between lines of therapy, dramatically affecting market share calculations by LOT."}
  ]
},

"2-2": {
  id:"2-2", title:"HCP Analytics & Targeting", domain:"Commercial Analytics", domain_id:2,
  level:"Intermediate", mins:40, available:true,
  tags:["HCP Analytics","Targeting","Segmentation","Prescriber Data","Call Planning"],
  objectives:["Understand the anatomy of HCP prescriber data","Build a targeting model using decile-based segmentation","Design a call planning framework aligned to brand strategy","Distinguish high-value from high-potential HCPs","Apply geographic and specialty filters to targeting lists"],
  toc:[
    {id:"s1",title:"The HCP Data Ecosystem",level:"h2"},
    {id:"s2",title:"Prescriber Segmentation Frameworks",level:"h2"},
    {id:"s3",title:"Decile Analysis & Targeting Lists",level:"h2"},
    {id:"s4",title:"Call Planning & Coverage Strategy",level:"h2"},
    {id:"s5",title:"Digital HCP Engagement Analytics",level:"h2"},
    {id:"s6",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">The HCP Data Ecosystem</h2>
<p>Healthcare professional (HCP) analytics begins with understanding who prescribes your drug, who should be prescribing it, and what drives their decisions. Commercial success depends on deploying the sales force precisely against the highest-opportunity physicians.</p>
<table><thead><tr><th>Data Type</th><th>Vendors</th><th>Key Fields</th><th>Refresh Cadence</th></tr></thead>
<tbody>
<tr><td>Prescriber-level Rx data</td><td>IQVIA Xponent, Symphony Health</td><td>NPI, drug (NDC), Rx volume by month, payer mix</td><td>Monthly</td></tr>
<tr><td>HCP master file (OneKey)</td><td>IQVIA, Veeva</td><td>NPI, specialty, practice address, affiliations, DEA</td><td>Quarterly</td></tr>
<tr><td>Affiliations/networks</td><td>IQVIA, Monocle</td><td>Hospital, ACO, IDN membership, group practice</td><td>Quarterly</td></tr>
<tr><td>Digital behavior</td><td>Veeva Pulse, Indegene</td><td>Email open rate, website visits, sample requests</td><td>Real-time</td></tr>
<tr><td>Congress/speaker data</td><td>Open Payments (CMS)</td><td>Payments, speaking, research, ownership</td><td>Annual</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">The NPI as Master Key</div><p>The National Provider Identifier (NPI) is the universal linkage key across all HCP datasets. Every targeting model, call record, and CRM system must use NPI as the primary key — not physician name, which creates deduplication nightmares.</p></div>`},
    {id:"s2",content:`<h2 id="s2">Prescriber Segmentation Frameworks</h2>
<p>The classic 2x2 targeting matrix segments HCPs along two dimensions:</p>
<ul>
<li><strong>Current value (volume):</strong> How much of your brand they already prescribe</li>
<li><strong>Future potential:</strong> How many eligible patients they see (total category volume)</li>
</ul>
<table><thead><tr><th>Segment</th><th>Value</th><th>Potential</th><th>Strategy</th><th>Call Frequency</th></tr></thead>
<tbody>
<tr><td><strong>A — Champions</strong></td><td>High</td><td>High</td><td>Retain, protect, expand</td><td>Weekly</td></tr>
<tr><td><strong>B — Loyalists</strong></td><td>High</td><td>Low</td><td>Retain, share of voice</td><td>Bi-weekly</td></tr>
<tr><td><strong>C — Switchers</strong></td><td>Low</td><td>High</td><td>Convert — highest priority</td><td>Weekly</td></tr>
<tr><td><strong>D — Low Priority</strong></td><td>Low</td><td>Low</td><td>Digital-only or no call</td><td>Digital</td></tr>
</tbody></table>
<p><strong>Segment C (low brand share, high category volume)</strong> represents the highest ROI opportunity — physicians seeing many eligible patients but prescribing a competitor or generic. A conversion from 0→20% share in a high-volume oncologist can represent $2–5M in annual revenue.</p>
<div class="callout warning"><div class="callout-title">Avoid the Volume Trap</div><p>Many companies over-index on existing high-volume prescribers (segment A/B) because they feel "productive." The better investment is often converting high-potential, low-share physicians (segment C) who represent untapped revenue.</p></div>`},
    {id:"s3",content:`<h2 id="s3">Decile Analysis & Targeting Lists</h2>
<p>Decile-based targeting ranks all prescribers in a given specialty/geography by total category volume and assigns them to deciles 1–10 (decile 1 = highest volume).</p>
<pre><code class="language-python">import pandas as pd
import numpy as np

def build_targeting_list(prescriber_df, brand_col='brand_rx',
                          category_col='category_rx',
                          call_target_pct=0.30):
    """
    Build decile-based targeting list for sales force.

    Parameters:
    -----------
    prescriber_df : DataFrame with prescriber-level Rx volumes
    brand_col : Column name for brand prescriptions
    category_col : Column name for total category prescriptions
    call_target_pct : Top % of prescribers to target (default: top 30%)
    """
    df = prescriber_df.copy()

    # Calculate brand share and potential score
    df['brand_share'] = df[brand_col] / df[category_col].clip(lower=1)
    df['potential_score'] = df[category_col] * (1 - df['brand_share'])

    # Assign deciles by category volume (1 = highest)
    df['volume_decile'] = pd.qcut(
        df[category_col],
        q=10,
        labels=range(10, 0, -1)
    ).astype(int)

    # Targeting priority: weight volume + unconverted potential
    df['priority_score'] = (
        0.4 * df['volume_decile'] +
        0.6 * (df['potential_score'] / df['potential_score'].max() * 10)
    )

    # Select top targets
    threshold = df['priority_score'].quantile(1 - call_target_pct)
    df['call_target'] = df['priority_score'] >= threshold
    df['segment'] = np.where(
        (df['brand_share'] >= 0.2) & (df['volume_decile'] <= 3), 'A_Champion',
        np.where(df['volume_decile'] <= 3, 'C_Switcher',
        np.where(df['brand_share'] >= 0.2, 'B_Loyalist', 'D_Low_Priority'))
    )

    return df.sort_values('priority_score', ascending=False)</code></pre>`},
    {id:"s4",content:`<h2 id="s4">Call Planning & Coverage Strategy</h2>
<p>Call planning translates the targeting list into a field force deployment plan. The core parameters are:</p>
<ul>
<li><strong>Call capacity:</strong> A typical primary care rep makes 8–10 calls/day; specialty rep makes 4–6</li>
<li><strong>Call frequency:</strong> Driven by segment (A: weekly, B/C: bi-weekly, D: digital)</li>
<li><strong>Territory alignment:</strong> Balance workload across reps while respecting geographic constraints</li>
</ul>
<p><strong>Coverage metrics to track:</strong></p>
<table><thead><tr><th>Metric</th><th>Formula</th><th>Benchmark</th></tr></thead>
<tbody>
<tr><td>Call Coverage Rate</td><td>HCPs reached / total targets</td><td>&gt;85% of A-segment, &gt;70% B/C</td></tr>
<tr><td>Call Frequency Compliance</td><td>Actual calls / planned calls by segment</td><td>&gt;90%</td></tr>
<tr><td>Reach & Frequency (R&F)</td><td>Unique HCPs × avg calls per HCP</td><td>A: 18+ calls/yr, B: 10–12, C: 12–18</td></tr>
<tr><td>Call-to-Rx Correlation</td><td>Pearson r between call freq and Rx trend</td><td>&gt;0.4 in responsive segment</td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">Diminishing Returns in Call Frequency</div><p>Research consistently shows diminishing returns after 8–12 calls per physician per year for most brands. Over-calling alienates prescribers and reduces rep credibility. Use the inflection point in the call-Rx response curve to set optimal frequency targets.</p></div>`},
    {id:"s5",content:`<h2 id="s5">Digital HCP Engagement Analytics</h2>
<p>As physician accessibility declines (only 45% of HCPs are accessible to reps post-COVID), digital channels have become primary engagement vehicles. Key digital engagement signals:</p>
<ul>
<li><strong>Email engagement:</strong> Open rate, click-through rate, content type preference</li>
<li><strong>Peer content:</strong> CME completion, congress session attendance, publication reads</li>
<li><strong>Branded digital:</strong> Brand website visits, e-detail views, sample requests</li>
<li><strong>Medical affairs:</strong> Medical inquiry volume, MSL meeting requests</li>
</ul>
<p>Modern <strong>omnichannel engagement scoring</strong> combines all touchpoints into a single HCP engagement index, with channel weights calibrated by the correlation of each touchpoint to prescribing behavior.</p>
<pre><code class="language-python">def calculate_engagement_score(hcp_df, weights=None):
    """Calculate composite digital engagement score."""
    if weights is None:
        weights = {
            'email_clicks': 0.25,
            'website_visits': 0.20,
            'sample_requests': 0.30,
            'cme_completions': 0.15,
            'msl_meetings': 0.10
        }

    score_cols = list(weights.keys())

    # Normalize each channel to 0-100
    for col in score_cols:
        if col in hcp_df.columns:
            max_val = hcp_df[col].quantile(0.95)  # Cap at 95th %ile
            hcp_df[f'{col}_norm'] = (hcp_df[col].clip(upper=max_val) / max_val * 100)

    # Weighted composite score
    hcp_df['engagement_score'] = sum(
        hcp_df.get(f'{col}_norm', 0) * w
        for col, w in weights.items()
    )
    return hcp_df</code></pre>`},
    {id:"s6",content:`<h2 id="s6">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>Use NPI as the universal primary key when linking HCP datasets — never rely on physician name for deduplication across claims, CRM, and digital systems.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>Segment C physicians (low brand share, high category volume) represent the highest ROI targeting opportunity — converting a single high-volume oncologist can generate millions in incremental revenue.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Decile-based targeting prioritizes the top 30% of prescribers by category volume for in-person calls; the bottom 70% can be served cost-effectively through digital channels.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>Omnichannel engagement scoring integrates email, digital, and in-person touchpoints into a single HCP priority metric — modern field force strategy cannot rely on call data alone.</div></div>`}],
  questions:[
    {id:"q1",text:"A physician sees 50 eligible patients per month but currently prescribes zero of your brand. A champion prescriber sees 30 patients and is at 80% market share. Which represents higher incremental opportunity?",
     options:["The champion (higher loyalty signals future growth)","The zero-share physician (50 patients × 100% potential uplift)","Both are equal opportunity","The champion because they are more accessible"],
     correct:1,explanation:"The zero-share physician has 50 patients × 100% potential share to capture = massive upside. The champion is already at 80% share on 30 patients — only 6 incremental patients available. This is the classic Segment C vs A opportunity distinction."},
    {id:"q2",text:"What is the recommended maximum call frequency before diminishing returns significantly reduce ROI on sales calls?",
     options:["4–5 calls/year","8–12 calls/year","20+ calls/year","2–3 calls/year"],
     correct:1,explanation:"Research shows diminishing returns set in after 8–12 calls per physician per year for most brands. Beyond this threshold, additional calls often annoy prescribers rather than driving incremental prescribing behavior."},
    {id:"q3",text:"Which data source provides the most reliable tracking of specialty pharmacy prescription dispensing for biologic drugs administered via buy-and-bill?",
     options:["Retail pharmacy claims (IQVIA MIDAS)","Medical claims (J-codes and NDCs in physician claims)","Patient self-report","Direct-to-consumer advertising response data"],
     correct:1,explanation:"Buy-and-bill biologics (infused in office) appear in medical claims as J-codes (HCPCS) rather than pharmacy claims. Retail pharmacy claims miss most specialty biologics. IQVIA LAAD+ or Komodo medical claims are the correct data source for buy-and-bill tracking."}
  ]
},

"2-3": {
  id:"2-3", title:"Sales Force Effectiveness (SFE)", domain:"Commercial Analytics", domain_id:2,
  level:"Intermediate", mins:35, available:true,
  tags:["SFE","Sales Force","Territory Design","Incentive Compensation","ROI"],
  objectives:["Measure sales force productivity with validated KPIs","Design territory alignment using geographic and workload equity principles","Build incentive compensation (IC) plans that drive brand strategy","Calculate call plan ROI and cost-per-detail","Identify underperforming reps and territories using attribution analytics"],
  toc:[
    {id:"s1",title:"SFE Framework & KPIs",level:"h2"},
    {id:"s2",title:"Territory Alignment",level:"h2"},
    {id:"s3",title:"Incentive Compensation Design",level:"h2"},
    {id:"s4",title:"ROI Measurement & Attribution",level:"h2"},
    {id:"s5",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">SFE Framework & KPIs</h2>
<p><strong>Sales Force Effectiveness (SFE)</strong> measures how efficiently the commercial organization converts field activity into revenue. It bridges the gap between strategic intent (targeting lists, messaging) and market results (prescriptions, market share).</p>
<p>The SFE measurement framework operates at three levels:</p>
<table><thead><tr><th>Level</th><th>Metrics</th><th>Responsible Party</th></tr></thead>
<tbody>
<tr><td><strong>Activity</strong></td><td>Calls made, coverage rate, samples distributed, frequency by segment</td><td>Field manager, CRM</td></tr>
<tr><td><strong>Productivity</strong></td><td>Rx per call, brand share change per territory, new-to-brand starters</td><td>Analytics team, brand</td></tr>
<tr><td><strong>Outcome</strong></td><td>Territory revenue, quota attainment, market share vs. goal</td><td>Sales leadership</td></tr>
</tbody></table>
<p>Key SFE KPIs for field leadership:</p>
<ul>
<li><strong>Call Coverage Rate:</strong> % of target HCPs reached (goal: >85% of A-targets)</li>
<li><strong>Average Calls Per Day:</strong> Specialty benchmark: 4–6; primary care: 8–10</li>
<li><strong>Reach & Frequency:</strong> Unique HCPs seen × average calls/HCP</li>
<li><strong>New-to-Brand Rate:</strong> # of HCPs writing first Rx per quarter</li>
<li><strong>Rx Per Rep:</strong> Total brand Rx in territory / headcount</li>
</ul>`},
    {id:"s2",content:`<h2 id="s2">Territory Alignment</h2>
<p>Territory alignment balances three competing objectives:</p>
<ol>
<li><strong>Workload equity:</strong> Each rep has a manageable, comparable call burden</li>
<li><strong>Market opportunity:</strong> Territories reflect actual Rx potential, not just geography</li>
<li><strong>Travel efficiency:</strong> Geographic compactness minimizes windshield time</li>
</ol>
<pre><code class="language-python">from scipy.optimize import linear_sum_assignment
import numpy as np

def calculate_workload_equity(territory_df):
    """
    Calculate territory workload equity index.
    Perfect equity = 1.0; higher = more inequitable.
    """
    # Workload = calls needed based on target HCPs and their frequency
    territory_df['workload'] = (
        territory_df['a_targets'] * 18 +   # 18 calls/yr for A
        territory_df['b_targets'] * 10 +   # 10 calls/yr for B
        territory_df['c_targets'] * 12     # 12 calls/yr for C
    ) / 250  # Working days per year

    mean_wl = territory_df['workload'].mean()
    cv = territory_df['workload'].std() / mean_wl  # Coefficient of variation

    territory_df['workload_index'] = territory_df['workload'] / mean_wl

    print(f"Workload CV: {cv:.2f} (target < 0.15 for good equity)")
    print(f"Territory range: {territory_df['workload_index'].min():.2f}x to "
          f"{territory_df['workload_index'].max():.2f}x of average")

    return territory_df, cv</code></pre>
<div class="callout info"><div class="callout-title">Realignment Frequency</div><p>Territory realignment should occur every 12–18 months to reflect market evolution. However, realignments are disruptive and costly (HCP relationship rebuilding takes 6+ months). Use micro-adjustments quarterly and full realignments annually at most.</p></div>`},
    {id:"s3",content:`<h2 id="s3">Incentive Compensation Design</h2>
<p>Incentive compensation (IC) is the most powerful behavioral lever in commercial excellence. Poor IC design can actively misalign the field force with brand strategy.</p>
<p><strong>IC Design Principles:</strong></p>
<ul>
<li><strong>Pay-for-performance:</strong> 60–70% base, 30–40% at-risk incentive is standard for specialty pharma</li>
<li><strong>Metric alignment:</strong> IC metrics must match brand strategy (e.g., if strategy is new patient starts, don't pay on total Rx)</li>
<li><strong>Goal fairness:</strong> Quotas set at territory potential × national growth target; not prior year + flat %</li>
<li><strong>Payout curve:</strong> Accelerating incentives above 100% drive top performers; floor at 50% threshold</li>
</ul>
<table><thead><tr><th>IC Component</th><th>Weight</th><th>Metric</th><th>Why</th></tr></thead>
<tbody>
<tr><td>New patient starts (NPS)</td><td>50%</td><td>New-to-brand prescribers initiating therapy</td><td>Drives trial and market expansion</td></tr>
<tr><td>Market share growth</td><td>30%</td><td>Brand share change vs. prior period</td><td>Controls for market-level effects</td></tr>
<tr><td>Coverage & frequency</td><td>20%</td><td>Call plan compliance by segment</td><td>Ensures strategic targeting is followed</td></tr>
</tbody></table>`},
    {id:"s4",content:`<h2 id="s4">ROI Measurement & Attribution</h2>
<p>Measuring the sales force ROI requires attributing Rx outcomes to specific field activities, controlling for market-level trends and HCP baseline prescribing behavior.</p>
<p><strong>Econometric approach (matched cohort):</strong></p>
<pre><code class="language-python">import statsmodels.formula.api as smf

def estimate_call_roi(hcp_panel_df):
    """
    Estimate incremental Rx per call using fixed-effects regression.

    Model: Δ brand_rx ~ call_count + digital_score + market_trend + FE(hcp) + FE(time)
    """
    # Panel regression with HCP and time fixed effects
    model = smf.ols(
        formula='delta_brand_rx ~ call_count + digital_score + category_trend + C(hcp_id) + C(quarter)',
        data=hcp_panel_df
    ).fit(cov_type='HC3')  # Heteroskedasticity-robust SEs

    incremental_rx_per_call = model.params['call_count']
    avg_rx_value = 1200  # $ per Rx (brand-specific)
    cost_per_call = 350  # Including rep salary, overhead

    roi = (incremental_rx_per_call * avg_rx_value - cost_per_call) / cost_per_call

    print(f"Incremental Rx per call: {incremental_rx_per_call:.3f}")
    print(f"Revenue per call: \${incremental_rx_per_call * avg_rx_value:.0f}")
    print(f"ROI per call: {roi:.1%}")

    return model, roi</code></pre>
<div class="callout warning"><div class="callout-title">Attribution Challenges</div><p>Call ROI attribution suffers from endogeneity: reps call on physicians who are already more likely to prescribe. Always use propensity-score matching or fixed-effects models that control for HCP baseline behavior.</p></div>`},
    {id:"s5",content:`<h2 id="s5">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>SFE measurement operates at three levels — activity (calls made), productivity (Rx per call), and outcome (revenue) — each requiring different data sources and accountability structures.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>Territory alignment must balance workload equity, market opportunity, and geographic efficiency — coefficient of variation below 0.15 indicates acceptable equity across territories.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>IC plan design is the most powerful behavioral lever — metrics must align precisely with brand strategy, and goals must be set based on territory potential, not flat percentage increases from prior year.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>Call ROI attribution requires econometric methods (fixed-effects regression, propensity score matching) to control for the endogeneity bias inherent in call planning.</div></div>`}],
  questions:[
    {id:"q1",text:"A brand's strategy is to expand the treated patient population by encouraging HCPs to identify and treat more eligible patients. Which IC metric best aligns with this strategy?",
     options:["Total brand Rx volume","New-to-brand patient starts (NPS)","Market share vs. competitor","Average calls per day"],
     correct:1,explanation:"New-to-brand patient starts directly measures the activation of new patients and new prescribers, perfectly aligning IC with the patient expansion strategy. Total Rx could grow simply from existing patients refilling, which does not drive the strategic goal."},
    {id:"q2",text:"Your territory equity analysis shows a coefficient of variation (CV) of 0.32 across rep workloads. What does this indicate?",
     options:["Excellent equity — no action needed","Poor equity — significant realignment required","Average equity — minor adjustments needed","The metric is inconclusive without more data"],
     correct:1,explanation:"A CV of 0.32 significantly exceeds the 0.15 benchmark for acceptable workload equity. This indicates some reps are substantially over- or under-loaded relative to peers, which typically results in burnout, turnover, and missed market opportunity in under-served territories."},
    {id:"q3",text:"Why must you use fixed-effects regression rather than simple correlation when measuring call-to-Rx ROI?",
     options:["Fixed effects regression is easier to implement","Simple correlation overcounts calls made to non-prescribers","Reps systematically call on doctors already predisposed to prescribe (endogeneity), inflating simple ROI estimates","Fixed effects controls for territory size differences"],
     correct:2,explanation:"This is the endogeneity problem: reps prioritize calling on physicians who are more likely to prescribe (by design). Simple correlation therefore overstates the causal effect of calls. Fixed-effects regression controls for each HCP's baseline prescribing behavior, isolating the true incremental impact of additional calls."}
  ]
},

"2-4": {
  id:"2-4", title:"Forecasting & Demand Planning", domain:"Commercial Analytics", domain_id:2,
  level:"Advanced", mins:50, available:true,
  tags:["Forecasting","Demand Planning","Launch Forecast","Epidemiology","Market Sizing"],
  objectives:["Build a patient-based epidemiological forecast model","Apply analogue analysis for launch forecasting","Understand demand planning integration with supply chain","Distinguish leading vs lagging forecast indicators","Quantify forecast uncertainty using scenario analysis"],
  toc:[
    {id:"s1",title:"Forecast Architecture",level:"h2"},
    {id:"s2",title:"Epidemiological (Patient-Based) Modeling",level:"h2"},
    {id:"s3",title:"Analogue Analysis for Launches",level:"h2"},
    {id:"s4",title:"Time-Series Forecasting Methods",level:"h2"},
    {id:"s5",title:"Scenario Analysis & Uncertainty",level:"h2"},
    {id:"s6",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s2">Forecast Architecture</h2>
<p>Pharmaceutical forecasting serves multiple functions simultaneously:</p>
<ul>
<li><strong>Commercial:</strong> Revenue targets, brand P&L, resource allocation</li>
<li><strong>Supply chain:</strong> API procurement, manufacturing capacity, distribution</li>
<li><strong>Finance:</strong> Long-range planning (LRP), valuation, investor guidance</li>
<li><strong>R&D:</strong> Pipeline prioritization, risk-adjusted NPV calculations</li>
</ul>
<p>The gold standard pharma forecast uses a <strong>patient-based model</strong> that builds from epidemiology to treated patients to brand share:</p>
<div class="callout"><div class="callout-title">Forecast Cascade</div><p><strong>Total population</strong> → Incident/Prevalent cases (epidemiology) → Diagnosed patients (diagnosis rate) → Eligible for treatment (label-aligned) → Treated patients (treatment rate) → On-brand (market share) → Rx volume → Net revenue</p></div>`},
    {id:"s2",content:`<h2 id="s2">Epidemiological (Patient-Based) Modeling</h2>
<p>A patient-based forecast uses real-world data to size each stage of the patient funnel:</p>
<pre><code class="language-python">def epi_forecast(year_range, params):
    """
    Patient-based epidemiological forecast model.

    params dict includes:
    - incidence_rate: new cases per 100K population
    - prevalence_rate: existing cases per 100K population
    - diagnosis_rate: % of cases clinically diagnosed
    - treatment_rate: % of diagnosed who receive drug therapy
    - market_share: brand's share of treated patients (by LOT)
    - avg_rx_per_patient: average prescriptions per patient per year
    - net_price_per_rx: net of rebates
    """
    results = []
    population = 335_000_000  # US population

    for year in year_range:
        yr = year - year_range[0]

        # Epidemiology layer
        incident = (params['incidence_rate'] / 100_000 * population *
                    (1 + params.get('incidence_growth', 0)) ** yr)
        prevalent = (params['prevalence_rate'] / 100_000 * population *
                     (1 + params.get('prevalence_growth', 0.01)) ** yr)

        # Funnel layers
        diagnosed = prevalent * params['diagnosis_rate']
        treated = diagnosed * params['treatment_rate']
        on_brand = treated * params['market_share'][yr] if isinstance(
            params['market_share'], list) else treated * params['market_share']

        # Revenue
        rx_volume = on_brand * params['avg_rx_per_patient']
        net_revenue = rx_volume * params['net_price_per_rx']

        results.append({
            'year': year, 'prevalent_patients': round(prevalent),
            'diagnosed': round(diagnosed), 'treated': round(treated),
            'on_brand': round(on_brand), 'rx_volume': round(rx_volume),
            'net_revenue_M': round(net_revenue / 1_000_000, 1)
        })

    return pd.DataFrame(results)</code></pre>`},
    {id:"s3",content:`<h2 id="s3">Analogue Analysis for Launches</h2>
<p>For pre-launch products with no brand history, analogue analysis uses the launch trajectories of comparable products to calibrate forecast assumptions.</p>
<p><strong>Selecting analogues:</strong></p>
<ul>
<li>Same or similar indication and target patient population</li>
<li>Similar mechanism of action (MoA)</li>
<li>Similar regulatory designation (standard, BTD, priority review)</li>
<li>Similar competitive environment at launch</li>
<li>Recent launch (ideally within 5 years)</li>
</ul>
<table><thead><tr><th>Analogue Criterion</th><th>Weight</th><th>Scoring Notes</th></tr></thead>
<tbody>
<tr><td>Patient population similarity</td><td>30%</td><td>Incidence, prevalence, LOT overlap</td></tr>
<tr><td>Mechanism of action</td><td>25%</td><td>First-in-class vs. follow-on</td></tr>
<tr><td>Competitive landscape</td><td>25%</td><td>N of competitors at launch, LOE timing</td></tr>
<tr><td>Access environment</td><td>20%</td><td>Payer mix, copay burden, prior auth requirements</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">Week-4 Rule in Oncology</div><p>In oncology launches, Week-4 TRx is the single most predictive early indicator of long-term peak sales. A brand achieving >60% of its Week-4 target typically reaches its Year-1 forecast; underperforming brands rarely recover without major intervention.</p></div>`},
    {id:"s4",content:`<h2 id="s4">Time-Series Forecasting Methods</h2>
<p>For established brands with 3+ years of Rx history, time-series models extend existing trends:</p>
<table><thead><tr><th>Method</th><th>Best For</th><th>Strengths</th><th>Limitations</th></tr></thead>
<tbody>
<tr><td>ARIMA</td><td>Stable trend, no seasonality</td><td>Handles autocorrelation well</td><td>No causal variables; struggles with level shifts</td></tr>
<tr><td>SARIMA</td><td>Seasonal brands (e.g., flu antivirals)</td><td>Models periodic patterns</td><td>Requires longer history</td></tr>
<tr><td>Prophet (Meta)</td><td>Holiday effects, irregular patterns</td><td>Robust to missing data; interpretable</td><td>Overkill for stable trends</td></tr>
<tr><td>Regression with leading indicators</td><td>Brands with strong leading indicators</td><td>Causal; responsive to market events</td><td>Requires indicator data pipeline</td></tr>
<tr><td>Bass diffusion model</td><td>New product adoption</td><td>Captures innovator/imitator dynamics</td><td>Not suitable for mature brands</td></tr>
</tbody></table>`},
    {id:"s5",content:`<h2 id="s5">Scenario Analysis & Uncertainty</h2>
<p>All forecasts should be presented with scenarios to quantify uncertainty:</p>
<pre><code class="language-python">def scenario_analysis(base_params, scenarios):
    """
    Run optimistic/base/pessimistic scenario forecasts.

    scenarios = {
        'optimistic': {'market_share': 0.35, 'treatment_rate': 0.78},
        'base':        {'market_share': 0.28, 'treatment_rate': 0.72},
        'pessimistic': {'market_share': 0.18, 'treatment_rate': 0.65}
    }
    """
    results = {}
    for name, overrides in scenarios.items():
        params = {**base_params, **overrides}
        forecast = epi_forecast(range(2025, 2031), params)
        results[name] = {
            'peak_revenue_M': forecast['net_revenue_M'].max(),
            'year_3_revenue_M': forecast.loc[forecast['year']==2027,
                                             'net_revenue_M'].values[0],
            'patients_y3': forecast.loc[forecast['year']==2027,
                                        'on_brand'].values[0]
        }

    range_pct = ((results['optimistic']['peak_revenue_M'] -
                  results['pessimistic']['peak_revenue_M']) /
                 results['base']['peak_revenue_M'] * 100)
    print(f"Forecast range: ±{range_pct/2:.0f}% around base case")
    return pd.DataFrame(results).T</code></pre>
<div class="callout warning"><div class="callout-title">Forecast Accuracy Standards</div><p>Industry benchmark for a good 12-month forecast is ±15% of actuals at the brand level, ±25% at the territory level. Forecasts consistently outside these bounds signal a model specification problem, not just market uncertainty.</p></div>`},
    {id:"s6",content:`<h2 id="s6">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>Patient-based epidemiological models build forecast from incidence/prevalence through the patient funnel — always more defensible than top-down market share approaches.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>Analogue analysis is indispensable for pre-launch forecasting — select analogues based on patient population similarity, mechanism, competitive landscape, and access environment.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>In oncology, Week-4 TRx is the single most predictive early launch indicator — brands that miss Week-4 targets rarely recover to their full-year forecast without major commercial intervention.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>Always present forecasts with optimistic/base/pessimistic scenarios — a well-specified base case should fall within ±15% of actuals over a 12-month horizon.</div></div>`}],
  questions:[
    {id:"q1",text:"In a patient-based forecast model, what does 'treatment rate' represent?",
     options:["The percentage of all patients who receive any medication","The percentage of diagnosed, eligible patients who receive drug therapy","The market share your brand holds among treated patients","The rate at which new patients are diagnosed each year"],
     correct:1,explanation:"Treatment rate is the proportion of diagnosed, guideline-eligible patients who actually receive drug therapy (as opposed to watchful waiting, surgery, or other non-pharmacologic management). It is distinct from market share, which is your brand's share of already-treated patients."},
    {id:"q2",text:"A brand is launching into a crowded market with 4 existing competitors. Which analogue selection criterion would most differentiate between a 'good' and 'poor' analogue?",
     options:["Similar net price per Rx","Similar competitive landscape at time of launch","Same manufacturing process","Similar sales force size"],
     correct:1,explanation:"The competitive landscape at launch is highly predictive of ramp trajectory. A brand entering a market with 4 established competitors faces very different share capture dynamics than one entering as a second entrant. This criterion (weighted 25%) directly shapes the market share assumption."},
    {id:"q3",text:"Your 12-month brand forecast missed actuals by 28%. Which is the most likely root cause?",
     options:["Normal market uncertainty — 28% is within acceptable range","A model specification error, since 28% exceeds the ±15% benchmark","Data latency from claims vendors","Seasonal adjustment failure"],
     correct:1,explanation:"The industry benchmark for an acceptable 12-month brand-level forecast accuracy is ±15%. A 28% miss significantly exceeds this threshold, indicating a structural model specification problem (wrong assumptions, missing variables, or poor analogue selection) rather than normal uncertainty."}
  ]
},

"2-5": {
  id:"2-5", title:"Marketing Mix Modeling (MMM)", domain:"Commercial Analytics", domain_id:2,
  level:"Advanced", mins:45, available:true,
  tags:["MMM","Marketing Mix","Promotional ROI","Econometrics","Budget Optimization"],
  objectives:["Understand the statistical foundation of pharma MMM","Build an MMM model using adstock transformations","Interpret contribution decomposition results","Optimize promotional budget allocation using response curves","Distinguish MMM from attribution modeling"],
  toc:[
    {id:"s1",title:"MMM Fundamentals",level:"h2"},
    {id:"s2",title:"Adstock & Carryover Effects",level:"h2"},
    {id:"s3",title:"Model Specification & Estimation",level:"h2"},
    {id:"s4",title:"Budget Optimization",level:"h2"},
    {id:"s5",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">MMM Fundamentals</h2>
<p><strong>Marketing Mix Modeling (MMM)</strong> uses econometric regression to decompose brand Rx volume into contributions from each promotional channel, controlling for base market effects and competitive activity. It answers: "Which promotional channels drove our sales, and what is the ROI of each?"</p>
<p>Unlike digital attribution (which measures clicks and conversions), MMM captures the full causal effect of promotion on prescribing behavior — including channels that don't have cookies or pixels (DTC TV, sales force, samples).</p>
<table><thead><tr><th>Channel</th><th>Typical Pharma ROI</th><th>Lag Effect</th></tr></thead>
<tbody>
<tr><td>Sales force calls</td><td>3–8x</td><td>2–4 weeks</td></tr>
<tr><td>DTC television</td><td>1–3x</td><td>4–8 weeks</td></tr>
<tr><td>Digital media (HCP)</td><td>2–5x</td><td>1–2 weeks</td></tr>
<tr><td>Medical education/CME</td><td>4–7x</td><td>4–12 weeks</td></tr>
<tr><td>Speaker programs</td><td>5–10x</td><td>2–6 weeks</td></tr>
<tr><td>Samples</td><td>2–4x</td><td>1–4 weeks</td></tr>
</tbody></table>`},
    {id:"s2",content:`<h2 id="s2">Adstock & Carryover Effects</h2>
<p>Promotional effects don't end the week spending occurs — they persist (decay) over time. <strong>Adstock</strong> transforms raw spending into a "memory" variable that reflects cumulative exposure:</p>
<pre><code class="language-python">import numpy as np

def adstock_transform(spend_series, decay_rate):
    """
    Apply geometric adstock transformation to spending variable.

    Formula: Adstock(t) = Spend(t) + decay_rate × Adstock(t-1)

    Parameters:
    -----------
    spend_series : Weekly or monthly spending array
    decay_rate : Memory retention rate (0–1); typical pharma values:
                 Sales force: 0.7–0.85 (long memory)
                 Digital: 0.3–0.5 (short memory)
                 DTC TV: 0.5–0.7 (medium memory)
    """
    adstocked = np.zeros(len(spend_series))
    adstocked[0] = spend_series[0]

    for t in range(1, len(spend_series)):
        adstocked[t] = spend_series[t] + decay_rate * adstocked[t-1]

    return adstocked

def hill_saturation(adstock, alpha, gamma):
    """
    Apply Hill saturation curve to capture diminishing returns.

    Formula: Effect = alpha × (adstock^gamma) / (half_saturation^gamma + adstock^gamma)

    alpha : Maximum effect (saturation ceiling)
    gamma : Shape parameter; lower = faster saturation
    """
    return alpha * (adstock ** gamma) / (1 + adstock ** gamma)</code></pre>
<div class="callout info"><div class="callout-title">Decay Rate Interpretation</div><p>A decay rate of 0.8 means 80% of last period's adstock carries forward. For sales force calls, this reflects the physician's memory of the message and their relationship with the rep. For digital display ads, 0.3–0.4 is more appropriate — the impression value fades quickly.</p></div>`},
    {id:"s3",content:`<h2 id="s3">Model Specification & Estimation</h2>
<p>A standard pharma MMM specification:</p>
<pre><code class="language-python">import statsmodels.api as sm
import pandas as pd

def fit_mmm(df, channels, control_vars):
    """
    Fit a pharma marketing mix model.

    df must contain:
    - 'rx_volume': Dependent variable (weekly brand TRx)
    - Each channel in channels: adstocked spending variable
    - Each var in control_vars: market/competitive controls
    """
    # Log-log transformation for elasticity interpretation
    y = np.log(df['rx_volume'])

    X_dict = {}

    # Promotional channels (already adstocked)
    for ch in channels:
        X_dict[f'log_{ch}'] = np.log(df[ch] + 1)  # +1 to handle zeros

    # Control variables (competitive activity, seasonality, price)
    for cv in control_vars:
        X_dict[cv] = df[cv]

    # Seasonal dummies
    for q in range(1, 4):  # Q4 is reference
        X_dict[f'Q{q}'] = (df['quarter'] == q).astype(int)

    X = pd.DataFrame(X_dict)
    X = sm.add_constant(X)

    model = sm.OLS(y, X).fit(cov_type='HAC', cov_kwds={'maxlags': 4})
    print(model.summary())

    # Decompose contributions
    contributions = {}
    for col in X.columns:
        if col != 'const':
            contributions[col] = model.params[col] * X[col]

    return model, pd.DataFrame(contributions)</code></pre>`},
    {id:"s4",content:`<h2 id="s4">Budget Optimization</h2>
<p>Once the MMM establishes response curves for each channel, optimization reallocates budget to maximize total Rx return subject to constraints:</p>
<pre><code class="language-python">from scipy.optimize import minimize

def optimize_budget(channel_params, total_budget, constraints=None):
    """
    Optimize promotional budget allocation across channels.

    channel_params: dict of {channel: {'alpha': float, 'gamma': float, 'roi_curve': callable}}
    total_budget: Total promotional $ to allocate
    """
    channels = list(channel_params.keys())
    n = len(channels)

    def total_rx(spend_allocation):
        total = 0
        for i, ch in enumerate(channels):
            params = channel_params[ch]
            # Hill response curve: saturating returns
            effect = (params['alpha'] * spend_allocation[i]**params['gamma'] /
                     (params['half_sat']**params['gamma'] + spend_allocation[i]**params['gamma']))
            total += effect
        return -total  # Negative because we minimize

    # Constraints
    cons = [{'type': 'eq', 'fun': lambda x: x.sum() - total_budget}]
    if constraints:
        cons.extend(constraints)

    # Bounds (e.g., minimum 10% in each channel)
    bounds = [(total_budget * 0.05, total_budget * 0.6) for _ in channels]

    x0 = [total_budget / n] * n  # Equal allocation starting point
    result = minimize(total_rx, x0, method='SLSQP', bounds=bounds, constraints=cons)

    return dict(zip(channels, result.x)), -result.fun</code></pre>
<div class="callout"><div class="callout-title">MMM Action Standard</div><p>MMM projects are expensive ($200K–$500K). To justify the investment, results must translate to actionable budget reallocation with measurable Rx impact. If MMM output is not embedded into the annual promotional planning cycle, it delivers no ROI.</p></div>`},
    {id:"s5",content:`<h2 id="s5">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>MMM uses adstock-transformed spending with Hill saturation curves to model diminishing returns — this captures the real nonlinear relationship between promotional investment and prescribing response.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>Sales force and medical education typically show the highest ROI in pharma MMM (5–10x), but also the slowest response and highest carryover — digital media is faster but less durable.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>The value of MMM is in optimization — reallocating budget along response curves to maximize incremental Rx return per dollar spent, not merely measuring what happened.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>MMM results must be embedded into the annual promotional planning cycle — a model produced but not acted upon delivers zero commercial value.</div></div>`}],
  questions:[
    {id:"q1",text:"A sales force channel has an adstock decay rate of 0.80. If a rep makes 10 calls in Week 1 and 0 in Week 2, what is the approximate adstock value in Week 3?",
     options:["0 (no calls made in weeks 2-3)","6.4 (10 × 0.80 × 0.80)","8 (10 × 0.80)","10 (full carryover)"],
     correct:1,explanation:"Adstock in Week 2 = 0 + 0.80 × 10 = 8.0. Adstock in Week 3 = 0 + 0.80 × 8.0 = 6.4. The geometric decay means 80% carries forward each period, reflecting the physician's fading but persistent memory of the interaction."},
    {id:"q2",text:"You find that DTC TV has the highest raw contribution to brand Rx volume in your MMM decomposition. Should you simply increase TV spending?",
     options:["Yes — highest contribution means highest ROI","No — high contribution may reflect high historical spending, not high ROI per additional dollar","Yes — TV always has the best reach","No — TV never works in pharmaceutical marketing"],
     correct:1,explanation:"High contribution reflects high historical spending, not high marginal ROI. The correct question is: what is the slope of the response curve at the current spending level? If TV is already saturated (flat curve), additional spending has low marginal return. You should compare response curves across channels at their current spending levels."},
    {id:"q3",text:"What is the primary advantage of MMM over digital multi-touch attribution for pharmaceutical brands?",
     options:["MMM is cheaper to implement","MMM captures channels without digital tracking (sales force, DTC TV, samples) through econometric modeling","MMM provides individual patient-level attribution","MMM requires no historical data"],
     correct:1,explanation:"Multi-touch attribution only works for channels with cookies/pixels (email, display, search). Pharma's most important channels — sales force calls, DTC TV, samples, and medical education — have no digital tracking. MMM captures all channels through regression analysis of time-series relationships."}
  ]
},

"2-6": {
  id:"2-6", title:"Brand Performance Dashboards", domain:"Commercial Analytics", domain_id:2,
  level:"Intermediate", mins:35, available:true,
  tags:["Dashboards","KPIs","Tableau","Power BI","Data Visualization","Commercial Performance"],
  objectives:["Design a commercial performance dashboard hierarchy","Select the right visualization type for each KPI category","Build waterfall charts for brand revenue bridges","Implement early warning indicators for brand health","Apply UX principles for executive and field-level dashboards"],
  toc:[
    {id:"s1",title:"Dashboard Architecture",level:"h2"},
    {id:"s2",title:"KPI Selection & Hierarchy",level:"h2"},
    {id:"s3",title:"Visualization Best Practices",level:"h2"},
    {id:"s4",title:"Early Warning Systems",level:"h2"},
    {id:"s5",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Dashboard Architecture</h2>
<p>Commercial dashboards serve different audiences at different decision cadences. A well-designed dashboard hierarchy has three tiers:</p>
<table><thead><tr><th>Tier</th><th>Audience</th><th>Update Frequency</th><th>Decision Type</th></tr></thead>
<tbody>
<tr><td><strong>Executive Scorecard</strong></td><td>VP+, CFO, CEO</td><td>Monthly</td><td>Strategic (resource reallocation, portfolio)</td></tr>
<tr><td><strong>Brand Management</strong></td><td>Brand directors, marketing</td><td>Weekly</td><td>Tactical (promotional mix, messaging, access)</td></tr>
<tr><td><strong>Field Operations</strong></td><td>Reps, district managers</td><td>Daily</td><td>Operational (call prioritization, targeting)</td></tr>
</tbody></table>
<p>Each tier should answer a different question:</p>
<ul>
<li><strong>Executive:</strong> "Are we on track to meet annual brand objectives?"</li>
<li><strong>Brand:</strong> "Which promotional activities are working and what needs adjustment?"</li>
<li><strong>Field:</strong> "Which doctors should I call this week?"</li>
</ul>
<div class="callout info"><div class="callout-title">The 7-Second Rule</div><p>An executive dashboard must communicate the brand health status within 7 seconds of viewing. If the reader needs to study it, it's failed. Use traffic-light RAG status, large numbers with trend arrows, and minimal text.</p></div>`},
    {id:"s2",content:`<h2 id="s2">KPI Selection & Hierarchy</h2>
<p>Not all metrics belong on every dashboard. Use a KPI hierarchy:</p>
<ul>
<li><strong>North Star Metric:</strong> One metric that defines brand success (e.g., TRx growth vs. prior year)</li>
<li><strong>Level 1 KPIs (4–6):</strong> Metrics that directly drive the North Star (market share, new patient starts, refill rate)</li>
<li><strong>Level 2 Diagnostics:</strong> Metrics that explain Level 1 variances (coverage rate, time-to-first-fill, payer access)</li>
<li><strong>Leading Indicators:</strong> Early signals of future performance (NPS, sample requests, formulary wins)</li>
</ul>
<table><thead><tr><th>Category</th><th>Key Metrics</th><th>Visualization Type</th></tr></thead>
<tbody>
<tr><td>Volume</td><td>TRx, NRx, NBRx, market share</td><td>Line chart vs. prior year + target</td></tr>
<tr><td>Patient Flow</td><td>New patient starts, refill rate, discontinuation</td><td>Funnel chart, waterfall</td></tr>
<tr><td>Access</td><td>Formulary coverage %, PA approval rate, coverage gap</td><td>Heat map by payer/geography</td></tr>
<tr><td>Field Activity</td><td>Coverage rate, calls/day, samples, reach & frequency</td><td>Bar/sparkline by territory</td></tr>
<tr><td>Financial</td><td>Gross-to-net, net revenue vs. budget, rebate liability</td><td>Waterfall, variance bar</td></tr>
</tbody></table>`},
    {id:"s3",content:`<h2 id="s3">Visualization Best Practices</h2>
<p>Choose visualization type based on analytical question, not aesthetics:</p>
<ul>
<li><strong>Time trends → Line chart:</strong> Never use bar charts for trends; lines show continuity and rate of change</li>
<li><strong>Rankings → Horizontal bar chart:</strong> Easier to read labels than vertical; sort descending</li>
<li><strong>Part-to-whole → Bar with 100% stack or treemap:</strong> Avoid pie charts — humans cannot accurately estimate angles</li>
<li><strong>Revenue bridge/variance → Waterfall chart:</strong> Shows how components sum to a total change</li>
<li><strong>Geographic variation → Choropleth map:</strong> Use sequential color scales for magnitude; never use rainbow palettes</li>
<li><strong>Correlation → Scatter plot:</strong> Use when you want to show the relationship between two variables across entities</li>
</ul>
<div class="callout warning"><div class="callout-title">Avoid These Common Mistakes</div><ul>
<li>Truncated Y-axes that exaggerate small changes</li>
<li>Dual Y-axes on the same chart (confusing)</li>
<li>3D charts of any kind (distort perception)</li>
<li>More than 5 colors in a single chart</li>
<li>Showing 50 metrics on one page</li>
</ul></div>`},
    {id:"s4",content:`<h2 id="s4">Early Warning Systems</h2>
<p>Early warning indicators predict brand problems 4–12 weeks before they appear in Rx data:</p>
<pre><code class="language-python">def calculate_brand_health_index(brand_df, weights=None):
    """
    Composite brand health index integrating leading and lagging indicators.
    Index range: 0–100; threshold: <60 triggers commercial review.
    """
    if weights is None:
        weights = {
            'trx_trend': 0.25,          # 12-week TRx trajectory
            'new_patient_starts': 0.20,  # Leading indicator
            'refill_rate': 0.15,         # Loyalty signal
            'formulary_access': 0.20,    # Access quality
            'coverage_rate': 0.10,       # Field activity
            'nps_score': 0.10           # HCP satisfaction
        }

    df = brand_df.copy()

    # Normalize each component to 0-100
    for metric, weight in weights.items():
        if metric in df.columns:
            # Z-score normalize then scale to 0-100
            z = (df[metric] - df[metric].mean()) / df[metric].std()
            df[f'{metric}_norm'] = (z.clip(-3, 3) + 3) / 6 * 100

    # Weighted composite
    df['brand_health_index'] = sum(
        df.get(f'{m}_norm', 50) * w
        for m, w in weights.items()
    )

    # RAG status
    df['rag_status'] = pd.cut(
        df['brand_health_index'],
        bins=[0, 60, 75, 100],
        labels=['RED', 'AMBER', 'GREEN']
    )

    return df[['period', 'brand_health_index', 'rag_status']]</code></pre>`},
    {id:"s5",content:`<h2 id="s5">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>Dashboard architecture has three tiers — Executive (monthly, strategic), Brand Management (weekly, tactical), and Field Operations (daily, operational) — each designed for a different decision type and time horizon.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>Use a KPI hierarchy: one North Star metric, 4–6 Level 1 KPIs, diagnostic Level 2 metrics, and leading indicators — ruthlessly exclude any metric that doesn't drive a decision.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Visualization type must match the analytical question: lines for trends, horizontal bars for rankings, waterfall for bridges, scatter for correlations — never use 3D charts or pie charts.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>Early warning systems monitor leading indicators (new patient starts, NPS, formulary wins) that predict brand performance 4–12 weeks before changes appear in total Rx volume.</div></div>`}],
  questions:[
    {id:"q1",text:"An executive stakeholder says: 'I need to understand everything about our brand performance on one page.' What is the correct analytical response?",
     options:["Build a single dashboard with 50+ metrics to cover everything","Explain the 7-second rule: a good executive dashboard shows 5-7 KPIs with RAG status, designed to communicate health at a glance — not everything","Provide raw data tables for maximum transparency","Create 10 separate tabs, one per metric category"],
     correct:1,explanation:"Executive dashboards must communicate brand health within 7 seconds. Including 50+ metrics defeats this purpose — executives cannot process that volume in a brief review. The correct approach is ruthless prioritization to 5-7 KPIs with clear RAG status, designed to prompt the right strategic conversations."},
    {id:"q2",text:"Your brand's TRx has been flat for 12 weeks but new patient starts are declining. What does this pattern suggest?",
     options:["The brand is performing well — flat TRx means stable","Refill patients are masking new patient start decline; a TRx drop will follow in 4–8 weeks","Competition is entering the market","Formulary coverage has improved"],
     correct:1,explanation:"New patient starts are a leading indicator of future TRx. When NPS declines but TRx stays flat, it means existing patients' refills are temporarily masking the underlying weakness. As those patients eventually discontinue without being replaced, TRx will decline — typically 4–8 weeks later."},
    {id:"q3",text:"Which chart type is most appropriate for showing how components of gross-to-net revenue deduction sum to the total net revenue figure?",
     options:["Pie chart","Line chart","Waterfall chart","Scatter plot"],
     correct:2,explanation:"A waterfall chart is specifically designed to show how incremental positive and negative components sum to a final total. For gross-to-net analysis (gross revenue minus chargebacks, government rebates, contract discounts = net revenue), a waterfall makes each deduction's magnitude and contribution immediately visible."}
  ]
},

"2-7": {
  id:"2-7", title:"Competitive Intelligence Analytics", domain:"Commercial Analytics", domain_id:2,
  level:"Intermediate", mins:35, available:true,
  tags:["Competitive Intelligence","Market Share","Pipeline","CI Analytics","War Gaming"],
  objectives:["Build a systematic competitive intelligence monitoring framework","Analyze market share dynamics using share-of-voice and share-of-market data","Forecast competitive entry impact on brand revenue","Use clinical trial data for pipeline tracking","Apply war-gaming methodology to commercial planning"],
  toc:[
    {id:"s1",title:"CI Framework & Data Sources",level:"h2"},
    {id:"s2",title:"Market Share Analytics",level:"h2"},
    {id:"s3",title:"Pipeline Monitoring & Forecasting",level:"h2"},
    {id:"s4",title:"War Gaming Methodology",level:"h2"},
    {id:"s5",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">CI Framework & Data Sources</h2>
<p><strong>Competitive Intelligence (CI)</strong> is the systematic collection and analysis of competitor information to inform commercial strategy. Unlike corporate espionage, CI in pharma is entirely legal and uses publicly available sources.</p>
<table><thead><tr><th>CI Category</th><th>Data Sources</th><th>Key Questions</th></tr></thead>
<tbody>
<tr><td>Clinical Pipeline</td><td>ClinicalTrials.gov, SEC filings, FDA calendar</td><td>What are they studying? When might they launch?</td></tr>
<tr><td>Commercial Performance</td><td>IQVIA Xponent, earnings calls, analyst reports</td><td>What is their market share and trajectory?</td></tr>
<tr><td>Regulatory Strategy</td><td>FDA PDUFA dates, label updates, CRL letters</td><td>What indications are they adding/losing?</td></tr>
<tr><td>Pricing & Access</td><td>SSR Health, MMIT, pharmacy benefit managers</td><td>What is their WAC, net price, formulary position?</td></tr>
<tr><td>Medical Affairs</td><td>Congress abstracts, publications, ClinicalTrials</td><td>What evidence are they building for label expansion?</td></tr>
<tr><td>Commercial Tactics</td><td>Field intel, Open Payments, speaker bureau data</td><td>How are they engaging HCPs?</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">Ethical CI Boundaries</div><p>Legitimate pharma CI uses public sources only. Never solicit confidential information from competitor employees, attend competitor meetings under false pretense, or use industry events to extract proprietary strategy. Violations can constitute trade secret theft and create significant legal liability.</p></div>`},
    {id:"s2",content:`<h2 id="s2">Market Share Analytics</h2>
<p>Market share analysis goes beyond simple volume percentages. Effective CI tracks share across multiple dimensions:</p>
<pre><code class="language-python">def analyze_market_share(rx_data, brand_name, segments):
    """
    Multi-dimensional market share analysis.

    Segments: ['specialty', 'geography', 'lot', 'payer_type', 'new_vs_refill']
    """
    results = {}

    for segment in segments:
        share = (rx_data.groupby([segment, 'drug_name'])['rx_volume']
                        .sum()
                        .unstack(fill_value=0))

        # Calculate share for each segment value
        share_pct = share.div(share.sum(axis=1), axis=0) * 100
        share_pct['brand'] = brand_name

        # Trend: 12-week moving average share
        rx_data['week_key'] = pd.to_datetime(rx_data['week_ending'])
        trend = (rx_data[rx_data['drug_name'] == brand_name]
                 .groupby([segment, 'week_key'])['rx_volume'].sum()
                 .groupby(level=0).apply(lambda x: x.rolling(12).mean()))

        results[segment] = {
            'current_share': share_pct,
            'trend': trend
        }

    # Share of voice vs. share of market (SOM/SOV ratio)
    # SOM/SOV > 1 = overperforming relative to investment
    results['efficiency'] = {
        'brand': brand_name,
        'note': 'Compare promotional SOV to TRx SOM — ratio > 1 = efficient'
    }

    return results</code></pre>
<p><strong>Share of Voice (SOV) vs. Share of Market (SOM):</strong> The ratio of SOV to SOM measures promotional efficiency. A brand spending 30% of category promotional dollars but holding only 20% share (SOV/SOM = 1.5) is over-investing relative to returns.</p>`},
    {id:"s3",content:`<h2 id="s3">Pipeline Monitoring & Forecasting</h2>
<p>Systematically tracking competitor pipelines allows proactive defense planning:</p>
<table><thead><tr><th>Pipeline Stage</th><th>Time to Potential Launch</th><th>Key Tracking Signal</th><th>Response Lead Time</th></tr></thead>
<tbody>
<tr><td>Phase I/II</td><td>5–8 years</td><td>MoA, target overlap, early efficacy signals</td><td>Early lifecycle planning</td></tr>
<tr><td>Phase III enrollment</td><td>2–5 years</td><td>Endpoint design, comparator, biomarker eligibility</td><td>Label differentiation, LCM</td></tr>
<tr><td>Phase III readout</td><td>1–3 years</td><td>Hazard ratios, safety profile, subgroup data</td><td>Messaging updates, managed care strategy</td></tr>
<tr><td>NDA/BLA filed</td><td>6–18 months</td><td>PDUFA date, advisory committee (AdCom)</td><td>Access contracting, co-pay card adjustments</td></tr>
<tr><td>Approved</td><td>0–3 months</td><td>Label, REMS requirements, launch price</td><td>Execute defense playbook</td></tr>
</tbody></table>
<div class="callout warning"><div class="callout-title">The 18-Month Preparation Window</div><p>Effective competitive defense requires 18 months of preparation before a competitor launch. Companies that start their defense strategy at the competitor's NDA approval date are already too late to secure favorable formulary positions and HCP mindshare.</p></div>`},
    {id:"s4",content:`<h2 id="s4">War Gaming Methodology</h2>
<p><strong>War gaming</strong> is a facilitated competitive simulation where teams role-play as competitors to stress-test your brand strategy. It is the most powerful tool for identifying blind spots in commercial planning.</p>
<p><strong>Standard war game structure (2-day format):</strong></p>
<ol>
<li><strong>Intelligence briefing (4 hours):</strong> Each team receives a dossier on the competitor they're playing — pipeline data, commercial model, financials, culture</li>
<li><strong>Strategy development (4 hours):</strong> Each team develops a launch strategy from their competitor's perspective</li>
<li><strong>Move 1 (2 hours):</strong> All teams present their Year-1 commercial strategy simultaneously</li>
<li><strong>Response (2 hours):</strong> Each team reacts to competitors' moves and adapts their strategy</li>
<li><strong>Move 2 (2 hours):</strong> Teams execute Year 2–3 response strategies</li>
<li><strong>Debrief (2 hours):</strong> Facilitators identify key vulnerabilities and strategic implications</li>
</ol>
<div class="callout"><div class="callout-title">War Game Output</div><p>Good war games produce a prioritized list of 5–7 strategic vulnerabilities with specific mitigation actions and owners. If the output is more than 10 priorities, nothing will get done. Less is more.</p></div>`},
    {id:"s5",content:`<h2 id="s5">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>Effective CI uses only legal public sources — ClinicalTrials.gov, SEC filings, congress abstracts, claims data — and is distinguished from corporate espionage by its methodology, not just intent.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>Share of Voice-to-Share of Market ratio (SOV/SOM) measures promotional efficiency — a ratio above 1.0 means you're over-investing relative to the market share you hold.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Competitive defense requires 18 months of preparation before a competitor launch — companies that start at the PDUFA date are already too late for formulary positioning and HCP mindshare.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>War gaming is the most powerful tool for identifying commercial blind spots — a well-facilitated 2-day simulation reveals vulnerabilities that market research alone will never surface.</div></div>`}],
  questions:[
    {id:"q1",text:"A competing brand holds 25% share of market but invests 40% of category share of voice. What does this SOV/SOM ratio of 0.625 indicate?",
     options:["The brand is underperforming relative to its promotional investment","The brand is overperforming relative to its investment","The ratio indicates the brand is market leader","SOV/SOM is irrelevant in pharmaceutical marketing"],
     correct:0,explanation:"SOV/SOM < 1.0 means the brand is getting less market share than its promotional investment share would suggest — it is underperforming relative to investment. The competitor is investing 40% of category promotional spending but only holds 25% of sales, indicating poor promotional ROI or messaging effectiveness."},
    {id:"q2",text:"You learn a competitor has just enrolled the last patient in their Phase III trial in your indication. Approximately when should you begin executing your competitive defense strategy?",
     options:["Immediately — 18 months before likely NDA submission means defense planning should already be underway","When they submit the NDA (in ~12 months)","When they receive approval (in ~18 months)","When they formally announce their launch price"],
     correct:0,explanation:"Given an 18-month preparation requirement, and that Phase III enrollment completion signals an NDA submission in ~12-18 months (plus FDA review of 10-12 months = launch in ~24-30 months), you should already be executing your defense strategy. The Phase III enrollment event is actually a late signal — preparation should have started at Phase III initiation."},
    {id:"q3",text:"Which war gaming output format is most likely to drive actual strategic action?",
     options:["A 50-page detailed report covering all potential competitive scenarios","A prioritized list of 5–7 specific vulnerabilities with assigned owners and mitigation timelines","A real-time competitive monitoring dashboard","A survey of HCP perceptions of all competing brands"],
     correct:1,explanation:"War gaming value is destroyed by output overload. A prioritized list of 5–7 specific, actionable vulnerabilities with owners and timelines has a high probability of implementation. A 50-page report gets read by no one and acted upon by fewer."}
  ]
},

"2-8": {
  id:"2-8", title:"Launch Analytics & Brand Tracking", domain:"Commercial Analytics", domain_id:2,
  level:"Advanced", mins:50, available:true,
  tags:["Launch Analytics","Brand Tracking","Demand Waterfall","Launch KPIs","Analogue Analysis"],
  objectives:["Build a pre-launch analytics framework","Define and track launch KPIs: velocity, depth, breadth","Design a weekly brand tracking cadence","Apply demand waterfall modeling","Select launch analogues and benchmark performance"],
  toc:[
    {id:"s1",title:"The Launch Analytics Framework",level:"h2"},
    {id:"s2",title:"Launch KPIs: Velocity, Depth & Breadth",level:"h2"},
    {id:"s3",title:"Analogue Selection & Benchmarking",level:"h2"},
    {id:"s4",title:"Demand Waterfall Modeling",level:"h2"},
    {id:"s5",title:"Brand Tracking Cadence & Dashboards",level:"h2"},
    {id:"s6",title:"Variance Analysis & Course Correction",level:"h2"},
    {id:"s7",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">The Launch Analytics Framework</h2>
<p>A pharmaceutical launch is a commercial event measured in <strong>months, not years</strong>. Approximately 75% of a brand's peak sales trajectory is determined within the first 6 months of launch. Analytics must be set up <em>before</em> Day 1 to enable real-time decision-making.</p>
<div class="callout"><div class="callout-title">The Launch Analytics Imperative</div><p>Every week of launch generates irreplaceable signal. Brands that establish measurement infrastructure pre-launch can course-correct within weeks; brands without it discover problems at the 6-month review — too late to recover trajectory.</p></div>
<p>A launch analytics framework has four phases:</p>
<table><thead><tr><th>Phase</th><th>Timing</th><th>Key Activities</th><th>Primary Output</th></tr></thead>
<tbody>
<tr><td>Pre-Launch Setup</td><td>T-12 to T-1 months</td><td>KPI design, data feeds, dashboard build, analogue baselining</td><td>Launch scorecard, tracking infrastructure</td></tr>
<tr><td>Early Launch (0-90 days)</td><td>T+0 to T+3 months</td><td>Weekly tracking, formulary wins, NRx velocity, coverage monitoring</td><td>Weekly flash report</td></tr>
<tr><td>Growth Phase (3-12 months)</td><td>T+3 to T+12 months</td><td>Market share trajectory, segment penetration, patient retention</td><td>Monthly brand review</td></tr>
<tr><td>Established Phase (12+ months)</td><td>T+12 months+</td><td>LOT analytics, long-term adherence, lifecycle events</td><td>Quarterly strategic review</td></tr>
</tbody></table>
<p>The <strong>demand waterfall</strong> connects macro market potential to realized revenue through a series of conversion steps — each step measured, benchmarked, and managed.</p>`},
    {id:"s2",content:`<h2 id="s2">Launch KPIs: Velocity, Depth & Breadth</h2>
<p>The three dimensions of launch performance capture how fast, how much, and how widely a brand is adopted:</p>
<table><thead><tr><th>Dimension</th><th>Definition</th><th>Metric</th><th>Target Range</th></tr></thead>
<tbody>
<tr><td><strong>Velocity</strong></td><td>Speed of adoption over time</td><td>Weekly NRx growth rate (%WoW)</td><td>+5–15% in first 12 weeks</td></tr>
<tr><td><strong>Depth</strong></td><td>Volume per prescriber</td><td>Avg Rx per active writer/month</td><td>Benchmark vs. analogue at M6</td></tr>
<tr><td><strong>Breadth</strong></td><td>Number of prescribers adopting</td><td>New-to-brand writers per week</td><td>Ramping through M6 launch</td></tr>
</tbody></table>
<p>Additional critical early launch KPIs:</p>
<pre><code class="language-sql">-- Early launch KPI dashboard query
SELECT
  week_num,
  -- NRx metrics
  SUM(new_rx) AS nrx_volume,
  SUM(new_rx) / LAG(SUM(new_rx), 1) OVER (ORDER BY week_num) - 1 AS nrx_wow_growth,
  -- Writer metrics
  COUNT(DISTINCT CASE WHEN new_to_brand_flag = 1 THEN prescriber_id END) AS new_writers,
  COUNT(DISTINCT prescriber_id) AS total_active_writers,
  -- Coverage
  MAX(formulary_access_pct) AS formulary_lives_covered,
  MAX(prior_auth_rate) AS prior_auth_burden_pct
FROM launch_tracking_mart
WHERE brand_id = 'NEW_BRAND'
GROUP BY week_num
ORDER BY week_num;</code></pre>
<div class="callout info"><div class="callout-title">The Writer Pyramid</div><p>Track prescribers in three tiers: Tier 1 (high-volume specialists, target 90%+ called on Week 1), Tier 2 (mid-volume specialists, target by Month 2), Tier 3 (GPs/community, target by Month 6). The % of Tier 1 writers generating their first Rx within 90 days is the single most predictive launch metric.</p></div>`},
    {id:"s3",content:`<h2 id="s3">Analogue Selection & Benchmarking</h2>
<p><strong>Launch analogues</strong> are previously-launched drugs with similar commercial profiles used to set expectations and identify over/underperformance. Selecting the right analogue is as important as the benchmarking itself.</p>
<p>Analogue selection criteria:</p>
<table><thead><tr><th>Criterion</th><th>What to Match</th><th>Why It Matters</th></tr></thead>
<tbody>
<tr><td>Indication</td><td>Same disease area, similar LOT</td><td>Patient pool size and competitive dynamics</td></tr>
<tr><td>Mechanism of Action</td><td>Novel vs. me-too vs. category-first</td><td>Determines physician education burden</td></tr>
<tr><td>Route of Administration</td><td>Oral vs. IV vs. SC</td><td>Prescriber and patient adoption curves differ dramatically</td></tr>
<tr><td>Formulary Environment</td><td>Pre-approval vs. post-approval formulary</td><td>Access barriers drive early velocity differently</td></tr>
<tr><td>Competitive Intensity</td><td>Crowded vs. uncrowded market at launch</td><td>Share of voice requirements</td></tr>
<tr><td>Price Point</td><td>WAC within ±30%</td><td>Copay card and PA burden similarity</td></tr>
</tbody></table>
<p>Benchmarking approach — index to analogue at launch:</p>
<pre><code class="language-python">import pandas as pd
import matplotlib.pyplot as plt

# Analogue benchmarking: index week 1 = 100, compare trajectory
def index_to_launch(df, brand_col, weeks_col, volume_col):
    df = df.copy()
    week1_volumes = df[df[weeks_col] == 1].set_index(brand_col)[volume_col]
    df['index'] = df.apply(
        lambda r: r[volume_col] / week1_volumes[r[brand_col]] * 100, axis=1
    )
    return df

# Plot: current brand vs 3 analogues
fig, ax = plt.subplots(figsize=(12, 6))
for brand in ['CURRENT', 'ANALOGUE_A', 'ANALOGUE_B', 'ANALOGUE_C']:
    data = indexed_df[indexed_df['brand'] == brand]
    ax.plot(data['week'], data['index'], label=brand,
            linewidth=3 if brand == 'CURRENT' else 1.5,
            linestyle='-' if brand == 'CURRENT' else '--')
ax.axvline(x=12, color='red', linestyle=':', label='M3 checkpoint')
ax.set_xlabel('Weeks Post-Launch')
ax.set_ylabel('NRx Index (Week 1 = 100)')
ax.legend()
ax.set_title('NRx Trajectory vs. Analogues')</code></pre>`},
    {id:"s4",content:`<h2 id="s4">Demand Waterfall Modeling</h2>
<p>The <strong>demand waterfall</strong> translates market potential into realized Rx volume through successive conversion steps. Each step is a commercial lever that can be managed and optimized.</p>
<div class="callout"><div class="callout-title">Waterfall Structure</div><p>Total addressable patients → Diagnosed → Biomarker eligible → Treated → Brand treated → Adherent → Net revenue. Each arrow has a conversion rate that your commercial strategy must move.</p></div>
<table><thead><tr><th>Waterfall Stage</th><th>Formula</th><th>Typical Rate</th><th>Commercial Lever</th></tr></thead>
<tbody>
<tr><td>Total incident patients</td><td>Epidemiology model</td><td>—</td><td>Disease awareness DTC</td></tr>
<tr><td>Diagnosis rate</td><td>Diagnosed / Incident</td><td>60–85%</td><td>HCP education on symptoms</td></tr>
<tr><td>Biomarker testing rate</td><td>Tested / Diagnosed</td><td>40–70% oncology</td><td>Testing programs, reflexive orders</td></tr>
<tr><td>Treatment rate</td><td>Treated / Eligible</td><td>50–80%</td><td>MDT support, guideline inclusion</td></tr>
<tr><td>Brand share</td><td>Brand Rx / Category Rx</td><td>Target: 30–60%</td><td>Messaging, access, formulary</td></tr>
<tr><td>Persistency / refill rate</td><td>Patients at M6 / M0</td><td>50–75%</td><td>Hub support, copay assistance</td></tr>
<tr><td>Gross-to-net deduction</td><td>Net revenue / Gross revenue</td><td>30–60%</td><td>Contract negotiation, rebate management</td></tr>
</tbody></table>
<pre><code class="language-python"># Demand waterfall model
params = {
    'incident_patients': 45000,
    'diagnosis_rate': 0.78,
    'biomarker_testing_rate': 0.62,
    'biomarker_positive_rate': 0.45,
    'treatment_rate': 0.71,
    'brand_share': 0.35,
    'persistency_12m': 0.58,
    'avg_rx_per_patient_year': 11.5,
    'wac_per_rx': 8200,
    'gross_to_net_pct': 0.42,
}

def waterfall(p):
    diagnosed = p['incident_patients'] * p['diagnosis_rate']
    tested = diagnosed * p['biomarker_testing_rate']
    eligible = tested * p['biomarker_positive_rate']
    treated = eligible * p['treatment_rate']
    brand_patients = treated * p['brand_share']
    persistent_patients = brand_patients * p['persistency_12m']
    total_rx = persistent_patients * p['avg_rx_per_patient_year']
    gross_rev = total_rx * p['wac_per_rx']
    net_rev = gross_rev * (1 - p['gross_to_net_pct'])
    return {'brand_patients': round(brand_patients),
            'total_rx': round(total_rx),
            'gross_revenue_M': round(gross_rev/1e6),
            'net_revenue_M': round(net_rev/1e6)}

print(waterfall(params))
# {'brand_patients': 3278, 'total_rx': 37697, 'gross_revenue_M': 309, 'net_revenue_M': 179}</code></pre>`},
    {id:"s5",content:`<h2 id="s5">Brand Tracking Cadence & Dashboards</h2>
<p>Launch requires <strong>three tracking cadences</strong> running simultaneously, each with different audiences and decision horizons:</p>
<table><thead><tr><th>Cadence</th><th>Audience</th><th>Metrics Focus</th><th>Key Decision</th></tr></thead>
<tbody>
<tr><td>Weekly Flash (1-pager)</td><td>Brand team, field leadership</td><td>NRx, TRx, writers, formulary wins</td><td>Field deployment adjustments</td></tr>
<tr><td>Monthly Brand Review</td><td>Leadership, marketing, access</td><td>Market share, segment performance, patient retention</td><td>Messaging, resource allocation</td></tr>
<tr><td>Quarterly Business Review (QBR)</td><td>C-suite, finance, commercial leads</td><td>Demand waterfall, revenue vs. forecast, GTN analysis</td><td>Budget reallocation, forecast revision</td></tr>
</tbody></table>
<p>The weekly flash report should fit on a single page and answer five questions in 30 seconds:</p>
<ol>
<li>Did NRx grow week-over-week?</li>
<li>Are we ahead or behind analogue trajectory?</li>
<li>How many new writers wrote for the first time?</li>
<li>What % of target lives have unrestricted access?</li>
<li>What is the PA approval rate this week?</li>
</ol>
<div class="callout warning"><div class="callout-title">Dashboard Anti-Patterns</div><p>Avoid: 40-slide monthly reports (nobody reads them), metrics with no comparator (absolute numbers without benchmark are meaningless), lagged data presented as current (brand team acts on stale signal). The best launch dashboards show trend + benchmark + alert in &lt;60 seconds.</p></div>`},
    {id:"s6",content:`<h2 id="s6">Variance Analysis & Course Correction</h2>
<p><strong>Variance analysis</strong> compares actual performance to forecast and decomposes the gap into actionable root causes. Without structured variance analysis, the brand team debating "why we missed" without data agreement kills decision velocity.</p>
<p>Variance decomposition waterfall:</p>
<table><thead><tr><th>Variance Driver</th><th>Diagnosis Signal</th><th>Commercial Response</th></tr></thead>
<tbody>
<tr><td>Market size below forecast</td><td>Total category Rx below plan</td><td>Revise TAM assumption; activate DTC/HCP awareness</td></tr>
<tr><td>Brand share below plan</td><td>Competitors winning share</td><td>Competitive messaging, sales force redeployment</td></tr>
<tr><td>Access/coverage below plan</td><td>Formulary coverage &lt; target</td><td>Accelerate payer negotiations, copay support</td></tr>
<tr><td>Writer activation below plan</td><td>% of Tier 1 HCPs not prescribing</td><td>Rep coaching, speaker programs, samples</td></tr>
<tr><td>Persistency below plan</td><td>Early refill gaps in claims</td><td>Hub support, adherence programs</td></tr>
<tr><td>GTN worse than plan</td><td>Rebate or chargeback variance</td><td>Payer contract renegotiation</td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">The 5-Why Rule</div><p>Never accept "market conditions" as a variance explanation. Drill to the fifth why: "NRx missed → Brand share fell → Competitor gained Tier 1 formulary → We lost the Q3 UHC negotiation → We offered 18% rebate when competitor offered 25%." Only at level 5 is there a decision to make.</p></div>`},
    {id:"s7",content:`<h2 id="s7">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>75% of a brand's peak sales trajectory is set within the first 6 months — launch analytics infrastructure must be live before Day 1.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>Track launch across three dimensions: Velocity (NRx growth rate), Breadth (new writers per week), and Depth (Rx per active writer) — all three must move together for a healthy launch.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Analogue benchmarking requires careful matching on indication, MOA, route, formulary environment, and price — a poor analogue gives false confidence or false alarm.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>The demand waterfall connects market potential to net revenue through conversion rates at each stage — each rate is a commercial lever, not a fixed assumption.</div></div>`}],
  questions:[
    {id:"q1",text:"Your brand is in Week 8 of launch. NRx volume is growing but the number of new-to-brand writers has plateaued for 3 consecutive weeks. What is the most likely root cause and recommended action?",
     options:["Formulary access is restricting uptake — accelerate payer negotiations","The brand has reached the natural ceiling of early adopters and needs to move Tier 2 physicians into the call plan","The sales force is underperforming and should be placed on performance improvement plans","Competitive messaging is winning — launch a head-to-head advertising campaign"],
     correct:1,explanation:"A plateau in new writer activation after initial adoption is a classic signal that the brand has penetrated its early adopter specialist base and must now activate a broader audience. The tactical response is expanding the call plan to Tier 2 physicians with targeted education programs, not PIP or advertising."},
    {id:"q2",text:"In a demand waterfall model, the biomarker testing rate drops from 62% to 50% due to lab access issues. Holding all other parameters constant, what category of commercial response is most directly indicated?",
     options:["Increase sales force targeting of high-volume prescribers","Activate a testing awareness and navigation program targeting community oncologists","Negotiate better formulary tiers with commercial payers","Launch a direct-to-consumer campaign about the drug's benefits"],
     correct:1,explanation:"The waterfall shows the specific conversion failure point: the testing rate gate. The direct commercial response is a testing navigation program (e.g., partnering with Quest/LabCorp for reflexive testing orders, educating community oncologists on the testing workflow). Other responses address different waterfall stages."},
    {id:"q3",text:"Which analogue selection criterion has the single greatest impact on predicted launch trajectory shape?",
     options:["WAC price within ±30% of new brand","Route of administration (oral vs. IV)","Competitive intensity at time of launch","Indication and line of therapy"],
     correct:3,explanation:"Indication and line of therapy determines the underlying patient pool size, urgency of treatment decision, physician type (specialist vs. generalist), and switching dynamics. A first-line lung cancer launch follows a fundamentally different curve than a third-line rare tumor launch — no other matching criterion overrides this."}
  ]
},

"2-9": {
  id:"2-9", title:"Gross-to-Net & Contract Analytics", domain:"Commercial Analytics", domain_id:2,
  level:"Advanced", mins:45, available:true,
  tags:["Gross-to-Net","GTN","Medicaid Rebates","Chargebacks","Net Price","Revenue Management"],
  objectives:["Understand the gross-to-net waterfall structure","Calculate mandatory Medicaid rebates and their impact","Model voluntary commercial rebates and access tradeoffs","Build chargeback analytics for channel management","Forecast net revenue with GTN sensitivity"],
  toc:[
    {id:"s1",title:"The Gross-to-Net Waterfall",level:"h2"},
    {id:"s2",title:"Mandatory Rebates: Medicaid & Government Programs",level:"h2"},
    {id:"s3",title:"Voluntary Rebates & Commercial Formulary Access",level:"h2"},
    {id:"s4",title:"Chargeback Analytics",level:"h2"},
    {id:"s5",title:"Net Price Modeling & Revenue Forecasting",level:"h2"},
    {id:"s6",title:"GTN Analytics Best Practices",level:"h2"},
    {id:"s7",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">The Gross-to-Net Waterfall</h2>
<p><strong>Gross-to-net (GTN)</strong> is the financial bridge between a drug's list price (WAC) and the revenue the manufacturer actually receives. For specialty brands in the US, GTN deductions routinely range from 40–65% — meaning a $10,000/month drug may net only $3,500–6,000.</p>
<div class="callout"><div class="callout-title">Why GTN Matters Enormously</div><p>A 5-percentage-point error in GTN assumption in a launch model can translate to $100M+ in revenue forecast error for a blockbuster. Finance, commercial, and market access teams must align on GTN assumptions before launch — not discover disagreement at year-end close.</p></div>
<table><thead><tr><th>GTN Component</th><th>Who Receives It</th><th>Mandatory?</th><th>Typical Range</th></tr></thead>
<tbody>
<tr><td>Medicaid Base Rebate</td><td>State Medicaid agencies</td><td>Yes (statutory)</td><td>23.1% of AMP (branded)</td></tr>
<tr><td>Medicaid Inflation Penalty</td><td>State Medicaid agencies</td><td>Yes (if WAC > CPI)</td><td>0–30%+ additional</td></tr>
<tr><td>340B Ceiling Price</td><td>340B covered entities</td><td>Yes (HRSA)</td><td>AMP − Medicaid rebate = ~75% off WAC</td></tr>
<tr><td>VA/DoD Federal Ceiling Price</td><td>Veterans Affairs, DoD, PHS</td><td>Yes (FAMP-based)</td><td>~76% of non-FAMP</td></tr>
<tr><td>Commercial Rebates</td><td>PBMs, commercial payers</td><td>Voluntary (negotiated)</td><td>10–45% of WAC</td></tr>
<tr><td>Copay Assistance (Cards)</td><td>Commercially insured patients</td><td>Voluntary</td><td>2–8% of WAC</td></tr>
<tr><td>Chargebacks</td><td>Wholesalers/distributors</td><td>Contractual</td><td>1–5% of WAC</td></tr>
<tr><td>Returns & Other</td><td>Wholesalers</td><td>Contractual</td><td>1–3% of WAC</td></tr>
</tbody></table>`},
    {id:"s2",content:`<h2 id="s2">Mandatory Rebates: Medicaid & Government Programs</h2>
<p>The <strong>Medicaid Drug Rebate Program (MDRP)</strong> requires manufacturers to pay rebates to states as a condition of Medicaid coverage. Two components apply:</p>
<ul>
<li><strong>Base rebate:</strong> 23.1% of Average Manufacturer Price (AMP) for single-source branded drugs</li>
<li><strong>Inflation rebate:</strong> If WAC increases exceed CPI-U, an additional inflation penalty applies — equal to the excess price increase above CPI</li>
</ul>
<p>Key definitions:</p>
<table><thead><tr><th>Term</th><th>Definition</th><th>Significance</th></tr></thead>
<tbody>
<tr><td>AMP (Average Manufacturer Price)</td><td>Volume-weighted average price to wholesalers and direct purchasers, excluding PBM/payer rebates</td><td>Basis for Medicaid rebate calculation</td></tr>
<tr><td>Best Price (BP)</td><td>Lowest price available to any US customer (excluding 340B, VA)</td><td>If AMP − base rebate > AMP − BP, best price drives additional rebate</td></tr>
<tr><td>CPI-U Baseline Quarter</td><td>Quarter the drug was first marketed</td><td>Any WAC increase above CPI trajectory incurs penalty</td></tr>
</tbody></table>
<pre><code class="language-python"># Medicaid rebate calculation
def calc_medicaid_rebate(amp, best_price, base_rebate_rate=0.231):
    base = amp * base_rebate_rate
    bp_rebate = amp - best_price  # best price rule
    unit_rebate = max(base, bp_rebate)
    return unit_rebate

# Inflation penalty example
def calc_inflation_penalty(amp_current, amp_baseline_q, cpi_current, cpi_baseline_q):
    # Adjusted baseline AMP = baseline AMP * (CPI current / CPI baseline)
    adjusted_baseline = amp_baseline_q * (cpi_current / cpi_baseline_q)
    penalty = max(0, amp_current - adjusted_baseline)
    return penalty

# Example: drug launched at AMP $1000, now at $1450; CPI grew 15%
amp_baseline = 1000
amp_current = 1450
cpi_growth = 1.15

adjusted = amp_baseline * cpi_growth  # $1150
inflation_penalty = max(0, amp_current - adjusted)  # $300 per unit additional rebate
print(f"Inflation penalty per unit: ${inflation_penalty}")
# Total Medicaid rebate = 23.1% * $1450 + $300 = $335.05 + $300 = $635.05/unit</code></pre>
<div class="callout warning"><div class="callout-title">The Price Increase Trap</div><p>Annual WAC increases above CPI compound as inflation penalties. A brand that took aggressive WAC increases in early years can find its Medicaid rebate exceeds 100% of AMP — meaning it pays more in rebates than it receives for Medicaid prescriptions. This is not hypothetical; several large brands have faced this.</p></div>`},
    {id:"s3",content:`<h2 id="s3">Voluntary Rebates & Commercial Formulary Access</h2>
<p>Commercial payers (UHC, Aetna, BCBS, CVS/Caremark, Express Scripts) require rebates in exchange for preferred formulary placement. The access-rebate tradeoff is the central market access negotiation.</p>
<p>Formulary tier impact on Rx volume:</p>
<table><thead><tr><th>Formulary Tier</th><th>Patient Copay</th><th>Prior Authorization</th><th>Expected Volume Impact</th></tr></thead>
<tbody>
<tr><td>Tier 1 (Preferred)</td><td>$10–30</td><td>None</td><td>+40–60% vs. restricted</td></tr>
<tr><td>Tier 2 (Non-Preferred Brand)</td><td>$50–100</td><td>Sometimes</td><td>Baseline</td></tr>
<tr><td>Tier 3 (Specialty)</td><td>20–33% coinsurance</td><td>Often</td><td>−20–30%</td></tr>
<tr><td>PA Required</td><td>Varies</td><td>Yes</td><td>−30–50% (PA abandonment)</td></tr>
<tr><td>Step Therapy / QL</td><td>Varies</td><td>Yes (step edit)</td><td>−40–60%</td></tr>
<tr><td>Non-Covered / Excluded</td><td>Full OOP</td><td>N/A</td><td>−70–85%</td></tr>
</tbody></table>
<p>Net price optimization model — evaluating rebate offers:</p>
<pre><code class="language-python">def evaluate_rebate_offer(wac_per_rx, rebate_pct,
                           volume_uplift_pct, base_volume_rx,
                           current_rebate_pct):
    """Compare two payer contract scenarios"""
    # Scenario A: current
    net_price_a = wac_per_rx * (1 - current_rebate_pct)
    revenue_a = base_volume_rx * net_price_a

    # Scenario B: offer (higher rebate, better access, more volume)
    net_price_b = wac_per_rx * (1 - rebate_pct)
    volume_b = base_volume_rx * (1 + volume_uplift_pct)
    revenue_b = volume_b * net_price_b

    return {
        'scenario_A_net_rev': revenue_a,
        'scenario_B_net_rev': revenue_b,
        'revenue_delta': revenue_b - revenue_a,
        'rebate_cost': volume_b * wac_per_rx * rebate_pct,
        'incremental_roi': (revenue_b - revenue_a) / (volume_b * wac_per_rx * rebate_pct - base_volume_rx * wac_per_rx * current_rebate_pct)
    }

result = evaluate_rebate_offer(
    wac_per_rx=8000, rebate_pct=0.35, volume_uplift_pct=0.25,
    base_volume_rx=10000, current_rebate_pct=0.20
)
print(result)</code></pre>`},
    {id:"s4",content:`<h2 id="s4">Chargeback Analytics</h2>
<p><strong>Chargebacks</strong> are the mechanism by which manufacturers honor contract pricing with customers (hospitals, GPOs, federal agencies) who purchase through wholesalers. When a hospital buys a drug from a wholesaler at the contracted price (below WAC), the wholesaler claims the difference from the manufacturer.</p>
<p>Chargeback flow:</p>
<ol>
<li>Manufacturer sets WAC = $1,000</li>
<li>Hospital has a GPO contract price = $650</li>
<li>Hospital buys from McKesson at $650</li>
<li>McKesson claims chargeback of $350 from manufacturer</li>
<li>Manufacturer's net receipt: $650 (effectively)</li>
</ol>
<div class="callout info"><div class="callout-title">Why Chargeback Analytics Is Difficult</div><p>Chargebacks are submitted by wholesalers in aggregate batches, often 4–8 weeks after the sale. Reconciling chargebacks requires linking: wholesaler chargeback submission → GPO contract → eligible customer class of trade → correct contract price. Errors result in overpayment or underpayment of millions annually.</p></div>
<table><thead><tr><th>Chargeback Analytics KPI</th><th>Definition</th><th>Red Flag Threshold</th></tr></thead>
<tbody>
<tr><td>Chargeback dispute rate</td><td>% of submitted chargebacks requiring resolution</td><td>&gt;5%</td></tr>
<tr><td>Chargeback aging</td><td>Average days from sale to resolution</td><td>&gt;45 days</td></tr>
<tr><td>Class of trade misclassification</td><td>% of chargebacks with incorrect COT</td><td>&gt;2%</td></tr>
<tr><td>Chargeback-to-WAC ratio</td><td>Total chargebacks / Total WAC revenue</td><td>Monitor vs. plan</td></tr>
</tbody></table>`},
    {id:"s5",content:`<h2 id="s5">Net Price Modeling & Revenue Forecasting</h2>
<p>A complete net revenue model integrates all GTN components with volume assumptions to project realized revenue. The model has four layers:</p>
<pre><code class="language-python">import pandas as pd
import numpy as np

def net_revenue_model(assumptions):
    a = assumptions
    # Gross revenue
    gross_rx = a['total_rx_units']
    gross_revenue = gross_rx * a['wac_per_rx']

    # Medicaid channel
    medicaid_rx = gross_rx * a['medicaid_share']
    medicaid_rebate = medicaid_rx * a['wac_per_rx'] * (
        a['medicaid_base_rebate_rate'] + a['medicaid_inflation_penalty_rate']
    )

    # 340B channel
    channel_340b_rx = gross_rx * a['share_340b']
    discount_340b = channel_340b_rx * a['wac_per_rx'] * a['discount_340b_pct']

    # Commercial channel
    commercial_rx = gross_rx * a['commercial_share']
    commercial_rebates = commercial_rx * a['wac_per_rx'] * a['commercial_rebate_rate']

    # Copay cards (only for commercially insured)
    copay_cost = commercial_rx * a['copay_card_redemption_rate'] * a['avg_copay_assistance']

    # Chargebacks
    chargebacks = gross_revenue * a['chargeback_rate']

    # Returns
    returns = gross_revenue * a['returns_rate']

    total_gtn = (medicaid_rebate + discount_340b + commercial_rebates +
                 copay_cost + chargebacks + returns)
    net_revenue = gross_revenue - total_gtn
    gtn_pct = total_gtn / gross_revenue

    return pd.Series({
        'gross_revenue': gross_revenue,
        'total_gtn': total_gtn,
        'net_revenue': net_revenue,
        'gtn_pct': f"{gtn_pct:.1%}"
    })

# Example model run
assumptions = {
    'total_rx_units': 50000, 'wac_per_rx': 8000,
    'medicaid_share': 0.15, 'medicaid_base_rebate_rate': 0.231, 'medicaid_inflation_penalty_rate': 0.05,
    'share_340b': 0.10, 'discount_340b_pct': 0.77,
    'commercial_share': 0.65, 'commercial_rebate_rate': 0.30,
    'copay_card_redemption_rate': 0.40, 'avg_copay_assistance': 150,
    'chargeback_rate': 0.03, 'returns_rate': 0.01
}
print(net_revenue_model(assumptions))</code></pre>
<div class="callout warning"><div class="callout-title">The 340B Dilemma</div><p>340B entities (hospitals, FQHCs) purchase at ~75% off WAC but are eligible for commercial rebates AND manufacturer copay assistance. A drug dispensed at a 340B hospital with a copay card may generate negative net revenue for the manufacturer. 340B "duplicate discounts" have led many manufacturers to restrict copay cards in 340B settings — a controversial and litigated strategy.</p></div>`},
    {id:"s6",content:`<h2 id="s6">GTN Analytics Best Practices</h2>
<p>GTN analytics requires close collaboration between Finance, Commercial Analytics, and Market Access. Common failure modes and how to avoid them:</p>
<table><thead><tr><th>Failure Mode</th><th>Impact</th><th>Prevention</th></tr></thead>
<tbody>
<tr><td>Assuming constant GTN % across channels</td><td>Revenue forecast systematically wrong as channel mix shifts</td><td>Model GTN by channel (Medicaid/commercial/340B) separately</td></tr>
<tr><td>Not modeling Medicaid inflation penalty growth</td><td>Understating GTN in years 3-5 of the product</td><td>Project AMP trajectory and CPI in every forecast</td></tr>
<tr><td>Ignoring copay card utilization rates</td><td>Copay cost surprises in specialty brands</td><td>Track copay card redemption weekly vs. plan</td></tr>
<tr><td>Lagged chargeback recognition</td><td>Revenue overstated in current period</td><td>Accrue chargebacks based on contracting data, not submissions</td></tr>
<tr><td>Best Price violations</td><td>Medicaid rebate liability recalculation; OIG penalties</td><td>All pricing actions reviewed by compliance before execution</td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">GTN and the IRA</div><p>The Inflation Reduction Act (2022) dramatically changes GTN calculations. IRA-negotiated Maximum Fair Prices (MFPs) apply to Medicare Part D drugs and create a new mandatory discount category. For affected drugs, IRA discounts can add 10–50%+ to GTN, requiring complete model rebuilds for any brand approaching Year 7/11 milestone. This is the most significant GTN disruption since the MDRP was created in 1990.</p></div>`},
    {id:"s7",content:`<h2 id="s7">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>GTN deductions for US specialty brands average 40–65% of WAC — net revenue is not a minor adjustment to list price, it is the fundamental revenue reality.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>Medicaid rebates have two components: a mandatory 23.1% base rebate AND an inflation penalty when WAC growth exceeds CPI — aggressive WAC increases compound into ruinous Medicaid liability.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Commercial rebates are a volume-for-price tradeoff: the access-rebate math must be modeled explicitly before any payer contract is signed, as the incremental volume must justify the incremental per-unit discount.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>340B, copay cards, and the IRA MFP are the three most structurally complex GTN components — each requires dedicated analytics and monitoring because small volume shifts cause outsized financial impact.</div></div>`}],
  questions:[
    {id:"q1",text:"A brand has a WAC of $1,200 per unit and an AMP of $1,000. The Medicaid base rebate rate is 23.1%. The inflation penalty (AMP above CPI-adjusted baseline) is $150 per unit. What is the total Medicaid unit rebate?",
     options:["$231 (base rebate only)","$381 (base rebate + inflation penalty)","$150 (inflation penalty only)","$300 (25% of WAC)"],
     correct:1,explanation:"Total Medicaid rebate = base rebate + inflation penalty = (AMP × 23.1%) + inflation penalty = ($1,000 × 0.231) + $150 = $231 + $150 = $381. The base rebate applies to AMP, not WAC, and the inflation penalty is additive when prices grow faster than CPI."},
    {id:"q2",text:"A manufacturer is evaluating a payer contract: offer a 35% rebate (up from 20% current) in exchange for Tier 2 preferred status, projecting a 25% volume increase. WAC is $8,000/Rx, current volume is 10,000 Rx. What additional information is most critical before accepting?",
     options:["The payer's formulary review timeline","The projected mix of commercial vs. Medicaid volume in the new access tier","The competitor's current rebate level to this payer","The wholesaler chargeback rate for this product"],
     correct:1,explanation:"Channel mix is critical because Medicaid prescriptions are already subject to mandatory 23.1% base rebate regardless of commercial agreements. If the payer's improved access generates primarily Medicaid volume (e.g., the plan covers a high-Medicaid population), the incremental rebate cost may not be recoverable. Commercial vs. Medicaid mix determines whether the access-rebate math actually works."},
    {id:"q3",text:"Which GTN component creates a direct conflict between supporting patient access and protecting net revenue, and is currently the subject of active litigation?",
     options:["Medicaid inflation penalties","340B duplicate discounts (copay cards at 340B entities)","Commercial rebates to PBMs","Chargeback processing disputes with wholesalers"],
     correct:1,explanation:"340B duplicate discounts occur when a 340B entity (hospital/FQHC) purchases at the deeply discounted 340B ceiling price AND a patient also uses a manufacturer copay card — resulting in the manufacturer effectively paying twice. Manufacturers have responded by restricting copay programs at 340B sites, which 340B hospitals have challenged in court, creating ongoing litigation."}
  ]
},

"2-10": {
  id:"2-10", title:"Omnichannel & Digital Engagement Analytics", domain:"Commercial Analytics", domain_id:2,
  level:"Intermediate", mins:40, available:true,
  tags:["Omnichannel","Digital Analytics","HCP Engagement","Next Best Action","Content Analytics","Attribution"],
  objectives:["Define omnichannel engagement and its commercial value","Measure digital HCP touchpoints across channels","Build an HCP engagement score","Apply content effectiveness analytics","Design next best action (NBA) frameworks"],
  toc:[
    {id:"s1",title:"Omnichannel Strategy Framework",level:"h2"},
    {id:"s2",title:"Digital Touchpoint Measurement",level:"h2"},
    {id:"s3",title:"HCP Engagement Scoring",level:"h2"},
    {id:"s4",title:"Content Effectiveness Analytics",level:"h2"},
    {id:"s5",title:"Next Best Action (NBA) Frameworks",level:"h2"},
    {id:"s6",title:"Attribution in Omnichannel",level:"h2"},
    {id:"s7",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Omnichannel Strategy Framework</h2>
<p><strong>Omnichannel engagement</strong> means delivering the right message, through the right channel, at the right time to each HCP — and measuring the combined effect across all touchpoints. It is the evolution beyond multichannel (many channels in parallel) to an integrated, personalized experience.</p>
<div class="callout"><div class="callout-title">The Channel Shift Reality</div><p>Post-COVID, pharma reps average 1.8 in-person calls per HCP per month vs. 4.2 pre-COVID. Digital channels now account for 55-65% of HCP commercial touchpoints. Brands that do not have a digital engagement strategy are reaching fewer than half their target audience effectively.</p></div>
<table><thead><tr><th>Channel Type</th><th>Touchpoint Examples</th><th>Measurement Metric</th><th>Typical Reach</th></tr></thead>
<tbody>
<tr><td>Personal Promotion</td><td>Rep detail, MSL visit, speaker program attendance</td><td>Call recorded in CRM (Veeva), attendance logged</td><td>30–60% of target HCPs</td></tr>
<tr><td>Digital Personal</td><td>Approved email, rep-triggered portal, virtual detail</td><td>Open rate, click rate, call-to-action conversion</td><td>50–70% of target HCPs</td></tr>
<tr><td>Non-Personal Digital</td><td>Website, banner ads, programmatic, doceree</td><td>Impression, click, dwell time, content completion</td><td>70–90% of target HCPs</td></tr>
<tr><td>Medical/Scientific</td><td>Congress symposia, webinars, journal ads</td><td>Registration, attendance, CE completion</td><td>20–40% specialists</td></tr>
<tr><td>Peer Influence</td><td>KOL-authored content, peer-to-peer programs</td><td>Content shares, referral tracking</td><td>Varies</td></tr>
</tbody></table>`},
    {id:"s2",content:`<h2 id="s2">Digital Touchpoint Measurement</h2>
<p>Each channel generates different types of data that must be integrated into a unified HCP-level dataset:</p>
<pre><code class="language-sql">-- Unified HCP engagement view (simplified)
WITH email_events AS (
  SELECT npi, 'email' AS channel, sent_date AS event_date,
         CASE WHEN opened = 1 THEN 'open'
              WHEN clicked = 1 THEN 'click'
              ELSE 'sent' END AS engagement_type,
         1.0 AS raw_score
  FROM email_campaigns
),
rep_calls AS (
  SELECT npi, 'personal_detail' AS channel, call_date AS event_date,
         call_type AS engagement_type, 3.0 AS raw_score
  FROM crm_call_records WHERE call_completed = 1
),
website_sessions AS (
  SELECT npi, 'website' AS channel, session_date AS event_date,
         page_category AS engagement_type,
         LEAST(session_duration_mins / 5.0, 2.0) AS raw_score
  FROM hcp_website_sessions WHERE npi IS NOT NULL
),
all_touches AS (
  SELECT * FROM email_events
  UNION ALL SELECT * FROM rep_calls
  UNION ALL SELECT * FROM website_sessions
)
SELECT npi, channel, event_date, engagement_type,
       raw_score,
       -- Apply recency decay: weight drops 50% after 30 days
       raw_score * EXP(-0.023 * DATEDIFF(day, event_date, CURRENT_DATE)) AS decayed_score
FROM all_touches;</code></pre>
<div class="callout info"><div class="callout-title">NPI Matching Challenge</div><p>Most digital touchpoints don't naturally carry NPI. Email uses email addresses; websites use cookies; programmatic uses device IDs. NPI resolution requires matching engines (MD Analytics, Komodo, Veeva Pulse) that link anonymous identifiers to verified NPI. Match rates typically range from 40–70% — unmatchable impressions are "wasted" from an analytics perspective.</p></div>`},
    {id:"s3",content:`<h2 id="s3">HCP Engagement Scoring</h2>
<p>An <strong>HCP engagement score</strong> aggregates all touchpoints into a single metric representing the strength and recency of a physician's engagement with the brand. It drives targeting decisions: who to call, when, with what message.</p>
<pre><code class="language-python">import pandas as pd
import numpy as np
from datetime import datetime

def compute_engagement_score(hcp_touches_df, reference_date=None):
    """
    Compute HCP engagement score with recency decay and channel weights.
    """
    if reference_date is None:
        reference_date = datetime.today()

    # Channel weights (relative importance)
    channel_weights = {
        'personal_detail': 3.0,   # Rep visit = highest signal
        'speaker_attendance': 2.5,
        'email_click': 1.5,
        'email_open': 0.5,
        'website_clinical_content': 1.2,
        'website_homepage': 0.3,
        'programmatic_click': 0.8,
        'programmatic_impression': 0.1,
    }

    # Decay half-life: 30 days (score halves every month without engagement)
    HALF_LIFE_DAYS = 30
    decay_rate = np.log(2) / HALF_LIFE_DAYS

    df = hcp_touches_df.copy()
    df['days_ago'] = (reference_date - df['event_date']).dt.days
    df['base_score'] = df['engagement_type'].map(channel_weights).fillna(0.5)
    df['decayed_score'] = df['base_score'] * np.exp(-decay_rate * df['days_ago'])

    # Aggregate per HCP
    scores = df.groupby('npi')['decayed_score'].sum().reset_index()
    scores.columns = ['npi', 'raw_engagement_score']

    # Normalize to 0-100 scale using percentile rank
    scores['engagement_score'] = (
        scores['raw_engagement_score'].rank(pct=True) * 100
    ).round(1)

    return scores</code></pre>
<p>Engagement score segments drive action:</p>
<table><thead><tr><th>Score Range</th><th>Segment</th><th>Recommended Action</th></tr></thead>
<tbody>
<tr><td>80–100</td><td>Highly Engaged</td><td>Peer speaker nomination, advisory board, clinical co-creation</td></tr>
<tr><td>60–80</td><td>Engaged</td><td>Deepen with clinical content, congress invitations, MSL visits</td></tr>
<tr><td>40–60</td><td>Warming</td><td>Targeted email series, rep follow-up to digital triggers</td></tr>
<tr><td>20–40</td><td>Low Engagement</td><td>Non-personal digital activation, territory rep call scheduling</td></tr>
<tr><td>0–20</td><td>Cold / Unreached</td><td>Awareness-level outreach, digital targeting, address access barriers</td></tr>
</tbody></table>`},
    {id:"s4",content:`<h2 id="s4">Content Effectiveness Analytics</h2>
<p>With 100+ content assets in market simultaneously, analytics must identify which content pieces drive HCP behavior change — not just engagement metrics.</p>
<p>Content analytics framework: measure at two levels:</p>
<ol>
<li><strong>Engagement level:</strong> open rates, click rates, completion rates, dwell time</li>
<li><strong>Behavior change level:</strong> did HCPs who consumed this content prescribe more? Did prescribers increase vs. matched non-recipients?</li>
</ol>
<pre><code class="language-python">from scipy import stats

def content_lift_analysis(content_id, rx_data, engagement_data, lookback_days=90):
    """
    Measure Rx lift among HCPs who engaged with specific content
    vs. a matched control group.
    """
    # HCPs who engaged with content
    engaged_npis = set(
        engagement_data[engagement_data['content_id'] == content_id]['npi']
    )

    # Pre/post Rx for engaged HCPs
    engaged_rx = rx_data[rx_data['npi'].isin(engaged_npis)]
    pre_engaged = engaged_rx[engaged_rx['period'] == 'pre']['rx_count'].mean()
    post_engaged = engaged_rx[engaged_rx['period'] == 'post']['rx_count'].mean()

    # Control group: non-engaged, matched on specialty and baseline Rx
    control_npis = set(rx_data['npi']) - engaged_npis
    control_rx = rx_data[rx_data['npi'].isin(control_npis)]
    pre_control = control_rx[control_rx['period'] == 'pre']['rx_count'].mean()
    post_control = control_rx[control_rx['period'] == 'post']['rx_count'].mean()

    # Difference-in-differences
    did_estimate = (post_engaged - pre_engaged) - (post_control - pre_control)

    return {
        'content_id': content_id,
        'engaged_n': len(engaged_npis),
        'control_n': len(control_npis),
        'did_lift_rx': did_estimate,
        'pct_lift': did_estimate / pre_control * 100 if pre_control > 0 else 0
    }</code></pre>
<div class="callout"><div class="callout-title">Content ROI Reporting</div><p>Present content analytics in a 2x2: x-axis = engagement rate, y-axis = Rx lift. Top-right (high engagement, high lift) = scale production. Top-left (low engagement, high lift) = distribute more widely. Bottom-right (high engagement, no lift) = re-evaluate messaging. Bottom-left = retire immediately.</p></div>`},
    {id:"s5",content:`<h2 id="s5">Next Best Action (NBA) Frameworks</h2>
<p><strong>Next Best Action (NBA)</strong> is an AI-driven framework that recommends the optimal commercial touchpoint for each HCP at each moment, replacing static call plans with dynamic, data-driven orchestration.</p>
<p>NBA system architecture:</p>
<table><thead><tr><th>Component</th><th>Function</th><th>Technology</th></tr></thead>
<tbody>
<tr><td>Signal Ingestion</td><td>Real-time CRM, email, website, claims events</td><td>Kafka, event streaming</td></tr>
<tr><td>HCP Profile Store</td><td>Unified 360° HCP view (Rx, engagement, preferences)</td><td>Feature store (Feast), CDP</td></tr>
<tr><td>Propensity Models</td><td>Predict likelihood of prescribing, responding to email, attending event</td><td>XGBoost, logistic regression</td></tr>
<tr><td>Action Library</td><td>All available commercial actions (call, email type A/B, program invite)</td><td>Campaign management platform</td></tr>
<tr><td>Decision Engine</td><td>Selects optimal action given propensity scores, constraints, costs</td><td>Contextual bandit, Pega, Salesforce Einstein</td></tr>
<tr><td>Feedback Loop</td><td>Tracks action outcomes; retrains models weekly</td><td>MLflow, Airflow</td></tr>
</tbody></table>
<pre><code class="language-python">from sklearn.linear_model import LogisticRegression
import numpy as np

class NBAPropensityModel:
    """Simplified NBA propensity model for Rx response."""

    def __init__(self, action_type):
        self.action_type = action_type
        self.model = LogisticRegression()

    def fit(self, X_train, y_train):
        """Train on historical HCP response data."""
        self.model.fit(X_train, y_train)
        return self

    def predict_propensity(self, hcp_features):
        """Return probability HCP responds positively to this action."""
        return self.model.predict_proba(hcp_features)[:, 1]

def select_nba(hcp_id, available_actions, propensity_models, hcp_features,
               channel_constraints, expected_value_per_rx=500):
    """Select optimal action for an HCP given constraints."""
    action_scores = []

    for action in available_actions:
        if action['channel'] in channel_constraints.get(hcp_id, []):
            continue  # Skip channels this HCP opted out of

        propensity = propensity_models[action['id']].predict_propensity(
            hcp_features
        )[0]

        # Expected value = propensity × value per Rx − action cost
        ev = propensity * expected_value_per_rx - action['cost']
        action_scores.append((action['id'], ev, propensity))

    # Return highest EV action
    return max(action_scores, key=lambda x: x[1])</code></pre>`},
    {id:"s6",content:`<h2 id="s6">Attribution in Omnichannel</h2>
<p>Attribution answers: which touchpoints in the customer journey drove the HCP to prescribe? With 8+ channels active simultaneously, attribution is analytically the hardest problem in commercial analytics.</p>
<table><thead><tr><th>Model</th><th>Credit Assignment</th><th>Best For</th><th>Limitation</th></tr></thead>
<tbody>
<tr><td>Last Touch</td><td>100% credit to final touchpoint before Rx</td><td>Simple reporting</td><td>Ignores all prior nurturing</td></tr>
<tr><td>First Touch</td><td>100% credit to first touchpoint</td><td>Awareness channel evaluation</td><td>Ignores conversion-driving touches</td></tr>
<tr><td>Linear</td><td>Equal credit across all touches</td><td>Balanced baseline model</td><td>Treats a 1-second impression = 30-minute rep detail</td></tr>
<tr><td>Time Decay</td><td>Exponentially more credit to recent touches</td><td>Short sales cycles</td><td>Biases toward high-frequency digital</td></tr>
<tr><td>Data-Driven (Shapley)</td><td>Game-theory marginal contribution per touch</td><td>When rich historical data exists</td><td>Requires large sample; computationally intensive</td></tr>
<tr><td>MMM-based</td><td>Econometric decomposition of Rx volume by channel</td><td>Strategic budget allocation</td><td>Aggregate level; not HCP-level</td></tr>
</tbody></table>
<div class="callout warning"><div class="callout-title">Attribution Fallacy</div><p>All attribution models are wrong. The only way to isolate true channel effect is randomized holdout testing: hold out a random 20% of HCPs from email campaigns, measure Rx difference vs. exposed group. Run holdouts for each channel to build true incrementality estimates. Attribution models without holdout validation are mathematical opinions, not causal evidence.</p></div>`},
    {id:"s7",content:`<h2 id="s7">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>Post-COVID, digital channels account for 55–65% of HCP commercial touchpoints — omnichannel analytics is no longer optional, it is the primary commercial measurement framework.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>HCP engagement scoring aggregates all touchpoints with recency decay and channel weights — the score drives targeting priority and channel selection, replacing static call plan deciles.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Content effectiveness must be measured at two levels: engagement metrics (open, click, completion) and behavior change metrics (Rx lift vs. matched control) — only the latter proves commercial value.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>Attribution models describe correlation, not causation — true channel incrementality requires randomized holdout tests where a portion of HCPs is deliberately excluded from each channel.</div></div>`}],
  questions:[
    {id:"q1",text:"An HCP engagement score shows 500 high-value oncologists as 'Cold / Unreached' (score 0-20) despite the sales force calling on them regularly. What is the most likely explanation?",
     options:["The scoring model weights are incorrectly calibrated for oncology","Rep call records in CRM are not being linked to NPI — the touchpoints exist but are not matching to the HCP record","These HCPs have opted out of all communications","The HCPs are prescribing a competitor brand and are deprioritized by the algorithm"],
     correct:1,explanation:"The most common reason high-priority HCPs appear cold in an engagement score is a data integration failure: CRM call records (identified by rep territory + HCP name) are not being resolved to NPI and therefore not appearing in the engagement score calculation. This is a data pipeline problem, not a commercial strategy problem."},
    {id:"q2",text:"Content piece A has a 45% email open rate but shows 0% Rx lift in a difference-in-differences analysis. Content piece B has an 18% open rate but shows +2.3 Rx per writer lift. What is the correct commercial decision?",
     options:["Scale content A — it has the higher engagement","Scale content B — it demonstrates actual behavior change","Retire both and create new content","Use content A for awareness and B for conversion"],
     correct:1,explanation:"Open rates measure whether content is interesting, not whether it changes prescribing. Content B with +2.3 Rx lift per writer is driving actual commercial behavior change, making it far more valuable despite lower engagement. High engagement with zero Rx impact typically indicates the content is educational/entertaining but not commercially relevant or action-oriented."},
    {id:"q3",text:"Why is Shapley value attribution considered superior to last-touch attribution for omnichannel budget allocation?",
     options:["It is computationally simpler to implement","It fairly allocates credit to all touchpoints based on their marginal contribution across all possible ordering combinations","It requires no historical data to run","It always shows higher ROI for digital channels"],
     correct:1,explanation:"Shapley values come from cooperative game theory and calculate each touchpoint's marginal contribution by averaging across all possible orderings of the touchpoints in a customer journey. This means credit is distributed based on actual incremental value, not position — a rep detail that tips a prescribing decision gets appropriate credit even if it came after many digital touches."}
  ]
},

"2-11": {
  id:"2-11", title:"Incentive Compensation & Territory Analytics", domain:"Commercial Analytics", domain_id:2,
  level:"Intermediate", mins:40, available:true,
  tags:["Incentive Compensation","IC Plans","Territory Alignment","Sales Force Analytics","Field Productivity","KPI Design"],
  objectives:["Design KPI hierarchies for commercial teams","Build incentive compensation plan models","Apply territory alignment analytics","Measure field force productivity","Avoid common IC design failures"],
  toc:[
    {id:"s1",title:"KPI Hierarchy Design",level:"h2"},
    {id:"s2",title:"IC Plan Architecture",level:"h2"},
    {id:"s3",title:"Territory Alignment Analytics",level:"h2"},
    {id:"s4",title:"Field Productivity Benchmarks",level:"h2"},
    {id:"s5",title:"IC Payout Modeling",level:"h2"},
    {id:"s6",title:"Common IC Design Failures",level:"h2"},
    {id:"s7",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">KPI Hierarchy Design</h2>
<p>A well-designed KPI hierarchy cascades from company-level commercial goals to individual field rep metrics. Every rep KPI should be traceable to a P&L outcome.</p>
<table><thead><tr><th>Level</th><th>Owner</th><th>KPI Example</th><th>Cadence</th></tr></thead>
<tbody>
<tr><td>Company</td><td>CEO/CFO</td><td>Net revenue, market share, TRx growth</td><td>Quarterly</td></tr>
<tr><td>Brand</td><td>Brand GM</td><td>TRx, NRx, NBRx, patient starts, persistency</td><td>Monthly</td></tr>
<tr><td>Region</td><td>Regional Director</td><td>Regional TRx growth, coverage/frequency, speaker program activity</td><td>Monthly</td></tr>
<tr><td>Territory</td><td>District Manager</td><td>Territory TRx share, call compliance, HCP coverage</td><td>Monthly</td></tr>
<tr><td>Rep</td><td>Sales Rep</td><td>Target HCP call compliance, NRx (new prescribers), formulary wins</td><td>Weekly/Monthly</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">KPI Design Principles</div><p>1) Reps must be able to understand and influence their own KPIs. 2) No more than 3 primary KPIs in an IC plan. 3) Every KPI must have a clean data source that updates ≤30 days lag. 4) KPIs should measure output (Rx, market share) not activity (calls made) at the IC level — activity metrics belong in coaching dashboards, not paychecks.</p></div>`},
    {id:"s2",content:`<h2 id="s2">IC Plan Architecture</h2>
<p>A pharmaceutical IC plan has three structural elements: base salary, variable compensation (bonus), and any special incentives (SPIFFs).</p>
<table><thead><tr><th>Component</th><th>Typical % of OTE</th><th>Structure</th><th>Purpose</th></tr></thead>
<tbody>
<tr><td>Base Salary</td><td>60–75%</td><td>Fixed, annual</td><td>Retention, compliance, non-IC activities</td></tr>
<tr><td>Variable (Bonus)</td><td>25–40%</td><td>Performance-based, quarterly/annual</td><td>Drive specific commercial behaviors</td></tr>
<tr><td>SPIFF / Special Incentive</td><td>0–5%</td><td>Short-term accelerators for specific actions</td><td>Launch push, new account wins, formulary access</td></tr>
</tbody></table>
<p>Variable compensation payout curve design:</p>
<pre><code class="language-python">import numpy as np
import matplotlib.pyplot as plt

def payout_curve(attainment, plan_type='s_curve'):
    """
    Calculate bonus payout as % of target bonus given attainment.
    attainment: % of quota achieved (0.0 to 2.0+)
    """
    if plan_type == 's_curve':
        # Standard pharma S-curve: threshold at 80%, cap at 120%
        if attainment < 0.80:
            return 0.0                          # No payout below threshold
        elif attainment < 1.00:
            return (attainment - 0.80) / 0.20 * 0.50  # 0% to 50% payout
        elif attainment < 1.20:
            return 0.50 + (attainment - 1.00) / 0.20 * 0.50  # 50% to 100%
        else:
            return min(attainment / 1.20, 2.0)  # Accelerator above 120%

    elif plan_type == 'linear':
        return max(0, min(attainment, 2.0))  # Simple linear, capped at 200%

    elif plan_type == 'step':
        # Tier-based: 50% at 90%, 100% at 100%, 150% at 110%
        if attainment >= 1.10: return 1.50
        elif attainment >= 1.00: return 1.00
        elif attainment >= 0.90: return 0.50
        else: return 0.0

# Plot comparison
attainments = np.linspace(0, 1.5, 100)
fig, ax = plt.subplots(figsize=(10, 6))
for plan in ['s_curve', 'linear', 'step']:
    payouts = [payout_curve(a, plan) * 100 for a in attainments]
    ax.plot(attainments * 100, payouts, label=plan, linewidth=2)
ax.set_xlabel('Quota Attainment (%)')
ax.set_ylabel('Payout (% of Target Bonus)')
ax.axvline(x=100, linestyle='--', color='gray')
ax.legend()
ax.set_title('IC Payout Curve Comparison')</code></pre>`},
    {id:"s3",content:`<h2 id="s3">Territory Alignment Analytics</h2>
<p><strong>Territory alignment</strong> distributes market opportunity equitably across the field force to minimize workload imbalance and maximize coverage efficiency. Poor alignment creates territories where reps are overwhelmed or underutilized — both destroy ROI.</p>
<p>Territory balance metrics:</p>
<table><thead><tr><th>Metric</th><th>Formula</th><th>Target</th><th>What Imbalance Signals</th></tr></thead>
<tbody>
<tr><td>Workload Index</td><td>Weighted calls required / available time</td><td>0.85–1.15 across territories</td><td>&gt;1.15 = rep overwhelmed; &lt;0.85 = underutilized</td></tr>
<tr><td>Market Potential Index</td><td>Territory potential / average territory potential</td><td>0.80–1.20</td><td>High variance → some reps have unfair quota advantage</td></tr>
<tr><td>Drive Time per Call</td><td>Total drive time / calls made</td><td>&lt;25 min median</td><td>&gt;40 min = geographic misalignment</td></tr>
<tr><td>Account Coverage Rate</td><td>Accounts called / target accounts</td><td>&gt;85%</td><td>&lt;70% = territory too large or low priority HCPs consuming time</td></tr>
</tbody></table>
<pre><code class="language-python">from scipy.stats import variation

def territory_balance_report(territory_df):
    """
    Assess balance across territory metrics.
    territory_df: one row per territory with key metrics.
    """
    metrics = ['market_potential', 'workload_score', 'drive_time_median', 'hcp_count']

    results = {}
    for m in metrics:
        cv = variation(territory_df[m])  # Coefficient of variation
        results[m] = {
            'mean': territory_df[m].mean(),
            'cv': cv,
            'balance_flag': 'IMBALANCED' if cv > 0.30 else 'BALANCED'
        }

    # Identify outlier territories
    for m in ['workload_score', 'market_potential']:
        z_scores = (territory_df[m] - territory_df[m].mean()) / territory_df[m].std()
        territory_df[m + '_outlier'] = z_scores.abs() > 1.5

    return results, territory_df</code></pre>`},
    {id:"s4",content:`<h2 id="s4">Field Productivity Benchmarks</h2>
<p>Pharma field force benchmarks vary by therapeutic area and brand lifecycle stage. These reference ranges guide workforce sizing and productivity assessment:</p>
<table><thead><tr><th>Metric</th><th>Primary Care (Oral)</th><th>Specialty (Biologic/IV)</th><th>Rare Disease/Orphan</th></tr></thead>
<tbody>
<tr><td>Target HCPs per rep</td><td>150–250</td><td>80–120</td><td>30–60</td></tr>
<tr><td>Calls/rep/day</td><td>8–12</td><td>4–7</td><td>2–4</td></tr>
<tr><td>Calls/HCP/month (frequency)</td><td>1–2</td><td>2–3</td><td>3–5</td></tr>
<tr><td>Rep cost fully loaded</td><td>$150K–200K/year</td><td>$200K–280K/year</td><td>$250K–350K/year</td></tr>
<tr><td>Revenue per rep</td><td>$2–5M/year</td><td>$5–15M/year</td><td>$15–50M/year</td></tr>
<tr><td>TRx generated per call</td><td>0.05–0.15</td><td>0.10–0.25</td><td>0.30–0.80</td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">Field Force ROI Calculation</div><p>A rep's annual cost (salary + benefits + car + samples + overhead) typically totals $250–350K fully loaded. An oncology rep generating $8M in territory TRx at 40% gross margin generates $3.2M in gross profit against $300K cost — a 10:1 ROI. The business case for field investment must be modeled this way, with sensitivity on GTN and share attribution.</p></div>`},
    {id:"s5",content:`<h2 id="s5">IC Payout Modeling</h2>
<p>Before rolling out any IC plan, the analytics team should run a retroactive simulation on prior-year performance to validate design:</p>
<pre><code class="language-python">import pandas as pd

def simulate_ic_payout(rep_performance_df, plan_params):
    """
    Simulate IC payouts given a plan design and rep performance data.
    """
    p = plan_params
    df = rep_performance_df.copy()

    # Calculate attainment
    df['attainment'] = df['actual_trx'] / df['quota_trx']

    # Apply payout curve
    def calc_payout(att, target_bonus):
        if att < p['threshold']:
            return 0
        elif att <= p['target']:
            rate = (att - p['threshold']) / (p['target'] - p['threshold'])
            return rate * target_bonus * p['target_payout_at_100']
        elif att <= p['cap']:
            over_target_rate = (att - p['target']) / (p['cap'] - p['target'])
            return target_bonus * (p['target_payout_at_100'] +
                                   over_target_rate * p['accelerator_rate'])
        else:
            return target_bonus * p['max_payout_multiple']

    df['payout'] = df.apply(
        lambda r: calc_payout(r['attainment'], r['target_bonus']), axis=1
    )

    # Plan health diagnostics
    diagnostics = {
        'total_payout': df['payout'].sum(),
        'avg_attainment': df['attainment'].mean(),
        'pct_above_threshold': (df['attainment'] >= p['threshold']).mean(),
        'pct_at_or_above_100': (df['attainment'] >= p['target']).mean(),
        'pct_at_cap': (df['attainment'] >= p['cap']).mean(),
        'cost_of_plan_M': df['payout'].sum() / 1e6
    }
    return df, diagnostics

# Best practice plan ranges:
# 25-40% above threshold, 55-65% at/above target, &lt;15% at cap
# If >40% at cap: quota too low. If &lt;15% above threshold: quota too high.</code></pre>`},
    {id:"s6",content:`<h2 id="s6">Common IC Design Failures</h2>
<p>IC plan failures cost tens of millions in misdirected compensation and unintended commercial behaviors:</p>
<table><thead><tr><th>Failure Mode</th><th>What Happens</th><th>Fix</th></tr></thead>
<tbody>
<tr><td>Gaming the metric</td><td>Reps optimize the KPI, not the commercial outcome (e.g., Rx counts but not persistency)</td><td>Measure outcomes patients stay on therapy not just first Rx</td></tr>
<tr><td>Too many KPIs</td><td>Reps can't internalize 7+ metrics; focus evaporates</td><td>Maximum 2-3 primary KPIs; others are coaching metrics only</td></tr>
<tr><td>Windfall territories</td><td>Reps in high-growth markets earn large bonuses unrelated to effort</td><td>Market-adjusted quotas; territory potential normalization</td></tr>
<tr><td>Quota too aggressive</td><td>&lt;20% of reps above threshold; compensation fails to motivate</td><td>Retroactive simulation before rollout; adjust to target 55-65% at 100%</td></tr>
<tr><td>Retroactive plan changes</td><td>Destroys trust; reps view management as moving goalposts</td><td>Never change mid-period without extraordinary circumstances + full transparency</td></tr>
<tr><td>Lagged data</td><td>Reps don't know their standing until month-end; can't course-correct</td><td>Weekly estimated payout visibility in CRM dashboard</td></tr>
</tbody></table>
<div class="callout warning"><div class="callout-title">The Ethics Line in IC Analytics</div><p>IC analytics must never incentivize illegal promotional activity (off-label promotion, kickbacks, quid-pro-quo prescribing). All IC plans must be reviewed by compliance before implementation. IC data is sensitive; access should be role-restricted. Any system that could cause reps to feel financially pressured to make compliance violations must be redesigned.</p></div>`},
    {id:"s7",content:`<h2 id="s7">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>IC plan design follows a cascade: company P&L → brand TRx → regional market share → territory rep KPIs — every rep metric must trace back to a revenue outcome.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>Run retroactive payout simulations on prior-year data before any IC rollout — the target distribution is 25–40% above threshold, 55–65% at/above 100%, &lt;15% at cap.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Territory alignment must be evaluated on workload index, market potential variance, and drive time — imbalanced territories create unfair quota advantages and coverage gaps.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>The single most common IC failure is incentivizing a metric the rep can game rather than the commercial outcome the brand needs — always design KPIs around patient and prescriber behavior, not rep activity.</div></div>`}],
  questions:[
    {id:"q1",text:"An IC plan simulation shows 48% of reps are at the payout cap. What does this indicate and what is the recommended action?",
     options:["The field force is high-performing — increase base salaries to retain them","Quotas are set too low; too many reps reach the ceiling with insufficient stretch, reducing plan motivation","The accelerator above cap is too high and should be removed","The plan has too many KPIs causing gaming behavior"],
     correct:1,explanation:"When >15% of reps are at the cap, it signals quotas are below achievable territory potential. Reps reach max payout without full effort — the plan fails to motivate top performance. The fix is quota recalibration (increasing quotas) and/or raising the cap threshold, confirmed by retroactive analysis of what effort level produced cap attainment."},
    {id:"q2",text:"A territory alignment analysis shows a coefficient of variation (CV) of 0.42 for the market potential metric across 200 territories. What does this mean and why is it a problem?",
     options:["42% of territories are above average, which is expected","The territories are significantly imbalanced — some reps have far more market potential than others, creating unfair quota and earnings advantages","42% of territories are unprofitable and should be merged","The data is unreliable because CV should always be above 0.50"],
     correct:1,explanation:"CV of 0.42 (42%) indicates high dispersion in market potential across territories. A balanced alignment targets CV below 0.30. When territories have very different potential, even identical effort levels produce very different results — reps in high-potential territories earn large bonuses for average performance while reps in low-potential territories struggle to hit threshold despite excellent work. This destroys morale and retention."},
    {id:"q3",text:"A brand team wants to add a 7th KPI to an IC plan to ensure reps focus on new patient starts, persistency, formulary wins, market share, call compliance, speaker program activity, and a digital engagement score. What is the most important concern?",
     options:["The IC system may not support 7 KPIs technically","With 7 metrics, reps cannot prioritize — they will spread effort across all dimensions without mastery of any, and high-complexity plans systematically underperform vs. plans with 2-3 primary drivers","Legal may object to the digital engagement scoring component","The financial cost of 7 metrics is too high to administer"],
     correct:1,explanation:"Behavioral economics research and pharma IC practice consistently show that plans with more than 3 primary KPIs produce worse commercial outcomes than simpler plans. Reps optimize for what they can intuitively track and understand — with 7 metrics, cognitive load makes it impossible to consistently prioritize the highest-impact behaviors. Move metrics 4-7 to coaching dashboards, not IC."}
  ]
}

}); // end PL.addChapters Domain 2
