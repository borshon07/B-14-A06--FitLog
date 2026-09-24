"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import banner from "@/Assets/banner.png";

export default function HeroSection() {
  function scrollToLibrary() {
    document.getElementById("library")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="grid items-center gap-8 overflow-hidden rounded-2xl border border-line bg-card px-6 py-10 sm:px-10 md:grid-cols-[3fr_2fr] lg:px-14 lg:py-14">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-text">
          Workout Library
        </p>
        <h1 className="mt-4 font-oswald text-4xl font-bold uppercase leading-[1.05] tracking-tight text-fg sm:text-5xl lg:text-6xl">
          Train with intent. Log every set.
        </h1>
        <p className="mt-5 max-w-md text-base leading-7 text-muted">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
          into today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        <button
          type="button"
          onClick={scrollToLibrary}
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-xs font-bold uppercase tracking-wider text-accent-ink transition hover:brightness-95"
        >
          <ArrowDown size={14} aria-hidden="true" />
          Browse workouts
        </button>
      </div>

      <Image
        src={banner}
        alt="Illustration of a lifter on a training machine"
        priority
        className="mx-auto h-auto max-h-72 w-auto object-contain"
      />
    </section>
  );
}