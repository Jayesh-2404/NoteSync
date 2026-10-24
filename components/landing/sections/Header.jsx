"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { FileText, LayoutDashboard, Menu, X } from "lucide-react";

const navItems = [
  { href: "#features", label: "Features" },
  { href: "#demo", label: "Demo" },
  { href: "#pricing", label: "Pricing" },
];

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </Link>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      menuButtonRef.current?.focus();
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="flex h-16 items-center justify-between max-w-7xl mx-auto px-6 md:px-10">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <FileText className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">NoteSync</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <SignedOut>
              <Link
                href="/sign-in"
                className="hidden md:inline-flex text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Sign In
              </Link>
              <Link href="/sign-up">
                <Button size="sm" className="hidden md:inline-flex">
                  Get Started
                </Button>
              </Link>
            </SignedOut>

            <SignedIn>
              <Link href="/dashboard" className="hidden md:inline-flex">
                <Button size="sm" variant="outline" className="gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            <Button
              ref={menuButtonRef}
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "invisible pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div
          className={`absolute top-0 right-0 h-full w-3/4 max-w-sm bg-background p-6 shadow-lg transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <FileText className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">NoteSync</span>
            </Link>
            <Button
              ref={closeButtonRef}
              variant="ghost"
              size="icon"
              aria-label="Close menu"
              onClick={closeMenu}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="text-base font-medium text-muted-foreground hover:text-primary"
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-4 border-t space-y-4">
              <SignedOut>
                <Link
                  href="/sign-in"
                  onClick={closeMenu}
                  className="block text-base font-medium text-muted-foreground hover:text-primary"
                >
                  Sign In
                </Link>
                <Link href="/sign-up" onClick={closeMenu} className="block">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </SignedOut>

              <SignedIn>
                <Link href="/dashboard" onClick={closeMenu} className="block">
                  <Button className="w-full gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <div className="flex items-center gap-3 pt-1 text-sm text-muted-foreground">
                  <UserButton afterSignOutUrl="/" />
                  <span>Account</span>
                </div>
              </SignedIn>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
