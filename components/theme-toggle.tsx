"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  // Get theme and setTheme from next-themes
  const { theme, setTheme } = useTheme();
  // State to track initialization
  const [mounted, setMounted] = React.useState(false);
  
  // Handle initialization and hydration
  React.useEffect(() => {
    // Set mounted to true to avoid hydration mismatch
    setMounted(true);
  }, []);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  // Avoid rendering the wrong icon during SSR/hydration
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="hover:text-[#FFB100] transition-colors opacity-0"
        aria-label="Toggle theme"
        tabIndex={0}
      >
        <Moon className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="hover:text-[#FFB100] transition-colors"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleTheme();
        }
      }}
    >
      {/* Show sun icon in dark mode, moon icon in light mode */}
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
} 