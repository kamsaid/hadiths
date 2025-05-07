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
      className="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl p-6 shadow-lg"
    >
      <h3 className="text-lg font-semibold text-[#263342] mb-2">
        Daily Reflection
      </h3>
      <p className="text-sm text-[#263342] mb-4">{verse}</p>
      <button
        onClick={copy}
        className="text-sm font-medium text-[#1FAA59] hover:underline"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </motion.div>
  );
}