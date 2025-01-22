"use client";

import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { Book, Contact, Home, LayoutDashboard, PenTool, Wand2 } from 'lucide-react';
import { useState } from "react";

const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Create Story", href: "/create-story", icon: PenTool },
  { name: "Explore Stories", href: "/explore", icon: Book },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <Navbar
      className="bg-[#b28ed3]"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      height="3.5rem"
    >
      <NavbarContent className="lg:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="text-white"
        />
      </NavbarContent>

      <NavbarBrand>
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-full bg-purple-600 p-2">
            <Wand2 className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-xl text-white">
            StoriesOnTips
          </span>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden lg:flex gap-4" justify="center">
        {navigationItems.map((item) => (
          <NavbarItem key={item.name}>
            <Link
              href={item.href}
              className="text-white flex items-center gap-1 hover:text-purple-300 transition-colors"
            >
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <SignedIn>
          <NavbarItem className="hidden lg:flex">
            <Button
              as={Link}
              href="/dashboard"
              variant="flat"
              className="bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              startContent={<LayoutDashboard className="w-4 h-4" />}
            >
              Dashboard
            </Button>
          </NavbarItem>
          <NavbarItem className="flex justify-center items-center">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                },
              }}
              afterSignOutUrl="/"
            />
          </NavbarItem>
        </SignedIn>
        <SignedOut>
          <NavbarItem>
            <Button
              as={Link}
              href="/sign-up"
              variant="flat"
              className="bg-purple-600 text-white hover:bg-purple-700 transition-colors"
            >
              Get Started
            </Button>
          </NavbarItem>
        </SignedOut>
      </NavbarContent>

      <NavbarMenu className="bg-[#595fbc]/95 pt-6 w-1/2">
        {navigationItems.map((item) => (
          <NavbarMenuItem key={item.name}>
            <Link
              color="foreground"
              className="w-full text-white flex items-center gap-2 py-2 hover:text-purple-300 transition-colors"
              href={item.href}
              size="lg"
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <SignedIn>
          <NavbarMenuItem>
            <Link
              color="foreground"
              className="w-full text-white flex items-center gap-2 py-2 hover:text-purple-300 transition-colors"
              href="/dashboard"
              size="lg"
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Link>
          </NavbarMenuItem>
        </SignedIn>
        <SignedOut>
          <NavbarMenuItem>
            <Button
              as={Link}
              href="/sign-up"
              variant="flat"
              className="bg-purple-600 text-white hover:bg-purple-700 transition-colors mt-4 w-full"
            >
              Get Started
            </Button>
          </NavbarMenuItem>
        </SignedOut>
      </NavbarMenu>
    </Navbar>
  );
}

