'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useInView } from 'framer-motion';

/**
 * Virtualized Masonry Grid component for the Quran list
 * Implements a responsive, performance-optimized grid layout
 * Only renders items that are in the viewport or close to it
 */
export default function VirtualizedMasonryGrid({ 
  items = [], 
  renderItem, 
  columnCount = { 
    base: 1, // Mobile
    sm: 2,   // Small screens
    md: 3,   // Medium screens
    lg: 4    // Large screens
  }, 
  gap = 16, 
  overscan = 5 // Number of items to render beyond the visible area
}) {
  const containerRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [columns, setColumns] = useState(1);
  const isInView = useInView(containerRef);
  
  // Determine column count based on viewport width
  useEffect(() => {
    const updateColumnCount = () => {
      const width = window.innerWidth;
      if (width >= 1024) setColumns(columnCount.lg || 4);
      else if (width >= 768) setColumns(columnCount.md || 3);
      else if (width >= 640) setColumns(columnCount.sm || 2);
      else setColumns(columnCount.base || 1);
    };
    
    // Update dimensions on resize
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: window.innerHeight
        });
      }
      updateColumnCount();
    };
    
    // Initial setup
    updateDimensions();
    
    // Add event listeners
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [columnCount]);
  
  // Update scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Calculate which items should be visible
  useEffect(() => {
    if (!isInView || !containerRef.current) return;
    
    const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
    const screenHeight = window.innerHeight;
    const itemsPerColumn = Math.ceil(items.length / columns);
    const estimatedItemHeight = 200; // Approximate height for calculation
    
    // Calculate visible range with overscan
    const startIndex = Math.max(
      0, 
      Math.floor((scrollPosition - containerTop) / estimatedItemHeight) * columns - (overscan * columns)
    );
    
    const endIndex = Math.min(
      items.length, 
      Math.ceil((scrollPosition - containerTop + screenHeight) / estimatedItemHeight) * columns + (overscan * columns)
    );
    
    setVisibleItems(items.slice(startIndex, endIndex));
  }, [scrollPosition, dimensions, columns, items, isInView, overscan]);
  
  // Distribute items into columns for the masonry layout
  const columnItems = useMemo(() => {
    const cols = Array.from({ length: columns }, () => []);
    
    visibleItems.forEach((item, index) => {
      const columnIndex = index % columns;
      cols[columnIndex].push(item);
    });
    
    return cols;
  }, [visibleItems, columns]);
  
  // Generate placeholders for all items to maintain scroll height
  const totalHeight = useMemo(() => {
    const estimatedItemHeight = 200; // Approximate height
    return Math.ceil(items.length / columns) * estimatedItemHeight;
  }, [items.length, columns]);
  
  return (
    <div 
      ref={containerRef} 
      className="relative w-full" 
      style={{ minHeight: `${totalHeight}px` }}
    >
      <div className="grid gap-4" 
        style={{ 
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, 
          gap: `${gap}px` 
        }}
      >
        {columnItems.map((column, colIndex) => (
          <div key={`col-${colIndex}`} className="flex flex-col gap-4">
            {column.map((item, index) => (
              <div key={`item-${item.number || index}`}>
                {renderItem(item, index)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
} 