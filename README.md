FitLog
======

A dark, no-nonsense gym companion. Pick a lift, lock it into today's plan, and keep track of what you have finished.

I built this as a Next.js practice project, working from a Figma design. All twelve workouts live in a local JSON file and are served through a small API route, so there is nothing to set up besides `npm install`.

Live demo: https://your-project.vercel.app

Tech Stack
----------

- **Next.js 16** (App Router) with **React** and **TypeScript**
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Sonner** for toast notifications
- **localStorage** to remember your plan between visits

Key Features
------------

1. **Workout library.** Twelve lifts in a responsive grid (3 columns on desktop, 2 on tablet, 1 on mobile). Each card shows the muscle groups, equipment, duration, calories and rating, and a loading skeleton appears while the data is being fetched.
2. **Detail pages.** Click any card to see the full picture: description, specs table, and step by step instructions. Unknown URLs land on a custom 404 page.
3. **Daily plan and saved list.** Add a workout to today's plan (capped at five lifts, just like the design says) or save it for later. The counters in the navbar update straight away.
4. **My Plan page.** Total exercises, minutes and calories at a glance, a Today's Plan / Saved switch, sorting by duration, calories or rating, and a Mark as Done button for each lift.
5. **Colour coded toasts.** Green for done or added, red for removed, grey for undo, so you always know what just happened. Everything is saved in the browser, so a refresh never wipes your plan.

Getting Started
---------------

```bash
git clone https://github.com/your-username/b14-a06-fit-log.git
cd b14-a06-fit-log
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

To check that a production build works:

```bash
npm run build
npm run start
```

Project Structure
-----------------

```
src/
  app/            pages, layout, 404 and the /api/workouts route
  AllPlan/        plan and saved state (React context + localStorage)
  Componants/     navbar, hero, library, cards, footer, My Plan views
  Lib/            toast helper
  types/          TypeScript types
  fitdata.json    workout data
```

Notes
-----

- The My Plan page lives at `/Myplan`.
- Folder names are case sensitive on Linux servers such as Vercel, so keep the import paths exactly as the folders are named.