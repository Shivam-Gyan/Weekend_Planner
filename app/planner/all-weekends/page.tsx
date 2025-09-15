"use client"

import { useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core"
import type { Activity } from "@/lib/activities"
import {
  getMonthWeekends,
  getPreviousMonth,
  getNextMonth,
  getWeekendStartDate,
  getWeekStartFromWeekend,
  getWeekendWeekStartString,
} from "@/lib/date-utils"
import { ActivityBrowser } from "@/components/activity-browser"
import { WeekendCard } from "@/components/weekend-card"
import { PlannerNavbar } from "@/components/planner-navbar"
import { ActivityCard } from "@/components/activity-card"
import { CreateActivityModal } from "@/components/create-activity-modal"
// import { toast } from "sonner"
import { toast } from "react-hot-toast"
import { useWeekendPlanner } from "@/lib/hooks/use-weekend-planner"
import { WeeklyCalendar } from "@/components/weekly-calendar"

export default function AllWeekendsPage() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [selectedVibe, setSelectedVibe] = useState<string>("balanced")
  const [selectedWeekend, setSelectedWeekend] = useState<Date[] | null>(null)
  const [draggedActivity, setDraggedActivity] = useState<Activity | null>(null)

  // effective date (canonical saturday for the selected weekend or current)
  const effectiveDate = useMemo<Date>(() => {
    return selectedWeekend ? getWeekendStartDate(selectedWeekend[0]) : currentDate
  }, [selectedWeekend, currentDate])

  // hook returns current weekendPlan and allPlans
  const { weekendPlan, allPlans, customActivities, isLoading, addActivity, removeActivity, createCustomActivity } =
    useWeekendPlanner(effectiveDate)

  // month weekends
  const monthWeekends = useMemo(() => getMonthWeekends(currentDate), [currentDate])

  // sensors
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 5 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
  const sensors = useSensors(mouseSensor, touchSensor)

  const handlePreviousMonth = useCallback(() => {
    setCurrentDate((d) => getPreviousMonth(d))
    setSelectedWeekend(null)
  }, [])

  const handleNextMonth = useCallback(() => {
    setCurrentDate((d) => getNextMonth(d))
    setSelectedWeekend(null)
  }, [])

  const handleSelectWeekend = useCallback((weekend: Date[]) => {
    setSelectedWeekend(weekend)
  }, [])

  const handleBackToOverview = useCallback(() => {
    setSelectedWeekend(null)
  }, [])

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event
    if (active.data.current?.type === "activity") {
      setDraggedActivity(active.data.current.activity)
    }
  }, [])

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      setDraggedActivity(null)

      if (!over) return

      const activityData = active.data.current
      const dropData = over.data.current

      if (activityData?.type === "activity" && dropData?.type === "timeslot") {
        const activity = activityData.activity as Activity
        const { date, time } = dropData

        const success = addActivity(activity, date, time, selectedVibe)
        if (success) {
          toast.success(`${activity.title} added to your schedule!`)
        } else {
          toast.error("This time slot is already occupied")
        }
      }
    },
    [addActivity]
  )

  const handleCreateActivity = useCallback(
    (activity: Activity) => {
      createCustomActivity(activity)
    },
    [createCustomActivity]
  )

  // get plan for a specific weekend from allPlans (overview)
  // const getPlanForWeekend = useCallback(
  //   (weekend: Date[]) => {
  //     const weekStart = getWeekStartFromWeekend(weekend[0]) // returns a monday-key string
  //     return allPlans.find((p) => p.weekStart === weekStart)
  //   },
  //   [allPlans]
  // )

  // modified version of above function to use saturday-key string
  const getPlanForWeekend = useCallback(
    (weekend: Date[]) => {
      const weekStart = getWeekendWeekStartString(weekend[0]) // returns the Saturday string
      return allPlans.find((p) => p.weekStart === weekStart)
    },
    [allPlans]
  )

  if (isLoading) {
    return (
      <motion.div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading your weekend plans...</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PlannerNavbar
        currentDate={currentDate}
        onPreviousWeek={handlePreviousMonth}
        onNextWeek={handleNextMonth}
        showAllWeekends
      />

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="container mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Left panel */}
            <div className="lg:col-span-1">
              <ActivityBrowser
                selectedVibe={selectedVibe}
                onVibeChange={setSelectedVibe}
                customActivities={customActivities}
                onAddActivity={handleCreateActivity}
              />
            </div>

            {/* Right panel */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {selectedWeekend ? (
                  // 🔹 Detail view
                  <motion.div
                    key="detail-view"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Back button at top */}
                    <div className="flex justify-between items-center mb-4">
                      <button
                        onClick={handleBackToOverview}
                        className="px-4 py-2 rounded-lg bg-gray-100 border-2 border-green-300 text-slate-700 hover:bg-gray-300 transition"
                      >
                        ← Back to All Weekends
                      </button>

                      {weekendPlan && (
                        <span className="px-4 py-2 rounded-full bg-primary/10 text-green-800 text-sm font-medium">
                          {weekendPlan.activities.length} activities
                        </span>
                      )}
                    </div>

                    <WeeklyCalendar
                      currentDate={effectiveDate}
                      activities={weekendPlan?.activities || []}
                      onRemoveActivity={removeActivity}
                    />
                  </motion.div>
                ) : (
                  // 🔹 Overview
                  <motion.div
                    key="overview"
                    className="space-y-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between">
                      <motion.h1 className="text-2xl font-bold">
                        {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })} Weekends
                      </motion.h1>
                      <CreateActivityModal onCreateActivity={handleCreateActivity} />
                    </div>

                    {monthWeekends.length === 0 ? (
                      <motion.div className="text-center py-12 text-muted-foreground">
                        <p>No weekends found in this month.</p>
                      </motion.div>
                    ) : (
                      <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {monthWeekends.map((weekend, index) => {
                          const weekendKey = weekend.map((d) => d.toISOString()).join("-")
                          const plan = getPlanForWeekend(weekend)

                          // console.log("Rendering weekend", weekendKey, "with plan", plan)

                          return (
                            <motion.div
                              key={weekendKey}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * index }}
                            >
                              <WeekendCard weekend={weekend} plan={plan} onSelectWeekend={handleSelectWeekend} />
                            </motion.div>
                          )
                        })}
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <DragOverlay>
          {draggedActivity ? (
            <motion.div
              initial={{ scale: 1.05, rotate: 5 }}
              animate={{ scale: 1.1, rotate: 8 }}
              transition={{ duration: 0.2 }}
            >
              <ActivityCard activity={draggedActivity} isDragging />
            </motion.div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </motion.div>
  )
}
