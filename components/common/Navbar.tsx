"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { authService, AuthUser } from "@/lib/auth";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const Navbar = () => {
    const router = useRouter();
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const { user } = await authService.getCurrentUser();
            setUser(user);
            setLoading(false);
        };

        checkUser();

        // Listen to auth state changes
        const { data: { subscription } } = authService.onAuthStateChange((user) => {
            setUser(user);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await authService.signOut();
        router.push('/');
    };

    return (
        <div className="border border-border rounded-lg md:w-1/2 md:mx-auto mx-5 top-5 relative md:p-3 p-2 md:text-xl text-lg font-semibold flex justify-between items-center bg-background shadow-sm hover:shadow-md transition-shadow duration-200">
            <h1 className="text-foreground font-semibold">
                PathWise
            </h1>

            <div className="flex items-center gap-3">
                <AnimatedThemeToggler className="p-2 hover:bg-accent rounded-md transition-colors" />

                {loading ? (
                    <div className="animate-pulse bg-muted h-8 w-20 rounded"></div>
                ) : user ? (
                    <>
                        <span className="text-sm text-muted-foreground">
                            Welcome, {user.name}
                        </span>
                        <Button
                            variant="outline"
                            onClick={() => router.push("/chat")}
                            className="transition-colors duration-200"
                        >
                            Chat
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => router.push("/dashboard")}
                            className="transition-colors duration-200"
                        >
                            Dashboard
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleLogout}
                            className="transition-colors duration-200"
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            variant="outline"
                            onClick={() => router.push("/login")}
                            className="transition-colors duration-200"
                        >
                            Login
                        </Button>
                        <Button
                            variant="default"
                            onClick={() => router.push("/signup")}
                            className="transition-colors duration-200"
                        >
                            Signup
                        </Button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Navbar