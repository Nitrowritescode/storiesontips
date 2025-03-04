import React, { useState } from "react";
import Image from "next/image";
import { OptionField } from "./StoryType";

function AgeGroup({ userSelection }: any) {
  const OptionsList = [
    {
      label: "0-2 Years",
      imageUrl: "/0-2.webp",
      isFree: true,
      desp: "Explore simple and engaging stories designed for little ones.",
    },
    {
      label: "3-5 Years",
      imageUrl: "/supergirl.webp",
      isFree: true,
      desp: "Enjoy fun and interactive bedtime stories filled with imagination.",
    },
    {
      label: "5+ Years",
      imageUrl: "/5-7.webp",
      isFree: true,
      desp: "Discover educational and adventurous stories to spark curiosity.",
    },
  ];
  

  const [selectedOption, setSelectedOption] = useState<string>();

  const OnUserSelect = (item: OptionField) => {
    setSelectedOption(item.label);
    userSelection({
      fieldValue: item?.label,
      fieldName: "ageGroup",
    });
  };

  return (
    <div>
      <label className="font-extrabold font-passion text-2xl lg:text-4xl text-white mx-auto uppercase">
        3. Age Group
      </label>
      <p className="text-white px-4 md:px-8 py-4 font-medium text-l lg:text-xl">
        Select the age group you are!
      </p>
      <div className="grid grid-cols-1 gap-5 mt-3">
        {OptionsList.map((item, index) => (
          <div
            key={item.label || index}
            className={`relative flex grayscale-0 justify-between md:px-8 lg:py-8 cursor-pointer p-1 ${
              selectedOption == item.label
                ? "bg-gradient-to-br from-black/80 to bg-black/30 grayscale-0 border rounded-3xl  border-black"
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
            <div className="flex flex-col justify-center items-start">
              <h2 className="text-center text-white uppercase text-xl md:text-xl lg:text-2xl w-full">
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

export default AgeGroup;
