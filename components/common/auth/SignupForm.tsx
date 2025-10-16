"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authService } from "@/lib/auth";
import {
    SignupFormData,
    SignupFormErrors,
    validateSignupForm,
    isFormValid
} from "@/schemas";

const SignupForm = () => {
    const [formData, setFormData] = useState<SignupFormData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<SignupFormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when user starts typing
        if (errors[name as keyof SignupFormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateSignupForm(formData);
        setErrors(validationErrors);

        if (!isFormValid(validationErrors)) {
            return;
        }

        setIsSubmitting(true);
        setErrors({});

        try {
            const { user, error } = await authService.signUp(formData);

            if (error) {
                setErrors({ general: error });
            } else if (user) {
                // Reset form on success
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });

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
                    <CardTitle>Create your account</CardTitle>
                    <CardDescription>
                        Enter your information below to create your account
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
                                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className={errors.name ? "border-destructive" : ""}
                                />
                                {errors.name && (
                                    <p className="text-destructive text-sm mt-1">{errors.name}</p>
                                )}
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="john@example.com"
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
                                <FieldLabel htmlFor="password">Password</FieldLabel>
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
                                <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm 6-digit password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                    className={errors.confirmPassword ? "border-destructive" : ""}
                                    maxLength={6}
                                />
                                {errors.confirmPassword && (
                                    <p className="text-destructive text-sm mt-1">{errors.confirmPassword}</p>
                                )}
                            </Field>

                            <Field>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Creating Account..." : "Create Account"}
                                </Button>
                                <FieldDescription className="text-center">
                                    Already have an account? <a href="/login" className="text-primary hover:underline">Sign in</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default SignupForm;