// Example usage of Drizzle ORM in your tRPC routers
// This file shows how you can gradually migrate from raw Supabase queries to Drizzle

import { db, users, chatSessions, chatMessages } from '@/lib/db';
import { eq, desc } from 'drizzle-orm';

// Example: Get user by ID
export async function getUserById(userId: string) {
    const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    return user[0] || null;
}

// Example: Get chat sessions for a user
export async function getChatSessionsByUserId(userId: string) {
    return await db
        .select()
        .from(chatSessions)
        .where(eq(chatSessions.userId, userId))
        .orderBy(desc(chatSessions.updatedAt));
}

// Example: Get messages for a chat session
export async function getChatMessagesBySessionId(sessionId: string) {
    return await db
        .select()
        .from(chatMessages)
        .where(eq(chatMessages.sessionId, sessionId))
        .orderBy(chatMessages.createdAt);
}

// Example: Create a new chat session
export async function createChatSession(userId: string, title: string = 'New Chat') {
    const [session] = await db
        .insert(chatSessions)
        .values({
            userId,
            title,
        })
        .returning();
    return session;
}

// Example: Create a new chat message
export async function createChatMessage(sessionId: string, role: 'user' | 'assistant', content: string) {
    const [message] = await db
        .insert(chatMessages)
        .values({
            sessionId,
            role,
            content,
        })
        .returning();
    return message;
}

// Example: Update chat session title
export async function updateChatSessionTitle(sessionId: string, title: string) {
    const [session] = await db
        .update(chatSessions)
        .set({ title, updatedAt: new Date() })
        .where(eq(chatSessions.id, sessionId))
        .returning();
    return session;
}

// Example: Delete chat session (cascade will handle messages)
export async function deleteChatSession(sessionId: string) {
    await db.delete(chatSessions).where(eq(chatSessions.id, sessionId));
}

// Example: Complex query with joins
export async function getChatSessionWithMessages(sessionId: string) {
    const session = await db
        .select()
        .from(chatSessions)
        .where(eq(chatSessions.id, sessionId))
        .limit(1);

    if (!session[0]) return null;

    const messages = await db
        .select()
        .from(chatMessages)
        .where(eq(chatMessages.sessionId, sessionId))
        .orderBy(chatMessages.createdAt);

    return {
        ...session[0],
        messages,
    };
}



