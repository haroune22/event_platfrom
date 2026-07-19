import { Settings, Users, Share2, MoreHorizontal } from "lucide-react"
import { Link } from "react-router-dom"
import type { CommunityCRUD, userRoles } from "@/lib/types"

type CommunityHeaderProps = {
  community: CommunityCRUD
  role: userRoles
  membersCount?: number
  isMember?: boolean
}

const CommunityHeader = ({
  community,
  role,
  membersCount = 1,
  isMember = false,
}: CommunityHeaderProps) => {
  return (
    <div className="bg-white">

      <div className="relative h-48 sm:h-74 overflow-hidden bg-gray-200">
        {community.banner && typeof community.banner === 'string' ? (
          <img
            src={community.banner}
            alt={community.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-blue-400 to-indigo-600"></div>
        )}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="px-4 sm:px-6 pb-6">
        <div className="flex gap-4 -mt-12 sm:-mt-16 relative z-10 mb-6">

          <div className="shrink-0">
            {community.image && typeof community.image === 'string' ? (
              <img
                src={community.image}
                alt={community.name}
                className="h-24 w-24 sm:h-32 sm:w-32 rounded-xl border-4 border-white shadow-lg object-cover"
              />
            ) : (
              <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-xl border-4 border-white shadow-lg bg-linear-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
                <span className="text-3xl sm:text-4xl text-white font-bold">
                  {community.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-end pb-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {community.name}
            </h1>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 text-sm mb-4">
            {community.description}
          </p>
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full capitalize">
              {community.category}
            </span>
            <span className="text-xs text-gray-500">
              {community.visibility?.charAt(0).toUpperCase() + community.visibility?.slice(1)}
            </span>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 border-t border-gray-200 pt-4">
            <div className="flex items-center gap-1">
              <Users size={16} className="text-blue-600" />
              <span>
                <strong className="text-gray-900">{membersCount}</strong> member
                {membersCount !== 1 ? "s" : ""}
              </span>
            </div>
            <div>
              <span>By <strong className="text-gray-900">{community.creatorName}</strong></span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          {role === "owner" ? (
            <Link
              to={`/communities/${community.id}/settings`}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
            >
              <Settings size={18} />
              Manage
            </Link>
          ) : isMember ? (
            <button className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold px-6 py-2 rounded-lg transition duration-200">
              ✓ Joined
            </button>
          ) : (
            <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-200">
              Join
            </button>
          )}

          <button className="flex items-center justify-center gap-2 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 font-semibold px-6 py-2 rounded-lg transition duration-200">
            <Share2 size={18} />
            Share
          </button>

          <button className="p-2 hover:bg-gray-100 rounded-lg transition duration-200">
            <MoreHorizontal size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommunityHeader