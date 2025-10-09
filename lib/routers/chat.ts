// Chat API router with tRPC
import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { Anthropic } from '@anthropic-ai/sdk';

// Initialize Claude
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY!,
});

// Zod schemas for validation
const createChatSessionSchema = z.object({
    title: z.string().optional(),
});

const sendMessageSchema = z.object({
    sessionId: z.string().uuid(),
    content: z.string().min(1),
});

const getMessagesSchema = z.object({
    sessionId: z.string().uuid(),
    limit: z.number().min(1).max(100).default(50),
    offset: z.number().min(0).default(0),
});

export const chatRouter = router({
    // Get all chat sessions for the user
    getChatSessions: protectedProcedure.query(async ({ ctx }) => {
        const { data, error } = await ctx.supabase
            .from('chat_sessions')
            .select(`
        id,
        title,
        created_at,
        updated_at,
        chat_messages(count)
      `)
            .eq('user_id', ctx.user.id)
            .order('updated_at', { ascending: false });

        if (error) {
            throw new Error('Failed to fetch chat sessions');
        }

        return data;
    }),

    // Create a new chat session
    createChatSession: protectedProcedure
        .input(createChatSessionSchema)
        .mutation(async ({ input, ctx }) => {
            console.log('Creating chat session for user:', ctx.user.id);
            console.log('Input:', input);

            const { data, error } = await ctx.supabase
                .from('chat_sessions')
                .insert({
                    user_id: ctx.user.id,
                    title: input.title || 'New Chat',
                })
                .select()
                .single();

            if (error) {
                console.error('Supabase error:', error);
                throw new Error(`Failed to create chat session: ${error.message}`);
            }

            console.log('Chat session created successfully:', data);
            return data;
        }),

    // Get messages for a specific session
    getMessages: protectedProcedure
        .input(getMessagesSchema)
        .query(async ({ input, ctx }) => {
            // First verify the session belongs to the user
            const { data: session, error: sessionError } = await ctx.supabase
                .from('chat_sessions')
                .select('id')
                .eq('id', input.sessionId)
                .eq('user_id', ctx.user.id)
                .single();

            if (sessionError || !session) {
                throw new Error('Session not found or access denied');
            }

            const { data, error } = await ctx.supabase
                .from('chat_messages')
                .select('*')
                .eq('session_id', input.sessionId)
                .order('created_at', { ascending: true })
                .range(input.offset, input.offset + input.limit - 1);

            if (error) {
                throw new Error('Failed to fetch messages');
            }

            return data;
        }),

    // Send a message and get AI response
    sendMessage: protectedProcedure
        .input(sendMessageSchema)
        .mutation(async ({ input, ctx }) => {
            // Verify session belongs to user
            const { data: session, error: sessionError } = await ctx.supabase
                .from('chat_sessions')
                .select('id')
                .eq('id', input.sessionId)
                .eq('user_id', ctx.user.id)
                .single();

            if (sessionError || !session) {
                throw new Error('Session not found or access denied');
            }

            // Get conversation history for context
            const { data: messages, error: messagesError } = await ctx.supabase
                .from('chat_messages')
                .select('role, content')
                .eq('session_id', input.sessionId)
                .order('created_at', { ascending: true })
                .limit(20); // Last 20 messages for context

            if (messagesError) {
                throw new Error('Failed to fetch conversation history');
            }

            // Save user message
            const { data: userMessage, error: userMessageError } = await ctx.supabase
                .from('chat_messages')
                .insert({
                    session_id: input.sessionId,
                    role: 'user',
                    content: input.content,
                })
                .select()
                .single();

            if (userMessageError) {
                throw new Error('Failed to save user message');
            }

            try {
                // Check if API key is available
                if (!process.env.ANTHROPIC_API_KEY) {
                    console.error('ANTHROPIC_API_KEY is not set in environment variables');
                    throw new Error('ANTHROPIC_API_KEY environment variable is not set');
                }

                console.log('Preparing AI request...');
                console.log('Messages count:', messages.length);
                console.log('User message:', input.content);

                // Prepare conversation history for Claude
                const conversationHistory = messages.map(msg => ({
                    role: msg.role as 'user' | 'assistant',
                    content: msg.content,
                }));

                // Add current user message
                conversationHistory.push({
                    role: 'user',
                    content: input.content,
                });

                console.log('Calling Claude API...');

                // Get AI response from Claude
                const response = await anthropic.messages.create({
                    model: 'claude-3-haiku-20240307',
                    max_tokens: 1000,
                    system: `You are a professional career counselor with expertise in:
- Career planning and development
- Job search strategies
- Resume and cover letter writing
- Interview preparation
- Skills assessment and development
- Industry insights and trends
- Work-life balance
- Career transitions

Provide helpful, actionable advice. Ask clarifying questions when needed. Be encouraging and supportive while being practical and realistic.`,
                    messages: conversationHistory,
                });

                console.log('Claude API response received');
                console.log('Response content length:', response.content.length);

                const aiResponse = response.content[0];
                if (aiResponse.type !== 'text') {
                    throw new Error('Unexpected response type from AI');
                }

                console.log('AI response text length:', aiResponse.text.length);

                // Save AI response
                const { data: aiMessage, error: aiMessageError } = await ctx.supabase
                    .from('chat_messages')
                    .insert({
                        session_id: input.sessionId,
                        role: 'assistant',
                        content: aiResponse.text,
                    })
                    .select()
                    .single();

                if (aiMessageError) {
                    throw new Error('Failed to save AI response');
                }

                return {
                    userMessage,
                    aiMessage,
                };
            } catch (error) {
                // If AI fails, provide a fallback response
                console.error('AI Error Details:', error);
                console.error('Error type:', typeof error);
                console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');

                // Create a fallback AI response
                const fallbackResponse = `I apologize, but I'm experiencing technical difficulties right now. However, I can still help you with career guidance! 

Based on your message "${input.content}", here are some general career counseling tips:

1. **Self-Assessment**: Take time to evaluate your skills, interests, and values
2. **Research**: Explore different career paths and industries that align with your goals
3. **Networking**: Connect with professionals in your field of interest
4. **Skill Development**: Identify and work on skills needed for your target role
5. **Professional Development**: Consider certifications, courses, or additional training

Please try sending your message again, or feel free to ask more specific questions about your career goals.`;

                // Save fallback AI response
                const { data: aiMessage, error: aiMessageError } = await ctx.supabase
                    .from('chat_messages')
                    .insert({
                        session_id: input.sessionId,
                        role: 'assistant',
                        content: fallbackResponse,
                    })
                    .select()
                    .single();

                if (aiMessageError) {
                    console.error('Failed to save fallback response:', aiMessageError);
                    throw new Error('Failed to save AI response');
                }

                return {
                    userMessage,
                    aiMessage,
                };
            }
        }),

    // Delete a chat session
    deleteChatSession: protectedProcedure
        .input(z.object({ sessionId: z.string().uuid() }))
        .mutation(async ({ input, ctx }) => {
            const { error } = await ctx.supabase
                .from('chat_sessions')
                .delete()
                .eq('id', input.sessionId)
                .eq('user_id', ctx.user.id);

            if (error) {
                throw new Error('Failed to delete chat session');
            }

            return { success: true };
        }),
});