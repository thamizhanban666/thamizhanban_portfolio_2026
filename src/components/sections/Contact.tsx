"use client";

import { useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { Mail, Github, Send, ArrowRight } from "lucide-react";
import { personalInfo, contactData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/animations/MagneticButton";
import { appleEase } from "@/lib/animation-variants";

/** Tilt-on-hover wrapper for social icons */
function TiltIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const maxTilt = 35;

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const rotateX = useSpring(rotateXRaw, { stiffness: 260, damping: 18 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 260, damping: 18 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      rotateXRaw.set(-ny * maxTilt);
      rotateYRaw.set(nx * maxTilt);
    },
    [rotateXRaw, rotateYRaw]
  );

  const handleMouseLeave = useCallback(() => {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
  }, [rotateXRaw, rotateYRaw]);

  return (
    <div style={{ perspective: 200 }}>
      <motion.a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-11 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors"
        aria-label={label}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </motion.a>
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          className="glass p-6 sm:p-8 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: appleEase }}
        >
          {/* Big heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: appleEase,
            }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
          >
            {contactData.heading.replace(" Together", " ")}
            <span className="gradient-text">Together</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: appleEase,
            }}
            className="text-muted-foreground mt-6 text-lg max-w-xl mx-auto"
          >
            {contactData.cta}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: appleEase,
            }}
            className="mt-10"
          >
            <MagneticButton strength={0.3}>
              <Button
                size="lg"
                asChild
                className="shimmer-button text-base px-8 h-12 gap-2"
              >
                <a href={`mailto:${personalInfo.email}`}>
                  <Mail size={18} />
                  Say Hello
                  <ArrowRight size={16} />
                </a>
              </Button>
            </MagneticButton>
          </motion.div>

          {/* Social row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.35,
              ease: appleEase,
            }}
            className="mt-10 flex items-center justify-center gap-3"
          >
            <TiltIcon href={personalInfo.github} label="GitHub">
              <Github size={20} />
            </TiltIcon>
            <TiltIcon href={personalInfo.linkedin} label="LinkedIn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </TiltIcon>
            <TiltIcon href={personalInfo.telegram} label="Telegram">
              <Send size={20} />
            </TiltIcon>
            <span className="text-border mx-1">|</span>
            <span className="text-sm text-muted-foreground">
              {personalInfo.location}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
