'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Sticky search bar component for the Quran list page
 * Features a clean design with animated transitions
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
    <div className={`bg-white dark:bg-gray-800 shadow-md rounded-lg sticky top-0 z-10 p-2 transition-all duration-300 ${className}`}>
      <div className={`relative rounded-lg border ${
        isFocused 
          ? 'border-[var(--orange-primary)] dark:border-[var(--orange-primary)]' 
          : 'border-gray-200 dark:border-gray-700'
      } transition-colors duration-200`}>
        {/* Search icon */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 ${
              isFocused ? 'text-[var(--orange-primary)]' : 'text-gray-400 dark:text-gray-500'
            } transition-colors duration-200`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
        
        {/* Search input field */}
        <input
          ref={inputRef}
          type="text"
          className="py-3 pl-10 pr-14 w-full bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg"
          placeholder="Search by name or number"
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
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              onClick={handleClear}
              aria-label="Clear search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
        
        {/* Keyboard shortcut indicator */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          {!value && (
            <kbd className="hidden sm:flex items-center px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded">
              {navigator.platform.indexOf('Mac') === 0 ? '⌘K' : 'Ctrl+K'}
            </kbd>
          )}
        </div>
      </div>
    </div>
  );
} 