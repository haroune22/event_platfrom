import { fetchEvents } from "@/api/events"
import { PostCard } from "@/components/PostCard"
import type { Post } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"

const Event = () => {
  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["feed_posts"],
    queryFn: fetchEvents,
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
      {data?.map((post: Post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  )
}

export default Event
