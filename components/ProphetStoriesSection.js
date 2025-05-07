"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

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

/**
 * ProphetStoriesSection displays featured prophet stories on the homepage
 */
export default function ProphetStoriesSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-[#FFB100]/10 to-[#FFB100]/5 dark:from-[#263342]/90 dark:to-[#263342]/80">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4 text-[#263342] dark:text-white"
            >
              Inspiring Stories of the Prophets
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-[#263342]/80 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Explore the timeless wisdom and guidance from the lives of the prophets mentioned in the Holy Quran.
            </motion.p>
          </div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Featured Prophet Card - Yusuf */}
            <motion.div 
              variants={item}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#263342] dark:text-white">Prophet Yusuf</h3>
                <p className="text-[#263342]/70 dark:text-gray-300 mb-4 line-clamp-3">
                  The story of patience, wisdom and forgiveness. From being betrayed by his brothers to becoming a ruler in Egypt.
                </p>
                <Link 
                  href="/prophet-stories/Prophet%20Yusuf" 
                  className="inline-flex items-center text-[#FFB100] hover:text-[#E09800] dark:text-[#FFB100] dark:hover:text-[#E09800] font-medium"
                  aria-label="Read the story of Prophet Yusuf"
                  tabIndex={0}
                >
                  Read Story <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
            
            {/* Featured Prophet Card - Nuh */}
            <motion.div 
              variants={item}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#263342] dark:text-white">Prophet Nuh</h3>
                <p className="text-[#263342]/70 dark:text-gray-300 mb-4 line-clamp-3">
                  The story of perseverance and faith. Calling his people to Allah for 950 years and building the ark to save the believers.
                </p>
                <Link 
                  href="/prophet-stories/Prophet%20Nuh" 
                  className="inline-flex items-center text-[#FFB100] hover:text-[#E09800] dark:text-[#FFB100] dark:hover:text-[#E09800] font-medium"
                  aria-label="Read the story of Prophet Nuh"
                  tabIndex={0}
                >
                  Read Story <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
            
            {/* Featured Prophet Card - Sulaiman */}
            <motion.div 
              variants={item}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#263342] dark:text-white">Prophet Sulaiman</h3>
                <p className="text-[#263342]/70 dark:text-gray-300 mb-4 line-clamp-3">
                  The story of wisdom and leadership. Blessed with the ability to speak to animals and command over jinn.
                </p>
                <Link 
                  href="/prophet-stories/Prophet%20Sulaiman" 
                  className="inline-flex items-center text-[#FFB100] hover:text-[#E09800] dark:text-[#FFB100] dark:hover:text-[#E09800] font-medium"
                  aria-label="Read the story of Prophet Sulaiman"
                  tabIndex={0}
                >
                  Read Story <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <Link 
              href="/prophet-stories" 
              className="inline-flex items-center justify-center px-6 py-3 bg-[#FFB100] text-[#263342] rounded-lg hover:bg-[#E09800] transition-colors font-medium shadow-md hover:shadow-lg"
              aria-label="Explore all prophet stories"
              tabIndex={0}
            >
              Explore All Prophet Stories
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 