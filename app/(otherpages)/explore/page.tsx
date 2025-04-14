"use client";

import { db } from "@/config/db";
import { StoryData } from "@/config/schema";
import { desc } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { StoryItemType } from "../dashboard/_components/UserStoryList";
import StoryItemCard from "../dashboard/_components/StoryItemCard";
import { Button } from "@/components/ui/button";

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
      <h2 className="text-4xl font-bold text-center text-white">
        Story Library
      </h2>
      <h3 className="text-l py-2 text-white text-center">
        Explore more stories here created by others
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 mt-10">
        {storyList.map((item, index) => (
          <StoryItemCard story={item} key={index} />
        ))}
      </div>
      {hasMore && (
        <div className="text-center mt-10">
          <Button
            className="mb-8 bg-white text-black hover:bg-gray-400"
            onClick={() => GetAllStories(offset + 8)}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
