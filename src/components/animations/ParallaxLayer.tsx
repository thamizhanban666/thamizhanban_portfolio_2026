"use client";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export default function ParallaxLayer({
  children,
  speed = 0.5,
  className,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [speed * -100, speed * 100]
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, willChange: "transform" }}>{children}</motion.div>
    </div>
  );
}
