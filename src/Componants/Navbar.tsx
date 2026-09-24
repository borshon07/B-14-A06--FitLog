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

  function handleLinkClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (pathname === href) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-base-300 bg-base-100/90 backdrop-blur-sm">
      <div className="navbar mx-auto min-h-16 max-w-[1280px] gap-2 px-4 sm:min-h-20 sm:px-6">
        <div className="navbar-start">
          <Link
            href="/"
            aria-label="FitLog home"
            onClick={(event) => handleLinkClick(event, "/")}
            className="flex items-center gap-2.5"
          >
            <Image
              src={logo}
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
            <span className="hidden font-oswald text-lg font-bold uppercase tracking-wider sm:inline">
              FitLog
            </span>
          </Link>
        </div>

        <nav className="navbar-center gap-1">
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
                className={`btn btn-sm rounded-full text-xs ${
                  isActive
                    ? "btn-soft btn-accent"
                    : "btn-ghost text-base-content/60"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="navbar-end gap-1 sm:gap-3">
          <Link
            href="/Myplan"
            aria-label={`My plan: ${planCount} planned, ${savedCount} saved`}
            onClick={(event) => handleLinkClick(event, "/Myplan")}
            className="btn btn-ghost btn-sm gap-2 text-xs"
          >
            <span className="hidden sm:inline">Plan</span>
            <span className="badge badge-primary badge-sm h-5 w-5 rounded-full p-0 font-bold">
              {planCount}
            </span>
            <span className="hidden text-base-content/60 sm:inline">Saved</span>
            <span className="badge badge-outline badge-sm h-5 w-5 rounded-full p-0">
              {savedCount}
            </span>
          </Link>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
