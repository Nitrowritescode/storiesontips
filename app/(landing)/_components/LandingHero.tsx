import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingHero() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-black relative overflow-hidden py-24 ">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-black to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-12 max-w-5xl mx-auto">
          {/* Badge/Announcement */}
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-sm text-white/80 font-medium">
              ✨ The new way to create stories
            </span>
          </div>

          {/* Main heading */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl lg:text-8xl font-bold text-white tracking-tighter leading-none">
              Make Stories For{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Fun & Education
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/60  mx-auto leading-relaxed font-light">
              Beautifully designed, animated components and templates built with
              <br />
              <span className="text-white/80">
                storytelling, creativity, and Framer Motion.
              </span>
            </p>
          </div>

          {/* CTA BUTTONS */}
          <div className="flex justify-center items-center gap-4">
            <div className="">
              <Link href="/explore">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-white/90 px-8 py-5 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-2xl"
                >
                  Get Started for free
                </Button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/create-story">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 hover:bg-white/10 text-white bg-transparent px-8 py-5 text-lg font-semibold rounded-full transition-all duration-300 hover:border-white/40"
                >
                  Create Story
                  <Sparkles className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="w-full max-w-6xl mt-20 relative">
            {/* Glow effect behind the image */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-purple-500/20 blur-3xl scale-110"></div>

            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
              {/* Top bar with fake window controls */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-white/60 text-sm font-medium">
                  Story Creation Dashboard
                </div>
                <div className="w-16"></div>
              </div>

              {/* Main dashboard content */}
              <div className="relative">
                <Image
                  src="/landing/landing-hero-dashboard.webp"
                  width={1200}
                  height={600}
                  alt="Story creation dashboard preview"
                  className="w-full h-auto"
                />

                {/* Overlay gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Secondary CTA */}
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse delay-500"></div>
    </section>
  );
}
