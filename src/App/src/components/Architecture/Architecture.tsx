import React from "react";
import {
  Title2,
  Title3,
  Body1,
  Body2,
  Caption1,
  Badge,
} from "@fluentui/react-components";
import {
  DesktopMac24Regular,
  Server24Regular,
  BrainCircuit24Regular,
  Database24Regular,
  DocumentSearch24Regular,
  ChatMultiple24Regular,
  Globe24Regular,
  DataArea24Regular,
  ShieldCheckmark24Regular,
  LightbulbFilament24Regular,
  Timer24Regular,
  ArrowLeft24Regular,
  PersonCircle24Regular,
  PlugConnected24Regular,
} from "@fluentui/react-icons";
import "./Architecture.css";

type ArchitectureProps = {
  onBack: () => void;
};

const Architecture: React.FC<ArchitectureProps> = ({ onBack }) => {
  return (
    <div className="architecture-page">

      {/* Hero */}
      <div className="arch-hero">
        <Title2>How It&rsquo;s Built</Title2>
        <Body1 className="arch-hero-subtitle">
          Clearwater Health Authority&rsquo;s Clinical Intelligence Agent is
          built on Microsoft&rsquo;s Unified Data Foundation &mdash; combining
          Azure AI Foundry, Microsoft Fabric, and governed enterprise data to
          deliver natural-language insights over structured and unstructured
          healthcare data.
        </Body1>
      </div>

      {/* ── Tech Stack ── */}
      <div className="arch-section">
        <div className="arch-section-header">
          <DesktopMac24Regular />
          <Title3>Tech Stack</Title3>
        </div>
        <div className="arch-grid">
          <div className="arch-card">
            <div className="arch-card-header">
              <Globe24Regular style={{ color: "#0078d4" }} />
              <Body1 style={{ fontWeight: 600 }}>Frontend</Body1>
            </div>
            <Body2>
              React 18 single-page app with Microsoft Fluent UI v9 for a
              polished, accessible experience. Redux Toolkit manages state;
              streaming responses render in real time.
            </Body2>
            <div className="arch-card-tags">
              <Badge appearance="outline">React 18</Badge>
              <Badge appearance="outline">Fluent UI v9</Badge>
              <Badge appearance="outline">TypeScript</Badge>
              <Badge appearance="outline">Redux Toolkit</Badge>
            </div>
          </div>

          <div className="arch-card">
            <div className="arch-card-header">
              <Server24Regular style={{ color: "#107c10" }} />
              <Body1 style={{ fontWeight: 600 }}>Backend API</Body1>
            </div>
            <Body2>
              FastAPI (Python) or ASP.NET Core (.NET) — dual-stack backend that
              handles chat orchestration, streaming responses, and conversation
              history via Cosmos DB.
            </Body2>
            <div className="arch-card-tags">
              <Badge appearance="outline">FastAPI</Badge>
              <Badge appearance="outline">Python 3.12</Badge>
              <Badge appearance="outline">.NET 10</Badge>
              <Badge appearance="outline">Azure Container Apps</Badge>
            </div>
          </div>

          <div className="arch-card">
            <div className="arch-card-header">
              <BrainCircuit24Regular style={{ color: "#8661c5" }} />
              <Body1 style={{ fontWeight: 600 }}>AI Engine</Body1>
            </div>
            <Body2>
              Azure AI Foundry orchestrates agents that combine an LLM
              (GPT-4o-mini) with tool-calling — executing SQL queries against
              Fabric and searching documents in Azure AI Search, all in a single
              conversational turn.
            </Body2>
            <div className="arch-card-tags">
              <Badge appearance="outline">Azure AI Foundry</Badge>
              <Badge appearance="outline">GPT-4o-mini</Badge>
              <Badge appearance="outline">Agent Framework</Badge>
              <Badge appearance="outline">Tool Calling</Badge>
            </div>
          </div>

          <div className="arch-card">
            <div className="arch-card-header">
              <DataArea24Regular style={{ color: "#e3008c" }} />
              <Body1 style={{ fontWeight: 600 }}>Data Platform</Body1>
            </div>
            <Body2>
              Microsoft Fabric provides the unified data foundation — SQL
              Database in Fabric stores structured healthcare data while
              OneLake enables cross-domain analytics with full governance.
            </Body2>
            <div className="arch-card-tags">
              <Badge appearance="outline">Microsoft Fabric</Badge>
              <Badge appearance="outline">SQL Database in Fabric</Badge>
              <Badge appearance="outline">OneLake</Badge>
              <Badge appearance="outline">Lakehouse</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* ── Data Sources ── */}
      <div className="arch-section">
        <div className="arch-section-header">
          <Database24Regular />
          <Title3>Data Sources</Title3>
        </div>

        <Body2 style={{ marginBottom: "0.75rem", color: "#616161" }}>
          <strong>Active</strong> — currently connected in this deployment
        </Body2>
        <div className="arch-grid">
          <div className="arch-card">
            <div className="arch-card-header">
              <Database24Regular style={{ color: "#0078d4" }} />
              <Body1 style={{ fontWeight: 600 }}>Fabric SQL Database</Body1>
              <Badge color="success" appearance="filled" size="small">Live</Badge>
            </div>
            <Body2>
              Structured clinical data queried via the agent&rsquo;s
              <code> execute_sql</code> tool. The agent generates T-SQL from
              natural language and returns results inline.
            </Body2>
            <div className="arch-card-tags">
              <Badge appearance="tint" color="informative">admissions — 5,249 rows</Badge>
              <Badge appearance="tint" color="informative">healthorders — 188,667 rows</Badge>
            </div>
          </div>

          <div className="arch-card">
            <div className="arch-card-header">
              <DocumentSearch24Regular style={{ color: "#107c10" }} />
              <Body1 style={{ fontWeight: 600 }}>Azure AI Search</Body1>
              <Badge color="success" appearance="filled" size="small">Live</Badge>
            </div>
            <Body2>
              Healthcare policy PDFs chunked, embedded, and indexed. The
              agent&rsquo;s <code>AzureAISearchTool</code> performs semantic
              search to answer policy and procedure questions.
            </Body2>
            <div className="arch-card-tags">
              <Badge appearance="tint" color="informative">admissions_policy.pdf</Badge>
              <Badge appearance="tint" color="informative">clinical_orders_protocol.pdf</Badge>
              <Badge appearance="tint" color="informative">service_line_guidelines.pdf</Badge>
            </div>
          </div>

          <div className="arch-card">
            <div className="arch-card-header">
              <ChatMultiple24Regular style={{ color: "#8661c5" }} />
              <Body1 style={{ fontWeight: 600 }}>Cosmos DB</Body1>
              <Badge color="success" appearance="filled" size="small">Live</Badge>
            </div>
            <Body2>
              Stores conversation history and user sessions. Enables
              multi-turn context and chat history recall across sessions.
            </Body2>
            <div className="arch-card-tags">
              <Badge appearance="tint" color="informative">Chat history</Badge>
              <Badge appearance="tint" color="informative">Session state</Badge>
            </div>
          </div>
        </div>

        <Body2 style={{ margin: "1.25rem 0 0.75rem", color: "#616161" }}>
          <strong>Extensible</strong> — additional sources Fabric can unify
        </Body2>
        <div className="arch-grid">
          <div className="arch-card potential">
            <div className="arch-card-header">
              <DataArea24Regular style={{ color: "#a0a0a0" }} />
              <Body1 style={{ fontWeight: 600, color: "#616161" }}>
                Power BI Semantic Models
              </Body1>
            </div>
            <Caption1 style={{ color: "#8a8a8a" }}>
              Connect agents to existing Power BI datasets for real-time
              analytics without duplicating data.
            </Caption1>
          </div>

          <div className="arch-card potential">
            <div className="arch-card-header">
              <PlugConnected24Regular style={{ color: "#a0a0a0" }} />
              <Body1 style={{ fontWeight: 600, color: "#616161" }}>
                OneLake / Lakehouse
              </Body1>
            </div>
            <Caption1 style={{ color: "#8a8a8a" }}>
              Ingest data from EHR systems, claims pipelines, and operational
              databases through Fabric shortcuts and mirroring.
            </Caption1>
          </div>

          <div className="arch-card potential">
            <div className="arch-card-header">
              <PersonCircle24Regular style={{ color: "#a0a0a0" }} />
              <Body1 style={{ fontWeight: 600, color: "#616161" }}>
                Dataverse / Dynamics 365
              </Body1>
            </div>
            <Caption1 style={{ color: "#8a8a8a" }}>
              Surface CRM, patient engagement, and operational records through
              Fabric&rsquo;s Dataverse integration.
            </Caption1>
          </div>
        </div>
      </div>

      {/* ── Architecture Flow ── */}
      <div className="arch-section">
        <div className="arch-section-header">
          <PlugConnected24Regular />
          <Title3>Architecture Flow</Title3>
        </div>
        <div className="arch-flow">
          <div className="arch-flow-node user">
            <PersonCircle24Regular />
            <Caption1><strong>User</strong></Caption1>
          </div>
          <span className="arch-flow-arrow">→</span>
          <div className="arch-flow-node frontend">
            <Globe24Regular />
            <Caption1><strong>React Frontend</strong></Caption1>
          </div>
          <span className="arch-flow-arrow">→</span>
          <div className="arch-flow-node backend">
            <Server24Regular />
            <Caption1><strong>FastAPI / .NET</strong></Caption1>
          </div>
          <span className="arch-flow-arrow">→</span>
          <div className="arch-flow-node agent">
            <BrainCircuit24Regular />
            <Caption1><strong>AI Foundry Agent</strong></Caption1>
          </div>
          <span className="arch-flow-arrow">→</span>
          <div className="arch-flow-fan">
            <div className="arch-flow-node datasource">
              <Database24Regular />
              <Caption1><strong>Fabric SQL</strong></Caption1>
            </div>
            <div className="arch-flow-node datasource">
              <DocumentSearch24Regular />
              <Caption1><strong>AI Search</strong></Caption1>
            </div>
            <div className="arch-flow-node datasource">
              <ChatMultiple24Regular />
              <Caption1><strong>Cosmos DB</strong></Caption1>
            </div>
          </div>
        </div>
      </div>

      {/* ── Demo Value Propositions ── */}
      <div className="arch-section">
        <div className="arch-section-header">
          <LightbulbFilament24Regular />
          <Title3>Why This Matters</Title3>
        </div>
        <div className="arch-grid">
          <div className="arch-card arch-value-card">
            <div className="arch-card-header">
              <span className="arch-value-number">1</span>
              <Body1 style={{ fontWeight: 600 }}>Intelligent Data Interaction</Body1>
            </div>
            <Body2>
              Conversational agents understand your organization&rsquo;s unique
              data and transform natural-language questions into automated
              queries — no SQL expertise required. Clinicians ask questions;
              the agent delivers answers grounded in real data.
            </Body2>
          </div>

          <div className="arch-card arch-value-card">
            <div className="arch-card-header">
              <span className="arch-value-number">2</span>
              <Body1 style={{ fontWeight: 600 }}>Accelerated Insights &amp; Productivity</Body1>
            </div>
            <Body2>
              Access rapid insights with intelligent data preparation, seamless
              integration, and AI-guided exploration. Analyze admission trends,
              order patterns, and service-line performance in seconds instead
              of hours.
            </Body2>
          </div>

          <div className="arch-card arch-value-card">
            <div className="arch-card-header">
              <span className="arch-value-number">3</span>
              <Body1 style={{ fontWeight: 600 }}>Governed, Scalable &amp; Trusted Data</Body1>
            </div>
            <Body2>
              Built on Microsoft Fabric&rsquo;s unified governance layer —
              ensuring data quality, lineage, and compliance. Self-service
              access to high-quality data in a single platform reduces cost
              and risk while scaling securely across departments.
            </Body2>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", padding: "1rem 0 2rem" }}>
        <Caption1 style={{ color: "#a0a0a0" }}>
          Built with the Agentic Applications for Unified Data Foundation
          Solution Accelerator
        </Caption1>
      </div>
    </div>
  );
};

export default Architecture;
