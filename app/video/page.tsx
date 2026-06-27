"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DraftBox } from "@/components/draft-box"
import { callClaude } from "@/lib/claude"
import { sendToNotion } from "@/lib/notion"
import { storage } from "@/lib/storage"
import { SP_VIDEO } from "@/lib/constants"
import { Loader2, CheckCircle2 } from "lucide-react"

interface VideoResult {
  trend_summary: string
  tiktok_caption: string
  instagram_caption: string
  hashtags: string
  scene_idea: string
}

export default function VideoPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<VideoResult | null>(null)
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
        SP_VIDEO,
        `ペルソナ:\n${profile}\n\n今日のTikTok/Instagramキャプションを生成してください。`,
        1400,
        true
      )
      if (!d.tiktok_caption || !d.instagram_caption) throw new Error("レスポンスの形式が不正です")
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
    const title = result.tiktok_caption.slice(0, 40) || "動画投稿"
    const extra = `${result.hashtags}\n${result.scene_idea}${memo ? "\nメモ:" + memo : ""}`
    const ok1 = await sendToNotion("TikTok", title, result.tiktok_caption, extra)
    const ok2 = await sendToNotion("Instagram", title, result.instagram_caption, `${result.hashtags}${memo ? "\nメモ:" + memo : ""}`)
    setNotionLoading(false)
    if (ok1 && ok2) setNotionSent(true)
    else setError("Notion送信に失敗しました。設定を確認してください。")
  }

  return (
    <div className="py-8 space-y-6">
      <div>
        <h2 className="text-xl font-black mb-1">TikTok / Instagram</h2>
        <p className="text-sm text-[#6E6557]">視聴完了率・保存数を意識したキャプション＋シーン構成案を生成します</p>
      </div>

      <div className="text-center py-8 bg-[#FEFAF5] border border-[#DCD0BC] rounded-xl">
        <Button size="lg" onClick={generate} disabled={loading} className="font-black">
          {loading ? <><Loader2 size={16} className="mr-2 animate-spin" />分析・生成中…</>  : "今日の動画キャプションを生成"}
        </Button>
        <p className="text-xs text-[#6E6557] mt-3">トレンド調査 → キャプション生成（最大1分ほど）</p>
      </div>

      {error && (
        <div className="bg-[#FCF8F0] border border-dashed border-[#DCD0BC] rounded-lg p-4 text-sm text-[#161616]">
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
            <DraftBox tagClass="text-[#FF0050] border-[#FF0050]" tagLabel="TikTok" text={result.tiktok_caption} />
            <DraftBox tagClass="text-[#C13584] border-[#C13584]" tagLabel="Instagram" text={result.instagram_caption} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DraftBox tagClass="text-[#6E6557] border-[#6E6557]" tagLabel="ハッシュタグ" text={result.hashtags} />
            <DraftBox tagClass="text-[#1A7A4A] border-[#1A7A4A]" tagLabel="シーン構成案" text={result.scene_idea} />
          </div>

          <Card>
            <CardTitle>メモ（視聴数・気づきを後で記入）</CardTitle>
            <CardContent>
              <Input
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="例：視聴数500 / フックが弱かった"
              />
            </CardContent>
          </Card>

          <div>
            {notionSent ? (
              <div className="inline-flex items-center gap-2 text-sm text-[#1A7A4A] bg-[#E2F5EC] px-4 py-2 rounded-lg">
                <CheckCircle2 size={14} />
                SNS_POST_DBに記録しました（TikTok・Instagram）
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
