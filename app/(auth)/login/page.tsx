import  LoginForm  from "@/components/common/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="w-full max-w-sm fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <LoginForm />
    </div>
  );
};

export default LoginPage;