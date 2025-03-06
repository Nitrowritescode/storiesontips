"use client"

import { db } from '@/config/db';
import { StoryData } from '@/config/schema';
import { useUser } from '@clerk/nextjs';
import { eq, desc } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import StoryItemCard from './StoryItemCard';
import CustomLoader from '@/app/(otherpages)/create-story/_components/CustomLoader';
import { toast } from 'react-toastify';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import Image from "next/image"
import { useRouter } from 'next/navigation';




export type StoryItemType = {
    id: number;
    storyType: string;
    ageGroup: string;
    coverImage: string;
    imageStyle: string;
    userEmail: string;
    userImage: string;
    userName: string;
    output: [] | any; // or []any depending on TypeScript version
    storyId: string;
    storySubject: string;
};



export default function UserStoryList() {

    const { user } = useUser()
    const [storyList, setStoryList] = useState<StoryItemType[]>();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        user && getUserStory();
    }, [user])

    const getUserStory = async () => {
        setLoading(true)
        const result: any = await db.select().from(StoryData)
            .where(eq(StoryData?.userEmail, user?.primaryEmailAddress?.emailAddress ?? ''
            ))
            .orderBy(desc(StoryData.id))
        setStoryList(result);
        setLoading(false)
        if (!result || result.length == 0) {
            toast("You have no stories currently, create them now!")
        }

    }

    return (
        <div>
            {/* @ts-ignore */}
      { storyList && storyList.length > 0 ? (<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 mt-10 rounded-2xl mx-auto'>
                {/* @ts-ignore */}
                {storyList && storyList.map((item: StoryItemType, index: number) => (
                    <StoryItemCard story={item} key={index}/>
                ))}
            </div>) :
                (

                    <div className='flex flex-col justify-center items-center mt-4'>
                        <Image
                            src="/dashboard.webp"
                            alt="children reading"
                            width={400}
                            height={400}

                        />
                        <Link href='/create-story' className='text-2xl w-[80%] mx-auto' passHref>
                            <Button  className=' bg-white p-4 lg:p-6 mt-2 lg:mt-4 w-full mx-auto' type='button' onPress={() => router.push('/create-story')}>
                                Create Story
                            </Button>
                        </Link>
                        <p className='text-white text-xl p-2 font-bold text-center'>Unleash Your Imagination!</p>
                    </div>

                )}
            <CustomLoader isLoading={loading}/>
        </div>
    )
}

