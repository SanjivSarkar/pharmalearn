/* PharmaLearn — Content Registry */

// Global namespace — must load before domain JS files
window.PL = {
  chapters: {},
  addChapters(obj) { Object.assign(this.chapters, obj); }
};

// Domain metadata
window.PL.domains = [
  {
    id: 1,
    title: "Pharma Value Chain",
    icon: "🔬",
    color: "#6366f1",
    description: "From molecule to market — drug discovery, clinical trials, regulatory pathways, launch, and lifecycle management.",
    chapters: ["1-1","1-2","1-3","1-4","1-5","1-6","1-7"]
  },
  {
    id: 2,
    title: "Commercial Analytics",
    icon: "📊",
    color: "#0ea5e9",
    description: "Patient journey analytics, HCP targeting, SFE, forecasting, MMM, launch analytics, gross-to-net, omnichannel, and IC design.",
    chapters: ["2-1","2-2","2-3","2-4","2-5","2-6","2-7","2-8","2-9","2-10","2-11"]
  },
  {
    id: 3,
    title: "Market Access & Pricing",
    icon: "💊",
    color: "#10b981",
    description: "Payer landscape, pricing strategy, reimbursement, HTA, HEOR, value-based contracts, patient access programs, global pricing, and IRA strategy.",
    chapters: ["3-1","3-2","3-3","3-4","3-5","3-6","3-7","3-8","3-9","3-10"]
  },
  {
    id: 4,
    title: "Real-World Evidence & Medical Affairs",
    icon: "🏥",
    color: "#f59e0b",
    description: "RWE study design, HEOR methodology, medical affairs analytics, epidemiology, and clinical registries.",
    chapters: ["4-1","4-2","4-3","4-4","4-5"]
  },
  {
    id: 5,
    title: "Data Science & Analytics Engineering",
    icon: "⚙️",
    color: "#ec4899",
    description: "Healthcare data, SQL, Python, ML, causal inference, statistics fundamentals, deep learning, NLP & LLMs, and MLOps.",
    chapters: ["5-1","5-2","5-3","5-4","5-5","5-6","5-7","5-8","5-9","5-10"]
  },
  {
    id: 6,
    title: "Data Engineering for Pharma",
    icon: "🏗️",
    color: "#14b8a6",
    description: "Modern data stack, data modeling, Snowflake & Databricks, streaming, DataOps, data mesh, Apache Spark, cloud architecture, and data quality.",
    chapters: ["6-1","6-2","6-3","6-4","6-5","6-6","6-7","6-8","6-9"]
  }
];
