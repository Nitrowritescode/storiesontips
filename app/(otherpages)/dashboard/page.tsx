import DashboardHeader from "./_components/DashboardHeader"
import UserStoryList from "./_components/UserStoryList"

export const metadata = {
  title: "User Dashboard",
  description: "View and manage your AI-generated stories on the user dashboard.",
}

export default function Dashboard() {
  return (
    <div className="min-h-screen container mx-auto px-4 py-8 space-y-6">
      <div className="relative py-4 mb-10">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-pink-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl" />

        {/* Title content */}
        <div className="relative text-center space-y-3">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 pb-4">
            Your Story Universe
          </h1>
          <p className="text-purple-200/80 text-lg max-w-xl mx-auto">
            Explore your collection of magical stories created with AI
          </p>
          <div className="flex justify-center pt-2">
            <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
          </div>
        </div>
      </div>

      <DashboardHeader />
      <UserStoryList />
    </div>
  )
}
