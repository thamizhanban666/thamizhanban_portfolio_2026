"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { heroData, personalInfo } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/animations/MagneticButton";
import ParallaxLayer from "@/components/animations/ParallaxLayer";
import { useLenis } from "@/components/SmoothScroll";
import { appleEase } from "@/lib/animation-variants";

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const lenis = useLenis();

  const { scrollY } = useScroll();
  const headingY = useTransform(scrollY, [0, 500], [0, -80]);
  const headingOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const currentWord = heroData.roles[currentRole];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentWord.length) {
            setDisplayText(currentWord.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(currentWord.slice(0, displayText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % heroData.roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  const words = heroData.heading.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: appleEase as unknown as number[] },
    },
  };

  const handleScrollTo = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(href, { offset: -80 });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg" />

      {/* Decorative code watermark — visual focal point */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <pre className="text-primary/[0.04] dark:text-primary/[0.06] text-[10px] sm:text-xs leading-relaxed font-mono whitespace-pre rotate-[-4deg] scale-110">
{`const developer = {
  name: "Thamizhanban",
  role: "Full Stack Developer",
  stack: ["React", "Next.js", "TypeScript"],
  passion: "Building products from scratch",
  experience: "3+ years",
  focus: "Frontend Architecture",
};

export default developer;`}
        </pre>
      </div>

      {/* Floating Orbs with Parallax */}
      <ParallaxLayer speed={0.3} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full blur-3xl bg-primary/20 animate-float" />
      </ParallaxLayer>
      <ParallaxLayer speed={0.6} className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full blur-3xl bg-orange-500/15 animate-float-delayed" />
      </ParallaxLayer>
      <ParallaxLayer speed={0.15} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl bg-primary/10 animate-float" />
      </ParallaxLayer>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto"
        style={{ y: headingY, opacity: headingOpacity }}
      >
        {/* Status Badge — light glass, no heavy backdrop */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.3, ease: appleEase as unknown as number[] }}
        >
          <Badge
            variant="outline"
            className="mb-6 px-4 py-2 text-sm gap-2 bg-background/60 backdrop-blur-sm border-border"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {heroData.statusBadge}
          </Badge>
        </motion.div>

        {/* Heading with word-by-word reveal + blur */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              className="gradient-text inline-block mr-[0.3em]"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Typewriter Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: appleEase as unknown as number[] }}
          className="text-xl sm:text-2xl md:text-3xl font-medium mb-6"
        >
          <span className="text-primary">
            {displayText}
            <span className="animate-pulse">|</span>
          </span>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease: appleEase as unknown as number[] }}
          className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {heroData.subtext}
        </motion.p>

        {/* CTA Buttons with Magnetic Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: appleEase as unknown as number[] }}
          className="flex flex-row items-center justify-center gap-4"
        >
          <MagneticButton strength={0.3}>
            <Button size="lg" asChild className="shimmer-button">
              <a href="#contact" onClick={handleScrollTo("#contact")}>
                Get in Touch
              </a>
            </Button>
          </MagneticButton>
          <MagneticButton strength={0.3}>
            <Button
              variant="outline"
              size="lg"
              className="shimmer-button"
              asChild
            >
              <a
                href={personalInfo.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume
              </a>
            </Button>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator — below content, not absolute */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        className="hidden sm:flex mt-16 justify-center relative z-10"
      >
        <a
          href="#about"
          onClick={handleScrollTo("#about")}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Scroll to About section"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="h-6 w-6" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
