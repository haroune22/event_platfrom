import { fetchCommunities, fetchUserCommunities } from "@/api/community"
import CommunityCard from "@/components/CommunityCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { Plus, Search, Users } from "lucide-react"
import { useState } from "react"

const Communities = () => {
  const [name, setName] = useState("")

  const {
    data: userCommunities,
    isLoading: loadingUserCommunities,
    error: userCommunitiesError,
  } = useQuery({
    queryKey: ["user-communities"],
    queryFn: fetchUserCommunities,
    placeholderData: keepPreviousData,
  })

  const {
    data: communities,
    isLoading: loadingCommunities,
    error: communitiesError,
    isFetching: fetchingCommunities,
  } = useQuery({
    queryKey: ["communities", name],
    queryFn: () => fetchCommunities(name),
    placeholderData: keepPreviousData,
  })

  if (loadingUserCommunities || loadingCommunities) {
    return (
      <div className="flex h-96 items-center justify-center">
        Loading communities...
      </div>
    )
  }

  if (userCommunitiesError || communitiesError) {
    return (
      <div className="flex h-96 items-center justify-center text-red-500">
        Something went wrong.
      </div>
    )
  }

  const handleName = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>
  ) => {
    e.preventDefault()
    setTimeout(() => {
      setName(e.target.value.trim())
    }, 400)
  }

  return (
    <div className="space-y-12 pb-10">
      <section className="overflow-hidden rounded-3xl bg-[url('/communities.png')] bg-cover bg-right bg-no-repeat">
        <div className="flex h-90 w-[70%] flex-col justify-center gap-6 px-10 lg:px-16">
          <div className="flex items-center gap-3">
            <Users className="h-9 w-9 text-gray-800" />

            <h1 className="text-5xl font-bold tracking-tight text-gray-900">
              Communities
            </h1>
          </div>

          <p className="max-w-lg text-lg leading-8 text-gray-700">
            Discover communities that match your interests, attend events, learn
            new skills and meet people who share the same passion.
          </p>

          <Button className="w-fit rounded-xl bg-gray-900 px-7 py-6 text-base text-white hover:bg-gray-800">
            <Plus className="mr-2 h-5 w-5" />
            Create Community
          </Button>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Your Communities
            </h2>

            <p className="mt-1 text-gray-500">
              Communities you've created or joined.
            </p>
          </div>
        </div>

        {userCommunities.length > 0 ? (
          <CommunityCard communities={userCommunities} />
        ) : (
          <div className="flex h-40 text-xl font-normal items-center justify-center rounded-2xl border border-dashed text-gray-700">
            Create or join a community
          </div>
        )}
      </section>

      <Separator />

      <section className="space-y-6 min-h-125">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Discover Communities
            </h2>

            <p className="mt-1 text-gray-500">
              Explore communities based on your interests.
            </p>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <Input
              onChange={(e) => handleName(e)}
              placeholder="Search communities..."
              className="h-12 rounded-full pl-12"
            />
          </div>
        </div>
        {fetchingCommunities && (
          <p className="text-sm text-gray-500">Searching...</p>
        )}
        {communities.length > 0 ? (
          <CommunityCard communities={communities} />
        ) : (
          <div className="flex h-60 items-center justify-center rounded-2xl border border-dashed text-gray-500">
            No communities found.
          </div>
        )}
      </section>
    </div>
  )
}

export default Communities
