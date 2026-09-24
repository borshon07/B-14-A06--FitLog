"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import SearchBar from "@/Componants/SearchBar";
import WorkoutCard from "@/Componants/WorkoutCardLoad/WorkoutCard";
import { fetchWorkouts } from "@/Lib/API";
import { filterWorkouts } from "@/Lib/filterWorkouts";
import type { Workout } from "@/types/fitTypes";

const gridClass = "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3";

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const data = await fetchWorkouts();

        if (active) setWorkouts(data);
      } catch (error) {
        console.error("Failed to load workouts:", error);

        if (active) setFailed(true);
      }
    }

    load();

    return () => {
      active = false;
    };
  }, []);

  const loading = workouts === null && !failed;
  const filtered = workouts ? filterWorkouts(workouts, query) : [];

  return (
    <section id="library" className="w-full scroll-mt-24 py-12 sm:py-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-oswald text-3xl font-bold uppercase tracking-wide text-fg">
            The Library
          </h2>
          <p className="mt-2 text-sm text-muted">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <SearchBar
          value={query}
          onChange={setQuery}
          label="Search workouts by name or tag"
        />
      </div>

      {loading && (
        <div role="status" aria-live="polite">
          <div className="mb-6 flex items-center gap-2 text-sm text-muted">
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            Loading workouts...
          </div>
          <div className={gridClass}>
            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={index}
                className="h-[368px] animate-pulse rounded-2xl border border-line bg-card"
              />
            ))}
          </div>
        </div>
      )}

      {failed && (
        <div className="flex flex-col items-start gap-3">
          <p className="text-muted">Could not load workouts. Please try again.</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-full border border-line-strong px-4 py-2 text-xs text-fg transition hover:border-muted"
          >
            Retry
          </button>
        </div>
      )}

      {workouts && workouts.length === 0 && (
        <p className="text-muted">No workouts found.</p>
      )}

      {workouts && workouts.length > 0 && filtered.length === 0 && (
        <p className="rounded-xl border border-dashed border-dash bg-empty px-4 py-12 text-center text-sm text-muted">
          No workouts match &quot;{query}&quot;.
        </p>
      )}

      {filtered.length > 0 && (
        <div className={gridClass}>
          {filtered.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}