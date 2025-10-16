import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Section } from "./section"

export function CTASection() {
    return (
        <Section className="bg-primary text-primary-foreground">
            <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Start your PathWise journey today
                </h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                    Join thousands of professionals who have already transformed their careers
                    with PathWise AI-powered guidance.
                </p>
                <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
                    <Link href="/signup">
                        Get Started Free
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
                <p className="text-sm mt-4 opacity-75">
                    No credit card required • Free forever
                </p>
            </div>
        </Section>
    )
}

