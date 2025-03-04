// app/components/ImageCarousel.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Define the carousel item interface
interface CarouselItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  altText: string;
  linkUrl?: string;
}

// Sample carousel data
const carouselItems: CarouselItem[] = [
  {
    id: 1,
    title: "Pixel Style",
    description: "Immerse yourself in the nostalgic charm of retro-inspired pixel art, perfect for a vibrant and classic aesthetic.",
    imageUrl: "/landing/imagestyle/pixel2.webp",
    altText: "Pixel style image"
  },
  {
    id: 2,
    title: "Watercolor",
    description: "Experience the elegance of soft, flowing watercolor strokes, blending colors seamlessly for an artistic touch.",
    imageUrl: "/landing/imagestyle/watercolor.webp",
    altText: "Watercolor painting style image"
  },
  {
    id: 3,
    title: "Paper Cut",
    description: "A unique layered paper-cut effect that adds depth and dimension, creating a handcrafted and artistic feel.",
    imageUrl: "/landing/imagestyle/papercut.webp",
    altText: "Paper cutout style image"
  },
  {
    id: 4,
    title: "3D Cartoon",
    description: "Lively and playful, this 3D cartoon style brings characters and scenes to life with bold colors and smooth shading.",
    imageUrl: "/landing/imagestyle/3dcartoon.webp",
    altText: "3D cartoon style image"
  }
];


interface ImageCarouselProps {
  items?: CarouselItem[];
  autoPlay?: boolean;
  interval?: number;
}

const LandingImageStyle: React.FC<ImageCarouselProps> = ({
  items = carouselItems,
  autoPlay = true,
  interval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

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

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (autoPlay && !isHovering) {
      intervalId = setInterval(() => {
        nextSlide();
      }, interval);
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoPlay, interval, isHovering, currentIndex]);

  return (
    <div className="w-full px-10 py-16">

       <div className="py-4">
<h2 className="text-center font-bold text-5xl text-white">IMAGE STYLES</h2>
   <p className="text-center text-white text-xl font-semibold py-4">Explore our diverse range of stunning image styles, crafted to suit every vision</p>
       </div>

      <div 
        className="relative w-full overflow-hidden rounded-lg bg-gray-900"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Main carousel */}
        <div 
          className="flex transition-transform duration-500 ease-in-out h-[70vh]"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item) => (
            <div key={item.id} className="w-full flex-shrink-0">
              <div className="relative">
                <Image
                  src={item.imageUrl}
                  alt={item.altText}
                  className="h-[70vh] w-full object-cover md:h-65 lg:h-65"
                  width={1920}
                  height={1080}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-3xl font-bold mb-2">{item.title}</h3>
                  <p className="text-xl text-gray-200 mb-4 max-w-md">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 border-0 text-white"
          onClick={prevSlide}
        >
          <ChevronLeft size={24} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 border-0 text-white"
          onClick={nextSlide}
        >
          <ChevronRight size={24} />
        </Button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingImageStyle;