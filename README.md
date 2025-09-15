
# Weekendly — Weekend Planner

**A compact, user-friendly app to plan Saturday + Sunday activities.**  
**Owner:** Shivam Gupta  

---

## Demo & repository

* **Live demo:** [Weekendly App](https://monkey-magic.vercel.app/)  
* **Video walkthrough (5–7 min):** [Watch on Google Drive](https://drive.google.com/file/d/13SX_tp_hB3ZBKfkigXsSmJVUGgUiJOYe/view?usp=sharing)  

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
git clone https://github.com/Shivam-Gyan/Weekend_Planner
cd weekend-planner

# Install
npm install

# Dev
npm run dev   # open http://localhost:3000

# Build / start (production)
npm run build
npm run start
````

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


## Accessibility & UX

* Mobile-first responsive layout
* Keyboard-operable controls and modals; ARIA attributes on interactive elements
* Clear motion affordances for drag/drop and list updates

---

## Screenshots

Below are some previews of Weekendly in action:

### 🏠 Landing Page

![Landing Page](https://drive.google.com/uc?export=view&id=1iMmYYWx2MBezYLukDk8IgKElPKqESr7d
)

### 📊 Dashboard

![Dashboard](https://drive.google.com/uc?export=view&id=1mqocaud7SJl5cke9iutVFP7C9_f3vYVP
)

### 📅 All Weekend Plans

![All Weekends](https://drive.google.com/uc?export=view&id=1N_9QeARsisVu9CzmSky1ZVEB3qCfuk2H
)

### 📖 Weekend Details

![Weekend Details](https://drive.google.com/uc?export=view&id=17lxdOH60xkM_lhrb6NY9GI_iZPBdVVCq
)

*(Place your actual screenshots in a `screenshots/` folder in the repo and update file names accordingly.)*

---

## Known issues & future work

* No automated tests yet — add Jest + React Testing Library.
* Add Service Worker for full offline support and server persistence for multi-device sync.
* Virtualize lists for scaling beyond \~100 items.

---

