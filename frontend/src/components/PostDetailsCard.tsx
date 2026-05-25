import { fetchCommunityById } from "@/api/community"
import type { PostDetails } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"

type PostDetailsCardProps = {
  post: PostDetails
}

export const PostDetailsCard = ({ post }: PostDetailsCardProps) => {
  const {
    data: community,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["fetch-post-by-id", post.communityId],
    queryFn: () => fetchCommunityById(post.communityId),
    retry: false,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error fetching posts</div>
  }

  console.log(community)
  console.log(post)

  return (
    <div className="flex h-full w-full flex-col justify-center gap-2 p-4">
      <div className="">
        <h2 className="text-lg font-semibold">{post.title}</h2>
      </div>
      <div>post details</div>
      <div>like & icons</div>
    </div>
  )
}
