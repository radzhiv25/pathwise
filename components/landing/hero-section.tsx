"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Route, Send } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
    return (
        <div className="mt-10 min-h-screen flex items-center justify-center bg-background text-foreground">
            <div className="max-w-3xl mx-auto px-4 text-center">
                <div className="space-y-6 md:space-y-8">
                    {/* Main Headline */}
                    <div className="space-y-3 md:space-y-4 leading-tight">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight">
                            Find Your Path.
                            <br />
                            <span className="text-primary">Talk to PathWise</span>
                            <br />
                            AI Career Counselor.
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-tight">
                            Get personalized career guidance powered by PathWise AI. Discover your strengths,
                            explore opportunities, and make informed decisions about your future.
                        </p>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
                        <Button asChild size="lg" className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 w-full sm:w-auto">
                            <Link href="/login">
                                Start Chat
                                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                            </Link>
                        </Button>
                        {/* <Button asChild variant="outline" size="lg" className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 w-full sm:w-auto">
                            <Link href="#demo">
                                <Play className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                                View Demo
                            </Link>
                        </Button> */}
                    </div>

                    {/* Chat Interface Mockup */}
                    <div className="mt-12 md:mt-16 relative">
                        <div className="bg-card border border-border rounded-2xl p-4 md:p-6 shadow-2xl max-w-2xl mx-auto">
                            <div className="space-y-3 md:space-y-4">
                                {/* Chat Header */}
                                <div className="flex items-center space-x-3 pb-3 md:pb-4 border-b border-border">
                                    <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-full flex items-center justify-center">
                                        <Route className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
                                    </div>
                                    <div className="flex flex-col items-start min-w-0">
                                        <h3 className="font-semibold text-foreground text-sm md:text-base">PathWise AI</h3>
                                        <p className="text-xs md:text-sm text-muted-foreground">Career Counselor • Online now</p>
                                    </div>
                                </div>

                                {/* Chat Messages */}
                                <div className="space-y-3 md:space-y-4">
                                    <div className="flex justify-start">
                                        <div className="bg-muted rounded-lg p-3 md:p-4 max-w-[85%] sm:max-w-sm">
                                            <p className="text-xs md:text-sm">Hi! I&apos;m PathWise, your AI career counselor. What would you like to explore today?</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <div className="bg-primary text-primary-foreground rounded-lg p-3 md:p-4 max-w-[85%] sm:max-w-sm">
                                            <p className="text-xs md:text-sm">I&apos;m interested in transitioning to tech. What skills should I focus on?</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-start">
                                        <div className="bg-muted rounded-lg p-3 md:p-4 max-w-[85%] sm:max-w-sm">
                                            <p className="text-xs md:text-sm">Great question! Based on your background, I&apos;d recommend starting with...</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Input Area */}
                                <div className="flex items-center space-x-2 pt-3 md:pt-4 border-t border-border">
                                    <div className="flex-1 bg-muted rounded-lg px-3 md:px-4 py-2 text-xs md:text-sm text-muted-foreground">
                                        Ask PathWise anything...
                                    </div>
                                    <Button size="sm" className="px-2 md:px-3">
                                        <Send className="h-3 w-3 md:h-4 md:w-4" />
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

