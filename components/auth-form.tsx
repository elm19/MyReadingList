"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { FcGoogle } from 'react-icons/fc'
import { login, signup } from "@/app/(auth)/actions"
import { useState } from "react"


interface AuthFormProps extends React.ComponentProps<"div"> {
  isSignUp?: boolean;
}

export function AuthForm({
  className,
  isSignUp = false,
  ...props
}: AuthFormProps) {
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
  };  
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
            />
          </div>
        </div>

        <div className="space-y-3">
          <Button type="submit" className="w-full">
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
          <Button variant="outline" className="w-full">
            <FcGoogle size={20} />

            {isSignUp ? "Sign up" : "Login"} with Google
          </Button>
          <Link href="/novels" passHref>
            <Button variant="ghost" className="w-full text-muted-foreground hover:text-primary">
              Continue as Guest
            </Button>
          </Link>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <Link 
            href={isSignUp ? "/sign-in" : "/sign-up"} 
            className="hover:underline underline-offset-4 text-primary"
          >
            {isSignUp ? "Login" : "Sign up"}
          </Link>
        </div>
      </form>
    </div>
  )
}
