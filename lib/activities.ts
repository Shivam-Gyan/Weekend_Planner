export interface Activity {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  duration: number // in minutes
  icon: string
  vibe: string[] // which weekend vibes this activity fits
}

export const defaultActivities: Activity[] = [
  {
    id: "hiking",
    title: "Nature Hiking",
    description: "Explore scenic trails and enjoy fresh air",
    category: "Outdoor",
    tags: ["outdoor", "exercise", "nature"],
    duration: 180,
    icon: "🥾",
    vibe: ["adventurous", "balanced"],
  },
  {
    id: "brunch",
    title: "Weekend Brunch",
    description: "Enjoy a leisurely meal with friends",
    category: "Food",
    tags: ["food", "social", "relaxing"],
    duration: 120,
    icon: "🥐",
    vibe: ["relaxed", "family", "balanced"],
  },
  {
    id: "movie",
    title: "Movie Night",
    description: "Watch a great film at home or cinema",
    category: "Entertainment",
    tags: ["indoor", "entertainment", "relaxing"],
    duration: 150,
    icon: "🎬",
    vibe: ["relaxed", "family"],
  },
  {
    id: "workout",
    title: "Gym Session",
    description: "Stay fit with a good workout",
    category: "Fitness",
    tags: ["indoor", "exercise", "health"],
    duration: 90,
    icon: "💪",
    vibe: ["adventurous", "balanced"],
  },
  {
    id: "cooking",
    title: "Cooking Class",
    description: "Learn new recipes and cooking techniques",
    category: "Learning",
    tags: ["indoor", "learning", "food"],
    duration: 120,
    icon: "👨‍🍳",
    vibe: ["family", "balanced"],
  },
  {
    id: "reading",
    title: "Reading Time",
    description: "Dive into a good book",
    category: "Relaxation",
    tags: ["indoor", "relaxing", "learning"],
    duration: 60,
    icon: "📚",
    vibe: ["relaxed"],
  },
  {
    id: "cycling",
    title: "Bike Ride",
    description: "Cycle through the city or countryside",
    category: "Outdoor",
    tags: ["outdoor", "exercise", "adventure"],
    duration: 120,
    icon: "🚴",
    vibe: ["adventurous", "balanced"],
  },
  {
    id: "museum",
    title: "Museum Visit",
    description: "Explore art, history, or science exhibits",
    category: "Culture",
    tags: ["indoor", "learning", "culture"],
    duration: 180,
    icon: "🏛️",
    vibe: ["family", "balanced"],
  },
  {
    id: "picnic",
    title: "Park Picnic",
    description: "Enjoy food outdoors with family or friends",
    category: "Outdoor",
    tags: ["outdoor", "food", "social"],
    duration: 150,
    icon: "🧺",
    vibe: ["family", "relaxed", "balanced"],
  },
  {
    id: "gaming",
    title: "Video Games",
    description: "Play your favorite games solo or with friends",
    category: "Entertainment",
    tags: ["indoor", "entertainment", "social"],
    duration: 120,
    icon: "🎮",
    vibe: ["relaxed"],
  },
  {
    id: "shopping",
    title: "Shopping Trip",
    description: "Browse stores and find new items",
    category: "Lifestyle",
    tags: ["indoor", "social", "lifestyle"],
    duration: 180,
    icon: "🛍️",
    vibe: ["family", "balanced"],
  },
  {
    id: "yoga",
    title: "Yoga Session",
    description: "Relax and stretch with mindful movement",
    category: "Fitness",
    tags: ["indoor", "exercise", "relaxing"],
    duration: 75,
    icon: "🧘",
    vibe: ["relaxed", "balanced"],
  },
]

export const categories = [
  "All",
  "Outdoor",
  "Indoor",
  "Food",
  "Entertainment",
  "Fitness",
  "Learning",
  "Culture",
  "Lifestyle",
  "Relaxation",
]

export const vibes = [
  { id: "balanced", name: "Balanced", description: "Mix of active and relaxing activities" },
  { id: "adventurous", name: "Adventurous", description: "High-energy outdoor activities" },
  { id: "relaxed", name: "Relaxed", description: "Calm and peaceful activities" },
  { id: "family", name: "Family", description: "Activities perfect for family time" },
]
