import type { Workout } from "@/types/fitTypes";

export function filterWorkouts(list: Workout[], query: string): Workout[] {
  const words = String(query ?? "")
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) {
    return list;
  }

  return list.filter((workout) => {
    const text = [String(workout.name ?? ""), ...(workout.muscleGroups ?? [])]
      .join(" ")
      .toLowerCase();

    return words.every((word) => text.includes(word));
  });
}
