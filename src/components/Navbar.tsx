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

// one nav link: pill style, active one has a filled background
function NavLink({
  link,
  active,
  onClick,
  mobile = false,
}: {
  link: NavItem;
  active: boolean;
  onClick: (e: React.MouseEvent) => void;
  mobile?: boolean;
}) {
  return (
    <Link
      href={link.href}
      onClick={onClick}
      className={`relative flex items-center gap-2 rounded-full text-sm font-medium transition-colors ${
        mobile ? "px-4 py-3" : "px-3.5 py-2"
      } ${
        active
          ? "bg-primary text-primary-foreground"
          : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      <Icon3D icon={link.icon} size={18} />
      {link.label}
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
    { href: "/my-borrows", label: "My Borrows", icon: BookMarked, show: !!user },
  ].filter((l) => l.show);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled || menuOpen
          ? "bg-background/80 backdrop-blur-md"
          : "bg-background"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3">
        {/* logo and name */}
        <Link
          href="/"
          onClick={handleHomeClick}
          className="flex items-center gap-2 text-xl font-bold sm:text-2xl"
        >
          <motion.span
            className="inline-flex text-primary"
            style={{ perspective: 400 }}
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            <BookOpen size={28} strokeWidth={2.2} />
          </motion.span>
          <span>BookNook</span>
        </Link>

        {/* desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.href}
              link={link}
              active={pathname === link.href}
              onClick={handleLinkClick(link.href)}
            />
          ))}
        </div>

        {/* right side */}
        <div className="flex items-center gap-2 sm:gap-3">
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
            <div className="hidden items-center gap-2 sm:flex">
              <Button variant="outline" onClick={() => router.push("/login")}>
                <Icon3D icon={LogIn} size={16} className="mr-1.5" />
                Login
              </Button>
              <Button onClick={() => router.push("/register")}>
                <Icon3D icon={UserPlus} size={16} className="mr-1.5" />
                Register
              </Button>
            </div>
          )}

          {/* hamburger (below lg) */}
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* mobile / tablet menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="overflow-hidden border-t lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
              {links.map((link) => (
                <NavLink
                  key={link.href}
                  link={link}
                  active={pathname === link.href}
                  onClick={handleLinkClick(link.href)}
                  mobile
                />
              ))}

              {/* login / register inside the menu on small screens */}
              {!isPending && !user && (
                <div className="mt-2 grid grid-cols-2 gap-3 sm:hidden">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}