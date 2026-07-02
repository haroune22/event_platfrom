import type {
  CreatePostData,
  PostCategory,
  PostDetails,
  PostTypes,
  UpdatePostData,
} from "@/lib/types"
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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPost, updatePost } from "@/api/post"
import { toast } from "sonner"


type PostFormProps = {
  post?: PostDetails
  onOpenChange: Dispatch<SetStateAction<boolean>>
  PostType?: PostTypes
}

const PostForm = ({ post, onOpenChange, PostType }: PostFormProps) => {
  const queryClient = useQueryClient()

  const [type, setType] = useState<PostTypes | "normal">(
    post?.type || PostType || "normal"
  )
  const [image, setImage] = useState<File | null>(null)

  const [title, setTitle] = useState<string>(post?.title || "")

  const [content, setContent] = useState<string>(post?.content || "")
  const [category, setCategory] = useState<PostCategory>(
    post?.category || "education"
  )

  const preview = useMemo(() => {
    if (!image) return null
    return URL.createObjectURL(image)
  }, [image])

  const displayImage = preview || post?.media || ""
  console.log(type, title, content, category, image)

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  const createPostMutation = useMutation({
    mutationFn: (data: CreatePostData) => createPost(data),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["posts", post?.id],
      })
      toast.success("Post created successfully")
      console.log("post created successfully", data)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const updatePostMutation = useMutation({
    mutationFn: (data: UpdatePostData) => updatePost(data),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["fetch-post-by-id", post?.id],
      })
      toast.success("Post updated successfully")
      console.log("post updated successfully", data)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!title.trim()) return
    if (!content.trim()) return

    let media = post?.media ?? ""

    if (image) {
      const imageUrl = await uploadImage(image)
      media = imageUrl.secure_url
    } 

    try {
      if (post) {
        await updatePostMutation.mutate({
          id: post.id,
          title,
          content,
          media,
          category,
          type,
        })
      } else {
        await createPostMutation.mutate({
          title,
          content,
          media,
          category,
          type,
        })
      }
       onOpenChange(false)
    } catch (error) {
      console.log(error)
    } 
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
            className="h-11 max-w-80 border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="font-medium text-gray-700">💬 Content</Label>

          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            placeholder="What's on your mind?"
            className="h-24 max-w-80 resize-none border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500"
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
