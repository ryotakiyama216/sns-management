import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative bg-[#FEFAF5] border border-[#DCD0BC] rounded-lg p-5",
        "before:content-[''] before:absolute before:top-[7px] before:left-[7px] before:w-[10px] before:h-[10px] before:border-t-[1.5px] before:border-l-[1.5px] before:border-[#3B43F0] before:opacity-50",
        "after:content-[''] after:absolute after:bottom-[7px] after:right-[7px] after:w-[10px] after:h-[10px] after:border-b-[1.5px] after:border-r-[1.5px] after:border-[#3B43F0] after:opacity-50",
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-xs font-bold text-[#6E6557] tracking-widest mb-3", className)} {...props} />
  )
)
CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

export { Card, CardTitle, CardContent }
