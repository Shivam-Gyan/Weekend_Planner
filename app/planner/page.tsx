// // "use client"

// // import { useState, useEffect } from "react"
// // import { motion } from "framer-motion"
// // import { DndContext, type DragEndEvent, DragOverlay, type DragStartEvent } from "@dnd-kit/core"
// // import type { Activity } from "@/lib/activities"
// // import { useWeekendPlanner } from "@/lib/hooks/use-weekend-planner"
// // import { ActivityBrowser } from "@/components/activity-browser"
// // import { WeeklyCalendar } from "@/components/weekly-calendar"
// // import { PlannerNavbar } from "@/components/planner-navbar"
// // import { ActivityCard } from "@/components/activity-card"
// // import { toast } from "sonner"

// // export default function PlannerPage() {
// //   const [currentDate, setCurrentDate] = useState(new Date())
// //   const [selectedVibe, setSelectedVibe] = useState("balanced")
// //   const [draggedActivity, setDraggedActivity] = useState<Activity | null>(null)

// //   const { weekendPlan, customActivities, isLoading, addActivity, removeActivity, createCustomActivity } =
// //     useWeekendPlanner(currentDate)

// //   console.log(weekendPlan)

// //   useEffect(() => {
// //     const handleStorageChange = (e: StorageEvent) => {
// //       if (e.key === "weekendly-plans" || e.key === "weekendly-custom-activities") {
// //         // Refresh data when storage changes in another tab
// //         // window.location.reload()
// //       }
// //     }

// //     window.addEventListener("storage", handleStorageChange)
// //     return () => window.removeEventListener("storage", handleStorageChange)
// //   }, [])



// //   const handlePreviousWeek = () => {
// //     const newDate = new Date(currentDate)
// //     newDate.setDate(newDate.getDate() - 7)
// //     setCurrentDate(newDate)
// //   }

// //   const handleNextWeek = () => {
// //     const newDate = new Date(currentDate)
// //     newDate.setDate(newDate.getDate() + 7)
// //     setCurrentDate(newDate)
// //   }

// //   const handleDragStart = (event: DragStartEvent) => {
// //     const { active } = event
// //     if (active.data.current?.type === "activity") {
// //       setDraggedActivity(active.data.current.activity)
// //     }
// //   }

// //   const handleDragEnd = (event: DragEndEvent) => {
// //     const { active, over } = event
// //     setDraggedActivity(null)

// //     if (!over) return

// //     const activityData = active.data.current
// //     const dropData = over.data.current

// //     if (activityData?.type === "activity" && dropData?.type === "timeslot") {
// //       const activity = activityData.activity as Activity
// //       const { date, time } = dropData

// //       const success = addActivity(activity, date, time)
// //       if (success) {
// //         toast.success(`${activity.title} added to your schedule!`)
// //       } else {
// //         toast.error("This time slot is already occupied")
// //       }
// //     }
// //   }

// //   if (isLoading) {
// //     return (
// //       <motion.div
// //         className="min-h-screen bg-background flex items-center justify-center"
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 1 }}
// //       >
// //         <div className="text-center">
// //           <motion.div
// //             className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"
// //             animate={{ rotate: 360 }}
// //             transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
// //           />
// //           <p className="text-muted-foreground">Loading your weekend plans...</p>
// //         </div>
// //       </motion.div>
// //     )
// //   }

// //   return (
// //     <motion.div
// //       className="min-h-screen bg-background"
// //       initial={{ opacity: 0 }}
// //       animate={{ opacity: 1 }}
// //       transition={{ duration: 0.5 }}
// //     >
// //       <PlannerNavbar currentDate={currentDate} onPreviousWeek={handlePreviousWeek} onNextWeek={handleNextWeek} />

// //       <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
// //         <div className="container mx-auto px-4 py-6">
// //           <div className="grid lg:grid-cols-4 gap-6">
// //             {/* Left Sidebar - Activity Browser */}
// //             <div className="lg:col-span-1">
// //               <ActivityBrowser
// //                 selectedVibe={selectedVibe}
// //                 onVibeChange={setSelectedVibe}
// //                 customActivities={customActivities}
// //                 onAddActivity={createCustomActivity}
// //               />
// //             </div>

// //             {/* Right Content - Weekly Calendar */}
// //             <div className="lg:col-span-3">
// //               <WeeklyCalendar
// //                 currentDate={currentDate}
// //                 activities={weekendPlan?.activities || []}
// //                 onRemoveActivity={removeActivity}
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         <DragOverlay>
// //           {draggedActivity ? (
// //             <motion.div
// //               initial={{ scale: 1.05, rotate: 5 }}
// //               animate={{ scale: 1.1, rotate: 8 }}
// //               transition={{ duration: 0.2 }}
// //             >
// //               <ActivityCard activity={draggedActivity} isDragging />
// //             </motion.div>
// //           ) : null}
// //         </DragOverlay>
// //       </DndContext>
// //     </motion.div>
// //   )
// // }


// // "use client"

// // import { useState } from "react"
// // import { motion, AnimatePresence } from "framer-motion"
// // import {
// //   DndContext,
// //   type DragEndEvent,
// //   DragOverlay,
// //   type DragStartEvent,
// //   useSensor,
// //   useSensors,
// //   MouseSensor,
// //   TouchSensor,
// // } from "@dnd-kit/core"
// // import type { Activity } from "@/lib/activities"
// // import { PlannerNavbar } from "@/components/planner-navbar"
// // import { ActivityBrowser } from "@/components/activity-browser"
// // import { WeeklyCalendar } from "@/components/weekly-calendar"
// // import { ActivityCard } from "@/components/activity-card"
// // import { toast } from "sonner"
// // import { useWeekendPlanner } from "@/lib/hooks/use-weekend-planner"

// // export default function PlannerPage() {
// //   const [currentDate, setCurrentDate] = useState(new Date())
// //   const [selectedVibe, setSelectedVibe] = useState("balanced")
// //   const [draggedActivity, setDraggedActivity] = useState<Activity | null>(null)

// //   const { weekendPlan, customActivities, isLoading, addActivity, removeActivity, createCustomActivity } =
// //     useWeekendPlanner(currentDate)

// //   const mouseSensor = useSensor(MouseSensor, {
// //     activationConstraint: { distance: 5 },
// //   })
// //   const touchSensor = useSensor(TouchSensor, {
// //     activationConstraint: { delay: 150, tolerance: 5 },
// //   })
// //   const sensors = useSensors(mouseSensor, touchSensor)

// //   const handlePreviousWeek = () => {
// //     const newDate = new Date(currentDate)
// //     newDate.setDate(newDate.getDate() - 7)
// //     setCurrentDate(newDate)
// //   }

// //   const handleNextWeek = () => {
// //     const newDate = new Date(currentDate)
// //     newDate.setDate(newDate.getDate() + 7)
// //     setCurrentDate(newDate)
// //   }

// //   const handleDragStart = (event: DragStartEvent) => {
// //     const { active } = event
// //     if (active.data.current?.type === "activity") {
// //       setDraggedActivity(active.data.current.activity)
// //     }
// //   }

// //   const handleDragEnd = (event: DragEndEvent) => {
// //     const { active, over } = event
// //     setDraggedActivity(null)

// //     if (!over) return

// //     const activityData = active.data.current
// //     const dropData = over.data.current

// //     if (activityData?.type === "activity" && dropData?.type === "timeslot") {
// //       const activity = activityData.activity as Activity
// //       const { date, time } = dropData

// //       const success = addActivity(activity, date, time)
// //       if (success) {
// //         toast.success(`${activity.title} added to your schedule!`)
// //       } else {
// //         toast.error("This time slot is already occupied")
// //       }
// //     }
// //   }

// //   if (isLoading) {
// //     return (
// //       <motion.div className="min-h-screen bg-background flex items-center justify-center">
// //         <p className="text-muted-foreground">Loading your weekend plans...</p>
// //       </motion.div>
// //     )
// //   }

// //   return (
// //     <motion.div
// //       className="min-h-screen bg-background"
// //       initial={{ opacity: 0 }}
// //       animate={{ opacity: 1 }}
// //       transition={{ duration: 0.5 }}
// //     >
// //       <PlannerNavbar currentDate={currentDate} onPreviousWeek={handlePreviousWeek} onNextWeek={handleNextWeek} />

// //       <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
// //         <div className="container mx-auto px-4 py-6">
// //           <div className="grid lg:grid-cols-4 gap-6">
// //             {/* Sidebar */}
// //             <div className="lg:col-span-1">
// //               <ActivityBrowser
// //                 selectedVibe={selectedVibe}
// //                 onVibeChange={setSelectedVibe}
// //                 customActivities={customActivities}
// //                 onAddActivity={createCustomActivity}
// //               />
// //             </div>

// //             {/* Calendar */}
// //             <div className="lg:col-span-3">
// //               <WeeklyCalendar
// //                 currentDate={currentDate}
// //                 activities={weekendPlan?.activities || []}
// //                 onRemoveActivity={removeActivity}
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         <DragOverlay>
// //           {draggedActivity ? (
// //             <motion.div initial={{ scale: 1.05, rotate: 5 }} animate={{ scale: 1.1, rotate: 8 }} transition={{ duration: 0.2 }}>
// //               <ActivityCard activity={draggedActivity} isDragging />
// //             </motion.div>
// //           ) : null}
// //         </DragOverlay>
// //       </DndContext>
// //     </motion.div>
// //   )
// // }


// // src/app/planner/weekend/page.tsx (or wherever you keep it)
"use client"

import { useState, useMemo } from "react"
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
import { toast } from "sonner"
import { useWeekendPlanner } from "@/lib/hooks/use-weekend-planner"

export default function PlannerPage() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [selectedVibe, setSelectedVibe] = useState<string>("balanced")
  const [draggedActivity, setDraggedActivity] = useState<Activity | null>(null)

  // use hook with currentDate (it will compute canonical saturday key)
  const { weekendPlan, customActivities, isLoading, addActivity, removeActivity, createCustomActivity } = useWeekendPlanner(currentDate)

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

      const success = addActivity(activity, date, time)
      if (success) {
        toast.success(`${activity.title} added to your schedule!`)
      } else {
        toast.error("This time slot is already occupied")
      }
    }
  }

  if (isLoading) {
    return (
      <motion.div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading your weekend plans...</p>
      </motion.div>
    )
  }

  return (
    <motion.div className="min-h-screen bg-background" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <PlannerNavbar currentDate={currentDate} onPreviousWeek={handlePreviousWeek} onNextWeek={handleNextWeek} />

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="container mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <ActivityBrowser selectedVibe={selectedVibe} onVibeChange={setSelectedVibe} customActivities={customActivities} onAddActivity={createCustomActivity} />
            </div>

            <div className="lg:col-span-3">
              <WeeklyCalendar currentDate={currentDate} activities={weekendPlan?.activities || []} onRemoveActivity={removeActivity} />
            </div>
          </div>
        </div>

        <DragOverlay>
          {draggedActivity ? (
            <motion.div initial={{ scale: 1.05, rotate: 5 }} animate={{ scale: 1.1, rotate: 8 }} transition={{ duration: 0.2 }}>
              <ActivityCard activity={draggedActivity} isDragging />
            </motion.div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </motion.div>
  )
}

// "use client"

// import { useState, useEffect } from "react"
// import { toast } from "sonner"
// // import { PlannerNavbar } from "@/components/planner-navbar"
// // import { ActivityBrowser } from "@/components/activity-browser"
// import { WeeklyCalendar } from "@/components/weekly-calendar"
// // import { ActivityCard } from "@/components/activity-card"
// import { isPastWeekend, getWeekendStartDate, getWeekendWeekStartString } from "@/lib/date-utils"
// import { WeekendPlan } from "@/lib/storage"


// export default function PlannerPage() {
//   const [selectedWeekend, setSelectedWeekend] = useState<Date | null>(null)
//   const [plan, setPlan] = useState<WeekendPlan | null>(null)

//   useEffect(() => {
//     if (selectedWeekend) {
//       const weekendKey = getWeekendWeekStartString(selectedWeekend)
//       // fetch plan from backend by weekendKey
//       console.log("Fetching plan for:", weekendKey)
//     }
//   }, [selectedWeekend])

//   const handleSavePlan = () => {
//     if (!selectedWeekend) return
//     if (isPastWeekend(selectedWeekend)) {
//       toast.error("Cannot save a plan for a past weekend.")
//       return
//     }
//     // save plan logic
//     toast.success("Plan saved successfully!")
//   }

//   return (
//     <div className="p-6 space-y-6">
//       {/* ✅ WeeklyCalendar only needs currentDate + plan.activities */}
//       <WeeklyCalendar
//         currentDate={new Date()}
//         activities={plan?.activities || []}
//         onRemoveActivity={(id) => {
//           if (selectedWeekend && !isPastWeekend(selectedWeekend)) {
//             setPlan((prev) =>
//               prev ? { ...prev, activities: prev.activities.filter((a) => a.id !== id) } : prev
//             )
//           } else {
//             toast.error("Cannot edit a past weekend.")
//           }
//         }}
//         onEditActivity={(activity) => {
//           if (selectedWeekend && !isPastWeekend(selectedWeekend)) {
//             // edit logic
//             toast.success("Activity updated!")
//           } else {
//             toast.error("Cannot edit a past weekend.")
//           }
//         }}
//       />

//       {/* Save button disabled if weekend is past */}
//       <button
//         onClick={handleSavePlan}
//         className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
//         disabled={!selectedWeekend || isPastWeekend(selectedWeekend)}
//       >
//         Save Plan
//       </button>
//     </div>
//   )
// }
