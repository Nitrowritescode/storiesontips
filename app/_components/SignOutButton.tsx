"use client";

import { useClerk } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";
import Link from "next/link";


export const SignOutButton = () => {
  const { signOut } = useClerk();
  
  return (
   
    <Button as={Link} href="/"
      onPress={() => signOut({ redirectUrl: '/' })}
      className="bg-blue-600 text-white px-3 py-2 w-full md:rounded-xl"
    >
      Sign Out
    </Button>
  );
};
