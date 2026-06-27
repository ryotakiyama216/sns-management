import { storage } from "./storage"

function formatDbId(id: string): string {
  const clean = id.replace(/-/g, "")
  return clean.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, "$1-$2-$3-$4-$5")
}

function timeSlot(): string {
  const h = new Date().getHours()
  if (h >= 6 && h < 10) return "朝(7:00)"
  if (h >= 11 && h < 14) return "昼(12:00)"
  if (h >= 19 && h < 23) return "夜(21:00)"
  return "その他"
}

function todayStr(): string {
  return new Date().toISOString().split("T")[0]
}

export async function testNotionConnection(token: string, dbId: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/notion/databases/${formatDbId(dbId)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": "2022-06-28",
      },
    })
    return res.ok
  } catch {
    return false
  }
}

export async function sendToNotion(
  platform: string,
  title: string,
  mainContent: string,
  extra = ""
): Promise<boolean> {
  const token = storage.getNotionToken()
  const dbId = storage.getNotionDb()
  if (!token || !dbId) return false

  const fullText = extra ? `${mainContent}\n\n${extra}` : mainContent
  const emojiMap: Record<string, string> = {
    TikTok: "🎵",
    Instagram: "📸",
    X: "✏️",
    Threads: "🧵",
    note: "📝",
  }

  const body = {
    parent: { database_id: formatDbId(dbId) },
    icon: { type: "emoji", emoji: emojiMap[platform] || "📄" },
    properties: {
      "投稿タイトル・内容": { title: [{ text: { content: title.slice(0, 100) } }] },
      プラットフォーム: { select: { name: platform } },
      ステータス: { select: { name: "計画中" } },
      投稿時間帯: { select: { name: timeSlot() } },
      投稿日時: { date: { start: todayStr() } },
    },
    children: [
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [{ type: "text", text: { content: fullText.slice(0, 2000) } }],
        },
      },
    ],
  }

  try {
    const res = await fetch("/api/notion/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    return res.ok
  } catch {
    return false
  }
}
