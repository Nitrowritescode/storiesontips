"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  altText: string;
  linkUrl?: string;
}

const carouselItems: CarouselItem[] = [
  {
    id: 1,
    title: "Pixel Style",
    description: "Immerse yourself in the nostalgic charm of retro-inspired pixel art, perfect for a vibrant and classic aesthetic.",
    imageUrl: "/landing/imagestyle/pixel2.webp",
    altText: "Pixel style image",
  },
  {
    id: 2,
    title: "Watercolor",
    description: "Experience the elegance of soft, flowing watercolor strokes, blending colors seamlessly for an artistic touch.",
    imageUrl: "/landing/imagestyle/watercolor.webp",
    altText: "Watercolor painting style image",
  },
  {
    id: 3,
    title: "Paper Cut",
    description: "A unique layered paper-cut effect that adds depth and dimension, creating a handcrafted and artistic feel.",
    imageUrl: "/landing/imagestyle/papercut.webp",
    altText: "Paper cutout style image",
  },
  {
    id: 4,
    title: "3D Cartoon",
    description: "Lively and playful, this 3D cartoon style brings characters and scenes to life with bold colors and smooth shading.",
    imageUrl: "/landing/imagestyle/3dcartoon.webp",
    altText: "3D cartoon style image",
  },
];

interface ImageCarouselProps {
  items?: CarouselItem[];
  autoPlay?: boolean;
  interval?: number;
}

const LandingImageStyle: React.FC<ImageCarouselProps> = ({
  items = carouselItems,
  autoPlay = true,
  interval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isPlaying && !isHovering) {
      intervalId = setInterval(() => {
        nextSlide();
      }, interval);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, interval, isHovering, currentIndex]);

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <div className="mb-16 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 animate-pulse"></div>
            <span className="text-sm font-medium text-white/80">Visual Representation</span>
          </div>
          
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-white">
            IMAGE{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              STYLES
            </span>
          </h2>
          
          <p className="text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
            Explore our diverse range of stunning image styles, crafted to suit every vision
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Carousel Content */}
          <div
            className="flex transition-transform duration-700 ease-out h-[70vh] md:h-[60vh]"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {items.map((item) => (
              <div key={item.id} className="w-full flex-shrink-0 relative">
                <Image
                  src={item.imageUrl}
                  alt={item.altText}
                  className="h-full w-full object-cover"
                  width={1920}
                  height={1080}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <div className="max-w-2xl">
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 border-white/20 text-white backdrop-blur-sm w-12 h-12 rounded-full transition-all duration-300"
            onClick={prevSlide}
          >
            <ChevronLeft size={20} />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 border-white/20 text-white backdrop-blur-sm w-12 h-12 rounded-full transition-all duration-300"
            onClick={nextSlide}
          >
            <ChevronRight size={20} />
          </Button>

          {/* Play/Pause Button */}
          <Button
            variant="outline"
            size="icon"
            className="absolute top-6 right-6 bg-black/30 hover:bg-black/60 border-white/20 text-white backdrop-blur-sm w-10 h-10 rounded-full transition-all duration-300"
            onClick={togglePlayPause}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </Button>

          {/* Progress Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "w-8 bg-white" 
                    : "w-2 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingImageStyle;