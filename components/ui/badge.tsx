import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "ok" | "error" | "idle"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium",
        {
          "bg-[#E2F5EC] text-[#1A7A4A]": variant === "ok",
          "bg-red-100 text-red-800": variant === "error",
          "bg-[#FAF1E8] text-[#6E6557] border border-[#DCD0BC]": variant === "idle",
          "bg-[#E2E2FB] text-[#3B43F0]": variant === "default",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
