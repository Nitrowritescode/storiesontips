import { Button } from "@nextui-org/button"
import Image from "next/image"
import Link from "next/link"


export default function Custom404() {
  return (
    <>

    <div className="min-h-screen flex items-center justify-center bg-fancy">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-6">Oops! Page Not Found</h2>
        <div className="mb-8">
          <Image
            src="/hero.webp" // Add your image path here
            alt="404 Illustration"
            width={200}
            height={200}
            className="mx-auto"
            />
        </div>
        <p className="text-xl text-white mb-8">
          It seems the page you're looking for has vanished into thin air!
        </p>
        <Button
          as={Link}
          href="/"
          color="primary"
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
          Return to Homepage
        </Button>
      </div>
    </div>
   </>
  )
}

