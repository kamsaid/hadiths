import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

/**
 * ConfettiEffect - A gentle confetti animation for celebrating achievements
 * 
 * This component creates a subtle confetti effect that can be triggered
 * programmatically, with respect to user's reduced motion preferences.
 * 
 * @param {Object} props
 * @param {boolean} props.trigger - When set to true, the confetti animation plays
 * @param {string} props.colors - Optional custom colors for confetti particles
 * @param {number} props.duration - Optional duration in milliseconds (default: 3000)
 * @param {function} props.onComplete - Optional callback when animation completes
 */
const ConfettiEffect: React.FC<{
  trigger: boolean;
  colors?: string[];
  duration?: number;
  onComplete?: () => void;
}> = ({ 
  trigger, 
  colors = ['#FBBD0D', '#FD1F4A', '#FAF5E6', '#2D2C2E'], 
  duration = 3000,
  onComplete 
}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Listen for changes in the media query
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Fire confetti when triggered
  useEffect(() => {
    if (trigger && !prefersReducedMotion) {
      const end = Date.now() + duration;
      
      // Create a canvas for the confetti
      const confettiCanvas = {
        zIndex: 999,
        disableForReducedMotion: true,
        resize: true,
        useWorker: true,
        colors: colors
      };
      
      // Run gentle confetti animation
      const frame = () => {
        confetti({
          ...confettiCanvas,
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          startVelocity: 25,
        });
        confetti({
          ...confettiCanvas,
          particleCount: 2, 
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          startVelocity: 25,
        });
        
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        } else if (onComplete) {
          onComplete();
        }
      };
      
      // Start the animation
      frame();
    }
  }, [trigger, prefersReducedMotion, colors, duration, onComplete]);
  
  // This component doesn't render anything visible
  return null;
};

export default ConfettiEffect; 