import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wand2, Brain, Clock, Sparkles, BookOpen, Share2, Currency } from 'lucide-react'


//Feature types
interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

//array of feature objects
const features: Feature[] = [
  {
    title: "Powered By AI",
    description: "Transform your ideas into enchanting stories with our magical AI assistant.",
    icon: <Wand2 className="h-10 w-10 text-white" />,
  },
  {
    title: "Creative Stories",
    description: "Creative Stories and different image styles to spark your imagination.",
    icon: <Brain className="h-10 w-10 text-white" />,
  },
  {
    title: "Quick Creation",
    description: "Create beautiful stories in seconds, not minutes.",
    icon: <Clock className="h-10 w-10 text-white" />,
  },
  {
    title: "Story Library",
    description: "Access a growing collection of user-created stories for inspiration.",
    icon: <BookOpen className="h-10 w-10 text-white" />,
  },
  {
    title: "Easy Learning",
    description: "Learn vocabulary and pronunciation with family and friends.",
    icon: <Share2 className="h-10 w-10 text-white" />,
  },
  {
    title: "Optimal Pricing",
    description: "Our pricing is unmatched, offering the best value in the market.",
    icon: <Currency className="h-10 w-10 text-white" />,
  }
]

export function LandingFeatures() {
  return (
    <section className="py-4 lg:py-24 bg-[#000015] mt-24 md:mt-12 text-white mx-auto">
      <div className="">
        {/* Features Heading and subheading div*/}
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl text-center font-bold tracking-tighter sm:text-5xl">MAGICAL FEATURES</h2>
            <p className="max-w-[900px] py-4 text-center pytext-white md:text-xl/relaxed font-semibold lg:text-base/relaxed xl:text-xl/relaxed">
              Discover the enchanting capabilities 
              of our storytelling platform.
            </p>
          </div>
        </div>
        {/* Features Card */}
        <div className="mx-auto grid gap-6 py-6 max-sm:py-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-10 lg:px-20">
          {features.map((feature, index) => (
            <Card key={index} className="backdrop-blur-xl bg-gradient-to-b from-black/90 to-pink-400/80 border-2 transition-all hover:border-primary hover:shadow-md py-12 px-4 rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="text-white">{feature.icon}</div>
                <CardTitle className="text-white text-2xl font-bold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white text-lg text-center py-4 font-semibold">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
    )}