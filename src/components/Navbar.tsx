"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Menu, Sun, Moon, Github, Send, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks, personalInfo } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ScrollProgress from "@/components/animations/ScrollProgress";
import { useLenis } from "@/components/SmoothScroll";
import { appleEase } from "@/lib/animation-variants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (lenis) {
      const isMd = window.matchMedia("(min-width: 768px)").matches;
      lenis.scrollTo(href, { offset: isMd ? 48 : 8 });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <ScrollProgress />
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: appleEase }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300 border-b",
          scrolled
            ? "backdrop-blur-xl bg-background/70 border-border/50 shadow-lg shadow-black/5"
            : "backdrop-blur-xl bg-background/40 border-border/30"
        )}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="text-xl font-bold gradient-text"
            onClick={handleLogoClick}
          >
            Thamizhanban
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="relative group text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{
                    duration: 0.3,
                    ease: appleEase,
                  }}
                />
              </a>
            ))}

            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="relative overflow-hidden"
                aria-label="Toggle theme"
              >
                <Sun
                  className={cn(
                    "h-5 w-5 transition-all duration-300",
                    theme === "dark"
                      ? "rotate-90 scale-0 opacity-0"
                      : "rotate-0 scale-100 opacity-100"
                  )}
                />
                <Moon
                  className={cn(
                    "absolute h-5 w-5 transition-all duration-300",
                    theme === "dark"
                      ? "rotate-0 scale-100 opacity-100"
                      : "-rotate-90 scale-0 opacity-0"
                  )}
                />
              </Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="relative overflow-hidden"
                aria-label="Toggle theme"
              >
                <Sun
                  className={cn(
                    "h-5 w-5 transition-all duration-300",
                    theme === "dark"
                      ? "rotate-90 scale-0 opacity-0"
                      : "rotate-0 scale-100 opacity-100"
                  )}
                />
                <Moon
                  className={cn(
                    "absolute h-5 w-5 transition-all duration-300",
                    theme === "dark"
                      ? "rotate-0 scale-100 opacity-100"
                      : "-rotate-90 scale-0 opacity-0"
                  )}
                />
              </Button>
            )}

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[280px] backdrop-blur-2xl bg-background/95 border-l border-border/50 p-0"
                data-lenis-prevent
              >
                {/* Header */}
                <SheetHeader className="px-6 pt-6 pb-4">
                  <SheetTitle className="gradient-text text-left text-xl">
                    Thamizhanban
                  </SheetTitle>
                  <p className="text-xs text-muted-foreground/70 text-left">
                    Full Stack Developer
                  </p>
                </SheetHeader>

                {/* Divider */}
                <div className="mx-6 h-px bg-border/50" />

                {/* Navigation Links */}
                <nav className="flex flex-col px-6 py-6">
                  <AnimatePresence>
                    {mobileOpen &&
                      navLinks.map((link, index) => (
                        <motion.a
                          key={link.href}
                          href={link.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.05 + index * 0.06,
                            ease: appleEase,
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(link.href);
                          }}
                          className="group flex items-center gap-4 py-3 border-b border-border/30 last:border-b-0 transition-colors"
                        >
                          <span className="text-[11px] font-mono text-primary/60 w-5 group-hover:text-primary transition-colors">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[15px] font-medium text-muted-foreground group-hover:text-foreground transition-colors flex-1">
                            {link.label}
                          </span>
                          <ArrowUpRight
                            size={14}
                            className="text-muted-foreground/0 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                          />
                        </motion.a>
                      ))}
                  </AnimatePresence>
                </nav>

                {/* Footer with social links */}
                <div className="mt-auto px-6 pb-6">
                  <div className="h-px bg-border/50 mb-5" />
                  <AnimatePresence>
                    {mobileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.4,
                          ease: appleEase,
                        }}
                        className="flex items-center gap-3"
                      >
                        <a
                          href={personalInfo.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub"
                          className="flex items-center justify-center w-9 h-9 rounded-full border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-200"
                        >
                          <Github size={16} />
                        </a>
                        <a
                          href={personalInfo.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn"
                          className="flex items-center justify-center w-9 h-9 rounded-full border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-200"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
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
                        </a>
                        <a
                          href={personalInfo.telegram}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Telegram"
                          className="flex items-center justify-center w-9 h-9 rounded-full border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-200"
                        >
                          <Send size={16} />
                        </a>
                        <a
                          href={`mailto:${personalInfo.email}`}
                          className="ml-auto text-xs text-muted-foreground/60 hover:text-primary transition-colors"
                        >
                          Say hello →
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
