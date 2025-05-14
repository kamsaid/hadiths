'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import HadithCard from '../components/hadith/HadithCard';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

/**
 * HadithIndexPage - Redesigned hadith listing with masonry layout, 
 * sticky search/filter, and improved UX
 */
export default function HadithIndexPage() {
  // State for storing hadiths and UI states
  const [allHadiths, setAllHadiths] = useState([]);
  const [filteredHadiths, setFilteredHadiths] = useState([]);
  const [displayedHadiths, setDisplayedHadiths] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collection, setCollection] = useState(null);
  const [collectionsOptions, setCollectionsOptions] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  
  // Refs for search bar sticky behavior
  const searchBarRef = useRef(null);
  const [isSearchSticky, setIsSearchSticky] = useState(false);
  
  // Add mounted state to prevent hydration issues
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load hadiths on component mount
  useEffect(() => {
    // Only fetch data if component is mounted
    if (!mounted) return;
    
    // Fetch all hadiths metadata from API
    const fetchHadiths = async () => {
      try {
        const response = await fetch('/api/hadith');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Store the collection metadata
        setCollection(data.metadata);
        
        // Generate collections for filter dropdown (mocked for now)
        setCollectionsOptions([
          { value: 'all', label: 'All Collections' },
          { value: 'nawawi', label: 'Nawawi' },
          { value: 'qudsi', label: 'Qudsi' }
        ]);
        
        // Store and filter hadiths
        setAllHadiths(data.hadiths);
        setFilteredHadiths(data.hadiths);
        setDisplayedHadiths(data.hadiths.slice(0, itemsPerPage));
      } catch (error) {
        console.error('Error loading hadiths:', error);
        setError('Failed to load Hadith data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHadiths();
  }, [mounted]);

  // Handle scroll for sticky search bar
  useEffect(() => {
    const handleScroll = () => {
      if (!searchBarRef.current) return;
      
      const scrollTop = window.scrollY;
      const triggerPoint = 80; // Adjust based on your navbar height
      
      setIsSearchSticky(scrollTop > triggerPoint);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter hadiths based on search query and selected collection
  useEffect(() => {
    let results = allHadiths;
    
    // Apply collection filter if not "all"
    if (selectedCollection !== 'all') {
      results = results.filter(hadith => {
        // This is a placeholder. Update with actual collection filter logic
        // For demo purposes, we'll consider 1-20 as nawawi and 21+ as qudsi
        if (selectedCollection === 'nawawi') return hadith.idInBook <= 20;
        if (selectedCollection === 'qudsi') return hadith.idInBook > 20;
        return true;
      });
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(hadith => 
        // Search by number
        hadith.idInBook.toString().includes(query) ||
        // Search by Arabic text
        hadith.arabic.toLowerCase().includes(query) || 
        // Search by English translation
        (hadith.english.text && hadith.english.text.toLowerCase().includes(query)) ||
        // Search by narrator
        (hadith.english.narrator && hadith.english.narrator.toLowerCase().includes(query))
      );
    }
    
    setFilteredHadiths(results);
    setDisplayedHadiths(results.slice(0, itemsPerPage));
    setCurrentPage(1);
  }, [searchQuery, selectedCollection, allHadiths]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle collection filter changes
  const handleCollectionChange = (e) => {
    setSelectedCollection(e.target.value);
  };
  
  // Load more hadiths
  const loadMoreHadiths = () => {
    const nextPage = currentPage + 1;
    const startIndex = 0;
    const endIndex = nextPage * itemsPerPage;
    
    setDisplayedHadiths(filteredHadiths.slice(startIndex, endIndex));
    setCurrentPage(nextPage);
  };
  
  // Keyboard navigation for hadith cards
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Find all cards and currently focused card
      const cards = document.querySelectorAll('.hadith-card a');
      if (!cards.length) return;
      
      const focusedElement = document.activeElement;
      const isFocusedOnCard = Array.from(cards).includes(focusedElement);
      if (!isFocusedOnCard) return;
      
      const focusedIndex = Array.from(cards).indexOf(focusedElement);
      let nextIndex;
      
      switch (e.key) {
        case 'ArrowRight':
          nextIndex = focusedIndex + 1;
          break;
        case 'ArrowLeft':
          nextIndex = focusedIndex - 1;
          break;
        case 'ArrowUp':
          // Approximate row movement based on grid
          nextIndex = Math.max(0, focusedIndex - 3);
          break;
        case 'ArrowDown':
          // Approximate row movement based on grid
          nextIndex = Math.min(cards.length - 1, focusedIndex + 3);
          break;
        default:
          return;
      }
      
      // Focus next card if it exists
      if (nextIndex >= 0 && nextIndex < cards.length) {
        e.preventDefault();
        cards[nextIndex].focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [displayedHadiths]);
  
  // Don't render anything during initial client-side render to prevent hydration mismatch
  if (!mounted) {
    return null;
  }
  
  // Show loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8 animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-64 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-96"></div>
        </div>
        <div className="mb-8 animate-pulse">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 animate-pulse">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="h-56 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6"></div>
          ))}
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-red-600">Error</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-8">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[var(--orange-primary)] text-white rounded-md hover:bg-[var(--orange-secondary)] transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2 text-[var(--dark-primary)] dark:text-white">
          {collection ? collection.english.title : "Hadith Collection"}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {collection ? `By ${collection.english.author}` : "Islamic traditions and sayings"}
        </p>
      </motion.div>
      
      {/* Sticky search and filter bar */}
      <div 
        ref={searchBarRef}
        className={`${
          isSearchSticky 
            ? 'sticky top-20 z-10 py-4 px-4 -mx-4 bg-white/95 dark:bg-gray-900/95 shadow-md backdrop-blur-sm' 
            : 'mb-8'
        } transition-all duration-200`}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search input */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search by number, Arabic, or English…"
              className="w-full py-2.5 px-4 pr-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[var(--orange-primary)]"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          {/* Collection filter */}
          <select
            value={selectedCollection}
            onChange={handleCollectionChange}
            className="py-2.5 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-[var(--dark-primary)] dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--orange-primary)] sm:max-w-[200px]"
            aria-label="Filter by collection"
          >
            {collectionsOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Hadith masonry list */}
      {filteredHadiths.length > 0 ? (
        <>
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
            {displayedHadiths.map((hadith, index) => (
              <div key={hadith.id} className="hadith-card">
                <HadithCard hadith={hadith} index={index} />
              </div>
            ))}
          </div>
          
          {/* Load more button */}
          {displayedHadiths.length < filteredHadiths.length && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={loadMoreHadiths}
                className="px-6 py-2.5 bg-[var(--orange-primary)] text-white rounded-md hover:bg-[var(--orange-secondary)] transition shadow-sm"
              >
                Load More Hadiths
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            No hadiths found matching "{searchQuery}"
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-4 py-2 bg-[var(--orange-primary)] text-white rounded-md hover:bg-[var(--orange-secondary)] transition"
            >
              Clear Search
            </button>
          )}
        </div>
      )}
    </div>
  );
} 