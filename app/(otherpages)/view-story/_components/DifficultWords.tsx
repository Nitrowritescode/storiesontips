import { Card, CardContent, CardHeader } from "@/components/ui/card";







export default function difficultWords({ chapters }: any) {
  console.log(
    "difficult",
    chapters?.map((chapter: any, chapterIndex: number) =>
      chapter.difficultWords?.map((word: any, wordIndex: number) => word.word)
    )
  );

  return (
    <div className="container">
      <div className="py-6">
      <h1 className=" text-2xl md:text-3xl font-extrabold text-white text-center">
        Difficult Words
      </h1>
      <h3 className=" text-l md:text-l font-extrabold text-white/50 text-center">
      Enhance Your Vocabulary with These Words
      </h3>
      </div>
<div>
{chapters?.some((chapter: any) => chapter.difficultWords?.length > 0) ? (
  <Card className="border py-2 sm:px-12 md:px-20 lg:px-24 bg-gradient-to-b backdrop-blur-lg from-black/90 to-pink-400/80 shadow-md rounded-3xl">
  <CardHeader className="bg">
  </CardHeader>
  <div
      
              className="flex items-center justify-between gap-10 p-4 bg-transparent text-white rounded-lg"
            >
              <h1 className="font-bold max-sm:text-xl md:text-2xl lg:text-2xxl capitalize">Words</h1>
              <h1 className="font-semibold text-right max-sm:text-xl md:text-2xl lg:text-2xl">Meanings</h1>
            </div>
  <CardContent className="px-0">
    {chapters?.map((chapter: any, chapterIndex: number) => (
      <div key={`chapter-${chapterIndex}`} className="mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
          {chapter.difficultWords?.map((word: any, wordIndex: number) => (
            <div
              key={`word-${wordIndex}`}
              className="flex items-center justify-between gap-10 p-4 bg-transparent text-white rounded-lg"
            >
              <h2 className="font-bold max-sm:text-s md:text-l lg:text-xl capitalize">{word.word}</h2>
              <p className="font-semibold text-right max-sm:text-xs md:text-l lg:text-xl">{word.meaning}</p>
            </div>
          ))}
        </div>
      </div>
    ))}
    </CardContent>
  </Card>
) : (
  <Card className="border p-4 bg-blue-500 text-white text-center font-bold text-xl shadow-md rounded-lg">
    No Difficult Words Available
  </Card>
)}

</div>
    </div>
  );
}
