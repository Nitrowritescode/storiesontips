"use client"


import React, { useContext } from 'react';
import Image from 'next/image'
import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { Button } from '@nextui-org/button';
import Link from 'next/link';


export default function DashboardHeader() {
    // @ts-ignore
    const {userDetail,setUserDetail} =useContext(UserDetailContext);

    return(
    <div className='bg-primary text-white p-4 flex justify-between items-center mt-8'>
        <h2 className='font-bold text-xl lg:text-3xl md:text-2xl'>My Stories</h2>
        <div className='flex justify center items-center gap-1'>
            <span>{userDetail?.credit} coin(s) left</span>
            <Image src="/coin.webp" alt="coin credits image" width={30} height={30} />
           <Link href='/buy-credits'>
            <Button className='' color='secondary'>Buy More Coins</Button>
           </Link>
        </div>
    </div>
)
}