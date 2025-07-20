"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavLink = ({ href, children }) => (
    <Link
      href={href}
      className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      {children}
      <span className="absolute bottom-[-2px] left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
    </Link>
  );

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

          <nav className="hidden md:flex items-center space-x-6 group">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#demo">Demo</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
          </nav>

          <div className="flex items-center gap-3">
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
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open Menu"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu with Overlay and Transition */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div
          className={`absolute top-0 right-0 h-full w-3/4 max-w-sm bg-background p-6 shadow-lg transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <FileText className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">NoteSync</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close Menu"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex flex-col space-y-6">
            <Link
              href="#features"
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-medium text-muted-foreground hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#demo"
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-medium text-muted-foreground hover:text-primary"
            >
              Demo
            </Link>
            <Link
              href="#pricing"
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-medium text-muted-foreground hover:text-primary"
            >
              Pricing
            </Link>
            <div className="pt-4 border-t">
              <Link
                href="/sign-in"
                onClick={() => setIsMenuOpen(false)}
                className="text-base font-medium text-muted-foreground hover:text-primary"
              >
                Sign In
              </Link>
            </div>
            <Link href="/sign-up" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full mt-2">Get Started</Button>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
