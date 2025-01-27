"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Sparkles, Wand2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@nextui-org/button"
import { useRouter } from "next/navigation"


export function Hero() {

   
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:justify-between">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left lg:max-w-[50%]"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
              <Wand2 className="h-5 w-5 text-purple-200" />
              <span className="text-sm font-medium text-purple-200">AI-Powered Story Creation</span>
            </div>

            <h1 className="mt-8 bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
              Craft Magical Stories for Kids in Minutes
            </h1>

            <p className="mt-6 text-lg text-purple-200/90 sm:text-xl">
              Transform your imagination into enchanting tales with our magical story creator. Perfect for parents,
              teachers, and young storytellers.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link href="/create-story" passHref>
                <Button
                  size="lg"
                  className="bg-white h-12 px-8 text-lg font-semibold"
                  endContent={<Sparkles className="ml-2 h-5 w-5" />}
                  onPress={() => router.push('/create-story')}
                >
                  Create Story
                </Button>
              </Link>
             
            </div>

            <div className="mt-8 flex items-center justify-center gap-4 lg:justify-start">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-purple-200 bg-gradient-to-br from-purple-400 to-pink-400"
                  />
                ))}
              </div>
              <p className="text-sm text-purple-200">
                <span className="font-bold">1,000+</span> stories created today
              </p>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto lg:mx-0"
          >
            <div className="relative aspect-square w-full max-w-md">
              <Image
                src="/owl.webp"
                alt="A friendly owl mascot with a guitar"
                width={400}
                height={400}
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

