// "use client"

// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { DndContext, type DragEndEvent, DragOverlay, type DragStartEvent } from "@dnd-kit/core"
// import type { Activity } from "@/lib/activities"
// import {
//   type ScheduledActivity,
//   type WeekendPlan,
//   getWeekendPlans,
//   getWeekendPlan,
//   saveWeekendPlan,
//   getCustomActivities,
//   saveCustomActivity,
// } from "@/lib/storage"
// import { getMonthWeekends, getPreviousMonth, getNextMonth, getWeekStartFromWeekend } from "@/lib/date-utils"
// import { ActivityBrowser } from "@/components/activity-browser"
// import { WeekendCard } from "@/components/weekend-card"
// import { WeekendDetailView } from "@/components/weekend-detail-view"
// import { PlannerNavbar } from "@/components/planner-navbar"
// import { ActivityCard } from "@/components/activity-card"
// import { CreateActivityModal } from "@/components/create-activity-modal"
// import { toast } from "sonner"
// import { useWeekendPlanner } from "@/lib/hooks/use-weekend-planner"
// import { WeeklyCalendar } from "@/components/weekly-calendar"

// export default function AllWeekendsPage() {
//   const [currentDate, setCurrentDate] = useState(new Date())
//   const [selectedVibe, setSelectedVibe] = useState("balanced")
//   const [customActivities, setCustomActivities] = useState<Activity[]>([])
//   const [weekendPlans, setWeekendPlans] = useState<WeekendPlan[]>([])
//   const [selectedWeekend, setSelectedWeekend] = useState<Date[] | null>(null)
//   const [selectedPlan, setSelectedPlan] = useState<WeekendPlan | null>(null)
//   const [draggedActivity, setDraggedActivity] = useState<Activity | null>(null)

//   const { weekendPlan, isLoading, addActivity, removeActivity, createCustomActivity } = useWeekendPlanner(currentDate)

//   console.log("all weekend file", weekendPlan)
//   useEffect(() => {
//     const loadData = () => {
//       setCustomActivities(getCustomActivities())
//       setWeekendPlans(getWeekendPlans())
//     }

//     loadData()

//     // Listen for storage changes
//     const handleStorageChange = (e: StorageEvent) => {
//       if (e.key === "weekendly-plans" || e.key === "weekendly-custom-activities") {
//         loadData()
//       }
//     }

//     window.addEventListener("storage", handleStorageChange)
//     return () => window.removeEventListener("storage", handleStorageChange)
//   }, [])

//   useEffect(() => {
//     if (selectedWeekend) {
//       const weekStart = getWeekStartFromWeekend(selectedWeekend[0])
//       const plan = getWeekendPlan(weekStart)
//       setSelectedPlan(plan)
//     }
//   }, [selectedWeekend, weekendPlans])

//   const monthWeekends = getMonthWeekends(currentDate)

//   const handlePreviousMonth = () => {
//     setCurrentDate(getPreviousMonth(currentDate))
//     setSelectedWeekend(null)
//   }

//   const handleNextMonth = () => {
//     setCurrentDate(getNextMonth(currentDate))
//     setSelectedWeekend(null)
//   }

//   const handleSelectWeekend = (weekend: Date[]) => {
//     setSelectedWeekend(weekend)
//   }

//   const handleBackToOverview = () => {
//     setSelectedWeekend(null)
//     setSelectedPlan(null)
//   }

//   const handleDragStart = (event: DragStartEvent) => {
//     const { active } = event
//     if (active.data.current?.type === "activity") {
//       setDraggedActivity(active.data.current.activity)
//     }
//   }

//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event
//     setDraggedActivity(null)

//     if (!over || !selectedPlan || !selectedWeekend) return

//     const activityData = active.data.current
//     const dropData = over.data.current

//     if (activityData?.type === "activity" && dropData?.type === "timeslot") {
//       const activity = activityData.activity as Activity
//       const { date, time } = dropData

//       // Check if slot is already occupied
//       const existingActivity = selectedPlan.activities.find((a) => a.date === date && a.time === time)

//       if (existingActivity) {
//         toast.error("This time slot is already occupied")
//         return
//       }

//       const scheduledActivity: ScheduledActivity = {
//         ...activity,
//         scheduledId: `scheduled-${Date.now()}`,
//         date,
//         time,
//       }

//       const updatedPlan = {
//         ...selectedPlan,
//         activities: [...selectedPlan.activities, scheduledActivity],
//         updatedAt: new Date().toISOString(),
//       }

//       setSelectedPlan(updatedPlan)
//       saveWeekendPlan(updatedPlan)
//       setWeekendPlans(getWeekendPlans()) // Refresh all plans
//       toast.success(`${activity.title} added to your schedule!`)
//     }
//   }

//   const handleRemoveActivity = (scheduledId: string) => {
//     if (!selectedPlan) return

//     const updatedPlan = {
//       ...selectedPlan,
//       activities: selectedPlan.activities.filter((a) => a.scheduledId !== scheduledId),
//       updatedAt: new Date().toISOString(),
//     }

//     setSelectedPlan(updatedPlan)
//     saveWeekendPlan(updatedPlan)
//     setWeekendPlans(getWeekendPlans())
//     toast.success("Activity removed from schedule")
//   }

//   const handleCreateActivity = (activity: Activity) => {
//     saveCustomActivity(activity)
//     setCustomActivities((prev) => [...prev, activity])
//     toast.success("Custom activity created!")
//   }

//   const getPlanForWeekend = (weekend: Date[]): WeekendPlan | undefined => {
//     const weekStart = getWeekStartFromWeekend(weekend[0])
//     return weekendPlans.find((plan) => plan.weekStart === weekStart)
//   }

//   return (
//     <motion.div
//       className="min-h-screen bg-background"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <PlannerNavbar
//         currentDate={currentDate}
//         onPreviousWeek={handlePreviousMonth}
//         onNextWeek={handleNextMonth}
//         showAllWeekends={true}
//       />

//       <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
//         <div className="container mx-auto px-4 py-6">
//           <div className="grid lg:grid-cols-4 gap-6">
//             {/* Left Sidebar - Activity Browser */}
//             <div className="lg:col-span-1">
//               <ActivityBrowser
//                 selectedVibe={selectedVibe}
//                 onVibeChange={setSelectedVibe}
//                 customActivities={customActivities}
//                 onAddActivity={handleCreateActivity}
//               />
//             </div>

//             {/* Right Content */}
//             <div className="lg:col-span-3">
//               <AnimatePresence mode="wait">
//                 {selectedWeekend ? (
//                   <motion.div
//                     key="detail-view"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     {/* <WeekendDetailView
//                       weekend={selectedWeekend}
//                       plan={selectedPlan}
//                       activities={selectedPlan?.activities || []}
//                       onBack={handleBackToOverview}
//                       onRemoveActivity={handleRemoveActivity}
//                     /> */}
//                     <WeeklyCalendar
//                       currentDate={currentDate}
//                       activities={weekendPlan?.activities || []}
//                       onRemoveActivity={removeActivity}
//                     />
//                   </motion.div>
//                 ) : (
//                   <motion.div
//                     key="overview"
//                     className="space-y-6"
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 20 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <div className="flex items-center justify-between">
//                       <motion.h1
//                         className="text-2xl font-bold"
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.2 }}
//                       >
//                         {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })} Weekends
//                       </motion.h1>
//                       <CreateActivityModal onCreateActivity={handleCreateActivity} />
//                     </div>

//                     {monthWeekends.length === 0 ? (
//                       <motion.div
//                         className="text-center py-12 text-muted-foreground"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 0.3 }}
//                       >
//                         <p>No weekends found in this month.</p>
//                       </motion.div>
//                     ) : (
//                       <motion.div
//                         className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 0.3 }}
//                       >
//                         {monthWeekends.map((weekend, index) => {
//                           const plan = getPlanForWeekend(weekend)
//                           const weekendKey = weekend.map((d) => d.toISOString()).join("-")

//                           return (
//                             <motion.div
//                               key={weekendKey}
//                               initial={{ opacity: 0, y: 20 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               transition={{ delay: 0.4 + index * 0.1 }}
//                             >
//                               <WeekendCard weekend={weekend} plan={plan} onSelectWeekend={handleSelectWeekend} />
//                             </motion.div>
//                           )
//                         })}
//                       </motion.div>
//                     )}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>
//         </div>

//         <DragOverlay>
//           {draggedActivity ? (
//             <motion.div
//               initial={{ scale: 1.05, rotate: 5 }}
//               animate={{ scale: 1.1, rotate: 8 }}
//               transition={{ duration: 0.2 }}
//             >
//               <ActivityCard activity={draggedActivity} isDragging />
//             </motion.div>
//           ) : null}
//         </DragOverlay>
//       </DndContext>
//     </motion.div>
//   )
// }


// "use client"

// import { useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import {
//   DndContext,
//   type DragEndEvent,
//   DragOverlay,
//   type DragStartEvent,
//   useSensor,
//   useSensors,
//   MouseSensor,
//   TouchSensor,
// } from "@dnd-kit/core"
// import type { Activity } from "@/lib/activities"
// import { getMonthWeekends, getPreviousMonth, getNextMonth, getWeekStartFromWeekend, getWeekendStartDate } from "@/lib/date-utils"
// import { ActivityBrowser } from "@/components/activity-browser"
// import { WeekendCard } from "@/components/weekend-card"
// import { PlannerNavbar } from "@/components/planner-navbar"
// import { ActivityCard } from "@/components/activity-card"
// import { CreateActivityModal } from "@/components/create-activity-modal"
// import { toast } from "sonner"
// import { useWeekendPlanner } from "@/lib/hooks/use-weekend-planner"
// import { WeeklyCalendar } from "@/components/weekly-calendar"

// export default function AllWeekendsPage() {
//   const [currentDate, setCurrentDate] = useState(new Date())
//   const [selectedVibe, setSelectedVibe] = useState("balanced")
//   const [selectedWeekend, setSelectedWeekend] = useState<Date[] | null>(null)
//   const [draggedActivity, setDraggedActivity] = useState<Activity | null>(null)

//   console.log("selected weekend", selectedWeekend)
//   console.log("current date", currentDate, new Date())

//   // ✅ Use weekend hook for either overview or selected weekend
//   const effectiveDate = selectedWeekend ? getWeekendStartDate(selectedWeekend[0]) : currentDate
//   console.log("effective date", effectiveDate)
//   const { weekendPlan, customActivities, isLoading, addActivity, removeActivity, createCustomActivity } =
//     useWeekendPlanner(effectiveDate)

//   const monthWeekends = getMonthWeekends(currentDate)

//   // ✅ Sensors for desktop + mobile
//   const mouseSensor = useSensor(MouseSensor, {
//     activationConstraint: { distance: 5 },
//   })
//   const touchSensor = useSensor(TouchSensor, {
//     activationConstraint: { delay: 150, tolerance: 5 },
//   })
//   const sensors = useSensors(mouseSensor, touchSensor)

//   const handlePreviousMonth = () => {
//     setCurrentDate(getPreviousMonth(currentDate))
//     setSelectedWeekend(null)
//   }

//   const handleNextMonth = () => {
//     setCurrentDate(getNextMonth(currentDate))
//     setSelectedWeekend(null)
//   }

//   const handleSelectWeekend = (weekend: Date[]) => {
//     setSelectedWeekend(weekend)
//   }

//   const handleBackToOverview = () => {
//     setSelectedWeekend(null)
//   }

//   const handleDragStart = (event: DragStartEvent) => {
//     const { active } = event
//     if (active.data.current?.type === "activity") {
//       setDraggedActivity(active.data.current.activity)
//     }
//   }

//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event
//     setDraggedActivity(null)

//     if (!over) return

//     const activityData = active.data.current
//     const dropData = over.data.current

//     if (activityData?.type === "activity" && dropData?.type === "timeslot") {
//       const activity = activityData.activity as Activity
//       const { date, time } = dropData

//       const success = addActivity(activity, date, time)
//       if (success) {
//         toast.success(`${activity.title} added to your schedule!`)
//       } else {
//         toast.error("This time slot is already occupied")
//       }
//     }
//   }

//   if (isLoading) {
//     return (
//       <motion.div className="min-h-screen bg-background flex items-center justify-center">
//         <p className="text-muted-foreground">Loading your weekend plans...</p>
//       </motion.div>
//     )
//   }

//   const getPlanForWeekend = (weekend: Date[]) => {
//     const weekStart = getWeekStartFromWeekend(weekend[0])
//     return weekendPlan?.weekStart === weekStart ? weekendPlan : undefined
//   }


//   return (
//     <motion.div
//       className="min-h-screen bg-background"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <PlannerNavbar
//         currentDate={currentDate}
//         onPreviousWeek={handlePreviousMonth}
//         onNextWeek={handleNextMonth}
//         showAllWeekends={true}
//       />

//       <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
//         <div className="container mx-auto px-4 py-6">
//           <div className="grid lg:grid-cols-4 gap-6">
//             {/* Sidebar */}
//             <div className="lg:col-span-1">
//               <ActivityBrowser
//                 selectedVibe={selectedVibe}
//                 onVibeChange={setSelectedVibe}
//                 customActivities={customActivities}
//                 onAddActivity={createCustomActivity}
//               />
//             </div>

//             {/* Main Content */}
//             <div className="lg:col-span-3">
//               <AnimatePresence mode="wait">
//                 {selectedWeekend ? (
//                   <motion.div
//                     key="detail-view"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <WeeklyCalendar
//                       // currentDate={currentDate}
//                       currentDate={effectiveDate}
//                       activities={weekendPlan?.activities || []}
//                       onRemoveActivity={removeActivity}
//                     />

//                     <button
//                       onClick={handleBackToOverview}
//                       className="mt-4 px-4 py-2 rounded bg-secondary text-secondary-foreground"
//                     >
//                       Back to All Weekends
//                     </button>
//                   </motion.div>
//                 ) : (
//                   <motion.div
//                     key="overview"
//                     className="space-y-6"
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 20 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <div className="flex items-center justify-between">
//                       <motion.h1 className="text-2xl font-bold">
//                         {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })} Weekends
//                       </motion.h1>
//                       <CreateActivityModal onCreateActivity={createCustomActivity} />
//                     </div>

//                     {monthWeekends.length === 0 ? (
//                       <motion.div className="text-center py-12 text-muted-foreground">
//                         <p>No weekends found in this month.</p>
//                       </motion.div>
//                     ) : (
//                       <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                         {/* {monthWeekends.map((weekend, index) => {
//                           const weekendKey = weekend.map((d) => d.toISOString()).join("-")
//                           return (
//                             <motion.div
//                               key={weekendKey}
//                               initial={{ opacity: 0, y: 20 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               transition={{ delay: 0.1 * index }}
//                             >
//                               <WeekendCard weekend={weekend} plan={weekendPlan} onSelectWeekend={handleSelectWeekend} />
//                             </motion.div>
//                           )
//                         })} */}

//                         {monthWeekends.map((weekend, index) => {
//                           const weekendKey = weekend.map((d) => d.toISOString()).join("-")
//                           const plan = getPlanForWeekend(weekend)  // 👈 FIX

//                           return (
//                             <motion.div
//                               key={weekendKey}
//                               initial={{ opacity: 0, y: 20 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               transition={{ delay: 0.1 * index }}
//                             >
//                               <WeekendCard weekend={weekend} plan={plan} onSelectWeekend={handleSelectWeekend} />
//                             </motion.div>
//                           )
//                         })}
//                       </motion.div>
//                     )}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>
//         </div>

//         <DragOverlay>
//           {draggedActivity ? (
//             <motion.div initial={{ scale: 1.05, rotate: 5 }} animate={{ scale: 1.1, rotate: 8 }} transition={{ duration: 0.2 }}>
//               <ActivityCard activity={draggedActivity} isDragging />
//             </motion.div>
//           ) : null}
//         </DragOverlay>
//       </DndContext>
//     </motion.div>
//   )
// }


// "use client"

// import { useState, useMemo, useCallback } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import {
//   DndContext,
//   type DragEndEvent,
//   DragOverlay,
//   type DragStartEvent,
//   useSensor,
//   useSensors,
//   MouseSensor,
//   TouchSensor,
// } from "@dnd-kit/core"
// import type { Activity } from "@/lib/activities"
// import {
//   getMonthWeekends,
//   getPreviousMonth,
//   getNextMonth,
//   getWeekStartFromWeekend,
//   getWeekendStartDate,
// } from "@/lib/date-utils"
// import { ActivityBrowser } from "@/components/activity-browser"
// import { WeekendCard } from "@/components/weekend-card"
// import { PlannerNavbar } from "@/components/planner-navbar"
// import { ActivityCard } from "@/components/activity-card"
// import { CreateActivityModal } from "@/components/create-activity-modal"
// import { toast } from "sonner"
// import { useWeekendPlanner } from "@/lib/hooks/use-weekend-planner"
// import { WeeklyCalendar } from "@/components/weekly-calendar"

// export default function AllWeekendsPage() {
//   const [currentDate, setCurrentDate] = useState<Date>(new Date())
//   const [selectedVibe, setSelectedVibe] = useState<string>("balanced")
//   const [selectedWeekend, setSelectedWeekend] = useState<Date[] | null>(null)
//   const [draggedActivity, setDraggedActivity] = useState<Activity | null>(null)

//   // memoize effective date so it doesn't create a new Date every render
//   const effectiveDate = useMemo<Date>(() => {
//     return selectedWeekend ? getWeekendStartDate(selectedWeekend[0]) : currentDate
//   }, [selectedWeekend, currentDate])

//   // use the hook with the stable effectiveDate
//   const { weekendPlan, customActivities, isLoading, addActivity, removeActivity, createCustomActivity } =
//     useWeekendPlanner(effectiveDate)

//   // memoize month weekends list
//   const monthWeekends = useMemo(() => getMonthWeekends(currentDate), [currentDate])

//   // sensors (stable)
//   const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 5 } })
//   const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
//   const sensors = useSensors(mouseSensor, touchSensor)

//   // callbacks (stable references)
//   const handlePreviousMonth = useCallback(() => {
//     setCurrentDate((d) => getPreviousMonth(d))
//     setSelectedWeekend(null)
//   }, [])

//   const handleNextMonth = useCallback(() => {
//     setCurrentDate((d) => getNextMonth(d))
//     setSelectedWeekend(null)
//   }, [])

//   const handleSelectWeekend = useCallback((weekend: Date[]) => {
//     setSelectedWeekend(weekend)
//   }, [])

//   const handleBackToOverview = useCallback(() => {
//     setSelectedWeekend(null)
//   }, [])

//   const handleDragStart = useCallback((event: DragStartEvent) => {
//     const { active } = event
//     if (active.data.current?.type === "activity") {
//       setDraggedActivity(active.data.current.activity)
//     }
//   }, [])

//   const handleDragEnd = useCallback(
//     (event: DragEndEvent) => {
//       const { active, over } = event
//       setDraggedActivity(null)

//       if (!over) return

//       const activityData = active.data.current
//       const dropData = over.data.current

//       if (activityData?.type === "activity" && dropData?.type === "timeslot") {
//         const activity = activityData.activity as Activity
//         const { date, time } = dropData

//         const success = addActivity(activity, date, time)
//         if (success) {
//           toast.success(`${activity.title} added to your schedule!`)
//         } else {
//           toast.error("This time slot is already occupied")
//         }
//       }
//     },
//     [addActivity]
//   )

//   // stable wrapper for passing into child components (so they don't re-render unnecessarily)
//   const handleCreateActivity = useCallback(
//     (activity: Activity) => {
//       createCustomActivity(activity)
//     },
//     [createCustomActivity]
//   )

//   // returns plan for a given weekend (compares weekStart strings)
//   const getPlanForWeekend = useCallback(
//     (weekend: Date[]) => {
//       const weekStart = getWeekStartFromWeekend(weekend[0]) // returns string key
//       return weekendPlan?.weekStart === weekStart ? weekendPlan : undefined
//     },
//     [weekendPlan]
//   )

//   if (isLoading) {
//     return (
//       <motion.div className="min-h-screen bg-background flex items-center justify-center">
//         <p className="text-muted-foreground">Loading your weekend plans...</p>
//       </motion.div>
//     )
//   }

//   return (
//     <motion.div
//       className="min-h-screen bg-background"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <PlannerNavbar
//         currentDate={currentDate}
//         onPreviousWeek={handlePreviousMonth}
//         onNextWeek={handleNextMonth}
//         showAllWeekends={true}
//       />

//       <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
//         <div className="container mx-auto px-4 py-6">
//           <div className="grid lg:grid-cols-4 gap-6">
//             {/* Sidebar */}
//             <div className="lg:col-span-1">
//               <ActivityBrowser
//                 selectedVibe={selectedVibe}
//                 onVibeChange={setSelectedVibe}
//                 customActivities={customActivities}
//                 onAddActivity={handleCreateActivity}
//               />
//             </div>

//             {/* Main Content */}
//             <div className="lg:col-span-3">
//               <AnimatePresence mode="wait">
//                 {selectedWeekend ? (
//                   <motion.div
//                     key="detail-view"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <WeeklyCalendar
//                       currentDate={effectiveDate}
//                       activities={weekendPlan?.activities || []}
//                       onRemoveActivity={removeActivity}
//                     />

//                     <button
//                       onClick={handleBackToOverview}
//                       className="mt-4 px-4 py-2 rounded bg-secondary text-secondary-foreground"
//                     >
//                       Back to All Weekends
//                     </button>
//                   </motion.div>
//                 ) : (
//                   <motion.div
//                     key="overview"
//                     className="space-y-6"
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 20 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <div className="flex items-center justify-between">
//                       <motion.h1 className="text-2xl font-bold">
//                         {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })} Weekends
//                       </motion.h1>
//                       <CreateActivityModal onCreateActivity={handleCreateActivity} />
//                     </div>

//                     {monthWeekends.length === 0 ? (
//                       <motion.div className="text-center py-12 text-muted-foreground">
//                         <p>No weekends found in this month.</p>
//                       </motion.div>
//                     ) : (
//                       <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                         {monthWeekends.map((weekend, index) => {
//                           const weekendKey = weekend.map((d) => d.toISOString()).join("-")
//                           const plan = getPlanForWeekend(weekend)

//                           return (
//                             <motion.div
//                               key={weekendKey}
//                               initial={{ opacity: 0, y: 20 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               transition={{ delay: 0.1 * index }}
//                             >
//                               <WeekendCard weekend={weekend} plan={plan} onSelectWeekend={handleSelectWeekend} />
//                             </motion.div>
//                           )
//                         })}
//                       </motion.div>
//                     )}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>
//         </div>

//         <DragOverlay>
//           {draggedActivity ? (
//             <motion.div initial={{ scale: 1.05, rotate: 5 }} animate={{ scale: 1.1, rotate: 8 }} transition={{ duration: 0.2 }}>
//               <ActivityCard activity={draggedActivity} isDragging />
//             </motion.div>
//           ) : null}
//         </DragOverlay>
//       </DndContext>
//     </motion.div>
//   )
// }


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
} from "@/lib/date-utils"
import { ActivityBrowser } from "@/components/activity-browser"
import { WeekendCard } from "@/components/weekend-card"
import { PlannerNavbar } from "@/components/planner-navbar"
import { ActivityCard } from "@/components/activity-card"
import { CreateActivityModal } from "@/components/create-activity-modal"
import { toast } from "sonner"
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

        const success = addActivity(activity, date, time)
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
  const getPlanForWeekend = useCallback(
    (weekend: Date[]) => {
      const weekStart = getWeekStartFromWeekend(weekend[0]) // returns a monday-key string
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
                        className="px-4 py-2 rounded bg-secondary text-secondary-foreground hover:bg-secondary/80 transition"
                      >
                        ← Back to All Weekends
                      </button>

                      {weekendPlan && (
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
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



// src/app/planner/all-weekends/page.tsx  (or wherever your route file is)
// "use client"

// import { useState, useMemo, useCallback } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import {
//   DndContext,
//   type DragEndEvent,
//   DragOverlay,
//   type DragStartEvent,
//   useSensor,
//   useSensors,
//   MouseSensor,
//   TouchSensor,
// } from "@dnd-kit/core"
// import type { Activity } from "@/lib/activities"
// import {
//   getMonthWeekends,
//   getPreviousMonth,
//   getNextMonth,
//   getWeekendStartDate,
//   getWeekStartFromWeekend,
// } from "@/lib/date-utils"
// import { ActivityBrowser } from "@/components/activity-browser"
// import { WeekendCard } from "@/components/weekend-card"
// import { PlannerNavbar } from "@/components/planner-navbar"
// import { ActivityCard } from "@/components/activity-card"
// import { CreateActivityModal } from "@/components/create-activity-modal"
// import { toast } from "sonner"
// import { useWeekendPlanner } from "@/lib/hooks/use-weekend-planner"
// import { WeeklyCalendar } from "@/components/weekly-calendar"

// export default function AllWeekendsPage() {
//   const [currentDate, setCurrentDate] = useState<Date>(new Date())
//   const [selectedVibe, setSelectedVibe] = useState<string>("balanced")
//   const [selectedWeekend, setSelectedWeekend] = useState<Date[] | null>(null)
//   const [draggedActivity, setDraggedActivity] = useState<Activity | null>(null)

//   // effective date (canonical saturday for the selected weekend or current)
//   const effectiveDate = useMemo<Date>(() => {
//     return selectedWeekend ? getWeekendStartDate(selectedWeekend[0]) : currentDate
//   }, [selectedWeekend, currentDate])

//   // hook returns current weekendPlan and allPlans
//   const { weekendPlan, allPlans, customActivities, isLoading, addActivity, removeActivity, createCustomActivity } =
//     useWeekendPlanner(effectiveDate)

//   // month weekends
//   const monthWeekends = useMemo(() => getMonthWeekends(currentDate), [currentDate])

//   // sensors
//   const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 5 } })
//   const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
//   const sensors = useSensors(mouseSensor, touchSensor)

//   const handlePreviousMonth = useCallback(() => {
//     setCurrentDate((d) => getPreviousMonth(d))
//     setSelectedWeekend(null)
//   }, [])

//   const handleNextMonth = useCallback(() => {
//     setCurrentDate((d) => getNextMonth(d))
//     setSelectedWeekend(null)
//   }, [])

//   const handleSelectWeekend = useCallback((weekend: Date[]) => {
//     setSelectedWeekend(weekend)
//   }, [])

//   const handleBackToOverview = useCallback(() => {
//     setSelectedWeekend(null)
//   }, [])

//   const handleDragStart = useCallback((event: DragStartEvent) => {
//     const { active } = event
//     if (active.data.current?.type === "activity") {
//       setDraggedActivity(active.data.current.activity)
//     }
//   }, [])

//   const handleDragEnd = useCallback(
//     (event: DragEndEvent) => {
//       const { active, over } = event
//       setDraggedActivity(null)

//       if (!over) return

//       const activityData = active.data.current
//       const dropData = over.data.current

//       if (activityData?.type === "activity" && dropData?.type === "timeslot") {
//         const activity = activityData.activity as Activity
//         const { date, time } = dropData

//         const success = addActivity(activity, date, time)
//         if (success) {
//           toast.success(`${activity.title} added to your schedule!`)
//         } else {
//           toast.error("This time slot is already occupied")
//         }
//       }
//     },
//     [addActivity]
//   )

//   const handleCreateActivity = useCallback(
//     (activity: Activity) => {
//       createCustomActivity(activity)
//     },
//     [createCustomActivity]
//   )

//   // get plan for a specific weekend from allPlans (overview)
//   const getPlanForWeekend = useCallback(
//     (weekend: Date[]) => {
//       const weekStart = getWeekStartFromWeekend(weekend[0]) // this returns a monday-key string (legacy)
//       return allPlans.find((p) => p.weekStart === weekStart)
//     },
//     [allPlans]
//   )

//   if (isLoading) {
//     return (
//       <motion.div className="min-h-screen bg-background flex items-center justify-center">
//         <p className="text-muted-foreground">Loading your weekend plans...</p>
//       </motion.div>
//     )
//   }

//   return (
//     <motion.div className="min-h-screen bg-background" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
//       <PlannerNavbar currentDate={currentDate} onPreviousWeek={handlePreviousMonth} onNextWeek={handleNextMonth} showAllWeekends />

//       <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
//         <div className="container mx-auto px-4 py-6">
//           <div className="grid lg:grid-cols-4 gap-6">
//             <div className="lg:col-span-1">
//               <ActivityBrowser selectedVibe={selectedVibe} onVibeChange={setSelectedVibe} customActivities={customActivities} onAddActivity={handleCreateActivity} />
//             </div>

//             <div className="lg:col-span-3">
//               <AnimatePresence mode="wait">
//                 {selectedWeekend ? (
//                   <motion.div key="detail-view" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
//                     <WeeklyCalendar currentDate={effectiveDate} activities={weekendPlan?.activities || []} onRemoveActivity={removeActivity} />

//                     <button onClick={handleBackToOverview} className="mt-4 px-4 py-2 rounded bg-secondary text-secondary-foreground">
//                       Back to All Weekends
//                     </button>
//                   </motion.div>
//                 ) : (
//                   <motion.div key="overview" className="space-y-6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
//                     <div className="flex items-center justify-between">
//                       <motion.h1 className="text-2xl font-bold">{currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })} Weekends</motion.h1>
//                       <CreateActivityModal onCreateActivity={handleCreateActivity} />
//                     </div>

//                     {monthWeekends.length === 0 ? (
//                       <motion.div className="text-center py-12 text-muted-foreground">
//                         <p>No weekends found in this month.</p>
//                       </motion.div>
//                     ) : (
//                       <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                         {monthWeekends.map((weekend, index) => {
//                           const weekendKey = weekend.map((d) => d.toISOString()).join("-")
//                           const plan = getPlanForWeekend(weekend)

//                           return (
//                             <motion.div key={weekendKey} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index }}>
//                               <WeekendCard weekend={weekend} plan={plan} onSelectWeekend={handleSelectWeekend} />
//                             </motion.div>
//                           )
//                         })}
//                       </motion.div>
//                     )}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>
//         </div>

//         <DragOverlay>
//           {draggedActivity ? (
//             <motion.div initial={{ scale: 1.05, rotate: 5 }} animate={{ scale: 1.1, rotate: 8 }} transition={{ duration: 0.2 }}>
//               <ActivityCard activity={draggedActivity} isDragging />
//             </motion.div>
//           ) : null}
//         </DragOverlay>
//       </DndContext>
//     </motion.div>
//   )
// }
