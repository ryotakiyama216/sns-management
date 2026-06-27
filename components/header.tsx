"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Settings } from "lucide-react"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/video", label: "TikTok / IG" },
  { href: "/text", label: "X / Threads" },
  { href: "/note", label: "note" },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="max-w-2xl mx-auto px-6 pt-12 pb-0">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#0a0a0a]">PostEngine</h1>
          <p className="text-xs text-[#888] mt-0.5 font-medium">地方エンジニア × 育児 × 移住</p>
        </div>
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-colors",
            pathname === "/settings"
              ? "bg-[#0a0a0a] text-white"
              : "text-[#888] hover:text-[#0a0a0a] hover:bg-[#f4f4f4]"
          )}
        >
          <Settings size={12} />
          設定
        </Link>
      </div>
      <nav className="flex gap-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-xs font-semibold px-3 py-1.5 rounded-full transition-colors",
              pathname === item.href
                ? "bg-[#0a0a0a] text-white"
                : "text-[#888] hover:text-[#0a0a0a] hover:bg-[#f4f4f4]"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="h-px bg-[#f0f0f0] mt-4" />
    </header>
  )
}