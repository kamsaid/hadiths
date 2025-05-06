'use client';

import Link from 'next/link';

/**
 * QuranSurahCard - A card component for displaying surah information in the list
 * @param {Object} props - Component props
 * @param {Object} props.surah - Surah information object
 */
const QuranSurahCard = ({ surah }) => {
  return (
    <Link 
      href={`/quran/${surah.number}`}
      className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* Surah number in circle */}
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
            <span className="font-medium">{surah.number}</span>
          </div>
          
          {/* Surah names */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">{surah.englishName}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{surah.englishNameTranslation}</p>
          </div>
        </div>
        
        {/* Arabic name and info */}
        <div className="text-right">
          <p className="font-arabic text-lg mb-1">{surah.name}</p>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-2">
            <span>{surah.ayahCount} verses</span>
            <span>•</span>
            <span>{surah.revelationType}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default QuranSurahCard; 