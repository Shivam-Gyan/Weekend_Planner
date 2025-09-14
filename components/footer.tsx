"use client"

import { motion } from "framer-motion"
import { Calendar, Heart, Github, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <motion.footer
      className="bg-white w-full shadow-xl z-20 border-t"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Weekendly</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Plan your perfect weekends with ease. Create, organize, and enjoy memorable experiences.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold">Product</h3>
            <div className="space-y-2 space-x-1">
              <Button variant="ghost" size="sm" className="h-auto p-0 justify-start">
                Features
              </Button>
              <Button variant="ghost" size="sm" className="h-auto p-0 justify-start">
                Pricing
              </Button>
              <Button variant="ghost" size="sm" className="h-auto p-0 justify-start">
                Updates
              </Button>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <div className="space-y-2 space-x-1">
              <Button variant="ghost" size="sm" className="h-auto p-0 justify-start">
                Help Center
              </Button>
              <Button variant="ghost" size="sm" className="h-auto p-0 justify-start">
                Contact Us
              </Button>
              <Button variant="ghost" size="sm" className="h-auto p-0 justify-start">
                Privacy Policy
              </Button>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="font-semibold">Connect</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2024 Weekendly. All rights reserved.</p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with <Heart className="h-4 w-4 text-red-500" /> for weekend planners
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
