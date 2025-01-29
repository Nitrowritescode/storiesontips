'use client';

import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center mx-auto px-4 bg-fancy">
      <div className="max-w-md w-full mx-auto">
        <SignIn/>
      </div>
    </div>

  );
}