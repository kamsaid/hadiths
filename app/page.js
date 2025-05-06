import { HeroSection } from "@/components/home/hero-section";
import { DailyQuote } from "@/components/home/daily-quote";
import { FeaturedContent } from "@/components/home/featured-content";
import { PrayerCampaign } from "@/components/home/prayer-campaign";
import { ValueProposition } from "@/components/home/value-proposition";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <DailyQuote 
        quote="Verily, with hardship comes ease."
        source="Quran 94:6"
      />
      <FeaturedContent />
      <PrayerCampaign 
        title="Ramadan Prayer Challenge"
        participants={97783}
        timeLeft="4 hours"
        status="upcoming"
        imageSrc="/images/ramadan-prayer.jpg"
        href="/campaigns/ramadan"
      />
      <ValueProposition />
    </main>
  );
} 