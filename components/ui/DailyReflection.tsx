"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function DailyReflection() {
  const verse = "Indeed, in the remembrance of Allah do hearts find rest. (Q 13:28)";
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(verse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="backdrop-blur-md bg-duson-cream/70 border border-duson-ebony/10 rounded-xl p-6 shadow-lg relative overflow-hidden"
    >
      {/* Crimson decorative corner */}
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-duson-crimson/20 rounded-full"></div>
      <div className="absolute -top-8 -right-8 w-16 h-16 bg-duson-crimson/30 rounded-full"></div>
      
      <h3 className="text-lg font-semibold text-duson-crimson mb-4 relative z-10">
        Daily Reflection
        <div className="w-12 h-1 bg-duson-crimson mt-2"></div>
      </h3>
      
      <blockquote className="border-l-4 border-duson-crimson pl-4 py-2 mb-4 bg-transparent">
        <p className="text-sm text-duson-ebony dark:text-duson-cream">{verse}</p>
      </blockquote>
      
      <div className="flex justify-between items-center">
        <button
          onClick={copy}
          className="text-sm font-medium text-duson-yellow hover:text-duson-crimson hover:underline flex items-center gap-1.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
          </svg>
          {copied ? "Copied!" : "Copy"}
        </button>
        
        <span className="inline-flex items-center rounded-full bg-duson-crimson/10 px-2 py-1 text-xs font-medium text-duson-crimson">
          Quran
        </span>
      </div>
    </motion.div>
  );
}