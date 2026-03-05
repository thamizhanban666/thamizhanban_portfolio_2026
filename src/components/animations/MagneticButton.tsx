"use client";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export default function MagneticButton({
  children,
  className,
  strength = 0.35,
}: MagneticButtonProps) {
  const { ref, x, y, handleMouseMove, handleMouseLeave } =
    useMagneticEffect(strength);

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}
