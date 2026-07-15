import CommunityCard from "@/components/CommunityCard"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus, Users } from "lucide-react"

const Communities = () => {
  return (
    <div className="h-90 rounded-3xl bg-[url('/communities.png')] bg-cover bg-right bg-no-repeat gap-4">
      <div className="flex h-full w-[70%] flex-col justify-center gap-6 px-12 lg:px-16">
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-gray-800" />
          <h1 className="text-4xl font-bold text-gray-900">Communities</h1>
        </div>

        <p className="max-w-lg text-lg leading-8 text-gray-700">
          Discover communities that match your interests. Join discussions,
          attend events and learn from people who share your passion.
        </p>

        <Button className="w-fit cursor-pointer hover:bg-gray-800 text-white bg-gray-900 px-6 py-6">
          <Plus className="mr-2 h-5 w-5" />
          Create Community
        </Button>
      </div>
      <div className="flex flex-col justify-center mt-10">
        <h2 className="text-xl font-medium">
          Your Communities:
        </h2>
        <CommunityCard/>
      </div>
    </div>
  )
}

export default Communities
