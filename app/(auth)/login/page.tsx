import LoginForm from "@/components/common/auth/LoginForm";
import { AuthGuard } from "@/components/common/auth/AuthGuard";

const LoginPage = () => {
  return (
    <AuthGuard>
      <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <LoginForm />
        </div>
      </div>
    </AuthGuard>
  );
};

export default LoginPage;