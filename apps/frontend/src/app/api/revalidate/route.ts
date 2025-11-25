import { revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

/**
 * On-demand revalidation endpoint for cache invalidation
 * 
 * Usage:
 * POST /api/revalidate
 * Headers: x-revalidate-secret: <REVALIDATE_SECRET>
 * Body: { "tags": ["products", "product:product-handle"] }
 * 
 * @example
 * curl -X POST https://your-domain.com/api/revalidate \
 *   -H "Content-Type: application/json" \
 *   -H "x-revalidate-secret: your-secret" \
 *   -d '{"tags": ["products"]}'
 */
export async function POST(request: NextRequest) {
  // Verify secret from header or query param
  const secret =
    request.headers.get("x-revalidate-secret") ||
    request.nextUrl.searchParams.get("secret")

  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { error: "Invalid or missing secret" },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const { tags } = body

    if (!tags || !Array.isArray(tags)) {
      return NextResponse.json(
        { error: "Tags array required in request body" },
        { status: 400 }
      )
    }

    if (tags.length === 0) {
      return NextResponse.json(
        { error: "Tags array cannot be empty" },
        { status: 400 }
      )
    }

    // Revalidate each tag
    tags.forEach((tag: string) => {
      revalidateTag(tag)
    })

    return NextResponse.json(
      {
        revalidated: true,
        tags,
        now: Date.now(),
      },
      {
        headers: {
          "cache-control": "no-store",
        },
      }
    )
  } catch (error) {
    console.error("Revalidation error:", error)
    return NextResponse.json(
      { error: "Revalidation failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
