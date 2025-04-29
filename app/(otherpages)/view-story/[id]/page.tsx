"use client";

import { db } from "@/config/db";
import { StoryData } from "@/config/schema";
import { eq } from "drizzle-orm";
import { use, useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { useWindowSize } from "@/utils/useWindowSize";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Home, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import BookCoverPage from "../_components/BookCoverPage";
import StoryPages from "../_components/StoryPages";
import LastPage from "../_components/LastPage";
import Moral from "../_components/Moral";
import DifficultWords from "../_components/DifficultWords";

interface ViewStoryProps {
  params: Promise<{
    id: string;
  }>;
}

interface StoryChapter {
  chapterTitle: string;
  storyText: string;
  difficultWords?: {
    word: string;
    meaning: string;
  }[];
}

interface StoryOutput {
  bookTitle: string;
  chapters: StoryChapter[];
  moralOfTheStory?: {
    moral: string;
  };
}

interface Story {
  storyId: string;
  coverImage: string;
  output: StoryOutput;
}

export default function ViewStory({ params }: ViewStoryProps) {
  // Properly unwrap params using React.use()
  const resolvedParams = use(params);
  const storyId = resolvedParams.id;
  const [story, setStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const bookRef = useRef<any>(null);
  const { width, height } = useWindowSize();

  // Calculate book dimensions based on screen size
  const bookWidth = Math.min(500, width ? width * 0.75 : 400);
  const bookHeight = Math.min(700, height ? height * 0.55 : 600);

  useEffect(() => {
    const getStory = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await db
          .select()
          .from(StoryData)
          .where(eq(StoryData.storyId, storyId));

        if (result && result[0]) {
          setStory(result[0] as unknown as Story);
        } else {
          setError("Story not found");
        }
      } catch (error) {
        console.error("Error fetching story:", error);
        setError("Failed to load story. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    getStory();
  }, [storyId]);

  useEffect(() => {
    if (story) {
      setTotalPages((story.output?.chapters?.length || 0) + 2); // +2 for cover and last page
    }
  }, [story]);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      bookRef.current?.pageFlip()?.flipPrev();
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      bookRef.current?.pageFlip()?.flipNext();
      setCurrentPage(currentPage + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 bg-[#000015] text-white">
        <div className="space-y-4">
          <Skeleton className="h-12 w-3/4 mx-auto bg-slate-800" />
          <div className="flex justify-center my-8">
            <Skeleton className="h-[600px] w-[400px] bg-slate-800" />
          </div>
          <Skeleton className="h-40 w-full bg-slate-800" />
          <Skeleton className="h-40 w-full bg-slate-800" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 px-4 bg-[#000015] text-white">
        <Card className="p-8 max-w-md mx-auto text-center bg-slate-900 border-slate-700">
          <div className="text-red-400 mb-4">
            <BookOpen className="h-12 w-12 mx-auto mb-2" />
            <h2 className="text-2xl font-bold">{error}</h2>
          </div>
          <p className="text-slate-400 mb-6">
            We couldn't find the story you're looking for.
          </p>
          <Button
            asChild
            variant="outline"
            className="bg-slate-800 text-white hover:bg-slate-700 border-slate-600"
          >
            <Link href="/dashboard">
              <Home className="mr-2 h-4 w-4" />
              Return to Dashboard
            </Link>
          </Button>
        </Card>
      </div>
    );
  }

  if (!story) return null;

  return (
    <div className="min-h-screen bg-[#000015] text-white">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <Card className="bg-slate-900 text-center p-4">
        <div className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-500">
          <h1 className="text-2xl px-2 lg:text-4xl font-bold text-center rounded-lg">
            {story.output?.bookTitle}
          </h1>
        </div>
        </Card>

        {/* Book Container */}
        <div className="relative mx-auto my-8">
          <div className="flex justify-center">
            {/* @ts-ignore */}
            <HTMLFlipBook
              width={bookWidth}
              height={bookHeight}
              showCover={true}
              className="mx-auto shadow-2xl"
              useMouseEvents={false}
              ref={bookRef}
              onFlip={(e: any) => setCurrentPage(e.data)}
            >
              {/* Cover Page */}
              <div className="page">
                <BookCoverPage imageUrl={story.coverImage} />
              </div>

              {/* Story Pages */}
              {story.output?.chapters?.map((chapter, index) => (
                <div
                  key={`chapter-${index}`}
                  className="page bg-slate-900 border border-slate-700 rounded-r-md shadow-inner"
                >
                  <StoryPages storyChapter={chapter} />
                </div>
              ))}

              {/* Last Page */}
              <div className="page bg-slate-900 p-10 border border-slate-700 rounded-r-md shadow-inner">
                <LastPage />
              </div>
            </HTMLFlipBook>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="h-12 w-12 rounded-full shadow-md bg-slate-800 text-white hover:bg-slate-700 border-slate-600"
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous page</span>
            </Button>

            <div className="text-center text-sm text-slate-300">
              Page {currentPage + 1} of {totalPages}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              className="h-12 w-12 rounded-full shadow-md bg-slate-800 text-white hover:bg-slate-700 border-slate-600"
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        </div>

        {/* Moral of the Story */}
        <Card className="my-12 p-6 shadow-lg bg-slate-900 border-slate-700">
          <Moral moral={story.output?.moralOfTheStory?.moral} />
        </Card>

        {/* Difficult Words */}
        <Card className="my-12 p-6 shadow-lg bg-slate-900 border-slate-700">
          <DifficultWords chapters={story.output?.chapters} />
        </Card>

        {/* Back to Dashboard */}
        <div className="flex justify-center my-12">
          <Button
            asChild
            size="lg"
            className="px-8 bg-indigo-900 hover:bg-indigo-800 text-white"
          >
            <Link href="/dashboard">
              <Home className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
