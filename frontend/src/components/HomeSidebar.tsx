import { Users, TrendingUp, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

interface SuggestedCommunity {
  id: string
  name: string
  category: string
  memberCount: number
  image?: string
}

interface SidebarProps {
  suggestedCommunities?: SuggestedCommunity[]
  trendingCommunities?: SuggestedCommunity[]
}

export const HomeSidebar = ({
  suggestedCommunities = [],
  trendingCommunities = [],
}: SidebarProps) => {
  return (
    <aside className="hidden lg:flex flex-col gap-6 w-80 shrink-0">
      
      <div className="rounded-xl border border-gray-300 bg-white shadow-sm overflow-hidden">
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 px-4 py-4 border-b border-gray-200">
          <h2 className="font-bold text-gray-900 flex items-center gap-2 text-lg">
            <Users size={20} className="text-blue-600" />
            Suggested Communities
          </h2>
          <p className="text-xs text-gray-600 mt-1">Communities you might like</p>
        </div>

        <div className="space-y-3 p-4">
          {suggestedCommunities.length > 0 ? (
            suggestedCommunities.map((community) => (
              <div key={community.id} className="flex items-start justify-between gap-3 pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/communities/${community.id}`}
                    className="block font-semibold text-sm text-gray-900 hover:text-blue-600 truncate transition"
                  >
                    r/{community.name}
                  </Link>
                  <p className="text-xs text-gray-600 mt-1">
                    {community.memberCount.toLocaleString()} members
                  </p>
                  <span className="text-xs text-gray-500 capitalize inline-block mt-1">
                    {community.category}
                  </span>
                </div>
                <button className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition duration-200">
                  Join
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-600 py-4">No communities to suggest right now</p>
          )}

          {suggestedCommunities.length > 0 && (
            <Link
              to="/communities"
              className="flex items-center justify-center gap-2 w-full mt-3 pt-3 border-t border-gray-200 text-blue-600 hover:text-blue-700 font-semibold text-sm transition"
            >
              View More
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-gray-300 bg-white shadow-sm overflow-hidden">
        <div className="bg-linear-to-r from-orange-50 to-red-50 px-4 py-4 border-b border-gray-300">
          <h2 className="font-bold text-gray-900 flex items-center gap-2 text-lg">
            <TrendingUp size={20} className="text-orange-600" />
            Trending
          </h2>
          <p className="text-xs text-gray-600 mt-1">Communities gaining momentum</p>
        </div>

        <div className="space-y-3 p-4">
          {trendingCommunities.length > 0 ? (
            trendingCommunities.map((community, index) => (
              <Link
                key={community.id}
                to={`/communities`}
                className="group block pb-3 border-b border-gray-100 last:border-b-0 last:pb-0 hover:bg-gray-50 -mx-4 px-4 py-2 rounded transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-600 font-semibold mb-1">
                      #{index + 1} Trending
                    </div>
                    <h3 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 truncate transition">
                      r/{community.name}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">
                      {community.memberCount.toLocaleString()} members
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-gray-600 py-4">No trending communities right now</p>
          )}

          {trendingCommunities.length > 0 && (
            <Link
              to="/communities"
              className="flex items-center justify-center gap-2 w-full mt-3 pt-3 border-t border-gray-200 text-orange-600 hover:text-orange-700 font-semibold text-sm transition"
            >
              View More
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </div>

      <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 text-center">
        <p className="text-xs text-gray-600 leading-relaxed">
          Browse communities, discover events, and connect with people who share your interests.
        </p>
        <div className="flex gap-2 mt-3 justify-center">
          <Link to="/" className="text-xs text-blue-600 hover:underline">
            About
          </Link>
          <span className="text-gray-400">•</span>
          <Link to="/communities" className="text-xs text-blue-600 hover:underline">
            Explore
          </Link>
          <span className="text-gray-400">•</span>
          <Link to="/" className="text-xs text-blue-600 hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </aside>
  )
}