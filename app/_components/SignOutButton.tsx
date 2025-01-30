"use client";

import { useClerk } from "@clerk/nextjs";
import { error } from "console";
import { useRouter } from "next/navigation";

export const SignOutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    try{await signOut();
    }catch(error) {
      console.log(error)
    }
      // redirect to homepage
    router.push("/");
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-blue-600 text-white px-3 py-2 w-full md:rounded-xl"
    >
      Sign Out
    </button>
  );
};
