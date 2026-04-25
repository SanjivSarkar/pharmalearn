/* Domain 6: Data Engineering & Pharma Datasets */
PL.addChapters({

"6-1": {
  id:"6-1", title:"Introduction to Data Engineering", domain:"Data Engineering & Pharma Datasets", domain_id:6,
  level:"Beginner", mins:30, available:true,
  tags:["Data Engineering","Modern Data Stack","Data Roles","Pipelines"],
  objectives:["Understand what data engineering is and why it matters","Distinguish data engineering from data science and analytics","Map the layers of the modern data stack","Identify the key roles in a modern data team"],
  toc:[
    {id:"s1",title:"What Is Data Engineering?",level:"h2"},
    {id:"s2",title:"The Modern Data Stack",level:"h2"},
    {id:"s3",title:"Data Engineering vs Related Roles",level:"h2"},
    {id:"s4",title:"Core Responsibilities",level:"h2"},
    {id:"s5",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">What Is Data Engineering?</h2>
<p>Data engineering is the discipline of <strong>designing, building, and maintaining the infrastructure and pipelines that move data from where it is created to where it is used</strong>. Without reliable data engineering, raw data sitting in source systems is inaccessible to analysts, data scientists, and business decision-makers.</p>
<p>Think of data engineering as the plumbing of a data organisation. Just as plumbing delivers clean water to every tap in a building, data engineers deliver clean, structured, timely data to every consumer — dashboards, ML models, regulatory submissions, or executive reports.</p>
<div class="callout info"><div class="callout-title">Why It Matters in Pharma</div><p>A pharma company may have claims data from IQVIA, prescribing data from Symphony Health, EHR feeds from hospital systems, genomics files from sequencing labs, and CRM data from Veeva — all in different formats, arriving on different schedules, requiring different transformations. Data engineering is what makes all of this queryable in one place.</p></div>
<h3>The Core Problem Data Engineering Solves</h3>
<ul>
<li><strong>Volume:</strong> Billions of pharmacy claims rows, millions of patient records — too large for spreadsheets or manual processes</li>
<li><strong>Variety:</strong> Structured tables, semi-structured JSON, unstructured clinical notes, binary genomics files — different formats need different handling</li>
<li><strong>Velocity:</strong> Some data is needed daily (sales dashboards), some monthly (IQVIA data drops), some in near-real-time (adverse event alerts)</li>
<li><strong>Veracity:</strong> Source data contains errors, duplicates, missing values, and inconsistencies that must be detected and handled before analysis</li>
</ul>`},
    {id:"s2",content:`<h2 id="s2">The Modern Data Stack</h2>
<p>The <strong>modern data stack (MDS)</strong> is a collection of cloud-based tools, each specialised for one layer of the data journey. Instead of one monolithic system doing everything, each layer uses a best-of-breed tool.</p>
<table><thead><tr><th>Layer</th><th>What It Does</th><th>Common Tools</th></tr></thead><tbody>
<tr><td><strong>Ingestion</strong></td><td>Moves data from source systems into storage</td><td>Fivetran, Airbyte, Stitch, custom SFTP scripts</td></tr>
<tr><td><strong>Storage</strong></td><td>Holds raw and transformed data at scale</td><td>Snowflake, Databricks, BigQuery, Amazon Redshift</td></tr>
<tr><td><strong>Transformation</strong></td><td>Cleans, models, and aggregates data</td><td>dbt (data build tool), Spark SQL, SQLMesh</td></tr>
<tr><td><strong>Orchestration</strong></td><td>Schedules and monitors pipelines</td><td>Apache Airflow, Prefect, Dagster</td></tr>
<tr><td><strong>Consumption</strong></td><td>Delivers data to end users</td><td>Tableau, Power BI, Mode, Jupyter notebooks</td></tr>
<tr><td><strong>Observability</strong></td><td>Monitors data quality and freshness</td><td>Monte Carlo, Great Expectations, dbt tests</td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">Why Cloud Changed Everything</div><p>Traditional on-premise data warehouses required expensive hardware, fixed capacity, and specialist DBAs. Cloud platforms separate storage from compute — you pay only for queries you run, scale instantly, and never run out of space. This made petabyte-scale pharma analytics economically viable for the first time.</p></div>
<h3>Data Flow Through the Stack</h3>
<div class="flow-box">Source Systems → Ingestion Layer → Raw Storage (Bronze) → Transformation → Curated Storage (Silver/Gold) → Consumption Layer</div>
<p>The Bronze-Silver-Gold (or Medallion) naming convention describes data maturity: Bronze is raw and unmodified, Silver is cleaned and conformed, Gold is business-ready aggregated data optimised for specific use cases.</p>`},
    {id:"s3",content:`<h2 id="s3">Data Engineering vs Related Roles</h2>
<table><thead><tr><th>Role</th><th>Primary Focus</th><th>Typical Output</th><th>Key Skills</th></tr></thead><tbody>
<tr><td><strong>Data Engineer</strong></td><td>Building pipelines and infrastructure</td><td>Reliable, scalable data pipelines</td><td>SQL, orchestration, cloud platforms, data modelling</td></tr>
<tr><td><strong>Analytics Engineer</strong></td><td>Transforming and modelling data for analytics</td><td>Semantic layer, dbt models, data marts</td><td>Advanced SQL, dbt, dimensional modelling, business acumen</td></tr>
<tr><td><strong>Data Scientist</strong></td><td>Building predictive models and statistical analyses</td><td>ML models, statistical reports, predictions</td><td>Statistics, ML algorithms, experimentation, Python/R</td></tr>
<tr><td><strong>Data Analyst</strong></td><td>Answering business questions with data</td><td>Dashboards, ad-hoc reports, insights</td><td>SQL, visualisation tools, business domain knowledge</td></tr>
<tr><td><strong>ML Engineer</strong></td><td>Deploying and scaling ML models</td><td>Production model APIs, feature stores, MLOps</td><td>Software engineering, cloud infrastructure, ML frameworks</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">Analytics Engineering — The Bridge Role</div><p>Analytics engineers sit between data engineering and data analysis. They own the transformation layer — taking raw data from data engineers and producing clean, documented, tested data models that analysts can confidently use. The rise of dbt (data build tool) created this role by bringing software engineering practices (version control, testing, documentation) into SQL-based transformation work.</p></div>`},
    {id:"s4",content:`<h2 id="s4">Core Responsibilities of a Data Engineer</h2>
<h3>Pipeline Development</h3>
<ul>
<li>Design and build data ingestion pipelines from source systems to the data platform</li>
<li>Handle schema changes, source system outages, and data format variations gracefully</li>
<li>Implement incremental loading to avoid reprocessing entire datasets each run</li>
</ul>
<h3>Data Modelling</h3>
<ul>
<li>Design the logical and physical structure of data in the warehouse</li>
<li>Choose appropriate table types (raw tables, aggregated marts, dimensional models)</li>
<li>Optimise for query performance through partitioning, clustering, and indexing</li>
</ul>
<h3>Data Quality</h3>
<ul>
<li>Implement automated tests that catch data anomalies before they reach consumers</li>
<li>Monitor pipeline freshness — alert when data is late or missing</li>
<li>Maintain data lineage so every metric can be traced to its source</li>
</ul>
<h3>Infrastructure & Platform</h3>
<ul>
<li>Manage cloud data warehouse configurations and access controls</li>
<li>Optimise cost — query costs in cloud warehouses can escalate rapidly with poor design</li>
<li>Maintain CI/CD pipelines for data code, ensuring changes are tested before deployment</li>
</ul>
<div class="callout warning"><div class="callout-title">The Hidden Cost of Poor Data Engineering</div><p>When data engineering is neglected, analysts spend 60–80% of their time cleaning data rather than analysing it. Decisions get made on wrong numbers. Regulatory submissions fail data quality checks. ML models are trained on unrepresentative samples. Good data engineering is a multiplier on every downstream team.</p></div>`},
    {id:"s5",content:`<h2 id="s5">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>Data engineering builds the infrastructure that makes data usable — pipelines, storage, transformation, and quality checks. Without it, raw data is inaccessible to the business.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>The modern data stack uses specialised cloud tools for each layer: ingest, store, transform, orchestrate, and serve. No single tool does everything well.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Data engineers are distinct from data scientists and analysts — they focus on reliability, scalability, and infrastructure, not on statistical analysis or business insights.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>The Medallion architecture (Bronze → Silver → Gold) organises data by maturity: raw, cleaned, and business-ready. Each layer serves different consumers.</div></div>`}
  ],
  quiz:[
    {q:"Which layer of the modern data stack is responsible for scheduling and monitoring pipelines?",options:["Storage","Transformation","Orchestration","Consumption"],answer:2},
    {q:"What does the 'Bronze' layer represent in the Medallion architecture?",options:["Aggregated, business-ready data","Cleaned and conformed data","Raw, unmodified data as ingested","Archived historical data"],answer:2},
    {q:"An analytics engineer's primary responsibility is:",options:["Building ML models","Designing and transforming data models for analytics consumption","Managing cloud infrastructure","Running statistical experiments"],answer:1}
  ]
},

"6-2": {
  id:"6-2", title:"Data Pipelines & ETL/ELT", domain:"Data Engineering & Pharma Datasets", domain_id:6,
  level:"Beginner", mins:35, available:true,
  tags:["Pipelines","ETL","ELT","Batch","Incremental Load","Orchestration"],
  objectives:["Understand what a data pipeline is and how it works","Distinguish ETL from ELT and choose the right approach","Compare batch, incremental, and streaming pipeline patterns","Understand pipeline orchestration and monitoring"],
  toc:[
    {id:"s1",title:"What Is a Data Pipeline?",level:"h2"},
    {id:"s2",title:"ETL vs ELT",level:"h2"},
    {id:"s3",title:"Loading Strategies",level:"h2"},
    {id:"s4",title:"Pipeline Orchestration",level:"h2"},
    {id:"s5",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">What Is a Data Pipeline?</h2>
<p>A <strong>data pipeline</strong> is an automated sequence of steps that moves data from a source to a destination, applying transformations along the way. Pipelines are the connective tissue of a data platform — they run on a schedule (or triggered by events), handle errors gracefully, and ensure data arrives at its destination reliably and on time.</p>
<h3>Anatomy of a Pipeline</h3>
<div class="flow-box">Source → Extract → (Transform) → Load → (Transform) → Destination → Consumers</div>
<p>Every pipeline has three fundamental stages:</p>
<ul>
<li><strong>Extract:</strong> Read data from the source system (database, API, flat file, SFTP, message queue)</li>
<li><strong>Transform:</strong> Clean, validate, reshape, and enrich the data</li>
<li><strong>Load:</strong> Write the transformed data to the destination system</li>
</ul>
<h3>Pipeline Triggers</h3>
<table><thead><tr><th>Trigger Type</th><th>How It Works</th><th>Pharma Example</th></tr></thead><tbody>
<tr><td><strong>Schedule-based</strong></td><td>Runs at fixed intervals (daily, weekly, monthly)</td><td>Monthly IQVIA data drop processing every 1st of month</td></tr>
<tr><td><strong>Event-based</strong></td><td>Runs when a specific event occurs (file arrives, API webhook)</td><td>Adverse event pipeline triggered when new PV report is filed</td></tr>
<tr><td><strong>Sensor-based</strong></td><td>Polls for a condition to be true before running</td><td>Claims pipeline waits for upstream vendor file to land in S3</td></tr>
<tr><td><strong>Manual</strong></td><td>Triggered on demand by a person</td><td>Ad-hoc backfill when a historical data correction arrives</td></tr>
</tbody></table>`},
    {id:"s2",content:`<h2 id="s2">ETL vs ELT</h2>
<p>The order of Transform and Load steps defines two fundamentally different architectures with different trade-offs.</p>
<table><thead><tr><th>Dimension</th><th>ETL (Extract → Transform → Load)</th><th>ELT (Extract → Load → Transform)</th></tr></thead><tbody>
<tr><td><strong>Where transformation happens</strong></td><td>On a dedicated ETL server before data enters the warehouse</td><td>Inside the data warehouse after raw data is loaded</td></tr>
<tr><td><strong>Raw data preserved?</strong></td><td>Usually not — only transformed output is stored</td><td>Yes — raw data lands first and is never overwritten</td></tr>
<tr><td><strong>Schema flexibility</strong></td><td>Low — schema must be defined before loading</td><td>High — raw data can be re-transformed as requirements change</td></tr>
<tr><td><strong>Debugging</strong></td><td>Difficult — errors in the pipeline may lose original data</td><td>Easy — always rerun transformations from preserved raw</td></tr>
<tr><td><strong>Cost model</strong></td><td>Fixed ETL server cost regardless of usage</td><td>Pay per compute used for transformation queries</td></tr>
<tr><td><strong>Best for</strong></td><td>Legacy systems, regulatory submissions, on-premise EDC</td><td>Cloud analytics, claims dashboards, commercial reporting</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">The Raw Zone Is Sacred</div><p>In ELT, the Bronze (raw) layer must never be modified after ingestion. It is the audit trail and the safety net. If a transformation produces wrong results three months later, you rerun the transformation against preserved raw data — you don't need to re-extract from the source. This is critical in pharma where data suppliers may not re-provide historical files.</p></div>
<h3>Why ELT Has Won for Cloud Analytics</h3>
<p>Cloud warehouses like Snowflake and BigQuery have near-unlimited compute that can be applied to transformation queries. Running transformations inside the warehouse is faster, cheaper, and more auditable than maintaining separate ETL servers. The rise of dbt formalised this pattern by turning SQL transformations into version-controlled, tested, documented code.</p>`},
    {id:"s3",content:`<h2 id="s3">Loading Strategies</h2>
<p>How much data you move in each pipeline run determines cost, freshness, and complexity. Three main strategies exist:</p>
<h3>Full Load</h3>
<p>The entire source dataset is replaced at every run. Simple to implement but expensive for large tables.</p>
<div class="rule-step"><span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:var(--accent);white-space:nowrap;flex-shrink:0;padding-top:2px">When to use</span><span>Small reference tables (drug formularies, territory alignments, diagnosis code lists) that change rarely and are small enough to reload cheaply.</span></div>
<h3>Incremental Load</h3>
<p>Only new or changed records since the last run are extracted and loaded. Requires a reliable "high watermark" — typically an updated_at timestamp or auto-incrementing ID in the source.</p>
<div class="formula-box"><div class="formula-label">Incremental Logic</div><div class="formula-main">Load records WHERE updated_at > last_successful_run_timestamp</div></div>
<div class="rule-step"><span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:var(--accent);white-space:nowrap;flex-shrink:0;padding-top:2px">When to use</span><span>Large transactional tables — claims, prescription fills, adverse events — where reloading everything each run is prohibitively expensive.</span></div>
<h3>Change Data Capture (CDC)</h3>
<p>CDC reads the database transaction log (or similar mechanism) to capture every insert, update, and delete event in near-real-time. This is the most complete picture of changes but requires source database access and more complex pipeline infrastructure.</p>
<div class="rule-step"><span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:var(--accent);white-space:nowrap;flex-shrink:0;padding-top:2px">When to use</span><span>When you need a complete history of every change (not just the current state), or when the source system doesn't have reliable timestamps for incremental loads.</span></div>
<table><thead><tr><th>Strategy</th><th>Complexity</th><th>Freshness</th><th>Cost</th></tr></thead><tbody>
<tr><td>Full Load</td><td>Low</td><td>At each run</td><td>High for large tables</td></tr>
<tr><td>Incremental</td><td>Medium</td><td>Near-current</td><td>Low</td></tr>
<tr><td>CDC</td><td>High</td><td>Near-real-time</td><td>Medium (infra overhead)</td></tr>
</tbody></table>`},
    {id:"s4",content:`<h2 id="s4">Pipeline Orchestration</h2>
<p><strong>Orchestration</strong> is the system that schedules pipeline runs, manages dependencies between steps, retries on failure, and alerts when something goes wrong. Without orchestration, pipelines are manual scripts that break silently and have no dependency awareness.</p>
<h3>Key Orchestration Concepts</h3>
<ul>
<li><strong>DAG (Directed Acyclic Graph):</strong> A visual map of pipeline steps and their dependencies. "Acyclic" means there are no circular dependencies — the pipeline can always terminate. Every pipeline is represented as a DAG.</li>
<li><strong>Task:</strong> An individual unit of work in a DAG (e.g., extract claims file, validate row counts, load to warehouse).</li>
<li><strong>Dependency:</strong> A rule that Task B cannot start until Task A succeeds.</li>
<li><strong>Backfill:</strong> Running a pipeline for historical date ranges, typically to load data for periods before the pipeline existed or to reprocess after a bug fix.</li>
</ul>
<h3>What Good Orchestration Provides</h3>
<table><thead><tr><th>Capability</th><th>Why It Matters</th></tr></thead><tbody>
<tr><td>Automatic retry on failure</td><td>Transient network errors or source system timeouts resolve without human intervention</td></tr>
<tr><td>Dependency management</td><td>Downstream transformations only run after upstream extracts succeed</td></tr>
<tr><td>Alerting</td><td>On-call engineers are notified immediately when a pipeline fails or runs late</td></tr>
<tr><td>Audit log</td><td>Every run is recorded with start time, end time, success/failure, and row counts</td></tr>
<tr><td>Parallelism</td><td>Independent tasks run simultaneously, reducing total pipeline runtime</td></tr>
</tbody></table>
<div class="callout warning"><div class="callout-title">SLA Monitoring Is Non-Negotiable</div><p>Pharma commercial teams operate on tight reporting cycles — field force needs Tuesday morning data by 7am, brand teams need weekly dashboards by Monday 8am. Missing these SLAs erodes trust in the data platform. Every pipeline serving a business SLA needs freshness monitoring that alerts before the SLA is breached, not after.</p></div>`},
    {id:"s5",content:`<h2 id="s5">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>A data pipeline is an automated sequence — Extract, (Transform), Load — that moves data reliably from source to destination on a schedule or trigger.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>ELT has replaced ETL for cloud analytics: load raw data first (preserve it), transform inside the warehouse using SQL. The raw zone is never overwritten.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Choose your loading strategy by table size and freshness need: full load for small reference tables, incremental for large transactional tables, CDC for complete change history.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>Orchestration (Airflow, Prefect, Dagster) manages scheduling, dependencies, retries, and alerting. A pipeline without orchestration is a script waiting to fail silently.</div></div>`}
  ],
  quiz:[
    {q:"In ELT, when does transformation occur?",options:["Before data is loaded into storage","On a dedicated ETL server","After raw data is loaded into the data warehouse","During extraction from the source"],answer:2},
    {q:"Which loading strategy is most appropriate for a 5-billion-row claims table that receives 500,000 new records daily?",options:["Full load","Incremental load","Manual load","No loading needed"],answer:1},
    {q:"A DAG in pipeline orchestration represents:",options:["A type of database index","A map of pipeline steps and their dependencies","A data quality test framework","A cloud storage format"],answer:1}
  ]
},


"6-3": {
  id:"6-3", title:"Data Modeling Fundamentals", domain:"Data Engineering & Pharma Datasets", domain_id:6,
  level:"Intermediate", mins:38, available:true,
  tags:["Data Modeling","Star Schema","Dimensional Modeling","Data Vault","SCD"],
  objectives:["Understand why data modeling matters for analytics performance","Apply normalization principles to database design","Design star and snowflake schemas for analytical workloads","Understand Slowly Changing Dimensions and when to use each type"],
  toc:[
    {id:"s1",title:"Why Data Modeling Matters",level:"h2"},
    {id:"s2",title:"Normalization",level:"h2"},
    {id:"s3",title:"Dimensional Modeling",level:"h2"},
    {id:"s4",title:"Slowly Changing Dimensions",level:"h2"},
    {id:"s5",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Why Data Modeling Matters</h2>
<p>A <strong>data model</strong> is the blueprint that defines how data is structured, stored, and related within a database or warehouse. Good data models make queries fast and intuitive. Poor data models make even simple questions slow, complex, and error-prone.</p>
<p>Data modeling decisions made early have long-lasting consequences: a poorly designed model that's embedded in dozens of downstream reports and dashboards is extremely costly to change later.</p>
<h3>Two Fundamental Purposes</h3>
<table><thead><tr><th>Purpose</th><th>Design Goal</th><th>Typical Use</th></tr></thead><tbody>
<tr><td><strong>OLTP (transactional)</strong></td><td>Minimise redundancy, support fast writes and updates</td><td>Source systems: CRM, ERP, claims adjudication, EHR</td></tr>
<tr><td><strong>OLAP (analytical)</strong></td><td>Optimise for fast reads and aggregations across large datasets</td><td>Data warehouses, analytics marts, reporting layers</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">The Key Tension</div><p>A well-normalised OLTP schema minimises data redundancy through many related tables — great for writes, terrible for analytics. A well-designed analytical model denormalises data into fewer, wider tables — great for reads, but would be inefficient for a transactional system updating individual records thousands of times per second.</p></div>`},
    {id:"s2",content:`<h2 id="s2">Normalization</h2>
<p>Normalization is the process of organizing data to reduce redundancy and improve data integrity. It proceeds through a series of "normal forms."</p>
<table><thead><tr><th>Normal Form</th><th>Rule</th><th>Problem It Solves</th></tr></thead><tbody>
<tr><td><strong>1NF</strong></td><td>Each column holds a single, atomic value. No repeating groups.</td><td>Eliminates multi-value columns and nested structures</td></tr>
<tr><td><strong>2NF</strong></td><td>In 1NF, and every non-key column depends on the entire primary key (not just part of it)</td><td>Eliminates partial dependencies in composite-key tables</td></tr>
<tr><td><strong>3NF</strong></td><td>In 2NF, and every non-key column depends only on the primary key (not on other non-key columns)</td><td>Eliminates transitive dependencies</td></tr>
</tbody></table>
<h3>Normalization Trade-offs for Analytics</h3>
<p>A fully normalised 3NF schema requires joining many tables to answer a single business question. In a data warehouse serving analytical workloads, this is too slow. Analytics models intentionally <em>denormalize</em> — trading some redundancy for dramatically faster query performance.</p>
<div class="rule-step"><span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:var(--accent);white-space:nowrap;flex-shrink:0;padding-top:2px">Rule of Thumb</span><span>Normalize source/OLTP models. Denormalize analytical/OLAP models. The transformation layer (dbt, Spark) is where normalization is undone to create query-friendly structures.</span></div>`},
    {id:"s3",content:`<h2 id="s3">Dimensional Modeling</h2>
<p><strong>Dimensional modeling</strong>, introduced by Ralph Kimball, is the standard approach for designing analytical databases. It organises data into two types of tables: <strong>facts</strong> and <strong>dimensions</strong>.</p>
<h3>Facts vs Dimensions</h3>
<table><thead><tr><th>Table Type</th><th>What It Contains</th><th>Pharma Examples</th></tr></thead><tbody>
<tr><td><strong>Fact table</strong></td><td>Measurable business events — rows are individual transactions or measurements. Contains numeric metrics and foreign keys to dimensions.</td><td>Prescription fill, sales call, adverse event, patient visit, inventory movement</td></tr>
<tr><td><strong>Dimension table</strong></td><td>Descriptive context for facts — who, what, where, when, how. Contains attributes used to filter, group, and label facts.</td><td>Patient, HCP, drug/product, geography/territory, time/calendar, payer</td></tr>
</tbody></table>
<h3>Star Schema</h3>
<p>A <strong>star schema</strong> has one central fact table surrounded by denormalized dimension tables. It looks like a star. The simplicity means most analytical queries require only one join from the fact table to a dimension table.</p>
<div class="callout info"><div class="callout-title">Star Schema Example</div><p>A prescription analytics star schema: <strong>fact_prescription</strong> (patient_id, hcp_id, drug_id, date_id, territory_id, trx_count, nrx_count, days_supply) at the centre, with dimension tables dim_patient, dim_hcp, dim_drug, dim_date, dim_territory joined around it.</p></div>
<h3>Snowflake Schema</h3>
<p>A <strong>snowflake schema</strong> normalises dimension tables into sub-dimensions (e.g., dim_hcp links to dim_specialty, dim_specialty links to dim_specialty_group). This reduces storage but requires more joins and is generally harder to query. For most modern cloud warehouses where storage is cheap, star schemas are preferred.</p>
<h3>Grain</h3>
<p>The <strong>grain</strong> of a fact table defines what one row represents. Declaring grain explicitly before building is the most important design decision in dimensional modeling.</p>
<div class="rule-step"><span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:var(--accent);white-space:nowrap;flex-shrink:0;padding-top:2px">Example grains</span><span>One row per prescription fill per patient per day. One row per sales call per HCP per rep. One row per adverse event report per patient. Mixing grain levels in one table is the most common modeling mistake.</span></div>`},
    {id:"s4",content:`<h2 id="s4">Slowly Changing Dimensions</h2>
<p>Dimensions change over time — an HCP moves territory, a patient changes insurance plan, a drug gets a new indication. How you handle these changes determines whether your historical reports stay accurate. This is the problem of <strong>Slowly Changing Dimensions (SCDs)</strong>.</p>
<table><thead><tr><th>SCD Type</th><th>How It Works</th><th>History Preserved?</th><th>Best For</th></tr></thead><tbody>
<tr><td><strong>Type 1</strong></td><td>Overwrite the old value with the new value</td><td>No — history is lost</td><td>Corrections to data errors; attributes where history is irrelevant</td></tr>
<tr><td><strong>Type 2</strong></td><td>Insert a new row for the changed record; old row is end-dated and flagged inactive</td><td>Yes — full history via multiple rows</td><td>Territory changes, HCP specialty changes, patient plan changes — any attribute needed for historical accuracy</td></tr>
<tr><td><strong>Type 3</strong></td><td>Add a new column for the new value while keeping a column for the previous value</td><td>Partial — only one prior version</td><td>When you only ever need current vs. previous (rarely used)</td></tr>
</tbody></table>
<div class="callout warning"><div class="callout-title">SCD Type 2 and Prescription Attribution</div><p>In pharma, HCP territory alignment changes frequently — reps are realigned, territories are split or merged. If you use SCD Type 1 (overwrite) for territory on the HCP dimension, historical prescriptions get attributed to the wrong rep in retrospect. SCD Type 2 ensures that a prescription written by an HCP in Territory A in January is always attributed to the rep who owned Territory A in January, even if that HCP moved to Territory B in March.</p></div>`},
    {id:"s5",content:`<h2 id="s5">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>OLTP schemas optimise for write performance (normalised). OLAP/analytical schemas optimise for read performance (denormalised). The transformation layer converts one to the other.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>Dimensional modeling organises analytical data into facts (measurable events) and dimensions (descriptive context). The star schema — one fact table, multiple dimension tables — is the standard for pharma analytics.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Always declare grain first: what does one row in this fact table represent? Inconsistent grain is the most common and most damaging data modeling error.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>Use SCD Type 2 for any dimension attribute that is needed for historical accuracy — especially territory, specialty, and payer alignment in pharma commercial models.</div></div>`}
  ],
  quiz:[
    {q:"A fact table in dimensional modeling contains:",options:["Descriptive attributes like HCP name and specialty","Measurable business events with numeric metrics and foreign keys to dimensions","Only date and time information","Normalised master data"],answer:1},
    {q:"An HCP moves from Territory East to Territory West mid-year. To preserve historical prescription attribution, you should use:",options:["SCD Type 1 — overwrite the territory","SCD Type 2 — insert a new row with an end-date on the old record","SCD Type 3 — add a previous_territory column","No change is needed — territory is not important"],answer:1},
    {q:"What is the 'grain' of a fact table?",options:["The number of rows in the table","The primary key column name","The definition of what one row represents","The number of dimension tables joined to it"],answer:2}
  ]
},

"6-4": {
  id:"6-4", title:"Data Warehousing & Lakehouse Architecture", domain:"Data Engineering & Pharma Datasets", domain_id:6,
  level:"Intermediate", mins:35, available:true,
  tags:["Data Warehouse","Lakehouse","Snowflake","Databricks","Partitioning","Delta Lake"],
  objectives:["Distinguish data warehouses from data lakes and lakehouses","Understand the key cloud warehouse platforms and their strengths","Apply partitioning and clustering to optimise query performance","Understand table formats: Parquet, Delta Lake, Iceberg"],
  toc:[
    {id:"s1",title:"Data Warehouse vs Data Lake vs Lakehouse",level:"h2"},
    {id:"s2",title:"Cloud Data Warehouse Platforms",level:"h2"},
    {id:"s3",title:"Table Formats & Storage",level:"h2"},
    {id:"s4",title:"Performance Optimisation",level:"h2"},
    {id:"s5",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Data Warehouse vs Data Lake vs Lakehouse</h2>
<table><thead><tr><th>Architecture</th><th>What It Stores</th><th>Strengths</th><th>Limitations</th></tr></thead><tbody>
<tr><td><strong>Data Warehouse</strong></td><td>Structured, schema-on-write data in relational tables</td><td>Fast SQL queries, ACID transactions, mature governance</td><td>Expensive for large volumes; poor support for unstructured data (images, notes, genomics)</td></tr>
<tr><td><strong>Data Lake</strong></td><td>Any format — structured, semi-structured, unstructured — stored cheaply in object storage (S3, GCS, ADLS)</td><td>Extremely low cost, stores everything, flexible</td><td>No ACID guarantees, data swamps form easily, poor query performance without tuning</td></tr>
<tr><td><strong>Lakehouse</strong></td><td>Files in object storage with a table format layer (Delta, Iceberg, Hudi) that adds warehouse-like features</td><td>Low storage cost + ACID transactions + fast SQL + support for ML workloads</td><td>More complex to manage than a pure warehouse; newer technology</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">Why the Lakehouse Emerged</div><p>Companies wanted cheap data lake storage for large unstructured datasets (genomics, clinical notes, images) AND the SQL query performance and transactional guarantees of a data warehouse — for the same data, without copying it twice. The lakehouse pattern achieves this by adding a metadata layer on top of object storage files.</p></div>
<h3>The Medallion Architecture in a Lakehouse</h3>
<div class="flow-box">Bronze (Raw) → Silver (Cleaned & Conformed) → Gold (Business-Ready Aggregated Marts)</div>
<p>Each layer is stored as Delta/Iceberg tables in object storage, queryable via SQL from Databricks, Snowflake, or Spark.</p>`},
    {id:"s2",content:`<h2 id="s2">Cloud Data Warehouse Platforms</h2>
<table><thead><tr><th>Platform</th><th>Key Strengths</th><th>Pharma Use Cases</th></tr></thead><tbody>
<tr><td><strong>Snowflake</strong></td><td>Extreme SQL performance, virtual warehouses (independent compute clusters), data sharing across organisations, HIPAA-compliant</td><td>Commercial analytics (claims, Rx data), data sharing with CROs and partners, multi-cloud deployments</td></tr>
<tr><td><strong>Databricks</strong></td><td>Unified analytics + ML on Delta Lake, Apache Spark foundation, excellent for large unstructured data and ML feature stores</td><td>Genomics processing, NLP on clinical notes, ML model training pipelines, lakehouse on pharma RWD</td></tr>
<tr><td><strong>Google BigQuery</strong></td><td>Serverless (no cluster management), strong ML integration (BigQuery ML), excellent for high-concurrency workloads</td><td>Public health data analysis, population-level epidemiology, Google Cloud-native pharma stacks</td></tr>
<tr><td><strong>Amazon Redshift</strong></td><td>Deep AWS integration, mature HIPAA BAA support, RA3 nodes with managed storage</td><td>AWS-native pharma platforms, Amazon HealthLake integration, ClinicalTrials.gov data analysis</td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">Platform Selection Is Not Permanent</div><p>Most large pharma companies use 2–3 platforms. Snowflake dominates commercial analytics due to IQVIA/Symphony data partnerships and Veeva integrations. Databricks dominates for ML and genomics. The right choice depends on your team's skills, existing cloud contracts, and primary use cases.</p></div>`},
    {id:"s3",content:`<h2 id="s3">Table Formats & Storage</h2>
<h3>Why File Formats Matter</h3>
<p>The file format determines how data is physically laid out on disk, which directly affects query speed and storage cost.</p>
<table><thead><tr><th>Format</th><th>Type</th><th>Key Characteristics</th></tr></thead><tbody>
<tr><td><strong>CSV / JSON</strong></td><td>Row-oriented</td><td>Human-readable, easy to produce. Very slow for analytical queries — must read every column even if you only need two.</td></tr>
<tr><td><strong>Parquet</strong></td><td>Columnar</td><td>Industry standard for analytical storage. Reads only the columns needed, compresses extremely well. 10–100x faster than CSV for analytical queries.</td></tr>
<tr><td><strong>Delta Lake</strong></td><td>Columnar + transaction log</td><td>Parquet files + a transaction log that enables ACID transactions, time travel (query data as it was at any past point), and schema enforcement. Default format for Databricks.</td></tr>
<tr><td><strong>Apache Iceberg</strong></td><td>Columnar + transaction log</td><td>Similar to Delta Lake but open-standard and cloud-agnostic. Growing adoption across Snowflake, Spark, Flink, and Trino.</td></tr>
</tbody></table>
<h3>Columnar Storage Explained</h3>
<p>In a row-oriented file, all columns of a record are stored together. In a columnar file, all values of each column are stored together. For a query that reads only 3 columns from a 200-column claims table, columnar storage reads ~1.5% of the data a row-oriented store would read.</p>`},
    {id:"s4",content:`<h2 id="s4">Performance Optimisation</h2>
<p>Cloud warehouses bill by compute used. Poorly designed tables that force full table scans on billions of rows can generate enormous costs and slow queries. Three key techniques reduce this:</p>
<h3>Partitioning</h3>
<p>Partitioning divides a large table into separate physical segments based on the values of a column (typically a date). When a query filters on the partition column, the warehouse only reads the relevant partitions — it "prunes" the rest.</p>
<div class="formula-box"><div class="formula-label">Example</div><div class="formula-main">A claims table partitioned by service_date_month. A query for Q1 2024 reads only 3 of 60 monthly partitions — 95% of data skipped.</div></div>
<h3>Clustering / Sort Keys</h3>
<p>Within each partition, rows can be physically sorted by frequently-filtered columns (e.g., patient_id, drug_ndc). Queries filtering on clustered columns find matching rows without scanning the entire partition.</p>
<h3>Materialisation</h3>
<p>Pre-computing expensive aggregations as materialised views or tables means users query the pre-computed result rather than rerunning billions of rows each time. The trade-off is storage cost and refresh lag.</p>
<table><thead><tr><th>Technique</th><th>Best Applied To</th><th>Trade-off</th></tr></thead><tbody>
<tr><td>Partitioning</td><td>Large fact tables with date-range queries</td><td>Partition column must be used in WHERE clause to benefit</td></tr>
<tr><td>Clustering</td><td>Additional filter columns beyond the partition key</td><td>Effective only after the table has been re-clustered (automatic in Snowflake)</td></tr>
<tr><td>Materialisation</td><td>Frequently-run heavy aggregations</td><td>Storage cost + potential staleness if not refreshed frequently</td></tr>
</tbody></table>`},
    {id:"s5",content:`<h2 id="s5">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>The lakehouse combines cheap lake storage with warehouse-grade SQL performance and ACID guarantees. Delta Lake and Iceberg are the two dominant table formats enabling this.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>Columnar formats (Parquet, Delta, Iceberg) are 10–100x faster than CSV for analytical queries because they only read the columns a query needs.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Partition large fact tables by date; cluster by the most common additional filter columns. These two optimisations alone typically reduce query cost by 80–95% on large pharma datasets.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>Snowflake dominates commercial pharma analytics; Databricks dominates ML/genomics workloads. Most large pharma companies use both.</div></div>`}
  ],
  quiz:[
    {q:"What advantage does a lakehouse have over a traditional data lake?",options:["Lower storage cost","ACID transactions and SQL query performance on top of object storage","Better support for structured tabular data only","Simpler architecture with fewer components"],answer:1},
    {q:"Why is Parquet preferred over CSV for analytical storage?",options:["Parquet files are human-readable","Parquet stores data in columnar format, reading only the columns needed for a query","Parquet is faster to write than CSV","Parquet supports more data types than CSV"],answer:1},
    {q:"A claims fact table has 5 years of data. Most queries filter by service month and drug NDC. The best optimisation is:",options:["Partition by service month, cluster by drug NDC","Partition by patient age, cluster by diagnosis code","Store as a single unpartitioned table for flexibility","Convert to CSV for faster reads"],answer:0}
  ]
},

"6-5": {
  id:"6-5", title:"Data Quality & Governance", domain:"Data Engineering & Pharma Datasets", domain_id:6,
  level:"Intermediate", mins:32, available:true,
  tags:["Data Quality","Data Governance","Data Contracts","Data Lineage","Data Catalog"],
  objectives:["Define the six dimensions of data quality","Implement data quality tests appropriate for pharma datasets","Understand data contracts and their role in pipeline reliability","Explain data lineage and cataloging"],
  toc:[
    {id:"s1",title:"The Six Dimensions of Data Quality",level:"h2"},
    {id:"s2",title:"Data Profiling & Testing",level:"h2"},
    {id:"s3",title:"Data Contracts",level:"h2"},
    {id:"s4",title:"Data Lineage, Cataloging & Governance",level:"h2"},
    {id:"s5",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">The Six Dimensions of Data Quality</h2>
<p>Data quality is not a single property — it is a multi-dimensional assessment. Poor quality in any dimension can invalidate analysis or trigger regulatory issues.</p>
<table><thead><tr><th>Dimension</th><th>Definition</th><th>Pharma Example of Failure</th></tr></thead><tbody>
<tr><td><strong>Completeness</strong></td><td>All required data is present; no unexpected nulls or missing records</td><td>20% of prescription records missing patient age — age-adjusted analyses are invalid</td></tr>
<tr><td><strong>Accuracy</strong></td><td>Data values reflect the real-world truth they represent</td><td>Drug NDC codes mapped to wrong product — sales attributed to competitor brand</td></tr>
<tr><td><strong>Consistency</strong></td><td>Same entity has the same values across all systems and time periods</td><td>Patient appears as "Male" in claims and "Female" in EHR — identity resolution failure</td></tr>
<tr><td><strong>Timeliness</strong></td><td>Data is available when it is needed, with acceptable lag</td><td>Weekly claims refresh runs 3 days late — field force dashboard shows stale data</td></tr>
<tr><td><strong>Validity</strong></td><td>Values conform to defined formats, ranges, and reference lists</td><td>Diagnosis codes contain non-existent ICD-10 codes — quality check flags invalid entries</td></tr>
<tr><td><strong>Uniqueness</strong></td><td>Each real-world entity appears only once (or as intended)</td><td>Same prescription fill appears twice due to claims resubmission — TRx count inflated</td></tr>
</tbody></table>
<div class="callout warning"><div class="callout-title">Data Quality in Pharma Has Regulatory Consequences</div><p>HEOR submissions to payers, pharmacovigilance reports to FDA, and clinical trial data packages all undergo external scrutiny. Data quality failures in these contexts are not just analytical problems — they can delay drug approvals, trigger FDA warning letters, or invalidate HEOR models used for formulary negotiation.</p></div>`},
    {id:"s2",content:`<h2 id="s2">Data Profiling & Testing</h2>
<h3>Data Profiling</h3>
<p><strong>Data profiling</strong> is the process of examining a dataset to understand its structure, content, and quality characteristics before building pipelines or models. Profiling answers: What columns exist? What are the data types? What is the null rate per column? What is the value distribution? Are there duplicates?</p>
<h3>Data Testing Framework</h3>
<p>Data tests are automated checks that run at each pipeline execution. They catch quality problems before bad data reaches downstream consumers.</p>
<table><thead><tr><th>Test Type</th><th>What It Checks</th><th>Example</th></tr></thead><tbody>
<tr><td><strong>Not-null</strong></td><td>Required columns have no missing values</td><td>patient_id is never null in fact_prescription</td></tr>
<tr><td><strong>Unique</strong></td><td>Primary key columns have no duplicates</td><td>claim_id is unique in fact_claims</td></tr>
<tr><td><strong>Accepted values</strong></td><td>Categorical columns only contain valid values</td><td>gender is one of M, F, U</td></tr>
<tr><td><strong>Referential integrity</strong></td><td>Foreign keys exist in the referenced dimension table</td><td>Every drug_id in fact_prescription exists in dim_drug</td></tr>
<tr><td><strong>Freshness</strong></td><td>Data was updated within an expected time window</td><td>fact_claims max(service_date) is within the last 48 hours</td></tr>
<tr><td><strong>Volume anomaly</strong></td><td>Row count is within expected range (not suspiciously low or high)</td><td>Daily claim volume between 400K and 800K rows; alert outside this range</td></tr>
<tr><td><strong>Distribution</strong></td><td>Statistical properties (mean, percentiles) are stable over time</td><td>Average days_supply per claim should be 28–35 days; flag if it drops to 5</td></tr>
</tbody></table>`},
    {id:"s3",content:`<h2 id="s3">Data Contracts</h2>
<p>A <strong>data contract</strong> is a formal, version-controlled agreement between a data producer (the team that generates a dataset) and data consumers (the teams that use it). It specifies schema, semantics, quality guarantees, and SLAs.</p>
<h3>What a Data Contract Defines</h3>
<ul>
<li><strong>Schema:</strong> Column names, data types, nullable flags</li>
<li><strong>Semantics:</strong> What each field means, how metrics are calculated, what "active patient" means in this context</li>
<li><strong>Quality guarantees:</strong> Expected null rates, uniqueness constraints, freshness SLA</li>
<li><strong>Breaking change policy:</strong> How much notice is required before removing or renaming a column</li>
<li><strong>Owner:</strong> Which team is responsible for this dataset and how to reach them</li>
</ul>
<div class="callout info"><div class="callout-title">Why Data Contracts Matter</div><p>Without contracts, data producers change column names, drop fields, or change metric definitions without notifying downstream consumers — silently breaking dashboards and ML models. In pharma, a "patient count" metric silently changed from unique patients to unique patient-drug combinations once broke a quarterly board report. A data contract would have required the producer to version the change and notify all registered consumers.</p></div>
<h3>Implementing Contracts</h3>
<p>In practice, data contracts can be implemented as schema.yml files in dbt (documenting and testing columns), as JSON Schema files, or as dedicated contract platforms. The key is version control, automated validation, and clear ownership.</p>`},
    {id:"s4",content:`<h2 id="s4">Data Lineage, Cataloging & Governance</h2>
<h3>Data Lineage</h3>
<p><strong>Data lineage</strong> tracks how data flows from source systems through transformations to final consumption — visualising the complete chain of custody for every metric and report. When a number looks wrong, lineage lets you trace it back to the exact source table and transformation step where the error was introduced.</p>
<div class="rule-step"><span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:var(--accent);white-space:nowrap;flex-shrink:0;padding-top:2px">Example</span><span>Brand market share metric → gold_market_share model → silver_trx_fact → bronze_iqvia_raw → IQVIA weekly data feed file received 2024-01-07. Lineage makes root-cause analysis fast.</span></div>
<h3>Data Catalog</h3>
<p>A <strong>data catalog</strong> is a searchable inventory of all datasets in the organisation. It records what each dataset contains, who owns it, when it was last updated, how it is calculated, and who is using it. Without a catalog, analysts waste hours searching for the right dataset or unknowingly use duplicate or stale tables.</p>
<h3>Data Governance</h3>
<p>Data governance is the framework of policies, processes, and roles that ensure data is managed as a trustworthy enterprise asset. Key components:</p>
<ul>
<li><strong>Data ownership:</strong> Every dataset has a named owner accountable for its quality</li>
<li><strong>Access control:</strong> Role-based permissions ensure PHI (Protected Health Information) is only accessible to authorised users</li>
<li><strong>Retention policies:</strong> How long data is kept, when it is archived or deleted</li>
<li><strong>Audit logging:</strong> Who queried what data, when — essential for HIPAA compliance</li>
<li><strong>Data classification:</strong> Tagging data by sensitivity (PHI, PII, confidential commercial, public)</li>
</ul>`},
    {id:"s5",content:`<h2 id="s5">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>Data quality has six dimensions: completeness, accuracy, consistency, timeliness, validity, and uniqueness. Monitoring all six requires automated tests running with every pipeline execution.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>Data contracts formalise the agreement between producers and consumers: schema, semantics, quality guarantees, and change policy. They prevent silent breaking changes from cascading through downstream systems.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Data lineage traces every metric back to its source — it is the root-cause analysis tool for data incidents and the audit trail for regulatory submissions.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>Governance is not bureaucracy — it is the system of ownership, access control, and accountability that makes data trustworthy at scale. In pharma, HIPAA compliance and PHI protection make governance non-negotiable.</div></div>`}
  ],
  quiz:[
    {q:"A pharma claims table has 15% null values in the patient_age column. This is primarily a failure of which data quality dimension?",options:["Accuracy","Timeliness","Completeness","Uniqueness"],answer:2},
    {q:"What is a data contract?",options:["A legal agreement with a data vendor","A formal specification between producer and consumer defining schema, semantics, quality guarantees, and SLAs","A database schema file","An API authentication token"],answer:1},
    {q:"Data lineage is most useful for:",options:["Improving query performance","Tracing a metric back to its source to diagnose data quality issues","Managing user access permissions","Scheduling pipeline runs"],answer:1}
  ]
},


"6-6": {
  id:"6-6", title:"Streaming & Real-time Data Processing", domain:"Data Engineering & Pharma Datasets", domain_id:6,
  level:"Intermediate", mins:30, available:true,
  tags:["Streaming","Real-time","Batch","Event-driven","Kafka","Lambda Architecture"],
  objectives:["Distinguish batch from stream processing and choose the right approach","Understand event-driven architecture and message queues","Explain Lambda and Kappa architectures","Identify when real-time processing is genuinely needed in pharma"],
  toc:[
    {id:"s1",title:"Batch vs Stream Processing",level:"h2"},
    {id:"s2",title:"Event-Driven Architecture",level:"h2"},
    {id:"s3",title:"Streaming Concepts",level:"h2"},
    {id:"s4",title:"When to Use Streaming in Pharma",level:"h2"},
    {id:"s5",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Batch vs Stream Processing</h2>
<table><thead><tr><th>Dimension</th><th>Batch Processing</th><th>Stream Processing</th></tr></thead><tbody>
<tr><td><strong>Data arrival</strong></td><td>Collected and processed at fixed intervals (hourly, daily, monthly)</td><td>Processed continuously as each event arrives</td></tr>
<tr><td><strong>Latency</strong></td><td>Minutes to hours after event occurs</td><td>Milliseconds to seconds after event occurs</td></tr>
<tr><td><strong>Complexity</strong></td><td>Lower — simpler scheduling and error handling</td><td>Higher — ordering, fault tolerance, state management are complex</td></tr>
<tr><td><strong>Cost</strong></td><td>Lower — compute used only during processing window</td><td>Higher — compute must run continuously</td></tr>
<tr><td><strong>Best for</strong></td><td>Most pharma analytics use cases — claims refresh, weekly dashboards, monthly reports</td><td>Real-time safety signals, supply chain alerts, live trial monitoring</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">The Micro-batch Middle Ground</div><p>Most "near-real-time" pharma use cases don't need true millisecond streaming — they need data that is 15–60 minutes fresh rather than 24 hours old. Micro-batch processing (running small batch jobs every 15 minutes) achieves this with far lower complexity and cost than a full streaming infrastructure.</p></div>`},
    {id:"s2",content:`<h2 id="s2">Event-Driven Architecture</h2>
<p>In an <strong>event-driven architecture</strong>, systems communicate by producing and consuming events — discrete records of something that happened (a prescription was filled, an adverse event was reported, a shipment left a warehouse). Producers emit events without knowing who will consume them; consumers subscribe to events they care about.</p>
<h3>Message Queue vs Event Stream</h3>
<table><thead><tr><th>Concept</th><th>Message Queue</th><th>Event Stream</th></tr></thead><tbody>
<tr><td><strong>Purpose</strong></td><td>Reliable delivery of a message to one consumer (point-to-point)</td><td>Publishing events to many consumers simultaneously (pub/sub)</td></tr>
<tr><td><strong>Message retention</strong></td><td>Deleted after consumed</td><td>Retained for a configurable period (replay possible)</td></tr>
<tr><td><strong>Examples</strong></td><td>RabbitMQ, Amazon SQS</td><td>Apache Kafka, Amazon Kinesis, Google Pub/Sub</td></tr>
<tr><td><strong>Pharma use</strong></td><td>Triggering downstream pipeline after file arrives</td><td>Real-time adverse event ingestion, supply chain event feed</td></tr>
</tbody></table>
<h3>Apache Kafka — The Dominant Event Streaming Platform</h3>
<p>Kafka organises events into <strong>topics</strong> (named channels), divided into <strong>partitions</strong> (for parallelism), consumed by <strong>consumer groups</strong>. Producers write events to topics; consumers read from topics at their own pace. Kafka retains events for days or weeks, enabling replay and multiple independent consumers of the same event stream.</p>`},
    {id:"s3",content:`<h2 id="s3">Streaming Concepts</h2>
<h3>Windowing</h3>
<p>Stream processing cannot aggregate across infinite time — it needs bounded windows. Three window types:</p>
<ul>
<li><strong>Tumbling window:</strong> Fixed, non-overlapping time periods (e.g., count adverse events per 1-hour window)</li>
<li><strong>Sliding window:</strong> Fixed-size windows that slide forward by a step (e.g., 24-hour rolling count, updated every hour)</li>
<li><strong>Session window:</strong> Dynamic windows that open on the first event and close after a period of inactivity (e.g., group patient portal interactions into sessions)</li>
</ul>
<h3>Lambda Architecture</h3>
<p>Lambda architecture maintains two parallel processing paths: a <strong>batch layer</strong> for accurate, complete historical processing and a <strong>speed layer</strong> for low-latency approximate real-time results. A <strong>serving layer</strong> merges results from both. Criticised for its complexity — maintaining two codebases for the same logic.</p>
<h3>Kappa Architecture</h3>
<p>Kappa simplifies by using <strong>only one streaming system</strong> for both real-time and historical data. Historical reprocessing is done by replaying past events through the streaming system. Simpler to maintain but requires a robust event storage system (Kafka with long retention) and stream processing that can handle high-volume replay.</p>
<div class="rule-step"><span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:var(--accent);white-space:nowrap;flex-shrink:0;padding-top:2px">Guidance</span><span>For most pharma use cases, start with batch. Adopt micro-batch for near-real-time needs. Reserve full streaming for genuine real-time requirements (pharmacovigilance signals, cold-chain temperature monitoring). Premature streaming adds cost and complexity without corresponding business value.</span></div>`},
    {id:"s4",content:`<h2 id="s4">When to Use Streaming in Pharma</h2>
<table><thead><tr><th>Use Case</th><th>Genuine Need for Streaming?</th><th>Rationale</th></tr></thead><tbody>
<tr><td>Weekly brand dashboards</td><td>No — batch is fine</td><td>Business rhythm is weekly; data arrives from IQVIA on a weekly schedule anyway</td></tr>
<tr><td>Daily field force activity</td><td>No — daily batch is fine</td><td>Reps check dashboards morning; overnight batch meets the SLA</td></tr>
<tr><td>Adverse event safety signal detection</td><td>Yes</td><td>Rapid signal detection requires processing incoming PV reports within minutes, not hours</td></tr>
<tr><td>Cold chain temperature monitoring</td><td>Yes</td><td>Temperature excursions for biologic products must trigger alerts within seconds to prevent product loss</td></tr>
<tr><td>Hospital formulary compliance monitoring</td><td>Micro-batch</td><td>15-minute lag is acceptable; true streaming is over-engineered</td></tr>
<tr><td>Clinical trial safety monitoring (DMC)</td><td>Yes</td><td>Data Monitoring Committees need near-real-time safety data to make stopping decisions</td></tr>
</tbody></table>
<div class="callout warning"><div class="callout-title">Streaming Is Not Always Better</div><p>Streaming infrastructure is significantly more expensive and complex to maintain than batch. It introduces challenges around exactly-once processing, event ordering, state management, and watermarking. In pharma commercial analytics — where data arrives in weekly vendor files — streaming adds no value and considerable cost. Always ask: what business decision cannot wait for a batch run?</p></div>`},
    {id:"s5",content:`<h2 id="s5">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>Most pharma analytics use cases are well-served by batch or micro-batch processing. True streaming is warranted only for safety signals, cold-chain monitoring, and clinical trial surveillance.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>Event-driven architectures decouple producers from consumers. Kafka is the dominant platform for durable, replayable event streams in enterprise pharma.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Windowing (tumbling, sliding, session) is how stream processing systems create bounded aggregations over an otherwise infinite event stream.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>Lambda architecture (batch + speed layers) is complex to maintain. Kappa architecture (streaming only) simplifies this at the cost of requiring robust event replay. Micro-batch is often the pragmatic middle ground.</div></div>`}
  ],
  quiz:[
    {q:"Cold-chain temperature monitoring for a biologic product requires what type of processing?",options:["Monthly batch processing","Daily batch processing","Real-time stream processing","Weekly micro-batch"],answer:2},
    {q:"A tumbling window in stream processing is:",options:["A sliding window that overlaps with adjacent windows","A fixed, non-overlapping time period for aggregations","A dynamic window that closes after inactivity","A window based on event count rather than time"],answer:1},
    {q:"What is the main criticism of Lambda architecture?",options:["It cannot handle real-time data","It requires maintaining two separate codebases for the same logic","It is too expensive for large datasets","It does not support historical data"],answer:1}
  ]
},

"6-7": {
  id:"6-7", title:"DataOps & Data Mesh", domain:"Data Engineering & Pharma Datasets", domain_id:6,
  level:"Advanced", mins:35, available:true,
  tags:["DataOps","Data Mesh","CI/CD","Data Products","Semantic Layer"],
  objectives:["Apply DataOps principles to data pipeline development","Implement CI/CD practices for data engineering work","Understand the four principles of Data Mesh","Design data products with clear ownership and SLAs"],
  toc:[
    {id:"s1",title:"DataOps Principles",level:"h2"},
    {id:"s2",title:"CI/CD for Data",level:"h2"},
    {id:"s3",title:"Data Mesh Principles",level:"h2"},
    {id:"s4",title:"Data Products & Semantic Layer",level:"h2"},
    {id:"s5",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">DataOps Principles</h2>
<p><strong>DataOps</strong> applies DevOps and agile engineering principles to data work — making data pipeline development faster, more reliable, and more collaborative. It treats data pipelines as software, with the same engineering rigour applied to production code.</p>
<h3>Core DataOps Principles</h3>
<table><thead><tr><th>Principle</th><th>What It Means in Practice</th></tr></thead><tbody>
<tr><td><strong>Version control everything</strong></td><td>All pipeline code, transformation SQL, data tests, and configuration are stored in Git. Every change is tracked with a commit message and author.</td></tr>
<tr><td><strong>Automate testing</strong></td><td>Data quality tests run automatically on every deployment. No change goes to production without passing the test suite.</td></tr>
<tr><td><strong>Continuous integration</strong></td><td>Changes to data pipelines are tested in isolation (dev/staging environments) before merging to production.</td></tr>
<tr><td><strong>Monitor everything</strong></td><td>Pipeline runs, data freshness, quality metrics, and cost are monitored continuously. Alerts fire before SLAs are breached.</td></tr>
<tr><td><strong>Short feedback loops</strong></td><td>Data engineers can deploy changes daily. Business users see updated data within hours of a change, not weeks after a release cycle.</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">DataOps vs Traditional Data Engineering</div><p>Traditional pharma data engineering often had quarterly release cycles, manual testing, and no version control for SQL code. DataOps reduces deployment cycles to days, catches errors before they reach production, and makes it possible to confidently change data models that hundreds of dashboards depend on.</p></div>`},
    {id:"s2",content:`<h2 id="s2">CI/CD for Data</h2>
<p><strong>Continuous Integration / Continuous Deployment (CI/CD)</strong> for data means every code change triggers an automated pipeline that tests the change in an isolated environment, validates data quality, and deploys to production only on success.</p>
<h3>Typical CI/CD Flow for Data Pipelines</h3>
<div class="flow-box">Developer writes SQL / pipeline code → Push to feature branch → CI runs automated tests on dev data → Code review → Merge to main → CD deploys to staging → Integration tests → Deploy to production</div>
<h3>Environment Strategy</h3>
<table><thead><tr><th>Environment</th><th>Purpose</th><th>Data Used</th></tr></thead><tbody>
<tr><td><strong>Development</strong></td><td>Individual developer iteration</td><td>Subset of data (e.g., 1% sample of claims)</td></tr>
<tr><td><strong>Staging</strong></td><td>Integration testing, QA, business validation</td><td>Full data copy, possibly anonymised</td></tr>
<tr><td><strong>Production</strong></td><td>Live environment serving business users</td><td>Full production data with PHI controls</td></tr>
</tbody></table>
<div class="callout warning"><div class="callout-title">Testing with PHI</div><p>Pharma environments handle Protected Health Information. Development and staging environments must use de-identified or synthetic data — engineers should never have uncontrolled access to production PHI for testing. CI/CD pipelines must enforce this boundary automatically.</p></div>`},
    {id:"s3",content:`<h2 id="s3">Data Mesh Principles</h2>
<p><strong>Data Mesh</strong>, introduced by Zhamak Dehghani, is an organisational and architectural approach that decentralises data ownership from a central data team to the domain teams who produce the data. It is a response to the bottlenecks created by centralised data platforms in large organisations.</p>
<h3>The Four Principles of Data Mesh</h3>
<table><thead><tr><th>Principle</th><th>What It Means</th><th>Pharma Context</th></tr></thead><tbody>
<tr><td><strong>1. Domain ownership</strong></td><td>Each business domain owns its data end-to-end: ingestion, transformation, quality, and serving</td><td>Commercial team owns Rx/sales data; Clinical team owns trial data; Supply chain owns inventory data</td></tr>
<tr><td><strong>2. Data as a product</strong></td><td>Each domain publishes its data as a product with documented schema, quality SLAs, and versioning</td><td>Commercial team publishes "canonical HCP prescribing dataset" as a product others can consume</td></tr>
<tr><td><strong>3. Self-serve platform</strong></td><td>A central platform team provides infrastructure so domain teams can build pipelines without central engineering help</td><td>Platform team provides Snowflake templates, dbt setup, and CI/CD tooling; domains use it themselves</td></tr>
<tr><td><strong>4. Federated governance</strong></td><td>Central standards for interoperability, security, and compliance — applied consistently across all domain data products</td><td>All domains apply the same PHI masking rules, the same data quality test standards, the same naming conventions</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">Data Mesh Is Not for Everyone</div><p>Data Mesh solves the bottleneck problem in large organisations where a central data team cannot keep up with demand from many business units. For smaller pharma companies or those early in their data journey, a well-run centralised platform is often more effective. Data Mesh requires mature domain teams who can take on engineering responsibility.</p></div>`},
    {id:"s4",content:`<h2 id="s4">Data Products & Semantic Layer</h2>
<h3>What Is a Data Product?</h3>
<p>A <strong>data product</strong> is a dataset published by a domain team for consumption by others, with explicit quality guarantees, documentation, versioning, and an owner. It is treated like a software product — with a roadmap, SLAs, breaking-change policies, and user feedback mechanisms.</p>
<h3>Characteristics of a Good Data Product</h3>
<ul>
<li><strong>Discoverable:</strong> Listed in the data catalog with clear descriptions</li>
<li><strong>Addressable:</strong> Has a stable, versioned identifier that consumers can depend on</li>
<li><strong>Trustworthy:</strong> Quality SLAs are published and monitored; consumers are notified of breaches</li>
<li><strong>Self-describing:</strong> Schema, lineage, and business definitions are documented alongside the data</li>
<li><strong>Interoperable:</strong> Uses standard formats and naming conventions that enable cross-domain joins</li>
</ul>
<h3>Semantic Layer</h3>
<p>A <strong>semantic layer</strong> (also called a metrics layer or headless BI layer) sits between the data warehouse and consumption tools. It defines business metrics — market share, TRx, PDC — once, in a central place, so every dashboard and analyst uses the same calculation. It eliminates the "multiple versions of truth" problem where different teams compute the same metric differently.</p>
<div class="rule-step"><span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:var(--accent);white-space:nowrap;flex-shrink:0;padding-top:2px">Example</span><span>"Market share" defined once in the semantic layer as (Brand TRx / Class TRx) × 100, filtered to the active formulary. Every tool — Tableau, Power BI, ad-hoc SQL — pulls from this definition. No team can accidentally use a different formula.</span></div>`},
    {id:"s5",content:`<h2 id="s5">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>DataOps applies software engineering discipline to data work: version control, automated testing, CI/CD, and monitoring. It reduces deployment cycles from quarters to days.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>Data Mesh decentralises data ownership to domain teams. Its four principles — domain ownership, data as a product, self-serve platform, and federated governance — address bottlenecks in large organisations.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Data products are datasets published with explicit quality SLAs, documentation, and versioning — treated with the same engineering rigour as software products.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>The semantic layer defines business metrics once and centrally, eliminating divergent metric definitions across teams — the most common source of "whose number is right?" debates.</div></div>`}
  ],
  quiz:[
    {q:"Which Data Mesh principle requires each business domain to own its data end-to-end?",options:["Data as a product","Domain ownership","Self-serve platform","Federated governance"],answer:1},
    {q:"A semantic layer solves which problem?",options:["Slow query performance on large tables","Different teams computing the same metric with different formulas","Missing data in the Bronze layer","Pipeline scheduling conflicts"],answer:1},
    {q:"In a CI/CD pipeline for data, which environment should use de-identified or synthetic data?",options:["Production only","Production and staging","Development and staging","All environments"],answer:2}
  ]
},

"6-8": {
  id:"6-8", title:"Commercial & Rx Datasets", domain:"Data Engineering & Pharma Datasets", domain_id:6,
  level:"Intermediate", mins:42, available:true,
  tags:["IQVIA","Symphony Health","Specialty Pharmacy","Hub Data","867","852","Claims Data"],
  objectives:["Understand the major commercial data sources in pharma and their characteristics","Distinguish 867 sell-through from 852 inventory data","Explain hub services data and its analytics value","Understand what specialty pharmacy data captures"],
  toc:[
    {id:"s1",title:"Prescribing & Market Data",level:"h2"},
    {id:"s2",title:"Specialty Pharmacy Data",level:"h2"},
    {id:"s3",title:"Hub Services Data",level:"h2"},
    {id:"s4",title:"867 & 852 Distribution Data",level:"h2"},
    {id:"s5",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Prescribing & Market Data</h2>
<p>Prescribing data is the foundation of pharma commercial analytics. It tells brands how many prescriptions their drug — and competitor drugs — are being written, by which physicians, in which geographies.</p>
<h3>IQVIA (formerly IMS Health)</h3>
<p>IQVIA is the dominant provider of prescription data globally. Their products aggregate prescription information from pharmacies, wholesalers, and other sources into market-level and physician-level datasets.</p>
<table><thead><tr><th>IQVIA Product</th><th>What It Captures</th><th>Granularity</th></tr></thead><tbody>
<tr><td><strong>NPA (National Prescription Audit)</strong></td><td>Retail, mail, and long-term care prescription counts, projected to national level</td><td>Weekly, drug + geography + channel</td></tr>
<tr><td><strong>DDD (Xponent / Physician-level)</strong></td><td>Prescribing attributed to individual physicians by NPI</td><td>Monthly, drug + physician</td></tr>
<tr><td><strong>NSP (National Sales Perspectives)</strong></td><td>Units sold through wholesalers into pharmacies and hospitals</td><td>Monthly, drug + account</td></tr>
</tbody></table>
<h3>Symphony Health</h3>
<p>Symphony Health (acquired by PRA Health Sciences, now ICON) provides patient-level longitudinal data based on prescription transaction data. Unlike IQVIA's projected data, Symphony offers patient-deidentified longitudinal tracking across pharmacy fills, medical claims, and lab results.</p>
<h3>Komodo Health</h3>
<p>Komodo's Healthcare Map aggregates claims, Rx, lab, and clinical data into a longitudinal patient-level dataset emphasising completeness — covering both commercially insured and government-insured populations. Increasingly used for HEOR and patient journey analytics.</p>
<div class="callout warning"><div class="callout-title">Data Projections vs Actual Counts</div><p>IQVIA NPA data is a <em>projection</em> — IQVIA captures a sample of pharmacy transactions and projects to estimated national totals using statistical models. The projection methodology changes periodically and can cause apparent trend breaks even when underlying prescribing is stable. Always validate projection adjustments in trend analysis.</p></div>`},
    {id:"s2",content:`<h2 id="s2">Specialty Pharmacy Data</h2>
<p><strong>Specialty pharmacies</strong> dispense high-cost, complex medications — biologics, oncology drugs, rare disease therapies — that require special handling, patient monitoring, and support services. Most specialty products are distributed exclusively or predominantly through a limited number of specialty pharmacies (SP network).</p>
<h3>What Specialty Pharmacy Data Captures</h3>
<table><thead><tr><th>Data Element</th><th>Description</th><th>Analytics Use</th></tr></thead><tbody>
<tr><td><strong>Dispense records</strong></td><td>Every prescription fill: patient, drug, quantity, days supply, prescriber</td><td>TRx/NRx measurement, adherence tracking, time-to-fill</td></tr>
<tr><td><strong>Shipment data</strong></td><td>Ship date, delivery date, ship-to address, cold chain tracking</td><td>Supply chain analytics, distribution efficiency</td></tr>
<tr><td><strong>Prior authorisation outcomes</strong></td><td>PA submitted date, decision, denial reason, appeal outcome</td><td>Access analytics, PA success rate, denial pattern analysis</td></tr>
<tr><td><strong>Copay assistance utilisation</strong></td><td>Copay card applied, patient out-of-pocket, copay amount covered</td><td>Programme ROI, patient affordability analysis</td></tr>
<tr><td><strong>Discontinuation reason</strong></td><td>Why patient stopped filling (side effect, cost, efficacy, insurance)</td><td>Patient persistence analytics, targeted intervention design</td></tr>
<tr><td><strong>Inventory at SP</strong></td><td>Units on hand, units on order, days of supply</td><td>Supply planning, shortage risk identification</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">340B and SP Data</div><p>The 340B Drug Pricing Programme allows certain healthcare entities (covered entities) to purchase drugs at significant discounts. When 340B prescriptions are dispensed through contract pharmacies, attribution becomes complex — the dispense may appear in SP data under the contract pharmacy rather than the 340B entity. This creates significant data reconciliation challenges for brands with high 340B exposure.</p></div>`},
    {id:"s3",content:`<h2 id="s3">Hub Services Data</h2>
<p>A <strong>hub</strong> (patient support programme) is a centralised service that helps patients navigate access barriers: prior authorisations, benefit verification, copay assistance, and bridge therapy. Hub data is generated by every patient interaction with this support infrastructure.</p>
<h3>What Hub Data Captures</h3>
<table><thead><tr><th>Data Element</th><th>Description</th><th>Analytics Use</th></tr></thead><tbody>
<tr><td><strong>Enrolment</strong></td><td>When patient enrolled in the hub, referring HCP, diagnosis, insurance</td><td>Patient funnel entry, enrolment rate by HCP/territory</td></tr>
<tr><td><strong>Benefits investigation (BI)</strong></td><td>Insurance plan, formulary tier, prior auth requirements, estimated patient OOP</td><td>Access landscape, prior auth burden by payer</td></tr>
<tr><td><strong>Prior authorisation</strong></td><td>PA submission date, outcome, denial reason, turnaround time</td><td>PA success rate, denial patterns, appeal ROI</td></tr>
<tr><td><strong>Bridge therapy</strong></td><td>Free drug dispensed while PA is pending</td><td>Bridge-to-commercial conversion rate, bridge utilisation cost</td></tr>
<tr><td><strong>Copay assistance</strong></td><td>Copay card applied, amount covered, patient net OOP</td><td>Programme cost, patient affordability, copay card utilisation rate</td></tr>
<tr><td><strong>Case disposition</strong></td><td>Patient started commercial therapy, abandoned, or became free drug eligible</td><td>Patient funnel conversion, abandonment rate analysis</td></tr>
</tbody></table>
<div class="callout"><div class="callout-title">Hub Data Is the Most Granular Access View</div><p>No other data source provides the same level of detail on the access journey — from the moment a prescription is written to the moment a patient picks up their medication or abandons. For specialty brands where 30–40% of patients abandon during the access process, hub analytics is critical for identifying and reducing those barriers.</p></div>`},
    {id:"s4",content:`<h2 id="s4">867 & 852 Distribution Data</h2>
<p>These two EDI (Electronic Data Interchange) transaction types are the backbone of pharmaceutical supply chain data, exchanged between manufacturers, distributors (wholesalers), and dispensers (pharmacies, hospitals).</p>
<h3>852 — Product Activity Report (Inventory)</h3>
<p>The 852 transaction contains <strong>inventory and sales activity data reported by distributors and pharmacies to manufacturers</strong>. It tells manufacturers how much of their product is sitting at each downstream location and how much has been sold.</p>
<table><thead><tr><th>Field</th><th>Description</th></tr></thead><tbody>
<tr><td>Account identifier</td><td>Wholesaler or pharmacy location (DEA number, ship-to account)</td></tr>
<tr><td>NDC</td><td>National Drug Code identifying the specific product/strength/package size</td></tr>
<tr><td>Quantity on hand</td><td>Units currently in inventory at the reporting location</td></tr>
<tr><td>Quantity sold</td><td>Units sold from inventory in the reporting period</td></tr>
<tr><td>Quantity received</td><td>Units received from manufacturer in the reporting period</td></tr>
<tr><td>Days of supply</td><td>Estimated days until stockout at current sales velocity</td></tr>
</tbody></table>
<h3>867 — Product Transfer and Resale Report (Sell-Through)</h3>
<p>The 867 transaction contains <strong>sell-through data — units sold from distributors to their customers</strong> (retail pharmacies, hospitals, clinics). This is the data manufacturers use to understand actual demand at the point of dispensing.</p>
<table><thead><tr><th>Field</th><th>Description</th></tr></thead><tbody>
<tr><td>Ship-from (distributor)</td><td>The wholesaler or distributor who sold the product</td></tr>
<tr><td>Ship-to (customer)</td><td>The pharmacy, hospital, or clinic that received the product</td></tr>
<tr><td>NDC</td><td>Product identifier</td></tr>
<tr><td>Quantity sold</td><td>Units transferred in the transaction</td></tr>
<tr><td>Transaction date</td><td>Date of the sale/shipment</td></tr>
</tbody></table>
<div class="rule-step"><span class="rule-step-num">852 vs 867 Summary</span><span>852 = inventory position (how much is sitting in each warehouse/pharmacy). 867 = what actually moved from distributor to pharmacy. Together they give a complete picture of the distribution channel — inventory levels, sell-in velocity, and sell-through to dispensers.</span></div>`},
    {id:"s5",content:`<h2 id="s5">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>IQVIA and Symphony Health are the two dominant Rx data providers. IQVIA provides projected market-level data; Symphony provides patient-level longitudinal data. Both are essential for commercial analytics.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>Specialty pharmacy data is the most granular source for patient-level access and adherence analytics on specialty products — covering dispense records, PA outcomes, copay utilisation, and discontinuation reasons.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Hub data captures the full access journey from enrolment through PA, bridge therapy, and commercial therapy initiation. It is the primary lens for access barrier analysis on specialty and rare disease brands.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>852 data shows inventory positions at distributors and pharmacies; 867 data shows sell-through from distributors to dispensers. Together they provide complete supply chain visibility.</div></div>`}
  ],
  quiz:[
    {q:"IQVIA NPA data represents:",options:["Actual prescription counts from all US pharmacies","Projected national prescription totals based on a sample of pharmacy transactions","Patient-level longitudinal prescription history","Only specialty pharmacy dispense records"],answer:1},
    {q:"Which data source would you use to analyse the prior authorisation denial rate by insurance plan for a specialty biologic?",options:["852 inventory data","IQVIA NPA","Hub services data","867 sell-through data"],answer:2},
    {q:"An 867 transaction contains:",options:["Inventory on hand at a wholesaler","Units sold from a distributor to a pharmacy or hospital","Patient-level prescription records","Copay card utilisation by patient"],answer:1}
  ]
},

"6-9": {
  id:"6-9", title:"Clinical Datasets", domain:"Data Engineering & Pharma Datasets", domain_id:6,
  level:"Intermediate", mins:40, available:true,
  tags:["EHR","EMR","Claims","Labs","Genomics","Clinical Trials","Real-World Data"],
  objectives:["Understand what EHR and EMR data contains and its limitations","Distinguish medical claims from pharmacy claims","Explain laboratory data types and their analytics applications","Understand genomics data and its role in precision medicine analytics"],
  toc:[
    {id:"s1",title:"EHR & EMR Data",level:"h2"},
    {id:"s2",title:"Medical & Pharmacy Claims",level:"h2"},
    {id:"s3",title:"Laboratory Data",level:"h2"},
    {id:"s4",title:"Genomics Data",level:"h2"},
    {id:"s5",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">EHR & EMR Data</h2>
<p><strong>Electronic Health Records (EHR)</strong> and <strong>Electronic Medical Records (EMR)</strong> are digital records of patient clinical information captured during care delivery. The distinction: EMR is a single practice's record; EHR is designed to share and move with the patient across providers and settings.</p>
<h3>What EHR Data Contains</h3>
<table><thead><tr><th>Data Element</th><th>Format</th><th>Analytics Application</th></tr></thead><tbody>
<tr><td><strong>Diagnoses</strong></td><td>ICD-10 codes (structured)</td><td>Patient identification, disease progression, comorbidity analysis</td></tr>
<tr><td><strong>Procedures</strong></td><td>CPT/HCPCS codes (structured)</td><td>Treatment pattern analysis, surgery rates, procedure timing</td></tr>
<tr><td><strong>Medications</strong></td><td>Drug name, dose, frequency (structured); prescription notes (unstructured)</td><td>Line of therapy, dose titration analysis, drug-drug interactions</td></tr>
<tr><td><strong>Laboratory results</strong></td><td>LOINC codes + numeric values (structured)</td><td>Biomarker levels, disease activity scores, treatment response</td></tr>
<tr><td><strong>Vital signs</strong></td><td>Structured numeric values</td><td>Disease severity tracking, outcomes monitoring</td></tr>
<tr><td><strong>Clinical notes</strong></td><td>Free-text (unstructured)</td><td>NLP for diagnosis extraction, treatment rationale, adverse events</td></tr>
<tr><td><strong>Imaging reports</strong></td><td>Structured summary + unstructured narrative</td><td>Tumour assessment, imaging-based endpoints</td></tr>
</tbody></table>
<div class="callout warning"><div class="callout-title">Key EHR Limitations</div><p>EHR data is <em>captured for clinical care, not research</em>. This creates important biases: only what clinicians document is recorded; documentation varies enormously by provider; data completeness depends on which practices use which EHR systems. Absence of a diagnosis code does not mean absence of disease — it may mean the clinician didn't code it, or the patient was seen at a different health system not included in the dataset.</p></div>`},
    {id:"s2",content:`<h2 id="s2">Medical & Pharmacy Claims</h2>
<p><strong>Claims data</strong> is generated whenever a healthcare service is billed to insurance. It is the most widely used data source in pharma analytics because it covers a large, defined population (insurance enrollees) with structured, consistently formatted records.</p>
<h3>Medical Claims (Professional & Facility)</h3>
<table><thead><tr><th>Field</th><th>Description</th></tr></thead><tbody>
<tr><td>Member ID</td><td>Patient identifier within the insurance plan</td></tr>
<tr><td>Service date</td><td>Date of the clinical encounter or procedure</td></tr>
<tr><td>Diagnosis codes</td><td>ICD-10 codes describing why the patient was seen (up to 12 per claim)</td></tr>
<tr><td>Procedure codes</td><td>CPT/HCPCS codes describing what was done</td></tr>
<tr><td>Provider NPI</td><td>Treating physician or facility identifier</td></tr>
<tr><td>Place of service</td><td>Setting: inpatient, outpatient, office, emergency department</td></tr>
<tr><td>Paid amount</td><td>What the insurer paid (not list price)</td></tr>
</tbody></table>
<h3>Pharmacy Claims</h3>
<table><thead><tr><th>Field</th><th>Description</th></tr></thead><tbody>
<tr><td>NDC</td><td>National Drug Code — identifies the exact drug, strength, and package</td></tr>
<tr><td>Fill date</td><td>Date the prescription was dispensed</td></tr>
<tr><td>Days supply</td><td>Number of days the dispensed quantity should last</td></tr>
<tr><td>Quantity dispensed</td><td>Units dispensed (tablets, vials, grams)</td></tr>
<tr><td>Prescriber NPI</td><td>The physician who wrote the prescription</td></tr>
<tr><td>Pharmacy NPI</td><td>The pharmacy that dispensed the medication</td></tr>
<tr><td>Patient copay</td><td>Amount patient paid out of pocket</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">Claims Data Completeness Caveat</div><p>Claims data only captures care that was billed to insurance. Uninsured patients, some Medicaid populations, and VA patients may not appear. Cash-pay prescriptions — increasingly common with GoodRx — do not generate insurance claims. Specialty drugs administered in the office (buy-and-bill) appear on medical claims as J-codes, not pharmacy claims. Understanding these gaps is critical for patient population sizing.</p></div>`},
    {id:"s3",content:`<h2 id="s3">Laboratory Data</h2>
<p>Laboratory data captures diagnostic test orders and results — a critical source for understanding disease severity, treatment eligibility, monitoring response, and detecting adverse events.</p>
<h3>Types of Laboratory Data Sources</h3>
<table><thead><tr><th>Source Type</th><th>What It Contains</th><th>Pharma Application</th></tr></thead><tbody>
<tr><td><strong>Reference lab data</strong> (Quest, LabCorp)</td><td>Test orders + results from outpatient settings; LOINC-coded, large population coverage</td><td>Biomarker testing rates, diagnosis confirmation, treatment monitoring</td></tr>
<tr><td><strong>Hospital lab data</strong></td><td>Inpatient and outpatient results from a health system's own labs</td><td>Disease severity scores, inpatient treatment response, safety monitoring</td></tr>
<tr><td><strong>Specialty/molecular lab data</strong></td><td>Genomic/NGS results, liquid biopsy, biomarker panels</td><td>Biomarker prevalence, companion diagnostic testing rates, precision medicine analytics</td></tr>
<tr><td><strong>POC (point-of-care) data</strong></td><td>Rapid test results from clinics and pharmacies (glucose, flu, COVID)</td><td>Disease monitoring in real-world settings, adherence proxy measures</td></tr>
</tbody></table>
<h3>Key Laboratory Data Concepts</h3>
<ul>
<li><strong>LOINC codes:</strong> Standardised codes for laboratory tests and observations. LOINC is the universal language for lab data — critical for harmonising lab results across different EHR systems and laboratory providers.</li>
<li><strong>Reference ranges:</strong> Each lab result has a reference range (normal range). Results outside the range are flagged as high/low. Reference ranges vary by lab and methodology — normalisation is required for cross-source analysis.</li>
<li><strong>Test sensitivity and specificity:</strong> A lab test that frequently returns false negatives (low sensitivity) or false positives (low specificity) will misclassify patients — affecting cohort definition accuracy in research studies.</li>
</ul>`},
    {id:"s4",content:`<h2 id="s4">Genomics Data</h2>
<p>Genomics data captures information about a patient's DNA — inherited variants, somatic mutations, gene expression patterns — enabling precision medicine: matching patients to therapies based on their molecular profile rather than population averages.</p>
<h3>Types of Genomics Data</h3>
<table><thead><tr><th>Type</th><th>What It Measures</th><th>Pharma Application</th></tr></thead><tbody>
<tr><td><strong>Germline sequencing</strong></td><td>Inherited genetic variants present in all cells (from birth)</td><td>Hereditary disease risk, pharmacogenomics (how patients metabolise drugs), biomarker eligibility screening</td></tr>
<tr><td><strong>Somatic / tumour sequencing</strong></td><td>Mutations acquired in tumour cells (not inherited)</td><td>Companion diagnostic testing in oncology, targeted therapy selection (EGFR, KRAS, ALK mutations)</td></tr>
<tr><td><strong>Liquid biopsy</strong></td><td>Circulating tumour DNA (ctDNA) from a blood sample</td><td>Non-invasive tumour monitoring, resistance mutation detection, minimal residual disease tracking</td></tr>
<tr><td><strong>RNA sequencing</strong></td><td>Gene expression levels — which genes are active and at what level</td><td>Pathway activation analysis, drug mechanism of action research, subgroup identification</td></tr>
<tr><td><strong>Biobank data</strong></td><td>DNA samples linked to longitudinal clinical data from consented research participants</td><td>Genome-wide association studies (GWAS), target identification, population genetics</td></tr>
</tbody></table>
<h3>Genomics Data Challenges in Analytics</h3>
<ul>
<li><strong>Volume:</strong> A single whole genome sequence is ~200GB of raw data. A cohort of 10,000 patients generates 2PB of raw data — requiring specialised cloud genomics platforms.</li>
<li><strong>Variant annotation:</strong> Raw variants must be annotated against databases (ClinVar, COSMIC, gnomAD) to determine clinical significance.</li>
<li><strong>Linkage to clinical data:</strong> Genomics data alone is of limited value — it must be linked to longitudinal clinical outcomes data, which requires robust patient matching and de-identification protocols.</li>
</ul>
<div class="callout info"><div class="callout-title">Companion Diagnostics and Real-World Genomics</div><p>For oncology drugs with companion diagnostics (e.g., anti-EGFR therapy requires EGFR mutation testing), understanding real-world testing rates is critical. If only 40% of eligible patients are being tested, 60% of potential candidates are never identified. Molecular lab data from vendors like Foundation Medicine, Tempus, and Guardant Health provides real-world NGS testing rates across oncology indications.</p></div>`},
    {id:"s5",content:`<h2 id="s5">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>EHR data is rich and longitudinal but captured for clinical care — not research. Coding variation, documentation gaps, and site-of-care biases must be accounted for in any analysis.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>Claims data (medical + pharmacy) is the workhorse of commercial pharma analytics — standardised, large-population coverage, and billing-motivated completeness. But it misses cash-pay, uninsured, and VA populations.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>LOINC is the standardised code system for laboratory tests. Cross-source lab data integration requires LOINC harmonisation and reference range normalisation.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>Genomics data enables precision medicine — matching patients to targeted therapies based on molecular profiles. Real-world testing rate data from molecular labs is critical for companion diagnostic market analytics.</div></div>`}
  ],
  quiz:[
    {q:"Why might a patient's diagnosis be absent from claims data despite having the condition?",options:["Claims data only includes inpatient records","The patient paid cash, is uninsured, or was seen by a provider not captured in the dataset","Claims data does not include diagnosis codes","Diagnoses are only captured in genomics data"],answer:1},
    {q:"LOINC codes are used to standardise:",options:["Drug National Drug Codes","Laboratory test names and observations","ICD-10 diagnosis codes","Insurance plan identifiers"],answer:1},
    {q:"Liquid biopsy in oncology detects:",options:["Germline genetic variants inherited at birth","Circulating tumour DNA from a blood sample","Gene expression levels in healthy tissue","Whole genome sequences of tumour biopsies"],answer:1}
  ]
},

"6-10": {
  id:"6-10", title:"Supply Chain & Operations Data", domain:"Data Engineering & Pharma Datasets", domain_id:6,
  level:"Intermediate", mins:35, available:true,
  tags:["Supply Chain","852","867","Chargeback","3PL","Inventory","Serialization"],
  objectives:["Understand the pharmaceutical supply chain data flow end to end","Analyse inventory health using 852 data","Understand chargeback and rebate data structures","Explain 3PL data and its role in distribution analytics"],
  toc:[
    {id:"s1",title:"Pharma Supply Chain Overview",level:"h2"},
    {id:"s2",title:"Inventory & 852 Data",level:"h2"},
    {id:"s3",title:"Chargeback & Rebate Data",level:"h2"},
    {id:"s4",title:"3PL & Distribution Data",level:"h2"},
    {id:"s5",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Pharma Supply Chain Overview</h2>
<p>The pharmaceutical supply chain moves product from manufacturer to patient through a series of intermediaries. Each handoff generates data that manufacturers can use for supply planning, demand sensing, and channel analytics.</p>
<div class="flow-box">Manufacturer → 3PL (Third-Party Logistics) → Wholesalers / Distributors → Pharmacies / Hospitals / Clinics → Patients</div>
<h3>Key Supply Chain Data Sources</h3>
<table><thead><tr><th>Data Source</th><th>Who Provides It</th><th>What It Captures</th></tr></thead><tbody>
<tr><td><strong>852 (Inventory)</strong></td><td>Wholesalers, pharmacies, SPs</td><td>Inventory on hand, units sold, units received at each location</td></tr>
<tr><td><strong>867 (Sell-through)</strong></td><td>Distributors / wholesalers</td><td>Units sold from distributor to pharmacy/hospital, with ship-to account detail</td></tr>
<tr><td><strong>Chargeback data</strong></td><td>Wholesalers (submitted to manufacturer)</td><td>Contracts applied to transactions, net price per unit after contract discounts</td></tr>
<tr><td><strong>3PL data</strong></td><td>Third-party logistics providers</td><td>Shipments from manufacturer to wholesaler, lot numbers, expiry dates, temperatures</td></tr>
<tr><td><strong>Serialization / Track &amp; Trace</strong></td><td>All supply chain parties</td><td>Unique serial number per unit, chain of custody from manufacturer to dispenser</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">DSCSA — The Drug Supply Chain Security Act</div><p>The US DSCSA requires manufacturers to track and trace prescription drug products at the unit level using a unique serialized identifier — the Drug Supply Chain Security code. By 2025, the full interoperable electronic track-and-trace system must be in place across all supply chain partners. This generates enormous serialization data that can be used for supply chain analytics, diversion detection, and recall management.</p></div>`},
    {id:"s2",content:`<h2 id="s2">Inventory & 852 Data</h2>
<p>Effective inventory management prevents two costly failure modes: stockouts (pharmacies run out of product, patients cannot access therapy) and excess inventory (product approaching expiry must be destroyed, or channel partners return product at manufacturer expense).</p>
<h3>852 Data Fields</h3>
<table><thead><tr><th>Field</th><th>Description</th><th>Analytics Use</th></tr></thead><tbody>
<tr><td>Account / DEA number</td><td>Identifies the reporting wholesaler or pharmacy location</td><td>Account-level inventory visibility, geographic distribution coverage</td></tr>
<tr><td>NDC</td><td>Identifies the specific product, strength, and pack size</td><td>SKU-level inventory analysis, package size optimisation</td></tr>
<tr><td>Quantity on hand (QOH)</td><td>Units currently in inventory</td><td>Days of supply calculation, stockout risk</td></tr>
<tr><td>Quantity sold (QOS)</td><td>Units sold in the reporting period</td><td>Sell-through velocity, demand sensing</td></tr>
<tr><td>Quantity received (QOR)</td><td>Units received from manufacturer</td><td>Order fulfilment verification, shipment reconciliation</td></tr>
<tr><td>Report period</td><td>Week or month the data covers</td><td>Trend analysis, seasonality</td></tr>
</tbody></table>
<h3>Key Inventory Analytics</h3>
<div class="formula-box"><div class="formula-label">Days of Supply (DOS)</div><div class="formula-main">DOS = Quantity On Hand ÷ Average Daily Sales Rate</div></div>
<p>DOS below 7 triggers urgent replenishment orders; DOS above 60 on a short-expiry product triggers disposal risk alerts. Target range varies by product and channel: typically 30–45 days for wholesalers, 14–21 days for retail pharmacies.</p>
<div class="formula-box"><div class="formula-label">Inventory Turnover</div><div class="formula-main">Inventory Turnover = Annual Units Sold ÷ Average Units On Hand</div></div>`},
    {id:"s3",content:`<h2 id="s3">Chargeback & Rebate Data</h2>
<p><strong>Chargebacks</strong> are the mechanism by which manufacturers honour contractual pricing commitments to end customers (hospitals, GPOs, government entities) who buy product through wholesalers at the wholesaler's acquisition cost — which is higher than the contract price. The wholesaler submits a chargeback to the manufacturer for the difference.</p>
<h3>How Chargebacks Work</h3>
<div class="flow-box">Manufacturer sells to Wholesaler at WAC → Wholesaler sells to Contract Customer at Contract Price → Wholesaler submits Chargeback to Manufacturer for (WAC − Contract Price) → Manufacturer pays Chargeback and reconciles contract compliance</div>
<h3>Chargeback Data Fields</h3>
<table><thead><tr><th>Field</th><th>Description</th></tr></thead><tbody>
<tr><td>Wholesaler</td><td>Which distributor is submitting the chargeback</td></tr>
<tr><td>End customer (ship-to)</td><td>The hospital, GPO member, or government facility that received the product</td></tr>
<tr><td>Contract ID</td><td>Which contract governs this transaction's price</td></tr>
<tr><td>NDC</td><td>Product purchased</td></tr>
<tr><td>Quantity</td><td>Units subject to the chargeback</td></tr>
<tr><td>WAC (Wholesaler Acquisition Cost)</td><td>Price the wholesaler paid</td></tr>
<tr><td>Contract price</td><td>Price the end customer is entitled to</td></tr>
<tr><td>Chargeback amount</td><td>WAC − Contract Price × Quantity</td></tr>
</tbody></table>
<div class="callout warning"><div class="callout-title">Chargeback Analytics for Gross-to-Net</div><p>Chargebacks are a major component of gross-to-net deductions. Analysing chargebacks by contract, customer class, and product enables finance teams to accurately model net realised price and identify contracts with compliance or pricing issues. Inaccurate chargeback processing can result in over- or under-payment to wholesalers and incorrect revenue recognition.</p></div>`},
    {id:"s4",content:`<h2 id="s4">3PL & Distribution Data</h2>
<p>Most pharmaceutical manufacturers outsource physical warehousing and distribution to <strong>third-party logistics (3PL) providers</strong> — specialised companies with licensed pharmaceutical distribution facilities, cold chain capabilities, and regulatory expertise.</p>
<h3>What 3PL Data Captures</h3>
<table><thead><tr><th>Data Element</th><th>Description</th><th>Analytics Use</th></tr></thead><tbody>
<tr><td><strong>Shipment records</strong></td><td>Every outbound shipment: recipient, NDC, lot, quantity, ship date, delivery date</td><td>Order fulfilment rate, delivery lead times, distribution coverage</td></tr>
<tr><td><strong>Lot and expiry tracking</strong></td><td>Lot number and expiry date for each unit shipped</td><td>FEFO (First Expired, First Out) management, recall scope identification</td></tr>
<tr><td><strong>Cold chain records</strong></td><td>Temperature readings throughout transit for cold-requiring products</td><td>Excursion detection, product disposition decisions, regulatory documentation</td></tr>
<tr><td><strong>Inventory on hand at 3PL</strong></td><td>Current manufacturer inventory at the 3PL facility by lot and expiry</td><td>Available-to-ship calculation, shortage risk assessment</td></tr>
<tr><td><strong>Returns data</strong></td><td>Product returned from wholesalers, including lot, reason, and credit issued</td><td>Return rate analytics, excess inventory identification, quality signal detection</td></tr>
</tbody></table>
<h3>Recalls and Serialization</h3>
<p>When a recall is issued, serialization data is essential. A unit-level serial number traces exactly which units went to which distribution centres, which wholesalers, and which pharmacies — enabling targeted, efficient recalls rather than broad market withdrawals. Without serialization, manufacturers must rely on lot-level data, which may result in recalling far more product than necessary.</p>`},
    {id:"s5",content:`<h2 id="s5">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>The pharma supply chain generates data at every handoff: 3PL shipments → wholesaler inventory (852) → sell-through to pharmacies (867) → dispense to patients (pharmacy claims / SP data).</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>852 inventory data enables Days of Supply monitoring — the primary leading indicator of stockout risk. Target DOS ranges by channel: 30–45 days at wholesaler, 14–21 days at retail pharmacy.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Chargebacks reconcile the difference between what wholesalers pay (WAC) and what contract customers are entitled to pay. Chargeback analytics are essential for gross-to-net modelling and contract compliance.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>3PL data provides shipment, lot, cold chain, and return records. Serialization data at the unit level enables targeted recalls and complete chain-of-custody traceability under DSCSA requirements.</div></div>`}
  ],
  quiz:[
    {q:"What does an 867 transaction represent?",options:["Inventory on hand at a wholesaler","Units sold from a distributor to a pharmacy or hospital (sell-through)","Patient prescription fills at a specialty pharmacy","Manufacturer shipments to a 3PL"],answer:1},
    {q:"A biologic product has 5 units on hand at a wholesaler and average daily sales of 0.5 units. What is the Days of Supply?",options:["2.5 days","10 days","5 days","1 day"],answer:1},
    {q:"A chargeback is submitted by:",options:["The patient to their insurance company","A wholesaler to the manufacturer to recover the difference between WAC and the contract price","The manufacturer to the FDA","A pharmacy to the wholesaler"],answer:1}
  ]
},


"6-11": {
  id:"6-11", title:"Commercial Analytics KPIs", domain:"Data Engineering & Pharma Datasets", domain_id:6,
  level:"Intermediate", mins:38, available:true,
  tags:["KPIs","Rx Analytics","Patient Adherence","Market Share","Forecasting"],
  objectives:["Define and compute the core Rx volume KPIs (TRx, NRx, NBRx)","Calculate market share and patient share correctly","Apply adherence metrics (PDC, MPR) to real scenarios","Understand pipeline and pull-through KPIs"],
  toc:[
    {id:"s1",title:"Rx Volume Metrics",level:"h2"},
    {id:"s2",title:"Market Share & Patient Share",level:"h2"},
    {id:"s3",title:"Adherence & Persistency Metrics",level:"h2"},
    {id:"s4",title:"Pipeline & Pull-Through KPIs",level:"h2"},
    {id:"s5",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Rx Volume Metrics</h2>
<p>Prescription volume KPIs are the heartbeat of pharma commercial analytics. Every brand team, sales force, and forecaster lives by these numbers.</p>
<table><thead><tr><th>Metric</th><th>Full Name</th><th>Definition</th><th>Formula / Notes</th></tr></thead><tbody>
<tr><td><strong>TRx</strong></td><td>Total Prescriptions</td><td>All prescriptions dispensed in a period — new, refills, everything</td><td>Count of all dispensing events from pharmacy claims or audit data</td></tr>
<tr><td><strong>NRx</strong></td><td>New Prescriptions</td><td>First fill of a prescription for a patient in a rolling look-back window (typically 90 or 180 days)</td><td>TRx where no prior fill exists in the look-back window</td></tr>
<tr><td><strong>NBRx</strong></td><td>New-to-Brand Prescriptions</td><td>First fill on <em>this specific brand</em> — patient may have been on a competitor previously</td><td>NRx with an additional filter: no prior fill of the same brand in a longer look-back (e.g., 12 months)</td></tr>
<tr><td><strong>Refills</strong></td><td>Refill Prescriptions</td><td>Subsequent fills after the initial dispensing</td><td>TRx − NRx</td></tr>
<tr><td><strong>Days Supply</strong></td><td>—</td><td>Number of days' worth of medication dispensed per fill</td><td>Usually 30, 60, or 90 days; specialty often 30</td></tr>
</tbody></table>
<div class="callout info"><div class="callout-title">NRx vs NBRx — Why Both Matter</div><p>NRx tells you how many patients are starting therapy (any). NBRx tells you how many are choosing <em>your brand</em> for the first time. In competitive markets, NBRx share is the leading indicator of brand momentum — even if TRx is flat, growing NBRx means you are winning new patients and losing fewer to churn.</p></div>
<h3>TRx Equivalents (TRxEq)</h3>
<p>When a brand has multiple pack sizes (e.g., 30-day and 90-day supplies), analysts sometimes normalise to 30-day equivalents:</p>
<div class="flow-box">TRxEq = Σ (days_supply per fill ÷ 30)</div>
<p>This makes volume comparable across channels (retail vs mail vs specialty) where dispensing norms differ.</p>
<h3>Data Sources for Rx Metrics</h3>
<table><thead><tr><th>Source</th><th>Coverage</th><th>Lag</th></tr></thead><tbody>
<tr><td>IQVIA NPA (National Prescription Audit)</td><td>~88% of US retail pharmacy transactions projected to 100%</td><td>Weekly (2-week lag)</td></tr>
<tr><td>Symphony Health PHAST</td><td>Retail, mail, LTC — not specialty</td><td>Weekly</td></tr>
<tr><td>Komodo Health</td><td>Claims-based, patient-level linkage</td><td>Monthly (30–60 day lag)</td></tr>
<tr><td>Specialty Pharmacy Hub Data</td><td>Brand-specific specialty patients</td><td>Weekly or daily (real-time feeds)</td></tr>
</tbody></table>`},
    {id:"s2",content:`<h2 id="s2">Market Share & Patient Share</h2>
<h3>Market Share (Volume-Based)</h3>
<p>Market share measures a brand's proportion of total prescriptions within its defined market (class or indication).</p>
<div class="flow-box">Market Share (%) = (Brand TRx ÷ Class TRx) × 100</div>
<p><strong>Example:</strong> If Brand A has 120,000 TRx and the total SGLT2 inhibitor class has 800,000 TRx, Brand A's market share = 15%.</p>
<div class="callout"><div class="callout-title">Defining the Market</div><p>Market definition is a deliberate choice. Including or excluding a competitor changes the denominator — and your share. Typical approaches: ATC class (WHO Anatomical Therapeutic Chemical code), mechanism of action, indication, or a custom competitive set defined by brand strategy.</p></div>
<h3>New-to-Brand Share</h3>
<p>NBRx share is the leading indicator — it reflects today's prescribing decisions, which show up as TRx share only after patients accumulate refills.</p>
<div class="flow-box">NBRx Share (%) = (Brand NBRx ÷ Class NBRx) × 100</div>
<h3>Patient Share</h3>
<p>Patient share counts unique patients rather than prescription events. Because refill frequency varies by therapy, patient share can differ significantly from Rx share.</p>
<div class="flow-box">Patient Share (%) = (Patients on Brand ÷ Patients on Any Brand in Class) × 100</div>
<p>Patient share requires patient-level data (claims, hub data) — it cannot be computed from aggregated prescription audits like IQVIA NPA without patient linkage.</p>
<h3>Segment Share</h3>
<p>Analysts often break share by segment: specialty vs primary care prescribers, geography (region, state, MSA), payer type (commercial, Medicare Part D, Medicaid), or formulary tier. Segment share identifies where a brand is winning or losing and directs sales force effort.</p>
<table><thead><tr><th>Segment Dimension</th><th>Why It Matters</th></tr></thead><tbody>
<tr><td>HCP specialty</td><td>Specialists often drive 80% of Rx in a niche disease — target high-value prescribers</td></tr>
<tr><td>Geography (state/MSA)</td><td>Identifies underpenetrated markets for field force reallocation</td></tr>
<tr><td>Payer / formulary tier</td><td>Preferred formulary status directly impacts patient access and Rx volume</td></tr>
<tr><td>Channel (retail vs specialty vs mail)</td><td>Specialty channel growing for biologics; mail-order indicates adherence and chronic use</td></tr>
</tbody></table>`},
    {id:"s3",content:`<h2 id="s3">Adherence & Persistency Metrics</h2>
<p>Adherence and persistency KPIs measure whether patients continue taking their medication as prescribed. They are critical for chronic disease brands and influence both patient outcomes and revenue (because discontinued patients stop generating refills).</p>
<h3>Proportion of Days Covered (PDC)</h3>
<p>PDC is the preferred adherence metric endorsed by the Pharmacy Quality Alliance (PQA). It counts the proportion of days in an observation period where the patient had medication available, <em>without double-counting overlapping fills</em>.</p>
<div class="flow-box">PDC = Days Covered ÷ Observation Period Days</div>
<p><strong>Example:</strong> Over a 180-day observation period, a patient fills: 30-day supply on Day 1, 30-day supply on Day 28, 30-day supply on Day 90. Days covered = 30 + 30 + 30 = 90. PDC = 90 ÷ 180 = 0.50 (50%). A PDC ≥ 0.80 is typically defined as adherent.</p>
<div class="callout info"><div class="callout-title">PDC Rule: No Double-Counting</div><p>If a patient refills early (before the previous supply runs out), the overlap days are not counted twice. The new fill's effective start date is shifted to the day after the previous supply ends. This prevents early refills from artificially inflating adherence.</p></div>
<h3>Medication Possession Ratio (MPR)</h3>
<p>MPR is an older metric that divides total days supply dispensed by the observation period. Unlike PDC, it <em>can</em> exceed 1.0 if a patient stockpiles (early fills).</p>
<div class="flow-box">MPR = Total Days Supply Dispensed ÷ Days in Observation Period</div>
<p>MPR is simpler to compute but overestimates adherence when patients refill early. PDC is preferred in outcomes research; MPR is still used in some CRM and field analytics tools for operational simplicity.</p>
<h3>Persistency</h3>
<p>Persistency measures how long patients stay on therapy from initiation, without a treatment gap exceeding a defined threshold (typically 30, 45, or 60 days).</p>
<table><thead><tr><th>Metric</th><th>Measures</th><th>Output</th></tr></thead><tbody>
<tr><td><strong>Persistency Rate at Month N</strong></td><td>% of patients still on therapy at month N from initiation</td><td>"60% of patients are still on therapy at Month 6"</td></tr>
<tr><td><strong>Median Time to Discontinuation</strong></td><td>Median months until a patient stops (gap > threshold)</td><td>"Median time to discontinuation = 8 months"</td></tr>
<tr><td><strong>Discontinuation Rate</strong></td><td>% of patients who stop therapy within a defined window</td><td>"30% of NBRx patients discontinue within 90 days"</td></tr>
</tbody></table>
<h3>Abandonment Rate</h3>
<p>Abandonment occurs when a prescription is sent to the pharmacy but never picked up or never filled (for specialty, when an enrollment is started but never converted to a dispense).</p>
<div class="flow-box">Abandonment Rate (%) = Prescriptions Abandoned ÷ Prescriptions Submitted × 100</div>
<p>High abandonment often signals a patient access problem — cost, prior authorisation burden, or insurance denial. Hub data (for specialty drugs) is the primary source for abandonment metrics because retail pharmacy data does not capture abandoned e-prescribes.</p>`},
    {id:"s4",content:`<h2 id="s4">Pipeline & Pull-Through KPIs</h2>
<h3>Days on Therapy (DoT)</h3>
<p>Average number of days a patient cohort has been on therapy from initiation to the end of observation (or discontinuation). Higher DoT means patients stay longer — a key driver of brand revenue.</p>
<div class="flow-box">DoT (avg) = Σ(Days Each Patient Was on Therapy) ÷ Number of Patients</div>
<h3>Pull-Through Rate</h3>
<p>Pull-through measures the conversion of prescriptions written by HCPs into actual dispensing events at the pharmacy or specialty pharmacy. A prescription written is not revenue until it is filled.</p>
<div class="flow-box">Pull-Through Rate (%) = Prescriptions Dispensed ÷ Prescriptions Written × 100</div>
<p>In specialty pharma, pull-through is tracked through the hub/SP channel. A typical pull-through rate for a biologic may be 60–75%, with the remainder lost to prior auth denials, abandonment, patient cost concerns, or formulary barriers.</p>
<h3>Prior Auth (PA) Metrics</h3>
<table><thead><tr><th>Metric</th><th>Formula</th><th>Business Question</th></tr></thead><tbody>
<tr><td>PA Approval Rate</td><td>Approvals ÷ Submissions × 100</td><td>How often do PA requests succeed?</td></tr>
<tr><td>PA Denial Rate</td><td>Denials ÷ Submissions × 100</td><td>Which payers are denying most?</td></tr>
<tr><td>Average PA Processing Time</td><td>Avg(approval_date − submission_date)</td><td>How long is the access journey?</td></tr>
<tr><td>Appeal Success Rate</td><td>Appeals Won ÷ Appeals Filed × 100</td><td>Is it worth appealing denials?</td></tr>
</tbody></table>
<h3>New-to-Brand Rate (NBRx Rate)</h3>
<p>The fraction of all prescriptions for a brand that are New-to-Brand — a measure of how well the brand is attracting new patients relative to sustaining existing patients.</p>
<div class="flow-box">NBRx Rate (%) = NBRx ÷ TRx × 100</div>
<p>A brand in early launch will have a high NBRx rate (most fills are new patients). A mature brand will have a low NBRx rate (most fills are refills from existing patients). Declining NBRx rate can signal that the brand is aging and losing the new-patient battle to competitors.</p>
<h3>Summary: Commercial Analytics KPI Quick Reference</h3>
<table><thead><tr><th>KPI</th><th>Formula</th><th>Typical Benchmark</th></tr></thead><tbody>
<tr><td>TRx</td><td>Count of all fills</td><td>Context-dependent by brand</td></tr>
<tr><td>NRx</td><td>TRx with no prior fill in look-back window</td><td>Context-dependent</td></tr>
<tr><td>NBRx</td><td>NRx with no prior brand fill in 12-month window</td><td>Context-dependent</td></tr>
<tr><td>Market Share</td><td>Brand TRx ÷ Class TRx × 100</td><td>Target varies by launch stage</td></tr>
<tr><td>PDC</td><td>Days covered ÷ observation days</td><td>≥ 0.80 = adherent</td></tr>
<tr><td>MPR</td><td>Days supply dispensed ÷ observation days</td><td>≥ 0.80 = adherent (can exceed 1.0)</td></tr>
<tr><td>Abandonment Rate</td><td>Abandoned Rx ÷ Submitted Rx × 100</td><td>&lt; 10–15% is acceptable in specialty</td></tr>
<tr><td>Pull-Through Rate</td><td>Dispensed ÷ Written × 100</td><td>60–80% for biologics</td></tr>
<tr><td>PA Approval Rate</td><td>Approved ÷ Submitted × 100</td><td>&gt; 85% is strong</td></tr>
<tr><td>NBRx Rate</td><td>NBRx ÷ TRx × 100</td><td>High in launch, declines at maturity</td></tr>
</tbody></table>`},
    {id:"s5",content:`<h2 id="s5">Key Takeaways</h2>
<ul>
<li><strong>TRx captures total volume</strong>; NRx and NBRx capture new patient momentum — leading indicators of brand trajectory.</li>
<li><strong>Market share</strong> is only meaningful when the market (denominator) is defined consistently and deliberately.</li>
<li><strong>PDC is preferred over MPR</strong> for adherence in outcomes research because it does not double-count overlapping fills.</li>
<li><strong>PDC ≥ 0.80</strong> is the standard definition of an adherent patient; below 0.80 signals a clinical and commercial risk.</li>
<li><strong>Abandonment and pull-through</strong> live in hub and specialty pharmacy data — retail pharmacy audits alone cannot measure them.</li>
<li><strong>PA metrics</strong> are a critical access signal: high denial rates indicate a market access problem that formulary strategy or patient assistance programmes need to address.</li>
<li><strong>NBRx rate trending down</strong> in a mature brand is normal; a sudden drop signals competitive encroachment or access deterioration.</li>
</ul>`}
  ],
  quiz:[
    {q:"Which metric counts every prescription dispensed — new and refill — for a brand in a given period?",options:["NRx","NBRx","TRx","PDC"],answer:2},
    {q:"A patient fills a 30-day supply on Day 1, then refills early with a 30-day supply on Day 20. Using PDC over a 60-day observation period, how many days are covered?",options:["60 days (the entire period)","50 days","30 days","40 days"],answer:1},
    {q:"Brand X has 200,000 TRx. The total class has 1,000,000 TRx. What is Brand X's market share?",options:["5%","20%","15%","25%"],answer:1},
    {q:"What does a pull-through rate of 65% mean?",options:["65% of patients are adherent","65% of prescriptions written are actually dispensed","65% of prior auth requests are approved","65% of patients refill at 30 days"],answer:1},
    {q:"NBRx Rate trending downward on a mature brand most likely indicates:",options:["Rapidly growing new patient base","Normal maturation where refills dominate, or possible competitive pressure on new patients","Adherence is improving","Market share is increasing"],answer:1}
  ]
},

"6-12": {
  id:"6-12", title:"Supply Chain & Market Access KPIs", domain:"Data Engineering & Pharma Datasets", domain_id:6,
  level:"Intermediate", mins:35, available:true,
  tags:["KPIs","Supply Chain","Gross-to-Net","Market Access","Formulary"],
  objectives:["Calculate inventory and supply chain KPIs (Days of Supply, turnover, fill rate)","Deconstruct gross-to-net: WAC to Net Price","Understand formulary and prior auth burden KPIs","Apply rebate and chargeback concepts to GTN calculations"],
  toc:[
    {id:"s1",title:"Inventory & Supply Chain KPIs",level:"h2"},
    {id:"s2",title:"Gross-to-Net (GTN) Deductions",level:"h2"},
    {id:"s3",title:"Market Access & Formulary KPIs",level:"h2"},
    {id:"s4",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Inventory & Supply Chain KPIs</h2>
<p>Supply chain analytics ensures that product is available at the right place, at the right time, and in the right quantity — without costly overstock or dangerous stockouts.</p>
<h3>Days of Supply (DoS)</h3>
<p>Days of Supply measures how many days of demand can be satisfied from current inventory. It is tracked at each node of the supply chain: manufacturer warehouse, 3PL, wholesaler (DC), and pharmacy.</p>
<div class="flow-box">Days of Supply = Quantity on Hand (QOH) ÷ Average Daily Units Sold</div>
<p><strong>Example:</strong> A wholesaler has 5,000 units of a biologic on hand. Average daily sales are 100 units. Days of Supply = 5,000 ÷ 100 = 50 days.</p>
<div class="callout info"><div class="callout-title">Target DoS by Node</div><p>Manufacturers typically target 60–90 days of supply at the plant. Wholesalers target 20–30 days. Specialty pharmacies target 7–14 days for cold-chain products. Targets depend on lead times, shelf life, and demand variability.</p></div>
<h3>Inventory Turnover</h3>
<p>Inventory turnover measures how many times per year the inventory is sold and replaced. Higher turnover means capital is not tied up in idle inventory.</p>
<div class="flow-box">Inventory Turnover = Annual Units Sold ÷ Average Units on Hand</div>
<p><strong>Example:</strong> 120,000 units sold per year, average on-hand = 10,000 units → Turnover = 12×. This means inventory turns over once per month.</p>
<h3>Fill Rate</h3>
<p>Fill rate measures the proportion of orders that are fulfilled completely and on time. A fill rate of 95% means 5% of orders had a partial or delayed shipment.</p>
<div class="flow-box">Fill Rate (%) = Orders Fulfilled Completely ÷ Orders Placed × 100</div>
<p>For high-demand drugs, fill rate is a critical patient access metric. A sudden fill rate drop signals a supply disruption, manufacturing issue, or unanticipated demand spike.</p>
<h3>Order Cycle Time</h3>
<div class="flow-box">Order Cycle Time = Order Receipt Date − Order Placement Date</div>
<p>Tracked in days; benchmark varies by product type and channel. Critical for cold-chain products where each day in transit matters for product integrity.</p>
<h3>Stockout Rate</h3>
<div class="flow-box">Stockout Rate (%) = Days Out of Stock ÷ Total Days in Period × 100</div>
<p>A stockout event is a patient access crisis — the drug is not available when needed. Stockout rate at the pharmacy level is tracked using 852 inventory data.</p>
<table><thead><tr><th>KPI</th><th>Formula</th><th>Target / Benchmark</th></tr></thead><tbody>
<tr><td>Days of Supply</td><td>QOH ÷ Avg Daily Sales</td><td>20–90 days (varies by node)</td></tr>
<tr><td>Inventory Turnover</td><td>Annual Sales ÷ Avg On-Hand</td><td>Higher is better; 12× = monthly cycle</td></tr>
<tr><td>Fill Rate</td><td>Orders Fulfilled ÷ Orders Placed × 100</td><td>&gt; 95% is strong</td></tr>
<tr><td>Order Cycle Time</td><td>Receipt Date − Placement Date</td><td>Shortest possible, especially cold-chain</td></tr>
<tr><td>Stockout Rate</td><td>Days OOS ÷ Total Days × 100</td><td>&lt; 1–2% for critical drugs</td></tr>
</tbody></table>`},
    {id:"s2",content:`<h2 id="s2">Gross-to-Net (GTN) Deductions</h2>
<p>Gross-to-Net is the journey from the list price of a drug (WAC) to what the manufacturer actually receives (Net Revenue). Pharma finance, market access, and commercial teams are all deeply involved in GTN management.</p>
<h3>Key Price Points</h3>
<table><thead><tr><th>Price Point</th><th>Full Name</th><th>Definition</th></tr></thead><tbody>
<tr><td><strong>WAC</strong></td><td>Wholesale Acquisition Cost</td><td>Manufacturer's published list price to wholesalers — the starting point for GTN</td></tr>
<tr><td><strong>ASP</strong></td><td>Average Selling Price</td><td>WAC minus prompt-pay discounts and chargebacks — used for Medicare Part B reimbursement</td></tr>
<tr><td><strong>AMP</strong></td><td>Average Manufacturer Price</td><td>Average price to retail pharmacies and wholesalers after most deductions — used for Medicaid rebate base</td></tr>
<tr><td><strong>Net Price</strong></td><td>—</td><td>WAC minus all deductions = what the manufacturer actually receives per unit</td></tr>
</tbody></table>
<h3>GTN Deduction Components</h3>
<div class="flow-box">Net Revenue = Gross Revenue (WAC × Units) − GTN Deductions</div>
<table><thead><tr><th>Deduction</th><th>Description</th><th>Who Receives It</th></tr></thead><tbody>
<tr><td><strong>Chargebacks</strong></td><td>Wholesaler submits a claim to manufacturer to recover the difference between WAC and the contracted price it charged to a hospital, GPO, or government purchaser</td><td>Wholesaler</td></tr>
<tr><td><strong>Medicaid Rebates</strong></td><td>Mandatory rebate under the Medicaid Drug Rebate Program (MDRP) — at minimum 23.1% of AMP for brand drugs</td><td>State + Federal Medicaid</td></tr>
<tr><td><strong>Commercial Rebates</strong></td><td>Negotiated rebates paid to PBMs/payers in exchange for formulary access (preferred tier, PA-waived status)</td><td>PBM / Health Plan</td></tr>
<tr><td><strong>Co-Pay Assistance</strong></td><td>Manufacturer-funded cards that reduce patient out-of-pocket cost; counted as a GTN deduction against revenue</td><td>Patients (reduces OOP)</td></tr>
<tr><td><strong>340B Discounts</strong></td><td>Discounted pricing required under Section 340B of the Public Health Service Act for eligible covered entities (safety-net hospitals, FQHCs)</td><td>340B covered entities</td></tr>
<tr><td><strong>Returns &amp; Adjustments</strong></td><td>Credits for expired, recalled, or damaged product returned through the reverse distribution system</td><td>Manufacturer absorbs</td></tr>
<tr><td><strong>Prompt Pay Discounts</strong></td><td>Small discount (typically 2%) offered to wholesalers who pay invoices within 30 days</td><td>Wholesaler</td></tr>
</tbody></table>
<h3>GTN Percentage</h3>
<div class="flow-box">GTN % = Total GTN Deductions ÷ Gross Revenue × 100</div>
<p>In the US market, GTN percentages have grown significantly. For many brands, especially in competitive classes with heavy PBM rebating, GTN can be 40–60% of WAC — meaning the manufacturer nets only 40–60 cents per dollar of list price. For Medicaid-heavy products or those under the IRA negotiation framework, GTN can exceed 70%.</p>
<div class="callout"><div class="callout-title">IRA Impact on GTN</div><p>The Inflation Reduction Act (2022) introduced Medicare drug price negotiation (starting 2026 for Part D drugs) and inflation rebates for drugs that raise prices faster than CPI. Both mechanisms increase GTN deductions and reduce manufacturer net revenue. Modelling IRA impact is now a core market access analytics competency.</p></div>`},
    {id:"s3",content:`<h2 id="s3">Market Access & Formulary KPIs</h2>
<p>Market access analytics measures how easily patients can obtain a drug through the payer and pharmacy system. Formulary placement directly drives patient access, adherence, and volume.</p>
<h3>Formulary Coverage Rate</h3>
<div class="flow-box">Formulary Coverage Rate (%) = Lives Covered on Formulary ÷ Total Covered Lives in Market × 100</div>
<p>A drug "on formulary" means a health plan or PBM formulary lists it as a covered benefit. Coverage is not binary — tiers matter:</p>
<table><thead><tr><th>Formulary Tier</th><th>Typical Patient OOP</th><th>Commercial Impact</th></tr></thead><tbody>
<tr><td>Tier 1 (preferred generic)</td><td>$0–$10 copay</td><td>Best access; usually generics only</td></tr>
<tr><td>Tier 2 (preferred brand)</td><td>$30–$60 copay</td><td>Strong access; requires rebate negotiation</td></tr>
<tr><td>Tier 3 (non-preferred brand)</td><td>$60–$100 copay</td><td>Moderate access; PA often required</td></tr>
<tr><td>Tier 4 / Specialty</td><td>20–30% coinsurance</td><td>High OOP; PA almost always required</td></tr>
<tr><td>Not Covered</td><td>Full price out of pocket</td><td>Effective market exclusion for most patients</td></tr>
</tbody></table>
<h3>Lives Coverage by Tier</h3>
<p>The most actionable version of coverage reporting breaks down covered lives by tier and payer segment:</p>
<table><thead><tr><th>Segment</th><th>Why It Matters</th></tr></thead><tbody>
<tr><td>Commercial (employer-sponsored)</td><td>Largest lives pool; PBMs negotiate formularies</td></tr>
<tr><td>Medicare Part D</td><td>Formulary set annually; LIS patients have low OOP regardless of tier</td></tr>
<tr><td>Managed Medicaid</td><td>State PDLs (Preferred Drug Lists); mandatory supplemental rebates</td></tr>
<tr><td>Medicare Part B</td><td>For provider-administered drugs; reimbursed at ASP + 6%</td></tr>
</tbody></table>
<h3>Time to Formulary</h3>
<p>Measures how quickly after launch a drug achieves meaningful formulary access. Tracked as months from launch date to reaching each coverage milestone (e.g., 50%, 70%, 90% of commercial lives).</p>
<div class="flow-box">Time to Formulary = Formulary Milestone Date − Product Launch Date (in months)</div>
<h3>Prior Auth Burden Index</h3>
<p>A composite metric capturing the fraction of covered lives that require prior authorisation before dispensing. High PA burden = access friction even when the drug is technically "on formulary."</p>
<div class="flow-box">PA Burden (%) = Lives Requiring PA ÷ Total Covered Lives × 100</div>
<h3>Net Effective Price</h3>
<p>The price point that governs patient cost-sharing and payer reimbursement decisions. Different from Net Revenue (manufacturer perspective):</p>
<div class="flow-box">Net Effective Price (payer perspective) = WAC − Contracted Rebate per Unit</div>
<p>Payers use net effective price to make formulary placement decisions and to calculate the total cost of therapy for a patient population.</p>`},
    {id:"s4",content:`<h2 id="s4">Key Takeaways</h2>
<ul>
<li><strong>Days of Supply</strong> is the master supply chain health metric — too low risks stockouts, too high ties up working capital and raises expiry risk.</li>
<li><strong>Fill rate &gt; 95%</strong> is the operational target; a sudden drop is a patient access signal requiring immediate investigation.</li>
<li><strong>GTN starts at WAC and is eroded by chargebacks, Medicaid rebates, commercial rebates, co-pay assistance, 340B discounts, returns, and prompt-pay discounts</strong> — GTN of 40–60% is common for competitive brand drugs.</li>
<li><strong>Formulary tier directly predicts adherence</strong> — every tier step down (preferred → non-preferred → not covered) reduces the fraction of patients who actually fill their prescription.</li>
<li><strong>Coverage rate without tier breakdown is misleading</strong> — a drug "covered" on Tier 4 with 30% coinsurance has very different patient access from one on Tier 2 with a $40 copay.</li>
<li><strong>IRA impact modelling</strong> is now a required market access competency — negotiated prices and inflation rebates meaningfully change net revenue projections.</li>
<li><strong>PA burden</strong> is a hidden access barrier — even with good formulary placement, high PA rates erode effective coverage and drive abandonment.</li>
</ul>`}
  ],
  quiz:[
    {q:"A wholesaler has 8,000 units of a drug on hand. Average daily sales are 200 units. What is the Days of Supply?",options:["20 days","40 days","80 days","160 days"],answer:1},
    {q:"Which GTN deduction represents a wholesaler recovering the difference between WAC and the contract price it charged a hospital?",options:["Commercial rebate","Chargeback","Co-pay assistance","Prompt-pay discount"],answer:1},
    {q:"A drug has Gross Revenue of $500M and GTN deductions of $250M. What is the GTN percentage?",options:["25%","50%","75%","100%"],answer:1},
    {q:"Formulary Coverage Rate = 80% with 90% of those lives on Tier 3–4. This drug likely has:",options:["Strong patient access — 80% coverage is excellent","Weak patient access — high tiers mean high OOP and likely high PA burden","Perfect access — tier does not matter","Access equivalent to a Tier 1 drug at 80% coverage"],answer:1},
    {q:"Under the IRA's Medicare drug price negotiation, what happens to a drug's GTN percentage?",options:["It decreases, as negotiated prices are lower","It increases, as the negotiated price reduces WAC but deductions remain the same","It is unaffected","GTN only applies to Medicaid, not Medicare"],answer:1}
  ]
},

"6-13": {
  id:"6-13", title:"Clinical & Outcomes KPIs", domain:"Data Engineering & Pharma Datasets", domain_id:6,
  level:"Advanced", mins:40, available:true,
  tags:["KPIs","HEOR","Clinical Outcomes","Epidemiology","RWE"],
  objectives:["Calculate and interpret ICER for health technology assessments","Apply NNT and NNH to clinical trial and RWE data","Measure and analyse LOT distribution and TTNT","Understand HCRU metrics and their business applications"],
  toc:[
    {id:"s1",title:"Health Economics KPIs (ICER)",level:"h2"},
    {id:"s2",title:"Clinical Efficacy Metrics (NNT, NNH)",level:"h2"},
    {id:"s3",title:"Treatment Pattern KPIs",level:"h2"},
    {id:"s4",title:"Healthcare Resource Utilisation (HCRU)",level:"h2"},
    {id:"s5",title:"Survival & Oncology Endpoints",level:"h2"},
    {id:"s6",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">Health Economics KPIs (ICER)</h2>
<p>Health economics KPIs help payers, HTA bodies, and health systems decide whether a new therapy delivers value for money. These metrics underpin reimbursement submissions, value-based contracts, and budget impact analyses.</p>
<h3>Incremental Cost-Effectiveness Ratio (ICER)</h3>
<p>ICER compares the cost and effectiveness of a new treatment against a comparator (existing standard of care). It answers: <em>"How much does one additional unit of health outcome cost with the new treatment?"</em></p>
<div class="flow-box">ICER = (Cost_New − Cost_Comparator) ÷ (Effect_New − Effect_Comparator)</div>
<p>Where Effect is typically measured in <strong>QALYs (Quality-Adjusted Life Years)</strong> — a composite of life expectancy and quality of life (0 = death, 1 = perfect health).</p>
<table><thead><tr><th>ICER Threshold</th><th>Country / Body</th><th>Implication</th></tr></thead><tbody>
<tr><td>&lt; $50,000/QALY</td><td>US (informal historical)</td><td>Clearly cost-effective</td></tr>
<tr><td>&lt; $100,000–$150,000/QALY</td><td>US ICER (common benchmark)</td><td>Generally cost-effective in US context</td></tr>
<tr><td>&lt; £20,000–£30,000/QALY</td><td>NICE (UK)</td><td>Approved for NHS reimbursement</td></tr>
<tr><td>&gt; threshold</td><td>Any</td><td>Risk of formulary exclusion or coverage with evidence development (CED)</td></tr>
</tbody></table>
<p><strong>Example:</strong> New oncology drug costs $200,000/year. Standard of care costs $80,000/year. New drug adds 1.5 QALYs; SoC adds 1.0 QALY. ICER = ($200,000 − $80,000) ÷ (1.5 − 1.0) = $120,000 ÷ 0.5 = <strong>$240,000 per QALY</strong>. This exceeds most US thresholds — the drug would need significant rebating or outcomes-based contracting to achieve formulary access.</p>
<div class="callout info"><div class="callout-title">Budget Impact Analysis (BIA)</div><p>ICER measures per-patient efficiency; BIA measures total budget impact. A payer may accept a drug with a high ICER if the eligible patient population is very small (rare disease). BIA = (new treatment cost − old treatment cost) × number of patients switching.</p></div>
<h3>Cost per Responder</h3>
<p>Used when a binary outcome (response/no response) is more clinically meaningful than QALYs. Common in oncology (response rate) and immunology (remission rate).</p>
<div class="flow-box">Cost per Responder = Total Treatment Cost ÷ Number of Patients Who Respond</div>`},
    {id:"s2",content:`<h2 id="s2">Clinical Efficacy Metrics (NNT, NNH)</h2>
<p>Number Needed to Treat (NNT) and Number Needed to Harm (NNH) translate abstract risk reductions from clinical trials into intuitive, clinically actionable numbers.</p>
<h3>Number Needed to Treat (NNT)</h3>
<p>NNT tells you how many patients must be treated for one additional patient to benefit (compared to the control arm).</p>
<div class="flow-box">NNT = 1 ÷ Absolute Risk Reduction (ARR)</div>
<div class="flow-box">ARR = Control Event Rate − Treatment Event Rate</div>
<p><strong>Example:</strong> In a clinical trial for a heart failure drug:<br>
– Control arm: 30% of patients died within 5 years (Event Rate = 0.30)<br>
– Treatment arm: 20% of patients died within 5 years (Event Rate = 0.20)<br>
– ARR = 0.30 − 0.20 = 0.10<br>
– NNT = 1 ÷ 0.10 = <strong>10</strong><br>
You need to treat 10 patients to prevent one death over 5 years.</p>
<div class="callout"><div class="callout-title">Interpreting NNT</div><p>Lower NNT = more effective. NNT = 1 means every patient benefits (rare in reality). NNT = 100 means you treat 100 patients for one to benefit (common for preventive therapies). Context matters — an NNT of 50 is excellent for preventing a fatal event, but poor for relieving a headache.</p></div>
<h3>Number Needed to Harm (NNH)</h3>
<p>NNH tells you how many patients must be treated for one additional patient to experience an adverse event (compared to the control arm).</p>
<div class="flow-box">NNH = 1 ÷ Absolute Risk Increase (ARI)</div>
<div class="flow-box">ARI = Treatment Adverse Event Rate − Control Adverse Event Rate</div>
<p><strong>Example:</strong> The same heart failure drug causes liver enzyme elevation in 5% of treated patients vs 1% in control. ARI = 0.05 − 0.01 = 0.04. NNH = 1 ÷ 0.04 = <strong>25</strong>. For every 25 patients treated, one will develop a liver enzyme elevation attributable to the drug.</p>
<h3>Benefit-Risk Index</h3>
<p>Combining NNT and NNH provides a simple benefit-risk assessment:</p>
<div class="flow-box">Benefit-Risk Ratio = NNH ÷ NNT</div>
<p>A ratio &gt; 1 is favourable (more patients benefit than are harmed). A ratio &lt; 1 raises benefit-risk concerns that regulators, payers, and prescribers will scrutinise.</p>
<h3>Relative Risk Reduction (RRR)</h3>
<p>Often reported in press releases and headlines because it sounds more impressive than ARR. Always look at ARR alongside RRR.</p>
<div class="flow-box">RRR = ARR ÷ Control Event Rate × 100</div>
<p>In the example above: RRR = 0.10 ÷ 0.30 × 100 = <strong>33%</strong> relative risk reduction. ARR = 10%. The drug "cuts mortality risk by a third" sounds dramatic; "saves 1 in 10 patients over 5 years" is more grounded.</p>`},
    {id:"s3",content:`<h2 id="s3">Treatment Pattern KPIs</h2>
<p>Treatment pattern analytics — especially in oncology and specialty disease — tracks how patients move through lines of therapy. This drives competitive intelligence, clinical positioning, and revenue forecasting.</p>
<h3>Line of Therapy (LOT)</h3>
<p>LOT is the ordered sequence of treatment regimens a patient receives. First-line (1L) is the initial treatment after diagnosis. Second-line (2L) follows first progression or intolerance. Third-line (3L) and beyond are increasingly narrow patient populations.</p>
<table><thead><tr><th>Metric</th><th>Definition</th><th>Business Use</th></tr></thead><tbody>
<tr><td>LOT Distribution</td><td>% of patients on each line of therapy for a brand or class</td><td>Understand where a drug is being used; identify LOT expansion opportunities</td></tr>
<tr><td>LOT at Initiation</td><td>Line at which a patient first started the brand</td><td>Tracks if a drug is being used earlier (more effective) or later (retreating) in treatment journey</td></tr>
<tr><td>Biomarker Positivity Rate</td><td>% of patients with a specific biomarker (e.g., PD-L1 high, EGFR mutant) among those tested</td><td>Defines the addressable patient population for biomarker-selected therapies</td></tr>
<tr><td>Testing Rate</td><td>% of eligible patients who received biomarker testing</td><td>Underpins market development — if patients aren't tested, they can't be identified for targeted therapy</td></tr>
</tbody></table>
<h3>Time to Next Treatment (TTNT)</h3>
<p>TTNT is a real-world proxy for progression-free survival. It measures the time from initiation of one line of therapy to the start of the next line (or death). It can be calculated from claims data without requiring a clinical diagnosis of progression.</p>
<div class="flow-box">TTNT = Date of Next Line of Therapy Initiation − Date of Current Line Start</div>
<p><strong>Why TTNT matters:</strong> PFS from clinical trials requires formal assessment; TTNT can be calculated from administrative claims data in RWE studies and is accepted as a surrogate endpoint by some payers for evidence-generation in outcomes-based contracts.</p>
<h3>Persistence on Therapy (Treatment Duration)</h3>
<table><thead><tr><th>Metric</th><th>Formula / Definition</th></tr></thead><tbody>
<tr><td>Median Duration on Therapy</td><td>Median(TTNT) across patients — how long the median patient stays on before switching or stopping</td></tr>
<tr><td>Persistency Rate at Month N</td><td>% of patients still on current therapy at N months without a gap exceeding the discontinuation threshold</td></tr>
<tr><td>Early Discontinuation Rate</td><td>% of patients who discontinue within 90 days of initiation — often a tolerability signal</td></tr>
</tbody></table>
<h3>Sequence Analytics</h3>
<p>In oncology, patients often cycle through multiple lines: Drug A → Drug B → Drug C → Drug A again (re-challenge). Sequence analytics maps the most common treatment journeys using a Sankey diagram or state-transition model. This identifies:</p>
<ul>
<li>The most common sequences (enabling competitive positioning: "What comes before us?")</li>
<li>Re-challenge rates (patients returning to a brand after switching)</li>
<li>Gaps in treatment (unmet need periods with no active therapy)</li>
</ul>`},
    {id:"s4",content:`<h2 id="s4">Healthcare Resource Utilisation (HCRU)</h2>
<p>HCRU metrics measure the healthcare services consumed by a patient population. They are used in HEOR analyses, budget impact models, and value dossiers to demonstrate that a new drug reduces costly healthcare events.</p>
<h3>Core HCRU Metrics</h3>
<table><thead><tr><th>Metric</th><th>Definition</th><th>Data Source</th></tr></thead><tbody>
<tr><td><strong>Hospitalisation Rate</strong></td><td>Hospital admissions per 100 patient-years</td><td>Medical claims (inpatient facility claims)</td></tr>
<tr><td><strong>Length of Stay (LOS)</strong></td><td>Average days of inpatient admission per hospitalisation event</td><td>Inpatient facility claims</td></tr>
<tr><td><strong>Emergency Room (ER) Visit Rate</strong></td><td>ER visits per 100 patient-years</td><td>Medical claims (ER revenue codes / place of service)</td></tr>
<tr><td><strong>Outpatient Visit Rate</strong></td><td>Office and clinic visits per patient per year</td><td>Professional claims (place of service = office)</td></tr>
<tr><td><strong>30-Day Readmission Rate</strong></td><td>% of patients readmitted to hospital within 30 days of discharge</td><td>Inpatient facility claims with admission dates</td></tr>
<tr><td><strong>Total Cost of Care (TCOC)</strong></td><td>All-cause medical + pharmacy costs per patient per year</td><td>Integrated medical + pharmacy claims</td></tr>
</tbody></table>
<h3>Readmission Rate</h3>
<div class="flow-box">30-Day Readmission Rate (%) = Patients Readmitted Within 30 Days ÷ Total Discharged Patients × 100</div>
<p>Readmission rate is used by CMS as a hospital quality metric and is penalised under the Hospital Readmissions Reduction Program (HRRP). For pharma, demonstrating that a drug reduces readmission rates is a powerful value message to hospital systems and ACOs.</p>
<h3>Per-Patient Per-Year (PPPY) Costs</h3>
<p>HCRU costs are normalised to a per-patient per-year rate to enable comparison across studies with different follow-up lengths.</p>
<div class="flow-box">PPPY Cost = Total Costs ÷ Total Patient-Years of Observation</div>
<p>Patient-years = Σ(months of follow-up per patient ÷ 12). This handles censored patients (those who exit the study before it ends) in a statistically appropriate way.</p>
<h3>HCRU in Payer Submissions</h3>
<p>A typical HEOR dossier to a payer includes:</p>
<ul>
<li>A comparison of HCRU in treated vs. untreated (or comparator-treated) patients from a real-world claims study</li>
<li>Budget impact model showing that reduced hospitalisations offset the drug's acquisition cost</li>
<li>Subgroup analyses by disease severity, comorbidity burden, or prior treatment history</li>
</ul>`},
    {id:"s5",content:`<h2 id="s5">Survival & Oncology Endpoints</h2>
<p>Oncology trials and RWE studies use survival endpoints to measure clinical benefit. These are distinct from the treatment pattern KPIs in the previous section — they are clinical outcomes, not operational metrics.</p>
<h3>Overall Survival (OS)</h3>
<p>OS is the gold standard clinical endpoint. It measures time from randomisation (or diagnosis, in RWE) to death from any cause.</p>
<div class="flow-box">Median OS = the time point at which 50% of patients have died (from Kaplan-Meier curve)</div>
<p>OS is unambiguous and clinically meaningful — the patient is either alive or dead. However, it requires long follow-up and can be confounded by subsequent therapies (patients who cross over to the experimental drug after progression in the control arm).</p>
<h3>Progression-Free Survival (PFS)</h3>
<p>PFS measures time from randomisation to disease progression (per a defined assessment criterion such as RECIST) or death, whichever comes first.</p>
<div class="flow-box">Median PFS = the time point at which 50% of patients have progressed or died</div>
<p>PFS is observed earlier than OS and is therefore used as a surrogate endpoint in accelerated approvals. However, not all payers accept PFS as a sufficient basis for reimbursement — they may require OS data or evidence of a clinically meaningful PFS improvement (e.g., ≥ 6 months).</p>
<h3>Event-Free Survival (EFS) and Disease-Free Survival (DFS)</h3>
<p>EFS and DFS are used in adjuvant settings (post-surgical, post-remission) where the question is not "how long until progression" but "how long until any adverse event (recurrence, new primary cancer, death)." The exact definition varies by trial and indication.</p>
<h3>Hazard Ratio (HR)</h3>
<p>The hazard ratio compares the rate of events (death, progression) between treatment and control arms. It is the primary summary statistic from a Cox proportional hazards model.</p>
<div class="flow-box">HR = Hazard Rate in Treatment Arm ÷ Hazard Rate in Control Arm</div>
<p>HR &lt; 1 means the treatment reduces the event rate. HR = 0.70 means a 30% reduction in the hazard of dying or progressing at any time point. HRs are reported alongside confidence intervals and p-values.</p>
<h3>Summary: Clinical KPI Quick Reference</h3>
<table><thead><tr><th>KPI</th><th>Formula / Definition</th><th>Typical Use</th></tr></thead><tbody>
<tr><td>ICER</td><td>(ΔCost) ÷ (ΔQALY)</td><td>HTA submissions, payer negotiations</td></tr>
<tr><td>NNT</td><td>1 ÷ ARR</td><td>Clinical messaging, prescriber education</td></tr>
<tr><td>NNH</td><td>1 ÷ ARI</td><td>Safety labelling, benefit-risk assessment</td></tr>
<tr><td>TTNT</td><td>Next LOT start − Current LOT start</td><td>RWE proxy for PFS; outcomes contracts</td></tr>
<tr><td>LOT Distribution</td><td>% patients on each line of therapy</td><td>Competitive positioning, LOT expansion strategy</td></tr>
<tr><td>30-Day Readmission Rate</td><td>Readmissions ÷ Total Discharges × 100</td><td>Hospital value messaging, HEOR dossiers</td></tr>
<tr><td>Median OS / PFS</td><td>KM curve time point at 50% survival</td><td>Regulatory approval, HTA, payer submission</td></tr>
<tr><td>Hazard Ratio</td><td>Treatment hazard ÷ Control hazard</td><td>Comparative efficacy reporting</td></tr>
</tbody></table>`},
    {id:"s6",content:`<h2 id="s6">Key Takeaways</h2>
<ul>
<li><strong>ICER = ΔCost ÷ ΔQALY</strong> — the universal health economics currency. In the US, $100,000–$150,000/QALY is a common benchmark; NICE uses £20,000–£30,000/QALY.</li>
<li><strong>NNT and NNH translate clinical trial probabilities into intuitive counts</strong> — a prescriber can act on "treat 10 patients to save one life" far more easily than "p &lt; 0.05."</li>
<li><strong>RRR is always larger than ARR</strong> — always look at both; headlines report RRR, clinical decisions should be based on ARR and NNT.</li>
<li><strong>TTNT is the RWE-friendly proxy for PFS</strong> — computed from claims data without requiring formal progression assessments, accepted as a surrogate in some outcomes contracts.</li>
<li><strong>LOT distribution and biomarker testing rates define your addressable market</strong> — if only 40% of eligible patients are tested, market development is as important as market share.</li>
<li><strong>Readmission rate and HCRU</strong> are the language of hospital systems and integrated delivery networks (IDNs) — drugs that demonstrably reduce admissions win formulary placement and preferred partnership agreements.</li>
<li><strong>OS is the gold standard; PFS is the accelerated approval surrogate</strong> — payer acceptance of PFS-based approvals varies; always model the OS data maturation timeline in your evidence strategy.</li>
</ul>`}
  ],
  quiz:[
    {q:"A new drug costs $180,000/year vs $60,000/year for SoC. The new drug adds 0.8 QALYs vs 0.5 QALYs for SoC. What is the ICER?",options:["$150,000 per QALY","$400,000 per QALY","$200,000 per QALY","$300,000 per QALY"],answer:1},
    {q:"In a trial, 25% of control patients and 15% of treated patients experienced a major cardiovascular event. What is the NNT?",options:["4","10","6.67","25"],answer:1},
    {q:"TTNT is most useful in which context?",options:["Measuring adverse event rates in clinical trials","Estimating progression-free survival from administrative claims data without formal tumour assessments","Calculating the Hazard Ratio in a Cox model","Measuring formulary coverage rates"],answer:1},
    {q:"A Hazard Ratio of 0.65 in an OS analysis means:",options:["The treatment group has 35% more deaths than the control","The treatment reduces the hazard of death by 35% compared to control","The treatment doubles survival time","The result is not statistically significant"],answer:1},
    {q:"A brand's LOT distribution shows 80% of patients are on 3L+. What strategic implication does this have?",options:["The drug is performing well — later-line use is preferred by oncologists","The drug is being used late in treatment; there may be an opportunity to expand into earlier lines","The addressable patient population is unlimited","This is normal for all oncology brands"],answer:1}
  ]
}

});


