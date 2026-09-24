"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export const MAX_PLAN_ITEMS = 5;

const STORAGE_KEY = "fitlog-state";

interface StoredState {
  planIds: number[];
  savedIds: number[];
  doneIds: number[];
}

interface PlanContextValue {
  ready: boolean;
  planIds: number[];
  savedIds: number[];
  doneIds: number[];
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isDone: (id: number) => boolean;
  togglePlan: (id: number) => boolean;
  toggleSaved: (id: number) => void;
  toggleDone: (id: number) => void;
}

const EMPTY_STATE: StoredState = { planIds: [], savedIds: [], doneIds: [] };

const listeners = new Set<() => void>();
let memoryState: StoredState | null = null;

function onlyNumbers(value: unknown): number[] {
  return Array.isArray(value)
    ? value.filter((item): item is number => typeof item === "number")
    : [];
}

function loadFromStorage(): StoredState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return EMPTY_STATE;
    }

    const parsed = JSON.parse(raw);
    const planIds = onlyNumbers(parsed.planIds).slice(0, MAX_PLAN_ITEMS);

    return {
      planIds,
      savedIds: onlyNumbers(parsed.savedIds),
      doneIds: onlyNumbers(parsed.doneIds).filter((id) => planIds.includes(id)),
    };
  } catch {
    return EMPTY_STATE;
  }
}

function getSnapshot(): StoredState {
  if (memoryState === null) {
    memoryState = loadFromStorage();
  }

  return memoryState;
}

function getServerSnapshot(): StoredState {
  return EMPTY_STATE;
}

function updateState(next: StoredState) {
  memoryState = next;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage blocked hole shudhu memory te thakbe
  }

  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  // onno tab e change hole ei tab o update hobe
  function handleStorage(event: StorageEvent) {
    if (event.key === STORAGE_KEY) {
      memoryState = loadFromStorage();
      listener();
    }
  }

  window.addEventListener("storage", handleStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function subscribeToNothing() {
  return () => {};
}

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false
  );
  const { planIds, savedIds, doneIds } = state;

  const isInPlan = useCallback((id: number) => planIds.includes(id), [planIds]);
  const isSaved = useCallback((id: number) => savedIds.includes(id), [savedIds]);
  const isDone = useCallback((id: number) => doneIds.includes(id), [doneIds]);

  // Plan e add hole true, plan full hole false return kore
  const togglePlan = useCallback((id: number) => {
    const current = getSnapshot();

    if (current.planIds.includes(id)) {
      updateState({
        ...current,
        planIds: current.planIds.filter((item) => item !== id),
        doneIds: current.doneIds.filter((item) => item !== id),
      });
      return true;
    }

    if (current.planIds.length >= MAX_PLAN_ITEMS) {
      return false;
    }

    updateState({ ...current, planIds: [...current.planIds, id] });
    return true;
  }, []);

  const toggleSaved = useCallback((id: number) => {
    const current = getSnapshot();

    updateState({
      ...current,
      savedIds: current.savedIds.includes(id)
        ? current.savedIds.filter((item) => item !== id)
        : [...current.savedIds, id],
    });
  }, []);

  const toggleDone = useCallback((id: number) => {
    const current = getSnapshot();

    if (!current.planIds.includes(id)) {
      return;
    }

    updateState({
      ...current,
      doneIds: current.doneIds.includes(id)
        ? current.doneIds.filter((item) => item !== id)
        : [...current.doneIds, id],
    });
  }, []);

  const value = useMemo(
    () => ({
      ready,
      planIds,
      savedIds,
      doneIds,
      isInPlan,
      isSaved,
      isDone,
      togglePlan,
      toggleSaved,
      toggleDone,
    }),
    [
      ready,
      planIds,
      savedIds,
      doneIds,
      isInPlan,
      isSaved,
      isDone,
      togglePlan,
      toggleSaved,
      toggleDone,
    ]
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }

  return context;
}