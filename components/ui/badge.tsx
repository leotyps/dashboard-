// components/ui/badge.tsx
import { cn } from "@/lib/utils"

export function Badge({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode
  className?: string
  variant?: "default" | "destructive"
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold",
        variant === "destructive"
          ? "bg-red-500 text-white"
          : "bg-muted text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  )
}
