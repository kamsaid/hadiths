/**
 * DailyQuote component to display a featured quote
 * 
 * @param {string} quote - The quote text to display
 * @param {string} source - The source of the quote (e.g., "Quran 2:286")
 */
export function DailyQuote({ quote, source }) {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <svg className="h-12 w-12 text-emerald-500 dark:text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          
          <blockquote className="mb-6">
            <p className="text-2xl md:text-3xl font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
              {quote}
            </p>
          </blockquote>
          
          <cite className="text-lg text-emerald-600 dark:text-emerald-400 font-medium">
            {source}
          </cite>
        </div>
      </div>
    </section>
  );
} 