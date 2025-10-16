// Example: Using Drizzle alongside Supabase in your tRPC router
// This shows how you can gradually migrate from Supabase to Drizzle

import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { db, chatSessions, chatMessages } from '@/lib/db';
import { eq, desc, count } from 'drizzle-orm';

// Example: Migrate getChatSessions to use Drizzle
export const chatRouterWithDrizzle = router({
    // Get all chat sessions for the user (using Drizzle)
    getChatSessions: protectedProcedure.query(async ({ ctx }) => {
        // Using Drizzle instead of Supabase
        const sessions = await db
            .select({
                id: chatSessions.id,
                title: chatSessions.title,
                createdAt: chatSessions.createdAt,
                updatedAt: chatSessions.updatedAt,
                messageCount: count(chatMessages.id),
            })
            .from(chatSessions)
            .leftJoin(chatMessages, eq(chatMessages.sessionId, chatSessions.id))
            .where(eq(chatSessions.userId, ctx.user.id))
            .groupBy(chatSessions.id)
            .orderBy(desc(chatSessions.updatedAt));

        return sessions;
    }),

    // Create a new chat session (using Drizzle)
    createChatSession: protectedProcedure
        .input(z.object({ title: z.string().optional() }))
        .mutation(async ({ input, ctx }) => {
            const [session] = await db
                .insert(chatSessions)
                .values({
                    userId: ctx.user.id,
                    title: input.title || 'New Chat',
                })
                .returning();

            return session;
        }),

    // Get messages for a session (using Drizzle)
    getMessages: protectedProcedure
        .input(z.object({
            sessionId: z.string().uuid(),
            limit: z.number().min(1).max(100).default(50),
            offset: z.number().min(0).default(0),
        }))
        .query(async ({ input, ctx }) => {
            // First verify the session belongs to the user
            const session = await db
                .select({ id: chatSessions.id })
                .from(chatSessions)
                .where(
                    eq(chatSessions.id, input.sessionId) &&
                    eq(chatSessions.userId, ctx.user.id)
                )
                .limit(1);

            if (!session[0]) {
                throw new Error('Session not found or access denied');
            }

            // Get messages
            const messages = await db
                .select()
                .from(chatMessages)
                .where(eq(chatMessages.sessionId, input.sessionId))
                .orderBy(chatMessages.createdAt)
                .limit(input.limit)
                .offset(input.offset);

            return messages;
        }),

    // Hybrid approach: Use Supabase for auth, Drizzle for queries
    getSessionWithMessages: protectedProcedure
        .input(z.object({ sessionId: z.string().uuid() }))
        .query(async ({ input, ctx }) => {
            // Use Drizzle for complex query with joins
            const result = await db
                .select({
                    session: chatSessions,
                    messages: chatMessages,
                })
                .from(chatSessions)
                .leftJoin(chatMessages, eq(chatMessages.sessionId, chatSessions.id))
                .where(
                    eq(chatSessions.id, input.sessionId) &&
                    eq(chatSessions.userId, ctx.user.id)
                )
                .orderBy(chatMessages.createdAt);

            return result;
        }),
});




