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

//   console.log("formatDateRange returns", `${start} – ${end}`)

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
//   console.log("getWeekDates returns", week)

//   return week
// }

// export function getWeekendDates(date: Date): Date[] {
//   const weekDates = getWeekDates(date)
//   console.log("getWeekendDates returns", [weekDates[5], weekDates[6]])
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
//   console.log("isWeekend returns", day === 0 || day === 6)
//   return day === 0 || day === 6 // Sunday or Saturday
// }

// export function getTimeSlots(): string[] {
//     return [
//     "06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"
//   ]
// }

// export function getMonthWeekends(date: Date): Date[][] {
//   const year = date.getFullYear()
//   const month = date.getMonth()

//   const firstDay = new Date(year, month, 1)
//   const lastDay = new Date(year, month + 1, 0)

//   const weekends: Date[][] = []

//   for (let day = 1; day <= lastDay.getDate(); day++) {
//     const currentDate = new Date(year, month, day)

//     if (currentDate.getDay() === 6) {
//       const saturday = new Date(currentDate)
//       const sunday = new Date(currentDate)
//       sunday.setDate(saturday.getDate() + 1)

//       if (sunday.getMonth() === month) {
//         weekends.push([saturday, sunday])
//       } else if (saturday.getMonth() === month) {
//         weekends.push([saturday])
//       }
//     }
//   }
//   console.log("getMonthWeekends returns", weekends)
//   return weekends
// }

// export function getPreviousMonth(date: Date): Date {
//   const newDate = new Date(date)
//   newDate.setMonth(newDate.getMonth() - 1)
//   console.log("getPreviousMonth returns", newDate)
//   return newDate
// }

// export function getNextMonth(date: Date): Date {
//   const newDate = new Date(date)
//   newDate.setMonth(newDate.getMonth() + 1)
//   console.log("getNextMonth returns", newDate)
//   return newDate
// }

// /**
//  * Legacy helper that returns a monday-key string (kept for backward compatibility).
//  */
// export function getWeekStartFromWeekend(weekendDate: Date): string {
//   const monday = new Date(weekendDate)
//   const day = monday.getDay()
//   const diff = monday.getDate() - day + (day === 0 ? -6 : 1)
//   monday.setDate(diff)
//   monday.setHours(0, 0, 0, 0)
//   console.log("getWeekStartFromWeekend returns", monday.toISOString().split("T")[0])
//   return monday.toISOString().split("T")[0]
// }

// /**
//  * Return Date object representing Saturday for a given Saturday/Sunday input.
//  */
// // export function getWeekendStartDate(weekendDate: Date): Date {
// //   const d = new Date(weekendDate)
// //   const day = d.getDay()

// //   if (day === 0) {
// //     d.setDate(d.getDate() - 1) // Sunday → Saturday
// //   } else if (day !== 6) {
// //     const diffToSaturday = (day + 1) % 7 + 1
// //     d.setDate(d.getDate() - diffToSaturday)
// //   }

// //   d.setHours(0, 0, 0, 0)

// //   console.log("getWeekendStartDate returns", d)
// //   return d
// // }

// export function getWeekendStartDate(weekendDate: Date): Date {
//   const d = new Date(weekendDate);
//   d.setHours(0, 0, 0, 0);

//   const day = d.getDay(); // 0=Sun, 6=Sat

//   if (day === 0) {
//     // Sunday → go back to previous Saturday
//     d.setDate(d.getDate() - 1);
//   } else if (day !== 6) {
//     // Mon–Fri → go forward to upcoming Saturday
//     const diffToSaturday = 6 - day;
//     d.setDate(d.getDate() + diffToSaturday);
//   }

//   console.log("getWeekendStartDate returns", d.toISOString());
//   return d;
// }


// /**
//  * Canonical weekStart string used by the planner (YYYY-MM-DD of the Saturday).
//  */
// // export function getWeekendWeekStartString(date: Date): string {
// //   const saturday = getWeekendStartDate(date)
// //   console.log("getWeekendWeekStartString returns", saturday.toISOString().split("T")[0])
// //   return saturday.toISOString().split("T")[0]
// // }

// export function getWeekendWeekStartString(date: Date): string {
//   const d = new Date(date);
//   d.setUTCHours(0, 0, 0, 0);

//   // day 0 = Sunday, day 6 = Saturday
//   const day = d.getUTCDay();

//   // find how many days to add to reach Saturday
//   const diffToSaturday = (6 - day + 7) % 7;

//   // if date is Sunday, we want the previous Saturday, not next
//   if (day === 0) {
//     d.setUTCDate(d.getUTCDate() - 1 * 1); 
//   } else {
//     d.setUTCDate(d.getUTCDate() + diffToSaturday);
//   }

//   return d.toISOString().split("T")[0];
// }


// /**
//  * Check if a weekend (based on its Saturday) has already passed.
//  * Returns true if the given weekend’s Saturday is strictly before today.
//  */

// export function isPastWeekend(date: Date): boolean {
//   const today = new Date()
//   today.setHours(0, 0, 0, 0)
//   return date < today
// }

// export function isCurrentWeekend(date: Date): boolean {
//   const today = new Date()
//   today.setHours(0, 0, 0, 0)

//   const day = today.getDay() // 0=Sun,6=Sat
//   const saturday = new Date(today)
//   saturday.setDate(today.getDate() - day + 6)
//   saturday.setHours(0, 0, 0, 0)

//   const sunday = new Date(saturday)
//   sunday.setDate(saturday.getDate() + 1)
//   sunday.setHours(0, 0, 0, 0)

//   return date.getTime() === saturday.getTime() || date.getTime() === sunday.getTime()
// }

// /*
//  below function returns a string like "Sep 2 - Sep 3"
// */
// export function getWeekendRange(date: Date) {
//     const day = date.getDay();
//     let saturday: Date, sunday: Date;
//     if (day === 6) {
//       // Today is Saturday
//       saturday = new Date(date);
//       sunday = new Date(date);
//       sunday.setDate(saturday.getDate() + 1);
//     } else if (day === 0) {
//       // Today is Sunday
//       saturday = new Date(date);
//       saturday.setDate(date.getDate() - 1);
//       sunday = new Date(date);
//     } else {
//       // Monday to Friday: show next weekend
//       saturday = new Date(date);
//       saturday.setDate(date.getDate() + (6 - day));
//       sunday = new Date(saturday);
//       sunday.setDate(saturday.getDate() + 1);
//     }

//     const format = new Intl.DateTimeFormat("en-US", {
//       day: "numeric",
//       month: "short",
//     });

//     return `${format.format(saturday)} - ${format.format(sunday)}`;
//   }




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

  console.log("formatDateRange returns", `${start} – ${end}`)

  return `${start} – ${end}`
}

export function getWeekDates(date: Date): Date[] {
  const week: Date[] = []
  const startOfWeek = new Date(date)
  const jsDay = startOfWeek.getDay() // native 0=Sun..6=Sat
  const day = (jsDay + 6) % 7 // convert → 0=Mon..6=Sun

  const diff = startOfWeek.getDate() - day
  startOfWeek.setDate(diff)
  startOfWeek.setHours(0, 0, 0, 0)

  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek)
    d.setDate(startOfWeek.getDate() + i)
    week.push(d)
  }
  console.log("getWeekDates returns", week)

  return week
}

export function getWeekendDates(date: Date): Date[] {
  const weekDates = getWeekDates(date)
  // Saturday = index 5, Sunday = index 6
  console.log("getWeekendDates returns", [weekDates[5], weekDates[6]])
  return [weekDates[5], weekDates[6]]
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export function isWeekend(date: Date): boolean {
  const jsDay = date.getDay()
  const day = (jsDay + 6) % 7 // convert
  const result = day === 5 || day === 6
  console.log("isWeekend returns", result)
  return result
}

export function getTimeSlots(): string[] {
  return [
    "06:00", "08:00", "10:00", "12:00",
    "14:00", "16:00", "18:00", "20:00", "22:00"
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
    const jsDay = currentDate.getDay()
    const weekday = (jsDay + 6) % 7 // convert

    if (weekday === 5) {
      const saturday = new Date(currentDate)
      const sunday = new Date(currentDate)
      sunday.setDate(saturday.getDate() + 1)

      if (sunday.getMonth() === month) {
        weekends.push([saturday, sunday])
      } else {
        weekends.push([saturday])
      }
    }
  }
  console.log("getMonthWeekends returns", weekends)
  return weekends
}

export function getPreviousMonth(date: Date): Date {
  const newDate = new Date(date)
  newDate.setMonth(newDate.getMonth() - 1)
  console.log("getPreviousMonth returns", newDate)
  return newDate
}

export function getNextMonth(date: Date): Date {
  const newDate = new Date(date)
  newDate.setMonth(newDate.getMonth() + 1)
  console.log("getNextMonth returns", newDate)
  return newDate
}

/**
 * Legacy helper: returns a Monday-based key string.
 */
export function getWeekStartFromWeekend(weekendDate: Date): string {
  const monday = new Date(weekendDate)
  const jsDay = monday.getDay()
  const day = (jsDay + 6) % 7
  const diff = monday.getDate() - day
  monday.setDate(diff)
  monday.setHours(0, 0, 0, 0)
  console.log("getWeekStartFromWeekend returns", monday.toISOString().split("T")[0])
  return monday.toISOString().split("T")[0]
}


/**
 * Always return the Saturday of the weekend for the given date.
 */
export function getWeekendStartDate(input: Date): Date {
  const d = new Date(input)
  d.setHours(0, 0, 0, 0)

  const jsDay = d.getDay() // 0=Sun, 1=Mon, ..., 6=Sat

  if (jsDay === 6) {
    // Saturday → already correct
    return d
  }

  if (jsDay === 0) {
    // Sunday → back to previous Saturday
    d.setDate(d.getDate() - 1)
    return d
  }

  // Mon–Fri → forward to upcoming Saturday
  const diffToSaturday = 6 - jsDay
  d.setDate(d.getDate() + diffToSaturday)

  console.log("getWeekendStartDate returns", d)

  return d
}



function formatDateKey(date: Date): string {
  // Always returns YYYY-MM-DD in local timezone
  return date.toLocaleDateString("en-CA");
}

/**
 * Canonical weekStart string used by the planner (YYYY-MM-DD of the Saturday).
*/

export function getWeekendWeekStartString(date: Date): string {
  const saturday = getWeekendStartDate(date);
  console.log("getWeekendWeekStartString returns", formatDateKey(saturday));
  return formatDateKey(saturday);
}

export function isPastWeekend(date: Date): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date < today
}

export function isCurrentWeekend(date: Date): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [saturday, sunday] = getWeekendDates(today)
  return isSameDay(date, saturday) || isSameDay(date, sunday)
}

/**
 * String like "Sep 20 - Sep 21".
 */
export function getWeekendRange(date: Date) {
  const day = (date.getDay() + 6) % 7 // 0=Mon..6=Sun
  let saturday: Date, sunday: Date

  if (day === 5) {
    saturday = new Date(date)
    sunday = new Date(date)
    sunday.setDate(saturday.getDate() + 1)
  } else if (day === 6) {
    saturday = new Date(date)
    saturday.setDate(date.getDate() - 1)
    sunday = new Date(date)
  } else {
    saturday = new Date(date)
    saturday.setDate(date.getDate() + (5 - day))
    sunday = new Date(saturday)
    sunday.setDate(saturday.getDate() + 1)
  }

  const format = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
  })

  return `${format.format(saturday)} - ${format.format(sunday)}`
}
