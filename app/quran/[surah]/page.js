'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Components
import SurahHeader from '@/components/quran/SurahHeader';
import AyahDisplay from '@/components/quran/AyahDisplay';
import { useQuran } from '@/components/quran/QuranLayout';
import FontSizeSlider from '@/components/quran/FontSizeSlider';
import ConfettiEffect from '@/components/confetti-effect';

/**
 * SurahDetailPage - Beautiful Qur'an reader page with modern layout
 * Features elegant typography, responsive design, and clean UI
 */
export default function SurahDetailPage({ params }) {
  // Parse surah number from URL params or default to Al-Fatiha (1)
  const surahNumber = parseInt(params.surah, 10) || 1;
  const router = useRouter();
  
  // Redirect to Al-Fatiha if no surah specified or invalid number
  useEffect(() => {
    if (!params.surah || isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) {
      router.replace('/quran/1');
    }
  }, [params.surah, surahNumber, router]);
  
  // Get access to the global Quran context
  const { 
    transition, 
    completedSurah, 
    setCompletedSurah,
    setTransition
  } = useQuran();
  
  // Component state
  const [surahData, setSurahData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentAyahNumber, setCurrentAyahNumber] = useState(1);
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const prevSurahRef = useRef(surahNumber);
  
  // Direction of transition animation
  const [direction, setDirection] = useState(0); // 0 = initial, 1 = forward, -1 = backward
  
  // Check if the user prefers reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    if (mediaQuery.matches && transition !== 'none') {
      setTransition('none');
    }
    
    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches && transition !== 'none') {
        setTransition('none');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [transition, setTransition]);
  
  // Determine animation direction when surah changes
  useEffect(() => {
    if (prevSurahRef.current < surahNumber) {
      setDirection(1); // Forward
    } else if (prevSurahRef.current > surahNumber) {
      setDirection(-1); // Backward
    }
    prevSurahRef.current = surahNumber;
  }, [surahNumber]);
  
  // Load the last viewed ayah from localStorage
  useEffect(() => {
    const lastViewedAyah = localStorage.getItem(`lastViewedAyah-${surahNumber}`);
    if (lastViewedAyah) {
      setCurrentAyahNumber(parseInt(lastViewedAyah, 10));
      
      // Scroll to the ayah after layout is complete
      setTimeout(() => {
        const element = document.getElementById(`ayah-${lastViewedAyah}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 1000);
    } else {
      setCurrentAyahNumber(1);
    }
  }, [surahNumber]);
  
  // Update localStorage when currentAyahNumber changes
  useEffect(() => {
    if (currentAyahNumber > 0) {
      localStorage.setItem(`lastViewedAyah-${surahNumber}`, currentAyahNumber.toString());
    }
  }, [currentAyahNumber, surahNumber]);
  
  // Check for surah completion
  useEffect(() => {
    if (surahData?.ayahs && currentAyahNumber >= surahData.ayahs.length) {
      setCompletedSurah(true);
    } else {
      setCompletedSurah(false);
    }
  }, [currentAyahNumber, surahData, setCompletedSurah]);
  
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
  
  // Configure animation based on transition type and direction
  const getAnimationVariants = () => {
    // No animation if reduced motion is preferred or explicitly disabled
    if (prefersReducedMotion || transition === 'none') {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
      };
    }
    
    // Page slide animation
    if (transition === 'slide') {
      return {
        initial: { 
          x: direction >= 0 ? '100%' : '-100%', 
          opacity: 0 
        },
        animate: { 
          x: 0, 
          opacity: 1,
          transition: { duration: 0.5, ease: 'easeOut' }
        },
        exit: { 
          x: direction >= 0 ? '-100%' : '100%', 
          opacity: 0,
          transition: { duration: 0.5, ease: 'easeIn' }
        }
      };
    }
    
    // Default fade animation
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    };
  };

  // Loading state with skeleton UI
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-50 backdrop-blur-md bg-background/80 shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="h-14 bg-muted rounded-lg animate-pulse"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            {/* Bismillah skeleton */}
            <div className="h-16 bg-muted rounded-lg mx-auto w-3/4 max-w-3xl mb-12"></div>
            
            {/* Verses skeleton */}
            <div className="space-y-16 max-w-4xl mx-auto">
              {[...Array(7)].map((_, index) => (
                <div key={index} className="h-64 bg-muted rounded-xl animate-pulse"></div>
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
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4 text-destructive">Error</h1>
          <p className="mb-6 text-muted-foreground">
            {error}
          </p>
          <a
            href="/quran"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md transition-colors"
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
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4 text-foreground">Surah Not Found</h1>
          <p className="mb-6 text-muted-foreground">
            The requested surah (#{surahNumber}) could not be found.
          </p>
          <a
            href="/quran"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md transition-colors"
          >
            Return to Quran Index
          </a>
        </div>
      </div>
    );
  }

  // Animation variants based on transition type
  const contentVariants = getAnimationVariants();

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky header with surah info and controls */}
      <SurahHeader surah={surahData} />
      
      <motion.div 
        className="container mx-auto px-4 md:px-6 py-8"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={contentVariants}
      >
        {/* Warning message if using mock data */}
        {error && (
          <div className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 text-yellow-800 dark:text-yellow-200 max-w-4xl mx-auto">
            <h3 className="font-bold mb-2">⚠️ Using fallback data</h3>
            <p>{error}</p>
          </div>
        )}
        
        {/* Main content area with verses */}
        <div className="max-w-3xl mx-auto">
          {/* Bismillah header for all surahs except At-Tawbah (9) */}
          {surahNumber !== 9 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center my-12 py-6 px-4 bg-primary/5 rounded-xl border border-primary/10"
            >
              <p className="font-amiri font-bold text-4xl mb-3 text-foreground">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <p className="text-muted-foreground text-sm">
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
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-foreground'
              }`}
            >
              {showTransliteration ? 'Hide Transliteration' : 'Show Transliteration'}
            </button>
          </div>
          
          {/* Ayahs/verses list */}
          <div className="mb-24 space-y-8">
            {surahData.ayahs.map((ayah) => (
              <AyahDisplay
                key={ayah.number}
                ayah={ayah}
                surahNumber={surahNumber}
                showTransliteration={showTransliteration}
                onActive={() => setCurrentAyahNumber(ayah.number)}
              />
            ))}
          </div>
        </div>
        
        {/* Confetti effect on surah completion */}
        <ConfettiEffect 
          trigger={completedSurah} 
          onComplete={() => setCompletedSurah(false)}
        />
      </motion.div>
      
      {/* Font size slider */}
      <FontSizeSlider />
    </div>
  );
} 