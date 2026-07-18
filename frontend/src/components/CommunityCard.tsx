import type { userCommunitiesType } from "@/lib/types"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"

interface CommunityCardProps {
  communities: userCommunitiesType[]
}

const CommunityCard = ({ communities }: CommunityCardProps) => {
  return (
    <div className="mb-6 flex flex-wrap gap-6">
      {communities.map((c) => (
        <Card
          key={c.id}
          className="group cursor-pointer w-76 overflow-hidden rounded-2xl border-0 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="relative h-28 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500">
            {c.banner && (
              <img
                src={c.banner}
                alt={c.name}
                className="h-full w-full object-cover"
              />
            )}

            <div className="absolute -bottom-8 left-5">
              {c.image ? (
                <img
                  src={c.image}
                  alt={c.name}
                  className="h-16 w-16 rounded-full border-4 border-white object-cover shadow-md"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-gray-200 text-2xl font-bold shadow-md">
                  {c.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          <CardContent className="pt-12">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">{c.name}</h2>

                <span className="mt-1 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 capitalize">
                  {c.category}
                </span>
              </div>
            </div>

            <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
              {c.description}
            </p>

            <div className="mt-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {c.profilePic ? (
                  <img
                    src={c.profilePic}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold">
                    {c.creatorName.charAt(0).toUpperCase()}
                  </div>
                )}

                <span className="text-sm text-gray-500">{c.creatorName}</span>
              </div>

              <Button
                size="lg"
                className="cursor-pointer rounded-2xl bg-indigo-600 hover:bg-indigo-700"
              >
                Join
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default CommunityCard
