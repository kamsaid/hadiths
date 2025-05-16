'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import { useTheme } from 'next-themes';

// Context for sharing Quran-related state across components
export const QuranContext = createContext({
  reciter: 'abdul-basit', // Default reciter
  reciters: [
    { id: 'abdul-basit', name: 'Abdul Basit' },
    { id: 'mishary-rashid-alafasy', name: 'Mishary Rashid Alafasy' }
  ],
  fontSizeScale: 1.0, // Default font size scale (100%)
  fontSize: 100, // Font size in percentage
  transition: 'slide', // Page transition effect
  setReciter: () => {},
  setFontSizeScale: () => {},
  setFontSize: () => {},
  setTransition: () => {},
  showTranslation: true,
  setShowTranslation: () => {},
  showTransliteration: false,
  setShowTransliteration: () => {},
  completedSurah: false,
  setCompletedSurah: () => {},
  openSurah: null, // Track which surah is currently open
  setOpenSurah: () => {},
});

// Custom hook for easy context consumption
export const useQuran = () => useContext(QuranContext);

/**
 * Shared layout component for Quran-related pages
 * Manages global state like font size preferences, theme, transition effects and audio reciter
 */
export default function QuranLayout({ children }) {
  // Theme setup
  const { theme, setTheme } = useTheme();
  
  // Current selected reciter
  const [reciter, setReciter] = useState('abdul-basit');
  
  // Font size scale factor and percentage
  const [fontSizeScale, setFontSizeScale] = useState(1.0);
  const [fontSize, setFontSize] = useState(100);
  
  // Transition effect
  const [transition, setTransition] = useState('slide');
  
  // Display preferences
  const [showTranslation, setShowTranslation] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(false);
  
  // Completion state
  const [completedSurah, setCompletedSurah] = useState(false);
  
  // Currently open surah
  const [openSurah, setOpenSurah] = useState(null);
  
  // Load settings from localStorage on component mount
  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;
    
    // Try to load stored settings
    const storedSettings = localStorage.getItem('quran-settings');
    if (storedSettings) {
      try {
        const settings = JSON.parse(storedSettings);
        
        // Apply font size
        if (settings.fontSize) {
          setFontSize(settings.fontSize);
          setFontSizeScale(1 + ((settings.fontSize - 100) / 100) * 0.75);
        }
        
        // Apply transition (respecting reduced motion preference)
        if (settings.transition && !prefersReducedMotion) {
          setTransition(settings.transition);
        } else if (prefersReducedMotion) {
          setTransition('none');
        }
      } catch (e) {
        console.error('Error parsing settings:', e);
      }
    }
    
    // Load other preferences
    if (localStorage.getItem('show-translation') === 'false') {
      setShowTranslation(false);
    }
    
    if (localStorage.getItem('show-transliteration') === 'true') {
      setShowTransliteration(true);
    }
  }, []);
  
  // Update font size scale when percentage changes
  useEffect(() => {
    const newScale = 1 + ((fontSize - 100) / 100) * 0.75;
    setFontSizeScale(newScale);
  }, [fontSize]);
  
  // List of available reciters
  const reciters = [
    { id: 'abdul-basit', name: 'Abdul Basit' },
    { id: 'mishary-rashid-alafasy', name: 'Mishary Rashid Alafasy' }
  ];

  // Set CSS variable for font size scaling
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--ayah-fs', `${fontSizeScale}`);
    }
  }, [fontSizeScale]);

  return (
    <QuranContext.Provider
      value={{
        reciter,
        setReciter,
        reciters,
        fontSizeScale,
        setFontSizeScale,
        fontSize,
        setFontSize,
        transition,
        setTransition,
        showTranslation,
        setShowTranslation,
        showTransliteration,
        setShowTransliteration,
        completedSurah,
        setCompletedSurah,
        openSurah,
        setOpenSurah,
        theme,
        setTheme
      }}
    >
      <div className="min-h-screen bg-background text-foreground">
        {children}
      </div>
    </QuranContext.Provider>
  );
} 