import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DailyQuoteProps {
  quote: string;
  source: string;
  authorName?: string;
}

export function DailyQuote({ quote, source, authorName }: DailyQuoteProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <Card className="border-none bg-muted/40">
          <CardContent className="p-8 md:p-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-medium mb-8">
                Daily Reflection
              </h2>
              
              <div className="relative">
                <div className="absolute -top-6 left-0 opacity-30 text-6xl font-serif">"</div>
                <blockquote className="text-xl md:text-2xl font-medium relative z-10 mb-6">
                  {quote}
                </blockquote>
                <div className="absolute -bottom-6 right-0 opacity-30 text-6xl font-serif">"</div>
              </div>
              
              <div className="text-muted-foreground mt-4">
                <p className="font-medium">{source}</p>
                {authorName && <p className="text-sm mt-1">{authorName}</p>}
              </div>
              
              <div className="mt-8">
                <Button variant="ghost" size="sm">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
} 