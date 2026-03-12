"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonialsData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import TextReveal from "@/components/animations/TextReveal";
import { appleEase } from "@/lib/animation-variants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

// ─── Constants ───
const TRUNCATE_LENGTH = 200;
const AUTOPLAY_DEFAULT = 5_000; // 5s when no interaction
const AUTOPLAY_AFTER_INTERACTION = 60_000; // 1min after user interacts

// Stable random rotations for the avatar stack (seeded per index)
const AVATAR_ROTATIONS = testimonialsData.map(
  (_, i) => (i % 2 === 0 ? 1 : -1) * (3 + ((i * 7) % 8))
);

// Gradient pairs for avatar backgrounds (fallback when no image)
const AVATAR_GRADIENTS = [
  "from-primary/80 to-primary/40",
  "from-primary/60 to-primary/30",
];

// ─── Avatar Stack + Author Info (Left Side) ───
function AvatarBlock({
  activeIndex,
}: {
  activeIndex: number;
}) {
  const reducedMotion = useReducedMotion();
  const activeTestimonial = testimonialsData[activeIndex];

  return (
    <div className="flex flex-col items-center lg:items-start gap-5">
      {/* Photo stack — clickable to LinkedIn */}
      <a
        href={activeTestimonial.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 block"
        aria-label={`View ${activeTestimonial.name} on LinkedIn`}
      >
        {testimonialsData.map((testimonial, i) => {
          const isActive = i === activeIndex;
          const rotation = AVATAR_ROTATIONS[i];

          return (
            <motion.div
              key={i}
              className={cn(
                "absolute inset-0 rounded-2xl overflow-hidden",
                "shadow-lg border border-white/10",
                !testimonial.image &&
                  "bg-gradient-to-br flex items-center justify-center",
                !testimonial.image &&
                  AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length]
              )}
              initial={false}
              animate={
                reducedMotion
                  ? { opacity: isActive ? 1 : 0 }
                  : {
                      rotate: isActive ? 0 : rotation,
                      scale: isActive ? 1 : 0.85,
                      x: isActive ? 0 : i % 2 === 0 ? -20 : 20,
                      y: isActive ? 0 : 12,
                      zIndex: isActive ? 10 : 0,
                      opacity: isActive ? 1 : 0.4,
                    }
              }
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 22,
              }}
            >
              {testimonial.image ? (
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-5xl sm:text-6xl md:text-7xl font-bold text-white/90 select-none">
                  {testimonial.initials}
                </span>
              )}
            </motion.div>
          );
        })}
      </a>

      {/* Name / Role / Company below the avatar */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeIndex}
          className="text-center lg:text-left"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: appleEase }}
        >
          <a
            href={activeTestimonial.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-semibold hover:text-primary transition-colors"
          >
            {activeTestimonial.name}
          </a>
          <p className="text-sm text-muted-foreground">
            {activeTestimonial.role}
          </p>
          <a
            href={activeTestimonial.companyLinkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {activeTestimonial.company}
          </a>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Quote Content (Right Side) ───
function QuoteContent({
  data,
}: {
  data: (typeof testimonialsData)[number];
}) {
  const [expanded, setExpanded] = useState(false);
  const isLong = data.text.length > TRUNCATE_LENGTH;
  const displayText =
    isLong && !expanded
      ? data.text.slice(0, TRUNCATE_LENGTH).trimEnd() + "\u2026"
      : data.text;

  // Reset expanded when testimonial changes
  useEffect(() => {
    setExpanded(false);
  }, [data]);

  return (
    <div className="flex flex-col">
      <span
        className="text-5xl sm:text-6xl text-primary/20 font-serif leading-none select-none block"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <p className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-snug mt-2 mb-5">
        {data.highlight}
      </p>

      <div>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {displayText}
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-primary text-sm font-medium mt-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Main Export ───
export default function Testimonials() {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  // Autoplay state: tracks whether user has interacted
  const [isPaused, setIsPaused] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const interactionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  // Mark user interaction — pause, then resume with longer interval
  const onUserInteraction = useCallback(() => {
    setIsPaused(true);
    setUserInteracted(true);

    // Clear any previous resume timer
    if (interactionTimerRef.current) {
      clearTimeout(interactionTimerRef.current);
    }

    // Resume autoplay after AUTOPLAY_AFTER_INTERACTION
    interactionTimerRef.current = setTimeout(() => {
      setIsPaused(false);
      setUserInteracted(false);
    }, AUTOPLAY_AFTER_INTERACTION);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex(
      (prev) =>
        (prev - 1 + testimonialsData.length) % testimonialsData.length
    );
  }, []);

  // Wrapped nav handlers that trigger interaction pause
  const handleNext = useCallback(() => {
    onUserInteraction();
    goNext();
  }, [goNext, onUserInteraction]);

  const handlePrev = useCallback(() => {
    onUserInteraction();
    goPrev();
  }, [goPrev, onUserInteraction]);

  const handleDotClick = useCallback(
    (i: number) => {
      onUserInteraction();
      setActiveIndex(i);
    },
    [onUserInteraction]
  );

  // Auto-play — respects pause state
  useEffect(() => {
    if (reducedMotion || isPaused) return;
    const interval = userInteracted
      ? AUTOPLAY_AFTER_INTERACTION
      : AUTOPLAY_DEFAULT;
    const timer = setInterval(goNext, interval);
    return () => clearInterval(timer);
  }, [goNext, reducedMotion, isPaused, userInteracted]);

  // Cleanup interaction timer on unmount
  useEffect(() => {
    return () => {
      if (interactionTimerRef.current) {
        clearTimeout(interactionTimerRef.current);
      }
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest("#testimonials") ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT"
      )
        return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  const activeTestimonial = testimonialsData[activeIndex];

  return (
    <section id="testimonials" className="py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12">
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

        {/* Split Layout — pause autoplay on hover */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="glass p-6 sm:p-8 md:p-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            if (!userInteracted) setIsPaused(false);
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-center">
            {/* Left — Avatar + Author Info */}
            <AvatarBlock activeIndex={activeIndex} />

            {/* Right — Animated Quote */}
            <div className="min-h-[240px] sm:min-h-[220px] min-w-0 relative">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeIndex}
                  initial={
                    reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    reducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: -20 }
                  }
                  transition={{ duration: 0.4, ease: appleEase }}
                >
                  <QuoteContent data={activeTestimonial} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation — centered */}
          {testimonialsData.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-border/30">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrev}
                className="h-9 w-9 rounded-full"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={16} />
              </Button>

              {/* Dots */}
              <div
                className="flex gap-2"
                role="tablist"
                aria-label="Testimonial navigation"
              >
                {testimonialsData.map((_, i) => (
                  <motion.button
                    key={i}
                    role="tab"
                    aria-selected={activeIndex === i}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={cn(
                      "h-2 rounded-full transition-colors",
                      activeIndex === i
                        ? "bg-primary"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    )}
                    animate={{ width: activeIndex === i ? 24 : 8 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                    onClick={() => handleDotClick(i)}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                className="h-9 w-9 rounded-full"
                aria-label="Next testimonial"
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          )}
        </motion.div>

        {/* Screen reader live region */}
        <div aria-live="polite" className="sr-only">
          Testimonial {activeIndex + 1} of {testimonialsData.length}:{" "}
          {activeTestimonial.name}, {activeTestimonial.role} at{" "}
          {activeTestimonial.company}
        </div>
      </div>
    </section>
  );
}
