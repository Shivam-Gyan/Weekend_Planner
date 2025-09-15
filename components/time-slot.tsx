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

  // vibe + category colors
  const vibeColors: Record<string, string> = {
    balanced: "bg-indigo-100/80 border-indigo-200 text-indigo-600",
    adventurous: "bg-amber-100/80 border-amber-200 text-amber-600",
    relaxed: "bg-sky-100/80 border-sky-200 text-sky-600",
    family: "bg-rose-100/80 border-rose-200 text-rose-600",
  }

  return (
    <div
      ref={setNodeRef}
      className={`min-h-16 border-b border-border/50 transition-colors ${
        isOver ? "bg-primary/10 border-primary/30" : ""
      }`}
    >
      <div className="flex items-center h-full p-2">
        {/* Time column */}
        <div className="w-16 text-xs text-muted-foreground font-mono">{time}</div>

        {/* Activity / Dropzone */}
        <div className="flex-1 ml-2">
          {activity ? (
            <Card className="border bg-gradient-to-br from-primary/5 to-background hover:shadow-md transition-all rounded-xl">
              {/* 🔹 Reduced padding here */}
              <CardContent className="">
                <div className="flex items-start justify-between gap-2">
                  {/* Left content */}
                  <div
                    className="flex items-start gap-2 flex-1 min-w-0 cursor-pointer"
                    onClick={() => onEditActivity?.(activity)}
                  >
                    {/* Icon */}
                    <span className="text-lg sm:text-xl flex-shrink-0">{activity.icon}</span>

                    <div className="flex-1 min-w-0">
                      {/* Title */}
                      <h4 className="font-semibold text-sm text-card-foreground truncate">
                        {activity.title}
                      </h4>

                      {/* Description */}
                      {activity.description && (
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                          {activity.description}
                        </p>
                      )}

                      {/* Meta info */}
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            {Math.floor(activity.duration / 60)}h {activity.duration % 60}m
                          </span>
                        </div>
                        {activity.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate">{activity.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Vibes + Category + Tags */}
                      <div className="flex flex-col gap-1 mt-2">
                        {/* Vibe */}
                        {activity.vibe?.length > 0 && (
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-xs">Vibe:</span>
                            {activity.vibe.map((v: string) => (
                              <Badge
                                key={v}
                                variant="outline"
                                className={`text-xs capitalize border ${
                                  vibeColors[v] || "border-gray-300 text-gray-600"
                                }`}
                              >
                                {v}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Category */}
                        {activity.category && (
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-xs">Category:</span>
                            <Badge
                              variant="outline"
                              className="text-xs capitalize border border-emerald-200 text-emerald-600 from-emerald-50 to-emerald-100"
                            >
                              {activity.category}
                            </Badge>
                          </div>
                        )}

                        {/* Tags */}
                        {activity.tags?.length > 0 && (
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-xs">Tags:</span>
                            {activity.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right actions */}
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
