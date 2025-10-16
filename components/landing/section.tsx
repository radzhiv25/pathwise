import { cn } from "@/lib/utils"

interface SectionProps {
    children: React.ReactNode
    className?: string
    id?: string
}

export function Section({ children, className, id }: SectionProps) {
    return (
        <section id={id} className={cn("py-16 px-4", className)}>
            <div className="max-w-3xl mx-auto">
                {children}
            </div>
        </section>
    )
}

