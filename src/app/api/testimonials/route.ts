import { requireUser } from "@/src/domain/auth/requireUser";
import { NextResponse } from "next/server";
import { getUserTestimonials } from "@/src/dal/testimonials/getUserTestimonials";

export async function GET () {
  try {
    const { user } = await requireUser()

    const services = await getUserTestimonials(user.id)
    return NextResponse.json(services)
  } catch {
    return NextResponse.json(
      { error: "Internal Service Error" },
      { status: 501 }
    )
  }
}