import LoginForm from "@/components/common/auth/LoginForm";
import { AuthGuard } from "@/components/common/auth/AuthGuard";
import Navbar from "@/components/common/Navbar";
import { SiteFooter } from "@/components/landing/site-footer";

const LoginPage = () => {
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <LoginForm />
          </div>
        </main>
        <SiteFooter />
      </div>
    </AuthGuard>
  );
};

export default LoginPage;