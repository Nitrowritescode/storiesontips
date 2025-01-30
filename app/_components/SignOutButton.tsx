'use client'

import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export const SignOutButton = () => {
  const { signOut } = useClerk()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      // First complete the Clerk sign-out process
      await signOut()
      
      // Then perform client-side redirect
      router.push('/')
      router.refresh() // Clear any cached auth state
    } catch (error) {
      console.error('Sign out failed:', error)
    }
  }

  return (
    <button 
      onClick={handleSignOut}
      className='bg-blue-600 text-white px-3 py-2 w-full md:rounded-xl'
    >
      Sign Out
    </button>
  )
}