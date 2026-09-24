import { notFound } from "next/navigation";
import NavbarContainer from "@/Componants/NavbarContainer";
import WorkoutActions from "@/Componants/WorkoutCardLoad/WorkoutActions";
import workoutsData from "@/fitdata.json";
import type { Workout } from "@/types/fitTypes";

const workouts = workoutsData as Workout[];

export function generateStaticParams() {
  return workouts.map((workout) => ({ id: String(workout.id) }));
}

interface WorkoutDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkoutDetailPage({
  params,
}: WorkoutDetailPageProps) {
  const { id } = await params;
  const workout = workouts.find((item) => String(item.id) === id);

  if (!workout) {
    notFound();
  }

  const specs = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: String(workout.sets) },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: workout.rating.toFixed(1) },
  ];

  return (
    <>
      <NavbarContainer />

      <main className="mx-auto w-full max-w-[1280px] px-6 py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line bg-card shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={workout.image}
              alt={workout.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <h1 className="font-oswald text-4xl font-bold uppercase leading-10 tracking-tight text-fg">
              {workout.name}
            </h1>

            <p className="mt-3 max-w-xl text-base leading-6 text-muted">
              {workout.description}
            </p>

            <ul className="mt-5 flex flex-wrap gap-2.5">
              {workout.muscleGroups.map((group) => (
                <li
                  key={group}
                  className="rounded-full bg-accent px-3.5 py-1 text-xs font-semibold text-accent-ink"
                >
                  {group}
                </li>
              ))}
            </ul>

            <dl className="mt-7 overflow-hidden rounded-2xl border border-line bg-card">
              {specs.map((spec, index) => (
                <div
                  key={spec.label}
                  className={`flex items-center justify-between gap-4 px-6 py-3.5 ${
                    index > 0 ? "border-t border-line" : ""
                  }`}
                >
                  <dt className="text-xs font-bold uppercase tracking-wider text-muted">
                    {spec.label}
                  </dt>
                  <dd className="text-right text-sm font-medium text-fg">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>

            <section className="mt-8">
              <h2 className="text-base font-extrabold uppercase tracking-wider text-fg">
                Instructions
              </h2>

              <ol className="mt-4 flex flex-col gap-3">
                {workout.instructions.map((step, index) => (
                  <li key={step} className="flex gap-2 text-sm leading-relaxed">
                    <span className="text-muted">{index + 1}.</span>
                    <span className="text-soft">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <div className="mt-9">
              <WorkoutActions workoutId={workout.id} workoutName={workout.name} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}