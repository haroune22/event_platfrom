import { fetchEvents } from "@/api/events"
import { PostCard } from "@/components/PostCard"
import type { Event } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"

const Events = () => {
  const [searchParams] = useSearchParams()

  const category = searchParams.get("category") ?? ""

  const {
    data: events,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["events", category],
    queryFn: () => fetchEvents(category),
    retry: false,
  })

  // console.log(events)

  if (isLoading) {
    return <div className="text-center text-xl font-medium">Loading...</div>
  }

  if (error) {
    return (
      <div className="text-center text-xl font-medium">
        Error fetching events
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="text-center text-xl font-medium">No events found</div>
    )
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto px-4">
      {events?.map((event: Event) => (
        <PostCard post={event} key={event.id} />
      ))}
    </div>
  )
}

export default Events
