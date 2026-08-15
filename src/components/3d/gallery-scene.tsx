"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll, Image, Text } from "@react-three/drei";
import { useRef, useMemo, useState } from "react";
import * as THREE from "three";

// Import standard portfolio sections
import SkillsSection from "@/sections/skills";
import ProjectsSection from "@/sections/projects";
import StatsSection from "@/sections/stats";
import TimelineSection from "@/sections/timeline";
import ContactSection from "@/sections/contact";
import CyberBackdrop from "@/components/cyber-backdrop";

function GalleryItem({ 
  url, 
  position, 
  scale, 
  title, 
  subtitle,
  description
}: { 
  url: string; 
  position: [number, number, number]; 
  scale: [number, number]; 
  title: string; 
  subtitle: string;
  description: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const imageRef = useRef<THREE.Mesh>(null);
  const titleRef = useRef<any>(null);
  const subtitleRef = useRef<any>(null);
  const descRef = useRef<any>(null);
  
  const { viewport } = useThree();
  const isMobile = viewport.width < 7;
  
  // Image Dimensions
  const maxWidth = isMobile ? viewport.width * 0.8 : viewport.width * 0.4;
  const maxHeight = viewport.height * 0.6;
  const aspect = scale[0] / scale[1];
  
  let currentWidth = maxWidth;
  let currentHeight = currentWidth / aspect;
  
  if (currentHeight > maxHeight) {
    currentHeight = maxHeight;
    currentWidth = currentHeight * aspect;
  }
  
  const currentScale = [currentWidth, currentHeight] as [number, number];
  
  // Mathematically foolproof layout
  const isCentered = isMobile;
  
  // Center is X=0. Desktop: Image on right, Text on left. Mobile: Stacked vertically at X=0.
  const imageX = isCentered ? 0 : currentWidth / 2 + 0.5;
  const groupY = isMobile ? 1.0 : position[1];
  const currentPos = [imageX, groupY, position[2]] as [number, number, number];

  const titleX = isCentered ? 0 : -0.5;
  
  // Vertical Stacking
  const imageBottom = -currentHeight / 2;
  const titleY = isCentered ? imageBottom - 0.5 : 0.5;
  const subY = isCentered ? titleY - 0.4 : -0.5;
  const descY = isCentered ? subY - 0.4 : subY - 0.6;

  const align = isCentered ? "center" : "right";

  // Text sizes
  const titleFontSize = isMobile ? Math.min(0.5, viewport.width * 0.12) : Math.min(0.8, currentHeight * 0.18);
  const subFontSize = isMobile ? Math.min(0.25, viewport.width * 0.07) : Math.min(0.4, currentHeight * 0.08);
  const descFontSize = isMobile ? Math.min(0.18, viewport.width * 0.05) : Math.min(0.2, currentHeight * 0.04);

  const textMaxWidth = isCentered ? viewport.width * 0.9 : (viewport.width / 2 - 1.0);

  const [hovered, setHovered] = useState(false);
  const scaleMultiplier = useRef(1);
  const textZ = useRef(0.5);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Gentle floating effect
    groupRef.current.position.y = currentPos[1] + Math.sin(state.clock.elapsedTime + position[2]) * 0.1;

    // Hover Animation Logic
    const targetScale = hovered ? 1.05 : 1;
    scaleMultiplier.current = THREE.MathUtils.damp(scaleMultiplier.current, targetScale, 6, delta);
    
    if (imageRef.current) {
      imageRef.current.scale.x = currentScale[0] * scaleMultiplier.current;
      imageRef.current.scale.y = currentScale[1] * scaleMultiplier.current;
    }

    const targetTextZ = hovered ? 1.5 : 0.5;
    textZ.current = THREE.MathUtils.damp(textZ.current, targetTextZ, 6, delta);
    
    if (titleRef.current) titleRef.current.position.z = textZ.current;
    if (subtitleRef.current) subtitleRef.current.position.z = textZ.current;
    if (descRef.current) descRef.current.position.z = textZ.current;

    // Distance Fade
    const dist = state.camera.position.z - position[2];
    let opacity = 1;
    if (dist > 80) opacity = 0;
    else if (dist > 60) opacity = 1 - (dist - 60) / 20;
    else if (dist < 2) opacity = dist / 2;
    
    opacity = Math.max(0, Math.min(1, opacity));

    if (imageRef.current && imageRef.current.material) {
      (imageRef.current.material as THREE.Material).opacity = opacity;
      (imageRef.current.material as THREE.Material).transparent = true;
    }
    
    if (titleRef.current) titleRef.current.fillOpacity = opacity;
    if (subtitleRef.current) subtitleRef.current.fillOpacity = opacity;
    if (descRef.current) descRef.current.fillOpacity = opacity;
  });

  return (
    <group 
      ref={groupRef} 
      position={currentPos}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Image 
        ref={imageRef}
        url={url} 
        scale={currentScale} 
        transparent 
        side={THREE.DoubleSide}
      />
      
      {/* Dynamic 3D Typography */}
      <Text
        ref={titleRef}
        position={[titleX - imageX, titleY, 0.5]} 
        fontSize={titleFontSize}
        color={hovered ? "#00E5FF" : "#FFFFFF"}
        anchorX={align}
        anchorY="middle"
        maxWidth={textMaxWidth}
        textAlign={align}
      >
        {title}
      </Text>
      <Text
        ref={subtitleRef}
        position={[titleX - imageX, subY, 0.5]}
        fontSize={subFontSize}
        color={hovered ? "#FFFFFF" : "#00E5FF"}
        anchorX={align}
        anchorY="middle"
        maxWidth={textMaxWidth}
        textAlign={align}
      >
        {subtitle}
      </Text>
      <Text
        ref={descRef}
        position={[titleX - imageX, descY, 0.5]}
        fontSize={descFontSize}
        color="#A0A0A0"
        anchorX={align}
        anchorY="top"
        maxWidth={textMaxWidth}
        textAlign={align}
      >
        {description}
      </Text>
    </group>
  );
}

function CameraController({ maxDepth, flythroughFraction }: { maxDepth: number; flythroughFraction: number }) {
  const scroll = useScroll();
  const { camera } = useThree();

  useFrame((state, delta) => {
    // Scroll offset maps from 0 to 1 over the ENTIRE ScrollControls length.
    // We only want the camera to move during the first `flythroughFraction`
    // of the scroll, because the remainder is used for scrolling the HTML
    // portfolio sections that stack after the 3D fly-through.
    const progress = Math.min(1, scroll.offset / flythroughFraction);
    const targetZ = 5 - (progress * maxDepth);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 4, delta);
  });

  return null;
}

export default function GalleryScene() {
  const items = useMemo(() => [
    {
      url: "/realistic_portrait.png",
      position: [0, 0, 0] as [number, number, number],
      scale: [6, 8] as [number, number],
      title: "Kamran Ali",
      subtitle: "AI Systems Architect",
      description: "Founder of Omni Digital Solutions. We architect enterprise-scale AI systems, bridging the gap between cutting-edge artificial intelligence and human potential."
    },
    {
      url: "/laptop_working.png",
      position: [0, 0, -30] as [number, number, number],
      scale: [7, 5] as [number, number],
      title: "Omni Signage",
      subtitle: "Digital Display CMS",
      description: "Next-generation 3D digital signage CMS for any browser. A flagship product of Omni Digital Solutions, delivering immersive visual experiences."
    },
    {
      url: "/data_analysis.png",
      position: [0, -1, -60] as [number, number, number],
      scale: [7, 5] as [number, number],
      title: "Omni Nexus",
      subtitle: "Building the Future",
      description: "Our flagship ecosystem. A revolutionary platform integrating generative AI, seamless workflow automation, and real-time data processing for modern enterprises."
    },
    {
      url: "/data_analysis.png",
      position: [0, -1, -90] as [number, number, number],
      scale: [7, 5] as [number, number],
      title: "Data Intelligence",
      subtitle: "Predictive Analytics",
      description: "Transforming raw data into actionable insights. We build custom machine learning pipelines that predict market trends and optimize operations at massive scale."
    },
    {
      url: "/robotics_lab.png",
      position: [0, 1, -120] as [number, number, number],
      scale: [7, 5] as [number, number],
      title: "Automation",
      subtitle: "Robotics & Hardware",
      description: "Moving beyond software. We deploy advanced robotics and IoT integrations, automating physical workflows to maximize industrial efficiency and safety."
    },
    {
      url: "/futuristic_brain.png",
      position: [0, 0, -150] as [number, number, number],
      scale: [6, 6] as [number, number],
      title: "The Core",
      subtitle: "Artificial Neural Networks",
      description: "The brain behind the operation. Custom-trained Large Language Models and deeply integrated neural networks tailored specifically for your business logic."
    },
    {
      url: "/image.png",
      position: [0, 0, -180] as [number, number, number],
      scale: [5, 5] as [number, number],
      title: "Cyber Security",
      subtitle: "Let's Build the Future",
      description: "Robust infrastructure with military-grade encryption. Your enterprise data is fortified against modern threats while powering next-generation AI."
    }
  ], []);

  // The 3D fly-through always takes ~5.5 "pages" worth of scrolling, no
  // matter how much HTML content follows it. TOTAL_PAGES sets the overall
  // scroll length; grow it if more sections are added below so nothing
  // gets clipped, and the fly-through pacing stays untouched.
  const FLYTHROUGH_PAGES = 5.5;
  const TOTAL_PAGES = 20;

  return (
    <div className="w-full h-screen bg-[#050505] overflow-hidden">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 10, 80]} />

        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} />

        {/* First ~5.5 pages: 3D gallery fly-through. Remaining pages: the
            HTML portfolio sections (Skills, Projects, Stats, Timeline,
            Contact) scrolling up over the 3D background. */}
        <ScrollControls pages={TOTAL_PAGES} damping={0.2}>
          <CameraController maxDepth={180} flythroughFraction={FLYTHROUGH_PAGES / TOTAL_PAGES} />
          
          <group>
            {items.map((item, index) => (
              <GalleryItem key={index} {...item} />
            ))}
          </group>

          <Scroll html style={{ width: '100%' }}>
            {/* Standard Portfolio Sections mapped over the 3D background */}
            {/* The 3D gallery takes about 550vh (5.5 pages) to finish traversing.
                We push the HTML sections down 600vh so they begin rising precisely AFTER the 3D fly-through finishes! */}
            <div className="relative w-full z-10" style={{ marginTop: '600vh', paddingBottom: '100px' }}>
              <div className="relative bg-[#050505]/80 backdrop-blur-lg border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,1)]">
                <CyberBackdrop />
                <SkillsSection />
                <ProjectsSection />
                <StatsSection />
                <TimelineSection />
                <ContactSection />
                
                {/* Final Footer */}
                <div className="max-w-7xl mx-auto text-center text-gray-500 py-10 mt-20 border-t border-white/5">
                  <p>© 2026 Kamran Ali. Omni Digital Solutions.</p>
                </div>
              </div>
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}
