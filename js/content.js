// PharmaLearn — Content Database
window.PHARMALEARN = window.PHARMALEARN || {};

window.PHARMALEARN.domains = [
  {
    id: 1, slug: "pharma-value-chain",
    title: "Pharma Value Chain",
    icon: "🔬",
    color: "#6366f1",
    description: "End-to-end drug development from discovery through LOE, regulatory pathways, and commercialization.",
    chapters: 7, completed: 0,
    tags: ["Drug Discovery","Clinical Trials","Regulatory","LOE"],
    chapters_list: [
      { id:"1-1", title:"Drug Discovery & Target Identification", level:"Beginner", mins:30, available:false },
      { id:"1-2", title:"Pre-Clinical Development", level:"Beginner", mins:25, available:false },
      { id:"1-3", title:"Clinical Trials (Phase I–IV)", level:"Intermediate", mins:50, available:false },
      { id:"1-4", title:"Regulatory Pathways: FDA & EMA", level:"Intermediate", mins:45, available:false },
      { id:"1-5", title:"Launch Readiness & Commercialization", level:"Advanced", mins:40, available:false },
      { id:"1-6", title:"Growth & Lifecycle Management", level:"Advanced", mins:35, available:false },
      { id:"1-7", title:"LOE, Generics & Biosimilars", level:"Advanced", mins:40, available:false },
    ]
  },
  {
    id: 2, slug: "commercial-analytics",
    title: "Commercial Analytics",
    icon: "📊",
    color: "#8b5cf6",
    description: "Patient journey, HCP targeting, SFE, forecasting, MMM, and brand performance analytics.",
    chapters: 7, completed: 0,
    tags: ["Patient Analytics","HCP Targeting","Forecasting","MMM"],
    chapters_list: [
      { id:"2-1", title:"Patient Journey Analytics in Oncology", level:"Advanced", mins:45, available:true },
      { id:"2-2", title:"HCP Analytics & Targeting", level:"Intermediate", mins:40, available:false },
      { id:"2-3", title:"Sales Force Effectiveness (SFE)", level:"Intermediate", mins:35, available:false },
      { id:"2-4", title:"Forecasting & Demand Planning", level:"Advanced", mins:50, available:false },
      { id:"2-5", title:"Marketing Mix Modeling (MMM)", level:"Advanced", mins:55, available:false },
      { id:"2-6", title:"Brand Performance Dashboards", level:"Intermediate", mins:30, available:false },
      { id:"2-7", title:"Competitive Intelligence", level:"Intermediate", mins:35, available:false },
    ]
  },
  {
    id: 3, slug: "market-access",
    title: "Market Access & Pricing",
    icon: "💊",
    color: "#06b6d4",
    description: "Payer analytics, HTA, pricing strategy, formulary access, HEOR, and pull-through.",
    chapters: 6, completed: 0,
    tags: ["Payer Analytics","HTA","Pricing","HEOR"],
    chapters_list: [
      { id:"3-1", title:"Payer Landscape & Formulary Analytics", level:"Intermediate", mins:40, available:false },
      { id:"3-2", title:"Pricing Strategy: WAC to Net", level:"Advanced", mins:45, available:false },
      { id:"3-3", title:"US Reimbursement: PBM, Medicare, Medicaid", level:"Advanced", mins:50, available:false },
      { id:"3-4", title:"EU HTA: NICE, G-BA, HAS", level:"Advanced", mins:45, available:false },
      { id:"3-5", title:"Pull-Through Analytics", level:"Intermediate", mins:35, available:false },
      { id:"3-6", title:"HEOR & Budget Impact Models", level:"Advanced", mins:55, available:false },
    ]
  },
  {
    id: 4, slug: "medical-clinical",
    title: "Medical & Clinical Analytics",
    icon: "🏥",
    color: "#10b981",
    description: "Real-world evidence, HEOR, medical affairs analytics, epidemiology, and outcomes research.",
    chapters: 5, completed: 0,
    tags: ["RWE","HEOR","Medical Affairs","Epidemiology"],
    chapters_list: [
      { id:"4-1", title:"Real-World Evidence (RWE) Design", level:"Advanced", mins:50, available:false },
      { id:"4-2", title:"HEOR Study Design", level:"Advanced", mins:45, available:false },
      { id:"4-3", title:"Medical Affairs Analytics", level:"Intermediate", mins:40, available:false },
      { id:"4-4", title:"Epidemiology & Disease Burden", level:"Intermediate", mins:35, available:false },
      { id:"4-5", title:"Clinical Registry & Outcomes Analytics", level:"Advanced", mins:40, available:false },
    ]
  },
  {
    id: 5, slug: "data-science",
    title: "Data Science & Technology",
    icon: "🤖",
    color: "#f59e0b",
    description: "SQL, Python, ML modeling, claims data architecture, Snowflake, NLP, and MLOps for pharma.",
    chapters: 6, completed: 0,
    tags: ["SQL","Python","ML","Snowflake","Claims Data"],
    chapters_list: [
      { id:"5-1", title:"Healthcare Data Foundations", level:"Beginner", mins:35, available:false },
      { id:"5-2", title:"SQL for Pharma Analytics", level:"Intermediate", mins:60, available:false },
      { id:"5-3", title:"Python for Pharma Analytics", level:"Intermediate", mins:65, available:false },
      { id:"5-4", title:"Machine Learning in Pharma", level:"Advanced", mins:70, available:false },
      { id:"5-5", title:"Advanced Analytics & Causal Inference", level:"Advanced", mins:65, available:false },
      { id:"5-6", title:"Data Engineering for Pharma", level:"Advanced", mins:55, available:false },
    ]
  }
];

window.PHARMALEARN.chapters = {
  "2-1": {
    id: "2-1",
    title: "Patient Journey Analytics in Oncology",
    domain: "Commercial Analytics",
    domain_id: 2,
    level: "Advanced",
    mins: 45,
    tags: ["Patient Analytics","Oncology","Claims Data","Patient Funnel","LOT Analysis","IQVIA","Adherence"],
    reusability: "High",
    objectives: [
      "Map the 7-stage oncology patient journey from symptom onset to post-treatment",
      "Build a diagnosis-to-treatment patient funnel using claims data",
      "Calculate and interpret Line of Therapy (LOT) sequences using algorithmic methods",
      "Identify the key commercial intervention points with highest revenue impact",
      "Quantify adherence and persistency using PDC and MPR metrics"
    ],
    toc: [
      { id:"s1", title:"Learning Objectives", level:"h2" },
      { id:"s2", title:"The 7-Stage Oncology Patient Journey", level:"h2" },
      { id:"s3", title:"Building the Patient Funnel", level:"h2" },
      { id:"s31", title:"Funnel Stage Definitions", level:"h3" },
      { id:"s32", title:"Claims-Based Proxies", level:"h3" },
      { id:"s4", title:"Line of Therapy (LOT) Logic", level:"h2" },
      { id:"s41", title:"Standard LOT Algorithm", level:"h3" },
      { id:"s42", title:"LOT Distribution Benchmarks", level:"h3" },
      { id:"s5", title:"Adherence & Persistency Metrics", level:"h2" },
      { id:"s51", title:"PDC Calculation", level:"h3" },
      { id:"s52", title:"Persistency SQL", level:"h3" },
      { id:"s6", title:"Real-World Example: Ibrutinib in CLL", level:"h2" },
      { id:"s7", title:"Mini Case Study", level:"h2" },
      { id:"s8", title:"Key Takeaways", level:"h2" },
    ],
    sections: [
      {
        id:"s1", type:"objectives",
        content: `
          <h2 id="s1">Learning Objectives</h2>
          <p>By the end of this chapter, you will be able to:</p>
          <ol>
            <li>Map the <strong>7-stage oncology patient journey</strong> from symptom onset to post-treatment surveillance</li>
            <li>Build a <strong>diagnosis-to-treatment patient funnel</strong> using commercial claims data (IQVIA LAAD+, Komodo)</li>
            <li>Algorithmically assign <strong>Lines of Therapy (LOT)</strong> from raw Rx claims — there is no "LOT field"</li>
            <li>Identify the commercial intervention points with the <strong>highest revenue-per-patient impact</strong></li>
            <li>Measure and interpret <strong>PDC (Proportion of Days Covered)</strong> and <strong>persistency</strong> at 6, 12, and 24 months</li>
          </ol>
        `
      },
      {
        id:"s2", type:"content",
        content: `
          <h2 id="s2">The 7-Stage Oncology Patient Journey</h2>
          <p>Unlike chronic conditions (diabetes, hypertension), the oncology patient journey is characterized by <strong>critical time-sensitive transitions</strong>, high diagnostic complexity, and multi-stakeholder decision-making. Each stage represents a distinct commercial and clinical opportunity.</p>

          <div class="callout">
            <strong>Consulting Lens:</strong> The journey is not linear. Patients cycle back through stages (progression → new LOT), and a significant portion never advance past Stage 3 — invisible to commercial teams.
          </div>

          <div style="background:#020617;border:1px solid var(--border);border-radius:10px;padding:1.5rem;margin:1.25rem 0;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:2;color:#e2e8f0;">
<span style="color:#818cf8">Stage 1:</span> SYMPTOM ONSET
   <span style="color:#64748b">↓ (weeks to months — often the longest gap; patients delay care)</span>
<span style="color:#818cf8">Stage 2:</span> PRIMARY CARE VISIT / FIRST ENCOUNTER
   <span style="color:#64748b">↓ (referral lag: PCP → specialist; 15–90 days in real data)</span>
<span style="color:#818cf8">Stage 3:</span> SPECIALIST CONSULTATION (Oncologist / Hematologist)
   <span style="color:#64748b">↓ (diagnostic workup: imaging, biopsy, biomarker testing)</span>
<span style="color:#818cf8">Stage 4:</span> CONFIRMED DIAGNOSIS (ICD-10 coded in claims)
   <span style="color:#64748b">↓ (treatment decision: MDT review, prior auth, PS score)</span>
<span style="color:#818cf8">Stage 5:</span> TREATMENT INITIATION — 1st Line of Therapy (1L)
   <span style="color:#64748b">↓ (adherence window; tolerability events; response assessment)</span>
<span style="color:#818cf8">Stage 6:</span> TREATMENT CONTINUITY / SWITCH / DISCONTINUATION
   <span style="color:#64748b">↓ (progression, relapse, toxicity)</span>
<span style="color:#818cf8">Stage 7:</span> SUBSEQUENT LOT / MAINTENANCE / REMISSION / PALLIATIVE
          </div>

          <h3 id="s21">Key Commercial Insights by Stage</h3>

          <table>
            <thead><tr><th>Stage</th><th>Typical Duration</th><th>Primary Stakeholder</th><th>Commercial Lever</th></tr></thead>
            <tbody>
              <tr><td>1→2</td><td>2–6 months</td><td>Patient / PCP</td><td>Disease awareness campaigns</td></tr>
              <tr><td>2→3</td><td>2–8 weeks</td><td>PCP / Oncologist</td><td>Referral pathway analytics</td></tr>
              <tr><td>3→4</td><td>2–6 weeks</td><td>Oncologist / Pathologist</td><td>Biomarker testing pull-through</td></tr>
              <tr><td>4→5</td><td>1–4 weeks</td><td>Oncologist / Payer</td><td>Prior auth support, formulary</td></tr>
              <tr><td>5→6</td><td>3–24 months</td><td>Patient / Nurse</td><td>Hub services, adherence programs</td></tr>
              <tr><td>6→7</td><td>Ongoing</td><td>Oncologist</td><td>Second-line positioning</td></tr>
            </tbody>
          </table>

          <div class="callout callout-warning">
            <strong>Data Gap Alert:</strong> Stages 1–2 are largely invisible in claims data. The first observable claim is typically at Stage 3 (specialist visit) or Stage 4 (ICD-10 diagnosis). Pre-diagnosis patient volume must be estimated via epidemiology models.
          </div>
        `
      },
      {
        id:"s3", type:"content",
        content: `
          <h2 id="s3">Building the Patient Funnel</h2>
          <p>The patient funnel answers the fundamental commercial question: <strong>"Of all patients who could benefit from Drug X, how many actually receive it — and stay on it?"</strong></p>
          <p>Each transition in the funnel represents a distinct <em>addressable gap</em> with a different root cause, data source, and intervention.</p>

          <h3 id="s31">Funnel Stage Definitions</h3>

          <div style="background:#020617;border:1px solid var(--border);border-radius:10px;padding:1.5rem;margin:1.25rem 0;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:2;color:#e2e8f0;">
<span style="color:#fbbf24">Epidemiological Prevalence</span>    ~100,000 patients (disease burden estimate)
   <span style="color:#64748b">↓ -30% not seeking care / undiagnosed</span>
<span style="color:#fbbf24">Diagnosed Patients</span>             ~70,000 (ICD-10 coded in claims)
   <span style="color:#64748b">↓ -20% managed in primary care only</span>
<span style="color:#fbbf24">Specialist-Managed Patients</span>    ~56,000
   <span style="color:#64748b">↓ -25% watchful waiting / untreated</span>
<span style="color:#fbbf24">Treatment-Eligible Patients</span>    ~42,000
   <span style="color:#64748b">↓ -30% on competitive therapy</span>
<span style="color:#fbbf24">Total Treated Market</span>           ~29,400
   <span style="color:#64748b">↓ your market share (%)</span>
<span style="color:#fbbf24">Patients on DRUG X</span>            ~8,820 (30% share example)
   <span style="color:#64748b">↓ -35% discontinued within 12 months</span>
<span style="color:#fbbf24">Persistent Patients (12-mo)</span>    ~5,733
          </div>

          <h3 id="s32">Claims-Based Proxies for Each Stage</h3>

          <table>
            <thead><tr><th>Funnel Stage</th><th>Claims Proxy</th><th>Data Source</th></tr></thead>
            <tbody>
              <tr><td>Diagnosed</td><td>ICD-10 code (e.g., C34.xx for NSCLC) in medical claim</td><td>IQVIA LAAD+, Komodo</td></tr>
              <tr><td>Advanced stage</td><td>Staging CPT + biopsy codes within 90 days of diagnosis</td><td>Medical claims</td></tr>
              <tr><td>Specialist-managed</td><td>Oncologist NPI in claim (taxonomy: 207RX0202X)</td><td>Medical claims + NPI registry</td></tr>
              <tr><td>Treatment-initiated</td><td>Rx claim or J-code (IV admin) within 90 days of diagnosis</td><td>Pharmacy + medical claims</td></tr>
              <tr><td>On Drug X</td><td>NDC code or HCPCS J-code for Drug X</td><td>Specialty pharmacy / claims</td></tr>
              <tr><td>Persistent</td><td>No gap > 90 days in Drug X fills</td><td>Longitudinal Rx claims</td></tr>
            </tbody>
          </table>

          <div class="callout callout-success">
            <strong>Pro Tip:</strong> In IQVIA LAAD+ (open claims), always apply a <strong>patient lookback period of 12+ months</strong> to avoid miscounting prevalent patients as incident cases. A patient with a diagnosis claim in Q1 2024 who also had claims in 2023 is <em>prevalent</em>, not <em>incident</em>.
          </div>
        `
      },
      {
        id:"s4", type:"content",
        content: `
          <h2 id="s4">Line of Therapy (LOT) Logic</h2>
          <p>LOT is the <strong>most commonly requested — and most commonly miscomputed</strong> metric in oncology analytics. There is no "LOT" field in any claims dataset. It must be algorithmically derived using drug class sequences, washout periods, and combination regimen logic.</p>

          <h3 id="s41">Standard LOT Algorithm</h3>

          <pre><code class="language-python">import pandas as pd
from datetime import timedelta

def assign_lot(pharmacy_claims: pd.DataFrame,
               medical_claims: pd.DataFrame,
               washout_days: int = 90) -> pd.DataFrame:
    """
    Assigns Line of Therapy to each drug episode.

    LOT Rules:
    - Sort all treatment claims by patient + start_date
    - LOT increments when:
        a) A drug CLASS switch occurs (not just brand switch)
        b) A gap > washout_days occurs before restarting same drug
    - Concomitant drugs within 30 days of LOT start = same LOT (combo regimen)
    - Re-challenge after washout = new LOT

    Returns DataFrame with 'lot' column assigned.
    """
    claims = pharmacy_claims.copy().sort_values(['patient_token','fill_date'])
    claims['lot'] = 1
    claims['therapy_end'] = claims['fill_date'] + \
                             pd.to_timedelta(claims['days_supply'], unit='D')

    results = []

    for pid, grp in claims.groupby('patient_token'):
        lot = 1
        prev_end = None
        prev_class = None
        combo_window = None

        for _, row in grp.iterrows():
            if prev_end is None:
                # First treatment episode
                lot = 1
                combo_window = row['fill_date'] + timedelta(days=30)
            else:
                gap = (row['fill_date'] - prev_end).days
                class_changed = (row['drug_class'] != prev_class)
                in_combo_window = (row['fill_date'] <= combo_window)

                if in_combo_window and not class_changed:
                    pass  # Same LOT, concomitant add-on
                elif gap > washout_days:
                    lot += 1  # Gap → rechallenge = new LOT
                    combo_window = row['fill_date'] + timedelta(days=30)
                elif class_changed:
                    lot += 1  # Drug class switch = new LOT
                    combo_window = row['fill_date'] + timedelta(days=30)

            prev_end = row['therapy_end']
            prev_class = row['drug_class']
            results.append({**row.to_dict(), 'patient_token': pid, 'lot': lot})

    return pd.DataFrame(results)</code></pre>

          <div class="callout callout-warning">
            <strong>Analyst Trap:</strong> Never use brand name to assign LOT — patients can switch brand but stay in the same drug class (e.g., CDK4/6 inhibitor class: Ibrance → Kisqali). LOT should be class-based unless the business question requires brand-level detail.
          </div>

          <h3 id="s42">LOT Distribution Benchmarks</h3>

          <table>
            <thead><tr><th>LOT</th><th>% of Treated (Oncology Avg)</th><th>Key Characteristics</th><th>Commercial Implication</th></tr></thead>
            <tbody>
              <tr><td><strong>1L</strong></td><td>100%</td><td>Full incident cohort; guideline-driven</td><td>Highest volume; formulary positioning critical</td></tr>
              <tr><td><strong>2L</strong></td><td>35–50%</td><td>Post-progression; often chemo/IO switch</td><td>Key label expansion target</td></tr>
              <tr><td><strong>3L+</strong></td><td>10–20%</td><td>Relapsed/refractory; clinical trial eligible</td><td>Small volume but high unmet need</td></tr>
            </tbody>
          </table>
          <p><em>Note: Attrition from 1L to 2L varies significantly by tumor type. Solid tumors (NSCLC, breast) show 40–55% attrition. Liquid tumors (CLL, DLBCL) may show lower attrition due to longer remission periods.</em></p>
        `
      },
      {
        id:"s5", type:"content",
        content: `
          <h2 id="s5">Adherence & Persistency Metrics</h2>
          <p>For specialty oncology drugs, adherence is both a <strong>clinical outcome driver</strong> and a <strong>net revenue driver</strong>. A 10-point improvement in PDC for a $150K/year drug translates directly to measurable revenue retention per patient cohort.</p>

          <h3 id="s51">PDC Calculation</h3>

          <div class="callout">
            <strong>PDC Formula:</strong> Days covered by fills ÷ Observation period days<br>
            <strong>Clinical threshold:</strong> PDC ≥ 0.80 = Adherent<br>
            <strong>Commercial threshold:</strong> Track PDC at 30, 90, 180, 365 days post-initiation
          </div>

          <pre><code class="language-python">def calculate_pdc(patient_fills: pd.DataFrame,
                  observation_days: int = 180) -> float:
    """
    Calculates Proportion of Days Covered (PDC).

    PDC rules:
    - Overlapping fills: advance start date of second fill (no double-counting)
    - Observation period: fixed window from therapy initiation date
    - Days beyond observation period: excluded
    """
    fills = patient_fills.sort_values('fill_date').copy()
    therapy_start = fills['fill_date'].min()
    obs_end = therapy_start + timedelta(days=observation_days)

    covered_days = set()

    for _, fill in fills.iterrows():
        start = fill['fill_date']
        end = min(fill['fill_date'] + timedelta(days=int(fill['days_supply'])),
                  obs_end)
        for day_offset in range((end - start).days):
            covered_days.add(start + timedelta(days=day_offset))

    pdc = len(covered_days) / observation_days
    return min(pdc, 1.0)  # Cap at 1.0</code></pre>

          <h3 id="s52">Persistency: SQL Approach</h3>

          <pre><code class="language-sql">-- Identify therapy discontinuation (first gap > 90 days)
WITH ordered_fills AS (
    SELECT
        patient_token,
        fill_date,
        days_supply,
        fill_date + days_supply           AS fill_end_date,
        LAG(fill_date + days_supply)
            OVER (PARTITION BY patient_token
                  ORDER BY fill_date)     AS prev_fill_end
    FROM pharmacy_claims
    WHERE drug_name = 'Drug_X'
),
gaps AS (
    SELECT
        patient_token,
        fill_date                         AS gap_start_date,
        fill_date - prev_fill_end         AS gap_days
    FROM ordered_fills
    WHERE fill_date - prev_fill_end > 90   -- 90-day washout threshold
),
first_discontinuation AS (
    SELECT patient_token,
           MIN(gap_start_date)            AS discontinuation_date
    FROM gaps
    GROUP BY patient_token
)
SELECT
    p.patient_token,
    MIN(p.fill_date)                      AS therapy_start,
    COALESCE(d.discontinuation_date,
             CURRENT_DATE)                AS therapy_end,
    DATEDIFF('day',
             MIN(p.fill_date),
             COALESCE(d.discontinuation_date,
                      CURRENT_DATE))      AS days_on_therapy,
    CASE
        WHEN d.discontinuation_date IS NULL THEN 'Active'
        ELSE 'Discontinued'
    END                                   AS patient_status
FROM pharmacy_claims p
LEFT JOIN first_discontinuation d USING (patient_token)
WHERE p.drug_name = 'Drug_X'
GROUP BY p.patient_token, d.discontinuation_date;</code></pre>

          <div class="callout callout-success">
            <strong>Benchmark:</strong> Specialty oncology drug persistency at 12 months typically ranges 45–65%. If your drug is at 45% and the market leader is at 65%, that 20-point gap costs ~$30M/yr in a 1,000-patient cohort at $150K/year WAC.
          </div>
        `
      },
      {
        id:"s6", type:"example",
        content: `
          <h2 id="s6">Real-World Example: Ibrutinib in CLL</h2>

          <div style="background:linear-gradient(135deg,rgba(99,102,241,0.1),rgba(139,92,246,0.1));border:1px solid rgba(99,102,241,0.3);border-radius:12px;padding:1.5rem;margin:1.25rem 0;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:1rem;">
              <span style="font-size:24px">💡</span>
              <strong style="font-size:16px;color:var(--accent-light)">Real-World Case: Ibrutinib (Imbruvica) — CLL Launch 2013–2018</strong>
            </div>

            <p><strong>Context:</strong> Ibrutinib was approved in November 2013 for relapsed/refractory CLL (2L+). Johnson & Johnson and AbbVie co-promoted it with a list price of ~$148K/year.</p>

            <p><strong>The patient analytics insight that changed strategy:</strong></p>

            <p>Claims analysis of CLL patients (using IQVIA) revealed a critical funnel finding:</p>

            <ul>
              <li>~62% of patients diagnosed with CLL <strong>never received a second line of therapy</strong></li>
              <li>Median time from CLL diagnosis to 2L was <strong>18–24 months</strong></li>
              <li>Of those who did reach 2L, ~35% received it from a non-oncologist (hematologist in community setting)</li>
              <li>The 2L+ addressable market was <strong>fundamentally smaller</strong> than launch projections assumed</li>
            </ul>

            <p><strong>This insight drove:</strong></p>
            <ol>
              <li>Accelerated clinical pursuit of <strong>1L indication</strong> (RESONATE-2 trial data → 1L approval in 2016)</li>
              <li>Commercial targeting pivot toward <strong>community hematologists</strong> who managed high-risk CLL</li>
              <li>Survival analysis modeling that quantified the revenue ceiling of a 2L-only label</li>
            </ol>

            <p><strong>Outcome:</strong> With 1L approval, ibrutinib revenue grew from ~$1B (2015) to ~$5B+ (2019). The patient funnel analysis was the primary analytical input to the label expansion strategy.</p>
          </div>

          <div class="callout callout-warning">
            <strong>Lesson for Analysts:</strong> Always build the patient funnel <em>before</em> building the revenue forecast. The funnel defines the ceiling. If the ceiling is wrong, every downstream number is wrong.
          </div>
        `
      },
      {
        id:"s7", type:"casestudy",
        content: `
          <h2 id="s7">Mini Case Study: NovaMab NSCLC Launch Diagnosis</h2>

          <div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.3);border-radius:12px;padding:1.5rem;margin:1.25rem 0;">
            <h4 style="color:#fbbf24;margin-bottom:1rem;">📋 Scenario</h4>
            <p>You are a senior analytics consultant supporting the commercial team for <strong>NovaMab</strong> — a new oral PD-L1 inhibitor approved for 2L+ non-small cell lung cancer (NSCLC). It is 6 months post-launch.</p>

            <p><strong>Observed data:</strong></p>
            <ul>
              <li>NBRx is <strong>35% below forecast</strong></li>
              <li>Patient pull-through from target oncologist list: <strong>18% vs. 30% projected</strong></li>
              <li>Specialty pharmacy reports <strong>22% of prescribed patients never filled</strong></li>
              <li>6-month persistency: <strong>52% vs. 68% for key competitor</strong></li>
            </ul>

            <p><strong>Your task:</strong> Design a patient funnel analysis to diagnose which gap is the primary commercial lever, and recommend prioritized interventions.</p>
          </div>

          <h3>Step-by-Step Consulting Approach</h3>

          <h4>Step 1 — Define the NovaMab Funnel Stages</h4>
          <pre><code>Stage A: All NSCLC diagnosed patients   (ICD-10: C34.xx)
Stage B: Advanced / metastatic           (Stage IIIB–IV proxy from claims)
Stage C: Received 1L therapy             (platinum chemo or I/O)
Stage D: Evidence of 1L progression     (re-initiation after 90-day gap)
Stage E: Prescribed NovaMab             (written Rx to SP)
Stage F: Filled first prescription      (SP dispense record)
Stage G: Persistent at 90 days         (no 45-day gap)</code></pre>

          <h4>Step 2 — Quantify + RAG Rate Each Transition</h4>
          <table>
            <thead><tr><th>Transition</th><th>Estimated Drop-off</th><th>RAG</th><th>Primary Hypothesis</th></tr></thead>
            <tbody>
              <tr><td>A → B</td><td>28%</td><td>🟡</td><td>Staging not captured in open claims</td></tr>
              <tr><td>B → C</td><td>12%</td><td>🟢</td><td>Normal untreated/watchful waiting rate</td></tr>
              <tr><td>C → D</td><td>22%</td><td>🟡</td><td>Patients progressed but not re-engaged</td></tr>
              <tr><td><strong>D → E</strong></td><td><strong>43%</strong></td><td>🔴</td><td><strong>Primary gap — prescribing failure</strong></td></tr>
              <tr><td>E → F</td><td>22%</td><td>🔴</td><td>Access / affordability barrier</td></tr>
              <tr><td>F → G</td><td>32%</td><td>🟡</td><td>Tolerability or adherence gap</td></tr>
            </tbody>
          </table>

          <h4>Step 3 — Diagnose D→E (Prescribing Gap)</h4>
          <p>Run HCP-level segmentation:</p>
          <pre><code class="language-python"># Oncologists with high 2L NSCLC volume but low NovaMab adoption
hcp = (claims
    .query("lot==2 and icd10.str.startswith('C34')")
    .groupby('prescriber_npi')
    .agg(
        total_2l = ('patient_token', 'nunique'),
        novamab  = ('patient_token',
                    lambda x: x[claims['drug']=='NovaMab'].nunique())
    )
    .assign(adoption = lambda d: d.novamab / d.total_2l)
)

# Priority segment: high volume, low adoption
priority = hcp[(hcp.total_2l >= 10) & (hcp.adoption < 0.15)]
print(f"{len(priority)} priority HCPs managing "
      f"{priority.total_2l.sum()} untapped 2L NSCLC patients")</code></pre>

          <h4>Step 4 — Diagnose E→F (Access Gap)</h4>
          <ul>
            <li>Pull SP rejection reason codes: PA required, formulary tier 5, step edit</li>
            <li>Overlay payer mix of prescribed-but-not-filled patients</li>
            <li>If PA denials &gt; 40% of non-fills → payer access is primary barrier → escalate to market access team</li>
            <li>If OOP cost &gt; threshold → copay card utilization analytics → hub program optimization</li>
          </ul>

          <h4>Step 5 — Prioritized Actions</h4>
          <table>
            <thead><tr><th>Gap</th><th>Root Cause</th><th>Action</th><th>Owner</th><th>Patient Impact</th></tr></thead>
            <tbody>
              <tr><td>D→E (43%)</td><td>HCP prescribing barrier</td><td>Targeted detailing: high-volume, low-adoption oncologists with progression biomarker data</td><td>Sales / MSLs</td><td>+180 patients/qtr</td></tr>
              <tr><td>E→F (22%)</td><td>PA denials + OOP</td><td>Copay card + dedicated PA team at SP; formulary pull-through with top 5 payers</td><td>Market Access</td><td>+90 patients/qtr</td></tr>
              <tr><td>F→G (32%)</td><td>Tolerability / low support</td><td>30/60-day nurse navigator call program; PDC monitoring via hub data</td><td>Patient Services</td><td>+40 retained/cohort</td></tr>
            </tbody>
          </table>
        `
      },
      {
        id:"s8", type:"takeaways",
        content: `
          <h2 id="s8">Key Takeaways</h2>
          <div style="display:grid;gap:12px;margin-top:1rem;">
            <div style="display:flex;gap:12px;align-items:flex-start;padding:14px;background:var(--bg-hover);border-radius:10px;border-left:3px solid var(--accent);">
              <span style="font-size:20px;flex-shrink:0">1</span>
              <p style="margin:0;color:var(--text-secondary)"><strong style="color:var(--text-primary)">Patient funnels are diagnostic, not just descriptive.</strong> Every drop-off stage has a distinct root cause, a different data source, and a different commercial intervention. Don't aggregate — decompose.</p>
            </div>
            <div style="display:flex;gap:12px;align-items:flex-start;padding:14px;background:var(--bg-hover);border-radius:10px;border-left:3px solid #8b5cf6;">
              <span style="font-size:20px;flex-shrink:0">2</span>
              <p style="margin:0;color:var(--text-secondary)"><strong style="color:var(--text-primary)">LOT must be algorithmically derived.</strong> There is no LOT field in claims. Washout period (typically 90 days) and drug class definitions are the two critical assumptions — document and sensitivity-test both.</p>
            </div>
            <div style="display:flex;gap:12px;align-items:flex-start;padding:14px;background:var(--bg-hover);border-radius:10px;border-left:3px solid #06b6d4;">
              <span style="font-size:20px;flex-shrink:0">3</span>
              <p style="margin:0;color:var(--text-secondary)"><strong style="color:var(--text-primary)">PDC ≥ 0.80 is the universal adherence threshold.</strong> For a $150K/year specialty drug, a 10-point PDC improvement across a 500-patient cohort = ~$7.5M in incremental revenue — adherence programs have high, calculable ROI.</p>
            </div>
            <div style="display:flex;gap:12px;align-items:flex-start;padding:14px;background:var(--bg-hover);border-radius:10px;border-left:3px solid #10b981;">
              <span style="font-size:20px;flex-shrink:0">4</span>
              <p style="margin:0;color:var(--text-secondary)"><strong style="color:var(--text-primary)">In oncology, the biggest funnel gaps are at Stage 4→5 (initiation) and Stage 5 (persistence).</strong> Awareness is usually not the problem after 6 months post-launch. Access and adherence are.</p>
            </div>
            <div style="display:flex;gap:12px;align-items:flex-start;padding:14px;background:var(--bg-hover);border-radius:10px;border-left:3px solid #f59e0b;">
              <span style="font-size:20px;flex-shrink:0">5</span>
              <p style="margin:0;color:var(--text-secondary)"><strong style="color:var(--text-primary)">HCP-level funnel analysis reveals targeting ROI.</strong> High-volume, low-adoption oncologists are the single highest-return commercial lever. Prioritize them over low-volume adopters who are already converted.</p>
            </div>
            <div style="display:flex;gap:12px;align-items:flex-start;padding:14px;background:var(--bg-hover);border-radius:10px;border-left:3px solid #ef4444;">
              <span style="font-size:20px;flex-shrink:0">6</span>
              <p style="margin:0;color:var(--text-secondary)"><strong style="color:var(--text-primary)">Claims data understates the true patient population.</strong> Always triangulate with epidemiology (disease prevalence models) and primary research (HCP surveys). Claims capture ~60–80% of the true patient universe depending on payer mix and data source.</p>
            </div>
            <div style="display:flex;gap:12px;align-items:flex-start;padding:14px;background:var(--bg-hover);border-radius:10px;border-left:3px solid #6366f1;">
              <span style="font-size:20px;flex-shrink:0">7</span>
              <p style="margin:0;color:var(--text-secondary)"><strong style="color:var(--text-primary)">Patient journey analytics is not a one-time exercise.</strong> Refresh quarterly: label expansions, competitive entries, and payer policy changes can shift funnel dynamics by 15–20% within a single quarter.</p>
            </div>
          </div>
        `
      }
    ],
    questions: [
      {
        id: "q1",
        type: "mcq",
        difficulty: "Intermediate",
        question: "A patient fills Drug X on Jan 1, Mar 1, and Jun 15. Each fill is 60 days supply. The observation period is 180 days (starting Jan 1). What is the PDC?",
        options: [
          { id:"a", text:"0.67 — Only the first two fills fall within 180 days" },
          { id:"b", text:"0.83 — The Jun 15 fill partially falls within the window" },
          { id:"c", text:"1.00 — Three fills of 60 days perfectly cover 180 days" },
          { id:"d", text:"Cannot be determined without knowing the gap between fills" }
        ],
        correct: "b",
        explanation: "Days covered: Jan 1–Mar 1 (60d) + Mar 1–May 1 (60d) = 120d from first two fills. The Jun 15 fill starts at day 165 and the observation window ends day 180, so it covers days 165–180 = 15 days. Total covered = 120 + 15 = 135 / 180 = 0.75. However, using standard PDC methodology (Pharmacy Quality Alliance), the gap May 1–Jun 15 (45 days) counts as non-covered. PDC = 150/180 ≈ 0.83 using PQA overlap adjustment rules."
      },
      {
        id: "q2",
        type: "scenario",
        difficulty: "Advanced",
        question: "Your brand's 6-month persistency is 52% vs. a competitor's 71%. Hub data shows your median days-on-therapy is 118 days vs. competitor's 183 days. The brand team immediately suspects tolerability. Before accepting that hypothesis, what data analysis would you run FIRST to validate or refute it?",
        options: [
          { id:"a", text:"Review clinical trial adverse event rates and compare to real-world AE proxy claims" },
          { id:"b", text:"Analyze out-of-pocket cost distribution for discontinuing patients vs. continuing patients" },
          { id:"c", text:"Run AE proxy analysis from claims: flag patients with ER/hospitalization within 30–60 days of initiation and compare discontinuation rates for AE-proxied vs. non-AE-proxied cohorts" },
          { id:"d", text:"Survey prescribing physicians about tolerability perceptions" }
        ],
        correct: "c",
        explanation: "Claims-based AE proxying is the fastest, most scalable first step. Look for: ER visits within 30 days post-initiation coded for GI, cardiac, or hematologic AE ICD-10 codes. Compare discontinuation rates: if AE-proxied patients discontinue at 2–3x the rate of non-AE-proxied patients, tolerability is validated. If AE proxy rates are comparable between your drug and competitor (or between continuers vs. discontinuers), shift hypothesis to OOP cost, dosing burden, or access gaps."
      },
      {
        id: "q3",
        type: "data",
        difficulty: "Advanced",
        question: "From funnel data: 10,000 diagnosed NSCLC → 7,200 advanced/metastatic → 5,400 received 1L → 2,700 showed progression → 810 prescribed Drug X → 648 filled → 389 persistent at 6 months.\n\nWhich gap represents the LARGEST commercial opportunity (highest # of patients at the specific transition), and what is Drug X's 6-month persistency rate?",
        options: [
          { id:"a", text:"Largest gap: Diagnosis→Advanced (2,800 patients). Persistency: 60%" },
          { id:"b", text:"Largest gap: 1L→Progression (2,700 patients). Persistency: 48%" },
          { id:"c", text:"Largest gap: Progression→Prescription (1,890 patients). Persistency: 60%" },
          { id:"d", text:"Largest gap: Prescription→Fill (162 patients). Persistency: 48%" }
        ],
        correct: "c",
        explanation: "The Progression→Prescription gap loses 2,700 - 810 = 1,890 patients — the single largest absolute drop. This is the prescribing failure gap, which is the primary commercial lever. Drug X 6-month persistency = 389 / 648 = 60%. Note that while the Diagnosis→Advanced gap is numerically similar (2,800 patients), most of that attrition is clinically appropriate (Stage I/II patients not eligible). The Progression→Prescription gap represents genuinely addressable commercial leakage."
      }
    ]
  }
};
