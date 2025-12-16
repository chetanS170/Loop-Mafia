import React, { useEffect, useState, useMemo } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

export const HeroGridBackground: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHoverDevice, setIsHoverDevice] = useState(false);

  useEffect(() => {
    // Check media query safely
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    
    const updateHoverState = () => {
      setIsHoverDevice(mediaQuery.matches);
    };
    
    // Initial check
    updateHoverState();

    // Listen for environment changes
    mediaQuery.addEventListener('change', updateHoverState);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Add mouse listener if applicable
    if (mediaQuery.matches) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      mediaQuery.removeEventListener('change', updateHoverState);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Memoize SVG URI to prevent recreation on every render
  const gridMaskImage = useMemo(() => {
    const gridSvg = encodeURIComponent(`
      <svg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'>
        <path d='M0 0h40v40H0z' fill='none' stroke='black' stroke-width='1' opacity='1'/>
        <path d='M40 0V40M0 40H40' stroke='black' stroke-width='1' opacity='1'/>
      </svg>
    `.trim());
    return `url("data:image/svg+xml;charset=utf-8,${gridSvg}")`;
  }, []);

  const maskImageValue = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      
      {/* Layer 1: Base Grid (Always visible) */}
      <motion.div
        className="absolute inset-[-100%] w-[300%] h-[300%] bg-charcoal dark:bg-wheat opacity-[0.1] dark:opacity-[0.15]"
        initial={{ x: 0, y: 0 }}
        animate={{ x: -40, y: -40 }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: 'linear',
        }}
        style={{
          maskImage: gridMaskImage,
          WebkitMaskImage: gridMaskImage,
          maskSize: '40px 40px',
          WebkitMaskSize: '40px 40px',
        }}
      />

      {/* Layer 2: Interaction Grid (Spotlight Reveal) */}
      {isHoverDevice && (
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            maskImage: maskImageValue,
            WebkitMaskImage: maskImageValue,
          }}
        >
          <motion.div
            className="absolute inset-[-100%] w-[300%] h-[300%] bg-charcoal dark:bg-wheat opacity-[0.4] dark:opacity-[0.5]"
            initial={{ x: 0, y: 0 }}
            animate={{ x: -40, y: -40 }}
            transition={{
              repeat: Infinity,
              duration: 30,
              ease: 'linear',
            }}
            style={{
              maskImage: gridMaskImage,
              WebkitMaskImage: gridMaskImage,
              maskSize: '40px 40px',
              WebkitMaskSize: '40px 40px',
            }}
          />
        </motion.div>
      )}

      {/* Vignette Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent dark:from-deep-night pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-transparent to-transparent dark:from-deep-night pointer-events-none" />
    </div>
  );
};