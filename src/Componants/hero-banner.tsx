"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import banner from "@/Assets/banner.png";

export default function HeroSection() {
  function scrollToLibrary() {
    document.getElementById("library")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="hero rounded-box border border-base-300 bg-base-100">
      <div className="hero-content w-full max-w-none flex-col justify-between gap-8 px-6 py-10 sm:px-10 md:flex-row lg:px-14 lg:py-14">
        <div className="w-full md:w-3/5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Workout Library
          </p>
          <h1 className="mt-4 font-oswald text-4xl font-bold uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Train with intent. Log every set.
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-base-content/60">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <button
            type="button"
            onClick={scrollToLibrary}
            className="btn btn-primary mt-8 text-xs uppercase tracking-wider"
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
      </div>
    </section>
  );
}
