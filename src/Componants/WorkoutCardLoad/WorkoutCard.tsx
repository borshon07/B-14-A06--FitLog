import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import type { Workout } from "@/types/fitTypes";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  const {
    id,
    name,
    image,
    muscleGroups,
    equipment,
    duration,
    caloriesBurned,
    rating,
  } = workout;

  return (
    <Link
      href={`/workouts/${id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card transition hover:border-accent-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text"
    >
      <div className="h-[180px] w-full overflow-hidden bg-raised">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <ul className="flex flex-wrap gap-2">
          {muscleGroups.map((group) => (
            <li
              key={group}
              className="rounded-full bg-accent-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-text"
            >
              {group}
            </li>
          ))}
        </ul>

        <h3 className="mt-3 font-oswald text-xl font-bold uppercase leading-7 text-fg">
          {name}
        </h3>

        <p className="mt-1 text-sm text-muted">{equipment}</p>

        <div className="mt-auto flex items-center justify-between border-t border-line pt-4 text-xs text-soft">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Clock size={14} aria-hidden="true" className="text-muted" />
              {duration} min
            </span>
            <span className="flex items-center gap-1.5">
              <Flame size={14} aria-hidden="true" className="text-muted" />
              {caloriesBurned} kcal
            </span>
          </div>
          <span className="flex items-center gap-1.5">
            <Star
              size={14}
              aria-hidden="true"
              fill="currentColor"
              className="text-accent-text"
            />
            {rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}