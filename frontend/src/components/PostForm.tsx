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
import {
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react"
import EducationFields from "./EducationFields "
import EventFields from "./EventFields"
import { uploadImage } from "@/api/cloudinary"
import { usePostMutations } from "@/hooks/usePostMutations"

type PostFormProps = {
  post?: PostDetails
  onOpenChange: Dispatch<SetStateAction<boolean>>
  PostType?: PostTypes
  communityId?: string
}

const PostForm = ({
  post,
  onOpenChange,
  PostType,
  communityId,
}: PostFormProps) => {
  const [type, setType] = useState<PostTypes | "normal">(
    post?.type || PostType || "normal"
  )
  const [image, setImage] = useState<File | null>(null)

  const [title, setTitle] = useState<string>(post?.title || "")

  const [content, setContent] = useState<string>(post?.content || "")
  const [category, setCategory] = useState<PostCategory>(
    post?.category || "education"
  )

  const [eventDate, setEventDate] = useState<string>(post?.eventDate || "")
  const [maxParticipants, setMaxParticipants] = useState<number>(
    post?.maxParticipants || 0
  )

  const [level, setLevel] = useState("beginner")
  const [extraLinks, setExtraLinks] = useState("")

  const preview = useMemo(() => {
    if (!image) return null
    return URL.createObjectURL(image)
  }, [image])

  const displayImage = preview || post?.media || ""

  console.log(
    type,
    title,
    content,
    category,
    image,
    level,
    eventDate,
    extraLinks,
    maxParticipants,
    communityId
  )

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  const {
    createPostMutation,
    updatePostMutation,
    createEventMutation,
    updateEventMutation,
    updateEducationMutation,
  } = usePostMutations(post)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!title.trim()) return
    if (!content.trim()) return

    let media = post?.media ?? ""

    if (image) {
      const imageUrl = await uploadImage(image)
      media = imageUrl.secure_url
    }

    const commonData = {
      title,
      content,
      media,
      category,
      type,
      communityId: communityId ?? post?.communityId ?? undefined,
    }

    try {
      if (post) {
        switch (type) {
          case "normal":
            updatePostMutation.mutate({
              id: post.id,
              ...commonData,
            })
            break

          case "event":
            updateEventMutation.mutate({
              id: post.eventId ?? post?.id,
              ...commonData,
              eventDate,
              maxParticipants,
            })
            break

          case "education":
            updateEducationMutation.mutate({
              id: post.id,
              ...commonData,
              difficulty: level,
              externalLink: extraLinks,
            })
            break
        }
      } else {
        switch (type) {
          case "normal":
            createPostMutation.mutate(commonData)
            break

          case "event":
            createEventMutation.mutate({
              ...commonData,
              eventDate,
              maxParticipants,
            })
            break

          case "education":
            createPostMutation.mutate({
              ...commonData,
              difficulty: level,
              externalLink: extraLinks,
            })
            break
        }
      }
      onOpenChange(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex h-[90vh] w-120 flex-col">
      <div className="border-b bg-gray-50 px-6 py-5">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          {post ? "✏️ Update Post" : "✨ Create Post"}
        </h2>

        <p className="mt-1 text-center text-sm text-gray-500">
          Share something with your community.
        </p>
      </div>

      <form
        id="post-form"
        onSubmit={handleSubmit}
        className="flex-1 space-y-6 overflow-y-auto bg-gray-50 p-6"
      >
        <div className="space-y-2">
          <Label className="font-medium text-gray-700">📝 Title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your post a title..."
            className="h-11 max-w-full border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="font-medium text-gray-700">💬 Content</Label>

          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            placeholder="What's on your mind?"
            className="h-24 max-w-full resize-none border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500"
          />
        </div>

        <div className="max-w-fit space-y-2">
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

        {type === "education" && (
          <EducationFields
            level={level}
            setLevel={setLevel}
            extraLinks={extraLinks}
            setExtraLinks={setExtraLinks}
          />
        )}
        {type === "event" && (
          <EventFields
            eventDate={eventDate}
            setEventDate={setEventDate}
            maxParticipants={maxParticipants}
            setMaxParticipants={setMaxParticipants}
          />
        )}

        <div className="max-w-fit space-y-2">
          <Label className="font-medium text-gray-700">🏷️ Category</Label>

          <Select
            value={category}
            onValueChange={(value) => setCategory(value as PostCategory)}
            defaultValue="education"
          >
            <SelectTrigger className="w-full border-gray-300">
              <SelectValue placeholder="Choose a category" />
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

        <div className="space-y-4">
          <Label className="font-medium text-gray-700">📷 Media</Label>

          <Input
            type="file"
            className="cursor-pointer border-gray-300 file:mr-3 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-blue-700 hover:file:bg-blue-100"
            onChange={(e) => setImage(e.target.files?.[0] ?? null)}
          />

          {displayImage && (
            <img src={displayImage} alt="Preview" className="rounded-xl" />
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
          form="post-form"
          className="min-w-32 cursor-pointer bg-blue-600 px-6 py-4 text-white hover:bg-blue-700"
          disabled={createPostMutation.isPending}
        >
          {post ? "Save Changes" : "Create Post"}
        </Button>
      </div>
    </div>
  )
}

export default PostForm
