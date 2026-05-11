// Providers component for tRPC and React Query
"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc, trpcClient } from "@/lib/trpc-client";
import { ThemeProvider } from "./ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <ThemeProvider>
            <TooltipProvider>
                <trpc.Provider client={trpcClient} queryClient={queryClient}>
                    <QueryClientProvider client={queryClient}>
                        {children}
                    </QueryClientProvider>
                </trpc.Provider>
            </TooltipProvider>
        </ThemeProvider>
    );
}
