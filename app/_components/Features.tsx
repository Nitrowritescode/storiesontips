import { Card, CardBody } from "./Card"
import { Wand2, Brain, Clock, Sparkles, BookOpen, Share2 } from "lucide-react"

export default function Features() {
  return (
    <div className="w-full py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Magical Features</h2>
          <p className="text-purple-200 text-lg max-w-2xl mx-auto">
            Discover the enchanting tools that make storytelling a breeze
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-white/10 border-none shadow-xl backdrop-blur-sm">
            <CardBody className="p-6">
              <div className="rounded-full bg-purple-500/20 w-12 h-12 flex items-center justify-center mb-4">
                <Wand2 className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Creation</h3>
              <p className="text-purple-200">
                Transform your ideas into enchanting stories with our magical AI assistant
              </p>
            </CardBody>
          </Card>

          <Card className="bg-white/10 border-none shadow-xl backdrop-blur-sm">
            <CardBody className="p-6">
              <div className="rounded-full bg-purple-500/20 w-12 h-12 flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Creative Stories</h3>
              <p className="text-purple-200">Creative Stories and different image styles to spark your imagination</p>
            </CardBody>
          </Card>

          <Card className="bg-white/10 border-none shadow-xl backdrop-blur-sm">
            <CardBody className="p-6">
              <div className="rounded-full bg-purple-500/20 w-12 h-12 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Quick Creation</h3>
              <p className="text-purple-200">Create beautiful stories in seconds, not minutes</p>
            </CardBody>
          </Card>

          <Card className="bg-white/10 border-none shadow-xl backdrop-blur-sm">
            <CardBody className="p-6">
              <div className="rounded-full bg-purple-500/20 w-12 h-12 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Magical Elements</h3>
              <p className="text-purple-200">Add majestic image styles and magical plot twists to your stories</p>
            </CardBody>
          </Card>

          <Card className="bg-white/10 border-none shadow-xl backdrop-blur-sm">
            <CardBody className="p-6">
              <div className="rounded-full bg-purple-500/20 w-12 h-12 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Story Library</h3>
              <p className="text-purple-200">Access a growing collection of user-created stories for inspiration</p>
            </CardBody>
          </Card>

          <Card className="bg-white/10 border-none shadow-xl backdrop-blur-sm">
            <CardBody className="p-6">
              <div className="rounded-full bg-purple-500/20 w-12 h-12 flex items-center justify-center mb-4">
                <Share2 className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Easy Learning</h3>
              <p className="text-purple-200">Learn vocabulary and pronunciation with family and friends</p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

