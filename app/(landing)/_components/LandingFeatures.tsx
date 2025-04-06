import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Wand2,
  Brain,
  Clock,
  Sparkles,
  BookOpen,
  Share2,
  Currency,
} from "lucide-react";
import Image from "next/image";

//Feature types
interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  url: string;
}

//array of feature objects
const features: Feature[] = [
  {
    id: 1,
    title: "Powered By AI",
    description:
      "Transform your ideas into enchanting stories with our magical AI assistant. Simply enter your idea or prompt, and our advanced AI will generate a personalized, engaging, and age-appropriate story. It saves time, fuels creativity, and ensures each story is unique, thoughtful, and tailored to young minds.",
    icon: <Wand2 className="h-10 w-10" />,
    url: "/landing/features/feature1.jpg",
  },
  {
    id: 2,
    title: "Creative Stories",
    description:
      "Enjoy a collection of creative stories in various genres, from fairytales to adventures, sci-fi, and moral tales. These stories are written to spark curiosity, encourage imagination, and help children explore new ideas and cultures in an entertaining way. Fresh content is added regularly to keep the magic alive.",
    icon: <Brain className="h-10 w-10" />,
    url: "/landing/features/feature2.webp",
  },
  {
    id: 3,
    title: "Quick Creation",
    description:
      "No more waiting around—our platform allows you to create an entire story within seconds. Whether it's bedtime or playtime, your child can have a new story generated in moments. Just choose a theme or enter a few words, and let the magic unfold instantly with stunning visuals.",
    icon: <Clock className="h-10 w-10" />,
    url: "/landing/features/feature3.webp",
  },
  {
    id: 4,
    title: "Story Library",
    description:
      "Browse a rich and ever-growing library of stories created by other users and our AI. Whether you're seeking inspiration, variety, or something specific, our library offers diverse options to fit any mood or occasion. You can even bookmark and re-read your favorite stories anytime, anywhere.",
    icon: <BookOpen className="h-10 w-10" />,
    url: "/landing/features/feature4.webp",
  },
  {
    id: 5,
    title: "Easy Learning For Kids",
    description:
      "Make learning fun and interactive for your children. Our stories are designed to teach vocabulary, sentence structure, and pronunciation naturally. Through repeated storytelling, visuals, and audio, kids can learn alongside family and friends in an enjoyable, engaging, and low-pressure environment perfect for early development.",
    icon: <Share2 className="h-10 w-10" />,
    url: "/landing/features/feature5.webp",
  },
  {
    id: 6,
    title: "Optimal Pricing",
    description:
      "We believe in quality storytelling at an affordable price. Our subscription plans offer flexible options that cater to individual users and families alike. Get access to premium features, unlimited story creation, and exclusive styles at a fraction of the cost of traditional storybooks or learning apps.",
    icon: <Currency className="h-10 w-10" />,
    url: "/landing/features/feature6.jpg",
  },
];

export function LandingFeatures() {
  return (
    <section className="py-4 lg:py-24 bg-[#000015] mt-24 md:mt-12 text-white mx-auto">
      <div className="">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl text-center font-passion font-extrabold tracking-tighter sm:text-5xl">
              MAGICAL FEATURES
            </h2>
            <p className="max-w-[900px] px-8 py-4 text-center text-white/50 md:text-xl/relaxed font-semibold lg:text-base/relaxed xl:text-xl/relaxed">
              Discover the enchanting capabilities of our storytelling platform.
            </p>
          </div>
        </div>
        {/* Features Card */}
        <div className="mx-auto grid gap-6 py-6 max-sm:py-2 grid-cols-1">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="max-w-7xl bg-gradient-to-br from-blue-500 via-purple-400 to-blue-600 p-4 lg:py-12 lg:px-auto rounded-xl flex flex-col lg:flex-row items-center justify-between text-center gap-4 lg:gap-2"
            >
              <div className="" key={index}>
                <Image
                  src={feature.url}
                  alt={feature.title}
                  width={300}
                  height={500}
                  className="mx-auto rounded-xl max-h-[400px]"
                />
              </div>
              <Card className="rounded-xl border-black/80 border-5 h-full flex-1">
                <CardHeader className="flex flex-row items-center justify-between lg:px-12 py-8 ">
                  <div className="lg:text-4xl">{feature.icon}</div>
                  <CardTitle className=" text-2xl lg:text-4xl font-bold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg text-center py-4 font-semibold text-black/80">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
