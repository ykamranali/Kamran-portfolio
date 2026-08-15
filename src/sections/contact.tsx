"use client";

import { motion } from "framer-motion";
import { FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import CyberLabel from "@/components/cyber-label";

export default function ContactSection() {
  return (
    <section className="relative w-full py-32 flex justify-center items-center pointer-events-none z-20">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl px-6 pointer-events-auto"
      >
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-200 dark:border-slate-700 rounded-3xl p-10 md:p-16 text-center shadow-2xl dark:shadow-[0_0_50px_rgba(0,229,255,0.1)] relative overflow-hidden">
          
          {/* Decorative background glow */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/20 dark:bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/20 dark:bg-purple-500/20 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative flex justify-center">
            <CyberLabel index="05" label="Secure_Channel.open" />
          </div>
          <h2 className="relative text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-400 dark:from-white dark:to-cyan-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.3)] dark:drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]">
            Get In Touch
          </h2>
          
          <p className="relative text-xl text-slate-600 dark:text-gray-300 max-w-2xl mx-auto mb-12 font-medium">
            Reach out to Omni Digital Solutions to start building the intelligent systems of tomorrow.
          </p>

          <div className="relative flex flex-col md:flex-row gap-6 justify-center items-center mb-12">
            <a 
              href="https://www.linkedin.com/in/kamran-ali-gul-saeed-4891a7b4/" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-3 w-full md:w-auto px-10 py-5 bg-[#00E5FF] text-black font-black text-lg rounded-full hover:bg-white hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,229,255,0.4)] whitespace-nowrap"
            >
              <FaLinkedin className="text-2xl" /> Connect on LinkedIn
            </a>
            
            <a 
              href="mailto:kamran.a@ramtechuae.com" 
              className="flex items-center justify-center gap-3 w-full md:w-auto px-10 py-5 border-2 border-[#8A2EFF] text-slate-900 dark:text-white font-black text-lg rounded-full hover:bg-[#8A2EFF]/10 hover:scale-105 transition-all shadow-[0_0_30px_rgba(138,46,255,0.2)] whitespace-nowrap"
            >
              <FaEnvelope className="text-2xl text-[#8A2EFF]" /> kamran.a@ramtechuae.com
            </a>
          </div>

          <div className="relative flex flex-col sm:flex-row gap-8 justify-center items-center text-slate-500 dark:text-gray-400 font-medium font-mono text-lg">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-pink-500 dark:text-cyan-400 text-xl" />
              <span>Abu Baker Al Siddiq St, Al Ain - Abu Dhabi</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-pink-500 dark:text-cyan-400 text-xl" />
              <span>+971564504650</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
