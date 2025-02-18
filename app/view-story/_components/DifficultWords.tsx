export default function difficultWords({ chapters }: any) {
    return (
        <div className="container">
            <h1 className=" text-2xl md:text-3xl font-extrabold text-white py-4 text-center">Difficult Words</h1>
            {chapters?.map((chapter: any, chapterIndex: number) => (
                <div key={`chapter-${chapterIndex}`} className="border">
                    {chapter.difficultWords?.map((word: any, wordIndex: number) => (
                        <div key={`word-${wordIndex}`} className="grid grid-cols-2 items-center justify-between gap-8 bg-blue-500 py-4">
                            <div className="flex justify-center items-center p-4">
                            <h2 className="font-bold text-xl">{word.word}</h2>

                            </div>
                            <div className="flex justify-center items-center p-4">

                            <p className="font-semibold text-l text-center">{word.meaning}</p>
                            </div>

                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}