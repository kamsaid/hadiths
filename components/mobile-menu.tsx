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
          <Button variant="ghost" size="icon" aria-label="Menu" className="hover:text-[#FFB100]">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <nav className="flex flex-col gap-4 mt-8">
            {items.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-foreground hover:text-[#FFB100] py-2 text-lg"
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-4">
              <Link 
                href="/login"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-[#FFB100] text-[#263342] hover:bg-[#FFB100]/10 h-10 px-4 py-2"
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
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
} 