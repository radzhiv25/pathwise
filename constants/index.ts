// Application constants

// API endpoints
export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/api/auth/login',
        SIGNUP: '/api/auth/signup',
        LOGOUT: '/api/auth/logout',
        REFRESH: '/api/auth/refresh',
    },
    USER: {
        PROFILE: '/api/user/profile',
        UPDATE: '/api/user/update',
    },
} as const;

// Form validation constants
export const VALIDATION_RULES = {
    PASSWORD: {
        LENGTH: 6,
        REQUIRE_NUMERIC_ONLY: true,
    },
    NAME: {
        MIN_LENGTH: 2,
        MAX_LENGTH: 50,
    },
    EMAIL: {
        MAX_LENGTH: 254,
    },
} as const;

// UI constants
export const UI_CONSTANTS = {
    ANIMATION_DURATION: 300,
    DEBOUNCE_DELAY: 500,
    TOAST_DURATION: 5000,
} as const;

// Error messages
export const ERROR_MESSAGES = {
    NETWORK: 'Network error. Please check your connection.',
    SERVER: 'Server error. Please try again later.',
    VALIDATION: 'Please check your input and try again.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    NOT_FOUND: 'The requested resource was not found.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
    LOGIN: 'Login successful!',
    SIGNUP: 'Account created successfully!',
    LOGOUT: 'Logged out successfully!',
    UPDATE: 'Updated successfully!',
} as const;
