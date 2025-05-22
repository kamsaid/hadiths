'use client';

import { useQuran } from './QuranLayout';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Settings,
  Share,
  ChevronDown
} from 'lucide-react';
import SettingsModal from './SettingsModal';

/**
 * Sticky header component for the Surah detail page
 * Features collapsible design, progress indicator, and navigation controls
 */
export default function SurahHeader({ surah }) {
  const { 
    reciter, 
    setReciter, 
    reciters, 
    showTranslation, 
    setShowTranslation,
    showTransliteration,
    setShowTransliteration,
    fontSize,
    setFontSize,
    fontSizeScale,
    setFontSizeScale,
    transition,
    setTransition,
    theme,
    setTheme
  } = useQuran();
  
  // State for header expansion and scroll tracking
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  // Accordion open state
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  // Active tab for accordion ('surah' or 'juz')
  const [activeTab, setActiveTab] = useState('surah');
  const lastScrollY = useRef(0);
  // Add missing progressBarRef
  const progressBarRef = useRef(null);
  
  // State for storing all surahs and juz
  const [allSurahs, setAllSurahs] = useState([]);
  const [allJuz, setAllJuz] = useState([]);
  const [loading, setLoading] = useState(false);
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // Calculate previous and next surah numbers for navigation
  const prevSurah = surah.number > 1 ? surah.number - 1 : null;
  const nextSurah = surah.number < 114 ? surah.number + 1 : null;
  
  // Fetch all surahs and juz when accordion is opened
  useEffect(() => {
    if (isAccordionOpen && allSurahs.length === 0) {
      const fetchSurahs = async () => {
        setLoading(true);
        try {
          const response = await fetch('/api/quran');
          
          if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
          }
          
          const surahs = await response.json();
          setAllSurahs(surahs);
          
          // Create mock juz data (in a real app, this would come from the API)
          const mockJuz = Array.from({ length: 30 }, (_, i) => ({
            number: i + 1,
            name: `Juz ${i + 1}`,
            // Each juz contains a range of surahs
            surahs: surahs.slice(Math.floor(i * (114 / 30)), Math.floor((i + 1) * (114 / 30)))
          }));
          
          setAllJuz(mockJuz);
        } catch (error) {
          console.error('Error loading surahs:', error);
        } finally {
          setLoading(false);
        }
      };
      
      fetchSurahs();
    }
  }, [isAccordionOpen, allSurahs.length]);

  // Track scroll position to update progress and collapse header
  useEffect(() => {
    const calculateProgress = () => {
      // Calculate reading progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / documentHeight) * 100;
      setReadingProgress(Math.min(Math.max(progress, 0), 100));
      
      // Determine if header should collapse (scrolling down past threshold)
      const currentScrollY = window.scrollY;
      
      // Set scrolled state for shadow effect
      setScrolled(currentScrollY > 20);
      
      // Auto-collapse header when scrolling down, expand when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsCollapsed(true);
      } else if (currentScrollY < lastScrollY.current - 20) {
        setIsCollapsed(false);
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', calculateProgress);
    return () => window.removeEventListener('scroll', calculateProgress);
  }, []);
  
  // Handle audio play/pause
  const togglePlayPause = () => {
    setAudioPlaying(!audioPlaying);
    // In a real implementation, this would control the actual audio playback
  };
  
  // Mock audio progress
  useEffect(() => {
    if (!audioPlaying) return;
    
    const interval = setInterval(() => {
      setAudioProgress(prev => {
        // Reset to 0 when reaching 100%
        if (prev >= 100) {
          setAudioPlaying(false);
          return 0;
        }
        return prev + 0.5;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [audioPlaying]);
  
  // Handle seeking in the progress bar
  const handleSeek = (e) => {
    if (!progressBarRef.current) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentage = (offsetX / rect.width) * 100;
    
    setAudioProgress(Math.max(0, Math.min(100, percentage)));
  };

  // Handle sharing the current surah
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${surah.englishName} (${surah.name})`,
          text: `Reading ${surah.englishName} (${surah.name}) - ${surah.englishNameTranslation}`,
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback to clipboard copy
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Toggle accordion visibility
  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  // Handle changing accordion tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Filter surahs based on search query
  const filteredSurahs = allSurahs.filter(surah => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      surah.number.toString().includes(query) ||
      (surah.englishName && surah.englishName.toLowerCase().includes(query)) ||
      (surah.englishNameTranslation && surah.englishNameTranslation.toLowerCase().includes(query))
    );
  });
  
  // Filter juz based on search query
  const filteredJuz = allJuz.map(juz => {
    if (!searchQuery.trim()) return juz;
    
    // Filter surahs within each juz
    const filteredSurahs = juz.surahs.filter(surah => {
      const query = searchQuery.toLowerCase();
      return (
        surah.number.toString().includes(query) ||
        (surah.englishName && surah.englishName.toLowerCase().includes(query)) ||
        (surah.englishNameTranslation && surah.englishNameTranslation.toLowerCase().includes(query))
      );
    });
    
    // Return juz with filtered surahs
    return {
      ...juz,
      surahs: filteredSurahs
    };
  }).filter(juz => juz.surahs.length > 0); // Only show juz with matching surahs

  return (
    <div 
      className={`sticky top-0 z-50 backdrop-blur-md bg-background/80 transition-all duration-300 
        ${scrolled ? 'shadow-md' : ''}`}
    >
          {/* Accordion-style Surah/Juz selector */}
      <div className="container mx-auto px-4 py-2">
        <button
          className="w-full flex items-center justify-between p-2 bg-card rounded-md"
          onClick={toggleAccordion}
          aria-expanded={isAccordionOpen}
        >
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              {surah.number}
            </div>
            <h2 className="text-sm font-medium text-foreground">{surah.englishName}</h2>
          </div>
          <ChevronDown
            className={`h-5 w-5 text-foreground transition-transform ${
              isAccordionOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        <AnimatePresence>
          {isAccordionOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mt-2"
            >
              {/* Tab navigation for Surah/Juz */}
              <div className="flex justify-center mb-4">
                <div className="inline-flex bg-muted rounded-full p-1">
                  <button
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      activeTab === 'surah'
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    onClick={() => handleTabChange('surah')}
                  >
                    Surahs
                  </button>
                  <button
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      activeTab === 'juz'
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    onClick={() => handleTabChange('juz')}
                  >
                    Juz
                  </button>
                </div>
              </div>

              {/* Search input */}
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name, number, or meaning..."
                    className="w-full py-2 pl-4 pr-10 rounded-lg bg-muted border border-muted text-foreground"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <div className="absolute right-3 top-2.5 text-muted-foreground">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Loading state */}
              {loading && (
                <div className="py-12 flex justify-center">
                  <div className="animate-spin h-8 w-8 border-2 border-primary rounded-full border-t-transparent"></div>
                </div>
              )}

              {/* Surah Tab Content */}
              {activeTab === 'surah' && !loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {filteredSurahs.length > 0 ? (
                    filteredSurahs.map((item) => (
                      <Link
                        key={item.number}
                        href={`/quran/${item.number}`}
                        onClick={() => setIsAccordionOpen(false)}
                        className={`p-3 rounded-lg transition-colors ${
                          item.number === surah.number
                            ? 'bg-primary/10 border border-primary/20'
                            : 'hover:bg-accent/10'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center text-sm ${
                              item.number === surah.number
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {item.number}
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-foreground">{item.englishName}</h3>
                            <p className="text-xs text-muted-foreground">{item.englishNameTranslation}</p>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="col-span-full py-8 text-center text-muted-foreground">
                      No surahs found matching "{searchQuery}"
                    </div>
                  )}
                </div>
              )}

              {/* Juz Tab Content */}
              {activeTab === 'juz' && !loading && (
                <div className="space-y-4">
                  {filteredJuz.length > 0 ? (
                    filteredJuz.map((juz) => (
                      <div key={juz.number} className="border border-border rounded-lg overflow-hidden">
                        <div className="p-3 bg-muted flex items-center justify-between">
                          <h3 className="font-medium text-foreground">{juz.name}</h3>
                          <span className="text-xs bg-background text-muted-foreground px-2 py-1 rounded-full">
                            {juz.surahs.length} surahs
                          </span>
                        </div>
                        <div className="p-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {juz.surahs.map((item) => (
                            <Link
                              key={item.number}
                              href={`/quran/${item.number}`}
                              onClick={() => setIsAccordionOpen(false)}
                              className={`p-2 rounded-md transition-colors flex items-center gap-2 ${
                                item.number === surah.number
                                  ? 'bg-primary/10'
                                  : 'hover:bg-accent/10'
                              }`}
                            >
                              <div
                                className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${
                                  item.number === surah.number
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-muted-foreground'
                                }`}
                              >
                                {item.number}
                              </div>
                              <span className="text-sm text-foreground">{item.englishName}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">
                      No juz found with surahs matching "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Main header */}
      <div className="container mx-auto px-4 transition-all duration-300">
        <motion.div 
          className="flex items-center justify-between"
          animate={{ 
            height: isCollapsed ? '50px' : '70px', 
            opacity: 1 
          }}
          transition={{ duration: 0.3 }}
        >
          
          <div />
          {/* Right section: Actions and navigation */}
          <div className="flex items-center space-x-2">
            {/* Progress indicator (only visible when collapsed) */}
            {isCollapsed && (
              <div className="hidden md:flex items-center mr-2">
                <div className="text-sm text-foreground/70">
                  {Math.round(readingProgress)}%
                </div>
              </div>
            )}
            
            {/* Arabic name only visible in expanded view */}
            {!isCollapsed && (
              <h2 className="font-amiri text-xl text-foreground hidden md:block">
                {surah.name}
              </h2>
            )}
            
            {/* Share button */}
            <button 
              onClick={handleShare}
              className="p-2 rounded-md hover:bg-accent/20 transition-colors"
              aria-label="Share this surah"
            >
              <Share className="h-5 w-5 text-foreground" />
            </button>
            
            {/* Settings button */}
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-md hover:bg-accent/20 transition-colors"
              aria-label="Open settings"
            >
              <Settings className="h-5 w-5 text-foreground" />
            </button>
            
            {/* Surah navigation */}
            <div className="flex space-x-1">
              {prevSurah ? (
                <Link 
                  href={`/quran/${prevSurah}`}
                  className="p-2 rounded-md hover:bg-accent/20 transition-colors"
                  aria-label="Previous Surah"
                  tabIndex="0"
                >
                  <span className="sr-only">Previous Surah</span>
                  <ChevronLeft className="h-5 w-5 text-foreground" />
                </Link>
              ) : (
                <button 
                  disabled
                  className="p-2 rounded-md text-muted-foreground cursor-not-allowed"
                  aria-label="No previous Surah"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}
              
              {nextSurah ? (
                <Link 
                  href={`/quran/${nextSurah}`}
                  className="p-2 rounded-md hover:bg-accent/20 transition-colors"
                  aria-label="Next Surah"
                  tabIndex="0"
                >
                  <span className="sr-only">Next Surah</span>
                  <ChevronRight className="h-5 w-5 text-foreground" />
                </Link>
              ) : (
                <button 
                  disabled
                  className="p-2 rounded-md text-muted-foreground cursor-not-allowed"
                  aria-label="No next Surah"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Reading progress bar */}
      <div className="h-1 w-full bg-muted relative">
        <motion.div 
          className="h-full bg-primary" 
          style={{ width: `${readingProgress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${readingProgress}%` }}
          transition={{ duration: 0.3 }}
        ></motion.div>
      </div>
      
      {/* Audio progress bar */}
      {audioPlaying && (
        <div 
          ref={progressBarRef}
          className="h-1.5 w-full bg-muted cursor-pointer relative"
          onClick={handleSeek}
          onMouseDown={handleSeek}
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={audioProgress}
        >
          <div 
            className="h-full bg-secondary" 
            style={{ width: `${audioProgress}%` }}
          ></div>
        </div>
      )}
      
      
      {/* Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        theme={theme}
        setTheme={setTheme}
        transition={transition}
        setTransition={setTransition}
      />
    </div>
  );
} 