"use client"

import React from 'react'
import Image from 'next/image'


function BookCoverPage({imageUrl}:any) {
  return (
    <div>
      <Image src={imageUrl} alt='cover' width={400} height={400}/>
    </div>
  )
}

export default BookCoverPage;

