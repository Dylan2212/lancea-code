import { requireUser } from "@/src/domain/auth/requireUser";
import { NextResponse } from "next/server";

export async function POST () {
  try {
    await requireUser()

    const res = await fetch("http://localhost:4000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.WELCOME_API_KEY!
      },
      body: JSON.stringify({
        email: "dylan.anderson@lancrly.com",
        userId: "f0f10258-325a-40ca-941e-b9beee3bf0da"
      })
    })

    const data = await res.text()

    return NextResponse.json({ data })
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    )
  }
}