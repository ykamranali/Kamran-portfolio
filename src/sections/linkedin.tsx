"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaLinkedin, FaDownload } from "react-icons/fa";
import Image from "next/image";

export default function LinkedInSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setVisible(progress > 0.7 && progress < 0.85);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="absolute top-[750vh] left-0 w-full min-h-screen flex justify-center items-center py-20 pointer-events-none z-20">
      <motion.div 
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 50 }}
        transition={{ duration: 0.8 }}
        className="z-20 w-full max-w-4xl px-6 pointer-events-auto"
      >
        <div className="bg-white/90 dark:bg-gradient-to-br dark:from-slate-900/90 dark:to-black/90 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 md:p-12 backdrop-blur-2xl shadow-2xl dark:shadow-[0_0_50px_rgba(59,130,246,0.1)]">
          <div className="flex flex-col md:flex-row items-center gap-8 border-b border-slate-200 dark:border-white/10 pb-8 mb-8 text-center md:text-left">
            <div className="relative w-32 h-32 rounded-full border-4 border-blue-500/50 shadow-lg dark:shadow-[0_0_30px_rgba(59,130,246,0.5)] overflow-hidden bg-slate-100 dark:bg-black flex items-center justify-center shrink-0">
              <Image 
                src="/image.png" 
                alt="Kamran Ali" 
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">Kamran Ali</h2>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">ICT Engineer • Cyber Security Consultant</p>
              <p className="text-slate-500 dark:text-gray-400 text-sm">AI Systems Architect @ Omni Digital Solutions</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { label: "Connections", value: "500+" },
              { label: "Recommendations", value: "15" },
              { label: "Certifications", value: "8" },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-50 dark:bg-white/5 rounded-xl p-4 text-center border border-slate-100 dark:border-transparent">
                <div className="text-2xl font-bold text-slate-800 dark:text-white">{stat.value}</div>
                <div className="text-slate-500 dark:text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="https://www.linkedin.com/in/kamran-ali-gul-saeed-4891a7b4/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-[#0A66C2] text-white hover:bg-[#004182] hover:shadow-[0_0_20px_rgba(10,102,194,0.6)] transition-all flex items-center gap-3 font-bold"
            >
              <FaLinkedin size={24} /> Connect with Me
            </a>
            <a 
              href="/resume.pdf" 
              download="Kamran_Ali_Resume.pdf"
              className="px-8 py-4 rounded-full bg-slate-200 dark:bg-white/10 border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-white/20 transition-all flex items-center gap-3"
            >
              <FaDownload size={20} /> Download CV
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
