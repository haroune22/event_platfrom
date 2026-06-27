import type { PostDetails } from "@/lib/types"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import type { Dispatch, SetStateAction } from "react"

type PostFormProps = {
  post?: PostDetails
  onOpenChange: Dispatch<SetStateAction<boolean>>
}

const PostForm = ({ post, onOpenChange }: PostFormProps) => {
  return (
    <div className="flex flex-col">
      <div className="border-b bg-gray-50 px-6 py-5">
        <h2 className="text-2xl font-bold text-gray-900">
          {post ? "✏️ Update Post" : "✨ Create Post"}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Share something with your community.
        </p>
      </div>
      <form className="space-y-6 p-8">
        <div className="space-y-2">
          <Label className="font-medium text-gray-700">📝 Title</Label>
          <Input
            placeholder="Give your post a title..."
            className="h-11 border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="font-medium text-gray-700">💬 Content</Label>

          <Textarea
            rows={8}
            placeholder="What's on your mind?"
            className="resize-none border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="font-medium text-gray-700">🏷️ Category</Label>

          <Select>
            <SelectTrigger className="w-full border-gray-300">
              <SelectValue placeholder="Choose a category" />
            </SelectTrigger>

            <SelectContent className="bg-white shadow-lg">
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
          <Label className="font-medium text-gray-700">📷 Media</Label>

          <Input
            type="file"
            className="cursor-pointer border-gray-300 file:mr-3 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </form>
      <div className="flex justify-end gap-4 border-t bg-gray-50 px-6 py-4">
        <Button
          onClick={() => onOpenChange(false)}
          variant="outline"
          className="cursor-pointer"
        >
          Cancel
        </Button>

        <Button className="cursor-pointer bg-blue-600 px-6 py-4 text-white hover:bg-blue-700">
          {post ? "Save Changes" : "Create Post"}
        </Button>
      </div>
    </div>
  )
}

export default PostForm
