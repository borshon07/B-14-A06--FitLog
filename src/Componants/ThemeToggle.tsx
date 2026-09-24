"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() =>
        setTheme(resolvedTheme === "fitlog-dark" ? "fitlog-light" : "fitlog-dark")
      }
      aria-label="Toggle light and dark theme"
      className="btn btn-ghost btn-circle btn-sm"
    >
      <Sun size={16} aria-hidden="true" className="hidden dark:block" />
      <Moon size={16} aria-hidden="true" className="block dark:hidden" />
    </button>
  );
}