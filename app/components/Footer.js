import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-emerald-900 text-white mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Islamic Hadiths Collection</h3>
            <p className="text-emerald-200 max-w-md">
              A collection of authentic hadiths from Sahih Bukhari and Sahih Muslim with explanations.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-emerald-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-emerald-200 hover:text-white transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-emerald-800 mt-8 pt-8 text-center text-emerald-300">
          <p>&copy; {new Date().getFullYear()} Islamic Hadiths Collection. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 