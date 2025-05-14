"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Navbar component with responsive design
 * Provides navigation for Home, Quran, Hadith, and Prayer pages
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll event to add shadow to navbar when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if a link is active
  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <nav className={`bg-duson-cream dark:bg-duson-ebony sticky top-0 z-50 transition-shadow ${
      isScrolled ? 'shadow-md' : 'border-b-2 border-duson-crimson/30 dark:border-duson-crimson/30'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex justify-center items-center bg-gradient-to-r from-duson-yellow to-duson-crimson text-duson-cream w-10 h-10 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <span className="font-semibold text-lg text-duson-ebony dark:text-duson-cream">
              <span className="text-duson-yellow">Yas</span><span className="text-duson-crimson">een</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              href="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-duson-crimson dark:text-duson-yellow bg-duson-crimson/20 dark:bg-duson-yellow/30 border-b-2 border-duson-crimson dark:border-duson-yellow' 
                  : 'text-duson-ebony dark:text-duson-cream hover:text-duson-crimson dark:hover:text-duson-yellow hover:bg-duson-crimson/5 dark:hover:bg-duson-yellow/5'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/quran" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/quran') 
                  ? 'text-duson-crimson dark:text-duson-yellow bg-duson-crimson/20 dark:bg-duson-yellow/30 border-b-2 border-duson-crimson dark:border-duson-yellow' 
                  : 'text-duson-ebony dark:text-duson-cream hover:text-duson-crimson dark:hover:text-duson-yellow hover:bg-duson-crimson/5 dark:hover:bg-duson-yellow/5'
              }`}
            >
              Quran
            </Link>
            <Link 
              href="/hadith" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/hadith') 
                  ? 'text-duson-crimson dark:text-duson-yellow bg-duson-crimson/20 dark:bg-duson-yellow/30 border-b-2 border-duson-crimson dark:border-duson-yellow' 
                  : 'text-duson-ebony dark:text-duson-cream hover:text-duson-crimson dark:hover:text-duson-yellow hover:bg-duson-crimson/5 dark:hover:bg-duson-yellow/5'
              }`}
            >
              Hadith
            </Link>
            <Link 
              href="/prayer" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/prayer') 
                  ? 'text-duson-crimson dark:text-duson-yellow bg-duson-crimson/20 dark:bg-duson-yellow/30 border-b-2 border-duson-crimson dark:border-duson-yellow' 
                  : 'text-duson-ebony dark:text-duson-cream hover:text-duson-crimson dark:hover:text-duson-yellow hover:bg-duson-crimson/5 dark:hover:bg-duson-yellow/5'
              }`}
            >
              Prayer
            </Link>
            <Link 
              href="/prophet-stories" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/prophet-stories') 
                  ? 'text-duson-crimson dark:text-duson-yellow bg-duson-crimson/20 dark:bg-duson-yellow/30 border-b-2 border-duson-crimson dark:border-duson-yellow' 
                  : 'text-duson-ebony dark:text-duson-cream hover:text-duson-crimson dark:hover:text-duson-yellow hover:bg-duson-crimson/5 dark:hover:bg-duson-yellow/5'
              }`}
            >
              Prophet Stories
            </Link>
            <Link 
              href="/chat" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/chat') 
                  ? 'text-duson-crimson dark:text-duson-yellow bg-duson-crimson/20 dark:bg-duson-yellow/30 border-b-2 border-duson-crimson dark:border-duson-yellow' 
                  : 'text-duson-ebony dark:text-duson-cream hover:text-duson-crimson dark:hover:text-duson-yellow hover:bg-duson-crimson/5 dark:hover:bg-duson-yellow/5'
              }`}
            >
              Chat with Yaseen
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            type="button" 
            className="md:hidden text-duson-ebony dark:text-duson-cream hover:text-duson-crimson dark:hover:text-duson-yellow focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-duson-cream dark:bg-duson-ebony py-4 border-t border-duson-ebony/20 dark:border-duson-cream/20 animate-fade-in">
            <div className="flex flex-col space-y-1 px-2">
              <Link 
                href="/" 
                className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-duson-crimson dark:text-duson-yellow bg-duson-crimson/20 dark:bg-duson-yellow/30 border-l-4 border-duson-crimson dark:border-duson-yellow' 
                    : 'text-duson-ebony dark:text-duson-cream hover:text-duson-crimson dark:hover:text-duson-yellow hover:bg-duson-crimson/5 dark:hover:bg-duson-yellow/5'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/quran" 
                className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/quran') 
                    ? 'text-duson-crimson dark:text-duson-yellow bg-duson-crimson/20 dark:bg-duson-yellow/30 border-l-4 border-duson-crimson dark:border-duson-yellow' 
                    : 'text-duson-ebony dark:text-duson-cream hover:text-duson-crimson dark:hover:text-duson-yellow hover:bg-duson-crimson/5 dark:hover:bg-duson-yellow/5'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Quran
              </Link>
              <Link 
                href="/hadith" 
                className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/hadith') 
                    ? 'text-duson-crimson dark:text-duson-yellow bg-duson-crimson/20 dark:bg-duson-yellow/30 border-l-4 border-duson-crimson dark:border-duson-yellow' 
                    : 'text-duson-ebony dark:text-duson-cream hover:text-duson-crimson dark:hover:text-duson-yellow hover:bg-duson-crimson/5 dark:hover:bg-duson-yellow/5'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Hadith
              </Link>
              <Link 
                href="/prayer" 
                className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/prayer') 
                    ? 'text-duson-crimson dark:text-duson-yellow bg-duson-crimson/20 dark:bg-duson-yellow/30 border-l-4 border-duson-crimson dark:border-duson-yellow' 
                    : 'text-duson-ebony dark:text-duson-cream hover:text-duson-crimson dark:hover:text-duson-yellow hover:bg-duson-crimson/5 dark:hover:bg-duson-yellow/5'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Prayer
              </Link>
              <Link 
                href="/prophet-stories" 
                className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/prophet-stories') 
                    ? 'text-duson-crimson dark:text-duson-yellow bg-duson-crimson/20 dark:bg-duson-yellow/30 border-l-4 border-duson-crimson dark:border-duson-yellow' 
                    : 'text-duson-ebony dark:text-duson-cream hover:text-duson-crimson dark:hover:text-duson-yellow hover:bg-duson-crimson/5 dark:hover:bg-duson-yellow/5'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Prophet Stories
              </Link>
              <Link 
                href="/chat" 
                className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/chat') 
                    ? 'text-duson-crimson dark:text-duson-yellow bg-duson-crimson/20 dark:bg-duson-yellow/30 border-l-4 border-duson-crimson dark:border-duson-yellow' 
                    : 'text-duson-ebony dark:text-duson-cream hover:text-duson-crimson dark:hover:text-duson-yellow hover:bg-duson-crimson/5 dark:hover:bg-duson-yellow/5'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Chat with Yaseen
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 