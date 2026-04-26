/* PharmaLearn — Content Registry */

// Global namespace — must load before domain JS files
window.PL = {
  chapters: {},
  addChapters(obj) { Object.assign(this.chapters, obj); }
};

// Domain metadata
window.PL.domains = [
  {
    id: 0,
    title: "Know Your TA",
    icon: "🧬",
    color: "#5B4A8A",
    description: "Disease-area fundamentals across pharma's major therapeutic areas — cardiovascular, renal, metabolism, neurology, immunology, and oncology.",
    chapters: ["0-1","0-2","0-3","0-4","0-5","0-6"]
  },
  {
    id: 1,
    title: "Pharma Value Chain",
    icon: "🔬",
    color: "#4B6B8A",
    description: "From molecule to market — drug discovery, clinical trials, regulatory pathways, launch, and lifecycle management.",
    chapters: ["1-1","1-2","1-3","1-4","1-5","1-6","1-7"],
    resources: [
      { title: "Pharma Strategy & BD&L", subtitle: "5-Day Crash Course", tag: "BD&L", href: "assets/pharma-bdl.html" },
      { title: "R&D Drug Discovery", subtitle: "5-Day Crash Course", tag: "Discovery", href: "assets/drug-discovery.html" },
      { title: "Preclinical Development", subtitle: "5-Day Crash Course", tag: "Preclinical", href: "assets/preclinical.html" },
      { title: "Clinical Development", subtitle: "5-Day Crash Course", tag: "Clinical Trials", href: "assets/clinical-trials.html" },
      { title: "Regulatory Affairs", subtitle: "5-Day Crash Course", tag: "Regulatory", href: "assets/regulatory.html" },
      { title: "CMC & Manufacturing", subtitle: "5-Day Crash Course", tag: "Manufacturing", href: "assets/manufacturing.html" },
      { title: "Quality & GxP", subtitle: "5-Day Crash Course", tag: "Quality", href: "assets/quality-gxp.html" }
    ]
  },
  {
    id: 2,
    title: "Commercial Analytics",
    icon: "📊",
    color: "#C8984A",
    description: "Patient journey analytics, HCP targeting, SFE, forecasting, MMM, launch analytics, gross-to-net, omnichannel, IC design, market research, and supply chain.",
    chapters: ["2-1","2-2","2-3","2-4","2-5","2-6","2-7","2-8","2-9","2-10","2-11","2-12","2-13"]
  },
  {
    id: 3,
    title: "Market Access & Pricing",
    icon: "💊",
    color: "#4B6B4A",
    description: "Payer landscape, pricing strategy, reimbursement, HTA, HEOR, value-based contracts, patient access programs, global pricing, and IRA strategy.",
    chapters: ["3-1","3-2","3-3","3-4","3-5","3-6","3-7","3-8","3-9","3-10"]
  },
  {
    id: 4,
    title: "Real-World Evidence & Medical Affairs",
    icon: "🏥",
    color: "#9B7233",
    description: "RWE study design, HEOR methodology, medical affairs analytics, epidemiology, and clinical registries.",
    chapters: ["4-1","4-2","4-3","4-4","4-5"],
    resources: [
      { title: "HEOR & Real-World Evidence", subtitle: "5-Day Crash Course", tag: "HEOR / RWE", href: "assets/heor-rwe.html" },
      { title: "Medical Affairs", subtitle: "5-Day Crash Course", tag: "Medical Affairs", href: "assets/medical-affairs.html" },
      { title: "Drug Safety & Pharmacovigilance", subtitle: "5-Day Crash Course", tag: "PV", href: "assets/pharmacovigilance.html" }
    ]
  },
  {
    id: 5,
    title: "Data Science & Pharma Use Cases",
    icon: "⚙️",
    color: "#A84B2A",
    description: "Core data science fundamentals — statistics, ML, deep learning, NLP, causal inference, MLOps — then applied pharma use cases: HCP targeting, adherence modeling, commercial forecasting, drug discovery AI, and pharmacovigilance.",
    chapters: ["5-0","5-1","5-2","5-3","5-4","5-5","5-6","5-7","5-8","5-9","5-10","5-11","5-12","5-13","5-14","5-15","5-16","5-17","5-18","5-19"],
    resources: [
      { title: "Zero to AI Fluency", subtitle: "15-Day Learning Roadmap", tag: "Roadmap", href: "assets/ds-roadmap.html" },
      { title: "Agentic AI Fluency", subtitle: "15-Day Roadmap", tag: "Agentic AI", href: "assets/agentic-ai-roadmap.html" }
    ]
  },
  {
    id: 6,
    title: "Data Engineering & Pharma Datasets",
    icon: "🏗️",
    color: "#2D5F47",
    description: "Data engineering fundamentals, modern data stack, data modeling, pipelines, quality & governance — plus every pharma dataset (Rx, claims, EHR, genomics, supply chain) and the KPIs calculated from them.",
    chapters: ["6-1","6-2","6-3","6-4","6-5","6-6","6-7","6-8","6-9","6-10","6-11","6-12","6-13"],
    resources: [
      { title: "AI-Ready Data Architecture", subtitle: "15-Day Theoretical Roadmap", tag: "Architecture", href: "assets/ai-data-architecture.html" },
      { title: "Pharma Analytics — Complete Metrics Reference", subtitle: "KPIs & Metrics Guide", tag: "Metrics", href: "assets/pharma-metrics.html" },
      { title: "Pharma Datasets Caveat", subtitle: "Reference Guide", tag: "Datasets", href: "assets/pharma-data-caveats.html" }
    ]
  }
];
