"use client"


import React, { useContext } from 'react';
import Image from 'next/image'
import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function DashboardHeader() {
    // @ts-ignore
    const {userDetail,setUserDetail} =useContext(UserDetailContext);
    const router = useRouter();

    return(
    <div className='bg-gradient-to-b from-black/20 to-pink-400/80 text-white p-4 flex justify-between items-center mt-8'>
        <div>

        <h2 className='font-bold text-xl lg:text-3xl md:text-2xl'>My Stories</h2>
            <div className='flex justify-center items-center gap-1'>

            <span>{userDetail?.credit} coins left</span>
            <Image src="/coin.webp" alt="coin credits image" width={20} height={20} />
            </div>
        </div>

        <div className='flex justify center items-center gap-1'>
           <Link href='/buy-credits' passHref>
            <Button className='bg-blue-600 text-white rounded-lg' type='button' onPress={() => router.push('/buy-credits')}>Buy More Coins</Button>
           </Link>
        </div>
    </div>
)
}