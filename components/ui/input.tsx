import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-lg bg-[#f8f8f8] px-3 py-2.5 text-sm text-[#0a0a0a] placeholder:text-[#bbb] focus:outline-none focus:ring-1 focus:ring-[#0a0a0a] disabled:opacity-50 font-[inherit]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }