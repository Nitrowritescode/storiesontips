"use client"

import React, { useState, useEffect } from "react"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Link from "next/link"


const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Create Story", href: "/create-story" },
  { name: "Explore Stories", href: "/explore" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setIsMenuOpen(false)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <div>
      <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-navbar-fancy">
        <NavbarContent>
          <NavbarMenuToggle 
            aria-label={isMenuOpen ? "Close menu" : "Open menu"} 
            className="sm:hidden text-white" 
          />
          <NavbarBrand>
            <Link href="/" className="font-extrabold text-xl sm:text-2xl text-white">
              StoriesOnTips
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {navigationItems.map((item) => (
            <NavbarItem key={item.name}>
              <Link
                href={item.href}
                className="text-white font-semibold hover:text-purple-200"
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end">
          <SignedIn>
            <div className="flex gap-4 items-center">
              <NavbarItem className="hidden sm:flex">
                <Button 
                  as={Link} 
                  className="bg-blue-600 text-white" 
                  href="/dashboard"
                  onPress={closeMenu}
                >
                  Dashboard
                </Button>
              </NavbarItem>
              <NavbarItem>
                <UserButton
                  appearance={{
                    elements: { avatarBox: "w-8 h-8" }
                  }}
                />
              </NavbarItem>
            </div>
          </SignedIn>
          
          <SignedOut>
            <div className="flex gap-4">
              <NavbarItem className="hidden sm:flex">
                <Button 
                  as={Link} 
                  href="/sign-in" 
                  className="bg-blue-600 text-white"
                >
                  Login
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button 
                  as={Link} 
                  href="/sign-up" 
                  className="bg-blue-600 text-white"
                >
                  Get Started
                </Button>
              </NavbarItem>
            </div>
          </SignedOut>
        </NavbarContent>

        <NavbarMenu className="w-[60%] h-[60vh]">
          {navigationItems.map((item) => (
            <NavbarMenuItem key={item.name}>
              <Link className="text-white w-full" href={item.href} onClick={closeMenu}>
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
          <SignedIn>
            <NavbarMenuItem>
              <Link className="w-full text-white" href="/dashboard" onClick={closeMenu}>
                Dashboard
              </Link>
            </NavbarMenuItem>
          </SignedIn>
          <SignedOut>
            <NavbarMenuItem>
              <Link className="w-full text-white" href="/sign-in" onClick={closeMenu}>
                Login
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link className="w-full text-white" href="/sign-up" onClick={closeMenu}>
                Get Started
              </Link>
            </NavbarMenuItem>
          </SignedOut>
        </NavbarMenu>
      </Navbar>
    </div>
  )
}