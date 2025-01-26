"use client"

import { motion } from "framer-motion"

export function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/10 via-purple-500/5 to-background/10" />

      {/* Animated background elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-gradient-to-tr from-purple-500/30 to-pink-500/30 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1 }}
        className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-gradient-to-tr from-blue-500/30 to-purple-500/30 blur-3xl"
      />
    </div>
  )
}

