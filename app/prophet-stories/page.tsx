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
        const prophetData = value[prophetName];
        return {
          id: key,
          name: prophetName,
          intro: prophetData.Intro
        };
      })
    : [];

  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Prophet Stories</h1>
      <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
        Explore the inspiring stories of the prophets mentioned in the Holy Quran. 
        Each story contains valuable lessons and wisdom for our daily lives.
      </p>
      
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
            className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-3">{prophet.name}</h2>
              <p className="text-muted-foreground line-clamp-4 mb-4">
                {prophet.intro}
              </p>
              <Link 
                href={`/prophet-stories/${encodeURIComponent(prophet.name)}`}
                className="inline-block bg-primary text-white py-2 px-4 rounded hover:bg-primary/90 transition-colors"
              >
                Read Full Story
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
} 