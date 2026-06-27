import Link from "next/link"
import { ArrowRight } from "lucide-react"

const platforms = [
  {
    href: "/video",
    label: "TikTok / Instagram",
    desc: "動画キャプション・ハッシュタグ・シーン構成案",
    tag: "動画",
  },
  {
    href: "/text",
    label: "X / Threads",
    desc: "フォロワー獲得・保存・リプライを意識したテキスト投稿",
    tag: "テキスト",
  },
  {
    href: "/note",
    label: "note",
    desc: "タイトル＋本文1,000〜1,200字の記事ドラフト",
    tag: "記事",
  },
]

export default function Home() {
  return (
    <div className="pt-10">
      <p className="text-sm text-[#888] mb-8">プラットフォームを選択</p>
      <div className="flex flex-col gap-3">
        {platforms.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="group flex items-center justify-between bg-[#f8f8f8] hover:bg-[#f0f0f0] rounded-xl px-5 py-4 transition-colors"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#aaa] tracking-widest uppercase">{p.tag}</span>
              </div>
              <span className="font-semibold text-[#0a0a0a] text-sm">{p.label}</span>
              <span className="text-xs text-[#888]">{p.desc}</span>
            </div>
            <ArrowRight size={16} className="text-[#bbb] group-hover:text-[#0a0a0a] transition-colors flex-shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  )
}