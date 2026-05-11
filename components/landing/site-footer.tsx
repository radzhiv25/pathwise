import Link from "next/link";
import { Route } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-4 px-4 py-5 sm:flex-row sm:justify-between sm:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <Route className="size-4 shrink-0 text-primary" aria-hidden />
          <span className="text-sm font-semibold text-foreground">PathWise</span>
        </Link>

        <nav
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-muted-foreground"
          aria-label="Legal"
        >
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">
            Terms
          </Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">
            Contact
          </Link>
        </nav>

        <p className="text-xs text-muted-foreground tabular-nums sm:text-right">
          © {new Date().getFullYear()} PathWise
        </p>
      </div>
    </footer>
  );
}
