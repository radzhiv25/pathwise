import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Section } from "./section"

export function CTASection() {
    return (
        <Section className="bg-primary text-primary-foreground">
            <div className="text-center px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                    Start your PathWise journey today
                </h2>
                <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto opacity-90">
                    Join thousands of professionals who have already transformed their careers
                    with PathWise AI-powered guidance.
                </p>
                <Button asChild size="lg" variant="secondary" className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 w-full sm:w-auto">
                    <Link href="/signup">
                        Get Started Free
                        <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                    </Link>
                </Button>
                <p className="text-xs md:text-sm mt-3 md:mt-4 opacity-75">
                    No credit card required • Free forever
                </p>
            </div>
        </Section>
    )
}

