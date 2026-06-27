import Link from "next/link"

const platforms = [
  {
    href: "/video",
    emoji: "📹",
    label: "TikTok / Instagram",
    desc: "動画キャプション・ハッシュタグ・シーン構成案を生成",
    color: "from-pink-50 to-orange-50",
    border: "border-pink-200",
  },
  {
    href: "/text",
    emoji: "✏️",
    label: "X / Threads",
    desc: "フォロワー獲得・保存・リプライを意識したテキスト投稿を生成",
    color: "from-blue-50 to-indigo-50",
    border: "border-blue-200",
  },
  {
    href: "/note",
    emoji: "📝",
    label: "note",
    desc: "タイトル＋本文1,000〜1,200字の記事ドラフトを生成",
    color: "from-green-50 to-emerald-50",
    border: "border-green-200",
  },
]

export default function Home() {
  return (
    <div className="py-10">
      <p className="text-[#6E6557] text-sm mb-8">
        投稿したいプラットフォームを選んでください。
      </p>
      <div className="grid gap-4">
        {platforms.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className={`block bg-gradient-to-r ${p.color} border ${p.border} rounded-xl p-6 hover:shadow-md transition-shadow group`}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{p.emoji}</span>
              <span className="font-bold text-[#161616] text-base group-hover:text-[#3B43F0] transition-colors">
                {p.label}
              </span>
            </div>
            <p className="text-sm text-[#6E6557]">{p.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
