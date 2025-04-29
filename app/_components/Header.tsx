"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { LayoutDashboardIcon } from "lucide-react";

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
              <Link
                href="/dashboard"
                className="bg-blue-600 hover:bg-blue-800 text-white rounded-xl font-medium"
              >
                <Button className="bg-blue-600 hover:bg-blue-800 text-white rounded-xl font-medium">
                  <LayoutDashboardIcon className="size-5"/>
                  Dashboard
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in" className="">
                <Button className="bg-blue-600 hover:bg-blue-800 text-white rounded-xl font-medium">
                  Login
                </Button>
              </Link>
              <Link href="/sign-up" className="">
                <Button className="bg-blue-600 hover:bg-blue-800 text-white rounded-xl font-medium">
                  Get Started
                </Button>
              </Link>
            </SignedOut>
          </div>
          <div className="md:hidden flex items-center space-x-2">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white border-none font-bold focus:outline-none"
                  onClick={() => setIsMenuOpen(true)}
                >
                  {isMenuOpen ? "✖" : "☰"}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-black/40 bg-opacity-80 px-4 py-8 space-y-4 backdrop-blur-md"
              >
                <DialogTitle className="sr-only">
                  Mobile Navigation Menu
                </DialogTitle>
                <nav className="flex flex-col space-y-3">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block text-white text-lg text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <SignedIn>
                    <Link
                      href="/dashboard"
                      className=""
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button className="bg-blue-600 hover:bg-blue-800 text-white rounded-xl w-full font-semibold">
                        Dashboard
                      </Button>
                    </Link>
                  </SignedIn>
                  <SignedOut>
                    <Link
                      href="/sign-in"
                      className="block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button className="bg-blue-600 hover:bg-blue-800 w-full text-white rounded-xl font-semibold">
                        Login
                      </Button>
                    </Link>
                    <Link
                      href="/sign-up"
                      className="block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button className="bg-blue-600 hover:bg-blue-800 w-full text-white rounded-xl font-semibold">
                        Get Started
                      </Button>
                    </Link>
                  </SignedOut>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
