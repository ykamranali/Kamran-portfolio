"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { Sphere } from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger);

export default function OmniBrain() {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  
  const nodeCount = 50;
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      // Position nodes on a sphere
      const x = 2 * Math.cos(theta) * Math.sin(phi);
      const y = 2 * Math.sin(theta) * Math.sin(phi);
      const z = 2 * Math.cos(phi);
      temp.push({ x, y, z });
    }
    return temp;
  }, []);

  useEffect(() => {
    // Initial state: hidden (scale 0)
    if (groupRef.current) {
      groupRef.current.scale.set(0, 0, 0);
    }

    const ctx = gsap.context(() => {
      // Appear when user scrolls down
      ScrollTrigger.create({
        trigger: "body",
        start: "500px top", // Appears after bust dissolves
        end: "+=1000",
        scrub: true,
        onUpdate: (self) => {
          if (groupRef.current) {
            const scale = self.progress;
            groupRef.current.scale.set(scale, scale, scale);
            groupRef.current.rotation.y = self.progress * Math.PI * 2;
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  useFrame((state) => {
    if (nodesRef.current) {
      nodes.forEach((node, i) => {
        dummy.position.set(node.x, node.y, node.z);
        // Pulse effect
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.2;
        dummy.scale.setScalar(scale);
        dummy.updateMatrix();
        nodesRef.current!.setMatrixAt(i, dummy.matrix);
      });
      nodesRef.current.instanceMatrix.needsUpdate = true;
    }
    
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.rotation.x += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central glowing brain core */}
      <Sphere args={[1.5, 32, 32]}>
        <meshBasicMaterial color="#00ffff" transparent opacity={0.1} wireframe />
      </Sphere>
      
      {/* Nodes */}
      <instancedMesh ref={nodesRef} args={[undefined, undefined, nodeCount]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#00ffff" emissiveIntensity={2} />
      </instancedMesh>
      
      {/* Edges could be drawn using Line/LineSegments, simplified here */}
    </group>
  );
}
