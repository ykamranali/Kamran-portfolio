"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const terminalLines = [
  "Initializing Omni AI...",
  "Loading Neural Network...",
  "Connecting Intelligence...",
  "Loading Modules...",
];

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [exploded, setExploded] = useState(false);

  useEffect(() => {
    let currentLine = 0;
    
    // Add lines one by one
    const lineInterval = setInterval(() => {
      if (currentLine < terminalLines.length) {
        setLines((prev) => [...prev, terminalLines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(lineInterval);
        
        // Start progress bar
        let p = 0;
        const progressInterval = setInterval(() => {
          p += Math.floor(Math.random() * 15) + 5; // Jump randomly
          if (p >= 100) {
            p = 100;
            clearInterval(progressInterval);
            
            // Trigger explosion after a short pause at 100%
            setTimeout(() => {
              setExploded(true);
              setTimeout(() => {
                onComplete();
              }, 1000); // Wait for explosion animation to finish
            }, 400);
          }
          setProgress(p);
        }, 150);
      }
    }, 400);

    return () => {
      clearInterval(lineInterval);
    };
  }, [onComplete]);

  // Generate explosion particles
  const particles = Array.from({ length: 80 }).map((_, i) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 300;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    const size = Math.random() * 6 + 2;
    // Neon colors: Electric Blue, Purple, White, Neon Green
    const colors = ["#00E5FF", "#8A2EFF", "#FFFFFF", "#00FF00"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    return { x, y, size, color, delay: Math.random() * 0.1 };
  });

  const blockCount = Math.floor((progress / 100) * 20);
  const blocks = "█".repeat(blockCount) + "░".repeat(20 - blockCount);

  return (
    <AnimatePresence>
      {!exploded ? (
        <motion.div 
          key="preloader"
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] font-mono text-sm md:text-base text-[#00E5FF] selection:bg-[#8A2EFF]"
        >
          <div className="w-full max-w-md px-6 text-left space-y-2">
            {lines.map((line, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[#00E5FF]/80"
              >
                {line}
              </motion.div>
            ))}
            
            {lines.length === terminalLines.length && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pt-4 text-[#FFFFFF]"
              >
                {blocks} {progress}%
              </motion.div>
            )}
          </div>
        </motion.div>
      ) : (
        <motion.div 
          key="explosion"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[100] bg-[#050505] pointer-events-none"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {particles.map((p, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                animate={{ 
                  x: p.x, 
                  y: p.y, 
                  scale: 0, 
                  opacity: 0 
                }}
                transition={{ 
                  duration: 0.8 + Math.random() * 0.4, 
                  ease: "easeOut",
                  delay: p.delay
                }}
                className="absolute rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  boxShadow: `0 0 ${p.size * 2}px ${p.color}`
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
