FitLog
======

A dark, no-nonsense gym companion. Pick a lift, lock it into today's plan, and keep track of what you have finished.

I built this as a Next.js practice project, working from a Figma design. All twelve workouts live in a local JSON file and are served through a small API route, so there is nothing to set up besides `npm install`.

Live demo: https://your-project.vercel.app

Tech Stack
----------

- **Next.js 16** (App Router) with **React** and **TypeScript**
- **Tailwind CSS** for styling, with CSS variables for the light and dark themes
- **next-themes** for the theme toggle
- **Lucide React** for icons
- **Sonner** for toast notifications
- **localStorage** to remember your plan, saved lifts and theme

Key Features
------------

1. **Searchable workout library.** Twelve lifts in a responsive grid (3 columns on desktop, 2 on tablet, 1 on mobile). Search by workout name or muscle group tag, and watch a loading skeleton while the data is fetched.
2. **Detail pages.** Click any card for the full picture: description, specs table and step by step instructions. Unknown URLs land on a custom 404 page.
3. **Daily plan and saved list.** Add a lift to today's plan or save it for later. The plan is capped at five lifts, and the Add button is disabled once you hit that limit. The navbar counters update instantly.
4. **My Plan page.** Total exercises, minutes and calories at a glance, a Today's Plan / Saved switch, search, sorting by duration, calories or rating, and a Mark as Done button on every lift.
5. **Light and dark mode, plus clear feedback.** Toggle the theme from the navbar (your choice is remembered). Colour coded toasts tell you what just happened: green for added or done, red for removed, grey for undo. Plan and saved data survive a page reload.

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
  Componants/     navbar, hero, library, cards, search, footer, My Plan views
  Lib/            toast helper and search filter
  types/          TypeScript types
  fitdata.json    workout data
```

Notes
-----

- The My Plan page lives at `/Myplan`.
- Folder names are case sensitive on Linux servers such as Vercel, so keep the import paths exactly as the folders are named.