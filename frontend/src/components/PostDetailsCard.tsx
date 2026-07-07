import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { Link } from "react-router-dom"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { MoreVertical, Pencil } from "lucide-react"

import type { PostDetails } from "@/lib/types"
import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react"
import { fetchCommunityById } from "@/api/community"
import { Button } from "./ui/button"
import CreatePostDialog from "./CreatePostDialog"
import { useAuth } from "@/hooks/useAuth"
import DeletePostDialog from "./DeletePostDialog"

type PostDetailsCardProps = {
  post: PostDetails
  setShowComments: React.Dispatch<React.SetStateAction<boolean>>
}

export const PostDetailsCard = ({
  post,
  setShowComments,
}: PostDetailsCardProps) => {
  const { user } = useAuth()

  // console.log(post)
  
  const [isLiked, setIsLiked] = useState(false)
  const [openUpdatePost, setOpenUpdatePost] = useState(false)
  const {
    data: community,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["community", post.communityId],
    queryFn: () => fetchCommunityById(post?.communityId),
    enabled: !!post.communityId,
    retry: false,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error fetching posts</div>
  }

  return (
    <>
      <div className="flex h-full w-full flex-col justify-center gap-2 p-4">
        <div className="flex w-full items-center gap-4">
          {post.profilePic ? (
            <img
              src={post.profilePic}
              alt={`${post.creatorName} logo`}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 font-medium text-gray-700">
              {post.creatorName?.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex flex-1 flex-col gap-1">
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-500">
              Posted by {post.creatorName || "anonymous"}
              {community && (
                <>
                  <span>•</span>

                  <Link
                    to={`/community/${community.id}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {community.name}
                  </Link>
                </>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base text-gray-400">
              {format(new Date(post.createdAt), "MMM dd, yyyy")}
            </span>
            <span
              className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                post.type === "event"
                  ? "bg-orange-100 text-orange-700"
                  : post.type === "education"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
              }`}
            >
              {post.type === "event" && "📅 Event"}
              {post.type === "education" && "📚 Education"}
              {post.type === "normal" && "💬 Discussion"}
            </span>

            {user?.id === post.userId && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="bg-white" align="end">
                  <DropdownMenuItem onClick={() => setOpenUpdatePost(true)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DeletePostDialog post={post} />
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <p className="text-base">{post.content}</p>
          {post.type === "event" && (
            <div className="grid gap-3 rounded-xl border border-orange-200 bg-orange-50 p-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold tracking-wide text-orange-600 uppercase">
                  📅 Scheduled Date
                </p>
                <p className="mt-1 text-sm font-medium text-gray-800">
                  {post.eventDate
                    ? format(new Date(post.eventDate), "PPP 'at' p")
                    : "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold tracking-wide text-orange-600 uppercase">
                  👥 Max Participants
                </p>
                <p className="mt-1 text-sm font-medium text-gray-800">
                  {post.maxParticipants ?? "Unlimited"}
                </p>
              </div>
            </div>
          )}

          {post.type === "education" && (
            <div className="grid gap-3 rounded-xl border border-green-200 bg-green-50 p-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold tracking-wide text-green-600 uppercase">
                  🎯 Level
                </p>
                <p className="mt-1 text-sm font-medium text-gray-800 capitalize">
                  {post.difficulty ?? "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold tracking-wide text-green-600 uppercase">
                  🔗 Resources
                </p>

                {post.externalLink ? (
                  <a
                    href={post?.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block truncate text-sm font-medium text-blue-600 hover:underline"
                  >
                    Open Resource
                  </a>
                ) : (
                  <p className="mt-1 text-sm text-gray-500">
                    No resources provided.
                  </p>
                )}
              </div>
            </div>
          )}
          {post.media && (
            <img
              src={post.media}
              alt={post.title}
              className="max-h-125 rounded-xl object-cover"
            />
          )}
        </div>
        <div className="my-2 h-px bg-gray-200" />

        <div className="flex items-center justify-between px-2 py-1">
          <Button
            variant={"ghost"}
            size={"lg"}
            onClick={() => setIsLiked(!isLiked)}
            className={`group flex flex-1 transition duration-200 ${
              isLiked
                ? "text-red-600 hover:bg-red-50"
                : "text-gray-600 hover:bg-gray-100 hover:text-red-600"
            }`}
          >
            <Heart
              size={18}
              className={`transition group-hover:scale-110 ${
                isLiked ? "fill-current" : ""
              }`}
            />
            <span className="text-sm font-medium">Like</span>
          </Button>

          <Button
            onClick={() => setShowComments((prev) => !prev)}
            className="group flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-gray-600 transition duration-200 hover:bg-gray-100 hover:text-blue-600"
          >
            <MessageCircle
              size={18}
              className="transition group-hover:scale-110"
            />
            <span className="text-sm font-medium">Comment</span>
          </Button>

          <Button className="group flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-gray-600 transition duration-200 hover:bg-gray-100 hover:text-blue-600">
            <Share2 size={18} className="transition group-hover:scale-110" />
            <span className="text-sm font-medium">Share</span>
          </Button>

          <Button className="group cursor-pointer flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-gray-600 transition duration-200 hover:bg-yellow-50 hover:text-yellow-600">
            <Bookmark size={18} className="transition group-hover:scale-110" />
            <span className="text-sm font-medium">
              {post?.type === "event" ? "Attend" : "Save"}
            </span>
          </Button>
        </div>
      </div>
      {openUpdatePost && (
        <CreatePostDialog
          post={post}
          onOpenChange={setOpenUpdatePost}
          openDialog={openUpdatePost}
        />
      )}
    </>
  )
}
