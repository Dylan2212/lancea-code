"use client"

export async function convertToJpeg(file: File): Promise<File> {
  // Load the image into a bitmap
  const bitmap = await createImageBitmap(file)

  // Draw onto a canvas
  const canvas = document.createElement("canvas")
  canvas.width = bitmap.width
  canvas.height = bitmap.height

  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Could not get 2D context")

  ctx.drawImage(bitmap, 0, 0)

  // Convert canvas → JPEG Blob
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b)
        else reject(new Error("Canvas toBlob() failed"))
      },
      "image/jpeg",
      0.9
    )
  })

  // Wrap Blob in a File
  return new File([blob], "thumbnail.jpg", { type: "image/jpeg" })
}