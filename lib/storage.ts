import type { Activity } from "./activities"

export interface ScheduledActivity extends Activity {
  scheduledId: string
  date: string // YYYY-MM-DD format
  time: string // HH:MM format
  location?: string
}

export interface WeekendPlan {
  id: string
  weekStart: string // YYYY-MM-DD format of Monday
  title: string
  activities: ScheduledActivity[]
  createdAt: string
  updatedAt: string
  vibe: string // e.g., "relaxed", "adventurous", "balanced"
}

const STORAGE_KEY = "weekendly-plans"
const CUSTOM_ACTIVITIES_KEY = "weekendly-custom-activities"

export function getWeekendPlans(): WeekendPlan[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []

    const parsed = JSON.parse(stored)
    // Validate data structure
    if (!Array.isArray(parsed)) return []

    return parsed.filter(
      (plan) =>
        plan && typeof plan.id === "string" && typeof plan.weekStart === "string" && Array.isArray(plan.activities),
    )
  } catch (error) {
    console.error("Error loading weekend plans:", error)
    // Clear corrupted data
    localStorage.removeItem(STORAGE_KEY)
    return []
  }
}

export function saveWeekendPlan(plan: WeekendPlan): void {
  if (typeof window === "undefined") return

  try {
    const plans = getWeekendPlans()
    const existingIndex = plans.findIndex((p) => p.id === plan.id)

    const updatedPlan = { ...plan, updatedAt: new Date().toISOString() }

    if (existingIndex >= 0) {
      plans[existingIndex] = updatedPlan
    } else {
      plans.push(updatedPlan)
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans))

    window.dispatchEvent(
      new StorageEvent("storage", {
        key: STORAGE_KEY,
        newValue: JSON.stringify(plans),
        storageArea: localStorage,
      }),
    )
  } catch (error) {
    console.error("Error saving weekend plan:", error)
  }
}

export function getWeekendPlan(weekStart: string): WeekendPlan | null {
  const plans = getWeekendPlans()
  console.log("getWeekendPlan for weekStart", weekStart, "found plans:", plans)
  return plans.find((p) => p.weekStart === weekStart) || null
}

export function deleteWeekendPlan(planId: string): void {
  if (typeof window === "undefined") return

  try {
    const plans = getWeekendPlans().filter((p) => p.id !== planId)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans))

    window.dispatchEvent(
      new StorageEvent("storage", {
        key: STORAGE_KEY,
        newValue: JSON.stringify(plans),
        storageArea: localStorage,
      }),
    )
  } catch (error) {
    console.error("Error deleting weekend plan:", error)
  }
}

export function getCustomActivities(): Activity[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(CUSTOM_ACTIVITIES_KEY)
    if (!stored) return []

    const parsed = JSON.parse(stored)
    // Validate data structure
    if (!Array.isArray(parsed)) return []

    return parsed.filter(
      (activity) => activity && typeof activity.id === "string" && typeof activity.title === "string",
    )
  } catch (error) {
    console.error("Error loading custom activities:", error)
    // Clear corrupted data
    localStorage.removeItem(CUSTOM_ACTIVITIES_KEY)
    return []
  }
}

export function saveCustomActivity(activity: Activity): void {
  if (typeof window === "undefined") return

  try {
    const activities = getCustomActivities()
    // Check for duplicates
    if (!activities.find((a) => a.id === activity.id)) {
      activities.push(activity)
      localStorage.setItem(CUSTOM_ACTIVITIES_KEY, JSON.stringify(activities))

      window.dispatchEvent(
        new StorageEvent("storage", {
          key: CUSTOM_ACTIVITIES_KEY,
          newValue: JSON.stringify(activities),
          storageArea: localStorage,
        }),
      )
    }
  } catch (error) {
    console.error("Error saving custom activity:", error)
  }
}

export function clearAllData(): void {
  if (typeof window === "undefined") return

  try {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(CUSTOM_ACTIVITIES_KEY)
  } catch (error) {
    console.error("Error clearing data:", error)
  }
}
