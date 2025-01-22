import React,{ useState } from 'react'
import Image from 'next/image'
import { OptionField } from './StoryType';



function ImageStyle({userSelection}:any) {
const OptionsList = [
     {
         label:"3D Cartoon",
         imageUrl:"/3dcartoon.webp",
         isFree:true
     },
     {
         label:"Paper Cut",
         imageUrl:"/papercut.webp",
         isFree:true
     },
     {
         label:"Water Color",
         imageUrl:"/watercolor.webp",
         isFree:true
     },
     {
        label:"Pixel Style",
        imageUrl:"/pixelstyle.webp",
        isFree:true
    }
     
   ]  
 
   const [selectedOption,setSelectedOption]=useState<string>();

   const OnUserSelect=(item:OptionField)=>{
       setSelectedOption(item.label);
       userSelection({
         fieldValue:item?.label,
         fieldName: "imageStyle"
       })
     }
 
   return (
     <div>
        <label className='font-bold text-4xl text-primary mx-auto'>4. Image Style!</label>
        <p className='text-primary'>Select the image style you want!</p>
        <div className='grid grid-cols-3 gap-5 mt-3'>
          {/* @ts-ignore */}
         {OptionsList.map((item,_index)=>(
             <div className={`relative grayscale hover:grayscale-0 cursor-pointer p-1 ${selectedOption==item.label?'grayscale-0 border rounded-3xl border-primary':'grayscale'}`} onClick={()=>OnUserSelect(item)}>
                 <h2 className='absolute bottom-5 text-center text-white text-2xl w-full'>{item.label}</h2>
             <Image src={item.imageUrl} alt={item.label} width={300} height={500} className='object-cover h-[120px] rounded-3xl'/>
             </div>
         ))}
        </div>
     </div>
   )
}

export default ImageStyle