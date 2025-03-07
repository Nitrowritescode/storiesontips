"use client";

import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 place-items-center mx-auto bg-[#000015]">
      <div className="max-w-md w-full mx-auto">
        <div className="flex flex-col justify-center items-left w-full text-center md:pb-4 max-md:pb-6">
          <h1 className="text-2xl  text-white font-bold">Welcome Back</h1>
          <p className="text-l text-white/50 max-lg:px-12">
          Get back to creating magical tales for fun and education
          </p>
        </div>
        <div className="pl-6">
          <SignIn />
        </div>
      </div>
      <div className="w-full h-screen max-lg:hidden max-lg:py-4">
        <Image
          width={400}
          height={400}
          alt="login page image"
          className="bg-cover h-full w-full"
          src="/landing/background3.webp"
        />
      </div>
    </div>
  );
}
