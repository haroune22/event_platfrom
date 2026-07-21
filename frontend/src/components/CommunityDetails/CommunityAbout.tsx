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
  const { community, currentUserRole , memberCount, isMember } =
    useOutletContext<CommunityContextType>()

  if (!community) {
    return <div className="text-center py-8">Loading community information...</div>
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-gray-100 px-6 py-4 bg-linear-to-r from-blue-50 to-indigo-50">
          <h2 className="text-2xl font-bold text-gray-900">About this community</h2>
        </div>

        <div className="px-6 py-6">
          <p className="text-gray-700 leading-relaxed text-base mb-6">
            {community.description}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-lg border border-gray-200 p-4 text-center hover:border-blue-300 transition">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 mx-auto mb-2">
                <Users size={20} className="text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {memberCount.toLocaleString()}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {memberCount === 1 ? "Member" : "Members"}
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-4 text-center hover:border-purple-300 transition">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-100 mx-auto mb-2">
                <Globe size={20} className="text-purple-600" />
              </div>
              <div className="text-sm font-bold text-gray-900 capitalize">
                {community.category}
              </div>
              <div className="text-xs text-gray-600 mt-1">Category</div>
            </div>

            <div className="rounded-lg border border-gray-200 p-4 text-center hover:border-green-300 transition">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 mx-auto mb-2">
                <Shield size={20} className="text-green-600" />
              </div>
              <div className="text-sm font-bold text-gray-900 capitalize">
                {community.visibility}
              </div>
              <div className="text-xs text-gray-600 mt-1">Visibility</div>
            </div>

            <div className="rounded-lg border border-gray-200 p-4 text-center hover:border-orange-300 transition">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-orange-100 mx-auto mb-2">
                <Calendar size={20} className="text-orange-600" />
              </div>
              <div className="text-sm font-bold text-gray-900">
                {community.createdAt
                  ? formatDistanceToNow(new Date(community.createdAt), {
                      addSuffix: false,
                    })
                  : "N/A"}
              </div>
              <div className="text-xs text-gray-600 mt-1">Created ago</div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-gray-100 px-6 py-4 bg-linear-to-r from-blue-50 to-indigo-50">
          <h3 className="text-xl font-bold text-gray-900">Creator</h3>
        </div>

        <div className="px-6 py-6">
          <div className="flex items-center gap-4">
            {community.profilePic && typeof community.profilePic === "string" ? (
              <img
                src={community.profilePic}
                alt={community.creatorName}
                className="h-16 w-16 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-linear-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold text-xl border-2 border-gray-200">
                {community.creatorName?.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-lg font-bold text-gray-900">
                  {community.creatorName}
                </h4>
                <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  Creator
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Founded {community.createdAt
                  ? formatDistanceToNow(new Date(community.createdAt), {
                      addSuffix: true,
                    })
                  : "this community"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-gray-100 px-6 py-4 bg-linear-to-r from-blue-50 to-indigo-50">
          <h3 className="text-xl font-bold text-gray-900">Details</h3>
        </div>
        <div className="px-6 py-6 space-y-4">
          <div className="pb-4 border-b border-gray-100">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Community Name
            </div>
            <p className="text-gray-900 font-medium">{community.name}</p>
          </div>
          <div className="pb-4 border-b border-gray-100">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Category
            </div>
            <div className="inline-block">
              <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-3 py-1 rounded-full capitalize">
                {community.category}
              </span>
            </div>
          </div>
          <div className="pb-4 border-b border-gray-100">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Visibility
            </div>
            <p className="text-gray-900 font-medium capitalize">
              {community.visibility}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {community.visibility === "public"
                ? "Anyone can view and join this community"
                : "Only members can view and interact with this community"}
            </p>
          </div>
          <div className="pb-4 border-b border-gray-100">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Created
            </div>
            <p className="text-gray-900 font-medium">
              {community.createdAt
                ? new Date(community.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {community.createdAt
                ? formatDistanceToNow(new Date(community.createdAt), {
                    addSuffix: true,
                  })
                : ""}
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Your Status
            </div>
            {(isMember && currentUserRole === "member") && (
              <div className="inline-flex items-center gap-2">
                <span className="text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  ✓ Member
                </span>
              </div>
            )}
            {currentUserRole === "owner" && (
              <div className="inline-flex items-center gap-2 mt-1">
                <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  ✓ Owner
                </span>
              </div>
            )}
            {!isMember && !currentUserRole && (
              <div className="inline-flex items-center gap-2">
                <span className="text-xs font-semibold bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  Not a member
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-gray-100 px-6 py-4 bg-linear-to-r from-blue-50 to-indigo-50">
          <h3 className="text-xl font-bold text-gray-900">Community Guidelines</h3>
        </div>

        <div className="px-6 py-6">
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold mt-0.5">•</span>
              <span>Be respectful and civil in all interactions</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold mt-0.5">•</span>
              <span>Keep discussions relevant to the community topic</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold mt-0.5">•</span>
              <span>No spam, promotional content, or self-promotion</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold mt-0.5">•</span>
              <span>Respect other members' privacy and opinions</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CommunityAbout