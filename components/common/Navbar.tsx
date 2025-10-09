"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { authService, AuthUser } from "@/lib/auth";

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
        <div className="border border-gray-200 rounded-lg w-3/4 mx-auto top-5 relative p-3 text-xl font-semibold flex justify-between items-center bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
            <h1 className="text-gray-900 font-semibold">
                PathWise
            </h1>

            {loading ? (
                <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
            ) : user ? (
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">
                        Welcome, {user.name}
                    </span>
                    <Button
                        variant="outline"
                        onClick={() => router.push("/chat")}
                        className="border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200"
                    >
                        Chat
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => router.push("/dashboard")}
                        className="border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200"
                    >
                        Dashboard
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleLogout}
                        className="border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200"
                    >
                        Logout
                    </Button>
                </div>
            ) : (
                <span className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={() => router.push("/login")}
                        className="border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200"
                    >
                        Login
                    </Button>
                    <Button
                        variant="default"
                        onClick={() => router.push("/signup")}
                        className="bg-gray-900 hover:bg-gray-800 text-white transition-colors duration-200"
                    >
                        Signup
                    </Button>
                </span>
            )}
        </div>
    )
}

export default Navbar