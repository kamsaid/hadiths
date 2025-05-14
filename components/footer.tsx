import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Footer() {
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
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-base font-semibold mb-3 text-duson-yellow">Navigation</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-duson-cream/80 hover:text-duson-yellow transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/quran" className="text-duson-cream/80 hover:text-duson-yellow transition-colors">
                    Quran
                  </Link>
                </li>
                <li>
                  <Link href="/hadith" className="text-duson-cream/80 hover:text-duson-yellow transition-colors">
                    Hadith
                  </Link>
                </li>
                <li>
                  <Link href="/prayer" className="text-duson-cream/80 hover:text-duson-yellow transition-colors">
                    Prayer
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-base font-semibold mb-3 text-duson-yellow">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-duson-cream/80 hover:text-duson-yellow transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-duson-cream/80 hover:text-duson-yellow transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-duson-cream/80 hover:text-duson-yellow transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-base font-semibold mb-3 text-duson-yellow">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-duson-cream/80 hover:text-duson-yellow transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-duson-cream/80 hover:text-duson-yellow transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-duson-cream/20 mt-8 pt-8 text-center text-duson-cream/70">
          <p>&copy; {new Date().getFullYear()} <span className="text-duson-yellow">Yas</span><span className="text-duson-crimson">een</span>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 