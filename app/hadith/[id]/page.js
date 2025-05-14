'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Copy, 
  Bookmark, 
  Share2, 
  BookOpen, 
  Minus, 
  Plus 
} from 'lucide-react';
import { Slider } from "@/components/ui/slider";

/**
 * HadithDetailPage - Redesigned page for individual hadith viewing
 * Includes sticky header, beautiful typography, and interaction features
 */
export default function HadithDetailPage({ params }) {
  const [hadith, setHadith] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [isSliderExpanded, setIsSliderExpanded] = useState(false);
  const [copyStatus, setCopyStatus] = useState('idle'); // 'idle', 'copied', 'error'
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { id } = params;

  // Set mounted to true after initial client-side render
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch hadith data when component mounts
  useEffect(() => {
    // Only fetch if component is mounted
    if (!mounted) return;
    
    const fetchHadith = async () => {
      try {
        const response = await fetch(`/api/hadith/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Hadith not found');
          }
          throw new Error('Failed to load hadith');
        }
        
        const data = await response.json();
        setHadith(data);
        
        // Check if hadith is bookmarked
        const bookmarkedHadiths = JSON.parse(localStorage.getItem('bookmarked-hadiths') || '[]');
        setIsBookmarked(bookmarkedHadiths.includes(parseInt(id)));
      } catch (error) {
        console.error('Error loading hadith:', error);
        setError(error.message || 'Failed to load hadith');
      } finally {
        setLoading(false);
      }
    };
    
    fetchHadith();
  }, [id, mounted]);
  
  // Apply font size changes
  useEffect(() => {
    // Calculate scale between 1.0 and 1.75
    const fontScale = 1 + ((fontSize - 100) / 100) * 0.75;
    document.documentElement.style.setProperty('--hadith-fs', fontScale);
    
    // Store user preference
    localStorage.setItem('hadith-font-size', fontSize);
  }, [fontSize]);
  
  // Load saved font size preference
  useEffect(() => {
    const savedFontSize = localStorage.getItem('hadith-font-size');
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize, 10));
    }
  }, []);
  
  // Copy hadith text to clipboard
  const copyHadith = async () => {
    if (!hadith) return;
    
    try {
      const textToCopy = `Hadith #${hadith.idInBook}\n\n${hadith.arabic}\n\n${hadith.english.text}`;
      await navigator.clipboard.writeText(textToCopy);
      setCopyStatus('copied');
      
      // Reset copy status after 2 seconds
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyStatus('error');
      
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };
  
  // Toggle bookmark status
  const toggleBookmark = () => {
    if (!hadith) return;
    
    const hadithId = parseInt(id);
    const bookmarkedHadiths = JSON.parse(localStorage.getItem('bookmarked-hadiths') || '[]');
    
    if (isBookmarked) {
      const updatedBookmarks = bookmarkedHadiths.filter(id => id !== hadithId);
      localStorage.setItem('bookmarked-hadiths', JSON.stringify(updatedBookmarks));
    } else {
      bookmarkedHadiths.push(hadithId);
      localStorage.setItem('bookmarked-hadiths', JSON.stringify(bookmarkedHadiths));
    }
    
    setIsBookmarked(!isBookmarked);
  };
  
  // Share hadith 
  const shareHadith = async () => {
    if (!hadith) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Hadith #${hadith.idInBook}`,
          text: `${hadith.english.text.substring(0, 100)}...`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing: ', err);
      }
    } else {
      // Fallback to copying URL to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy URL: ', err);
      }
    }
  };

  // Don't render anything during initial client-side render to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-32 mb-8"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-8"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-64 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-48 mb-8"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-8"></div>
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-8"></div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
        <Link 
          href="/hadith"
          className="inline-block bg-[var(--orange-primary)] hover:bg-[var(--orange-secondary)] text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Return to Hadiths
        </Link>
      </div>
    );
  }

  // If hadith doesn't exist, show a message
  if (!hadith) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Hadith Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">The hadith you're looking for doesn't exist.</p>
        <Link 
          href="/hadith"
          className="inline-block bg-[var(--orange-primary)] hover:bg-[var(--orange-secondary)] text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Return to Hadiths
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12">
      {/* Sticky header */}
      <div className="sticky top-0 z-20 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link 
            href="/hadith"
            className="inline-flex items-center text-[var(--dark-primary)] dark:text-white hover:text-[var(--orange-primary)] transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="font-medium">Back</span>
          </Link>
          
          <h1 className="font-semibold text-[var(--dark-primary)] dark:text-white">
            Hadith #{hadith.idInBook}
          </h1>
          
          <span className="text-sm px-2 py-1 rounded-full bg-[var(--orange-primary)]/10 text-[var(--orange-primary)] dark:bg-[var(--orange-primary)]/20">
            Nawawi
          </span>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Arabic Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 text-center"
        >
          <p 
            dir="rtl" 
            className="text-[var(--dark-primary)] dark:text-white font-noto mx-auto max-w-4xl text-[clamp(1.8rem,3.5vw+1rem,2.6rem)] leading-[1.8] tracking-wide"
            style={{ fontSize: `calc(var(--hadith-fs, 1) * clamp(1.8rem, 3.5vw + 1rem, 2.6rem))` }}
          >
            {hadith.arabic}
          </p>
        </motion.div>
        
        {/* Narrator (if exists) */}
        {hadith.english.narrator && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mb-6 max-w-3xl mx-auto"
          >
            <p className="text-md text-[var(--orange-secondary)] dark:text-[var(--orange-primary)] italic text-center">
              {hadith.english.narrator}
            </p>
          </motion.div>
        )}
        
        {/* English Translation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 max-w-3xl mx-auto mb-8"
        >
          <div className="prose prose-lg dark:prose-invert max-w-none text-[var(--dark-primary)]/90 dark:text-gray-300">
            {hadith.english.text.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
        
        {/* Action Buttons Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="flex justify-center gap-4 mt-8 max-w-md mx-auto"
        >
          <button 
            onClick={copyHadith}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              copyStatus === 'copied' 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-[var(--dark-primary)] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            aria-label="Copy hadith text"
          >
            <Copy className="h-5 w-5" />
            <span className="text-xs">
              {copyStatus === 'copied' ? 'Copied!' : 'Copy'}
            </span>
          </button>
          
          <button 
            onClick={toggleBookmark}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              isBookmarked 
                ? 'text-[var(--orange-primary)]' 
                : 'text-[var(--dark-primary)] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark hadith"}
          >
            <Bookmark className="h-5 w-5" fill={isBookmarked ? 'currentColor' : 'none'} />
            <span className="text-xs">
              {isBookmarked ? 'Saved' : 'Save'}
            </span>
          </button>
          
          <button 
            onClick={shareHadith}
            className="flex flex-col items-center gap-1 p-2 rounded-lg text-[var(--dark-primary)] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Share hadith"
          >
            <Share2 className="h-5 w-5" />
            <span className="text-xs">Share</span>
          </button>
        </motion.div>
      </div>
      
      {/* Font size slider (fixed position) */}
      <div className="fixed right-4 bottom-4 z-30 lg:right-8 lg:bottom-8">
        <div className="relative">
          {/* Toggle button */}
          <motion.button
            onClick={() => setIsSliderExpanded(!isSliderExpanded)}
            className="h-12 w-12 rounded-full bg-[var(--orange-primary)] text-white flex items-center justify-center shadow-lg hover:bg-[var(--orange-secondary)] transition-colors"
            whileTap={{ scale: 0.95 }}
            aria-label={isSliderExpanded ? "Close font size controls" : "Adjust font size"}
            aria-expanded={isSliderExpanded}
          >
            <BookOpen className="h-5 w-5" />
          </motion.button>
          
          {/* Slider panel */}
          <AnimatePresence>
            {isSliderExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ type: 'spring', damping: 25 }}
                className="absolute right-0 bottom-14 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg w-64"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-[var(--dark-primary)] dark:text-white">Font Size</h3>
                  <span className="text-sm text-[var(--dark-primary)]/70 dark:text-white/70">
                    {fontSize}%
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => setFontSize(Math.max(100, fontSize - 5))}
                    className="text-[var(--dark-primary)] dark:text-white p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label="Decrease font size"
                    disabled={fontSize <= 100}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  
                  <Slider
                    min={100}
                    max={175}
                    step={5}
                    value={[fontSize]}
                    onValueChange={(value) => setFontSize(value[0])}
                    className="flex-1"
                    aria-label="Adjust font size"
                  />
                  
                  <button 
                    onClick={() => setFontSize(Math.min(175, fontSize + 5))}
                    className="text-[var(--dark-primary)] dark:text-white p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label="Increase font size"
                    disabled={fontSize >= 175}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="mt-3 text-xs text-[var(--dark-primary)]/60 dark:text-white/60 text-center">
                  Adjust the size of the Arabic text
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Navigation between hadiths */}
      <div className="container mx-auto px-4 mt-12">
        <div className="flex justify-between max-w-lg mx-auto">
          {hadith.idInBook > 1 && (
            <Link 
              href={`/hadith/${hadith.idInBook - 1}`}
              className="inline-flex items-center px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-[var(--dark-primary)] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Hadith
            </Link>
          )}

          <Link 
            href={`/hadith/${hadith.idInBook + 1}`}
            className="inline-flex items-center px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-[var(--dark-primary)] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ml-auto"
          >
            Next Hadith
            <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
} 