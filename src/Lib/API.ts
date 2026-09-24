import type { Workout } from "@/types/fitTypes";

// Env na thakle "" hobe, tokhon /api/workouts shorashori current site e jabe
const BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

export async function fetchWorkouts(): Promise<Workout[]> {
  const res = await fetch(`${BASE_URL}/api/workouts`);

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  return res.json();
}