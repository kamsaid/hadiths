'use client';

import { useEffect, useState } from 'react';
import HadithCard from '../components/hadith/HadithCard';

/**
 * HadithIndexPage - Lists all hadiths with search functionality
 */
export default function HadithIndexPage() {
  // State for storing hadiths and UI states
  const [allHadiths, setAllHadiths] = useState([]);
  const [filteredHadiths, setFilteredHadiths] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collection, setCollection] = useState(null);
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
        
        // Store and filter hadiths
        setAllHadiths(data.hadiths);
        setFilteredHadiths(data.hadiths);
      } catch (error) {
        console.error('Error loading hadiths:', error);
        setError('Failed to load Hadith data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHadiths();
  }, [mounted]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (!query.trim()) {
      // If search is empty, show all hadiths
      setFilteredHadiths(allHadiths);
      return;
    }
    
    // Filter hadiths based on search query
    const filtered = allHadiths.filter(hadith => 
      // Search by number
      hadith.idInBook.toString().includes(query) ||
      // Search by Arabic text
      hadith.arabic.toLowerCase().includes(query) || 
      // Search by English translation
      (hadith.english.text && hadith.english.text.toLowerCase().includes(query)) ||
      // Search by narrator
      (hadith.english.narrator && hadith.english.narrator.toLowerCase().includes(query))
    );
    
    setFilteredHadiths(filtered);
  };
  
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="h-56 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
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
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {collection ? collection.english.title : "Hadith Collection"}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {collection ? `By ${collection.english.author}` : "Islamic traditions and sayings"}
        </p>
      </div>
      
      {/* Search bar with functionality */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search hadith by number or content..."
            className="w-full py-3 px-4 pr-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <svg
            className="absolute right-3 top-3 h-6 w-6 text-gray-400"
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
      </div>
      
      {/* Hadith list */}
      {filteredHadiths.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHadiths.map((hadith) => (
            <div key={hadith.id} className="h-full">
              <HadithCard hadith={hadith} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            No hadiths found matching "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
} 