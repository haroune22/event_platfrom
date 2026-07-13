import { fetchPosts } from "@/api/post"
import HomePagination from "@/components/HomePagination"
import { PostCard } from "@/components/PostCard"
import type { Post } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"

const Home = () => {
  const [searchParams] = useSearchParams()

  const category = searchParams.get("category") ?? ""
  const title = searchParams.get("title") ?? ""
  const page = Number(searchParams.get("page")) || 1

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", category, title, page],
    queryFn: () => fetchPosts(category, title, page),
    retry: false,
  })

  console.log(data)
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error fetching posts</div>
  }

  return (
    <div className="flex flex-col gap-4">
      {data.posts?.map((post: Post) => (
        <PostCard post={post} key={post.id} />
      ))}
      <HomePagination totalPages={data.totalPages} />
    </div>
  )
}

export default Home
