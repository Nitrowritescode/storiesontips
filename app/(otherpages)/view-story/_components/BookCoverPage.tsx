"use client"

import React from 'react'
import Image from 'next/image'


function BookCoverPage({imageUrl}:any) {
  return (
    <div className=''>
      <Image src={imageUrl} alt='cover' width={380} height={380}/>
    </div>
  )
}

export default BookCoverPage;

