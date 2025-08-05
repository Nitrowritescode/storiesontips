// app/components/LandingImageStyle.tsx
"use client";

import React from "react";
import { CardCarousel } from "@/components/ui/card-carousel";

interface ImageStyleProps {
  autoplayDelay?: number;
  showPagination?: boolean;
  showNavigation?: boolean;
}

const LandingImageStyle: React.FC<ImageStyleProps> = ({
  autoplayDelay = 5000,
  showPagination = true,
  showNavigation = true,
}) => {
  const images = [
    {
      src: "/landing/imagestyle/pixel2.webp",
      alt: "Pixel style image",
      title: "Pixel Style",
      description:
        "Immerse yourself in the nostalgic charm of retro-inspired pixel art, perfect for a vibrant and classic aesthetic.",
    },
    {
      src: "/landing/imagestyle/watercolor.webp",
      alt: "Watercolor painting style image",
      title: "Watercolor",
      description:
        "Experience the elegance of soft, flowing watercolor strokes, blending colors seamlessly for an artistic touch.",
    },
    {
      src: "/landing/imagestyle/papercut.webp",
      alt: "Paper cutout style image",
      title: "Paper Cut",
      description:
        "A unique layered paper-cut effect that adds depth and dimension, creating a handcrafted and artistic feel.",
    },
    {
      src: "/landing/imagestyle/3dcartoon.webp",
      alt: "3D cartoon style image",
      title: "3D Cartoon",
      description:
        "Lively and playful, this 3D cartoon style brings characters and scenes to life with bold colors and smooth shading.",
    },
  ];

  return (
    <section className="w-full bg-black py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
            <span className="text-sm text-white/80 font-medium">
              ✨ Image Styles
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter leading-none mb-6">
            Explore our diverse range of <span>stunning image styles</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/60 leading-relaxed font-light">
            crafted to suit every vision
            <br />
            <span className="text-white/80">
              storytelling, creativity, and innovation in mind.
            </span>
          </p>
        </div>

        <div className="pt-10">
          <CardCarousel
            images={images}
            autoplayDelay={autoplayDelay}
            showPagination={showPagination}
            showNavigation={showNavigation}
          />
        </div>
      </div>
    </section>
  );
};

export default LandingImageStyle;
