import { hadiths } from '../data/hadiths';
import { imageMapping } from '../data/imageMapping';
import Link from 'next/link';

export default function Home() {
  // Update image paths in hadiths data
  const updatedHadiths = hadiths.map(hadith => {
    let imageName = '';
    if (hadith.id === 1) imageName = 'tasbeeh';
    else if (hadith.id === 2) imageName = 'parents';
    else if (hadith.id === 3) imageName = 'suspicion';
    else if (hadith.id === 4) imageName = 'tongue';
    else if (hadith.id === 5) imageName = 'forbidden';
    else if (hadith.id === 6) imageName = 'ramadan';
    else if (hadith.id === 7) imageName = 'hajj';
    else if (hadith.id === 8) imageName = 'yawning';
    else if (hadith.id === 9) imageName = 'kindness';
    else if (hadith.id === 10) imageName = 'knowledge';
    
    return {
      ...hadith,
      image: imageMapping[imageName]
    };
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-emerald-800 mb-4">Islamic Hadiths Collection</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          A collection of authentic hadiths from Sahih Bukhari and Sahih Muslim with explanations.
          Click on any hadith to read more.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {updatedHadiths.map((hadith) => (
          <Link 
            href={`/hadith/${hadith.id}`} 
            key={hadith.id}
            className="block group"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
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
          </Link>
        ))}
      </div>
    </div>
  );
}
