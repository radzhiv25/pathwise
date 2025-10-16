// tRPC setup and configuration
import { initTRPC } from '@trpc/server';
import { NextRequest } from 'next/server';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { User } from '@supabase/supabase-js';

// Initialize tRPC
const t = initTRPC.context<{
    req: NextRequest;
    user: User | null;
    supabase: SupabaseClient;
}>().create();

// Export router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;

// Middleware to get user from Supabase and create authenticated client
const getUser = t.middleware(async ({ next, ctx }) => {
    const authHeader = ctx.req.headers.get('authorization');

    if (!authHeader) {
        throw new Error('No authorization header');
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        // Create authenticated Supabase client
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

        const supabase = createClient(supabaseUrl, supabaseAnonKey, {
            global: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        });

        // Verify the user
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
            throw new Error('Invalid token');
        }

        return next({
            ctx: {
                ...ctx,
                user,
                supabase,
            },
        });
    } catch {
        throw new Error('Authentication failed');
    }
});

// Protected procedure that requires authentication
export const protectedProcedure = t.procedure.use(getUser);
