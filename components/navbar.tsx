"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import MobileMenu from "./mobile-menu";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "How to Pray", href: "/prayer" },
  { name: "Quran", href: "/quran" },
  { name: "Hadiths", href: "/hadith" },
  { name: "Prophet Stories", href: "/prophet-stories" },
];

export function Navbar() {
  return (
    <header className="bg-background/95 backdrop-blur-sm sticky top-0 z-50 w-full border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-2xl">
            {/* Logo with styled text */}
            <span className="text-green-500">Yas</span><span className="text-yellow-500">een</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          <div className="hidden md:flex gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/try-free">Try Free</Link>
            </Button>
          </div>
          <MobileMenu items={navigation} className="md:hidden" />
        </div>
      </div>
    </header>
  );
} 