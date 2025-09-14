export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export function formatDateShort(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date)
}

export function formatDateRange(startDate: Date, endDate: Date): string {
  const start = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(startDate)

  const end = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(endDate)

  return `${start} – ${end}`
}

export function getWeekDates(date: Date): Date[] {
  const week: Date[] = []
  const startOfWeek = new Date(date)
  const day = startOfWeek.getDay()
  const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1) // Monday-based
  startOfWeek.setDate(diff)
  startOfWeek.setHours(0, 0, 0, 0)

  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek)
    d.setDate(startOfWeek.getDate() + i)
    week.push(d)
  }

  return week
}

export function getWeekendDates(date: Date): Date[] {
  const weekDates = getWeekDates(date)
  return [weekDates[5], weekDates[6]] // Saturday and Sunday
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay()
  return day === 0 || day === 6 // Sunday or Saturday
}

export function getTimeSlots(): string[] {
    return [
    "06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"
  ]
}

export function getMonthWeekends(date: Date): Date[][] {
  const year = date.getFullYear()
  const month = date.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  const weekends: Date[][] = []

  for (let day = 1; day <= lastDay.getDate(); day++) {
    const currentDate = new Date(year, month, day)

    if (currentDate.getDay() === 6) {
      const saturday = new Date(currentDate)
      const sunday = new Date(currentDate)
      sunday.setDate(saturday.getDate() + 1)

      if (sunday.getMonth() === month) {
        weekends.push([saturday, sunday])
      } else if (saturday.getMonth() === month) {
        weekends.push([saturday])
      }
    }
  }

  return weekends
}

export function getPreviousMonth(date: Date): Date {
  const newDate = new Date(date)
  newDate.setMonth(newDate.getMonth() - 1)
  return newDate
}

export function getNextMonth(date: Date): Date {
  const newDate = new Date(date)
  newDate.setMonth(newDate.getMonth() + 1)
  return newDate
}

/**
 * Legacy helper that returns a monday-key string (kept for backward compatibility).
 */
export function getWeekStartFromWeekend(weekendDate: Date): string {
  const monday = new Date(weekendDate)
  const day = monday.getDay()
  const diff = monday.getDate() - day + (day === 0 ? -6 : 1)
  monday.setDate(diff)
  monday.setHours(0, 0, 0, 0)
  return monday.toISOString().split("T")[0]
}

/**
 * Return Date object representing Saturday for a given Saturday/Sunday input.
 */
export function getWeekendStartDate(weekendDate: Date): Date {
  const d = new Date(weekendDate)
  const day = d.getDay()

  if (day === 0) {
    d.setDate(d.getDate() - 1) // Sunday → Saturday
  } else if (day !== 6) {
    const diffToSaturday = (day + 1) % 7 + 1
    d.setDate(d.getDate() - diffToSaturday)
  }

  d.setHours(0, 0, 0, 0)
  return d
}

/**
 * Canonical weekStart string used by the planner (YYYY-MM-DD of the Saturday).
 */
export function getWeekendWeekStartString(date: Date): string {
  const saturday = getWeekendStartDate(date)
  return saturday.toISOString().split("T")[0]
}

/**
 * Check if a weekend (based on its Saturday) has already passed.
 * Returns true if the given weekend’s Saturday is strictly before today.
 */

export function isPastWeekend(date: Date): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date < today
}

export function isCurrentWeekend(date: Date): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const day = today.getDay() // 0=Sun,6=Sat
  const saturday = new Date(today)
  saturday.setDate(today.getDate() - day + 6)
  saturday.setHours(0, 0, 0, 0)

  const sunday = new Date(saturday)
  sunday.setDate(saturday.getDate() + 1)
  sunday.setHours(0, 0, 0, 0)

  return date.getTime() === saturday.getTime() || date.getTime() === sunday.getTime()
}

