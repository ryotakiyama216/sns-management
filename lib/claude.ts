export async function callClaude(
  systemPrompt: string,
  userMessage: string,
  maxTokens = 1200,
  useSearch = true
): Promise<any> {
  const body: any = {
    model: "claude-sonnet-4-5",
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
  }
  if (useSearch) {
    body.tools = [{ type: "web_search_20250305", name: "web_search" }]
  }

  const res = await fetch("/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  const data = await res.json()

  if (!res.ok) {
    // エラー詳細をそのまま投げる
    throw new Error(`API ${res.status}: ${JSON.stringify(data)}`)
  }

  const txt = (data.content || [])
    .filter((b: any) => b.type === "text")
    .map((b: any) => b.text)
    .join("\n")
    .trim()

  const s = txt.indexOf("{")
  const e = txt.lastIndexOf("}")
  if (s === -1 || e <= s) throw new Error("JSONが見つかりません: " + txt.slice(0, 80))

  return JSON.parse(txt.slice(s, e + 1))
}