/* Domain 0 — Know Your TA */
PL.addChapters({

/* ──────────────────────────────────────────────
   0-1  Cardiovascular
   ────────────────────────────────────────────── */
"0-1": {
  id: "0-1",
  title: "Cardiovascular",
  domain: "Know Your TA",
  domain_id: 0,
  level: "Foundational",
  mins: 55,
  available: true,
  tags: ["Heart Failure","Atrial Fibrillation","CAD","ASCVD","Dyslipidemia","Hypertension"],
  objectives: [
    "Understand the pathophysiology and classification of major CV conditions",
    "Identify guideline-directed therapies and treatment paradigms",
    "Explain key clinical endpoints and biomarkers used in CV trials",
    "Describe the competitive landscape and emerging therapies"
  ],
  toc: [
    "Heart Failure (HFrEF & HFpEF)",
    "Atrial Fibrillation",
    "Coronary Artery Disease & ASCVD",
    "Dyslipidemia",
    "Hypertension",
    "Key Takeaways"
  ],
  sections: [
    /* ── s1 Heart Failure ── */
    {
      id: "s1",
      title: "Heart Failure (HFrEF & HFpEF)",
      content: `
<h3>Overview</h3>
<p>Heart failure (HF) is a clinical syndrome where the heart cannot pump enough blood to meet the body's needs. It affects roughly <strong>6.7 million adults</strong> in the US and is the leading cause of hospitalization in patients ≥65.</p>

<h3>Classification by Ejection Fraction</h3>
<table>
  <tr><th>Category</th><th>LVEF</th><th>Description</th></tr>
  <tr><td><strong>HFrEF</strong> (Reduced)</td><td>≤ 40 %</td><td>Systolic dysfunction — the ventricle cannot contract forcefully enough</td></tr>
  <tr><td><strong>HFmrEF</strong> (Mildly Reduced)</td><td>41–49 %</td><td>Intermediate zone; may behave like HFrEF or HFpEF</td></tr>
  <tr><td><strong>HFpEF</strong> (Preserved)</td><td>≥ 50 %</td><td>Diastolic dysfunction — the ventricle is stiff, fills poorly</td></tr>
</table>

<h3>NYHA Functional Classification</h3>
<ul>
  <li><strong>Class I</strong> — No limitation of physical activity</li>
  <li><strong>Class II</strong> — Slight limitation; comfortable at rest, symptoms with ordinary activity</li>
  <li><strong>Class III</strong> — Marked limitation; symptoms with less-than-ordinary activity</li>
  <li><strong>Class IV</strong> — Symptoms at rest; unable to carry on any physical activity without discomfort</li>
</ul>

<h3>Guideline-Directed Medical Therapy (GDMT) — The Four Pillars for HFrEF</h3>
<div class="formula-box"><div class="formula-label">Four Pillars of HFrEF Therapy</div><div class="formula-main">
1. <strong>ARNI</strong> (sacubitril/valsartan) or ACE-i/ARB<br>
2. <strong>Beta-blocker</strong> (carvedilol, metoprolol succinate, bisoprolol)<br>
3. <strong>MRA</strong> (spironolactone, eplerenone)<br>
4. <strong>SGLT2i</strong> (dapagliflozin, empagliflozin)
</div></div>

<h3>HFpEF — Treatment Landscape</h3>
<p>Historically, no therapy demonstrated mortality benefit in HFpEF. The <strong>EMPEROR-Preserved</strong> and <strong>DELIVER</strong> trials established SGLT2 inhibitors as the first class to reduce HF hospitalization in HFpEF. GLP-1 receptor agonists (e.g., semaglutide) are being studied for HFpEF with obesity.</p>

<h3>Key Biomarkers</h3>
<ul>
  <li><strong>NT-proBNP / BNP</strong> — Diagnosis, severity staging, and treatment monitoring</li>
  <li><strong>Troponin</strong> — Myocardial injury marker; serial trends matter</li>
  <li><strong>hs-CRP</strong> — Inflammatory risk stratification</li>
</ul>

<h3>Clinical Endpoints in HF Trials</h3>
<ul>
  <li>CV death + HF hospitalization (composite primary endpoint)</li>
  <li>Total HF hospitalizations (recurrent events analysis)</li>
  <li>Kansas City Cardiomyopathy Questionnaire (KCCQ) — patient-reported outcomes</li>
  <li>eGFR slope — renal protection co-benefit</li>
</ul>
`
    },
    /* ── s2 Atrial Fibrillation ── */
    {
      id: "s2",
      title: "Atrial Fibrillation",
      content: `
<h3>Overview</h3>
<p>Atrial fibrillation (AF) is the most common sustained cardiac arrhythmia, affecting ~6 million Americans. It is characterized by rapid, irregular electrical signals in the atria, leading to an irregularly irregular heartbeat and increased stroke risk.</p>

<h3>AF Classification</h3>
<table>
  <tr><th>Type</th><th>Duration</th></tr>
  <tr><td>Paroxysmal</td><td>Self-terminating within 7 days</td></tr>
  <tr><td>Persistent</td><td>Sustained > 7 days, requires intervention</td></tr>
  <tr><td>Long-standing persistent</td><td>> 12 months</td></tr>
  <tr><td>Permanent</td><td>Rate control accepted; rhythm control abandoned</td></tr>
</table>

<h3>Stroke Risk — CHA₂DS₂-VASc Score</h3>
<div class="formula-box"><div class="formula-label">CHA₂DS₂-VASc Components</div><div class="formula-main">
C — Congestive HF (+1) &nbsp;|&nbsp; H — Hypertension (+1)<br>
A₂ — Age ≥ 75 (+2) &nbsp;|&nbsp; D — Diabetes (+1)<br>
S₂ — Stroke/TIA/Thromboembolism (+2)<br>
V — Vascular disease (+1) &nbsp;|&nbsp; A — Age 65–74 (+1)<br>
Sc — Sex category (female +1)<br><br>
<em>Score ≥ 2 in men or ≥ 3 in women → oral anticoagulation recommended</em>
</div></div>

<h3>Treatment Paradigm</h3>
<ul>
  <li><strong>Anticoagulation (stroke prevention)</strong> — DOACs (apixaban, rivaroxaban, edoxaban, dabigatran) have largely replaced warfarin; better safety profile, no routine INR monitoring</li>
  <li><strong>Rate control</strong> — Beta-blockers, non-dihydropyridine CCBs (diltiazem, verapamil), digoxin</li>
  <li><strong>Rhythm control</strong> — Antiarrhythmics (amiodarone, flecainide, sotalol), catheter ablation (pulmonary vein isolation)</li>
</ul>

<h3>Emerging Therapies</h3>
<p>Factor XIa inhibitors (asundexian, milvexian) aim to reduce bleeding risk versus DOACs while maintaining stroke prevention. Early-rhythm-control strategies (EAST-AFNET 4 trial) showed improved outcomes when rhythm control was initiated early after diagnosis.</p>
`
    },
    /* ── s3 CAD & ASCVD ── */
    {
      id: "s3",
      title: "Coronary Artery Disease & ASCVD",
      content: `
<h3>Overview</h3>
<p>Atherosclerotic cardiovascular disease (ASCVD) encompasses conditions driven by plaque buildup in arterial walls: coronary artery disease (CAD), cerebrovascular disease, and peripheral artery disease (PAD). CAD alone accounts for approximately <strong>380,000 deaths annually</strong> in the US.</p>

<h3>Pathophysiology</h3>
<p>LDL cholesterol infiltrates the arterial intima → oxidation → foam cell formation → fatty streak → fibrous plaque → vulnerable plaque (thin cap, lipid-rich core) → rupture → thrombus → acute coronary syndrome (ACS).</p>

<h3>Acute Coronary Syndrome Spectrum</h3>
<table>
  <tr><th>Type</th><th>Troponin</th><th>ECG Changes</th></tr>
  <tr><td>Unstable Angina</td><td>Normal</td><td>ST depression or T-wave inversion (possible)</td></tr>
  <tr><td>NSTEMI</td><td>Elevated</td><td>ST depression or T-wave inversion</td></tr>
  <tr><td>STEMI</td><td>Elevated</td><td>ST elevation (transmural ischemia)</td></tr>
</table>

<h3>Treatment Paradigm</h3>
<ul>
  <li><strong>Acute</strong> — Dual antiplatelet therapy (DAPT: aspirin + P2Y12 inhibitor), heparin, PCI or CABG revascularization</li>
  <li><strong>Secondary prevention</strong> — High-intensity statin, ACE-i/ARB, beta-blocker (post-MI), lifestyle modification</li>
  <li><strong>Residual risk</strong> — Icosapent ethyl (REDUCE-IT), low-dose rivaroxaban (COMPASS), colchicine (anti-inflammatory)</li>
</ul>

<h3>ASCVD Risk Estimation</h3>
<div class="formula-box"><div class="formula-label">10-Year ASCVD Risk — Pooled Cohort Equations</div><div class="formula-main">
Input variables: Age, Sex, Race, Total Cholesterol, HDL-C, Systolic BP, BP treatment status, Diabetes, Smoking<br><br>
Risk categories:<br>
• Low: &lt; 5 % &nbsp;|&nbsp; Borderline: 5–7.4 %<br>
• Intermediate: 7.5–19.9 % &nbsp;|&nbsp; High: ≥ 20 %<br><br>
<em>Coronary artery calcium (CAC) score refines intermediate-risk decisions</em>
</div></div>
`
    },
    /* ── s4 Dyslipidemia ── */
    {
      id: "s4",
      title: "Dyslipidemia",
      content: `
<h3>Overview</h3>
<p>Dyslipidemia — abnormal blood lipid levels — is a major modifiable risk factor for ASCVD. LDL-C ("bad cholesterol") is the primary therapeutic target; lower LDL-C correlates linearly with lower CV event rates.</p>

<h3>Lipid Panel Targets</h3>
<table>
  <tr><th>Parameter</th><th>Optimal / Desirable</th></tr>
  <tr><td>LDL-C</td><td>&lt; 100 mg/dL (general); &lt; 70 or &lt; 55 mg/dL (very high risk)</td></tr>
  <tr><td>HDL-C</td><td>≥ 40 mg/dL (men); ≥ 50 mg/dL (women)</td></tr>
  <tr><td>Triglycerides</td><td>&lt; 150 mg/dL</td></tr>
  <tr><td>Non-HDL-C</td><td>LDL-C target + 30 mg/dL</td></tr>
  <tr><td>Lp(a)</td><td>&lt; 50 nmol/L (genetically determined)</td></tr>
</table>

<h3>Treatment Ladder</h3>
<div class="formula-box"><div class="formula-label">LDL-Lowering Treatment Escalation</div><div class="formula-main">
Step 1: <strong>High-intensity statin</strong> (atorvastatin 40–80 mg, rosuvastatin 20–40 mg) → ~50 % LDL reduction<br>
Step 2: Add <strong>ezetimibe</strong> → additional ~15–20 % reduction<br>
Step 3: Add <strong>PCSK9 inhibitor</strong> (evolocumab, alirocumab) → additional ~60 % reduction<br>
Step 4: Add <strong>bempedoic acid</strong> (for statin-intolerant patients) or <strong>inclisiran</strong> (siRNA, twice-yearly injection)
</div></div>

<h3>Emerging Targets</h3>
<ul>
  <li><strong>Lp(a)</strong> — Genetically determined, not diet/statin-responsive. Pelacarsen (ASO) and olpasiran/lepodisiran (siRNA) in Phase 3 targeting Lp(a) reduction &gt; 90 %</li>
  <li><strong>ANGPTL3</strong> — Evinacumab approved for homozygous FH; lowers LDL via a mechanism independent of LDL receptors</li>
  <li><strong>CETP inhibitors</strong> — Obicetrapib showing promise after earlier CETP failures (torcetrapib, dalcetrapib)</li>
</ul>

<h3>Key Clinical Trials</h3>
<ul>
  <li><strong>4S, WOSCOPS, JUPITER</strong> — Established statin benefit</li>
  <li><strong>IMPROVE-IT</strong> — Ezetimibe add-on benefit</li>
  <li><strong>FOURIER, ODYSSEY Outcomes</strong> — PCSK9i CV event reduction</li>
  <li><strong>CLEAR Outcomes</strong> — Bempedoic acid CV benefit in statin-intolerant</li>
</ul>
`
    },
    /* ── s5 Hypertension ── */
    {
      id: "s5",
      title: "Hypertension",
      content: `
<h3>Overview</h3>
<p>Hypertension affects nearly <strong>half of US adults</strong> (~120 million). It is the single largest modifiable risk factor for CV death, stroke, HF, CKD, and dementia. Despite effective treatments, control rates remain around 25 %.</p>

<h3>Classification (ACC/AHA 2017)</h3>
<table>
  <tr><th>Category</th><th>Systolic (mmHg)</th><th>Diastolic (mmHg)</th></tr>
  <tr><td>Normal</td><td>&lt; 120</td><td>&lt; 80</td></tr>
  <tr><td>Elevated</td><td>120–129</td><td>&lt; 80</td></tr>
  <tr><td>Stage 1 HTN</td><td>130–139</td><td>80–89</td></tr>
  <tr><td>Stage 2 HTN</td><td>≥ 140</td><td>≥ 90</td></tr>
  <tr><td>Hypertensive Crisis</td><td>&gt; 180</td><td>&gt; 120</td></tr>
</table>

<h3>First-Line Drug Classes</h3>
<div class="formula-box"><div class="formula-label">Antihypertensive Drug Classes</div><div class="formula-main">
<strong>ACE inhibitors</strong> — lisinopril, enalapril, ramipril (preferred in diabetes, CKD, HFrEF)<br>
<strong>ARBs</strong> — losartan, valsartan, olmesartan (alternative to ACE-i if cough)<br>
<strong>CCBs</strong> — amlodipine, nifedipine (preferred in Black patients, elderly)<br>
<strong>Thiazide/Thiazide-like</strong> — chlorthalidone, indapamide, HCTZ<br><br>
<em>Most patients require ≥ 2 agents to achieve target BP &lt; 130/80</em>
</div></div>

<h3>Resistant Hypertension</h3>
<p>Defined as BP above goal despite ≥ 3 optimally-dosed agents (including a diuretic). Affects ~10–15 % of treated hypertensives. Key considerations:</p>
<ul>
  <li>Rule out pseudo-resistance (non-adherence, white-coat effect, improper measurement)</li>
  <li>Screen for secondary causes (primary aldosteronism, renal artery stenosis, OSA, pheochromocytoma)</li>
  <li><strong>Spironolactone</strong> is the most effective add-on (PATHWAY-2 trial)</li>
  <li>Device-based therapies (renal denervation) are emerging options</li>
</ul>

<h3>Key Trials</h3>
<ul>
  <li><strong>SPRINT</strong> — Intensive BP target (&lt; 120 systolic) reduced CV events and mortality vs standard (&lt; 140)</li>
  <li><strong>ALLHAT</strong> — Thiazide-type diuretics as effective as newer agents for outcomes</li>
  <li><strong>PATHWAY-2</strong> — Spironolactone superior for resistant HTN</li>
</ul>
`
    },
    /* ── s6 Key Takeaways ── */
    {
      id: "s6",
      title: "Key Takeaways",
      content: `
<h3>Cardiovascular TA at a Glance</h3>
<table>
  <tr><th>Condition</th><th>Key Drug Classes</th><th>Key Biomarkers / Endpoints</th><th>Commercial Dynamics</th></tr>
  <tr><td>Heart Failure</td><td>ARNI, SGLT2i, MRA, Beta-blocker</td><td>NT-proBNP, KCCQ, CV death + HHF</td><td>SGLT2i class expanding into HFpEF; GLP-1 RA overlap</td></tr>
  <tr><td>Atrial Fibrillation</td><td>DOACs, antiarrhythmics</td><td>Stroke/SE rate, bleeding (ISTH major)</td><td>FXIa inhibitors as next-gen anticoagulants</td></tr>
  <tr><td>CAD / ASCVD</td><td>Statins, DAPT, PCSK9i</td><td>MACE, LDL-C, CAC score</td><td>Residual risk therapies (Lp(a), anti-inflammatory)</td></tr>
  <tr><td>Dyslipidemia</td><td>Statins, ezetimibe, PCSK9i, inclisiran</td><td>LDL-C, Lp(a), MACE</td><td>Lp(a)-lowering is the biggest pipeline opportunity</td></tr>
  <tr><td>Hypertension</td><td>ACE-i, ARB, CCB, thiazide</td><td>BP control rate, MACE, renal outcomes</td><td>Mature generic market; renal denervation devices emerging</td></tr>
</table>

<div class="formula-box"><div class="formula-label">Why CV Matters Commercially</div><div class="formula-main">
• <strong>Largest TA by Rx volume</strong> — hundreds of millions of prescriptions annually<br>
• <strong>Payer dynamics</strong> — heavy generic substitution in HTN/statins; specialty pricing for PCSK9i, ARNI<br>
• <strong>Convergence with metabolic TAs</strong> — SGLT2i and GLP-1 RA cross HF, diabetes, CKD, and obesity<br>
• <strong>Real-world evidence</strong> — large claims/EHR datasets enable CV outcomes research at scale
</div></div>
`
    }
  ],
  questions: [
    {
      question: "Which class of drugs became the first to demonstrate benefit in HFpEF by reducing heart failure hospitalizations?",
      options: ["PCSK9 inhibitors","Beta-blockers","SGLT2 inhibitors","ACE inhibitors"],
      answer: 2,
      explanation: "The EMPEROR-Preserved and DELIVER trials established SGLT2 inhibitors (empagliflozin, dapagliflozin) as the first drug class to reduce HF hospitalization in patients with HFpEF."
    },
    {
      question: "A CHA₂DS₂-VASc score of 2 or higher in a male AF patient indicates the need for:",
      options: ["Rate control with beta-blockers","Oral anticoagulation","Catheter ablation","Aspirin monotherapy"],
      answer: 1,
      explanation: "A CHA₂DS₂-VASc score ≥ 2 in men (or ≥ 3 in women) warrants oral anticoagulation for stroke prevention. DOACs are preferred over warfarin."
    },
    {
      question: "What is the expected LDL-C reduction with high-intensity statin therapy?",
      options: ["~25 %","~35 %","~50 %","~70 %"],
      answer: 2,
      explanation: "High-intensity statins (e.g., atorvastatin 40–80 mg, rosuvastatin 20–40 mg) reduce LDL-C by approximately 50 % or more from baseline."
    },
    {
      question: "Which trial demonstrated that an intensive systolic BP target of < 120 mmHg reduced CV events and mortality?",
      options: ["ALLHAT","PATHWAY-2","SPRINT","FOURIER"],
      answer: 2,
      explanation: "The SPRINT trial showed that targeting systolic BP < 120 mmHg (intensive) vs < 140 mmHg (standard) significantly reduced major CV events and all-cause mortality."
    }
  ]
},

/* ──────────────────────────────────────────────
   0-2  Renal
   ────────────────────────────────────────────── */
"0-2": {
  id: "0-2",
  title: "Renal",
  domain: "Know Your TA",
  domain_id: 0,
  level: "Foundational",
  mins: 45,
  available: true,
  tags: ["CKD","Diabetic Kidney Disease","IgA Nephropathy","ADPKD","Dialysis"],
  objectives: [
    "Classify CKD by GFR stage and albuminuria category",
    "Explain the pathophysiology and treatment of diabetic kidney disease",
    "Describe emerging therapies in IgA nephropathy and ADPKD",
    "Identify key endpoints and biomarkers in nephrology clinical trials"
  ],
  toc: [
    "Chronic Kidney Disease — Staging & Epidemiology",
    "Diabetic Kidney Disease",
    "IgA Nephropathy",
    "ADPKD",
    "Dialysis & Transplant Landscape",
    "Key Takeaways"
  ],
  sections: [
    /* ── s1 CKD ── */
    {
      id: "s1",
      title: "Chronic Kidney Disease — Staging & Epidemiology",
      content: `
<h3>Overview</h3>
<p>Chronic kidney disease (CKD) affects ~<strong>37 million US adults</strong> (~15 % of the adult population) and is the 8th leading cause of death. It is defined as abnormalities of kidney structure or function present for &gt; 3 months, with implications for health.</p>

<h3>GFR Staging (KDIGO)</h3>
<table>
  <tr><th>Stage</th><th>GFR (mL/min/1.73 m²)</th><th>Description</th></tr>
  <tr><td>G1</td><td>≥ 90</td><td>Normal or high (with kidney damage markers)</td></tr>
  <tr><td>G2</td><td>60–89</td><td>Mildly decreased</td></tr>
  <tr><td>G3a</td><td>45–59</td><td>Mildly to moderately decreased</td></tr>
  <tr><td>G3b</td><td>30–44</td><td>Moderately to severely decreased</td></tr>
  <tr><td>G4</td><td>15–29</td><td>Severely decreased</td></tr>
  <tr><td>G5</td><td>&lt; 15</td><td>Kidney failure (dialysis or transplant needed)</td></tr>
</table>

<h3>Albuminuria Categories</h3>
<table>
  <tr><th>Category</th><th>UACR (mg/g)</th><th>Description</th></tr>
  <tr><td>A1</td><td>&lt; 30</td><td>Normal to mildly increased</td></tr>
  <tr><td>A2</td><td>30–300</td><td>Moderately increased (microalbuminuria)</td></tr>
  <tr><td>A3</td><td>&gt; 300</td><td>Severely increased (macroalbuminuria)</td></tr>
</table>

<div class="formula-box"><div class="formula-label">CKD Risk Classification</div><div class="formula-main">
CKD risk = GFR Stage × Albuminuria Category<br><br>
Example: G3a + A2 = "High Risk" (yellow zone in KDIGO heat map)<br>
Example: G4 + A3 = "Very High Risk" (red zone) → nephrology referral required
</div></div>

<h3>Leading Causes</h3>
<ul>
  <li><strong>Diabetes</strong> (~40 % of ESRD) — diabetic kidney disease (DKD)</li>
  <li><strong>Hypertension</strong> (~25 % of ESRD) — hypertensive nephrosclerosis</li>
  <li><strong>Glomerulonephritis</strong> — IgA nephropathy, lupus nephritis, FSGS</li>
  <li><strong>Polycystic kidney disease</strong> — ADPKD (genetic)</li>
</ul>
`
    },
    /* ── s2 DKD ── */
    {
      id: "s2",
      title: "Diabetic Kidney Disease",
      content: `
<h3>Overview</h3>
<p>Diabetic kidney disease (DKD) is the leading cause of ESRD globally. It develops in ~30–40 % of patients with diabetes. The hallmark progression: hyperfiltration → microalbuminuria → macroalbuminuria → declining GFR → ESRD.</p>

<h3>Pathophysiology</h3>
<ul>
  <li><strong>Hemodynamic</strong> — Hyperglycemia causes afferent arteriolar dilation → glomerular hyperfiltration → intraglomerular hypertension</li>
  <li><strong>Metabolic</strong> — AGE accumulation, PKC activation, polyol pathway flux</li>
  <li><strong>Inflammatory/fibrotic</strong> — TGF-β, endothelin-1, inflammatory cytokines → mesangial expansion, tubular fibrosis</li>
</ul>

<h3>Treatment Paradigm — Pillars of DKD Therapy</h3>
<div class="formula-box"><div class="formula-label">DKD Treatment Pillars</div><div class="formula-main">
1. <strong>RAS blockade</strong> — ACE-i or ARB (standard of care since RENAAL/IDNT trials)<br>
2. <strong>SGLT2 inhibitor</strong> — Dapagliflozin (DAPA-CKD), empagliflozin (EMPA-KIDNEY) — reduce composite renal endpoint by 30–40 %<br>
3. <strong>Finerenone</strong> (non-steroidal MRA) — FIDELIO/FIGARO trials showed kidney + CV benefit on top of RAS blockade<br>
4. <strong>GLP-1 RA</strong> — Semaglutide (FLOW trial) — first GLP-1 RA to demonstrate primary renal endpoint benefit<br>
5. <strong>Glycemic control</strong> — HbA1c target generally &lt; 7 % (individualized)<br>
6. <strong>BP control</strong> — Target &lt; 130/80 mmHg
</div></div>

<h3>Key Landmark Trials</h3>
<table>
  <tr><th>Trial</th><th>Drug</th><th>Key Finding</th></tr>
  <tr><td>CREDENCE</td><td>Canagliflozin</td><td>First SGLT2i to show primary renal endpoint benefit in DKD</td></tr>
  <tr><td>DAPA-CKD</td><td>Dapagliflozin</td><td>Renal benefit in CKD with AND without diabetes</td></tr>
  <tr><td>FIDELIO-DKD</td><td>Finerenone</td><td>Reduced kidney failure progression vs placebo (on top of RAS)</td></tr>
  <tr><td>FLOW</td><td>Semaglutide</td><td>First GLP-1 RA primary renal outcome trial — positive</td></tr>
</table>
`
    },
    /* ── s3 IgAN ── */
    {
      id: "s3",
      title: "IgA Nephropathy",
      content: `
<h3>Overview</h3>
<p>IgA nephropathy (IgAN) is the most common primary glomerulonephritis worldwide. It is caused by deposition of galactose-deficient IgA1 in the glomerular mesangium, triggering complement activation and inflammation. About 30–40 % of patients progress to ESRD over 20–30 years.</p>

<h3>Four-Hit Pathogenesis Model</h3>
<div class="formula-box"><div class="formula-label">IgAN — Four-Hit Hypothesis</div><div class="formula-main">
Hit 1: Increased circulating galactose-deficient IgA1 (Gd-IgA1)<br>
Hit 2: Formation of anti-Gd-IgA1 autoantibodies (IgG or IgA)<br>
Hit 3: Immune complex formation (Gd-IgA1 + autoantibody)<br>
Hit 4: Mesangial deposition → complement activation → glomerular injury
</div></div>

<h3>Treatment Landscape</h3>
<ul>
  <li><strong>Supportive care</strong> — RAS blockade (maximize ACE-i/ARB), BP control, SGLT2i</li>
  <li><strong>Targeted B-cell therapy</strong> — Sparsentan (dual endothelin + angiotensin receptor antagonist) — FDA approved based on PROTECT trial (proteinuria reduction)</li>
  <li><strong>Complement inhibitors</strong> — Iptacopan (Factor B inhibitor) — targeting the alternative complement pathway</li>
  <li><strong>APRIL/BAFF inhibitors</strong> — Atacicept, sibeprenlimab — targeting the upstream mucosal immune response; povetacicept (BAFF/APRIL dual inhibitor) in trials</li>
  <li><strong>Budesonide (targeted-release)</strong> — Nefecon (NEFIGAN trial) — targets Peyer's patches in the ileum to reduce Gd-IgA1 production</li>
</ul>

<h3>Endpoints in IgAN Trials</h3>
<ul>
  <li><strong>Proteinuria reduction</strong> (UPCR) — accepted as a reasonably likely surrogate for accelerated approval</li>
  <li><strong>eGFR slope</strong> — total slope (acute + chronic) and chronic slope (excludes initial hemodynamic effect)</li>
  <li><strong>Composite renal endpoint</strong> — 40 % or 57 % sustained eGFR decline, ESRD, or renal death</li>
</ul>
`
    },
    /* ── s4 ADPKD ── */
    {
      id: "s4",
      title: "ADPKD",
      content: `
<h3>Overview</h3>
<p>Autosomal dominant polycystic kidney disease (ADPKD) is the most common inherited kidney disease, affecting ~1 in 1,000 people. It is caused by mutations in <em>PKD1</em> (~85 %) or <em>PKD2</em> (~15 %), leading to progressive bilateral kidney cyst growth, kidney enlargement, and eventual kidney failure.</p>

<h3>Clinical Features</h3>
<ul>
  <li>Progressive bilateral kidney cysts → total kidney volume (TKV) increases ~5 % per year</li>
  <li>Hypertension (often the earliest sign, present in ~60 % by age 30)</li>
  <li>Flank/abdominal pain, hematuria, kidney stones, UTIs</li>
  <li>Extrarenal: liver cysts (most common), intracranial aneurysms (~8 %), cardiac valve abnormalities</li>
  <li>~50 % progress to ESRD by age 60 (PKD1) or age 75 (PKD2)</li>
</ul>

<h3>Risk Stratification — Mayo Classification</h3>
<div class="formula-box"><div class="formula-label">Mayo htTKV Classification</div><div class="formula-main">
Height-adjusted total kidney volume (htTKV) stratifies progression risk:<br><br>
Class 1A: &lt; 1.5 % growth/year (low risk)<br>
Class 1B: 1.5–3.0 %/year<br>
Class 1C: 3.0–4.5 %/year<br>
Class 1D: 4.5–6.0 %/year<br>
Class 1E: &gt; 6.0 %/year (highest risk)<br><br>
<em>Classes 1C–1E are considered "rapid progressors" — treatment candidates</em>
</div></div>

<h3>Treatment</h3>
<ul>
  <li><strong>Tolvaptan</strong> (vasopressin V2 receptor antagonist) — the only FDA-approved disease-modifying therapy. Slows TKV growth and eGFR decline (TEMPO 3:4, REPRISE trials). Key limitation: aquaretic side effects (polyuria, thirst), hepatotoxicity risk (REMS program)</li>
  <li><strong>BP control</strong> — Target &lt; 110/75 in younger patients (HALT-PKD trial)</li>
  <li><strong>Pipeline</strong> — SGLT2i being studied; lixivaptan (next-gen V2 antagonist with potentially fewer AEs); venglustat (glucosylceramide synthase inhibitor)</li>
</ul>
`
    },
    /* ── s5 Dialysis & Transplant ── */
    {
      id: "s5",
      title: "Dialysis & Transplant Landscape",
      content: `
<h3>ESRD by the Numbers</h3>
<ul>
  <li>~<strong>808,000</strong> Americans living with ESRD</li>
  <li>~<strong>560,000</strong> on dialysis; ~<strong>248,000</strong> with a functioning transplant</li>
  <li>Annual Medicare spending on ESRD: &gt; $50 billion</li>
</ul>

<h3>Dialysis Modalities</h3>
<table>
  <tr><th>Modality</th><th>Setting</th><th>Frequency</th><th>Market Share</th></tr>
  <tr><td>In-center hemodialysis (ICHD)</td><td>Clinic</td><td>3×/week, 3–4 hrs</td><td>~87 %</td></tr>
  <tr><td>Peritoneal dialysis (PD)</td><td>Home</td><td>Daily exchanges or overnight cycler</td><td>~11 %</td></tr>
  <tr><td>Home hemodialysis (HHD)</td><td>Home</td><td>Short daily or nocturnal</td><td>~2 %</td></tr>
</table>

<h3>Key Therapies in ESRD / Dialysis</h3>
<ul>
  <li><strong>ESAs</strong> (erythropoietin-stimulating agents) — epoetin alfa, darbepoetin → manage anemia of CKD</li>
  <li><strong>HIF-PHIs</strong> (hypoxia-inducible factor prolyl hydroxylase inhibitors) — roxadustat, daprodustat → oral anemia management, stimulate endogenous EPO</li>
  <li><strong>IV iron</strong> — ferric carboxymaltose, iron sucrose → iron repletion</li>
  <li><strong>Phosphate binders</strong> — sevelamer, lanthanum, sucroferric oxyhydroxide</li>
  <li><strong>Calcimimetics</strong> — cinacalcet, etelcalcetide → secondary hyperparathyroidism</li>
</ul>

<h3>Kidney Transplant</h3>
<p>Transplant remains the gold standard for ESRD. Current immunosuppressive regimens typically combine: tacrolimus + mycophenolate + corticosteroids (± induction with basiliximab or thymoglobulin). Xenotransplantation (porcine kidneys) and tolerance-inducing protocols are active areas of research.</p>
`
    },
    /* ── s6 Key Takeaways ── */
    {
      id: "s6",
      title: "Key Takeaways",
      content: `
<h3>Renal TA at a Glance</h3>
<table>
  <tr><th>Condition</th><th>Key Drug Classes</th><th>Key Endpoints</th><th>Commercial Dynamics</th></tr>
  <tr><td>CKD (general)</td><td>SGLT2i, RAS blockade</td><td>eGFR slope, ESRD, albuminuria</td><td>SGLT2i label expansion driving growth</td></tr>
  <tr><td>DKD</td><td>SGLT2i, finerenone, GLP-1 RA</td><td>Composite renal endpoint, eGFR slope</td><td>Multi-pillar therapy emerging; large addressable population</td></tr>
  <tr><td>IgA Nephropathy</td><td>Sparsentan, complement inhibitors, APRIL/BAFF</td><td>Proteinuria (UPCR), eGFR slope</td><td>First disease-modifying therapies arriving; orphan pricing</td></tr>
  <tr><td>ADPKD</td><td>Tolvaptan</td><td>TKV growth, eGFR slope</td><td>Single approved therapy; tolerability limits uptake</td></tr>
  <tr><td>Dialysis/ESRD</td><td>ESAs, HIF-PHIs, phosphate binders</td><td>Hb levels, phosphorus, transplant graft survival</td><td>Shift toward home dialysis and oral therapies</td></tr>
</table>

<div class="formula-box"><div class="formula-label">Why Nephrology Is a Growing TA</div><div class="formula-main">
• <strong>Unmet need</strong> — CKD was historically under-treated; SGLT2i and finerenone are changing the standard of care<br>
• <strong>Cross-TA synergy</strong> — Cardiorenal-metabolic convergence (same drugs treating HF, CKD, diabetes)<br>
• <strong>Rare disease opportunity</strong> — IgAN, ADPKD, FSGS attract orphan designations and premium pricing<br>
• <strong>Pipeline explosion</strong> — Complement, APRIL/BAFF, endothelin pathways opening new mechanisms
</div></div>
`
    }
  ],
  questions: [
    {
      question: "Which SGLT2 inhibitor trial first demonstrated renal benefit in CKD patients regardless of diabetes status?",
      options: ["CREDENCE","EMPA-KIDNEY","DAPA-CKD","FIDELIO-DKD"],
      answer: 2,
      explanation: "DAPA-CKD was the first trial to show that dapagliflozin reduced the composite renal endpoint in CKD patients both with and without diabetes."
    },
    {
      question: "In IgA nephropathy, which biomarker is accepted as a reasonably likely surrogate endpoint for accelerated FDA approval?",
      options: ["eGFR absolute value","Serum IgA level","Proteinuria (UPCR)","Hematuria frequency"],
      answer: 2,
      explanation: "Proteinuria reduction (measured by UPCR) is accepted by the FDA as a reasonably likely surrogate endpoint in IgAN, enabling accelerated approval of therapies like sparsentan and nefecon."
    },
    {
      question: "What is the mechanism of tolvaptan in ADPKD?",
      options: ["SGLT2 inhibition","Vasopressin V2 receptor antagonism","mTOR inhibition","Complement C5 blockade"],
      answer: 1,
      explanation: "Tolvaptan blocks the vasopressin V2 receptor in collecting duct cells, reducing cAMP-driven cyst growth and fluid secretion in ADPKD."
    }
  ]
},

/* ──────────────────────────────────────────────
   0-3  Metabolism
   ────────────────────────────────────────────── */
"0-3": {
  id: "0-3",
  title: "Metabolism",
  domain: "Know Your TA",
  domain_id: 0,
  level: "Foundational",
  mins: 50,
  available: true,
  tags: ["Type 2 Diabetes","Type 1 Diabetes","Obesity","GLP-1","MASLD","MASH","Gout"],
  objectives: [
    "Understand the pathophysiology and treatment algorithms for T2D and T1D",
    "Describe the GLP-1 RA revolution in obesity and metabolic disease",
    "Explain the MASLD/MASH landscape and why it matters commercially",
    "Identify key clinical endpoints across metabolic conditions"
  ],
  toc: [
    "Type 2 Diabetes",
    "Type 1 Diabetes",
    "Obesity & GLP-1 Revolution",
    "MASLD / MASH",
    "Gout",
    "Key Takeaways"
  ],
  sections: [
    /* ── s1 T2D ── */
    {
      id: "s1",
      title: "Type 2 Diabetes",
      content: `
<h3>Overview</h3>
<p>Type 2 diabetes (T2D) affects ~<strong>37 million Americans</strong> (~11 % of the population) with another ~96 million having prediabetes. It is characterized by insulin resistance and progressive beta-cell dysfunction, leading to hyperglycemia and multi-organ complications.</p>

<h3>Diagnosis</h3>
<table>
  <tr><th>Test</th><th>Diabetes</th><th>Prediabetes</th></tr>
  <tr><td>HbA1c</td><td>≥ 6.5 %</td><td>5.7–6.4 %</td></tr>
  <tr><td>Fasting plasma glucose</td><td>≥ 126 mg/dL</td><td>100–125 mg/dL</td></tr>
  <tr><td>2-hr OGTT</td><td>≥ 200 mg/dL</td><td>140–199 mg/dL</td></tr>
</table>

<h3>ADA Treatment Algorithm (Simplified)</h3>
<div class="formula-box"><div class="formula-label">T2D Treatment Decision Framework</div><div class="formula-main">
<strong>All patients:</strong> Lifestyle modification + Metformin (first-line)<br><br>
<strong>If established ASCVD or high CV risk:</strong> Add GLP-1 RA or SGLT2i (proven CV benefit)<br>
<strong>If CKD or HF:</strong> Add SGLT2i (preferred) ± GLP-1 RA<br>
<strong>If weight management priority:</strong> GLP-1 RA (semaglutide, tirzepatide)<br>
<strong>If cost is primary barrier:</strong> Sulfonylurea or TZD<br>
<strong>If HbA1c still above target:</strong> Add insulin (basal → basal-bolus)
</div></div>

<h3>Major Drug Classes</h3>
<table>
  <tr><th>Class</th><th>Mechanism</th><th>Key Agents</th><th>HbA1c Reduction</th></tr>
  <tr><td>Metformin</td><td>↓ Hepatic glucose output</td><td>Metformin</td><td>~1.0–1.5 %</td></tr>
  <tr><td>GLP-1 RA</td><td>Incretin mimetic → ↑ insulin, ↓ glucagon, ↓ appetite</td><td>Semaglutide, tirzepatide, liraglutide</td><td>~1.0–2.0 %</td></tr>
  <tr><td>SGLT2i</td><td>↓ Renal glucose reabsorption</td><td>Empagliflozin, dapagliflozin</td><td>~0.5–1.0 %</td></tr>
  <tr><td>DPP-4i</td><td>↑ Endogenous incretin levels</td><td>Sitagliptin, linagliptin</td><td>~0.5–0.8 %</td></tr>
  <tr><td>Insulin</td><td>Exogenous insulin replacement</td><td>Glargine, degludec, lispro, aspart</td><td>~1.5–3.5 %</td></tr>
</table>

<h3>Key CV Outcome Trials (CVOTs)</h3>
<ul>
  <li><strong>EMPA-REG OUTCOME</strong> — Empagliflozin: first SGLT2i to show CV death reduction</li>
  <li><strong>LEADER</strong> — Liraglutide: CV death + MACE reduction</li>
  <li><strong>SUSTAIN-6 / PIONEER 6</strong> — Semaglutide: MACE reduction</li>
  <li><strong>SURPASS / SURMOUNT</strong> — Tirzepatide: superior HbA1c and weight reduction</li>
</ul>
`
    },
    /* ── s2 T1D ── */
    {
      id: "s2",
      title: "Type 1 Diabetes",
      content: `
<h3>Overview</h3>
<p>Type 1 diabetes (T1D) is an autoimmune disease where the immune system destroys pancreatic beta cells, leading to absolute insulin deficiency. It affects ~<strong>1.9 million Americans</strong> and requires lifelong insulin therapy.</p>

<h3>Pathophysiology</h3>
<p>Genetic susceptibility (HLA-DR3/DR4) + environmental trigger → autoimmune attack on beta cells → progressive loss → clinical diabetes when ~80–90 % of beta cells are destroyed. Key autoantibodies: GAD65, IA-2, ZnT8, IAA.</p>

<h3>Treatment</h3>
<ul>
  <li><strong>Insulin therapy</strong> — Basal-bolus regimen (long-acting + rapid-acting) or continuous subcutaneous insulin infusion (insulin pump)</li>
  <li><strong>CGM</strong> (continuous glucose monitoring) — Dexcom, Libre, Medtronic → enables real-time glucose tracking and time-in-range optimization</li>
  <li><strong>Automated insulin delivery (AID)</strong> — Closed-loop systems ("artificial pancreas") that adjust insulin delivery based on CGM readings</li>
  <li><strong>Adjunctive therapies</strong> — SGLT2i (sotagliflozin — first dual SGLT1/2 inhibitor for T1D), pramlintide (amylin analog)</li>
</ul>

<h3>Disease Modification — Teplizumab</h3>
<div class="formula-box"><div class="formula-label">Teplizumab — First Disease-Modifying T1D Therapy</div><div class="formula-main">
<strong>Mechanism:</strong> Anti-CD3 monoclonal antibody → modulates autoreactive T cells<br>
<strong>Indication:</strong> Delay onset of Stage 3 T1D in at-risk individuals (Stage 2: ≥ 2 autoantibodies + dysglycemia)<br>
<strong>Trial:</strong> TN-10 — delayed clinical T1D onset by a median of ~2 years<br>
<strong>Significance:</strong> First FDA-approved therapy to delay the onset of any autoimmune disease
</div></div>

<h3>Key Metrics</h3>
<ul>
  <li><strong>HbA1c</strong> — Target generally &lt; 7 % (ADA); &lt; 6.5 % (individualized)</li>
  <li><strong>Time in Range (TIR)</strong> — % of time glucose is 70–180 mg/dL; target &gt; 70 %</li>
  <li><strong>Time below range</strong> — &lt; 70 mg/dL should be &lt; 4 % (hypoglycemia risk)</li>
</ul>
`
    },
    /* ── s3 Obesity ── */
    {
      id: "s3",
      title: "Obesity & GLP-1 Revolution",
      content: `
<h3>Overview</h3>
<p>Obesity affects ~<strong>42 % of US adults</strong> (BMI ≥ 30) and is a root driver of T2D, CV disease, MASLD, certain cancers, and OSA. It is now recognized as a chronic, relapsing disease with neurobiological underpinnings — not simply a lifestyle choice.</p>

<h3>BMI Classification</h3>
<table>
  <tr><th>Category</th><th>BMI (kg/m²)</th></tr>
  <tr><td>Overweight</td><td>25.0–29.9</td></tr>
  <tr><td>Obesity Class I</td><td>30.0–34.9</td></tr>
  <tr><td>Obesity Class II</td><td>35.0–39.9</td></tr>
  <tr><td>Obesity Class III (Severe)</td><td>≥ 40.0</td></tr>
</table>

<h3>The GLP-1 Revolution</h3>
<div class="formula-box"><div class="formula-label">Incretin-Based Anti-Obesity Therapies</div><div class="formula-main">
<strong>GLP-1 RA monotherapy:</strong><br>
• Semaglutide 2.4 mg (Wegovy) → ~15–17 % total body weight loss (STEP trials)<br><br>
<strong>Dual incretin (GIP + GLP-1):</strong><br>
• Tirzepatide (Zepbound) → ~20–22 % weight loss (SURMOUNT-1)<br><br>
<strong>Triple agonist (GIP + GLP-1 + Glucagon):</strong><br>
• Retatrutide → ~24 % weight loss in Phase 2<br><br>
<strong>Oral GLP-1:</strong><br>
• Oral semaglutide (high-dose) in development for obesity indication<br><br>
<strong>Amylin-based:</strong><br>
• Cagrilintide + semaglutide (CagriSema) → ~22 % weight loss in Phase 3
</div></div>

<h3>Beyond Weight — Cardiometabolic Benefits</h3>
<ul>
  <li><strong>SELECT trial</strong> — Semaglutide 2.4 mg reduced MACE by 20 % in overweight/obese patients without diabetes</li>
  <li><strong>Kidney</strong> — Weight loss improves proteinuria and CKD progression</li>
  <li><strong>MASLD/MASH</strong> — GLP-1 RAs improve hepatic steatosis and fibrosis</li>
  <li><strong>OSA</strong> — Tirzepatide reduced AHI by ~50 % (SURMOUNT-OSA)</li>
</ul>

<h3>Bariatric Surgery</h3>
<p>Roux-en-Y gastric bypass and sleeve gastrectomy remain the most effective long-term interventions (~25–35 % weight loss). However, GLP-1 RAs are rapidly expanding the eligible population for pharmacotherapy, reaching patients who would not qualify for or accept surgery.</p>
`
    },
    /* ── s4 MASLD/MASH ── */
    {
      id: "s4",
      title: "MASLD / MASH",
      content: `
<h3>Overview</h3>
<p>Metabolic dysfunction-associated steatotic liver disease (MASLD, formerly NAFLD) is the most common liver disease globally, affecting ~<strong>30 % of adults worldwide</strong>. A subset (~20 %) progresses to MASH (formerly NASH), which involves steatosis + inflammation ± fibrosis, and can lead to cirrhosis and hepatocellular carcinoma.</p>

<h3>Disease Spectrum</h3>
<div class="formula-box"><div class="formula-label">MASLD → MASH Progression</div><div class="formula-main">
Simple Steatosis (MASLD) → Steatohepatitis (MASH) → Fibrosis (F1–F4) → Cirrhosis → HCC / Liver Transplant<br><br>
Key risk inflection: <strong>Fibrosis stage ≥ F2</strong> — this is where liver-related mortality risk rises significantly<br>
Regression is possible: Fibrosis can improve with effective treatment (especially F1–F3)
</div></div>

<h3>Diagnosis Challenges</h3>
<ul>
  <li><strong>Liver biopsy</strong> — Gold standard but invasive, sampling variability, impractical for screening</li>
  <li><strong>NIT (non-invasive tests)</strong> — FIB-4 index, NAFLD Fibrosis Score, VCTE (FibroScan), MRI-PDFF (steatosis), MRE (fibrosis)</li>
  <li><strong>NAS score</strong> — Histologic scoring: Steatosis (0–3) + Lobular Inflammation (0–3) + Ballooning (0–2) = 0–8; NAS ≥ 4 typically = MASH</li>
</ul>

<h3>Treatment Landscape</h3>
<table>
  <tr><th>Agent</th><th>Mechanism</th><th>Status</th></tr>
  <tr><td><strong>Resmetirom</strong> (Rezdiffra)</td><td>THR-β agonist → ↑ hepatic fat metabolism</td><td>FDA approved (first MASH therapy) — accelerated approval for MASH with F2–F3 fibrosis</td></tr>
  <tr><td>Semaglutide</td><td>GLP-1 RA</td><td>Phase 3 for MASH (ESSENCE trial); resolves MASH but fibrosis improvement less clear</td></tr>
  <tr><td>Tirzepatide</td><td>GIP/GLP-1 dual agonist</td><td>Phase 3 (SYNERGY-NASH); significant MASH resolution</td></tr>
  <tr><td>Survodutide</td><td>Glucagon/GLP-1 dual agonist</td><td>Phase 3; liver-directed weight loss + glucagon-mediated fat oxidation</td></tr>
  <tr><td>FGF21 analogs</td><td>Metabolic hormone analog</td><td>Pegozafermin (Phase 3); efruxifermin — strong MASH resolution + fibrosis data</td></tr>
  <tr><td>Obeticholic acid</td><td>FXR agonist</td><td>FDA CRL; pruritus AE concern</td></tr>
</table>
`
    },
    /* ── s5 Gout ── */
    {
      id: "s5",
      title: "Gout",
      content: `
<h3>Overview</h3>
<p>Gout is the most common inflammatory arthritis, affecting ~<strong>9.2 million US adults</strong> (~3.9 %). It results from deposition of monosodium urate (MSU) crystals in joints and tissues when serum urate exceeds the saturation threshold (~6.8 mg/dL).</p>

<h3>Disease Phases</h3>
<ul>
  <li><strong>Asymptomatic hyperuricemia</strong> — Elevated serum urate without clinical gout</li>
  <li><strong>Acute gout flare</strong> — Sudden onset of severe joint pain, swelling, erythema (classic: 1st MTP = podagra)</li>
  <li><strong>Intercritical gout</strong> — Asymptomatic periods between flares (MSU crystals still present)</li>
  <li><strong>Chronic tophaceous gout</strong> — Tophi (MSU crystal deposits), chronic arthritis, joint destruction</li>
</ul>

<h3>Treatment</h3>
<div class="formula-box"><div class="formula-label">Gout Treatment Paradigm</div><div class="formula-main">
<strong>Acute flare:</strong> NSAIDs, colchicine, or corticosteroids (choose based on comorbidities)<br>
<strong>IL-1 blockade:</strong> Anakinra, canakinumab (for refractory flares)<br><br>
<strong>Urate-lowering therapy (ULT):</strong><br>
• First-line: <strong>Allopurinol</strong> (xanthine oxidase inhibitor) — target serum urate &lt; 6 mg/dL<br>
• Second-line: <strong>Febuxostat</strong> (XOI; CV safety concern per CARES trial)<br>
• Refractory: <strong>Pegloticase</strong> (pegylated uricase — IV infusion, converts urate to allantoin)<br>
&nbsp;&nbsp;— Immunomodulator co-therapy (methotrexate) reduces anti-drug antibodies and improves response rates
</div></div>

<h3>Commercial Landscape</h3>
<ul>
  <li>Gout is significantly under-treated: &lt; 50 % of eligible patients receive ULT; adherence is poor</li>
  <li>Pegloticase market expanding with immunomodulation strategy (MIRROR trial)</li>
  <li>Pipeline: SEL-212 (pegylated uricase + tolerogenic nanoparticle), URAT1 inhibitors (dotinurad, verinurad)</li>
</ul>
`
    },
    /* ── s6 Key Takeaways ── */
    {
      id: "s6",
      title: "Key Takeaways",
      content: `
<h3>Metabolism TA at a Glance</h3>
<table>
  <tr><th>Condition</th><th>Key Drug Classes</th><th>Key Endpoints</th><th>Commercial Dynamics</th></tr>
  <tr><td>T2D</td><td>Metformin, GLP-1 RA, SGLT2i, insulin</td><td>HbA1c, MACE (CVOTs), renal composite</td><td>GLP-1 RA + SGLT2i dominating growth; biosimilar insulin emerging</td></tr>
  <tr><td>T1D</td><td>Insulin, CGM/AID, teplizumab</td><td>HbA1c, TIR, T1D onset delay</td><td>Device + drug convergence; disease modification is new frontier</td></tr>
  <tr><td>Obesity</td><td>GLP-1 RA, dual/triple incretins</td><td>% body weight loss, MACE, PROs</td><td>Largest commercial opportunity in pharma; supply constraints</td></tr>
  <tr><td>MASLD/MASH</td><td>Resmetirom, GLP-1 RA, FGF21</td><td>MASH resolution, fibrosis improvement (biopsy)</td><td>First approval in 2024; diagnosis bottleneck limits market</td></tr>
  <tr><td>Gout</td><td>Allopurinol, pegloticase</td><td>Serum urate &lt; 6, flare rate, tophus resolution</td><td>Under-treated; refractory gout is high-value niche</td></tr>
</table>

<div class="formula-box"><div class="formula-label">The Metabolic Convergence</div><div class="formula-main">
• <strong>One drug, many indications</strong> — Semaglutide is approved/studied in T2D, obesity, MASH, CKD, CV risk reduction, and OSA<br>
• <strong>Largest pharma TAM</strong> — Obesity + T2D combined market projected to exceed $150B by 2030<br>
• <strong>Payer challenge</strong> — Coverage and step therapy for anti-obesity medications remain key access barriers<br>
• <strong>Cardiorenal-metabolic</strong> — SGLT2i, GLP-1 RA, and finerenone create a web of overlapping indications across CV, renal, and metabolic TAs
</div></div>
`
    }
  ],
  questions: [
    {
      question: "According to ADA guidelines, which drug class is preferred for a T2D patient with established heart failure?",
      options: ["DPP-4 inhibitors","Sulfonylureas","SGLT2 inhibitors","Thiazolidinediones"],
      answer: 2,
      explanation: "SGLT2 inhibitors are preferred in T2D patients with heart failure due to proven benefits in reducing HF hospitalization (DAPA-HF, EMPEROR-Reduced trials)."
    },
    {
      question: "Tirzepatide achieves superior weight loss compared to semaglutide primarily because it targets:",
      options: ["GLP-1 + Glucagon receptors","GIP + GLP-1 receptors","GLP-1 + Amylin receptors","SGLT1 + SGLT2 transporters"],
      answer: 1,
      explanation: "Tirzepatide is a dual GIP/GLP-1 receptor agonist (twincretin). The addition of GIP agonism provides additive metabolic benefits beyond GLP-1 alone."
    },
    {
      question: "What is the first FDA-approved therapy specifically for MASH?",
      options: ["Obeticholic acid","Semaglutide","Resmetirom","Pioglitazone"],
      answer: 2,
      explanation: "Resmetirom (Rezdiffra), a thyroid hormone receptor-beta agonist, received accelerated FDA approval as the first therapy specifically indicated for MASH with moderate-to-advanced fibrosis (F2–F3)."
    },
    {
      question: "Teplizumab, the first disease-modifying therapy for T1D, works by:",
      options: ["Replacing destroyed beta cells","Blocking IL-1 inflammatory signaling","Modulating autoreactive T cells via anti-CD3","Inhibiting autoantibody production by B cells"],
      answer: 2,
      explanation: "Teplizumab is an anti-CD3 monoclonal antibody that modulates the autoreactive T cells responsible for beta-cell destruction, delaying progression from Stage 2 to Stage 3 T1D."
    }
  ]
},

/* ──────────────────────────────────────────────
   0-4  Neurology
   ────────────────────────────────────────────── */
"0-4": {
  id: "0-4",
  title: "Neurology",
  domain: "Know Your TA",
  domain_id: 0,
  level: "Foundational",
  mins: 50,
  available: true,
  tags: ["Multiple Sclerosis","Alzheimer's","Parkinson's","Epilepsy","Migraine","SMA"],
  objectives: [
    "Understand the pathophysiology and treatment landscape for major neurological conditions",
    "Identify the paradigm shift in Alzheimer's disease with anti-amyloid therapies",
    "Describe DMTs in MS and their positioning by efficacy and safety",
    "Explain key clinical endpoints and biomarkers in neurology trials"
  ],
  toc: [
    "Multiple Sclerosis",
    "Alzheimer's Disease",
    "Parkinson's Disease",
    "Epilepsy",
    "Migraine",
    "SMA & Rare Neurological Diseases"
  ],
  sections: [
    /* ── s1 MS ── */
    {
      id: "s1",
      title: "Multiple Sclerosis",
      content: `
<h3>Overview</h3>
<p>Multiple sclerosis (MS) is a chronic autoimmune demyelinating disease of the CNS affecting ~<strong>1 million Americans</strong>. The immune system attacks myelin sheaths, leading to inflammation, demyelination, axonal damage, and progressive neurodegeneration.</p>

<h3>MS Subtypes</h3>
<table>
  <tr><th>Type</th><th>Prevalence</th><th>Description</th></tr>
  <tr><td><strong>RRMS</strong> (Relapsing-Remitting)</td><td>~85 % at onset</td><td>Discrete attacks (relapses) with full or partial recovery; stable between relapses</td></tr>
  <tr><td><strong>SPMS</strong> (Secondary Progressive)</td><td>~50 % of RRMS after 15–20 yrs</td><td>Gradual worsening with or without superimposed relapses</td></tr>
  <tr><td><strong>PPMS</strong> (Primary Progressive)</td><td>~10–15 %</td><td>Steady progression from onset without early relapses</td></tr>
</table>

<h3>Disease-Modifying Therapies (DMTs) — Treatment Escalation vs Early High-Efficacy</h3>
<div class="formula-box"><div class="formula-label">MS DMT Landscape (by Efficacy Tier)</div><div class="formula-main">
<strong>Platform / Moderate efficacy:</strong><br>
• Interferons (IFN-β1a, IFN-β1b), Glatiramer acetate, Teriflunomide, Dimethyl fumarate<br><br>
<strong>High efficacy:</strong><br>
• Fingolimod, Siponimod, Ozanimod, Ponesimod (S1P modulators)<br>
• Natalizumab (anti-VLA-4; risk of PML with JCV+)<br>
• Ocrelizumab (anti-CD20; also approved for PPMS)<br>
• Ofatumumab (anti-CD20, subcutaneous)<br>
• Ublituximab (anti-CD20, 1-hour infusion)<br><br>
<strong>Induction / Immune reconstitution:</strong><br>
• Alemtuzumab (anti-CD52), Cladribine (purine analog)<br>
• AHSCT (autologous hematopoietic stem cell transplant — selected centers)
</div></div>

<h3>Key Endpoints</h3>
<ul>
  <li><strong>Annualized relapse rate (ARR)</strong> — Primary endpoint in RRMS trials</li>
  <li><strong>Confirmed disability worsening (CDW)</strong> — ≥ 1-point EDSS increase sustained for 3 or 6 months</li>
  <li><strong>MRI lesion activity</strong> — New/enlarging T2 lesions, Gd-enhancing lesions</li>
  <li><strong>Brain volume loss (atrophy)</strong> — Emerging marker of neurodegeneration</li>
  <li><strong>NEDA-3</strong> (No Evidence of Disease Activity) — No relapses + no CDW + no MRI activity</li>
  <li><strong>Serum neurofilament light (sNfL)</strong> — Blood biomarker of axonal damage</li>
</ul>

<h3>Pipeline Trends</h3>
<p>BTK inhibitors (tolebrutinib, fenebrutinib) are in Phase 3 — these cross the blood-brain barrier and may address compartmentalized CNS inflammation and progression independently of peripheral immune suppression. Remyelination therapies and neuroprotective agents remain active research areas.</p>
`
    },
    /* ── s2 Alzheimer's ── */
    {
      id: "s2",
      title: "Alzheimer's Disease",
      content: `
<h3>Overview</h3>
<p>Alzheimer's disease (AD) is the most common cause of dementia, affecting ~<strong>6.9 million Americans</strong> aged ≥ 65. The hallmark pathology involves extracellular amyloid-beta (Aβ) plaques and intracellular neurofibrillary tangles (hyperphosphorylated tau), leading to synaptic loss and neuronal death.</p>

<h3>AD Continuum</h3>
<div class="formula-box"><div class="formula-label">Alzheimer's Disease Staging</div><div class="formula-main">
<strong>Preclinical AD</strong> → Biomarker-positive (amyloid + tau) but cognitively normal<br>
<strong>MCI due to AD</strong> → Mild cognitive impairment with AD biomarkers<br>
<strong>Mild AD dementia</strong> → Functional decline in IADLs<br>
<strong>Moderate AD</strong> → Needs assistance with basic ADLs<br>
<strong>Severe AD</strong> → Full dependence; limited communication
</div></div>

<h3>Biomarkers</h3>
<table>
  <tr><th>Biomarker</th><th>Method</th><th>What It Measures</th></tr>
  <tr><td>Amyloid PET</td><td>Imaging (florbetapir, flutemetamol)</td><td>Aβ plaque burden</td></tr>
  <tr><td>Tau PET</td><td>Imaging (flortaucipir)</td><td>Tau tangle burden</td></tr>
  <tr><td>CSF Aβ42/40 ratio</td><td>Lumbar puncture</td><td>Amyloid pathology (low ratio = positive)</td></tr>
  <tr><td>CSF p-tau181/217</td><td>Lumbar puncture</td><td>Tau pathology</td></tr>
  <tr><td>Blood p-tau217</td><td>Blood test</td><td>Emerging screening tool; high accuracy for amyloid/tau</td></tr>
</table>

<h3>Anti-Amyloid Therapies</h3>
<table>
  <tr><th>Agent</th><th>Mechanism</th><th>CDR-SB Slowing</th><th>Key Safety</th></tr>
  <tr><td><strong>Lecanemab</strong> (Leqembi)</td><td>Anti-Aβ protofibril mAb</td><td>~27 % vs placebo (Clarity AD)</td><td>ARIA-E (~13 %), ARIA-H</td></tr>
  <tr><td><strong>Donanemab</strong> (Kisunla)</td><td>Anti-Aβ plaque (N3pG epitope)</td><td>~35 % in low/medium tau (TRAILBLAZER-ALZ 2)</td><td>ARIA-E (~24 %), ARIA-H</td></tr>
  <tr><td>Aducanumab</td><td>Anti-Aβ aggregate mAb</td><td>Controversial; withdrawn from market</td><td>High ARIA rates</td></tr>
</table>

<h3>ARIA (Amyloid-Related Imaging Abnormalities)</h3>
<p>The key safety concern for anti-amyloid therapies. ARIA-E = edema/effusion; ARIA-H = microhemorrhages/superficial siderosis. Risk is higher in APOE4 homozygotes. Requires MRI monitoring per protocol.</p>

<h3>Symptomatic Therapies</h3>
<ul>
  <li><strong>Cholinesterase inhibitors</strong> — Donepezil, rivastigmine, galantamine (mild-moderate)</li>
  <li><strong>NMDA antagonist</strong> — Memantine (moderate-severe)</li>
  <li>These provide modest symptomatic benefit but do not modify disease progression</li>
</ul>
`
    },
    /* ── s3 Parkinson's ── */
    {
      id: "s3",
      title: "Parkinson's Disease",
      content: `
<h3>Overview</h3>
<p>Parkinson's disease (PD) is the second most common neurodegenerative disease, affecting ~<strong>1 million Americans</strong>. It is characterized by loss of dopaminergic neurons in the substantia nigra pars compacta and accumulation of alpha-synuclein aggregates (Lewy bodies).</p>

<h3>Cardinal Motor Features</h3>
<ul>
  <li><strong>Bradykinesia</strong> (slowness of movement) — required for diagnosis</li>
  <li><strong>Rest tremor</strong> (pill-rolling, 4–6 Hz)</li>
  <li><strong>Rigidity</strong> (lead-pipe or cogwheel)</li>
  <li><strong>Postural instability</strong> (later stages)</li>
</ul>

<h3>Non-Motor Features</h3>
<p>Often precede motor symptoms by years: hyposmia (reduced smell), REM sleep behavior disorder, constipation, depression, cognitive impairment, autonomic dysfunction.</p>

<h3>Treatment</h3>
<div class="formula-box"><div class="formula-label">PD Treatment Paradigm</div><div class="formula-main">
<strong>Early PD:</strong><br>
• Levodopa/carbidopa — most effective symptomatic therapy ("gold standard")<br>
• Dopamine agonists — pramipexole, ropinirole, rotigotine (may delay levodopa motor complications)<br>
• MAO-B inhibitors — rasagiline, selegiline, safinamide<br><br>
<strong>Motor fluctuations ("wearing off"):</strong><br>
• COMT inhibitors (entacapone, opicapone) — extend levodopa effect<br>
• Istradefylline (adenosine A2A antagonist) — adjunct for OFF time<br>
• Levodopa intestinal gel (Duopa) or subcutaneous infusion<br><br>
<strong>Advanced PD:</strong><br>
• Deep brain stimulation (DBS) — subthalamic nucleus or globus pallidus<br>
• Continuous levodopa delivery systems
</div></div>

<h3>Disease Modification Landscape</h3>
<ul>
  <li><strong>Alpha-synuclein targeting</strong> — Antibodies (prasinezumab — PASADENA trial: mixed results), small molecules, ASOs</li>
  <li><strong>GLP-1 RA</strong> — Lixisenatide showed motor score benefit in Phase 2 (LixiPark); exenatide in trials</li>
  <li><strong>GCase activators</strong> — Target GBA1-associated PD (genetic subgroup ~5–10 %)</li>
  <li><strong>Gene therapy</strong> — AAV-based approaches for dopamine synthesis enzyme delivery</li>
</ul>

<h3>Key Endpoints</h3>
<ul>
  <li><strong>MDS-UPDRS</strong> — Movement Disorder Society Unified PD Rating Scale (Parts I–IV)</li>
  <li><strong>ON/OFF time</strong> — Hours per day in "ON" (good motor control) vs "OFF" state</li>
  <li><strong>DaT-SPECT</strong> — Imaging biomarker for dopamine transporter density</li>
</ul>
`
    },
    /* ── s4 Epilepsy ── */
    {
      id: "s4",
      title: "Epilepsy",
      content: `
<h3>Overview</h3>
<p>Epilepsy affects ~<strong>3.4 million Americans</strong> and is characterized by recurrent, unprovoked seizures due to excessive, synchronous neuronal activity. About one-third of patients have drug-resistant epilepsy (failure of ≥ 2 appropriately chosen ASMs).</p>

<h3>Seizure Classification (ILAE 2017)</h3>
<table>
  <tr><th>Onset</th><th>Types</th></tr>
  <tr><td><strong>Focal</strong> (one hemisphere)</td><td>Aware vs impaired awareness; motor vs non-motor; focal to bilateral tonic-clonic</td></tr>
  <tr><td><strong>Generalized</strong> (both hemispheres)</td><td>Absence, myoclonic, tonic, atonic, tonic-clonic</td></tr>
  <tr><td><strong>Unknown onset</strong></td><td>When onset cannot be determined</td></tr>
</table>

<h3>Anti-Seizure Medications (ASMs)</h3>
<div class="formula-box"><div class="formula-label">ASM Selection by Seizure Type</div><div class="formula-main">
<strong>Focal seizures (first-line):</strong> Levetiracetam, Lamotrigine, Oxcarbazepine<br>
<strong>Generalized tonic-clonic:</strong> Valproate (men), Lamotrigine (women of childbearing age), Levetiracetam<br>
<strong>Absence:</strong> Ethosuximide, Valproate, Lamotrigine<br>
<strong>Drug-resistant focal:</strong> Cenobamate (emerging as highly effective), Brivaracetam, Perampanel<br><br>
<em>Note: Valproate is teratogenic — avoid in women of childbearing potential unless no alternative</em>
</div></div>

<h3>Drug-Resistant Epilepsy — Beyond ASMs</h3>
<ul>
  <li><strong>Epilepsy surgery</strong> — Resection of seizure focus (temporal lobectomy: ~60–70 % seizure-free)</li>
  <li><strong>Neurostimulation</strong> — VNS (vagus nerve stimulation), RNS (responsive neurostimulation), DBS</li>
  <li><strong>Dietary therapy</strong> — Ketogenic diet (especially in pediatric epilepsy)</li>
</ul>

<h3>Special Populations</h3>
<ul>
  <li><strong>Dravet syndrome</strong> — Severe pediatric epilepsy (SCN1A mutation); therapies: fenfluramine, cannabidiol (Epidiolex), stiripentol</li>
  <li><strong>Lennox-Gastaut syndrome</strong> — Multiple seizure types, cognitive impairment; cannabidiol, rufinamide, clobazam</li>
  <li><strong>Tuberous sclerosis complex (TSC)</strong> — mTOR inhibitor everolimus for TSC-associated epilepsy</li>
</ul>
`
    },
    /* ── s5 Migraine ── */
    {
      id: "s5",
      title: "Migraine",
      content: `
<h3>Overview</h3>
<p>Migraine affects ~<strong>39 million Americans</strong> (~12 % of the population) and is the second leading cause of years lived with disability globally. It is a neurological disease characterized by recurrent episodes of moderate-to-severe headache with associated symptoms.</p>

<h3>Classification</h3>
<table>
  <tr><th>Type</th><th>Frequency</th><th>Features</th></tr>
  <tr><td>Episodic migraine</td><td>&lt; 15 headache days/month</td><td>Discrete attacks; may have aura (~25 %)</td></tr>
  <tr><td>Chronic migraine</td><td>≥ 15 headache days/month (≥ 8 migraine)</td><td>More disabling; higher healthcare utilization</td></tr>
</table>

<h3>CGRP — The Migraine Target</h3>
<p>Calcitonin gene-related peptide (CGRP) is a neuropeptide released during migraine attacks that causes vasodilation and neurogenic inflammation. The CGRP pathway has become the primary therapeutic target.</p>

<h3>Treatment</h3>
<div class="formula-box"><div class="formula-label">Migraine Treatment Landscape</div><div class="formula-main">
<strong>Acute treatment:</strong><br>
• Triptans (sumatriptan, rizatriptan) — 5-HT1B/1D agonists; first-line for moderate-severe<br>
• Gepants (ubrogepant, rimegepant) — oral CGRP receptor antagonists; no vasoconstrictive risk<br>
• Ditans (lasmiditan) — 5-HT1F agonist; no vasoconstriction<br>
• NSAIDs, acetaminophen (mild attacks)<br><br>
<strong>Preventive treatment (≥ 4 migraine days/month):</strong><br>
• Anti-CGRP mAbs: Erenumab (receptor), Fremanezumab, Galcanezumab, Eptinezumab (ligand)<br>
• Gepants for prevention: Atogepant (daily oral), Rimegepant (every other day)<br>
• Traditional: Topiramate, Valproate, Beta-blockers, Amitriptyline<br>
• OnabotulinumtoxinA — approved for chronic migraine (≥ 15 days/month)
</div></div>

<h3>Key Endpoints</h3>
<ul>
  <li><strong>Monthly migraine days (MMDs)</strong> — change from baseline (primary endpoint)</li>
  <li><strong>≥ 50 % responder rate</strong> — proportion achieving ≥ 50 % reduction in MMDs</li>
  <li><strong>Acute medication use days</strong></li>
  <li><strong>PROs</strong> — MSQ (Migraine-Specific Quality of Life), HIT-6 (Headache Impact Test)</li>
</ul>
`
    },
    /* ── s6 SMA & Rare Neuro ── */
    {
      id: "s6",
      title: "SMA & Rare Neurological Diseases",
      content: `
<h3>Spinal Muscular Atrophy (SMA)</h3>
<p>SMA is a rare autosomal recessive neuromuscular disease caused by mutations in the <em>SMN1</em> gene, leading to motor neuron degeneration and progressive muscle weakness. Incidence: ~1 in 10,000 live births.</p>

<h3>SMA Types</h3>
<table>
  <tr><th>Type</th><th>Onset</th><th>Motor Milestone</th><th>Natural History</th></tr>
  <tr><td>Type 1 (Werdnig-Hoffmann)</td><td>&lt; 6 months</td><td>Never sits</td><td>Death by age 2 without treatment</td></tr>
  <tr><td>Type 2</td><td>6–18 months</td><td>Sits, never walks</td><td>Variable; respiratory complications</td></tr>
  <tr><td>Type 3 (Kugelberg-Welander)</td><td>&gt; 18 months</td><td>Walks (may lose ability)</td><td>Normal lifespan; progressive weakness</td></tr>
  <tr><td>Type 4</td><td>Adulthood</td><td>Walks</td><td>Mild; normal lifespan</td></tr>
</table>

<h3>Transformative Therapies</h3>
<div class="formula-box"><div class="formula-label">SMA Treatment Revolution</div><div class="formula-main">
<strong>Nusinersen</strong> (Spinraza) — Intrathecal ASO targeting SMN2 pre-mRNA splicing; first approved SMA therapy (2016)<br>
<strong>Onasemnogene</strong> (Zolgensma) — One-time IV gene therapy delivering functional SMN1 gene via AAV9; approved for &lt; 2 years<br>
<strong>Risdiplam</strong> (Evrysdi) — Oral small molecule SMN2 splicing modifier; approved for all ages/types<br><br>
<em>Newborn screening has transformed outcomes — pre-symptomatic treatment dramatically improves motor milestones</em>
</div></div>

<h3>Other Rare Neurological Diseases of Note</h3>
<table>
  <tr><th>Disease</th><th>Mechanism</th><th>Key Therapy</th></tr>
  <tr><td><strong>ALS</strong></td><td>Motor neuron degeneration</td><td>Tofersen (SOD1 mutation — ASO); riluzole, edaravone (symptomatic)</td></tr>
  <tr><td><strong>Duchenne MD</strong></td><td>Dystrophin deficiency (X-linked)</td><td>Exon-skipping ASOs (eteplirsen, golodirsen); corticosteroids; gene therapy (delandistrogene)</td></tr>
  <tr><td><strong>Huntington's</strong></td><td>HTT gene CAG repeat expansion</td><td>No disease-modifying therapy approved; tominersen (ASO) trials ongoing</td></tr>
  <tr><td><strong>Myasthenia Gravis</strong></td><td>Autoimmune (AChR or MuSK antibodies)</td><td>FcRn inhibitors (efgartigimod, rozanolixizumab); complement inhibitors (zilucoplan, ravulizumab)</td></tr>
</table>
`
    }
  ],
  questions: [
    {
      question: "Which MS treatment approach involves anti-CD20 monoclonal antibodies?",
      options: ["S1P receptor modulation","B-cell depletion therapy","Interferon-based therapy","Immune reconstitution therapy"],
      answer: 1,
      explanation: "Ocrelizumab, ofatumumab, and ublituximab are anti-CD20 monoclonal antibodies that deplete B cells. Ocrelizumab is also the only DMT approved for primary progressive MS."
    },
    {
      question: "The primary safety concern with anti-amyloid antibodies (lecanemab, donanemab) in Alzheimer's is:",
      options: ["Hepatotoxicity","ARIA (amyloid-related imaging abnormalities)","Progressive multifocal leukoencephalopathy","Severe hypotension"],
      answer: 1,
      explanation: "ARIA (edema and hemorrhage) is the key safety concern. Risk is highest in APOE4 homozygotes and requires MRI monitoring. ARIA-E (edema) is usually asymptomatic and resolves."
    },
    {
      question: "Which of the following is NOT a cardinal motor feature of Parkinson's disease?",
      options: ["Bradykinesia","Rest tremor","Ataxia","Rigidity"],
      answer: 2,
      explanation: "The cardinal motor features of PD are bradykinesia, rest tremor, rigidity, and postural instability. Ataxia (lack of coordination) is characteristic of cerebellar disorders, not PD."
    },
    {
      question: "Zolgensma (onasemnogene) treats SMA by:",
      options: ["Modifying SMN2 splicing with an antisense oligonucleotide","Delivering a functional SMN1 gene via AAV9 gene therapy","Blocking neuromuscular junction antibodies","Inhibiting motor neuron apoptosis"],
      answer: 1,
      explanation: "Zolgensma is a one-time gene therapy that delivers a functional copy of the SMN1 gene using an AAV9 viral vector, providing sustained SMN protein production."
    }
  ]
},

/* ──────────────────────────────────────────────
   0-5  Immunology
   ────────────────────────────────────────────── */
"0-5": {
  id: "0-5",
  title: "Immunology",
  domain: "Know Your TA",
  domain_id: 0,
  level: "Foundational",
  mins: 50,
  available: true,
  tags: ["Rheumatoid Arthritis","Psoriasis","IBD","Asthma","Lupus","Atopic Dermatitis"],
  objectives: [
    "Understand the immune pathways targeted in autoimmune and inflammatory diseases",
    "Map the biologic and JAKi treatment landscape across immunology indications",
    "Identify key clinical endpoints and treat-to-target strategies",
    "Describe the commercial dynamics of the immunology market"
  ],
  toc: [
    "Rheumatoid Arthritis, PsA & Axial SpA",
    "Psoriasis & Atopic Dermatitis",
    "Inflammatory Bowel Disease",
    "Severe Asthma",
    "Systemic Lupus Erythematosus",
    "Key Takeaways"
  ],
  sections: [
    /* ── s1 RA/PsA/AS ── */
    {
      id: "s1",
      title: "Rheumatoid Arthritis, PsA & Axial SpA",
      content: `
<h3>Rheumatoid Arthritis</h3>
<p>RA is a chronic, systemic autoimmune disease causing synovial inflammation and joint destruction. It affects ~<strong>1.3 million US adults</strong>, with a female:male ratio of ~3:1. Early aggressive treatment ("treat-to-target") can prevent irreversible joint damage.</p>

<h3>RA Treatment Algorithm</h3>
<div class="formula-box"><div class="formula-label">RA — Treat-to-Target Strategy</div><div class="formula-main">
<strong>Step 1:</strong> Methotrexate (MTX) — anchor drug, first-line DMARD<br>
<strong>Step 2 (inadequate response to MTX):</strong><br>
• Add biologic DMARD: TNF inhibitor (adalimumab, etanercept, infliximab, certolizumab, golimumab)<br>
• OR IL-6 inhibitor (tocilizumab, sarilumab)<br>
• OR T-cell co-stimulation blocker (abatacept)<br>
• OR JAK inhibitor (tofacitinib, baricitinib, upadacitinib)<br>
<strong>Step 3 (biologic failure):</strong> Switch mechanism — anti-CD20 (rituximab), different biologic class, or JAKi<br><br>
<em>Target: Remission (DAS28 &lt; 2.6) or Low Disease Activity (DAS28 ≤ 3.2)</em>
</div></div>

<h3>Psoriatic Arthritis (PsA)</h3>
<p>PsA is an inflammatory arthritis associated with psoriasis, affecting ~30 % of psoriasis patients. It involves peripheral joints, axial skeleton, entheses, dactylitis, and skin/nails.</p>
<ul>
  <li><strong>Treatment:</strong> NSAIDs → csDMARDs (MTX) → bDMARDs: TNFi, IL-17i (secukinumab, ixekizumab), IL-12/23i (ustekinumab), IL-23i (guselkumab), JAKi (upadacitinib, tofacitinib)</li>
  <li>Unique to PsA: must address both joint and skin domains simultaneously</li>
</ul>

<h3>Axial Spondyloarthritis (axSpA)</h3>
<p>Includes ankylosing spondylitis (AS) and non-radiographic axSpA. Primarily affects the sacroiliac joints and spine.</p>
<ul>
  <li><strong>Treatment:</strong> NSAIDs (first-line) → TNFi or IL-17i → JAKi (upadacitinib)</li>
  <li>Note: MTX and IL-12/23i are NOT effective for axial disease</li>
</ul>

<h3>Key Endpoints</h3>
<ul>
  <li><strong>RA:</strong> ACR20/50/70 response, DAS28, HAQ-DI, radiographic progression (mTSS)</li>
  <li><strong>PsA:</strong> ACR20 + PASI 75 (skin), minimal disease activity (MDA), enthesitis/dactylitis resolution</li>
  <li><strong>axSpA:</strong> ASAS20/40, BASDAI, ASDAS</li>
</ul>
`
    },
    /* ── s2 Psoriasis & AD ── */
    {
      id: "s2",
      title: "Psoriasis & Atopic Dermatitis",
      content: `
<h3>Psoriasis</h3>
<p>Psoriasis is a chronic, immune-mediated skin disease affecting ~<strong>7.5 million US adults</strong>. Plaque psoriasis (~80–90 %) presents as well-demarcated, erythematous plaques with silvery scales. The IL-23/Th17 axis is the central pathogenic pathway.</p>

<h3>Psoriasis Treatment Ladder</h3>
<div class="formula-box"><div class="formula-label">Psoriasis Treatment by Severity</div><div class="formula-main">
<strong>Mild (BSA &lt; 3 %):</strong> Topicals — corticosteroids, vitamin D analogs, PDE4i (roflumilast cream), TYK2i (deucravacitinib — oral for moderate-severe)<br><br>
<strong>Moderate-Severe (BSA ≥ 3 % or special sites):</strong><br>
• IL-23 inhibitors: Guselkumab, Risankizumab, Tildrakizumab — highest efficacy, long dosing intervals<br>
• IL-17 inhibitors: Secukinumab, Ixekizumab, Bimekizumab (IL-17A + IL-17F), Brodalumab (IL-17RA)<br>
• TNF inhibitors: Adalimumab, Etanercept, Infliximab, Certolizumab<br>
• IL-12/23: Ustekinumab<br>
• TYK2i: Deucravacitinib (oral, first-in-class)<br>
• Oral: Apremilast (PDE4i — moderate efficacy)
</div></div>

<h3>Atopic Dermatitis (AD)</h3>
<p>AD is the most common chronic inflammatory skin disease, affecting ~<strong>16.5 million US adults</strong> and ~13 % of children. It is driven by Th2 inflammation (IL-4, IL-13, IL-31) and skin barrier dysfunction (filaggrin mutations).</p>

<h3>AD Treatment</h3>
<table>
  <tr><th>Agent</th><th>Mechanism</th><th>Route</th></tr>
  <tr><td><strong>Dupilumab</strong></td><td>Anti-IL-4Rα (blocks IL-4 + IL-13)</td><td>SC injection</td></tr>
  <tr><td><strong>Tralokinumab</strong></td><td>Anti-IL-13</td><td>SC injection</td></tr>
  <tr><td><strong>Lebrikizumab</strong></td><td>Anti-IL-13</td><td>SC injection</td></tr>
  <tr><td><strong>Nemolizumab</strong></td><td>Anti-IL-31RA (targets itch pathway)</td><td>SC injection</td></tr>
  <tr><td><strong>Abrocitinib</strong></td><td>JAK1 selective inhibitor</td><td>Oral</td></tr>
  <tr><td><strong>Upadacitinib</strong></td><td>JAK1 selective inhibitor</td><td>Oral</td></tr>
  <tr><td><strong>Baricitinib</strong></td><td>JAK1/JAK2 inhibitor</td><td>Oral</td></tr>
  <tr><td>Ruxolitinib cream</td><td>JAK1/JAK2 topical</td><td>Topical</td></tr>
</table>

<h3>Key Endpoints</h3>
<ul>
  <li><strong>Psoriasis:</strong> PASI 75/90/100, IGA 0/1, BSA, DLQI</li>
  <li><strong>AD:</strong> EASI-75, IGA 0/1, Pruritus NRS (itch reduction), DLQI, SCORAD</li>
</ul>
`
    },
    /* ── s3 IBD ── */
    {
      id: "s3",
      title: "Inflammatory Bowel Disease",
      content: `
<h3>Overview</h3>
<p>IBD encompasses <strong>Crohn's disease (CD)</strong> and <strong>ulcerative colitis (UC)</strong>, affecting ~<strong>3 million US adults</strong>. Both are chronic relapsing inflammatory conditions of the GI tract with distinct patterns:</p>
<table>
  <tr><th>Feature</th><th>Crohn's Disease</th><th>Ulcerative Colitis</th></tr>
  <tr><td>Location</td><td>Any part of GI tract (mouth to anus); skip lesions</td><td>Colon only; continuous from rectum</td></tr>
  <tr><td>Depth</td><td>Transmural (full thickness)</td><td>Mucosal/submucosal only</td></tr>
  <tr><td>Complications</td><td>Strictures, fistulae, abscesses</td><td>Toxic megacolon, colorectal cancer</td></tr>
  <tr><td>Surgery rate</td><td>~50 % within 10 years</td><td>~15 % colectomy</td></tr>
</table>

<h3>Treatment Landscape</h3>
<div class="formula-box"><div class="formula-label">IBD Biologic & Small Molecule Therapies</div><div class="formula-main">
<strong>TNF inhibitors:</strong> Infliximab, Adalimumab, Certolizumab (CD), Golimumab (UC)<br>
<strong>Anti-integrins:</strong> Vedolizumab (α4β7 — gut-selective), Natalizumab (α4 — CD only, PML risk)<br>
<strong>IL-12/23 inhibitors:</strong> Ustekinumab (CD + UC)<br>
<strong>IL-23 inhibitors:</strong> Risankizumab (CD; UC Phase 3), Guselkumab (UC + CD), Mirikizumab (UC)<br>
<strong>JAK inhibitors:</strong> Tofacitinib (UC), Upadacitinib (UC + CD), Filgotinib (UC — ex-US)<br>
<strong>S1P modulators:</strong> Ozanimod, Etrasimod (UC)<br><br>
<em>Trend: "Treat-to-target" with objective endpoints (endoscopic remission, histologic remission)</em>
</div></div>

<h3>Key Endpoints</h3>
<ul>
  <li><strong>Clinical remission</strong> — CDAI &lt; 150 (CD); rectal bleeding + stool frequency subscores (UC)</li>
  <li><strong>Endoscopic remission/improvement</strong> — SES-CD ≤ 2 (CD); Mayo endoscopic subscore 0/1 (UC)</li>
  <li><strong>Histologic remission</strong> — Emerging higher bar (Geboes score, Nancy index)</li>
  <li><strong>Biomarkers:</strong> Fecal calprotectin, CRP — non-invasive monitoring</li>
</ul>

<h3>Commercial Dynamics</h3>
<p>Humira biosimilars are reshaping pricing. IL-23i is becoming the preferred mechanism for many patients. Combination therapy (e.g., vedolizumab + anti-TNF) is being studied in refractory disease. Oral options (JAKi, S1P) offer convenience advantage.</p>
`
    },
    /* ── s4 Severe Asthma ── */
    {
      id: "s4",
      title: "Severe Asthma",
      content: `
<h3>Overview</h3>
<p>Asthma affects ~<strong>25 million Americans</strong>. Severe asthma (~5–10 % of patients) is uncontrolled despite high-dose ICS/LABA, drives disproportionate morbidity, healthcare costs, and is the target of biologic therapies.</p>

<h3>Phenotype-Based Treatment</h3>
<p>Severe asthma is classified by inflammatory phenotype, which determines biologic selection:</p>

<div class="formula-box"><div class="formula-label">Severe Asthma Biologic Selection</div><div class="formula-main">
<strong>Type 2 High (eosinophilic / allergic):</strong><br>
• Blood eosinophils ≥ 150 cells/μL or FeNO ≥ 20 ppb or IgE-driven<br><br>
Biologics:<br>
• <strong>Anti-IgE:</strong> Omalizumab (allergic asthma, high IgE)<br>
• <strong>Anti-IL-5/IL-5R:</strong> Mepolizumab, Reslizumab, Benralizumab (eosinophilic)<br>
• <strong>Anti-IL-4Rα:</strong> Dupilumab (broad Type 2; also reduces OCS dependence)<br>
• <strong>Anti-TSLP:</strong> Tezepelumab (broadest mechanism — works regardless of baseline eosinophils/IgE)<br>
• <strong>Anti-IL-33:</strong> Itepekimab (Phase 3; targets upstream alarmin)<br><br>
<strong>Type 2 Low (non-eosinophilic):</strong><br>
• Limited biologic options; tezepelumab shows some benefit<br>
• Macrolides (azithromycin), bronchial thermoplasty, biologics targeting neutrophilic pathways in development
</div></div>

<h3>Key Endpoints</h3>
<ul>
  <li><strong>Annualized exacerbation rate</strong> — Primary endpoint in most severe asthma trials</li>
  <li><strong>Pre-bronchodilator FEV1</strong> — Lung function improvement</li>
  <li><strong>OCS sparing</strong> — Reduction in oral corticosteroid dose</li>
  <li><strong>ACQ / ACT scores</strong> — Asthma control questionnaire / test</li>
</ul>

<h3>Emerging Concept — Biologic Remission</h3>
<p>Complete remission (no exacerbations, no OCS, normal lung function, controlled symptoms) is becoming a realistic goal with biologics. Some patients may sustain remission after biologic withdrawal — an active area of research.</p>
`
    },
    /* ── s5 SLE ── */
    {
      id: "s5",
      title: "Systemic Lupus Erythematosus",
      content: `
<h3>Overview</h3>
<p>SLE is a chronic, multisystem autoimmune disease characterized by autoantibody production and immune complex deposition. It affects ~<strong>300,000 Americans</strong>, with a 9:1 female:male ratio and disproportionate burden in Black, Hispanic, and Asian populations.</p>

<h3>Clinical Manifestations</h3>
<ul>
  <li><strong>Mucocutaneous</strong> — Malar (butterfly) rash, discoid lupus, photosensitivity, oral ulcers, alopecia</li>
  <li><strong>Musculoskeletal</strong> — Arthritis (non-erosive), myalgias</li>
  <li><strong>Renal</strong> — Lupus nephritis (~50 %; classes I–VI by biopsy; major cause of morbidity)</li>
  <li><strong>Hematologic</strong> — Cytopenias (anemia, leukopenia, thrombocytopenia)</li>
  <li><strong>Neuropsychiatric</strong> — Seizures, psychosis, cognitive dysfunction</li>
  <li><strong>Serositis</strong> — Pleuritis, pericarditis</li>
</ul>

<h3>Treatment</h3>
<div class="formula-box"><div class="formula-label">SLE Treatment Paradigm</div><div class="formula-main">
<strong>Background (all patients):</strong> Hydroxychloroquine (HCQ) — reduces flares, damage accrual, and mortality<br><br>
<strong>Mild-moderate:</strong> NSAIDs, low-dose corticosteroids, methotrexate, azathioprine<br><br>
<strong>Severe / renal:</strong><br>
• Mycophenolate mofetil (MMF) or cyclophosphamide (induction for lupus nephritis)<br>
• <strong>Belimumab</strong> (anti-BAFF/BLyS) — first lupus-specific biologic; approved for active SLE + lupus nephritis (add-on)<br>
• <strong>Voclosporin</strong> (calcineurin inhibitor) — approved for lupus nephritis (AURORA trial)<br>
• <strong>Anifrolumab</strong> (anti-type I IFN receptor) — approved for moderate-severe SLE (TULIP trials); strong skin + joint efficacy<br><br>
<strong>Refractory:</strong> Rituximab (off-label), obinutuzumab (Phase 3 in lupus nephritis)
</div></div>

<h3>Key Endpoints</h3>
<ul>
  <li><strong>SRI-4</strong> (SLE Responder Index) — ≥ 4-point SLEDAI reduction + no BILAG worsening + no PGA worsening</li>
  <li><strong>BICLA</strong> (BILAG-based Composite Lupus Assessment) — improvement in all active BILAG domains</li>
  <li><strong>Lupus nephritis:</strong> Complete renal response (UPCR &lt; 0.5 g/g + stable eGFR)</li>
  <li><strong>OCS sparing</strong> — Reducing prednisone to ≤ 7.5 mg/day</li>
  <li><strong>Flare rate</strong> and <strong>time to first flare</strong></li>
</ul>

<h3>Biomarkers</h3>
<ul>
  <li><strong>Anti-dsDNA</strong> — Specific for SLE; correlates with disease activity (especially renal)</li>
  <li><strong>Complement C3/C4</strong> — Low levels indicate active disease / consumption</li>
  <li><strong>Anti-Smith</strong> — Highly specific for SLE (not sensitive)</li>
  <li><strong>IFN gene signature</strong> — Elevated in ~50–80 % of SLE patients; predicts anifrolumab response</li>
</ul>
`
    },
    /* ── s6 Key Takeaways ── */
    {
      id: "s6",
      title: "Key Takeaways",
      content: `
<h3>Immunology TA at a Glance</h3>
<table>
  <tr><th>Condition</th><th>Key Drug Classes</th><th>Key Endpoints</th><th>Commercial Dynamics</th></tr>
  <tr><td>RA / PsA / axSpA</td><td>MTX, TNFi, IL-17i, IL-23i, JAKi</td><td>ACR20/50/70, DAS28, MDA, ASAS40</td><td>Biosimilar TNFi reshaping pricing; JAKi safety box limiting uptake</td></tr>
  <tr><td>Psoriasis</td><td>IL-23i, IL-17i, TYK2i, TNFi</td><td>PASI 90/100, IGA 0/1</td><td>IL-23i becoming preferred; high bar for new entrants</td></tr>
  <tr><td>Atopic Dermatitis</td><td>IL-4Rα, IL-13, IL-31, JAK1i</td><td>EASI-75, IGA 0/1, pruritus NRS</td><td>Dupilumab dominates; oral JAKi and new biologics expanding</td></tr>
  <tr><td>IBD</td><td>TNFi, IL-23i, JAKi, S1P, anti-integrin</td><td>Endoscopic remission, histologic remission</td><td>Humira biosimilars; IL-23i gaining share; combination therapy emerging</td></tr>
  <tr><td>Severe Asthma</td><td>Anti-IL-5, anti-IL-4Rα, anti-TSLP, anti-IgE</td><td>Exacerbation rate, FEV1, OCS sparing</td><td>Phenotype-guided selection; TSLP as broadest mechanism</td></tr>
  <tr><td>SLE</td><td>HCQ, belimumab, anifrolumab, voclosporin</td><td>SRI-4, BICLA, renal response</td><td>High unmet need; first targeted therapies finally arriving</td></tr>
</table>

<div class="formula-box"><div class="formula-label">Immunology Market Themes</div><div class="formula-main">
• <strong>Biosimilar disruption</strong> — TNFi biosimilars (adalimumab, infliximab) are transforming payer dynamics<br>
• <strong>Oral vs injectable</strong> — JAKi offer oral convenience but carry safety box warnings (VTE, MACE, malignancy from ORAL Surveillance)<br>
• <strong>Cross-indication platforms</strong> — Same molecules (upadacitinib, dupilumab, IL-23i) spanning 4–6 indications<br>
• <strong>Treat-to-target</strong> — Higher treatment goals (endoscopic remission, PASI 100, complete remission) raising efficacy bars
</div></div>
`
    }
  ],
  questions: [
    {
      question: "In rheumatoid arthritis, the treat-to-target goal of 'remission' corresponds to a DAS28 score of:",
      options: ["< 2.6","< 3.2","< 4.0","< 5.1"],
      answer: 0,
      explanation: "DAS28 < 2.6 defines remission in RA. DAS28 ≤ 3.2 is low disease activity, which is an acceptable alternative target in some patients."
    },
    {
      question: "Which biologic targets TSLP, an upstream alarmin, and works in severe asthma regardless of baseline eosinophil count?",
      options: ["Omalizumab","Mepolizumab","Dupilumab","Tezepelumab"],
      answer: 3,
      explanation: "Tezepelumab targets thymic stromal lymphopoietin (TSLP), an epithelial alarmin upstream of multiple inflammatory pathways. It reduces exacerbations in both Type 2-high and Type 2-low severe asthma."
    },
    {
      question: "Anifrolumab, approved for moderate-severe SLE, works by blocking:",
      options: ["BAFF/BLyS","Type I interferon receptor","IL-6 receptor","CD20 on B cells"],
      answer: 1,
      explanation: "Anifrolumab is a monoclonal antibody against the type I interferon receptor (IFNAR1). The type I IFN pathway is activated in the majority of SLE patients and drives disease pathology."
    },
    {
      question: "In ulcerative colitis, which endpoint represents a higher bar than endoscopic remission?",
      options: ["Clinical remission (PRO-based)","Histologic remission","CDAI < 150","ACR50 response"],
      answer: 1,
      explanation: "Histologic remission (resolution of microscopic inflammation) is a higher bar than endoscopic remission and is increasingly used as a treatment target in UC, as it correlates with better long-term outcomes."
    }
  ]
},

/* ──────────────────────────────────────────────
   0-6  Oncology
   ────────────────────────────────────────────── */
"0-6": {
  id: "0-6",
  title: "Oncology",
  domain: "Know Your TA",
  domain_id: 0,
  level: "Foundational",
  mins: 55,
  available: true,
  tags: ["NSCLC","Breast Cancer","CRC","Hematologic Malignancies","Prostate Cancer","Melanoma","Immuno-Oncology"],
  objectives: [
    "Understand the treatment paradigm shifts driven by immunotherapy and targeted therapy",
    "Describe the molecular subtypes and biomarker-driven treatment of key solid tumors",
    "Explain the landscape of hematologic malignancies and transformative therapies",
    "Identify key clinical endpoints and the regulatory framework for oncology approvals"
  ],
  toc: [
    "Lung Cancer (NSCLC & SCLC)",
    "Breast Cancer",
    "Colorectal Cancer & GI Tumors",
    "Hematologic Malignancies",
    "Prostate Cancer & Melanoma",
    "Key Takeaways"
  ],
  sections: [
    /* ── s1 Lung Cancer ── */
    {
      id: "s1",
      title: "Lung Cancer (NSCLC & SCLC)",
      content: `
<h3>Overview</h3>
<p>Lung cancer is the leading cause of cancer death in the US (~<strong>125,000 deaths/year</strong>). Non-small cell lung cancer (NSCLC) accounts for ~85 % of cases; small cell lung cancer (SCLC) accounts for ~15 %.</p>

<h3>NSCLC — Molecular Subtypes & Targeted Therapy</h3>
<p>Comprehensive genomic profiling is now standard of care. Actionable driver mutations include:</p>
<table>
  <tr><th>Driver</th><th>Frequency</th><th>Key Targeted Therapy</th></tr>
  <tr><td><strong>EGFR</strong> mutations</td><td>~15–20 % (higher in Asian, never-smokers)</td><td>Osimertinib (3rd-gen TKI; standard 1L)</td></tr>
  <tr><td><strong>ALK</strong> rearrangement</td><td>~5 %</td><td>Alectinib, lorlatinib (CNS penetration)</td></tr>
  <tr><td><strong>KRAS G12C</strong></td><td>~13 %</td><td>Sotorasib, adagrasib</td></tr>
  <tr><td><strong>ROS1</strong></td><td>~1–2 %</td><td>Crizotinib, entrectinib, repotrectinib</td></tr>
  <tr><td><strong>BRAF V600E</strong></td><td>~2 %</td><td>Dabrafenib + trametinib</td></tr>
  <tr><td><strong>MET exon 14</strong></td><td>~3 %</td><td>Capmatinib, tepotinib</td></tr>
  <tr><td><strong>RET</strong></td><td>~1–2 %</td><td>Selpercatinib, pralsetinib</td></tr>
  <tr><td><strong>NTRK</strong></td><td>&lt; 1 %</td><td>Larotrectinib, entrectinib</td></tr>
  <tr><td><strong>HER2</strong> mutations</td><td>~2–3 %</td><td>Trastuzumab deruxtecan (ADC)</td></tr>
</table>

<h3>NSCLC — Immuno-Oncology (No Actionable Driver)</h3>
<div class="formula-box"><div class="formula-label">NSCLC IO Treatment Paradigm</div><div class="formula-main">
<strong>PD-L1 ≥ 50 %:</strong> Pembrolizumab monotherapy OR Pembrolizumab + chemo<br>
<strong>PD-L1 1–49 %:</strong> Pembrolizumab + chemotherapy (platinum doublet)<br>
<strong>PD-L1 &lt; 1 %:</strong> Chemo + IO (pembrolizumab or nivolumab + ipilimumab + chemo)<br><br>
<strong>Emerging:</strong> Perioperative IO (neoadjuvant + adjuvant) — nivolumab (CheckMate 816), pembrolizumab (KEYNOTE-671) — shifting cure rates in resectable NSCLC
</div></div>

<h3>SCLC</h3>
<p>Aggressive, rapidly proliferating tumor. Standard 1L: Platinum + etoposide + atezolizumab (IMpower133) or durvalumab (CASPIAN). Limited options at relapse — lurbinectedin for 2L. High unmet need.</p>
`
    },
    /* ── s2 Breast Cancer ── */
    {
      id: "s2",
      title: "Breast Cancer",
      content: `
<h3>Overview</h3>
<p>Breast cancer is the most commonly diagnosed cancer in women (~<strong>310,000 new cases/year</strong> in the US). Treatment is fundamentally guided by molecular subtype.</p>

<h3>Molecular Subtypes</h3>
<table>
  <tr><th>Subtype</th><th>Frequency</th><th>Markers</th><th>Key Therapies</th></tr>
  <tr><td><strong>HR+/HER2−</strong></td><td>~70 %</td><td>ER+ and/or PR+, HER2−</td><td>Endocrine therapy + CDK4/6i</td></tr>
  <tr><td><strong>HER2+</strong></td><td>~15–20 %</td><td>HER2 overexpression/amplification</td><td>Trastuzumab, pertuzumab, T-DXd, T-DM1</td></tr>
  <tr><td><strong>Triple-Negative (TNBC)</strong></td><td>~10–15 %</td><td>ER−, PR−, HER2−</td><td>Chemo ± pembrolizumab (PD-L1+), sacituzumab govitecan (ADC)</td></tr>
</table>

<h3>HR+/HER2− Treatment</h3>
<div class="formula-box"><div class="formula-label">HR+/HER2− Metastatic Breast Cancer</div><div class="formula-main">
<strong>1L:</strong> CDK4/6 inhibitor (palbociclib, ribociclib, abemaciclib) + aromatase inhibitor (letrozole/anastrozole)<br>
<strong>2L:</strong> Fulvestrant ± CDK4/6i; or ESR1 mutation → Elacestrant (oral SERD)<br>
<strong>3L+:</strong> Alpelisib (PI3Kα — PIK3CA-mutated), Capivasertib (AKT inhibitor), Trastuzumab deruxtecan (HER2-low)<br><br>
<em>HER2-low (IHC 1+ or 2+/ISH−) is a new actionable category — T-DXd showed PFS/OS benefit (DESTINY-Breast04)</em>
</div></div>

<h3>HER2+ Treatment</h3>
<ul>
  <li><strong>Early stage:</strong> Neoadjuvant pertuzumab + trastuzumab + chemo → surgery → adjuvant trastuzumab (± T-DM1 if residual disease)</li>
  <li><strong>Metastatic 1L:</strong> Pertuzumab + trastuzumab + taxane (CLEOPATRA)</li>
  <li><strong>Metastatic 2L:</strong> Trastuzumab deruxtecan (T-DXd) — transformative ADC (DESTINY-Breast03)</li>
  <li><strong>Later lines:</strong> Tucatinib + trastuzumab + capecitabine (HER2CLIMB — including brain mets)</li>
</ul>

<h3>TNBC</h3>
<ul>
  <li><strong>Early stage:</strong> Neoadjuvant pembrolizumab + chemo → adjuvant pembrolizumab (KEYNOTE-522)</li>
  <li><strong>Metastatic PD-L1+:</strong> Pembrolizumab + chemo</li>
  <li><strong>Metastatic later lines:</strong> Sacituzumab govitecan (Trop-2 ADC), olaparib/talazoparib (BRCA-mutated)</li>
</ul>
`
    },
    /* ── s3 CRC & GI ── */
    {
      id: "s3",
      title: "Colorectal Cancer & GI Tumors",
      content: `
<h3>Colorectal Cancer (CRC)</h3>
<p>CRC is the 3rd most common cancer and 2nd leading cause of cancer death in the US (~<strong>153,000 new cases/year</strong>). Key biomarkers drive treatment selection.</p>

<h3>CRC Biomarkers & Targeted Therapy</h3>
<table>
  <tr><th>Biomarker</th><th>Frequency</th><th>Therapeutic Implication</th></tr>
  <tr><td><strong>MSI-H / dMMR</strong></td><td>~15 % (stage II–III); ~5 % metastatic</td><td>Checkpoint inhibitor responsive; pembrolizumab 1L (KEYNOTE-177)</td></tr>
  <tr><td><strong>RAS wild-type</strong></td><td>~45 %</td><td>Anti-EGFR eligible (cetuximab, panitumumab) — left-sided primary preferred</td></tr>
  <tr><td><strong>KRAS/NRAS mutant</strong></td><td>~55 %</td><td>Anti-EGFR resistance; KRAS G12C → sotorasib + panitumumab (CodeBreaK 300)</td></tr>
  <tr><td><strong>BRAF V600E</strong></td><td>~8–10 %</td><td>Poor prognosis; encorafenib + cetuximab (BEACON)</td></tr>
  <tr><td><strong>HER2 amplification</strong></td><td>~3–5 %</td><td>Trastuzumab deruxtecan, tucatinib + trastuzumab (MOUNTAINEER)</td></tr>
</table>

<div class="formula-box"><div class="formula-label">mCRC Treatment Framework</div><div class="formula-main">
<strong>MSI-H/dMMR:</strong> Pembrolizumab monotherapy (1L — KEYNOTE-177) or dostarlimab + chemo<br>
<strong>MSS + RAS WT + left-sided:</strong> FOLFOX/FOLFIRI + anti-EGFR (cetuximab or panitumumab)<br>
<strong>MSS + RAS WT + right-sided:</strong> FOLFOX/FOLFIRI + bevacizumab<br>
<strong>RAS mutant:</strong> FOLFOX/FOLFIRI + bevacizumab<br>
<strong>Maintenance:</strong> 5-FU + bevacizumab or capecitabine after induction
</div></div>

<h3>Other GI Tumors of Note</h3>
<table>
  <tr><th>Tumor</th><th>Key Advances</th></tr>
  <tr><td><strong>Gastric / GEJ</strong></td><td>Nivolumab + chemo ± trastuzumab (HER2+); Zolbetuximab (CLDN18.2+ — GLOW/SPOTLIGHT)</td></tr>
  <tr><td><strong>Hepatocellular Carcinoma</strong></td><td>Atezolizumab + bevacizumab (IMbrave150) 1L; durvalumab + tremelimumab (HIMALAYA)</td></tr>
  <tr><td><strong>Pancreatic (PDAC)</strong></td><td>Highest unmet need; FOLFIRINOX or Gem/nab-paclitaxel remain standard; minimal IO benefit in MSS</td></tr>
  <tr><td><strong>Cholangiocarcinoma</strong></td><td>IDH1 mutant → ivosidenib; FGFR2 fusion → futibatinib, pemigatinib; durvalumab + gem/cis (TOPAZ-1)</td></tr>
</table>
`
    },
    /* ── s4 Hematologic Malignancies ── */
    {
      id: "s4",
      title: "Hematologic Malignancies",
      content: `
<h3>Overview</h3>
<p>Hematologic malignancies encompass leukemias, lymphomas, and multiple myeloma. This space has seen the most transformative therapies in oncology: targeted agents, bispecifics, CAR-T cells, and ADCs.</p>

<h3>Chronic Lymphocytic Leukemia (CLL)</h3>
<ul>
  <li><strong>Standard of care:</strong> BTK inhibitors (ibrutinib, acalabrutinib, zanubrutinib) or venetoclax (BCL-2 inhibitor) ± obinutuzumab</li>
  <li>Fixed-duration venetoclax + obinutuzumab increasingly preferred</li>
  <li>Chemo-free era: most CLL patients no longer receive chemotherapy</li>
</ul>

<h3>Diffuse Large B-Cell Lymphoma (DLBCL)</h3>
<ul>
  <li><strong>1L:</strong> R-CHOP (rituximab + chemo) remains standard; Polatuzumab vedotin + R-CHP (POLARIX) emerging</li>
  <li><strong>Relapsed/Refractory:</strong> CAR-T cells (axicabtagene ciloleucel, lisocabtagene maraleucel, tisagenlecleucel) — moving to 2L</li>
  <li><strong>Bispecifics:</strong> Glofitamab, epcoritamab, mosunetuzumab (CD20 × CD3) — off-the-shelf alternatives to CAR-T</li>
</ul>

<h3>Multiple Myeloma</h3>
<div class="formula-box"><div class="formula-label">Multiple Myeloma Treatment Evolution</div><div class="formula-main">
<strong>1L (transplant-eligible):</strong> VRd (bortezomib + lenalidomide + dex) → ASCT → lenalidomide maintenance<br>
<strong>1L (transplant-ineligible):</strong> DaraVRd (daratumumab + VRd) — MAIA/PERSEUS paradigm shift<br><br>
<strong>Relapsed/Refractory:</strong><br>
• Anti-CD38: Daratumumab, Isatuximab (+ pomalidomide + dex or carfilzomib + dex)<br>
• CELMoDs: Iberdomide, mezigdomide (next-gen IMiDs — cereblon E3 ligase modulators)<br>
• Bispecifics: Teclistamab (BCMA × CD3), Talquetamab (GPRC5D × CD3), Elranatamab (BCMA × CD3)<br>
• CAR-T: Idecabtagene vicleucel, Ciltacabtagene autoleucel (BCMA-directed)<br>
• ADC: Belantamab mafodotin (anti-BCMA ADC — DREAMM studies)
</div></div>

<h3>Acute Myeloid Leukemia (AML)</h3>
<ul>
  <li>Historically treated with "7+3" (cytarabine + daunorubicin)</li>
  <li><strong>Targeted therapies:</strong> FLT3 inhibitors (midostaurin, gilteritinib), IDH1/2 inhibitors (ivosidenib, enasidenib), venetoclax + azacitidine (unfit patients — VIALE-A)</li>
  <li><strong>Menin inhibitors:</strong> Revumenib (KMT2A-rearranged / NPM1-mutated AML) — new targeted class</li>
</ul>

<h3>Key Endpoints in Heme-Onc</h3>
<ul>
  <li><strong>Overall survival (OS)</strong>, <strong>Progression-free survival (PFS)</strong></li>
  <li><strong>Complete response (CR)</strong>, <strong>MRD-negativity</strong> (minimal residual disease — increasingly important)</li>
  <li><strong>Duration of response (DoR)</strong></li>
</ul>
`
    },
    /* ── s5 Prostate & Melanoma ── */
    {
      id: "s5",
      title: "Prostate Cancer & Melanoma",
      content: `
<h3>Prostate Cancer</h3>
<p>Prostate cancer is the most common cancer in men (~<strong>299,000 new cases/year</strong> in the US). Treatment depends on stage, risk group, and castration sensitivity.</p>

<h3>Treatment Paradigm</h3>
<div class="formula-box"><div class="formula-label">Prostate Cancer Treatment Stages</div><div class="formula-main">
<strong>Localized (low risk):</strong> Active surveillance (preferred for Grade Group 1)<br>
<strong>Localized (intermediate-high risk):</strong> Radical prostatectomy or radiation + ADT<br><br>
<strong>Metastatic Hormone-Sensitive (mHSPC):</strong><br>
• ADT + intensification: Abiraterone, Enzalutamide, Apalutamide, or Darolutamide + docetaxel<br>
• Triplet: ADT + ARPI + docetaxel (PEACE-1, ARASENS)<br><br>
<strong>Metastatic Castration-Resistant (mCRPC):</strong><br>
• ARPI switch (if not used in mHSPC)<br>
• Docetaxel → cabazitaxel<br>
• PARP inhibitors: Olaparib, rucaparib, talazoparib + enzalutamide (HRR-mutated, especially BRCA1/2)<br>
• Lu-177 PSMA (Pluvicto) — radioligand therapy (VISION trial)<br>
• Pembrolizumab (MSI-H/dMMR — rare subset)
</div></div>

<h3>Key Biomarkers</h3>
<ul>
  <li><strong>PSA</strong> — Screening, monitoring, response assessment</li>
  <li><strong>HRR mutations</strong> (BRCA1/2, ATM) — PARP inhibitor eligibility (~25 % of mCRPC)</li>
  <li><strong>PSMA expression</strong> — PET imaging and radioligand therapy selection</li>
  <li><strong>MSI-H/dMMR</strong> — IO eligibility (rare, ~3 %)</li>
</ul>

<h3>Melanoma</h3>
<p>Melanoma is the deadliest skin cancer (~<strong>100,000 new cases/year</strong>). It has been transformed by immunotherapy and BRAF-targeted therapy.</p>

<h3>Melanoma Treatment</h3>
<table>
  <tr><th>Setting</th><th>Treatment</th></tr>
  <tr><td>Adjuvant (Stage III–IV resected)</td><td>Pembrolizumab or Nivolumab; Dabrafenib + Trametinib (BRAF V600)</td></tr>
  <tr><td>Neoadjuvant (emerging)</td><td>Pembrolizumab (SWOG S1801 — improved EFS vs adjuvant alone)</td></tr>
  <tr><td>Metastatic — all comers</td><td>Nivolumab + relatlimab (anti-LAG-3; RELATIVITY-047) or Nivolumab + ipilimumab (CheckMate 067)</td></tr>
  <tr><td>Metastatic — BRAF V600</td><td>BRAF + MEK inhibitors (dabrafenib + trametinib, encorafenib + binimetinib) — rapid response but resistance develops</td></tr>
  <tr><td>Refractory</td><td>T-VEC (oncolytic virus, injectable lesions); TIL therapy (lifileucel — first FDA-approved TIL); bispecific (tebentafusp for uveal melanoma)</td></tr>
</table>

<h3>Key Endpoints in Solid Tumors</h3>
<ul>
  <li><strong>Overall Survival (OS)</strong> — Gold standard</li>
  <li><strong>Progression-Free Survival (PFS)</strong> — Commonly used primary endpoint</li>
  <li><strong>Objective Response Rate (ORR)</strong> — RECIST criteria for tumor shrinkage</li>
  <li><strong>Duration of Response (DoR)</strong></li>
  <li><strong>Pathologic Complete Response (pCR)</strong> — Neoadjuvant settings</li>
</ul>
`
    },
    /* ── s6 Key Takeaways ── */
    {
      id: "s6",
      title: "Key Takeaways",
      content: `
<h3>Oncology TA at a Glance</h3>
<table>
  <tr><th>Tumor</th><th>Key Treatment Paradigm</th><th>Biggest Pipeline Trend</th></tr>
  <tr><td>NSCLC</td><td>Biomarker-driven: TKIs for drivers; IO ± chemo for non-drivers</td><td>Perioperative IO; ADCs (TROP2, HER3); bispecifics</td></tr>
  <tr><td>Breast (HR+)</td><td>CDK4/6i + endocrine; HER2-low opens T-DXd access</td><td>Oral SERDs (ESR1 mut); PI3K/AKT pathway; ADCs</td></tr>
  <tr><td>Breast (HER2+)</td><td>Anti-HER2 backbone; T-DXd in 2L</td><td>HER2-low and HER2-ultralow expansion</td></tr>
  <tr><td>CRC</td><td>MSI-H → IO; MSS → chemo + targeted (anti-EGFR or bev)</td><td>IO for MSS CRC (combinations); KRAS G12C in CRC</td></tr>
  <tr><td>Hematologic</td><td>Chemo-free regimens; CAR-T and bispecifics</td><td>Bispecifics vs CAR-T positioning; MRD-guided decisions</td></tr>
  <tr><td>Prostate</td><td>ADT intensification; PARP for HRR; PSMA radioligand</td><td>Earlier ARPI + chemo triplets; PSMA combinations</td></tr>
  <tr><td>Melanoma</td><td>IO backbone (nivo + ipi or nivo + rela); BRAF+MEK</td><td>Neoadjuvant IO; TIL therapy; LAG-3 and other checkpoints</td></tr>
</table>

<div class="formula-box"><div class="formula-label">Oncology Market Themes</div><div class="formula-main">
• <strong>Precision medicine</strong> — Biomarker testing (NGS, PD-L1, MSI, HRR) is now mandatory before treatment<br>
• <strong>ADC explosion</strong> — Antibody-drug conjugates transforming multiple tumor types (T-DXd, sacituzumab govitecan, etc.)<br>
• <strong>Bispecifics vs CAR-T</strong> — Off-the-shelf bispecifics challenging CAR-T in heme; may not require hospitalization<br>
• <strong>IO combinations</strong> — Moving beyond PD-1/PD-L1 + CTLA-4 into LAG-3, TIGIT, and other checkpoint pairs<br>
• <strong>Earlier treatment lines</strong> — Perioperative/neoadjuvant IO and targeted therapy shifting treatment earlier in the disease course<br>
• <strong>Real-world evidence</strong> — Tumor registries and EHR data increasingly used for label expansion and payer evidence
</div></div>
`
    }
  ],
  questions: [
    {
      question: "In metastatic NSCLC without an actionable driver mutation and PD-L1 ≥ 50%, the standard first-line treatment includes:",
      options: ["Osimertinib monotherapy","Carboplatin + pemetrexed only","Pembrolizumab monotherapy or pembrolizumab + chemotherapy","Nivolumab monotherapy"],
      answer: 2,
      explanation: "For NSCLC without actionable drivers and PD-L1 ≥ 50%, pembrolizumab monotherapy (KEYNOTE-024) or pembrolizumab + chemotherapy are standard first-line options."
    },
    {
      question: "The DESTINY-Breast04 trial established trastuzumab deruxtecan (T-DXd) as effective in which newly defined breast cancer population?",
      options: ["Triple-negative breast cancer","BRCA-mutated breast cancer","HER2-low breast cancer","PIK3CA-mutated breast cancer"],
      answer: 2,
      explanation: "DESTINY-Breast04 demonstrated PFS and OS benefit for T-DXd in HER2-low (IHC 1+ or IHC 2+/ISH−) metastatic breast cancer, creating a new actionable biomarker category."
    },
    {
      question: "In CLL, the shift to 'chemo-free' treatment relies primarily on which two drug classes?",
      options: ["HDAC inhibitors and proteasome inhibitors","BTK inhibitors and BCL-2 inhibitors","PI3K inhibitors and mTOR inhibitors","Anti-CD20 antibodies and alkylating agents"],
      answer: 1,
      explanation: "BTK inhibitors (ibrutinib, acalabrutinib, zanubrutinib) and BCL-2 inhibitors (venetoclax) have transformed CLL into a largely chemo-free disease, with most patients no longer receiving traditional chemotherapy."
    },
    {
      question: "Lu-177 PSMA (Pluvicto) is a radioligand therapy approved for:",
      options: ["Metastatic hormone-sensitive prostate cancer","Localized high-risk prostate cancer","Metastatic castration-resistant prostate cancer (PSMA-positive)","Neuroendocrine prostate cancer"],
      answer: 2,
      explanation: "Lutetium-177 PSMA-617 (Pluvicto) is approved for PSMA-positive mCRPC after prior ARPI and taxane therapy, based on the VISION trial demonstrating OS and rPFS improvement."
    }
  ]
}

});
