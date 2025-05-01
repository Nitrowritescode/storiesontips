"use client"

import { useContext } from "react"
import Image from "next/image"
import { UserDetailContext } from "@/app/_context/UserDetailContext"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Coins } from "lucide-react"

export default function DashboardHeader() {
  // @ts-ignore
  const { userDetail, setUserDetail } = useContext(UserDetailContext)
  const router = useRouter()

  return (
    <Card className="bg-gradient-to-r  from-pink-600/20 via-indigo-800 to-purple-600/20 border-none">
      <CardContent className="p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="space-y-2">
          <h2 className="font-bold text-2xl md:text-3xl text-white/90">My Stories</h2>
          <div className="flex items-center gap-2 text-white/90">
            <Coins className="h-5 w-5" />
            <span className="font-medium">{userDetail?.credit} coins left</span>
            {userDetail?.credit > 0 && (
                <Image src="/coin.webp" alt="coin credits" width={20} height={20} className="ml-1" />
            )}
          </div>
        </div>

        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md transition-all"
          onClick={() => router.push("/buy-credits")}
        >
          Buy More Coins
        </Button>
      </CardContent>
    </Card>
  )
}
