"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import prophetStories from "@/content/prophetstories.json";

// Animation variants for staggered list rendering
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function ProphetStoriesPage() {
  // State to handle client-side rendering
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Convert the prophets data to a more usable format
  const prophets = mounted 
    ? Object.entries(prophetStories).map(([key, value]) => {
        const prophetName = Object.keys(value)[0];
        const prophetData = (value as any)[prophetName];
        return {
          id: key,
          name: prophetName,
          intro: prophetData.Intro
        };
      })
    : [];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with subtle gradient background */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-duson-yellow/5 to-duson-crimson/5 pointer-events-none" />
        
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-duson-yellow/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-20 w-32 h-32 bg-duson-crimson/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="container relative z-10 py-16 text-center">
          {/* Title with gradient effect */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-duson-yellow to-duson-crimson">
            Inspiring Stories of the Prophets
          </h1>
          <p className="text-center text-lg mb-12 max-w-3xl mx-auto text-muted-foreground">
            Explore the timeless wisdom and guidance from the lives of the prophets mentioned in the Holy Quran.
          </p>
        </div>
      </section>
      
      {/* Stories Grid Section */}
      <section className="py-12">
        <div className="container px-4">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {prophets.map((prophet) => (
              <motion.div 
                key={prophet.id} 
                variants={item}
                className="group bg-card text-card-foreground rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-3 text-foreground">
                    Prophet {prophet.name.replace("Prophet ", "")}
                  </h2>
                  <p className="text-muted-foreground line-clamp-3 mb-4">
                    {prophet.intro}
                  </p>
                  <Link 
                    href={`/prophet-stories/${encodeURIComponent(prophet.name)}`}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md transition-colors font-medium group-hover:bg-duson-crimson group-hover:text-white"
                    aria-label={`Read the story of Prophet ${prophet.name.replace("Prophet ", "")}`}
                    tabIndex={0}
                  >
                    Read Story 
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="text-center">
            <div className="inline-block">
              <Link 
                href="/prophet-stories/all"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-duson-yellow to-duson-crimson text-white py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium"
                aria-label="Explore all prophet stories"
                tabIndex={0}
              >
                Explore All Prophet Stories
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 transition-transform group-hover:translate-x-1" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 