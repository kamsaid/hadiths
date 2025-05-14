import { HadithQuoteCard } from "./HadithQuoteCard";

export function HadithQuoteExample() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <HadithQuoteCard
        translation="Who is not grateful to the people is not grateful to Allah."
        source="Abu Dawud, Tirmidhi"
        arabic="مَنْ لَا يَشْكُرُ النَّاسَ لَا يَشْكُرُ اللَّهَ"
      />
    </div>
  );
} 