import { fetchPosts } from "@/api/post"
import { PostCard } from "@/components/PostCard"
import type { Post } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"

const Home = () => {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
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
    <div className="">
      {posts?.map((post: Post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  )
}

export default Home
