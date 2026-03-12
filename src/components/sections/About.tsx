"use client";

import { motion } from "framer-motion";
import { aboutData } from "@/lib/data";
import TextReveal from "@/components/animations/TextReveal";
import { ChevronRight } from "lucide-react";
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
        <div className="mb-12">
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
              ease: appleEase,
            }}
            className="w-12 h-1 bg-primary rounded-full origin-left"
          />
        </div>

        {/* Profile intro — image + first paragraph side by side */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: appleEase,
          }}
        >
          {/* Profile image */}
          <motion.div
            className="shrink-0"
            whileHover={{ scale: 1.05, rotate: 3 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-primary/40 p-1 hover:border-primary/70 transition-colors">
              <img
                src="/images/profilePicture1.png"
                alt="Thamizhanban"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </motion.div>
          {/* First paragraph */}
          <p className="text-muted-foreground leading-relaxed text-lg sm:text-left">
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

        {/* Highlights */}
        <motion.ul
          className="flex flex-col gap-3"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {aboutData.highlights.map((point, index) => (
            <motion.li
              key={index}
              variants={fadeInUp}
              className="flex items-center gap-3 text-muted-foreground"
            >
              <ChevronRight size={16} className="text-primary shrink-0" />
              <span className="text-sm sm:text-base">{point}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
