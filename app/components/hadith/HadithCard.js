'use client';

import Link from 'next/link';
import { useState } from 'react';

/**
 * HadithCard - Component to display basic hadith information in a card format
 * 
 * @param {Object} hadith - The hadith object with all hadith data
 */
export default function HadithCard({ hadith }) {
  // Provide fallback if hadith is undefined
  if (!hadith) {
    return null;
  }
  
  // State to track whether the card is being hovered over
  const [isHovered, setIsHovered] = useState(false);
  
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
    <Link 
      href={`/hadith/${hadithNumber}`}
      className="block transition-all duration-300 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`h-full rounded-lg overflow-hidden shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all ${isHovered ? 'transform scale-[1.02]' : ''}`}>
        {/* Hadith Header */}
        <div className="bg-emerald-600 dark:bg-emerald-700 px-4 py-3 text-white">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Hadith #{hadithNumber}</h3>
            <span className="text-sm bg-white text-emerald-700 rounded-full px-2 py-1">
              Nawawi
            </span>
          </div>
        </div>
        
        {/* Hadith Content */}
        <div className="p-4">
          {/* Arabic Text */}
          <div className="mb-4 text-right" dir="rtl">
            <p className="text-gray-800 dark:text-gray-200 font-arabic text-lg line-clamp-3">
              {truncateText(arabicText, 100)}
            </p>
          </div>
          
          {/* English Translation */}
          {englishText && (
            <div className="mb-3">
              <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                {englishText}
              </p>
            </div>
          )}
          
          {/* Read more button */}
          <div className="mt-2">
            <span className={`inline-block text-emerald-600 dark:text-emerald-400 font-medium transition-all ${isHovered ? 'translate-x-1' : ''}`}>
              Read full hadith →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
} 