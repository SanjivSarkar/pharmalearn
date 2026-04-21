/* Domain 5 — Chapter 5-11: AI Concepts & Generative AI */
PL.addChapters({

"5-11": {
  id:"5-11", title:"AI Concepts & Generative AI", domain:"Data Science & Analytics Engineering", domain_id:5,
  level:"Intermediate", mins:55, available:true,
  tags:["AI","LLMs","GenAI","Prompt Engineering","RAG","AI Agents","Foundation Models","Responsible AI","Transformers"],
  objectives:[
    "Distinguish AI, ML, deep learning, and generative AI in a unified conceptual hierarchy",
    "Understand the transformer architecture and why it underpins modern AI",
    "Apply prompt engineering patterns: zero-shot, few-shot, chain-of-thought, and structured output",
    "Design a Retrieval-Augmented Generation (RAG) pipeline for domain-specific Q&A",
    "Build agentic workflows using tool-calling LLMs",
    "Identify AI applications in drug discovery, clinical operations, and commercial analytics",
    "Apply responsible AI principles and FDA/EU regulatory guidance to life-sciences AI systems"
  ],
  toc:[
    {id:"s1",title:"The AI Landscape — From Rules to Reasoning",level:"h2"},
    {id:"s2",title:"Foundation Models & Large Language Models",level:"h2"},
    {id:"s3",title:"Prompt Engineering",level:"h2"},
    {id:"s4",title:"Retrieval-Augmented Generation (RAG)",level:"h2"},
    {id:"s5",title:"AI Agents & Agentic Workflows",level:"h2"},
    {id:"s6",title:"AI in Life Sciences & Beyond",level:"h2"},
    {id:"s7",title:"Responsible AI & Regulatory Considerations",level:"h2"},
    {id:"s8",title:"Key Takeaways",level:"h2"}
  ],
  sections:[
    {id:"s1",content:`<h2 id="s1">The AI Landscape — From Rules to Reasoning</h2>
<p><strong>Artificial Intelligence</strong> is the broad discipline of building systems that perform tasks that would otherwise require human intelligence. Understanding the internal hierarchy is essential before working with any AI system.</p>
<table><thead><tr><th>Layer</th><th>Definition</th><th>Key Technique</th><th>Example</th></tr></thead>
<tbody>
<tr><td><strong>AI</strong></td><td>Machines performing tasks requiring human-like cognition</td><td>Search, logic, learning, perception</td><td>Chess engine, image classifier, chatbot</td></tr>
<tr><td><strong>Machine Learning</strong></td><td>Systems that learn patterns from data without being explicitly programmed</td><td>Gradient descent, statistical optimization</td><td>XGBoost churn model, logistic regression</td></tr>
<tr><td><strong>Deep Learning</strong></td><td>ML using multi-layer neural networks that learn hierarchical representations</td><td>Backpropagation, CNNs, RNNs, Transformers</td><td>ResNet image recognition, LSTM time series</td></tr>
<tr><td><strong>Generative AI</strong></td><td>Models that generate new content (text, images, code, molecules) by learning distributions</td><td>Transformer LLMs, diffusion models, VAEs</td><td>GPT-4, DALL·E 3, AlphaFold 3</td></tr>
</tbody></table>

<h3>Historical Milestones</h3>
<table><thead><tr><th>Year</th><th>Milestone</th><th>Significance</th></tr></thead>
<tbody>
<tr><td>1950</td><td>Turing Test (Alan Turing)</td><td>First formal framework for machine intelligence</td></tr>
<tr><td>1957</td><td>Perceptron (Rosenblatt)</td><td>First artificial neuron — foundation of neural networks</td></tr>
<tr><td>1986</td><td>Backpropagation popularized (Rumelhart, Hinton)</td><td>Made training multi-layer networks practical</td></tr>
<tr><td>1997</td><td>Deep Blue defeats Kasparov</td><td>Landmark for game AI; symbolic search, not learning</td></tr>
<tr><td>2012</td><td>AlexNet wins ImageNet (Krizhevsky, Sutskever, Hinton)</td><td>Deep CNNs outperform handcrafted features — deep learning era begins</td></tr>
<tr><td>2017</td><td>"Attention Is All You Need" (Vaswani et al., Google)</td><td>Transformer architecture — backbone of all modern LLMs</td></tr>
<tr><td>2020</td><td>GPT-3 (OpenAI, 175B parameters)</td><td>Emergent few-shot learning at scale — foundation model era begins</td></tr>
<tr><td>2021</td><td>AlphaFold 2 (DeepMind)</td><td>Protein structure prediction — solved 50-year biology problem</td></tr>
<tr><td>2022</td><td>ChatGPT launch</td><td>RLHF-tuned LLMs reach mainstream; 100M users in 2 months</td></tr>
<tr><td>2024–25</td><td>Reasoning models (o1, o3, Gemini 2.0)</td><td>LLMs with deliberative thinking chains; agentic AI takes off</td></tr>
</tbody></table>

<div class="callout"><div class="callout-title">The Scaling Hypothesis</div><p>A central empirical finding of the foundation model era: model capability scales predictably with compute, data, and parameters following power laws. Larger models trained on more data consistently outperform smaller ones — even on tasks never explicitly trained on. This "emergent capability" at scale is the core phenomenon that made GPT-3 and its successors transformative.</p></div>

<h3>Why Now? The Convergence of Three Enablers</h3>
<ul>
<li><strong>Compute:</strong> GPU/TPU clusters now deliver petaflop-scale training on commodity cloud infrastructure</li>
<li><strong>Data:</strong> Internet-scale text, images, and code provide the self-supervised training signal</li>
<li><strong>Algorithms:</strong> The transformer architecture efficiently processes entire sequences in parallel via attention</li>
</ul>
<p>These three converged around 2020 to make foundation models viable. Any one missing would have delayed the era by a decade.</p>`},

    {id:"s2",content:`<h2 id="s2">Foundation Models & Large Language Models</h2>
<p>A <strong>foundation model</strong> is a large neural network pre-trained on broad, general data that can be adapted to many downstream tasks. Large Language Models (LLMs) are the dominant class — trained on text, they learn statistical patterns across virtually all human knowledge.</p>

<h3>The Transformer Architecture</h3>
<p>Every major LLM is built on the transformer (Vaswani et al., 2017). Its core innovation: <strong>self-attention</strong>, which allows each token to attend to every other token in the sequence simultaneously — no sequential processing bottleneck.</p>
<pre><code class="language-python">import torch
import torch.nn.functional as F

def scaled_dot_product_attention(Q, K, V, mask=None):
    """
    Core attention computation.
    Q, K, V: Query, Key, Value matrices (batch, heads, seq_len, d_k)

    Intuition:
    - Q: "What am I looking for?"
    - K: "What do I contain?"
    - V: "What do I pass forward if selected?"
    - Score = similarity between Q and each K
    - Softmax normalizes scores to attention weights
    - Output = weighted sum of V
    """
    d_k = Q.shape[-1]  # dimension of keys
    scores = torch.matmul(Q, K.transpose(-2, -1)) / (d_k ** 0.5)  # scaled dot product

    if mask is not None:
        scores = scores.masked_fill(mask == 0, float('-inf'))

    attention_weights = F.softmax(scores, dim=-1)  # normalize across sequence positions
    output = torch.matmul(attention_weights, V)    # weighted sum of values
    return output, attention_weights</code></pre>

<div class="callout info"><div class="callout-title">Multi-Head Attention</div><p>Transformers run multiple attention operations in parallel ("heads"), each learning different relationship patterns. One head might learn syntax (subject–verb agreement), another coreference (pronoun resolution), another semantic similarity. The outputs are concatenated and projected — giving the model a rich, multi-perspective representation.</p></div>

<h3>Key LLM Paradigms</h3>
<table><thead><tr><th>Architecture</th><th>Type</th><th>Training Objective</th><th>Strengths</th><th>Examples</th></tr></thead>
<tbody>
<tr><td>GPT-style</td><td>Decoder-only</td><td>Next-token prediction (causal LM)</td><td>Generation, instruction-following, reasoning</td><td>GPT-4, Claude, Llama 3, Gemini</td></tr>
<tr><td>BERT-style</td><td>Encoder-only</td><td>Masked language modeling + NSP</td><td>Classification, NER, semantic similarity</td><td>BERT, RoBERTa, BioBERT, ClinicalBERT</td></tr>
<tr><td>T5-style</td><td>Encoder-Decoder</td><td>Text-to-text (span corruption)</td><td>Translation, summarization, Q&amp;A</td><td>T5, Flan-T5, MedT5</td></tr>
</tbody></table>

<h3>Key Concepts Every Practitioner Must Know</h3>
<table><thead><tr><th>Concept</th><th>Definition</th><th>Practical Implication</th></tr></thead>
<tbody>
<tr><td><strong>Tokens</strong></td><td>Sub-word units (roughly 3/4 of a word on average)</td><td>GPT-4 charges per token; 1,000 words ≈ 1,300 tokens</td></tr>
<tr><td><strong>Context window</strong></td><td>Maximum tokens the model can process at once</td><td>GPT-4: 128K tokens; Gemini 1.5 Pro: 1M tokens</td></tr>
<tr><td><strong>Temperature</strong></td><td>Controls randomness in sampling (0 = deterministic, 1 = creative)</td><td>Clinical extraction: temp=0; creative synthesis: temp=0.7</td></tr>
<tr><td><strong>Embeddings</strong></td><td>Dense vector representations of text in semantic space</td><td>Foundation of semantic search, RAG, and clustering</td></tr>
<tr><td><strong>Fine-tuning</strong></td><td>Additional training on domain-specific data to shift model behavior</td><td>MedPaLM 2, BioGPT — adapts general LLMs to clinical tasks</td></tr>
<tr><td><strong>RLHF</strong></td><td>Reinforcement Learning from Human Feedback — aligns model with human preferences</td><td>Why ChatGPT doesn't just complete prompts but answers helpfully</td></tr>
</tbody></table>

<h3>Pharma Applications of LLMs</h3>
<ul>
<li><strong>Medical literature mining:</strong> Extract trial endpoints, adverse events, and dosing information from PubMed at scale using BERT-style classifiers</li>
<li><strong>Clinical note NLP:</strong> Extract structured diagnoses, medications, and treatment history from free-text EHR notes (BioBERT, ClinicalBERT)</li>
<li><strong>Regulatory document generation:</strong> Draft Clinical Overview sections, benefit-risk summaries, and label updates using GPT-4 with review by subject-matter experts</li>
<li><strong>Drug interaction detection:</strong> LLMs identify potential interactions across complex polypharmacy regimens faster than rule-based systems</li>
</ul>`},

    {id:"s3",content:`<h2 id="s3">Prompt Engineering</h2>
<p><strong>Prompt engineering</strong> is the discipline of designing inputs to LLMs to reliably produce desired outputs. Unlike traditional software where behavior is coded explicitly, LLM behavior is elicited through language. Getting this right is now a core technical skill.</p>

<h3>Prompting Patterns</h3>
<table><thead><tr><th>Pattern</th><th>What It Is</th><th>When to Use</th><th>Example</th></tr></thead>
<tbody>
<tr><td><strong>Zero-shot</strong></td><td>Instruction only, no examples</td><td>Simple, well-understood tasks</td><td>"Classify this adverse event as serious or non-serious."</td></tr>
<tr><td><strong>Few-shot</strong></td><td>2–5 worked examples in the prompt</td><td>Nuanced tasks where format matters</td><td>Show 3 example classifications before the target</td></tr>
<tr><td><strong>Chain-of-Thought (CoT)</strong></td><td>Ask the model to reason step-by-step before answering</td><td>Multi-step reasoning, math, clinical logic</td><td>"Think through this step by step before giving your answer."</td></tr>
<tr><td><strong>Structured Output</strong></td><td>Force JSON/XML response format</td><td>Downstream data pipelines</td><td>Use response_format=json_object or define a schema</td></tr>
<tr><td><strong>Role Prompting</strong></td><td>Assign a persona or expertise level</td><td>Domain-specific tone or knowledge</td><td>"You are a senior pharmacovigilance scientist with 15 years of FDA experience."</td></tr>
<tr><td><strong>Self-consistency</strong></td><td>Sample multiple CoT chains, take majority vote</td><td>High-stakes decisions needing robustness</td><td>Run the same clinical classification 5 times, take modal answer</td></tr>
</tbody></table>

<pre><code class="language-python">from openai import OpenAI
import json

client = OpenAI()

# Pattern 1: Structured extraction from adverse event narrative
def extract_adverse_event(narrative: str) -> dict:
    """
    Extract structured data from a free-text adverse event report.
    Returns: patient demographics, drug, event, severity, outcome.
    """
    system_prompt = """You are a pharmacovigilance data scientist.
Extract structured data from adverse event narratives.
Always respond with valid JSON matching the schema exactly.
If a field cannot be determined, use null."""

    user_prompt = f"""Extract adverse event data from this narrative:

NARRATIVE: {narrative}

Respond with JSON:
{{
  "patient_age": <number or null>,
  "patient_sex": "<M|F|Unknown>",
  "suspect_drug": "<drug name>",
  "event_term": "<MedDRA preferred term>",
  "seriousness": "<Serious|Non-serious>",
  "seriousness_criteria": ["<hospitalization|death|life-threatening|disability|congenital>"],
  "outcome": "<recovered|recovering|not_recovered|fatal|unknown>"
}}"""

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user",   "content": user_prompt}
        ],
        response_format={"type": "json_object"},
        temperature=0  # deterministic for data extraction
    )
    return json.loads(response.choices[0].message.content)

# Pattern 2: Chain-of-Thought for clinical decision support
def assess_drug_interaction(drug_a: str, drug_b: str) -> str:
    prompt = f"""Think through this step by step before giving your final answer.

Question: Is there a clinically significant interaction between {drug_a} and {drug_b}?

Step 1: What is the primary mechanism of each drug?
Step 2: Do these mechanisms interact (pharmacokinetic or pharmacodynamic)?
Step 3: What is the clinical significance and recommended management?
Step 4: Final answer with confidence level.

Answer:"""

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.1
    )
    return response.choices[0].message.content</code></pre>

<h3>Common Failure Modes & Mitigations</h3>
<table><thead><tr><th>Failure Mode</th><th>What Happens</th><th>Mitigation</th></tr></thead>
<tbody>
<tr><td><strong>Hallucination</strong></td><td>Model confidently states false facts (fabricated citations, wrong drug doses)</td><td>RAG grounding, citation requirements, external validation</td></tr>
<tr><td><strong>Sycophancy</strong></td><td>Model agrees with incorrect user assertions to be "helpful"</td><td>Instruct to disagree when evidence contradicts; self-consistency checks</td></tr>
<tr><td><strong>Prompt injection</strong></td><td>Malicious input in user content overrides system instructions</td><td>Input sanitization, sandboxed execution, output validation</td></tr>
<tr><td><strong>Context overflow</strong></td><td>Critical instructions lost when context window exceeds limit</td><td>Summarize middle content; use RAG instead of stuffing</td></tr>
<tr><td><strong>Verbosity drift</strong></td><td>Model adds unnecessary caveats obscuring the answer</td><td>Explicit format constraints: "Answer in 2 sentences maximum."</td></tr>
</tbody></table>

<div class="callout warning"><div class="callout-title">Hallucination in Clinical Contexts</div><p>LLM hallucination is not a bug to be eventually fixed — it is an inherent property of probabilistic next-token prediction. In clinical and regulatory contexts, <strong>never</strong> use raw LLM output as a final answer without grounding (RAG), validation against authoritative sources, or human expert review. The system should provide citations users can verify.</p></div>`},

    {id:"s4",content:`<h2 id="s4">Retrieval-Augmented Generation (RAG)</h2>
<p><strong>Retrieval-Augmented Generation (RAG)</strong> solves the two biggest LLM limitations for enterprise use: outdated knowledge (training cutoffs) and hallucination. Instead of relying solely on parametric knowledge (weights), RAG retrieves relevant documents at inference time and injects them into the prompt as grounding context.</p>

<h3>RAG Architecture</h3>
<pre><code class="language-python">"""
RAG Pipeline:

User Query
    │
    ▼
[Embedding Model] ──── encode query ────▶ Query Vector
                                              │
                                    ┌─────────▼──────────┐
                                    │   Vector Database   │
                                    │  (Chroma/Pinecone)  │
                                    │   ─── ANN search ───│
                                    └─────────┬───────────┘
                                              │
                                    Top-k relevant chunks
                                              │
    ┌─────────────────────────────────────────▼──────────┐
    │  Augmented Prompt = System + Retrieved Chunks + Query│
    └─────────────────────────────────────────┬──────────┘
                                              │
                                        [LLM Generator]
                                              │
                                        Grounded Answer
                                     (with source citations)
"""</code></pre>

<h3>Building a Pharma RAG Pipeline</h3>
<pre><code class="language-python">from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.schema import Document
import PyPDF2

# Step 1: Load and chunk documents
def load_and_chunk_pdf(pdf_path: str, chunk_size=800, chunk_overlap=100):
    """
    Chunk size strategy for pharma docs:
    - 800 tokens: good for clinical guidelines (paragraph-level context)
    - 400 tokens: better for structured tables (keeps rows together)
    - Overlap: 100 tokens prevents cutting mid-sentence
    """
    reader = PyPDF2.PdfReader(pdf_path)
    full_text = "\n".join(page.extract_text() for page in reader.pages)

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        separators=["\n\n", "\n", ".", " "]  # semantic split hierarchy
    )
    chunks = splitter.split_text(full_text)
    return [Document(page_content=c, metadata={"source": pdf_path}) for c in chunks]

# Step 2: Build vector store
def build_knowledge_base(documents: list[Document], persist_dir="./pharma_kb"):
    embeddings = OpenAIEmbeddings(model="text-embedding-3-large")
    vectorstore = Chroma.from_documents(
        documents=documents,
        embedding=embeddings,
        persist_directory=persist_dir
    )
    return vectorstore

# Step 3: Create RAG chain with citations
def build_rag_chain(vectorstore, k=5):
    retriever = vectorstore.as_retriever(
        search_type="mmr",            # Maximum Marginal Relevance: diverse, non-redundant results
        search_kwargs={"k": k, "fetch_k": 20}
    )
    llm = ChatOpenAI(model="gpt-4o", temperature=0)

    chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",           # "stuff" = concatenate all retrieved chunks into prompt
        retriever=retriever,
        return_source_documents=True,
        chain_type_kwargs={
            "prompt": CLINICAL_QA_PROMPT  # custom prompt with citation instructions
        }
    )
    return chain

# Usage: Drug interaction knowledge base from FDA labels
documents = []
for label_pdf in ["warfarin_label.pdf", "aspirin_label.pdf", "clopidogrel_label.pdf"]:
    documents.extend(load_and_chunk_pdf(label_pdf))

kb = build_knowledge_base(documents)
qa_chain = build_rag_chain(kb)

result = qa_chain.invoke({"query": "What is the interaction between warfarin and aspirin?"})
print(result["result"])
print("Sources:", [doc.metadata["source"] for doc in result["source_documents"]])</code></pre>

<h3>RAG vs Fine-Tuning: Decision Framework</h3>
<table><thead><tr><th>Criterion</th><th>Use RAG</th><th>Use Fine-Tuning</th></tr></thead>
<tbody>
<tr><td>Knowledge freshness</td><td>Frequently updated (new drug labels, guidelines)</td><td>Stable domain knowledge</td></tr>
<tr><td>Transparency</td><td>Need citations and source attribution</td><td>Behavior change sufficient</td></tr>
<tr><td>Data volume</td><td>Large document corpus (&gt;1,000 pages)</td><td>High-quality labeled examples (&gt;1,000 pairs)</td></tr>
<tr><td>Cost</td><td>Higher per-query (retrieval + generation)</td><td>Higher upfront; lower per-query</td></tr>
<tr><td>Hallucination risk</td><td>Lower (grounded in retrieved text)</td><td>Higher (relies on parametric memory)</td></tr>
<tr><td>Pharma best practice</td><td>Clinical guidelines, drug labels, literature</td><td>Coding style, writing tone, classification tasks</td></tr>
</tbody></table>

<div class="callout"><div class="callout-title">Hybrid Approach: RAG + Fine-Tuning</div><p>Production pharma systems often combine both: fine-tune the model on domain format and terminology (so it "speaks pharma"), then use RAG to inject current, verifiable facts at query time. The fine-tuned model knows how to reason about clinical concepts; RAG ensures the facts are accurate and citable.</p></div>`},

    {id:"s5",content:`<h2 id="s5">AI Agents & Agentic Workflows</h2>
<p>An <strong>AI agent</strong> is an LLM that can take actions — not just generate text. Agents have four components: an LLM brain, tools (APIs, code executors, databases), memory (short-term context + long-term storage), and a planning loop. Agents can decompose complex tasks, execute multi-step workflows, and respond to results from prior actions.</p>

<h3>The ReAct Pattern: Reason + Act</h3>
<p>The most widely used agent loop: the model alternates between <strong>Reasoning</strong> (what do I need to do?) and <strong>Acting</strong> (call a tool), then observes the result and repeats.</p>
<pre><code class="language-python">from openai import OpenAI
import json, requests, datetime

client = OpenAI()

# Define tools the agent can call
tools = [
    {
        "type": "function",
        "function": {
            "name": "search_fda_approvals",
            "description": "Search FDA drug approval database for recent NDA/BLA approvals",
            "parameters": {
                "type": "object",
                "properties": {
                    "drug_name": {"type": "string", "description": "Drug or active ingredient name"},
                    "days_back": {"type": "integer", "description": "How many days back to search", "default": 30}
                },
                "required": ["drug_name"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "get_clinical_trial_status",
            "description": "Get current status and results of a clinical trial from ClinicalTrials.gov",
            "parameters": {
                "type": "object",
                "properties": {
                    "nct_id": {"type": "string", "description": "NCT identifier e.g. NCT04513795"}
                },
                "required": ["nct_id"]
            }
        }
    }
]

def run_pharma_intelligence_agent(query: str) -> str:
    """
    An autonomous agent that researches pharmaceutical competitive intelligence.
    Uses ReAct loop: Reason → Act → Observe → Reason → ...
    """
    messages = [
        {"role": "system", "content": """You are a pharma competitive intelligence agent.
You have access to FDA and ClinicalTrials.gov data.
Think step by step, use tools to gather facts, then synthesize a comprehensive answer.
Always cite your sources."""},
        {"role": "user", "content": query}
    ]

    # ReAct loop (max 5 iterations to prevent infinite loops)
    for _ in range(5):
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            tools=tools,
            tool_choice="auto"
        )
        msg = response.choices[0].message

        # If no tool calls, agent is done — return final answer
        if not msg.tool_calls:
            return msg.content

        # Execute each tool call and feed results back
        messages.append(msg)
        for call in msg.tool_calls:
            result = execute_tool(call.function.name, json.loads(call.function.arguments))
            messages.append({
                "role": "tool",
                "tool_call_id": call.id,
                "content": json.dumps(result)
            })

    return "Max iterations reached — partial answer may be incomplete."</code></pre>

<h3>Multi-Agent Systems</h3>
<p>Complex pharma workflows benefit from specialised agents working together:</p>
<table><thead><tr><th>Agent Role</th><th>Responsibility</th><th>Tools Available</th></tr></thead>
<tbody>
<tr><td><strong>Orchestrator</strong></td><td>Decomposes task, routes to specialists, aggregates results</td><td>Sub-agent invocation, task planning</td></tr>
<tr><td><strong>Literature Agent</strong></td><td>Searches PubMed, extracts endpoints and safety signals</td><td>PubMed API, PDF parser, RAG knowledge base</td></tr>
<tr><td><strong>Regulatory Agent</strong></td><td>Looks up FDA labels, PDUFA dates, approval history</td><td>FDA API, DailyMed, Orange Book</td></tr>
<tr><td><strong>Commercial Agent</strong></td><td>Retrieves market share, IMS data, analyst reports</td><td>IQVIA API, earnings call transcripts</td></tr>
<tr><td><strong>Writer Agent</strong></td><td>Synthesizes findings into structured report</td><td>Document templates, citation formatter</td></tr>
</tbody></table>

<div class="callout"><div class="callout-title">Agentic AI in Drug Development</div><p>Forward-looking pharma companies are deploying agents for: (1) automated pharmacovigilance signal detection — scanning FAERS database, flagging disproportionality signals, drafting PSUR sections; (2) clinical trial protocol drafting — querying precedent trials, suggesting endpoints based on regulatory guidance, generating ICF language; (3) competitive landscape monitoring — daily automated scans of ClinicalTrials.gov, FDA calendar, and competitor press releases with executive summaries.</p></div>`},

    {id:"s6",content:`<h2 id="s6">AI in Life Sciences & Beyond</h2>
<p>AI is reshaping every stage of the pharmaceutical value chain — and simultaneously transforming industries from finance to manufacturing. Understanding both the pharma-specific and broader applications builds the mental models needed to identify the next wave of opportunities.</p>

<h3>Drug Discovery & Development</h3>
<table><thead><tr><th>Application</th><th>AI Approach</th><th>Example / Company</th><th>Impact</th></tr></thead>
<tbody>
<tr><td>Protein structure prediction</td><td>Deep learning (evoformer, attention)</td><td>AlphaFold 2/3 (DeepMind)</td><td>Predicted &gt;200M protein structures; 50-year biology problem solved</td></tr>
<tr><td>Generative molecular design</td><td>Graph neural networks, diffusion models</td><td>Schrödinger, Insilico Medicine, RxRx</td><td>Design novel molecules with desired properties without wet lab iteration</td></tr>
<tr><td>Target identification</td><td>Knowledge graphs, multi-omics integration</td><td>BenevolentAI, Recursion</td><td>Identified baricitinib as COVID therapeutic 6 weeks into pandemic</td></tr>
<tr><td>Clinical trial design</td><td>LLMs + simulation</td><td>Unlearn.AI, Deep 6 AI</td><td>AI-generated synthetic control arms reduce placebo patient enrollment</td></tr>
<tr><td>Patient recruitment</td><td>EHR NLP, eligibility matching</td><td>Medidata, Trials.ai</td><td>Reduce average recruitment time from 2 years to months</td></tr>
</tbody></table>

<h3>Clinical Operations</h3>
<ul>
<li><strong>Medical imaging:</strong> CNNs reading radiology (FDA-approved: Viz.ai stroke detection, IDx-DR diabetic retinopathy) — superhuman performance on narrow tasks</li>
<li><strong>Clinical decision support:</strong> LLMs synthesizing patient history + guidelines + drug interactions for point-of-care recommendations</li>
<li><strong>Pharmacovigilance automation:</strong> NLP classifying 500K+ annual FAERS reports for signal detection — 90% reduction in manual review time</li>
<li><strong>Digital biomarkers:</strong> Wearable + smartphone signals (tremor, gait, voice) detecting disease progression in CNS trials</li>
</ul>

<h3>Commercial AI Applications</h3>
<pre><code class="language-python">from sklearn.ensemble import GradientBoostingClassifier
import pandas as pd

def build_next_best_action_model(hcp_engagement_df: pd.DataFrame):
    """
    Predict the optimal next channel and message for each HCP.
    Inputs: engagement history, Rx data, specialty, territory
    Output: ranked action recommendations per HCP
    """
    features = [
        'days_since_last_rep_call', 'email_open_rate_90d',
        'category_rx_volume_decile', 'brand_share_pct',
        'formulary_status', 'digital_engagement_score',
        'speaker_events_attended', 'msl_meetings_12m'
    ]

    # Multi-label classifier: predict which action drives highest Rx lift
    actions = ['rep_call', 'approved_email', 'webinar_invite',
               'speaker_program', 'msl_visit', 'no_action']

    # Train one classifier per action (one-vs-rest)
    models = {}
    for action in actions:
        y = (hcp_engagement_df['best_action'] == action).astype(int)
        models[action] = GradientBoostingClassifier(n_estimators=200).fit(
            hcp_engagement_df[features], y
        )

    # Score and rank actions per HCP
    scores = {action: models[action].predict_proba(hcp_engagement_df[features])[:, 1]
              for action in actions}

    return pd.DataFrame(scores, index=hcp_engagement_df.index).idxmax(axis=1)</code></pre>

<h3>AI Beyond Pharma — Transferable Lessons</h3>
<table><thead><tr><th>Industry</th><th>AI Application</th><th>Pharma Analogy</th></tr></thead>
<tbody>
<tr><td><strong>Finance</strong></td><td>Fraud detection (anomaly scoring on transaction streams)</td><td>Adverse event signal detection on FAERS submissions</td></tr>
<tr><td><strong>Finance</strong></td><td>LLMs for earnings call analysis, sentiment scoring</td><td>LLMs for label analysis, medical affairs content</td></tr>
<tr><td><strong>Manufacturing</strong></td><td>Computer vision quality control (defect detection on assembly lines)</td><td>AI inspection of drug product visual defects</td></tr>
<tr><td><strong>Legal/Compliance</strong></td><td>Contract review, clause extraction, risk flagging</td><td>Regulatory submission review, labeling consistency</td></tr>
<tr><td><strong>Software Engineering</strong></td><td>Code generation (GitHub Copilot, Cursor), automated testing</td><td>Automated SAS/R/Python code generation for stats outputs</td></tr>
<tr><td><strong>Supply Chain</strong></td><td>Demand forecasting with external signals (weather, social)</td><td>Drug demand forecasting with epidemic signals</td></tr>
</tbody></table>`},

    {id:"s7",content:`<h2 id="s7">Responsible AI & Regulatory Considerations</h2>
<p>AI systems in healthcare and life sciences face higher accountability standards than in most other domains — errors can harm patients, violate privacy, or mislead regulators. Responsible AI is not an ethical add-on; it is a technical and regulatory requirement.</p>

<h3>Core Responsible AI Dimensions</h3>
<table><thead><tr><th>Dimension</th><th>Definition</th><th>Healthcare Risk Example</th><th>Technical Mitigation</th></tr></thead>
<tbody>
<tr><td><strong>Fairness</strong></td><td>Model performs equitably across demographic groups</td><td>Sepsis risk model under-performs for Black patients (historical care disparities in training data)</td><td>Stratified evaluation by race/sex/age; reweighting; fairness constraints</td></tr>
<tr><td><strong>Explainability</strong></td><td>Ability to understand why a model produced a given output</td><td>Clinician cannot act on "high risk" label without knowing which factors drove it</td><td>SHAP values, LIME, attention visualization, mechanistic probing</td></tr>
<tr><td><strong>Robustness</strong></td><td>Model performs reliably under distribution shift and adversarial inputs</td><td>COVID care disruptions caused all healthcare AI to degrade simultaneously in 2020</td><td>Adversarial training, stress testing, continuous monitoring</td></tr>
<tr><td><strong>Privacy</strong></td><td>Training data and outputs do not leak PHI</td><td>LLM trained on EHR data memorizes and reproduces patient records</td><td>Differential privacy, federated learning, de-identification, PII scrubbing</td></tr>
<tr><td><strong>Transparency</strong></td><td>Stakeholders understand system purpose, limitations, and data sources</td><td>Hospital deploys AI without informing clinicians it's in the decision loop</td><td>Model cards, system documentation, audit trails</td></tr>
</tbody></table>

<h3>Explainability in Practice</h3>
<pre><code class="language-python">import shap
import xgboost as xgb
import pandas as pd
import matplotlib.pyplot as plt

def explain_patient_risk(model, X_train, X_patient, feature_names):
    """
    Generate SHAP explanation for a single patient's risk prediction.
    """
    # SHAP TreeExplainer for tree-based models (fast, exact)
    explainer = shap.TreeExplainer(model)
    shap_values = explainer.shap_values(X_patient)

    # Global importance: which features drive predictions most overall
    shap.summary_plot(
        shap.TreeExplainer(model).shap_values(X_train),
        X_train,
        feature_names=feature_names,
        plot_type="bar",
        show=False
    )
    plt.title("Global Feature Importance (SHAP)")

    # Local explanation: why THIS patient got THIS score
    force_plot = shap.force_plot(
        explainer.expected_value,
        shap_values[0],
        X_patient.iloc[0],
        feature_names=feature_names
    )

    # Format for clinical dashboard
    explanation = pd.DataFrame({
        "Feature": feature_names,
        "Value": X_patient.iloc[0].values,
        "SHAP_Impact": shap_values[0],
        "Direction": ["↑ Risk" if v > 0 else "↓ Risk" for v in shap_values[0]]
    }).sort_values("SHAP_Impact", key=abs, ascending=False)

    return explanation.head(5)  # Top 5 drivers for clinician review</code></pre>

<h3>Regulatory Landscape</h3>
<table><thead><tr><th>Regulation / Guidance</th><th>Scope</th><th>Key Requirements</th></tr></thead>
<tbody>
<tr><td><strong>FDA AI/ML-Based SaMD Action Plan (2021)</strong></td><td>Software as a Medical Device using AI/ML</td><td>Predetermined change control plans; real-world performance monitoring; transparency to patients and clinicians</td></tr>
<tr><td><strong>FDA Guidance: Marketing Submission Recommendations for AI/ML-Enabled Device Software</strong></td><td>510(k), De Novo, PMA submissions</td><td>Algorithm change protocols; performance testing on representative data; bias evaluation across subgroups</td></tr>
<tr><td><strong>EU AI Act (2024, effective 2026)</strong></td><td>All AI systems sold/used in EU</td><td>Risk-tiered requirements: medical AI = "High Risk" → mandatory conformity assessment, technical documentation, human oversight</td></tr>
<tr><td><strong>ICH E9(R1) — Estimands</strong></td><td>Clinical trial analysis using AI/ML</td><td>Pre-specify AI-augmented endpoints; handle intercurrent events; document model choices</td></tr>
<tr><td><strong>EMA Reflection Paper on AI</strong></td><td>AI in drug development and regulatory submissions</td><td>Transparency, reproducibility, validation on external datasets, human oversight for high-impact decisions</td></tr>
</tbody></table>

<div class="callout warning"><div class="callout-title">The FDA's "Predetermined Change Control Plan"</div><p>Unlike traditional software, AI models continuously evolve. The FDA's PCCP framework requires manufacturers to pre-specify what types of updates are permissible without a new regulatory submission. This forces teams to think ahead about retraining protocols, performance thresholds, and clinical impact — building responsible AI governance into the development lifecycle rather than retrofitting it.</p></div>

<h3>AI Governance Checklist for Pharma Systems</h3>
<div class="callout"><div class="callout-title">Pre-Deployment Checklist</div>
<p>☑ <strong>Model card completed</strong>: intended use, training data, performance metrics, known limitations<br>
☑ <strong>Bias evaluation</strong>: performance stratified by age, sex, race, geography, payer type<br>
☑ <strong>Explainability mechanism</strong>: SHAP/LIME output available for every high-stakes prediction<br>
☑ <strong>Human-in-the-loop</strong>: defined escalation path for low-confidence or high-impact decisions<br>
☑ <strong>PHI audit</strong>: training data de-identified; outputs scrubbed for re-identification risk<br>
☑ <strong>Monitoring plan</strong>: data drift (PSI), concept drift (AUC decay), prediction drift alerts live<br>
☑ <strong>Rollback plan</strong>: documented procedure to revert to prior model version within 24 hours<br>
☑ <strong>Regulatory assessment</strong>: FDA SaMD classification completed; EU AI Act risk tier confirmed<br>
☑ <strong>Legal review</strong>: Terms of service for any third-party LLM APIs; data processing agreements</p>
</div>`},

    {id:"s8",content:`<h2 id="s8">Key Takeaways</h2>
<div class="takeaway"><div class="takeaway-num">1</div><div>AI, ML, deep learning, and generative AI form a nested hierarchy — every LLM is a neural network, every neural network is ML, every ML system is AI. Understanding this hierarchy prevents category errors when evaluating or deploying systems.</div></div>
<div class="takeaway"><div class="takeaway-num">2</div><div>The transformer's self-attention mechanism is the universal architecture: the same structure (with scale) underpins GPT-4 for text, DALL·E for images, AlphaFold for proteins, and Gemini for multimodal reasoning. Understanding attention means understanding modern AI.</div></div>
<div class="takeaway"><div class="takeaway-num">3</div><div>Prompt engineering is the first skill to master for LLM productivity: use chain-of-thought for reasoning, structured output for pipelines, few-shot examples for format compliance, and temperature=0 for deterministic extraction tasks in regulated contexts.</div></div>
<div class="takeaway"><div class="takeaway-num">4</div><div>RAG is the standard architecture for enterprise knowledge Q&A: it grounds LLM outputs in verifiable documents, dramatically reducing hallucination, and keeps knowledge current without retraining. Choose RAG over fine-tuning when facts change frequently or citations are required.</div></div>
<div class="takeaway"><div class="takeaway-num">5</div><div>Responsible AI is a technical and regulatory requirement in life sciences, not an ethical afterthought. Every high-stakes AI system needs bias evaluation across patient subgroups, explainability for clinical users, continuous drift monitoring, and a human escalation path — documented before deployment.</div></div>`}
  ],
  questions:[
    {id:"q1",
     text:"A transformer's self-attention layer receives a sequence of tokens. Which statement best describes what the Query, Key, and Value matrices represent conceptually?",
     options:[
       "Q=input features, K=output labels, V=gradient signal during training",
       "Q='what am I looking for', K='what do I contain', V='what do I contribute' — attention scores (Q·Kᵀ) determine how much each position's Value is weighted in the output",
       "Q, K, V are three independent neural networks processing the same input in parallel",
       "Q is the encoder output, K is the decoder input, and V is the cross-attention weight matrix"
     ],
     correct:1,
     explanation:"Self-attention computes relevance between all token pairs simultaneously. The Query represents the 'question' a token is asking; the Key represents what each token 'offers' as a match; the Value is what gets passed forward when a match is found. The attention weight for position i attending to position j = softmax(Qᵢ·Kⱼᵀ / √d_k). The output for position i = weighted sum of all Values. This mechanism allows the model to capture long-range dependencies (e.g., a pronoun referencing a noun 200 tokens away) without sequential processing."},
    {id:"q2",
     text:"A pharma team needs to build a Q&A system over 10,000 FDA drug approval documents updated monthly. They are debating between fine-tuning a base LLM on these documents versus building a RAG pipeline. Which approach is most appropriate and why?",
     options:[
       "Fine-tuning: it permanently encodes all document knowledge into the model weights, making retrieval unnecessary",
       "RAG: the knowledge base is large, updated monthly, requires source citations for regulatory compliance, and hallucination on drug facts is unacceptable — all criteria favor RAG over fine-tuning",
       "Fine-tuning: RAG adds latency that makes the system too slow for user queries",
       "Neither: LLMs cannot reliably process FDA regulatory documents regardless of approach"
     ],
     correct:1,
     explanation:"This case has four RAG-favoring criteria: (1) frequently updated corpus (monthly) — fine-tuning on current data would require expensive monthly retraining; (2) large document volume (10,000 docs) — fits naturally in a vector database; (3) citation requirement — RAG returns source chunks so users can verify answers, which fine-tuning cannot do; (4) zero hallucination tolerance on drug facts — grounding responses in retrieved document text dramatically reduces fabrication. Fine-tuning is appropriate for behavior changes (writing style, task format) not for injecting large, frequently updated factual knowledge."},
    {id:"q3",
     text:"Under the EU AI Act, which risk tier applies to an AI system that analyzes CT scans to detect pulmonary embolism and recommends treatment urgency to emergency physicians?",
     options:[
       "Minimal risk — AI-assisted imaging is a standard technology",
       "Limited risk — transparency obligations only (disclosure that AI is involved)",
       "High risk — medical AI with direct clinical impact falls under mandatory conformity assessment, human oversight requirements, and technical documentation obligations",
       "Prohibited — AI cannot make treatment recommendations under EU law"
     ],
     correct:2,
     explanation:"The EU AI Act classifies AI used in medical devices or clinical decision support as 'High Risk' (Annex III). A pulmonary embolism detection system that informs treatment urgency decisions clearly meets this threshold because: (1) it is used in a safety-critical medical context, (2) errors directly impact patient outcomes, and (3) it influences clinical decision-making. High-risk AI systems require: mandatory conformity assessment before market placement, comprehensive technical documentation, logging of system operation, human oversight mechanisms, and accuracy/robustness/cybersecurity requirements. This does NOT mean such systems are prohibited — it means they face rigorous pre-market validation requirements."}
  ]
}

}); // end Chapter 5-11 AI Concepts & Generative AI
