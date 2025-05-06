"use client";

import Link from 'next/link';

/**
 * Simplified ProphetStoriesSection component for testing module resolution
 */
const ProphetStoriesSimple = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Prophet Stories</h2>
        <div className="text-center">
          <Link 
            href="/prophet-stories" 
            className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg"
          >
            Explore All Prophet Stories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProphetStoriesSimple; 