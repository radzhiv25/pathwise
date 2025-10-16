"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Section } from "./section"

const demoConversations = [
    {
        id: 1,
        title: "Career Transition",
        messages: [
            { role: "user", content: "I want to transition from marketing to software development. Where should I start?" },
            { role: "ai", content: "Great question! Let's start by assessing your current skills and interests. What programming languages or technologies have you worked with before?" },
            { role: "user", content: "I have some experience with HTML/CSS and basic JavaScript from my marketing work." },
            { role: "ai", content: "Perfect! You have a solid foundation. I recommend focusing on React and Node.js, plus building 2-3 portfolio projects to showcase your skills." }
        ]
    },
    {
        id: 2,
        title: "Salary Negotiation",
        messages: [
            { role: "user", content: "I have a job offer but I think I'm being lowballed. How should I negotiate?" },
            { role: "ai", content: "Salary negotiation is crucial! Research market rates for your role and experience level. What's the offer and what's your target range?" },
            { role: "user", content: "They offered $75k but I was hoping for $85-90k based on my research." },
            { role: "ai", content: "That's a reasonable target. Frame your counter-offer around your value proposition and market data. Would you like me to help you draft a negotiation email?" }
        ]
    },
    {
        id: 3,
        title: "Skill Development",
        messages: [
            { role: "user", content: "I want to improve my leadership skills for a management role." },
            { role: "ai", content: "Excellent goal! Leadership development is multifaceted. What's your current experience level with team management?" },
            { role: "user", content: "I've led small projects but never managed people directly." },
            { role: "ai", content: "I recommend starting with mentorship opportunities, taking on cross-functional projects, and developing emotional intelligence. Let's create a 6-month development plan." }
        ]
    }
]

export function DemoSection() {
    const [currentDemo, setCurrentDemo] = useState(0)

    const nextDemo = () => {
        setCurrentDemo((prev) => (prev + 1) % demoConversations.length)
    }

    const prevDemo = () => {
        setCurrentDemo((prev) => (prev - 1 + demoConversations.length) % demoConversations.length)
    }

    return (
        <Section id="demo" className="bg-muted/30">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    See PathWise in action
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Explore real conversations and see how PathWise AI can help guide your career journey
                </p>
            </div>

            <div className="max-w-4xl mx-auto">
                {/* Demo Navigation */}
                <div className="flex justify-center mb-8">
                    <div className="flex space-x-2">
                        {demoConversations.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentDemo(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${index === currentDemo ? "bg-primary" : "bg-muted-foreground/30"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Demo Chat Interface */}
                <Card className="shadow-2xl">
                    <CardContent className="p-0">
                        <div className="bg-card border-b border-border p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                        <MessageCircle className="h-5 w-5 text-primary-foreground" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">
                                            {demoConversations[currentDemo].title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">PathWise AI Career Counselor</p>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <Button variant="ghost" size="sm" onClick={prevDemo}>
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={nextDemo}>
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 space-y-4 min-h-[300px]">
                            {demoConversations[currentDemo].messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-md px-4 py-3 rounded-lg ${message.role === "user"
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted text-foreground"
                                            }`}
                                    >
                                        <p className="text-sm">{message.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-border bg-muted/30">
                            <div className="flex space-x-2">
                                <div className="flex-1 bg-background border border-border rounded-lg px-4 py-2 text-sm text-muted-foreground">
                                    Ask PathWise anything...
                                </div>
                                <Button size="sm">
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Demo CTA */}
                <div className="text-center mt-8">
                    <Button asChild size="lg" className="text-lg px-8 py-6">
                        <a href="/chat">
                            Try PathWise yourself
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </a>
                    </Button>
                </div>
            </div>
        </Section>
    )
}

