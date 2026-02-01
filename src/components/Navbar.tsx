"use client";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Languages } from "lucide-react";
export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary text-white"><Languages size={20} /></div>
          <span className="text-xl font-bold tracking-tight hidden sm:inline-block">Free Online Tools</span>
        </Link>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
            <Link href="/languages" className="hover:text-brand-primary transition-colors">Languages</Link>
            <Link href="/about" className="hover:text-brand-primary transition-colors">About</Link>
            <Link href="/contact" className="hover:text-brand-primary transition-colors">Contact</Link>
          </div>
          <div className="flex items-center gap-2 border-l pl-4"><ThemeToggle /></div>
        </div>
      </div>
    </nav>
  );
}
