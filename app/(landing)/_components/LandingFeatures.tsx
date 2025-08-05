import React from "react";
import { Wand2, Palette, BookOpen, Zap, Users, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeaturesSection: React.FC = () => {
  const features: Feature[] = [
    {
      icon: <Wand2 className="w-8 h-8" />,
      title: "AI-Powered Creation",
      description:
        "Generate stunning stories with advanced AI technology that understands your creative vision and brings it to life.",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Multiple Art Styles",
      description:
        "Choose from pixel art, watercolor, paper cut, 3D cartoon, and many more artistic styles for your stories.",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Interactive Storytelling",
      description:
        "Create engaging, interactive narratives that captivate readers and provide immersive experiences.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description:
        "Generate complete stories in seconds with our optimized AI engine and real-time rendering capabilities.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaborative Editing",
      description:
        "Work together with team members, share ideas, and create stories collaboratively in real-time.",
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Export Anywhere",
      description:
        "Download your stories in multiple formats including PDF, EPUB, or share directly to social media.",
    },
  ];

  return (
    <section className="w-full bg-black py-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-16 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
            <span className="text-sm text-white/80 font-medium">
              ✨ Powerful Features
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter leading-none mb-6">
            Everything You Need to <span>Create Stories</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/60 leading-relaxed font-light">
            Comprehensive tools and features built with
            <br />
            <span className="text-white/80">
              storytelling, creativity, and innovation in mind.
            </span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group"
            >
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-white/10 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-blue-400">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty div for your grid section */}
        <div className="mt-20">{/* Add your grid section here */}</div>
      </div>
    </section>
  );
};

export default FeaturesSection;
