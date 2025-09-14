// "use client"

// import type { ScheduledActivity, WeekendPlan } from "@/lib/storage"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { TimeSlot } from "./time-slot"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { formatDateShort, getTimeSlots } from "@/lib/date-utils"
// import { ArrowLeft } from "lucide-react"

// interface WeekendDetailViewProps {
//   weekend: Date[]
//   plan?: WeekendPlan | null
//   activities: ScheduledActivity[]
//   onBack: () => void
//   onRemoveActivity?: (activityId: string) => void
//   onEditActivity?: (activity: ScheduledActivity) => void
// }

// export function WeekendDetailView({
//   weekend,
//   plan,
//   activities,
//   onBack,
//   onRemoveActivity,
//   onEditActivity,
// }: WeekendDetailViewProps) {
//   const timeSlots = getTimeSlots()

//   const getActivitiesForDateAndTime = (date: Date, time: string) => {
//     const dateStr = date.toISOString().split("T")[0]
//     return activities.find((activity) => activity.date === dateStr && activity.time === time)
//   }

//   console.log({ weekend, plan, activities })

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center gap-4">
//         <Button variant="outline" size="sm" onClick={onBack}>
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Back to Overview
//         </Button>
//         <h2 className="text-xl font-semibold">
//           Weekend of{" "}
//           {weekend.length === 2
//             ? formatDateShort(weekend[0]) + " – " + formatDateShort(weekend[1])
//             : formatDateShort(weekend[0])}
//         </h2>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//         {weekend.map((date) => {
//           const dateStr = date.toISOString().split("T")[0]
//           const dayName = date.toLocaleDateString("en-US", { weekday: "long" })

//           return (
//             <Card key={dateStr} className="flex flex-col">
//               <CardHeader className="pb-3">
//                 <CardTitle className="text-lg flex items-center justify-between">
//                   <span>{dayName}</span>
//                   <span className="text-sm font-normal text-muted-foreground">{formatDateShort(date)}</span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="flex-1 p-0">
//                 <ScrollArea className="h-96">
//                   <div className="px-4 pb-4">
//                     {timeSlots.map((time) => {
//                       const activity = getActivitiesForDateAndTime(date, time)
//                       return (
//                         <TimeSlot
//                           key={`${dateStr}-${time}`}
//                           time={time}
//                           date={dateStr}
//                           activity={activity}
//                           onRemoveActivity={onRemoveActivity}
//                           onEditActivity={onEditActivity}
//                         />
//                       )
//                     })}
//                   </div>
//                 </ScrollArea>
//               </CardContent>
//             </Card>
//           )
//         })}
//       </div>
//     </div>
//   )
// }


// // "use client"

// // import { ActivityCard } from "./activity-card"
// // import { ScheduledActivity, WeekendPlan } from "@/lib/storage"
// // import { useDroppable } from "@dnd-kit/core"

// // interface Props {
// //   weekend: Date[]
// //   plan: WeekendPlan | null
// //   activities: ScheduledActivity[]
// //   onBack: () => void
// //   onRemoveActivity: (id: string) => void
// // }

// // function TimeSlot({ date, time, children }: { date: string; time: string; children?: React.ReactNode }) {
// //   // 👇 Make this div a drop target
// //   const { setNodeRef, isOver } = useDroppable({
// //     id: `${date}-${time}`,
// //     data: { type: "timeslot", date, time },
// //   })

// //   return (
// //     <div
// //       ref={setNodeRef}
// //       className={`border rounded p-2 min-h-[60px] transition
// //         ${isOver ? "bg-blue-100 border-blue-500" : "bg-gray-50"}
// //       `}
// //     >
// //       <div className="text-xs text-gray-500 mb-1">{time}</div>
// //       {children}
// //     </div>
// //   )
// // }

// // export function WeekendDetailView({ weekend, activities, onBack, onRemoveActivity }: Props) {
// //   const slots = ["morning", "afternoon", "evening"]

// //   return (
// //     <div>
// //       <button onClick={onBack} className="mb-4 text-sm text-blue-600 underline">
// //         ← Back
// //       </button>

// //       <div className="grid grid-cols-2 gap-4">
// //         {weekend.map((day, i) => {
// //           const dateStr = day.toISOString()
// //           return (
// //             <div key={i}>
// //               <h3 className="font-medium mb-2">{day.toDateString()}</h3>
// //               <div className="space-y-2">
// //                 {slots.map((time) => (
// //                   <TimeSlot key={time} date={dateStr} time={time}>
// //                     {activities
// //                       .filter((a) => a.date === dateStr && a.time === time)
// //                       .map((a) => (
// //                         <ActivityCard
// //                           key={a.scheduledId}
// //                           activity={a}
// //                           onRemove={() => onRemoveActivity(a.scheduledId)}
// //                         />
// //                       ))}
// //                   </TimeSlot>
// //                 ))}
// //               </div>
// //             </div>
// //           )
// //         })}
// //       </div>
// //     </div>
// //   )
// // }

