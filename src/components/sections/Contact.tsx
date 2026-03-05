"use client";

import { motion } from "framer-motion";
import { Mail, Github, Send, ArrowRight } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/animations/MagneticButton";
import { appleEase } from "@/lib/animation-variants";

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          className="glass p-10 sm:p-14 md:p-16"
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
            {"Let's build something "}
            <span className="gradient-text">together</span>
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
            {"I'm looking for new opportunities where I can contribute as a frontend-focused full stack developer. If you're looking for someone who builds entire product frontends from scratch, let's connect."}
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
            <motion.a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors"
              aria-label="GitHub"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors"
              aria-label="LinkedIn"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
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
            </motion.a>
            <motion.a
              href={personalInfo.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors"
              aria-label="Telegram"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Send size={20} />
            </motion.a>
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
