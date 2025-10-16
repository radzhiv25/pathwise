import { Card, CardContent } from "@/components/ui/card"
import { UserPlus, MessageCircle, Target } from "lucide-react"
import { Section } from "./section"

const steps = [
    {
        number: "01",
        icon: UserPlus,
        title: "Sign Up",
        description: "Create your free account in seconds. No credit card required."
    },
    {
        number: "02",
        icon: MessageCircle,
        title: "Chat",
        description: "Start a conversation with your AI career counselor about your goals and aspirations."
    },
    {
        number: "03",
        icon: Target,
        title: "Get Guidance",
        description: "Receive personalized advice, action plans, and resources to advance your career."
    }
]

export function HowItWorksSection() {
    return (
        <Section>
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    How it works
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Get started with your career journey in three simple steps
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                    <div key={index} className="relative">
                        <Card className="text-center h-full hover:shadow-lg transition-shadow duration-300">
                            <CardContent className="p-8">
                                <div className="relative mb-6">
                                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <step.icon className="h-10 w-10 text-primary" />
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                                        {step.number}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {step.description}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Arrow connector for desktop */}
                        {index < steps.length - 1 && (
                            <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                                <div className="w-8 h-0.5 bg-border"></div>
                                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-border border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </Section>
    )
}


