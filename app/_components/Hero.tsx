'use client';

import { Button } from "@nextui-org/button"
import { motion } from "framer-motion"
import { Sparkles, Wand2 } from 'lucide-react'
import Image from "next/image"
import Link from "next/link";

export function Hero() {
  return (
    <div className="relative overflow-hidden py-8 sm:py-12 w-full min-h-screen bg-[#bb8fce]">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 right-0 w-72 h-72 opacity-20">
          <Image
            src="/hero.svg"
            alt=""
            width={100}
            height={100}
            className="w-full h-full"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-300 to-pink-300 rounded-full blur-3xl"
        />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full text-blue-700">
              <Wand2 className="w-5 h-5" />
              <span className="text-sm font-medium">AI-Powered Story Creation</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-700 leading-tight">
              Craft Magical Stories for Kids in Minutes
            </h1>
            
            <p className="text-lg sm:text-xl text-blue-600/80 max-w-2xl mx-auto lg:mx-0">
              Transform your imagination into enchanting tales with our magical story creator. Perfect for parents, teachers, and young storytellers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href={"/create-story"}>
              <Button
                size="lg"
                className=" text-slate-200 bg-primary hover:bg-pink-200 px-8 h-12 text-lg font-semibold"
                endContent={<Sparkles className="w-5 h-5" />}
              >
                Create Story
              </Button>
            </Link>
            </div>

            <div className="flex items-center gap-4 justify-center lg:justify-start text-sm text-blue-700">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-purple-400 to-pink-400"
                  />
                ))}
              </div>
              <p>
                <span className="font-bold">1,000+</span> stories created today
              </p>
            </div>
          </motion.div>

          {/* Right column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[400px] lg:h-[500px] w-full">
              <Image
                src="/owl.webp"
                alt="A magical scene with a dragon and child creating stories"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute top-10 right-10"
            >
              <div className="bg-yellow-400 w-8 h-8 rounded-full opacity-75" />
            </motion.div>
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute bottom-20 left-10"
            >
              <div className="bg-purple-400 w-6 h-6 rounded-full opacity-75" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

