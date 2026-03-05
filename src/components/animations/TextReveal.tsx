"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

function Word({
  children,
  range,
  progress,
}: {
  children: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [4, 0]);

  return (
    <motion.span style={{ opacity, y, display: "inline-block" }}>
      {children}
    </motion.span>
  );
}

export default function TextReveal({
  text,
  className,
  as: Tag = "p",
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.3"],
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef}>
      <Tag
        className={className}
        style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em" }}
      >
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} range={[start, end]} progress={scrollYProgress}>
              {word}
            </Word>
          );
        })}
      </Tag>
    </div>
  );
}
