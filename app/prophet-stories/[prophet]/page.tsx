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

// Define types for prophet stories data structure
type ProphetInfo = {
  "Full Story": Record<string, string[] | Record<string, string[]>>;
  Intro: string;
};

type ProphetEntry = {
  [prophetName: string]: ProphetInfo;
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
      <div className="w-16 h-16 border-4 border-[#FFB100] border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  if (!prophetData) {
    return (
      <div className="bg-gradient-to-b from-[#FFB100]/10 to-white min-h-screen">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4 text-[#263342]">Prophet not found</h1>
          <p className="mb-6 text-[#263342]/80">We couldn't find the story for the prophet you're looking for.</p>
          <Link href="/prophet-stories" className="text-[#FFB100] hover:text-[#E09800] font-medium">
            Return to Prophet Stories
          </Link>
        </div>
      </div>
    );
  }

  const { fullStory, intro } = prophetData;

  return (
    <div className="bg-gradient-to-b from-[#FFB100]/10 to-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/prophet-stories" 
          className="inline-flex items-center text-[#FFB100] hover:text-[#E09800] mb-6 font-medium transition-colors"
          aria-label="Back to all prophets"
          tabIndex={0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Prophets
        </Link>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-4 text-[#263342]">Prophet {decodedProphetName}</h1>
          
          <div className="bg-[#FFB100]/10 p-6 rounded-xl mb-8 border border-[#FFB100]/20">
            <h2 className="text-2xl font-semibold mb-2 text-[#263342]">Introduction</h2>
            <p className="text-lg text-[#263342]/80">{intro}</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 mb-8 border border-[#FFB100]/10">
            <h2 className="text-2xl font-semibold mb-6 text-[#263342] pb-3 border-b border-[#FFB100]/20">The Story of Prophet {decodedProphetName}</h2>
            
            {Object.entries(fullStory).map(([sectionTitle, sectionContent]) => (
              <div key={sectionTitle} className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-[#263342] flex items-center">
                  <span className="w-2 h-2 bg-[#FFB100] rounded-full mr-2"></span>
                  {sectionTitle}
                </h3>
                
                {Array.isArray(sectionContent) ? (
                  <div className="space-y-4 text-[#263342]/80">
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
                        <div key={subSectionTitle} className="mb-4 ml-4 border-l-2 border-[#FFB100]/30 pl-4">
                          <h4 className="text-lg font-medium mb-2 text-[#263342]">{subSectionTitle}</h4>
                          <div className="space-y-3 text-[#263342]/80">
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
          
          <div className="text-center mb-12">
            <Link 
              href="/prophet-stories" 
              className="inline-block bg-[#FFB100] hover:bg-[#E09800] text-[#263342] py-3 px-6 rounded-md shadow-md transition-colors font-medium"
              aria-label="Return to all prophet stories"
              tabIndex={0}
            >
              Explore More Prophet Stories
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Helper function to find prophet data by name
function findProphetData(prophetName: string): { fullStory: Record<string, any>; intro: string } | null {
  const prophetStoriesEntries = Object.entries(prophetStories);
  
  for (const [_, entryValue] of prophetStoriesEntries) {
    // Get the prophet entry (which is a key-value pair where key is prophet name)
    const prophetEntry = entryValue as ProphetEntry;
    const entryProphetNames = Object.keys(prophetEntry);
    
    if (entryProphetNames.includes(prophetName)) {
      const prophetInfo = prophetEntry[prophetName];
      return {
        fullStory: prophetInfo["Full Story"],
        intro: prophetInfo.Intro
      };
    }
  }
  return null;
} 