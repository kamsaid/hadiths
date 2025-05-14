"use client";

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Quote } from 'lucide-react';

/**
 * DailyQuote component displays an inspirational Islamic quote that changes daily
 * Features a beautiful card design with quote icon and author attribution
 */
const DailyQuote = () => {
  const [quote, setQuote] = useState({});
  
  useEffect(() => {
    // In a real implementation, this would fetch from an API
    // For now, we'll use a static array of quotes
    const quotes = [
      {
        text: "The best among you are those who have the best manners and character.",
        author: "Prophet Muhammad (PBUH)",
        source: "Sahih Bukhari"
      },
      {
        text: "Be in this world as if you were a stranger or a traveler.",
        author: "Prophet Muhammad (PBUH)",
        source: "Sahih Bukhari"
      },
      {
        text: "The strong person is not the one who can wrestle someone else down. The strong person is the one who can control himself when he is angry.",
        author: "Prophet Muhammad (PBUH)",
        source: "Sahih Bukhari"
      },
      {
        text: "Kindness is a mark of faith, and whoever has not kindness has not faith.",
        author: "Prophet Muhammad (PBUH)",
        source: "Muslim"
      },
      {
        text: "He who is not grateful to the people is not grateful to Allah.",
        author: "Prophet Muhammad (PBUH)",
        source: "Abu Dawud, Tirmidhi"
      }
    ];
    
    // Select a quote based on the day of the year to ensure it changes daily
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const selectedQuote = quotes[dayOfYear % quotes.length];
    
    setQuote(selectedQuote);
  }, []);
  
  if (!quote.text) {
    return null;
  }
  
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-neutral-800 text-neutral-100">
      <div className="p-6 md:p-8 relative">
        <div className="relative z-10">
          <blockquote className="bg-black/30 border-l-4 border-red-500 rounded-r-md p-6 text-xl md:text-2xl font-medium leading-relaxed mb-4 text-neutral-100">
            {quote.text}
          </blockquote>
          
          <footer className="mt-6">
            <div className="flex items-center">
              <div className="w-10 h-1 bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full mr-3"></div>
              <div>
                <cite className="not-italic font-medium text-lg text-neutral-200">
                  {quote.author}
                </cite>
                <p className="text-sm text-muted-foreground">
                  {quote.source}
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </Card>
  );
};

export default DailyQuote; 