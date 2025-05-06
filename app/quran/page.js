import { getAllSurahs } from '@/lib/quranUtils';
import QuranSurahCard from '../components/quran/QuranSurahCard';

/**
 * QuranIndexPage - Lists all surahs of the Quran
 */
export default async function QuranIndexPage() {
  // Fetch all surahs metadata
  const surahs = getAllSurahs();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">The Noble Quran</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse through all 114 surahs of the Holy Quran
        </p>
      </div>
      
      {/* Search bar (optional - we can implement functionality later) */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search surah by name or number..."
            className="w-full py-3 px-4 pr-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {surahs.map((surah) => (
          <QuranSurahCard key={surah.number} surah={surah} />
        ))}
      </div>
    </div>
  );
} 