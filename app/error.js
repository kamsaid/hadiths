'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-6">
          We're sorry, but there was an error loading this page. Our team has been notified.
        </p>
        <button
          onClick={reset}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md transition-colors duration-300"
        >
          Try again
        </button>
      </div>
    </div>
  );
} 