"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaCode, FaRobot, FaShieldAlt } from "react-icons/fa";

export default function BentoPortfolio() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 lg:p-12 font-sans selection:bg-[#00E5FF]/30">
      
      {/* Background ambient glow */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#00E5FF]/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-[#8A2EFF]/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 md:grid-rows-[auto_auto_auto] gap-4 md:gap-6"
      >
        
        {/* Header / Intro Card (Spans 2 columns) */}
        <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-1 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md p-8 md:p-10 flex flex-col justify-center relative overflow-hidden group hover:border-[#00E5FF]/30 transition-colors duration-500">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
              I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#8A2EFF]">Kamran Ali</span>
            </h1>
            <p className="text-xl text-gray-400 font-medium max-w-md">
              AI Systems Architect & Cyber Security Consultant shaping the future of enterprise intelligence.
            </p>
          </div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#00E5FF]/20 rounded-full blur-[80px] group-hover:bg-[#00E5FF]/30 transition-colors duration-700" />
        </motion.div>

        {/* AI Lifestyle Photo 1 (Laptop) */}
        <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-2 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden min-h-[300px] group">
          <Image 
            src="/laptop_working.png" 
            alt="Kamran working on laptop" 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="inline-block px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs font-semibold text-[#00E5FF] mb-2">
              BUILDING SCALABLE AI
            </div>
            <h3 className="text-2xl font-bold">Architecting the Omni AI Nexus</h3>
          </div>
        </motion.div>

        {/* Core Expertise Card */}
        <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-2 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md p-8 flex flex-col hover:bg-white/10 transition-colors duration-500">
          <h3 className="text-xl font-bold mb-6 text-gray-200">Core Expertise</h3>
          <div className="space-y-6 flex-1">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF] flex items-center justify-center shrink-0">
                <FaRobot size={20} />
              </div>
              <div>
                <h4 className="font-semibold mb-1">AI & Machine Learning</h4>
                <p className="text-sm text-gray-400">LLMs, Computer Vision, Predictive Models</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#8A2EFF]/10 text-[#8A2EFF] flex items-center justify-center shrink-0">
                <FaShieldAlt size={20} />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Cyber Security</h4>
                <p className="text-sm text-gray-400">Threat Intel, Zero Trust, Penetration Testing</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center shrink-0">
                <FaCode size={20} />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Systems Engineering</h4>
                <p className="text-sm text-gray-400">Cloud Infra, Microservices, Python/TS</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social Links Card */}
        <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md p-6 flex flex-col justify-center items-center hover:border-[#8A2EFF]/50 transition-colors duration-500 group">
          <div className="flex gap-4">
            <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#00E5FF] hover:text-black transition-all duration-300">
              <FaGithub size={24} />
            </a>
            <a href="https://www.linkedin.com/in/kamran-ali-gul-saeed-4891a7b4/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-all duration-300">
              <FaLinkedin size={24} />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
              <FaTwitter size={24} />
            </a>
          </div>
        </motion.div>

        {/* AI Lifestyle Photo 2 (Data Analysis) */}
        <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-1 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden min-h-[250px] group">
          <Image 
            src="/data_analysis.png" 
            alt="Kamran analyzing data" 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
          <div className="absolute top-0 left-0 w-full h-full p-8 flex flex-col justify-center">
             <div className="inline-block px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs font-semibold text-[#8A2EFF] mb-2 self-start">
              DATA-DRIVEN DECISIONS
            </div>
            <h3 className="text-3xl font-bold max-w-sm">Translating complex intelligence into actionable strategy.</h3>
          </div>
        </motion.div>

        {/* AI Lifestyle Photo 3 (Robotics) */}
        <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden min-h-[250px] group">
          <Image 
            src="/robotics_lab.png" 
            alt="Kamran in robotics lab" 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <h3 className="text-xl font-bold">Hardware & Automation</h3>
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1 rounded-3xl bg-gradient-to-br from-[#00E5FF] to-[#8A2EFF] p-8 flex flex-col justify-between relative overflow-hidden group cursor-pointer hover:shadow-[0_0_40px_rgba(0,229,255,0.4)] transition-shadow duration-500">
          <h3 className="text-2xl font-bold text-black mb-4">Let's build the future together.</h3>
          <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <FaEnvelope size={20} />
          </div>
        </motion.div>

      </motion.div>
      
      {/* Footer / Extra Content area */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1 }}
        className="max-w-7xl mx-auto mt-20 text-center text-gray-500 pb-10"
      >
        <p>© 2026 Kamran Ali. Omni Digital Solutions.</p>
      </motion.div>

    </div>
  );
}
