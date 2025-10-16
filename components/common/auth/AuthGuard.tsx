"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { FormFieldSkeleton, ButtonSkeleton } from '@/components/ui/skeletons';

interface AuthGuardProps {
    children: React.ReactNode;
    redirectTo?: string;
}

export function AuthGuard({ children, redirectTo = '/dashboard' }: AuthGuardProps) {
    const { loading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && isAuthenticated) {
            router.push(redirectTo);
        }
    }, [loading, isAuthenticated, router, redirectTo]);

    // Show loading while checking auth
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="space-y-6">
                        <div className="text-center space-y-2">
                            <div className="h-8 w-48 bg-muted animate-pulse rounded mx-auto"></div>
                            <div className="h-4 w-64 bg-muted animate-pulse rounded mx-auto"></div>
                        </div>
                        <div className="space-y-4">
                            <FormFieldSkeleton />
                            <FormFieldSkeleton />
                            <FormFieldSkeleton />
                            <div className="flex justify-center">
                                <ButtonSkeleton className="w-32" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // If authenticated, don't render children (will redirect)
    if (isAuthenticated) {
        return null;
    }

    // If not authenticated, render children
    return <>{children}</>;
}
