'use client';

import { useState, useEffect } from 'react';
import QuranSurahHeader from '@/app/components/quran/QuranSurahHeader';
import QuranAyah from '@/app/components/quran/QuranAyah';

/**
 * QuranSurahPage - Displays a specific surah with its verses
 * @param {Object} props - Component props from Next.js
 * @param {Object} props.params - URL parameters
 * @param {string} props.params.surah - Surah number from URL
 */
export default function QuranSurahPage({ params }) {
  // State to track if page is client-side mounted (for SSR compatibility)
  const [mounted, setMounted] = useState(false);
  // Surah data state
  const [surahData, setSurahData] = useState(null);
  // State for showing/hiding translation
  const [showTranslation, setShowTranslation] = useState(true);
  // Loading state
  const [loading, setLoading] = useState(true);
  // Error state
  const [error, setError] = useState(null);

  // Parse surah number from params
  const surahNumber = parseInt(params.surah, 10);

  // Handle toggle translation visibility
  const handleToggleTranslation = () => {
    setShowTranslation((prev) => !prev);
  };

  // Fetch surah data on mount or when surah number changes
  useEffect(() => {
    const fetchSurah = async () => {
      setLoading(true);
      try {
        // Get surah data from API
        const response = await fetch(`/api/quran?surah=${surahNumber}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setSurahData(null);
          } else {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
          }
        } else {
          const data = await response.json();
          setSurahData(data);
        }
      } catch (error) {
        console.error('Error fetching surah:', error);
        setError(`Failed to load Surah #${surahNumber}. Please try again later.`);
      } finally {
        setLoading(false);
      }
    };

    fetchSurah();
    setMounted(true);
  }, [surahNumber]);

  // Show loading state
  if (loading || !mounted) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse space-y-8">
          <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg max-w-md mx-auto"></div>
          <div className="space-y-4">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Error</h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          {error}
        </p>
        <a
          href="/quran"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Return to Quran Index
        </a>
      </div>
    );
  }

  // Handle case where surah is not found
  if (!surahData) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Surah Not Found</h1>
        <p className="mb-6">
          The requested surah (#{surahNumber}) could not be found.
        </p>
        <a
          href="/quran"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Return to Quran Index
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Surah header with controls */}
      <QuranSurahHeader
        surah={surahData}
        onToggleTranslation={handleToggleTranslation}
        showTranslation={showTranslation}
      />
      
      {/* Bismillah header for all surahs except At-Tawbah (9) */}
      {surahNumber !== 9 && (
        <div className="text-center my-8">
          <p className="font-arabic text-2xl mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">In the name of Allah, the Entirely Merciful, the Especially Merciful</p>
        </div>
      )}
      
      {/* Ayahs/verses list */}
      <div className="mt-8">
        {surahData.ayahs.map((ayah) => (
          <QuranAyah
            key={ayah.number}
            ayah={ayah}
            surahNumber={surahNumber}
            showTranslation={showTranslation}
          />
        ))}
      </div>
    </div>
  );
} 