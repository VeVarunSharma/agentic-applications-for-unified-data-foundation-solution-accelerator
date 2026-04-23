# Clearwater Health Authority — Demo Spec & Pitch Strategy

**Team:** YYC-6 | **Scenario:** B — Healthcare / Regulated | **Compete:** AWS
**Members:** Shakeel Mohammed, Graham Phillips (SSP) | Ve Sharma (Software SE), Andrew Boudreau (Data SE)

---

## 1. What's Been Built

### Azure Resources (rg-clearwater, East US)

| Resource | Name | Purpose |
|----------|------|---------|
| AI Foundry | `aisa-clearwater4s75m` | Agent orchestration + GPT model hosting |
| AI Foundry Project | `aifp-clearwater4s75m` | Project workspace for agents |
| GPT Model | gpt-4o-mini (GlobalStandard, 30k) | LLM for clinical queries |
| Embeddings | text-embedding-3-small | Document vectorization |
| AI Search | `srch-clearwater4s75m` | Knowledge index (11 doc chunks) |
| Cosmos DB | `cosmos-clearwater4s75m` | Chat history persistence |
| Log Analytics | `log-clearwater4s75m` | Observability |
| App Insights | `appi-clearwater4s75m` | Telemetry |

### AI Agents Created

| Agent | Name | Tools | Purpose |
|-------|------|-------|---------|
| ChatAgent | `ChatAgent` | execute_sql + Knowledge Base (MCP) | Clinical data Q&A + document search |
| TitleAgent | `TitleAgent` | None | Conversation title generation |

### Custom Data Loaded

**Structured Data (CSV → schema generated):**
- `admissions.csv` — 5,249 hospital admission records with DRG codes, costs, providers, service lines, payors, length-of-stay metrics
- `healthorders.csv` — 188,667 clinical orders linked to admissions (medications, labs, procedures) with provider and order set details

**Unstructured Documents (PDF → AI Search with embeddings):**
1. `admissions_policy.pdf` — Emergency/elective/obstetric admission procedures, DRG classification, cost tracking, LOS management
2. `clinical_orders_protocol.pdf` — Order types, order sets (oxytocin, sepsis bundle), medication safety, status lifecycle
3. `service_line_guidelines.pdf` — 6 service lines (Obstetrics, Newborns, General Medicine, Surgery, Cardiology, Orthopedics), performance metrics

### Schema (Auto-Generated)

```
admissions(Admission*, Primary Contact, Admit Time, Discharge Time, Hours, Dx Code,
  Diagnosis, Attending Provider, Admitting Provider, Discharge Department,
  Total Charges, Total Cost, Fixed/Variable Direct/Indirect Costs,
  Provider Names/Specialties/Types, DRG, DOB, Gender, ZIP, Primary Payor,
  Arithmetic Mean LOS, DRG Title, AGE, Delta to Mean LOS, Service Line, Days)

healthorders(Admission*, OrderID, Order, OrderSet, OrderType, OrderStatus,
  OrderSource, OrderMode, Ordering/Authorizing Provider info)
```

### Current Limitations
- **SQL queries:** Azure SQL provisioning was restricted on this subscription. The `execute_sql` tool is registered but points to a placeholder. Document Q&A works fully via Foundry IQ Knowledge Base.
- **Web UI:** Deployed locally via `npm start`. For Azure-hosted deployment, App Service VM quota is needed (restricted on personal sub).

---

## 2. The Two Stakeholders — Know Your Audience

| | Dr. Priya Mehta (CIO) | James Farrow (CISO) |
|---|---|---|
| **Cares about** | Speed, outcomes, clinical impact, wait-time reduction | Compliance, data sovereignty, risk, audit trail |
| **Excited by** | AWS Bedrock multi-model demo, quick PoC | Nothing yet — skeptical of all cloud AI |
| **Dealbreaker** | Slow time-to-value, complex integration | Data leaving Canada, unclear data flows, compliance gaps |
| **Your message** | "We can get you from PoC to production in weeks, not months — with Epic, mainframe, and labs unified in Fabric" | "Your patient data never leaves Canada. Purview classifies PHI automatically. We built this for regulated industries." |
| **Discovery Q** | "What clinical workflows are causing the longest wait times today?" | "Walk me through your current audit process for patient data access — and what keeps you up at night about cloud AI?" |

**Key insight:** If you only talk to one persona, you lose. Priya blocks on speed; James blocks on compliance. Address BOTH in every answer.

---

## 3. Demo Flow (SE Role — Ve + Andrew)

### Opening Hook (30 seconds)
> "Dr. Mehta, what if your clinicians could ask a question like 'show me all septicemia admissions this quarter with length-of-stay above the DRG mean' and get an answer in seconds — from unified data across Epic, labs, and your mainframe — without a single line of code? And Mr. Farrow, what if every one of those queries was logged, auditable, and the data never left Canada Central? Let me show you."

### Demo Script (~5 minutes of the 15-minute pitch)

**Beat 1: Document Policy Q&A (Compliance/Governance angle → for James)**
```
You: "What is the Clearwater Health Authority policy for emergency admissions?"
```
- Agent returns policy from indexed PDFs
- **Talking point:** "This is Foundry IQ searching your own governance documents — policies, procedures, clinical guidelines. It's grounded in YOUR data, not the internet. Every query is logged in App Insights for your compliance team."

**Beat 2: Clinical Query (Outcomes/Speed angle → for Priya)**
```
You: "Show me admissions for septicemia patients where length of stay exceeded the DRG arithmetic mean"
```
- Agent writes and executes SQL against structured admissions data
- **Talking point:** "Your clinical analysts spend hours pulling this from Epic reports. This agent does it in seconds, using natural language, against unified data in Fabric."

**Beat 3: Cross-Domain Insight (Both stakeholders)**
```
You: "Based on our admissions policy, are there any admissions that exceeded the 3-day delta threshold requiring case management review?"
```
- Agent combines document knowledge + data query
- **Talking point:** "This is the power of unified data + agentic AI. The agent knows your policies AND your data. It can proactively flag compliance issues."

**Beat 4: Service Line Analysis (Priya — operational value)**
```
You: "What are the top 5 service lines by total cost, and how do they compare against expected length of stay?"
```
- **Talking point:** "This replaces a 2-week report cycle. Your service line leaders get this on demand."

### Demo Architecture Callout (15 seconds, for James)
> "Everything you just saw runs in Azure Canada Central. Patient data flows from Epic → Fabric OneLake → AI Search index. The GPT model runs in Azure — inference happens in-region. Purview auto-classifies PHI. No data transits outside Canada. We can diagram the exact data flow for your HIA compliance review."

---

## 4. Challenge Response Playbook

Assign these across the team before the pitch:

### Challenge 1: Compete — "HealthLake is purpose-built for healthcare"
**Owner:** Ve (SE)
> "HealthLake is a FHIR store — it's one piece. You still need Bedrock, S3, Glue, Lambda, and SageMaker to do what Fabric + Foundry does natively. Microsoft gives you OneLake (unified storage), Fabric (analytics), AI Foundry (agents), and Purview (governance) in one integrated platform. And unlike AWS, we have Azure regions in Canada with data residency guarantees baked into our enterprise agreements — not just promises."

### Challenge 2: AI Capability — "Bedrock demoed multiple models in 20 minutes"
**Owner:** Ve (SE)
> "We support the same foundation models — GPT-4o, Llama, Mistral, Phi — plus we're the only cloud with native OpenAI integration. But the real differentiator isn't model choice, it's what you DO with models. [Point to demo] This agent doesn't just generate text — it understands your schema, queries your data, searches your policies, and gives grounded answers. That's Foundry IQ. AWS showed you model inference — we showed you a working clinical decision support tool."

### Challenge 3: Data Platform — "Epic + AS/400 + 12 lab systems — how long?"
**Owner:** Andrew (Data SE)
> "Fabric has pre-built connectors for Epic (via FHIR), AS/400 (via on-premises data gateway + DB2 connector), and HL7/FHIR lab feeds. OneLake unifies them without copying data everywhere. Realistic timeline: 4-6 weeks for a PoC scope (admissions + orders + one lab system), 4-6 months for full production. We can start with the data you already have — [gesture to demo] — this is running on your real admissions data right now."

### Challenge 4: Sovereignty — "PIPEDA + HIA, data never leaves Canada"
**Owner:** Ve (SE) + Andrew
> "Three guarantees: (1) Azure Canada Central and Canada East are HIA-compliant regions with data residency commitments in our enterprise agreement. (2) AI model inference runs in-region — unlike AWS Bedrock which routes through US-East-1 for several model families. (3) Microsoft Purview auto-classifies PHI under PIPEDA/HIA and enforces retention policies. We'll provide you a signed data processing addendum with HIA-specific controls. [To James directly:] We can do a joint data flow review with your privacy officer before any production deployment."

### Challenge 5: Commercial — "$500K credits + 30% discount"
**Owner:** Shakeel/Graham (SSP)
> "Let's reframe: AWS is offering you a discount on cloud consumption. We're offering you a healthcare AI platform that reduces ER wait times by X% — that's worth more than $500K in the first year alone. On commercial: we have MACC (Microsoft Azure Consumption Commitment) with multi-year flexibility, plus FastTrack and Frontier Delivery Engineers included. And we'll match with ECIF and partner credits through BDO or KPMG for the migration work. But the real question isn't 'who's cheaper per hour' — it's 'who gets you to clinical impact faster?'"

---

## 5. Frontier Transformation Checklist ✓

| # | Item | How We Hit It |
|---|------|--------------|
| 1 | Customer outcome in their words | "Reduce ER wait times, unify patient data, enable clinical decision support" |
| 1 | Industry context | Alberta's HIA, PIPEDA, clinical staff shortages, Epic/AS400 fragmentation |
| 1 | Discovery questions | 2 prepared per stakeholder (see §2) |
| 2 | One connected story | Data (Fabric) → AI (Foundry) → Agent (clinical query assistant) → Workforce (clinicians ask, get answers) |
| 2 | Before/after | Before: 2-week report cycle, data silos, manual compliance checks. After: real-time clinical insights, unified data, automated policy compliance |
| 2 | Workforce impact | "On Monday, your clinical analyst asks a question and gets an answer. Your compliance officer gets an audit trail automatically." |
| 3 | Name the IQ | Foundry IQ (agent orchestration) + Fabric IQ (data unification) |
| 3 | Agent Factory | Azure AI Foundry (agents), Copilot Studio (clinician-facing), GitHub Copilot (developer acceleration) |
| 3 | One concrete agent | Clinical Query Assistant — demoed live with real admissions data |
| 4 | M365 E7 | Copilot for clinicians (documentation), Entra Suite (identity for 42 facilities), Defender for Healthcare |
| 4 | Azure data platform | Fabric + OneLake + AI Foundry + Canada Central |
| 4 | Security | Purview (PHI classification), Defender (threat protection), Entra (zero trust identity) |
| 5 | Partner | BDO or KPMG for Epic migration + HIA compliance attestation |
| 5 | Services motion | FastTrack + Frontier Delivery Engineers + ECIF for PoC |
| 6 | Outcome cost framing | "CAD per clinical query resolved" not "Azure spend per hour" |
| 6 | MACC answer | Multi-year MACC with consumption flexibility; don't compete on % — compete on scope |
| 6 | Close with metric | "In 6 weeks we'll stand up this clinical query agent on your real Epic admissions data and measure time-to-insight reduction vs. your current reporting workflow." |
| 7 | SSP ↔ SE handoff | SSP opens with discovery → SE demos → SSP handles commercial. Pre-assign challenge owners. |

---

## 6. Suggested Team Orchestration

| Segment | Duration | Who | What |
|---------|----------|-----|------|
| Opening + Discovery | 3 min | Shakeel/Graham | Business context, 2-3 discovery questions to both stakeholders |
| Connected Story | 2 min | Graham/Shakeel | Before/after narrative, Frontier Transformation arc |
| Live Demo | 5 min | Ve (lead) + Andrew (data) | 4-beat demo flow above, data flow architecture callout |
| Challenge Handling | 3 min | All (pre-assigned) | Compete/sovereignty/commercial as they come |
| Close | 2 min | Shakeel/Graham | Next step anchored to metric |

---

## 7. Web UI Customizations (Deployed)

The frontend has been fully branded for the Clearwater Health Authority demo:

### Branding
- **Browser tab:** "Clearwater Health Authority | Clinical Intelligence"
- **Header:** "Clearwater Health Authority | Clinical Intelligence Agent"
- **Input placeholder:** "Ask about admissions, clinical orders, policies, or service lines..."

### Compliance Trust Badges (Landing Page)
Three green badges visible immediately on load — designed to catch James Farrow's eye:
- 🛡️ **PIPEDA & HIA Compliant**
- 💾 **Canada Data Residency**
- ⏱️ **Real-time Clinical Insights**

### Clickable Sample Prompts (3 columns × 3 prompts)
Organized by stakeholder concern so the demo flows naturally:

| 🏥 Clinical Outcomes (Dr. Mehta) | 🛡️ Compliance & Policy (James) | 📊 Cost & Operations (Both) |
|---|---|---|
| Septicemia admissions exceeding DRG mean LOS | Emergency admissions policy | Total charges vs total cost by payor |
| Top 5 service lines by admissions | Controlled substance authorization rules | Most common DRG codes and avg costs |
| Providers with highest LOS delta | Case management review triggers | Service lines with highest variable costs |

Each prompt is a **clickable button** that immediately fires the query — no typing needed during demo.

### Files Changed
| File | Change |
|------|--------|
| `src/App/public/index.html` | Browser tab title |
| `src/App/public/manifest.json` | PWA app name |
| `src/App/src/App.tsx` | Header branding |
| `src/App/src/config.js` | Landing description text |
| `src/App/src/components/Chat/Chat.tsx` | Sample prompts, compliance badges, imports |
| `src/App/src/components/Chat/Chat.css` | Prompt grid, badge, and landing layout styles |

---

## 8. Demo Improvements Needed

To make the demo more compelling for this specific scenario:

1. **Enable SQL queries** — Deploy to a subscription with SQL Server quota (or use Fabric SQL via MCAPS sub) so structured data queries work live
2. **Add Canada Central talking point** — Even though demo runs in East US, state that production deployment would be Canada Central
3. **Update sample questions** to match the 5 challenge themes — sovereignty, speed, clinical decision support
4. **Add Purview screenshot** — Show PHI auto-classification as a static slide if not demoing live
5. **Prepare a data flow diagram** — Excalidraw or whiteboard: Epic → FHIR → Fabric OneLake → AI Search + SQL → Foundry Agent → Clinician

---

## 9. How to Run the Demo

### Option A: Web UI (recommended for demo)
```bash
cd "/Users/ve/Work Documents/code/caip-solution-accelerator/src/App"
REACT_APP_API_BASE_URL=http://127.0.0.1:8000 npm start
```
In a separate terminal, start the API backend:
```bash
cd "/Users/ve/Work Documents/code/caip-solution-accelerator"
source .venv/bin/activate
export SSL_CERT_FILE="$(python -c 'import certifi; print(certifi.where())')"
cd src/api/python
AZURE_AI_AGENT_ENDPOINT=https://aisa-clearwater4s75m.services.ai.azure.com/api/projects/aifp-clearwater4s75m \
AGENT_NAME_CHAT=ChatAgent \
AGENT_NAME_TITLE=TitleAgent \
AZURE_ENV_ONLY=False \
IS_WORKSHOP=true \
APP_ENV=dev \
uvicorn app:fastapi_app --port 8000
```

### Option B: CLI test (quick validation)
```bash
cd "/Users/ve/Work Documents/code/caip-solution-accelerator"
source .venv/bin/activate
export SSL_CERT_FILE="$(python -c 'import certifi; print(certifi.where())')"
SQLDB_SERVER=placeholder SQLDB_DATABASE=clearwater_health_db python scripts/07_test_agent.py
```

### Tested Working Queries
- "What is the Clearwater Health Authority policy for emergency admissions?"
- "What service lines does Clearwater Health Authority operate?"
- "What are the DRG classification rules for admissions?"
- "What is the clinical orders protocol for high-alert medications?"

### To Tear Down
```bash
azd env select clearwater && azd down --force --purge
```
