import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  return (
      <div className="w-full max-w-sm">
        <AuthForm isSignUp={false} />
      </div>
  );  
}
