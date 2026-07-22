import { fetchCommunityMembers } from "@/api/community"
import type { CommunityContext } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"
import { useOutletContext, useSearchParams } from "react-router-dom"
import { useState } from "react"
import { Search, Users, Loader, Shield, UserCog } from "lucide-react"

interface Member {
  email: string
  id: string
  name: string
  profilePic: string | null
  role: "owner" | "moderator" | "member"
  userId: string
}

const CommunityMembers = () => {
  const [searchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")

  const { community, currentUserRole } = useOutletContext<CommunityContext>()

  const page = Number(searchParams.get("page")) || 1

  const { data, isLoading, error } = useQuery({
    queryKey: ["members", community.id, page],
    queryFn: () => fetchCommunityMembers(community.id, page),
    retry: false,
  })

  const members: Member[] = data?.members || []
  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="max-w-4xl">
        <div className="flex items-center justify-center py-12">
          <Loader className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-semibold text-red-900 mb-2">Failed to load members</p>
          <p className="text-sm text-red-700">
            Something went wrong. Please try refreshing the page.
          </p>
        </div>
      </div>
    )
  }

  if (!currentUserRole) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-8 text-center">
          <div className="flex justify-center mb-4">
            <Users className="h-12 w-12 text-blue-600" />
          </div>
          <h3 className="text-lg font-bold text-blue-900 mb-2">Join to view members</h3>
          <p className="text-sm text-blue-700">
            Only community members can view the members list. Join this community to see who's here!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-gray-100 px-6 py-4 bg-linear-to-r from-blue-50 to-indigo-50">
          <h2 className="text-2xl font-bold text-gray-900">Community Members</h2>
          <p className="text-sm text-gray-600 mt-1">
            {members.length} {members.length === 1 ? "member" : "members"} in this community
          </p>
        </div>
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search members by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 hover:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>
        </div>
        <div className="px-6 py-6">
          {filteredMembers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-8 w-8 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">
                {searchQuery ? "No members match your search" : "No members yet"}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition duration-200"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {member.profilePic ? (
                      <img
                        src={member.profilePic}
                        alt={member.name}
                        className="h-12 w-12 rounded-full object-cover border border-gray-200"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-linear-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold border border-gray-200">
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">
                        {member.email}
                      </p>
                    </div>
                  </div>
                  <div className="ml-4 shrink-0">
                    {member.role === "owner" && (
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                          Owner
                        </span>
                      </div>
                    )}
                    {member.role === "moderator" && (
                      <div className="flex items-center gap-2">
                        <UserCog className="h-4 w-4 text-purple-600" />
                        <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                          Moderator
                        </span>
                      </div>
                    )}
                    {member.role === "member" && (
                      <span className="text-xs font-semibold bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                        Member
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg border border-gray-200 p-4 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Total Members
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {members.length}
              </p>
            </div>
            <Users className="h-8 w-8 text-blue-100" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 p-4 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Owners
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {members.filter((m) => m.role === "owner").length}
              </p>
            </div>
            <Shield className="h-8 w-8 text-blue-100" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 p-4 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Moderators
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {members.filter((m) => m.role === "moderator").length}
              </p>
            </div>
            <UserCog className="h-8 w-8 text-purple-100" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommunityMembers