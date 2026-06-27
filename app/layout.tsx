import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "PostEngine",
  description: "SNS投稿自動生成ツール",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-white text-[#0a0a0a] antialiased">
        <Header />
        <main className="max-w-2xl mx-auto px-6 pb-24">
          {children}
        </main>
      </body>
    </html>
  )
}