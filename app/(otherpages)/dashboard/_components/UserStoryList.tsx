"use client"

import { db } from "@/config/db"
import { StoryData } from "@/config/schema"
import { useUser } from "@clerk/nextjs"
import { eq, desc } from "drizzle-orm"
import { useEffect, useState } from "react"
import StoryItemCard from "./StoryItemCard"
import CustomLoader from "@/app/(otherpages)/create-story/_components/CustomLoader"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { PlusCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export type StoryItemType = {
  id: number
  storyType: string
  ageGroup: string
  coverImage: string
  imageStyle: string
  userEmail: string
  userImage: string
  userName: string
  output: [] | any
  storyId: string
  storySubject: string
}

export default function UserStoryList() {
  const { user } = useUser()
  const [storyList, setStoryList] = useState<StoryItemType[]>()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    user && getUserStory()
  }, [user])

  const getUserStory = async () => {
    setLoading(true)
    const result: any = await db
      .select()
      .from(StoryData)
      .where(eq(StoryData?.userEmail, user?.primaryEmailAddress?.emailAddress ?? ""))
      .orderBy(desc(StoryData.id))
    setStoryList(result)
    setLoading(false)
    if (!result || result.length == 0) {
      toast("You have no stories currently, create them now!")
    }
  }

  if (loading) {
    return <CustomLoader isLoading={loading} />
  }

  if (!storyList || storyList.length === 0) {
    return (
      <Card className="mt-8 border-0 bg-gradient-to-br from-purple-900/40 to-pink-800/40 shadow-lg">
        <CardContent className="p-8">
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            <Image
              src="/dashboard.webp"
              alt="Children reading"
              width={400}
              height={400}
              className="rounded-lg shadow-md"
            />
            <div className="space-y-4 max-w-md">
              <h3 className="text-white text-2xl font-bold">No Stories Yet</h3>
              <p className="text-white/80">Unleash your imagination and create your first story today!</p>
              <Button
                size="lg"
                className="w-full bg-white hover:bg-white/90 text-purple-900 font-semibold shadow-md"
                onClick={() => router.push("/create-story")}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Your First Story
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {storyList.map((item: StoryItemType, index: number) => (
        <StoryItemCard story={item} key={index} />
      ))}
    </div>
  )
}
