import { fetchCommunities, fetchUserCommunities } from "@/api/community"
import CommunityCard from "@/components/CommunityCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useQuery } from "@tanstack/react-query"
import { Plus, Users } from "lucide-react"

const Communities = () => {
  const {
    data: userCommunities,
    isLoading: loadingUserCommunities,
    error: userCommunitiesError,
  } = useQuery({
    queryKey: ["fetch_user_communities"],
    queryFn: fetchUserCommunities,
  })

  const {
    data: communities,
    isLoading: loadingCommunities,
    error: communitiesError,
  } = useQuery({
    queryKey: ["communities"],
    queryFn: fetchCommunities,
  })

  console.log(userCommunities, communities)

  if (loadingUserCommunities || loadingCommunities) {
    return <div>Loading...</div>
  }

  if (userCommunitiesError || communitiesError) {
    return <div>Something went wrong.</div>
  }

  return (
    <div className="h-90 gap-4 rounded-3xl bg-[url('/communities.png')] bg-cover bg-right bg-no-repeat">
      <div className="flex h-full w-[70%] flex-col justify-center gap-6 px-12 lg:px-16">
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-gray-800" />
          <h1 className="text-4xl font-bold text-gray-900">Communities</h1>
        </div>

        <p className="max-w-lg text-lg leading-8 text-gray-700">
          Discover communities that match your interests. Join discussions,
          attend events and learn from people who share your passion.
        </p>

        <Button className="w-fit cursor-pointer bg-gray-900 px-6 py-6 text-white hover:bg-gray-800">
          <Plus className="mr-2 h-5 w-5" />
          Create Community
        </Button>
      </div>
      <div className="my-10 flex flex-col justify-center">
        <h2 className="text-xl font-medium">Your Communities:</h2>
        <CommunityCard communities={userCommunities} />
      </div>
      <Separator className="bg-gray-900" />
      <div>
        <h2 className="mt-4 gap-4 py-4 text-xl font-medium">
          Discover Communities:
        </h2>
        <Input
          placeholder="Search..."
          className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-500 outline-none"
        />
        <CommunityCard communities={communities} />
      </div>
    </div>
  )
}

export default Communities
