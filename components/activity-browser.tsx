"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { type Activity, defaultActivities, categories, vibes } from "@/lib/activities"
import { ActivityCard } from "./activity-card"
import { CreateActivityModal } from "./create-activity-modal"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus } from "lucide-react"

interface ActivityBrowserProps {
  selectedVibe?: string
  onVibeChange?: (vibe: string) => void
  customActivities?: Activity[]
  onAddActivity?: (activity: Activity) => void
}

export function ActivityBrowser({
  selectedVibe = "balanced",
  onVibeChange,
  customActivities = [],
  onAddActivity,
}: ActivityBrowserProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const allActivities = [...defaultActivities, ...customActivities]

  const filteredActivities = useMemo(() => {
    return allActivities.filter((activity) => {
      const matchesSearch =
        activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "All" || activity.category === selectedCategory

      // temporary remove vibe filtering
      // const matchesVibe = activity.vibe.includes(selectedVibe)
      // return matchesSearch && matchesCategory && matchesVibe

      
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory, selectedVibe])

  return (
    <motion.div
      className="space-y-6 h-full"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Weekend Vibe Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Weekend Vibe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {vibes.map((vibe, index) => (
              <motion.div
                key={vibe.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant={selectedVibe === vibe.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => onVibeChange?.(vibe.id)}
                  className="w-full justify-start"
                >
                  {vibe.name}
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Browse Activities */}
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Browse Activities</CardTitle>
            <CreateActivityModal
              onCreateActivity={onAddActivity || (() => { })}
              trigger={
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Create
                </Button>
              }
            />
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col space-y-4">
          {/* Search */}
          <div className="relative w-full border-2 border-green-500 rounded-md hover:ring-2 hover:ring-green-600 transition-all duration-200 ">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="w-full border-2 border-green-500 rounded-md hover:ring-2 hover:ring-green-600 transition-all duration-200">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto w-full">
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>


          <div className="flex-1 overflow-y-auto max-h-68 space-y-2 py-2">
            <AnimatePresence initial={false}>
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ActivityCard activity={activity} compact={true} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  className="text-center py-8 text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p>No activities found matching your criteria.</p>
                  <p className="text-sm mt-1">Try adjusting your search or filters.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </CardContent>
      </Card>
    </motion.div>
  )
}
