'use client';

import { useEffect, useState } from 'react';
import QuranLayout from '@/components/quran/QuranLayout';
import AccordionQuranReader from '@/components/quran/AccordionQuranReader';
import { motion } from 'framer-motion';

/**
 * Redesigned Quran Index Page - Accordion-style Quran reader
 * Features collapsible surah sections, search functionality, and modern UI
 */
export default function QuranIndexPage() {
  // State for storing all surahs and loading state
  const [allSurahs, setAllSurahs] = useState([]);
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
        setError('Failed to load Quran data. Using mock data instead.');
      } finally {
        setLoading(false);
      }
    };

    fetchSurahs();
  }, []);
  
  // Show loading state with skeleton animation
  if (loading) {
    return (
      <QuranLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 animate-pulse">
            <div className="h-8 bg-muted rounded-lg w-64 mb-4"></div>
            <div className="h-4 bg-muted rounded-lg w-96"></div>
          </div>
          
          {/* Skeleton search bar */}
          <div className="mb-8 h-14 bg-muted rounded-lg"></div>
          
          {/* Skeleton toggle */}
          <div className="mb-8 flex justify-center">
            <div className="h-10 w-40 bg-muted rounded-full"></div>
          </div>
          
          {/* Skeleton accordion items */}
          <div className="space-y-4">
            {[...Array(7)].map((_, index) => (
              <div key={index} className="h-16 bg-muted rounded-xl animate-pulse"></div>
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
            <h1 className="text-3xl font-bold mb-4 text-destructive">Error</h1>
            <p className="text-muted-foreground mb-8">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
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
      {/* Warning message for mock data */}
      {error && (
        <div className="container mx-auto px-4 pt-4">
          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 text-yellow-800 dark:text-yellow-200">
            <p>{error}</p>
          </div>
        </div>
      )}
      
      {/* Render the accordion Quran reader */}
      <AccordionQuranReader surahs={allSurahs} />
    </QuranLayout>
  );
} 