"use client";

import { Bookmark, CalendarCheck, CalendarPlus } from "lucide-react";
import { MAX_PLAN_ITEMS, usePlan } from "@/AllPlan/myplan";
import { notify } from "@/Lib/notify";

interface WorkoutActionsProps {
  workoutId: number;
  workoutName: string;
}

export default function WorkoutActions({
  workoutId,
  workoutName,
}: WorkoutActionsProps) {
  const { planIds, isInPlan, isSaved, togglePlan, toggleSaved } = usePlan();

  const inPlan = isInPlan(workoutId);
  const saved = isSaved(workoutId);

  // Plan full hole notun lift add kora jabe na, kintu already plan e thakle remove korte deoa hobe
  const planFull = !inPlan && planIds.length >= MAX_PLAN_ITEMS;

  function handlePlanClick() {
    const done = togglePlan(workoutId);

    if (!done) {
      notify.error(
        `Your plan is full. You can add up to ${MAX_PLAN_ITEMS} lifts a day.`
      );
      return;
    }

    if (inPlan) {
      notify.removed(workoutName, "plan");
    } else {
      notify.added(workoutName);
    }
  }

  function handleSaveClick() {
    toggleSaved(workoutId);

    if (saved) {
      notify.removed(workoutName, "saved");
    } else {
      notify.saved(workoutName);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={handlePlanClick}
          disabled={planFull}
          aria-pressed={inPlan}
          className={`inline-flex items-center justify-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100 ${
            inPlan
              ? "border-accent-text text-accent-text hover:bg-accent-soft"
              : "border-transparent bg-accent text-accent-ink hover:brightness-95"
          }`}
        >
          {inPlan ? (
            <CalendarCheck size={16} aria-hidden="true" />
          ) : (
            <CalendarPlus size={16} aria-hidden="true" />
          )}
          {inPlan
            ? "Added to today's plan"
            : planFull
              ? "Plan is full"
              : "Add to today's plan"}
        </button>

        <button
          type="button"
          onClick={handleSaveClick}
          aria-pressed={saved}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-line-strong px-6 py-3 text-sm font-medium text-fg transition hover:border-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text"
        >
          <Bookmark
            size={16}
            aria-hidden="true"
            fill={saved ? "currentColor" : "none"}
          />
          {saved ? "Saved" : "Save for later"}
        </button>
      </div>

      {planFull && (
        <p role="status" className="mt-3 text-sm text-muted">
          Your plan already has {MAX_PLAN_ITEMS} lifts. Remove one from My Plan
          to add this.
        </p>
      )}
    </div>
  );
}