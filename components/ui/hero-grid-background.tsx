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
      const rect = document.body.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      mouseX.set(x);
      mouseY.set(y);
    };

    if (mediaQuery.matches) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      mediaQuery.removeEventListener('change', updateHoverState);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Memoize SVG URI to prevent recreation on every render
  const gridSvg = useMemo(() => {
    // Grid size 40x40.
    // Dot at 0,0 (top-left corner). Since it repeats, this covers all intersections.
    const svgContent = encodeURIComponent(`
      <svg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'>
        <path d='M0 0h40v40H0z' fill='none' stroke='currentColor' stroke-width='0.5' opacity='1'/>
        <path d='M40 0V40M0 40H40' stroke='currentColor' stroke-width='0.5' opacity='1'/>
        <circle cx="0" cy="0" r="1.5" fill="currentColor" opacity="0.8"/>
      </svg>
    `.trim());
    return `url("data:image/svg+xml;charset=utf-8,${svgContent}")`;
  }, []);

  const maskImageValue = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      
      {/* Base Grid - Steady */}
      <div 
         className="absolute inset-0 z-0"
         style={{
           maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
           WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)'
         }}
      >
        <div
          className="absolute inset-0 w-full h-full text-charcoal/10 dark:text-wheat/10"
          style={{
            maskImage: gridSvg,
            WebkitMaskImage: gridSvg,
            maskSize: '40px 40px',
            WebkitMaskSize: '40px 40px',
            backgroundColor: 'transparent'
          }}
        >
           <div className="w-full h-full bg-charcoal/10 dark:bg-wheat/10" 
                style={{ 
                  mask: gridSvg, 
                  WebkitMask: gridSvg,
                  maskSize: '40px 40px',
                  WebkitMaskSize: '40px 40px' 
                }} 
           />
        </div>
      </div>

      {/* Interactive Sparkle Grid */}
      {isHoverDevice && (
        <motion.div
          className="absolute inset-0 z-10 mix-blend-screen"
          style={{
            maskImage: maskImageValue,
            WebkitMaskImage: maskImageValue,
          }}
        >
          <div
             className="absolute inset-0 w-full h-full"
          >
             {/* Brighter, glowing grid lines */}
             <div className="w-full h-full bg-clay dark:bg-wheat" 
                  style={{ 
                    mask: gridSvg, 
                    WebkitMask: gridSvg,
                    maskSize: '40px 40px',
                    WebkitMaskSize: '40px 40px',
                    opacity: 0.6,
                    filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.5))'
                  }} 
             />
          </div>
        </motion.div>
      )}

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0)_60%,rgba(var(--bg-color),1)_100%)] pointer-events-none" />
    </div>
  );
};
