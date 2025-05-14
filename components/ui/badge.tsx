"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Define the badge variants using class-variance-authority
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        yellow: "border-transparent bg-duson-yellow text-duson-ebony hover:bg-duson-yellow/80",
        crimson: "border-transparent bg-duson-crimson text-duson-cream hover:bg-duson-crimson/80",
        ebony: "border-transparent bg-duson-ebony text-duson-cream hover:bg-duson-ebony/80",
        cream: "border-transparent bg-duson-cream text-duson-ebony hover:bg-duson-cream/80",
        yellowOutline: "border-duson-yellow text-duson-yellow hover:bg-duson-yellow/10",
        crimsonOutline: "border-duson-crimson text-duson-crimson hover:bg-duson-crimson/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Badge component that accepts variant props from the cva function
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants }; 