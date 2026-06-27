"use client"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface DraftBoxProps {
  tagClass: string
  tagLabel: string
  text: string
}

export function DraftBox({ tagClass, tagLabel, text }: DraftBoxProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }

  return (
    <div className="border border-[#DCD0BC] rounded-md p-3 bg-white flex flex-col gap-2">
      <span className={cn("inline-block text-[10.5px] font-bold tracking-wide px-2.5 py-0.5 rounded-full border w-fit", tagClass)}>
        {tagLabel}
      </span>
      <p className="text-sm whitespace-pre-wrap break-words flex-1">{text}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-[#6E6557] font-mono">{text.length}字</span>
        <button
          onClick={handleCopy}
          className="text-xs text-[#3B43F0] bg-[#E2E2FB] px-2.5 py-1 rounded hover:bg-[#C7CCF5] transition-colors"
        >
          {copied ? "コピー済み" : "コピー"}
        </button>
      </div>
    </div>
  )
}
