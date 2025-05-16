import './globals.css'
import './dark-mode.css'
import '@fontsource/amiri-quran'
import '@fontsource/noto-naskh-arabic'
import '@fontsource/scheherazade-new'
import '../styles/themes.css'
import '../styles/arabic-text.css'
import { ThemeProvider } from "@/components/theme-provider"
import Link from "next/link"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export const metadata = {
  title: 'Yaseen',
  description: 'Find peace through prayer with Yaseen - your spiritual companion for Islamic prayer and meditation',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
          {/* Header */}
          <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
              <div className="flex items-center gap-6">
                <Link href="/" className="flex items-center gap-2">
                  <div className="relative h-8 w-8">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-duson-yellow" />
                    </div>
                    <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-dashed border-duson-yellow opacity-75"></div>
                  </div>
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-duson-yellow to-duson-crimson">
                    Yaseen
                  </span>
                </Link>
                <nav className="hidden md:flex gap-6">
                  <Link href="/prayer" className="text-sm font-medium transition-colors hover:text-duson-yellow">
                    How to Pray
                  </Link>
                  <Link href="/quran" className="text-sm font-medium transition-colors hover:text-duson-yellow">
                    Quran
                  </Link>
                  <Link href="/hadith" className="text-sm font-medium transition-colors hover:text-duson-yellow">
                    Hadiths
                  </Link>
                  <Link href="/prophet-stories" className="text-sm font-medium transition-colors hover:text-duson-yellow">
                    Prophet Stories
                  </Link>
                  <Link href="/chat" className="text-sm font-medium transition-colors hover:text-duson-yellow">
                    Chat with Yaseen
                  </Link>
                </nav>
              </div>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <div className="hidden sm:flex gap-2">
                  <Link href="/login" passHref legacyBehavior>
                    <Button variant="outline" size="sm" as="a">
                      Login
                    </Button>
                  </Link>
                  <Link href="/try-free" passHref legacyBehavior>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-duson-yellow to-duson-crimson hover:from-duson-crimson hover:to-duson-yellow text-duson-ebony dark:text-duson-ebony"
                      as="a"
                    >
                      Try Free
                    </Button>
                  </Link>
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
                      <Link href="/quran" className="text-muted-foreground hover:text-foreground">
                        Quran
                      </Link>
                    </li>
                    <li>
                      <Link href="/hadith" className="text-muted-foreground hover:text-foreground">
                        Hadiths
                      </Link>
                    </li>
                    <li>
                      <Link href="/prayer" className="text-muted-foreground hover:text-foreground">
                        How to Pray
                      </Link>
                    </li>
                    <li>
                      <Link href="/prophet-stories" className="text-muted-foreground hover:text-foreground">
                        Prophet Stories
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