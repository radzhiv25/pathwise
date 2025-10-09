// tRPC API route handler
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/lib/routers';
import { NextRequest } from 'next/server';

const handler = (req: NextRequest) =>
    fetchRequestHandler({
        endpoint: '/api/trpc',
        req,
        router: appRouter,
        createContext: () => ({
            req,
            user: null, // Will be set by middleware
        }),
    });

export { handler as GET, handler as POST };
