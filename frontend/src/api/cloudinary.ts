export const uploadImage = async (file: File) => {
  const formData = new FormData()

  formData.append("file", file)
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET)

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  )

  return await res.json()
}
