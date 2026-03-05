"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight, Code2 } from "lucide-react";
import { featuredWorkData } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import TextReveal from "@/components/animations/TextReveal";
import { appleEase } from "@/lib/animation-variants";

/** Browser mockup frame — shows screenshot or gradient placeholder */
function BrowserMockup({
  image,
  title,
  gradient,
  url,
}: {
  image: string | null;
  title: string;
  gradient: string;
  url: string;
}) {
  return (
    <div className="rounded-xl overflow-hidden border border-border/50 bg-card/80 shadow-lg">
      {/* Browser Chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30 bg-muted/30">
        <div className="browser-dots flex gap-1.5">
          <span className="bg-red-400/70" />
          <span className="bg-yellow-400/70" />
          <span className="bg-green-400/70" />
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-background/60 rounded-md px-3 py-1 text-xs text-muted-foreground truncate max-w-xs mx-auto text-center">
            {url.replace("https://", "")}
          </div>
        </div>
      </div>
      {/* Screenshot area */}
      <div className="aspect-[16/9] relative overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={`${title} screenshot`}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          /* Gradient placeholder with subtle grid pattern */
          <div
            className={`w-full h-full bg-gradient-to-br ${gradient} relative`}
          >
            {/* Grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            {/* Centered icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-background/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <Code2 size={28} className="text-foreground/30" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FeaturedWork() {
  return (
    <section id="work" className="py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-16">
          <TextReveal
            text="Featured Work"
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

        {/* Project Cards — case study style */}
        <div className="space-y-24">
          {featuredWorkData.map((project, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                ease: appleEase as unknown as number[],
              }}
              className="space-y-8"
            >
              {/* Browser Mockup with hover glow */}
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="glow-effect rounded-xl"
              >
                <BrowserMockup
                  image={project.image}
                  title={project.title}
                  gradient={project.gradient}
                  url={project.url}
                />
              </motion.div>

              {/* Project Info */}
              <div className="space-y-6">
                {/* Title row */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold gradient-text">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      {project.subtitle}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="w-fit shrink-0 self-start"
                  >
                    {project.role}
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed max-w-3xl">
                  {project.description}
                </p>

                {/* Metrics — inline, no boxes */}
                <div className="flex flex-wrap gap-x-10 gap-y-4">
                  {project.metrics.map((metric, mIndex) => (
                    <div key={mIndex}>
                      <AnimatedCounter
                        value={metric.value}
                        className="text-2xl font-bold text-primary"
                        duration={1500}
                      />
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tech Tags + CTA */}
                <div className="flex flex-wrap items-center gap-2">
                  {project.techTags.map((tag, tIndex) => (
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
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="ml-auto gap-1 text-primary hover:text-primary"
                  >
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Separator between projects (not after last) */}
              {index < featuredWorkData.length - 1 && (
                <div className="h-px bg-border/30 mt-12" />
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
