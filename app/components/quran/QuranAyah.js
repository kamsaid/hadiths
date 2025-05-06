'use client';

/**
 * QuranAyah - Component for displaying a single Quran verse with its translation
 * @param {Object} props - Component props
 * @param {Object} props.ayah - Ayah data object
 * @param {number} props.surahNumber - The surah number
 * @param {boolean} props.showTranslation - Whether to show the translation
 */
const QuranAyah = ({ ayah, surahNumber, showTranslation = true }) => {
  // Format the verse reference (e.g., "2:255" for Ayatul Kursi)
  const verseReference = `${surahNumber}:${ayah.number}`;
  
  return (
    <div className="mb-8 pb-6 border-b border-gray-100 dark:border-gray-800">
      {/* Verse number indicator */}
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mr-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">{ayah.number}</span>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">{verseReference}</span>
      </div>
      
      {/* Arabic text */}
      <p className="font-arabic text-2xl leading-loose text-right mb-4 text-gray-900 dark:text-gray-100">
        {ayah.text}
      </p>
      
      {/* Translation (if enabled) */}
      {showTranslation && ayah.translation && (
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {ayah.translation}
        </p>
      )}
      
      {/* Verse actions bar */}
      <div className="flex items-center justify-end mt-4 text-sm text-gray-500 dark:text-gray-400 space-x-4">
        <button 
          className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          aria-label="Play audio"
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
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          Play
        </button>
        
        <button 
          className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          aria-label="Share verse"
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
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" 
            />
          </svg>
          Share
        </button>
        
        <button 
          className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          aria-label="Bookmark verse"
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
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
            />
          </svg>
          Bookmark
        </button>
      </div>
    </div>
  );
};

export default QuranAyah; 