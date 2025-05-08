'use client';

import { useEffect, useState } from 'react';
import QuranLayout from '@/components/quran/QuranLayout';
import QuranSearch from '@/components/quran/QuranSearch';
import SurahCard from '@/components/quran/SurahCard';
import VirtualizedMasonryGrid from '@/components/quran/VirtualizedMasonryGrid';
import { motion } from 'framer-motion';

/**
 * Redesigned Quran Index Page - Lists all surahs of the Quran with search and modern UI
 * Features responsive masonry grid, sticky search bar, and virtualized list for performance
 */
export default function QuranIndexPage() {
  // State for storing all surahs and filtered surahs
  const [allSurahs, setAllSurahs] = useState([]);
  const [filteredSurahs, setFilteredSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load surahs data on component mount
  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch('/api/quran');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        
        const surahs = await response.json();
        setAllSurahs(surahs);
        setFilteredSurahs(surahs);
      } catch (error) {
        console.error('Error loading surahs:', error);
        
        // Fallback to mock data in case the API fails
        const mockSurahs = Array.from({ length: 114 }, (_, i) => ({
          number: i + 1,
          name: `سورة ${i + 1}`,
          englishName: `Surah ${i + 1}`,
          englishNameTranslation: `Chapter ${i + 1}`,
          revelationType: i % 2 === 0 ? 'Meccan' : 'Medinan',
          ayahCount: Math.floor(Math.random() * 200) + 20
        }));
        
        setAllSurahs(mockSurahs);
        setFilteredSurahs(mockSurahs);
        setError('Failed to load Quran data. Using mock data instead.');
      } finally {
        setLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  // Add keyboard navigation hook at the component top level
  // This is important to maintain consistent hook order
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Get all surah cards
      const cards = document.querySelectorAll('.surah-card');
      if (!cards.length) return;
      
      // Find the currently focused card
      const focusedCard = document.activeElement;
      const isSurahCard = focusedCard && focusedCard.closest('.surah-card');
      if (!isSurahCard) return;
      
      // Convert NodeList to array for easier manipulation
      const cardsArray = Array.from(cards);
      const currentIndex = cardsArray.findIndex(card => card.contains(focusedCard));
      
      let nextIndex;
      
      // Handle arrow key navigation
      switch (e.key) {
        case 'ArrowRight':
          nextIndex = currentIndex + 1;
          break;
        case 'ArrowLeft':
          nextIndex = currentIndex - 1;
          break;
        case 'ArrowUp':
          // Move up to previous row (approximation in masonry layout)
          nextIndex = Math.max(0, currentIndex - 3);
          break;
        case 'ArrowDown':
          // Move down to next row (approximation in masonry layout)
          nextIndex = Math.min(cardsArray.length - 1, currentIndex + 3);
          break;
        default:
          return; // Not an arrow key, do nothing
      }
      
      // Check if next index is valid
      if (nextIndex >= 0 && nextIndex < cardsArray.length) {
        e.preventDefault();
        // Focus on the link inside the card
        const linkToFocus = cardsArray[nextIndex].querySelector('a');
        if (linkToFocus) linkToFocus.focus();
      }
    };
    
    // Add event listener
    window.addEventListener('keydown', handleKeyDown);
    
    // Clean up
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredSurahs]); // Add dependency on filteredSurahs to ensure it works when the list changes
  
  // Handle search input changes
  const handleSearch = (query) => {
    const searchTerm = query.toLowerCase().trim();
    
    if (!searchTerm) {
      // If search is empty, show all surahs
      setFilteredSurahs(allSurahs);
      return;
    }
    
    // Filter surahs based on search query
    const filtered = allSurahs.filter(surah => 
      // Search by number
      surah.number.toString().includes(searchTerm) ||
      // Search by name
      (surah.name && surah.name.toLowerCase().includes(searchTerm)) || 
      // Search by English name
      (surah.englishName && surah.englishName.toLowerCase().includes(searchTerm)) ||
      // Search by English translation
      (surah.englishNameTranslation && surah.englishNameTranslation.toLowerCase().includes(searchTerm))
    );
    
    setFilteredSurahs(filtered);
  };
  
  // Create a SkeletonSurahCard component
  function SkeletonSurahCard() {
    return (
      <div className="mb-6 p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 shadow-sm break-inside-avoid">
        <div className="flex justify-between items-start">
          {/* Skeleton circle for surah number */}
          <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          
          {/* Skeleton for Arabic title */}
          <div className="h-7 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        
        {/* Skeleton for English titles */}
        <div className="mt-4">
          <div className="h-6 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        
        {/* Skeleton for metadata */}
        <div className="flex items-center mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mr-3"></div>
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mr-3"></div>
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse ml-auto"></div>
        </div>
      </div>
    );
  }

  // Show loading state with skeleton animation
  if (loading) {
    return (
      <QuranLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-64 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-96"></div>
          </div>
          
          {/* Skeleton search bar */}
          <div className="mb-8 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          
          {/* Skeleton grid */}
          <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-6">
            {[...Array(12)].map((_, index) => (
              <SkeletonSurahCard key={index} />
            ))}
          </div>
        </div>
      </QuranLayout>
    );
  }

  // Show error state
  if (error && !allSurahs.length) {
    return (
      <QuranLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 text-red-600">Error</h1>
            <p className="text-gray-700 dark:text-gray-300 mb-8">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[var(--orange-primary)] text-white rounded-md hover:bg-[var(--orange-secondary)] transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </QuranLayout>
    );
  }
  
  return (
    <QuranLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2 text-[var(--dark-primary)] dark:text-white">
            The Noble Quran
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse through all 114 surahs of the Holy Quran
          </p>
        </motion.div>
        
        {/* Sticky search bar */}
        <QuranSearch onSearch={handleSearch} className="mb-8" />
        
        {/* Warning message for mock data */}
        {error && (
          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 text-yellow-800 dark:text-yellow-200">
            <p>{error}</p>
          </div>
        )}
        
        {/* Surah grid using masonry layout */}
        {filteredSurahs.length > 0 ? (
          <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-6">
            {filteredSurahs.map((surah, index) => (
              <SurahCard key={surah.number} surah={surah} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No surahs found matching your search
            </p>
            <button
              onClick={() => handleSearch('')}
              className="mt-4 px-4 py-2 bg-[var(--orange-primary)] text-white rounded-md hover:bg-[var(--orange-secondary)] transition"
            >
              Show All Surahs
            </button>
          </div>
        )}
      </div>
    </QuranLayout>
  );
} 