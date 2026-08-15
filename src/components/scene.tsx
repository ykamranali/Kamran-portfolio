"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { Suspense } from "react";
import { useTheme } from "next-themes";
import BackgroundParticles from "@/components/3d/background-particles";
import CinematicStory from "@/components/3d/cinematic-story";

export default function Scene() {
  const { theme } = useTheme();
  const isDark = theme === "dark" || !theme; // Fallback to dark if undefined initially

  return (
    <div className="fixed inset-0 z-0 pointer-events-none transition-colors duration-500">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Ambient environment based on theme */}
          <color attach="background" args={[isDark ? "#000000" : "#f8fafc"]} />
          <ambientLight intensity={isDark ? 0.5 : 1.5} />
          <directionalLight position={[10, 10, 5]} intensity={isDark ? 1 : 2} />
          <fog attach="fog" args={[isDark ? "#000000" : "#f8fafc", 5, 15]} />

          <BackgroundParticles isDark={isDark} />
          <CinematicStory isDark={isDark} />

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
