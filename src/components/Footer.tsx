"use client";

import { personalInfo } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="pb-6 pt-2">
      <p className="text-xs text-muted-foreground text-center">
        &copy; {new Date().getFullYear()} {personalInfo.name}
      </p>
    </footer>
  );
}
