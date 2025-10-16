// tRPC API route handler
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/lib/routers';
import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const handler = (req: NextRequest) =>
    fetchRequestHandler({
        endpoint: '/api/trpc',
        req,
        router: appRouter,
        createContext: () => {
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
            const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
            const supabase = createClient(supabaseUrl, supabaseAnonKey);

            return {
                req,
                user: null, // Will be set by middleware
                supabase,
            };
        },
    });

export { handler as GET, handler as POST };
