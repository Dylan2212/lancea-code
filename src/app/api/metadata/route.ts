import { requireUser } from "@/src/domain/auth/requireUser";
import { getOrCreateUserMetaData } from "@/src/dal/metadata/getUserMetaData";
import { NextResponse } from "next/server";
import { updateUserMetaData } from "@/src/dal/metadata/updateUserMetaData";
import { createFilePath } from "@/src/application/storage/createFilePath";
import { uploadOgthumbnail } from "@/src/dal/metadata/uploadOgImage";
import { retrievePublicUrl } from "@/src/dal/metadata/retrievePublicUrl";
import { Metadata } from "@/src/types";

export async function GET () {
  try {
    const { user } = await requireUser()
    const metadata = await getOrCreateUserMetaData(user.id)

    return NextResponse.json(metadata)
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Service Error: " + err },
      { status: 501 }
    )
  }
}

export async function POST (req: Request) {
  try {
    const { user } = await requireUser()
    const data = await req.formData()

    if (data.get("file")) {
      const file = data.get("file") as File

      if (file.name) {
        const filePath = createFilePath(user.id, file.name)
        await uploadOgthumbnail(filePath, file)
        const imageUrl = retrievePublicUrl(filePath)
        data.set("ogImageUrl", imageUrl)
      }
    }

    const metadata : Partial<Metadata> = {
      ogTitle: data.get("ogTitle") as string,
      ogDescription: data.get("ogDescription") as string,
      ogImageUrl: data.get("ogImageUrl") as string,
      searchTitle: data.get("searchTitle") as string,
      searchDescription: data.get("searchDescription") as string
    }

    console.log("Updating metadata for user:", user.id, "with data:", metadata)
    await updateUserMetaData(user.id, metadata)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Error occurred while processing POST request:", err)
    return NextResponse.json({ ok: false })
  }
}