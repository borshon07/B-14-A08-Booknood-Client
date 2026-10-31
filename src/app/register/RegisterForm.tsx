"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const photoURL = (form.elements.namedItem("photoURL") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    // password validation
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
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photoURL,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Registration failed");
      return;
    }

    toast.success("Registration successful! Please login.");
    await authClient.signOut();
    router.push("/login");
  };

  const handleGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 rounded-xl border p-8">
        <h1 className="text-center text-3xl font-bold">Register</h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="photoURL">Photo URL</Label>
            <Input id="photoURL" name="photoURL" type="url" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
            {passwordError && (
              <p className="text-sm text-red-500">{passwordError}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <Button variant="outline" className="w-full" onClick={handleGoogle}>
          Continue with Google
        </Button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}