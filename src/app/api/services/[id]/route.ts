import { upsertService } from "@/src/dal/services/upsertService";
import { requireUser } from "@/src/domain/auth/requireUser";
import { userOwnsService } from "@/src/domain/auth/userOwnsService";
import { NextResponse } from "next/server";
import { deleteService } from "@/src/dal/services/deleteService";

export async function POST (req: Request, { params }: { params: Promise<{ id: string }>}) {
  try {
    const { user } = await requireUser()
    const { service } = await req.json()

    if (!service) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }


    const { id } = await params
    const ownership = await userOwnsService(user.id, id)
    
    if (!ownership.ok) return NextResponse.json("Forbidden", { status: 403 })

    await upsertService(user.id, id, service)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Service upsert error:", err)
    return NextResponse.json(
      { error: "Internal service error" },
      { status: 500 }
    )
  }
}

export async function DELETE (req: Request, { params }: { params: Promise<{ id: string }>}) {
  try {
    const { user } = await requireUser()
    const { id } = await params
    const ownership = await userOwnsService(user.id, id)

    if (!ownership.ok) return NextResponse.json("Forbidden", { status: 403 })
    
    await deleteService(id)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Error deleting service:", err)
    return NextResponse.json(
      { error: "Internal service error" },
      { status: 500 }
    )
  }
}