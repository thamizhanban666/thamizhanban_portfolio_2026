"use client";
import { useRef, useCallback } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";
import { useIsTouchDevice } from "./useIsTouchDevice";
import { useReducedMotion } from "./useReducedMotion";

interface TiltReturn {
  ref: React.RefObject<HTMLElement | null>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseLeave: () => void;
}

export function useTiltEffect(maxTilt = 8): TiltReturn {
  const ref = useRef<HTMLElement>(null);
  const isTouch = useIsTouchDevice();
  const reduced = useReducedMotion();

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const rotateX = useSpring(rotateXRaw, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isTouch || reduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
      const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;
      rotateXRaw.set(-normalizedY * maxTilt);
      rotateYRaw.set(normalizedX * maxTilt);
    },
    [isTouch, reduced, maxTilt, rotateXRaw, rotateYRaw]
  );

  const handleMouseLeave = useCallback(() => {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
  }, [rotateXRaw, rotateYRaw]);

  return { ref, rotateX, rotateY, handleMouseMove, handleMouseLeave };
}
