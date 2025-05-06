import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, Clock } from "lucide-react";

interface PrayerCampaignProps {
  title: string;
  participants: number;
  timeLeft?: string;
  status: "upcoming" | "active" | "completed";
  imageSrc: string;
  href: string;
}

export function PrayerCampaign({
  title,
  participants,
  timeLeft,
  status,
  imageSrc,
  href,
}: PrayerCampaignProps) {
  return (
    <section 
      className="py-12 md:py-16 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      <div className="container relative z-10">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Join the {title}
          </h2>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center text-muted-foreground">
              <Users className="h-4 w-4 mr-1.5" />
              <span>{participants.toLocaleString()} praying</span>
            </div>
            
            {timeLeft && status === "upcoming" && (
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-1.5" />
                <span>Starts in {timeLeft}</span>
              </div>
            )}
            
            {status === "active" && (
              <div className="flex items-center text-primary">
                <span className="h-2 w-2 rounded-full bg-primary mr-1.5 animate-pulse" />
                <span>Live now</span>
              </div>
            )}
          </div>
          
          <p className="text-muted-foreground mb-8 max-w-lg">
            Join thousands of Muslims around the world in this special prayer campaign. Together, we can seek blessings and guidance through collective prayer.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <Link href={href}>
                {status === "upcoming" ? "Join Waitlist" : 
                 status === "active" ? "Join in Prayer" : 
                 "View Campaign"}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`${href}/details`}>Details</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 