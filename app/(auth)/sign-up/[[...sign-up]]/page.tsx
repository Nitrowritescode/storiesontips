"use client";

import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 place-items-center justify-center mx-auto bg-[#000015]">
      <div className="max-w-md w-full mx-auto">
        <div className="flex flex-col justify-center items-left w-full text-center pb-2">
          <h1 className="text-2xl  text-white font-bold">Welcome To The Journey</h1>
          <p className="text-l text-white/50">
            Start creating magical tales for fun and education
          </p>
        </div>
        <div className="pl-6">
          <SignUp />
        </div>
      </div>
      <div className="w-full h-screen">
        <Image
          width={400}
          height={400}
          alt="login page image"
          className="bg-cover h-full w-full"
          src="/landing/background2.webp"
        />
      </div>
    </div>
  );
}
