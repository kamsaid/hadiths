// AccordionQuranReader.jsx - Main component for the accordion-style Quran reader
'use client';

import { useState, useEffect } from 'react';
import { useQuran } from './QuranLayout';
import QuranSearch from './QuranSearch';
import BackToTopButton from './BackToTopButton';
import { motion } from 'framer-motion';
import { Accordion } from '../ui/accordion';
import SurahAccordionItem from './SurahAccordionItem';

/**
 * AccordionQuranReader - Main component for displaying all surahs in accordion format
 * Features search functionality, juz/surah toggle, and collapsible surah sections
 * Uses the Accordion context provider for state management
 */
const AccordionQuranReader = ({ surahs }) => {
  // State management
  const [filteredSurahs, setFilteredSurahs] = useState(surahs);
  const [activeSurah, setActiveSurah] = useState(null);
  const [viewMode, setViewMode] = useState('surah'); // 'surah' or 'juz'
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [openSurahNumber, setOpenSurahNumber] = useState(null);
  
  // Get Quran context to store open surah
  const { setOpenSurah } = useQuran();
  
  // Load last opened surah from localStorage
  useEffect(() => {
    const lastOpenedSurah = localStorage.getItem('last-opened-surah');
    if (lastOpenedSurah) {
      const number = parseInt(lastOpenedSurah, 10);
      if (!isNaN(number) && number >= 0 && number <= 114) {
        setOpenSurahNumber(number);
        setActiveSurah(number);
        setOpenSurah(number);
      }
    }
  }, [setOpenSurah]);
  
  // Save scroll position when navigating
  useEffect(() => {
    const handleScroll = () => {
      setLastScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Update quran context when active surah changes
  useEffect(() => {
    if (activeSurah) {
      setOpenSurah(activeSurah);
    }
  }, [activeSurah, setOpenSurah]);
  
  // Handle search input changes
  const handleSearch = (query) => {
    const searchTerm = query.toLowerCase().trim();
    
    if (!searchTerm) {
      // If search is empty, show all surahs
      setFilteredSurahs(surahs);
      return;
    }
    
    // Filter surahs based on search query
    const filtered = surahs.filter(surah => 
      // Search by number
      surah.number.toString().includes(searchTerm) ||
      // Search by name
      (surah.name && surah.name.toLowerCase().includes(searchTerm)) || 
      // Search by English name
      (surah.englishName && surah.englishName.toLowerCase().includes(searchTerm)) ||
      // Search by English translation
      (surah.englishNameTranslation && surah.englishNameTranslation.toLowerCase().includes(searchTerm))
    );
    
    setFilteredSurahs(filtered);
  };
  
  // Handle accordion item open/close
  const handleAccordionChange = (surahNumber) => {
    setActiveSurah(surahNumber);
    setOpenSurahNumber(surahNumber);
    
    // Save last opened surah to localStorage
    localStorage.setItem('last-opened-surah', surahNumber.toString());
  };
  
  // Toggle between Surah and Juz views
  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  // Create an array of initially open surah IDs
  const defaultOpen = openSurahNumber ? [`surah-${openSurahNumber}`] : [];

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold mb-2 text-foreground">
            The Noble Quran
          </h1>
          <p className="text-muted-foreground">
            Browse through all 114 surahs in a collapsible reader format
          </p>
        </motion.div>
        
        {/* Sticky search bar */}
        <QuranSearch onSearch={handleSearch} className="mb-4" />
        
        {/* View Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-muted rounded-full p-1">
            <button 
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                viewMode === 'surah' 
                  ? 'bg-card text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => toggleViewMode('surah')}
            >
              Surahs
            </button>
            <button 
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                viewMode === 'juz' 
                  ? 'bg-card text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => toggleViewMode('juz')}
            >
              Juz
            </button>
          </div>
        </div>
        
        {/* Display no results message if search yields no results */}
        {filteredSurahs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground mb-4">
              No surahs found matching your search
            </p>
            <button
              onClick={() => handleSearch('')}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
            >
              Show All Surahs
            </button>
          </div>
        )}
        
        {/* Accordion list of surahs */}
        <Accordion 
          type="single" 
          collapsible={true}
          defaultOpen={defaultOpen}
        >
          {filteredSurahs.map((surah) => (
            <SurahAccordionItem
              key={surah.number}
              surah={surah}
            />
          ))}
        </Accordion>
      </div>
      
      {/* Back to top button */}
      <BackToTopButton />
    </>
  );
};

export default AccordionQuranReader; 