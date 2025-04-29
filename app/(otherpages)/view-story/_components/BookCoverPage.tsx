"use client"

import React from 'react'
import Image from 'next/image'

interface BookCoverPageProps {
  imageUrl: string;
  title?: string;
}

function BookCoverPage({ imageUrl, title }: BookCoverPageProps) {
  return (
    <div className="relative h-full w-full bg-gradient-to-b from-slate-800 to-slate-900 flex flex-col items-center justify-center">
      <div className="relative h-full w-full mx-auto overflow-hidden shadow-lg border-2 border-amber-200/30">
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt={title || 'Book cover'} 
            fill
            sizes="(max-width: 768px) 90vw, 400px"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdgI2o7fQ8QAAAABJRU5ErkJggg=="
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-slate-700 to-slate-800 flex items-center justify-center">
            <span className="text-white/50 text-2xl">No Cover Image</span>
          </div>
        )}
      </div>
      
      {title && (
        <div className="mt-6 px-4 py-2 bg-amber-100/90 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-slate-800 text-center">{title}</h2>
        </div>
      )}
    </div>
  )
}

export default BookCoverPage;