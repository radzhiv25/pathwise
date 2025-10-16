"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService, AuthUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ChatInterface from "@/components/chat/ChatInterface";

const DashboardPage = () => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [showChat, setShowChat] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const { user, error } = await authService.getCurrentUser();
            if (error || !user) {
                router.push('/login');
            } else {
                setUser(user);
            }
            setLoading(false);
        };

        checkUser();
    }, [router]);

    const handleLogout = async () => {
        const { error } = await authService.signOut();
        if (!error) {
            router.push('/');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-foreground">Loading...</p>
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
                <div className="flex justify-between items-center p-4 bg-background border-b border-border">
                    <h1 className="text-xl font-semibold text-foreground">Career Counseling Chat</h1>
                    <Button
                        variant="outline"
                        onClick={() => setShowChat(false)}
                        className="transition-colors duration-200"
                    >
                        Back to Dashboard
                    </Button>
                </div>
                <div className="h-[calc(100vh-80px)] w-full">
                    <ChatInterface />
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
                    <Button
                        variant="outline"
                        onClick={handleLogout}
                        className="transition-colors duration-200"
                    >
                        Logout
                    </Button>
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

                    {/* Quick Actions Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>Common tasks</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <Button
                                    className="w-full"
                                    variant="outline"
                                    onClick={() => setShowChat(true)}
                                >
                                    Start Career Chat
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Stats</CardTitle>
                            <CardDescription>Your activity summary</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Status:</span>
                                    <span className="font-medium text-green-600 dark:text-green-400">Active</span>
                                </div>
                            </div>
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
                            <Button
                                onClick={() => setShowChat(true)}
                                className="w-full"
                            >
                                Start Career Chat
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;