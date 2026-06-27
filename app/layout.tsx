import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "PostEngine",
  description: "地方エンジニア × 育児 × 移住 — 5プラットフォーム対応SNS投稿自動生成",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-[#FAF1E8] text-[#161616] antialiased">
        <Header />
        <main className="max-w-3xl mx-auto px-6 pb-20 border-l border-[#161616]">
          {children}
        </main>
      </body>
    </html>
  )
}
