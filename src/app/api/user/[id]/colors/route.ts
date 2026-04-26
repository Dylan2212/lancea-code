import { requireUser } from "@/src/domain/auth/requireUser";
import { NextResponse, NextRequest } from "next/server";
import { updateUserColors } from "@/src/dal/user/colors/updateUserColors";

export async function PATCH (req: NextRequest) {
  try {
    const { user } = await requireUser()
    const colors = await req.json()

    await updateUserColors(user.id, colors)

    return NextResponse.json({ ok: true })
  } catch {
     return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    )
  }
}