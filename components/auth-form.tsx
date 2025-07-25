"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { FcGoogle } from 'react-icons/fc'
import { login, signInWithGoogle, signup } from "@/app/(auth)/actions"
import { useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import { useSearchParams } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"


interface AuthFormProps extends React.ComponentProps<"div"> {
  isSignUp?: boolean;
}

export function AuthForm({
  className,
  isSignUp = false,
  ...props
}: AuthFormProps) {
  const [isLoginPending, startLoginTransition] = useTransition();
  const [isGooglePending, startGoogleTransition] = useTransition();

  const searchParams = useSearchParams()
  const isVerified = searchParams.get('verified') === 'true';
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (isVerified) {
      setTimeout(() => {
        toast("Email verified successfully", {
          description: "You can log in now.",
        });
      }, 200);
    }
  }, [isVerified]);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startLoginTransition(async () => {
      const formData = new FormData(event.currentTarget);
      if (isSignUp) {
        const result = await signup(formData);
        if(result && result?.error) {
          setError(result?.error);
        } else {
          setError("");
        }
      } else {
        const result = await login(formData);
        if(result && result?.error) {
          setError(result?.error);
        } else {
          setError("");
        }
      }
    });
  };

  const handleGoogleSignIn = () => {
    startGoogleTransition(async () => {
      await signInWithGoogle();
    });
  };

  const isPending = isLoginPending || isGooglePending;

  return (
    <div className={cn("w-full", className)} {...props}>
      
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          {isSignUp ? "Create an account" : "Login to your account"}
        </h1>
        <p className="text-muted-foreground">
          {isSignUp 
            ? "Enter your details below to create your account" 
            : "Enter your email below to login to your account"}
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          {error && (
            <div className="text-red-500 text-sm mb-4">
              {error}
            </div>
          )}
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
                disabled={isPending}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              {!isSignUp && (
                <a
                  href="#"
                  className="ml-auto text-sm text-muted-foreground hover:underline underline-offset-4"
                >
                  Forgot your password?
                </a>
              )}
            </div>
            <Input 
              id="password" 
              name="password"
              type="password" 
              required 
              disabled={isPending}
            />
          </div>
        </div>

        <div className="space-y-3">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isLoginPending && <Spinner className="mr-2" />}
            {isSignUp ? "Sign up" : "Login"}
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button 
            type="button" 
            variant="outline" 
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={isPending}
          >
            {isGooglePending ? <Spinner className="mr-2" /> : <FcGoogle className="mr-2" />}
            {isSignUp ? "Sign up with Google" : "Login with Google"}
          </Button>
          <Link href="/books" passHref>
            <Button variant="ghost" className="w-full text-muted-foreground hover:text-primary" disabled={isPending}>
              Continue as Guest
            </Button>
          </Link>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <Link 
            href={isSignUp ? "/sign-in" : "/sign-up"} 
            className="hover:underline text-primary"
          >
            {isSignUp ? "Login" : "Sign up"}
          </Link>
        </div>
      </form>
    </div>
  )
}