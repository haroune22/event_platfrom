import type {
  communityVisibility,
  PostCategory,
  userCommunitiesType,
} from "@/lib/types"
import { useState } from "react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Camera, ImageIcon, Globe, Lock } from "lucide-react"

type CommunityFormTypes = {
  community?: userCommunitiesType
}

const CommunityForm = ({ community }: CommunityFormTypes) => {
  const [newCommunity, setNewCommunity] = useState({
    name: community?.name || "",
    description: community?.description || "",
    category: community?.category || "technology",
    visibility: community?.visibility || "public",
    image: community?.image || "",
    banner: community?.banner || "",
  })

  return (
    <div className="grid h-full w-full grid-cols-[420px_1fr]">
      {/* ================= LEFT SIDE ================= */}

      <div className="overflow-y-auto border-r bg-white p-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Create Community</h1>
            <p className="mt-2 text-sm text-gray-500">
              Build a place where people can share ideas, events and resources.
            </p>
          </div>

          <div className="space-y-2">
            <Label>Community Name</Label>

            <Input
              placeholder="Messi Fans"
              value={newCommunity.name}
              onChange={(e) =>
                setNewCommunity((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>

            <Textarea
              rows={6}
              placeholder="Tell everyone what this community is about..."
              value={newCommunity.description}
              onChange={(e) =>
                setNewCommunity((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>

            <Select
              value={newCommunity.category}
              onValueChange={(value) =>
                setNewCommunity((prev) => ({
                  ...prev,
                  category: value as PostCategory,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent position="popper" className="bg-white shadow-lg">
                <SelectGroup>
                  <SelectItem value="education">🎓 Education</SelectItem>
                  <SelectItem value="sports">⚽ Sports</SelectItem>
                  <SelectItem value="fitness">🏋️ Fitness</SelectItem>
                  <SelectItem value="movies">🎬 Movies</SelectItem>
                  <SelectItem value="gaming">🎮 Gaming</SelectItem>
                  <SelectItem value="technology">💻 Technology</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Visibility</Label>

            <Select
              value={newCommunity.visibility}
              onValueChange={(value) =>
                setNewCommunity((prev) => ({
                  ...prev,
                  visibility: value as communityVisibility,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent position="popper" className="bg-white shadow-lg">
                <SelectGroup>
                  <SelectItem value="public">
                    <div className="flex items-center gap-2">
                      <Globe size={16} />
                      Public
                    </div>
                  </SelectItem>

                  <SelectItem value="private">
                    <div className="flex items-center gap-2">
                      <Lock size={16} />
                      Private
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Community Image</Label>

            <label className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 transition hover:border-blue-500 hover:bg-blue-50">
              <ImageIcon className="mb-2 text-gray-400" size={32} />
              <span className="text-sm text-gray-500">
                Upload community icon
              </span>

              <input type="file" className="hidden" />
            </label>
          </div>

          <div className="space-y-3">
            <Label>Banner Image</Label>

            <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 transition hover:border-blue-500 hover:bg-blue-50">
              <Camera className="mb-2 text-gray-400" size={34} />
              <span className="text-sm text-gray-500">
                Upload banner image
              </span>

              <input type="file" className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* preview side */}

      <div className="overflow-y-auto bg-gray-100 p-10">
        <h2 className="mb-6 text-2xl font-bold">Live Preview</h2>

        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl">
          <div
            className="relative h-56 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 bg-cover bg-center"
            style={
              newCommunity.banner
                ? {
                    backgroundImage: `url(${newCommunity.banner})`,
                  }
                : {}
            }
          >
            <div className="absolute -bottom-12 left-8">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-white shadow-lg">
                {newCommunity.image ? (
                  <img
                    src={newCommunity.image}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ImageIcon className="text-gray-400" size={34} />
                )}
              </div>
            </div>
          </div>

          <div className="space-y-5 p-8 pt-16">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold">
                {newCommunity.name || "Community Name"}
              </h2>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                {newCommunity.category}
              </span>
            </div>

            <p className="leading-7 text-gray-600">
              {newCommunity.description ||
                "Your community description will appear here as you type."}
            </p>

            <div className="flex items-center gap-4 border-t pt-6 text-sm text-gray-500">
              <span>👥 0 Members</span>

              <span>
                {newCommunity.visibility === "public"
                  ? "🌍 Public"
                  : "🔒 Private"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommunityForm