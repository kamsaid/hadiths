"use client";

import { useState, useEffect } from 'react';
import { RefreshCw, Sparkles, BookOpen, Heart, Star, Clock, ChevronDown, ChevronUp, Maximize2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

/**
 * Explore Page - Displays one random entry at a time from the Pinecone knowledge base
 * Features modern design with beautiful animations and expandable content
 */
export default function ExplorePage() {
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [liked, setLiked] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFullScreenModal, setShowFullScreenModal] = useState(false);
  
  /**
   * Fetch a random entry from the API
   */
  const fetchEntry = async () => {
    try {
      setLoading(true);
      setLiked(false); // Reset like state for new entry
      setIsExpanded(false); // Reset expanded state for new entry
      
      const response = await fetch('/api/explore');
      const data = await response.json();
      
      if (data.entry) {
        setEntry(data.entry);
        setViewCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error fetching entry:', error);
      setEntry(null);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  
  // Fetch entry on mount
  useEffect(() => {
    fetchEntry();
  }, []);
  
  /**
   * Handle refresh button click
   */
  const handleRefresh = () => {
    setRefreshing(true);
    // Add slight delay for better UX
    setTimeout(() => {
      fetchEntry();
    }, 300);
  };
  
  /**
   * Get icon based on category
   */
  const getCategoryIcon = (category) => {
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
  
  /**
   * Check if content is truncated
   */
  const isTruncated = (text) => {
    return text && text.endsWith('...');
  };
  
  /**
   * Get full content from metadata if available
   */
  const getFullContent = () => {
    if (!entry) return '';
    
    // Try to get full content from metadata
    const fullText = entry.metadata?.text || 
                    entry.metadata?.content || 
                    entry.metadata?.full_text ||
                    entry.description;
    
    return fullText;
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-duson-yellow/5 to-duson-crimson/5 pointer-events-none" />
        
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-duson-yellow/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-20 w-32 h-32 bg-duson-crimson/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="container relative z-10 py-8 text-center">
          {/* Title with gradient */}
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-duson-yellow to-duson-crimson animate-fade-in">
            Discover Wisdom
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg text-muted-foreground mb-6 animate-fade-in animation-delay-100">
            Here's something to inspire and enlighten you today
          </p>
          
          {/* View counter */}
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>You've explored {viewCount} {viewCount === 1 ? 'piece' : 'pieces'} of wisdom</span>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="container py-8">
        <div className="max-w-3xl mx-auto">
          {loading ? (
            // Loading state - single card skeleton
            <Card className="animate-pulse">
              <CardContent className="p-8">
                <div className="h-6 w-24 bg-muted rounded mb-6" />
                <div className="h-8 bg-muted rounded mb-4" />
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </div>
                <div className="mt-8 h-4 w-32 bg-muted rounded" />
              </CardContent>
            </Card>
          ) : entry ? (
            // Entry card
            <Card className={`
              relative overflow-hidden
              transition-all duration-500 ease-out
              animate-in fade-in slide-in-from-bottom-5
              bg-gradient-to-br from-background to-background/80
              shadow-lg hover:shadow-xl
            `}>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-duson-yellow/5 to-duson-crimson/5 opacity-50" />
              
              <CardContent className="relative p-8 z-10">
                {/* Header with category and action buttons */}
                <div className="flex items-start justify-between mb-6">
                  <Badge 
                    variant="secondary" 
                    className="flex items-center gap-1.5"
                  >
                    {getCategoryIcon(entry.category)}
                    <span>{entry.category || 'General'}</span>
                  </Badge>
                  
                  <div className="flex items-center gap-2">
                    {/* Full screen button */}
                    <button
                      onClick={() => setShowFullScreenModal(true)}
                      className="p-2 rounded-full transition-all duration-300 hover:bg-muted text-muted-foreground hover:text-foreground"
                      title="View fullscreen"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                    
                    {/* Like button */}
                    <button
                      onClick={() => setLiked(!liked)}
                      className={`
                        p-2 rounded-full transition-all duration-300
                        ${liked 
                          ? 'bg-red-500/20 text-red-500 scale-110' 
                          : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                        }
                      `}
                    >
                      <Heart 
                        className={`w-5 h-5 transition-all duration-300 ${liked ? 'fill-current' : ''}`} 
                      />
                    </button>
                  </div>
                </div>
                
                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-duson-yellow to-duson-crimson">
                  {entry.title}
                </h2>
                
                {/* Description with expand/collapse */}
                <div className="mb-6">
                  <p className={`
                    text-base sm:text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap
                    ${!isExpanded && isTruncated(entry.description) ? 'line-clamp-4' : ''}
                    transition-all duration-300
                  `}>
                    {isExpanded ? getFullContent() : entry.description}
                  </p>
                  
                  {/* Expand/Collapse button */}
                  {isTruncated(entry.description) && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-duson-yellow hover:text-duson-crimson transition-colors"
                    >
                      {isExpanded ? (
                        <>
                          Show less <ChevronUp className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          Read more <ChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>
                
                {/* Additional metadata when expanded */}
                {isExpanded && entry.metadata && Object.keys(entry.metadata).length > 2 && (
                  <div className="mb-6 p-4 bg-muted/30 rounded-lg space-y-2 animate-in fade-in slide-in-from-top-2">
                    <h4 className="text-sm font-medium mb-2">Additional Details</h4>
                    {Object.entries(entry.metadata).map(([key, value]) => {
                      // Skip certain metadata fields
                      if (['text', 'content', 'full_text', 'score'].includes(key)) return null;
                      
                      return (
                        <div key={key} className="flex gap-2 text-sm">
                          <span className="text-muted-foreground capitalize">{key.replace(/_/g, ' ')}:</span>
                          <span>{value}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {/* Source and relevance */}
                <div className="flex items-center justify-between pt-6 border-t border-border/50">
                  <span className="text-sm text-muted-foreground">
                    Source: {entry.source}
                  </span>
                  
                  {/* Metadata score if available */}
                  {entry.metadata?.score && (
                    <span className="text-xs text-muted-foreground">
                      Relevance: {(entry.metadata.score * 100).toFixed(0)}%
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            // Error state
            <Card className="text-center p-8">
              <Sparkles className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No wisdom found</h3>
              <p className="text-muted-foreground mb-4">
                Try refreshing to discover more
              </p>
            </Card>
          )}
          
          {/* Action buttons */}
          <div className="flex justify-center mt-8">
            <Button
              onClick={handleRefresh}
              disabled={refreshing || loading}
              size="lg"
              className="bg-gradient-to-r from-duson-yellow to-duson-crimson hover:from-duson-crimson hover:to-duson-yellow text-duson-ebony dark:text-duson-ebony transition-all duration-300"
            >
              <RefreshCw className={`mr-2 h-5 w-5 ${refreshing ? 'animate-spin' : ''}`} />
              Show me more wisdom
            </Button>
          </div>
        </div>
      </section>
      
      {/* Full Screen Modal */}
      <Dialog open={showFullScreenModal} onOpenChange={setShowFullScreenModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {entry && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="secondary" 
                    className="flex items-center gap-1.5"
                  >
                    {getCategoryIcon(entry.category)}
                    <span>{entry.category || 'General'}</span>
                  </Badge>
                  
                  <button
                    onClick={() => setLiked(!liked)}
                    className={`
                      p-2 rounded-full transition-all duration-300
                      ${liked 
                        ? 'bg-red-500/20 text-red-500 scale-110' 
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                      }
                    `}
                  >
                    <Heart 
                      className={`w-5 h-5 transition-all duration-300 ${liked ? 'fill-current' : ''}`} 
                    />
                  </button>
                </div>
                
                <DialogTitle className="text-3xl font-bold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-duson-yellow to-duson-crimson">
                  {entry.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="mt-6 space-y-6">
                {/* Full content */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-lg leading-relaxed whitespace-pre-wrap">
                    {getFullContent()}
                  </p>
                </div>
                
                {/* All metadata */}
                {entry.metadata && Object.keys(entry.metadata).length > 0 && (
                  <div className="p-6 bg-muted/30 rounded-lg space-y-3">
                    <h4 className="font-medium mb-3">Complete Information</h4>
                    {Object.entries(entry.metadata).map(([key, value]) => {
                      // Skip content fields we already display
                      if (['text', 'content', 'full_text'].includes(key)) return null;
                      
                      return (
                        <div key={key} className="grid grid-cols-3 gap-4 text-sm">
                          <span className="text-muted-foreground capitalize font-medium">
                            {key.replace(/_/g, ' ')}:
                          </span>
                          <span className="col-span-2">{value}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {/* Source footer */}
                <div className="pt-6 border-t flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Source: {entry.source}
                  </span>
                  {entry.metadata?.score && (
                    <span className="text-sm text-muted-foreground">
                      Relevance: {(entry.metadata.score * 100).toFixed(0)}%
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 