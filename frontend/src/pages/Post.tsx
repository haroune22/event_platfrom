import { fetchPostById } from "@/api/post"
import Comments from "@/components/Comments"
import CreateComment from "@/components/CreateComment"
import { PostDetailsCard } from "@/components/PostDetailsCard"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useParams } from "react-router-dom"

const Post = () => {
  const { postId } = useParams()
  const [showComments, setShowComments] = useState(false)

  const {
    data: post,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["fetch-post-by-id", postId],
    queryFn: () => fetchPostById(postId!),
    enabled: !!postId,
    retry: false,
  })

  console.log(post)
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error fetching posts</div>
  }

  return (
    <div className="mx-auto flex min-h-full max-w-3xl flex-col items-center justify-center rounded-lg border border-gray-100 bg-white shadow-sm">
      <PostDetailsCard setShowComments={setShowComments} post={post} />
      {showComments && (
        <>
          <CreateComment postId={post.id} />
          <Comments postId={post.id} />
        </>
      )}
    </div>
  )
}

export default Post
