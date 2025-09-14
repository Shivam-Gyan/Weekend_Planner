// "use client"

// import type { Activity } from "@/lib/activities"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Clock } from "lucide-react"
// import { useDraggable } from "@dnd-kit/core"
// import { motion } from "framer-motion"

// interface ActivityCardProps {
//   activity: Activity
//   isDragging?: boolean
//   compact?: boolean
// }

// export function ActivityCard({ activity, isDragging = false, compact = false }: ActivityCardProps) {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     isDragging: isBeingDragged,
//   } = useDraggable({
//     id: activity.id,
//     data: {
//       type: "activity",
//       activity,
//     },
//   })

//   const style = transform
//     ? {
//         transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
//       }
//     : undefined

//   return (
//     <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//       <Card
//         ref={setNodeRef}
//         style={style}
//         {...listeners}
//         {...attributes}
//         className={`cursor-grab active:cursor-grabbing transition-all duration-200 hover:shadow-md ${
//           isBeingDragged ? "opacity-50 scale-105 shadow-lg" : ""
//         } ${isDragging ? "rotate-2" : ""}`}
//       >
//         <CardContent className={compact ? "p-1" : "p-1"}>
//           {compact ? (
//             <div className="flex items-center gap-3">
//               <div className="text-xl flex-shrink-0">{activity.icon}</div>
//               <div className="flex-1 min-w-0">
//                 <h4 className="font-semibold text-sm text-card-foreground truncate">{activity.title}</h4>
//               </div>
//             </div>
//           ) : (
//             <div className="flex items-start gap-3">
//               <div className="text-2xl flex-shrink-0">{activity.icon}</div>
//               <div className="flex-1 min-w-0">
//                 <h4 className="font-semibold text-sm text-card-foreground truncate">{activity.title}</h4>
//                 <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{activity.description}</p>
//                 <div className="flex items-center gap-2 mt-2">
//                   <div className="flex items-center gap-1 text-xs text-muted-foreground">
//                     <Clock className="h-3 w-3" />
//                     <span>
//                       {Math.floor(activity.duration / 60)}h {activity.duration % 60}m
//                     </span>
//                   </div>
//                   <Badge variant="secondary" className="text-xs">
//                     {activity.category}
//                   </Badge>
//                 </div>
//               </div>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </motion.div>
//   )
// }



"use client"

import type { Activity } from "@/lib/activities"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import { useDraggable } from "@dnd-kit/core"
import { motion } from "framer-motion"

interface ActivityCardProps {
  activity: Activity
  isDragging?: boolean
  compact?: boolean
}

export function ActivityCard({ activity, isDragging = false, compact = false }: ActivityCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging: isBeingDragged,
  } = useDraggable({
    id: activity.id,
    data: {
      type: "activity",
      activity,
    },
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <motion.div whileHover={{ scale: 1.00 }} whileTap={{ scale: 0.98 }}>
      {/* ✅ Ref goes on a wrapper div */}
      <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="">
        <Card
          className={`cursor-grab py-2 active:cursor-grabbing transition-all duration-200 hover:shadow-md ${
            isBeingDragged ? "opacity-50 shadow-lg" : ""
          } ${isDragging ? "rotate-2" : ""}`}
        >
          <CardContent >
            {compact ? (
              <div className="flex items-center gap-3">
                <div className="text-xl flex-shrink-0">{activity.icon}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-card-foreground truncate">
                    {activity.title}
                  </h4>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                <div className="text-2xl flex-shrink-0">{activity.icon}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-card-foreground truncate">
                    {activity.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {activity.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>
                        {Math.floor(activity.duration / 60)}h {activity.duration % 60}m
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {activity.category}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

