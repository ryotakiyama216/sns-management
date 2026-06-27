"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DraftBox } from "@/components/draft-box"
import { callClaude } from "@/lib/claude"
import { sendToNotion } from "@/lib/notion"
import { storage } from "@/lib/storage"
import { SP_TEXT } from "@/lib/constants"
import { Loader2, CheckCircle2 } from "lucide-react"

interface TextResult {
  trend_summary: string
  x: string
  threads: string
}

export default function TextPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<TextResult | null>(null)
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
        SP_TEXT,
        `ペルソナ:\n${profile}\n\n今日のX/Threadsの投稿を生成してください。`,
        1000,
        true
      )
      if (!d.x || !d.threads) throw new Error("レスポンスの形式が不正です")
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
    const title = result.x.slice(0, 40) || "X/Threads投稿"
    const ok1 = await sendToNotion("X", title, result.x, memo ? "メモ:" + memo : "")
    const ok2 = await sendToNotion("Threads", title, result.threads, memo ? "メモ:" + memo : "")
    setNotionLoading(false)
    if (ok1 && ok2) setNotionSent(true)
    else setError("Notion送信に失敗しました。設定を確認してください。")
  }

  return (
    <div className="py-8 space-y-6">
      <div>
        <h2 className="text-xl font-black mb-1">X / Threads</h2>
        <p className="text-sm text-[#6E6557]">フォロワー獲得・保存・リプライを意識したテキスト投稿を生成します</p>
      </div>

      <div className="text-center py-8 bg-[#FEFAF5] border border-[#DCD0BC] rounded-xl">
        <Button size="lg" onClick={generate} disabled={loading} className="font-black">
          {loading ? <><Loader2 size={16} className="mr-2 animate-spin" />分析・生成中…</> : "今日のX / Threadsログを作成"}
        </Button>
        <p className="text-xs text-[#6E6557] mt-3">トレンド調査 → 投稿生成（最大1分ほど）</p>
      </div>

      {error && (
        <div className="bg-[#FCF8F0] border border-dashed border-[#DCD0BC] rounded-lg p-4 text-sm">
          ⚠️ {error}
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <Card>
            <CardTitle>TREND</CardTitle>
            <CardContent>
              <p className="text-sm text-[#6E6557]">{result.trend_summary}</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DraftBox tagClass="text-[#1D9BF0] border-[#1D9BF0]" tagLabel="X" text={result.x} />
            <DraftBox tagClass="text-[#000] border-[#000]" tagLabel="Threads" text={result.threads} />
          </div>

          <Card>
            <CardTitle>メモ（imp・反応を後で記入）</CardTitle>
            <CardContent>
              <Input
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="例：imp 1,200 / リプライ多かった"
              />
            </CardContent>
          </Card>

          <div>
            {notionSent ? (
              <div className="inline-flex items-center gap-2 text-sm text-[#1A7A4A] bg-[#E2F5EC] px-4 py-2 rounded-lg">
                <CheckCircle2 size={14} />
                SNS_POST_DBに記録しました（X・Threads）
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
