"use client"

import type React from "react"

import { useState } from "react"
import { type Activity, categories, vibes } from "@/lib/activities"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus } from "lucide-react"

interface CreateActivityModalProps {
  onCreateActivity: (activity: Activity) => void
  trigger?: React.ReactNode
}

export function CreateActivityModal({ onCreateActivity, trigger }: CreateActivityModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    duration: 60,
    icon: "📝",
    tags: [] as string[],
    vibes: [] as string[],
  })


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.category) return

    const newActivity: Activity = {
      id: `custom-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      tags: formData.tags,
      duration: formData.duration,
      icon: formData.icon,
      vibe: formData.vibes,
    }

    console.log("Creating new activity:", newActivity)

    onCreateActivity(newActivity)
    setOpen(false)
    setFormData({
      title: "",
      description: "",
      category: "",
      duration: 60,
      icon: "📝",
      tags: [],
      vibes: [],
    })
  }

  const handleTagsChange = (value: string) => {
    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
    setFormData((prev) => ({ ...prev, tags }))
  }

  const handleVibeToggle = (vibeId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      vibes: checked ? [...prev.vibes, vibeId] : prev.vibes.filter((v) => v !== vibeId),
    }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Create Activity
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Custom Activity</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Activity Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Morning Jog"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of the activity"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories
                    .filter((cat) => cat !== "All")
                    .map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData((prev) => ({ ...prev, duration: Number.parseInt(e.target.value) || 60 }))}
                min="15"
                max="480"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Icon (emoji)</Label>
            <Input
              id="icon"
              value={formData.icon}
              onChange={(e) => setFormData((prev) => ({ ...prev, icon: e.target.value }))}
              placeholder="📝"
              maxLength={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={formData.tags.join(", ")}
              onChange={(e) => handleTagsChange(e.target.value)}
              placeholder="outdoor, exercise, fun"
            />
          </div>

          <div className="space-y-2">
            <Label>Weekend Vibes</Label>
            <div className="space-y-2">
              {vibes.map((vibe) => (
                <div key={vibe.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={vibe.id}
                    checked={formData.vibes.includes(vibe.id)}
                    onCheckedChange={(checked) => handleVibeToggle(vibe.id, !!checked)}
                  />
                  <Label htmlFor={vibe.id} className="text-sm">
                    {vibe.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Create Activity
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}



