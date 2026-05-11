import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function ShimmerBar({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "sidebar";
}) {
  return (
    <div
      className={cn(
        "h-3 overflow-hidden",
        variant === "sidebar" ? "chat-shimmer-line-subtle" : "chat-shimmer-line",
        className
      )}
      aria-hidden
    />
  );
}

// Dashboard Card Skeleton
export function DashboardCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Chat Session Skeleton
export function ChatSessionSkeleton() {
  return (
    <div className="p-3 border rounded-lg">
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-3 w-1/2 mb-1" />
      <Skeleton className="h-3 w-1/3" />
    </div>
  );
}

function AssistantBubbleSkeleton({ lines }: { lines: string[] }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[min(100%,42rem)] w-full space-y-2.5 rounded-2xl border border-border bg-card/80 px-4 py-3.5 shadow-sm backdrop-blur-sm">
        {lines.map((width, i) => (
          <ShimmerBar key={i} className={width} />
        ))}
      </div>
    </div>
  );
}

function UserBubbleSkeleton({ width }: { width: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] space-y-2 rounded-2xl bg-primary/15 px-4 py-3 ring-1 ring-primary/20 dark:bg-primary/10">
        <ShimmerBar className={cn(width, "opacity-90")} />
        <ShimmerBar className="w-3/5 opacity-70" />
      </div>
    </div>
  );
}

/** Full thread placeholder while messages are loading (ChatGPT-style). */
export function ChatConversationSkeleton() {
  return (
    <div className="space-y-8 animate-in fade-in-0 duration-300">
      <AssistantBubbleSkeleton lines={["w-[92%]", "w-full", "w-[88%]", "w-4/5", "w-3/5"]} />
      <UserBubbleSkeleton width="w-[72%]" />
      <AssistantBubbleSkeleton lines={["w-full", "w-[94%]", "w-2/3"]} />
    </div>
  );
}

/** Compact row at bottom while assistant is “typing” (Claude-style dots + shimmer). */
export function ChatTypingSkeleton() {
  return (
    <div className="flex justify-start pt-1 animate-in fade-in-0 duration-200">
      <div className="max-w-[min(100%,42rem)] w-full rounded-2xl border border-border bg-card/80 px-4 py-3 shadow-sm backdrop-blur-sm">
        <div className="mb-3 flex items-center gap-1.5 px-0.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="chat-typing-dot size-2 rounded-full bg-muted-foreground/50"
              style={{ animationDelay: `${i * 0.16}s` }}
            />
          ))}
        </div>
        <div className="space-y-2">
          <ShimmerBar className="w-full" />
          <ShimmerBar className="w-[90%]" />
          <ShimmerBar className="w-2/5" />
        </div>
      </div>
    </div>
  );
}

/** @deprecated Prefer ChatConversationSkeleton or ChatTypingSkeleton for chat UI. */
export function ChatMessageSkeleton({ isUser = false }: { isUser?: boolean }) {
  if (isUser) {
    return <UserBubbleSkeleton width="w-4/5" />;
  }
  return (
    <div className="space-y-6">
      <AssistantBubbleSkeleton lines={["w-full", "w-[92%]", "w-3/4"]} />
    </div>
  );
}

// User Profile Skeleton
export function UserProfileSkeleton() {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="flex items-center space-x-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-40" />
      </div>
      <div className="flex items-center space-x-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
  );
}

// Stats Skeleton
export function StatsSkeleton() {
  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-8" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-8" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}

// Sidebar Skeleton (session list)
export function SidebarSkeleton() {
  return (
    <div className="space-y-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="rounded-lg border border-sidebar-border/60 bg-sidebar-accent/20 px-2.5 py-2.5"
        >
          <ShimmerBar variant="sidebar" className="mb-2 h-3.5 w-[88%]" />
          <ShimmerBar variant="sidebar" className="h-2.5 w-24 opacity-80" />
        </div>
      ))}
    </div>
  );
}

// Form Field Skeleton
export function FormFieldSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

// Button Skeleton
export function ButtonSkeleton({ className = "" }: { className?: string }) {
  return <Skeleton className={`h-10 w-24 ${className}`} />;
}
