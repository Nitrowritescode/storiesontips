import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type StoryItemType = {
  story: {
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
}

export default function StoryItemCard({ story }: StoryItemType) {
  return (
    <Link href={`/view-story/${story?.storyId}`} className="block w-full group">
      <Card className="w-full h-[380px] overflow-hidden border-0 rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:translate-y-[-5px] bg-gradient-to-r  from-pink-600/20 via-indigo-800 to-purple-600/20">
        <CardContent className="p-0 h-full">
          <div className="relative h-full flex flex-col">
            <div className="relative h-[250px] overflow-hidden">
              <Image
                alt={story?.output?.bookTitle || "Story Cover"}
                className="w-full h-full bg-cover transition-transform duration-500 group-hover:scale-105"
                src={story?.coverImage || "/placeholder.svg"}
                width={500}
                height={500}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="flex-1 bg-gradient-to-r  from-pink-600/20 via-indigo-800 to-purple-600/20 p-4 flex flex-col justify-between">
              <h3 className="text-white font-medium text-lg line-clamp-2 mb-2">
                {story?.output?.bookTitle || "Untitled Story"}
              </h3>

              <div className="flex justify-between items-center">
                <Badge variant="default" className="text-medium text-white/80 font-medium">{story?.storyType || "Story"}</Badge>
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1">
                  <Eye className="h-4 w-4" />
                  Open
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
