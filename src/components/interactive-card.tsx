"use client";

import { forwardRef, useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
}

/**
 * A card that fades/rises into view on scroll, and tilts in 3D toward the
 * cursor on hover (like a chip catching light). Forwards its DOM ref so it
 * can be measured by CircuitGrid for the connector lines.
 */
const InteractiveCard = forwardRef<HTMLDivElement, InteractiveCardProps>(
  ({ children, className = "", delay = 0, onClick }, forwardedRef) => {
    const innerRef = useRef<HTMLDivElement | null>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 250, damping: 22 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 250, damping: 22 });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
      const el = innerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.div
        ref={(node: HTMLDivElement | null) => {
          innerRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        className={className}
      >
        <div style={{ transform: "translateZ(24px)" }}>{children}</div>
      </motion.div>
    );
  }
);

InteractiveCard.displayName = "InteractiveCard";

export default InteractiveCard;
