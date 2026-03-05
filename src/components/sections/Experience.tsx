"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { experienceData } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import TextReveal from "@/components/animations/TextReveal";
import {
  fadeInLeft,
  staggerContainer,
  appleEase,
} from "@/lib/animation-variants";

/** Calculates human-readable duration from a start date to now */
function calcDuration(startDate: string): string {
  const start = new Date(startDate);
  const now = new Date();
  const totalMonths =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  if (years === 0) return `${months} month${months !== 1 ? "s" : ""}`;
  if (months === 0) return `${years} year${years !== 1 ? "s" : ""}`;
  return `${years} yr${years !== 1 ? "s" : ""} ${months} mo`;
}

/** Wraps leading numbers like "90+" or "140+" in strong tags for emphasis */
function highlightMetrics(text: string): React.ReactNode {
  const parts = text.split(/(\b\d[\d,]*\+?\b)/g);
  return parts.map((part, i) =>
    /^\d[\d,]*\+?$/.test(part) ? (
      <strong key={i} className="text-primary font-semibold">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.8", "end 0.2"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header with TextReveal */}
        <div className="mb-16">
          <TextReveal
            text="Experience"
            as="h2"
            className="text-3xl sm:text-4xl font-bold mb-4"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: appleEase as unknown as number[] }}
            className="w-12 h-1 bg-primary rounded-full origin-left"
          />
        </div>

        {/* Timeline */}
        <motion.div
          ref={timelineRef}
          className="relative"
          variants={staggerContainer(0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Scroll-linked Vertical Line */}
          <motion.div
            className="absolute left-[7px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary to-primary/50 origin-top"
            style={{ scaleY: lineScaleY }}
          />

          <div className="space-y-10">
            {experienceData.map((exp, index) => (
              <motion.div
                key={index}
                variants={fadeInLeft}
                className="relative pl-10"
              >
                {/* Timeline Dot — spring in */}
                <motion.div
                  className={cn(
                    "w-4 h-4 rounded-full bg-primary border-4 border-background absolute left-0 top-8 z-10",
                    exp.isCurrent &&
                      "shadow-[0_0_12px_4px_rgba(249,115,22,0.4)]"
                  )}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />

                {/* Pulsing glow ring for current position */}
                {exp.isCurrent && (
                  <motion.div
                    className="absolute left-0 top-8 w-4 h-4 rounded-full bg-primary/30 z-10"
                    animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {/* Content — glass card with hover lift */}
                <motion.div
                  className="glass p-6 sm:p-8 space-y-4"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  {/* Company & Role */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                        {exp.company}
                      </h3>
                      <p className="text-primary font-medium">
                        {exp.role}
                      </p>
                    </div>
                    {exp.isCurrent && (
                      <Badge className="w-fit bg-primary/15 text-primary border-primary/30 hover:bg-primary/20">
                        Current
                      </Badge>
                    )}
                  </div>

                  {/* Products */}
                  <p className="text-sm text-muted-foreground">
                    {exp.products}
                  </p>

                  {/* Period & Duration */}
                  <p className="text-sm text-muted-foreground">
                    {exp.period} &middot;{" "}
                    {exp.isCurrent && exp.startDate
                      ? calcDuration(exp.startDate)
                      : exp.duration}
                  </p>

                  {/* Highlights — with bold metrics */}
                  <ul className="space-y-2.5 pt-1">
                    {exp.highlights.map((highlight, hIndex) => (
                      <motion.li
                        key={hIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: hIndex * 0.08,
                          ease: appleEase as unknown as number[],
                        }}
                        className="text-foreground/80 text-sm leading-relaxed flex gap-2"
                      >
                        <span className="text-primary mt-0.5 shrink-0">&#9657;</span>
                        <span>{highlightMetrics(highlight)}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Tech Tags — primary tinted */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.techTags.map((tag, tIndex) => (
                      <motion.div
                        key={tIndex}
                        whileHover={{ scale: 1.05, y: -1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <Badge
                          variant="outline"
                          className="bg-primary/5 border-primary/25 text-primary/90 hover:bg-primary/10 hover:border-primary/40 transition-colors text-xs"
                        >
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
