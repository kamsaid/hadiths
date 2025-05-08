'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slider } from "@/components/ui/slider";
import { Minus, Plus } from 'lucide-react';

/**
 * FontSizeSlider - Floating component that allows users to adjust the font size of Quranic verses
 * Uses CSS variables to control font scaling across the entire surah
 */
const FontSizeSlider = () => {
  // Default font size starts at 100% (scale of 1)
  const [isExpanded, setIsExpanded] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  
  // Apply font size changes with CSS variables
  useEffect(() => {
    // Scale ranges from 1.0 to 1.75
    const fontScale = 1 + ((fontSize - 100) / 100) * 0.75;
    document.documentElement.style.setProperty('--ayah-fs', fontScale);
    
    // Store user preference
    localStorage.setItem('quran-font-size', fontSize);
  }, [fontSize]);
  
  // Load saved font size preference
  useEffect(() => {
    const savedFontSize = localStorage.getItem('quran-font-size');
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize, 10));
    }
  }, []);
  
  return (
    <div className="fixed right-4 bottom-4 z-30 lg:right-8 lg:bottom-8">
      <div className="relative">
        {/* Toggle button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-12 w-12 rounded-full bg-[var(--orange-primary)] text-white flex items-center justify-center shadow-lg hover:bg-[var(--orange-secondary)] transition-colors"
          whileTap={{ scale: 0.95 }}
          aria-label={isExpanded ? "Close font size controls" : "Adjust font size"}
          aria-expanded={isExpanded}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </motion.button>
        
        {/* Slider panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute right-0 bottom-14 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg w-64"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-[var(--dark-primary)] dark:text-white">Font Size</h3>
                <span className="text-sm text-[var(--dark-primary)]/70 dark:text-white/70">
                  {fontSize}%
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setFontSize(Math.max(100, fontSize - 5))}
                  className="text-[var(--dark-primary)] dark:text-white p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Decrease font size"
                  disabled={fontSize <= 100}
                >
                  <Minus className="h-4 w-4" />
                </button>
                
                <Slider
                  min={100}
                  max={175}
                  step={5}
                  value={[fontSize]}
                  onValueChange={(value) => setFontSize(value[0])}
                  className="flex-1"
                  aria-label="Adjust font size"
                />
                
                <button 
                  onClick={() => setFontSize(Math.min(175, fontSize + 5))}
                  className="text-[var(--dark-primary)] dark:text-white p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Increase font size"
                  disabled={fontSize >= 175}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              <div className="mt-3 text-xs text-[var(--dark-primary)]/60 dark:text-white/60 text-center">
                Adjust the size of the Arabic text
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FontSizeSlider; 