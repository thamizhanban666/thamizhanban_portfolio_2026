"use client";
import { useRef, useCallback, useState, type ReactNode } from "react";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
}

export default function SpotlightCard({
  children,
  className,
  spotlightColor = "oklch(0.75 0.18 55 / 8%)",
  spotlightSize = 400,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isTouch || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      ref.current.style.setProperty(
        "--mouse-x",
        `${e.clientX - rect.left}px`
      );
      ref.current.style.setProperty(
        "--mouse-y",
        `${e.clientY - rect.top}px`
      );
    },
    [isTouch]
  );

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      style={{ position: "relative", overflow: "hidden" }}
    >
      {!isTouch && isHovered && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: `radial-gradient(${spotlightSize}px circle at var(--mouse-x) var(--mouse-y), ${spotlightColor}, transparent 80%)`,
            zIndex: 1,
            transition: "opacity 0.3s ease",
          }}
        />
      )}
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  );
}
