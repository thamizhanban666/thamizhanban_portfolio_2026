"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useCountUp(
  end: number,
  duration = 2000
): { count: number; ref: React.RefObject<HTMLElement | null> } {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // IntersectionObserver triggers the count when element is in view
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // RAF-based animation with easeOutExpo
  useEffect(() => {
    if (!hasStarted) return;
    if (reduced) {
      setCount(end);
      return;
    }

    let startTime: number;
    let animationFrame: number;

    const easeOutExpo = (t: number) =>
      t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(easeOutExpo(progress) * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, end, duration, reduced]);

  return { count, ref };
}
