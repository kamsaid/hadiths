import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Islamic Hadiths Collection',
  description: 'A collection of authentic hadiths from Sahih Bukhari and Sahih Muslim with explanations',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
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
        
        <main>
          {children}
        </main>
        
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
      </body>
    </html>
  );
}
