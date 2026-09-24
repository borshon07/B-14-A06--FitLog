import Link from "next/link";
import type { Tab } from "@/Componants/WorkoutCardLoad/WorkoutRow";

export default function PlanEmptyState({ tab }: { tab: Tab }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-dash bg-empty px-[17px] py-[98px] text-center">
      <h2 className="pb-2 font-oswald text-xl font-bold uppercase leading-5 tracking-[0.7px] text-fg">
        Nothing here yet
      </h2>
      <p className="max-w-sm pb-6 text-xs text-muted">
        {tab === "plan"
          ? "Browse the library and add a lift to get today moving."
          : "Save a lift from its details page and it will show up here."}
      </p>
      <Link
        href="/"
        className="rounded-full bg-accent px-6 py-2.5 text-xs font-semibold tracking-[-0.3px] text-accent-ink shadow-md transition hover:brightness-95"
      >
        Go to workouts
      </Link>
    </div>
  );
}