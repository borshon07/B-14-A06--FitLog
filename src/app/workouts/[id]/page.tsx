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
          <div className="aspect-[4/5] w-full overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={workout.image}
              alt={workout.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <h1 className="font-oswald text-4xl font-bold uppercase leading-10 tracking-tight">
              {workout.name}
            </h1>

            <p className="mt-3 max-w-xl text-base leading-6 text-base-content/60">
              {workout.description}
            </p>

            <ul className="mt-5 flex flex-wrap gap-2.5">
              {workout.muscleGroups.map((group) => (
                <li key={group} className="badge badge-primary font-semibold">
                  {group}
                </li>
              ))}
            </ul>

            <div className="mt-7 overflow-hidden rounded-box border border-base-300 bg-base-100">
              <table className="table">
                <tbody>
                  {specs.map((spec) => (
                    <tr key={spec.label}>
                      <th className="text-xs font-bold uppercase tracking-wider text-base-content/60">
                        {spec.label}
                      </th>
                      <td className="text-right text-sm font-medium">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <section className="mt-8">
              <h2 className="text-base font-extrabold uppercase tracking-wider">
                Instructions
              </h2>

              <ol className="mt-4 flex flex-col gap-3">
                {workout.instructions.map((step, index) => (
                  <li key={step} className="flex gap-2 text-sm leading-relaxed">
                    <span className="text-base-content/60">{index + 1}.</span>
                    <span className="text-base-content/80">{step}</span>
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