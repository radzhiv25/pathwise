// Chat interface components
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessageSkeleton, SidebarSkeleton } from "@/components/ui/skeletons";
import { trpc } from "@/lib/trpc-client";
import { Send, Plus, Trash2, ArrowLeft } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    created_at: string;
}

// Component for rendering AI messages with markdown
const AIMessageContent = ({ content }: { content: string }) => {
    return (
        <div className="prose prose-sm max-w-none dark:prose-invert">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    // Custom styling for different elements
                    h1: ({ children }) => <h1 className="text-sm md:text-lg font-bold mb-2 text-foreground">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-sm md:text-base font-bold mb-2 text-foreground">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-xs md:text-sm font-bold mb-1 text-foreground">{children}</h3>,
                    p: ({ children }) => <p className="mb-2 text-xs md:text-sm text-foreground leading-relaxed">{children}</p>,
                    ul: ({ children, ...props }) => {
                        const isNested = props.className?.includes('contains-task-list') || false;
                        return (
                            <ul className={`list-disc list-outside mb-2 space-y-1 text-xs md:text-sm text-foreground ${isNested ? 'ml-6' : 'ml-4'} pl-2`}>
                                {children}
                            </ul>
                        );
                    },
                    ol: ({ children, ...props }) => {
                        const isNested = props.className?.includes('contains-task-list') || false;
                        return (
                            <ol className={`list-decimal list-outside mb-2 space-y-1 text-xs md:text-sm text-foreground ${isNested ? 'ml-6' : 'ml-4'} pl-2`}>
                                {children}
                            </ol>
                        );
                    },
                    li: ({ children }) => <li className="text-xs md:text-sm text-foreground leading-relaxed">{children}</li>,
                    code: ({ children, className }) => {
                        const isInline = !className;
                        return isInline ? (
                            <code className="bg-muted px-1 py-0.5 rounded text-xs md:text-sm font-mono text-foreground">
                                {children}
                            </code>
                        ) : (
                            <code className={className}>{children}</code>
                        );
                    },
                    pre: ({ children }) => (
                        <pre className="bg-muted p-3 rounded-lg overflow-x-auto text-xs md:text-sm font-mono text-foreground border">
                            {children}
                        </pre>
                    ),
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-muted-foreground pl-4 italic text-xs md:text-sm text-muted-foreground">
                            {children}
                        </blockquote>
                    ),
                    strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
                    em: ({ children }) => <em className="italic text-foreground">{children}</em>,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

interface ChatSession {
    id: string;
    title: string;
    created_at: string;
    updated_at: string;
}

interface ChatInterfaceProps {
    onBackToDashboard?: () => void;
}

export default function ChatInterface({ onBackToDashboard }: ChatInterfaceProps) {
    const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);
    const [localMessages, setLocalMessages] = useState<Message[]>([]);
    const [isStreaming, setIsStreaming] = useState(false);
    const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    // tRPC queries and mutations
    const { data: sessions, refetch: refetchSessions } = trpc.chat.getChatSessions.useQuery();
    const { data: messages } = trpc.chat.getMessages.useQuery(
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
        onSuccess: (data) => {
            // Remove the temporary user message and add the real user message
            setLocalMessages(prev => {
                const withoutTemp = prev.filter(msg => !msg.id.startsWith('temp-'));
                return [...withoutTemp, data.userMessage];
            });

            // Simulate streaming for AI response
            simulateStreamingResponse(data.aiMessage);
            refetchSessions();
        },
        onError: (error) => {
            console.error('Error sending message:', error);
        },
    });

    const simulateStreamingResponse = (aiMessage: Message) => {
        const tempAiMessage: Message = {
            ...aiMessage,
            id: `temp-ai-${Date.now()}`,
            content: '',
        };

        // Add empty AI message first
        setLocalMessages(prev => [...prev, tempAiMessage]);

        let currentIndex = 0;
        const fullText = aiMessage.content;
        const typingSpeed = 20; // milliseconds per character

        const typeInterval = setInterval(() => {
            if (currentIndex < fullText.length) {
                setLocalMessages(prev =>
                    prev.map(msg =>
                        msg.id === tempAiMessage.id
                            ? { ...msg, content: fullText.substring(0, currentIndex + 1) }
                            : msg
                    )
                );
                currentIndex++;
            } else {
                // Replace temp message with real one
                setLocalMessages(prev =>
                    prev.map(msg =>
                        msg.id === tempAiMessage.id ? aiMessage : msg
                    )
                );
                clearInterval(typeInterval);
                setIsStreaming(false);
            }
        }, typingSpeed);
    };

    const deleteSessionMutation = trpc.chat.deleteChatSession.useMutation({
        onSuccess: () => {
            if (selectedSessionId) {
                setSelectedSessionId(null);
                refetchSessions();
            }
        },
    });

    // Sync local messages with server messages
    useEffect(() => {
        if (messages) {
            setLocalMessages(messages);
            setShouldAutoScroll(true); // Auto-scroll when loading a new session
        }
    }, [messages]);

    // Auto-scroll to bottom when new messages arrive (only if user hasn't scrolled up)
    useEffect(() => {
        if (shouldAutoScroll) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [localMessages, isStreaming, shouldAutoScroll]);

    // Handle scroll events to detect when user scrolls up
    useEffect(() => {
        const messagesContainer = messagesContainerRef.current;
        if (!messagesContainer) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = messagesContainer;
            const isAtBottom = scrollHeight - scrollTop - clientHeight < 50; // 50px threshold

            if (isAtBottom) {
                setShouldAutoScroll(true);
            } else {
                setShouldAutoScroll(false);
            }
        };

        messagesContainer.addEventListener('scroll', handleScroll);
        return () => messagesContainer.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSendMessage = async () => {
        if (!newMessage.trim() || !selectedSessionId || isLoading) return;

        const userMessage = newMessage.trim();
        const tempUserMessage: Message = {
            id: `temp-${Date.now()}`,
            role: 'user',
            content: userMessage,
            created_at: new Date().toISOString(),
        };

        // Add user message immediately (optimistic update)
        setLocalMessages(prev => [...prev, tempUserMessage]);
        setNewMessage("");
        setIsLoading(true);
        setIsStreaming(true);
        setShouldAutoScroll(true); // Ensure we scroll to bottom when sending new message

        try {
            await sendMessageMutation.mutateAsync({
                sessionId: selectedSessionId,
                content: userMessage,
            });
        } catch (error) {
            // Remove the optimistic message on error
            setLocalMessages(prev => prev.filter(msg => msg.id !== tempUserMessage.id));
            console.error('Error sending message:', error);
            setIsStreaming(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateNewChat = () => {
        createSessionMutation.mutate({});
    };

    const handleDeleteSession = (sessionId: string) => {
        setSessionToDelete(sessionId);
        setDeleteDialogOpen(true);
    };

    const confirmDeleteSession = async () => {
        if (sessionToDelete) {
            await deleteSessionMutation.mutateAsync({ sessionId: sessionToDelete });
            setDeleteDialogOpen(false);
            setSessionToDelete(null);
        }
    };

    const cancelDeleteSession = () => {
        setDeleteDialogOpen(false);
        setSessionToDelete(null);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <SidebarProvider defaultOpen={false}>
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
                                    {!sessions ? (
                                        <SidebarSkeleton />
                                    ) : (
                                        sessions?.map((session: ChatSession) => (
                                            <SidebarMenuItem key={session.id}>
                                                <div
                                                    className="relative hover:bg-muted/50 rounded-md group"
                                                    onMouseEnter={(e) => {
                                                        const deleteBtn = e.currentTarget.querySelector('.delete-btn');
                                                        if (deleteBtn) {
                                                            deleteBtn.classList.remove('opacity-0');
                                                            deleteBtn.classList.add('opacity-100');
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        const deleteBtn = e.currentTarget.querySelector('.delete-btn');
                                                        if (deleteBtn) {
                                                            deleteBtn.classList.add('opacity-0');
                                                            deleteBtn.classList.remove('opacity-100');
                                                        }
                                                    }}
                                                >
                                                    <SidebarMenuButton
                                                        isActive={selectedSessionId === session.id}
                                                        onClick={() => setSelectedSessionId(session.id)}
                                                        className="w-full justify-start p-2 h-auto pr-8"
                                                    >
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="font-medium text-sm truncate">{session.title}</h3>
                                                            <p className="text-xs text-muted-foreground truncate">
                                                                {new Date(session.updated_at).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </SidebarMenuButton>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteSession(session.id);
                                                        }}
                                                        className="delete-btn absolute right-1 top-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-200 flex-shrink-0 h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                            </SidebarMenuItem>
                                        ))
                                    )}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>

                {/* Main Chat Area */}
                <SidebarInset className="flex-1 flex flex-col min-w-0">
                    {/* Header */}
                    <div className="flex items-center justify-between p-3 border-b border-border bg-background">
                        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                            <SidebarTrigger className="flex-shrink-0" />
                            <button
                                onClick={onBackToDashboard}
                                className="flex items-center space-x-1 text-muted-foreground hover:text-foreground px-2 py-1 rounded-md hover:bg-muted transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span className="hidden sm:inline">Back to Dashboard</span>
                            </button>
                            <h1 className="text-base sm:text-lg md:text-xl font-semibold text-foreground truncate">
                                Career Counseling Chat
                            </h1>
                        </div>
                        <div className="hidden sm:flex items-center text-xs text-muted-foreground">
                            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                <span className="text-xs">⌘</span>B
                            </kbd>
                            <span className="ml-2">to toggle sidebar</span>
                        </div>
                    </div>

                    {selectedSessionId ? (
                        <>
                            {/* Messages */}
                            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto">
                                <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
                                    {!localMessages || localMessages.length === 0 ? (
                                        <>
                                            <ChatMessageSkeleton isUser={false} />
                                            <ChatMessageSkeleton isUser={true} />
                                            <ChatMessageSkeleton isUser={false} />
                                        </>
                                    ) : (
                                        localMessages?.map((message: Message) => (
                                            <div
                                                key={message.id}
                                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div
                                                    className={`max-w-[80%] px-4 py-3 rounded-lg ${message.role === 'user'
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'bg-card border border-border'
                                                        }`}
                                                >
                                                    {message.role === 'assistant' ? (
                                                        <AIMessageContent content={message.content} />
                                                    ) : (
                                                        <p className="md:text-sm text-xs break-words">{message.content}</p>
                                                    )}
                                                    <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                                                        }`}>
                                                        {new Date(message.created_at).toLocaleTimeString()}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    )}

                                    {(isLoading || isStreaming) && (
                                        <ChatMessageSkeleton isUser={false} />
                                    )}

                                    <div ref={messagesEndRef} />
                                </div>
                            </div>

                            {/* Message Input */}
                            <div className="border-t border-border bg-background">
                                <div className="max-w-4xl mx-auto px-4 py-4">
                                    <div className="flex items-center space-x-2 w-full">
                                        <Input
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder="Ask about your career..."
                                            disabled={isLoading}

                                        />
                                        <Button
                                            onClick={handleSendMessage}
                                            disabled={!newMessage.trim() || isLoading}
                                            size="icon"
                                            className="px-2"
                                        >
                                            <Send className="size-5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="max-w-4xl mx-auto px-4 py-6">
                                <div className="text-center">
                                    <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Welcome!</h2>
                                    <p className="text-sm sm:text-base text-muted-foreground mb-4">Start a new conversation to get personalized career advice</p>
                                    <Button onClick={handleCreateNewChat} className="w-max">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Start New Chat
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </SidebarInset>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Chat Session</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this chat session? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={cancelDeleteSession}
                            disabled={deleteSessionMutation.isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDeleteSession}
                            disabled={deleteSessionMutation.isPending}
                        >
                            {deleteSessionMutation.isPending ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </SidebarProvider>
    );
}
