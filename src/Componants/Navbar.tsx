"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/Assets/logo.png";
import ThemeToggle from "@/Componants/ThemeToggle";

interface NavbarProps {
  planCount?: number;
  savedCount?: number;
}

const navLinks = [
  { href: "/", label: "Workouts" },
  { href: "/Myplan", label: "My Plan" },
];

export default function Navbar({ planCount = 0, savedCount = 0 }: NavbarProps) {
  const pathname = usePathname();

  // Ekoi page e thakle navigate na kore upore smooth scroll korbe
  function handleLinkClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (pathname === href) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-nav backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-2 px-4 sm:h-[80px] sm:gap-4 sm:px-6">
        <Link
          href="/"
          aria-label="FitLog home"
          onClick={(event) => handleLinkClick(event, "/")}
          className="flex shrink-0 items-center gap-2.5"
        >
          <Image
            src={logo}
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />
          <span className="hidden font-oswald text-[18px] font-bold uppercase tracking-[0.9px] text-fg sm:inline">
            FitLog
          </span>
        </Link>

        <nav className="flex items-center">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/" || pathname?.startsWith("/workouts/")
                : pathname === link.href ||
                  pathname?.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(event) => handleLinkClick(event, link.href)}
                className={
                  isActive
                    ? "whitespace-nowrap rounded-full bg-pill px-2.5 py-[6px] text-[12px] font-semibold text-accent-text sm:px-4"
                    : "whitespace-nowrap px-2.5 py-[5.5px] text-[12px] font-medium text-muted transition-colors hover:text-fg sm:px-4"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
          <Link
            href="/Myplan"
            aria-label={`My plan: ${planCount} planned, ${savedCount} saved`}
            onClick={(event) => handleLinkClick(event, "/Myplan")}
            className="group flex items-center gap-3 sm:gap-6"
          >
            <div className="flex items-center gap-2">
              <span className="hidden text-[12px] font-medium text-soft transition-colors group-hover:text-fg sm:inline">
                Plan
              </span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-accent-ink">
                {planCount}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden text-[12px] font-medium text-muted transition-colors group-hover:text-fg sm:inline">
                Saved
              </span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-line-strong text-[11px] font-medium text-soft">
                {savedCount}
              </span>
            </div>
          </Link>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}