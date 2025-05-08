'use client';

import { createContext, useState, useContext } from 'react';

// Context for sharing Quran-related state across components
export const QuranContext = createContext({
  reciter: 'abdul-basit', // Default reciter
  reciters: [
    { id: 'abdul-basit', name: 'Abdul Basit' },
    { id: 'mishary-rashid-alafasy', name: 'Mishary Rashid Alafasy' }
  ],
  fontSizeScale: 1.0, // Default font size scale (100%)
  setReciter: () => {},
  setFontSizeScale: () => {},
  showTranslation: true,
  setShowTranslation: () => {},
  showTransliteration: false,
  setShowTransliteration: () => {}
});

// Custom hook for easy context consumption
export const useQuran = () => useContext(QuranContext);

/**
 * Shared layout component for Quran-related pages
 * Manages global state like font size preferences and audio reciter
 */
export default function QuranLayout({ children }) {
  // Current selected reciter
  const [reciter, setReciter] = useState('abdul-basit');
  
  // Font size scale factor (1.0 = 100%)
  const [fontSizeScale, setFontSizeScale] = useState(1.0);
  
  // Display preferences
  const [showTranslation, setShowTranslation] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(false);
  
  // List of available reciters
  const reciters = [
    { id: 'abdul-basit', name: 'Abdul Basit' },
    { id: 'mishary-rashid-alafasy', name: 'Mishary Rashid Alafasy' }
  ];

  // Set CSS variable for font size scaling
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--ayah-fs', `${fontSizeScale}`);
  }

  return (
    <QuranContext.Provider
      value={{
        reciter,
        setReciter,
        reciters,
        fontSizeScale,
        setFontSizeScale,
        showTranslation,
        setShowTranslation,
        showTransliteration,
        setShowTransliteration
      }}
    >
      <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-950">
        {children}
      </div>
    </QuranContext.Provider>
  );
} 