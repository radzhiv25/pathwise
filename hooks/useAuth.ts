"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService, AuthUser } from '@/lib/auth';

interface UseAuthReturn {
    user: AuthUser | null;
    loading: boolean;
    isAuthenticated: boolean;
    logout: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // First check if user is already authenticated (has valid token)
                const hasValidSession = await authService.isAuthenticated();

                if (!hasValidSession) {
                    // No valid session/token
                    setIsAuthenticated(false);
                    setUser(null);
                    setLoading(false);
                    return;
                }

                // User has valid session, get user details
                const { user: userData, error } = await authService.getCurrentUser();

                if (error || !userData) {
                    // Session exists but user fetch failed
                    setIsAuthenticated(false);
                    setUser(null);
                } else {
                    setIsAuthenticated(true);
                    setUser(userData);
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();

        // Listen to auth state changes
        const { data: { subscription } } = authService.onAuthStateChange((user) => {
            if (user) {
                setUser(user);
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
        });

        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    const logout = async () => {
        const { error } = await authService.signOut();
        if (!error) {
            setUser(null);
            setIsAuthenticated(false);
            router.push('/');
        }
    };

    return {
        user,
        loading,
        isAuthenticated,
        logout,
    };
}
