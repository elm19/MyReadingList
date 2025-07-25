import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AuthFormProps extends React.ComponentProps<"div"> {
  isSignUp?: boolean;
}

export function AuthForm({
  className,
  isSignUp = false,
  ...props
}: AuthFormProps) {
  return (
    <div className={cn("w-full", className)} {...props}>
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {isSignUp ? "Create an account" : "Login to your account"}
        </h1>
        <p className="text-muted-foreground">
          {isSignUp 
            ? "Enter your details below to create your account" 
            : "Enter your email below to login to your account"}
        </p>
      </div>

      <form className="mt-8 space-y-6">
        <div className="space-y-4">
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
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
            <Input id="password" type="password" required />
          </div>
        </div>

        <div className="space-y-3">
          <Button type="submit" className="w-full">
            {isSignUp ? "Sign up" : "Login"}
          </Button>
          <Button variant="outline" className="w-full">
            {isSignUp ? "Sign up" : "Login"} with Google
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <a href="#" className="hover:underline underline-offset-4 text-primary">
            {isSignUp ? "Login" : "Sign up"}
          </a>
        </div>
      </form>
    </div>
  )
}
