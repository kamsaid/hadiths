import React from 'react';

export default function HadithCard({ hadith }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 hadith-card">
      <div className="h-48 bg-emerald-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-800 opacity-20 group-hover:opacity-0 transition-opacity duration-300"></div>
        <img 
          src={hadith.image} 
          alt={hadith.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-emerald-800 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
          {hadith.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {hadith.translation}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-emerald-700 font-medium">
            Source: {hadith.source}
          </span>
          <span className="text-emerald-600 text-sm font-medium group-hover:text-emerald-800">
            Read more →
          </span>
        </div>
      </div>
    </div>
  );
}
