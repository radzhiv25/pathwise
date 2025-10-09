// Auth form schemas and validation functions

export interface LoginFormData {
    email: string;
    password: string;
}

export interface SignupFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginFormErrors {
    email?: string;
    password?: string;
    general?: string;
}

export interface SignupFormErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
}

// Validation functions
export const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) {
        return "Email is required";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return "Please enter a valid email address";
    }
    return undefined;
};

export const validatePassword = (password: string): string | undefined => {
    if (!password) {
        return "Password is required";
    }
    if (password.length !== 6) {
        return "Password must be exactly 6 digits";
    }
    if (!/^\d{6}$/.test(password)) {
        return "Password must contain only numbers";
    }
    return undefined;
};

export const validateName = (name: string): string | undefined => {
    if (!name.trim()) {
        return "Name is required";
    }
    if (name.trim().length < 2) {
        return "Name must be at least 2 characters";
    }
    return undefined;
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string | undefined => {
    if (!confirmPassword) {
        return "Please confirm your password";
    }
    if (password !== confirmPassword) {
        return "Passwords do not match";
    }
    return undefined;
};

// Login form validation
export const validateLoginForm = (formData: LoginFormData): LoginFormErrors => {
    const errors: LoginFormErrors = {};

    const emailError = validateEmail(formData.email);
    if (emailError) {
        errors.email = emailError;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
        errors.password = passwordError;
    }

    return errors;
};

// Signup form validation
export const validateSignupForm = (formData: SignupFormData): SignupFormErrors => {
    const errors: SignupFormErrors = {};

    const nameError = validateName(formData.name);
    if (nameError) {
        errors.name = nameError;
    }

    const emailError = validateEmail(formData.email);
    if (emailError) {
        errors.email = emailError;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
        errors.password = passwordError;
    }

    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);
    if (confirmPasswordError) {
        errors.confirmPassword = confirmPasswordError;
    }

    return errors;
};

// Helper function to check if form is valid
export const isFormValid = (errors: LoginFormErrors | SignupFormErrors): boolean => {
    return Object.keys(errors).length === 0;
};