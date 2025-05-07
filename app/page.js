import Hero from "@/components/ui/Hero";
import FeaturedCarousel from "@/components/ui/FeaturedCarousel";
import ProphetStoriesSection from "@/components/ProphetStoriesSection";
import ProgressCard from "@/components/ui/ProgressCard";

export default function HomePage() {
  return (
    <main className="space-y-24">
      <Hero />
      <FeaturedCarousel />
      <ProphetStoriesSection />
      <ProgressCard />
    </main>
  );
}