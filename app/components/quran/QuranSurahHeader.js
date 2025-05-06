'use client';

import Link from 'next/link';

/**
 * QuranSurahHeader - Component for displaying the header of a surah with controls
 * @param {Object} props - Component props
 * @param {Object} props.surah - Surah information object
 * @param {Function} props.onToggleTranslation - Function to toggle translation visibility
 * @param {boolean} props.showTranslation - Whether translation is shown
 */
const QuranSurahHeader = ({ 
  surah, 
  onToggleTranslation, 
  showTranslation = true
}) => {
  // For navigation between surahs
  const prevSurah = surah.number > 1 ? surah.number - 1 : null;
  const nextSurah = surah.number < 114 ? surah.number + 1 : null;
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        {/* Back to list button */}
        <Link 
          href="/quran" 
          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 mr-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Back to Surah List
        </Link>
        
        {/* Surah number indicator */}
        <div className="text-gray-500 dark:text-gray-400 text-sm">
          Surah {surah.number} of 114
        </div>
      </div>
      
      {/* Surah title and information */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            {surah.englishName}
            {surah.englishNameTranslation && (
              <span className="ml-2 text-gray-500 dark:text-gray-400 text-lg font-normal">
                ({surah.englishNameTranslation})
              </span>
            )}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {surah.revelationType} • {surah.ayahs?.length || surah.ayahCount} Verses
          </p>
        </div>
        
        {/* Arabic name */}
        <h2 className="font-arabic text-3xl text-gray-800 dark:text-gray-200 mt-2 md:mt-0">
          {surah.name}
        </h2>
      </div>
      
      {/* Controls bar */}
      <div className="flex flex-wrap items-center justify-between bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
        {/* Navigation controls */}
        <div className="flex items-center space-x-2">
          {prevSurah ? (
            <Link 
              href={`/quran/${prevSurah}`}
              className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Previous
            </Link>
          ) : (
            <button 
              className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm text-gray-400 dark:text-gray-600 cursor-not-allowed"
              disabled
            >
              Previous
            </button>
          )}
          
          {nextSurah ? (
            <Link 
              href={`/quran/${nextSurah}`}
              className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Next
            </Link>
          ) : (
            <button 
              className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm text-gray-400 dark:text-gray-600 cursor-not-allowed"
              disabled
            >
              Next
            </button>
          )}
        </div>
        
        {/* Display options */}
        <div className="flex items-center mt-3 sm:mt-0">
          <button 
            onClick={onToggleTranslation}
            className={`px-3 py-1 rounded-md text-sm transition-colors ${
              showTranslation 
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' 
                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
            }`}
            aria-pressed={showTranslation}
          >
            {showTranslation ? 'Hide Translation' : 'Show Translation'}
          </button>
          
          {/* Placeholder for more settings */}
          <button 
            className="ml-2 p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
            aria-label="More settings"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" 
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuranSurahHeader; 