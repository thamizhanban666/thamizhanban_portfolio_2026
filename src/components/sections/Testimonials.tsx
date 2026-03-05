"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonialsData } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TextReveal from "@/components/animations/TextReveal";
import { appleEase } from "@/lib/animation-variants";

const TRUNCATE_LENGTH = 200;

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const testimonial = testimonialsData[current];

  // Reset expanded state when navigating between testimonials
  useEffect(() => {
    setExpanded(false);
  }, [current]);

  const next = () =>
    setCurrent((prev) => (prev + 1) % testimonialsData.length);
  const prev = () =>
    setCurrent(
      (prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length
    );

  const isLong = testimonial.text.length > TRUNCATE_LENGTH;
  const displayText =
    isLong && !expanded
      ? testimonial.text.slice(0, TRUNCATE_LENGTH).trimEnd() + "..."
      : testimonial.text;

  return (
    <section id="testimonials" className="py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-16">
          <TextReveal
            text="Testimonials"
            as="h2"
            className="text-3xl sm:text-4xl font-bold mb-4"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: appleEase }}
            className="w-12 h-1 bg-primary rounded-full origin-left"
          />
        </div>

        {/* Pull-quote style testimonial */}
        <motion.div
          className="glass p-8 sm:p-10 md:p-12 relative min-h-[360px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: appleEase }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.5,
                ease: appleEase,
              }}
              className="space-y-8"
            >
              {/* Large decorative quote mark */}
              <span className="text-8xl text-primary/20 font-serif leading-none select-none block">
                &ldquo;
              </span>

              {/* Highlighted pull-quote */}
              <p className="text-xl sm:text-2xl md:text-3xl font-medium leading-snug -mt-8">
                {testimonial.highlight}
              </p>

              {/* Full quote (smaller) with read more toggle */}
              <div>
                <p className="text-muted-foreground leading-relaxed max-w-3xl text-sm sm:text-base">
                  {displayText}
                </p>
                {isLong && (
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="text-primary text-sm font-medium mt-2 hover:underline focus:outline-none"
                  >
                    {expanded ? "Read less" : "Read more"}
                  </button>
                )}
              </div>

              {/* Author + Navigation */}
              <div className="flex items-center justify-between pt-4">
                {/* Author */}
                <div className="flex items-center gap-4">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center text-sm">
                      {testimonial.initials}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Navigation arrows */}
                {testimonialsData.length > 1 && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={prev}
                      className="h-9 w-9 rounded-full"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft size={16} />
                    </Button>
                    <span className="text-xs text-muted-foreground tabular-nums min-w-[2rem] text-center">
                      {current + 1}/{testimonialsData.length}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={next}
                      className="h-9 w-9 rounded-full"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
