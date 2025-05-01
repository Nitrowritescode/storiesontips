"use client";

import { PayPalButtons } from "@paypal/react-paypal-js";
import { useContext, useState } from "react";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { toast } from "react-hot-toast";
import { CheckCircle, Award, Crown, Sparkles, Check, Coins } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PricingOption {
  id: number;
  price: number;
  credits: number;
  planName: string;
  icon: React.ReactNode;
  features: string[];
  highlight?: string;
}

const OPTIONS: PricingOption[] = [
  { 
    id: 1, 
    price: 3.99, 
    credits: 3, 
    planName: "Story Sprout",
    icon: <Sparkles className="w-8 h-8 text-blue-400" />,
    features: [
      "3 unique AI stories",
      "Perfect for beginners",
      "Standard quality output"
    ]
  },
  { 
    id: 2, 
    price: 4.99, 
    credits: 7, 
    planName: "Tale Weaver",
    icon: <CheckCircle className="w-8 h-8 text-green-400" />,
    features: [
      "7 unique AI stories",
      "Great for casual users",
      "Premium quality output"
    ]
  },
  { 
    id: 3, 
    price: 8.99, 
    credits: 12, 
    planName: "Mythic Master",
    icon: <Award className="w-8 h-8 text-yellow-400" />,
    features: [
      "12 unique AI stories",
      "Ideal for regular users",
      "Priority generation"
    ],
    highlight: "BEST SELLER"
  },
  { 
    id: 4, 
    price: 9.99, 
    credits: 16, 
    planName: "Legendary Quill",
    icon: <Crown className="w-8 h-8 text-purple-400" />,
    features: [
      "16 unique AI stories",
      "Best value for power users",
      "Priority support"
    ],
    highlight: "RECOMMENDED"
  },
];

export default function BuyCredits() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [billingCycle, setBillingCycle] = useState("onetime");

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
        setPaymentOpen(false);
      } else {
        toast.error(updateData.message);
      }
    } catch (error) {
      toast.error("Payment failed. Please try again!");
    }
  };

  const selectPlan = (id: number) => {
    setSelectedOption(id);
    setPaymentOpen(true);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-3 rounded-full bg-indigo-500/10 text-indigo-400 font-medium text-sm">
            <Coins className="w-4 h-4 mr-2" /> Unlock Your Creative Potential
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 pb-2">
            Power Up Your Experience
          </h1>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Choose the perfect plan to unleash your creativity with our AI-powered storytelling and language learning platform
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <Tabs 
            value={billingCycle} 
            onValueChange={setBillingCycle}
            className="w-full max-w-sm bg-slate-900/50 p-1 rounded-full border border-slate-800"
          >
            <TabsList className="grid grid-cols-2 w-full rounded-full bg-slate-800/50 p-1">
              <TabsTrigger 
                value="onetime" 
                className="rounded-full data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
              >
                One-time Purchase
              </TabsTrigger>
              <TabsTrigger 
                value="subscription" 
                className="rounded-full data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                disabled
              >
                Subscription (Soon)
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Current Credits Display */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700">
            <span className="text-slate-400 mr-2">Current Balance:</span>
            <span className="font-bold text-white flex items-center">
              <Coins className="w-4 h-4 mr-1 text-yellow-400" />
              {userDetail?.credit || 0} Coins
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {OPTIONS.map((option) => (
            <Card
              key={option.id}
              className={`relative overflow-hidden transition-all duration-300 backdrop-blur-sm hover:shadow-xl cursor-pointer rounded-xl border ${
                option.highlight ? 'bg-gradient-to-b from-slate-900/70 to-indigo-950/30 border-indigo-500/50' : 'bg-slate-900/40 border-slate-800/50 hover:border-slate-700'
              }`}
            >
              {option.highlight && (
                <div className="absolute top-0 left-0 right-0 py-1.5 text-xs font-bold text-center bg-indigo-600 text-white">
                  {option.highlight}
                </div>
              )}
              
              <CardHeader className={`${option.highlight ? 'pt-10' : 'pt-6'} text-center`}>
                <div className="mx-auto mb-3 w-12 h-12 flex items-center justify-center rounded-full bg-indigo-950/50 border border-indigo-800/50">
                  {option.icon}
                </div>
                <CardTitle className="text-xl font-bold text-white">{option.planName}</CardTitle>
                <CardDescription className="text-slate-400">
                  {option.credits} AI-generated stories
                </CardDescription>
              </CardHeader>

              <CardContent className="text-center">
                <div className="flex items-center justify-center mb-5">
                  <span className="text-3xl font-bold text-white">${option.price}</span>
                </div>
                
                <Separator className="my-4 bg-slate-800" />
                
                <ul className="space-y-3 text-sm text-left mt-4">
                  {option.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 mr-2 text-indigo-400 shrink-0 mt-0.5" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pb-6">
                <Button 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
                  variant="default"
                  onClick={() => selectPlan(option.id)}
                >
                  Select Plan
                </Button>
              </CardFooter>
              
              {/* Visual hint for best value */}
              {option.highlight === "RECOMMENDED" && (
                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
              )}
            </Card>
          ))}
        </div>

        {/* Customer Testimonials */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/40 backdrop-blur-sm p-6 rounded-xl border border-slate-800/50">
            <div className="flex space-x-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>
            <p className="text-slate-300 mb-4">"The Mythic Master plan was perfect for my needs. I created amazing stories for my students in minutes!"</p>
            <p className="text-slate-400 text-sm">- Sarah Williams, Student</p>
          </div>
          
          <div className="bg-slate-900/40 backdrop-blur-sm p-6 rounded-xl border border-slate-800/50">
            <div className="flex space-x-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>
            <p className="text-slate-300 mb-4">"Legendary Quill helped me generate content for my blog. Best investment for a content creator."</p>
            <p className="text-slate-400 text-sm">- Ramesh Sharma, Teacher</p>
          </div>
          
          <div className="bg-slate-900/40 backdrop-blur-sm p-6 rounded-xl border border-slate-800/50">
            <div className="flex space-x-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>
            <p className="text-slate-300 mb-4">"Started with Story Sprout and quickly upgraded to Tale Weaver. The quality is outstanding!"</p>
            <p className="text-slate-400 text-sm">- James Lawerence, Author</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-white">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/40 backdrop-blur-sm p-6 rounded-xl border border-slate-800/50">
              <h3 className="font-bold text-white mb-2">How do coins work?</h3>
              <p className="text-slate-400">Each coin allows you to generate one unique AI story. Your coins never expire and can be used anytime.</p>
            </div>
            <div className="bg-slate-900/40 backdrop-blur-sm p-6 rounded-xl border border-slate-800/50">
              <h3 className="font-bold text-white mb-2">Can I get a refund?</h3>
              <p className="text-slate-400">Due to the digital nature of our product, we cannot offer refunds for purchased coins once they are added to your account.</p>
            </div>
            <div className="bg-slate-900/40 backdrop-blur-sm p-6 rounded-xl border border-slate-800/50">
              <h3 className="font-bold text-white mb-2">Is there a subscription option?</h3>
              <p className="text-slate-400">We're currently working on subscription plans that will offer even better value. Stay tuned!</p>
            </div>
            <div className="bg-slate-900/40 backdrop-blur-sm p-6 rounded-xl border border-slate-800/50">
              <h3 className="font-bold text-white mb-2">Which payment methods do you accept?</h3>
              <p className="text-slate-400">We currently accept all payment methods supported by PayPal, including credit cards and PayPal balance.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={paymentOpen && selectedOption !== null} onOpenChange={setPaymentOpen}>
        <DialogContent className="sm:max-w-md bg-slate-900 border-slate-800 text-white rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Complete Your Purchase</DialogTitle>
            <DialogDescription className="text-slate-400">
              You're just one step away from unlocking amazing AI stories
            </DialogDescription>
          </DialogHeader>
          
          {selectedOption && (
            <div className="space-y-6">
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="mr-3 p-2 rounded-full bg-indigo-900/50">
                      {OPTIONS[selectedOption - 1].icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{OPTIONS[selectedOption - 1].planName}</h3>
                      <p className="text-sm text-slate-400">{OPTIONS[selectedOption - 1].credits} Coins</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-indigo-400 border-indigo-900 bg-indigo-950/50">
                    One-time
                  </Badge>
                </div>
                
                <Separator className="my-4 bg-slate-700" />
                
                <div className="flex justify-between items-center text-sm text-slate-400">
                  <span>Subtotal</span>
                  <span>${OPTIONS[selectedOption - 1].price.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center mt-2 text-sm text-slate-400">
                  <span>Processing fee</span>
                  <span>$0.00</span>
                </div>
                
                <Separator className="my-4 bg-slate-700" />
                
                <div className="flex justify-between items-center font-bold text-white">
                  <span>Total</span>
                  <span>${OPTIONS[selectedOption - 1].price.toFixed(2)}</span>
                </div>
              </div>
              
              
              <Alert className="bg-indigo-950/30 border border-indigo-900/50 text-indigo-300">
                <AlertDescription className="text-sm">
                  Your coins will be added to your account immediately after payment is confirmed
                </AlertDescription>
              </Alert>
              
              <div className="pt-2 overflow-y-auto max-h-[40vh]">
                <p className="text-sm text-slate-400 mb-4 text-center">Secure payment via PayPal</p>
                <PayPalButtons
                  style={{ 
                    layout: "vertical",
                    color: "blue",
                    shape: "pill",
                    label: "pay"
                  }}
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
                  onCancel={() => {
                    toast.error("Payment canceled!");
                    setPaymentOpen(false);
                  }}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}