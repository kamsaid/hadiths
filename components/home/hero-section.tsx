import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background z-0" />
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex flex-col md:flex-row gap-8 items-center mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Find Peace Through Prayer
              </h1>
              {/* Kaaba image beside the heading on larger screens */}
              <div className="hidden md:block relative h-32 w-32 lg:h-40 lg:w-40 rounded-lg overflow-hidden shrink-0 shadow-xl">
                <Image 
                  src="/images/kaaba-prayer.png" 
                  alt="Muslims praying at Kaaba in Mecca" 
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            {/* Kaaba image below the heading on mobile */}
            <div className="md:hidden relative h-40 w-full max-w-[280px] mx-auto rounded-lg overflow-hidden mb-6 shadow-xl">
              <Image 
                src="/images/kaaba-prayer.png" 
                alt="Muslims praying at Kaaba in Mecca" 
                fill
                className="object-cover"
                priority
              />
            </div>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-lg">
              Join thousands of Muslims finding guidance and tranquility in daily prayer and reflection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/try-free">Try Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/how-to-pray">Learn How to Pray</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="/images/hero-prayer-app.png" 
                alt="Yaseen" 
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Floating elements for visual interest */}
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
} 