"use client"

import type { ScheduledActivity } from "@/lib/storage"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, X } from "lucide-react"
import { useDroppable } from "@dnd-kit/core"

interface TimeSlotProps {
  time: string
  date: string
  activity?: ScheduledActivity
  onRemoveActivity?: (activityId: string) => void
  onEditActivity?: (activity: ScheduledActivity) => void
}

export function TimeSlot({ time, date, activity, onRemoveActivity, onEditActivity }: TimeSlotProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: `${date}-${time}`,
    data: {
      type: "timeslot",
      date,
      time,
    },
  })

  return (
    <div
      ref={setNodeRef}
      className={`min-h-16 border-b border-border/50 transition-colors ${
        isOver ? "bg-primary/10 border-primary/30" : ""
      }`}
    >
      <div className="flex items-center h-full p-2">
        <div className="w-16 text-xs text-muted-foreground font-mono">{time}</div>
        <div className="flex-1 ml-2">
          {activity ? (
            <Card className="bg-primary/5 border-primary/20 hover:shadow-sm transition-shadow">
              <CardContent className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 flex-1 min-w-0">
                    <span className="text-lg flex-shrink-0">{activity.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-card-foreground truncate">{activity.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>
                            {Math.floor(activity.duration / 60)}h {activity.duration % 60}m
                          </span>
                        </div>
                        {activity.location && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate">{activity.location}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {activity.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => onRemoveActivity?.(activity.scheduledId)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="h-12 flex items-center justify-center text-xs text-muted-foreground border-2 border-dashed border-border/30 rounded-md">
              Drop activity here
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
