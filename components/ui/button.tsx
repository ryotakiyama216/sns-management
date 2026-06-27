import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline" | "green"
  size?: "default" | "sm" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-full font-semibold transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40",
          variant === "default" && "bg-[#0a0a0a] text-white hover:bg-[#333]",
          variant === "ghost" && "bg-transparent text-[#888] hover:text-[#0a0a0a] hover:bg-[#f4f4f4]",
          variant === "outline" && "border border-[#e0e0e0] text-[#0a0a0a] bg-transparent hover:bg-[#f4f4f4]",
          variant === "green" && "bg-[#f0f0f0] text-[#0a0a0a] hover:bg-[#e0e0e0]",
          size === "default" && "px-4 py-2 text-sm",
          size === "sm" && "px-3 py-1.5 text-xs",
          size === "lg" && "px-8 py-3.5 text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }