"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { usePlan } from "@/AllPlan/myplan";
import { notify } from "@/Lib/notify";
import { filterWorkouts } from "@/Lib/filterWorkouts";
import workoutsData from "@/fitdata.json";
import type { Workout } from "@/types/fitTypes";
import SearchBar from "@/Componants/SearchBar";
import WorkoutRow, {
  type Tab,
} from "@/Componants/WorkoutCardLoad/WorkoutRow";
import PlanEmptyState from "@/Componants/MyplanViewShow/PlanEmptyState";

const workouts = workoutsData as Workout[];

const sorters = {
  duration: (a: Workout, b: Workout) => a.duration - b.duration,
  calories: (a: Workout, b: Workout) => b.caloriesBurned - a.caloriesBurned,
  rating: (a: Workout, b: Workout) => b.rating - a.rating,
};

type SortKey = keyof typeof sorters;

const sortLabels: Record<SortKey, string> = {
  duration: "Duration",
  calories: "Calories",
  rating: "Rating",
};

const tabs: { key: Tab; label: string }[] = [
  { key: "plan", label: "Today's Plan" },
  { key: "saved", label: "Saved" },
];

function findWorkouts(ids: number[]): Workout[] {
  return ids
    .map((id) => workouts.find((workout) => workout.id === id))
    .filter((workout): workout is Workout => Boolean(workout));
}

export default function MyPlanView() {
  const {
    ready,
    planIds,
    savedIds,
    isDone,
    togglePlan,
    toggleSaved,
    toggleDone,
  } = usePlan();

  const [tab, setTab] = useState<Tab>("plan");
  const [sortKey, setSortKey] = useState<SortKey>("duration");
  const [query, setQuery] = useState("");

  const planWorkouts = findWorkouts(planIds);
  const source = tab === "plan" ? planWorkouts : findWorkouts(savedIds);
  const visible = filterWorkouts(source, query).sort(sorters[sortKey]);

  const sum = (pick: (workout: Workout) => number) =>
    planWorkouts.reduce((total, workout) => total + pick(workout), 0);

  const metrics = [
    { label: "Exercises", value: planWorkouts.length },
    { label: "Minutes", value: sum((workout) => workout.duration) },
    { label: "Calories", value: sum((workout) => workout.caloriesBurned) },
  ];

  function handleToggleDone(workout: Workout) {
    const wasDone = isDone(workout.id);

    toggleDone(workout.id);

    if (wasDone) {
      notify.undone(workout.name);
    } else {
      notify.done(workout.name);
    }
  }

  function handleRemove(workout: Workout) {
    if (tab === "plan") {
      togglePlan(workout.id);
    } else {
      toggleSaved(workout.id);
    }

    notify.removed(workout.name, tab);
  }

  return (
    <main className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-6 py-10 sm:px-12">
      <section className="flex flex-col gap-2">
        <h1 className="font-oswald text-3xl font-bold uppercase leading-9 tracking-[-0.75px] text-fg">
          My Plan
        </h1>
        <p className="text-sm text-muted">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 rounded-2xl border border-line bg-card px-[25px] pb-[25px] pt-[33px] sm:grid-cols-3 sm:gap-0">
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            className={
              index === 0 ? "sm:pr-6" : "sm:border-l sm:border-line sm:pl-8"
            }
          >
            <p className="pb-1 text-xs text-muted">{metric.label}</p>
            <p
              className={`font-oswald text-4xl font-bold leading-10 ${
                index === 0 ? "text-accent-text" : "text-fg"
              }`}
            >
              {metric.value}
            </p>
          </div>
        ))}
      </section>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-1 rounded-xl border border-line bg-card p-[5px]">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              aria-pressed={tab === key}
              className={`rounded-lg border px-4 py-1.5 text-xs ${
                tab === key
                  ? "border-line bg-raised font-bold text-fg"
                  : "border-transparent text-muted transition hover:text-fg"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
          <SearchBar
            value={query}
            onChange={setQuery}
            label="Search your lifts by name or tag"
          />

          <div className="flex items-center gap-3">
            <label htmlFor="sort-by" className="text-xs text-muted">
              Sort By
            </label>
            <div className="relative">
              <select
                id="sort-by"
                value={sortKey}
                onChange={(event) => setSortKey(event.target.value as SortKey)}
                className="h-[34px] cursor-pointer appearance-none rounded-[9px] border border-line bg-card pl-3 pr-8 text-xs text-fg"
              >
                {(Object.keys(sortLabels) as SortKey[]).map((key) => (
                  <option key={key} value={key} className="bg-card text-fg">
                    {sortLabels[key]}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                aria-hidden="true"
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted"
              />
            </div>
          </div>
        </div>
      </div>

      <section className="flex min-h-[120px] flex-col gap-4">
        {ready && source.length === 0 && <PlanEmptyState tab={tab} />}

        {ready && source.length > 0 && visible.length === 0 && (
          <p className="rounded-xl border border-dashed border-dash bg-empty px-4 py-12 text-center text-sm text-muted">
            No lifts match &quot;{query}&quot;.
          </p>
        )}

        {ready &&
          visible.map((workout) => (
            <WorkoutRow
              key={workout.id}
              workout={workout}
              mode={tab}
              done={isDone(workout.id)}
              onToggleDone={() => handleToggleDone(workout)}
              onRemove={() => handleRemove(workout)}
            />
          ))}
      </section>
    </main>
  );
}