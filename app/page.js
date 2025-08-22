import Image from "next/image"
import Link from "next/link"
import { BookOpen, MessageCircle, Play, Volume2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import HeroParticles from "@/components/hero-particles"
import DailyQuote from "@/components/daily-quote"
import ResourceCard from "@/components/resource-card"
import InteractiveCalligraphy from "@/components/interactive-calligraphy"

/**
 * Home page component featuring a modern Islamic educational platform
 * Includes hero section, prayer timeline, resources, and community sections
 */
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-duson-cream dark:bg-duson-ebony">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 min-h-screen flex items-center">
        {/* Background Layers */}
        <div className="absolute inset-0">
          {/* Primary Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-duson-cream via-duson-cream/95 to-duson-yellow/10 dark:from-duson-ebony dark:via-duson-ebony/95 dark:to-duson-crimson/10"></div>
          
          {/* Secondary Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-duson-yellow/5 to-duson-crimson/15 dark:from-transparent dark:via-duson-yellow/10 dark:to-duson-crimson/20"></div>
          
          {/* Islamic Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M30 0l30 30-30 30L0 30 30 0zm0 10L10 30l20 20 20-20L30 10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px'
          }}></div>
        </div>
        
        {/* Enhanced Particles with Multiple Layers */}
        <HeroParticles />
        
        {/* Floating Geometric Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-[10%] w-32 h-32 opacity-10 dark:opacity-20 animate-pulse">
            <div className="w-full h-full border-2 border-duson-yellow rounded-full transform rotate-45"></div>
          </div>
          <div className="absolute bottom-32 right-[15%] w-24 h-24 opacity-15 dark:opacity-25 animate-bounce">
            <div className="w-full h-full bg-gradient-to-br from-duson-crimson/20 to-duson-yellow/20 transform rotate-12 rounded-lg"></div>
          </div>
          <div className="absolute top-[40%] right-[5%] w-16 h-16 opacity-20 dark:opacity-30">
            <div className="w-full h-full border border-duson-crimson rounded-full animate-spin-slow"></div>
          </div>
        </div>
        
        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="space-y-8">
              {/* Enhanced Typography with Depth */}
              <div className="space-y-4">
                <div className="relative">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl relative z-10">
                    {/* 
                      Replaced the two-line heading with a single-line Arabic basmala.
                      This fits on one line and uses appropriate Tailwind classes for style and accessibility.
                    */}
                    <span 
                      // Arabic Basmala with elegant glow, shadow, and improved readability
                      className="block text-center text-duson-cream dark:text-duson-yellow font-arabic text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-[0_2px_16px_rgba(253,31,74,0.25)] relative z-20"
                      aria-label="Bismillah ir-Rahman ir-Rahim"
                    >
                      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </span>
                  </h1>
                  {/* Soft golden glow and subtle shadow for depth */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                    <span className="block text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-duson-yellow/80 opacity-60 blur-md drop-shadow-[0_4px_32px_rgba(253,31,74,0.25)]">
                      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </span>
                  </div>
                </div>
                
                {/* Quote with modern accent bar and improved typography */}
                <div className="relative max-w-[600px] mt-4 pl-8">
                  {/* Decorative vertical accent bar with dual color */}
                  <div className="absolute left-0 top-2 h-14 w-1.5 rounded-full bg-gradient-to-b from-duson-yellow via-duson-yellow/80 to-duson-crimson shadow-lg"></div>
                  <blockquote className="text-base md:text-lg text-duson-cream dark:text-duson-yellow/90 font-medium leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.10)]">
                    “Seeking knowledge is an obligation upon every Muslim.”
                  </blockquote>
                  <cite className="block mt-2 text-sm italic text-duson-yellow dark:text-duson-yellow/90 font-semibold tracking-wide">
                    — <span className="font-arabic">Sunan Ibn Mājah 224</span>
                  </cite>
                  {/* Decorative Quote Accent */}
                  <div className="absolute -left-4 top-0 w-1 h-16 bg-gradient-to-b from-duson-yellow to-duson-crimson rounded-full"></div>
                </div>
              </div>
              
              {/* Enhanced CTA Buttons with Better Styling */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/quran" passHref legacyBehavior>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-duson-crimson to-duson-crimson/90 hover:from-duson-crimson/90 hover:to-duson-crimson text-duson-cream shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                    as="a"
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Explore Quran
                  </Button>
                </Link>
                <Link href="/hadith" passHref legacyBehavior>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-2 border-duson-yellow text-duson-ebony dark:text-duson-cream hover:bg-duson-yellow/10 dark:hover:bg-duson-yellow/20 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-sm"
                    as="a"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Daily Hadith
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Enhanced Interactive Element with More Depth */}
            <div className="relative">
              {/* Enhanced Glow Effects */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-duson-yellow via-duson-crimson to-duson-yellow opacity-20 dark:opacity-30 blur-2xl animate-pulse"></div>
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-duson-yellow to-duson-crimson opacity-40 dark:opacity-50 blur-xl"></div>
              
              {/* Main Interactive Container */}
              <div className="relative aspect-square overflow-hidden rounded-3xl border-2 border-duson-yellow/30 dark:border-duson-yellow/50 bg-duson-cream/90 dark:bg-duson-ebony/90 backdrop-blur-sm shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
                {/* Inner Border Accent */}
                <div className="absolute inset-2 rounded-2xl border border-duson-crimson/20 dark:border-duson-crimson/30"></div>
                <InteractiveCalligraphy />
              </div>
              
              {/* Floating Accent Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-duson-yellow to-duson-crimson rounded-full opacity-60 animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-duson-crimson to-duson-yellow rounded-full opacity-50 animate-pulse"></div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center space-y-2 text-duson-ebony/60 dark:text-duson-cream/60">
            <span className="text-xs font-medium tracking-wide uppercase">Scroll to Explore</span>
            <div className="w-6 h-10 border-2 border-duson-yellow/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-duson-crimson rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Reflection - Enhanced */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        {/* Enhanced Background with Multiple Gradients */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-duson-cream via-duson-yellow/3 to-duson-crimson/5 dark:from-duson-ebony dark:via-duson-yellow/5 dark:to-duson-crimson/8"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-duson-yellow/2 to-duson-crimson/3 dark:via-duson-yellow/4 dark:to-duson-crimson/6"></div>
          
          {/* Geometric Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.8'%3E%3Cpath d='M20 0l20 20-20 20L0 20 20 0zm0 5L5 20l15 15 15-15L20 5z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }}></div>
        </div>
        
        {/* Floating Accent Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-[8%] w-20 h-20 opacity-10 dark:opacity-15">
            <div className="w-full h-full border border-duson-yellow rounded-full animate-pulse"></div>
          </div>
          <div className="absolute bottom-10 right-[12%] w-16 h-16 opacity-15 dark:opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-duson-crimson/10 to-duson-yellow/10 rounded-lg transform rotate-45 animate-spin-slow"></div>
          </div>
        </div>
        
        <div className="container relative z-10 px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            {/* Section Header */}
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 border-duson-yellow text-duson-ebony dark:text-duson-cream bg-duson-yellow/5 dark:bg-duson-yellow/10">
                <Sparkles className="w-4 h-4 mr-2" />
                Daily Inspiration
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-duson-ebony dark:text-duson-cream mb-2">
                Wisdom for Today
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-duson-yellow to-duson-crimson rounded-full mx-auto"></div>
            </div>
            
            {/* Enhanced Quote Container */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-duson-yellow/10 via-duson-crimson/5 to-duson-yellow/10 dark:from-duson-yellow/20 dark:via-duson-crimson/10 dark:to-duson-yellow/20 rounded-2xl blur-xl"></div>
              <div className="relative">
                <DailyQuote />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section - Enhanced */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        {/* Enhanced Background System */}
        <div className="absolute inset-0">
          {/* Primary Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-duson-cream via-duson-cream/98 to-duson-yellow/8 dark:from-duson-ebony dark:via-duson-ebony/98 dark:to-duson-crimson/12"></div>
          
          {/* Secondary Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-duson-yellow/3 via-transparent to-duson-crimson/6 dark:from-duson-yellow/6 dark:via-transparent dark:to-duson-crimson/10"></div>
          
          {/* Radial Gradients for Depth */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-duson-yellow/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-radial from-duson-crimson/5 to-transparent rounded-full blur-3xl"></div>
          
          {/* Islamic Geometric Pattern */}
          <div className="absolute inset-0 opacity-[0.008] dark:opacity-[0.012]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000000' stroke-width='1'%3E%3Ccircle cx='50' cy='50' r='20'/%3E%3Cpolygon points='50,10 80,25 80,75 50,90 20,75 20,25' stroke='%23000000' fill='none'/%3E%3Cpath d='M50,30 L70,40 L70,60 L50,70 L30,60 L30,40 Z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px'
          }}></div>
        </div>
        
        {/* Floating Geometric Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-[5%] w-32 h-32 opacity-5 dark:opacity-10 animate-pulse">
            <div className="w-full h-full">
              <svg viewBox="0 0 100 100" className="w-full h-full text-duson-yellow">
                <polygon points="50,10 80,30 80,70 50,90 20,70 20,30" fill="currentColor" opacity="0.3"/>
                <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
          </div>
          <div className="absolute bottom-32 right-[8%] w-24 h-24 opacity-8 dark:opacity-15 animate-spin-slow">
            <div className="w-full h-full text-duson-crimson">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon points="50,5 75,25 75,75 50,95 25,75 25,25" fill="none" stroke="currentColor" strokeWidth="2"/>
                <polygon points="50,20 65,35 65,65 50,80 35,65 35,35" fill="currentColor" opacity="0.2"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="container relative z-10 px-4 md:px-6">
          {/* Enhanced Section Header */}
          <div className="mb-16 text-center">
            <div className="space-y-4">
              <Badge variant="outline" className="border-duson-crimson text-duson-ebony dark:text-duson-cream bg-duson-crimson/5 dark:bg-duson-crimson/10 mb-4">
                <BookOpen className="w-4 h-4 mr-2" />
                Islamic Knowledge
              </Badge>
              
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl text-duson-ebony dark:text-duson-cream">
                  Explore Our 
                  <span className="bg-gradient-to-r from-duson-crimson to-duson-yellow bg-clip-text text-transparent"> Resources</span>
                </h2>
                <div className="w-32 h-1 bg-gradient-to-r from-duson-yellow via-duson-crimson to-duson-yellow rounded-full mx-auto"></div>
              </div>
              
              <p className="mt-4 text-lg text-duson-ebony/70 dark:text-duson-cream/70 max-w-2xl mx-auto leading-relaxed">
                Discover a wealth of knowledge to enrich your spiritual journey and deepen your connection with Allah
              </p>
            </div>
          </div>
          {/* Enhanced Tabs with Glassmorphism */}
          <Tabs defaultValue="featured" className="w-full">
            <div className="flex justify-center mb-12">
              <div className="relative">
                {/* Glow Effect Behind Tabs */}
                <div className="absolute -inset-2 bg-gradient-to-r from-duson-yellow/20 via-duson-crimson/10 to-duson-yellow/20 rounded-xl blur-lg"></div>
                <TabsList className="relative bg-duson-cream/80 dark:bg-duson-ebony/80 backdrop-blur-md border border-duson-yellow/20 dark:border-duson-yellow/30 shadow-lg">
                  <TabsTrigger 
                    value="featured" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-duson-yellow data-[state=active]:to-duson-crimson data-[state=active]:text-duson-cream transition-all duration-300 font-medium"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Featured
                  </TabsTrigger>
                  <TabsTrigger 
                    value="quran"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-duson-yellow data-[state=active]:to-duson-crimson data-[state=active]:text-duson-cream transition-all duration-300 font-medium"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Quran
                  </TabsTrigger>
                  <TabsTrigger 
                    value="hadith"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-duson-yellow data-[state=active]:to-duson-crimson data-[state=active]:text-duson-cream transition-all duration-300 font-medium"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Hadith
                  </TabsTrigger>
                  <TabsTrigger 
                    value="stories"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-duson-yellow data-[state=active]:to-duson-crimson data-[state=active]:text-duson-cream transition-all duration-300 font-medium"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Stories
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            <TabsContent value="featured" className="space-y-4">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {/* Enhanced Resource Cards */}
                <Link href="/hadith" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-duson-cream to-duson-cream/90 dark:from-duson-ebony dark:to-duson-ebony/90 border border-duson-yellow/20 dark:border-duson-yellow/30 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 block">
                  <div className="absolute inset-0 bg-gradient-to-br from-duson-yellow/5 to-duson-crimson/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-gradient-to-br from-duson-yellow to-duson-crimson rounded-xl text-duson-cream shadow-lg">
                        <MessageCircle className="h-6 w-6" />
                      </div>
                      <Badge variant="outline" className="border-duson-crimson text-duson-crimson bg-duson-crimson/5">
                        Daily
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold text-duson-ebony dark:text-duson-cream mb-2 group-hover:text-duson-crimson dark:group-hover:text-duson-yellow transition-colors duration-300">
                      Daily Hadith
                    </h3>
                    <p className="text-duson-ebony/70 dark:text-duson-cream/70 text-sm leading-relaxed">
                      Wisdom from the Prophet Muhammad (PBUH) to guide your daily life
                    </p>
                    <div className="mt-4 flex items-center text-duson-crimson dark:text-duson-yellow text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      Explore <span className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </div>
                  </div>
                </Link>
                
                <Link href="/prophet-stories" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-duson-cream to-duson-cream/90 dark:from-duson-ebony dark:to-duson-ebony/90 border border-duson-yellow/20 dark:border-duson-yellow/30 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 block">
                  <div className="absolute inset-0 bg-gradient-to-br from-duson-crimson/5 to-duson-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-gradient-to-br from-duson-crimson to-duson-yellow rounded-xl text-duson-cream shadow-lg">
                        <BookOpen className="h-6 w-6" />
                      </div>
                      <Badge variant="outline" className="border-duson-yellow text-duson-yellow bg-duson-yellow/5">
                        Stories
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold text-duson-ebony dark:text-duson-cream mb-2 group-hover:text-duson-crimson dark:group-hover:text-duson-yellow transition-colors duration-300">
                      Prophet Stories
                    </h3>
                    <p className="text-duson-ebony/70 dark:text-duson-cream/70 text-sm leading-relaxed">
                      Inspiring stories from Islamic history and prophetic teachings
                    </p>
                    <div className="mt-4 flex items-center text-duson-crimson dark:text-duson-yellow text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      Read Stories <span className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </div>
                  </div>
                </Link>
                
                <Link href="/quran" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-duson-cream to-duson-cream/90 dark:from-duson-ebony dark:to-duson-ebony/90 border border-duson-yellow/20 dark:border-duson-yellow/30 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 block">
                  <div className="absolute inset-0 bg-gradient-to-br from-duson-yellow/5 to-duson-crimson/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-gradient-to-br from-duson-yellow to-duson-crimson rounded-xl text-duson-cream shadow-lg">
                        <Volume2 className="h-6 w-6" />
                      </div>
                      <Badge variant="outline" className="border-duson-crimson text-duson-crimson bg-duson-crimson/5">
                        Interactive
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold text-duson-ebony dark:text-duson-cream mb-2 group-hover:text-duson-crimson dark:group-hover:text-duson-yellow transition-colors duration-300">
                      Quran Explorer
                    </h3>
                    <p className="text-duson-ebony/70 dark:text-duson-cream/70 text-sm leading-relaxed">
                      Interactive Quran with translations
                    </p>
                    <div className="mt-4 flex items-center text-duson-crimson dark:text-duson-yellow text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      Start Reading <span className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </div>
                  </div>
                </Link>
              </div>
            </TabsContent>
            <TabsContent value="quran" className="space-y-4">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-duson-cream to-duson-cream/95 dark:from-duson-ebony dark:to-duson-ebony/95 border border-duson-yellow/20 dark:border-duson-yellow/30">
                    <div className="aspect-video relative overflow-hidden">
                      {/* Enhanced Gradient Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-duson-yellow/20 via-duson-crimson/10 to-duson-yellow/15 dark:from-duson-yellow/30 dark:via-duson-crimson/20 dark:to-duson-yellow/25"></div>
                      
                      {/* Islamic Pattern Overlay */}
                      <div className="absolute inset-0 opacity-10 dark:opacity-20" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M10 0l10 10-10 10L0 10 10 0z'/%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '40px 40px'
                      }}></div>
                      
                      {/* Enhanced Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-duson-ebony/80 via-duson-ebony/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                        <div className="space-y-3 w-full">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-duson-cream/90 border-duson-yellow text-duson-ebony hover:bg-duson-yellow hover:text-duson-cream transition-all duration-300 backdrop-blur-sm"
                          >
                            <Play className="h-4 w-4 mr-2" /> Listen
                          </Button>
                          <Button 
                            size="sm" 
                            className="w-full bg-gradient-to-r from-duson-crimson to-duson-yellow text-duson-cream hover:from-duson-crimson/90 hover:to-duson-yellow/90 transition-all duration-300"
                          >
                            Read Chapter
                          </Button>
                        </div>
                      </div>
                      
                      {/* Arabic Text Display */}
                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        <div className="text-center">
                          <div className="text-2xl md:text-3xl font-arabic text-duson-ebony dark:text-duson-cream mb-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                            سورة
                          </div>
                          <div className="w-12 h-0.5 bg-gradient-to-r from-duson-yellow to-duson-crimson mx-auto"></div>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg text-duson-ebony dark:text-duson-cream group-hover:text-duson-crimson dark:group-hover:text-duson-yellow transition-colors duration-300">
                          Surah Al-{["Fatiha", "Baqarah", "Imran", "Nisa", "Maida", "Anam"][i - 1]}
                        </h3>
                        <Badge variant="outline" className="border-duson-yellow text-duson-yellow bg-duson-yellow/5">
                          {i}
                        </Badge>
                      </div>
                      <p className="text-sm text-duson-ebony/70 dark:text-duson-cream/70">
                        Chapter {i} • {["7", "286", "200", "176", "120", "165"][i - 1]} verses
                      </p>
                      <div className="flex items-center space-x-2 pt-2">
                        <div className="flex-1 h-1 bg-duson-yellow/20 rounded-full">
                          <div className="h-full bg-gradient-to-r from-duson-yellow to-duson-crimson rounded-full" style={{width: `${Math.random() * 60 + 20}%`}}></div>
                        </div>
                        <span className="text-xs text-duson-ebony/60 dark:text-duson-cream/60">Progress</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="hadith" className="space-y-4">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 bg-gradient-to-br from-duson-cream to-duson-cream/95 dark:from-duson-ebony dark:to-duson-ebony/95 border border-duson-crimson/20 dark:border-duson-crimson/30">
                    <CardContent className="p-8 relative">
                      {/* Background Pattern */}
                      <div className="absolute top-0 right-0 w-24 h-24 opacity-5 dark:opacity-10">
                        <div className="w-full h-full text-duson-crimson">
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="50" cy="50" r="15" fill="currentColor" opacity="0.3"/>
                          </svg>
                        </div>
                      </div>
                      
                      {/* Header */}
                      <div className="mb-6 flex items-center justify-between relative z-10">
                        <Badge variant="outline" className="border-duson-crimson text-duson-crimson bg-duson-crimson/5 px-3 py-1">
                          Sahih Bukhari
                        </Badge>
                        <div className="text-right">
                          <span className="text-xs text-duson-ebony/60 dark:text-duson-cream/60">Hadith</span>
                          <div className="text-lg font-bold text-duson-crimson">#{i}</div>
                        </div>
                      </div>
                      
                      {/* Quote */}
                      <blockquote className="relative mb-6 group-hover:text-duson-ebony dark:group-hover:text-duson-cream transition-colors duration-300">
                        <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-duson-crimson to-duson-yellow rounded-full"></div>
                        <p className="italic text-duson-ebony/90 dark:text-duson-cream/90 text-lg leading-relaxed pl-4">
                          “{[
                            "The example of guidance and knowledge with which Allah has sent me is like abundant rain falling on the earth...",
                            "None of you truly believes until he wishes for his brother what he wishes for himself.",
                            "The strong person is not the one who can wrestle someone else down. The strong person is the one who can control himself when he is angry.",
                            "Kindness is a mark of faith, and whoever has not kindness has not faith."
                          ][i - 1]}”
                        </p>
                      </blockquote>
                      
                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-duson-yellow/20 dark:border-duson-yellow/30">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-duson-ebony dark:text-duson-cream">
                            Narrated by {["Abu Musa", "Anas", "Abu Hurairah", "Abdullah ibn Amr"][i - 1]}
                          </p>
                          <p className="text-xs text-duson-ebony/60 dark:text-duson-cream/60">
                            Collection: Sahih Bukhari
                          </p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                          <Button variant="ghost" size="sm" className="text-duson-crimson hover:text-duson-cream hover:bg-duson-crimson">
                            Read More →
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="stories" className="space-y-4">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {["Ibrahim", "Musa", "Isa", "Yusuf", "Nuh", "Sulaiman"].map((prophet, i) => (
                  <Card key={i} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-duson-cream to-duson-cream/95 dark:from-duson-ebony dark:to-duson-ebony/95 border border-duson-yellow/20 dark:border-duson-yellow/30">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      {/* Enhanced Background with Islamic Patterns */}
                      <div className="absolute inset-0 bg-gradient-to-br from-duson-yellow/20 via-duson-crimson/15 to-duson-yellow/25 dark:from-duson-yellow/30 dark:via-duson-crimson/25 dark:to-duson-yellow/35"></div>
                      
                      {/* Geometric Pattern */}
                      <div className="absolute inset-0 opacity-10 dark:opacity-20" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.6'%3E%3Cpolygon points='15,2 26,8 26,22 15,28 4,22 4,8'/%3E%3Cpolygon points='15,8 20,11 20,19 15,22 10,19 10,11' fill='none' stroke='%23000000' stroke-width='1'/%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px'
                      }}></div>
                      
                      {/* Prophet Name in Arabic Calligraphy Style */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center space-y-2">
                          <div className="text-3xl md:text-4xl font-arabic text-duson-ebony dark:text-duson-cream opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                            {{
                              "Ibrahim": "إبراهيم",
                              "Musa": "موسى",
                              "Isa": "عيسى",
                              "Yusuf": "يوسف",
                              "Nuh": "نوح",
                              "Sulaiman": "سليمان"
                            }[prophet]}
                          </div>
                          <div className="w-16 h-0.5 bg-gradient-to-r from-duson-yellow to-duson-crimson mx-auto rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* Enhanced Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-duson-ebony/90 via-duson-ebony/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                        <div className="space-y-3 w-full">
                          <div className="text-duson-cream text-sm opacity-90">
                            “Lesson from Prophet {prophet}”
                          </div>
                          <Button 
                            className="w-full bg-gradient-to-r from-duson-yellow to-duson-crimson text-duson-ebony hover:from-duson-yellow/90 hover:to-duson-crimson/90 transition-all duration-300 font-medium"
                            size="sm"
                          >
                            <BookOpen className="h-4 w-4 mr-2" />
                            Read Story
                          </Button>
                        </div>
                      </div>
                      
                      {/* Decorative Corner Element */}
                      <div className="absolute top-4 right-4 w-8 h-8 opacity-20 dark:opacity-30">
                        <div className="w-full h-full text-duson-crimson">
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            <polygon points="50,10 90,50 50,90 10,50" fill="currentColor"/>
                            <circle cx="50" cy="50" r="15" fill="white" fillOpacity="0.3"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-6 space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-bold text-lg text-duson-ebony dark:text-duson-cream group-hover:text-duson-crimson dark:group-hover:text-duson-yellow transition-colors duration-300">
                          The Story of Prophet {prophet}
                        </h3>
                        <p className="text-sm text-duson-ebony/70 dark:text-duson-cream/70 leading-relaxed">
                          {{
                            "Ibrahim": "The friend of Allah and father of prophets, known for his unwavering faith and sacrifice.",
                            "Musa": "The speaker with Allah, who led his people from oppression to freedom.",
                            "Isa": "The spirit of Allah, known for his miracles and compassionate teachings.",
                            "Yusuf": "The beautiful prophet, whose story teaches patience and forgiveness.",
                            "Nuh": "The patient caller, who preached for 950 years and built the great ark.",
                            "Sulaiman": "The wise king, blessed with understanding of all creation."
                          }[prophet]}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <Badge variant="outline" className="border-duson-yellow text-duson-yellow bg-duson-yellow/5">
                          Prophet
                        </Badge>
                        <div className="flex items-center space-x-2 text-duson-crimson dark:text-duson-yellow opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                          <span className="text-sm font-medium">Explore</span>
                          <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Community Section - Enhanced */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-duson-cream via-duson-cream/98 to-duson-crimson/5 dark:from-duson-ebony dark:via-duson-ebony/98 dark:to-duson-crimson/10"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-duson-yellow/3 via-transparent to-duson-crimson/4 dark:from-duson-yellow/6 dark:via-transparent dark:to-duson-crimson/8"></div>
          
          {/* Radial Glow Effects */}
          <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-radial from-duson-yellow/8 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-radial from-duson-crimson/6 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-[10%] w-16 h-16 opacity-10 dark:opacity-20 animate-pulse">
            <div className="w-full h-full border-2 border-duson-yellow rounded-full"></div>
          </div>
          <div className="absolute bottom-20 right-[15%] w-20 h-20 opacity-15 dark:opacity-25 animate-bounce">
            <div className="w-full h-full bg-gradient-to-br from-duson-crimson/20 to-duson-yellow/20 rounded-lg transform rotate-45"></div>
          </div>
        </div>
        
        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div className="space-y-8">
              {/* Enhanced Badge */}
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="border-duson-yellow text-duson-ebony dark:text-duson-cream bg-duson-yellow/10 dark:bg-duson-yellow/20 px-4 py-2">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Community
                </Badge>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-duson-yellow rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-duson-crimson rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-duson-yellow rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
              
              {/* Enhanced Title */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl text-duson-ebony dark:text-duson-cream leading-tight">
                  Join Our 
                  <span className="bg-gradient-to-r from-duson-crimson to-duson-yellow bg-clip-text text-transparent">Growing Community</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-duson-crimson to-duson-yellow rounded-full"></div>
              </div>
              
              {/* Enhanced Description */}
              <div className="space-y-4">
                <p className="text-lg text-duson-ebony/80 dark:text-duson-cream/80 leading-relaxed">
                  Connect with fellow Muslims, share insights, and grow together in faith. Our AI-powered chat assistant
                  <span className="font-medium text-duson-crimson dark:text-duson-yellow"> Yaseen</span> is available 24/7 to answer your questions.
                </p>
                

              </div>
              
              {/* Enhanced Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/chat" passHref legacyBehavior>
                  <Button className="bg-gradient-to-r from-duson-crimson to-duson-crimson/90 hover:from-duson-crimson/90 hover:to-duson-crimson text-duson-cream shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300" size="lg" as="a">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Chat with Yaseen
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Enhanced Visual Element */}
            <div className="relative lg:order-first">
              {/* Enhanced Glow Effects */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-duson-yellow via-duson-crimson to-duson-yellow opacity-20 dark:opacity-30 blur-2xl animate-pulse"></div>
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-duson-crimson to-duson-yellow opacity-30 dark:opacity-40 blur-xl"></div>
              
              {/* Main Container */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border-2 border-duson-yellow/30 dark:border-duson-yellow/50 bg-gradient-to-br from-duson-cream/90 to-duson-cream/80 dark:from-duson-ebony/90 dark:to-duson-ebony/80 backdrop-blur-sm shadow-2xl">
                {/* Community Visualization */}
                <div className="absolute inset-0 p-8 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Central Hub */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-duson-yellow to-duson-crimson rounded-full flex items-center justify-center shadow-lg">
                      <MessageCircle className="w-8 h-8 text-duson-cream" />
                    </div>
                    
                    {/* Orbiting Elements */}
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <div 
                        key={i}
                        className="absolute w-8 h-8 bg-gradient-to-br from-duson-cream to-duson-cream/80 dark:from-duson-ebony dark:to-duson-ebony/80 border-2 border-duson-yellow rounded-full flex items-center justify-center shadow-md"
                        style={{
                          top: `${50 + 35 * Math.sin((i * 60) * Math.PI / 180)}%`,
                          left: `${50 + 35 * Math.cos((i * 60) * Math.PI / 180)}%`,
                          transform: 'translate(-50%, -50%)',
                          animationDelay: `${i * 0.2}s`
                        }}
                      >
                        <div className="w-3 h-3 bg-duson-crimson rounded-full animate-pulse"></div>
                      </div>
                    ))}
                    
                    {/* Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full opacity-20 dark:opacity-30">
                      <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FBBD0D" />
                          <stop offset="100%" stopColor="#FD1F4A" />
                        </linearGradient>
                      </defs>
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <line
                          key={i}
                          x1="50%"
                          y1="50%"
                          x2={`${50 + 35 * Math.cos((i * 60) * Math.PI / 180)}%`}
                          y2={`${50 + 35 * Math.sin((i * 60) * Math.PI / 180)}%`}
                          stroke="url(#lineGradient)"
                          strokeWidth="2"
                          className="animate-pulse"
                          style={{animationDelay: `${i * 0.3}s`}}
                        />
                      ))}
                    </svg>
                  </div>
                </div>
                
                {/* Decorative Text */}
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <div className="text-sm font-medium text-duson-ebony/60 dark:text-duson-cream/60">
                    تواصل مع المجتمع
                  </div>
                  <div className="text-xs text-duson-ebony/40 dark:text-duson-cream/40">
                    Connect with the Community
                  </div>
                </div>
              </div>
              
              {/* Floating Accent Elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-duson-yellow to-duson-crimson rounded-full opacity-60 animate-bounce"></div>
              <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-gradient-to-br from-duson-crimson to-duson-yellow rounded-full opacity-50 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        {/* Enhanced Background with Multiple Layers */}
        <div className="absolute inset-0">
          {/* Primary Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-duson-yellow/8 via-duson-crimson/6 to-duson-yellow/10 dark:from-duson-yellow/15 dark:via-duson-crimson/12 dark:to-duson-yellow/18"></div>
          
          {/* Secondary Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-duson-cream via-duson-cream/95 to-duson-crimson/5 dark:from-duson-ebony dark:via-duson-ebony/95 dark:to-duson-crimson/10"></div>
          
          {/* Radial Glow Effects */}
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-radial from-duson-yellow/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-gradient-radial from-duson-crimson/8 to-transparent rounded-full blur-3xl"></div>
          
          {/* Islamic Geometric Pattern */}
          <div className="absolute inset-0 opacity-[0.01] dark:opacity-[0.02]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000000' stroke-width='1'%3E%3Cpath d='M40,0 L80,40 L40,80 L0,40 Z'/%3E%3Cpath d='M40,20 L60,40 L40,60 L20,40 Z'/%3E%3Ccircle cx='40' cy='40' r='10'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '160px 160px'
          }}></div>
        </div>
        
        {/* Floating Geometric Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 left-[8%] w-24 h-24 opacity-8 dark:opacity-15 animate-pulse">
            <div className="w-full h-full text-duson-yellow">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="50" cy="50" r="15" fill="currentColor" opacity="0.2"/>
              </svg>
            </div>
          </div>
          <div className="absolute bottom-16 right-[10%] w-20 h-20 opacity-10 dark:opacity-20 animate-spin-slow">
            <div className="w-full h-full text-duson-crimson">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="currentColor" opacity="0.3"/>
                <polygon points="50,20 70,35 70,65 50,80 30,65 30,35" fill="none" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
          </div>
          <div className="absolute top-1/2 left-[5%] w-16 h-16 opacity-12 dark:opacity-25 animate-bounce">
            <div className="w-full h-full border-2 border-duson-crimson rounded-full"></div>
          </div>
        </div>
        
        <div className="container relative z-10 px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            {/* Enhanced Section Header */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="flex justify-center">
                <Badge variant="outline" className="border-duson-crimson text-duson-ebony dark:text-duson-cream bg-duson-crimson/5 dark:bg-duson-crimson/10 px-4 py-2">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Start Your Journey
                </Badge>
              </div>
              
              {/* Enhanced Title */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl leading-tight">
                  <span className="text-duson-ebony dark:text-duson-cream">Begin Your </span>
                  <span className="bg-gradient-to-r from-duson-crimson via-duson-yellow to-duson-crimson bg-clip-text text-transparent">Spiritual Journey</span>
                  <span className="text-duson-ebony dark:text-duson-cream"> Today</span>
                </h2>
                <div className="w-32 h-1 bg-gradient-to-r from-duson-crimson via-duson-yellow to-duson-crimson rounded-full mx-auto"></div>
              </div>
              
              {/* Enhanced Description */}
              <p className="text-lg md:text-xl text-duson-ebony/80 dark:text-duson-cream/80 leading-relaxed max-w-2xl mx-auto">
                Join thousands of Muslims who are deepening their connection with Allah through our interactive
                platform. Experience the beauty of Islam with modern technology.
              </p>
              

            </div>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-6 pt-8">
              {/* CTA buttons section - keeping the container for potential future buttons */}
            </div>
            
            {/* Trust Indicators */}
            <div className="pt-12">
              <div className="text-xs text-duson-ebony/50 dark:text-duson-cream/50 mb-4">Trusted by Muslims worldwide</div>
              <div className="flex justify-center items-center space-x-8 opacity-60">
                <div className="text-duson-ebony/40 dark:text-duson-cream/40 text-xs font-medium">✓ 100% Free</div>
                <div className="text-duson-ebony/40 dark:text-duson-cream/40 text-xs font-medium">✓ No Ads</div>
                <div className="text-duson-ebony/40 dark:text-duson-cream/40 text-xs font-medium">✓ Authentic Sources</div>
                <div className="text-duson-ebony/40 dark:text-duson-cream/40 text-xs font-medium">✓ Community Verified</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}