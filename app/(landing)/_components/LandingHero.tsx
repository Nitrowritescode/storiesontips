import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingHero() {
  return (
    <section className="w-full py-20 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-10">
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold  text-white tracking-tighter">
              Make Stories For Fun & Education
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Create and explore stories that inspire and educate. Join a community of storyreaders and learners today!
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <Link href='/explore'>
            <Button className="bg-white text-[#000015] hover:bg-white/60 px-8 py-6 text-base font-semibold">
              Story Library
            </Button>
            </Link>
            <Link href='/create-story'>
            <Button
              variant="outline"
              className="border-white/20 hover:bg-blue-800 text-white bg-blue-600 px-8 py-6 text-base font-medium"
              >
              Create Story
              <Sparkles className="size-5"/>

            </Button>
              </Link>
          </div>

          {/* Dashboard Image Container */}
          <div className="w-full max-w-4xl mt-16">
            <div className="relative w-full rounded-lg overflow-hidden shadow-2xl border border-white/10">
              {/* This is where the dashboard image will go */}
              <Image
                src="/landing/heroimagefinal.png"
                width={800}
                height={400}
                alt="hero image of owl"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
