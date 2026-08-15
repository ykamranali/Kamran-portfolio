"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import CircuitGrid from "@/components/circuit-grid";
import InteractiveCard from "@/components/interactive-card";
import CyberLabel from "@/components/cyber-label";

const stats = [
  { value: 12, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "+", label: "Projects" },
  { value: 5000, suffix: "+", label: "Automation Hours Saved" },
  { value: 10, suffix: "M+", label: "AI Tokens Processed" },
];

export default function StatsSection() {
  return (
    <section className="relative w-full py-32 flex justify-center items-center pointer-events-none z-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative z-20 w-full max-w-6xl px-6 pointer-events-auto"
      >
        <div className="text-center mb-16">
          <CyberLabel index="03" label="Telemetry.log" />
          <h2 className="text-5xl md:text-7xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-indigo-400 dark:from-white dark:to-cyan-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.3)] dark:drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]">
            Impact Metrics
          </h2>
          <p className="text-xl text-slate-600 dark:text-gray-300">Real numbers from systems running in production.</p>
        </div>

        <CircuitGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <InteractiveCard
              key={idx}
              delay={idx * 0.15}
              className="relative z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-200 dark:border-slate-700 rounded-3xl p-10 hover:border-pink-500/50 dark:hover:border-cyan-500/50 transition-colors text-center shadow-2xl dark:shadow-[0_0_30px_rgba(0,255,255,0.1)] overflow-hidden"
            >
              <span className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400/60 rounded-tl-md pointer-events-none" />
              <span className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-purple-400/60 rounded-br-md pointer-events-none" />

              <div className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-pink-500 to-indigo-500 dark:from-white dark:to-cyan-500 mb-4 drop-shadow-[0_0_10px_rgba(236,72,153,0.3)] dark:drop-shadow-[0_0_10px_rgba(0,255,255,0.3)]">
                <CountUp end={stat.value} duration={2.5} separator="," enableScrollSpy scrollSpyOnce />
                {stat.suffix}
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-cyan-400 font-mono uppercase tracking-widest">{stat.label}</h3>
            </InteractiveCard>
          ))}
        </CircuitGrid>
      </motion.div>
    </section>
  );
}
