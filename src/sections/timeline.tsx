"use client";

import { motion } from "framer-motion";
import { FaBolt, FaDesktop, FaNetworkWired, FaServer, FaShieldAlt, FaBrain, FaRocket } from "react-icons/fa";
import CyberLabel from "@/components/cyber-label";

const timelineEvents = [
  { year: "2014", title: "Electrician", description: "Mastered hardware, electrical systems, and complex physical troubleshooting.", icon: <FaBolt /> },
  { year: "2016", title: "IT Support", description: "Transitioned to digital systems. Resolved critical user issues.", icon: <FaDesktop /> },
  { year: "2018", title: "Network Engineer", description: "Architected scalable network infrastructure and routing protocols.", icon: <FaNetworkWired /> },
  { year: "2020", title: "ICT Engineer", description: "Managed enterprise-grade information and communication technologies.", icon: <FaServer /> },
  { year: "2022", title: "Cyber Security", description: "Deep dive into security protocols, zero trust, and threat mitigation.", icon: <FaShieldAlt /> },
  { year: "2024", title: "AI Builder", description: "Synthesized hardware and software expertise into Artificial Intelligence.", icon: <FaBrain /> },
  { year: "2025", title: "Founder Omni AI", description: "Building autonomous agents and intelligent networks for the future.", icon: <FaRocket /> },
];

export default function TimelineSection() {
  return (
    <section className="relative w-full py-32 flex justify-center items-center pointer-events-none">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="z-20 w-full max-w-4xl px-6 pointer-events-auto"
      >
        <div className="text-center mb-20">
          <CyberLabel index="04" label="Career.log" />
          <h2 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-cyan-500 dark:from-white dark:to-cyan-400">
            Professional Evolution
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-cyan-500/50 dark:via-cyan-500/30 to-transparent -translate-x-1/2" />

          {timelineEvents.map((event, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center justify-between mb-16 w-full ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'} flex-row`}
              >
                {/* Empty space for desktop alignment */}
                <div className="hidden md:block w-[45%]" />

                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-white dark:bg-black border-4 border-pink-500 dark:border-cyan-400 rounded-full -translate-x-1/2 shadow-[0_0_15px_rgba(236,72,153,0.8)] dark:shadow-[0_0_15px_rgba(0,255,255,0.8)] z-10" />

                {/* Content Card */}
                <div className="w-[85%] md:w-[45%] ml-12 md:ml-0">
                  <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-200 dark:border-slate-700 rounded-2xl p-6 md:p-8 hover:border-pink-500/50 dark:hover:border-cyan-500/50 transition-colors shadow-2xl dark:shadow-[0_0_30px_rgba(0,255,255,0.1)]">
                    <div className="flex items-center gap-4 mb-4 text-pink-600 dark:text-cyan-400">
                      <div className="text-2xl">{event.icon}</div>
                      <span className="text-xl font-bold font-mono">{event.year}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{event.title}</h3>
                    <p className="text-slate-700 dark:text-gray-300 leading-relaxed font-medium">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
