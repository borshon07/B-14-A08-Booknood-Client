"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged out");
    router.push("/login");
  };

  return (
    <nav className="border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* logo and name */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
          <span>📚</span>
          <span>BookNook</span>
        </Link>

        {/* links */}
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/">Home</Link>
          <Link href="/books">All Books</Link>
          {user && (
            <>
              <Link href="/add-book">Add Book</Link>
              <Link href="/my-books">My Books</Link>
              <Link href="/my-borrows">My Borrows</Link>
            </>
          )}
        </div>

        {/* right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {isPending ? null : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full outline-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.image || "https://i.ibb.co/placeholder/user.png"}
                  alt={user.name}
                  className="h-10 w-10 rounded-full border object-cover"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5 text-sm font-semibold">
                  {user.name}
                </div>
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" onClick={() => router.push("/login")}>
                Login
              </Button>
              <Button onClick={() => router.push("/register")}>Register</Button>
            </>
          )}
        </div>
      </div>

      {/* mobile links */}
      <div className="flex flex-wrap justify-center gap-4 border-t px-4 py-2 text-sm md:hidden">
        <Link href="/">Home</Link>
        <Link href="/books">All Books</Link>
        {user && (
          <>
            <Link href="/add-book">Add Book</Link>
            <Link href="/my-books">My Books</Link>
            <Link href="/my-borrows">My Borrows</Link>
          </>
        )}
      </div>
    </nav>
  );
}
