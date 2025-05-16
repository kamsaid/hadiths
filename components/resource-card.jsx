"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

/**
 * ResourceCard component displays a resource with image, title, description, and icon
 * Features hover animations and clean, modern design
 * 
 * @param {string} title - Resource title
 * @param {string} description - Brief description of the resource
 * @param {string} image - Path to the resource image
 * @param {React.ReactNode} icon - Icon component to display
 * @param {string} href - URL to link to (defaults to "#")
 */
const ResourceCard = ({ title, description, image, icon, href = "#" }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link href={href} passHref>
      <Card 
        className="overflow-hidden group transition-all duration-300 hover:shadow-lg h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card Image */}
        <div className="aspect-[3/2] relative overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={400}
            height={266}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          {/* Icon in bottom left */}
          <div className="absolute bottom-3 left-3 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md transition-transform duration-300 group-hover:scale-110">
            <div className="text-duson-yellow">
              {icon}
            </div>
          </div>
        </div>
        
        <CardContent className="p-5 flex-1 flex flex-col">
          <h3 className="font-medium text-lg mb-2 transition-colors group-hover:text-duson-yellow">
            {title}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-4 flex-1">
            {description}
          </p>
          
          <div className="flex items-center text-sm font-medium text-duson-yellow mt-auto">
            <span>Explore</span>
            <ChevronRight 
              className={`ml-1 h-4 w-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} 
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ResourceCard; 