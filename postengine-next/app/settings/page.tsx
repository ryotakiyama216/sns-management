"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { storage } from "@/lib/storage"
import { DEFAULT_PROFILE } from "@/lib/constants"
import { testNotionConnection } from "@/lib/notion"
import { CheckCircle2, Loader2 } from "lucide-react"

export default function SettingsPage() {
  const [token, setToken] = useState("")
  const [dbId, setDbId] = useState("")
  const [profile, setProfile] = useState(DEFAULT_PROFILE)
  const [notionStatus, setNotionStatus] = useState<"idle" | "ok" | "error" | "testing">("idle")
  const [profileSaved, setProfileSaved] = useState(false)

  useEffect(() => {
    setToken(storage.getNotionToken())
    setDbId(storage.getNotionDb())
    setProfile(storage.getProfile())
    if (storage.getNotionToken() && storage.getNotionDb()) setNotionStatus("idle")
  }, [])

  const handleNotionSave = async () => {
    if (!token || !dbId) return
    setNotionStatus("testing")
    const ok = await testNotionConnection(token, dbId)
    if (ok) {
      storage.setNotion(token, dbId)
      setNotionStatus("ok")
    } else {
      setNotionStatus("error")
    }
  }

  const handleProfileSave = () => {
    storage.setProfile(profile || DEFAULT_PROFILE)
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 2000)
  }

  return (
    <div className="py-8 space-y-6">
      <div>
        <h2 className="text-xl font-black mb-1">設定</h2>
        <p className="text-sm text-[#6E6557]">Notion連携とプロフィールを設定します</p>
      </div>

      {/* Notion設定 */}
      <Card>
        <CardTitle>NOTION 連携</CardTitle>
        <CardContent className="space-y-3">
          <div>
            <label className="text-xs text-[#6E6557] mb-1 block">Integration Token</label>
            <Input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="ntn_xxx..."
            />
          </div>
          <div>
            <label className="text-xs text-[#6E6557] mb-1 block">SNS_POST_DB の ID</label>
            <Input
              type="text"
              value={dbId}
              onChange={(e) => setDbId(e.target.value)}
              placeholder="32桁の英数字"
            />
          </div>
          <div className="flex items-center gap-3 pt-1">
            <Button onClick={handleNotionSave} disabled={!token || !dbId || notionStatus === "testing"}>
              {notionStatus === "testing" ? <><Loader2 size={13} className="mr-1.5 animate-spin" />確認中…</> : "保存・接続確認"}
            </Button>
            {notionStatus === "ok" && <Badge variant="ok"><CheckCircle2 size={12} />連携中</Badge>}
            {notionStatus === "error" && <Badge variant="error">✗ エラー</Badge>}
            {notionStatus === "idle" && token && <Badge variant="idle">設定済み</Badge>}
          </div>
          <p className="text-xs text-[#6E6557] pt-1">
            TokenとDB IDはlocalStorageに保存されます（このブラウザのみ）。<br />
            Notion側でIntegrationをSNS_POST_DBに接続してください。
          </p>
        </CardContent>
      </Card>

      {/* プロフィール設定 */}
      <Card>
        <CardTitle>プロフィール</CardTitle>
        <CardContent className="space-y-3">
          <p className="text-xs text-[#6E6557]">投稿生成の際に参照するペルソナ情報です。</p>
          <Textarea
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            rows={6}
          />
          <div className="flex items-center gap-3">
            <Button onClick={handleProfileSave}>保存</Button>
            {profileSaved && (
              <span className="text-xs text-[#1A7A4A] flex items-center gap-1">
                <CheckCircle2 size={12} />保存しました
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
