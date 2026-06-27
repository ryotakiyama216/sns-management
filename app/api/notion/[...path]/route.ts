import { NextRequest, NextResponse } from "next/server"

async function handler(req: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join("/")
  const notionUrl = `https://api.notion.com/v1/${path}`

  const headers: Record<string, string> = {
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json",
  }

  const authHeader = req.headers.get("Authorization")
  if (authHeader) headers["Authorization"] = authHeader

  try {
    const body = req.method !== "GET" ? await req.text() : undefined
    const res = await fetch(notionUrl, {
      method: req.method,
      headers,
      body,
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export { handler as GET, handler as POST, handler as PATCH, handler as DELETE }
