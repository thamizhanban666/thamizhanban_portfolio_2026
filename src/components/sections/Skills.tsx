"use client";

import { motion } from "framer-motion";
import { skillsData } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import TextReveal from "@/components/animations/TextReveal";
import {
  staggerContainer,
  fadeInUp,
  appleEase,
} from "@/lib/animation-variants";

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-16">
          <TextReveal
            text="Skills"
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

        {/* Skills Grid — 2×2 glass cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillsData.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="glass p-6 sm:p-8 space-y-5 glow-effect"
              >
                {/* Category header */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {category.category}
                  </h3>
                </div>

                {/* Skill pills */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIndex) => (
                    <motion.div
                      key={sIndex}
                      whileHover={{ scale: 1.05, y: -1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <Badge
                        variant="outline"
                        className="bg-primary/5 border-primary/25 text-primary/90 hover:bg-primary/10 hover:border-primary/40 transition-colors"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
