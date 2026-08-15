import { useMemo, useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture, Html, Text } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// Clean dissolve shader for fading images in/out
const dissolveFragmentShader = `
uniform sampler2D uTexture;
uniform float uProgress;
uniform float uFadeType; // 0 = fade out (face), 1 = fade in (brain)
varying vec2 vUv;

float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }
float noise(vec2 x) {
    vec2 i = floor(x);
    vec2 f = fract(x);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
  vec4 color = texture2D(uTexture, vUv);
  
  if (vUv.y < 0.05) discard;
  if (color.a < 0.1) discard;
  
  float n = noise(vUv * 20.0);
  
  if (uFadeType == 0.0) {
    float dissolveOut = smoothstep(0.0, 0.5, uProgress);
    if (n < dissolveOut) {
      if (n > dissolveOut - 0.05) {
        gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0); 
        return;
      }
      discard;
    }
    
    float baseGlow = smoothstep(0.2, 0.05, vUv.y);
    vec3 neonColor1 = vec3(0.0, 1.0, 1.0); 
    vec3 neonColor2 = vec3(1.0, 0.0, 1.0); 
    vec3 mixedNeon = mix(neonColor1, neonColor2, sin(vUv.x * 10.0 + uProgress * 10.0) * 0.5 + 0.5);
    
    color.rgb = mix(color.rgb, mixedNeon, baseGlow * 0.85);
    color.rgb += mixedNeon * pow(baseGlow, 3.0) * 2.0;
    
    gl_FragColor = vec4(color.rgb, color.a);
  } else {
    float dissolveIn = smoothstep(0.5, 0.0, uProgress);
    if (n < dissolveIn) {
      if (n > dissolveIn - 0.05) {
        gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0); 
        return;
      }
      discard;
    }
    gl_FragColor = vec4(color.rgb, color.a);
  }
}
`;

const dissolveVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const orbitLabels = [
  { ring: 1, id: "nexus", label: "OmniAI Nexus", items: ["Core Intelligence", "Data Routing"] },
  { ring: 1, id: "agent", label: "Omni AI Agent", items: ["Autonomous Action", "Task Execution"] },
  { ring: 1, id: "crm", label: "Omni CRM", items: ["Customer Intelligence", "Automated Outreach"] },
  { ring: 1, id: "signage", label: "Omni Signage", items: ["Digital Display", "Content Scheduler"] },
  { ring: 1, id: "vision", label: "Omni Computer Vision", items: ["Image Analysis", "Object Detection"] },
  
  { ring: 2, id: "ml", label: "Omni Machine Learning", items: ["Predictive Models", "Deep Learning"] },
  { ring: 2, id: "automation", label: "Omni Automation", items: ["Workflow Triggers", "RPA"] },
  { ring: 2, id: "robotics", label: "Omni Robotics", items: ["Physical AI", "Motor Control"] },
  { ring: 2, id: "cyber", label: "Omni Cyber Security", items: ["Zero Trust", "Threat Detection"] },
  { ring: 2, id: "cloud", label: "Omni Cloud Computing", items: ["Distributed Infrastructure", "Serverless"] },
];

const codeSnippets = [
  "Python", "JavaScript", "HTML", "CSS", "SQL", "JSON", "C++", "Rust", "Go", "Java",
  "import tensorflow as tf", "const ai = new Agent();", "SELECT * FROM users", "01001011",
  "docker run -d omni-ai", "sudo systemctl start ai", "f(x) = σ(W*x + b)", "fetch('/api/v1/brain')",
  "{ \"status\": \"learning\" }", "fn main() { ignite(); }"
];

function CodeParticles({ progress }: { progress: number }) {
  const particlesRef = useRef<THREE.Group>(null);
  
  const particles = useMemo(() => {
    return Array.from({ length: 80 }).map(() => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 10 + Math.random() * 20; 
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      return {
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        position: new THREE.Vector3(x, y, z),
        speed: 1 + Math.random() * 3,
        scale: 0.1 + Math.random() * 0.4
      };
    });
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    
    // Normalized progress for the animation window (0.0 to 0.5)
    const p = gsap.utils.clamp(0, 1, progress / 0.5); 
    
    // Opacity fades in, stays, then explodes and fades out
    const opacity = p < 0.2 ? p * 5 : p < 0.8 ? 1 : Math.max(0, 1 - (p - 0.8) * 5);
    
    particlesRef.current.children.forEach((child, i) => {
      const data = particles[i];
      const mesh = child as any; 
      
      const collapseFactor = p > 0.8 ? Math.max(0, 1 - ((p - 0.8) * 5)) : 1; 
      const angle = state.clock.elapsedTime * data.speed * (1 + p * 5); 
      
      const x = data.position.x * Math.cos(angle) - data.position.z * Math.sin(angle);
      const z = data.position.x * Math.sin(angle) + data.position.z * Math.cos(angle);
      
      mesh.position.set(x * collapseFactor, data.position.y * collapseFactor, z * collapseFactor);
      mesh.lookAt(0,0,0);
      
      if (mesh.material) {
        mesh.material.transparent = true;
        mesh.material.opacity = opacity * 0.8;
        mesh.material.depthWrite = false;
        mesh.material.blending = THREE.AdditiveBlending;
      }
    });
    
    // The explosion blast at the end
    if (p > 0.9) {
       const explosion = (p - 0.9) * 10 * 8; 
       particlesRef.current.scale.setScalar(1 + explosion);
    } else {
       particlesRef.current.scale.setScalar(1);
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((p, i) => (
        <Text
          key={i}
          position={p.position}
          fontSize={p.scale}
          color="#00E5FF"
          anchorX="center"
          anchorY="middle"
        >
          {p.text}
        </Text>
      ))}
    </group>
  );
}

export default function CinematicStory({ isDark }: { isDark: boolean }) {
  const containerGroupRef = useRef<THREE.Group>(null);
  
  const faceMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const brainMaterialRef = useRef<THREE.ShaderMaterial>(null);
  
  const orbitGroupRef1 = useRef<THREE.Group>(null);
  const orbitGroupRef2 = useRef<THREE.Group>(null);
  
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [showOrbit, setShowOrbit] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const texture = useTexture("/image.png");
  const brainTex = useTexture("/brain.png");
  
  const { viewport } = useThree();
  
  const img = texture.image as HTMLImageElement;
  const imageAspect = img ? img.width / img.height : 1;
  const vHeight = viewport.height * 0.8;
  const vWidth = vHeight * imageAspect;

  const brainAspect = (brainTex.image as HTMLImageElement)?.width / (brainTex.image as HTMLImageElement)?.height || 1;
  const bHeight = vHeight * 1.2;
  const bWidth = bHeight * brainAspect;

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uProgress: { value: 0 },
      uFadeType: { value: 0.0 },
    }),
    [texture]
  );

  const brainUniforms = useMemo(
    () => ({
      uTexture: { value: brainTex },
      uProgress: { value: 0 },
      uFadeType: { value: 1.0 }, 
    }),
    [brainTex]
  );

  const brainRadius = Math.min(viewport.width, viewport.height) * 0.35;

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "#cinematic-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);
          
          if (uniforms.uProgress) uniforms.uProgress.value = p;
          if (brainUniforms.uProgress) brainUniforms.uProgress.value = p;
          
          setShowOrbit(p > 0.45 && p < 0.6);
          if (!(p > 0.45 && p < 0.6)) setActiveNode(null);
          
          if (containerGroupRef.current) {
            const spinProgress = gsap.utils.clamp(0, 1, p / 0.5);
            containerGroupRef.current.rotation.y = spinProgress * Math.PI * 2;
          }

          if (orbitGroupRef1.current) orbitGroupRef1.current.rotation.y = p * Math.PI * 1.5;
          if (orbitGroupRef2.current) orbitGroupRef2.current.rotation.y = -(p * Math.PI * 1.0);
        },
      });
    });
    return () => ctx.revert();
  }, [uniforms, brainUniforms]);

  useFrame((state) => {
    if (containerGroupRef.current) {
      containerGroupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
      containerGroupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05 - state.pointer.y * 0.1;
      containerGroupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.5) * 0.02;
      
      const targetRotationY = state.pointer.x * 0.1;
      containerGroupRef.current.rotation.y += (targetRotationY - (containerGroupRef.current.rotation.y % (Math.PI * 2))) * 0.1;
    }
    
    if (faceMaterialRef.current) faceMaterialRef.current.uniforms.uProgress.value = uniforms.uProgress.value;
    if (brainMaterialRef.current) brainMaterialRef.current.uniforms.uProgress.value = brainUniforms.uProgress.value;
  });

  const renderRing = (ringId: number, ref: React.RefObject<THREE.Group | null>, radiusMultiplier: number, yOffset: number) => {
    const ringNodes = orbitLabels.filter(n => n.ring === ringId);
    return (
      <group ref={ref} position={[0, yOffset, 0]}>
        {ringNodes.map((node, i) => {
          const angle = (i / ringNodes.length) * Math.PI * 2;
          const radius = brainRadius * radiusMultiplier; 
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;

          return (
            <group key={node.id} position={[x, 0, z]}>
              <Html center zIndexRange={[100, 0]}>
                <div className="relative group">
                  <button
                    onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                    className="flex flex-col items-center gap-1 cursor-pointer transition-transform hover:scale-110"
                  >
                    <div className="w-3 h-3 rounded-full animate-pulse border bg-[#00E5FF] shadow-[0_0_20px_#00E5FF] border-white" />
                    <span className="font-mono text-sm md:text-lg font-bold uppercase whitespace-nowrap px-2 py-1 rounded transition-colors text-white drop-shadow-[0_0_10px_rgba(0,255,255,0.8)] bg-black/60 border border-[#00E5FF]/30">
                      {node.label}
                    </span>
                  </button>
                  
                  {activeNode === node.id && (
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 w-64 p-4 rounded-xl backdrop-blur-3xl border shadow-2xl text-left z-50 bg-black/90 border-[#00E5FF]/50 shadow-[0_0_50px_rgba(0,229,255,0.4)]">
                      <h4 className="font-bold mb-2 border-b pb-1 text-sm text-[#00E5FF] border-[#00E5FF]/50">{node.label}</h4>
                      <ul className="space-y-2">
                        {node.items.map((item, idx) => (
                          <li key={idx} className="text-xs flex items-center gap-2 text-gray-200">
                            <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Html>
            </group>
          );
        })}
      </group>
    );
  };

  // Add an explosive flash at the exact moment of the collapse (progress roughly 0.45-0.5)
  const flashOpacity = scrollProgress > 0.45 && scrollProgress < 0.5 ? Math.sin(((scrollProgress - 0.45) / 0.05) * Math.PI) : 0;

  return (
    <group>
      <CodeParticles progress={scrollProgress} />
      
      {/* Massive Explosion Flash */}
      <mesh position={[0,0,-1]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={flashOpacity} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <group ref={containerGroupRef}>
        <mesh position={[0, 0, 0.1]}>
          <planeGeometry args={[vWidth, vHeight, 128, 128]} />
          <shaderMaterial
            ref={faceMaterialRef}
            vertexShader={dissolveVertexShader}
            fragmentShader={dissolveFragmentShader}
            uniforms={uniforms}
            transparent
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>

        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[bWidth, bHeight, 128, 128]} />
          <shaderMaterial
            ref={brainMaterialRef}
            vertexShader={dissolveVertexShader}
            fragmentShader={dissolveFragmentShader}
            uniforms={brainUniforms}
            transparent
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </group>

      {showOrbit && (
        <group>
          {renderRing(1, orbitGroupRef1, 2.2, brainRadius * 0.8)}
          {renderRing(2, orbitGroupRef2, 3.0, -brainRadius * 0.8)}
        </group>
      )}
    </group>
  );
}
