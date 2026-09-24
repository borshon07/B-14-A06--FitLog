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
    <article className="flex flex-col gap-4 rounded-2xl border border-line bg-card p-4 sm:flex-row sm:items-center sm:justify-between sm:p-[17px]">
      <div
        className={`flex min-w-0 items-center gap-3 sm:gap-4 ${
          done ? "opacity-60" : ""
        }`}
      >
        <div className="h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-raised sm:h-20 sm:w-36">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={workout.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-col gap-0.5">
          <h2 className="break-words font-oswald text-base font-bold uppercase leading-6 tracking-[0.4px] text-fg">
            {workout.name}
          </h2>
          <p className="text-xs font-semibold text-muted">{workout.equipment}</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1.5 text-xs text-soft">
            {stats.map(({ Icon, text }) => (
              <span key={text} className="flex items-center gap-1.5">
                <Icon size={14} aria-hidden="true" className="text-accent-text" />
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 sm:justify-end">
        <Link
          href={`/workouts/${workout.id}`}
          className="inline-flex h-[34px] items-center rounded-full border border-line-strong px-[18px] text-xs text-fg transition hover:border-muted"
        >
          View Details
        </Link>

        {mode === "plan" && (
          <button
            type="button"
            onClick={onToggleDone}
            aria-pressed={done}
            className={`inline-flex h-8 items-center gap-1.5 rounded-full px-4 text-xs font-semibold transition ${
              done
                ? "border border-accent-text text-accent-text hover:bg-accent-soft"
                : "bg-accent text-accent-ink hover:brightness-95"
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
          className="rounded-md p-1.5 text-muted transition hover:text-fg"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}