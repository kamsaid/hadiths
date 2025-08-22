"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

interface MobileMenuProps {
  items: { name: string; href: string }[];
  className?: string;
}

export default function MobileMenu({ items, className }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("flex items-center", className)}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Open navigation menu"
            className="h-11 w-11 hover:text-duson-yellow hover:bg-duson-yellow/10 transition-colors duration-200"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <nav className="flex flex-col gap-2 mt-8">
            {/* Navigation Links - Optimized for mobile touch */}
            {items.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-foreground hover:text-duson-yellow hover:bg-duson-yellow/10 py-4 px-4 text-lg font-medium rounded-lg transition-all duration-200 min-h-[44px] flex items-center"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Divider */}
            <div className="h-px bg-border my-4" />
            
            {/* Theme toggle in mobile menu */}
            <div className="flex items-center justify-between py-4 px-4 hover:bg-muted/50 rounded-lg transition-colors">
              <span className="text-foreground font-medium">Theme</span>
              <ThemeToggle />
            </div>
            
            {/* Login Button */}
            <div className="mt-4 px-4">
              <Link 
                href="/login"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-duson-yellow text-duson-ebony dark:text-duson-cream hover:bg-duson-yellow/10 h-11 px-6 w-full"
              >
                Login
              </Link>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
} 