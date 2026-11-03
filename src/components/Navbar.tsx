"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
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
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { clearToken } from "@/lib/token";
import ThemeToggle from "@/components/ThemeToggle";
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

function DesktopLink({
  link,
  active,
  onClick,
}: {
  link: NavItem;
  active: boolean;
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <Link
      href={link.href}
      onClick={onClick}
      className={`relative px-1 py-2 text-sm font-medium tracking-wide transition-colors ${
        active
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {link.label}
      {active && (
        <motion.span
          layoutId="nav-underline"
          className="absolute inset-x-0 -bottom-0.5 h-px bg-foreground"
          transition={{ duration: 0.3, ease: "easeOut" }}
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

 
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  
  const handleHomeClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLinkClick = (href: string) => (e: React.MouseEvent) => {
    if (href === "/") handleHomeClick(e);
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    clearToken();
    await authClient.signOut();
    toast.success("Logged out");
    setMenuOpen(false);
    router.push("/login");
  };

  const links: NavItem[] = [
    { href: "/", label: "Home", icon: Home, show: true },
    { href: "/books", label: "All Books", icon: Library, show: true },
    { href: "/add-book", label: "Add Book", icon: BookPlus, show: !!user },
    { href: "/my-books", label: "My Books", icon: BookOpen, show: !!user },
    {
      href: "/my-borrows",
      label: "My Borrows",
      icon: BookMarked,
      show: !!user,
    },
  ].filter((l) => l.show);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-border bg-background/75 backdrop-blur-xl"
            : "border-transparent bg-background"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          
          <Link
            href="/"
            onClick={handleHomeClick}
            className="flex items-center gap-2"
          >
            <BookOpen className="text-primary" size={26} strokeWidth={1.8} />
            <span className="font-heading text-2xl leading-none">BookNook</span>
          </Link>

        
          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <DesktopLink
                key={link.href}
                link={link}
                active={pathname === link.href}
                onClick={handleLinkClick(link.href)}
              />
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            {isPending ? null : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-full outline-none">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={user.image || "https://i.ibb.co/placeholder/user.png"}
                    alt={user.name}
                    className="h-10 w-10 rounded-full border border-border object-cover transition-transform hover:scale-105"
                  />
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
              <div className="hidden items-center gap-2 sm:flex">
                <Button variant="outline" onClick={() => router.push("/login")}>
                  <LogIn className="mr-1.5 h-4 w-4" />
                  Login
                </Button>
                <Button onClick={() => router.push("/register")}>
                  <UserPlus className="mr-1.5 h-4 w-4" />
                  Register
                </Button>
              </div>
            )}

            
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </motion.header>

      
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              className="fixed right-0 top-0 z-50 flex h-full w-[80%] max-w-sm flex-col gap-2 border-l bg-background p-6 lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-heading text-2xl">Menu</span>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {links.map((link) => {
                const Icon = link.icon;
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick(link.href)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base transition-colors ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary"
                    }`}
                  >
                    <Icon size={20} />
                    {link.label}
                  </Link>
                );
              })}

              {!isPending && !user && (
                <div className="mt-4 grid grid-cols-2 gap-3 sm:hidden">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setMenuOpen(false);
                      router.push("/login");
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      setMenuOpen(false);
                      router.push("/register");
                    }}
                  >
                    Register
                  </Button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
