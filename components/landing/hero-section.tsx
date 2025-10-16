"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle, Play } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
            <div className="max-w-3xl mx-auto px-4 text-center">
                <div className="space-y-8">
                    {/* Main Headline */}
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                            Find Your Path.
                            <br />
                            <span className="text-primary">Talk to PathWise</span>
                            <br />
                            AI Career Counselor.
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                            Get personalized career guidance powered by PathWise AI. Discover your strengths,
                            explore opportunities, and make informed decisions about your future.
                        </p>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button asChild size="lg" className="text-lg px-8 py-6">
                            <Link href="/chat">
                                Start Chat
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                            <Link href="#demo">
                                <Play className="mr-2 h-5 w-5" />
                                View Demo
                            </Link>
                        </Button>
                    </div>

                    {/* Chat Interface Mockup */}
                    <div className="mt-16 relative">
                        <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-2xl mx-auto">
                            <div className="space-y-4">
                                {/* Chat Header */}
                                <div className="flex items-center space-x-3 pb-4 border-b border-border">
                                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                        <MessageCircle className="h-5 w-5 text-primary-foreground" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">PathWise AI</h3>
                                        <p className="text-sm text-muted-foreground">Career Counselor • Online now</p>
                                    </div>
                                </div>

                                {/* Chat Messages */}
                                <div className="space-y-4">
                                    <div className="flex justify-start">
                                        <div className="bg-muted rounded-lg p-4 max-w-sm">
                                            <p className="text-sm">Hi! I&apos;m PathWise, your AI career counselor. What would you like to explore today?</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <div className="bg-primary text-primary-foreground rounded-lg p-4 max-w-sm">
                                            <p className="text-sm">I&apos;m interested in transitioning to tech. What skills should I focus on?</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-start">
                                        <div className="bg-muted rounded-lg p-4 max-w-sm">
                                            <p className="text-sm">Great question! Based on your background, I&apos;d recommend starting with...</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Input Area */}
                                <div className="flex space-x-2 pt-4 border-t border-border">
                                    <div className="flex-1 bg-muted rounded-lg px-4 py-2 text-sm text-muted-foreground">
                                        Ask PathWise anything...
                                    </div>
                                    <Button size="sm">
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

