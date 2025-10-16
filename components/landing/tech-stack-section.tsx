import { Card, CardContent } from "@/components/ui/card"
import {
    Brain,
    Shield,
    Zap,
    Globe,
    Lock,
    MessageSquare,
    BarChart3,
    Users
} from "lucide-react"
import { Section } from "./section"

const technologies = [
    {
        icon: Brain,
        name: "Advanced AI",
        description: "Powered by cutting-edge language models for intelligent career guidance"
    },
    {
        icon: Shield,
        name: "Enterprise Security",
        description: "Bank-level encryption and privacy protection for your data"
    },
    {
        icon: Zap,
        name: "Real-time Processing",
        description: "Instant responses and lightning-fast conversation flow"
    },
    {
        icon: Globe,
        name: "Global Reach",
        description: "Accessible worldwide with multi-language support"
    },
    {
        icon: Lock,
        name: "Privacy First",
        description: "Your conversations are private and never shared with third parties"
    },
    {
        icon: MessageSquare,
        name: "Natural Conversations",
        description: "Human-like interactions that feel personal and engaging"
    },
    {
        icon: BarChart3,
        name: "Data Insights",
        description: "Track your career progress with detailed analytics and reports"
    },
    {
        icon: Users,
        name: "Community Driven",
        description: "Built by career experts and continuously improved by user feedback"
    }
]

export function TechStackSection() {
    return (
        <Section className="bg-muted/30">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Built with <span className="text-primary">PathWise</span> technology
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Cutting-edge AI and modern technology stack powering your career success
                </p>
            </div>

            <div className="columns-1 md:columns-2 space-y-4 gap-6">
                {technologies.map((tech, index) => (
                    <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="p-6">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <tech.icon className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{tech.name}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {tech.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="text-center mt-12">
                <div className="inline-flex items-center space-x-8 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>99.9% Uptime</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Enterprise Grade</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>AI Powered</span>
                    </div>
                </div>
            </div>
        </Section>
    )
}

