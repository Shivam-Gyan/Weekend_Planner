// "use client"

// import { useState, useEffect, useCallback } from "react"
// import type { Activity } from "@/lib/activities"
// import type { WeekendPlan, ScheduledActivity } from "@/lib/storage"
// import {
//   getWeekendPlans,
//   getWeekendPlan,
//   saveWeekendPlan,
//   getCustomActivities,
//   saveCustomActivity,
// } from "@/lib/storage"

// export function useWeekendPlanner(currentDate: Date) {
//   const [customActivities, setCustomActivities] = useState<Activity[]>([])
//   const [weekendPlan, setWeekendPlan] = useState<WeekendPlan | null>(null)
//   const [allPlans, setAllPlans] = useState<WeekendPlan[]>([])
//   const [isLoading, setIsLoading] = useState(true)

//   // Calculate week start (Monday) from current date
//   const getWeekStart = useCallback((date: Date) => {
//     const monday = new Date(date)
//     const day = monday.getDay()
//     const diff = monday.getDate() - day + (day === 0 ? -6 : 1)
//     monday.setDate(diff)
//     return monday.toISOString().split("T")[0]
//   }, [])

//   // Load initial data
//   useEffect(() => {
//     const loadData = async () => {
//       setIsLoading(true)
//       try {
//         // Load custom activities
//         const activities = getCustomActivities()
//         setCustomActivities(activities)

//         // Load all plans
//         const plans = getWeekendPlans()
//         setAllPlans(plans)

//         // Load current week plan
//         const weekStart = getWeekStart(currentDate)
//         const existingPlan = getWeekendPlan(weekStart)

//         if (existingPlan) {
//           setWeekendPlan(existingPlan)
//         } else {
//           // Create new plan for this week
//           const newPlan: WeekendPlan = {
//             id: `plan-${Date.now()}`,
//             weekStart,
//             title: `Weekend of ${weekStart}`,
//             activities: [],
//             createdAt: new Date().toISOString(),
//             updatedAt: new Date().toISOString(),
//           }
//           setWeekendPlan(newPlan)
//         }
//       } catch (error) {
//         console.error("Error loading weekend planner data:", error)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     loadData()
//   }, [currentDate, getWeekStart])

//   // Add activity to schedule
//   const addActivity = useCallback(
//     (activity: Activity, date: string, time: string) => {
//       if (!weekendPlan) return false

//       // Check if slot is already occupied
//       const existingActivity = weekendPlan.activities.find((a) => a.date === date && a.time === time)
//       if (existingActivity) return false

//       const scheduledActivity: ScheduledActivity = {
//         ...activity,
//         scheduledId: `scheduled-${Date.now()}`,
//         date,
//         time,
//       }

//       const updatedPlan = {
//         ...weekendPlan,
//         activities: [...weekendPlan.activities, scheduledActivity],
//         updatedAt: new Date().toISOString(),
//       }

//       setWeekendPlan(updatedPlan)
//       saveWeekendPlan(updatedPlan)

//       // Update all plans list
//       setAllPlans((prev) => {
//         const index = prev.findIndex((p) => p.id === updatedPlan.id)
//         if (index >= 0) {
//           const newPlans = [...prev]
//           newPlans[index] = updatedPlan
//           return newPlans
//         }
//         return [...prev, updatedPlan]
//       })

//       return true
//     },
//     [weekendPlan],
//   )

//   // Remove activity from schedule
//   const removeActivity = useCallback(
//     (scheduledId: string) => {
//       if (!weekendPlan) return

//       const updatedPlan = {
//         ...weekendPlan,
//         activities: weekendPlan.activities.filter((a) => a.scheduledId !== scheduledId),
//         updatedAt: new Date().toISOString(),
//       }

//       setWeekendPlan(updatedPlan)
//       saveWeekendPlan(updatedPlan)

//       // Update all plans list
//       setAllPlans((prev) => {
//         const index = prev.findIndex((p) => p.id === updatedPlan.id)
//         if (index >= 0) {
//           const newPlans = [...prev]
//           newPlans[index] = updatedPlan
//           return newPlans
//         }
//         return prev
//       })
//     },
//     [weekendPlan],
//   )

//   // Create custom activity
//   const createCustomActivity = useCallback((activity: Activity) => {
//     saveCustomActivity(activity)
//     setCustomActivities((prev) => [...prev, activity])
//   }, [])

//   // Update activity details
//   const updateActivity = useCallback(
//     (scheduledId: string, updates: Partial<ScheduledActivity>) => {
//       if (!weekendPlan) return

//       const updatedPlan = {
//         ...weekendPlan,
//         activities: weekendPlan.activities.map((activity) =>
//           activity.scheduledId === scheduledId ? { ...activity, ...updates } : activity,
//         ),
//         updatedAt: new Date().toISOString(),
//       }

//       setWeekendPlan(updatedPlan)
//       saveWeekendPlan(updatedPlan)

//       // Update all plans list
//       setAllPlans((prev) => {
//         const index = prev.findIndex((p) => p.id === updatedPlan.id)
//         if (index >= 0) {
//           const newPlans = [...prev]
//           newPlans[index] = updatedPlan
//           return newPlans
//         }
//         return prev
//       })
//     },
//     [weekendPlan],
//   )

//   return {
//     // State
//     weekendPlan,
//     customActivities,
//     allPlans,
//     isLoading,

//     // Actions
//     addActivity,
//     removeActivity,
//     createCustomActivity,
//     updateActivity,

//     // Utilities
//     getWeekStart,
//   }
// }



// src/lib/hooks/use-weekend-planner.ts
"use client"

import { useState, useEffect, useCallback } from "react"
import type { Activity } from "@/lib/activities"
import type { ScheduledActivity, WeekendPlan } from "@/lib/storage"
import {
  getWeekendPlan,
  getWeekendPlans,
  saveWeekendPlan,
  getCustomActivities,
  saveCustomActivity,
} from "@/lib/storage"
import { getWeekendWeekStartString } from "@/lib/date-utils"

/**
 * Hook: useWeekendPlanner
 * - date: Date (any date inside the weekend you want to operate on)
 *
 * Returns:
 * - weekendPlan: plan for the canonical weekend start (Saturday) for given date (or undefined)
 * - allPlans: list of all saved plans
 * - customActivities: custom activities stored
 * - isLoading
 * - addActivity, removeActivity, createCustomActivity
 */
export function useWeekendPlanner(date: Date) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [weekendPlan, setWeekendPlan] = useState<WeekendPlan | undefined>(undefined)
  const [allPlans, setAllPlans] = useState<WeekendPlan[]>([])
  const [customActivities, setCustomActivities] = useState<Activity[]>([])

  const weekStartKey = getWeekendWeekStartString(date)

  useEffect(() => {
    // load synchronously from localStorage (fast)
    try {
      setIsLoading(true)
      const plans = getWeekendPlans()
      const plan = getWeekendPlan(weekStartKey) // returns WeekendPlan | null
      const customs = getCustomActivities()

      setAllPlans(plans)
      setCustomActivities(customs)
      setWeekendPlan(plan || undefined)
    } finally {
      setIsLoading(false)
    }
    // intentionally depends on weekStartKey so hook reloads when date changes
  }, [weekStartKey])

  // Adds activity to the plan for this hook's weekStartKey (creates plan if missing)
  const addActivity = useCallback(
    (activity: Activity, dateStr: string, time: string) => {
      // dateStr expected in YYYY-MM-DD
      const existingPlan = getWeekendPlan(weekStartKey)
      const scheduledId = `scheduled-${Date.now()}`
      const scheduledActivity: ScheduledActivity = {
        ...activity,
        scheduledId,
        date: dateStr,
        time,
      }

      let updatedPlan: WeekendPlan
      if (existingPlan) {
        // Prevent duplicate scheduledId (shouldn't happen) and avoid slot collision
        const slotTaken = existingPlan.activities.some((a) => a.date === dateStr && a.time === time)
        if (slotTaken) return false

        updatedPlan = {
          ...existingPlan,
          activities: [...existingPlan.activities, scheduledActivity],
          updatedAt: new Date().toISOString(),
        }
      } else {
        // create new plan
        updatedPlan = {
          id: `plan-${Date.now()}`,
          weekStart: weekStartKey,
          title: `Weekend of ${weekStartKey}`,
          activities: [scheduledActivity],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      }

      saveWeekendPlan(updatedPlan)
      // update local copies
      setWeekendPlan(updatedPlan)
      setAllPlans(getWeekendPlans())
      return true
    },
    [weekStartKey]
  )

  const removeActivity = useCallback(
    (scheduledId: string) => {
      const existingPlan = getWeekendPlan(weekStartKey)
      if (!existingPlan) return false

      const updatedPlan: WeekendPlan = {
        ...existingPlan,
        activities: existingPlan.activities.filter((a) => a.scheduledId !== scheduledId),
        updatedAt: new Date().toISOString(),
      }

      saveWeekendPlan(updatedPlan)
      setWeekendPlan(updatedPlan)
      setAllPlans(getWeekendPlans())
      return true
    },
    [weekStartKey]
  )

  const createCustomActivity = useCallback((activity: Activity) => {
    saveCustomActivity(activity)
    setCustomActivities(getCustomActivities())
  }, [])

  // Add storage event listener so multiple tabs stay in sync
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "weekendly-plans" || e.key === "weekendly-custom-activities") {
        setAllPlans(getWeekendPlans())
        setCustomActivities(getCustomActivities())
        const currentPlan = getWeekendPlan(weekStartKey)
        setWeekendPlan(currentPlan || undefined)
      }
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [weekStartKey])

  return {
    weekendPlan,
    allPlans,
    customActivities,
    isLoading,
    addActivity,
    removeActivity,
    createCustomActivity,
  }
}
