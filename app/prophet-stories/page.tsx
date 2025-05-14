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
    <div className="bg-gradient-to-b from-[#FFB100]/10 to-[#FFB100]/5 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-4 text-[#263342]">Inspiring Stories of the Prophets</h1>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto text-[#263342]/80">
          Explore the timeless wisdom and guidance from the lives of the prophets mentioned in the Holy Quran.
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
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-3 text-[#263342]">Prophet {prophet.name.replace("Prophet ", "")}</h2>
                <p className="text-[#263342]/70 line-clamp-3 mb-4">
                  {prophet.intro}
                </p>
                <Link 
                  href={`/prophet-stories/${encodeURIComponent(prophet.name)}`}
                  className="inline-block bg-[#FFB100] text-[#263342] py-2 px-4 rounded-md hover:bg-[#E09800] transition-colors font-medium"
                  aria-label={`Read the story of Prophet ${prophet.name.replace("Prophet ", "")}`}
                  tabIndex={0}
                >
                  Read Story <span aria-hidden="true">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="flex justify-center mt-12">
          <Link 
            href="/prophet-stories/all"
            className="btn-primary flex items-center gap-2 text-[#263342] py-3 px-6 rounded-md shadow-md hover:shadow-lg"
            aria-label="Explore all prophet stories"
            tabIndex={0}
          >
            Explore All Prophet Stories
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
} 