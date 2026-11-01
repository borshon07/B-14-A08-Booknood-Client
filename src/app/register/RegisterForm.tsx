"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeSlash } from "@gravity-ui/icons";

export default function RegisterForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Register with Email & Password
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value;

    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    const photoURL = (form.elements.namedItem("photoURL") as HTMLInputElement)
      .value;

    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    // Password Validation
    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must have an uppercase letter");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setPasswordError("Password must have a lowercase letter");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    setPasswordError("");
    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: photoURL,
      });

      if (error) {
        toast.error(error.message || "Registration failed");
        return;
      }

      toast.success("Registration successful! Please login.");

      await authClient.signOut();
      router.push("/login");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google Registration
  const handleGoogle = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      toast.error("Google registration failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 rounded-xl border p-8">
        {/* Heading */}
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an Account</h1>

          <p className="text-sm text-muted-foreground">
            Join BookNook and discover your next favorite book.
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>

            <Input
              id="name"
              name="name"
              placeholder="Enter your full name"
              autoComplete="name"
              required
            />
          </div>

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

          {/* Photo URL */}
          <div className="space-y-2">
            <Label htmlFor="photoURL">Photo URL</Label>

            <Input
              id="photoURL"
              name="photoURL"
              type="url"
              placeholder="https://example.com/photo.jpg"
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
                placeholder="Create a strong password"
                autoComplete="new-password"
                required
                className="pr-10"
                onChange={() => setPasswordError("")}
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

            {/* Password Validation Error */}
            {passwordError && (
              <p className="text-sm text-red-500">{passwordError}</p>
            )}
          </div>

          {/* Register Button */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Registering..." : "Register"}
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

        {/* Google Registration */}
        <Button variant="outline" className="w-full" onClick={handleGoogle}>
          Continue with Google
        </Button>

        {/* Login Link */}
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-foreground underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
