// Chat interface components
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc-client";
import { Send, Plus, Trash2 } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    created_at: string;
}

interface ChatSession {
    id: string;
    title: string;
    created_at: string;
    updated_at: string;
}

export default function ChatInterface() {
    const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // tRPC queries and mutations
    const { data: sessions, refetch: refetchSessions } = trpc.chat.getChatSessions.useQuery();
    const { data: messages, refetch: refetchMessages } = trpc.chat.getMessages.useQuery(
        { sessionId: selectedSessionId! },
        { enabled: !!selectedSessionId }
    );

    const createSessionMutation = trpc.chat.createChatSession.useMutation({
        onSuccess: (newSession) => {
            setSelectedSessionId(newSession.id);
            refetchSessions();
        },
    });

    const sendMessageMutation = trpc.chat.sendMessage.useMutation({
        onSuccess: () => {
            setNewMessage("");
            refetchMessages();
            refetchSessions();
        },
        onError: (error) => {
            console.error('Error sending message:', error);
        },
    });

    const deleteSessionMutation = trpc.chat.deleteChatSession.useMutation({
        onSuccess: () => {
            if (selectedSessionId) {
                setSelectedSessionId(null);
                refetchSessions();
            }
        },
    });

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!newMessage.trim() || !selectedSessionId || isLoading) return;

        setIsLoading(true);
        try {
            await sendMessageMutation.mutateAsync({
                sessionId: selectedSessionId,
                content: newMessage.trim(),
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateNewChat = () => {
        createSessionMutation.mutate({});
    };

    const handleDeleteSession = async (sessionId: string) => {
        if (confirm("Are you sure you want to delete this chat?")) {
            await deleteSessionMutation.mutateAsync({ sessionId });
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <SidebarProvider>
            <div className="flex h-screen w-full bg-background">
                {/* Sidebar */}
                <Sidebar>
                    <SidebarHeader className="p-2 border-b border-border">
                        <Button
                            onClick={handleCreateNewChat}
                            className="w-full"
                            disabled={createSessionMutation.isPending}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            New Chat
                        </Button>
                    </SidebarHeader>

                    <SidebarContent className="p-2">
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {sessions?.map((session: ChatSession) => (
                                        <SidebarMenuItem key={session.id}>
                                            <SidebarMenuButton
                                                isActive={selectedSessionId === session.id}
                                                onClick={() => setSelectedSessionId(session.id)}
                                                className="w-full justify-start p-2 h-auto"
                                            >
                                                <div className="flex items-center justify-between w-full min-w-0">
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-medium text-sm truncate">{session.title}</h3>
                                                        <p className="text-xs text-muted-foreground truncate">
                                                            {new Date(session.updated_at).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteSession(session.id);
                                                        }}
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 flex-shrink-0"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>

                {/* Main Chat Area */}
                <SidebarInset className="flex-1 flex flex-col min-w-0">
                    {/* Header */}
                    <div className="flex items-center justify-between p-2 sm:p-4 border-b border-border bg-background">
                        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                            <SidebarTrigger className="md:hidden flex-shrink-0" />
                            <h1 className="text-base sm:text-lg md:text-xl font-semibold text-foreground truncate">
                                Career Counseling Chat
                            </h1>
                        </div>
                        <Button variant="outline" size="sm" className="hidden md:flex flex-shrink-0">
                            Back to Dashboard
                        </Button>
                    </div>

                    {selectedSessionId ? (
                        <>
                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4">
                                {messages?.map((message: Message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[85%] sm:max-w-sm md:max-w-md lg:max-w-lg px-3 sm:px-4 py-2 rounded-lg ${message.role === 'user'
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-card border border-border'
                                                }`}
                                        >
                                            <p className="text-sm break-words">{message.content}</p>
                                            <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                                                }`}>
                                                {new Date(message.created_at).toLocaleTimeString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-card border border-border px-4 py-2 rounded-lg">
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>

                            {/* Message Input */}
                            <div className="border-t border-border p-2 sm:p-4 bg-background">
                                <div className="flex space-x-2 w-full">
                                    <Input
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Ask about your career..."
                                        disabled={isLoading}
                                        className="flex-1 min-w-0"
                                    />
                                    <Button
                                        onClick={handleSendMessage}
                                        disabled={!newMessage.trim() || isLoading}
                                        size="sm"
                                        className="flex-shrink-0"
                                    >
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center p-2 sm:p-4">
                            <div className="text-center w-full max-w-md">
                                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Welcome to Career Counseling</h2>
                                <p className="text-sm sm:text-base text-muted-foreground mb-4 px-4">Start a new conversation to get personalized career advice</p>
                                <Button onClick={handleCreateNewChat} className="w-full sm:w-auto">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Start New Chat
                                </Button>
                            </div>
                        </div>
                    )}
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
