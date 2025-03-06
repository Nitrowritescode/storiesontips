export default function Vocabulary(moral: any) {


    return (
        <div className="container">
            {/* heading and subheading*/}
           <div className="pb-6">
            <h1 className=" text-2xl md:text-3xl font-extrabold text-white  text-center capitalize">
                Moral of the Story
            </h1>
            <h3 className=" text-l md:text-l font-extrabold text-white/50 text-center">
                Every Story Has a Lesson to Learn
            </h3> 
           </div>
            {/* Moral of the story card */}
            <div className="bg-gradient-to-b rounded-3xl from-black/90 to-pink-400/80 py-8 border text-white/70 backdrop-blur-3xl px-4 font-semibold text-l md:text-xl text-center">
              <h2 className='p-2'>{!moral?.moral ? (<p>No moral available for this story, but every tale has a lesson to discover!</p>) : (moral?.moral)}</h2>
  
            </div>
        </div>
    )
}