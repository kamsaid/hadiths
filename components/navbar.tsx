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
  { name: "Chat with Yaseen", href: "/chat" },
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
            <Link 
              href="/login"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              Login
            </Link>
            <Link 
              href="/try-free"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Try Free
            </Link>
          </div>
          <MobileMenu items={navigation} className="md:hidden" />
        </div>
      </div>
    </header>
  );
} 