"use client";

import { PayPalButtons } from "@paypal/react-paypal-js";
import { useContext, useState } from "react";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { toast } from "react-hot-toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";


interface PricingOption {
  id: number;
  price: number;
  credits: number;
  planName: string;
}

const OPTIONS: PricingOption[] = [
  { id: 1, price: 3.99, credits: 3, planName: "Story Sprout" },
  { id: 2, price: 4.99, credits: 7, planName: "Tale Weaver"  },
  { id: 3, price: 8.99, credits: 12, planName: "Mythic Master"  },
  { id: 4, price: 9.99, credits: 16, planName: "Legendary Quill"  },
];

const getDescription = (credits: number): string => {
  if (credits <= 3) return "Ideal for Starters!";
  if (credits <= 7) return "Great for casual users";
  if (credits <= 12) return "Ideal for regular users";
  return "Best value for power users";
};

export default function BuyCredits() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const handlePaymentSuccess = async (orderID: string) => {
    if (!selectedOption) return;

    try {
      // ✅ Step 1: Verify PayPal Payment
      const verifyResponse = await fetch("/api/paypal/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderID }),
      });

      const verifyData = await verifyResponse.json();
      if (!verifyData.success) {
        toast.error(verifyData.message);
        return;
      }

      // ✅ Step 2: Update Coins in Database
      const updateResponse = await fetch("/api/update-coins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: userDetail.userEmail,
          creditsToAdd: OPTIONS[selectedOption - 1].credits,
        }),
        
      });

      const updateData = await updateResponse.json();
      if (updateData.success) {
        toast.success("Coins added successfully!");
        setUserDetail((prev: any) => ({
          ...prev,
          credit: prev.credit + OPTIONS[selectedOption - 1].credits,
        }));
      } else {
        toast.error(updateData.message);
      }
    } catch (error) {
      toast.error("Payment failed. Please try again!");
    }

    
  };

  return (
    <div className="min-h-screen px-4 max-w-7xl mx-auto py-4 text-white bg-transparent">
      <h2 className="text-3xl font-bold text-center py-8">Add More Coins</h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 rounded-xl py-10">
        {OPTIONS.map((option) => (
          <Card
            key={option.id}
            className={`py-8 lg:py-16 rounded-xl bg-gradient-to-b from-black/80 to-pink-400/60 hover:scale-105 text-white cursor-pointer ${
              selectedOption === option.id
                ? "bg-gradient-to-b from-black/10 to bg-black/20 border"
                : ""
            }`}
            onClick={() => setSelectedOption(option.id)}
          >
            <CardHeader>
                <h1 className="text-2xl font-bold pb-4">{option.planName}</h1>
              <h2 className="text-lg">
                Get {option.credits} Stories For {option.credits} Coins
              </h2>
              <h2 className="font-bold text-2xl">${option.price}</h2>
            </CardHeader>
            <CardContent>
              <p className="text-white capitalize">{getDescription(option.credits)}</p>
              {option.credits === 12 && (
                <p className="text-emerald-300 text-s font-medium mt-2 capitalize">
                  Best Seller
                </p>
              )}
              {option.id === 4 && (
                <p className="text-blue-400 font-medium text-s capitalize mt-2">
                Recommended
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedOption && (
        <div className="flex justify-center items-center w-full mx-auto py-12 ">
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={(_, actions) =>
              actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: OPTIONS[selectedOption - 1].price.toFixed(2),
                      currency_code: "USD",
                    },
                  },
                ],
                intent: "CAPTURE",
              })
            }
            onApprove={(data) => handlePaymentSuccess(data.orderID)}
            onCancel={() => toast.error("Payment canceled!")}
          />
        </div>
      )}
    </div>
  );
}
