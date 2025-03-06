import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";


type StoryItemType = {
    story:{id: number;
    storyType: string;
    ageGroup: string;
    coverImage: string;
    imageStyle: string;
    userEmail: string;
    userImage: string;
    userName: string;
    output: [] | any; // or []any depending on TypeScript version
    storyId: string;
    storySubject: string;}
  };



  export default function StoryItemCard({ story }: StoryItemType) {
    return (
      <Link href={`/view-story/${story?.storyId}`} className="block w-full mx-auto">
        <Card className="w-full mx-auto h-[380px] bg-gradient-to-b from-black/90 to-pink-400/80 col-span-12 sm:col-span-5 hover:scale-105 transition-transform rounded-3xl overflow-hidden shadow-lg">
          <CardContent className="w-full h-full rounded-3xl px-0 py-4">
            <Image
              alt="Story Cover"
              className="w-full mx-auto h-[250px] bg-cover rounded-3xl px-4"
              src={story?.coverImage}
              width={500}
              height={500}
            />
           <div className="flex bg-gradient-to-br h-[30%] from-black/80 to-black/30 px-4 mt-4 py-2 gap-2 text-l justify-between items-center">

            <p className="text-white/80 max-sm:text-s md:text-l text-left font-medium">
              {story?.output?.bookTitle}
            </p>

            <Button className="bg-blue-600 text-white hover:bg-blue-700" size="sm">
              Open
            </Button>
           </div>
          </CardContent>
        </Card>
      </Link>
    );
  }