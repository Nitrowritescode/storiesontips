"use client"

import React, { useState } from 'react'
import Image from 'next/image'


export interface OptionField{
  label:string,
  imageUrl:string,
  isFree:boolean,
  desp:string

}

function StoryType({userSelection}:any) {
  
  const OptionsList = [
    {
      label: "Story Book",
      imageUrl: "/storybook.webp",
      isFree: true,
      desp: "Immerse yourself in beautifully written stories, just like reading a real book.",
    },
    {
      label: "Bed Story",
      imageUrl: "/bedstory2.webp",
      isFree: true,
      desp: "Drift into dreamland with soothing and magical bedtime stories.",
    },
    {
      label: "Educational",
      imageUrl: "/educational.webp",
      isFree: true,
      desp: "Engage in fun, interactive stories that inspire learning and curiosity.",
    },
  ];
  

  const [selectedOption,setSelectedOption]=useState<string>();

  const OnUserSelect=(item:OptionField)=>{
    setSelectedOption(item.label);
    userSelection({
      fieldValue:item?.label,
      fieldName: "storyType"
    })
  }

  return (
    <div>
       <label className='font-extrabold font-passion uppercase text-2xl lg:text-4xl text-white mx-auto'>2. Story Type</label>
       <p className='text-white px-4 md:px-8 py-4 font-medium text-l lg:text-xl'>Select the story type you want!</p>
       <div className='grid grid-cols-1 gap-4 mt-3'>
        {OptionsList.map((item,index)=>(
            <div key={item.label || index} className={`relative md:px-8 flex justify-between grayscale-0 cursor-pointer p-1 ${selectedOption==item.label?'grayscale-0 border bg-gradient-to-br from-black/80 to bg-black/30 rounded-3xl border-black':'grayscale'}`} onClick={()=>OnUserSelect(item)}>
            <Image src={item.imageUrl} alt={item.label} width={160} height={120} className='object-cover max-h-40 rounded-3xl min-w-[160px]'/>
           <div className='flex flex-col justify-center items-start'>

            <h2 className='text-center uppercase text-white text-xl md:text-xl lg:text-2xl w-full'>{item.label}</h2>
            <p className='font-medium text-xs md:text-s lg:text-xl text-center text-white/50 px-4'>{item.desp}</p>
           </div>
            </div>
        ))}
       </div>
    </div>
  )
}

export default StoryType;