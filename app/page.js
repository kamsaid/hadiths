import { hadiths } from './data/hadiths';
import { imageMapping } from './data/imageMapping';
import ImagePlaceholder from './components/ImagePlaceholder';
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
      image: imageMapping[imageName],
      imageName
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
                <div className="absolute inset-0 bg-emerald-800 opacity-20 group-hover:opacity-0 transition-opacity duration-300 z-10"></div>
                {hadith.image ? (
                  <img 
                    src={hadith.image} 
                    alt={hadith.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImagePlaceholder 
                    title={hadith.title} 
                    theme={["emerald", "blue", "amber", "rose", "violet"][hadith.id % 5]}
                  />
                )}
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

      {/* About Section */}
      <section id="about" className="mt-20 mb-12 py-12 bg-white rounded-xl shadow-md">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-emerald-800 mb-6 text-center">About This Collection</h2>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-700 mb-4">
              This collection features authentic hadiths from the two most trusted hadith compilations in Sunni Islam: Sahih Bukhari and Sahih Muslim. These collections are considered the most authentic books of Hadith.
            </p>
            
            <p className="text-gray-700 mb-4">
              A hadith is a record of the words, actions, or tacit approvals of the Prophet Muhammad (peace be upon him). The hadiths presented here have been selected for their relevance to daily Muslim life and include both the original Arabic text and English translations.
            </p>
            
            <p className="text-gray-700 mb-4">
              Each hadith is accompanied by a brief explanation to help readers understand its context and significance. These explanations are meant to provide clarity and insight into the teachings contained within each hadith.
            </p>
            
            <div className="mt-8 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
              <h3 className="text-xl font-semibold text-emerald-800 mb-2">About Sahih Bukhari and Sahih Muslim</h3>
              <p className="text-gray-700 mb-2">
                <strong>Sahih Bukhari:</strong> Compiled by Imam Muhammad al-Bukhari (d. 870 CE), this collection contains 7,563 hadiths and is regarded as the most authentic hadith collection.
              </p>
              <p className="text-gray-700">
                <strong>Sahih Muslim:</strong> Compiled by Imam Muslim ibn al-Hajjaj (d. 875 CE), this collection contains 7,500 hadiths and is considered the second most authentic hadith collection.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 