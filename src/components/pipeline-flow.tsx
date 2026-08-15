"use client";

import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";

/**
 * Renders a sequential "data flow" diagram — a chain of labeled nodes
 * connected by glowing arrows. Used inside the architecture modal to show
 * how a request moves through a system, PCB-trace style.
 */
export default function PipelineFlow({ stages }: { stages: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-y-4">
      {stages.map((stage, i) => (
        <div key={stage} className="flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="relative px-4 py-2.5 rounded-xl border border-cyan-500/30 bg-cyan-500/5 text-xs md:text-sm font-mono text-cyan-200 whitespace-nowrap shadow-[0_0_15px_rgba(0,229,255,0.08)]"
          >
            <span className="absolute -top-1.5 -left-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#00E5FF] animate-pulse" />
            {stage}
          </motion.div>
          {i < stages.length - 1 && (
            <FaChevronRight className="mx-2 text-purple-400/60 animate-pulse shrink-0" size={12} aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );
}
