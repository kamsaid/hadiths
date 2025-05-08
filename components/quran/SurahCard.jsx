'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCallback, useRef } from 'react';

// Custom SVG icons instead of Heroicons
const BookOpenIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className={className}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" 
    />
  </svg>
);

const ClockIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className={className}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" 
    />
  </svg>
);

/**
 * Redesigned SurahCard component for the Quran list view
 * Displays a surah with key metadata in a stylish, interactive card
 */
export default function SurahCard({ surah, index }) {
  const router = useRouter();
  const cardRef = useRef(null);
  
  // Calculate estimated reading time based on ayah count
  // Average reading speed of 7 verses per minute
  const readingTimeMinutes = Math.ceil(surah.ayahCount / 7);
  
  // Function to handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      router.push(`/quran/${surah.number}`);
    }
  }, [router, surah.number]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="surah-card relative mb-6 p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:ring-2 hover:ring-orange-light/60 hover:-translate-y-0.5 hover:shadow-xl transition break-inside-avoid focus-within:ring-2 focus-within:ring-[var(--orange-secondary)]"
    >
      {/* Card header with flex layout for proper alignment */}
      <div className="flex justify-between items-start mb-4">
        {/* Circular chip with surah number - changed from absolute positioning to relative */}
        <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--orange-primary)] text-white font-semibold ring-2 ring-white dark:ring-gray-800 shadow-md">
          <span className="text-base">{surah.number}</span>
        </div>
        
        {/* Arabic title */}
        <h3 className="font-amiri font-bold text-[var(--dark-primary)] dark:text-white text-xl leading-tight text-right">
          {surah.name}
        </h3>
      </div>
      
      <Link 
        href={`/quran/${surah.number}`}
        tabIndex={0}
        className="block outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange-secondary)] rounded-xl"
        onKeyDown={handleKeyDown}
        aria-label={`Surah ${surah.englishName}, ${surah.englishNameTranslation}`}
      >
        {/* English names */}
        <div className="mt-4">
          <h3 className="font-bold text-lg text-[var(--dark-primary)] dark:text-white mb-1">
            {surah.englishName}
          </h3>
          <p className="font-inter text-[var(--dark-primary)]/80 dark:text-gray-400 text-sm">
            {surah.englishNameTranslation}
          </p>
        </div>
        
        {/* Metadata row with heroicons */}
        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
          {/* Verses count */}
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <BookOpenIcon className="h-4 w-4 mr-1" />
            {surah.ayahCount} verses
          </div>
          
          {/* Reading time estimate */}
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <ClockIcon className="h-4 w-4 mr-1" />
            {readingTimeMinutes} min
          </div>
          
          {/* Revelation type badge */}
          <div className={`ml-auto text-xs px-2 py-1 rounded-full ${
            surah.revelationType === 'Meccan' 
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
              : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
          }`}>
            {surah.revelationType}
          </div>
        </div>
      </Link>
    </motion.div>
  );
} 