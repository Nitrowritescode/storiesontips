'use client'

import { useClerk } from '@clerk/nextjs'

export const SignOutButton = () => {
  const { signOut } = useClerk()

  return (
    // Clicking this button signs out a user
    // and redirects them to the home page "/".
    <button onClick={() => signOut({ redirectUrl: '/' })} className='bg-blue-600 text-white px-3 py-2 w-full md:rounded-xl'>Sign Out</button>
  )
}