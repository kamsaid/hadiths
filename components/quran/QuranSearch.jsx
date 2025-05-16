'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

/**
 * Enhanced search bar component for the Quran list page
 * Features clean design with animation and improved usability
 */
export default function QuranSearch({ onSearch, className = "" }) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  
  // Handle input changes
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch(newValue);
  };
  
  // Handle clearing the search input
  const handleClear = () => {
    setValue("");
    onSearch("");
    inputRef.current?.focus();
  };
  
  // Keyboard shortcut to focus search (Ctrl+K or Command+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      className={`sticky top-0 z-10 py-4 ${className}`}
    >
      <div className={`relative bg-card rounded-lg shadow-sm transition-all duration-300 overflow-hidden
        ${isFocused ? 'ring-2 ring-primary' : 'ring-1 ring-border'}`}>
        {/* Search icon */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search 
            className={`h-5 w-5 ${
              isFocused ? 'text-primary' : 'text-muted-foreground'
            } transition-colors duration-200`}
            aria-hidden="true"
          />
        </div>
        
        {/* Search input field */}
        <input
          ref={inputRef}
          type="text"
          className="py-3 pl-12 pr-14 w-full bg-transparent outline-none text-foreground placeholder-muted-foreground"
          placeholder="Search by name, number, or meaning..."
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="Search surahs"
        />
        
        {/* Clear button - only shown when there's text */}
        <AnimatePresence>
          {value && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-muted-foreground hover:text-foreground"
              onClick={handleClear}
              aria-label="Clear search"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </motion.button>
          )}
        </AnimatePresence>
        
        {/* Keyboard shortcut indicator */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          {!value && (
            <kbd className="hidden sm:flex items-center px-2 py-1 text-xs font-semibold text-muted-foreground bg-muted rounded">
              {navigator.platform.indexOf('Mac') === 0 ? '⌘K' : 'Ctrl+K'}
            </kbd>
          )}
        </div>
      </div>
      
      {/* View Toggle - Can be added here for Surah/Juz views */}
      {/* <div className="flex justify-center mt-4">
        <div className="inline-flex bg-muted rounded-full p-1">
          <button className="px-4 py-1.5 rounded-full bg-card text-foreground shadow-sm text-sm font-medium">
            Surahs
          </button>
          <button className="px-4 py-1.5 rounded-full text-muted-foreground text-sm font-medium">
            Juz
          </button>
        </div>
      </div> */}
    </div>
  );
} 