'use client'

import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center mx-auto bg-fancy">
      <div className="max-w-md bg-white mx-auto">
        <SignUp/>
      </div>
    </div>
  )
}

