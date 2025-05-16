'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

/**
 * ScrollSpySidebar - Component for verse navigation with active verse highlighting
 * Features collapsible UI on mobile and right-aligned list on desktop
 */
const ScrollSpySidebar = ({ ayahs, currentAyahNumber, setCurrentAyahNumber }) => {
  // States for mobile menu and scroll position
  const [isOpen, setIsOpen] = useState(false);
  const [activeVerse, setActiveVerse] = useState(currentAyahNumber);
  
  // Handle scroll to track current verse position
  const handleScroll = useCallback(() => {
    if (!ayahs || ayahs.length === 0) return;
    
    const scrollPosition = window.scrollY + 200; // Offset to highlight verse as it enters viewport
    let newActiveVerse = 1;
    
    // Find the verse element currently in view
    for (let i = ayahs.length - 1; i >= 0; i--) {
      const verseElement = document.getElementById(`ayah-${ayahs[i].number}`);
      if (verseElement && verseElement.offsetTop <= scrollPosition) {
        newActiveVerse = ayahs[i].number;
        break;
      }
    }
    
    // Update active verse if changed
    if (newActiveVerse !== activeVerse) {
      setActiveVerse(newActiveVerse);
      setCurrentAyahNumber?.(newActiveVerse);
    }
  }, [ayahs, activeVerse, setCurrentAyahNumber]);
  
  // Setup scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  
  // Scroll to a specific verse when clicked
  const scrollToVerse = (verseNumber) => {
    const verseElement = document.getElementById(`ayah-${verseNumber}`);
    
    if (verseElement) {
      verseElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center' 
      });
      
      setActiveVerse(verseNumber);
      setCurrentAyahNumber?.(verseNumber);
      setIsOpen(false); // Close mobile menu after navigation
    }
  };
  
  return (
    <>
      {/* Desktop sidebar - fixed position */}
      <div className="hidden lg:block">
        <div className="sticky top-32 pl-8 max-h-[70vh] overflow-y-auto scrollbar-thin">
          <h3 className="text-sm font-medium text-duson-ebony/70 dark:text-white/70 mb-3">
            Verses
          </h3>
          <ul className="space-y-1.5">
            {ayahs?.map((ayah) => (
              <li key={ayah.number}>
                <button
                  onClick={() => scrollToVerse(ayah.number)}
                  className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${
                    activeVerse === ayah.number
                      ? 'bg-duson-yellow/10 text-duson-ebony font-medium dark:text-white'
                      : 'text-duson-ebony/60 dark:text-white/60 hover:bg-gray-100 dark:hover:bg-gray-800/30'
                  }`}
                  data-active={activeVerse === ayah.number}
                  aria-current={activeVerse === ayah.number ? 'true' : 'false'}
                >
                  {ayah.number}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Mobile floating button and slide-in menu */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="fixed right-4 bottom-20 z-30 bg-duson-yellow text-duson-ebony p-3 rounded-full shadow-lg hover:bg-duson-crimson hover:text-duson-cream transition-colors"
          aria-label="Open verse navigator"
        >
          <Menu className="h-6 w-6" />
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/40 z-40"
                onClick={() => setIsOpen(false)}
              />
              
              {/* Slide-in panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25 }}
                className="fixed right-0 top-0 bottom-0 w-[280px] bg-white dark:bg-gray-900 z-50 p-5 overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-duson-ebony dark:text-white">
                    Verses
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label="Close verse navigator"
                  >
                    <X className="h-5 w-5 text-duson-ebony dark:text-white" />
                  </button>
                </div>
                
                <div className="grid grid-cols-5 gap-2">
                  {ayahs?.map((ayah) => (
                    <button
                      key={ayah.number}
                      onClick={() => scrollToVerse(ayah.number)}
                      className={`flex items-center justify-center h-10 rounded-md text-sm transition-colors ${
                        activeVerse === ayah.number
                          ? 'bg-duson-yellow text-duson-ebony font-medium'
                          : 'border border-gray-200 dark:border-gray-700 text-duson-ebony dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      data-active={activeVerse === ayah.number}
                      aria-current={activeVerse === ayah.number ? 'true' : 'false'}
                    >
                      {ayah.number}
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ScrollSpySidebar; 