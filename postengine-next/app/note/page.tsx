"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DraftBox } from "@/components/draft-box"
import { callClaude } from "@/lib/claude"
import { sendToNotion } from "@/lib/notion"
import { storage } from "@/lib/storage"
import { SP_NOTE } from "@/lib/constants"
import { Loader2, CheckCircle2 } from "lucide-react"

interface NoteResult {
  trend_summary: string
  title: string
  draft: string
}

export default function NotePage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<NoteResult | null>(null)
  const [memo, setMemo] = useState("")
  const [notionSent, setNotionSent] = useState(false)
  const [notionLoading, setNotionLoading] = useState(false)

  const generate = async () => {
    setLoading(true)
    setError("")
    setResult(null)
    setNotionSent(false)
    try {
      const profile = storage.getProfile()
      const d = await callClaude(
        SP_NOTE,
        `ペルソナ:\n${profile}\n\n今週のnote記事を1本丸ごと作成してください。`,
        2000,
        false
      )
      if (!d.title || !d.draft) throw new Error("レスポンスの形式が不正です")
      setResult(d)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const sendNotion = async () => {
    if (!result) return
    setNotionLoading(true)
    const ok = await sendToNotion("note", result.title, result.draft, memo ? "メモ:" + memo : "")
    setNotionLoading(false)
    if (ok) setNotionSent(true)
    else setError("Notion送信に失敗しました。設定を確認してください。")
  }

  return (
    <div className="py-8 space-y-6">
      <div>
        <h2 className="text-xl font-black mb-1">note</h2>
        <p className="text-sm text-[#6E6557]">タイトル＋本文1,000〜1,200字の記事ドラフトを生成します</p>
      </div>

      <div className="text-center py-8 bg-[#FEFAF5] border border-[#DCD0BC] rounded-xl">
        <Button size="lg" onClick={generate} disabled={loading} className="font-black">
          {loading ? <><Loader2 size={16} className="mr-2 animate-spin" />生成中…</> : "今週のnote記事ドラフトを生成"}
        </Button>
        <p className="text-xs text-[#6E6557] mt-3">記事生成（最大1〜2分ほど）</p>
      </div>

      {error && (
        <div className="bg-[#FCF8F0] border border-dashed border-[#DCD0BC] rounded-lg p-4 text-sm">
          ⚠️ {error}
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <Card>
            <CardTitle>テーマ選定理由</CardTitle>
            <CardContent>
              <p className="text-sm text-[#6E6557]">{result.trend_summary}</p>
            </CardContent>
          </Card>

          <DraftBox tagClass="text-[#3EA44E] border-[#3EA44E]" tagLabel="タイトル" text={result.title} />
          <DraftBox tagClass="text-[#3EA44E] border-[#3EA44E]" tagLabel="本文" text={result.draft} />

          <Card>
            <CardTitle>メモ（公開後の反応を記入）</CardTitle>
            <CardContent>
              <Input
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="例：スキ数32 / コメント多かった"
              />
            </CardContent>
          </Card>

          <div>
            {notionSent ? (
              <div className="inline-flex items-center gap-2 text-sm text-[#1A7A4A] bg-[#E2F5EC] px-4 py-2 rounded-lg">
                <CheckCircle2 size={14} />
                SNS_POST_DBに記録しました（note）
              </div>
            ) : (
              <Button variant="green" onClick={sendNotion} disabled={notionLoading}>
                {notionLoading ? <><Loader2 size={13} className="mr-1.5 animate-spin" />送信中…</> : "Notionに記録する"}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
