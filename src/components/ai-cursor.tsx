"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Point {
  x: number;
  y: number;
  id: number;
}

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export function AICursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trails, setTrails] = useState<Point[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  
  const trailIdRef = useRef(0);
  const rippleIdRef = useRef(0);

  useEffect(() => {
    // Hide default cursor globally
    document.body.style.cursor = "none";

    const updatePosition = (e: MouseEvent) => {
      // Find if we are hovering a clickable element
      const target = e.target as HTMLElement;
      const isClickable = target.closest("button, a, input, [data-magnetic]");
      setIsHovering(!!isClickable);

      // If magnetize feature (requires specific elements, simplified here to just hover state)
      // Magnetize usually implies pulling the cursor to the center of the button
      let targetX = e.clientX;
      let targetY = e.clientY;

      if (isClickable && target.closest("[data-magnetic]")) {
        const rect = target.closest("[data-magnetic]")!.getBoundingClientRect();
        targetX = rect.left + rect.width / 2;
        targetY = rect.top + rect.height / 2;
      }

      setPosition({ x: targetX, y: targetY });

      // Add trail point
      const id = trailIdRef.current++;
      setTrails((prev) => [...prev, { x: targetX, y: targetY, id }].slice(-15));
    };

    const handleClick = (e: MouseEvent) => {
      const id = rippleIdRef.current++;
      setRipples((prev) => [...prev, { x: e.clientX, y: e.clientY, id }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 1000);
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("click", handleClick);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Trails */}
      {trails.map((trail, i) => (
        <motion.div
          key={trail.id}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute rounded-full bg-[#00E5FF] blur-[2px]"
          style={{
            left: trail.x - 3,
            top: trail.y - 3,
            width: 6,
            height: 6,
          }}
        />
      ))}

      {/* Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ opacity: 0.8, scale: 0 }}
            animate={{ opacity: 0, scale: 4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute rounded-full border border-[#00E5FF] shadow-[0_0_15px_#00E5FF]"
            style={{
              left: ripple.x - 20,
              top: ripple.y - 20,
              width: 40,
              height: 40,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main Cursor Core */}
      <motion.div
        animate={{
          x: position.x - (isHovering ? 20 : 6),
          y: position.y - (isHovering ? 20 : 6),
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        className={`absolute rounded-full ${isHovering ? "border border-[#00E5FF] bg-[#00E5FF]/10 backdrop-blur-sm" : "bg-[#00E5FF]"} shadow-[0_0_10px_#00E5FF]`}
        style={{
          width: isHovering ? 40 : 12,
          height: isHovering ? 40 : 12,
        }}
      >
        {isHovering && (
          <div className="absolute inset-0 rounded-full border border-[#8A2EFF] animate-ping opacity-20" />
        )}
      </motion.div>
    </div>
  );
}
