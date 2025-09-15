"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import type { Activity } from "@/lib/activities"
import { categories, vibes, defaultActivities } from "@/lib/activities"
import { motion, AnimatePresence } from "framer-motion"

interface AddActivityModalProps {
  modalOpen: boolean
  setModalOpen: (open: boolean) => void
  setActivityData: (data: { activity: Activity; date: string; time: string }) => void
  customActivities: Activity[]
  weekendStart: string
}

const TIME_SLOTS = ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"]

export function AddActivityModal({
  modalOpen,
  setModalOpen,
  setActivityData,
  customActivities,
  weekendStart,
}: AddActivityModalProps) {
  const [selectedActivityId, setSelectedActivityId] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedVibe, setSelectedVibe] = useState("All")
  const [time, setTime] = useState<string>("")
  const [weekend, setWeekend] = useState<"Sat" | "Sun" | "">("")

  const allActivities = [...defaultActivities, ...customActivities]

  const filteredActivities = allActivities.filter((activity) => {
    const matchesCategory = selectedCategory === "All" || activity.category === selectedCategory
    const matchesVibe =
      selectedVibe === "All" || (Array.isArray(activity.vibe) && activity.vibe.includes(selectedVibe))
    return matchesCategory && matchesVibe
  })

  const handleSave = () => {
    if (!selectedActivityId || !time || !weekend) return
    const activity = allActivities.find((a) => a.id === selectedActivityId)
    if (!activity) return

    const date = new Date(weekendStart)
    if (weekend === "Sun") {
      date.setDate(date.getDate() + 1)
    }

    setActivityData({
      activity,
      date: date.toISOString().split("T")[0],
      time,
    })

    setSelectedActivityId("")
    setTime("")
    setWeekend("")
    setModalOpen(false)
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="max-w-5xl rounded-2xl shadow-lg space-y-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Add Activity</DialogTitle>
        </DialogHeader>

        {/* TOP CONTAINER */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-lg p-4 bg-muted/20"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Filters */}
          <div className="space-y-3">
            <div>
              <Label>Filter by Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  {categories.map((cat) =>
                    cat !== "All" ? (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ) : null
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Filter by Vibe</Label>
              <Select value={selectedVibe} onValueChange={setSelectedVibe}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vibe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  {vibes.map((vibe) => (
                    <SelectItem key={vibe.id} value={vibe.id}>
                      {vibe.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Time + Day */}
          <div className="space-y-3">
            <div>
              <Label>Select Time Slot</Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose time slot" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_SLOTS.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Day</Label>
              <Select value={weekend} onValueChange={(val) => setWeekend(val as "Sat" | "Sun")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sat">Saturday</SelectItem>
                  <SelectItem value="Sun">Sunday</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM CONTAINER */}
        <motion.div
          className="rounded-lg border p-4 max-h-72 overflow-y-auto space-y-2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <AnimatePresence>
            {filteredActivities.map((a) => (
              <motion.div
                key={a.id}
                onClick={() => setSelectedActivityId(a.id)}
                className={`cursor-pointer flex items-center gap-2 p-2 rounded-lg border transition ${
                  selectedActivityId === a.id
                    ? "bg-green-100 border-green-500"
                    : "hover:bg-muted/50"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <span className="text-lg">{a.icon}</span>
                <span className="font-medium">{a.title}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!selectedActivityId || !time || !weekend}
            className="bg-green-600 text-white hover:bg-green-700"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
