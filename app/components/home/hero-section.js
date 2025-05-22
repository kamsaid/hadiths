import Link from 'next/link';

/**
 * HeroSection component for the homepage
 * Provides a visually appealing intro section with calls to action
 */
export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-emerald-600 to-emerald-800 py-24">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          {/* Arabic calligraphy pattern */}
          <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M37.9,-65.4C50.4,-60.3,62.9,-52.1,70.7,-40.4C78.5,-28.8,81.6,-14.4,80.4,-0.7C79.3,13,73.8,25.9,65.4,35.9C57,46,45.6,53.2,33.7,60.4C21.9,67.6,10.9,74.8,-1.5,77.1C-13.9,79.4,-27.7,76.8,-39.2,69.8C-50.6,62.8,-59.6,51.6,-64.5,39C-69.5,26.4,-70.2,13.2,-70,-0.1C-69.8,-13.4,-68.6,-26.8,-62.7,-37.7C-56.7,-48.6,-46,-57.1,-34.2,-62.4C-22.4,-67.7,-11.2,-69.9,1.2,-72C13.5,-74.2,27,-70.5,37.9,-65.4Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Hero text content */}
          <div className="text-center lg:text-left lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Explore the Beauty and Wisdom of Islamic Teachings
            </h1>
            <p className="text-emerald-100 text-lg md:text-xl mb-8 max-w-2xl mx-auto lg:mx-0">
              Access the Quran, Hadiths, and Prayer Times in one place. Deepen your understanding and strengthen your connection with Allah.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
            <Link 
                href="/quran/1"
                className="bg-white text-emerald-700 hover:bg-emerald-50 px-6 py-3 rounded-lg font-medium transition shadow-lg hover:shadow-xl"
              >
                Read Quran
              </Link>
              <Link 
                href="/hadith"
                className="bg-emerald-700 text-white hover:bg-emerald-800 px-6 py-3 rounded-lg font-medium transition border border-emerald-500 shadow-lg hover:shadow-xl"
              >
                Explore Hadiths
              </Link>
            </div>
          </div>
          
          {/* Hero image or decorative element */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm p-6 rounded-lg border border-white border-opacity-20 shadow-2xl">
              <div className="text-right mb-4">
                <span className="text-white text-opacity-80 text-sm">Surah Al-Fatihah 1:1-7</span>
              </div>
              <p className="text-white text-4xl font-arabic leading-loose text-right mb-4" dir="rtl">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                <br />
                الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ
                <br />
                الرَّحْمَٰنِ الرَّحِيمِ
                <br />
                مَالِكِ يَوْمِ الدِّينِ
                <br />
                إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ
                <br />
                اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ
                <br />
                صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 