"use client"

import React, { useState } from 'react'
import Image from 'next/image'


export interface OptionField{
  label:string,
  imageUrl:string,
  isFree:boolean

}

function StoryType({userSelection}:any) {
  
  const OptionsList = [
    {
        label:"Story Book",
        imageUrl:"/storybook.webp",
        isFree:true
    },
    {
        label:"Bed Story",
        imageUrl:"/bedstory2.webp",
        isFree:true
    },
    {
        label:"Educational",
        imageUrl:"/educational.webp",
        isFree:true
    }
    
  ]  

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
       <label className='font-bold text-4xl text-primary mx-auto'>2. Story Type!</label>
       <p className='text-primary'>Select the story type you want!</p>
       <div className='grid grid-cols-3 gap-5 mt-3'>
        {/* @ts-ignore */}
        {OptionsList.map((item,_index)=>(
            <div className={`relative grayscale hover:grayscale-0 cursor-pointer p-1 ${selectedOption==item.label?'grayscale-0 border rounded-3xl border-primary':'grayscale'}`} onClick={()=>OnUserSelect(item)}>
                <h2 className='absolute bottom-5 text-center text-white text-xl md:text-xl lg:text-2xl w-full'>{item.label}</h2>
            <Image src={item.imageUrl} alt={item.label} width={300} height={500} className='object-cover h-[260px] rounded-3xl'/>
            </div>
        ))}
       </div>
    </div>
  )
}

export default StoryType;