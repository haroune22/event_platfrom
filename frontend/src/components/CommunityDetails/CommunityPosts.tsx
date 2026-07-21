import { useOutletContext, useSearchParams } from "react-router-dom"
import HomePagination from "../HomePagination"
import { PostCard } from "../PostCard"
import type { Post, userCommunitiesType } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"
import { fetchCommunityPosts } from "@/api/community"
import { useState } from "react"
import CreatePostDialog from "../CreatePostDialog"
import { Button } from "../ui/button"
import { ImageIcon, Plus, Loader } from "lucide-react"

type CommunityContext = {
  community: userCommunitiesType
  currentUserRole: string | null
}

const CommunityPosts = () => {
  const [searchParams] = useSearchParams()
  const [openDialog, setOpenDialog] = useState(false)

  const { community, currentUserRole } = useOutletContext<CommunityContext>()

  const page = Number(searchParams.get("page")) || 1

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", community.id, page],
    queryFn: () => fetchCommunityPosts(community.id, page),
    retry: false,
  })

  if (isLoading) {
    return (
      <div className="flex max-w-3xl flex-1 flex-col gap-4">
        <div className="flex items-center justify-center py-12">
          <Loader className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex max-w-3xl flex-1 flex-col gap-4">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="mb-2 font-semibold text-red-900">
            Failed to load posts
          </p>
          <p className="mb-4 text-sm text-red-700">
            Something went wrong. Please try refreshing the page.
          </p>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="border-red-300 text-red-600 hover:bg-red-100"
          >
            Refresh
          </Button>
        </div>
      </div>
    )
  }

  const hasNoPosts = !data?.posts || data.posts.length === 0

  return (
    <>
      <div className="flex mx-auto max-w-4xl flex-1 flex-col gap-4">
        {(currentUserRole === "member" || currentUserRole === "owner") && (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:shadow-md">
            <div className="border-b border-gray-100 px-6 py-4">
              <h2 className="text-lg font-bold text-gray-900">
                Share with the community
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Ask a question, share an update or start a discussion.
              </p>
            </div>

            <div className="space-y-4 px-6 py-4">
              <button
                onClick={() => setOpenDialog(true)}
                className="flex w-full items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-600 transition duration-200 hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="text-sm font-medium">
                  What's on your mind....................
                </span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => setOpenDialog(true)}
                  className="group flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 transition duration-200 hover:bg-gray-50"
                >
                  <ImageIcon className="h-5 w-5 text-blue-600 transition group-hover:scale-110" />
                  Photo
                </button>

                <button
                  onClick={() => setOpenDialog(true)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-blue-700"
                >
                  <Plus className="h-5 w-5" />
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {hasNoPosts ? (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
            <div className="mb-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <ImageIcon className="h-6 w-6 text-gray-400" />
              </div>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
             This community hasn't shared anything yet.
            </h3>
            <p className="mb-6 text-gray-600">
              Be the first to share something with this community!
            </p>
            {(currentUserRole === "member" || currentUserRole === "owner") && (
              <Button
                onClick={() => setOpenDialog(true)}
                className="rounded-lg"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create the first post
              </Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4 max-w-4xl">
            {data.posts?.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {!hasNoPosts && data.totalPages > 1 && (
          <HomePagination totalPages={data.totalPages} />
        )}
      </div>

      <CreatePostDialog
        openDialog={openDialog}
        onOpenChange={setOpenDialog}
        communityId={community.id}
      />
    </>
  )
}

export default CommunityPosts
