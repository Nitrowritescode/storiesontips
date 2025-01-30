"use client";

import { db } from "@/config/db";
import { StoryData } from "@/config/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import BookCoverPage from "../_components/BookCoverPage";
import StoryPages from "../_components/StoryPages";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";
import LastPage from "../_components/LastPage";
import { use } from "react";
import { useWindowSize } from "@/utils/useWindowSize"
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

// interface ViewStoryProps {
//   params: {
//     id: string;
//   }
// }

function ViewStory({ params }: any) {
  const resolvedParams: any = use(params);
  const [story, setStory] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const bookRef = useRef<any>(null);
  const [count, setCount] = useState(0);
  const { width, height } = useWindowSize();
  const router = useRouter();

  // Calculate book dimensions based on screen size
  const bookWidth = Math.min(500, width * 0.8)
  const bookHeight = Math.min(700, height * 0.5)

  useEffect(() => {
    getStory();
  }, [resolvedParams.id]);

  const getStory = async () => {
    try {
      setIsLoading(true);
      const result = await db
        .select()
        .from(StoryData)
        .where(eq(StoryData.storyId, resolvedParams.id));

      if (result && result[0]) {
        setStory(result[0]);
      }
    } catch (error) {
      console.error("Error fetching story:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!story) {
    return <div className="p-10 text-center">Story not found</div>;
  }

  return (
    <div className="bg-fancy md:px-20 lg:px-40 flex-col md:mx-auto lg:mx-auto min-h-screen">
      <h2 className="font-bold text-4xl text-center p-4 bg-primary text-white">
        {story.output?.bookTitle}
      </h2>

      <div className="relative mx-auto m-0">
        {/* @ts-ignore */}
        <HTMLFlipBook
         width={bookWidth}
         height={bookHeight}
          showCover={true}
          className="mt-4 md:mt-0 lg:mt-0 mx-auto" 
          useMouseEvents={false}
          ref={bookRef}
        >
          {/* Cover Page */}
          <div className="page">
            <BookCoverPage imageUrl={story.coverImage} />
          </div>

          {/* Story Pages */}
          {story.output?.chapters?.map((chapter: any, index: number) => (
            <div key={`chapter-${index}`} className="page bg-white p-10 border">
              <StoryPages storyChapter={chapter} />
            </div>
          ))}

          {/* Last Page */}
          <div className="page bg-white p-10 border">
            <LastPage />
          </div>
        </HTMLFlipBook>

        {/* Navigation Buttons */}
        {count!=0 && <div
          className="absolute md:-left-10 lg:-left-10 top-[250px]"
          onClick={() => {
            bookRef.current?.pageFlip()?.flipPrev();
            setCount(count - 1);
          }}
        >
          <BsArrowLeftSquareFill className="text-[40px] text-blue-600 cursor-pointer" />
        </div>}
      {count!=(story.output?.chapters?.length+2) && <div
          className="absolute -right-1 md:-right-10 lg:-right-10 top-[250px]"
          onClick={() => {
            bookRef.current?.pageFlip()?.flipNext();
            setCount(count + 1);
          }}
        >
          <BsArrowRightSquareFill className="text-[40px] cursor-pointer text-blue-600" />
        </div>}
      </div>
      <div className="py-8 md:py-10 lg:py-24 flex justify-center items-center mx-auto">
        <Button as={Link} href="/dashboard" className="bg-blue-600 text-white w-[80%] mx-auto">Back to Dashboard</Button>
      </div>
    </div>
  );
}

export default ViewStory;
