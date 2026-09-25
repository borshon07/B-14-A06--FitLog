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

  // Plan full hole notun lift add kora jabe na, kintu plan e thakle remove korte deoa hobe
  const planFull = !inPlan && planIds.length >= MAX_PLAN_ITEMS;

  function handlePlanClick() {
    const done = togglePlan(workoutId);

    if (!done) {
      notify.error(
        `Your plan is full. You can add up to ${MAX_PLAN_ITEMS} lifts a day.`,
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
      <div className="flex flex-wrap items-center gap-4 ">
        {/* Plan button */}
        <button
          type="button"
          onClick={handlePlanClick}
          disabled={planFull}
          aria-pressed={inPlan}
          className={`btn rounded-xl transition-colors ${
            inPlan
              ? "btn-outline btn-accent hover:!bg-[#c2f800] hover:!text-black"
              : "btn-primary hover:!bg-[#27c490] hover:!text-black "
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

        {/* Save button */}
        <button
          type="button"
          onClick={handleSaveClick}
          aria-pressed={saved}
          className="btn btn-outline rounded-xl transition-colors hover:!bg-[#1a2312] hover:!border-[#09e0dd] hover:!text-[#c2f800]"
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
        <p role="status" className="mt-3 text-sm text-base-content/60">
          Your plan already has {MAX_PLAN_ITEMS} lifts. Remove one from My Plan
          to add this.
        </p>
      )}
    </div>
  );
}
