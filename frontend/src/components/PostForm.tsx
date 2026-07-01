import type { PostCategory, PostDetails, PostTypes } from "@/lib/types"
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
import { useState, type Dispatch, type SetStateAction } from "react"
import EducationFields from "./EducationFields "
import EventFields from "./EventFields"

type PostFormProps = {
  post?: PostDetails
  onOpenChange: Dispatch<SetStateAction<boolean>>
  PostType?: PostTypes
}

const PostForm = ({ post, onOpenChange, PostType }: PostFormProps) => {
  const [type, setType] = useState<PostTypes | "normal">(
    post?.type || PostType || "normal"
  )
  const [image, setImage] = useState<File | null>(null)
  const [title, setTitle] = useState<string>(post?.title || "")
  const [content, setContent] = useState<string>(post?.content || "")
  const [category, setCategory] = useState<PostCategory | undefined>(
    post?.category || undefined
  )

  console.log(type, title, content, category ,image)

  const preview = image ? URL.createObjectURL(image) : null



  const handleCreate = () => {

  }

  return (
    <div className="flex h-[85vh] flex-col">
      <div className="border-b bg-gray-50 px-6 py-5">
        <h2 className="text-2xl font-bold text-gray-900">
          {post ? "✏️ Update Post" : "✨ Create Post"}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Share something with your community.
        </p>
      </div>

      <form
        onSubmit={handleCreate}
        className="flex-1 space-y-6 overflow-y-auto bg-gray-50 p-6"
      >
        <div className="space-y-2">
          <Label className="font-medium text-gray-700">📝 Title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your post a title..."
            className="h-11 border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="font-medium text-gray-700">💬 Content</Label>

          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            placeholder="What's on your mind?"
            className="h-24 resize-none border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="font-medium text-gray-700">Type</Label>
          <Select
            value={type}
            onValueChange={(value) => setType(value as PostTypes)}
            defaultValue="post"
          >
            <SelectTrigger className="w-full border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper" className="bg-white shadow-lg">
              <SelectGroup>
                <SelectItem value="normal">📝 Normal Post</SelectItem>
                <SelectItem value="education">🎓 Education</SelectItem>
                <SelectItem value="event">📅 Event</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {type === "education" && <EducationFields />}
        {type === "event" && <EventFields />}

        <div className="space-y-2">
          <Label className="font-medium text-gray-700">🏷️ Category</Label>

          <Select
            value={category}
            onValueChange={(value) => setCategory(value as PostCategory)} 
          >
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

        <div className="space-y-4">
          <Label className="font-medium text-gray-700">📷 Media</Label>

          <Input
            type="file"
            className="cursor-pointer border-gray-300 file:mr-3 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-blue-700 hover:file:bg-blue-100"
            onChange={(e) => setImage(e.target.files?.[0] ?? null)}
          />

          {preview && (
            <img src={preview} alt="Preview" className="rounded-xl" />
          )}
        </div>
      </form>
      <div className="flex justify-end gap-3 border-t bg-gray-50 px-6 py-5">
        <Button
          onClick={() => onOpenChange(false)}
          variant="outline"
          className="min-w-24 cursor-pointer"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="min-w-32 cursor-pointer bg-blue-600 px-6 py-4 text-white hover:bg-blue-700"
        >
          {post ? "Save Changes" : "Create Post"}
        </Button>
      </div>
    </div>
  )
}

export default PostForm
