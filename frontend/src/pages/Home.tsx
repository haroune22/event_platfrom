import { fetchPosts } from "@/api/post"
import { PostCard } from "@/components/PostCard"
import type { Post } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"

const Home = () => {
  const [searchParams] = useSearchParams()

  const category = searchParams.get("category") ?? ""
  const title = searchParams.get("title") ?? ""

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", category, title],
    queryFn: () => fetchPosts(category, title),
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

export default Home
