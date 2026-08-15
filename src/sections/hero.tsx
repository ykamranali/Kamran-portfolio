"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="absolute top-0 left-0 w-full min-h-screen flex flex-col justify-center items-center pointer-events-none z-10 px-4">
      <div className="pointer-events-auto text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-br from-fuchsia-600 to-cyan-500 dark:from-cyan-400 dark:to-purple-600 drop-shadow-[0_0_15px_rgba(236,72,153,0.3)] dark:drop-shadow-[0_0_15px_rgba(0,255,255,0.3)] tracking-tight py-2">
            Kamran Ali
          </h1>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-2xl md:text-4xl font-bold text-slate-800 dark:text-gray-200 mb-4"
        >
          ICT Engineer <span className="text-pink-500 dark:text-cyan-500">|</span> Cyber Security Consultant <span className="text-pink-500 dark:text-cyan-500">|</span> AI Systems Architect
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Building the future of Autonomous Intelligence. Founder of Omni Digital Solutions.
        </motion.p>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => window.scrollTo({ top: window.innerHeight * 3, behavior: 'smooth' })}
            className="px-8 py-4 rounded-full bg-pink-500/10 dark:bg-cyan-500/20 border border-pink-500/40 dark:border-cyan-500/50 text-pink-700 dark:text-cyan-100 hover:bg-pink-500/20 dark:hover:bg-cyan-500/40 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] dark:hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all backdrop-blur-md font-bold"
          >
            Explore My Mind
          </button>
          <a 
            href="https://www.linkedin.com/in/kamran-ali-gul-saeed-4891a7b4/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full bg-slate-200/50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-300/50 dark:hover:bg-white/10 transition-all backdrop-blur-md font-medium"
          >
            LinkedIn
          </a>
          <a 
            href="/resume.pdf" 
            download="Kamran_Ali_Resume.pdf"
            className="px-8 py-4 rounded-full bg-slate-200/50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-300/50 dark:hover:bg-white/10 transition-all backdrop-blur-md font-medium"
          >
            Download Resume
          </a>
          <a 
            href="https://web-iota-six-94wk94cj1a.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full bg-pink-500/10 dark:bg-cyan-500/20 border border-pink-500/40 dark:border-cyan-500/50 text-pink-700 dark:text-cyan-100 hover:bg-pink-500/20 dark:hover:bg-cyan-500/40 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] dark:hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all backdrop-blur-md font-bold"
          >
            View Omni Signage
          </a>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <p className="text-xs text-cyan-400 font-mono tracking-widest uppercase animate-pulse">
            Scroll to initialize Omni AI...
          </p>
          <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-400 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
