import { Settings, Users, Share2, MoreHorizontal, LogOut } from "lucide-react"
import { Link } from "react-router-dom"
import type { CommunityCRUD, userRoles } from "@/lib/types"

type CommunityHeaderProps = {
  community: CommunityCRUD
  role: userRoles
  memberCount?: number
  isMember?: boolean
}

const CommunityHeader = ({
  community,
  role,
  memberCount,
  isMember,
}: CommunityHeaderProps) => {
  return (
    <div className="bg-white">
      <div className="relative h-48 overflow-hidden bg-gray-200 sm:h-74">
        {community.banner && typeof community.banner === "string" ? (
          <img
            src={community.banner}
            alt={community.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-linear-to-br from-blue-400 to-indigo-600"></div>
        )}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
          {role === "owner" ? (
            <Link
              to={`/communities/${community.id}/about`}
              className="inline-flex items-center gap-2 rounded-xl bg-white/95 px-5 py-2.5 font-semibold text-gray-800 shadow-lg backdrop-blur transition hover:bg-white"
            >
              <Settings size={18} />
              Manage
            </Link>
          ) : isMember ? (
            <button className="inline-flex items-center gap-2 rounded-xl bg-white/95 px-5 py-2.5 font-semibold text-gray-800 shadow-lg backdrop-blur transition hover:bg-white">
              <LogOut size={18} />
              Leave
            </button>
          ) : (
            <button className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-lg transition hover:bg-blue-700">
              <Users size={18} />
              Join
            </button>
          )}

          <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/95 shadow-lg backdrop-blur transition hover:bg-white">
            <Share2 size={19} className="text-gray-700" />
          </button>

          <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/95 shadow-lg backdrop-blur transition hover:bg-white">
            <MoreHorizontal size={20} className="text-gray-700" />
          </button>
        </div>
      </div>

      <div className="px-4 pb-6 sm:px-6">
        <div className="relative z-10 -mt-12 mb-6 flex gap-4 sm:-mt-16">
          <div className="shrink-0">
            {community.image && typeof community.image === "string" ? (
              <img
                src={community.image}
                alt={community.name}
                className="h-24 w-24 rounded-xl border-4 border-white object-cover shadow-lg sm:h-32 sm:w-32"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-xl border-4 border-white bg-linear-to-br from-blue-400 to-indigo-600 shadow-lg sm:h-32 sm:w-32">
                <span className="text-3xl font-bold text-white sm:text-4xl">
                  {community.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col justify-end pb-2">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {community.name}
            </h1>
          </div>
        </div>

        <div className="mb-6">
          <p className="mb-4 text-sm text-gray-600">{community.description}</p>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 capitalize">
              {community.category}
            </span>
            <span className="text-xs text-gray-500">
              {community.visibility?.charAt(0).toUpperCase() +
                community.visibility?.slice(1)}
            </span>
          </div>

          <div className="flex flex-wrap gap-4 border-t border-gray-200 pt-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Users size={16} className="text-blue-600" />
              <span>
                <strong className="text-gray-900">{memberCount}</strong> member
                {memberCount !== 1 ? "s" : ""}
              </span>
            </div>
            <div>
              <span>
                By{" "}
                <strong className="text-gray-900">
                  {community.creatorName}
                </strong>
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CommunityHeader
