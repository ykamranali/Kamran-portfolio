"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uProgress;
uniform float uTime;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vec4 color = texture2D(uTexture, vUv);
  
  // Holographic scanline effect
  float scanline = sin(vUv.y * 100.0 + uTime * 2.0) * 0.04;
  
  // Dissolve effect based on scroll progress
  float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
  if (noise < uProgress) discard;
  
  // Glowing edges
  vec3 glow = vec3(0.0, 1.0, 1.0) * (0.5 + 0.5 * sin(uTime));
  
  gl_FragColor = vec4(color.rgb + scanline + glow * uProgress * 0.5, color.a * (1.0 - uProgress));
}
`;

const vertexShader = `
uniform float uProgress;
uniform float uTime;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  
  vec3 pos = position;
  
  // Distortion based on scroll progress
  pos.x += sin(pos.y * 10.0 + uTime) * uProgress * 0.5;
  pos.z += cos(pos.x * 10.0 + uTime) * uProgress * 0.5;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

export default function HolographicBust() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture("/image.jpeg");
  const { size, viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uProgress: { value: 0 },
      uTime: { value: 0 },
    }),
    [texture]
  );

  useEffect(() => {
    // Setup ScrollTrigger to control uProgress
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "+=1000",
        scrub: true,
        onUpdate: (self) => {
          if (uniforms.uProgress) {
            uniforms.uProgress.value = self.progress;
          }
        },
      });
    });
    return () => ctx.revert();
  }, [uniforms]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (meshRef.current) {
      // Subtle rotation and breathing
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 + (state.pointer.x * 0.5);
      meshRef.current.rotation.x = (state.pointer.y * 0.2);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      {/* 2.5D Plane that scales with viewport to show image */}
      <planeGeometry args={[4, 5, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
