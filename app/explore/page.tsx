"use client"

import { db } from '@/config/db';
import { StoryData } from '@/config/schema';
import { desc } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import {StoryItemType} from '../dashboard/_components/UserStoryList'
import StoryItemCard from '../dashboard/_components/StoryItemCard';
import { Button } from '@nextui-org/button';
import { toast } from 'react-toastify';


export default function ExploreMore() {
    const [offset,setOffset] = useState(0);
    const [storyList,setStoryList] = useState<StoryItemType[]>();

    useEffect(()=>{
        GetAllStories(0);
    },[])
    const GetAllStories = async (offset: number) => {
        setOffset(offset);
        const result: any = await db.select().from(StoryData).orderBy(desc(StoryData.id)).limit(8).offset(offset);
        console.log(result);
        
        if (!result || result.length === 0) {
            toast("No more stories to load!");
            return;
        }
        
        setStoryList((prev: any) => (Array.isArray(prev) ? [...prev, ...result] : [...result]));

    };
    

    return(
        <div className='min-h-screen p-10 md:px-10 lg:px-40 mt-10'>
            <h2 className='text-4xl font-bold text-center text-white'>Explore More Stories</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10'>
            {storyList?.map((item,index)=>(
                <StoryItemCard story={item} key={index}/>
            ))}
            </div>
            <div className='text-center mt-10'>
            <Button color='primary' onPress={()=>GetAllStories(offset+6)}>Load More</Button>
            </div>
        </div>
    )
};