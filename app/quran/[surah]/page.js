'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Components
import SurahHeader from '@/components/quran/SurahHeader';
import AyahDisplay from '@/components/quran/AyahDisplay';
import ScrollSpySidebar from '@/components/quran/ScrollSpySidebar';
import FontSizeSlider from '@/components/quran/FontSizeSlider';

/**
 * SurahDetailPage - Beautiful read-only Qur'an reader page
 * Features elegant typography, responsive design, and smooth animations
 */
export default function SurahDetailPage({ params }) {
  // Parse surah number from URL params
  const surahNumber = parseInt(params.surah, 10);
  
  // Component state
  const [surahData, setSurahData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentAyahNumber, setCurrentAyahNumber] = useState(1);
  const [showTransliteration, setShowTransliteration] = useState(false);
  
  // Fetch surah data
  useEffect(() => {
    const fetchSurah = async () => {
      setLoading(true);
      
      try {
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
          
          // Check for hash in URL to set initial active ayah
          if (typeof window !== 'undefined') {
            const hash = window.location.hash;
            if (hash && hash.startsWith('#ayah-')) {
              const ayahNumber = parseInt(hash.replace('#ayah-', ''), 10);
              if (!isNaN(ayahNumber)) {
                setCurrentAyahNumber(ayahNumber);
                
                // Scroll to the ayah after a short delay
                setTimeout(() => {
                  const element = document.getElementById(`ayah-${ayahNumber}`);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }, 500);
              }
            }
          }
        }
      } catch (error) {
        console.error('Error fetching surah:', error);
        setError(`Failed to load Surah #${surahNumber}. Please try again later.`);
        
        // Create mock data if API fails
        const mockAyahs = Array.from({ length: 20 }, (_, i) => ({
          number: i + 1,
          text: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ هَٰذَا مِثَالٌ لِلْنَّصِ الْعَرَبِيِّ ${i + 1}`,
          translation: `This is an example verse translation ${i + 1}. The API may be unavailable or the XML file could not be properly parsed.`,
          transliteration: `Bismillahi r-rahmani r-rahim. Hadha mithalun lilnassi al-'arabiyyi ${i + 1}`
        }));
        
        setSurahData({
          number: surahNumber,
          name: `سورة ${surahNumber}`,
          englishName: `Surah ${surahNumber}`,
          englishNameTranslation: `The Chapter ${surahNumber}`,
          revelationType: surahNumber % 2 === 0 ? 'Meccan' : 'Medinan',
          ayahs: mockAyahs,
          ayahCount: mockAyahs.length
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSurah();
  }, [surahNumber]);
  
  // Toggle transliteration visibility
  const toggleTransliteration = () => {
    setShowTransliteration(!showTransliteration);
    localStorage.setItem('show-transliteration', !showTransliteration ? 'true' : 'false');
  };
  
  // Load transliteration preference
  useEffect(() => {
    const showTranslit = localStorage.getItem('show-transliteration') === 'true';
    setShowTransliteration(showTranslit);
  }, []);

  // Loading state with skeleton UI
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[var(--dark-primary)]">
        <div className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-[var(--dark-primary)]/80 shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="h-14 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            {/* Bismillah skeleton */}
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto w-3/4 max-w-3xl mb-12"></div>
            
            {/* Verses skeleton */}
            <div className="space-y-16 max-w-4xl mx-auto">
              {[...Array(7)].map((_, index) => (
                <div key={index} className="flex flex-col">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-5"></div>
                  <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !surahData) {
    return (
      <div className="min-h-screen bg-white dark:bg-[var(--dark-primary)]">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Error</h1>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            {error}
          </p>
          <a
            href="/quran"
            className="bg-[var(--orange-primary)] hover:bg-[var(--orange-secondary)] text-white px-4 py-2 rounded-md transition-colors"
          >
            Return to Quran Index
          </a>
        </div>
      </div>
    );
  }

  // Handle case where surah is not found
  if (!surahData) {
    return (
      <div className="min-h-screen bg-white dark:bg-[var(--dark-primary)]">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4 text-[var(--dark-primary)] dark:text-white">Surah Not Found</h1>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            The requested surah (#{surahNumber}) could not be found.
          </p>
          <a
            href="/quran"
            className="bg-[var(--orange-primary)] hover:bg-[var(--orange-secondary)] text-white px-4 py-2 rounded-md transition-colors"
          >
            Return to Quran Index
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[var(--dark-primary)]">
      {/* Sticky header with surah info and controls */}
      <SurahHeader surah={surahData} />
      
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Warning message if using mock data */}
        {error && (
          <div className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 text-yellow-800 dark:text-yellow-200 max-w-4xl mx-auto">
            <h3 className="font-bold mb-2">⚠️ Using fallback data</h3>
            <p>{error}</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main content area - ayahs */}
          <div className="lg:col-span-9 lg:mr-12">
            {/* Bismillah header for all surahs except At-Tawbah (9) */}
            {surahNumber !== 9 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center my-12"
              >
                <p className="font-amiri font-bold text-4xl mb-3 text-[var(--dark-primary)] dark:text-white">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <p className="text-[var(--dark-primary)]/60 dark:text-white/60 text-sm">
                  In the name of Allah, the Entirely Merciful, the Especially Merciful
                </p>
              </motion.div>
            )}
            
            {/* Transliteration toggle */}
            <div className="flex justify-end mb-8">
              <button
                onClick={toggleTransliteration}
                className={`rounded-full px-4 py-1.5 text-sm transition ${
                  showTransliteration 
                    ? 'bg-[var(--orange-primary)] text-white' 
                    : 'bg-gray-100 dark:bg-gray-800 text-[var(--dark-primary)] dark:text-white'
                }`}
              >
                {showTransliteration ? 'Hide Transliteration' : 'Show Transliteration'}
              </button>
            </div>
            
            {/* Ayahs/verses list */}
            <div className="mb-12 max-w-4xl mx-auto">
              {surahData.ayahs.map((ayah) => (
                <AyahDisplay
                  key={ayah.number}
                  ayah={ayah}
                  surahNumber={surahNumber}
                  showTransliteration={showTransliteration}
                />
              ))}
            </div>
          </div>
          
          {/* Sidebar with scroll spy navigation */}
          <div className="lg:col-span-3">
            <ScrollSpySidebar 
              ayahs={surahData.ayahs}
              currentAyahNumber={currentAyahNumber}
              setCurrentAyahNumber={setCurrentAyahNumber}
            />
          </div>
        </div>
      </div>
      
      {/* Font size slider */}
      <FontSizeSlider />
    </div>
  );
} 