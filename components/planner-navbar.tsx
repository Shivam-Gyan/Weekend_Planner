// "use client"

// import { Button } from "@/components/ui/button"
// import { Calendar, ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react"
// import Link from "next/link"

// interface PlannerNavbarProps {
//   currentDate: Date
//   onPreviousWeek: () => void
//   onNextWeek: () => void
//   showAllWeekends?: boolean
// }

// export function PlannerNavbar({
//   currentDate,
//   onPreviousWeek,
//   onNextWeek,
//   showAllWeekends = false,
// }: PlannerNavbarProps) {
//   const monthYear = new Intl.DateTimeFormat("en-US", {
//     month: "long",
//     year: "numeric",
//   }).format(currentDate)

//   const todayFormatted = new Intl.DateTimeFormat("en-US", {
//     weekday: "short",
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   }).format(new Date())

//   return (
//     <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <div className="flex items-center space-x-2">
//             <Link href="/" className="flex items-center space-x-2">
//               <Calendar className="h-6 w-6 text-primary" />
//               <span className="text-xl font-bold">Weekendly</span>
//             </Link>
//             <div className=" p-2 ml-7 rounded-full border-2 border-gray-300 text-sm text-muted-foreground">{todayFormatted}</div>
//           </div>


//           {/* Center - Date Navigation */}
//           <div className="flex items-center space-x-4">
//             <Button variant="outline" size="sm" onClick={onPreviousWeek}>
//               <ChevronLeft className="h-4 w-4" />
//             </Button>

//             <div className="text-center min-w-48">
//               <div className="font-semibold">{monthYear}</div>
//               <div className="text-sm text-muted-foreground">current week and change while previous and next button click</div>
//             </div>

//             <Button variant="outline" size="sm" onClick={onNextWeek}>
//               <ChevronRight className="h-4 w-4" />
//             </Button>

//           </div>

//           {/* Right - Actions */}
//           <div className="flex items-center space-x-2">
//             {showAllWeekends ? (
//               <Link href="/planner">
//                 <Button variant="outline" size="sm">
//                   <Calendar className="h-4 w-4 mr-2" />
//                   Dashboard
//                 </Button>
//               </Link>
//             ) : (
//               <Link href="/planner/all-weekends">
//                 <Button variant="outline" size="sm">
//                   <Grid3X3 className="h-4 w-4 mr-2" />
//                   All Weekends
//                 </Button>
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }




"use client"

import { Button } from "@/components/ui/button"
import { getWeekendRange } from "@/lib/date-utils"
import { Calendar, ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react"
import Link from "next/link"

interface PlannerNavbarProps {
  currentDate: Date
  onPreviousWeek: () => void
  onNextWeek: () => void
  showAllWeekends?: boolean
}

export function PlannerNavbar({
  currentDate,
  onPreviousWeek,
  onNextWeek,
  showAllWeekends = false,
}: PlannerNavbarProps) {
  const monthYear = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(currentDate)

  const todayFormatted = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date())

  // --- Compute current week range ---
  const weekendRange = getWeekendRange(currentDate)

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" flex flex-col container  mx-auto px-4 py-4">
        {/* Desktop View */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Weekendly</span>
            </Link>
            <div className="p-2 max-md:hidden ml-7 rounded-full border-2 border-gray-300 text-sm text-muted-foreground">
              {todayFormatted}
            </div>
          </div>

          <div className="p-2 ml-7 md:hidden rounded-full border-2 border-gray-300 text-sm text-muted-foreground">
              {todayFormatted}
            </div>

          {/* Center - Date Navigation */}
          <div className="flex max-md:hidden items-center space-x-4">
            <Button variant="outline" size="sm" onClick={onPreviousWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="text-center min-w-48">
              <div className="font-semibold">{monthYear}</div>
              <div className="text-sm text-muted-foreground">
                {weekendRange}
              </div>
            </div>

            <Button variant="outline" size="sm" onClick={onNextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Right - Actions */}
          <div className="flex max-md:hidden items-center space-x-2">
            {showAllWeekends ? (
              <Link href="/planner">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/planner/all-weekends">
                <Button variant="outline" size="sm">
                  <Grid3X3 className="h-4 w-4 mr-2" />
                  All Weekends
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile View */}
        <div className="flex flex-col justify-center items-center md:hidden gap-6 mt-4">
          <div className="flex  items-center space-x-4">
            <Button variant="outline" size="sm" onClick={onPreviousWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="text-center min-w-48">
              <div className="font-semibold">{monthYear}</div>
              <div className="text-sm text-muted-foreground">
                {weekendRange}
              </div>
            </div>

            <Button variant="outline" size="sm" onClick={onNextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center space-x-2">
            {showAllWeekends ? (
              <Link href="/planner">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/planner/all-weekends">
                <Button variant="outline" size="sm">
                  <Grid3X3 className="h-4 w-4 mr-2" />
                  All Weekends
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
