"use client"

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { useEffect, useState } from "react"


const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Create Story", href: "/create-story" },
  { name: "Explore Stories", href: "/explore" },
]

export function Header() {
  const [isClient, setIsClient] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)



  // added this for custom signout flow using clerk 
  // const handleSignOut = async () => {
  //   await signOut();
  //   router.push("/"); // or any route you want
  // };


  useEffect(() => {
    setIsClient(true)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  if (!isClient) {
    return null // Return null on the server-side
  }

  return (
    <>
      <nav className="bg-navbar-fancy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-white font-bold text-xl">
                StoriesOnTips
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                    px-3 py-2 rounded-md text-sm font-medium text-white`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden md:block">
              <SignedIn>
                <div className="flex items-center space-x-2 py-2">
                  <Link
                    href="/dashboard"
                    className="bg-blue-600 hover:bg-blue-800 text-white px-3 py-2 rounded-xl font-medium"
                  >
                    Dashboard
                  </Link>
                  {/* <SignOutFlowButton/> */}
                  <UserButton

                  />
                </div>
              </SignedIn>
              <SignedOut>
                <div className="flex items-center space-x-4">
                  <Link
                    href="/sign-in"
                    className="text-white bg-blue-600  px-3 py-2 rounded-xl text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/sign-up"
                    className="text-white bg-blue-600 px-3 py-2 rounded-xl text-sm font-medium"
                  >
                    Get Started
                  </Link>
                </div>
              </SignedOut>
            </div>
            <div className="md:hidden flex items-center">
              <SignedIn>
                <UserButton

                />
              </SignedIn>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-800 focus:ring-white ml-2"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={` text-white block px-3 py-2 rounded-md text-base font-medium`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <SignedIn>
                <Link
                  href="/dashboard"
                  className="bg-blue-600 block px-3 py-2 rounded-md text-base text-white text-center font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                {/* <SignOutFlowButton/> */}

              </SignedIn>
              <SignedOut>
                <Link
                  href="/sign-in"
                  className="bg-blue-600 block px-3 py-2 rounded-md text-base text-white text-center font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-blue-600 block px-3 py-2 rounded-md text-base text-white text-center font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </SignedOut>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

