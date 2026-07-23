import { fetchCommunityById } from "@/api/community"
import CommunityHeader from "@/components/CommunityDetails/CommunityHeader"
import CommunityNavbar from "@/components/CommunityDetails/CommunityNavbar"
import { useQuery } from "@tanstack/react-query"
import { Outlet, useParams } from "react-router-dom"

const Community = () => {
  const { id } = useParams()

  const { data, error, isLoading } = useQuery({
    queryKey: ["fetch-community-by-id", id],
    queryFn: () => fetchCommunityById(id!),
    enabled: !!id,
    retry: false,
  })

  // console.log(data)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error fetching community</div>
  }

  return (
    <div className="space-y-8">
      <CommunityHeader
        community={data.community}
        role={data.currentUserRole}
        memberCount={data.memberCount}
        currentUserRole={data.currentUserRole}
        isMember={data.isMember}
      />
      <CommunityNavbar />
      <Outlet
        context={{
          community: data.community,
          currentUserRole: data.currentUserRole,
          memberCount: data.memberCount,
          isMember: data.isMember,
        }}
      />
    </div>
  )
}

export default Community
