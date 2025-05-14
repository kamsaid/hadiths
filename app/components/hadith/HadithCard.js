'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion

/**
 * HadithCard - Redesigned component to display hadith information in a card format
 * Features orange header strip, category pill, and styled Arabic/Latin text
 * 
 * @param {Object} hadith - The hadith object with all hadith data
 * @param {Number} index - Index for staggered animation
 */
export default function HadithCard({ hadith, index = 0 }) {
  // Provide fallback if hadith is undefined
  if (!hadith) {
    return null;
  }
  
  // Extract the hadith number from the ID with fallback
  const hadithNumber = hadith.idInBook || 0;
  
  // Truncate the text if it's too long for card display
  const truncateText = (text, maxLength = 150) => {
    if (!text || text.length <= maxLength) return text || '';
    return text.substring(0, maxLength) + '...';
  };
  
  // Format the arabic text for display with fallback
  const arabicText = hadith.arabic || '';
  
  // Format the english text for display with fallback
  const englishText = hadith.english && hadith.english.text ? truncateText(hadith.english.text) : '';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05, // Staggered animation
        ease: [0.22, 1, 0.36, 1] 
      }}
      className="relative mb-6 p-0 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:ring-2 hover:ring-orange-light/60 transition break-inside-avoid"
    >
      <Link 
        href={`/hadith/${hadithNumber}`}
        className="block h-full"
        tabIndex={0}
        aria-label={`Hadith number ${hadithNumber}`}
      >
        {/* Hadith Header - Orange strip with category pill */}
        <div className="bg-[var(--orange-primary)] h-10 flex items-center justify-between px-4 rounded-t-xl text-white">
          <h3 className="font-semibold">Hadith #{hadithNumber}</h3>
          <span className="text-xs rounded-full bg-white/20 px-2 py-0.5">
            Nawawi
          </span>
        </div>
        
        {/* Hadith Content */}
        <div className="p-5">
          {/* Arabic Text */}
          <p 
            dir="rtl" 
            className="font-noto text-[1.35rem] leading-relaxed text-[var(--dark-primary)] dark:text-gray-200 my-4 line-clamp-3"
          >
            {truncateText(arabicText, 200)}
          </p>
          
          {/* English Translation */}
          {englishText && (
            <p className="text-[var(--dark-primary)]/85 dark:text-gray-300 text-[15px] line-clamp-3 mb-4">
              {englishText}
            </p>
          )}
          
          {/* Read more button */}
          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
            <button 
              className="text-sm font-medium px-3 py-1.5 rounded-md border border-[var(--dark-primary)]/20 text-[var(--dark-primary)] dark:text-white hover:bg-orange-light dark:hover:bg-orange-light/30 transition-all"
            >
              Read full ↗
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
} 