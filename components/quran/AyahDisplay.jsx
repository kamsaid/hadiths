'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bookmark, 
  Share, 
  Copy
} from 'lucide-react';

/**
 * AyahDisplay - Typography-focused component for displaying a single verse (ayah)
 * Features elegant Arabic text, optional transliteration, and responsive verse numbers
 */
const AyahDisplay = ({ 
  ayah, 
  surahNumber, 
  showTransliteration = false,
}) => {
  // State for action button hover effects
  const [activeAction, setActiveAction] = useState(null);
  
  // Format the verse reference (e.g., "2:255" for Ayatul Kursi)
  const verseReference = `${surahNumber}:${ayah.number}`;
  
  // Copy ayah text and translation to clipboard
  const handleCopy = () => {
    const textToCopy = `${ayah.text}\n\n${ayah.translation}\n\n[${verseReference}]`;
    navigator.clipboard.writeText(textToCopy);
    
    // Visual feedback (optional toast notification could be added here)
    setActiveAction('copy');
    setTimeout(() => setActiveAction(null), 1000);
  };
  
  // Share ayah (for mobile)
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Quran ${verseReference}`,
          text: `${ayah.text}\n\n${ayah.translation}\n\n[${verseReference}]`,
          url: `${window.location.href.split('#')[0]}#ayah-${ayah.number}`
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback to copy if Web Share API is not available
      handleCopy();
    }
  };
  
  // Toggle bookmark (placeholder functionality)
  const handleBookmark = () => {
    setActiveAction('bookmark');
    setTimeout(() => setActiveAction(null), 1000);
    // Actual bookmark saving logic would be implemented here
  };
  
  return (
    <motion.div 
      id={`ayah-${ayah.number}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: ayah.number * 0.05 }}
      className="relative mb-12 pb-6 group"
    >
      {/* Verse number - desktop sticky version */}
      <div className="hidden lg:block">
        <div className="absolute left-[-60px] sticky top-36">
          <div className="h-12 w-12 rounded-full bg-[var(--orange-primary)] text-white flex items-center justify-center font-medium text-base ring-2 ring-white dark:ring-[var(--dark-primary)] shadow-inner">
            {ayah.number}
          </div>
        </div>
      </div>
      
      {/* Verse number - mobile inline version */}
      <div className="lg:hidden mb-5">
        <div className="h-12 w-12 rounded-full bg-[var(--orange-primary)] text-white flex items-center justify-center font-medium text-base ring-2 ring-white dark:ring-[var(--dark-primary)] shadow-inner">
          {ayah.number}
        </div>
      </div>
      
      <div>
        {/* Arabic text with proper typography */}
        <div dir="rtl" lang="ar" className="mb-5">
          <p style={{ fontSize: 'var(--ayah-fs, 1)' }} className="font-amiri font-medium text-[var(--dark-primary)] dark:text-white leading-loose text-center text-[clamp(2rem,3.5vw+1rem,3rem)]">
            {ayah.text}
          </p>
        </div>
        
        {/* Optional transliteration */}
        {showTransliteration && ayah.transliteration && (
          <p className="text-[var(--dark-primary)]/70 dark:text-white/70 text-base italic mb-4 text-center">
            {ayah.transliteration}
          </p>
        )}
        
        {/* Translation */}
        <p className="text-[var(--dark-primary)]/90 dark:text-white/90 text-lg md:text-xl leading-relaxed mt-4">
          {ayah.translation}
        </p>
        
        {/* Action buttons */}
        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={handleCopy}
            className={`rounded-md px-3 py-1.5 text-sm flex items-center space-x-1 transition
              ${activeAction === 'copy' 
                ? 'bg-green-100 dark:bg-green-800/30 text-green-800 dark:text-green-200 scale-95' 
                : 'hover:bg-[var(--orange-light)]'}`}
            aria-label="Copy verse"
          >
            <Copy className="h-4 w-4" />
            <span>Copy</span>
          </button>
          
          <button
            onClick={handleBookmark}
            className={`rounded-md px-3 py-1.5 text-sm flex items-center space-x-1 transition
              ${activeAction === 'bookmark' 
                ? 'bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-200 scale-95' 
                : 'hover:bg-[var(--orange-light)]'}`}
            aria-label="Bookmark verse"
          >
            <Bookmark className="h-4 w-4" />
            <span>Bookmark</span>
          </button>
          
          <button
            onClick={handleShare}
            className="rounded-md px-3 py-1.5 text-sm flex items-center space-x-1 hover:bg-[var(--orange-light)] transition"
            aria-label="Share verse"
          >
            <Share className="h-4 w-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AyahDisplay; 