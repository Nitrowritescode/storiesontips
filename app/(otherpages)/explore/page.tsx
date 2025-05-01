"use client";

import { db } from "@/config/db";
import { StoryData } from "@/config/schema";
import { desc } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { StoryItemType } from "../dashboard/_components/UserStoryList";
import StoryItemCard from "../dashboard/_components/StoryItemCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ExploreMore() {
  const [offset, setOffset] = useState(0);
  const [storyList, setStoryList] = useState<StoryItemType[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    GetAllStories(0);
  }, []);

  useEffect(() => {
    // Check if we've reached the 20-story limit after state update
    if (storyList.length >= 15) {
      setHasMore(false);
    }
  }, [storyList]);

  const GetAllStories = async (newOffset: number) => {
    if (!hasMore) return;

    try {
      const result = await db
        .select()
        .from(StoryData)
        .orderBy(desc(StoryData.id))
        .limit(8)
        .offset(newOffset);

      if (!result?.length) {
        setHasMore(false);
        return;
      }

      setStoryList((prev) => {
        const combined = [...prev, ...result];
        // Ensure we never exceed 20 stories
        return combined.slice(0, 15) as StoryItemType[];
      });

      setOffset(newOffset);
    } catch (error) {
      console.error("Failed to load stories:", error);
    }
  };

  return (
    <div className="min-h-screen px-4 md:px-8 lg:px-12 bg-fancy md:pb-20 lg:pb-20 pb-10">
      <div className="relative py-4 mb-10">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-pink-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl" />

        {/* Title content */}
        <div className="relative text-center space-y-2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl pb-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
            Story Library
          </h1>
          <p className="text-purple-200/80 text-lg max-w-xl mx-auto">
            Explore more stories here created by others
          </p>
          <div className="flex justify-center pt-2">
            <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 mt-10">
        {storyList.map((item, index) => (
          <StoryItemCard story={item} key={index} />
        ))}
      </div>
      {hasMore && (
        <div className="text-center mt-10">
          <Button
            className="my-4 bg-indigo-600 text-white p-4 hover:bg-indigo-400"
            onClick={() => GetAllStories(offset + 8)}
          >
            <Plus className='size-6'/>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
