import Link from "next/link";
import type { Tab } from "@/Componants/WorkoutCardLoad/WorkoutRow";

export default function PlanEmptyState({ tab }: { tab: Tab }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-box border border-dashed border-base-300 bg-base-100 px-4 py-24 text-center">
      <h2 className="pb-2 font-oswald text-xl font-bold uppercase tracking-wide">
        Nothing here yet
      </h2>
      <p className="max-w-sm pb-6 text-xs text-base-content/60">
        {tab === "plan"
          ? "Browse the library and add a lift to get today moving."
          : "Save a lift from its details page and it will show up here."}
      </p>
      <Link href="/" className="btn btn-primary rounded-full text-md font-bold hover:!bg-[#bf9c0f] hover:!border-[#126e0b] hover:!text-black">
        Go to workouts
      </Link>
    </div>
  );
}