import React, { useEffect, useRef, useMemo } from 'react';

export const HeroGridBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only track mouse on devices that support hover
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    
    const updateMouse = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const animate = () => {
      if (containerRef.current) {
        // Update CSS variables directly for performance (avoids React re-renders)
        containerRef.current.style.setProperty('--mouse-x', `${mouseRef.current.x}px`);
        containerRef.current.style.setProperty('--mouse-y', `${mouseRef.current.y}px`);
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        window.addEventListener('mousemove', updateMouse);
        rafRef.current = requestAnimationFrame(animate);
      } else {
        window.removeEventListener('mousemove', updateMouse);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      }
    };

    // Initial check
    handleMediaChange(mediaQuery);

    // Listener for changes
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', updateMouse);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Memoize SVG URI to prevent recreation
  const gridSvg = useMemo(() => {
    const svgContent = encodeURIComponent(`
      <svg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'>
        <path d='M0 0h40v40H0z' fill='none' stroke='currentColor' stroke-width='0.5' opacity='1'/>
        <path d='M40 0V40M0 40H40' stroke='currentColor' stroke-width='0.5' opacity='1'/>
        <circle cx="0" cy="0" r="1.5" fill="currentColor" opacity="0.8"/>
      </svg>
    `.trim());
    return `url("data:image/svg+xml;charset=utf-8,${svgContent}")`;
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 transform-gpu"
      style={{
        // Initialize variables off-screen to prevent flash
        '--mouse-x': '-1000px',
        '--mouse-y': '-1000px',
      } as React.CSSProperties}
    >
      
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

      {/* Interactive Sparkle Grid - GPU Accelerated Mask */}
      <div
        className="absolute inset-0 z-10 mix-blend-screen will-change-[mask-image]"
        style={{
          maskImage: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), black, transparent)',
          WebkitMaskImage: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), black, transparent)',
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
      </div>

      {/* Vignette - Blends to Cream (Light) or Deep Night (Dark) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#FDFBF7_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0A_100%)] pointer-events-none opacity-80" />
    </div>
  );
};