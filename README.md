# Weekendly — Weekend Planner

**A compact, user-friendly app to plan Saturday + Sunday activities.**
**Owner:** Shivam Gupta

---

## Demo & repository

* **Live demo:** ` https://monkey-magic.vercel.app/`
* **Video walkthrough (5–7 min):** `https://drive.google.com/file/d/13SX_tp_hB3ZBKfkigXsSmJVUGgUiJOYe/view?usp=sharing`

---

## One-line summary

Weekendly helps users browse curated activities and build a Saturday+Sunday plan with add/edit/remove, drag-and-drop reordering, and local persistence — delivered with a responsive, accessible UI.

---

## Key features

**Core**

* Browse activities by category and quick-add to weekend
* Add activities to Saturday or Sunday
* Edit and remove scheduled activities
* Visual weekend board (ordered/timeline view)

**Bonus**

* Drag-and-drop reorder + cross-day moves using `@dnd-kit`
* Polished animations via `framer-motion`
* Theming / “vibes” and custom activity creation
* Persistence via `localStorage`

---

## Tech stack

* **Framework:** Next.js (App Router) + React + TypeScript
* **Styling:** Tailwind CSS
* **Animation / DnD:** Framer Motion, @dnd-kit
* **Icons:** lucide-react

**Rationale:** fast developer flow, strong DX, and focus on polished front-end UX for the assessment.

---

## Install & run (local)

```bash
# Clone
git clone https://GITHUB_REPO_URL
cd <repo-folder>

# Install
npm install

# Dev
npm run dev   # open http://localhost:3000

# Build / start (production)
npm run build
npm run start
```

No environment variables required for local development.

---

## Project structure (high level)

* `app/` — Next.js app routes & pages
* `components/` — UI components (ActivityCard, WeekendBoard, etc.)
* `context/` — ScheduleContext (useReducer) for state management
* `lib/` — utilities (date helpers, persistence helpers)
* `styles/` — Tailwind configuration & globals

---

## Data model (sample)

```ts
type Activity = { id: string; title: string; category: string; durationMins?: number; icon?: string; vibe?: string; }
type ScheduledActivity = { id: string; activityId: string; date: string; time?: string; note?: string; order?: number }
type WeekendPlan = { id: string; weekStartISO: string; scheduled: ScheduledActivity[]; theme?: string }
```

---

## Architecture & state

* Centralized `ScheduleContext` using `useReducer` to handle `ADD / EDIT / REMOVE / REORDER`.
* Persistence via `localStorage` on reducer updates; hydration at startup.
* Componentized UI for testability and reuse; memoization (`React.memo`, `useMemo`) for performance.

---

## Accessibility & UX

* Mobile-first responsive layout
* Keyboard-operable controls and modals; ARIA attributes on interactive elements
* Clear motion affordances for drag/drop and list updates

---

## Known issues & future work

* No automated tests yet — add Jest + React Testing Library.
* Add Service Worker for full offline support and server persistence for multi-device sync.
* Virtualize lists for scaling beyond \~100 items.

---

## Deployment

* Deploy to Vercel: connect repo → set build command `npm run build` → deploy.
* Ensure `LIVE_DEMO_URL` is updated in this README after deployment.

---

## Deliverables included

* Live demo link
* GitHub repo with source code
* Video walkthrough (5–7 minutes)
* This README / project documentation

---

## Contact

**Shivam Gupta** — include email or phone here if you want to share publicly.


