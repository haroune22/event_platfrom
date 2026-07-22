import { useOutletContext } from "react-router-dom"
import { Users, Shield, Calendar, Globe } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import type { CommunityCRUD, userRoles } from "@/lib/types"

interface CommunityContextType {
  community: CommunityCRUD
  currentUserRole: userRoles
  memberCount: number
  isMember: boolean
}

const CommunityAbout = () => {
  const { community, currentUserRole, memberCount } =
    useOutletContext<CommunityContextType>()

  if (!community) {
    return (
      <div className="py-8 text-center">Loading community information...</div>
    )
  }

  const roleBadge = {
    owner: {
      text: "✓ Owner",
      className: "bg-blue-100 text-blue-700",
    },
    moderator: {
      text: "🛡 Moderator",
      className: "bg-purple-100 text-purple-700",
    },
    member: {
      text: "✓ Member",
      className: "bg-green-100 text-green-700",
    },
    none: {
      text: "Not a member",
      className: "bg-gray-100 text-gray-700",
    },
  }

  const badge = roleBadge[currentUserRole ?? "none"]

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 bg-linear-to-r from-blue-50 to-indigo-50 px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-900">
            About this community
          </h2>
        </div>

        <div className="px-6 py-6">
          <p className="mb-6 text-base leading-relaxed text-gray-700">
            {community.description}
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-lg border border-gray-200 p-4 text-center transition hover:border-blue-300">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Users size={20} className="text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {memberCount.toLocaleString()}
              </div>
              <div className="mt-1 text-xs text-gray-600">
                {memberCount === 1 ? "Member" : "Members"}
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-4 text-center transition hover:border-purple-300">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <Globe size={20} className="text-purple-600" />
              </div>
              <div className="text-sm font-bold text-gray-900 capitalize">
                {community.category}
              </div>
              <div className="mt-1 text-xs text-gray-600">Category</div>
            </div>

            <div className="rounded-lg border border-gray-200 p-4 text-center transition hover:border-green-300">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <Shield size={20} className="text-green-600" />
              </div>
              <div className="text-sm font-bold text-gray-900 capitalize">
                {community.visibility}
              </div>
              <div className="mt-1 text-xs text-gray-600">Visibility</div>
            </div>

            <div className="rounded-lg border border-gray-200 p-4 text-center transition hover:border-orange-300">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                <Calendar size={20} className="text-orange-600" />
              </div>
              <div className="text-sm font-bold text-gray-900">
                {community.createdAt
                  ? formatDistanceToNow(new Date(community.createdAt), {
                      addSuffix: false,
                    })
                  : "N/A"}
              </div>
              <div className="mt-1 text-xs text-gray-600">Created ago</div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 bg-linear-to-r from-blue-50 to-indigo-50 px-6 py-4">
          <h3 className="text-xl font-bold text-gray-900">Creator</h3>
        </div>

        <div className="px-6 py-6">
          <div className="flex items-center gap-4">
            {community.profilePic &&
            typeof community.profilePic === "string" ? (
              <img
                src={community.profilePic}
                alt={community.creatorName}
                className="h-16 w-16 rounded-full border-2 border-gray-200 object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-200 bg-linear-to-br from-blue-400 to-indigo-600 text-xl font-bold text-white">
                {community.creatorName?.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="flex-1">
              <div className="mb-1 flex items-center gap-2">
                <h4 className="text-lg font-bold text-gray-900">
                  {community.creatorName}
                </h4>
                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                  Creator
                </span>
              </div>
              <p className="mb-3 text-sm text-gray-600">
                Founded{" "}
                {community.createdAt
                  ? formatDistanceToNow(new Date(community.createdAt), {
                      addSuffix: true,
                    })
                  : "this community"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 bg-linear-to-r from-blue-50 to-indigo-50 px-6 py-4">
          <h3 className="text-xl font-bold text-gray-900">Details</h3>
        </div>
        <div className="space-y-4 px-6 py-6">
          <div className="border-b border-gray-100 pb-4">
            <div className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
              Community Name
            </div>
            <p className="font-medium text-gray-900">{community.name}</p>
          </div>
          <div className="border-b border-gray-100 pb-4">
            <div className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
              Category
            </div>
            <div className="inline-block">
              <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700 capitalize">
                {community.category}
              </span>
            </div>
          </div>
          <div className="border-b border-gray-100 pb-4">
            <div className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
              Visibility
            </div>
            <p className="font-medium text-gray-900 capitalize">
              {community.visibility}
            </p>
            <p className="mt-1 text-xs text-gray-600">
              {community.visibility === "public"
                ? "Anyone can view and join this community"
                : "Only members can view and interact with this community"}
            </p>
          </div>
          <div className="border-b border-gray-100 pb-4">
            <div className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
              Created
            </div>
            <p className="font-medium text-gray-900">
              {community.createdAt
                ? new Date(community.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
            </p>
            <p className="mt-1 text-xs text-gray-600">
              {community.createdAt
                ? formatDistanceToNow(new Date(community.createdAt), {
                    addSuffix: true,
                  })
                : ""}
            </p>
          </div>

          <div>
            <div className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
              Your Status
            </div>
            <div className="inline-flex items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${badge.className}`}
              >
                {badge.text}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 bg-linear-to-r from-blue-50 to-indigo-50 px-6 py-4">
          <h3 className="text-xl font-bold text-gray-900">
            Community Guidelines
          </h3>
        </div>

        <div className="px-6 py-6">
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="mt-0.5 font-bold text-blue-600">•</span>
              <span>Be respectful and civil in all interactions</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 font-bold text-blue-600">•</span>
              <span>Keep discussions relevant to the community topic</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 font-bold text-blue-600">•</span>
              <span>No spam, promotional content, or self-promotion</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 font-bold text-blue-600">•</span>
              <span>Respect other members' privacy and opinions</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CommunityAbout
