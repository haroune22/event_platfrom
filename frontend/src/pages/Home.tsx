import { fetchPosts } from "@/api/post"
import HomePagination from "@/components/HomePagination"
import { PostCard } from "@/components/PostCard"
import { HomeSidebar } from "@/components/HomeSidebar"
import type { Post } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"

const SUGGESTED_COMMUNITIES = [
  {
    id: "1",
    name: "technology",
    category: "tech",
    memberCount: 12500,
  },
  {
    id: "2",
    name: "gaming",
    category: "gaming",
    memberCount: 8300,
  },
  {
    id: "3",
    name: "fitness",
    category: "fitness",
    memberCount: 5600,
  },
]

const TRENDING_COMMUNITIES = [
  {
    id: "4",
    name: "Webdev",
    category: "technology",
    memberCount: 15200,
  },
  {
    id: "5",
    name: "Football",
    category: "Sports",
    memberCount: 9800,
  },
  {
    id: "6",
    name: "The Dragon Warrior",
    category: "Movies",
    memberCount: 7400,
  },
]

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

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error fetching posts</div>
  }

  return (
    <div className="flex gap-6 max-w-7xl mx-auto px-4">
      <div className="flex-1 max-w-3xl flex flex-col gap-4">
        {data.posts?.map((post: Post) => (
          <PostCard post={post} key={post.id} />
        ))}
        <HomePagination totalPages={data.totalPages} />
      </div>

      <HomeSidebar
        suggestedCommunities={SUGGESTED_COMMUNITIES}
        trendingCommunities={TRENDING_COMMUNITIES}
      />
    </div>
  )
}

export default Home