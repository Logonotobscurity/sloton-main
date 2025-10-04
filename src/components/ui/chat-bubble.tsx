
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const chatBubbleVariants = cva("flex items-start gap-3", {
  variants: {
    variant: {
      sent: "flex-row-reverse",
      received: "flex-row",
    },
  },
  defaultVariants: {
    variant: "received",
  },
})

const ChatBubbleContext = React.createContext<{
  variant?: "sent" | "received"
}>({})

const ChatBubble = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof chatBubbleVariants>
>(({ className, variant, ...props }, ref) => (
  <ChatBubbleContext.Provider value={{ variant }}>
    <div
      ref={ref}
      className={cn(chatBubbleVariants({ variant }), className)}
      {...props}
    />
  </ChatBubbleContext.Provider>
))
ChatBubble.displayName = "ChatBubble"

const ChatBubbleMessage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    isLoading?: boolean
  }
>(({ className, isLoading, children, ...props }, ref) => {
  const { variant } = React.useContext(ChatBubbleContext)
  return (
    <div
      ref={ref}
      className={cn(
        "relative rounded-xl px-4 py-3 text-sm max-w-[80%]",
        variant === "sent"
          ? "bg-primary text-primary-foreground rounded-br-none"
          : "bg-secondary text-secondary-foreground rounded-bl-none",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-[bounce_1s_infinite] rounded-full bg-current" />
          <span className="h-1.5 w-1.5 animate-[bounce_1s_infinite_200ms] rounded-full bg-current" />
          <span className="h-1.5 w-1.5 animate-[bounce_1s_infinite_400ms] rounded-full bg-current" />
        </div>
      ) : (
        children
      )}
    </div>
  )
})
ChatBubbleMessage.displayName = "ChatBubbleMessage"

const ChatBubbleAvatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("h-8 w-8 shrink-0", className)}
    {...props}
  />
))
ChatBubbleAvatar.displayName = "ChatBubbleAvatar"

export { ChatBubble, ChatBubbleMessage, ChatBubbleAvatar }
