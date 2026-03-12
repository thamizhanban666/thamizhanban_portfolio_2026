"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Code2 } from "lucide-react";
import { useTheme } from "next-themes";
import { featuredWorkData, type FeaturedModule } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import TextReveal from "@/components/animations/TextReveal";
import { appleEase } from "@/lib/animation-variants";

type ThemeMedia = { light: string; dark: string };

/* ── Video Progress Bar ── */
function VideoProgressBar({ videoRef }: { videoRef: React.RefObject<HTMLVideoElement | null> }) {
  const [progress, setProgress] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTime = () => {
      if (!isSeeking && video.duration) {
        setProgress(video.currentTime / video.duration);
      }
    };
    video.addEventListener("timeupdate", onTime);
    return () => video.removeEventListener("timeupdate", onTime);
  }, [videoRef, isSeeking]);

  const seek = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      const video = videoRef.current;
      const bar = barRef.current;
      if (!video || !bar || !video.duration) return;
      const rect = bar.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      video.currentTime = ratio * video.duration;
      setProgress(ratio);
    },
    [videoRef],
  );

  const handlePointerDown = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      setIsSeeking(true);
      seek(e);

      const onMove = (ev: globalThis.MouseEvent) => {
        const video = videoRef.current;
        const bar = barRef.current;
        if (!video || !bar || !video.duration) return;
        const rect = bar.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width));
        video.currentTime = ratio * video.duration;
        setProgress(ratio);
      };
      const onUp = () => {
        setIsSeeking(false);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [seek, videoRef],
  );

  return (
    <div
      ref={barRef}
      onMouseDown={handlePointerDown}
      className="absolute bottom-0 left-0 right-0 h-1.5 cursor-pointer group/bar bg-white/10 backdrop-blur-sm"
    >
      <div
        className="h-full bg-primary transition-[width] duration-75 ease-linear"
        style={{ width: `${progress * 100}%` }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-md border-2 border-background transition-opacity"
        style={{ left: `${progress * 100}%` }}
      />
    </div>
  );
}

/* ── Browser Mockup ── */
function BrowserMockup({
  image,
  video,
  title,
  gradient,
  url,
}: {
  image?: ThemeMedia | null;
  video: ThemeMedia | null;
  title: string;
  gradient: string;
  url?: string;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  const videoSrc = mounted && video ? (isDark ? video.dark : video.light) : null;
  const imageSrc = mounted && image ? (isDark ? image.dark : image.light) : null;

  useEffect(() => {
    if (videoRef.current && videoSrc) {
      videoRef.current.load();
    }
  }, [videoSrc]);

  return (
    <div className="rounded-xl overflow-hidden border border-border bg-card/80 shadow-lg">
      {/* Browser Chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30 bg-muted/30">
        <div className="browser-dots flex gap-1.5">
          <span className="bg-red-400/70" />
          <span className="bg-yellow-400/70" />
          <span className="bg-green-400/70" />
        </div>
        {url && (
          <div className="flex-1 mx-4">
            <div className="bg-background/60 rounded-md px-3 py-1 text-xs text-muted-foreground truncate max-w-xs mx-auto text-center">
              {url.replace("https://", "")}
            </div>
          </div>
        )}
      </div>

      {/* Media area */}
      <div
        className="relative overflow-hidden bg-background"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {video ? (
          mounted && videoSrc ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto block"
                aria-label={`${title} demo`}
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
              <AnimatePresence>
                {hovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <VideoProgressBar videoRef={videoRef} />
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <div className="relative">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto block dark:hidden"
                aria-label={`${title} demo`}
              >
                <source src={video.light} type="video/mp4" />
              </video>
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto hidden dark:block"
                aria-label={`${title} demo`}
              >
                <source src={video.dark} type="video/mp4" />
              </video>
            </div>
          )
        ) : imageSrc ? (
          <img
            src={imageSrc}
            alt={`${title} screenshot`}
            className="w-full h-auto block"
          />
        ) : image ? (
          <div className="relative">
            <img
              src={image.light}
              alt={`${title} screenshot`}
              className="w-full h-auto block dark:hidden"
            />
            <img
              src={image.dark}
              alt={`${title} screenshot`}
              className="w-full h-auto hidden dark:block"
            />
          </div>
        ) : (
          <div
            className={`w-full aspect-[16/9] bg-gradient-to-br ${gradient} relative`}
          >
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
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

/* ── Module Content (shared renderer for each tab) ── */
function ModuleContent({ mod }: { mod: FeaturedModule }) {
  return (
    <div className="space-y-6">
      {/* Role badge */}
      <Badge variant="outline" className="w-fit text-xs bg-primary/[0.03] border-primary/15 text-primary">
        {mod.role}
      </Badge>

      {/* Module video — smaller than parent for hierarchy */}
      {mod.video && (
        <div className="max-w-2xl">
          <BrowserMockup
            video={mod.video}
            title={mod.title}
            gradient={mod.gradient}
          />
        </div>
      )}

      {/* Module description */}
      <p className="text-muted-foreground leading-relaxed text-sm max-w-3xl">
        {mod.description}
      </p>

      {/* Module metrics */}
      <div className="flex flex-wrap gap-x-8 gap-y-3">
        {mod.metrics.map((metric, mIndex) => (
          <div key={mIndex}>
            <AnimatedCounter
              value={metric.value}
              className="text-xl font-bold text-primary"
              duration={1200}
            />
            <p className="text-xs text-muted-foreground mt-0.5">
              {metric.label}
            </p>
          </div>
        ))}
      </div>

      {/* Module tech tags */}
      <div className="flex flex-wrap gap-1.5">
        {mod.techTags.map((tag, tIndex) => (
          <Badge
            key={tIndex}
            variant="outline"
            className="bg-primary/[0.03] border-primary/15 text-primary text-xs"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}

/* ── Module Tabs (within SwipeOne) ── */
function ModuleTabs({ modules }: { modules: FeaturedModule[] }) {
  const [activeTab, setActiveTab] = useState(modules[0].title);
  const activeMod = modules.find((m) => m.title === activeTab) ?? modules[0];

  return (
    <div className="mt-10 space-y-6">
      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
        Key Modules I Built
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="gap-6">
        {/* Horizontal scrollable line tabs — vibrant brand color */}
        <div className="overflow-x-auto -mx-4 px-4 sm:-mx-6 sm:px-6 scrollbar-hide">
          <TabsList variant="line" className="w-max gap-6">
            {modules.map((mod) => (
              <TabsTrigger
                key={mod.title}
                value={mod.title}
                className="text-base sm:text-lg font-semibold px-1 py-2.5 text-foreground/50 hover:text-primary/70 data-[state=active]:!text-primary after:!bg-primary transition-colors"
              >
                {mod.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: appleEase }}
          >
            <TabsContent value={activeTab} forceMount>
              <ModuleContent mod={activeMod} />
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  );
}

/* ── Main Component ── */
export default function FeaturedWork() {
  return (
    <section id="work" className="py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12">
          <TextReveal
            text="Featured Work"
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

        {/* Project Cards */}
        <div className="space-y-16">
          {featuredWorkData.map((project, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                ease: appleEase,
              }}
              className="glass p-4 sm:p-6 space-y-5"
            >
              {/* Header: Title + Role badge + View Project */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl sm:text-3xl font-bold gradient-text">
                    {project.title}
                  </h3>
                  {project.url && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="shrink-0 gap-1.5 text-primary border-primary/30 hover:bg-primary/10 hover:text-primary"
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
                  )}
                </div>
                <p className="text-muted-foreground">
                  {project.subtitle}
                </p>
                <Badge
                  variant="outline"
                  className="w-fit text-xs bg-primary/[0.03] border-primary/15 text-primary"
                >
                  {project.role}
                </Badge>
              </div>

              {/* Browser Mockup */}
              <motion.div
                whileHover={{ y: -4, scale: 1.005 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="rounded-xl"
              >
                <BrowserMockup
                  image={project.image}
                  video={project.video}
                  title={project.title}
                  gradient={project.gradient}
                  url={project.url}
                />
              </motion.div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed text-sm max-w-3xl">
                {project.description}
              </p>

              {/* Metrics */}
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

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2">
                {project.techTags.map((tag, tIndex) => (
                  <motion.div
                    key={tIndex}
                    whileHover={{ scale: 1.05, y: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Badge
                      variant="outline"
                      className="bg-primary/[0.03] border-primary/15 text-primary hover:bg-primary/[0.06] hover:border-primary/25 transition-colors text-xs"
                    >
                      {tag}
                    </Badge>
                  </motion.div>
                ))}
              </div>

              {/* Sub-modules (tabs) — only for projects with modules */}
              {project.modules && project.modules.length > 0 && (
                <ModuleTabs modules={project.modules} />
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
