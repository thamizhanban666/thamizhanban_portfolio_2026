"use client";

import { motion } from "framer-motion";
import { aboutData } from "@/lib/data";
import TextReveal from "@/components/animations/TextReveal";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import {
  fadeInUp,
  staggerContainer,
  appleEase,
} from "@/lib/animation-variants";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header with TextReveal */}
        <div className="mb-16">
          <TextReveal
            text="About Me"
            as="h2"
            className="text-3xl sm:text-4xl font-bold mb-4"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: appleEase as unknown as number[],
            }}
            className="w-12 h-1 bg-primary rounded-full origin-left"
          />
        </div>

        {/* Profile intro — image placeholder + first paragraph side by side */}
        <motion.div
          className="flex flex-col sm:flex-row items-start gap-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: appleEase as unknown as number[],
          }}
        >
          {/* Profile image placeholder */}
          <motion.div
            className="shrink-0 mx-auto sm:mx-0"
            whileHover={{ scale: 1.05, rotate: 3 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-primary/40 p-1 hover:border-primary/70 transition-colors">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent flex items-center justify-center">
                <span className="text-4xl sm:text-5xl font-bold text-primary/60">
                  T
                </span>
              </div>
            </div>
          </motion.div>
          {/* First paragraph */}
          <p className="text-muted-foreground leading-relaxed text-lg">
            {aboutData.paragraphs[0]}
          </p>
        </motion.div>

        {/* Remaining paragraphs */}
        <motion.div
          className="space-y-6 mb-20"
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {aboutData.paragraphs.slice(1).map((paragraph, index) => (
            <motion.p
              key={index}
              variants={fadeInUp}
              className="text-muted-foreground leading-relaxed text-lg"
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="glass grid grid-cols-2 md:grid-cols-4 p-8 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: appleEase as unknown as number[],
          }}
        >
          {aboutData.stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className={`text-center md:text-left py-4 md:py-0 md:pr-8 ${
                  index > 0 ? "md:border-l md:border-border md:pl-8" : ""
                } ${index >= 2 ? "border-t border-border md:border-t-0 pt-4 md:pt-0" : ""}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + index * 0.1,
                  ease: appleEase as unknown as number[],
                }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 mb-3"
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <Icon size={18} className="text-primary" />
                </motion.div>
                <AnimatedCounter
                  value={stat.value}
                  className="text-4xl sm:text-5xl font-bold text-primary"
                  duration={2000}
                />
                <p className="text-sm text-muted-foreground mt-2 tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
