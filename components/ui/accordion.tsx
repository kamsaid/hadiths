"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

// Create a context for custom accordion behavior
const AccordionContext = React.createContext<{
  open: string[];
  toggle: (value: string) => void;
}>({
  open: [],
  toggle: () => {},
});

// Custom hook to use accordion item state
export const useAccordionItem = (value: string) => {
  const context = React.useContext(AccordionContext);
  
  if (!context) {
    throw new Error('useAccordionItem must be used within an AccordionProvider');
  }
  
  const isOpen = context.open.includes(value);
  const toggle = () => context.toggle(value);
  
  return { isOpen, toggle };
};

// Root Accordion component with context provider
const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {
    defaultOpen?: string[];
  }
>(({ children, type, value, defaultValue, onValueChange, defaultOpen = [], ...props }, ref) => {
  // State to track open items
  const [open, setOpen] = React.useState<string[]>(defaultOpen);
  
  // Handle value change from Radix Accordion
  React.useEffect(() => {
    if (type === "single" && value) {
      setOpen(value ? [value] : []);
    } else if (type === "multiple" && value) {
      setOpen(Array.isArray(value) ? value : []);
    }
  }, [type, value]);
  
  // Toggle function for custom accordion items
  const toggle = React.useCallback((itemValue: string) => {
    if (type === "single") {
      const newValue = open.includes(itemValue) ? "" : itemValue;
      setOpen(newValue ? [newValue] : []);
      (onValueChange as any)?.(newValue);
    } else {
      const newValue = open.includes(itemValue)
        ? open.filter(v => v !== itemValue)
        : [...open, itemValue];
      setOpen(newValue);
      (onValueChange as any)?.(newValue);
    }
  }, [open, onValueChange, type]);
  
  return (
    <AccordionContext.Provider value={{ open, toggle }}>
      <AccordionPrimitive.Root
        ref={ref}
        {...({ type, value, defaultValue, onValueChange, ...props } as any)}
      >
        {children}
      </AccordionPrimitive.Root>
    </AccordionContext.Provider>
  );
});
Accordion.displayName = "Accordion";

// Accordion Item component
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

// Accordion Trigger component
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

// Accordion Content component
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }; 