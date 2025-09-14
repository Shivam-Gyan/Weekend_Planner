"use client"

import { useState } from "react"
import type { WeekendPlan } from "@/lib/storage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDateRange } from "@/lib/date-utils"
import { Calendar, Clock, MapPin, ChevronDown, ChevronUp } from "lucide-react"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"

interface WeekendCardProps {
  weekend: Date[]
  plan?: WeekendPlan |null,
  onSelectWeekend?: (weekend: Date[]) => void
  isSelected?: boolean
}

export function WeekendCard({ weekend, plan, onSelectWeekend, isSelected = false }: WeekendCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const weekendTitle =
    weekend.length === 2
      ? formatDateRange(weekend[0], weekend[1])
      : weekend[0].toLocaleDateString("en-US", { month: "short", day: "numeric" })

  const activitiesCount = plan?.activities.length || 0

  const getActivitiesForDay = (date: Date) => {
    if (!plan) return []
    const dateStr = date.toISOString().split("T")[0]
    return plan.activities.filter((activity) => activity.date === dateStr)
  }

  const handleCardClick = () => {
    if (onSelectWeekend) {
      onSelectWeekend(weekend)
    } else {
      setIsOpen(!isOpen)
    }
  }

  return (
    <Card
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected ? "ring-2 ring-primary shadow-md" : ""
      }`}
    >
      <CardHeader className="pb-3" onClick={handleCardClick}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{weekendTitle}</CardTitle>
          <div className="flex items-center gap-2">
            {activitiesCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {activitiesCount} {activitiesCount === 1 ? "activity" : "activities"}
              </Badge>
            )}
            {onSelectWeekend ? (
              <Calendar className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      {!onSelectWeekend && (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleContent>
            <CardContent className="pt-0">
              {activitiesCount === 0 ? (
                <div className="text-center py-4 text-muted-foreground text-sm">No activities planned yet</div>
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
                                className="flex items-center gap-2 p-2 bg-muted/30 rounded-md"
                              >
                                <span className="text-sm">{activity.icon}</span>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-sm truncate">{activity.title}</span>
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
