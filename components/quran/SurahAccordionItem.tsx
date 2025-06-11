'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useQuran } from './QuranLayout';
import AyahDisplay from './AyahDisplay';
import { useAccordionItem } from '../ui/accordion';

// Type definition for the Surah object
type Surah = {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  ayahCount: number;
};

// Type definition for the Ayah object
type Ayah = {
  number: number;
  text: string;
  translation: string;
  transliteration?: string;
};

type SurahData = Surah & {
  ayahs: Ayah[];
};

type SurahAccordionItemProps = {
  surah: Surah;
  className?: string;
};

/**
 * SurahAccordionItem - Collapsible component for displaying a single surah
 * Uses the Accordion context and framer-motion for smooth animations
 * Handles loading of surah data and displaying it in an expandable/collapsible section
 */
const SurahAccordionItem = ({ surah, className = '' }: SurahAccordionItemProps) => {
  // Access the accordion context using the custom hook
  const { isOpen, toggle } = useAccordionItem(`surah-${surah.number}`);
  
  // States for managing the surah data and loading state
  const [surahData, setSurahData] = useState<SurahData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentAyahNumber, setCurrentAyahNumber] = useState(1);
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [visibleRange, setVisibleRange] = useState({ start: 1, end: 20 });
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Get access to the global Quran context
  const { setCompletedSurah } = useQuran();

  // Handle keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };
  
  // Fetch surah data when opened
  useEffect(() => {
    // Only fetch if the accordion is open and we don't have data yet
    if (isOpen && !surahData && !loading) {
      fetchSurah();
    }
    
    // Scroll into view when opened
    if (isOpen) {
      const element = document.getElementById(`surah-${surah.number}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [isOpen, surahData, loading, surah.number]);
  
  // Load transliteration preference
  useEffect(() => {
    if (isOpen) {
      const showTranslit = localStorage.getItem('show-transliteration') === 'true';
      setShowTransliteration(showTranslit);
    }
  }, [isOpen]);
  
  // Dynamically adjust the visible range for long surahs
  useEffect(() => {
    if (isOpen && surahData?.ayahs) {
      // For shorter surahs, show all verses
      if (surahData.ayahs.length <= 30) {
        setVisibleRange({ start: 1, end: surahData.ayahs.length });
      } else {
        // For longer surahs, start with first 20 verses
        setVisibleRange({ start: 1, end: 20 });
        
        // Check for last viewed ayah
        const lastViewedAyah = localStorage.getItem(`lastViewedAyah-${surah.number}`);
        if (lastViewedAyah) {
          const ayahNum = parseInt(lastViewedAyah, 10);
          if (ayahNum > 15) {
            // Center the view around the last viewed ayah
            setVisibleRange({ 
              start: Math.max(1, ayahNum - 10), 
              end: Math.min(surahData.ayahs.length, ayahNum + 10) 
            });
            
            // Scroll to the ayah after layout is complete
            setTimeout(() => {
              const element = document.getElementById(`ayah-${lastViewedAyah}`);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }, 500);
          }
        }
        
        // Add scroll event listener for lazy loading more verses
        const handleScroll = () => {
          if (contentRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
            
            // If scrolled near the bottom, load more verses
            if (scrollTop + clientHeight > scrollHeight - 600) {
              setVisibleRange(prev => ({
                start: prev.start,
                end: Math.min(prev.end + 10, surahData.ayahs.length)
              }));
            }
            
            // If scrolled near the top and we have a buffer, load more verses at the top
            if (scrollTop < 300 && visibleRange.start > 1) {
              setVisibleRange(prev => ({
                start: Math.max(1, prev.start - 10),
                end: prev.end
              }));
            }
          }
        };
        
        if (contentRef.current) {
          contentRef.current.addEventListener('scroll', handleScroll);
        }
        
        return () => {
          if (contentRef.current) {
            contentRef.current.removeEventListener('scroll', handleScroll);
          }
        };
      }
    }
  }, [isOpen, surahData, surah.number]);
  
  // Function to fetch the surah data
  const fetchSurah = async () => {
    if (loading) return;
    
    setLoading(true);
    setError(null); // Reset any previous errors
    
    try {
      const response = await fetch(`/api/quran?surah=${surah.number}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Validate the response data structure
      if (!data || !data.ayahs || !Array.isArray(data.ayahs)) {
        throw new Error('Invalid data format received from API');
      }
      
      // Ensure translations exist for each ayah
      const validatedData = {
        ...data,
        ayahs: data.ayahs.map((ayah: Ayah) => ({
          ...ayah,
          // Ensure translation exists or provide a fallback
          translation: ayah.translation || `Translation for verse ${ayah.number} will be available soon.`
        }))
      };
      
      setSurahData(validatedData);
    } catch (error) {
      console.error('Error fetching surah:', error);
      setError(`Failed to load Surah #${surah.number}. Please try again later.`);
      
      // Create mock data with more realistic content if API fails
      const mockAyahs = Array.from({ length: 10 }, (_, i) => ({
        number: i + 1,
        text: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ هَٰذَا مِثَالٌ لِلْنَّصِ الْعَرَبِيِّ ${i + 1}`,
        translation: i === 0 
          ? "In the name of Allah, the Entirely Merciful, the Especially Merciful."
          : `This is an example verse translation ${i + 1}. The API may be unavailable.`,
        transliteration: `Bismillahi r-rahmani r-rahim. Hadha mithalun lilnassi al-'arabiyyi ${i + 1}`
      }));
      
      setSurahData({
        ...surah,
        ayahs: mockAyahs
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Toggle transliteration visibility
  const toggleTransliteration = () => {
    setShowTransliteration(!showTransliteration);
    localStorage.setItem('show-transliteration', !showTransliteration ? 'true' : 'false');
  };
  
  // Load more ayahs on demand
  const loadMoreAyahs = () => {
    if (surahData?.ayahs) {
      setVisibleRange(prev => ({
        start: prev.start,
        end: Math.min(prev.end + 20, surahData.ayahs.length)
      }));
    }
  };
  
  // Track current ayah for progress
  const handleAyahActive = (ayahNumber: number) => {
    setCurrentAyahNumber(ayahNumber);
    localStorage.setItem(`lastViewedAyah-${surah.number}`, ayahNumber.toString());
    
    // Check if user has reached the end of the surah
    if (surahData?.ayahs && ayahNumber === surahData.ayahs.length) {
      (setCompletedSurah as any)(true);
    }
  };

  return (
    <div 
      id={`surah-${surah.number}`}
      className={`mb-4 rounded-xl border transition-colors duration-200 ${
        isOpen 
          ? 'border-primary bg-primary/5' 
          : 'border-border bg-card hover:border-primary/50'
      } ${className}`}
    >
      {/* Header - Always visible */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={toggle}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={isOpen}
        aria-controls={`surah-content-${surah.number}`}
      >
        <div className="flex items-center gap-3">
          <div className={`flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full 
            ${isOpen
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground'}`}
          >
            <span className="text-sm font-semibold">{surah.number}</span>
          </div>
          
          <div>
            <h3 className="font-medium text-foreground">{surah.englishName}</h3>
            <p className="text-xs text-muted-foreground">{surah.englishNameTranslation}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
            {surah.ayahCount} verses
          </span>
          
          <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
            {surah.revelationType}
          </span>
          
          <ChevronDown
            className={`text-muted-foreground transition-transform duration-300 ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
            size={20}
          />
        </div>
      </div>
      
      {/* Expandable content area */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`surah-content-${surah.number}`}
            ref={contentRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: 'auto', 
              opacity: 1,
              transition: { 
                duration: 0.15, 
                ease: 'easeOut' 
              }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: { 
                duration: 0.15, 
                ease: 'easeOut' 
              }
            }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-6 border-t border-border pt-4">
              {/* Loading state */}
              {loading && (
                <div className="py-8 flex justify-center">
                  <div className="animate-spin h-8 w-8 border-2 border-primary rounded-full border-t-transparent"></div>
                </div>
              )}
              
              {/* Error state */}
              {error && (
                <div className="p-4 bg-destructive/10 border-l-4 border-destructive text-destructive rounded">
                  <p>{error}</p>
                </div>
              )}
              
              {/* Surah content when loaded */}
              {surahData && !loading && (
                <div>
                  {/* Bismillah header for all surahs except At-Tawbah (9) */}
                  {surah.number !== 9 && (
                    <div className="text-center my-6 py-4 px-4 bg-primary/5 rounded-xl border border-primary/10">
                      <p className="font-amiri font-bold text-3xl mb-2 text-foreground">
                        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                      </p>
                      <p className="text-muted-foreground text-xs">
                        In the name of Allah, the Entirely Merciful, the Especially Merciful
                      </p>
                    </div>
                  )}
                  
                  {/* Progress indicator for longer surahs */}
                  {surahData.ayahs.length > 20 && (
                    <div className="mb-6">
                      <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
                        <motion.div 
                          className="bg-primary h-full"
                          initial={{ width: '0%' }}
                          animate={{ 
                            width: `${(Math.min(currentAyahNumber, surahData.ayahs.length) / surahData.ayahs.length) * 100}%` 
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Verse {currentAyahNumber}</span>
                        <span>{surahData.ayahs.length} total</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Transliteration toggle */}
                  <div className="flex justify-end mb-6">
                    <button
                      onClick={toggleTransliteration}
                      className={`rounded-full px-3 py-1 text-xs transition ${
                        showTransliteration 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      {showTransliteration ? 'Hide Transliteration' : 'Show Transliteration'}
                    </button>
                  </div>
                  
                  {/* Virtualized ayahs/verses list */}
                  <div className="space-y-6">
                    {surahData.ayahs
                      .filter(ayah => 
                        ayah.number >= visibleRange.start && 
                        ayah.number <= visibleRange.end
                      )
                      .map((ayah) => (
                        <AyahDisplay
                          key={`${surah.number}-${ayah.number}`}
                          ayah={ayah}
                          surahNumber={surah.number}
                          showTransliteration={showTransliteration}
                          onActive={() => handleAyahActive(ayah.number)}
                        />
                      ))
                    }
                  </div>
                  
                  {/* Load more button for longer surahs */}
                  {surahData.ayahs.length > visibleRange.end && (
                    <div className="mt-8 text-center">
                      <button
                        onClick={loadMoreAyahs}
                        className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors"
                      >
                        Load More Verses ({visibleRange.end}/{surahData.ayahs.length})
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SurahAccordionItem; 