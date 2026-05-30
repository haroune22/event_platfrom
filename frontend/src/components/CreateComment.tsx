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

  const sendComment = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (text.length < 1) return
    createCommentMutation.mutate({ postId, text })
    setText("")
  }
  return (
    <div className="my-2 flex w-full max-w-xl items-center justify-center">
      <Input
        placeholder="Write a comment..."
        className="z-50 h-12 flex-1 rounded-l-2xl rounded-r-none border border-gray-200 bg-gray-100 px-4 py-2 focus-visible:ring-1"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        onClick={(e) => sendComment(e)}
        className="h-12 cursor-pointer rounded-l-none rounded-r-2xl bg-blue-600 px-8 py-6.5 text-xl text-white hover:bg-blue-500"
        variant={"default"}
        size={"lg"}
      >
        Send
      </Button>
    </div>
  )
}

export default CreateComment
