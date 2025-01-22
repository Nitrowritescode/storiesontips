import React, { useState } from 'react'
import Image from 'next/image'
import { OptionField } from './StoryType';

function AgeGroup({userSelection}:any) {
  const OptionsList = [
     {
         label:"0-2 Years",
         imageUrl:"/0-2.webp",
         isFree:true
     },
     {
         label:"3-5 Years",
         imageUrl:"/supergirl.webp",
         isFree:true
     },
     {
         label:"5+ Years",
         imageUrl:"/5-7.webp",
         isFree:true
     }
     
   ]  
 
   const [selectedOption,setSelectedOption]=useState<string>();

     const OnUserSelect=(item:OptionField)=>{
       setSelectedOption(item.label);
       userSelection({
         fieldValue:item?.label,
         fieldName: "ageGroup"
       })
     }
   
 
   return (
     <div>
        <label className='font-bold text-4xl text-primary mx-auto'>3. Age Group!</label>
        <p className='text-primary'>Select the age group you are!</p>
        <div className='grid grid-cols-3 gap-5 mt-3'>
          {/* @ts-ignore */}
         {OptionsList.map((item,_index)=>(
             <div className={`relative grayscale hover:grayscale-0 cursor-pointer p-1 ${selectedOption==item.label?'grayscale-0 border rounded-3xl border-primary':'grayscale'}`} onClick={()=>OnUserSelect(item)}>
                 <h2 className='absolute bottom-5 text-center text-white text-2xl w-full'>{item.label}</h2>
             <Image src={item.imageUrl} alt={item.label} width={300} height={500} className='object-cover h-[260px] rounded-3xl'/>
             </div>
         ))}
        </div>
     </div>
   )
}

export default AgeGroup;