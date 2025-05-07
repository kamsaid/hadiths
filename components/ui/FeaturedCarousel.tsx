"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Featured sections with Kaaba image
const featured = [
  { title: "How to Pray", image: "/images/prayer-mat.png", href: "/how-to-pray" },
  { title: "Daily Hadith", image: "/images/kaaba-prayer.png", href: "/hadith" },
  { title: "Prophet Stories", image: "/images/kaaba-prayer.png", href: "/prophet-stories" },
  { title: "Quran Explorer", image: "/images/kaaba-prayer.png", href: "/quran" },
];

export default function FeaturedCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hover, setHover] = useState(false);

  // Auto-advance carousel when not hovering
  useEffect(() => {
    if (hover) return;
    
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % featured.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [hover]);

  return (
    <div className="mt-16 mb-16 py-4 max-w-6xl mx-auto px-4 sm:px-6" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <h2 className="text-2xl font-bold text-center mb-6 text-yellow-500">Explore Our Resources</h2>
      
      {/* Grid layout for all 4 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {featured.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="relative block h-40 rounded-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-lg"
          >
            {item.image.includes('prayer-mat') ? (
              // Special handling for prayer-mat image
              <div className="absolute inset-0 bg-black">
                <Image 
                  src={item.image} 
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain mx-auto px-4"
                  priority={i === 0}
                />
              </div>
            ) : (
              // Regular handling for other images
              <Image 
                src={item.image} 
                alt={item.title} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover" 
                priority={i === 0} 
              />
            )}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
              <h4 className="text-white font-semibold text-sm">{item.title}</h4>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-2 rounded-full transition-all ${i === activeIndex ? 'w-4 bg-green-500' : 'w-2 bg-gray-300'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}