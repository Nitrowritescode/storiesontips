import React from 'react'
import { BookOpen, ThumbsUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface LastPageProps {
  moral?: string;
}

function LastPage({ moral }: LastPageProps) {
  const handleLike = () => {
    // This would be connected to analytics or feedback service in production
    console.log('Story liked!')
  }

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 bg-gradient-to-b from-primary/90 to-primary/60 p-8 flex flex-col items-center justify-center gap-6">
        <BookOpen className="h-16 w-16 text-primary-foreground" strokeWidth={1.5} />
        
        <h2 className='text-3xl font-bold text-center text-primary-foreground'>
          The End
        </h2>
        
        <p className="text-lg text-primary-foreground/90 text-center mt-2">
          We hope you enjoyed this story!
        </p>
      </div>
      
  
    </div>
  )
}

export default LastPage