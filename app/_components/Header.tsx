"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { UserButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs"

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Create Story", href: "/create-story" },
  { name: "Explore Stories", href: "/explore" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { isLoaded, isSignedIn } = useUser()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !isLoaded) {
    return null
  }

  return (
    <nav className="bg-[#bb8fce] text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <div>
              <Link href="/" className="flex items-center py-5 px-2 text-white">
                <span className="font-extrabold text-xl md:text-2xl lg:text-3xl text-primary">StoriesOnTips</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link key={item.name} href={item.href} className="py-5 px-3 text-primary font-bold hover:text-purple-200">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <SignedIn>
              <Link
                href="/dashboard"
                className="py-2 px-3 bg-purple-700 hover:bg-purple-800 text-white rounded transition duration-300"
              >
                Dashboard
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
              />
            </SignedIn>
            <SignedOut>
              <Link
                href="/sign-in"
                className="py-2 px-3 bg-purple-700 hover:bg-purple-800 text-white rounded transition duration-300"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="py-2 px-3 bg-purple-700 hover:bg-purple-800 text-white rounded transition duration-300"
              >
                Sign Up
              </Link>
            </SignedOut>
          </div>
          <div className="md:hidden flex items-center">
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 mr-2",
                  },
                }}
              />
            </SignedIn>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="mobile-menu-button p-2">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`mobile-menu ${isMenuOpen ? "" : "hidden"} md:hidden`}>
        {navigationItems.map((item) => (
          <Link key={item.name} href={item.href} className="block py-2 px-4 text-sm hover:bg-purple-700" onClick={() => setIsMenuOpen(false)}>
            {item.name}
          </Link>
        ))}
        <SignedIn>
          <Link href="/dashboard" className="block py-2 px-4 text-sm hover:bg-purple-700">
            Dashboard
          </Link>
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in" className="block py-2 px-4 text-sm hover:bg-purple-700">
            Sign In
          </Link>
          <Link href="/sign-up" className="block py-2 px-4 text-sm hover:bg-purple-700">
            Sign Up
          </Link>
        </SignedOut>
      </div>
    </nav>
  )
}

