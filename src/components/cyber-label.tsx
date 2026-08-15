"use client";

import { motion } from "framer-motion";

/**
 * Small HUD-style "system readout" tag used above section headings across
 * the site — reinforces the cyber security / terminal aesthetic with a
 * consistent visual language: [ INDEX ] LABEL, blinking status dot.
 */
export default function CyberLabel({ index, label }: { index: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-2.5 mb-5 px-4 py-1.5 rounded-full border border-cyan-500/30 dark:border-cyan-400/30 bg-cyan-500/5 dark:bg-cyan-400/5 backdrop-blur-sm"
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400 shadow-[0_0_6px_#00E5FF]" />
      </span>
      <span className="text-[11px] md:text-xs font-mono tracking-[0.25em] text-cyan-600 dark:text-cyan-400 uppercase">
        {`[ ${index} ] ${label}`}
      </span>
    </motion.div>
  );
}
