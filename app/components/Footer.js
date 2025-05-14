import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-duson-ebony text-duson-cream mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">
              <span className="text-duson-yellow">Yas</span><span className="text-duson-crimson">een</span>
            </h3>
            <p className="text-duson-cream/80 max-w-md">
              A collection of authentic hadiths from Sahih Bukhari and Sahih Muslim with explanations.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-3 text-duson-cream">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-duson-cream/80 hover:text-duson-yellow transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-duson-cream/80 hover:text-duson-yellow transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-duson-cream/20 mt-8 pt-8 text-center text-duson-cream/70">
          <p>&copy; {new Date().getFullYear()} <span className="text-duson-yellow">Yas</span><span className="text-duson-crimson">een</span>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 