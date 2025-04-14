export default function libraryLoading() {


return (
    <>
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <svg
                className="animate-spin h-10 w-10 text-blue-500 mb-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="none"
                    d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"
                />
            </svg>
            <p className="text-lg text-gray-700">Loading...</p>
        </div>
    </>
)    
}
