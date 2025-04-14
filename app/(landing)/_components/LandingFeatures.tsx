import type React from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wand2, Brain, Clock, BookOpen, Share2, CircleDollarSign } from "lucide-react"

// Feature types
interface Feature {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  url: string
}

// Array of feature objects
const features: Feature[] = [
  {
    id: 1,
    title: "Powered By AI",
    description:
      "Transform your ideas into enchanting stories with our magical AI assistant.",
    icon: <Wand2 className="h-10 w-10 text-indigo-500" />,
    url: "/landing/features/feature1.jpg",
  },
  {
    id: 2,
    title: "Creative Stories",
    description:
      "Enjoy a collection of creative stories in various genres, from fairytales to adventures, sci-fi, and moral tales.",
    icon: <Brain className="h-10 w-10 text-purple-500" />,
    url: "/landing/features/feature2.webp",
  },
  {
    id: 3,
    title: "Quick Creation",
    description: "No more waiting around—our platform allows you to create an entire story within seconds.",
    icon: <Clock className="h-10 w-10 text-cyan-500" />,
    url: "/landing/features/feature3.webp",
  },
  {
    id: 4,
    title: "Story Library",
    description: "Browse a rich and ever-growing library of stories created by other users and our AI.",
    icon: <BookOpen className="h-10 w-10 text-violet-500" />,
    url: "/landing/features/feature4.webp",
  },
  {
    id: 5,
    title: "Easy Learning For Kids",
    description:
      "Make learning fun and interactive for your children. Our stories are designed to teach vocabulary, sentence structure, and pronunciation naturally.",
    icon: <Share2 className="h-10 w-10 text-blue-500" />,
    url: "/landing/features/feature5.webp",
  },
  {
    id: 6,
    title: "Optimal Pricing",
    description:
      "We believe in quality storytelling at an affordable price. Our subscription plans offer flexible options that cater to individual users and families alike.",
    icon: <CircleDollarSign className="h-10 w-10 text-emerald-500" />,
    url: "/landing/features/feature6.jpg",
  },
]

export function LandingFeatures(): React.JSX.Element {
  return (
    <section className="py-16 lg:py-24 mt-24 md:mt-12 text-white">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-12">
          <div className="space-y-4">
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-2">
              <span className="text-sm font-medium tracking-wide text-white">Discover Our Magic</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-300 to-blue-500">
              MAGICAL FEATURES
            </h2>
            <p className="max-w-[800px] mx-auto text-lg text-white/70 md:text-xl/relaxed">
              Discover the enchanting capabilities of our storytelling platform.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.id}
              className="overflow-hidden border-0 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={feature.url || "/placeholder.svg"}
                  alt={feature.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 text-white"
                  priority={feature.id <= 3}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>

              <CardHeader className="relative z-10 -mt-10 pt-0">
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 rounded-full bg-white shadow-lg">{feature.icon}</div>
                  <CardTitle className="text-xl font-bold text-white mt-12">{feature.title}</CardTitle>
                </div>
              </CardHeader>

              <CardContent>
                <CardDescription className="text-base text-white/80 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}
