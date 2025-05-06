"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import prophetStories from "@/content/prophetstories.json";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function ProphetStoryPage({ params }: { params: { prophet: string } }) {
  const [mounted, setMounted] = useState(false);
  const decodedProphetName = decodeURIComponent(params.prophet);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Find the prophet story from the JSON data
  const prophetData = mounted ? findProphetData(decodedProphetName) : null;
  
  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  if (!prophetData) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Prophet not found</h1>
        <p className="mb-6">We couldn't find the story for the prophet you're looking for.</p>
        <Link href="/prophet-stories" className="text-primary hover:underline">
          Return to Prophet Stories
        </Link>
      </div>
    );
  }

  const { fullStory, intro } = prophetData;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/prophet-stories" className="inline-flex items-center text-primary hover:underline mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to All Prophets
      </Link>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="prose prose-lg dark:prose-invert max-w-none"
      >
        <h1 className="text-4xl font-bold mb-4">{decodedProphetName}</h1>
        
        <div className="bg-muted p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
          <p className="text-lg">{intro}</p>
        </div>

        <div className="bg-card shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Full Story</h2>
          
          {Object.entries(fullStory).map(([sectionTitle, sectionContent]) => (
            <div key={sectionTitle} className="mb-8">
              <h3 className="text-xl font-semibold mb-3">{sectionTitle}</h3>
              
              {Array.isArray(sectionContent) ? (
                <div className="space-y-4">
                  {sectionContent.map((paragraph, index) => (
                    <p key={index} className={paragraph.trim() === "" ? "h-6" : ""}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : (
                <div>
                  {/* Handle nested objects if they exist */}
                  {Object.entries(sectionContent as Record<string, string[]>).map(
                    ([subSectionTitle, subSectionContent]) => (
                      <div key={subSectionTitle} className="mb-4">
                        <h4 className="text-lg font-medium mb-2">{subSectionTitle}</h4>
                        <div className="space-y-3">
                          {Array.isArray(subSectionContent) && 
                            subSectionContent.map((paragraph, idx) => (
                              <p key={idx} className={paragraph.trim() === "" ? "h-6" : ""}>
                                {paragraph}
                              </p>
                            ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Helper function to find prophet data by name
function findProphetData(prophetName: string) {
  for (const key in prophetStories) {
    const prophetEntry = prophetStories[key as keyof typeof prophetStories];
    const entryProphetName = Object.keys(prophetEntry)[0];
    
    if (entryProphetName === prophetName) {
      const prophetInfo = prophetEntry[entryProphetName];
      return {
        fullStory: prophetInfo["Full Story"],
        intro: prophetInfo.Intro
      };
    }
  }
  return null;
} 