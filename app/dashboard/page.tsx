"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ChatInterface from "@/components/chat/ChatInterface";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { DashboardCardSkeleton, ChatSessionSkeleton, StatsSkeleton } from "@/components/ui/skeletons";
import { trpc } from "@/lib/trpc-client";
import { useAuth } from "@/hooks/useAuth";

const DashboardPage = () => {
    const [showChat, setShowChat] = useState(false);
    const router = useRouter();
    const { user, loading, isAuthenticated, logout } = useAuth();

    // Fetch chat sessions data
    const { data: chatSessions, isLoading: sessionsLoading } = trpc.chat.getChatSessions.useQuery();

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login');
        }
    }, [loading, isAuthenticated, router]);

    const handleLogout = async () => {
        await logout();
    };

    // Don't render anything if not authenticated (will redirect)
    if (!loading && !isAuthenticated) {
        return null;
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-background py-8">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Header Skeleton */}
                    <div className="flex justify-between items-center mb-8">
                        <div className="space-y-2">
                            <div className="h-8 w-48 bg-muted animate-pulse rounded"></div>
                            <div className="h-4 w-32 bg-muted animate-pulse rounded"></div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-muted animate-pulse rounded"></div>
                            <div className="h-8 w-16 bg-muted animate-pulse rounded"></div>
                        </div>
                    </div>

                    {/* Dashboard Content Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <DashboardCardSkeleton />
                        <DashboardCardSkeleton />
                        <DashboardCardSkeleton />
                    </div>

                    {/* Chat Preview Card Skeleton */}
                    <div className="mt-8">
                        <DashboardCardSkeleton />
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect to login
    }

    if (showChat) {
        return (
            <div className="h-screen w-full">
                {/* <div className="flex justify-between items-center p-2 bg-background border-b border-border">
                    <h1 className="text-xl font-semibold text-foreground">Career Counseling Chat</h1>
                    <Button
                        variant="outline"
                        onClick={() => setShowChat(false)}
                        className="transition-colors duration-200"
                    >
                        Back to Dashboard
                    </Button>
                </div> */}
                <div className="h-[calc(100vh-80px)] w-full">
                    <ChatInterface onBackToDashboard={() => setShowChat(false)} />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                        <p className="text-muted-foreground">Welcome back, {user.name}!</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <AnimatedThemeToggler className="p-1 rounded-md border border-border hover:bg-muted transition-colors" />
                        <Button
                            variant="outline"
                            onClick={handleLogout}
                            className="transition-colors duration-200"
                        >
                            Logout
                        </Button>
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* User Info Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Your account details</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div>
                                    <span className="font-medium">Name:</span>
                                    <p className="text-muted-foreground">{user.name}</p>
                                </div>
                                <div>
                                    <span className="font-medium">Email:</span>
                                    <p className="text-muted-foreground">{user.email}</p>
                                </div>
                                <div>
                                    <span className="font-medium">User ID:</span>
                                    <p className="text-muted-foreground text-sm font-mono">{user.id}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Chat Sessions Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Chat Sessions</CardTitle>
                            <CardDescription>Your last 3 conversations</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {sessionsLoading ? (
                                    <>
                                        <ChatSessionSkeleton />
                                        <ChatSessionSkeleton />
                                        <ChatSessionSkeleton />
                                    </>
                                ) : chatSessions && chatSessions.length > 0 ? (
                                    chatSessions.slice(0, 3).map((session) => (
                                        <div
                                            key={session.id}
                                            className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                                            onClick={() => setShowChat(true)}
                                        >
                                            <div className="font-medium text-sm truncate">
                                                {session.title}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {new Date(session.updated_at).toLocaleDateString()}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {session.chat_messages?.[0]?.count || 0} messages
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-muted-foreground">
                                        No chat sessions yet
                                    </div>
                                )}
                                <Button
                                    className="w-max"
                                    variant="outline"
                                    onClick={() => setShowChat(true)}
                                >
                                    Start Career Chat
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Chat Stats Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Chat Statistics</CardTitle>
                            <CardDescription>Your chat activity summary</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {sessionsLoading ? (
                                <StatsSkeleton />
                            ) : (
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Total Sessions:</span>
                                        <span className="font-medium">
                                            {chatSessions?.length || 0}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Total Messages:</span>
                                        <span className="font-medium">
                                            {chatSessions?.reduce((total, session) =>
                                                total + (session.chat_messages?.[0]?.count || 0), 0
                                            ) || 0}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Last Active:</span>
                                        <span className="font-medium text-sm">
                                            {chatSessions && chatSessions.length > 0
                                                ? new Date(chatSessions[0].updated_at).toLocaleDateString()
                                                : "Never"
                                            }
                                        </span>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Chat Preview Card */}
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>AI Career Counselor</CardTitle>
                        <CardDescription>Get personalized career guidance</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <p className="text-muted-foreground">
                                Get expert career advice tailored to your goals and aspirations.
                            </p>
                            <div className="flex justify-start">
                                <Button
                                    onClick={() => setShowChat(true)}
                                    className="w-max"
                                >
                                    Start Career Chat
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;