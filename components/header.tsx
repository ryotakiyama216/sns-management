"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Settings } from "lucide-react"

const navItems = [
  { href: "/", label: "ホーム" },
  { href: "/video", label: "📹 TikTok / IG" },
  { href: "/text", label: "✏️ X / Threads" },
  { href: "/note", label: "📝 note" },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="max-w-3xl mx-auto px-6 border-l border-[#161616]">
      <div className="flex items-start justify-between gap-4 py-8 pb-6 border-b border-[#161616] flex-wrap">
        <div>
          <h1 className="text-3xl font-black tracking-tight">PostEngine</h1>
          <p className="text-sm text-[#6E6557] mt-1">地方エンジニア × 育児 × 移住 — 5プラットフォーム対応</p>
        </div>
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md border transition-colors",
            pathname === "/settings"
              ? "bg-[#3B43F0] text-white border-[#3B43F0]"
              : "text-[#6E6557] border-[#DCD0BC] hover:bg-[#FAF1E8]"
          )}
        >
          <Settings size={13} />
          設定
        </Link>
      </div>
      <nav className="flex gap-0 border-b border-[#DCD0BC] mt-0">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-sm font-semibold px-4 py-3 border-b-2 transition-colors",
              pathname === item.href
                ? "text-[#3B43F0] border-[#3B43F0]"
                : "text-[#6E6557] border-transparent hover:text-[#161616]"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
