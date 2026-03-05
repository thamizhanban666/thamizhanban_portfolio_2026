"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown, ChevronUp, Palette, Check, RotateCcw } from "lucide-react";

/*
  ── Color Palette Definitions ──────────────────────────────────────
  Each palette defines the CSS variables that get overridden at runtime.
  The "gradient" array defines the 3 stops for .gradient-text.
  The "glow" is the oklch color used in glow-effect, grid-bg, scrollbar.
*/

interface PaletteColors {
  light: Record<string, string>;
  dark: Record<string, string>;
  gradient: [string, string, string];
  glow: string;
}

interface PaletteOption {
  id: string;
  name: string;
  preview: string;
  colors: PaletteColors;
}

/**
 * Helper to generate a full palette from just the key color parameters.
 * - hue: OKLCH hue angle (0-360)
 * - chromaLight / lightnessLight: for light mode primary
 * - chromaDark / lightnessDark: for dark mode primary
 * - bgHue: hue for dark-mode background tints (defaults to 260 cool gray)
 * - fgOnPrimary: "light" | "dark" — whether text on the primary button is white or dark
 */
function makePalette(
  id: string,
  name: string,
  preview: string,
  hue: number,
  opts?: {
    chromaLight?: number;
    lightnessLight?: number;
    chromaDark?: number;
    lightnessDark?: number;
    bgHue?: number;
    fgOnPrimary?: "light" | "dark";
    gradientSpread?: number;
  }
): PaletteOption {
  const cl = opts?.chromaLight ?? 0.19;
  const ll = opts?.lightnessLight ?? 0.6;
  const cd = opts?.chromaDark ?? 0.18;
  const ld = opts?.lightnessDark ?? 0.73;
  const bgH = opts?.bgHue ?? 260;
  const fg = opts?.fgOnPrimary ?? "light";
  const gs = opts?.gradientSpread ?? 10;

  const fgLight = fg === "light" ? "oklch(1 0 0)" : `oklch(0.15 0.02 ${hue})`;
  const fgDark = fg === "light" ? `oklch(0.1 0.02 ${hue})` : `oklch(0.15 0.02 ${hue})`;

  return {
    id,
    name,
    preview,
    colors: {
      light: {
        "--primary": `oklch(${ll} ${cl} ${hue})`,
        "--primary-foreground": fgLight,
        "--ring": `oklch(${ll} ${cl} ${hue})`,
        "--secondary": `oklch(0.955 0.015 ${hue})`,
        "--secondary-foreground": `oklch(0.2 0.02 ${hue})`,
        "--accent": `oklch(0.955 0.015 ${hue})`,
        "--accent-foreground": `oklch(0.2 0.02 ${hue})`,
        "--muted": `oklch(0.96 0.008 ${hue})`,
        "--border": `oklch(0.91 0.01 ${hue})`,
        "--input": `oklch(0.91 0.01 ${hue})`,
      },
      dark: {
        "--primary": `oklch(${ld} ${cd} ${hue})`,
        "--primary-foreground": fgDark,
        "--ring": `oklch(${ld} ${cd} ${hue})`,
        "--secondary": `oklch(0.16 0.012 ${bgH})`,
        "--secondary-foreground": `oklch(0.9 0.005 ${hue})`,
        "--accent": `oklch(0.16 0.012 ${bgH})`,
        "--accent-foreground": `oklch(0.9 0.005 ${hue})`,
        "--muted": `oklch(0.16 0.01 ${bgH})`,
        "--border": `oklch(0.3 0.015 ${bgH})`,
        "--input": `oklch(0.3 0.015 ${bgH})`,
      },
      gradient: [
        `oklch(${ld} ${cd} ${hue})`,
        `oklch(${ld + 0.05} ${cd - 0.02} ${hue + gs})`,
        `oklch(${ld + 0.1} ${cd - 0.05} ${hue + gs * 2})`,
      ],
      glow: `oklch(${ld} ${cd} ${hue})`,
    },
  };
}

// ── All Palettes ──────────────────────────────────────────────────

const palettes: PaletteOption[] = [
  // ─── Reds & Pinks ───
  makePalette("crimson", "Crimson", "#DC2626", 25, {
    chromaLight: 0.23, lightnessLight: 0.55, chromaDark: 0.22, lightnessDark: 0.7, bgHue: 350,
  }),
  makePalette("red", "Red", "#EF4444", 28, {
    chromaLight: 0.22, lightnessLight: 0.57, chromaDark: 0.21, lightnessDark: 0.72, bgHue: 350,
  }),
  makePalette("rose", "Rose", "#F43F5E", 15, {
    chromaLight: 0.22, lightnessLight: 0.58, chromaDark: 0.2, lightnessDark: 0.72, bgHue: 350,
  }),
  makePalette("pink", "Pink", "#EC4899", 340, {
    chromaLight: 0.22, lightnessLight: 0.58, chromaDark: 0.2, lightnessDark: 0.72, bgHue: 330,
  }),
  makePalette("hot-pink", "Hot Pink", "#FF006E", 350, {
    chromaLight: 0.24, lightnessLight: 0.55, chromaDark: 0.22, lightnessDark: 0.7, bgHue: 340,
  }),
  makePalette("magenta", "Magenta", "#E11D48", 5, {
    chromaLight: 0.24, lightnessLight: 0.55, chromaDark: 0.22, lightnessDark: 0.7, bgHue: 350, gradientSpread: 8,
  }),

  // ─── Oranges & Yellows ───
  makePalette("burnt-orange", "Burnt Orange", "#F97316", 52, {
    chromaLight: 0.19, lightnessLight: 0.65, chromaDark: 0.18, lightnessDark: 0.75, bgHue: 260,
  }),
  makePalette("tangerine", "Tangerine", "#FF8C42", 58, {
    chromaLight: 0.18, lightnessLight: 0.65, chromaDark: 0.17, lightnessDark: 0.76, bgHue: 260,
  }),
  makePalette("amber", "Amber", "#F59E0B", 75, {
    chromaLight: 0.18, lightnessLight: 0.62, chromaDark: 0.17, lightnessDark: 0.78, bgHue: 260, fgOnPrimary: "dark",
  }),
  makePalette("gold", "Gold", "#EAB308", 85, {
    chromaLight: 0.18, lightnessLight: 0.6, chromaDark: 0.17, lightnessDark: 0.8, bgHue: 80, fgOnPrimary: "dark",
  }),
  makePalette("sunset", "Sunset", "#FF6B35", 42, {
    chromaLight: 0.2, lightnessLight: 0.62, chromaDark: 0.19, lightnessDark: 0.73, bgHue: 260,
  }),
  makePalette("coral", "Coral", "#FF6B6B", 22, {
    chromaLight: 0.2, lightnessLight: 0.62, chromaDark: 0.18, lightnessDark: 0.74, bgHue: 350,
  }),
  makePalette("peach", "Peach", "#FB923C", 55, {
    chromaLight: 0.17, lightnessLight: 0.65, chromaDark: 0.16, lightnessDark: 0.77, bgHue: 260,
  }),
  makePalette("copper", "Copper", "#B87333", 60, {
    chromaLight: 0.14, lightnessLight: 0.55, chromaDark: 0.14, lightnessDark: 0.7, bgHue: 260,
  }),

  // ─── Greens ───
  makePalette("lime", "Lime", "#84CC16", 130, {
    chromaLight: 0.18, lightnessLight: 0.6, chromaDark: 0.18, lightnessDark: 0.78, bgHue: 150, fgOnPrimary: "dark",
  }),
  makePalette("green", "Green", "#22C55E", 150, {
    chromaLight: 0.18, lightnessLight: 0.58, chromaDark: 0.17, lightnessDark: 0.74, bgHue: 170,
  }),
  makePalette("emerald", "Emerald", "#10B981", 165, {
    chromaLight: 0.17, lightnessLight: 0.6, chromaDark: 0.17, lightnessDark: 0.72, bgHue: 200,
  }),
  makePalette("teal", "Teal", "#14B8A6", 175, {
    chromaLight: 0.15, lightnessLight: 0.6, chromaDark: 0.15, lightnessDark: 0.73, bgHue: 200,
  }),
  makePalette("mint", "Mint", "#34D399", 160, {
    chromaLight: 0.16, lightnessLight: 0.62, chromaDark: 0.16, lightnessDark: 0.75, bgHue: 180,
  }),
  makePalette("sage", "Sage", "#6B8F71", 145, {
    chromaLight: 0.08, lightnessLight: 0.52, chromaDark: 0.08, lightnessDark: 0.65, bgHue: 160,
  }),
  makePalette("forest", "Forest", "#166534", 155, {
    chromaLight: 0.14, lightnessLight: 0.5, chromaDark: 0.14, lightnessDark: 0.65, bgHue: 170,
  }),

  // ─── Blues & Cyans ───
  makePalette("cyan", "Cyan", "#06B6D4", 195, {
    chromaLight: 0.15, lightnessLight: 0.6, chromaDark: 0.15, lightnessDark: 0.75, bgHue: 210,
  }),
  makePalette("sky-blue", "Sky Blue", "#0EA5E9", 230, {
    chromaLight: 0.17, lightnessLight: 0.6, chromaDark: 0.17, lightnessDark: 0.73, bgHue: 240,
  }),
  makePalette("blue", "Blue", "#3B82F6", 255, {
    chromaLight: 0.2, lightnessLight: 0.55, chromaDark: 0.19, lightnessDark: 0.7, bgHue: 260,
  }),
  makePalette("electric-blue", "Electric", "#2563EB", 260, {
    chromaLight: 0.22, lightnessLight: 0.53, chromaDark: 0.2, lightnessDark: 0.68, bgHue: 265,
  }),
  makePalette("sapphire", "Sapphire", "#1D4ED8", 265, {
    chromaLight: 0.22, lightnessLight: 0.5, chromaDark: 0.2, lightnessDark: 0.65, bgHue: 270,
  }),
  makePalette("ocean", "Ocean", "#0077B6", 240, {
    chromaLight: 0.16, lightnessLight: 0.55, chromaDark: 0.16, lightnessDark: 0.7, bgHue: 250,
  }),
  makePalette("turquoise", "Turquoise", "#2EC4B6", 185, {
    chromaLight: 0.14, lightnessLight: 0.62, chromaDark: 0.14, lightnessDark: 0.75, bgHue: 200,
  }),
  makePalette("aquamarine", "Aquamarine", "#2DD4BF", 180, {
    chromaLight: 0.14, lightnessLight: 0.62, chromaDark: 0.14, lightnessDark: 0.76, bgHue: 195,
  }),
  makePalette("steel-blue", "Steel Blue", "#4682B4", 238, {
    chromaLight: 0.12, lightnessLight: 0.55, chromaDark: 0.12, lightnessDark: 0.68, bgHue: 245,
  }),

  // ─── Purples & Violets ───
  makePalette("indigo", "Indigo", "#6366F1", 275, {
    chromaLight: 0.22, lightnessLight: 0.53, chromaDark: 0.2, lightnessDark: 0.68, bgHue: 275,
  }),
  makePalette("violet", "Violet", "#7C3AED", 285, {
    chromaLight: 0.25, lightnessLight: 0.55, chromaDark: 0.2, lightnessDark: 0.7, bgHue: 275,
  }),
  makePalette("purple", "Purple", "#A855F7", 295, {
    chromaLight: 0.22, lightnessLight: 0.55, chromaDark: 0.2, lightnessDark: 0.72, bgHue: 290,
  }),
  makePalette("fuchsia", "Fuchsia", "#D946EF", 320, {
    chromaLight: 0.24, lightnessLight: 0.55, chromaDark: 0.22, lightnessDark: 0.72, bgHue: 310,
  }),
  makePalette("lavender", "Lavender", "#A78BFA", 290, {
    chromaLight: 0.16, lightnessLight: 0.58, chromaDark: 0.16, lightnessDark: 0.72, bgHue: 280,
  }),
  makePalette("plum", "Plum", "#9333EA", 300, {
    chromaLight: 0.24, lightnessLight: 0.52, chromaDark: 0.22, lightnessDark: 0.68, bgHue: 295,
  }),
  makePalette("wine", "Wine", "#881337", 355, {
    chromaLight: 0.16, lightnessLight: 0.45, chromaDark: 0.16, lightnessDark: 0.6, bgHue: 340,
  }),
  makePalette("orchid", "Orchid", "#DA70D6", 325, {
    chromaLight: 0.18, lightnessLight: 0.58, chromaDark: 0.17, lightnessDark: 0.72, bgHue: 315,
  }),

  // ─── Neutrals & Earth Tones ───
  makePalette("slate", "Slate", "#64748B", 250, {
    chromaLight: 0.03, lightnessLight: 0.5, chromaDark: 0.03, lightnessDark: 0.65, bgHue: 250,
  }),
  makePalette("zinc", "Zinc", "#71717A", 270, {
    chromaLight: 0.02, lightnessLight: 0.5, chromaDark: 0.02, lightnessDark: 0.63, bgHue: 260,
  }),
  makePalette("stone", "Stone", "#78716C", 50, {
    chromaLight: 0.02, lightnessLight: 0.5, chromaDark: 0.02, lightnessDark: 0.63, bgHue: 40,
  }),
  makePalette("warm-brown", "Warm Brown", "#A0522D", 45, {
    chromaLight: 0.12, lightnessLight: 0.5, chromaDark: 0.12, lightnessDark: 0.63, bgHue: 40,
  }),
  makePalette("sand", "Sand", "#D4A373", 65, {
    chromaLight: 0.1, lightnessLight: 0.6, chromaDark: 0.1, lightnessDark: 0.73, bgHue: 55, fgOnPrimary: "dark",
  }),
  makePalette("olive", "Olive", "#808000", 110, {
    chromaLight: 0.1, lightnessLight: 0.52, chromaDark: 0.1, lightnessDark: 0.65, bgHue: 100, fgOnPrimary: "dark",
  }),
];

const STORAGE_KEY = "portfolio-color-palette";

function applyPalette(palette: PaletteOption) {
  const root = document.documentElement;
  const isDark = root.classList.contains("dark");
  const vars = isDark ? palette.colors.dark : palette.colors.light;

  for (const [key, value] of Object.entries(vars)) {
    root.style.setProperty(key, value);
  }

  const gradientStyle = `linear-gradient(135deg, ${palette.colors.gradient[0]}, ${palette.colors.gradient[1]}, ${palette.colors.gradient[2]})`;
  let gradientSheet = document.getElementById("palette-gradient-style") as HTMLStyleElement | null;
  if (!gradientSheet) {
    gradientSheet = document.createElement("style");
    gradientSheet.id = "palette-gradient-style";
    document.head.appendChild(gradientSheet);
  }
  gradientSheet.textContent = `
    .gradient-text {
      background: ${gradientStyle} !important;
      -webkit-background-clip: text !important;
      -webkit-text-fill-color: transparent !important;
      background-clip: text !important;
    }
    .glow-effect:hover {
      box-shadow: 0 0 20px ${palette.colors.glow} / 20%, 0 0 40px ${palette.colors.glow} / 8% !important;
    }
    .grid-bg {
      background-image:
        linear-gradient(${palette.colors.glow} / 4%, transparent 1px),
        linear-gradient(90deg, ${palette.colors.glow} / 4%, transparent 1px) !important;
      background-size: 60px 60px !important;
    }
    html:not(.dark) .grid-bg {
      background-image:
        linear-gradient(${palette.colors.glow} / 6%, transparent 1px),
        linear-gradient(90deg, ${palette.colors.glow} / 6%, transparent 1px) !important;
    }
    ::-webkit-scrollbar-thumb {
      background: ${palette.colors.glow} / 30% !important;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: ${palette.colors.glow} / 60% !important;
    }
  `;
}

function clearPalette() {
  const root = document.documentElement;
  const allVars = [
    "--primary", "--primary-foreground", "--ring",
    "--secondary", "--secondary-foreground",
    "--accent", "--accent-foreground",
    "--muted", "--border", "--input",
  ];
  for (const v of allVars) {
    root.style.removeProperty(v);
  }
  const gradientSheet = document.getElementById("palette-gradient-style");
  if (gradientSheet) gradientSheet.remove();
}

// ── Group palettes by category for the UI ─────────────────────────
const groups = [
  { label: "Reds & Pinks", ids: ["crimson", "red", "rose", "pink", "hot-pink", "magenta"] },
  { label: "Oranges & Yellows", ids: ["burnt-orange", "tangerine", "amber", "gold", "sunset", "coral", "peach", "copper"] },
  { label: "Greens", ids: ["lime", "green", "emerald", "teal", "mint", "sage", "forest"] },
  { label: "Blues & Cyans", ids: ["cyan", "sky-blue", "blue", "electric-blue", "sapphire", "ocean", "turquoise", "aquamarine", "steel-blue"] },
  { label: "Purples", ids: ["indigo", "violet", "purple", "fuchsia", "lavender", "plum", "wine", "orchid"] },
  { label: "Neutrals & Earth", ids: ["slate", "zinc", "stone", "warm-brown", "sand", "olive"] },
];

export default function ColorPalettePicker() {
  const searchParams = useSearchParams();
  const [isVisible, setIsVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePalette, setActivePalette] = useState<string>("burnt-orange");

  useEffect(() => {
    setIsVisible(searchParams.has("customize"));
  }, [searchParams]);

  useEffect(() => {
    if (!isVisible) return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const palette = palettes.find((p) => p.id === saved);
      if (palette) {
        setActivePalette(saved);
        applyPalette(palette);
      }
    }
  }, [isVisible]);

  const handleThemeChange = useCallback(() => {
    const palette = palettes.find((p) => p.id === activePalette);
    if (palette) {
      setTimeout(() => applyPalette(palette), 50);
    }
  }, [activePalette]);

  useEffect(() => {
    if (!isVisible) return;
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === "class") {
          handleThemeChange();
        }
      }
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, [isVisible, handleThemeChange]);

  const selectPalette = (palette: PaletteOption) => {
    setActivePalette(palette.id);
    localStorage.setItem(STORAGE_KEY, palette.id);
    applyPalette(palette);
  };

  const resetPalette = () => {
    setActivePalette("burnt-orange");
    localStorage.removeItem(STORAGE_KEY);
    clearPalette();
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-[9999] select-none"
      style={{ fontFamily: "system-ui, sans-serif" }}
    >
      <div
        className="rounded-xl border border-white/10 shadow-2xl overflow-hidden"
        style={{
          backgroundColor: "oklch(0.12 0.01 260 / 95%)",
          backdropFilter: "blur(20px)",
          width: isCollapsed ? "auto" : "280px",
        }}
      >
        {/* Header */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4" style={{ color: "#F97316" }} />
            {!isCollapsed && (
              <span className="text-xs font-medium text-white/90">
                Color Palette ({palettes.length} options)
              </span>
            )}
          </div>
          {isCollapsed ? (
            <ChevronUp className="w-3.5 h-3.5 text-white/50" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-white/50" />
          )}
        </button>

        {/* Palette Groups */}
        {!isCollapsed && (
          <div
            className="px-3 pb-3 space-y-3 overflow-y-auto"
            style={{ maxHeight: "420px" }}
            data-lenis-prevent
          >
            {groups.map((group) => (
              <div key={group.label}>
                <p className="text-[10px] uppercase tracking-wider text-white/40 mb-1.5 font-medium">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.ids.map((id) => {
                    const palette = palettes.find((p) => p.id === id);
                    if (!palette) return null;
                    const isActive = activePalette === palette.id;
                    return (
                      <button
                        key={palette.id}
                        onClick={() => selectPalette(palette)}
                        className="group relative flex flex-col items-center gap-0.5 cursor-pointer"
                        title={palette.name}
                      >
                        <div
                          className="w-8 h-8 rounded-md transition-all duration-200 flex items-center justify-center"
                          style={{
                            backgroundColor: palette.preview,
                            boxShadow: isActive
                              ? `0 0 0 2px oklch(0.12 0.01 260), 0 0 0 3.5px ${palette.preview}`
                              : "none",
                            opacity: isActive ? 1 : 0.7,
                            transform: isActive ? "scale(1.1)" : "scale(1)",
                          }}
                        >
                          {isActive && (
                            <Check className="w-3.5 h-3.5 text-white drop-shadow-md" />
                          )}
                        </div>
                        <span className="text-[9px] text-white/50 group-hover:text-white/80 transition-colors truncate w-8 text-center">
                          {palette.name.length > 7
                            ? palette.name.slice(0, 6) + "."
                            : palette.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Reset Button */}
            <button
              onClick={resetPalette}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs text-white/50 hover:text-white/80 hover:bg-white/5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset to Default
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
