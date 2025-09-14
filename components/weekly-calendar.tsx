"use client"
import { motion } from "framer-motion"
import type { ScheduledActivity } from "@/lib/storage"
import { getWeekDates, formatDateShort, isWeekend, getTimeSlots } from "@/lib/date-utils"
import { TimeSlot } from "./time-slot"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface WeeklyCalendarProps {
  currentDate: Date
  activities: ScheduledActivity[]
  onRemoveActivity?: (activityId: string) => void
  onEditActivity?: (activity: ScheduledActivity) => void
}

export function WeeklyCalendar({ currentDate, activities, onRemoveActivity, onEditActivity }: WeeklyCalendarProps) {
  const weekDates = getWeekDates(currentDate)
  const timeSlots = getTimeSlots()

  console.log("Rendering WeeklyCalendar for week of")

  const weekendDates = weekDates.filter((date) => isWeekend(date))


  // Helper to get the time (in minutes) from a slot string like "06:00"
  const parseTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number)
    return hours * 60 + minutes
  }

  // For a given date and slot, find the activity that covers this slot (if any)
  const getActivityForSlot = (date: Date, slot: string) => {
    const dateStr = date.toISOString().split("T")[0]
    const slotStart = parseTime(slot)
    const slotEnd = slotStart + 120 // 2 hour slot
    return activities.find((activity) => {
      if (activity.date !== dateStr) return false
      const activityStart = parseTime(activity.time)
      const activityEnd = activityStart + (activity.duration || 120)
      // Show activity in all slots it covers
      return activityStart < slotEnd && activityEnd > slotStart
    })
  }

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {weekendDates.map((date, index) => {
          const dateStr = date.toISOString().split("T")[0]
          const dayName = date.toLocaleDateString("en-US", { weekday: "long" })

          return (
            <motion.div
              key={dateStr}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <Card className="flex flex-col h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>{dayName}</span>
                    <span className="text-sm font-normal text-muted-foreground">{formatDateShort(date)}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-[600px]">
                    <div className="px-4 pb-4">
                      {timeSlots.map((time, timeIndex) => {
                        const activity = getActivityForSlot(date, time)
                        return (
                          <motion.div
                            key={`${dateStr}-${time}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + timeIndex * 0.1 }}
                          >
                            <TimeSlot
                              time={time}
                              date={dateStr}
                              activity={activity}
                              onRemoveActivity={onRemoveActivity}
                              onEditActivity={onEditActivity}
                            />
                          </motion.div>
                        )
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

