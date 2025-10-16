// Auth service using Supabase
import { supabase } from '@/lib/supabase'
import { LoginFormData, SignupFormData } from '@/schemas'

export interface AuthUser {
    id: string
    email: string
    name: string
}

export interface AuthResponse {
    user: AuthUser | null
    error: string | null
}

export const authService = {
    // Sign up a new user
    async signUp(userData: SignupFormData): Promise<AuthResponse> {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: userData.email,
                password: userData.password,
                options: {
                    data: {
                        name: userData.name,
                    },
                },
            })

            if (error) {
                return {
                    user: null,
                    error: error.message,
                }
            }

            if (data.user) {
                return {
                    user: {
                        id: data.user.id,
                        email: data.user.email || '',
                        name: userData.name,
                    },
                    error: null,
                }
            }

            return {
                user: null,
                error: 'Failed to create user',
            }
        } catch (error) {
            return {
                user: null,
                error: error instanceof Error ? error.message : 'An unexpected error occurred',
            }
        }
    },

    // Sign in an existing user
    async signIn(credentials: LoginFormData): Promise<AuthResponse> {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: credentials.email,
                password: credentials.password,
            })

            if (error) {
                return {
                    user: null,
                    error: error.message,
                }
            }

            if (data.user) {
                return {
                    user: {
                        id: data.user.id,
                        email: data.user.email || '',
                        name: data.user.user_metadata?.name || '',
                    },
                    error: null,
                }
            }

            return {
                user: null,
                error: 'Failed to sign in',
            }
        } catch (error) {
            return {
                user: null,
                error: error instanceof Error ? error.message : 'An unexpected error occurred',
            }
        }
    },

    // Sign out the current user
    async signOut(): Promise<{ error: string | null }> {
        try {
            const { error } = await supabase.auth.signOut()
            return {
                error: error?.message || null,
            }
        } catch (error) {
            return {
                error: error instanceof Error ? error.message : 'An unexpected error occurred',
            }
        }
    },

    // Get the current user
    async getCurrentUser(): Promise<AuthResponse> {
        try {
            const { data: { user }, error } = await supabase.auth.getUser()

            if (error) {
                return {
                    user: null,
                    error: error.message,
                }
            }

            if (user) {
                return {
                    user: {
                        id: user.id,
                        email: user.email || '',
                        name: user.user_metadata?.name || '',
                    },
                    error: null,
                }
            }

            return {
                user: null,
                error: 'No user found',
            }
        } catch (error) {
            return {
                user: null,
                error: error instanceof Error ? error.message : 'An unexpected error occurred',
            }
        }
    },

    // Check if user is already authenticated (has valid session/token)
    async isAuthenticated(): Promise<boolean> {
        try {
            const { data: { session }, error } = await supabase.auth.getSession()

            if (error) {
                console.warn('Auth session check error:', error.message)
                return false
            }

            // Check if session exists and has access token
            return !!(session?.access_token && session?.user)
        } catch (error) {
            console.warn('Auth session check failed:', error)
            return false
        }
    },

    // Get current session info
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async getSession(): Promise<{ session: any | null; error: string | null }> {
        try {
            const { data: { session }, error } = await supabase.auth.getSession()

            return {
                session,
                error: error?.message || null,
            }
        } catch (error) {
            return {
                session: null,
                error: error instanceof Error ? error.message : 'An unexpected error occurred',
            }
        }
    },

    // Listen to auth state changes
    onAuthStateChange(callback: (user: AuthUser | null) => void) {
        return supabase.auth.onAuthStateChange((event, session) => {
            if (session?.user) {
                callback({
                    id: session.user.id,
                    email: session.user.email || '',
                    name: session.user.user_metadata?.name || '',
                })
            } else {
                callback(null)
            }
        })
    },
}
