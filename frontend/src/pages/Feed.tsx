import { fetchFeedPosts } from "@/api/post"
import { PostCard } from "@/components/PostCard"
import type { Post } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"

const Feed = () => {
  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["feed_posts"],
    queryFn: fetchFeedPosts,
    retry: false,
  })

  console.log(data, isLoading, error)
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error fetching feed posts</div>
  }

  return (
    <div className="">
      {data?.posts?.map((post: Post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  )
}

export default Feed
