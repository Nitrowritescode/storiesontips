"use client"

import React from "react"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react"
import { UserButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs"

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Create Story", href: "/create-story" },
  { name: "Explore Stories", href: "/explore" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const { isLoaded, isSignedIn } = useUser()

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  if (!isLoaded) {
    return null
  }

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen}  className="bg-navbar-fancy">
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden text-white" />
        <NavbarBrand>
          <Link href="/" className="font-extrabold text-xl sm:text-2xl text-white" onPress={closeMenu}>
            StoriesOnTips
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navigationItems.map((item) => (
          <NavbarItem key={item.name}>
            <Link
              color="foreground"
              href={item.href}
              className="text-white font-semibold hover:text-purple-200"
              onPress={closeMenu}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <SignedIn>
          <NavbarItem className="hidden sm:flex">
            <Button as={Link} className="bg-blue-600 text-white" href="/dashboard" variant="flat" onPress={closeMenu}>
              Dashboard
            </Button>
          </NavbarItem>
          <NavbarItem>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                },
              }}
              
            />
          </NavbarItem>
        </SignedIn>
        <SignedOut>
          <NavbarItem className="hidden sm:flex text-white">
            <Button as={Link} href="/sign-in" variant="flat" onPress={closeMenu}>
              Login
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} href="/sign-up" variant="flat" onPress={closeMenu}>
              Get Started
            </Button>
          </NavbarItem>
        </SignedOut>
      </NavbarContent>

      <NavbarMenu>
        {navigationItems.map((item) => (
          <NavbarMenuItem key={item.name}>
            <Link className="text-white w-full" href={item.href} size="lg" onPress={closeMenu}>
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <SignedIn>
          <NavbarMenuItem>
            <Link className="w-full text-white" href="/dashboard" size="lg" onPress={closeMenu}>
              Dashboard
            </Link>
          </NavbarMenuItem>
        </SignedIn>
        <SignedOut>
          <NavbarMenuItem>
            <Link className="w-full text-white" href="/sign-in" size="lg" onPress={closeMenu}>
              Login
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link className="w-full text-white" href="/sign-up" size="lg" onPress={closeMenu}>
              Get Started
            </Link>
          </NavbarMenuItem>
        </SignedOut>
      </NavbarMenu>
    </Navbar>
  )
}

