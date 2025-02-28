"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Create Story", href: "/create-story" },
  { name: "Library", href: "/explore" },
  { name: "Buy Coins", href: "/buy-credits" },
];

export default function Header() {
  const [isClient, setIsClient] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <header className="fixed w-full top-0 left-0 z-50 bg-transparent backdrop-blur-md shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-white font-bold text-xl">
            StoriesOnTips
          </Link>
          <div className="hidden md:flex space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:text-blue-400 transition"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <SignedIn>
              <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-800 text-white px-3 py-2 rounded-xl font-medium">
                Dashboard
              </Link>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in" className="text-white bg-blue-600 px-3 py-2 rounded-xl text-sm font-medium">
                Login
              </Link>
              <Link href="/sign-up" className="text-white bg-blue-600 px-3 py-2 rounded-xl text-sm font-medium">
                Get Started
              </Link>
            </SignedOut>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
              {isMenuOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-black bg-opacity-80 p-4 space-y-4 backdrop-blur-md">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-white text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <SignedIn>
              <Link href="/dashboard" className="block text-white text-center bg-blue-600 py-2" onClick={() => setIsMenuOpen(false)}>
                Dashboard
              </Link>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in" className="block text-white text-center bg-blue-600 py-2" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
              <Link href="/sign-up" className="block text-white text-center bg-blue-600 py-2" onClick={() => setIsMenuOpen(false)}>
                Get Started
              </Link>
            </SignedOut>
          </div>
        )}
      </nav>
    </header>
  );
}

