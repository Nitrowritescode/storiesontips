"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, useAnimation } from "framer-motion"

export function Background() {
  const [isMounted, setIsMounted] = useState(false)
  const controls = useAnimation()

  const animateBackground = useCallback(() => {
    controls.start({
      opacity: [0.05, 0.2, 0.05],
      scale: [1, 1.1, 1],
      transition: { duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
    })
  }, [controls])

  useEffect(() => {
    setIsMounted(true)
    animateBackground()
  }, [animateBackground])

  if (!isMounted) return null

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />

      <div
        className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay"
        style={{ backgroundRepeat: "repeat", backgroundSize: "100px 100px" }}
      />

      <motion.div
        animate={controls}
        className="absolute -left-1/4 -top-1/4 h-[150%] w-[150%] rounded-[40%] bg-gradient-to-tr from-purple-500/20 to-pink-500/20 blur-3xl"
      />
    </div>
  )
}

