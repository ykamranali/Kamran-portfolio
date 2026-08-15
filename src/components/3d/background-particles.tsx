"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "next-themes";

export default function BackgroundParticles({ isDark }: { isDark: boolean }) {
  const count = 400; // Much cleaner, less dense
  const mesh = useRef<THREE.InstancedMesh>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 20 - 5;
      const speed = 0.01 + Math.random() * 0.02; // Slower, elegant floating
      temp.push({ x, y, z, speed, offset: Math.random() * 100 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      // Elegant upward float
      particle.y += particle.speed;
      
      if (particle.y > 20) {
        particle.y = -20;
      }

      dummy.position.set(particle.x, particle.y, particle.z);
      
      // Gentle rotation
      dummy.rotation.x = state.clock.elapsedTime * 0.2 + particle.offset;
      dummy.rotation.y = state.clock.elapsedTime * 0.1 + particle.offset;
      
      // Clean, small digital dust particles
      const scale = 0.03 + Math.sin(state.clock.elapsedTime * 2.0 + particle.offset) * 0.01;
      dummy.scale.set(scale, scale, scale);
      
      dummy.updateMatrix();
      if (mesh.current) {
        mesh.current.setMatrixAt(i, dummy.matrix);
      }
    });
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  const color = isDark ? "#00ffff" : "#ec4899"; // Cyan / Pink to match the theme

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} blending={THREE.AdditiveBlending} />
    </instancedMesh>
  );
}
