import type { Workout } from "@/types/fitTypes";

// Name ba muscle group (tag) er ongsho milleo match hobe, boro-choto hater farak nai
export function filterWorkouts(list: Workout[], query: string): Workout[] {
  const term = query.trim().toLowerCase();

  if (!term) {
    return [...list];
  }

  return list.filter(
    (workout) =>
      workout.name.toLowerCase().includes(term) ||
      workout.muscleGroups.some((group) => group.toLowerCase().includes(term))
  );
}