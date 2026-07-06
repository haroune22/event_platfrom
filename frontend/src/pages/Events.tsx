import { fetchEvents } from "@/api/events"
import { PostCard } from "@/components/PostCard"
import type { Event } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"

const Events = () => {
  const {
    data: events,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    retry: false,
  })

  console.log(events)
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error fetching feed posts</div>
  }

  return (
    <div>
      {events?.map((event: Event) => (
        <PostCard post={event} key={event.id} />
      ))}
    </div>
  )
}

export default Events
