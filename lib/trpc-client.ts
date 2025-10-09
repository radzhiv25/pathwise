// tRPC client setup
import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import { AppRouter } from './routers';
import { supabase } from './supabase';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            url: '/api/trpc',
            headers: async () => {
                // Get auth token from Supabase
                const { data: { session } } = await supabase.auth.getSession();
                return {
                    authorization: session?.access_token ? `Bearer ${session.access_token}` : '',
                };
            },
        }),
    ],
});
