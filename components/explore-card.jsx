"use client";

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Sparkles, Heart, Star } from 'lucide-react';

/**
 * ExploreCard component for displaying content entries on the explore page
 * Features beautiful animations, gradient effects, and modern design
 * 
 * @param {string} title - Entry title
 * @param {string} description - Entry description
 * @param {string} source - Source of the content (e.g., "Hadith Collection")
 * @param {string} category - Category of the content
 * @param {number} index - Index for staggered animation
 * @param {function} onClick - Click handler
 */
const ExploreCard = ({ title, description, source, category, index = 0, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  // Get icon based on category
  const getCategoryIcon = () => {
    switch (category?.toLowerCase()) {
      case 'stories':
      case 'prophet':
        return <BookOpen className="w-4 h-4" />;
      case 'worship':
      case 'prayer':
        return <Star className="w-4 h-4" />;
      case 'character':
      case 'wisdom':
        return <Sparkles className="w-4 h-4" />;
      default:
        return <Heart className="w-4 h-4" />;
    }
  };
  
  // Get gradient based on category
  const getCategoryGradient = () => {
    switch (category?.toLowerCase()) {
      case 'stories':
      case 'prophet':
        return 'from-blue-500/20 to-purple-500/20';
      case 'worship':
      case 'prayer':
        return 'from-green-500/20 to-teal-500/20';
      case 'character':
      case 'wisdom':
        return 'from-amber-500/20 to-orange-500/20';
      default:
        return 'from-pink-500/20 to-rose-500/20';
    }
  };
  
  return (
    <Card 
      className={`
        group relative overflow-hidden cursor-pointer
        transition-all duration-500 ease-out
        hover:shadow-2xl hover:-translate-y-2
        animate-in fade-in slide-in-from-bottom-5
        bg-gradient-to-br from-background to-background/80
      `}
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'both'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Gradient background overlay */}
      <div className={`
        absolute inset-0 bg-gradient-to-br ${getCategoryGradient()}
        opacity-0 group-hover:opacity-100 transition-opacity duration-500
      `} />
      
      {/* Floating particles effect on hover */}
      {isHovered && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="particle-1 absolute w-1 h-1 bg-duson-yellow/50 rounded-full animate-float-up" />
          <div className="particle-2 absolute w-1 h-1 bg-duson-crimson/50 rounded-full animate-float-up-delayed" />
          <div className="particle-3 absolute w-1.5 h-1.5 bg-duson-yellow/30 rounded-full animate-float-up-slow" />
        </div>
      )}
      
      <CardContent className="relative p-6 h-full flex flex-col z-10">
        {/* Header with badge and like button */}
        <div className="flex items-start justify-between mb-4">
          <Badge 
            variant="secondary" 
            className="flex items-center gap-1.5 bg-background/50 backdrop-blur-sm"
          >
            {getCategoryIcon()}
            <span className="text-xs">{category || 'General'}</span>
          </Badge>
          
          {/* Like button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className={`
              p-1.5 rounded-full transition-all duration-300
              ${isLiked 
                ? 'bg-red-500/20 text-red-500 scale-110' 
                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              }
            `}
          >
            <Heart 
              className={`w-4 h-4 transition-all duration-300 ${isLiked ? 'fill-current' : ''}`} 
            />
          </button>
        </div>
        
        {/* Title with gradient on hover */}
        <h3 className={`
          text-lg font-semibold mb-3 line-clamp-2
          transition-all duration-300
          ${isHovered ? 'text-transparent bg-clip-text bg-gradient-to-r from-duson-yellow to-duson-crimson' : ''}
        `}>
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3 flex-1 mb-4">
          {description}
        </p>
        
        {/* Source footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <span className="text-xs text-muted-foreground">
            {source}
          </span>
          
          {/* Read more indicator */}
          <span className={`
            text-xs font-medium text-duson-yellow
            transform transition-transform duration-300
            ${isHovered ? 'translate-x-1' : ''}
          `}>
            Read more →
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExploreCard; 