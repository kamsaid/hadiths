'use client';

import { useQuran } from './QuranLayout';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Sticky header component for the Surah detail page
 * Contains navigation controls, surah info, and audio player options
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
    fontSizeScale,
    setFontSizeScale
  } = useQuran();
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const progressBarRef = useRef(null);
  
  // State to track scroll position for shadow effect
  const [scrolled, setScrolled] = useState(false);
  
  // Calculate previous and next surah numbers for navigation
  const prevSurah = surah.number > 1 ? surah.number - 1 : null;
  const nextSurah = surah.number < 114 ? surah.number + 1 : null;
  
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

  // Add scroll event listener to detect when page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-[var(--dark-primary)]/80 transition-all duration-300 
        ${scrolled ? 'shadow-md' : ''}`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left section: Back button and Surah info */}
          <div className="flex items-center space-x-3">
            <Link 
              href="/quran" 
              className="p-2 rounded-full hover:bg-[var(--orange-light)] transition-colors"
              aria-label="Back to Surah list"
              tabIndex="0"
            >
              <ChevronLeft className="h-5 w-5 text-[var(--dark-primary)] dark:text-white" />
            </Link>
            
            <div className="flex items-center space-x-2">
              <div>
                <h1 className="text-lg font-medium text-[var(--dark-primary)] dark:text-white">
                  {surah.englishName}
                </h1>
                <div className="flex items-center text-sm text-[var(--dark-primary)]/70 dark:text-white/70">
                  <span className={`px-2 py-0.5 text-xs rounded-full mr-2 ${
                    surah.revelationType === 'Meccan' 
                      ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200' 
                      : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200'
                  }`}>
                    {surah.revelationType}
                  </span>
                  <span>{surah.ayahs?.length || surah.ayahCount} verses</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right section: Arabic name and navigation buttons */}
          <div className="flex items-center space-x-4">
            <h2 className="font-amiri text-xl text-[var(--dark-primary)] dark:text-white hidden sm:block">
              {surah.name}
            </h2>
            
            <div className="flex space-x-1">
              {prevSurah ? (
                <Link 
                  href={`/quran/${prevSurah}`}
                  className="p-2 rounded-md hover:bg-[var(--orange-light)] transition-colors"
                  aria-label="Previous Surah"
                  tabIndex="0"
                >
                  <span className="sr-only">Previous Surah</span>
                  <ChevronLeft className="h-5 w-5 text-[var(--dark-primary)] dark:text-white" />
                </Link>
              ) : (
                <button 
                  disabled
                  className="p-2 rounded-md text-gray-400 dark:text-gray-600 cursor-not-allowed"
                  aria-label="No previous Surah"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}
              
              {nextSurah ? (
                <Link 
                  href={`/quran/${nextSurah}`}
                  className="p-2 rounded-md hover:bg-[var(--orange-light)] transition-colors"
                  aria-label="Next Surah"
                  tabIndex="0"
                >
                  <span className="sr-only">Next Surah</span>
                  <ChevronRight className="h-5 w-5 text-[var(--dark-primary)] dark:text-white" />
                </Link>
              ) : (
                <button 
                  disabled
                  className="p-2 rounded-md text-gray-400 dark:text-gray-600 cursor-not-allowed"
                  aria-label="No next Surah"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Audio progress bar */}
      <div 
        ref={progressBarRef}
        className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 cursor-pointer relative"
        onClick={handleSeek}
        onMouseDown={handleSeek}
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={audioProgress}
      >
        <div 
          className="h-full bg-[var(--orange-primary)]" 
          style={{ width: `${audioProgress}%` }}
        ></div>
      </div>
      
      {/* Expanded controls */}
      {isExpanded && (
        <motion.div 
          className="border-t border-gray-100 dark:border-gray-800 p-4 grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Reciter select */}
          <div className="flex items-center justify-center">
            <label htmlFor="reciter-select" className="text-sm text-gray-600 dark:text-gray-400 mr-2">Reciter:</label>
            <select
              id="reciter-select"
              value={reciter}
              onChange={(e) => setReciter(e.target.value)}
              className="py-2 px-3 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[var(--dark-primary)] dark:text-white"
            >
              {reciters.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Display options */}
          <div className="flex items-center justify-end space-x-3">
            {/* Translation toggle */}
            <button
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                showTranslation 
                  ? 'bg-[var(--orange-primary)] text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setShowTranslation(!showTranslation)}
              aria-pressed={showTranslation}
            >
              Translation
            </button>
            
            {/* Transliteration toggle */}
            <button
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                showTransliteration 
                  ? 'bg-[var(--orange-primary)] text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setShowTransliteration(!showTransliteration)}
              aria-pressed={showTransliteration}
            >
              Transliteration
            </button>
            
            {/* Font size slider */}
            <div className="flex items-center">
              <span className="text-xs text-gray-600 dark:text-gray-400 mr-2">🅰️</span>
              <input
                type="range"
                min="1"
                max="1.75"
                step="0.05"
                value={fontSizeScale}
                onChange={(e) => setFontSizeScale(parseFloat(e.target.value))}
                className="w-20 accent-[var(--orange-primary)]"
                aria-label="Font size"
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
} 