import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thamizhanban — Full Stack Developer",
  description:
    "Full Stack Developer specializing in React, Next.js, and TypeScript. Building production SaaS products from scratch — frontend architecture, UI/UX design, and AI integrations.",
  keywords: [
    "Thamizhanban",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Frontend Engineer",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Thamizhanban" }],
  openGraph: {
    title: "Thamizhanban — Full Stack Developer",
    description:
      "Building production SaaS products from scratch — frontend architecture, UI/UX design, and AI integrations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
