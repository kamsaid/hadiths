"use client";

/**
 * TypeWriter component
 * Creates a realistic typewriter effect with cursor blinking
 */
import { useState, useEffect } from "react";

export default function TypeWriter({ 
  text, 
  speed = 75, 
  showCursor = true, 
  onComplete = null,
  className = "",
  cursorChar = "|"
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursorBlink, setShowCursorBlink] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  // Typewriter effect
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed + Math.random() * 30); // Add slight randomness for natural feel

      return () => clearTimeout(timeoutId);
    } else if (!isComplete) {
      setIsComplete(true);
      if (onComplete) {
        onComplete();
      }
      
      // Hide cursor after completion with a delay
      const cursorTimeout = setTimeout(() => {
        setShowCursorBlink(false);
      }, 1000);
      
      return () => clearTimeout(cursorTimeout);
    }
  }, [text, currentIndex, speed, isComplete, onComplete]);

  // Reset when text changes
  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
    setIsComplete(false);
    setShowCursorBlink(true);
  }, [text]);

  // Cursor blinking effect
  useEffect(() => {
    if (!showCursor || !showCursorBlink) return;

    const interval = setInterval(() => {
      setShowCursorBlink(prev => !prev);
    }, 530); // Slightly offset from typical 500ms for more natural feel

    return () => clearInterval(interval);
  }, [showCursor, showCursorBlink]);

  return (
    <span className={`inline ${className}`}>
      {displayedText}
      {showCursor && (
        <span 
          className={`inline-block ml-1 font-mono text-duson-crimson transition-opacity duration-100 ${
            showCursorBlink && !isComplete ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            width: '2px',
            height: '1.2em',
            background: 'currentColor',
            animation: showCursorBlink && !isComplete ? 'pulse 1s infinite' : 'none'
          }}
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
}