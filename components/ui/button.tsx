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
          "inline-flex items-center justify-center rounded-md font-semibold transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-[#3B43F0] text-[#FAF1E8] hover:bg-[#2A30D0]": variant === "default",
            "bg-transparent text-[#6E6557] border border-[#DCD0BC] hover:bg-[#FAF1E8]": variant === "ghost",
            "border border-[#3B43F0] text-[#3B43F0] bg-transparent hover:bg-[#E2E2FB]": variant === "outline",
            "bg-[#E2F5EC] text-[#1A7A4A] border border-[#1A7A4A] hover:bg-[#C5EDD8]": variant === "green",
          },
          {
            "px-4 py-2 text-sm": size === "default",
            "px-3 py-1.5 text-xs": size === "sm",
            "px-7 py-3.5 text-base": size === "lg",
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
