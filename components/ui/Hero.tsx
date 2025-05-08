"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import DailyReflection from "./DailyReflection";
import { useEffect, useState } from "react";

export default function Hero() {
  // Create state for particles to ensure they're only generated client-side
  const [particles, setParticles] = useState([]);

  // Generate particles only on the client side to avoid hydration mismatch
  useEffect(() => {
    const generatedParticles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 6 + 4,
      top: `${Math.random() * 80 + 5}%`,
      left: `${Math.random() * 80 + 5}%`,
      delay: Math.random() * 2,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#E6F4EE] to-white py-20">
      <div className="absolute inset-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute bg-[#FFB100]/30 rounded-full"
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
      <div className="container mx-auto relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#263342]">
            Your Spiritual <span className="text-[#FFB100]">Journey Starts Now</span>
          </h1>
          <div className="mt-8">
            <Link 
              href="/how-to-pray"
              className="px-6 py-3 bg-[#FFB100] text-[#263342] font-medium rounded-lg shadow hover:bg-[#E09800] transition flex items-center justify-center gap-2 inline-flex"
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
          </div>
        </div>
        <DailyReflection />
      </div>
    </section>
  );
}