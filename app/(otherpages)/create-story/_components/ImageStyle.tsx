import React, { useState } from "react";
import Image from "next/image";
import { OptionField } from "./StoryType";

function ImageStyle({ userSelection }: any) {
  const OptionsList = [
    {
      label: "3D Cartoon",
      imageUrl: "/3dcartoon.webp",
      isFree: true,
      desp: "Experience stories in a lively and vibrant 3D animated style.",
    },
    {
      label: "Paper Cut",
      imageUrl: "/papercut.webp",
      isFree: true,
      desp: "Enjoy beautifully crafted stories with a unique paper-cut illustration style.",
    },
    {
      label: "Water Color",
      imageUrl: "/watercolor.webp",
      isFree: true,
      desp: "Dive into enchanting tales painted in soft and artistic watercolor strokes.",
    },
    {
      label: "Pixel Style",
      imageUrl: "/pixelstyle.webp",
      isFree: true,
      desp: "Relive nostalgic storytelling with charming pixel-art illustrations.",
    },
  ];
  

  const [selectedOption, setSelectedOption] = useState<string>();

  const OnUserSelect = (item: OptionField) => {
    setSelectedOption(item.label);
    userSelection({
      fieldValue: item?.label,
      fieldName: "imageStyle",
    });
  };

  return (
    <div>
      {/* Heading and subheading of the page */}

      <label className="font-extrabold uppercase font-passion text-2xl lg:text-4xl text-white mx-auto">
        4. Image Style
      </label>
      <p className="text-white px-4 md:px-8 py-4 font-medium text-l lg:text-xl">
        Select the image style you want!
      </p>

      {/* Image style card */}

      <div className="grid grid-cols-1 gap-5 mt-3">
        {OptionsList.map((item, index) => (
          <div
            key={item.label || index}
            className={`relative flex justify-between md:px-8 gap-1 grayscale-0 cursor-pointer p-1 ${
              selectedOption == item.label
                ? "bg-gradient-to-br from-black/80 to bg-black/30 grayscale-0 border rounded-3xl border-black"
                : "grayscale"
            }`}
            onClick={() => OnUserSelect(item)}
          >
            <Image
              src={item.imageUrl}
              alt={item.label}
              width={160}
              height={120}
              className="object-cover max-h-40 rounded-3xl min-w-[160px]"
            />
            <div className="flex flex-col justify-center items-start md:items-end">
              <h2 className="text-center uppercase text-white text-xl md:text-xl lg:text-2xl w-full">
                {item.label}
              </h2>
              <p className="font-medium text-xs md:text-s lg:text-xl text-center text-white/50 px-4">
                {item.desp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageStyle;
