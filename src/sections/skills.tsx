"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";
import CyberLabel from "@/components/cyber-label";

const skillsList = [
  "Linux", "Docker", "Python", "Supabase", "Next.js",
  "React", "TypeScript", "TailwindCSS", "PostgreSQL",
  "Node.js", "Git", "Bash", "Networking", "Security",
  "Fortinet", "Cisco", "Mikrotik", "Ubuntu", "Windows Server",
  "Active Directory", "Azure", "OpenAI", "LLMs", "Automation",
  "Cyber Security", "Virtualization", "Cloud", "Routing"
];

function Word({ children, position, isDark }: { children: string, position: THREE.Vector3, isDark: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();

  useFrame(() => {
    if (ref.current) {
      ref.current.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <Text
      ref={ref}
      position={position}
      color={hovered ? (isDark ? "#a855f7" : "#ec4899") : (isDark ? "#00ffff" : "#334155")} // Cyan->Purple in dark, Slate->Pink in light
      fontSize={hovered ? 1.5 : 1}
      font="https://fonts.gstatic.com/s/firamono/v14/N0bX2SlFPv1we1B2gUKx0_A.woff"
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      material-toneMapped={false}
    >
      {children}
    </Text>
  );
}

function Cloud({ radius = 10, isDark = true }: { radius?: number, isDark?: boolean }) {
  const count = skillsList.length;
  const words = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      temp.push([
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      ]);
    }
    return temp;
  }, [count, radius]);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {words.map((pos, i) => (
        <Word key={i} position={new THREE.Vector3(...pos)} isDark={isDark}>
          {skillsList[i]}
        </Word>
      ))}
    </group>
  );
}

export default function SkillsSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || !theme; // Default to dark if undefined

  return (
    <section id="skills" className="relative w-full h-full py-32 overflow-hidden flex flex-col justify-center pointer-events-none z-20">
      <div className="w-full max-w-6xl mx-auto px-6 pointer-events-auto">
        <div className="absolute inset-0 z-0 w-full h-full">
          <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
            <ambientLight intensity={isDark ? 0.5 : 1} />
            <pointLight position={[10, 10, 10]} intensity={isDark ? 1 : 2} />
            <Suspense fallback={null}>
              <Cloud isDark={isDark} />
            </Suspense>
          </Canvas>
        </div>

        {/* Centered Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            {/* Added Image from LinkedIn */}
            <div className="relative w-40 h-40 rounded-full border-4 border-pink-500/50 dark:border-cyan-500/50 shadow-[0_0_30px_rgba(236,72,153,0.5)] dark:shadow-[0_0_30px_rgba(0,255,255,0.5)] overflow-hidden bg-slate-100 dark:bg-black flex items-center justify-center mb-8 pointer-events-auto">
              <img 
                src="/image.png" 
                alt="Kamran Ali" 
                className="w-full h-full object-cover"
              />
            </div>

            <CyberLabel index="01" label="Core_Arsenal.sys" />

            <h2 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-indigo-500 dark:from-cyan-400 dark:to-purple-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.3)] dark:drop-shadow-[0_0_15px_rgba(0,255,255,0.3)] pointer-events-auto">
              Core Arsenal
            </h2>
            <p className="text-lg md:text-xl text-slate-800 dark:text-gray-200 max-w-2xl mb-10 leading-relaxed font-medium bg-white/40 dark:bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl pointer-events-auto">
              I deploy systems that merge deep neural networks with zero-trust cyber security frameworks. My technological stack is optimized for pure autonomous intelligence and bulletproof routing.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 pointer-events-auto">
              {["Architecting", "Routing", "Securing", "Automating", "Deploying"].map((tag, i) => (
                <span key={i} className="px-6 py-3 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-cyan-400 text-sm md:text-base font-mono tracking-widest backdrop-blur-md shadow-lg dark:shadow-[0_0_15px_rgba(0,255,255,0.2)] font-bold hover:scale-105 transition-transform cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
