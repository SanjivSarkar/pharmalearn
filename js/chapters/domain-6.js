/* Domain 6: Data Engineering for Pharma */
PL.addChapters({

"6-1": {
  id:"6-1", title:"Modern Pharma Data Stack", domain:"Data Engineering for Pharma", domain_id:6,
  level:"Intermediate", mins:38, available:true,
  tags:["Modern Data Stack","dbt","Airflow","Snowflake","Lakehouse","ELT"],
  objectives:["Map the modern pharma data stack from ingestion to consumption","Distinguish ETL from ELT and when each applies in pharma","Understand the lakehouse architecture for claims and EMR data","Select the right tool for each layer of the data platform","Design a data platform that serves both analytics and regulatory needs"],
  toc:[
    {id:"s1",title:"The Modern Data Stack",level:"h2"},
    {id:"s2",title:"ETL vs ELT: The Paradigm Shift",level:"h2"},
    {id:"s3",title:"Lakehouse Architecture for Pharma",level:"h2"},
    {id:"s4",title:"Tool Selection Guide",level:"h2"},
    {id:"s5",title:"Reference Architecture",level:"h2"},
    {id:"s6",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">The Modern Data Stack</h2>
<p>The <strong>modern data stack (MDS)</strong> replaced the monolithic on-premise data warehouse with a composable set of best-of-breed cloud tools, each optimized for one layer of the data pipeline.</p>
<table><thead><tr><th>Layer</th><th>Function</th><th>Leading Tools</th><th>Pharma Use Case</th></tr></thead>
<tbody>
<tr><td><strong>Ingestion</strong></td><td>Move data from sources to storage</td><td>Fivetran, Airbyte, Stitch, custom SFTP</td><td>IQVIA/Komodo vendor feeds, CRM sync, lab data</td></tr>
<tr><td><strong>Storage</strong></td><td>Scalable, queryable data lake/warehouse</td><td>Snowflake, BigQuery, Databricks, Redshift</td><td>Claims tables (billions of rows), EMR, genomics</td></tr>
<tr><td><strong>Transformation</strong></td><td>Clean, model, and aggregate raw data</td><td>dbt (data build tool), Spark, SQLMesh</td><td>Claims standardization, OMOP conversion, mart build</td></tr>
<tr><td><strong>Orchestration</strong></td><td>Schedule, monitor, and retry pipelines</td><td>Apache Airflow, Prefect, Dagster</td><td>Monthly claims refresh, daily CRM sync, weekly reports</td></tr>
<tr><td><strong>Consumption</strong></td><td>Query, visualize, and serve data</td><td>Tableau, Power BI, Mode, Jupyter, dbt Semantic Layer</td><td>Brand dashboards, ad hoc analytics, HEOR models</td></tr>
<tr><td><strong>Observability</strong></td><td>Monitor data quality and pipeline health</td><td>Monte Carlo, Bigeye, Great Expectations, re_data</td><td>Claims completeness alerts, freshness monitoring</td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">Why the MDS Won</div><p>The traditional ETL + on-premise warehouse model couldn't scale to petabyte claims databases, required expensive specialists to maintain, and couldn't support the iteration speed modern analytics demands. Cloud separation of storage and compute (pay per query, not per server) changed the economics entirely.</p></div>`},
    {id:"s2",content:`<h2 id="s2">ETL vs ELT: The Paradigm Shift</h2>
<table><thead><tr><th>Aspect</th><th>ETL (Extract-Transform-Load)</th><th>ELT (Extract-Load-Transform)</th></tr></thead>
<tbody>
<tr><td>Transform timing</td><td>Before loading — requires pre-defined schema</td><td>After loading — raw data lands first</td></tr>
<tr><td>Compute location</td><td>ETL server (fixed, expensive)</td><td>Data warehouse (elastic, cheap)</td></tr>
<tr><td>Schema flexibility</td><td>Low — schema-on-write</td><td>High — schema-on-read</td></tr>
<tr><td>Data freshness</td><td>Batch-limited by ETL server capacity</td><td>Near-real-time possible with micro-batch</td></tr>
<tr><td>Debugging</td><td>Hard — transformation errors buried in pipeline</td><td>Easy — raw data preserved; rerun transforms</td></tr>
<tr><td>Best for pharma</td><td>Legacy CDISC submissions, on-premise EDC</td><td>Claims analytics, commercial dashboards, ML feature stores</td></tr>
</tbody></table>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">S3 = boto3.client('s3')</div>
</div>
<div class="callout info"><div class="callout-title">The Raw Zone is Sacred</div><p>In ELT, the raw zone (Bronze layer) must never be modified after ingestion. It is the single source of truth for auditors, regulators, and debugging. If a transformation produces wrong results, you can always rerun from raw. Overwriting raw data destroys your audit trail.</p></div>`},
    {id:"s3",content:`<h2 id="s3">Lakehouse Architecture for Pharma</h2>
<p>The <strong>lakehouse</strong> combines the low-cost storage of a data lake with the ACID transactions and SQL performance of a data warehouse. Delta Lake (Databricks), Apache Iceberg, and Apache Hudi are the three dominant lakehouse table formats.</p>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Spark = SparkSession.builder \</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Delta Table = DeltaTable.forPath(spark, delta path)</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">F"Existing.{Merge Key} = new.{merge key}"</div>
</div>
<table><thead><tr><th>Condition</th><th>Result</th></tr></thead><tbody>
<tr><td>DeltaTable.isDeltaTable(spark, delta path)</td><td>delta table = DeltaTable.forPath(spark, delta path)</td></tr>
</tbody></table>
<p><strong>Time travel</strong> is a killer feature for pharma regulatory submissions — you can reproduce the exact dataset used for any historical analysis by querying the Delta table at a specific timestamp or version.</p>`},
    {id:"s4",content:`<h2 id="s4">Tool Selection Guide</h2>
<table><thead><tr><th>Decision</th><th>Option A</th><th>Option B</th><th>Pharma Recommendation</th></tr></thead>
<tbody>
<tr><td>Warehouse vs Lakehouse?</td><td>Snowflake (pure warehouse)</td><td>Databricks (lakehouse)</td><td>Snowflake for SQL-heavy commercial analytics; Databricks for ML/Spark workloads</td></tr>
<tr><td>Ingestion tool?</td><td>Fivetran (managed connectors)</td><td>Airbyte (open source)</td><td>Fivetran if budget allows; Airbyte for vendor feeds requiring custom connectors</td></tr>
<tr><td>Transformation?</td><td>dbt (SQL-first, version controlled)</td><td>Spark/PySpark (Python, distributed)</td><td>dbt for SQL transformations; Spark for billion-row genomic/claims processing</td></tr>
<tr><td>Orchestration?</td><td>Apache Airflow (open source, ubiquitous)</td><td>Prefect/Dagster (modern, Pythonic)</td><td>Airflow for enterprise; Prefect/Dagster for smaller teams favoring developer experience</td></tr>
<tr><td>Cloud?</td><td>AWS (dominant in pharma)</td><td>Azure (Microsoft enterprise)</td><td>AWS for greenfield; Azure if deep Microsoft footprint (Office 365, Azure AD, Power BI)</td></tr>
</tbody></table>
<div class="callout warning"><div class="callout-title">The Vendor Lock-In Trap</div><p>Snowflake's proprietary format and Databricks' Delta Lake are both highly capable but create lock-in. Apache Iceberg is the emerging open standard supported by all three major clouds — for new platforms being built for 10+ year horizons, Iceberg provides the best portability.</p></div>`},
    {id:"s5",content:`<h2 id="s5">Reference Architecture</h2>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main"> = ====================================================</div>
</div>`},
    {id:"s6",content:`<h2 id="s6">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>ELT is the modern default for pharma analytics — load raw data first unchanged, transform in the warehouse using dbt, and preserve the raw zone as an unalterable audit trail for regulatory purposes.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>The Bronze-Silver-Gold medallion architecture aligns with HIPAA and regulatory needs: Bronze = raw vendor data, Silver = cleaned/OMOP-conformant, Gold = brand analytics marts optimized for specific use cases.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Delta Lake time travel is a critical feature for pharma regulatory compliance — any historical analysis can be reproduced exactly by querying the table at the version or timestamp when the analysis was originally run.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>Tool selection should follow workload: Snowflake for SQL-heavy commercial analytics, Databricks for ML and large-scale Spark processing, Airflow for enterprise orchestration — avoid the trap of picking one tool for everything.</div></div>`}],
  questions:[
    {id:"q1",text:"A pharma analytics team receives corrected claims files from IQVIA each month that update records from prior months. Which data platform capability handles this most efficiently?",
     options:["Append-only log tables — add corrections as new rows","Delta Lake / Iceberg MERGE (upsert) — update existing records by claim_id while inserting new ones, with ACID guarantees","Manually delete and re-insert corrected records in Snowflake","Create separate 'corrections' tables and union them at query time"],
     correct:1,explanation:"MERGE (upsert) in Delta Lake or Snowflake's MERGE statement handles corrections perfectly: existing records with the same claim_id are updated, new claims are inserted, and all changes are ACID-compliant (readers never see partial state). Append-only approaches cause duplicate records. Manual delete/re-insert is error-prone and slow on large tables."},
    {id:"q2",text:"Your FDA regulatory submission requires reproducing the exact dataset used in an analysis run 18 months ago. Which feature of a lakehouse platform enables this?",
     options:["Git version control on SQL files","Delta Lake time travel — query the table AS OF a specific timestamp or version number to retrieve the exact historical state of the data","Database backups restored to a snapshot","Exporting CSV files before every analysis"],
     correct:1,explanation:"Delta Lake's time travel capability records every write operation as a new version. You can query `SELECT * FROM delta.claims_table TIMESTAMP AS OF '2023-06-15'` to retrieve the exact state of the table on that date — byte-for-byte reproducible. This is a critical capability for FDA audit trails and HEOR publication reproducibility."},
    {id:"q3",text:"Your team uses Snowflake for commercial analytics (SQL, dashboards) and Databricks for ML model training (PySpark, feature engineering). A team member suggests consolidating everything into Databricks to 'simplify the stack.' What is the strongest counter-argument?",
     options:["Databricks cannot run SQL queries","Snowflake's SQL performance, governance features, and BI tool integrations (Tableau, Power BI) are optimized for the commercial analytics use case — consolidating to Databricks would degrade performance and increase cost for the SQL-heavy workloads without meaningful benefit","The licensing cost would double","Databricks doesn't support Delta Lake"],
     correct:1,explanation:"This is a common false economy. Snowflake is purpose-built for SQL analytics with automatic query optimization, columnar storage, and seamless BI tool connectors. Databricks excels at distributed Spark/ML workloads. Running SQL-heavy commercial dashboards on Databricks requires managing Spark clusters and pays unnecessary compute overhead. The right answer is to keep both tools for their strengths, integrated via Delta Sharing or data copy between platforms."}
  ]
},

"6-2": {
  id:"6-2", title:"Data Modeling for Pharma Warehouses", domain:"Data Engineering for Pharma", domain_id:6,
  level:"Advanced", mins:42, available:true,
  tags:["Data Modeling","Dimensional Modeling","Star Schema","Data Vault","Medallion Architecture","dbt"],
  objectives:["Design a star schema for pharma commercial analytics","Apply Data Vault modeling for audit-compliant historical tracking","Build dbt models using the medallion architecture","Implement slowly changing dimensions (SCD) for HCP master data","Choose between dimensional and Data Vault modeling for different pharma use cases"],
  toc:[
    {id:"s1",title:"Dimensional Modeling for Pharma",level:"h2"},
    {id:"s2",title:"Star Schema Design",level:"h2"},
    {id:"s3",title:"Slowly Changing Dimensions",level:"h2"},
    {id:"s4",title:"Data Vault for Audit Trails",level:"h2"},
    {id:"s5",title:"dbt Model Patterns",level:"h2"},
    {id:"s6",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Dimensional Modeling for Pharma</h2>
<p><strong>Dimensional modeling</strong> (Ralph Kimball's approach) organizes data into fact tables (measurements) and dimension tables (context), optimized for analytical queries rather than transaction processing.</p>
<p>Core pharma analytical fact tables:</p>
<table><thead><tr><th>Fact Table</th><th>Grain</th><th>Key Measures</th><th>Key Dimensions</th></tr></thead>
<tbody>
<tr><td><strong>fact_prescription</strong></td><td>One row per prescription fill</td><td>rx_count, days_supply, paid_amount</td><td>patient, prescriber, drug, date, pharmacy, payer</td></tr>
<tr><td><strong>fact_medical_claim</strong></td><td>One row per claim line</td><td>paid_amount, allowed_amount, units</td><td>patient, provider, diagnosis, procedure, date, payer</td></tr>
<tr><td><strong>fact_sales_call</strong></td><td>One row per rep–HCP interaction</td><td>call_duration, samples_dropped</td><td>rep, hcp, territory, date, call_type, brand</td></tr>
<tr><td><strong>fact_patient_journey</strong></td><td>One row per journey milestone</td><td>days_to_event, event_sequence</td><td>patient, event_type, drug, diagnosis, date</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">Grain is Everything</div><p>Defining the grain (the most atomic row in a fact table) is the most important decision in dimensional modeling. The prescription grain should be one row per fill per patient per drug — never aggregate before storing in the fact table. Aggregations are fast in modern warehouses; you can always roll up but you can never roll down.</p></div>`},
    {id:"s2",content:`<h2 id="s2">Star Schema Design</h2>
<div class="callout info"><div class="callout-title">Process Logic</div><p>Business Logic</p></div>`},
    {id:"s3",content:`<h2 id="s3">Slowly Changing Dimensions (SCD)</h2>
<p>HCP and patient attributes change over time — specialty changes, practice relocations, payer plan changes. <strong>Slowly Changing Dimensions (SCD)</strong> handle this gracefully:</p>
<table><thead><tr><th>SCD Type</th><th>Behavior</th><th>When to Use in Pharma</th></tr></thead>
<tbody>
<tr><td><strong>Type 1</strong></td><td>Overwrite — keep only current value</td><td>Simple attributes where history doesn't matter (phone number, email)</td></tr>
<tr><td><strong>Type 2</strong></td><td>Add new row — preserve full history with effective dates</td><td>HCP specialty, practice setting, prescriber territory assignment</td></tr>
<tr><td><strong>Type 3</strong></td><td>Add column — keep current + previous value only</td><td>Two-period comparisons (this year vs last year territory)</td></tr>
<tr><td><strong>Type 6</strong></td><td>Hybrid (Type 1 + 2 + 3) — current value on all rows plus history</td><td>Payer formulary tier — need both current status and historical changes</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">Process Logic</div><p>Business Logic</p></div>`},
    {id:"s4",content:`<h2 id="s4">Data Vault for Audit Trails</h2>
<p><strong>Data Vault 2.0</strong> is an alternative modeling approach designed for auditability, parallelism, and handling schema changes gracefully. It is increasingly used for FDA-grade regulatory data:</p>
<p>Data Vault has three entity types:</p>
<ul>
<li><strong>Hubs:</strong> Business keys (patient_id, NPI, NDC) — uniquely identify business entities; never change</li>
<li><strong>Links:</strong> Relationships between hubs (patient prescribed drug by provider on date)</li>
<li><strong>Satellites:</strong> Descriptive attributes and their historical changes (attached to hubs or links)</li>
</ul>
<div class="callout info"><div class="callout-title">Process Logic</div><p>Business Logic</p></div>
<div class="callout info"><div class="callout-title">Data Vault for FDA Compliance</div><p>Data Vault's complete historical tracking with load dates and record sources on every table makes it naturally compliant with FDA 21 CFR Part 11 (electronic records) requirements. Every insert is immutable — you can prove exactly what data existed at any point in time, who loaded it, and from which source system.</p></div>`},
    {id:"s5",content:`<h2 id="s5">dbt Model Patterns</h2>
<div class="callout info"><div class="callout-title">Process Logic</div><p>Business Logic</p></div>
<p><strong>dbt model naming convention:</strong> <code>stg_</code> → <code>int_</code> → <code>fct_</code> / <code>dim_</code> — each prefix signals maturity and transformation depth to any reader.</p>`},
    {id:"s6",content:`<h2 id="s6">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>Grain defines dimensional model quality — always store the most atomic fact (one row per prescription fill, not aggregated) and let the warehouse do the aggregations; you can always roll up, never roll down.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>SCD Type 2 is the standard for HCP attributes (specialty, territory, practice setting) — new rows with effective/expiration dates preserve full history needed for retrospective analytics and sales compensation disputes.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Data Vault is purpose-built for regulatory auditability — its immutable insert-only pattern with load dates and record sources on every row satisfies FDA 21 CFR Part 11 electronic records requirements naturally.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>dbt model layers (stg_ → int_ → fct_/dim_) enforce separation of concerns — staging renames and casts, intermediate applies business logic, mart tables serve specific analytical use cases.</div></div>`}],
  questions:[
    {id:"q1",text:"An HCP moves their practice from New York to New Jersey and changes specialty from Internal Medicine to Oncology. Your dim_hcp uses SCD Type 2. What happens in the dimension table?",
     options:["The existing row is updated with the new state and specialty","A new row is inserted with effective_date = today, expiration_date = 9999-12-31, is_current = TRUE; the old row gets expiration_date = today-1, is_current = FALSE — both rows preserved with full history","The old row is deleted and replaced","Only the state field is updated; specialty requires a new row"],
     correct:1,explanation:"SCD Type 2 inserts a new row for every change to a tracked attribute, preserving the full history. The old row gets an expiration date and is_current = FALSE. This means historical prescriptions will join to the old row (NY, Internal Medicine) for the period they occurred, while new prescriptions join to the current row (NJ, Oncology). This is essential for accurate historical territory and specialty reporting."},
    {id:"q2",text:"In a Data Vault model, every table has 'load_date' and 'record_source' columns. Why are these required on EVERY table, including hubs?",
     options:["They are required by SQL standards","They enforce the auditability principle — every row must be traceable to when it was loaded and from which source system, satisfying regulatory requirements for data lineage and reproducibility","They improve query performance","They are needed for foreign key constraints"],
     correct:1,explanation:"Data Vault's core design principle is complete auditability. Every row in every table (hub, link, satellite) must record WHEN it was loaded (load_date) and FROM WHERE (record_source). This enables complete data lineage tracing, supports FDA 21 CFR Part 11 compliance, and allows any row's provenance to be traced back to the originating source file — critical for regulatory data environments."},
    {id:"q3",text:"A dbt staging model for medical claims contains complex business logic including CLL patient identification, LOT derivation, and PDC calculation. What is wrong with this approach?",
     options:["Staging models cannot contain SQL","Staging models should contain ONLY mechanical transformations (rename, cast, basic cleaning). Business logic (patient identification, LOT, PDC) belongs in intermediate or mart models — mixing them violates separation of concerns and makes debugging difficult","There is nothing wrong — staging is the appropriate place for all transformations","dbt does not support PDC calculations"],
     correct:1,explanation:"This violates the dbt model layer convention. Staging models perform mechanical operations only: renaming columns to standard names, casting data types, basic null handling. Business logic (2-code rule, LOT algorithm, PDC calculation) belongs in intermediate models that reference staging. This separation means: if the source column name changes, you fix it only in staging; if the CLL definition changes, you fix it only in the intermediate model — not hunting through mixed-concern code."}
  ]
},

"6-3": {
  id:"6-3", title:"Snowflake & Databricks for Pharma", domain:"Data Engineering for Pharma", domain_id:6,
  level:"Advanced", mins:40, available:true,
  tags:["Snowflake","Databricks","Cloud Warehouse","Spark","Performance","Cost Optimization"],
  objectives:["Configure Snowflake for pharma claims workloads with appropriate warehouses and clustering","Use Databricks for large-scale ML feature engineering on claims data","Implement cost optimization strategies for both platforms","Design cross-platform data sharing between Snowflake and Databricks","Apply Snowflake's data governance features for HIPAA compliance"],
  toc:[
    {id:"s1",title:"Snowflake for Pharma Analytics",level:"h2"},
    {id:"s2",title:"Snowflake Performance & Cost",level:"h2"},
    {id:"s3",title:"Databricks for ML Workloads",level:"h2"},
    {id:"s4",title:"Cross-Platform Architecture",level:"h2"},
    {id:"s5",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Snowflake for Pharma Analytics</h2>
<p>Snowflake's separation of storage and compute makes it ideal for pharma's variable workload patterns — heavy month-end claims refresh, then lighter daily analytics queries.</p>
<div class="callout info"><div class="callout-title">Process Logic</div><p>Business Logic</p></div>
<div class="callout info"><div class="callout-title">Snowflake Clustering Keys</div><p>On claims tables with billions of rows, clustering by (service_year, drug_class, prescriber_state) means queries filtered on those columns scan only the relevant micro-partitions — typically reducing query time from minutes to seconds. Without clustering, every query scans the full table. Choose clustering keys based on the columns used most frequently in WHERE clauses.</p></div>`},
    {id:"s2",content:`<h2 id="s2">Snowflake Performance & Cost</h2>
<div class="callout info"><div class="callout-title">Process Logic</div><p>Business Logic</p></div>
<p><strong>Snowflake cost optimization checklist:</strong></p>
<ul>
<li>Set AUTO_SUSPEND to ≤ 60 seconds for all warehouses — idle compute is the #1 cost driver</li>
<li>Use clustering keys on large fact tables to enable micro-partition pruning</li>
<li>Set resource monitors with spend caps for each team/warehouse</li>
<li>Use zero-copy clones for dev/test environments</li>
<li>Review QUERY_HISTORY weekly for expensive queries that need optimization</li>
</ul>`},
    {id:"s3",content:`<h2 id="s3">Databricks for ML Workloads</h2>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Spark = SparkSession.builder \</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Claims = spark.read.format("delta").load(claims path)</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Crm = spark.read.format("delta").load(crm path)</div>
</div>`},
    {id:"s4",content:`<h2 id="s4">Cross-Platform Architecture</h2>
<p>Most pharma organizations use Snowflake for commercial analytics AND Databricks for ML — the two platforms integrate via several patterns:</p>
<table><thead><tr><th>Integration Pattern</th><th>Use Case</th><th>Mechanism</th></tr></thead>
<tbody>
<tr><td><strong>Delta Sharing</strong></td><td>Read Databricks Delta tables from Snowflake (or vice versa)</td><td>Open protocol; no data copy; read-only access to live tables</td></tr>
<tr><td><strong>External tables</strong></td><td>Snowflake reads Parquet/Delta files on S3</td><td>Snowflake queries S3 files directly; data stays in lake</td></tr>
<tr><td><strong>Data copy via COPY INTO</strong></td><td>Move ML model outputs (scores) from Databricks to Snowflake</td><td>Write Parquet to S3; COPY INTO Snowflake table</td></tr>
<tr><td><strong>Databricks SQL</strong></td><td>SQL analytics on Databricks for BI tool integration</td><td>ODBC/JDBC connector; replaces Snowflake for Spark-native data</td></tr>
</tbody></table>
<div class="flow-box"><div class="rule-step"><div class="rule-step-num">1</div><div class="rule-step-body"><strong>Pattern: ML scores from Databricks → Snowflake for dashboard use</strong></div></div>
<div class="rule-step"><div class="rule-step-num">2</div><div class="rule-step-body"><strong>Step 1: Write propensity scores from Databricks to S3</strong></div></div>
<div class="rule-step"><div class="rule-step-num">3</div><div class="rule-step-body"><strong>Step 2: Load into Snowflake via COPY INTO (from SQL)</strong></div></div>
<div class="rule-step"><div class="rule-step-num">4</div><div class="rule-step-body"><strong>COPY INTO brand_analytics.hcp_propensity_scores</strong></div></div>
<div class="rule-step"><div class="rule-step-num">5</div><div class="rule-step-body"><strong>FROM @pharma_s3_stage/ml-outputs/hcp-propensity/</strong></div></div>
</div>
<div class="callout"><div class="callout-title">The Right Tool Principle</div><p>Snowflake for SQL + BI. Databricks for Spark + ML. Share data between them via Delta Sharing or S3 Parquet. This isn't a compromise — it's intentional architecture that uses each platform at its best. Forcing everything into one platform degrades performance on the workloads it wasn't designed for.</p></div>`},
    {id:"s5",content:`<h2 id="s5">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>Snowflake warehouse AUTO_SUSPEND ≤ 60 seconds is the single most impactful cost optimization — idle compute that isn't suspended is money burning with no return.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>Clustering keys on large claims tables (service_year, drug_class, geography) enable micro-partition pruning that can reduce query time from minutes to seconds — always profile query performance on large tables before declaring them "too slow."</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Databricks' distributed Spark processing excels for ML feature engineering on billion-row claims tables — tasks that would timeout on Snowflake finish in minutes on a properly sized Databricks cluster.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>Cross-platform integration via Delta Sharing or S3 Parquet transfer enables the best-of-both-worlds architecture: Snowflake for commercial SQL analytics, Databricks for ML, with model scores flowing back into Snowflake for dashboard consumption.</div></div>`}],
  questions:[
    {id:"q1",text:"A Snowflake query scanning 500 billion rows of medical claims takes 45 minutes on a Large warehouse. What is the first optimization to try?",
     options:["Upgrade to an X-Large warehouse immediately","Add clustering keys on the columns used in the WHERE clause (service_year, icd10_dx_1) — this enables micro-partition pruning to scan only relevant data rather than the full table","Rewrite the query in Python","Increase the MAX_CLUSTER_COUNT to auto-scale"],
     correct:1,explanation:"Before scaling up compute, always try to reduce the data scanned. Clustering by commonly filtered columns (service_year, diagnosis category, geography) enables Snowflake to skip irrelevant micro-partitions — often reducing scan from 500B to 5B rows. This is free after the initial cluster operation. Scaling warehouse size increases compute cost but does nothing to reduce unnecessary I/O."},
    {id:"q2",text:"Your data engineering team wants to give the analytics team a 'development copy' of the production Snowflake database to test new dbt models. What is the most cost-effective approach?",
     options:["Export production tables to CSV and reload into a dev schema","Use Snowflake zero-copy cloning — creates an instant copy of the database that shares storage with production and only diverges (incurring cost) when data is modified","Purchase additional Snowflake storage for a full dev copy","Limit the dev team to a sample of 10% of production data"],
     correct:1,explanation:"Zero-copy cloning creates a full logical copy of the database (or table, schema) in seconds with zero storage cost — it shares the underlying micro-partitions with the source until data is modified. The dev team gets a full, realistic environment identical to production. Storage cost only accumulates for rows that are changed or added in the clone. This is Snowflake's best enterprise feature for development workflows."},
    {id:"q3",text:"A Spark job in Databricks processing 2 billion claims rows takes 3 hours. You notice the cluster has 200 partitions but 400 CPU cores. What optimization should you try first?",
     options:["Add more CPU cores","Increase the number of partitions to match or exceed CPU core count (e.g., repartition to 800-1600) — underpartitioned data means cores sit idle waiting for work, limiting parallelism","Reduce the data to a sample first","Upgrade to a GPU cluster"],
     correct:1,explanation:"Spark's parallelism is limited by partition count — with 200 partitions and 400 cores, half the cores sit idle at any given time. Increasing partitions to 2-4x the core count (800-1600) ensures maximum CPU utilization. Use df.repartition(1600) before the heavy transformation or set spark.sql.shuffle.partitions=1600. This is typically the first and most impactful Spark performance optimization."}
  ]
},

"6-4": {
  id:"6-4", title:"Real-Time & Streaming Analytics", domain:"Data Engineering for Pharma", domain_id:6,
  level:"Advanced", mins:38, available:true,
  tags:["Streaming","Kafka","Spark Streaming","Real-Time","Event-Driven","Pipeline"],
  objectives:["Identify pharma use cases that require real-time vs batch processing","Build a streaming pipeline using Kafka and Spark Structured Streaming","Implement real-time patient adherence alerts","Design event-driven architectures for pharmacovigilance signal detection","Calculate streaming metrics with windowing and watermarks"],
  toc:[
    {id:"s1",title:"Batch vs Stream: Pharma Decision Framework",level:"h2"},
    {id:"s2",title:"Kafka Architecture for Pharma",level:"h2"},
    {id:"s3",title:"Spark Structured Streaming",level:"h2"},
    {id:"s4",title:"Real-Time Pharmacovigilance",level:"h2"},
    {id:"s5",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Batch vs Stream: Pharma Decision Framework</h2>
<p>Not everything needs to be real-time. The cost and complexity of streaming is justified only when business decisions require low-latency data.</p>
<table><thead><tr><th>Use Case</th><th>Processing Type</th><th>Latency Needed</th><th>Reason</th></tr></thead>
<tbody>
<tr><td>Monthly claims analytics</td><td>Batch (monthly)</td><td>Days acceptable</td><td>Claims have 3–6 month adjudication lag anyway</td></tr>
<tr><td>Weekly brand dashboards</td><td>Batch (weekly/daily)</td><td>Hours acceptable</td><td>Business reviews are weekly; daily refresh overkill</td></tr>
<tr><td>CRM call logging</td><td>Near-real-time (micro-batch)</td><td>Minutes</td><td>Field reps need same-day visibility on peers' calls</td></tr>
<tr><td>Adverse event signal detection</td><td>Streaming</td><td>Seconds to minutes</td><td>Patient safety — 15-day FDA reporting requirement</td></tr>
<tr><td>Patient adherence alerts</td><td>Streaming</td><td>Hours</td><td>Hub nurses need same-day gap detection for outreach</td></tr>
<tr><td>Drug diversion detection</td><td>Streaming</td><td>Real-time</td><td>Controlled substance monitoring requires immediate alerts</td></tr>
</tbody></table>
<div class="callout warning"><div class="callout-title">Don't Stream Everything</div><p>Streaming pipelines are 3–5x more complex to build, test, and maintain than batch pipelines. Every streaming requirement should pass the "Would a 4-hour delay cause a measurable business impact?" test. If not, batch is the right answer. Premature streaming optimization is one of the most expensive mistakes in data engineering.</p></div>`},
    {id:"s2",content:`<h2 id="s2">Kafka Architecture for Pharma</h2>
<p>Apache Kafka is the dominant event streaming platform — a durable, distributed log that decouples data producers (EMR, hub systems, CRM) from consumers (alerting engines, analytics, ML models).</p>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Producer = KafkaProducer(</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Value Serializer = lambda v: json.dumps(v).encode('utf − 8'),</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Key Serializer = lambda k: k.encode('utf − 8'),</div>
</div>`},
    {id:"s3",content:`<h2 id="s3">Spark Structured Streaming</h2>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Spark = SparkSession.builder \</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Refill Stream = spark.readStream \</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Refill Schema = StructType([</div>
</div>`},
    {id:"s4",content:`<h2 id="s4">Real-Time Pharmacovigilance</h2>
<p>The FDA requires manufacturers to report serious adverse events within 15 calendar days (7 days for fatal/life-threatening). Real-time AE detection pipelines close the gap between AE occurrence and reporting:</p>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Ae Stream = medical events stream.filter(</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">(F.Col("Active Drug") = = drug name) &</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Ae Counts = ae stream \</div>
</div>
<div class="callout warning"><div class="callout-title">15-Day FDA Clock</div><p>The FDA MedWatch 15-day expedited reporting clock starts when any employee of the manufacturer becomes aware of a serious unexpected adverse event — not when the clinical team reviews it. Real-time AE monitoring that alerts the pharmacovigilance team immediately prevents clock-start ambiguity and ensures compliant reporting timelines.</p></div>`},
    {id:"s5",content:`<h2 id="s5">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>Not everything needs streaming — apply the "Would a 4-hour delay cause measurable business harm?" test before committing to streaming architecture; batch processing is 3–5x simpler and should be the default.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>Kafka partitioning by patient_id ensures all events for one patient route to the same partition, enabling stateful aggregations (PDC, adherence gaps) without cross-partition shuffles.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Watermarks in Spark Structured Streaming are mandatory for windowed aggregations — they tell Spark how late an event can arrive and still be included, balancing completeness against output latency.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>The FDA 15-day AE reporting clock starts at awareness, not clinical review — real-time pharmacovigilance pipelines that alert the safety team immediately prevent inadvertent clock-start violations that can result in FDA warning letters.</div></div>`}],
  questions:[
    {id:"q1",text:"A pharma company wants to build a 'real-time' sales call logging system so reps can see peer call activity instantly. After requirements gathering, you learn that 'instantly' means 'before the next day's planning meeting.' What processing architecture is appropriate?",
     options:["Full Kafka + Spark Streaming pipeline with millisecond latency","Micro-batch pipeline refreshing every 15–30 minutes — satisfies the actual business need at 10% of the streaming complexity cost","Daily batch ETL is sufficient","Real-time is never needed for CRM data"],
     correct:1,explanation:"'Before the next day's planning meeting' means hours are acceptable — not milliseconds. A micro-batch pipeline (Airflow DAG running every 15–30 minutes, or Spark Structured Streaming with trigger-once mode) delivers the business value at dramatically lower engineering complexity and maintenance cost. Reserve full streaming for use cases where seconds genuinely matter (AE detection, drug diversion)."},
    {id:"q2",text:"In Spark Structured Streaming, a watermark of '7 days' is set on refill events. What does this mean?",
     options:["Spark waits 7 days before processing any event","Events arriving more than 7 days after their event timestamp are considered late and may be dropped from windowed aggregations — Spark can safely discard state older than 7 days","All events must arrive within 7 days of each other","The pipeline processes data from the last 7 days only"],
     correct:1,explanation:"Watermarks define the maximum acceptable late arrival time. Spark uses the watermark to know when a time window is 'complete enough' to emit results and when it's safe to discard accumulated state. With a 7-day watermark, events arriving up to 7 days late are still included in windowed counts. Events arriving more than 7 days late after the window should have closed may be dropped. This balances data completeness against memory/latency."},
    {id:"q3",text:"Your real-time AE monitoring pipeline detects a signal: 15 thrombotic events in patients on Drug X in the past 24 hours vs. a baseline of 2.5/day. What is the immediate regulatory obligation?",
     options:["Wait for the monthly safety review meeting","Notify the pharmacovigilance team immediately so they can evaluate the cases and meet the 15-day expedited FDA reporting clock for serious unexpected adverse events","Disable the alert and re-tune the detection threshold","Report to FDA within 90 days in the next periodic safety update"],
     correct:1,explanation:"Serious unexpected adverse events require FDA MedWatch expedited reporting within 15 calendar days (7 days for fatal/life-threatening). The clock starts at manufacturer awareness — which just occurred when the pipeline fired the alert. The pharmacovigilance team must begin case evaluation immediately. Waiting for a monthly meeting would almost certainly violate the 15-day requirement, potentially triggering FDA warning letters and inspection."}
  ]
},

"6-5": {
  id:"6-5", title:"DataOps & Analytics Engineering", domain:"Data Engineering for Pharma", domain_id:6,
  level:"Intermediate", mins:36, available:true,
  tags:["DataOps","CI/CD","Testing","dbt","Analytics Engineering","Data Quality","Git"],
  objectives:["Apply CI/CD practices to data pipelines and dbt projects","Build a comprehensive dbt testing strategy for claims data","Implement data quality monitoring in production","Use git workflows for collaborative analytics engineering","Design a DataOps maturity framework for pharma analytics teams"],
  toc:[
    {id:"s1",title:"DataOps Principles",level:"h2"},
    {id:"s2",title:"dbt Testing Strategy",level:"h2"},
    {id:"s3",title:"CI/CD for Data Pipelines",level:"h2"},
    {id:"s4",title:"Data Observability",level:"h2"},
    {id:"s5",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">DataOps Principles</h2>
<p><strong>DataOps</strong> applies DevOps and Agile principles to data engineering — treating data pipelines as software with automated testing, version control, continuous integration, and monitoring.</p>
<p>The DataOps maturity model for pharma:</p>
<table><thead><tr><th>Level</th><th>State</th><th>Characteristics</th><th>Pharma Example</th></tr></thead>
<tbody>
<tr><td><strong>1 — Ad Hoc</strong></td><td>Chaotic</td><td>Manual SQL scripts, no version control, no tests</td><td>Analyst exports claims CSV, transforms in Excel, emails to brand team</td></tr>
<tr><td><strong>2 — Managed</strong></td><td>Repeatable</td><td>Scheduled jobs, some documentation, basic monitoring</td><td>Airflow DAGs run on schedule; failures alert on Slack</td></tr>
<tr><td><strong>3 — Defined</strong></td><td>Standardized</td><td>Git version control, peer review, automated tests, dbt</td><td>All models in git, PR review required, dbt tests run on every commit</td></tr>
<tr><td><strong>4 — Quantitatively Managed</strong></td><td>Measured</td><td>SLAs defined, data quality KPIs tracked, cost monitoring</td><td>99.5% claims freshness SLA; data quality score dashboard; monthly spend reports</td></tr>
<tr><td><strong>5 — Optimizing</strong></td><td>Continuous improvement</td><td>ML-powered anomaly detection, self-healing pipelines, proactive alerting</td><td>Monte Carlo auto-detects volume drops; pipelines auto-retry with exponential backoff</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">Most Pharma Teams Are at Level 1–2</div><p>Despite having sophisticated analytical capabilities, most pharma analytics teams have Level 1–2 DataOps maturity — no version control on SQL, no tests, no documentation. Moving to Level 3 (git + dbt + automated tests) delivers the highest ROI of any data engineering investment and takes 3–6 months for a motivated team.</p></div>`},
    {id:"s2",content:`<h2 id="s2">dbt Testing Strategy</h2>
<div class="callout info"><div class="callout-title">dbt Data Quality Contract (schema.yml)</div>
<p>Every dbt model has a schema.yml that defines tests running automatically on every pipeline run:</p>
<table><thead><tr><th>Test Type</th><th>What It Checks</th><th>Pharma Example</th></tr></thead><tbody>
<tr><td><strong>not_null</strong></td><td>Required fields are always populated</td><td>patient_id, fill_date never missing</td></tr>
<tr><td><strong>unique</strong></td><td>No duplicate rows on key columns</td><td>One row per patient per fill date</td></tr>
<tr><td><strong>accepted_values</strong></td><td>Categorical field within allowed set</td><td>channel IN ("retail","specialty","mail-order")</td></tr>
<tr><td><strong>relationships</strong></td><td>Foreign keys exist in parent table</td><td>Every prescriber_npi exists in HCP master</td></tr>
<tr><td><strong>custom SQL</strong></td><td>Business rule validation</td><td>days_supply BETWEEN 1 AND 365</td></tr>
</tbody></table></div>`},
    {id:"s3",content:`<h2 id="s3">CI/CD for Data Pipelines</h2>
<div class="flow-box">
<div class="rule-step"><div class="rule-step-num">1</div><div class="rule-step-body"><strong>Pull Request Opened</strong><p>Data engineer submits a change to a dbt model — CI pipeline triggers automatically</p></div></div>
<div class="flow-arrow">↓</div>
<div class="rule-step"><div class="rule-step-num">2</div><div class="rule-step-body"><strong>Slim CI Check</strong><p><code>dbt build --select state:modified+</code> — only builds changed models and their downstream dependencies, not the entire project</p></div></div>
<div class="flow-arrow">↓</div>
<div class="rule-step"><div class="rule-step-num">3</div><div class="rule-step-body"><strong>Automated Tests</strong><p>All schema tests (not_null, unique, relationships, accepted_values) run against the changed models</p></div></div>
<div class="flow-arrow">↓</div>
<div class="rule-step"><div class="rule-step-num">4</div><div class="rule-step-body"><strong>Pass/Fail Gate</strong><p>PR cannot merge if any test fails. Results posted back to GitHub with failing row counts and model lineage</p></div></div>
</div>`},
    {id:"s4",content:`<h2 id="s4">Data Observability</h2>
<p>Data observability monitors the health of your data in production — detecting issues before downstream users or regulators find them first:</p>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Self.Context = context</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Max Date = pd.to datetime(claims df['service date']).max()</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Days Stale = (datetime.now()  −  max date).days</div>
</div>`},
    {id:"s5",content:`<h2 id="s5">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>Most pharma analytics teams are at DataOps Level 1–2 — moving to Level 3 (git + dbt + automated tests) is the highest-ROI data engineering investment and achievable in 3–6 months.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>dbt tests run in CI on every PR catch data issues before they reach production — the combination of schema tests (unique, not_null, relationships) and custom SQL tests covers the vast majority of real-world data quality problems.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>CI pipelines should run only on modified models and their downstream dependents (dbt's state:modified+ selector) — running the full project on every PR is prohibitively slow and expensive on large pharma data platforms.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>Data observability must monitor freshness, volume, and schema — a 90-day staleness threshold for claims data aligns with adjudication lag reality; volume deviations >25% from the rolling average signal pipeline or vendor failures.</div></div>`}],
  questions:[
    {id:"q1",text:"A data engineer wants to add a new column to the fact_prescription table that changes how market share is calculated. What DataOps process should be followed?",
     options:["Make the change directly in the production database and notify the team by email","Create a git branch, modify the dbt model, add/update tests, open a pull request for peer review, let CI run automated tests, merge to main after approval — then deploy","Ask the brand team if they want the change first, then make it","Submit a change request ticket and wait 30 days for approval"],
     correct:1,explanation:"This is exactly what DataOps at Level 3+ looks like: git branching isolates the change, dbt model changes are version-controlled, tests verify the new column behaves correctly, PR review catches logical errors, CI automation provides a quality gate, and deployment is controlled and traceable. Changing production directly creates an unauditable, irreversible situation — especially dangerous for a metric as business-critical as market share."},
    {id:"q2",text:"Your dbt CI pipeline takes 4 hours to run because it rebuilds all 200 models on every PR. What is the fix?",
     options:["Upgrade the CI warehouse to a larger size","Use dbt's 'state:modified+' selector with a production manifest to run only changed models and their downstream dependents — typically reduces CI time from hours to minutes","Split the project into two separate dbt repositories","Remove tests to speed up the pipeline"],
     correct:1,explanation:"The 'state:modified+' selector compares the current PR's dbt graph against the production manifest (produced by the last successful prod run) and selects only models that changed plus all their downstream dependents. On a 200-model project where a typical PR touches 3–5 models, this reduces CI from rebuilding 200 models to 5–15 — a 10–40x speedup. The production manifest is stored in S3 or GitHub Artifacts and retrieved at CI start."},
    {id:"q3",text:"Your data observability system shows that fact_prescription daily volume dropped 40% compared to the 30-day rolling average. Before alerting the brand team that 'data is wrong,' what should you check first?",
     options:["Nothing — a 40% drop is always a data quality failure","Check if it's a known holiday, month-end boundary, vendor delivery schedule change, or a claims adjudication lag pattern — volume anomalies have both technical and business explanations","Immediately restore from the previous day's backup","Check if the Snowflake warehouse is running"],
     correct:1,explanation:"Volume anomalies have multiple possible causes: (1) Technical: pipeline failure, file not received, ingestion error; (2) Business: holiday (fewer prescriptions written), month-end boundary (claims submitted later), vendor delivery schedule change; (3) Normal pattern: pharmacy closures, insurance year-end changes. Distinguishing technical from business causes before alerting stakeholders prevents false alarms that erode trust in the monitoring system."}
  ]
},

"6-6": {
  id:"6-6", title:"Data Mesh & Data Products for Pharma", domain:"Data Engineering for Pharma", domain_id:6,
  level:"Advanced", mins:40, available:true,
  tags:["Data Mesh","Data Products","Domain Ownership","Data Contracts","Federated Governance","Self-Serve"],
  objectives:["Understand the data mesh architectural paradigm and its applicability in pharma","Design data products with clear ownership, SLAs, and interfaces","Implement data contracts between producer and consumer teams","Apply federated computational governance for HIPAA-compliant data mesh","Evaluate when data mesh is and is not the right architecture for a pharma organization"],
  toc:[
    {id:"s1",title:"Data Mesh Principles",level:"h2"},
    {id:"s2",title:"Pharma Data Products",level:"h2"},
    {id:"s3",title:"Data Contracts",level:"h2"},
    {id:"s4",title:"Federated Governance in Pharma",level:"h2"},
    {id:"s5",title:"When NOT to Use Data Mesh",level:"h2"},
    {id:"s6",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Data Mesh Principles</h2>
<p><strong>Data Mesh</strong> (Zhamak Dehghani, 2019) decentralizes data ownership from a central data engineering team to the domain teams that produce the data. It rests on four principles:</p>
<table><thead><tr><th>Principle</th><th>Description</th><th>Pharma Application</th></tr></thead>
<tbody>
<tr><td><strong>1. Domain Ownership</strong></td><td>Domains own their data as a product — not just a byproduct</td><td>Commercial team owns prescriber data; Medical Affairs owns KOL data; Supply Chain owns inventory data</td></tr>
<tr><td><strong>2. Data as a Product</strong></td><td>Data has an owner, SLA, documentation, and consumer interface</td><td>"Patient Journey Product" maintained by Patient Analytics team with 99.5% availability SLA</td></tr>
<tr><td><strong>3. Self-Serve Data Platform</strong></td><td>Platform infrastructure enables any domain to publish/consume data without central bottleneck</td><td>Data mesh platform on Snowflake/Databricks; domains provision their own compute and storage</td></tr>
<tr><td><strong>4. Federated Computational Governance</strong></td><td>Global standards (security, compliance, interoperability) enforced automatically — not manually</td><td>HIPAA de-identification automated; data sensitivity tagging enforced by platform; OMOP vocabulary standardized across all domains</td></tr>
</tbody></table>
<div class="callout warning"><div class="callout-title">Data Mesh Is an Organizational Change</div><p>Data mesh is primarily an organizational and cultural change, not a technology change. It requires domain teams to accept data ownership (including quality, freshness, and documentation) — a significant shift from "that's the data team's job." Most data mesh failures occur because domain teams are given ownership without resources, skills, or incentive to exercise it responsibly.</p></div>`},
    {id:"s2",content:`<h2 id="s2">Pharma Data Products</h2>
<p>A <strong>data product</strong> is a self-contained, discoverable, trustworthy data asset with a defined interface, owner, SLA, and documentation — treated like an internal software product.</p>
<div class="callout info"><div class="callout-title">Data Product Specification Template</div>
<p>A data product is formally documented with a spec sheet — like a product brief, but for a dataset:</p>
<table><thead><tr><th>Field</th><th>Description</th><th>Example</th></tr></thead><tbody>
<tr><td><strong>Owner</strong></td><td>Team responsible for quality and SLA</td><td>Patient Analytics Team</td></tr>
<tr><td><strong>Consumers</strong></td><td>Who uses this data product</td><td>Brand team, Medical Affairs, Market Access</td></tr>
<tr><td><strong>Refresh SLA</strong></td><td>How often data is updated and maximum allowed lag</td><td>Weekly; max 3-day lag after source receipt</td></tr>
<tr><td><strong>Schema</strong></td><td>Column definitions with business descriptions</td><td>time_to_therapy: days from diagnosis to first Rx fill</td></tr>
<tr><td><strong>Quality Thresholds</strong></td><td>Minimum acceptable data quality before serving</td><td>≥98% patient match rate; 0 null patient_ids</td></tr>
<tr><td><strong>Access Tier</strong></td><td>Who can access and under what conditions</td><td>PHI-restricted; requires data use agreement</td></tr>
</tbody></table></div>`},
    {id:"s3",content:`<h2 id="s3">Data Contracts</h2>
<p>A <strong>data contract</strong> is a formal, machine-readable agreement between a data producer (team that publishes a data product) and data consumers (teams that depend on it). It specifies what the producer guarantees and what consumers can rely upon.</p>
<div class="callout"><div class="callout-title">Data Contract: Key Terms Between Producer and Consumer</div>
<table><thead><tr><th>Contract Element</th><th>What It Specifies</th><th>Example</th></tr></thead><tbody>
<tr><td><strong>Schema Version</strong></td><td>Versioned schema — consumers know when breaking changes happen</td><td>patient_journey_analytics v2.1.0</td></tr>
<tr><td><strong>SLA</strong></td><td>Freshness guarantee: data will be no older than X hours/days</td><td>Available by 06:00 EST every Monday</td></tr>
<tr><td><strong>Quality Guarantee</strong></td><td>Minimum quality the producer commits to</td><td>completeness ≥ 98%, uniqueness = 100%</td></tr>
<tr><td><strong>Breaking Change Policy</strong></td><td>How much notice before schema changes</td><td>30 days notice before column removal or rename</td></tr>
<tr><td><strong>Deprecation</strong></td><td>Sunset timeline for columns being removed</td><td>legacy_patient_id deprecated 2025-06-30</td></tr>
</tbody></table></div>
<div class="callout info"><div class="callout-title">Data Contracts Prevent Surprise Breakages</div><p>Without data contracts, schema changes by upstream teams silently break downstream analytics — a column renamed at 2am causes brand team dashboards to show null all day. With contracts, breaking changes require 30-day notice and are enforced in CI — both teams have visibility and time to adapt.</p></div>`},
    {id:"s4",content:`<h2 id="s4">Federated Governance in Pharma</h2>
<p>In a data mesh, governance is <em>federated</em> — global standards are enforced automatically by the platform, while domains retain control of their own data product decisions.</p>
<p><strong>What global governance enforces automatically:</strong></p>
<ul>
<li><strong>PII/PHI tagging:</strong> Any column matching known patient identifiers is automatically tagged as PHI — access restrictions applied without manual action</li>
<li><strong>De-identification:</strong> Safe Harbor de-identification applied automatically before data products can be published to less-trusted consumers</li>
<li><strong>OMOP vocabulary:</strong> All diagnosis codes must be mapped to SNOMED; all drugs to RxNorm — enforced as a platform-level constraint, not a team preference</li>
<li><strong>Audit logging:</strong> Every query to every data product is logged with user, timestamp, and query text — HIPAA-compliant access audit trail enforced by platform</li>
</ul>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Col Name = field['name'].lower()</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Phi Cols = self.scan phi columns(product spec.get('schema', {}))</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">'Approved': Len(Violations) = = 0,</div>
</div>
<table><thead><tr><th>Condition</th><th>Result</th></tr></thead><tbody>
<tr><td>any(pattern in col name for pattern in self.PHI COLUMN PATTERNS)</td><td>phi columns.append(field['name'])</td></tr>
<tr><td>phi cols and product spec.get('consumer tier') = 'external'</td><td>violations.append(f"PHI columns {phi cols} cannot be exposed to external consumers")</td></tr>
<tr><td>any('icd' in f.lower() for f in schema fields)</td><td>violations.append("Raw ICD codes must be mapped to SNOMED before publishing — use OMOP vocabulary mapping")</td></tr>
<tr><td>not product spec.get('sla')</td><td>violations.append("All data products must define SLA (availability, freshness)")</td></tr>
</tbody></table>`},
    {id:"s5",content:`<h2 id="s5">When NOT to Use Data Mesh</h2>
<p>Data mesh is powerful for large, complex organizations but counterproductive in others. Apply this decision framework:</p>
<table><thead><tr><th>Condition</th><th>Data Mesh?</th><th>Better Alternative</th></tr></thead>
<tbody>
<tr><td>Single analytics team, 1–3 data engineers</td><td>No</td><td>Central dbt project + Airflow; data mesh overhead exceeds benefit</td></tr>
<tr><td>&lt;5 distinct data domains</td><td>No</td><td>Central data warehouse with clear schema ownership</td></tr>
<tr><td>Strict regulatory data lineage requirements (FDA clinical trials)</td><td>Cautiously</td><td>Central data vault with full audit trail; federated governance is hard to audit</td></tr>
<tr><td>Large pharma (10+ domains, 50+ engineers, multiple brands)</td><td>Yes</td><td>Data mesh enables scale; central team is the bottleneck</td></tr>
<tr><td>Domain teams have data engineering skills</td><td>Yes</td><td>Teams can own their products responsibly</td></tr>
<tr><td>Domain teams are pure business users with no engineering skills</td><td>No</td><td>Data ownership without skills = data chaos, not data mesh</td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">The Organizational Prerequisite</div><p>Data mesh only works when domain teams genuinely want to own their data as a product — not as an additional burden forced on them by IT. The most successful pharma data mesh implementations start with one willing domain team, demonstrate value, and let organic adoption drive the rest. Top-down mandates almost always fail.</p></div>`},
    {id:"s6",content:`<h2 id="s6">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>Data mesh is primarily an organizational change — domains take ownership of data as a product with SLAs, documentation, and quality responsibilities. Technology is secondary; culture is the hard part.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>Data products need a specification: owner, SLA (availability + freshness), schema documentation, data contract, and consumer interface — without these, "data product" is just a rebranded dataset.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Data contracts prevent silent breakages — a 30-day notice requirement for breaking schema changes transforms the relationship between upstream and downstream teams from adversarial to collaborative.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>Do NOT implement data mesh for small teams or organizations with fewer than 5 distinct data domains — the governance overhead exceeds the benefit; a well-run central data platform is the right answer for most pharma analytics organizations.</div></div>`}],
  questions:[
    {id:"q1",text:"A pharma company has 3 data engineers supporting 12 brand teams, 2 market access teams, and 1 medical affairs team. The central team is overwhelmed. Should they adopt data mesh?",
     options:["Yes — data mesh solves the bottleneck by distributing ownership","Not necessarily — data mesh requires domain teams to have engineering skills and willingness to own data products. The better first step is hiring 2–3 more engineers and implementing DataOps Level 3 (git, dbt, CI/CD) to multiply the existing team's productivity","Yes — data mesh always solves resourcing problems","No — data mesh is only for technology companies"],
     correct:1,explanation:"Data mesh shifts work from the central team to domain teams — but only if domain teams can absorb it. If brand managers and market access teams have no data engineering capability, transferring 'ownership' just means they complain about quality without being able to fix it. The more immediate fix is DataOps maturity improvement (automating repetitive work) and targeted hiring. Evaluate data mesh only after domain teams have developed some analytical engineering capability."},
    {id:"q2",text:"A data contract specifies that the 'days_to_treatment' field will always be an INTEGER. The producer team changes it to FLOAT to accommodate decimal precision. No notification is sent to consumers. What type of change is this and what should happen?",
     options:["Minor change — float is compatible with integer, no notification needed","This is a breaking change — consumer code expecting INTEGER may fail with FLOAT in some languages/tools; the data contract required 30 days advance notice; the producer team violated the contract and must communicate immediately and provide remediation support","The consumer team should detect this automatically","FLOAT and INTEGER are always interchangeable in SQL"],
     correct:1,explanation:"Changing a column's data type is a breaking change in data contracts — code that reads INTEGER and processes it as such may fail, produce incorrect results, or silently truncate when receiving FLOAT. The 30-day notice requirement exists precisely for this scenario. The producer team violated the contract and owes consumers immediate notification plus support to update their consuming code. This kind of incident, without a contract, would silently break dashboards with no accountability."},
    {id:"q3",text:"In a pharma data mesh, which governance standard MUST be enforced at the platform level (not left to individual domain teams)?",
     options:["Which visualization tool each domain uses","HIPAA PHI identification and access controls — allowing domains to implement their own PHI handling creates inconsistent protection and regulatory exposure","The naming conventions for domain-specific tables","Which programming language domain engineers use"],
     correct:1,explanation:"PHI protection under HIPAA is a non-negotiable compliance requirement — it cannot be implemented inconsistently across domains. Platform-level enforcement means: every column flagged as PHI gets automatic access controls, every access is audit-logged, and de-identification is applied before data leaves the trust boundary. If each domain implements this differently, some will inevitably fail, creating regulatory exposure for the entire organization. This is the core principle of 'federated computational governance' — global standards automated at the platform, not delegated to individual teams."}
  ]
},

"6-7": {
  id:"6-7", title:"Distributed Computing & Apache Spark", domain:"Data Engineering for Pharma", domain_id:6,
  level:"Intermediate", mins:55, available:true,
  tags:["Apache Spark","PySpark","Distributed Computing","RDDs","DataFrames","Delta Lake","Spark Optimization"],
  objectives:["Understand distributed computing fundamentals and the Spark execution model","Write efficient PySpark code using DataFrames and Spark SQL","Apply Spark optimization techniques: partitioning, caching, broadcast joins","Use Delta Lake for ACID transactions on data lakes","Debug common Spark performance issues"],
  toc:[
    {id:"s1",title:"Distributed Computing Fundamentals",level:"h2"},
    {id:"s2",title:"Spark Architecture: Driver, Executors & DAG",level:"h2"},
    {id:"s3",title:"PySpark DataFrames & Spark SQL",level:"h2"},
    {id:"s4",title:"Spark Optimization: Partitioning, Caching & Joins",level:"h2"},
    {id:"s5",title:"Delta Lake: ACID on Data Lakes",level:"h2"},
    {id:"s6",title:"Debugging Spark Performance",level:"h2"},
    {id:"s7",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Distributed Computing Fundamentals</h2>
<p>Distributed computing solves a fundamental problem: when data exceeds single-machine memory and compute capacity, we must split work across many machines and coordinate them.</p>
<table><thead><tr><th>Concept</th><th>Definition</th><th>Spark Implementation</th></tr></thead>
<tbody>
<tr><td>Parallelism</td><td>Multiple tasks executing simultaneously across CPU cores</td><td>Multiple executor threads; controlled by spark.executor.cores</td></tr>
<tr><td>Partitioning</td><td>Dividing data into chunks that can be processed independently</td><td>RDD/DataFrame partitions; default = 200 after shuffle</td></tr>
<tr><td>Fault tolerance</td><td>Job completes even if nodes fail during execution</td><td>RDD lineage; task retry on executor failure</td></tr>
<tr><td>Data locality</td><td>Move compute to where data lives (not data to compute)</td><td>HDFS-aware scheduling; S3/ADLS colocation patterns</td></tr>
<tr><td>Shuffling</td><td>Redistributing data across executors by key — the expensive operation</td><td>groupBy, join, sort trigger shuffle; avoid when possible</td></tr>
</tbody></table>
<p>Spark vs. alternatives for common data engineering tasks:</p>
<table><thead><tr><th>Workload</th><th>Spark Strength</th><th>Consider Instead</th></tr></thead>
<tbody>
<tr><td>Processing 10GB CSV</td><td>Overkill; pandas or duckdb faster</td><td>pandas, polars, duckdb</td></tr>
<tr><td>Processing 10TB Parquet in S3</td><td>Excellent — native S3 connector, partition pruning, Catalyst optimizer</td><td>BigQuery, Snowflake if already in cloud DW</td></tr>
<tr><td>ML training on tabular data</td><td>Spark MLlib for distributed training; data prep at scale</td><td>XGBoost single-node if data fits in RAM</td></tr>
<tr><td>Stream processing</td><td>Spark Structured Streaming — micro-batch; good for 1-10 second latency</td><td>Apache Flink for true sub-second streaming</td></tr>
<tr><td>Graph processing</td><td>GraphX (lower-level); GraphFrames (DataFrame API)</td><td>Neo4j for persistent graph queries</td></tr>
</tbody></table>`},
    {id:"s2",content:`<h2 id="s2">Spark Architecture: Driver, Executors & DAG</h2>
<p>Understanding Spark's architecture is essential to diagnosing failures and performance issues:</p>
<div class="flow-box">
<div class="rule-step"><div class="rule-step-num">1</div><div class="rule-step-body"><strong>User Code (Python / SQL / Scala)</strong><p>Data engineer writes transformations using familiar syntax — Spark translates to distributed operations automatically</p></div></div>
<div class="flow-arrow">↓</div>
<div class="rule-step"><div class="rule-step-num">2</div><div class="rule-step-body"><strong>Driver Program (SparkContext)</strong><p>Coordinates the job — breaks work into tasks, schedules on worker nodes, collects results</p></div></div>
<div class="flow-arrow">↓</div>
<div class="rule-step"><div class="rule-step-num">3</div><div class="rule-step-body"><strong>Cluster Manager (YARN / Kubernetes)</strong><p>Allocates compute resources (memory + CPU) across the cluster; scales up/down based on job size</p></div></div>
<div class="flow-arrow">↓</div>
<div class="rule-step"><div class="rule-step-num">4</div><div class="rule-step-body"><strong>Worker Nodes (Executors)</strong><p>Each executor processes its partition of data in parallel — 200 GB claims file split across 50 nodes = 4 GB each</p></div></div>
<div class="flow-arrow">↓</div>
<div class="rule-step"><div class="rule-step-num">5</div><div class="rule-step-body"><strong>Result Written to Storage</strong><p>Aggregated output written back to data lake (Delta/Parquet) or data warehouse (Snowflake)</p></div></div>
</div>
<p>Key concepts from the execution model:</p>
<ul>
<li><strong>Job:</strong> Triggered by an action (count(), write(), show())</li>
<li><strong>Stage:</strong> Set of tasks that can run without a shuffle; stages are separated by shuffles</li>
<li><strong>Task:</strong> One unit of work on one partition; one task per core per slot</li>
<li><strong>DAG:</strong> The dependency graph of stages; Spark's optimizer (Catalyst) rewrites it for efficiency</li>
</ul>
<div class="callout info"><div class="callout-title">Transformations vs. Actions</div><p>Spark is lazy: transformations (filter, select, join, groupBy) build the computation graph but do NOT execute. Actions (count, collect, show, write) trigger execution. This allows Catalyst to optimize the full logical plan before any work happens. The most common beginner mistake: calling collect() on a large DataFrame — this pulls all data to the driver, causing OOM crashes.</p></div>`},
    {id:"s3",content:`<h2 id="s3">PySpark DataFrames & Spark SQL</h2>
<p>The DataFrame API is the primary modern Spark interface — it generates the same optimized code as Spark SQL and is preferable to the low-level RDD API for all analytical workloads.</p>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Spark = SparkSession.builder \</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Claims = spark.read.parquet("s3: ÷  ÷ pharma − datalake ÷ claims ÷ medical ÷ year=2024 ÷ ")</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">.Filter(F.Col("Service Date") > = "2024 − 01 − 01")</div>
</div>`},
    {id:"s4",content:`<h2 id="s4">Spark Optimization: Partitioning, Caching & Joins</h2>
<p>Spark performance is governed by three levers: how data is partitioned, what is cached, and how joins are executed.</p>
<p><strong>1. Partitioning</strong></p>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Df Repartitioned = df.repartition(200)  # Triggers full shuffle</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Df Smaller = df.coalesce(10)</div>
</div>
<p><strong>2. Caching</strong></p>
<div class="flow-box"><div class="rule-step"><div class="rule-step-num">1</div><div class="rule-step-body"><strong>Cache DataFrames that are used multiple times</strong></div></div>
<div class="rule-step"><div class="rule-step-num">2</div><div class="rule-step-body"><strong>Without cache: Spark recomputes from scratch for each action</strong></div></div>
<div class="rule-step"><div class="rule-step-num">3</div><div class="rule-step-body"><strong>Force materialization (cache is lazy by default)</strong></div></div>
<div class="rule-step"><div class="rule-step-num">4</div><div class="rule-step-body"><strong>Clean up when done (prevent memory pressure)</strong></div></div>
</div>
<p><strong>3. Join Strategies</strong></p>
<table><thead><tr><th>Join Type</th><th>Mechanism</th><th>Use When</th><th>Config</th></tr></thead>
<tbody>
<tr><td>Broadcast join</td><td>Small table broadcast to all executors; no shuffle of large table</td><td>One table &lt; 10MB (configurable)</td><td>spark.sql.autoBroadcastJoinThreshold = 10MB</td></tr>
<tr><td>Sort-merge join</td><td>Both tables sorted + shuffled by join key; merge in parallel</td><td>Both tables large; default fallback</td><td>Most common; shuffle-intensive</td></tr>
<tr><td>Shuffle hash join</td><td>Hash both tables by join key</td><td>Medium tables; no sort required</td><td>Adaptive Query Execution selects automatically</td></tr>
</tbody></table>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Npi Master = spark.read.parquet("s3: ÷  ÷ npi − master ÷ ")  # Small: 50MB</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Large Claims = spark.read.parquet("s3: ÷  ÷ claims ÷ ")    # Large: 5TB</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Result = large claims.join(broadcast(npi master), "npi", "left")</div>
</div>`},
    {id:"s5",content:`<h2 id="s5">Delta Lake: ACID on Data Lakes</h2>
<p><strong>Delta Lake</strong> is an open-source storage layer that brings ACID transactions, schema enforcement, and time travel to data lakes (S3, ADLS, GCS). It solves the core limitations of raw Parquet/CSV data lakes.</p>
<table><thead><tr><th>Problem with Raw Parquet Lake</th><th>Delta Lake Solution</th></tr></thead>
<tbody>
<tr><td>No ACID — partial writes corrupt data</td><td>Transaction log (JSON) records every write; atomic commit or rollback</td></tr>
<tr><td>No schema enforcement — anyone can write any schema</td><td>Schema enforcement and evolution with ALTER TABLE support</td></tr>
<tr><td>No time travel — can't query yesterday's data</td><td>Delta log enables point-in-time queries and rollback</td></tr>
<tr><td>No upsert — can't update individual rows in Parquet</td><td>MERGE INTO with full SQL upsert semantics</td></tr>
<tr><td>Slow metadata — listing millions of files takes minutes</td><td>Transaction log caches file manifest; 1000x faster metadata reads</td></tr>
</tbody></table>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Delta Table = DeltaTable.forPath(spark, "s3: ÷  ÷ pharma − lake ÷ delta ÷ claims ÷ ")</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">"Target.Claim Id = source.claim id"</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Claims Yesterday = spark.read.format("delta") \</div>
</div>`},
    {id:"s6",content:`<h2 id="s6">Debugging Spark Performance</h2>
<p>Spark UI (available at port 4040 during job) is the primary debugging tool. Learn to read it before escalating performance issues:</p>
<table><thead><tr><th>Symptom</th><th>Root Cause</th><th>Fix</th></tr></thead>
<tbody>
<tr><td>One task takes 10x longer than others</td><td>Data skew — one partition has vastly more data (e.g., NULL key group)</td><td>Salting: add random suffix to join key; repartition by random + key; handle NULLs separately</td></tr>
<tr><td>OOM (OutOfMemoryError) on executors</td><td>Partition too large; too many aggregations in memory; no spill to disk</td><td>Increase spark.executor.memory; reduce partition size; enable spill: spark.memory.fraction=0.6</td></tr>
<tr><td>Thousands of tiny files written</td><td>Coalescing not applied before write; too many partitions</td><td>df.coalesce(N).write... or OPTIMIZE in Delta Lake</td></tr>
<tr><td>Job slow despite many executors</td><td>Shuffle bottleneck; too much data moved between stages</td><td>Broadcast small tables; use AQE; reduce shuffle partitions</td></tr>
<tr><td>Driver OOM</td><td>collect() on large DataFrame; toPandas() on millions of rows</td><td>Never collect large data to driver; use write() instead; sample if needed</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">Adaptive Query Execution (AQE)</div><p>Spark 3.0+ AQE automatically: (1) coalesces shuffle partitions based on actual data size, (2) converts sort-merge joins to broadcast joins when runtime statistics show one table is small, (3) handles data skew by splitting skewed partitions. Always enable: spark.sql.adaptive.enabled=true. AQE eliminates many traditional tuning needs automatically.</p></div>`},
    {id:"s7",content:`<h2 id="s7">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>Spark is lazy — transformations build a DAG but don't execute until an action triggers the job. Catalyst optimizes the entire plan before execution, which is why Spark SQL and DataFrame API generate identical code.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>Shuffle is the most expensive Spark operation — reduce it by broadcasting small tables, partitioning data by join keys before joins, and enabling Adaptive Query Execution (AQE) in Spark 3.0+.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Delta Lake brings ACID transactions, time travel, and upsert (MERGE INTO) to data lakes — it is the standard storage format for production Spark/Databricks pipelines because raw Parquet lacks all three.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>Data skew (one partition with 100x more data than others) is the most common Spark performance killer — identify it via Spark UI task duration variance and fix with key salting.</div></div>`}],
  questions:[
    {id:"q1",text:"A Spark job joins a 5TB claims table with a 45MB NPI reference table using the default sort-merge join. The job takes 3 hours. What is the most impactful single optimization?",
     options:["Add more executors to the cluster","Increase spark.sql.shuffle.partitions from 200 to 2000","Apply a broadcast join hint to the 45MB NPI table, eliminating the 5TB shuffle","Cache the claims table in memory"],
     correct:2,explanation:"Sort-merge join requires shuffling BOTH tables by the join key — shuffling 5TB of claims data across the network is the bottleneck taking most of the 3 hours. Broadcasting the 45MB NPI table sends it to every executor (45MB × number of executors = manageable) and then the join is performed locally without shuffling the large table at all. This reduces the shuffle from 5TB to effectively 0 for the large table. The broadcast threshold (autoBroadcastJoinThreshold) is 10MB by default — at 45MB, you need to explicitly hint: large_claims.join(broadcast(npi_master), 'npi')."},
    {id:"q2",text:"In the Spark UI, Stage 3 shows 199 tasks completing in 8-12 seconds, while Task #87 takes 4 minutes. What is this called and what causes it?",
     options:["An executor failure that will be automatically retried","Data skew — one partition has significantly more data than others, typically because a join key or group-by key has a highly imbalanced distribution (e.g., 'Unknown' NPI represents 40% of claims)","A network timeout between executor and driver","The task is reading from a slow S3 bucket in a different region"],
     correct:1,explanation:"This is textbook data skew: 199 out of 200 tasks complete in 10 seconds but one task takes 24x longer because it received 24x more data. The job cannot complete until every task finishes, so this one skewed task controls total runtime. Common causes in pharma: NULL values all routed to one partition ('null' is a valid group-by value), a single large HCP or hospital NPI representing a disproportionate share of claims, or a date range with an extreme spike. Fix: salt the join key (add a random 0-4 suffix, multiply the small table), or pre-filter and handle the dominant key separately."},
    {id:"q3",text:"Why does Delta Lake's transaction log make MERGE (upsert) operations possible when raw Parquet does not support them?",
     options:["Delta Lake uses a relational database under the hood","Parquet files are immutable — you cannot modify individual rows in place. Delta Lake's transaction log tracks which files contain which data; a MERGE writes new files with updated rows and new rows, then atomically updates the transaction log to mark old files as deleted and new files as current. From outside, this appears as an in-place update while the files themselves are always written immutably.","Delta Lake compresses files more efficiently than Parquet","MERGE requires Spark 4.0 which only supports Delta Lake format"],
     correct:1,explanation:"Parquet files are write-once immutable objects. To 'update' a row in Parquet, you'd have to rewrite the entire file — with no atomicity guarantee. Delta Lake solves this with its transaction log architecture: every write operation is recorded in the log as an atomic commit. A MERGE operation: (1) finds files containing rows that match the merge condition, (2) reads those files, applies the update/insert logic, writes new files with the changed rows, (3) adds a new transaction log entry that points to the new files and marks old files as logically deleted. The operation is atomic — either the entire transaction log entry commits or none of it does."}
  ]
},

"6-8": {
  id:"6-8", title:"Cloud Architecture for Data Engineers", domain:"Data Engineering for Pharma", domain_id:6,
  level:"Intermediate", mins:50, available:true,
  tags:["Cloud Architecture","AWS","Azure","GCP","S3","Data Lake","Cloud Storage","Compute Patterns","Cost Optimization","Security"],
  objectives:["Map major cloud data services across AWS/Azure/GCP","Design a cloud-native data lake architecture","Apply security and compliance patterns for healthcare data","Optimize cloud data infrastructure costs","Understand multi-cloud and hybrid-cloud patterns"],
  toc:[
    {id:"s1",title:"Cloud Data Services Landscape",level:"h2"},
    {id:"s2",title:"Data Lake Architecture on Cloud",level:"h2"},
    {id:"s3",title:"Compute Patterns: Serverless, Containers & VMs",level:"h2"},
    {id:"s4",title:"Security & Compliance for Healthcare Data",level:"h2"},
    {id:"s5",title:"Cost Optimization Strategies",level:"h2"},
    {id:"s6",title:"Multi-Cloud & Hybrid Patterns",level:"h2"},
    {id:"s7",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Cloud Data Services Landscape</h2>
<p>Every major cloud provider offers a similar set of data services. Knowing the equivalents lets you transfer expertise across clouds and make vendor-agnostic architectural decisions.</p>
<table><thead><tr><th>Category</th><th>AWS</th><th>Azure</th><th>GCP</th></tr></thead>
<tbody>
<tr><td>Object storage</td><td>S3</td><td>Azure Blob Storage / ADLS Gen2</td><td>Google Cloud Storage (GCS)</td></tr>
<tr><td>Data warehouse</td><td>Redshift</td><td>Azure Synapse Analytics</td><td>BigQuery</td></tr>
<tr><td>Spark / Big data</td><td>EMR (Elastic MapReduce)</td><td>Azure HDInsight / Synapse Spark</td><td>Dataproc</td></tr>
<tr><td>Stream processing</td><td>Kinesis</td><td>Azure Event Hubs</td><td>Pub/Sub + Dataflow</td></tr>
<tr><td>ETL / Pipeline</td><td>AWS Glue</td><td>Azure Data Factory</td><td>Cloud Dataflow / Composer</td></tr>
<tr><td>Serverless functions</td><td>Lambda</td><td>Azure Functions</td><td>Cloud Functions</td></tr>
<tr><td>Container orchestration</td><td>EKS (Kubernetes)</td><td>AKS (Kubernetes)</td><td>GKE (Kubernetes)</td></tr>
<tr><td>ML platform</td><td>SageMaker</td><td>Azure Machine Learning</td><td>Vertex AI</td></tr>
<tr><td>Secret management</td><td>Secrets Manager / Parameter Store</td><td>Azure Key Vault</td><td>Secret Manager</td></tr>
<tr><td>Identity & Access</td><td>IAM</td><td>Azure AD / RBAC</td><td>Cloud IAM</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">Pharma Cloud Adoption Patterns</div><p>Most large pharma companies run multi-cloud: AWS for US commercial analytics (Snowflake hosted on AWS), Azure for enterprise Microsoft integration (Teams, Office 365, Power BI), and sometimes GCP for specific AI/ML workloads (Vertex AI, BigQuery). A single primary cloud with a minority secondary is the most common architecture.</p></div>`},
    {id:"s2",content:`<h2 id="s2">Data Lake Architecture on Cloud</h2>
<p>The modern cloud data lake follows a <strong>medallion architecture</strong>: Bronze (raw) → Silver (cleaned/joined) → Gold (business-ready). Each layer has different access patterns, retention policies, and quality guarantees.</p>
<div class="callout info"><div class="callout-title">Medallion Architecture — Folder Structure</div>
<table><thead><tr><th>Layer</th><th>Path</th><th>Contents</th><th>Who Accesses</th></tr></thead><tbody>
<tr><td><strong>Bronze (Raw)</strong></td><td>s3://pharma-lake/bronze/</td><td>Exact copy of vendor file as received — never modified</td><td>Data engineers only</td></tr>
<tr><td><strong>Silver (Clean)</strong></td><td>s3://pharma-lake/silver/</td><td>Standardized, deduplicated, validated — OMOP-mapped</td><td>Data engineers, data scientists</td></tr>
<tr><td><strong>Gold (Analytics-Ready)</strong></td><td>s3://pharma-lake/gold/</td><td>Business-logic applied, KPIs calculated, joined cohorts</td><td>Analysts, dashboards, ML models</td></tr>
</tbody></table>
<div class="callout warning"><div class="callout-title">The Bronze Zone is Sacred</div><p>Raw files in the bronze zone are immutable — never overwrite them. If a transformation produces wrong results, you can always reprocess from the original source file. Overwriting raw data destroys your audit trail and creates regulatory risk.</p></div></div>
<p>S3 access patterns and performance optimization:</p>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Writer = df.write.format("parquet") \</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Writer = writer.partitionBy( × partition cols)</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">S3 = boto3.client('s3')</div>
</div>
<table><thead><tr><th>Condition</th><th>Result</th></tr></thead><tbody>
<tr><td>partition cols</td><td>writer = writer.partitionBy(*partition cols)</td></tr>
</tbody></table>`},
    {id:"s3",content:`<h2 id="s3">Compute Patterns: Serverless, Containers & VMs</h2>
<p>Choosing the right compute pattern determines cost efficiency, scalability, and operational overhead:</p>
<table><thead><tr><th>Pattern</th><th>Examples</th><th>Best For</th><th>Cost Model</th></tr></thead>
<tbody>
<tr><td>Serverless functions</td><td>AWS Lambda, Azure Functions</td><td>Event-driven triggers; &lt;15min jobs; low-frequency tasks</td><td>Pay per invocation + duration; free tier often covers dev</td></tr>
<tr><td>Containers (Kubernetes)</td><td>EKS, AKS, GKE</td><td>Long-running services; microservices; Airflow workers</td><td>Pay for node uptime; optimize with spot instances</td></tr>
<tr><td>Managed Spark clusters</td><td>EMR, Databricks, Dataproc</td><td>Large-scale data processing; interactive analytics</td><td>Per-node per-hour; autoscaling critical for cost</td></tr>
<tr><td>Serverless SQL</td><td>BigQuery, Athena, Synapse Serverless</td><td>Ad-hoc query on S3/GCS without cluster management</td><td>Pay per TB scanned; optimize with partitioning/columnar format</td></tr>
<tr><td>GPU instances</td><td>p3/p4 (AWS), NC (Azure)</td><td>DL training; LLM inference; computer vision</td><td>$2–30/hr; spot instances for training; reserved for inference</td></tr>
</tbody></table>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">S3 Key = event['Records'][0]['s3']['object']['key']</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Bucket = event['Records'][0]['s3']['bucket']['name']</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Glue = boto3.client('glue')</div>
</div>
<table><thead><tr><th>Condition</th><th>Result</th></tr></thead><tbody>
<tr><td>not s3 key.startswith('bronze/claims/komodo/')</td><td>return {'statusCode': 200, 'body': 'Skipped — not a claims file'}</td></tr>
</tbody></table>`},
    {id:"s4",content:`<h2 id="s4">Security & Compliance for Healthcare Data</h2>
<p>Healthcare data in the cloud requires a defense-in-depth security architecture. HIPAA Business Associate Agreements (BAAs) must be in place with cloud providers before any PHI is stored.</p>
<table><thead><tr><th>Security Layer</th><th>Control</th><th>AWS Implementation</th></tr></thead>
<tbody>
<tr><td>Identity & Access</td><td>Least-privilege IAM roles; MFA for humans</td><td>IAM roles for services; Identity Center for users; no root account usage</td></tr>
<tr><td>Encryption at rest</td><td>All PHI-containing storage encrypted</td><td>S3 SSE-KMS; RDS encryption; EBS encryption; KMS customer-managed keys</td></tr>
<tr><td>Encryption in transit</td><td>TLS 1.2+ for all data movement</td><td>S3 bucket policy enforce HTTPS; VPC endpoints; TLS on RDS/Redshift</td></tr>
<tr><td>Network isolation</td><td>PHI workloads in private subnets; no public internet access</td><td>VPC private subnets; security groups; NACLs; VPC endpoints for S3</td></tr>
<tr><td>Audit logging</td><td>All access to PHI data logged and retained</td><td>CloudTrail for API calls; S3 access logs; Lake Formation audit logs</td></tr>
<tr><td>Data classification</td><td>PHI columns tagged; access governed by classification</td><td>AWS Glue Data Catalog + Lake Formation column-level access control</td></tr>
</tbody></table>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Lf = boto3.client('lakeformation')</div>
</div>`},
    {id:"s5",content:`<h2 id="s5">Cost Optimization Strategies</h2>
<p>Cloud data engineering costs are dominated by three categories: storage, compute, and data transfer. Each requires different optimization strategies.</p>
<table><thead><tr><th>Cost Driver</th><th>Typical % of Bill</th><th>Key Optimizations</th></tr></thead>
<tbody>
<tr><td>Object storage (S3/GCS/ADLS)</td><td>20–40%</td><td>S3 Intelligent-Tiering; lifecycle policies to Glacier; Parquet vs. CSV (10x compression); delete temp files</td></tr>
<tr><td>Compute (EMR, EC2, Databricks)</td><td>40–60%</td><td>Spot/preemptible instances (60-90% discount); auto-termination; right-size instances; autoscaling</td></tr>
<tr><td>Data warehouse (Redshift, BigQuery)</td><td>15–30%</td><td>Partition pruning; columnar filters; materialized views; reserved instances for predictable workloads</td></tr>
<tr><td>Data transfer (egress)</td><td>5–15%</td><td>Keep compute in same region as storage; VPC endpoints (no NAT gateway cost); avoid cross-region data movement</td></tr>
</tbody></table>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Cloudwatch = boto3.client('cloudwatch')</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Response = cloudwatch.get metric statistics(</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Namespace = 'AWS ÷ ElasticMapReduce',</div>
</div>
<table><thead><tr><th>Condition</th><th>Result</th></tr></thead><tbody>
<tr><td>avg memory available &gt; 60</td><td>print(f"Cluster {cluster id} is over-provisioned (avg {avg memory available:.0f}% memory idle)")</td></tr>
<tr><td>elavg memory available &lt; 15</td><td>print("Cluster is under-provisioned — jobs may be spilling to disk")</td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">Spot Instances for Spark Workloads</div><p>AWS Spot instances (preemptible on GCP, low-priority on Azure) run at 60-90% discount but can be interrupted with 2-minute notice. For Spark, the strategy is: run the driver on an On-Demand instance (interruption would kill the job), run all executor/task nodes on Spot. With checkpointing enabled, even a Spot interruption causes only a partial re-computation, not a full job restart. This architecture reduces EMR costs by 50-70% with minimal job completion impact.</p></div>`},
    {id:"s6",content:`<h2 id="s6">Multi-Cloud & Hybrid Patterns</h2>
<p>Most enterprises operate across multiple clouds and on-premise environments. Data engineers must understand how to move data safely and efficiently across boundaries.</p>
<table><thead><tr><th>Pattern</th><th>Use Case</th><th>Technologies</th><th>Key Challenge</th></tr></thead>
<tbody>
<tr><td>Cloud-to-cloud replication</td><td>Data available in multiple clouds for different teams</td><td>AWS DataSync, Azure Data Factory, Fivetran</td><td>Egress costs; data consistency; latency</td></tr>
<tr><td>On-premise to cloud (lift & shift)</td><td>Migrate warehouse to cloud; burst compute to cloud</td><td>AWS Direct Connect, Azure ExpressRoute, Snowflake Data Transfer</td><td>Network bandwidth; security; data residency</td></tr>
<tr><td>Data sharing without movement</td><td>Partner access to data without egress costs</td><td>Snowflake Secure Data Sharing, Delta Sharing, BigQuery Analytics Hub</td><td>Access governance; usage tracking</td></tr>
<tr><td>Open table formats (lakehouse)</td><td>Compute-agnostic access to data (any engine reads same files)</td><td>Delta Lake, Apache Iceberg, Apache Hudi</td><td>Format standardization across teams</td></tr>
</tbody></table>
<div class="callout warning"><div class="callout-title">Data Residency & Sovereignty</div><p>EU GDPR requires that EU patient data not be stored or processed outside the EU without adequate protections. HIPAA requires technical safeguards but does not restrict geographic location (though contracts may). Pharma companies with EU trial data must ensure their cloud architecture keeps EU personal data in EU regions. AWS eu-central-1 (Frankfurt), Azure West Europe/North Europe, and GCP europe-west1 are the primary compliant regions. Cross-region replication of PHI/personal data must be blocked at the infrastructure level (S3 bucket policy, ADLS geo-restriction).</p></div>`},
    {id:"s7",content:`<h2 id="s7">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>Every major cloud offers equivalent data services — S3/ADLS/GCS for storage, Redshift/Synapse/BigQuery for warehousing, EMR/HDInsight/Dataproc for Spark — learn the concepts, and mapping between providers takes minutes.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>The medallion architecture (Bronze → Silver → Gold) is the standard cloud data lake pattern — each layer has different quality guarantees, access controls, and retention policies.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Healthcare data in cloud requires: HIPAA BAA with the provider, encryption at rest (KMS) and in transit (TLS), VPC private subnets for PHI workloads, column-level access controls, and full audit logging — all non-negotiable.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>60-90% cloud cost reduction is achievable by running Spark executor nodes on Spot/preemptible instances, applying S3 lifecycle policies, using columnar formats (Parquet), and right-sizing clusters based on CloudWatch utilization metrics.</div></div>`}],
  questions:[
    {id:"q1",text:"A data engineer stores all analytics data in S3 as CSV files with no partitioning. An Athena query scanning 2TB costs $10. What two changes would most reduce this cost?",
     options:["Switch to a different cloud provider","Convert to Parquet format (reduces scan to ~200GB via compression + predicate pushdown) AND add date partitioning (enables Athena to skip irrelevant partitions) — together reducing scan by ~20-50x and cost to <$1","Add more WHERE clauses to the query","Increase the Athena DPU allocation"],
     correct:1,explanation:"Athena pricing is $5/TB scanned. Two optimizations compound dramatically: (1) Parquet is columnar and compressed — Athena reads only needed columns and snappy compression reduces file size by 5-10x vs. CSV, reducing scan from 2TB to ~200-400GB. (2) Partition pruning: if data is partitioned by year/month and the query filters on dates, Athena reads only matching partition folders — potentially skipping 90%+ of data. Combined, these can reduce Athena costs by 20-50x without any query changes. This is why Parquet + partitioning is the first recommendation for any analytical S3 workload."},
    {id:"q2",text:"Under HIPAA and GDPR, a pharma company wants to share EU clinical trial patient data with a US analytics team. What architecture ensures compliance?",
     options:["Copy all data to US S3 buckets for the analytics team to access directly","De-identify or pseudonymize the EU data in the EU region, then replicate only the de-identified/pseudonymized dataset to the US region. The original identified data never leaves the EU.","Use encrypted transfer — encryption satisfies both HIPAA and GDPR","Grant the US team direct read access to the EU storage bucket"],
     correct:1,explanation:"GDPR restricts transfer of EU personal data outside the EU (Chapter V). Clinical trial patient data is personal data under GDPR. Copying identified data to the US without adequate protections violates GDPR. The compliant architecture: (1) de-identify or pseudonymize data in the EU environment using approved techniques, (2) replicate only the de-identified dataset to US region, (3) maintain the master linkage key in the EU under strict access controls. HIPAA additionally requires a BAA with any cloud provider processing PHI. Encryption satisfies the security requirement but does not address the geographic restriction of GDPR."},
    {id:"q3",text:"An EMR cluster runs Spark jobs nightly for 4 hours. CloudWatch shows YARN memory available averages 72% over the last 30 days. What does this indicate and what is the recommended action?",
     options:["72% memory utilization is optimal — no changes needed","The cluster is over-provisioned — 72% of memory sits idle during jobs. Reduce the number of core nodes by approximately 40%, saving ~40% of nightly compute cost while maintaining sufficient headroom for peak task memory usage.","72% idle memory indicates a data skew problem requiring repartitioning","The cluster needs more memory — 72% is the executor memory fraction limit"],
     correct:1,explanation:"YARN memory available percentage measures unused cluster memory. 72% average idle means the cluster consistently has far more memory than jobs require. For cost optimization: reduce core node count by 30-40% (keeping ~20-30% headroom for GC, spills, and peak tasks). If nightly jobs currently use 28% of memory on 10 nodes, 6 nodes would use ~47% — still well within safe headroom. At $2/node/hour for 4 hours = $80/night on 10 nodes, cutting to 6 nodes saves ~$32/night = ~$11,680/year. Always use autoscaling for dynamic workloads rather than fixed cluster size."}
  ]
},

"6-9": {
  id:"6-9", title:"Data Quality & Pipeline Testing", domain:"Data Engineering for Pharma", domain_id:6,
  level:"Intermediate", mins:45, available:true,
  tags:["Data Quality","Great Expectations","dbt Tests","Data Contracts","Pipeline Testing","Unit Tests","Integration Tests","Data Observability"],
  objectives:["Define the seven dimensions of data quality","Implement automated data quality checks with Great Expectations and dbt","Write unit, integration, and end-to-end tests for data pipelines","Design data contracts between upstream and downstream teams","Build data observability monitoring"],
  toc:[
    {id:"s1",title:"The Seven Dimensions of Data Quality",level:"h2"},
    {id:"s2",title:"Great Expectations: Validation Framework",level:"h2"},
    {id:"s3",title:"dbt Tests: Built-in & Custom",level:"h2"},
    {id:"s4",title:"Testing Data Pipelines",level:"h2"},
    {id:"s5",title:"Data Contracts in Practice",level:"h2"},
    {id:"s6",title:"Data Observability Monitoring",level:"h2"},
    {id:"s7",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">The Seven Dimensions of Data Quality</h2>
<p>Data quality is not a binary state — it is measured across multiple dimensions, each relevant to different stakeholders and use cases:</p>
<table><thead><tr><th>Dimension</th><th>Definition</th><th>Pharma Example of Failure</th><th>How to Measure</th></tr></thead>
<tbody>
<tr><td>Completeness</td><td>Required fields are populated</td><td>30% of claims missing NPI — cannot link to HCP</td><td>NULL rate per column; coverage vs. expected universe</td></tr>
<tr><td>Accuracy</td><td>Values reflect the true real-world state</td><td>ICD-10 codes mapped incorrectly due to lookup table error</td><td>Compare to gold standard; reference validation</td></tr>
<tr><td>Consistency</td><td>Same entity represented the same way across systems</td><td>HCP "John Smith" in CRM, "J. Smith" in claims — dedup failure</td><td>Cross-system reconciliation; record linkage rates</td></tr>
<tr><td>Timeliness</td><td>Data is available when needed</td><td>Claims data 8 months stale — brand team makes decisions on old data</td><td>Max(service_date) vs. expected; freshness SLA tracking</td></tr>
<tr><td>Validity</td><td>Values conform to defined format/range/business rules</td><td>PDC value of 1.43 (impossible — PDC ≤ 1.0)</td><td>Range checks; regex; referential integrity</td></tr>
<tr><td>Uniqueness</td><td>No unintended duplicates</td><td>Duplicate Rx records inflating NRx counts by 12%</td><td>COUNT(*) vs. COUNT(DISTINCT pk); duplicate rate</td></tr>
<tr><td>Integrity</td><td>Relationships between tables are preserved</td><td>FK mismatch: 40% of Rx records reference HCPs not in NPI master</td><td>Orphaned foreign keys; join match rates</td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">The Business Cost of Poor Data Quality</div><p>Gartner estimates poor data quality costs organizations an average of $12.9M annually. In pharma analytics, a 10% PDC calculation error can cause: incorrect adherence tracking for regulatory reporting, wrong IC payouts to field reps, and flawed patient support program ROI calculations. Data quality failures are never just technical — they have commercial, financial, and sometimes regulatory consequences.</p></div>`},
    {id:"s2",content:`<h2 id="s2">Great Expectations: Validation Framework</h2>
<p><strong>Great Expectations (GX)</strong> is the most widely adopted Python library for data quality validation. It defines quality rules as "expectations" that are tested against actual data.</p>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Context = gx.get context()</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Datasource = context.sources.add spark("spark datasource", spark=spark)</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Data Asset = datasource.add dataframe asset(name="claims silver")</div>
</div>`},
    {id:"s3",content:`<h2 id="s3">dbt Tests: Built-in & Custom</h2>
<p>dbt (data build tool) has a built-in testing framework that runs after each model build. Tests are defined in YAML and run as SQL assertions:</p>
<div class="callout info"><div class="callout-title">Silver Layer — Data Quality Rules for Rx Transactions</div>
<table><thead><tr><th>Column</th><th>Rule</th><th>Business Reason</th></tr></thead><tbody>
<tr><td>patient_id</td><td>Not null, unique per fill</td><td>Every dispensed Rx must trace to a patient</td></tr>
<tr><td>fill_date</td><td>Not null, within last 2 years</td><td>Stale claims indicate a data load error</td></tr>
<tr><td>ndc_code</td><td>11 digits, in drug master</td><td>Invalid NDC = unidentifiable drug</td></tr>
<tr><td>days_supply</td><td>Between 1 and 365</td><td>Values outside range indicate data entry error</td></tr>
<tr><td>channel</td><td>IN (retail, specialty, mail)</td><td>Unknown channel breaks channel-mix reporting</td></tr>
<tr><td>paid_amount</td><td>≥ 0</td><td>Negative amounts indicate reversal — needs separate handling</td></tr>
</tbody></table></div>
<div class="flow-box"><div class="rule-step"><div class="rule-step-num">1</div><div class="rule-step-body"><strong>Custom singular dbt test (SQL file in tests/ folder)</strong></div></div>
<div class="rule-step"><div class="rule-step-num">2</div><div class="rule-step-body"><strong>tests/assert_no_future_service_dates.sql</strong></div></div>
</div>`},
    {id:"s4",content:`<h2 id="s4">Testing Data Pipelines</h2>
<p>Data pipelines need the same testing pyramid as software: unit tests for individual components, integration tests for end-to-end flow, and contract tests at boundaries.</p>
<table><thead><tr><th>Test Level</th><th>What It Tests</th><th>Tools</th><th>Run Frequency</th></tr></thead>
<tbody>
<tr><td>Unit tests</td><td>Individual transformation functions with synthetic data</td><td>pytest + pyspark, pytest-mock</td><td>Every commit</td></tr>
<tr><td>Integration tests</td><td>Pipeline reads from test data source, runs transforms, validates output</td><td>pytest + Great Expectations, Docker test environment</td><td>Every PR</td></tr>
<tr><td>Data contract tests</td><td>Incoming data from external sources matches expected schema</td><td>Great Expectations, Soda</td><td>Every pipeline run</td></tr>
<tr><td>End-to-end tests</td><td>Full pipeline from raw source to gold layer output</td><td>Airflow/Prefect test DAG + validation</td><td>Nightly or on deploy</td></tr>
</tbody></table>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">@Pytest.Fixture(Scope = "session")</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Test Data = spark.createDataFrame([</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">], Schema = "patient id INT, fill date STRING, days supply INT")</div>
</div>`},
    {id:"s5",content:`<h2 id="s5">Data Contracts in Practice</h2>
<p>A data contract is a formal agreement between a data producer and data consumer specifying schema, semantics, quality SLAs, and change process. It transforms implicit expectations into enforceable agreements.</p>
<div class="callout"><div class="callout-title">OpenDataContract Standard (ODCS) — Key Fields</div>
<p>The Open Data Contract Standard is an emerging industry format for machine-readable data contracts. Key sections:</p>
<table><thead><tr><th>Section</th><th>What It Defines</th></tr></thead><tbody>
<tr><td><strong>id + version</strong></td><td>Unique contract identifier and semantic version (breaking changes increment major version)</td></tr>
<tr><td><strong>dataset</strong></td><td>Tables, columns, types, descriptions — the complete schema</td></tr>
<tr><td><strong>servicelevels</strong></td><td>Freshness SLA, availability %, incident response time</td></tr>
<tr><td><strong>quality</strong></td><td>Automated quality checks with SQL expressions that must pass</td></tr>
<tr><td><strong>price</strong></td><td>Internal chargeback model — cost per query or per consumer team</td></tr>
<tr><td><strong>stakeholders</strong></td><td>Owner, data steward, consumers — with roles and notification preferences</td></tr>
</tbody></table></div>`},
    {id:"s6",content:`<h2 id="s6">Data Observability Monitoring</h2>
<p><strong>Data observability</strong> answers: "Is my data healthy right now?" at all times, not just when a pipeline runs. It monitors data health continuously, alerting before downstream users discover problems.</p>
<p>The five pillars of data observability (after Monte Carlo):</p>
<table><thead><tr><th>Pillar</th><th>What It Monitors</th><th>Example Alert</th></tr></thead>
<tbody>
<tr><td>Freshness</td><td>When was the data last updated?</td><td>"claims.silver not updated in 36 hours — expected daily refresh"</td></tr>
<tr><td>Volume</td><td>Is the row count within expected bounds?</td><td>"claims rows dropped from 50M to 12M — possible ingestion failure"</td></tr>
<tr><td>Schema</td><td>Did column names or types change?</td><td>"Column 'npi' changed from VARCHAR to INT in source system"</td></tr>
<tr><td>Distribution</td><td>Are value distributions within normal range?</td><td>"pdc_score mean dropped from 0.72 to 0.43 — likely calculation bug"</td></tr>
<tr><td>Lineage</td><td>Which upstream tables/pipelines feed this asset?</td><td>"brand_performance_dashboard depends on 3 stale tables"</td></tr>
</tbody></table>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Self.History = history df[metric col].values</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Self.Metric Col = metric col</div>
</div>
<div class="formula-box">
  <div class="formula-label">Formula</div>
  <div class="formula-main">Self.Mu, Self.Sigma = np.mean(self.history), np.std(self.history)</div>
</div>
<table><thead><tr><th>Condition</th><th>Result</th></tr></thead><tbody>
<tr><td>alert['is anomaly']</td><td>send slack alert(f"Data anomaly: {alert}")</td></tr>
</tbody></table>`},
    {id:"s7",content:`<h2 id="s7">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>Data quality has seven measurable dimensions — completeness, accuracy, consistency, timeliness, validity, uniqueness, and integrity — each catches different types of failures that domain checks alone would miss.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>Automate quality checks at every pipeline stage: Great Expectations for Python/Spark pipelines, dbt tests for SQL transformations — failing quality checks should stop the pipeline before bad data reaches consumers.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Unit test transformation functions with synthetic data — PDC calculations, LOT algorithms, and GTN models have business-critical edge cases that only appear in carefully designed test cases, not production data.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>Data observability monitors the five pillars continuously (freshness, volume, schema, distribution, lineage) — alerting teams before downstream users discover that the brand performance dashboard is running on 3-month-old claims.</div></div>`}],
  questions:[
    {id:"q1",text:"A Great Expectations validation runs and shows: expect_column_values_to_be_between('pdc_score', min=0, max=1) — FAILED, with 0.3% of rows failing. The pipeline is set to block on any failure. What is the most appropriate action?",
     options:["Ignore it — 0.3% failure rate is within acceptable noise","Investigate: determine if values > 1.0 are calculation bugs (PDC math error) or data errors (raw claims feeding incorrect days_supply values). Fix the root cause before allowing the pipeline to proceed — PDC > 1.0 is physically impossible and will corrupt all downstream adherence analytics.","Lower the expectation threshold to 1.5 to reduce false positives","Delete the failing rows and rerun the pipeline"],
     correct:1,explanation:"PDC (Proportion of Days Covered) is definitionally bounded between 0 and 1 — it is the proportion of a fixed observation window covered by drug supply, capped at 1.0 per day. Any PDC > 1.0 is a calculation error, not data noise. The correct action is root cause investigation: trace back to the fill_date and days_supply values feeding the PDC calculation — often caused by duplicate fills being double-counted, incorrect observation window logic, or a join that multiplied records. Lowering the threshold to accept > 1.0 would silently perpetuate a bug. Deleting rows loses data without fixing the source problem."},
    {id:"q2",text:"Why are unit tests with synthetic data preferred over testing transformation functions against production data?",
     options:["Synthetic data is always larger than production data","Production data cannot be tested programmatically","Synthetic data allows precise control of edge cases (e.g., early refills, duplicate fills, single-day supply) that may be rare or absent in production data. Unit tests with production data test whatever happens to be there — not the specific scenarios your function must handle correctly.","Unit tests with production data violate HIPAA"],
     correct:2,explanation:"The purpose of a unit test is to verify behavior for specific, known scenarios — especially edge cases. With production data: you don't know what edge cases are present, edge cases may appear in 0.001% of records (unlikely to be in a sample), and you can't assert correct output without knowing the expected answer for each record. Synthetic data lets you create exactly: 'Patient has a 30-day supply, refills on day 20 (early), verify PDC = 1.0 not 1.33.' This is only testable when you control the input and know the ground truth. HIPAA compliance is an additional reason to avoid using production patient data in test environments."},
    {id:"q3",text:"A data contract specifies that the IQVIA Xponent data will be available by the 9th of each month. On the 11th, the data hasn't arrived. The analytics team's brand performance dashboard runs nightly. What should happen?",
     options:["The dashboard should show whatever data is available — partial data is better than no dashboard","The pipeline should detect the SLA breach on the 10th (one day after deadline), send an alert to both producer and consumer teams, automatically pause the dashboard or display a 'data unavailable' warning rather than showing stale data as current, and track the SLA breach for vendor performance management","Simply wait until the data arrives without notification","Delete all prior month estimates and rebuild the dashboard retroactively"],
     correct:1,explanation:"A data contract SLA breach requires: (1) Automated detection — the pipeline should check for data freshness on the 10th (one day after SLA) and alert immediately rather than waiting for the dashboard to silently use stale data. (2) Producer notification — the IQVIA data team or internal ingestion team must be alerted to investigate the delay. (3) Consumer protection — the dashboard should display a data staleness warning rather than presenting prior-month data as current-month data, which would mislead brand teams into acting on wrong information. (4) SLA tracking — recurring breaches inform vendor management conversations and contract renegotiations."}
  ]
}

}); // end PL.addChapters Domain 6
