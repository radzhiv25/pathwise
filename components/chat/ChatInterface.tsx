// Chat interface components
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc-client";
import { Send, Plus, Trash2 } from "lucide-react";

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
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <Button
                        onClick={handleCreateNewChat}
                        className="w-full"
                        disabled={createSessionMutation.isPending}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        New Chat
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-2">
                        {sessions?.map((session: ChatSession) => (
                            <div
                                key={session.id}
                                className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedSessionId === session.id
                                        ? 'bg-blue-50 border border-blue-200'
                                        : 'hover:bg-gray-50'
                                    }`}
                                onClick={() => setSelectedSessionId(session.id)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-sm truncate">{session.title}</h3>
                                        <p className="text-xs text-gray-500">
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
                                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {selectedSessionId ? (
                    <>
                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages?.map((message: Message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.role === 'user'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-white border border-gray-200'
                                            }`}
                                    >
                                        <p className="text-sm">{message.content}</p>
                                        <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                                            }`}>
                                            {new Date(message.created_at).toLocaleTimeString()}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Message Input */}
                        <div className="border-t border-gray-200 p-4">
                            <div className="flex space-x-2">
                                <Input
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask about your career..."
                                    disabled={isLoading}
                                    className="flex-1"
                                />
                                <Button
                                    onClick={handleSendMessage}
                                    disabled={!newMessage.trim() || isLoading}
                                    size="sm"
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Career Counseling</h2>
                            <p className="text-gray-600 mb-4">Start a new conversation to get personalized career advice</p>
                            <Button onClick={handleCreateNewChat}>
                                <Plus className="w-4 h-4 mr-2" />
                                Start New Chat
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
