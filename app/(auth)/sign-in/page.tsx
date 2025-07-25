import { AuthForm } from "@/components/auth-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm">
      <Suspense fallback={<div>Loading...</div>}>
        <AuthForm isSignUp={false} />
      </Suspense>
    </div>
  );
}
