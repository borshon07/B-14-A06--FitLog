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
      className="card group h-full overflow-hidden border border-base-300 bg-base-100 transition hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <figure className="h-[180px] w-full bg-base-300">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </figure>

      <div className="card-body flex-1 gap-0 p-5">
        <ul className="flex flex-wrap gap-2">
          {muscleGroups.map((group) => (
            <li
              key={group}
              className="badge badge-soft badge-accent badge-sm font-bold uppercase tracking-wider"
            >
              {group}
            </li>
          ))}
        </ul>

        <h3 className="card-title mt-3 font-oswald text-xl uppercase leading-7">
          {name}
        </h3>

        <p className="mt-1 text-sm text-base-content/60">{equipment}</p>

        <div className="mt-auto flex items-center justify-between border-t border-base-300 pt-4 text-xs text-base-content/80">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Clock size={14} aria-hidden="true" className="opacity-60" />
              {duration} min
            </span>
            <span className="flex items-center gap-1.5">
              <Flame size={14} aria-hidden="true" className="opacity-60" />
              {caloriesBurned} kcal
            </span>
          </div>
          <span className="flex items-center gap-1.5">
            <Star
              size={14}
              aria-hidden="true"
              fill="currentColor"
              className="text-accent"
            />
            {rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}