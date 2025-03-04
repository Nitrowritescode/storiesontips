"use client"

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { DialogTitle } from "@/components/ui/dialog"

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Create Story", href: "/create-story" },
  { name: "Library", href: "/explore" },
  { name: "Buy Coins", href: "/buy-credits" },
]

export function Header() {
  const [isClient, setIsClient] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  if (!isClient) {
    return null // Return null on the server-side
  }

  return (
    <header className="fixed w-full top-0 left-0 z-50 bg-transparent backdrop-blur-md shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-blue-400 transition"
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
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
            <SignedOut>
              <div className="flex items-center space-x-4">
                <Link
                  href="/sign-in"
                  className="text-white bg-blue-600 px-3 py-2 rounded-xl text-sm font-medium"
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
          <div className="md:hidden flex items-center space-x-2">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  className="text-white bg-transparent border-none hover:bg-transparent focus:outline-none"
                  onClick={() => setIsMenuOpen(true)}
                >
                  {isMenuOpen ? "✖" : "☰"}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-black bg-opacity-80 p-4 space-y-4 backdrop-blur-md">
                <DialogTitle className="sr-only">Mobile Navigation Menu</DialogTitle>
                <nav className="flex flex-col space-y-3">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block text-white text-lg text-center"
                      onClick={closeMenu}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <SignedIn>
                    <Link
                      href="/dashboard"
                      className="block text-white text-center bg-blue-600 py-2 rounded"
                      onClick={closeMenu}
                    >
                      Dashboard
                    </Link>
                  </SignedIn>
                  <SignedOut>
                    <Link
                      href="/sign-in"
                      className="block text-white text-center bg-blue-600 py-2 rounded"
                      onClick={closeMenu}
                    >
                      Login
                    </Link>
                    <Link
                      href="/sign-up"
                      className="block text-white text-center bg-blue-600 py-2 rounded"
                      onClick={closeMenu}
                    >
                      Get Started
                    </Link>
                  </SignedOut>
                </nav>
              </SheetContent>
            </Sheet>
            
          </div>
        </div>
      </nav>
    </header>
  )
}