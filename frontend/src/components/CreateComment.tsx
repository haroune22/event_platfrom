import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createComment } from "@/api/comments"
import type { CreateCommentData } from "@/lib/types"

type CreateCommentProps = {
  postId: string
}

const CreateComment = ({ postId }: CreateCommentProps) => {
  const [text, setText] = useState("")

  const queryClient = useQueryClient()

  const createCommentMutation = useMutation({
    mutationFn: (credentials: CreateCommentData) => createComment(credentials),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["fetch-comments"],
      })
      console.log("comment created", data)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!text.trim()) return

    createCommentMutation.mutate({ postId, text })
    setText("")
  }

  return (
    <form onSubmit={handleSubmit} className="my-2 flex w-full max-w-2xl">
      <Input
        value={text}
        className="h-12 flex-1 rounded-l-2xl rounded-r-none border border-gray-200 bg-gray-100 px-4 py-2 focus-visible:ring-1"
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
      />
      <Button
        className="h-12 cursor-pointer rounded-l-none rounded-r-2xl bg-blue-600 px-8 py-6 text-xl text-white hover:bg-blue-500"
        variant={"default"}
        size={"lg"}
        type="submit"
      >
        Send
      </Button>
    </form>
  )
}

export default CreateComment
