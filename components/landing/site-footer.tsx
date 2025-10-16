import Link from "next/link"
import { Section } from "./section"

export function SiteFooter() {
    return (
        <footer className="bg-muted/30 border-t border-border">
            <Section className="py-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold text-foreground mb-2">PathWise</h3>
                        <p className="text-sm text-muted-foreground">
                            AI-powered career guidance for your future.
                        </p>
                    </div>

                    <div className="flex space-x-6 text-sm text-muted-foreground">
                        <Link href="/privacy" className="hover:text-foreground transition-colors">
                            Privacy
                        </Link>
                        <Link href="/terms" className="hover:text-foreground transition-colors">
                            Terms
                        </Link>
                        <Link href="/contact" className="hover:text-foreground transition-colors">
                            Contact
                        </Link>
                    </div>
                </div>

                <div className="border-t border-border mt-6 pt-6 text-center">
                    <p className="text-xs text-muted-foreground">
                        © 2024 PathWise. All rights reserved.
                    </p>
                </div>
            </Section>
        </footer>
    )
}

