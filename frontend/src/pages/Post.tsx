import { fetchPostById } from "@/api/post"
import { PostDetailsCard } from "@/components/PostDetailsCard"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

const Post = () => {
  const { postId } = useParams()

  const {
    data: post,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["fetch-post-by-id", postId],
    queryFn: () => fetchPostById(postId!),
    retry: false,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error fetching posts</div>
  }
  return (
    <div className="mx-auto flex min-h-full max-w-4xl rounded-lg border border-gray-100 bg-white shadow-sm">
      <PostDetailsCard post={post} />
    </div>
  )
}

export default Post
