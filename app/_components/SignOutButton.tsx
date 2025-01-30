"use client";

import { useClerk } from "@clerk/nextjs";

export const SignOutButton = () => {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut();
    // Force a full browser refresh to "/"
    window.location.href = "/";
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
