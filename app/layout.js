import './globals.css'
import './dark-mode.css'
import '@fontsource/amiri-quran'
import '@fontsource/noto-naskh-arabic'
import '@fontsource/scheherazade-new'
import '../styles/themes.css'
import '../styles/arabic-text.css'
import { ThemeProvider } from "@/components/theme-provider"
import Link from "next/link"
import { Sparkles, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import MobileMenu from "@/components/mobile-menu"

export const metadata = {
  title: 'Yaseen',
  description: 'Find peace through prayer with Yaseen - your spiritual companion for Islamic prayer and meditation',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Essential mobile viewport configuration */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        
        {/* Enhanced mobile experience meta tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Yaseen" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#FBBD0D" />
        <meta name="msapplication-TileColor" content="#FBBD0D" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        
        <script dangerouslySetInnerHTML={{
          __html: `
            // Initialize Arabic font style from localStorage
            try {
              const savedArabicFont = localStorage.getItem('quran-arabic-font');
              if (savedArabicFont) {
                document.documentElement.style.setProperty('--selected-arabic-font', savedArabicFont);
              }
            } catch (e) {
              // Ignore localStorage errors
            }
          `,
        }} />
      </head>
      <body className="min-h-screen bg-background flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Mobile-Optimized Header */}
          <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4">
              {/* Logo - Optimized for mobile */}
              <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                <div className="relative h-8 w-8">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-duson-yellow" />
                  </div>
                  <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-dashed border-duson-yellow opacity-75"></div>
                </div>
                <span className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-duson-yellow to-duson-crimson">
                  Yaseen
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex gap-6">
                <Link href="/quran/1" className="text-sm font-medium transition-colors hover:text-duson-yellow">
                  Quran
                </Link>
                <Link href="/hadith" className="text-sm font-medium transition-colors hover:text-duson-yellow">
                  Hadiths
                </Link>
                <Link href="/prophet-stories" className="text-sm font-medium transition-colors hover:text-duson-yellow">
                  Prophet Stories
                </Link>
                <Link href="/explore" className="text-sm font-medium transition-colors hover:text-duson-yellow">
                  Explore
                </Link>
                <Link href="/chat" className="text-sm font-medium transition-colors hover:text-duson-yellow">
                  Chat with Yaseen
                </Link>
              </nav>

              {/* Right side controls */}
              <div className="flex items-center gap-2 sm:gap-4">
                {/* Theme Toggle - Always visible */}
                <ThemeToggle />
                
                {/* Desktop Login Button */}
                <div className="hidden lg:flex gap-2">
                  <Link href="/login" passHref legacyBehavior>
                    <Button variant="outline" size="sm" as="a">
                      Login
                    </Button>
                  </Link>
                </div>

                {/* Mobile Menu - Show on mobile and tablet */}
                <div className="lg:hidden">
                  <MobileMenu 
                    items={[
                      { name: "Quran", href: "/quran/1" },
                      { name: "Hadiths", href: "/hadith" },
                      { name: "Prophet Stories", href: "/prophet-stories" },
                      { name: "Explore", href: "/explore" },
                      { name: "Chat with Yaseen", href: "/chat" }
                    ]}
                  />
                </div>
              </div>
            </div>
          </header>

          <main className="flex-grow">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container px-4 py-8 md:px-6 md:py-12">
              <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-duson-yellow" />
                    <span className="text-lg font-bold">Yaseen</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your companion on the journey to spiritual growth and understanding.
                  </p>
                </div>
                <div>
                  <h3 className="mb-4 text-sm font-medium">Resources</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                    <Link href="/quran/1" className="text-muted-foreground hover:text-foreground">
                        Quran
                      </Link>
                    </li>
                    <li>
                      <Link href="/hadith" className="text-muted-foreground hover:text-foreground">
                        Hadiths
                      </Link>
                    </li>
                    <li>
                      <Link href="/prophet-stories" className="text-muted-foreground hover:text-foreground">
                        Prophet Stories
                      </Link>
                    </li>
                    <li>
                      <Link href="/explore" className="text-muted-foreground hover:text-foreground">
                        Explore
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-4 text-sm font-medium">Company</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="/about" className="text-muted-foreground hover:text-foreground">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                        Careers
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-4 text-sm font-medium">Legal</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                        Terms
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                        Privacy
                      </Link>
                    </li>
                    <li>
                      <Link href="/cookies" className="text-muted-foreground hover:text-foreground">
                        Cookies
                      </Link>
                    </li>
                    <li>
                      <Link href="/licenses" className="text-muted-foreground hover:text-foreground">
                        Licenses
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-xs text-muted-foreground">
                  &copy; {new Date().getFullYear()} Yaseen. All rights reserved.
                </p>
                <div className="flex gap-4">
                  <Link href="https://twitter.com/yaseen" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                    <span className="sr-only">Twitter</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-twitter"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  </Link>
                  <Link href="https://instagram.com/yaseenapp" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                    <span className="sr-only">Instagram</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-instagram"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </Link>
                  <Link href="https://youtube.com/@yaseenislam" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                    <span className="sr-only">YouTube</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-youtube"
                    >
                      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                      <path d="m10 15 5-3-5-3z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
} 