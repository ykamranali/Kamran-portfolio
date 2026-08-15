"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaLinkedin, FaGithub, FaDownload, FaEnvelope } from "react-icons/fa";

export default function FinalSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when near the bottom of the 500vh container
      const threshold = document.documentElement.scrollHeight - window.innerHeight * 1.5;
      setVisible(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="absolute bottom-0 left-0 w-full h-screen flex flex-col justify-end items-center pb-32 pointer-events-none">
      <motion.div 
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 50 }}
        transition={{ duration: 0.8 }}
        className="z-10 flex flex-col items-center text-center pointer-events-auto"
      >
        <h2 className="text-3xl md:text-5xl font-light text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] max-w-2xl leading-tight">
          "Behind every intelligent system is a <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">human imagination</span>."
        </h2>
        
        <p className="mt-6 text-lg text-gray-400">Let's build the future together.</p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button className="px-8 py-4 rounded-full bg-cyan-500/20 border border-cyan-500/50 text-cyan-100 hover:bg-cyan-500/40 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all flex items-center gap-2 backdrop-blur-md">
            View Projects
          </button>
          <button className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all flex items-center gap-2 backdrop-blur-md">
            <FaDownload /> Resume
          </button>
          <button className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all flex items-center gap-2 backdrop-blur-md">
            <FaEnvelope /> Contact Me
          </button>
        </div>
        
        <div className="mt-8 flex gap-6">
          <a href="#" className="text-gray-400 hover:text-white hover:shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all">
            <FaLinkedin size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white hover:shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all">
            <FaGithub size={24} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
