export default function Vocabulary(moral: any) {



    return (
        <div className="container">
            <h1 className=" text-2xl md:text-3xl font-extrabold text-white py-4 text-center capitalize">
                Moral of the Story
            </h1>
            <div className="bg-blue-500 py-8 border px-4 font-semibold text-xl text-center">
                <p className='p-2'>{moral?.moral}</p>

            </div>
        </div>
    )
}