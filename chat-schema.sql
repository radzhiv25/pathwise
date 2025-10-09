-- Career Counseling Chat Application Database Schema
-- Run these queries in your Supabase SQL Editor

-- 1. Create chat_sessions table
CREATE TABLE public.chat_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL DEFAULT 'New Chat',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create chat_messages table
CREATE TABLE public.chat_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id UUID REFERENCES public.chat_sessions(id) ON DELETE CASCADE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS policies for chat_sessions
-- Users can view their own chat sessions
CREATE POLICY "Users can view own chat sessions" ON public.chat_sessions
    FOR SELECT USING (auth.uid() = user_id);

-- Users can create their own chat sessions
CREATE POLICY "Users can create own chat sessions" ON public.chat_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own chat sessions
CREATE POLICY "Users can update own chat sessions" ON public.chat_sessions
    FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own chat sessions
CREATE POLICY "Users can delete own chat sessions" ON public.chat_sessions
    FOR DELETE USING (auth.uid() = user_id);

-- 5. Create RLS policies for chat_messages
-- Users can view messages from their own chat sessions
CREATE POLICY "Users can view own chat messages" ON public.chat_messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.chat_sessions 
            WHERE chat_sessions.id = chat_messages.session_id 
            AND chat_sessions.user_id = auth.uid()
        )
    );

-- Users can create messages in their own chat sessions
CREATE POLICY "Users can create messages in own sessions" ON public.chat_messages
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.chat_sessions 
            WHERE chat_sessions.id = chat_messages.session_id 
            AND chat_sessions.user_id = auth.uid()
        )
    );

-- Users can update messages in their own chat sessions
CREATE POLICY "Users can update own chat messages" ON public.chat_messages
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.chat_sessions 
            WHERE chat_sessions.id = chat_messages.session_id 
            AND chat_sessions.user_id = auth.uid()
        )
    );

-- Users can delete messages from their own chat sessions
CREATE POLICY "Users can delete own chat messages" ON public.chat_messages
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.chat_sessions 
            WHERE chat_sessions.id = chat_messages.session_id 
            AND chat_sessions.user_id = auth.uid()
        )
    );

-- 6. Create triggers for updated_at timestamps
CREATE TRIGGER update_chat_sessions_updated_at
    BEFORE UPDATE ON public.chat_sessions
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 7. Create indexes for better performance
-- Index on chat_sessions for user queries
CREATE INDEX idx_chat_sessions_user_id ON public.chat_sessions(user_id);
CREATE INDEX idx_chat_sessions_created_at ON public.chat_sessions(created_at DESC);
CREATE INDEX idx_chat_sessions_updated_at ON public.chat_sessions(updated_at DESC);

-- Index on chat_messages for session queries
CREATE INDEX idx_chat_messages_session_id ON public.chat_messages(session_id);
CREATE INDEX idx_chat_messages_created_at ON public.chat_messages(created_at ASC);
CREATE INDEX idx_chat_messages_role ON public.chat_messages(role);

-- 8. Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.chat_sessions TO anon, authenticated;
GRANT ALL ON public.chat_messages TO anon, authenticated;

-- 9. Create function to get chat session with message count
CREATE OR REPLACE FUNCTION public.get_chat_sessions_with_message_count(user_uuid UUID)
RETURNS TABLE (
    id UUID,
    user_id UUID,
    title TEXT,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE,
    message_count BIGINT,
    last_message_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        cs.id,
        cs.user_id,
        cs.title,
        cs.created_at,
        cs.updated_at,
        COUNT(cm.id) as message_count,
        MAX(cm.created_at) as last_message_at
    FROM public.chat_sessions cs
    LEFT JOIN public.chat_messages cm ON cs.id = cm.session_id
    WHERE cs.user_id = user_uuid
    GROUP BY cs.id, cs.user_id, cs.title, cs.created_at, cs.updated_at
    ORDER BY cs.updated_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. Create function to get messages for a session with pagination
CREATE OR REPLACE FUNCTION public.get_chat_messages_paginated(
    session_uuid UUID,
    limit_count INTEGER DEFAULT 50,
    offset_count INTEGER DEFAULT 0
)
RETURNS TABLE (
    id UUID,
    session_id UUID,
    role TEXT,
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        cm.id,
        cm.session_id,
        cm.role,
        cm.content,
        cm.created_at
    FROM public.chat_messages cm
    WHERE cm.session_id = session_uuid
    ORDER BY cm.created_at ASC
    LIMIT limit_count
    OFFSET offset_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 11. Create function to update chat session title based on first user message
CREATE OR REPLACE FUNCTION public.update_chat_session_title()
RETURNS TRIGGER AS $$
BEGIN
    -- Only update title if it's the first user message in the session
    IF NEW.role = 'user' AND NOT EXISTS (
        SELECT 1 FROM public.chat_messages 
        WHERE session_id = NEW.session_id 
        AND role = 'user' 
        AND id != NEW.id
    ) THEN
        -- Extract first few words from the message as title
        UPDATE public.chat_sessions 
        SET title = CASE 
            WHEN LENGTH(NEW.content) > 50 THEN 
                LEFT(NEW.content, 47) || '...'
            ELSE 
                NEW.content
        END,
        updated_at = NOW()
        WHERE id = NEW.session_id;
    END IF;
    
    -- Always update the session's updated_at timestamp
    UPDATE public.chat_sessions 
    SET updated_at = NOW()
    WHERE id = NEW.session_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 12. Create trigger to automatically update session title and timestamp
CREATE TRIGGER update_session_on_new_message
    AFTER INSERT ON public.chat_messages
    FOR EACH ROW EXECUTE FUNCTION public.update_chat_session_title();
