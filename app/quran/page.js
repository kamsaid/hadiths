'use client';

import { useEffect, useState } from 'react';
import QuranSurahCard from '../components/quran/QuranSurahCard';

/**
 * QuranIndexPage - Lists all surahs of the Quran with search functionality
 */
export default function QuranIndexPage() {
  // State for storing all surahs and filtered surahs
  const [allSurahs, setAllSurahs] = useState([]);
  const [filteredSurahs, setFilteredSurahs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load surahs on component mount
  useEffect(() => {
    // Fetch all surahs metadata from API
    const fetchSurahs = async () => {
      try {
        const response = await fetch('/api/quran');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        
        const surahs = await response.json();
        setAllSurahs(surahs);
        setFilteredSurahs(surahs);
      } catch (error) {
        console.error('Error loading surahs:', error);
        setError('Failed to load Quran data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (!query.trim()) {
      // If search is empty, show all surahs
      setFilteredSurahs(allSurahs);
      return;
    }
    
    // Filter surahs based on search query
    const filtered = allSurahs.filter(surah => 
      // Search by number
      surah.number.toString().includes(query) ||
      // Search by name
      surah.name.toLowerCase().includes(query) || 
      // Search by English name
      surah.englishName.toLowerCase().includes(query) ||
      // Search by English translation
      surah.englishNameTranslation.toLowerCase().includes(query)
    );
    
    setFilteredSurahs(filtered);
  };
  
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
          {[...Array(12)].map((_, index) => (
            <div key={index} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
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
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
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
        <h1 className="text-3xl font-bold mb-2">The Noble Quran</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse through all 114 surahs of the Holy Quran
        </p>
      </div>
      
      {/* Search bar with functionality */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search surah by name or number..."
            className="w-full py-3 px-4 pr-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      
      {/* Surah list */}
      {filteredSurahs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSurahs.map((surah) => (
            <QuranSurahCard key={surah.number} surah={surah} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            No surahs found matching "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
} 