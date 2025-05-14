"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import MobileMenu from "./mobile-menu";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

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
            {/* Logo with styled text using orange and black theme */}
            <span className="text-[#FFB100]">Yas</span><span className="text-[#263342] dark:text-white">een</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-[#FFB100] transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" aria-label="Search" className="hover:text-[#FFB100]">
            <Search className="h-5 w-5" />
          </Button>
          {/* Theme toggle button */}
          <ThemeToggle />
          <div className="hidden md:flex gap-2">
            <Link 
              href="/login"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-[#FFB100] text-[#263342] dark:text-white hover:bg-[#FFB100]/10 h-10 px-4 py-2"
            >
              Login
            </Link>
            <Link 
              href="/try-free"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#FFB100] text-[#263342] hover:bg-[#E09800] h-10 px-4 py-2"
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