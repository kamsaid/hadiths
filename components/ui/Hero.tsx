"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import DailyReflection from "./DailyReflection";
import { useEffect, useState } from "react";

// Define the type for particles
interface Particle {
  id: number;
  size: number;
  top: string;
  left: string;
  delay: number;
  color: string;
}

export default function Hero() {
  // Create state for particles to ensure they're only generated client-side
  const [particles, setParticles] = useState<Particle[]>([]);

  // Generate particles only on the client side to avoid hydration mismatch
  useEffect(() => {
    // Generate random particles for the background
    const generatedParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      size: Math.random() * 6 + 4,
      top: `${Math.random() * 80 + 5}%`,
      left: `${Math.random() * 80 + 5}%`,
      delay: Math.random() * 2,
      // Add crimson particles
      color: i % 3 === 0 ? 'bg-duson-crimson/30' : 'bg-duson-yellow/30',
    }));
    setParticles(generatedParticles); 
  }, []);

  // Create a diagonal pattern with crimson accent
  const diagonalPattern = {
    backgroundImage: 'linear-gradient(135deg, transparent 0%, transparent 49%, rgba(253, 31, 74, 0.07) 48%, rgba(253, 31, 74, 0.07) 52%, transparent 52%, transparent 100%)',
    backgroundSize: '20px 20px',
  };

  // Create dark mode diagonal pattern
  const darkDiagonalPattern = {
    backgroundImage: 'linear-gradient(135deg, transparent 0%, transparent 48%, rgba(253, 31, 74, 0.1) 48%, rgba(253, 31, 74, 0.1) 52%, transparent 52%, transparent 100%)',
    backgroundSize: '20px 20px',
  };

  return (
    <section className="relative overflow-hidden bg-duson-cream dark:bg-duson-ebony py-20">
      {/* Diagonal crimson pattern overlay - different for light/dark mode */}
      <div className="absolute inset-0 opacity-50 dark:hidden" style={diagonalPattern}></div>
      <div className="absolute inset-0 opacity-70 hidden dark:block" style={darkDiagonalPattern}></div>
      
      {/* Particles animation */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className={`absolute ${p.color} rounded-full`}
            style={{
              width: p.size,
              height: p.size,
              top: p.top,
              left: p.left,
            }}
            animate={{ y: [0, -20, 0] }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Hero content */}
      <div className="container mx-auto relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="text-duson-ebony dark:text-duson-cream">Alhamdulilah </span>
            <span className="text-duson-crimson dark:text-duson-crimson">For Islam</span>
          </h1>
          <p className="mt-4 text-duson-ebony/80 dark:text-duson-cream/80 max-w-lg">
            Explore authentic hadiths, Quranic teachings, and stories of the prophets to enrich your spiritual journey.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link 
              href="/how-to-pray"
              className="px-6 py-3 bg-duson-yellow text-duson-ebony font-medium rounded-lg shadow hover:bg-duson-crimson hover:text-duson-cream transition flex items-center justify-center gap-2"
            >
              <span className="relative w-5 h-5">
                <Image 
                  src="/images/prayer-mat.png" 
                  alt="" 
                  fill 
                  sizes="(max-width: 768px) 20px, 20px"
                  className="object-contain" 
                />
              </span>
              Browse How to Pray
            </Link>
            <Link 
              href="/hadith"
              className="px-6 py-3 bg-duson-crimson text-duson-cream font-medium rounded-lg shadow hover:bg-duson-crimson/80 transition flex items-center justify-center gap-2"
            >
              Explore Hadiths
            </Link>
          </div>
        </div>
        <DailyReflection />
      </div>
    </section>
  );
}