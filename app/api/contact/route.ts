import { NextResponse } from "next/server"
import { validateEnquiry } from "@/lib/enquiry"

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 })
  }
  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 })
  }
  const input = payload as Record<string, unknown>
  if (typeof input.website === "string" && input.website.trim()) {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 })
  }
  const result = validateEnquiry(input)
  if (Object.keys(result.errors).length > 0) {
    return NextResponse.json({ errors: result.errors }, { status: 400 })
  }
  return NextResponse.json({ subject: result.subject, body: result.body })
}
