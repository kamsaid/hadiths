import { Card } from "@/components/ui/card";

interface HadithQuoteCardProps {
  arabic?: string;
  translation: string;
  source: string;
  narrator?: string;
}

/**
 * HadithQuoteCard - A modern, clean card component for displaying hadith quotes
 * Features a minimalist design with clear typography and visual hierarchy
 */
export function HadithQuoteCard({ 
  arabic,
  translation, 
  source,
  narrator 
}: HadithQuoteCardProps) {
  return (
    <Card className="overflow-hidden bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Quote Number Display */}
      <div className="absolute top-4 left-4 font-mono text-6xl font-bold opacity-10 select-none">
        99
      </div>
      
      {/* Main Content */}
      <div className="relative p-8 pt-16">
        {/* Arabic Text - Optional */}
        {arabic && (
          <p 
            dir="rtl" 
            className="font-arabic text-2xl leading-relaxed mb-6 text-gray-800 dark:text-gray-200"
          >
            {arabic}
          </p>
        )}
        
        {/* Translation */}
        <div className="relative mb-6">
          <div className="absolute -left-4 top-0 h-full w-1 bg-duson-crimson/80"></div>
          <blockquote className="pl-6 text-xl text-gray-700 dark:text-gray-300 font-medium italic">
            {translation}
          </blockquote>
        </div>
        
        {/* Source and Narrator */}
        <div className="mt-6 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span className="font-medium">{source}</span>
            {narrator && (
              <>
                <span className="text-gray-400">•</span>
                <span>{narrator}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
} 