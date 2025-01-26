"use client"

import { db } from '@/config/db';
import { Users } from '@/config/schema';
import { PayPalButtons } from '@paypal/react-paypal-js';
import React, { useContext, useEffect, useState } from 'react';
import { UserDetailContext } from '../_context/UserDetailContext';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


export default function BuyCredits() {

    const Options = [
        {
            id: 1,
            price: 3.99,
            credits: 3
        },
        {
            id: 2,
            price: 4.99,
            credits: 7
        },
        {
            id: 3,
            price: 8.99,
            credits: 12
        },
        {
            id: 4,
            price: 9.99,
            credits: 16
        },

    ]
    
    const [selectedPrice,setSelectedPrice] = useState<number>(0)
    const [selectedOption,setSelectedOption] = useState<number>(0);
    const {userDetail,setUserDetail} = useContext(UserDetailContext);
    const router = useRouter();
    const notify = (msg:string) => toast(msg);
    const notifyError = (msg:string) => toast.error(msg);

    useEffect(()=>{
      if(selectedOption!=0) {
        const price=Options[selectedOption-1].price
        setSelectedPrice(price)
      }
    },[selectedOption])

    const OnPaymentSuccess=async()=>{
        const result = await db.update(Users)
        .set({
            credit:Options[selectedOption-1].credits+userDetail.credit
        }).where(eq(Users.userEmail,userDetail.userEmail));
        
        if(result) {
            notify("Coins are added!")
            setUserDetail((prev:any)=>({
                ...prev,
                ['credit']:Options[selectedOption-1].credits+userDetail.credit

            }))
        } else {
            notifyError('Server Error')
        }

        router.replace('/dashboard')
    }
     
    return (
        <div className='min-h-screen p-10 md:px-20 lg:px-40 text-primary'>
            <h2 className='text-3xl font-bold text-white'>Add More Coins</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-center'>
            <div>
                {/* @ts-ignore */}
                {Options.map((option,_index)=>(
                    <div key={option.id} className={`my-3 p-4 border text-center rounded-xl cursor-pointer hover:scale-105 
                        ${ selectedOption === option.id ? "bg-[#000000] !important" : "bg-blue-950"}`}
                    onClick={()=>setSelectedOption(option.id)}>
                        <h2 className='text-white'>Get {option.credits} Coins = {option.credits} stories</h2>
                        <h2 className='font-bold text-2xl text-white'>${option.price}</h2>
                    </div>
                ))}
            </div>

            <div>
            {selectedPrice>0&&<PayPalButtons style={{ layout: "vertical" }}
              disabled={!selectedOption||selectedOption == 0}
            //   @ts-ignore
              onApprove={()=>OnPaymentSuccess()}
              onCancel={()=>notifyError('Payment Failed. Please try again!')}
              // @ts-ignore
              createOrder={(_data,actions)=>{
                // @ts-ignore
                return actions.order.create({
                    purchase_units:[
                        {
                            // @ts-ignore
                            amount:{
                                value:selectedPrice.toFixed(2),
                                currency_code:"USD"
                            }
                        }
                    ]
                })
              }}
              />}
            </div>
        </div>
        

        </div>
    )
};