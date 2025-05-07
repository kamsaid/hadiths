import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

interface ContentCardProps {
  title: string;
  description?: string;
  author?: string;
  category?: string;
  duration?: string;
  imageSrc: string;
  href: string;
  isNew?: boolean;
  className?: string;
}

export function ContentCard({
  title,
  description,
  author,
  category,
  duration,
  imageSrc,
  href,
  isNew = false,
  className,
}: ContentCardProps) {
  return (
    <Link 
      href={href}
      className={cn(
        "group block overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md",
        className
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform group-hover:scale-105"
        />
        
        {isNew && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
            New
          </div>
        )}
        
        {category && (
          <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-sm text-xs px-2 py-1 rounded-full">
            {category}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-lg mb-1.5 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        {description && (
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {description}
          </p>
        )}
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          {author && <span>{author}</span>}
          
          {duration && (
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {duration}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
} 