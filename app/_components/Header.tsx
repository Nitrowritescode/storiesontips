"use client"

import { useState } from "react"
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs"
import { Book, Home, LayoutDashboard, PenTool, Wand2 } from "lucide-react"
import Link from "next/link"

const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Create Story", href: "/create-story", icon: PenTool },
  { name: "Explore Stories", href: "/explore", icon: Book },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isSignedIn } = useUser()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-[#b28ed3] dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-2 px-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="rounded-full bg-purple-600 p-2">
            <Wand2 className="text-white w-6 h-6" />
          </div>
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white dark:text-white">
            StoriesOnTips
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <SignedIn>
            <Link
              href="/dashboard"
              className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-2 hidden md:inline-flex items-center"
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
          <SignedOut>
            <Link
              href="/sign-up"
              className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Get Started
            </Link>
          </SignedOut>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ${isMenuOpen ? "block" : "hidden"} w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 font-medium border border-gray-100 rounded-lg bg-purple-500 md:space-x-8 rtl:space-x-reverse md:flex-row md:border-0 md:bg-transparent absolute left-0 right-0 top-full md:static md:mt-0">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center py-2 px-3 text-white rounded hover:bg-purple-500 md:hover:bg-transparent md:hover:text-purple-300 md:p-0"
                >
                  <item.icon className="w-4 h-4 mr-2 md:mr-0 md:hidden" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
            <SignedIn>
              <li className="md:hidden">
                <Link
                  href="/dashboard"
                  className="flex items-center py-2 px-3 text-white rounded hover:bg-purple-500 md:hover:bg-transparent md:hover:text-purple-300 md:p-0"
                >
                  <span>Dashboard</span>
                </Link>
              </li>
            </SignedIn>
          </ul>
        </div>
      </div>
    </nav>
  )
}

