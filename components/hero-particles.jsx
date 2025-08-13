"use client";

import { useEffect, useRef, useCallback } from 'react';

/**
 * Enhanced HeroParticles component with Islamic geometric patterns and sophisticated effects
 * Features:
 * - Multiple layers with parallax effects
 * - Islamic geometric patterns in background
 * - Dynamic particle behaviors with Duson color palette
 * - Performance optimized with RAF and proper cleanup
 * - Theme-aware colors and responsive design
 */
const HeroParticles = () => {
  const canvasRef = useRef(null);
  const geometricCanvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollOffsetRef = useRef(0);
  const particleLayersRef = useRef([]);
  const geometricPatternsRef = useRef([]);

  // Duson color palette with proper alpha values
  const colors = {
    cream: { r: 250, g: 245, b: 230 },    // #FAF5E6
    yellow: { r: 251, g: 189, b: 13 },    // #FBBD0D
    ebony: { r: 45, g: 44, b: 46 },       // #2D2C2E
    crimson: { r: 253, g: 31, b: 74 }     // #FD1F4A
  };

  // Helper function to get theme-aware colors
  const getThemeColors = useCallback(() => {
    const isDark = document.documentElement.classList.contains('dark');
    
    if (isDark) {
      return {
        background: colors.ebony,
        primary: colors.cream,
        accent1: colors.yellow,
        accent2: colors.crimson
      };
    } else {
      return {
        background: colors.cream,
        primary: colors.ebony,
        accent1: colors.yellow,
        accent2: colors.crimson
      };
    }
  }, []);

  // Create Islamic geometric patterns
  const createGeometricPatterns = useCallback((canvas) => {
    const patterns = [];
    const patternCount = 8;
    
    for (let i = 0; i < patternCount; i++) {
      patterns.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 100 + 50,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.001,
        type: Math.floor(Math.random() * 3), // 0: octagon, 1: star, 2: hexagon
        opacity: Math.random() * 0.1 + 0.02,
        depth: Math.random() * 0.5 + 0.3
      });
    }
    
    return patterns;
  }, []);

  // Draw Islamic geometric pattern
  const drawGeometricPattern = useCallback((ctx, pattern, themeColors) => {
    ctx.save();
    ctx.translate(pattern.x, pattern.y);
    ctx.rotate(pattern.rotation);
    ctx.globalAlpha = pattern.opacity;
    
    const { accent1, accent2 } = themeColors;
    
    switch (pattern.type) {
      case 0: // Octagon
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI) / 4;
          const x = Math.cos(angle) * pattern.size;
          const y = Math.sin(angle) * pattern.size;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(${accent1.r}, ${accent1.g}, ${accent1.b}, ${pattern.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        break;
        
      case 1: // 8-pointed star
        ctx.beginPath();
        for (let i = 0; i < 16; i++) {
          const angle = (i * Math.PI) / 8;
          const radius = (i % 2 === 0) ? pattern.size : pattern.size * 0.4;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(${accent2.r}, ${accent2.g}, ${accent2.b}, ${pattern.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        break;
        
      case 2: // Hexagon with inner pattern
        // Outer hexagon
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const x = Math.cos(angle) * pattern.size;
          const y = Math.sin(angle) * pattern.size;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(${accent1.r}, ${accent1.g}, ${accent1.b}, ${pattern.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Inner hexagon
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const x = Math.cos(angle) * pattern.size * 0.5;
          const y = Math.sin(angle) * pattern.size * 0.5;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(${accent2.r}, ${accent2.g}, ${accent2.b}, ${pattern.opacity * 0.7})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        break;
    }
    
    ctx.restore();
  }, []);

  // Create particle layers with different behaviors
  const createParticleLayers = useCallback((canvas) => {
    const layers = [];
    const layerConfigs = [
      { 
        count: Math.floor(canvas.width * canvas.height / 15000),
        speedRange: [0.2, 0.8],
        sizeRange: [1, 3],
        depth: 0.3,
        colorType: 'accent1',
        connectionDistance: 80,
        parallaxFactor: 0.1
      },
      { 
        count: Math.floor(canvas.width * canvas.height / 20000),
        speedRange: [0.1, 0.5],
        sizeRange: [2, 5],
        depth: 0.6,
        colorType: 'accent2',
        connectionDistance: 120,
        parallaxFactor: 0.3
      },
      { 
        count: Math.floor(canvas.width * canvas.height / 25000),
        speedRange: [0.05, 0.3],
        sizeRange: [3, 8],
        depth: 1.0,
        colorType: 'primary',
        connectionDistance: 150,
        parallaxFactor: 0.5
      }
    ];

    layerConfigs.forEach((config, layerIndex) => {
      const particles = [];
      
      for (let i = 0; i < config.count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          originalX: 0,
          originalY: 0,
          radius: Math.random() * (config.sizeRange[1] - config.sizeRange[0]) + config.sizeRange[0],
          speedX: (Math.random() - 0.5) * (config.speedRange[1] - config.speedRange[0]) + config.speedRange[0],
          speedY: (Math.random() - 0.5) * (config.speedRange[1] - config.speedRange[0]) + config.speedRange[0],
          phase: Math.random() * Math.PI * 2,
          floatAmplitude: Math.random() * 20 + 10,
          floatSpeed: Math.random() * 0.02 + 0.01,
          opacity: Math.random() * 0.6 + 0.2,
          pulseSpeed: Math.random() * 0.03 + 0.01,
          colorType: config.colorType,
          mouseRepulsion: Math.random() * 50 + 30
        });
      }
      
      // Set original positions after creation
      particles.forEach(particle => {
        particle.originalX = particle.x;
        particle.originalY = particle.y;
      });
      
      layers.push({
        particles,
        config,
        layerIndex
      });
    });
    
    return layers;
  }, []);

  // Update particles with sophisticated behaviors
  const updateParticles = useCallback((layers, time, mouse, canvas, themeColors) => {
    layers.forEach((layer) => {
      layer.particles.forEach((particle) => {
        // Floating motion
        particle.phase += particle.floatSpeed;
        const floatX = Math.sin(particle.phase) * particle.floatAmplitude * 0.5;
        const floatY = Math.cos(particle.phase * 0.7) * particle.floatAmplitude;
        
        // Base movement
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Add floating motion
        particle.x += floatX * 0.01;
        particle.y += floatY * 0.01;
        
        // Mouse interaction
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < particle.mouseRepulsion) {
          const force = (particle.mouseRepulsion - distance) / particle.mouseRepulsion;
          const repulsionX = (dx / distance) * force * -2;
          const repulsionY = (dy / distance) * force * -2;
          
          particle.x += repulsionX;
          particle.y += repulsionY;
        }
        
        // Parallax effect based on scroll
        const parallaxOffset = scrollOffsetRef.current * layer.config.parallaxFactor;
        particle.y += parallaxOffset * 0.01;
        
        // Boundary handling with wrapping
        if (particle.x < -particle.radius) {
          particle.x = canvas.width + particle.radius;
          particle.originalX = particle.x;
        } else if (particle.x > canvas.width + particle.radius) {
          particle.x = -particle.radius;
          particle.originalX = particle.x;
        }
        
        if (particle.y < -particle.radius) {
          particle.y = canvas.height + particle.radius;
          particle.originalY = particle.y;
        } else if (particle.y > canvas.height + particle.radius) {
          particle.y = -particle.radius;
          particle.originalY = particle.y;
        }
        
        // Update opacity with pulsing
        particle.opacity = (Math.sin(time * particle.pulseSpeed) * 0.2 + 0.6) * layer.config.depth;
      });
    });
  }, []);

  // Draw particles with connections
  const drawParticles = useCallback((ctx, layers, themeColors) => {
    layers.forEach((layer) => {
      const { particles, config } = layer;
      const colorKey = config.colorType;
      const color = themeColors[colorKey];
      
      // Draw connections first (behind particles)
      ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.1)`;
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < config.connectionDistance) {
            const opacity = (1 - distance / config.connectionDistance) * 0.3 * config.depth;
            ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
            
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Draw particles
      particles.forEach((particle) => {
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 2
        );
        
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${particle.opacity})`);
        gradient.addColorStop(0.7, `rgba(${color.r}, ${color.g}, ${color.b}, ${particle.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    });
  }, []);

  // Main animation loop
  const animate = useCallback((timestamp) => {
    const canvas = canvasRef.current;
    const geometricCanvas = geometricCanvasRef.current;
    
    if (!canvas || !geometricCanvas) return;
    
    const ctx = canvas.getContext('2d');
    const geoCtx = geometricCanvas.getContext('2d');
    const themeColors = getThemeColors();
    
    // Clear canvases
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    geoCtx.clearRect(0, 0, geometricCanvas.width, geometricCanvas.height);
    
    // Update and draw geometric patterns
    geometricPatternsRef.current.forEach((pattern) => {
      pattern.rotation += pattern.rotationSpeed;
      
      // Add subtle parallax to patterns
      const parallaxX = (mouseRef.current.x - canvas.width / 2) * pattern.depth * 0.02;
      const parallaxY = (mouseRef.current.y - canvas.height / 2) * pattern.depth * 0.02;
      
      drawGeometricPattern(geoCtx, {
        ...pattern,
        x: pattern.x + parallaxX,
        y: pattern.y + parallaxY
      }, themeColors);
    });
    
    // Update and draw particles
    updateParticles(
      particleLayersRef.current,
      timestamp * 0.001,
      mouseRef.current,
      canvas,
      themeColors
    );
    
    drawParticles(ctx, particleLayersRef.current, themeColors);
    
    requestAnimationFrame(animate);
  }, [getThemeColors, updateParticles, drawParticles, drawGeometricPattern]);

  // Mouse tracking
  const handleMouseMove = useCallback((event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }, []);

  // Scroll tracking for parallax
  const handleScroll = useCallback(() => {
    scrollOffsetRef.current = window.pageYOffset;
  }, []);

  // Resize handler
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    const geometricCanvas = geometricCanvasRef.current;
    
    if (!canvas || !geometricCanvas) return;
    
    const parent = canvas.parentElement;
    const width = parent.offsetWidth;
    const height = parent.offsetHeight;
    
    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;
    geometricCanvas.width = width;
    geometricCanvas.height = height;
    
    // Recreate particles and patterns
    particleLayersRef.current = createParticleLayers(canvas);
    geometricPatternsRef.current = createGeometricPatterns(canvas);
  }, [createParticleLayers, createGeometricPatterns]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const geometricCanvas = geometricCanvasRef.current;
    
    if (!canvas || !geometricCanvas) return;
    
    // Initialize
    handleResize();
    
    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Start animation
    const animationId = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, [animate, handleResize, handleMouseMove, handleScroll]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Geometric patterns layer (background) */}
      <canvas 
        ref={geometricCanvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
        style={{ pointerEvents: 'none', zIndex: 1 }}
      />
      
      {/* Particle layers (foreground) */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60"
        style={{ pointerEvents: 'none', zIndex: 2 }}
      />
    </div>
  );
};

export default HeroParticles; 