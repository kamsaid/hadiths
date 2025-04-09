import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-emerald-900 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="mb-2">Islamic Hadiths Collection © {new Date().getFullYear()}</p>
          <p className="text-sm text-emerald-200">
            All hadiths are from authentic sources: Sahih Bukhari and Sahih Muslim
          </p>
        </div>
      </div>
    </footer>
  );
}
