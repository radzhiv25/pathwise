import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, History, Smartphone, Shield } from "lucide-react"
import { Section } from "./section"

const features = [
    {
        icon: Brain,
        title: "Smart Career Advice",
        description: "Get personalized recommendations based on your skills, interests, and career goals using advanced AI technology."
    },
    {
        icon: History,
        title: "Message History",
        description: "Access your previous conversations and track your career development journey over time."
    },
    {
        icon: Smartphone,
        title: "Cross-Device Access",
        description: "Continue your career conversations seamlessly across desktop, tablet, and mobile devices."
    },
    {
        icon: Shield,
        title: "Secure & Private",
        description: "Your conversations are encrypted and private. We never share your personal information with third parties."
    }
]

export function FeaturesSection() {
    return (
        <Section className="bg-muted/30">
            <div className="text-center mb-12 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
                    Everything you need for
                    <br />
                    <span className="text-primary">career success with PathWise</span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                    PathWise AI provides comprehensive career guidance tailored to your unique situation and goals.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {features.map((feature, index) => (
                    <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                        <CardHeader className="pb-4">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                                <feature.icon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                            </div>
                            <CardTitle className="text-lg md:text-xl">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <CardDescription className="text-sm md:text-base leading-relaxed">
                                {feature.description}
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </Section>
    )
}

