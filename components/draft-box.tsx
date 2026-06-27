"use client"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface DraftBoxProps {
  tagClass?: string
  tagLabel: string
  text: string
}

export function DraftBox({ tagLabel, text }: DraftBoxProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }

  return (
    <div className="bg-[#f8f8f8] rounded-xl p-4 flex flex-col gap-3">
      <span className="text-[10px] font-bold text-[#aaa] tracking-widest uppercase">
        {tagLabel}
      </span>
      <p className="text-sm text-[#0a0a0a] whitespace-pre-wrap break-words leading-relaxed flex-1">{text}</p>
      <div className="flex justify-between items-center pt-1 border-t border-[#efefef]">
        <span className="text-[11px] text-[#bbb] font-mono">{text.length}字</span>
        <button
          onClick={handleCopy}
          className="text-[11px] font-semibold text-[#888] hover:text-[#0a0a0a] transition-colors"
        >
          {copied ? "✓ コピー済み" : "コピー"}
        </button>
      </div>
    </div>
  )
}