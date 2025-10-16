"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authService } from "@/lib/auth";
import {
    LoginFormData,
    LoginFormErrors,
    validateLoginForm,
    isFormValid
} from "@/schemas";

const LoginForm = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<LoginFormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when user starts typing
        if (errors[name as keyof LoginFormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateLoginForm(formData);
        setErrors(validationErrors);

        if (!isFormValid(validationErrors)) {
            return;
        }

        setIsSubmitting(true);
        setErrors({});

        try {
            const { user, error } = await authService.signIn(formData);

            if (error) {
                setErrors({ general: error });
            } else if (user) {
                // Redirect to dashboard
                window.location.href = '/dashboard';
            }
        } catch {
            setErrors({ general: "An unexpected error occurred. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            {errors.general && (
                                <div className="text-destructive text-sm text-center mb-4 p-2 bg-destructive/10 rounded">
                                    {errors.general}
                                </div>
                            )}

                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className={errors.email ? "border-destructive" : ""}
                                />
                                {errors.email && (
                                    <p className="text-destructive text-sm mt-1">{errors.email}</p>
                                )}
                            </Field>

                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter 6-digit password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    className={errors.password ? "border-destructive" : ""}
                                    maxLength={6}
                                />
                                {errors.password && (
                                    <p className="text-destructive text-sm mt-1">{errors.password}</p>
                                )}
                            </Field>

                            <Field>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Signing in..." : "Login"}
                                </Button>
                                <FieldDescription className="text-center">
                                    Don&apos;t have an account? <a href="/signup" className="text-primary hover:underline">Sign up</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginForm;