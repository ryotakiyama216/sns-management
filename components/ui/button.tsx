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
          {
            "bg-[#0a0a0a] text-white hover:bg-[#333]": variant === "default",
            "bg-transparent text-[#888] hover:text-[#0a0a0a] hover:bg-[#f4f4f4]": variant === "ghost",
            "border border-[#e0e0e0] text-[#0a0a0a] bg-transparent hover:bg-[#f4f4f4]": variant === "outline",
            "bg-[#0a0a0a] text-white hover:bg-[#333]": variant === "green",
          },
          {
            "px-4 py-2 text-sm": size === "default",
            "px-3 py-1.5 text-xs": size === "sm",
            "px-8 py-3.5 text-sm": size === "lg",
          },
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