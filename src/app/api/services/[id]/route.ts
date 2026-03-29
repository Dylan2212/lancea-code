import { upsertService } from "@/src/dal/services/upsertService";
import { requireUser } from "@/src/domain/auth/requireUser";
import { userOwnsService } from "@/src/domain/auth/userOwnsService";
import { NextResponse } from "next/server";

export async function POST (req: Request, { params }: { params: Promise<{ serviceId: string }>}) {
  try {
    const { user } = await requireUser()
    const { service } = await req.json()

    if (!service) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }


    const { serviceId } = await params
    const ownership = await userOwnsService(user.id, serviceId)

    if (!ownership.ok) return NextResponse.json("Forbidden", { status: 403 })

    await upsertService(user.id, serviceId, service)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Service upsert error:", err)
    return NextResponse.json(
      { error: "Internal service error" },
      { status: 500 }
    )
  }
}