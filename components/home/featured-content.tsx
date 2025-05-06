import { ContentCard } from "@/components/ui/content-card";

const featuredContent = [
  {
    title: "How to Pray (Hanbali School)",
    description: "Comprehensive step-by-step prayer guide following the Hanbali madhhab",
    category: "Prayer Guide",
    duration: "5 min",
    author: "Islamic Scholars",
    imageSrc: "/images/prayer-guide.jpg",
    href: "/prayer",
    isNew: true,
  },
  {
    title: "Browse the Noble Quran",
    description: "Read the Holy Quran with verses and translations",
    category: "Quran Study",
    duration: "Ongoing",
    author: "Quran Repository",
    imageSrc: "/images/quran-study.jpg",
    href: "/quran",
    isNew: true,
  },
  {
    title: "Meditation for Muslims",
    description: "Finding inner peace through Islamic meditation practices",
    category: "Wellness",
    duration: "8 min",
    author: "Imam Kareem",
    imageSrc: "/images/meditation.jpg",
    href: "/practices/meditation",
  },
  {
    title: "Stories of the Prophets: Yusuf (AS)",
    description: "Lessons from the life of Prophet Yusuf",
    category: "Stories",
    duration: "20 min",
    author: "Mufti Ismail",
    imageSrc: "/images/prophets-stories.jpg",
    href: "/stories/yusuf",
  },
];

export function FeaturedContent() {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Featured</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredContent.map((item) => (
            <ContentCard
              key={item.title}
              title={item.title}
              description={item.description}
              category={item.category}
              duration={item.duration}
              author={item.author}
              imageSrc={item.imageSrc}
              href={item.href}
              isNew={item.isNew}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 