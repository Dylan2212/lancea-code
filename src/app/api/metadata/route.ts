import { requireUser } from "@/src/domain/auth/requireUser";
import { getOrCreateUserMetaData } from "@/src/dal/metadata/getUserMetaData";
import { NextResponse } from "next/server";
import { updateUserMetaData } from "@/src/dal/metadata/updateUserMetaData";
import { createFilePath } from "@/src/application/storage/createFilePath";
import { uploadOgthumbnail } from "@/src/dal/metadata/uploadOgImage";
import { retrievePublicUrl } from "@/src/dal/metadata/retrievePublicUrl";

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
    const data = await req.json()

    if (data.data.ogImageFile) {
      const filePath = createFilePath(user.id, data.data.ogImageFile)
      
      await uploadOgthumbnail(filePath, data.data.ogImageFile)
      const imageUrl = await retrievePublicUrl(filePath)
      data.data.ogImageUrl = imageUrl
    }

    await updateUserMetaData(user.id, data.data)

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false })
  }
}