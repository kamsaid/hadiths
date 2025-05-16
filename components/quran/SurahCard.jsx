'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
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
 * Includes highlighted state for active surah
 */
export default function SurahCard({ surah, index }) {
  const router = useRouter();
  const pathname = usePathname();
  const cardRef = useRef(null);
  
  // Check if this is the active surah based on the current path
  const isCurrent = pathname === `/quran/${surah.number}`;
  
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
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className={`surah-card relative mb-6 overflow-hidden rounded-xl shadow-sm transition duration-300
        ${isCurrent 
          ? 'ring-2 ring-primary border-primary bg-primary/5' 
          : 'border border-border bg-card hover:shadow-md hover:scale-[1.02]'}`}
    >
      <Link 
        href={`/quran/${surah.number}`}
        tabIndex={0}
        className="block outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary p-1"
        onKeyDown={handleKeyDown}
        aria-label={`Surah ${surah.englishName}, ${surah.englishNameTranslation}`}
      >
        {/* Top section with number indicator and Arabic name */}
        <div className="flex items-start justify-between p-4">
          <div className={`flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full 
            ${isCurrent
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground'} 
            shadow-sm`}
          >
            <span className="text-lg font-semibold">{surah.number}</span>
          </div>
          
          <h3 className="font-amiri font-bold text-foreground text-2xl leading-tight text-right">
            {surah.name}
          </h3>
        </div>
        
        {/* Separator */}
        <div className="mx-4 h-px bg-border"></div>
        
        {/* Bottom section with English names and metadata */}
        <div className="p-4">
          <div className="mb-3">
            <h3 className="font-bold text-lg text-foreground">
              {surah.englishName}
            </h3>
            <p className="text-muted-foreground text-sm">
              {surah.englishNameTranslation}
            </p>
          </div>
          
          {/* Metadata badges */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className={`px-2 py-1 rounded-full 
              ${surah.revelationType === 'Meccan' 
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200' 
                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200'}`}
            >
              {surah.revelationType}
            </span>
            
            <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground">
              {surah.ayahCount} verses
            </span>
            
            <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground">
              ~{readingTimeMinutes} min
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
} 