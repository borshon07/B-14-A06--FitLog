"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle light and dark theme"
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-soft transition hover:border-line-strong hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text"
    >
      <Sun size={16} aria-hidden="true" className="hidden dark:block" />
      <Moon size={16} aria-hidden="true" className="block dark:hidden" />
    </button>
  );
}