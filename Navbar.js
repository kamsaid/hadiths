import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-emerald-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <a href="/" className="text-2xl font-bold">Islamic Hadiths</a>
          <div className="space-x-4">
            <a href="/" className="hover:text-emerald-200 transition-colors">Home</a>
            <a href="https://sunnah.com/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-200 transition-colors">More Resources</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
