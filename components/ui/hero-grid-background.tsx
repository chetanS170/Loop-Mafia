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
      // Get relative coordinates if needed, but clientX/Y usually works for fixed backgrounds
      // For absolute positioned full screen elements, clientX/Y is good.
      const rect = document.body.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      mouseX.set(x);
      mouseY.set(y);
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
  const gridSvg = useMemo(() => {
    const svgContent = encodeURIComponent(`
      <svg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'>
        <path d='M0 0h40v40H0z' fill='none' stroke='currentColor' stroke-width='0.5' opacity='1'/>
        <path d='M40 0V40M0 40H40' stroke='currentColor' stroke-width='0.5' opacity='1'/>
        <circle cx="20" cy="20" r="1" fill="currentColor" opacity="0.5"/> 
      </svg>
    `.trim());
    return `url("data:image/svg+xml;charset=utf-8,${svgContent}")`;
  }, []);

  // Smoother, larger spotlight
  const maskImageValue = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      
      {/* Base Grid - Faded edges/corners */}
      <div 
         className="absolute inset-0 z-0"
         style={{
           maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
           WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)'
         }}
      >
        <motion.div
          className="absolute inset-[-50%] w-[200%] h-[200%] text-charcoal/10 dark:text-wheat/10"
          initial={{ x: 0, y: 0 }}
          animate={{ x: -40, y: -40 }}
          transition={{
            repeat: Infinity,
            duration: 40,
            ease: 'linear',
          }}
          style={{
            maskImage: gridSvg,
            WebkitMaskImage: gridSvg,
            maskSize: '40px 40px',
            WebkitMaskSize: '40px 40px',
            backgroundColor: 'transparent' // Ensure bg is transparent so stroke works with mask
          }}
        >
           {/* We use CSS background-image for the grid pattern via style prop below to allow currentColor inheritance context if possible, 
               but masking is better for pure color control via bg color of parent. 
               Actually, simpler approach: set background color of this div to the grid color, apply mask. 
           */}
           <div className="w-full h-full bg-charcoal/10 dark:bg-wheat/10" 
                style={{ 
                  mask: gridSvg, 
                  WebkitMask: gridSvg,
                  maskSize: '40px 40px',
                  WebkitMaskSize: '40px 40px' 
                }} 
           />
        </motion.div>
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
          <motion.div
             className="absolute inset-[-50%] w-[200%] h-[200%]"
             initial={{ x: 0, y: 0 }}
             animate={{ x: -40, y: -40 }}
             transition={{
               repeat: Infinity,
               duration: 40,
               ease: 'linear',
             }}
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
          </motion.div>
        </motion.div>
      )}

      {/* Extra vignette to really soften corners as requested */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0)_60%,rgba(var(--bg-color),1)_100%)] pointer-events-none" />
    </div>
  );
};
