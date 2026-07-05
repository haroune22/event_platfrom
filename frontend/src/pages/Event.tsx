import { fetchEventById } from "@/api/events"
import Comments from "@/components/Comments"
import CreateComment from "@/components/CreateComment"
import { PostDetailsCard } from "@/components/PostDetailsCard"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useParams } from "react-router-dom"

const Event = () => {
  const { eventId } = useParams()
  const [showComments, setShowComments] = useState(false)

  const {
    data: event,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["fetch-event-by-id", eventId],
    queryFn: () => fetchEventById(eventId!),
    enabled: !!eventId,
    retry: false,
  })

  console.log(event)
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error fetching posts</div>
  }

  return (
    <div className="mx-auto flex min-h-full max-w-2xl flex-col items-center justify-center rounded-lg border border-gray-100 bg-white shadow-sm">
      <PostDetailsCard setShowComments={setShowComments} post={event} />
      {showComments && (
        <>
          <CreateComment postId={event.id} />
          <Comments postId={event.id} />
        </>
      )}
    </div>
  )
}

export default Event
