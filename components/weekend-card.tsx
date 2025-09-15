"use client"

import { useState } from "react"
import type { WeekendPlan } from "@/lib/storage"
import {
  getWeekendPlans,
  deleteWeekendPlan,
  saveWeekendPlan,
} from "@/lib/storage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDateRange } from "@/lib/date-utils"
import {
  Calendar,
  Clock,
  MapPin,
  ChevronDown,
  ChevronUp,
  ListChecks,
  CalendarDays,
  Trash2,
} from "lucide-react"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"

interface WeekendCardProps {
  weekend: Date[]
  plan?: WeekendPlan | null
  onSelectWeekend?: (weekend: Date[]) => void
  isSelected?: boolean
}

export function WeekendCard({
  weekend,
  plan: initialPlan,
  onSelectWeekend,
  isSelected = false,
}: WeekendCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [plan, setPlan] = useState<WeekendPlan | null>(initialPlan || null)

  const weekendTitle =
    weekend.length === 2
      ? formatDateRange(weekend[0], weekend[1])
      : weekend[0].toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })

  const activitiesCount = plan?.activities.length || 0

  const getActivitiesForDay = (date: Date) => {
    if (!plan) return []
    const dateStr = date.toLocaleDateString("en-CA") // YYYY-MM-DD local
    return plan.activities.filter((activity) => activity.date === dateStr)
  }

  const handleCardClick = () => {
    if (onSelectWeekend) {
      onSelectWeekend(weekend)
    } else {
      setIsOpen(!isOpen)
    }
  }

  const handleDelete = () => {
    if (!plan) return
    deleteWeekendPlan(plan.id)
    setPlan(null) // reset to "empty" weekend state
    setIsOpen(false)
  }

  //  Theme based on plan vibe
  const vibeColors: Record<string, string> = {
    balanced: "from-indigo-50 to-indigo-100 border-indigo-300", // calm + balanced
    adventurous: "from-amber-50 to-amber-100 border-amber-300", // energetic
    relaxed: "from-sky-50 to-sky-100 border-sky-300", // soothing, relaxing vibe
    family: "from-rose-50 to-rose-100 border-rose-300", // warm, family-friendly
  }

  const vibe = plan?.vibe || "balanced"
  const cardTheme = vibeColors[vibe] || vibeColors["balanced"]

  const weekendStart = weekend[0]?.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
  const updatedOn = plan?.updatedAt
    ? new Date(plan.updatedAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—"

  return (
    <Card
      className={`cursor-pointer transition-all duration-200 hover:shadow-md 
      rounded-xl border shadow-sm bg-gradient-to-br ${cardTheme} 
      ${isSelected ? "ring-2 ring-primary shadow-md" : ""}`}
    >
      <CardHeader className="pb-3" onClick={handleCardClick}>
        {/* Title row */}
        <div className="w-full flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" />
            {weekendTitle}
          </CardTitle>

          {/* Delete button only if a plan exists */}
          {plan && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
              onClick={(e) => {
                e.stopPropagation()
                handleDelete()
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* badges + icons row */}
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {plan?.vibe && (
            <Badge
              className={`text-xs capitalize flex items-center gap-1 ${cardTheme}`}
              variant="outline"
            >
              {plan.vibe}
            </Badge>
          )}
          {activitiesCount > 0 && (
            <Badge variant="secondary" className="text-xs flex items-center gap-1">
              <ListChecks className="h-3 w-3" />
              {activitiesCount} {activitiesCount === 1 ? "activity" : "activities"}
            </Badge>
          )}
          {/* {onSelectWeekend ? (
            <Calendar className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          )} */}
        </div>

        {/* extra info row */}
        <div className="flex flex-col gap-2 mt-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3" />
            <span>Start: {weekendStart}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Updated: {updatedOn}</span>
          </div>
        </div>
      </CardHeader>

      {!onSelectWeekend && (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleContent>
            <CardContent className="pt-0">
              {activitiesCount === 0 || !plan ? (
                <div className="text-center py-4 text-muted-foreground text-sm">
                  No activities planned yet
                </div>
              ) : (
                <div className="space-y-4">
                  {weekend.map((date) => {
                    const dayActivities = getActivitiesForDay(date)
                    const dayName = date.toLocaleDateString("en-US", { weekday: "long" })

                    if (dayActivities.length === 0) return null

                    return (
                      <div key={date.toISOString()} className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground">{dayName}</h4>
                        <div className="space-y-2">
                          {dayActivities
                            .sort((a, b) => a.time.localeCompare(b.time))
                            .map((activity) => (
                              <div
                                key={activity.scheduledId}
                                className="flex items-center gap-2 p-2 bg-white/70 rounded-lg shadow-sm"
                              >
                                <span className="text-base">{activity.icon}</span>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-sm truncate">
                                      {activity.title}
                                    </span>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                      <Clock className="h-3 w-3" />
                                      <span>{activity.time}</span>
                                    </div>
                                  </div>
                                  {activity.location && (
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                      <MapPin className="h-3 w-3" />
                                      <span className="truncate">{activity.location}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      )}
    </Card>
  )
}
