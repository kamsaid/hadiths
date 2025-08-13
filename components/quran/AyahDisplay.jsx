'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bookmark, 
  Share, 
  Copy
} from 'lucide-react';

/**
 * AyahDisplay - Typography-focused component for displaying a single verse (ayah)
 * Features elegant Arabic text with translation displayed directly below
 * Includes numbered verse indicators and action buttons
 */
const AyahDisplay = ({ 
  ayah, 
  surahNumber, 
  showTransliteration = false,
  onActive = () => {},
}) => {
  // State for action button hover effects
  const [activeAction, setActiveAction] = useState(null);
  
  // Format the verse reference (e.g., "2:255" for Ayatul Kursi)
  const verseReference = `${surahNumber}:${ayah.number}`;
  
  // State to track the selected Arabic font style
  const [arabicFont, setArabicFont] = useState('uthmani');
  
  // Load the saved Arabic font style
  useEffect(() => {
    const savedFont = localStorage.getItem('quran-arabic-font');
    if (savedFont) {
      setArabicFont(savedFont);
    }
    
    // Listen for changes to the font style
    const handleStorageChange = () => {
      const currentFont = localStorage.getItem('quran-arabic-font');
      if (currentFont && currentFont !== arabicFont) {
        setArabicFont(currentFont);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [arabicFont]);
  
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
      className="relative mb-16 group"
      onViewportEnter={() => onActive()}
    >
      <div className="bg-white dark:bg-background rounded-xl p-6 border border-border/50 shadow-sm">
        {/* Verse number indicator */}
        <div className="absolute -left-4 -top-4 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-base ring-2 ring-background shadow-lg">
          {ayah.number}
        </div>
        
        {/* Arabic text with proper typography */}
        <div dir="rtl" lang="ar" className="mb-6 pt-4 quran-verse">
          <p 
            style={{ fontSize: `calc(var(--ayah-fs, 1) * 1em)` }} 
            className={`font-${arabicFont} text-arabic-large verse-animation text-foreground text-center leading-loose`}
          >
            {ayah.text}
            <span className="text-sm text-muted-foreground mr-2">
              ﴿{ayah.number}﴾
            </span>
          </p>
        </div>
        
        {/* Separator line */}
        <div className="w-24 h-px bg-muted mx-auto mb-6"></div>
        
        {/* Optional transliteration */}
        {showTransliteration && ayah.transliteration && (
          <p className="text-muted-foreground text-base italic mb-4 text-center">
            {ayah.transliteration}
          </p>
        )}
        
        {/* Translation - clearly separated from Arabic */}
        <div className="bg-muted/30 p-4 rounded-lg">
          <p style={{ fontSize: 'calc(var(--ayah-fs, 1) * 0.8)' }} className="text-foreground/90 leading-relaxed">
            {ayah.translation}
          </p>
        </div>
        
        {/* Action buttons */}
        <div className="flex justify-end mt-5 space-x-2 opacity-70 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleCopy}
            className={`rounded-md px-3 py-1.5 text-sm flex items-center space-x-1 transition
              ${activeAction === 'copy' 
                ? 'bg-green-100 dark:bg-green-800/30 text-green-800 dark:text-green-200 scale-95' 
                : 'hover:bg-accent/20'}`}
            aria-label="Copy verse"
          >
            <Copy className="h-4 w-4 mr-1" />
            <span>Copy</span>
          </button>
          
          <button
            onClick={handleBookmark}
            className={`rounded-md px-3 py-1.5 text-sm flex items-center space-x-1 transition
              ${activeAction === 'bookmark' 
                ? 'bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-200 scale-95' 
                : 'hover:bg-accent/20'}`}
            aria-label="Bookmark verse"
          >
            <Bookmark className="h-4 w-4 mr-1" />
            <span>Save</span>
          </button>
          
          <button
            onClick={handleShare}
            className="rounded-md px-3 py-1.5 text-sm flex items-center hover:bg-accent/20 transition"
            aria-label="Share verse"
          >
            <Share className="h-4 w-4 mr-1" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AyahDisplay; 