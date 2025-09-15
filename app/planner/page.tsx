"use client"

import { useState } from "react"
import { motion } from "framer-motion"
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
import { PlannerNavbar } from "@/components/planner-navbar"
import { ActivityBrowser } from "@/components/activity-browser"
import { WeeklyCalendar } from "@/components/weekly-calendar"
import { ActivityCard } from "@/components/activity-card"
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast"
import html2canvas from "html2canvas"
import { useWeekendPlanner } from "@/lib/hooks/use-weekend-planner"
import { AddActivityModal } from "@/components/add-activity-modal"

export default function PlannerPage() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [selectedVibe, setSelectedVibe] = useState<string>("balanced")
  const [draggedActivity, setDraggedActivity] = useState<Activity | null>(null)

  const [modalOpen, setModalOpen] = useState(false)

  // planner hook
  const { weekendPlan, customActivities, isLoading, addActivity, removeActivity, createCustomActivity } =
    useWeekendPlanner(currentDate)

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 5 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
  const sensors = useSensors(mouseSensor, touchSensor)

  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  const handleNextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    if (active.data.current?.type === "activity") {
      setDraggedActivity(active.data.current.activity)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setDraggedActivity(null)
    if (!over) return

    const activityData = active.data.current
    const dropData = over.data.current

    if (activityData?.type === "activity" && dropData?.type === "timeslot") {
      const activity = activityData.activity as Activity
      const { date, time } = dropData

      console.log("Dropping activity", activity, "on", date, time)

      const success = addActivity(activity, date, time, selectedVibe)
      if (success) {
        toast.success(`${activity.title} added to your schedule!`)
      } else {
        toast.error("This time slot is already occupied")
      }
    }
  }

  // ---- handle manual activity adding ----
  const handleAddActivity = (data: { activity: Activity; time: string; date: string }) => {
    if (!data?.activity || !data?.date || !data?.time) return
    const success = addActivity(data?.activity, data?.date, data?.time, selectedVibe)
    if (success) {
      toast.success(`${data?.activity.title} added to your schedule!`)
    } else {
      toast.error("This time slot is already occupied")
    }
  }


  // ---- handle web share ----
  // current download not working due to color code issue and i have not much time left for updation 
  // const handleDownloadImage = async () => {
  //   const node = document.getElementById("weekend-calendar")
  //   if (!node) return
  //   const canvas = await html2canvas(node)
  //   const dataUrl = canvas.toDataURL("image/png")

  //   const link = document.createElement("a")
  //   link.href = dataUrl
  //   link.download = `${weekendPlan?.title || "weekend-plan"}.png`
  //   link.click()
  // }


  function formatActivityDetails(a: any, weekStart: string): string {
    const sat = new Date(weekStart)
    const sun = new Date(weekStart)
    sun.setDate(sun.getDate() + 1)

    const activityDate = new Date(a.date)
    let dayLabel = ""

    if (activityDate.toDateString() === sat.toDateString()) {
      dayLabel = "Saturday"
    } else if (activityDate.toDateString() === sun.toDateString()) {
      dayLabel = "Sunday"
    } else {
      dayLabel = a.date
    }

    return (
      `${a.icon} ${a.title}\n` +
      `• Vibe: ${a.vibe?.join(", ") || "—"}\n` +
      `• Time: ${dayLabel} @ ${a.time}\n` +
      `• Duration: ${a.duration ? `${a.duration} mins` : "—"}\n` +
      `• Description: ${a.description || "No details provided"}`
    )
  }

  const handleWebShare = () => {
    if (!weekendPlan) return

    const text =
      `📅 ${weekendPlan.title}\n\n` +
      weekendPlan.activities
        .map((a: any) => formatActivityDetails(a, weekendPlan.weekStart))
        .join("\n\n") // blank line between activities for readability

    if (navigator.share) {
      navigator.share({
        title: weekendPlan.title,
        text,
      })
    } else {
      toast.error("Sharing not supported in this browser")
    }
  }

  // ---- LOADING ----
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
        onPreviousWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
      />

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="container mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Left side */}
            <div className="lg:col-span-1">
              <ActivityBrowser
                selectedVibe={selectedVibe}
                onVibeChange={setSelectedVibe}
                customActivities={customActivities}
                onAddActivity={createCustomActivity}
              />
            </div>

            {/* Right side with calendar + share */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex justify-end gap-5">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setModalOpen(true)}
                  className="bg-gray-100 border-4 cursor-pointer border-green-500 px-6 rounded-lg text-slate-700 hover:bg-gray-100 hover:scale-105 transition"
                >
                  Add Activity
                </Button>
                {/* <Button size="sm" onClick={handleDownloadImage} className="bg-gray-100 border-4 cursor-pointer border-green-500 px-6 rounded-lg text-slate-700 hover:bg-gray-100 hover:scale-105 transition">
                  Download
                </Button> */}
                <Button size="sm" onClick={handleWebShare} className="bg-gray-100 border-4 cursor-pointer border-green-500 px-6 rounded-lg text-slate-700 hover:bg-gray-100 hover:scale-105 transition">
                  Share
                </Button>
              </div>

              {/* Weekly Calendar */}
              <div id="weekend-calendar">
                <WeeklyCalendar
                  currentDate={currentDate}
                  activities={weekendPlan?.activities || []}
                  onRemoveActivity={removeActivity}
                />
              </div>
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

      {/* ---- ADD ACTIVITY MODAL ---- */}
      <AddActivityModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setActivityData={handleAddActivity}
        customActivities={customActivities}
        weekendStart={weekendPlan?.weekStart || currentDate.toISOString().split("T")[0]}
      />
    </motion.div>
  )
}
