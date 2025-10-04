// Inspired by https://github.com/dazbo/glowing-edge-effect-poc/blob/main/src/components/Card.tsx
"use client";
import React, {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  useCallback,
} from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";

interface GlowingEffectProps {
  children?: ReactNode;
  disabled?: boolean;
  glow?: boolean;
  proximity?: number;
  inactiveZone?: number;
  spread?: number;
}

export function GlowingEffect({
  disabled,
  glow,
  proximity,
  inactiveZone,
  spread,
}: GlowingEffectProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
    if (ref.current) {
      const { left, top } = ref.current.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
  };

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    controls.start({ opacity: 1 });
  }, [controls]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    controls.start({ opacity: 0 });
  }, [controls]);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [handleMouseEnter, handleMouseLeave, isHovered]);

  if (disabled) {
    return null;
  }

  const prox = proximity ?? 128;
  const zone = inactiveZone ?? 0.05;
  const spr = spread ?? 50;
  const sprPercent = `${spr}%`;
  const proxPx = `${prox}px`;

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 -z-10">
      <motion.div
        style={{
          // @ts-ignore
          background: `radial-gradient(${proxPx} at ${mouseX.get()}px ${mouseY.get()}px, hsl(var(--primary) / 0.1), transparent ${sprPercent})`,
          opacity: isHovered ? 1 : 0,
        }}
        className="pointer-events-none absolute inset-[1px] -z-10 h-[calc(100%-2px)] w-[calc(100%-2px)] rounded-3xl"
        animate={controls}
        transition={{
          duration: 0.2,
          ease: "linear",
        }}
      />
    </div>
  );
}
