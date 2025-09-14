"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background Video */}
      <video
        className="fixed top-0 left-0 w-full h-[calc(100vh-100px)] object-cover z-0 opacity-80"
        autoPlay
        loop
        muted
        playsInline
        src="/backgroundvideo.mp4" // replace with your video path
      />

      {/* Header */}
      <header className="relative z-10 container max-w-4xl bg-white/30 backdrop-blur-xl rounded-full mx-auto px-8 py-3 mt-4">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <Calendar className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Weekendly</h1>
          </div>
         <nav className="hidden md:flex items-center space-x-4">
  <a href="#features" className="px-4 py-2 bg-white text-green-800 font-medium rounded-full shadow-sm hover:shadow-md hover:bg-green-50 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-300">
    Features
  </a>
  <a href="#how-it-works" className="px-4 py-2 bg-white text-green-800 font-medium rounded-full shadow-sm hover:shadow-md hover:bg-green-50 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-300">
    How it Works
  </a>
</nav>

        </motion.div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.3 } },
          }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-balance mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Planned Nothing for <span className="text-white">Weekends</span>?
          </motion.h2>
          <motion.p
            className="text-xl text-foreground text-balance mb-8  max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform your weekends from boring to brilliant. Plan activities, set schedules, and make every Saturday
            and Sunday count.
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/planner">
              <Button
                size="lg"
                className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Start Planning Now
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </main>

      {/* Features Section */}
      <section
        id="features"
        className="mt-24 relative z-10 bg-white rounded-t-5xl shadow-xl p-8 md:p-16"
      >
        <motion.h3
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Why Choose Weekendly?
        </motion.h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Calendar, title: "Easy Planning", desc: "Drag and drop activities into your weekend schedule with our intuitive interface." },
            { icon: Clock, title: "Time Management", desc: "Organize your activities by time slots to make the most of your weekend hours." },
            { icon: MapPin, title: "Location Aware", desc: "Add locations to your activities and never forget where you need to be." },
            { icon: Users, title: "Weekend Vibes", desc: "Choose from different themes like Relaxed, Adventurous, or Family time." },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="relative z-10 bg-white shadow-xl p-8 md:p-16"
      >
        <motion.h3
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          How It Works
        </motion.h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[ 
            { number: 1, title: "Browse Activities", desc: "Explore our curated list of weekend activities or create your own custom ones." },
            { number: 2, title: "Drag & Schedule", desc: "Simply drag activities to your preferred time slots on Saturday or Sunday." },
            { number: 3, title: "Enjoy Your Weekend", desc: "Follow your personalized schedule and make the most of your weekend time." },
          ].map((step, idx) => (
            <motion.div
              key={idx}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
                {step.number}
              </div>
              <h4 className="font-semibold mb-2">{step.title}</h4>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center relative z-10 bg-white shadow-xl p-8 md:p-16">
        <motion.div
          className="bg-primary/5 rounded-2xl p-12 border border-primary/20"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Weekends?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already discovered the joy of well-planned weekends.
          </p>
          <Link href="/planner">
            <Button size="lg" className="text-lg px-8 py-6 rounded-xl">
              Get Started for Free
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      {/* <footer className="relative z-10 container mx-auto px-4 py-8 mt-16 border-t border-border bg-white rounded-t-3xl shadow-xl">
        <div className="text-center text-muted-foreground">
          <p>&copy; 2025 Weekendly. Made with ❤️ for better weekends.</p>
        </div>
      </footer> */}
    </div>
  );
}
