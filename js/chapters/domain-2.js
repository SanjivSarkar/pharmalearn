/* Domain 2: Commercial Analytics */
PL.addChapters({

"2-1": {
  id:"2-1", title:"Patient Journey Analytics", domain:"Commercial Analytics", domain_id:2,
  level:"Intermediate", mins:60, available:true,
  tags:["Patient Journey","Claims Analytics","Adherence","PDC","Funnel Analysis","Treatment Gaps"],
  objectives:["Map the end-to-end patient journey from awareness through outcomes","Identify and integrate key data sources for journey analytics","Build patient funnels and calculate conversion rates at each stage","Calculate adherence metrics including PDC, MPR, and persistence","Perform patient segmentation by disease severity and treatment history","Apply journey analytics to oncology, rare disease, and chronic conditions"],
  toc:[
    {id:"s1",title:"End-to-End Patient Journey Mapping",level:"h2"},
    {id:"s2",title:"Data Sources for Journey Analytics",level:"h2"},
    {id:"s3",title:"Funnel Analytics & Conversion Rates",level:"h2"},
    {id:"s4",title:"Time-to-Treatment & Treatment Gap Analysis",level:"h2"},
    {id:"s5",title:"Adherence Metrics: PDC, MPR & Persistence",level:"h2"},
    {id:"s6",title:"Patient Segmentation Strategies",level:"h2"},
    {id:"s7",title:"Real-World Use Cases",level:"h2"},
    {id:"s8",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">End-to-End Patient Journey Mapping</h2>
<p>The <strong>patient journey</strong> describes the complete sequence of healthcare interactions a patient experiences from the earliest awareness of symptoms through diagnosis, treatment initiation, ongoing adherence, and long-term outcomes. For commercial analytics teams, mapping this journey is the single most actionable exercise because it answers the critical question: <em>Where are patients falling out of care, and what can we do about it?</em></p>
<p>The canonical patient journey has seven stages, each representing a decision point where patients can advance or exit:</p>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Stage</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Definition</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Key Metric</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Data Signal</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Awareness</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Patient recognizes symptoms or risk</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Symptom-to-HCP visit lag</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Initial E&M codes, symptom ICD-10</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Diagnosis</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Confirmed clinical diagnosis</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Incidence rate, time-to-diagnosis</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Primary ICD-10 dx codes</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Treatment Decision</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Regimen selection and access</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Time-to-treatment (days)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Prior auth, step therapy</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Treatment Initiation</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">First prescription dispensed</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Treatment rate (% of diagnosed)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">NDC/J-code on first claim</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">On Therapy</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Active treatment with refills</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">PDC, persistence at 6/12 mo</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Refill continuity</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Switching/Discontinuation</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Regimen change or therapy stop</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Discontinuation rate, switch rate</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">New NDC, gap >60 days</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Outcomes</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Clinical and humanistic results</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Progression, hospitalization, mortality</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Inpatient claims, death records</td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">Commercial Value</div><p>A 1% improvement in funnel conversion from diagnosis to treated patients can represent $50-200M in annual revenue for a blockbuster brand. Journey analytics is the most actionable commercial intelligence available to brand teams.</p></div>`},
    {id:"s2",content:`<h2 id="s2">Data Sources for Journey Analytics</h2>
<p>No single data source captures the full patient journey. Best-in-class commercial analytics teams integrate multiple sources to build a 360-degree patient view:</p>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Source</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Examples</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Strengths</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Limitations</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Medical Claims</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Komodo Health, IQVIA LAAD+, Optum, MarketScan</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">90%+ US coverage; longitudinal; procedure-level</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">3-6 month lag; no uninsured</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Pharmacy Claims</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">IQVIA, Symphony Health</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">NDC-level drug detail; near-real-time</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Misses buy-and-bill specialty</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Specialty Pharmacy</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Hub services data, SP dispensing</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Captures biologics, adherence programs</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Brand-specific; limited competitive view</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">EHR Data</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Flatiron Health, Veeva, Tempus</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Clinical depth: staging, labs, notes</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Selection bias toward academic centers</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Patient Registries</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">SEER, NCCN, disease-specific</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Curated, high clinical fidelity</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Small N, slow to update</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Hub Data</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Manufacturer patient services</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Enrollment, PA status, copay card</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Only your brand; no competitor data</td></tr>
</tbody></table>
<div class="callout callout-tip"><div class="callout-title">Data Linkage Strategy</div><p>The gold standard approach links claims data (for breadth and longitudinal tracking) with EHR data (for clinical depth) and specialty pharmacy data (for adherence detail). Tokenized patient IDs or deterministic/probabilistic matching enables cross-source linkage while maintaining HIPAA compliance.</p></div>`},
    {id:"s3",content:`<h2 id="s3">Funnel Analytics & Conversion Rates</h2>
<p>A <strong>patient funnel</strong> quantifies how many patients progress through each journey stage and where they drop out. This is the most important deliverable in patient journey analytics because it directly identifies revenue opportunities.</p>
<h3>Building the Funnel with Claims Data</h3>
<pre><code class="language-sql">-- Patient funnel: diagnosed -> tested -> treated -> on-brand
WITH diagnosed AS (
  SELECT DISTINCT patient_id,
         MIN(claim_date) AS first_dx_date
  FROM medical_claims
  WHERE icd10_code IN ('C50.911','C50.912','C50.919')
    AND claim_date BETWEEN '2023-01-01' AND '2024-12-31'
  GROUP BY patient_id
  HAVING COUNT(DISTINCT claim_date) >= 2  -- require 2+ dx claims
),
biomarker_tested AS (
  SELECT DISTINCT d.patient_id
  FROM diagnosed d
  JOIN medical_claims m ON d.patient_id = m.patient_id
  WHERE m.cpt_code IN ('81162','81211','81213')
    AND m.claim_date >= d.first_dx_date
),
treated AS (
  SELECT DISTINCT d.patient_id
  FROM diagnosed d
  JOIN pharmacy_claims p ON d.patient_id = p.patient_id
  WHERE p.therapeutic_class = 'CDK4/6 inhibitor'
    AND p.fill_date >= d.first_dx_date
),
on_brand AS (
  SELECT DISTINCT t.patient_id
  FROM treated t
  JOIN pharmacy_claims p ON t.patient_id = p.patient_id
  WHERE p.brand_name = 'IBRANCE'
)
SELECT
  COUNT(DISTINCT d.patient_id)   AS diagnosed_n,
  COUNT(DISTINCT b.patient_id)   AS tested_n,
  COUNT(DISTINCT t.patient_id)   AS treated_n,
  COUNT(DISTINCT o.patient_id)   AS on_brand_n,
  ROUND(100.0 * COUNT(DISTINCT b.patient_id) /
        NULLIF(COUNT(DISTINCT d.patient_id),0), 1) AS test_rate_pct,
  ROUND(100.0 * COUNT(DISTINCT t.patient_id) /
        NULLIF(COUNT(DISTINCT d.patient_id),0), 1) AS treat_rate_pct,
  ROUND(100.0 * COUNT(DISTINCT o.patient_id) /
        NULLIF(COUNT(DISTINCT t.patient_id),0), 1) AS brand_share_pct
FROM diagnosed d
LEFT JOIN biomarker_tested b ON d.patient_id = b.patient_id
LEFT JOIN treated t ON d.patient_id = t.patient_id
LEFT JOIN on_brand o ON d.patient_id = o.patient_id;</code></pre>
<p>Typical funnel leakage points and commercial actions:</p>
<ul>
<li><strong>Diagnosed but not tested:</strong> Invest in biomarker education programs and testing partnerships</li>
<li><strong>Tested but not treated:</strong> Investigate access barriers (prior auth denials, cost), improve hub services</li>
<li><strong>Treated but not on-brand:</strong> Competitive messaging, formulary positioning, patient starter programs</li>
<li><strong>On-brand but discontinued:</strong> Adherence programs, nurse educator outreach, copay assistance</li>
</ul>`},
    {id:"s4",content:`<h2 id="s4">Time-to-Treatment & Treatment Gap Analysis</h2>
<p><strong>Time-to-treatment (TTT)</strong> measures the interval between diagnosis and first therapy administration. Extended TTT correlates with worse outcomes and represents a commercial opportunity — every day a patient waits is a day of lost therapy and potentially lost revenue.</p>
<h3>Calculating Time-to-Treatment</h3>
<pre><code class="language-sql">SELECT
  patient_id,
  first_dx_date,
  first_rx_date,
  DATEDIFF(day, first_dx_date, first_rx_date) AS time_to_treat_days,
  CASE
    WHEN DATEDIFF(day, first_dx_date, first_rx_date) <= 14 THEN 'Rapid (<2 wks)'
    WHEN DATEDIFF(day, first_dx_date, first_rx_date) <= 30 THEN 'Standard (2-4 wks)'
    WHEN DATEDIFF(day, first_dx_date, first_rx_date) <= 90 THEN 'Delayed (1-3 mo)'
    ELSE 'Significantly Delayed (>3 mo)'
  END AS ttt_category
FROM patient_journey_summary;</code></pre>
<h3>Treatment Gap Identification</h3>
<p>Treatment gaps occur when patients have periods without active therapy that are not clinically intended. Identifying gaps requires analyzing the interval between the end of one prescription's days supply and the next fill date:</p>
<ul>
<li><strong>Gap threshold:</strong> Typically 1.5x the expected refill interval (e.g., 45 days for a 30-day supply)</li>
<li><strong>Root causes:</strong> Access barriers (PA delays, formulary restrictions), affordability, side effects, forgetfulness</li>
<li><strong>Commercial action:</strong> Real-time gap alerts through hub services can trigger nurse outreach within 48 hours of a missed refill</li>
</ul>
<div class="callout"><div class="callout-title">Industry Benchmarks</div><p>Median time-to-treatment varies significantly by therapy area: oncology 14-21 days, rheumatology 60-90 days, rare disease 90-180+ days. Understanding these benchmarks helps set realistic improvement targets.</p></div>`},
    {id:"s5",content:`<h2 id="s5">Adherence Metrics: PDC, MPR & Persistence</h2>
<p>Adherence analytics measures whether patients take their medications as prescribed. Three complementary metrics form the adherence measurement framework:</p>
<h3>Proportion of Days Covered (PDC)</h3>
<p>PDC is the gold standard adherence metric endorsed by CMS and PQA. Unlike MPR, PDC caps coverage at 1.0 per day, preventing overcounting from early refills.</p>
<p><strong>Formula:</strong> PDC = (Number of days in period covered by medication) / (Number of days in measurement period)</p>
<p>A patient is considered <strong>adherent</strong> if PDC >= 0.80.</p>
<pre><code class="language-python">import numpy as np
import pandas as pd

def calculate_pdc(fills_df, obs_start, obs_end):
    """
    Calculate PDC for each patient.
    fills_df: DataFrame with [patient_id, fill_date, days_supply]
    """
    obs_days = (obs_end - obs_start).days
    coverage = np.zeros(obs_days)

    for _, row in fills_df.iterrows():
        start = max(0, (row['fill_date'] - obs_start).days)
        end = min(obs_days, start + row['days_supply'])
        coverage[start:end] = 1  # cap at 1 per day

    return coverage.sum() / obs_days</code></pre>
<h3>Medication Possession Ratio (MPR)</h3>
<p>MPR = (Total days supply dispensed) / (Observation period). MPR can exceed 1.0 due to early refills, making PDC generally preferred. MPR is still used in some legacy reports.</p>
<h3>Persistence</h3>
<p>Persistence measures how long a patient remains on therapy before discontinuation. It is typically reported as Kaplan-Meier survival curves at 6-month and 12-month intervals. A <strong>permissible gap</strong> of 30-60 days is standard before declaring discontinuation.</p>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Metric</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Formula</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Threshold</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Best Use</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">PDC</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Covered days / Period days</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">>=0.80</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">CMS quality measures, chronic therapies</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">MPR</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Total supply / Period days</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">>=0.80</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Legacy reporting, simple estimation</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Persistence</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Time to discontinuation</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Median months</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Duration of therapy, KM curves</td></tr>
</tbody></table>`},
    {id:"s6",content:`<h2 id="s6">Patient Segmentation Strategies</h2>
<p>Not all patients behave the same way through the journey. Segmentation enables targeted interventions by grouping patients based on shared characteristics that predict behavior.</p>
<h3>Common Segmentation Dimensions</h3>
<ul>
<li><strong>Disease severity:</strong> Early-stage vs. advanced/metastatic; biomarker-positive vs. negative; comorbidity burden (Charlson Comorbidity Index)</li>
<li><strong>Treatment history:</strong> Treatment-naive vs. previously treated; number of prior lines of therapy; prior drug classes used</li>
<li><strong>Demographics:</strong> Age brackets, geographic region, urban vs. rural, insurance type (commercial, Medicare, Medicaid)</li>
<li><strong>Behavioral:</strong> Adherent vs. non-adherent; brand loyal vs. switchers; engaged vs. disengaged with support programs</li>
<li><strong>Payer/access:</strong> Formulary tier, prior auth required, copay level, specialty pharmacy enrollment</li>
</ul>
<h3>Segmentation Framework for Commercial Action</h3>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Segment</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Profile</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Commercial Action</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">High-value adherent</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">PDC>0.90, specialty drug, commercial insurance</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Retention programs, satisfaction surveys</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">At-risk non-adherent</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">PDC 0.50-0.80, gaps increasing</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Nurse outreach, copay support, refill reminders</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Access-blocked</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">PA denied, step therapy required</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Appeals support, bridge supply, payer engagement</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Switchers</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Changed brand within 6 months</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Win-back programs, competitive positioning</td></tr>
</tbody></table>`},
    {id:"s7",content:`<h2 id="s7">Real-World Use Cases</h2>
<h3>Oncology: Non-Small Cell Lung Cancer (NSCLC)</h3>
<p>In NSCLC, biomarker testing is the critical funnel gate. Only ~60% of metastatic NSCLC patients receive comprehensive genomic profiling despite NCCN guidelines recommending it. Brands like Tagrisso (osimertinib) invest heavily in biomarker education because untested patients cannot access targeted therapy. The journey analytics insight: closing the testing gap from 60% to 80% could expand the addressable market by 33%.</p>
<h3>Rare Disease: Spinal Muscular Atrophy (SMA)</h3>
<p>In rare disease, the diagnostic odyssey is the primary bottleneck. SMA patients historically waited 3-5 years from symptom onset to diagnosis. Newborn screening programs have compressed this dramatically, but identifying adolescent/adult-onset patients remains challenging. Journey analytics focuses on referral patterns from PCPs to neurologists and time-to-diagnosis metrics.</p>
<h3>Chronic Conditions: Type 2 Diabetes</h3>
<p>For chronic therapies like GLP-1 agonists, the journey challenge shifts from diagnosis to adherence. With 12-month persistence rates often below 50% for injectable therapies, journey analytics focuses on the first 90 days (the highest-risk period for discontinuation) and identifies modifiable factors: injection anxiety, GI side effects, cost burden.</p>
<div class="callout callout-tip"><div class="callout-title">Therapy Area Differences</div><p>The key leakage point varies by therapy area: in oncology it is testing/identification, in rare disease it is diagnosis, and in chronic conditions it is adherence. Always calibrate your journey analytics focus to the specific therapeutic area.</p></div>`},
    {id:"s8",content:`<h2 id="s8">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div><strong>The patient funnel is the most actionable commercial deliverable.</strong> Quantifying conversion rates at each journey stage directly identifies where investment will have the highest revenue impact.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div><strong>No single data source is sufficient.</strong> Best-in-class journey analytics integrates claims (breadth), EHR (clinical depth), specialty pharmacy (adherence), and hub data (patient services) through tokenized patient matching.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div><strong>PDC is the gold standard for adherence.</strong> Unlike MPR, PDC caps at 1.0 per day. The 0.80 threshold is industry standard for defining adherence. Persistence curves complement PDC by showing duration on therapy.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div><strong>Segmentation drives targeted action.</strong> Different patient segments require different interventions — access support for the blocked, adherence programs for the at-risk, and retention for the loyal. One-size-fits-all programs waste resources.</div></div>`}
  ],
  questions:[
    {id:"q1",type:"mcq",difficulty:"Intermediate",question:"A patient funnel shows 10,000 diagnosed patients, 6,000 biomarker tested, 4,000 treated, and 1,500 on your brand. What is the treatment rate among diagnosed patients?",options:[{id:"a",text:"15%"},{id:"b",text:"40%"},{id:"c",text:"60%"},{id:"d",text:"37.5%"}],correct:"b",explanation:"Treatment rate = Treated / Diagnosed = 4,000 / 10,000 = 40%. This tells you 60% of diagnosed patients are not receiving treatment in this class, representing a significant opportunity."},
    {id:"q2",type:"mcq",difficulty:"Intermediate",question:"Which adherence metric caps daily coverage at 1.0 to prevent overcounting from early refills?",options:[{id:"a",text:"MPR (Medication Possession Ratio)"},{id:"b",text:"PDC (Proportion of Days Covered)"},{id:"c",text:"Persistence rate"},{id:"d",text:"Compliance ratio"}],correct:"b",explanation:"PDC caps coverage at 1.0 per day, meaning overlapping fill dates do not inflate the metric. This makes PDC more conservative and accurate than MPR, which simply sums total days supply and can exceed 1.0."},
    {id:"q3",type:"mcq",difficulty:"Advanced",question:"In a rare disease journey, which stage typically represents the greatest bottleneck and commercial opportunity?",options:[{id:"a",text:"Treatment adherence"},{id:"b",text:"Formulary access"},{id:"c",text:"Diagnosis (the diagnostic odyssey)"},{id:"d",text:"Brand switching"}],correct:"c",explanation:"Rare diseases often have diagnostic odysseys lasting years, with patients seeing multiple specialists before receiving a correct diagnosis. Reducing time-to-diagnosis is the highest-impact intervention because patients cannot be treated if they are not identified."},
    {id:"q4",type:"mcq",difficulty:"Intermediate",question:"Which data source provides the best visibility into specialty drug adherence patterns including injection training and refill timing?",options:[{id:"a",text:"Medical claims data"},{id:"b",text:"Retail pharmacy claims"},{id:"c",text:"Specialty pharmacy / hub services data"},{id:"d",text:"EHR data"}],correct:"c",explanation:"Specialty pharmacy and hub services data captures the full specialty drug dispensing cycle including enrollment, benefits verification, prior authorization status, copay assistance utilization, injection training, and detailed refill patterns. Claims data has lag and misses this operational detail."},
    {id:"q5",type:"mcq",difficulty:"Intermediate",question:"A brand team wants to improve 12-month persistence from 45% to 55%. Which patient segment should they target first for the highest ROI?",options:[{id:"a",text:"Patients who discontinued in months 9-12"},{id:"b",text:"Patients who never started therapy"},{id:"c",text:"Patients who discontinued in the first 90 days"},{id:"d",text:"Patients who switched to a competitor after 6 months"}],correct:"c",explanation:"Early discontinuers (first 90 days) represent the largest addressable population and are most amenable to intervention (side effect management, copay support, nurse education). Intervening early in the persistence curve yields the highest impact on 12-month rates."}
  ]
},


"2-2": {
  id:"2-2", title:"HCP Segmentation & Targeting", domain:"Commercial Analytics", domain_id:2,
  level:"Intermediate", mins:55, available:true,
  tags:["HCP Targeting","Segmentation","Decile Analysis","Call Planning","KOL","Prescriber Analytics"],
  objectives:["Define and build an HCP universe for targeting","Analyze prescribing behavior using TRx, NRx, and NBRx metrics","Perform decile analysis and potential-performance segmentation","Design optimal call plans using reach-frequency frameworks","Identify KOLs and map influence networks","Build promotional response models"],
  toc:[
    {id:"s1",title:"HCP Universe Definition",level:"h2"},
    {id:"s2",title:"Prescribing Behavior Analysis",level:"h2"},
    {id:"s3",title:"Decile Analysis & Segmentation",level:"h2"},
    {id:"s4",title:"Call Plan Optimization",level:"h2"},
    {id:"s5",title:"Digital Engagement Scoring",level:"h2"},
    {id:"s6",title:"KOL Identification & Influence Mapping",level:"h2"},
    {id:"s7",title:"Promotional Response Modeling",level:"h2"},
    {id:"s8",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">HCP Universe Definition</h2>
<p>The <strong>HCP universe</strong> is the complete set of healthcare providers who could potentially prescribe your product. Defining this universe correctly is foundational — too narrow and you miss revenue; too broad and you waste promotional resources on low-value targets.</p>
<h3>Universe Construction Steps</h3>
<ol>
<li><strong>Specialty filtering:</strong> Start with NPI registry data filtered to relevant specialties (e.g., oncologists, rheumatologists, endocrinologists). Use taxonomy codes to identify subspecialties.</li>
<li><strong>Geographic scoping:</strong> Define territories based on ZIP-3 or MSA boundaries aligned to your sales force footprint.</li>
<li><strong>Prescribing activity:</strong> Filter to HCPs who have written at least 1 prescription in the therapeutic class within the past 12 months (active prescribers).</li>
<li><strong>Exclusions:</strong> Remove retired/deceased providers, those in restricted institutions (VA, DoD), and any HCPs with compliance restrictions.</li>
</ol>
<h3>Customer Master Data Management</h3>
<p>The HCP universe feeds into the <strong>customer master</strong>, which is the single source of truth for all provider data. Key attributes include:</p>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Attribute</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Source</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Use</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">NPI, name, specialty</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">NPPES, IQVIA OneKey</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Identity, targeting</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Practice address, affiliations</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">IQVIA OneKey, CMS PECOS</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Territory alignment, call routing</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Prescribing volume (TRx, NRx)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">IQVIA Xponent, Symphony</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Decile ranking, potential</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Hospital/IDN affiliation</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Definitive Healthcare, IQVIA</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Account-level targeting</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Digital preferences</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Veeva CRM, Doximity</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Channel mix optimization</td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">Data Quality Matters</div><p>Customer master quality directly impacts targeting accuracy. Industry estimates suggest 15-20% of HCP records have stale addresses, wrong specialties, or duplicate NPIs. Invest in regular data hygiene — a misclassified oncologist in your cardiology universe wastes every promotional dollar spent on them.</p></div>`},
    {id:"s2",content:`<h2 id="s2">Prescribing Behavior Analysis</h2>
<p>Understanding how HCPs prescribe is the foundation for all segmentation and targeting decisions. Three core metrics drive this analysis:</p>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Metric</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Definition</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">What It Tells You</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>TRx</strong> (Total Prescriptions)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">All prescriptions dispensed (new + refills)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Total volume and market size for the HCP</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>NRx</strong> (New Prescriptions)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">First-time prescriptions for a patient on a product</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">New patient starts — reflects prescribing momentum</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>NBRx</strong> (New-to-Brand Rx)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Patients new to your specific brand</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Market share gains, competitive switching</td></tr>
</tbody></table>
<h3>Prescribing Trend Analysis</h3>
<p>Beyond point-in-time metrics, trend analysis reveals HCP behavior trajectories:</p>
<pre><code class="language-sql">-- Monthly NRx trend by HCP with growth classification
SELECT
  hcp_npi,
  rx_month,
  SUM(nrx_count) AS monthly_nrx,
  AVG(SUM(nrx_count)) OVER (
    PARTITION BY hcp_npi ORDER BY rx_month
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
  ) AS rolling_3mo_avg,
  CASE
    WHEN SUM(nrx_count) > 1.2 * LAG(SUM(nrx_count), 3)
         OVER (PARTITION BY hcp_npi ORDER BY rx_month)
    THEN 'Growing'
    WHEN SUM(nrx_count) < 0.8 * LAG(SUM(nrx_count), 3)
         OVER (PARTITION BY hcp_npi ORDER BY rx_month)
    THEN 'Declining'
    ELSE 'Stable'
  END AS trend_status
FROM prescription_data
WHERE brand = 'YOUR_BRAND'
GROUP BY hcp_npi, rx_month;</code></pre>
<p><strong>Brand share</strong> at the HCP level is equally critical: Brand Share = Brand TRx / Class TRx. An HCP writing 100 class TRx with 10% brand share represents far more opportunity than one writing 20 class TRx with 50% share.</p>`},
    {id:"s3",content:`<h2 id="s3">Decile Analysis & Segmentation</h2>
<p><strong>Decile analysis</strong> ranks all HCPs by prescribing volume and divides them into 10 equal groups. This is the most fundamental segmentation in pharma commercial analytics and drives resource allocation decisions across every brand.</p>
<h3>Building Deciles</h3>
<pre><code class="language-sql">SELECT
  hcp_npi,
  total_class_trx,
  brand_trx,
  NTILE(10) OVER (ORDER BY total_class_trx DESC) AS decile,
  ROUND(100.0 * brand_trx / NULLIF(total_class_trx, 0), 1) AS brand_share_pct
FROM hcp_prescribing_summary
WHERE total_class_trx > 0;</code></pre>
<h3>The 80/20 Rule in Pharma</h3>
<p>Pharma prescribing follows a power law: the top 2 deciles (20% of HCPs) typically generate 60-80% of total prescriptions. This concentration drives the industry-standard tiered targeting model:</p>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Tier</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Deciles</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">% of HCPs</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">% of TRx</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Typical Call Frequency</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">A (High)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">1-2</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">20%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">60-80%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">8-12 calls/year</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">B (Medium)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">3-5</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">30%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">15-25%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">4-6 calls/year</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">C (Low)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">6-8</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">30%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">5-10%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">2-3 calls/year</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">No-see</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">9-10</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">20%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><5%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Digital only</td></tr>
</tbody></table>
<h3>Potential vs. Performance Matrix</h3>
<p>The most sophisticated targeting uses a 2x2 matrix crossing HCP <strong>potential</strong> (class volume) with <strong>performance</strong> (brand share):</p>
<ul>
<li><strong>High Potential / Low Share:</strong> "Growth targets" — highest priority for sales force effort</li>
<li><strong>High Potential / High Share:</strong> "Maintain" — protect existing business, reduce call frequency</li>
<li><strong>Low Potential / High Share:</strong> "Loyal niche" — low investment, digital maintenance</li>
<li><strong>Low Potential / Low Share:</strong> "Deprioritize" — minimal or no promotion</li>
</ul>`},
    {id:"s4",content:`<h2 id="s4">Call Plan Optimization</h2>
<p>A <strong>call plan</strong> specifies which HCPs each sales representative should visit, how often, and with what messaging. Optimizing call plans is the primary lever for sales force ROI.</p>
<h3>Reach vs. Frequency Trade-off</h3>
<p>With a fixed number of reps and selling days, every brand faces the reach-frequency trade-off:</p>
<ul>
<li><strong>Reach:</strong> Number of unique HCPs called upon (breadth)</li>
<li><strong>Frequency:</strong> Number of calls per HCP per year (depth)</li>
<li><strong>Available calls:</strong> Reps x selling days x calls/day (typically 6-8 face-to-face calls per day)</li>
</ul>
<p><strong>Example calculation:</strong> 200 reps x 220 selling days x 7 calls/day = 308,000 available calls/year. If your target universe is 40,000 HCPs at an average frequency of 6, you need 240,000 calls — within capacity. But if you increase the universe to 60,000, average frequency drops to ~5.</p>
<h3>Territory Design Principles</h3>
<p>Effective territory design balances three factors:</p>
<ol>
<li><strong>Workload equity:</strong> Each rep should have roughly equal call capacity requirements</li>
<li><strong>Market potential:</strong> Territories should have comparable revenue opportunity</li>
<li><strong>Geographic compactness:</strong> Minimize drive time to maximize selling time (targeting 70%+ of time in front of HCPs)</li>
</ol>
<div class="callout callout-tip"><div class="callout-title">Rep-HCP Alignment</div><p>Best practice aligns reps to accounts, not just individual HCPs. If an IDN (Integrated Delivery Network) has 15 oncologists across 3 locations, a single rep should own that account to build relationship depth and coordinate messaging. This is called <strong>account-based targeting</strong>.</p></div>`},
    {id:"s5",content:`<h2 id="s5">Digital Engagement Scoring</h2>
<p>Modern HCP targeting incorporates digital engagement alongside traditional prescribing metrics. A <strong>digital engagement score</strong> aggregates HCP interactions across all non-personal channels:</p>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Channel</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Metrics Tracked</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Weight (Example)</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Email</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Open rate, click rate, content viewed</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Low (0.2)</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">HCP Portal</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Logins, pages viewed, time on site</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Medium (0.5)</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Webinars/Virtual programs</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Attendance, duration, Q&A participation</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">High (0.8)</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Sample requests</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Online sample orders</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">High (0.9)</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Rep-triggered email</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Response to rep-sent content</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Medium (0.6)</td></tr>
</tbody></table>
<p>A composite score is calculated as: <strong>Digital Score = SUM(channel_weight x normalized_activity)</strong>. This score is used to identify "digitally receptive" HCPs who may respond better to non-personal promotion, especially important for no-see HCPs who restrict rep access.</p>`},
    {id:"s6",content:`<h2 id="s6">KOL Identification & Influence Mapping</h2>
<p><strong>Key Opinion Leaders (KOLs)</strong> are influential physicians who shape prescribing behavior in their therapeutic area through publications, speaking engagements, guideline development, and peer influence. Identifying and engaging KOLs is critical for both medical affairs and commercial teams.</p>
<h3>KOL Identification Criteria</h3>
<ul>
<li><strong>Publication record:</strong> H-index, number of relevant publications, citation count (PubMed, Scopus)</li>
<li><strong>Clinical trial involvement:</strong> PI on relevant trials (ClinicalTrials.gov), steering committee memberships</li>
<li><strong>Guideline authorship:</strong> NCCN, ACC, ADA panel membership</li>
<li><strong>Speaking activity:</strong> Congress presentations (ASCO, AHA, EASD), advisory board participation</li>
<li><strong>Prescribing influence:</strong> High-volume prescriber in the class, academic affiliation, training program leadership</li>
</ul>
<h3>Influence Network Mapping</h3>
<p>Beyond individual KOLs, mapping influence networks reveals how prescribing patterns spread. Key network metrics include:</p>
<ul>
<li><strong>Degree centrality:</strong> Number of direct connections (co-authorships, shared affiliations)</li>
<li><strong>Betweenness centrality:</strong> How often a KOL connects otherwise unconnected clusters</li>
<li><strong>Referral networks:</strong> Patient referral patterns between PCPs and specialists</li>
</ul>
<div class="callout"><div class="callout-title">Digital KOLs</div><p>Increasingly, "DOLs" (Digital Opinion Leaders) who are active on Twitter/X, Doximity, and medical podcasts influence prescribing behavior among younger physicians. Include social media metrics in your KOL identification framework.</p></div>`},
    {id:"s7",content:`<h2 id="s7">Promotional Response Modeling</h2>
<p><strong>Promotional response models</strong> quantify the relationship between promotional effort (calls, samples, digital touches) and prescribing behavior change. This is the analytical foundation for call plan optimization and budget allocation.</p>
<h3>Standard Model Structure</h3>
<pre><code class="language-python">import statsmodels.api as sm

# Promotional response model: NRx as function of promotional inputs
# Using log-log specification to capture diminishing returns
model = sm.OLS.from_formula(
    'np.log(nrx + 1) ~ np.log(details + 1) + np.log(samples + 1) '
    '+ np.log(digital_touches + 1) + brand_share_lag '
    '+ C(specialty) + C(region)',
    data=hcp_panel_df
).fit()

# Interpret coefficients as elasticities
# detail_elasticity = 0.15 means 10% more details -> 1.5% more NRx
print(model.summary())</code></pre>
<h3>Diminishing Returns</h3>
<p>All promotional channels exhibit <strong>diminishing returns</strong> — the Nth call produces less incremental prescribing than the (N-1)th. Industry data shows the response curve typically flattens after 8-10 personal details per year. This is why frequency caps are set at 10-12 calls for even the highest-value targets.</p>
<h3>Affinity Scoring</h3>
<p>Affinity scores combine prescribing potential with promotional responsiveness to create a composite targeting score: <strong>Affinity = w1 * Potential + w2 * Responsiveness + w3 * Access</strong>. HCPs with high affinity scores get priority in call plans because they represent the best ROI on promotional investment.</p>`},
    {id:"s8",content:`<h2 id="s8">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div><strong>Decile analysis is foundational but insufficient.</strong> Volume-based deciles tell you who prescribes the most, but the Potential vs. Performance matrix tells you where promotional investment will drive the most incremental prescribing.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div><strong>Call plan optimization is constrained math.</strong> With fixed rep capacity, every HCP added to the target list reduces frequency for existing targets. The reach-frequency trade-off must be managed analytically, not intuitively.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div><strong>Digital engagement is a targeting dimension, not just a channel.</strong> HCPs who engage digitally but restrict rep access represent a growing segment that requires fundamentally different promotional approaches.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div><strong>KOLs drive disproportionate prescribing influence.</strong> A single guideline change by a KOL panel can shift 10-20% of prescribing behavior across an entire therapeutic area. MSL engagement with KOLs is a strategic commercial investment.</div></div>`}
  ],
  questions:[
    {id:"q1",type:"mcq",difficulty:"Intermediate",question:"An HCP writes 200 total class prescriptions per year but only 20 for your brand. How would you classify this HCP in the Potential vs. Performance matrix?",options:[{id:"a",text:"High Potential / High Share"},{id:"b",text:"High Potential / Low Share"},{id:"c",text:"Low Potential / High Share"},{id:"d",text:"Low Potential / Low Share"}],correct:"b",explanation:"With 200 class TRx, this is a high-potential HCP. But with only 10% brand share (20/200), performance is low. This is the 'Growth Target' quadrant — the highest priority for incremental promotional investment."},
    {id:"q2",type:"mcq",difficulty:"Beginner",question:"What is the key difference between NRx and NBRx?",options:[{id:"a",text:"NRx counts refills; NBRx does not"},{id:"b",text:"NRx is any new prescription for a patient; NBRx is specifically new patients starting your brand"},{id:"c",text:"NRx includes samples; NBRx does not"},{id:"d",text:"There is no difference; they are interchangeable terms"}],correct:"b",explanation:"NRx (New Prescription) counts any first prescription for a patient on any product in the class. NBRx (New-to-Brand) specifically counts patients who are new to your brand, whether switching from a competitor or treatment-naive. NBRx is the more brand-specific metric."},
    {id:"q3",type:"mcq",difficulty:"Intermediate",question:"A sales team has 150 reps, 220 selling days per year, and averages 7 calls per day. If the target universe requires 6 calls per HCP per year, what is the maximum number of HCPs that can be covered?",options:[{id:"a",text:"23,100"},{id:"b",text:"38,500"},{id:"c",text:"46,200"},{id:"d",text:"231,000"}],correct:"b",explanation:"Total available calls = 150 x 220 x 7 = 231,000. At 6 calls per HCP: 231,000 / 6 = 38,500 HCPs. This is the maximum reach at that frequency; any increase in universe size would require reducing frequency below 6."},
    {id:"q4",type:"mcq",difficulty:"Advanced",question:"In a promotional response model using log-log specification, the coefficient on log(details) is 0.12. What does this mean?",options:[{id:"a",text:"Each additional detail produces 0.12 more prescriptions"},{id:"b",text:"A 10% increase in details is associated with a 1.2% increase in NRx"},{id:"c",text:"Details account for 12% of total prescribing variance"},{id:"d",text:"12 details are needed to generate one additional NRx"}],correct:"b",explanation:"In a log-log model, coefficients represent elasticities. A coefficient of 0.12 means a 10% increase in the independent variable (details) is associated with a 1.2% increase in the dependent variable (NRx). This captures the diminishing returns relationship common in promotional response."},
    {id:"q5",type:"mcq",difficulty:"Intermediate",question:"Which metric best identifies a physician who bridges two otherwise disconnected clinical research communities?",options:[{id:"a",text:"Degree centrality"},{id:"b",text:"H-index"},{id:"c",text:"Betweenness centrality"},{id:"d",text:"Prescribing volume"}],correct:"c",explanation:"Betweenness centrality measures how often a node (physician) lies on the shortest path between other nodes in a network. A high betweenness centrality indicates the physician connects otherwise disconnected clusters — making them a valuable bridge for spreading clinical practice innovations across communities."}
  ]
},


"2-3": {
  id:"2-3", title:"Sales Force Effectiveness (SFE)", domain:"Commercial Analytics", domain_id:2,
  level:"Advanced", mins:55, available:true,
  tags:["SFE","Territory Alignment","Call Activity","Rep Performance","Promotional Mix","Sales Analytics"],
  objectives:["Define the SFE framework: reach, frequency, and quality of call","Design balanced territory alignments using workload and potential","Analyze rep performance using activity and outcome metrics","Optimize the promotional mix across field, digital, and speaker channels","Calculate ROI of sales force activities","Benchmark SFE KPIs against industry standards"],
  toc:[
    {id:"s1",title:"The SFE Framework",level:"h2"},
    {id:"s2",title:"Territory Alignment & Workload Balancing",level:"h2"},
    {id:"s3",title:"Activity & Performance Metrics",level:"h2"},
    {id:"s4",title:"Rep Performance Analytics",level:"h2"},
    {id:"s5",title:"Promotional Mix Optimization",level:"h2"},
    {id:"s6",title:"ROI of Sales Force Activities",level:"h2"},
    {id:"s7",title:"Industry SFE Benchmarks",level:"h2"},
    {id:"s8",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">The SFE Framework</h2>
<p><strong>Sales Force Effectiveness (SFE)</strong> is the discipline of maximizing revenue output from every dollar invested in field-based promotion. In pharma, the sales force is typically the single largest commercial expense — consuming 30-50% of brand budgets. SFE analytics ensures this investment generates maximum return.</p>
<p>The SFE framework rests on three pillars:</p>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Pillar</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Definition</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Key Metrics</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Levers</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>Reach</strong></td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">% of target universe called on</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Reach %, unique HCPs seen</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Territory size, targeting accuracy</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>Frequency</strong></td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Calls per HCP per period</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Avg calls/target, frequency attainment</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Call plan, rep productivity</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>Quality</strong></td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Effectiveness of each interaction</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Message recall, detail quality score</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Training, content, coaching</td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">The SFE Equation</div><p>Revenue Impact = f(Reach x Frequency x Quality). Improving any one dimension while holding others constant increases output. The optimal allocation depends on where the brand is in its lifecycle — launch brands need reach; mature brands need quality.</p></div>`},
    {id:"s2",content:`<h2 id="s2">Territory Alignment & Workload Balancing</h2>
<p>Territory alignment determines which HCPs each sales rep is responsible for covering. A well-designed alignment maximizes selling time and ensures equitable workload distribution.</p>
<h3>Alignment Design Process</h3>
<ol>
<li><strong>Define geographic building blocks:</strong> Start with ZIP codes or brick-level geography (IQVIA uses "bricks" — clusters of 10-20 ZIP codes)</li>
<li><strong>Assign HCPs to geographies:</strong> Map each target HCP to their primary practice ZIP</li>
<li><strong>Calculate territory metrics:</strong> For each candidate territory, compute total target HCPs, total call capacity needed, total market potential, and estimated drive time</li>
<li><strong>Optimize balance:</strong> Use algorithms to minimize variance in workload and potential across territories while maintaining geographic contiguity</li>
</ol>
<h3>Workload Model</h3>
<pre><code class="language-python">def territory_workload(territory_hcps, call_plan, selling_days=220):
    """
    Calculate territory workload as % of capacity.
    """
    total_calls_needed = sum(
        call_plan.get(hcp['tier'], 0) for hcp in territory_hcps
    )
    calls_per_day = 7  # average face-to-face
    total_capacity = selling_days * calls_per_day

    workload_pct = total_calls_needed / total_capacity * 100
    return {
        'calls_needed': total_calls_needed,
        'capacity': total_capacity,
        'workload_pct': round(workload_pct, 1),
        'status': 'Balanced' if 85 <= workload_pct <= 115 else
                  'Under' if workload_pct < 85 else 'Over'
    }

# Call plan by tier
call_plan = {'A': 10, 'B': 6, 'C': 3, 'D': 0}</code></pre>
<p>Target workload utilization is 90-110% of capacity. Territories below 85% indicate excess capacity (consider adding HCPs or reducing headcount); territories above 115% indicate overwork (reps will underserve targets).</p>
<div class="callout callout-tip"><div class="callout-title">Disruption Score</div><p>When realigning territories, calculate a <strong>disruption score</strong> — the percentage of HCPs who change rep assignments. Industry best practice keeps disruption below 20% to preserve relationship continuity. Major realignments (>40% disruption) should be avoided unless absolutely necessary.</p></div>`},
    {id:"s3",content:`<h2 id="s3">Activity & Performance Metrics</h2>
<p>SFE measurement requires tracking both <strong>activity metrics</strong> (what reps do) and <strong>outcome metrics</strong> (what results they achieve). The key is connecting the two to identify which activities drive outcomes.</p>
<h3>Activity Metrics</h3>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Metric</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Definition</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Benchmark</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Details per day</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Face-to-face calls completed per selling day</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">6-8 (primary care), 4-5 (specialty)</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Target call %</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">% of calls on targeted HCPs (vs. off-target)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">>85%</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Frequency attainment</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Actual calls vs. planned calls per target</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">80-90%</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Samples dropped</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Samples distributed per call</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Product-specific allocation</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Selling time %</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">% of total time in customer-facing activity</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">55-65%</td></tr>
</tbody></table>
<h3>Outcome Metrics</h3>
<ul>
<li><strong>TRx market share:</strong> Brand share within the territory</li>
<li><strong>NRx growth:</strong> New patient starts vs. prior period</li>
<li><strong>Goal attainment %:</strong> Actual sales vs. quota (target: >100%)</li>
<li><strong>Market share growth:</strong> Change in brand share vs. prior year</li>
</ul>`},
    {id:"s4",content:`<h2 id="s4">Rep Performance Analytics</h2>
<p>Analyzing individual rep performance requires controlling for territory differences. A rep in a high-potential territory will naturally produce more volume than one in a low-potential territory, so raw volume comparisons are misleading.</p>
<h3>Fair Share Analysis</h3>
<p><strong>Fair share</strong> adjusts for territory potential to create an apples-to-apples comparison:</p>
<pre><code class="language-sql">SELECT
  rep_id,
  territory_id,
  brand_trx,
  territory_class_trx,
  ROUND(100.0 * brand_trx / NULLIF(territory_class_trx, 0), 1)
    AS brand_share_pct,
  national_brand_share_pct,
  ROUND(100.0 * brand_trx / NULLIF(territory_class_trx, 0), 1)
    - national_brand_share_pct AS share_vs_national,
  CASE
    WHEN brand_share > 1.1 * national_brand_share THEN 'Outperformer'
    WHEN brand_share < 0.9 * national_brand_share THEN 'Underperformer'
    ELSE 'At National'
  END AS performance_tier
FROM territory_performance;</code></pre>
<h3>Goal Attainment Distribution</h3>
<p>A healthy IC plan produces a bell-curve distribution of goal attainment centered around 100%. Warning signs include:</p>
<ul>
<li><strong>Right-skewed distribution</strong> (most reps above goal): Quotas may be set too low</li>
<li><strong>Left-skewed distribution</strong> (most reps below goal): Quotas may be unrealistic or market conditions have shifted</li>
<li><strong>Bimodal distribution:</strong> Two distinct performance clusters suggest a systemic issue (e.g., different access environments, training gaps)</li>
</ul>`},
    {id:"s5",content:`<h2 id="s5">Promotional Mix Optimization</h2>
<p>The <strong>promotional mix</strong> is the allocation of commercial investment across channels: personal promotion (field force), non-personal promotion (digital, direct mail), peer-to-peer (speaker programs), sampling, and patient activation.</p>
<h3>Channel Effectiveness Comparison</h3>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Channel</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Cost per Touch</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Reach</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Impact per Touch</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Best For</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Field detail</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">$150-300</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Limited</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Highest</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">High-value targets, complex messaging</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Virtual detail</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">$50-100</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Moderate</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Medium-high</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">No-see HCPs, supplemental frequency</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Speaker program</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">$500-1500/attendee</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Limited</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">High</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Peer influence, complex data</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Email</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">$1-5</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Broad</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Low</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Awareness, reinforcement</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Samples</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">$20-100/unit</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Moderate</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">High (trial driver)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">New product trial, switching</td></tr>
</tbody></table>
<p>The optimal mix varies by brand lifecycle. Launch brands allocate heavily to field force (60-70%) and sampling (15-20%). Mature brands shift toward digital (30-40%) and reduce field force investment as the prescribing base is established.</p>`},
    {id:"s6",content:`<h2 id="s6">ROI of Sales Force Activities</h2>
<p>Calculating sales force ROI requires attributing incremental prescriptions to promotional activity and converting those scripts to revenue:</p>
<h3>ROI Calculation Framework</h3>
<pre><code class="language-python">def calculate_sfe_roi(promo_cost, incremental_trx, net_revenue_per_trx):
    """
    Calculate ROI of sales force promotional activity.

    promo_cost: Total cost of promotion (salary + benefits + T&E + samples)
    incremental_trx: Additional TRx attributable to promotion
    net_revenue_per_trx: Net revenue per prescription after GTN
    """
    incremental_revenue = incremental_trx * net_revenue_per_trx
    roi = (incremental_revenue - promo_cost) / promo_cost
    return {
        'incremental_revenue': incremental_revenue,
        'promo_cost': promo_cost,
        'roi': round(roi, 2),
        'cost_per_incremental_trx': round(promo_cost / max(incremental_trx, 1), 2)
    }

# Example: specialty brand
result = calculate_sfe_roi(
    promo_cost=50_000_000,      # $50M field force cost
    incremental_trx=200_000,     # 200K incremental scripts
    net_revenue_per_trx=800      # $800 net per Rx
)
# ROI = ($160M - $50M) / $50M = 2.2x</code></pre>
<p>Key considerations for accurate ROI:</p>
<ul>
<li><strong>Baseline estimation:</strong> What would have happened without promotion? This requires modeling a "no-promotion" counterfactual, often using matched markets or promotion-gap analysis</li>
<li><strong>Halo effects:</strong> Detailing one product may lift prescribing for other products in the portfolio</li>
<li><strong>Lag effects:</strong> Promotional impact may take 2-4 weeks to manifest in prescribing data</li>
<li><strong>Fully loaded cost:</strong> Include salary, benefits, T&E, training, CRM, fleet, and management overhead — typically $250-350K per rep per year</li>
</ul>`},
    {id:"s7",content:`<h2 id="s7">Industry SFE Benchmarks</h2>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">KPI</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Primary Care</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Specialty</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Oncology/Rare</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Calls per day</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">7-9</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">5-7</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">3-5</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Target HCPs per rep</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">200-300</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">80-150</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">40-80</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Reach attainment</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">85-90%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">80-90%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">90-95%</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Avg frequency (A-tier)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">8-12/yr</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">6-10/yr</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">12-18/yr</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Cost per detail</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">$150-200</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">$200-300</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">$300-500</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Selling time %</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">60-65%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">55-60%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">45-55%</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Field force ROI</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">1.5-3x</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">2-5x</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">3-8x</td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">Post-COVID Shift</div><p>The COVID-19 pandemic permanently altered SFE benchmarks. HCP access rates dropped from ~70% to ~50% for in-person detailing, virtual detailing became a standard channel (now 15-25% of total details), and hybrid engagement models (field + virtual + digital) became the norm. Any SFE analysis must account for these structural shifts.</p></div>`},
    {id:"s8",content:`<h2 id="s8">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div><strong>Territory alignment is the foundation of SFE.</strong> An imbalanced alignment (some reps overloaded, others underutilized) wastes 15-20% of field force capacity regardless of rep skill.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div><strong>Measure activities AND outcomes, then connect them.</strong> Activity metrics without outcome linkage creates busywork reporting. Promotional response models connect the two to identify which activities actually drive prescribing.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div><strong>Fair share analysis removes territory bias from rep performance evaluation.</strong> Raw volume comparisons are always unfair; brand share relative to national average controls for territory potential.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div><strong>The fully loaded cost per rep is $250-350K/year.</strong> At that investment level, even small improvements in productivity (one additional quality call per day) yield significant ROI gains across a 500-rep sales force.</div></div>`}
  ],
  questions:[
    {id:"q1",type:"mcq",difficulty:"Intermediate",question:"A territory has 120 A-tier targets (10 calls/year), 80 B-tier (6 calls/year), and 50 C-tier (3 calls/year). If a rep makes 7 calls per day over 220 selling days, what is the territory workload utilization?",options:[{id:"a",text:"78%"},{id:"b",text:"95%"},{id:"c",text:"112%"},{id:"d",text:"130%"}],correct:"c",explanation:"Calls needed: (120x10) + (80x6) + (50x3) = 1200 + 480 + 150 = 1,830. Capacity: 220 x 7 = 1,540. Workload: 1,830/1,540 = 119% — approximately 112-120%. This territory is overloaded and the rep will underserve targets."},
    {id:"q2",type:"mcq",difficulty:"Advanced",question:"When realigning sales territories, what is the recommended maximum disruption score to preserve HCP-rep relationships?",options:[{id:"a",text:"5%"},{id:"b",text:"20%"},{id:"c",text:"40%"},{id:"d",text:"60%"}],correct:"b",explanation:"Industry best practice is to keep disruption (% of HCPs changing rep assignments) below 20%. Higher disruption breaks established relationships, which can take 6-12 months to rebuild, temporarily reducing promotional effectiveness."},
    {id:"q3",type:"mcq",difficulty:"Intermediate",question:"A mature brand is considering shifting $10M from field force to digital channels. What analytical approach best informs this decision?",options:[{id:"a",text:"A/B test with random territory assignment"},{id:"b",text:"Survey reps about their perceived effectiveness"},{id:"c",text:"Promotional response modeling comparing channel elasticities"},{id:"d",text:"Benchmarking competitor spending allocation"}],correct:"c",explanation:"Promotional response modeling estimates the incremental prescribing impact per dollar spent by channel. Comparing channel elasticities (e.g., field detail elasticity of 0.12 vs. digital elasticity of 0.08) reveals where the next marginal dollar generates the most return."},
    {id:"q4",type:"mcq",difficulty:"Intermediate",question:"A rep's territory has a brand share of 22% vs. the national average of 18%. This rep's raw TRx volume ranks in the bottom quartile. How should you assess this rep's performance?",options:[{id:"a",text:"Underperformer based on low volume"},{id:"b",text:"Outperformer based on above-national share despite low-potential territory"},{id:"c",text:"Average performer — share advantage offsets volume deficit"},{id:"d",text:"Cannot be assessed without activity data"}],correct:"b",explanation:"Fair share analysis shows this rep achieves 22% share vs. 18% national, indicating strong execution despite a low-potential territory. Low volume reflects territory size, not rep performance. This rep is an outperformer who might be ideal for a higher-potential territory."},
    {id:"q5",type:"mcq",difficulty:"Advanced",question:"What is the typical fully loaded cost per sales representative per year in the US pharma industry?",options:[{id:"a",text:"$100-150K"},{id:"b",text:"$150-200K"},{id:"c",text:"$250-350K"},{id:"d",text:"$500-750K"}],correct:"c",explanation:"Fully loaded rep cost includes base salary (~$80-120K), bonus/commission (~$30-60K), benefits (~$30-50K), T&E ($15-25K), training, CRM license, fleet vehicle, and management overhead. Total: $250-350K. This figure is essential for ROI calculations."}
  ]
},


"2-4": {
  id:"2-4", title:"Forecasting & Demand Planning", domain:"Commercial Analytics", domain_id:2,
  level:"Advanced", mins:65, available:true,
  tags:["Forecasting","ARIMA","Patient-Based Forecast","Demand Planning","MAPE","Launch Forecasting"],
  objectives:["Compare bottom-up and top-down forecasting methodologies","Apply statistical models including ARIMA and exponential smoothing","Build patient-based forecasts from epidemiology through market share","Calculate forecast accuracy using MAPE, WMAPE, and bias metrics","Design scenario-based forecasts for strategic planning","Implement consensus forecasting processes"],
  toc:[
    {id:"s1",title:"Forecasting Methodologies Overview",level:"h2"},
    {id:"s2",title:"Statistical Forecasting Models",level:"h2"},
    {id:"s3",title:"Patient-Based Forecasting",level:"h2"},
    {id:"s4",title:"Analogue-Based & Launch Forecasting",level:"h2"},
    {id:"s5",title:"Forecast Accuracy Metrics",level:"h2"},
    {id:"s6",title:"Scenario Planning & Consensus Process",level:"h2"},
    {id:"s7",title:"Long-Range Planning vs Rolling Forecast",level:"h2"},
    {id:"s8",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Forecasting Methodologies Overview</h2>
<p>Pharma forecasting predicts future demand for a product across relevant time horizons. It drives some of the most consequential business decisions: manufacturing capacity, revenue guidance to Wall Street, field force sizing, and market access strategy.</p>
<h3>Bottom-Up vs. Top-Down</h3>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Approach</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Method</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Best For</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Limitations</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>Bottom-up</strong></td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Sum territory/account-level forecasts</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Established brands with granular data</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Rep bias (sandbagging or over-optimism)</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>Top-down</strong></td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Start with total market, apply share assumptions</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">New launches, strategic planning</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">May miss local dynamics</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>Patient-based</strong></td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Epidemiology -> diagnosed -> treated -> share</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Specialty/rare disease, new markets</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Sensitive to epidemiology assumptions</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>Analogue-based</strong></td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Model after similar past launches</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Pre-launch when no history exists</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Analogue selection is subjective</td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">Forecasting Time Horizons</div><p><strong>Short-term</strong> (1-3 months): Operations/supply planning. Accuracy is critical for manufacturing. <strong>Medium-term</strong> (1-2 years): Budget and goal setting. Drives IC plan quotas and headcount. <strong>Long-range</strong> (3-10 years): Strategic planning, portfolio decisions, investor guidance. Directional accuracy matters more than precision.</p></div>`},
    {id:"s2",content:`<h2 id="s2">Statistical Forecasting Models</h2>
<p>Statistical models use historical patterns in prescription data to project future demand. They are most effective for established brands with 2+ years of stable history.</p>
<h3>ARIMA (AutoRegressive Integrated Moving Average)</h3>
<p>ARIMA is the workhorse of time-series forecasting in pharma. It models the data as a combination of autoregressive (past values), differencing (stationarity), and moving average (past errors) components.</p>
<pre><code class="language-python">from statsmodels.tsa.arima.model import ARIMA
import pandas as pd

# Monthly TRx data for an established brand
trx_data = pd.read_csv('monthly_trx.csv', index_col='month', parse_dates=True)

# ARIMA(p,d,q): p=autoregressive, d=differencing, q=moving average
# Use AIC/BIC for model selection
model = ARIMA(trx_data['trx'], order=(2, 1, 1), seasonal_order=(1, 1, 1, 12))
results = model.fit()

# 12-month forecast with confidence intervals
forecast = results.get_forecast(steps=12)
print(forecast.summary_frame(alpha=0.05))  # 95% CI</code></pre>
<h3>Exponential Smoothing (ETS)</h3>
<p>ETS models capture level, trend, and seasonality with exponentially decaying weights. Holt-Winters triple exponential smoothing is commonly used for seasonal pharma data (e.g., flu products, seasonal allergy).</p>
<h3>Regression-Based Models</h3>
<p>When external drivers matter (e.g., competitive launches, formulary changes), regression models incorporate causal variables:</p>
<pre><code class="language-python">import statsmodels.api as sm

# TRx as function of market drivers
model = sm.OLS.from_formula(
    'trx ~ trend + season_q1 + season_q4 + competitor_launch '
    '+ formulary_win + detail_calls + samples',
    data=monthly_df
).fit()

# Forecast: plug in assumed future values of drivers
future_df['trx_forecast'] = model.predict(future_df)</code></pre>`},
    {id:"s3",content:`<h2 id="s3">Patient-Based Forecasting</h2>
<p>Patient-based forecasting is the gold standard for specialty and rare disease products. It builds demand from first principles by modeling the patient flow from epidemiology through treatment to brand selection.</p>
<h3>The Patient-Based Forecast Cascade</h3>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Step</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Metric</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Example (US Oncology)</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">1. Prevalence pool</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Total patients with disease</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">250,000 mNSCLC patients</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">2. Diagnosed %</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">% who receive diagnosis</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">85% = 212,500</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">3. Biomarker tested %</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">% receiving relevant testing</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">65% = 138,125</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">4. Biomarker positive %</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">% with target mutation</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">15% EGFR+ = 20,719</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">5. Treatment rate</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">% who receive therapy</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">80% = 16,575</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">6. Brand share</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Your brand's market share</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">45% = 7,459 patients</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">7. Compliance factor</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Average doses per patient/year</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">10.5 mo avg duration</td></tr>
</tbody></table>
<h3>Script-to-Sales Conversion</h3>
<p>Converting patient forecasts to revenue requires the script-to-sales bridge:</p>
<p><strong>Net Revenue = Patients x Scripts/Patient/Year x Net Price per Script</strong></p>
<p>Key factors in this conversion:</p>
<ul>
<li><strong>Days of therapy per script:</strong> 30-day vs. 90-day fills</li>
<li><strong>Stocking factor:</strong> 1.02-1.05x for pipeline fill (wholesaler inventory)</li>
<li><strong>WAC to net adjustment:</strong> Apply GTN deductions (typically 30-60% for branded specialty)</li>
<li><strong>Free goods:</strong> Subtract samples, vouchers, patient assistance program units</li>
</ul>`},
    {id:"s4",content:`<h2 id="s4">Analogue-Based & Launch Forecasting</h2>
<p>For products without sales history (pre-launch), <strong>analogue-based forecasting</strong> benchmarks expected performance against similar past launches.</p>
<h3>Analogue Selection Criteria</h3>
<ul>
<li><strong>Same therapeutic area:</strong> Oncology analogues for oncology launches</li>
<li><strong>Similar mechanism of action:</strong> First-in-class vs. me-too</li>
<li><strong>Comparable market dynamics:</strong> Similar competitive landscape, payer environment</li>
<li><strong>Similar launch characteristics:</strong> Indication breadth, line of therapy, biomarker requirement</li>
</ul>
<h3>Launch Curve Construction</h3>
<p>An analogue launch curve normalizes the ramp trajectory to month-over-month share uptake. Common patterns include:</p>
<ul>
<li><strong>Fast ramp:</strong> First-in-class with high unmet need (peak share in 18-24 months)</li>
<li><strong>Moderate ramp:</strong> Differentiated me-too entering crowded market (peak in 24-36 months)</li>
<li><strong>Slow ramp:</strong> Product requiring new diagnostic or behavior change (peak in 36-48 months)</li>
</ul>
<h3>Pre-Launch Indicators</h3>
<p>Early signals that predict launch trajectory:</p>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Signal</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Measurement</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Impact on Forecast</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Payer access</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">% lives with unrestricted access at launch</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Below 60% significantly slows ramp</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">HCP awareness</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">% of target prescribers aware of product</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Below 50% at launch predicts slow ramp</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Sample availability</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Samples ready at launch day</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Critical for trial generation</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Guideline inclusion</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">NCCN/guideline recommendation at launch</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Preferred status accelerates adoption 2-3x</td></tr>
</tbody></table>`},
    {id:"s5",content:`<h2 id="s5">Forecast Accuracy Metrics</h2>
<p>Measuring forecast accuracy is essential for continuous improvement and for building credibility with finance and senior leadership.</p>
<h3>Core Accuracy Metrics</h3>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Metric</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Formula</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Industry Target</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>MAPE</strong></td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Mean(|Actual - Forecast| / Actual) x 100</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><10% for mature brands</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>WMAPE</strong></td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Sum(|A-F|) / Sum(A) x 100</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><15% across portfolio</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>Bias</strong></td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Mean((Forecast - Actual) / Actual) x 100</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">+/-5%</td></tr>
</tbody></table>
<pre><code class="language-python">import numpy as np

def forecast_accuracy(actual, forecast):
    """Calculate forecast accuracy metrics."""
    actual, forecast = np.array(actual), np.array(forecast)
    errors = actual - forecast
    abs_errors = np.abs(errors)

    mape = np.mean(abs_errors / actual) * 100
    wmape = abs_errors.sum() / actual.sum() * 100
    bias = np.mean((forecast - actual) / actual) * 100

    return {
        'MAPE': round(mape, 1),
        'WMAPE': round(wmape, 1),
        'Bias': round(bias, 1),
        'Bias_direction': 'Over-forecast' if bias > 0 else 'Under-forecast'
    }</code></pre>
<div class="callout callout-tip"><div class="callout-title">Bias is More Dangerous Than Error</div><p>A forecast with 8% MAPE but +7% bias consistently over-predicts, leading to excess inventory and missed earnings. Unbiased forecasts with moderate error are preferable to low-error forecasts with systematic bias. Track both metrics independently.</p></div>`},
    {id:"s6",content:`<h2 id="s6">Scenario Planning & Consensus Process</h2>
<h3>Scenario Planning</h3>
<p>Every forecast should include three scenarios to quantify uncertainty:</p>
<ul>
<li><strong>Base case (50th percentile):</strong> Most likely outcome given current market dynamics and planned activities</li>
<li><strong>Upside (75th-90th percentile):</strong> Favorable assumptions — faster ramp, delayed competition, better access, label expansion</li>
<li><strong>Downside (10th-25th percentile):</strong> Unfavorable assumptions — competitive launch, access restrictions, safety signal, generic entry</li>
</ul>
<p>The spread between upside and downside scenarios communicates forecast risk. A wide spread signals high uncertainty (typical for launches); a narrow spread indicates confidence (typical for mature brands).</p>
<h3>Consensus Forecasting Process</h3>
<p>The consensus forecast integrates inputs from multiple stakeholders:</p>
<ol>
<li><strong>Analytics team:</strong> Statistical forecast and patient-based model (the analytical "anchor")</li>
<li><strong>Brand team:</strong> Marketing activity assumptions, competitive intelligence</li>
<li><strong>Market access:</strong> Formulary status assumptions, expected access changes</li>
<li><strong>Sales leadership:</strong> Field intelligence, regional dynamics</li>
<li><strong>Finance:</strong> Revenue and margin targets, investor guidance constraints</li>
</ol>
<p>The consensus meeting resolves differences between these inputs through structured discussion, typically producing a single "official" forecast that all functions agree to for planning purposes.</p>`},
    {id:"s7",content:`<h2 id="s7">Long-Range Planning vs Rolling Forecast</h2>
<h3>Long-Range Plan (LRP)</h3>
<p>The LRP is a 5-10 year strategic forecast that informs portfolio decisions, capital allocation, and investor communications. It is updated annually and models major events: LOE (loss of exclusivity), pipeline launches, indication expansions, and competitive threats.</p>
<p>LRP forecasts are inherently less accurate than short-term forecasts but serve a different purpose: they quantify the strategic value of assets and inform investment decisions worth billions of dollars.</p>
<h3>Rolling Forecast</h3>
<p>A rolling forecast continuously extends the forecast horizon by adding a new period as each current period closes. For example, a 12-month rolling forecast always looks 12 months ahead, updated monthly.</p>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Attribute</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">LRP</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Rolling Forecast</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Horizon</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">5-10 years</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">12-18 months</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Update frequency</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Annually</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Monthly or quarterly</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Primary user</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">C-suite, portfolio strategy</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Brand team, supply chain, finance</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Accuracy expectation</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Directional (+/-20-30%)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Operational (+/-5-10%)</td></tr>
</tbody></table>`},
    {id:"s8",content:`<h2 id="s8">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div><strong>Patient-based forecasting is the gold standard for specialty drugs.</strong> Building from epidemiology through treatment creates a transparent, assumption-driven model where each parameter can be challenged and refined independently.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div><strong>Forecast accuracy and bias are distinct problems.</strong> A forecast can be accurate (low MAPE) but systematically biased. Always track both metrics — bias erodes organizational trust faster than random error.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div><strong>Scenario planning quantifies uncertainty.</strong> The spread between upside and downside scenarios communicates risk to leadership and enables contingency planning for key events (competitive launch, formulary loss).</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div><strong>Consensus forecasting resolves organizational politics.</strong> By structuring input from analytics, brand, access, sales, and finance, the consensus process produces a forecast that all stakeholders own, reducing downstream finger-pointing when actuals deviate.</div></div>`}
  ],
  questions:[
    {id:"q1",type:"mcq",difficulty:"Advanced",question:"A patient-based forecast shows 50,000 diagnosed patients, 80% treatment rate, 30% brand share, and $50K net revenue per patient/year. What is the annual revenue forecast?",options:[{id:"a",text:"$200M"},{id:"b",text:"$400M"},{id:"c",text:"$600M"},{id:"d",text:"$800M"}],correct:"c",explanation:"Revenue = 50,000 x 0.80 x 0.30 x $50,000 = 50,000 x 0.24 x $50,000 = 12,000 x $50,000 = $600M. Patient-based forecasts make each assumption transparent and challengeable."},
    {id:"q2",type:"mcq",difficulty:"Intermediate",question:"A forecast has MAPE of 7% but consistent positive bias of +6%. What does this indicate?",options:[{id:"a",text:"The forecast is accurate and reliable"},{id:"b",text:"The forecast systematically over-predicts demand"},{id:"c",text:"The forecast systematically under-predicts demand"},{id:"d",text:"The error metrics are contradictory and unreliable"}],correct:"b",explanation:"Positive bias means (Forecast - Actual) / Actual is consistently positive, indicating over-prediction. Low MAPE masks this directional problem. Over-forecasting leads to excess inventory, over-staffing, and missed earnings guidance. The bias must be corrected."},
    {id:"q3",type:"mcq",difficulty:"Advanced",question:"Which forecasting approach is most appropriate for a first-in-class drug launching in a rare disease with no prior treatments?",options:[{id:"a",text:"ARIMA time-series model"},{id:"b",text:"Bottom-up territory forecasting"},{id:"c",text:"Patient-based epidemiological forecast"},{id:"d",text:"Moving average of analogues"}],correct:"c",explanation:"With no sales history (first-in-class), time-series models cannot be used. With no prior treatments, analogues are limited. Patient-based forecasting from epidemiology (prevalence, diagnosis rate, treatment rate, share) is the only rigorous approach for this situation."},
    {id:"q4",type:"mcq",difficulty:"Intermediate",question:"What is WMAPE's advantage over MAPE for a product sold across multiple SKUs with varying volumes?",options:[{id:"a",text:"WMAPE is always lower than MAPE"},{id:"b",text:"WMAPE weights errors by volume, preventing small-volume SKUs from distorting accuracy"},{id:"c",text:"WMAPE accounts for seasonality"},{id:"d",text:"WMAPE removes outliers automatically"}],correct:"b",explanation:"MAPE treats all periods/SKUs equally, so a 50% error on a low-volume SKU inflates overall MAPE disproportionately. WMAPE (Sum of absolute errors / Sum of actuals) naturally weights by volume, giving a more representative picture of overall forecast performance."},
    {id:"q5",type:"mcq",difficulty:"Intermediate",question:"In a consensus forecasting process, what is the primary role of the analytics team?",options:[{id:"a",text:"To set the final forecast number"},{id:"b",text:"To provide the analytical anchor forecast that grounds discussion"},{id:"c",text:"To collect field intelligence from sales"},{id:"d",text:"To align forecast with investor guidance"}],correct:"b",explanation:"The analytics team provides the data-driven baseline forecast (statistical model and/or patient-based model) that serves as the starting point for consensus discussion. Other stakeholders then provide qualitative adjustments based on market intelligence, competitive dynamics, and strategic plans."}
  ]
},


"2-5": {
  id:"2-5", title:"Marketing Mix Modeling (MMM)", domain:"Commercial Analytics", domain_id:2,
  level:"Advanced", mins:60, available:true,
  tags:["MMM","Marketing Mix","Adstock","ROI","Channel Attribution","Budget Optimization"],
  objectives:["Explain the fundamentals of marketing mix modeling and sales decomposition","Identify required data inputs for pharma MMM","Model adstock, carry-over, and diminishing returns effects","Calculate channel-level ROI and optimize budget allocation","Understand Bayesian MMM approaches and their advantages","Apply MMM insights to pharma brand-specific decision making"],
  toc:[
    {id:"s1",title:"MMM Fundamentals",level:"h2"},
    {id:"s2",title:"Data Inputs & Preparation",level:"h2"},
    {id:"s3",title:"Adstock & Carry-Over Effects",level:"h2"},
    {id:"s4",title:"Diminishing Returns & Saturation",level:"h2"},
    {id:"s5",title:"Channel Contribution & ROI",level:"h2"},
    {id:"s6",title:"Bayesian MMM Approaches",level:"h2"},
    {id:"s7",title:"Pharma-Specific Considerations",level:"h2"},
    {id:"s8",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">MMM Fundamentals</h2>
<p><strong>Marketing Mix Modeling (MMM)</strong> is a statistical approach that decomposes total sales (or prescriptions) into the contributions of individual marketing drivers. It answers the fundamental commercial question: <em>What is driving our sales, and how should we allocate our budget?</em></p>
<h3>Sales Decomposition</h3>
<p>MMM decomposes total sales into three categories:</p>
<ul>
<li><strong>Base sales:</strong> What would happen with zero promotional activity — driven by brand equity, disease prevalence, and market dynamics. Typically 50-70% of total sales for established brands.</li>
<li><strong>Incremental sales from own promotion:</strong> Sales attributable to your marketing activities — field force, DTC, digital, sampling, speaker programs. Typically 20-40%.</li>
<li><strong>External factors:</strong> Competition, seasonality, formulary changes, guidelines, macro trends. Typically 5-15%.</li>
</ul>
<p>The standard MMM equation:</p>
<pre><code class="language-python"># Multiplicative MMM model (log-log specification)
# log(Sales) = B0 + B1*log(Details) + B2*log(Samples)
#            + B3*log(DTC_GRPs) + B4*log(Digital)
#            + B5*Competitor_NRx + B6*Seasonality + error

# Coefficients = elasticities (% change in sales per % change in driver)
# Example: B1 = 0.08 -> 10% more details -> 0.8% more sales</code></pre>
<div class="callout"><div class="callout-title">MMM vs. MTA</div><p>MMM uses aggregate data (weekly/monthly, national/regional) and works without individual-level tracking. Multi-Touch Attribution (MTA) uses individual-level data. In pharma, privacy constraints and long sales cycles make MMM the dominant approach, though hybrid models combining both are emerging.</p></div>`},
    {id:"s2",content:`<h2 id="s2">Data Inputs & Preparation</h2>
<p>MMM requires minimum 2-3 years of weekly or monthly data across all channels. Data quality and completeness directly determine model reliability.</p>
<h3>Required Data Elements</h3>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Category</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Variables</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Source</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Dependent variable</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">TRx, NRx, revenue, market share</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">IQVIA, Symphony</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Personal promotion</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Details, samples, speaker programs</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Veeva CRM, IQVIA DDD</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Non-personal promotion</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">DTC spend (TV, print, digital GRPs), HCP digital</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Kantar, internal spend data</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Competitive</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Competitor TRx, share, promotional spend</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">IQVIA, Kantar competitive tracking</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Market factors</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Formulary changes, guidelines, seasonality</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Internal tracking, MMIT</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Macro factors</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Insurance coverage rates, economic indicators</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Census, CMS</td></tr>
</tbody></table>
<h3>Data Preparation Best Practices</h3>
<ul>
<li><strong>Granularity alignment:</strong> All variables at the same time granularity (weekly preferred)</li>
<li><strong>Geographic alignment:</strong> National model first, then regional if sufficient variation exists</li>
<li><strong>Outlier treatment:</strong> Identify and handle holiday weeks, supply disruptions, COVID period</li>
<li><strong>Multicollinearity check:</strong> Personal and non-personal promotion often move together — VIF analysis is essential</li>
</ul>`},
    {id:"s3",content:`<h2 id="s3">Adstock & Carry-Over Effects</h2>
<p>Marketing activities have effects that persist beyond the week they occur. <strong>Adstock transformation</strong> models this carry-over effect by creating a decaying weighted average of current and past promotional activity.</p>
<h3>Adstock Formula</h3>
<pre><code class="language-python">def adstock_transform(x, decay_rate=0.7):
    """
    Apply geometric adstock transformation.
    decay_rate: how much of the effect carries over to the next period
                0 = no carry-over, 1 = infinite carry-over
    Typical values: 0.4-0.8 for pharma channels
    """
    adstocked = np.zeros(len(x))
    adstocked[0] = x[0]
    for i in range(1, len(x)):
        adstocked[i] = x[i] + decay_rate * adstocked[i-1]
    return adstocked

# Channel-specific decay rates (industry typical)
decay_rates = {
    'dtc_tv':       0.75,   # TV has long carry-over
    'detail_calls': 0.50,   # Personal details decay faster
    'samples':      0.30,   # Samples have shorter memory
    'digital':      0.40,   # Digital moderate carry-over
    'speaker_prog': 0.60,   # Speaker programs linger
}</code></pre>
<h3>Interpreting Carry-Over</h3>
<p>A decay rate of 0.7 means 70% of this week's effect carries into next week, 49% (0.7^2) into the week after, and so on. The <strong>half-life</strong> — the number of periods for the effect to halve — is calculated as: half-life = log(0.5) / log(decay_rate). For decay=0.7, half-life = 1.94 weeks.</p>
<div class="callout callout-tip"><div class="callout-title">Why Adstock Matters</div><p>Without adstock transformation, MMM attributes all impact to the week of spend, systematically underestimating channels with long carry-over (TV, speaker programs) and overestimating channels with short memory (email, digital ads). Getting adstock right can shift channel ROI estimates by 30-50%.</p></div>`},
    {id:"s4",content:`<h2 id="s4">Diminishing Returns & Saturation</h2>
<p>All marketing channels exhibit <strong>diminishing returns</strong> — each additional dollar of spend generates less incremental impact than the previous dollar. This is modeled using saturation curves.</p>
<h3>Common Saturation Functions</h3>
<pre><code class="language-python">import numpy as np

def hill_saturation(x, half_max, steepness):
    """
    Hill function for modeling saturation.
    half_max: spend level at which half the maximum effect is achieved
    steepness: shape parameter (higher = more S-curve, lower = more concave)
    """
    return x**steepness / (half_max**steepness + x**steepness)

def log_saturation(x, alpha=1.0):
    """Simple log transformation for diminishing returns."""
    return alpha * np.log(1 + x)

# Example: at $5M DTC spend, 80% of max effect achieved
# Doubling to $10M only gets to 92% — the incremental $5M yields only 12pp</code></pre>
<h3>Practical Implications</h3>
<p>Saturation analysis directly informs budget allocation:</p>
<ul>
<li><strong>Under-saturated channels:</strong> Additional spend generates strong incremental returns — increase investment</li>
<li><strong>Near-saturation channels:</strong> Spend is in the flat portion of the curve — reallocate dollars elsewhere</li>
<li><strong>Optimal allocation:</strong> Equalize marginal ROI across channels (allocate until the next dollar generates the same return everywhere)</li>
</ul>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Channel</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Current Spend</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Saturation %</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Marginal ROI</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Recommendation</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Field details</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">$40M</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">82%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">$1.20</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Flat/reduce</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">DTC TV</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">$25M</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">70%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">$2.50</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Increase</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Digital HCP</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">$5M</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">45%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">$4.00</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Increase significantly</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Speaker programs</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">$10M</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">75%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">$1.80</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Maintain</td></tr>
</tbody></table>`},
    {id:"s5",content:`<h2 id="s5">Channel Contribution & ROI</h2>
<p>The primary output of MMM is the <strong>due-to analysis</strong> — quantifying how many incremental prescriptions each channel generates and its return on investment.</p>
<h3>Due-To Decomposition</h3>
<p>Total incremental TRx is decomposed by channel. Each channel's contribution is calculated by comparing predicted sales with that channel's effect vs. without it (setting the channel's adstocked values to zero).</p>
<pre><code class="language-python">def channel_contribution(model, data, channel_col):
    """
    Calculate incremental TRx attributable to a specific channel.
    Sets channel to zero and measures the difference in predicted sales.
    """
    # Predicted with all channels
    pred_full = model.predict(data)

    # Predicted with channel zeroed out
    data_zeroed = data.copy()
    data_zeroed[channel_col] = 0
    pred_without = model.predict(data_zeroed)

    incremental = pred_full.sum() - pred_without.sum()
    roi = incremental * net_revenue_per_trx / channel_spend
    return {'incremental_trx': incremental, 'roi': roi}</code></pre>
<h3>ROI by Channel</h3>
<p>Channel ROI = (Incremental Revenue - Channel Cost) / Channel Cost. In pharma, typical ROI ranges are:</p>
<ul>
<li><strong>Sampling:</strong> 3-8x (high because samples directly drive trial)</li>
<li><strong>Speaker programs:</strong> 2-5x (peer influence is powerful but expensive)</li>
<li><strong>Field details:</strong> 1.5-4x (highest absolute contribution but expensive per touch)</li>
<li><strong>DTC advertising:</strong> 1.5-3x (broad reach but diluted impact per dollar)</li>
<li><strong>Digital HCP:</strong> 2-6x (low cost per touch, growing effectiveness)</li>
</ul>`},
    {id:"s6",content:`<h2 id="s6">Bayesian MMM Approaches</h2>
<p>Traditional frequentist MMM has significant limitations in pharma: limited data history, multicollinearity between channels, and inability to incorporate prior knowledge. <strong>Bayesian MMM</strong> addresses these through probabilistic modeling.</p>
<h3>Advantages of Bayesian MMM</h3>
<ul>
<li><strong>Informative priors:</strong> Incorporate domain knowledge (e.g., "TV ROI is typically 1.5-3x") as prior distributions, preventing implausible coefficient estimates</li>
<li><strong>Uncertainty quantification:</strong> Every parameter has a credible interval, not just a point estimate. Leadership sees the range of possible ROIs, not just the "best guess"</li>
<li><strong>Works with shorter data:</strong> Priors stabilize estimates when historical data is limited (e.g., post-launch brands with 18 months of data)</li>
<li><strong>Built-in adstock and saturation:</strong> Modern frameworks jointly estimate decay rates and saturation parameters</li>
</ul>
<h3>Modern Bayesian MMM Frameworks</h3>
<pre><code class="language-python"># Example using PyMC-Marketing (open source Bayesian MMM)
import pymc as pm
from pymc_marketing.mmm import DelayedSaturatedMMM

mmm = DelayedSaturatedMMM(
    date_column='week',
    channel_columns=['details', 'dtc_tv', 'digital', 'samples'],
    control_columns=['seasonality', 'competitor_nrx'],
    adstock_max_lag=8,  # max weeks of carry-over
)
mmm.fit(X=weekly_data, y=weekly_data['trx'])

# Posterior channel contributions with uncertainty
mmm.plot_channel_contribution_share_hdi()
# Budget optimization
mmm.optimize_budget(total_budget=80_000_000)</code></pre>
<div class="callout"><div class="callout-title">Industry Adoption</div><p>Google's Meridian, Meta's Robyn, and PyMC-Marketing are open-source Bayesian MMM frameworks gaining rapid adoption in pharma. They democratize what was previously a $500K+ consulting engagement into a reproducible, in-house capability.</p></div>`},
    {id:"s7",content:`<h2 id="s7">Pharma-Specific MMM Considerations</h2>
<p>Pharma MMM differs from CPG/retail MMM in several critical ways:</p>
<h3>Key Differences</h3>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Factor</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">CPG/Retail MMM</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Pharma MMM</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Decision maker</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Consumer</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">HCP (prescriber) + patient + payer</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Sales channel</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Direct to consumer</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Through prescriber and pharmacy</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Price sensitivity</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">High (promotions/coupons)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Low (insurance insulates)</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Personal selling</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Minimal</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Dominant channel (30-50% of spend)</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Regulation</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Light</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Heavy (fair balance, off-label restrictions)</td></tr>
</tbody></table>
<h3>Pharma MMM Pitfalls</h3>
<ul>
<li><strong>Sampling endogeneity:</strong> Samples are often given to high-volume prescribers, creating a spurious correlation. Instrumental variable approaches or Bayesian priors can mitigate this</li>
<li><strong>Payer confounding:</strong> Formulary status changes can dwarf promotional effects. Include formulary coverage as a control variable</li>
<li><strong>Indication expansion:</strong> Label expansions increase the addressable market independent of promotion. Model structural breaks at approval dates</li>
<li><strong>Multi-brand effects:</strong> Detailing one product in a portfolio may lift the entire portfolio. Consider umbrella or halo effects in multi-product models</li>
</ul>`},
    {id:"s8",content:`<h2 id="s8">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div><strong>MMM decomposes sales into base, promotional, and external drivers.</strong> Base sales (50-70% for established brands) represent the brand equity floor. Incremental sales from promotion are what the marketing budget is actually buying.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div><strong>Adstock transformation is essential for accurate channel attribution.</strong> Without it, channels with long carry-over (TV, speaker programs) are systematically undervalued, leading to suboptimal budget allocation.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div><strong>Optimize at the margin, not the average.</strong> Average ROI tells you the historical return. Marginal ROI tells you the return on the next dollar. Equalize marginal ROI across channels for optimal allocation.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div><strong>Bayesian MMM is the new standard.</strong> Open-source frameworks (PyMC-Marketing, Google Meridian) make Bayesian approaches accessible. The ability to incorporate priors and quantify uncertainty makes Bayesian MMM strictly superior for pharma applications with limited data.</div></div>`}
  ],
  questions:[
    {id:"q1",type:"mcq",difficulty:"Advanced",question:"An MMM shows field details with an adstock decay of 0.7 and digital with 0.3. What does this imply about budget timing?",options:[{id:"a",text:"Field details should be pulsed; digital should be continuous"},{id:"b",text:"Digital should be pulsed; field details can be more continuous due to longer carry-over"},{id:"c",text:"Both channels should be pulsed simultaneously"},{id:"d",text:"Decay rates do not affect timing decisions"}],correct:"b",explanation:"Higher decay (0.7 for details) means the effect persists longer, so the channel can tolerate gaps between bursts of activity. Lower decay (0.3 for digital) means the effect fades quickly, so continuous presence is needed or the effect drops to near zero. However, field details are often continuous for relationship reasons."},
    {id:"q2",type:"mcq",difficulty:"Advanced",question:"What is the primary advantage of Bayesian MMM over frequentist MMM in pharma?",options:[{id:"a",text:"It runs faster on larger datasets"},{id:"b",text:"It incorporates prior knowledge and quantifies uncertainty in all parameters"},{id:"c",text:"It eliminates the need for adstock transformation"},{id:"d",text:"It works without historical data"}],correct:"b",explanation:"Bayesian MMM allows incorporation of informative priors (domain knowledge about plausible ROI ranges) and produces credible intervals for every parameter. This is critical in pharma where data history is limited, channels are correlated, and leadership needs to understand the range of possible outcomes, not just point estimates."},
    {id:"q3",type:"mcq",difficulty:"Intermediate",question:"An MMM shows DTC TV at 70% saturation and digital HCP at 45% saturation. With $5M incremental budget, where should it go?",options:[{id:"a",text:"All to DTC TV because it has higher absolute contribution"},{id:"b",text:"All to digital HCP because it is further from saturation"},{id:"c",text:"Split equally between the two channels"},{id:"d",text:"Cannot determine without knowing marginal ROI curves"}],correct:"d",explanation:"Saturation percentage alone does not determine optimal allocation. You need the marginal ROI at current spend levels for each channel. Digital at 45% saturation likely has higher marginal ROI, but the absolute contribution per dollar depends on the shape of each channel's saturation curve and the revenue coefficient."},
    {id:"q4",type:"mcq",difficulty:"Intermediate",question:"In pharma MMM, why is sampling often endogenous and what problem does this create?",options:[{id:"a",text:"Samples expire quickly, creating measurement error"},{id:"b",text:"Samples are given to high-volume prescribers, inflating the estimated causal effect of sampling"},{id:"c",text:"Samples are regulated differently than other channels"},{id:"d",text:"Sample data is not available at the weekly level"}],correct:"b",explanation:"Samples are preferentially distributed to high-prescribing HCPs, creating reverse causality: HCPs receive more samples because they prescribe more, not necessarily the other way around. This endogeneity inflates the estimated ROI of sampling unless corrected through instrumental variables or Bayesian priors."},
    {id:"q5",type:"mcq",difficulty:"Advanced",question:"What percentage of total sales is typically attributable to base (non-promotional) factors for an established pharma brand?",options:[{id:"a",text:"10-20%"},{id:"b",text:"30-40%"},{id:"c",text:"50-70%"},{id:"d",text:"80-95%"}],correct:"c",explanation:"For established brands, base sales (driven by brand equity, disease prevalence, formulary position, and prescribing inertia) account for 50-70% of total sales. This means only 30-50% of sales are attributable to current promotional activity — a critical insight for budgeting and for understanding what happens if promotion is reduced."}
  ]
},


"2-6": {
  id:"2-6", title:"Launch Analytics", domain:"Commercial Analytics", domain_id:2,
  level:"Advanced", mins:65, available:true,
  tags:["Launch Analytics","Launch Curves","Early Signals","Analogue Benchmarking","Pull-Through","Launch Readiness"],
  objectives:["Conduct pre-launch competitive landscape and prescriber universe analysis","Define and track launch readiness KPIs across access, awareness, and adoption","Detect early launch signals from TRx ramp and prescriber breadth data","Benchmark launch performance against analogues","Analyze pull-through from formulary wins to actual prescriptions","Design launch dashboards for week 1, month 1, and quarter 1 tracking"],
  toc:[
    {id:"s1",title:"Pre-Launch Analytics",level:"h2"},
    {id:"s2",title:"Launch Readiness KPIs",level:"h2"},
    {id:"s3",title:"Early Launch Signal Detection",level:"h2"},
    {id:"s4",title:"Analogue Benchmarking",level:"h2"},
    {id:"s5",title:"Pull-Through Analytics",level:"h2"},
    {id:"s6",title:"Launch Dashboards",level:"h2"},
    {id:"s7",title:"Corrective Action Triggers",level:"h2"},
    {id:"s8",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Pre-Launch Analytics</h2>
<p>Pre-launch analytics creates the intelligence foundation for a successful launch. It should begin 12-18 months before anticipated approval, covering three domains:</p>
<h3>Competitive Landscape Assessment</h3>
<ul>
<li><strong>Current treatments:</strong> Market share by product, trend direction (growing/declining), prescriber concentration</li>
<li><strong>Unmet need quantification:</strong> Gap between current standard of care outcomes and your product's clinical profile</li>
<li><strong>Pipeline threats:</strong> Competitors in Phase III or filed for approval, expected timing and differentiation</li>
<li><strong>Payer landscape:</strong> Current class coverage, prior auth requirements, step therapy protocols</li>
</ul>
<h3>Prescriber Universe Identification</h3>
<pre><code class="language-sql">-- Identify launch target universe: HCPs treating the indication
SELECT
  npi,
  specialty,
  practice_state,
  SUM(CASE WHEN drug_class = 'target_class' THEN trx ELSE 0 END) AS class_trx,
  COUNT(DISTINCT CASE WHEN icd10 LIKE 'C34%' THEN patient_id END) AS indication_patients,
  NTILE(10) OVER (ORDER BY SUM(trx) DESC) AS volume_decile
FROM hcp_claims_summary
WHERE specialty IN ('Medical Oncology','Hematology/Oncology','Pulmonology')
GROUP BY npi, specialty, practice_state
HAVING class_trx > 0 OR indication_patients > 5;</code></pre>
<h3>Patient Identification</h3>
<p>For biomarker-driven therapies, pre-launch patient identification quantifies the addressable market: How many patients have the relevant biomarker? What percentage are currently tested? What is the gap between tested and treated?</p>`},
    {id:"s2",content:`<h2 id="s2">Launch Readiness KPIs</h2>
<p>Launch readiness is tracked across three dimensions — the "3 A's" — each with specific KPIs that must hit threshold levels before launch day.</p>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Dimension</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">KPI</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Target at Launch</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Measurement</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top" rowspan="3"><strong>Access</strong></td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Commercial lives covered</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">>60% unrestricted</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">MMIT formulary tracking</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Medicare Part D coverage</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">>50% of plans</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">CMS formulary files</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Specialty pharmacy network</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">3+ SP partners live</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Distribution contracts</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top" rowspan="2"><strong>Awareness</strong></td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Unaided brand awareness</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">>40% of target HCPs</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">ATU tracking survey</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Intent to prescribe</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">>25% "definitely/probably"</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">HCP survey</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top" rowspan="2"><strong>Adoption</strong></td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Field force trained & deployed</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">100%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Sales ops</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Hub/SP operational readiness</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Systems tested, staff trained</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Operational audit</td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">Access is the #1 Launch Predictor</div><p>Research consistently shows that payer access at launch is the strongest predictor of Year 1 revenue. Products launching with >70% unrestricted commercial access achieve 2-3x the first-year uptake of products launching with <50% access. Invest heavily in pre-launch payer engagement.</p></div>`},
    {id:"s3",content:`<h2 id="s3">Early Launch Signal Detection</h2>
<p>The first 4-8 weeks of a launch provide critical signals about trajectory. Monitoring these signals enables rapid course correction.</p>
<h3>Key Early Signals</h3>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Signal</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">What to Measure</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Green (On Track)</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Red (Action Needed)</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">TRx ramp</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Weekly TRx vs. analogue curve</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Within 80-120% of analogue</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><60% of analogue by week 8</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Prescriber breadth</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Unique HCPs writing Rx</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Growing 10-15% weekly</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Flat or declining after week 4</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">NRx/TRx ratio</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">New vs. total prescriptions</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">>70% in first quarter</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><50% (limited new patient starts)</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Refill rate</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">% of NRx converting to 2nd fill</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">>60% refill conversion</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><40% (high early discontinuation)</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">SP fulfillment</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Rx-to-dispense conversion rate</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">>75%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><50% (access/fulfillment barriers)</td></tr>
</tbody></table>
<p><strong>Prescriber breadth vs. depth:</strong> Early launches should show breadth expansion (more HCPs prescribing) rather than depth concentration (same HCPs writing more). A launch growing only through depth signals narrow adoption — typically early adopters without mainstream penetration.</p>`},
    {id:"s4",content:`<h2 id="s4">Analogue Benchmarking</h2>
<p>Analogue benchmarking compares your launch trajectory to relevant past launches. This is the most common method for evaluating whether a launch is on track.</p>
<h3>Building an Analogue Comparison</h3>
<pre><code class="language-python">import pandas as pd

def build_launch_curve(weekly_trx, launch_date):
    """
    Normalize weekly TRx to months-from-launch for comparison.
    """
    df = weekly_trx.copy()
    df['months_from_launch'] = (
        (df['week'] - launch_date).dt.days / 30.44
    ).round(0).astype(int)
    return df.groupby('months_from_launch')['trx'].sum().reset_index()

# Compare your launch to 3 analogues
analogues = {
    'Analogue A (fast ramp)': build_launch_curve(analogue_a, launch_a),
    'Analogue B (moderate)':  build_launch_curve(analogue_b, launch_b),
    'Analogue C (slow ramp)': build_launch_curve(analogue_c, launch_c),
    'Your Brand':             build_launch_curve(your_brand, your_launch),
}

# Calculate share of eventual peak at each timepoint
for name, curve in analogues.items():
    peak = curve['trx'].max()
    curve['pct_of_peak'] = (curve['trx'] / peak * 100).round(1)</code></pre>
<h3>Analogue Selection Best Practices</h3>
<ul>
<li>Select 3-5 analogues spanning the range of possible outcomes (best case to worst case)</li>
<li>Match on: therapeutic area, mechanism class, line of therapy, payer access at launch, competitive density</li>
<li>Adjust for era effects: launches in 2024 face different payer dynamics than 2015 launches</li>
<li>Use market share trajectory (not absolute volume) for cross-market comparisons</li>
</ul>`},
    {id:"s5",content:`<h2 id="s5">Pull-Through Analytics</h2>
<p><strong>Pull-through</strong> measures the conversion of formulary access into actual prescriptions. Having formulary coverage is necessary but not sufficient — prescribers must still choose your product and patients must fill the prescription.</p>
<h3>Pull-Through Rate Calculation</h3>
<pre><code class="language-sql">-- Pull-through: brand share in plans with access vs. without
SELECT
  access_status,
  COUNT(DISTINCT patient_id) AS patients,
  SUM(brand_trx) AS brand_trx,
  SUM(class_trx) AS class_trx,
  ROUND(100.0 * SUM(brand_trx) / NULLIF(SUM(class_trx), 0), 1)
    AS brand_share_pct
FROM (
  SELECT
    p.patient_id,
    p.brand_trx,
    p.class_trx,
    CASE
      WHEN f.formulary_status IN ('Preferred','Unrestricted') THEN 'Good Access'
      WHEN f.formulary_status = 'Prior Auth' THEN 'Restricted'
      ELSE 'No Coverage'
    END AS access_status
  FROM patient_rx p
  JOIN formulary_data f ON p.plan_id = f.plan_id
) sub
GROUP BY access_status;</code></pre>
<p>Typical pull-through dynamics:</p>
<ul>
<li><strong>Unrestricted access:</strong> 15-25% brand share (the baseline access benefit)</li>
<li><strong>Prior auth required:</strong> 5-12% brand share (PA friction reduces by 40-60%)</li>
<li><strong>Step therapy:</strong> 3-8% brand share (must fail first-line therapy first)</li>
<li><strong>Not covered:</strong> 1-3% brand share (only highly motivated prescribers persist)</li>
</ul>
<div class="callout callout-tip"><div class="callout-title">Pull-Through Gap Analysis</div><p>The gap between access and pull-through reveals execution opportunities. If you have 70% formulary access but only 12% share, the bottleneck is not access — it is awareness, preference, or operational friction (PA burden, SP fulfillment). This shifts investment from payer to HCP/patient channels.</p></div>`},
    {id:"s6",content:`<h2 id="s6">Launch Dashboards</h2>
<p>Launch dashboards should evolve through three phases, with different metrics prioritized at each stage:</p>
<h3>Week 1 Dashboard (Operational Focus)</h3>
<ul>
<li>Prescriptions written (any Rx, even if not yet dispensed)</li>
<li>Specialty pharmacy enrollment requests received</li>
<li>Hub call volume and benefit verification completions</li>
<li>Trade/wholesaler orders and stocking levels</li>
<li>Field force call activity: % of A-tier targets reached in week 1</li>
</ul>
<h3>Month 1 Dashboard (Trajectory Focus)</h3>
<ul>
<li>Weekly TRx trend vs. analogue benchmark</li>
<li>Unique prescribers (breadth) and scripts per prescriber (depth)</li>
<li>Rx-to-dispense conversion rate by SP</li>
<li>PA approval rate and average time-to-approval</li>
<li>Geographic heat map: regions performing vs. underperforming</li>
</ul>
<h3>Quarter 1 Dashboard (Strategic Focus)</h3>
<ul>
<li>Market share trend vs. forecast scenarios (base/upside/downside)</li>
<li>NRx/TRx ratio trend (should be declining as refill base builds)</li>
<li>Pull-through by payer segment</li>
<li>Competitive response: competitor detail frequency changes, defensive messaging</li>
<li>Patient persistence: first refill conversion rate</li>
<li>Revenue vs. plan with GTN reconciliation</li>
</ul>`},
    {id:"s7",content:`<h2 id="s7">Corrective Action Triggers</h2>
<p>Launch analytics is only valuable if signals trigger action. Define clear thresholds that automatically escalate issues and initiate response protocols.</p>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Signal</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Trigger Threshold</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Corrective Action</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Low prescriber breadth</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><50 unique prescribers by month 1</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Accelerate speaker programs, peer-to-peer education, expand call plan</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">High PA denial rate</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">>30% PA denials</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Rapid payer outreach, appeals support, letter of medical necessity templates</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Low refill conversion</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><50% first-to-second fill</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Investigate side effects, copay burden; activate nurse educator program</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">SP fulfillment lag</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">>7 day avg Rx-to-ship time</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">SP operational review, process re-engineering, add SP capacity</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Below-analogue ramp</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><60% of worst analogue by Q1</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Strategic review: reassess positioning, messaging, and target definition</td></tr>
</tbody></table>`},
    {id:"s8",content:`<h2 id="s8">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div><strong>Payer access at launch is the #1 predictor of Year 1 success.</strong> Products with >70% unrestricted access achieve 2-3x the first-year uptake of restricted products. Pre-launch payer engagement is the highest-ROI investment.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div><strong>Monitor breadth before depth.</strong> Early launch growth should come from more HCPs prescribing (breadth), not the same HCPs writing more (depth). Breadth-driven growth signals mainstream adoption.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div><strong>Pull-through analysis reveals the true bottleneck.</strong> If access is good but share is low, the problem is not payers — it is awareness, preference, or operational friction. Diagnose correctly before investing.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div><strong>Define corrective action triggers before launch.</strong> Pre-agreed thresholds and response protocols enable rapid course correction. Waiting for quarterly business reviews to identify problems can cost 3-6 months of launch trajectory.</div></div>`}
  ],
  questions:[
    {id:"q1",type:"mcq",difficulty:"Advanced",question:"A launch shows strong TRx growth in month 1 but prescriber breadth is flat (same 30 HCPs). What does this signal?",options:[{id:"a",text:"The launch is on track — volume is growing"},{id:"b",text:"Early adopter concentration — growth is depth-driven and may plateau without broader adoption"},{id:"c",text:"The product has a narrow label and this pattern is expected"},{id:"d",text:"The sales force is not executing the call plan"}],correct:"b",explanation:"Volume growth from the same prescribers (depth without breadth) is a warning signal. Early adopters are increasing their use, but the product is not gaining new prescribers. This pattern often leads to a plateau once early adopters reach their maximum prescribing. Action: expand speaker programs and peer-to-peer education to drive breadth."},
    {id:"q2",type:"mcq",difficulty:"Intermediate",question:"What is the most critical launch readiness KPI that predicts Year 1 commercial success?",options:[{id:"a",text:"DTC advertising spend"},{id:"b",text:"Field force size"},{id:"c",text:"Payer access (% unrestricted commercial lives)"},{id:"d",text:"Number of KOLs engaged"}],correct:"c",explanation:"Multiple analyses show payer access at launch is the strongest single predictor of first-year revenue. Without coverage, even the best clinical data and field force execution cannot overcome the access barrier. Target >60-70% unrestricted commercial lives at launch."},
    {id:"q3",type:"mcq",difficulty:"Intermediate",question:"In a launch pull-through analysis, brand share is 20% in plans with unrestricted access and 6% in plans requiring prior authorization. What is the PA friction factor?",options:[{id:"a",text:"14 percentage points"},{id:"b",text:"70% reduction"},{id:"c",text:"30% of potential"},{id:"d",text:"Both A and B are correct descriptions"}],correct:"d",explanation:"The PA friction can be expressed as: absolute reduction of 14pp (20% - 6%), or a 70% relative reduction (14/20 = 70%). Both descriptions are correct and useful. The absolute measure helps quantify lost scripts; the relative measure helps forecast impact of removing PA restrictions."},
    {id:"q4",type:"mcq",difficulty:"Advanced",question:"A specialty launch has 85% SP Rx-to-dispense conversion and 8-day average time-to-ship. Which metric needs attention?",options:[{id:"a",text:"Rx-to-dispense conversion (too low)"},{id:"b",text:"Time-to-ship (too slow)"},{id:"c",text:"Both metrics are within acceptable range"},{id:"d",text:"Both metrics need improvement"}],correct:"b",explanation:"85% Rx-to-dispense is solid (benchmark >75%). However, 8-day average time-to-ship exceeds the 7-day threshold — every day of delay is a day the patient waits, risking abandonment. SP operational efficiency should be investigated. Target: <5 days for established SPs."},
    {id:"q5",type:"mcq",difficulty:"Intermediate",question:"At what point should a launch team convene a strategic review if the TRx trajectory is below benchmark?",options:[{id:"a",text:"End of Year 1"},{id:"b",text:"When below 60% of worst analogue by end of Q1"},{id:"c",text:"Only if market share is below 5%"},{id:"d",text:"After 24 months of data accumulation"}],correct:"b",explanation:"If a launch is below 60% of even the worst-performing analogue by the end of Q1, something fundamental may be wrong — positioning, target definition, access, or competitive dynamics. Waiting longer just burns resources. Q1 provides enough data for a meaningful strategic reassessment."}
  ]
},


"2-7": {
  id:"2-7", title:"Gross-to-Net (GTN) Analytics", domain:"Commercial Analytics", domain_id:2,
  level:"Advanced", mins:55, available:true,
  tags:["Gross-to-Net","GTN","Rebates","Chargebacks","340B","WAC","Net Price"],
  objectives:["Map the complete GTN waterfall from WAC to net sales","Identify and quantify each deduction category","Analyze payer mix and channel mix impact on GTN","Forecast GTN deductions and perform true-up analysis","Understand Medicaid best price, AMP, and 340B implications","Track KPIs including net price realization and GTN spread"],
  toc:[
    {id:"s1",title:"The GTN Waterfall",level:"h2"},
    {id:"s2",title:"Deduction Categories Deep Dive",level:"h2"},
    {id:"s3",title:"Payer Mix & Channel Mix Impact",level:"h2"},
    {id:"s4",title:"Forecasting GTN Deductions",level:"h2"},
    {id:"s5",title:"Medicaid, AMP & 340B Analytics",level:"h2"},
    {id:"s6",title:"GTN True-Up Process",level:"h2"},
    {id:"s7",title:"KPIs & Monitoring",level:"h2"},
    {id:"s8",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">The GTN Waterfall</h2>
<p><strong>Gross-to-Net (GTN)</strong> represents the difference between a drug's list price (WAC) and the actual net revenue the manufacturer receives after all deductions. Understanding GTN is essential because it determines the true economics of every prescription.</p>
<h3>The Standard GTN Waterfall</h3>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Line Item</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Description</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Example ($1000 WAC)</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">WAC (List Price)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Wholesale Acquisition Cost</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">$1,000</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">- Distribution fees</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Wholesaler service fees (2-5%)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">($35)</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">- Chargebacks</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Diff between WAC and contracted price</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">($120)</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">- Commercial rebates</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">PBM/payer negotiated rebates</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">($200)</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">- Medicaid rebates</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Statutory + supplemental rebates</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">($130)</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">- Medicare Part D</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Coverage gap discount (70%)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">($80)</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">- Copay assistance</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Copay cards, free goods</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">($50)</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">- Returns/other</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Product returns, admin fees</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">($15)</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>= Net Sales</strong></td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>Actual revenue realized</strong></td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>$370</strong></td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">GTN Reality Check</div><p>For branded specialty drugs, GTN deductions typically consume 30-60% of WAC. For products with heavy Medicaid and 340B exposure, net realization can drop below 40%. The GTN spread has been widening industry-wide at 1-3 percentage points per year, eroding pricing power even when WAC increases.</p></div>`},
    {id:"s2",content:`<h2 id="s2">Deduction Categories Deep Dive</h2>
<h3>Chargebacks</h3>
<p>When a manufacturer sells to a wholesaler at WAC but has a lower contracted price with an end customer (e.g., hospital, GPO, 340B entity), the wholesaler sells at the contracted price and invoices the manufacturer for the difference. Chargebacks are the largest GTN component for hospital/institutional products.</p>
<h3>Commercial Rebates</h3>
<p>Rebates paid to PBMs and commercial payers in exchange for favorable formulary positioning. Structured as % of WAC, often tiered based on market share performance. A typical structure:</p>
<ul>
<li><strong>Base rebate:</strong> 15-25% of WAC for preferred tier placement</li>
<li><strong>Market share tier:</strong> Additional 5-10% if brand achieves >40% class share within the plan</li>
<li><strong>Exclusive positioning:</strong> Additional 10-15% for sole preferred status</li>
</ul>
<h3>Medicaid Rebates</h3>
<p>Statutory rebate = greater of (23.1% of AMP) or (AMP - Best Price). States may negotiate supplemental rebates on top. Medicaid rebates are the deepest mandatory discounts in the US system.</p>
<h3>Copay Assistance</h3>
<p>Manufacturer-funded copay cards reduce patient out-of-pocket costs. While they improve adherence and volume, they represent a GTN deduction. Average copay card utilization rates range from 30-70% of commercially insured patients. The IRA's Medicare copay cap at $2,000/year is shifting some copay card economics.</p>
<h3>Returns</h3>
<p>Pharmaceutical returns are typically allowed within 6 months before to 12 months after product expiration. Return reserves of 1-3% of gross sales are standard for most products; higher for products approaching LOE.</p>`},
    {id:"s3",content:`<h2 id="s3">Payer Mix & Channel Mix Impact</h2>
<p>GTN varies dramatically by payer type because each payer channel has different discount requirements:</p>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Payer Channel</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Typical Discount %</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Key Drivers</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Commercial (PBM)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">25-45%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Rebates, copay assistance</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Medicare Part D</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">40-55%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Coverage gap discount, rebates, IRA negotiation</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Medicaid</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">50-70%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Statutory rebate, supplemental, best price</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">340B</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">25-50% (of AMP)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Ceiling price = AMP - statutory rebate</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">VA/DoD (FSS)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">40-60%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Federal ceiling price, additional negotiation</td></tr>
</tbody></table>
<p><strong>Channel mix shift impact:</strong> If your patient population shifts from 60% commercial / 20% Medicare / 20% Medicaid to 50% commercial / 25% Medicare / 25% Medicaid, your blended GTN will increase by 3-5 percentage points — even with no pricing changes. This "mix erosion" is a silent margin killer.</p>
<div class="callout callout-tip"><div class="callout-title">340B Growth Impact</div><p>The 340B program has expanded dramatically — participating entities now account for an estimated 8-12% of US drug purchases. Since 340B entities receive drugs at ceiling price (approximately AMP minus statutory rebate), any growth in 340B utilization directly erodes GTN. Track 340B unit share as a leading indicator of GTN pressure.</p></div>`},
    {id:"s4",content:`<h2 id="s4">Forecasting GTN Deductions</h2>
<p>GTN forecasting is among the most complex analytical tasks in pharma because each deduction line has different drivers, timing, and uncertainty profiles.</p>
<h3>GTN Forecasting Framework</h3>
<pre><code class="language-python">def forecast_gtn(units_by_channel, wac, rebate_rates, other_deductions):
    """
    Forecast GTN deductions by channel and category.
    """
    gross_sales = sum(units * wac for channel, units in units_by_channel.items())

    deductions = {}
    for channel, units in units_by_channel.items():
        channel_gross = units * wac
        deductions[channel] = {
            'rebates': channel_gross * rebate_rates[channel]['rebate'],
            'chargebacks': channel_gross * rebate_rates[channel]['chargeback'],
            'copay': channel_gross * rebate_rates[channel]['copay'],
            'distribution': channel_gross * rebate_rates[channel]['dist_fee'],
        }

    total_deductions = sum(
        sum(cats.values()) for cats in deductions.values()
    )
    net_sales = gross_sales - total_deductions
    gtn_pct = total_deductions / gross_sales * 100

    return {
        'gross_sales': gross_sales,
        'total_deductions': total_deductions,
        'net_sales': net_sales,
        'gtn_pct': round(gtn_pct, 1)
    }</code></pre>
<h3>Key Forecasting Inputs</h3>
<ul>
<li><strong>Unit forecast by channel:</strong> Commercial, Medicare, Medicaid, 340B, VA/DoD — from demand planning</li>
<li><strong>Contract terms:</strong> Rebate rates by payer, chargeback schedules, copay card program design</li>
<li><strong>Mix assumptions:</strong> Expected channel mix shifts (e.g., aging population shifting commercial to Medicare)</li>
<li><strong>Regulatory changes:</strong> IRA drug price negotiation, Medicaid rebate formula changes</li>
</ul>`},
    {id:"s5",content:`<h2 id="s5">Medicaid, AMP & 340B Analytics</h2>
<h3>Average Manufacturer Price (AMP)</h3>
<p>AMP is the average price paid to manufacturers by wholesalers for drugs distributed to retail community pharmacies. AMP is the foundation for Medicaid rebate calculations and 340B ceiling prices.</p>
<p><strong>AMP Calculation:</strong> AMP = (Total revenue from retail sales to wholesalers) / (Total units sold to retail wholesalers), net of certain discounts and rebates.</p>
<h3>Medicaid Best Price</h3>
<p><strong>Best Price</strong> is the lowest price available to any wholesaler, retailer, provider, HMO, or nonprofit entity (with certain exclusions). Best Price triggers are critical to monitor because any discount to one customer can set the floor for Medicaid rebates.</p>
<p>Excluded from Best Price: 340B, VA/DoD, state pharmaceutical assistance programs, certain nominal pricing.</p>
<h3>340B Program Analytics</h3>
<p>The 340B ceiling price = AMP - unit rebate amount (URA). For brands with high AMP and high Medicaid rebate, the 340B ceiling price can be pennies on the dollar.</p>
<pre><code class="language-python"># 340B ceiling price calculation
amp = 500.00  # Average Manufacturer Price
statutory_rebate_pct = 0.231  # 23.1% for branded drugs
ura = max(amp * statutory_rebate_pct, amp - best_price)
ceiling_price = amp - ura
# If AMP=$500 and best_price=$350: URA = max($115.50, $150) = $150
# Ceiling price = $500 - $150 = $350</code></pre>
<div class="callout"><div class="callout-title">Best Price Vigilance</div><p>A single contract error that sets an anomalously low price can trigger Best Price, cascading through Medicaid rebates for every unit dispensed. Best Price monitoring requires cross-functional coordination between pricing, contracting, trade, and legal teams.</p></div>`},
    {id:"s6",content:`<h2 id="s6">GTN True-Up Process</h2>
<p>GTN deductions are initially recorded as <strong>accruals</strong> (estimates) because actual rebate claims arrive months after the prescription is dispensed. The <strong>true-up</strong> process reconciles accruals against actual payments.</p>
<h3>True-Up Timeline</h3>
<ol>
<li><strong>Month 0:</strong> Prescription dispensed. Revenue recorded at gross price less estimated GTN accrual</li>
<li><strong>Months 1-3:</strong> Chargebacks and distribution fees arrive and are matched against accrual</li>
<li><strong>Months 3-6:</strong> Commercial rebate claims from PBMs arrive (quarterly billing cycle)</li>
<li><strong>Months 6-9:</strong> Medicaid rebate invoices arrive (states bill quarterly with lag)</li>
<li><strong>Months 9-12:</strong> Year-end true-up reconciles all channels; GTN accrual adjusted</li>
</ol>
<h3>Accrual Accuracy Monitoring</h3>
<p>Key metrics for GTN accrual health:</p>
<ul>
<li><strong>Accrual-to-payment ratio:</strong> Should be 0.95-1.05 (within 5% of actual payments)</li>
<li><strong>Aged accrual balance:</strong> Accruals older than 12 months that have not been matched to claims — investigate for potential write-offs or missed claims</li>
<li><strong>Channel-level variance:</strong> Identify which payer channels have the most accrual error to improve estimation models</li>
</ul>`},
    {id:"s7",content:`<h2 id="s7">KPIs & Monitoring</h2>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">KPI</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Formula</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Target</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Action if Out of Range</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Net price realization</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Net sales / Gross sales</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Stable or improving YoY</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Investigate channel mix shifts, contract terms</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">GTN spread</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Total deductions / Gross sales</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><50% for most branded specialty</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Review 340B exposure, Medicaid share</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Net price per unit</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Net sales / Units</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">In line with forecast</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Reconcile channel/payer mix assumptions</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Accrual accuracy</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Accrual / Actual payments</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">0.95-1.05</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Refine estimation methodology</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">340B unit share</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">340B units / Total units</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Monitor trend; flag if >15%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Assess contract pharmacy exposure</td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">GTN Trend is What Matters</div><p>A single point-in-time GTN percentage is less important than the trend. A GTN spread expanding by 2+ percentage points per year signals structural erosion that will compound over time. Brands approaching LOE may see GTN expand 5-10 points as payers extract pre-generic concessions.</p></div>`},
    {id:"s8",content:`<h2 id="s8">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div><strong>GTN typically consumes 30-60% of WAC for branded specialty drugs.</strong> Net price — not list price — determines actual revenue. Every commercial decision must be evaluated at net price economics.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div><strong>Channel mix shifts silently erode margins.</strong> A population shift from commercial to Medicare/Medicaid increases GTN by 3-5 percentage points without any contract changes. Monitor payer mix monthly.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div><strong>Best Price is a landmine.</strong> A single below-market contract can trigger Best Price, cascading into higher Medicaid rebates on every unit. Rigorous cross-functional price governance is non-negotiable.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div><strong>340B is a growing GTN pressure.</strong> Track 340B unit share as a leading indicator. With contract pharmacy expansion, 340B exposure can grow 2-3 percentage points per year for drugs used in 340B-eligible settings.</div></div>`}
  ],
  questions:[
    {id:"q1",type:"mcq",difficulty:"Advanced",question:"A brand has WAC of $800 per unit, AMP of $600, and Best Price of $400. What is the Medicaid unit rebate amount (URA)?",options:[{id:"a",text:"$138.60 (23.1% of AMP)"},{id:"b",text:"$200 (AMP - Best Price)"},{id:"c",text:"$184.80 (23.1% of WAC)"},{id:"d",text:"$400 (Best Price itself)"}],correct:"b",explanation:"URA = greater of (23.1% of AMP) or (AMP - Best Price). 23.1% of $600 = $138.60. AMP - Best Price = $600 - $400 = $200. Since $200 > $138.60, the URA is $200. Best Price inflates the rebate — highlighting why Best Price management is critical."},
    {id:"q2",type:"mcq",difficulty:"Intermediate",question:"A brand's payer mix shifts from 65% commercial / 35% government to 55% commercial / 45% government. Assuming commercial GTN is 35% and government GTN is 55%, what happens to blended GTN?",options:[{id:"a",text:"GTN decreases by 2 percentage points"},{id:"b",text:"GTN increases by approximately 2 percentage points"},{id:"c",text:"GTN remains unchanged"},{id:"d",text:"GTN increases by approximately 5 percentage points"}],correct:"b",explanation:"Old blended GTN: (0.65 x 35%) + (0.35 x 55%) = 22.75% + 19.25% = 42.0%. New blended GTN: (0.55 x 35%) + (0.45 x 55%) = 19.25% + 24.75% = 44.0%. GTN increases by 2.0 percentage points due to mix shift alone."},
    {id:"q3",type:"mcq",difficulty:"Intermediate",question:"Why are GTN deductions initially recorded as accruals rather than actual amounts?",options:[{id:"a",text:"To overstate revenue for financial reporting"},{id:"b",text:"Because actual rebate claims arrive months after dispensing, requiring estimation at the time of sale"},{id:"c",text:"Accruals are required by FDA regulations"},{id:"d",text:"To simplify accounting during busy periods"}],correct:"b",explanation:"Revenue must be recognized at the time of sale (ASC 606), but rebate claims from PBMs, Medicaid, and other payers arrive 3-12 months later. Companies estimate (accrue) the expected deductions at the time of sale, then true-up when actual claims arrive. Accrual accuracy is a critical financial control."},
    {id:"q4",type:"mcq",difficulty:"Advanced",question:"The 340B ceiling price for a drug is calculated as AMP minus URA. If a brand has high Medicaid rebates (high URA), what happens to 340B economics?",options:[{id:"a",text:"340B ceiling price increases, improving manufacturer margins"},{id:"b",text:"340B ceiling price decreases further, deepening the discount for 340B entities"},{id:"c",text:"340B ceiling price is not affected by Medicaid rebates"},{id:"d",text:"340B entities pay WAC regardless of ceiling price"}],correct:"b",explanation:"Ceiling price = AMP - URA. Higher URA (from higher Medicaid rebates) means a lower ceiling price for 340B entities. This creates a compounding effect: products with deep Medicaid discounts also have very deep 340B discounts, sometimes approaching penny pricing."},
    {id:"q5",type:"mcq",difficulty:"Intermediate",question:"A brand's GTN spread expanded from 42% to 48% over 3 years with no WAC changes. What is the most likely cause?",options:[{id:"a",text:"Increased unit volume"},{id:"b",text:"Channel mix shift toward higher-discount payer segments and/or 340B growth"},{id:"c",text:"Improved manufacturing efficiency"},{id:"d",text:"Loss of patent protection"}],correct:"b",explanation:"With no WAC changes, GTN spread expansion is almost always driven by channel mix shift (more units through government and 340B channels, which carry deeper discounts) and/or contractual rebate increases from payer negotiations. This is the most common form of silent margin erosion in pharma."}
  ]
},


"2-8": {
  id:"2-8", title:"Omnichannel Analytics", domain:"Commercial Analytics", domain_id:2,
  level:"Intermediate", mins:55, available:true,
  tags:["Omnichannel","Attribution","NBA","Digital Analytics","Personalization","CRM Analytics"],
  objectives:["Design omnichannel engagement strategies across field, digital, and patient channels","Implement attribution models from first-touch to multi-touch","Build next best action (NBA) recommendation models","Measure digital channel effectiveness and content performance","Analyze channel preferences by HCP segment","Create measurement frameworks for omnichannel programs"],
  toc:[
    {id:"s1",title:"Omnichannel Strategy in Pharma",level:"h2"},
    {id:"s2",title:"Customer Journey Orchestration",level:"h2"},
    {id:"s3",title:"Attribution Modeling",level:"h2"},
    {id:"s4",title:"Next Best Action (NBA) Models",level:"h2"},
    {id:"s5",title:"Digital Channel Analytics",level:"h2"},
    {id:"s6",title:"Personalization & Content Effectiveness",level:"h2"},
    {id:"s7",title:"Measurement Framework",level:"h2"},
    {id:"s8",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Omnichannel Strategy in Pharma</h2>
<p><strong>Omnichannel</strong> in pharma means delivering a coordinated, consistent experience across all HCP and patient touchpoints — field sales, medical affairs, digital marketing, patient support, and remote engagement. Unlike "multichannel" (which simply means using multiple channels), omnichannel implies <em>orchestration</em>: each interaction builds on the last, regardless of channel.</p>
<h3>The Channel Landscape</h3>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Channel Category</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Specific Channels</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Audience</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Personal (field)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">In-person detail, lunch & learn, speaker programs</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">HCP</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Remote/virtual</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Virtual details, video calls, telemedicine</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">HCP</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Digital HCP</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Email, HCP portal, webinars, Doximity, medical apps</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">HCP</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">DTC</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">TV, social media, search, patient websites</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Patient/caregiver</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Patient support</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Hub services, nurse educators, copay cards</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Patient</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Medical</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">MSL visits, medical congresses, publications</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">KOL/HCP</td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">Why Omnichannel Matters Now</div><p>Post-COVID, only ~50% of HCPs are accessible for in-person visits (down from ~70%). The average HCP engages with 3-4 pharmaceutical channels. Brands that coordinate across channels see 20-40% higher engagement rates than those running siloed campaigns.</p></div>`},
    {id:"s2",content:`<h2 id="s2">Customer Journey Orchestration</h2>
<p>Journey orchestration maps the ideal sequence of touchpoints for each HCP segment and uses rules or AI to deliver the right message, through the right channel, at the right time.</p>
<h3>Orchestration Design Principles</h3>
<ol>
<li><strong>Define customer segments:</strong> High-value accessible, high-value restricted, medium-value digital-first, low-value maintenance</li>
<li><strong>Map ideal journeys:</strong> For each segment, design the optimal sequence of touchpoints over a 6-month cycle</li>
<li><strong>Set trigger rules:</strong> Define events that trigger specific actions (e.g., "If HCP opens email but does not schedule virtual detail within 7 days, trigger rep follow-up")</li>
<li><strong>Implement suppression rules:</strong> Prevent over-communication (e.g., no more than 3 digital touches per week, no email within 48 hours of a field visit)</li>
</ol>
<h3>Example Journey: High-Value Restricted HCP</h3>
<p>Month 1: Approved email with new clinical data. Month 1 (week 2): If opened, send webinar invitation. Month 2: Webinar attendance (or recording access). Month 2 (week 3): Rep-triggered email with discussion guide. Month 3: Virtual detail request. Month 4: Peer-to-peer speaker program invitation. Month 5: Congress follow-up content. Month 6: Satisfaction pulse survey.</p>`},
    {id:"s3",content:`<h2 id="s3">Attribution Modeling</h2>
<p><strong>Attribution</strong> assigns credit for a prescribing outcome to the marketing touchpoints that influenced it. This is critical for understanding which channels and sequences drive results.</p>
<h3>Attribution Models</h3>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Model</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">How Credit is Assigned</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Pros</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Cons</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">First touch</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">100% to first interaction</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Simple; values awareness</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Ignores conversion channels</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Last touch</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">100% to last interaction before Rx</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Simple; values conversion</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Ignores awareness channels</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Linear</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Equal credit to all touchpoints</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Fair across channels</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">No differentiation of impact</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Time decay</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">More credit to recent interactions</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Reflects recency bias</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Undervalues early touches</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Data-driven (Shapley/Markov)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Algorithmically determined from data</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Most accurate</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Requires large data, complex</td></tr>
</tbody></table>
<pre><code class="language-python"># Shapley value attribution example
from itertools import combinations

def shapley_attribution(channels, conversion_fn):
    """
    Calculate Shapley values for each channel's contribution to conversion.
    conversion_fn: returns conversion rate for a given set of channels
    """
    n = len(channels)
    shapley = {c: 0 for c in channels}

    for channel in channels:
        for size in range(n):
            for subset in combinations([c for c in channels if c != channel], size):
                subset_set = set(subset)
                marginal = (conversion_fn(subset_set | {channel})
                           - conversion_fn(subset_set))
                weight = (factorial(size) * factorial(n - size - 1)) / factorial(n)
                shapley[channel] += weight * marginal

    return shapley</code></pre>`},
    {id:"s4",content:`<h2 id="s4">Next Best Action (NBA) Models</h2>
<p><strong>Next Best Action</strong> models recommend the optimal next touchpoint for each HCP based on their current engagement state, preferences, and predicted response. NBA moves from calendar-driven campaigns to real-time, individualized engagement.</p>
<h3>NBA Model Architecture</h3>
<ol>
<li><strong>Customer state:</strong> Current engagement level, recent interactions, prescribing behavior, digital activity</li>
<li><strong>Action candidates:</strong> Field visit, email, webinar invite, sample, speaker program invite, virtual detail</li>
<li><strong>Response prediction:</strong> For each action, predict the probability of positive engagement (e.g., email open, appointment acceptance, prescribing lift)</li>
<li><strong>Action selection:</strong> Choose the action with highest expected value, subject to business rules (frequency caps, compliance, rep availability)</li>
</ol>
<h3>Implementation Approach</h3>
<pre><code class="language-python"># Simplified NBA scoring
def score_next_action(hcp_features, candidate_actions, response_model):
    """
    Score each candidate action for an HCP and return ranked recommendations.
    """
    scores = []
    for action in candidate_actions:
        features = {**hcp_features, 'action_type': action['type'],
                     'days_since_last_touch': action['recency']}
        prob = response_model.predict_proba(features)[1]
        expected_value = prob * action['impact_if_positive']
        scores.append({
            'action': action['type'],
            'probability': round(prob, 3),
            'expected_value': round(expected_value, 2)
        })
    return sorted(scores, key=lambda x: -x['expected_value'])</code></pre>
<div class="callout callout-tip"><div class="callout-title">NBA Success Factors</div><p>NBA models are only as good as the data feeding them. Critical inputs: CRM call notes, email engagement data, digital activity logs, prescribing data (with 2-4 week lag). Integration across Veeva CRM, marketing automation (SFMC, Marketo), and prescribing data is the technical prerequisite.</p></div>`},
    {id:"s5",content:`<h2 id="s5">Digital Channel Analytics</h2>
<p>Each digital channel has specific metrics that indicate engagement quality:</p>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Channel</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Key Metrics</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Pharma Benchmark</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Approved email</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Open rate, click rate, unsubscribe</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">20-30% open, 3-5% click</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">HCP webinar</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Registration, attendance, duration</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">40-60% of registrants attend</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Brand portal</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Unique visitors, page views, time on site</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Avg 3-5 min session</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Paid social (HCP)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Impressions, engagement rate, CTR</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">0.5-1.5% CTR</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Programmatic display</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Viewability, CTR, frequency cap</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">0.1-0.3% CTR</td></tr>
</tbody></table>
<h3>Content Effectiveness</h3>
<p>Beyond channel metrics, content analytics measures which specific messages and assets resonate:</p>
<ul>
<li><strong>Content A/B testing:</strong> Test subject lines, visual assets, clinical data framing</li>
<li><strong>Content-to-prescribing correlation:</strong> HCPs who engaged with specific content and subsequently changed prescribing behavior</li>
<li><strong>Message recall:</strong> Survey-based measurement of which key messages HCPs remember from promotional materials</li>
</ul>`},
    {id:"s6",content:`<h2 id="s6">Personalization & Content Effectiveness</h2>
<p>Personalization goes beyond inserting the HCP's name into an email. True personalization tailors the content, channel, timing, and message to each HCP's clinical interests and engagement patterns.</p>
<h3>Personalization Levels</h3>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Level</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Description</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Example</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Basic</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Name, specialty, location</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">"Dr. Smith, oncology update..."</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Behavioral</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Based on past engagement</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Webinar follow-up with related content</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Prescribing-driven</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Based on Rx patterns</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Competitive switch messaging to high-competitor HCPs</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Predictive</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">AI-driven content recommendation</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">NBA model selects optimal content asset</td></tr>
</tbody></table>
<h3>Channel Preference by HCP Segment</h3>
<p>Channel preference analysis reveals that HCP segments have distinctly different engagement patterns:</p>
<ul>
<li><strong>Academic KOLs:</strong> Prefer congress, publications, MSL engagement; lower digital engagement</li>
<li><strong>Community specialists:</strong> Balanced field + digital; open to speaker programs</li>
<li><strong>Digital-first HCPs:</strong> Prefer email, webinars, portal content; restrict in-person access</li>
<li><strong>High-access HCPs:</strong> Accessible for field details; respond to samples and lunch programs</li>
</ul>`},
    {id:"s7",content:`<h2 id="s7">Measurement Framework</h2>
<p>An omnichannel measurement framework must connect channel-level metrics to business outcomes:</p>
<h3>Three-Tier Measurement Model</h3>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Tier</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Metrics</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Cadence</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>1. Activity</strong></td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Emails sent, calls made, webinars held, portal visits</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Weekly</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>2. Engagement</strong></td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Open rates, attendance, content downloads, NPS</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Monthly</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>3. Outcomes</strong></td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">NRx lift, market share change, attributed Rx</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Quarterly</td></tr>
</tbody></table>
<h3>Omnichannel Engagement Score</h3>
<p>A composite <strong>Omnichannel Engagement Score (OES)</strong> aggregates all touchpoints into a single metric per HCP:</p>
<pre><code class="language-python">def omnichannel_engagement_score(hcp_interactions):
    """
    Calculate composite engagement score from all channel interactions.
    """
    weights = {
        'field_detail': 10, 'virtual_detail': 7, 'speaker_attend': 8,
        'email_open': 1, 'email_click': 3, 'webinar_attend': 6,
        'portal_visit': 2, 'sample_request': 5, 'congress_attend': 9
    }
    score = sum(
        count * weights.get(interaction_type, 1)
        for interaction_type, count in hcp_interactions.items()
    )
    return min(score, 100)  # cap at 100</code></pre>
<div class="callout"><div class="callout-title">The Integration Challenge</div><p>The #1 barrier to omnichannel analytics is data integration. Veeva CRM (field), SFMC/Marketo (email), web analytics (portal), and prescribing data (IQVIA) typically live in separate systems. A unified customer data platform (CDP) that links all touchpoints to the HCP master is the technical prerequisite for effective omnichannel measurement.</p></div>`},
    {id:"s8",content:`<h2 id="s8">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div><strong>Omnichannel means orchestration, not just multiple channels.</strong> The value is in coordinating touchpoints so each builds on the last. Running field, digital, and patient channels independently is multichannel, not omnichannel.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div><strong>Data-driven attribution outperforms rule-based models.</strong> Shapley value and Markov chain attribution use actual data to determine each channel's marginal contribution, avoiding the biases inherent in first-touch or last-touch attribution.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div><strong>NBA models are the future of HCP engagement.</strong> Shifting from calendar-driven campaigns to real-time, individualized recommendations increases engagement rates 20-40%. The prerequisite is integrated data across CRM, marketing automation, and prescribing databases.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div><strong>Connect engagement metrics to prescribing outcomes.</strong> Email open rates and webinar attendance are intermediate metrics. The ultimate measurement is whether omnichannel engagement drives incremental prescriptions and market share growth.</div></div>`}
  ],
  questions:[
    {id:"q1",type:"mcq",difficulty:"Intermediate",question:"What is the key difference between multichannel and omnichannel marketing in pharma?",options:[{id:"a",text:"Omnichannel uses more channels"},{id:"b",text:"Omnichannel involves coordinated orchestration where each interaction builds on previous touchpoints"},{id:"c",text:"Multichannel is only digital; omnichannel includes field"},{id:"d",text:"There is no meaningful difference"}],correct:"b",explanation:"Multichannel simply means using multiple channels. Omnichannel means orchestrating those channels so each interaction is informed by and builds upon previous touchpoints, creating a coherent customer experience regardless of channel."},
    {id:"q2",type:"mcq",difficulty:"Advanced",question:"An HCP received an email (opened), attended a webinar, had a field visit, and then wrote their first prescription. Under time-decay attribution, which touchpoint gets the most credit?",options:[{id:"a",text:"Email (first touch)"},{id:"b",text:"Webinar (highest engagement)"},{id:"c",text:"Field visit (most recent before Rx)"},{id:"d",text:"All receive equal credit"}],correct:"c",explanation:"Time-decay attribution assigns more credit to touchpoints closer to the conversion event. The field visit, being the most recent interaction before the prescription, receives the most credit. The email (earliest) receives the least."},
    {id:"q3",type:"mcq",difficulty:"Intermediate",question:"What is the primary technical prerequisite for effective NBA (Next Best Action) models in pharma?",options:[{id:"a",text:"Advanced AI/ML algorithms"},{id:"b",text:"Integrated data across CRM, marketing automation, and prescribing databases"},{id:"c",text:"A large field sales force"},{id:"d",text:"Real-time prescribing data"}],correct:"b",explanation:"NBA models require a 360-degree view of each HCP's interactions across all channels plus prescribing behavior. Without integrated data linking CRM (Veeva), marketing automation (SFMC), digital analytics, and prescribing data (IQVIA), the model cannot accurately predict the best next action."},
    {id:"q4",type:"mcq",difficulty:"Intermediate",question:"What is a typical open rate benchmark for approved pharmaceutical emails sent to HCPs?",options:[{id:"a",text:"5-10%"},{id:"b",text:"20-30%"},{id:"c",text:"50-60%"},{id:"d",text:"70-80%"}],correct:"b",explanation:"Pharmaceutical approved emails to HCPs typically achieve 20-30% open rates. This is higher than general marketing email benchmarks (15-20%) because pharma emails contain clinically relevant content sent to verified healthcare professionals through platforms like Veeva CRM."},
    {id:"q5",type:"mcq",difficulty:"Advanced",question:"Why is Shapley value attribution preferred over simpler models for pharma omnichannel analytics?",options:[{id:"a",text:"It is the simplest model to implement"},{id:"b",text:"It considers each channel's marginal contribution across all possible channel combinations"},{id:"c",text:"It always gives the most credit to the most expensive channel"},{id:"d",text:"It requires the least data"}],correct:"b",explanation:"Shapley values (from cooperative game theory) calculate each channel's average marginal contribution across all possible combinations of channels. This accounts for interaction effects (e.g., email + field detail together may be more effective than the sum of each alone) and provides the fairest, most accurate attribution."}
  ]
},


"2-9": {
  id:"2-9", title:"Incentive Compensation (IC) Design", domain:"Commercial Analytics", domain_id:2,
  level:"Advanced", mins:50, available:true,
  tags:["Incentive Compensation","Quota Setting","Payout Curves","Goal Attainment","IC Analytics","OIG Compliance"],
  objectives:["Design IC plan components including base salary, bonus, and commission","Apply goal-setting methodologies for fair quota allocation","Build payout curves with appropriate acceleration and caps","Select performance metrics aligned with brand strategy","Analyze IC plan effectiveness using attainment distributions","Ensure compliance with OIG guidelines for pharmaceutical IC plans"],
  toc:[
    {id:"s1",title:"IC Plan Components",level:"h2"},
    {id:"s2",title:"Goal-Setting Methodologies",level:"h2"},
    {id:"s3",title:"Payout Curves",level:"h2"},
    {id:"s4",title:"Performance Metrics Selection",level:"h2"},
    {id:"s5",title:"IC Analytics & Plan Effectiveness",level:"h2"},
    {id:"s6",title:"Compliance & OIG Guidelines",level:"h2"},
    {id:"s7",title:"IC Plan Modeling & Simulation",level:"h2"},
    {id:"s8",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">IC Plan Components</h2>
<p><strong>Incentive Compensation (IC)</strong> is the variable pay structure that motivates and rewards sales representative performance. A well-designed IC plan aligns rep behavior with brand strategy while maintaining fairness and compliance.</p>
<h3>Pay Mix</h3>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Component</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Primary Care</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Specialty</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Oncology/Rare</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Base salary</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">65-70%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">70-75%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">75-80%</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Target incentive</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">30-35%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">25-30%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">20-25%</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Target total comp</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">$130-170K</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">$150-200K</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">$170-250K</td></tr>
</tbody></table>
<p>Higher base salary percentages in specialty/oncology reflect the longer sales cycles and relationship-based selling that make monthly Rx volume more volatile and less directly attributable to individual rep effort.</p>
<h3>Plan Types</h3>
<ul>
<li><strong>Bonus plan:</strong> Pays a lump sum based on goal attainment (most common in pharma)</li>
<li><strong>Commission plan:</strong> Pays per unit sold or per dollar of revenue (less common; used in rare disease)</li>
<li><strong>Hybrid:</strong> Combines bonus (for goal attainment) with commission (for volume above goal)</li>
</ul>`},
    {id:"s2",content:`<h2 id="s2">Goal-Setting Methodologies</h2>
<p>Fair and accurate goal-setting is the most critical and contentious aspect of IC design. Goals that are too easy erode the incentive to perform; goals that are unreachable demotivate the sales force.</p>
<h3>Common Approaches</h3>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Method</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">How It Works</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Best For</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Risk</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>Quota-based</strong></td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Assign absolute unit/revenue targets per territory</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Established brands with stable data</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Unfair if territory potential varies</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>Rank-based</strong></td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Pay based on relative rank vs. peers</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Launches with uncertain forecasts</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Zero-sum; discourages collaboration</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>Growth-based</strong></td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Target % growth over prior period baseline</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Growing brands, competitive markets</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Penalizes territories already at high share</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>Share-based</strong></td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Target market share level</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Competitive markets</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Market size changes confound results</td></tr>
</tbody></table>
<h3>Territory Potential & Fairness</h3>
<p>Quota allocation must account for territory potential differences. A common approach:</p>
<pre><code class="language-python"># Fair quota allocation using territory potential
total_national_quota = 1_000_000  # units

territories['potential_index'] = (
    territories['class_trx'] / territories['class_trx'].sum()
)
territories['quota'] = (
    territories['potential_index'] * total_national_quota
).round(0)

# Fairness check: coefficient of variation of quota/potential ratio
cv = territories['quota'].std() / territories['quota'].mean()
# Target CV < 0.15 for fair allocation</code></pre>`},
    {id:"s3",content:`<h2 id="s3">Payout Curves</h2>
<p>The <strong>payout curve</strong> defines the relationship between goal attainment and incentive payout. It is the most powerful behavioral lever in IC design — its shape determines whether reps are motivated to stretch, coast, or give up.</p>
<h3>Common Payout Curve Types</h3>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Curve Type</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Description</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Behavioral Effect</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>Linear</strong></td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Constant rate: 1% attainment = 1% payout</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Equal motivation at all levels</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>Accelerated</strong></td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Rate increases above threshold (e.g., 2x above 100%)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Strong motivation to exceed goal</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>Step (tiered)</strong></td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Discrete payout levels at thresholds</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Motivation to reach next tier; sandbagging at tier edge</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>Capped</strong></td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Maximum payout at ceiling (e.g., 150% of target)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Controls cost; may demotivate top performers</td></tr>
</tbody></table>
<h3>Typical Pharma Payout Curve Design</h3>
<ul>
<li><strong>Threshold:</strong> No payout below 70-80% of goal (prevents rewarding significant underperformance)</li>
<li><strong>Target payout:</strong> 100% of incentive at 100% attainment</li>
<li><strong>Accelerator:</strong> 1.5-3x rate above 100% (motivate stretch performance)</li>
<li><strong>Cap:</strong> 200-300% of target incentive (control outlier payouts)</li>
</ul>
<div class="callout callout-tip"><div class="callout-title">The 70% Threshold Debate</div><p>Setting the threshold too high (e.g., 90%) means a large percentage of the force earns zero variable pay, causing demoralization. Setting it too low (e.g., 50%) means poor performers still earn meaningful variable pay. The 70-80% range balances these tensions — roughly 85-90% of reps should earn above threshold.</p></div>`},
    {id:"s4",content:`<h2 id="s4">Performance Metrics Selection</h2>
<p>The metrics in an IC plan signal to reps what the company values. Choose metrics that are measurable, attributable to rep effort, and aligned with brand strategy.</p>
<h3>Common Pharma IC Metrics</h3>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Metric</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Weight (Typical)</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Best For</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">TRx (total prescriptions)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">40-60%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Mature brands (volume focus)</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">NRx (new prescriptions)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">30-50%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Launch brands (new patient focus)</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Market share</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">20-40%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Competitive markets</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Call activity</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">10-20%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Launch (execution matters)</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">MBOs (qualitative)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">10-20%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Complex selling, account management</td></tr>
</tbody></table>
<p><strong>Design principle:</strong> Limit the plan to 2-3 metrics. More metrics dilute focus and make the plan incomprehensible to reps. Each metric should have a minimum weight of 15% to be behaviorally meaningful.</p>`},
    {id:"s5",content:`<h2 id="s5">IC Analytics & Plan Effectiveness</h2>
<p>After a plan year, analytics evaluates whether the plan drove the intended behaviors and outcomes.</p>
<h3>Attainment Distribution Analysis</h3>
<pre><code class="language-python">import numpy as np
import matplotlib.pyplot as plt

def analyze_attainment(attainment_pcts):
    """
    Analyze IC plan attainment distribution for plan health.
    """
    analysis = {
        'mean': round(np.mean(attainment_pcts), 1),
        'median': round(np.median(attainment_pcts), 1),
        'std': round(np.std(attainment_pcts), 1),
        'pct_below_threshold': round(
            100 * np.mean(np.array(attainment_pcts) < 70), 1
        ),
        'pct_above_goal': round(
            100 * np.mean(np.array(attainment_pcts) >= 100), 1
        ),
        'pct_at_cap': round(
            100 * np.mean(np.array(attainment_pcts) >= 150), 1
        ),
    }
    return analysis

# Healthy plan: mean ~100%, std 15-20%, 50-60% above goal,
# <10% below threshold, <5% at cap</code></pre>
<h3>Pay-for-Performance Correlation</h3>
<p>A strong IC plan shows high correlation between performance ranking and payout ranking. Calculate the Spearman rank correlation between performance rank and payout rank — a coefficient below 0.7 suggests the plan is not effectively differentiating performance.</p>`},
    {id:"s6",content:`<h2 id="s6">Compliance & OIG Guidelines</h2>
<p>Pharmaceutical IC plans must comply with the OIG (Office of Inspector General) guidelines for pharmaceutical industry interactions. Key principles:</p>
<ul>
<li><strong>No pay for specific prescriptions:</strong> IC must never directly reward individual prescription generation. Metrics should be at the territory or account level, not individual HCP prescribing.</li>
<li><strong>Market share over volume:</strong> OIG prefers market share metrics because they do not incentivize inappropriate prescribing volume growth.</li>
<li><strong>Activity metrics balance:</strong> Including quality/activity metrics alongside volume metrics demonstrates the plan rewards execution, not just outcomes.</li>
<li><strong>Cap on variable pay:</strong> Uncapped plans raise compliance risk because extreme payouts may signal inappropriate incentive structures.</li>
<li><strong>No stacking:</strong> Separate IC programs (contests, SPIFFs) that stack on top of the base plan increase compliance risk and should be reviewed by legal.</li>
</ul>
<div class="callout"><div class="callout-title">Anti-Kickback Statute</div><p>The federal Anti-Kickback Statute (AKS) prohibits offering anything of value to induce referrals of items payable by federal healthcare programs. IC plans must be structured so that rep compensation is tied to legitimate promotional activity, not to individual prescribing decisions by specific providers.</p></div>`},
    {id:"s7",content:`<h2 id="s7">IC Plan Modeling & Simulation</h2>
<p>Before finalizing an IC plan, simulate its impact across the sales force to verify fairness, cost, and behavioral incentives.</p>
<h3>Simulation Process</h3>
<pre><code class="language-python">def simulate_ic_plan(territories_df, payout_curve, target_incentive):
    """
    Simulate IC plan payouts across all territories.
    """
    results = []
    for _, terr in territories_df.iterrows():
        # Simulate performance scenarios
        for scenario in ['downside', 'base', 'upside']:
            if scenario == 'downside':
                attainment = terr['expected_attainment'] * 0.85
            elif scenario == 'upside':
                attainment = terr['expected_attainment'] * 1.15
            else:
                attainment = terr['expected_attainment']

            payout_pct = payout_curve(attainment)
            payout = target_incentive * payout_pct

            results.append({
                'territory': terr['id'],
                'scenario': scenario,
                'attainment': round(attainment, 1),
                'payout': round(payout, 0),
            })

    results_df = pd.DataFrame(results)

    # Key outputs
    total_cost = results_df[results_df.scenario == 'base']['payout'].sum()
    cost_range = (
        results_df[results_df.scenario == 'downside']['payout'].sum(),
        results_df[results_df.scenario == 'upside']['payout'].sum()
    )
    return results_df, total_cost, cost_range</code></pre>
<h3>Key Simulation Outputs</h3>
<ul>
<li><strong>Total plan cost:</strong> Base, downside, and upside scenarios for budget planning</li>
<li><strong>Payout distribution:</strong> Verify 85-90% of reps earn above threshold</li>
<li><strong>Fairness test:</strong> Correlation between territory potential and expected attainment should be low (not penalizing high-share territories)</li>
<li><strong>Breakeven analysis:</strong> At what attainment level does incremental payout exceed incremental revenue?</li>
</ul>`},
    {id:"s8",content:`<h2 id="s8">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div><strong>IC plan design is behavioral engineering.</strong> The payout curve, threshold, and accelerator directly shape rep behavior. An accelerator at 100% motivates stretch performance; a low threshold prevents demoralization of the middle of the bell curve.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div><strong>Fair quota allocation is the #1 driver of IC plan credibility.</strong> Reps immediately lose trust in plans where territories with lower potential receive the same absolute quotas. Territory potential-adjusted goals are non-negotiable.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div><strong>Limit metrics to 2-3 with minimum 15% weight each.</strong> More metrics dilute focus. Each metric must be measurable, attributable to rep effort, and aligned with brand strategy.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div><strong>Simulate before implementing.</strong> IC plan simulation across all territories under multiple scenarios prevents surprises — unexpected windfall payouts, budget overruns, or widespread underperformance that destroys morale.</div></div>`}
  ],
  questions:[
    {id:"q1",type:"mcq",difficulty:"Intermediate",question:"A pharma company is launching a new specialty drug. Which IC plan metric mix best aligns with launch objectives?",options:[{id:"a",text:"80% TRx volume, 20% activity"},{id:"b",text:"50% NRx, 30% market share, 20% call activity"},{id:"c",text:"100% revenue"},{id:"d",text:"50% MBOs, 50% market share"}],correct:"b",explanation:"Launch brands need new patient starts (NRx), competitive positioning (market share), and execution discipline (call activity). TRx is less relevant early when the refill base is small. Revenue is less appropriate because reps do not control pricing. This balanced mix drives the right launch behaviors."},
    {id:"q2",type:"mcq",difficulty:"Advanced",question:"An IC plan attainment distribution shows: mean 105%, median 103%, 62% above goal, 4% below threshold, 12% at cap. What adjustment is needed?",options:[{id:"a",text:"Raise quotas — too many reps are above goal"},{id:"b",text:"No change — this is a healthy distribution"},{id:"c",text:"Lower the cap — too many reps are hitting it"},{id:"d",text:"Remove the threshold — 4% below is too harsh"}],correct:"c",explanation:"While the mean/median are healthy and the threshold seems appropriate, 12% at cap is high (target <5%). This means too many reps are hitting the payout ceiling, which costs money and demotivates top performers who cannot earn more. Consider raising the cap or adjusting the acceleration rate."},
    {id:"q3",type:"mcq",difficulty:"Intermediate",question:"Why does the OIG prefer market share over volume as an IC metric?",options:[{id:"a",text:"Market share is easier to calculate"},{id:"b",text:"Volume metrics may incentivize inappropriate prescribing growth, while share metrics reward competitive performance"},{id:"c",text:"Market share data is more accurate"},{id:"d",text:"Volume metrics violate HIPAA"}],correct:"b",explanation:"The OIG is concerned that volume-based incentives could motivate reps to encourage inappropriate prescribing to increase absolute numbers. Market share metrics reward competitive performance without incentivizing overall volume growth, better aligning rep behavior with appropriate patient care."},
    {id:"q4",type:"mcq",difficulty:"Intermediate",question:"What percentage of the sales force should ideally earn above the IC plan threshold?",options:[{id:"a",text:"50-60%"},{id:"b",text:"70-75%"},{id:"c",text:"85-90%"},{id:"d",text:"95-100%"}],correct:"c",explanation:"85-90% above threshold is the sweet spot. Below 85% means too many reps earn zero variable pay, causing widespread demoralization and turnover. Above 95% means the threshold is too low and does not differentiate performance. The 10-15% below threshold should represent genuinely underperforming reps."},
    {id:"q5",type:"mcq",difficulty:"Advanced",question:"A territory has 120% goal attainment. The IC plan has a threshold at 70%, target at 100%, 2x accelerator above 100%, and cap at 200%. If target incentive is $40K, what is the payout?",options:[{id:"a",text:"$40,000"},{id:"b",text:"$48,000"},{id:"c",text:"$56,000"},{id:"d",text:"$80,000"}],correct:"c",explanation:"At 100% attainment: $40K (target). For the 20% above goal: 20% x 2x accelerator x $40K = 0.20 x 2 x $40K = $16K additional. Total: $40K + $16K = $56K. This is below the $80K cap (200% x $40K), so the cap does not apply."}
  ]
},


"2-10": {
  id:"2-10", title:"Competitive Intelligence Analytics", domain:"Commercial Analytics", domain_id:2,
  level:"Intermediate", mins:50, available:true,
  tags:["Competitive Intelligence","Market Share","Share of Voice","Switching Analysis","Pipeline Monitoring","Formulary"],
  objectives:["Map competitive landscapes across products, pipeline, and positioning","Analyze market share trends at brand, class, and segment levels","Model competitive response and prescriber switching patterns","Perform share of voice analysis across promotional channels","Track pipeline threats and assess competitive impact","Adjust call plans and strategy based on competitive intelligence"],
  toc:[
    {id:"s1",title:"Competitive Landscape Mapping",level:"h2"},
    {id:"s2",title:"Market Share Analytics",level:"h2"},
    {id:"s3",title:"Prescriber Switching Patterns",level:"h2"},
    {id:"s4",title:"Share of Voice Analysis",level:"h2"},
    {id:"s5",title:"Formulary Win/Loss Analysis",level:"h2"},
    {id:"s6",title:"Pipeline Monitoring & Threat Assessment",level:"h2"},
    {id:"s7",title:"Competitive Response Strategies",level:"h2"},
    {id:"s8",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Competitive Landscape Mapping</h2>
<p>Competitive intelligence in pharma requires systematic monitoring of products, pipelines, positioning, and pricing across the therapeutic landscape. A comprehensive competitive map covers:</p>
<h3>Current Market Competitors</h3>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Dimension</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">What to Track</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Data Sources</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Market share</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">TRx/NRx share, share trend, share by segment</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">IQVIA, Symphony Health</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Promotional activity</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Detail calls, samples, DTC spend, digital</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">IQVIA DDD, Kantar, Veeva Pulse</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Payer positioning</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Formulary tier, PA requirements, lives covered</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">MMIT, Fingertip Formulary</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Pricing</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">WAC, net price estimates, pricing actions</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">AnalySource, SEC filings</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Clinical positioning</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Label claims, clinical data, guideline placement</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">FDA labels, NCCN, publications</td></tr>
</tbody></table>
<h3>Competitive Profile Template</h3>
<p>For each major competitor, maintain a structured profile covering: brand name, generic name, MOA, approved indications, key efficacy/safety data, WAC price, formulary position, current market share and trend, promotional spend estimate, patent expiry/LOE date, and pipeline expansions.</p>`},
    {id:"s2",content:`<h2 id="s2">Market Share Analytics</h2>
<p>Market share is the most fundamental competitive metric. It must be analyzed at multiple levels to reveal meaningful patterns:</p>
<h3>Share Hierarchy</h3>
<pre><code class="language-sql">-- Multi-level market share analysis
SELECT
  brand_name,
  -- Total class share
  ROUND(100.0 * SUM(trx) / SUM(SUM(trx)) OVER(), 1) AS class_share_pct,
  -- Share within sub-segment (e.g., 2L+ mNSCLC)
  ROUND(100.0 * SUM(CASE WHEN segment = '2L+' THEN trx END) /
    NULLIF(SUM(SUM(CASE WHEN segment = '2L+' THEN trx END)) OVER(), 0), 1)
    AS segment_2l_share_pct,
  -- Share trend: current quarter vs prior year quarter
  ROUND(100.0 * SUM(CASE WHEN period = 'current_q' THEN trx END) /
    NULLIF(SUM(SUM(CASE WHEN period = 'current_q' THEN trx END)) OVER(), 0), 1)
    - ROUND(100.0 * SUM(CASE WHEN period = 'prior_yr_q' THEN trx END) /
    NULLIF(SUM(SUM(CASE WHEN period = 'prior_yr_q' THEN trx END)) OVER(), 0), 1)
    AS share_change_pp
FROM prescription_data
WHERE therapeutic_class = 'target_class'
GROUP BY brand_name
ORDER BY class_share_pct DESC;</code></pre>
<h3>Share Decomposition</h3>
<p>Share changes can be decomposed into three components:</p>
<ul>
<li><strong>New patient share:</strong> % of new-to-class patients starting on your brand (leading indicator)</li>
<li><strong>Switch share:</strong> Net gain/loss from patients switching between brands</li>
<li><strong>Persistence share:</strong> Differential persistence rates (brands with better adherence grow share over time)</li>
</ul>
<div class="callout"><div class="callout-title">Leading vs. Lagging Indicators</div><p>NRx share is a leading indicator — it shows where the market is going. TRx share is a lagging indicator — it reflects accumulated patient stock. A brand with declining NRx share but stable TRx share is living on its existing patient base and will eventually see TRx decline.</p></div>`},
    {id:"s3",content:`<h2 id="s3">Prescriber Switching Patterns</h2>
<p>Switching analysis reveals which brands are gaining patients from which competitors and why. This directly informs competitive messaging and targeting.</p>
<h3>Switching Matrix</h3>
<pre><code class="language-sql">-- Brand switching matrix: where are patients coming from/going to?
SELECT
  prior_brand,
  current_brand,
  COUNT(DISTINCT patient_id) AS switch_patients,
  ROUND(100.0 * COUNT(DISTINCT patient_id) /
    SUM(COUNT(DISTINCT patient_id)) OVER (PARTITION BY prior_brand), 1)
    AS pct_of_prior_brand_switches
FROM (
  SELECT
    patient_id,
    LAG(brand_name) OVER (PARTITION BY patient_id ORDER BY fill_date) AS prior_brand,
    brand_name AS current_brand
  FROM pharmacy_claims
  WHERE therapeutic_class = 'target_class'
) switches
WHERE prior_brand IS NOT NULL
  AND prior_brand != current_brand
GROUP BY prior_brand, current_brand
ORDER BY switch_patients DESC;</code></pre>
<h3>Brand Loyalty Metrics</h3>
<ul>
<li><strong>Retention rate:</strong> % of patients remaining on brand after 12 months (inverse of switching rate)</li>
<li><strong>Win rate:</strong> When patients switch, what % switch to your brand?</li>
<li><strong>Loss rate:</strong> When your patients switch, where do they go?</li>
<li><strong>Net switching:</strong> Patients gained from switches minus patients lost to switches</li>
</ul>
<p>A brand with high retention (>70% at 12 months) and positive net switching is in a strong competitive position. A brand with declining retention signals clinical or access issues that competitors are exploiting.</p>`},
    {id:"s4",content:`<h2 id="s4">Share of Voice Analysis</h2>
<p><strong>Share of Voice (SOV)</strong> measures your brand's promotional presence relative to competitors. It is calculated across all promotional channels and compared to market share to identify over- or under-investment.</p>
<h3>SOV Calculation</h3>
<pre><code class="language-sql">SELECT
  brand_name,
  SUM(detail_calls) AS total_details,
  ROUND(100.0 * SUM(detail_calls) /
    SUM(SUM(detail_calls)) OVER(), 1) AS sov_details_pct,
  ROUND(100.0 * SUM(trx) /
    SUM(SUM(trx)) OVER(), 1) AS market_share_pct,
  -- SOV/SOM ratio: >1 = over-investing, <1 = under-investing
  ROUND(
    (100.0 * SUM(detail_calls) / SUM(SUM(detail_calls)) OVER()) /
    NULLIF(100.0 * SUM(trx) / SUM(SUM(trx)) OVER(), 0), 2
  ) AS sov_som_ratio
FROM competitive_data
GROUP BY brand_name;</code></pre>
<h3>SOV/SOM Ratio Interpretation</h3>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">SOV/SOM Ratio</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Interpretation</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Action</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">>1.5</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Significantly over-investing relative to share</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Normal for launches; evaluate ROI for established brands</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">1.0-1.5</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Investing slightly above share — growth posture</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Appropriate for growing brands</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">0.7-1.0</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Investment roughly proportional to share</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Maintenance mode</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><0.7</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Under-investing; living off brand equity</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Risk of share erosion; appropriate only near LOE</td></tr>
</tbody></table>`},
    {id:"s5",content:`<h2 id="s5">Formulary Win/Loss Analysis</h2>
<p>Formulary positioning is a key competitive battleground. Win/loss analysis tracks formulary decisions and their prescribing impact.</p>
<h3>Tracking Formulary Changes</h3>
<ul>
<li><strong>Wins:</strong> Plans that upgrade your product (e.g., non-preferred to preferred, removal of PA)</li>
<li><strong>Losses:</strong> Plans that downgrade your product (e.g., added PA, moved to non-preferred)</li>
<li><strong>Competitive exchanges:</strong> Plans that move a competitor up while moving you down (or vice versa)</li>
</ul>
<h3>Impact Quantification</h3>
<pre><code class="language-sql">-- Formulary change impact on prescribing
SELECT
  plan_name,
  formulary_change_type,  -- 'Win' or 'Loss'
  lives_affected,
  brand_share_pre_change,
  brand_share_post_change,
  brand_share_post_change - brand_share_pre_change AS share_impact_pp,
  -- Estimated annual TRx impact
  lives_affected * avg_class_trx_per_member * (share_impact_pp / 100.0)
    AS estimated_annual_trx_impact
FROM formulary_changes
WHERE change_date >= DATEADD(year, -1, CURRENT_DATE)
ORDER BY ABS(estimated_annual_trx_impact) DESC;</code></pre>
<p>A formulary win affecting a million lives with 5pp share lift represents a significantly larger impact than a win affecting 100K lives with 15pp lift. Always weight by lives covered.</p>`},
    {id:"s6",content:`<h2 id="s6">Pipeline Monitoring & Threat Assessment</h2>
<p>Proactive competitive intelligence monitors the clinical pipeline for future threats and opportunities.</p>
<h3>Pipeline Threat Scoring Framework</h3>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Factor</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">High Threat (3)</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Medium Threat (2)</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Low Threat (1)</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Differentiation</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Superior efficacy + safety</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Non-inferior with convenience advantage</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Me-too with no clear advantage</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Timeline</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Filed/approval expected <12 mo</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Phase III, 12-24 months</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Phase II, >24 months</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Sponsor capability</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Top-20 pharma, proven launch</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Mid-size, capable commercial</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Small biotech, no commercial infra</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Target overlap</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Same indication/line/biomarker</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Adjacent indication</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Different population segment</td></tr>
</tbody></table>
<p><strong>Composite threat score:</strong> Sum of all factor scores. Scores of 10-12 = high threat (immediate strategic response needed), 7-9 = medium (monitor closely and prepare), 4-6 = low (track but no immediate action).</p>`},
    {id:"s7",content:`<h2 id="s7">Competitive Response Strategies</h2>
<p>Different competitive scenarios require different responses:</p>
<h3>Response Playbook</h3>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Competitive Event</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Analytics Response</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Commercial Response</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">New competitor launch</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Weekly share tracking, switcher monitoring, prescriber breadth analysis</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Defensive messaging, loyalty programs, frequency increase on at-risk HCPs</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Competitor formulary win</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Plan-level share impact analysis, pull-through monitoring</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Counter-detailing affected prescribers, payer re-engagement</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Competitor positive data</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Perception tracking survey, share impact modeling</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Own data reinforcement, differentiation messaging</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Generic entry (LOE)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Generic curve modeling, erosion rate tracking</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">AG strategy, lifecycle management, indication-specific defense</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Competitor safety signal</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Switch opportunity sizing, prescriber identification</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Safety-profile messaging (within regulatory bounds)</td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">Competitive Intelligence Ethics</div><p>All competitive intelligence must be gathered through legal, ethical means: public data, published research, SEC filings, conference presentations, and licensed data. Never solicit confidential information from competitor employees or use deceptive practices. Violations can result in legal liability and reputational damage.</p></div>`},
    {id:"s8",content:`<h2 id="s8">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div><strong>NRx share is the leading indicator; TRx share is lagging.</strong> Monitor NRx share weekly to detect competitive shifts before they fully manifest in TRx. By the time TRx share declines, you have already lost the competitive battle for new patients.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div><strong>Switching analysis reveals the competitive battlefield.</strong> Knowing which competitor patients are coming from (and going to) directly informs messaging, targeting, and positioning strategy.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div><strong>SOV/SOM ratio guides investment levels.</strong> Launch brands should have SOV/SOM >1.5; mature brands approaching LOE can tolerate <0.7. The ratio must be calibrated to brand lifecycle stage.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div><strong>Pipeline monitoring enables proactive response.</strong> Scoring pipeline threats by differentiation, timeline, sponsor capability, and target overlap creates an early warning system. Waiting for a competitor to launch before responding is too late.</div></div>`}
  ],
  questions:[
    {id:"q1",type:"mcq",difficulty:"Intermediate",question:"A brand has 25% TRx market share but only 18% NRx share. What does this signal?",options:[{id:"a",text:"The brand is gaining market share"},{id:"b",text:"The brand is losing the battle for new patients and TRx share will eventually decline"},{id:"c",text:"NRx share is not meaningful for established brands"},{id:"d",text:"The data sources are inconsistent"}],correct:"b",explanation:"TRx share (25%) reflects the accumulated patient base including legacy prescriptions. NRx share (18%) shows only new patient starts, which is a leading indicator. With NRx below TRx, fewer new patients are choosing this brand — as existing patients discontinue or switch, TRx share will erode toward the lower NRx share level."},
    {id:"q2",type:"mcq",difficulty:"Intermediate",question:"A brand has SOV/SOM ratio of 0.5. What does this indicate?",options:[{id:"a",text:"The brand is over-investing in promotion relative to its share"},{id:"b",text:"The brand is under-investing, spending half its 'fair share' of promotional voice"},{id:"c",text:"The brand has optimal promotional efficiency"},{id:"d",text:"The brand is a new launch"}],correct:"b",explanation:"SOV/SOM of 0.5 means the brand's share of promotional voice is only half its market share. This under-investment puts the brand at risk of share erosion as competitors with higher SOV capture more prescriber attention. Appropriate only for brands approaching LOE where investment reduction is strategic."},
    {id:"q3",type:"mcq",difficulty:"Advanced",question:"A competitive pipeline asset in Phase III has superior efficacy data, is from a top-10 pharma company, targets the same indication/line, and is expected to file in 8 months. What is the threat score (1-12 scale)?",options:[{id:"a",text:"6"},{id:"b",text:"8"},{id:"c",text:"10"},{id:"d",text:"12"}],correct:"d",explanation:"Differentiation: 3 (superior efficacy). Timeline: 3 (filed/<12 months). Sponsor: 3 (top-10 pharma). Target overlap: 3 (same indication/line). Total: 12/12 — maximum threat. This requires immediate strategic response: defensive positioning, formulary protection, differentiation messaging."},
    {id:"q4",type:"mcq",difficulty:"Intermediate",question:"In a switching matrix analysis, your brand gains 500 patients from Competitor A but loses 300 patients to Competitor B. What is your net switching position?",options:[{id:"a",text:"+200 net gain"},{id:"b",text:"+500 net gain"},{id:"c",text:"-300 net loss"},{id:"d",text:"Net position depends on total patient base"}],correct:"a",explanation:"Net switching = patients gained - patients lost = 500 - 300 = +200 net gain. This is a favorable position, but the brand team should investigate why 300 patients are switching to Competitor B and whether defensive action is needed."},
    {id:"q5",type:"mcq",difficulty:"Intermediate",question:"A formulary win affecting 2 million lives results in a 3 percentage point share increase. A separate win affecting 500K lives results in an 8 percentage point increase. Which is more valuable?",options:[{id:"a",text:"The 2M lives win (larger population)"},{id:"b",text:"The 500K lives win (larger share gain)"},{id:"c",text:"Need to compare absolute TRx impact: lives x avg utilization x share gain"},{id:"d",text:"They are equivalent"}],correct:"c",explanation:"To compare, calculate absolute TRx impact: Win 1: 2M x utilization x 3pp. Win 2: 500K x utilization x 8pp. Assuming similar class utilization per member, Win 1 = 60,000 class-TRx-equivalents x 3% = 1,800 incremental TRx. Win 2 = 15,000 x 8% = 1,200 incremental TRx. Win 1 is more valuable, but you need the full calculation to know."}
  ]
},


"2-11": {
  id:"2-11", title:"Real-World Commercial Analytics", domain:"Commercial Analytics", domain_id:2,
  level:"Advanced", mins:55, available:true,
  tags:["RWE","Commercial RWD","Hub Analytics","Adherence Programs","Patient Support","Value Story"],
  objectives:["Integrate real-world evidence into commercial decision-making","Analyze patient outcomes for commercial positioning","Develop value stories using RWD for payer and HCP audiences","Evaluate patient support program effectiveness","Analyze hub and specialty pharmacy operational data","Build adherence program ROI models"],
  toc:[
    {id:"s1",title:"RWE in Commercial Decision-Making",level:"h2"},
    {id:"s2",title:"Patient Outcomes Analytics",level:"h2"},
    {id:"s3",title:"Value Story Development",level:"h2"},
    {id:"s4",title:"Patient Support Program Analytics",level:"h2"},
    {id:"s5",title:"Hub & Specialty Pharmacy Analytics",level:"h2"},
    {id:"s6",title:"Adherence Program ROI",level:"h2"},
    {id:"s7",title:"Case Studies",level:"h2"},
    {id:"s8",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">RWE in Commercial Decision-Making</h2>
<p><strong>Real-World Evidence (RWE)</strong> derived from real-world data (RWD) is increasingly central to commercial pharma analytics. While clinical trials establish efficacy in controlled settings, RWE demonstrates effectiveness in actual clinical practice — providing the evidence that payers, providers, and patients need to make treatment decisions.</p>
<h3>Commercial Applications of RWE</h3>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Application</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">RWD Source</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Commercial Impact</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Formulary defense</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Claims, EHR outcomes</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Demonstrate real-world superiority to protect formulary position</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">HEOR value dossier</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Healthcare utilization, cost data</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Support pricing and value-based contracts</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Label expansion support</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Claims, registries</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Generate evidence for sNDA/sBLA filings</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Competitive differentiation</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Comparative claims analysis</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Head-to-head effectiveness data for HCP messaging</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Patient identification</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Claims, lab data</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Find undiagnosed or undertreated patients</td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">RWE Credibility Hierarchy</div><p>Not all RWE is created equal. Prospective pragmatic trials > well-designed retrospective studies with validated outcomes > simple claims analyses. Payers and guideline committees evaluate RWE quality rigorously — invest in methodology to ensure your evidence is trusted.</p></div>`},
    {id:"s2",content:`<h2 id="s2">Patient Outcomes Analytics</h2>
<p>Commercial-relevant patient outcomes include both clinical endpoints and economic endpoints. The goal is to demonstrate that your product delivers better outcomes and/or lower total cost of care.</p>
<h3>Clinical Outcomes from RWD</h3>
<ul>
<li><strong>Time to event:</strong> Time to hospitalization, ER visit, treatment switch, disease progression</li>
<li><strong>Event rates:</strong> Hospitalization rate, ER visit rate, mortality rate</li>
<li><strong>Adherence-outcome link:</strong> Patients with PDC>0.80 vs. <0.80 — difference in clinical outcomes</li>
</ul>
<h3>Economic Outcomes</h3>
<pre><code class="language-sql">-- Total cost of care comparison: Brand A vs. Brand B
SELECT
  treatment_group,
  AVG(drug_cost_12mo) AS avg_drug_cost,
  AVG(medical_cost_12mo) AS avg_medical_cost,
  AVG(drug_cost_12mo + medical_cost_12mo) AS avg_total_cost,
  AVG(hospitalization_count_12mo) AS avg_hospitalizations,
  AVG(er_visit_count_12mo) AS avg_er_visits
FROM patient_outcomes_cohort
WHERE propensity_score_matched = TRUE  -- Matched cohort for fair comparison
GROUP BY treatment_group;</code></pre>
<p>The key insight for commercial teams: a higher-cost drug that reduces hospitalizations by 20% may have a <strong>lower total cost of care</strong> than a cheaper alternative. This "offset" narrative is the foundation of value-based positioning.</p>`},
    {id:"s3",content:`<h2 id="s3">Value Story Development</h2>
<p>A <strong>value story</strong> is the evidence-based narrative that connects your product's clinical benefits to economic value for specific stakeholders.</p>
<h3>Value Story Framework</h3>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Audience</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">What They Care About</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Evidence Needed</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Payer (P&T committee)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Budget impact, cost-effectiveness, total cost of care</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">HEOR studies, budget impact model, NNT analysis</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">HCP (prescriber)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Efficacy, safety, patient outcomes, convenience</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">RCT data, RWE outcomes, guidelines</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">IDN/Health system</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Readmission rates, length of stay, resource utilization</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">RWE on healthcare utilization, quality measures</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Patient</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Symptom relief, quality of life, out-of-pocket cost</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">PROs, patient testimonials, copay assistance data</td></tr>
</tbody></table>
<h3>Payer Evidence Requirements</h3>
<p>Modern payer evidence packages typically include:</p>
<ul>
<li><strong>AMCP dossier:</strong> Standardized format including clinical, economic, and quality evidence</li>
<li><strong>Budget impact model:</strong> 3-5 year model showing cost to the plan of adding the product</li>
<li><strong>Cost-effectiveness analysis:</strong> ICER (incremental cost-effectiveness ratio) compared to relevant comparators</li>
<li><strong>RWE supplement:</strong> Real-world adherence, persistence, and outcomes data post-launch</li>
</ul>`},
    {id:"s4",content:`<h2 id="s4">Patient Support Program Analytics</h2>
<p>Patient support programs (PSPs) encompass all manufacturer-sponsored services that help patients access, start, and stay on therapy. Analytics measures program effectiveness and ROI.</p>
<h3>PSP Components and Metrics</h3>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Program</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Key Metrics</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Benchmark</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Benefits verification</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Turnaround time, coverage rate</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><48 hours, >80% coverage</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Prior authorization support</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">PA approval rate, time-to-approval</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">>75% approval, <5 days</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Copay assistance</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Enrollment rate, utilization, avg patient OOP</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">>40% enrollment, <$50 OOP</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Nurse educator</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Enrollment, call completion, adherence lift</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">5-15pp adherence improvement</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Patient assistance (PAP)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Enrollment, free drug units, transition to coverage</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Track as GTN deduction</td></tr>
</tbody></table>
<p>PSP analytics connects program engagement to patient outcomes: patients enrolled in comprehensive support programs typically show 15-25% higher persistence rates than non-enrolled patients.</p>`},
    {id:"s5",content:`<h2 id="s5">Hub & Specialty Pharmacy Analytics</h2>
<p>For specialty products, the <strong>hub</strong> (manufacturer-sponsored patient services center) and <strong>specialty pharmacies</strong> generate operational data critical for commercial analytics.</p>
<h3>Hub Operations Analytics</h3>
<ul>
<li><strong>Enrollment funnel:</strong> Referrals received -> enrolled -> benefits verified -> PA submitted -> PA approved -> dispensed</li>
<li><strong>Conversion rates:</strong> Each step should be >80%; any step below 70% signals an operational bottleneck</li>
<li><strong>Cycle time:</strong> Days from referral to first dispense (target: <10 days for oral specialty, <14 for injectable)</li>
<li><strong>Abandonment rate:</strong> Patients who start but never complete enrollment (target: <15%)</li>
</ul>
<h3>Specialty Pharmacy Analytics</h3>
<pre><code class="language-sql">-- SP performance scorecard
SELECT
  sp_name,
  COUNT(DISTINCT patient_id) AS active_patients,
  AVG(days_referral_to_dispense) AS avg_cycle_time,
  ROUND(100.0 * SUM(CASE WHEN dispensed = TRUE THEN 1 END) /
    COUNT(*), 1) AS fulfillment_rate_pct,
  AVG(refill_rate_30day) AS avg_30d_refill_rate,
  AVG(pdc_6mo) AS avg_pdc_6month
FROM sp_operations
GROUP BY sp_name
ORDER BY active_patients DESC;</code></pre>
<div class="callout callout-tip"><div class="callout-title">SP Selection Matters</div><p>Specialty pharmacy performance varies significantly. The difference between a top-quartile and bottom-quartile SP can be 15-20% in fulfillment rate and 10% in persistence. Use analytics to hold SP partners accountable and shift volume to higher performers.</p></div>`},
    {id:"s6",content:`<h2 id="s6">Adherence Program ROI</h2>
<p>Demonstrating ROI of adherence programs requires connecting program investment to incremental persistence, which translates to incremental prescriptions and revenue.</p>
<h3>ROI Calculation Framework</h3>
<pre><code class="language-python">def adherence_program_roi(
    enrolled_patients, non_enrolled_patients,
    persistence_enrolled, persistence_non_enrolled,
    avg_trx_per_persistent_patient, net_revenue_per_trx,
    program_cost
):
    """
    Calculate ROI of adherence/support program.
    """
    # Incremental persistence
    persistence_lift = persistence_enrolled - persistence_non_enrolled

    # Incremental TRx from better persistence
    incremental_persistent_patients = enrolled_patients * persistence_lift
    incremental_trx = incremental_persistent_patients * avg_trx_per_persistent_patient

    # Revenue and ROI
    incremental_revenue = incremental_trx * net_revenue_per_trx
    roi = (incremental_revenue - program_cost) / program_cost

    return {
        'persistence_lift': round(persistence_lift * 100, 1),
        'incremental_patients': round(incremental_persistent_patients, 0),
        'incremental_trx': round(incremental_trx, 0),
        'incremental_revenue': round(incremental_revenue, 0),
        'program_cost': program_cost,
        'roi': round(roi, 1)
    }

# Example: specialty drug support program
result = adherence_program_roi(
    enrolled_patients=5000,
    non_enrolled_patients=8000,
    persistence_enrolled=0.65,    # 65% at 12 months
    persistence_non_enrolled=0.48, # 48% at 12 months
    avg_trx_per_persistent_patient=10,
    net_revenue_per_trx=2000,
    program_cost=3_000_000
)
# persistence_lift: 17%, incremental_revenue: $17M, ROI: 4.7x</code></pre>
<div class="callout"><div class="callout-title">Selection Bias Caveat</div><p>Patients who enroll in support programs are often more motivated and may have higher persistence regardless of program support. To measure true program impact, use propensity score matching or difference-in-differences methods that control for self-selection bias.</p></div>`},
    {id:"s7",content:`<h2 id="s7">Case Studies</h2>
<h3>Case 1: Oncology Brand — Using RWE to Defend Formulary Position</h3>
<p>A PD-1 inhibitor faced formulary review against a lower-cost competitor. The commercial analytics team generated RWE showing: (1) 15% longer real-world PFS vs. competitor, (2) 22% fewer hospitalizations, (3) lower total cost of care despite higher drug cost. The P&T committee maintained preferred access. Impact: ~$200M revenue protected.</p>
<h3>Case 2: Specialty Drug — Hub Analytics Driving Launch Performance</h3>
<p>During launch week 4, hub analytics identified that PA denial rate was 35% (vs. 20% benchmark). Root cause analysis revealed that the standard PA form did not include a field for biomarker results that payers required. The team created an enhanced PA template and trained hub staff. Within 6 weeks, denial rate dropped to 18%, accelerating the launch trajectory by an estimated 3 months.</p>
<h3>Case 3: Chronic Therapy — Adherence Program ROI</h3>
<p>A diabetes brand invested $5M in a comprehensive adherence program (nurse educators + refill reminders + copay assistance). Propensity-matched analysis showed: enrolled patients had 20pp higher 12-month persistence (62% vs. 42%), generating ~$25M incremental net revenue. ROI: 4x. The program was expanded from opt-in to auto-enrollment for all new patients.</p>`},
    {id:"s8",content:`<h2 id="s8">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div><strong>RWE bridges clinical trials and commercial reality.</strong> Payers increasingly demand real-world effectiveness data, not just clinical trial efficacy. Invest in generating high-quality RWE early in the product lifecycle.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div><strong>Total cost of care is the winning value argument.</strong> Demonstrating that your higher-cost drug reduces hospitalizations, ER visits, and disease progression — resulting in lower total cost — is the most persuasive evidence for payers.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div><strong>Hub and SP analytics are launch accelerators.</strong> Identifying and resolving operational bottlenecks (PA denials, fulfillment delays, enrollment abandonment) in the first weeks of launch can materially change the trajectory.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div><strong>Adherence program ROI is typically 3-6x.</strong> Every percentage point of persistence improvement translates to incremental prescriptions. Programs that improve 12-month persistence by 10-20 percentage points generate substantial revenue relative to program cost, but control for selection bias when measuring impact.</div></div>`}
  ],
  questions:[
    {id:"q1",type:"mcq",difficulty:"Advanced",question:"A payer requests evidence that your specialty drug reduces total cost of care vs. standard of care. What is the most rigorous RWD study design?",options:[{id:"a",text:"Simple descriptive statistics comparing costs"},{id:"b",text:"Propensity score-matched retrospective cohort study using claims data"},{id:"c",text:"Survey of physicians about cost perception"},{id:"d",text:"Budget impact model based on WAC pricing"}],correct:"b",explanation:"A propensity score-matched retrospective cohort study controls for confounders (age, comorbidities, baseline severity) that would bias a simple comparison. Using real claims data captures actual healthcare utilization. This design is the RWE gold standard for cost-effectiveness evidence that payers find credible."},
    {id:"q2",type:"mcq",difficulty:"Intermediate",question:"A hub operations report shows 90% enrollment rate but only 55% of enrolled patients receive their first dispense. Where is the bottleneck?",options:[{id:"a",text:"Enrollment process"},{id:"b",text:"Between enrollment and dispense — likely PA approval or SP fulfillment"},{id:"c",text:"Physician prescribing"},{id:"d",text:"Patient awareness"}],correct:"b",explanation:"With 90% enrollment, the intake process is working. The 55% conversion from enrolled to dispensed indicates a severe bottleneck in the middle of the funnel — most commonly PA denials, insurance coverage gaps, copay affordability, or SP operational delays. Each step between enrollment and dispense should be analyzed separately."},
    {id:"q3",type:"mcq",difficulty:"Intermediate",question:"Why must adherence program ROI calculations control for selection bias?",options:[{id:"a",text:"Enrolled patients have different demographics"},{id:"b",text:"Patients who voluntarily enroll tend to be more motivated and may have higher persistence regardless"},{id:"c",text:"Program costs vary by patient"},{id:"d",text:"Adherence data has measurement error"}],correct:"b",explanation:"Patients who choose to enroll in support programs are often more health-conscious and motivated, creating a self-selection bias. Their higher persistence may be partly attributable to inherent motivation rather than the program itself. Propensity score matching or difference-in-differences designs are needed to estimate the true causal program effect."},
    {id:"q4",type:"mcq",difficulty:"Advanced",question:"What is the typical ROI range for comprehensive patient adherence programs in specialty pharma?",options:[{id:"a",text:"0.5-1x (break even)"},{id:"b",text:"1-2x"},{id:"c",text:"3-6x"},{id:"d",text:"10-20x"}],correct:"c",explanation:"Well-designed specialty drug adherence programs typically generate 3-6x ROI. This reflects the high net revenue per prescription for specialty drugs ($2,000-10,000+), meaning even modest persistence improvements (10-20pp) generate substantial incremental revenue relative to program costs ($3-10M annually)."},
    {id:"q5",type:"mcq",difficulty:"Intermediate",question:"A competitive RWE study shows your drug has 22% fewer hospitalizations than a competitor. Which stakeholder audience benefits most from this evidence?",options:[{id:"a",text:"Sales representatives for HCP detailing"},{id:"b",text:"Payers and health system decision-makers evaluating total cost of care"},{id:"c",text:"Patients for DTC advertising"},{id:"d",text:"Regulatory agencies for label expansion"}],correct:"b",explanation:"Hospitalization reduction directly translates to cost savings for payers and health systems. This evidence supports formulary positioning, value-based contract negotiations, and P&T committee presentations. While HCPs also value this data, the economic argument is most powerful for payer and health system audiences."}
  ]
},


"2-12": {
  id:"2-12", title:"Pharma Market Research", domain:"Commercial Analytics", domain_id:2,
  level:"Intermediate", mins:55, available:true,
  tags:["Market Research","Conjoint Analysis","ATU Study","Brand Tracking","Pricing Research","Qualitative Research"],
  objectives:["Distinguish primary vs. secondary market research approaches","Design qualitative research using focus groups, IDIs, and ethnography","Apply quantitative methods including conjoint, max-diff, and surveys","Conduct HCP and patient research on prescribing behavior and preferences","Build brand tracking studies measuring awareness, trial, and usage","Execute pricing research including willingness-to-pay and price sensitivity"],
  toc:[
    {id:"s1",title:"Primary vs. Secondary Research",level:"h2"},
    {id:"s2",title:"Qualitative Research Methods",level:"h2"},
    {id:"s3",title:"Quantitative Research Methods",level:"h2"},
    {id:"s4",title:"HCP & Patient Research",level:"h2"},
    {id:"s5",title:"Brand Tracking Studies (ATU)",level:"h2"},
    {id:"s6",title:"Pricing Research",level:"h2"},
    {id:"s7",title:"Research Synthesis & Strategic Implications",level:"h2"},
    {id:"s8",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Primary vs. Secondary Research</h2>
<p>Pharma market research provides the qualitative and quantitative insights that underpin commercial strategy. Understanding when to use primary vs. secondary research is the first strategic decision.</p>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Attribute</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Primary Research</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Secondary Research</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Definition</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Original data collected for specific objectives</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Analysis of existing data/publications</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Methods</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Surveys, interviews, focus groups, conjoint</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Claims analysis, literature review, syndicated data</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Cost</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">$50K-500K per study</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">$10K-100K (data licensing fees)</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Timeline</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">4-12 weeks</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">1-4 weeks</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Best for</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Attitudes, perceptions, preferences, unmet needs</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Market sizing, utilization patterns, treatment flows</td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">Research Before Analytics</div><p>Market research provides the "why" behind the "what" that analytics reveals. If claims data shows 40% of diagnosed patients are not treated, market research tells you whether the barrier is physician awareness, patient reluctance, access issues, or clinical inertia. Always pair quantitative analytics with qualitative insight.</p></div>`},
    {id:"s2",content:`<h2 id="s2">Qualitative Research Methods</h2>
<p>Qualitative research explores the <em>why</em> behind behavior through open-ended exploration with small samples. It is essential for hypothesis generation and understanding complex decision-making processes.</p>
<h3>In-Depth Interviews (IDIs)</h3>
<p>One-on-one interviews (30-60 minutes) with HCPs, patients, payers, or other stakeholders. IDIs provide deep individual perspective and are preferred when topics are sensitive (pricing, competitive perceptions) or when interviewing high-level stakeholders (payer medical directors, KOLs).</p>
<p><strong>Sample size:</strong> 15-30 interviews per segment (saturation typically reached at 20-25)</p>
<h3>Focus Groups</h3>
<p>Moderated group discussions (6-8 participants, 90-120 minutes). Focus groups leverage group dynamics — participants build on each other's ideas, and areas of consensus/disagreement emerge naturally.</p>
<p><strong>Best for:</strong> Concept testing, message testing, exploring treatment decision frameworks. <strong>Caution:</strong> Dominant personalities can bias the group; use skilled moderators.</p>
<h3>Ethnographic Research</h3>
<p>Observational research in natural settings — shadowing nurses during patient education, observing clinic workflows, or watching patients manage their condition at home. Ethnography reveals behaviors that interviews miss because people often cannot articulate their own habits.</p>
<h3>Advisory Boards</h3>
<p>Structured meetings with 8-15 KOLs or experts to gather strategic input on clinical positioning, guideline development, or unmet needs. Advisory boards serve dual purposes: research insight and KOL engagement. Compensation must comply with Fair Market Value (FMV) requirements and be for genuine advisory services.</p>`},
    {id:"s3",content:`<h2 id="s3">Quantitative Research Methods</h2>
<p>Quantitative research measures the magnitude and distribution of attitudes, preferences, and behaviors across representative samples.</p>
<h3>Surveys</h3>
<p>Web-based surveys are the workhorse of pharma quantitative research. Typical HCP survey: n=150-300 per specialty, 15-20 minute length, $800-2,000 per completed HCP interview (due to high honorarium requirements).</p>
<h3>Conjoint Analysis</h3>
<p>Conjoint measures how HCPs or patients trade off between product attributes to make choices. This is the gold standard for understanding what drives treatment selection.</p>
<pre><code class="language-python"># Choice-Based Conjoint (CBC) analysis
# HCPs choose between hypothetical product profiles defined by attributes

attributes = {
    'efficacy': ['20% PFS improvement', '35% PFS improvement', '50% PFS improvement'],
    'safety': ['Mild AEs only', 'Moderate AEs (manageable)', 'Severe AEs (15% discontinuation)'],
    'dosing': ['Daily oral', 'Weekly injection', 'Monthly IV infusion'],
    'cost_to_patient': ['$0 copay', '$50/month', '$200/month'],
}

# Analysis produces: part-worth utilities for each attribute level
# Importance weights: which attribute matters most in the decision
# Simulation: predicted share for any combination of attribute levels</code></pre>
<h3>Max-Diff (Maximum Difference Scaling)</h3>
<p>Respondents select the "most important" and "least important" item from subsets of a larger list. This produces a ratio-scaled ranking that is more discriminating than simple Likert ratings. Commonly used for: message prioritization, attribute importance ranking, unmet need assessment.</p>
<div class="callout callout-tip"><div class="callout-title">Stated vs. Revealed Preference</div><p>Surveys capture stated preference (what people say they would do). Claims data captures revealed preference (what they actually do). These often diverge — HCPs may state they prescribe based on efficacy, but claims show formulary status is a stronger predictor. Triangulate both data types for the most accurate picture.</p></div>`},
    {id:"s4",content:`<h2 id="s4">HCP & Patient Research</h2>
<h3>HCP Research Topics</h3>
<ul>
<li><strong>Prescribing behavior:</strong> Treatment algorithm mapping, brand switching triggers, formulary influence</li>
<li><strong>Brand perception:</strong> Efficacy perception, safety concerns, differentiation vs. competitors</li>
<li><strong>Unmet needs:</strong> Gaps in current treatment options, desired product attributes</li>
<li><strong>Information sources:</strong> Which journals, congresses, KOLs, and channels influence prescribing decisions</li>
<li><strong>Segmentation research:</strong> Identifying distinct prescriber archetypes (evidence-driven, relationship-driven, protocol-following)</li>
</ul>
<h3>Patient Research Topics</h3>
<ul>
<li><strong>Journey insights:</strong> Diagnosis experience, treatment decision involvement, information-seeking behavior</li>
<li><strong>Adherence barriers:</strong> Side effects, complexity, cost, forgetfulness, health literacy</li>
<li><strong>Preferences:</strong> Route of administration, dosing frequency, trade-offs between efficacy and side effects</li>
<li><strong>Quality of life:</strong> Impact of disease and treatment on daily life, work, relationships</li>
<li><strong>Caregiver burden:</strong> Time, emotional, and financial impact on caregivers (especially relevant in oncology, rare disease, pediatric conditions)</li>
</ul>
<h3>Market Segmentation Research</h3>
<p>Segmentation research identifies distinct groups within the HCP or patient population based on attitudes, behaviors, and needs. Common approaches:</p>
<ul>
<li><strong>Attitudinal segmentation:</strong> Cluster analysis on survey responses about treatment philosophy</li>
<li><strong>Behavioral segmentation:</strong> Group HCPs by prescribing patterns using claims data</li>
<li><strong>Needs-based segmentation:</strong> Group patients by primary unmet need (efficacy, safety, convenience, cost)</li>
</ul>`},
    {id:"s5",content:`<h2 id="s5">Brand Tracking Studies (ATU)</h2>
<p><strong>Awareness, Trial, and Usage (ATU)</strong> studies are longitudinal surveys that track brand health metrics over time. They are the primary tool for monitoring brand perception and the effectiveness of marketing campaigns.</p>
<h3>ATU Metrics Framework</h3>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Metric</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Definition</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Measurement</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Unaided awareness</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">% who name the brand without prompting</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">"Name the treatments you know for [condition]"</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Aided awareness</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">% who recognize the brand when shown name</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">"Have you heard of [brand]?"</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Familiarity</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">% who know the brand well enough to prescribe</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">"How familiar are you with [brand]?" (5-point scale)</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Trial</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">% who have prescribed at least once</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">"Have you ever prescribed [brand]?"</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Regular use</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">% who prescribe regularly (monthly+)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">"How often do you prescribe [brand]?"</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Advocacy</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">% who would recommend to peers</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">"Would you recommend [brand] to a colleague?"</td></tr>
</tbody></table>
<h3>ATU Funnel Conversion</h3>
<p>The power of ATU is in tracking conversion between stages: Awareness -> Familiarity -> Trial -> Regular Use -> Advocacy. A brand with 80% awareness but 20% trial has an education/conversion problem. A brand with 60% trial but 15% regular use has a persistence/satisfaction problem.</p>
<p>ATU studies are typically conducted quarterly or semi-annually with n=100-200 target HCPs per wave to track trends with statistical significance.</p>`},
    {id:"s6",content:`<h2 id="s6">Pricing Research</h2>
<p>Pricing research determines optimal price positioning and quantifies the relationship between price and demand — critical for launch pricing and lifecycle management.</p>
<h3>Price Sensitivity Meter (Van Westendorp)</h3>
<p>Asks four questions about a product at different price points to identify price thresholds:</p>
<ul>
<li>"At what price would this be so cheap you'd question quality?" (Too cheap)</li>
<li>"At what price is this a bargain?" (Cheap/good value)</li>
<li>"At what price is this getting expensive but you'd still consider it?" (Expensive)</li>
<li>"At what price is this too expensive to consider?" (Too expensive)</li>
</ul>
<p>The intersection of these curves defines the acceptable price range and optimal price point.</p>
<h3>Conjoint-Based Pricing</h3>
<p>Include price as an attribute in conjoint analysis to estimate price elasticity of demand. This reveals how much share you gain/lose at different price points relative to competitors — the most rigorous approach for launch pricing decisions.</p>
<h3>Willingness-to-Pay (WTP)</h3>
<p>For payer-focused pricing, WTP research presents the product's clinical profile and asks payers what price they would accept for formulary inclusion. This directly informs WAC pricing and contracting strategy.</p>
<div class="callout"><div class="callout-title">Pricing Research Limitations</div><p>Survey-based pricing research has well-documented biases: respondents tend to understate their willingness to pay. Calibrate pricing research with revealed preference data (actual pricing of analogues and competitor products) and payer feedback. Never rely solely on survey data for pricing decisions worth hundreds of millions of dollars.</p></div>`},
    {id:"s7",content:`<h2 id="s7">Research Synthesis & Strategic Implications</h2>
<p>The value of market research comes from synthesis — integrating findings across studies into actionable strategic recommendations.</p>
<h3>Research-to-Strategy Bridge</h3>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Research Finding</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Strategic Implication</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Commercial Action</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Low unaided awareness (20%)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Brand is not top-of-mind</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Increase frequency, DTC, congress presence</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">High awareness but low trial</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Barrier between knowing and prescribing</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Investigate: access barrier? Safety concern? Inertia?</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Conjoint shows safety drives choice</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Safety profile is the key differentiator</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Lead with safety messaging, RWE safety data</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Patients cite cost as top barrier</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Affordability limits adherence</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Copay assistance, patient affordability programs</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">3 distinct prescriber segments</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Different value propositions needed</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Segment-specific messaging in call plans</td></tr>
</tbody></table>
<h3>Competitive Perception Mapping</h3>
<p>Perceptual maps plot brands on dimensions that matter to prescribers (e.g., efficacy vs. safety, convenience vs. clinical evidence). These maps, derived from survey data, reveal competitive white space — unoccupied positions that your brand could claim with the right messaging.</p>`},
    {id:"s8",content:`<h2 id="s8">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div><strong>Market research provides the "why" behind the "what."</strong> Analytics tells you what is happening (40% of patients are not treated); research tells you why (physician inertia, patient reluctance, access barriers). Both are needed for effective strategy.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div><strong>Conjoint analysis is the gold standard for understanding treatment choice.</strong> By forcing trade-offs between attributes (efficacy, safety, convenience, cost), conjoint reveals what truly drives prescribing decisions — which is often different from what physicians state in direct questioning.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div><strong>ATU tracking is the brand health monitor.</strong> Awareness -> Trial -> Usage conversion rates reveal exactly where the marketing funnel is leaking, enabling targeted investment to close specific gaps.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div><strong>Stated preference differs from revealed preference.</strong> Always triangulate survey-based research with behavioral data from claims and prescribing databases. The gap between what HCPs say and what they do is often substantial.</div></div>`}
  ],
  questions:[
    {id:"q1",type:"mcq",difficulty:"Intermediate",question:"A brand has 75% aided awareness among target HCPs but only 25% have ever prescribed it. Which research approach best diagnoses the barrier between awareness and trial?",options:[{id:"a",text:"Claims data analysis"},{id:"b",text:"Qualitative IDIs exploring prescribing decision barriers"},{id:"c",text:"ATU tracking study"},{id:"d",text:"Pricing research"}],correct:"b",explanation:"The gap between awareness (75%) and trial (25%) suggests a qualitative barrier — perhaps safety concerns, formulary restrictions, lack of clinical conviction, or competitive preference. Qualitative IDIs allow deep exploration of individual decision-making to identify the specific barriers that quantitative data cannot explain."},
    {id:"q2",type:"mcq",difficulty:"Advanced",question:"In a conjoint analysis, the attribute importance weights are: efficacy 40%, safety 30%, dosing convenience 20%, cost 10%. What does this mean for brand positioning?",options:[{id:"a",text:"Price is not important and the brand can charge any price"},{id:"b",text:"Efficacy and safety together drive 70% of treatment choice — lead messaging with clinical differentiation"},{id:"c",text:"Only efficacy matters for prescribing decisions"},{id:"d",text:"The study design is flawed because weights should be equal"}],correct:"b",explanation:"The conjoint shows efficacy (40%) and safety (30%) together account for 70% of the treatment decision. Brand positioning should lead with clinical differentiation on these two dimensions. Cost at 10% suggests price is less important than clinical profile, but it still matters for payer access decisions."},
    {id:"q3",type:"mcq",difficulty:"Intermediate",question:"What is the primary advantage of max-diff over Likert scale rating for measuring attribute importance?",options:[{id:"a",text:"Max-diff is cheaper to administer"},{id:"b",text:"Max-diff forces trade-offs, producing greater discrimination between items and avoiding the tendency to rate everything as important"},{id:"c",text:"Max-diff requires smaller sample sizes"},{id:"d",text:"Max-diff is easier for respondents to understand"}],correct:"b",explanation:"Likert scales suffer from 'straight-lining' and lack of differentiation — respondents tend to rate most attributes as 4 or 5 out of 5. Max-diff forces choices (most important vs. least important), producing ratio-scaled data with much greater discrimination between attributes. This makes it far more actionable for prioritization decisions."},
    {id:"q4",type:"mcq",difficulty:"Intermediate",question:"An ATU study shows 60% trial but only 15% regular use. What is the most likely issue?",options:[{id:"a",text:"Low awareness requiring more promotion"},{id:"b",text:"Post-trial dissatisfaction (safety, efficacy, or operational issues) driving low repeat prescribing"},{id:"c",text:"Too many competitors in the market"},{id:"d",text:"Pricing is too high"}],correct:"b",explanation:"With 60% trial, HCPs are willing to try the product. But only 15% prescribe regularly, meaning most trialists do not continue. This trial-to-usage gap typically indicates post-trial dissatisfaction: adverse events, insufficient efficacy in real-world patients, formulary barriers on refills, or operational friction (complex dosing, patient complaints). Qualitative research with 'lapsed' prescribers would diagnose the specific cause."},
    {id:"q5",type:"mcq",difficulty:"Intermediate",question:"Why should pricing research be calibrated against revealed preference data (actual market pricing)?",options:[{id:"a",text:"Survey respondents consistently overstate their willingness to pay"},{id:"b",text:"Survey respondents tend to understate willingness to pay, and actual market pricing reflects what payers and patients actually accept"},{id:"c",text:"Survey data is always unreliable"},{id:"d",text:"Revealed preference data is easier to collect"}],correct:"b",explanation:"In pricing surveys, respondents (especially payers) tend to understate willingness to pay as a negotiation tactic. Calibrating survey results against the actual pricing of comparable products and recent market transactions provides a more realistic pricing range. The best pricing decisions triangulate stated preference, revealed preference, and health economic modeling."}
  ]
},


"2-13": {
  id:"2-13", title:"Pharma Supply Chain Analytics", domain:"Commercial Analytics", domain_id:2,
  level:"Intermediate", mins:60, available:true,
  tags:["Supply Chain","Wholesaler","Specialty Pharmacy","Distribution","DSCSA","Inventory Analytics"],
  objectives:["Map the pharma supply chain from manufacturer to patient","Identify key players including the Big 3 wholesalers and specialty distributors","Analyze distribution channels and demand signal flows","Calculate inventory metrics including days on hand and safety stock","Understand channel data sources and wholesaler economics","Apply DSCSA serialization requirements and cold chain considerations"],
  toc:[
    {id:"s1",title:"Supply Chain Structure",level:"h2"},
    {id:"s2",title:"Key Players & Distribution Channels",level:"h2"},
    {id:"s3",title:"Demand Signal Flow",level:"h2"},
    {id:"s4",title:"Inventory Analytics",level:"h2"},
    {id:"s5",title:"Channel Data & Analytics Sources",level:"h2"},
    {id:"s6",title:"Wholesaler Economics & Chargebacks",level:"h2"},
    {id:"s7",title:"DSCSA, Cold Chain & Specialty Considerations",level:"h2"},
    {id:"s8",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Supply Chain Structure</h2>
<p>The pharmaceutical supply chain is the physical and financial pathway through which drugs flow from manufacturer to patient. Unlike consumer goods, pharma supply chains are heavily regulated, involve multiple intermediaries, and have unique economics driven by rebates, chargebacks, and contractual pricing.</p>
<h3>End-to-End Supply Chain Map</h3>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Stage</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Entity</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Role</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Key Interaction</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">1. Manufacturing</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Pharma manufacturer / CMO</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Produce, package, quality release</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Sells to wholesaler at WAC</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">2. Wholesale</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">McKesson, AmerisourceBergen, Cardinal</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Warehouse, distribute, manage inventory</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Sells to pharmacies, hospitals</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">3a. Retail pharmacy</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">CVS, Walgreens, independent</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Dispense oral medications</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Fills Rx, bills insurance</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">3b. Specialty pharmacy</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Accredo, Optum SP, BrightSpring</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Dispense specialty drugs with patient services</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Dispense + adherence support</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">3c. Hospital/institutional</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Hospital pharmacy, clinic</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Administer IV/infused drugs</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Buy-and-bill model</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">4. Patient</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">End consumer</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Receives and uses medication</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Pays copay/coinsurance</td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">Why Supply Chain Matters for Commercial Analytics</div><p>Supply chain data is the earliest signal of demand. Wholesaler orders arrive weeks before prescription data. Pipeline fill (initial stocking) during a launch creates a demand signal that does not yet represent patient consumption. Understanding supply chain dynamics prevents misinterpreting early revenue signals.</p></div>`},
    {id:"s2",content:`<h2 id="s2">Key Players & Distribution Channels</h2>
<h3>The Big 3 Wholesalers</h3>
<p>Three wholesalers control approximately 90% of US pharmaceutical distribution:</p>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Wholesaler</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Market Share</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Key Assets</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>McKesson</strong></td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">~35%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">US Oncology Network, CoverMyMeds</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>Cencora (formerly AmerisourceBergen)</strong></td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">~33%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">AmerisourceBergen Specialty, Lash Group (hub)</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>Cardinal Health</strong></td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">~25%</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Specialty solutions, nuclear pharmacy</td></tr>
</tbody></table>
<h3>Distribution Channels</h3>
<ul>
<li><strong>Retail pharmacy:</strong> Oral generics and branded oral drugs. High volume, low margin. CVS, Walgreens, Walmart, independents.</li>
<li><strong>Mail order:</strong> Maintenance medications for chronic conditions. 90-day supplies, lower copays. Express Scripts, OptumRx, CVS Caremark.</li>
<li><strong>Specialty pharmacy:</strong> High-cost, complex therapies requiring special handling, storage, or patient support. Growing at 10-15% annually.</li>
<li><strong>Hospital/institutional:</strong> IV and infused products purchased through GPOs (Vizient, Premier, HealthTrust). Buy-and-bill model: hospital purchases drug and bills payer at ASP+6%.</li>
<li><strong>340B:</strong> Eligible entities (safety-net hospitals, FQHCs) purchase at 340B ceiling price. Growing channel with significant GTN implications.</li>
</ul>`},
    {id:"s3",content:`<h2 id="s3">Demand Signal Flow</h2>
<p>Understanding how demand signals flow through the supply chain is critical for interpreting sales data accurately.</p>
<h3>The Demand Signal Chain</h3>
<ol>
<li><strong>Patient prescription (Rx):</strong> HCP writes prescription (Day 0)</li>
<li><strong>Pharmacy dispense:</strong> Pharmacy fills and dispenses to patient (Day 0-3)</li>
<li><strong>Pharmacy order:</strong> Pharmacy replenishes inventory from wholesaler (Day 1-7)</li>
<li><strong>Wholesaler order:</strong> Wholesaler replenishes from manufacturer (Day 7-14)</li>
<li><strong>Manufacturer shipment:</strong> Recognized as gross revenue (Day 14-21)</li>
</ol>
<h3>Sell-In vs. Sell-Through</h3>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Metric</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Definition</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">What It Represents</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>Sell-in</strong> (ex-factory)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Units shipped from manufacturer to wholesaler</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Revenue recognition, pipeline fill</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top"><strong>Sell-through</strong></td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Units dispensed to patients</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">True patient demand (TRx)</td></tr>
</tbody></table>
<p><strong>Critical insight:</strong> During a launch, sell-in exceeds sell-through because of pipeline fill — wholesalers and pharmacies are stocking product for the first time. This creates a revenue "bubble" in Q1 that deflates in Q2 as the channel reaches steady-state inventory. Always track the sell-in/sell-through gap to avoid misinterpreting launch revenue.</p>
<pre><code class="language-python"># Stocking factor calculation
stocking_factor = sell_in_units / sell_through_units
# Steady state: 1.00 - 1.05
# Launch Q1: 1.10 - 1.30 (pipeline fill)
# If > 1.20 in steady state: channel may be over-stocked (future destocking risk)</code></pre>`},
    {id:"s4",content:`<h2 id="s4">Inventory Analytics</h2>
<p>Inventory analytics ensures optimal stock levels across the supply chain — enough to prevent stockouts but not so much that capital is tied up in excess inventory.</p>
<h3>Key Inventory Metrics</h3>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Metric</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Formula</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Target</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Days on Hand (DOH)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Current inventory / Daily demand rate</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">15-30 days (wholesaler)</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Safety Stock</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Z x sigma x sqrt(lead_time)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">2-4 weeks of demand</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Weeks of Supply (WOS)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Current inventory / Weekly demand</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">4-6 weeks total channel</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Fill Rate</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Orders fulfilled on time / Total orders</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">>98%</td></tr>
</tbody></table>
<pre><code class="language-python">import numpy as np

def calculate_safety_stock(
    avg_daily_demand, demand_std, lead_time_days, service_level=0.95
):
    """
    Calculate safety stock for a pharmaceutical product.
    service_level: 0.95 = 95% fill rate, 0.99 = 99%
    """
    from scipy.stats import norm
    z = norm.ppf(service_level)  # 1.65 for 95%, 2.33 for 99%

    safety_stock = z * demand_std * np.sqrt(lead_time_days)
    reorder_point = (avg_daily_demand * lead_time_days) + safety_stock

    return {
        'safety_stock_units': round(safety_stock, 0),
        'safety_stock_days': round(safety_stock / avg_daily_demand, 1),
        'reorder_point': round(reorder_point, 0)
    }</code></pre>
<div class="callout callout-tip"><div class="callout-title">Inventory Agreements</div><p>Most manufacturers have Inventory Management Agreements (IMAs) with the Big 3 wholesalers that cap inventory at specific DOH levels (typically 2-4 weeks). These agreements prevent wholesaler speculation (buying ahead of price increases) and smooth demand signals. Track IMA compliance to ensure channel inventory does not distort demand.</p></div>`},
    {id:"s5",content:`<h2 id="s5">Channel Data & Analytics Sources</h2>
<p>Multiple data sources provide visibility into supply chain dynamics:</p>
<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Data Source</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Provider</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">What It Captures</th><th style="text-align:left;padding:8px;border-bottom:2px solid #334155;font-size:12px">Lag</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Direct Distribution Data (DDD)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">IQVIA</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Wholesaler-to-pharmacy shipments by product/outlet</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">1-2 weeks</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">APLD (Anonymous Patient-Level Data)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">IQVIA</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Patient-level prescription activity</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">2-4 weeks</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Specialty pharmacy data</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">SP partners, IQVIA SP</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">SP dispensing, adherence, fulfillment metrics</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">1-2 weeks</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">867/852 EDI data</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Wholesalers direct</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Inventory on hand (867) and purchase orders (852)</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Weekly</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Chargeback data</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Wholesalers</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">Contracted pricing adjustments by customer</td><td style="padding:8px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top">1-4 weeks</td></tr>
</tbody></table>
<h3>Reconciling Data Sources</h3>
<p>A critical analytics task is reconciling sell-in data (852/867) with sell-through data (TRx) to identify channel inventory changes. If sell-in exceeds sell-through for multiple periods, inventory is building; if sell-through exceeds sell-in, destocking is occurring. Either creates a disconnect between revenue and patient demand.</p>`},
    {id:"s6",content:`<h2 id="s6">Wholesaler Economics & Chargebacks</h2>
<p>Wholesalers operate on thin margins (1-3% of revenue), earning income from three sources:</p>
<ul>
<li><strong>Distribution fees:</strong> Charged to manufacturers as a % of WAC (typically 2-5%)</li>
<li><strong>Prompt pay discounts:</strong> Manufacturers offer 2% discount for payment within terms (e.g., net 30 days)</li>
<li><strong>Inventory appreciation:</strong> When manufacturers raise WAC, wholesaler inventory purchased at the old price gains value (though IMAs limit this)</li>
</ul>
<h3>Chargeback Mechanics</h3>
<p>The chargeback process works as follows:</p>
<ol>
<li>Manufacturer sells to wholesaler at WAC ($100)</li>
<li>Wholesaler sells to a hospital with a GPO contract price of $70</li>
<li>Wholesaler submits a chargeback claim to manufacturer for $30 (WAC - contract price)</li>
<li>Manufacturer pays the $30 chargeback</li>
</ol>
<p><strong>Net effect:</strong> The manufacturer receives $100 (WAC) minus $30 (chargeback) = $70 net, which equals the contracted price. Chargebacks are a major GTN line item for products sold through institutional channels.</p>
<div class="callout"><div class="callout-title">Chargeback Analytics Value</div><p>Chargeback data is one of the earliest demand signals available — it arrives weeks before prescription-level data. Analyzing chargeback claims by customer, product, and time period provides near-real-time visibility into institutional demand. It also reveals contract compliance issues (claims for contracts that should not apply).</p></div>`},
    {id:"s7",content:`<h2 id="s7">DSCSA, Cold Chain & Specialty Considerations</h2>
<h3>Drug Supply Chain Security Act (DSCSA)</h3>
<p>DSCSA (enacted 2013, full enforcement by 2023-2024) requires end-to-end serialization and track-and-trace of pharmaceutical products. Key requirements:</p>
<ul>
<li><strong>Unit-level serialization:</strong> Every saleable unit has a unique serial number (GTIN + serial number + lot + expiry)</li>
<li><strong>Transaction data exchange:</strong> Each change of ownership must be accompanied by transaction information (TI), transaction history (TH), and transaction statement (TS)</li>
<li><strong>Verification:</strong> Trading partners must verify suspect products and respond to verification requests within 24 hours</li>
<li><strong>Interoperable tracing:</strong> Ability to trace a product through all distribution points from manufacturer to dispenser</li>
</ul>
<h3>Cold Chain Analytics for Biologics</h3>
<p>Biologics (monoclonal antibodies, vaccines, cell/gene therapies) require temperature-controlled distribution (2-8C for most biologics, -20C to -80C for some cell therapies). Cold chain analytics monitors:</p>
<ul>
<li><strong>Temperature excursions:</strong> Any period where product temperature goes outside specified range</li>
<li><strong>Excursion impact:</strong> Duration and magnitude determine whether product is still usable (requires stability data)</li>
<li><strong>Shipping lane analysis:</strong> Identify high-risk routes (hot climates, long transit times) for proactive mitigation</li>
</ul>
<h3>Shortage & Allocation Analytics</h3>
<p>When supply cannot meet demand, allocation analytics determines fair distribution:</p>
<ul>
<li><strong>Proportional allocation:</strong> Each customer receives their historical share of available supply</li>
<li><strong>Clinical priority:</strong> Allocate based on clinical urgency (oncology patients may take priority over elective use)</li>
<li><strong>Monitoring:</strong> Track shortage status on FDA Drug Shortage Database and ASHP</li>
</ul>
<h3>Pull-Through from Formulary Through Supply Chain</h3>
<p>The commercial supply chain challenge is ensuring that formulary wins translate to actual product flow: formulary approval -> pharmacy stocking -> physician ordering -> patient dispensing. Analytics must track each handoff to identify where formulary wins fail to convert to demand.</p>`},
    {id:"s8",content:`<h2 id="s8">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div><strong>The Big 3 wholesalers control 90% of US distribution.</strong> McKesson, Cencora (AmerisourceBergen), and Cardinal Health are the critical intermediaries. Understanding their economics (distribution fees, chargebacks, IMAs) is essential for supply chain analytics.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div><strong>Sell-in does not equal sell-through.</strong> Revenue recognition is based on sell-in (manufacturer to wholesaler), but true demand is sell-through (pharmacy to patient). During launches, pipeline fill inflates sell-in by 10-30%. Always reconcile both to avoid misinterpreting demand.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div><strong>Chargeback data is the earliest demand signal.</strong> It arrives weeks before prescription data and provides institutional demand visibility. For hospital-dispensed products, chargeback analytics is the primary commercial intelligence tool.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div><strong>DSCSA serialization enables unprecedented supply chain visibility.</strong> Unit-level tracking from manufacturer to dispenser creates a complete chain of custody. Beyond compliance, this data enables counterfeit detection, targeted recalls, and real-time inventory visibility across the entire channel.</div></div>`}
  ],
  questions:[
    {id:"q1",type:"mcq",difficulty:"Intermediate",question:"During a brand launch, Q1 sell-in (ex-factory) revenue is $50M but estimated patient demand (sell-through) is only $35M. What explains the $15M gap?",options:[{id:"a",text:"Revenue recognition error"},{id:"b",text:"Pipeline fill — wholesalers and pharmacies are stocking initial inventory"},{id:"c",text:"Patients are stockpiling medication"},{id:"d",text:"Wholesaler speculation on price increases"}],correct:"b",explanation:"Pipeline fill during a launch creates a one-time demand bubble as the distribution channel stocks product for the first time. This $15M represents inventory sitting in wholesalers and pharmacy shelves, not patient consumption. Q2 sell-in will likely be lower as the channel reaches steady state. This is a normal launch dynamic."},
    {id:"q2",type:"mcq",difficulty:"Intermediate",question:"Which three companies control approximately 90% of US pharmaceutical wholesale distribution?",options:[{id:"a",text:"CVS, Walgreens, and Rite Aid"},{id:"b",text:"McKesson, Cencora (AmerisourceBergen), and Cardinal Health"},{id:"c",text:"Express Scripts, OptumRx, and CVS Caremark"},{id:"d",text:"IQVIA, Veeva, and Komodo"}],correct:"b",explanation:"McKesson (~35%), Cencora/AmerisourceBergen (~33%), and Cardinal Health (~25%) are the Big 3 wholesalers. They serve as the critical intermediary between manufacturers and pharmacies/hospitals, managing warehousing, distribution, and financial transactions including chargebacks."},
    {id:"q3",type:"mcq",difficulty:"Advanced",question:"A hospital purchases a drug at $70 through a GPO contract. The wholesaler sold it at WAC of $100. Who pays the $30 difference and what is this payment called?",options:[{id:"a",text:"The hospital pays the difference as a surcharge"},{id:"b",text:"The wholesaler absorbs the loss as a distribution cost"},{id:"c",text:"The manufacturer pays the wholesaler $30 as a chargeback"},{id:"d",text:"The GPO pays a rebate to the manufacturer"}],correct:"c",explanation:"The manufacturer pays the $30 chargeback to the wholesaler. The wholesaler purchased at WAC ($100) but sold at the GPO contract price ($70). The chargeback makes the wholesaler whole, and the manufacturer's net revenue is $70 (WAC minus chargeback). Chargebacks are a major GTN deduction for institutional products."},
    {id:"q4",type:"mcq",difficulty:"Intermediate",question:"What is the key requirement of DSCSA for pharmaceutical products?",options:[{id:"a",text:"All drugs must be sold at government-mandated prices"},{id:"b",text:"Unit-level serialization and track-and-trace from manufacturer to dispenser"},{id:"c",text:"Wholesalers must maintain 90-day inventory"},{id:"d",text:"All prescriptions must be electronically transmitted"}],correct:"b",explanation:"DSCSA requires every saleable pharmaceutical unit to have a unique serial number and mandates interoperable tracing capability from manufacturer through wholesaler/distributor to dispenser. This creates a complete chain of custody that enables counterfeit detection, targeted recalls, and supply chain visibility."},
    {id:"q5",type:"mcq",difficulty:"Intermediate",question:"A product's weeks of supply (WOS) in the channel has increased from 4 weeks to 8 weeks over 3 months while prescription demand is flat. What is the risk?",options:[{id:"a",text:"No risk — more inventory means better service"},{id:"b",text:"Destocking risk: when WOS normalizes, sell-in will drop significantly below sell-through for several periods"},{id:"c",text:"The product is going on shortage"},{id:"d",text:"Wholesaler pricing speculation"}],correct:"b",explanation:"Rising WOS with flat demand means the channel is accumulating excess inventory. When inventory normalizes (through reduced ordering), sell-in will drop below sell-through for several periods as the excess is consumed. This creates a revenue trough that can mislead management into thinking demand is declining when it is actually the channel destocking. Monitor sell-in/sell-through ratios weekly."}
  ]
}

});
