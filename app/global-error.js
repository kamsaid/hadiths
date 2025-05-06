'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h1>
              <p className="text-gray-600 mb-6">
                We're sorry, but there was an error loading the application. Our team has been notified.
              </p>
              <button
                onClick={reset}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md transition-colors duration-300"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
} 