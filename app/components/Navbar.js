import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-emerald-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
          Islamic Hadiths
        </Link>
        <div className="flex space-x-4">
          <Link href="/" className="hover:text-emerald-200 transition-colors">
            Home
          </Link>
          <Link href="/#about" className="hover:text-emerald-200 transition-colors">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 