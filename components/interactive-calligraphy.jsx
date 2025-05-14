"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * InteractiveCalligraphy component displays animated Arabic calligraphy
 * Features smooth animations and particles that respond to user interaction
 */
const InteractiveCalligraphy = () => {
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  
  // Arabic phrases related to spirituality and growth
  const phrases = [
    { text: "بسم الله الرحمن الرحيم", translation: "In the name of Allah, the Most Gracious, the Most Merciful" },
    { text: "الحمد لله رب العالمين", translation: "All praise is due to Allah, Lord of the worlds" },
    { text: "قل هو الله احد", translation: "Say, He is Allah, [who is] One" },
    { text: "الله نور السماوات والأرض", translation: "Allah is the Light of the heavens and the earth" }
  ];
  
  const [currentPhrase, setCurrentPhrase] = useState(0);
  
  // Change phrase every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle mouse interactions
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
      
      // Create new particles on mouse movement when hovering
      if (isHovering && Math.random() > 0.7) {
        createParticle(x, y);
      }
    };
    
    // Add particles on hover
    const createParticle = (x, y) => {
      const newParticle = {
        id: Date.now() + Math.random(),
        x,
        y,
        size: Math.random() * 5 + 2,
        color: `rgba(245, 158, 11, ${Math.random() * 0.8 + 0.2})`,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        life: 100,
      };
      
      setParticles(prev => [...prev, newParticle]);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovering]);
  
  // Update particles
  useEffect(() => {
    if (particles.length === 0) return;
    
    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(particle => ({
            ...particle,
            x: particle.x + particle.speedX,
            y: particle.y + particle.speedY,
            life: particle.life - 1,
          }))
          .filter(particle => particle.life > 0)
      );
    }, 16);
    
    return () => clearInterval(interval);
  }, [particles]);
  
  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 1,
        staggerChildren: 0.1 
      }
    }
  };
  
  const characterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 } 
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center relative overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          initial={{ opacity: 1 }}
          animate={{ opacity: particle.life / 100 }}
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
        />
      ))}
      
      {/* Animated background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.1)_0,transparent_70%)]"></div>
        <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0,transparent_70%)]"></div>
      </div>
      
      {/* Main calligraphy text */}
      <motion.div 
        className="z-10 text-center p-8"
        key={currentPhrase}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 
          className="text-4xl md:text-6xl font-bold text-amber-500 mb-4 font-arabic"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          style={{ direction: 'rtl' }}
        >
          {phrases[currentPhrase].text.split('').map((char, index) => (
            <motion.span key={index} variants={characterVariants}>
              {char}
            </motion.span>
          ))}
        </motion.h2>
        
        <motion.p 
          className="text-gray-300 text-lg md:text-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {phrases[currentPhrase].translation}
        </motion.p>
      </motion.div>
      
      {/* Interactive elements */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-400">
        Interactive | Move your mouse over the calligraphy
      </div>
    </div>
  );
};

export default InteractiveCalligraphy; 