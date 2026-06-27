import type { PostDetails } from "@/lib/types"
import { Label } from "./ui/label"
import { Input } from "./ui/input"

type PostFormProps = {
  post?: PostDetails
}

const PostForm = ({ post }: PostFormProps) => {
  return (
    <div className="flex max-h-80 w-full flex-col">
      {post ? (
        <h1 className="text-center text-xl"> update Post </h1>
      ) : (
        <h1 className="text-center text-xl">Create Post</h1>
      )}
      <form className="flex flex-col p-2" action="">
        <div className="flex flex-col gap-2">
          <Label> Title:</Label>
          <Input
            placeholder={post ? post.title : "Title"}
            defaultValue={post ? post?.title : ""}
          />
        </div>
        <div></div>
      </form>
    </div>
  )
}

export default PostForm
