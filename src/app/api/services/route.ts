import { requireUser } from "@/src/domain/auth/requireUser";
import { getUserServices } from "@/src/dal/services/getUserServices";
import { NextResponse } from "next/server";

export async function GET () {
  try {
    const { user } = await requireUser()

    const services = await getUserServices(user.id)
    return NextResponse.json(services)
  } catch {
    return NextResponse.json(
      { error: "Internal Service Error" },
      { status: 501 }
    )
  }
}