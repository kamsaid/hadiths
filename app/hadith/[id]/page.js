import { hadiths } from '../../data/hadiths';
import { imageMapping } from '../../data/imageMapping';
import ImagePlaceholder from '../../components/ImagePlaceholder';
import Link from 'next/link';

// Generate static paths for all hadiths
export async function generateStaticParams() {
  return hadiths.map((hadith) => ({
    id: hadith.id.toString(),
  }));
}

export default function HadithPage({ params }) {
  // Find the hadith by ID
  const hadith = hadiths.find((h) => h.id === parseInt(params.id));

  // If hadith doesn't exist, show a message
  if (!hadith) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Hadith Not Found</h1>
        <p className="text-gray-600 mb-6">The hadith you're looking for doesn't exist.</p>
        <Link 
          href="/"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  // Determine image name based on hadith id
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

  // Get image from mapping or use placeholder
  const image = imageMapping[imageName];

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        href="/"
        className="inline-flex items-center text-emerald-700 hover:text-emerald-900 mb-8 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to All Hadiths
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="h-64 bg-emerald-100 relative">
          {image ? (
            <img 
              src={image} 
              alt={hadith.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <ImagePlaceholder title={hadith.title} />
          )}
        </div>

        <div className="p-8">
          <h1 className="text-3xl font-bold text-emerald-800 mb-4">
            {hadith.title}
          </h1>

          <div className="text-sm text-emerald-700 font-medium mb-6">
            Source: {hadith.source}
          </div>

          <div className="mb-8 p-6 bg-emerald-50 rounded-lg border border-emerald-100">
            <h2 className="text-xl font-semibold text-emerald-800 mb-4 text-right">
              Arabic Text
            </h2>
            <p className="text-xl text-gray-800 leading-relaxed text-right font-arabic" dir="rtl">
              {hadith.arabic}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-emerald-800 mb-4">
              Translation
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {hadith.translation}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-emerald-800 mb-4">
              Explanation
            </h2>
            <div className="prose prose-emerald max-w-none text-gray-700">
              {hadith.explanation.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-between">
        {hadith.id > 1 && (
          <Link 
            href={`/hadith/${hadith.id - 1}`}
            className="inline-flex items-center bg-emerald-100 text-emerald-800 hover:bg-emerald-200 px-4 py-2 rounded transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Previous Hadith
          </Link>
        )}

        {hadith.id < hadiths.length && (
          <Link 
            href={`/hadith/${hadith.id + 1}`}
            className="ml-auto inline-flex items-center bg-emerald-100 text-emerald-800 hover:bg-emerald-200 px-4 py-2 rounded transition-colors"
          >
            Next Hadith
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
} 