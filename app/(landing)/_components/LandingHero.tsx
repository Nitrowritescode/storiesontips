"use client"


import { FlipWords } from "./FlipWords";
import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import {useRouter} from "next/navigation"
import { Button } from "@/components/ui/button";

export default function LandingHero() {
  const words = ["Interesting", "Creative", "Educational", "Inspiring"];
  
  const router = useRouter()

  return (
    <>
      {/* Hero Section */}
      <div className="py-10 grid grid-cols-1 lg:grid-cols-2 gap-2 px-4 bg-[#000015] mx-auto place-items-center place-content-start">
        {/* Owl Hero Section Image */}
        <div className="mx-auto">
          <Image
            src="/landing/heroimagefinal.png"
            alt="hero section image of an owl"
            width={500}
            height={500}
            className=""
          />
        </div>
        {/* framer motion text */}
        <div className="text-5xl text-center md:text-6xl mx-auto rounded-xl font-normal text-white dark:text-neutral-400 bg-[#000015] font-sans md:py-8 items-center justify-center">
          <span className="font-passion text-2xl md:text-4xl font-bold text-center">
            MAKE
          </span>
          <br />
          <FlipWords words={words} className="text-center" /> <br />
          <span className="font-passion font-bold text-2xl md:text-4xl">
            STORIES WITH
          </span>
          <br />
          <span className="text-neonblue font-bold">StoriesOnTips</span>
          {/* Create Story Button with Description */}
          <Link
            href="/create-story"
            passHref
            className="flex justify-center items-center px-8 w-full mx-auto max-sm:mt-4 md:py-4"
          >
            <Button className="bg-darkneonblue/80 font-bold px-12 mx-auto">
              <Sparkles className="" />
              Create Story
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
