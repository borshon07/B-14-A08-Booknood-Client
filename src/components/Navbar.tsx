"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  BookOpen,
  BookPlus,
  BookMarked,
  Library,
  Home,
  LogIn,
  UserPlus,
  User,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "@/components/ThemeToggle";
import Icon3D from "@/components/Icon3D";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  show: boolean;
};

// one nav link with icon and active underline
function NavLink({
  link,
  active,
  onHomeClick,
}: {
  link: NavItem;
  active: boolean;
  onHomeClick: (e: React.MouseEvent) => void;
}) {
  return (
    <Link
      href={link.href}
      onClick={link.href === "/" ? onHomeClick : undefined}
      className={`relative flex items-center gap-1.5 px-1 py-1 text-sm font-medium transition-colors hover:text-primary ${
        active ? "text-primary" : ""
      }`}
    >
      <Icon3D icon={link.icon} size={18} />
      {link.label}
      {active && (
        <motion.span
          layoutId="nav-underline"
          className="absolute -bottom-1 left-0 h-0.5 w-full rounded bg-primary"
        />
      )}
    </Link>
  );
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [scrolled, setScrolled] = useState(false);

  // blur background after scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // if already on home, click scrolls to top smoothly
  const handleHomeClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged out");
    router.push("/login");
  };

  const links: NavItem[] = [
    { href: "/", label: "Home", icon: Home, show: true },
    { href: "/books", label: "All Books", icon: Library, show: true },
    { href: "/add-book", label: "Add Book", icon: BookPlus, show: !!user },
    { href: "/my-books", label: "My Books", icon: BookOpen, show: !!user },
    { href: "/my-borrows", label: "My Borrows", icon: BookMarked, show: !!user },
  ].filter((l) => l.show);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled ? "bg-background/70 backdrop-blur-md" : "bg-background"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* logo and name */}
        <Link
          href="/"
          onClick={handleHomeClick}
          className="flex items-center gap-2 text-2xl font-bold"
        >
          <motion.span
            className="inline-flex text-primary"
            style={{ perspective: 400 }}
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            <BookOpen size={30} strokeWidth={2.2} />
          </motion.span>
          <span>BookNook</span>
        </Link>

        {/* links */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.href}
              link={link}
              active={pathname === link.href}
              onHomeClick={handleHomeClick}
            />
          ))}
        </div>

        {/* right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {isPending ? null : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full outline-none">
                <motion.div whileHover={{ scale: 1.1, rotateY: 15 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={user.image || "https://i.ibb.co/placeholder/user.png"}
                    alt={user.name}
                    className="h-10 w-10 rounded-full border-2 border-primary object-cover"
                  />
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5 text-sm font-semibold">
                  {user.name}
                </div>
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" onClick={() => router.push("/login")}>
                <Icon3D icon={LogIn} size={16} className="mr-1.5" />
                Login
              </Button>
              <Button onClick={() => router.push("/register")}>
                <Icon3D icon={UserPlus} size={16} className="mr-1.5" />
                Register
              </Button>
            </>
          )}
        </div>
      </div>

      {/* mobile links */}
      <div className="flex flex-wrap justify-center gap-4 border-t px-4 py-2 md:hidden">
        {links.map((link) => (
          <NavLink
            key={link.href}
            link={link}
            active={pathname === link.href}
            onHomeClick={handleHomeClick}
          />
        ))}
      </div>
    </motion.nav>
  );
}