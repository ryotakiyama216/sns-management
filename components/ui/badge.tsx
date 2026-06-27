import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "ok" | "error" | "idle"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium",
        {
          "bg-[#f0f0f0] text-[#0a0a0a]": variant === "ok",
          "bg-[#f0f0f0] text-red-500": variant === "error",
          "bg-[#f0f0f0] text-[#888]": variant === "idle",
          "bg-[#0a0a0a] text-white": variant === "default",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }