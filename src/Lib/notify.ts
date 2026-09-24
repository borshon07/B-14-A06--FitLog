import type { CSSProperties } from "react";
import { toast } from "sonner";

const success: CSSProperties = {
  background: "rgb(204,255,0)",
  color: "rgb(15,17,21)",
  border: "1px solid rgb(204,255,0)",
  fontWeight: 600,
};

const danger: CSSProperties = {
  background: "rgb(239,68,68)",
  color: "rgb(255,255,255)",
  border: "1px solid rgb(239,68,68)",
  fontWeight: 600,
};

const neutral: CSSProperties = {
  background: "rgb(31,36,45)",
  color: "rgb(255,255,255)",
  border: "1px solid rgb(55,65,81)",
  fontWeight: 600,
};

const DURATION = 2500;

export const notify = {
  done: (name: string) =>
    toast.success(`${name} marked as done`, { style: success, duration: DURATION }),

  undone: (name: string) =>
    toast(`${name} marked as not done`, { style: neutral, duration: DURATION }),

  added: (name: string) =>
    toast.success(`${name} added to today's plan`, {
      style: success,
      duration: DURATION,
    }),

  saved: (name: string) =>
    toast.success(`${name} saved for later`, { style: success, duration: DURATION }),

  removed: (name: string, from: "plan" | "saved") =>
    toast.error(
      `${name} removed from ${from === "plan" ? "today's plan" : "saved"}`,
      { style: danger, duration: DURATION }
    ),

  error: (message: string) =>
    toast.error(message, { style: danger, duration: DURATION }),
};