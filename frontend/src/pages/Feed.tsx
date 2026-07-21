import { fetchFeedPosts } from "@/api/post"
import { PostCard } from "@/components/PostCard"
import type { Post } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"

const Feed = () => {
  const [searchParams] = useSearchParams()

  const category = searchParams.get("category") ?? ""

  const { data, isLoading, error } = useQuery({
    queryKey: ["feed_posts", category],
    queryFn: () => fetchFeedPosts(category),
    retry: false,
  })

  // console.log(data, isLoading, error)
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error fetching feed posts</div>
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto px-4">
      {data?.posts?.map((post: Post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  )
}

export default Feed
