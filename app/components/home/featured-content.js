import Link from 'next/link';

/**
 * FeaturedContent component that displays featured sections of the application
 * with attractive cards and descriptions to navigate to different parts of the app
 */
export function FeaturedContent() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Explore Islamic Knowledge
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Quran Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-40 bg-emerald-500 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-400 opacity-90"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-4xl font-arabic">القرآن</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">The Noble Quran</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Read and explore all 114 surahs of the Holy Quran with translations and tafsir.
              </p>
              <Link 
                href="/quran/1" 
                className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-700 dark:hover:text-emerald-300"
              >
                Browse Quran
                <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Hadith Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-40 bg-blue-500 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-90"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-4xl font-arabic">الحديث</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">Hadith Collections</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Explore the sayings and traditions of Prophet Muhammad (PBUH) from authentic collections.
              </p>
              <Link 
                href="/hadith" 
                className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300"
              >
                Browse Hadiths
                <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Prayer Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-40 bg-purple-500 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400 opacity-90"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-4xl font-arabic">الصلاة</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">Prayer Times</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Get accurate prayer times for your location, qibla direction and prayer guides.
              </p>
              <Link 
                href="/prayer" 
                className="inline-flex items-center text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300"
              >
                View Prayer Times
                <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 