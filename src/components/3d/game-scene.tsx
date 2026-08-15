"use client";

import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { Suspense } from "react";
import Vehicle from "./vehicle";

export default function GameScene() {
  return (
    <div className="w-full h-screen bg-[#050505]">
      <Canvas shadows camera={{ position: [0, 5, 15], fov: 50 }}>
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow />
        
        <Suspense fallback={null}>
          <Physics gravity={[0, -9.81, 0]}>
            {/* Ground */}
            <RigidBody type="fixed" friction={2}>
              <mesh receiveShadow position={[0, -0.5, 0]}>
                <boxGeometry args={[200, 1, 200]} />
                <meshStandardMaterial color="#111111" />
              </mesh>
            </RigidBody>

            {/* Obstacles */}
            {Array.from({ length: 50 }).map((_, i) => (
              <RigidBody key={i} colliders="cuboid" position={[(Math.random() - 0.5) * 40, 5, (Math.random() - 0.5) * 40]}>
                <mesh castShadow receiveShadow>
                  <boxGeometry args={[1, 1, 1]} />
                  <meshStandardMaterial color="#00E5FF" />
                </mesh>
              </RigidBody>
            ))}

            {/* Vehicle */}
            <Vehicle />
          </Physics>
        </Suspense>
      </Canvas>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none text-center">
        <p className="text-[#00E5FF] font-mono text-xl mb-2 drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]">Use WASD or Arrows to Drive</p>
      </div>
    </div>
  );
}
