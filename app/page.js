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
      <section className="relative overflow-hidden py-20 md:py-32">
        <HeroParticles />
        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                <span className="text-duson-ebony dark:text-duson-cream">Alhamdulilah </span>
                <span className="text-duson-crimson dark:text-duson-crimson">
                  For Islam
                </span>
              </h1>
              <p className="max-w-[600px] text-duson-ebony/80 dark:text-duson-cream/80 md:text-xl">
              Seeking knowledge is an obligation upon every Muslim. 
              <br />
              <span className="text-sm">Sunan Ibn Mājah 224</span>
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-duson-yellow to-duson-crimson opacity-30 blur-xl"></div>
              <div className="relative aspect-square overflow-hidden rounded-3xl border bg-duson-cream dark:bg-duson-ebony p-1 shadow-xl">
                <InteractiveCalligraphy />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Reflection */}
      <section className="py-12 bg-gradient-to-r from-duson-yellow/5 to-duson-crimson/5">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <DailyQuote />
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 bg-gradient-to-r from-duson-yellow/5 to-duson-crimson/5">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-duson-ebony dark:text-duson-cream">Explore Our Resources</h2>
            <p className="mt-2 text-duson-ebony/70 dark:text-duson-cream/70">
              Discover a wealth of knowledge to enrich your spiritual journey
            </p>
          </div>
          <Tabs defaultValue="featured" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-duson-cream/60 dark:bg-duson-ebony/60 backdrop-blur">
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="quran">Quran</TabsTrigger>
                <TabsTrigger value="hadith">Hadith</TabsTrigger>
                <TabsTrigger value="stories">Stories</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="featured" className="space-y-4">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <ResourceCard
                  title="Daily Hadith"
                  image="/images/daily-hadith.svg"
                  description="Wisdom from the Prophet Muhammad (PBUH)"
                  icon={<MessageCircle className="h-5 w-5" />}
                />
                <ResourceCard
                  title="Prophet Stories"
                  image="/images/prophet-stories.svg"
                  description="Inspiring stories from Islamic history"
                  icon={<BookOpen className="h-5 w-5" />}
                />
                <ResourceCard
                  title="Quran Explorer"
                  href="/quran/1"
                  image="/images/quran-explorer.svg"
                  description="Interactive Quran with translations"
                  icon={<Volume2 className="h-5 w-5" />}
                />
              </div>
            </TabsContent>
            <TabsContent value="quran" className="space-y-4">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="overflow-hidden group hover:shadow-lg transition-all duration-300 bg-duson-cream dark:bg-duson-ebony">
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=200&width=400&text=Surah+${i}`}
                        alt={`Surah ${i}`}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        width={400}
                        height={200}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <Button variant="accent" size="sm" className="gap-1">
                          <Play className="h-4 w-4" /> Listen
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-duson-ebony dark:text-duson-cream">
                        Surah Al-{["Fatiha", "Baqarah", "Imran", "Nisa", "Maida", "Anam"][i - 1]}
                      </h3>
                      <p className="text-sm text-duson-ebony/70 dark:text-duson-cream/70">Chapter {i}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="hadith" className="space-y-4">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-duson-cream dark:bg-duson-ebony">
                    <CardContent className="p-6">
                      <div className="mb-4 flex justify-between">
                        <Badge variant="crimsonOutline">Sahih Bukhari</Badge>
                        <span className="text-xs text-duson-ebony/70 dark:text-duson-cream/70">Hadith #{i}</span>
                      </div>
                      <p className="italic mb-4 text-duson-ebony dark:text-duson-cream">
                        "The example of guidance and knowledge with which Allah has sent me is like abundant rain
                        falling on the earth..."
                      </p>
                      <p className="text-sm text-duson-ebony/70 dark:text-duson-cream/70">Narrated by Abu Musa</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="stories" className="space-y-4">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {["Ibrahim", "Musa", "Isa", "Yusuf", "Nuh", "Sulaiman"].map((prophet, i) => (
                  <Card key={i} className="overflow-hidden group hover:shadow-lg transition-all duration-300 bg-duson-cream dark:bg-duson-ebony">
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=200&width=400&text=Prophet+${prophet}`}
                        alt={`Prophet ${prophet}`}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        width={400}
                        height={200}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <Button variant="accent" size="sm">
                          Read Story
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-duson-ebony dark:text-duson-cream">The Story of Prophet {prophet}</h3>
                      <p className="text-sm text-duson-ebony/70 dark:text-duson-cream/70">
                        Lessons and wisdom from the life of Prophet {prophet}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <Badge variant="yellowOutline" className="px-3 py-1.5">
                Community
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-duson-ebony dark:text-duson-cream">Join Our Growing Community</h2>
              <p className="text-duson-ebony/70 dark:text-duson-cream/70">
                Connect with fellow Muslims, share insights, and grow together in faith. Our AI-powered chat assistant
                Yaseen is available 24/7 to answer your questions.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/chat" passHref legacyBehavior>
                  <Button variant="crimson" as="a">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chat with Yaseen
                  </Button>
                </Link>
                <Link href="/community" passHref legacyBehavior>
                  <Button variant="outline" className="border-duson-yellow text-duson-ebony dark:text-duson-cream" as="a">Join Community</Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-duson-yellow to-duson-crimson opacity-30 blur-xl"></div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border bg-duson-cream dark:bg-duson-ebony p-1 shadow-xl">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=Community"
                  alt="Community"
                  className="rounded-[calc(1.5rem-4px)] object-cover"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-duson-yellow/10 to-duson-crimson/10">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              <span className="text-duson-ebony dark:text-duson-cream">Begin Your </span>
              <span className="text-duson-crimson dark:text-duson-crimson">Spiritual Journey Today</span>
            </h2>
            <p className="mt-4 mb-8 text-duson-ebony/70 dark:text-duson-cream/70">
              Join thousands of Muslims who are deepening their connection with Allah through our interactive
              platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/try-free" passHref legacyBehavior>
                <Button
                  size="lg"
                  variant="crimson"
                  as="a"
                >
                  Try Free for 7 Days
                </Button>
              </Link>
              <Link href="/about" passHref legacyBehavior>
                <Button size="lg" variant="outline" className="border-duson-yellow text-duson-ebony dark:text-duson-cream" as="a">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}