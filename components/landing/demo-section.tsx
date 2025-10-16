"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, ChevronLeft, ChevronRight, Route, Send } from "lucide-react"
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
    const router = useRouter()

    const nextDemo = () => {
        setCurrentDemo((prev) => (prev + 1) % demoConversations.length)
    }

    const prevDemo = () => {
        setCurrentDemo((prev) => (prev - 1 + demoConversations.length) % demoConversations.length)
    }

    const handleTryPathWise = () => {
        router.push('/login')
    }

    return (
        <Section id="demo" className="bg-muted/30">
            <div className="text-center mb-12 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
                    See PathWise in action
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                    Explore real conversations and see how PathWise AI can help guide your career journey
                </p>
            </div>

            <div className="max-w-4xl mx-auto px-4">
                {/* Demo Navigation */}
                <div className="flex justify-center mb-6 md:mb-8">
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
                        <div className="bg-card border-b border-border p-3 md:p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2 md:space-x-3 min-w-0 flex-1">
                                    <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                                        <Route className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-semibold text-foreground text-sm md:text-base truncate">
                                            {demoConversations[currentDemo].title}
                                        </h3>
                                        <p className="text-xs md:text-sm text-muted-foreground">PathWise AI Career Counselor</p>
                                    </div>
                                </div>
                                <div className="flex space-x-1 md:space-x-2 flex-shrink-0">
                                    <Button variant="ghost" size="sm" onClick={prevDemo} className="h-8 w-8 p-0">
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={nextDemo} className="h-8 w-8 p-0">
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 md:p-6 space-y-3 md:space-y-4 min-h-[250px] md:min-h-[300px]">
                            {demoConversations[currentDemo].messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] sm:max-w-md px-3 md:px-4 py-2 md:py-3 rounded-lg ${message.role === "user"
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted text-foreground"
                                            }`}
                                    >
                                        <p className="text-xs md:text-sm leading-relaxed">{message.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-3 md:p-4 border-t border-border bg-muted/30 ">
                            <div className="flex space-x-2 items-center">
                                <div className="flex-1 bg-background border border-border rounded-lg px-3 md:px-4 py-2 text-xs md:text-sm text-muted-foreground">
                                    Ask PathWise anything...
                                </div>
                                <Button size="sm" className="px-2 md:px-3">
                                    <Send className="h-3 w-3 md:h-4 md:w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Demo CTA */}
                <div className="text-center mt-6 md:mt-8">
                    <Button
                        onClick={handleTryPathWise}
                        size="lg"
                        className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 w-full sm:w-auto"
                    >
                        Try PathWise yourself
                        <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                    </Button>
                </div>
            </div>
        </Section>
    )
}

