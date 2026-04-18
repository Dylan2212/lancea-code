import { NextResponse } from "next/server"
import { requireUser } from "@/src/domain/auth/requireUser"
import { userOwnsResource } from "@/src/domain/auth/userOwnsResouce"
import { checkTestimonialUserid } from "@/src/dal/testimonials/checkTestimonialUserid"
import { upsertTestimonial } from "@/src/dal/testimonials/upsertTestimonial"
import { deleteTestimonial } from "@/src/dal/testimonials/deleteTestimonial"

export async function POST (req: Request, { params }: { params: Promise<{ id: string }>}) {
  try {
    const { user } = await requireUser()
    const { testimonial } = await req.json()

    if (!testimonial) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }


    const { id } = await params
    const ownership = await userOwnsResource(user.id, id, checkTestimonialUserid)
    
    if (!ownership.ok) return NextResponse.json("Forbidden", { status: 403 })

    await upsertTestimonial(user.id, id, testimonial)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Testimonial upsert error:", err)
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
    const ownership = await userOwnsResource(user.id, id, checkTestimonialUserid)

    if (!ownership.ok) return NextResponse.json("Forbidden", { status: 403 })
    
    await deleteTestimonial(id)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Error deleting service:", err)
    return NextResponse.json(
      { error: "Internal service error" },
      { status: 500 }
    )
  }
}