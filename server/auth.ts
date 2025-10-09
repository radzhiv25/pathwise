// Server-side API functions and utilities

import { API_ENDPOINTS, ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants';
import { LoginFormData, SignupFormData } from '@/schemas';

// API response types
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface AuthResponse {
    user: {
        id: string;
        name: string;
        email: string;
    };
    token: string;
    refreshToken: string;
}

// Auth API functions
export const authApi = {
    async login(credentials: LoginFormData): Promise<ApiResponse<AuthResponse>> {
        try {
            const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            return {
                success: true,
                data,
                message: SUCCESS_MESSAGES.LOGIN,
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : ERROR_MESSAGES.NETWORK,
            };
        }
    },

    async signup(userData: SignupFormData): Promise<ApiResponse<AuthResponse>> {
        try {
            const response = await fetch(API_ENDPOINTS.AUTH.SIGNUP, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Signup failed');
            }

            const data = await response.json();
            return {
                success: true,
                data,
                message: SUCCESS_MESSAGES.SIGNUP,
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : ERROR_MESSAGES.NETWORK,
            };
        }
    },

    async logout(): Promise<ApiResponse> {
        try {
            const response = await fetch(API_ENDPOINTS.AUTH.LOGOUT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            return {
                success: true,
                message: SUCCESS_MESSAGES.LOGOUT,
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : ERROR_MESSAGES.NETWORK,
            };
        }
    },
};

// Utility functions for server-side operations
export const serverUtils = {
    // Generate secure random token
    generateToken(): string {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    },

    // Hash password (placeholder - use proper hashing in production)
    hashPassword(password: string): string {
        // TODO: Implement proper password hashing (bcrypt, argon2, etc.)
        return btoa(password); // Base64 encoding - NOT secure for production!
    },

    // Verify password (placeholder - use proper verification in production)
    verifyPassword(password: string, hashedPassword: string): boolean {
        // TODO: Implement proper password verification
        return btoa(password) === hashedPassword; // Base64 comparison - NOT secure for production!
    },

    // Validate JWT token (placeholder)
    validateToken(token: string): boolean {
        // TODO: Implement proper JWT validation
        return token.length > 10; // Placeholder validation
    },
};
