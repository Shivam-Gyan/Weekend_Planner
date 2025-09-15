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
    // (activity: Activity, dateStr: string, time: string, selectedVibe: string) => {
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
          vibe:"balanced",
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
