import { getSavedPosts } from "@/api/post"
import { PostCard } from "@/components/PostCard"
import type { Post } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"

const SavedPosts = () => {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["saved_posts"],
    queryFn: getSavedPosts,
    retry: false,
  })

  // console.log(posts)
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error fetching posts</div>
  }

  return (
    <div>
      {posts?.map((post: Post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  )
}

export default SavedPosts
