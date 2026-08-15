"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaServer, FaRobot, FaStethoscope, FaShieldAlt, FaCogs, FaBrain, FaArrowRight, FaTv } from "react-icons/fa";
import CircuitGrid from "@/components/circuit-grid";
import InteractiveCard from "@/components/interactive-card";
import CyberLabel from "@/components/cyber-label";
import ArchitectureModal, { type ProjectArchitecture } from "@/components/architecture-modal";

const projects: ProjectArchitecture[] = [
  {
    title: "Omni Signage",
    subtitle: "3D Digital Signage CMS",
    overview:
      "A browser-native 3D content engine that turns any screen into a dynamic display node. Studio-authored scenes render in real time over WebGL and sync across every connected display through an edge network, with zero native app installs required.",
    icon: <FaTv />,
    stack: ["Next.js", "Three.js / WebGL", "Vercel Edge", "Supabase"],
    pipeline: ["Content Studio", "WebGL Render Engine", "Edge CDN", "Display Client", "Live Sync"],
    link: "https://web-iota-six-94wk94cj1a.vercel.app/",
  },
  {
    title: "Omni AI",
    subtitle: "Autonomous Intelligence Core",
    overview:
      "The central reasoning layer behind every Omni Digital Solutions product. Incoming requests are embedded, retrieved against a long-term vector memory, reasoned over by an orchestration layer, and routed to the correct autonomous module — all with sub-second latency.",
    icon: <FaBrain />,
    stack: ["Python", "FastAPI", "Vector DB", "Redis"],
    pipeline: ["Request Ingest", "Embedding Engine", "Vector Memory", "Reasoning Core", "Module Router"],
  },
  {
    title: "Enterprise AI Platform",
    subtitle: "Corporate LLM Infrastructure",
    overview:
      "A multi-tenant LLM platform built for corporate data reasoning at scale. Structured and unstructured data is ingested, indexed, and served through a retrieval-augmented pipeline so enterprise teams can query proprietary knowledge securely, without exposing raw data to third parties.",
    icon: <FaServer />,
    stack: ["Kubernetes", "LangChain", "PostgreSQL", "Azure OpenAI"],
    pipeline: ["Data Lake", "ETL Pipeline", "RAG Engine", "LLM Gateway", "Enterprise API"],
  },
  {
    title: "Telegram AI Assistant",
    subtitle: "Conversational Agent Framework",
    overview:
      "A production conversational agent deployed directly inside Telegram. Every message is parsed for intent, enriched with conversation memory, and answered by an LLM engine wired into live business APIs — handling real customer interactions around the clock.",
    icon: <FaRobot />,
    stack: ["Node.js", "Telegram Bot API", "OpenAI API", "Webhooks"],
    pipeline: ["Telegram Webhook", "Intent Parser", "LLM Engine", "Context Memory", "Response Dispatch"],
  },
  {
    title: "Healthcare Infrastructure",
    subtitle: "HIPAA-Compliant Secure Network",
    overview:
      "Network infrastructure engineered for clinics and hospitals handling protected health data. Every endpoint sits behind a zero-trust gateway with encrypted transport and a full compliance audit trail, satisfying HIPAA-grade data handling requirements.",
    icon: <FaStethoscope />,
    stack: ["Zero Trust", "IPSec VPN", "Encrypted Storage", "SIEM"],
    pipeline: ["Clinical Endpoint", "Zero-Trust Gateway", "Encrypted Data Bus", "Compliance Log"],
  },
  {
    title: "Cyber Security",
    subtitle: "Zero-Trust Defense Architecture",
    overview:
      "A layered zero-trust defense architecture combining perimeter filtering, intrusion detection, and real-time correlation. Every request is authenticated and inspected before it touches internal systems, and anomalies trigger automated containment within seconds.",
    icon: <FaShieldAlt />,
    stack: ["Fortinet", "SIEM", "MFA", "Threat Intel Feeds"],
    pipeline: ["Perimeter Firewall", "IDS / IPS", "Zero-Trust Gateway", "SIEM Correlation", "Auto Response"],
  },
  {
    title: "Automation",
    subtitle: "Robotic Process Automation",
    overview:
      "Robotic process automation that replaces repetitive manual workflows with orchestrated bots. Trigger events fire task bots that operate across internal tools and third-party APIs, with every action logged for audit and rollback.",
    icon: <FaCogs />,
    stack: ["Python", "RPA Bots", "Cron Orchestration", "REST Connectors"],
    pipeline: ["Trigger Event", "Bot Orchestrator", "Task Execution", "API Connectors", "Audit Log"],
  },
];

export default function ProjectsSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section className="relative w-full py-32 flex items-center justify-center pointer-events-none z-20">
      <div className="w-full max-w-6xl mx-auto px-6 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <CyberLabel index="02" label="System_Architecture.map" />
          <h2 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-400 dark:from-white dark:to-cyan-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.3)] dark:drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]">
            System Architecture
          </h2>
          <p className="text-xl text-slate-600 dark:text-gray-300">High-performance networks and AI modules I've engineered.</p>
          <p className="mt-3 text-xs font-mono uppercase tracking-[0.3em] text-cyan-500/70 dark:text-cyan-400/70">
            // Network topology &mdash; all nodes interconnected
          </p>
        </motion.div>

        <CircuitGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <InteractiveCard
              key={idx}
              delay={idx * 0.1}
              onClick={() => setActiveIdx(idx)}
              className="relative z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-200 dark:border-slate-700 rounded-3xl p-8 hover:border-pink-500/50 dark:hover:border-cyan-500/50 hover:shadow-2xl dark:hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] transition-all cursor-pointer group shadow-xl overflow-hidden"
            >
              {/* HUD corner brackets */}
              <span className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400/60 rounded-tl-md pointer-events-none" />
              <span className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-purple-400/60 rounded-br-md pointer-events-none" />
              {/* Node id badge */}
              <span className="absolute top-4 right-5 text-[10px] font-mono tracking-widest text-cyan-500/60 dark:text-cyan-400/50">
                NODE_{String(idx + 1).padStart(2, "0")}
              </span>

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/20 to-orange-500/20 dark:from-cyan-500/20 dark:to-purple-500/20 border border-pink-300 dark:border-white/10 flex items-center justify-center text-3xl text-pink-600 dark:text-cyan-400 mb-6 group-hover:scale-110 transition-transform shadow-inner">
                {project.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{project.title}</h3>
              <p className="text-slate-700 dark:text-gray-300 mb-6 font-medium">{project.overview.split(". ")[0]}.</p>

              <div className="flex items-center text-pink-600 dark:text-cyan-400 font-bold group-hover:text-pink-500 dark:group-hover:text-cyan-300 transition-colors">
                View Architecture <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </div>
            </InteractiveCard>
          ))}
        </CircuitGrid>
      </div>

      <ArchitectureModal
        project={activeIdx !== null ? projects[activeIdx] : null}
        nodeId={activeIdx !== null ? `NODE_${String(activeIdx + 1).padStart(2, "0")}` : ""}
        onClose={() => setActiveIdx(null)}
      />
    </section>
  );
}
