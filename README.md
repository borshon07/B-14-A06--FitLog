# FitLog

A dark, no-nonsense workout tracker built for people who just want to pick a lift, log it, and move on — no fluff, no 50-tab spreadsheet.

I built this because most fitness apps either try to do too much (social feeds, AI coaches, subscription walls) or too little (a plain checklist). FitLog sits in the middle — a clean workout library, a daily plan you actually build yourself, and a "saved for later" list so good exercises don't get lost in the scroll.

## Tech Stack

- **Next.js** (App Router) — routing, API routes, server/client components
- **TypeScript** — because untyped state management is a nightmare at 1 AM
- **Tailwind CSS v4** — CSS-first config, no more juggling a giant config file
- **DaisyUI** — theming (dark/light) on top of Tailwind
- **next-themes** — theme persistence across reloads
- **Sonner** — toast notifications for instant feedback on every action

## Features

1. **Workout Library** — Browse a full set of exercises with muscle group tags, equipment needed, difficulty, and quick stats (duration, calories, rating) — all pulled from a simple API route so it's easy to swap for a real database later.

2. **Today's Plan** — Add any workout straight into your plan for the day. It's not a rigid program — it's just *your* list, built one lift at a time.

3. **Save for Later** — Found something you want to try eventually but not today? Save it separately from your active plan, no commitment required.

4. **Dark / Light Theme** — Defaults to dark (because gym apps should look like gym apps), but switches cleanly to light mode without breaking the accent colors.

5. **Instant Feedback Everywhere** — Every action (marked done, added to plan, removed, saved) triggers a toast notification, so you always know the app actually registered what you just did.