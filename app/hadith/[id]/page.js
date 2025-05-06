'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * HadithDetailPage - Displays detailed information about a specific hadith
 */
export default function HadithDetailPage({ params }) {
  const [hadith, setHadith] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
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
      } catch (error) {
        console.error('Error loading hadith:', error);
        setError(error.message || 'Failed to load hadith');
      } finally {
        setLoading(false);
      }
    };
    
    fetchHadith();
  }, [id, mounted]);

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
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded transition-colors"
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
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Return to Hadiths
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        href="/hadith"
        className="inline-flex items-center text-emerald-700 hover:text-emerald-900 mb-8 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to All Hadiths
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-emerald-800 dark:text-emerald-400 mb-4">
            Hadith #{hadith.idInBook}
          </h1>

          <div className="text-sm text-emerald-700 dark:text-emerald-500 font-medium mb-6">
            Source: Forty Hadith of Imam Nawawi
          </div>

          {/* Arabic Text */}
          <div className="mb-8 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-900">
            <h2 className="text-xl font-semibold text-emerald-800 dark:text-emerald-400 mb-4 text-right">
              Arabic Text
            </h2>
            <p className="text-xl text-gray-800 dark:text-gray-200 leading-relaxed text-right font-arabic" dir="rtl">
              {hadith.arabic}
            </p>
          </div>

          {/* Narrator */}
          {hadith.english.narrator && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-emerald-800 dark:text-emerald-400 mb-2">
                Narrator
              </h2>
              <p className="text-md text-gray-700 dark:text-gray-300 italic">
                {hadith.english.narrator}
              </p>
            </div>
          )}

          {/* Translation */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-emerald-800 dark:text-emerald-400 mb-4">
              Translation
            </h2>
            <div className="prose prose-emerald dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
              {hadith.english.text.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation between hadiths */}
      <div className="mt-12 flex justify-between">
        {hadith.idInBook > 1 && (
          <Link 
            href={`/hadith/${hadith.idInBook - 1}`}
            className="inline-flex items-center bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 px-4 py-2 rounded transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Previous Hadith
          </Link>
        )}

        <Link 
          href={`/hadith/${hadith.idInBook + 1}`}
          className="ml-auto inline-flex items-center bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 px-4 py-2 rounded transition-colors"
        >
          Next Hadith
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
} 