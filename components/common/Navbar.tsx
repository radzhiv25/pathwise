"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { authService, AuthUser } from "@/lib/auth";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { ButtonSkeleton } from "@/components/ui/skeletons";
import { Route } from "lucide-react";

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
        <div className="border border-border rounded-lg md:w-1/2 md:mx-auto mx-4 top-5 relative md:p-3 p-3 text-lg font-semibold bg-background shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                    <Route className="w-5 h-5 md:w-6 md:h-6" />
                    <h1 className="text-foreground font-semibold text-base md:text-xl">
                        PathWise
                    </h1>
                </span>

                <div className="flex items-center gap-2">
                    <AnimatedThemeToggler className="p-1.5 hover:bg-accent rounded-md transition-colors" />

                    {loading ? (
                        <div className="flex items-center gap-2">
                            <ButtonSkeleton className="h-8 w-12" />
                            <ButtonSkeleton className="h-8 w-16 hidden sm:block" />
                            <ButtonSkeleton className="h-8 w-14" />
                        </div>
                    ) : user ? (
                        <>
                            {/* <span className="hidden sm:inline text-xs text-muted-foreground">
                                Welcome, {user.name}
                            </span> */}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.push("/chat")}
                                className="transition-colors duration-200 text-xs px-2 py-1"
                            >
                                Chat
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.push("/dashboard")}
                                className="hidden sm:inline-flex transition-colors duration-200 text-xs px-2 py-1"
                            >
                                Dashboard
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleLogout}
                                className="transition-colors duration-200 text-xs px-2 py-1"
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.push("/login")}
                                className="transition-colors duration-200 text-xs px-2 py-1"
                            >
                                Login
                            </Button>
                            <Button
                                variant="default"
                                size="sm"
                                onClick={() => router.push("/signup")}
                                className="transition-colors duration-200 text-xs px-2 py-1"
                            >
                                Signup
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar