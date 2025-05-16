'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slider } from "@/components/ui/slider";
import { Minus, Plus, Type } from 'lucide-react';

/**
 * FontSizeSlider - Floating component that allows users to adjust the font size
 * Applies font scaling to both Arabic verses and translations via CSS variables
 */
const FontSizeSlider = () => {
  // Default font size starts at 100% (scale of 1)
  const [isExpanded, setIsExpanded] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  
  // Apply font size changes with CSS variables
  useEffect(() => {
    // Arabic text scale with enhanced readability for larger sizes
    const arabicFontScale = 1 + ((fontSize - 100) / 100) * 1;
    // Translation text scale (smaller range)
    const translationFontScale = 1 + ((fontSize - 100) / 100) * 0.5;
    
    // Apply to CSS variables for use throughout the app
    document.documentElement.style.setProperty('--ayah-fs', arabicFontScale);
    document.documentElement.style.setProperty('--translation-fs', translationFontScale);
    
    // Also adjust letter and word spacing for better readability at larger sizes
    const letterSpacing = 0.03 + ((fontSize - 100) / 100) * 0.02; // Increases slightly with size
    const wordSpacing = 0.08 + ((fontSize - 100) / 100) * 0.05;   // Increases with size
    
    document.documentElement.style.setProperty('--arabic-letter-spacing', `${letterSpacing}em`);
    document.documentElement.style.setProperty('--arabic-word-spacing', `${wordSpacing}em`);
    
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
          className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
          whileTap={{ scale: 0.95 }}
          aria-label={isExpanded ? "Close font size controls" : "Adjust font size"}
          aria-expanded={isExpanded}
        >
          <Type className="h-5 w-5" />
        </motion.button>
        
        {/* Slider panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute right-0 bottom-14 bg-card p-4 rounded-lg shadow-lg border border-border w-64"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-foreground">Font Size</h3>
                <span className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {fontSize}%
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setFontSize(Math.max(100, fontSize - 5))}
                  className="text-foreground p-1.5 rounded-md hover:bg-accent/50 transition-colors"
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
                  className="text-foreground p-1.5 rounded-md hover:bg-accent/50 transition-colors"
                  aria-label="Increase font size"
                  disabled={fontSize >= 175}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              <div className="mt-3 text-xs text-muted-foreground text-center">
                Adjusts size of both Arabic and translation text
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FontSizeSlider; 