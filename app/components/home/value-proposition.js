/**
 * ValueProposition component to highlight key features of the application
 */
export function ValueProposition() {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our goal is to make Islamic knowledge accessible and engaging for everyone, anywhere, anytime.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Authentic Content */}
          <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg shadow hover:shadow-md transition">
            <div className="bg-emerald-100 dark:bg-emerald-900/40 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Authentic Content
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              All Quran translations and Hadith collections are sourced from respected scholars and authentic sources to ensure accuracy.
            </p>
          </div>
          
          {/* Easy Navigation */}
          <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg shadow hover:shadow-md transition">
            <div className="bg-blue-100 dark:bg-blue-900/40 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Easy Navigation
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Intuitive design makes it easy to browse Quran surahs, search hadiths, and find what you're looking for quickly.
            </p>
          </div>
          
          {/* Regular Updates */}
          <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg shadow hover:shadow-md transition">
            <div className="bg-purple-100 dark:bg-purple-900/40 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Regular Updates
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              We continuously add new hadith collections, improve translations, and expand our features to enhance your experience.
            </p>
          </div>
          
          {/* Mobile Friendly */}
          <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg shadow hover:shadow-md transition">
            <div className="bg-yellow-100 dark:bg-yellow-900/40 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Mobile Friendly
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Access all content on any device - our responsive design ensures a seamless experience on desktop, tablet, and mobile.
            </p>
          </div>
          
          {/* Community Features */}
          <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg shadow hover:shadow-md transition">
            <div className="bg-red-100 dark:bg-red-900/40 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Community Features
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Join prayer campaigns, share content with friends, and connect with other Muslims around the world.
            </p>
          </div>
          
          {/* Dark Mode */}
          <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg shadow hover:shadow-md transition">
            <div className="bg-indigo-100 dark:bg-indigo-900/40 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Dark Mode
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Comfortable reading experience in any lighting condition with our light and dark themes that automatically adjust.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 