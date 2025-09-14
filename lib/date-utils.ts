// export function formatDate(date: Date): string {
//   return new Intl.DateTimeFormat("en-US", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   }).format(date)
// }

// export function formatDateShort(date: Date): string {
//   return new Intl.DateTimeFormat("en-US", {
//     month: "short",
//     day: "numeric",
//   }).format(date)
// }

// export function formatDateRange(startDate: Date, endDate: Date): string {
//   const start = new Intl.DateTimeFormat("en-US", {
//     month: "short",
//     day: "numeric",
//   }).format(startDate)

//   const end = new Intl.DateTimeFormat("en-US", {
//     month: "short",
//     day: "numeric",
//   }).format(endDate)

//   return `${start} – ${end}`
// }

// export function getWeekDates(date: Date): Date[] {
//   const week = []
//   const startOfWeek = new Date(date)
//   const day = startOfWeek.getDay()
//   const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is Sunday
//   startOfWeek.setDate(diff)

//   for (let i = 0; i < 7; i++) {
//     const day = new Date(startOfWeek)
//     day.setDate(startOfWeek.getDate() + i)
//     week.push(day)
//   }

//   return week
// }

// export function getWeekendDates(date: Date): Date[] {
//   const weekDates = getWeekDates(date)
//   return [weekDates[5], weekDates[6]] // Saturday and Sunday
// }

// export function isSameDay(date1: Date, date2: Date): boolean {
//   return (
//     date1.getFullYear() === date2.getFullYear() &&
//     date1.getMonth() === date2.getMonth() &&
//     date1.getDate() === date2.getDate()
//   )
// }

// export function isWeekend(date: Date): boolean {
//   const day = date.getDay()
//   return day === 0 || day === 6 // Sunday or Saturday
// }

// export function getTimeSlots(): string[] {
//   return ["06:00", "09:00", "12:00", "15:00", "18:00", "21:00"]
// }

// export function getMonthWeekends(date: Date): Date[][] {
//   const year = date.getFullYear()
//   const month = date.getMonth()

//   // Get first day of month
//   const firstDay = new Date(year, month, 1)
//   // Get last day of month
//   const lastDay = new Date(year, month + 1, 0)

//   const weekends: Date[][] = []

//   // Find all weekends in the month
//   for (let day = 1; day <= lastDay.getDate(); day++) {
//     const currentDate = new Date(year, month, day)

//     // If it's Saturday, create a weekend pair
//     if (currentDate.getDay() === 6) {
//       const saturday = new Date(currentDate)
//       const sunday = new Date(currentDate)
//       sunday.setDate(saturday.getDate() + 1)

//       // Only include if both days are in the same month
//       if (sunday.getMonth() === month) {
//         weekends.push([saturday, sunday])
//       } else if (saturday.getMonth() === month) {
//         // Include Saturday even if Sunday is next month
//         weekends.push([saturday])
//       }
//     }
//   }

//   return weekends
// }

// export function getPreviousMonth(date: Date): Date {
//   const newDate = new Date(date)
//   newDate.setMonth(newDate.getMonth() - 1)
//   return newDate
// }

// export function getNextMonth(date: Date): Date {
//   const newDate = new Date(date)
//   newDate.setMonth(newDate.getMonth() + 1)
//   return newDate
// }

// export function getWeekStartFromWeekend(weekendDate: Date): string {
//   const monday = new Date(weekendDate)
//   const day = monday.getDay()
//   const diff = monday.getDate() - day + (day === 0 ? -6 : 1)
//   monday.setDate(diff)
//   return monday.toISOString().split("T")[0]
// }

// export function getWeekendStartDate(weekendDate: Date): Date {
//   const d = new Date(weekendDate)
//   const day = d.getDay()

//   // If it's Sunday (0), shift back one day to Saturday (6)
//   if (day === 0) {
//     d.setDate(d.getDate() - 1)
//   } else if (day !== 6) {
//     throw new Error("getWeekendStartDate expects a Saturday or Sunday date")
//   }

//   d.setHours(0, 0, 0, 0)
//   console.log("weekend start date", d)
//   return d
// }



// // src/lib/date-utils.ts
// export function formatDate(date: Date): string {
//   return new Intl.DateTimeFormat("en-US", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   }).format(date)
// }

// export function formatDateShort(date: Date): string {
//   return new Intl.DateTimeFormat("en-US", {
//     month: "short",
//     day: "numeric",
//   }).format(date)
// }

// export function formatDateRange(startDate: Date, endDate: Date): string {
//   const start = new Intl.DateTimeFormat("en-US", {
//     month: "short",
//     day: "numeric",
//   }).format(startDate)

//   const end = new Intl.DateTimeFormat("en-US", {
//     month: "short",
//     day: "numeric",
//   }).format(endDate)

//   return `${start} – ${end}`
// }

// export function getWeekDates(date: Date): Date[] {
//   const week: Date[] = []
//   const startOfWeek = new Date(date)
//   const day = startOfWeek.getDay()
//   const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1) // Monday-based
//   startOfWeek.setDate(diff)
//   startOfWeek.setHours(0, 0, 0, 0)

//   for (let i = 0; i < 7; i++) {
//     const d = new Date(startOfWeek)
//     d.setDate(startOfWeek.getDate() + i)
//     week.push(d)
//   }

//   return week
// }

// export function getWeekendDates(date: Date): Date[] {
//   const weekDates = getWeekDates(date)
//   return [weekDates[5], weekDates[6]] // Saturday and Sunday
// }

// export function isSameDay(date1: Date, date2: Date): boolean {
//   return (
//     date1.getFullYear() === date2.getFullYear() &&
//     date1.getMonth() === date2.getMonth() &&
//     date1.getDate() === date2.getDate()
//   )
// }

// export function isWeekend(date: Date): boolean {
//   const day = date.getDay()
//   return day === 0 || day === 6 // Sunday or Saturday
// }

// export function getTimeSlots(): string[] {
//   return ["06:00", "09:00", "12:00", "15:00", "18:00", "21:00"]
// }

// export function getMonthWeekends(date: Date): Date[][] {
//   const year = date.getFullYear()
//   const month = date.getMonth()

//   // Get first day of month
//   const firstDay = new Date(year, month, 1)
//   // Get last day of month
//   const lastDay = new Date(year, month + 1, 0)

//   const weekends: Date[][] = []

//   // Find all weekends in the month
//   for (let day = 1; day <= lastDay.getDate(); day++) {
//     const currentDate = new Date(year, month, day)

//     // If it's Saturday, create a weekend pair
//     if (currentDate.getDay() === 6) {
//       const saturday = new Date(currentDate)
//       const sunday = new Date(currentDate)
//       sunday.setDate(saturday.getDate() + 1)

//       // Only include if both days are in the same month
//       if (sunday.getMonth() === month) {
//         weekends.push([saturday, sunday])
//       } else if (saturday.getMonth() === month) {
//         // Include Saturday even if Sunday is next month
//         weekends.push([saturday])
//       }
//     }
//   }

//   return weekends
// }

// export function getPreviousMonth(date: Date): Date {
//   const newDate = new Date(date)
//   newDate.setMonth(newDate.getMonth() - 1)
//   return newDate
// }

// export function getNextMonth(date: Date): Date {
//   const newDate = new Date(date)
//   newDate.setMonth(newDate.getMonth() + 1)
//   return newDate
// }

// /**
//  * Legacy helper that returns a monday-key string (kept for backward compatibility).
//  * Many places used this earlier; we keep it if other logic depends on it.
//  */
// export function getWeekStartFromWeekend(weekendDate: Date): string {
//   const monday = new Date(weekendDate)
//   const day = monday.getDay()
//   const diff = monday.getDate() - day + (day === 0 ? -6 : 1)
//   monday.setDate(diff)
//   monday.setHours(0, 0, 0, 0)
//   return monday.toISOString().split("T")[0]
// }

// /**
//  * Return Date object representing Saturday for a given Saturday/Sunday input.
//  * If input is Sunday, it shifts back 1 day to Saturday.
//  * If input is already Saturday, returns that date normalized.
//  * If input is any other weekday, shifts to the prior Saturday (safe fallback).
//  */
// export function getWeekendStartDate(weekendDate: Date): Date {
//   const d = new Date(weekendDate)
//   const day = d.getDay()

//   if (day === 0) {
//     // Sunday -> previous day is Saturday
//     d.setDate(d.getDate() - 1)
//   } else if (day !== 6) {
//     // Not Saturday/Sunday -> move to previous Saturday
//     // Compute difference to previous Saturday
//     const diffToSaturday = (day + 1) % 7 + 1 // e.g., Monday(1) -> 2, Tuesday(2)->3 ... simplifies behaviour
//     d.setDate(d.getDate() - diffToSaturday)
//   }

//   d.setHours(0, 0, 0, 0)
//   return d
// }

// /**
//  * Canonical weekStart string used by the planner (YYYY-MM-DD of the Saturday).
//  * Use this when saving / looking up weekend plans.
//  */
// export function getWeekendWeekStartString(date: Date): string {
//   const saturday = getWeekendStartDate(date)
//   return saturday.toISOString().split("T")[0]
// }



// src/lib/date-utils.ts

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
  return ["06:00", "09:00", "12:00", "15:00", "18:00", "21:00"]
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

