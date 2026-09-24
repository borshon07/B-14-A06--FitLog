import Link from "next/link";
import { Check, Clock, Flame, Star, X } from "lucide-react";
import type { Workout } from "@/types/fitTypes";

export type Tab = "plan" | "saved";

interface WorkoutRowProps {
  workout: Workout;
  mode: Tab;
  done: boolean;
  onToggleDone: () => void;
  onRemove: () => void;
}

export default function WorkoutRow({
  workout,
  mode,
  done,
  onToggleDone,
  onRemove,
}: WorkoutRowProps) {
  const stats = [
    { Icon: Clock, text: `${workout.duration} min` },
    { Icon: Flame, text: `${workout.caloriesBurned} kcal` },
    { Icon: Star, text: workout.rating.toFixed(1) },
  ];

  return (
    <article className="card card-border flex-col gap-4 bg-base-100 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div
        className={`flex min-w-0 items-center gap-3 sm:gap-4 ${
          done ? "opacity-60" : ""
        }`}
      >
        <div className="h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-base-300 sm:h-20 sm:w-36">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={workout.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-col gap-0.5">
          <h2 className="break-words font-oswald text-base font-bold uppercase leading-6 tracking-wide">
            {workout.name}
          </h2>
          <p className="text-xs font-semibold text-base-content/60">
            {workout.equipment}
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1.5 text-xs text-base-content/80">
            {stats.map(({ Icon, text }) => (
              <span key={text} className="flex items-center gap-1.5">
                <Icon size={14} aria-hidden="true" className="text-accent" />
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 sm:justify-end">
        <Link
          href={`/workouts/${workout.id}`}
          className="btn btn-outline btn-sm rounded-full"
        >
          View Details
        </Link>

        {mode === "plan" && (
          <button
            type="button"
            onClick={onToggleDone}
            aria-pressed={done}
            className={`btn btn-sm rounded-full ${
              done ? "btn-outline btn-accent" : "btn-primary"
            }`}
          >
            <Check size={14} aria-hidden="true" />
            {done ? "Done" : "Mark as Done"}
          </button>
        )}

        <button
          type="button"
          onClick={onRemove}
          aria-label={
            mode === "plan" ? "Remove from today's plan" : "Remove from saved"
          }
          className="btn btn-ghost btn-circle btn-sm"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}