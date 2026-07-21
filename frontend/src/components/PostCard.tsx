import {
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Heart,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { Link } from "react-router-dom"
import { useState } from "react"
import type { Post } from "@/lib/types"

interface postCardProps {
  post: Post
}

export const PostCard = ({ post }: postCardProps) => {
  
  const [isLiked, setIsLiked] = useState(false)
  const creatorProfilePic = post?.profilePic

  const postLink =
  post.type === "event"
    ? `/event/${post.eventId}`
    : post.type === "education"
      ? `/post/${post.id}`
      : `/post/${post.id}`;

  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:shadow-md">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {creatorProfilePic ? (
            <img
              src={creatorProfilePic}
              alt={post.creatorName}
              className="h-10 w-10 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-400 to-indigo-600 text-sm font-semibold text-white">
              {post.creatorName?.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="truncate text-sm font-semibold text-gray-900">
                {post.creatorName}
              </span>
              <span className="text-xs text-gray-500">in</span>
              <span className="truncate text-xs font-medium text-blue-600">
                r/{post.category}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>

        <button className="shrink-0 rounded-full p-2 transition duration-200 hover:bg-gray-100">
          <MoreHorizontal size={18} className="text-gray-500" />
        </button>
      </div>

      <Link
        to={postLink}
        className="block px-4 pb-3 transition hover:opacity-85"
      >
        <h2 className="mb-2 line-clamp-2 text-base font-bold text-gray-900">
          {post.title}
        </h2>
        <p className="line-clamp-2 text-sm text-gray-600">{post.content}</p>
      </Link>

      {post.media && (
        <Link to={postLink} className="block">
          <div className="relative overflow-hidden bg-gray-100">
            <img
              src={post.media}
              alt={post.title}
              className="h-auto max-h-125 w-full object-cover transition duration-200 hover:brightness-95"
            />
          </div>
        </Link>
      )}

      {!post.media && (
        <div className="px-4 pt-3 pb-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              post.type === "event"
                ? "bg-orange-100 text-orange-700"
                : post.type === "education"
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
            }`}
          >
            {post.type === "event" && "📅 event"}
            {post.type === "education" && "📚 Education"}
            {post.type === "normal" && "💬 Discussion"}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between px-2 py-1">
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`group flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 transition duration-200 ${
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
        </button>

        <Link
          to={`/post/${post.id}`}
          className="group flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-gray-600 transition duration-200 hover:bg-gray-100 hover:text-blue-600"
        >
          <MessageCircle
            size={18}
            className="transition group-hover:scale-110"
          />
          <span className="text-sm font-medium">Comment</span>
        </Link>

        <button className="group flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-gray-600 transition duration-200 hover:bg-gray-100 hover:text-blue-600">
          <Share2 size={18} className="transition group-hover:scale-110" />
          <span className="text-sm font-medium">Share</span>
        </button>

        <button className="group flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-gray-600 transition duration-200 hover:bg-yellow-50 hover:text-yellow-600">
          <Bookmark size={18} className="transition group-hover:scale-110" />
          <span className="text-sm font-medium">Save</span>
        </button>
      </div>
    </article>
  )
}
