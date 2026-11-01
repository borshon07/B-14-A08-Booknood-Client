"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeSlash } from "@gravity-ui/icons";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirect") || "/";

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Email & Password Login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Login failed");
        return;
      }

      toast.success("Login successful!");
      router.push(redirectTo);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogle = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: redirectTo,
      });
    } catch {
      toast.error("Google login failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 rounded-xl border p-8">
        {/* Heading */}
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>

          <p className="text-sm text-muted-foreground">
            Login to your BookNook account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </div>

          {/* Password with Toggle */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>

            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2
                  -translate-y-1/2
                  text-muted-foreground
                  transition-colors
                  hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeSlash className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm underline
                  text-muted-foreground
                  hover:text-foreground"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Login Button */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* Divider */}
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

        {/* Google Login */}
        <Button variant="outline" className="w-full" onClick={handleGoogle}>
          Continue with Google
        </Button>

        {/* Register Link */}
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-foreground underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
