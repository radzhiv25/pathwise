import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

// Chat Message Skeleton
export function ChatMessageSkeleton({ isUser = false }: { isUser?: boolean }) {
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-4 py-3 rounded-lg ${isUser
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border'
                }`}>
                <div className="space-y-2">
                    <Skeleton className={`h-4 w-full ${isUser ? 'bg-primary-foreground/20' : ''}`} />
                    <Skeleton className={`h-4 w-3/4 ${isUser ? 'bg-primary-foreground/20' : ''}`} />
                    <Skeleton className={`h-4 w-1/2 ${isUser ? 'bg-primary-foreground/20' : ''}`} />
                </div>
                <Skeleton className={`h-3 w-16 mt-2 ${isUser ? 'bg-primary-foreground/20' : ''}`} />
            </div>
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

// Sidebar Skeleton
export function SidebarSkeleton() {
    return (
        <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-2 rounded-md">
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-3 w-2/3" />
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
