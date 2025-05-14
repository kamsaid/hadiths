"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import MobileMenu from "./mobile-menu";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

const navigation = [
  { name: "How to Pray", href: "/prayer" },
  { name: "Quran", href: "/quran" },
  { name: "Hadiths", href: "/hadith" },
  { name: "Prophet Stories", href: "/prophet-stories" },
  { name: "Chat with Yaseen", href: "/chat" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-duson-ebony/10 dark:border-duson-cream/10 bg-duson-cream dark:bg-duson-ebony">
      <div className="container px-4 flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex justify-center items-center bg-gradient-to-r from-duson-yellow to-duson-crimson text-duson-cream w-10 h-10 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <span className="font-semibold text-lg">
            <span className="text-duson-yellow">Yas</span><span className="text-duson-ebony dark:text-duson-cream">een</span>
          </span>
        </Link>

        <div className="ml-auto flex gap-4 items-center">
          <Button
            onClick={toggleTheme}
            variant="ghost"
            className="p-2 text-duson-ebony dark:text-duson-cream hover:bg-duson-yellow/10 dark:hover:bg-duson-yellow/10"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            )}
          </Button>
          
          <Link href="/quran">
            <Button 
              variant={pathname.startsWith('/quran') ? 'accent' : 'ghost'} 
              className={
                pathname.startsWith('/quran')
                ? 'bg-duson-yellow text-duson-ebony hover:bg-duson-crimson hover:text-duson-cream'
                : 'text-duson-ebony dark:text-duson-cream hover:bg-duson-yellow/10 dark:hover:bg-duson-yellow/10'
              }
            >
              Quran
            </Button>
          </Link>
          
          <Link href="/hadith">
            <Button 
              variant={pathname.startsWith('/hadith') ? 'accent' : 'ghost'} 
              className={
                pathname.startsWith('/hadith')
                ? 'bg-duson-yellow text-duson-ebony hover:bg-duson-crimson hover:text-duson-cream'
                : 'text-duson-ebony dark:text-duson-cream hover:bg-duson-yellow/10 dark:hover:bg-duson-yellow/10'
              }
            >
              Hadith
            </Button>
          </Link>
          
          <Link href="/dashboard">
            <Button 
              variant="outline" 
              className="border border-duson-yellow text-duson-ebony dark:text-duson-cream hover:bg-duson-yellow/10"
            >
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
} 