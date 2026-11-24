import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET?.trim()
  if (!secret) {
    return NextResponse.json({ ok: false }, { status: 503 })
  }
  const provided = request.headers.get("x-revalidate-secret") ?? ""
  if (provided.length !== secret.length || provided !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  revalidatePath("/", "layout")
  revalidatePath("/sitemap.xml")
  revalidatePath("/robots.txt")
  return NextResponse.json({ ok: true })
}
