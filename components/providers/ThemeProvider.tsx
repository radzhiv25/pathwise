"use client"

import { useEffect } from "react"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Initialize theme from localStorage or system preference
        const initializeTheme = () => {
            const savedTheme = localStorage.getItem("theme")
            const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

            if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
                document.documentElement.classList.add("dark")
            } else {
                document.documentElement.classList.remove("dark")
            }
        }

        initializeTheme()

        // Listen for system theme changes
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
        const handleChange = () => {
            const savedTheme = localStorage.getItem("theme")
            if (!savedTheme) {
                // Only update if user hasn't manually set a preference
                if (mediaQuery.matches) {
                    document.documentElement.classList.add("dark")
                } else {
                    document.documentElement.classList.remove("dark")
                }
            }
        }

        mediaQuery.addEventListener("change", handleChange)
        return () => mediaQuery.removeEventListener("change", handleChange)
    }, [])

    return <>{children}</>
}


