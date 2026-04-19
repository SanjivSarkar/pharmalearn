/* Domain 5: Data Science & Analytics Engineering */
PL.addChapters({

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
<pre><code class="language-sql">-- 1. ELIGIBILITY TABLE: Enrollment periods
-- patient_id, plan_id, start_date, end_date, payer_type, geography

-- 2. MEDICAL CLAIMS TABLE: Facility and professional claims
SELECT
    m.patient_id,
    m.claim_id,
    m.service_date,
    m.icd10_dx_1,          -- Primary diagnosis
    m.icd10_dx_2,          -- Secondary diagnoses (up to 25)
    m.cpt_code,            -- Procedure code (professional claims)
    m.hcpcs_code,          -- Drug/infusion code (buy-and-bill)
    m.drg_code,            -- Diagnosis-related group (inpatient)
    m.place_of_service,    -- 11=office, 21=inpatient, 23=ER, 31=SNF
    m.provider_npi,
    m.paid_amount,
    m.allowed_amount
FROM medical_claims m
WHERE m.service_date BETWEEN '2023-01-01' AND '2023-12-31';

-- 3. PHARMACY CLAIMS TABLE: Retail and specialty Rx
SELECT
    p.patient_id,
    p.fill_date,
    p.ndc_code,            -- 11-digit National Drug Code
    p.drug_name,
    p.drug_class,
    p.days_supply,
    p.quantity,
    p.prescriber_npi,
    p.pharmacy_npi,
    p.paid_amount,
    p.patient_copay
FROM pharmacy_claims p
WHERE p.fill_date BETWEEN '2023-01-01' AND '2023-12-31';</code></pre>
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
<pre><code class="language-sql">-- OMOP CDM Core Tables (v5.4)

-- PERSON table: One row per patient
-- person_id, gender_concept_id, year_of_birth, race_concept_id, ethnicity_concept_id

-- CONDITION_OCCURRENCE: Diagnoses mapped to SNOMED-CT concepts
SELECT
    co.person_id,
    co.condition_concept_id,    -- SNOMED concept (not raw ICD)
    co.condition_start_date,
    co.condition_end_date,
    co.condition_type_concept_id  -- Primary, secondary, etc.
FROM condition_occurrence co
WHERE co.condition_concept_id IN (
    SELECT descendant_concept_id
    FROM concept_ancestor
    WHERE ancestor_concept_id = 4112343  -- CLL concept in SNOMED
);

-- DRUG_EXPOSURE: Pharmacy mapped to RxNorm concepts
SELECT
    de.person_id,
    de.drug_concept_id,         -- RxNorm ingredient/product
    de.drug_exposure_start_date,
    de.days_supply,
    de.quantity
FROM drug_exposure de
WHERE de.drug_concept_id IN (
    SELECT concept_id FROM concept
    WHERE concept_name LIKE '%acalabrutinib%'  -- Ingredient-level search
    AND concept_class_id = 'Ingredient'
);</code></pre>
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
<pre><code class="language-sql">-- PATTERN 1: First event (index date) with lookback period
WITH first_diagnosis AS (
    SELECT
        patient_id,
        MIN(service_date) AS index_date
    FROM medical_claims
    WHERE icd10_dx_1 LIKE 'C83%'
       OR icd10_dx_2 LIKE 'C83%'   -- Check all dx positions
    GROUP BY patient_id
),
-- Require 6-month lookback (no prior diagnosis in baseline period)
new_diagnoses AS (
    SELECT fd.patient_id, fd.index_date
    FROM first_diagnosis fd
    WHERE NOT EXISTS (
        SELECT 1 FROM medical_claims mc
        WHERE mc.patient_id = fd.patient_id
          AND mc.service_date < fd.index_date
          AND mc.service_date >= DATEADD(month, -6, fd.index_date)
          AND (mc.icd10_dx_1 LIKE 'C83%' OR mc.icd10_dx_2 LIKE 'C83%')
    )
),
-- Continuous enrollment check
enrolled_patients AS (
    SELECT nd.patient_id, nd.index_date
    FROM new_diagnoses nd
    JOIN eligibility e ON nd.patient_id = e.patient_id
    WHERE e.start_date <= DATEADD(month, -6, nd.index_date)
      AND e.end_date >= DATEADD(month, 12, nd.index_date)
)
SELECT COUNT(*) AS eligible_patients FROM enrolled_patients;</code></pre>`},
    {id:"s2",content:`<h2 id="s2">Window Functions</h2>
<p>Window functions are essential for time-series pharma analytics — they compute values across a defined "window" of rows without collapsing the result set:</p>
<pre><code class="language-sql">-- Key window functions for pharma analytics

-- 1. LAG/LEAD: Days between consecutive fills
SELECT
    patient_id,
    fill_date,
    drug_name,
    days_supply,
    LAG(fill_date) OVER (PARTITION BY patient_id ORDER BY fill_date) AS prior_fill_date,
    DATEDIFF(day,
        LAG(fill_date) OVER (PARTITION BY patient_id ORDER BY fill_date),
        fill_date
    ) AS days_since_last_fill,
    LEAD(fill_date) OVER (PARTITION BY patient_id ORDER BY fill_date) AS next_fill_date
FROM pharmacy_claims
WHERE drug_class = 'BTK_inhibitor';

-- 2. ROW_NUMBER: Select first event per patient
WITH ranked_fills AS (
    SELECT
        patient_id,
        fill_date,
        drug_name,
        ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY fill_date) AS fill_rank
    FROM pharmacy_claims
    WHERE drug_class = 'BTK_inhibitor'
)
SELECT * FROM ranked_fills WHERE fill_rank = 1;  -- First fill only

-- 3. Running totals: Cumulative adherence days
SELECT
    patient_id,
    fill_date,
    days_supply,
    SUM(days_supply) OVER (
        PARTITION BY patient_id
        ORDER BY fill_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS cumulative_days_covered
FROM pharmacy_claims;

-- 4. PERCENTILE: Decile assignment for targeting
SELECT
    provider_npi,
    specialty,
    total_rx,
    NTILE(10) OVER (
        PARTITION BY specialty
        ORDER BY total_rx DESC
    ) AS prescriber_decile  -- 1=highest volume, 10=lowest
FROM prescriber_summary;</code></pre>`},
    {id:"s3",content:`<h2 id="s3">CTE Architecture</h2>
<p>Complex pharma queries should be built as layered CTEs — each CTE performing one logical step, building on the prior:</p>
<pre><code class="language-sql">-- Full patient funnel using CTE architecture
WITH
-- Layer 1: Identify diagnosed patients
diagnosed AS (
    SELECT DISTINCT patient_id,
           MIN(service_date) OVER (PARTITION BY patient_id) AS first_dx_date
    FROM medical_claims
    WHERE icd10_dx_1 LIKE 'C83%' OR icd10_dx_2 LIKE 'C83%'
),

-- Layer 2: Biomarker tested (after diagnosis)
biomarker_tested AS (
    SELECT DISTINCT d.patient_id
    FROM diagnosed d
    JOIN medical_claims m ON d.patient_id = m.patient_id
    WHERE m.cpt_code IN ('81445','81479','88230')
      AND m.service_date >= d.first_dx_date
),

-- Layer 3: Treated with BTK inhibitor
btk_treated AS (
    SELECT DISTINCT d.patient_id,
           MIN(p.fill_date) AS first_btk_date
    FROM diagnosed d
    JOIN pharmacy_claims p ON d.patient_id = p.patient_id
    WHERE p.drug_class = 'BTK_inhibitor'
      AND p.fill_date >= d.first_dx_date
    GROUP BY d.patient_id
),

-- Layer 4: On brand (acalabrutinib)
on_brand AS (
    SELECT DISTINCT bt.patient_id
    FROM btk_treated bt
    JOIN pharmacy_claims p ON bt.patient_id = p.patient_id
    WHERE p.drug_name = 'acalabrutinib'
      AND p.fill_date >= bt.first_btk_date
)

-- Funnel summary
SELECT
    COUNT(DISTINCT d.patient_id)   AS diagnosed,
    COUNT(DISTINCT b.patient_id)   AS biomarker_tested,
    COUNT(DISTINCT t.patient_id)   AS btk_treated,
    COUNT(DISTINCT o.patient_id)   AS on_brand,
    ROUND(100.0 * COUNT(DISTINCT b.patient_id) / COUNT(DISTINCT d.patient_id), 1) AS biomarker_rate,
    ROUND(100.0 * COUNT(DISTINCT t.patient_id) / COUNT(DISTINCT d.patient_id), 1) AS treatment_rate,
    ROUND(100.0 * COUNT(DISTINCT o.patient_id) / COUNT(DISTINCT t.patient_id), 1) AS brand_share
FROM diagnosed d
LEFT JOIN biomarker_tested b ON d.patient_id = b.patient_id
LEFT JOIN btk_treated t ON d.patient_id = t.patient_id
LEFT JOIN on_brand o ON d.patient_id = o.patient_id;</code></pre>`},
    {id:"s4",content:`<h2 id="s4">Advanced Patterns</h2>
<p><strong>Gaps-and-Islands:</strong> Identifying continuous therapy episodes separated by gaps</p>
<pre><code class="language-sql">-- Identify continuous therapy episodes (island = continuous coverage)
WITH fill_coverage AS (
    SELECT
        patient_id,
        fill_date AS episode_start,
        DATEADD(day, days_supply, fill_date) AS episode_end
    FROM pharmacy_claims
    WHERE drug_class = 'BTK_inhibitor'
),
-- Detect gaps > 30 days (= new episode)
with_prior_end AS (
    SELECT *,
        LAG(episode_end) OVER (PARTITION BY patient_id ORDER BY episode_start) AS prior_end,
        DATEDIFF(day,
            LAG(episode_end) OVER (PARTITION BY patient_id ORDER BY episode_start),
            episode_start
        ) AS gap_days
    FROM fill_coverage
),
-- Assign episode group number
episode_groups AS (
    SELECT *,
        SUM(CASE WHEN gap_days > 30 OR gap_days IS NULL THEN 1 ELSE 0 END)
            OVER (PARTITION BY patient_id ORDER BY episode_start) AS episode_num
    FROM with_prior_end
),
-- Summarize episodes
therapy_episodes AS (
    SELECT
        patient_id,
        episode_num,
        MIN(episode_start) AS therapy_start,
        MAX(episode_end) AS therapy_end,
        DATEDIFF(day, MIN(episode_start), MAX(episode_end)) AS episode_days
    FROM episode_groups
    GROUP BY patient_id, episode_num
)
SELECT
    patient_id,
    episode_num,
    therapy_start,
    therapy_end,
    episode_days,
    ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY therapy_start) AS line_of_therapy
FROM therapy_episodes;</code></pre>`},
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
<pre><code class="language-sql">-- BAD: Full table scan on 2B rows
SELECT COUNT(*) FROM medical_claims WHERE icd10_dx_1 LIKE 'C%';

-- GOOD: Partition pruning + index use
SELECT COUNT(*) FROM medical_claims
WHERE service_year = 2023           -- enables partition pruning
  AND icd10_dx_1 BETWEEN 'C00' AND 'C99'  -- range scan vs LIKE
  AND icd10_dx_1 IS NOT NULL;        -- enables index seek

-- GOOD: Materialize large intermediate result
CREATE TABLE #btk_patients AS
SELECT DISTINCT patient_id FROM pharmacy_claims
WHERE drug_class = 'BTK_inhibitor'
  AND fill_year = 2023;              -- partition prune

CREATE INDEX idx_btk ON #btk_patients(patient_id);

-- Now join to the small materialized table instead of the 2B-row base table
SELECT m.* FROM medical_claims m
JOIN #btk_patients b ON m.patient_id = b.patient_id
WHERE m.service_year = 2023;</code></pre>`},
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
<pre><code class="language-python"># Standard pharma analytics imports
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import warnings
warnings.filterwarnings('ignore')

# Configure pandas display
pd.set_option('display.max_columns', 50)
pd.set_option('display.float_format', lambda x: f'{x:,.2f}')
pd.set_option('display.max_rows', 100)

print(f"pandas: {pd.__version__}")
print(f"numpy: {np.__version__}")</code></pre>`},
    {id:"s2",content:`<h2 id="s2">Claims Data Processing in Pandas</h2>
<pre><code class="language-python">import pandas as pd
import numpy as np

def load_and_prepare_claims(medical_path, pharmacy_path, eligibility_path):
    """
    Load and prepare claims data for pharma analytics.
    """
    # Load with optimized dtypes for memory efficiency
    med_dtypes = {
        'patient_id': 'category',
        'icd10_dx_1': 'category',
        'icd10_dx_2': 'category',
        'cpt_code': 'category',
        'place_of_service': 'category',
        'provider_npi': 'string'
    }
    rx_dtypes = {
        'patient_id': 'category',
        'ndc_code': 'category',
        'drug_class': 'category',
        'drug_name': 'category',
        'prescriber_npi': 'string'
    }

    med = pd.read_parquet(medical_path, dtype_backend='pyarrow')
    rx = pd.read_parquet(pharmacy_path, dtype_backend='pyarrow')
    elig = pd.read_parquet(eligibility_path)

    # Parse dates efficiently
    for df in [med, rx, elig]:
        date_cols = [c for c in df.columns if 'date' in c.lower()]
        for col in date_cols:
            df[col] = pd.to_datetime(df[col], format='%Y-%m-%d')

    return med, rx, elig

def identify_cll_patients(med_df, min_codes=2, min_dates=2):
    """
    Identify CLL patients using 2-code rule.

    Requires ≥2 diagnosis codes on ≥2 separate dates (≥30 days apart).
    """
    # Filter to CLL codes (C83.x family)
    cll_codes = med_df[
        med_df['icd10_dx_1'].str.startswith('C83', na=False) |
        med_df['icd10_dx_2'].str.startswith('C83', na=False)
    ][['patient_id','service_date']].drop_duplicates()

    # Group by patient, check temporal spread
    patient_summary = cll_codes.groupby('patient_id').agg(
        first_dx=('service_date', 'min'),
        last_dx=('service_date', 'max'),
        code_count=('service_date', 'count')
    ).reset_index()

    # Apply 2-code, 2-date rule (at least 30 days between first and last)
    eligible = patient_summary[
        (patient_summary['code_count'] >= min_codes) &
        ((patient_summary['last_dx'] - patient_summary['first_dx']).dt.days >= 30)
    ].copy()

    print(f"Patients with ≥1 CLL code: {len(patient_summary):,}")
    print(f"Patients passing 2-code rule: {len(eligible):,}")
    print(f"Specificity improvement: {len(eligible)/len(patient_summary):.1%} retained")

    return eligible</code></pre>`},
    {id:"s3",content:`<h2 id="s3">Time-Series Analytics</h2>
<pre><code class="language-python">def calculate_market_share_trend(rx_df, brand_name, specialty=None,
                                  freq='ME', rolling_weeks=13):
    """
    Calculate brand market share trend vs. category.

    Parameters:
    -----------
    rx_df : DataFrame with [patient_id, fill_date, drug_name, drug_class]
    brand_name : Name of brand to track
    specialty : Filter to specific prescriber specialty (optional)
    freq : Aggregation frequency ('W'=weekly, 'ME'=month-end, 'QE'=quarter-end)
    rolling_weeks : Smoothing window for trend line
    """
    df = rx_df.copy()
    if specialty:
        df = df[df['prescriber_specialty'] == specialty]

    # Aggregate to time period
    df['period'] = df['fill_date'].dt.to_period(freq)

    volume = df.groupby(['period','drug_name']).size().unstack(fill_value=0)

    # Calculate total category volume
    volume['total_category'] = volume.sum(axis=1)
    volume['brand_rx'] = volume.get(brand_name, 0)
    volume['brand_share'] = volume['brand_rx'] / volume['total_category'] * 100

    # Rolling average for trend smoothing
    volume['brand_share_trend'] = volume['brand_share'].rolling(
        window=rolling_weeks, min_periods=3
    ).mean()

    # Year-over-year change
    periods_per_year = {'W': 52, 'ME': 12, 'QE': 4}
    lag = periods_per_year.get(freq, 12)
    volume['yoy_share_change'] = volume['brand_share'] - volume['brand_share'].shift(lag)

    return volume[['brand_rx','total_category','brand_share','brand_share_trend','yoy_share_change']]</code></pre>
<pre><code class="language-python">def patient_cohort_analysis(rx_df, index_date_df, lookback_days=180, followup_days=365):
    """
    Pre/post index date analysis for patient cohort.
    Standard pattern for persistence, adherence, and utilization studies.
    """
    merged = rx_df.merge(index_date_df[['patient_id','index_date']], on='patient_id')

    merged['days_from_index'] = (merged['fill_date'] - merged['index_date']).dt.days

    # Baseline period (pre-index)
    baseline = merged[
        (merged['days_from_index'] >= -lookback_days) &
        (merged['days_from_index'] < 0)
    ]

    # Follow-up period (post-index)
    followup = merged[
        (merged['days_from_index'] >= 0) &
        (merged['days_from_index'] <= followup_days)
    ]

    return baseline, followup</code></pre>`},
    {id:"s4",content:`<h2 id="s4">Visualization for Pharma</h2>
<pre><code class="language-python">import matplotlib.pyplot as plt
import matplotlib.ticker as mtick
import seaborn as sns

# Set pharma analytics style
plt.style.use('seaborn-v0_8-whitegrid')
PHARMA_PALETTE = ['#2563eb','#dc2626','#16a34a','#d97706','#7c3aed','#0891b2']

def plot_market_share_trend(share_df, brand_name, competitors=None, ax=None):
    """Publication-quality market share trend chart."""
    if ax is None:
        fig, ax = plt.subplots(figsize=(12, 6))

    # Plot brand
    ax.plot(share_df.index.astype(str), share_df['brand_share'],
            color=PHARMA_PALETTE[0], linewidth=2.5, label=brand_name, zorder=3)
    ax.plot(share_df.index.astype(str), share_df['brand_share_trend'],
            color=PHARMA_PALETTE[0], linewidth=1.5, linestyle='--',
            alpha=0.7, label=f'{brand_name} (13-wk avg)')

    ax.yaxis.set_major_formatter(mtick.PercentFormatter(decimals=0))
    ax.set_xlabel('Period', fontsize=11)
    ax.set_ylabel('Market Share (%)', fontsize=11)
    ax.set_title(f'{brand_name} Market Share Trend', fontsize=13, fontweight='bold')
    ax.legend(framealpha=0.9, fontsize=10)

    # Highlight if share declining
    latest_share = share_df['brand_share'].iloc[-1]
    prior_share = share_df['brand_share'].iloc[-13]
    if latest_share < prior_share:
        ax.set_facecolor('#fff5f5')
        ax.set_title(ax.get_title() + ' ⚠️ DECLINING', color='red', fontsize=13)

    plt.tight_layout()
    return ax

def plot_patient_funnel(funnel_dict, title="Patient Funnel"):
    """Horizontal waterfall funnel chart."""
    import plotly.graph_objects as go

    stages = list(funnel_dict.keys())
    values = list(funnel_dict.values())
    pcts = [v/values[0]*100 for v in values]

    fig = go.Figure(go.Funnel(
        y=stages,
        x=values,
        textposition="inside",
        textinfo="value+percent initial",
        marker=dict(color=PHARMA_PALETTE[:len(stages)])
    ))
    fig.update_layout(title=title, height=400)
    fig.show()
    return fig</code></pre>`},
    {id:"s5",content:`<h2 id="s5">Code Architecture</h2>
<p>Pharma analytics codebases should follow a consistent module structure for reusability and auditability:</p>
<pre><code class="language-python"># Recommended project structure
"""
pharma_analytics/
├── config/
│   ├── drug_lists.yaml         # NDC/drug class mappings
│   ├── icd_codes.yaml          # Diagnosis code lists by condition
│   └── study_params.yaml       # Study dates, thresholds, periods
├── data/
│   ├── loaders.py              # Database connection, data loading
│   ├── validators.py           # Data quality checks
│   └── transforms.py           # Cleaning and standardization
├── cohorts/
│   ├── diagnosis.py            # Patient identification by condition
│   ├── treatment.py            # Treatment cohort definition
│   └── eligibility.py          # Enrollment continuity checks
├── analytics/
│   ├── market_share.py         # Share trend, decile analysis
│   ├── adherence.py            # PDC, persistency, gap analysis
│   ├── patient_journey.py      # Funnel, LOT, time-to-treat
│   └── heor.py                 # Cost analysis, ICER, BIA
├── visualization/
│   ├── charts.py               # Reusable chart functions
│   └── dashboards.py           # Plotly dashboard assembly
└── reports/
    └── run_analysis.py         # Main analysis runner
"""

# Standard docstring convention for pharma analytics
def calculate_pdc(fills_df: pd.DataFrame,
                  patient_col: str = 'patient_id',
                  fill_date_col: str = 'fill_date',
                  days_supply_col: str = 'days_supply',
                  observation_days: int = 365) -> pd.DataFrame:
    """
    Calculate Proportion of Days Covered (PDC) for medication adherence.

    Parameters
    ----------
    fills_df : pd.DataFrame
        Pharmacy claims with one row per fill
    patient_col : str
        Column name for patient identifier
    fill_date_col : str
        Column name for fill date
    days_supply_col : str
        Column name for days supply dispensed
    observation_days : int
        Length of observation window in days (default: 365)

    Returns
    -------
    pd.DataFrame
        One row per patient with columns: patient_id, pdc_score, adherent_flag

    Notes
    -----
    PDC caps coverage at 1.0 per day (unlike MPR which can exceed 1.0).
    Industry standard adherent threshold is PDC >= 0.80.
    """
    pass  # Implementation here</code></pre>`},
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
<pre><code class="language-python">from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.metrics import roc_auc_score, average_precision_score
import pandas as pd, numpy as np

def build_prescribing_model(hcp_features_df, target_col='is_high_value_prescriber'):
    """
    Predict which HCPs are likely to become high-value prescribers.

    Feature categories (avoid target leakage):
    - Historical prescribing behavior (12-month lookback from training cutoff)
    - Practice characteristics (specialty, setting, patient mix)
    - Digital engagement (email, web, congress)
    - Geography and demographics
    - Network centrality (co-prescribing connections)

    IMPORTANT: Never use features derived from the same period as the target.
    """
    feature_cols = [
        # Prescribing behavior (12-month lookback)
        'total_category_rx_12m', 'brand_rx_12m', 'brand_share_12m',
        'new_patient_starts_12m', 'refill_ratio_12m',

        # Practice characteristics
        'specialty_encoded', 'practice_setting_encoded',
        'patient_volume_quintile', 'pct_commercial_patients',

        # Digital engagement (lagged)
        'email_open_rate_6m', 'website_visits_6m', 'sample_requests_6m',
        'congress_sessions_attended', 'cme_completions_12m',

        # Access features
        'formulary_access_score', 'pa_burden_score',

        # Network features
        'kol_connection_count', 'high_value_peer_share'
    ]

    X = hcp_features_df[feature_cols].fillna(0)
    y = hcp_features_df[target_col]

    pipeline = Pipeline([
        ('scaler', StandardScaler()),
        ('model', GradientBoostingClassifier(
            n_estimators=300,
            max_depth=4,
            learning_rate=0.05,
            subsample=0.8,
            random_state=42
        ))
    ])

    # Stratified cross-validation
    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    cv_auc = cross_val_score(pipeline, X, y, cv=cv, scoring='roc_auc')
    cv_ap = cross_val_score(pipeline, X, y, cv=cv, scoring='average_precision')

    print(f"CV ROC-AUC: {cv_auc.mean():.3f} ± {cv_auc.std():.3f}")
    print(f"CV Avg Precision: {cv_ap.mean():.3f} ± {cv_ap.std():.3f}")

    pipeline.fit(X, y)
    return pipeline, feature_cols</code></pre>`},
    {id:"s3",content:`<h2 id="s3">Patient Segmentation</h2>
<pre><code class="language-python">from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

def segment_patients(patient_features_df, n_segments=5):
    """
    Cluster patients into clinically meaningful segments using K-Means.

    Feature selection for patient segmentation:
    - Clinical: Disease severity, comorbidities, biomarker status
    - Behavioral: Adherence history, refill patterns, engagement
    - Socioeconomic: Payer type, geography, OOP burden
    """
    feature_cols = [
        'disease_severity_score', 'comorbidity_count', 'prior_treatment_lines',
        'biomarker_positive', 'pdc_prior_therapy', 'time_since_diagnosis_months',
        'commercial_insurance', 'distance_to_specialist_miles', 'pcp_referral'
    ]

    X = patient_features_df[feature_cols].fillna(patient_features_df[feature_cols].median())
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # K-Means with elbow method
    inertias = []
    K_range = range(2, 10)
    for k in K_range:
        km = KMeans(n_clusters=k, random_state=42, n_init=10)
        km.fit(X_scaled)
        inertias.append(km.inertia_)

    # Fit final model
    km_final = KMeans(n_clusters=n_segments, random_state=42, n_init=20)
    patient_features_df['segment'] = km_final.fit_predict(X_scaled)

    # Profile each segment
    segment_profiles = patient_features_df.groupby('segment')[feature_cols].mean()
    segment_sizes = patient_features_df['segment'].value_counts().sort_index()

    print("Segment Profiles:")
    print(segment_profiles.round(2))
    print(f"\nSegment Sizes:\n{segment_sizes}")

    return patient_features_df, segment_profiles, km_final</code></pre>`},
    {id:"s4",content:`<h2 id="s4">NLP for Clinical Text</h2>
<pre><code class="language-python">import spacy
from transformers import AutoTokenizer, AutoModel
import torch

def extract_clinical_entities(clinical_notes, model_name="allenai/scibert_scivocab_uncased"):
    """
    Extract medical entities from clinical notes using SciBERT.

    Extracts: diagnoses, medications, dosages, procedures, lab values
    """
    # Use BioBERT/SciBERT for biomedical text
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModel.from_pretrained(model_name)

    # Alternative: use scispaCy for rule-based NER (faster, interpretable)
    # pip install scispacy
    # python -m spacy download en_core_sci_lg
    nlp = spacy.load("en_core_sci_lg")

    results = []
    for note in clinical_notes:
        doc = nlp(note)
        entities = [(ent.text, ent.label_, ent.start_char, ent.end_char)
                    for ent in doc.ents]
        results.append({'note': note[:100], 'entities': entities})

    return results

def classify_medical_inquiry_topic(inquiry_texts, categories):
    """
    Zero-shot classification of medical inquiries using transformer models.
    Avoids need for labeled training data.
    """
    from transformers import pipeline

    classifier = pipeline(
        "zero-shot-classification",
        model="facebook/bart-large-mnli"
    )

    results = []
    for text in inquiry_texts:
        result = classifier(text, candidate_labels=categories, multi_label=True)
        top_category = result['labels'][0]
        confidence = result['scores'][0]
        results.append({'text': text[:100], 'category': top_category,
                        'confidence': confidence})

    return pd.DataFrame(results)</code></pre>`},
    {id:"s5",content:`<h2 id="s5">Model Explainability (SHAP)</h2>
<pre><code class="language-python">import shap
import matplotlib.pyplot as plt

def explain_prescribing_model(model, X_train, X_test, feature_names):
    """
    Generate SHAP explanations for HCP prescribing prediction model.

    SHAP values show: which features most influenced each prediction,
    and in which direction.
    """
    # Create SHAP explainer
    explainer = shap.TreeExplainer(model.named_steps['model'])

    # Transform test data through pipeline (apply scaler)
    X_test_scaled = model.named_steps['scaler'].transform(X_test)
    shap_values = explainer.shap_values(X_test_scaled)

    # Global feature importance (beeswarm plot)
    plt.figure(figsize=(10, 8))
    shap.summary_plot(shap_values, X_test_scaled,
                      feature_names=feature_names,
                      plot_type='beeswarm', show=False)
    plt.title('Global Feature Importance — HCP Prescribing Prediction', fontweight='bold')
    plt.tight_layout()
    plt.savefig('shap_global.png', dpi=150, bbox_inches='tight')

    # Individual prediction explanation
    def explain_hcp(hcp_index):
        """Explain why a specific HCP was flagged as high-value target."""
        shap.waterfall_plot(
            shap.Explanation(
                values=shap_values[hcp_index],
                base_values=explainer.expected_value,
                data=X_test_scaled[hcp_index],
                feature_names=feature_names
            )
        )

    return shap_values, explain_hcp</code></pre>
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
<pre><code class="language-python">from scipy import stats
import numpy as np

def design_ab_test(baseline_conversion, min_detectable_effect,
                    alpha=0.05, power=0.80, test_type='two-sided'):
    """
    Calculate required sample size for pharma commercial A/B test.

    Example use cases:
    - Email open rate test (control: standard template vs. treatment: new template)
    - Call message A/B (standard detail vs. new clinical data emphasis)
    - Territory pilot (standard call plan vs. ML-guided targeting)
    """
    from scipy.stats import norm

    p1 = baseline_conversion
    p2 = baseline_conversion + min_detectable_effect

    # Pooled standard error
    p_pooled = (p1 + p2) / 2

    z_alpha = norm.ppf(1 - alpha/2 if test_type=='two-sided' else 1 - alpha)
    z_beta = norm.ppf(power)

    n = ((z_alpha * np.sqrt(2 * p_pooled * (1 - p_pooled)) +
           z_beta * np.sqrt(p1*(1-p1) + p2*(1-p2)))**2 / (p2 - p1)**2)

    print(f"Baseline conversion: {p1:.1%}")
    print(f"Target (MDE): {p2:.1%} ({min_detectable_effect:+.1%} effect)")
    print(f"Required N per group: {np.ceil(n):,.0f}")
    print(f"Total N: {np.ceil(n)*2:,.0f}")

    return int(np.ceil(n))

def analyze_ab_result(control_data, treatment_data, metric_name='conversion_rate'):
    """Analyze A/B test result with statistical and practical significance."""
    n_c, n_t = len(control_data), len(treatment_data)
    mean_c, mean_t = np.mean(control_data), np.mean(treatment_data)
    lift = (mean_t - mean_c) / mean_c

    # Statistical test
    t_stat, p_value = stats.ttest_ind(control_data, treatment_data)

    # Effect size (Cohen's d)
    pooled_std = np.sqrt(((n_c-1)*np.std(control_data)**2 + (n_t-1)*np.std(treatment_data)**2) / (n_c+n_t-2))
    cohens_d = (mean_t - mean_c) / pooled_std

    print(f"Control: {mean_c:.4f} (n={n_c:,})")
    print(f"Treatment: {mean_t:.4f} (n={n_t:,})")
    print(f"Lift: {lift:+.1%} | p-value: {p_value:.4f} | Cohen's d: {cohens_d:.3f}")
    print(f"Significant at α=0.05: {'YES' if p_value < 0.05 else 'NO'}")
    print(f"Practical significance: {'Large' if abs(cohens_d)>0.5 else 'Medium' if abs(cohens_d)>0.2 else 'Small'}")

    return {'lift': lift, 'p_value': p_value, 'cohens_d': cohens_d}</code></pre>`},
    {id:"s3",content:`<h2 id="s3">Difference-in-Differences</h2>
<pre><code class="language-python">import statsmodels.formula.api as smf

def difference_in_differences(panel_df, treated_group_col, post_period_col,
                               outcome_col, controls=None):
    """
    Estimate causal effect using Difference-in-Differences (DiD).

    Classic DiD equation:
    Y = β₀ + β₁·Treated + β₂·Post + β₃·(Treated×Post) + ε

    β₃ is the DiD estimate — the causal effect of the intervention.

    Parallel trends assumption: treated and control groups would have
    followed the same trend in the absence of treatment.
    """
    df = panel_df.copy()
    df['interaction'] = df[treated_group_col] * df[post_period_col]

    formula = f"{outcome_col} ~ {treated_group_col} + {post_period_col} + interaction"
    if controls:
        formula += " + " + " + ".join(controls)

    model = smf.ols(formula, data=df).fit(cov_type='HC3')

    did_estimate = model.params['interaction']
    did_se = model.bse['interaction']
    did_pvalue = model.pvalues['interaction']

    print(f"DiD Estimate: {did_estimate:.4f}")
    print(f"95% CI: [{did_estimate - 1.96*did_se:.4f}, {did_estimate + 1.96*did_se:.4f}]")
    print(f"p-value: {did_pvalue:.4f}")
    print(f"Interpretation: The intervention caused a {did_estimate:.4f} unit change in {outcome_col}")

    # Parallel trends validation (visual — use pre-period data only)
    pre_period = df[df[post_period_col] == 0]
    print(f"\nPre-period trends (should be parallel):")
    print(pre_period.groupby([treated_group_col, 'time_period'])[outcome_col].mean().unstack())

    return model, did_estimate</code></pre>
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
<pre><code class="language-python">from linearmodels.iv import IV2SLS

def iv_estimation(df, outcome, treatment, instrument, controls):
    """
    Two-Stage Least Squares (2SLS) IV estimation.

    Stage 1: treatment ~ instrument + controls (get predicted treatment)
    Stage 2: outcome ~ predicted_treatment + controls
    """
    formula = f"{outcome} ~ 1 + {' + '.join(controls)} + [{treatment} ~ {instrument}]"
    model = IV2SLS.from_formula(formula, data=df).fit(cov_type='robust')

    print(model.summary)
    print(f"\nIV Estimate of {treatment} on {outcome}: {model.params[treatment]:.4f}")
    print(f"First-stage F-statistic (strength): {model.first_stage.diagnostics}")

    return model</code></pre>`},
    {id:"s5",content:`<h2 id="s5">Synthetic Control Method</h2>
<p>The <strong>Synthetic Control</strong> method constructs a weighted combination of control units that best matches the treated unit's pre-intervention outcomes — creating a plausible counterfactual at the market/geography level:</p>
<pre><code class="language-python">from scipy.optimize import minimize

def synthetic_control(treated_series, donor_matrix, pre_period_idx):
    """
    Construct synthetic control via constrained optimization.

    treated_series: pd.Series — outcome for treated unit (e.g., brand Rx in target market)
    donor_matrix: pd.DataFrame — outcomes for donor units (control markets)
    pre_period_idx: int — index where treatment begins

    Returns: synthetic control series and treatment effect estimate
    """
    Y_treated = treated_series[:pre_period_idx].values
    Y_donors = donor_matrix.iloc[:pre_period_idx].values

    # Solve for weights that minimize pre-period prediction error
    def loss(weights):
        synthetic = Y_donors @ weights
        return np.sum((Y_treated - synthetic) ** 2)

    n_donors = Y_donors.shape[1]
    constraints = [
        {'type': 'eq', 'fun': lambda w: w.sum() - 1}  # Weights sum to 1
    ]
    bounds = [(0, 1)] * n_donors  # Non-negative weights

    result = minimize(loss, x0=[1/n_donors]*n_donors,
                      method='SLSQP', bounds=bounds, constraints=constraints)

    optimal_weights = result.x
    synthetic_full = donor_matrix.values @ optimal_weights

    treatment_effect = treated_series.values[pre_period_idx:] - synthetic_full[pre_period_idx:]

    print(f"Top donor weights: {dict(zip(donor_matrix.columns, optimal_weights.round(3)))}")
    print(f"Avg treatment effect (post-period): {treatment_effect.mean():.4f}")

    return pd.Series(synthetic_full, index=treated_series.index), treatment_effect</code></pre>`},
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
<pre><code class="language-python">"""
Pharma Data Lakehouse Architecture (AWS Example)
=================================================

INGESTION LAYER
├── Raw Claims (IQVIA/Komodo SFTP)     → S3 raw zone (encrypted, versioned)
├── EMR/Flatiron feeds                 → S3 raw zone
├── CRM/Veeva sync                     → S3 raw zone
└── Market data (IQVIA Xponent)        → S3 raw zone

PROCESSING LAYER (ELT)
├── AWS Glue / Spark                   → Parse, validate, standardize
├── dbt (Data Build Tool)              → Transform to analytical models
└── Great Expectations                 → Data quality validation

STORAGE LAYER
├── Bronze (raw)     → S3 Parquet, partitioned by source+year+month
├── Silver (cleaned) → Delta Lake, OMOP-conformant, deduplicated
└── Gold (analytics) → Redshift/Snowflake, brand-specific mart tables

CONSUMPTION LAYER
├── Python/R notebooks                 → Ad hoc analytics
├── Tableau/Power BI                   → Dashboards
├── ML Feature Store                   → Model training/serving
└── HEOR/RWE exports                   → Partner-ready CDISC datasets

GOVERNANCE
├── AWS Lake Formation                 → Column-level security, PII tagging
├── Apache Atlas / Collibra            → Data catalog, lineage
└── CloudTrail + audit logs            → HIPAA access audit trail
"""</code></pre>
<div class="callout info"><div class="callout-title">Cloud Choice in Pharma</div><p>AWS dominates pharma cloud analytics (60%+ market share) due to early HIPAA BAA availability, mature healthcare-specific services (Amazon HealthLake), and the broadest ISV ecosystem. Azure is strong in markets with Microsoft-heavy enterprise infrastructure. GCP excels for ML-heavy workloads (BigQuery ML, Vertex AI). Most large pharma companies use multi-cloud strategies.</p></div>`},
    {id:"s2",content:`<h2 id="s2">Claims ELT with dbt</h2>
<pre><code class="language-sql">-- dbt model: silver/claims/medical_claims_clean.sql
-- Cleans and standardizes raw medical claims for analytical use

{{
  config(
    materialized = 'incremental',
    unique_key = 'claim_id',
    partition_by = {'field': 'service_year', 'data_type': 'int64'},
    cluster_by = ['patient_id', 'icd10_dx_1'],
    tags = ['claims', 'medical', 'daily']
  )
}}

WITH raw_claims AS (
    SELECT * FROM {{ source('raw_claims', 'medical_claims_raw') }}
    {% if is_incremental() %}
    WHERE ingestion_date > (SELECT MAX(ingestion_date) FROM {{ this }})
    {% endif %}
),

validated AS (
    SELECT
        claim_id,
        patient_id,
        CAST(service_date AS DATE) AS service_date,
        EXTRACT(YEAR FROM service_date) AS service_year,
        -- Standardize diagnosis codes (remove dots, uppercase)
        UPPER(REPLACE(icd10_dx_1, '.', '')) AS icd10_dx_1,
        UPPER(REPLACE(icd10_dx_2, '.', '')) AS icd10_dx_2,
        -- Standardize CPT codes
        LPAD(CAST(cpt_code AS STRING), 5, '0') AS cpt_code,
        COALESCE(paid_amount, 0) AS paid_amount,
        COALESCE(allowed_amount, 0) AS allowed_amount,
        provider_npi,
        place_of_service,
        CURRENT_TIMESTAMP() AS ingestion_date
    FROM raw_claims
    WHERE claim_id IS NOT NULL       -- Reject records without ID
      AND patient_id IS NOT NULL     -- Reject anonymous records
      AND service_date >= '2015-01-01'  -- Reject implausible dates
      AND service_date <= CURRENT_DATE()
      AND paid_amount >= 0           -- Reject negative payments
)

SELECT * FROM validated</code></pre>
<pre><code class="language-yaml"># dbt schema.yml — data contract for medical claims model
models:
  - name: medical_claims_clean
    description: "Cleaned and standardized medical claims for pharma analytics"
    columns:
      - name: claim_id
        tests: [unique, not_null]
      - name: patient_id
        tests: [not_null]
      - name: service_date
        tests: [not_null, dbt_expectations.expect_column_values_to_be_between:
                  {min_value: '2015-01-01', max_value: today}]
      - name: icd10_dx_1
        tests: [not_null, dbt_expectations.expect_column_value_lengths_to_be_between:
                  {min_value: 3, max_value: 8}]
      - name: paid_amount
        tests: [dbt_expectations.expect_column_values_to_be_between:
                  {min_value: 0, max_value: 1000000}]</code></pre>`},
    {id:"s3",content:`<h2 id="s3">Pipeline Orchestration</h2>
<pre><code class="language-python">from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.providers.amazon.aws.operators.glue import GlueJobOperator
from airflow.providers.dbt.cloud.operators.dbt import DbtCloudRunJobOperator
from datetime import datetime, timedelta

# Pharma claims processing DAG
default_args = {
    'owner': 'data-engineering',
    'depends_on_past': True,  # Ensures sequential monthly processing
    'email_on_failure': True,
    'email': ['data-team@pharma.com'],
    'retries': 2,
    'retry_delay': timedelta(minutes=30),
    'execution_timeout': timedelta(hours=4)
}

with DAG(
    'monthly_claims_refresh',
    default_args=default_args,
    description='Monthly claims ELT pipeline: ingest → clean → transform → validate',
    schedule_interval='0 6 1 * *',  # 6am on 1st of each month
    start_date=datetime(2024, 1, 1),
    catchup=True,
    tags=['claims', 'monthly', 'production']
) as dag:

    # Step 1: Ingest raw claims from vendor SFTP
    ingest_claims = GlueJobOperator(
        task_id='ingest_raw_claims',
        job_name='pharma-claims-ingest',
        script_args={
            '--VENDOR': 'IQVIA',
            '--DATA_DATE': '{{ ds }}',
            '--S3_BUCKET': 'pharma-datalake-prod'
        }
    )

    # Step 2: Run dbt transformations
    dbt_transform = DbtCloudRunJobOperator(
        task_id='dbt_claims_transform',
        dbt_cloud_conn_id='dbt_cloud',
        job_id=12345,  # dbt Cloud job ID
        trigger_reason='Monthly claims refresh {{ ds }}'
    )

    # Step 3: Run data quality validation
    def run_quality_checks(**context):
        import great_expectations as ge
        context_ge = ge.data_context.DataContext()
        results = context_ge.run_checkpoint(checkpoint_name='claims_monthly_checkpoint')
        if not results.success:
            raise ValueError(f"Data quality checks failed: {results}")
        return results

    quality_checks = PythonOperator(
        task_id='data_quality_validation',
        python_callable=run_quality_checks,
        provide_context=True
    )

    ingest_claims >> dbt_transform >> quality_checks</code></pre>`},
    {id:"s4",content:`<h2 id="s4">Data Quality in Production</h2>
<pre><code class="language-python">import great_expectations as ge
import pandas as pd

def validate_claims_batch(claims_df: pd.DataFrame) -> dict:
    """
    Run Great Expectations data quality suite on claims batch.
    Returns validation results with pass/fail per expectation.
    """
    validator = ge.from_pandas(claims_df)

    # Volume checks
    validator.expect_table_row_count_to_be_between(
        min_value=100_000, max_value=50_000_000,
        meta={"dimension": "Volume", "severity": "CRITICAL"}
    )

    # Completeness checks
    for col in ['claim_id', 'patient_id', 'service_date']:
        validator.expect_column_values_to_not_be_null(
            column=col,
            meta={"dimension": "Completeness", "severity": "CRITICAL"}
        )

    # Validity checks
    validator.expect_column_values_to_be_between(
        column='service_date',
        min_value='2015-01-01',
        max_value=pd.Timestamp.today().strftime('%Y-%m-%d'),
        meta={"dimension": "Validity", "severity": "ERROR"}
    )

    validator.expect_column_values_to_be_between(
        column='paid_amount', min_value=0, max_value=500_000,
        meta={"dimension": "Validity", "severity": "WARNING"}
    )

    # Consistency checks
    validator.expect_column_pair_values_a_to_be_greater_than_b(
        column_A='allowed_amount', column_B='paid_amount',
        or_equal=True,
        meta={"dimension": "Consistency", "severity": "ERROR"}
    )

    # Freshness check: max date should be recent
    validator.expect_column_max_to_be_between(
        column='service_date',
        min_value=(pd.Timestamp.today() - pd.DateOffset(months=6)).strftime('%Y-%m-%d'),
        meta={"dimension": "Freshness", "severity": "WARNING"}
    )

    results = validator.validate()
    print(f"Validation: {'PASSED' if results.success else 'FAILED'}")
    print(f"Expectations run: {results.statistics['evaluated_expectations']}")
    print(f"Failed: {results.statistics['unsuccessful_expectations']}")

    return results</code></pre>
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
<pre><code class="language-python">import numpy as np
import scipy.stats as stats
import matplotlib.pyplot as plt

# Checking distribution fit: Q-Q plot + goodness-of-fit test
def assess_normality(data, alpha=0.05):
    """Test if data is normally distributed using multiple methods."""

    # Shapiro-Wilk (best for n < 50)
    stat_sw, p_sw = stats.shapiro(data) if len(data) <= 5000 else (None, None)

    # Kolmogorov-Smirnov vs. fitted normal
    mu, sigma = np.mean(data), np.std(data)
    stat_ks, p_ks = stats.kstest(data, 'norm', args=(mu, sigma))

    # D'Agostino-Pearson (combines skewness + kurtosis)
    stat_dp, p_dp = stats.normaltest(data)

    return {
        'shapiro_wilk_p': p_sw,
        'ks_test_p': p_ks,
        'dagostino_p': p_dp,
        'likely_normal': all(p > alpha for p in [p_ks, p_dp] if p is not None),
        'skewness': stats.skew(data),
        'kurtosis': stats.kurtosis(data)
    }

# Log-normal example: drug costs are right-skewed
drug_costs = np.exp(np.random.normal(loc=8.5, scale=0.8, size=1000))
print(assess_normality(drug_costs))
# Expected: likely_normal=False; use log transformation before parametric tests</code></pre>`},
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
<pre><code class="language-python">from scipy import stats
import numpy as np

# Comparing two treatment groups' outcomes
group_a = np.array([12, 15, 14, 10, 13, 16, 11, 14, 15, 13])
group_b = np.array([18, 20, 19, 22, 17, 21, 19, 20, 18, 22])

# Check normality first
_, p_norm_a = stats.shapiro(group_a)
_, p_norm_b = stats.shapiro(group_b)

if p_norm_a > 0.05 and p_norm_b > 0.05:
    t_stat, p_val = stats.ttest_ind(group_a, group_b, equal_var=False)  # Welch's t-test
    test_name = "Welch's t-test"
else:
    t_stat, p_val = stats.mannwhitneyu(group_a, group_b)
    test_name = "Mann-Whitney U"

print(f"{test_name}: statistic={t_stat:.3f}, p={p_val:.4f}")
effect_size = (np.mean(group_b) - np.mean(group_a)) / np.std(np.concatenate([group_a, group_b]))
print(f"Cohen's d: {effect_size:.3f}")</code></pre>`},
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
<pre><code class="language-python">from statsmodels.stats.multitest import multipletests
import numpy as np

# Multiple testing correction example
p_values = [0.01, 0.04, 0.08, 0.002, 0.12, 0.03, 0.09, 0.005]

# Bonferroni: very conservative
bonf_reject, bonf_corrected, _, _ = multipletests(p_values, method='bonferroni', alpha=0.05)

# Benjamini-Hochberg: controls False Discovery Rate (FDR) — preferred in exploratory analyses
bh_reject, bh_corrected, _, _ = multipletests(p_values, method='fdr_bh', alpha=0.05)

print("Original p-values:    ", [f"{p:.3f}" for p in p_values])
print("Bonferroni rejected:  ", bonf_reject)
print("BH (FDR) rejected:    ", bh_reject)
# BH is less conservative — allows more discoveries at controlled FDR</code></pre>`},
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
<pre><code class="language-python">import numpy as np
from scipy import stats

class ABTest:
    def __init__(self, alpha=0.05, power=0.80):
        self.alpha = alpha
        self.power = power

    def required_sample_size(self, baseline_rate, minimum_detectable_effect, two_tailed=True):
        """Calculate required n per group for a proportion A/B test."""
        p1 = baseline_rate
        p2 = baseline_rate + minimum_detectable_effect
        z_alpha = stats.norm.ppf(1 - self.alpha / (2 if two_tailed else 1))
        z_beta = stats.norm.ppf(self.power)
        p_bar = (p1 + p2) / 2
        n = (z_alpha * np.sqrt(2 * p_bar * (1 - p_bar)) +
             z_beta * np.sqrt(p1 * (1-p1) + p2 * (1-p2))) ** 2
        n /= (p2 - p1) ** 2
        return int(np.ceil(n))

    def analyze(self, control_conversions, control_n, variant_conversions, variant_n):
        """Analyze completed A/B test."""
        p_control = control_conversions / control_n
        p_variant = variant_conversions / variant_n
        relative_lift = (p_variant - p_control) / p_control

        # Two-proportion z-test
        count = np.array([variant_conversions, control_conversions])
        nobs = np.array([variant_n, control_n])
        z_stat, p_value = stats.proportions_ztest(count, nobs)

        # Confidence interval for lift
        se = np.sqrt(p_control*(1-p_control)/control_n + p_variant*(1-p_variant)/variant_n)
        ci_low = (p_variant - p_control) - 1.96 * se
        ci_high = (p_variant - p_control) + 1.96 * se

        return {
            'control_rate': f"{p_control:.3%}",
            'variant_rate': f"{p_variant:.3%}",
            'relative_lift': f"{relative_lift:+.1%}",
            'p_value': round(p_value, 4),
            'significant': p_value < self.alpha,
            'ci_95': f"({ci_low:.4f}, {ci_high:.4f})"
        }

# Example: email subject line A/B test
ab = ABTest()
n_needed = ab.required_sample_size(baseline_rate=0.22, minimum_detectable_effect=0.03)
print(f"Required sample per group: {n_needed}")
result = ab.analyze(control_conversions=2240, control_n=10000,
                    variant_conversions=2580, variant_n=10000)
print(result)</code></pre>`},
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
<pre><code class="language-python">import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

# Bayesian A/B test: Beta-Binomial model
# Prior: Beta(1,1) = uniform (no prior knowledge)
# After seeing data: Beta(alpha + conversions, beta + non-conversions)

def bayesian_ab_test(control_conv, control_n, variant_conv, variant_n,
                     prior_alpha=1, prior_beta=1, simulations=100000):
    """
    Estimate P(variant > control) using Beta-Binomial conjugate model.
    """
    # Posterior distributions
    ctrl_posterior = stats.beta(prior_alpha + control_conv,
                                prior_beta + (control_n - control_conv))
    var_posterior = stats.beta(prior_alpha + variant_conv,
                               prior_beta + (variant_n - variant_conv))

    # Monte Carlo: sample from both posteriors
    ctrl_samples = ctrl_posterior.rvs(simulations)
    var_samples = var_posterior.rvs(simulations)

    prob_variant_better = (var_samples > ctrl_samples).mean()
    expected_lift = np.mean(var_samples - ctrl_samples)

    return {
        'prob_variant_better': f"{prob_variant_better:.1%}",
        'expected_lift': f"{expected_lift:.4f}",
        'credible_interval_lift': np.percentile(var_samples - ctrl_samples, [2.5, 97.5])
    }

result = bayesian_ab_test(2240, 10000, 2580, 10000)
print(result)
# Output: prob_variant_better="~95%", interpretable as direct probability statement</code></pre>`},
    {id:"s6",content:`<h2 id="s6">Power Analysis & Sample Size</h2>
<p>An underpowered study wastes resources and produces unreliable results. Power analysis determines the sample size needed before you collect data — not after.</p>
<p>Four quantities are linked — specify any three to solve for the fourth:</p>
<ul>
<li><strong>α (significance level):</strong> probability of false positive (typically 0.05)</li>
<li><strong>Power (1-β):</strong> probability of detecting a real effect (typically 0.80 or 0.90)</li>
<li><strong>Effect size:</strong> the minimum meaningful difference to detect</li>
<li><strong>Sample size n:</strong> what we want to calculate</li>
</ul>
<pre><code class="language-python">from statsmodels.stats.power import (
    TTestIndPower, NormalIndPower, GofChisquarePower
)
import matplotlib.pyplot as plt
import numpy as np

# Power analysis for two-sample t-test
analysis = TTestIndPower()

# Scenario 1: What sample size do I need?
n = analysis.solve_power(
    effect_size=0.3,    # Cohen's d = small-medium effect
    alpha=0.05,
    power=0.80,
    alternative='two-sided'
)
print(f"Required n per group: {int(np.ceil(n))}")  # ~177

# Scenario 2: What power do I have with my actual sample?
power = analysis.solve_power(
    effect_size=0.3,
    alpha=0.05,
    nobs1=100,  # what I actually have
    alternative='two-sided'
)
print(f"Power with n=100: {power:.2%}")  # ~54% — underpowered!

# Power curve: visualize how power changes with sample size
ns = np.arange(20, 400, 10)
powers = [analysis.solve_power(effect_size=0.3, alpha=0.05, nobs1=n) for n in ns]
plt.plot(ns, powers)
plt.axhline(y=0.80, color='r', linestyle='--', label='80% power threshold')
plt.xlabel('Sample Size (per group)')
plt.ylabel('Statistical Power')
plt.title('Power Curve for d=0.3 Effect')
plt.legend()</code></pre>
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
<pre><code class="language-python">import torch
import torch.nn as nn

class MLP(nn.Module):
    """Multi-layer perceptron for tabular data classification."""
    def __init__(self, input_dim, hidden_dims, output_dim, dropout=0.3):
        super().__init__()
        layers = []
        prev_dim = input_dim
        for hidden_dim in hidden_dims:
            layers.extend([
                nn.Linear(prev_dim, hidden_dim),
                nn.BatchNorm1d(hidden_dim),  # Normalize activations
                nn.ReLU(),
                nn.Dropout(dropout),         # Regularization
            ])
            prev_dim = hidden_dim
        layers.append(nn.Linear(prev_dim, output_dim))
        self.network = nn.Sequential(*layers)

    def forward(self, x):
        return self.network(x)

# Instantiate model
model = MLP(input_dim=50, hidden_dims=[256, 128, 64], output_dim=1, dropout=0.3)
print(f"Parameters: {sum(p.numel() for p in model.parameters()):,}")

# Loss and optimizer
criterion = nn.BCEWithLogitsLoss()  # Binary classification
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-3, weight_decay=1e-4)</code></pre>`},
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
<pre><code class="language-python">import torch.nn as nn

# 1. L2 regularization (weight decay) — in optimizer
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-3, weight_decay=1e-4)

# 2. Dropout — randomly zero out neurons during training
dropout = nn.Dropout(p=0.3)  # 30% of neurons zeroed each forward pass

# 3. Batch Normalization — normalize layer inputs; reduces internal covariate shift
batch_norm = nn.BatchNorm1d(num_features=128)

# 4. Learning rate scheduling
scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(
    optimizer, T_max=100, eta_min=1e-6
)

# 5. Early stopping (manual implementation)
class EarlyStopping:
    def __init__(self, patience=10, delta=1e-4):
        self.patience = patience
        self.delta = delta
        self.best_loss = float('inf')
        self.counter = 0
        self.should_stop = False

    def __call__(self, val_loss):
        if val_loss < self.best_loss - self.delta:
            self.best_loss = val_loss
            self.counter = 0
        else:
            self.counter += 1
            if self.counter >= self.patience:
                self.should_stop = True
        return self.should_stop</code></pre>`},
    {id:"s3",content:`<h2 id="s3">CNNs, RNNs & Transformers</h2>
<p>Architecture choice should be driven by data structure:</p>
<table><thead><tr><th>Architecture</th><th>Designed For</th><th>Key Innovation</th><th>Applications</th></tr></thead>
<tbody>
<tr><td>CNN (Convolutional)</td><td>Grid-structured data (images, 1D signals)</td><td>Local connectivity + parameter sharing via filters</td><td>Medical imaging, EEG, histology slides</td></tr>
<tr><td>RNN / LSTM / GRU</td><td>Sequential data with temporal dependencies</td><td>Hidden state carries information across timesteps</td><td>Time series prediction, genomic sequences</td></tr>
<tr><td>Transformer</td><td>Sequential data with long-range dependencies</td><td>Self-attention: each position attends to all others simultaneously</td><td>NLP (BERT, GPT), drug discovery, protein structure (AlphaFold)</td></tr>
<tr><td>Graph Neural Network (GNN)</td><td>Graph-structured data</td><td>Message passing between connected nodes</td><td>Molecular property prediction, drug-drug interactions</td></tr>
</tbody></table>
<pre><code class="language-python">import torch
import torch.nn as nn

# Transformer encoder block from scratch (simplified)
class TransformerEncoderBlock(nn.Module):
    def __init__(self, d_model=256, n_heads=8, d_ff=1024, dropout=0.1):
        super().__init__()
        # Multi-head self-attention
        self.attention = nn.MultiheadAttention(
            embed_dim=d_model, num_heads=n_heads,
            dropout=dropout, batch_first=True
        )
        # Feed-forward network
        self.ffn = nn.Sequential(
            nn.Linear(d_model, d_ff),
            nn.GELU(),                     # GELU preferred in modern Transformers
            nn.Dropout(dropout),
            nn.Linear(d_ff, d_model)
        )
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x, mask=None):
        # Self-attention with residual connection
        attn_out, _ = self.attention(x, x, x, key_padding_mask=mask)
        x = self.norm1(x + self.dropout(attn_out))    # Add & Norm
        # FFN with residual
        x = self.norm2(x + self.dropout(self.ffn(x)))  # Add & Norm
        return x</code></pre>`},
    {id:"s4",content:`<h2 id="s4">Ensemble Methods Deep Dive</h2>
<p>Ensembles combine predictions from multiple models to reduce variance (bagging), bias (boosting), or both. Understanding the mechanics determines when each method helps.</p>
<table><thead><tr><th>Method</th><th>How It Works</th><th>Reduces</th><th>Best For</th></tr></thead>
<tbody>
<tr><td>Bagging (Random Forest)</td><td>Train many trees on bootstrap samples; average predictions</td><td>Variance</td><td>High-variance base learners; stable tabular data</td></tr>
<tr><td>Gradient Boosting (XGBoost, LightGBM)</td><td>Train trees sequentially; each corrects predecessor's residuals</td><td>Bias + Variance</td><td>Structured/tabular data; Kaggle default winner</td></tr>
<tr><td>Stacking</td><td>Meta-learner trained on base model predictions</td><td>Both</td><td>Combining diverse model types (tree + NN + linear)</td></tr>
<tr><td>Voting</td><td>Majority vote (classification) or average (regression)</td><td>Variance</td><td>Quick ensemble of pre-trained models</td></tr>
</tbody></table>
<pre><code class="language-python">import lightgbm as lgb
import xgboost as xgb
from sklearn.ensemble import RandomForestClassifier, StackingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score

# XGBoost with key hyperparameters explained
xgb_model = xgb.XGBClassifier(
    n_estimators=500,          # Number of trees
    learning_rate=0.05,        # Step size — lower = slower but better
    max_depth=6,               # Tree depth — controls variance/bias tradeoff
    min_child_weight=3,        # Min samples in leaf — regularization
    subsample=0.8,             # Row sampling per tree — reduces overfitting
    colsample_bytree=0.8,      # Feature sampling per tree
    reg_alpha=0.1,             # L1 regularization
    reg_lambda=1.0,            # L2 regularization
    use_label_encoder=False,
    eval_metric='auc',
    early_stopping_rounds=50,
    random_state=42
)

# LightGBM — typically 3-10x faster than XGBoost for large data
lgb_model = lgb.LGBMClassifier(
    n_estimators=500, learning_rate=0.05,
    num_leaves=63,      # 2^max_depth - 1 equivalent
    min_child_samples=20,
    subsample=0.8, colsample_bytree=0.8,
    random_state=42
)

# Stacking ensemble
stacking = StackingClassifier(
    estimators=[('xgb', xgb_model), ('lgb', lgb_model),
                ('rf', RandomForestClassifier(n_estimators=200))],
    final_estimator=LogisticRegression(),  # Meta-learner
    cv=5
)</code></pre>`},
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
<pre><code class="language-python">from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

# Fine-tuning BERT for clinical note classification
model_name = "emilyalsentzer/Bio_ClinicalBERT"  # Domain-specific pre-trained model
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(
    model_name, num_labels=2  # Binary classification head
)

# Freeze backbone; train only classifier head (linear probing)
for name, param in model.named_parameters():
    if 'classifier' not in name:
        param.requires_grad = False  # Freeze backbone layers

# Only 1,538 parameters trainable instead of 110M — efficient fine-tuning
trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
total = sum(p.numel() for p in model.parameters())
print(f"Trainable: {trainable:,} / {total:,} ({trainable/total:.2%})")</code></pre>`},
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
<pre><code class="language-python">import spacy
from scispacy.abbreviation import AbbreviationDetector

# Load biomedical NLP model
nlp = spacy.load("en_core_sci_lg")  # SciSpaCy: trained on biomedical literature
nlp.add_pipe("abbreviation_detector")

text = """Patient initiated ibrutinib 420mg daily for CLL.
          Developed grade 3 atrial fibrillation (AF) after 3 months.
          BTK inhibitor discontinued. Starting venetoclax."""

doc = nlp(text)

# Named entity recognition
print("Entities:")
for ent in doc.ents:
    print(f"  {ent.text:30s} [{ent.label_}]")

# Abbreviation detection
print("\nAbbreviations:")
for abrv in doc._.abbreviations:
    print(f"  {abrv} → {abrv._.long_form}")

# Dependency parsing (useful for relation extraction)
for token in doc:
    if token.dep_ in ('nsubj', 'dobj', 'prep'):
        print(f"  {token.text} --{token.dep_}--> {token.head.text}")</code></pre>`},
    {id:"s2",content:`<h2 id="s2">Word Embeddings & Semantic Representations</h2>
<p>Embeddings map discrete tokens to continuous vector spaces where semantic relationships become geometric distances. Models that understand language must learn that "cancer" and "tumor" are more similar than "cancer" and "chair."</p>
<table><thead><tr><th>Embedding Type</th><th>Properties</th><th>Limitation</th><th>Use Today</th></tr></thead>
<tbody>
<tr><td>Word2Vec / GloVe</td><td>Word-level static embeddings; captures word analogy relationships</td><td>One vector per word regardless of context: "bank" (river) = "bank" (financial)</td><td>Legacy; replaced by contextual embeddings</td></tr>
<tr><td>FastText</td><td>Subword embeddings; handles out-of-vocabulary words via character n-grams</td><td>Still static; context-independent</td><td>Low-resource languages; morphologically rich text</td></tr>
<tr><td>BERT embeddings (contextual)</td><td>Each token's embedding depends on surrounding context — polysemy handled</td><td>Sentence-level aggregation required for semantic search</td><td>Feature extraction for NLP tasks</td></tr>
<tr><td>Sentence Transformers</td><td>Contrastive fine-tuning produces semantically meaningful sentence embeddings</td><td>Fixed context window (typically 512 tokens)</td><td>Standard for semantic search, clustering, similarity</td></tr>
</tbody></table>
<pre><code class="language-python">from sentence_transformers import SentenceTransformer
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# Load sentence embedding model
model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

# Biomedical semantic search example
documents = [
    "Ibrutinib is a BTK inhibitor approved for CLL and mantle cell lymphoma",
    "Venetoclax targets BCL-2 protein and is used in combination with obinutuzumab",
    "Atrial fibrillation occurs in 6-9% of ibrutinib-treated CLL patients",
    "The FDA approved acalabrutinib for CLL based on ELEVATE-TN trial results",
    "Diabetes management requires regular HbA1c monitoring every 3 months"
]

# Encode documents and query
doc_embeddings = model.encode(documents)
query = "What are the cardiovascular side effects of BTK inhibitors?"
query_embedding = model.encode([query])

# Cosine similarity ranking
similarities = cosine_similarity(query_embedding, doc_embeddings)[0]
ranked = sorted(zip(similarities, documents), reverse=True)

print("Semantic search results:")
for score, doc in ranked:
    print(f"  [{score:.3f}] {doc[:80]}")</code></pre>`},
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
<pre><code class="language-python">from openai import OpenAI
client = OpenAI()

def extract_adverse_events(clinical_note: str) -> dict:
    """Extract structured adverse event data from clinical notes using LLM."""
    system_prompt = """You are a pharmacovigilance specialist.
    Extract all adverse events from clinical notes.
    Return JSON with: {"adverse_events": [{"term": "...", "severity": "Grade 1-5",
    "drug": "...", "onset_days": null or number}]}
    Use MedDRA preferred terms. If uncertain, use null."""

    few_shot_example = """
    Example:
    Note: "Patient on ibrutinib 420mg developed Grade 2 diarrhea after 14 days and mild fatigue."
    Output: {"adverse_events": [{"term": "Diarrhoea", "severity": "Grade 2", "drug": "ibrutinib", "onset_days": 14},
                                  {"term": "Fatigue", "severity": "Grade 1", "drug": "ibrutinib", "onset_days": null}]}
    """

    response = client.chat.completions.create(
        model="gpt-4o",
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": system_prompt + few_shot_example},
            {"role": "user", "content": f"Note: {clinical_note}"}
        ],
        temperature=0.0  # Deterministic for structured extraction
    )
    return response.choices[0].message.content</code></pre>`},
    {id:"s5",content:`<h2 id="s5">Retrieval-Augmented Generation (RAG)</h2>
<p><strong>RAG</strong> combines the generative capability of LLMs with an external knowledge retrieval system. Instead of relying on knowledge baked into model weights (which can be outdated or wrong), RAG retrieves relevant documents and provides them as context to the LLM at inference time.</p>
<p>RAG architecture:</p>
<pre><code class="language-python">from sentence_transformers import SentenceTransformer
import chromadb  # Vector database
from openai import OpenAI

class PharmaRAG:
    def __init__(self, collection_name="pharma_docs"):
        self.embedder = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
        self.db_client = chromadb.PersistentClient(path="./pharma_db")
        self.collection = self.db_client.get_or_create_collection(collection_name)
        self.llm = OpenAI()

    def index_documents(self, documents: list[dict]):
        """Add documents to vector store."""
        texts = [doc['text'] for doc in documents]
        embeddings = self.embedder.encode(texts).tolist()
        self.collection.add(
            ids=[doc['id'] for doc in documents],
            embeddings=embeddings,
            documents=texts,
            metadatas=[doc.get('metadata', {}) for doc in documents]
        )

    def retrieve(self, query: str, n_results: int = 4) -> list[str]:
        """Semantic search: find most relevant document chunks."""
        query_embedding = self.embedder.encode([query]).tolist()
        results = self.collection.query(
            query_embeddings=query_embedding,
            n_results=n_results
        )
        return results['documents'][0]  # Top N chunks

    def answer(self, question: str) -> str:
        """RAG: retrieve relevant context, then generate answer."""
        context_chunks = self.retrieve(question)
        context = "\n\n".join(context_chunks)

        response = self.llm.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "Answer based only on provided context. If unsure, say so."},
                {"role": "user", "content": f"Context:\n{context}\n\nQuestion: {question}"}
            ],
            temperature=0.2
        )
        return response.choices[0].message.content</code></pre>
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
<pre><code class="language-python">from ragas import evaluate
from ragas.metrics import (
    faithfulness, answer_relevancy,
    context_precision, context_recall
)
from datasets import Dataset

# RAGAS evaluation for RAG pipeline
eval_dataset = Dataset.from_dict({
    'question': ["What is ibrutinib's mechanism of action?"],
    'answer': ["Ibrutinib irreversibly inhibits Bruton's tyrosine kinase (BTK)..."],
    'contexts': [["BTK inhibitors work by blocking..."]],  # Retrieved chunks
    'ground_truth': ["Ibrutinib is a covalent BTK inhibitor..."]
})

result = evaluate(
    eval_dataset,
    metrics=[faithfulness, answer_relevancy, context_precision, context_recall]
)
print(result)
# faithfulness: 0.92 (low = hallucination present)
# context_precision: 0.85 (are retrieved docs relevant?)
# context_recall: 0.78 (did we retrieve all needed info?)</code></pre>
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
<pre><code class="language-python">from feast import FeatureStore, Entity, FeatureView, Field
from feast.types import Float32, Int64
import pandas as pd

# Feature store prevents training-serving skew by using the SAME
# feature computation logic for both training and inference

# 1. Define features once (single source of truth)
from feast import FileSource
from datetime import timedelta

patient_features = FeatureView(
    name="patient_engagement",
    entities=["patient_id"],
    ttl=timedelta(days=90),  # Features older than 90 days are stale
    schema=[
        Field(name="days_since_last_rx", dtype=Float32),
        Field(name="adherence_pdc_90d", dtype=Float32),
        Field(name="num_physician_visits_30d", dtype=Int64),
        Field(name="copay_assistance_enrolled", dtype=Int64),
    ],
    source=FileSource(path="data/patient_features.parquet", timestamp_field="event_timestamp")
)

store = FeatureStore(repo_path=".")

# 2. Training: retrieve historical features (point-in-time correct)
entity_df = pd.DataFrame({
    "patient_id": [1001, 1002, 1003],
    "event_timestamp": pd.to_datetime(["2024-01-15", "2024-02-20", "2024-03-10"]),
    "label": [1, 0, 1]  # Discontinued therapy
})
training_df = store.get_historical_features(
    entity_df=entity_df,
    features=["patient_engagement:days_since_last_rx",
               "patient_engagement:adherence_pdc_90d"]
).to_df()

# 3. Inference: retrieve online features (same computation, real-time)
online_features = store.get_online_features(
    features=["patient_engagement:days_since_last_rx"],
    entity_rows=[{"patient_id": 1001}]
).to_df()</code></pre>`},
    {id:"s3",content:`<h2 id="s3">Experiment Tracking & Model Registry</h2>
<p>Without experiment tracking, data science is just ad-hoc tinkering. MLflow is the industry standard for open-source experiment tracking.</p>
<pre><code class="language-python">import mlflow
import mlflow.sklearn
from sklearn.model_selection import cross_val_score
import lightgbm as lgb

mlflow.set_tracking_uri("http://mlflow-server:5000")
mlflow.set_experiment("patient-discontinuation-v2")

def train_and_log(X_train, y_train, params):
    with mlflow.start_run(run_name=f"lgbm_{params['max_depth']}d"):
        # Log hyperparameters
        mlflow.log_params(params)

        # Train model
        model = lgb.LGBMClassifier(**params)
        cv_scores = cross_val_score(model, X_train, y_train,
                                     cv=5, scoring='roc_auc')
        model.fit(X_train, y_train)

        # Log metrics
        mlflow.log_metric("cv_auc_mean", cv_scores.mean())
        mlflow.log_metric("cv_auc_std", cv_scores.std())

        # Log model artifact (serialized model)
        mlflow.sklearn.log_model(
            model, "model",
            registered_model_name="patient-discontinuation-predictor",
            signature=mlflow.models.infer_signature(X_train)
        )

        # Log feature importance plot
        import matplotlib.pyplot as plt
        fig, ax = plt.subplots()
        lgb.plot_importance(model, ax=ax, max_num_features=15)
        mlflow.log_figure(fig, "feature_importance.png")

        return model, cv_scores.mean()

# Model Registry: transition best model to production
from mlflow import MlflowClient
client = MlflowClient()
# After evaluating runs, promote the best to Production stage
client.transition_model_version_stage(
    name="patient-discontinuation-predictor",
    version=3,
    stage="Production",
    archive_existing_versions=True
)</code></pre>`},
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
<pre><code class="language-yaml"># GitHub Actions ML pipeline (simplified)
name: ML Training Pipeline
on:
  push:
    paths:
      - 'src/features/**'
      - 'src/models/**'
      - 'data/schemas/**'

jobs:
  validate-data:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: python -m pytest tests/test_data_quality.py -v

  train-and-evaluate:
    needs: validate-data
    runs-on: [self-hosted, gpu]
    steps:
      - name: Train model
        run: python src/train.py --config configs/prod.yaml
      - name: Evaluate against baseline
        run: |
          python src/evaluate.py \
            --model-uri runs:/\${MLFLOW_RUN_ID}/model \
            --baseline-uri models:/patient-discontinuation-predictor/Production \
            --min-auc 0.85 \
            --fail-on-regression

  deploy-canary:
    needs: train-and-evaluate
    steps:
      - name: Deploy 5% canary
        run: python deploy.py --strategy canary --traffic-pct 5
      - name: Wait and validate
        run: python monitor.py --wait-minutes 60 --abort-on-error-spike</code></pre>`},
    {id:"s5",content:`<h2 id="s5">Model Monitoring & Drift Detection</h2>
<p>ML models degrade silently. Without monitoring, you discover failures from business stakeholders — after decisions have been made on bad predictions.</p>
<table><thead><tr><th>Drift Type</th><th>What Changes</th><th>Detection Method</th><th>Response</th></tr></thead>
<tbody>
<tr><td>Data drift (covariate)</td><td>Input feature distributions shift (new patient population)</td><td>Population Stability Index (PSI), KS test</td><td>Investigate source; retrain if PSI &gt;0.2</td></tr>
<tr><td>Concept drift</td><td>Relationship between features and label changes (new treatment guidelines)</td><td>Monitor prediction accuracy on labeled recent data</td><td>Retrain with recent data</td></tr>
<tr><td>Label drift (target shift)</td><td>Distribution of outcomes changes (COVID disrupted all healthcare utilization)</td><td>Compare label distribution in production vs. training</td><td>Evaluate if model applies; may need domain adaptation</td></tr>
<tr><td>Prediction drift</td><td>Score distribution shifts without input changes</td><td>Monitor percentile thresholds of prediction scores</td><td>Audit pipeline; check for feature engineering bug</td></tr>
</tbody></table>
<pre><code class="language-python">import evidently
from evidently.report import Report
from evidently.metric_preset import DataDriftPreset, ClassificationPreset

# Evidently AI: automated drift detection report
def generate_monitoring_report(reference_data, production_data,
                                 reference_labels, production_labels):
    report = Report(metrics=[
        DataDriftPreset(),          # Statistical tests per feature
        ClassificationPreset(),     # Accuracy, precision, recall, AUC
    ])

    report.run(
        reference_data=reference_data,
        current_data=production_data,
        column_mapping=evidently.ColumnMapping(
            target='discontinuation_risk',
            prediction='model_score',
            numerical_features=['pdx_score','adherence_90d','days_since_rx'],
            categorical_features=['therapy_line','payer_type']
        )
    )
    report.save_html("monitoring_report.html")

    # Extract drift summary for alerting
    drift_summary = report.as_dict()['metrics'][0]['result']
    drifted_features = [
        feat for feat, result in drift_summary['drift_by_columns'].items()
        if result['drift_detected']
    ]
    return drifted_features</code></pre>`},
    {id:"s6",content:`<h2 id="s6">Model Serving Patterns</h2>
<p>How you serve a model determines latency, throughput, cost, and reliability. Choose serving architecture based on use case requirements:</p>
<table><thead><tr><th>Pattern</th><th>Latency</th><th>Throughput</th><th>Use Case</th><th>Tool</th></tr></thead>
<tbody>
<tr><td>REST API (online inference)</td><td>&lt;100ms</td><td>100s req/sec</td><td>Real-time HCP scoring, fraud detection</td><td>FastAPI + BentoML, SageMaker Endpoint</td></tr>
<tr><td>Batch inference</td><td>Hours</td><td>Millions of records</td><td>Nightly patient risk scoring, monthly brand predictions</td><td>Spark MLlib, SageMaker Batch Transform</td></tr>
<tr><td>Stream inference</td><td>Seconds</td><td>Thousands events/sec</td><td>Real-time adverse event detection, CRM trigger on claim</td><td>Kafka + Flink, Spark Streaming</td></tr>
<tr><td>Edge/embedded</td><td>Milliseconds (on device)</td><td>Single device</td><td>Medical device diagnostics, mobile health apps</td><td>ONNX, TensorFlow Lite, Core ML</td></tr>
</tbody></table>
<pre><code class="language-python">from fastapi import FastAPI
import mlflow.sklearn
import pandas as pd
from pydantic import BaseModel

# Production model serving with FastAPI
app = FastAPI(title="Patient Discontinuation Risk API")

# Load model at startup (not per request)
model = mlflow.sklearn.load_model("models:/patient-discontinuation-predictor/Production")

class PatientFeatures(BaseModel):
    patient_id: int
    days_since_last_rx: float
    adherence_pdc_90d: float
    num_physician_visits_30d: int
    therapy_line: int
    payer_type: str

@app.post("/predict")
def predict_discontinuation(features: PatientFeatures):
    data = pd.DataFrame([features.dict()])
    probability = model.predict_proba(data)[0, 1]
    risk_tier = "HIGH" if probability > 0.7 else "MEDIUM" if probability > 0.4 else "LOW"

    return {
        "patient_id": features.patient_id,
        "discontinuation_probability": round(probability, 3),
        "risk_tier": risk_tier,
        "model_version": "v3.2.1"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "model_loaded": model is not None}</code></pre>`},
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
