"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaExternalLinkAlt, FaEnvelope } from "react-icons/fa";
import PipelineFlow from "@/components/pipeline-flow";

export interface ProjectArchitecture {
  title: string;
  subtitle: string;
  overview: string;
  icon: ReactNode;
  stack: string[];
  pipeline: string[];
  link?: string;
}

export default function ArchitectureModal({
  project,
  nodeId,
  onClose,
}: {
  project: ProjectArchitecture | null;
  nodeId: string;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  // The 3D scroll layer moves via a CSS transform, which makes any
  // `position: fixed` descendant anchor to that transformed ancestor
  // instead of the real viewport. Portaling straight to <body> escapes
  // that so the modal actually centers over the whole screen.
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-cyan-500/30 bg-slate-950/95 shadow-[0_0_60px_rgba(0,229,255,0.15)] p-6 md:p-10"
          >
            {/* HUD corners */}
            <span className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-cyan-400/70 pointer-events-none" />
            <span className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-purple-400/70 pointer-events-none" />

            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-400/50 transition-colors"
            >
              <FaTimes />
            </button>

            <div className="text-[11px] font-mono tracking-[0.25em] text-cyan-400/80 uppercase mb-3">
              {`[ ${nodeId} ] Architecture_Blueprint`}
            </div>

            <div className="flex items-center gap-4 mb-6 pr-10">
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-2xl text-cyan-400">
                {project.icon}
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">{project.title}</h3>
                <p className="text-cyan-400/80 text-sm font-mono">{project.subtitle}</p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed mb-8">{project.overview}</p>

            <div className="mb-8">
              <h4 className="text-xs font-mono uppercase tracking-widest text-purple-400/80 mb-4">Data Flow</h4>
              <PipelineFlow stages={project.pipeline} />
            </div>

            <div className="mb-8">
              <h4 className="text-xs font-mono uppercase tracking-widest text-purple-400/80 mb-3">Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00E5FF] text-black font-bold text-sm hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                >
                  <FaExternalLinkAlt /> Visit Live Site
                </a>
              )}
              <a
                href="mailto:kamran.a@ramtechuae.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-white text-sm hover:bg-white/5 transition-colors"
              >
                <FaEnvelope /> Discuss This System
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
