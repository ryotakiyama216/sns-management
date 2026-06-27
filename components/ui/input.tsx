import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-md border border-[#DCD0BC] bg-white px-3 py-2 text-sm font-[inherit] text-[#161616] placeholder:text-[#6E6557] focus:outline-none focus:ring-2 focus:ring-[#3B43F0] focus:border-[#3B43F0] disabled:cursor-not-allowed disabled:opacity-50",
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
