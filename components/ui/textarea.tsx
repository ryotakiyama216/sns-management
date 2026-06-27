import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex w-full rounded-lg bg-[#f8f8f8] px-3 py-2.5 text-sm text-[#0a0a0a] placeholder:text-[#bbb] focus:outline-none focus:ring-1 focus:ring-[#0a0a0a] disabled:opacity-50 resize-y font-[inherit]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }